from base.parser import Parser
import time
import hashlib
import json
import requests
from typing import Dict

import sys
sys.tracebacklimit = 0

class Parser(Parser):  # 继承base.parser.Parser
    def parse(self, params: Dict[str, str]) -> Dict[str, str]:
        # 从参数获取id，默认值为'bjws4k'
        id_param = params.get("id", "bjws4k")
        # 频道ID与密钥的映射关系
        n = {
            'bjws4k': '5481pu3mib99s696hvtkq65c25n',
            'bjws': '573ib1kp5nk92irinpumbo9krlb',
            'bjwy': '54db6gi5vfj8r8q1e6r89imd64s',
            'bjjs': '53bn9rlalq08lmb8nf8iadoph0b',
            'bjys': '50mqo8t4n4e8gtarqr3orj9l93v',
            'bjcj': '50e335k9dq488lb7jo44olp71f5',
            'bjty': '54hv0f3pq079d4oiil2k12dkvsc',
            'bjsh': '50j015rjrei9vmp3h8upblr41jf',
            'bjxw': '53gpt1ephlp86eor6ahtkg5b2hf',
            'bjkk': '55skfjq618b9kcq9tfjr5qllb7r',
        }
        
        # 校验id是否有效
        if id_param not in n:
            return {"error": f"Invalid id: {id_param}"}
        
        # 生成时间戳和token
        timestamp = int(time.time())
        token = hashlib.md5(f"{timestamp}{n[id_param]}".encode()).hexdigest()
        push_id = token  
        
        # 构建请求参数
        body_params = {
            "browse_mode": "1",
            "channel": "ali",
            "id": n[id_param],
            "net": "WIFI",
            "os": "NOX666999",
            "os_type": "Android",
            "os_ver": "33",
            "push_id": push_id,
            "timestamp": timestamp,
            "token": token,
            "ver": "100600"
        }
        
        # 计算签名
        body_str = "&".join([f"{k}={v}" for k, v in body_params.items()])
        sign_md5 = hashlib.md5(f"{body_str}shi!@#$%^&*[xian!@#]*".encode()).hexdigest()
        sign = sign_md5[3:10]         
        url = f"https://app.api.btime.com/video/play?{body_str}&sign={sign}"
        
        # 发送请求并处理响应
        headers = {
            'User-Agent': 'bjtime 100600',
            'Referer': 'android-app.btime.com'
        }
        
        try:
            response = requests.get(url, headers=headers, timeout=10)
            response.raise_for_status()  
            data = response.json()
            playurl = data['data']['video_stream'][0]['stream_url']
            return {"url": playurl}
            
        except Exception as e:
            return {"error": f"请求失败: {str(e)}", "url": url}
    
    def stop(self):
        # 停止运行时任务（空实现，保持格式统一）
        pass
    
    def proxy(self, url: str, headers: Dict[str, str]):
        # 代理流处理（空实现，保持格式统一）
        pass
