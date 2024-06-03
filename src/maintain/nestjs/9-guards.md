# Guard

## 简介

Guard 决定是否要让请求被 route hanlder 处理, 它通常被用在权限, 角色等检查上

- Guard 在 Middleware 之后执行
- Guard 返回 `boolean | Promise<boolean>`, 来决定是否让请求被 route handler 处理
- 相较于 Middleware, Guards 可以知道接下来的 route handler 具体是什么, 所以更合适用于验证

## 创建

Guard 需要实现 `CanActivate` 类并用 `@Injectable()` 进行装饰

使用 `nest g guard 名称` 可以快速创建 Guard

<details>
<summary>
下面是一个检查请求是否包含token字段的例子
</summary>

```ts
import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    return !!request.headers.token;
  }
}
```

</details>

## 绑定

Guard 可用于某个 `Module` `Controller` `Handler` 或在 `main.ts` 全局配置

- 绑定在 `Module` `Controller` `Handler` 使用 `@useGuards(Guard)`装饰器
- 绑定在 `main.ts` 使用 `app.useGlobalGuards(Guard)`

绑定在 Controller

```ts
@Controller("cats")
@UseGuards(AuthGuard)
export class CatsController {}
```

绑定在 route handler

```ts
@Get()
@UseGuards(AuthGuard)
async findAll() {}
```

绑定在 Global

```ts
app.useGlobalGuards(new AuthGuard());
```

以上的方式 AuthGuard 并不会作为依赖注入到 nestjs 中, 如果我希望让其注入到 nestjs, 可以像下面这样, 绑定到 Module 中

```ts
import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";

@Module({
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule {}
```

> 并不必须放在 `AppModule` 中, 但作为全局 Guards, 推荐放在 `AppModule` 中

### Reflector & MetaData

利用 MetaData 可以将数据绑定到 route handler 上, 然后使用 Reflector 获取绑定的数据

如果想实现给 Guard 传递参数的话, 可以使用 `Reflector` 来获取参数, 并且 Guard 要使用绑定到 Module 的形式

<details>
<summary>
下面是一个角色校验的例子
</summary>

1. 首先编写一个 Guard

> 你可以注意到下面的代码使用到了 `Reflector` 和 `ExecutionContext`

```ts
// guards/roles/roles.guard.ts

import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get("roles", context.getHandler()); // reflect roles from decorator in route handler
    const request = context.switchToHttp().getRequest();
    console.log("roles", roles);
    if (request.locals.user.roles.some((role) => roles.includes(role))) {
      return true;
    }
    return false;
  }
}
```

2. 把我们的 Guard 绑定到 Module 中

```ts
// app.module.ts

import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CatsModule } from "./cats/cats.module";
import { RolesGuard } from "./guards/role/role.guard";
import { APP_GUARD } from "@nestjs/core";

@Module({
  imports: [CatsModule],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: RolesGuard }],
})
export class AppModule {}
```

3. 下面是一个装饰器, 可以设置一些元数据

```ts
// guards/roles/roles.decorator.ts

import { Reflector } from "@nestjs/core";

export const Roles = Reflector.createDecorator<string[]>();

// 也可以采用另一种方式
// import { SetMetadata } from "@nestjs/common";
// export const Roles = (roles: string[]) => SetMetadata('roles', args);
```

4. 最后在 route hanlder 中使用我们的 Guard

```ts
import { Controller } from "@nestjs/common";
import { Roles } from "src/guards/role/roles.decorator";
import { Get } from "@nestjs/common";

@Controller("cats")
export class CatsController {
  @Get()
  @Roles(["admin"]) // this route handler can only be accessed by admin
  findAll(): string {
    return "This action returns all cats";
  }
}
```

</details>
