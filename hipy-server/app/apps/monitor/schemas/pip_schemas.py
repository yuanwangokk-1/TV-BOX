#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : pip_schemas.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Author's Blog: https://blog.csdn.net/qq_32394351
# Date  : 2023/12/13

from pydantic import BaseModel


class PipSchema(BaseModel):
    version: str = ''
    name: str
