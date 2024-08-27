from typing import Any, Optional

from core.logger import logger
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import asc

try:
    from redis.asyncio import Redis as asyncRedis
except ImportError:
    from aioredis import Redis as asyncRedis
from common.resp import respSuccessJson
from .models import DictData, DictDetails, ConfigSettings
from .schemas import ConfigSettingSchema, DictDataSchema, DictDetailSchema
from .curd.curd_config_setting import curd_config_setting
from .curd.curd_dict_data import curd_dict_data
from .curd.curd_dict_detail import curd_dict_detail
from common import deps
from ..permission.models import Users

router = APIRouter()


@router.get("/config-setting", summary="获取配置设置列表")
async def getConfigSettingsList(*,
                                db: Session = Depends(deps.get_db),
                                u: Users = Depends(deps.user_perm(["system:config-setting:get"])),
                                page: int = 1,
                                page_size: int = 20,
                                name: str = "",
                                key: str = "",
                                status: int = None
                                ):
    filters = []
    if name:
        filters.append(ConfigSettings.name.like(f"%{name}%"))
    if key:
        filters.append(ConfigSettings.key.like(f"%{key}%"))
    if status is not None:
        filters.append(ConfigSettings.status == status)
    data, total, offset, limit = curd_config_setting.get_multi(db, filters=filters, page=page, page_size=page_size,
                                                               order_bys=[asc(ConfigSettings.order_num)])
    return respSuccessJson({'data': data, 'total': total, 'offset': offset, 'limit': limit})


@router.get("/config-setting/key/{key}", summary="通过Key获取单个配置")
async def getConfigSettingByKey(*,
                                db: Session = Depends(deps.get_db),
                                r: asyncRedis = Depends(deps.get_redis),
                                key: str
                                ):
    if r:
        config_setting_obj = await curd_config_setting.getByKeyWithCache(r, db, key=key)
    else:
        config_setting_obj = curd_config_setting.getByKey(db, key=key)
    return respSuccessJson(config_setting_obj)


@router.get("/config-setting/max-order-num", summary="获取配置最大排序")
async def getConfigSettingMaxOrderNum(*,
                                      db: Session = Depends(deps.get_db)
                                      ):
    return respSuccessJson({'max_order_num': curd_config_setting.getMaxOrderNum(db)})


@router.get("/config-setting/{_id}", summary="通过id获取单个配置")
async def getConfigSettingByID(*,
                               db: Session = Depends(deps.get_db),
                               u: Users = Depends(deps.user_perm(["system:config-setting:get",
                                                                  "system:config-setting:put"])),
                               _id: int
                               ):
    config_setting_obj = curd_config_setting.get(db, _id=_id)
    return respSuccessJson(config_setting_obj)


@router.post("/config-setting", summary="添加配置")
async def addConfigSetting(*,
                           db: Session = Depends(deps.get_db),
                           u: Users = Depends(deps.user_perm(["system:config-setting:post"])),
                           obj: ConfigSettingSchema,
                           ):
    curd_config_setting.create(db, obj_in=obj, creator_id=u['id'])
    return respSuccessJson()


@router.put("/config-setting/{_id}", summary="通过ID修改配置")
async def setConfigSettingByID(*,
                               db: Session = Depends(deps.get_db),
                               u: Users = Depends(deps.user_perm(["system:config-setting:put"])),
                               obj: ConfigSettingSchema,
                               r: asyncRedis = Depends(deps.get_redis),
                               _id: int
                               ):
    if r:
        await curd_config_setting.deleteCacheByID(r, _id=_id)
    curd_config_setting.update(db, _id=_id, obj_in=obj, modifier_id=u['id'])
    return respSuccessJson()


@router.delete("/config-setting/{_id}", summary="通过ID删除配置")
async def delConfigSettingByID(*,
                               db: Session = Depends(deps.get_db),
                               u: Users = Depends(deps.user_perm(["system:config_setting:delete"])),
                               r: asyncRedis = Depends(deps.get_redis),
                               _id: int
                               ):
    if r:
        await curd_config_setting.deleteCacheByID(r, _id=_id)
    curd_config_setting.delete(db, _id=_id, deleter_id=u['id'])
    return respSuccessJson()


@router.get("/dict/type/{_type}", summary="获取字典kv")
async def getDict(*,
                  _type: str,
                  r: asyncRedis = Depends(deps.get_redis),
                  db: Session = Depends(deps.get_db)
                  ):
    if r:
        result = await curd_dict_data.getByTypeWithCache(r, db, _type=_type)
    else:
        result = curd_dict_data.getByType(db, _type=_type)
    return respSuccessJson(result)


@router.get("/dict/data", summary="获取字典")
async def listDictData(*,
                       db: Session = Depends(deps.get_db),
                       u: Users = Depends(deps.user_perm(["system:dict:get"])),
                       page: int = 1,
                       page_size: int = 20,
                       dict_name: str = "",
                       dict_type: str = "",
                       status: int = None,
                       ):
    filters = []
    if dict_name:
        filters.append(DictData.dict_name.like(f"%{dict_name}%"))
    if dict_type:
        filters.append(DictData.dict_type.like(f"%{dict_type}%"))
    if status is not None:
        filters.append(DictData.status == status)
    data, total, offset, limit = curd_dict_data.get_multi(db, page=page, page_size=page_size, filters=filters,
                                                          order_bys=[asc(DictData.order_num)])
    return respSuccessJson({'data': data, 'total': total, 'offset': offset, 'limit': limit})


