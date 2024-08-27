#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : javaLoader.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Author's Blog: https://blog.csdn.net/qq_32394351
# Date  : 2024/1/10

import os
import jpype
from jpype.types import *


class JavaLoader():

    def __init__(self, jar_path="./bdys.jar"):
        if not os.path.exists(jar_path):
            raise FileNotFoundError
        self.jar_path = jar_path
        self._prepare_env()
        self.jClass = jpype.JClass

    def _prepare_env(self):
        try:
            jpype.startJVM(classpath=[self.jar_path], convertStrings=False)
        except:
            pass


if __name__ == '__main__':
    javar = JavaLoader('../spiders/jars/bdys.jar')
    class1 = javar.jClass('com.C4355b')
    token = class1.getToken()
    print(token)
