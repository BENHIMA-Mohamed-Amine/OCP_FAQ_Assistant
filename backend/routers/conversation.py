# from fastapi import APIRouter, Depends, status
# from sqlalchemy.orm import Session
# from ..database import get_db
# from .. import schemas
# from ..crud import conv
# from typing import List

# router = APIRouter(prefix="/conv", tags=["Conversations"])


# # get all the convs
# @router.get("/", response_model=List[schemas.Conversation])
# def get_convs(db: Session = Depends(get_db)):
#     return conv.get_conversations(db)


# # create a new conversation in db
# @router.post("create_conv", status_code=status.HTTP_201_CREATED)
# def create_conv(request: schemas.ConvCreate, db: Session = Depends(get_db)):
#     return conv.add_conversation(db, request)
