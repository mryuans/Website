---
title: Cache 全局路由结构
---

# :database: Cache 全局接口结构

主要定义和存储在 `src/global.ts` 中，控制全局导航树、搜索检索格式、Vue 路由记录元信息的结构规范。

::fold{title="导航节点 (NavNode)" info expand}
系统读取完根目录的设置后会解析出一层层的树形导航 `Config.nav`：
- `title: string`: 导航块头部的大写名称。
- `name: string`: 导航块实际的 URL 缩句（如 `cs` 代表 Computer Science）。
- `link: URL`: 该层目录的具体绝对路径 `URL`（如 `/math/linear-algebra`）。
- `children: NavNode[]`: 该节点内部的下拉子集树。
::

::fold{title="检索目标 (SearchTarget)" success expand}
为 `fuse.js` 创建带有逆向索引特征的搜索池对象：
- `title: string`: 文件主标题。
- `content: string`: 过滤后高度浓缩的文章主干长文本。
- `link: URL`: 点进结果后的跳转定向路径目标。
- `is_index: boolean`: 区分当前页属性是否属于父级主目录索引。
- `created: string`: 提供排序、筛选用的生成时间长字符串。
::

::fold{title="Vue 的扩展路由 (RouteMeta / CachedRouteRecord)" warning expand}
动态加载路由 `routes.tsx` 页面组装时所注入的扩展元字段：
- `pathname: Pathname`: 给到后台直接寻址源文件的映射记录。
- `category: string`: 在系统文件树上划归归属的大类。
- `attr: MarkdownFrontMatter`: 保留最上层最原始的 Front Matter 数据字典结构。
- `toc: MarkdownHeaderJsx[]`: 悬浮右侧栏目的自动渲染树组件集。
- `breadcrumb: { title: string; link: URL }[]`: 在该篇文章内供展示的面包屑导航列表。
- `updated` & `created`: 创建与翻新时效。

:::quote
此数据结构在最外层继承了官方原生的 `RouteRecordSingleView` 借口后，合并生成为 `CachedRouteRecord` 字典强行包裹这套扩展的 `RouteMeta`。
:::
::
