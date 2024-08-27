#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : views.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Author's Blog: https://blog.csdn.net/qq_32394351
# Date  : 2023/12/3


from time import time
import ujson
from urllib.parse import urlparse, parse_qs, urljoin
from fastapi import APIRouter, Depends, Query, WebSocket, Request as Req, HTTPException
from starlette.responses import HTMLResponse, RedirectResponse, Response
import os
from common import error_code, deps
from sqlalchemy.orm import Session
from sqlalchemy import asc
from core.config import settings
from core.logger import logger
from utils.web import htmler, render_template_string, remove_comments, parseJson
from utils.cmd import update_db
from utils.vod_tool import base64ToImage, get_interval
from utils.httpapi import get_location_by_ip, getHotSuggest, getYspContent
from utils.quickjs_ctx import initContext
from network.request import Request
from common.resp import respSuccessJson, respErrorJson, respParseJson, respVodJson, abort
from .schemas import database_schemas
from fastapi.templating import Jinja2Templates
from fastapi.responses import FileResponse
from apps.system.curd.curd_dict_data import curd_dict_data
from apps.vod.curd.curd_rules import curd_vod_rules
from apps.vod.curd.curd_configs import curd_vod_configs
from pathlib import Path
import ast
import requests
import re

if settings.DEFAULT_SNIFFER == 'selenium':
    from sniffer.sniffer import Sniffer, browser_drivers

    _sniffer_type = 0
elif settings.DEFAULT_SNIFFER == 'playwright':
    from sniffer.snifferPro import Sniffer, browser_drivers

    _sniffer_type = 1
else:
    _sniffer_type = 2
    browser_drivers = []

try:
    from redis.asyncio import Redis as asyncRedis
except ImportError:
    from aioredis import Redis as asyncRedis

try:
    from quickjs import Function, Context
except ImportError:
    Function = None
    Context = None

router = APIRouter()
# htmler2 = Jinja2Templates(directory="templates")
htmler2 = Jinja2Templates(directory=settings.WEB_TEMPLATES_DIR)

# 存储所有连接到 WebSocket 的客户端
client_websockets = []


@router.get("/doc", response_class=HTMLResponse, summary="文档首页")
async def read_root(request: Req):
    return htmler2.TemplateResponse("index.html", {"request": request})


@router.get("/", summary="网站首页")
async def web_home():
    html = htmler.renderTemplate('index')
    return HTMLResponse(html)


@router.get("/blank", summary="空白页面")
async def web_blank():
    return HTMLResponse(f'{time()}')


@router.get('/favicon.ico', summary="网站默认图标")  # 设置icon
async def favicon():
    # return RedirectResponse('/static/img/favicon.svg')
    return FileResponse('static/img/favicon.ico')


@router.get('/blog', summary="博客首页")
async def blog():
    return RedirectResponse(settings.BLOG_URL)


# @router.get('/test')
# async def api_test():
#     """
#     这个例子就是很好的测试。加了async内部的代码逻辑不能去调用自己的其他接口否则会阻塞无法获取
#     @return:
#     """
#     import requests
#     r = requests.get('http://192.168.31.49:5707/files/hipy/两个BT.json', timeout=5)
#     print(r.text)
#     return respSuccessJson(data=r.json())

def merge_config(base_conf: dict, custom_conf: dict):
    """
    配置字典合并策略
    @param base_conf:
    @param custom_conf:
    @return:
    """
    if not custom_conf or len(custom_conf.keys()) < 1:
        return base_conf
    for key, value in custom_conf.items():
        # 合并列表
        if base_conf.get(key) and isinstance(base_conf[key], list) and isinstance(value, list):
            for v in value:
                if 'order_num' not in v:
                    v['order_num'] = 9999
            base_conf[key].extend(value)
            if key == 'sites':
                base_conf[key].sort(key=lambda x: x['order_num'])
        # 合并字典
        elif base_conf.get(key) and isinstance(base_conf[key], dict) and isinstance(value, dict):
            base_conf[key].update(value)
        # 覆盖其他类型
        elif base_conf.get(key) and type(base_conf[key]) == type(value):
            base_conf[key] = value
        # 新增原来不存在的
        elif not base_conf.get(key):
            base_conf[key] = value
    logger.info(f'合并配置共有解析数量:{len(base_conf.get("parses"))}')
    return base_conf


