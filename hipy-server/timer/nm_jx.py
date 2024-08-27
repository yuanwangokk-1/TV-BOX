#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : nm_jx.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Date  : 2024/4/11

import asyncio
from asyncSnifferPro import Sniffer
from time import time, localtime, strftime
import requests
import json
from urllib3 import encode_multipart_formdata
import warnings

# 关闭警告
warnings.filterwarnings("ignore")
requests.packages.urllib3.disable_warnings()

nm_get_url = 'https://igdux.top/~nmjx'
nm_put_url = 'https://igdux.top/~nmjx:6Q2bC4BWAayiZ3sifysBpJPE'
timeout = 2000


def update_content(content, boundary=None):
    """
    更新剪切板内容为指定的content文本，返回剪切板服务端回应文本
    @param content: str
    @param boundary:
    @return:
    """
    if boundary is None:
        boundary = f'--dio-boundary-{int(time())}'
    headers = {'Content-Type': f'multipart/form-data; boundary={boundary}'}
    fields = []
    data = {
        'c': content
    }
    for key, value in data.items():
        fields.append((key, (None, value, None)))
    m = encode_multipart_formdata(fields, boundary=boundary)
    data = m[0]
    r = requests.put(nm_put_url, data=data, headers=headers, timeout=round(timeout / 1000, 2), verify=False)
    print(r.text)
    return r.text


def get_content():
    """
    获取剪切板内容的字符串
    @return:
    """
    r = requests.get(nm_get_url, timeout=round(timeout / 1000, 2))
    ret = r.text
    return ret


def get_content_dict():
    """
    获取剪切板内容python字典
    @return:
    """
    r = requests.get(nm_get_url, timeout=round(timeout / 1000, 2))
    ret = r.json()
    return ret


async def demo_test_nm():
    """
    自动爬取农民解析链接然后对比剪切板内容，如果发生了改变就重新写到剪切板。
    @return:
    """
    t1 = time()
    async with Sniffer(debug=True, headless=True) as browser:
        # 在这里，async_func已被调用并已完成
        pass
    page = await browser.browser.new_page()
    await page.set_extra_http_headers(headers={'referer': 'https://m.emsdn.cn/'})
    await page.goto('https://api.cnmcom.com/webcloud/nmm.php?url=')  #
    html = await page.content()
    # print(html)
    lis = await page.locator('li').count()
    print('共计线路路:', lis)
    lis = await page.locator('li').all()
    urls = []
    for li in lis:
        await li.click()
        # iframe = page.locator('#WANG')
        iframe = page.locator('iframe').first
        src = await iframe.get_attribute('src')
        urls.append(src)
    await browser.close_page(page)
    await browser.close()

    t2 = time()
    cost = round((t2 - t1) * 1000, 2)
    ctime = localtime(t2)
    time_str = strftime("%Y-%m-%d %H:%M:%S", ctime)
    print(f'共计耗时{cost}毫秒,解析数:{len(urls)} 列表为: {urls}')
    c_data = {
        "data": urls,
        "code": 200,
        "cost": cost,
        "msg": "农民解析获取成功",
        "from": "https://api.cnmcom.com/webcloud/nmm.php?url=",
        "update": time_str,
    }
    old_data = get_content_dict()
    old_urls = old_data.get('data')
    if old_urls != urls and len(urls) > 0:
        print('检测到农民影视解析地址发生变化,开始写入剪切板')
        # 如果剪切板里存的解析接口数据跟爬出来的接口数据不一致就更新剪切板内容
        c_data = json.dumps(c_data, ensure_ascii=False)
        update_content(c_data)
    elif len(urls) == 0:
        print('本次没有成功嗅探到农民解析，记录失败时间到剪切板')
        old_data['error_update'] = time_str
        c_data = json.dumps(old_data, ensure_ascii=False)
        update_content(c_data)
    elif old_urls == urls:
        print('本次成功嗅探到农民解析并与剪切板内容一致，无需进行任何操作')


if __name__ == '__main__':
    # 主文件，作为linux定时任务调用，python3 nm_jx.py  建议1分钟一次
    # 运行事件循环
    asyncio.run(demo_test_nm())
    print(get_content())
