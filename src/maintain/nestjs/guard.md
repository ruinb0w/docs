# Guard

在中间件之后, 在管道和拦截器之前

下面是一个例子, 通过 `nest g gu 名字` 创建守卫

```ts
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";

@Injectable()
export class GuardGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // 通过反射的形式获取metadata
    const roles = this.reflector.get("roles", context.getHandler());
    const req = context.switchToHttp().getRequest();
    return roles.includes(req.query.role);
  }
}
```

## 使用

Guard 可用于某个 `Module` 或在 `main.ts` 全局配置

### 单个 Module

```ts
import { Controller, UseGuards, SetMetadata } from "@nestjs/common";
import { GuardGuard } from "@/guard.guard";

@Controller("tryGuard")
@UseGuards(GuardGuard)
export class TryGuardController {
  //...
  @Get()
  // SetMetadata 可以方便的标注接口需要的角色或权限
  @SetMetadata("roles", ["admin"])
  findAll() {
    return this.guardService.findAll();
  }
}
```

`useGuards`

### 全局

```ts
// main.ts

import { GuardGuard } from "@/guard.guard";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(GuardGuard);
  await app.listen(3000);
}
```

`app.useGLoablGuards`
