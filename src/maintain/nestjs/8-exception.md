# Exception

nestjs 对异常进行了包装, 通过 exception 我们可以方便的在业务逻辑中抛出错误

nestjs 使用 `HttpException(异常信息, 状态码)` 抛出异常

- 默认情况下会返回 `statusCode` 和 `message` 字段
- 异常信息
  - 如果异常信息为字符串时会默认放在 message 字段返回
  - 如果异常信息是一个对象则会按照对象内容进行返回
- 状态码可以使用 nestjs 提供的 `HttpStatus` 是一个 enum 包含了所有的状态码

下面是一个例子

```ts
// users.service.ts

import { NotFoundException } from "@nestjs/common";

export class UsersService {
  users = [{ id: 1, name: "xiaobai", age: 10 }];

  getOne(id: number) {
    const user = this.users.find((item) => item.id === id);
    if (!user) throw new HttpException("Not Found User", HttpStatus.NOT_FOUND);
    return user;
  }
}
```

## 自定义异常

自定义异常需要继承 `HttpException`

```ts
export class ForbiddenException extends HttpException {
  constructor() {
    super("Forbidden", HttpStatus.FORBIDDEN);
  }
}
```

```ts
@Get()
async findAll() {
  throw new ForbiddenException();
}

```

## nestjs 内建异常

- BadRequestException
- UnauthorizedException
- NotFoundException
- ForbiddenException
- NotAcceptableException
- RequestTimeoutException
- ConflictException
- GoneException
- HttpVersionNotSupportedException
- PayloadTooLargeException
- UnsupportedMediaTypeException
- UnprocessableEntityException
- InternalServerErrorException
- NotImplementedException
- ImATeapotException
- MethodNotAllowedException
- BadGatewayException
- ServiceUnavailableException
- GatewayTimeoutException
- PreconditionFailedException

## 异常过滤器

异常过滤器通过 `@Catch()` 装饰器来声明, 并需要实现 `ExceptionFilter`. 异常过滤器可以用于处理**所有未处理的异常**或者**统一处理特定的异常**, 下面是 HttpException 的例子

```ts
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from "@nestjs/common";
import { Request, Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
```

`@Catch(HttpException)` 装饰器表示只捕获 `HttpException` 类型的错误, 如果想捕获所有未处理的错误，可以使用 `@Catch()`

`catch(exception: HttpException, host: ArgumentsHost)`

- `exception` 包含的是 `HttpException` 抛出的错误内容
- `host` 包含了请求信息和响应信息

## 绑定异常过滤器

异常过滤器可以绑定在某个路由, 例如 `@Get('cats')`, 可以绑定某个 controller, 也可以绑定到某个 module 或是全局

### 绑定路由

```ts
@Get()
@UseFilters(HttpExceptionFilter)
findAll(){
  return "This action returns all cats"
}
```

### 绑定 controller

```ts
@Controller()
@UseFilters(HttpExceptionFilter)
export class CatsController {
  @Get()
  findAll(): string {
    return "This action returns all cats";
  }
}
```

### 绑定 module

exception filter 不能直接注入到 module 中，需要使用 `provide` 和 `useClass` 字段

```ts
// cats.module.ts

import { APP_FILTER } from "@nestjs/core";

@Module({
  imports: [],
  controllers: [CatsController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: MongoDBExceptionFilter,
    },
  ],
})
export class AppModule {}
```

### 全局绑定

```ts
// main.ts
import HttpExceptionFilter from "./exception.filter";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalFilters(HttpExceptionFilter);
  await app.listen(3000, () => console.log("server start at: http://localhost:3000"));
}
bootstrap();
```

## Question

1. 如果自定义错误的返回值?
