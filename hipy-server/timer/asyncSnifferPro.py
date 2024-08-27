#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : asyncSnifferPro.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Date  : 2024/3/28
# desc 利用playwright实现的简易播放地址嗅探器,异步高性能

from playwright.async_api import async_playwright, Playwright
import re
import os
from urllib.parse import urlparse
from time import time
import asyncio

_description = r"""
pip install playwright
手动安装谷歌浏览器即可，不需要playwright install,因为它自带的三个浏览器都太垃圾了不好用
参考官方接口文档
https://playwright.dev/python/docs/intro
https://playwright.dev/python/docs/api/class-playwright
"""

# 储存驱动器列表,给接口缓存用
browser_drivers = []


# 全部毫秒为单位不需要转换
class Sniffer:
    # 正则嗅探匹配表达式
    urlRegex: str = 'http((?!http).){12,}?\\.(m3u8|mp4|flv|avi|mkv|rm|wmv|mpg|m4a|mp3)\\?.*|http((?!http).){12,}\\.(m3u8|mp4|flv|avi|mkv|rm|wmv|mpg|m4a|mp3)|http((?!http).)*?video/tos*'
    urlNoHead: str = 'http((?!http).){12,}?(ac=dm&url=)'
    # 每次嗅探间隔毫秒
    playwright = None
    browser = None
    main_page = None
    context = None
    requests = None
    user_agent: str = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.50 Safari/537.36'
    pages = []
    web_timeout = 15000  # 获取页面源码不超过10秒
    sniffer_timeout = 20000  # 嗅探网页不超20秒
    wait_timeout = 3000  # 等待时间不超过3秒

    def __init__(self,
                 timeout=10000, head_timeout=200, user_agent=None,
                 custom_regex=None, headless=True, debug=False, use_chrome=True, is_pc=False):
        """
        初始化
        @param timeout: 全局嗅探超时
        @param head_timeout: head访问超时
        @param user_agent: 默认请求头
        @param custom_regex: 自定义嗅探正则
        @param headless: 无头模式
        @param debug: 启用debug打印日志
        """

        if user_agent is not None:
            self.user_agent = user_agent

        self.timeout = timeout
        self.head_timeout = head_timeout
        self.debug = debug
        self.custom_regex = custom_regex
        self.headless = headless
        self.channel = "chrome" if use_chrome else None
        self.is_pc = is_pc

    def log(self, *args):
        """
        打印日志print函数|根据类的实例化是否传入debug=True进行开启打印
        @param args:
        @return:
        """
        if self.debug:
            print(*args)

    async def __aenter__(self):
        # 在进入上下文管理器时调用异步函数
        print('在进入上下文管理器时调用异步函数')
        self.browser = await self.init_browser()
        return self

    async def __aexit__(self, exc_type, exc_value, traceback):
        # 在上下文管理器退出时执行清理工作
        print('在上下文管理器退出时执行清理工作')
        pass

    async def init_browser(self):
        """
        初始化驱动程序
        @return:
        """
        self.playwright = await async_playwright().start()

        # 用手动安装的chrome浏览器。不用它自带的三个垃圾浏览器
        browser = await self.playwright.chromium.launch(channel=self.channel, headless=self.headless)
        # print(self.playwright.devices)
        if not self.is_pc:
            # 模拟使用苹果手机
            iphone = self.playwright.devices["iPhone 14 Pro"]
            context = await browser.new_context(**iphone)
        else:
            context = await browser.new_context()
        # 开启一个主窗口方便后续的page新开和关闭不会退出程序
        self.main_page = await context.new_page()
        # 上下文自带的request库，跟requests库有点类似，但是用法也有差别
        self.requests = context.request
        # return browser
        return context

    async def setCookie(self, page, cookie=''):
        """
        设置cookie。可以在嗅探前或者获取源码前设置
        @param _dict:
        @return:
        """
        await page.set_extra_http_headers(headers={'Cookie': cookie})

    @staticmethod
    async def _route_interceptor(route):
        """
        全局路由拦截器,禁止加载某些资源
        @param route:
        @return:
        """
        excluded_resource_types = ["stylesheet", "image", "font"]
        resource_type = route.request.resource_type
        # print(resource_type)
        if resource_type in excluded_resource_types:
            # print('禁止加载资源:', excluded_resource_types, route.request.url, route.request.resource_type)
            await route.abort()
        else:
            await route.continue_()

    @staticmethod
    async def _on_dialog(dialog):
        """
        全局弹窗拦截器
        @param dialog:
        @return:
        """
        # print('on_dialog:', dialog)
        await dialog.accept()

    @staticmethod
    async def _on_pageerror(error):
        """
        全局页面请求错误拦截器
        @param error:
        @return:
        """
        # print('on_pageerror:', error)
        pass

    async def _get_page(self, headers=None):
        """
        新建一个页面。注入好相关依赖
        @param headers:
        @return:
        """
        page = await self.browser.new_page()
        # 设置全局导航超时
        page.set_default_navigation_timeout(self.timeout)
        # 设置全局等待超时
        page.set_default_timeout(self.timeout)

        # 添加初始化脚本 提高速度并且过无法播放的验证
        await page.add_init_script(path=os.path.join(os.path.dirname(__file__), './stealth.min.js'))
        await page.add_init_script(path=os.path.join(os.path.dirname(__file__), './devtools.js'))
        # 屏蔽控制台监听器 https://cdn.staticfile.net/devtools-detector/2.0.14/devtools-detector.min.js
        await page.route(re.compile(r"devtools-detector.*\.js$"), lambda route: route.abort())
        # 设置请求头
        if headers is not None:
            await page.set_extra_http_headers(headers=headers)
        else:
            await page.set_extra_http_headers(headers={'user-agent': self.user_agent})

        # 打开静态资源拦截器
        await page.route(re.compile(r"\.(png|jpg|jpeg|css|ttf)$"), self._route_interceptor)
        # await page.route(re.compile(r"\.(png|jpg|jpeg|ttf)$"), self._route_interceptor)
        # 打开弹窗拦截器
        page.on("dialog", self._on_dialog)
        # 打开页面错误监听
        page.on("pageerror", self._on_pageerror)

        # page.set_viewport_size({"width": 360, "height": 540})
        # 加入页面列表
        self.pages.append(page)
        return page

    @staticmethod
    def remove_element(array, element):
        """
        移除列表指定元素
        @param array:
        @param element:
        @return:
        """
        new_array = [x for x in array if x != element]
        return new_array

    async def close_page(self, page):
        """
        移除页面储存列表的指定page
        @param page:
        @return:
        """
        self.pages = self.remove_element(self.pages, page)
        await page.close()
        self.log('成功关闭page')

    async def close(self):
        """
        用完记得关闭驱动器
        @return:
        """
        await self.main_page.close()
        await self.browser.close()
        await self.playwright.stop()

    async def fetCodeByWebView(self, url, headers=None, timeout=None, is_pc=False, css=None, script=None):
        """
        利用webview请求得到渲染完成后的源码
        @param url: 待获取源码的网页链接
        @param headers: 访问网页的浏览器自定义请求头
        @param timeout: 访问网页的超时毫秒数
        @param is_pc: 是否用PC.此配置不生效。默认手机访问
        @param css: 等待出现定位器|如果不传css就等待加载页面状态为load
        @param script: 页面状态加载完毕后执行的网页脚本，可以点击网页元素之类的
        @return:

        """
        t1 = time()
        if timeout is None:
            timeout = self.timeout
        else:
            timeout = min([timeout, self.web_timeout])
        if not is_pc:
            is_pc = self.is_pc
        do_css = str(css).strip() if css and str(css).strip() else False
        page = await self._get_page(headers)
        # 设置全局导航超时
        page.set_default_navigation_timeout(timeout)
        # 设置全局等待超时
        page.set_default_timeout(timeout)
        response = {'content': '', 'headers': {'location': url}}
        try:
            await page.goto(url)
        except Exception as e:
            self.log(f'发生了错误:{e}')
        else:
            if do_css:
                await page.wait_for_selector(do_css)
            else:
                await page.wait_for_load_state('load')

            if script:
                try:
                    await page.evaluate("""(script) => {
                    eval(script);
                    }
                    """, script)
                    self.log(f'网页加载完成后成功执行脚本:{script}')
                except Exception as e:
                    self.log(f'网页加载完成后执行脚本:{script}发生错误:{e}')

            response['content'] = await page.content()
            response['headers']['location'] = page.url
        t2 = time()
        cost = round((t2 - t1) * 1000, 2)
        response['cost'] = cost
        await self.close_page(page)
        return response

    async def snifferMediaUrl(self, playUrl, mode=0, custom_regex=None, timeout=None, css=None, is_pc=False,
                              headers=None,
                              script=None):
        """
        输入播放地址，返回嗅探到的真实视频链接
        @param playUrl: 待嗅探的视频播放也地址
        @param mode: 模式:0 嗅探到一个就返回 1:在10秒内嗅探所有的返回列表
        @param custom_regex: 自定义嗅探正则
        @param timeout: 超时
        @param css: 等待出现定位器|如果不传css并且传了script就等待加载页面状态为load
        @param is_pc: 是否用PC.此配置不生效。默认手机访问
        @param headers: 访问网页的浏览器自定义请求头
        @param script: 页面状态加载完毕后执行的网页脚本，可以点击网页元素之类的
        @return:
        """
        t1 = time()
        if custom_regex is None:
            custom_regex = self.custom_regex

        if not is_pc:
            is_pc = self.is_pc

        do_css = str(css).strip() if css and str(css).strip() else False

        realUrls = []  # 真实链接列表，用于mode=1场景
        headUrls = []  # 已经head请求过的链接
        page = await self._get_page(headers)
        if timeout is None:
            timeout = self.timeout
        else:
            if mode == 1:  # 嗅探所有超时设定在10s内
                timeout = min([timeout, self.timeout])
            else:
                # 其他单个自定义时间不得超过20s
                timeout = min([timeout, self.sniffer_timeout])

        async def _on_request(request):
            nonlocal realUrls, headUrls
            url = request.url
            method = request.method
            headers = request.headers
            resource_type = request.resource_type
            self.log('on_request:', url, ' method:', method, ' resource_type:', resource_type)
            if custom_regex and re.search(custom_regex, url, re.M | re.I):
                _headers = {}
                if headers.get('referer'):
                    _headers['referer'] = headers['referer']
                if headers.get('user-agent'):
                    _headers['user-agent'] = headers['user-agent']
                realUrls.append({
                    'url': url,
                    'headers': _headers
                })
                await page.evaluate("""([url, _headers,realUrls]) => {
                window.realUrl = url
                window.realHeaders = _headers
                window.realUrls = realUrls
                }
                """, [url, _headers, realUrls])
                self.log('on_request通过custom_regex嗅探到真实地址:', url)
                if mode == 0:
                    page.remove_listener("request", _on_request)
                return True

            if re.search(self.urlRegex, url, re.M | re.I):
                if url.find('url=http') < 0 and url.find('v=http') < 0 and url.find('.css') < 0 and url.find(
                        '.html') < 0:
                    _headers = {}
                    if headers.get('referer'):
                        _headers['referer'] = headers['referer']
                    if headers.get('user-agent'):
                        _headers['user-agent'] = headers['user-agent']
                    realUrls.append({
                        'url': url,
                        'headers': _headers
                    })
                    await page.evaluate("""([url, _headers,realUrls]) => {
                    window.realUrl = url
                    window.realHeaders = _headers
                    window.realUrls = realUrls
                    }
                    """, [url, _headers, realUrls])
                    self.log('on_request通过默认正则已嗅探到真实地址:', url)
                    if mode == 0:
                        page.remove_listener("request", _on_request)
                    return True
            elif str(method).lower() == 'get' and str(url).startswith('http') and url != playUrl:
                parsed_url = urlparse(url)
                path = parsed_url.path
                filename = str(path.split('/')[-1])
                # 链接不含.并且正则匹配不在不head列表  或者 链接有.但是.后面没内容，也算空后缀
                if (filename and '.' not in filename and not re.search(self.urlNoHead, url, re.M | re.I)) or (
                        '.' in filename and len(filename) > 1 and not filename.split('.')[1]) and resource_type not in [
                    'script']:
                    # 如果链接没有进行过head请求。防止多次嗅探的时候重复去head请求
                    if url not in headUrls:
                        try:
                            r = await self.requests.head(url=url, timeout=self.head_timeout)
                            rheaders = r.headers
                            if rheaders.get('content-type') and rheaders[
                                'content-type'] == 'application/octet-stream' and '.m3u8' in rheaders[
                                'content-disposition']:
                                _headers = {}
                                if headers.get('referer'):
                                    _headers['referer'] = headers['referer']
                                if headers.get('user-agent'):
                                    _headers['user-agent'] = headers['user-agent']
                                realUrls.append({
                                    'url': url,
                                    'headers': _headers
                                })
                                await page.evaluate("""([url, _headers,realUrls]) => {
                                window.realUrl = url
                                window.realHeaders = _headers
                                window.realUrls = realUrls
                                }
                                """, [url, _headers, realUrls])
                                self.log('on_request通过head请求嗅探到真实地址:', url)
                                if mode == 0:
                                    page.remove_listener("request", _on_request)

                                return True
                        except Exception as e:
                            print(f'head请求访问: {url} 发生了错误:{e}')

                        headUrls.append(url)

        page.on('request', _on_request)
        # 设置全局导航超时
        page.set_default_navigation_timeout(timeout)
        # 设置全局等待超时
        page.set_default_timeout(timeout)
        await page.expose_function("log", lambda *args: print(*args))
        await page.add_init_script(path=os.path.join(os.path.dirname(__file__), './preload.js'))
        await page.evaluate("""
        window.realUrl = ''
        window.realHeaders = {}
        window.realUrls = []
        """)
        try:
            await page.goto(playUrl)
        except Exception as e:
            self.log('嗅探发生错误:', e)
            t2 = time()
            cost = round((t2 - t1) * 1000, 2)
            return {'url': '', 'headers': {}, 'from': playUrl, 'cost': cost, 'code': 404,
                    'msg': f'嗅探失败:{e}'}

        # 这里不需要另外分支去判断状态为load，因为嗅探无需等待页面加载完毕。异步就行。一般也不传css
        if do_css:
            await page.wait_for_selector(do_css)

        if script:
            if not do_css:
                await page.wait_for_load_state('load')
            try:
                await page.evaluate("""(script) => {
                eval(script);
                }
                """, script)
                self.log(f'网页加载完成后成功执行脚本:{script}')
            except Exception as e:
                self.log(f'网页加载完成后执行脚本:{script}发生错误:{e}')

        is_timeout = False
        if mode == 0:
            try:
                await page.wait_for_function("() => window.realUrl")
            except:
                is_timeout = True
        elif mode == 1:
            try:
                await page.wait_for_timeout(timeout)
            except:
                is_timeout = True

        realUrl = await page.evaluate('window.realUrl')
        realHeaders = await page.evaluate('window.realHeaders')
        realUrls = await page.evaluate('window.realUrls')

        t2 = time()
        cost = round((t2 - t1) * 1000, 2)
        cost_str = f'{cost} ms'
        self.log(f'共计耗时{cost}毫秒|{"已超时" if is_timeout else "未超时"}')
        self.log('realUrl:', realUrl)
        self.log('realHeaders:', realHeaders)
        await self.close_page(page)
        if mode == 0 and realUrl:
            return {'url': realUrl, 'headers': realHeaders, 'from': playUrl, 'cost': cost_str, 'code': 200,
                    'msg': '超级嗅探解析成功'}
        elif mode == 1 and realUrls:
            return {'urls': realUrls, 'code': 200, 'from': playUrl, 'cost': cost_str, 'msg': '超级嗅探解析成功'}
        else:
            return {'url': realUrl, 'headers': realHeaders, 'from': playUrl, 'cost': cost_str, 'code': 404,
                    'msg': '超级嗅探解析失败'}


