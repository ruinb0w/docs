# Docker 卷

```sh
docker volume 命令
```

命令

- create 创建卷
- inspect 查看卷信息
- prune 移除没有使用的卷
- rm 移除卷

**具名和匿名挂载**

```sh
# 如果只有一个路径则表示匿名挂载
docker run -v /etc/nginx nginx
# 如果主机没有写路径而是写了一个字符串则表示具名挂载
docker run -v named_nginx:/etc/nginx nginx
```

具名和匿名挂载的卷具体位置可以用 `inspect` 命令来查看

**挂载读写权限**

```sh
# 下面ro表示只读
docker run -v /etc/nginx:ro nginx
```
