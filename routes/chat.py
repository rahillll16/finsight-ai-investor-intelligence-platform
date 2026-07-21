from fastapi import (
    APIRouter,
    Depends
)

from typing import cast

from auth.oauth2 import get_current_user

from database.user import User

from schemas.chat import (
    ChatRequest,
    ChatResponse
)

from rag.rag_pipeline import ask_question


router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)


@router.post(
    "/",
    response_model=ChatResponse
)
def chat_with_document(
    request: ChatRequest,
    current_user: User = Depends(
        get_current_user
    )
):

    answer = ask_question(
        question=request.question,
        company=request.company,
        user_id=cast(int, current_user.id),
        history=request.history
    )

    return {
        "answer": answer
    }