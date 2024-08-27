#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : timer.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Author's Blog: https://blog.csdn.net/qq_32394351
# Date  : 2023/12/10

from apscheduler.schedulers.asyncio import AsyncIOScheduler
from core.logger import logger


def demo():
    logger.info("timer.py执行一次定时任务......")


scheduler = AsyncIOScheduler()
scheduler.add_job(func=demo, trigger='interval', seconds=30)
