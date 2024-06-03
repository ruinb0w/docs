# mongodb

nestjs 提供了一个 `@nestjs/mongoose` 模块让用户更方便的在 nestjs 中使用 mongoose

## 使用

### 安装

```ts
pnpm i @nestjs/mongoose mongoose
```

### 使用步骤

1. 先在 AppModule 中导入 MongooseModule, 以便后续使用时连接数据库
2. 编写 schema
3. 在要使用数据库的 module 中导入 schema 并绑定集合名
4. 在对应 service 中使用 model

#### AppModule 导入 MongooseModule

```ts
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://账号:密码@localhost:27017/数据库?authSource=验证数据库"),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

#### 编写 mongooseSchema

```ts
// cat.schema.ts

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { UserInterface } from "../user/user.schema";

export type CatDocument = HydratedDocument<Cat>;

@Schema()
export class Cat {
  @Prop(String)
  name: string;

  @Prop(Number)
  age: number;

  @Prop(String)
  breed: string;

  @Prop({ required: true, type: Number })
  createTime: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "users" })
  owner: UserInterface;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
```

```ts
// user.Schema.ts

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

export interface UserInterface {
  name: string;
  email: string;
}

@Schema()
export class User implements UserInterface {
  @Prop(String)
  name: string;

  @Prop(String)
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
```

#### 在要使用的 Module 中绑定集合和模式

使用 `MongooseModule.forFeature({name: 集合名, schema: 模式})` 方法来导入 schema

```ts
import { MongooseModule } from "@nestjs/mongoose";
import { CatSchema } from "src/schema/cat/cat.schema";
import { UserSchema } from "src/schema/user/user.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "cats", schema: CatSchema },
      { name: "users", schema: UserSchema },
    ]),
  ],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
```

#### 在 service 中使用

```ts
// cats.service.ts

import type { Model } from "mongoose";
import type { CatDocument } from "src/schema/cat/cat.schema";
import { Injectable } from "@nestjs/common";
import { CreateCatDto } from "./dto/create-cat.dto";
import { UpdateCatDto } from "./dto/update-cat.dto";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class CatsService {
  constructor(@InjectModel("cats") private catModel: Model<CatDocument>) {}

  create(createCatDto: CreateCatDto) {
    const createdCat = new this.catModel({
      ...createCatDto,
      createTime: Date.now(),
    });
    return createdCat.save();
  }

  findAll() {
    return this.catModel.find().populate("owner", "name email");
  }

  findOne(id: string) {
    const cat = this.catModel.findById(id);
    return cat;
  }

  update(id: string, updateCatDto: UpdateCatDto) {
    return this.catModel.findByIdAndUpdate(id, updateCatDto, { new: true });
  }

  remove(id: string) {
    return this.catModel.findByIdAndDelete(id);
  }
}
```

通过 `constructor(@InjectModel("cats") private catModel: Model<CatDocument>) {}` 来注入模型后即可像在 mongoose 中一样使用

> `populate("owner", "name email")` populate 可以进行关联查询, owner 为要关联的字段, name 和 email 为关联数据的字段
