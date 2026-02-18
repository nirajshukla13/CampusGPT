from fastapi import APIRouter, Depends
from utils import require_role
from database import get_database

router = APIRouter(prefix="/student", tags=["Student"])

@router.get("/dashboard")
async def get_dashboard(current_user: dict = Depends(require_role(["student"]))):
    """Get student dashboard data."""
    return {
        "message": "Welcome to Student Dashboard",
        "user": current_user["email"]
    }

@router.get("/history")
async def get_history(current_user: dict = Depends(require_role(["student"]))):
    """Get student query history."""
    return {
        "queries": []
    }
