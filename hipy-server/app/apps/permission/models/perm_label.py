from sqlalchemy import Boolean, Column, Integer, String, ForeignKey, Date
from sqlalchemy.orm import relationship, backref

from core.config import settings
from db.base_class import Base


class PermLabel(Base):
    """ 权限标签 """
    label = Column(String(128), server_default='', comment='标签')
    remark = Column(String(256), server_default='', default='', comment="备注")
    status = Column(Integer, server_default='0', default=0, comment='状态')

    label_role = relationship("Roles", secondary=f"{settings.SQL_TABLE_PREFIX}perm_label_role", backref="perm_label")


class PermLabelRole(Base):
    """用户-权限组-中间表"""
    label_id = Column(Integer, ForeignKey(f"{settings.SQL_TABLE_PREFIX}perm_label.id", ondelete='CASCADE'))
    role_id = Column(Integer, ForeignKey(f"{settings.SQL_TABLE_PREFIX}roles.id"))