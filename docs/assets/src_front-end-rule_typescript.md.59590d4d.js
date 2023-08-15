import{_ as s,c as a,o as e,V as t}from"./chunks/framework.e5c4830d.js";const F=JSON.parse('{"title":"typescript","description":"","frontmatter":{},"headers":[],"relativePath":"src/front-end-rule/typescript.md","filePath":"src/front-end-rule/typescript.md"}'),n={name:"src/front-end-rule/typescript.md"},l=t(`<h1 id="typescript" tabindex="-1">typescript <a class="header-anchor" href="#typescript" aria-label="Permalink to &quot;typescript&quot;">​</a></h1><h2 id="类型声明" tabindex="-1">类型声明 <a class="header-anchor" href="#类型声明" aria-label="Permalink to &quot;类型声明&quot;">​</a></h2><h3 id="returntype" tabindex="-1">ReturnType <a class="header-anchor" href="#returntype" aria-label="Permalink to &quot;ReturnType&quot;">​</a></h3><p>使用 <code>ReturnType</code> 声明类型为函数返回值</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> getA </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@/apis</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> a</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ReturnType</span><span style="color:#89DDFF;">&lt;typeof</span><span style="color:#A6ACCD;"> getA</span><span style="color:#89DDFF;">&gt;;</span></span></code></pre></div><h3 id="awaited" tabindex="-1">Awaited <a class="header-anchor" href="#awaited" aria-label="Permalink to &quot;Awaited&quot;">​</a></h3><p>使用 <code>Awaited</code> 声明类型为 fullfilled Promise</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> p </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Promise</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> a</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Awaited</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">p</span><span style="color:#89DDFF;">&gt;;</span></span></code></pre></div>`,8),p=[l];function o(r,c,i,y,d,D){return e(),a("div",null,p)}const A=s(n,[["render",o]]);export{F as __pageData,A as default};
