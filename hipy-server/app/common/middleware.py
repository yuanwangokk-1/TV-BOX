import datetime
import json
import os
import time
import traceback
from fastapi import Request, Response
from fastapi.responses import StreamingResponse
from starlette.concurrency import iterate_in_threadpool
from starlette.datastructures import URL, Headers
from starlette.types import ASGIApp, Receive, Scope, Send
from fastapi.middleware.trustedhost import TrustedHostMiddleware

import logging

from db.mongo import get_mongo


async def set_body(request: Request):
    receive_ = await request._receive()
    async def receive():
        return receive_
    request._receive = receive
    
    
class AsyncIterationWrap:
    def __init__(self, obj):
        self._it = iter(obj)

    def __aiter__(self):
        return self

    async def __anext__(self):
        try:
            value = next(self._it)
        except StopIteration:
            raise StopAsyncIteration
        return value


class RequestsLoggerMiddleware:

    LOG_URL_PATH_STARTSWITH = ("/api/",)
    
    def __init__(self, logger: logging.Logger = None, log_dir: str = "./log/", log_name: str = 'requests'):
        self.logger = logger or self.createLogger(log_dir, log_name)
        
    def createLogger(self, log_dir: str, log_name: str) -> logging.Logger:
        logger = logging.Logger.manager.loggerDict.get(log_name)
        if logger: return logger # logger 已存在
        logger = logging.getLogger(log_name)
        if logger == logging.root: return logger # logger是root
        logger.setLevel(logging.INFO)
        logger.propagate = False
        log_path = os.path.join(log_dir, log_name + ".log")
        fh = logging.handlers.RotatingFileHandler(log_path, maxBytes=5*1024*1024, backupCount=10, delay=False)
        fh.setLevel(logging.INFO)
        logger.addHandler(fh)
        return logger
    
    async def setRequestBody(self, request: Request):
        receive_ = await request._receive()
        async def receive():
            return receive_
        request._receive = receive

    async def __call__(self, request: Request, call_next: callable) -> Response:
        if not request.url.path.startswith(tuple(self.LOG_URL_PATH_STARTSWITH)):
            response = await call_next(request)
            return response
        log_data = {
            'ts': int(time.time() * 1000), 
            'dt': str(datetime.datetime.now()),
            'method': request.method,
            'path': request.url.path,
            'query': request.url.query,
            # 'headers': dict(request.headers),
            # 'cookies': dict(request.cookies),
            'referer': request.headers.get("referer"),
            'content-type': request.headers.get("content-type"),
            "client_ip": (request.headers.get("x_forwarded_for", "") or request.client.host or "").split(",")[0],
            'body': "",
        }
        if not log_data["content-type"]:
            pass
        elif log_data["content-type"] in ("application/json", ): 
            await set_body(request)
            body = await request.body()
            try:
                log_data['body'] = json.loads(body)
            except json.JSONDecodeError:
                log_data['body'] = body.decode()
        response = await call_next(request)  # type: StreamingResponse
        log_data.update({
            'status_code': response.status_code,
            'resp': ""
        })
        if isinstance(response, StreamingResponse) and response.headers.get("content-type", "") == "application/json":
            resp_body = [section async for section in response.body_iterator]
            response.body_iterator = AsyncIterationWrap(resp_body)
            try:
                log_data['resp'] = json.loads(b''.join(resp_body))
            except json.JSONDecodeError:
                log_data['resp'] = (b''.join(resp_body)).decode()
        self.logger.info(json.dumps(log_data))
        # if mongo := get_mongo():  # python3.8+
        mongo = get_mongo()
        if mongo:
            mongo.get_collection("requests_log").insert_one(log_data)
        return response
    
    