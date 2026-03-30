from fastapi import APIRouter
from .root import router as root_router
from .tasks import router as tasks_router
from .negotiation import router as negotiation_router
from .deals import router as deals_router

router = APIRouter()

router.include_router(root_router)
router.include_router(tasks_router, tags=["tasks"])
router.include_router(negotiation_router, tags=["negotiation"])
router.include_router(deals_router, tags=["deals"])
