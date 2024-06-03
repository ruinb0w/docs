# Pipe 管道

管道用于转换前端数据或对前端数据进行检查

nestjs 预设管道 `ValidationPipe` `ParseIntPipe` `ParseFloatPipe` `ParseBoolPipe` `ParseArrayPipe` `ParseUUIDPipe` `ParseEnumPipe` `DefaultValuePipe`

## transformPipe

解析参数时会用到 `Parse*Pipe` 等管道, 以 `ParseIntPipe` 为例如果参数不是数字, 则会抛出异常, 如果是有效的数字则将参数转为数字

下面是一个`ParseIntPipe` 的用例

```ts
// users.controller.ts

@Get()
function getOne(@Param('id', ParseIntPipe) id: number) {
  return { id };
}

// 如果 id 不能转换为 int 类型则会返回错误
// {
//    "message": "Validation failed (numeric string is expected)",
//    "error": "Bad Request",
//    "statusCode": 400
// }
```

### 自定义异常返回状态码

```ts
function getOne(@Parse("id", new ParseIntPipe({ errorHttpStatusCode: 400 })) id: number) {
  return { id };
}
```

### 自定义管道

```ts
import { PipeTransform, Injectable, ArgumentMetadata } from "@nestjs/common";

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return value;
  }
}
```

- value: 要转换的值
- metadata: 参数元数据
  - type: 'body' | 'query' | 'param' | 'custom';
  - metatype: 类型
  - data: 传入的参数名, 例如@Body('id'), data == 'id'

### transform 用例

下面的代码接收一个 `id` 参数, 然后使用 `UserByIdPipe` 来获取用户数据并返回

```ts
@Get(':id')
findOne(@Param('id', UserByIdPipe) userEntity: UserEntity) {
  return userEntity;
}
```

## ValidationPipe

### 局部验证

ValidationPipe 可以用于验证参数是否符合某个约定

自定义验证管道需要用到 [class-validator](https://www.npmjs.com/package/class-validator) 和 [class-transformer](https://www.npmjs.com/package/class-transformer) 包

> class-transformer 新版有问题, 可以降级到 `class-transformer@0.3.1`

1. 声明 DTO(Data Transfer Object)

```ts
// create-test.dto.ts

import { IsString, IsNumber, ValidatorOptions } from "class-validator";

export class CreatePipeDto {
  @IsString()
  name: string;
  @IsNumber()
  age: number;
}
```

2. 实例化 ValidationPipe 并引入 DTO

```ts
// test.controller.ts

@Post()
  create(@Body(new ValidationPipe()) createPipeDto: CreatePipeDto) {
    return this.pipeService.create(createPipeDto);
  }
```

## 全局 pipe

第一步和局部验证相同都是需要声明 DTO

第二部使用 ValidationPipe 时在 main.ts 中使用

```ts
// main.ts

app.useGlobalPipe(管道);
```

## 默认值

```ts
@Get()
async findAll(
  @Query('activeOnly', new DefaultValuePipe(false), ParseBoolPipe) activeOnly: boolean,
  @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
) {
  return this.catsService.findAll({ activeOnly, page });
}
```
