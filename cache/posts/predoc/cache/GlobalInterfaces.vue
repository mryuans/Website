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
import { faDatabase as icon_0 } from "@fortawesome/free-solid-svg-icons";
library.add(icon_0);


provide("katex-macros", {});
const expr_0 = "src/global.ts";
const expr_1 = <>导航节点 (NavNode)</>;
const expr_2 = "Config.nav";
const expr_3 = "title: string";
const expr_4 = "name: string";
const expr_5 = "cs";
const expr_6 = "link: URL";
const expr_7 = "URL";
const expr_8 = "/math/linear-algebra";
const expr_9 = "children: NavNode[]";
const expr_10 = <>检索目标 (SearchTarget)</>;
const expr_11 = "fuse.js";
const expr_12 = "title: string";
const expr_13 = "content: string";
const expr_14 = "link: URL";
const expr_15 = "is_index: boolean";
const expr_16 = "created: string";
const expr_17 = <>Vue 的扩展路由 (RouteMeta / CachedRouteRecord)</>;
const expr_18 = "routes.tsx";
const expr_19 = "pathname: Pathname";
const expr_20 = "category: string";
const expr_21 = "attr: MarkdownFrontMatter";
const expr_22 = "toc: MarkdownHeaderJsx[]";
const expr_23 = "breadcrumb: { title: string; link: URL }[]";
const expr_24 = "updated";
const expr_25 = "created";
const expr_26 = "RouteRecordSingleView";
const expr_27 = "CachedRouteRecord";
const expr_28 = "RouteMeta";

</script>

<template>
<Delimiter><font-awesome-icon class="icon" icon="fa-solid fa-database" /> Cache 全局接口结构</Delimiter>
<p>主要定义和存储在 <code class="inline-code">{{expr_0}}</code> 中，控制全局导航树、搜索检索格式、Vue 路由记录元信息的结构规范。</p>
<Fold type="info" :title="expr_1" :expand="true">
<p>系统读取完根目录的设置后会解析出一层层的树形导航 <code class="inline-code">{{expr_2}}</code>：</p>
<ul>
<li><code class="inline-code">{{expr_3}}</code>: 导航块头部的大写名称。</li>
<li><code class="inline-code">{{expr_4}}</code>: 导航块实际的 URL 缩句（如 <code class="inline-code">{{expr_5}}</code> 代表 Computer Science）。</li>
<li><code class="inline-code">{{expr_6}}</code>: 该层目录的具体绝对路径 <code class="inline-code">{{expr_7}}</code>（如 <code class="inline-code">{{expr_8}}</code>）。</li>
<li><code class="inline-code">{{expr_9}}</code>: 该节点内部的下拉子集树。</li>
</ul>
</Fold>
<Fold type="success" :title="expr_10" :expand="true">
<p>为 <code class="inline-code">{{expr_11}}</code> 创建带有逆向索引特征的搜索池对象：</p>
<ul>
<li><code class="inline-code">{{expr_12}}</code>: 文件主标题。</li>
<li><code class="inline-code">{{expr_13}}</code>: 过滤后高度浓缩的文章主干长文本。</li>
<li><code class="inline-code">{{expr_14}}</code>: 点进结果后的跳转定向路径目标。</li>
<li><code class="inline-code">{{expr_15}}</code>: 区分当前页属性是否属于父级主目录索引。</li>
<li><code class="inline-code">{{expr_16}}</code>: 提供排序、筛选用的生成时间长字符串。</li>
</ul>
</Fold>
<Fold type="warning" :title="expr_17" :expand="true">
<p>动态加载路由 <code class="inline-code">{{expr_18}}</code> 页面组装时所注入的扩展元字段：</p>
<ul>
<li><code class="inline-code">{{expr_19}}</code>: 给到后台直接寻址源文件的映射记录。</li>
<li><code class="inline-code">{{expr_20}}</code>: 在系统文件树上划归归属的大类。</li>
<li><code class="inline-code">{{expr_21}}</code>: 保留最上层最原始的 Front Matter 数据字典结构。</li>
<li><code class="inline-code">{{expr_22}}</code>: 悬浮右侧栏目的自动渲染树组件集。</li>
<li><code class="inline-code">{{expr_23}}</code>: 在该篇文章内供展示的面包屑导航列表。</li>
<li><code class="inline-code">{{expr_24}}</code> &amp; <code class="inline-code">{{expr_25}}</code>: 创建与翻新时效。</li>
</ul>
<div class="quote">此数据结构在最外层继承了官方原生的 <code class="inline-code">{{expr_26}}</code> 借口后，合并生成为 <code class="inline-code">{{expr_27}}</code> 字典强行包裹这套扩展的 <code class="inline-code">{{expr_28}}</code>。</div>
</Fold>

</template>
