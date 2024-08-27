from sqlmodel import SQLModel, create_engine, Session
from . import models

SQLALCHAMY_DATABASE_URL = "sqlite:///./app.db"
engine = create_engine(
    SQLALCHAMY_DATABASE_URL, connect_args={"check_same_thread": False}
)


def init_db():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session
