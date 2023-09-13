# 装饰器

装饰器是一种特殊的声明, 类, 方法, 属性, 参数都可以被装饰.

## nest 参数装饰器

- `@Request(参数名?:string)` 通用的请求数据装饰器, 包括了以下三个装饰器, 后面的装饰器类似于一个语法糖
- `@Body(参数名?:string)` 装饰请求体参数
- `@Query(参数名?:string)` 装饰查询参数
- `@Param(参数名?:string)` 装饰路由参数

> 参数装饰器还可以直接加上参数名, 例如:@Param('id') 直接获取指定参数

下面是一个 Path(update)的例子

```ts
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }
```

## 自定义装饰器

### 普通装饰器

下面是封装 `SetMetadata` 的例子

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
