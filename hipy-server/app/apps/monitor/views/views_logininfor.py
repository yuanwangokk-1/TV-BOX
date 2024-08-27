#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : views_logininfor.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Author's Blog: https://blog.csdn.net/qq_32394351
# Date  : 2023/12/7

from fastapi import APIRouter, Depends, Query, File, UploadFile
from sqlalchemy.orm import Session
from sqlalchemy import asc, desc, func
from ...permission.models import Users

from common import deps, error_code
from ..curd.curd_logininfor import curd_logininfor as curd
from ..models.logininfor import LoginInfor

from common.resp import respSuccessJson, respErrorJson

router = APIRouter()

access_name = 'monitor:logininfor'
api_url = '/logininfor'


@router.get(api_url + '/list', summary="获取登录日志")
async def searchRecords(*,
                        db: Session = Depends(deps.get_db),
                        status: int = Query(None),
                        user_name: str = Query(None),
                        ipaddr: str = Query(None),
                        login_time: str = Query(None),
                        order_by: str = Query(None),
                        is_desc: bool = Query(None),
                        page: int = Query(1, gt=0),
                        page_size: int = Query(20, gt=0),
                        ):
    order_bys = []
    if order_by:
        if order_by == 'login_time':
            order_bys += [desc(LoginInfor.login_time)] if is_desc else [asc(LoginInfor.login_time)]
    res = curd.search(db, user_name=user_name, ipaddr=ipaddr, status=status, login_time=login_time, page=page,
                      page_size=page_size, order_bys=order_bys)
    return respSuccessJson(res)


@router.delete(api_url + "/clean", summary="清空登录日志")
async def clearRecord(*,
                      db: Session = Depends(deps.get_db),
                      u: Users = Depends(deps.user_perm([f"{access_name}:delete"])),
                      ):
    curd.clear(db)
    return respSuccessJson()


@router.delete(api_url + "/{_ids}", summary="删除登录日志")
async def delRecord(*,
                    db: Session = Depends(deps.get_db),
                    u: Users = Depends(deps.user_perm([f"{access_name}:delete"])),
                    _ids: str,
                    ):
    _ids = list(map(lambda x: int(x), _ids.split(',')))
    curd.removes(db, _ids=_ids)
    return respSuccessJson()
