from fastapi import APIRouter, Depends, status, HTTPException
from sqlmodel import Session
from .. import models
from ..database import get_session
from ..oauth2 import get_current_user
from ..crud import issue
from typing import List
from ..ai_service import store_issue_index, delete_issue


# faq_list = [
#     {
#         "question": "I forgot my password.",
#         "solution": "Would you like to request a password reset?",
#     },
#     {
#         "question": "I'm having trouble connecting my computer to the internet.",
#         "solution": (
#             "This might be an internet connection issue. Would you like guidance to resolve this? "
#             "1. Check the network cable connection. "
#             "2. Verify the connection icon status. "
#             "3. Check the web connection settings."
#         ),
#     },
#     {
#         "question": "My computer won't start.",
#         "solution": (
#             "Please check the power cable. "
#             "Can you hear any beeping sounds when trying to start?"
#         ),
#     },
#     {
#         "question": "The printer is not working.",
#         "solution": (
#             "1. Is the printer turned on and properly connected? "
#             "2. Check if there is any paper jam. "
#             "3. Verify if the printer driver is installed correctly."
#         ),
#     },
#     {
#         "question": "I can't access my email.",
#         "solution": (
#             "1. Check if you are connected to the internet. "
#             "2. Verify that your email credentials are correct. "
#             "3. Ensure that your email client is configured properly."
#         ),
#     },
#     {
#         "question": "My screen is frozen.",
#         "solution": (
#             "1. Try pressing 'Ctrl + Alt + Delete' to open the Task Manager. "
#             "2. End any unresponsive tasks. "
#             "3. If that doesn't work, restart your computer."
#         ),
#     },
#     {
#         "question": "The software is not responding.",
#         "solution": (
#             "1. Close the software and reopen it. "
#             "2. Check for any available updates for the software. "
#             "3. Restart your computer if the issue persists."
#         ),
#     },
#     {
#         "question": "I can't connect to the shared drive.",
#         "solution": (
#             "1. Verify your network connection. "
#             "2. Ensure you have the correct permissions to access the shared drive. "
#             "3. Try mapping the network drive again."
#         ),
#     },
#     {
#         "question": "My computer is running very slow.",
#         "solution": (
#             "1. Check for any background processes that are using high resources. "
#             "2. Run a virus scan to ensure there is no malware. "
#             "3. Consider clearing temporary files and restarting your computer."
#         ),
#     },
# ]


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
    issue_id = issue.create(request, session)
    store_issue_index(
        request,
        issue_id,
    )


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
    issue_create = models.IssueCreate(
        problem=request.problem, solution=request.solution
    )
    store_issue_index(issue_create, request.issue_id)
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
    delete_issue(id)
