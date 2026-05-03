# Agentic Exchange Python SDK

This SDK provides a developer-friendly interface to Agentic Exchange: autonomous agent negotiation and on-chain execution for economic transactions.

Quickstart

```python
from agentic_exchange import AgenticClient

client = AgenticClient(api_key="YOUR_API_KEY")

deal = client.negotiate(
    buyer={"budget": 500},
    seller={"min_price": 300},
    task={"description": "Build a website"}
)

txn = client.create_deal(deal=deal, buyer_wallet="BUYER_ADDRESS", seller_wallet="SELLER_ADDRESS")

# Option A: return unsigned blob for client-side wallet signing
unsigned = txn.unsigned_txn

# Option B: if you have a signed blob (server-side signing), submit it
# client.execute(txn, signed_blob=signed_blob)
```

Design goals: simplicity, safety, extensibility, and clear error handling.