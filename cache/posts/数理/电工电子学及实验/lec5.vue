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
const expr_0 = "u_C(0_+) = u_C(0_-)\n";
const expr_1 = "i_L(0_+) = i_L(0_-)\n";
const expr_2 = "全响应=强制分量（特解、稳态分量）＋自由分量（通解、暂态分量）\n";
const expr_3 = "f(t) = f(\\infty) + \\left[ f(0_+) - f(\\infty) \\right] e^{-\\frac{t}{\\tau}}\n";
const expr_4 = "u_C(t) = u_C(\\infty) + \\left[ u_C(0_+) - u_C(\\infty) \\right] e^{-\\frac{t}{R_{eq}C}}\n";
const expr_5 = "\\tau = R_{eq}C\n";
const expr_6 = "i_L(t) = i_L(\\infty) + \\left[ i_L(0_+) - i_L(\\infty) \\right] e^{-\\frac{R_{eq}}{L} t}\n";
const expr_7 = "\\tau = \\frac{L}{R_{eq}}\n";

</script>

<template>
<p>本节课主要介绍暂态稳态分析</p>
<Heading :level=2 :id=1>换路定理与初值计算</Heading>
<p>考虑电路的过渡状态的时候，有两个需要注意的元件，就是<strong>电容</strong>，<strong>电感</strong></p>
<Heading :level=3 :id=2>换路定理</Heading>
<p>对于一般情况：</p>
<p>换路前后电容满足：</p>
<BlockMath :data="expr_0"></BlockMath><p>换路前后电感满足：</p>
<BlockMath :data="expr_1"></BlockMath><p>我们称电路中所求变量（电压或电流）及其<InlineMath data="(n-1)"></InlineMath>阶导数在<InlineMath data="t=0+"></InlineMath>的值为电路初值，其中可以等效为独立电源的初值叫做<strong>独立初值</strong>，如电容的电压与电感的电流，可以通过独立初值和电路结构求出的其他初值叫做<strong>非独立初值</strong></p>
<Heading :level=2 :id=3>暂态瞬态分析</Heading>
<p>研究一阶电路的全响应：</p>
<BlockMath :data="expr_2"></BlockMath><p>通用的公式为：</p>
<BlockMath :data="expr_3"></BlockMath><p>也就是我们需要求取的是三个值：</p>
<ul>
<li><InlineMath data="f(0_+)"></InlineMath> 初始值：换路后瞬间的值</li>
<li><InlineMath data="f(\infty)"></InlineMath> 稳态值：稳态后的值</li>
<li><InlineMath data="\tau"></InlineMath> 时间常数</li>
</ul>
<Heading :level=3 :id=4>RC一阶响应方程</Heading>
<BlockMath :data="expr_4"></BlockMath><p>其中时间常数为：</p>
<BlockMath :data="expr_5"></BlockMath><Heading :level=3 :id=5>RL一阶响应方程</Heading>
<BlockMath :data="expr_6"></BlockMath><p>其中时间常数为：</p>
<BlockMath :data="expr_7"></BlockMath>
</template>
