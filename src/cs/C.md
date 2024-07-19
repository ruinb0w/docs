# C

C 语言中整数相除会自动去掉小数部分, 例如`5/9`会得到`0`

C 语言函数传参都是复制值, 如果是一个指针，传递的是指针的地址

C 语言中将数组作为参数传递时, 传递的是第一个元素的地址

external 关键字可以声明(declaration)外部变量, 从而使用外部(其他文件)定义(definition)的变量

getchar, putchar

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

## enum

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

## 静态变量

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
