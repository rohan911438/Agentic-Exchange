from __future__ import annotations

import base64
import os
from typing import List

from algosdk import encoding, logic
from algosdk.error import AlgodHTTPError
from algosdk.v2client import algod
from algosdk.transaction import (
    ApplicationNoOpTxn,
    PaymentTxn,
    calculate_group_id,
)


def get_algod_client() -> algod.AlgodClient:
    algod_address = os.getenv("ALGOD_ADDRESS", "https://testnet-api.algonode.cloud")
    algod_token = os.getenv("ALGOD_TOKEN", "")
    return algod.AlgodClient(algod_token, algod_address)


def get_app_id() -> int:
    # New marketplace app id (Phase 6)
    # Backward fallback retained for old envs.
    return int(os.getenv("MARKETPLACE_APP_ID", os.getenv("CONTRACT_APP_ID", "0")))


def get_app_address(app_id: int) -> str:
    return logic.get_application_address(app_id)


def _purchase_key(purchase_id: str) -> bytes:
    return b"p:" + purchase_id.encode("utf-8")


def _encode_txn(txn) -> str:
    packed = encoding.msgpack_encode(txn)
    if isinstance(packed, str):
        return packed
    return base64.b64encode(packed).decode("utf-8")


def _b64_to_bytes(blob) -> bytes:
    """Safely decode a base64 string (standard or urlsafe) to bytes."""
    if isinstance(blob, (bytes, bytearray)):
        return bytes(blob)
    if isinstance(blob, dict):
        blob = blob.get("blob") or blob.get("signedTxn")
    # Normalize urlsafe base64 → standard base64
    s = blob.strip().replace("-", "+").replace("_", "/")
    # Fix padding using the correct formula
    s += "=" * (-len(s) % 4)
    return base64.b64decode(s)


def build_marketplace_purchase_group(
    sender: str,
    purchase_id: str,
    agent_id: str,
    amount: int,
    creator_wallet: str,
    op: str = "buy",
) -> List[str]:
    if op not in ("buy", "subscribe"):
        raise ValueError("op must be 'buy' or 'subscribe'")
    if amount <= 0:
        raise ValueError("amount must be > 0")

    client = get_algod_client()
    params = client.suggested_params()
    app_id = get_app_id()
    if app_id <= 0:
        raise ValueError("MARKETPLACE_APP_ID is not configured")
    app_address = get_app_address(app_id)

    pay_txn = PaymentTxn(sender=sender, sp=params, receiver=app_address, amt=amount)
    app_call = ApplicationNoOpTxn(
        sender=sender,
        sp=params,
        index=app_id,
        app_args=[op.encode("utf-8"), purchase_id.encode("utf-8"), agent_id.encode("utf-8"), amount.to_bytes(8, "big")],
        accounts=[creator_wallet],
        boxes=[(app_id, _purchase_key(purchase_id))],
    )

    gid = calculate_group_id([pay_txn, app_call])
    pay_txn.group = gid
    app_call.group = gid

    return [_encode_txn(pay_txn), _encode_txn(app_call)]


def submit_signed_transactions(signed_blobs) -> List[str]:
    client = get_algod_client()

    flat_blobs: List = []

    def _flatten(item):
        if item is None:
            return
        if isinstance(item, (list, tuple)):
            for sub in item:
                _flatten(sub)
        else:
            flat_blobs.append(item)

    _flatten(signed_blobs)

    if not flat_blobs:
        raise ValueError("No signed transactions provided")

    raw_bytes: List[bytes] = [_b64_to_bytes(blob) for blob in flat_blobs]

    try:
        # Concatenate all signed txn bytes
        combined = b"".join(raw_bytes)
        # algosdk internally calls base64.b64decode() on whatever you pass,
        # so pass a base64 string — NOT raw bytes
        txid = client.send_raw_transaction(base64.b64encode(combined))
        return [txid]

    except AlgodHTTPError as exc:
        detail = str(exc)
        try:
            decoded = encoding.msgpack_decode(base64.b64encode(raw_bytes[0]).decode())
            sender = getattr(getattr(decoded, "transaction", None), "sender", None)
            if sender:
                balance = get_account_balance(sender)
                detail = f"{detail} | sender={sender} balance={balance}"
        except Exception:
            pass
        raise RuntimeError(detail) from exc

def get_account_balance(address: str) -> int:
    try:
        if not address or not encoding.is_valid_address(address):
            return 0
            
        client = get_algod_client()
        info = client.account_info(address)
        return int(info.get("amount", 0))
    except Exception:
        # Return 0 if account doesn't exist or address is malformed
        return 0
