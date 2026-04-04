import{_ as p}from"./BlockCode.vue_vue_type_script_setup_true_lang-aF6LFxrO.js";import{_ as l}from"./BlockMath.vue_vue_type_script_setup_true_lang-OSduXTWf.js";import{_ as u}from"./Fold.vue_vue_type_style_index_0_lang-7RQKupVW.js";import{_ as t}from"./InlineMath.vue_vue_type_script_setup_true_lang-VrLcHS6i.js";import{d as m,a as s,b as o,F as e,o as i,e as d,f as a,w as k,u as x,p as f}from"./index-BWOvinVT.js";import"./animate-height-Cvwt0ZRf.js";import"./vendor-katex-BDPLvt6s.js";const b=`   a*x + b*y = d
`,c=`<code class="language-c"><span class="token comment">/*
  0 1 2 3 4 5 6    23  24  25
x:a b c d e f g ... x  y   z 
y:d e f g h i j ... a  b   c
加密过程: y = (x+3) % 26
解密过程: x = (y+23) % 26
因为23是3的加法逆元, 即23相当于-3
-3 = -26+23 = 23 mod 26    
/* 
/* in c */</span>
y <span class="token operator">=</span> <span class="token punctuation">(</span>x <span class="token operator">-</span> <span class="token char">'a'</span> <span class="token operator">+</span> <span class="token number">3</span><span class="token punctuation">)</span> <span class="token operator">%</span> <span class="token number">26</span> <span class="token operator">+</span> <span class="token char">'a'</span><span class="token punctuation">;</span>
x <span class="token operator">=</span> <span class="token punctuation">(</span>y <span class="token operator">-</span> <span class="token char">'a'</span> <span class="token operator">+</span> <span class="token number">23</span><span class="token punctuation">)</span> <span class="token operator">%</span> <span class="token number">26</span> <span class="token operator">+</span> <span class="token char">'a'</span><span class="token punctuation">;</span>
</code>`,g=`<code class="language-c"><span class="token comment">/*
对于一个同时用到乘法和加法逆元的加密方法，我们可以称之为仿射加密
*/</span>
</code>`,y=`(a-b)\\text{ mod }n \\Leftrightarrow (a-b+n)\\%n
`,z=m({__name:"lec1",setup($){f("katex-macros",{});const r=s(e,null,[s("strong",null,[o("Some details")])]);return(w,n)=>(i(),d(e,null,[n[7]||(n[7]=a("p",null,"课程介绍与数学基础：",-1)),n[8]||(n[8]=a("p",null,"整除，互素，素数分解定理，最大公约数，模，同余",-1)),n[9]||(n[9]=a("p",null,[a("strong",null,"贝祖定理"),o("：")],-1)),n[10]||(n[10]=a("p",null,"设a、b为整数，且a、b中至少有一个不等于0，令d=gcd(a,b)， 则一定存在整数x、y使得下式成立:",-1)),s(l,{data:b}),n[11]||(n[11]=a("p",null,"逆元：",-1)),n[12]||(n[12]=a("ol",null,[a("li",null,"加法模逆元：")],-1)),n[13]||(n[13]=a("p",null,"引入恺撒加密：",-1)),s(p,{lang:"c",html:c}),n[14]||(n[14]=a("ol",{start:"2"},[a("li",null,"乘法模逆元：")],-1)),a("p",null,[n[0]||(n[0]=o("若",-1)),s(t,{data:"a*b≡1 (mod\\ n)"}),n[1]||(n[1]=o(", 则称a是b的乘法模n逆元，b是a的乘法模n逆元。a的乘法逆元记作a-1",-1))]),a("p",null,[n[2]||(n[2]=o("需要注意的是，乘法逆元不一定存在，存在充要条件： 已知",-1)),s(t,{data:"a,n,a\\ mod\\ n"}),n[3]||(n[3]=o("的乘法逆元存在的充要条件是",-1)),s(t,{data:"gcd(a,n)=1"}),n[4]||(n[4]=o(" 引入仿射加密：",-1))]),s(p,{lang:"c",html:g}),s(u,{type:"info",title:x(r),expand:!0},{default:k(()=>[n[5]||(n[5]=a("ol",null,[a("li",null,"对于一个密码需要知道哪一个逆元是存在的"),a("li",null,"在c中，%与mod是不同的，前者会存在负数的情况，如果需要mod，那么我们可以用如下等价操作")],-1)),s(l,{data:y}),n[6]||(n[6]=a("p",null,"     这种做法又被称作是完美带模减法.      类似地，存在完美带模加法，使得结果不超过模本身. 3. 对于所有进行了以n为模的乘法的操作都需要注意加上%n的操作来保证结果不超过n",-1))]),_:1},8,["title"])],64))}});export{z as default};
