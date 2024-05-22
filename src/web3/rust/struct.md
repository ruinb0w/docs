# struct

```rust
use std::fmt::Display;

struct User {
    _name: String,
    age: u32,
    _email: String,
}

// tuple struct
struct RGB(u32, u32, u32);

// unit-like struct
struct Empty;

fn main() {
    let u1 = User {
        _name: String::from("xiaobai"),
        age: 10,
        _email: String::from("xiaobai@qq.com"),
    };
    let u2 = User { age: 12, ..u1 }; // 与js不同, js解构存在顺序, 同名属性在后的会被覆盖,
                                     // 所以源对象的结构要写在前.
                                     // 而rust则是更新struct实例, 语法要求源实例在后
    println!("{}", u2.age);

    let blue = RGB(0, 0, 255);
    println!("{}", blue.2);

    let empty = Empty;
    impl Display for Empty {
        fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
            write!(f, "Empty")
        }
    }
    println!("{}", empty);
}
```