async def main_test():
    t1 = time()
    urls = [
        # 'https://www.cs1369.com/play/2-1-94.html',
        # 'https://m.ting13.cc/play/19176_1_91258.html',
        'https://v.qq.com/x/page/i3038urj2mt.html',
        'http://www.mgtv.com/v/1/290346/f/3664551.html',
        'https://jx.jsonplayer.com/player/?url=https://m.iqiyi.com/v_1pj3ayb1n70.html',
        'https://jx.yangtu.top/?url=https://m.iqiyi.com/v_1pj3ayb1n70.html',
    ]
    _count = 0
    async with Sniffer(debug=True, headless=True) as browser:
        # 在这里，async_func已被调用并已完成
        pass
    for url in urls:
        _count += 1
        ret = await browser.snifferMediaUrl(url, timeout=15000)
        print(ret)

    _count += 1
    ret = await browser.snifferMediaUrl('https://jx.yangtu.top/?url=https://m.iqiyi.com/v_1pj3ayb1n70.html',
                                        custom_regex='http((?!http).){12,}?(download4|pcDownloadFile)')
    print(ret)
    # _count += 1
    # ret = await browser.fetCodeByWebView('https://www.freeok.pro/xplay/63170-8-12.html')
    # print(ret)

    await browser.close()
    t2 = time()
    print(f'嗅探{_count}个页面共计耗时:{round(t2 - t1, 2)}s')


if __name__ == '__main__':
    asyncio.run(main_test())
