# mongodb

## 准备

加入 mongodb 仓库信息

```toml
# /etc/yum.repos.d/mongodb-org-6.0.repo
[mongodb-org-6.0]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/8/mongodb-org/6.0/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-6.0.asc
```

## 安装

```bash
dnf install mongodb-org
```

## 配置

默认配置文件 `/etc/mongo.conf`

### 远程连接

1. 修改 `mongo.conf` 文件

```bash
sudo vi /etc/mongo.conf
# 将原来 bindIp:127.0.0.1 修改为 0.0.0.0
```

> mongodb 的配置文件中的 bind_ip 默认为 127.0.0.1，默认只有本机可以连接。 此时，需要将 bind_ip 配置为 0.0.0.0，表示接受任何 IP 的连接

2. 重启动 mongo 服务：`systemctl mongod restart`

3. 如果其他主机连不上需要检查防火墙配置, 具体见各发行版的配置

## 用户管理

> 执行命令都需要先切到某个数据库

`show users` 显示数据库下的用户

`db.dropUser("用户名")` 删除用户

`db.updateUser("用户名", {pwd: 密码, 等要修改的内容...})` 更新用户

`db.auth("用户名", "密码")` 用户登录

```js
// 1.切换到admin库, 不同的用户对应不同的库
use admin

// 2.创建账户
db.createUser({
    user: 'admin',
    pwd: 'zero1024',
    roles: [{
        role: 'root', //root必须在admin库下
        db: 'admin'
    }]
})

// 3.通过配置文件(/etc/mongod.conf), 启用账户管理
security:
    authorization: enabled
```

role

- root
- dbOwner

## 备份&还原

### 备份

语法: `mongodump [options]`

- `-h 服务器地址`
- `--port 端口`
- `-d 要备份的数据库名称`
- ` -o 存放备份的路径`
- `--authenticationDatabase=验证用户的数据库`
- `-u 账号`
- `-p` 密码
- `--gzip` 用 gzip 压缩
- `--archive=打包名称` 使用 tar 进行打包

示例

```sh
mongodump --uri='mongodb://用户名:密码!@IP:端口' -d 要备份的数据库 --authenticationDatabase=验证用户的数据库 --gzip --archive="$(date +%F).gz"
```

### 还原

语法: `mongorestore 选项`

- `--drop`: 先删除 -d 指定的数据库, 再进行恢复(慎用)
- `--nsFrom="数据库.集合(*表示全部)"` 指定恢复来源
- `--nsTo="数据库.集合(*表示全部)"` 指定恢复目标

示例

```sh
# 备份的数据库名称和恢复的数据库名称相同
mongorestore --uri='mongodb://IP:端口' -d 数据库名称 --gzip --archive=备份文件
# 备份的数据库名称和恢复的数据库名称不同
mongorestore --uri='mongodb://IP:端口' --gzip --archive=备份文件 --nsFrom="备份的数据库.*" --nsTo="恢复的数据库.*"
```
