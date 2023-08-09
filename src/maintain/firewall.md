# 防火墙

### 开启防火墙

```bash
systemctl status firewalld
# 如果没有开启的话手动开启一下
systemctl start firewalld
systemctl enable firewalld
```

### 添加端口白名单

```bash
firewall-cmd --zone=public --add-port=27017/tcp --permanent
```

### 启用修改

```bash
firewall-cmd --reload
# 效果和下面一样
systemctl restart firewalld
```
