from typing import List

from fastapi.encoders import jsonable_encoder
from sqlalchemy import func
from sqlalchemy.orm import Session

from common.curd_base import CRUDBase, CreateSchemaType
from ..models.role import Roles, RoleMenu
from ..models.menu import Menus


class CURDRole(CRUDBase):

    def create(self, db: Session, *, obj_in: CreateSchemaType, creator_id: int = 0):
        menus = db.query(Menus).filter(Menus.id.in_(obj_in.menus)).all()
        obj_in_data = obj_in if isinstance(obj_in, dict) else jsonable_encoder(obj_in)
        del obj_in_data['menus']
        obj_in_data['creator_id'] = creator_id
        obj = self.model(**obj_in_data)   # type: Roles
        obj.role_menu = menus
        db.add(obj)
        db.commit()
        db.refresh(obj)
        return obj

    def get(self, db: Session, _id: int, to_dict: bool = True):
        role = db.query(self.model).filter(self.model.id == _id, self.model.is_deleted == 0).first()
        return role if not to_dict else {
            'id': role.id,
            'key': role.key,
            'name': role.name,
            'order_num': role.order_num,
            'status': role.status,
            'menus': [{'id': i.id} for i in role.role_menu]
        }

    def search(self, db: Session, *, key: str = "", name: str = "", status: int = None,
               page: int = 1, page_size: int = 25) -> dict:
        filters = []
        if status is not None:
            filters.append(self.model.status == status)
        if name:
            filters.append(self.model.name.like(f"%{name}%"))
        if key:
            filters.append(self.model.key.like(f"%{key}%"))
        user_data, total, _, _ = self.get_multi(db, page=page, page_size=page_size, filters=filters)
        return {'results': user_data, 'total': total}

    def setRoleMenu(self, db: Session, role_id: int, menu_ids: List[int], *, ctl_id: int = 0):
        db.query(RoleMenu).filter(RoleMenu.role_id == role_id).delete()
        db_objs = [RoleMenu(creator_id=ctl_id, role_id=role_id, menu_id=i) for i in menu_ids]
        db.add_all(db_objs)
        db.commit()

    def getSelectList(self, db: Session, status_in: List[int] = None):
        status_in = status_in or (0, )
        return self.query(db, queries=[self.model.id, self.model.key, self.model.name],
                          filters=[self.model.status.in_(status_in)], order_bys=[self.model.order_num])

    # def setRolePremLabel(self, db: Session, *, role_id: int, perm_labels_ids: List[int], ctl_id: int = 0):
    #     db.query(RolePermLabel).filter(RolePermLabel.role_id == role_id).delete()
    #     db_objs = [RolePermLabel(creator_id=ctl_id, role_id=role_id, perm_label_id=i) for i in perm_labels_ids]
    #     db.add_all(db_objs)
    #     db.commit()


curd_role = CURDRole(Roles)