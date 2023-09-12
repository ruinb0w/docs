# File

## Upload File

1. 文件上传需要用到[multer](https://github.com/expressjs/multer)包

```
pnpm i multer
pnpm i -D @types/multer
```

2. 在需要使用的模块中导入 MulterModule

```ts
import { MulterModule } from '@nestjs/platform-express';

@Module({
    imports: [
      MulterModule.register({
        storage: diskStorage({
          destination: join(__dirname, '../uploads'), // 指定存储位置
          filename: (_req, file, callback) => { // 自定义文件名
            const fileName = `${
              new Date().getTime() + extname(file.originalname)
            }`;
            return callback(null, fileName);
          },
        }),
    })]
})
```

3. 在相应的 controller 中使用

```ts
@Controller("test")
export class TestController {
  @Post("upload")
  @UseInterceptors(FileInterceptor("file")) // 使用FileInterceptor来处理文件
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    // 使用UploadedFile来接收文件
    console.log(file);
    return {
      code: 200,
    };
  }
}
```

## Download

### 方式 1: 二进制文件下载

二进制文件下载直接使用 `@Res` 装饰器即可

```ts
@Get('/download')
download(@Res() res: Response) {
    res.download(文件路径));
}
```

### 方式 2: stream 下载

#### 服务器端

下面的例子利用了 [compressing](./other#compressing) 包

```ts
import {zip} from "compressing";

@Get('stream')
async download(@Res() res: Response) {
    const stream = new zip.stream();
    await stream.addEntry(文件路径);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename=${文件名}`);
    stream.pipe(res);
}
```

下面的例子使用了 nestjs 的 [StreamableFile](https://docs.nestjs.com/exception-filters#streamablefile)

> passthrough 参数表示手动进行相应, 使用了 `@Res` 装饰器但不使用该参数会导致相应阻塞

```
@Get('stream')
downloadFile(@Res({ passthrough: true }) res: Response) {
    const file = createReadStream(join(__dirname, '..', 'uploads', 'imgs.zip'));
    res.set({
      'Content-Disposition': 'attachment; filename="imgs.zip"',
    });

    return new StreamableFile(file);
}
```

#### 前端

```vue
<setup lang="ts">
async function download() {
  const res = await fetch("http://localhost:3000/stream").then((res) => res.ArrayBuffer());
  const blob = new Blob([res], { type: "application/octet-stream" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "test.zip";
  a.click();
  document.body.removeChild(a);
}
</setup>
```

## Static Server

### 方式 1: 在 main.ts 中配置

```ts
app.useStaticAssets(
  join(__dirname, "uploads"), // 静态文件目录
  { prefix: "/imgs" } // 静态文件访问前缀, 默认为 '/'
);
```

### 方式 2: 在 app.module.ts 中配置

```bash
pnpm i @nestjs/serve-static
```

```ts
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'uploads'), // 静态文件目录
      serveRoot: '/imgs', // 静态文件访问前缀, 默认为 '/'
    }),
  ],
})
```
