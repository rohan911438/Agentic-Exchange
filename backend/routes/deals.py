from datetime import datetime
from fastapi import APIRouter, HTTPException
from ..models import DealResponse
from ..services import TASKS, DEALS

router = APIRouter()

@router.get("/get-deal", response_model=DealResponse)
def get_deal(task_id: str) -> DealResponse:
    if task_id not in TASKS:
        raise HTTPException(status_code=404, detail="task_id not found")

    deal_record = DEALS.get(task_id)
    if not deal_record:
        return DealResponse(task_id=task_id, status="pending", deal=None, updated_at=datetime.utcnow())

    return DealResponse(
        task_id=task_id,
        status=deal_record.status,
        deal=deal_record.deal,
        updated_at=deal_record.updated_at,
    )
