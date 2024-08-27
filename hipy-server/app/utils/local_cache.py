#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : local_cache.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Author's Blog: https://blog.csdn.net/qq_32394351
# Date  : 2024/2/6
# drpy2可用的 local 注入本地缓存模块

import os
import pickle
import time
import threading


def deferFunc(func):
    def wrapper(*args):
        self = args[0]
        self.lock.acquire()
        try:
            result = func(*args)
            self.cacheKeysNum = self.cacheKeysNum + 1
            self.writeToDisk()
            return result
        finally:
            self.lock.release()

    return wrapper


class LocalCache():
    def __init__(self, loadFiles='local_cache.db'):
        base_dir = os.path.dirname(__file__)
        self.cacheFile = os.path.join(base_dir, loadFiles)
        self.lastTimes = time.time()
        self.cacheKeysNum = 0
        self.lock = threading.Lock()
        self.cacheSetting()
        self.base_dir = os.path.dirname(__file__)

        self.caches = {}

        try:
            if os.path.exists(self.cacheFile):
                with open(self.cacheFile, "rb") as f:
                    self.caches = pickle.load(f)
            else:
                print("file not found:", self.cacheFile)
        except Exception as e:
            print("pickle.load file errors", e)
            self.caches = {}

    def cacheSetting(self, queueMaxKeys=3, ageSec=10):
        self.queueMaxKeys = queueMaxKeys
        self.ageSec = ageSec

    def writeToDisk(self):
        if self.cacheKeysNum >= self.queueMaxKeys or (time.time() - self.lastTimes) >= self.ageSec:
            with open(self.cacheFile, "wb") as f:
                pickle.dump(self.caches, f)

            self.lastTimes = time.time()
            self.cacheKeysNum = 0

    @deferFunc
    def get(self, _id, key, value=None):
        _key = f'{_id}{key}'
        if _key in self.caches:
            return self.caches[_key] or value
        else:
            return value

    @deferFunc
    def set(self, _id, key, value):
        _key = f'{_id}{key}'
        if _key != "":
            self.caches[_key] = value
        else:
            raise "key cannot be empty"

    def isExists(self, key):
        if key in self.caches:
            return True
        else:
            return False

    @deferFunc
    def update(self, _id, key, value):
        _key = f'{_id}{key}'
        if self.isExists(_key):
            self.caches[_key] = value
            return True
        else:
            return False

    @deferFunc
    def delete(self, _id, key):
        _key = f'{_id}{key}'
        if self.isExists(_key):
            del self.caches[_key]
            return True
        else:
            return False


def main() -> None:
    c = LocalCache()
    c.cacheSetting(queueMaxKeys=3, ageSec=3)
    c.set("bl", "name", "pdudo")
    # time.sleep(5)
    c.set("bl", "site", "juejin")
    print(c.get("bl", "name"))
    print(c.get("bl", "site"))
    c.delete("bl", "name")
    c.update("bl", "site", "pdudo")
    print(c.get("bl", "site"))
    print(c.get("bl", "name"))


local = LocalCache()
local.cacheSetting(queueMaxKeys=512, ageSec=24 * 60 * 60)

if __name__ == '__main__':
    main()
