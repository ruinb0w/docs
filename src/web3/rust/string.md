# String

String 存储在 heap 上, 返回的指针在 stack 上.

创建 String

```rust
let mut s = String::from("hello");
s.push_str(", world");

println!("{}", s); // hello, world
```

## 字符串字面量

(写在代码里的字符串)会在编译到最终的可执行文件里, 所以其内容是不可变的

## 字符串切片

指向字符串中一部分内容的引用

```rust
let s = String::from("hello world");
let s1 = &s[0..5]; // 不包括5, 语法糖 let s1 = &s[..5];
let s2 = &s[6..11]; // 不包括11, 语法糖 let s2 = &s[6..];
let s3 = &s[..]; // 完整切片语法糖
```
