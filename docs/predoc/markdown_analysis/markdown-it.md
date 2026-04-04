---
title: markdown-it
comment: false
---

本文将简略介绍本框架使用的markdown解析器，markdown-it与本框架中对于markdown-it的包装和设定以及后续给出的插件包装组件

::fold{title="*About markdown-it*" expand always info}
:::linkcard{href="https://github.com/markdown-it/markdown-it"}
Github of markdown-it
:::
::

## Parsing and Rendering 
markdown-it在整个解析阶段分为两个部分，第一个是parse，获得类似json的包含token的文件，第二个是Render，将第一部分获得的内容渲染成html

### Parse 解析

这个阶段分为三个规则，第一部分是Block规则，识别**大结构**，这里的大结构可以包括标题级别，代码块，数学表达式块等：
::grid{align=equal gapx=10px gapy=20px}
:sep{span=24}
:::fold{title="*Hello world* example" info expand}
```markdown
# Hello **World** // 整一个结构而不关注加粗逻辑
```
:::
:sep{span=24}
:::fold{title="Output in block level" expand success}
```json
[
  {
    "type": "heading_open",
    "tag": "h1",
    "nesting": 1,      // 1 代表开始标签
    "level": 0,
    "markup": "#"
  },
  {
    "type": "inline",
    ...
  },
  {
    "type": "heading_close",
    "tag": "h1",
    "nesting": -1      // -1 代表闭合标签
  }
]
```
:::
::
这里需要注意的是block级别的解析会将最外层的部分理解成一层open，一层close，然后理解到里面一堆的inline内容，然后生成上面的扁平式数据结构

第二部分是Inline规则，识别行内的结构:
::fold{title="Output in inline level" expand success}
```json
{
    "type": "inline",
    "tag": "",
    "nesting": 0,      // 0 代表内容节点
    "level": 1,
    "content": "Hello **World**", // 注意：这时候还没解析加粗
    "children": [      // 这是 Inline 阶段生成的子 Token
       { "type": "text", "content": "Hello " },
       { "type": "strong_open", "tag": "strong", "nesting": 1 },
       { "type": "text", "content": "World" },
       { "type": "strong_close", "tag": "strong", "nesting": -1 }
    ]
  },
```
::

第三部分是Core规则，在前两个阶段结束之后，利用已经生成的数据结构来方便地遍历，调用里面的一些数据生成toc之类的内容

### Rendering

以上面那个Parse结束的内容为例子，这种解析结束的数据会利用render的部分生产一个伪HTML字符串，然后传入一些复杂的处理逻辑，如vue项目里，就是会传入vue的template标签内部，进行进一步的渲染：
::fold{title="Render Example" success expand}
```html
<h1> 
    Hello <strong>World</strong>
</h1>
```
::

通过这样一个简单的例子我们能够理解markdown-it的解析与渲染逻辑，接下来我们看看项目是如何处理markdown自定义标签的

