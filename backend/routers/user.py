from fastapi import APIRouter, status, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session
from .. import models, hashing, JWTtoken
from ..database import get_session
from ..crud import user
from typing import Annotated
from ..oauth2 import get_current_user
import requests
from typing import List

router = APIRouter(prefix="/user", tags=["user"])


@router.get("/all", response_model=List[models.User], status_code=status.HTTP_200_OK)
def get_all(
    session: Session = Depends(get_session),
    current_user: models.User = Depends(get_current_user),
) -> List[models.User]:
    users = user.get_all(session)
    if len(users) == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"No users in the DB",
        )
    return users


@router.get("/{id}", response_model=models.User, status_code=status.HTTP_200_OK)
def get_user(
    id: int,
    session: Session = Depends(get_session),
    current_user: models.User = Depends(get_current_user),
):
    user_in_db = user.get_user_by_id(id, session)
    if user_in_db is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"can't find the user with id: {id}",
        )
    return user_in_db


@router.post("/register", status_code=status.HTTP_201_CREATED)
def create_user(
    request: models.UserCreate, session: Session = Depends(get_session)
) -> models.Token:
    if user.is_email_exists(request.email, session):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="User already exists"
        )
    plain_pswd = request.password
    request.password = hashing.hash_pswd(request.password)
    try:
        user_from_db = user.register(request, session)
    except:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="something is wrong !!",
        )

    url = "http://127.0.0.1:8000/user/login"
    payload = {"username": request.email, "password": plain_pswd}

    response = requests.post(url=url, data=payload)
    if response.status_code != status.HTTP_200_OK:
        raise HTTPException(
            status_code=response.status_code,
            detail=f"request failed to log in, status code {response.status_code} try to log in.",
        )

    return models.Token(**response.json())


@router.post("/login", status_code=status.HTTP_200_OK)
def log_in(
    request: Annotated[OAuth2PasswordRequestForm, Depends()],
    session: Session = Depends(get_session),
) -> models.Token:
    user_from_db = user.verify_user(request, session)
    if user_from_db == False:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Credentials"
        )

    access_token = JWTtoken.create_access_token({"sub": user_from_db.email})
    return models.Token(
        access_token=access_token, token_type="bearer", role=user_from_db.role.name
    )


@router.put("/update", status_code=status.HTTP_200_OK)
def update(
    request: models.User,
    session: Session = Depends(get_session),
    current_user: models.User = Depends(get_current_user),
):
    try:
        return user.edit(request, session)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"there is no user with this email: {request.email}",
        )


@router.delete("/delete/{id}")
def delete(
    id: int,
    session: Session = Depends(get_session),
    current_user: models.User = Depends(get_current_user),
) -> bool:
    try:
        response = user.delete(id, session)
    except:
        return False
    if response:
        return True
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"can't find the user with id: {id}",
        )
