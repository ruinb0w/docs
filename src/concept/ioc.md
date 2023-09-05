# IOC

IOC(Inversion of Control) 是一种设计思想, 它允许将对象的创建和管理交给一个外部的容器来控制, 以此来降低对象之间的耦合.

## DI

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
