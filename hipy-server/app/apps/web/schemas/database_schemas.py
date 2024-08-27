#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : database.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Author's Blog: https://blog.csdn.net/qq_32394351
# Date  : 2023/12/4

from pydantic import BaseModel


class updateSchema(BaseModel):
    auth_code: str