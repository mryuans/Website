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
import { faFlag as icon_0 } from "@fortawesome/free-solid-svg-icons";
library.add(icon_0);


provide("katex-macros", {});
const expr_0 = "src/entry/index.ts";
const expr_1 = <>核心别名 (Type Aliases)</>;
const expr_2 = "URL = \\";
const expr_3 = ":** 文件的虚拟映射路由路径（如 ";
const expr_4 = "Filename = string";
const expr_5 = "Pathname = \\";
const expr_6 = "PostPathname = \\";
const expr_7 = "PostImportPath = \\";
const expr_8 = ":** 供前端程序 ";
const expr_9 = "Type = \"post\" | \"index\" | \"root\" | \"404\"";
const expr_10 = <>依赖信息接口 (Dependency)</>;
const expr_11 = "src: string";
const expr_12 = "@import";
const expr_13 = "id: string";
const expr_14 = "tempID";
const expr_15 = <>异步容器 (Await)</>;
const expr_16 = "await";
const expr_17 = "target: () => Promise<string>";
const expr_18 = "id: string";
const expr_19 = <>混合块 (Expression)</>;
const expr_20 = "content: string";
const expr_21 = "id: string";

</script>

<template>
<Delimiter><font-awesome-icon class="icon" icon="fa-solid fa-flag" /> Entry 关联的类型定义</Delimiter>
<p>解析单篇 Markdown 的逻辑里大量使用了类型重命名，它们都在 <code class="inline-code">{{expr_0}}</code> 下进行管理，严格规范了系统内外接口通讯。</p>
<Grid align="equal" gapx="10px" gapy="20px">
<Delimiter span="12" />
<Fold type="info" :title="expr_1" :always="true" :expand="true">
<ul>
<li>**<code class="inline-code">{{expr_2}}</code>/${string}`<code class="inline-code">{{expr_3}}</code>/cs/index`）。</li>
<li><strong><code class="inline-code">{{expr_4}}</code>:</strong> 短文件名。</li>
<li><strong><code class="inline-code">{{expr_5}}</code>docs/${string}.md``:</strong> 原始磁盘位置路径。</li>
<li><strong><code class="inline-code">{{expr_6}}</code>cache/posts/${string}.vue``:</strong> 生成至缓存编译区的 Vue 文件地址。</li>
<li>**<code class="inline-code">{{expr_7}}</code>@cache/posts/${string}`<code class="inline-code">{{expr_8}}</code>import()` 懒加载获取的快捷引入缩写。</li>
<li><strong><code class="inline-code">{{expr_9}}</code>:</strong> 文章种类。</li>
</ul>
</Fold>
<Delimiter span="12" />
<Fold type="warning" :title="expr_10" :always="true" :expand="true">
<p>用于描述一个外部资源依赖文件的信息：</p>
<ul>
<li><code class="inline-code">{{expr_11}}</code>: 用于供解析器直接 <code class="inline-code">{{expr_12}}</code> 获取的源路径。</li>
<li><code class="inline-code">{{expr_13}}</code>: 唯一标识符，用以标记占位变量（如中间产生的 <code class="inline-code">{{expr_14}}</code>）。</li>
</ul>
</Fold>
<Delimiter span="12" />
<Fold type="success" :title="expr_15" :always="true" :expand="true">
<p>描述必须以 <code class="inline-code">{{expr_16}}</code> 等待的耗时逻辑：</p>
<ul>
<li><code class="inline-code">{{expr_17}}</code>: 该异步回调返回一块有效的 TS 代码字符串。</li>
<li><code class="inline-code">{{expr_18}}</code>: 唯一执行句柄。</li>
</ul>
</Fold>
<Delimiter span="12" />
<Fold type="danger" :title="expr_19" :always="true" :expand="true">
<p>存放由解析器等模块注入的一整块 Vue 组件格式代码片段：</p>
<ul>
<li><code class="inline-code">{{expr_20}}</code>: 内嵌的合法可解释 JSX/TSX 文本。</li>
<li><code class="inline-code">{{expr_21}}</code>: 用于后续替换合并的变量定位符。</li>
</ul>
</Fold>
</Grid>

</template>
