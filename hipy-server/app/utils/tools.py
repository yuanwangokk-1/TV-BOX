# -*- coding: utf-8 -*-
"""
Created on 2023-09-13 16:00
---------
@summary: 爬虫入口
---------
@author: pepsi
"""
import hashlib

import base64
from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_v1_5 as Cipher_pkcs1_v1_5
from threading import Thread


def crack_pwd(pwd, key):
    pwd = get_md5(pwd)
    rsakey = RSA.importKey(key)
    cipher = Cipher_pkcs1_v1_5.new(rsakey)  # 生成对象
    cipher_text = base64.b64encode(cipher.encrypt(pwd.encode(encoding="utf-8")))  # 对传递进来的用户名或密码字符串加密
    value = cipher_text.decode('utf-8')  # 将加密获取到的bytes类型密文解码成str类型
    return value


# 加密
def get_md5(*args):
    """
    @summary: 获取唯一的32位md5
    """

    m = hashlib.md5()
    for arg in args:
        m.update(str(arg).encode())

    return m.hexdigest()


def get_sha1(*args):
    """
    @summary: 获取唯一的40位值， 用于获取唯一的id
    """

    sha1 = hashlib.sha1()
    for arg in args:
        sha1.update(str(arg).encode())
    return sha1.hexdigest()  # 40位


def get_base64(data):
    if data is None:
        return data
    return base64.b64encode(str(data).encode()).decode("utf8")


def key2hump(key):
    """
    下划线试变成首字母大写
    """
    return key.title().replace("_", "")


def list_to_tree(node_list, root_id=None, *, order="", exclude=None):
    """
        将list转成树结构 list = [{id:xx,parent_id:xx,},id:xx,parent_id:xx,},id:xx,parent_id:xx,}]
        :param root_id  返回选择的id结点  order    排序字段   exclude  剔除某个节点
    """
    if not node_list: return []
    # 排序
    if order: node_list.sort(key=lambda k: k.get(order))
    # node
    node_dict = {node["id"]: node if node.get("parent_id") else node.update({"parent_id": -1}) or node for node in
                 node_list}
    # children
    for node in node_list:
        if node["id"] == exclude: continue
        node_dict.setdefault(node["parent_id"], {}).setdefault("children", []).append(node)
    if root_id:
        return node_dict[root_id]
    return node_dict.get(-1, {}).get("children", [])


def dfs_tree_to_list(nodes):
    """
    将树结构转成list
    :param nodes:
    :return:
    """
    ids = []
    for node in nodes:
        ids.append(node["id"])
        children = node.get("children", [])
        if children != []: ids = ids + dfs_tree_to_list(children)
    return ids


def round_float(float_num, num=2):
    """
    四舍五入
    :param float_num:
    :param num:
    :return:
    """
    import decimal
    context = decimal.getcontext()
    context.rounding = decimal.ROUND_HALF_UP
    return float(round(decimal.Decimal(str(float_num)), num))


def thread_it(func, *args, **kwargs):
    t = Thread(target=func, args=args, kwargs=kwargs)
    t.setDaemon(True)
    t.start()


if __name__ == '__main__':
    # 32位md5
    # 123456 => e10adc3949ba59abbe56e057f20f883e|e10adc3949ba59abbe56e057f20f883e
    key = "MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKoR8mX0rGKLqzcWmOzbfj64K8ZIgOdH\n" + "nzkXSOVOZbFu/TJhZ7rFAN+eaGkl3C4buccQd/EjEsj9ir7ijT7h96MCAwEAAQ=="
    public_key = '-----BEGIN PUBLIC KEY-----\n' + key + '\n-----END PUBLIC KEY-----'
    print(crack_pwd("123456", public_key))
