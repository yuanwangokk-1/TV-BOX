#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : test_redirect.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Date  : 2024/4/10

import requests

url = 'https://www.wzget.cn/02w9z'
r = requests.get(url, allow_redirects=False)
print(r.status_code)
print(r.headers)

"""  
let response = req("http://192.168.31.145:8080/rmw2.php?url=1", {
                redirect: 0,
            });
location = response.headers.location || "";
console.log(location);
"""