@router.get("/config/{mode}", summary="自动生成tvbox-hipy配置")
async def hipy_configs(*,
                       db: Session = Depends(deps.get_db),
                       r: asyncRedis = Depends(deps.get_redis),
                       request: Req,
                       mode: int = Query(..., title="模式 0:t4 1:t3"),
                       ):
    t1 = time()
    # 检测是否内网ip，如果是内网环境，不使用api_domain
    private_ip = re.compile(
        '^(127\\.0\\.0\\.1)|(localhost)|(10\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3})|(172\\.((1[6-9])|(2\\d)|(3[01]))\\.\\d{1,3}\\.\\d{1,3})|(192\\.168\\.\\d{1,3}\\.\\d{1,3})$')
    if settings.API_DOMAIN and settings.API_DOMAIN.startswith(
            'http') and '127.0.0.1' not in settings.API_DOMAIN and not private_ip.search(str(request.base_url)):
        host = settings.API_DOMAIN.rstrip('/')
    else:
        host = str(request.base_url).rstrip('/')
    groups = {}
    group_dict = curd_dict_data.getByType(db, _type='vod_rule_group')
    group_details = group_dict.get('details')
    for li in group_details:
        groups[li['label']] = li['value']
    order_bys = [asc(curd_vod_rules.model.order_num)]
    hipy_rules = curd_vod_rules.search(db=db, status=1, group=groups['hipy'], file_type='.py', page=1, page_size=9999,
                                       order_bys=order_bys)
    drpy_rules = curd_vod_rules.search(db=db, status=1, group=groups['drpy_js'], page=1, page_size=9999,
                                       order_bys=order_bys)
    # print(hipy_rules.get('results')[0])
    hipy_rules = [{
        'name': rec['name'],
        'file_type': rec['file_type'],
        'ext': rec['ext'] or '',
        'searchable': rec['searchable'],
        'quickSearch': rec['quickSearch'],
        'filterable': rec['filterable'],
        'order_num': rec['order_num'],
    } for rec in hipy_rules.get('results') or [] if rec['active'] and rec['is_exist']]

    drpy_rules = [{
        'name': rec['name'],
        'file_type': rec['file_type'],
        'ext': rec['ext'] or '',
        'searchable': rec['searchable'],
        'quickSearch': rec['quickSearch'],
        'filterable': rec['filterable'],
        'order_num': rec['order_num'],
    } for rec in drpy_rules.get('results') or [] if rec['active'] and rec['is_exist']]

    # print(hipy_rules)
    # print(drpy_rules)
    try:
        key = 'vod_config_base'
        if r:
            vod_configs_obj = await curd_vod_configs.getByKeyWithCache(r, db, key=key)
        else:
            vod_configs_obj = curd_vod_configs.getByKey(db, key=key)

        cf_value = vod_configs_obj.get('value')
        cf_value_type = vod_configs_obj.get('value_type')
    except Exception as e:
        logger.info(f'获取vod_config_base发生错误:{e}')
        cf_value = ''
        cf_value_type = 'error'

    if cf_value_type == 'file':
        def get_content(_d):
            """
            内部函数.获取配置参数对应文件的文本内容
            @param _d: 参数dict
            @return:
            """
            _d_value = _d['value']
            _d_group = _d_value.split('/')[0]
            _d_file_name = '/'.join(_d_value.split('/')[1:])
            _resp = get_file_path(db, _d_group, _d_file_name)
            if isinstance(_resp, list):
                _file_path = _resp[0]
                # print(jx_file_path)
                with open(_file_path, encoding='utf-8') as f:
                    _content = f.read()
                _content = remove_comments(_content)
            else:
                _content = ''
            return _content

        filters = [curd_vod_configs.model.status == 1]
        data, total, offset, limit = curd_vod_configs.get_multi(db, page=1, page_size=99, filters=filters,
                                                                order_bys=[asc(curd_vod_configs.model.order_num)])
        # print(data)
        config = {}
        jxs = []
        custom_content = ''
        custom_dict = {}
        hipy_env = {}
        for d in data:
            if d['value_type'] == 'file':
                config[d['key']] = f"{host}/files/{d['value']}"
            elif d['value_type'] == 'json':
                try:
                    d['value'] = ujson.loads(d['value'])
                except Exception as e:
                    logger.info(f"错误{e}.参数{d['key']}的值不是正确的json文本。转字典失败。赋值为空字典")
                    d['value'] = {}
                config[d['key']] = d['value']
            else:
                config[d['key']] = d['value']

            if d['key'] == 'vod_vip_parse' and d['value_type'] == 'file':
                jx_content = get_content(d)
                jx_content = render_template_string(jx_content, host=host)
                for jx in jx_content.split('\n'):
                    jx = jx.strip()
                    jx_arr = jx.split(',')
                    if len(jx_arr) > 1:
                        jx_name = jx_arr[0]
                        jx_url = jx_arr[1]
                        jx_type = jx_arr[2] if len(jx_arr) > 2 else 0
                        jx_ua = jx_arr[3] if len(jx_arr) > 3 else ''
                        jx_flag = jx_arr[4] if len(jx_arr) > 4 else ''
                        jxs.append({
                            'name': jx_name,
                            'url': jx_url,
                            'type': jx_type,
                            'ua': jx_ua,
                            'flag': jx_flag,
                        })
            elif d['key'] == 'vod_config_custom' and d['value_type'] == 'file':
                custom_content = get_content(d)
            elif d['key'] == 'vod_hipy_env' and d['value_type'] == 'json':
                hipy_env = d['value']

        group = cf_value.split('/')[0]
        file_name = '/'.join(cf_value.split('/')[1:])
        resp = get_file_path(db, group, file_name)
        if isinstance(resp, int):
            return abort(404, f'invalid value:{cf_value},file not found')
        file_path = resp[0]

        rules = hipy_rules + drpy_rules
        # 按order_num排序
        rules.sort(key=lambda x: x['order_num'])

        rules = ujson.dumps(rules, ensure_ascii=False)
        # rules里支持{{host}}渲染
        rules = render_template_string(rules, **{'host': host})
        rules = ujson.loads(rules)
        # print(rules)
        # 自定义额外sites,从用户附加里面去获取
        sites = []

        def getQuery(api, query):
            new_dict = {}
            base_url = f'{host}/files/drpy_js/{api}'
            try:
                query = urlparse(query).query
                parse_obj = parse_qs(query, keep_blank_values=True, strict_parsing=True)
                for key, value in parse_obj.items():
                    new_dict[key] = ''.join(value)
                params = new_dict.get('params')
                if new_dict.get('type') == 'url' and params:
                    params = urljoin(base_url, params)
                elif params:
                    params = params
                else:
                    params = ''
                return params
            except:
                return ''

        context = {'config': config, 'rules': rules, 'env': hipy_env,
                   'host': host, 'mode': mode, 'sites': sites,
                   'jxs': jxs, 'alists': [], 'getQuery': getQuery,
                   }
        if custom_content:
            try:
                render_custom_content = render_template_string(custom_content, **context)
                custom_dict = parseJson(render_custom_content)
            except Exception as e:
                logger.info(f'获取custom_dict发生错误:{e}')

        # print(custom_dict)
        # print(config)
        # print(context)
        try:
            with open(file_path, encoding='utf-8') as f:
                file_content = f.read()
            render_text = render_template_string(file_content, **context)
            # 单引号替换双引号
            # render_text = render_text.replace("'", '"')
            # render_dict = ujson.loads(render_text)
            render_dict = ast.literal_eval(render_text)
            if custom_content and custom_dict:
                merge_config(render_dict, custom_dict)
                render_dict['cost_time'] = get_interval(t1)
                render_text = ujson.dumps(render_dict, ensure_ascii=False, indent=4)
            else:
                render_dict['cost_time'] = get_interval(t1)
            # print(render_dict)
            # return HTMLResponse(render_text)
            # rules经过{{host}}渲染后这里不需要二次渲染
            # render_text = render_template_string(render_text, **context)
            # return Response(status_code=200, media_type='text/plain', content=render_text)
            return respVodJson(render_dict)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"{e}")
            # raise HTTPException(status_code=500)
    else:
        return abort(404, f'invalid value_type:{cf_value_type},only file allowed')


