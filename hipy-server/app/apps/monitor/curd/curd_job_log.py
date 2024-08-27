#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : curd_job_log.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Author's Blog: https://blog.csdn.net/qq_32394351
# Date  : 2023/12/10
from typing import Optional
from sqlalchemy.orm import Session
from common.curd_base import CRUDBase
from ..models.job_log import JobLog


class CURDJobLog(CRUDBase):

    def create(self, db: Session, *, obj_in, creator_id: int = 0):
        return super().create(db, obj_in=obj_in, creator_id=creator_id)

    def search(self, db: Session, *,
               run_status: int = None,
               job_id: str = None,
               begin_time: str = None,
               end_time: str = None,
               job_name: str = None,
               job_group: str = None,
               order_bys: Optional[list] = None,
               page: int = 1, page_size: int = 20) -> dict:
        filters = []
        if run_status is not None:
            filters.append(self.model.run_status == run_status)
        if job_id is not None:
            filters.append(self.model.job_id.like(f"%{job_id}%"))
        if job_name is not None:
            filters.append(self.model.job_name.like(f"%{job_name}%"))
        if job_group is not None:
            filters.append(self.model.job_group == job_group)
        if all([begin_time, end_time]):
            filters.append(self.model.run_time.between(begin_time, end_time))

        records, total, _, _ = self.get_multi(db, page=page, page_size=page_size, filters=filters, order_bys=order_bys)

        return {'results': records, 'total': total}


curd_job_log = CURDJobLog(JobLog)
