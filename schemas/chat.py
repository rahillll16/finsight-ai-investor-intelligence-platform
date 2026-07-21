from pydantic import BaseModel

class ChatMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):

    question: str
    company: str | None = None
    history: list[ChatMessage] = []


class ChatResponse(BaseModel):

    answer: str