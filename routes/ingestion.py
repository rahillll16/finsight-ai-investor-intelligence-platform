from fastapi import Depends,APIRouter

from auth.oauth2 import get_current_user
from database.user import User


router = APIRouter(
    prefix="/ingestion",
    tags=["Ingestion"]
)

@router.post("/ingest")
def ingest_document(
    # ...,
    current_user: User = Depends(
        get_current_user
    )
): return {
    "message" : "feature coming soon."
}