#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : curd_configs.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Author's Blog: https://blog.csdn.net/qq_32394351
# Date  : 2024/1/25

from typing import Any, Optional, List
from sqlalchemy import func
from sqlalchemy.orm import Session
from datetime import timedelta
import json

try:
    from redis.asyncio import Redis as asyncRedis
except ImportError:
    from aioredis import Redis as asyncRedis

from common.curd_base import CRUDBase
from ..models.vod_configs import VodConfigs
from cachetools import cached, TTLCache  # 可以缓存curd的函数，指定里面的key
from core.logger import logger
from core.config import settings


def envkey(*args, key: str):
    return key


class CURDVodConfigs(CRUDBase):
    CACHE_KEY = "vod_configs_KEY_"
    CACHE_ID_KEY = "vod_configs_key_ID_"
    EXPIRE_TIME = timedelta(minutes=15)

    # @lru_cache(maxsize=8, typed=False)
    @cached(cache=TTLCache(maxsize=10, ttl=settings.CACHE_TTL), key=envkey)
    def getByKey(self, db: Session, key: str) -> dict:
        obj = db.query(*self.query_columns).filter(self.model.key == key, self.model.is_deleted == 0,
                                                   self.model.status.in_((0, 1))).first()
        logger.info('=========测试缓存是否生效,仅第一次访问无缓存时出现此提示=========')
        if not obj:
            return {}
        return {'id': obj.id, 'key': obj.key, 'name': obj.name, 'status': obj.status,
                'value': int(obj.value) if obj.value.isdigit() else obj.value,
                'value_type': obj.value_type,
                }

    async def getByKeyWithCache(self, r: asyncRedis, db: Session, key: str) -> dict:
        _key = self.CACHE_KEY + key
        # if res := await r.get(_key):  # python3.8+
        res = await r.get(_key)
        if res:
            return json.loads(res)
        res = self.getByKey(db, key=key)
        await r.setex(_key, self.EXPIRE_TIME, json.dumps(res))
        await r.setex(self.CACHE_ID_KEY + str(res['id']), self.EXPIRE_TIME, key)
        return res

    async def deleteCacheByID(self, r: asyncRedis, _id: int):
        del_keys = [self.CACHE_ID_KEY + str(_id)]
        # if res := await r.get(_keys[0]):  # python3.8+
        res = await r.get(del_keys[0])  # type: bytes
        if res:
            del_keys.append(self.CACHE_KEY + res.decode('utf-8'))
        await r.delete(*del_keys)

    def create(self, db: Session, *, obj_in, creator_id: int = 0):
        res = super().create(db, obj_in=obj_in, creator_id=creator_id)
        self.getByKey.cache_clear()
        logger.info('=========执行创建方法自动清除hipy配置缓存=========')
        return res

    def update(self, db: Session, *, _id: int, obj_in, modifier_id: int = 0):
        res = super().update(db, _id=_id, obj_in=obj_in, modifier_id=modifier_id)
        self.getByKey.cache_clear()
        logger.info('=========执行更新方法自动清除hipy配置缓存=========')
        return res

    def removes(self, db: Session, *, _ids: List[int]):
        res = super().removes(db, _ids=_ids)
        self.getByKey.cache_clear()
        logger.info('=========执行物理删除方法自动清除hipy配置缓存=========')
        return res

    def delete(self, db: Session, *, _id: int, deleter_id: int = 0):
        res = super().delete(db, _id=_id, deleter_id=deleter_id)
        self.getByKey.cache_clear()
        logger.info('=========执行删除方法自动清除hipy配置缓存=========')
        return res

    def getHouses(self, db: Session):
        """
        获取状态为正常的仓库配置
        @param db:
        @return:
        """
        obj = db.query(*self.query_columns).filter(self.model.key.ilike(f"%vod_drpy_house%"),
                                                   self.model.is_deleted == 0,
                                                   self.model.status.in_((1,))).all()
        obj_list = [dict(o) for o in obj]
        obj_list = [{
            "id": o["id"],
            "name": o["name"],
            "key": o["key"],
            "value": o["value"],
        } for o in obj_list]
        return obj_list


curd_vod_configs = CURDVodConfigs(VodConfigs)
