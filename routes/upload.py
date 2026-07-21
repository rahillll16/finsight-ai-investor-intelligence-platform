import os
import shutil
import uuid
from typing import cast
from database.user import User

from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Depends,
    HTTPException,
    Form
)

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
    company: str = Form(...),
    year: int = Form(...),
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user)
):

    if not company.strip():
        raise HTTPException(
            status_code=400,
            detail="Company name is required."
        )

    if year < 2000 or year > 2100:
        raise HTTPException(
            status_code=400,
            detail="Invalid financial year."
        )

    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed."
        )

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
        
    extension = os.path.splitext(file.filename)[1]
    
    
    user_id = cast(int, current_user.id)
    

    filename = (

        f"{user_id}_{company}_{year}_{uuid.uuid4().hex}{extension}"

    )

    file_path = os.path.join(
        upload_dir,
        filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(
            file.file,
            buffer
        )
        
        
    result = ingest_document(
        pdf_path=file_path,
        company=company,
        year=year,
        user_id=user_id
    )
    
    metrics = extract_kpis(
        company=company,
        user_id=user_id
    )
    
    save_metrics(
        metrics=metrics,
        company=company,
        year=year,
        user_id=user_id
    )

    return {
        "message": "Report uploaded successfully.",
        "company": company,
        "year": year,
        "chunks": result["chunks"],
        "metrics": metrics
    }
