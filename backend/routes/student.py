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
    db = await get_database()
    
    # Get user's query history, sorted by most recent first
    history = await db.query_history.find(
        {"email": current_user["email"]}
    ).sort("timestamp", -1).limit(50).to_list(50)
    
    # Convert ObjectId to string for JSON serialization
    for item in history:
        item["_id"] = str(item["_id"])
        # Convert datetime to ISO format string
        if "timestamp" in item:
            item["timestamp"] = item["timestamp"].isoformat()
    
    return {
        "queries": history
    }
