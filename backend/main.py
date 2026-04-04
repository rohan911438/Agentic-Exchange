from __future__ import annotations

import os
import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[1]
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

if __package__ and __package__.startswith("backend"):
    from backend.routes import router as api_router
else:
    from routes import router as api_router

try:
    from dotenv import load_dotenv
except ImportError:
    load_dotenv = None

if load_dotenv is not None:
    load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), "..", ".env"))

app = FastAPI(
    title="Agentic Exchange Backend",
    description="Backend for the Agentic Exchange platform supporting autonomous agent negotiations.",
    version="0.1.0"
)

# Enable CORS (allowing all origins as per Stage 1 requirements)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include modular routes
app.include_router(api_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app" if __package__ and __package__.startswith("backend") else "main:app", host="127.0.0.1", port=8000, reload=True)
