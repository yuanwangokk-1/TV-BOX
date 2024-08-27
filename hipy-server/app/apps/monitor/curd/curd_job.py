#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : curd_job.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Author's Blog: https://blog.csdn.net/qq_32394351
# Date  : 2023/12/10

from sqlalchemy.orm import Session
from common.curd_base import CRUDBase
from ..models.job import Job


class CURDJob(CRUDBase):

    def create(self, db: Session, *, obj_in, creator_id: int = 0):
        return super().create(db, obj_in=obj_in, creator_id=creator_id)

    def search(self, db: Session, *,
               status: int = None,
               job_name: str = None,
               job_group: str = None,
               page: int = 1, page_size: int = 20) -> dict:
        filters = []
        if status is not None:
            filters.append(self.model.status == status)
        if job_name is not None:
            filters.append(self.model.job_name.like(f"%{job_name}%"))
        if job_group is not None:
            filters.append(self.model.job_group == job_group)

        records, total, _, _ = self.get_multi(db, page=page, page_size=page_size, filters=filters)

        return {'results': records, 'total': total}


curd_job = CURDJob(Job)
