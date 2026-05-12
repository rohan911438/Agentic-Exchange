from __future__ import annotations

import os
import uuid
from datetime import datetime
from typing import Any
from .agent_runtime import execute_workflow

try:
    from pymongo import MongoClient
except Exception:
    MongoClient = None  # type: ignore


def _get_db():
    uri = os.getenv("MONGODB_URI")
    db_name = os.getenv("MONGODB_DB", "agentic_exchange")
    if not uri or not MongoClient:
        return None
    client = MongoClient(uri)
    return client[db_name]


def _serialize_record(record: dict[str, Any]) -> dict[str, Any]:
    """Recursively convert datetime objects to ISO format strings for JSON serialization."""
    if record is None:
        return None
    
    def serialize_value(val):
        if isinstance(val, datetime):
            return val.isoformat()
        elif isinstance(val, dict):
            return {k: serialize_value(v) for k, v in val.items() if k != "_id"}
        elif isinstance(val, (list, tuple)):
            return [serialize_value(item) for item in val]
        else:
            return val
    
    serialized = {}
    for key, value in record.items():
        if key == "_id":
            # Skip MongoDB _id field
            continue
        serialized[key] = serialize_value(value)
    return serialized


mem_agents: dict[str, dict[str, Any]] = {}
mem_purchases: dict[str, dict[str, Any]] = {}
mem_workflow_runs: dict[str, dict[str, Any]] = {}
mem_usage: list[dict[str, Any]] = []
_indexes_ready = False

DEMO_AGENTS = [
    {
        "agent_id": "demo_research",
        "name": "Research Agent",
        "category": "Data",
        "description": "Gathers live web data and prepares actionable summaries.",
        "price_type": "fixed",
        "price_value": 0.2,
        "price_microalgos": 200000,
        "owner_wallet": "NVOMGL2X2F5NP3JLC66EFU45LKQJWFNFQZHSUWFTXBQZ4KQJQJ6K7EM6WA",
        "status": "active"
    },
    {
        "agent_id": "demo_copywriter",
        "name": "Copywriter Agent",
        "category": "Content",
        "description": "Generates high-converting marketing copy and brand messaging.",
        "price_type": "fixed",
        "price_value": 0.5,
        "price_microalgos": 500000,
        "owner_wallet": "NVOMGL2X2F5NP3JLC66EFU45LKQJWFNFQZHSUWFTXBQZ4KQJQJ6K7EM6WA",
        "status": "active"
    },
    {
        "agent_id": "demo_seo",
        "name": "SEO Agent",
        "category": "Marketing",
        "description": "Optimizes text with keywords for maximum search engine ranking.",
        "price_type": "fixed",
        "price_value": 0.3,
        "price_microalgos": 300000,
        "owner_wallet": "NVOMGL2X2F5NP3JLC66EFU45LKQJWFNFQZHSUWFTXBQZ4KQJQJ6K7EM6WA",
        "status": "active"
    },
    {
        "agent_id": "demo_publisher",
        "name": "Social Publisher",
        "category": "Social",
        "description": "Formats final output natively for Twitter/LinkedIn threads.",
        "price_type": "fixed",
        "price_value": 0.15,
        "price_microalgos": 150000,
        "owner_wallet": "NVOMGL2X2F5NP3JLC66EFU45LKQJWFNFQZHSUWFTXBQZ4KQJQJ6K7EM6WA",
        "status": "active"
    }
]

def _ensure_indexes(db) -> None:
    global _indexes_ready
    if _indexes_ready or db is None:
        return
    db["agents"].create_index("agent_id", unique=True)
    db["agents"].create_index("owner_wallet")
    db["agents"].create_index([("status", 1), ("created_at", -1)])

    db["purchases"].create_index("purchase_id", unique=True)
    db["purchases"].create_index([("buyer_wallet", 1), ("timestamp", -1)])
    db["purchases"].create_index("agent_id")

    db["workflow_runs"].create_index("run_id", unique=True)
    db["workflow_runs"].create_index([("wallet", 1), ("started_at", -1)])
    db["workflow_runs"].create_index("status")

    db["usage_ledger"].create_index([("wallet", 1), ("timestamp", -1)])
    db["usage_ledger"].create_index([("run_id", 1), ("agent_id", 1)])
    _indexes_ready = True


