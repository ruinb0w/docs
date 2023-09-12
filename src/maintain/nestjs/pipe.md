# Pipe 管道

管道用于转换前端数据或对前端数据进行检查

常用管道: `ValidationPipe` `ParseIntPipe` `ParseFloatPipe` `ParseBoolPipe` `ParseArrayPipe` `ParseUUIDPipe` `ParseEnumPipe` `DefaultValuePipe`

## 解析

解析参数时会用到 `Parse*Pipe` 等管道, 以 `ParseIntPipe` 为例如果参数不是数字, 则会抛出异常, 如果是有效的数字则将参数转为数字

```ts
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    console.log(typeof id == 'number'); // true
    return this.pipeService.findOne(+id);
  }
```

## ValidationPipe

### 局部验证

ValidationPipe 可以用于验证参数是否符合某个约定

> 自定义验证管道需要用到 [class-validator](https://www.npmjs.com/package/class-validator) 和 [class-transformer](https://www.npmjs.com/package/class-transformer) 包
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

### 全局验证

第一步和局部验证相同都是需要声明 DTO

第二部使用 ValidationPipe 时在 main.ts 中使用

```ts
// main.ts

app.use();
```