def get_file_path(db: Session, group, filename):
    """
    获取本地文件路径和类型
    @param db: 数据库游标
    @param group: 文件组label
    @param filename: 文件名称带后缀
    @return: 404 [file_path,media_type] [file_path]
    """
    error_msg = f'group:{group},filename:{filename}'
    project_dir = os.getcwd()
    groups = {}
    group_dict = curd_dict_data.getByType(db, _type='vod_rule_group')
    group_details = group_dict.get('details')
    for li in group_details:
        groups[li['label']] = li['value']
    # 判断分组在系统字典里才进行上传操作
    if group in groups.keys():
        folder_path = groups[group]
        folder_path = os.path.join(project_dir, folder_path)
        file_path = os.path.join(folder_path, filename)
        file_path = Path(file_path).as_posix()
        if not os.path.exists(file_path):
            logger.info(f'{error_msg},file_path:{file_path}')
            return 404
        else:
            if filename.endswith('.js'):
                return [file_path, 'text/javascript; charset=utf-8']

            return [file_path]

    else:
        logger.info(f'{error_msg},groups:{groups}')
        return 404


def get_file_content(db: Session, file_name: str):
    try:
        with open(get_file_path(db, 'drpy_libs', file_name)[0], encoding='utf-8') as f:
            content = f.read()
        return content
    except Exception as e:
        logger.info(f'获取文件{file_name}发生错误:{e}')
        return ''


