# 命令

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

## Docker 卷

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

## Docker File

### 示例

dockerfile 可以类比为 c 的 makefile, docker 会根据 dockerfile 来构建镜像

```bash
# dockerfile
FROM centos
VOLUME ["volume1", "volume2"]
CMD echo "hello"
CMD /bin/bash
```

以下为构建命令

```sh
docker build -f dockerfile -t 镜像名[:标签] .
```

指定数据卷来源

```sh
# 假设我们通过上面的dockerfile创建了一个镜像
# 下面直接用创建的镜像来创建容器, 会自动生成两个卷, volume1和volume2
docker run -d --name=rocky1 my-rocky
# 下面我们使用--volumes-from来指定我们的数据卷来源是rocky1, 这样就不会重复生成新的卷, 并且两个容器可以共用数据卷
docker run -d --name=rocky2 --volumes-from=rocky1 my-rocky
```

### docker file 命令

> dockerfile 通过#来编写注释

| 命令       | 说明                                                        |
| ---------- | ----------------------------------------------------------- |
| FROM       | 基础镜像                                                    |
| MAINTAINER | 镜像维护者信息, 一般是名字+邮箱                             |
| RUN        | 构建时需要执行的命令, 命令是 FROM 镜像容器中执行的          |
| ADD        | 添加文件到镜像, 会自动解压 tar.gz                           |
| WORKDIR    | 镜像的工作目录                                              |
| VOLUME     | 要挂载的卷                                                  |
| EXPOSE     | 暴露端口                                                    |
| CMD        | 容器运行时要执行的命令, 用户在 run 时容易覆盖               |
| ENTRYPOINT | 容器运行时要执行的命令, 用户需要使用--entrypoint 来进行覆盖 |
| ENV        | 设置环境变量                                                |
| COPY       | 类似 ADD, 不会自动解压 tar.gz                               |

## Docker 网络

### CLI

```sh
docker network 命令
```

命令

- `ls` 查看所有的 docker 网络
- `create` 创建网络

### 网络模式

bridge: 桥接(常用)

none: 不配置网络

host: 和宿主机共享

container: 容器之间直接互联

### 自定义网络

自定义网络的优点在于可以直接用网络名字互 ping, 即 docker 中 hosts 会自动更新

```sh
docker network create --subnet 192.168.0.0/16 mynet
```

选项

- `--driver` 指定网络模式, 默认 bridge
- `--subnet` 子网掩码
- `--gateway` 网关, 可根据子网掩码自动生成

### 网络连接

```sh
docker network connect [选项] 网络 容器
```
