#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : test_ysp.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Date  : 2024/4/23

import random
import binascii
from time import time
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad
from urllib.parse import urlencode
import hashlib
import base64
import requests

_map = {
    # 央视
    'cctv4k': 2022575203,  # CCTV - 4k
    'cctv8k': 2020603421,  # CCTV - 8k
    'cctv1': 2022576803,  # CCTV1
    'cctv2': 2022576703,  # CCTV2
    'cctv3': 2022576503,  # CCTV3
    'cctv4': 2022576603,  # CCTV4
    'cctv5': 2022576403,  # CCTV5
    'cctv5p': 2022576303,  # CCTV5 +
    'cctv6': 2022574303,  # CCTV6
    'cctv66': 2013693903,  # CCTV6测试
    'cctv7': 2022576203,  # CCTV7
    'cctv8': 2022576103,  # CCTV8
    'cctv9': 2022576003,  # CCTV9
    'cctv10': 2022573003,  # CCTV10
    'cctv11': 2022575903,  # CCTV11
    'cctv12': 2022575803,  # CCTV12
    'cctv13': 2022575703,  # CCTV13
    'cctv14': 2022575603,  # CCTV14
    'cctv15': 2022575503,  # CCTV15
    'cctv16': 2022575403,  # CCTV16
    'cctv16-4k': 2022575103,  # CCTV16 - 4k
    'cctv17': 2022575303,  # CCTV17
    # 央视数字
    'bqkj': 2012513403,  # CCTV兵器科技
    'dyjc': 2012514403,  # CCTV第一剧场
    'hjjc': 2012511203,  # CCTV怀旧剧场
    'fyjc': 2012513603,  # CCTV风云剧场
    'fyyy': 2012514103,  # CCTV风云音乐
    'fyzq': 2012514203,  # CCTV风云足球
    'dszn': 2012514003,  # CCTV电视指南
    'nxss': 2012513903,  # CCTV女性时尚
    'whjp': 2012513803,  # CCTV央视文化精品
    'sjdl': 2012513303,  # CCTV世界地理
    'gefwq': 2012512503,  # CCTV高尔夫网球
    'ystq': 2012513703,  # CCTV央视台球
    'wsjk': 2012513503,  # CCTV卫生健康
    # 央视国际
    'cgtn': 2022575003,  # CGTN
    'cgtnjl': 2022574703,  # CGTN纪录
    'cgtne': 2022571703,  # CGTN西语
    'cgtnf': 2022574903,  # CGTN法语
    'cgtna': 2022574603,  # CGTN阿语
    'cgtnr': 2022574803,  # CGTN俄语
    # 卫视
    'bjws': 2000272103,  # 北京卫视
    'dfws': 2000292403,  # 东方卫视
    'tjws': 2019927003,  # 天津卫视
    'cqws': 2000297803,  # 重庆卫视
    'hljws': 2000293903,  # 黑龙江卫视
    'lnws': 2000281303,  # 辽宁卫视
    'hbws': 2000293403,  # 河北卫视
    'sdws': 2000294803,  # 山东卫视
    'ahws': 2000298003,  # 安徽卫视
    'hnws': 2000296103,  # 河南卫视
    'hubws': 2000294503,  # 湖北卫视
    'hunws': 2000296203,  # 湖南卫视
    'jxws': 2000294103,  # 江西卫视
    'jsws': 2000295603,  # 江苏卫视
    'zjws': 2000295503,  # 浙江卫视
    'dnws': 2000292503,  # 东南卫视
    'gdws': 2000292703,  # 广东卫视
    'szws': 2000292203,  # 深圳卫视
    'gxws': 2000294203,  # 广西卫视
    'gzws': 2000293303,  # 贵州卫视
    'scws': 2000295003,  # 四川卫视
    'xjws': 2019927403,  # 新疆卫视
    'hinws': 2000291503  # 海南卫视
}


def generateRandomString(length):
    """
    生成指定长度的随机字符串
    @param length:
    @return:
    """
    characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    return ''.join(random.choices(characters, k=length))


def generateRequestId():
    """
    生成 request_id
    @return:
    """
    randomString = generateRandomString(10)
    currentTimeMillis = round(time() * 1000)
    return f"999999{randomString}{currentTimeMillis}"


def base_convert(number, tobase):
    """
    十进制数字转为任意进制(36以内)
    @param number:	必需。原始值。
    @param tobase: 必需。要转换的进制。
    @return:
    """
    return ((number == 0) and "0") or (
            base_convert(number // tobase, tobase).lstrip("0") + "0123456789abcdefghijklmnopqrstuvwxyz"[
        number % tobase])


