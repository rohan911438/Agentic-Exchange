from __future__ import annotations

from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel, Field

from algosdk.error import AlgodHTTPError

if __package__ and __package__.startswith("backend"):
    from backend.services.algorand_service import (
        get_app_address,
        get_app_id,
        submit_signed_transactions,
        get_account_balance,
    )
else:
    from services.algorand_service import (
        get_app_address,
        get_app_id,
        submit_signed_transactions,
        get_account_balance,
    )

router = APIRouter()


class SubmitRequest(BaseModel):
    signed_txns: list[str] = Field(..., description="List of base64-encoded signed transactions")


@router.get("/contract/info")
def contract_info():
    app_id = get_app_id()
    app_address = get_app_address(app_id) if app_id > 0 else None
    return {
        "app_id": app_id,
        "app_address": app_address,
        "network": "testnet",
        "contract_type": "marketplace",
    }


@router.post("/contract/submit")
def contract_submit(payload: SubmitRequest):
    try:
        txids = submit_signed_transactions(payload.signed_txns)
        return {"txids": txids}
    except AlgodHTTPError as exc:
        raise HTTPException(status_code=400, detail=str(exc))
    except RuntimeError as exc:
        raise HTTPException(status_code=400, detail=str(exc))


@router.get("/wallet/balance")
def wallet_balance(address: str = Query(..., description="Wallet address")):
    try:
        amount = get_account_balance(address)
        return {"address": address, "microalgos": amount}
    except Exception:
        return {"address": address, "microalgos": 0}
