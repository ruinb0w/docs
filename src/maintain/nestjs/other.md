# Other

## 版本控制

1. 在 `main.ts` 中开启版本控制

```ts
import { VersioningType } from "@nestjs/common";

//...
app.enableVersioning({ type: VersioningType.URI });
```

2. 在要使用版本控制的 `Controller` 中进行配置

```ts
@Controller({ path: 'user', version: '1' })

// 也可以针对特定的路由进行配置
@Get()
@Version('1')
findAll(){
    // ...
}
```

配置完成后我们访问时就需要加上以 v 开头的版本号, 例如: `localhost:3000/v1/user`

## compressing

[compressing](https://www.npmjs.com/package/compressing) 包, 支持各种压缩格式和流传输:

`tar` `gzip` `tgz` `zip`

## swagger

nestjs 配合 swagger 可以自动生成接口文档, 并且可以快速的进行测试, 详见 [nestjs-swagger](https://github.com/ruinb0w/nestjs-swagger)

### 使用

1. 在 `main.ts` 中引入 swagger

```ts
// libs/swagger.ts
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import type { INestApplication } from "@nestjs/common";

export function setupSwagger(app: INestApplication) {
  const swaggerConfig = new DocumentBuilder()
    .setTitle("Cats example")
    .addBearAuth()
    .setDescription("The cats API description")
    .setVersion("1.0")
    .build();
  SwaggerModule.setup("api", app, SwaggerModule.createDocument(app, swaggerConfig));
}
```

```
// main.ts

import {setupSwagger} from "@/libs/swagger";

setupSwagger(app);
```

2. 配置 swagger 插件

```
// nest-cli.json

"plugins": [
  {
    "name": "@nestjs/swagger/plugin",
    "options": {
      "classValidatorShim": false,
      "dtoFileNameSuffix": "dto"
    }
  }
]
```

### 常用的装饰器

`Apitags` 让 API 分组
`ApiResponse` 标识返回数据的格式和类型
`ApiOperation` 对接口进行描述说明
`ApiParam` 描述接口的参数
`ApiQuery` 描述接口的查询参数
`ApiProperty` 结合 DTO 配置 mock 等
`ApiBearerAuth` 配置 token(需要在创建文档对象时 `addBearAuth()`)

```ts
@Controller("users")
@ApiTags("Users")
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: "创建用户", description: "创建用户xxxx" })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(@Qeury() query: any)
  @ApiQuery({ name: "current", description: "分页" })
  findAll(): findAll[] {
    return [
      { name: "test", age: 1 },
      { name: "test2", age: 2 },
    ];
  }

  @Get(":id")
  @ApiParam({ name: "id", description: "用户id", required: true })
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(":id")
  @ApiResponse({ status: 200, description: "OK", type: updateUserDto, isArray: true })
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }
}
```

```ts
export class CreateUserDto {
  @ApiProperty({ example: "xiaobai" })
  name: string;
  @ApiProperty({ example: 10 })
  age: number;
}
```
