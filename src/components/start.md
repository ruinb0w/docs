<script setup lang="ts">
import PhoneFrame from "../../components/PhoneFrame/PhoneFrame.vue";
</script>

<PhoneFrame title="预览">
<div>
<p> 这是组件的预览窗口 </p>
<p> 点击右上角隐藏按钮, 可以隐藏掉预览窗口 </p>
</div>
</PhoneFrame>

# 概述

uniapp 提供的 UI 组件很难用, 并且小程序原生本身已经提供了常用的组件, 故自行写了一些组件

## 使用

### 下载组件和样式

```bash
git clone https://github.com/ruinb0w/docs.git
```

其中 `components` 文件夹放置的就是组件, `style` 文件夹中放置的就是样式

### 导入样式

使用组件前需要先导入样式到 `main.js` 或者 `App.vue` 中

```ts
// main.ts

import "./static/style/undefault.scss";
import "./static/style/color.scss";
import "./static/style/button.scss";
import "./static/style/anime.scss";
import "./static/style/form.scss";
```

```vue
// App.vue

<style lang="scss">
@import "./static/style/undefault.scss";
@import "./static/style/color.scss";
@import "./static/style/button.scss";
@import "./static/style/anime.scss";
@import "./static/style/form.scss";
</style>
```
