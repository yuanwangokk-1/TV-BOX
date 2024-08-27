#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : freeok.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Date  : 2024/4/12

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


async def main():
    """
    @return:
    """
    t1 = time()
    async with Sniffer(debug=True, headless=False,use_chrome=False) as browser:
        # 在这里，async_func已被调用并已完成
        pass
    page = await browser.browser.new_page()
    await page.goto('https://www.freeok.pro/')  #
    await page.wait_for_selector('.sidebar')
    resp = await page.content()
    print(resp)
    await browser.close_page(page)
    await browser.close()

    t2 = time()
    cost = round((t2 - t1) * 1000, 2)
    ctime = localtime(t2)
    time_str = strftime("%Y-%m-%d %H:%M:%S", ctime)
    print(f'共计耗时{cost}毫秒,当前时间:{time_str}')


if __name__ == '__main__':
    # 运行事件循环
    asyncio.run(main())
