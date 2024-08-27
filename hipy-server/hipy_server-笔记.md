### hipy-server 后端项目    zero termux +ksweb

zero termux 0.118.39
Ubuntu 22.04（LTS）
ksweb 3.988
MYSQL 5.7.34

一、ubuntu 22.04环境下虚拟python3.8开发环境
在Ubuntu 22.04环境下创建一个虚拟的Python 3.8开发环境，你可以使用pyenv来安装和管理不同版本的Python。以下是安装和设置Python 

3.8环境的步骤:<关键是要用梯子否则几乎安装失败>

1、安装依赖项：
 sudo apt update && sudo apt install -y make build-essential libssl-dev zlib1g-dev libbz2-dev libreadline-dev libsqlite3-dev wget curl llvm libncurses5-dev libncursesw5-dev xz-utils tk-dev libffi-dev liblzma-dev git openssl
 
 
2·安装pyenv：

curl https://pyenv.run | bash


3·在shell配置文件中添加pyenv初始化脚本：

echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bashrc
echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(pyenv init --path)"' >> ~/.bashrc
echo 'eval "$(pyenv init -)"' >> ~/.bashrc


4·重新加载shell配置以应用更改：

exec "$SHELL" &&  source ~/.bashrc


5·安装Python 3.8：


pyenv install 3.8.12

6·设置Python 3.8作为全局默认版本：

pyenv global 3.8.12

7·验证Python版本：

python --version

二·使用venv模块来创建和管理虚拟环境。

python -m venv hipyenv && source hipyenv/bin/activate

三·部署hipy-server
1·克隆hipy-server
cd hipyenv && git clone -b main https://github.com/hjdhnx/hipy-server.git && cd hipy-server/app

2·安装依赖
 1> apt-get update && apt-get install -y python3-psycopg2 gcc python3-dev g++ default-jdk supervisor libpq-dev
 
2> pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple && pip install --upgrade pip && pip install --upgrade setuptools && pip install --no-cache-dir -r requirements.txt

 3> pip install click pydantic virtualenv  setuptools
 
 4> pip install --extra-index-url https://nightly.pythonmonkey.io/ --pre pythonmonkey --no-dependencies
 
 5>编辑.env 
 
 cd configs
 
 vi .env
 
 
ECHO_SQL=false
AUTO_ADD_PERM_LABEL=true
PORT=5707
RELOAD=false
LOGIN_WITH_CAPTCHA=false
PROJECT_NAME=HiPy-嗨派
WEB_DOMAIN=https://hipy-ui.vercel.app
SECRET_KEY=DFGG45645674GHFGHFH

SQLALCHEMY_ENGINE=mysql+pymysql
SQL_HOST=127.0.0.1
SQL_PORT=3306
SQL_USERNAME=root
SQL_PASSWORD=123456
SQL_DATABASE=hipy

REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=3

SMTP_HOST=smtp.qq.com
SMTP_USER=john_doe_1996@foxmail.com
SMTP_PASSWORD=ndkhgrgoimyvbhei
EMAIL_FROM_EMAIL=john_doe_1996@foxmail.com

IP_AGENTS=[""]
 
四·安装redis
 
1· wget http://download.redis.io/releases/redis-3.0.6.tar.gz（踩坑：只能在/usr/local下安装）
  
2. tar xzf redis-3.0.6.tar.gz
  
3· cd redis-3.0.6
  
4· make
  
  make之后，在redis-3.0.6/src目录下会出现redis-server服务程序和redis-cli客户端程序。将redis-3.0.6/redis.conf复制到src目录下
5·修改daemoniz no 为 daemoniz  yes
  
  vi redis.conf
  
  daemoniz no   >>  daemoniz  yes
  
6· cp ./redis.conf ./src
  
  启动redis服务端<以后台方式启动>
  
7· cd src
  
8· service  redis-server redis.conf  

 ./redis_init_script  start

  
9·测试:此时打开另一个终端，启动客户端
  ./redis-cli
  测试运行1
  27.0.0.1:6379> set name tom
  OK
  127.0.0.1:6379> get name
  "tom"
  127.0.0.1:6379> 
  安装成功。


9·聚合命令:
wget http://download.redis.io/releases/redis-3.0.6.tar.gz && tar xzf redis-3.0.6.tar.gz && cd redis-3.0.6 && make && cp ./redis.conf ./src && cd src && service  redis-server redis.conf  


五·运行脚本初始化数据库数据

cd /hipy-server/app
python initial_data.py

六·运行hipy-server

python3 main.py



七.日常启动
1·debian

2·exec "$SHELL" && source ~/.bashrc 

3· source hipyenv/bin/activate
4· cd /hipyenv/hipy-server/app/redis-3.0.6/src && ./redis-server redis.conf 
5· cd /hipyenv/hipy-server/app/ && python3 main.py




zero termux配置启动命令
如果在debian里面记得先 exit回到zerotermux里

apt install openssh vim -y
vi ~/.bashrc

echo "用户："$(whoami)

if pgrep -x "sshd" >/dev/null
  then
    echo "sshd运行中..."
  else
    sshd
    echo "自动启动sshd"
fi
:wq
echo "debian" >> ~/.bashrc


退出虚拟环境

deactivate
这条命令会把你带回到全局的Python环境。

### 账号:

| 角色   | 用户名    | 密码       |
|------|--------|----------|
| 管理员  | admin  | admin123 |
| 运维员  | opt    | opt123   |
| 普通用户 | user   | 123456   |
| 道长   | hjdhnx | 123456   |