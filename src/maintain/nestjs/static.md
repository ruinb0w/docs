# Static Server

## 方式 1: 在 main.ts 中配置

```ts
app.useStaticAssets(
  join(__dirname, "uploads"), // 静态文件目录
  { prefix: "/imgs" } // 静态文件访问前缀, 默认为 '/'
);
```

## 方式 2: 在 app.module.ts 中配置

```bash
pnpm i @nestjs/serve-static
```

```ts
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'uploads'), // 静态文件目录
      serveRoot: '/imgs', // 静态文件访问前缀, 默认为 '/'
    }),
  ],
})
```
