import{P as D}from"./chunks/PhoneFrame.0cc49e5a.js";import{d as c,g as F,o as d,c as u,k as n,r as y,n as i,e as m,_ as C,h,L as l,w as r,U as A,a as _}from"./chunks/framework.93795505.js";const f={key:0,class:"popup"},P=c({__name:"Popup",props:{modelValue:Boolean,round:{type:Boolean,default:!0}},emits:["update:modelValue"],setup(t,{emit:o}){const p=t,s=F({get:()=>p.modelValue,set:a=>o("update:modelValue",a)});return(a,e)=>s.value?(d(),u("div",f,[n("div",{class:"shadow",onClick:e[0]||(e[0]=q=>s.value=!1)}),n("div",{class:i(["content",{round:t.round}])},[y(a.$slots,"default",{},void 0,!0)],2)])):m("",!0)}});const v=C(P,[["__scopeId","data-v-41ce998b"]]),b=A(`<h1 id="popup" tabindex="-1">Popup <a class="header-anchor" href="#popup" aria-label="Permalink to &quot;Popup&quot;">​</a></h1><p>Popup 是一个简单的底部弹窗组件</p><h2 id="用例" tabindex="-1">用例 <a class="header-anchor" href="#用例" aria-label="Permalink to &quot;用例&quot;">​</a></h2><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">setup</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> Popup </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">../../components/Popup/Popup.vue</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> showPopup </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">ref</span><span style="color:#A6ACCD;">(</span><span style="color:#FF9CAC;">false</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">@click</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">showPopup = true</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">显示</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">Popup</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">v-model</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">showPopup</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">弹窗内容</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">Popup</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><h2 id="属性" tabindex="-1">属性 <a class="header-anchor" href="#属性" aria-label="Permalink to &quot;属性&quot;">​</a></h2><table><thead><tr><th>属性</th><th>类型</th><th>默认值</th><th>说明</th></tr></thead><tbody><tr><td>v-model</td><td>boolean</td><td></td><td>是否显示弹窗</td></tr><tr><td>slot</td><td>component</td><td></td><td>弹窗内容</td></tr></tbody></table>`,6),x=JSON.parse('{"title":"Popup","description":"","frontmatter":{},"headers":[],"relativePath":"doc/components/popup.md","filePath":"doc/components/popup.md"}'),g={name:"doc/components/popup.md"},w=c({...g,setup(t){const o=h(!1);return(p,s)=>(d(),u("div",null,[l(D,{title:"Popup"},{default:r(()=>[n("button",{class:"btn",onClick:s[0]||(s[0]=a=>o.value=!0)},"显示"),l(v,{modelValue:o.value,"onUpdate:modelValue":s[1]||(s[1]=a=>o.value=a)},{default:r(()=>[_("弹窗内容")]),_:1},8,["modelValue"])]),_:1}),b]))}});export{x as __pageData,w as default};