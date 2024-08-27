```shell
# python 降级安装命令
 ./configure && make -j6 && make install 
```


### 云手机部署命令
```shell
apt install linux-modules-extra-`uname -r` modprobe
binder_linux devices="binder,hwbinder,vndbinder"
modprobe ashmem_linux
echo -e "\n
export redroid=redroid/redroid:11.0.0-latest
export image_tar=${HOME}/redroid:11.0.0-latest" >> ${HOME}/.bashrc
source ${HOME}/.bashrc

docker pull $redroid

docker run -itd --privileged --restart=always -v ~/redroid-data:/data -p 5710:5555 --name redroid redroid/redroid

```