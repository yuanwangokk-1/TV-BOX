### linux系统安装selenium-需要python3.8环境

sniffer.py
```shell
apt update
# apt install libxss1 libappindicator1 libindicator7  # 安装软件依赖
# wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb  # 下载最新版chrome
# dpkg -i google-chrome-stable_current_amd64.deb
# apt-get install -f
# 如果提示缺少某些依赖无法安装，可以试一下 apt install -f
google-chrome --version  # 查看当前chrome版本 123.0.6312 太新了没区别
# 104 有驱动
# https://vikyd.github.io/download-chromium-history-version/#/
# https://www.slimjet.com/chrome/google-chrome-old-version.php
wget -O google-chrome-104.deb -c https://www.slimjet.com/chrome/download-chrome.php?file=files%2F104.0.5112.102%2Fgoogle-chrome-stable_current_amd64.deb
dpkg -i google-chrome-104.deb
# dpkg -i google-chrome-stable_current_amd64.deb
apt install -f
dpkg -i google-chrome-104.deb
```
snifferPro.py
```shell
apt update
wget -O google-chrome-104.deb -c https://www.slimjet.com/chrome/download-chrome.php?file=files%2F104.0.5112.102%2Fgoogle-chrome-stable_current_amd64.deb
dpkg -i google-chrome-104.deb
apt install -f
dpkg -i google-chrome-104.deb
google-chrome --version
```
sniffer2.py
```shell
docker pull selenium/standalone-chrome-debug
docker run -tid --name chrome-debug -h chrome-debug --memory 1g --memory-swap -1 -p 9516:4444 -p 31527:5900 selenium/standalone-chrome-debug
```