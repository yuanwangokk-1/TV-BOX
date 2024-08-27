#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : vod_configs.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Author's Blog: https://blog.csdn.net/qq_32394351
# Date  : 2024/1/25


from db.base_class import Base
from db import fields


class VodConfigs(Base):
    """ hipy参数配置 列表 """
    name = fields.Char(string='参数名称', required=True)
    key = fields.Char(string='参数键', index=False, required=True)
    value = fields.Text(string='参数值')
    value_type = fields.Char(string='值类型')
    remark = fields.Char(string='备注')
    status = fields.Integer(string='参数状态')
    order_num = fields.Integer(string='显示排序')
