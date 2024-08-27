#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : wasm_loader.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Date  : 2024/4/29
# pip3 install wasmtime
# https://github.com/bytecodealliance/wasmtime-py

from wasmtime import Store, Module, Instance, Func, FuncType

store = Store()
module = Module(store.engine, """
  (module
    (func $hello (import "" "hello"))
    (func (export "run") (call $hello))
  )
""")


def say_hello():
    print("Hello from Python!")


hello = Func(store, FuncType([], []), say_hello)

instance = Instance(store, module, [hello])
run = instance.exports(store)["run"]
run(store)
