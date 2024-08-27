#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : init_db.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Author's Blog: https://blog.csdn.net/qq_32394351
# Date  : 2023/12/6
import logging
import os

import numpy as np
from sqlalchemy.orm import Session
from apps.user.curd.curd_user import curd_user
from apps.system.curd.curd_config_setting import curd_config_setting
from apps.permission.curd.curd_role import curd_role
from core.config import settings
from apps.permission.models.user import Users
from apps.permission.models.role import Roles
from apps.system.models import ConfigSettings
from apps.user.schemas.user_info_schemas import UserCreateSchema
from apps.permission.schemas import RoleSchema
from utils.tools import get_md5
from db.session import engine, insp
from sqlalchemy.sql.sqltypes import BOOLEAN
import pandas as pd

logger = logging.getLogger(__name__)


def init_users_and_roles(db: Session) -> None:
    """
    初始化增加角色和用户到数据库
    """
    users = []
    roles = []
    user = db.query(Users).filter(Users.username == settings.FIRST_SUPERUSER).first()
    if not user:
        user_in = UserCreateSchema(
            username=settings.FIRST_SUPERUSER,
            password=get_md5(settings.FIRST_SUPERUSER_PASSWORD),
            is_superuser=True,
            email=settings.FIRST_SUPERUSER_EMAIL
        )
        user = curd_user.create(db=db, obj_in=user_in)
    users.append(user)

    user = db.query(Users).filter(Users.username == settings.SECOND_SUPERUSER).first()
    if not user:
        user_in = UserCreateSchema(
            username=settings.SECOND_SUPERUSER,
            password=get_md5(settings.SECOND_SUPERUSER_PASSWORD),
            is_superuser=True,
            email=settings.SECOND_SUPERUSER_EMAIL
        )
        user = curd_user.create(db=db, obj_in=user_in)
    users.append(user)

    role_dict = {
        'admin': '超级管理员',
        'general': '一般用户',
        'Operation': '管理员',
    }
    for role_key in role_dict.keys():
        role = db.query(Roles).filter(Roles.key == role_key).first()
        if not role:
            role_in = RoleSchema(
                name=role_dict[role_key],
                key=role_key
            )
            role = curd_role.create(db=db, obj_in=role_in)
        roles.append(role)

    if users and roles:
        for user in users:
            user.user_role.extend(roles)
            db.add(user)
            db.commit()


def init_params(db: Session) -> None:
    """
    初始化加载俩系统参数到数据库
    """
    config_ids = []
    configs = db.query(ConfigSettings.value).filter(
        ConfigSettings.key == 'login_with_captcha').first()
    if not configs:
        obj_in = {
            "name": "需要登录验证码",
            "key": "login_with_captcha",
            "value": "yes" if settings.LOGIN_WITH_CAPTCHA else "no",
            "remark": "yes 开启 no 关闭",
            "status": 0,
            "order_num": 9,
        }
        configs = curd_config_setting.create(db=db, obj_in=obj_in)
    config_ids.append(configs)
    configs = db.query(ConfigSettings.value).filter(
        ConfigSettings.key == 'database_update_auth').first()
    if not configs:
        obj_in = {
            "name": "数据库升级密码",
            "key": "database_update_auth",
            "value": settings.DATABASE_UPDATE_AUTH,
            "remark": "默认密码hjdhnx",
            "status": 0,
            "order_num": 10,
        }
        configs = curd_config_setting.create(db=db, obj_in=obj_in)
    configs = db.query(ConfigSettings.value).filter(
        ConfigSettings.key == 'log_captcha_error').first()
    if not configs:
        obj_in = {
            "name": "登录日志记录验证码错误",
            "key": "log_captcha_error",
            "value": settings.LOG_CAPTCHA_ERROR,
            "remark": "0/false不记录 1/true记录",
            "status": 0,
            "order_num": 11,
        }
        configs = curd_config_setting.create(db=db, obj_in=obj_in)
    config_ids.append(configs)
    logger.info(config_ids)
    # db.commit()
    # db.close()


