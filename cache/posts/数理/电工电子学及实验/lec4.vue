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

import dep_0 from "/docs/数理/电工电子学及实验/assets/trib.png";
import dep_1 from "/docs/数理/电工电子学及实验/assets/star.png";
import dep_2 from "/docs/数理/电工电子学及实验/assets/triangle.png";


provide("katex-macros", {});
const expr_0 = "三相电路示意图";
const expr_1 = <><strong>star</strong></>;
const expr_2 = "星形联结";
const expr_3 = <><strong>triangle</strong></>;
const expr_4 = "三角形联结";
const expr_5 = "P = \\sqrt{3} U_L I_L \\cos\\varphi\n";
const expr_6 = "Q = \\sqrt{3} U_L I_L \\sin\\varphi\n";
const expr_7 = "S = \\sqrt{3} U_L I_L\n";
const expr_8 = "\\dot{I}_N = \\dot{I}_A + \\dot{I}_B + \\dot{I}_C\n";
const expr_9 = "\\dot{U}_{N'N} = \\frac{\\frac{\\dot{U}_A}{Z_A} + \\frac{\\dot{U}_B}{Z_B} + \\frac{\\dot{U}_C}{Z_C}}{\\frac{1}{Z_A} + \\frac{1}{Z_B} + \\frac{1}{Z_C}}\n";
const expr_10 = "\\dot{U}_{A'} = \\dot{U}_A - \\dot{U}_{N'N}\n";
const expr_11 = "\\dot{I}_A = \\frac{\\dot{U}_{A'}}{Z_A}, \\quad \\dot{I}_B = \\frac{\\dot{U}_{B'}}{Z_B}, \\quad \\dot{I}_C = \\frac{\\dot{U}_{C'}}{Z_C}\n";
const expr_12 = "\\dot{I}_{AB} = \\frac{\\dot{U}_{AB}}{Z_{AB}}, \\quad \\dot{I}_{BC} = \\frac{\\dot{U}_{BC}}{Z_{BC}}, \\quad \\dot{I}_{CA} = \\frac{\\dot{U}_{CA}}{Z_{CA}}\n";
const expr_13 = "\\dot{I}_A = \\dot{I}_{AB} - \\dot{I}_{CA}\n";
const expr_14 = "\\dot{U}_{AB} = \\dot{U}_{L(AB)}, \\quad \\dot{U}_{BC} = \\dot{U}_{L(BC)}, \\quad \\dot{U}_{CA} = \\dot{U}_{L(CA)}\n";
const expr_15 = "P = \\sqrt{3} U_L I_L \\cos\\varphi\n";
const expr_16 = "Q = \\sqrt{3} U_L I_L \\sin\\varphi\n";
const expr_17 = "S = \\sqrt{3} U_L I_L\n";

</script>

<template>
<p>本节课主要介绍三项电路的内容</p>
<Heading :level=2 :id=1>定义</Heading>
<p>什么是<strong>三相电路</strong>，以及什么是<strong>三相电源</strong>？</p>
<p><strong>三相电源</strong>：由三个幅值相等、频率相同、相位互差120°的单相交流电源构成
<strong>三相电路</strong>：由三相电源构成的电路</p>
<p><ImageCaptioned :src="dep_0" :alt="expr_0">三相电路示意图</ImageCaptioned></p>
<p>其中，L是从始端引出的三条相线，称为<strong>火线</strong>，而三线汇聚联结就得到<strong>联结点</strong>，或称<strong>零点</strong>，可以引出<strong>中性线</strong>N，称为<strong>零线</strong>，通常接地</p>
<p>没有中性线的为<strong>三相三线制</strong>，反之为<strong>三相四线制</strong>
从三相四线制来理解：各相线与中性线之间的电压，称为<strong>相电压</strong>，相线与相线之间的电压称为<strong>线电压</strong></p>
<p>当三相电源的电压幅值相同，相位相差120度的时候，就称为<strong>对称三相电源</strong></p>
<p>其中我们有两种联结标准，为<strong>星型</strong>与<strong>三角形</strong>。</p>
<Grid align="equal" gapx="10px" gapy="20px">
<Delimiter span="12" />
<Fold type="success" :title="expr_1" :always="true" :expand="true"><ImageCaptioned :src="dep_1" :alt="expr_2">星形联结</ImageCaptioned></Fold>
<Delimiter span="12" />
<Fold type="success" :title="expr_3" :always="true" :expand="true"><ImageCaptioned :src="dep_2" :alt="expr_4">三角形联结</ImageCaptioned></Fold>
</Grid>
<Heading :level=2 :id=2>计算方法</Heading>
<p>有两种分类标准：是<strong>星型</strong>还是<strong>三角形</strong>，是<strong>对称</strong>还是<strong>不对称</strong></p>
<Heading :level=3 :id=3>对称三相电源</Heading>
<p><strong>星形</strong>：</p>
<p>电流：<InlineMath data="I_L = I_{ph}"></InlineMath></p>
<p>电压：<InlineMath data="U_L = \sqrt{3} U_{ph}"></InlineMath></p>
<p><strong>三角形</strong>：</p>
<p>电流：<InlineMath data="I_L = \sqrt{3} I_{ph}"></InlineMath>
电压：<InlineMath data="U_L = U_{ph}"></InlineMath></p>
<p>两种联结方式的功率公式相同：</p>
<BlockMath :data="expr_5"></BlockMath><BlockMath :data="expr_6"></BlockMath><BlockMath :data="expr_7"></BlockMath><Heading :level=3 :id=4>非对称三相电源</Heading>
<p><strong>星形</strong>：</p>
<p>其中需要分类为有中性线和没有中性线来讨论：</p>
<p>有中性线：</p>
<p>电流：<InlineMath data="I_L = I_{ph}"></InlineMath></p>
<p>中性线电流：</p>
<BlockMath :data="expr_8"></BlockMath><p>电压：<InlineMath data="U_L = \sqrt{3} U_{ph}"></InlineMath></p>
<p>无中性线：</p>
<p>这种情况比较麻烦，需要先算<strong>中性点位移电压</strong>：</p>
<BlockMath :data="expr_9"></BlockMath><p>然后需要算出真实相电压：</p>
<BlockMath :data="expr_10"></BlockMath><p>其他两者类似</p>
<p>然后再去算相电流：</p>
<BlockMath :data="expr_11"></BlockMath><p><strong>三角形</strong>：</p>
<p>电流：</p>
<BlockMath :data="expr_12"></BlockMath><p>其中线电流：</p>
<BlockMath :data="expr_13"></BlockMath><p>其他两者类似</p>
<p>电压：</p>
<BlockMath :data="expr_14"></BlockMath><p>两种联结方式的功率公式相同：</p>
<BlockMath :data="expr_15"></BlockMath><BlockMath :data="expr_16"></BlockMath><BlockMath :data="expr_17"></BlockMath>
</template>
