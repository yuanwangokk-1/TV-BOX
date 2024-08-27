from db.base_class import Base
from db.session import engine
from .job import Job
from .job_log import JobLog
from .logininfor import LoginInfor

__all__ = ['Job', 'JobLog', 'LoginInfor']

Base.metadata.create_all(engine)
