---
title: Entry 关联的类型定义
---

# :flag: Entry 关联的类型定义

解析单篇 Markdown 的逻辑里大量使用了类型重命名，它们都在 `src/entry/index.ts` 下进行管理，严格规范了系统内外接口通讯。

::grid{align=equal gapx=10px gapy=20px}
:sep{span=12}
:::fold{title="核心别名 (Type Aliases)" info expand always}
- **`URL = \`/${string}\``:** 文件的虚拟映射路由路径（如 `/cs/index`）。
- **`Filename = string`:** 短文件名。
- **`Pathname = \`docs/${string}.md\``:** 原始磁盘位置路径。
- **`PostPathname = \`cache/posts/${string}.vue\``:** 生成至缓存编译区的 Vue 文件地址。
- **`PostImportPath = \`@cache/posts/${string}\``:** 供前端程序 `import()` 懒加载获取的快捷引入缩写。
- **`Type = "post" | "index" | "root" | "404"`:** 文章种类。
:::

:sep{span=12}
:::fold{title="依赖信息接口 (Dependency)" warning expand always}
用于描述一个外部资源依赖文件的信息：
- `src: string`: 用于供解析器直接 `@import` 获取的源路径。
- `id: string`: 唯一标识符，用以标记占位变量（如中间产生的 `tempID`）。
:::

:sep{span=12}
:::fold{title="异步容器 (Await)" success expand always}
描述必须以 `await` 等待的耗时逻辑：
- `target: () => Promise<string>`: 该异步回调返回一块有效的 TS 代码字符串。
- `id: string`: 唯一执行句柄。
:::

:sep{span=12}
:::fold{title="混合块 (Expression)" danger expand always}
存放由解析器等模块注入的一整块 Vue 组件格式代码片段：
- `content: string`: 内嵌的合法可解释 JSX/TSX 文本。
- `id: string`: 用于后续替换合并的变量定位符。
:::
::
