from datetime import datetime
from typing import Any, Dict, Generic, List, Optional, Type, TypeVar, Union, Tuple
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from sqlalchemy import func
from sqlalchemy.orm import Session, properties
from db.base_class import Base
from copy import deepcopy

ModelType = TypeVar("ModelType", bound=Base)
CreateSchemaType = TypeVar("CreateSchemaType", bound=BaseModel)
UpdateSchemaType = TypeVar("UpdateSchemaType", bound=BaseModel)

# START
""" 
    jsonable_encoder (类转字典) 的 custom_encoder 方法。有些数据类型通过jsonable_encoder后会转换成不符合需求的类型或报错。 (目前遇到这3个 后续遇到其他再添加)
eg: 
    # 遇到dict类型数据使用custom_encoder_dict_fn解析,即直接输出字典类型不然会报错。 遇到datetime类型使用custom_encoder_datetime2str_fn解析成符合mysql的字符串,不然会转成其他格式的字符串
    data = jsonable_encoder(obj_in, custom_encoder={dict: custom_encoder_dict_fn, datetime: custom_encoder_datetime2str_fn})   
"""
custom_encoder_dict_fn = lambda x: x
custom_encoder_datetime_fn = lambda x: x
custom_encoder_datetime2str_fn = lambda x: x.strftime("%Y-%m-%d %H:%M:%S")


# END


class CRUDBase(Generic[ModelType, CreateSchemaType, UpdateSchemaType]):

    def __init__(self, model: Type[ModelType]):
        self.model = model
        self.query_columns = self.model.listColumns()  # 取model中的有Column
        self.exclude_columns = [self.model.created_time, self.model.modified_time, self.model.is_deleted]
        self.query_columns.extend((self.model.dt2ts(self.model.created_time, "created_ts"),
                                   self.model.dt2ts(self.model.modified_time, "modified_ts")))
        self.init()
        for ex in self.exclude_columns:
            self.query_columns.remove(ex)

    def init(self):
        """
        继承后用作数据初始化处理
        :return:
        """
        pass

    def get(self, db: Session, _id: int, to_dict: bool = True) -> Optional[ModelType]:
        """ 通过id获取 """
        row = db.query(*self.query_columns).filter(self.model.id == _id, self.model.is_deleted == 0).first()
        return dict(row or {}) if to_dict else row
        # if to_dict:
        #     dict_data = dict(row or {})
        #     for key, value in dict_data.items():
        #         if isinstance(value, datetime):
        #             dict_data[key] = str(value)
        # else:
        #     dict_data = row
        # return dict_data

    def query(self, db: Session, *, queries: Optional[list] = None, filters: Optional[list] = None,
              order_bys: Optional[list] = None, to_dict: bool = True) -> List[ModelType]:
        """ 查询 """
        filters = (filters or []) + [self.model.is_deleted == 0]
        queries = queries or self.query_columns
        obj = db.query(*queries).filter(*filters)
        if order_bys:
            obj = obj.order_by(*order_bys)
        return [dict(i) for i in obj.all()] if to_dict else obj.all()

    def get_multi(self, db: Session, *, queries: Optional[list] = None, filters: Optional[list] = None,
                  order_bys: Optional[list] = None, to_dict: bool = True, page: int = 1, page_size: int = 25
                  ) -> Tuple[List[ModelType], int, int, int]:
        """
        分页查询
        :return (data, total, offset, limit)
        """
        filters = (filters or []) + [self.model.is_deleted == 0]
        queries = queries or self.query_columns
        obj = db.query(*queries).filter(*filters)
        if order_bys:
            obj = obj.order_by(*order_bys)
        temp_page = ((page if page > 0 else 1) - 1) * page_size
        total = db.query(func.count(self.model.id)).filter(*filters).scalar()
        if temp_page + page_size > total:  # 页数超出后显示最后一页， 不需要可以注释掉
            temp_page = total - (total % page_size)
        obj = obj.offset(temp_page).limit(page_size)
        return [dict(i) for i in obj.all()] if to_dict else obj.all(), total, temp_page, page_size

    def create(self, db: Session, *, obj_in: Union[CreateSchemaType, Dict[str, Any]], creator_id: int = 0) -> ModelType:
        """ 创建 """
        obj_in_data = jsonable_encoder(obj_in, custom_encoder={dict: custom_encoder_dict_fn})
        obj_in_data['creator_id'] = creator_id
        db_obj = self.model(**obj_in_data)  # type: ignore
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(self, db: Session, *, _id: int, obj_in: Union[UpdateSchemaType, Dict[str, Any]],
               modifier_id: int = 0) -> ModelType:
        """ 更新 """
        update_data = jsonable_encoder(obj_in, custom_encoder={dict: custom_encoder_dict_fn})
        update_data['modifier_id'] = modifier_id
        update_data = {getattr(self.model, k): v for k, v in update_data.items() if hasattr(self.model, k)}
        obj = db.query(self.model).filter(self.model.id == _id, self.model.is_deleted != 1).update(update_data)
        db.commit()
        return obj

    def setActive(self, db: Session, *, _id: int, active: bool, modifier_id: int = 0):
        """
        设置是否启用
        """
        update_data = {'active': active, 'modifier_id': modifier_id}
        obj = db.query(self.model).filter(self.model.id == _id).update(update_data)
        db.commit()
        return obj

    def setStatus(self, db: Session, *, _id: int, status: int, modifier_id: int = 0):
        """
        设置状态
        """
        update_data = {'status': status, 'modifier_id': modifier_id}
        obj = db.query(self.model).filter(self.model.id == _id).update(update_data)
        db.commit()
        return obj

    def delete(self, db: Session, *, _id: int, deleter_id: int = 0) -> ModelType:
        """ 逻辑删除 """
        update_data = {self.model.is_deleted: 1}
        if deleter_id:
            update_data[self.model.modifier_id] = deleter_id
        obj = db.query(self.model).filter(self.model.id == _id, self.model.is_deleted != 1).update(update_data)
        # db.delete(obj)
        db.commit()
        return obj

    def deletes(self, db: Session, *, _ids: List[int], deleter_id: int = 0) -> ModelType:
        """ 逻辑删除多个 """
        update_data = {self.model.is_deleted: 1}
        if deleter_id:
            update_data[self.model.modifier_id] = deleter_id
        obj = db.query(self.model).filter(self.model.id.in_(_ids), self.model.is_deleted != 1).update(update_data)
        # db.delete(obj)
        db.commit()
        return obj

    def remove(self, db: Session, *, _id: int) -> ModelType:
        """ 物理删除 """
        obj = db.query(self.model).filter(self.model.id == _id)
        # db.delete(obj) # 这个写法错误的
        db.delete(*obj)  # 这个写法可行
        # obj.delete()
        db.commit()
        return obj

    def removes(self, db: Session, *, _ids: List[int]) -> ModelType:
        """ 物理删除 """
        obj = db.query(self.model).filter(self.model.id.in_(_ids))

        # db.delete(obj) # 这个写法错误的
        # db.delete(*obj) # 这个写法可行
        obj.delete()
        db.commit()
        return obj

    def clear(self, db: Session) -> ModelType:
        """ 物理清空 """
        obj = db.query(self.model)
        obj.delete()
        db.commit()
        return obj

    def getMaxOrderNum(self, db: Session) -> int:
        data = db.query(func.max(self.model.order_num).label('max_order_num')).filter(
            self.model.is_deleted == 0).first()
        return data['max_order_num'] or 0
