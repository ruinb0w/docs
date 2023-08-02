import{_ as s,c as a,o as n,V as l}from"./chunks/framework.ba5de448.js";const b=JSON.parse('{"title":"证书","description":"","frontmatter":{},"headers":[],"relativePath":"doc/maintain/certbot.md","filePath":"doc/maintain/certbot.md"}'),e={name:"doc/maintain/certbot.md"},o=l(`<h1 id="证书" tabindex="-1">证书 <a class="header-anchor" href="#证书" aria-label="Permalink to &quot;证书&quot;">​</a></h1><h2 id="rocky-9" tabindex="-1">rocky 9 <a class="header-anchor" href="#rocky-9" aria-label="Permalink to &quot;rocky 9&quot;">​</a></h2><h3 id="mongodb" tabindex="-1">mongodb <a class="header-anchor" href="#mongodb" aria-label="Permalink to &quot;mongodb&quot;">​</a></h3><p>加入 mongodb 仓库信息</p><div class="language-toml"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># /etc/yum.repos.d/mongodb-org-6.0.repo</span></span>
<span class="line"><span style="color:#89DDFF;">[</span><span style="color:#FFCB6B;">mongodb-org-6</span><span style="color:#A6ACCD;">.</span><span style="color:#FFCB6B;">0</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#A6ACCD;">name</span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;">MongoDB Repository</span></span>
<span class="line"><span style="color:#A6ACCD;">baseurl</span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;">https://repo.mongodb.org/yum/redhat/8/mongodb-org/6.0/x86_64/</span></span>
<span class="line"><span style="color:#A6ACCD;">gpgcheck</span><span style="color:#89DDFF;">=</span><span style="color:#F78C6C;">1</span></span>
<span class="line"><span style="color:#A6ACCD;">enabled</span><span style="color:#89DDFF;">=</span><span style="color:#F78C6C;">1</span></span>
<span class="line"><span style="color:#A6ACCD;">gpgkey</span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;">https://www.mongodb.org/static/pgp/server-6.0.asc</span></span></code></pre></div><p>安装 mongodb</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">dnf</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">install</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">mongodb-org</span></span></code></pre></div><h3 id="软件源" tabindex="-1">软件源 <a class="header-anchor" href="#软件源" aria-label="Permalink to &quot;软件源&quot;">​</a></h3><p><a href="https://mirrors.tuna.tsinghua.edu.cn/help/epel/" target="_blank" rel="noreferrer">epel | 镜像站使用帮助 | 清华大学开源软件镜像站 | Tsinghua Open Source Mirror</a></p><p><a href="https://mirrors.ustc.edu.cn/help/rocky.html" target="_blank" rel="noreferrer">Rocky Linux 源使用帮助 — USTC Mirror Help 文档</a></p><h3 id="修改默认-shell" tabindex="-1">修改默认 shell <a class="header-anchor" href="#修改默认-shell" aria-label="Permalink to &quot;修改默认 shell&quot;">​</a></h3><h3 id="防火墙" tabindex="-1">防火墙 <a class="header-anchor" href="#防火墙" aria-label="Permalink to &quot;防火墙&quot;">​</a></h3><p>开启防火墙</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">systemctl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">status</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">firewalld</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 如果没有开启的话手动开启一下</span></span>
<span class="line"><span style="color:#FFCB6B;">systemctl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">start</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">firewalld</span></span>
<span class="line"><span style="color:#FFCB6B;">systemctl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">enable</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">firewalld</span></span></code></pre></div><p>添加端口白名单</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">firewall-cmd</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--zone=public</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--add-port=27017/tcp</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--permanent</span></span></code></pre></div><p>启用修改</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">firewall-cmd</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--reload</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 效果和下面一样</span></span>
<span class="line"><span style="color:#FFCB6B;">systemctl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">restart</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">firewalld</span></span></code></pre></div><h3 id="ssl-证书" tabindex="-1">SSL 证书 <a class="header-anchor" href="#ssl-证书" aria-label="Permalink to &quot;SSL 证书&quot;">​</a></h3><h3 id="生成证书" tabindex="-1">生成证书 <a class="header-anchor" href="#生成证书" aria-label="Permalink to &quot;生成证书&quot;">​</a></h3><p>使用 letsencrypt 的 <code>certbot</code> 工具</p><div class="language-ba&#39;sh"><button title="Copy Code" class="copy"></button><span class="lang">ba&#39;sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">dnf install certbot</span></span></code></pre></div><p>生成证书</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">certbot</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">certonly</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--manual</span></span></code></pre></div><p>按照提示在 80 端口启动一个 http 服务, 以完成验证</p><h3 id="更新证书" tabindex="-1">更新证书 <a class="header-anchor" href="#更新证书" aria-label="Permalink to &quot;更新证书&quot;">​</a></h3><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">certbot</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">certonly</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-d</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">my.domain.com</span></span></code></pre></div>`,27),p=[o];function t(r,c,i,d,C,y){return n(),a("div",null,p)}const m=s(e,[["render",t]]);export{b as __pageData,m as default};
