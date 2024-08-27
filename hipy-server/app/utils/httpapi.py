#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : httpapi.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Author's Blog: https://blog.csdn.net/qq_32394351
# Date  : 2023/12/9

import re
from network.request import Request
from t4.base.htmlParser import jsoup
import ujson
from urllib.parse import urljoin

GIT_HOST = "api.github.com"
GIT_URL = "https://" + GIT_HOST


def get_my_ip():
    my_ip = ''
    try:
        ip_check_url = 'https://httpbin.org/ip'
        request = Request(method="GET", url=ip_check_url, agent=False, follow_redirects=True, timeout=0.5)
        r = request.request()
        resp = r.json()
        return resp.get('origin') or my_ip
    except Exception as e:
        print(f'查询ip归属地发生错误:{e}')

    return my_ip


def get_location_by_ip(ipaddr):
    login_location = ''
    try:
        ip_url = f'https://qifu-api.baidubce.com/ip/geo/v1/district?ip={ipaddr}'
        request = Request(method="GET", url=ip_url, agent=False, follow_redirects=True, timeout=0.5)
        # 同步
        r = request.request()
        resp = r.json()
        if resp.get('msg') == '查询成功':
            d = resp['data']
            prov = d['prov']
            city = d['city']
            district = d['district']
            owner = d['owner']
            login_location = f'{prov}{city}{district}{owner}'
    except Exception as e:
        print(f'查询ip归属地发生错误:{e}')

    return login_location


def getHotSuggest1(url='http://4g.v.sogou.com/hotsugg', size=0):
    headers = {
        'Referer': 'https://gitcode.net/',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
    }
    jsp = jsoup(url)
    pdfh = jsp.pdfh
    pdfa = jsp.pdfa
    pd = jsp.pd
    try:
        request = Request(method="GET", url=url, headers=headers, agent=False, follow_redirects=True, timeout=2)
        r = request.request()
        html = r.text
        data = pdfa(html, 'ul.hot-list&&li')
        suggs = [{'title': pdfh(dt, 'a&&Text'), 'url': pd(dt, 'a&&href')} for dt in data]
        return suggs
    except:
        return []


def getHotSuggest2(url='https://pbaccess.video.qq.com/trpc.videosearch.hot_rank.HotRankServantHttp/HotRankHttp',
                   size=0):
    size = int(size) if size else 50
    pdata = ujson.dumps({"pageNum": 0, "pageSize": size})
    headers = {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
        'content-type': 'application/json'}
    try:
        request = Request(method="POST", url=url, data=pdata, headers=headers, agent=False, follow_redirects=True,
                          timeout=2)
        r = request.request()
        html = r.json()
        data = html['data']['navItemList'][0]['hotRankResult']['rankItemList']
        suggs = [{'title': dt['title'], 'url': dt['url']} for dt in data]
        return suggs
    except:
        return []


def getHotSuggest(s_from, size):
    if s_from == 'sougou':
        return getHotSuggest1(size=size)
    else:
        return getHotSuggest2(size=size)


def getYspContent(ysp_url):
    headers = {
        'Referer': 'https://www.yangshipin.cn/',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
    }
    request = Request(method="get", url=ysp_url, headers=headers, agent=False, follow_redirects=True, timeout=5)
    r = request.request()
    html = r.text
    m3u8_list = html.split('\n')
    new_m3u8_list = []
    for m3u8_str in m3u8_list:
        if (not m3u8_str.startswith('#')) and m3u8_str.endswith('.ts'):
            new_m3u8_list.append(urljoin(ysp_url, m3u8_str))
        else:
            new_m3u8_list.append(m3u8_str)
    m3u8_text = '\n'.join(new_m3u8_list)
    return m3u8_text


def getGitContents(repo, path, token):
    headers = {
        "Accept": "application/vnd.github.v3+json",
        "Connection": "keep-alive",
        "Host": GIT_HOST,
        "User-Agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
    }
    guest_token = token or ""
    if guest_token:
        # headers["Authorization"] = "token " + guest_token
        headers["Authorization"] = "Bearer " + guest_token
    request = Request(method="get", url=GIT_URL + "/repos/" + repo + "/contents/" + (path or ""),
                      headers=headers, agent=False, follow_redirects=True,
                      timeout=5)
    r = request.request()
    res = r.json()
    return res


def getJSFiles(repo, path, token, proxy):
    files = getGitContents(repo, path, token)
    # print(files)
    js_files = [file for file in files if str(file['name']).endswith('.js') and file['type'] == 'file']
    js_files = [{
        "rule": re.sub('\.js$', '', js_file['name']),
        "name": js_file['name'],
        "size": f"{round(js_file['size'] / 1024, 2)}kb",
        "url": proxy + js_file['download_url'],
    } for js_file in js_files]
    return js_files