def list_agents(limit: int = 100, offset: int = 0) -> list[dict[str, Any]]:
    db = _get_db()
    db_agents = []
    if db is not None:
        _ensure_indexes(db)
        records = db["agents"].find({}, {"_id": 0}).sort("created_at", -1).skip(offset).limit(limit)
        db_agents = [_serialize_record(r) for r in records]
    else:
        db_agents = list(mem_agents.values())
        
    # Deduplicate agents by name and ID to keep the hackathon marketplace clean
    seen_ids = set()
    seen_names = set()
    unique_agents = []
    for a in DEMO_AGENTS + db_agents:
        if a["agent_id"] not in seen_ids and a["name"] not in seen_names:
            seen_ids.add(a["agent_id"])
            seen_names.add(a["name"])
            unique_agents.append(a)
            
    return unique_agents[offset : offset + limit]


def get_agent(agent_id: str) -> dict[str, Any] | None:
    for demo in DEMO_AGENTS:
        if demo["agent_id"] == agent_id:
            return demo
            
    db = _get_db()
    if db is not None:
        _ensure_indexes(db)
        record = db["agents"].find_one({"agent_id": agent_id}, {"_id": 0})
        return _serialize_record(record) if record else None
    return mem_agents.get(agent_id)


def publish_agent(data: dict[str, Any]) -> dict[str, Any]:
    now = datetime.utcnow()
    agent_id = str(uuid.uuid4())
    record = {
        "agent_id": agent_id,
        "name": data["name"],
        "category": data["category"],
        "description": data["description"],
        "capabilities": data.get("capabilities", []),
        "price_type": data["price_type"],
        "price_value": data["price_value"],
        "owner_wallet": data["owner_wallet"],
        "status": data.get("status", "active"),
        "rating": 0.0,
        "runs": 0,
        "created_at": now,
        "updated_at": now,
    }
    db = _get_db()
    if db is not None:
        _ensure_indexes(db)
        db["agents"].insert_one(record)
        return _serialize_record(record)
    mem_agents[agent_id] = record
    return record


def patch_agent(agent_id: str, patch: dict[str, Any]) -> dict[str, Any] | None:
    clean_patch = {k: v for k, v in patch.items() if v is not None}
    if not clean_patch:
        return get_agent(agent_id)
    clean_patch["updated_at"] = datetime.utcnow()
    db = _get_db()
    if db is not None:
        _ensure_indexes(db)
        db["agents"].update_one({"agent_id": agent_id}, {"$set": clean_patch})
        return get_agent(agent_id)
    if agent_id not in mem_agents:
        return None
    mem_agents[agent_id].update(clean_patch)
    return mem_agents[agent_id]


def create_purchase(data: dict[str, Any]) -> dict[str, Any]:
    purchase_id = str(uuid.uuid4())
    now = datetime.utcnow()
    record = {
        "purchase_id": purchase_id,
        "buyer_wallet": data["buyer_wallet"],
        "agent_id": data["agent_id"],
        "plan": data.get("plan", "default"),
        "txid": data.get("txid"),
        "amount": data["amount"],
        "timestamp": now,
        "status": data.get("status", "completed"),
    }
    db = _get_db()
    if db is not None:
        _ensure_indexes(db)
        db["purchases"].insert_one(record)
        return _serialize_record(record)
    mem_purchases[purchase_id] = record
    return record


def get_purchase(purchase_id: str) -> dict[str, Any] | None:
    db = _get_db()
    if db is not None:
        _ensure_indexes(db)
        record = db["purchases"].find_one({"purchase_id": purchase_id}, {"_id": 0})
        return _serialize_record(record) if record else None
    return mem_purchases.get(purchase_id)


def update_purchase_status(purchase_id: str, status: str, txid: str | None = None) -> dict[str, Any] | None:
    db = _get_db()
    patch: dict[str, Any] = {"status": status}
    if txid:
        patch["txid"] = txid
    if db is not None:
        _ensure_indexes(db)
        db["purchases"].update_one({"purchase_id": purchase_id}, {"$set": patch})
        return get_purchase(purchase_id)
    if purchase_id not in mem_purchases:
        return None
    mem_purchases[purchase_id].update(patch)
    return mem_purchases[purchase_id]


def list_purchases(wallet: str | None = None, limit: int = 100, offset: int = 0) -> list[dict[str, Any]]:
    db = _get_db()
    query = {"buyer_wallet": wallet} if wallet else {}
    if db is not None:
        _ensure_indexes(db)
        records = db["purchases"].find(query, {"_id": 0}).sort("timestamp", -1).skip(offset).limit(limit)
        return [_serialize_record(r) for r in records]
    rows = list(mem_purchases.values())
    filtered = [r for r in rows if (wallet is None or r["buyer_wallet"] == wallet)]
    return filtered[offset : offset + limit]


