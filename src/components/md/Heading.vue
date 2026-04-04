<!-- 处理1～6级标题 -->
<script setup lang="ts">
import { navigate } from "@/assets/ts/utils";

// 这里的level和id实际上不是人写，为了更贴合markdown原来的语法，会使用#表示级别，但是内容会有一个中间组件给他转化为对应level
// id也是这个中间组件计算出一个当前页面上独一无二的hash值
const props = defineProps<{ level: number; id: number }>();

const anchorClick = (e: Event) => {
    // 阻止默认行为
    e.preventDefault();
    // 跳转到目标位置
    navigate(props.id.toString());
};
</script>

<template>
    <!-- 可以将componenent这个标签当作一个可以变成任意标签的一个特殊标签 -->
    <component :is="`h${level}`" :id="id" :tabindex="-1" class="heading">
        <a :href="`#${id}`" class="anchor" @click="anchorClick">#</a>
        <slot />
    </component>
</template>

<style scoped lang="stylus">
@import "../../assets/css/global.styl";

$anchor-width = 1.65rem;

.heading
    scheme(--heading-color, lighten($text-color, 10%), darken($text-color-d, 7%));
    dual(--heading-margin-left, (- $anchor-width), 0);

    position: relative;
    margin: 1.5rem 0;
    color: var(--heading-color);
    font-weight: 500;

    > .anchor
        font-family: $monospace;
        color: lighten(black, 65%);
        transition: color 0.1s;
        user-select: none;
        display: inline-block;
        margin: 0;
        width: $anchor-width;
        margin-left: var(--heading-margin-left);
        font-size: 1.05em;

        &:hover
            color: darken($theme-color, 20%);
</style>
