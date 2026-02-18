from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import Optional
from datetime import datetime
import uuid

class UserBase(BaseModel):
    name: str
    email: EmailStr
    role: str  # student, faculty, admin

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str
    role: str

class User(UserBase):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=datetime.utcnow)

class UserInDB(User):
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    user: User

class DashboardStats(BaseModel):
    total_users: int
    students: int
    faculty: int
    admin: int
