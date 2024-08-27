#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : server.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Author's Blog: https://blog.csdn.net/qq_32394351
# Date  : 2023/12/3

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from apps import api_router, web_router
from starlette.middleware.cors import CORSMiddleware
from common.exceptions import customExceptions
from core.config import settings
from core.middleware import middleware
from core.logger import logger
# from common.middleware import RequestsLoggerMiddleware
from db.cache import registerRedis
# from tasks.timer import scheduler # 这个是没固化数据库的。scheduler.start() 启动
from common.task_apscheduler import scheduler_register, scheduler  # 固化数据库,scheduler.init_scheduler() 初始化
from utils.notes import set_start_time
from utils.server_info import get_server_info, get_host_ip

if settings.DEFAULT_SNIFFER == 'selenium':
    from sniffer.sniffer import Sniffer, browser_drivers

    _sniffer_type = 0
elif settings.DEFAULT_SNIFFER == 'playwright':
    from sniffer.snifferPro import Sniffer, browser_drivers

    _sniffer_type = 1
else:
    _sniffer_type = 2
    browser_drivers = []


class InitializeApp(object):
    """
    注册App
    """

    def __new__(cls, *args, **kwargs):
        # app = FastAPI(title=settings.PROJECT_NAME)
        app = FastAPI(title=settings.PROJECT_NAME, middleware=middleware)
        # set static files
        app.mount("/media", StaticFiles(directory="media"), name="media")  # 媒体文件
        app.mount("/static", StaticFiles(directory="static"), name="static")  # 静态文件
        app.mount("/web", StaticFiles(directory="templates"), name="templates")  # 模板静态文件
        # allow cross domain
        # app.add_middleware(CORSMiddleware, allow_origins=settings.BACKEND_CORS_ORIGINS,
        #                    allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

        # set redis
        registerRedis(app)
        # set custom exceptions
        customExceptions(app)
        # set timer
        cls.event_init(app)
        # api router
        cls.register_router(app)

        # set socketio
        # app.mount('/', socket_app)

        # print all path
        # for _route in app.routes:
        #     r = _route.__dict__
        #     print(r['path'], r.get('methods', {}))
        return app

    @staticmethod
    def register_router(app: FastAPI) -> None:
        """
        注册路由
        :param app:
        :return:
        """
        # 项目API
        app.include_router(api_router, prefix="/api/v1")
        # 网页API
        app.include_router(web_router, prefix="")

        # app.middleware("http")(RequestsLoggerMiddleware())  # http请求请求记录中间件  不需要可以注释掉，使用了可能会影响一点请求速度

    @staticmethod
    def event_init(app: FastAPI) -> None:
        """
        事件初始化
        :param app:
        :return:
        """

        @app.on_event("startup")
        async def startup():
            set_start_time()  # 写入程序启动时间

            # scheduler.start()  # 定时任务
            # 初始化 apscheduler
            # scheduler.init_scheduler()  # noqa 去掉不合理提示
            scheduler_register()

            try:
                if _sniffer_type == 0:
                    driver_path = Sniffer.get_driver_path(0)
                    logger.info(f'获取到driver_path:{driver_path}')
                    browser = Sniffer(driver_path=driver_path)
                elif _sniffer_type == 1:
                    browser = Sniffer()
                else:
                    browser = settings.SNIFFER_URL
                browser_drivers.append(browser)
            except Exception as e:
                logger.info(f'初始化加载browser_drivers发生错误:{e}')
                logger.info(
                    f'如果出现 It looks like you are using Playwright Sync API inside the asyncio loop. 可以忽略此错误，但是需要手动访问 /sniffer?active=1 进行激活')
            logger.info(f'服务器参数:{get_server_info()}')
            logger.info(f'本地地址: http://localhost:{settings.PORT}')
            logger.info(f'局域网地址: http://{get_host_ip()}:{settings.PORT}')

        @app.on_event('shutdown')
        async def shutdown():
            """
            关闭
            :return:
            """
            # await mysql.close_mysql()
            scheduler.shutdown()
            if _sniffer_type != 2:
                for browser in browser_drivers:
                    try:
                        browser.close()
                        logger.info(f'停用browser:{browser}执行成功')
                    except Exception as e:
                        logger.info(f'停用browser:{browser}发生了错误:{e}')
                logger.info(f'hipy-server服务已停止')
