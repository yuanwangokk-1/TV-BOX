#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : cmd.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Author's Blog: https://blog.csdn.net/qq_32394351
# Date  : 2023/12/4

import os
import subprocess
import shutil
from core.logger import logger
from common.deps import get_db
import traceback


def run_cmd_back_code(cmd):
    os.system('chcp 65001')
    return os.system(cmd)


def run_cmd_back_result(cmd):
    # 列出当前目录下的所有文件和目录
    # subprocess.run(['ls', '-l'])
    return subprocess.getoutput(cmd)


def run_cmd_back_code_result(cmd):
    return subprocess.getstatusoutput(cmd)


def update_db():
    try:
        db = next(get_db())  # type: SessionLocal
        try:
            dt = db.execute("SELECT now() as t;")
            results = dt.fetchall()
            logger.info(results)
            t = results[0][0]
            logger.info(f"===== {dt.rowcount} {t}=====")
        except:
            db.rollback()

    except:
        traceback.print_exc()
    old_dbfile = 'alembic/versions'
    if os.path.exists(old_dbfile):
        logger.info(f'开始删除历史数据库迁移文件:{old_dbfile}')
        # shutil.rmtree(old_dbfile)
        # os.makedirs(old_dbfile,exist_ok=True)
        # db.execute('drop table if exists alembic_version')
    else:
        logger.info(f'未找到历史数据库迁移文件:{old_dbfile}')
    cmd = 'alembic revision --autogenerate -m "auto_update" && alembic upgrade head'
    logger.info(f'开始执行cmd:{cmd}')
    # result = run_cmd_back_code(cmd)
    # result = run_cmd_back_result(cmd)
    result = run_cmd_back_code_result(cmd)
    logger.info(f'cmd执行结果:{result} 类型:{type(result)}')
    # return result == 0
    return result
