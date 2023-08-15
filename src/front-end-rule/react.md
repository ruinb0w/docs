# react

## 快速开始

```sh
pnpm create vite

# 选择react
```

## jsx

react-jsx 有如下几个规则或约定:

1. 表达式用 `{}` 包裹
2. 类名用 `className` 而不是`class`
3. 内联样式用

```
style={{key:value}}
```

### 变量

1. 变量可以直接存储标签, 而不是标签字符串

例如

```
const name = <h1>ruinb0w</h1>
const age = <h2>10</h2>
const user = (
    <div>
        {name}
        {age}
    </div>
);
```

### 组件

组件约定首字母大写, 组件可以以标签形式或函数调用形式来进行渲染, 建议用标签形式

```
const User = () => {
  const name = <h1>ruinb0w</h1>;
  const age = <h2>10</h2>;
  const user = (
    <div>
      {name}
      {age}
    </div>
  );

  return user;
};

export default () => {
  return (
    <div>
      {User()} // 函数调用
      <User /> // 标签形式
    </div>
  );
}
```

## hook

### useState

`useState` 用于状态管理, 让 react 知道哪里状态需要重新进行渲染.

```
const [name, setNmae] = useState("xiaobai");
name = "xiaohei"; // name的值改变了, 但是页面不会重新渲染
setName("xiaohong"); // name的值改变了, 并且页面重新渲染了
```

### useEffect

`useEffect` 可以在 react 的三个生命周期中触发, mounting, updating, unmouting.

```
useEffect(()=>{
console.log("mouting 和 updating 会执行这个函数")

return ()=>{
    console.log("unmounting会执行这个函数")
}
}, []) // 数组中是要监听的状态变量, 默认是全部, 放一个空数组则不监听.
```

### useContext

`useContext`可以避免 props drill, 该 hook 需要配合`createContext`使用, 具体为以下几个步骤

1. 祖先组件通过`const Context = createContext`创建上下文
2. 祖先组件通过`<Context.Provider value={要暴露的内容}>` 包裹后代组件并指定要暴露的内容
3. 子组件通过`const value = useContext(ParentContext)` 获取祖先组件暴露的内容

下面是一个例子

```
// Parent.js
import { createContext, useState } from "react";
import ChildCom from "ChildCom";

export ParentContext = createContext(); // 创建一个上下文

export default ()=>{
    const [name, setName] = useState("ruinb0w");

    return (
        /* 通过value属性来指定要暴露的内容 */
        <ParentContext.Provider value={{name}}>
            /* 通过Provider包裹子组件, 使子组件可以获取上下文 */
            <ChildCom />
        </ParentContext.Provider>
    )
}
// ChildCom.js
import { useState, useContext } from "react";
import { ParentContext } from "./Parent";

export default ()=>{
    // 通过useContext来获取ParentContext
    const {name} = useContext(ParentContext);

    return <div>name from parent context: {name}</div>
}
```

## 生态

### react-router-dom

react-router-dom 用于 react 的路由, 其提供了以下几个组件

- `Route` 绑定路由和组件. 提供了`path`属性来指定路径, `element`属性来指定组件
- `Routes` 包裹`Routes`
- `BrowserRouter` 包裹`Routes`和`Link`
- `Link` 用于跳转. 提供了`to`属性来指定路径

下面是一个例子

```
<Router>
    <div className="nav-bar">
        <Link to="/">Home</Link>
        <Link to="/config">Config</Link>
    </div>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/config" element={<Config />} />
    </Routes>
</Router>
```

### react-query

官网链接: [react-query](https://tanstack.com/query/v3/)

react-query 网络数据状态管理工具, 方便我们对请求的数据进行管理.

下面是使用 react-query 的一个简单步骤

1. 使用`QueryClient`创建一个请求客户端
2. 使用`QueryClientProvider`包裹需要使用 react-query 的组件,并指定 client 为 queryClient
3. 子组件使用`useQuery`来包裹请求, 请求返回值会被 react-query 处理并得到一个对象

```
// App.js
import { QueryClient, QueryClientProvider } from "react-query";

// 创建queryClient
const queryClient = new QueryClient();

export default ()=>{
    return (
        {/* 使用QueryClientProvider 包裹需要使用react-query的组件,
            并指定client为queryClient
        */}
        <QueryClientProvider client={queryClient}>
            <MyCom/>
        </QueryClientProvider>
    )
}
// MyCom.js
import { useQuery} from "react-query";
import axios from "axios";

export default ()=>{
    const {data} = useQuery(["请求关键词"], async ()=>{
        return axios.get("地址").then(res=>res.data)
    })
}
```

#### QueryClient

部分函数签名如下

```
interface Config {
  defaultOptions: {
    queries: {
      refetchOnMount: false; // mounting时重新请求, 默认true
      refetchOnWindowFocus: false; // 窗口聚焦时重新请求, 默认true
    }
  };
}
type QueryClient = (config: Config) => QueryClient;
```

#### useQuery

部分函数签名如下

```
interface UseQueryResult {
  data: any; // awaited queryFn的返回值
  isLoading: boolean; // 是否正在请求
  isError: boolean; // 请求是否发生错误
  refetch: () => void; // 重新发送请求
}

type useQuery = (queryKey: string[], queryFn: () => Promise<unknown>) => UseQueryResult;
```

### react-hook-form

### yup

| name    | age |     |     |
| ------- | --- | --- | --- |
| xiaobai | 10  |     |     |
| xiaohei | 20  |     |     |
