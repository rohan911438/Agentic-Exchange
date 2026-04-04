# Agentic Exchange

## 1. 🔥 Project Title & Tagline
### Agentic Exchange
AI agents negotiate. Algorand secures. Commerce executes itself.

Agentic Exchange is a next-generation marketplace where autonomous buyer and seller agents negotiate deal terms in natural language, then execute payment guarantees through Algorand smart contract escrow.

Built for AlgoBharat Hack Series 3.0 (Round 2), this project demonstrates a production-style core flow:

UI -> AI negotiation -> smart contract escrow -> milestone-based execution

## 2. 👥 Team Information
- Team Name: BROTHERHOOD
- Team Members:
	- Rohan Kumar
	- Abhishek Singh
- Hackathon: AlgoBharat Hack Series 3.0 (Round 2)
- Track: Agentic Commerce (AI + Blockchain)

## 3. 🚀 Problem Statement
Freelance and service marketplaces still depend on manual negotiation, trust assumptions, and delayed enforcement.

Key pain points:
- Time lost in repetitive price and scope discussions.
- Lack of trust between unknown parties.
- Payment disputes due to weak milestone enforcement.
- Poor transparency in multi-step service delivery.

## 4. 💡 Solution Overview
Agentic Exchange automates the complete deal lifecycle:
- Users submit intent (task, budget preference, timelines, milestones).
- AI buyer and seller agents negotiate like humans and converge on fair terms.
- Approved terms are translated into blockchain-backed escrow logic.
- Funds are released only when milestones are confirmed.

Result: faster deal closure, trustless execution, and reduced dispute friction.

## 5. 🧠 Core Innovation
- Autonomous Negotiation Engine:
	Buyer and seller AI agents optimize for outcome quality, fairness, and closure probability.
- Conversational Deal Structuring:
	Agents negotiate price, delivery windows, and milestone breakups in human-like exchanges.
- On-Chain Trust Layer:
	Algorand smart contract escrow enforces milestone releases and completion state transitions.
- Agentic Commerce Focus:
	A single, clear core flow is prioritized and fully implemented end-to-end.

## 6. ⚙️ How It Works (Step-by-step flow)
1. Buyer creates a deal request in the frontend.
2. Seller accepts and enters negotiation.
3. AI buyer and seller agents run multi-turn negotiation.
4. Both sides approve the negotiated terms.
5. Backend generates escrow transaction payloads.
6. Buyer signs and submits on-chain escrow creation and funding.
7. Seller performs on-chain acceptance.
8. Buyer releases milestone payments as work is validated.
9. Deal is marked complete after final milestone settlement.

## 7. 🏗️ System Architecture
```text
Frontend (React)
		|
		| REST API + Wallet Actions
		v
Backend (FastAPI)
		|-- Negotiation Service
		|     |-- Buyer Agent
		|     |-- Seller Agent
		|
		|-- Deal Store (state + lifecycle)
		|
		|-- Algorand Service
					 |
					 v
	 Smart Contract Escrow (Algorand)
					 |
					 v
	 Milestone Settlement + Final Completion
```

## 8. 🧩 Tech Stack
- Frontend: React, Vite, Tailwind CSS
- Backend: FastAPI, Python
- AI Layer: Agent-based negotiation orchestration
- Blockchain: Algorand TestNet
- Smart Contracts: PyTeal
- Storage: MongoDB

## 9. 🔗 Algorand Integration
Why Algorand:
- Low transaction fees make milestone-level payments practical.
- Fast finality improves user trust and UX for settlement-critical actions.
- High reliability is ideal for automated agentic commerce workflows.

How Algorand is used:
- Smart contract escrow secures funds for negotiated deals.
- Milestone release logic ensures payment only after agreed progress.
- On-chain acceptance and completion states reduce disputes and ambiguity.

Wallet-based authentication and signing:
- Users connect wallets from the frontend.
- Sensitive financial actions are signed client-side by the user.
- Backend coordinates transaction creation and submission workflow.

Current TestNet deployment:
- App ID: 758126516
- App Address: JUSRQVITC54J3NTYZXEPLXNC6RLKYSWGPCIIVJQ2SLJJRN2Y2FQBA5IK4A

## 10. 🎯 Hackathon Requirement Alignment
This submission explicitly satisfies the track expectations:

- Full-stack implementation:
	Frontend UI + FastAPI backend + Algorand smart contract integration.
- End-to-end working flow:
	UI -> AI negotiation -> smart contract -> execution.
- Real blockchain integration:
	Escrow and milestone flow run on Algorand TestNet.
- Single core flow execution:
	Autonomous negotiation + escrow deal execution is fully demonstrated.

## 11. 🧪 Demo Instructions (How to run locally)
Prerequisites:
- Python 3.10+
- Node.js 18+
- npm
- Algorand TestNet wallet

### A) Run Backend
```bash
pip install -r requirements.txt
```

Create a .env file in project root:
```env
GEMINI_API_KEY=your_gemini_key
MONGODB_URI=your_mongo_uri
MONGODB_DB=agentic_exchange
ALGOD_ADDRESS=https://testnet-api.algonode.cloud
ALGOD_TOKEN=
APP_ID=758126516
CONTRACT_BOX_FUNDING=160000
```

Start backend:
```bash
uvicorn backend.main:app --reload
```

Backend runs at: http://127.0.0.1:8000

### B) Run Frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: http://localhost:5173

### C) Test Negotiation API
Use the backend docs or call endpoints directly:
- Start with creating a deal and seller acceptance.
- Trigger negotiation using:
	- POST /start-negotiation
- Inspect negotiated messages and proposed final terms.

Example (replace values as needed):
```bash
curl -X POST http://127.0.0.1:8000/start-negotiation \
	-H "Content-Type: application/json" \
	-d "{\"deal_id\":\"<deal_id>\"}"
```

### D) Simulate Full Deal Flow
1. Create deal from UI.
2. Accept deal as seller.
3. Run AI negotiation and approvals.
4. Connect buyer wallet and create escrow transaction.
5. Fund escrow from buyer wallet.
6. Perform seller on-chain accept.
7. Release milestone payments from buyer side.
8. Mark deal completed after all milestones.

## 12. 🎥 Demo Video (placeholder link)
- Demo Video: https://youtu.be/your-demo-link

## 13. 📂 Project Structure
```text
frontend/         # React application (UI, pages, wallet context, services)
backend/          # FastAPI APIs, routing, services, schemas
Agents/           # AI buyer/seller agents and negotiation engine
smart_contract/   # Algorand smart contract, compile and deploy scripts
```

Note:
- agents/ in documentation maps to Agents/ in this repository.
- contracts/ in documentation maps to smart_contract/ in this repository.

## 14. 🚀 Future Scope
- Fully autonomous agents with adaptive long-term reputation memory.
- DAO-based dispute resolution for contested milestones.
- Multi-agent marketplaces with specialist subcontractor agents.
- Cross-chain settlement rails while retaining Algorand escrow as anchor layer.
- Risk scoring and fraud detection using behavioral agent analytics.

## 15. 🏆 Why This Project Matters
Agentic Exchange demonstrates how AI and blockchain can jointly unlock real autonomous commerce:
- AI removes negotiation overhead and accelerates deal closure.
- Algorand escrow enforces trust without centralized intermediaries.
- Milestone-based settlement protects both buyer and seller interests.
- The architecture is practical, extensible, and aligned with real market needs.

This is not just a concept demo. It is a functional foundation for machine-to-machine and human-to-agent economic coordination in the next era of digital marketplaces.
