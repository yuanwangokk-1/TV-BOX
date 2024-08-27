#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : snifferProOld.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Date  : 2024/3/26
# desc 利用playwright实现的简易播放地址嗅探器
import os.path
from urllib.parse import urlparse
from time import time
import re

try:
    from playwright.sync_api import sync_playwright
except ImportError:
    sync_playwright = None

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
    delta: int = 50
    playwright = None
    browser = None
    main_page = None
    context = None
    requests = None
    user_agent: str = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.50 Safari/537.36'
    pages = []

    def __init__(self,
                 timeout=10000, head_timeout=200, user_agent=None,
                 custom_regex=None, headless=True, debug=False):
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
        self.browser = self.init_browser()

    def log(self, *args):
        """
        打印日志print函数|根据类的实例化是否传入debug=True进行开启打印
        @param args:
        @return:
        """
        if self.debug:
            print(*args)

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

    def close_page(self, page):
        """
        移除页面储存列表的指定page
        @param page:
        @return:
        """
        self.pages = self.remove_element(self.pages, page)
        page.close()
        self.log('成功关闭page')

    def init_browser(self):
        """
        初始化驱动程序
        @return:
        """
        # 不用with的用法,单独开启进程
        self.playwright = sync_playwright().start()
        # 用手动安装的chrome浏览器。不用它自带的三个垃圾浏览器
        browser = self.playwright.chromium.launch(channel="chrome", headless=self.headless)
        # 模拟使用苹果手机
        iphone = self.playwright.devices["iPhone 12 Pro"]
        context = browser.new_context(**iphone)
        # 开启一个主窗口方便后续的page新开和关闭不会退出程序
        self.main_page = context.new_page()
        # 上下文自带的request库，跟requests库有点类似，但是用法也有差别
        self.requests = context.request
        return browser

    def setCookie(self, page, cookie=''):
        """
        设置cookie。可以在嗅探前或者获取源码前设置
        @param _dict:
        @return:
        """
        page.set_extra_http_headers(headers={'Cookie': cookie})

    @staticmethod
    def _route_interceptor(route):
        """
        全局路由拦截器,禁止加载某些资源
        @param route:
        @return:
        """
        excluded_resource_types = ["stylesheet", "image", "font"]
        if route.request.resource_type in excluded_resource_types:
            # print('禁止加载资源:', excluded_resource_types, route.request.url, route.request.resource_type)
            route.abort()
        else:
            route.continue_()

    @staticmethod
    def _on_dialog(dialog):
        """
        全局弹窗拦截器
        @param dialog:
        @return:
        """
        # print('on_dialog:', dialog)
        dialog.accept()

    @staticmethod
    def _on_pageerror(error):
        """
        全局页面请求错误拦截器
        @param error:
        @return:
        """
        # print('on_pageerror:', error)
        pass

    def _get_page(self, headers=None):
        """
        新建一个页面。注入好相关依赖
        @param headers:
        @return:
        """
        page = self.browser.new_page()

        # 添加初始化脚本 提高速度并且过无法播放的验证
        page.add_init_script(path=os.path.join(os.path.dirname(__file__), './stealth.min.js'))
        # 设置全局导航超时
        page.set_default_navigation_timeout(self.timeout)
        # 设置全局等待超时
        page.set_default_timeout(self.timeout)
        # 设置请求头
        if headers is not None:
            page.set_extra_http_headers(headers=headers)
        else:
            page.set_extra_http_headers(headers={'user-agent': self.user_agent})

        # 打开静态资源拦截器
        page.route(re.compile(r"\.(png|jpg|jpeg|css|ttf)$"), self._route_interceptor)
        # 打开弹窗拦截器
        page.on("dialog", self._on_dialog)
        # 打开页面错误监听
        page.on("pageerror", self._on_pageerror)

        # page.set_viewport_size({"width": 360, "height": 540})
        # 加入页面列表
        self.pages.append(page)
        return page

    def fetCodeByWebView(self, url, headers=None):
        """
        利用webview请求得到渲染完成后的源码
        @param url: 待获取源码的url
        @return:
        """
        page = self._get_page(headers)
        response = {'content': '', 'headers': {'location': url}}
        try:
            page.goto(url)
        except Exception as e:
            self.log(f'发生了错误:{e}')
        else:
            page.wait_for_load_state('load')
            response['content'] = page.content()
            response['headers']['location'] = page.url

        self.close_page(page)
        return response

    def snifferMediaUrl(self, playUrl, mode=0, custom_regex=None, timeout=None):
        """
        输入播放地址，返回嗅探到的真实视频链接
        @param playUrl: 播放网页地址
        @param mode: 模式:0 嗅探到一个就返回 1:在10秒内嗅探所有的返回列表
        @param custom_regex: 自定义嗅探正则
        @param timeout: 超时
        @return:
        """
        if custom_regex is None:
            custom_regex = self.custom_regex
        realUrl = ''
        realHeaders = {}
        realUrls = []
        headUrls = []
        t1 = time()
        page = self._get_page()
        if timeout is None:
            timeout = self.timeout

        def _on_request(request):
            nonlocal realUrl, realHeaders, realUrls
            if realUrl and mode == 0:
                return True
            url = request.url
            method = request.method
            headers = request.headers
            resource_type = request.resource_type
            self.log('on_request:', url, ' method:', method, ' resource_type:', resource_type)
            if custom_regex and re.search(custom_regex, url, re.M | re.I):
                realUrl = url
                realHeaders = {}
                if headers.get('referer'):
                    realHeaders['referer'] = headers['referer']
                if headers.get('user-agent'):
                    realHeaders['user-agent'] = headers['user-agent']
                realUrls.append({
                    'url': realUrl,
                    'headers': realHeaders
                })
                self.log('on_request通过custom_regex嗅探到真实地址:', realUrl)
                if mode == 0:
                    page.remove_listener("request", _on_request)
                return True

            if re.search(self.urlRegex, url, re.M | re.I):
                if url.find('url=http') < 0 and url.find('v=http') < 0 and url.find('.css') < 0 and url.find(
                        '.html') < 0:
                    realUrl = url
                    realHeaders = {}
                    if headers.get('referer'):
                        realHeaders['referer'] = headers['referer']
                    if headers.get('user-agent'):
                        realHeaders['user-agent'] = headers['user-agent']
                    realUrls.append({
                        'url': realUrl,
                        'headers': realHeaders
                    })
                    self.log('on_request通过默认正则已嗅探到真实地址:', realUrl)
                    if mode == 0:
                        page.remove_listener("request", _on_request)
                    return True
            elif str(method).lower() == 'get' and str(url).startswith('http') and url != playUrl:
                parsed_url = urlparse(url)
                path = parsed_url.path
                filename = str(path.split('/')[-1])
                # 链接不含.并且正则匹配不在不head列表  或者 链接有.但是.后面没内容，也算空后缀
                if (filename and '.' not in filename and not re.search(self.urlNoHead, url, re.M | re.I)) or (
                        '.' in filename and len(filename) > 1 and not filename.split('.')[1]):
                    # 如果链接没有进行过head请求。防止多次嗅探的时候重复去head请求
                    if url not in headUrls:
                        try:
                            r = self.requests.head(url=url, timeout=self.head_timeout)
                            rheaders = r.headers
                            if rheaders.get('content-type') and rheaders[
                                'content-type'] == 'application/octet-stream' and '.m3u8' in rheaders[
                                'content-disposition']:
                                realUrl = url
                                realHeaders = {}
                                if headers.get('referer'):
                                    realHeaders['referer'] = headers['referer']
                                if headers.get('user-agent'):
                                    realHeaders['user-agent'] = headers['user-agent']
                                realUrls.append({
                                    'url': realUrl,
                                    'headers': realHeaders
                                })
                                self.log('on_request通过head请求嗅探到真实地址:', realUrl)
                                if mode == 0:
                                    page.remove_listener("request", _on_request)

                                return True
                        except Exception as e:
                            print(f'head请求访问: {url} 发生了错误:{e}')

                        headUrls.append(url)

        page.on('request', _on_request)
        cost = 0
        num = 0
        try:
            page.goto(playUrl)
        except Exception as e:
            self.log('嗅探发生错误:', e)
            return {'url': realUrl, 'headers': {}, 'from': playUrl, 'cost': cost, 'code': 404,
                    'msg': '嗅探失败'}

        while cost < timeout and (not realUrl or mode == 1):
            num += 1
            # self.log(f'第{num}次嗅探')
            page.wait_for_timeout(self.delta)
            t2 = time()
            cost = round((t2 - t1) * 1000, 2)

        t2 = time()
        cost = round((t2 - t1) * 1000, 2)
        cost_str = f'{cost} ms'
        self.log(f'共计耗时{cost}毫秒')
        self.log('realUrl:', realUrl)
        self.log('realHeaders:', realHeaders)
        self.close_page(page)
        if mode == 0 and realUrl:
            return {'url': realUrl, 'headers': realHeaders, 'from': playUrl, 'cost': cost_str, 'code': 200,
                    'msg': '超级嗅探解析成功'}
        elif mode == 1 and realUrls:
            return {'urls': realUrls, 'code': 200, 'from': playUrl, 'cost': cost_str, 'msg': '超级嗅探解析成功'}
        else:
            return {'url': realUrl, 'headers': realHeaders, 'from': playUrl, 'cost': cost_str, 'code': 404,
                    'msg': '超级嗅探解析失败'}

    def close(self):
        """
        用完记得关闭驱动器
        @return:
        """
        self.main_page.close()
        self.browser.close()
        self.playwright.stop()


