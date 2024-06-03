# wsl2

## proxy

```sh
#!/bin/zsh

# 获取主机IP
hostip=$(cat /etc/resolv.conf |grep -oP '(?<=nameserver\ ).*')

# 设置代理
export https_proxy="http://${hostip}:7890"
export http_proxy="http://${hostip}:7890"
export all_proxy="socks5://${hostip}:7890"
```
