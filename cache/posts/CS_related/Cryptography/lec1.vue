<script setup lang="tsx">
import { provide } from "vue";
import dayjs from "@/assets/ts/dayjs";
import Anchor from "@/components/md/Anchor.vue";
import BlockCode from "@/components/md/BlockCode.vue";
import BlockMath from "@/components/md/BlockMath.vue";
import Delimiter from "@/components/md/Delimiter.vue";
import DotPattern from "@/components/md/DotPattern.vue";
import Fold from "@/components/md/Fold.vue";
import Grid from "@/components/md/Grid.vue";
import Heading from "@/components/md/Heading.vue";
import ImageCaptioned from "@/components/md/ImageCaptioned.vue";
import Index from "@/components/md/Index.vue";
import InlineMath from "@/components/md/InlineMath.vue";
import LinkCard from "@/components/md/LinkCard.vue";
import Note from "@/components/md/Note.vue";
import Tab from "@/components/md/Tab.vue";
import Waterfall from "@/components/md/Waterfall.vue";


provide("katex-macros", {});
const expr_0 = "   a*x + b*y = d\n";
const expr_1 = "<code class=\"language-c\"><span class=\"token comment\">/*\n  0 1 2 3 4 5 6    23  24  25\nx:a b c d e f g ... x  y   z \ny:d e f g h i j ... a  b   c\n加密过程: y = (x+3) % 26\n解密过程: x = (y+23) % 26\n因为23是3的加法逆元, 即23相当于-3\n-3 = -26+23 = 23 mod 26    \n/* \n/* in c */</span>\ny <span class=\"token operator\">=</span> <span class=\"token punctuation\">(</span>x <span class=\"token operator\">-</span> <span class=\"token char\">'a'</span> <span class=\"token operator\">+</span> <span class=\"token number\">3</span><span class=\"token punctuation\">)</span> <span class=\"token operator\">%</span> <span class=\"token number\">26</span> <span class=\"token operator\">+</span> <span class=\"token char\">'a'</span><span class=\"token punctuation\">;</span>\nx <span class=\"token operator\">=</span> <span class=\"token punctuation\">(</span>y <span class=\"token operator\">-</span> <span class=\"token char\">'a'</span> <span class=\"token operator\">+</span> <span class=\"token number\">23</span><span class=\"token punctuation\">)</span> <span class=\"token operator\">%</span> <span class=\"token number\">26</span> <span class=\"token operator\">+</span> <span class=\"token char\">'a'</span><span class=\"token punctuation\">;</span>\n</code>";
const expr_2 = "<code class=\"language-c\"><span class=\"token comment\">/*\n对于一个同时用到乘法和加法逆元的加密方法，我们可以称之为仿射加密\n*/</span>\n</code>";
const expr_3 = <><strong>Some details</strong></>;
const expr_4 = "(a-b)\\text{ mod }n \\Leftrightarrow (a-b+n)\\%n\n";

</script>

<template>
<p>课程介绍与数学基础：</p>
<p>整除，互素，素数分解定理，最大公约数，模，同余</p>
<p><strong>贝祖定理</strong>：</p>
<p>设a、b为整数，且a、b中至少有一个不等于0，令d=gcd(a,b)，
则一定存在整数x、y使得下式成立:</p>
<BlockMath :data="expr_0"></BlockMath><p>逆元：</p>
<ol>
<li>加法模逆元：</li>
</ol>
<!-- $$
若a+b≡0 (mod\ n), 则称a是b的加法模n逆元，b是a的加法模n逆元
$$ -->
<p>引入恺撒加密：</p>
<BlockCode lang="c" :html="expr_1"></BlockCode><ol start="2">
<li>乘法模逆元：</li>
</ol>
<p>若<InlineMath data="a*b≡1 (mod\ n)"></InlineMath>, 则称a是b的乘法模n逆元，b是a的乘法模n逆元。a的乘法逆元记作<InlineMath data="a^{-1}"></InlineMath></p>
<p>需要注意的是，乘法逆元不一定存在，存在充要条件：
已知<InlineMath data="a,n,a\ mod\ n"></InlineMath>的乘法逆元存在的充要条件是<InlineMath data="gcd(a,n)=1"></InlineMath>
引入仿射加密：</p>
<BlockCode lang="c" :html="expr_2"></BlockCode><Fold type="info" :title="expr_3" :expand="true">
<ol>
<li>对于一个密码需要知道哪一个逆元是存在的</li>
<li>在c中，%与mod是不同的，前者会存在负数的情况，如果需要mod，那么我们可以用如下等价操作</li>
</ol>
<BlockMath :data="expr_4"></BlockMath><p>     这种做法又被称作是完美带模减法.</p>
<p>     类似地，存在完美带模加法，使得结果不超过模本身.</p>
<ol start="3">
<li>对于所有进行了以n为模的乘法的操作都需要注意加上%n的操作来保证结果不超过n</li>
</ol>
</Fold>

</template>
