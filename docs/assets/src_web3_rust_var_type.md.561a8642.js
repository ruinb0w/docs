import{_ as s,c as a,o as n,V as l}from"./chunks/framework.e5c4830d.js";const A=JSON.parse('{"title":"var&type","description":"","frontmatter":{},"headers":[],"relativePath":"src/web3/rust/var&type.md","filePath":"src/web3/rust/var&type.md"}'),p={name:"src/web3/rust/var&type.md"},o=l(`<h1 id="var-type" tabindex="-1">var&amp;type <a class="header-anchor" href="#var-type" aria-label="Permalink to &quot;var&amp;type&quot;">​</a></h1><h2 id="变量" tabindex="-1">变量 <a class="header-anchor" href="#变量" aria-label="Permalink to &quot;变量&quot;">​</a></h2><h3 id="声明变量" tabindex="-1">声明变量 <a class="header-anchor" href="#声明变量" aria-label="Permalink to &quot;声明变量&quot;">​</a></h3><p>使用<code>let</code>声明变量, 并且 rust 变量默认是不可变的, 使用<code>mut</code>关键字声明变量为可变的</p><div class="language-rust"><button title="Copy Code" class="copy"></button><span class="lang">rust</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> a </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">mut</span><span style="color:#A6ACCD;"> b </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">;</span></span></code></pre></div><p>如果一个变量不用声明变量时使用<code>_</code>开头的变量名即可</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">let _a = &#39;editor ignore this&#39;</span></span></code></pre></div><h3 id="影子变量" tabindex="-1">影子变量 <a class="header-anchor" href="#影子变量" aria-label="Permalink to &quot;影子变量&quot;">​</a></h3><p>声明一个同名变量, 该变量会遮蔽之前的同名变量</p><blockquote><p>需要注意影子变量是新变量, 只是同名而已, 因此影子变量的值, 类型, 可变性都是可都可以与前一个同名变量不同</p></blockquote><div class="language-rust"><button title="Copy Code" class="copy"></button><span class="lang">rust</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> a </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> a </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">hello</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">mut</span><span style="color:#A6ACCD;"> a </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true;</span></span></code></pre></div><h3 id="常量" tabindex="-1">常量 <a class="header-anchor" href="#常量" aria-label="Permalink to &quot;常量&quot;">​</a></h3><p>使用<code>const</code>声明常量</p><p>rust 的常量值是直接是直接编译到代码中的, 不像 c 是在编译时进行替换</p><p>rust 常量是块级作用域, 常量只在声明的作用域内可见</p><h3 id="static-静态变量" tabindex="-1">static 静态变量 <a class="header-anchor" href="#static-静态变量" aria-label="Permalink to &quot;static 静态变量&quot;">​</a></h3><p>使用<code>static</code>声明静态变量</p><p>静态变量会在运行时分配内存, 并且持续到整个程序的声明周期结束时才结束</p><p>静态变量是可变的, 可以在<code>unsafe</code>代码块中使用</p><div class="language-rust"><button title="Copy Code" class="copy"></button><span class="lang">rust</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">static</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">mut</span><span style="color:#A6ACCD;"> a </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">10</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F78C6C;">unsafe</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    a </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">20</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><h2 id="类型" tabindex="-1">类型 <a class="header-anchor" href="#类型" aria-label="Permalink to &quot;类型&quot;">​</a></h2><h3 id="标量类型" tabindex="-1">标量类型 <a class="header-anchor" href="#标量类型" aria-label="Permalink to &quot;标量类型&quot;">​</a></h3><p>有符号整形: i8, i16, i32, i64, i128 无符号整形: u8, u16, u32, u64, u128 平台整形(大小由操作系统决定): isize, usize 浮点数(尽量使用 f64): f32, f64 字符类型: char bool 类型: bool</p><h3 id="复合类型" tabindex="-1">复合类型 <a class="header-anchor" href="#复合类型" aria-label="Permalink to &quot;复合类型&quot;">​</a></h3><p>元组(Tuple)和数组(Array)是复合类型(Compound Type)</p><h4 id="数组" tabindex="-1">数组 <a class="header-anchor" href="#数组" aria-label="Permalink to &quot;数组&quot;">​</a></h4><p>数组是固定长度的同构的集合</p><p>创建方式</p><div class="language-rust"><button title="Copy Code" class="copy"></button><span class="lang">rust</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> a</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">默认值或类型</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> 长度</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">3</span><span style="color:#89DDFF;">];</span></span>
<span class="line"><span style="color:#82AAFF;">println!</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">index 0 is: </span><span style="color:#89DDFF;">{}&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> a</span><span style="color:#89DDFF;">[</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">]);</span></span>
<span class="line"><span style="color:#82AAFF;">println!</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">len is: </span><span style="color:#89DDFF;">{}&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> a</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">len</span><span style="color:#89DDFF;">());</span></span></code></pre></div><h4 id="元组" tabindex="-1">元组 <a class="header-anchor" href="#元组" aria-label="Permalink to &quot;元组&quot;">​</a></h4><p>元组是固定长度的异构的集合, 例子:</p><div class="language-rust"><button title="Copy Code" class="copy"></button><span class="lang">rust</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 声明tuple</span></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> a </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">h</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">hello</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true);</span></span>
<span class="line"><span style="color:#82AAFF;">print!</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;{}</span><span style="color:#C3E88D;"> </span><span style="color:#89DDFF;">{}</span><span style="color:#C3E88D;"> </span><span style="color:#89DDFF;">{}</span><span style="color:#C3E88D;"> </span><span style="color:#89DDFF;">{}&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> a</span><span style="color:#89DDFF;">.</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> a</span><span style="color:#89DDFF;">.</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> a</span><span style="color:#89DDFF;">.</span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> a</span><span style="color:#89DDFF;">.</span><span style="color:#F78C6C;">3</span><span style="color:#89DDFF;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 解构tuple</span></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">a1</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> a2</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> a3</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> a4</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> a</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#82AAFF;">println!</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;{}</span><span style="color:#C3E88D;"> </span><span style="color:#89DDFF;">{}</span><span style="color:#C3E88D;"> </span><span style="color:#89DDFF;">{}</span><span style="color:#C3E88D;"> </span><span style="color:#89DDFF;">{}&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> a1</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> a2</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> a3</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> a4</span><span style="color:#89DDFF;">);</span></span></code></pre></div><h3 id="函数" tabindex="-1">函数 <a class="header-anchor" href="#函数" aria-label="Permalink to &quot;函数&quot;">​</a></h3><p>rust 将代码分为语句(expression)和表达式(statement), 语句没有返回值, 表达式有返回值.</p><div class="language-rust"><button title="Copy Code" class="copy"></button><span class="lang">rust</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#F78C6C;">fn</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">main</span><span style="color:#89DDFF;">(){</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> a </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> // 1是一个表达式</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> // let a = 1; 是一个语句, 所以我们不能写 let b = (let a = 1);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> y </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> x </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    x </span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">    // 在块级作用域中, 最后一行如果不写; 则默认其为一个表达式, 既x+1 是一个表达式, 所以y的值是2</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">println!</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;{}&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">five</span><span style="color:#89DDFF;">());</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F78C6C;">fn</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">five</span><span style="color:#89DDFF;">()-&gt;{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F78C6C;">5</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">    // 我们也可以手动return, 例如</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">    // return 5;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 整个main函数没有返回值故也是一个语句</span></span></code></pre></div>`,35),e=[o];function t(c,r,D,y,F,C){return n(),a("div",null,e)}const u=s(p,[["render",t]]);export{A as __pageData,u as default};