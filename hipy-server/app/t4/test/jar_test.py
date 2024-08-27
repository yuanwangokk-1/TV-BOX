#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : javaLoader.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Author's Blog: https://blog.csdn.net/qq_32394351
# Date  : 2024/1/10

import base64
import json
import os
import jpype
from jpype.types import *
import requests


class SDKUse():

    def __init__(self, jar_path="../spiders/jars/bdys.jar"):
        if not os.path.exists(jar_path):
            raise FileNotFoundError
        self.jar_path = jar_path
        self._prepare_env()
        self.class1 = jpype.JClass("com.C4355b")
        self.class2 = jpype.JClass("com.C4354a")
        self.f1600h = jpype.JClass("com.C4354a")

    def _prepare_env(self):
        jpype.startJVM(classpath=[self.jar_path], convertStrings=False)

    def seg(self, content):
        j_list = jpype.java.util.ArrayList()
        j_list.append(JString(content))
        # res = self.class1.seg(j_list)
        res = self.class1.ByteHexStr('你好'.encode())
        print(res)
        f14728z = bytes([73, 76, 79, 86, 69, 66, 73, 68, 73, 89, 73, 78, 71, 82, 72, 73])
        print(f14728z)
        # self.f1600h.mo12164c(c, f14728z)
        token = self.class1.getToken()
        print(token)
        headers = {"User-Agent": "Dalvik/2.1.0 (Linux; U; Android 7.0; HUAWEI MLA-AL10 Build/HUAWEIMLA-AL10)",
                   "token": str(token)}
        r = requests.get('https://www.bdys03.com/api/v1/search/斗罗大陆/1', headers=headers)
        ret = r.json()
        print(ret)
        data = ret['data']
        print(data)
        bt = base64.b64decode(data)
        print(bt)
        res = self.class1.dec(bt)
        print(type(res), res)
        d1 = json.loads(str(res))
        print(d1)
        print(d1['list'])


if __name__ == '__main__':
    sdk_use = SDKUse()
    sdk_use.seg("自然语言处理爱好者用NLP技术改变未来")
