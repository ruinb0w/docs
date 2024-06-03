# middleware

## 简介

中间件(Middleware)在接收到请求时最先执行, 用于对请求数据进行预处理，例如：通过 token 获取用户信息, 然后绑定到 request 对象中

- 中间件可以执行任何代码
- 可以修改 `request` 和 `response` 对象
- 可以调用 `next()` 让 nestjs 继续执行后续响应操作, 也可以直接结束请求响应过程

## 创建

Middleware 可以是一个函数(像在 **express** 中的中间件一样), 也可以是一个 `NestMiddleware` 类, 如果是一个 `NestMiddleware` 类则需要使用 `@Injectable` 装饰器来声明该中间件可注入

通过 `nest g mi 名称` 创建中间件(通过命令创建的是实现了 NestMiddleware 的类)

<details style="border: 1px solid #eee; padding: 10px">
<summary style="cursor: pointer">
下面是一个日志中间件的例子
</summary>

```ts
// middleware/logger.middleware.ts

import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`${req.ip} request ${req.path} at ${new Date().toString()}`);
    next();
  }
}
```

可以改写为函数形式

```ts
// middleware/loggerFn.middleware.ts

export function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
  console.log(`${req.ip} request ${req.path} at ${new Date().toString()}`);
  next();
}
```

</details>

## 绑定

函数 Middleware 可以通过 `app.use()` 绑定到全局, 类则通过通过实现 `NestModule` 类的方式来绑定到 Module

<details>
<summary style="cursor: pointer">
    使用 app.use() 绑定到全局的例子
</summary>

```ts
// main.ts
import { loggerMiddleware } from "./middleware/loggerFn.middleware";

app.use(loggerMiddleware);
```

</details>

<details>
<summary style="cursor: pointer">
    绑定到 Module 的例子
</summary>

```ts
// app.module.ts

import { LoggerMiddleware } from "./middleware/logger.middleware";

@Module()
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("cats");
  }
}
```

</details>

无论是使用 `app.use()` 或者绑定到 Module，都可以设置路由, 且路由支持模糊匹配, 例如

```ts
app.use("/cats", loggerMiddleware);
app.use("/c*ts", loggerMiddleware);
```

或者

```ts
consumer.apply(LoggerMiddleware).forRoutes("cats");
consumer.apply(LoggerMiddleware).forRoutes("c*ts");
```

## consumer 对象

**apply**

支持一次注册多个中间件

```ts
consumer.apply(LoggerMiddleware, cors(), helmet()).forRoutes("cats");
```

**exclude**

方法支持排除某些路由, 并且支持正则表达式

**forRoutes**

支持多种形式的路由

- 字符串, 例如"cats","cats/hello","ab\*cd"
- 请求类型, 例如 `consumer.apply(LoggerMiddleware).forRoutes({ path: 'cats', method: RequestMethod.GET })`
- controller, 例如 `consumer.apply(LoggerMiddleware).forRoutes(CatsController)`

## question

Q: 仅作用于 `/test/任意子路由`, `/test` 不生效?

```ts
consumer.apply(BlockMiddleware).forRoutes(TestController);
```
