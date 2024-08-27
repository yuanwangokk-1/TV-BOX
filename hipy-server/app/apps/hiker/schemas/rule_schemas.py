#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : rule_schemas.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Authors Blog: https://blog.csdn.net/qq_32394351
# Date  : 2023/12/3

from pydantic import BaseModel
from typing import List, Optional


class RuleTypeSchema(BaseModel):
    name: str
    count_num: int = 0
    active: bool = True


class RuleSchema(BaseModel):
    name: str
    type_id: Optional[int] = None
    dev_id: Optional[int] = None
    value: str = ''
    url: str = 'hiker://empty#'
    state: int = 0
    auth: str = ''
    auth_date_time: Optional[str] = None
    time_over: bool = False
    b64_value: str = ''
    home_url: str = ''
    pic_url: str = ''
    is_json: bool = True
    is_redirect: bool = False
    is_tap: bool = False
    can_discuss: bool = True
    is_json_list: bool = False
    data_type: str = 'home_rule_url'
    version: str = ''
    author: str = ''
    note: str = ''
    good_num: int = 0
    bad_num: int = 0
    reply_num: int = 0
    is_safe: bool = True
    is_good: bool = False
    is_white: bool = False
    not_safe_note: str = ''
    last_active: Optional[str] = None
