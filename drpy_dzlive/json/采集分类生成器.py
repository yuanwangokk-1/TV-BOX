#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : 采集分类生成器.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Date  : 2024/6/21

import os
import json
import gzip
import base64

from urllib.parse import urljoin
from concurrent.futures import ThreadPoolExecutor
from pprint import pprint
import time

import requests

import warnings

# 关闭警告
warnings.filterwarnings("ignore")
requests.packages.urllib3.disable_warnings()

pool = ThreadPoolExecutor(max_workers=20)  # 初始化线程池内线程数量为20

headers = {
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
    'Connection': 'close'  # 设置为关闭长连接
}

timeout = 5  # 5秒

use_gzip = False


def compress_and_encode(data: str):
    # 压缩数据
    compressed_data = gzip.compress(data.encode('utf-8'))
    # 对压缩数据进行Base64编码
    encoded_data = base64.b64encode(compressed_data).decode('utf-8')
    return encoded_data


def decode_and_decompress(encoded_data: str):
    # 解码Base64数据
    decoded_data = base64.b64decode(encoded_data.encode('utf-8'))
    # 解压缩数据
    decompressed_data = gzip.decompress(decoded_data).decode('utf-8')
    return decompressed_data


def get_classes(rec):
    classes = None
    if rec.get('url') and str(rec['url']).startswith('http'):
        _class_api = rec.get('api') or '/api.php/provide/vod/'
        _api = urljoin(str(rec['url']).rstrip('/'), _class_api)
        # _api = urljoin(rec['url'], '/api.php/provide/vod/at/json')
        print(_api)
        try:
            r = requests.get(_api, headers=headers, timeout=timeout, verify=False)
            ret = r.json()
            if rec.get('name') == '乐视资源':
                print('=======乐视=========')
                print(ret)
            # print(ret)
            classes = ret.get('class')
        except Exception as e:
            print(f'获取资源【{rec["name"]}】({_api})分类发生错误:{e}')

    return classes


def convert_class(classes, name=None):
    """
    获取的分类转静态分类格式
    @param classes:
    @return:
    """
    if name is None:
        name = ''
    if not classes:
        return {
            "name": "",
            "class_name": "",
            "class_url": "",
        }
    class_names = []
    class_urls = []
    for cls in classes:
        if cls.get('type_name') and cls.get('type_id'):
            class_urls.append(str(cls['type_id']))
            class_names.append(str(cls['type_name']))
    global use_gzip
    return {
        "name": name,
        "class_name": compress_and_encode('&'.join(class_names)) if use_gzip else '&'.join(class_names),
        "class_url": '&'.join(class_urls),
    }


def get_convert_classes(rec):
    classes = get_classes(rec)
    classes = convert_class(classes, rec.get('name'))
    return classes


def check_class(api, type_name, type_id, limit_count=6):
    _url = f'{api}?ac=detail&pg=1&t={type_id}'
    try:
        r = requests.get(_url, headers=headers, timeout=timeout, verify=False)
        ret = r.json()
        if not ret.get("list") or len(ret["list"]) < limit_count:
            print(f'获取资源 {api} 分类【{type_name}】数量为:{len(ret["list"])} 小于{limit_count}视为排除')
            return False
    except Exception as e:
        print(f'获取资源 {_url} 分类【{type_name}】发生错误:{e}')
    return True


def check_active(api):
    try:
        r = requests.get(api, headers=headers, timeout=timeout, verify=False)
        ret = r.json()
        if not ret.get("class"):
            return False
    except Exception as e:
        print(f'检查api: {api} 存活发生错误:{e}')
        return False
    return True


def main(fname='采集'):
    file_path = f'./{fname}.json'
    out_file_path = file_path.replace('.json', '静态.json')
    if not os.path.exists(file_path):
        exit(f'不存在采集文件路径:{file_path}')
    with open(file_path, encoding='utf-8') as f:
        data = f.read()
    records = json.loads(data)
    print(records)
    # for rec in records:
    #     ret = get_convert_classes(rec)
    #     pprint(ret)
    tasks = [pool.submit(get_convert_classes, rec) for rec in records]  # 构造一个列表，循环向线程池内submit提交执行的方法
    pool.shutdown(wait=True)  # 线程数等待所有线程结束，这里 卡住主线程
    results = [task.result() for task in tasks]
    print(results)
    new_records = []
    for record in records:
        rec_name = record["name"]
        if rec_name:
            has_name = [ret for ret in results if ret.get("name") == rec_name]
            if has_name:
                record.update(has_name[-1])
                new_records.append(record)
    pprint(new_records)
    print(f'转换静态数据成功记录数:{len(new_records)}')
    with open(out_file_path, mode='w+', encoding='utf-8') as f:
        f.write(json.dumps(new_records, ensure_ascii=False, indent=2))


def main_exclude(fname='采集静态', max_workers=0):
    file_path = f'./{fname}.json'
    if not os.path.exists(file_path):
        exit(f'不存在采集文件路径:{file_path}')
    with open(file_path, encoding='utf-8') as f:
        data = f.read()
    records = json.loads(data)
    if len(records) < 1 or not records[0].get('class_name'):
        exit('输入数据有误，疑似不是静态数据')
    print(records)
    new_records = []
    for rec in records:
        new_rec = rec.copy()
        if rec.get('api'):
            api_url = urljoin(rec['url'], rec['api'])
        else:
            api_url = urljoin(rec['url'], '/api.php/provide/vod/')
        print(api_url)
        cate_excludes = []
        if not check_active(api_url):
            print(f'{rec["name"]} ({rec["url"]})视为不存活,跳过分类检测')
        else:
            class_names = decode_and_decompress(rec['class_name']).split('&')
            class_urls = rec['class_url'].split('&')
            rec_pool = ThreadPoolExecutor(max_workers=max_workers or len(class_names))  # 初始化线程池内线程数量为分类数量
            tasks = []
            for i in range(len(class_names)):
                type_name = class_names[i]
                type_id = class_urls[i]
                tasks.append(rec_pool.submit(check_class, api_url, type_name, type_id))
            rec_pool.shutdown(wait=True)  # 线程数等待所有线程结束，这里 卡住主线程
            results = [task.result() for task in tasks]
            print(results)
            for i in range(len(class_names)):
                type_name = class_names[i]
                # type_id = class_urls[i]
                if not results[i]:
                    cate_excludes.append(type_name)
        if len(cate_excludes) > 0:
            new_rec['cate_excludes'] = cate_excludes
        new_records.append(new_rec)

    with open(file_path, mode='w+', encoding='utf-8') as f:
        f.write(json.dumps(new_records, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    use_gzip = True
    fmode = str(input('请输入处理文件方式(0:生成分类 1:添加分类过滤),留空默认为生成静态分类:\n'))
    ftips = '采集静态' if fmode == '1' else '采集'
    fname = str(input(f'请输入文件名(q结束程序),留空默认为{ftips}:\n'))
    t1 = time.time()
    if fname == 'q':
        exit('已主动结束脚本')
    if not fmode or fmode == '0':
        fname = fname or '采集'
        main(fname)
    elif fmode == '1':
        fname = fname or '采集静态'
        main_exclude(fname, 10)
    else:
        exit(f'未知的处理类型:{fmode}')
    t2 = time.time()
    print(f'本次程序运行耗时:{round(t2 - t1, 2)}秒')
