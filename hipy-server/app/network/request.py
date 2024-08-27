# -*- coding: utf-8 -*-
"""
Created on 2023-05-05 17:28
---------
@summary: 爬虫入口
---------
@author: pepsi
"""
import httpx
import random
from core.config import settings
from utils import define


class Request:
    __REQUEST_ATTRS__ = {
        # "method",
        # "url",
        "params",
        "data",
        "headers",
        "cookies",
        "files",
        "auth",
        "timeout",
        "allow_redirects",
        # "proxies",
        "hooks",
        "cert",
        "json",
        "follow_redirects"
    }

    def __init__(
            self,
            url,
            agent=True,
            method="GET",
            **kwargs,
    ):
        """
        以下参数与requests参数使用方式一致
        @param method: 请求方式，如POST或GET，默认根据data值是否为空来判断
        @param params: 请求参数
        @param data: 请求body
        @param json: 请求json字符串，同 json.dumps(data)
        @param headers:
        @param cookies: 字典 或 CookieJar 对象
        @param files:
        @param auth:
        @param timeout: (浮点或元组)等待服务器数据的超时限制，是一个浮点数，或是一个(connect timeout, read timeout) 元组
        @param allow_redirects : Boolean. True 表示允许跟踪 POST/PUT/DELETE 方法的重定向
        @param proxies: 代理 {"http":"http://xxx", "https":"https://xxx"}
        @param verify: 为 True 时将会验证 SSL 证书
        @param stream: 如果为 False，将会立即下载响应内容
        @param cert:
        --
        @param **kwargs: 其他值: 如 Request(item=item) 则item可直接用 request.item 取出
        ---------
        @result:
        """
        self.url = url
        self.agent = agent
        self.method = method
        # 自定义属性，不参与序列化
        self.requests_kwargs = {}
        for key, value in kwargs.items():
            if key in self.__class__.__REQUEST_ATTRS__:  # 取requests参数
                self.requests_kwargs[key] = value

            self.__dict__[key] = value

    def __setattr__(self, key, value):
        """
        针对 request.xxx = xxx 的形式，更新reqeust及内部参数值
        @param key:
        @param value:
        @return:
        """
        self.__dict__[key] = value

        if key in self.__class__.__REQUEST_ATTRS__:
            self.requests_kwargs[key] = value

    def make_requests_kwargs(self):

        if not self.requests_kwargs.get("timeout"):
            self.requests_kwargs.setdefault(
                "timeout", define.DEFAULT_REQUEST_TIMEOUT
            )

        method = self.__dict__.get("method")
        if not method:
            if "data" in self.requests_kwargs or "json" in self.requests_kwargs:
                method = "POST"
            else:
                method = "GET"
        self.method = method

        headers = self.requests_kwargs.get("headers", {})
        if "user-agent" not in headers and "User-Agent" not in headers:
            headers.update({"User-Agent": define.DEFAULT_USER_AGENT})  # 默认ua
            self.requests_kwargs.update(headers=headers)

    async def fetch(self):
        self.make_requests_kwargs()
        if self.agent:
            proxies = {
                "http://": random.choice(settings.IP_AGENTS),
            }
        else:
            proxies = self.__dict__.get("proxies", {})
        async with httpx.AsyncClient(proxies=proxies) as session:
            response = await session.request(method=self.method, url=self.url, **self.requests_kwargs)
            return response

    def request(self):
        self.make_requests_kwargs()
        if self.agent:
            proxies = {
                "http://": random.choice(settings.IP_AGENTS),
            }
        else:
            proxies = self.__dict__.get("proxies", {})
        response = httpx.Client(proxies=proxies).request(method=self.method, url=self.url, **self.requests_kwargs)
        return response
