FROM python:3.8-slim
# 添加描述信息
MAINTAINER hipy-server
WORKDIR /home/hipy_server/app
COPY ./hipy-server/app .
RUN sed -i 's/deb.debian.org/mirrors.ustc.edu.cn/g' /etc/apt/sources.list.d/debian.sources
RUN apt-get update && apt-get install -y python3-psycopg2 gcc python3-dev g++ default-jdk supervisor libpq-dev wget fonts-liberation libcurl3-gnutls libcurl3-nss libcurl4 libgbm1 libgtk-3-0 libgtk-4-1 libwayland-client0 libwayland-client0 libxkbcommon0 xdg-utils && wget -O google-chrome-104.deb -c https://www.slimjet.com/chrome/download-chrome.php?file=files%2F104.0.5112.102%2Fgoogle-chrome-stable_current_amd64.deb && dpkg -i google-chrome-104.deb && apt install -f && dpkg -i google-chrome-104.deb
RUN pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple && pip install --upgrade pip && pip install --upgrade setuptools && pip install --no-cache-dir -r /home/hipy_server/app/requirements.txt && pip install click pydantic virtualenv
# 切换容器时区
# RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo 'Asia/Shanghai' >/etc/timezone
# 设置语言支持中文打印
ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8

CMD ["python3", "./main.py"]
