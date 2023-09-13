# Intercepter

Intercepter 拦截器可以统一的帮我们处理响应或异常

## 响应拦截器

可快速通过 `nest g f 拦截器名称` 来创建

创建拦截器

```ts
// response.interceptor.ts

interface Res<T> {
  data: T;
  code: number;
  msg: string;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<Res<T>> {
    return next.handle().pipe(
      map((data) => {
        return {
          data,
          code: 200,
          msg: "ok",
        };
      })
    );
  }
}
```

使用拦截器

```ts
// main.ts

import { ResponseInterceptor } from "./intercepters/response/response.interceptor";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalInterceptors(new ResponseInterceptor());
  await app.listen(3000);
}
```

## 异常拦截器

可快速通过 `nest g f 拦截器名称` 来创建

```ts
@Catch()
export class ExceptionFilter implements ExceptionFilterType {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();
    const status = exception.getStatus();

    res.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: req.url,
      msg: exception.message,
    });
  }
}
```

使用

```ts
// main.ts
import { ExceptionFilter } from "./filters/exception/exception.filter";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalFilters(new ExceptionFilter());
  await app.listen(3000);
}
```
