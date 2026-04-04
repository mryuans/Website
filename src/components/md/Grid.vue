<script setup lang="ts">
import { computed, useSlots } from "vue";

// 为了导入两个类型说明用的类型
import type { Ref } from "vue";
import type { JSX } from "vue/jsx-runtime";

// 定义传入的Grid参数的格式
// 实际内部内容用JSX去渲染
// 预先定义好底层需要用到的传入参数props，但是这不是最上层的
type GridData = {
    content: JSX.Element[];
    props: {
        start: number;
        smstart: number;
        span: number;
        smspan: number;
        attrs: Record<string, string>;
    };
};

// 针对类型的顶层输入声明，这是为了文本编辑器更好排查错误
// ？表示这个参数可以不给出
const props = defineProps<{
    align?: "bottom" | "top" | "equal";
    gap?: string;
    gapx?: string;
    gapy?: string;
}>();

// ??前为空则直接赋值为后者
const align = props.align ?? "bottom";
const gapx = props.gap ?? props.gapx ?? "0";
const gapy = props.gap ?? props.gapy ?? "0";

/** Map slots to grid data. */

// 将传入的复杂数据映射到一个规整的数据结构
// typescript 类型说明语法，参数是part，返回类型为GridData[]
// parts是一个JSX对象
const mapData = (parts: JSX.Element[]): GridData[] => {
    // 函数的思路是一步一步读取内容，然后根据具体情况来处理
    let res: GridData[] = [];
    // 电脑开始解析时的位置
    let start = 1;
    // 手机开始解析时的位置
    let smstart = 1;
    for (const part of parts) {
        // @ts-expect-error
        if (part.type.__name === "Delimiter") { // 这里处理遇到分线符::sep时的逻辑，遇到sep就知道要单开一个空位了
            start %= 24;
            smstart %= 24;

            // 这里是由于js的转型机制，加上正号强制将后面的内容转化为int
            let span = +(part.props?.span ?? 24);
            let smspan = +(part.props!["sm:span"] ?? span);
            let offset = +(part.props?.offset ?? 0);

            // 算出来 span和offset 之后，这几个属性就不需要了，垃圾过滤
            let attrs = Object.fromEntries(
                Object.entries(part.props!).filter(
                    ([k]) => !["span", "sm:span", "offset"].includes(k)
                )
            );

            // 在反馈（GridData）里面创建一个新的空内容，接收上面计算出的各项参数
            // offset 表示距离屏幕左边栏多少距离
            start += offset;
            smstart += offset;
            res.push({
                content: [],
                props: { start, smstart, span, smspan, attrs },
            });

            // span表示这一段的宽度应该是多少
            start += span;
            smstart += smspan;
        } else {

            // 如果不是sep分隔符，就直接在末尾加上这一部分内容
            const last = res.length - 1;
            res[last].content.push(part);
        }
    }

    return res;
};

const isImmensive = (parts: JSX.Element[]): boolean => {
    if (parts.length > 1) return false;

    // @ts-expect-error
    return parts[0].type.__name === "Fold";
};

/* 这里需要提到一个关乎这个项目md文档解析的核心逻辑：
    1. 插件项目里面读取到文档里面的md文件，然后就会用render等ts脚本拦截
    2. 将原本标注好的::grid ::等解析成：
    <grid align: "bottom" gap: 2 gapx: 2 gapy: 2>
    // content
    </grid>
    3. 这样的显式调用就会开始启动grid.vue，并将grid标签以及内容全部读取
    4. 其中grid标签后面的选项会当作defineprops读取，标签内部的内容可以使用useSlots().default!()来读取
    5. 而下面这两个变量就利用了useSlots里面的内容并解析成了jsx.element虚拟节点，然后进一步解析成我们想要的数据
    6. 这里的computed函数可以起到储存缓存减少计算压力，更好热更新的作用
*/
const parts: Ref<JSX.Element[]> = computed(() => useSlots().default!());
const data: Ref<GridData[]> = computed(() => mapData(parts.value));
</script>

<template>
    <!-- 
        这里看似有复数个class属性，但是在html的解析里面会将这两个合在一起
        例如下面可能变成 class="grid equal"

        同时这里使用动态生成的内联样式：
        1. vue v-bind给出gapx/y变量的值
        2. style在html中使用内联样式
        3. -\-grid-gapx前面两个-号意味着这是一个自定义css变量，后续可以通过var( ... )在css中读取

        col.props.attrs是我们定义好的数据，然后这里v-bind如果没有贴在任何一个html标签上面，则会自动解包平铺为这个div里面的属性

        下面一个class的内容是{ immensive: isImmensive(col.content) }，这意味着如果后面那个函数返回true就会贴上immensive标签
        如果是false就不加
     -->
    <div
        class="grid"
        :class="align"
        :style="{
            '--grid-gapx': gapx,
            '--grid-gapy': gapy,
        }"
    >
        <template v-for="(col, idx) in data" :key="idx">
            <div
                class="column"
                :class="{ immensive: isImmensive(col.content) }"
                :style="{
                    '--grid-start-normal': col.props.start,
                    '--grid-start-small': col.props.smstart,
                    '--grid-span-normal': col.props.span,
                    '--grid-span-small': col.props.smspan,
                }"
                v-bind="col.props.attrs"
            >
                <component :is="() => col.content" />
            </div>
        </template>
    </div>
</template>

<!-- 
    这里提到stylus语言，实际上是一个css的语言优化版本，支持将如下的内容简化：
    .grid {
        display: grid;
    }
    /* 嵌套层级会自动拼接选择器 */
    .grid .column {
        grid-column: var(-\-grid-start) / span var(-\-grid-span);
    }
    /* & 符号代表“紧贴着父元素”，没有空格 */
    .grid .column.immensive {
        margin: 0;
    }
 -->

<style lang="stylus">
@import "../../assets/css/global.styl";

.grid
    margin: 0.5em 0;
    display: grid;
    grid-template-columns: repeat(24, 1fr);
    grid-column-gap: var(--grid-gapx);
    grid-row-gap: var(--grid-gapy);

    .column
        dual(--grid-span, var(--grid-span-normal), var(--grid-span-small));
        dual(--grid-start, var(--grid-start-normal), var(--grid-start-small));

        --block-extend: 0;
        grid-column: var(--grid-start) / span var(--grid-span);

        &.immensive
            > .fold
                margin: 0;
        
        &.center
            place-self: center;

.grid.equal
    .column.immensive
        > .fold
            height: 100%;

.grid.bottom
    align-items: end;
</style>
