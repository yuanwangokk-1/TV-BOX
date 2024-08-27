#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : __init__.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Author's Blog: https://blog.csdn.net/qq_32394351
# Date  : 2023/12/5

from .views.views_server import router as monitor_server_api
from .views.views_logininfor import router as monitor_logininfor_api
from .views.views_job import router as monitor_job_api
from .views.view_job_log import router as monitor_job_log_api
from .views.views_pip import router as monitor_pip_api
from .views.views_cache import router as monitor_cache_api