def generateGuid():
    """
    修正后的 generateGuid 函数，根据安卓代码逻辑生成 guid
    @return:
    """
    tm = round(time())
    timestamp = base_convert(tm, 36)
    print('tm:',tm,timestamp)
    randomPart = generateRandomString(11)
    guid = f"{timestamp}_{randomPart.rjust(11, '0')}"
    return guid


def hexStringTobytes(_str):
    """
    将hex字符串转成byte字节
    @param _str: hex字符串
    @return: byte字节
    """
    _str = _str.replace(" ", "")
    return bytes.fromhex(_str)


def bytesToHexString(_bytes, no_space=True):
    """
    将byte字节转成hex字符串
    @param _bytes: byte字节
    @param no_space: 是否不带空格返回，默认是
    @return: hex字符串
    """
    _str = ''.join(['%02X ' % b for b in _bytes])
    if no_space:
        _str = _str.replace(" ", "")
    return _str


def hex2bin(hex_string):
    """
    把十六进制值转换为 ASCII 字符
    @param hex_string:
    @return:
    """
    if len(hex_string) % 2 != 0:
        hex_string = '0' + hex_string  # 如果字符串长度不是偶数，则补一个0
    # return binascii.unhexlify(hex_string).decode('ASCII', errors='ignore')
    return binascii.unhexlify(hex_string)


def bin2hex(bin_string):
    """
    将 ASCII 字符 转换为 十六进制值
    @param bin_string:
    @return:
    """
    return bin_string.encode().hex()


def md5(text):
    """
    md5加密
    @param text: 明文
    @return: 加密结果
    """
    return hashlib.md5(text.encode(encoding='UTF-8')).hexdigest()


def aes_cbc_decode(ciphertext, key, iv):
    """
    aes cbc格式解密
    @param ciphertext:加密的字符串
    @param key: 加密密钥
    @param iv: 加密偏移量
    @return:解密后的文本明文
    """
    # 将密文转换成byte数组
    ciphertext = base64.b64decode(ciphertext)
    # 构建AES解密器
    decrypter = AES.new(key.encode(), AES.MODE_CBC, iv.encode())
    # 解密
    plaintext = decrypter.decrypt(ciphertext)
    # 去除填充
    plaintext = unpad(plaintext, AES.block_size)
    # 输出明文
    return plaintext.decode('utf-8')


def openssl_encrypt(data, key, iv):
    # 使用AES-128-CBC加密模式
    cipher = AES.new(key, AES.MODE_CBC, iv)
    # 对数据进行填充
    # data = data.ljust((len(data) + AES.block_size) & ~AES.block_size)
    # data = pad(data,16)
    # data = pad(data.encode(),(len(data) + AES.block_size) & ~AES.block_size)
    data = pad(data.encode(),AES.block_size)
    print('d: ', data)
    # 加密数据
    # encrypted_data = cipher.encrypt(pad(data.encode('utf-8'), 16))
    encrypted_data = cipher.encrypt(data)
    # 将加密后的数据转换为Base64编码
    print(encrypted_data)
    return base64.b64encode(encrypted_data).decode('utf-8')


def http_build_query(params):
    query = urlencode(params)
    # print('query:',query)
    return query


