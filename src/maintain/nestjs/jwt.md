# JWT

## 安装

```sh
pnpm install  @nestjs/jwt
```

## 使用

### 配置 secret

> 以下仅为示例, 生产环境中应该使用环境变量

```ts
export const jwtConstants = {
  secret:
    "DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.",
};
```

### 引入 JWT 模块

```ts
// auth.module.ts

import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";

@Module({
  imports: [
    JwtModule.register({
      global: true, // 全局注册
      secret: jwtConstants.secret, // 密钥
      signOptions: { expiresIn: "60s" }, //超时时间
    }),
  ],
})
export class AuthModule {}
```

### 生成 token

使用 `jwtService.signAsync(payload)` 来生成 token

```ts
// auth.service.ts

import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async signIn(username: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.userId, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
```

### 全局使用 Guard 并配置白名单

```
// app.module.ts

@Module(providers: [
  {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },
])

```

### 设置白名单装饰器

```ts
// decorators/auth.decorator.ts

export const Public = () => SetMetadata("isPublic", true);
```

### 校验 token

使用 `jwtService.verifyAsync(token, { secret })` 对 token 进行校验

<details>
<summary>示例代码</summary>

```ts
// auth.guard.ts

import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    const isPublic = this.reflector.getAllAndOverride<boolean>("isPublic", [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      request["user"] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
```

</details>
