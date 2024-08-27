from fastapi import FastAPI
from pymongo import MongoClient, database

from core.config import settings


def registerMongo(app: FastAPI) -> None:
    """
    把MongoDB挂载到app对象上面
    :param app:
    :return:
    """

    @app.on_event('startup')
    async def startup_event():
        """
        获取链接
        :return:
        """
        
        app.mongodb_client = None if not settings.MONGODB_HOST else MongoClient(
            settings.getMongoURL(), serverSelectionTimeoutMS=10000, connectTimeoutMS=10000)
        app.mongo = app.mongodb_client and app.mongodb_client.get_database(settings.MONGODB_DB_NAME or "db")

    @app.on_event('shutdown')
    async def shutdown_event():
        """
        关闭
        :return:
        """
        if app.mongodb_client:
            app.mongodb_client.close()
        
        
def get_mongo(db_name: str = settings.MONGODB_DB_NAME) -> database.Database:
    """
    get_mongo 获取MongoDB数据库连接

    :param str db_name: 选择的数据库名称 
    :return database.Database:
    """
    if not settings.MONGODB_HOST:
        return None
    return MongoClient(settings.getMongoURL())[db_name or "db"]
