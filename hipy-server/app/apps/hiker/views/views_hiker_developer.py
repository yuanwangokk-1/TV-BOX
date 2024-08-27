#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : views_hiker_developer.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Author's Blog: https://blog.csdn.net/qq_32394351
# Date  : 2023/12/3

from fastapi import APIRouter, Depends, Query, File, UploadFile
from sqlalchemy.orm import Session
from ...permission.models import Users
from ..schemas import developer_schemas
from ..schemas.common import ActiveSchema
from ..curd.curd_hiker_developer import curd_hiker_developer as curd

from common import deps, error_code

from common.resp import respSuccessJson, respErrorJson

router = APIRouter()

access_name = 'hiker:developer'
api_url = '/hiker_developer'


@router.get(api_url, summary="搜索开发者")
async def searchRecords(*,
                        db: Session = Depends(deps.get_db),
                        status: int = Query(None),
                        name: str = Query(None),
                        qq: str = Query(None),
                        page: int = Query(1, gt=0),
                        page_size: int = Query(20, gt=0),
                        ):
    res = curd.search(db, name=name, qq=qq, status=status, page=page, page_size=page_size)
    return respSuccessJson(res)


@router.get(api_url + "/{_id}", summary="通过ID获取开发者信息")
async def getRecord(*,
                    db: Session = Depends(deps.get_db),
                    _id: int,
                    ):
    return respSuccessJson(curd.get(db, _id=_id))


@router.post(api_url, summary="添加开发者")
async def addRecord(*,
                    db: Session = Depends(deps.get_db),
                    u: Users = Depends(deps.user_perm([f"{access_name}:post"])),
                    obj: developer_schemas.DeveloperSchema,
                    ):
    res = curd.create(db, obj_in=obj, creator_id=u['id'])
    if res:
        return respSuccessJson()
    return respErrorJson(error=error_code.ERROR_HIKER_DEVELOPER_ADD_ERROR)


@router.put(api_url + "/{_id}", summary="修改开发者")
async def setRecord(*,
                    db: Session = Depends(deps.get_db),
                    u: Users = Depends(deps.user_perm([f"{access_name}:put"])),
                    obj: developer_schemas.DeveloperSchema,
                    _id: int,
                    ):
    curd.update(db, _id=_id, obj_in=obj, modifier_id=u['id'])
    return respSuccessJson()


@router.delete(api_url + "/{_ids}", summary="删除开发者")
async def delRecord(*,
                    db: Session = Depends(deps.get_db),
                    u: Users = Depends(deps.user_perm([f"{access_name}:delete"])),
                    _ids: str,
                    ):
    _ids = list(map(lambda x: int(x), _ids.split(',')))
    curd.deletes(db, _ids=_ids, deleter_id=u['id'])
    return respSuccessJson()


@router.put(api_url + "/{_id}/is_manager", summary="修改开发者是否为超管")
async def setIsManager(*,
                       db: Session = Depends(deps.get_db),
                       u: Users = Depends(deps.user_perm([f"{access_name}:put"])),
                       _id: int,
                       obj: developer_schemas.IsManagerSchema
                       ):
    curd.setIsManager(db, _id=_id, is_manager=obj.is_manager, modifier_id=u['id'])
    return respSuccessJson()


@router.put(api_url + "/{_id}/active", summary="修改开发者是否启用")
async def setActive(*,
                    db: Session = Depends(deps.get_db),
                    u: Users = Depends(deps.user_perm([f"{access_name}:put"])),
                    _id: int,
                    obj: ActiveSchema
                    ):
    curd.setActive(db, _id=_id, active=obj.active, modifier_id=u['id'])
    return respSuccessJson()
