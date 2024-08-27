#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : task_apscheduler.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Author's Blog: https://blog.csdn.net/qq_32394351
# Date  : 2023/12/10

from datetime import datetime, timedelta
import importlib
from apscheduler.triggers.cron import CronTrigger
from apscheduler.events import EVENT_JOB_ERROR, EVENT_JOB_MISSED, EVENT_JOB_EXECUTED
from core.config import settings
from apps.monitor.schemas import job_schemas
from . import error_code
from .sys_schedule import scheduler
from .deps import get_db
from core.logger import logger
from apps.monitor.models.job import Job
from apps.monitor.curd.curd_job_log import curd_job_log
from numpy import safe_eval
from tasks.active_sniffer import active_sniffer_after_run


def job_listener(Event):
    job = scheduler.get_job(Event.job_id)
    db = next(get_db())  # type: SessionLocal
    if job:
        db_job = db.query(Job).filter(Job.job_name == job.name).first()
    else:
        db_job = db.query(Job).filter(Job.job_id == Event.job_id.replace('temp_', '', 1)).first()

    db_job_val = {
        'job_id': db_job.job_id,
        'job_name': db_job.job_name,
        'job_group': db_job.job_group,
        'func_name': db_job.func_name,
        'func_args': db_job.func_args,
        'func_kwargs': db_job.func_kwargs,
    } if db_job else {}

    if job:
        if not Event.exception:
            logger.info("jobname=%s|jobtrigger=%s|jobtime=%s|retval=%s", job.name, job.trigger,
                        Event.scheduled_run_time, Event.retval)
            obj_in = {'job_name': job.name, 'run_time': Event.scheduled_run_time, 'run_status': 1,
                      'run_info': f'{Event.retval}'}
            if Event.retval and ('激活成功' in Event.retval or '传入的url不合法' in Event.retval):
                del_job(obj_in['job_name'])
                logger.info('---嗅探器已激活---')
            elif Event.retval and '无法激活' in Event.retval:
                del_job(obj_in['job_name'])
                logger.info('---嗅探器无法激活,缺少playwright---')

        else:
            logger.error("jobname=%s|jobtrigger=%s|errcode=%s|exception=[%s]|traceback=[%s]|scheduled_time=%s",
                         job.name,
                         job.trigger, Event.code,
                         Event.exception, Event.traceback, Event.scheduled_run_time)
            obj_in = {'job_name': job.name, 'run_time': Event.scheduled_run_time, 'run_status': 0,
                      'run_info': f'{Event.traceback}', 'run_except_info': f'{Event.exception}'}
    else:
        logger.info("任务执行一次后已自动清除:job_id=%s|jobtime=%s|retval=%s", Event.job_id, Event.scheduled_run_time,
                    Event.retval)
        if not Event.exception:
            obj_in = {'job_id': Event.job_id, 'run_time': Event.scheduled_run_time, 'run_status': 1,
                      'run_info': f'{Event.retval}'}
        else:
            logger.error("job_id=%s|errcode=%s|exception=[%s]|traceback=[%s]|scheduled_time=%s",
                         Event.job_id, Event.code,
                         Event.exception, Event.traceback, Event.scheduled_run_time)
            obj_in = {'job_id': Event.job_id, 'run_time': Event.scheduled_run_time, 'run_status': 0,
                      'run_info': f'{Event.traceback}', 'run_except_info': f'{Event.exception}'}

    obj_in.update(db_job_val)
    if obj_in.get('run_info') and obj_in['run_info'] != str(None):
        curd_job_log.create(db, obj_in=obj_in)


# 注册scheduler
def scheduler_register():
    scheduler.init_scheduler()  # noqa 去掉不合理提示
    scheduler.add_listener(job_listener, EVENT_JOB_ERROR | EVENT_JOB_MISSED | EVENT_JOB_EXECUTED)
    # add_task(active_sniffer_after_run, id='active_sniffer_after_run', name='active_sniffer_after_run', seconds=5)
    scheduler.add_job(active_sniffer_after_run, 'interval', id=str('active_sniffer_after_run'),
                      name='active_sniffer_after_run', seconds=5)
    JobInit().init_jobs_pause()  # noqa


def _format_fun(func_name="tasks.demo_task.demo"):
    method_name = func_name.split('.')[-1]
    method_path = '.'.join(func_name.split('.')[:-1])
    params = importlib.import_module(method_path)
    method_obj = getattr(params, method_name)
    return method_obj


