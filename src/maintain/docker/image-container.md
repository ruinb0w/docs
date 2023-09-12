# 镜像和容器

## 镜像

### 查看本地镜像

```bash
docker images
# REPOSITORY   TAG       IMAGE ID       CREATED      SIZE
# node         latest    3d8ab8fd7e2a   6 days ago   998MB
```

### 下载镜像

```bash
# docker pull 镜像名[:版本,默认latest]
docker pull node:18
#18: Pulling from library/node
#bbeef03cda1f: Already exists
#f049f75f014e: Already exists
#56261d0e6b05: Already exists
#9bd150679dbd: Already exists
#5b282ee9da04: Already exists
#8bc43c905b24: Already exists
#5201db2cd6c6: Pull complete
#2a7091f85153: Pull complete
#2bcce6ea6105: Pull complete
#Digest: sha256:d871edd5b68105ebcbfcde3fe8c79d24cbdbb30430d9bd6251c57c56c7bd7646
#Status: Downloaded newer image for node:18
#docker.io/library/node:18
```

摘要上面可以看到有很多 hash 字段, 其表示镜像的某一层. 有些层后面是**Already exists**有些是**Pull complete**这是由于我有别的版本的 node, 而他们有一部分的层是相同的, 故而可以共用, 从而减少磁盘占用. 而这样的减少资源占用的模式称为联合文件系统.

### 删除镜像

```sh
docker rmi [镜像id]+
```

### 封装镜像

```sh
docker commit -m '描述' -a '作者' 容器id 镜像名:tag
```

## 容器

### 创建并执行容器

```sh
docker run [选项] 镜像 [镜像命令]
```

选项

- `--name` 容器名称
- `-d` 后台运行
- `-it` 使用交互方式运行
  - 默认通过 exit 退出交互模式的容器时容器会终止, 可以通过 Ctrl + P + Q 来避免退出时容器终止
- `-p` 端口映射
  - 主机端口:容器端口
  - 容器端口
- `-P` 映射容器暴露的所有端口到本地的随机端口
- `--rm` 容器停止时自动删除容器
- `-v` 挂载本地卷 **主机路径:容器路径**
- `--net` 指定网络, 默认是 bridge 模式

> 需要注意, 如果创建一个容器, 但是这个容器没有需要处理的程序则会自动结束

### 查看容器状态

```sh
docker ps [选项]
# 默认显示当前运行的容器
```

选项

- -a 显示所有容器, 包括不在运行的容器

### 删除容器

```sh
docker rm [容器id]+
```

### 启动和停止容器

```sh
docker start [选项] 容器id
```

选项

- `-i` 以交互模式启动容器

```sh
docker stop 容器id
docker restart 容器id
docker kill 容器id # 强制停止
```

### 日志

```sh
docker logs [选项] 容器id
```

选项

- `--tail 行数` 显示日志最后 n 行

### 查看容器进程

```sh
docker top 容器id
```

### 查看容器详情

```
docker inspect 容器id
```

### 进入正在执行的容器

```sh
# 进入容器并开启新终端
docker exec -it 容器id 命令
#进入容器当前的终端
docker attach 容器id
```

### 复制文件

```sh
docker cp docker:路径 主机路径
docker cp 主机路径 docker:路径
```
