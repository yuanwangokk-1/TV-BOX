# -*- coding: utf-8 -*-
# by @嗷呜
import sys
from pyquery import PyQuery as pq
sys.path.append('..')
from base.spider import Spider


class Spider(Spider):

    def init(self, extend=""):
        pass

    def getName(self):
        pass

    def isVideoFormat(self, url):
        pass

    def manualVideoCheck(self):
        pass

    def destroy(self):
        pass

    host='https://mov.cenguigui.cn'

    ahost='https://api.cenguigui.cn'

    headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
            'sec-ch-ua-platform': '"macOS"',
            'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="134", "Google Chrome";v="134"',
            'DNT': '1',
            'sec-ch-ua-mobile': '?0',
            'Sec-Fetch-Site': 'cross-site',
            'Sec-Fetch-Mode': 'no-cors',
            'Sec-Fetch-Dest': 'video',
            'Sec-Fetch-Storage-Access': 'active',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
        }

    def homeContent(self, filter):
        data=pq(self.fetch(self.host, headers=self.headers).text)
        result = {}
        classes = []
        for k in data('.overflow-auto button').items():
            classes.append({
                'type_name': k.text(),
                'type_id': k.text()
            })
        result['class'] = classes
        return result

    def homeVideoContent(self):
        pass

    def categoryContent(self, tid, pg, filter, extend):
        params = {
            'classname': tid,
            'offset': str((int(pg) - 1)),
        }
        data = self.fetch(f'{self.ahost}/api/duanju/api.php', params=params, headers=self.headers).json()
        videos = []
        for k in data['data']:
            videos.append({
                'vod_id': k.get('book_id'),
                'vod_name': k.get('title'),
                'vod_pic': k.get('cover'),
                'vod_year': k.get('score'),
                'vod_remarks': f"{k.get('sub_title')}|{k.get('episode_cnt')}"
            })
        result = {}
        result['list'] = videos
        result['page'] = pg
        result['pagecount'] = 9999
        result['limit'] = 90
        result['total'] = 999999
        return result

    def detailContent(self, ids):
        v=self.fetch(f'{self.ahost}/api/duanju/api.php', params={'book_id': ids[0]}, headers=self.headers).json()
        vod = {
            'type_name': v.get('category'),
            'vod_year': v.get('time'),
            'vod_remarks': v.get('duration'),
            'vod_content': v.get('desc'),
            'vod_play_from': '嗷呜爱看短剧',
            'vod_play_url': '#'.join([f"{i['title']}${i['video_id']}" for i in v['data']])
        }
        return {'list':[vod]}

    def searchContent(self, key, quick, pg="1"):
        return self.categoryContent(key, pg, True, {})

    def playerContent(self, flag, id, vipFlags):
        data=self.fetch(f'{self.ahost}/api/duanju/api.php', params={'video_id': id}, headers=self.headers).json()
        return  {'parse': 0, 'url': data['data']['url'], 'header': self.headers}

    def localProxy(self, param):
        pass
