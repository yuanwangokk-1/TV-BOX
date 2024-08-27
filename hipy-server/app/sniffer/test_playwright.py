#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : test_playwright.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Author's Blog: https://blog.csdn.net/qq_32394351
# Date  : 2024/3/24
# https://github.com/microsoft/playwright-python


_description = r"""
Downloading Chromium 123.0.6312.4 (playwright build v1105) from https://playwright.azureedge.net/builds/chromium/1105/chromium-win64.zip
122.2 MiB [====================] 100% 0.0s
Chromium 123.0.6312.4 (playwright build v1105) downloaded to C:\Users\hjd\AppData\Local\ms-playwright\chromium-1105
Downloading FFMPEG playwright build v1009 from https://playwright.azureedge.net/builds/ffmpeg/1009/ffmpeg-win64.zip
1.4 MiB [====================] 100% 0.0s
FFMPEG playwright build v1009 downloaded to C:\Users\hjd\AppData\Local\ms-playwright\ffmpeg-1009
Downloading Firefox 123.0 (playwright build v1440) from https://playwright.azureedge.net/builds/firefox/1440/firefox-win64.zip
83.4 MiB [====================] 100% 0.0s
Firefox 123.0 (playwright build v1440) downloaded to C:\Users\hjd\AppData\Local\ms-playwright\firefox-1440
Downloading Webkit 17.4 (playwright build v1983) from https://playwright.azureedge.net/builds/webkit/1983/webkit-win64.zip
47.2 MiB [====================] 100% 0s
Webkit 17.4 (playwright build v1983) downloaded to C:\Users\hjd\AppData\Local\ms-playwright\webkit-1983

webkit-1983

只装这个浏览器，体积小|这个浏览器很多毛病。感觉和ie内核似的。访问个解析页面竟然崩了
pip install playwright
playwright install webkit

playwright install firefox

https://playwright.dev/python/docs/intro
https://playwright.dev/python/docs/api/class-playwright

"""
import time
from playwright.sync_api import sync_playwright

t1 = time.time()
with sync_playwright() as p:
    # for browser_type in [p.chromium, p.firefox, p.webkit]:
    for browser_type in [p.webkit]:
        browser = browser_type.launch(headless=False)
        context = browser.new_context()
        # 类似于requests库，但是有点区别，比如取text和content，这个是函数需要加()执行。requests库是属性
        # context = browser.new_context(base_url="https://api.github.com")
        # _requests = context.request
        # r = _requests.get('https://www.baidu.com')
        # # print(r.text())

        # webview正常通过cloudfare5秒认证
        # page = browser.new_page()
        # page.goto('https://www.freeok.pro')
        # page.screenshot(path=f'screenshot-{browser_type.name}.png')
        # print(page.title())
        # print(page.content())
        # page.close()

        page = context.new_page()
        page.goto('https://jx.jsonplayer.com/player/?url=https://m.iqiyi.com/v_1pj3ayb1n70.html')
        # page.goto('https://jx.yangtu.top/?url=https://m.iqiyi.com/v_1pj3ayb1n70.html')  # 这个会崩
        page.wait_for_selector('video')
        videoUrl = page.get_attribute('video', 'src')
        print('videoUrl:', videoUrl)
        # page.screenshot(path=f'screenshot3-{browser_type.name}.png')
        print(page.title())
        # print(page.content())
        page.close()

        # 下面代码卡死。csdn有检测
        # page.goto('https://blog.csdn.net/qq_47993287/article/details/123170108')
        # page.screenshot(path=f'screenshot2-{browser_type.name}.png')
        # print(page.title())

        browser.close()

t2 = time.time()
print(f'共计耗时{round((t2 - t1) * 1000, 2)}毫秒')
