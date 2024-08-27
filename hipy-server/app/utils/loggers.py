import json
from typing import Optional
from logging.handlers import RotatingFileHandler, TimedRotatingFileHandler
import os

import logging
import logging.config
from logging import Logger
import sys
import configparser

LOG_FMT = '%(asctime)s [%(levelname)s] %(message)s', '%Y-%m-%d %H:%M:%S'


class Logging:
    """简单的logging wrapper"""

    def __init__(self, config_path: str = None):
        if config_path and os.path.exists(config_path):
            if config_path.endswith('.json'):
                with open(config_path, "r") as f:
                    config = json.load(f)
                    logging.config.dictConfig(config)
            else:
                config = configparser.ConfigParser()
                config.read(config_path)
                try:
                    value1 = config.get('handler_error', 'kwargs')
                    value = eval(value1)
                    filename = value['filename']
                    os.makedirs(os.path.dirname(filename),exist_ok=True)
                except Exception as e:
                    print(f'发生错误:{e}')

                try:
                    value2 = config.get('handler_info', 'kwargs')
                    value = eval(value2)
                    filename = value['filename']
                    os.makedirs(os.path.dirname(filename),exist_ok=True)
                except Exception as e:
                    print(f'发生错误:{e}')

                logging.config.fileConfig(config_path, disable_existing_loggers=True)
        else:
            logging.basicConfig(level=logging.DEBUG)

    @staticmethod
    def getConsoleHandler() -> Optional[logging.StreamHandler]:
        fh = logging.StreamHandler(sys.stderr)
        fh.setLevel(logging.INFO)
        formatter = logging.Formatter(*LOG_FMT)
        fh.setFormatter(formatter)
        return fh

    @staticmethod
    def getAccessHandler(log_path: str) -> Optional[logging.FileHandler]:
        fh = RotatingFileHandler(log_path, maxBytes=5 * 1024 * 1024, backupCount=10, delay=False)
        fh.setLevel(logging.INFO)
        formatter = logging.Formatter(*LOG_FMT)
        fh.setFormatter(formatter)
        return fh

    @staticmethod
    def getErrorHandler(log_path: str) -> Optional[logging.FileHandler]:
        fh = RotatingFileHandler(log_path, maxBytes=5 * 1024 * 1024, backupCount=5, delay=False)
        fh.setLevel(logging.ERROR)
        formatter = logging.Formatter(*LOG_FMT)
        fh.setFormatter(formatter)
        return fh

    @classmethod
    def use(cls, log_name: str = None, log_dir: str = "./log/", propagate: bool = False) -> Logger:
        """
        use 使用logger

        :param str  log_name: logger name  None to root, defaults to None
        :param str  log_dir: log文件输出路径, defaults to "./log/"
        :param bool propagate: 是否继承root logger, defaults False
        :return logging.Logger: logger
        """
        logger = Logger.manager.loggerDict.get(log_name)
        if logger: return logger  # logger 已存在
        logger = logging.getLogger(log_name)
        if logger == logging.root: return logger  # logger是root
        logger.setLevel(logging.INFO)
        logger.propagate = propagate
        log_path = os.path.join(log_dir, log_name)
        # console
        con_fh = cls.getConsoleHandler()
        if con_fh: logger.addHandler(con_fh)
        # info
        acc_fh = cls.getAccessHandler(f"{log_path}.log")
        if acc_fh: logger.addHandler(acc_fh)
        # error
        err_fh = cls.getErrorHandler(f"{log_path}.err.log")
        if err_fh: logger.addHandler(err_fh)
        return logger
