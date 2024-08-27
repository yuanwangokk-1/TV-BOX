#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : hiker_rule.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Author's Blog: https://blog.csdn.net/qq_32394351
# Date  : 2023/12/2

from sqlalchemy.orm import relationship, backref

from db.base_class import Base
from db import fields


class HikerRuleType(Base):
    """ 海阔规则类型 """
    name = fields.Char(string='分类名称', required=True)
    count_num = fields.Integer(string='数目')
    active = fields.Boolean(string='是否启用', default=True)

class HikerRule(Base):
    """ 海阔规则 """
    name = fields.Char(string='规则名称')
    type_id = fields.Many2one('hiker_rule_type', string='规则类型', ondelete='cascade')
    dev_id = fields.Many2one('hiker_developer', string='开发者')
    value = fields.Text(string='规则Json')
    url = fields.Char(string='地址')
    state = fields.Integer(string='状态', default=0)
    auth = fields.Char(string='私有密码')
    auth_date_time = fields.Datetime(string='私有密码过期时间', default=fields.now())
    time_over = fields.Boolean(string='私有规则过期', default=False)
    b64_value = fields.Text(string='64编码')
    home_url = fields.Char(string='规则主页链接')
    pic_url = fields.Char(string='网站图标链接')
    is_json = fields.Boolean(string='是否json值', default=True)
    is_redirect = fields.Boolean(string='是否为后端重定向', default=False)
    is_tap = fields.Boolean(string='是否为仓库跳转规则', default=False)
    can_discuss = fields.Boolean(string='是否可以互动', default=True)
    is_json_list = fields.Boolean(string='是否json列表', default=False)

    data_type = fields.Char(string='数据类型', default='home_rule_url')
    version = fields.Char(string='版本号', default='0')
    author = fields.Char(string='作者')
    note = fields.Text('说明')
    good_num = fields.Integer(string='点赞数')
    bad_num = fields.Integer(string='踩数')
    reply_num = fields.Integer(string='回复数')
    is_safe = fields.Boolean(string='是否安全', default=True)
    is_good = fields.Boolean(string='是否优质', default=False)
    is_white = fields.Boolean(string='是否白名单', default=False)
    not_safe_note = fields.Text(string='风险描述')
    last_active = fields.Datetime(string='开发者上次提交时间', default=fields.now())
