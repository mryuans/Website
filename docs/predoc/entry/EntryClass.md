---
title: Entry 核心类详解
---

# :flask: Entry 核心类详解

在框架底层，每一个独立的 Markdown 文件都会被抽象为实例化、对象化的 `Entry` 类。`Entry` 承担了数据容器与懒加载编译的双重责任，是系统预处理与增量更新中最重要的数据结构。

::fold{title="概念：延迟加载 (Lazy Execution)" info expand}
`Entry` 定义于 `src/entry/index.ts` 中，它的设计具有高度的"延迟加载"特性。如果没有组件试图读取如 `html` 或 `text`，其内部的解构与转换计算便不会被执行。
::

::tab
# :box_archive: 核心属性 (Properties)

:::grid{align=equal gapy=20px}
:sep{span=24}
::::fold{title="基础只读属性" success expand}
- `pathname: Pathname`: Markdown 文件的相对路径（例如 `"docs/cs/ads/avl-tree.md"`）。
- `time: { created: string; updated: string }`: 文件的底层创建与修改时间字符串。
- `mtime: number`: 增量编译最核心的依据。文件最后修改的时间戳。
- `toc: MarkdownHeader[]`: 存放文章各个级别标题的自动生成的章节目录。
::::
:sep{span=24}
::::fold{title="占位与拦截组件数据" warning expand}
- `dependencies: Dependency[]`: 保存需预先编译的依赖项（如内置图片资源），避免直接暴露文件原始路径。
- `awaits: Await[]`: 存放必须在编译至 Vue 组件 `setup` 阶段执行的异步 Promise（如获取外链图片尺寸）。
- `expressions: Expression[]`: 用于执行和注入包含逻辑的 TSX 动态代码段。
::::
:sep{span=24}
::::fold{title="计算属性 Getter" info expand}
- `raw: string`: 从文件系统直接读取的纯文本。
- `front_matter: MarkdownFrontMatter`: 顶部由 `---` 包围的数据字典。
- `markdown: string`: 剥离了 Front Matter 后的纯正文。
- `tokens: Token[]`: 经由 `markdown-it` 解析后的底层排版积木块。
- `html: string`: 最终被渲染成的完整 Vue / HTML 代码字符串。
- `text: string`: 过滤一切排版代码后的纯净文本，直供搜索大纲使用。
::::
:::

# :code: 方法定义 (Methods)

- `updateTime()`: 异步获取文件底层的时间数据，并赋给 `mtime`。
- `require(content, ext)` / `use(src)`: 注册外部依赖或是资源文件，返回临时注册 ID 以生成合并 `import` 语句。
- `await(promise)`: 注册能在最终 Vue 组件启动时被外壳执行的异步阻塞逻辑代码段。
- `expr(content)`: 插入内嵌自定义 TSX/JSX 代码逻辑，交由系统统一转化。
- `resetCache()`: 在释放内存或进行 Web 框架的热更新（HMR）时，强行清空之前所有的 `_html`、`_tokens` 缓存，逼迫系统强制执行一次重新编译计算操作。
::
