#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : server_info.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Author's Blog: https://blog.csdn.net/qq_32394351
# Date  : 2023/12/5
import os
import socket

import psutil
import platform
from datetime import datetime
import sys as mysys
from utils.notes import get_start_info


def get_server_info():
    # 获取系统信息
    cpu_percent = psutil.cpu_percent(interval=1)
    cpu_freq = psutil.cpu_freq()
    cpu_cores = psutil.cpu_count(logical=False)
    memory = psutil.virtual_memory()
    network_stats = psutil.net_io_counters()
    netcard_stats = psutil.net_if_stats()
    disk_stats = psutil.disk_partitions(all=True)
    start_info = get_start_info()

    # 获取Python版本
    python_version = platform.python_version()
    # 获取Python解释器名称
    python_implementation = platform.python_implementation()
    # 获取Python解释器实现名称
    python_implementation_name = platform.python_implementation()
    # 获取操作系统名称
    os_name = platform.system()
    # 获取操作系统版本
    os_version = platform.version()
    # 获取计算机的处理器名称
    processor_name = platform.processor()
    # 获取计算机的处理器架构
    processor_architecture = platform.architecture()

    # 获取操作系统版本
    os_release = platform.release()
    # 获取操作系统位数
    os_arch = platform.architecture()[0]
    data = {}
    cpu = {
        # 核心数
        "cpuNum": f"{cpu_cores} 核",
        # 用户使用率 x%
        "used": f"{cpu_percent}",
        # 系统使用率 x%
        "sys": f"{cpu_percent}",
        # 当前空闲率 x%
        "free": f"{100 - cpu_percent}",
        # 频率
        "mhz": f"{cpu_freq.current:.2f} MHz" if cpu_freq is not None else 'N/A',
    }

    mem = {
        # 总内存 xx G
        "total": f"{memory.total / (1024 ** 3):.2f}",
        # 已用内存 xx G
        "used": f"{memory.used / (1024 ** 3):.2f}",
        # 剩余内存 xx G
        # "free":f"{(memory.total - memory.used) / (1024 ** 3):.2f}",
        "free": f"{memory.free / (1024 ** 3):.2f}",
        # 使用率 xx %
        "usage": memory.percent,
    }
    # 获取计算机名称
    computer_name = os.environ.get("COMPUTERNAME")
    # 获取ip
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    s.connect(('8.8.8.8', 80))
    ip = s.getsockname()[0]
    # 获取开机时间
    boot_time = datetime.fromtimestamp(psutil.boot_time()).strftime("%Y-%m-%d %H:%M:%S")
    # 获取当前脚本文件的绝对路径
    current_path = os.path.abspath(__file__)

    # 获取当前脚本文件所在的目录路径
    current_dir = os.path.dirname(current_path)

    # 获取项目根目录
    project_dir = os.path.dirname(current_dir)

    sys = {
        # 服务器名称
        "computerName": computer_name,
        # 操作系统名称
        "osName": os_name,
        # 操作系统版本
        "osVersion": os_version,
        # 系统版本
        "osRelease": os_release,
        # 开机时间
        "bootTime": boot_time,
        # 服务器IP
        "computerIp": ip,
        # 系统架构
        "osArch": os_arch,
        # 处理器名称
        "processorName": processor_name,
        # 处理器架构
        "processorArchitecture ": processor_architecture,
        # 项目路径
        "userDir": project_dir,
    }

    jvm = {
        # python名称
        "name": python_implementation,
        # python版本
        "version": python_version,
        # 启动时间
        "startTime": start_info['start_time'],
        # 运行时长
        "runTime": start_info['run_time'],
        # python路径
        "paths": mysys.path,
        # 当前解释器路径
        "home": mysys.executable,
        # 运行参数
        "inputArgs": mysys.argv,

    }

    netWork = {
        # 发送字节数
        "bytes_sent": f"{network_stats.bytes_sent / (1024 ** 2):.2f} MB",
        # 接收字节数
        "bytes_recv": f"{network_stats.bytes_recv / (1024 ** 2):.2f} MB",
    }

    sysFiles = [

    ]

    # users = psutil.users()
    # print("操作系统的所有用户:", users)

    # 添加磁盘信息到表格
    for partition in disk_stats:
        try:
            disk_usage = psutil.disk_usage(partition.mountpoint)
            sysFiles.append({
                # 盘符路径
                "dirName": partition.device,
                # 文件系统
                "sysTypeName": partition.fstype,
                # 盘符类型
                "typeName": partition.opts,
                "total": str(round(disk_usage.total / (1024.0 * 1024.0 * 1024.0), 2)) + " GB",
                "free": str(round(disk_usage.free / (1024.0 * 1024.0 * 1024.0), 2)) + " GB",
                "used": str(round(disk_usage.used / (1024.0 * 1024.0 * 1024.0), 2)) + " GB",
                # 已用百分比
                "usage": disk_usage.percent,
            })
        except Exception as e:
            print(f'读取磁盘发生了错误:{e}')

    data['cpu'] = cpu
    data['mem'] = mem
    data['sys'] = sys
    data['sysFiles'] = sysFiles
    data['jvm'] = jvm
    data['netWork'] = netWork
    return data


def get_wlan_info():
    info = psutil.net_if_addrs()
    netcard_info = []
    ips = []
    for k, v in info.items():
        for item in v:
            if item[0] == 2:
                netcard_info.append((k, item[1]))
                ips.append(item[1])
    return netcard_info, ips


def get_host_ip():
    """
    获取局域网ip
    @return:
    """
    netcard_info, ips = get_wlan_info()
    real_ips = list(filter(lambda x: x and x != '127.0.0.1', ips))
    jyw = list(filter(lambda x: str(x).startswith('192.168') and not str(x).endswith('.1'), real_ips))
    return real_ips[-1] if len(jyw) < 1 else jyw[0]


if __name__ == '__main__':
    print(get_server_info())
