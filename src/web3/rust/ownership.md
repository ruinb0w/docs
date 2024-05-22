# ownership

## copy

变量在赋值时, 如果右边是基础类型则会执行 copy 操作. 因为原值存储在 stack 中, 占用内存小.

```rust
let a1 = 1;
let a2 = a1;
println!("{a1}");
```

## move

如果右边是复合类型则会 move, rust 为避免二次释放内存, 数据的所有权会转移到新的变量.

```rust
let s1 = String::from("hello");
let s2 = s1;
println!("{s1}") // 报错: borrow of moved value: `s1`, value borrowed here after move
```

如果一个类型实现了 `Copy` trait 则不会 move, 而是执行 move 操作. 但如果该类型已经实现了 `Drop` trait 则不允许该类型实现 `Copy` trait.

String 实现了 clone 方法, 可以用于深拷贝

```rust
let s1 = String::from("hello");
let s2 = s1.clone();
println!("{s1}") // 报错: borrow of moved value: `s1`, value borrowed here after move
```

## drop

当一个变量包含 `heap` 数据, 其离开作用域时就会自动被 drop 函数清除

## 引用和借用

**引用**指的是对一个变量的引用, 其并没有获取数据的实际所有权, 把引用作为函数参数这个行为叫做**借用**
