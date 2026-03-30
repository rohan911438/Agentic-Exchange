import os
from datetime import datetime
from fastapi import APIRouter, HTTPException
from ..models import (
    DealCreateRequest, 
    DealCreateResponse, 
    NegotiationRequest, 
    NegotiationResponse, 
    DealDetailsResponse
)
from ..services import (
    create_deal, 
    get_deal, 
    update_deal, 
    list_deals, 
    run_negotiation
)

router = APIRouter()

@router.post("/create-deal", response_model=DealCreateResponse)
def post_create_deal(payload: DealCreateRequest) -> DealCreateResponse:
    """
    1. Create Deal: Takes parameters and returns a deal_id.
    """
    deal_id = create_deal(data=payload.model_dump(), status="created")
    return DealCreateResponse(
        deal_id=deal_id,
        status="created",
        created_at=datetime.utcnow()
    )


@router.post("/start-negotiation", response_model=NegotiationResponse)
def post_start_negotiation(payload: NegotiationRequest) -> NegotiationResponse:
    """
    2. Start Negotiation: Takes deal_id and executes agents.
    """
    deal_record = get_deal(payload.deal_id)
    if not deal_record:
        raise HTTPException(status_code=404, detail="Deal ID not found")

    if not os.getenv("GEMINI_API_KEY"):
        raise HTTPException(
            status_code=400,
            detail="GEMINI_API_KEY is not set. Please configure it to enable agents.",
        )

    # Update status to running
    update_deal(payload.deal_id, status="running")
    
    # Actually run the negotiation using the parameters from the record
    # deal_record["data"] contains {budget, min_price, deadline, description}
    result = run_negotiation(deal_record["data"])
    
    # Map engine results to status
    success = result.get("status") == "closed"
    status = "success" if success else "failed"
    
    # Persist the final result
    update_deal(payload.deal_id, data=result, status=status)
    
    return NegotiationResponse(
        status=status,
        final_price=result.get("final_price"),
        conversation=result.get("conversation"),
        rounds=result.get("rounds")
    )


@router.get("/deal/{id}", response_model=DealDetailsResponse)
def get_deal_by_id(id: str) -> DealDetailsResponse:
    """
    3. Get Deal: Fetch specific deal by ID.
    """
    deal_record = get_deal(id)
    if not deal_record:
        raise HTTPException(status_code=404, detail="Deal ID not found")
        
    return DealDetailsResponse(
        deal_id=id,
        status=deal_record["status"],
        data=deal_record["data"],
        created_at=datetime.utcnow() # Using current time for placeholder
    )


@router.get("/deals")
def list_all_deals():
    """
    4. List Deals: Show all records in the store.
    """
    return list_deals()
