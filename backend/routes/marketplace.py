from __future__ import annotations

from fastapi import APIRouter, HTTPException, Query

if __package__ and __package__.startswith("backend"):
    from backend.models import (
        AgentPublishRequest,
        AgentPatchRequest,
        PurchaseAgentRequest,
        PurchaseTxnRequest,
        PurchaseConfirmRequest,
        SubscriptionTxnRequest,
        WorkflowRunRequest,
    )
    from backend.services import (
        list_agents,
        get_agent,
        publish_agent,
        patch_agent,
        create_purchase,
        get_purchase,
        update_purchase_status,
        list_purchases,
        list_my_agents,
        create_workflow_run,
        get_workflow_run,
        list_workflow_runs,
        get_usage,
        get_billing,
        get_creator_earnings,
    )
    from backend.services.algorand_service import build_marketplace_purchase_group
else:
    from models import (
        AgentPublishRequest,
        AgentPatchRequest,
        PurchaseAgentRequest,
        PurchaseTxnRequest,
        PurchaseConfirmRequest,
        SubscriptionTxnRequest,
        WorkflowRunRequest,
    )
    from services import (
        list_agents,
        get_agent,
        publish_agent,
        patch_agent,
        create_purchase,
        get_purchase,
        update_purchase_status,
        list_purchases,
        list_my_agents,
        create_workflow_run,
        get_workflow_run,
        list_workflow_runs,
        get_usage,
        get_billing,
        get_creator_earnings,
    )
    from services.algorand_service import build_marketplace_purchase_group

router = APIRouter()


@router.get("/agents")
def get_agents(limit: int = Query(default=50, ge=1, le=200), offset: int = Query(default=0, ge=0)):
    return {"items": list_agents(limit=limit, offset=offset), "limit": limit, "offset": offset}


@router.get("/agents/{agent_id}")
def get_agent_by_id(agent_id: str):
    agent = get_agent(agent_id)
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")
    return agent


@router.post("/agents/publish")
def post_publish_agent(payload: AgentPublishRequest):
    return publish_agent(payload.model_dump())


@router.patch("/agents/{agent_id}")
def patch_agent_by_id(agent_id: str, payload: AgentPatchRequest):
    current = get_agent(agent_id)
    if not current:
        raise HTTPException(status_code=404, detail="Agent not found")
    if payload.owner_wallet and payload.owner_wallet != current.get("owner_wallet"):
        raise HTTPException(status_code=403, detail="Only owner can update this agent")
    updated = patch_agent(agent_id, payload.model_dump(exclude_unset=True))
    return updated


@router.post("/purchase-agent")
def post_purchase_agent(payload: PurchaseAgentRequest):
    agent = get_agent(payload.agent_id)
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")
    record = create_purchase(payload.model_dump())
    return {"status": "ok", "purchase": record}


@router.post("/purchase-agent/txn")
def create_purchase_agent_txn(payload: PurchaseTxnRequest):
    agent = get_agent(payload.agent_id)
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")

    # Keep INR visible at UI; settle on-chain in microAlgos
    amount_microalgos = int(payload.amount_microalgos)
    if amount_microalgos <= 0:
        raise HTTPException(status_code=400, detail="amount_microalgos must be > 0")

    creator_wallet = agent.get("owner_wallet")
    if not creator_wallet:
        raise HTTPException(status_code=400, detail="Agent owner wallet missing")

    # Check if the user already purchased this agent
    existing_purchases = list_purchases(wallet=payload.buyer_wallet, limit=1000)
    for p in existing_purchases:
        if p.get("agent_id") == payload.agent_id and p.get("status") == "completed":
            raise HTTPException(status_code=400, detail="Agent already purchased by this wallet.")

    purchase = create_purchase(
        {
            "buyer_wallet": payload.buyer_wallet,
            "agent_id": payload.agent_id,
            "plan": payload.plan,
            "txid": None,
            "amount": amount_microalgos,
            "status": "pending",
        }
    )

    txns = build_marketplace_purchase_group(
        sender=payload.buyer_wallet,
        purchase_id=purchase["purchase_id"],
        agent_id=payload.agent_id,
        amount=amount_microalgos,
        creator_wallet=creator_wallet,
        op="buy",
    )
    return {"txns": txns, "purchase_id": purchase["purchase_id"], "status": "pending"}


