from .auth import router as auth_router
from .student import router as student_router
from .faculty import router as faculty_router
from .admin import router as admin_router
from .seed import router as seed_router

__all__ = [
    "auth_router",
    "student_router",
    "faculty_router",
    "admin_router",
    "seed_router"
]
