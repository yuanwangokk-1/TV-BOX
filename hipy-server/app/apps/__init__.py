from fastapi.routing import APIRouter

from .user import user_api
from .permission import permission_api
from .system import system_api
from .hiker import hiker_developer_api, hiker_rule_type_api, hiker_rule_api
from .monitor import monitor_server_api, monitor_logininfor_api, monitor_job_api, monitor_job_log_api, monitor_pip_api, \
    monitor_cache_api
from .web import web_api
from .report import report_api
from .vod import vod_api, vod_rules_api, vod_configs_api, vod_houses_api

api_router = APIRouter()
web_router = APIRouter()

api_router.include_router(user_api, prefix="/user", tags=["用户管理"])
api_router.include_router(system_api, prefix="/system", tags=["系统设置"])
api_router.include_router(permission_api, prefix="/permission", tags=["权限管理"])
api_router.include_router(report_api, prefix="/report", tags=["报表导出"])
api_router.include_router(vod_rules_api, prefix="/vods", tags=["爬虫源管理"])
api_router.include_router(vod_configs_api, prefix="/vods", tags=["hipy参数配置"])
api_router.include_router(vod_houses_api, prefix="/vods", tags=["drpy源仓库"])
api_router.include_router(vod_api, prefix="/vod", tags=["爬虫源生成"])

hiker_apis = [hiker_developer_api, hiker_rule_type_api, hiker_rule_api]
for hiker_api in hiker_apis:
    api_router.include_router(hiker_api, prefix="/hiker", tags=["海阔视界"])

monitor_apis = [monitor_server_api, monitor_logininfor_api]
for monitor_api in monitor_apis:
    api_router.include_router(monitor_api, prefix="/monitor", tags=["监视器"])

api_router.include_router(monitor_job_api, prefix="/monitor", tags=["定时任务"])
api_router.include_router(monitor_job_log_api, prefix="/monitor", tags=["定时任务日志"])
api_router.include_router(monitor_pip_api, prefix="/monitor", tags=["依赖管理"])
api_router.include_router(monitor_cache_api, prefix="/monitor", tags=["缓存管理"])

web_router.include_router(web_api, prefix="", tags=["网页"])

__all__ = ['api_router']
