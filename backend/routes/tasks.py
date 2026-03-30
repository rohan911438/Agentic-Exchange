from datetime import datetime
from uuid import uuid4
from fastapi import APIRouter
from ..models import TaskCreateRequest, TaskCreateResponse
from ..services import TASKS, DEALS, TaskRecord, DealRecord

router = APIRouter()

@router.post("/create-task", response_model=TaskCreateResponse)
def create_task(payload: TaskCreateRequest) -> TaskCreateResponse:
    task_id = str(uuid4())
    created_at = datetime.utcnow()
    TASKS[task_id] = TaskRecord(payload=payload.model_dump(), status="created", created_at=created_at)
    DEALS[task_id] = DealRecord(status="pending", deal=None, updated_at=created_at)
    return TaskCreateResponse(task_id=task_id, status="created", created_at=created_at)
