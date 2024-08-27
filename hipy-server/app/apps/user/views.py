import os
from datetime import timedelta
import json
from typing import Any, Optional

try:
    from redis.asyncio import Redis
except ImportError:
    from aioredis import Redis

from fastapi import APIRouter, Depends, Header, Request, UploadFile, HTTPException
from sqlalchemy.orm import Session
from utils.captcha_code import create_base64_code
from utils.email import EmailSender
from utils.encrypt import get_uuid

from apps.permission.models.user import Users

from apps.monitor.curd.curd_logininfor import curd_logininfor
from common import error_code, deps, security

from common.resp import respSuccessJson, respErrorJson
from core import constants
from core.config import settings
from .schemas import user_info_schemas
from .curd.curd_user import curd_user
from ..permission.curd.curd_perm_label import curd_perm_label
from ..system.curd.curd_config_setting import curd_config_setting
import user_agents

# from apps.system.models import ConfigSettings


router = APIRouter()


@router.post("/login", summary="用户登录")
async def login(*,
                db: Session = Depends(deps.get_db),
                redis: Redis = Depends(deps.get_redis),
                client_ip: str = Depends(deps.get_ipaddress),
                user_info: user_info_schemas.LoginUserInfoSchema,
                req: Request
                ):
    ip = client_ip or req.client.host
    user_agent = user_agents.parse(req.headers["User-Agent"])
    ubrowser = user_agent.browser.family + ' ' + user_agent.browser.version_string
    uos = user_agent.os.family + ' ' + user_agent.os.version_string
    umodel = user_agent.device.model
    obj_in = {'user_name': user_info.user, 'ipaddr': ip, 'browser': ubrowser, 'status': '1', 'os': uos}
    # configs = db.query(ConfigSettings.value).filter(
    #     ConfigSettings.key == 'login_with_captcha', ConfigSettings.is_deleted == 0, ConfigSettings.status == 0
    # ).first()
    configs = curd_config_setting.getByKey(db, key='login_with_captcha')
    log_captcha_error = curd_config_setting.getByKey(db, key='log_captcha_error').get('value')
    if configs and configs.get('value') == 'yes':
        code = await redis.get(f"{constants.REDIS_KEY_USER_CAPTCHA_CODE_KEY_PREFIX}_{user_info.key}")  # type: bytes
        if not code:
            obj_in.update({'msg': error_code.ERROR_USER_CAPTCHA_CODE_INVALID.msg})
            if log_captcha_error:
                curd_logininfor.create(db, obj_in=obj_in)
            return respErrorJson(error=error_code.ERROR_USER_CAPTCHA_CODE_INVALID)  # 验证码失效
        elif code.decode('utf-8').lower() != user_info.code.lower():
            obj_in.update({'msg': error_code.ERROR_USER_CAPTCHA_CODE_ERROR.msg})
            if log_captcha_error:
                curd_logininfor.create(db, obj_in=obj_in)
            return respErrorJson(error=error_code.ERROR_USER_CAPTCHA_CODE_ERROR)  # 验证码错误
    user = curd_user.authenticate(db, user=user_info.user, password=user_info.password)

    if not user:
        obj_in.update({'msg': error_code.ERROR_USER_PASSWORD_ERROR.msg})
        curd_logininfor.create(db, obj_in=obj_in)
        return respErrorJson(error=error_code.ERROR_USER_PASSWORD_ERROR)
    elif not user.is_active:
        obj_in.update({'msg': error_code.ERROR_USER_NOT_ACTIVATE.msg})
        curd_logininfor.create(db, obj_in=obj_in)
        return respErrorJson(error=error_code.ERROR_USER_NOT_ACTIVATE)
    access_token_expires = timedelta(minutes=constants.ACCESS_TOKEN_EXPIRE_MINUTES)
    # 登录token 只存放了user.id
    token = security.create_access_token(user.id, expires_delta=access_token_expires)
    await redis.setex(constants.REDIS_KEY_LOGIN_TOKEN_KEY_PREFIX + token,
                      timedelta(minutes=constants.ACCESS_TOKEN_EXPIRE_MINUTES),
                      user.id)

    # hash表没法单独对里面的键值设置过期
    # await redis.hset(constants.REDIS_KEY_LOGIN_TOKEN_KEY_PREFIX, token, user.id)
    # await redis.expire(constants.REDIS_KEY_LOGIN_TOKEN_KEY_PREFIX,timedelta(minutes=constants.ACCESS_TOKEN_EXPIRE_MINUTES))
    # remain_time = await redis.ttl(constants.REDIS_KEY_LOGIN_TOKEN_KEY_PREFIX)
    # print('constants.REDIS_KEY_LOGIN_TOKEN_KEY_PREFIX',remain_time)
    obj_in.update({'msg': '登录成功', 'status': '0'})
    curd_logininfor.create(db, obj_in=obj_in)
    return respSuccessJson(data={"token": token})


