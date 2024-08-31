from sqlmodel import Session, select
from .. import models, hashing


def get_user_by_email(email: str, session: Session) -> models.User | None:
    statement = select(models.User).where(models.User.email == email)
    return session.exec(statement).first()


def get_user_by_id(id: int, session: Session) -> models.User | None:
    return session.get(models.User, id)


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
    user = get_user_by_email(credentials.username, session)
    if user == None:
        return False
    if not hashing.verify_password(credentials.password, user.password):
        return False
    return user


def edit(request: models.User, session: Session) -> models.User:
    user = get_user_by_id(request.user_id, session)
    if user is None:
        raise Exception(f"there is no user with this id: {request.user_id}")
    user.email = request.email
    user.first_name = request.first_name
    user.last_name = request.last_name
    user.role = request.role
    session.add(user)
    session.commit()
    session.refresh(user)
    return user


def delete(id: int, session: Session) -> bool:
    user = get_user_by_id(id, session)
    if not user:
        return False
    try:
        session.delete(user)
        session.commit()
        return True
    except Exception as e:
        raise Exception("something goes wrong when deleting")


def get_all(session: Session):
    return session.exec(select(models.User)).all()
