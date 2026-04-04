import{A as v}from"./Anchor-DFugbuOd.js";import{_ as u}from"./BlockCode.vue_vue_type_script_setup_true_lang-aF6LFxrO.js";import{_ as f}from"./Delimiter.vue_vue_type_script_setup_true_lang-Bf8vdWUu.js";import{_ as l}from"./Fold.vue_vue_type_style_index_0_lang-7RQKupVW.js";import{_ as M}from"./Grid.vue_vue_type_style_index_0_lang-JczKKHNA.js";import{H as i}from"./Heading-CMG0w2Hv.js";import{d as I,o as r,e as T,a as t,a6 as E,u as e,w as p,f as s,r as $,c as w,t as o,B as S,_ as W,b as a,F as c,p as O}from"./index-BWOvinVT.js";import"./animate-height-Cvwt0ZRf.js";import"./vendor-katex-BDPLvt6s.js";const D={class:"linkcard"},F={class:"content"},G={class:"item title"},P={class:"item link"},V={class:"icon"},L={class:"href"},N={class:"logo"},J=I({__name:"LinkCard",props:{href:{}},setup(d){const m=d,g=/^https?:\/\/|^\/assets\//.test(m.href),y=/github\.com/.test(m.href);return(x,b)=>{const k=S("font-awesome-icon");return r(),T("div",D,[t(E,{src:d.href,mode:e(g)?"jump":"stay"},{default:p(()=>[s("div",F,[s("div",G,[$(x.$slots,"default",{},void 0,!0)]),s("div",P,[s("span",V,[e(g)?(r(),w(k,{key:0,icon:["fas","arrow-up-right-from-square"]})):(r(),w(k,{key:1,icon:["far","star"]}))]),s("span",L,o(d.href),1)])]),s("div",N,[e(y)?(r(),w(k,{key:0,icon:["fab","github"]})):(r(),w(k,{key:1,icon:["fas","link"]}))])]),_:3},8,["src","mode"])])}}}),z=W(J,[["__scopeId","data-v-0f2cf9e8"]]),K={class:"quote"},Q=`<code class="language-markdown"><span class="token title important"><span class="token punctuation">#</span> Hello **World** // 整一个结构而不关注加粗逻辑</span>
</code>`,U=`<code class="language-json"><span class="token punctuation">[</span>
  <span class="token punctuation">{</span>
    <span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"heading_open"</span><span class="token punctuation">,</span>
    <span class="token property">"tag"</span><span class="token operator">:</span> <span class="token string">"h1"</span><span class="token punctuation">,</span>
    <span class="token property">"nesting"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>      <span class="token comment">// 1 代表开始标签</span>
    <span class="token property">"level"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token property">"markup"</span><span class="token operator">:</span> <span class="token string">"#"</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"inline"</span><span class="token punctuation">,</span>
    ...
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"heading_close"</span><span class="token punctuation">,</span>
    <span class="token property">"tag"</span><span class="token operator">:</span> <span class="token string">"h1"</span><span class="token punctuation">,</span>
    <span class="token property">"nesting"</span><span class="token operator">:</span> <span class="token number">-1</span>      <span class="token comment">// -1 代表闭合标签</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code>`,X=`<code class="language-json"><span class="token punctuation">{</span>
    <span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"inline"</span><span class="token punctuation">,</span>
    <span class="token property">"tag"</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
    <span class="token property">"nesting"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>      <span class="token comment">// 0 代表内容节点</span>
    <span class="token property">"level"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">"content"</span><span class="token operator">:</span> <span class="token string">"Hello **World**"</span><span class="token punctuation">,</span> <span class="token comment">// 注意：这时候还没解析加粗</span>
    <span class="token property">"children"</span><span class="token operator">:</span> <span class="token punctuation">[</span>      <span class="token comment">// 这是 Inline 阶段生成的子 Token</span>
       <span class="token punctuation">{</span> <span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"text"</span><span class="token punctuation">,</span> <span class="token property">"content"</span><span class="token operator">:</span> <span class="token string">"Hello "</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
       <span class="token punctuation">{</span> <span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"strong_open"</span><span class="token punctuation">,</span> <span class="token property">"tag"</span><span class="token operator">:</span> <span class="token string">"strong"</span><span class="token punctuation">,</span> <span class="token property">"nesting"</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
       <span class="token punctuation">{</span> <span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"text"</span><span class="token punctuation">,</span> <span class="token property">"content"</span><span class="token operator">:</span> <span class="token string">"World"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
       <span class="token punctuation">{</span> <span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"strong_close"</span><span class="token punctuation">,</span> <span class="token property">"tag"</span><span class="token operator">:</span> <span class="token string">"strong"</span><span class="token punctuation">,</span> <span class="token property">"nesting"</span><span class="token operator">:</span> <span class="token number">-1</span> <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
</code>`,Y=`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span> 
    Hello <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>strong</span><span class="token punctuation">></span></span>World<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>strong</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>
</code>`,Z=`<code class="language-ts"><span class="token keyword">import</span> MarkdownIt <span class="token keyword">from</span> <span class="token string">"markdown-it"</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> codeBlock <span class="token keyword">from</span> <span class="token string">"./plugins/code-block"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> codeInline <span class="token keyword">from</span> <span class="token string">"./plugins/code-inline"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> math <span class="token keyword">from</span> <span class="token string">"./plugins/math"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> icon <span class="token keyword">from</span> <span class="token string">"./plugins/icon"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> link <span class="token keyword">from</span> <span class="token string">"./plugins/link"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> heading <span class="token keyword">from</span> <span class="token string">"./plugins/heading"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> image <span class="token keyword">from</span> <span class="token string">"./plugins/image"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> checkbox <span class="token keyword">from</span> <span class="token string">"./plugins/checkbox"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> mdc <span class="token keyword">from</span> <span class="token string">"./plugins/mdc"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> delim <span class="token keyword">from</span> <span class="token string">"./plugins/delim"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> tags <span class="token keyword">from</span> <span class="token string">"./plugins/tags"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> cjk <span class="token keyword">from</span> <span class="token string">"./plugins/cjk"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> attrs <span class="token keyword">from</span> <span class="token string">"./plugins/attrs"</span><span class="token punctuation">;</span>

<span class="token comment">/**
 * Get a markdown-it instance.
 *
 * @returns MarkdownIt instance
 */</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> MarkdownIt <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token comment">/**
     * MarkdownIt Configurations
     *
     * @see https://markdown-it.github.io/markdown-it/#MarkdownIt.new
     */</span>
    <span class="token keyword">const</span> md <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MarkdownIt</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        html<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        typographer<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        xhtmlOut<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    md<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>codeBlock<span class="token punctuation">)</span><span class="token punctuation">;</span>
    md<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>codeInline<span class="token punctuation">)</span><span class="token punctuation">;</span>
    md<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>math<span class="token punctuation">)</span><span class="token punctuation">;</span>
    md<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>icon<span class="token punctuation">)</span><span class="token punctuation">;</span>
    md<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>link<span class="token punctuation">)</span><span class="token punctuation">;</span>
    md<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>heading<span class="token punctuation">)</span><span class="token punctuation">;</span>
    md<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>image<span class="token punctuation">)</span><span class="token punctuation">;</span>
    md<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>checkbox<span class="token punctuation">)</span><span class="token punctuation">;</span>
    md<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>mdc<span class="token punctuation">)</span><span class="token punctuation">;</span>
    md<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>delim<span class="token punctuation">)</span><span class="token punctuation">;</span>
    md<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>tags<span class="token punctuation">)</span><span class="token punctuation">;</span>
    md<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>cjk<span class="token punctuation">)</span><span class="token punctuation">;</span>
    md<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>attrs<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// console.log(md.core.ruler.__rules__.map((r) => r.name));</span>
    <span class="token comment">// console.log(md.inline.ruler.__rules__.map((r) => r.name));</span>

    <span class="token keyword">return</span> md<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code>`,h="use",nn=`<code class="language-ts"><span class="token keyword">import</span> <span class="token keyword">type</span> <span class="token punctuation">{</span> RenderRule <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"markdown-it/lib/renderer.mjs"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token keyword">type</span> <span class="token class-name">Token</span> <span class="token keyword">from</span> <span class="token string">"markdown-it/lib/token.mjs"</span><span class="token punctuation">;</span>

<span class="token comment">/** The default token renderer. */</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> defaultRenderer<span class="token operator">:</span> <span class="token function-variable function">RenderRule</span> <span class="token operator">=</span> <span class="token punctuation">(</span>tokens<span class="token punctuation">,</span> idx<span class="token punctuation">,</span> options<span class="token punctuation">,</span> env<span class="token punctuation">,</span> self<span class="token punctuation">)</span> <span class="token operator">=></span>
    self<span class="token punctuation">.</span><span class="token function">renderToken</span><span class="token punctuation">(</span>tokens<span class="token punctuation">,</span> idx<span class="token punctuation">,</span> options<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">/**
 * Remove attribute on token.
 *
 * @param token - Token
 * @param name - Attribute name
 */</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">removeAttr</span> <span class="token operator">=</span> <span class="token punctuation">(</span>token<span class="token operator">:</span> Token<span class="token punctuation">,</span> name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> idx <span class="token operator">=</span> token<span class="token punctuation">.</span><span class="token function">attrIndex</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>idx <span class="token operator">!==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        token<span class="token punctuation">.</span>attrs<span class="token operator">!</span><span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span>idx<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">/** Supported color themes. */</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token constant">THEMES</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token string">"default"</span><span class="token punctuation">,</span>
    <span class="token string">"success"</span><span class="token punctuation">,</span>
    <span class="token string">"info"</span><span class="token punctuation">,</span>
    <span class="token string">"warning"</span><span class="token punctuation">,</span>
    <span class="token string">"danger"</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token punctuation">{</span> <span class="token keyword">default</span> <span class="token keyword">as</span> typst <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"./typst"</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token punctuation">{</span> <span class="token keyword">default</span> <span class="token keyword">as</span> extractText <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"../../entry/text"</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token punctuation">{</span> <span class="token keyword">default</span> <span class="token keyword">as</span> MarkdownItWrapper <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"../markdown-it-wrapper"</span><span class="token punctuation">;</span>

</code>`,sn=`<code class="language-ts"><span class="token comment">/**
 * Processes syntax like &lt;marker>text&lt;marker>.
 *
 * @param md - MarkdownIt instance
 * @param options - Options
 */</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">(</span>md<span class="token operator">:</span> MarkdownIt<span class="token punctuation">,</span> args<span class="token operator">:</span> MarkdownItWrapperOptions<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>args<span class="token punctuation">.</span>type <span class="token operator">===</span> <span class="token string">"inline"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// Inline syntax</span>
        md<span class="token punctuation">.</span>inline<span class="token punctuation">.</span>ruler<span class="token punctuation">.</span><span class="token function">after</span><span class="token punctuation">(</span><span class="token string">"escape"</span><span class="token punctuation">,</span> args<span class="token punctuation">.</span>name<span class="token punctuation">,</span> <span class="token function">inline_rule_with</span><span class="token punctuation">(</span>args<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>args<span class="token punctuation">.</span>type <span class="token operator">===</span> <span class="token string">"block"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// Block syntax</span>
        md<span class="token punctuation">.</span>block<span class="token punctuation">.</span>ruler<span class="token punctuation">.</span><span class="token function">after</span><span class="token punctuation">(</span><span class="token string">"blockquote"</span><span class="token punctuation">,</span> args<span class="token punctuation">.</span>name<span class="token punctuation">,</span> <span class="token function">block_rule_with</span><span class="token punctuation">(</span>args<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
            alt<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"paragraph"</span><span class="token punctuation">,</span> <span class="token string">"reference"</span><span class="token punctuation">,</span> <span class="token string">"blockquote"</span><span class="token punctuation">,</span> <span class="token string">"list"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">const</span> renderer<span class="token operator">:</span> <span class="token function-variable function">RenderRule</span> <span class="token operator">=</span> <span class="token punctuation">(</span>tokens<span class="token punctuation">,</span> idx<span class="token punctuation">,</span> options<span class="token punctuation">,</span> env<span class="token punctuation">,</span> self<span class="token punctuation">)</span> <span class="token operator">=></span>
        args<span class="token punctuation">.</span><span class="token function">renderer</span><span class="token punctuation">(</span>tokens<span class="token punctuation">[</span>idx<span class="token punctuation">]</span><span class="token punctuation">,</span> env<span class="token punctuation">)</span><span class="token punctuation">;</span>

    md<span class="token punctuation">.</span>renderer<span class="token punctuation">.</span>rules<span class="token punctuation">[</span>args<span class="token punctuation">.</span>name<span class="token punctuation">]</span> <span class="token operator">=</span> renderer<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code>`,an="icon.ts",tn=`<code class="language-ts"><span class="token keyword">import</span> <span class="token punctuation">{</span> Token <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"markdown-it"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> MarkdownItWrapper <span class="token keyword">from</span> <span class="token string">"../markdown-it-wrapper"</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token keyword">type</span> <span class="token class-name">MarkdownIt</span> <span class="token keyword">from</span> <span class="token string">"markdown-it"</span><span class="token punctuation">;</span>

<span class="token comment">/**
 * Transform \`:...:\` into FontAwesome components.
 *
 *  - \`:flag:\` => \`&lt;font-awesome-icon class="icon" icon="fa-solid fa-flag" />\`
 *  - \`:user.r:\` => \`&lt;font-awesome-icon class="icon" icon="fa-regular fa-user" />\`
 *  - \`:github.b:\` => \`&lt;font-awesome-icon class="icon" icon="fa-brands fa-github" />\`
 *
 * @param md - MarkdownIt instance
 */</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">(</span>md<span class="token operator">:</span> MarkdownIt<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    md<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>MarkdownItWrapper<span class="token punctuation">,</span> <span class="token punctuation">{</span>
        type<span class="token operator">:</span> <span class="token string">"inline"</span><span class="token punctuation">,</span>
        name<span class="token operator">:</span> <span class="token string">"icon_inline"</span><span class="token punctuation">,</span>
        marker<span class="token operator">:</span> <span class="token string">":"</span><span class="token punctuation">,</span>
        <span class="token function-variable function">renderer</span><span class="token operator">:</span> <span class="token punctuation">(</span>token<span class="token operator">:</span> Token<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token keyword">let</span> cls <span class="token operator">=</span> token<span class="token punctuation">.</span><span class="token function">attrGet</span><span class="token punctuation">(</span><span class="token string">"class"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">let</span> id <span class="token operator">=</span> token<span class="token punctuation">.</span><span class="token function">attrGet</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            cls <span class="token operator">=</span> cls <span class="token operator">?</span> <span class="token string">" "</span> <span class="token operator">+</span> cls <span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">;</span>
            id <span class="token operator">=</span> id <span class="token operator">?</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string"> id="</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>id<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">"</span><span class="token template-punctuation string">\`</span></span> <span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">;</span>

            <span class="token keyword">const</span> <span class="token punctuation">[</span>icon<span class="token punctuation">,</span> style<span class="token punctuation">]</span> <span class="token operator">=</span> token<span class="token punctuation">.</span>content<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">"."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">const</span> type <span class="token operator">=</span>
                style <span class="token operator">===</span> <span class="token string">"r"</span> <span class="token operator">?</span> <span class="token string">"regular"</span> <span class="token operator">:</span> style <span class="token operator">===</span> <span class="token string">"b"</span> <span class="token operator">?</span> <span class="token string">"brands"</span> <span class="token operator">:</span> <span class="token string">"solid"</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;font-awesome-icon</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>id<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> class="icon</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>cls<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">" icon="fa-</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token keyword">type</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> fa-</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>icon<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">" /></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code>`,pn=":",on=":",en=".r",cn=`<code class="language-ts"><span class="token comment">// @ts-ignore</span>
<span class="token keyword">import</span> MarkdownItForInline <span class="token keyword">from</span> <span class="token string">"markdown-it-for-inline"</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token keyword">type</span> <span class="token class-name">MarkdownIt</span> <span class="token keyword">from</span> <span class="token string">"markdown-it"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token keyword">type</span> <span class="token class-name">Token</span> <span class="token keyword">from</span> <span class="token string">"markdown-it/lib/token.mjs"</span><span class="token punctuation">;</span>

<span class="token comment">/**
 * Transform \`&lt;a>\` into \`Anchor\` component.
 *
 * @param md - MarkdownIt instance
 */</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">(</span>md<span class="token operator">:</span> MarkdownIt<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token comment">/**
     * @name markdown-it-for-inline
     * @see https://github.com/markdown-it/markdown-it-for-inline
     */</span>

    md<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>
        MarkdownItForInline<span class="token punctuation">,</span>
        <span class="token string">"vueify_anchor_open"</span><span class="token punctuation">,</span>
        <span class="token string">"link_open"</span><span class="token punctuation">,</span>
        <span class="token punctuation">(</span>tokens<span class="token operator">:</span> Token<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> idx<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            tokens<span class="token punctuation">[</span>idx<span class="token punctuation">]</span><span class="token punctuation">.</span>tag <span class="token operator">=</span> <span class="token string">"Anchor"</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>

    md<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>
        MarkdownItForInline<span class="token punctuation">,</span>
        <span class="token string">"vueify_anchor_close"</span><span class="token punctuation">,</span>
        <span class="token string">"link_close"</span><span class="token punctuation">,</span>
        <span class="token punctuation">(</span>tokens<span class="token operator">:</span> Token<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> idx<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            tokens<span class="token punctuation">[</span>idx<span class="token punctuation">]</span><span class="token punctuation">.</span>tag <span class="token operator">=</span> <span class="token string">"Anchor"</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code>`,ln="[]()",un="link_open",kn="text",rn="link_close",dn="<a></a>",mn="<anchor></anchor>",gn="mdc.ts",fn="v-bind",wn="::",yn="{}",xn=":",bn=":",vn=":",Mn=":",In=`<code class="language-ts"><span class="token comment">/**
 * Transform MDC components.
 *
 * @param md - MarkdownIt instance
 */</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">(</span>md<span class="token operator">:</span> MarkdownIt<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token comment">/**
     * @name markdown-it-mdc
     * @see https://github.com/antfu/markdown-it-mdc
     */</span>

    md<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>MarkdownItMdc<span class="token punctuation">,</span> <span class="token punctuation">{</span>
        syntax<span class="token operator">:</span> <span class="token punctuation">{</span> inlineSpan<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> inlineProps<span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">const</span> originalMdcBlockOpen <span class="token operator">=</span>
        md<span class="token punctuation">.</span>renderer<span class="token punctuation">.</span>rules<span class="token punctuation">.</span>mdc_block_open <span class="token operator">||</span> defaultRenderer<span class="token punctuation">;</span>
    <span class="token keyword">const</span> originalMdcBlockShorthand <span class="token operator">=</span>
        md<span class="token punctuation">.</span>renderer<span class="token punctuation">.</span>rules<span class="token punctuation">.</span>mdc_block_shorthand <span class="token operator">||</span> defaultRenderer<span class="token punctuation">;</span>

    md<span class="token punctuation">.</span>renderer<span class="token punctuation">.</span>rules<span class="token punctuation">.</span><span class="token function-variable function">mdc_block_open</span> <span class="token operator">=</span> <span class="token punctuation">(</span>
        tokens<span class="token punctuation">,</span>
        idx<span class="token punctuation">,</span>
        options<span class="token punctuation">,</span>
        env<span class="token operator">:</span> MarkdownItEnv<span class="token punctuation">,</span>
        self
    <span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> token <span class="token operator">=</span> tokens<span class="token punctuation">[</span>idx<span class="token punctuation">]</span><span class="token punctuation">;</span>

        <span class="token function">convertToAttribute</span><span class="token punctuation">(</span>token<span class="token punctuation">,</span> <span class="token punctuation">{</span> fold<span class="token operator">:</span> <span class="token constant">THEMES</span><span class="token punctuation">,</span> note<span class="token operator">:</span> <span class="token constant">THEMES</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">convertToJsx</span><span class="token punctuation">(</span>token<span class="token punctuation">,</span> md<span class="token punctuation">,</span> env<span class="token punctuation">,</span> <span class="token punctuation">{</span> fold<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"title"</span><span class="token punctuation">]</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">convertToBoolean</span><span class="token punctuation">(</span>token<span class="token punctuation">,</span> <span class="token punctuation">{</span> fold<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"always"</span><span class="token punctuation">,</span> <span class="token string">"expand"</span><span class="token punctuation">]</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">return</span> <span class="token function">originalMdcBlockOpen</span><span class="token punctuation">(</span>tokens<span class="token punctuation">,</span> idx<span class="token punctuation">,</span> options<span class="token punctuation">,</span> env<span class="token punctuation">,</span> self<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>

    md<span class="token punctuation">.</span>renderer<span class="token punctuation">.</span>rules<span class="token punctuation">.</span><span class="token function-variable function">mdc_block_shorthand</span> <span class="token operator">=</span> <span class="token punctuation">(</span>
        tokens<span class="token punctuation">,</span>
        idx<span class="token punctuation">,</span>
        options<span class="token punctuation">,</span>
        env<span class="token operator">:</span> MarkdownItEnv<span class="token punctuation">,</span>
        self
    <span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> token <span class="token operator">=</span> tokens<span class="token punctuation">[</span>idx<span class="token punctuation">]</span><span class="token punctuation">;</span>

        <span class="token function">convertShorthand</span><span class="token punctuation">(</span>token<span class="token punctuation">,</span> env<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">return</span> <span class="token function">originalMdcBlockShorthand</span><span class="token punctuation">(</span>tokens<span class="token punctuation">,</span> idx<span class="token punctuation">,</span> options<span class="token punctuation">,</span> env<span class="token punctuation">,</span> self<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code>`,Tn="::",_n="use(MarkdownItMdc)",jn=`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>grid</span> <span class="token attr-name">align</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span>equal</span> <span class="token attr-name">gapx</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span>10px</span> <span class="token attr-name">gapy</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span>20px</span><span class="token punctuation">></span></span>
    ...
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>grid</span><span class="token punctuation">></span></span>
</code>`,Rn=`<code class="language-ts">    targets<span class="token operator">:</span> Targets
<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>targets<span class="token punctuation">[</span>token<span class="token punctuation">.</span>info<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> attrs <span class="token operator">=</span> targets<span class="token punctuation">[</span>token<span class="token punctuation">.</span>info<span class="token punctuation">]</span><span class="token punctuation">;</span>

        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> attr <span class="token keyword">of</span> attrs<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>token<span class="token punctuation">.</span><span class="token function">attrGet</span><span class="token punctuation">(</span>attr<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">let</span> code <span class="token operator">=</span> token<span class="token punctuation">.</span><span class="token function">attrGet</span><span class="token punctuation">(</span>attr<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token string">""</span><span class="token punctuation">;</span>
                <span class="token keyword">let</span> content <span class="token operator">=</span> md
                    <span class="token punctuation">.</span><span class="token function">renderInline</span><span class="token punctuation">(</span>code<span class="token punctuation">,</span> <span class="token punctuation">{</span> entry<span class="token operator">:</span> env<span class="token punctuation">.</span>entry<span class="token punctuation">,</span> tsx<span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">let</span> id <span class="token operator">=</span> env<span class="token punctuation">.</span>entry<span class="token punctuation">.</span><span class="token function">expr</span><span class="token punctuation">(</span><span class="token string">"&lt;>"</span> <span class="token operator">+</span> content <span class="token operator">+</span> <span class="token string">"&lt;/>"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

                token<span class="token punctuation">.</span><span class="token function">attrSet</span><span class="token punctuation">(</span><span class="token string">":"</span> <span class="token operator">+</span> attr<span class="token punctuation">,</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token function">removeAttr</span><span class="token punctuation">(</span>token<span class="token punctuation">,</span> attr<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code>`,Bn="v-bind",An="<div>",Hn="<span>",qn="<fold> => <Fold>，<dot-pattern> => <DotPattern>",Vn=I({__name:"markdown-it",setup(d){O("katex-macros",{});const m=t(c,null,[t("em",null,[a("About markdown-it")])]),g=t(c,null,[t("em",null,[a("Hello world")]),a(" example")]),y=t(c,null,[a("Output in block level")]),x=t(c,null,[a("Output in inline level")]),b=t(c,null,[a("Render Example")]),k=t(c,null,[a("md/index.js")]),_=t(c,null,[a("util/index.js")]),j=t(c,null,[a("markdwon-it-wrapper/index.js")]),R=t(c,null,[a("icon.ts")]),B=t(c,null,[a("/link")]),A=t(c,null,[t("em",null,[a("About mdc")])]),H=t(c,null,[a("mdc.ts")]),q=t(c,null,[a("Output")]),C=t(c,null,[a("processing")]);return(Cn,n)=>(r(),T(c,null,[n[52]||(n[52]=s("p",null,"本文将简略介绍本框架使用的markdown解析器，markdown-it与本框架中对于markdown-it的包装和设定以及后续给出的插件包装组件",-1)),t(l,{type:"info",title:e(m),always:!0,expand:!0},{default:p(()=>[t(z,{href:"https://github.com/markdown-it/markdown-it"},{default:p(()=>[...n[0]||(n[0]=[a("Github of markdown-it",-1)])]),_:1})]),_:1},8,["title"]),t(i,{level:2,id:1},{default:p(()=>[...n[1]||(n[1]=[a("Parsing and Rendering",-1)])]),_:1}),n[53]||(n[53]=s("p",null,"markdown-it在整个解析阶段分为两个部分，第一个是parse，获得类似json的包含token的文件，第二个是Render，将第一部分获得的内容渲染成html",-1)),t(i,{level:3,id:2},{default:p(()=>[...n[2]||(n[2]=[a("Parse 解析",-1)])]),_:1}),n[54]||(n[54]=s("p",null,[a("这个阶段分为三个规则，第一部分是Block规则，识别"),s("strong",null,"大结构"),a("，这里的大结构可以包括标题级别，代码块，数学表达式块等：")],-1)),t(M,{align:"equal",gapx:"10px",gapy:"20px"},{default:p(()=>[t(f,{span:"24"}),t(l,{type:"info",title:e(g),expand:!0},{default:p(()=>[t(u,{lang:"markdown",html:Q})]),_:1},8,["title"]),t(f,{span:"24"}),t(l,{type:"success",title:e(y),expand:!0},{default:p(()=>[t(u,{lang:"json",html:U})]),_:1},8,["title"])]),_:1}),n[55]||(n[55]=s("p",null,"这里需要注意的是block级别的解析会将最外层的部分理解成一层open，一层close，然后理解到里面一堆的inline内容，然后生成上面的扁平式数据结构",-1)),n[56]||(n[56]=s("p",null,"第二部分是Inline规则，识别行内的结构:",-1)),t(l,{type:"success",title:e(x),expand:!0},{default:p(()=>[t(u,{lang:"json",html:X})]),_:1},8,["title"]),n[57]||(n[57]=s("p",null,"第三部分是Core规则，在前两个阶段结束之后，利用已经生成的数据结构来方便地遍历，调用里面的一些数据生成toc之类的内容",-1)),t(i,{level:3,id:3},{default:p(()=>[...n[3]||(n[3]=[a("Rendering",-1)])]),_:1}),n[58]||(n[58]=s("p",null,"以上面那个Parse结束的内容为例子，这种解析结束的数据会利用render的部分生产一个伪HTML字符串，然后传入一些复杂的处理逻辑，如vue项目里，就是会传入vue的template标签内部，进行进一步的渲染：",-1)),t(l,{type:"success",title:e(b),expand:!0},{default:p(()=>[t(u,{lang:"html",html:Y})]),_:1},8,["title"]),n[59]||(n[59]=s("p",null,"通过这样一个简单的例子我们能够理解markdown-it的解析与渲染逻辑，接下来我们看看项目是如何处理markdown自定义标签的",-1)),t(i,{level:2,id:4},{default:p(()=>[...n[4]||(n[4]=[a("Handling logic",-1)])]),_:1}),n[60]||(n[60]=s("p",null,"回到项目本身，我们看到插件内部存在md文件夹包含了我们所有解析md文件的逻辑（其实是一部分，因为另一部分在vue的组件内部）",-1)),t(l,{type:"info",title:e(k),expand:!0},{default:p(()=>[t(u,{lang:"ts",html:Z})]),_:1},8,["title"]),s("p",null,[n[5]||(n[5]=a("markdown-it插件的逻辑一般是这样的： 对外界给出一个index.js，在这个index.js里面实现markdown实例，然后在另一个位置定义一个markdown-it-wrapper，用于定义通用的包装接口，然后再由其他的插件与工具来调用这个包装的接口，再由最初定义的index.js来",-1)),s("code",{class:"inline-code"},o(h)),n[6]||(n[6]=a("这个插件逻辑，于是完成调用，我们可以这个util的调用链：",-1))]),t(M,{align:"exqual",gapx:"10px",gapy:"20y"},{default:p(()=>[t(f,{span:"24"}),t(l,{type:"info",title:e(_),expand:!0},{default:p(()=>[t(u,{lang:"ts",html:nn})]),_:1},8,["title"]),t(f,{span:"24"}),t(l,{type:"info",title:e(j),expand:!0},{default:p(()=>[t(u,{lang:"ts",html:sn})]),_:1},8,["title"])]),_:1}),n[61]||(n[61]=s("p",null,"实质上的逻辑就是设计一个截停的规则，一旦读到某一个逻辑，markdown-it会截停然后按照定义的规则去解析它，生成供vue解析的例子，我们选取两个例子，第一个是完全定义在markdown-it内部的插件性质规则，另一个是利用mdc.ts将逻辑转接给vue组件处理的例子",-1)),t(i,{level:3,id:5},{default:p(()=>[...n[7]||(n[7]=[a("Markdown-it plugin Example",-1)])]),_:1}),s("p",null,[n[8]||(n[8]=a("例如我们看这个",-1)),s("strong",null,[s("code",{class:"inline-code"},o(an))]),n[9]||(n[9]=a("的处理逻辑：",-1))]),t(l,{type:"info",title:e(R),expand:!0},{default:p(()=>[t(u,{lang:"ts",html:tn})]),_:1},8,["title"]),s("p",null,[n[10]||(n[10]=a("type属性告诉我们应该在哪一个解析阶段来考虑这一部分逻辑，这里的inline就是上面提到的行内处理阶段，name属性主要是用于内部标记处理对应内容，而检测的标志是",-1)),s("strong",null,[s("code",{class:"inline-code"},o(pn))]),n[11]||(n[11]=a("，一旦检测到这个部分，解析器会开始读取接下来的内容直到读到下一个",-1)),s("strong",null,[s("code",{class:"inline-code"},o(on))]),n[12]||(n[12]=a("，然后对于内部的内容进行处理，例如这里的处理逻辑就是如果给出一个",-1)),s("code",{class:"inline-code"},o(en)),n[13]||(n[13]=a("选项，就会插入fontawesome里面的regular模式图标，然后这最后会返回一个html字符串",-1))]),n[62]||(n[62]=s("p",null,"我们再给出别的例子，例如并非使用我们自己设计的wrapper的逻辑，使用一些现成的，直接处理inline或者block解析阶段逻辑的代码：",-1)),t(l,{title:e(B)},{default:p(()=>[t(u,{lang:"ts",html:cn})]),_:1},8,["title"]),s("p",null,[n[14]||(n[14]=a("这里就是利用了inline的第三方处理的库，由于我们写的",-1)),s("strong",null,[s("code",{class:"inline-code"},o(ln))]),n[15]||(n[15]=a("在原声的inline分析之后会被解析成",-1)),s("code",{class:"inline-code"},o(un)),n[16]||(n[16]=a("，",-1)),s("code",{class:"inline-code"},o(kn)),n[17]||(n[17]=a("，",-1)),s("code",{class:"inline-code"},o(rn)),n[18]||(n[18]=a("三个部分，然后这里就根据这个type去分别处理，这里就是将",-1)),s("code",{class:"inline-code"},o(dn)),n[19]||(n[19]=a("标签改成",-1)),s("code",{class:"inline-code"},o(mn)),n[20]||(n[20]=a("，为了给vue组件使用。",-1))]),t(i,{level:3,id:6},{default:p(()=>[...n[21]||(n[21]=[a("Vue component handling Example",-1)])]),_:1}),s("p",null,[n[23]||(n[23]=a("本框架使用",-1)),s("strong",null,[t(v,{href:"https://github.com/comarkdown/markdown-it-comark?tab=readme-ov-file"},{default:p(()=>[...n[22]||(n[22]=[a("markdown-it-mdc",-1)])]),_:1})]),n[24]||(n[24]=a("来处理大部分需要使用vue component的内容，然后使用一个",-1)),s("code",{class:"inline-code"},o(gn)),n[25]||(n[25]=a("的插件来处理传入的参数，主要的目的就是将传入的参数转化为vue使用的",-1)),s("code",{class:"inline-code"},o(fn)),n[26]||(n[26]=a("变量",-1))]),t(l,{type:"info",title:e(A),always:!0,expand:!0},{default:p(()=>[n[41]||(n[41]=s("p",null,[s("strong",null,"MDC(Markdown component):")],-1)),s("blockquote",null,[s("div",K,[n[28]||(n[28]=a("We created the MDC syntax to supercharge Markdown and give you the ability to integrate Vue components with slots and props inside your Markdown. ",-1)),t(v,{href:"https://content.nuxt.com/docs/files/markdown#mdc-syntax"},{default:p(()=>[...n[27]||(n[27]=[a("Reference",-1)])]),_:1})])]),n[42]||(n[42]=s("p",null,"MDC为markdown提供了一个跟vue component联动的机会，需要符合一个MDC syntax规范，简单来讲，有这三个规则：",-1)),s("ul",null,[s("li",null,[n[29]||(n[29]=a("使用",-1)),s("code",{class:"inline-code"},o(wn)),n[30]||(n[30]=a("作为统一调用的提示mark",-1))]),s("li",null,[n[31]||(n[31]=a("在tag后加上",-1)),s("code",{class:"inline-code"},o(yn)),n[32]||(n[32]=a("来传递属性(Attributes)或者是参数(props)",-1))]),s("li",null,[n[33]||(n[33]=a("如果有分层逻辑的话，就顺位加上",-1)),s("code",{class:"inline-code"},o(xn)),n[34]||(n[34]=a("来表示层级 这里需要注意的是，mdc syntax里面有三种类型的组件：",-1))]),s("li",null,[n[35]||(n[35]=a("行内组件(inline) 需要前后",-1)),s("code",{class:"inline-code"},o(bn)),n[36]||(n[36]=a("封口",-1))]),s("li",null,[n[37]||(n[37]=a("块级别容器(block) 在内部添加内容之后，需要用",-1)),s("code",{class:"inline-code"},o(vn)),n[38]||(n[38]=a("封口",-1))]),s("li",null,[n[39]||(n[39]=a("块级别简写(block shorten) 在内部不需要添加内容，不需要",-1)),s("code",{class:"inline-code"},o(Mn)),n[40]||(n[40]=a("封口",-1))])])]),_:1},8,["title"]),n[63]||(n[63]=s("p",null,"了解了以上基础之后，我们看看mdc.ts的处理:",-1)),t(l,{type:"info",title:e(H),expand:!0},{default:p(()=>[t(u,{lang:"ts",html:In})]),_:1},8,["title"]),s("p",null,[n[43]||(n[43]=a("这里可能看不到的点在于，在解析markdown文件的时候，如果看到",-1)),s("code",{class:"inline-code"},o(Tn)),n[44]||(n[44]=a("会直接由这里使用的",-1)),s("code",{class:"inline-code"},o(_n)),n[45]||(n[45]=a("进行处理，同时分级逻辑也会进行处理，然后渲染成我们熟悉的样子：",-1))]),t(l,{type:"success",title:e(q),expand:!0},{default:p(()=>[t(u,{lang:"html",html:jn})]),_:1},8,["title"]),n[64]||(n[64]=s("p",null,"需要注意的是这里还没有讲传入的变量处理完毕，需要mdc.ts的处理：",-1)),t(l,{type:"info",title:e(C),expand:!0},{default:p(()=>[t(u,{lang:"ts",html:Rn})]),_:1},8,["title"]),s("p",null,[n[46]||(n[46]=a("这样就转变为",-1)),s("code",{class:"inline-code"},o(Bn)),n[47]||(n[47]=a("变量，但是实际上mdc.ts中还有一些其他的内容，但是并非最关键的部分，这里不多赘述",-1))]),s("p",null,[n[48]||(n[48]=a("另外一个值得注意的是，我们整个项目里面存在两种mardown的组件，一种是可以直接通过定义一些专门的css样式标注就可，例如quote等，它们会简单在tags.ts里面修改成",-1)),s("code",{class:"inline-code"},o(An)),n[49]||(n[49]=a("或者",-1)),s("code",{class:"inline-code"},o(Hn)),n[50]||(n[50]=a("标签，附上特定的class属性然后使用对应的css样式渲染",-1))]),s("p",null,[n[51]||(n[51]=a("另一种则是使用vue的组件，这种类型一般需要相对复杂的ui交互或者排版，这种情况会在tags.ts里面使用驼峰命名规范来改写成vue能读懂的格式，例如",-1)),s("code",{class:"inline-code"},o(qn))]),n[65]||(n[65]=s("p",null,"然后这些完整的内容会交由别的接口进行进一步的加工",-1))],64))}});export{Vn as default};
