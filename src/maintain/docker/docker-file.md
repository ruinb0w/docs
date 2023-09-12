# Docker File

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
