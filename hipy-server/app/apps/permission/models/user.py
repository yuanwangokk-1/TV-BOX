from sqlalchemy import Boolean, Column, Integer, String, ForeignKey, Date
from sqlalchemy.orm import relationship
from core.config import settings

from db.base_class import Base


class Users(Base):
    """用户表"""
    username = Column(String(32), unique=True, index=True, nullable=False, comment="用户名")
    nickname = Column(String(32), default='', server_default="", comment="姓名")
    sex = Column(Integer, default=0, server_default='0', comment="性别")  # 0: 未知， 1: 男， 2: 女
    phone = Column(String(32), nullable=False, comment="手机号")
    email = Column(String(256), nullable=False, comment="邮箱")
    hashed_password = Column(String(128), nullable=False, comment="密码")
    avatar = Column(String(128), default="", server_default="", comment="头像")
    status = Column(Integer, default=0, server_default='0', nullable=False, comment="状态")  # 0: 正常  1: 停用
    is_active = Column(Boolean(), default=False, server_default='0', comment="是否已经验证用户")
    is_superuser = Column(Boolean(), default=False, server_default='0', comment="是否超级管理员")

    user_role = relationship("Roles", secondary=f"{settings.SQL_TABLE_PREFIX}user_role", backref="user")


class UserRole(Base):
    """用户-权限组-中间表"""
    user_id = Column(Integer, ForeignKey(f"{settings.SQL_TABLE_PREFIX}users.id", ondelete='CASCADE'))
    role_id = Column(Integer, ForeignKey(f"{settings.SQL_TABLE_PREFIX}roles.id"))
