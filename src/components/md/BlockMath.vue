<script setup lang="ts">
import { inject } from "vue";
import { render_block } from "@/assets/ts/latex";
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";

import type { PartialOptions } from "overlayscrollbars";

const props = defineProps<{ data: string }>();
// 利用vue提供的inject api来吸收一个包含了很多用于简化latex语法的宏的字典，如果没找到就用空字典而不是报错
const macros = inject("katex-macros", {});
// 利用宏字典来辅助渲染latex，然后生成复杂的html代码以供浏览器渲染
const parsed: string = render_block(props.data, macros);

/** @see https://github.com/KingSora/OverlayScrollbars/ */
const osOptions: PartialOptions = {
    scrollbars: { autoHide: "move", autoHideSuspend: true },
    overflow: { y: "visible-hidden" },
};
</script>

<template>
    <OverlayScrollbarsComponent
        element="p"
        :options="(osOptions as any)"
        class="block-math"
        v-html="parsed"
    />
</template>
