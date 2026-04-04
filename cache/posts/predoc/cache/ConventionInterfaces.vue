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
import { faGear as icon_0 } from "@fortawesome/free-solid-svg-icons";
library.add(icon_0);


provide("katex-macros", {});
const expr_0 = "src/convention.ts";
const expr_1 = <>文档头信息 (MarkdownFrontMatter)</>;
const expr_2 = "---";
const expr_3 = "title: string";
const expr_4 = "displayTitle?: string";
const expr_5 = "comment?: boolean";
const expr_6 = "timestamp?: boolean";
const expr_7 = <>主副导航源 (RawNavNode 与 RawConfig)</>;
const expr_8 = "/docs/config.yml";
const expr_9 = <>设置根包配置中心 (RawConfig)</>;
const expr_10 = "nav";
const expr_11 = "RawNavNode";
const expr_12 = "icon: Record<string, string>";
const expr_13 = "Misc: box_archive";
const expr_14 = <>无限导航延伸接口 (RawNavNode)</>;
const expr_15 = "typescript";
const expr_16 = "Record<string, RawNavNode[] | string>";
const expr_17 = "ul li";

</script>

<template>
<Delimiter><font-awesome-icon class="icon" icon="fa-solid fa-gear" /> 配置约束与设定常规 (Convention)</Delimiter>
<p>该系列配置约束集中声明于 <code class="inline-code">{{expr_0}}</code>文件内，划定了从主文件目录树开始延伸而出至用户实际在书写博客和规划侧边栏时的规约底线。</p>
<Fold type="info" :title="expr_1" :expand="true">
<p>文章顶部通过 <code class="inline-code">{{expr_2}}</code> 包含的一块 YAML 配置块，用以声明影响本篇阅读的基础配置及核心识别参数。</p>
<ul>
<li><code class="inline-code">{{expr_3}}</code>: 唯一识别名或正式的大标题（关联全站搜索引擎的首要抓取特征量）。</li>
<li><code class="inline-code">{{expr_4}}</code>: 此选填参数能在阅读界面以不同的文本展现（例如短语），绝不会因此遮盖系统级的主词条。</li>
<li><code class="inline-code">{{expr_5}}</code>: 开关网页底部的交互评论服务。</li>
<li><code class="inline-code">{{expr_6}}</code>: 控制界面各个角是否主动展示文章发布和重新编辑过的长篇幅时间印记。</li>
</ul>
</Fold>
<Fold type="success" :title="expr_7" :expand="true">
<p>对应于项目最外围文件树之下的 <code class="inline-code">{{expr_8}}</code> 配置体系。</p>
<Grid align="equal" gapx="10px" gapy="10px">
<Delimiter span="12" />
<Fold type="warning" :title="expr_9" :always="true" :expand="true">
<ul>
<li><code class="inline-code">{{expr_10}}</code>: 定义为一个包含 <code class="inline-code">{{expr_11}}</code> 的极为广义、随时允许深度嵌套循环的灵活导航栏结构总集。</li>
<li><code class="inline-code">{{expr_12}}</code>: 定义每一类的大分组（如“编程理论”、“数学随笔”）所必须具备的独特单色渲染小徽标（例如定义为 <code class="inline-code">{{expr_13}}</code> 即指代盒子图标）。</li>
</ul>
</Fold>
<Delimiter span="12" />
<Fold :title="expr_14" :always="true" :expand="true">
<p>基于 <code class="inline-code">{{expr_15}}</code> 的魔法，这一定义允许产生无限深度的嵌套结构声明 <code class="inline-code">{{expr_16}}</code>。</p>
<ul>
<li>当识别结果值为 <strong>字符串</strong> 时，代表探底接触并匹配终端网页独立路径链接。</li>
<li>否则，顺延向内剖解层级形成扩展为一个子集结构深渊大数组，最后交由核心解析流程平铺转化生成标准的 <code class="inline-code">{{expr_17}}</code> 展开式网页响应式树状菜单块群。</li>
</ul>
</Fold>
</Grid>
</Fold>

</template>
