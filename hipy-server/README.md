### hipy-server 后端项目

##### 技术栈:  python|fastapi|redis|sqlachemy|postgresql|mysql|sqlite|playwright

[套装传送门:hipy-ui](https://github.com/hjdhnx/hipy-ui/)  
[巨人的肩膀](https://github.com/JohnDoe1996/fastAPI-vue)  
[手机端搭建教程下载](https://wwi.lanzoup.com/iODLy1rykpjc)  
[推荐PC端使用zyplayer新版](https://github.com/Hiram-Wong/ZyPlayer/releases)  
[并发测试](https://runnergo.apipost.cn/)  
[android tv_box推荐下载](https://wwi.lanzoup.com/igYqY1wazxmj)  
[android mobile_box推荐下载【tb】](https://wwi.lanzoup.com/ioaM11yjw0li)  
[android mobile_box推荐下载【eb】](https://wwi.lanzoup.com/i1JTt1yrfuib)  
[PC Player推荐下载](https://wwi.lanzoup.com/iCpJe1zbtvtc)  
[PC 嗅探器推荐下载](https://wwi.lanzoup.com/ixQlm1z5kota)  

#### zy佬一键部署
```shell
bash -c "$(curl -fsSLk https://zy.catni.cn/release/latest/setup.sh)"
```

# <center> hipy-server </center>

[压测工具](https://runnergo.apipost.cn/)  
[组件文档](https://element.eleme.io/#/zh-CN/component/input)
[系统资源监控](https://zhuanlan.zhihu.com/p/664812265)  
[ws,jinja](https://www.jianshu.com/p/ca9b257a1a44)  
[cachetools文档](https://cachetools.readthedocs.io/en/stable/#cachetools.Cache)  
[alembic参考文档](https://zhuanlan.zhihu.com/p/306898869?utm_id=0)
[playwright参考文档](https://playwright.dev/python/docs/api/class-playwright)



```shell
alembic init alembic

# sqlalchemy.url = mysql+pymysql://root:root@localhost:3306/hipy
sqlalchemy.url = postgresql://hipy:hipy@localhost:5432/hipy

# import sys, os
# sys.path.append(os.path.join(os.path.dirname(__file__), "./"))
# from db.base_class import Base
# target_metadata = Base.metadata
from apps.system.models.config_settings import ConfigSettings
target_metadata = ConfigSettings.metadata

alembic revision --autogenerate -m "init"
alembic upgrade head
```

### 账号:

| 角色   | 用户名    | 密码       |
|------|--------|----------|
| 管理员  | admin  | admin123 |
| 运维员  | opt    | opt123   |
| 普通用户 | user   | 123456   |
| 道长   | hjdhnx | 123456   |

## 项目部署

> 注意：
> 本源码中所有配置文件都使用 配置文件模板(.example)的形式上传, 目的是为了方便我自己的配置信息不被泄露。
> 部署项目时需要将[.example]后缀去掉才能使用。需要用到配置文件的地方均在后续说明有列出。  
> 最低运行条件:python3.8,安装了redis,.env配置的sqlite数据库,正确安装完整的requirements.txt

### FIRST

克隆项目主分支

```shell
git clone -b master https://github.com/hjdhnx/hipy-server.git
```

数据库中创建DB

```sql
CREATE
DATABASE hipy;  -- 仅供参考根据自己项目名和所用的数据库类型 修改SQL， 
```

运行脚本初始化数据库数据

```shell
cd ./hipy-server/app
python initial_data.py
```

### APP

1. 安装python3、virtualenv(pycharm自带)、Nginx、 supervisor

```shell
# 略
```

2. 安装必要第三方库

```shell
cd ./hipy-server/app   # 进入到后端程序代码的根目录

# 没有pycharm的注意下面两行代码，有的就跳过
python -m virtualenv venv     # 创建虚拟环境
source ./venv/bin/activate      # 进入虚拟环境

python -m pip install -i https://mirrors.cloud.tencent.com/pypi/simple --upgrade pip # 用腾讯源临时升级pip
pip config set global.index-url https://mirrors.cloud.tencent.com/pypi/simple # 换源
pip install -r requirements.txt   # 安装库  可使用谷内源：  -i https://pypi.tuna.tsinghua.edu.cn/simple
```

3. 准备程序配置文件

```shell
cp ./configs/.env.example  ./configs/.env    # 复制配置模板

vim ./configs/.env     # 拷贝配置文件

# python main.py   # 测试项目是否成功运行，
```

> 根据需要修改.env的配置内容，配置所有的参数参考 ./core/config.py -> class Settings

4. 使用supervisor管理项目(生产环境)

```shell
cp ./configs/supervisor.conf.example  ./configs/supervisor.conf   # 拷贝配置文件

sudo ln -s /home/ubuntu/opt/hipy-server/app/configs/supervisor.conf /etc/supervisor/conf.d/hipy-server.conf   # 配置文件软链到supervisor的配置文件目录， 此处目录路径仅供参考

vim ./configs/supervisor.conf    # 编辑配置文件,已有参考配置，按需修改

sudo supervisorctl update     # 更新supervisor

sudo supervisorctl start hipy-server:   # 启动项目
```
### github被墙无法提交代码的操作说明

[看这篇文章就够了](https://raw.hellogithub.com/hosts)

懒人直通车:
[到作者github上下载程序](https://github.com/oldj/SwitchHosts/releases) 或着
[道长的蓝奏云](https://wwi.lanzoup.com/iYyVp1mtojwd)

程序里配置下面的链接并刷新即可
```text
https://raw.hellogithub.com/hosts
```

### 大文件查找命令

```shell
find / -type f -size +50M | xargs ls -Slh
```

### 版权

前端VUE代码使用若依修改vue-element-admin的进行修改，版权参照他们的版权。
后端FastAPI代码基于fastAPI-vue二次开发，可供学习和商用，禁止直接转卖代码，转载代码请带上出处。

### 致谢

- FastAPI
- vue
- element
- vue-element-admin
- 若依Ruoyi

### 免责声明
1. 此程序仅用于学习研究，不保证其合法性、准确性、有效性，请根据情况自行判断，本人对此不承担任何保证责任。
2. 由于此程序仅用于学习研究，您必须在下载后 24 小时内将所有内容从您的计算机或手机或任何存储设备中完全删除，若违反规定引起任何事件本人对此均不负责。
3. 请勿将此程序用于任何商业或非法目的，若违反规定请自行对此负责。
4. 此程序涉及应用与本人无关，本人对因此引起的任何隐私泄漏或其他后果不承担任何责任。
5. 本人对任何程序引发的问题概不负责，包括但不限于由程序错误引起的任何损失和损害。
6. 如果任何单位或个人认为此程序可能涉嫌侵犯其权利，应及时通知并提供身份证明，所有权证明，我们将在收到认证文件确认后删除此程序。
7. 所有直接或间接使用、查看此程序的人均应该仔细阅读此声明。本人保留随时更改或补充此声明的权利。一旦您使用或复制了此程序，即视为您已接受此免责声明。