# Upload File

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
