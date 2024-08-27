#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : logininfor.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Author's Blog: https://blog.csdn.net/qq_32394351
# Date  : 2023/12/7


from db.base_class import Base
from db import fields


class LoginInfor(Base):
    """ 登录日志 """
    user_name = fields.Char(string='用户名称', required=True)
    ipaddr = fields.Char(string='登录地址')
    login_location = fields.Char(string='登录地点')
    browser = fields.Char(string='浏览器')
    os = fields.Char(string='操作系统')
    status = fields.Integer(string='登录状态', default='0')
    msg = fields.Char(string='操作信息')
    login_time = fields.Datetime(string='登录日期', default=fields.now())
