from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session
from contextlib import asynccontextmanager
from . import database
from . import models
from .routers import user, issue, assistant
from .ai_service import load_data_and_index


@asynccontextmanager
async def lifespan(app: FastAPI, session: Session = Depends(database.get_session)):
    """
    This function runs befor the application starts up.
    It creates the tables in the db if they aren't already exist
    """
    database.init_db()
    load_data_and_index()
    yield


app = FastAPI(lifespan=lifespan)
origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(user.router)
app.include_router(issue.router)
app.include_router(assistant.router)
