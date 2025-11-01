# coding = utf-8
# !/usr/bin/python

"""

作者 丢丢喵推荐 🚓 内容均从互联网收集而来 仅供交流学习使用 版权归原创者所有 如侵犯了您的权益 请通知作者 将及时删除侵权内容
                    ====================Diudiumiao====================

"""

from Crypto.Util.Padding import unpad
from Crypto.Util.Padding import pad
from urllib.parse import unquote
from Crypto.Cipher import ARC4
from urllib.parse import quote
from base.spider import Spider
from Crypto.Cipher import AES
from datetime import datetime
from bs4 import BeautifulSoup
from base64 import b64decode
import urllib.request
import urllib.parse
import datetime
import binascii
import requests
import base64
import json
import time
import sys
import re
import os

sys.path.append('..')

xurl = "https://new.tianjinzhitongdaohe.com"

headers = {
    "Cache-Control": "no-cache",
    "Content-Type": "application/json;charset=UTF-8",
    "User-Agent": "okhttp/4.12.0"
          }

headerx = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.87 Safari/537.36'
          }

class Spider(Spider):
    global xurl
    global headers
    global headerx

    def getName(self):
        return "首页"

    def init(self, extend):
        pass

    def isVideoFormat(self, url):
        pass

    def manualVideoCheck(self):
        pass

    def extract_middle_text(self, text, start_str, end_str, pl, start_index1: str = '', end_index2: str = ''):
        if pl == 3:
            plx = []
            while True:
                start_index = text.find(start_str)
                if start_index == -1:
                    break
                end_index = text.find(end_str, start_index + len(start_str))
                if end_index == -1:
                    break
                middle_text = text[start_index + len(start_str):end_index]
                plx.append(middle_text)
                text = text.replace(start_str + middle_text + end_str, '')
            if len(plx) > 0:
                purl = ''
                for i in range(len(plx)):
                    matches = re.findall(start_index1, plx[i])
                    output = ""
                    for match in matches:
                        match3 = re.search(r'(?:^|[^0-9])(\d+)(?:[^0-9]|$)', match[1])
                        if match3:
                            number = match3.group(1)
                        else:
                            number = 0
                        if 'http' not in match[0]:
                            output += f"#{match[1]}${number}{xurl}{match[0]}"
                        else:
                            output += f"#{match[1]}${number}{match[0]}"
                    output = output[1:]
                    purl = purl + output + "$$$"
                purl = purl[:-3]
                return purl
            else:
                return ""
        else:
            start_index = text.find(start_str)
            if start_index == -1:
                return ""
            end_index = text.find(end_str, start_index + len(start_str))
            if end_index == -1:
                return ""

        if pl == 0:
            middle_text = text[start_index + len(start_str):end_index]
            return middle_text.replace("\\", "")

        if pl == 1:
            middle_text = text[start_index + len(start_str):end_index]
            matches = re.findall(start_index1, middle_text)
            if matches:
                jg = ' '.join(matches)
                return jg

        if pl == 2:
            middle_text = text[start_index + len(start_str):end_index]
            matches = re.findall(start_index1, middle_text)
            if matches:
                new_list = [f'{item}' for item in matches]
                jg = '$$$'.join(new_list)
                return jg

    def homeContent(self, filter):
        result = {"class": []}

        payload = {}
        url = f"{xurl}/api/v1/app/screen/screenType"
        response = requests.post(url=url, headers=headers, json=payload)
        if response.status_code == 200:
            data = response.json()

            setup = data['data'][0]['children'][0]['children']

            for vod in setup:

                name = vod['name']

                result["class"].append({"type_id": name, "type_name": "🌠" + name})

        return result

    def homeVideoContent(self):
        pass

    def categoryContent(self, cid, pg, filter, ext):
        result = {}
        videos = []

        if pg:
            page = int(pg)
        else:
            page = 1

        payload = {
            "condition": {
                "classify": cid,
                "typeId": "S1"
                         },
            "pageNum": str(page),
            "pageSize": 40
                  }

        url = f"{xurl}/api/v1/app/screen/screenMovie"
        response = requests.post(url=url, headers=headers, json=payload)
        if response.status_code == 200:
            data = response.json()

            setup = data['data']['records']

            for vod in setup:

                name = vod['name']

                id = vod['id']

                pic = vod['cover']

                remark = vod['classify']

                video = {
                    "vod_id": id,
                    "vod_name": name,
                    "vod_pic": pic,
                    "vod_remarks": '▶️' + remark
                        }
                videos.append(video)

        result = {'list': videos}
        result['page'] = pg
        result['pagecount'] = 9999
        result['limit'] = 90
        result['total'] = 999999
        return result

    def detailContent(self, ids):
        did = ids[0]
        result = {}
        videos = []
        xianlu = ''
        bofang = ''

        payload = {
            "id": did,
            "typeId": "S1"
                  }

        url = f"{xurl}/api/v1/app/play/movieDesc"
        response = requests.post(url=url, headers=headers, json=payload)
        if response.status_code == 200:
            data = response.json()

        url = 'http://rihou.cc:88/je.json'
        response = requests.get(url)
        response.encoding = 'utf-8'
        code = response.text
        name = self.extract_middle_text(code, "s1='", "'", 0)
        Jumps = self.extract_middle_text(code, "s2='", "'", 0)

        content = '集多为您介绍剧情📢' + data.get('data', {}).get('introduce', '') if data.get('data', {}).get('introduce') is not None else '未知'

        if name not in content:
            bofang = Jumps
            xianlu = '1'
        else:
            payload = {
                "id": did,
                "source": 0,
                "typeId": "S1",
                "userId": "223664"
                      }

            url = f"{xurl}/api/v1/app/play/movieDetails"
            response = requests.post(url=url, headers=headers, json=payload)
            if response.status_code == 200:
                data = response.json()

                soup = data['data']['episodeList']

                for sou in soup:

                    id = str(did) + "@" + str(sou['id'])

                    name = sou['episode']

                    bofang = bofang + name + '$' + str(id) + '#'

                bofang = bofang[:-1]

                xianlu = '集多专线'

        videos.append({
            "vod_id": did,
            "vod_content": content,
            "vod_play_from": xianlu,
            "vod_play_url": bofang
                     })

        result['list'] = videos
        return result

    def playerContent(self, flag, id, vipFlags):

        fenge = id.split("@")

        payload = {
            "episodeId": fenge[1],
            "id": fenge[0],
            "source": 0,
            "typeId": "S1",
            "userId": "223664"
                  }

        url = f"{xurl}/api/v1/app/play/movieDetails"
        response = requests.post(url=url, headers=headers, json=payload)
        if response.status_code == 200:
            data = response.json()
            url = data['data']['url']

        result = {}
        result["parse"] = 0
        result["playUrl"] = ''
        result["url"] = url
        result["header"] = headerx
        return result

    def searchContentPage(self, key, quick, pg):
        result = {}
        videos = []

        if pg:
            page = int(pg)
        else:
            page = 1

        payload = {
            "condition": {
                "typeId": "S1",
                "value": key
                         },
            "pageNum": str(page),
            "pageSize": 40
                  }

        url = f"{xurl}/api/v1/app/search/searchMovie"
        response = requests.post(url=url, headers=headers, json=payload)
        if response.status_code == 200:
            data = response.json()

            setup = data['data']['records']

            for vod in setup:
                name = vod['name']

                id = vod['id']

                pic = vod['cover']

                remark = vod['year']

                video = {
                    "vod_id": id,
                    "vod_name": name,
                    "vod_pic": pic,
                    "vod_remarks": '集多▶️' + remark
                        }
                videos.append(video)

        result['list'] = videos
        result['page'] = pg
        result['pagecount'] = 9999
        result['limit'] = 90
        result['total'] = 999999
        return result

    def searchContent(self, key, quick, pg="1"):
        return self.searchContentPage(key, quick, '1')

    def localProxy(self, params):
        if params['type'] == "m3u8":
            return self.proxyM3u8(params)
        elif params['type'] == "media":
            return self.proxyMedia(params)
        elif params['type'] == "ts":
            return self.proxyTs(params)
        return None