@router.post('/logout', summary="退出登录")
async def logout(*,
                 token_data: str = Depends(deps.check_jwt_token),
                 redis: Redis = Depends(deps.get_redis),
                 token: Optional[str] = Header(None)
                 ):
    await redis.delete(constants.REDIS_KEY_LOGIN_TOKEN_KEY_PREFIX + token)
    return respSuccessJson()


@router.post("/check/{col}/availability", summary="查询用户信息可用性")
async def checkUserAvailability(*,
                                col: str,
                                db: Session = Depends(deps.get_db),
                                obj: user_info_schemas.UserAvailabilitySchema
                                ):
    if col == "name":
        availability = curd_user.checkUsernameAvailability(db, username=obj.data, exclude_id=obj.exclude_user_id)
        return respSuccessJson({'availability': availability, 'alter': "" if availability else "用户名已被使用"})
    elif col == "email":
        availability = curd_user.checkEmailAvailability(db, email=obj.data, exclude_id=obj.exclude_user_id)
        return respSuccessJson({'availability': availability, 'alter': "" if availability else "邮箱已被使用"})
    elif col == "phone":
        availability = curd_user.checkPhoneAvailability(db, phone=obj.data, exclude_id=obj.exclude_user_id)
        return respSuccessJson({'availability': availability, 'alter': "" if availability else "手机号已被使用"})
    else:
        raise HTTPException(status_code=404, detail="url not found")


@router.get("/info", summary="获取用户自己的资料")
async def getUserInfo(*,
                      db: Session = Depends(deps.get_db),
                      u: Users = Depends(deps.get_current_user)
                      ):
    roles = [(role.id, role.name, role.key) for role in curd_user.getRoles(db, u['id'])]
    roles_id, roles_name, roles_key = zip(*roles)
    permissions = curd_perm_label.getLabelsByRolesID(db, roles_id)
    return respSuccessJson(data={
        'email': u['email'],
        'phone': u['phone'],
        'username': u['username'],
        'nickname': u['nickname'],
        'avatar': u['avatar'].rstrip('.') if u['avatar'] else None,
        'sex': u['sex'],
        'roles_name': roles_name,
        'roles': roles_key if not u['is_superuser'] else (roles + ['admin']),
        'permissions': permissions if not u['is_superuser'] else (permissions + ['*:*:*']),
    })


@router.put("/info", summary="修改个人信息")
async def changeUserInfo(*,
                         db: Session = Depends(deps.get_db),
                         token_data=Depends(deps.check_jwt_token),
                         obj: user_info_schemas.ChangeUserInfoSchema
                         ):
    user_id = token_data.sub
    user_exist = curd_user.isExistUserName(db, _id=user_id, username=obj.username)
    if user_exist:
        return respErrorJson(error=error_code.ERROR_USER_EXIST.set_msg(f'已存在相同的用户名:{obj.username}'))
    else:
        curd_user.update(db, _id=user_id, obj_in=obj, modifier_id=user_id)
    return respSuccessJson()


