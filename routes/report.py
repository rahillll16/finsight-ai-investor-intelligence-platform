from typing import cast

from fastapi import (
    APIRouter,
    Depends
)

from auth.oauth2 import get_current_user

from database.user import User

from database.delete_report import delete_metrics
from vectorstore.delete_vectors import delete_vectors
from storage.delete_pdf import delete_pdf


router = APIRouter(
    prefix="/reports",
    tags=["Reports"]
)


@router.delete("/{company}/{year}")
def delete_report(
    company: str,
    year: int,
    current_user: User = Depends(get_current_user)
):
    user_id = cast(int, current_user.id)

    delete_metrics(
        company=company,
        year=year,
        user_id=user_id
    )

    delete_vectors(
        company=company,
        year=year,
        user_id=user_id
    )

    delete_pdf(
        company=company,
        year=year,
        user_id=user_id
    )

    return {
        "message": "Report deleted successfully."
    }