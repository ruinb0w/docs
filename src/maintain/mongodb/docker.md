# docker

通过以下命令可以创建一个 mongodb 容器

```sh
docker run -d --name cute-db -v ./db:/data/db -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=toor -p 27017:27017 9576663f05bb --replSet rs0
```

使用 `replica set` 需要配置证书, 如果不希望使用 `replica set`，可以将 `--replSet rs0` 从启动命令中去除
