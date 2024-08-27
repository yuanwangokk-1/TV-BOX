#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : views_configs.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Author's Blog: https://blog.csdn.net/qq_32394351
# Date  : 2024/1/25

from typing import Any, Optional, List

import ujson

from core.config import settings
from core.logger import logger
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import asc

try:
    from redis.asyncio import Redis as asyncRedis
except ImportError:
    from aioredis import Redis as asyncRedis
from common import deps
from common.resp import respSuccessJson
from ..models import VodConfigs
from ..curd.curd_configs import curd_vod_configs as curd
from ..schemas import configs_schemas

from apps.permission.models import Users

router = APIRouter()

access_name = 'vod:configs'
api_url = '/configs'


@router.get(api_url + '/list', summary="查询配置列表")
async def searchRecords(*,
                        db: Session = Depends(deps.get_db),
                        u: Users = Depends(deps.user_perm([f"{access_name}:get"])),
                        page: int = 1,
                        page_size: int = 20,
                        name: str = "",
                        key: str = "",
                        status: int = None
                        ):
    filters = []
    if name:
        filters.append(VodConfigs.name.like(f"%{name}%"))
    if key:
        filters.append(VodConfigs.key.like(f"%{key}%"))
    if status is not None:
        filters.append(VodConfigs.status == status)
    data, total, offset, limit = curd.get_multi(db, filters=filters, page=page, page_size=page_size,
                                                order_bys=[asc(VodConfigs.order_num)])
    return respSuccessJson({'data': data, 'total': total, 'offset': offset, 'limit': limit})


@router.get(api_url + '/key/{key}', summary="通过Key获取单个配置")
async def getRecordByKey(*,
                         db: Session = Depends(deps.get_db),
                         r: asyncRedis = Depends(deps.get_redis),
                         key: str
                         ):
    if r:
        vod_configs_obj = await curd.getByKeyWithCache(r, db, key=key)
    else:
        vod_configs_obj = curd.getByKey(db, key=key)
    return respSuccessJson(vod_configs_obj)


@router.get(api_url + "/max-order-num", summary="获取配置最大排序")
async def getRecordMaxOrderNum(*,
                               db: Session = Depends(deps.get_db)
                               ):
    return respSuccessJson({'max_order_num': curd.getMaxOrderNum(db)})


@router.get(api_url + '/{_id}', summary="通过id获取单个配置")
async def getRecordByID(*,
                        db: Session = Depends(deps.get_db),
                        u: Users = Depends(deps.user_perm([f"{access_name}:get"])),
                        _id: int
                        ):
    vod_configs_obj = curd.get(db, _id=_id)
    return respSuccessJson(vod_configs_obj)


@router.post(api_url, summary="添加配置")
async def addRecord(*,
                    db: Session = Depends(deps.get_db),
                    u: Users = Depends(deps.user_perm([f"{access_name}:post"])),
                    obj: configs_schemas.VodConfigsSchema,
                    ):
    curd.create(db, obj_in=obj, creator_id=u['id'])
    return respSuccessJson()


@router.put(api_url + '/{_id}', summary="通过ID修改配置")
async def setRecordByID(*,
                        db: Session = Depends(deps.get_db),
                        u: Users = Depends(deps.user_perm([f"{access_name}:put"])),
                        obj: configs_schemas.VodConfigsSchema,
                        r: asyncRedis = Depends(deps.get_redis),
                        _id: int
                        ):
    if r:
        await curd.deleteCacheByID(r, _id=_id)
    curd.update(db, _id=_id, obj_in=obj, modifier_id=u['id'])
    return respSuccessJson()


@router.delete(api_url + "/clear", summary="清空配置")
async def clearRecord(*,
                      db: Session = Depends(deps.get_db),
                      u: Users = Depends(deps.user_perm([f"{access_name}:delete"])),
                      ):
    curd.clear(db)
    table_name = settings.SQL_TABLE_PREFIX + 'vod_configs'
    sql = ''
    if 'mysql' in settings.SQLALCHEMY_ENGINE:
        sql = f"ALTER TABLE {table_name} AUTO_INCREMENT = 1"
    elif 'postgresql' in settings.SQLALCHEMY_ENGINE:
        sql = f"ALTER SEQUENCE {table_name}_id_seq RESTART WITH 1;"
        # sql = f"select setval('{table_name}_id_seq', '1') from {table_name};"
    if sql:
        logger.info(f'执行重置索引的SQL:{sql}')
        db.execute(sql)
        db.commit()
        db.close()
    return respSuccessJson()


@router.delete(api_url + '/{_ids}', summary="通过ID删除配置")
async def delRecordByID(*,
                        db: Session = Depends(deps.get_db),
                        u: Users = Depends(deps.user_perm([f"{access_name}:delete"])),
                        r: asyncRedis = Depends(deps.get_redis),
                        _ids: str
                        ):
    _ids = list(map(lambda x: int(x), _ids.split(',')))
    if r:
        for _id in _ids:
            await curd.deleteCacheByID(r, _id=_id)
    curd.removes(db, _ids=_ids)
    return respSuccessJson()


