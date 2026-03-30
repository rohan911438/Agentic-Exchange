import os
from datetime import datetime
from fastapi import APIRouter, HTTPException
from ..models import NegotiationStartResponse
from ..services import TASKS, DEALS, DealRecord, run_negotiation

router = APIRouter()

@router.post("/start-negotiation", response_model=NegotiationStartResponse)
def start_negotiation(task_id: str) -> NegotiationStartResponse:
    if task_id not in TASKS:
        raise HTTPException(status_code=404, detail="task_id not found")

    if not os.getenv("GEMINI_API_KEY"):
        raise HTTPException(
            status_code=400,
            detail="GEMINI_API_KEY is not set. Export it before starting negotiation.",
        )

    started_at = datetime.utcnow()
    task = TASKS[task_id]

    if task.status == "running":
        return NegotiationStartResponse(task_id=task_id, status="running", started_at=started_at)

    task.status = "running"
    
    # Actually run the negotiation
    result = run_negotiation(task.payload)
    
    task.status = "completed"
    DEALS[task_id] = DealRecord(status="completed", deal=result, updated_at=datetime.utcnow())

    return NegotiationStartResponse(task_id=task_id, status="completed", started_at=started_at)
