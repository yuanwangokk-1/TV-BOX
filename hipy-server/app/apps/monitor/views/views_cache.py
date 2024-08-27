#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : views_cache.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Author's Blog: https://blog.csdn.net/qq_32394351
# Date  : 2023/12/17

try:
    from redis.asyncio import Redis
except ImportError:
    from aioredis import Redis

from fastapi import APIRouter, Depends, Query, File, UploadFile
from sqlalchemy.orm import Session
from ...permission.models import Users

from common import deps, error_code
from core.constants import REDIS_KEY_LOGIN_TOKEN_KEY_PREFIX, REDIS_KEY_REGISTER_TOKEN_KEY_PREFIX, \
    REDIS_KEY_FORGET_PWD_TOKEN_KEY_PREFIX, REDIS_KEY_USER_CAPTCHA_CODE_KEY_PREFIX, REDIS_KEY_USER_REGISTER_NUM_OF_TIME, \
    REDIS_KEY_USER_FORGET_PWD_NUM_OF_TIME, REDIS_KEY_USER_PERM_LABEL_CACHE

from common.resp import respSuccessJson, respErrorJson

router = APIRouter()

access_name = 'monitor:cache'
api_url = '/cache'


@router.get(api_url + '/getNames', summary="查询缓存名称列表")
async def listCacheName(*,
                        db: Session = Depends(deps.get_db),
                        u: Users = Depends(deps.user_perm([f"{access_name}:get"])),
                        redis: Redis = Depends(deps.get_redis),
                        ):
    # keys = await redis.keys("user_login*")
    data = [
        {
            "cacheName": REDIS_KEY_LOGIN_TOKEN_KEY_PREFIX,
            "remark": "用户登录token",
        },
        {
            "cacheName": REDIS_KEY_REGISTER_TOKEN_KEY_PREFIX,
            "remark": "用户注册token",
        },
        {
            "cacheName": REDIS_KEY_FORGET_PWD_TOKEN_KEY_PREFIX,
            "remark": "用户忘记密码token",
        },
        {
            "cacheName": REDIS_KEY_USER_CAPTCHA_CODE_KEY_PREFIX,
            "remark": "验证码",
        },
        {
            "cacheName": REDIS_KEY_USER_REGISTER_NUM_OF_TIME,
            "remark": "注册次数",
        },
        {
            "cacheName": REDIS_KEY_USER_FORGET_PWD_NUM_OF_TIME,
            "remark": "忘记密码次数",
        },
        {
            "cacheName": REDIS_KEY_USER_PERM_LABEL_CACHE,
            "remark": "权限标签",
        },
        {
            "cacheName": 'curd_dict_data_TYPE_',
            "remark": "字典缓存类型",
        },
        {
            "cacheName": 'curd_dict_data_type_ID_',
            "remark": "字典缓存ID",
        },
        {
            "cacheName": 'curd_config_setting_KEY_',
            "remark": "系统参数缓存键",
        },
        {
            "cacheName": 'curd_config_setting_key_ID_',
            "remark": "系统参数缓存ID",
        },
        {
            "cacheName": 'vod_configs_KEY_',
            "remark": "hipy配置缓存键",
        },
        {
            "cacheName": 'vod_configs_key_ID_',
            "remark": "hipy配置缓存ID",
        },
    ]
    return respSuccessJson(data=data)


@router.get(api_url + '/getKeys/{cacheName}', summary="查询缓存键名列表")
async def listCacheKey(*,
                       db: Session = Depends(deps.get_db),
                       u: Users = Depends(deps.user_perm([f"{access_name}:get"])),
                       redis: Redis = Depends(deps.get_redis),
                       cacheName: str,
                       ):
    keys = (await redis.scan(match=f"{cacheName}*"))[-1]
    data = []
    count = 0
    for key in keys:
        data.append(key.decode())
        count += 1
    print(count)

    return respSuccessJson(data=data)


@router.get(api_url + '/getValue/{cacheName}/{cacheKey}', summary="查询缓存内容")
async def getCacheValue(*,
                        db: Session = Depends(deps.get_db),
                        u: Users = Depends(deps.user_perm([f"{access_name}:get"])),
                        redis: Redis = Depends(deps.get_redis),
                        cacheName: str,
                        cacheKey: str,
                        ):
    cacheValue = await redis.get(cacheKey)
    data = {
        "cacheName": cacheName,
        "cacheKey": cacheKey.replace(cacheName, ''),
        "cacheValue": cacheValue.decode() if cacheValue else None,
    }

    return respSuccessJson(data=data)


@router.delete(api_url + '/clearCacheName/{cacheName}', summary="清理指定名称缓存")
async def clearCacheName(*,
                         db: Session = Depends(deps.get_db),
                         u: Users = Depends(deps.user_perm([f"{access_name}:delete"])),
                         redis: Redis = Depends(deps.get_redis),
                         cacheName: str,
                         ):
    keys = (await redis.scan(match=f"{cacheName}*"))[-1]
    if len(keys) > 0:
        await redis.delete(*keys)
    return respSuccessJson()


@router.delete(api_url + '/clearCacheKey/{cacheKey}', summary="清理指定键名缓存")
async def clearCacheKey(*,
                        db: Session = Depends(deps.get_db),
                        u: Users = Depends(deps.user_perm([f"{access_name}:delete"])),
                        redis: Redis = Depends(deps.get_redis),
                        cacheKey: str,
                        ):
    await redis.delete(cacheKey)
    return respSuccessJson()


@router.delete(api_url + '/clearCacheAll', summary="清理全部缓存")
async def clearCacheAll(*,
                        db: Session = Depends(deps.get_db),
                        u: Users = Depends(deps.user_perm([f"{access_name}:delete"])),
                        redis: Redis = Depends(deps.get_redis),
                        ):
    await redis.flushdb()
    return respSuccessJson()
