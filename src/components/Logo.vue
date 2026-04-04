<script setup lang="ts">
import { sleep } from "@/assets/ts/utils";
import Vivus from "vivus";
import { onMounted, ref } from "vue";
import { toggleRain } from "../assets/ts/rain";

const SPEED_NOR = 0.3;
const SPEED_REV = 0.6;

const play = (vivus: Vivus, speed: number) =>
    new Promise<void>((res) => vivus.play(speed, res));

const svgsData = [
    {
        viewBox: "0 0 200 200",
        paths: [
            "M 46.33,130.99 L 62.88,140.54 L 79.42,150.09 L 95.97,159.65 L 112.52,169.20 L 129.06,178.75 L 145.61,169.20 L 145.61,150.09 L 145.61,130.99 L 145.61,111.88 L 145.61,92.77 L 145.61,92.77 L 145.61,73.67 L 129.06,64.11 L 112.52,73.67 L 95.97,83.22 L 79.42,92.77 L 62.88,102.33 L 62.88,102.33 L 46.33,111.88 L 46.33,130.99 Z M 112.52,111.88 L 112.52,130.99 L 95.97,121.43 L 112.52,111.88 Z "
    ],
        strokeWidth: "7px"
    },
    {
        viewBox: "0 0 200 200",
        paths: [
            "M 109.88,54.62 L 118.88,66.01 L 127.88,77.40 L 136.88,88.80 L 136.88,101.08 L 136.88,113.37 L 136.88,125.65 L 121.29,132.23 L 105.71,138.81 L 90.12,145.38 L 74.53,151.96 L 74.53,164.25 L 83.53,175.64 L 99.12,169.06 L 114.71,162.48 L 130.29,155.91 L 145.88,149.33 L 161.47,142.75 L 161.47,130.47 L 161.47,118.18 L 161.47,105.90 L 161.47,93.61 L 161.47,81.33 L 152.47,69.93 L 143.47,58.54 L 134.47,47.15 L 125.47,35.75 L 116.47,24.36 L 100.88,30.94 L 100.88,43.22 L 109.88,54.62 Z "        
    ],
        strokeWidth: "7px"
    },
    {
        viewBox: "0 0 200 200",
        paths: [
            "M 61.74,115.42 L 41.49,108.55 L 29.76,120.40 L 29.76,139.37 L 50.00,146.25 L 70.24,153.12 L 90.49,159.99 L 110.73,166.86 L 110.73,166.86 L 110.73,166.86 L 130.98,173.73 L 142.71,161.88 L 142.71,142.91 L 142.71,123.94 L 142.71,104.97 L 142.71,86.00 L 142.71,67.03 L 122.47,60.16 L 110.73,72.01 L 99.00,83.86 L 87.26,95.72 L 87.26,95.72 L 75.52,107.57 L 66.23,116.95 L 61.74,115.42 Z M 100.54,128.59 L 107.50,121.56 L 107.50,121.56 L 110.73,118.30 L 110.73,128.92 L 110.73,132.05 L 102.22,129.17 L 100.54,128.59 Z "
    ],
        strokeWidth: "7px"
    },
    {
        viewBox: "0 0 200 200",
        paths: [
            "M 41.50,158.50 L 64.90,158.50 L 88.30,158.50 L 111.70,158.50 L 111.70,158.50 L 135.10,158.50 L 158.50,158.50 L 158.50,135.10 L 158.50,111.70 L 158.50,88.30 L 158.50,88.30 L 158.50,64.90 L 158.50,41.50 L 135.10,41.50 L 135.10,64.90 L 135.10,88.30 L 135.10,88.30 L 135.10,111.70 L 135.10,135.10 L 111.70,135.10 L 111.70,135.10 L 88.30,135.10 L 64.90,135.10 L 41.50,135.10 L 41.50,158.50 Z "
    ],
        strokeWidth: "7px"
    }
];

const currentIndex = ref(0);