@router.get("/files/{group}/{filename:path}", summary="T4静态文件")
async def t4_files(*,
                   db: Session = Depends(deps.get_db),
                   r: asyncRedis = Depends(deps.get_redis),
                   request: Req,
                   group: str = Query(..., title="hipy源分组"),
                   filename: str = Query(..., title="hipy源文件名")):
    """
    返回静态文件链接
    @param db:
    @param request: Request请求
    @param group: hipy文件分组
    @param filename: 文件名
    @return:
    """

    def getParams(key=None, value=''):
        return request.query_params.get(key) or value

    host = str(request.base_url).rstrip('/')
    # logger.info(f'host:{host}')
    resp = get_file_path(db, group, filename)
    if isinstance(resp, int):
        raise HTTPException(status_code=resp)

    file_path = resp[0]
    media_type = resp[1] if len(resp) > 1 else None
    if file_path.endswith('.js') and getParams('render'):
        try:
            key = 'vod_hipy_env'
            if r:
                vod_configs_obj = await curd_vod_configs.getByKeyWithCache(r, db, key=key)
            else:
                vod_configs_obj = curd_vod_configs.getByKey(db, key=key)
            env = vod_configs_obj.get('value')
            env = ujson.loads(env)
        except Exception as e:
            logger.info(f'获取环境变量发生错误:{e}')
            env = {}
        with open(file_path, encoding='utf-8') as f:
            js_code = f.read()

        for k in env.keys():
            if f'${k}' in js_code:
                js_code = js_code.replace(f'${k}', f'{env[k]}')
        try:
            # js_code = render_template_string(js_code, host=host) # 可能会受到filter的影响由于没有 fl 导致渲染失败
            js_code = js_code.replace('{{host}}',host)
            js_code = js_code.replace('{{ host }}',host)
        except Exception as e:
            logger.info(f'js文件渲染host变量错误:{e}')
        return Response(js_code, media_type=media_type)
    else:
        return FileResponse(file_path, media_type=media_type)


@router.get('/baidu', summary="访问百度")
async def baidu():
    # url = "https://www.iesdouyin.com/web/api/v2/user/info?sec_uid=MS4wLjABAAAAc4BIGF22ZcPBMtc73GAKSf-vEiPWKTLC3RJA423NK_E"
    url = "https://www.baidu.com"
    request = Request(method="GET", url=url, agent=False, follow_redirects=True)
    # 异步
    r = await request.fetch()
    # 同步
    # r = request.request()
    # print(r.text)
    return HTMLResponse(r.text)


@router.get('/get_ip_location/{ipaddr}', summary="获取ip归属地")
async def get_ip_location(ipaddr):
    return HTMLResponse(get_location_by_ip(ipaddr))


@router.get('/hotsugg', summary="获取热搜")
async def get_hot_search(*, request: Req, ):
    """
    默认腾讯接口，支持size=50;
    可传from=sougou但是不支持size
    from: sougou
    size: 50
    @param request:
    @return:
    """

    def getParams(key=None, value=''):
        return request.query_params.get(key) or value

    s_from = getParams('from')
    size = getParams('size')
    data = getHotSuggest(s_from, size)
    return respSuccessJson(data=data)