def main_test():
    t1 = time()
    urls = [
        'https://www.cs1369.com/play/2-1-94.html',
        'https://v.qq.com/x/page/i3038urj2mt.html',
        'http://www.mgtv.com/v/1/290346/f/3664551.html',
        'https://jx.jsonplayer.com/player/?url=https://m.iqiyi.com/v_1pj3ayb1n70.html',
    ]
    _count = 0
    browser = Sniffer(debug=True)
    for url in urls:
        _count += 1
        ret = browser.snifferMediaUrl(url)
        print(ret)

    _count += 1
    ret = browser.snifferMediaUrl('https://jx.yangtu.top/?url=https://m.iqiyi.com/v_1pj3ayb1n70.html',
                                  custom_regex='http((?!http).){12,}?(download4|pcDownloadFile)')
    print(ret)
    _count += 1
    ret = browser.fetCodeByWebView('https://www.freeok.pro/xplay/63170-8-12.html')
    print(ret)

    browser.close()
    t2 = time()
    print(f'嗅探{_count}个页面共计耗时:{round(t2 - t1, 2)}s')


def demo_test():
    t1 = time()
    browser = Sniffer(debug=True)
    ret = browser.fetCodeByWebView('https://www.ip.cn/api/index?ip&type=0')
    print(ret)
    browser.close()
    t2 = time()
    print(f'访问ip网站源码共计耗时:{round(t2 - t1, 2)}s')


def demo_test_csdn():
    browser = Sniffer(debug=True)
    ret = browser.fetCodeByWebView('https://blog.csdn.net/qq_32394351')
    print(ret)


if __name__ == '__main__':
    demo_test()
    # demo_test_csdn()
    # main_test()
