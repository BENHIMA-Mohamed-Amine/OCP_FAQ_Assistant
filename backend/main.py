from fastapi import FastAPI
from contextlib import asynccontextmanager
from . import database
from .routers import user

# from . import models


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    This function runs befor the application starts up.
    It creates the tables in the db if they aren't already exist
    """
    database.init_db()
    yield


app = FastAPI(lifespan=lifespan)
app.include_router(user.router)


# @app.get("/")
# def home():
#     return {"hello": "world"}
