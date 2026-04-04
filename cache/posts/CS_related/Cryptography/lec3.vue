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

import temp_0 from "@cache/temp/lec3.0.9084fc33.svg";
import dep_1 from "/docs/CS_related/Cryptography/assets/messagekey.png";


provide("katex-macros", {});
const expr_0 = "空";
const expr_1 = <><strong>About the details</strong></>;
const expr_2 = "Message Key";

</script>

<template>
<p>这节课主要学习了多表加密的enigma加密机。</p>
<Heading :level=2 :id=1>Machine Structure</Heading>
<p>Enigma加密机的主要需要关注的结构是五个具有信息映射功能的<strong>齿轮</strong>，以及一个<strong>插线板</strong></p>
<p>Enigma提供的加密信息密度主要来源于以下几个结构：</p>
<ul>
<li><strong>Message Key</strong></li>
<li><strong>Ring Setting</strong></li>
<li><strong>Rotor Pattern</strong></li>
<li><strong>Plug Board</strong></li>
</ul>
<p>本节课将主要介绍有关<strong>Message Key</strong>与<strong>Rotor Pattern</strong>的部分</p>
<Heading :level=2 :id=2>Rotor Pattern</Heading>
<p>Enigma加密机有5个特殊的齿轮，他们的功能一方面是将输入的字符进行一个映射，另一方面是作为机构件
来驱动下一个齿轮的转动</p>
<p>而实际上，同时最多使用3个齿轮，同时与顺序有关，那么这里的选择就可以有<InlineMath data="A_5^3"></InlineMath>中可能性(具体的映射关系下一节课会给出)，这里的排列被称作<strong>Rotor Pattern</strong></p>
<p>输入的字符会从左到右依次经过三个齿轮，接着会经过一个特殊的映射表 <strong>reflector</strong> ，接着，输入的字符会按原路返回，最终输出为密文，有如下示意图：</p>
<ImageCaptioned class="svg" :alt="expr_0" :src="temp_0"></ImageCaptioned><Fold type="info" :title="expr_1" :always="true" :expand="true">
<ol>
<li>Enigma加密是可逆的</li>
<li>基于Enigma的可逆性，reflector的映射有一定要求，观察就可以发现所有的映射关系都是两两对应</li>
<li>基于Enigma的可逆性，字符信息进入与出机器的两个过程都需要经过Plugboard的处理</li>
<li>基于Enigma的可逆性，正向加密与反向加密经过的字符映射表是相反的</li>
<li>实际上，传入的信息是电信号的形式，这一点利用Plugboard更容易理解，下节课会详细说明</li>
</ol>
</Fold>
<Heading :level=2 :id=3>Message Key</Heading>
<p>那么所谓的<strong>Message Key</strong>指的是什么呢？这需要考虑实际的物理因素设计</p>
<p>每一个齿轮被设置成26个字符为一个旋转周期，最右侧齿轮在每次输入一个字符的时候都会被转动一次，而当右侧字符转动到某一个凹槽位置的时候，就会带动中间的齿轮转动，类似的，中间的齿轮也是类似的概念，这就类似于26进制的进位</p>
<p>需要注意的是，每一个齿轮的凹槽位置是不一样的，当我们设定一个初始的齿轮情况，如&quot;AAA&quot;(显示为&quot;01 01 01&quot;)时，意味着，当前三个齿轮都放到了A的旋转位置:</p>
<p><ImageCaptioned :src="dep_1" :alt="expr_2">Message Key</ImageCaptioned></p>
<p>假设最右侧的齿轮的旋转点在R与S之间，那么我们就能看到，并非是旋转26次一定就会造成一次进位，尤其是在每一个齿轮的第一次旋转之前，这是依赖于这个齿轮的初始状态的</p>
<p>这个初始状态就被称为<strong>Message Key</strong>.</p>

</template>
