#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : qjs_drpy.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Date  : 2024/3/20

import os
import threading
import ujson
from quickjs import Context
from utils.quickjs_ctx import initContext
from utils.tools import get_md5
from t4.test.ad_remove import fixAdM3u8
from concurrent.futures import ThreadPoolExecutor, wait


class Drpy:
    def __init__(self, api='drpy', t4_js_api='', debug=0):
        """
        初始化一个drpy类
        @param api: 可以传api如996影视.js
        @param t4_js_api: 本地代理url
        @param debug: 开启调试模式|默认关闭，开启后可以显示源里打印的日志
        """
        key = '_' + get_md5(api)
        self.executor = ThreadPoolExecutor(max_workers=1)
        self._lock = threading.Lock()
        self._api = api
        self.key = key
        self.t4_js_api = t4_js_api
        self.debug = debug
        self.ctx = self.submit(self.initCtx)

    def initCtx(self) -> Context:
        base_path = os.path.dirname(__file__)

        def _(p):
            return os.path.join(base_path, p)

        with open(_('qjs_module_muban.js'), encoding='utf-8') as f:
            _qjs_module_muban = f.read()
        with open(_('qjs_module_cheerio.js'), encoding='utf-8') as f:
            _qjs_module_cheerio = f.read()
        with open(_('qjs_module_gbk.js'), encoding='utf-8') as f:
            _qjs_module_gbk = f.read()
        with open(_('qjs_module_crypto.js'), encoding='utf-8') as f:
            _qjs_module_crypto = f.read()
        with open(_('qjs_module_jsencrypt.js'), encoding='utf-8') as f:
            _qjs_module_jsencrypt = f.read()
        with open(_('qjs_module_nodersa.js'), encoding='utf-8') as f:
            _qjs_module_nodersa = f.read()
        with open(_('qjs_module_pako.js'), encoding='utf-8') as f:
            _qjs_module_pako = f.read()
        with open(_('qjs_module_drpy2.js'), encoding='utf-8') as f:
            _qjs_module_drpy2 = f.read() + f'\nglobalThis.{self.key} = ' + """
            { getRule, init, home, homeVod, category, detail,play, search, proxy, sniffer, isVideo, fixAdM3u8Ai };
            """

        ctx = initContext(Context(), url='', prefix_code='true', env={'debug': self.debug}, getParams=lambda: {},
                          getCryptoJS=lambda: 'true')
        ctx.add_callable('getProxy', lambda is_public: self.getProxyUrl(is_public))
        ctx.module(_qjs_module_muban)
        ctx.module(_qjs_module_cheerio)
        ctx.module(_qjs_module_gbk)
        ctx.module(_qjs_module_crypto)
        ctx.module(_qjs_module_jsencrypt)
        ctx.module(_qjs_module_nodersa)
        ctx.module(_qjs_module_pako)
        ctx.module(_qjs_module_drpy2)
        return ctx

    def submit(self, function, *args):
        with self._lock:
            future = self.executor.submit(function, *args)
            wait([future])
            return future.result()

    def setDebug(self, debug):
        return self.submit(self.ctx.set, '_debug', debug)

    def getName(self):
        return self._api.split('/')[-1]

    def toJsObJect(self, any):
        if isinstance(any, dict) or isinstance(any, list):
            return self.submit(self.ctx.parse_json, ujson.dumps(any, ensure_ascii=False))
        return any

    @staticmethod
    def toDict(_object):
        return ujson.loads(_object.json())

    @staticmethod
    def setDict(_str):
        return ujson.loads(_str)

    def call(self, func: str, *args):
        return self.submit(self._call, func, *args)

    def _call(self, func: str, *args, run_gc=True):
        def convert_arg(arg):
            if isinstance(arg, (type(None), str, bool, float, int)):
                return arg
            else:
                # More complex objects are passed through JSON.
                return self.ctx.parse_json(ujson.dumps(arg, ensure_ascii=False))

        try:
            return self.ctx.eval(f'globalThis.{self.key}.{func}')(*[convert_arg(a) for a in args])
        finally:
            if run_gc:
                self.ctx.gc()

    def init(self, extend=""):
        self.call('init', extend)

    def homeContent(self, filter=None):
        return self.setDict(self.call('home', filter))

    def homeVideoContent(self):
        return self.setDict(self.call('homeVod'))

    def categoryContent(self, tid, pg, filterable, extend):
        return self.setDict(self.call('category', tid, pg, filterable, extend))

    def detailContent(self, ids):
        if isinstance(ids, list):
            ids = ids[0]
        return self.setDict(self.call('detail', ids))

    def searchContent(self, key, quick, pg=1):
        return self.setDict(self.call('search', key, quick, pg))

    def playerContent(self, flag, id, vipFlags=None):
        return self.setDict(self.call('play', flag, id, vipFlags))

    def localProxy(self, params):
        return self.toDict(self.call('proxy', params))

    def getProxyUrl(self, is_public=True):
        """
        获取本地代理地址
        @param is_public: 是否外网
        @return:
        """
        proxy_url = f'http://127.0.0.1:5707/api/v1/vod/{self._api}?pwd=dzyyds&proxy=true&do=js' if is_public else ''
        return self.t4_js_api or proxy_url

    def isVideo(self):
        """
        返回是否为视频的匹配字符串
        @return: None空 reg:正则表达式  js:input js代码
        """
        # rule = self.toDict(self.submit(self.ctx.eval, f'globalThis.{self.key}.getRule()'))
        # rule = self.toDict(self.call('getRule'))
        # is_video_str = str(rule.get('is_video') or '')

        is_video_str = self.call('getRule', 'is_video')
        # print('is_video_str:', is_video_str)
        if is_video_str and not is_video_str.startswith('reg:'):
            is_video_str = 'reg:' + is_video_str
        return is_video_str
        # return 'js:input.includes(".m3u8)?true:false'

    @staticmethod
    def adRemove():
        """
        m3u8广告移除函数。将自动执行返回的字符串的本地代理功能
        @return: None空 reg:正则表达式  js:input js代码
        """
        # return 'reg:/video/adjump.*?ts'

    @staticmethod
    def fixAdM3u8(*args):
        return fixAdM3u8(*args)


if __name__ == '__main__':
    drpy = Drpy(debug=1)
    with open('../files/drpy_js/农民影视新.js', encoding='utf-8') as f:
        code = f.read()
    drpy.init(code)
    drpy.setDebug(1)
    print(drpy.homeContent())
    print(drpy.homeVideoContent())
    print(drpy.categoryContent('2', 1, False, {}))
    print(drpy.searchContent("斗罗大陆", False, 1))
    print(drpy.detailContent('https://m.emsdn.cn/vod-detail-id-38818.html'))
    # f = quickjs.Function(
    #     "adder", """
    #             function adder(x, y) {
    #                 return x + y;
    #             }
    #             """)
    print(drpy.playerContent("线路①", "https://m.emsdn.cn/vod-play-id-38818-src-1-num-1.html", []))
