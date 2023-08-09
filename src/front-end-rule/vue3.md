# vue3

vue3 相较于 vue2 最大的改变是增加了 composition API 以及 hook 形式的写法(灵感来自于 react16)

## 开始

### 创建项目

```bash
pnpm create vite
# 按提示选择即可
```

也可以使用预设的模板

```bash
pnpm create r0@latest
# 按提示选择即可

# 如因环境问题无法使用该脚本可以直接clone仓库
git clone https://github.com/ruinb0w/back-end-boilerplate # 后台模板
git clone https://gitee.com/ruinb0w/vue-template.git # vue3项目模板
```

### 开发

```bash
pnpm dev
```

### 编译

```bash
pnpm build
```

## composition API

[composition API](https://vuejs.org/guide/typescript/composition-api.html#typing-component-props) 配合 hook 写法让 js 逻辑可以独立出来, 提高了代码的复用性和整洁性

最常用的 composition API 有 `ref` 和 `reactive`, 利用闭包的特性即可实现 hook 写法, 下面是一个例子

```ts
import { ref } from "vue";

export useCount() {
    const count = ref(0);

    function rise(){
        count.value++;
    }

    return {count, rise};
}
```
