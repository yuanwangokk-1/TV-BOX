#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : pip.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Author's Blog: https://blog.csdn.net/qq_32394351
# Date  : 2023/12/13
import os
import subprocess

PIP_PROXY = "https://mirrors.cloud.tencent.com/pypi/simple"


# 执行cmd命令并返回字符串
def do_cmd(adbshell):
    try:
        return str(subprocess.Popen(adbshell, shell=True, stdout=subprocess.PIPE).communicate())
    except Exception as e:
        print(e)
        return None


def get_requirements():
    # 获取依赖文件内容

    # project_dir = os.getcwd()
    # 获取当前脚本文件的绝对路径
    current_path = os.path.abspath(__file__)
    # 获取当前脚本文件所在的目录路径
    current_dir = os.path.dirname(current_path)
    # 获取项目根目录
    project_dir = os.path.dirname(current_dir)
    req_dir = os.path.join(project_dir, 'requirements.txt')
    with open(req_dir, encoding='utf-8') as f:
        req_text = f.read()
    return req_text


# 解析 pip list
def get_pip_package(shell_result):
    pip_package_all_info = {}

    pip_package_list = []
    pip_package_info = {}
    split_str = r"\r\n" if r"\r\n" in shell_result else r"\n"
    shell_result_split = shell_result.split(split_str)

    for i in shell_result_split:
        if " " in i and "." in i and "b'" not in i and "notice" not in i and "--" not in i and "'" not in i and '"' not in i:
            c = i.replace(" ", "$").split("$")
            pip_package_info[c[0]] = c[-1]
            pip_package_list.append(c[0])

    pip_package_all_info["pip_package_info"] = pip_package_info
    pip_package_list.sort()
    pip_package_all_info["pip_package_list"] = pip_package_list
    pip_package_all_info["pip_package_len"] = len(pip_package_list)

    return pip_package_all_info


def do_cmd_upgrade(package):
    adbshell = f"pip3 install -i {PIP_PROXY} --upgrade {package}"
    return do_cmd(adbshell)


def do_cmd_install(package):
    adbshell = f"pip3 install -i {PIP_PROXY} {package}"
    return do_cmd(adbshell)


def do_cmd_uninstall(package):
    adbshell = "pip3 uninstall {} -y".format(package)
    return do_cmd(adbshell)


def get_pip_package_info():
    pip_package_all_info = get_pip_package(do_cmd("pip3 list"))
    return pip_package_all_info


def get_pip_someone_package(package):
    adbshell = "pip3 show --files {}".format(package)
    result = do_cmd(adbshell)
    if "Version" in result:
        split_str = r"\r\n" if r"\r\n" in result else r"\n"
        result = result.split(split_str)[1]
        return result
    else:
        return None


__all__ = [
    "get_pip_package_info",
    "get_pip_someone_package",
    "do_cmd_install",
    "do_cmd_uninstall",
    "do_cmd_upgrade",
    "get_requirements",
]

if __name__ == "__main__":
    # package = "requests"
    # print(get_pip_someone_package(package))
    print(get_pip_package_info())
    # print(get_requirements())
