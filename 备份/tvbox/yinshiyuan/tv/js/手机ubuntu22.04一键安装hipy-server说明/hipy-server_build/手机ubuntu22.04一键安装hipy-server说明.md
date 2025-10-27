使用说明
使用前提是ksweb中安装了mysql并且设置username：root  password：123456 创建好空hipy数据库
1、拷贝这个压缩包到sd/pywork并解压
2、zerotermux中执行以下命令
cd sd/pywork/hipy-server_build
chmod +x hipy-server_build
./hipy-server_build.sh
3、设置zerotermux启动直接进ubuntu22.04
启动后在~目录下执行以下命令
pkg install vim -y
vi ~/.bashrc


echo "用户："$(whoami)

if pgrep -x "sshd" >/dev/null
  then
    echo "sshd运行中..."
  else
    sshd
    echo "自动启动sshd"
fi
debian 


4、ubuntu22.04界面下输入
bash

直接就可以启动hipy-server



扩展：
手机安装ksweb
部署mysql
ngixn部署前端
就可以全部跑起整个hipy前后端项目
前端项目以dist部署在htdocs下