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

import dep_0 from "/docs/数理/电工电子学及实验/assets/test.png";
import dep_1 from "/docs/数理/电工电子学及实验/assets/shift.png";
import dep_2 from "/docs/数理/电工电子学及实验/assets/positiveShift.png";
import dep_3 from "/docs/数理/电工电子学及实验/assets/curveForDiode.png";
import dep_4 from "/docs/数理/电工电子学及实验/assets/npnpnp.png";
import dep_5 from "/docs/数理/电工电子学及实验/assets/outputline.png";
import dep_6 from "/docs/数理/电工电子学及实验/assets/analysis.png";


provide("katex-macros", {});
const expr_0 = "常温状态下的本征激发";
const expr_1 = <>注意</>;
const expr_2 = "多子与少子偏移的平衡";
const expr_3 = "PN结正偏";
const expr_4 = "二极管的伏安特性曲线";
const expr_5 = <><strong>二极管电路的分析方法</strong></>;
const expr_6 = "NPN 与 PNP 型的三极管";
const expr_7 = <><strong>为什么三极管能调节电流</strong></>;
const expr_8 = "\\begin{aligned}\n        I_E &= I_B + I_C \\\\\n        I_B &\\ll I_E \\approx I_C  \\to \\\\\n        \\Delta I_B &\\to \\Delta I_C,\\Delta I_E\n\\end{aligned}\n";
const expr_9 = "输出特性曲线";
const expr_10 = <><strong>有关放大状态的电流与载流子分析</strong></>;
const expr_11 = "    \\bar \\beta = \\frac{I_C - I_{CEO}} {I_B} \\approx \\frac {I_C} {I_B}\n";
const expr_12 = "简化的小信号模型分析";
const expr_13 = "r_{be} = \\frac{\\Delta U_{BE}}{\\Delta I_B} = r_b + (1 + \\beta)\\frac{26mV}{I_E}\n";
const expr_14 = "\\Delta I_C = \\beta \\Delta I_B\n";

</script>

