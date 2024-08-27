from typing import Optional, Tuple, List

from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session
from sqlalchemy import asc, desc, func
from common.curd_base import CRUDBase
from ..models.menu import Menus


class CURDMenu(CRUDBase):
    def queryMenus(self, db: Session, status: int = None, title: str = None):
        queries = [self.model.id, self.model.title, self.model.icon, self.model.parent_id,
                   self.model.order_num, self.model.status, self.model.component,
                   self.model.dt2ts(self.model.created_time, "created_ts"),
                   self.model.dt2ts(self.model.modified_time, "modified_ts")]
        filters = []
        if title:
            filters.append(Menus.title.like(f"%{title}%"))
        if status is not None:
            filters.append(Menus.status == status)
        res = self.query(db, queries=queries, filters=filters, order_bys=[asc(Menus.order_num)])
        return res

    def getSimpleList(self, db: Session, *, status_in: List[int] = None, to_dict: bool = True) -> list:
        status_in = status_in or (0,)
        obj = db.query(self.model.id, self.model.title, self.model.parent_id).filter(
            self.model.is_deleted == 0, self.model.status.in_(status_in)).order_by(asc(self.model.order_num))
        return [dict(i) for i in obj.all()] if to_dict else obj.all()

    def getSimpleTree(self, db: Session, *, status_in: List[int] = None) -> List[dict]:
        status_in = status_in or (0,)

        def __get_children(parent_id: int = 0) -> List[dict]:
            filters = (self.model.parent_id == parent_id, self.model.is_deleted == 0, self.model.status.in_(status_in))
            res = db.query(self.model.id, self.model.title).filter(*filters).order_by(asc(self.model.order_num)).all()
            return [{'id': i['id'], 'title': i['title'], 'children': __get_children(i['id'])} for i in res]
        return __get_children()

    def get_max_order_num(self, db: Session, parent_id: int = None) -> int:
        filter = (self.model.is_deleted == 0,) if parent_id is None else (self.model.parent_id == parent_id,
                                                                          self.model.is_deleted == 0)
        data = db.query(func.max(self.model.order_num).label('max_order_num')).filter(*filter).first()
        return data['max_order_num'] or 0


curd_menu = CURDMenu(Menus)