def cron_pattern(expression):
    ''' 将cron表达式转换为 ApScheduler接收的字典格式

    :param expression: cron表达式
    :return: 字典格式cron表达式
    '''
    args = {}
    if expression is None:
        return args
    # 以空格为分隔符拆分字符串输出列表，拆分结果 ['0/2', '*', '*', '*', '*', '?']
    expression = expression.split(' ')
    if expression[0] != '?':
        args['second'] = expression[0]
    if expression[1] != '?':
        args['minute'] = expression[1]
    if expression[2] != '?':
        args['hour'] = expression[2]
    if expression[3] != '?':
        args['day'] = expression[3]
    if expression[4] != '?':
        args['month'] = expression[4]
    if expression[5] != '?':
        args['day_of_week'] = expression[5]
    return args


def add_task(func=None, args=None, kwargs=None, id=None, name=None, next_run_time=None, seconds=1):
    """
    1秒后执行一次后台任务
    """
    if not next_run_time:
        # next_run_time = datetime.now() + timedelta(seconds=settings.JOB_DELTA)
        next_run_time = datetime.now() + timedelta(seconds=seconds)
    return scheduler.add_job(func, 'date', id=str(id), args=args, kwargs=kwargs, name=name,
                             next_run_time=next_run_time)


def add_job(func_name=None, args=None, kwargs=None, id=None, name=None, next_run_time=None,
            coalesce=False, cron=None):
    '''将需要运行的函数添加到任务存储器中，并启动任务。

    :param func_name: 待运行的函数名称
    :param args: 函数参数
    :param kwargs: 函数参数
    :param id: 任务id
    :param name: 任务名称
    :param coalesce: 是否合并任务运行
    :param cron: 任务运行计划表达式
    :return:
    '''
    func = _format_fun(func_name)
    cron_trigger = CronTrigger(**cron_pattern(cron))
    return scheduler.add_job(func, cron_trigger, id=str(id), args=args, kwargs=kwargs, name=name,
                             next_run_time=next_run_time,
                             coalesce=coalesce)


def del_job(job_id):
    ''' 删除ApScheduler存储器中已存在的任务

    :param job_id: 任务id
    :return:
    '''
    scheduler.remove_job(str(job_id))


def modify_job(func_name=None, args=None, kwargs=None, id=None, name=None, next_run_time=None, coalesce=False,
               cron=None):
    ''' 删除已存在的任务，然后使用已删除的任务id创建新任务，实现修改任务功能

    :param func_name: 待运行的函数
    :param args: 函数参数
    :param kwargs: 函数参数
    :param id: 任务id
    :param name: 任务名称
    :param trigger: 触发器类型
    :param coalesce: 是否合并任务运行
    :param cron: 任务运行计划表达式
    :return:
    '''
    del_job(id)
    add_job(func_name=func_name, args=args, kwargs=kwargs, id=str(id), name=name, next_run_time=next_run_time,
            coalesce=coalesce, cron=cron)


def query_job_id(job_id):
    ''' 根据id查询任务信息

    :param job_id: 任务id
    :return: 任务信息
    '''
    return scheduler.get_job(str(job_id))


def query_job_all():
    ''' 查询所有任务信息

    :return:任务信息列表
    '''
    return scheduler.get_jobs()


def pause_job(job_id):
    ''' 暂停ApScheduler存储器中已存在的任务,返回任务状态

    :param job_id: 任务id
    :return: 返回任务状态
    '''
    job_info = scheduler.pause_job(str(job_id))

    return get_job_status(job_info)


def start_job(job_id):
    ''' 启动ApScheduler存储器中已存在且暂停的任务，返回任务状态

    :param job_id: 任务id
    :return: 返回任务状态
    '''
    job_info = scheduler.resume_job(str(job_id))
    return get_job_status(job_info)


def get_job_status(job_data):
    ''' 从job信息中提炼出状态值

    :param job_data: 任务信息
    :return: 任务状态
    '''
    return str(job_data).split(",")[-1].strip(")")


