#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : ad_remove.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Date  : 2024/2/18

import re
from urllib.parse import urljoin


def regStr(src, reg, group=1):
    m = re.search(reg, src)
    src = ''
    if m:
        src = m.group(group)
    return src


def fixAdM3u8(m3u8_text, m3u8_url='', ad_remove=''):
    """
    修复带广告的m3u8文本
    @param m3u8_text: 带广告的m3u8文本
    @param m3u8_url: m3u8原地址链接
    @param ad_remove: 广告去除正则表达式字符串如: reg:/video/adjump(.*?)ts
    @return:
    """
    # ad_remove = 'reg:/video/adjump(.*?)ts'
    if ad_remove.startswith('reg:'):
        ad_remove = ad_remove[4:]
    elif ad_remove.startswith('js:'):
        ad_remove = ad_remove[3:]
    else:
        ad_remove = None

    print(ad_remove)

    # 开头
    m3u8_start = m3u8_text[:m3u8_text.find('#EXTINF')].strip()
    # 中间
    m3u8_body = m3u8_text[m3u8_text.find('#EXTINF'):m3u8_text.find('#EXT-X-ENDLIST')].strip()
    # 结尾
    m3u8_end = m3u8_text[m3u8_text.find('#EXT-X-ENDLIST'):].strip()

    murls = []
    m3_body_list = m3u8_body.splitlines()
    m3_len = len(m3_body_list)
    i = 0
    while i < m3_len:
        mi = m3_body_list[i]
        mi_1 = m3_body_list[i + 1]
        if mi.startswith('#EXTINF'):
            murls.append('&'.join([mi, mi_1]))
            i += 2
        elif mi.startswith('#EXT-X-DISCONTINUITY'):
            mi_2 = m3_body_list[i + 2]
            murls.append('&'.join([mi, mi_1, mi_2]))
            i += 3
        else:
            break
    new_m3u8_body = []
    for murl in murls:
        if ad_remove and regStr(murl, ad_remove):
            pass
        else:
            murl_list = murl.split('&')
            if not murl_list[-1].startswith('http') and m3u8_url.startswith('http'):
                murl_list[-1] = urljoin(m3u8_url, murl_list[-1])
            new_m3u8_body.extend(murl_list)

    new_m3u8_body = '\n'.join(new_m3u8_body).strip()
    m3u8_text = '\n'.join([m3u8_start, new_m3u8_body, m3u8_end]).strip()
    return m3u8_text


if __name__ == '__main__':
    with open('ad.m3u8', encoding='utf-8') as f:
        adt = f.read()
    url = adt.split('\n')[0]
    adt = '\n'.join(adt.split('\n')[1:])
    ad_remove = 'reg:/video/adjump(.*?)ts'
    print(fixAdM3u8(adt, url, ad_remove))