@router.get("/dict/data/max-order-num", summary="获取字典最大排序")
async def getDictDataMaxOrderNum(*,
                                 db: Session = Depends(deps.get_db)
                                 ):
    return respSuccessJson({'max_order_num': curd_dict_data.getMaxOrderNum(db)})


@router.get("/dict/data/{_id}", summary="获取单个字典")
async def getDictData(*,
                      _id: int,
                      db: Session = Depends(deps.get_db),
                      u: Users = Depends(deps.user_perm(["system:dict:get", "system:dict:put"]))
                      ):
    return respSuccessJson(curd_dict_data.get(db, _id=_id))


@router.post("/dict/data", summary="添加字典")
async def addDictData(*,
                      db: Session = Depends(deps.get_db),
                      u: Users = Depends(deps.user_perm(["system:dict:post"])),
                      obj: DictDataSchema
                      ):
    curd_dict_data.create(db, obj_in=obj, creator_id=u['id'])
    return respSuccessJson()


@router.put("/dict/data/{_id}", summary="修改字典")
async def setDictData(*,
                      _id: int,
                      db: Session = Depends(deps.get_db),
                      r: asyncRedis = Depends(deps.get_redis),
                      u: Users = Depends(deps.user_perm(["system:dict:put"])),
                      obj: DictDataSchema
                      ):
    if r:
        await curd_dict_data.deleteCacheByID(r, _id=_id)
    curd_dict_data.update(db, _id=_id, obj_in=obj, modifier_id=u['id'])
    return respSuccessJson()


@router.delete("/dict/data/{_id}", summary="删除字典")
async def delDictData(*,
                      _id: int,
                      db: Session = Depends(deps.get_db),
                      r: asyncRedis = Depends(deps.get_redis),
                      u: Users = Depends(deps.user_perm(["system:dict:delete"])),
                      ):
    if r:
        await curd_dict_data.deleteCacheByID(r, _id=_id)
    curd_dict_data.delete(db, _id=_id, deleter_id=u['id'])
    return respSuccessJson()


@router.get("/dict/detail", summary="获取字典值")
async def listDictDetail(*,
                         db: Session = Depends(deps.get_db),
                         u: Users = Depends(deps.user_perm(["system:dict:detail:get"])),
                         page: int = 1,
                         page_size: int = 20,
                         dict_data_id: int = 0,
                         label: str = "",
                         status: int = None
                         ):
    filters = []
    if dict_data_id:
        filters.append(DictDetails.dict_data_id == dict_data_id)
    if label:
        filters.append(DictDetails.dict_label.like(f"%{label}%"))
    if status is not None:
        filters.append(DictDetails.status == status)
    data, total, offset, limit = curd_dict_detail.get_multi(db, page=page, page_size=page_size, filters=filters,
                                                            order_bys=[asc(DictDetails.order_num)])
    return respSuccessJson({'data': data, 'total': total, 'offset': offset, 'limit': limit})


@router.get("/dict/detail/{_id}", summary="获取单个字典值")
async def getDictDetail(*,
                        _id: int,
                        db: Session = Depends(deps.get_db),
                        u: Users = Depends(deps.user_perm(["system:dict:detail:get", "system:dict:detail:put"])),
                        ):
    return respSuccessJson(curd_dict_detail.get(db, _id=_id))


@router.post("/dict/detail", summary="添加字典值")
async def addDictDetail(*,
                        db: Session = Depends(deps.get_db),
                        r: asyncRedis = Depends(deps.get_redis),
                        u: Users = Depends(deps.user_perm(["system:dict:detail:post"])),
                        obj: DictDetailSchema
                        ):
    if r:
        await curd_dict_data.deleteCacheByID(r, _id=obj.dict_data_id)
    curd_dict_detail.create(db, obj_in=obj, creator_id=u['id'])
    return respSuccessJson()


@router.put("/dict/detail/{_id}", summary="修改字典值")
async def setDictDetail(*,
                        _id: int,
                        db: Session = Depends(deps.get_db),
                        r: asyncRedis = Depends(deps.get_redis),
                        u: Users = Depends(deps.user_perm(["system:dict:detail:put"])),
                        obj: DictDetailSchema
                        ):
    if r:
        await curd_dict_data.deleteCacheByID(r, _id=obj.dict_data_id)
    curd_dict_detail.update(db, _id=_id, obj_in=obj, modifier_id=u['id'])
    return respSuccessJson()


@router.delete("/dict/detail/{_id}", summary="删除字典值")
async def delDictDetail(*,
                        _id: int,
                        db: Session = Depends(deps.get_db),
                        r: asyncRedis = Depends(deps.get_redis),
                        u: Users = Depends(deps.user_perm(["system:dict:detail:delete"])),
                        ):
    if r:
        obj = curd_dict_detail.get(db, _id=_id)
        await curd_dict_data.deleteCacheByID(r, _id=obj['dict_data_id'])
    curd_dict_detail.delete(db, _id=_id, deleter_id=u['id'])
    return respSuccessJson()


@router.get("/dict/detail/max-order-num/{dict_data_id}", summary="获取字典值中最大排序")
async def getDictDetailMaxOrderNum(*,
                                   dict_data_id: int,
                                   db: Session = Depends(deps.get_db)
                                   ):
    return respSuccessJson({"max_order_num": curd_dict_detail.get_max_order_num(db, dict_data_id=dict_data_id)})
