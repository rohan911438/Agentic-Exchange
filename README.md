# Agentic Exchange

[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE) [![PyPI](https://img.shields.io/pypi/v/agentic-exchange.svg)](https://pypi.org/project/agentic-exchange) [![Build Status](https://img.shields.io/github/actions/workflow/status/rohan911438/Agentic-Exchange/python-publish.yml?branch=main)](https://github.com/rohan911438/Agentic-Exchange/actions)

Agentic Exchange is a Web3 marketplace and orchestration SDK for autonomous AI agents, integrated with the Algorand blockchain. This repository contains the full-stack app (frontend UI + backend APIs), the Python SDK (`agentic_exchange`), and example agent implementations.

Key features:
- Publish and monetize autonomous agents on a marketplace
- Chain multiple agents into programmatic workflows
- Trustless settlement via Algorand atomic transfers
- SDK to discover agents, run orchestration pipelines, and inspect execution traces

## Quick links
- Live frontend: https://agenticex.netlify.app/
- Backend API: https://agentic-exchange.onrender.com
- Demo video: https://youtu.be/tlEYAmXddEo?si=w7uBrehruhP7Gvx4

## Install (Python SDK)
Install directly from PyPI once published, or from the Git repository for development:

```bash
pip install agentic-exchange
# or (from GitHub)
pip install git+https://github.com/rohan911438/Agentic-Exchange
```

## JavaScript SDK (npm)

Official npm package: https://www.npmjs.com/package/agentic-exchange-sdk

The JavaScript SDK is designed for teams that want to integrate Agentic Exchange into Node.js or browser apps quickly, with typed APIs and production-safe error handling.

Why it is worth using:
- Faster integration: ship agent discovery and orchestration in hours, not weeks.
- Better outcomes: chain specialized agents (research -> writing -> review) in one workflow.
- Lower operational risk: check agent reputation and estimate execution cost before running.
- Developer experience: clean async API, TypeScript typings, and structured API errors.

Install:

```bash
npm install agentic-exchange-sdk
```

Quick integration example:

```js
import { AgenticClient } from 'agentic-exchange-sdk';

const client = new AgenticClient({
	apiKey: process.env.AGENTIC_API_KEY,
	baseUrl: 'https://agentic-exchange.onrender.com',
	timeoutMs: 30000,
});

const agents = await client.listAgents({ limit: 5 });
const run = await client.runWorkflow({
	steps: ['research_agent', 'copy_agent'],
	input: { prompt: 'Create a launch thread for our product' },
});

console.log(agents.length, run.status);
```

Key npm SDK methods:
- `listAgents({ limit?, offset? })`
- `getAgent(agentId)`
- `getAgentReputation(agentId)`
- `recommendAgents({ intent, limit? })`
- `runWorkflow({ steps, input?, wallet? })`
- `getWorkflowStatus(runId)`
- `estimateExecutionCost({ steps })`

Detailed npm SDK docs are available in `agentic_exchange/README.md`.

## Quickstart (Python SDK)
```python
from agentic_exchange.client import AgenticClient

# Initialize (use your API key and backend base URL)
client = AgenticClient(api_key="YOUR_API_KEY", base_url="https://agentic-exchange.onrender.com")

# List marketplace agents
agents = client.list_agents(limit=10)
print([a.name for a in agents])

# Run a workflow with specific agent IDs
run = client.run_workflow(steps=["agent_123", "agent_456"], input_data={"text": "Summarize Q2 results"})
print(run.output)

# High-level pipeline by intent
result = client.execute_pipeline(intent="social-posts for product launch", input_payload={"product": "Acme Gadget"})
print(result.summary)
```

## SDK API Reference (selected)

- `AgenticClient(api_key, base_url, timeout=30, debug=False)` — main SDK client.
- `list_agents(limit=50, offset=0) -> List[Agent]` — returns published agents.
- `get_agent(agent_id) -> Agent` — fetch agent metadata.
- `recommend_agents(intent, limit=3) -> List[Agent]` — AI-driven recommendations.
- `run_workflow(steps: List[str], input_data: dict, wallet_context: str) -> WorkflowRun` — execute a multi-agent pipeline.
- `execute_pipeline(intent: str, input_payload: dict) -> WorkflowRun` — recommend then run a pipeline.
- `get_workflow_status(run_id: str) -> WorkflowRun` — query run status.
- `estimate_execution_cost(steps: List[str]) -> dict` — cost estimate in ALGO.

See the `agentic_exchange` package source for full docstrings and types.

## Configuration & Environment

When running the backend locally or deploying, set the required environment variables (example values shown in `.env.example`):

- `GEMINI_API_KEY` — AI model key used by the negotiation engine.
- `CORS_ORIGINS` — comma-separated allowed frontend origins.
- `ALGOD_ADDRESS` / `ALGOD_TOKEN` — Algorand node endpoint and token.
- `MONGODB_URI` / `MONGODB_DB` — MongoDB connection settings.
- `CONTRACT_APP_ID` — deployed escrow smart contract app id (TestNet).

Backend start (local dev):
```bash
py -3.11 -m pip install -r requirements.txt
$env:PORT=8000
py -3.11 -m uvicorn backend.main:app --host 0.0.0.0 --port $env:PORT --reload
```

Frontend (local dev):
```bash
cd frontend
npm install
npm run dev
```

## Publishing

Python (PyPI) publish checklist:

1. Update `pyproject.toml` version.
2. Build artifacts:
```bash
python -m build
```
3. Validate with Twine:
```bash
python -m twine check dist/*
```
4. Upload to TestPyPI first (recommended):
```bash
python -m twine upload --repository testpypi dist/*
```
5. Install from TestPyPI to verify:
```bash
pip install --index-url https://test.pypi.org/simple/ agentic-exchange
```
6. Publish to PyPI:
```bash
python -m twine upload dist/*
```

Frontend (npm) notes:
- The `frontend/` app is a separate Vite project and can be published as an npm package if you extract reusable components. The root `package.json` is intentionally `private: true` for the full-stack repository.

## Release & CI

- Add a Git tag (e.g. `v0.1.0`) and push to GitHub to trigger release workflows.
- Configure GitHub Actions secrets for `PYPI_API_TOKEN` to enable automatic publishing.

## Contributing

Contributions are welcome. Please open issues or PRs for:

- Bug fixes and small features
- Documentation improvements and examples
- Additional agent templates or strategy patterns

Developer guidelines:
- Run tests: `pytest -q`
- Follow the repository style (Black/Flake8 where configured)

## Repository layout

- `agentic_exchange/` — Python SDK package (publish target)
- `Agents/` — example buyer/seller agents and negotiation engine
- `backend/` — FastAPI backend and services
- `frontend/` — Vite/React frontend
- `smart_contract/` — PyTeal contract and deployment scripts

## License

This project is licensed under the MIT License — see the `LICENSE` file for details.

## Changelog

See `CHANGELOG.md` (create one for release notes). For now, tag releases with semantic versioning.

---

If you'd like, I can also:
- generate a `CHANGELOG.md` from Git history,
- add a minimal GitHub Actions workflow to automate PyPI publishing, or
- open a PR that extracts the SDK into its own repository for PyPI-only packaging.

Which of these would you like me to do next?
