# Docker 网络

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
