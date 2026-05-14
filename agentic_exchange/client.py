"""High-level `AgenticClient` exposing the SDK surface.

Example:
	from agentic_exchange import AgenticClient

	client = AgenticClient(api_key="sk_...")
	
	# Fetch available agents in the marketplace
	agents = client.list_agents()
	
	# Run a multi-agent workflow
	run = client.run_workflow(
		steps=[{"agent_id": "agent_123", "input": "Generate a report"}]
	)

"""
from typing import Any, Dict, List, Optional

from .api import ApiClient
from .exceptions import ValidationError
from .models import Deal, TransactionPayload


class AgenticClient:
	def __init__(self, api_key: str, base_url: str = "https://api.agentic.exchange", timeout: int = 15):
		"""Create a new AgenticClient.

		Args:
			api_key: Your Agentic Exchange API key.
			base_url: Optional API base URL (useful for staging).
			timeout: Request timeout in seconds.
		"""
		if not api_key:
			raise ValidationError("api_key is required")
		self.api = ApiClient(api_key=api_key, base_url=base_url, timeout=timeout)

	# --- V2.0 Marketplace & Workflow Endpoints ---

	def list_agents(self, limit: int = 50, offset: int = 0) -> Dict[str, Any]:
		"""Fetch a list of published agents available in the marketplace."""
		return self.api.get(f"/api/v1/agents?limit={limit}&offset={offset}")

	def get_agent(self, agent_id: str) -> Dict[str, Any]:
		"""Fetch details for a specific marketplace agent."""
		return self.api.get(f"/api/v1/agents/{agent_id}")

	def run_workflow(self, steps: List[str], input: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
		"""Trigger a multi-agent orchestration workflow."""
		# For the hackathon, we pass a dummy wallet if not authenticated via API
		payload = {"steps": steps, "input": input or {}, "wallet": "API_WALLET_MOCK"}
		# Map directly to the FastAPI route
		return self.api.post("/run-workflow", json=payload)

	# --- V1.0 Legacy Negotiation Endpoints ---

	def negotiate(self, buyer: Dict[str, Any], seller: Dict[str, Any], task: Dict[str, Any]) -> Deal:
		"""Run negotiation and return a normalized `Deal` object.

		Minimal inputs are accepted; the server will apply sensible defaults.
		"""
		payload = {"buyer": buyer, "seller": seller, "task": task}
		resp = self.api.post("/api/v1/negotiate", json=payload)
		return Deal.from_dict(resp.get("deal", resp))

	def estimate_fee(self, buyer: Dict[str, Any], seller: Dict[str, Any], task: Dict[str, Any]) -> Dict[str, Any]:
		"""Return a fee estimate for a potential negotiation.

		Useful for pricing previews and UX affordances.
		"""
		payload = {"buyer": buyer, "seller": seller, "task": task}
		return self.api.post("/api/v1/estimate_fee", json=payload)

	def create_deal(
		self,
		deal: Deal,
		buyer_wallet: str,
		seller_wallet: str,
		metadata: Optional[Dict[str, Any]] = None,
	) -> TransactionPayload:
		"""Convert a negotiated deal into an Algorand-compatible transaction payload.

		Returns a `TransactionPayload` containing unsigned txn and encoded args.
		"""
		payload = {
			"deal_id": deal.id,
			"buyer_wallet": buyer_wallet,
			"seller_wallet": seller_wallet,
			"metadata": metadata or {},
		}
		resp = self.api.post("/api/v1/create_deal", json=payload)
		txn = resp.get("transaction")
		if not txn:
			raise ValidationError("Missing transaction payload from server")
		return TransactionPayload(
			unsigned_txn=txn.get("unsigned_txn", {}),
			algorand_args=txn.get("algorand_args", {}),
			total_amount=float(txn.get("total_amount", 0.0)),
			agent_fee=float(txn.get("agent_fee", 0.0)),
			seller_payout=float(txn.get("seller_payout", 0.0)),
		)

	def execute(self, transaction: TransactionPayload, signed_blob: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
		"""Submit or prepare a transaction for execution.

		If `signed_blob` is provided (signed by a wallet), the SDK will submit it on-chain.
		Otherwise, the method returns the unsigned blob for client-side signing.
		"""
		payload = {"transaction": transaction.to_dict()}
		if signed_blob is not None:
			payload["signed_blob"] = signed_blob
		return self.api.post("/api/v1/execute", json=payload)

	def release_milestone(self, deal_id: str, milestone_index: int, actor_wallet: str) -> Dict[str, Any]:
		"""Trigger a milestone release on-chain.

		The SDK abstracts the contract call into a single method.
		"""
		payload = {"deal_id": deal_id, "milestone_index": milestone_index, "actor_wallet": actor_wallet}
		return self.api.post("/api/v1/release_milestone", json=payload)

	def get_deal_status(self, deal_id: str) -> Dict[str, Any]:
		"""Fetch real-time deal state including on-chain status and payouts."""
		return self.api.get(f"/api/v1/deals/{deal_id}")
