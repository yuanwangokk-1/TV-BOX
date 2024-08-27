#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : views_houses.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Date  : 2024/2/19

from typing import Any, Optional, List

import requests
import ujson
from core.logger import logger
from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session, joinedload
from time import time
from utils.vod_tool import get_interval
from common import deps, error_code
from common.resp import respSuccessJson, respErrorJson
from ..curd.curd_configs import curd_vod_configs as curd
import os
import io
from pathlib import Path
from utils.httpapi import getGitContents, getJSFiles
from apps.permission.models import Users

router = APIRouter()

access_name = 'vod:houses'
api_url = '/houses'


def read_records():
    project_dir = os.getcwd()
    file_path = os.path.join(project_dir, 't4/files/json/drpy_rules.json')
    file_path = Path(file_path).as_posix()
    drpy_dir = os.path.join(project_dir, 't4/files/drpy_js/')
    try:
        with open(file_path, encoding='utf-8') as f:
            records = ujson.loads(f.read())

        for record in records:
            local_file = os.path.join(drpy_dir, record['name'])
            if os.path.exists(local_file):
                record['status'] = 1
            else:
                record['status'] = 0

    except Exception as e:
        logger.info(f'读取本地drpy仓库源文件发送了错误:{e}')
        records = []
    return records


@router.get(api_url + '/list', summary="查询仓库源列表")
async def searchRecords(*,
                        u: Users = Depends(deps.user_perm([f"{access_name}:get"])),
                        page: int = 1,
                        page_size: int = 20,
                        rule: str = "",
                        status: int = None
                        ):
    records = read_records()
    if records:
        if rule:
            records = [record for record in records if rule in record['rule']]
        if status is not None:
            records = [record for record in records if status == record['status']]

    total = len(records)
    start = page_size * (page - 1)
    end = page_size * page
    res = {
        'data': records[start:end], 'total': total
    }

    return respSuccessJson(res)


@router.put(api_url + '/{_ids}', summary="通过ID导入源")
def addRecordByID(*,
                  db: Session = Depends(deps.get_db),
                  request: Request,
                  u: Users = Depends(deps.user_perm([f"{access_name}:delete"])),
                  _ids: str
                  ):
    host = str(request.base_url).rstrip('/')
    headers = dict(request.headers)
    logger.info(f'user:{u}')
    _ids = list(map(lambda x: int(x), _ids.split(',')))
    t1 = time()
    records = read_records()
    records = [record for record in records if record['id'] in _ids]
    success = []
    for record in records:
        url = record['url']
        name = record['name']
        try:
            content = requests.get(url, timeout=5).content
            file = io.BytesIO(content)
            files = {"files": (name, file)}
            params = {
                "updateSupport": True,
                "group": 't4/files/drpy_js',
            }
            r = requests.post(f'{host}/api/v1/vods/rules/file/uploadData', files=files, params=params, headers=headers)
            resp = r.json()
            if resp.get('code') == 0:
                success.append(record)
        except Exception as e:
            logger.info(f'导入源{name}发生了错误:{e}')

    cost = get_interval(t1)
    return respSuccessJson(data=f'导入成功{len(success)}/{len(records)}个源,耗时{cost}ms')


@router.post(api_url + "/refresh", summary="刷新配置")
def refreshRecords(*,
                   db: Session = Depends(deps.get_db),
                   u: Users = Depends(deps.user_perm([f"{access_name}:post"])), ):
    token = curd.getByKey(db, key='vod_git_token').get('value') or ''
    proxy = curd.getByKey(db, key='vod_git_proxy').get('value') or ''
    token = token.strip()
    proxy = proxy.strip()

    logger.info(f'token:{token},proxy:{proxy}')
    houses = curd.getHouses(db)
    houses = [h for h in houses if '|' in h['value']]
    records = []

    project_dir = os.getcwd()
    file_path = os.path.join(project_dir, 't4/files/json/drpy_rules.json')
    file_path = Path(file_path).as_posix()

    _id = 1
    for house in houses:
        name = house['name']
        repo = house['value'].split('|')[0]
        path = house['value'].split('|')[1]
        try:
            js_files = getJSFiles(repo, path, token, proxy)
        except Exception as e:
            return respErrorJson(error=error_code.ERROR_INTERNAL.set_msg(f'建议清空或更换配置中心的git令牌再试：{e}'))
        for js_file in js_files:
            js_file['id'] = _id
            js_file['from'] = name

            records.append(js_file)
            _id += 1

    with open(file_path, mode='w+', encoding='utf-8') as f:
        f.write(ujson.dumps(records, ensure_ascii=False, indent=4))
    return respSuccessJson(data={}, msg='刷新成功')
