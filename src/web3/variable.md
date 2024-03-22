# 变量

solidity 变量有四种类型

- 数值类型(Value Type)：包括布尔型，整数型等等，这类变量赋值时候直接传递数值。
- 引用类型(Reference Type)：包括数组和结构体，这类变量占空间大，赋值时候直接传递地址（类似指针）。
- 映射类型(Mapping Type): Solidity 里的哈希表。
- 函数类型(Function Type)：Solidity 文档里把函数归到数值类型，但我觉得他跟其他类型差别很大，所以单独分一类。

## 数值类型

数值类型有整形，浮点型，布尔型，字符串，地址类型

### 整型

常用的整形有 `int` `uint` `uint256` ,其中 int 表示有符号整数, unint 表示无符号整数.

### 布尔型

`&&` 和 `||` 运算符遵循短路规则，这意味着，假如存在 `f(x) || g(y)` 的表达式，如果 `f(x)` 是 `true` , `g(y)` 不会被计算

### 地址类型

有普通的地址和可以转账 ETH 的地址（加 `payable` 装饰变量）,普通 `adress` 修饰的地址有一个成员变量 `balance`，`payable` 修饰的地址相对普通地址多了 `transfer` 和 `send` 两个成员

```solidity
address public _address = 0x7A58c0Be72BE218B41C608b7Fe7C5bB630736C71;
address payable public _address1 = payable(_address); // payable address，可以转账、查余额
uint256 public balance = _address1.balance; // balance of address
```

### 字节数组

数组 bytes 分两种，一种定长（byte, bytes8, bytes32），另一种不定长。定长的属于数值类型，不定长的是引用类型, 定长 bytes 可以存一些数据，消耗 gas 比较少。

```solidity
bytes32 public _byte32 = "MiniSolidity"; // 0x4d696e69536f6c6964697479000000000000000000000000000000000000000
bytes1 public _byte = _byte32[0]; //_byte变量存储_byte32的第一个字节，为0x4d。
```

### 枚举

枚举（enum）是 solidity 中用户定义的数据类型。它主要用于为 uint 分配名称，使程序易于阅读和维护。

```solidity
enum ActionSet { Buy, Hold, Sell }
// 创建enum变量 action
ActionSet action = ActionSet.Buy;
```

## 函数类型

```solidity
function FUNCTION_NAME([可见性] [参数], ...) [可见性] [读写性] [returns (<return types>)]
```

### 可见性

可见性有以下几种

- public: 内部外部均可见。
- private: 只能从本合约内部访问，继承的合约也不能用。
- external: 只能从合约外部访问（但是可以用 this.f()来调用，f 是函数名）。
- internal: 只能从合约内部访问，继承的合约可以用。

方法默认为 `public` ,属性默认为 `internal`

### 读写性

读写性有三种 `pure` `view` `payable`

由于读写数据是要消耗 gas 的，所以 EVM 对读写数据做了严格的区分。 `payable` 可读写合约中的数据, `pure` 不能读写合约中的数据，`view` 可以读但不能写

```solidity
contract PureAndView{
    uint public number = 5;

    // 下面的代码会报错，因为pure函数不能读写合约种的数据
    //function pureAdd() pure returns uint(){
    //    return number + 1;
    //}

    // 下面的代码是可以通过的, 因为其并没有读写合约种的数据
    function pureAdd(uint x) public pure returns(uint) {
        return x + 1 ;
    }

    // 与pure不同，view函数可以读取合约种的数据, 但不能写
    function viewAdd() public view returns(uint){
        return number + 1;
    }
}
```

### 函数返回值

#### returns 和 return

函数使用 returns 指定返回值类型, return 指定返回内容

```solidity
function returnMultiple() public pure returns(uint256, bool, uint256[3] memory){
    return(1, true, [uint256(1),2,5]);
}
```

#### 命名式返回

在 returns 中加上变量名后会自动返回变量

```solidity
function returnNamed() public pure returns(uint256 _number, bool _bool, uint256[3] memory _array){
    _number = 2;
    _bool = false;
    _array = [uint256(3),2,1];
}
```

#### 解构式赋值

```solidity
uint256 _number;
bool _bool;
uint256[3] memory _array;
(_number, _bool, _array) = returnNamed();

// 不要的返回值可以留空
(, _bool2, ) = returnNamed();
```

## 引用类型

引用类型(Reference Type)：包括数组（array），结构体（struct）和映射（mapping）,由于这类变量比较复杂，占用存储空间大，我们在使用时必须要声明数据存储的位置。

### 数据位置

solidity 数据存储位置有三类：`storage`，`memory` 和 `calldata`。不同存储位置的 gas 成本不同。storage 类型的数据存在链上，类似计算机的硬盘，消耗 gas 多；memory 和 calldata 类型的临时存在内存里，消耗 gas 少.

- storage：合约里的状态变量默认都是 storage，存储在链上。
- memory：函数里的参数和临时变量一般用 memory，存储在内存中，不上链。
- calldata：和 memory 类似，存储在内存中，不上链。与 memory 的不同点在于 calldata 变量不能修改（immutable），一般用于函数的参数。

### 数据位置和赋值规则

引用类型的 storage 赋值给 storage 变量时会创建**引用**, 故修改新变量时会影响旧变量

引用类型的 storage 赋值给 memory 变量时会创建**独立副本**, 故修改新变量时不会影响旧变量

memory 赋值给 memory 时会创建**引用**

其他情况，变量赋值给 storage 会创建独立的副本

### 变量的作用域

solidity 变量的作用域有三种

1. 状态变量: 声明在合约内方法外. 可在合约中访问. 其是 storage 类型的, 故修改时消耗的 gas 较大.
2. 局部变量: 声明在方法内. 仅可在方法内访问. 当方法执行结束后即被销毁, 故消耗 gas 低.
3. 全局变量: 由 solidity 事先定义, 可在任何地方访问. 以下是一些常见全局变量:
   - blockhash(uint blockNumber): (bytes32)给定区块的哈希值 – 只适用于 256 最近区块, 不包含当前区块。
   - block.coinbase: (address payable) 当前区块矿工的地址
   - block.gaslimit: (uint) 当前区块的 gaslimit
   - block.number: (uint) 当前区块的 number
   - block.timestamp: (uint) 当前区块的时间戳，为 unix 纪元以来的秒
   - gasleft(): (uint256) 剩余 gas
   - msg.data: (bytes calldata) 完整 call data
   - msg.sender: (address payable) 消息发送者 (当前 caller)
   - msg.sig: (bytes4) calldata 的前四个字节 (function identifier)
   - msg.value: (uint) 当前交易发送的 wei 值

## 引用类型

### 数组

数组分为可变数组和不可变数组

不可变数组在声明时即声明其长度, 可变数组则不声明其长度

```solidity
uint[10] nums;
unit[] nums2;
```

> 注意：bytes 比较特殊，是数组，但是不用加[]。另外，不能用 byte[]声明单字节数组，可以使用 bytes 或 bytes1[]。在 gas 上，bytes 比 bytes1[]便宜。因为 bytes1[]在 memory 中要增加 31 个字节进行填充，会产生额外的 gas。但是在 storage 中，由于内存紧密打包，不存在字节填充。

## question

1. 为什么 solidity 文档把函数类型归到数值类型
2. 为什么映射类型单独归类而不是归类到引用类型
3. 在数据位置和赋值规则中, 非引用类型也适用吗? 赋值不在方法内上述规则有效吗?
