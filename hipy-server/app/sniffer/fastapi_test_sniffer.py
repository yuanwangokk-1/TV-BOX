#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : fastapi_test_sniffer.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Date  : 2024/3/28

from snifferAsync import main, async_playwright, asyncio
from fastapi import FastAPI

# 2.实例化
app = FastAPI()


# 3.定义
@app.get("/sniffer")
async def root():
    # response = asyncio.run(main())
    # print('resp', response)
    # response = await asyncio.run(main())
    # async with async_playwright() as playwright:
    #     response = await run(playwright)
    loop = asyncio.get_running_loop()
    response = loop.create_task(main())
    return response


@app.get("/screenshot")
async def get_screenshot():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.goto("https://www.baidu.com")
        screenshot = await page.screenshot()
        await browser.close()
        return screenshot


if __name__ == '__main__':
    import uvicorn

    uvicorn.run("snifferAsync:app", host="0.0.0.0", port=8080, reload=True)
