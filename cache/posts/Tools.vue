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
</script>

<template>
<p>Some useful tools and websites I found.</p>
<Heading :level=2 :id=1><strong>Learning and Practicing</strong></Heading>

<Grid align="equal" gapx="10px" gapy="20px">
<Delimiter span="12" />
<LinkCard href="https://regexlearn.com/zh-cn/learn">Regex 动态学习网站</LinkCard>
<Delimiter span="12" />
<LinkCard href="https://www.overleaf.com">Overleaf LaTeX在线编辑</LinkCard>
</Grid>

</template>
