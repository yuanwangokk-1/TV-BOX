#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : developer_schemas.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Author's Blog: https://blog.csdn.net/qq_32394351
# Date  : 2023/12/2

from typing import Union, List
from pydantic import BaseModel


class SearchDeveloperSchema(BaseModel):
    name: str
    qq: str
    status: int = 0

class DeveloperSchema(BaseModel):
    name: str
    qq: str
    password:str = '123456'
    is_manager:bool = False
    status: int = 0
    active: bool = True

class IsManagerSchema(BaseModel):
    is_manager: bool = False