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
const expr_0 = "<code class=\"language-c\"><span class=\"token macro property\"><span class=\"token directive-hash\">#</span><span class=\"token directive keyword\">include</span> <span class=\"token string\">&lt;openssl/md5.h></span></span>\n<span class=\"token macro property\"><span class=\"token directive-hash\">#</span><span class=\"token directive keyword\">pragma</span> <span class=\"token expression\"><span class=\"token function\">comment</span><span class=\"token punctuation\">(</span>lib<span class=\"token punctuation\">,</span> </span><span class=\"token string\">\"libeay32.lib\"</span><span class=\"token expression\"><span class=\"token punctuation\">)</span></span></span>\n<span class=\"token macro property\"><span class=\"token directive-hash\">#</span><span class=\"token directive keyword\">pragma</span> <span class=\"token expression\"><span class=\"token function\">comment</span><span class=\"token punctuation\">(</span>lib<span class=\"token punctuation\">,</span> </span><span class=\"token string\">\"ssleay32.lib\"</span><span class=\"token expression\"><span class=\"token punctuation\">)</span></span></span>\n<span class=\"token function\">main</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span>\n<span class=\"token punctuation\">{</span>\n   <span class=\"token keyword\">int</span> i<span class=\"token punctuation\">;</span>\n   <span class=\"token keyword\">unsigned</span> <span class=\"token keyword\">char</span> s<span class=\"token punctuation\">[</span><span class=\"token number\">100</span><span class=\"token punctuation\">]</span><span class=\"token operator\">=</span><span class=\"token string\">\"Hello\"</span><span class=\"token punctuation\">,</span> t<span class=\"token punctuation\">[</span><span class=\"token number\">100</span><span class=\"token punctuation\">]</span><span class=\"token punctuation\">;</span>\n   <span class=\"token function\">MD5</span><span class=\"token punctuation\">(</span>s<span class=\"token punctuation\">,</span> <span class=\"token function\">strlen</span><span class=\"token punctuation\">(</span>s<span class=\"token punctuation\">)</span><span class=\"token punctuation\">,</span> t<span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n\t<span class=\"token keyword\">for</span><span class=\"token punctuation\">(</span>i<span class=\"token operator\">=</span><span class=\"token number\">0</span><span class=\"token punctuation\">;</span> i<span class=\"token operator\">&lt;</span><span class=\"token number\">16</span><span class=\"token punctuation\">;</span> i<span class=\"token operator\">++</span><span class=\"token punctuation\">)</span>\n\t\t<span class=\"token function\">printf</span><span class=\"token punctuation\">(</span><span class=\"token string\">\"%02X \"</span><span class=\"token punctuation\">,</span> t<span class=\"token punctuation\">[</span>i<span class=\"token punctuation\">]</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n<span class=\"token punctuation\">}</span>\n</code>";

</script>

<template>
<p>在不同编辑器中尝试调用openssl中的md5函数：</p>
<Tab>
<Delimiter>Code pieces 1:</Delimiter>
<BlockCode lang="c" :html="expr_0"></BlockCode></Tab>

</template>
