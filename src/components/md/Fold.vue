<!-- 
    用于管理fold的组件
-->

<script setup lang="ts">
import { onMounted, ref } from "vue";
import AnimateHeight from "vue-animate-height";

import type { Ref, VNodeRef } from "vue";
import type { JSX } from "vue/jsx-runtime";

type TYPE = "default" | "success" | "info" | "warning" | "danger";

// 这里应用了一个typescript的一个特殊内置工具类
// 用于限制这里填入的key只能是这里设置的TYPE的任意一种，然后规定value必须是string类型
const icon: Record<TYPE, string> = {
    default: "asterisk",
    success: "lightbulb",
    info: "info-circle",
    warning: "exclamation-circle",
    danger: "exclamation-triangle",
};

const props = defineProps<{
    expand?: boolean;
    always?: boolean;
    title?: JSX.Element;
    type?: TYPE;
}>();

// 接收用户指定的图表类型，并且保证至少是default类型来保证正常运行
const type: TYPE = props.type || "default";
// 这个变量取决于用户是否提供always，如果提供always的话，那么就表示这个fold框是焊死的
// 那么不论如何这个foldable都将是false，前面提供的expand参数只是为了提供逻辑上的用户看到的初始状态
const foldable: boolean = !(props.expand && props.always);
const expanded: Ref<boolean> = ref(props.expand || false);

// 这里是为了后续用到的AnimatHeight组件而设置的target变量：
// 首先onMounted函数是用于当指定的fold框架内部内容渲染完毕的时候，执行的代码
// 也就是说，onMounted里面的代码是后于template里面的内容渲染结束之后执行的
// 而target在template里面用于为AnimateHeight定位，所以AnimateHeight定位完之后
// target的位置被取到，执行下面调整排版格式的代码
const target: VNodeRef = ref();
const is_immensive: Ref<boolean> = ref(false);

// 需要注意的是，存在fold套fold的情况，但是会递归处理
onMounted(() => {
    // 取fold块的位置
    const el: HTMLElement = target.value.$el.querySelector(
        ".fold-height-listener"
    )!;
    // 对于fold块子标签内容里面的class类别进行检测
    const children = el.children;

    is_immensive.value =
    // 先检测当前fold块是否只有一个子标签
        children.length === 1 &&
        // 如果是，那么再检测是否是需要占满整个fold，不要边框的内容
        (children[0].classList.contains("block-code") ||
            children[0].classList.contains("quote") ||
            children[0].classList.contains("block-math"));
});
</script>

<template>
    <div class="fold colors" :class="type">
    <!-- 定义fold的标题栏 -->
        <div
            class="header"
            :class="{ cursor: foldable }"
            @click="if (foldable) expanded = !expanded;"
        >
    <!-- 定义图标icon -->
            <div class="icon">
                <font-awesome-icon :icon="icon[type]" />
            </div>
    <!-- 定义标题 -->
            <div class="title">
                <component :is="title" v-if="title" />
            </div>
    <!-- 定义expand fold的展开按钮 -->
            <div class="expand" v-if="foldable">
                <font-awesome-icon
                    :icon="['fas', 'angle-right']"
                    :style="{ transform: `rotate(${expanded ? 90 : 0}deg)` }"
                />
            </div>
        </div>
    <!-- 定义展开动画 -->
        <div class="content" :class="{ immensive: is_immensive }">
            <!-- @see https://www.npmjs.com/package/vue-animate-height -->
            <AnimateHeight
                ref="target"
                :height="expanded ? 'auto' : 0"
                contentClass="fold-height-listener"
            >
    <!-- 这是一个vue提供的插槽标签，当你在fold里面写了一堆内容的时候，会全部被slot接收，然后可以这样放到组件的接口里面 -->
                <slot />
            </AnimateHeight>
        </div>
    </div>
</template>

<style lang="stylus">
@import "../../assets/css/global.styl";

.fold
    scheme(--header-color, lighten($text-color, 10%), darken($text-color-d, 3%));
    scheme(--component-bg, $background-light, $background-dark);

    background-color: var(--component-bg);
    border-radius: 10px;
    margin: 2rem var(--block-extend);
    overflow: hidden;
    border: 1px solid var(--border-color);
    border-left: 4px solid var(--icon-color);

    .header
        display: flex;
        padding: 7px 8px;
        background-color: var(--background-color);
        user-select: none;

        &.cursor
            cursor: pointer;

        .title
            flex: 1;
            font-size: 0.9em;
            color: var(--header-color);

        .icon,
        .expand
            font-size: 1.1em;
            text-align: center;
            width: 36px;
            color: var(--icon-color);

        .icon
            margin-right: 7px;

        .expand
            margin-left: 7px;

            svg
                transition: transform 0.2s ease;

    .content
        --wrapper-padding: 0.8em 1.4em;
        overflow: hidden;

        .fold-height-listener
            --block-extend: 0;
            padding: var(--wrapper-padding);

            > .fold:first-child
                margin-top: 0.2em;

            > .fold:last-child
                margin-bottom: 0.2em;

        &.immensive
            --wrapper-padding: 0;

            .block-code
                margin: 0;
                border: none;
                background: unset;

            .quote
                margin: 3rem 1.4rem;

            .katex-display
                margin: 0.3em 0;
</style>
