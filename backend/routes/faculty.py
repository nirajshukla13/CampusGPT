from fastapi import APIRouter, Depends
from utils import require_role
from database import get_database

router = APIRouter(prefix="/faculty", tags=["Faculty"])

@router.get("/dashboard")
async def get_dashboard(current_user: dict = Depends(require_role(["faculty"]))):
    """Get faculty dashboard data."""
    return {
        "message": "Welcome to Faculty Dashboard",
        "user": current_user["email"]
    }