@router.get('/ysp/{name}', summary="央视频接口")
async def get_ysp_lives(*,
                        name: str = Query(..., title="直播名称"),
                        request: Req, ):
    """
    代理对应名称的央视频
    @param name:
    @param request:
    @return:
    """
    _map = {
        'cctv4k': '2022575202',
        'cctv1': '2022576803',
        'cctv2': '2022576702',
        'cctv3': '2022576501',  # vip
        'cctv4': '2022576603',
        'cctv5': '2022576403',
        'cctv5+': '2022576303',
        'cctv6': '2022574301',  # vip
        'cctv7': '2022576202',
        'cctv8': '2022576101',  # vip
        'cctv9': '2022576002',
        'cctv10': '2022573002',
    }
    _name = name.lower().replace('.m3u8', '')
    _map_id = _map.get(_name)
    if _map_id:
        ysp_url = f'https://hlslive-tx-cdn.ysp.cctv.cn/9841964D259FEEA2033EBD728C5C601CA23790AF04607BED439A1AE83F4E57129AF43BE039A7DB01D24679A241D6A94B098C01B29932660F67467751F51D3A1B27A9BA2B067EF53BF2CB25D82EF4169A213522DB17A98C5FAFAEA1CDFC762E372A6588F298DD95D8EAF44354D5985AF1/{_map_id}.m3u8'
        # print(ysp_url)
        m3u8_text = getYspContent(ysp_url)
        media_type = 'application/vnd.apple.mpegurl'
        # return Response(status_code=302, media_type=media_type, content=None, headers={'location': ysp_url})
        return Response(status_code=200, media_type=media_type, content=m3u8_text)
    else:
        return respErrorJson(error_code.ERROR_PARAMETER_ERROR.set_msg(f'参数【name】不正确'))


@router.get('/sniffer', summary='嗅探器-根据传入的url嗅探页面上的真实视频地址')
def get_sniffer_url(*,
                    db: Session = Depends(deps.get_db),
                    request: Req,
                    ):
    def getParams(_key=None, _value=''):
        if _key:
            return request.query_params.get(_key) or _value
        else:
            return request.query_params.__dict__['_dict']

    try:
        url = getParams('url')
        timeout = int(getParams('timeout') or 10000)
        custom_regex = getParams('custom_regex') or None
        mode = int(getParams('mode') or 0)
        active = getParams('active')
    except Exception as e:
        return respErrorJson(error_code.ERROR_PARAMETER_ERROR.set_msg(f'参数校验错误:{e}'))

    if active and not browser_drivers:
        try:
            if _sniffer_type == 0:
                driver_path = Sniffer.get_driver_path(0)
                browser = Sniffer(driver_path=driver_path)
            elif _sniffer_type == 1:
                browser = Sniffer()
            else:
                browser = settings.SNIFFER_URL
            browser_drivers.append(browser)
            return respVodJson(data=f'嗅探器激活成功,当前使用的嗅探器为:{browser}')
        except Exception as e:
            return respVodJson(data=f'嗅探器激活失败:{e}')

    if not str(url).startswith('http'):
        return respErrorJson(error_code.ERROR_PARAMETER_ERROR.set_msg('传入的url不合法'))

    try:
        if not browser_drivers:
            if _sniffer_type == 0:
                driver_path = Sniffer.get_driver_path(0)
                browser = Sniffer(driver_path=driver_path)
            elif _sniffer_type == 1:
                browser = Sniffer()
            else:
                browser = settings.SNIFFER_URL
            browser_drivers.append(browser)
        else:
            browser = browser_drivers[0]

        if _sniffer_type == 2:
            params = {
                'url': url,
                'mode': mode,
                'custom_regex': custom_regex,
                'timeout': timeout,
            }
            r = requests.get(settings.SNIFFER_URL.rstrip('/') + '/sniffer', params=params)
            ret = r.json()
        else:
            ret = browser.snifferMediaUrl(url, mode=mode, timeout=timeout, custom_regex=custom_regex)

        return respVodJson(data=ret)
    except Exception as e:
        return respErrorJson(error_code.ERROR_INTERNAL.set_msg(f'{e}'))


