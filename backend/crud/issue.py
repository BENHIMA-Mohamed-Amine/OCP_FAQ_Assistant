from sqlmodel import Session, select
from .. import models


def get_all(session: Session):
    return session.exec(select(models.Issue)).all()


def get_issue_by_id(id: int, session: Session):
    return session.get(models.Issue, id)


def create(issue: models.IssueCreate, session: Session):
    issue_db = models.Issue.model_validate(issue)
    session.add(issue_db)
    session.commit()
    session.refresh(issue_db)
    return issue_db.issue_id


def update(issue: models.Issue, session: Session) -> models.Issue | None:
    issue_in_db = session.get(models.Issue, issue.issue_id)
    if issue_in_db is None:
        return None
    issue_in_db.problem = issue.problem
    issue_in_db.solution = issue.solution
    session.add(issue_in_db)
    session.commit()
    session.refresh(issue_in_db)
    return issue_in_db


def delete(id: int, session: Session):
    issue = get_issue_by_id(id, session)
    if issue is None:
        return None
    session.delete(issue)
    session.commit()
    return True
