# Agentic Exchange

Agentic Exchange is an autonomous negotiation marketplace built on Algorand. Buyers create tasks, sellers accept them, AI agents negotiate the deal, and escrow is handled on‑chain with milestone releases.

This repo contains:
- **FastAPI backend** for negotiation orchestration, storage, and Algorand transaction building
- **React (Vite) frontend** for user flows and wallet interactions
- **PyTeal smart contract** for escrow + milestone release

## Deployed Smart Contract (TestNet)

- **App ID:** `758126516`
- **App Address:** `JUSRQVITC54J3NTYZXEPLXNC6RLKYSWGPCIIVJQ2SLJJRN2Y2FQBA5IK4A`

## Core Flow (End‑to‑End)

1. **Buyer creates task** (off‑chain, stored in DB)
2. **Seller accepts task** (off‑chain)
3. **Negotiation starts** (AI agents)
4. **Both parties approve** (off‑chain)
5. **Buyer creates escrow on‑chain**
6. **Buyer deposits funds on‑chain**
7. **Seller accepts on‑chain**
8. **Buyer releases milestone payments on‑chain**
9. **Buyer finalizes deal** → status becomes **Completed**

## Key Features

- AI‑driven buyer/seller negotiation engine
- Off‑chain task lifecycle + approvals
- Algorand escrow with milestones
- On‑chain accept + release
- Dashboard for deal tracking

## Tech Stack

- **Backend:** FastAPI, Python
- **Frontend:** React + Vite + Tailwind
- **Blockchain:** Algorand TestNet
- **Contracts:** PyTeal
- **Database:** MongoDB

## Prerequisites

- **Python 3.10+**
- **Node.js 18+**
- **npm**
- Algorand wallet (Pera / Defly) on **TestNet**

## Setup

### 1) Backend

```bash
pip install -r requirements.txt
```

Create `.env` in project root:

```bash
GEMINI_API_KEY=your_gemini_key
MONGODB_URI=your_mongo_uri
MONGODB_DB=agentic_exchange
ALGOD_ADDRESS=https://testnet-api.algonode.cloud
ALGOD_TOKEN=
APP_ID=758126516
CONTRACT_BOX_FUNDING=160000
```

Run:

```bash
uvicorn backend.main:app --reload
```

Backend URL: `http://127.0.0.1:8000`

### 2) Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend URL: `http://localhost:5173`

## API Overview

### Deals
- `POST /create-deal`
- `POST /deal/{id}/accept`
- `POST /start-negotiation`
- `POST /deal/{id}/approve`
- `POST /deal/{id}/onchain-accept`
- `POST /deal/{id}/fund`
- `POST /deal/{id}/release`
- `POST /deal/{id}/complete`
- `GET /deal/{id}`
- `GET /deals`

### Contract Helpers
- `GET /contract/info`
- `POST /contract/create-txn`
- `POST /contract/accept-txn`
- `POST /contract/deposit-txn`
- `POST /contract/release-txn`
- `POST /contract/submit`
- `GET /wallet/balance`

## Smart Contract (PyTeal)

Location: `smart_contract/escrow_contract.py`

Supports:
- Multi‑deal storage using **boxes**
- On‑chain accept for buyer/seller
- Escrow deposit
- Milestone release
- Completion after all releases

To compile:
```bash
python smart_contract/compile.py
```

To deploy new app (optional):
```bash
python smart_contract/deploy_testnet.py
```

## Project Structure

- `backend/` — FastAPI routes + services
- `frontend/` — React UI
- `smart_contract/` — PyTeal escrow contract
- `Agents/` — AI negotiation agents

## Troubleshooting

**1) Negotiation won’t start**
- Ensure `GEMINI_API_KEY` is set in `.env`

**2) Seller accept fails / release fails**
- Ensure seller wallet is captured (on‑chain accept stores it automatically)

**3) Buyer can’t create escrow**
- Check wallet min balance; Algorand requires minimum balance for accounts
- Box funding is configurable via `CONTRACT_BOX_FUNDING`

**4) Page refresh redirects to home**
- Wallet reconnect runs on load; wait 1–2 seconds for session restore

## Notes

- Currency in UI uses INR, but escrow uses **microAlgos** (1:1 for demo)
- TestNet only for development
