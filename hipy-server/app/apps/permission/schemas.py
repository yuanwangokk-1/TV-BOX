from typing import Union, List, Optional
from pydantic import BaseModel, AnyHttpUrl, conint


class UserSchema(BaseModel):
    username: str
    nickname: str = ""
    sex: int = 0
    phone: str
    email: str
    avatar: str = ""
    is_active: bool = True
    status: int = 0
    roles: List[int] = []


class UserIsActiveSchema(BaseModel):
    is_active: bool


class UserSetPasswordSchema(BaseModel):
    password: str


class RoleSchema(BaseModel):
    name: str
    key: str
    order_num: int = 0
    status: int = 0
    menus: List[int] = []


class MenuSchema(BaseModel):
    path: str = ""
    component: str = ""
    is_frame: bool = False
    hidden: bool = False
    status: int = 0
    name: str = ""
    title: str = ""
    icon: str = ""
    order_num: int = 0
    no_cache: bool = True
    parent_id: int = 0


class RoleMenuSchema(BaseModel):
    menu_ids: List[int]


class PremLabelSchema(BaseModel):
    label: str
    remark: Optional[str] = None
    status: int = 0
    roles: List[int] = []
