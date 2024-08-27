from db.base_class import Base
from db.session import engine
from .vod_rules import VodRules
from .vod_configs import VodConfigs

__all__ = ['VodRules', 'VodConfigs']

Base.metadata.create_all(engine)
