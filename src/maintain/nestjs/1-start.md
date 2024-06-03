# nestjs

## 简介

渐进式 nodejs web 框架, 提供了许多功能模块, 并提供了两种引擎(express, fastify). 对 ts 支持十分友好, 通过 DI 模型来实现依赖注入和低耦合

## 引擎

nestjs 支持 express(默认) 和 fastify 两种引擎

如果需要特定引擎的 ts 类型支持, 可以通过以下方式(例子为 express)

```ts
import type { NestExpressApplication } from "@nestjs/platform-express";

const app = await NestFactory.create<NestExpressApplication>(AppModule);
```

## 脑图

![](https://s2.loli.net/2024/05/30/HCZUosNDWfcryQa.png)

# Pipe

## 简介

Pipe 主要用于前端请求数据的转换和检验

## 创建

Pipe 是一个 class 通过 `@Injectable()` 进行装饰, 并实现了 `PipeTransform` 接口,

下面是一个自定义 Pipe 的例子, nestjs [内置了许多 Pipe](/src/maintain/nestjs/1-start#buildinpipe) 可以直接使用

```ts
import { PipeTransform, Injectable, ArgumentMetadata } from "@nestjs/common";

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return value;
  }
}
```

### transform 方法

transform 方法接收两个参数

- 第一个参数是需要检验或转换的原始数据
- 第二个参数是元数据, 定义如下

```ts
export interface ArgumentMetadata {
  type: "body" | "query" | "param" | "custom";
  metatype?: Type<unknown>;
  data?: string; // 请求数据装饰器传入的请求字段字符, 例如@Param('id', 管道), 得到的就是 'name'
}
```

## 绑定

使用范围

- **请求数据装饰器**: 例如`@Param('id', ParseIntPipe)`
- **全局**: 可以绑定到 `main.ts` 或者 module 中

下面是绑定到请求数据装饰器的例子

```ts
@Get(':id')
async findOne(@Param('id', ParseIntPipe) id: number) {
  return this.catsService.findOne(id);
}
```

下面是绑定到全局的例子

绑定到 `main.ts`

```ts
app.useGlobalPipes(new ValidationPipe());
```

绑定到 module

```ts
@Module({
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
```

## buildinPipe

## Interceptors

## ExceptionFilters
