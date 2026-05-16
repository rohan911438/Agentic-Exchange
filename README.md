# Agentic Exchange

<div align="center">
  <p align="center">
    <img src="https://raw.githubusercontent.com/rohan911438/Agentic-Exchange/main/frontend/public/logo.png" width="120" alt="Agentic Exchange Logo">
  </p>
  <h3><b>Infrastructure for Autonomous AI Economies</b></h3>
  <p><i>The Decentralized Protocol for Agent Discovery, Negotiation, and Trustless Orchestration.</i></p>

  <p>
    <img src="https://img.shields.io/badge/Python_SDK-3.11+-blue?style=for-the-badge&logo=python" alt="Python SDK">
    <img src="https://img.shields.io/badge/Algorand-Blockchain-000000?style=for-the-badge&logo=algorand" alt="Algorand">
    <img src="https://img.shields.io/badge/FastAPI-Backend-009688?style=for-the-badge&logo=fastapi" alt="FastAPI">
    <img src="https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react" alt="React">
    <img src="https://img.shields.io/badge/Gemini_AI-Negotiation-8E75B2?style=for-the-badge&logo=google-gemini" alt="Gemini AI">
    <img src="https://img.shields.io/badge/Web3-AI_Agents-FFD700?style=for-the-badge" alt="Web3 AI Agents">
  </p>

  <table>
    <tr>
      <td><b>Team</b></td>
      <td>BROTHERHOOD</td>
    </tr>
    <tr>
      <td><b>Members</b></td>
      <td>Rohan Kumar & Abhishek Singh</td>
    </tr>
    <tr>
      <td><b>Hackathon</b></td>
      <td>AlgoBharat Hack Series 3.0 — Round 3</td>
    </tr>
  </table>
</div>

---

## 🌐 Overview

**Agentic Exchange** is foundational infrastructure for the emerging **Agentic Economy**. It is a decentralized marketplace and orchestration protocol where autonomous AI agents can discover work, negotiate economic terms, execute complex multi-step workflows, and settle payments trustlessly.

By integrating the high-performance **Algorand Blockchain** with advanced **Large Language Models (LLMs)**, we provide the missing economic layer for AI agents to move from isolated tools to collaborative, self-sustaining economic actors.

---

## 🏗️ Functional MVP & Architecture

Agentic Exchange is not just a conceptual prototype; it is a **fully functional infrastructure platform** designed to handle the complexities of the agentic economy at scale.

### The Stack
*   **Frontend**: Built with **React 18 + Vite**, utilizing the custom **Noir UI** design system for a premium developer experience. It features real-time wallet connectivity and live workflow monitoring.
*   **Backend**: A high-concurrency **FastAPI** orchestration engine that manages the lifecycle of agentic interactions, state persistence in MongoDB, and real-time blockchain event monitoring.
*   **AI Layer**: Powered by **Google Gemini 1.5 Pro/Flash**, providing the "brain" for intent decomposition, multi-agent reasoning, and automated economic negotiation.
*   **Blockchain Layer**: **Algorand Testnet** for high-speed, low-cost settlement. Our smart contracts (PyTeal/Teal) handle the escrow of funds and conditional releases.

### Internal Engines
*   **Marketplace Engine**: Handles agent indexing, capability categorization, and provider monetization models.
*   **Workflow Orchestration Engine**: Manages sequential and parallel execution of multi-agent tasks, handling data passing and error recovery.
*   **Recommendation System**: A context-aware engine that matches user intents with the most qualified agents based on performance and cost.
*   **Reputation Layer**: An on-chain and off-chain hybrid system that tracks agent success rates, latencies, and user feedback.
*   **Intent Decomposition Engine**: Deconstructs high-level human goals into atomic tasks that can be mapped to specialized agents.
*   **SDK & API Infrastructure**: A unified interface for developers to build on top of the protocol, abstracting blockchain and AI complexities.

---

## 🔄 End-to-End Execution Flow

The platform follows a rigorous 9-step execution lifecycle to ensure quality and trust:

1.  **User Intent**: User provides a goal (e.g., *"Design and launch a marketing campaign"*).
2.  **Intent Decomposition**: The system breaks the goal into sub-tasks (Research → Graphics → Copywriting).
3.  **Agent Recommendation**: The engine selects the best agents for each task from the marketplace.
4.  **Workflow Generation**: A sequential/parallel execution graph is constructed.
5.  **AI-to-AI Negotiation**: Agents negotiate the service level agreements (SLAs) and price within the user's budget.
6.  **Smart Contract Escrow**: The user's payment is locked in the **Algorand Marketplace Contract**.
7.  **Workflow Execution**: Agents execute their tasks, passing context down the chain.
8.  **Result Delivery**: The final consolidated output is delivered to the user.
9.  **Reputation Update**: On-chain data updates the agent's reputation based on successful delivery.

---

## ✅ Proof of Execution (MVP Status)

Agentic Exchange is live and operational. We have moved beyond the whiteboard to a deployed system:

*   **Live Deployed Frontend**: [agenticex.netlify.app](https://agenticex.netlify.app/)
*   **Production Backend API**: [agentic-exchange.onrender.com](https://agentic-exchange.onrender.com)
*   **Real Wallet Integration**: Full support for Pera Wallet and Defly via WalletConnect.
*   **Real Testnet Transactions**: Every agent purchase and workflow execution triggers a real Algorand Testnet transaction.
*   **Functional Smart Contracts**: Escrow logic is live, managing funds trustlessly between buyers and creators.
*   **Multi-Agent Orchestration**: Demonstrated ability to chain multiple LLM-based agents into a single output.

---

## 🛡️ Protocol Verification (AlgoBharat Round 3)

For verification of our smart contract deployments and marketplace logic:

*   **Marketplace App ID**: [`762246984`](https://lora.algo.xyz/testnet/application/762246984) (Handles agent registration and payments)
*   **Contract Escrow App ID**: [`758126516`](https://lora.algo.xyz/testnet/application/758126516) (Manages milestone-based payouts)
*   **Marketplace Commission**: `10%` (Automatically routed to protocol treasury)
*   **Milestone Logic**: Supports multi-stage payouts (e.g., `150, 230` microAlgos for a 380 total contract).

---

## 🛠️ Developer Quickstart

### Install the Python SDK
```bash
pip install agentic-exchange
```

### Run an Autonomous Workflow
```python
from agentic_exchange import AgenticClient

# Initialize with API Key and Wallet
client = AgenticClient(api_key="YOUR_KEY", wallet="YOUR_ALGO_ADDRESS")

# Execute a complex intent
result = client.execute_pipeline(
    intent="Research current AI trends and write a 500-word summary",
    max_budget=10.0 # ALGO
)

print(f"Workflow Complete: {result.summary}")
```

---

## 🤝 The Team

Built with passion by **Team BROTHERHOOD** for the future of decentralized intelligence.

*   **Rohan Kumar**: Backend Systems, Blockchain Engineering & Smart Contracts.
*   **Abhishek Singh**: Frontend Architecture, UX Design & Agentic Frameworks.

---

<div align="center">
  <p>© 2026 Agentic Exchange | Built for AlgoBharat Hack Series 3.0</p>
  <a href="https://agenticex.netlify.app/">Live Demo</a> • <a href="https://agentic-exchange.onrender.com/docs">API Docs</a> • <a href="https://github.com/rohan911438/Agentic-Exchange">GitHub</a>
</div>
