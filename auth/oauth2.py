from fastapi import (
    Request,
    HTTPException,
    Depends
)

from jose import JWTError, jwt

from sqlalchemy.orm import Session

from database.db import SessionLocal
from database.user import User

from auth.auth_handler import (
    SECRET_KEY,
    ALGORITHM
)


def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


def get_current_user(
    request: Request,
    db: Session = Depends(get_db)
):

    token = request.cookies.get(
        "access_token"
    )

    if not token:

        raise HTTPException(
            status_code=401,
            detail="Not authenticated."
        )

    try:

        payload = jwt.decode(
            token,
            str(SECRET_KEY),
            algorithms=[ALGORITHM]
        )

        email = payload.get("sub")

        if not email:

            raise HTTPException(
                status_code=401,
                detail="Invalid token."
            )

    except JWTError:

        raise HTTPException(
            status_code=401,
            detail="Invalid token."
        )

    user: User | None = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    if not user:

        raise HTTPException(
            status_code=401,
            detail="User not found."
        )

    return user