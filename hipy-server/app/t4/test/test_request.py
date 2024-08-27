#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : test_request.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Author's Blog: https://blog.csdn.net/qq_32394351
# Date  : 2024/3/24

import requests
import cloudscraper
scraper = cloudscraper.create_scraper()

# headers = {'User-Agent': 'Mozilla/5.0 (Linux；； Android 11；； Mi 10 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.152 Mobile Safari/537.36', 'Referer': 'https://www.freeok.pro'}
# headers = {
#     'User-Agent': 'Mozilla/5.0',
#     'Referer': 'https://www.freeok.pro'}
# r = requests.get('https://www.freeok.pro', data={}, headers=headers)
# print(r.content)

headers = {
    'User-Agent': 'Mozilla/5.0',
    'Referer': 'https://www.freeok.pro'}
# r = scraper.get('https://www.freeok.pro', data={}, headers=headers)
r = scraper.get('https://www.freeok.pro')
print(r.content)