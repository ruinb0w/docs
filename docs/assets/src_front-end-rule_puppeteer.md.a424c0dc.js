import{_ as e,c as a,o as t,V as r}from"./chunks/framework.2aaf49fa.js";const m=JSON.parse('{"title":"Puppeteer","description":"","frontmatter":{},"headers":[],"relativePath":"src/front-end-rule/puppeteer.md","filePath":"src/front-end-rule/puppeteer.md"}'),o={name:"src/front-end-rule/puppeteer.md"},p=r('<h1 id="puppeteer" tabindex="-1">Puppeteer <a class="header-anchor" href="#puppeteer" aria-label="Permalink to &quot;Puppeteer&quot;">​</a></h1><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><p>常用 api 有如下几个</p><h3 id="page-waitforselector" tabindex="-1">page.waitForSelector <a class="header-anchor" href="#page-waitforselector" aria-label="Permalink to &quot;page.waitForSelector&quot;">​</a></h3><p><code>page.waitForSelector(选择器[, 选项]): Promise</code></p><p>等待原则起指定的元素出现</p><h3 id="page-evaluate" tabindex="-1">page.evaluate <a class="header-anchor" href="#page-evaluate" aria-label="Permalink to &quot;page.evaluate&quot;">​</a></h3><p><code>page.evaluate(()=&gt;any): Promise&lt;any&gt;</code></p><p>evaluate 回调函数中的代码会在网页中执行, 故而不能访问外部作用域中的内容, 同时也不支持 await/async</p><h3 id="page-type" tabindex="-1">page.type <a class="header-anchor" href="#page-type" aria-label="Permalink to &quot;page.type&quot;">​</a></h3><p><code>page.type(选择器, 字符串):Promise</code></p><p>给选择器选中的元素填入字符串, 通常用于输入账号密码等</p><h3 id="page" tabindex="-1">page.$ <a class="header-anchor" href="#page" aria-label="Permalink to &quot;page.$&quot;">​</a></h3><p><code>page.$(选择器): Promise&lt;ElementHandle | null&gt;</code></p><p>类似于 document.querySelector, 但返回的是 ElementHandle 对象</p><h3 id="page-1" tabindex="-1">page.$$ <a class="header-anchor" href="#page-1" aria-label="Permalink to &quot;page.$$&quot;">​</a></h3><p><code>page.$$(选择器): Promise&lt;Array&lt;ElementHandle&gt;&gt;</code></p><p>类似于 document.querySelectorAll, 但返回的是 ElementHandle 数组</p><h2 id="坑" tabindex="-1">坑 <a class="header-anchor" href="#坑" aria-label="Permalink to &quot;坑&quot;">​</a></h2><h3 id="targetcloseerror" tabindex="-1">TargetCloseError <a class="header-anchor" href="#targetcloseerror" aria-label="Permalink to &quot;TargetCloseError&quot;">​</a></h3><p>TargetCloseError: Protocol error (Runtime.callFunctionOn): Target closed 通常该问题是由于旧标签没有关闭就打开了新标签, 关闭旧标签时导致标签冲突. 我们可以在关闭旧标签和开启新标签中间加一个延迟</p>',21),l=[p];function n(c,i,d,s,h,u){return t(),a("div",null,l)}const _=e(o,[["render",n]]);export{m as __pageData,_ as default};
