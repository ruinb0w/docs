# middleware

通过 `nest g mi 名称` 创建中间件, 生成的中间件类似下面

```ts
import { Injectable, NestMiddleware } from "@nestjs/common";
import { Response, Request, NextFunction } from "express";

@Injectable()
export class BlockMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log("do some");
    res.send("blocked by middleware");
  }
}
```

> req, res, next 的类型可以通过 express 引入

## 全局中间件

### nest module 形式

```ts
import { MiddlewareConsumer, NestModule, Module, RequestMethod } from "@nestjs/common";
import { TestService } from "./test.service";
import { TestController } from "./test.controller";
import { BlockMiddleware } from "src/block/block.middleware";

@Module({
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 1. 在整个Controller中注册中间件
    consumer.apply(BlockMiddleware).forRoutes(TestController);
    // 2. 在/test路由下添加中间件
    consumer.apply(BlockMiddleware).forRoutes("test");
    // 3. 特定定路由和请求方法的中间件
    consumer.apply(BlockMiddleware).forRoutes({ path: "test", method: RequestMethod.POST });
  }
}
```

### express 形式

直接使用函数即可

```ts
export function BlockFunction(req: Request, res: Response, next: NextFunction) {
  console.log("do some");
  res.send("blocked by function");
}
```

函数形式还可以放入 `main.ts` 实现全局中间件

```ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { BlockFunction } from "src/block/block.middleware";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(BlockFunction); // 和 express 一样
  await app.listen(3000);
}
bootstrap();
```

## question

Q: 仅作用于 `/test/任意子路由`, `/test` 不生效?

```ts
consumer.apply(BlockMiddleware).forRoutes(TestController);
```
