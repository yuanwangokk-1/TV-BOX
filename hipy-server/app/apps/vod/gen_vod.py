#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : gen_vod.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Author's Blog: https://blog.csdn.net/qq_32394351
# Date  : 2024/1/7

import importlib


class Vod:
    def __init__(self, api, query_params, t4_api=None):
        self.api = api
        self.module_url = "t4.spiders." + api
        self.module = self.import_module(self.module_url).Spider(query_params=query_params, t4_api=t4_api)

    def import_module(self, module_url):
        return importlib.import_module(module_url)
