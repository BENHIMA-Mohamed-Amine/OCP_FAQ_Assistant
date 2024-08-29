from typing import Annotated
from fastapi import Depends, HTTPException, status
from sqlmodel import Session
from fastapi.security import OAuth2PasswordBearer
from .crud import user as u
from . import JWTtoken, database
from . import models

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="user/login")


def get_current_user(
    token: Annotated[str, Depends(oauth2_scheme)],
    session: Session = Depends(database.get_session),
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    user = JWTtoken.verify_token(token, credentials_exception)
    user = u.get_user_by_email(user.email, session)
    if user == None:
        raise credentials_exception
    return user
