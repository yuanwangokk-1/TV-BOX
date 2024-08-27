#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : views_scheduler.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Author's Blog: https://blog.csdn.net/qq_32394351
# Date  : 2023/12/10
import os

from fastapi import APIRouter, Depends, Query, Body, UploadFile
from numpy import safe_eval
from sqlalchemy.orm import Session
from common import deps, error_code
from ..curd.curd_job import Job, curd_job as curd
from common.task_apscheduler import query_job_all, query_job_id, add_job, modify_job, del_job, start_job, pause_job, \
    _format_fun, create_no_store_job, add_task
from common.resp import respSuccessJson, respErrorJson
from common.schemas import StatusSchema, ActiveSchema
from ...permission.models import Users
from ..schemas import job_schemas
from core.logger import logger
from utils.tools import thread_it

router = APIRouter()

access_name = 'monitor:job'
api_url = '/job'

"""
定时任务与业务逻辑结合
根据业务逻辑调用上面封装好的apscheduler函数实现定时任务功能，下面是业务逻辑的views层业务代码，它的开发逻辑如下。

1.创建任务时，将任务信息添加到数据库中，任务信息包含任务id、任务名称name、任务定时表达式cron、任务状态status、默认任务状态为暂停。此时不调用Apscheduler创建任务。
2.只有点击运行startTask运行任务时，从数据库中查询任务信息，将任务信息添加到apscheduler中，运行任务。
3.编辑任务时，调用task_apscheduler.py文件删除任务函数，从apscheduler中删除该任务。然后更新数据库中的任务信息。
4.暂停任务时，调用task_apscheduler.py文件暂停任务函数，暂停apscheduler中该任务。同时更新数据库中任务状态为暂停。
5.启动任务，调用task_apscheduler.py文件启动任务函数，启动apscheduler中该任务。同时更新数据库中任务状态为启动。
6.删除任务，调用task_apscheduler.py文件删除任务函数，从apscheduler中删除该任务。然后删除数据库中的任务信息。

"""


def get_no_store_res():
    """
    获取所有job|直接从调度器取出，不查数据库
    :return:
    """
    schedules = []
    for job in query_job_all():
        schedules.append(
            {"job_id": job.id, "job_name": job.name, "func_name": job.func_ref, "func_args": job.args,
             "cron_model": str(job.trigger), "coalesce": job.coalesce,
             "next_run": job.next_run_time.strftime("%Y-%m-%d %H:%M:%S")
             }
        )
    res = {'results': schedules, 'total': len(schedules)}
    return res


@router.post(api_url + "/file/importData", summary="上传定时任务脚本")
async def uploadImportData(*,
                           u: Users = Depends(deps.user_perm([f"{access_name}:post"])),
                           updateSupport: bool = Query(...),
                           file: UploadFile):
    up_data = file.file.read()
    up_name = file.filename  # type: str
    # 获取项目根目录
    project_dir = os.getcwd()
    task_dir = os.path.join(project_dir, 'tasks')
    os.makedirs(task_dir, exist_ok=True)
    save_path = os.path.join(task_dir, up_name)
    can_save = (not os.path.exists(save_path)) or updateSupport
    if can_save:
        with open(save_path, 'wb') as f:
            f.write(up_data)
        return respSuccessJson(data={'path': save_path}, msg='上传成功')
    else:
        return respErrorJson(error_code.ERROR_TASK_ADD_ERROR.set_msg(f'上传失败:脚本文件{save_path}已存在'))


@router.get(api_url + '/now', summary="查询当前内存定时任务")
async def get_job_list():
    res = get_no_store_res()
    return respSuccessJson(res)


@router.get(api_url + '/list', summary="查询定时任务调度列表")
async def searchRecords(*,
                        db: Session = Depends(deps.get_db),
                        status: int = Query(None),
                        job_name: str = Query(None),
                        job_group: str = Query(None),
                        page: int = Query(1, gt=0),
                        page_size: int = Query(20, gt=0),
                        ):
    res = curd.search(db, job_name=job_name, job_group=job_group, status=status, page=page, page_size=page_size)
    return respSuccessJson(res)


def get_no_store_detail(job_id):
    """
    获取job详情|直接从调度器取出，不查数据库
    :return:
    """
    job = query_job_id(job_id)

    if not job:
        res = {}
    else:
        res = {"job_id": job.id, "job_name": job.name, "func_name": job.func_ref, "func_args": job.args,
               "cron_model": str(job.trigger), "coalesce": job.coalesce,
               "next_run": job.next_run_time.strftime("%Y-%m-%d %H:%M:%S")
               }
    return res


@router.get(api_url + '/{job_id}', summary="查询定时任务调度详细")
async def get_job_detail(*,
                         db: Session = Depends(deps.get_db),
                         job_id: str = Query(..., title="任务id"),
                         ):
    # res = get_no_store_detail(job_id)
    # if not res:
    #     return respErrorJson(error=error_code.ERROR_TASK_NOT_FOUND)
    # return respSuccessJson(res)

    return respSuccessJson(curd.get(db, _id=int(job_id)))


