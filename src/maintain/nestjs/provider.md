# Provider

provider 利用了 nestjs 的 Ioc(inversion of control) 系统来实现依赖注入:

1. 首先我们通过 `@Injectable` 来将一个 class 声明为可注入
2. 然后我们在 `@Controller` 装饰的 class 的 constructor 中引入该依赖
3. 最后在 `@Module` 装饰的模块中关联控制器和依赖

## 对象 provider

`@Module()` 装饰器的参数中的 `providers` 字段支持多种多种参数, 默认的引入 class 实际效果如下

```ts
@Module ({
  controllers: [CatsController],
  providers: [CatsService],
})

// 等价于

@Module({
  controllers: [CatsController],
  providers: [
    {
      provide: CatsService,
      useClass: CatsService,
    },
  ],
})
```

我们也可以指定一个对象或值来作为 provider 的实例, 这样我们就可以在不改变 provider token 的情况下修改实际的 provider

```ts
const mockCatsService = {
  findAll: () => 'test',
};

@Module({
  providers: [{
    provide: CatsService,
    useValue: mockCatsService
  }],
})
```

## provider token

所谓的 provider token 就是 provide 字段提供的值, 该值会被 nestjs 的 IOC 系统自动处理, 我们也可以指定一个字符串来作为 provider token,
但这样需要我们使用`@Inject('CONNECTION')` 来手动指定 provider 的 token

```ts
// some.module.ts

@Module({
  providers: [
    {
      provide: 'CONNECTION',
      useValue: connection,
    },
  ],
})
```

```ts
// some.controller.ts

@Injectable()
export class CatsRepository {
  constructor(@Inject("CONNECTION") connection: Connection) {}
}
```
