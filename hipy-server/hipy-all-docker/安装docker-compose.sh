# 手动下载
wget https://ghproxy.liuzhicong.com/https://github.com/docker/compose/releases/download/v2.19.1/docker-compose-linux-x86_64
# 上传文件到root目录，并移动
mv docker-compose-linux-x86_64 /usr/local/bin/docker-compose
# 赋予执行权限
sudo chmod +x /usr/local/bin/docker-compose
# 验证
docker-compose --version