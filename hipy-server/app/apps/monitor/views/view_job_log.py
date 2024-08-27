#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : view_job_log.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Date  : 2024/1/4

from fastapi import APIRouter, Depends, Query, File, UploadFile
from sqlalchemy.orm import Session
from sqlalchemy import asc, desc, func
from ...permission.models import Users

from common import deps, error_code
from ..curd.curd_job_log import curd_job_log as curd
from ..models.job_log import JobLog

from common.resp import respSuccessJson, respErrorJson

router = APIRouter()

access_name = 'monitor:job-log'
api_url = '/jobLog'


@router.get(api_url + '/list', summary="查询调度日志列表")
async def searchRecords(*,
                        db: Session = Depends(deps.get_db),
                        run_status: int = Query(None),
                        job_id: str = Query(None),
                        job_name: str = Query(None),
                        begin_time: str = Query(None),
                        end_time: str = Query(None),
                        job_group: str = Query(None),
                        page: int = Query(1, gt=0),
                        page_size: int = Query(20, gt=0),
                        ):
    order_bys = [desc(JobLog.run_time)]
    res = curd.search(db, run_status=run_status, job_id=job_id, job_name=job_name, job_group=job_group,
                      begin_time=begin_time, end_time=end_time, page=page,
                      page_size=page_size, order_bys=order_bys)
    return respSuccessJson(res)


@router.delete(api_url + "/clean", summary="清空调度日志")
async def clearRecord(*,
                      db: Session = Depends(deps.get_db),
                      u: Users = Depends(deps.user_perm([f"{access_name}:delete"])),
                      ):
    curd.clear(db)
    return respSuccessJson()


@router.delete(api_url + "/{_ids}", summary="删除调度日志")
async def delRecord(*,
                    db: Session = Depends(deps.get_db),
                    u: Users = Depends(deps.user_perm([f"{access_name}:delete"])),
                    _ids: str,
                    ):
    _ids = list(map(lambda x: int(x), _ids.split(',')))
    curd.removes(db, _ids=_ids)
    return respSuccessJson()
