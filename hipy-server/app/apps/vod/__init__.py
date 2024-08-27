# !/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : __init__.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Author's Blog: https://blog.csdn.net/qq_32394351
# Date  : 2023/12/7

from .vod_views import router as vod_api
from .views.view_rules import router as vod_rules_api
from .views.views_configs import router as vod_configs_api
from .views.views_houses import router as vod_houses_api
