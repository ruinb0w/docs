# QrCode

QrCode 是一个二维码渲染组件, 基于[uQRCode](https://github.com/Sansnn/uQRCode)

## 用例

```vue
<script setup>
import QrCode from "../../components/QrCode/QrCode.vue";
</script>

<template>
  <QrCode
    :options="{ data: 'https://ruinb0w.github.io/docs/doc/components/qr-code.html', size: 200 }"
  />
</template>
```

## 兼容

| uniapp mp | uniapp h5 | web |
| --------- | --------- | --- |
| √         | √         | ×   |

## API

### 属性

| 属性    | 类型   | 默认值 | 说明                                                                                     |
| ------- | ------ | ------ | ---------------------------------------------------------------------------------------- |
| options | object |        | [详情](https://uqrcode.cn/doc/document/native.html#%E5%9F%BA%E6%9C%AC%E9%85%8D%E7%BD%AE) |

### 事件

| 事件   | 说明                |
| ------ | ------------------- |
| change | 返回激活的 tag 列表 |
