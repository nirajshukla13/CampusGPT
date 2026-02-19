from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging

from config import settings
from database import connect_to_mongo, close_mongo_connection
from routes import (
    auth_router,
    student_router,
    faculty_router,
    admin_router,
    query_router,
    ingest_router,
    events_router
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Create FastAPI app
app = FastAPI(
    title="CampusGPT API",
    description="Campus Management System with Role-Based Access Control",
    version="1.0.0"
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=settings.CORS_ORIGINS.split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Event handlers
@app.on_event("startup")
async def startup_db_client():
    await connect_to_mongo()
    logger.info("Application started successfully")

@app.on_event("shutdown")
async def shutdown_db_client():
    await close_mongo_connection()
    logger.info("Application shutdown")

# Include routers
app.include_router(auth_router, prefix=settings.API_PREFIX)
app.include_router(student_router, prefix=settings.API_PREFIX)
app.include_router(faculty_router, prefix=settings.API_PREFIX)
app.include_router(admin_router, prefix=settings.API_PREFIX)
app.include_router(query_router, prefix=settings.API_PREFIX)
app.include_router(ingest_router, prefix=settings.API_PREFIX)
app.include_router(events_router, prefix=settings.API_PREFIX)

# Root endpoint
@app.get("/")
async def root():
    return {
        "message": "CampusGPT API",
        "version": "1.0.0",
        "docs": "/docs"
    }

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy"}
