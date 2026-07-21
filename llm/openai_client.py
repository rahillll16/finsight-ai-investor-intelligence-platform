import os

from dotenv import load_dotenv

from langchain_openai import ChatOpenAI
from langchain_huggingface import HuggingFaceEmbeddings

from pydantic import SecretStr


load_dotenv()

api_key = SecretStr(os.environ["OPENAI_API_KEY"])


_llm = ChatOpenAI(
    model="gpt-4o-mini",
    temperature=0,
    api_key=api_key
)

_embedding_model = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)


def get_llm(
    temperature: float = 0
):

    if temperature == 0:
        return _llm

    return ChatOpenAI(
        model="gpt-4o-mini",
        temperature=temperature,
        api_key=api_key
    )


def get_embedding_model():

    return _embedding_model