def create_no_store_job(obj: job_schemas.JobSchema):
    """
    创建job
    返回创建好的任务ID，错误
    简易的任务调度演示 可自行参考文档 https://apscheduler.readthedocs.io/en/stable/
    三种模式
    date: use when you want to run the job just once at a certain point of time
    interval: use when you want to run the job at fixed intervals of time
    cron: use when you want to run the job periodically at certain time(s) of day

    :return:
    """
    job_id = obj.job_id or obj.job_name
    job_name = obj.job_name
    cron_expression = obj.cron_expression
    func_args = obj.func_args
    func_kwargs = obj.func_kwargs
    func_name = obj.func_name
    next_run = obj.next_run
    if next_run:
        try:
            next_run = datetime.strptime(next_run, '%Y-%m-%d %H:%M:%S')
        except:
            try:
                next_run = datetime.strptime(next_run, '%Y-%m-%dT%H:%M:%S.%fZ')
            except:
                pass
    if not obj.server_restart:
        now = datetime.now()
        now_next = now + timedelta(seconds=settings.JOB_DELTA)
        if not next_run or next_run < now_next:
            next_run = now_next
        obj.next_run = next_run

    func_args_list = [job_id]
    func_kwargs_dict = {}
    try:
        # func_args = json.loads(func_args)
        args_list = safe_eval(func_args)
        if isinstance(args_list, list):
            func_args_list.extend(args_list)
    except Exception as e:
        logger.info(f'{job_name} func_args 序列化列表发生错误:{e}')

    try:
        # func_args = json.loads(func_args)
        args_dict = safe_eval(func_kwargs)
        if isinstance(args_dict, dict):
            func_kwargs_dict.update(args_dict)
    except Exception as e:
        logger.info(f'{job_name} func_kwargs 序列化列表发生错误:{e}')

    func_args = func_args_list
    func_kwargs = func_kwargs_dict

    res = query_job_id(job_id)
    if res:
        return res.id, error_code.ERROR_TASK_INVALID.set_msg(f"{job_id} job already exists")

    schedule_job = add_job(
        func_name=func_name,
        args=func_args,
        kwargs=func_kwargs,
        id=job_id,
        name=job_name,
        next_run_time=next_run,
        cron=cron_expression,
    )
    return schedule_job.id, None


class JobInit:

    def __init__(self):
        self.db = next(get_db())  # type: SessionLocal

    # 重启服务检测数据库有哪些服务需要自启动
    def _automatic_task(self):
        # 查询数据库开了自动重启的任务
        active_jobs = self.db.query(Job).filter(Job.active == True, Job.is_deleted == 0).all()
        add_list = []
        for active_job in active_jobs:
            if query_job_id(active_job.job_id):
                logger.info(f"定时任务重复启用:【{active_job.job_id}】")
                continue
            # 更新下次执行时间
            next_run = active_job.next_run
            now = datetime.now()
            now_next = now + timedelta(seconds=settings.JOB_DELTA)
            # 如果下次执行时间 < 当前时间加定时任务刷新间隔,把下次执行时间设置为此时间
            active_job_next_run = now_next if next_run < now_next else next_run

            obj = job_schemas.JobSchema(
                job_id=active_job.job_id,
                job_name=active_job.job_name,
                func_name=active_job.func_name,
                # job_group=active_job.job_group,
                func_args=active_job.func_args,
                func_kwargs=active_job.func_kwargs,
                # coalesce=active_job.coalesce,
                cron_expression=active_job.cron_expression,
                next_run=active_job_next_run.strftime("%Y-%m-%d %H:%M:%S"),
                status=1,  # 启动
                server_restart=True  # 重启来的
            )
            job_id, error = create_no_store_job(obj)
            if error:
                logger.info(f'发生错误:{error.msg}')
                continue
            try:
                active_job.status = 1
                active_job.next_run = active_job_next_run
                add_list.append(active_job)
                logger.info(
                    f'定时任务【{active_job.job_id}:{active_job.job_name}】将在{settings.JOB_DELTA}秒钟后运行.下次执行时间为:{active_job_next_run}')

            except Exception as e:
                logger.info(f'改变任务状态发生错误:{e}')

        if len(add_list) > 0:
            self.db.commit()

    def init_jobs_pause(self):
        '''每次重启项目后APScheduler中的任务就会从内存中删除，导致APScheduler中的任务和数据库任务状态不一致，
        所以项目启动时将数据库中任务状态初始化为暂停状态
        :return:
        '''
        try:
            if (tasks := self.query_started_job()) is not None:
                self.set_pause_task(tasks)
            else:
                logger.info('数据库中没有已启动定时任务，不需要初始化任务')

        except Exception as e:
            logger.error('初始化定时任务状态失败信息：', e)

        try:
            self._automatic_task()
        except Exception as e:
            logger.info(f'_automatic_task执行错误,请升级数据库:{e}')

        self.db.close()
        logger.info('init_jobs_pause函数执行完毕，相关数据库连接已关闭')

    def query_started_job(self):
        return self.db.query(Job).filter(Job.status == 1)

    def set_pause_task(self, tasks):
        try:
            obj = tasks.update({'status': 0})
            self.db.commit()
            if isinstance(obj, int):
                logger.info(f'初始化定时任务状态成功')
                return obj
        except:
            raise
