from pydantic import BaseModel


class AskRequest(BaseModel):
    question: str
    provider: str | None = None


class AskResponse(BaseModel):
    answer: str


class UploadResponse(BaseModel):
    filename: str
    pages: int
