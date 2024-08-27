from db.base_class import Base
from db.session import engine
from .config_settings import ConfigSettings
from .dictionaries import DictData, DictDetails


__all__ = ['DictData', 'DictDetails', 'ConfigSettings']


Base.metadata.create_all(engine)