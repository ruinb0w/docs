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

## 坑

### 样式穿透

小程序组件演示不能穿透到子组件, 除非去掉 `scoped` 属性

### 页面滚动穿透

使用`scroll-view`包裹父组件, 并给`scroll-view`设置一个高度, 然后根据需要设置`scroll-y`来控制父组件的滚动

```vue
<template>
  <scroll-view :scroll-y="!disableScroll" style="height:100vh">
    <div class="container"></div>
  </scroll-view>
</template>
```
