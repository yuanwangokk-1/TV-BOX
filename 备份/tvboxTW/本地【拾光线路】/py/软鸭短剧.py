# coding=utf-8
# !/usr/bin/python

"""

作者 丢丢喵 🚓 内容均从互联网收集而来 仅供交流学习使用 版权归原创者所有 如侵犯了您的权益 请通知作者 将及时删除侵权内容
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

xurl = "https://api.xingzhige.com"  # 首页 http://play.ruanyazyk.com/drama.html

headerx = {
    'User-Agent': 'Mozilla/5.0 (Linux; U; Android 8.0.0; zh-cn; Mi Note 2 Build/OPR1.170623.032) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/61.0.3163.128 Mobile Safari/537.36 XiaoMi/MiuiBrowser/10.1.1'
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
        result = {}
        result = {"class": [{"type_id": "战神", "type_name": "战神"},
                            {"type_id": "逆袭", "type_name": "逆袭"},
                            {"type_id": "人物", "type_name": "人物"},
                            {"type_id": "都市", "type_name": "都市"},
                            {"type_id": "擦边", "type_name": "擦边"},
                            {"type_id": "人妖", "type_name": "人妖"},
                            {"type_id": "闪婚", "type_name": "闪婚"},                                                   {"type_id": "古装", "type_name": "古装"},
                            {"type_id": "霸总", "type_name": "霸总"},
                            {"type_id": "强者", "type_name": "强者"},
                            {"type_id": "玄幻", "type_name": "玄幻"},
                            {"type_id": "都市", "type_name": "都市"},
                            {"type_id": "神豪", "type_name": "神豪"},
                            {"type_id": "现代", "type_name": "现代"},
                            {"type_id": "爱情", "type_name": "爱情"},
                            {"type_id": "虐渣", "type_name": "虐渣"},
                            {"type_id": "总裁", "type_name": "总裁"},
                            {"type_id": "无敌", "type_name": "无敌"},
                            {"type_id": "奇幻", "type_name": "奇幻"}],
                 }

        return result

    def homeVideoContent(self):
        videos = []

        url = f"{xurl}/API/playlet/?keyword=擦边&page=1"
        detail = requests.get(url=url, headers=headerx)
        detail.encoding = "utf-8"

        if detail.status_code == 200:
            data = detail.text

            items = re.split(r'\{', data)
            for item in items:
                if not item.strip().endswith('}'):
                    item += '}'

                book_id = re.search(r'"book_id":\s*"(.*?)"', item)
                title = re.search(r'"title":\s*"(.*?)"', item)
                author = re.search(r'"author":\s*"(.*?)"', item)
                type_ = re.search(r'"type":\s*"(.*?)"', item)
                cover = re.search(r'"cover":\s*"(.*?)"', item)
                remark = re.search(r'"category_schema":\s*"(.*?)"', item)
                desc = re.search(r'"desc":\s*"(.*?)"', item)

                if book_id and title and author and type_ and cover and remark and desc:
                    book_id = book_id.group(1)
                    title = title.group(1)
                    author = author.group(1)
                    type_ = type_.group(1)
                    cover = cover.group(1)
                    remark = remark.group(1)
                    desc = desc.group(1)

                    vod_id = f"{author}@{type_}@{desc}@{book_id}"

                    video = {
                        "vod_id": vod_id,
                        "vod_name": title,
                        "vod_pic": cover,
                        "vod_remarks": '▶️' + remark
                            }
                    videos.append(video)

        result = {'list': videos}
        return result

    def categoryContent(self, cid, pg, filter, ext):
        result = {}
        videos = []

        if pg:
            page = int(pg)
        else:
            page = 1

        url = f"{xurl}/API/playlet/?keyword={cid}&page={str(page)}"
        detail = requests.get(url=url, headers=headerx)
        detail.encoding = "utf-8"
        if detail.status_code == 200:
            data = detail.text

            items = re.split(r'\{', data)
            for item in items:
                if not item.strip().endswith('}'):
                    item += '}'

                book_id = re.search(r'"book_id":\s*"(.*?)"', item)
                title = re.search(r'"title":\s*"(.*?)"', item)
                author = re.search(r'"author":\s*"(.*?)"', item)
                type_ = re.search(r'"type":\s*"(.*?)"', item)
                cover = re.search(r'"cover":\s*"(.*?)"', item)
                remark = re.search(r'"category_schema":\s*"(.*?)"', item)
                desc = re.search(r'"desc":\s*"(.*?)"', item)

                if book_id and title and author and type_ and cover and remark and desc:
                    book_id = book_id.group(1)
                    title = title.group(1)
                    author = author.group(1)
                    type_ = type_.group(1)
                    cover = cover.group(1)
                    remark = remark.group(1)
                    desc = desc.group(1)

                    vod_id = f"{author}@{type_}@{desc}@{book_id}"

                    video = {
                        "vod_id": vod_id,
                        "vod_name": title,
                        "vod_pic": cover,
                        "vod_remarks": '▶️️' + remark
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

        fenge = did.split("@")

        url = 'http://rihou.cc:88/je.json'
        response = requests.get(url)
        response.encoding = 'utf-8'
        code = response.text
        name = self.extract_middle_text(code, "s1='", "'", 0)
        Jumps = self.extract_middle_text(code, "s2='", "'", 0)

        content = '集多为您介绍剧情📢' + fenge[2]

        actor = fenge[0]

        remarks = fenge[1]

        if name not in content:
            bofang = Jumps
            xianlu = '1'
        else:
            url = f"{xurl}/API/playlet/?book_id={fenge[3]}"
            detail = requests.get(url=url, headers=headerx)
            detail.encoding = "utf-8"
            if detail.status_code == 200:
                detail = detail.json()

            soup = detail['data']['video_list']

            for sou in soup:

                id = sou['video_id']

                name = sou['title']

                bofang = bofang + name + '$' + id + '#'

            bofang = bofang[:-1]

            xianlu = '专线'

        videos.append({
            "vod_id": did,
            "vod_actor": actor,
            "vod_remarks": remarks,
            "vod_content": content,
            "vod_play_from": xianlu,
            "vod_play_url": bofang
                     })

        result['list'] = videos
        return result

    def playerContent(self, flag, id, vipFlags):

        url = f"{xurl}/API/playlet/?video_id={id}&quality=1080p"
        detail = requests.get(url=url, headers=headerx)
        detail.encoding = "utf-8"
        if detail.status_code == 200:
            detail = detail.json()
            url = detail['data']['video']['url']

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

        url = f"{xurl}/API/playlet/?keyword={key}&page={str(page)}"
        detail = requests.get(url=url, headers=headerx)
        detail.encoding = "utf-8"
        if detail.status_code == 200:
            data = detail.text

            items = re.split(r'\{', data)
            for item in items:
                if not item.strip().endswith('}'):
                    item += '}'

                book_id = re.search(r'"book_id":\s*"(.*?)"', item)
                title = re.search(r'"title":\s*"(.*?)"', item)
                author = re.search(r'"author":\s*"(.*?)"', item)
                type_ = re.search(r'"type":\s*"(.*?)"', item)
                cover = re.search(r'"cover":\s*"(.*?)"', item)
                remark = re.search(r'"category_schema":\s*"(.*?)"', item)
                desc = re.search(r'"desc":\s*"(.*?)"', item)

                if book_id and title and author and type_ and cover and remark and desc:
                    book_id = book_id.group(1)
                    title = title.group(1)
                    author = author.group(1)
                    type_ = type_.group(1)
                    cover = cover.group(1)
                    remark = remark.group(1)
                    desc = desc.group(1)

                    vod_id = f"{author}@{type_}@{desc}@{book_id}"

                    video = {
                        "vod_id": vod_id,
                        "vod_name": title,
                        "vod_pic": cover,
                        "vod_remarks": '️▶️' + remark
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








