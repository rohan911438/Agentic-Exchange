import json
from agentic_exchange.models import NegotiationResult, Deal


def test_negotiation_result_from_dict():
    data = {
        "final_price": 1000,
        "milestones": [{"title": "Phase 1", "amount": 500}],
        "rounds": [{"proposer": "buyer", "price": 900, "note": "first"}],
        "confidence": 0.85,
        "agent_fee": 50,
    }
    nr = NegotiationResult.from_dict(data)
    assert nr.final_price == 1000.0
    assert len(nr.milestones) == 1
    assert nr.confidence == 0.85


def test_deal_from_dict():
    data = {
        "id": "deal_123",
        "negotiation": {
            "final_price": 200,
            "milestones": [{"title": "M1", "amount": 200}],
            "rounds": [],
            "confidence": 0.9,
            "agent_fee": 10,
        },
        "buyer": {"budget": 500},
        "seller": {"min_price": 100},
    }
    deal = Deal.from_dict(data)
    assert deal.id == "deal_123"
    assert deal.negotiation.final_price == 200.0
