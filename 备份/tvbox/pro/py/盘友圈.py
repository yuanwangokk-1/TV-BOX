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
xurl='https://panyq.com'
headerx = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.87 Safari/537.36'
}



class Spider(Spider):
    global xurl2
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
        try:
            data = json.loads(bytes.fromhex(ids[0]).decode())
            verify = requests.post(f'{xurl}/search/{data["hash"]}',
                                   headers=self.getheader(-1),
                                   data=json.dumps(data['data'], separators=(",", ":")).encode(),
                                   )
            if verify.status_code == 200:
                eid = data['data'][0]['eid']
                rdata = json.dumps([{"eid": eid}], separators=(",", ":")).encode()
                res = requests.post(f'{xurl}/go/{eid}', headers=self.getheader(1), data=rdata)
                purl = json.loads(res.text.strip().split('\n')[-1].split(":", 1)[-1])['data']['link']
                if not re.search(r'pwd=|码', purl) and data['password']:
                    purl = f"{purl}{'&' if '?' in purl else '?'}pwd={data['password']}"
                print("获取盘链接为：", purl)
            else:
                raise Exception('验证失败')
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
        except Exception as e:
            print(e)
            return {'list': []}

    def playerContent(self, flag, id, vipFlags):
        pass

    def searchContentPage(self, key, quick, page='1'):
        sign, sha, hash = self.getsign(key, page)
        headers = self.getheader()
        res = requests.get(f'{xurl}/api/search', params={'sign': sign}, headers=headers).json()
        videos = []
        for i in res['data']['hits']:
            ccc = [{"eid": i.get("eid"), "sha": sha, "page_num": page}]
            ddd = (json.dumps({'sign': sign, 'hash': hash, 'data': ccc, 'password': i.get('password')})).encode().hex()
            if i.get('group')=='quark':
                pic='https://android-artworks.25pp.com/fs08/2024/12/27/7/125_d45d9de77c805e17ede25e4a2d9d3444_con.png'
            elif i.get('group')=='baidu':
                pic='https://is4-ssl.mzstatic.com/image/thumb/Purple126/v4/dd/45/eb/dd45eb77-d21d-92f2-c46d-979797a6be4a/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/1024x1024bb.jpg'
            else:
                pic='https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.alicdn.com%2Fbao%2Fuploaded%2Fi4%2F2213060290763%2FO1CN01joakK61HVUwob2JIJ_%21%212213060290763.jpg&refer=http%3A%2F%2Fimg.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1757745912&t=e7b98fced3a4f092c8ef26490997b004'
            videos.append({
                'vod_id': ddd,
                'vod_name': i.get('desc').split('<mark>')[0].replace('<mark>', ""),
                'vod_pic': pic,
                'vod_remarks': i.get('group'),
            })
        return {'list': videos, 'page': page}

    def searchContent(self, key, quick):
        return self.searchContentPage(key, quick, '1')
    
    def searchContent(self, key, quick, pg):
        return self.searchContentPage(key, quick, pg)


    def getsign(self,key,pg):
        headers=self.getheader()
        data=json.dumps([{"cat":"all","query":key,"pageNum":int(pg),"enableSearchMusic":False,"enableSearchGame":False,"enableSearchEbook":False}],separators=(",", ":"),ensure_ascii= False).encode()
        res = requests.post(xurl, headers=headers, data=data).text
        hash=re.search(r'"hash",\s*"([^"]+)"', res).group(1)
        sign = re.search(r'"sign":\s*"([^"]+)"', res).group(1)
        sha= re.search(r'"sha":\s*"([^"]+)"', res).group(1)
        return sign,sha,hash

    def getheader(self,k=0):
        kes=['ecce0904d756da58b9ea5dd03da3cacea9fa29c6','4c5c1ef8a225004ce229e9afa4cc7189eed3e6fe','c4ed62e2b5a8e3212b334619f0cdbaa77fa842ff']
        headers = {
            'origin': xurl,
            'referer': f'{xurl}/',
            'next-action': kes[k],
            'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="136", "Google Chrome";v="136"',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.7103.48 Safari/537.36',
        }
        return headers
    def localProxy(self, params):
        if params['type'] == "m3u8":
            return self.proxyM3u8(params)
        elif params['type'] == "media":
            return self.proxyMedia(params)
        elif params['type'] == "ts":
            return self.proxyTs(params)
        return None
