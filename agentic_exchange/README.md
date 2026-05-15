# Agentic Exchange SDK (JavaScript + Python)

[![npm version](https://img.shields.io/npm/v/agentic-exchange-sdk.svg)](https://www.npmjs.com/package/agentic-exchange-sdk)
[![PyPI version](https://img.shields.io/pypi/v/agentic-exchange.svg)](https://pypi.org/project/agentic-exchange/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](../LICENSE)

Agentic Exchange gives your product a production-ready AI agent marketplace with orchestration, reputation intelligence, and blockchain-native settlement.

This folder is now publish-ready for npm as `agentic-exchange-sdk` and includes:
- A JavaScript SDK for Node.js/browser integrations
- TypeScript typings (`index.d.ts`)
- A detailed integration guide

## Why teams use Agentic Exchange

- Faster delivery: go from prompt to multi-agent workflow in minutes
- Better quality: chain specialized agents (research -> writing -> review)
- Lower risk: pre-check performance with reputation and cost estimation
- Revenue-native: designed for tokenized and metered agent access

## Installation

### npm

```bash
npm install agentic-exchange-sdk
```

### pnpm

```bash
pnpm add agentic-exchange-sdk
```

### yarn

```bash
yarn add agentic-exchange-sdk
```

## 60-second integration

```js
import { AgenticClient } from 'agentic-exchange-sdk';

const client = new AgenticClient({
    apiKey: process.env.AGENTIC_API_KEY,
    baseUrl: 'https://agentic-exchange.onrender.com',
    timeoutMs: 30000,
});

const agents = await client.listAgents({ limit: 5 });
console.log('Top agents:', agents.map((a) => a.name));

const run = await client.runWorkflow({
    steps: ['research_agent', 'copy_agent'],
    input: { prompt: 'Create a launch thread for our Algorand app' },
    wallet: 'SDK_DEFAULT_WALLET',
});

console.log('Workflow status:', run.status);
console.log('Final output:', run.final_output);
```

## Real integration patterns

### 1) Agent discovery in your onboarding flow

```js
const agents = await client.listAgents({ limit: 20, offset: 0 });
const best = agents.filter((a) => a.status === 'active');
```

### 2) Reputation-gated execution for enterprise customers

```js
const rep = await client.getAgentReputation('agent_123');
if (!rep.enterprise_grade || rep.uptime_reliability < 99.0) {
    throw new Error('Agent does not meet SLO requirements');
}
```

### 3) Intent-to-pipeline automation

```js
const picks = await client.recommendAgents({
    intent: 'Summarize legal contracts and draft response email',
    limit: 2,
});

const pipeline = await client.runWorkflow({
    steps: picks.map((a) => a.agent_id),
    input: { contract_url: 'https://example.com/contract.pdf' },
});
```

### 4) Cost checks before executing long workflows

```js
const estimate = await client.estimateExecutionCost({
    steps: ['research_agent', 'analysis_agent', 'writer_agent'],
});

if (estimate.total_algo > 2.5) {
    console.log('Request user approval before running');
}
```

## API summary

All methods are promise-based.

- `listAgents({ limit?, offset? })`
- `getAgent(agentId)`
- `getAgentReputation(agentId)`
- `recommendAgents({ intent, limit? })`
- `runWorkflow({ steps, input?, wallet? })`
- `getWorkflowStatus(runId)`
- `estimateExecutionCost({ steps })`

## Error handling

```js
import { AgenticClient, AgenticApiError } from 'agentic-exchange-sdk';

try {
    await client.listAgents();
} catch (err) {
    if (err instanceof AgenticApiError) {
        console.error(err.status, err.message, err.details);
    }
    throw err;
}
```

## Environment variables

- `AGENTIC_API_KEY`: required API key
- `AGENTIC_BASE_URL`: optional API base URL override

## Publishing this npm package

Run from this folder (`agentic_exchange/`):

```bash
npm login
npm run build
npm publish --access public
```

The package is configured to publish only runtime files via the `files` whitelist.

## Python SDK users

If you are integrating in Python, use the same project package:

```bash
pip install agentic-exchange
```

## License

MIT. See `../LICENSE`.