onMounted(async () => {
    // 实例化每一个 svg 数组项对应的 Vivus 实例
    const instances = svgsData.map((_, i) => new Vivus(`logo-svg-${i}`, {
        pathTimingFunction: Vivus.EASE,
        animTimingFunction: Vivus.EASE,
        type: "delayed",
        start: "manual",
        duration: 25,
    }));

    // 初始化所有 SVG 的绘制进度为 0（隐藏）
    instances.forEach(vivus => vivus.setFrameProgress(0));

    while (true) {
        const vivus = instances[currentIndex.value];
        await play(vivus, SPEED_NOR);
        await sleep(3000);
        await play(vivus, -SPEED_REV);
        
        // 彻底复原后切换下一个图形
        vivus.setFrameProgress(0);
        await sleep(500);
        currentIndex.value = (currentIndex.value + 1) % svgsData.length;
    }
});

const isHover = ref(false);
</script>

<template>
    <div class="logo-wrapper" @mouseenter="isHover = true" @mouseleave="isHover = false">
        <RouterLink id="logo" to="/">
        <template v-for="(svg, idx) in svgsData" :key="idx">
            <svg
                :id="`logo-svg-${idx}`"
                v-show="currentIndex === idx"
                xmlns="http://www.w3.org/2000/svg"
                :viewBox="svg.viewBox"
            >
                <!-- 循环渲染属于该 SVG 的内容 -->
                <path 
                    v-for="(p, pIdx) in svg.paths" 
                    :key="pIdx"
                    :d="p" 
                    :style="{ strokeWidth: svg.strokeWidth }" 
                />
            </svg>
        </template>
        </RouterLink>
        <Transition name="drop">
            <div class="rain-btn" v-if="isHover" @click="toggleRain" title="Toggle Rain">
                <font-awesome-icon :icon="['fas', 'cloud-showers-heavy']" />
            </div>
        </Transition>
    </div>
</template>

<style scoped lang="stylus">
@import "../assets/css/global.styl";

$right = 40px;

.logo-wrapper
    dual(--display, flex, none);
    display: var(--display);
    flex-direction: column;
    align-items: center;
    position: fixed;
    top: 35px;
    left: "calc(100vw - %dpx - 50px - 16px)" % $right;
    z-index: 1000;

#logo
    scheme(--invert, 0.45, 0.7);
    scheme(--hover-invert, 0.15, 0.9);

    width: 50px;
    filter: invert(var(--invert));
    transition: filter 0.2s;

    &:hover
        filter: invert(var(--hover-invert));

    svg path, svg polygon, svg polyline
        fill: none;
        stroke: $text-color;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-linejoin: round;

.rain-btn
    scheme(--panel-background-color, alpha(white, 35%), alpha(#141414, 35%));
    scheme(--glass-specular, rgba(255,255,255,0.75), rgba(255,255,255,0.15));
    scheme(--glass-shadow, rgba(0,0,0,0.1), rgba(0,0,0,0.3));
    scheme(--text-col, $text-color, $text-color-d);
    
    position: absolute;
    top: 60px;
    z-index: 2; /* create a stacking context so ::before doesn't fall behind the page */
    cursor: pointer;
    color: var(--text-col);
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    
    background-color: transparent;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
        
    &::before
        content: '';
        position: absolute;
        inset: 0;
        z-index: -1;
        border-radius: inherit;
        background-color: var(--panel-background-color);
        backdrop-filter: blur(8px) saturate(150%);
        -webkit-backdrop-filter: blur(8px) saturate(150%);
        box-shadow: inset 1px 1px 0 var(--glass-specular), inset 0 0 5px var(--glass-specular), 0 4px 6px var(--glass-shadow);

.drop-enter-active,
.drop-leave-active
    transition: all 0.3s cubic-bezier(0.15, 0.79, 0.69, 0.68);

.drop-enter-from,
.drop-leave-to
    opacity: 0;
    transform: translateY(-10px);
</style>
