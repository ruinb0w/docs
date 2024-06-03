import{_ as s,c as n,o as a,V as o}from"./chunks/framework.2aaf49fa.js";const d=JSON.parse('{"title":"Interceptors","description":"","frontmatter":{},"headers":[],"relativePath":"src/maintain/nestjs/interceptors.md","filePath":"src/maintain/nestjs/interceptors.md"}'),l={name:"src/maintain/nestjs/interceptors.md"},e=o(`<h1 id="interceptors" tabindex="-1">Interceptors <a class="header-anchor" href="#interceptors" aria-label="Permalink to &quot;Interceptors&quot;">​</a></h1><p>拦截器是一种特殊的 provider, 用他我们可以在请求处理函数(route handler)前后做一些事</p><p>拦截器需要实现 <code>NestInterceptor</code> 并通过 <code>@Injectable()</code> 进行声明</p><p>拦截器可以通过 <code>@UseInterceptors(拦截器)</code> 装饰器绑定到 <strong>controller</strong>, <strong>route handler</strong>, 使用 <code>app.useGlobalInterceptors(拦截器)</code> 来全局绑定</p><p>拦截器需要配合 <a href="https://rxjs.dev/" target="_blank" rel="noreferrer">rxjs</a> 使用</p><h2 id="例子" tabindex="-1">例子 <a class="header-anchor" href="#例子" aria-label="Permalink to &quot;例子&quot;">​</a></h2><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">nest</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">g</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">itc</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">login</span></span></code></pre></div><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// login.interceptor.ts</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">CallHandler</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">ExecutionContext</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">Injectable</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">NestInterceptor</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@nestjs/common</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">Observable</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">rxjs</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Injectable</span><span style="color:#BABED8;">()</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">class</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">LoginInterceptor</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">implements</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">NestInterceptor</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">intercept</span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;font-style:italic;">context</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">ExecutionContext</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#BABED8;font-style:italic;">next</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">CallHandler</span><span style="color:#89DDFF;">):</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">Observable</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">any</span><span style="color:#89DDFF;">&gt;</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">next</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">handle</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>需要注意的是, 拦截器中如果不执行 <code>next.handle()</code> 则路由处理函数则不会被执行</p>`,9),p=[e];function t(r,c,y,D,F,i){return a(),n("div",null,p)}const E=s(l,[["render",t]]);export{d as __pageData,E as default};
