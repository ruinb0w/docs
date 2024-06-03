import{_ as s,c as a,o as n,V as l}from"./chunks/framework.2aaf49fa.js";const A=JSON.parse('{"title":"Guard","description":"","frontmatter":{},"headers":[],"relativePath":"src/maintain/nestjs/9-guards.md","filePath":"src/maintain/nestjs/9-guards.md"}'),o={name:"src/maintain/nestjs/9-guards.md"},p=l(`<h1 id="guard" tabindex="-1">Guard <a class="header-anchor" href="#guard" aria-label="Permalink to &quot;Guard&quot;">​</a></h1><h2 id="简介" tabindex="-1">简介 <a class="header-anchor" href="#简介" aria-label="Permalink to &quot;简介&quot;">​</a></h2><p>Guard 决定是否要让请求被 route hanlder 处理, 它通常被用在权限, 角色等检查上</p><ul><li>Guard 在 Middleware 之后执行</li><li>Guard 返回 <code>boolean | Promise&lt;boolean&gt;</code>, 来决定是否让请求被 route handler 处理</li><li>相较于 Middleware, Guards 可以知道接下来的 route handler 具体是什么, 所以更合适用于验证</li></ul><h2 id="创建" tabindex="-1">创建 <a class="header-anchor" href="#创建" aria-label="Permalink to &quot;创建&quot;">​</a></h2><p>Guard 需要实现 <code>CanActivate</code> 类并用 <code>@Injectable()</code> 进行装饰</p><p>使用 <code>nest g guard 名称</code> 可以快速创建 Guard</p><details><summary> 下面是一个检查请求是否包含token字段的例子 </summary><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">Injectable</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">CanActivate</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">ExecutionContext</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@nestjs/common</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Injectable</span><span style="color:#BABED8;">()</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">class</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">AuthGuard</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">implements</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">CanActivate</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">canActivate</span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;font-style:italic;">context</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">ExecutionContext</span><span style="color:#89DDFF;">):</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">boolean</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">|</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">Promise</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">boolean</span><span style="color:#89DDFF;">&gt;</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">request</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">context</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">switchToHttp</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getRequest</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">!!</span><span style="color:#BABED8;">request</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">headers</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">token</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div></details><h2 id="绑定" tabindex="-1">绑定 <a class="header-anchor" href="#绑定" aria-label="Permalink to &quot;绑定&quot;">​</a></h2><p>Guard 可用于某个 <code>Module</code> <code>Controller</code> <code>Handler</code> 或在 <code>main.ts</code> 全局配置</p><ul><li>绑定在 <code>Module</code> <code>Controller</code> <code>Handler</code> 使用 <code>@useGuards(Guard)</code>装饰器</li><li>绑定在 <code>main.ts</code> 使用 <code>app.useGlobalGuards(Guard)</code></li></ul><p>绑定在 Controller</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Controller</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">cats</span><span style="color:#89DDFF;">&quot;</span><span style="color:#BABED8;">)</span></span>
<span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">UseGuards</span><span style="color:#BABED8;">(AuthGuard)</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">class</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">CatsController</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{}</span></span></code></pre></div><p>绑定在 route handler</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Get</span><span style="color:#BABED8;">()</span></span>
<span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">UseGuards</span><span style="color:#BABED8;">(AuthGuard)</span></span>
<span class="line"><span style="color:#BABED8;">async </span><span style="color:#82AAFF;">findAll</span><span style="color:#BABED8;">() </span><span style="color:#89DDFF;">{}</span></span></code></pre></div><p>绑定在 Global</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#BABED8;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">useGlobalGuards</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">new</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">AuthGuard</span><span style="color:#BABED8;">())</span><span style="color:#89DDFF;">;</span></span></code></pre></div><p>以上的方式 AuthGuard 并不会作为依赖注入到 nestjs 中, 如果我希望让其注入到 nestjs, 可以像下面这样, 绑定到 Module 中</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">Module</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@nestjs/common</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">APP_GUARD</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@nestjs/core</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Module</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">providers</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> [</span><span style="color:#89DDFF;">{</span><span style="color:#BABED8;"> </span><span style="color:#F07178;">provide</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> APP_GUARD</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#F07178;">useClass</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> AuthGuard </span><span style="color:#89DDFF;">}</span><span style="color:#BABED8;">]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#BABED8;">)</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">class</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">AppModule</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{}</span></span></code></pre></div><blockquote><p>并不必须放在 <code>AppModule</code> 中, 但作为全局 Guards, 推荐放在 <code>AppModule</code> 中</p></blockquote><h3 id="reflector-metadata" tabindex="-1">Reflector &amp; MetaData <a class="header-anchor" href="#reflector-metadata" aria-label="Permalink to &quot;Reflector &amp; MetaData&quot;">​</a></h3><p>利用 MetaData 可以将数据绑定到 route handler 上, 然后使用 Reflector 获取绑定的数据</p><p>如果想实现给 Guard 传递参数的话, 可以使用 <code>Reflector</code> 来获取参数, 并且 Guard 要使用绑定到 Module 的形式</p><details><summary> 下面是一个角色校验的例子 </summary><ol><li>首先编写一个 Guard</li></ol><blockquote><p>你可以注意到下面的代码使用到了 <code>Reflector</code> 和 <code>ExecutionContext</code></p></blockquote><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// guards/roles/roles.guard.ts</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">CanActivate</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">ExecutionContext</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">Injectable</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@nestjs/common</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">Observable</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">rxjs</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">Reflector</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@nestjs/core</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Injectable</span><span style="color:#BABED8;">()</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">class</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">RolesGuard</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">implements</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">CanActivate</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#C792EA;">constructor</span><span style="color:#89DDFF;">(</span><span style="color:#C792EA;">private</span><span style="color:#BABED8;"> </span><span style="color:#BABED8;font-style:italic;">reflector</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">Reflector</span><span style="color:#89DDFF;">)</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">canActivate</span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;font-style:italic;">context</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">ExecutionContext</span><span style="color:#89DDFF;">):</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">boolean</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">|</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">Promise</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">boolean</span><span style="color:#89DDFF;">&gt;</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">|</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">Observable</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">boolean</span><span style="color:#89DDFF;">&gt;</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">roles</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">this.</span><span style="color:#BABED8;">reflector</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">get</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">roles</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">context</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getHandler</span><span style="color:#F07178;">())</span><span style="color:#89DDFF;">;</span><span style="color:#F07178;"> </span><span style="color:#676E95;font-style:italic;">// reflect roles from decorator in route handler</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">request</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">context</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">switchToHttp</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getRequest</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">roles</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">roles</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#BABED8;">request</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">locals</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">user</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">roles</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">some</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;font-style:italic;">role</span><span style="color:#89DDFF;">)</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">roles</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">includes</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">role</span><span style="color:#F07178;">))) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">false</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><ol start="2"><li>把我们的 Guard 绑定到 Module 中</li></ol><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// app.module.ts</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">Module</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@nestjs/common</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">AppController</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">./app.controller</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">AppService</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">./app.service</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">CatsModule</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">./cats/cats.module</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">RolesGuard</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">./guards/role/role.guard</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">APP_GUARD</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@nestjs/core</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Module</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">imports</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> [CatsModule]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">controllers</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> [AppController]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">providers</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> [AppService</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span><span style="color:#BABED8;"> </span><span style="color:#F07178;">provide</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> APP_GUARD</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#F07178;">useClass</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> RolesGuard </span><span style="color:#89DDFF;">}</span><span style="color:#BABED8;">]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#BABED8;">)</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">class</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">AppModule</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{}</span></span></code></pre></div><ol start="3"><li>下面是一个装饰器, 可以设置一些元数据</li></ol><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// guards/roles/roles.decorator.ts</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">Reflector</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@nestjs/core</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">const</span><span style="color:#BABED8;"> Roles </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> Reflector</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">createDecorator</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">string</span><span style="color:#BABED8;">[]</span><span style="color:#89DDFF;">&gt;</span><span style="color:#BABED8;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 也可以采用另一种方式</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// import { SetMetadata } from &quot;@nestjs/common&quot;;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// export const Roles = (roles: string[]) =&gt; SetMetadata(&#39;roles&#39;, args);</span></span></code></pre></div><ol start="4"><li>最后在 route hanlder 中使用我们的 Guard</li></ol><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">Controller</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@nestjs/common</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">Roles</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">src/guards/role/roles.decorator</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">Get</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@nestjs/common</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Controller</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">cats</span><span style="color:#89DDFF;">&quot;</span><span style="color:#BABED8;">)</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">class</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">CatsController</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Get</span><span style="color:#BABED8;">()</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Roles</span><span style="color:#BABED8;">([</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">admin</span><span style="color:#89DDFF;">&quot;</span><span style="color:#BABED8;">]) </span><span style="color:#676E95;font-style:italic;">// this route handler can only be accessed by admin</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">findAll</span><span style="color:#89DDFF;">():</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">This action returns all cats</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div></details>`,24),t=[p];function e(c,r,D,y,F,B){return n(),a("div",null,t)}const E=s(o,[["render",e]]);export{A as __pageData,E as default};
