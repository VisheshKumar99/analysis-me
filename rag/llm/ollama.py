import os

from langchain_ollama import ChatOllama


def get_ollama_llm():
    """Build the local Ollama chat model.

    Constructed lazily so importing this module never requires Ollama to be
    running or configured unless this provider is actually selected.
    """
    return ChatOllama(
        model=os.getenv("LLM_MODEL", "qwen2.5:3b"),
        base_url=os.getenv("OLLAMA_BASE_URL", "http://localhost:11434"),
        temperature=0,
    )
