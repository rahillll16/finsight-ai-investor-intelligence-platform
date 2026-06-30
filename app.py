from fastapi import FastAPI
from routes.health import router as health_router
from routes.dashboard import router as dashboard_router
from routes.comparison import router as comparison_router
from routes.auth import router as auth_router

app = FastAPI(
    title="FinSight-AI",
    description="Financial Document Intelligence using RAG and LLMs",
    version="1.0.0"
)

app.include_router(health_router)
app.include_router(dashboard_router)
app.include_router(comparison_router)
app.include_router(auth_router)

@app.get("/")
def root():
    return {
        "message": "AI-Powered Investor Intelligence Platform API Running Successfully"
    }