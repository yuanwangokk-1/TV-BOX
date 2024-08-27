#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : qjs_drpy_test.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Author's Blog: https://blog.csdn.net/qq_32394351
# Date  : 2024/4/13

from qjs_drpy import Drpy

if __name__ == '__main__':
    drpy = Drpy(debug=1)
    # drpy.init('https://ghproxy.liuzhicong.com/https://github.com/hjdhnx/dr_py/raw/main/js/荐片.js')
    # drpy.init('https://ghproxy.liuzhicong.com/https://github.com/hjdhnx/dr_py/raw/main/js/555影视[飞].js')
    # drpy.init('https://ghproxy.liuzhicong.com/https://github.com/hjdhnx/dr_py/raw/main/js/农民影视.js')
    # drpy.init('https://ghproxy.liuzhicong.com/https://github.com/hjdhnx/dr_py/raw/main/js/996影视.js')
    # drpy.init('https://ghproxy.liuzhicong.com/https://github.com/hjdhnx/dr_py/raw/main/js/奇珍异兽.js')
    # with open('../files/drpy_js/freeok.js', encoding='utf-8') as f:
    # with open('../files/drpy_js/农民影视2.js', encoding='utf-8') as f:
    # with open('../files/drpy_js/农民影视.js', encoding='utf-8') as f:
    # with open('../files/drpy_js/农民影视新.js', encoding='utf-8') as f:
    # with open('../files/drpy_js/小蚂蚁资源2.js', encoding='utf-8') as f:
    # with open('../files/drpy_js/爱看机器人.js', encoding='utf-8') as f:
    # with open('../files/drpy_js/荐片.js', encoding='utf-8') as f:
    # with open('../files/drpy_js/我的哔哩.js', encoding='utf-8') as f:
    # with open('../files/drpy_js/腾云驾雾.js', encoding='utf-8') as f:
    # with open('../files/drpy_js/非凡资源.js', encoding='utf-8') as f:
    # with open('../files/drpy_js/白嫖影视.js', encoding='utf-8') as f:
    # with open('../files/drpy_js/量子资源.js', encoding='utf-8') as f:
    with open('../files/drpy_js/美益达.js', encoding='utf-8') as f:
        # with open('../files/drpy_js/耐看.js', encoding='utf-8') as f:
        code = f.read()
    code = code.replace('$nmjx_url', 'http://127.0.0.1:5708/nm?all=&url=')
    drpy.init(code)
    drpy.setDebug(1)
    # print(drpy.homeContent())
    # print(drpy.homeVideoContent())
    # print(drpy.categoryContent('2', 1, False, {}))
    # print(drpy.detailContent('https://myd02.com/voddetail/21258.html'))
    # print(drpy.detailContent('https://v.ikanbot.com/play/846474'))
    # print(drpy.detailContent('https://www.baipiaoys.com:9092/detail/2067.html'))
    # print(drpy.detailContent('https://m.emsdn.cn/vod-detail-id-38817.html'))
    # print(drpy.categoryContent('13', 1, False, {}))
    # print(drpy.detailContent('17146'))
    # print(drpy.playerContent("NBY", "NBY-45436c2c032eb5bb3efa57b8a46a5d6b", []))
    # print(drpy.playerContent("白嫖播放器", "https://www.baipiaoys.com:9092/play/2067-1-1.html", []))
    # print(drpy.playerContent("线路①", "https://m.emsdn.cn/vod-play-id-38817-src-1-num-1.html", []))
    # print(drpy.playerContent("feifan", "https://svipsvip.ffzy-online5.com/20240411/25858_b99d1783/index.m3u8", []))
    # f = quickjs.Function(
    #     "adder", """
    #             function adder(x, y) {
    #                 return x + y;
    #             }
    #             """)

    # print(drpy.categoryContent('3', 1, False, {}))
    # print(drpy.categoryContent('2', 1, False, {}))
    # print(drpy.detailContent("3$/detail/790.html"))
    # print(drpy.detailContent("https://nkvod.com/detail/185851.html"))
    # print(drpy.playerContent("索尼", "https://www.cs1369.com/play/790-1-1.html", []))
    # print(drpy.playerContent("量子资源", "https://nkvod.com/play/185851-2-1.html", []))
    # print(drpy.playerContent("优质", "https://yzzy.play-cdn21.com/20240329/13829_b63e7c01/index.m3u8", []))
    # print(drpy.searchContent("斗罗大陆", False, 1))
