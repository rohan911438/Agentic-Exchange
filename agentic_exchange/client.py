"""Production-grade AgenticClient for the Agentic Exchange SDK."""

import logging
from typing import Any, Dict, List, Optional, Union

from .api import ApiClient
from .exceptions import ValidationError, WorkflowExecutionError
from .models import Agent, WorkflowRun, AgentReputation

logger = logging.getLogger("agentic_exchange")


class AgenticClient:
    """
    Principal interface for interacting with the Agentic Exchange marketplace.
    
    This client abstracts authentication, API communication, and multi-agent
    workflow orchestration into a simple, high-level interface.
    """

    def __init__(
        self, 
        api_key: str, 
        base_url: str = "http://127.0.0.1:8000", 
        timeout: int = 30,
        debug: bool = False
    ):
        """
        Initialize the AgenticClient.

        Args:
            api_key: Your Agentic Exchange API key.
            base_url: The API base URL. Defaults to the local development server.
            timeout: Default timeout for API requests in seconds.
            debug: If True, enables verbose logging for debugging.
        """
        if not api_key:
            raise ValidationError("An api_key is required to initialize AgenticClient.")
            
        self.api = ApiClient(
            api_key=api_key, 
            base_url=base_url, 
            timeout=timeout, 
            debug=debug
        )

    # --- Marketplace Intelligence ---

    def list_agents(self, limit: int = 50, offset: int = 0) -> List[Agent]:
        """
        Fetch a list of published agents available in the marketplace.
        
        Returns:
            A list of Agent objects including their descriptions and prices.
        """
        resp = self.api.get("/agents", params={"limit": limit, "offset": offset})
        items = resp.get("items", [])
        return [Agent.from_dict(item) for item in items]

    def get_agent(self, agent_id: str) -> Agent:
        """
        Fetch details for a specific marketplace agent.
        """
        resp = self.api.get(f"/agents/{agent_id}")
        return Agent.from_dict(resp)

    def get_agent_reputation(self, agent_id: str) -> AgentReputation:
        """
        Retrieve real-time performance and trust metrics for a specific agent.
        """
        resp = self.api.get(f"/agent-reputation/{agent_id}")
        return AgentReputation.from_dict(resp)

    def recommend_agents(self, intent: str, limit: int = 3) -> List[Agent]:
        """
        Ask the AI Recommendation Engine for the best agents matching a specific task intent.
        """
        # Note: Depending on backend implementation, this might be a GET with params or POST
        resp = self.api.get("/top-performing-agents", params={"limit": limit})
        if isinstance(resp, list):
            return [Agent.from_dict(item) for item in resp]
        return [Agent.from_dict(item) for item in resp.get("items", [])]

    # --- Workflow Orchestration ---

    def run_workflow(
        self, 
        steps: List[str], 
        input_data: Optional[Dict[str, Any]] = None,
        wallet_context: Optional[str] = "SDK_DEFAULT_WALLET"
    ) -> WorkflowRun:
        """
        Trigger an immediate multi-agent orchestration workflow.
        
        Args:
            steps: Ordered list of agent IDs to execute in the pipeline.
            input_data: Initial payload/prompt to feed into the first agent.
            wallet_context: The wallet address to use for billing/attribution.
            
        Returns:
            A WorkflowRun object containing execution traces and final outputs.
        """
        payload = {
            "steps": steps,
            "input": input_data or {},
            "wallet": wallet_context
        }
        resp = self.api.post("/run-workflow", json=payload)
        run_data = resp.get("run", resp)
        return WorkflowRun.from_dict(run_data)

    def execute_pipeline(
        self, 
        intent: str, 
        input_payload: Optional[Dict[str, Any]] = None
    ) -> WorkflowRun:
        """
        High-level utility that first recommends agents based on intent, 
        then automatically executes a pipeline with those agents.
        """
        logger.info(f"Analyzing intent for autonomous pipeline: {intent}")
        recommended = self.recommend_agents(intent, limit=2)
        if not recommended:
            raise WorkflowExecutionError(f"No suitable agents found for intent: {intent}")
            
        agent_ids = [a.agent_id for a in recommended]
        logger.info(f"Executing recommended pipeline: {' -> '.join(agent_ids)}")
        
        return self.run_workflow(steps=agent_ids, input_data=input_payload)

    def get_workflow_status(self, run_id: str) -> WorkflowRun:
        """
        Fetch the current status and execution trace of a previously triggered workflow.
        """
        resp = self.api.get(f"/workflow-runs/{run_id}")
        return WorkflowRun.from_dict(resp)

    def estimate_execution_cost(self, steps: List[str]) -> Dict[str, Any]:
        """
        Calculate the total cost in ALGO for running a specific multi-agent pipeline.
        """
        total_microalgos = 0
        for aid in steps:
            agent = self.get_agent(aid)
            total_microalgos += agent.price_microalgos
            
        return {
            "steps": len(steps),
            "total_microalgos": total_microalgos,
            "total_algo": total_microalgos / 1_000_000,
            "currency": "ALGO"
        }
