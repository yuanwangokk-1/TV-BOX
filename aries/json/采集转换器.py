#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : 采集转换器.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Date  : 2024/7/4

import json
import requests
from urllib.parse import urlsplit
from collections import OrderedDict


def get_host(url):
    """
    获取主页地址
    @param url:
    @return:
    """
    ret = urlsplit(url)
    return f'{ret.scheme}://{ret.netloc}'


def get_sid(url):
    """
    获取id主页
    @param url:
    @return:
    """
    ret = urlsplit(url)
    return ret.netloc


def get_api(url):
    """
    获取接口api
    @param url:
    @return:
    """
    ret = urlsplit(url)
    return ret.path.rstrip('/') + '/'


def delete_same(data, key='url'):
    """
    字典列表去重，按字典的某个key
    @param data:
    @param key:
    @return:
    """
    unique_data = list(OrderedDict((d[key], d) for d in data).values())
    if key == 'sid':
        for site in unique_data:
            del site['sid']
    return unique_data


def main(zy_url="https://cdn.jsdelivr.net/gh/waifu-project/v1@latest/zy.json"):
    r = requests.get(zy_url)
    ret = r.json()
    sites = ret['sites']['data']
    sites = [site for site in sites if site.get('type') and site['type'] == 1]
    print(f'共计发现type1的站点:{len(sites)}条记录')
    covert_sites = []
    for site in sites:
        if site.get("name") and site.get("api"):
            surl = site['api']
            host = get_host(surl)
            api = get_api(surl)
            sid = get_sid(surl)
            cvalue = {
                "sid": sid,
                "name": site["name"],
                "url": host,
                "parse_url": "",
                "cate_exclude": ""
            }
            if api != '/api.php/provide/vod/':
                cvalue["api"] = api
            covert_sites.append(cvalue)
    print(f'转换完成采集之王的站点:{len(covert_sites)}条记录')
    covert_sites = delete_same(covert_sites, 'sid')
    print(f'去重后的采集之王的站点:{len(covert_sites)}条记录')
    with open('采集[zy].json', mode='w+', encoding='utf-8') as f:
        f.write(json.dumps(covert_sites, ensure_ascii=False, indent=4))


if __name__ == '__main__':
    main()
