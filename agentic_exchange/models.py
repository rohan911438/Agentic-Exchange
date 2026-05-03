"""Data models for Agentic Exchange SDK."""

from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional


@dataclass
class NegotiationRound:
	proposer: str
	price: float
	note: Optional[str] = None


@dataclass
class NegotiationResult:
	final_price: float
	milestones: List[Dict[str, Any]]
	rounds: List[NegotiationRound]
	confidence: float
	agent_fee: float
	raw: Dict[str, Any] = field(default_factory=dict)

	@staticmethod
	def from_dict(d: Dict[str, Any]) -> "NegotiationResult":
		rounds = [NegotiationRound(**r) for r in d.get("rounds", [])]
		return NegotiationResult(
			final_price=float(d.get("final_price", 0)),
			milestones=d.get("milestones", []),
			rounds=rounds,
			confidence=float(d.get("confidence", 0.0)),
			agent_fee=float(d.get("agent_fee", 0.0)),
			raw=d,
		)


@dataclass
class Deal:
	id: str
	negotiation: NegotiationResult
	buyer: Dict[str, Any]
	seller: Dict[str, Any]
	metadata: Dict[str, Any] = field(default_factory=dict)

	@staticmethod
	def from_dict(d: Dict[str, Any]) -> "Deal":
		negotiation = NegotiationResult.from_dict(d.get("negotiation", {}))
		return Deal(
			id=str(d.get("id", "")),
			negotiation=negotiation,
			buyer=d.get("buyer", {}),
			seller=d.get("seller", {}),
			metadata=d.get("metadata", {}),
		)


@dataclass
class TransactionPayload:
	unsigned_txn: Dict[str, Any]
	algorand_args: Dict[str, Any]
	total_amount: float
	agent_fee: float
	seller_payout: float

	def to_dict(self) -> Dict[str, Any]:
		return {
			"unsigned_txn": self.unsigned_txn,
			"algorand_args": self.algorand_args,
			"total_amount": self.total_amount,
			"agent_fee": self.agent_fee,
			"seller_payout": self.seller_payout,
		}
