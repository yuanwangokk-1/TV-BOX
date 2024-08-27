import json
import traceback
import os
from typing import Optional, Dict, Any
from fastapi import FastAPI, status, HTTPException
from starlette.exceptions import HTTPException as StarletteHTTPException
from fastapi.exceptions import RequestValidationError
from .error_code import *
from core.config import settings
from .resp import respErrorJson
from starlette.requests import Request
from fastapi.templating import Jinja2Templates

folder_path = 'templates/ErrorFiles'
templates = Jinja2Templates(directory=folder_path)


def customExceptions(app: FastAPI):
    # 重写HTTPException为项目中需要的返回类型
    @app.exception_handler(StarletteHTTPException)
    async def http_exception_handle(request: Request, exec: StarletteHTTPException):
        file_names = [file for file in os.listdir(folder_path) if os.path.isfile(os.path.join(folder_path, file))]
        error_file_name = f'{exec.status_code}.html'
        if error_file_name in file_names:
            return templates.TemplateResponse(error_file_name, {'request': request, 'msg': exec.detail},
                                              status_code=exec.status_code)

        err = exec.err if hasattr(exec, 'err') else ErrorBase(code=exec.status_code)
        return respErrorJson(error=err, status_code=exec.status_code, msg=exec.detail)

    # 重写RequestValidationError为项目中需要的返回类型
    @app.exception_handler(RequestValidationError)
    async def http_exception_handle_json(request: Request, exec: RequestValidationError):
        err = ERROR_PARAMETER_ERROR
        return respErrorJson(error=err, status_code=err.code, data={'errors': json.loads(exec.json())})

    # 重写所有错误返回项目需要的格式错误 需要的时候可以用作错误消息推送
    @app.exception_handler(Exception)
    async def unhandled_exception_handler(request: Request, exc: Exception):
        # 处理未被捕获的其他异常
        err = ERROR_INTERNAL
        err_msg = traceback.format_exc()
        data = {'error_type': str(type(exc)), 'error_msg': str(exc), 'error_detail': err_msg}
        # # 使用MongoDB存放错误记录
        # mongo = app.mongo # type: pymongo.database.Database
        # if mongo:
        #     mongo['request_exceptions'].insert_one(data)
        return respErrorJson(error=err, status_code=err.code, data=data if settings.DEBUG else {})

    # @app.exception_handler(404)
    # async def not_found_exception_handler(request: Request, exc: HTTPException):
    #     return templates.TemplateResponse('404.html', {'request': request}, status_code=404)


class CustomErrorBase(HTTPException):
    err: ErrorBase

    def __init__(self, headers: Optional[Dict[str, Any]] = None):
        super().__init__(status_code=status.HTTP_200_OK,
                         detail=self.err.msg,
                         headers=headers)


class UserTokenError(CustomErrorBase):
    err = ERROR_USER_TOKEN_FAILURE


class UserPermError(CustomErrorBase):
    err = ERROR_USER_PREM_ERROR
