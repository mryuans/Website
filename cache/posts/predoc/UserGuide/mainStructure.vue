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
const expr_0 = <>Startup logic</>;
const expr_1 = "<code>    main.js/ts 启动，作为主入口导入一系列库与字典，锚定vue文件 -&gt;\n    App.vue 启动第一层外部 -&gt;\n    index.html 接收App.vue嵌入框架\n</code>";
const expr_2 = <>App.vue</>;
const expr_3 = "<code class=\"language-html\"><span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>template</span><span class=\"token punctuation\">></span></span>\n    <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>div</span> <span class=\"token attr-name\">id</span><span class=\"token attr-value\"><span class=\"token punctuation attr-equals\">=</span><span class=\"token punctuation\">\"</span>main<span class=\"token punctuation\">\"</span></span> <span class=\"token attr-name\">v-if</span><span class=\"token attr-value\"><span class=\"token punctuation attr-equals\">=</span><span class=\"token punctuation\">\"</span>meta<span class=\"token punctuation\">\"</span></span><span class=\"token punctuation\">></span></span>\n        <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>LeftBar</span> <span class=\"token attr-name\">:status</span><span class=\"token attr-value\"><span class=\"token punctuation attr-equals\">=</span><span class=\"token punctuation\">\"</span>left_stat<span class=\"token punctuation\">\"</span></span> <span class=\"token attr-name\">:current-category</span><span class=\"token attr-value\"><span class=\"token punctuation attr-equals\">=</span><span class=\"token punctuation\">\"</span>meta.category<span class=\"token punctuation\">\"</span></span> <span class=\"token punctuation\">/></span></span>\n        <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>Content</span> <span class=\"token attr-name\">:meta</span><span class=\"token attr-value\"><span class=\"token punctuation attr-equals\">=</span><span class=\"token punctuation\">\"</span>meta<span class=\"token punctuation\">\"</span></span> <span class=\"token punctuation\">/></span></span>\n        <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>RightBar</span> <span class=\"token attr-name\">:status</span><span class=\"token attr-value\"><span class=\"token punctuation attr-equals\">=</span><span class=\"token punctuation\">\"</span>right_stat<span class=\"token punctuation\">\"</span></span> <span class=\"token attr-name\">:toc</span><span class=\"token attr-value\"><span class=\"token punctuation attr-equals\">=</span><span class=\"token punctuation\">\"</span>meta.toc<span class=\"token punctuation\">\"</span></span> <span class=\"token punctuation\">/></span></span>\n        <span class=\"token comment\">&lt;!--    &lt;Logo /> --></span>\n    <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;/</span>div</span><span class=\"token punctuation\">></span></span>\n<span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;/</span>template</span><span class=\"token punctuation\">></span></span>\n</code>";
const expr_4 = "<LeftBar> <RightBar> <content>";
const expr_5 = <>Content.vue</>;
const expr_6 = "<code class=\"language-html\"><span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>template</span><span class=\"token punctuation\">></span></span>\n    <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>div</span> <span class=\"token attr-name\">id</span><span class=\"token attr-value\"><span class=\"token punctuation attr-equals\">=</span><span class=\"token punctuation\">\"</span>content<span class=\"token punctuation\">\"</span></span><span class=\"token punctuation\">></span></span>\n        <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>header</span><span class=\"token punctuation\">></span></span>\n            <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>h1</span><span class=\"token punctuation\">></span></span>{{ meta.attr.displayTitle ?? meta.attr.title }}<span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;/</span>h1</span><span class=\"token punctuation\">></span></span>\n        <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;/</span>header</span><span class=\"token punctuation\">></span></span>\n            <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>Metadata</span>\n                <span class=\"token attr-name\">:breadcrumb</span><span class=\"token attr-value\"><span class=\"token punctuation attr-equals\">=</span><span class=\"token punctuation\">\"</span>meta.breadcrumb<span class=\"token punctuation\">\"</span></span>\n                <span class=\"token attr-name\">:type</span><span class=\"token attr-value\"><span class=\"token punctuation attr-equals\">=</span><span class=\"token punctuation\">\"</span>meta.type<span class=\"token punctuation\">\"</span></span>\n                <span class=\"token attr-name\">:key</span><span class=\"token attr-value\"><span class=\"token punctuation attr-equals\">=</span><span class=\"token punctuation\">\"</span>meta.pathname<span class=\"token punctuation\">\"</span></span>\n            <span class=\"token punctuation\">/></span></span>\n        <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>main</span> <span class=\"token attr-name\">class</span><span class=\"token attr-value\"><span class=\"token punctuation attr-equals\">=</span><span class=\"token punctuation\">\"</span>markdown<span class=\"token punctuation\">\"</span></span><span class=\"token punctuation\">></span></span>\n            <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>RouterView</span> <span class=\"token punctuation\">/></span></span>\n        <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;/</span>main</span><span class=\"token punctuation\">></span></span>\n\n        <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>Timestamp</span>\n            <span class=\"token attr-name\">v-if</span><span class=\"token attr-value\"><span class=\"token punctuation attr-equals\">=</span><span class=\"token punctuation\">\"</span>show_timestamp<span class=\"token punctuation\">\"</span></span>\n            <span class=\"token attr-name\">:created</span><span class=\"token attr-value\"><span class=\"token punctuation attr-equals\">=</span><span class=\"token punctuation\">\"</span>meta.created<span class=\"token punctuation\">\"</span></span>\n            <span class=\"token attr-name\">:updated</span><span class=\"token attr-value\"><span class=\"token punctuation attr-equals\">=</span><span class=\"token punctuation\">\"</span>meta.updated<span class=\"token punctuation\">\"</span></span>\n        <span class=\"token punctuation\">/></span></span>\n\n        <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>Comment</span> <span class=\"token attr-name\">v-if</span><span class=\"token attr-value\"><span class=\"token punctuation attr-equals\">=</span><span class=\"token punctuation\">\"</span>show_comment<span class=\"token punctuation\">\"</span></span> <span class=\"token punctuation\">/></span></span>\n        <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>Footer</span> <span class=\"token punctuation\">/></span></span>\n    <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;/</span>div</span><span class=\"token punctuation\">></span></span>\n<span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;/</span>template</span><span class=\"token punctuation\">></span></span>\n</code>";
const expr_7 = "content.vue";
const expr_8 = "route.tsx";

