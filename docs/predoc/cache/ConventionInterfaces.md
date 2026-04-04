---
title: 配置约束与约定
---

# :gear: 配置约束与设定常规 (Convention)

该系列配置约束集中声明于 `src/convention.ts`文件内，划定了从主文件目录树开始延伸而出至用户实际在书写博客和规划侧边栏时的规约底线。

::fold{title="文档头信息 (MarkdownFrontMatter)" expand info}
文章顶部通过 `---` 包含的一块 YAML 配置块，用以声明影响本篇阅读的基础配置及核心识别参数。
- `title: string`: 唯一识别名或正式的大标题（关联全站搜索引擎的首要抓取特征量）。
- `displayTitle?: string`: 此选填参数能在阅读界面以不同的文本展现（例如短语），绝不会因此遮盖系统级的主词条。
- `comment?: boolean`: 开关网页底部的交互评论服务。
- `timestamp?: boolean`: 控制界面各个角是否主动展示文章发布和重新编辑过的长篇幅时间印记。
::

::fold{title="主副导航源 (RawNavNode 与 RawConfig)" expand success}
对应于项目最外围文件树之下的 `/docs/config.yml` 配置体系。

:::grid{align=equal gapx=10px gapy=10px}
:sep{span=12}
::::fold{title="设置根包配置中心 (RawConfig)" warning always expand}
- `nav`: 定义为一个包含 `RawNavNode` 的极为广义、随时允许深度嵌套循环的灵活导航栏结构总集。
- `icon: Record<string, string>`: 定义每一类的大分组（如“编程理论”、“数学随笔”）所必须具备的独特单色渲染小徽标（例如定义为 `Misc: box_archive` 即指代盒子图标）。
::::
:sep{span=12}
::::fold{title="无限导航延伸接口 (RawNavNode)" always expand}
基于 `typescript` 的魔法，这一定义允许产生无限深度的嵌套结构声明 `Record<string, RawNavNode[] | string>`。
- 当识别结果值为 **字符串** 时，代表探底接触并匹配终端网页独立路径链接。
- 否则，顺延向内剖解层级形成扩展为一个子集结构深渊大数组，最后交由核心解析流程平铺转化生成标准的 `ul li` 展开式网页响应式树状菜单块群。
::::
:::
::
