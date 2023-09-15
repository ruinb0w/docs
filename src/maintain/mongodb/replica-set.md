# Replica Set

replica set 顾名思义就是副本集, 每一个副本集存储的数据都是相同的, 当主副本集宕机后, 另外一个副本集会成为主副本集。

## 配置 replica set

需要注意的是使用了--replica 参数后, mongodb 就会以副本集的模式启动, 如果不初始化副本集, 外部的 client 无法连接

### 非 authorization 模式

1. 创建容器

```
docker run -d --name 容器名字 --replica r0
```

2. 初始化副本集

```ts
rs.initiate({ _id: "rs0", members: [{ _id: 0, host: "localhost:27017" }] });
```

> 这里的 localhost 很重要, 不然客户端连不上

### authorization 模式

mongodb 要求在 authorization 模式下使用副本集需要使用 keyfile

1. 创建 keyfile

```bash
openssl rand -base64 756 > keyfile
```

2. 打包新的镜像, 把 keyfile 放到镜像中

```Dockerfile
FROM mongo

# 将认证密钥文件复制到容器中的指定位置
COPY keyfile /data/keyfile

# 设置密钥文件的权限
RUN chown mongodb:mongodb /data/keyfile
RUN chmod 400 /data/keyfile
```

3. 启动容器

```bash
docker run -d --name 容器名 -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=toor 包含keyfile的镜像名 mongod --replSet rs0 --keyFile /data/keyfile
```

4. 初始化副本集

```ts
rs.initiate({ _id: "rs0", members: [{ _id: 0, host: "localhost:27017" }] });
```

> 这里的 localhost 很重要, 不然客户端连不上
