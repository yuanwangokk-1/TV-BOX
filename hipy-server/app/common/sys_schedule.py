#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : sys_schedule.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Author's Blog: https://blog.csdn.net/qq_32394351
# Date  : 2023/12/10
from apscheduler.executors.pool import ProcessPoolExecutor
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.jobstores.sqlalchemy import SQLAlchemyJobStore
from core.config import settings


class ScheduleCli(object):
    _instance = None

    def __new__(cls, *args, **kw):
        if cls._instance is None:
            cls._instance = object.__new__(cls, *args, **kw)
        return cls._instance

    def __init__(self):
        # 对象 在 @app.on_event("startup") 中初始化
        self._schedule = None

    def init_scheduler(self) -> None:
        """
        初始化 apscheduler
        :return:
        """
        interval_task = {
            # 配置存储器 |不配置了，手写一个job表
            # "jobstores": {
            #     'default': SQLAlchemyJobStore(url=settings.getSqlalchemyURL())
            # },
            # 配置执行器
            "executors": {
                # 使用进程池进行调度，最大进程数是10个
                'default': ProcessPoolExecutor(10)
            },
            # 创建job时的默认参数
            "job_defaults": {
                'coalesce': False,  # 是否合并执行
                'max_instances': 3,  # 最大实例数
            }

        }
        # job_stores = {'default': SQLAlchemyJobStore(url=settings.getSqlalchemyURL())}
        # self._schedule = AsyncIOScheduler(jobstores=job_stores)

        self._schedule = AsyncIOScheduler(**interval_task)
        self._schedule.start()

    # 使实例化后的对象 赋予apscheduler对象的方法和属性
    def __getattr__(self, name):
        return getattr(self._schedule, name)

    def __getitem__(self, name):
        return self._schedule[name]

    def __setitem__(self, name, value):
        self._schedule[name] = value

    def __delitem__(self, name):
        del self._schedule[name]


# 创建schedule对象
scheduler: AsyncIOScheduler = ScheduleCli()  # noqa

# 只允许导出 scheduler 实例化对象
__all__ = ["scheduler"]
