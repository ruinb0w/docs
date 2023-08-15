import{_ as s,c as a,o as n,V as e}from"./chunks/framework.e5c4830d.js";const y=JSON.parse('{"title":"react","description":"","frontmatter":{},"headers":[],"relativePath":"src/front-end-rule/react.md","filePath":"src/front-end-rule/react.md"}'),l={name:"src/front-end-rule/react.md"},t=e(`<h1 id="react" tabindex="-1">react <a class="header-anchor" href="#react" aria-label="Permalink to &quot;react&quot;">​</a></h1><h2 id="快速开始" tabindex="-1">快速开始 <a class="header-anchor" href="#快速开始" aria-label="Permalink to &quot;快速开始&quot;">​</a></h2><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">pnpm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">create</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">vite</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 选择react</span></span></code></pre></div><h2 id="jsx" tabindex="-1">jsx <a class="header-anchor" href="#jsx" aria-label="Permalink to &quot;jsx&quot;">​</a></h2><p>react-jsx 有如下几个规则或约定:</p><ol><li>表达式用 <code>{}</code> 包裹</li><li>类名用 <code>className</code> 而不是<code>class</code></li><li>内联样式用</li></ol><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">style={{key:value}}</span></span></code></pre></div><h3 id="变量" tabindex="-1">变量 <a class="header-anchor" href="#变量" aria-label="Permalink to &quot;变量&quot;">​</a></h3><ol><li>变量可以直接存储标签, 而不是标签字符串</li></ol><p>例如</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">const name = &lt;h1&gt;ruinb0w&lt;/h1&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">const age = &lt;h2&gt;10&lt;/h2&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">const user = (</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        {name}</span></span>
<span class="line"><span style="color:#A6ACCD;">        {age}</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">);</span></span></code></pre></div><h3 id="组件" tabindex="-1">组件 <a class="header-anchor" href="#组件" aria-label="Permalink to &quot;组件&quot;">​</a></h3><p>组件约定首字母大写, 组件可以以标签形式或函数调用形式来进行渲染, 建议用标签形式</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">const User = () =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">  const name = &lt;h1&gt;ruinb0w&lt;/h1&gt;;</span></span>
<span class="line"><span style="color:#A6ACCD;">  const age = &lt;h2&gt;10&lt;/h2&gt;;</span></span>
<span class="line"><span style="color:#A6ACCD;">  const user = (</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      {name}</span></span>
<span class="line"><span style="color:#A6ACCD;">      {age}</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  );</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  return user;</span></span>
<span class="line"><span style="color:#A6ACCD;">};</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">export default () =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">  return (</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      {User()} // 函数调用</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;User /&gt; // 标签形式</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  );</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><h2 id="hook" tabindex="-1">hook <a class="header-anchor" href="#hook" aria-label="Permalink to &quot;hook&quot;">​</a></h2><h3 id="usestate" tabindex="-1">useState <a class="header-anchor" href="#usestate" aria-label="Permalink to &quot;useState&quot;">​</a></h3><p><code>useState</code> 用于状态管理, 让 react 知道哪里状态需要重新进行渲染.</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">const [name, setNmae] = useState(&quot;xiaobai&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">name = &quot;xiaohei&quot;; // name的值改变了, 但是页面不会重新渲染</span></span>
<span class="line"><span style="color:#A6ACCD;">setName(&quot;xiaohong&quot;); // name的值改变了, 并且页面重新渲染了</span></span></code></pre></div><h3 id="useeffect" tabindex="-1">useEffect <a class="header-anchor" href="#useeffect" aria-label="Permalink to &quot;useEffect&quot;">​</a></h3><p><code>useEffect</code> 可以在 react 的三个生命周期中触发, mounting, updating, unmouting.</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">useEffect(()=&gt;{</span></span>
<span class="line"><span style="color:#A6ACCD;">console.log(&quot;mouting 和 updating 会执行这个函数&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">return ()=&gt;{</span></span>
<span class="line"><span style="color:#A6ACCD;">    console.log(&quot;unmounting会执行这个函数&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">}, []) // 数组中是要监听的状态变量, 默认是全部, 放一个空数组则不监听.</span></span></code></pre></div><h3 id="usecontext" tabindex="-1">useContext <a class="header-anchor" href="#usecontext" aria-label="Permalink to &quot;useContext&quot;">​</a></h3><p><code>useContext</code>可以避免 props drill, 该 hook 需要配合<code>createContext</code>使用, 具体为以下几个步骤</p><ol><li>祖先组件通过<code>const Context = createContext</code>创建上下文</li><li>祖先组件通过<code>&lt;Context.Provider value={要暴露的内容}&gt;</code> 包裹后代组件并指定要暴露的内容</li><li>子组件通过<code>const value = useContext(ParentContext)</code> 获取祖先组件暴露的内容</li></ol><p>下面是一个例子</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">// Parent.js</span></span>
<span class="line"><span style="color:#A6ACCD;">import { createContext, useState } from &quot;react&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;">import ChildCom from &quot;ChildCom&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">export ParentContext = createContext(); // 创建一个上下文</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">export default ()=&gt;{</span></span>
<span class="line"><span style="color:#A6ACCD;">    const [name, setName] = useState(&quot;ruinb0w&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    return (</span></span>
<span class="line"><span style="color:#A6ACCD;">        /* 通过value属性来指定要暴露的内容 */</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;ParentContext.Provider value={{name}}&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            /* 通过Provider包裹子组件, 使子组件可以获取上下文 */</span></span>
<span class="line"><span style="color:#A6ACCD;">            &lt;ChildCom /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;/ParentContext.Provider&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    )</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">// ChildCom.js</span></span>
<span class="line"><span style="color:#A6ACCD;">import { useState, useContext } from &quot;react&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;">import { ParentContext } from &quot;./Parent&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">export default ()=&gt;{</span></span>
<span class="line"><span style="color:#A6ACCD;">    // 通过useContext来获取ParentContext</span></span>
<span class="line"><span style="color:#A6ACCD;">    const {name} = useContext(ParentContext);</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    return &lt;div&gt;name from parent context: {name}&lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><h2 id="生态" tabindex="-1">生态 <a class="header-anchor" href="#生态" aria-label="Permalink to &quot;生态&quot;">​</a></h2><h3 id="react-router-dom" tabindex="-1">react-router-dom <a class="header-anchor" href="#react-router-dom" aria-label="Permalink to &quot;react-router-dom&quot;">​</a></h3><p>react-router-dom 用于 react 的路由, 其提供了以下几个组件</p><ul><li><code>Route</code> 绑定路由和组件. 提供了<code>path</code>属性来指定路径, <code>element</code>属性来指定组件</li><li><code>Routes</code> 包裹<code>Routes</code></li><li><code>BrowserRouter</code> 包裹<code>Routes</code>和<code>Link</code></li><li><code>Link</code> 用于跳转. 提供了<code>to</code>属性来指定路径</li></ul><p>下面是一个例子</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;Router&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;div className=&quot;nav-bar&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;Link to=&quot;/&quot;&gt;Home&lt;/Link&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;Link to=&quot;/config&quot;&gt;Config&lt;/Link&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;Routes&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;Route path=&quot;/&quot; element={&lt;Home /&gt;} /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;Route path=&quot;/config&quot; element={&lt;Config /&gt;} /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/Routes&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/Router&gt;</span></span></code></pre></div><h3 id="react-query" tabindex="-1">react-query <a class="header-anchor" href="#react-query" aria-label="Permalink to &quot;react-query&quot;">​</a></h3><p>官网链接: <a href="https://tanstack.com/query/v3/" target="_blank" rel="noreferrer">react-query</a></p><p>react-query 网络数据状态管理工具, 方便我们对请求的数据进行管理.</p><p>下面是使用 react-query 的一个简单步骤</p><ol><li>使用<code>QueryClient</code>创建一个请求客户端</li><li>使用<code>QueryClientProvider</code>包裹需要使用 react-query 的组件,并指定 client 为 queryClient</li><li>子组件使用<code>useQuery</code>来包裹请求, 请求返回值会被 react-query 处理并得到一个对象</li></ol><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">// App.js</span></span>
<span class="line"><span style="color:#A6ACCD;">import { QueryClient, QueryClientProvider } from &quot;react-query&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 创建queryClient</span></span>
<span class="line"><span style="color:#A6ACCD;">const queryClient = new QueryClient();</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">export default ()=&gt;{</span></span>
<span class="line"><span style="color:#A6ACCD;">    return (</span></span>
<span class="line"><span style="color:#A6ACCD;">        {/* 使用QueryClientProvider 包裹需要使用react-query的组件,</span></span>
<span class="line"><span style="color:#A6ACCD;">            并指定client为queryClient</span></span>
<span class="line"><span style="color:#A6ACCD;">        */}</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;QueryClientProvider client={queryClient}&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            &lt;MyCom/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;/QueryClientProvider&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    )</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">// MyCom.js</span></span>
<span class="line"><span style="color:#A6ACCD;">import { useQuery} from &quot;react-query&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;">import axios from &quot;axios&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">export default ()=&gt;{</span></span>
<span class="line"><span style="color:#A6ACCD;">    const {data} = useQuery([&quot;请求关键词&quot;], async ()=&gt;{</span></span>
<span class="line"><span style="color:#A6ACCD;">        return axios.get(&quot;地址&quot;).then(res=&gt;res.data)</span></span>
<span class="line"><span style="color:#A6ACCD;">    })</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><h4 id="queryclient" tabindex="-1">QueryClient <a class="header-anchor" href="#queryclient" aria-label="Permalink to &quot;QueryClient&quot;">​</a></h4><p>部分函数签名如下</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">interface Config {</span></span>
<span class="line"><span style="color:#A6ACCD;">  defaultOptions: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    queries: {</span></span>
<span class="line"><span style="color:#A6ACCD;">      refetchOnMount: false; // mounting时重新请求, 默认true</span></span>
<span class="line"><span style="color:#A6ACCD;">      refetchOnWindowFocus: false; // 窗口聚焦时重新请求, 默认true</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  };</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">type QueryClient = (config: Config) =&gt; QueryClient;</span></span></code></pre></div><h4 id="usequery" tabindex="-1">useQuery <a class="header-anchor" href="#usequery" aria-label="Permalink to &quot;useQuery&quot;">​</a></h4><p>部分函数签名如下</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">interface UseQueryResult {</span></span>
<span class="line"><span style="color:#A6ACCD;">  data: any; // awaited queryFn的返回值</span></span>
<span class="line"><span style="color:#A6ACCD;">  isLoading: boolean; // 是否正在请求</span></span>
<span class="line"><span style="color:#A6ACCD;">  isError: boolean; // 请求是否发生错误</span></span>
<span class="line"><span style="color:#A6ACCD;">  refetch: () =&gt; void; // 重新发送请求</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">type useQuery = (queryKey: string[], queryFn: () =&gt; Promise&lt;unknown&gt;) =&gt; UseQueryResult;</span></span></code></pre></div><h3 id="react-hook-form" tabindex="-1">react-hook-form <a class="header-anchor" href="#react-hook-form" aria-label="Permalink to &quot;react-hook-form&quot;">​</a></h3><h3 id="yup" tabindex="-1">yup <a class="header-anchor" href="#yup" aria-label="Permalink to &quot;yup&quot;">​</a></h3><table><thead><tr><th>name</th><th>age</th><th></th><th></th></tr></thead><tbody><tr><td>xiaobai</td><td>10</td><td></td><td></td></tr><tr><td>xiaohei</td><td>20</td><td></td><td></td></tr></tbody></table>`,47),o=[t];function p(c,r,i,C,u,A){return n(),a("div",null,o)}const h=s(l,[["render",p]]);export{y as __pageData,h as default};
