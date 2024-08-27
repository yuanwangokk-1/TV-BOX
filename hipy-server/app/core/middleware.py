import time
from core.logger import logger
from core.config import settings
from fastapi import Request
from common import error_code
from common.resp import respSuccessJson, respErrorJson
from fastapi.middleware import Middleware
from starlette.responses import Response, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint


class LoggerMiddleware(BaseHTTPMiddleware):

    async def dispatch(
            self, request: Request, call_next: RequestResponseEndpoint
    ) -> Response:
        start_time = int(time.time() * 1000)
        response = await call_next(request)
        end_time = int(time.time() * 1000)
        logger.info(
            f"请求:{request.method} | {request.url.path} | {request.client.host} | 响应:{response.status_code} | "
            f"耗时: {(end_time - start_time)}ms")
        return response


class AuthorizationMiddleware(BaseHTTPMiddleware):

    def __init__(self, app):
        super().__init__(app)

    async def dispatch(
            self, request: Request, call_next: RequestResponseEndpoint
    ) -> Response:
        if not request.headers.get("authorization"):
            return respErrorJson(error=error_code.ERROR_USER_TOKEN_FAILURE)
        response = await call_next(request)
        return response

middleware = [
    # 跨域中间件
    Middleware(CORSMiddleware, allow_origins=settings.BACKEND_CORS_ORIGINS,
                           allow_credentials=True, allow_methods=["*"], allow_headers=["*"]),
    # 日志中间件
    Middleware(LoggerMiddleware),

    # 认证中间件
    # Middleware(AuthorizationMiddleware)
]
