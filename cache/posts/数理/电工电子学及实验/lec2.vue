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

import dep_0 from "/docs/数理/电工电子学及实验/assets/circuit.png";
import dep_1 from "/docs/数理/电工电子学及实验/assets/multi.png";


provide("katex-macros", {});
const expr_0 = "电路示意图";
const expr_1 = <><strong>名词解释</strong></>;
const expr_2 = "\\sum i_{out} = \\sum i_{in} = 0 \n";
const expr_3 = "-I_1 - I_2 + I_4 = 0\n";
const expr_4 = "  \\sum u = 0\n";
const expr_5 = "R_4I_4 + R_3I_2 - U_{S2} = 0\n";
const expr_6 = <>注意</>;
const expr_7 = <><strong>关于存在受控电流源与电流源的情况</strong></>;
const expr_8 = "y=kx\n";
const expr_9 = "y=k_1x_1+k_2x_2+…=y_1+y_2+…\n";
const expr_10 = <><strong>激励与响应</strong></>;
const expr_11 = "一个叠加定理的示意";
const expr_12 = <><strong>注意</strong></>;

</script>

<template>
<p>本节课我们主要学习电路分析的一些初步方法</p>
<Heading :level=2 :id=1>支路电流法</Heading>
<p>支路电流法是直接对某一条支路进行直接电流电压值计算的方法，其原理是基尔霍夫定律</p>
<Heading :level=3 :id=2>基尔霍夫定律</Heading>
<p>下面是一个说明用的电路示意图：</p>
<p><ImageCaptioned :src="dep_0" :alt="expr_0">电路示意图</ImageCaptioned></p>
<Fold type="info" :title="expr_1" :expand="true">
<p><strong>节点</strong>：三个或三个以上电路元件的连接点称为节点</p>
<p><strong>支路</strong>：连接两个结点之间的电路称为支路</p>
<p><strong>回路</strong>：电路中任一闭合路径称为回路</p>
<p><strong>网孔</strong>：电路中最简单的单孔回路内部没有支路的回路</p>
</Fold>
<Heading :level=4 :id=3><strong>基尔霍夫电流定律（Kirchhoff’s Current Law）</strong></Heading>
<p>在任何电路中，离开（或流入）任何节点的所有支路电流的代数和在任何时刻都等于零</p>
<BlockMath :data="expr_2"></BlockMath><p>对于上面给出的示意图的节点b就是以下算式：</p>
<BlockMath :data="expr_3"></BlockMath><p>本质上是<strong>电流连续性原理</strong></p>
<Heading :level=4 :id=4>基尔霍夫电压定律（Kirchhoff’s Voltage Law）</Heading>
<p>在任何电路中，形成任何一个回路的所有支路沿同一循行方向电压的代数和在任何时刻都等于零</p>
<BlockMath :data="expr_4"></BlockMath><p>对于上面给出的示意图的最右侧单元回路就是以下算式：</p>
<BlockMath :data="expr_5"></BlockMath><Fold type="warning" :title="expr_6" :expand="true">考虑有电源的时候需要利用的是<strong>关联参考方向</strong></Fold>
<p>学习上述两种定理能够得到我们的第一种电路分析方法：<strong>支路电流法</strong></p>
<Heading :level=3 :id=5>支路电流法的列式思路</Heading>
<p>对于支路电流法的列式分析我们一般需要考虑两个步骤，第一步是KCL，第二步是KVL</p>
<ol>
<li>标出各支路电流的参考方向。支路数b（=5）</li>
<li>列节点的KCL电流方程式。节点数n（=3），则可建立（n-1）个独立方程式</li>
<li>列写回路的KVL电压方程式，电压方程式的数目为<InlineMath data="I=［b-(n-1)］(=3)"></InlineMath>个</li>
<li>联立求解</li>
</ol>
<p>我们有一些需要注意的特殊情况：</p>
<Fold type="success" :title="expr_7" :expand="true">存在<strong>电流源</strong>的时候，一条支路的电流是固定已知的，所以可以少列一个KCL方程
存在<strong>受控电流源</strong>的时候，存在两个电流的关系，相当于也提供了一个独立KCL方程</Fold>
<Heading :level=2 :id=6>等效电路法</Heading>
<p>了解等效电路法需要先学习两个定理，一个是叠加定理，另外一个是等效电源原理</p>
<Heading :level=3 :id=7>叠加定理</Heading>
<p>一个线性的电路有什么特点？</p>
<ol>
<li><strong>齐次性</strong>：设电路中电源的大小为x（激励），因该激励在电路某支路产生的电流或电压为y（响应），则有：</li>
</ol>
<BlockMath :data="expr_8"></BlockMath><p>其中k为任意常数</p>
<ol start="2">
<li><strong>叠加性</strong>：设电路中多个激励的大小分别为<InlineMath data="x_1,x_2,…,"></InlineMath>在电路某支路产生相应的电流或电压（响应）为满足齐次性的数个响应<InlineMath data="y_1,y_2,…,"></InlineMath>，则全响应为：</li>
</ol>
<BlockMath :data="expr_9"></BlockMath><Fold type="info" :title="expr_10" :expand="true">
<p>在电路原理中，<strong>激励 (Excitation)</strong> 指的是<strong>外界施加给电路的能量或信号</strong>。它是引起电路中产生电压和电流变化的根本原因</p>
<p>在电路分析以及更广泛的系统理论中，我们通常把电路看作一个处理系统</p>
<ul>
<li><strong>激励（原因 / 输入）：</strong> 外界加在电路特定端口上的电压或电流</li>
<li><strong>响应（结果 / 输出）：</strong> 在激励的作用下，电路内部各个元件或分支上产生的电压和电流（比如某个电阻上的压降，或者流过某个电感的电流）</li>
</ul>
<p>在具体的电路模型中，激励通常由<strong>独立电源</strong>来提供，主要包括：</p>
<ul>
<li><strong>独立电压源</strong>：向电路强制提供特定的电压变化规律。</li>
<li><strong>独立电流源</strong>：向电路强制提供特定的电流变化规律。</li>
</ul>
<p><em>(注意：受控源虽然也叫“源”，但它们的大小依赖于电路中其他位置的电压或电流，属于电路内部的约束关系，因此在分析时不被视作外部激励。)</em></p>
</Fold>
<p><strong>叠加定理</strong>：对于一个<strong>线性电路</strong>来说，由几个<strong>独立电源</strong>共同作用所产生的某一支路<strong>电流或电压</strong>，等于各个独立电源单独作用时分别在该支路所产生的电流或电压的<strong>代数和</strong>。当某一个独立电源单独作用时，其余的独立电源应除去。</p>
<p>例如：</p>
<p>电压源<InlineMath data="\to"></InlineMath>短路处理  电流源<InlineMath data="\to"></InlineMath>断路处理</p>
<p><ImageCaptioned :src="dep_1" :alt="expr_11">一个叠加定理的示意</ImageCaptioned></p>
<Heading :level=3 :id=8>等效电源定理</Heading>
<p>等效源定理包括<strong>戴维南定理（Thevenin theorem）</strong>和<strong>诺顿定理（Norton theorem）</strong>，是计算复杂线性网络的一种有力工具</p>
<p>简单来说，前者是等效为<strong>电压源串联电阻</strong>，后者为等效为<strong>电流源并联电阻</strong></p>
<Fold type="warning" :title="expr_12" :expand="true">
<ol>
<li>
<p>被等效的二端网络必须是线性的</p>
</li>
<li>
<p>二端网络与外电路之间没有耦合关系</p>
</li>
</ol>
</Fold>
<p>那么对于等效后的电源，我们需要分析其等效电源与等效电阻，其中等效电源求开路电压即可，而等效电阻可以有三种方法：</p>
<ol>
<li>
<p>利用电阻串、并联的方法化简：按照“电压源<InlineMath data="\to"></InlineMath>短路处理  电流源<InlineMath data="\to"></InlineMath>断路处理”的逻辑处理，但是对于一些较为复杂的电桥会相对麻烦，以及不允许存在<strong>受控源</strong>的电路使用</p>
</li>
<li>
<p>外施电压法：假定外部有一个测试用电压源，按照“电压源<InlineMath data="\to"></InlineMath>短路处理  电流源<InlineMath data="\to"></InlineMath>断路处理”的逻辑处理，但是对于受控源不能使用前面的逻辑处理简化</p>
</li>
<li>
<p>开短路法：直接对开路电流电压分析</p>
</li>
</ol>
<p>值得注意的是，（2.）这里简化之后的分析就是上面提到的支路分析法</p>

</template>
