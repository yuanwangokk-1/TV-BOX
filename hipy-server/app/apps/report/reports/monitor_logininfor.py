#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : logininfor.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Author's Blog: https://blog.csdn.net/qq_32394351
# Date  : 2023/12/9
from sqlalchemy import desc, asc

from apps.report.gen_report import BaseQuery
from apps.monitor.models.logininfor import LoginInfor
from apps.monitor.curd.curd_logininfor import curd_logininfor as curd
from utils.tools import list_to_tree


class Query(BaseQuery):
    def report_config(self):
        self.header = ["编号", "用户名", "登录地址", "登录地点", "浏览器", "操作系统", "登录状态", "操作信息",
                       "登录日期"]
        self.file_name = "登录日志"

    def instance_data(self):

        order_bys = []
        q = self.query_params
        order_by = q.get('order_by')
        is_desc = q.get('is_desc')
        if order_by == 'login_time':
            order_bys += [desc(LoginInfor.login_time)] if is_desc else [asc(LoginInfor.login_time)]

        rows = curd.search(self.db, user_name=q.get('user_name'), ipaddr=q.get('ipaddr'), status=q.get('status'),
                           login_time=q.get('login_time'), page=int(q.get('page') or 1),
                           page_size=int(q.get('page_size') or 1000), order_bys=order_bys)
        rows = rows['results']

        data = []
        for row in rows:
            data_row = [
                row['id'],
                row['user_name'],
                row['ipaddr'],
                row['login_location'],
                row['browser'],
                row['os'],
                row['status'],
                row['msg'],
                row['login_time'],
            ]
            data.append(data_row)
        return data
