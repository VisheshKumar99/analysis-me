import os

from langchain_openai import ChatOpenAI


def get_openai_llm():
    """Build the OpenAI chat model.

    Constructed lazily so importing this module never touches the OpenAI client
    (and never fails on a missing API key) unless this provider is selected.
    """
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise ValueError(
            "OPENAI_API_KEY is not set. Add it to your .env to use the OpenAI provider."
        )
    return ChatOpenAI(
        model=os.getenv("LLM_MODEL", "gpt-4o-mini"),
        api_key=api_key,
        temperature=0,
    )
