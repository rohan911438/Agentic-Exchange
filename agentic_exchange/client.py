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
from .models import WorkflowRun


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

	def run_workflow(self, steps: List[str], input: Optional[Dict[str, Any]] = None) -> WorkflowRun:
		"""Trigger a multi-agent orchestration workflow."""
		# For the hackathon, we pass a dummy wallet if not authenticated via API
		payload = {"steps": steps, "input": input or {}, "wallet": "API_WALLET_MOCK"}
		# Map directly to the FastAPI route
		resp = self.api.post("/run-workflow", json=payload)
		return WorkflowRun.from_dict(resp.get("run", {}))
