from __future__ import annotations

import os
import sys
from typing import Any

# Allow importing the agent modules that live in the Agents/ folder
AGENTS_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "Agents"))
if AGENTS_DIR not in sys.path:
    sys.path.insert(0, AGENTS_DIR)

from buyer_agent import BuyerAgent  # type: ignore
from seller_agent import SellerAgent  # type: ignore
from negotiation_engine import NegotiationEngine  # type: ignore


def run_negotiation(payload: dict[str, Any]) -> dict[str, Any]:
    buyer = BuyerAgent(
        budget=payload["budget"],
        initial_offer=payload["initial_offer"],
        max_rounds=payload["max_rounds"],
        increase_pct=payload["increase_pct"],
        threshold=payload["threshold"],
        personality=payload["personality"],
        randomness=payload["randomness"],
    )

    seller = SellerAgent(
        min_price=payload["min_price"],
        initial_price=payload["initial_price"],
        max_rounds=payload["max_rounds"],
        decrease_pct=payload["decrease_pct"],
        threshold=payload["threshold"],
        personality=payload["personality"],
        randomness=payload["randomness"],
    )

    engine = NegotiationEngine(buyer=buyer, seller=seller, threshold=payload["threshold"])
    return engine.run()
