from fastapi import APIRouter, Depends
from utils import require_role
from database import get_database
from datetime import datetime
from database import get_database

router = APIRouter(prefix="/student", tags=["Student"])

@router.get("/dashboard")
async def get_dashboard(current_user: dict = Depends(require_role(["student"]))):
    """Get student dashboard data."""
    return {
        "message": "Welcome to Student Dashboard",
        "user": current_user["email"]
    }

@router.post("/chat/session")
async def create_chat_session(
    current_user: dict = Depends(require_role(["student"]))
):
    """
    Create a new chat session for the current student.
    """
    print(current_user)
    session_data = {
        "user_id": str(current_user["user_id"]),
        "title": "New Chat",
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
        "is_active": True
    }

    db = await get_database()
    result = await db.chat_sessions.insert_one(session_data)

    return {
        "message": "Chat session created successfully",
        "session_id": str(result.inserted_id),
        "created_at": session_data["created_at"]
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
