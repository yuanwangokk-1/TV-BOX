from sqlalchemy import Boolean, Column, Integer, String, ForeignKey, Date
from sqlalchemy.orm import relationship

from db.base_class import Base


class ConfigSettings(Base):
    """ 配置参数 """
    name = Column(String(64), unique=True, index=True, nullable=False, default="", server_default="", comment="参数名称")
    key = Column(String(128), nullable=False, comment="参数键名")
    value = Column(String(128), nullable=False, comment="参数键值")
    remark = Column(String(256), default="", server_default="", comment="备注")
    status = Column(Integer, default=0, server_default='0', comment="状态 0: 正常  1:停用")
    order_num = Column(Integer, default=0, server_default='0', comment="排序")
