# webview

## preload

### 暴露接口给 render process

contextBridge.exposeInMainWorld

```ts
import { ipcRenderer, contextBridge } from "electron";

contextBridge.exposeInMainWorld("ipcRenderer", {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args;
    return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args));
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args;
    return ipcRenderer.off(channel, ...omit);
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args;
    return ipcRenderer.send(channel, ...omit);
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args;
    return ipcRenderer.invoke(channel, ...omit);
  },
});
```

### webview

webview 的 preload 只支持 file 协议, 所以我们需要先获取 preload 的实际路径

```ts
// electron/main.ts

ipcMain.on("get-webview-preload-path", (event, file) => {
  // __dirname和main.ts同级, 例如 /home/ruinb0w/electron/main.ts
  // 那么__dirname 就是 /home/ruinb0w/electron
  const preloadPath = path.join(__dirname, file);
  event.reply("webview-preload-path", `file://${preloadPath}`); // 记得加上file协议
});
```

以下为 vue3 的例子

> window.ipcRender 在 browserWindow 的 preload 里进行了声明

```vue3
// renderer/index.vue

<script setup>
const preloadPath = ref("");

window.ipcRender.on('webview-preload-path', (_, data)=>{
    preloadPath.value = data
})
onMounted(()=>{
    // 按照上面的路径, 实际获取到的就是 file:///home/ruinb0w/electron/libs/webview-preload.js
    window.ipcRender.send('get-webview-preload-path', 'libs/webview-preload.js')
})
</script>
```
