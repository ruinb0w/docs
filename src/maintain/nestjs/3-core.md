创建项目后有可以看到几个核心文件 `app.controller.ts` `app.module.ts` `app.service.ts`

```ts
// app.module.ts

import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

```ts
// app.controller.ts

import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
```

```ts
// app.service.ts

import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello World!";
  }
}
```

controllers 控制路由, services 负责具体业务逻辑, module 将功能整合在一起, 并注入

## Controller

### 路由的顺序影响效果

```ts
// users.controller.ts

export class UsersController {
  @Get("some")
  getSome() {
    return "some";
  }

  @Get(":id")
  getOne(@Param("id") id: string) {
    return { id };
  }

  // :id会拦截所有/user/任意内容 所以如果some在id后面，那么就会被拦截, 从而返回{id: 'some'} 而不是希望的'some'
  // @Get('some')
  // getSome() {
  //  return 'some';
  // }
}
```

## Provider

Provider 有多种, 其中最常用的就是 `service`

## Pipe

### transformation

### validation
