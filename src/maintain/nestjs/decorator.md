# 装饰器

装饰器是一种特殊的声明, 类, 方法, 属性, 参数都可以被装饰.

## nest 参数装饰器

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
