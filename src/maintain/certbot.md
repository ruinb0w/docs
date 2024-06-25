# 证书

## certbot

使用 letsencrypt 的 `certbot` 工具

### 安装 certbot

```bash
dnf install certbot
```

### http 方式

#### 生成证书

```bash
certbot certonly -d my.domain.com
```

按照提示手动验证或由 certbot 自动创建一个 80 端口的服务

#### 更新证书

```sh
certbot renew -d my.domain.com
```

### dns 方式

阿里云见 [certbot-dns-aliyun](https://github.com/justjavac/certbot-dns-aliyun?tab=readme-ov-file)
