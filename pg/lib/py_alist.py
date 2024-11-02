#coding=utf-8
#!/usr/bin/python
import re
import json
import time
import sqlite3
import requests
from sys import path
from lxml import etree
from os.path import splitext
from base64 import b64decode, b64encode
from urllib.parse import unquote, urlparse
path.append('..')

from base.spider import Spider

class Spider(Spider):
	def getName(self):
		return "ALIST网盘"

	def init(self, extend):
		try:
			self.extendDict = json.loads(extend)
			self.vodPic = self.extendDict['vodPic'] if 'vodPic' in self.extendDict else ''
		except:
			self.extendDict = {}
			self.vodPic = ''

	def isVideoFormat(self, url):
		pass

	def manualVideoCheck(self):
		pass

	def homeContent(self, filters):
		result = {'class': [{"type_name": "其他", "type_id": "其他"}]}
		adult = self.extendDict['adult'] if 'adult' in self.extendDict else False
		for key in ['成人', '电视剧', '电影']:
			try:
				_, total = next(self.handleSqlite({'table': 'alist', "where": {'type': key}}, size=99999))
			except:
				continue
			if key == '电视剧':
				key = '剧集'
			if total > 0:
				if key == '成人' and not adult:
					continue
				else:
					result['class'].insert(0, {"type_name": key, "type_id": key})

		if filters:
			yearList = []
			countrieList = []
			result['filters'] = {}
			try:
				for row, total in self.handleSqlite({'table': 'alist'}, size=99999):
					if not adult and row['type'] == '成人':
						continue
					year = row['year'] if row['year'] != '' else '未知'
					countries = row['countries'].strip('|').split('|') if row['countries'] != '' else ['未知']
					if not {"n": year, "v": year} in yearList:
						yearList.append({"n": year, "v": year})
					for country in countries:
						if not {"n": country, "v": f"%{country}%"} in countrieList:
							countrieList.append({"n": country, "v": f"%{country}%"})
			except:
				pass
			yearList = sorted(yearList, key=lambda x: x['n'], reverse=True)
			countrieList = sorted(countrieList, key=lambda x: len(x['n']))
			if {"n": '未知', "v": '未知'} in yearList:
				index = yearList.index({"n": '未知', "v": '未知'})
				yearList.insert(0, yearList.pop(index))
			if {"n": '未知', "v": "%未知%"} in countrieList:
				index = countrieList.index({"n": '未知', "v": "%未知%"})
				countrieList.insert(0, countrieList.pop(index))

			for item in result['class']:
				if item['type_id'] == '其他':
					continue
				result['filters'][item['type_id']] = [{"key": 'year', "name": "年份", "value": yearList}, {"key": 'countries', "name": "国家", "value": countrieList}]
		return result

	def homeVideoContent(self):
		return {}

	def categoryContent(self, cid, page, filters, ext):
		result = {}
		if cid in ['电影', '剧集', '成人']:
			total = 0
			videos = []
			r = requests.get(self.extendDict['json'], headers=self.header, timeout=5)
			alistInfos = r.json()
			if cid == '剧集':
				cid = '电视剧'
			where = {"type": cid}
			if ext != {}:
				where.update(ext)
			for row, total in self.handleSqlite({'table': 'alist', "where": where}, page):
				addSignal = False
				for driveInfos in alistInfos['drives']:
					params = driveInfos.copy()
					if row['location'].startswith(params['server'].strip('/')):
						params['server'] = row['location']
						params['fileType'] = row['tag']
						params['id'] = row['id']
						pic = row['pic']
						remark = row['remark']
						videos.append({
							"vod_id": json.dumps(params, ensure_ascii=False),
							"vod_name": row['title'],
							"vod_pic": pic,
							"vod_remarks": remark
						})
						addSignal = False
						break
					else:
						addSignal = True
				if addSignal:
					location = row['location'].strip("/")
					fileType = row['tag']
					matchs = re.search(r'(.*)/(.*)', location)
					server = matchs.group(1)
					keywords = matchs.group(2)
					pic = row['pic']
					remark = row['remark']
					vod = {
						"vod_id": f'{{"id": "del", "scrape": true, "keywords": "{keywords}", "fileType": "{fileType}", "server": "{server}"}}',
						"vod_name": row['title'],
						"vod_pic": pic,
						"vod_remarks": remark
					}
					if vod in videos:
						continue
					else:
						videos.append(vod)

			pageCount = page + 1 if page * 20 < total else page

		elif cid == '其他':
			videos = []
			r = requests.get(self.extendDict['json'], headers=self.header, timeout=5)
			alistInfos = r.json()
			for driver in alistInfos['drives']:
				if 'hidden' in driver and driver['hidden']:
					continue
				videos.append({
					"vod_id": json.dumps(driver, ensure_ascii=False),
					"vod_name": driver['name'],
					"vod_pic": self.vodPic,
					"vod_tag": "folder",
					"style": {
						"type": "rect",
						"ratio": 1
					},
					"vod_remarks": "文件夹"

				})

			pageCount = 1

		elif cid == '刮削':
			alistScrapeInfos = self.getCache('alistScrapeInfos')
			vodList = alistScrapeInfos['vodList']
			videos = [
				{
					"vod_id": f'{{"scrape": true, "keywords": "alistScrapeInfos", "fileType": "alistScrapeInfos", "server": "{alistScrapeInfos["server"].strip("/")}"}}',
					"vod_name": f"刮削-{re.search(r'.*/(.*)', alistScrapeInfos['server'].strip('/')).group(1)}",
					"vod_pic": self.vodPic,
					"vod_tag": "folder",
					"style": {
						"type": "list"
					},
					"vod_remarks": "自动"
				}
			]
			for vod in vodList:
				fileType = 'folder' if vod['is_dir'] else 'file'
				videos.append(
					{
						"vod_id": f'{{"scrape": true, "fileType": "{fileType}", "keywords": "{vod["name"]}", "server": "{alistScrapeInfos["server"].strip("/")}"}}',
						"vod_name": f'刮削-{vod["name"]}',
						"vod_pic": self.vodPic,
						"vod_tag": "folder",
						"style": {
							"type": "list"
						},
						"vod_remarks": "手动"
					}
				)

			pageCount = page

		else:
			try:
				cid = b64decode(cid.encode()).decode()
			except:
				pass
			params = json.loads(cid)
			if 'scrape' in params and params['scrape']:
				keywords = params['keywords']
				if 'scrapeType' in params:
					videos = []
					addSignal = True
					try:
						videoList = self.searchScrapeInfos(keywords, params['scrapeType'], page)
					except:
						videoList = []

					for video in videoList:
						params['id'] = video["id"]
						if params['id'] == '未知':
							addSignal = False
							remark = '刮削失败，直接入库'
						else:
							remark = keywords
						videos.append(
							{
								"vod_id": json.dumps(params, ensure_ascii=False),
								"vod_name": f"{video['title']}-{video['year']}" if video['year'] != '' else video['title'],
								"vod_pic": video['pic'],
								"vod_year": video['year'],
								"vod_tag": "file",
								"style": {
									"type": "list"
								},
								"vod_remarks": remark
							}
						)
					if addSignal:
						params['id'] = '未知'
						videos.append(
							{
								"vod_id": json.dumps(params, ensure_ascii=False),
								"vod_name": keywords,
								"vod_pic": self.vodPic,
								"vod_year": '',
								"vod_tag": "file",
								"style": {
									"type": "list"
								},
								"vod_remarks": '入库'
							}
						)
					params['id'] = 'del'
					videos.append(
						{
							"vod_id": json.dumps(params, ensure_ascii=False),
							"vod_name": keywords,
							"vod_pic": self.vodPic,
							"vod_year": '',
							"vod_tag": "file",
							"style": {
								"type": "list"
							},
							"vod_remarks": '删除'
						}
					)
				else:
					videos = []
					if keywords == 'alistScrapeInfos':
						alistScrapeInfos = self.getCache('alistScrapeInfos')
						params['id'] = 'alistScrapeInfos'
						name = re.search(r'.*/(.*)', alistScrapeInfos['server']).group(1)
						vodTag = 'file'
					else:
						name = keywords
						vodTag = "folder"

					if 'missAvUrl' in self.extendDict and "missav" in self.extendDict['missAvUrl']:
						scrapeTypeList = ['电影', '剧集', '成人']
					else:
						scrapeTypeList = ['电影', '剧集']

					for scrapeType in scrapeTypeList:
						remark = scrapeType
						if scrapeType == '剧集':
							scrapeType = '电视剧'
						params['scrapeType'] = scrapeType
						videos.append(
							{
								"vod_id": json.dumps(params, ensure_ascii=False),
								"vod_name": f"刮削：{name}",
								"vod_pic": self.vodPic,
								"style": {
									"type": "list"
								},
								"vod_remarks": remark,
								"vod_tag": vodTag
							}
						)
				lenVideos = len(videos)
				return {'list': videos, 'page': page, 'pagecount': page, 'limit': lenVideos, 'total': lenVideos}
			elif 'actors' in params:
				total = 0
				videos = []
				for row, total in self.handleSqlite(params['actors'], page):
					params['server'] = row['location']
					params['fileType'] = row['tag']
					params['id'] = row['id']
					pic = row['pic']
					remark = row['remark']
					videos.append({
						"vod_id": json.dumps(params, ensure_ascii=False),
						"vod_name": row['title'],
						"vod_pic": pic,
						"vod_remarks": remark
					})

				pageCount = page + 1 if page * 20 < total else page
				lenVideos = len(videos)
				return {'list': videos, 'page': page, 'pagecount': pageCount, 'limit': lenVideos, 'total': lenVideos}

			password = ''
			pageCount = page
			url = params['server']
			if url.count('/') == 2:
				baseUrl = f"{url}/"
			else:
				baseUrl = re.search(r"(http.*://.*?/)", url).group(1)
			if 'login' in params:
				login = params['login']
			else:
				login = None
			header = self.header.copy()
			header["Referer"] = baseUrl
			token = self.getCache(f'alistToken_{baseUrl}')
			if token:
				token = token['token']
			else:
				r = requests.post(baseUrl + 'api/auth/login', json=login, headers=header)
				data = r.json()
				if data['code'] == 200:
					token = data['data']['token']
					self.setCache(f'alistToken_{baseUrl}', {'token': token, 'expiresAt': int(time.time()) + 86400})
			header['Authorization'] = token
			path = urlparse(url).path if urlparse(url).path != '' else '/'
			try:
				name = re.search(r'.*/(.*?)/', path).group(1)
			except:
				name = params['name']
			if 'params' in params:
				for param in params[params]:
					if path.startswith(param['path']) and 'pass' in param:
						password = param['pass']
						break
			r = requests.post(baseUrl + 'api/fs/list', json={"path": path, 'password': password}, headers=header)
			data = r.json()
			vodList = data['data']['content']
			subtList = []
			videoList = []
			newParams = params.copy()
			newParams.update({"vodList": vodList})
			self.setCache('alistScrapeInfos', newParams)
			videos = [{
				"vod_id": "刮削",
				"vod_name": '刮削',
				"vod_pic": self.vodPic,
				"style": {
					"type": "rect",
					"ratio": 1
				},
				"vod_tag": 'folder',
				"vod_remarks": path
			}]
			for vod in vodList:
				if vod['thumb'] == '':
					img = self.vodPic
				elif vod['thumb'].startswith('http'):
					img = vod['thumb']
				else:
					img = baseUrl.strip('/') + vod['thumb']

				if vod['is_dir']:
					cid = f"{baseUrl.strip('/')}{path}/{vod['name']}" if path != '/' else f"{baseUrl.strip('/')}{path}{vod['name']}"
					params['name'] = name
					params['server'] = cid
					videos.append({
						"vod_id": json.dumps(params, ensure_ascii=False),
						"vod_name": vod['name'],
						"vod_pic": img,
						"vod_tag": "folder",
						"style": {
							"type": "rect",
							"ratio": 1
						},
						"vod_remarks": "文件夹"
					})
				else:
					if splitext(vod['name'])[1] in ['.mp4', '.mpg', '.mkv', '.ts', '.TS', '.avi', '.flv', '.rmvb',
													'.mp3', '.flac', '.wav', '.wma', '.dff']:
						size = self.getSize(vod['size'])
						videoList.append({'fileName': vod['name'], "img": img, "remark": size})
					elif splitext(vod['name'])[1] in ['.ass', '.ssa', '.srt']:
						subtList.append(vod['name'])

			if videoList != []:
				params['name'] = name
				params['server'] = baseUrl.strip('/') + path
				params['playList'] = True
				self.setCache('alistPlayList', videoList)
				self.setCache(f"alistSubtList_{params['server']}", subtList)
				videos.insert(1, {
					"vod_id": json.dumps(params, ensure_ascii=False),
					"vod_name": '播放列表',
					"vod_pic": self.vodPic,
					"vod_tag": 'file',
					"style": {
						"type": "rect",
						"ratio": 1
					},
					"vod_remarks": path
				})
				del params['playList']
				for video in videoList:
					params['name'] = name
					params[
						'server'] = f"{baseUrl.strip('/')}{path}/{video['fileName']}" if path != '/' else f"{baseUrl.strip('/')}{path}{video['fileName']}"
					videos.append({
						"vod_id": json.dumps(params, ensure_ascii=False),
						"vod_name": video['fileName'],
						"vod_pic": video['img'],
						"vod_tag": 'file',
						"style": {
							"type": "rect",
							"ratio": 1
						},
						"vod_remarks": video['remark']
					})

		result['list'] = videos
		result['page'] = page
		result['pagecount'] = pageCount
		result['limit'] = len(videos)
		result['total'] = len(videos)
		return result

	def detailContent(self, did):
		params = json.loads(did[0])
		if 'scrape' in params and params['scrape']:
			from threading import Thread
			if params['id'] == 'alistScrapeInfos':
				scrapeThread = Thread(target=self.handleScrape, args=(
				{"id": params['id'], "scrapeType": params['scrapeType'], "location": f"{params['server']}"}, True))
				scrapeThread.start()

				return {'list': [], "msg": "正在自动刮削"}

			elif params['id'] == 'del':
				result = next(self.handleSqlite(
					{'table': "alist", "column": "location", "value": f"{params['server']}/{params['keywords']}"},
					act='del'))

				return {'list': [], "msg": result}

			else:
				scrapeThread = Thread(target=self.handleScrape, args=(
				{"id": params['id'], 'fileType': params['fileType'], "scrapeType": params['scrapeType'],
				 "location": f"{params['server']}/{params['keywords']}"}, False))
				scrapeThread.start()
			return {'list': [], "msg": "正在刮削"}

		urlList = []
		if 'id' in params:
			fileType = params['fileType']
			if fileType == 'folder':
				if 'actors' in params:
					del params['actors']
				try:
					self.categoryContent(json.dumps(params, ensure_ascii=False), 1, False, {})
				except:
					result = next(self.handleSqlite({'table': "alist", "column": "location", "value": f"{params['server']}"}, act='del'))

					return {'list': [], "msg": result}
				params['playList'] = True
				r = requests.get(f'https://movie.douban.com/subject/{params["id"]}', headers=self.header, verify=False, timeout=5)
				urlList = re.findall(r'{play_link.*?".*?url=(http.*?)".*?}', r.text)

			if str(params['id']) == '未知':
				name = re.search(r'.*/(.*)', params['server']).group(1)
				year = ''
				actors = ''
				content = ''
				directors = ''
				countries = ''
			else:
				result = next(self.handleSqlite({'table': 'alist', "where": {"id": str(params['id'])}}))[0]
				name = result['title']
				year = result['year']
				actors = ''
				actParams = params.copy()
				actorList = result['actors'].split('|')
				for actor in actorList:
					actParams['actors'] = {'table': 'alist', "where": {"actors": f"%{actor}%"}}
					actors += '[a=cr:{{"id":"{}","name":"{}"}}/]{}[/a],'.format(b64encode(json.dumps(actParams, ensure_ascii=False).encode()).decode(), actor, actor)
				actors = actors.strip(',')
				content = result['content']
				directors = result['directors']
				countries = result['countries']
			matchs = re.search(r'(.*)/(.*)', params["server"])
			server = matchs.group(1)
			keywords = matchs.group(2)
			content += ' [a=cr:{{"id":"{}","name":"{}"}}/]{}[/a]'.format(b64encode(f'{{"scrape": true, "fileType": "{fileType}", "keywords": "{keywords}", "server": "{server}"}}'.encode()).decode(), '重新刮削', '重新刮削').strip()

		else:
			name = params['name']
			year = ''
			actors = ''
			content = ''
			directors = ''
			countries = ''
		if 'playList' in params and params['playList']:
			playUrl = ''
			fileList = self.getCache('alistPlayList')
			if not fileList:
				next(self.handleSqlite({'table': "alist", "column": "location", "value": f"{params['server']}"}, act='del'))
				return {'list': [], "msg": "无可播放资源"}
			self.delCache('alistPlayList')
			del params['playList']
			try:
				fileList = sorted(fileList, key=lambda x: x['fileName'])
			except:
				pass
			for file in fileList:
				try:
					index = fileList.index(file)
					url = re.sub(r'\?.*', '', unquote(urlList[index]))
					if 'qq.com' in url:
						params.update({"dmInfo": {'platform': 'qq', 'url': url}})
					elif 'mgtv.com' in url:
						params.update({"dmInfo": {'platform': 'mgtv', 'url': url}})
					elif 'iqiyi.com' in url:
						params.update({"dmInfo": {'platform': 'iqiyi', 'url': url}})
					elif 'youku.com' in url:
						params.update({"dmInfo": {'platform': 'youku', 'url': url}})
					elif 'bilibili.com' in url:
						params.update({"dmInfo": {'platform': 'bilibili', 'url': url}})
				except:
					pass
				params['url'] = f'{params["server"].strip("/")}/{file["fileName"]}'
				playUrl += f'{file["fileName"]}${json.dumps(params, ensure_ascii=False)}#'

		else:
			try:
				url = re.sub(r'\?.*', '', unquote(urlList[0]))
				if 'qq.com' in url:
					params.update({"dmInfo": {'platform': 'qq', 'url': url}})
				elif 'mgtv.com' in url:
					params.update({"dmInfo": {'platform': 'mgtv', 'url': url}})
				elif 'iqiyi.com' in url:
					params.update({"dmInfo": {'platform': 'iqiyi', 'url': url}})
				elif 'youku.com' in url:
					params.update({"dmInfo": {'platform': 'youku', 'url': url}})
				elif 'bilibili.com' in url:
					params.update({"dmInfo": {'platform': 'bilibili', 'url': url}})
			except:
				pass
			params['url'] = params["server"]
			playUrl = f'{re.search(r".*/(.*)", params["server"]).group(1)}${json.dumps(params, ensure_ascii=False)}'

		vod = {
			"vod_id": did,
			"vod_name": name,
			"vod_actor": actors,
			"vod_year": year,
			"vod_area": countries,
			"vod_director": directors,
			"vod_content": content,
			"vod_play_from": "播放",
			"vod_play_url": playUrl.strip('#')
		}
		result = {'list': [vod]}
		return result

	def searchContent(self, key, quick):
		return self.searchContentPage(key, quick, '1')

	def searchContentPage(self, keywords, quick, page):
		keywords = f"%{keywords}%"
		videos = []
		r = requests.get(self.extendDict['json'], headers=self.header, timeout=5)
		alistInfos = r.json()
		adult = self.extendDict['adult']
		for row, total in self.handleSqlite({'table': 'alist', "where": {"location": str(keywords)}}, page=page):
			for driveInfos in alistInfos['drives']:
				if row['type'] == '成人' and not adult:
					continue
				params = driveInfos.copy()
				if row['location'].startswith(params['server'].strip('/')):
					params['server'] = row['location']
					params['fileType'] = row['tag']
					params['id'] = row['id']
					pic = row['pic']
					remark = row['remark']
					videos.append({
						"vod_id": json.dumps(params, ensure_ascii=False),
						"vod_name": row['title'],
						"vod_pic": pic,
						"vod_remarks": remark
					})
					break
		result = {'list': videos}
		return result

	def playerContent(self, flag, pid, vipFlags):
		result = {}
		params = json.loads(pid)
		url = self.getDownloadUrl(params)

		subs = []
		localUrl = self.getCache('localUrl')
		subList = self.getCache(f"alistSubtList_{params['server']}") if self.getCache(f"alistSubtList_{params['server']}") else []
		fileName = re.search(r".*/(.*)\..*?", params["url"]).group(1)
		distanceMatrix = []
		for sub in subList:
			subName = splitext(sub)[0]
			distanceMatrix.append(
				{"dis": self.levenshteinDistance(fileName, subName), "subName": subName, "subFormat": splitext(sub)[1]})

		try:
			distanceMatrix = sorted(distanceMatrix, key=lambda x: x['dis'])
		except:
			pass

		for subtInfos in distanceMatrix[:5]:
			if subtInfos['subFormat'] == '.srt':
				subFormat = 'application/x-subrip'
			elif subtInfos['subFormat'] == '.ass':
				subFormat = 'application/x-subtitle-ass'
			elif subtInfos['subFormat'] == '.ssa':
				subFormat = 'text/x-ssa'
			else:
				subFormat = 'text/plain'

			subUrl = f'http://127.0.0.1:9978/proxy?do=py&format={subFormat}'
			for key in params:
				subUrl += f"&{key}={params[key]}"
			subs.append({'url': subUrl, 'name': subtInfos['subName'], 'format': subFormat})

		if 'dmInfo' in params:
			from urllib.parse import urlencode
			result['danmaku'] = 'https://serv.leuse.top/danmu?' + urlencode({'params': json.dumps(params, ensure_ascii=False)})

		result["parse"] = 0
		result["playUrl"] = ''
		result["url"] = url
		result["header"] = self.header
		result["subs"] = subs
		return result

	def localProxy(self, params):
		format = params['format']
		url = self.getDownloadUrl(params)
		header = self.header
		header["Location"] = url
		return [302, format, None, header]

	def destroy(self):
		return None

	def searchScrapeInfos(self, keywords, scrapeType, page=1):
		result = []
		if scrapeType in ['电影', '电视剧']:
			try:
				keywords = self.getKeywords(keywords)
			except:
				pass
			header = {
				'Content-Type': 'application/json',
				'Host': 'frodo.douban.com',
				'Connection': 'Keep-Alive',
				'Referer': 'https://servicewechat.com/wx2f9b06c1de1ccfca/84/page-frame.html',
				'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36 MicroMessenger/7.0.9.501 NetType/WIFI MiniProgramEnv/Windows WindowsWechat'
			}
			params = {'q': keywords, 'start': (int(page) - 1) * 20, 'count': 20, 'apikey': '0ac44ae016490db2204ce0a042db2916'}
			r = requests.get('https://frodo.douban.com/api/v2/search/movie', headers=header, verify=False, params=params, timeout=5)
			for video in r.json()['items']:
				typeName = video['type_name']
				if typeName == scrapeType:
					result.append(
						{
							"id": video['target_id'],
							"title": video['target']['title'],
							"year": video['target']['year'],
							"type": typeName,
							"remark": video['target']['card_subtitle'].replace(" / ", '|').replace(' ', '|'),
							"pic": video['target']['cover_url']
						}
					)
		else:
			if 'missAvUrl' in self.extendDict:
				missAvUrl= f"{self.extendDict['missAvUrl'].strip('/')}/cn"
			else:
				return {"id": '未知'}

			header = {
				"Referer": missAvUrl,
				"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.54 Safari/537.36"
			}
			try:
				newKeywords = re.search(r'(\w+-\d+)', keywords).group(1)
			except:
				newKeywords = keywords
			r = requests.get(f'{missAvUrl}/search/{newKeywords}?page={page}', headers=header, timeout=30)
			html = etree.HTML(r.text)
			vodList = html.xpath("//div[contains(@class, 'grid grid-cols-2 md')]/div/div[@class='thumbnail group']")
			for vod in vodList:
				sid = self.handleXpath(vod, ".//a[contains(@class, 'text')]", "href")
				title = self.handleXpath(vod, ".//a[contains(@class, 'text')]", "text")
				pic = self.handleXpath(vod, ".//img", "data-src")
				result.append(
					{
						"id": sid,
						"title": title,
						"year": '',
						"remark": "",
						"type": '成人',
						"pic": pic
					}
				)
		return result

	def getScrapeInfos(self, sid, name, scrapeType):
		if sid == '未知':
			return {"pic": '', "year": '', 'title': name, "remark": '', 'content': '', 'actors': "", 'directors': "", 'countries': ""}
		if scrapeType in ['电影', '电视剧']:
			header = {
				'Content-Type': 'application/json',
				'Host': 'frodo.douban.com',
				'Connection': 'Keep-Alive',
				'Referer': 'https://servicewechat.com/wx2f9b06c1de1ccfca/84/page-frame.html',
				'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36 MicroMessenger/7.0.9.501 NetType/WIFI MiniProgramEnv/Windows WindowsWechat'
			}
			params = {'apikey': '0ac44ae016490db2204ce0a042db2916'}
			r = requests.get(f'https://frodo.douban.com/api/v2/movie/{sid}', headers=header, verify=False, params=params, timeout=5)
			scrapeInfos = r.json()
			pic = re.sub(r'photo/(.*?)/', 'photo/l/', scrapeInfos['pic']['large']) + '@User-Agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36@Referer=https://www.douban.com/'
			year = scrapeInfos['year']
			title = scrapeInfos['title']
			remark = scrapeInfos['card_subtitle'].replace(' / ', '/').strip()
			content = scrapeInfos['intro'].strip()
			actors = ''
			for actor in scrapeInfos['actors']:
				actors += f"{actor['name']}|"
			actors = actors.strip('|')
			directors = ''
			for director in scrapeInfos['directors']:
				directors += f"{director['name']}|"
			directors = directors.strip('|')
			countries = ''
			for country in scrapeInfos['countries']:
				countries += f"{country}|"
			countries = countries.strip('|')
			result = {"pic": pic, "year": year, 'title': title, "remark": remark, 'content': content, 'actors': actors, 'directors': directors, 'countries': countries}
		else:
			if 'missAvUrl' in self.extendDict:
				missAvUrl= f"{self.extendDict['missAvUrl'].strip('/')}/cn"
			else:
				return {"pic": '', "year": '', 'title': name, "remark": '', 'content': '', 'actors': "", 'directors': "", 'countries': ""}

			header = {
				"Referer": missAvUrl,
				"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.54 Safari/537.36"
			}
			r = requests.get(sid, headers=header, timeout=30)
			html = etree.HTML(r.text)
			pic = self.handleXpath(html, "//video[contains(@class, 'player')]", "data-poster")
			year = self.handleRegx(r'(\d{4}).*', self.handleXpath(html, "//div/time", "text"), group=1)
			title = self.handleXpath(html, "//div/h1[contains(@class, 'text-base')]", "text")
			content = self.handleXpath(html, "//meta[@name='description']", "content")
			actors = self.handleRegx(r'女优:.*?<a.*?>(.*?)</a>', r.text, re.DOTALL)
			directors = self.handleRegx(r'导演:.*?<a.*?>(.*?)</a>', r.text, re.DOTALL)
			result = {"pic": pic, "year": year, 'title': title, "remark": '', 'content': content, 'actors': actors, 'directors': directors, 'countries': ''}
		return result

	def getDownloadUrl(self, params):
		url = params['url']
		password = ''
		if url.count('/') == 2:
			baseUrl = f"{url}/"
		else:
			baseUrl = re.search(r"(http.*://.*?/)", url).group(1)
		header = self.header.copy()
		header['Referer'] = baseUrl
		token = self.getCache(f'alistToken_{baseUrl}')
		if token:
			token = token['token']
		else:
			r = requests.post(baseUrl + 'api/auth/login', json=params['login'] if 'login' in params else None, headers=header)
			data = r.json()
			if data['code'] == 200:
				token = data['data']['token']
				self.setCache(f'alistToken_{baseUrl}', {'token': token, 'expires_at': int(time.time())+86400})
		header['Authorization'] = token
		path = urlparse(url).path if urlparse(url).path != '' else '/'
		if 'params' in params:
			for param in params[params]:
				if path.startswith(param['path']) and 'pass' in param:
					password = param['pass']
					break
		param = {
			"path": path,
			'password': password
		}
		r = requests.post(baseUrl + 'api/fs/get', json=param, headers=header)
		url = r.json()['data']['raw_url']
		if not url.startswith('http'):
			url = baseUrl + url.strip('/')
		return url

	def getSize(self, size):
		if size > 1024 * 1024 * 1024 * 1024.0:
			fs = "TB"
			sz = round(size / (1024 * 1024 * 1024 * 1024.0), 2)
		elif size > 1024 * 1024 * 1024.0:
			fs = "GB"
			sz = round(size / (1024 * 1024 * 1024.0), 2)
		elif size > 1024 * 1024.0:
			fs = "MB"
			sz = round(size / (1024 * 1024.0), 2)
		elif size > 1024.0:
			fs = "KB"
			sz = round(size / (1024.0), 2)
		else:
			fs = "KB"
			sz = round(size / (1024.0), 2)
		return str(sz) + fs

	def handleRegx(self, reg, src, flags=0, group=1):
		try:
			result = re.search(reg, src, flags).group(group)
		except:
			result = ''
		return result.strip()

	def handleXpath(self, html, xpathReg, key):
		try:
			if key == 'text':
				result = html.xpath(xpathReg)[0].text
			else:
				result = html.xpath(xpathReg)[0].get(key)
		except:
			result = ''
		return result.strip()

	def handleScrape(self, params, automatic=False):
		scrapeType = params['scrapeType']
		if automatic:
			from random import randint
			sleepTime = randint(600, 700)
			alistScrapeInfos = self.getCache('alistScrapeInfos')
			resultList = []
			try:
				for row, total in self.handleSqlite({'table': 'alist', "where": {"location": f"%{alistScrapeInfos['server']}%", "type": params['scrapeType']}}, size=99999):
					resultList.append(row['location'])
			except:
				pass

			delList = resultList.copy()
			vodList = alistScrapeInfos['vodList']
			cleanDB = True
			for vod in vodList:
				location = f"{params['location']}/{vod['name']}"
				if location in resultList:
					delList.remove(location)
					continue

				try:
					scrapeInfos = self.searchScrapeInfos(vod['name'], params['scrapeType'])
					if len(scrapeInfos) == 0:
						sid = '未知'
					else:
						sid = scrapeInfos[0]['id']
				except:
					blocked = True
					sid = '未知'
					retry = 0
					while blocked and retry < 3:
						retry += 1
						time.sleep(sleepTime)
						try:
							scrapeInfos = self.searchScrapeInfos(vod['name'], params['scrapeType'])
							if len(scrapeInfos) >= 0:
								if len(scrapeInfos) == 0:
									sid = '未知'
								else:
									sid = scrapeInfos[0]['id']
								blocked = False
						except:
							blocked = True
					if blocked:
						cleanDB = False
						continue

				try:
					scrapeInfo = self.getScrapeInfos(sid, vod['name'], scrapeType)
				except:
					scrapeInfo = {"pic": '', "year": '', 'title': vod['name'], "remark": '', 'content': '', 'actors': "", 'directors': "", 'countries': ""}
					blocked = True
					retry = 0
					while blocked and retry < 3:
						retry += 1
						time.sleep(sleepTime)
						try:
							scrapeInfo = self.getScrapeInfos(sid, vod['name'], scrapeType)
							if scrapeInfo:
								blocked = False
						except:
							blocked = True
					if blocked:
						cleanDB = False
						continue

				columns = ['location', 'type', 'tag', 'id']
				if vod['is_dir']:
					fileType = 'folder'
				else:
					fileType = 'file'
				values = [location, scrapeType, fileType, sid]
				for key in scrapeInfo:
					columns.append(key)
					values.append(scrapeInfo[key])
				next(self.handleSqlite({'table': "alist", "columns": columns, "values": values}, act='set'))
			if cleanDB:
				for result in delList:
					next(self.handleSqlite({'table': "alist", "column": "id", "value": str(result['location'])}, act='del'))
			time.sleep(sleepTime)
		else:
			location = params['location']
			name = re.search(r'.*/(.*)', location).group(1)
			next(self.handleSqlite({'table': "alist", "column": "location", "value": location}, act='del'))

			try:
				scrapeInfo = self.getScrapeInfos(params['id'], name, params['scrapeType'])
			except:
				scrapeInfo = {"pic": '', "year": '', 'title': name, "remark": '', 'content': '', 'actors': "", 'directors': "", 'countries': ""}

			columns = ['location', 'type', 'tag', 'id']
			values = [location, scrapeType, params['fileType'], str(params['id'])]
			for key in scrapeInfo:
				columns.append(key)
				values.append(scrapeInfo[key])
			next(self.handleSqlite(params={'table': "alist", "columns": columns, "values": values}, act='set'))


	def handleSqlite(self, params, page=1, size=20, dbName='local', act='get'):
		table = str(params['table'])

		def tableExists(cursor, table):
			cursor.execute(f"SELECT name FROM sqlite_master WHERE type='table' AND name='{table}'")
			result = cursor.fetchone()  # 获取一行结果
			return result is not None

		if act == 'get':
			offset = (page - 1) * size
			where = ''
			if 'where' in params:
				whereList = []
				for key in params['where']:
					if params['where'][key].startswith('%') and params['where'][key].endswith('%'):
						whereList.append(f"{key} LIKE '{str(params['where'][key])}'")
					else:
						whereList.append(f"{key} = '{str(params['where'][key])}'")
				where = "WHERE " + " AND ".join(whereList)
			query = f"SELECT COUNT(*) FROM {table} {where}"
			with sqlite3.connect(f'db/{dbName}.db') as conn:
				row = None
				cursor = conn.cursor()
				total = cursor.execute(query).fetchone()[0]
				query += f" LIMIT {size} OFFSET {offset}"
				cursor.execute(query.replace('COUNT(*)', '*'))
				keys = [column[0] for column in cursor.description]
				for row in cursor:
					yield dict(zip(keys, row)), total
				if not row:
					yield None, 0

		elif act == 'set':
			try:
				values = ','.join(['?' for _ in range(len(params['values']))])
				with sqlite3.connect(f'db/{dbName}.db') as conn:
					cursor = conn.cursor()
					if not tableExists(cursor, table):
						query = f"CREATE TABLE IF NOT EXISTS {table} ({','.join(params['columns'])})"
						cursor.execute(query)
					cursor.execute(
						f"SELECT {params['columns'][0]} FROM {table} WHERE {params['columns'][0]}=\"{params['values'][0]}\"")
					if cursor.fetchone():
						setStr = ','.join([f'{key}="{value}"' for key, value in
										   dict(zip(params['columns'], params['values'])).items()])
						query = f"UPDATE {table} SET {setStr} WHERE {params['columns'][0]} = \"{params['values'][0]}\""
						cursor.execute(query)
					else:
						query = f"INSERT INTO {table} ({','.join([str(item) if not isinstance(item, str) else item for item in params['columns']])}) VALUES ({values})"
						cursor.execute(query,
									   [str(item) if not isinstance(item, str) else item for item in params['values']])
				yield f"Set {params['columns']} to {params['values']} success"
			except Exception as erroInfos:
				yield erroInfos

		elif act == 'del':
			try:
				with sqlite3.connect(f'db/{dbName}.db') as conn:
					cursor = conn.cursor()
					query = f"DELETE FROM {table} WHERE {params['column']} = \"{str(params['value'])}\""
					result = cursor.execute(query)
				if result.rowcount > 0:
					yield f"Del {params['column']}: {params['value']} success"
				else:
					yield f" {params['column']}: {params['value']} has been deleted"
			except Exception as erroInfos:
				yield erroInfos

		else:
			yield None

	header = {
		"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.54 Safari/537.36"
	}
