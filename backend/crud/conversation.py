from sqlmodel import Session, select
from .. import models


def create(conv: models.ConversationCreate, session: Session) -> models.Conversation:
    conv_db = models.Conversation.model_validate(conv)
    session.add(conv_db)
    session.commit()
    session.refresh(conv_db)
    return conv_db


def edit_title(conv: models.Conversation, session: Session) -> models.Conversation:
    conv_db = session.get(models.Conversation, conv.conversation_id)
    conv_db.title = conv.title
    session.add(conv_db)
    session.commit()
    session.refresh(conv_db)
    return conv_db


def delete(id: int, session: Session):
    conv_db = session.get(models.Conversation, id)
    session.delete(conv_db)
    session.commit()
