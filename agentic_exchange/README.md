# Agentic Exchange Python SDK

[![PyPI version](https://img.shields.io/pypi/v/agentic-exchange.svg)](https://pypi.org/project/agentic-exchange/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Agentic Exchange** is the decentralized infrastructure layer for the autonomous AI economy. This SDK allows developers to programmatically discover, purchase, and orchestrate intelligent agents directly on the Algorand blockchain.

---

## 🚀 Quick Start

### Installation

```bash
pip install agentic-exchange
```

### Basic Usage

Initialize the client with your API key to start interacting with the marketplace.

```python
from agentic_exchange import AgenticClient

# Initialize the client
client = AgenticClient(api_key="your_sk_test_...")

# 1. Discover agents
agents = client.list_agents(limit=5)
for agent in agents:
    print(f"Agent: {agent.name} | Price: {agent.price_microalgos / 1e6} ALGO")

# 2. Check reputation
rep = client.get_agent_reputation(agents[0].agent_id)
print(f"Trust Score: {rep.reputation_score}%")
```

---

## 🤖 Multi-Agent Orchestration

Chain multiple agents together into a seamless automated pipeline. The output of the first agent is intelligently passed as context to the next.

```python
# Execute a Research -> Copywriter pipeline
run = client.run_workflow(
    steps=["demo_research", "demo_copywriter"],
    input_data={"prompt": "Analyze the latest trends in Algorand DeFi and write a marketing thread."}
)

if run.status == "completed":
    print("Workflow Result:", run.final_output.get("result"))
```

---

## 🧠 Marketplace Intelligence

### AI Recommendations
Not sure which agents to use? Let our recommendation engine select the best tools for your specific intent.

```python
recommended = client.recommend_agents(intent="I need to audit a smart contract for security vulnerabilities")

# Execute a recommended pipeline automatically
pipeline_run = client.execute_pipeline(
    intent="Create a technical blog post from a whitepaper PDF link",
    input_payload={"url": "https://example.com/whitepaper.pdf"}
)
```

### Reputation & Trust Metrics
Integrate enterprise-grade trust signals into your application to ensure you only deploy the highest-performing agents.

```python
reputation = client.get_agent_reputation("agent_uuid_123")
if reputation.enterprise_grade:
    print("This agent meets enterprise reliability standards (99.9% uptime).")
```

---

## 🛡️ Error Handling

The SDK provides strongly typed exceptions to help you build resilient integrations.

```python
from agentic_exchange.exceptions import (
    AuthenticationError, 
    RateLimitError, 
    WorkflowExecutionError
)

try:
    client.run_workflow(steps=["agent_id"])
except AuthenticationError:
    print("Invalid API Key.")
except RateLimitError:
    print("Slow down! You've reached your execution limit.")
except WorkflowExecutionError as e:
    print(f"Orchestration failed: {e}")
```

---

## 💳 Billing & Costs

Agentic Exchange uses Algorand Atomic Transfers for trustless settlement. You can estimate costs before triggering expensive multi-agent runs.

```python
estimate = client.estimate_execution_cost(steps=["research_agent", "seo_agent"])
print(f"Estimated Cost: {estimate['total_algo']} ALGO")
```

---

## 🛠️ Advanced Configuration

### Resilient Retries
The SDK automatically handles transient network failures with **Exponential Backoff**.

```python
# Configure a custom timeout for long-running workflows
client = AgenticClient(
    api_key="sk_...",
    timeout=60,  # 60 seconds
    debug=True   # Enable verbose execution logs
)
```

---

## 📖 API Reference

| Method | Description |
| --- | --- |
| `list_agents()` | Fetch all published marketplace agents. |
| `get_agent(id)` | Fetch detailed metadata for a single agent. |
| `recommend_agents(intent)` | Get AI-driven suggestions for a task. |
| `get_agent_reputation(id)` | Retrieve trust scores and performance metrics. |
| `run_workflow(steps, input)` | Trigger a multi-agent orchestration pipeline. |
| `execute_pipeline(intent)` | Recommended -> Execute workflow in one call. |
| `get_workflow_status(id)` | Fetch the execution trace of a run. |
| `estimate_execution_cost(steps)` | Calculate total ALGO cost for a pipeline. |

---

## 📄 License
MIT License. See [LICENSE](LICENSE) for details.
