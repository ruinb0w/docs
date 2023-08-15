# electron

## 快速开始

### 安装

```sh
pnpm create vite

# 在Select a framework选项选择others, 然后选择create-electron-vite

cd 项目
pnpm i # 安装依赖
```

### 开发和打包

```sh
pnpm dev # 启动开发服务
pnpm build # 打包
```

## 示例

下面是一个简单的 **electron** 应用示例

```ts
// main.ts

import { app, BrowserWindow } from "electron";
import path from "node:path";

let win: BrowserWindow | null;
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
  });
  win.loadURL(VITE_DEV_SERVER_URL);
}

app.on("window-all-closed", () => {
  win = null;
});

app.whenReady().then(createWindow);
```

## app

`app` 作为 electron 的入口管理 electron 应用的整个生命周期

## 进程

electron 为了安全, 和程序管理需要, 创建了主进程和渲染进程的概念, 并将主进程和渲染进程隔离.

可以简单的把 `main.ts` 中的代码看作是主进程, `preload.ts` 和 `win.loadURL()` 的内容看做渲染进程

### 进程通信

进程通信需要借助 `preload.js` 文件, 这个文件会自动注入到 `win.loadURL()` 的页面中.

然后我们还需要通过 electron 提供的 `ipcMain` 和 `ipcRender` 接口来实现通信.

> 注意`webPreferences`的`nodeIntegration`要设置为 true, 因为只有这样 `preload.js` 才能使用 nodejs

下面是一个例子, 向页面全局注入一个 `exitApp` 方法, 当该方法被调用时, 退出应用

```ts
// main.ts

import { ipcMain } from "electron";

app.whenReady().then(() => {
  //...
  ipcMain.on("exit-app", () => {
    app.quit();
  });
});
```

```ts
// preload.ts

import { ipcRenderer } from "electron";

window.exitApp = () => {
  ipcRenderer.send("exit-app");
};
```
