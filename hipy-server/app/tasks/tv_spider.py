#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : tv_spider.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Date  : 2024/2/20
# 电视直播爬虫

from utils.httpapi import getGitContents
from pathlib import Path
import requests
import os
import re


def main(task_id, mytv_count=300, tv_count=3000):
    print(f'=========task_id:{task_id}')
    proxy = 'https://ghproxy.liuzhicong.com/'
    files = getGitContents('ssili126/tv', '', '')
    txt_files = [file for file in files if str(file['name']).endswith('.txt') and file['type'] == 'file']
    txt_files = [{
        "rule": re.sub('\.txt$', '', txt_file['name']),
        "name": txt_file['name'],
        "size": f"{round(txt_file['size'] / 1024, 2)}kb",
        "url": proxy + txt_file['download_url'],
    } for txt_file in txt_files]
    contents = []
    my_content = ''
    error = []
    for txt_file in txt_files:
        url = txt_file['url']
        name = txt_file['name']
        print(name)
        try:
            r = requests.get(url, timeout=5)
            text = r.text.strip()
            contents.append(text)
            if name == 'itvlist.txt':
                my_content = text

        except Exception as e:
            error.append(name)
            print(f'未能成功获取{name}的文件内容:{e}')

    content = '\n'.join(contents)
    # 获取项目根目录
    BASE_DIR = os.path.abspath(os.path.join(os.path.abspath(os.path.dirname(__file__)), '..'))
    tv_path = os.path.join(BASE_DIR, 't4/files/txt/tv.txt')
    tv_path = Path(tv_path).as_posix()

    mytv_path = os.path.join(BASE_DIR, 't4/files/txt/mytv.txt')
    mytv_path = Path(mytv_path).as_posix()
    # print(tv_path)
    items = content.split('\n')
    if len(items) > tv_count and 'CCTV' in content and '卫视' in content:
        with open(tv_path, 'w+', encoding='utf-8') as f:
            f.write(content)
            write_status = '本次成功写入本地文件tv.txt'
    else:
        write_status = f'本次未写入本地文件tv.txt[内容行数{len(items)}不够{tv_count}或不含cctv或卫视]'

    result = f'爬取直播文件行数:{len(items)}'
    if len(error) > 0:
        result += f',未能获取{",".join(error)}等文件内容。'

    items = my_content.split('\n')
    if len(items) > mytv_count and 'CCTV' in content and '卫视' in content:
        with open(mytv_path, 'w+', encoding='utf-8') as f:
            f.write(my_content)
            write_status2 = ' 本次成功写入本地文件mytv.txt'
    else:
        write_status2 = f' 本次未写入本地文件mytv.txt[内容行数{len(items)}不够{mytv_count}或不含cctv或卫视]'

    result += write_status
    result += write_status2
    print(result)
    return result


if __name__ == '__main__':
    main('tv_spider')
