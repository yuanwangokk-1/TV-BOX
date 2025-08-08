注意：频道名可以多个（20个大概0.5秒左右返回） 但是频道多会导致限流 所以还是少点好 （限流一次就是多等8秒左右）
新服务器方式仅支持20240929及以后的包

运行方式 不同平台替换以下tgsou-linux文件名
chmod 777 tgsou-linux(linux 平台)
1.直接运行
./tgsou-linux
2.指定代理运行
./tgsou-linux --proxy http://127.0.0.1:1084
第一次运行需要授权 输入+86再加上手机号（比如：+8618888888888），在tg客户端接受验证码 填入即可 后面可以后台运行
如果以前生成过这授权文件 直接放同一目录运行即可
3.后台运行
  nohup ./tgsou-linux > my_log_file.log 2>&1 &
4.访问
 http://127.0.0.1:9999/?channelUsername=hao115,guaguale115,dianyingshare,XiangxiuNB,yunpanpan,kuakeyun,zaihuayun,Quark_Movies,alyp_4K_Movies,vip115hot,yunpanshare&keyword=周星驰