from fastapi import APIRouter, Depends
from typing import List
from schemas import User, DashboardStats
from utils import require_role
from database import get_database
from datetime import datetime

router = APIRouter(prefix="/admin", tags=["Admin"])

@router.get("/dashboard", response_model=DashboardStats)
async def get_dashboard(current_user: dict = Depends(require_role(["admin"]))):
    """Get admin dashboard statistics."""
    db = await get_database()
    
    total = await db.users.count_documents({})
    students = await db.users.count_documents({"role": "student"})
    faculty = await db.users.count_documents({"role": "faculty"})
    admin = await db.users.count_documents({"role": "admin"})
    
    return DashboardStats(
        total_users=total,
        students=students,
        faculty=faculty,
        admin=admin
    )

@router.get("/users", response_model=List[User])
async def get_all_users(current_user: dict = Depends(require_role(["admin"]))):
    """Get all users (admin only)."""
    db = await get_database()
    
    users = await db.users.find({}, {"_id": 0, "password": 0}).to_list(1000)
    for user in users:
        if isinstance(user["created_at"], str):
            user["created_at"] = datetime.fromisoformat(user["created_at"])
    
    return [User(**user) for user in users]
