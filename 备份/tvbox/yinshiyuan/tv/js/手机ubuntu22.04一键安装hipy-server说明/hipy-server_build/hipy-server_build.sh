#!/bin/bash
echo '手机zerotermux——chroot一键搭建HIPY项目————在线搭建'
echo '本脚本测试环境为X86-ubuntu22.04.6LTS，其他linux环境根据自己环境修改'
sleep 3
echo '准备安装环境'
echo $(date +%Y-%m-%d\ %H:%M:%S)
rm -rf /hipyenv
rm -rf root/.pyenv
mkdir /hipyenv
echo '拷贝redis项目'
cp -Raf redis-3.0.6 /hipyenv
sleep 3
echo '克隆hipy-server'
echo $(date +%Y-%m-%d\ %H:%M:%S)
cd /hipyenv && git clone https://github.com/hjdhnx/hipy-server.git 
echo $(date +%Y-%m-%d\ %H:%M:%S)
echo '拷贝hipy-server数据库环境'
cp -Raf /sd/pywork/hipy-server_build/.env /hipyenv/hipy-server/app/configs
echo '拷贝python3.8.12环境'
cp -Raf /sd/pywork/hipy-server_build/.bashrc2 ~/.bashrc
echo '开始安装虚拟python3.8.12开发环境'
echo '安装依赖项：'
echo $(date +%Y-%m-%d\ %H:%M:%S)
cd /
sudo apt update && sudo apt install -y make build-essential libssl-dev zlib1g-dev libbz2-dev libreadline-dev libsqlite3-dev wget curl llvm libncurses5-dev libncursesw5-dev xz-utils tk-dev libffi-dev liblzma-dev git openssl
echo $(date +%Y-%m-%d\ %H:%M:%S)
echo '安装pyenv：'
rm -rf root/.pyenv
curl https://pyenv.run | bash
echo 'pyenv安装成功'
echo $(date +%Y-%m-%d\ %H:%M:%S)
sleep 10
echo '在shell配置文件中添加pyenv初始化'
sleep 10
source ~/.bashrc
echo '开始安装Python 3.8.12'
echo '请开梯子大约需要6-8分钟'
echo $(date +%Y-%m-%d\ %H:%M:%S)
pyenv install 3.8.12
echo 'Python 3.8.12安装成功'
echo $(date +%Y-%m-%d\ %H:%M:%S)
echo '设置Python 3.8.12作为全局默认版本：'
pyenv global 3.8.12
echo '验证Python版本：'
python --version
echo 'python版本3.8.12成功'
sleep 5
source ~/.bashrc
python3 --version
echo 'python3版本3.8.12成功'
echo 'python3.8.12安装完成'
echo $(date +%Y-%m-%d\ %H:%M:%S)
sleep 5
cp -Raf /sd/pywork/hipy-server_build/.bashrc3 ~/.bashrc
echo '使用venv模块来创建和管理虚拟环境。'
echo $(date +%Y-%m-%d\ %H:%M:%S)
python -m venv hipyenv && source hipyenv/bin/activate
echo 'venv安装成功'
sleep 5
echo '部署hipy-server'
echo $(date +%Y-%m-%d\ %H:%M:%S)
cd /hipyenv/hipy-server/app
echo '安装hipy-server依赖'
apt-get update && apt-get install -y python3-psycopg2 gcc python3-dev g++ default-jdk supervisor libpq-dev
echo $(date +%Y-%m-%d\ %H:%M:%S)
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple && pip install --upgrade pip && pip install --upgrade setuptools && pip install --no-cache-dir -r requirements.txt
echo $(date +%Y-%m-%d\ %H:%M:%S)
pip install click pydantic virtualenv  setuptools
echo $(date +%Y-%m-%d\ %H:%M:%S)
 #pip install --extra-index-url https://nightly.pythonmonkey.io/ --pre pythonmonkey --no-dependencies
sleep 5
echo '安装redis'
echo $(date +%Y-%m-%d\ %H:%M:%S)
cd /hipyenv/redis-3.0.6/src
chmod +x redis-server
echo 'redis安装成功'
echo '启动redis'
./redis-rever redis.conf
echo 'redis启动成功'
echo $(date +%Y-%m-%d\ %H:%M:%S)
echo '运行脚本初始化数据库数据'
cd /hipyenv/hipy-server/app
python3 initial_data.py
exit
sleep 5
exit
sleep 5
cp -Raf ~/storage/downloads/pywork/hipy-server_build/.bashrc .