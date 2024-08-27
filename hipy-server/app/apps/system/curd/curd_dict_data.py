from typing import Tuple
from datetime import timedelta
import json

try:
    from redis.asyncio import Redis as asyncRedis
except ImportError:
    from aioredis import Redis as asyncRedis

from sqlalchemy.orm import Session, contains_eager
from sqlalchemy.sql import func
from common.curd_base import CRUDBase
from ..models.dictionaries import DictData, DictDetails
from cachetools import cached, TTLCache  # 可以缓存curd的函数，指定里面的key
from core.logger import logger
from core.config import settings


def envkey(*args, _type: str):
    return _type


class CURDDictData(CRUDBase):
    CACHE_KEY = "curd_dict_data_TYPE_"
    CACHE_ID_KEY = "curd_dict_data_type_ID_"
    EXPIRE_TIME = timedelta(minutes=15)

    @cached(cache=TTLCache(maxsize=10, ttl=settings.CACHE_TTL), key=envkey)
    def getByType(self, db: Session, _type: str, status_in: Tuple[int] = None) -> dict:
        status_in = status_in or (0,)
        obj = db.query(self.model).filter(self.model.dict_type == _type, self.model.is_deleted == 0,
                                          self.model.status.in_(status_in)).first()  # type: DictData
        if not obj:
            return {}
        dict_details = [{
            'id': detail.id,
            'label': detail.dict_label,
            'disabled': detail.dict_disabled,
            'value': int(detail.dict_value) if detail.dict_value.isdigit() else detail.dict_value,
            'is_default': detail.is_default,
            'remark': detail.remark
        } for detail in obj.dict_detail.filter(DictDetails.is_deleted == 0)]
        return {'id': obj.id, 'type': obj.dict_type, 'name': obj.dict_name, 'details': dict_details}

    async def getByTypeWithCache(self, r: asyncRedis, db: Session, _type: str) -> dict:
        _key = self.CACHE_KEY + _type
        # if res := await r.get(_key):  # python3.8+
        res = await r.get(_key)
        if res:
            return json.loads(res)
        res = self.getByType(db, _type=_type)
        await r.setex(_key, self.EXPIRE_TIME, json.dumps(res))
        await r.setex(self.CACHE_ID_KEY + str(res['id']), self.EXPIRE_TIME, _type)
        return res

    async def deleteCacheByID(self, r: asyncRedis, _id: int):
        del_keys = [self.CACHE_ID_KEY + str(_id)]
        # if res := await r.get(_keys[0]):    # python3.8+
        res = await r.get(del_keys[0])  # type: bytes
        if res:
            del_keys.append(self.CACHE_KEY + res.decode('utf-8'))
        await r.delete(*del_keys)

        keys = (await r.scan(match=f"{self.CACHE_KEY}*"))[-1]
        if len(keys) > 0:
            await r.delete(*keys)

        self.getByType.cache_clear()
        logger.info('=========执行deleteCacheByID方法自动清除系统参数缓存=========')

    def create(self, db: Session, *, obj_in, creator_id: int = 0):
        res = super().create(db, obj_in=obj_in, creator_id=creator_id)
        self.getByType.cache_clear()
        logger.info('=========执行创建方法自动清除系统参数缓存=========')
        return res

    def update(self, db: Session, *, _id: int, obj_in, modifier_id: int = 0):
        res = super().update(db, _id=_id, obj_in=obj_in, modifier_id=modifier_id)
        self.getByType.cache_clear()
        logger.info('=========执行更新方法自动清除系统参数缓存=========')
        return res

    def delete(self, db: Session, *, _id: int, deleter_id: int = 0):
        res = super().delete(db, _id=_id, deleter_id=deleter_id)
        self.getByType.cache_clear()
        logger.info('=========执行删除方法自动清除系统参数缓存=========')
        return res


curd_dict_data = CURDDictData(DictData)
