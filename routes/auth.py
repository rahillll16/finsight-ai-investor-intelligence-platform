from fastapi import (
    APIRouter,
    HTTPException,
    Response,
    Depends
)

from database.db import SessionLocal
from database.user import User

from auth.oauth2 import get_current_user

from schemas.user import (
    UserCreate,
    UserLogin
)

from auth.hashing import (
    hash_password,
    verify_password
)

from auth.auth_handler import (
    create_access_token
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

@router.get("/me")
def get_me(
    current_user: User = Depends(
        get_current_user
    )
):

    return {
        "id": current_user.id,
        "username": current_user.username,
        "email": current_user.email
    }


@router.post("/register")
def register_user(
    user: UserCreate
):

    db = SessionLocal()

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user:

        raise HTTPException(
            status_code=400,
            detail="User already exists."
        )

    new_user = User(
        username=user.username,
        email=user.email,
        password=hash_password(
            user.password
        )
    )

    db.add(new_user)

    db.commit()

    db.refresh(new_user)

    return {
        "message": "User registered successfully."
    }
    
    
@router.post("/login")
def login_user(
    user: UserLogin,
    response: Response
):

    db = SessionLocal()

    db_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if not db_user:

        raise HTTPException(
            status_code=401,
            detail="Invalid credentials."
        )

    if not verify_password(
        user.password,
        str(db_user.password)
    ):

        raise HTTPException(
            status_code=401,
            detail="Invalid credentials."
        )

    access_token = create_access_token(
        data={
            "sub": str(db_user.email)
        }
    )

    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        samesite="lax",
        secure=False
    )

    return {
        "message": "Login successful"
    }
    
    
@router.post("/logout")
def logout_user(
    response: Response
):

    response.delete_cookie(
        key="access_token"
    )

    return {
        "message": "Logged out successfully."
    }