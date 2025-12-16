import requests
import re
import json
from urllib.parse import urljoin

class VideoSpider:
    def __init__(self):
        self.config = {
            "作者": "Aries",
            "站名": "高清SEX国产",
            "请求头": "User-Agent$MOBILE_UA",
            "编码": "UTF-8",
            "主页url": "https://fast-cake-fest.sexav-102.com/",
            "首页": "120",
            "起始页": "1",
            "分类url": "https://fast-cake-fest.sexav-102.com/t/{cateId}-{catePg}/html",
            "分类": "国产视频$163# 网曝黑料$232#主播大秀$236# AV解说$233#国产自拍$48# 抖阴视频$231#国产传媒$2#综合传媒$227#麻豆合集$38#葫芦影业$109#天美传媒$111#果冻传媒$112#91制片厂$131#蜜桃传媒$113#日本有码$1#丝袜美腿$36#绝美少女$53#日本口爆$58#萝莉少女$234#强奸乱伦$6#日本巨乳$7#制服诱惑$9#国模私拍$45#空姐模特$67#国产学生$69#人妻熟女$70#国产 OL$74#国产名人$75#国产精品$17#国产剧情$18#精东影业$114#皇家华人$115#SWAG$116#兔子先生$120#大象传媒$125#乌鸦传媒$126#糖心VLOG$128#星空传媒$130#日本无码$5#人妻熟女$10#日本调教$11#日本出轨$12#中文字幕$13#日本素人$16#巨乳无码$32#制服无码$35#波多野结衣$89#三上悠亚$87# 河北彩花$230#葵司$90#桃乃木香奈$93#松本一香$103#篠田優$205#川上奈奈美$215#综合番号$225#200GANA$142#259LUXU$146#300MIUM$143#300MAAN$149#MIAA$190#SSIS$191#STARS$186#国产视频$163# 网曝黑料$232#主播大秀$236# AV解说$233#国产自拍$48# 抖阴视频$231#国产传媒$2#综合传媒$227#麻豆合集$38#葫芦影业$109#天美传媒$111#果冻传媒$112#91制片厂$131#蜜桃传媒$113#日本有码$1#丝袜美腿$36#绝美少女$53#日本口爆$58#萝莉少女$234#强奸乱伦$6#日本巨乳$7#制服诱惑$9#国模私拍$45#空姐模特$67#国产学生$69#人妻熟女$70#国产 OL$74#国产名人$75#国产精品$17#国产剧情$18#精东影业$114#皇家华人$115#SWAG$116#兔子先生$120#大象传媒$125#乌鸦传媒$126#糖心VLOG$128#星空传媒$130#日本无码$5#人妻熟女$10#日本调教$11#日本出轨$12#中文字幕$13#日本素人$16#巨乳无码$32#制服无码$35#波多野结衣$89#三上悠亚$87# 河北彩花$230#葵司$90#桃乃木香奈$93#松本一香$103#篠田優$205#川上奈奈美$215#综合番号$225#200GANA$142#259LUXU$146#300MIUM$143#300MAAN$149#MIAA$190#SSIS$191#STARS$186#国产传媒主播$2#日本有码主播$1#",
            "二次截取": "",
            "数组": "col-25 col-m-12 mb20\"&&</h2>",
            "标题": "title=\"&&\"",
            "图片": "img src=\"&&\"",
            "副标题": "🌹+>&&<",
            "链接": "href=\"&&\"",
            "线路二次截取": "<ul&&</ul>",
            "线路数组": "tags-box\"&&</span>",
            "线路标题": "🍄+>&&<",
            "播放二次截取": "",
            "播放数组": "tx-text mb20r\"&&</span>",
            "倒序": "0",
            "播放列表": "<a&&/a>",
            "播放标题": "🌹+>&&<",
            "播放链接": "href=\"&&\"",
            "跳转播放链接": "var player_*\"url\":\"&&\""
        }
        
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1'
        })
    
    def parse_categories(self):
        """解析分类信息"""
        categories = []
        category_list = self.config["分类"].split("#")
        for category in category_list:
            if "$" in category:
                name, cate_id = category.strip().split("$")
                categories.append({
                    "name": name.strip(),
                    "id": cate_id.strip()
                })
        return categories
    
    def extract_content(self, html, pattern):
        """根据模式提取内容"""
        if "&&" not in pattern:
            return []
        
        if pattern.startswith("title=\""):
            regex = pattern.replace("&&", "(.*?)\"")
        elif pattern.startswith("img src=\""):
            regex = pattern.replace("&&", "(.*?)\"")
        elif pattern.startswith("href=\""):
            regex = pattern.replace("&&", "(.*?)\"")
        elif pattern.startswith("🌹+>"):
            regex = pattern.replace("🌹+>&&<", "🌹+>(.*?)<")
        elif pattern.startswith("🍄+>"):
            regex = pattern.replace("🍄+>&&<", "🍄+>(.*?)<")
        elif "&&</h2>" in pattern:
            regex = pattern.replace("&&</h2>", "(.*?)</h2>")
        elif "&&</span>" in pattern:
            regex = pattern.replace("&&</span>", "(.*?)</span>")
        else:
            return []
        
        matches = re.findall(regex, html, re.S)
        return [match.strip() for match in matches if match.strip()]
    
    def get_home_videos(self, page=1):
        """获取首页视频列表"""
        url = self.config["主页url"]
        if page > 1:
            url = f"{self.config['主页url']}page/{page}/"
        
        try:
            response = self.session.get(url)
            response.encoding = self.config["编码"]
            html = response.text
            
            # 提取视频数组
            array_pattern = self.config["数组"]
            if "&&</h2>" in array_pattern:
                start_tag, end_tag = array_pattern.split("&&</h2>")
                videos_html = re.findall(f'{start_tag}(.*?)</h2>', html, re.S)
            else:
                videos_html = [html]
            
            videos = []
            for video_html in videos_html:
                video = {}
                
                # 提取标题
                title_pattern = self.config["标题"]
                titles = self.extract_content(video_html, title_pattern)
                if titles:
                    video["title"] = titles[0]
                
                # 提取图片
                img_pattern = self.config["图片"]
                imgs = self.extract_content(video_html, img_pattern)
                if imgs:
                    video["image"] = imgs[0]
                
                # 提取副标题
                subtitle_pattern = self.config["副标题"]
                subtitles = self.extract_content(video_html, subtitle_pattern)
                if subtitles:
                    video["subtitle"] = subtitles[0]
                
                # 提取链接
                link_pattern = self.config["链接"]
                links = self.extract_content(video_html, link_pattern)
                if links:
                    video["link"] = urljoin(self.config["主页url"], links[0])
                
                if video:
                    videos.append(video)
            
            return videos
            
        except Exception as e:
            print(f"获取首页视频失败: {e}")
            return []
    
    def get_category_videos(self, cate_id, page=1):
        """获取分类视频列表"""
        url = self.config["分类url"].replace("{cateId}", cate_id).replace("{catePg}", str(page))
        
        try:
            response = self.session.get(url)
            response.encoding = self.config["编码"]
            html = response.text
            
            # 使用与首页相同的方法提取视频
            return self.get_home_videos_from_html(html)
            
        except Exception as e:
            print(f"获取分类视频失败: {e}")
            return []
    
    def get_home_videos_from_html(self, html):
        """从HTML中提取视频列表"""
        # 提取视频数组
        array_pattern = self.config["数组"]
        if "&&</h2>" in array_pattern:
            start_tag, end_tag = array_pattern.split("&&</h2>")
            videos_html = re.findall(f'{start_tag}(.*?)</h2>', html, re.S)
        else:
            videos_html = [html]
        
        videos = []
        for video_html in videos_html:
            video = {}
            
            # 提取标题
            title_pattern = self.config["标题"]
            titles = self.extract_content(video_html, title_pattern)
            if titles:
                video["title"] = titles[0]
            
            # 提取图片
            img_pattern = self.config["图片"]
            imgs = self.extract_content(video_html, img_pattern)
            if imgs:
                video["image"] = imgs[0]
            
            # 提取副标题
            subtitle_pattern = self.config["副标题"]
            subtitles = self.extract_content(video_html, subtitle_pattern)
            if subtitles:
                video["subtitle"] = subtitles[0]
            
            # 提取链接
            link_pattern = self.config["链接"]
            links = self.extract_content(video_html, link_pattern)
            if links:
                video["link"] = urljoin(self.config["主页url"], links[0])
            
            if video:
                videos.append(video)
        
        return videos

    def get_video_detail(self, video_url):
        """获取视频详情和播放链接"""
        try:
            response = self.session.get(video_url)
            response.encoding = self.config["编码"]
            html = response.text
            
            detail = {}
            
            # 提取播放链接
            play_pattern = self.config["跳转播放链接"]
            if "var player_*\"url\":\"&&\"" in play_pattern:
                regex = r'var player_.*?"url":"(.*?)"'
                play_urls = re.findall(regex, html)
                if play_urls:
                    detail["play_url"] = play_urls[0]
            
            # 提取线路信息
            line_pattern = self.config["线路二次截取"]
            if line_pattern:
                start_tag, end_tag = line_pattern.split("&&")
                line_htmls = re.findall(f'{start_tag}(.*?){end_tag}', html, re.S)
                
                lines = []
                for line_html in line_htmls:
                    # 提取线路标题
                    line_title_pattern = self.config["线路标题"]
                    line_titles = self.extract_content(line_html, line_title_pattern)
                    
                    # 提取线路链接
                    line_link_pattern = self.config["播放链接"]
                    line_links = self.extract_content(line_html, line_link_pattern)
                    
                    for title, link in zip(line_titles, line_links):
                        lines.append({
                            "title": title,
                            "link": urljoin(video_url, link)
                        })
                
                detail["lines"] = lines
            
            return detail
            
        except Exception as e:
            print(f"获取视频详情失败: {e}")
            return {}

# 使用示例
if __name__ == "__main__":
    spider = VideoSpider()
    
    # 获取分类信息
    categories = spider.parse_categories()
    print("分类列表:")
    for category in categories[:5]:  # 只显示前5个分类
        print(f"  {category['name']}: {category['id']}")
    
    # 获取首页视频
    print("\n首页视频:")
    home_videos = spider.get_home_videos()
    for video in home_videos[:3]:  # 只显示前3个视频
        print(f"  标题: {video.get('title', 'N/A')}")
        print(f"  图片: {video.get('image', 'N/A')}")
        print(f"  链接: {video.get('link', 'N/A')}")
        print()
    
    # 获取分类视频示例
    if categories:
        cate_id = categories[0]["id"]
        print(f"\n分类 '{categories[0]['name']}' 的视频:")
        category_videos = spider.get_category_videos(cate_id)
        for video in category_videos[:2]:  # 只显示前2个视频
            print(f"  标题: {video.get('title', 'N/A')}")
            print(f"  图片: {video.get('image', 'N/A')}")
            print()