@router.get('/parse/api/{filename:path}', summary="执行js后台解析")
def get_js_vip_parse(*,
                     db: Session = Depends(deps.get_db),
                     request: Req,
                     filename: str = Query(..., title="解析js文件名")):
    t1 = time()

    def getParams(_key=None, _value=''):
        if _key:
            return request.query_params.get(_key) or _value
        else:
            return request.query_params.__dict__['_dict']

    def getCryptoJS():
        return get_file_content(db, 'crypto-hiker.js')

    resp = get_file_path(db, 'js_parse_api', filename)
    if isinstance(resp, int):
        raise HTTPException(status_code=resp)
    url = getParams('url')
    if not url or not url.startswith('http'):
        return respErrorJson(error=error_code.ERROR_INTERNAL.set_msg(f'url必填!{url},且必须是http开头'))
    file_path = resp[0]
    if not file_path.endswith('.js'):
        return respErrorJson(
            error=error_code.ERROR_INTERNAL.set_msg(f'暂不支持非js文件解析api:{file_path.split("/")[-1]}'))
    if not Context:
        return respErrorJson(error=error_code.ERROR_INTERNAL.set_msg(f'缺少必要的依赖库quickjs，无法执行js解析'))

    # ==================== 初始化js引擎开始 ======================
    ctx = Context()
    with open(file_path, encoding='utf-8') as f:
        js_code = f.read()
    prefix_code = get_file_content(db, 'qjs_env.js')
    try:
        vod_configs_obj = curd_vod_configs.getByKey(db, key='vod_hipy_env')
        env = vod_configs_obj.get('value')
        env = ujson.loads(env)
    except Exception as e:
        logger.info(f'获取环境变量发生错误:{e}')
        env = {}
    initContext(ctx, url, prefix_code, env, getParams, getCryptoJS)
    # ==================== 初始化js引擎结束 ======================
    try:
        ctx.eval(js_code.strip().replace('js:', '', 1))
        realUrl = str(ctx.eval('lazy()'))
        # print(realUrl)
        if not realUrl:
            return respParseJson(msg=f'解析失败:{realUrl}', code=404)
        if realUrl == url:
            return respParseJson(msg=f'解析失败:{realUrl}', code=404, extra={'from': realUrl})
        if str(realUrl).startswith('redirect://'):
            return RedirectResponse(realUrl.split('redirect://')[1])
        elif str(realUrl).startswith('toast://'):
            return respParseJson(msg=str(realUrl).split('toast://')[1], code=404)
        elif str(realUrl).startswith('image://'):
            img_data = base64ToImage(str(realUrl).split('image://')[1])
            return Response(img_data, media_type='image/jpeg')

        return respParseJson(msg=f'{filename}解析成功', url=realUrl,
                             extra={'time': f'{get_interval(t1)}毫秒', 'from': url})
    except Exception as e:
        msg = f'{filename}解析出错:{e}'
        logger.info(msg)
        return respErrorJson(error=error_code.ERROR_INTERNAL.set_msg(msg))


@router.put('/database_update', summary="数据库升级")
async def database_update(obj: database_schemas.updateSchema):
    if obj.auth_code == settings.DATABASE_UPDATE_AUTH:
        code, result = update_db()
        if code == 0:
            return respSuccessJson()
        # return respErrorJson(error=error_code.ERROR_DATABASE_CMD_ERROR)
        return respSuccessJson(data={"error": error_code.ERROR_DATABASE_CMD_ERROR.msg + " " + result})
    else:
        # return respErrorJson(error=error_code.ERROR_DATABASE_AUTH_ERROR)
        return respSuccessJson(data={"error": error_code.ERROR_DATABASE_AUTH_ERROR.msg})


@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    # 添加客户端到存储列表中
    client_websockets.append(websocket)

    # 发送欢迎信息给客户端
    await websocket.send_text("Welcome to the WebSocket server!")

    # 循环读取客户端发送的消息，并广播给所有客户端
    while True:
        data = await websocket.receive_text()
        for client in client_websockets:
            await client.send_text(f"User {id(websocket)} says: {data}")


# 静态页面，用于测试 WebSocket
html = """
<!DOCTYPE html>
<html>
    <head>
        <title>WebSocket Test</title>
        <script>
            var ws = new WebSocket("ws://" + window.location);
            ws.onopen = function(event) {
                console.log("WebSocket opened.");
            };

        ws.onmessage = function(event) {
            console.log(event.data);
        };

        function sendMessage() {
            var input = document.getElementById("message");
            var message = input.value;
            ws.send(message);
            input.value = "";
        }
    </script>
</head>
<body>
    <h1>WebSocket Test</h1>
    <div>
        <input type="text" id="message">
        <button onclick="sendMessage()">Send</button>
    </div>
  </body>
</html>
"""


# 返回静态页面
@router.get("/ws")
async def websocket_html():
    return HTMLResponse(html)
