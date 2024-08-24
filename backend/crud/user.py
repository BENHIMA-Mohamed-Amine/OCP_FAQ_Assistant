from sqlmodel import Session, select
from .. import models, hashing


def get_user_by_email(email: str, session: Session):
    statement = select(models.User).where(models.User.email == email)
    return session.exec(statement).first()


def is_email_exists(email: str, session: Session) -> bool:
    if get_user_by_email(email, session) == None:
        return False
    return True


def register(user: models.UserCreate, session: Session):
    db_user = models.User.model_validate(user)
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user


def verify_user(credentials: models.UserLogIn, session: Session):
    user = get_user_by_email(credentials.email, session)
    if user == None:
        return False
    if not hashing.verify_password(credentials.password, user.password):
        return False
    return user
