# Other

## 版本控制

1. 在 `main.ts` 中开启版本控制

```ts
import { VersioningType } from "@nestjs/common";

//...
app.enableVersioning({ type: VersioningType.URI });
```

2. 在要使用版本控制的 `Controller` 中进行配置

```ts
@Controller({ path: 'user', version: '1' })

// 也可以针对特定的路由进行配置
@Get()
@Version('1')
findAll(){
    // ...
}
```

配置完成后我们访问时就需要加上以 v 开头的版本号, 例如: `localhost:3000/v1/user`

## compressing

[compressing](https://www.npmjs.com/package/compressing) 包, 支持各种压缩格式和流传输:

`tar` `gzip` `tgz` `zip`
