<script setup lang="ts">
import PhoneFrame from "../../components/PhoneFrame/PhoneFrame.vue";

import TabSwticher from "../../components/TabSwticher/TabSwticher.vue";
import TitleCard from "../../components/TitleCard/TitleCard.vue";
import {ref} from "vue"

const RANGE = [{name: '标签1'}, {name: '标签2'}, {name: '标签3'}];
const current = ref(0);
</script>

<PhoneFrame title="TabSwticher">
<TabSwticher v-model="current" :range="RANGE" rangeKey="name" class="t-s"/>
<TabSwticher v-model="current" :range="RANGE" rangeKey="name" border class="t-s"/>
<TabSwticher v-model="current" :range="RANGE" rangeKey="name" bg-style class="t-s"/>
</PhoneFrame>

<style lang="scss" scoped>
.t-s{
margin-bottom: 10px;
}
</style>

# TabSwitcher

一个 tab 切换组件

## 用例

```vue
<script setup>
import TabSwticher from "../../components/TabSwticher/TabSwticher.vue";
import TitleCard from "../../components/TitleCard/TitleCard.vue";
import { ref } from "vue";

const RANGE = [{ name: "标签1" }, { name: "标签2" }, { name: "标签3" }];
const current = ref(0);
</script>

<template>
  <TabSwticher v-model="current" :range="RANGE" rangeKey="name" class="t-s" />
  <TabSwticher v-model="current" :range="RANGE" rangeKey="name" border class="t-s" />
  <TabSwticher v-model="current" :range="RANGE" rangeKey="name" bg-style class="t-s" />
</template>
```

## API

### 属性

| 属性     | 类型    | 必填 | 默认值 | 说明                                       |
| -------- | ------- | ---- | ------ | ------------------------------------------ |
| v-model  | number  | true |        | 当前选中的标签                             |
| range    | any[]   | true |        | tab 列表                                   |
| rangeKey | string  |      |        | 当 range 为对象数组时, 指定 tab 显示的 key |
| border   | boolean |      | false  | 底部显示边框                               |
| bgStyle  | boolean |      | false  | 使用背景变色风格                           |

## 事件
