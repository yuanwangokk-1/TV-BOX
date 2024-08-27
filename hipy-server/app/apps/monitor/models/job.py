#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : job.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Author's Blog: https://blog.csdn.net/qq_32394351
# Date  : 2023/12/10

from db.base_class import Base
from db import fields


class Job(Base):
    """ 定时任务 """
    job_id = fields.Char(string='任务代号', required=False)
    job_name = fields.Char(string='任务名称', required=True)
    job_group = fields.Char(string='任务组名')
    func_name = fields.Char(string='调用目标字符串')
    func_args = fields.Char(string='传入位置参数')
    func_kwargs = fields.Char(string='传入字典参数')
    cron_model = fields.Char(string='执行模式')
    coalesce = fields.Integer(string='是否并发')
    next_run = fields.Datetime(string='下次执行时间')
    cron_expression = fields.Char(string='cron执行表达式')
    status = fields.Integer(string='任务状态')
    misfire_policy = fields.Integer(string='执行策略')  # 1 立即执行 2 执行一次  3放弃执行
    active = fields.Boolean(string='是否启用', default=True)
