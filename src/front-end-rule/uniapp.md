# uniapp

## 概念

### 生命周期

## 配置

### 网页配置

使用 hash 路由, 避免发生奇怪的错误. 设置 base 为`./`这样方便放置在服务器静态文件的任意位置

```json
// manifest.json

"h5": {
    "router": {
      "mode": "hash",
      "base": "./"
    }
  }
```