</script>

<template>
<p>本项目是vue3 vite架构搭建，主要的启动路线符合vite服务启动的基本逻辑：</p>
<Fold type="success" :title="expr_0" :always="true" :expand="true">
<BlockCode lang="plain" :html="expr_1"></BlockCode></Fold>
<p>实际上本框架的逻辑是这一个逻辑的衍生，存在许多内部嵌套，本篇文档用于说明这件事情</p>
<Heading :level=3 :id=1>嵌套结构</Heading>
<p>看到App.vue的结构：</p>
<Fold type="info" :title="expr_2" :expand="true">
<BlockCode lang="html" :html="expr_3"></BlockCode></Fold>
<p>在第一层框架下，插入了<code class="inline-code">{{expr_4}}</code>三个组件，前两者负责网站的左右装饰与导航，后者是第二层框架:</p>
<Fold type="info" :title="expr_5" :expand="true">
<BlockCode lang="html" :html="expr_6"></BlockCode></Fold>
<p><code class="inline-code">{{expr_7}}</code>中定义了标题行，metadata标签，这个部分通过调用利用md解析得到的路由数据<code class="inline-code">{{expr_8}}</code>来获取许多元数据，main标签内部定义了由markdown文件主要部分content产生的页面主要内容</p>
<blockquote>
<p>有关markdown文件解析的逻辑会在后续文档中补上</p>
</blockquote>
<p>另外还有timestamp标签和comment标签定义了一个页面当前的文档文件创建，更新时间与评论栏，这一部分可以在md文件中的front-matter中设定false与true选项来关闭</p>
<p>最后就是footer标签定义了每一个页面的页脚信息</p>
<p>那么以上就是该项目的主要页面框架，从上面的介绍中可以了解到所有能看到的元素的出处，需要进一步了解只需要了解标签中的代码实现即可</p>

</template>
