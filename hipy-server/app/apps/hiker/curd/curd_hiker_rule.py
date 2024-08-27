#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : curd_hiker_rule.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Author's Blog: https://blog.csdn.net/qq_32394351
# Date  : 2023/12/2

from typing import Any, Dict, Generic, List, Optional, Type, TypeVar, Union, Tuple
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session
from sqlalchemy import asc, desc, func, distinct
from common.curd_base import CRUDBase, ModelType
from ..models.hiker_rule import HikerRuleType, HikerRule
from ..models.hiker_developer import HikerDeveloper


class CURDHikerRuleType(CRUDBase):

    # def get(self, db: Session, _id: int, to_dict: bool = True):
    #     """ 通过id获取 """
    #     record = db.query(self.model).filter(self.model.id == _id, self.model.is_deleted == 0).first()
    #     return record if not to_dict else {
    #         'id': record.id,
    #         'name': record.name,
    #         'count_num': record.count_num,
    #         'active': record.active,
    #     }

    def create(self, db: Session, *, obj_in, creator_id: int = 0):
        obj_in_data = obj_in if isinstance(obj_in, dict) else jsonable_encoder(obj_in)
        if db.query(self.model).filter(self.model.name == obj_in_data['name'],
                                       self.model.is_deleted == 0).first():  # 如果已经有规则类型返回None
            return None
        obj_in_data['creator_id'] = creator_id
        db_obj = self.model(**obj_in_data)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    # def update(self, db: Session, *, _id: int, obj_in, modifier_id: int = 0):
    #     obj_in_data = obj_in if isinstance(obj_in, dict) else jsonable_encoder(obj_in)
    #     res = super().update(db, _id=_id, obj_in=obj_in_data, modifier_id=modifier_id)
    #     return res

    def search(self, db: Session, *, name: str = "", count_num: int = None,
               page: int = 1, page_size: int = 25) -> dict:
        filters = []
        if count_num is not None:
            filters.append(self.model.count_num == count_num)
        if name:
            filters.append(self.model.name.like(f"%{name}%"))
        records, total, _, _ = self.get_multi(db, page=page, page_size=page_size, filters=filters)
        return {'results': records, 'total': total}


class CURDHikerRule(CRUDBase):

    def init(self):
        self.query_columns.extend((self.model.dt2ts(self.model.auth_date_time, "auth_date_time_ts"),
                                   self.model.dt2ts(self.model.last_active, "last_active_ts"),
                                   HikerDeveloper.name.label('dev_name'),
                                   HikerRuleType.name.label('type_name'),
                                   ))
        # self.exclude_columns.extend((self.model.auth_date_time,self.model.last_active))  # 排除时间字段

    def get(self, db: Session, _id: int, to_dict: bool = True):
        """ 通过id获取 """
        # record = db.query(self.model).filter(self.model.id == _id, self.model.is_deleted == 0).first()
        # return record if not to_dict else {
        #     'id': record.id,
        #     'name': record.name,
        #     'type_id': record.type_id,
        #     'dev_id': record.dev_id,
        #     'value': record.value,
        #     'url': record.url,
        #     'state': record.state,
        #     'auth': record.auth,
        #     'auth_date_time': str(record.auth_date_time),
        #     'time_over': record.time_over,
        #     'b64_value': record.b64_value,
        #     'home_url': record.home_url,
        #     'pic_url': record.pic_url,
        #     'is_json': record.is_json,
        #     'is_redirect': record.is_redirect,
        #     'is_tap': record.is_tap,
        #     'can_discuss': record.can_discuss,
        #     'is_json_list': record.is_json_list,
        #     'data_type': record.data_type,
        #     'version': record.version,
        #     'author': record.author,
        #     'note': record.note,
        #     'good_num': record.good_num,
        #     'bad_num': record.bad_num,
        #     'reply_num': record.reply_num,
        #     'is_safe': record.is_safe,
        #     'is_good': record.is_good,
        #     'is_white': record.is_white,
        #     'not_safe_note': record.not_safe_note,
        #     'last_active': str(record.last_active),
        # }
        record = super().get(db, _id, to_dict)
        # if record.get('auth_date_time'):
        #     record['auth_date_time'] = str(record['auth_date_time'])
        #
        # if record.get('last_active'):
        #     record['last_active'] = str(record['last_active'])
        return record

    def create(self, db: Session, *, obj_in, creator_id: int = 0):
        obj_in_data = obj_in if isinstance(obj_in, dict) else jsonable_encoder(obj_in)
        if db.query(self.model).filter(self.model.name == obj_in_data['name'],
                                       self.model.is_deleted == 0).first():  # 如果已经有这个规则名称返回None
            return None
        obj_in_data['creator_id'] = creator_id
        db_obj = self.model(**obj_in_data)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    # def update(self, db: Session, *, _id: int, obj_in, modifier_id: int = 0):
    #     obj_in_data = obj_in if isinstance(obj_in, dict) else jsonable_encoder(obj_in)
    #     res = super().update(db, _id=_id, obj_in=obj_in_data, modifier_id=modifier_id)
    #     return res

    def search(self, db: Session, *, name: str = "", author: str = None, value: str = None, url: str = None,
               dev_id: int = None,
               page: int = 1, page_size: int = 25) -> dict:
        filters = []
        if author is not None:
            filters.append(self.model.author == author)
        if value is not None:
            filters.append(self.model.value == value)
        if url is not None:
            filters.append(self.model.url == url)
        if dev_id is not None:
            filters.append(self.model.dev_id == dev_id)
        if name:
            filters.append(self.model.name.like(f"%{name}%"))
        records, total, _, _ = self.get_multi(db, page=page, page_size=page_size, filters=filters)

        # 增加where条件: 连表查，否则会出现笛卡尔积现象
        filters.append(self.model.dev_id == HikerDeveloper.id)
        filters.append(self.model.type_id == HikerRuleType.id)
        # for record in records:
        #     if record.get('auth_date_time'):
        #         record['auth_date_time'] = str(record['auth_date_time'])
        #
        #     if record.get('last_active'):
        #         record['last_active'] = str(record['last_active'])

        return {'results': records, 'total': total}

    def get_multi(self, db: Session, *, queries: Optional[list] = None, filters: Optional[list] = None,
                  order_bys: Optional[list] = None, to_dict: bool = True, page: int = 1, page_size: int = 25
                  ) -> Tuple[List[ModelType], int, int, int]:
        # filters = (filters or []) + [self.model.dev_id == HikerDeveloper.id] + [self.model.type_id == HikerRuleType.id]
        return super().get_multi(db, queries=queries, filters=filters, order_bys=order_bys, to_dict=to_dict, page=page,
                                 page_size=page_size)


curd_hiker_rule_type = CURDHikerRuleType(HikerRuleType)
curd_hiker_rule = CURDHikerRule(HikerRule)
