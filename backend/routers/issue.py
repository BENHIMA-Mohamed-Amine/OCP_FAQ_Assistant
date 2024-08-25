from fastapi import APIRouter, Depends, status, HTTPException
from sqlmodel import Session
from .. import models
from ..database import get_session
from ..oauth2 import get_current_user
from ..crud import issue
from typing import List


router = APIRouter(prefix="/issue", tags=["issue"])


@router.get("/all", response_model=List[models.Issue])
def get_all(
    session: Session = Depends(get_session),
    current_user: models.User = Depends(get_current_user),
) -> List[models.Issue]:

    issues = issue.get_all(session)
    if len(issues) == 0:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "No issue was found in the DB")
    return issues


@router.post("/create", status_code=status.HTTP_201_CREATED)
def create(
    request: models.IssueCreate,
    session: Session = Depends(get_session),
    current_user: models.User = Depends(get_current_user),
):
    issue.create(request, session)


@router.put("/update", response_model=models.Issue)
def update(
    request: models.Issue,
    session: Session = Depends(get_session),
    current_user: models.User = Depends(get_current_user),
) -> models.Issue:
    updated_issue = issue.update(request, session)
    if updated_issue is None:
        raise HTTPException(
            status.HTTP_404_NOT_FOUND,
            f"No issue was found in the DB with the id: {request.issue_id}",
        )
    return updated_issue


@router.delete("/delete/{id}")
def delete(
    id: int,
    session: Session = Depends(get_session),
    current_user: models.User = Depends(get_current_user),
):
    if issue.delete(id, session) is None:
        raise HTTPException(
            status.HTTP_404_NOT_FOUND,
            f"No issue was found in the DB with the id: {id}",
        )
