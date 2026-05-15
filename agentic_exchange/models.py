"""Strongly typed data models for the Agentic Exchange SDK."""

from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional
from datetime import datetime


@dataclass
class AgentReputation:
    """Represents trust and performance metrics for an agent."""
    reputation_score: float
    success_rate: float
    avg_latency_ms: float
    uptime_reliability: float
    user_satisfaction: float
    consistency_index: float
    verified: bool = False
    enterprise_grade: bool = False
    top_performer: bool = False
    badge_label: str = "Emerging"

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "AgentReputation":
        metrics = data.get("metrics", {})
        indicators = data.get("trust_indicators", {})
        return cls(
            reputation_score=data.get("reputation_score", 0.0),
            success_rate=metrics.get("success_rate", 0.0),
            avg_latency_ms=metrics.get("avg_latency_ms", 0.0),
            uptime_reliability=metrics.get("uptime_reliability", 0.0),
            user_satisfaction=metrics.get("user_satisfaction", 0.0),
            consistency_index=metrics.get("consistency_index", 0.0),
            verified=indicators.get("verified", False),
            enterprise_grade=indicators.get("enterprise_grade", False),
            top_performer=indicators.get("top_performer", False),
            badge_label=indicators.get("badge_label", "Emerging")
        )


@dataclass
class Agent:
    """Represents an AI agent available in the marketplace."""
    agent_id: str
    name: str
    category: str
    description: str
    price_microalgos: int
    owner_wallet: str
    status: str
    capabilities: List[str] = field(default_factory=list)
    reputation: Optional[AgentReputation] = None

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "Agent":
        rep_data = data.get("reputation")
        return cls(
            agent_id=data.get("agent_id", data.get("id", "")),
            name=data.get("name", "Unknown Agent"),
            category=data.get("category", "General"),
            description=data.get("description", ""),
            price_microalgos=int(data.get("price_microalgos", 0)),
            owner_wallet=data.get("owner_wallet", ""),
            status=data.get("status", "unknown"),
            capabilities=data.get("capabilities", []),
            reputation=AgentReputation.from_dict(rep_data) if rep_data else None
        )


@dataclass
class WorkflowRun:
    """Represents the execution state and results of a multi-agent workflow."""
    run_id: str
    status: str
    wallet: str
    cost_microalgos: int
    runtime_ms: int
    steps: List[str] = field(default_factory=list)
    input_data: Dict[str, Any] = field(default_factory=dict)
    outputs: List[Dict[str, Any]] = field(default_factory=list)
    final_output: Dict[str, Any] = field(default_factory=dict)
    trace: List[Dict[str, Any]] = field(default_factory=list)

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "WorkflowRun":
        return cls(
            run_id=data.get("run_id", ""),
            status=data.get("status", "unknown"),
            wallet=data.get("wallet", ""),
            cost_microalgos=int(data.get("cost", 0)),
            runtime_ms=int(data.get("runtime_ms", 0)),
            steps=data.get("steps", []),
            input_data=data.get("input", {}),
            outputs=data.get("outputs", []),
            final_output=data.get("final_output", {}),
            trace=data.get("trace", [])
        )
