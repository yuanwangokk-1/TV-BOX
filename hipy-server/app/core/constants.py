from datetime import timedelta
import os

BASE_DIR = os.path.abspath(os.path.join(os.path.abspath(os.path.dirname(__file__)), '..'))
DEFAULT_ENV_FILE = os.path.abspath(os.path.join(BASE_DIR,
                                                "./configs/.env"))  # default env file path: './configs/.env' when run "python main.py", you can change in this if you want

# 登录状态自动过期
ACCESS_TOKEN_EXPIRE_MINUTES = 300
REGISTER_TOKEN_EXPIRE_HOURS = 24
USER_CAPTCHA_CODE_EXPIRE_MINUTES = 15
USER_REGISTER_SUBMIT_NUM_LIMIT = 5
USER_REGISTER_SUBMIT_EXPIRE_MINUTES = 5
FORGET_PWD_TOKEN_EXPIRE_HOURS = 24
USER_FORGET_PWD_SUBMIT_NUM_LIMIT = 2
USER_FORGET_PWD_SUBMIT_EXPIRE_MINUTES = 5
USER_PERM_LABEL_CACHE_EXPIRE_MINUTES = 3

# CELERY_PRINT_DATETIME = timedelta(seconds=10)

REDIS_KEY_LOGIN_TOKEN_KEY_PREFIX = "user_login_token_"
REDIS_KEY_REGISTER_TOKEN_KEY_PREFIX = "user_register_token_"
REDIS_KEY_FORGET_PWD_TOKEN_KEY_PREFIX = "user_forget_pwd_token_"
REDIS_KEY_USER_CAPTCHA_CODE_KEY_PREFIX = "user_captcha_code_"
REDIS_KEY_USER_REGISTER_NUM_OF_TIME = "user_register_time_num_IP_"
REDIS_KEY_USER_FORGET_PWD_NUM_OF_TIME = "user_forget_pwd_time_num_EMAIL_"
REDIS_KEY_USER_PERM_LABEL_CACHE = "user_perm_label_cache_"

MEDIA_BASE_PATH = os.path.join(BASE_DIR, 'media/')
MEDIA_AVATAR_BASE_DIR = "images/avatar/"
MEDIA_EXCEL_BASE_DIR = "xlsx/"
