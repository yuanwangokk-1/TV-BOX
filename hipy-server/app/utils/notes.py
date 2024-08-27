#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : notes.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Author's Blog: https://blog.csdn.net/qq_32394351
# Date  : 2023/12/5
import json
import time
from core.config import settings
import os


def set_start_time():
    start_time = time.time()
    os.makedirs(os.path.dirname(settings.NOTES_PATH), exist_ok=True)

    try:
        with open(settings.NOTES_PATH, mode='r', encoding='utf-8') as f:
            notes = f.read()
        notes = json.loads(notes)
    except:
        notes = {}
    notes['start_time'] = start_time
    with open(settings.NOTES_PATH, mode='w+', encoding='utf-8') as f:
        f.write(json.dumps(notes, ensure_ascii=False))


def get_start_info():
    try:
        with open(settings.NOTES_PATH, mode='r', encoding='utf-8') as f:
            notes = f.read()
        notes = json.loads(notes)
    except:
        notes = {}
    if not notes.get('start_time'):
        return {
            'start_time': 'N/A',
            'run_time': 'N/A',
        }
    start_time = notes['start_time']
    # 将时间戳转换为time struct对象
    time_struct = time.localtime(start_time)
    # 将time struct对象转换为格式化字符串
    start_time_str = time.strftime("%Y-%m-%d %H:%M:%S", time_struct)
    time_delta = (time.time() - start_time)
    a = time_delta
    time_delta_str = '%d天%d时%d分%d秒' % (a / 60 / 60 / 24, a / 60 / 60 % 24, a / 60 % 60, a % 60)
    return {
        'start_time': start_time_str,
        'run_time': time_delta_str,
    }
