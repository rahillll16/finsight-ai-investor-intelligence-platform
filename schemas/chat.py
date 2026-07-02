from pydantic import BaseModel


class ChatRequest(BaseModel):

    company: str
    question: str


class ChatResponse(BaseModel):

    answer: str