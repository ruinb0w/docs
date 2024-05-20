# start

## 命令行工具

### rustup

rustup 是 rust 的安装器，用于管理 rust 的版本和依赖关系。

#### 常用命令

| 命令           | 说明             |
| -------------- | ---------------- |
| rustup doc     | 本地 rust 文档   |
| rustup install | 安装 rust 编译器 |

### rustc

rust 编译器

#### 常用命令

| 命令                          | 说明                                         |
| ----------------------------- | -------------------------------------------- |
| rustc [-o 输出文件名] 源文件  | 生成二进制文件, 不加参数则生成同名可执行文件 |
| rustc --crate-type lib 源文件 | 生成库文件                                   |

### cargo

rust 包管理工具

#### 常用命令

| 命令                       | 说明                                                              |
| -------------------------- | ----------------------------------------------------------------- |
| cargo new [--lib] 项目名称 | 创建 rust 项目, 加--lib 创建库项目                                |
| cargo build [--release]    | 编译项目, 加--release 生成 release 版本,性能更好                  |
| cargo check                | 检查项目                                                          |
| cargo run                  | 运行项目                                                          |
| cargo test                 | 测试项目                                                          |
| cargo update               | 将依赖更新到最新版本，只会升级版本号最后一位的最新版本 例如 0.3.x |

## 项目结构

可执行项目

```
├── Cargo.toml
├── src
│   ├── main.rs
│   └── lib.rs
```

库项目

```
├── Cargo.toml
├── src
│   └── lib.rs
```

### Cargo.toml

`[package]`: 项目名称版本等
`[dependencies]`: 项目所需的依赖
`[build_dependencies]`: 配置编译时所需的依赖
`[dev_dependencies]`: 配置开发时所需的依赖

### crate.io

类似 npm 可以查找第三方库, [crate.io](https://crates.io)

可以使用 `cargo-edit` 插件来像 npm install 一样安装依赖, 这样就不需要手动修改 `Cargo.toml`

```sh
cargo install cargo-edit

cargo add 依赖名
cargo add 依赖名@版本
cargo add --dev 依赖名
cargo add --build 依赖名
cargo rm 依赖名
```

### 国内源

[rsproxy](https://rsproxy.cn/)

## 编辑器配置

插件可以使用 [coc-rust-analyzer](https://github.com/fannheyward/coc-rust-analyzer)，也可以使用 [rustaceanvim](https://github.com/mrcjkb/rustaceanvim), 但记得装 rust 的`rust-analyzer`组件

```sh
rustup component add rust-analyzer
```
