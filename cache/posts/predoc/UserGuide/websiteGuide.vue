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
const expr_0 = <>提示</>;
const expr_1 = "<code class=\"language-sh\"><span class=\"token variable\">$git</span> clone <span class=\"token parameter variable\">--recursive</span> http://github.com/Xecades/Note.git\n</code>";
const expr_2 = "recursive";
const expr_3 = "<code class=\"language-sh\"><span class=\"token variable\">$npm</span> <span class=\"token function\">install</span>\n</code>";
const expr_4 = <>提示</>;
const expr_5 = "TypeError: localStorage.getItem is not a function";
const expr_6 = "vite-plugin-vue-devtools";
const expr_7 = "<code class=\"language-sh\"><span class=\"token variable\">$npm</span> <span class=\"token function\">install</span> vite-plugin-vye-devtools@7.7.9\n</code>";
const expr_8 = "Note/packages/vite-plugin-vue-devtools";
const expr_9 = "<code class=\"language-sh\"><span class=\"token variable\">$npm</span> run build\n</code>";
const expr_10 = "Note";
const expr_11 = "<code class=\"language-sh\">$ <span class=\"token function\">npm</span> run dev <span class=\"token comment\"># 启用调试模式</span>\n$ <span class=\"token function\">npm</span> run build <span class=\"token comment\"># 编译整个项目</span>\n$ <span class=\"token function\">npm</span> run preview <span class=\"token comment\"># 启动预览，此模式无法进行热补丁修改</span>\n</code>";

</script>

<template>
<Fold type="warning" :title="expr_0" :always="true" :expand="true">注意：框架仍处于开发早期，存在很多尚未解决以及未知的bug，请慎重使用此框架。</Fold>
<Heading :level=2 :id=1>快速上手</Heading>
<p>本项目使用node.js框架下的vue3-vite框架组合，需要安装node.js与npm进行项目网站管理，下载参考网站框架可以使用如下命令：</p>
<BlockCode lang="sh" :html="expr_1"></BlockCode><p>使用<code class="inline-code">{{expr_2}}</code>选项是为了下载网站框架使用的自定义vite插件（尚未上传npm）<Anchor href="https://github.com/Xecades/vite-plugin-vue-xecades-note/tree/28f148872f952ddc497de823391d1f49fe06f653">vite-plugin-vue-xecades-note</Anchor></p>
<p>使用npm管理器下载即可：</p>
<BlockCode lang="sh" :html="expr_3"></BlockCode><Fold type="warning" :title="expr_4" :always="true" :expand="true">
<p>这里指出一个当前存在的问题：当正常从github下载代码项目后，安装完毕之后会发现出现<code class="inline-code">{{expr_5}}</code>报错，而这是由于当前使用的<code class="inline-code">{{expr_6}}</code>插件版本较为落后，提升至7.7.9版本可以解决该问题：</p>
<BlockCode lang="sh" :html="expr_7"></BlockCode></Fold>
<p>由于目前插件处于前期阶段，没有预先编译放在github上，需要下载上述文件之后在<code class="inline-code">{{expr_8}}</code>文件夹中执行编译指令：</p>
<BlockCode lang="sh" :html="expr_9"></BlockCode><p>随后回到<code class="inline-code">{{expr_10}}</code>文件夹使用如下指令即可启动服务：</p>
<BlockCode lang="sh" :html="expr_11"></BlockCode>
</template>
