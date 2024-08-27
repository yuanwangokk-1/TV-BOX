#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : monitor_job_log.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Author's Blog: https://blog.csdn.net/qq_32394351
# Date  : 2024/1/6

from sqlalchemy import desc, asc
from apps.report.gen_report import BaseQuery
from apps.monitor.models.job_log import JobLog
from apps.monitor.curd.curd_job_log import curd_job_log as curd


class Query(BaseQuery):
    def report_config(self):
        self.header = ["任务代号", "任务名称", "任务组名", "调用函数", "位置参数", "关键字参数",
                       "执行状态", "执行时间", "日志信息", "异常信息"]
        self.file_name = "定时任务调度日志"

    def instance_data(self):
        q = self.query_params
        order_bys = [desc(JobLog.run_time)]
        rows = curd.search(self.db, run_status=q.get('run_status'), job_id=q.get('job_id'),
                           begin_time=q.get('begin_time'), end_time=q.get('end_time'),
                           job_name=q.get('job_name'), job_group=q.get('job_group'),
                           page=int(q.get('page') or 1), order_bys=order_bys,
                           page_size=int(q.get('page_size') or 1000))
        rows = rows['results']
        print('rows:', rows)

        data = []
        for row in rows:
            data_row = [
                row['job_id'],
                row['job_name'],
                row['job_group'],
                row['func_name'],
                row['func_args'],
                row['func_kwargs'],
                row['run_status'],
                row['run_time'],
                row['run_info'],
                row['run_except_info'],

            ]
            data.append(data_row)
        return data
