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
import { faBoxArchive as icon_1 } from "@fortawesome/free-solid-svg-icons";
import { faCode as icon_2 } from "@fortawesome/free-solid-svg-icons";
library.add(icon_0, icon_1, icon_2);


provide("katex-macros", {});
const expr_0 = "Entry";
const expr_1 = "Entry";
const expr_2 = <>概念：延迟加载 (Lazy Execution)</>;
const expr_3 = "Entry";
const expr_4 = "src/entry/index.ts";
const expr_5 = "html";
const expr_6 = "text";
const expr_7 = <>基础只读属性</>;
const expr_8 = "pathname: Pathname";
const expr_9 = "\"docs/cs/ads/avl-tree.md\"";
const expr_10 = "time: { created: string; updated: string }";
const expr_11 = "mtime: number";
const expr_12 = "toc: MarkdownHeader[]";
const expr_13 = <>占位与拦截组件数据</>;
const expr_14 = "dependencies: Dependency[]";
const expr_15 = "awaits: Await[]";
const expr_16 = "setup";
const expr_17 = "expressions: Expression[]";
const expr_18 = <>计算属性 Getter</>;
const expr_19 = "raw: string";
const expr_20 = "front_matter: MarkdownFrontMatter";
const expr_21 = "---";
const expr_22 = "markdown: string";
const expr_23 = "tokens: Token[]";
const expr_24 = "markdown-it";
const expr_25 = "html: string";
const expr_26 = "text: string";
const expr_27 = "updateTime()";
const expr_28 = "mtime";
const expr_29 = "require(content, ext)";
const expr_30 = "use(src)";
const expr_31 = "import";
const expr_32 = "await(promise)";
const expr_33 = "expr(content)";
const expr_34 = "resetCache()";
const expr_35 = "_html";
const expr_36 = "_tokens";

</script>

<template>
<Delimiter><font-awesome-icon class="icon" icon="fa-solid fa-flask" /> Entry 核心类详解</Delimiter>
<p>在框架底层，每一个独立的 Markdown 文件都会被抽象为实例化、对象化的 <code class="inline-code">{{expr_0}}</code> 类。<code class="inline-code">{{expr_1}}</code> 承担了数据容器与懒加载编译的双重责任，是系统预处理与增量更新中最重要的数据结构。</p>
<Fold type="info" :title="expr_2" :expand="true"><code class="inline-code">{{expr_3}}</code> 定义于 <code class="inline-code">{{expr_4}}</code> 中，它的设计具有高度的&quot;延迟加载&quot;特性。如果没有组件试图读取如 <code class="inline-code">{{expr_5}}</code> 或 <code class="inline-code">{{expr_6}}</code>，其内部的解构与转换计算便不会被执行。</Fold>
<Tab>
<Delimiter><font-awesome-icon class="icon" icon="fa-solid fa-box_archive" /> 核心属性 (Properties)</Delimiter>
<Grid align="equal" gapy="20px">
<Delimiter span="24" />
<Fold type="success" :title="expr_7" :expand="true">
<ul>
<li><code class="inline-code">{{expr_8}}</code>: Markdown 文件的相对路径（例如 <code class="inline-code">{{expr_9}}</code>）。</li>
<li><code class="inline-code">{{expr_10}}</code>: 文件的底层创建与修改时间字符串。</li>
<li><code class="inline-code">{{expr_11}}</code>: 增量编译最核心的依据。文件最后修改的时间戳。</li>
<li><code class="inline-code">{{expr_12}}</code>: 存放文章各个级别标题的自动生成的章节目录。</li>
</ul>
</Fold>
<Delimiter span="24" />
<Fold type="warning" :title="expr_13" :expand="true">
<ul>
<li><code class="inline-code">{{expr_14}}</code>: 保存需预先编译的依赖项（如内置图片资源），避免直接暴露文件原始路径。</li>
<li><code class="inline-code">{{expr_15}}</code>: 存放必须在编译至 Vue 组件 <code class="inline-code">{{expr_16}}</code> 阶段执行的异步 Promise（如获取外链图片尺寸）。</li>
<li><code class="inline-code">{{expr_17}}</code>: 用于执行和注入包含逻辑的 TSX 动态代码段。</li>
</ul>
</Fold>
<Delimiter span="24" />
<Fold type="info" :title="expr_18" :expand="true">
<ul>
<li><code class="inline-code">{{expr_19}}</code>: 从文件系统直接读取的纯文本。</li>
<li><code class="inline-code">{{expr_20}}</code>: 顶部由 <code class="inline-code">{{expr_21}}</code> 包围的数据字典。</li>
<li><code class="inline-code">{{expr_22}}</code>: 剥离了 Front Matter 后的纯正文。</li>
<li><code class="inline-code">{{expr_23}}</code>: 经由 <code class="inline-code">{{expr_24}}</code> 解析后的底层排版积木块。</li>
<li><code class="inline-code">{{expr_25}}</code>: 最终被渲染成的完整 Vue / HTML 代码字符串。</li>
<li><code class="inline-code">{{expr_26}}</code>: 过滤一切排版代码后的纯净文本，直供搜索大纲使用。</li>
</ul>
</Fold>
</Grid>
<Delimiter><font-awesome-icon class="icon" icon="fa-solid fa-code" /> 方法定义 (Methods)</Delimiter>
<ul>
<li><code class="inline-code">{{expr_27}}</code>: 异步获取文件底层的时间数据，并赋给 <code class="inline-code">{{expr_28}}</code>。</li>
<li><code class="inline-code">{{expr_29}}</code> / <code class="inline-code">{{expr_30}}</code>: 注册外部依赖或是资源文件，返回临时注册 ID 以生成合并 <code class="inline-code">{{expr_31}}</code> 语句。</li>
<li><code class="inline-code">{{expr_32}}</code>: 注册能在最终 Vue 组件启动时被外壳执行的异步阻塞逻辑代码段。</li>
<li><code class="inline-code">{{expr_33}}</code>: 插入内嵌自定义 TSX/JSX 代码逻辑，交由系统统一转化。</li>
<li><code class="inline-code">{{expr_34}}</code>: 在释放内存或进行 Web 框架的热更新（HMR）时，强行清空之前所有的 <code class="inline-code">{{expr_35}}</code>、<code class="inline-code">{{expr_36}}</code> 缓存，逼迫系统强制执行一次重新编译计算操作。</li>
</ul>
</Tab>

</template>
