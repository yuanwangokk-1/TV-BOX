

zyplayer导入教程:
1.drpy_dzlive整个文件夹丢到zy服务目录的根目录，注意不是安装目录(写源工具-运行-服务)
2.zy设置数据导入hipy源输入下面的地址:
http://127.0.0.1:9978/api/v1/file/drpy_dzlive/

注意: 推荐使用 zyplayer3.3.5 0519-1 及以上版本

easybox导入教程:
1.在手机上创建 easybox目录,将此本地包解压到easybox目录内。本地包index.js目标路径: /sdcard/easybox/drpy_dzlive/index.js
2.新增订阅添加以下内容: file://easybox/drpy_dzlive/index.json
3.打开首页源:网盘及弹幕配置 阿里云盘扫码登录，获取token成功.然后点击Alist提取openToken。成功了就可以使用阿里土豆等源播放了

其他说明:
index.js仅限zyplayer配置使用
index.json可以给手机壳子easybox使用本地包
