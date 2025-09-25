# -*- coding: utf-8 -*-
# 短剧狗爬虫 - 全网免费短剧网盘合集

import sys
import requests
from urllib.parse import urljoin, quote_plus
import re
from bs4 import BeautifulSoup

sys.path.append('../../')
try:
    from base.spider import Spider
except ImportError:
    # 定义一个基础接口类，用于本地测试
    class Spider:
        def init(self, extend=""):
            pass

class Spider(Spider):
    def __init__(self):
        self.siteUrl = 'https://duanjugou.top'
        self.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
        self.cateManual = {
            "总裁": "总裁",
            "穿越": "穿越",
            "闪婚": "闪婚",
            "神医": "神医"
        }
    
    def getName(self):
        return "短剧狗"
    
    def init(self, extend=""):
        return
    
    def fetch(self, url, headers=None):
        """统一的网络请求接口"""
        if headers is None:
            headers = {
                "User-Agent": self.userAgent,
                "Referer": self.siteUrl,
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
                "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8"
            }
        
        try:
            response = requests.get(url, headers=headers, timeout=10, allow_redirects=True)
            response.raise_for_status()
            return response
        except Exception as e:
            print(f"请求异常: {url}, 错误: {str(e)}")
            return None
        
    def isVideoFormat(self, url):
        # 对于网盘链接，不是直接的视频格式
        return False
    
    def manualVideoCheck(self):
        # 不需要手动检查
        return False
    
    def homeContent(self, filter):
        result = {}
        
        # 构建分类列表
        classes = []
        for k in self.cateManual:
            classes.append({
                'type_id': self.cateManual[k],
                'type_name': k
            })
        
        result['class'] = classes
        
        # 获取首页推荐视频
        try:
            result['list'] = self.homeVideoContent()['list']
        except:
            result['list'] = []
        
        return result
    
    def homeVideoContent(self):
        url = self.siteUrl
        try:
            print(f"获取首页内容：{url}")  # 调试输出
            response = self.fetch(url)
            if not response:
                return {'list': []}
            
            html_content = response.text
            soup = BeautifulSoup(html_content, 'html.parser')
            
            # 根据网站实际结构，找到首页内容区域
            main_list_section = soup.find('div', class_='erx-list-box')
            if not main_list_section:
                print(f"未找到erx-list-box容器")
                return {'list': []}
                
            item_list = main_list_section.find('ul', class_='erx-list')
            if not item_list:
                print(f"未找到erx-list列表")
                return {'list': []}
            
            videos = []
            
            items = item_list.find_all('li', class_='item')
            print(f"首页找到 {len(items)} 个项目")  # 调试输出
            
            for item in items:
                try:
                    # 获取标题区域
                    a_div = item.find('div', class_='a')
                    if not a_div:
                        continue
                    
                    # 提取链接和标题
                    link_elem = a_div.find('a', class_='main')
                    if not link_elem:
                        continue
                    
                    title = link_elem.text.strip()
                    link = link_elem.get('href')
                    
                    # 提取时间
                    i_div = item.find('div', class_='i')
                    time_text = ""
                    if i_div:
                        time_span = i_div.find('span', class_='time')
                        if time_span:
                            time_text = time_span.text.strip()
                    
                    if not link.startswith('http'):
                        link = urljoin(self.siteUrl, link)
                    
                    # 使用默认图标
                    img = "https://duanjugou.top/zb_users/theme/erx_Special/images/logo.png"
                    
                    videos.append({
                        "vod_id": link.replace("https://duanjugou.top", ""),
                        "vod_name": title,
                        "vod_pic": img,
                        "vod_remarks": time_text
                    })
                except Exception as e:
                    print(f"处理单个短剧时出错: {str(e)}")
                    continue
            
            print(f"首页解析完成，共获取到 {len(videos)} 个视频")  # 调试输出
            return {'list': videos}
        except Exception as e:
            print(f"获取首页内容时出错: {str(e)}")
            return {'list': []}
    
    def categoryContent(self, tid, pg, filter, extend):
        result = self.switch(tid, pg)
        result['page'] = pg
        result['pagecount'] = 9999
        result['limit'] = 90
        result['total'] = 999999
        return result
        
    def switch(self, tid, pg):
        url = f"{self.siteUrl}/search.php?q={tid}&page={pg}"

        try:
            response = self.fetch(url)
            if not response:
                return {'list': []}
            
            html_content = response.text
            soup = BeautifulSoup(html_content, 'html.parser')
            
            # 根据网站实际结构，找到首页内容区域
            main_list_section = soup.find('div', class_='erx-list-box')
            if not main_list_section:
                print(f"未找到erx-list-box容器")
                return {'list': []}
                
            item_list = main_list_section.find('ul', class_='erx-list')
            if not item_list:
                print(f"未找到erx-list列表")
                return {'list': []}
            
            videos = []
            
            items = item_list.find_all('li', class_='item')
            
            for item in items:
                try:
                    # 获取标题区域
                    a_div = item.find('div', class_='a')
                    if not a_div:
                        continue
                    
                    # 提取链接和标题
                    link_elem = a_div.find('a', class_='main')
                    if not link_elem:
                        continue
                    
                    title = link_elem.text.strip()
                    link = link_elem.get('href')
                    
                    # 提取时间
                    i_div = item.find('div', class_='i')
                    time_text = ""
                    if i_div:
                        time_span = i_div.find('span', class_='time')
                        if time_span:
                            time_text = time_span.text.strip()
                    
                    if not link.startswith('http'):
                        link = urljoin(self.siteUrl, link)
                    
                    # 使用默认图标
                    img = "https://duanjugou.top/zb_users/theme/erx_Special/images/logo.png"
                    
                    videos.append({
                        "vod_id": link.replace("https://duanjugou.top", ""),
                        "vod_name": title,
                        "vod_pic": img,
                        "vod_remarks": f"{time_text}"
                    })
                except Exception as e:
                    print(f"处理单个短剧时出错: {str(e)}")
                    continue
            
            return {'list': videos}
        except Exception as e:
            print(f"获取首页内容时出错: {str(e)}")
            return {'list': []}


    
    def detailContent(self, ids):
        # 解析详情页面URL
        url = ids[0]
        if not url.startswith('http'):
            url = urljoin(self.siteUrl, url)
            
        try:
            response = self.fetch(url)
            if not response:
                return {}
                
            html_content = response.text
            soup = BeautifulSoup(html_content, 'html.parser')
            
            # 查找页面主体内容 - 使用erx-wrap类而不是article
            main_content = soup.find('div', class_='erx-wrap')
            if not main_content:
                print(f'无法找到erx-wrap容器')
                return {}
            
            # 尝试找到标题 - 从页面标题获取
            title = '未知标题'
            title_tag = soup.find('title')
            if title_tag:
                title = title_tag.text.strip()
                # 去掉网站名称
                title = title.split('_')[0].strip()
            
            # 网盘分类关键字
            pan_domains = {
                "百度网盘": ["pan.baidu.com"],
                "阿里云盘": ["alipan.com", "aliyundrive.com"],
                "夸克网盘": ["pan.quark.cn"],
                "迅雷网盘": ["pan.xunlei.com"],
                "天翼云盘": ["cloud.189.cn"],
                "移动云盘": ["caiyun.139.com"],
                "UC网盘": ["drive.uc.cn"],
                "115网盘": ["115cdn.com", "115.com", "anxia.com"],
                "PikPak": ["mypikpak.com"],
                "123网盘": ["123684.com", "123685.com", "123912.com", "123pan.com", "123pan.cn", "123592.com"]
            }

            # 获取网盘链接和下载链接
            pan_links = []
            download_links = []
            
            # 使用正则表达式查找所有可能的链接 - 改进版本，排除末尾的...
            link_pattern = re.compile(r"((?!https?://t\.me)(?:https?://[^\s'\"<>【】\n\.]+(?:\.[^\s'\"<>【】\n\.]+)+(?:/[^\s'\"<>【】\n\.]*)?|magnet:\?xt=urn:btih:[a-zA-Z0-9]+))")
            all_links = link_pattern.findall(html_content)
            
            # 链接去重和清理
            link_map = {}  # 用于去重
            
            # 清理链接函数
            def clean_link(link):
                # 移除尾部非URL字符
                clean = re.sub(r'[\'">].*$', '', link)
                # 移除末尾的省略号
                clean = re.sub(r'\.{3,}$', '', clean)
                # 标准化链接 - 移除URL末尾的斜杠
                clean = clean.rstrip('/')
                return clean
            
            # 处理从正则表达式找到的链接
            for link in all_links:
                clean_link_str = clean_link(link)
                if clean_link_str and len(clean_link_str) > 10:  # 确保链接有效
                    base_url = clean_link_str.split('?')[0]  # 用于基本去重
                    if base_url not in link_map:
                        link_map[base_url] = clean_link_str
            
            # 查找页面中的所有链接元素
            a_tags = main_content.find_all('a', href=True)
            for a in a_tags:
                href = a.get('href', '').strip()
                # 过滤非法链接并清理
                if href and not href.startswith('#') and not href.startswith('javascript:'):
                    clean_href = clean_link(href)
                    if clean_href and len(clean_href) > 10:
                        base_url = clean_href.split('?')[0]
                        if base_url not in link_map:
                            link_map[base_url] = clean_href
            
            # 转换去重后的链接映射为列表
            cleaned_links = list(link_map.values())
            
            # 处理所有找到的链接
            for href in cleaned_links:
                # 跳过无效链接
                if not href or href == '#' or href.startswith('javascript:'):
                    continue
                
                # 获取链接文本（如果是从a标签提取的）
                text = ""
                for a in a_tags:
                    if clean_link(a.get('href', '')) == href:
                        text = a.text.strip()
                        break
                
                # 如果没有链接文本，使用默认文本
                if not text:
                    text = "链接"
                
                # 检查是否是磁力链接
                if href.startswith('magnet:'):
                    download_links.append({
                        'name': f"{text or '磁力链接'}",
                        'url': href
                    })
                    continue
                
                # 检查是否是网盘链接
                is_pan_link = False
                for pan_name, domains in pan_domains.items():
                    if any(domain in href for domain in domains):
                        pan_links.append({
                            'name': f"{text or pan_name}",
                            'url': href
                        })
                        is_pan_link = True
                        break
                
                # 如果不是已知的网盘链接，检查是否是其他类型的下载链接
                if not is_pan_link and re.search(r'(ed2k|thunder|ftp):', href):
                    download_links.append({
                        'name': f"{text or '下载链接'}",
                        'url': href
                    })
            
            # 提取网盘密码 - 在整个页面内容中查找
            pwd_pattern = re.compile(r'提取码[:：]\s*([a-zA-Z0-9]{4})')
            pwd_match = pwd_pattern.search(html_content)
            pwd = pwd_match.group(1) if pwd_match else ''
            
            # 构建播放列表
            vod_play_from = []
            vod_play_url = []
            
            if pan_links:
                vod_play_from.append('网盘链接')
                play_urls = []
                for i, link in enumerate(pan_links):
                    play_urls.append(f"{link['name']}$push://{link['url']}")
                vod_play_url.append('#'.join(play_urls))
            
            if download_links:
                vod_play_from.append('下载链接')
                play_urls = []
                for i, link in enumerate(download_links):
                    play_urls.append(f"{link['name']}$push://{link['url']}")
                vod_play_url.append('#'.join(play_urls))
            
            # 提取简介 - 使用整个内容区域
            content_text = main_content.text.strip()
            # 清理文本
            content_text = re.sub(r'\s+', ' ', content_text)
            
            # 限制简介长度
            description = content_text[:500] + '...' if len(content_text) > 500 else content_text
            
            # 如果有提取码，添加到简介中
            if pwd:
                description = f"提取码: {pwd}\n\n{description}"
            
            vod = {
                'vod_id': ids[0],
                'vod_name': title,
                'vod_pic': 'https://duanjugou.top/zb_users/theme/erx_Special/images/logo.png',
                'type_name': '短剧',
                'vod_year': '',
                'vod_area': '',
                'vod_remarks': '',
                'vod_actor': '',
                'vod_director': '',
                'vod_content': description
            }
            
            if vod_play_from:
                vod['vod_play_from'] = '$$$'.join(vod_play_from)
                vod['vod_play_url'] = '$$$'.join(vod_play_url)
            
            return {
                'list': [vod]
            }
        except Exception as e:
            print(f"获取详情内容时出错: {str(e)}")
            return {}
    
    def searchContent(self, key, quick, pg=1):
        result = self.switch(key, pg=pg)
        result['page'] = pg
        return result
    
    def searchContentPage(self, key, quick, pg=1):
        return self.searchContent(key, quick, pg)
    
    def playerContent(self, flag, id, vipFlags):
        return {
            "parse": 0,
            "url": id,
            "header": {
                "User-Agent": self.userAgent
            }
        }
    
    def localProxy(self, param):
        # 当前场景不需要本地代理
        return None
    
    def destroy(self):
        # 资源回收
        pass 