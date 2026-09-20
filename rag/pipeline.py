
from rag.ingestion.pdf_loader import load_pdf
from rag.llm.factory import get_llm


def _format_docs(documents) -> str:
    """Join document page contents into a single context string."""
    return "\n\n".join(doc.page_content for doc in documents)


def ask_over_pdf(pdf_path: str, question: str, provider: str | None = None) -> str:
    documents = load_pdf(pdf_path)
    # print("document", documents)
    context = _format_docs(documents)

    llm = get_llm(provider)
    prompt = (
        "Answer the question using only the context below. "
        "If the answer is not in the context, say you don't know.\n\n"
        f"Context:\n{context}\n\n"
        f"Question: {question}"
    )
    response = llm.invoke(prompt)
    return getattr(response, "content", str(response))


def ask(question: str, provider: str | None = None) -> str:
    """Answer a question directly with the LLM (no retrieval)."""
    llm = get_llm(provider)
    response = llm.invoke(question)
    return getattr(response, "content", str(response))

if __name__ == "__main__":
    print(ask_over_pdf("files/vishesh.pdf", "What is this document about?"))
