from .auth import router as auth_router
from .student import router as student_router
from .faculty import router as faculty_router
from .admin import router as admin_router
from .query import router as query_router
from .ingest import router as ingest_router
from .events import router as events_router

__all__ = [
    "auth_router",
    "student_router",
    "faculty_router",
    "admin_router",
    "query_router",
    "ingest_router",
    "events_router",
]