@router.post(api_url, summary="新增定时任务调度")
async def addRecord(*,
                    db: Session = Depends(deps.get_db),
                    u: Users = Depends(deps.user_perm([f"{access_name}:post"])),
                    obj: job_schemas.JobSchema,
                    ):
    job_id, error = create_no_store_job(obj)
    if error:
        return respErrorJson(error=error)
    try:
        # 如果添加的状态是暂停的，这里手动设置一下暂停
        if obj.status == 0:
            pause_job(job_id)
    except Exception as e:
        logger.info(f'改变任务状态发生错误:{e}')
    del obj.server_restart
    res = curd.create(db, obj_in=obj, creator_id=u['id'])
    if res:
        return respSuccessJson({'id': job_id})

    return respErrorJson(error=error_code.ERROR_TASK_ADD_ERROR)


@router.put(api_url + "/{_id}/status", summary="任务状态修改")
async def setStatus(*,
                    db: Session = Depends(deps.get_db),
                    u: Users = Depends(deps.user_perm([f"{access_name}:put"])),
                    _id: int,
                    obj: StatusSchema
                    ):
    job = db.query(Job).filter(Job.id == _id).first()
    try:
        if obj.status == 0:
            pause_job(job.job_id)
        elif obj.status == 1:
            start_job(job.job_id)
    except Exception as e:
        logger.info(f'改变任务状态发生错误:{e}')
    curd.setStatus(db, _id=_id, status=obj.status, modifier_id=u['id'])
    return respSuccessJson()


@router.put(api_url + "/{_id}/active", summary="修改定时任务是否使用中[自启]，不会删除正在运行的任务")
async def setActive(*,
                    db: Session = Depends(deps.get_db),
                    u: Users = Depends(deps.user_perm([f"{access_name}:put"])),
                    _id: int,
                    obj: ActiveSchema
                    ):
    curd.setActive(db, _id=_id, active=obj.active, modifier_id=u['id'])
    return respSuccessJson()


@router.put(api_url + '/{_id}/run', summary="定时任务立即执行一次")
async def run_job(*,
                  db: Session = Depends(deps.get_db),
                  u: Users = Depends(deps.user_perm([f"{access_name}:put"])),
                  _id: int,
                  ):
    job = db.query(Job).filter(Job.id == _id).first()
    if not job:
        return respErrorJson(error_code.ERROR_TASK_NOT_FOUND.set_msg(f"not found job {_id}"))

    func_args = job.func_args
    func_kwargs = job.func_kwargs

    func_args_list = [job.job_id]
    func_kwargs_dict = {}
    try:
        args_list = safe_eval(func_args)
        if isinstance(args_list, list):
            func_args_list.extend(args_list)
    except Exception as e:
        logger.info(f'{job.job_name} func_args 序列化列表发生错误:{e}')

    try:
        args_dict = safe_eval(func_kwargs)
        if isinstance(args_dict, dict):
            func_kwargs_dict.update(args_dict)
    except Exception as e:
        logger.info(f'{job.job_name} func_kwargs 序列化列表发生错误:{e}')

    func_args = func_args_list
    func_kwargs = func_kwargs_dict

    try:
        func = _format_fun(job.func_name)
        # func(*func_args, **func_kwargs) # 同步执行，会卡
        # thread_it(func, *func_args, **func_kwargs)  # 开线程执行
        # 延迟1秒任务调度
        add_task(func=func, args=func_args, kwargs=func_kwargs, id='temp_' + job.job_id, name='temp_' + job.job_name)
        return respSuccessJson()
    except Exception as e:
        return respErrorJson(error_code.ERROR_TASK_INVALID.set_msg(f"{e}"))


@router.put(api_url + "/{_id}", summary="修改定时任务调度")
async def setRecord(*,
                    db: Session = Depends(deps.get_db),
                    u: Users = Depends(deps.user_perm([f"{access_name}:put"])),
                    _id: int,
                    obj: job_schemas.JobSchema,
                    ):
    # 删掉重新添加
    try:
        del_job(obj.job_id)
    except Exception as e:
        logger.info(f'修改定时任务调度发生错误:{e}')

    job_id, error = create_no_store_job(obj)
    if error:
        return respErrorJson(error=error)
    try:
        # 如果添加的状态是暂停的，这里手动设置一下暂停
        if obj.status == 0:
            pause_job(job_id)
    except Exception as e:
        logger.info(f'改变任务状态发生错误:{e}')
    del obj.server_restart
    curd.update(db, _id=_id, obj_in=obj, modifier_id=u['id'])
    return respSuccessJson()


@router.delete(api_url + "/{_ids}", summary="删除定时任务调度")
async def delRecord(*,
                    db: Session = Depends(deps.get_db),
                    u: Users = Depends(deps.user_perm([f"{access_name}:delete"])),
                    _ids: str,
                    ):
    _ids = list(map(lambda x: int(x), _ids.split(',')))
    jobs = db.query(Job).filter(Job.id.in_(_ids), Job.is_deleted != 1).all()
    for job in jobs:
        try:
            del_job(job.job_id)
        except Exception as e:
            logger.info(f'删除定时任务调度发生错误:{e}')

    curd.deletes(db, _ids=_ids, deleter_id=u['id'])
    return respSuccessJson()
