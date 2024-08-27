from typing import Union, List, Optional
from pydantic import BaseModel, AnyHttpUrl, conint


class ActiveSchema(BaseModel):
    active: bool


class OrderNumSchema(BaseModel):
    order_num: int


class StatusSchema(BaseModel):
    status: int
