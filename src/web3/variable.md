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

## question

1. 为什么 solidity 文档把函数类型归到数值类型
2. 为什么映射类型单独归类而不是归类到引用类型
