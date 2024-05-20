# lib

使用 `use 库名` 来导入

## std

### std:io

接收命令行输入

```
use std::io;
let mut buf = String::new();
io::stdin().read_line(&mut buf).unwrap();

// std是prelude 库, 我们也可以像下面这样直接使用
std::io::stdin().read_line(&mut buf).unwrap();
```