@router.post("/purchase-agent/confirm")
def confirm_purchase_agent(payload: PurchaseConfirmRequest):
    purchase = get_purchase(payload.purchase_id)
    if not purchase:
        raise HTTPException(status_code=404, detail="Purchase not found")
    updated = update_purchase_status(payload.purchase_id, "completed", payload.txid)
    return {"status": "ok", "purchase": updated}


@router.post("/subscription/txn")
def create_subscription_txn(payload: SubscriptionTxnRequest):
    amount = int(payload.amount_microalgos)
    if amount <= 0:
        raise HTTPException(status_code=400, detail="amount_microalgos must be > 0")
    purchase = create_purchase(
        {
            "buyer_wallet": payload.buyer_wallet,
            "agent_id": f"subscription:{payload.plan}",
            "plan": payload.plan,
            "txid": None,
            "amount": amount,
            "status": "pending",
        }
    )
    txns = build_marketplace_purchase_group(
        sender=payload.buyer_wallet,
        purchase_id=purchase["purchase_id"],
        agent_id=f"subscription:{payload.plan}",
        amount=amount,
        creator_wallet=payload.creator_wallet,
        op="subscribe",
    )
    return {"txns": txns, "purchase_id": purchase["purchase_id"], "status": "pending"}


@router.post("/subscription/confirm")
def confirm_subscription(payload: PurchaseConfirmRequest):
    purchase = get_purchase(payload.purchase_id)
    if not purchase:
        raise HTTPException(status_code=404, detail="Subscription purchase not found")
    updated = update_purchase_status(payload.purchase_id, "completed", payload.txid)
    return {"status": "ok", "purchase": updated}


@router.get("/my-agents")
def get_my_agents(
    wallet: str = Query(...),
    limit: int = Query(default=50, ge=1, le=200),
    offset: int = Query(default=0, ge=0),
):
    return {"wallet": wallet, "items": list_my_agents(wallet, limit=limit, offset=offset), "limit": limit, "offset": offset}


@router.get("/purchases")
def get_purchases(
    wallet: str | None = Query(default=None),
    limit: int = Query(default=50, ge=1, le=200),
    offset: int = Query(default=0, ge=0),
):
    return {"items": list_purchases(wallet, limit=limit, offset=offset), "limit": limit, "offset": offset}


@router.post("/run-workflow")
def post_run_workflow(payload: WorkflowRunRequest):
    if not payload.steps:
        raise HTTPException(status_code=400, detail="At least one workflow step is required")
    run = create_workflow_run(payload.model_dump())
    return {"status": "ok", "run": run}


@router.get("/workflow-runs/{run_id}")
def get_workflow_run_by_id(run_id: str):
    run = get_workflow_run(run_id)
    if not run:
        raise HTTPException(status_code=404, detail="Workflow run not found")
    return run


@router.get("/workflow-runs")
def get_workflow_runs(
    wallet: str | None = Query(default=None),
    limit: int = Query(default=50, ge=1, le=200),
    offset: int = Query(default=0, ge=0),
):
    return {"items": list_workflow_runs(wallet, limit=limit, offset=offset), "limit": limit, "offset": offset}


@router.get("/usage")
def get_usage_report(
    wallet: str = Query(...),
    limit: int = Query(default=100, ge=1, le=500),
    offset: int = Query(default=0, ge=0),
):
    return {"wallet": wallet, "items": get_usage(wallet, limit=limit, offset=offset), "limit": limit, "offset": offset}


@router.get("/billing")
def get_billing_report(wallet: str = Query(...)):
    return get_billing(wallet)


@router.get("/creator-earnings")
def get_creator_earnings_report(wallet: str = Query(...)):
    return get_creator_earnings(wallet)
