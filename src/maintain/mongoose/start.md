# mongoose

## schema

### 创建 Schema

```ts
const blogSchema = new Schema({
  title: String,
  author: String,
  body: String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs: Number,
  },
});
```

### \_id

在创建 Schema 时 mongoose 会自动加上 `_id` 字段, 如果手动写则需要使用者自行管理 `_id` 字段

```ts
const schema = new Schema({
  _id: Number,
  name: String,
});
```

### instance methods

```ts
const catSchema = new Schema(
  { name: String },
  {
    methods: {
      sayHi() {
        console.log(`Hi, my name is ${this.name}`);
      },
    },
  }
);
const catModel = model("Cat", catSchema);
const cat = new Cat({ name: "mimi" });
cat.sayHi();
```

### model static methods

```ts
const catSchema = new Schema(
  { name: String },
  {
    statics: {
      fuzzyFind(name: string) {
        this.find({ name: new RegExp(/name/, "i") });
      },
    },
  }
);
const catModel = model("Cat", catSchema);
catModel.fuzzyFind("mi");
```

### query helpers

```ts
const animalSchema = new Schema(
  { name: String, type: String },
  {
    query: {
      byName(name) {
        return this.where({ name: new RegExp(name, "i") });
      },
    },
  }
);

const Animal = mongoose.model("Animal", animalSchema);

Animal.find()
  .byName("fido")
  .exec((err, animals) => {
    console.log(animals);
  });
```

### Indexes

可以在 path 上设置`{index: true}` mongoose 在启动时会自动创建索引

```ts
const animalSchema = new Schema({
  name: String,
  type: String,
  tags: { type: [String], index: true },
});
```

由于创建索引的性能消耗大, 在生产环境中建议将自动生成 index 关闭

```ts
const animalSchema = new Schema(
  {
    // ...
  },
  { autoIndex: false }
);
```

### viruals

virtuals 类似 vue 的 computed

```ts
const personSchema = new Schema(
  {
    name: {
      first: String,
      last: String,
    },
  },
  {
    virtuals: {
      fullName: {
        get() {
          return this.name.first + " " + this.name.last;
        },
        set(v) {
          this.name.first = v.substr(0, v.indexOf(" "));
          this.name.last = v.substr(v.indexOf(" ") + 1);
        },
      },
    },
  }
);
const personModel = model("Person", personSchema);
const person = new Person({ name: { first: "xiao", last: "bai" } });
console.log(person.fullName); // xiao bai
```

### aliases

aliases 可以给 path 取别名, 实际是 virtuals 的一个语法糖

```ts
const personSchema = new Schema({ n: { type: String, alias: "name" } });
// 等价于
const personSchema = new Schema(
  { n: String },
  {
    virtuals: {
      name: {
        get() {
          return this.n;
        },
        set(v) {
          this.n = v;
        },
      },
    },
  }
);
```

aliases 也可用于嵌套的 path

```ts
const parentSchema = new Schema({
  name: {
    f: {
      type: String,
      alias: "name.first",
    },
  },
});
```

### autoCreate!important

mongoose 启动时会自动执行创建集合的操作, 这时如果一个 schema 中设置了`capped`字段, 那这个集合就会被作为一个 capped 集合来创建, 而 capped 集合可能会导致旧数据被新数据覆盖, 通过以下设置可以关闭自动创建集合

可以全局设置

```ts
mongoose.set("autoCreate", false);
```

也可以单独设置给某个 Schema

```ts
const schema = new Schema(
  { name: String },
  {
    autoCreate: false,
    capped: { size: 1024 },
  }
);
```

### bufferCommands

mongoose 默认会自动缓存命令, 以便在服务中断恢复后自动执行

可以全局设置

```ts
mongoose.set("bufferCommands", true);
```

也可以单独设置

```ts
const schema = new Schema({}, { bufferCommands: false });
```

### bufferTimeoutMS

命令缓存默认 10000ms, 也可以手动设置

```ts
const schema = new Schema({}, { bufferTimeoutMS: 1000 });
```

### capped

capped 字段用于创建 capped 集合, 可以设置集合的大小(size)也可以设置最大文档数量(max)

```ts
new Schema({}, { capped: { size: 1024, max: 1000 } });
```

### discriminatorKey

mongodb 不支持文档的继承, 然后 mongoose 提供了 discriminatorKey 来实现文档的继承

```ts
const mongoose = require("mongoose");

const animalSchema = new mongoose.Schema(
  {
    name: String,
    age: Number,
  },
  { discriminatorKey: "kind" }
);

const Animal = mongoose.model("Animal", animalSchema);

const catSchema = new mongoose.Schema({
  purrs: Boolean,
});

const dogSchema = new mongoose.Schema({
  barks: Boolean,
});

const Cat = Animal.discriminator("Cat", catSchema);
const Dog = Animal.discriminator("Dog", dogSchema);
```
