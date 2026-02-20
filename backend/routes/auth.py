from fastapi import APIRouter, HTTPException, Depends
from schemas import User, UserCreate, UserLogin, Token
from utils import hash_password, verify_password, create_access_token, get_current_user
from database import get_database
from datetime import datetime
import uuid

router = APIRouter(prefix="/auth", tags=["Authentication"])

def get_role_from_email(email: str) -> str:
    """Determine role based on email domain."""
    pass

@router.post("/register", response_model=User)
async def register(user_data: UserCreate):
    """Register a new user."""
    db = await get_database()
    
    # Check if user already exists
    existing_user = await db.users.find_one({"email": user_data.email}, {"_id": 0})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Determine role from email domain
    role = get_role_from_email(user_data.email)
    
    # Create new user
    user = User(
        name=user_data.name,
        email=user_data.email,
        role=role
    )
    
    # Prepare user dict for database
    user_dict = user.model_dump()
    user_dict["password"] = hash_password(user_data.password)
    user_dict["created_at"] = user_dict["created_at"].isoformat()
    
    # Insert into database
    await db.users.insert_one(user_dict)
    return user

@router.post("/login", response_model=Token)
async def login(credentials: UserLogin):
    """Login user and return JWT token."""
    try:
        db = await get_database()
        print(credentials)
        # Verify email domain has valid role
        # expected_role = get_role_from_email(credentials.email)
        
        # Find user by email
        user = await db.users.find_one(
            {"email": credentials.email},
            {"_id": 0}
        )
        
        print(user)
        if not user:
            raise HTTPException(status_code=401, detail="Invalid credentials")
        
        # Verify password
        # if not verify_password(credentials.password, user["password"]):
        #     raise HTTPException(status_code=401, detail="Invalid credentials")
        
        # Create access token
        access_token = create_access_token(
            data={"sub": user["id"], "email": user["email"], "role": user["role"]}
        )
        
        # Remove password from response
        # user.pop("password")
        # if isinstance(user["created_at"], str):
        #     user["created_at"] = datetime.fromisoformat(user["created_at"])
        
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": User(**user)
        }
    except HTTPException:
        raise
    except Exception as e:
        print(f"Login error: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Login error: {str(e)}")

@router.get("/me", response_model=User)
async def get_me(current_user: dict = Depends(get_current_user)):
    """Get current user profile."""
    db = await get_database()
    
    user = await db.users.find_one(
        {"id": current_user["user_id"]},
        {"_id": 0, "password": 0}
    )
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if isinstance(user["created_at"], str):
        user["created_at"] = datetime.fromisoformat(user["created_at"])
    
    return User(**user)