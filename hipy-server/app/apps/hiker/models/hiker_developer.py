#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : hiker_developer.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Author's Blog: https://blog.csdn.net/qq_32394351
# Date  : 2023/12/2

# from sqlalchemy import Boolean, Column, Integer, String, ForeignKey, Date
from sqlalchemy.orm import relationship, backref

from db.base_class import Base
from db import fields


class HikerDeveloper(Base):
    """ 海阔开发者 """
    # name = Column(String(256), server_default='', comment='开发者账号')
    # qq = Column(String(11), server_default='', comment='QQ号')
    # password = Column(String(256), server_default='', default='123456', comment="开发者密码")
    # is_manager = Column(Boolean, server_default='0', default=False, comment="是否超管")
    # status = Column(Integer, server_default='0', default=0, comment='状态')
    # active = Column(Boolean, server_default='1', default=True, comment="是否启用")

    name = fields.Char(string='开发者账号', length=256, required=True)
    qq = fields.Char(string='QQ号', length=11, required=True)
    password = fields.Char(string='开发者密码', length=256, default='123456', required=True)
    status = fields.Integer(string='状态', default='0')
    is_manager = fields.Boolean(string='是否超管', default=False)
    active = fields.Boolean(string='是否启用', default=True)
    test = fields.Char(string='测试字段', length=10)
