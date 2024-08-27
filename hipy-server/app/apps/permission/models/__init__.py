from db.base_class import Base
from db.session import engine
from .menu import Menus
from .role import Roles, RoleMenu
from .user import Users, UserRole
from .perm_label import PermLabel, PermLabelRole


__all__ = ['Menus', 'Roles', 'RoleMenu', 'Users', 'UserRole', 'PermLabel', 'PermLabelRole']


Base.metadata.create_all(engine)