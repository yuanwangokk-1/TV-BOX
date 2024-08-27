#!/bin/bash
echo '全容器一键搭建HIPY项目————本地文件搭建'
echo '本脚本测试环境为X86-ubuntu20.04.6LTS，其他linux环境根据自己环境修改'
sleep 3
echo '删除旧项目'
#rm -rf ./hipy-server
#rm -rf ./hipy-ui
rm -rf ./postgres
rm -rf ./redis_data
docker stop -t=10 hipy-redis
docker stop -t=10 hipy-ui
docker stop -t=10 hipy-pg
docker stop -t=10 hipy-server
docker rm -f hipy-redis
docker rm -f hipy-ui
docker rm -f hipy-pg
docker rm -f hipy-server
sleep 3
echo '创建数据库挂载路径'
mkdir -p postgres/data
mkdir -p redis_data
sleep 3
echo '请手动复制hipy-server、hipy-ui到此目录，脚本会在10秒后继续'
#echo '正在克隆项目,如果404自行替换地址添加代理'
#git clone https://github.com/hjdhnx/hipy-server.git
#sleep 3
#git clone https://github.com/hjdhnx/hipy-ui.git
#echo '克隆项目完成'
sleep 10
echo '开始复制.env文件到工作目录'
cp -Raf .env ./hipy-server/app/configs/
cp -Raf ./hipy-server/app/initial_data.py ./hipy-server/app/tasks
echo '.env复制完成'
sleep 3
echo '开始打包后端文件'
docker build -t hipy-server:hipy .
echo '开始启动所有容器'
sleep 3
docker-compose up -d
sleep 3
echo '开始进行自动打包，如果打包失败，请自行使用node容器打包前端'
echo '此过程较长，务必修改.env.staging内的域名为自己后端的IP或者域名'
echo '确认已经修改，等待10秒后开始执行'
sleep 10
echo '复制已修改的后端API文件'
cp -Raf .env.staging ./hipy-ui/dashboard
sleep 3
echo '复制替换打包脚本防止报错'
cp -Raf package.json  ./hipy-ui/dashboard
sleep 3
echo '创建打包容器'
docker run -itd -v /home/hipy/hipy-ui/dashboard:/home/node -w /home/node --name hipy-node node
docker exec hipy-node npm config set registry https://registry.npmmirror.com
docker exec hipy-node npm i
docker exec hipy-node npm install -g npm@10.5.0
docker exec hipy-node npm i
docker exec hipy-node npm run build:stage
sleep 3
echo '初始化后端容器数据库'
sleep 3
docker exec hipy-server python3 initial_data.py
sleep 3
cd .. && cd ..
echo '停止并删除NODE容器'
docker stop -t=10 hipy-node
sleep 5
docker rm -f hipy-node
echo '重启所有容器'
docker restart $(docker ps -a -q)
echo 'HIPY所有内容均已搭建完成，使用IP：你设置的端口访问前端'
echo '默认前端端口8989，其他端口自行参考docker-compose.yml'
echo '如果需要升级重新执行build.sh，本地更新执行local_build.sh'
echo '感谢道长的HIPY项目'
sleep 3
