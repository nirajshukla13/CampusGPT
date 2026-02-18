from fastapi import APIRouter
from utils import hash_password
from database import get_database
from datetime import datetime, timezone
import uuid

router = APIRouter(prefix="/seed", tags=["Utilities"])

@router.post("")
async def seed_data():
    """Seed database with demo users."""
    db = await get_database()
    
    # Clear existing users
    await db.users.delete_many({})
    
    sample_users = [
        {
            "id": str(uuid.uuid4()),
            "name": "John Student",
            "email": "student@campus.com",
            "password": hash_password("student123"),
            "role": "student",
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Dr. Sarah Faculty",
            "email": "faculty@campus.com",
            "password": hash_password("faculty123"),
            "role": "faculty",
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Admin User",
            "email": "admin@campus.com",
            "password": hash_password("admin123"),
            "role": "admin",
            "created_at": datetime.now(timezone.utc).isoformat()
        }
    ]
    
    await db.users.insert_many(sample_users)
    
    return {
        "message": "Database seeded successfully",
        "users": [
            {"email": "student@campus.com", "password": "student123", "role": "student"},
            {"email": "faculty@campus.com", "password": "faculty123", "role": "faculty"},
            {"email": "admin@campus.com", "password": "admin123", "role": "admin"}
        ]
    }
