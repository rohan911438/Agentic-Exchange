from __future__ import annotations

from datetime import datetime
from typing import Any, Optional
from pydantic import BaseModel, Field


class TaskCreateRequest(BaseModel):
    budget: float = Field(..., gt=0)
    min_price: float = Field(..., gt=0)
    initial_offer: float = Field(..., gt=0)
    initial_price: float = Field(..., gt=0)
    max_rounds: int = Field(8, ge=1, le=100)
    increase_pct: float = Field(0.10, ge=0, le=1)
    decrease_pct: float = Field(0.10, ge=0, le=1)
    threshold: float = Field(20.0, ge=0)
    personality: str = Field("neutral")
    randomness: float = Field(0.0, ge=0, le=1)


class TaskCreateResponse(BaseModel):
    task_id: str
    status: str
    created_at: datetime


class NegotiationStartResponse(BaseModel):
    task_id: str
    status: str
    started_at: datetime


class DealResponse(BaseModel):
    task_id: str
    status: str
    deal: Optional[dict[str, Any]] = None
    updated_at: datetime
