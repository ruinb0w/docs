# 证书

## rocky 9

### mongodb

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

安装 mongodb

```bash
dnf install mongodb-org
```

### 软件源

[epel | 镜像站使用帮助 | 清华大学开源软件镜像站 | Tsinghua Open Source Mirror](https://mirrors.tuna.tsinghua.edu.cn/help/epel/)

[Rocky Linux 源使用帮助 — USTC Mirror Help 文档](https://mirrors.ustc.edu.cn/help/rocky.html)

### 修改默认 shell

### 防火墙

开启防火墙

```bash
systemctl status firewalld
# 如果没有开启的话手动开启一下
systemctl start firewalld
systemctl enable firewalld
```

添加端口白名单

```bash
firewall-cmd --zone=public --add-port=27017/tcp --permanent
```

启用修改

```bash
firewall-cmd --reload
# 效果和下面一样
systemctl restart firewalld
```

### SSL 证书

### 生成证书

使用 letsencrypt 的 `certbot` 工具

```ba'sh
dnf install certbot
```

生成证书

```bash
certbot certonly --manual
```

按照提示在 80 端口启动一个 http 服务, 以完成验证

### 更新证书

```sh
certbot certonly -d my.domain.com
```
