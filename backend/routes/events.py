from fastapi import APIRouter, HTTPException, Depends, Query
from database import get_database
from utils import get_current_user
from typing import List, Optional
from datetime import datetime, date
from pydantic import BaseModel
import uuid

router = APIRouter(prefix="/events", tags=["Events"])

class Event(BaseModel):
    id: str
    title: str
    description: str
    date: str  # Format: "2026-01-02"
    day: str  # Monday, Tuesday, etc.
    category: str  # technical, cultural, sports, academic, workshop, other
    organizer: Optional[str] = None
    location: Optional[str] = None
    is_featured: bool = False

@router.get("/all")
async def get_all_events(
    category: Optional[str] = None,
    from_date: Optional[str] = None,
    to_date: Optional[str] = None,
    limit: int = Query(default=100, le=500)
):
    """Get all events with optional filtering."""
    try:
        db = await get_database()
        
        # Build query
        query = {}
        if category:
            query["category"] = category
        if from_date:
            query["date"] = {"$gte": from_date}
        if to_date:
            if "date" in query:
                query["date"]["$lte"] = to_date
            else:
                query["date"] = {"$lte": to_date}
        
        events = await db.events.find(query, {"_id": 0}).limit(limit).to_list(length=limit)
        return {"events": events, "count": len(events)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching events: {str(e)}")

@router.get("/upcoming")
async def get_upcoming_events(limit: int = Query(default=10, le=50)):
    """Get upcoming events from today onwards."""
    try:
        db = await get_database()
        today = date.today().isoformat()
        
        events = await db.events.find(
            {"date": {"$gte": today}},
            {"_id": 0}
        ).sort("date", 1).limit(limit).to_list(length=limit)
        
        return {"events": events, "count": len(events)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching upcoming events: {str(e)}")

@router.get("/featured")
async def get_featured_events():
    """Get featured events."""
    try:
        db = await get_database()
        today = date.today().isoformat()
        
        events = await db.events.find(
            {"is_featured": True, "date": {"$gte": today}},
            {"_id": 0}
        ).sort("date", 1).limit(5).to_list(length=5)
        
        return {"events": events, "count": len(events)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching featured events: {str(e)}")

@router.get("/categories")
async def get_event_categories():
    """Get all event categories."""
    return {
        "categories": [
            "technical",
            "cultural",
            "sports",
            "academic",
            "workshop",
            "ncc",
            "nss",
            "Other"
        ]
    }

@router.post("/seed")
async def seed_events():
    """Seed database with events from academic calendar."""
    try:
        db = await get_database()
        
        # Clear existing events
        await db.events.delete_many({})
        
        # Sample events from the calendar
        events = [
            {
                "id": str(uuid.uuid4()),
                "title": "T-Spark Annual Sports Festival",
                "description": "Annual Sports Festival for all engineering students",
                "date": "2026-01-03",
                "day": "Friday",
                "category": "sports",
                "organizer": "TCET Sports Committee",
                "is_featured": True
            },
            {
                "id": str(uuid.uuid4()),
                "title": "E Summit 2026",
                "description": "Entrepreneurship Summit organized by IIC-EDIC",
                "date": "2026-01-23",
                "day": "Friday",
                "category": "technical",
                "organizer": "IIC-EDIC",
                "is_featured": True
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Republic Day Celebration",
                "description": "Republic Day celebration with NCC parade and cultural programs",
                "date": "2026-01-26",
                "day": "Monday",
                "category": "cultural",
                "organizer": "NCC/NSS",
                "is_featured": True
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Blood Donation Camp",
                "description": "Raktdaan Se Jeevandaan - Blood donation drive organized by NSS",
                "date": "2026-02-06",
                "day": "Friday",
                "category": "nss",
                "organizer": "NSS",
                "is_featured": False
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Industry Readiness Week",
                "description": "Week-long industry preparation and placement training",
                "date": "2026-01-05",
                "day": "Monday",
                "category": "workshop",
                "organizer": "Training & Placement",
                "is_featured": False
            },
            {
                "id": str(uuid.uuid4()),
                "title": "ACM Symposium",
                "description": "Technical symposium organized by ACM student chapter",
                "date": "2026-02-13",
                "day": "Friday",
                "category": "technical",
                "organizer": "ACM",
                "is_featured": False
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Cultural Days Celebration",
                "description": "Multi-day cultural festival with various competitions",
                "date": "2026-02-09",
                "day": "Monday",
                "category": "cultural",
                "organizer": "TSDW",
                "is_featured": True
            },
            {
                "id": str(uuid.uuid4()),
                "title": "AI & Innovation Sprints",
                "description": "Rapid Prototyping for Digital Transformation workshop",
                "date": "2026-01-16",
                "day": "Friday",
                "category": "workshop",
                "organizer": "IIC-EDIC",
                "is_featured": False
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Himalayan Meditation Event",
                "description": "Meditation and wellness session series for students",
                "date": "2026-01-23",
                "day": "Friday",
                "category": "other",
                "organizer": "S.O.R.T. & Literary",
                "is_featured": False
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Tree Plantation Drive",
                "description": "Environmental awareness and tree plantation activity",
                "date": "2026-01-31",
                "day": "Saturday",
                "category": "nss",
                "organizer": "NSS & Green Club",
                "is_featured": False
            }
        ]
        
        await db.events.insert_many(events)
        
        return {
            "message": "Events seeded successfully",
            "count": len(events)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error seeding events: {str(e)}")
