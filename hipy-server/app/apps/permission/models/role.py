from email.policy import default
from xml.etree.ElementTree import Comment
from sqlalchemy import Boolean, Column, Integer, String, ForeignKey, Date
from sqlalchemy.orm import relationship
from core.config import settings

from db.base_class import Base


class Roles(Base):
    """角色"""
    key = Column(String(64), unique=True, index=True, nullable=False, comment="权限标识")
    name = Column(String(256), default="", server_default="", comment="权限名称")
    order_num = Column(Integer, default=0, server_default="0", comment="顺序")
    status = Column(Integer, default=0, server_default="0", comment="状态(0: 正常, 1: 停用)") 
    
    role_menu = relationship("Menus", backref="role", secondary=f"{settings.SQL_TABLE_PREFIX}role_menu")


class RoleMenu(Base):
    """角色-菜单-中间表"""
    role_id = Column(Integer, ForeignKey(f"{settings.SQL_TABLE_PREFIX}roles.id", ondelete='CASCADE'))
    menu_id = Column(Integer, ForeignKey(f"{settings.SQL_TABLE_PREFIX}menus.id"))
