from sqlmodel import SQLModel, Field, Relationship, Enum, Column
from typing import List
import enum


class ConversationBase(SQLModel):
    """
    Base model for conversation
    """

    title: str = "New Conversation"


class ConversationCreate(ConversationBase):
    """
    model used for creating a conversation
    """

    user_id: int


class Conversation(ConversationBase, table=True):
    """
    model used to create the conversations table
    """

    conversation_id: int | None = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.user_id", ondelete="CASCADE")
    messages: List["Message"] | None = Relationship(
        back_populates="conversation", cascade_delete=True
    )
    owner: "User" = Relationship(back_populates="convs")


class MessageBase(SQLModel):
    """
    Base model for message
    """

    human_question: str
    ai_response: str


class MessageCreate(MessageBase):
    """
    model used for creating a message
    """

    conv_id: int


class Message(MessageBase, table=True):
    """
    model used to create the messages table
    """

    msg_id: int | None = Field(default=None, primary_key=True)
    conv_id: int = Field(foreign_key="conversation.conversation_id", ondelete="CASCADE")
    conversation: Conversation = Relationship(back_populates="messages")


class Role(enum.Enum):
    user = "user"
    admin = "admin"


class UserLogIn(SQLModel):
    email: str
    password: str


class UserBase(SQLModel):
    email: str = Field(unique=True, index=True)
    first_name: str
    last_name: str
    role: Role = Field(sa_column=Column(Enum(Role)))
    password: str


class UserCreate(UserBase):
    pass


class User(UserBase, table=True):
    user_id: int | None = Field(default=None, primary_key=True)

    convs: List[Conversation] | None = Relationship(
        back_populates="owner", cascade_delete=True
    )
    issues: List["Issue"] | None = Relationship(back_populates="creator")


class IssueBase(SQLModel):
    problem: str
    solution: str


class IssueCreate(IssueBase):
    creator_id: int | None = None


class Issue(IssueBase, table=True):
    issue_id: int | None = Field(default=None, primary_key=True)

    creator_id: int | None = Field(foreign_key="user.user_id", ondelete="SET NULL")
    creator: User | None = Relationship(back_populates="issues")


class Token(SQLModel):
    access_token: str
    token_type: str


class TokenData(SQLModel):
    email: str


class AskAssistant(SQLModel):
    query: str
    conv_id: int | None = None
