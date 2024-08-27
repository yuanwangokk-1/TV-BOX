from sqlalchemy import Boolean, Column, Integer, String, ForeignKey, Date
from sqlalchemy.orm import relationship, backref

from db.base_class import Base


class Menus(Base):
    """ 菜单表 """
    path = Column(String(128), default='', server_default="", comment="路由")
    component = Column(String(128), default="", server_default="", comment="组件")
    is_frame = Column(Boolean, default=False, server_default='0', comment="是否外链")
    hidden = Column(Boolean(), default=False, server_default='0', comment="是否隐藏")
    status = Column(Integer, default=0, server_default='0', comment="菜单状态")   # 0: 正常   1 停用
    order_num = Column(Integer, default=0, server_default='0', comment="显示排序")
    # meta
    name = Column(String(32), default="", server_default="", comment="唯一标识用于页面缓存，否则keep-alive会出问题")  # index组件的name
    title = Column(String(32), default="", server_default="", comment="标题")
    icon = Column(String(32), default="", server_default="", comment="图标")
    no_cache = Column(Boolean, default=False, server_default="0", comment="是否缓存")
    parent_id = Column(Integer, default=0, server_default="0", comment="上级菜单")  # 0代表上级菜单就是根目录
