from app.llm.main import getLLM
from  dotenv import load_dotenv

load_dotenv()

def main():
    llm = getLLM()
    response = llm.invoke("Hello world")
    print(response.content)

if __name__ == "__main__":
    main()