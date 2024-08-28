# C

C 语言中整数相除会自动去掉小数部分, 例如`5/9`会得到`0`

C 语言函数传参都是复制值, 如果是一个指针，传递的是指针的地址

C 语言中将数组作为参数传递时, 传递的是第一个元素的地址

external 关键字可以声明(declaration)外部变量, 从而使用外部(其他文件)定义(definition)的变量

getchar, putchar

## 类型

### 数值

### 字符

c 语言使用 ascii 码来表示字符, 0-127 之间的数字都是 ascii 码, 故 char 和数字可以互相转换

### 布尔值

c 语言没有定义 bool 类型, 但是可以用 0 表示 false , 非 0 来表示 true

## 字符串

C 语言支持字符串字面值的拼接, 不用 `+` 号, 直接放在一起即可

```c
char* s = "hello" "world";

```

C 语言的支付串实际是一个字符数组, 并且会在字面量的最后面加一个'\0'到数组中, 以表示字符串结束

下面这个函数会在遇到'\0'时停止

```c
int strlen(char s[]){
 int i;
 while (s[i] != '\0')
   ++i;
 return i;
}
```

### 类型转换

**操作符类型转换**

让长类型和短类型相互操作时会自动转换为长类型

```c
float a = 3.14 + 1;
// float a = 3.14+1.0;
```

**手动类型转换**

我们也可以手动指定类型转换

```c
int a = (int) 3.14; // 3.14会转换为3
```

**参数类型自动转换**

下面的 2 会被自动转换为 double 类型

```c
sqrt(2);
```

### enum

enumm 是一个整数的枚举

```c
enum boolean { NO, YES };
// NO == 0, YES == 1

enum escapes { BELL = '\a', BACKSPACE = '\b', TAB = '\t',  NEWLINE = '\n', VTAB = '\v', RETURN = '\r' };
// 可以自定义数值

enum months { JAN = 1, FEB, MAR, APR, MAY, JUN,  JUL, AUG, SEP, OCT, NOV, DEC };
// 指定第一个的值, 后面就会继续
// FEB=2, MAR=3 ...
```

## 变量

### 静态变量

静态变量通过`static`关键字声明, 静态变量有两个主要用途:

1. 隐藏与隔离
2. 保持变量内容的持久性

### 隐藏与隔离

下面是一个全局变量的例子, 我们可以直接在 file2 中直接使用 file1 中定义的全局变量

```c
//file1.c

int count = 0;

//file2.c

count ++;
printf("count = %d\n", count); // 1
```

如果把 count 用 static 声明, file2 就需要 external 关键字来引入 count

```c
//file1.c

static int count = 0;

//file2.c

extern int count;
count ++;
printf("count = %d\n", count); // 1
```

### 保持变量内容的持久性

a 是在 rise 函数中声明的静态变量, 与普通变量不同, 它不会在 rise 函数结束时被销毁

```c
#include <stdio.h>

int rise();

int main() {
  printf("%d\n", rise());
  printf("%d\n", rise());
}

int rise() {
  static int a = 0;
  a++;
  return a;
}
```

## 位操作

| 操作符 | 说明                        | 场景                       |
| ------ | --------------------------- | -------------------------- |
| `&`    | 按位与, 都是 1 为 1         | 作为掩码, 只保留需要的部分 |
| `\|`   | 按位或, 有一个 1 为 1       |                            |
| `^`    | 按位异或, 相同为 0,不同为 1 |                            |
| `~`    | 按位取反, 0 变 1, 1 变 0    |                            |
| `<<`   | 左移                        |                            |
| `>>`   | 右移                        |                            |

## ctype.h

| 函数                  | 描述               |
| --------------------- | ------------------ |
| int isdigit(char c){} | 判断字符是否是数字 |
