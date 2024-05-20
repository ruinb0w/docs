# ownership

### copy&move

变量在赋值时, 如果右边是基础类型则会 copy, 既原变量还保有其值的所有权

如果右边是复合类型则会 move, 既原变量失去其值的所有权

```rust
let a1 = 1;
let a2 = a1;
println!("{a1}");

let s1 = String::from("hello");
let s2 = s1;
println!("{s1}") // 报错: borrow of moved value: `s1`, value borrowed here after move
```
