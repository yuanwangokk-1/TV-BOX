#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : utils.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Date  : 2024/1/10

from core.logger import logger
from apps.vod.gen_vod import Vod


def t4_spider_init(vod, ext=''):
    """
    t4初始化爬虫
    @param vod: 实例化后的源对象
    @param ext: 传入的ext
    @return: 返回自身。可以不用
    """
    vod.setExtendInfo(ext)
    depends = vod.getDependence()
    modules = []
    module_names = []
    for lib in depends:
        try:
            module = Vod(api=lib, query_params={}).module
            modules.append(module)
            module_names.append(lib)
        except Exception as e:
            logger.info(f'装载依赖{lib}发生错误:{e}')
            # return respErrorJson(error_code.ERROR_INTERNAL.set_msg(f"内部服务器错误:{e}"))

    if len(module_names) > 0:
        logger.info(f'当前依赖列表:{module_names}')

    vod.init(modules)
    return vod
