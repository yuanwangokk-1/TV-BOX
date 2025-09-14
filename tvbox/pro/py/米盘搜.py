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
        return "米盘搜"

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
        try:
            # 解码ID获取链接信息
            data = json.loads(bytes.fromhex(ids[0]).decode())
            purl = data['url']
            
            # 如果有密码且链接中不包含密码参数，则添加密码
            if data.get('password') and not re.search(r'pwd=|密码', purl):
                purl = f"{purl}{'&' if '?' in purl else '?'}pwd={data['password']}"
                
            print("获取盘链接为：", purl)
            
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
                'vod_play_from': '米盘搜',
                'vod_play_url': purl
            }
            
            # 推送链接到本地服务
            params = {
                "do": "push",
                "url": purl 
            }        
            response = requests.post("http://127.0.0.1:9978/action", data=params, headers={
                "Content-Type": "application/x-www-form-urlencoded"
            })
            
            return {'list': [vod]}
        except Exception as e:
            print(e)
            # 如果解码失败，尝试直接使用ID作为链接
            purl = ids[0]
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
                'vod_play_from': '米盘搜',
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
        data = {
            "page": int(page),
            "q": key,
            "user": "",
            "exact": False,
            "format": [],
            "share_time": "",
            "size": 15,
            "type": "",
            "exclude_user": [],
            "adv_params": {
                "wechat_pwd": "",
                "platform": "pc"
            }
        }
        res = requests.post(f'{xurl}/v1/search/disk', json=data, headers=headerx).text
        js1 = json.loads(res)
        for i in js1['data']['list']:
            url = i['link']
            name = i['disk_name'].replace('<em>', "").replace('</em>', "")
            
            # 根据链接类型设置不同的图标
            if 'drive.uc' in url:
                pic = 'https://img1.baidu.com/it/u=2031987711,74538878&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=505'
            elif 'pan.quark' in url:
                pic = 'https://img2.baidu.com/it/u=1963522584,2950363542&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
            elif 'pan.baidu' in url:
                pic = 'https://bkimg.cdn.bcebos.com/pic/35a85edf8db1cb13b7bc9af2d354564e93584b7e'
            else:
                pic = 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.alicdn.com%2Fbao%2Fuploaded%2Fi4%2F2213060290763%2FO1CN01joakK61HVUwob2JIJ_%21%212213060290763.jpg&refer=http%3A%2F%2Fimg.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1757745912&t=e7b98fced3a4f092c8ef26490997b004'
            
            # 编码链接信息，包括URL和可能的密码
            link_data = {
                "url": url,
                "password": i.get('password', '')
            }
            vid = json.dumps(link_data).encode().hex()
            
            videos.append({
                'vod_id': vid,
                'vod_name': name,
                'vod_pic': pic,
                'vod_remarks': i.get('shared_time', '')
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
