# Nuxt

nuxt 是一个 vue 的服务端渲染框架

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

### 路由

nuxt 根据`pages/`文件夹路径来管理路由, 组件会根据路径来自动生成路由

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
