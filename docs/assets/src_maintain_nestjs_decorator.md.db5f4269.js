import{_ as s,c as a,o as n,V as o}from"./chunks/framework.e5c4830d.js";const A=JSON.parse('{"title":"装饰器","description":"","frontmatter":{},"headers":[],"relativePath":"src/maintain/nestjs/decorator.md","filePath":"src/maintain/nestjs/decorator.md"}'),e={name:"src/maintain/nestjs/decorator.md"},t=o(`<h1 id="装饰器" tabindex="-1">装饰器 <a class="header-anchor" href="#装饰器" aria-label="Permalink to &quot;装饰器&quot;">​</a></h1><p>装饰器是一种特殊的声明, 类, 方法, 属性, 参数都可以被装饰.</p><h2 id="nest-参数装饰器" tabindex="-1">nest 参数装饰器 <a class="header-anchor" href="#nest-参数装饰器" aria-label="Permalink to &quot;nest 参数装饰器&quot;">​</a></h2><ul><li><code>@Request(参数名?:string)</code> 通用的请求数据装饰器, 包括了以下三个装饰器, 后面的装饰器类似于一个语法糖</li><li><code>@Body(参数名?:string)</code> 装饰请求体参数</li><li><code>@Query(参数名?:string)</code> 装饰查询参数</li><li><code>@Param(参数名?:string)</code> 装饰路由参数</li></ul><blockquote><p>参数装饰器还可以直接加上参数名, 例如:@Param(&#39;id&#39;) 直接获取指定参数</p></blockquote><p>下面是一个 Path(update)的例子</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Patch</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">:id</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#82AAFF;">update</span><span style="color:#A6ACCD;">(@</span><span style="color:#82AAFF;">Param</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">id</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">) id: string</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> @</span><span style="color:#82AAFF;">Body</span><span style="color:#A6ACCD;">() updateUserDto: UpdateUserDto) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">userService</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">update</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;">id</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">updateUserDto</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span></code></pre></div>`,7),l=[t];function p(r,c,i,d,D,y){return n(),a("div",null,l)}const C=s(e,[["render",p]]);export{A as __pageData,C as default};
