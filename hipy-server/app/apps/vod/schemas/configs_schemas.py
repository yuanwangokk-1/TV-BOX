#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : configs_schemas.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Author's Blog: https://blog.csdn.net/qq_32394351
# Date  : 2024/1/25

from typing import Union, List, Optional
from pydantic import BaseModel, AnyHttpUrl, conint


class VodConfigsSchema(BaseModel):
    name: str
    key: str
    value: str
    remark: Optional[str] = None
    value_type: Optional[str] = None
    status: int = 1
    order_num: int = 1
