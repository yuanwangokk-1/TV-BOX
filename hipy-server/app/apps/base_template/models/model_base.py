from sqlalchemy import Boolean, Column, Integer, String, ForeignKey, Date
from sqlalchemy.orm import relationship

from db.base_class import Base


class BaseTemplate(Base):
    """ 模型模板 """
    __tablename__ = "base_tb"
