from sqlmodel import Session
from .. import models


def create(msg: models.MessageCreate, session: Session):
    msg_db = models.Message.model_validate(msg)
    session.add(msg_db)
    session.commit()
