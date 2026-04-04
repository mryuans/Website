/* 
    管理vue内置的路由插件vue-router 随后就可以在内容里面使用<router-link>来代替站内的<a>超链接了
    这是一个逻辑组件，不需要有template渲染UI，所以只需要写一个index.ts文件来设置主配置就可以
*/

import routes from "@cache/routes"; // 从./cache读取routes文件的内容
import { createRouter, createWebHistory } from "vue-router";
import { assertType } from "@/assets/ts/types";

import type { RouteMeta } from "vite-plugin-vue-xecades-note";

// 创建一个路由
const router = createRouter({
    routes: routes,
    /* 
        这里规定了一个滚动行为，我们当前位置会被记录在saved这个变量里面
        前面第一个参数是to，第二个是from，但是由于我们不需要用到这个两个参数，想定义的页面跳转逻辑是对于任意页面跳转到任意页面都是适用的
        所以我们分别用_, __来置空这两个内容
        实际效果就是在跳转之后，返回刚刚这个页面的时候会回到跳转前用户处于的滚动条位置
    */
    scrollBehavior: (_, __, saved) => saved ?? { left: 0, top: 0 },
    history: createWebHistory(),
});

// 定义每次跳转之后执行的代码逻辑
router.afterEach((to, from) => {
    const meta = assertType<RouteMeta>(to.meta);
    if (meta.type === "root") document.title = "Personal Doc";
    else document.title = `${meta.attr.title} | Personal Doc`;
});

export default router;
