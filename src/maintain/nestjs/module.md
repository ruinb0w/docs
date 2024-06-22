# Module

## dynamic Module

```ts
// app.module.ts
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [ConfigModule.register({ folder: "config" })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

```ts
// config.module.ts

import { DynamicModule, Module } from "@nestjs/common";
import { ConfigService } from "./config.service";

@Module()
export class configModule {
  static register(options) {
    return {
      module: ConfigModule,
      providers: [ConfigService.register({ folder: "config" })],
      exports: [ConfigService],
    };
  }
}
```

```ts
// config.service.ts

@Injectable
export class ConfigService {
  constructor(private config: Config) {}
  static register() {}
}
```
