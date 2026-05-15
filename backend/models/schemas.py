from __future__ import annotations

from datetime import datetime
from typing import Any, Optional, Literal
from pydantic import BaseModel, Field


class DealCreateRequest(BaseModel):
    title: Optional[str] = None
    budget: float = Field(..., gt=0)
    min_price: float = Field(..., gt=0)
    deadline: str
    description: str
    buyer_wallet: Optional[str] = None


class DealCreateResponse(BaseModel):
    deal_id: str
    status: str
    created_at: datetime


class NegotiationRequest(BaseModel):
    deal_id: str


class NegotiationResponse(BaseModel):
    status: str
    final_price: Optional[float] = None
    conversation: list[dict[str, Any]] = Field(default_factory=list)
    rounds: int = 0


class DealDetailsResponse(BaseModel):
    deal_id: str
    status: str
    data: Optional[dict[str, Any]] = None
    created_at: Optional[datetime] = None


# ---------------------------
# Agentic Exchange 2.0 Schemas
# ---------------------------

class AgentPublishRequest(BaseModel):
    name: str
    category: str
    description: str
    capabilities: list[str] = Field(default_factory=list)
    price_type: Literal["one_time", "subscription", "usage"]
    price_value: float = Field(..., ge=0)
    owner_wallet: str
    status: Literal["active", "draft", "disabled"] = "active"


class AgentPatchRequest(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    description: Optional[str] = None
    capabilities: Optional[list[str]] = None
    price_type: Optional[Literal["one_time", "subscription", "usage"]] = None
    price_value: Optional[float] = Field(default=None, ge=0)
    status: Optional[Literal["active", "draft", "disabled"]] = None
    owner_wallet: Optional[str] = None


class PurchaseAgentRequest(BaseModel):
    buyer_wallet: str
    agent_id: str
    plan: str = "default"
    txid: Optional[str] = None
    amount: float = Field(..., ge=0)
    status: Literal["completed", "pending", "failed"] = "completed"


class PurchaseTxnRequest(BaseModel):
    buyer_wallet: str
    agent_id: str
    amount_microalgos: int = Field(..., gt=0)
    plan: str = "default"


class PurchaseConfirmRequest(BaseModel):
    purchase_id: str
    txid: str


class SubscriptionTxnRequest(BaseModel):
    buyer_wallet: str
    creator_wallet: str
    plan: str = "monthly"
    amount_microalgos: int = Field(..., gt=0)


class WorkflowRunRequest(BaseModel):
    wallet: str
    steps: list[str] = Field(default_factory=list)
    input: dict[str, Any] = Field(default_factory=dict)

class RecommendationRequest(BaseModel):
    intent: str
    wallet: Optional[str] = None
    budget_limit: Optional[float] = None
    preferences: Optional[dict[str, Any]] = None

class WorkflowRecommendation(BaseModel):
    name: str
    description: str
    steps: list[str]
    total_estimated_price: float
    confidence_score: float
    compatibility_index: float

class RecommendationResponse(BaseModel):
    intent_id: str
    decomposed_tasks: list[str]
    recommended_agents: list[dict[str, Any]]
    suggested_workflows: list[WorkflowRecommendation]
    insights: str