## Handling logic
回到项目本身，我们看到插件内部存在md文件夹包含了我们所有解析md文件的逻辑（其实是一部分，因为另一部分在vue的组件内部）
::fold{title="md/index.js" info expand}
```ts
import MarkdownIt from "markdown-it";

import codeBlock from "./plugins/code-block";
import codeInline from "./plugins/code-inline";
import math from "./plugins/math";
import icon from "./plugins/icon";
import link from "./plugins/link";
import heading from "./plugins/heading";
import image from "./plugins/image";
import checkbox from "./plugins/checkbox";
import mdc from "./plugins/mdc";
import delim from "./plugins/delim";
import tags from "./plugins/tags";
import cjk from "./plugins/cjk";
import attrs from "./plugins/attrs";

/**
 * Get a markdown-it instance.
 *
 * @returns MarkdownIt instance
 */
export default (): MarkdownIt => {
    /**
     * MarkdownIt Configurations
     *
     * @see https://markdown-it.github.io/markdown-it/#MarkdownIt.new
     */
    const md = new MarkdownIt({
        html: true,
        typographer: true,
        xhtmlOut: true,
    });

    md.use(codeBlock);
    md.use(codeInline);
    md.use(math);
    md.use(icon);
    md.use(link);
    md.use(heading);
    md.use(image);
    md.use(checkbox);
    md.use(mdc);
    md.use(delim);
    md.use(tags);
    md.use(cjk);
    md.use(attrs);

    // console.log(md.core.ruler.__rules__.map((r) => r.name));
    // console.log(md.inline.ruler.__rules__.map((r) => r.name));

    return md;
};
```
::
markdown-it插件的逻辑一般是这样的：
对外界给出一个index.js，在这个index.js里面实现markdown实例，然后在另一个位置定义一个markdown-it-wrapper，用于定义通用的包装接口，然后再由其他的插件与工具来调用这个包装的接口，再由最初定义的index.js来`use`这个插件逻辑，于是完成调用，我们可以这个util的调用链：
::grid{align=exqual gapx=10px gapy=20y}
:sep{span=24}
:::fold{title="util/index.js" expand info}
```ts
import type { RenderRule } from "markdown-it/lib/renderer.mjs";
import type Token from "markdown-it/lib/token.mjs";

/** The default token renderer. */
export const defaultRenderer: RenderRule = (tokens, idx, options, env, self) =>
    self.renderToken(tokens, idx, options);

/**
 * Remove attribute on token.
 *
 * @param token - Token
 * @param name - Attribute name
 */
export const removeAttr = (token: Token, name: string) => {
    let idx = token.attrIndex(name);
    if (idx !== -1) {
        token.attrs!.splice(idx, 1);
    }
};

/** Supported color themes. */
export const THEMES: string[] = [
    "default",
    "success",
    "info",
    "warning",
    "danger",
];

export { default as typst } from "./typst";
export { default as extractText } from "../../entry/text";
export { default as MarkdownItWrapper } from "../markdown-it-wrapper";

```
:::
:sep{span=24}
:::fold{title="markdwon-it-wrapper/index.js" expand info}
```ts
/**
 * Processes syntax like <marker>text<marker>.
 *
 * @param md - MarkdownIt instance
 * @param options - Options
 */
export default (md: MarkdownIt, args: MarkdownItWrapperOptions) => {
    if (args.type === "inline") {
        // Inline syntax
        md.inline.ruler.after("escape", args.name, inline_rule_with(args));
        //
    } else if (args.type === "block") {
        // Block syntax
        md.block.ruler.after("blockquote", args.name, block_rule_with(args), {
            alt: ["paragraph", "reference", "blockquote", "list"],
        });
        //
    }

    const renderer: RenderRule = (tokens, idx, options, env, self) =>
        args.renderer(tokens[idx], env);

    md.renderer.rules[args.name] = renderer;
};
```
:::
::
实质上的逻辑就是设计一个截停的规则，一旦读到某一个逻辑，markdown-it会截停然后按照定义的规则去解析它，生成供vue解析的例子，我们选取两个例子，第一个是完全定义在markdown-it内部的插件性质规则，另一个是利用mdc.ts将逻辑转接给vue组件处理的例子

### Markdown-it plugin Example

例如我们看这个**`icon.ts`**的处理逻辑：
::fold{title="icon.ts" expand info}
```ts
import { Token } from "markdown-it";
import MarkdownItWrapper from "../markdown-it-wrapper";

import type MarkdownIt from "markdown-it";

/**
 * Transform `:...:` into FontAwesome components.
 *
 *  - `:flag:` => `<font-awesome-icon class="icon" icon="fa-solid fa-flag" />`
 *  - `:user.r:` => `<font-awesome-icon class="icon" icon="fa-regular fa-user" />`
 *  - `:github.b:` => `<font-awesome-icon class="icon" icon="fa-brands fa-github" />`
 *
 * @param md - MarkdownIt instance
 */
export default (md: MarkdownIt) => {
    md.use(MarkdownItWrapper, {
        type: "inline",
        name: "icon_inline",
        marker: ":",
        renderer: (token: Token) => {
            let cls = token.attrGet("class");
            let id = token.attrGet("id");
            cls = cls ? " " + cls : "";
            id = id ? ` id="${id}"` : "";

            const [icon, style] = token.content.split(".");
            const type =
                style === "r" ? "regular" : style === "b" ? "brands" : "solid";
            return `<font-awesome-icon${id} class="icon${cls}" icon="fa-${type} fa-${icon}" />`;
        },
    });
};
```
::
type属性告诉我们应该在哪一个解析阶段来考虑这一部分逻辑，这里的inline就是上面提到的行内处理阶段，name属性主要是用于内部标记处理对应内容，而检测的标志是**`:`**，一旦检测到这个部分，解析器会开始读取接下来的内容直到读到下一个**`:`**，然后对于内部的内容进行处理，例如这里的处理逻辑就是如果给出一个`.r`选项，就会插入fontawesome里面的regular模式图标，然后这最后会返回一个html字符串

我们再给出别的例子，例如并非使用我们自己设计的wrapper的逻辑，使用一些现成的，直接处理inline或者block解析阶段逻辑的代码：

::fold{title="/link"}
```ts
// @ts-ignore
import MarkdownItForInline from "markdown-it-for-inline";

import type MarkdownIt from "markdown-it";
import type Token from "markdown-it/lib/token.mjs";

/**
 * Transform `<a>` into `Anchor` component.
 *
 * @param md - MarkdownIt instance
 */
export default (md: MarkdownIt) => {
    /**
     * @name markdown-it-for-inline
     * @see https://github.com/markdown-it/markdown-it-for-inline
     */

    md.use(
        MarkdownItForInline,
        "vueify_anchor_open",
        "link_open",
        (tokens: Token[], idx: number) => {
            tokens[idx].tag = "Anchor";
        }
    );

    md.use(
        MarkdownItForInline,
        "vueify_anchor_close",
        "link_close",
        (tokens: Token[], idx: number) => {
            tokens[idx].tag = "Anchor";
        }
    );
};
```
::
这里就是利用了inline的第三方处理的库，由于我们写的**`[]()`**在原声的inline分析之后会被解析成`link_open`，`text`，`link_close`三个部分，然后这里就根据这个type去分别处理，这里就是将`<a></a>`标签改成`<anchor></anchor>`，为了给vue组件使用。

