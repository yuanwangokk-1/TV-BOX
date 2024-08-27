#!/bin/bash
set -o errexit
echo 'hipy日常更新'
echo '本脚本测试环境为 wsl2-ubuntu22.04.3（LTS），其他linux环境根据自'
echo '脚本自动备份hipy-server、hipy-ui'
echo '如果脚本执行报错需要还原，请执行以下两条命令'
echo 'rm -rf ./hipy-ui && mv ./bak/hipy-ui-bak ./hipy-ui'
echo 'rm -rf ./hipy-server && mv ./bak/hipy-server-bak ./hipy-server'
echo '还原两个源码目录'
echo '清理旧数据库，并创建备份'
mkdir -p ./bak
mv ./hipy-ui ./bak/hipy-ui-bak
cp -Raf ./hipy-server ./bak/hipy-server-bak
rm -rf ./postgres
mkdir -p postgres/data
echo '开始从道长仓库更新 hipy-server 代码'
cd ./hipy-server
sleep 3
git reset --hard
git pull --force origin master:master
sleep 3
cd ..
rsync -av ./bak/hipy-server-bak/app/t4/files/txt ./hipy-server/app/t4/files
echo '开始从道长仓库更新 hipy-ui 代码'
git clone https://github.com/hjdhnx/hipy-ui.git
sleep 3
echo '复制替换打包脚本防止报错'
cp -Raf package.json  ./hipy-ui/dashboard
cp -Raf .env.staging ./hipy-ui/dashboard
echo '复制node依赖到源码目录，因逻辑改变，此处需要较长时间，请耐心等待。。。'
cp -Raf  ./bak/hipy-ui-bak/dashboard/node_modules ./hipy-ui/dashboard
sleep 3
echo '启动前端 UI 打包 node 容器'
docker run -itd -v /home/hipy/hipy-ui/dashboard:/home/node -w /home/node --name hipy-node node
sleep 3
echo '开始打包前端 UI'
docker exec hipy-node npm i
ssleep 3
docker exec hipy-node npm run build:stage
echo '初始化数据'
docker exec hipy-server python3 initial_data.py
sleep 3
echo '重启所有容器'
docker restart $(docker ps -a -q)
echo '停止前端 UI 打包 node 容器'
docker stop -t=10 hipy-node
docker rm -f hipy-node
echo '删除所有备份文件'
rm -rf ./bak
echo 'HIPY所有内容均已更新完成'
echo '感谢道长的HIPY项目'
sleep 3
