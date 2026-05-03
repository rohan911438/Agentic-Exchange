"""Small example demonstrating basic SDK usage."""
from agentic_exchange import AgenticClient


def main():
    client = AgenticClient(api_key="test_api_key", base_url="https://api.agentic.exchange")

    deal = client.negotiate(
        buyer={"budget": 500},
        seller={"min_price": 300},
        task={"description": "Build a website"},
    )

    print("Negotiated deal:", deal)

    txn = client.create_deal(deal=deal, buyer_wallet="BUYER_ADDR", seller_wallet="SELLER_ADDR")
    print("Transaction payload:", txn.to_dict())


if __name__ == "__main__":
    main()
