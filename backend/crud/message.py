from sqlalchemy.orm import Session
from .. import models, schemas


# get the the chat_history conv == id_conv
def get_messages(db: Session, id_conv: int):
    return db.query(models.Message).filter(models.Message.id_conv == id_conv).first()
