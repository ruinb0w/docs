# Nuxt

nuxt 是一个 vue 的服务端渲染框架

## 快速开始

### 下载模板并安装依赖

```sh
# 下载模板
pnpm dlx nuxi@latest init 项目名
cd 项目名

# 安装依赖
pnpm i
```

### 开发和部署

```sh
# 开发
pnpm dev

# 编译部署
pnpm build
node .output/server/index.mjs
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

## 核心功能

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

#### 404 错误页面

只需要在项目根目录创建一个 `error.vue` 文件, 该文件将作为 404 错误页面, 下面是一个例子

这个例子中, 如果页面找不到将会跳转到 error.vue 页面, 并且当获取用户失败时, 也可以抛出 `createError` 错误, 来跳转到错误页面. 然后我们可以在错误页面加一个按钮, 来清除错误并跳转到首页.

```vue
<!-- error.vue -->

<script setup>
defineProps<{error: {errCode: number, errMsg: string}}>();

function handleClearError(){
  clearError({ redirect: '/' });
}
</script>

<template>
  <div>{{ error.errCode }}: {{ error.errMsg }}</div>
  <div @click="handleClearError">back to home</div>
</template>
```

```vue
<!-- user/[id].vue -->

<script setup>
const id = useRoute().params.id;
const userInfo = await useFetch("/api/user/:id", { key: ":id" });

if (!userInfo) throw createError({ statusCode: 404, statusMessage: "User not found" });
</script>
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

#### useQuery

`useQuery` 可以解析 url 参数

#### readBody

`readBody` 可以解析 post 的 body

## server

在根路径下创建 `server/api` 文件夹, 在该文件夹中的每个文件都被当做一个接口, 例如 `server/api/user.js`

```ts
// server/api/user.js

export default defineEventHandler(async (event) => {
  const params = useQuery(event);

  return {
    id: params.id,
  };
});
```

useFetch 可以直接请求该 api 并得到返回值

```ts
const user = await useFetch("/api/user?id=123");
```

### $fetch

在 server 端使用 `$fetch` 用法和 client 的 [useFetch](#usefetch) 一样

### 动态路由

server 端动态路由和 client 类似, 都是通过文件来构建.

例如下面的`server/api/user/[id].ts`, 客户端就可以通过 `/api/user/123` 来发送请求

```ts
// server/api/user/[id].ts

export default defineEventHandler(async (event) => {
  const { id } = event.context.params;
});
```

## 配置

配置文件为根目录为 `nuxt.config.ts`

### devtools

开发相关配置

```ts
export default defineNuxtConfig({
  devtools: { enabled: true },
  // ...
});
```

### app

应用相关配置

#### head

由于没有模板文件, 所以配置 head 头需要在配置文件中编写

```ts
export default defineNuxtConfig({
  // ...
  app: {
    head: {
      title: "nuxt-app",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { hid: "description", name: "description", content: "" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
})
```

对于某个页面, 可以用 [useHead](https://nuxt.com/docs/api/composables/use-head#usehead) 或者 `Head` 组件

### runtimeConfig 环境变量

nuxt 支持设置环境变量

1. 在.env 中设置环境变量

```
// .env

PRIVATE_KEY=djfkdjfklsjdfkljsdlf
PUBLIC_KEY=fksdjflsjdfsdfsdfk
```

2. 在 nuxt.config.ts 中设置环境变量

```ts
export default defineNuxtConfig({
  //...
  runtimeConfig: {
    PRIVATE_KEY: process.env.PRIVATE_KEY, // 只有服务端能访问
    public: {
      // 客户端和服务端都能访问
      PUBLIC_KEY: process.env.PUBLIC_KEY,
    },
  },
});
```

3. 获取环境变量

```ts
// 注意放在public中的环境变量, 客户端也能获取到
const publicKey = useRuntimeConfig().public.PUBLIC_KEY;

const privateKey = useRuntimeConfig().PRIVATE_KEY;
```
