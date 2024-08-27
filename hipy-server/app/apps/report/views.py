#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : views.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Author's Blog: https://blog.csdn.net/qq_32394351
# Date  : 2023/12/7

from fastapi import APIRouter, Request, Depends, Query, File, UploadFile
from typing import Any
from sqlalchemy.orm import Session
from fastapi.responses import StreamingResponse

from common.resp import respErrorJson
from .gen_report import Report
from apps.permission.models.user import Users

from common import deps, error_code

router = APIRouter()

access_name = 'report:excel_generate'
api_url = '/excel_generate'


@router.get(api_url + "/{_excel_name:path}", summary="生成Excel")
async def excel_generate(*, _excel_name: str = "", request: Request,
                         db: Session = Depends(deps.get_db),
                         u: Users = Depends(deps.user_perm([f"{access_name}:export"]))) -> Any:
    """
    通过动态import的形式，统一处理excel:模板下载/数据导出
    template参数默认为1，下载导入模板
    template参数传0可以导出筛选后的表格数据
    """
    try:
        report = Report(code=_excel_name, query_params=request.query_params).module
    except Exception as e:
        return respErrorJson(error_code.ERROR_INTERNAL.set_msg(f"内部服务器错误:{e}"))
    # t
    if request.query_params.get("template", "1") == "1":
        bio = report.get_template()  # 模板
    else:
        bio = report.get_instance(db)  # 实例
    file_name = report.file_name.encode('utf-8').decode('latin1')
    headers = {
        'Access-Control-Expose-Headers': 'content-disposition',
        'Content-Disposition': f'attachment; filename={file_name}.xlsx'
    }
    return StreamingResponse(bio, headers=headers)
