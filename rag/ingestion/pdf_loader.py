from langchain_community.document_loaders import PyPDFLoader


def load_pdf(path: str):
    """Load a PDF file into a list of LangChain Document objects."""
    loader = PyPDFLoader(path)
    documents = loader.load()
    return documents


