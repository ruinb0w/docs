<script setup lang="ts">
import PhoneFrame from "../../components/PhoneFrame/PhoneFrame.vue";
import Popup from "../../components/Popup/Popup.vue";
import {ref} from "vue"

const showPopup = ref(false);
</script>

<PhoneFrame title="Popup">
<button class="btn" @click="showPopup = true">显示</button>
<Popup v-model="showPopup">弹窗内容</Popup>
</PhoneFrame>

# Popup

Popup 是一个简单的底部弹窗组件

## 用例

```vue
<script setup>
import Popup from "../../components/Popup/Popup.vue";

const showPopup = ref(false);
</script>

<template>
  <button @click="showPopup = true">显示</button>
  <Popup v-model="showPopup">弹窗内容</Popup>
</template>
```

## API

### 属性

| 属性    | 类型    | 默认值 | 说明         |
| ------- | ------- | ------ | ------------ |
| v-model | boolean |        | 是否显示弹窗 |

## 插槽

| 插槽 | 说明     |
| ---- | -------- |
| 默认 | 弹窗内容 |
