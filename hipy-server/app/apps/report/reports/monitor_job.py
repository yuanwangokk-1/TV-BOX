#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : monitor_job.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Author's Blog: https://blog.csdn.net/qq_32394351
# Date  : 2023/12/13

from sqlalchemy import desc, asc

from apps.report.gen_report import BaseQuery
from apps.monitor.models.job import Job
from apps.monitor.curd.curd_job import curd_job as curd
from utils.tools import list_to_tree


class Query(BaseQuery):
    def report_config(self):
        self.header = ["任务代号", "任务名称", "调用函数", "cron表达式", "状态", "是否自启", "位置参数", "关键字参数"]
        self.file_name = "定时任务"

    def instance_data(self):
        q = self.query_params
        rows = curd.search(self.db, job_name=q.get('job_name'), job_group=q.get('job_group'),
                           status=q.get('status'), page=int(q.get('page') or 1),
                           page_size=int(q.get('page_size') or 1000))
        rows = rows['results']

        data = []
        for row in rows:
            data_row = [
                row['job_id'],
                row['job_name'],
                row['func_name'],
                row['cron_expression'],
                row['status'],
                row['active'],
                row['func_args'],
                row['func_kwargs'],
            ]
            data.append(data_row)
        return data
