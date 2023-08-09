# vue-router

路由是单页面应用必不可少的功能, uniapp 已经帮你处理了路由, nuxt 则是通过文件结构来管理路由

## 安装

```bash
pnpm install vue-router@4
```

## 配置

```ts
// main.ts
const Home = { template: "<div>Home</div>" };
const About = { template: "<div>About</div>" };

const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});

// ...
app.use(router);
```

## 使用

### 404

```ts
const routes = [
// ...
  {
    path: "/:pathMatch(.*)",
    component: () => /* 404页面 */,
  }
]
```

### 导航守卫

```ts
router.beforeEach(async (to, from) => {
  console.log(to, from);
  // 在这里做一些检查
  if(/*检查不通过*/) router.push("/*登录或禁止操作页面*/")
});
```
