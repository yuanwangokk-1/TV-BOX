#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : snifferAsync.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Date  : 2024/3/27

import asyncio
import re
from playwright.async_api import async_playwright, Playwright
from time import time

urlRegex: str = 'http((?!http).){12,}?\\.(m3u8|mp4|flv|avi|mkv|rm|wmv|mpg|m4a|mp3)\\?.*|http((?!http).){12,}\\.(m3u8|mp4|flv|avi|mkv|rm|wmv|mpg|m4a|mp3)|http((?!http).)*?video/tos*'


async def run(playwright: Playwright):
    chromium = playwright.chromium  # or "firefox" or "webkit".
    browser = await chromium.launch(headless=True)
    page = await browser.new_page()
    timeout = 3000
    t1 = time()

    async def handle_request(request):
        url = request.url
        if re.search(urlRegex, url, re.M | re.I):
            if url.find('url=http') < 0 and url.find('v=http') < 0 and url.find('.css') < 0 and url.find(
                    '.html') < 0:
                await page.evaluate(f"window.realUrl = '{url}'")

    async def handle_load():
        print('页面加载完毕')

    page.on("request", handle_request)
    page.on('load', handle_load)
    page.set_default_timeout(timeout)
    await page.goto("https://jx.jsonplayer.com/player/?url=https://m.iqiyi.com/v_1pj3ayb1n70.html")
    # await page.goto("https://jx.yangtu.top/?url=https://m.iqiyi.com/v_1pj3ayb1n70.html")
    await page.evaluate("window.realUrl = '';")
    try:
        await page.wait_for_function("() => window.realUrl")
        is_timeout = False
    except:
        print('超时了')
        is_timeout = True
    realUrl = await page.evaluate('window.realUrl')
    print('最终结果:', realUrl)
    print('是否超时:', is_timeout)
    cost = round((time() - t1) * 1000, 2)
    print('最终耗时:', cost)
    # await page.wait_for_timeout(4000)
    await page.locator('video').wait_for(timeout=4000)
    # content = await page.content()
    src = await page.locator('video').get_attribute('src')
    print('src:', src)
    inner_html = await page.locator('video').inner_html()
    print('inner_html:', inner_html)
    await browser.close()
    return {'real_url': realUrl, 'is_timeout': is_timeout, 'cost': cost}


async def main():
    async with async_playwright() as playwright:
        response = await run(playwright)
    return response


if __name__ == '__main__':
    resp = asyncio.run(main())
    print('resp', resp)