def getM3u8Url(name):
    """
    在线运行php测试
    https://www.w3cschool.cn/tryrun/runcode?lang=php
    @param name:
    @return:
    """
    _name = name.lower().replace('.m3u8', '')
    _map_id = _map.get(_name)
    cnlid = _map_id
    guid = generateGuid()
    salt = '0f$IVHi9Qno?G'
    platform = '5910204'
    key = hex2bin("48e5918a74ae21c972b90cce8af6c8be")
    # key = r"Håt®!Ér¹\fÎöÈ¾"
    # key = pad(key.encode(),16)
    print(len(key),key)
    iv = hex2bin("9a7e7d23610266b1d9fbf98581384d92")
    # iv = r"~}#a\u0002f±Ùûù8M"
    # iv = pad(iv.encode(),16)
    print(len(iv),iv)
    ts = round(time())
    el = f"|{cnlid}|{ts}|mg3c3b04ba|V1.0.0|{guid}|{platform}|https://www.yangshipin.cn|mozilla/5.0 (windows nt ||Mozilla|Netscape|Win32|"
    print('el:', el)
    # el = '|2022576803|1713867132|mg3c3b04ba|V1.0.0|sce4cc_U7oKJILre0I|5910204|https://www.yangshipin.cn|mozilla/5.0 (windows nt ||Mozilla|Netscape|Win32|'
    xl = 0
    for i in range(len(el)):
        xl = (xl << 5) - xl + ord(el[i])
        xl &= xl & 0xFFFFFFFF
    xl = xl - 4294967296 if xl > 2147483648 else xl
    print(xl)
    el = f'|{xl}{el}'
    print('el: ', el)
    ckey = "--01" + bin2hex(openssl_encrypt(el, key, iv)).upper()
    print('ckey:', ckey)
    ck2 = '--01416A346A61706A6F506C57393879394C657A5657482B595A5668494B6E7050344454596D5171616A3862424250646432514D6D304D504F726A506E32387762624D5A4A75515364312B443157682F57483351413764476B4C387941336A7848674E6776713145386555396C304A566E6C553471756B51354E526739524577385033674F6D7673396F2B6D4D565733473345574D6347536759343476414C6B324C446349515A6F7768766E35446357734744794459314E68674C682F6249415267322B544D7A74767A56746B773769616E32544E54666F544953766E533471795A3931434D76702F645777513D'
    print(ck2 == ckey)
    ck3 = '--01023E236A98E83E55BDF32F4B7B35561FE61956120A9E93F80D362642A6A3F1B0413DD77640C9B430F3AB8CF9F6F306DB31926E412775F83D5687F587DD003B74690BF320378F11E0360BEAD44F1E53D9742559E5538AAE910E4D460F51130F0FDE03A6BECF68FA63155B71B711631C192818E38BC02E4D8B0DC210668C21BE7E43716B060F20D8D4D8602E1FDB2004609751E76C3C13FB5EA60CBD3FC9CBE692'
    print(ck3 == ckey)
    params = {
        "adjust": 1,
        "appVer": "V1.0.0",
        "app_version": "V1.0.0",
        "cKey": ckey,
        "channel": "ysp_tx",
        "cmd": "2",
        "cnlid": f"{cnlid}",
        "defn": "fhd",
        "devid": "devid",
        "dtype": "1",
        "encryptVer": "8.1",
        "guid": guid,
        "otype": "ojson",
        "platform": platform,
        "rand_str": f"{ts}",
        "sphttps": "1",
        "stream": "2"
    }
    sign = md5(http_build_query(params) + salt)
    print('sign:', sign)
    params["signature"] = sign
    print(params)
    auth = {
        'pid':'600001859',
        'guid':guid,
        'appid':'ysp_pc',
        'rand_str':generateRandomString(10),
        'signature':sign,
    }
    headers = {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        "Referer": "https://www.yangshipin.cn/",
        "Cookie": f"guid={guid}; versionName=99.99.99; versionCode=999999; vplatform=109; platformVersion=Chrome; deviceModel=121; updateProtocol=1; seqId=1; request-id={generateRequestId()}",
        "Yspappid": "519748109",
        # "Yspplayertoken": "lETcrxekIG4kk0lPyPscYQbFFTTKxsiHowu5xK4AWh5okO4IVtIjX1gPibEQRsBFfx6tjqxlMe90MAwBga3nzs3xibUV0ykQePYPy7PC8FI",
    }
    r = requests.post(url='https://player-api.yangshipin.cn/v1/player/auth',data=auth,headers=headers)
    print(r,r.text)
    bstrURL = "https://player-api.yangshipin.cn/v1/player/get_live_info"
    headers = {
        "Content-Type": "application/json",
        "Referer": "https://www.yangshipin.cn/",
        "Cookie": f"guid={guid}; versionName=99.99.99; versionCode=999999; vplatform=109; platformVersion=Chrome; deviceModel=121; updateProtocol=1; seqId=1; request-id={generateRequestId()}",
        "Yspappid": "519748109",
        "Yspplayertoken": "lETcrxekIG4kk0lPyPscYQbFFTTKxsiHowu5xK4AWh5okO4IVtIjX1gPibEQRsBFfx6tjqxlMe90MAwBga3nzs3xibUV0ykQePYPy7PC8FI",
    }
    print(headers)
    data = params
    # data = json.dumps(params)
    r = requests.post(bstrURL, data=data, headers=headers)
    print(r)
    print(r.text)


def main():
    print(time())
    print(generateRequestId())
    print(generateGuid())
    # print(hex2bin("48656c6c6f20576f726c6421"))
    # print(hexStringTobytes("48656c6c6f20576f726c6421"))
    # print(hex2bin("48e5918a74ae21c972b90cce8af6c8be"))
    # print(hex2bin("9a7e7d23610266b1d9fbf98581384d92"))
    # print(bin2hex("Hello World!"))
    print(getM3u8Url("cctv1"))


if __name__ == '__main__':
    main()
