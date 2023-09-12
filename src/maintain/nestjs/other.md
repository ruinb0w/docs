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

## swagger

nestjs 配合 swagger 可以自动生成接口文档, 并且可以快速的进行测试, 详见 [nestjs-swagger](https://github.com/ruinb0w/nestjs-swagger)

1. 在 `main.ts` 中引入 swagger

```ts
// libs/swagger.ts
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import type { INestApplication } from "@nestjs/common";

export function setupSwagger(app: INestApplication) {
  const swaggerConfig = new DocumentBuilder()
    .setTitle("Cats example")
    .setDescription("The cats API description")
    .setVersion("1.0")
    .build();
  SwaggerModule.setup("api", app, SwaggerModule.createDocument(app, swaggerConfig));
}
```

```
// main.ts

import {setupSwagger} from "@/libs/swagger";

setupSwagger(app);
```

2. 配置 swagger 插件

```
// nest-cli.json

"plugins": [
  {
    "name": "@nestjs/swagger/plugin",
    "options": {
      "classValidatorShim": false,
      "dtoFileNameSuffix": "dto"
    }
  }
]
```
