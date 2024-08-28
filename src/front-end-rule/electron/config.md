# Config

## 国内源

安装 **electron** 时如果出现 `install.js` 报错则需要配置国内源

```sh
pnpm config set electron_mirror https://mirrors.huaweicloud.com/electron/
```

## 运行某些包失败

使用 electron-rebuild 包来 rebuild 一下依赖
