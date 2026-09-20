import os
import shutil

from fastapi import APIRouter, File, HTTPException, UploadFile

from backend.schemas.chat import AskRequest, AskResponse, UploadResponse
from rag.ingestion.pdf_loader import load_pdf
from rag.pipeline import ask, ask_over_pdf

router = APIRouter()

# Directory where uploaded documents are stored.
FILES_DIR = os.getenv("FILES_DIR", "files")


@router.post("/ask", response_model=AskResponse)
def ask_question(payload: AskRequest) -> AskResponse:
    """Answer a question directly with the selected LLM (no retrieval)."""
    try:
        answer = ask(payload.question, provider=payload.provider)
    except Exception as exc:  # surface provider/config errors to the client
        raise HTTPException(status_code=500, detail=str(exc)) from exc
    return AskResponse(answer=answer)


@router.post("/ask-pdf", response_model=AskResponse)
def ask_question_over_pdf(filename: str, payload: AskRequest) -> AskResponse:
    """Answer a question grounded in a previously uploaded PDF."""
    pdf_path = os.path.join(FILES_DIR, filename)
    if not os.path.exists(pdf_path):
        raise HTTPException(status_code=404, detail=f"File not found: {filename}")
    try:
        answer = ask_over_pdf(pdf_path, payload.question, provider=payload.provider)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc
    return AskResponse(answer=answer)


@router.post("/upload", response_model=UploadResponse)
def upload_pdf(file: UploadFile = File(...)) -> UploadResponse:
    """Save an uploaded PDF into the files directory and report its page count."""
    if not file.filename or not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")

    os.makedirs(FILES_DIR, exist_ok=True)
    dest_path = os.path.join(FILES_DIR, file.filename)
    with open(dest_path, "wb") as out:
        shutil.copyfileobj(file.file, out)

    try:
        documents = load_pdf(dest_path)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc

    return UploadResponse(filename=file.filename, pages=len(documents))
