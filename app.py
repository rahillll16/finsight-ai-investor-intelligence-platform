from fastapi import FastAPI
from routes.health import router as health_router

app = FastAPI(
    title="FinSight-AI",
    description="Financial Document Intelligence using RAG and LLMs",
    version="1.0.0"
)

app.include_router(health_router)

@app.get("/")
def root():
    return {
        "message": "AI-Powered Investor Intelligence Platform API Running Successfully"
    }