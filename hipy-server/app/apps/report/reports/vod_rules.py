#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : vod_rules.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Author's Blog: https://blog.csdn.net/qq_32394351
# Date  : 2024/1/16

from sqlalchemy import desc, asc

from apps.report.gen_report import BaseQuery
from apps.vod.models.vod_rules import VodRules
from apps.vod.curd.curd_rules import curd_vod_rules as curd
from utils.tools import list_to_tree


class Query(BaseQuery):
    def report_config(self):
        self.header = ["源名称", "源分组", "文件路径", "是否存在", "显示排序", "文件类型", "ext扩展", "源状态",
                       "是否显示"]
        self.file_name = "源列表"

    def instance_data(self):
        q = self.query_params
        rows = curd.search(self.db, name=q.get('job_name'), group=q.get('job_group'),
                           status=q.get('status'), page=int(q.get('page') or 1),
                           page_size=int(q.get('page_size') or 1000))
        rows = rows['results']

        data = []
        for row in rows:
            data_row = [
                row['name'],
                row['group'],
                row['path'],
                row['is_exist'],
                row['order_num'],
                row['file_type'],
                row['ext'],
                row['status'],
                row['active'],
            ]
            data.append(data_row)
        return data
