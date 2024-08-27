#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : kzz_spider.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Author's Blog: https://blog.csdn.net/qq_32394351
# Date  : 2023/12/13
# 可转债打新爬虫
import datetime
import json
import re
from dateutil import relativedelta
from utils.define import DEFAULT_USER_AGENT
import requests


def get_now_kzz(task_id, url='http://data.eastmoney.com/kzz/', dayeExtra=0, **kwargs):
    """
    获取未来可转债数据-新版本
    :param url: 东方财富网查询地址
    :param dayeExtra: 未来额外天数。默认0只查询今天
    :return:
    """
    headers = {'user-agent': DEFAULT_USER_AGENT}
    print(f'=========task_id:{task_id},url:{url},dayeExtra:{dayeExtra},kwargs:{kwargs}=========')
    s = requests.session()
    s.get(url, headers=headers)
    dataUrl = 'https://datacenter-web.eastmoney.com/api/data/v1/get?callback=jQuery1123039067058172678726_1656984549268&sortColumns=PUBLIC_START_DATE&sortTypes=-1&pageSize=50&pageNumber=1&reportName=RPT_BOND_CB_LIST&columns=ALL&quoteColumns=f2~01~CONVERT_STOCK_CODE~CONVERT_STOCK_PRICE%2Cf235~10~SECURITY_CODE~TRANSFER_PRICE%2Cf236~10~SECURITY_CODE~TRANSFER_VALUE%2Cf2~10~SECURITY_CODE~CURRENT_BOND_PRICE%2Cf237~10~SECURITY_CODE~TRANSFER_PREMIUM_RATIO%2Cf239~10~SECURITY_CODE~RESALE_TRIG_PRICE%2Cf240~10~SECURITY_CODE~REDEEM_TRIG_PRICE%2Cf23~01~CONVERT_STOCK_CODE~PBV_RATIO&quoteType=0&source=WEB&client=WEB'
    r = s.get(dataUrl, headers=headers)
    ret = r.text
    # print(ret)
    data = re.match('(.*?)\((.*)\)', ret)[2]
    data = json.loads(data)
    data = data['result']['data']
    # print(data)
    kzz_list = []
    today = datetime.datetime.today().date()
    days = [today + relativedelta.relativedelta(days=i) for i in range(1 + dayeExtra)]
    for i in data[:10]:
        dateTime_p = datetime.datetime.strptime(i.get('PUBLIC_START_DATE'), '%Y-%m-%d %H:%M:%S').date()
        if dateTime_p not in days:
            continue
        kzz = {
            'name': i.get('SECURITY_NAME_ABBR'),
            'code': i.get('SECURITY_CODE'),
            'date': dateTime_p.strftime('%Y-%m-%d'),
        }
        kzz_list.append(kzz)
    print(kzz_list)
    return kzz_list
