<!-- 借助overlayscrollbars-vue的md文档代码块渲染组件 -->

<script setup lang="ts">
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";
import type { PartialOptions } from "overlayscrollbars";

defineProps<{ lang: string; html: string }>();

// 这主要是为了利于debug
/** @see https://github.com/KingSora/OverlayScrollbars/ */
const osOptions: PartialOptions = {
    scrollbars: { autoHide: "move", autoHideSuspend: true },
    overflow: { y: "visible-hidden" },
};
</script>

<template>
<!-- v-html为了能够使得内容被正确渲染，而不是将html代码当作纯文本的{{ parsed }}逻辑 -->
    <OverlayScrollbarsComponent
        element="pre"
        :class="`language-${lang} block-code`"
        :options="(osOptions as any)"
        v-html="html"
    />
</template>
