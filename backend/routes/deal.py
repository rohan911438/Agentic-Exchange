from fastapi import APIRouter
from ..models import NegotiationDirectRequest, NegotiationDirectResponse
from ..services import run_negotiation, create_deal, list_deals

router = APIRouter()

@router.post("/start-negotiation", response_model=NegotiationDirectResponse)
def start_negotiation(payload: NegotiationDirectRequest) -> NegotiationDirectResponse:
    # Run the negotiation using the service
    result = run_negotiation(payload.model_dump())
    
    # Map the service results to the requested output format
    status = "success" if result.get("status") == "closed" else "failed"
    
    # Persist the deal in the specialized in-memory store
    # Using the negotiation response data as the deal record
    create_deal(data=result, status="negotiated" if status == "success" else "failed")
    
    return NegotiationDirectResponse(
        status=status,
        final_price=result.get("final_price"),
        conversation=result.get("conversation"),
        rounds=result.get("rounds")
    )


@router.get("/deals")
def get_all_deals():
    """
    Returns all stored deals.
    """
    return list_deals()
