#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : views_server.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Author's Blog: https://blog.csdn.net/qq_32394351
# Date  : 2023/12/5

from fastapi import APIRouter, Depends, Query, File, UploadFile
from sqlalchemy.orm import Session
from ...permission.models import Users

from common import deps, error_code
from utils.server_info import get_server_info

from common.resp import respSuccessJson, respErrorJson

router = APIRouter()

access_name = 'monitor:server'
api_url = '/server'


@router.get(api_url, summary="获取系统资源数据")
async def searchRecords(*,
                        db: Session = Depends(deps.get_db),
                        u: Users = Depends(deps.user_perm([f"{access_name}:get"])),
                        ):
    res = get_server_info()
    return respSuccessJson(res)
