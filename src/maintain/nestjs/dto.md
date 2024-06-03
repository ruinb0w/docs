# DTO

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

## Question

1. 如何定义 mongodb 的 ObjectId 校验?
