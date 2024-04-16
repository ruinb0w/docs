# vite

## 常用配置

```ts
// vite.config.ts
export default defineConfig({
  plugins: [vue()],
  server: { host: "0.0.0.0" }, // 开启本地服务, 让局域网其他设备可访问
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } }, // 设置别名
});
```

### ts 别名报错

设置别名是如果使用了 ts 需要在 `tsconfig.json` 中配置 `paths`

```ts
//tsconfig.json

{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    },
  },
}
```
