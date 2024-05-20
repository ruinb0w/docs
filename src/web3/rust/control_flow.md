# 控制流

## if-else

if-else 也可以是一个表达式

```rust
let age = 10;

let result = if age >18 {
    'Adult'
}else{
    'Minor'
}

println!("{}", result);
```

## loop

loop 会一直执行, 使用 break 退出循环

```rust
loop {
    let mut counter = 0;
        if counter == 10{
            break;
        }
    counter += 1;
}
```

## while

while 在每次执行前会进行条件判断

```rust
let mut counter = 0;

while counter != 10 {
    println!("{}", counter);
    counter += 1;
}
```

## for

for 可以用于遍历迭代器 Iterator

```rust
let a = [1, 2, 3, 4];

for item in a.iter() {
    println!("{}", item)
}
```

利用 Range 可以方便的进行循环

```rust
for i in 0..10 {
    println!("{}", i)
}

// 倒序
for i in (0..10).rev() {
    println!("{}", i)
}
```