def list_my_agents(wallet: str, limit: int = 100, offset: int = 0) -> list[dict[str, Any]]:
    purchases = list_purchases(wallet, limit=5000, offset=0)
    ids = {p["agent_id"] for p in purchases if p.get("status") == "completed"}
    all_items = [a for a in list_agents(limit=5000, offset=0) if a["agent_id"] in ids]
    return all_items[offset : offset + limit]


def create_workflow_run(data: dict[str, Any]) -> dict[str, Any]:
    run_id = str(uuid.uuid4())
    started_at = datetime.utcnow()
    steps = data.get("steps", [])
    runtime = execute_workflow(
        wallet=data["wallet"],
        steps=steps,
        input_data=data.get("input", {}),
        timeout_s=float(os.getenv("WORKFLOW_STEP_TIMEOUT_S", "30")),
        retries=int(os.getenv("WORKFLOW_STEP_RETRIES", "2")),
    )

    ended_at = datetime.utcnow()
    units = max(len(steps), 1)
    cost = runtime["cost"]
    record = {
        "run_id": run_id,
        "wallet": data["wallet"],
        "steps": steps,
        "input": runtime["input"],
        "outputs": runtime["outputs"],
        "trace": runtime["trace"],
        "final_output": runtime["final_output"],
        "status": runtime["status"],
        "failed_steps": runtime["failed_steps"],
        "cost": cost,
        "runtime_ms": runtime["runtime_ms"],
        "started_at": started_at,
        "ended_at": ended_at,
    }
    usage_row = {
        "wallet": data["wallet"],
        "agent_id": "workflow_orchestrator",
        "run_id": run_id,
        "units": units,
        "cost": cost,
        "timestamp": ended_at,
    }

    db = _get_db()
    if db is not None:
        _ensure_indexes(db)
        db["workflow_runs"].insert_one(record)
        db["usage_ledger"].insert_one(usage_row)
        return _serialize_record(record)
    mem_workflow_runs[run_id] = record
    mem_usage.append(usage_row)
    return _serialize_record(record)


def get_workflow_run(run_id: str) -> dict[str, Any] | None:
    db = _get_db()
    if db is not None:
        _ensure_indexes(db)
        record = db["workflow_runs"].find_one({"run_id": run_id}, {"_id": 0})
        return _serialize_record(record) if record else None
    return mem_workflow_runs.get(run_id)


def list_workflow_runs(wallet: str | None = None, limit: int = 100, offset: int = 0) -> list[dict[str, Any]]:
    db = _get_db()
    query = {"wallet": wallet} if wallet else {}
    if db is not None:
        _ensure_indexes(db)
        records = db["workflow_runs"].find(query, {"_id": 0}).sort("started_at", -1).skip(offset).limit(limit)
        return [_serialize_record(r) for r in records]
    rows = list(mem_workflow_runs.values())
    filtered = [r for r in rows if (wallet is None or r["wallet"] == wallet)]
    return filtered[offset : offset + limit]


def get_usage(wallet: str, limit: int = 200, offset: int = 0) -> list[dict[str, Any]]:
    db = _get_db()
    if db is not None:
        _ensure_indexes(db)
        records = (
            db["usage_ledger"]
            .find({"wallet": wallet}, {"_id": 0})
            .sort("timestamp", -1)
            .skip(offset)
            .limit(limit)
        )
        return [_serialize_record(r) for r in records]
    filtered = [u for u in mem_usage if u["wallet"] == wallet]
    return filtered[offset : offset + limit]


def get_billing(wallet: str) -> dict[str, Any]:
    usage = get_usage(wallet, limit=5000, offset=0)
    total_cost = round(sum(float(row.get("cost", 0)) for row in usage), 2)
    total_units = sum(int(row.get("units", 0)) for row in usage)
    return {
        "wallet": wallet,
        "total_cost": total_cost,
        "total_units": total_units,
        "line_items": usage,
    }


def get_creator_earnings(owner_wallet: str) -> dict[str, Any]:
    agents = [a for a in list_agents() if a.get("owner_wallet") == owner_wallet]
    agent_ids = {a["agent_id"] for a in agents}
    purchases = [p for p in list_purchases() if p.get("agent_id") in agent_ids and p.get("status") == "completed"]
    gross = round(sum(float(p.get("amount", 0)) for p in purchases), 2)
    commission_rate = float(os.getenv("MARKETPLACE_COMMISSION", "0.10"))
    commission = round(gross * commission_rate, 2)
    net = round(gross - commission, 2)
    return {
        "owner_wallet": owner_wallet,
        "agent_count": len(agents),
        "sales_count": len(purchases),
        "gross_revenue": gross,
        "commission_rate": commission_rate,
        "commission_amount": commission,
        "net_revenue": net,
    }
