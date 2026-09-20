import os


def getLLM(provider: str | None = None):
    """Return a chat model for the given provider.

    Defaults to the LLM_PROVIDER value in .env. Each provider is imported and
    built lazily so an unused provider never gets constructed.
    """
    provider = (provider or os.getenv("LLM_PROVIDER", "ollama")).lower()

    if provider == "ollama":
        from app.llm.ollama import get_ollama_llm

        return get_ollama_llm()

    if provider in ("openai", "open_ai"):
        from app.llm.openai import get_openai_llm

        return get_openai_llm()

    raise ValueError(f"Unsupported LLM provider: {provider}")
