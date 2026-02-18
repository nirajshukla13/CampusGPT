from datetime import datetime, timedelta, timezone
from typing import List, Dict

from fastapi import HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, ExpiredSignatureError, jwt
from passlib.context import CryptContext

from config import settings


# 🔐 Password hashing context
pwd_context = CryptContext(
    schemes=["bcrypt_sha256"],  # Safe & no 72-byte limit
    deprecated="auto"
)

security = HTTPBearer()


# ==========================
# 🔑 PASSWORD FUNCTIONS
# ==========================

def hash_password(password: str) -> str:
    """Hash a password securely."""
    
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify plain password against stored hash."""
    return pwd_context.verify(plain_password, hashed_password)


# ==========================
# 🔐 JWT TOKEN FUNCTIONS
# ==========================

def create_access_token(data: Dict) -> str:
    """Create a JWT access token."""
    to_encode = data.copy()

    expire = datetime.now(timezone.utc) + timedelta(
        minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(
        to_encode,
        settings.JWT_SECRET_KEY,
        algorithm=settings.JWT_ALGORITHM
    )

    return encoded_jwt


# ==========================
# 👤 GET CURRENT USER
# ==========================

async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
) -> Dict:
    """Extract and validate user from JWT token."""
    
    token = credentials.credentials

    try:
        payload = jwt.decode(
            token,
            settings.JWT_SECRET_KEY,
            algorithms=[settings.JWT_ALGORITHM]
        )

        user_id: str = payload.get("sub")
        role: str = payload.get("role")
        email: str = payload.get("email")

        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication credentials"
            )

        return {
            "user_id": user_id,
            "role": role,
            "email": email
        }

    except ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has expired"
        )

    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials"
        )


# ==========================
# 🛡 ROLE BASED ACCESS
# ==========================

def require_role(allowed_roles: List[str]):
    """Dependency to check user role."""

    async def role_checker(current_user: Dict = Depends(get_current_user)):
        if current_user["role"] not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access forbidden"
            )
        return current_user

    return role_checker
