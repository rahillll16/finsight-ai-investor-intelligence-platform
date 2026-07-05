import os
import shutil
from typing import cast
from database.user import User

from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from auth.oauth2 import get_current_user
from database.user import User
from ingestion.ingest_document import ingest_document

from rag.kpi_extractor_rag import extract_kpis
from database.save_metrics import save_metrics


router = APIRouter(
    prefix="/upload",
    tags=["Upload"]
)


@router.post("/")
async def upload_report(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user)
):

    upload_dir = "data/raw_pdfs"

    os.makedirs(
        upload_dir,
        exist_ok=True
    )
    
    if file.filename is None:
        raise HTTPException(
            status_code=400,
            detail="Filename is missing."
        )

    file_path = os.path.join(
        upload_dir,
        file.filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(
            file.file,
            buffer
        )
        
    user_id = cast(int, current_user.id)
        
    result = ingest_document(
        pdf_path=file_path,
        company="Tesla",
        year=2024,
        user_id=user_id
    )
    
    metrics = extract_kpis(
        company="Tesla",
        user_id=user_id
    )
    
    save_metrics(
        metrics=metrics,
        company="Tesla",
        year=2024,
        user_id=user_id
    )

    return {
        "message": "Report processed successfully.",
        "company": "Tesla",
        "metrics": metrics
    }