@router.put("/password", summary="修改密码")
def changePassword(*,
                   db: Session = Depends(deps.get_db),
                   token_data=Depends(deps.check_jwt_token),
                   obj: user_info_schemas.ChangePasswordSchema
                   ):
    user_id = token_data.sub
    if not curd_user.checkPwd(db, _id=user_id, pwd=obj.old_password):
        return respErrorJson(error=error_code.ERROR_USER_PASSWORD_ERROR)
    curd_user.changePwd(db, _id=user_id, pwd=obj.new_password)
    return respSuccessJson()


@router.post("/register", summary="用户注册")
async def submitRegister(*,
                         db: Session = Depends(deps.get_db),
                         redis: Redis = Depends(deps.get_redis),
                         client_ip: str = Depends(deps.get_ipaddress),
                         email: EmailSender = Depends(deps.get_email_sender),
                         register_data: user_info_schemas.RegisterUserInfoSchema
                         ):
    # 验证验证码
    code = await redis.get(f"{constants.REDIS_KEY_USER_CAPTCHA_CODE_KEY_PREFIX}_{register_data.key}")  # type: bytes
    if not code:
        return respErrorJson(error=error_code.ERROR_USER_CAPTCHA_CODE_INVALID)  # 验证码失效
    elif code.decode('utf-8').lower() != register_data.code.lower():
        return respErrorJson(error=error_code.ERROR_USER_CAPTCHA_CODE_ERROR)  # 验证码错误
    # 验证信息是否已被使用
    if curd_user.getByUsername(db, username=register_data.username):
        return respErrorJson(error=error_code.ERROR_USER_USERNAME_EXISTS)
    if curd_user.getByPhone(db, phone=register_data.phone):
        return respErrorJson(error=error_code.ERROR_USER_PHONE_EXISTS)
    if curd_user.getByEmail(db, email=register_data.email):
        return respErrorJson(error=error_code.ERROR_USER_EMAIL_EXISTS)
    # 为防止操作过于频繁邮件发送过多
    time_num = await redis.get(f"{constants.REDIS_KEY_USER_REGISTER_NUM_OF_TIME}_{client_ip}")  # type: bytes
    if time_num and int(time_num.decode('utf-8')) > constants.USER_REGISTER_SUBMIT_NUM_LIMIT:
        return respErrorJson(error=error_code.ERROR_USER_REGISTER_TO_OFTEN)
    else:
        await redis.incr(f"{constants.REDIS_KEY_USER_REGISTER_NUM_OF_TIME}_{client_ip}")
        await redis.expire(f"{constants.REDIS_KEY_USER_REGISTER_NUM_OF_TIME}_{client_ip}",
                           timedelta(minutes=constants.USER_REGISTER_SUBMIT_EXPIRE_MINUTES))
    user_data = {
        'username': register_data.username,
        'nickname': register_data.nickname or "",
        'sex': register_data.sex or 0,
        'phone': register_data.phone,
        'email': register_data.email,
        'password': register_data.password,
        'avatar': register_data.avatar,
        'is_active': True,
    }
    if not redis or not email:  # 没有redis 或 没有邮箱服务时 直接注册成功
        return respSuccessJson() if curd_user.create(db, obj_in=user_data) \
            else respErrorJson(error=error_code.ERROR_USER_REGISTER_EXISTS)
    uuid = get_uuid()
    await redis.setex(constants.REDIS_KEY_REGISTER_TOKEN_KEY_PREFIX + uuid,
                      timedelta(days=constants.REGISTER_TOKEN_EXPIRE_HOURS),
                      json.dumps(user_data))
    email_data = {'url': f"{settings.WEB_DOMAIN}/register-verify/{uuid}"}
    email_title = "注册验证邮件"
    email.send(user_data['email'], email_title, "register", email_data)
    return respSuccessJson()


