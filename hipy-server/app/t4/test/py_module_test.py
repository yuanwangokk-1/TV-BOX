#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : py_module_test.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Date  : 2024/3/1

import pythonmonkey as pm
from pythonmonkey import eval as js_eval, require as js_require
from utils.quickjs_ctx import initGlobalThis

print(pm.__version__)
initGlobalThis(pm)
local = js_require('./py_module')
print(local)
local.set('url', 'https://www.baidu.com1')
print(local.get2('url'))
