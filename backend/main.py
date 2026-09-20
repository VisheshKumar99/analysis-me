"""FastAPI entry point.

Owns the HTTP layer only. Business logic lives in the rag/ package, which this
module imports and calls. Environment variables are loaded here, once, at
startup so the rag layer sees them when it lazily builds LLM clients.
"""

import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

load_dotenv()

from backend.routes import chat  # noqa: E402  (import after load_dotenv)

app = FastAPI(title="analysis-me API")

# Allow the frontend to call the API during local development.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router, prefix="/api")


@app.get("/api/health")
def health() -> dict:
    return {"status": "ok"}


# Serve the static frontend if it exists (mounted last so /api takes priority).
_frontend_dir = os.path.join(os.path.dirname(__file__), "..", "frontend")
if os.path.isdir(_frontend_dir):
    app.mount("/", StaticFiles(directory=_frontend_dir, html=True), name="frontend")
