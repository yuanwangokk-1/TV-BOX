try:
    from redis import asyncio as aioredis
except ImportError:
    import aioredis
from fastapi import FastAPI
import redis

from core.config import settings


def registerRedis(app: FastAPI) -> None:
    """
    把redis挂载到app对象上面, 异步redis
    :param app:
    :return:
    """

    @app.on_event('startup')
    async def startup_event():
        """
        获取链接
        :return:
        """
        app.state.redis = await aioredis.from_url(settings.getRedisURL())

    @app.on_event('shutdown')
    async def shutdown_event():
        """
        关闭
        :return:
        """
        await app.state.redis.close()


def get_redis() -> redis.Redis:
    """
    get_redis 同步的redis

    :return redis.Redis
    """
    pool = redis.ConnectionPool.from_url(settings.getRedisURL())
    return redis.Redis(connection_pool=pool)