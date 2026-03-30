from __future__ import annotations

import uuid
from typing import Any

# In-memory store for deals
# Structure: { "deal_id": { "data": {...}, "status": "negotiated" } }
deals: dict[str, dict[str, Any]] = {}


def create_deal(data: dict[str, Any], status: str = "negotiated", deal_id: str | None = None) -> str:
    """
    Creates a new deal in the store.
    If deal_id is not provided, a unique one is generated.
    """
    if not deal_id:
        deal_id = str(uuid.uuid4())
    
    deals[deal_id] = {
        "data": data,
        "status": status
    }
    return deal_id


def get_deal(deal_id: str) -> dict[str, Any] | None:
    """
    Retrieves a deal by ID.
    """
    return deals.get(deal_id)


def list_deals() -> dict[str, dict[str, Any]]:
    """
    Returns all stored deals.
    """
    return deals