### Vue component handling Example

本框架使用**[markdown-it-mdc](https://github.com/comarkdown/markdown-it-comark?tab=readme-ov-file)**来处理大部分需要使用vue component的内容，然后使用一个`mdc.ts`的插件来处理传入的参数，主要的目的就是将传入的参数转化为vue使用的`v-bind`变量

::fold{title="*About mdc*" expand always info}
**MDC(Markdown component):** 
> :::quote
>We created the MDC syntax to supercharge Markdown and give you the ability to integrate Vue components with slots and props inside your Markdown.
> [Reference](https://content.nuxt.com/docs/files/markdown#mdc-syntax)
>:::
MDC为markdown提供了一个跟vue component联动的机会，需要符合一个MDC syntax规范，简单来讲，有这三个规则：
- 使用`::`作为统一调用的提示mark
- 在tag后加上`{}`来传递属性(Attributes)或者是参数(props)
- 如果有分层逻辑的话，就顺位加上`:`来表示层级
这里需要注意的是，mdc syntax里面有三种类型的组件：
- 行内组件(inline) 需要前后`:`封口
- 块级别容器(block) 在内部添加内容之后，需要用`:`封口
- 块级别简写(block shorten) 在内部不需要添加内容，不需要`:`封口
::

了解了以上基础之后，我们看看mdc.ts的处理:
::fold{title="mdc.ts" expand info}
```ts
/**
 * Transform MDC components.
 *
 * @param md - MarkdownIt instance
 */
export default (md: MarkdownIt) => {
    /**
     * @name markdown-it-mdc
     * @see https://github.com/antfu/markdown-it-mdc
     */

    md.use(MarkdownItMdc, {
        syntax: { inlineSpan: false, inlineProps: false },
    });

    const originalMdcBlockOpen =
        md.renderer.rules.mdc_block_open || defaultRenderer;
    const originalMdcBlockShorthand =
        md.renderer.rules.mdc_block_shorthand || defaultRenderer;

    md.renderer.rules.mdc_block_open = (
        tokens,
        idx,
        options,
        env: MarkdownItEnv,
        self
    ) => {
        const token = tokens[idx];

        convertToAttribute(token, { fold: THEMES, note: THEMES });
        convertToJsx(token, md, env, { fold: ["title"] });
        convertToBoolean(token, { fold: ["always", "expand"] });

        return originalMdcBlockOpen(tokens, idx, options, env, self);
    };

    md.renderer.rules.mdc_block_shorthand = (
        tokens,
        idx,
        options,
        env: MarkdownItEnv,
        self
    ) => {
        const token = tokens[idx];

        convertShorthand(token, env);

        return originalMdcBlockShorthand(tokens, idx, options, env, self);
    };
};
```
::
这里可能看不到的点在于，在解析markdown文件的时候，如果看到`::`会直接由这里使用的`use(MarkdownItMdc)`进行处理，同时分级逻辑也会进行处理，然后渲染成我们熟悉的样子：
::fold{title="Output" expand success}
```html
<grid align=equal gapx=10px gapy=20px>
    ...
</grid>
```
::
需要注意的是这里还没有讲传入的变量处理完毕，需要mdc.ts的处理：
::fold{title="processing" expand info}
```ts
    targets: Targets
) => {
    if (targets[token.info]) {
        let attrs = targets[token.info];

        for (let attr of attrs) {
            if (token.attrGet(attr)) {
                let code = token.attrGet(attr) || "";
                let content = md
                    .renderInline(code, { entry: env.entry, tsx: true })
                    .trim();
                let id = env.entry.expr("<>" + content + "</>");

                token.attrSet(":" + attr, id);
                removeAttr(token, attr);
            }
        }
    }
};
```
::
这样就转变为`v-bind`变量，但是实际上mdc.ts中还有一些其他的内容，但是并非最关键的部分，这里不多赘述

另外一个值得注意的是，我们整个项目里面存在两种mardown的组件，一种是可以直接通过定义一些专门的css样式标注就可，例如quote等，它们会简单在tags.ts里面修改成`<div>`或者`<span>`标签，附上特定的class属性然后使用对应的css样式渲染

另一种则是使用vue的组件，这种类型一般需要相对复杂的ui交互或者排版，这种情况会在tags.ts里面使用驼峰命名规范来改写成vue能读懂的格式，例如`<fold> => <Fold>，<dot-pattern> => <DotPattern>`

然后这些完整的内容会交由别的接口进行进一步的加工