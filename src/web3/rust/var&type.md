# var&type

## 变量

### 声明变量

使用`let`声明变量, 并且 rust 变量默认是不可变的, 使用`mut`关键字声明变量为可变的

```rust
let a = 1;
let mut b = 2;
```

如果一个变量不用声明变量时使用`_`开头的变量名即可

```
let _a = 'editor ignore this'
```

### 影子变量

声明一个同名变量, 该变量会遮蔽之前的同名变量

> 需要注意影子变量是新变量, 只是同名而已, 因此影子变量的值, 类型, 可变性都是可都可以与前一个同名变量不同

```rust
let a = 1;
let a = "hello";
let mut a = true;
```

### 常量

使用`const`声明常量

rust 的常量值是直接是直接编译到代码中的, 不像 c 是在编译时进行替换

rust 常量是块级作用域, 常量只在声明的作用域内可见

### static 静态变量

使用`static`声明静态变量

静态变量会在运行时分配内存, 并且持续到整个程序的声明周期结束时才结束

静态变量是可变的, 可以在`unsafe`代码块中使用

```rust
static mut a = 10;

unsafe {
    a = 20;
}
```

## 类型

### 标量类型

有符号整形: i8, i16, i32, i64, i128
无符号整形: u8, u16, u32, u64, u128
平台整形(大小由操作系统决定): isize, usize
浮点数(尽量使用 f64): f32, f64
字符类型: char
bool 类型: bool

### 复合类型

元组(Tuple)和数组(Array)是复合类型(Compound Type)

#### 数组

数组是固定长度的同构的集合

创建方式

```rust
let a: [默认值或类型; 长度]  = [1, 2, 3];
println!("index 0 is: {}", a[0]);
println!("len is: {}", a.len());
```

#### 元组

元组是固定长度的异构的集合, 例子:

```rust
// 声明tuple
let a = (1, 'h', "hello", true);
print!("{} {} {} {}", a.0, a.1, a.2, a.3);

// 解构tuple
let (a1, a2, a3, a4) = a;
println!("{} {} {} {}", a1, a2, a3, a4);
```

### 函数

rust 将代码分为语句(expression)和表达式(statement), 语句没有返回值, 表达式有返回值.

```rust
fn main(){
 let a = 1;
 // 1是一个表达式
 // let a = 1; 是一个语句, 所以我们不能写 let b = (let a = 1);

 let y = {
    let x = 1;
    x + 1
    // 在块级作用域中, 最后一行如果不写; 则默认其为一个表达式, 既x+1 是一个表达式, 所以y的值是2
 };

 println!("{}", five());
}

fn five()->{
    5
    // 我们也可以手动return, 例如
    // return 5;
}
// 整个main函数没有返回值故也是一个语句
```
