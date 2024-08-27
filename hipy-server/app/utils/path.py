#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : path.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Date  : 2024/2/26

import os
import datetime
from core.constants import BASE_DIR
from pathlib import Path


def get_file_modified_time(filepath: str):
    timestamp = os.path.getmtime(filepath)
    modified_time = datetime.datetime.fromtimestamp(timestamp)
    return modified_time


def get_file_text(filepath: str):
    text = ''
    if os.path.exists(filepath):
        with open(filepath, mode='r', encoding='utf-8') as f:
            text = f.read()
    return text


def get_api_path(api: str):
    if api.endswith('.js'):
        api_path = os.path.join(BASE_DIR, f't4/files/drpy_js/{api}')
    else:
        api_path = os.path.join(BASE_DIR, f't4/spiders/{api}.py')
    api_path = Path(api_path).as_posix()
    return api_path


def get_now():
    return datetime.datetime.now()


if __name__ == '__main__':
    api1 = get_api_path('两个BT')
    print(get_file_modified_time(api1))
    print(get_now())
