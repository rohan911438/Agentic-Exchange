from __future__ import annotations

from buyer_agent import BuyerAgent
from seller_agent import SellerAgent
from strategy import is_within_threshold
from utils import log_round, print_final_result


class NegotiationEngine:
    def __init__(self, buyer: BuyerAgent, seller: SellerAgent, threshold: float = 20.0) -> None:
        self.buyer = buyer
        self.seller = seller
        self.threshold = threshold

    def run(self) -> dict:
        max_rounds = min(self.buyer.max_rounds, self.seller.max_rounds)
        history: list[dict] = []

        for round_number in range(1, max_rounds + 1):
            buyer_offer = self.buyer.make_offer(round_number)
            seller_price = self.seller.make_counter(round_number)

            log_round(round_number, buyer_offer, seller_price)
            history.append(
                {
                    "round": round_number,
                    "buyer": buyer_offer,
                    "seller": seller_price,
                }
            )

            if self.seller.can_accept(buyer_offer):
                return {
                    "status": "success",
                    "final_price": round(buyer_offer, 2),
                    "rounds": round_number,
                    "history": history,
                }

            if self.buyer.can_accept(seller_price):
                return {
                    "status": "success",
                    "final_price": round(seller_price, 2),
                    "rounds": round_number,
                    "history": history,
                }

            if is_within_threshold(buyer_offer, seller_price, self.threshold):
                agreed_price = round((buyer_offer + seller_price) / 2, 2)
                return {
                    "status": "success",
                    "final_price": agreed_price,
                    "rounds": round_number,
                    "history": history,
                }

        return {
            "status": "failed",
            "final_price": None,
            "rounds": max_rounds,
            "history": history,
        }


def main() -> None:
    buyer = BuyerAgent(
        budget=500,
        initial_offer=300,
        max_rounds=8,
        increase_pct=0.10,
        threshold=20,
        personality="neutral",
        randomness=0.02,
    )

    seller = SellerAgent(
        min_price=350,
        initial_price=500,
        max_rounds=8,
        decrease_pct=0.10,
        threshold=20,
        personality="neutral",
        randomness=0.02,
    )

    engine = NegotiationEngine(buyer=buyer, seller=seller, threshold=20)
    result = engine.run()
    print_final_result(result)


if __name__ == "__main__":
    main()
