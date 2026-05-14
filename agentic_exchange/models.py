"""Data models for Agentic Exchange SDK."""

from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional

@dataclass
class WorkflowRun:
    """Represents the result of a multi-agent workflow execution."""
    run_id: str
    wallet: str
    status: str
    cost: float
    runtime_ms: int
    steps: list[str] = field(default_factory=list)
    input: dict[str, Any] = field(default_factory=dict)
    outputs: list[dict[str, Any]] = field(default_factory=list)
    trace: list[dict[str, Any]] = field(default_factory=list)
    final_output: dict[str, Any] = field(default_factory=dict)
    failed_steps: int = 0

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> "WorkflowRun":
        """Create a WorkflowRun instance from a dictionary."""
        return cls(
            run_id=data.get("run_id", ""),
            wallet=data.get("wallet", ""),
            status=data.get("status", "unknown"),
            cost=float(data.get("cost", 0.0)),
            runtime_ms=int(data.get("runtime_ms", 0)),
            steps=data.get("steps", []),
            input=data.get("input", {}),
            outputs=data.get("outputs", []),
            trace=data.get("trace", []),
            final_output=data.get("final_output", {}),
            failed_steps=int(data.get("failed_steps", 0)),
        )
