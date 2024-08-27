#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : get_vip_parse.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Date  : 2024/1/31

import requests
from lxml.etree import HTML
from urllib.parse import urljoin


def gen_vip_parse_file():
    """
    从刘明野的工具箱爬取视频解析地址(网页接口) http://tool.liumingye.cn/video/
    @return:
    """
    url = 'http://tool.liumingye.cn/video/'
    r = requests.get(url)
    html = HTML(r.text)
    lis = html.xpath('//span[@class="am-input-group-btn"]/select/option')
    parse_list = []
    for li in lis:
        text = li.xpath('./text()')
        value = li.xpath('./@value')
        parse_list.append({
            'name': ''.join(text),
            'value': urljoin(url, ''.join(value)),
        })
    print(parse_list)
    vip_parse_file_list = [f'{li["name"]},{li["value"]}' for li in parse_list]
    vip_prefix_list = [
        '# 这是用户自定义解析列表,可以自行编辑',
        '# 参数三可填0123分别对应:普通解析、json解析、并发多json解析、聚合解析。参数3不填默认0',
        '# 名称,链接,类型,ua (ua不填默认 Mozilla/5.0) 可以手动填 Dart/2.14 (dart:io)',
    ]
    vip_parse_file_str = '\n'.join(vip_prefix_list + vip_parse_file_list)
    with open('t4/files/txt/vip_parse.conf', mode='w+', encoding='utf-8') as f:
        f.write(vip_parse_file_str)


if __name__ == '__main__':
    gen_vip_parse_file()
