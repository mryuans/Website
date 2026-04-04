import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import vueDevTools from "vite-plugin-vue-devtools";
import vueXecadesNote from "vite-plugin-vue-xecades-note";
import autoprefixer from "autoprefixer";

const customElement = ["rb", "center"];

export default defineConfig({
    plugins: [
        // [@vitejs/plugin-vue]
        vue({
            template: {
                compilerOptions: {
                    isCustomElement: (tag) => customElement.includes(tag),
                },
            },
            include: [/\.vue$/],
        }),

        // [@vitejs/plugin-vue-jsx]
        vueJsx(),

        // [vite-plugin-vue-devtools]
        vueDevTools(),

        // [vite-plugin-vue-xecades-note]
        // @ts-ignore
        vueXecadesNote({ componentDir: "src/components/md" }),
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
            "@cache": fileURLToPath(new URL("./cache", import.meta.url)),
        },
    },
    css: {
        postcss: {
            plugins: [autoprefixer()],
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    // 3D 引擎 —— 仅首页 Hero 用到，配合 defineAsyncComponent 按需加载
                    if (id.includes("node_modules/three")) return "vendor-three";
                    if (id.includes("node_modules/gsap")) return "vendor-gsap";
                    // 数学公式渲染
                    if (id.includes("node_modules/katex")) return "vendor-katex";
                    // Markdown 解析器
                    if (id.includes("node_modules/markdown-it")) return "vendor-markdown";
                    // 搜索引擎
                    if (id.includes("node_modules/fuse.js")) return "vendor-fuse";
                },
            },
        },
    },
    server: {
        host: '0.0.0.0',
        allowedHosts: [
            '3ab72d4a.r22.cpolar.top'
        ]
    }
});