@router.get("/register/{register_token}", summary="验证注册的token")
async def verifyRegister(*,
                         register_token: str,
                         redis: Redis = Depends(deps.get_redis)
                         ):
    user_data = await redis.get(constants.REDIS_KEY_REGISTER_TOKEN_KEY_PREFIX + register_token)
    if not user_data:
        err = error_code.ERROR_USER_REGISTER_TOKEN_ERROR
        return respSuccessJson({'code': err.code, 'msg': err.msg})
    user_data = json.loads(user_data.decode('utf-8'))
    return respSuccessJson({'code': 0, 'data': {'username': user_data['username'], 'email': user_data['email']}})


@router.put("/register/{register_token}", summary="提交确认注册")
async def confirmRegister(*,
                          register_token: str,
                          db: Session = Depends(deps.get_db),
                          redis: Redis = Depends(deps.get_redis)
                          ):
    user_data = await redis.get(constants.REDIS_KEY_REGISTER_TOKEN_KEY_PREFIX + register_token)
    if not user_data:
        err = error_code.ERROR_USER_REGISTER_TOKEN_ERROR
        return respSuccessJson({'code': err.code, 'msg': err.msg})
    user_data = json.loads(user_data.decode('utf-8'))
    if not curd_user.create(db, obj_in=user_data):
        err = error_code.ERROR_USER_REGISTER_EXISTS
        return respSuccessJson({'code': err.code, 'msg': err.msg})
    await redis.delete(constants.REDIS_KEY_REGISTER_TOKEN_KEY_PREFIX + register_token)
    return respSuccessJson({'code': 0})


@router.post("/forget-password", summary="提交忘记密码")
async def submitForgetPassword(*,
                               db: Session = Depends(deps.get_db),
                               email: EmailSender = Depends(deps.get_email_sender),
                               redis: Redis = Depends(deps.get_redis),
                               obj: user_info_schemas.ForgetPasswordSubmitSchema
                               ):
    # 为防止操作过于频繁邮件发送过多
    time_num = await redis.get(f"{constants.REDIS_KEY_USER_FORGET_PWD_NUM_OF_TIME}_{obj.email}")  # type: bytes
    if time_num and int(time_num.decode('utf-8')) > constants.USER_FORGET_PWD_SUBMIT_NUM_LIMIT:
        return respErrorJson(error=error_code.ERROR_USER_REGISTER_TO_OFTEN)
    else:
        await redis.incr(f"{constants.REDIS_KEY_USER_FORGET_PWD_NUM_OF_TIME}_{obj.email}")
        await redis.expire(f"{constants.REDIS_KEY_USER_FORGET_PWD_NUM_OF_TIME}_{obj.email}",
                           timedelta(minutes=constants.USER_FORGET_PWD_SUBMIT_EXPIRE_MINUTES))
    # 验证验证码
    code = await redis.get(f"{constants.REDIS_KEY_USER_CAPTCHA_CODE_KEY_PREFIX}_{obj.key}")  # type: bytes
    if not code:
        return respErrorJson(error=error_code.ERROR_USER_CAPTCHA_CODE_INVALID)  # 验证码失效
    elif code.decode('utf-8').lower() != obj.code.lower():
        return respErrorJson(error=error_code.ERROR_USER_CAPTCHA_CODE_ERROR)  # 验证码错误
    uuid = get_uuid()
    u = curd_user.getByEmail(db, email=obj.email)
    if not u:
        return respErrorJson(error=error_code.ERROR_USER_EMAIL_NOT_EXISTS)
    await redis.setex(constants.REDIS_KEY_FORGET_PWD_TOKEN_KEY_PREFIX + uuid,
                      timedelta(minutes=constants.FORGET_PWD_TOKEN_EXPIRE_HOURS),
                      json.dumps({'id': u.id, 'email': u.email, 'username': u.username}))
    email_data = {'url': f"{settings.WEB_DOMAIN}/forget-password/set-password/{uuid}"}
    email_title = "重新设置密码"
    email.send(obj.email, email_title, "forget-password", email_data)
    return respSuccessJson()


