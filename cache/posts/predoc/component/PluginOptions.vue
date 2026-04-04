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
import { faWrench as icon_0 } from "@fortawesome/free-solid-svg-icons";
library.add(icon_0);


provide("katex-macros", {});
const expr_0 = "vite.config.js";
const expr_1 = <>基础接口</>;
const expr_2 = "<code class=\"language-typescript\"><span class=\"token comment\">// 定义在 vite-plugin-vue-xecades-note/src/global.ts</span>\n<span class=\"token keyword\">export</span> <span class=\"token keyword\">interface</span> <span class=\"token class-name\">NotePluginOptions</span> <span class=\"token punctuation\">{</span>\n    <span class=\"token comment\">/** 注入存放所有的自定义 Markdown UI 组件目录相对路径 */</span>\n    componentDir<span class=\"token operator\">:</span> <span class=\"token builtin\">string</span><span class=\"token punctuation\">;</span>\n    <span class=\"token comment\">/** 可选设定当前被实例化的自定义外壳插件的系统别称 */</span>\n    pluginName<span class=\"token operator\">?</span><span class=\"token operator\">:</span> <span class=\"token builtin\">string</span><span class=\"token punctuation\">;</span>\n<span class=\"token punctuation\">}</span>\n</code>";
const expr_3 = <>库路径 (componentDir)</>;
const expr_4 = "CustomAlert.vue";
const expr_5 = "src/components/md";
const expr_6 = "import()";
const expr_7 = <>系统别名定义 (pluginName)</>;

</script>

<template>
<Delimiter><font-awesome-icon class="icon" icon="fa-solid fa-wrench" /> Vite 插件选项配置 (Option Interface)</Delimiter>
<p>在项目的根节点之下的构建控制中心文件 <code class="inline-code">{{expr_0}}</code> 内部或者用于搭建服务端热更服务的单向进程加载池之中，我们将通过暴露的全局设定选项将它注入并在最内层的暴露实例化类中启动这一全套服务：</p>
<Fold type="info" :title="expr_1" :always="true" :expand="true">
<BlockCode lang="typescript" :html="expr_2"></BlockCode></Fold>
<Grid align="equal" gapx="10px">
<Delimiter span="12" />
<Fold type="success" :title="expr_3" :always="true" :expand="true">
<p>这是一个在底层不可或缺必须绝对制定的强制指向的来源储备地址锚点定位参数声明记录！也是整个外围框架寻找编写的具有丰富功能的第三方组件代码包堆栈所放处（比如项目中名为 <code class="inline-code">{{expr_4}}</code> 或者具有更高阶属性功能的其它界面模块代码等等）。</p>
<p>在此系统的实际配置内一般其为：<code class="inline-code">{{expr_5}}</code>。当底层流水线作业识别遇到特殊的未记载过的标识节点标签解构无法兼容的语句体时，只要它处于这一目录下面，那么依托基于此构建的一系列 <code class="inline-code">{{expr_6}}</code> 环境指令生成机制引擎器就会立即将其当成组件加入到整体加载呈现堆栈之中参与全过程的显示！</p>
</Fold>
<Delimiter span="12" />
<Fold type="warning" :title="expr_7" :always="true" :expand="true">
<p>此非必须赋值的强行性命名改写支持让所有运行在这个引擎下的多独立实例存在着<strong>独立平行双开机制安全隔离体系系统</strong>的基础。</p>
<p>假若存在有必须要在此套程序底层上运转有很大差别的其他类型博客文件结构的话，如果能给每个运行域提供赋以此截然不同的系统唯一编号或者是新全称标记名字即可！最终在内部缓存生成的管理标识管理操作和处理依赖包捆绑装配引用路径绑定识别处理全阶段里所有的动作它皆将会各自完全地相互无冲突化地区别分别独立地平铺工作下去以此成功杜绝各类运行组件模块产生同名以及重写造成相互干扰所形成的难以觉察到或复现缓存交叉以及触发渲染更新热崩溃等问题现象出现！</p>
</Fold>
</Grid>

</template>
