from sqlalchemy import Boolean, Column, Integer, String, ForeignKey, Date, asc, desc
from sqlalchemy.orm import relationship
from core.config import settings
from db.base_class import Base


class DictDetails(Base):
    """ 字典值表 """
    dict_label = Column(String(128), nullable=False, comment="字典标签")
    dict_disabled = Column(Boolean, nullable=False,default=False, server_default="0", comment="是否禁用")
    dict_value = Column(String(128), nullable=False, comment="字典键值")
    remark = Column(String(256), default="", server_default="", comment="备注")
    is_default = Column(Boolean, nullable=False, default=False, server_default="0", comment="是否默认值")
    status = Column(Integer, default=0, server_default='0', comment="状态 0: 正常  1:停用")
    order_num = Column(Integer, default=0, server_default='0', comment="排序")
    # FK dict_data
    dict_data_id = Column(Integer, ForeignKey(f'{settings.SQL_TABLE_PREFIX}dict_data.id', ondelete="CASCADE"))
    dict_data = relationship("DictData", back_populates='dict_detail')


class DictData(Base):
    """ 字典表 """
    dict_type = Column(String(64), unique=True, index=True, nullable=False, comment="字典类型")
    dict_name = Column(String(64), default="", server_default="", comment="字典名称")
    remark = Column(String(256), default="", server_default="", comment="备注")
    status = Column(Integer, default=0, server_default='0', comment="状态 0: 正常  1:停用")
    order_num = Column(Integer, default=0, server_default='0', comment="排序")
    # one to many
    dict_detail = relationship("DictDetails", back_populates="dict_data", lazy='dynamic', order_by=asc(DictDetails.order_num))
