<script setup lang="ts">
import PhoneFrame from "../../components/PhoneFrame/PhoneFrame.vue";
import TagSelector from "../../components/TagSelect/TagSelect.vue";
import TitleCard from "../../components/TitleCard/TitleCard.vue";
import {ref} from "vue"

const TAG_LIST = [{name: '标签1'}, {name: '标签2'}, {name: '标签3'}];
const radioList = ref(JSON.parse(JSON.stringify(TAG_LIST)));
const checkboxList = ref(JSON.parse(JSON.stringify(TAG_LIST)));
const activeTagList = ref([]);
</script>

<PhoneFrame title="TagSelector">
<title-card title="单选">
<tag-selector v-model="radioList" mode="radio" @change="activeTagList = $event"/>
激活的 tag: {{activeTagList}}
</title-card>

<title-card title="多选">
<tag-selector v-model="checkboxList" mode="checkbox"/>
</title-card>
</PhoneFrame>

<style lang="scss" scoped>
.block{
    background: #fff;
}
</style>

# TagSelector

TagSelector 是一个标签选择器, 可以多选或单选

## 用例

```vue
<script setup>
import TagSelector from "../../components/TagSelect/TagSelect.vue";
import TitleCard from "../../components/TitleCard/TitleCard.vue";
import { ref } from "vue";

const TAG_LIST = [{ name: "标签1" }, { name: "标签2" }, { name: "标签3" }];
const radioList = ref(JSON.parse(JSON.stringify(TAG_LIST)));
const checkboxList = ref(JSON.parse(JSON.stringify(TAG_LIST)));
const activeTagList = ref([]);
</script>

<template>
  <PhoneFrame title="Popup">
    <title-card title="单选">
      <tag-selector v-model="radioList" mode="radio" @change="activeTagList = $event" />
      激活的 tag: {{ activeTagList }}
    </title-card>

    <title-card title="多选">
      <tag-selector v-model="checkboxList" mode="checkbox" />
    </title-card>
  </PhoneFrame>
</template>
```

## API

### 属性

| 属性     | 类型           | 默认值   | 说明                                |
| -------- | -------------- | -------- | ----------------------------------- |
| v-model  | object[]       |          | tag 列表                            |
| mode     | radio,checkbox | checkbox | 模式                                |
| rangeKey | string         | name     | tag 要显示的 key, 对应 v-model 的值 |

## 事件

| 事件   | 说明                |
| ------ | ------------------- |
| change | 返回激活的 tag 列表 |
