import os
from dotenv import load_dotenv

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.health import router as health_router
from routes.dashboard import router as dashboard_router
from routes.comparison import router as comparison_router
from routes.auth import router as auth_router
from routes.chat import router as chat_router
from routes.upload import router as upload_router

load_dotenv()

app = FastAPI(
    title="FinSight-AI",
    description="Financial Document Intelligence using RAG and LLMs",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ["BASE_URL"]
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload_router)
app.include_router(chat_router)
app.include_router(health_router)
app.include_router(dashboard_router)
app.include_router(comparison_router)
app.include_router(auth_router)

@app.get("/")
def root():
    return {
        "message": "AI-Powered Investor Intelligence Platform API Running Successfully"
    }