#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : rules_schemas.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Author's Blog: https://blog.csdn.net/qq_32394351
# Date  : 2024/1/16

from typing import List, Optional
from pydantic import BaseModel, Field, ValidationError, validator


class RulesSchema(BaseModel):
    status: int = 1
    searchable: int = 0
    filterable: int = 0
    quickSearch: int = 0
    active: bool = True
    ext: Optional[str] = None
    order_num: int = 1


class RulesContentSchema(BaseModel):
    content: str = ''
