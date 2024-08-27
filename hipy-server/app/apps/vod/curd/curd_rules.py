#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : curd_rules.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Author's Blog: https://blog.csdn.net/qq_32394351
# Date  : 2024/1/14

from sqlalchemy.orm import Session
from common.curd_base import CRUDBase
from ..models.vod_rules import VodRules
from typing import Optional, List
from sqlalchemy import asc, desc, func


class CURDVodRules(CRUDBase):

    def create(self, db: Session, *, obj_in, creator_id: int = 0):
        return super().create(db, obj_in=obj_in, creator_id=creator_id)

    def getByName(self, db: Session, name: str, file_type: str, group: str):
        record = db.query(self.model).filter(self.model.name == name, self.model.file_type == file_type,
                                             self.model.group == group).first()
        return record

    def get_max_order_num(self, db: Session) -> int:
        filter = (self.model.is_deleted == 0, self.model.order_num != 9999)
        data = db.query(func.max(self.model.order_num).label('max_order_num')).filter(*filter).first()
        return data['max_order_num'] or 0

    def get_path_by_ids(self, db: Session, *, _ids: List[int]):
        records = db.query(self.model).filter(self.model.id.in_(_ids)).all()
        paths = [record.path for record in records]
        return paths

    def set_exist_by_ids(self, db: Session, *, _ids: List[int]):
        records = db.query(self.model).filter(self.model.id.notin_(_ids))
        records.update({'is_exist': False})
        db.commit()
        return records.all()

    def search(self, db: Session, *,
               status: int = None,
               name: str = None,
               group: str = None,
               file_type: str = None,
               order_bys: Optional[list] = None,
               page: int = 1, page_size: int = 20) -> dict:
        filters = []
        if status is not None:
            filters.append(self.model.status == status)
        if name:
            filters.append(self.model.name.ilike(f"%{name}%"))
        if group:
            filters.append(self.model.group == group)
        if file_type:
            filters.append(self.model.file_type == file_type)
        records, total, _, _ = self.get_multi(db, page=page, page_size=page_size, filters=filters, order_bys=order_bys)

        return {'results': records, 'total': total}


curd_vod_rules = CURDVodRules(VodRules)
