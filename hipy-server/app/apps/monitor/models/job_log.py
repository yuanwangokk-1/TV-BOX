#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : job_log.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Date  : 2024/1/4

from db.base_class import Base
from db import fields


class JobLog(Base):
    """ 定时任务日志 """
    job_id = fields.Char(string='任务代号', required=False)
    job_name = fields.Char(string='任务名称', required=True)
    job_group = fields.Char(string='任务组名')
    func_name = fields.Char(string='调用目标字符串')
    func_args = fields.Char(string='传入位置参数')
    func_kwargs = fields.Char(string='传入字典参数')
    run_info = fields.Text(string='正常日志信息')
    run_except_info = fields.Text(string='异常日志信息')
    run_status = fields.Integer(string='执行状态')
    run_time = fields.Datetime(string='执行时间')
