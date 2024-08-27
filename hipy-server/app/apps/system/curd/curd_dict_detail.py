from sqlalchemy.orm import Session
from sqlalchemy.sql import func
from common.curd_base import CRUDBase
from ..models.dictionaries import DictDetails, DictData


class CURDDictDetail(CRUDBase):
    def get(self, db: Session, _id: int, to_dict: bool = True):
        """ 通过id获取 """
        row = db.query(*self.query_columns, DictData.dict_name, DictData.dict_type).outerjoin(
            # outerjoin() == LEFT JOIN， join() == INNER JOIN， 不支持 RIGHT JOIN (可以考虑表顺序实现)
            DictData).filter(self.model.id == _id, self.model.is_deleted == 0).first()
        return dict(row or {}) if to_dict else row

    def get_max_order_num(self, db: Session, *, dict_data_id: int) -> int:
        res = db.query(func.max(DictDetails.order_num).label('max_order_num')).filter(
            DictDetails.dict_data_id == dict_data_id, DictDetails.is_deleted == 0
        ).first()
        return res['max_order_num'] or 0


curd_dict_detail = CURDDictDetail(DictDetails)
