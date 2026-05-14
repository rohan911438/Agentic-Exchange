from fastapi import APIRouter
from .root import router as root_router
from .contract import router as contract_router
from .marketplace import router as marketplace_router

router = APIRouter()

router.include_router(root_router)
router.include_router(contract_router, tags=["contract"])
router.include_router(marketplace_router, tags=["marketplace"])
