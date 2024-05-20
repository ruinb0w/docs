创建项目后有可以看到几个核心文件 `app.controller.ts` `app.module.ts` `app.service.ts`

```ts
// app.module.ts

import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

```ts
// app.controller.ts

import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
```

```ts
// app.service.ts

import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello World!";
  }
}
```

controllers 控制路由, services 负责具体业务逻辑, module 将功能整合在一起, 并注入

## Controller

### 路由的顺序影响效果

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

Provider 有多种, 其中最常用的就是 `service`

## Pipe

Pipe 主要用于转换(transformation)和校验(validation)数据

nestjs 提供了一些预设的 pipe, 如 `ParseIntPipe`, 下面是一个用例

```ts
// users.controller.ts

@Get()
function getOne(@Param('id', ParseIntPipe) id: number) {
  return { id };
}
```

如果 id 不能转换为 int 类型则会返回错误

```ts
{
    "message": "Validation failed (numeric string is expected)",
    "error": "Bad Request",
    "statusCode": 400
}
```

### DTO

DTO(Data Transformation Object) 用于定义数据的转换和校验规则

创建 DTO 时需要 `class-validator` `class-transformer`, 需要通过他们来实际执行校验数据的工作

```bash
pnpm i class-validator class-transformer
```

下面是一个创建用户的 DTO 的例子

```ts
// userCreate.dto.ts
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserDto {
  @IsString() // 必须是字符串
  @IsNotEmpty() // 必须不为空
  name: string;

  @IsNumber() // 必须是数字
  age: number;
}

export class UserCreateDto {
  name: string;
  id: string;
}
```

有了 create,通常意味着我们还需要 update,而 update 的参数通常是 create 的一部分, 这时我们可以方便的用 nestjs 提供的 `PartialType`

先安装一下

```bash
pnpm i @nestjs/mapped-types
```

```ts
// userUpdate.dto.ts
import { PartialType } from "@nestjs/mapped-types";
export class updateUserDTO extends PartialType(CreateUserDto) {}
```

创建好 DTO 之后我们需要引入 ValidationPipe 让控制器能根据 DTO 来校验数据

```ts
// users.controller.ts
import {CreateUserDto} from "./dot/userCreate.dto";
import {UpdateUserDto} from "./dot/userUpdate.dto";
import {ValidationPipe} from "@nestjs/common";

@Post()
createUser(@Body(validationPipe) dto: UserCreateDto) {
  return dto;
}

@Patch(":id")
updateUser(@Params('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  return {updateUserDto,id};
}
```

## Exception

通过 exception 我们可以方便的在业务逻辑中抛出错误

```ts
// users.service.ts

import { NotFoundException } from "@nestjs/common";

export class UsersService {
  users = [{ id: 1, name: "xiaobai", age: 10 }];

  getOne(id: number) {
    const user = this.users.find((item) => item.id === id);
    if (!user) throw new NotFoundException("Not Found User");
    return user;
  }
}
```

## Question

1. 如何定义 mongodb 的 ObjectId 校验?
2. 如果自定义错误的返回值?
