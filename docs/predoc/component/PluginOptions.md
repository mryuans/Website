---
title: Vite 插件配置选项 (Plugin Options)
---

# :wrench: Vite 插件选项配置 (Option Interface)

在项目的根节点之下的构建控制中心文件 `vite.config.js` 内部或者用于搭建服务端热更服务的单向进程加载池之中，我们将通过暴露的全局设定选项将它注入并在最内层的暴露实例化类中启动这一全套服务：

::fold{title="基础接口" info expand always}
```typescript
// 定义在 vite-plugin-vue-xecades-note/src/global.ts
export interface NotePluginOptions {
    /** 注入存放所有的自定义 Markdown UI 组件目录相对路径 */
    componentDir: string;
    /** 可选设定当前被实例化的自定义外壳插件的系统别称 */
    pluginName?: string;
}
```
::

::grid{align=equal gapx=10px}
:sep{span=12}
:::fold{title="库路径 (componentDir)" success expand always}
这是一个在底层不可或缺必须绝对制定的强制指向的来源储备地址锚点定位参数声明记录！也是整个外围框架寻找编写的具有丰富功能的第三方组件代码包堆栈所放处（比如项目中名为 `CustomAlert.vue` 或者具有更高阶属性功能的其它界面模块代码等等）。

在此系统的实际配置内一般其为：`src/components/md`。当底层流水线作业识别遇到特殊的未记载过的标识节点标签解构无法兼容的语句体时，只要它处于这一目录下面，那么依托基于此构建的一系列 `import()` 环境指令生成机制引擎器就会立即将其当成组件加入到整体加载呈现堆栈之中参与全过程的显示！
:::
:sep{span=12}
:::fold{title="系统别名定义 (pluginName)" warning expand always}
此非必须赋值的强行性命名改写支持让所有运行在这个引擎下的多独立实例存在着**独立平行双开机制安全隔离体系系统**的基础。

假若存在有必须要在此套程序底层上运转有很大差别的其他类型博客文件结构的话，如果能给每个运行域提供赋以此截然不同的系统唯一编号或者是新全称标记名字即可！最终在内部缓存生成的管理标识管理操作和处理依赖包捆绑装配引用路径绑定识别处理全阶段里所有的动作它皆将会各自完全地相互无冲突化地区别分别独立地平铺工作下去以此成功杜绝各类运行组件模块产生同名以及重写造成相互干扰所形成的难以觉察到或复现缓存交叉以及触发渲染更新热崩溃等问题现象出现！
:::
::
