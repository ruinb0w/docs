# Puppeteer

## API

常用 api 有如下几个

### page.waitForSelector

`page.waitForSelector(选择器[, 选项]): Promise`

等待原则起指定的元素出现

### page.evaluate

`page.evaluate(()=>any): Promise<any>`

evaluate 回调函数中的代码会在网页中执行, 故而不能访问外部作用域中的内容, 同时也不支持 await/async

### page.type

`page.type(选择器, 字符串):Promise`

给选择器选中的元素填入字符串, 通常用于输入账号密码等

### page.$

`page.$(选择器): Promise<ElementHandle | null>`

类似于 document.querySelector, 但返回的是 ElementHandle 对象

### page.$$

`page.$$(选择器): Promise<Array<ElementHandle>>`

类似于 document.querySelectorAll, 但返回的是 ElementHandle 数组

## 坑

### TargetCloseError

TargetCloseError: Protocol error (Runtime.callFunctionOn): Target closed
通常该问题是由于旧标签没有关闭就打开了新标签, 关闭旧标签时导致标签冲突. 我们可以在关闭旧标签和开启新标签中间加一个延迟
