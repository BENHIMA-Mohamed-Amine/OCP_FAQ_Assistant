from datetime import datetime, timedelta, timezone
from jwt.exceptions import InvalidTokenError
from . import models
import jwt


SECRET_KEY = "42c9303f1ce70ef5c8495ec89725d1b496671b4c207bb2f6b6f2035b4a21fcab"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 300


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def verify_token(token, credentials_exception):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub", None)
        if email is None:
            raise credentials_exception
        token_data = models.TokenData(email=email)
        return token_data
    except InvalidTokenError:
        raise credentials_exception
