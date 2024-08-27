from sqlalchemy import distinct, desc, asc, func
from sqlalchemy.orm import Session
from apps.permission.models.menu import Menus
from apps.permission.models.role import RoleMenu, Roles
from apps.permission.models.user import Users, UserRole
from apps.system.models import ConfigSettings
from common.curd_base import CRUDBase
from common.security import verify_password, get_password_hash
from fastapi.encoders import jsonable_encoder


class CURDUser(CRUDBase):
    def getByUsername(self, db: Session, *, username: str):
        """
        通过用户名获取用户
        """
        return db.query(Users).filter(Users.username == username).first()

    def isExistUserName(self, db: Session, *, _id: int, username: str):
        """
        获取是否存在某用户名的用户，且id不是当前记录
        @param db:
        @param _id:
        @param username:
        @return:
        """
        records = db.query(self.model).filter(self.model.id != _id, self.model.username == username).all()
        return len(records) > 0

    def getByEmail(self, db: Session, *, email: str):
        """
        通过email获取用户
        """
        return db.query(Users).filter(Users.email == email).first()

    def getByPhone(self, db: Session, *, phone: str):
        """
        通过手机号获取用户
        """
        return db.query(Users).filter(Users.phone == phone).first()

    def authenticate(self, db: Session, *, user: str, password: str):
        if user.find("@") > 0:
            u = self.getByEmail(db, email=user)
        # elif user.startswith('1') and user.isdigit():
        #     u = self.getByPhone(db, phone=user)
        else:
            u = self.getByUsername(db, username=user)
        if not u:
            return None
        if not verify_password(password, u.hashed_password):
            return None
        return u

    def checkUsernameAvailability(self, db: Session, *, username: str, exclude_id: int = None):
        obj = db.query(func.count(self.model.id).label('count')).filter(
            self.model.is_deleted == 0, self.model.username == username)
        if exclude_id:
            obj.filter(self.model.id != exclude_id)
        return obj.scalar() == 0

    def checkEmailAvailability(self, db: Session, *, email: str, exclude_id: int = None):
        obj = db.query(func.count(self.model.id).label('count')).filter(
            self.model.is_deleted == 0, self.model.email == email)
        if exclude_id:
            obj.filter(self.model.id != exclude_id)
        return obj.scalar() == 0

    def checkPhoneAvailability(self, db: Session, *, phone: str, exclude_id: int = None):
        obj = db.query(func.count(self.model.id).label('count')).filter(
            self.model.is_deleted == 0, self.model.phone == phone)
        if exclude_id:
            obj.filter(self.model.id != exclude_id)
        return obj.scalar() == 0

    def create(self, db: Session, *, obj_in, creator_id: int = 0):
        obj_in_data = jsonable_encoder(obj_in)
        obj_in_data['hashed_password'] = get_password_hash(obj_in_data['password'])
        del obj_in_data['password']
        init_roles = db.query(ConfigSettings.value).filter(
            ConfigSettings.key == 'user_init_roles', ConfigSettings.is_deleted == 0, ConfigSettings.status == 0
        ).first()
        if init_roles:
            init_roles_key = init_roles.value.split(',')
            obj_in_data['user_role'] = db.query(Roles).filter(
                Roles.key.in_(init_roles_key), Roles.is_deleted == 0).all()
        return super().create(db, obj_in=obj_in_data, creator_id=creator_id)

    def getRoles(self, db: Session, _id: int):
        return db.query(Users).filter(Users.id == _id).first().user_role

    def getMenus(self, db: Session, _id: int = None):
        menu_id_in = [menu['id'] for menu in db
        .query(distinct(RoleMenu.menu_id).label('id'))
        .join(Roles, Roles.id == RoleMenu.role_id)
        .join(UserRole, Roles.id == UserRole.role_id)
        .filter(UserRole.user_id == _id, Roles.is_deleted == 0, RoleMenu.is_deleted == 0)
        .all()] if _id is not None else None
        q = db.query(
            Menus.id, Menus.path, Menus.name, Menus.icon, Menus.parent_id, Menus.is_frame, Menus.title,
            Menus.no_cache, Menus.component, Menus.hidden
        ).filter(Menus.is_deleted == 0, Menus.status == 0)
        if menu_id_in:
            q = q.filter(Menus.id.in_(menu_id_in))

        res = q.order_by(asc(Menus.order_num)).all()
        return [{
            'id': i['id'],
            'parent_id': i['parent_id'],
            'path': i['path'],
            'component': i['component'],
            'is_frame': i['is_frame'],
            'hidden': i['hidden'],
            'name': i['name'],
            'meta': {
                'title': i['title'],
                'icon': i['icon'],
                'no_cache': i['no_cache'],
            }
        } for i in res]

    def getMenusTree(self, db: Session, _id: int = None):
        menu_id_in = [menu['id'] for menu in db
        .query(distinct(RoleMenu.menu_id).label('id'))
        .join(Roles, Roles.id == RoleMenu.role_id)
        .join(UserRole, Roles.id == UserRole.role_id)
        .filter(UserRole.user_id == _id, Roles.is_deleted == 0, RoleMenu.is_deleted == 0)
        .all()] if _id is not None else None

        def __get_children_menus(menu_id: int = 0):
            q = db.query(
                Menus.id, Menus.path, Menus.name, Menus.icon, Menus.parent_id, Menus.is_frame, Menus.title,
                Menus.no_cache, Menus.component, Menus.hidden
            ).filter(
                Menus.is_deleted == 0, Menus.parent_id == menu_id, Menus.id.in_(menu_id_in), Menus.status == 0
            )
            if menu_id_in:
                q = q.filter(Menus.id.in_(menu_id_in))
            children = q.order_by(asc(Menus.order_num)).all()
            result = []
            for child in children:
                result.append({
                    'path': child['path'],
                    'component': child['component'],
                    'is_frame': child['is_frame'],
                    'hidden': child['hidden'],
                    'name': child['name'],
                    'meta': {
                        'title': child['title'],
                        'icon': child['icon'],
                        'no_cache': child['no_cache'],
                    },
                    'children': __get_children_menus(child['id'])
                })
            return result

        return __get_children_menus()

    def setAvatar(self, db: Session, _id: int, avatar_path: str, modifier_id: int = 0):
        update_data = {self.model.avatar: avatar_path}
        if modifier_id:
            update_data['modifier_id'] = modifier_id
        db.query(self.model).filter(self.model.id == _id, self.model.is_deleted == 0).update(update_data)
        db.commit()

    def checkPwd(self, db: Session, _id: int, *, pwd: str) -> bool:
        u = db.query(self.model.hashed_password).filter(self.model.id == _id, self.model.is_deleted == 0).first()
        return u and verify_password(pwd, u['hashed_password'])

    def changePwd(self, db: Session, _id: int, *, pwd: str):
        update_data = {self.model.hashed_password: get_password_hash(pwd)}
        db.query(self.model).filter(self.model.id == _id, self.model.is_deleted == 0).update(update_data)
        db.commit()


curd_user = CURDUser(Users)
