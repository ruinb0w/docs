# fundamental

nestjs 项目核心有三种文件 controller, provider, module

- controller 用于处理请求和响应, 并通过装饰器来绑定路由
- provider(service) 用于处理业务逻辑
- module 用于组合相关功能, 管理依赖注入

## Controller

### 示例

通过`nest g controller|co 控制器名称` 可以创建一个控制器

```sh
nest g controller cats
```

```ts
// cats.controller.ts

import { Controller, Get } from "@nestjs/common";

@Controller("cats") // 这里声明了路由地址
export class CatsController {
  @Get() // 这里声明了Get方法的路由, 通过get: /cats 访问
  findAll(): string {
    return "This action returns all cats";
  }
  @Get("breed") // 这里声明了Get方法的路由, 通过get: /cats/breed 访问
  breedCat(): string {
    return "breed cat";
  }
}
```

### 返回值

controller 的返回值如果是 object 或 array 则会转为 json, 否则将直接返回

### 要点

#### 顺序影响路由

和 express 一样, 路由的顺序会影响路由, 可能导致后一个路由被前一个路由拦截

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

Provider 有多种, 其中最常用的就是 `service`, 除此之外还有 repositories, factories, helpers 等

## Module

### 共享模块

模块默认是独立的, 如果我们希望将一个模块的 `provider` 实例共享给另一个模块, 需要在**提供共享**的模块的 `exports` 字段中声明该 `provider`, 然后在**需要共享**的模块的 `imports` 字段中导入, 否则 `provider` 的实例将不会共享

下面是一个例子, 如果不做这两步, 则 CatsModule 的 CatsService 实例将不会共享给 UsersModule

<details>
<summary style="cursor: pointer">
代码
</summary>

```ts
// src/cats/cats.module.ts

import { CatsService } from "src/cats/cats.service";

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService], // 1.在这里导出 CatsService
})
export class CatsModule {}
```

```ts
// src/users/users.module.ts

import { CatsModule } from "src/cats/cats.module";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [CatsModule], // 2.在这里导入CatsModule
})
export class UsersModule {}
```

</details>

### 重导出模块

```ts
@Module({
  imports: [CommonModule],
  exports: [CommonModule],
})
export class CoreModule {}
```

### 全局模块

声明一个模块为全局模块后就不需要在需要共享其 `provider` 实例的其他模块中手动导入了

```ts
// src/cats/cats.module.ts

import { CatsService } from "src/cats/cats.service";

@Global()
@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService], // 在这里导出 CatsService
})
export class CatsModule {}
```

### 动态模块

动态模块可以动态的创建模块, 指定 provider 和 exports

```ts
import { Module, DynamicModule } from "@nestjs/common";
import { createDatabaseProviders } from "./database.providers";
import { Connection } from "./connection.provider";

@Module({
  providers: [Connection],
  exports: [Connection],
})
export class DatabaseModule {
  static forRoot(entities = [], options?): DynamicModule {
    const providers = createDatabaseProviders(options, entities);
    return {
      module: DatabaseModule,
      providers: providers,
      exports: providers,
    };
  }
}
```

`forRoot` 方法的返回值是一个动态模块, 该方法名称是自定义的, 通常对于在根模块导入时使用 `forRoot` 作为方法名
`@Module()`中的参数为默认参数, `forRoot` 方法的返回值不会覆盖该参数
