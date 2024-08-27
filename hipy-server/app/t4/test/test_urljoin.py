#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : test_urljoin.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Author's Blog: https://blog.csdn.net/qq_32394351
# Date  : 2024/5/1

from quickjs import Context
import json
from urllib.parse import urljoin

js_code = r"""
var rule = {
    title: '索尼资源',
    host: 'https://suoniapi.com',
    // homeTid: '13',
    homeTid: '',
    cate_exclude: '电影片|连续剧|综艺片|动漫片|电影解说|体育|演员|新闻资讯',
    parse_url: '',
  homeUrl: '/api.php/provide/vod/?ac=detail&t={{rule.homeTid}}',
  detailUrl: '/api.php/provide/vod/?ac=detail&ids=fyid',
  searchUrl: '/api.php/provide/vod/?wd=**&pg=fypage',
  url: '/api.php/provide/vod/?ac=detail&pg=fypage&t=fyclass',
  headers: {
    'User-Agent': 'MOBILE_UA',
  },
  timeout: 5000,
  class_parse: 'json:class;',
  limit: 20,
  multi: 1,
  searchable: 2,
  play_parse: true,
  parse_url: '',
  lazy: "js:\n      if(/\\.(m3u8|mp4)/.test(input)){\n        input = {parse:0,url:input}\n      } else {\n        if (rule.parse_url.startsWith('json:')) {\n          let purl = rule.parse_url.replace('json:','')+input;\n          let html = request(purl);\n          input = {parse:0,url:JSON.parse(html).url}\n        } else {\n          input= rule.parse_url+input; \n        }\n      }\n      ",
  推荐: '*',
  一级: 'json:list;vod_name;vod_pic;vod_remarks;vod_id;vod_play_from',
  二级: 'js:\n      let html=request(input);\n      html=JSON.parse(html);\n      let data=html.list;\n      VOD=data[0];',
  搜索: '*',
}
"""
ctx = Context()
ctx.eval(js_code)
rule = json.loads(ctx.get('rule').json())
print(rule)

homeUrl = rule['homeUrl']
host = rule['host']
print(homeUrl, host)
a = urljoin(host, homeUrl)
print(a)