def init_table_data_form_csv(db: Session) -> None:
    """
    从本地csv文件初始化数据到数据库
    """
    # converters = get_converters()
    converters = get_converters_auto()
    init_data_path = os.path.join(os.path.dirname(__file__), "init_data")
    files = ['config_settings.csv', 'dict_data.csv', 'dict_details.csv', 'hiker_rule_type.csv', 'hiker_developer.csv',
             'hiker_rule.csv',
             'menus.csv', 'roles.csv', 'role_menu.csv', 'perm_label.csv', 'perm_label_role.csv',
             'users.csv', 'user_role.csv', 'login_infor.csv', 'job.csv', 'job_log.csv', 'vod_configs.csv',
             'vod_rules.csv']
    for file in files:
        file_path = os.path.join(init_data_path, file)
        df = pd.read_csv(file_path, sep=",", converters=converters)
        if file == "menus.csv":
            df['component'] = df['component'].apply(lambda x: '' if pd.isnull(x) else x)
            df['name'] = df['name'].apply(lambda x: '' if pd.isnull(x) else x)
        logger.info(f"{file}  load successed")
        file_tb_name = file.replace(".csv", "")
        table_name = settings.SQL_TABLE_PREFIX + file_tb_name
        deal_df(df, file_tb_name)
        df.to_sql(table_name, engine, if_exists="append", index=False)
        print(df)
        if 'mysql' in settings.SQLALCHEMY_ENGINE:
            sql = f"ALTER TABLE {table_name} AUTO_INCREMENT = {max(df['id']) + 1 if not df.empty else 1}"
            logger.info(sql)
            db.execute(sql)
        elif 'sqlite' in settings.SQLALCHEMY_ENGINE:
            # 2023/12/28修改 sqlite不需要重置自增序号。系统级会自动去取下个id
            pass
            # try:
            #     sql = f"UPDATE sqlite_sequence SET seq = {max(df['id']) + 1 if not df.empty else 1} WHERE name = '{table_name}';"
            #     logger.info(sql)
            #     db.execute(sql)
            # except:
            #     print('sqlite执行列自增序号修改失败')
        elif 'postgresql' in settings.SQLALCHEMY_ENGINE:
            # sql = f"select setval('{table_name}_id_seq', {max(df['id']) + 1 if not df.empty else 1}) from {table_name};"
            sql = f"ALTER SEQUENCE {table_name}_id_seq RESTART WITH {max(df['id']) + 1 if not df.empty else 1};"
            logger.info(sql)
            db.execute(sql)
    db.commit()
    db.close()


def deal_df(df, file_tb_name):
    if file_tb_name in ['dict_details']:
        if 'dict_disabled' in df.all():
            print(df.dict_disabled)


def get_converters():
    """
    手动获取pandas sql装饰函数
    处理postgresql导入数据时bool字段不能识别数字0,1的问题
    """
    if 'postgresql' in settings.SQLALCHEMY_ENGINE:
        return {
            'dict_disabled': lambda x: str(int(x) == 1),
            'is_default': lambda x: str(int(x) == 1),
            'is_manager': lambda x: str(int(x) == 1),
            'active': lambda x: str(int(x) == 1),
            'is_safe': lambda x: str(int(x) == 1),
            'is_white': lambda x: str(int(x) == 1),
            'is_good': lambda x: str(int(x) == 1),
            'is_json_list': lambda x: str(int(x) == 1),
            'can_discuss': lambda x: str(int(x) == 1),
            'is_tap': lambda x: str(int(x) == 1),
            'is_json': lambda x: str(int(x) == 1),
            'is_redirect': lambda x: str(int(x) == 1),
            'time_over': lambda x: str(int(x) == 1),
            'is_frame': lambda x: str(int(x) == 1),
            'hidden': lambda x: str(int(x) == 1),
            'no_cache': lambda x: str(int(x) == 1),
            'is_active': lambda x: str(int(x) == 1),
            'is_superuser': lambda x: str(int(x) == 1),
            # 'dict_disabled': lambda x: np.where(x==1,True,False)
        }
    else:
        return {}


def get_converters_auto():
    """
    自动获取pandas sql装饰函数
    """
    db_name = None
    converters = {}
    if 'sqlite' in settings.SQLALCHEMY_ENGINE:
        db_name = 'main'
        # return converters
    elif 'postgresql' in settings.SQLALCHEMY_ENGINE:
        db_name = 'public'
    elif 'mysql' in settings.SQLALCHEMY_ENGINE:
        db_name = settings.SQL_DATABASE
        # return converters

    # 获取数据库名
    print(insp.get_schema_names())

    if db_name:
        cls = []
        tables = insp.get_table_names(schema=db_name)
        print(f'数据库结构:{db_name}里的所有表:', tables)
        for table in tables:
            columns = insp.get_columns(table, schema=db_name)
            # print(f'数据库结构:{db_name}里的表{table}里所有列:', columns)
            cl = [c for c in columns if isinstance(c['type'], BOOLEAN)]
            if cl:
                cls.extend(cl)
            for c in cl:
                converters.update({
                    # c['name']: lambda x: x if x in ['True', 'False'] else str(int(x) == 1)
                    c['name']: lambda x: x == 'True' if x in ['True', 'False'] else int(x) == 1
                })
        # print('cls:', len(cls), cls)
        # print('converters:', len(converters.keys()), converters)

    return converters


def init_db(session: Session) -> None:
    db = session
    # init_users_and_roles(db) # 纯净模式啥也没有
    # init_params(db)  # 初始化系统参数
    init_table_data_form_csv(db)  # demo模式，有数据
    # print(get_converters_auto())
