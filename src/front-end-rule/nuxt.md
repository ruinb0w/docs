# Nuxt

nuxt 是一个 vue 的服务端渲染框架

## 快速开始

### 路由

nuxt 根据`pages/`文件夹路径来管理路由, 组件会根据路径来自动生成路由

> 如果要使用 pages 路由, 需要移除根目录下的`app.vue`

#### 基础路由

在 `pages` 文件夹中创建一个 `index.vue` 文件, 该文件将作为默认路由, 例如下面的 `index.vue` 我们可以通过 `/` 根路径访问

```
-pages/
 |- index.vue

```

在 `pages` 下任意子目录中创建一个 `index.vue` 文件, 该文件将作为默认路由, 例如下面的 `index.vue`, 我们可以通过 `/about`访问到

```
-pages/
 |- about/
    |- index.vue
```

#### 动态路由

通过`[:参数名].vue`的文件名形式来创建动态路由, 动态路由可以用在商品详情或用户信息页面

例如下面我们创建了一个`pages/user/[id].vue`的文件, 我们可以通过`/user/用户ID`来访问到用户信息页面, 并在页面中通过`userRoute().params`获取用户的 id

```vue
<!-- pages/user/[id].vue -->

<script setup lang="ts">
const id = useRoute().params.id;
</script>

<template>
  <div class="user">user id is: {{ id }}</div>
</template>
```

#### NuxtLink

NuxtLink 封装了 vue-router, 使用时 url 的变化并不会导致重新请求页面

```
<nuxt-link to="/about">About</nuxt-link>
```

### layout 布局

在项目根目录创建一个 `layout` 文件夹, 这个文件夹中的 vue 文件将作为页面布局

#### 默认(全局)布局

将 `layout` 文件夹中创建一个 `default.vue` 文件, 该文件将作为所有页面的默认布局

```vue
<!-- default.vue -->

<template>
  <h1>default layout</h1>
  <!-- 页面内容会插入slot-->
  <slot />
</template>
```

#### 自定义布局

在`layout` 文件夹中创建任意 vue 文件, 这里假设为 `HelloLayout.vue`, 然后在要使用 `HelloFrame.vue` 布局的文件中引入

```vue
<!-- UseHelloLayout.vue-->

<script setup>
definePageMeta({
  layout: "HelloLayout",
});
</script>
```

## 网络请求

### useFetch

nuxt 通过`useFetch`来管理网络请求, 下面是 useFetch 获取用户信息的示例.

> 需要特别注意的一点是, `useFetch` 默认会缓存请求, 这会导致我们的 **user id** 变化时, `useFetch` 得到的始终是第一次请求得到的用户信息, 这时我们需要指定`key`为一个变量, 当这个变量变化时 `useFetch` 会重新请求

```vue
<script setup>
const id = useRoute().params.id;
const { data } = await useFetch(`/api/user/${id}`, { key: id });
</script>
```

## 概念

### 自动引入

nuxt 会自动导入 vue 的 composition API 以及 nuxt 内置的一些 API, 例如`ref` `computed`等

nuxt 也会导入放在以下文件夹中的第三方 js 文件,只要是这些文件 export 出的对象都会被导入

- `components/` for Vue components.
- `composables/` for Vue composables.
- `utils/` for helper functions and other utilities.

通过修改`nuxt.config`可以关闭自动导入

```ts
export default defineNuxtConfig({
  imports: {
    autoImport: false, //这会关闭所有的自动导入
  },
  components: {
    dirs: [], // 将dir设置为空数组, 则不会自动导入组件
  },
});
```

关闭后依旧可以使用`#imports`来导入组件或内置 API 等

```ts
import { ref } from "#imports";
```

### 渲染模式

nuxt 有四种渲染模式:

- Universal Rendering
- Client-Side Rendering
- Hybrid Rendering
- Edge-Side Rendering

#### 客户端渲染

将 ssr 设置 false 即可关闭服务端渲染

```ts
export default defineNuxtConfig({
  ssr: false,
});
```

### Module

nuxt 的 Module 实际指的就是第三方插件, 可以通过以下方式来添加 Module

```ts
// nuxt.config.ts

export default defineNuxtConfig({
  modules: [
    // Using package name (recommended usage)
    '@nuxtjs/example',

    // Load a local module
    './modules/example',

    // Add module with inline-options
    ['./modules/example', { token: '123' }]

    // Inline module definition
    async (inlineOptions, nuxt) => { }
  ]
})
```
