# nestjs

## 简介

### IOC 和 DI

IOC(Inversion of Control) 是一种设计思想, 它允许将对象的创建和管理交给一个外部的容器来控制, 以此来降低对象之间的耦合.

DI(Dependency Injection) 是 IOC 的一种实现方式, 它指的是由外部容器（例如，Spring 框架）在运行期将依赖关系（即，一个对象与它的依赖项之间的关系，例如，一个对象需要另一个对象提供服务）注入到组件中。这使得组件之间的耦合性降低，提高了代码的可测试性和可维护性。

下面是一个不使用 IOC 的例子, 下面的 B,C 类和 A 强耦合, 但是可以通过依赖注入实现弱耦合.

```ts
class A {
  name: string;
  constructor() {
    this.name = "ruinb0w";
  }
  // 如果修改为下面这样, B,C都需要进行修改
  // constructor(name:string){
  //   this.name = name
  // }
}

class B {
  name: string;
  constructor() {
    this.name = new A().name;
  }
}

class C {
  name: string;
  constructor() {
    this.name = new A().name;
  }
}
```

```ts
class A {
  name: string;
  constructor() {
    this.name = "ruinb0w";
  }
}

class Container {
  mods: any;

  constructor() {
    this.mod = {};
  }

  provider(key: string, mod: any) {
    this.mods[key] = mod;
  }

  get(key: string) {
    return this.mods[key];
  }
}

const container = new Container();
// 当class A变化时我们只需要修改注入部分的代码即可
container.provider("a", new A());

class B {
  name: string;
  constructor(container: Container) {
    this.name = container.get("a").name;
  }
}

class C {
  name: string;
  constructor(container: Container) {
    this.name = container.get("a").name;
  }
}
```

## 装饰器

装饰器是一种特殊的声明, 类, 方法, 属性, 参数都可以被装饰.

### nest 参数装饰器

- `@Request(参数名?:string)` 通用的请求数据装饰器, 包括了以下三个装饰器, 后面的装饰器类似于一个语法糖
- `@Body(参数名?:string)` 装饰请求体参数
- `@Query(参数名?:string)` 装饰查询参数
- `@Param(参数名?:string)` 装饰路由参数

> 参数装饰器还可以直接加上参数名, 例如:@Param('id') 直接获取指定参数

下面是一个 Path(update)的例子

```ts
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }
```

## nestjs CLI

通过`nest --help` 可以查看所有的命令

### 常用命令

`nest new 项目名` 新建一个项目
`nest g module|mo 模块名` 创建一个新的模块
`nest g controller|co 模块名` 创建一个新的控制器
`nest g service|s 模块名` 创建一个新的控制器
`nest g resource|res 模块名` 创建一个 CURD 模板

## 其他

### 版本控制

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