<template>
<p>这节课主要介绍晶体管，pn结原理与二极管电路计算</p>
<Heading :level=2 :id=1>PN结</Heading>
<p>PN结主要材料一般都是半导体。</p>
<Heading :level=3 :id=2>半导体种类</Heading>
<p>有如下常用半导体种类：</p>
<ul>
<li>本征半导体：纯净的半导体（如硅、锗、碳化硅、氮化镓等）
，载流子是<strong>自由电子（带负电）和空穴（带正电）</strong></li>
<li>P型半导体：在纯净的半导体硅、锗中掺入少量三价元素
，多数载流子为<strong>空穴带正电（Positive）</strong></li>
<li>N型半导体：在纯净的半导体硅、锗中掺入少量五价元素
，多数载流子为<strong>电子带负电（Negative）</strong></li>
</ul>
<Heading :level=3 :id=3>不同的激发状态</Heading>
<p>对于不同半导体，其激发状态都是不同的，例如本征半导体的技法状态就是<strong>本征激发</strong>，同时存在着自由电子和空穴
<ImageCaptioned :src="dep_0" :alt="expr_0">常温状态下的本征激发</ImageCaptioned>
类似地，N型也有类似地情况，但是N型内部嵌入了5价元素，导致电子多余量变多，P型半导体则是嵌入3价元素，导致空穴比较多</p>
<Fold type="info" :title="expr_1" :expand="true">虽然p，n型的内部载流子种类占比不同，但是总体两者都是显正电性</Fold>
<p>那么，用专门的制造工艺在同一块半导体单晶上，形成P型半导体区域和N型半导体区域，在这两个区域的交界处就形成一个<strong>PN结</strong>。</p>
<Heading :level=3 :id=4>pn结的单向导电性</Heading>
<p>由于扩散效应，P区域多出的空穴会向N区域移动，反之N区域多出的电子会向着P区域移动，而这样就会在原来的位置产生电性偏移（空穴移开显负电，反之亦然），这样就会形成一个内电场</p>
<p>其中，多数载流子会被扩散效应推动进行扩散，而少数载流子会被内电场控制进行偏移，两者会达到一个平衡。</p>
<p><ImageCaptioned :src="dep_1" :alt="expr_2">多子与少子偏移的平衡</ImageCaptioned></p>
<p>平衡过后，中间形成的这个有内部电场的空间电荷区的宽度就会稳定下来</p>
<p>那么，如果在这种情况下，我们尝试对PN结外部加上一个电场，就会出现正偏与反偏的情况</p>
<Heading :level=4 :id=5>PN结的正偏</Heading>
<p>如果对P区加上高电位，N区加上低电位，那么P区空穴被推向中间空间电荷区，电子推向高电位侧的趋势就会变大，N区相反但是效果是一样的，那么就会导致中间的空间电荷区变小，此时内部的阻值很小，PN结的压降很低，此时认为<strong>正向导通</strong></p>
<p><ImageCaptioned :src="dep_2" :alt="expr_3">PN结正偏</ImageCaptioned></p>
<Heading :level=4 :id=6>PN结的反偏</Heading>
<p>类似地，如果加上相反的电位，也就是N级高电位，P级低电位，则会出现反偏现象，此时中间的空间电荷区变大，此时内部的阻值变大，PN结的压降很高，甚至会导致开路，此时认为<strong>反向截止</strong></p>
<Heading :level=3 :id=7>二极管的特性和主要参数</Heading>
<p>观察二极管的伏安特性曲线
<ImageCaptioned :src="dep_3" :alt="expr_4">二极管的伏安特性曲线</ImageCaptioned></p>
<ol>
<li>正向特性：</li>
</ol>
<ul>
<li>死区：电压小，基本不导通。</li>
<li>死区电压：硅管0.6~0.7V，锗管0.2~0.3V。</li>
<li>非线性区：一开始导通，电流小</li>
<li>导通区：一近似线性</li>
</ul>
<ol start="2">
<li>反向特性</li>
</ol>
<ul>
<li>正常工作区：截止，反向电流很小</li>
<li>反向击穿区：反向电压过大，反向击穿</li>
</ul>
<Fold type="success" :title="expr_5" :expand="true">
<p>分析关键：判断二极管是否导通</p>
<p>单个二极管：阳极电位高于阴极电位足够大小；</p>
<p>多个二极管：</p>
<ul>
<li>阳极接于同一点（同电位），阴极电位最低的优先导通；</li>
<li>阴极接于同一点（同电位），阳极电位最高的优先导通。</li>
</ul>
</Fold>
<Heading :level=2 :id=8>三极管</Heading>
<p>三极管有两个PN结组成，分为三个电极以及三个区
<ImageCaptioned :src="dep_4" :alt="expr_6"><strong>NPN</strong>与<strong>PNP</strong>型的三极管</ImageCaptioned></p>
<p>三极管本质上是一个小信号模型（处于放大区时），由<strong>基极</strong>电流控制，我们可以认为通过基极来控制最后<strong>发射极</strong>的流出电流量，配合<strong>集电极</strong>的输入电流来调整电路的电流状态</p>
<Fold type="success" :title="expr_7" :expand="true">
<p>电流关系满足：</p>
<BlockMath :data="expr_8"></BlockMath><p>于是能够做到以小电流改变整体电路的电流情况</p>
</Fold>
<p>三极管存在三种状态:</p>
<ul>
<li><strong>截止状态</strong>:阀门完全关闭，<strong>集电结、发射结均反向偏置</strong></li>
<li><strong>放大状态</strong>:阀门半开，可控：小电流控制大电流，<strong>发射结正向偏置，集电结反向偏置</strong></li>
<li><strong>饱和状态</strong>:阀门完全打开：<InlineMath data="I_C"></InlineMath>达到极限，不再随<InlineMath data="I_B"></InlineMath>变化，<strong>发射结、集电结均正向偏置</strong>
<ImageCaptioned :src="dep_5" :alt="expr_9">输出特性曲线</ImageCaptioned></li>
</ul>
<Fold type="info" :title="expr_10" :expand="true">
<p><strong>放大状态</strong>：</p>
<p>发射结外电场<InlineMath data="\to"></InlineMath>发射区大量电子载流子向基区运动，电源向发射区补充电子<InlineMath data="\to"></InlineMath>发射极电流IE
进入基区的电子载流子少量与基区空穴复合，电源<InlineMath data="U_{BB}"></InlineMath>
向基区补充空穴<InlineMath data="\to"></InlineMath>基极电流<InlineMath data="I_B"></InlineMath></p>
<p>集电结外电场<InlineMath data="\to"></InlineMath>集电结反偏<InlineMath data="\to"></InlineMath>推动少子运动（电子），进入集电区并由电源收集<InlineMath data="\to"></InlineMath>集电极电流<InlineMath data="I_C"></InlineMath></p>
</Fold>
<p>三极管的正向输入特性没什么特别的，和二极管类似</p>
<p>存在两个需要注意的参数：</p>
<ul>
<li><strong>电流放大参数</strong>：</li>
</ul>
<BlockMath :data="expr_11"></BlockMath><ul>
<li><strong>穿透电流<InlineMath data="I_{CEO}"></InlineMath></strong>：指基极开路时，集电极到发射极间的反向截止电流</li>
</ul>
<Heading :level=3 :id=9>简化的小信号模型</Heading>
<p>当晶体管处于放大区的时候，可以认为是一个<strong>CCCS受控源</strong>，也就是发射极电流受基极控制的受控源，此时我们可以等价有如下电路，并给出对应的特性分析曲线
<ImageCaptioned :src="dep_6" :alt="expr_12">简化的小信号模型分析</ImageCaptioned></p>
<p>当研究<InlineMath data="U_{BE}"></InlineMath>时，存在如下关系：</p>
<BlockMath :data="expr_13"></BlockMath><p><InlineMath data="r_b = 200\Omega"></InlineMath> 基区体电阻</p>
<p><InlineMath data="I_E"></InlineMath> 静态发射极电流 (mA)</p>
<p>26mV 是室温下的固定值</p>
<p>而研究<InlineMath data="U_{CE}"></InlineMath>时，存在如下关系：</p>
<BlockMath :data="expr_14"></BlockMath><Heading :level=3 :id=10><InlineMath data="^\ast"></InlineMath>绝缘栅场效应晶体管</Heading>
<p>内容查看相关资料即可，不过多介绍</p>

</template>
