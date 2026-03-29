from __future__ import annotations

from datetime import datetime
import os

from dotenv import load_dotenv
from uuid import uuid4

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from backend.agent_runner import run_negotiation
from backend.models import (
    DealResponse,
    NegotiationStartResponse,
    TaskCreateRequest,
    TaskCreateResponse,
)
from backend.store import DEALS, TASKS, DealRecord, TaskRecord

load_dotenv()

app = FastAPI(title="Agentic Exchange Backend", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5173",
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/create-task", response_model=TaskCreateResponse)
def create_task(payload: TaskCreateRequest) -> TaskCreateResponse:
    task_id = str(uuid4())
    created_at = datetime.utcnow()
    TASKS[task_id] = TaskRecord(payload=payload.model_dump(), status="created", created_at=created_at)
    DEALS[task_id] = DealRecord(status="pending", deal=None, updated_at=created_at)
    return TaskCreateResponse(task_id=task_id, status="created", created_at=created_at)


@app.post("/start-negotiation", response_model=NegotiationStartResponse)
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
    result = run_negotiation(task.payload)
    task.status = "completed"
    DEALS[task_id] = DealRecord(status="completed", deal=result, updated_at=datetime.utcnow())

    return NegotiationStartResponse(task_id=task_id, status="completed", started_at=started_at)


@app.get("/get-deal", response_model=DealResponse)
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
