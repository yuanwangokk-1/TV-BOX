#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : py_module.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Date  : 2024/3/1
import json
import os.path


class Local:
    def __init__(self, path):
        self.path = path
        if not os.path.exists(self.path):
            with open(self.path, mode='w+', encoding='utf-8') as f:
                f.write('{}')

    def get(self, key, value=''):
        with open(self.path, encoding='utf-8') as f:
            _dict = json.loads(f.read())
        print(_dict)
        return _dict.get(key) or value

    def set(self, key, value):
        with open(self.path, encoding='utf-8') as f:
            _dict = json.loads(f.read())
        _dict[key] = value
        with open(self.path, mode='w+', encoding='utf-8') as f:
            f.write(json.dumps(_dict, ensure_ascii=False))


local = Local('./store.json')


class MyLocal:

    def __int__(self):
        self.local = Local('./store.json')
        if not self.local.get('url'):
            self.local.set('url', 'https://github.com/Distributive-Network/PythonMonkey/issues/253')

    @staticmethod
    def set(*args):
        # local = Local('./store.json')
        return local.set(*args)

    @staticmethod
    def get(*args):
        # local = Local('./store.json')
        return local.get(*args)


# print(type(MyLocal.get))

exports = {
    'print': print,
    'set': MyLocal.set,
    'get': MyLocal.get,
    'get2': local.get,
}
