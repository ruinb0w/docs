import{_ as s,c as a,o as n,V as l}from"./chunks/framework.e5c4830d.js";const C=JSON.parse('{"title":"Pipe 管道","description":"","frontmatter":{},"headers":[],"relativePath":"src/maintain/nestjs/pipe.md","filePath":"src/maintain/nestjs/pipe.md"}'),p={name:"src/maintain/nestjs/pipe.md"},o=l(`<h1 id="pipe-管道" tabindex="-1">Pipe 管道 <a class="header-anchor" href="#pipe-管道" aria-label="Permalink to &quot;Pipe 管道&quot;">​</a></h1><p>管道用于转换前端数据或对前端数据进行检查</p><p>常用管道: <code>ValidationPipe</code> <code>ParseIntPipe</code> <code>ParseFloatPipe</code> <code>ParseBoolPipe</code> <code>ParseArrayPipe</code> <code>ParseUUIDPipe</code> <code>ParseEnumPipe</code> <code>DefaultValuePipe</code></p><h2 id="解析" tabindex="-1">解析 <a class="header-anchor" href="#解析" aria-label="Permalink to &quot;解析&quot;">​</a></h2><p>解析参数时会用到 <code>Parse*Pipe</code> 等管道, 以 <code>ParseIntPipe</code> 为例如果参数不是数字, 则会抛出异常, 如果是有效的数字则将参数转为数字</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Get</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">:id</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#82AAFF;">findOne</span><span style="color:#A6ACCD;">(@</span><span style="color:#82AAFF;">Param</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">id</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> ParseIntPipe) id: string) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">typeof</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">id</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">==</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">number</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span><span style="color:#F07178;"> </span><span style="color:#676E95;font-style:italic;">// true</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">pipeService</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">findOne</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;">id</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span></code></pre></div><h2 id="validationpipe" tabindex="-1">ValidationPipe <a class="header-anchor" href="#validationpipe" aria-label="Permalink to &quot;ValidationPipe&quot;">​</a></h2><h3 id="局部验证" tabindex="-1">局部验证 <a class="header-anchor" href="#局部验证" aria-label="Permalink to &quot;局部验证&quot;">​</a></h3><p>ValidationPipe 可以用于验证参数是否符合某个约定</p><blockquote><p>自定义验证管道需要用到 <a href="https://www.npmjs.com/package/class-validator" target="_blank" rel="noreferrer">class-validator</a> 和 <a href="https://www.npmjs.com/package/class-transformer" target="_blank" rel="noreferrer">class-transformer</a> 包 class-transformer 新版有问题, 可以降级到 <code>class-transformer@0.3.1</code></p></blockquote><ol><li>声明 DTO(Data Transfer Object)</li></ol><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// create-test.dto.ts</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">IsString</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">IsNumber</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">ValidatorOptions</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">class-validator</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">CreatePipeDto</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">IsString</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">IsNumber</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">age</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">number</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><ol start="2"><li>实例化 ValidationPipe 并引入 DTO</li></ol><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// test.controller.ts</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Post</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#82AAFF;">create</span><span style="color:#A6ACCD;">(@</span><span style="color:#82AAFF;">Body</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">ValidationPipe</span><span style="color:#A6ACCD;">()) createPipeDto: CreatePipeDto) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">pipeService</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">create</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">createPipeDto</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span></code></pre></div><h3 id="全局验证" tabindex="-1">全局验证 <a class="header-anchor" href="#全局验证" aria-label="Permalink to &quot;全局验证&quot;">​</a></h3><p>第一步和局部验证相同都是需要声明 DTO</p><p>第二部使用 ValidationPipe 时在 main.ts 中使用</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// main.ts</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">use</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span></code></pre></div>`,18),e=[o];function t(c,r,i,y,F,D){return n(),a("div",null,e)}const d=s(p,[["render",t]]);export{C as __pageData,d as default};