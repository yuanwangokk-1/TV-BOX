from db.base_class import Base
from db.session import engine
from .hiker_developer import HikerDeveloper
from .hiker_rule import HikerRuleType, HikerRule

__all__ = ['HikerDeveloper', 'HikerRuleType', 'HikerRule']

Base.metadata.create_all(engine)
