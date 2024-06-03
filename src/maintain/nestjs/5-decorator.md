# 装饰器

装饰器是一种特殊的声明, 类, 方法, 属性, 参数都可以被装饰.

## nest 自带装饰器

### 控制器装饰器

`@Controller()` 用于装饰控制器

### 子域名路由

`@Controller(host: "admin.ruinb0w.xyz")` 当访问 admin 时将走该路由

子域名路由也可以动态获取

```ts
@Controller(host: ":sub.ruinb0w.xyz")
export class SubController {
  @Get()
  getInfo(@HostParam('sub') sub: string) {
    return sub;
  }
}

```

### 参数装饰器

- `@Request(参数名?:string)` 通用的请求数据装饰器, 包括了以下三个装饰器, 后面的装饰器类似于一个语法糖
- `@Body(参数名?:string)` 装饰请求体参数
- `@Query(参数名?:string)` 装饰查询参数
- `@Param(参数名?:string)` 装饰路由参数
- `@Headers(参数名?:string)` 装饰请求头
- `@Ip()` 装饰 ip 地址
- `@Session()` 装饰 session
- `@HostParam()` 域名参数装饰器

参数装饰器还可以直接加上参数名, 例如:@Param('id') 直接获取指定参数,下面是一个 Patch(update)的例子

```ts
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }
```

### 请求(路由)装饰器

| 装饰器           | 说明                            |
| ---------------- | ------------------------------- |
| `@Get(路由)`     | Get 请求                        |
| `@Post(路由)`    | Post 请求                       |
| `@Put(路由)`     | Put 请求                        |
| `@Delete(路由)`  | Delete 请求                     |
| `@Patch(路由)`   | Patch 请求                      |
| `@Options(路由)` | Options 请求                    |
| `@Head(路由)`    | 只请求请求头, 和 Get 获取的一样 |
| `@All(路由)`     | 获取所有请求                    |

完全匹配, 例如 `@Get("cats")` 和 `@Get("cats/all")`

模糊匹配, 例如 `@Get("c*s")` 其中 `*`为任意字符, 模糊匹配仅支持 express

参数匹配, 例如 `@Get("cats/:id")` 其中`:id`匹配`/cats/`后面的所有内容

### 响应装饰器

| 装饰器                                      | 说明                                    |
| ------------------------------------------- | --------------------------------------- |
| `@HttpCode(code: number)`                   | 指定响应的类型, 默认 200, POST 默认 201 |
| `@Header('Cache-Control', 'none')`          | 自定义相应头                            |
| `@Redirect(url: string [, 状态码: number])` | 重定向, 默认状态码 302                  |

#### 动态重定向

```ts
@Get('docs')
@Redirect('https://docs.nestjs.com', 302)
getDocs(@Query('version') version) {
  if (version && version === '5') {
    return { url: 'https://docs.nestjs.com/v5/' }; // 返回值会覆盖装饰器的参数
  }
}

```

## 自定义装饰器

### 元数据装饰器

SetMetadata 通常用于 **Middleware** **Guards** **Interceptors**

首先需要构建一个工厂函数来创建 Metadata 装饰器

```ts
// decorators/role.decorator.ts

export const Role = (...args: string[]) => SetMetadata("roles", args);
```

然后需要配合 **Middleware** **Guards** **Interceptors** 提供的 `ExecutionContext` 类型的参数和 `Reflector` 实例来获取反射值

```ts
// auth.guard.ts

const rolesValue = this.reflector.get("roles", ctx.getHandler());
```

<details>
<summary>
下面是封装 `SetMetadata` 的例子
</summary>

```ts
// decorators/role.decorator.ts

export const Role = (...args: string[]) => SetMetadata("roles", args);
```

```ts
import { Role } from "@/decorators/role.decorator";
import { Controller, UseGuards, SetMetadata } from "@nestjs/common";
import { GuardGuard } from "@/guard.guard";

@Controller("tryGuard")
@UseGuards(GuardGuard)
export class TryGuardController {
  @Get()
  @Role("admin")
  findAll() {
    return this.guardService.findAll();
  }
}
```

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

</details>

### 属性装饰器

下面是获取请求 url 的例子

```ts
// decorators/param.decorator.ts

import createParamDecorator from "@nestjs/common";

export const ReqUrl = createParamDecorator((data, ctx) => {
  const req = ctx.switchToHttp().getRequest();
  return req.url;
});
```

```ts
import { ReqUrl } from "@/decorators/param.decorator";

@Controller()
export class TestController {
  @Get()
  getAll(@ReqUrl() url: string) {
    return url;
  }
}
```

### 组合装饰器

```ts
import { applyDecorators } from "@nestjs/common";

export function Auth(...roles: Role[]) {
  return applyDecorators(
    SetMetadata("roles", roles),
    UseGuards(AuthGuard, RolesGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: "Unauthorized" })
  );
}
```

## express

```ts
findAll(@Res() res) {
  return res.send("hello");
}
```

res 就是 express 中的 res 对象

> 如果使用了 @Res(), nestjs 的 return 将会失效, 如果只希望部分使用 express, 需写为`@Res({passthrough: true})`
