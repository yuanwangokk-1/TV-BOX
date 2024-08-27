#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : views_pip.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Author's Blog: https://blog.csdn.net/qq_32394351
# Date  : 2023/12/13

from fastapi import APIRouter, Depends, Query, File, UploadFile
from sqlalchemy.orm import Session
from ...permission.models import Users
from ..schemas import pip_schemas

from common import deps, error_code
from utils.pip import *

from common.resp import respSuccessJson, respErrorJson

router = APIRouter()

access_name = 'monitor:pip'
api_url = '/pip'


@router.get(api_url, summary="获取pip依赖列表")
async def searchRecords(*,
                        db: Session = Depends(deps.get_db),
                        u: Users = Depends(deps.user_perm([f"{access_name}:get"])),
                        name: str = Query(None),
                        version: str = Query(None),
                        page: int = Query(1, gt=0),
                        page_size: int = Query(20, gt=0),
                        ):
    req_str = get_requirements()
    result = get_pip_package_info()
    packages_origin = result['pip_package_list']
    packages = packages_origin
    package_info = result['pip_package_info']
    records = []

    if name:
        packages = [i for i in packages if name in i]
    if version:
        packages = [i for i in packages if version in package_info[i]]

    for row_index, package in enumerate(packages):
        records.append({
            'id': packages_origin.index(package) + 1,
            'name': package,
            'version': package_info[package],
            'is_local': package in req_str,
        })
    total = len(records)
    start = page_size * (page - 1)
    end = page_size * page
    res = {
        'results': records[start:end], 'total': total
    }

    return respSuccessJson(res)


@router.get(api_url + "/{_id}", summary="通过ID获取依赖信息")
async def getRecord(*,
                    db: Session = Depends(deps.get_db),
                    u: Users = Depends(deps.user_perm([f"{access_name}:get"])),
                    _id: int,
                    ):
    req_str = get_requirements()
    result = get_pip_package_info()
    packages = result['pip_package_list']
    package_info = result['pip_package_info']
    package_name = packages[_id - 1]
    res = {
        "id": _id,
        "name": package_name,
        "version": package_info[package_name],
        'is_local': package_name in req_str,
    }

    return respSuccessJson(res)


@router.post(api_url, summary="添加依赖")
async def addRecord(*,
                    db: Session = Depends(deps.get_db),
                    u: Users = Depends(deps.user_perm([f"{access_name}:post"])),
                    obj: pip_schemas.PipSchema,
                    ):
    package_str = obj.name
    if obj.version:
        package_str += f'~={obj.version}'
    result = do_cmd_install(package_str)
    if 'Successfully installed' in result:
        return respSuccessJson()
    if 'already satisfied' in result:
        return respErrorJson(error=error_code.ERROR_PIP_ADD_EXIST_ERROR)
    return respErrorJson(error=error_code.ERROR_PIP_ADD_ERROR)


@router.put(api_url + "/{_id}", summary="修改依赖信息")
async def setRecord(*,
                    db: Session = Depends(deps.get_db),
                    u: Users = Depends(deps.user_perm([f"{access_name}:put"])),
                    _id: int,
                    obj: pip_schemas.PipSchema,
                    ):
    return respSuccessJson()


@router.delete(api_url + "/{_ids}", summary="删除依赖")
async def delRecord(*,
                    db: Session = Depends(deps.get_db),
                    u: Users = Depends(deps.user_perm([f"{access_name}:delete"])),
                    _ids: str,
                    ):
    _ids = list(map(lambda x: int(x), _ids.split(',')))
    result = get_pip_package_info()
    packages = result['pip_package_list']
    # package_info = result['pip_package_info']
    to_del_packages = [packages[_id - 1] for _id in _ids]
    for to_del_package in to_del_packages:
        do_cmd_uninstall(to_del_package)

    return respSuccessJson()
