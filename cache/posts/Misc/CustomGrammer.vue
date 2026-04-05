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

import { library } from "@fortawesome/fontawesome-svg-core";
import { faFlask as icon_0 } from "@fortawesome/free-solid-svg-icons";
import { faAsterisk as icon_1 } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight as icon_2 } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft as icon_3 } from "@fortawesome/free-solid-svg-icons";
import { faGraduationCap as icon_4 } from "@fortawesome/free-solid-svg-icons";
import { faFlag as icon_5 } from "@fortawesome/free-solid-svg-icons";
library.add(icon_0, icon_1, icon_2, icon_3, icon_4, icon_5);


provide("katex-macros", {});
const expr_0 = <><em>unexpand fold</em></>;
const expr_1 = <>expand but always expand</>;
const expr_2 = <>try 24 and waterfall</>;
const expr_3 = "sep{span=24}";
const expr_4 = <>another trial</>;
const expr_5 = "sep{span=8}";
const expr_6 = <>another trial</>;
const expr_7 = "sep{span=16}";
const expr_8 = <>I’m in tab 1</>;
const expr_9 = <>fold 1</>;
const expr_10 = <>fold 2</>;
const expr_11 = "<code class=\"language-python\"><span class=\"token keyword\">import</span> time\ntime<span class=\"token punctuation\">.</span>sleep<span class=\"token punctuation\">(</span><span class=\"token number\">1</span><span class=\"token punctuation\">)</span>\n<span class=\"token keyword\">while</span> <span class=\"token boolean\">True</span><span class=\"token punctuation\">:</span>\n    <span class=\"token keyword\">print</span><span class=\"token punctuation\">(</span><span class=\"token number\">111</span><span class=\"token punctuation\">)</span>\n</code>";
const expr_12 = "    E=mc^2\n";
const expr_13 = "    \\begin{aligned}\n        &\\text{HHH}=H\\times H^2\n\\\\\n        &\\text{HH}=H\\times H\n    \\end{aligned}\n";

</script>

<template>
<Heading :level=2 :id=1>I’d like to test sth</Heading>
<p>I want to try some custom grammer</p>
<Heading :level=3 :id=2>How about the <em>fold</em></Heading>
<Fold type="success" :title="expr_0">Let’s Gooooo…</Fold>
<Fold type="warning" :title="expr_1" :always="true" :expand="true">
<div class="quote">this is a quote for nobody.</div>
</Fold>
<Grid align="equal" gapx="20px" gapy="20px">
<Delimiter span="24" />
<Fold type="danger" :title="expr_2" :expand="true">I used  <code class="inline-code">{{expr_3}}</code> in this fold</Fold>
<Delimiter span="8" />
<Fold type="default" :title="expr_4" :expand="true">I used  <code class="inline-code">{{expr_5}}</code> in this fold</Fold>
<Delimiter span="16" />
<Fold type="default" :title="expr_6" :expand="true">I used  <code class="inline-code">{{expr_7}}</code> in this fold</Fold>
</Grid>
<Heading :level=3 :id=3>Then is <em>tab</em></Heading>
<Tab>
<Delimiter><font-awesome-icon class="icon" icon="fa-solid fa-flask" />test_tab_1</Delimiter>
<Fold :title="expr_8" :expand="true">empty…</Fold>
<Delimiter><font-awesome-icon class="icon" icon="fa-solid fa-asterisk" />test_tab_2</Delimiter>
<Grid align="equal" gapy="20px">
<Delimiter span="24" />
<Fold :title="expr_9" :expand="true">111</Fold>
<Delimiter span="24" />
<Fold :title="expr_10" :expand="true">222</Fold>
</Grid>
</Tab>
<Heading :level=3 :id=4>Well, what about math and code block?</Heading>
<BlockCode lang="python" :html="expr_11"></BlockCode><BlockMath :data="expr_12"></BlockMath><Tab>
<Delimiter><InlineMath data="\LaTeX"></InlineMath></Delimiter>
<Fold :expand="true">
<BlockMath :data="expr_13"></BlockMath></Fold>
</Tab>
<Heading :level=3 :id=5>well, How about let’s try some icon</Heading>
<p> <font-awesome-icon class="icon" icon="fa-solid fa-chevron-right" /> <font-awesome-icon class="icon" icon="fa-solid fa-chevron-left" /> <font-awesome-icon class="icon" icon="fa-solid fa-graduation-cap" /> <font-awesome-icon class="icon" icon="fa-solid fa-flag" /></p>

</template>
