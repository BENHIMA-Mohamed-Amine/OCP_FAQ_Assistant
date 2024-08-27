from langchain_chroma import Chroma
from langchain_core.documents import Document
from langchain_core.messages import trim_messages, HumanMessage, AIMessage
from langchain_core.runnables import RunnablePassthrough
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.chains.history_aware_retriever import create_history_aware_retriever
from langchain.chains.retrieval import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_nvidia_ai_endpoints import NVIDIAEmbeddings, ChatNVIDIA
from langsmith import traceable
from operator import itemgetter
from . import models
from typing import List
import os
import dotenv

dotenv.load_dotenv()
os.environ["LANGCHAIN_TRACING_V2"] = "true"
os.environ["LANGCHAIN_API_KEY"] = os.getenv("LANGCHAIN_API_KEY")
os.environ["NVIDIA_API_KEY"] = os.getenv("NVIDIA_API_KEY")
LANGCHAIN_ENDPOINT = "https://api.smith.langchain.com"

MODEL_NAME = "meta/llama-3.1-70b-instruct"
EMBEDDING_MODEL = "nvidia/nv-embed-v1"
VECTOR_DB = "./vector_db"
COLLECTION_NAME = "ocp_faq"
SYSTEM_PROMPT = (
    "You are an assistant for question-answering tasks for OCP Groupe site Safi."
    "Use the following pieces of retrieved context to answer "
    "the question. If you don't know the answer, say that you "
    "don't know. Use three sentences maximum and keep the "
    "answer concise."
    "\n\n"
    "{context}"
)
CONTEXTUALIZE_Q_SYSTEM_PROMPT = (
    "Given a chat history and the latest user question "
    "which might reference context in the chat history, "
    "formulate a standalone question which can be understood "
    "without the chat history. Do NOT answer the question, "
    "just reformulate it if needed and otherwise return it as is."
)


def get_vector_store():
    return Chroma(
        collection_name=COLLECTION_NAME,
        embedding_function=NVIDIAEmbeddings(model=EMBEDDING_MODEL),
        persist_directory=VECTOR_DB,
    )


def get_chat_history(messages: List[models.Message]):
    chat_history = []
    for msg in messages:
        chat_history.append(HumanMessage(content=msg.human_question))
        chat_history.append(AIMessage(content=msg.ai_response))
    return chat_history


def get_rag_chain():
    llm = ChatNVIDIA(model=MODEL_NAME)
    retriever = get_vector_store().as_retriever()
    trimmer = trim_messages(
        max_tokens=65,
        strategy="last",
        token_counter=llm,
        include_system=True,
        allow_partial=False,
        start_on="human",
    )
    contextualize_q_prompt = ChatPromptTemplate.from_messages(
        [
            ("system", CONTEXTUALIZE_Q_SYSTEM_PROMPT),
            MessagesPlaceholder("chat_history"),
            ("human", "{input}"),
        ]
    )
    history_aware_retriever = create_history_aware_retriever(
        llm, retriever, contextualize_q_prompt
    )
    qa_prompt = ChatPromptTemplate.from_messages(
        [
            ("system", SYSTEM_PROMPT),
            MessagesPlaceholder("chat_history"),
            ("human", "{input}"),
        ]
    )
    question_answer_chain = create_stuff_documents_chain(llm, qa_prompt)
    rag_chain = create_retrieval_chain(history_aware_retriever, question_answer_chain)
    return rag_chain


def issueCreate_to_document(issue: models.IssueCreate, id: int) -> Document:
    page_content = f"problem: {issue.problem}\nsolution: {issue.solution}"
    return Document(page_content=page_content, id=id)


@traceable
def ask_ai(query: str, messages: List[models.Message]):
    chat_history = get_chat_history(messages)
    rag_chain = get_rag_chain()
    input = {"input": query, "chat_history": chat_history}
    return rag_chain.invoke(input)["answer"]


@traceable
def store_issue_index(issue: models.IssueCreate, issue_id):
    vector_db = get_vector_store()
    issue_doc = issueCreate_to_document(issue, issue_id)
    vector_db.add_documents([issue_doc])


def delete_issue(id):
    vector_db = get_vector_store()
    vector_db.delete([str(id)])
