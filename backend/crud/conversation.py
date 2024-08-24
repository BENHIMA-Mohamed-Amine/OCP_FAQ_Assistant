from fastapi import HTTPException
from sqlalchemy.orm import Session
from .. import models, schemas


# get all the conversations
def get_conversations(db: Session):
    return db.query(models.Conversation).all()


# create new conversation
def add_conversation(db: Session, conv: schemas.ConvCreate):
    db_conv = models.Conversation(title_conversation=conv.title)
    db.add(db_conv)
    db.commit()
    db.refresh(db_conv)
    return db_conv
