#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : fields.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Author's Blog: https://blog.csdn.net/qq_32394351
# Date  : 2023/12/2

import sqlalchemy as sql
from sqlalchemy.sql import func
from sqlalchemy import Column, ForeignKey
from sqlalchemy.orm import relationship, backref
from core.config import settings

NONE = 'null'


# NONE = None

def now():
    return func.now()


def today():
    return func.current_date()


def text(any):
    if type(any) == bool and ('mysql' in settings.SQLALCHEMY_ENGINE or 'sqlite' in settings.SQLALCHEMY_ENGINE):
        any_str = str(int(any))
    else:
        any_str = str(any)
    return sql.text(any_str)


def Char(string: str, default=NONE, required=False, length=256, index=False):
    primary_key = index
    if required and default == NONE:
        return Column(sql.String(length), nullable=False, comment=string, primary_key=primary_key)
    return Column(sql.String(length), default=None if default == NONE else str(default),
                  server_default=None if default == NONE else str(text(default)),
                  nullable=not required,
                  comment=string, primary_key=primary_key)


def Boolean(string: str, default=False, required=False, index=False):
    primary_key = index
    if required and default == NONE:
        return Column(sql.Boolean, nullable=False, comment=string, primary_key=primary_key)
    return Column(sql.Boolean, default=default, server_default=text(default), nullable=not required, comment=string,
                  primary_key=primary_key)


def Float(string: str, default=0.00, required=False, index=False):
    primary_key = index
    if required and default == NONE:
        return Column(sql.Float, nullable=False, comment=string, primary_key=primary_key)
    return Column(sql.Float, default=default, server_default=text(default), nullable=not required, comment=string,
                  primary_key=primary_key)


def Integer(string: str, default=0, required=False, index=False):
    primary_key = index
    if required and default == NONE:
        return Column(sql.Integer, nullable=False, comment=string, primary_key=primary_key)
    return Column(sql.Integer, default=default, server_default=text(default), nullable=not required, comment=string,
                  primary_key=primary_key)


def Date(string: str, default=NONE, required=False, index=False):
    primary_key = index
    if required and default == NONE:
        return Column(sql.Date, nullable=False, comment=string, primary_key=primary_key)
    if default == NONE:
        default = None
    return Column(sql.Date, default=default, server_default=default, nullable=not required, comment=string,
                  primary_key=primary_key)


def Datetime(string: str, default=NONE, required=False, index=False):
    primary_key = index
    if required and default == NONE:
        return Column(sql.Date, nullable=False, comment=string, primary_key=primary_key)
    if default == NONE:
        default = None
    return Column(sql.DateTime, default=default, server_default=default, nullable=not required, comment=string,
                  primary_key=primary_key)


def Many2one(comodel_name, string='', default=NONE, required=False, ondelete='set null', index=False):
    primary_key = index
    if required and default == NONE:
        return Column(sql.Integer,
                      ForeignKey(f"{settings.SQL_TABLE_PREFIX}{comodel_name}.id", ondelete=ondelete), nullable=False,
                      comment=string, primary_key=primary_key)
    return Column(sql.Integer,
                  ForeignKey(f"{settings.SQL_TABLE_PREFIX}{comodel_name}.id", ondelete=ondelete), default=default,
                  server_default=text(default), nullable=not required, comment=string, primary_key=primary_key)


def One2many(_table_class_, _tablename):
    """
    _table_class_:明细表的类名大写
    relationship 本表的__tablename__ 。
    """
    return relationship(_table_class_, secondary=f"{settings.SQL_TABLE_PREFIX}{_table_class_}{_tablename}",
                        backref=_tablename)


def Text(string: str, default=NONE, required=False, index=False):
    primary_key = index
    if required and default == NONE:
        return Column(sql.Text, nullable=False, comment=string, primary_key=primary_key)
    return Column(sql.Text, default=None if default == NONE else str(default),
                  server_default=None if default == NONE else str(text(default)),
                  nullable=not required,
                  comment=string, primary_key=primary_key)
