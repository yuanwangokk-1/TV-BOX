from cgitb import reset
import email
from email.policy import default
from smtplib import SMTPServerDisconnected
from typing import Optional, Union, Any, Generator, List, Tuple, Iterable

try:
    from redis.asyncio import Redis
except ImportError:
    from aioredis import Redis
from jose import jwt
from pydantic import ValidationError
from fastapi import Depends, Header, Request, Cookie, Response
from utils.email import EmailSender
from core import constants
from apps.permission.curd.curd_user import curd_user
from apps.user.schemas import token_schemas
from core.config import settings
from db.session import SessionLocal, engine
from sqlalchemy.orm import Session

from common import exceptions
from apps.permission.curd.curd_perm_label import curd_perm_label


def get_db() -> Generator:
    """
    get SQLAlchemy session to curd
    :return: SQLAlchemy Session
    """
    db = None
    try:
        db = SessionLocal()
        yield db
    finally:
        if db:
            db.close()


def get_db_connect() -> Generator:
    """
    get SQLAlchemy connect
    :return: SQLAlchemy connect
    """
    conn = None
    try:
        conn = engine.connect()
        yield conn
    finally:
        if conn:
            conn.close()


def get_redis(request: Request) -> Optional[Redis]:
    redis = request.app.state.redis
    if redis:
        # if redis := request.app.state.redis:   # python3.8+
        return redis
    return None


def get_email_sender() -> Optional[EmailSender]:
    if not settings.SMTP_HOST:
        return None
    try:
        email_sender = EmailSender(settings.SMTP_HOST, settings.SMTP_USER, settings.SMTP_PASSWORD,
                                   settings.EMAIL_FROM_EMAIL, settings.SMTP_PORT, settings.SMTP_TLS)
        email_sender.template_path = settings.EMAIL_TEMPLATES_DIR
        return email_sender
    except SMTPServerDisconnected:
        return None


async def check_jwt_token(redis: Redis = Depends(get_redis), token: Optional[str] = Header(None)) -> Union[str, Any]:
    """
    只解析验证token
    :param redis:
    :param token:
    :return:
    """
    if not token:
        raise exceptions.UserTokenError()
    if redis:
        uid = await redis.get(constants.REDIS_KEY_LOGIN_TOKEN_KEY_PREFIX + token)
        if not uid:
            raise exceptions.UserTokenError()
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=settings.JWT_ALGORITHM)
        return token_schemas.TokenPayload(**payload)
    except (jwt.JWTError, jwt.ExpiredSignatureError, ValidationError) as e:
        raise exceptions.UserTokenError() from e


async def get_current_user(db: Session = Depends(get_db), token_data=Depends(check_jwt_token)):
    """
    根据header中token 获取当前用户
    :param db:
    :param token_data:
    :return:
    """
    user = curd_user.get(db, _id=token_data.sub)
    if not user:
        raise exceptions.UserTokenError()
    return user


def user_perm(perm_labels: Union[str, Tuple[str], List[str]] = None):
    """
    用户路由权限 (不要和 get_current_user() 共用，以免影响速度)
    :param perm_labels:     权限标识
    :return:
    """
    perm_labels = (perm_labels,) if isinstance(perm_labels, str) else tuple(perm_labels)

    async def check_perm(db: Session = Depends(get_db), redis: Redis = Depends(get_redis),
                         user=Depends(get_current_user), request: Request = None,
                         _excel_name: str = None):
        """
        是否有某权限
        """
        export_label = None
        if settings.AUTO_ADD_PERM_LABEL:
            for label in perm_labels:
                curd_perm_label.create(db, obj_in={'label': label})
            if _excel_name:
                export_label = _excel_name.replace('_', ':') + ':export'
                curd_perm_label.create(db, obj_in={'label': export_label})

        if user['is_superuser']:
            return user
        labels = perm_labels + (export_label,) if export_label else perm_labels
        role_ids = set(await curd_perm_label.getLabelsRoleIds(db, labels=labels, redis=redis))
        if not role_ids:
            raise exceptions.UserPermError()
        user_roles_ids = set([r.id for r in curd_user.getRoles(db, user['id'])])
        if len(role_ids & user_roles_ids) > 0:
            return user
        raise exceptions.UserPermError()

    return check_perm


async def get_ipaddress(request: Request, x_forwarded_for: Optional[str] = Header(None)) -> str:
    """
    获取用户IP
    :param x_forwarded_for:
    :param request:
    """
    return x_forwarded_for.split(",")[0].strip() if x_forwarded_for else request.client.host
