from fastapi import APIRouter, Depends, status, HTTPException
from sqlmodel import Session
from ..database import get_session
from ..oauth2 import get_current_user
from .. import models
from ..crud import conversation, message
from ..ai_service import ask_ai
from typing import List

router = APIRouter(prefix="/assistant", tags=["assistant"])


@router.post("/")
def ask(
    request: models.AskAssistant,
    session: Session = Depends(get_session),
    current_user: models.User = Depends(get_current_user),
):
    if request.conv_id is None:
        conv = models.ConversationCreate(user_id=current_user.user_id)
        current_conv = conversation.create(conv, session)
        request.conv_id = current_conv.conversation_id
    msgs = [
        conv.messages
        for conv in current_user.convs
        if conv.conversation_id == request.conv_id
    ]

    response = ask_ai(request.query, msgs[0])
    msg = models.MessageCreate(
        human=request.query,
        ai=response,
        conv_id=request.conv_id,
    )
    msg_db = message.create(msg, session)

    return models.AssistantResponse(
        conv_id=request.conv_id, response=response, msg_id=msg_db.msg_id
    )


@router.get("/convs", response_model=List[models.Conversation])
def get_convs(
    current_user: models.User = Depends(get_current_user),
) -> List[models.Conversation]:
    return current_user.convs


@router.get("/messages", response_model=List[models.Message] | List)
def get_msgs(
    conv_id: int,
    current_user: models.User = Depends(get_current_user),
) -> List[models.Message] | List:
    msgs = [
        conv.messages for conv in current_user.convs if conv.conversation_id == conv_id
    ]
    if len(msgs) == 0:
        return []
    return msgs[0]


@router.put("/title", response_model=models.Conversation)
def update_title(
    request: models.Conversation,
    session: Session = Depends(get_session),
    current_user: models.User = Depends(get_current_user),
) -> models.Conversation:
    return conversation.edit_title(request, session)


@router.delete("/delete/{id}")
def delete(
    id: int,
    session: Session = Depends(get_session),
    current_user: models.User = Depends(get_current_user),
):
    conversation.delete(id, session)
