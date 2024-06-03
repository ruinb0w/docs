# DI

nestjs 利用 DI 模型来实现依赖注入, 并降低对象之间的耦合度, [详见](../../concept/ioc.md)

- `*.module.ts` 中管理注入
- `*.service.ts` 要注入的服务
- `*.controller.ts` 使用服务的控制器

## Service

通过 `@Injectable()` 来将一个 class 声明为服务

### 自定义注入

如下在 module 中通过 provide 字段来自定义注入名称

```ts
@Module({
  controllers: [UserController],
  providers: [
    {provide: 'A', useClass: UserService },
    {provide: 'B', useValue: ['hello','world']},
    {provide: 'C', Inject: UserService,useFactory: (userService:UserService) => {
      console.log(userService)
      return 'hello world'
    }}
  ],
})
```

在控制器中使用 `@Inject(自定义名称)` 来注入 service

```ts
@Controller("user")
export class UserController {
  constructor(
    @Inject("A") private readonly userService: UserService,
    @Inject("B") private readonly b: string[],
    @Inject("C") private readonly c: string
  ) {
    console.log(this.userService, this.b, this.c);
    return "ok";
  }
}
```

### 共享服务

注入后直接使用即可

1. 引入要使用的服务

```ts
// src/test/test.module.ts

import {ListService} from "@/list/list.service";

@Module({
  controllers: [TestController],
  providers: [TestService, ListService],
})
```

2. 注入服务并使用

```ts
// src/test/test.controller.ts

import { ListService } from "@/list/list.service";

export class TestController {
  constructor(
    private readonly testService: TestService,
    private readonly listService: ListService
  ) {}

  @Get()
  getList() {
    return this.listService.getList();
  }
}
```

## Module

### 全局模块

```ts
// src/user/user.module.ts

@Global() // 声明为全局模块
@Module({
  controllers: [UserController],
  providers: [UserService]
  exports: [UserService] // 即使声明为全局模块还是需要手动导出服务
})
```

```ts
// src/list/list.module.ts

import {UserModule} from "@/user/user.module";

@Module({
  import: [UserModule], // 引入要使用的全局模块, 引入后即可在controller中使用
  controllers: [ListController],
  providers: [ListService]
})
```

### 动态模块

如果需要给引入的模块加载额外的功能或参数, 可以使用动态模块

动态模块需要声明一个静态方法, 名字任意, 但通常为 `forRoot()`. 这个方法返回一个 `DynamicModule`, 该返回值的类型参数和 `@Module({})` 的唯一区别是增加了一个`module`属性, 其值需要指定为类的名字

```ts
// src/list/list.module.ts

@Global()
@Module({})
export class ListModule {
  static forRoot(options: { name: string }): DynamicModule {
    const configOptions = { provide: "CONFIG_OPTIONS", useValue: options };

    return {
      module: ListModule,
      controllers: [ListController],
      providers: [configOptions], // 导出configOptions前需要先将其声明为providers, 否则不能导出
      exports: [configOptions],
    };
  }
}
```

引入动态模块和普通全局模块没有什么区别, 只需传入相应的参数即可

```ts
// src/user/user.module.ts

import {ListModule} from "@/list/list.module";

@Module({
  imports: [ListModule({ name: "test" })],
  controllers: [UserController],
  providers: [UserService]
})
```

```ts
// src/user/user.controller.ts

export class TestController {
  constructor(@Inject("CONFIG_OPTIONS") private readonly config: { name: string }) {}

  @Get()
  getList() {
    return {
      code: 200,
      name: this.config.name,
    };
  }
}
```
