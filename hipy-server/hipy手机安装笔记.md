1>安装Python3.8.19依赖
sudo apt update && sudo apt install -y make git curl g++ gcc wget build-essential zlib1g-dev libncurses5-dev libgdbm-dev libnss3-dev libssl-dev libreadline-dev libffi-dev libbz2-dev liblzma-dev sqlite3 libsqlite3-dev tk-dev uuid-dev libgdbm-compat-dev 
libffi-devel

2>下载Python-3.8.19的tar包: wget https://www.python.org/ftp/python/3.8.12/Python-3.8.12.tar.xz

3>解压: tar -xvJf Python-3.8.12.tar.xz

4>切换目录: cd Python-3.8.12

5>生成makefile文件: ./configure

6>编译: make -j6 

7> 强制安装(降级）make install (共存安装:make altinstall）

8>安装完成重启，验证python3 --version

如果编译过程有报错信息:To find the necessary bits, look in setup.py in detect_modules() for the module's name.
安装 Python 3.9 Failed to build these modules: _ctypes 

就重新安装以下依赖

安装libffi-devel

再次make




sudo apt update && sudo apt install -y  build-essential libssl-dev zlib1g-dev libpq-dev libbz2-dev libreadline-dev libsqlite3-dev  llvm libncurses5-dev libncursesw5-dev xz-utils tk-dev libffi-dev liblzma-dev python3-openssl python3-psycopg2 python3-dev default-jdk supervisor fonts-liberation libcurl3-gnutls libcurl3-nss libcurl4 libgbm1 libgtk-3-0 libgtk-4-1 libwayland-client0 libwayland-client0 libxkbcommon0 xdg-utils


设置pip源，可选

清华(近期清华源pip经常出错)
apt install python3-pip -y
python3 -m pip  install --upgrade pip -i https://pypi.tuna.tsinghua.edu.cn/simple
pip3 config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple

阿里(首选阿里或者腾讯)


8> pip config set global.index-url https://mirrors.aliyun.com/pypi/simple && pip install --upgrade pip && pip install --upgrade setuptools
 
 

cat ~/.pip/pip.conf

[global]
index-url = https://mirrors.aliyun.com/pypi/simple/

# 检查pip源

pip3 config list


 pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple && pip install --upgrade pip && pip install --upgrade setuptools 
 

9>  pip install -r requirements.txt && pip install click pydantic virtualenv



10> playwright install chromium

11>apt install tmux






用pip3安装虚拟环境组件virtualenv

pip3 install virtualenv

为 hipy-server 项目单独创建 python3 虚拟环境。

python3 -m venv hipyenv

source /hipyenv/bin/activate && source /hipyenv/bin/activate 


退出环境变量的命令是deactivate



Exception in callback BaseSelectorEventLoop._accept_connection(<function sta... 0x75355c0790>, <socket.socke...1.100', 2699)>, None, <Server socke...00', 2699)>,)>, 100, None)                    handle: <Handle BaseSelectorEventLoop._accept_connection(<function sta... 0x75355c0790>, <socket.socke...1.100', 2699)>, None, <Server socke...00', 2699)>,)>, 100, None)>                         Traceback (most recent call last):                                 File "/usr/local/lib/python3.8/asyncio/events.py", line 81, in _run                                                                 self._context.run(self._callback, *self._args)                 File "/usr/local/lib/python3.8/asyncio/selector_events.py", line 164, in _accept_connection                                         conn, addr = sock.accept()
  File "/usr/local/lib/python3.8/socket.py", line 292, in accept     fd, addr = self._accept()                                    OSError: [Errno 22] Invalid argument



https://spacevision.blog.csdn.net/article/details/86518446?spm=1001.2101.3001.6650.6&utm_medium=distribute.wap_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-6-86518446-blog-9004653.237%5Ev3%5Ewap_relevant_t0_download&depth_1-utm_source=distribute.wap_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-6-86518446-blog-9004653.237%5Ev3%5Ewap_relevant_t0_download


https://blog.csdn.net/Jerry00713/article/details/127380845?spm=1001.2101.3001.6650.10&utm_medium=distribute.wap_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-10-127380845-blog-9004653.237%5Ev3%5Ewap_relevant_t0_download&depth_1-utm_source=distribute.wap_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-10-127380845-blog-9004653.237%5Ev3%5Ewap_relevant_t0_download







