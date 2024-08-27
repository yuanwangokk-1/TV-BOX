#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : rules.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Author's Blog: https://blog.csdn.net/qq_32394351
# Date  : 2024/1/14


from db.base_class import Base
from db import fields


class VodRules(Base):
    """ 源/规则 列表 """
    name = fields.Char(string='源名称', required=True)
    group = fields.Char(string='源分组')
    path = fields.Char(string='文件路径')
    is_exist = fields.Boolean(string='是否存在', default=True)
    # is_show = fields.Char(string='是否显示')
    order_num = fields.Integer(string='显示排序')
    file_type = fields.Char(string='文件类型')
    ext = fields.Text(string='ext扩展')
    status = fields.Integer(string='源状态')
    searchable = fields.Integer(string='可搜索')
    filterable = fields.Integer(string='可筛选')
    quickSearch = fields.Integer(string='可快速搜索')
    active = fields.Boolean(string='是否显示', default=True)
