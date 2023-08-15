# typescript

## 类型声明

### ReturnType

使用 `ReturnType` 声明类型为函数返回值

```ts
import getA from "@/apis";

let a: ReturnType<typeof getA>;
```

### Awaited

使用 `Awaited` 声明类型为 fullfilled Promise

```ts
let p = new Promise();

let a: Awaited<p>;
```
