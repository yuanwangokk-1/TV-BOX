# coding=utf-8
# !/usr/bin/python
import requests
from bs4 import BeautifulSoup
import re
from base.spider import Spider
import sys
import json
import os
import base64

sys.path.append('..')
xurl = 'http://www.misoso.cc'
headerx = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.87 Safari/537.36'
}


class Spider(Spider):
    global xurl
    global headerx

    def getName(self):
        return "首页"

    def init(self, extend):
        pass

    def isVideoFormat(self, url):
        pass

    def manualVideoCheck(self):
        pass

    def homeContent(self, filter):
        pass
        return result

    def homeVideoContent(self):

        pass

    def categoryContent(self, cid, pg, filter, ext):
        pass

    def detailContent(self, ids):
        purl=ids[0]
        vod = {
            'vod_id': '',
            'vod_name': '',
            'vod_pic': '',
            'type_name': '',
            'vod_year': '',
            'vod_area': '',
            'vod_remarks': '',
            'vod_actor': '',
            'vod_director': '',
            'vod_content': '',
            'vod_play_from': '集多网盘',
            'vod_play_url': purl
        }
        params = {
            "do": "push",
            "url": purl
        }
        response = requests.post("http://127.0.0.1:9978/action", data=params, headers={
            "Content-Type": "application/x-www-form-urlencoded"
        })
        return {'list': [vod]}
       

    def playerContent(self, flag, id, vipFlags):
        pass

    def searchContentPage(self, key, quick, page='1'):
        videos = []
        data={"page":int(page),
              "q":key,
              "user":"",
              "exact":False,
              "format":[],"share_time":"","size":15,"type":"","exclude_user":[],"adv_params":{"wechat_pwd":"","platform":"pc"}}
        res=requests.post(f'{xurl}/v1/search/disk',json=data,headers=headerx).text
        js1=json.loads(res)
        for i in js1['data']['list']:
            id=i['link']
            name=i['disk_name'].replace('<em>', "").replace('</em>', "")
            if 'drive.uc' in id:
                pic='https://img1.baidu.com/it/u=2031987711,74538878&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=505'
            if 'pan.quark' in id:
                pic='https://img2.baidu.com/it/u=1963522584,2950363542&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
            if 'pan.baidu' in id:
                pic='https://bkimg.cdn.bcebos.com/pic/35a85edf8db1cb13b7bc9af2d354564e93584b7e'
            if 'pan.baidu' in id:
                pic='https://bkimg.cdn.bcebos.com/pic/35a85edf8db1cb13b7bc9af2d354564e93584b7e'
            remarks=i['shared_time']
            videos.append({
                    'vod_id': id,
                    'vod_name': name,
                    'vod_pic': pic,
                    'vod_remarks': remarks
                })
        return {'list': videos, 'page': page}

    def searchContent(self, key, quick):
        return self.searchContentPage(key, quick, '1')

    def searchContent(self, key, quick, pg):
        return self.searchContentPage(key, quick, pg)



    def localProxy(self, params):
        if params['type'] == "m3u8":
            return self.proxyM3u8(params)
        elif params['type'] == "media":
            return self.proxyMedia(params)
        elif params['type'] == "ts":
            return self.proxyTs(params)
        return None
