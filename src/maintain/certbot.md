# 证书

## certbot

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
