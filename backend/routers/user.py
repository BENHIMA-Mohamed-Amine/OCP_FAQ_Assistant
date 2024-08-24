from fastapi import APIRouter, status, HTTPException, Depends
from sqlmodel import Session
from .. import models, hashing, JWTtoken
from ..database import get_session
from ..crud import user

router = APIRouter(prefix="/user", tags=["user"])


@router.post("/register", status_code=status.HTTP_201_CREATED)
def create_user(
    request: models.UserCreate, session: Session = Depends(get_session)
) -> models.Token:
    if user.is_email_exists(request.email, session):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="User already exists"
        )
    request.password = hashing.hash_pswd(request.password)
    try:
        user_from_db = user.register(request, session)
    except:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="something is wrong !!",
        )
    access_token = JWTtoken.create_access_token({"sub": request.email})
    return models.Token(
        access_token=access_token, token_type="bearer", user_id=user_from_db.user_id
    )


@router.post("/login", status_code=status.HTTP_200_OK)
def log_in(
    request: models.UserLogIn, session: Session = Depends(get_session)
) -> models.Token:
    user_from_db = user.verify_user(request, session)
    if user_from_db == False:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Credentials"
        )

    access_token = JWTtoken.create_access_token({"sub": request.email})
    return models.Token(
        access_token=access_token, token_type="bearer", user_id=user_from_db.user_id
    )


@router.put("/update", status_code=status.HTTP_200_OK)
def update(request: models.User, session: Session = Depends(get_session)):
    pass
