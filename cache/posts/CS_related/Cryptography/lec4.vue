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

import dep_0 from "/docs/CS_related/Cryptography/assets/gear_spinning.png";
import dep_1 from "/docs/CS_related/Cryptography/assets/double_stepping.JPG";


provide("katex-macros", {});
const expr_0 = "1 1 26";
const expr_1 = <><strong>Example of ring setting</strong></>;
const expr_2 = "A";
const expr_3 = <><strong>Note</strong></>;
const expr_4 = "\\begin{aligned}\n\\Delta 1&=\\text{ascii A(message)}-\\text{ascii B(ring setting)}=-1=25\\text{ mod }26 \\\\\n\\Delta 2/3&=\\text{ascii A}-\\text{ascii A}=0\n\\end{aligned}\n";
const expr_5 = <><strong>Process</strong></>;
const expr_6 = <><strong>Table</strong></>;
const expr_7 = "";
const expr_8 = "<code>① ② ③  ④ ⑤\nQ  E  V  J  Z\n↓  ↓  ↓  ↓  ↓\nR  F  W  K  A\n</code>";
const expr_9 = "";

</script>

<template>
<Heading :level=2 :id=1>ring settings</Heading>
<p>回顾上一周的内容,我们知道选择engima的加密模式存在两种抉择点：</p>
<ul>
<li>齿轮选择与排列</li>
<li>齿轮的外部设置，初始状态的设置(也就是外面显示的<code class="inline-code">{{expr_0}}</code>) 也被成为message key
这里引出另外的一个内部设置项：ring settings
简单来说，这个 ring setting 就是为外部设置的message key提供了提供了一个delta值
我们来尝试考虑一个场景。</li>
</ul>
<Fold type="success" :title="expr_1" :always="true" :expand="true">
<p>设3个齿轮从左到右的排列是 3 2 1
的ring setting为：AAB (当敲了一个键的情况下，ring setting并不会改变)
初始message key为：AAZ</p>
<ol>
<li>按下一个键 <code class="inline-code">{{expr_2}}</code>：
message key变成：AAA
现在计算messge key - ring setting的差</li>
</ol>
<Fold type="info" :title="expr_3" :always="true" :expand="true">先改变外部设置再加密</Fold>
<BlockMath :data="expr_4"></BlockMath><ol start="2">
<li>查表计算：</li>
</ol>
<Grid align="equal" gapx="10px" gapy="20px">
<Delimiter span="8" />
<Fold type="success" :title="expr_5" :always="true" :expand="true"><strong>in rotor I</strong>:<br />
A + <InlineMath data="\Delta 1"></InlineMath> = Z<br />
Z map to J<br />
J - <InlineMath data="\Delta 1"></InlineMath> = K<br />
<strong>in rotor II</strong>:<br />
K map to L<br />
<strong>in rotor III</strong>:<br />
L map to V<br />
<strong>Reflactor</strong>:<br />
V map to W<br />
<strong>in rotor III</strong>:<br />
W map to R<br />
<strong>in rotor II</strong>:<br />
R map to G<br />
<strong>in rotor I</strong>:<br />
G + <InlineMath data="\Delta 1"></InlineMath> = F<br />
F map to D<br />
D - <InlineMath data="\Delta 1"></InlineMath> = E</Fold>
<Delimiter span="16" />
<Fold type="info" :title="expr_6" :always="true" :expand="true">
<ol>
<li>rotor I:
EKMFLGDQVZNTOWYHXUSPAIBRCJ
ABCDEFGHIJKLMNOPQRSTUVWXYZ</li>
<li>rotor II
AJDKSIRUXBLHWTMCQGZNPYFVOE<br />
ABCDEFGHIJKLMNOPQRSTUVWXYZ</li>
<li>rotor III
BDFHJLCPRTXVZNYEIWGAKMUSQO<br />
ABCDEFGHIJKLMNOPQRSTUVWXYZ</li>
<li>reflector
YRUHOSLDPANGOKMIEBFZCWVJAT
ABCDEEGHIJKLMNOPQRSTUVWXYZ</li>
</ol>
</Fold>
</Grid>
</Fold>
<Heading :level=2 :id=2>Plugin board</Heading>
<p>接线板的作用是影响进入右侧齿轮的信号，同时影响从右侧齿轮出来的信号，但不影响其它齿轮。例如，在保持上述初始设置不变的情况下，把A、B对接，那么在输入B的情况下，输出仍旧是E，因为B先要替换成A才会进入①；同理，把A、B对接，再把E、F也对接，那么在输入B的情况下，输出是F，因为本来的输出信号E要替换成F。</p>
<Heading :level=2 :id=3>Gear spining</Heading>
<p>1～5号齿轮的旋转是基于实际机械结构的，从右侧开始一共有三个棘抓由主轴驱动控制三个齿轮，右侧的棘抓可以保证控制最右侧的轮转动，对于中间部分的控制则是需要满足具体条件的，也就是必须要在旋转到达某一个槽口的时候，棘爪才能驱动旋转
<ImageCaptioned :src="dep_0" :alt="expr_7"></ImageCaptioned></p>
<blockquote>
<p>这也就意味着并非一定旋转26次就会使得下一级齿轮旋转一次，实际上第一次的旋转是取决于设置的message key的，之后的旋转都是符合26次周期的（一般而言）</p>
</blockquote>
<p>对于5个齿轮的槽口具体旋转如下：</p>
<BlockCode lang="plain" :html="expr_8"></BlockCode><Heading :level=3 :id=4>Double spinning</Heading>
<p>基于上面的条件，实际上运行的时候存在一种特殊情况，也就是当最右侧齿轮带动中间齿轮旋转一次之后，中间齿轮刚好位于下一次可以带动最左侧齿轮的情况，此时再输入一次，这时会导致三个齿轮同时旋转：
<ImageCaptioned :src="dep_1" :alt="expr_9"></ImageCaptioned>
两次旋转导致了中间齿轮连续两次旋转，也就是Double spinning.</p>

</template>
