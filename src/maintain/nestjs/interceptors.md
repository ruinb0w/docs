# Interceptors

拦截器是一种特殊的 provider, 用他我们可以在请求处理函数(route handler)前后做一些事

拦截器需要实现 `NestInterceptor` 并通过 `@Injectable()` 进行声明

拦截器可以通过 `@UseInterceptors(拦截器)` 装饰器绑定到 **controller**, **route handler**, 使用 `app.useGlobalInterceptors(拦截器)` 来全局绑定

拦截器需要配合 [rxjs](https://rxjs.dev/) 使用

## 例子

```sh
nest g itc login
```

```ts
// login.interceptor.ts

import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class LoginInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle();
  }
}
```

需要注意的是, 拦截器中如果不执行 `next.handle()` 则路由处理函数则不会被执行