@router.put("/forget-password/{verify_token}", summary="提交忘记密码的新密码")
async def setForgetPassword(*,
                            verify_token: str,
                            db: Session = Depends(deps.get_db),
                            redis: Redis = Depends(deps.get_redis),
                            obj: user_info_schemas.ForgetPasswordSetPasswordSchema
                            ):
    code = await redis.get(f"{constants.REDIS_KEY_USER_CAPTCHA_CODE_KEY_PREFIX}_{obj.key}")  # type: bytes
    if not code:
        return respErrorJson(error=error_code.ERROR_USER_CAPTCHA_CODE_INVALID)  # 验证码失效
    elif code.decode('utf-8').lower() != obj.code.lower():
        return respErrorJson(error=error_code.ERROR_USER_CAPTCHA_CODE_ERROR)  # 验证码错误
    u = await redis.get(constants.REDIS_KEY_FORGET_PWD_TOKEN_KEY_PREFIX + verify_token)
    if not u:
        return respErrorJson(error=error_code.ERROR_FORGET_PWD_TOKEN_ERROR)
    u = json.loads(u.decode('utf-8'))
    curd_user.changePwd(db, _id=u['id'], pwd=obj.password)
    await redis.delete(constants.REDIS_KEY_FORGET_PWD_TOKEN_KEY_PREFIX + verify_token)
    return respSuccessJson()


@router.get("/forget-password/{verify_token}", summary="验证忘记密码的token")
async def verifyForgetPassword(*,
                               verify_token: str,
                               redis: Redis = Depends(deps.get_redis)
                               ):
    u = await redis.get(constants.REDIS_KEY_FORGET_PWD_TOKEN_KEY_PREFIX + verify_token)
    if not u:
        err = error_code.ERROR_FORGET_PWD_TOKEN_ERROR
        return respSuccessJson({'code': err.code, 'msg': err.msg})
    u = json.loads(u.decode('utf-8'))
    return respSuccessJson({'code': 0, 'data': {'username': u['username'], 'email': u['email']}})


@router.get("/routers", summary="获取用户路由菜单")
async def getUserRouters(*,
                         db: Session = Depends(deps.get_db),
                         u: Users = Depends(deps.get_current_user)
                         ):
    menus = curd_user.getMenus(db, _id=None if u['is_superuser'] else u['id'])
    return respSuccessJson({'menus': menus})


@router.get("/routers-tree", summary="获取用户路由树状菜单")
async def getUserRouters(*,
                         db: Session = Depends(deps.get_db),
                         u: Users = Depends(deps.get_current_user)
                         ):
    menus = curd_user.getMenusTree(db, _id=None if u['is_superuser'] else u['id'])
    return respSuccessJson({'menus': menus})


@router.post("/avatar", summary="改变头像")
async def changeAvatar(*,
                       db: Session = Depends(deps.get_db),
                       token_data=Depends(deps.check_jwt_token),
                       img: UploadFile
                       ):
    user_id = token_data.sub
    img_data = img.file.read()
    img_name = img.filename  # type: str
    new_img_name = f"{get_uuid()}.{img_name.split('.')[-1]}"
    path = constants.MEDIA_AVATAR_BASE_DIR + new_img_name
    with open(os.path.join(constants.MEDIA_BASE_PATH, path), 'wb') as f:
        f.write(img_data)
    curd_user.setAvatar(db, _id=user_id, avatar_path=path, modifier_id=user_id)
    return respSuccessJson({'avatar': path})


@router.get("/captcha-code", summary="获取登录、注册、忘记密码时候时候的验证码")
async def getCaptchaCode(*,
                         redis: Redis = Depends(deps.get_redis)
                         ):
    img, code = create_base64_code(k=4, img_width=150)
    key = get_uuid()
    await redis.setex(f"{constants.REDIS_KEY_USER_CAPTCHA_CODE_KEY_PREFIX}_{key}",
                      timedelta(minutes=constants.USER_CAPTCHA_CODE_EXPIRE_MINUTES),
                      code)
    return respSuccessJson({'key': key, 'img': img})
