#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : curd_hiker_developer.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Author's Blog: https://blog.csdn.net/qq_32394351
# Date  : 2023/12/2

import json
from datetime import timedelta
from typing import Optional, Tuple, List
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session
from sqlalchemy import asc, desc, func, distinct
from common.curd_base import CRUDBase
from ..models.hiker_developer import HikerDeveloper


class CURDHikerDeveloper(CRUDBase):

    # def get(self, db: Session, _id: int, to_dict: bool = True):
    #     """ 通过id获取 """
    #     record = db.query(self.model).filter(self.model.id == _id, self.model.is_deleted == 0).first()
    #     return record if not to_dict else {
    #         'id': record.id,
    #         'name': record.name,
    #         'password': record.password,
    #         'qq': record.qq,
    #         'status': record.status,
    #         'is_manager': record.is_manager,
    #         'active': record.active,
    #     }

    def create(self, db: Session, *, obj_in, creator_id: int = 0):
        obj_in_data = obj_in if isinstance(obj_in, dict) else jsonable_encoder(obj_in)
        if db.query(self.model).filter(self.model.qq == obj_in_data['qq'],
                                       self.model.is_deleted == 0).first():  # 如果已经有这个开发者qq返回None
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

    def search(self, db: Session, *, name: str = "", qq: str = "", status: int = None,
               page: int = 1, page_size: int = 25) -> dict:
        filters = []
        if status is not None:
            filters.append(self.model.status == status)
        if name:
            filters.append(self.model.name.like(f"%{name}%"))
        if qq:
            filters.append(self.model.qq.like(f"%{qq}%"))
        records, total, _, _ = self.get_multi(db, page=page, page_size=page_size, filters=filters)
        return {'results': records, 'total': total}

    def setIsManager(self, db: Session, *, _id: int, is_manager: bool, modifier_id: int = 0):
        return super().update(db, _id=_id, obj_in={'is_manager': is_manager}, modifier_id=modifier_id)



curd_hiker_developer = CURDHikerDeveloper(HikerDeveloper)