from fastapi import APIRouter
from .root import router as root_router
from .deal import router as deal_router

router = APIRouter()

router.include_router(root_router)
router.include_router(deal_router, tags=["deals"])
