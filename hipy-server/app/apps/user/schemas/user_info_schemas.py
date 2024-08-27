from typing import Union, List
from pydantic import BaseModel, AnyHttpUrl, conint


class UserCreateSchema(BaseModel):
    username: str
    nickname: str = ""
    sex: int = 0
    phone: str = ""
    email: str
    avatar: str = ""
    is_superuser: bool
    is_active: bool = True
    password: str
    roles: list = [2]


class LoginUserInfoSchema(BaseModel):
    user: str
    password: str
    code: str = ""
    key: str = ""


class RegisterUserInfoSchema(BaseModel):
    username: str
    email: str
    phone: str
    password: str
    sex: int = 0
    nickname: str = ""
    avatar: str = ""
    code: str = ""
    key: str = ""


class ForgetPasswordSubmitSchema(BaseModel):
    email: str
    code: str = ""
    key: str = ""


class ForgetPasswordSetPasswordSchema(BaseModel):
    password: str
    code: str = ""
    key: str = ""


class ChangeUserInfoSchema(BaseModel):
    username: str
    nickname: str
    email: str
    phone: str
    sex: str


class ChangePasswordSchema(BaseModel):
    old_password: str
    new_password: str


class UserAvailabilitySchema(BaseModel):
    data: str
    exclude_user_id: int = None
