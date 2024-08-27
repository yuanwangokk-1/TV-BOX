from socket import MsgFlag
from pydantic import BaseModel


class ErrorBase(BaseModel):
    code: int
    msg: str = ""

    def set_msg(self, msg):
        self.msg = msg
        return self


# 报错
ERROR_INTERNAL = ErrorBase(code=500, msg="内部错误")
# 找不到路径
ERROR_NOT_FOUND = ErrorBase(code=404, msg="api 路径错误")
# 参数错误
ERROR_PARAMETER_ERROR = ErrorBase(code=400, msg="参数错误")

# 用户相关
ERROR_USER_TOKEN_FAILURE = ErrorBase(code=5004, msg="未登录或登录过期")
ERROR_USER_NOT_FOUND = ErrorBase(code=5004, msg="用户不存在")
ERROR_USER_PASSWORD_ERROR = ErrorBase(code=5005, msg="密码错误")
ERROR_USER_NOT_ACTIVATE = ErrorBase(code=5006, msg="用户账号尚未激活")
ERROR_USER_EXIST = ErrorBase(code=5006, msg="已存在相同的用户名")
ERROR_USER_ACCOUNT_EXISTS = ErrorBase(code=5007, msg="账号已存在")
ERROR_USER_EMAIL_NOT_EXISTS = ErrorBase(code=5008, msg="邮箱不存在")
ERROR_FORGET_PWD_TOKEN_ERROR = ErrorBase(code=5009, msg="重置密码链接错误或已过期")
ERROR_USER_REGISTER_TOKEN_ERROR = ErrorBase(code=5031, msg="注册验证链接已过期或不存在")
ERROR_USER_REGISTER_EXISTS = ErrorBase(code=5032, msg="注册失败，可能账号已存在。")
ERROR_USER_REGISTER_ERROR = ErrorBase(code=5033, msg="注册失败，请重试。")
ERROR_USER_REGISTER_TO_OFTEN = ErrorBase(code=5034, msg="提交注册太频繁，请稍后重试")
ERROR_USER_EMAIL_EXISTS = ErrorBase(code=5011, msg="邮箱不可用")
ERROR_USER_PHONE_EXISTS = ErrorBase(code=5012, msg="手机号码不可用")
ERROR_USER_USERNAME_EXISTS = ErrorBase(code=5013, msg="用户名不可用")
ERROR_USER_CAPTCHA_CODE_ERROR = ErrorBase(code=5021, msg="验证码错误")
ERROR_USER_CAPTCHA_CODE_INVALID = ErrorBase(code=5022, msg="验证码已失效，请重试。")
ERROR_USER_PREM_ADD_ERROR = ErrorBase(code=5031, msg="权限标识添加失败")
ERROR_USER_PREM_ERROR = ErrorBase(code=5403, msg="权限不足")

ERROR_HIKER_RULE_TYPE_ADD_ERROR = ErrorBase(code=5101, msg="规则类型添加失败，可能是名称重复")
ERROR_HIKER_DEVELOPER_ADD_ERROR = ErrorBase(code=5102, msg="开发者添加失败，可能是qq重复")
ERROR_DATABASE_AUTH_ERROR = ErrorBase(code=5200, msg="数据库升级执行码错误")
ERROR_DATABASE_CMD_ERROR = ErrorBase(code=5201, msg="数据库升级脚本执行错误")

ERROR_TASK_NOT_FOUND = ErrorBase(code=4004, msg="任务未找到")
ERROR_TASK_INVALID = ErrorBase(code=4005, msg="定时任务执行异常")
ERROR_TASK_ADD_ERROR = ErrorBase(code=4006, msg="定时任务添加失败，可能是job_id重复")

ERROR_PIP_ADD_ERROR = ErrorBase(code=5006, msg="依赖安装失败")
ERROR_PIP_ADD_EXIST_ERROR = ErrorBase(code=5007, msg="依赖安装失败,已经安装过此依赖")
