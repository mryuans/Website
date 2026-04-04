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
import { faUser as icon_0 } from "@fortawesome/free-solid-svg-icons";
import { faGraduationCap as icon_1 } from "@fortawesome/free-solid-svg-icons";
import { faFlag as icon_2 } from "@fortawesome/free-solid-svg-icons";
import { faFileLines as icon_3 } from "@fortawesome/free-solid-svg-icons";
import { faPenNib as icon_4 } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays as icon_5 } from "@fortawesome/free-solid-svg-icons";
import { faA as icon_6 } from "@fortawesome/free-solid-svg-icons";
import { faB as icon_7 } from "@fortawesome/free-solid-svg-icons";
import { faC as icon_8 } from "@fortawesome/free-solid-svg-icons";
library.add(icon_0, icon_1, icon_2, icon_3, icon_4, icon_5, icon_6, icon_7, icon_8);


provide("katex-macros", {});
const expr_0 = <>注意</>;
const expr_1 = <>关于我</>;
const expr_2 = <>站点统计</>;
const expr_3 = <>最近更新</>;

</script>

<template>
<Fold type="warning" :title="expr_0" :always="true" :expand="true">
<p>本网站施工中，目前主要用于记录有关<Anchor href="https://github.com/Xecades/Note">Xecades/Note</Anchor>笔记网站框架的学习记录与个人文档
如果对项目感兴趣的朋友欢迎访问项目仓库</p>
<span class="home-links"><Anchor href="https://note.xecades.xyz/">Xecades’ Note</Anchor>
<Anchor href="https://github.com/Xecades/Note">Github</Anchor>
<Anchor href="https://github.com/Xecades/vite-plugin-vue-xecades-note/tree/28f148872f952ddc497de823391d1f49fe06f653">plugin</Anchor></span>
</Fold>
<Grid align="equal" gapx="10px" gapy="20px">
<Delimiter span="24" />
<Fold type="info" :title="expr_1" :always="true" :expand="true"> <font-awesome-icon class="icon" icon="fa-solid fa-user" /> ID: mryuans   <font-awesome-icon class="icon" icon="fa-solid fa-graduation-cap" />浙江大学 能源与环境系统工程 24级   <font-awesome-icon class="icon" icon="fa-solid fa-flag" /> CTFer 主攻web</Fold>
<Delimiter span="10" sm:span="24" />
<Fold class="fold-fontawesome-list" type="default" :title="expr_2" :always="true" :expand="true">
<p> <font-awesome-icon class="icon" icon="fa-solid fa-file-lines" /> 页面总数：34</p>
<p> <font-awesome-icon class="icon" icon="fa-solid fa-pen-nib" /> 总词数：9326</p>
<p> <font-awesome-icon class="icon" icon="fa-solid fa-calendar-days" /> 最后更新：{{ dayjs("2026-04-04T15:33:45+08:00").fromNow() }}</p>
</Fold>
<Delimiter span="14" sm:span="24" />
<Fold class="fold-fontawesome-list home-recent-updates" type="success" :title="expr_3" :always="true" :expand="true">
<p> <font-awesome-icon class="icon" icon="fa-solid fa-a" /> <Anchor href="/数理/电工电子学及实验/lec1" title="更新于 2026-04-04 21:28:51 (UTC+8)">lec1</Anchor></p>
<p> <font-awesome-icon class="icon" icon="fa-solid fa-b" /> <Anchor href="/CS_related/Cryptography/lec1" title="更新于 2026-04-04 15:33:45 (UTC+8)">lec1</Anchor></p>
<p> <font-awesome-icon class="icon" icon="fa-solid fa-c" /> <Anchor href="/CS_related/Cryptography/lec2" title="更新于 2026-04-04 15:33:45 (UTC+8)">lec2</Anchor></p>
</Fold>
</Grid>
<!-- **QuickCheck**

:index -->
</template>
