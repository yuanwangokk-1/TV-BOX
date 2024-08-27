#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : web.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Author's Blog: https://blog.csdn.net/qq_32394351
# Date  : 2023/12/3
import os
import re
from ast import literal_eval
from core.config import settings
from jinja2 import Environment, FileSystemLoader, Template


def to_lower_camel_case(x):
    """转小驼峰法命名：下划线转驼峰且首字母小写"""
    s = re.sub('_([a-zA-Z])', lambda m: (m.group(1).upper()), x)
    return s[0].lower() + s[1:]


def render_template_string(source: str, **context):
    # 构造环境
    env = Environment()
    # 添加一个过滤器
    env.filters['to_lower_camel_case'] = to_lower_camel_case
    # 获取模板
    template: Template = env.from_string(source)
    # 渲染
    view = template.render(**context)
    return view


def remove_comments(text):
    """
    字符串删除注释
    @param text:带注释的字符串
    @return:
    """

    pattern = re.compile(r'\s*[\'\"]{3}[\S\s]*?[\'\"]{3}')
    text = pattern.sub('', text)
    pattern = re.compile(r'\s*/\*[\S\s]*?\*/')
    text = pattern.sub('', text)
    text = text.splitlines()
    text = [txt for txt in text if not (txt.strip().startswith('//') or txt.strip().startswith('#'))]
    text = '\n'.join(text)
    return text.strip()


def parseJson(text: str):
    text = text.replace('false', 'False').replace('true', 'True').replace('null', 'None')
    return literal_eval(remove_comments(text))


class HtmlSender:
    ENV = Environment(loader=FileSystemLoader('./'))

    def __int__(self):
        pass

    @property
    def template_path(self) -> str:
        return self.ENV.loader

    @template_path.setter
    def template_path(self, path):
        try:
            if os.path.isdir(path):
                self.ENV = Environment(loader=FileSystemLoader(path))
            else:
                raise ValueError("template_path must dir")
        except Exception as e:
            raise ValueError("template_path must dir") from e

    def renderTemplate(self, template_name: str, data: dict = None) -> str:
        data = data or {}
        temp = self.ENV.get_template(f"{template_name}.html")
        return temp.render(**data)


htmler = HtmlSender()
htmler.template_path = settings.WEB_TEMPLATES_DIR

# print('===template_path===:', settings.WEB_TEMPLATES_DIR)
