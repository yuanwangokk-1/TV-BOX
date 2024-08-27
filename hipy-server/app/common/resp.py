from fastapi import status
from fastapi.responses import JSONResponse, HTMLResponse  # , ORJSONResponse
from pydantic import BaseModel
from typing import Union, Optional
import datetime
import decimal
import json
import typing

from common.error_code import ErrorBase


class DateEncoder(json.JSONEncoder):
    """
    解决dict 转json 时 datetime 转换失败
    使用方法：json.dumps(data, cls=DateEncoder)
    """

    def default(self, obj):
        if isinstance(obj, datetime.datetime):
            return obj.strftime("%Y-%m-%d %H:%M:%S")
        if isinstance(obj, datetime.date):
            return obj.strftime("%Y-%m-%d")
        elif isinstance(obj, decimal.Decimal):
            return float(obj)
        else:
            return json.JSONEncoder.default(self, obj)


def _render(self, content: typing.Any) -> bytes:
    return json.dumps(
        content,
        ensure_ascii=False,
        allow_nan=False,
        indent=self.indent or None,
        separators=(",", ":"),
        cls=DateEncoder,
    ).encode("utf-8")


# 覆写JSONResponse类的render方法让其支持格式化datatime类型数据
# setattr(JSONResponse,'render',_render)

class MyJSONResponse(JSONResponse):
    indent = 4
    # def render(self, content: typing.Any) -> bytes:
    #     return json.dumps(
    #         content,
    #         ensure_ascii=False,
    #         allow_nan=False,
    #         indent=None,
    #         separators=(",", ":"),
    #         cls=DateEncoder,
    #     ).encode("utf-8")


setattr(MyJSONResponse, 'render', _render)


class respJsonBase(BaseModel):
    code: int
    msg: str
    data: Union[dict, list]


def respSuccessJson(data: Union[list, dict, str] = None, msg: str = "Success"):
    """ 接口成功返回 """
    if not data and not isinstance(data, list) and not isinstance(data, dict):
        data = {}
    return MyJSONResponse(
        status_code=status.HTTP_200_OK,
        content={
            'code': 0,
            'msg': msg,
            'data': data
            # 'data': json.dumps(data or {}, cls=DateEncoder)
        }
    )


def respVodJson(data: Union[list, dict, str] = None):
    """ 接口成功返回 """
    if not data and not isinstance(data, list) and not isinstance(data, dict):
        data = {}
    return MyJSONResponse(
        status_code=status.HTTP_200_OK,
        content=data
    )


def respParseJson(data: Union[list, dict, str] = None, msg: str = '', code: int = 200, url: str = '', extra=None):
    """ 解析接口返回 """
    content = {'code': code, 'msg': msg, 'url': url}
    if not data and not isinstance(data, list) and not isinstance(data, dict):
        data = {}
    if extra is None:
        extra = {}

    if data:
        content['data'] = data
    headers = {
        "user-agent": "Mozilla/5.0"
    }
    if 'bilivideo.c' in url:
        headers.update({
            'referer': 'https://www.bilibili.com/'
        })
    content.update({'headers': headers})
    content.update(extra)
    return MyJSONResponse(
        status_code=code,
        content=content
    )


def respErrorJson(error: ErrorBase, *, msg: Optional[str] = None, msg_append: str = "",
                  data: Union[list, dict, str] = None, status_code: int = status.HTTP_200_OK):
    """ 错误接口返回 """
    return MyJSONResponse(
        status_code=status_code,
        content={
            'code': error.code,
            'msg': (msg or error.msg) + msg_append,
            'data': data or {}
        }
    )


def abort(status_code=None, content=None):
    if status_code is None:
        status_code = 403
    if content is None:
        content = """
 <!doctype html>
<html lang=en>
<title>403 Forbidden</title>
<h1>Forbidden</h1>
<p>You don&#39;t have the permission to access the requested resource. It is either read-protected or not readable by the server.</p>       
        """.strip()
    return HTMLResponse(status_code=status_code, content=content)