@router.post(api_url + "/refresh", summary="刷新配置")
async def refreshConfigs(*,
                         db: Session = Depends(deps.get_db),
                         u: Users = Depends(deps.user_perm([f"{access_name}:post"])), ):
    configs_data = [
        {
            'name': 'drpy接口文件',
            'key': 'vod_drpy_api',
            'value': 'drpy_libs/drpy2.min.js',
            'remark': '自动生成配置中的drpy的api将会使用此文件',
            'value_type': 'file',
        },
        {
            'name': '接口密码',
            'key': 'vod_passwd',
            'value': 'dzyyds',
            'remark': 'hipy的t4接口将使用此密码作为参数验证',
            'value_type': 'str',
        },
        {
            'name': '生成配置模板文件',
            'key': 'vod_config_base',
            'value': 'txt/config.txt',
            'remark': 'hipy的自动生成在线配置将使用此文件作为渲染模板',
            'value_type': 'file',
        },
        {
            'name': '自定义配置模板文件',
            'key': 'vod_config_custom',
            'value': 'txt/custom.conf',
            'remark': 'hipy的自动生成在线配置将使用此文件作为个性化配置',
            'value_type': 'file',
        },
        {
            'name': '自定义解析文件',
            'key': 'vod_vip_parse',
            'value': 'txt/vip_parse.conf',
            'remark': 'hipy的自定义视频解析配置文件',
            'value_type': 'file',
        },
        {
            'name': '自定义直播外链',
            'key': 'vod_zb_url',
            'value': 'http://hiker.nokia.press/hikerule/zyw_data/43',
            'remark': 'hipy的自定义直播外链文件',
            'value_type': 'url',
        },
        {
            'name': '自定义直播本地文件',
            'key': 'vod_zb_file',
            # 'value': 'txt/zb.txt',
            'value': 'txt/mytv.txt',
            'remark': 'hipy的自定义直播本地文件',
            'value_type': 'file',
        },
        {
            'name': '自定义直播使用',
            'key': 'vod_zb_use',
            'value': 'file',
            'remark': 'hipy的直播使用外链或文件|file:使用文件,url:使用外链',
            'value_type': 'str',
        },
        {
            'name': '自定义挂载jar',
            'key': 'vod_custom_jar',
            'value': 'jar/custom_spider_dz1201.jar',
            # 'value': 'jar/pg.jar',
            'remark': 'hipy的自定义外挂jar文件,用于直播解析和视频解析轮询',
            'value_type': 'file',
        },
        {
            'name': '自定义壁纸',
            'key': 'vod_wall_paper',
            'value': 'https://tuapi.eees.cc/api.php?category=fengjing&type=302',
            'remark': 'hipy的自定义壁纸，可以是文件或着链接',
            'value_type': 'url',
        },
        {
            'name': '环境变量',
            'key': 'vod_hipy_env',
            'value': ujson.dumps({
                "ali_token": "682c41720d6d4c9d8ded00bcdd712870",
                "bili_cookie": "SESSDATA=93f1b89c%2C1685503124%2C760e0%2Ac1; bili_jct=5e0a1e65979f4d9f48fd9c158362b573; DedeUserID=253592508",
                "douban": "264291961", "vmid": "253592508", "test_env": "测试环境变量",
                "appkey": "1d8b6e7d45233436",
                "access_key": "3841bf63f94a8e8d0181e59470167aa1CjCup6x6MSEv8rLctbAuWLQs0ra3Ej09EJhjMBrgAsaVt3ALYteyfxjvizVqWrnlR0ESVmlucDVmcHBycjZDVk9KMDFucTRmMEcwMUlHWWhQZkVvUnRqeTdMWTNjU2phSkdpRkZFTGJPQUZ6NEVmcVVMUUx2WjZBTl8wb0lsTjhLbmp6SHVxRjdRIIEC"},
                ensure_ascii=False
            ),
            'remark': 'hipy的环境变量，json数据',
            'value_type': 'json',
        },
        {
            'name': 'git访问代理',
            'key': 'vod_git_proxy',
            'value': 'https://ghproxy.liuzhicong.com/',
            'remark': '代理加速git访问，解决被墙问题',
            'value_type': 'url',
        },
        {
            'name': 'git访问令牌',
            'key': 'vod_git_token',
            'value': ' ',
            'remark': '从 http://github.com/settings/tokens 获取的token，可以操作api以及破解git访问次数限制每小时60次提升至5000次',
            'value_type': 'str',
        },
        {
            'name': 'drpy源仓库1',
            'key': 'vod_drpy_house1',
            'value': 'hjdhnx/dr_py|js',
            'remark': 'drpy源的github仓库。repo|path',
            'value_type': 'str',
        },
        {
            'name': 'drpy源仓库2',
            'key': 'vod_drpy_house2',
            'value': 'heroaku/TVboxo|Js',
            'remark': 'drpy源的github仓库。repo|path',
            'value_type': 'str',
        },
        {
            'name': 'drpy源仓库3',
            'key': 'vod_drpy_house3',
            'value': 'gaotianliuyun/gao|js',
            'remark': 'drpy源的github仓库(高天流云)。repo|path',
            'value_type': 'str',
        },
    ]
    exist_records = []
    for config in configs_data:
        record = curd.getByKey(db, key=config['key'])
        if record:
            _id = record['id']
            name = record['name']
            key = record['key']
            curd.update(db, _id=record['id'], obj_in=config, modifier_id=u['id'])
        else:
            config.update({
                'order_num': 0,
                'status': 1,
            })
            max_order_num = curd.getMaxOrderNum(db)
            config.update({'order_num': max_order_num + 1})
            record = curd.create(db, obj_in=config, creator_id=u['id'])
            _id = record.id
            name = record.name
            key = record.key
        exist_records.append(_id)
        logger.info(f'record: id:{_id} name:{name} key:{key}')

    return respSuccessJson(data={'exist_count': len(exist_records)}, msg='刷新成功')
