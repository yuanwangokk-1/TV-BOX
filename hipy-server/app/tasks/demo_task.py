#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : demo_task.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Author's Blog: https://blog.csdn.net/qq_32394351
# Date  : 2023/12/10

from core.logger import logger
from datetime import datetime


# 这里面的定时任务第一个参数恒定为task_id，后面不定长传参

def demo(task_id: str, *args, **kwargs):
    msg = f'----------------task_id:{task_id},args:{args},kwargs:{kwargs}----------------'
    print(msg)
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    logger.info(f"demo_task.py执行一次定时任务 {now} ......")
    return msg
