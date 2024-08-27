#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : drpy3_rule_test.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Date  : 2024/3/8

import pythonmonkey as pm
from pythonmonkey import eval as js_eval, require as js_require
from utils.quickjs_ctx import initGlobalThis

print(pm.__version__)
initGlobalThis(pm)

if __name__ == '__main__':
    test_rule_url = 'https://ghproxy.liuzhicong.com/https://github.com/hjdhnx/dr_py/raw/main/js/996%E5%BD%B1%E8%A7%86.js'

    drpy = js_require('../files/drpy3_libs/drpy3.js')
    print(drpy)
    # drpy.init(test_rule_url)

    # with open('../files/drpy_js/996影视.js', encoding='utf-8') as f:
    # with open('../files/drpy_js/量子资源.js', encoding='utf-8') as f:
    # with open('../files/drpy_js/小蚂蚁资源2.js', encoding='utf-8') as f:
    with open('../files/drpy_js/非凡资源.js', encoding='utf-8') as f:
        rule = f.read()
    drpy.init(rule)

    # print(drpy.home())
    # print(drpy.homeVod())
    # print(drpy.category(13,1,False,{}))
    # print(drpy.detail('13$65765'))
    # print(drpy.play('索尼','https://www.cs1369.com/play/790-1-1.html',[]))
    # print(drpy.play('feifan','https://super.ffzy-online6.com/share/636e0538092a048a7d49aa0b20e2bff1',[]))
    print(drpy.search('斗罗大陆',False,1))
