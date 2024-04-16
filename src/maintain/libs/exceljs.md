# exceljs

[exceljs](https://github.com/exceljs/exceljs) 是一个用于处理 Excel 文件的 JavaScript 库。

## 坑点

### addRow 列数错位问题

```ts
let a = [];
a[4] = 10;
a[9] = 20;

// 当a存在empty items时addRow可能会导致列数错误, 例如10应该在第五列, 却跑到了第四列
sheet.addRow(数组);

// 我们应该在addRow之前把empty items处理掉
for (let i = 0; i < a.length; i++) {
  if (!a[i]) a[i] = "";
}
sheet.addRow(数组);
```
