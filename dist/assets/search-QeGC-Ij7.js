import{F as e}from"./vendor-fuse-Dw8P0qyA.js";const o={keys:[{path:["title"],id:"title",weight:1,src:"title",getFn:null},{path:["content"],id:"content",weight:1,src:"content",getFn:null}],records:[{i:0,$:{0:{v:"markdown-it",n:1},1:{v:`本文将简略介绍本框架使用的markdown解析器，markdown-it与本框架中对于markdown-it的包装和设定以及后续给出的插件包装组件
Github of markdown-it
Parsing and Rendering
markdown-it在整个解析阶段分为两个部分，第一个是parse，获得类似json的包含token的文件，第二个是Render，将第一部分获得的内容渲染成html
Parse 解析
这个阶段分为三个规则，第一部分是Block规则，识别大结构，这里的大结构可以包括标题级别，代码块，数学表达式块等：
# Hello **World** // 整一个结构而不关注加粗逻辑

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

这里需要注意的是block级别的解析会将最外层的部分理解成一层open，一层close，然后理解到里面一堆的inline内容，然后生成上面的扁平式数据结构
第二部分是Inline规则，识别行内的结构:
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

第三部分是Core规则，在前两个阶段结束之后，利用已经生成的数据结构来方便地遍历，调用里面的一些数据生成toc之类的内容
Rendering
以上面那个Parse结束的内容为例子，这种解析结束的数据会利用render的部分生产一个伪HTML字符串，然后传入一些复杂的处理逻辑，如vue项目里，就是会传入vue的template标签内部，进行进一步的渲染：
<h1> 
    Hello <strong>World</strong>
</h1>

通过这样一个简单的例子我们能够理解markdown-it的解析与渲染逻辑，接下来我们看看项目是如何处理markdown自定义标签的
Handling logic
回到项目本身，我们看到插件内部存在md文件夹包含了我们所有解析md文件的逻辑（其实是一部分，因为另一部分在vue的组件内部）
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

markdown-it插件的逻辑一般是这样的： 对外界给出一个index.js，在这个index.js里面实现markdown实例，然后在另一个位置定义一个markdown-it-wrapper，用于定义通用的包装接口，然后再由其他的插件与工具来调用这个包装的接口，再由最初定义的index.js来use这个插件逻辑，于是完成调用，我们可以这个util的调用链：
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

实质上的逻辑就是设计一个截停的规则，一旦读到某一个逻辑，markdown-it会截停然后按照定义的规则去解析它，生成供vue解析的例子，我们选取两个例子，第一个是完全定义在markdown-it内部的插件性质规则，另一个是利用mdc.ts将逻辑转接给vue组件处理的例子
Markdown-it plugin Example
例如我们看这个icon.ts的处理逻辑：
import { Token } from "markdown-it";
import MarkdownItWrapper from "../markdown-it-wrapper";

import type MarkdownIt from "markdown-it";

/**
 * Transform \`:...:\` into FontAwesome components.
 *
 *  - \`:flag:\` => \`<font-awesome-icon class="icon" icon="fa-solid fa-flag" />\`
 *  - \`:user.r:\` => \`<font-awesome-icon class="icon" icon="fa-regular fa-user" />\`
 *  - \`:github.b:\` => \`<font-awesome-icon class="icon" icon="fa-brands fa-github" />\`
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
            id = id ? \` id="\${id}"\` : "";

            const [icon, style] = token.content.split(".");
            const type =
                style === "r" ? "regular" : style === "b" ? "brands" : "solid";
            return \`<font-awesome-icon\${id} class="icon\${cls}" icon="fa-\${type} fa-\${icon}" />\`;
        },
    });
};

type属性告诉我们应该在哪一个解析阶段来考虑这一部分逻辑，这里的inline就是上面提到的行内处理阶段，name属性主要是用于内部标记处理对应内容，而检测的标志是:，一旦检测到这个部分，解析器会开始读取接下来的内容直到读到下一个:，然后对于内部的内容进行处理，例如这里的处理逻辑就是如果给出一个.r选项，就会插入fontawesome里面的regular模式图标，然后这最后会返回一个html字符串
我们再给出别的例子，例如并非使用我们自己设计的wrapper的逻辑，使用一些现成的，直接处理inline或者block解析阶段逻辑的代码：
// @ts-ignore
import MarkdownItForInline from "markdown-it-for-inline";

import type MarkdownIt from "markdown-it";
import type Token from "markdown-it/lib/token.mjs";

/**
 * Transform \`<a>\` into \`Anchor\` component.
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

这里就是利用了inline的第三方处理的库，由于我们写的[]()在原声的inline分析之后会被解析成link_open，text，link_close三个部分，然后这里就根据这个type去分别处理，这里就是将<a></a>标签改成<anchor></anchor>，为了给vue组件使用。
Vue component handling Example
本框架使用markdown-it-mdc来处理大部分需要使用vue component的内容，然后使用一个mdc.ts的插件来处理传入的参数，主要的目的就是将传入的参数转化为vue使用的v-bind变量
MDC(Markdown component):
We created the MDC syntax to supercharge Markdown and give you the ability to integrate Vue components with slots and props inside your Markdown. Reference

MDC为markdown提供了一个跟vue component联动的机会，需要符合一个MDC syntax规范，简单来讲，有这三个规则：
使用::作为统一调用的提示mark

在tag后加上{}来传递属性(Attributes)或者是参数(props)

如果有分层逻辑的话，就顺位加上:来表示层级 这里需要注意的是，mdc syntax里面有三种类型的组件：

行内组件(inline) 需要前后:封口

块级别容器(block) 在内部添加内容之后，需要用:封口

块级别简写(block shorten) 在内部不需要添加内容，不需要:封口


了解了以上基础之后，我们看看mdc.ts的处理:
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

这里可能看不到的点在于，在解析markdown文件的时候，如果看到::会直接由这里使用的use(MarkdownItMdc)进行处理，同时分级逻辑也会进行处理，然后渲染成我们熟悉的样子：
<grid align=equal gapx=10px gapy=20px>
    ...
</grid>

需要注意的是这里还没有讲传入的变量处理完毕，需要mdc.ts的处理：
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

这样就转变为v-bind变量，但是实际上mdc.ts中还有一些其他的内容，但是并非最关键的部分，这里不多赘述
另外一个值得注意的是，我们整个项目里面存在两种mardown的组件，一种是可以直接通过定义一些专门的css样式标注就可，例如quote等，它们会简单在tags.ts里面修改成<div>或者<span>标签，附上特定的class属性然后使用对应的css样式渲染
另一种则是使用vue的组件，这种类型一般需要相对复杂的ui交互或者排版，这种情况会在tags.ts里面使用驼峰命名规范来改写成vue能读懂的格式，例如<fold> => <Fold>，<dot-pattern> => <DotPattern>
然后这些完整的内容会交由别的接口进行进一步的加工
`,n:.036}}},{i:1,$:{0:{v:"markdown_analysis",n:1}}},{i:2,$:{0:{v:"Markdown 词法分析 (Tokens)",n:.577},1:{v:` Markdown 词法与环境结构分析这些接口与属性共同定义在处于中央调度地位的 src/global.ts，为 Markdown-it 这个超轻量的核心转换引擎进行底层干预提供了非常强有力的定制级强结构挂载依据。它们使得诸如数学公式段落渲染、勾选控件识别及替换以及各类混合语言的代码块排版任务，在剥除传统状态的同时可以被彻底解耦进行微操管理。
 数据分析提取结构承担了系统区分拦截被 YAML 分界符 --- 所包围阻绝断开的头部描述块字典记录（front_matter），以及那些并未曾接受下流底层解析动作染洗处理过的完全纯正的文章主体数据载荷（markdown 的本源文本内容片段保留）。并在适当的生命周期抛出这些快照供各方提取查阅。
由于我们需要基于鼠标快速的跳转导航系统完成页面快速锚点，系统在剥除全套段落与纯文字前专门设置了用于截获拦截由 # 堆砌的所有的级联标题数据抓取探针模块并产出对应的高维标识体系记录栈：
基础脱水骨架 (MarkdownHeader): 主要包含纯长字符串的章节呈现标题文字主体内容、用表示深度级别从属层级的 level 数字定义以及在执行跳转后于页面顶端地址出现的经过清洗的 hash 重定向锚点。

高维可视化组件结构形态化升级特征结构表列册项记录体(MarkdownHeaderJsx): 借由此变招，系统抛弃落后低端的 String 文字链并容纳那些能够提供极为精致视觉感官上的小图标或是全自动数学交互组件模块嵌入等支持。其 title 等级直接跨维替代晋升为了系统级别底层的 JSX.Element 原生格式，借此实现超维的视觉传达和高自定义空间。


 全局指针指代环境基于 token 处理及还原本质实际上等同一个不透明及纯黑洞特性的黑盒转换流水线，框架创造出这套绝无仅有的拥有强引用的运行期对象代理结构。通过跨域层级的强制注入，每个独立开发的第三方小插件渲染流程也均可在运行时直接读取反射找回并重连“属于其自己的原本当前博文对象全尺寸上下文环境指针记录”。
entry: Entry: 以高维性质的封装闭包直接且永久缓存保留了一份针对本篇文章系统解析执行包装控制对象的长时期稳定有效全权指针引用控制通道，可以在一切特殊情况越级调用系统环境的异步或者执行钩子变量的存取。

tsx: boolean: 这个非常简洁但举足轻重的底层全局开关参数结构体控制标识了系统渲染模式机制环境能否以及是否正在基于使用能够顺畅兼容并混搭出强功能支持性质下包含多种交互并抛弃了落伍老一套仅仅只有堆砌起纯老式字符串作为返回结果输出这种枯燥套路的规范的规则控制通道。也就是直接向内部开启转化通道可以输出附带有复杂内务逻辑机制事件绑定的极点结构特性并利用 Vue 具有强扩展表现力的 <> <span onclick=\\"\\"> 数据包装重用特性！


`,n:.16}}},{i:3,$:{0:{v:"predoc",n:1}}},{i:4,$:{0:{v:"Entry Main",n:.707},1:{v:`本文将着重介绍插件中的enrty类
##类属性
`,n:1}}},{i:5,$:{0:{v:"Entry class",n:.707}}},{i:6,$:{0:{v:"Entry 关联的类型定义",n:.707},1:{v:` Entry 关联的类型定义解析单篇 Markdown 的逻辑里大量使用了类型重命名，它们都在 src/entry/index.ts 下进行管理，严格规范了系统内外接口通讯。
**URL = \\/\${string}\`:** 文件的虚拟映射路由路径（如 /cs/index\`）。

Filename = string: 短文件名。

Pathname = \\docs/\${string}.md\`\`: 原始磁盘位置路径。

PostPathname = \\cache/posts/\${string}.vue\`\`: 生成至缓存编译区的 Vue 文件地址。

**PostImportPath = \\@cache/posts/\${string}\`:** 供前端程序 import()\` 懒加载获取的快捷引入缩写。

Type = "post" | "index" | "root" | "404": 文章种类。


用于描述一个外部资源依赖文件的信息：
src: string: 用于供解析器直接 @import 获取的源路径。

id: string: 唯一标识符，用以标记占位变量（如中间产生的 tempID）。


描述必须以 await 等待的耗时逻辑：
target: () => Promise<string>: 该异步回调返回一块有效的 TS 代码字符串。

id: string: 唯一执行句柄。


存放由解析器等模块注入的一整块 Vue 组件格式代码片段：
content: string: 内嵌的合法可解释 JSX/TSX 文本。

id: string: 用于后续替换合并的变量定位符。


`,n:.129}}},{i:7,$:{0:{v:"Entry 核心类详解",n:.707},1:{v:` Entry 核心类详解在框架底层，每一个独立的 Markdown 文件都会被抽象为实例化、对象化的 Entry 类。Entry 承担了数据容器与懒加载编译的双重责任，是系统预处理与增量更新中最重要的数据结构。
Entry 定义于 src/entry/index.ts 中，它的设计具有高度的"延迟加载"特性。如果没有组件试图读取如 html 或 text，其内部的解构与转换计算便不会被执行。
 核心属性 (Properties)pathname: Pathname: Markdown 文件的相对路径（例如 "docs/cs/ads/avl-tree.md"）。

time: { created: string; updated: string }: 文件的底层创建与修改时间字符串。

mtime: number: 增量编译最核心的依据。文件最后修改的时间戳。

toc: MarkdownHeader[]: 存放文章各个级别标题的自动生成的章节目录。


dependencies: Dependency[]: 保存需预先编译的依赖项（如内置图片资源），避免直接暴露文件原始路径。

awaits: Await[]: 存放必须在编译至 Vue 组件 setup 阶段执行的异步 Promise（如获取外链图片尺寸）。

expressions: Expression[]: 用于执行和注入包含逻辑的 TSX 动态代码段。


raw: string: 从文件系统直接读取的纯文本。

front_matter: MarkdownFrontMatter: 顶部由 --- 包围的数据字典。

markdown: string: 剥离了 Front Matter 后的纯正文。

tokens: Token[]: 经由 markdown-it 解析后的底层排版积木块。

html: string: 最终被渲染成的完整 Vue / HTML 代码字符串。

text: string: 过滤一切排版代码后的纯净文本，直供搜索大纲使用。


 方法定义 (Methods)updateTime(): 异步获取文件底层的时间数据，并赋给 mtime。

require(content, ext) / use(src): 注册外部依赖或是资源文件，返回临时注册 ID 以生成合并 import 语句。

await(promise): 注册能在最终 Vue 组件启动时被外壳执行的异步阻塞逻辑代码段。

expr(content): 插入内嵌自定义 TSX/JSX 代码逻辑，交由系统统一转化。

resetCache(): 在释放内存或进行 Web 框架的热更新（HMR）时，强行清空之前所有的 _html、_tokens 缓存，逼迫系统强制执行一次重新编译计算操作。


`,n:.106}}},{i:8,$:{0:{v:"temp",n:1}}},{i:9,$:{0:{v:"component",n:1}}},{i:10,$:{0:{v:"Vite 插件配置选项 (Plugin Options)",n:.5},1:{v:` Vite 插件选项配置 (Option Interface)在项目的根节点之下的构建控制中心文件 vite.config.js 内部或者用于搭建服务端热更服务的单向进程加载池之中，我们将通过暴露的全局设定选项将它注入并在最内层的暴露实例化类中启动这一全套服务：
// 定义在 vite-plugin-vue-xecades-note/src/global.ts
export interface NotePluginOptions {
    /** 注入存放所有的自定义 Markdown UI 组件目录相对路径 */
    componentDir: string;
    /** 可选设定当前被实例化的自定义外壳插件的系统别称 */
    pluginName?: string;
}

这是一个在底层不可或缺必须绝对制定的强制指向的来源储备地址锚点定位参数声明记录！也是整个外围框架寻找编写的具有丰富功能的第三方组件代码包堆栈所放处（比如项目中名为 CustomAlert.vue 或者具有更高阶属性功能的其它界面模块代码等等）。
在此系统的实际配置内一般其为：src/components/md。当底层流水线作业识别遇到特殊的未记载过的标识节点标签解构无法兼容的语句体时，只要它处于这一目录下面，那么依托基于此构建的一系列 import() 环境指令生成机制引擎器就会立即将其当成组件加入到整体加载呈现堆栈之中参与全过程的显示！
此非必须赋值的强行性命名改写支持让所有运行在这个引擎下的多独立实例存在着独立平行双开机制安全隔离体系系统的基础。
假若存在有必须要在此套程序底层上运转有很大差别的其他类型博客文件结构的话，如果能给每个运行域提供赋以此截然不同的系统唯一编号或者是新全称标记名字即可！最终在内部缓存生成的管理标识管理操作和处理依赖包捆绑装配引用路径绑定识别处理全阶段里所有的动作它皆将会各自完全地相互无冲突化地区别分别独立地平铺工作下去以此成功杜绝各类运行组件模块产生同名以及重写造成相互干扰所形成的难以觉察到或复现缓存交叉以及触发渲染更新热崩溃等问题现象出现！
`,n:.189}}},{i:11,$:{0:{v:"cache",n:1}}},{i:12,$:{0:{v:"cache system",n:.707}}},{i:13,$:{0:{v:"Cache 全局路由结构",n:.707},1:{v:` Cache 全局接口结构主要定义和存储在 src/global.ts 中，控制全局导航树、搜索检索格式、Vue 路由记录元信息的结构规范。
系统读取完根目录的设置后会解析出一层层的树形导航 Config.nav：
title: string: 导航块头部的大写名称。

name: string: 导航块实际的 URL 缩句（如 cs 代表 Computer Science）。

link: URL: 该层目录的具体绝对路径 URL（如 /math/linear-algebra）。

children: NavNode[]: 该节点内部的下拉子集树。


为 fuse.js 创建带有逆向索引特征的搜索池对象：
title: string: 文件主标题。

content: string: 过滤后高度浓缩的文章主干长文本。

link: URL: 点进结果后的跳转定向路径目标。

is_index: boolean: 区分当前页属性是否属于父级主目录索引。

created: string: 提供排序、筛选用的生成时间长字符串。


动态加载路由 routes.tsx 页面组装时所注入的扩展元字段：
pathname: Pathname: 给到后台直接寻址源文件的映射记录。

category: string: 在系统文件树上划归归属的大类。

attr: MarkdownFrontMatter: 保留最上层最原始的 Front Matter 数据字典结构。

toc: MarkdownHeaderJsx[]: 悬浮右侧栏目的自动渲染树组件集。

breadcrumb: { title: string; link: URL }[]: 在该篇文章内供展示的面包屑导航列表。

updated & created: 创建与翻新时效。


此数据结构在最外层继承了官方原生的 RouteRecordSingleView 借口后，合并生成为 CachedRouteRecord 字典强行包裹这套扩展的 RouteMeta。
`,n:.127}}},{i:14,$:{0:{v:"配置约束与约定",n:1},1:{v:` 配置约束与设定常规 (Convention)该系列配置约束集中声明于 src/convention.ts文件内，划定了从主文件目录树开始延伸而出至用户实际在书写博客和规划侧边栏时的规约底线。
文章顶部通过 --- 包含的一块 YAML 配置块，用以声明影响本篇阅读的基础配置及核心识别参数。
title: string: 唯一识别名或正式的大标题（关联全站搜索引擎的首要抓取特征量）。

displayTitle?: string: 此选填参数能在阅读界面以不同的文本展现（例如短语），绝不会因此遮盖系统级的主词条。

comment?: boolean: 开关网页底部的交互评论服务。

timestamp?: boolean: 控制界面各个角是否主动展示文章发布和重新编辑过的长篇幅时间印记。


对应于项目最外围文件树之下的 /docs/config.yml 配置体系。
nav: 定义为一个包含 RawNavNode 的极为广义、随时允许深度嵌套循环的灵活导航栏结构总集。

icon: Record<string, string>: 定义每一类的大分组（如“编程理论”、“数学随笔”）所必须具备的独特单色渲染小徽标（例如定义为 Misc: box_archive 即指代盒子图标）。


基于 typescript 的魔法，这一定义允许产生无限深度的嵌套结构声明 Record<string, RawNavNode[] | string>。
当识别结果值为 字符串 时，代表探底接触并匹配终端网页独立路径链接。

否则，顺延向内剖解层级形成扩展为一个子集结构深渊大数组，最后交由核心解析流程平铺转化生成标准的 ul li 展开式网页响应式树状菜单块群。


`,n:.164}}},{i:15,$:{0:{v:"websiteGuide",n:1},1:{v:`注意：框架仍处于开发早期，存在很多尚未解决以及未知的bug，请慎重使用此框架。
快速上手
本项目使用node.js框架下的vue3-vite框架组合，需要安装node.js与npm进行项目网站管理，下载参考网站框架可以使用如下命令：
$git clone --recursive http://github.com/Xecades/Note.git

使用recursive选项是为了下载网站框架使用的自定义vite插件（尚未上传npm）vite-plugin-vue-xecades-note
使用npm管理器下载即可：
$npm install

这里指出一个当前存在的问题：当正常从github下载代码项目后，安装完毕之后会发现出现TypeError: localStorage.getItem is not a function报错，而这是由于当前使用的vite-plugin-vue-devtools插件版本较为落后，提升至7.7.9版本可以解决该问题：
$npm install vite-plugin-vye-devtools@7.7.9

由于目前插件处于前期阶段，没有预先编译放在github上，需要下载上述文件之后在Note/packages/vite-plugin-vue-devtools文件夹中执行编译指令：
$npm run build

随后回到Note文件夹使用如下指令即可启动服务：
$ npm run dev # 启用调试模式
$ npm run build # 编译整个项目
$ npm run preview # 启动预览，此模式无法进行热补丁修改

`,n:.186}}},{i:16,$:{0:{v:"MainStructure",n:1},1:{v:`本项目是vue3 vite架构搭建，主要的启动路线符合vite服务启动的基本逻辑：
    main.js/ts 启动，作为主入口导入一系列库与字典，锚定vue文件 ->
    App.vue 启动第一层外部 ->
    index.html 接收App.vue嵌入框架

实际上本框架的逻辑是这一个逻辑的衍生，存在许多内部嵌套，本篇文档用于说明这件事情
嵌套结构
看到App.vue的结构：
<template>
    <div id="main" v-if="meta">
        <LeftBar :status="left_stat" :current-category="meta.category" />
        <Content :meta="meta" />
        <RightBar :status="right_stat" :toc="meta.toc" />
        <!--    <Logo /> -->
    </div>
</template>

在第一层框架下，插入了<LeftBar> <RightBar> <content>三个组件，前两者负责网站的左右装饰与导航，后者是第二层框架:
<template>
    <div id="content">
        <header>
            <h1>{{ meta.attr.displayTitle ?? meta.attr.title }}</h1>
        </header>
            <Metadata
                :breadcrumb="meta.breadcrumb"
                :type="meta.type"
                :key="meta.pathname"
            />
        <main class="markdown">
            <RouterView />
        </main>

        <Timestamp
            v-if="show_timestamp"
            :created="meta.created"
            :updated="meta.updated"
        />

        <Comment v-if="show_comment" />
        <Footer />
    </div>
</template>

content.vue中定义了标题行，metadata标签，这个部分通过调用利用md解析得到的路由数据route.tsx来获取许多元数据，main标签内部定义了由markdown文件主要部分content产生的页面主要内容
有关markdown文件解析的逻辑会在后续文档中补上

另外还有timestamp标签和comment标签定义了一个页面当前的文档文件创建，更新时间与评论栏，这一部分可以在md文件中的front-matter中设定false与true选项来关闭
最后就是footer标签定义了每一个页面的页脚信息
那么以上就是该项目的主要页面框架，从上面的介绍中可以了解到所有能看到的元素的出处，需要进一步了解只需要了解标签中的代码实现即可
`,n:.128}}},{i:17,$:{0:{v:"UserGuide",n:1}}},{i:18,$:{0:{v:"主页",n:1},1:{v:`本网站施工中，目前主要用于记录有关Xecades/Note笔记网站框架的学习记录与个人文档 如果对项目感兴趣的朋友欢迎访问项目仓库
Xecades’ Note Github plugin
  ID: mryuans   浙江大学 能源与环境系统工程 24级    CTFer 主攻web
  页面总数：@PAGE_COUNT
  总词数：@WORD_COUNT
  最后更新：@LAST_UPDATE
@RECENT_UPDATES
QuickCheck
`,n:.243}}},{i:19,$:{0:{v:"test",n:1}}},{i:20,$:{0:{v:"Tools",n:1}}},{i:21,$:{0:{v:"Tools",n:1}}},{i:22,$:{0:{v:"Misc",n:1}}},{i:23,$:{0:{v:"CustomGrammer",n:1},1:{v:`I’d like to test sth
I want to try some custom grammer
How about the fold
Let’s Gooooo…
this is a quote for nobody.
I used  sep{span=24} in this fold
I used  sep{span=8} in this fold
I used  sep{span=16} in this fold
Then is tab
test_tab_1empty…
test_tab_2111
222
Well, what about math and code block?
import time
time.sleep(1)
while True:
    print(111)

    E=mc^2

\\LaTeX    \\begin{aligned}
        &\\text{HHH}=H\\times H^2
\\\\
        &\\text{HH}=H\\times H
    \\end{aligned}

well, How about let’s try some icon
   
`,n:.129}}},{i:24,$:{0:{v:"CS related",n:.707}}},{i:25,$:{0:{v:"lec5",n:1},1:{v:`在不同编辑器中尝试调用openssl中的md5函数：
Code pieces 1:#include <openssl/md5.h>
#pragma comment(lib, "libeay32.lib")
#pragma comment(lib, "ssleay32.lib")
main()
{
   int i;
   unsigned char s[100]="Hello", t[100];
   MD5(s, strlen(s), t);
	for(i=0; i<16; i++)
		printf("%02X ", t[i]);
}

`,n:.218}}},{i:26,$:{0:{v:"lec4",n:1},1:{v:`ring settings
回顾上一周的内容,我们知道选择engima的加密模式存在两种抉择点：
齿轮选择与排列

齿轮的外部设置，初始状态的设置(也就是外面显示的1 1 26) 也被成为message key 这里引出另外的一个内部设置项：ring settings 简单来说，这个 ring setting 就是为外部设置的message key提供了提供了一个delta值 我们来尝试考虑一个场景。


设3个齿轮从左到右的排列是 3 2 1 的ring setting为：AAB (当敲了一个键的情况下，ring setting并不会改变) 初始message key为：AAZ
按下一个键 A： message key变成：AAA 现在计算messge key - ring setting的差


先改变外部设置再加密
\\begin{aligned}
\\Delta 1&=\\text{ascii A(message)}-\\text{ascii B(ring setting)}=-1=25\\text{ mod }26 \\\\
\\Delta 2/3&=\\text{ascii A}-\\text{ascii A}=0
\\end{aligned}

查表计算：


in rotor I:
A + \\Delta 1 = Z
Z map to J
J - \\Delta 1 = K
in rotor II:
K map to L
in rotor III:
L map to V
Reflactor:
V map to W
in rotor III:
W map to R
in rotor II:
R map to G
in rotor I:
G + \\Delta 1 = F
F map to D
D - \\Delta 1 = E
rotor I: EKMFLGDQVZNTOWYHXUSPAIBRCJ ABCDEFGHIJKLMNOPQRSTUVWXYZ

rotor II AJDKSIRUXBLHWTMCQGZNPYFVOE
ABCDEFGHIJKLMNOPQRSTUVWXYZ

rotor III BDFHJLCPRTXVZNYEIWGAKMUSQO
ABCDEFGHIJKLMNOPQRSTUVWXYZ

reflector YRUHOSLDPANGOKMIEBFZCWVJAT ABCDEEGHIJKLMNOPQRSTUVWXYZ


Plugin board
接线板的作用是影响进入右侧齿轮的信号，同时影响从右侧齿轮出来的信号，但不影响其它齿轮。例如，在保持上述初始设置不变的情况下，把A、B对接，那么在输入B的情况下，输出仍旧是E，因为B先要替换成A才会进入①；同理，把A、B对接，再把E、F也对接，那么在输入B的情况下，输出是F，因为本来的输出信号E要替换成F。
Gear spining
1～5号齿轮的旋转是基于实际机械结构的，从右侧开始一共有三个棘抓由主轴驱动控制三个齿轮，右侧的棘抓可以保证控制最右侧的轮转动，对于中间部分的控制则是需要满足具体条件的，也就是必须要在旋转到达某一个槽口的时候，棘爪才能驱动旋转 
这也就意味着并非一定旋转26次就会使得下一级齿轮旋转一次，实际上第一次的旋转是取决于设置的message key的，之后的旋转都是符合26次周期的（一般而言）

对于5个齿轮的槽口具体旋转如下：
① ② ③  ④ ⑤
Q  E  V  J  Z
↓  ↓  ↓  ↓  ↓
R  F  W  K  A

Double spinning
基于上面的条件，实际上运行的时候存在一种特殊情况，也就是当最右侧齿轮带动中间齿轮旋转一次之后，中间齿轮刚好位于下一次可以带动最左侧齿轮的情况，此时再输入一次，这时会导致三个齿轮同时旋转：  两次旋转导致了中间齿轮连续两次旋转，也就是Double spinning.
`,n:.089}}},{i:27,$:{0:{v:"lec3",n:1},1:{v:`这节课主要学习了多表加密的enigma加密机。
Machine Structure
Enigma加密机的主要需要关注的结构是五个具有信息映射功能的齿轮，以及一个插线板
Enigma提供的加密信息密度主要来源于以下几个结构：
Message Key

Ring Setting

Rotor Pattern

Plug Board


本节课将主要介绍有关Message Key与Rotor Pattern的部分
Rotor Pattern
Enigma加密机有5个特殊的齿轮，他们的功能一方面是将输入的字符进行一个映射，另一方面是作为机构件 来驱动下一个齿轮的转动
而实际上，同时最多使用3个齿轮，同时与顺序有关，那么这里的选择就可以有A_5^3中可能性(具体的映射关系下一节课会给出)，这里的排列被称作Rotor Pattern
输入的字符会从左到右依次经过三个齿轮，接着会经过一个特殊的映射表 reflector ，接着，输入的字符会按原路返回，最终输出为密文，有如下示意图：
#import "@preview/cetz:0.2.2": canvas, draw

#align(center)[
  #canvas(length: 1.2cm, {
    import draw: *

    // 全局样式设置
    set-style(
      rect: (stroke: 1.2pt, radius: 0.1),
      line: (stroke: 1.2pt),
      mark: (fill: auto)
    )

    // ==========================================
    // 1. 绘制基本结构 (从左到右: 反射板 -> 左齿轮 -> 中齿轮 -> 右齿轮)
    // ==========================================
    
    let col(chars) = stack(
      dir: ttb,
      spacing: 0.15em, // 进一步缩小纵向间距以容纳更多字符
      ..chars.map(c => text(size: 0.55em, font: "Courier", weight: "bold", c))
    )

    // 2. 增加字符数量 (展示 A-F, 省略号, Y-Z)
    let pre   = col(("A","B","C","D","E","F","G","H","I","J","K","L","M",":","Y","Z"))
    // Rotor I 的实际内部硬连线 (Map 后)
    let post1 = col(("E","K","M","F","L","G","D","Q","V","Z","N","T","O",":","C","J")) 
    // Rotor II 的实际内部硬连线
    let post2 = col(("A","J","D","K","S","I","R","U","X","B","L","H","W",":","O","E")) 
    // Rotor III 的实际内部硬连线
    let post3 = col(("B","D","F","H","J","L","C","P","R","T","X","V","Z",":","Q","O")) 
    // UKW-B (B型反射板) 的真实连线对
    let postU = col(("Y","R","U","H","Q","S","L","D","P","X","N","G","O",":","A","T"))

    // ==========================================
    // 3. 绘制方框并调整左右字符间距 (向中心靠拢)
    // 每个方框宽度为 1.5，中心点偏移量设为 0.25
    // ==========================================

    // 反射板 (Reflector / UKW) - 中心 0.75
    rect((0, -2.5), (1.5, 2.5), name: "UKW", fill: rgb("f0f0f0"))
    content((0.75, -3), [*Reflector*])
    content((0.5, 0), postU) // 靠左 (中心0.75 - 0.25)
    content((1.0, 0), pre)   // 靠右 (中心0.75 + 0.25)
    
    // 左侧齿轮 (Rotor III) - 中心 3.25
    rect((2.5, -2.5), (4, 2.5), name: "RL", fill: rgb("e6f2ff"))
    content((3.25, -3), [*Rotor III*])
    content((3.0, 0), post3) 
    content((3.5, 0), pre)

    // 中间齿轮 (Rotor II) - 中心 5.75
    rect((5, -2.5), (6.5, 2.5), name: "RM", fill: rgb("e6f2ff"))
    content((5.75, -3), [*Rotor II*])
    content((5.5, 0), post2)
    content((6.0, 0), pre)

    // 右侧齿轮 (Rotor I) - 中心 8.25
    rect((7.5, -2.5), (9, 2.5), name: "RR", fill: rgb("e6f2ff"))
    content((8.25, -3), [*Rotor I*])
    content((8.0, 0), post1)
    content((8.5, 0), pre)

    // 接线板分割线
    line((10, -2.7), (10, 2.7), stroke: (dash: "dashed", thickness: 1.5pt))
    content((10, 3.3), [*Plugboard*])

    // ==========================================
    // 2. 绘制正向电流路径 (红色: 键盘输入 -> 反射板)
    // ==========================================
    set-style(line: (stroke: (paint: red, thickness: 1.2pt), mark: (end: ">")))
    
    // 键入输入
    content((12, 1.5), text(fill: red, weight: "bold", [*Plain*]))
    line((10.5, 1.5), (9, 1.5))
    
    // 触点传递: R -> M
    line((7.5, 0.5), (6.5, 0.5)) 

    // 触点传递: M -> L
    line((5, 1.8), (4, 1.8)) 

    // 触点传递: L -> 反射板
    line((2.5, 0.8), (1.5, 0.8)) 

    set-style(line: (stroke: (paint: blue, thickness: 1.2pt), mark: (end: ">")))

    // 触点传递: 反射板 -> L
    line((1.5, -1), (2.5, -1))
    
    // 触点传递: L -> M
    line((4, -2), (5, -2)) 

    // 触点传递: M -> R
    line((6.5, -0.5), (7.5, -0.5)) 

    
    // 传导至接线板并输出灯光信号
    line((9, -1.8), (10.5, -1.8))
    content((12, -1.8), text(fill: blue, weight: "bold", [*Cipher*]))
  })
]

Enigma加密是可逆的

基于Enigma的可逆性，reflector的映射有一定要求，观察就可以发现所有的映射关系都是两两对应

基于Enigma的可逆性，字符信息进入与出机器的两个过程都需要经过Plugboard的处理

基于Enigma的可逆性，正向加密与反向加密经过的字符映射表是相反的

实际上，传入的信息是电信号的形式，这一点利用Plugboard更容易理解，下节课会详细说明


Message Key
那么所谓的Message Key指的是什么呢？这需要考虑实际的物理因素设计
每一个齿轮被设置成26个字符为一个旋转周期，最右侧齿轮在每次输入一个字符的时候都会被转动一次，而当右侧字符转动到某一个凹槽位置的时候，就会带动中间的齿轮转动，类似的，中间的齿轮也是类似的概念，这就类似于26进制的进位
需要注意的是，每一个齿轮的凹槽位置是不一样的，当我们设定一个初始的齿轮情况，如"AAA"(显示为"01 01 01")时，意味着，当前三个齿轮都放到了A的旋转位置:
Message Key
假设最右侧的齿轮的旋转点在R与S之间，那么我们就能看到，并非是旋转26次一定就会造成一次进位，尤其是在每一个齿轮的第一次旋转之前，这是依赖于这个齿轮的初始状态的
这个初始状态就被称为Message Key.
`,n:.051}}},{i:28,$:{0:{v:"lec2",n:1}}},{i:29,$:{0:{v:"lec1",n:1},1:{v:`课程介绍与数学基础：
整除，互素，素数分解定理，最大公约数，模，同余
贝祖定理：
设a、b为整数，且a、b中至少有一个不等于0，令d=gcd(a,b)， 则一定存在整数x、y使得下式成立:
   a*x + b*y = d

逆元：
加法模逆元：


引入恺撒加密：
/*
  0 1 2 3 4 5 6    23  24  25
x:a b c d e f g ... x  y   z 
y:d e f g h i j ... a  b   c
加密过程: y = (x+3) % 26
解密过程: x = (y+23) % 26
因为23是3的加法逆元, 即23相当于-3
-3 = -26+23 = 23 mod 26    
/* 
/* in c */
y = (x - 'a' + 3) % 26 + 'a';
x = (y - 'a' + 23) % 26 + 'a';

乘法模逆元：


若a*b≡1 (mod\\ n), 则称a是b的乘法模n逆元，b是a的乘法模n逆元。a的乘法逆元记作a-1
需要注意的是，乘法逆元不一定存在，存在充要条件： 已知a,n,a\\ mod\\ n的乘法逆元存在的充要条件是gcd(a,n)=1 引入仿射加密：
/*
对于一个同时用到乘法和加法逆元的加密方法，我们可以称之为仿射加密
*/

对于一个密码需要知道哪一个逆元是存在的

在c中，%与mod是不同的，前者会存在负数的情况，如果需要mod，那么我们可以用如下等价操作


(a-b)\\text{ mod }n \\Leftrightarrow (a-b+n)\\%n

     这种做法又被称作是完美带模减法.      类似地，存在完美带模加法，使得结果不超过模本身. 3. 对于所有进行了以n为模的乘法的操作都需要注意加上%n的操作来保证结果不超过n
`,n:.103}}},{i:30,$:{0:{v:"Cryptography",n:1}}}]},t=[{title:"markdown-it",content:`本文将简略介绍本框架使用的markdown解析器，markdown-it与本框架中对于markdown-it的包装和设定以及后续给出的插件包装组件
Github of markdown-it
Parsing and Rendering
markdown-it在整个解析阶段分为两个部分，第一个是parse，获得类似json的包含token的文件，第二个是Render，将第一部分获得的内容渲染成html
Parse 解析
这个阶段分为三个规则，第一部分是Block规则，识别大结构，这里的大结构可以包括标题级别，代码块，数学表达式块等：
# Hello **World** // 整一个结构而不关注加粗逻辑

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

这里需要注意的是block级别的解析会将最外层的部分理解成一层open，一层close，然后理解到里面一堆的inline内容，然后生成上面的扁平式数据结构
第二部分是Inline规则，识别行内的结构:
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

第三部分是Core规则，在前两个阶段结束之后，利用已经生成的数据结构来方便地遍历，调用里面的一些数据生成toc之类的内容
Rendering
以上面那个Parse结束的内容为例子，这种解析结束的数据会利用render的部分生产一个伪HTML字符串，然后传入一些复杂的处理逻辑，如vue项目里，就是会传入vue的template标签内部，进行进一步的渲染：
<h1> 
    Hello <strong>World</strong>
</h1>

通过这样一个简单的例子我们能够理解markdown-it的解析与渲染逻辑，接下来我们看看项目是如何处理markdown自定义标签的
Handling logic
回到项目本身，我们看到插件内部存在md文件夹包含了我们所有解析md文件的逻辑（其实是一部分，因为另一部分在vue的组件内部）
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

markdown-it插件的逻辑一般是这样的： 对外界给出一个index.js，在这个index.js里面实现markdown实例，然后在另一个位置定义一个markdown-it-wrapper，用于定义通用的包装接口，然后再由其他的插件与工具来调用这个包装的接口，再由最初定义的index.js来use这个插件逻辑，于是完成调用，我们可以这个util的调用链：
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

实质上的逻辑就是设计一个截停的规则，一旦读到某一个逻辑，markdown-it会截停然后按照定义的规则去解析它，生成供vue解析的例子，我们选取两个例子，第一个是完全定义在markdown-it内部的插件性质规则，另一个是利用mdc.ts将逻辑转接给vue组件处理的例子
Markdown-it plugin Example
例如我们看这个icon.ts的处理逻辑：
import { Token } from "markdown-it";
import MarkdownItWrapper from "../markdown-it-wrapper";

import type MarkdownIt from "markdown-it";

/**
 * Transform \`:...:\` into FontAwesome components.
 *
 *  - \`:flag:\` => \`<font-awesome-icon class="icon" icon="fa-solid fa-flag" />\`
 *  - \`:user.r:\` => \`<font-awesome-icon class="icon" icon="fa-regular fa-user" />\`
 *  - \`:github.b:\` => \`<font-awesome-icon class="icon" icon="fa-brands fa-github" />\`
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
            id = id ? \` id="\${id}"\` : "";

            const [icon, style] = token.content.split(".");
            const type =
                style === "r" ? "regular" : style === "b" ? "brands" : "solid";
            return \`<font-awesome-icon\${id} class="icon\${cls}" icon="fa-\${type} fa-\${icon}" />\`;
        },
    });
};

type属性告诉我们应该在哪一个解析阶段来考虑这一部分逻辑，这里的inline就是上面提到的行内处理阶段，name属性主要是用于内部标记处理对应内容，而检测的标志是:，一旦检测到这个部分，解析器会开始读取接下来的内容直到读到下一个:，然后对于内部的内容进行处理，例如这里的处理逻辑就是如果给出一个.r选项，就会插入fontawesome里面的regular模式图标，然后这最后会返回一个html字符串
我们再给出别的例子，例如并非使用我们自己设计的wrapper的逻辑，使用一些现成的，直接处理inline或者block解析阶段逻辑的代码：
// @ts-ignore
import MarkdownItForInline from "markdown-it-for-inline";

import type MarkdownIt from "markdown-it";
import type Token from "markdown-it/lib/token.mjs";

/**
 * Transform \`<a>\` into \`Anchor\` component.
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

这里就是利用了inline的第三方处理的库，由于我们写的[]()在原声的inline分析之后会被解析成link_open，text，link_close三个部分，然后这里就根据这个type去分别处理，这里就是将<a></a>标签改成<anchor></anchor>，为了给vue组件使用。
Vue component handling Example
本框架使用markdown-it-mdc来处理大部分需要使用vue component的内容，然后使用一个mdc.ts的插件来处理传入的参数，主要的目的就是将传入的参数转化为vue使用的v-bind变量
MDC(Markdown component):
We created the MDC syntax to supercharge Markdown and give you the ability to integrate Vue components with slots and props inside your Markdown. Reference

MDC为markdown提供了一个跟vue component联动的机会，需要符合一个MDC syntax规范，简单来讲，有这三个规则：
使用::作为统一调用的提示mark

在tag后加上{}来传递属性(Attributes)或者是参数(props)

如果有分层逻辑的话，就顺位加上:来表示层级 这里需要注意的是，mdc syntax里面有三种类型的组件：

行内组件(inline) 需要前后:封口

块级别容器(block) 在内部添加内容之后，需要用:封口

块级别简写(block shorten) 在内部不需要添加内容，不需要:封口


了解了以上基础之后，我们看看mdc.ts的处理:
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

这里可能看不到的点在于，在解析markdown文件的时候，如果看到::会直接由这里使用的use(MarkdownItMdc)进行处理，同时分级逻辑也会进行处理，然后渲染成我们熟悉的样子：
<grid align=equal gapx=10px gapy=20px>
    ...
</grid>

需要注意的是这里还没有讲传入的变量处理完毕，需要mdc.ts的处理：
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

这样就转变为v-bind变量，但是实际上mdc.ts中还有一些其他的内容，但是并非最关键的部分，这里不多赘述
另外一个值得注意的是，我们整个项目里面存在两种mardown的组件，一种是可以直接通过定义一些专门的css样式标注就可，例如quote等，它们会简单在tags.ts里面修改成<div>或者<span>标签，附上特定的class属性然后使用对应的css样式渲染
另一种则是使用vue的组件，这种类型一般需要相对复杂的ui交互或者排版，这种情况会在tags.ts里面使用驼峰命名规范来改写成vue能读懂的格式，例如<fold> => <Fold>，<dot-pattern> => <DotPattern>
然后这些完整的内容会交由别的接口进行进一步的加工
`,link:"/predoc/markdown_analysis/markdown-it",is_index:!1,created:"2026-04-04T15:33:45+08:00"},{title:"markdown_analysis",content:"",link:"/predoc/markdown_analysis",is_index:!0,created:"2026-04-04T15:33:45+08:00"},{title:"Markdown 词法分析 (Tokens)",content:` Markdown 词法与环境结构分析这些接口与属性共同定义在处于中央调度地位的 src/global.ts，为 Markdown-it 这个超轻量的核心转换引擎进行底层干预提供了非常强有力的定制级强结构挂载依据。它们使得诸如数学公式段落渲染、勾选控件识别及替换以及各类混合语言的代码块排版任务，在剥除传统状态的同时可以被彻底解耦进行微操管理。
 数据分析提取结构承担了系统区分拦截被 YAML 分界符 --- 所包围阻绝断开的头部描述块字典记录（front_matter），以及那些并未曾接受下流底层解析动作染洗处理过的完全纯正的文章主体数据载荷（markdown 的本源文本内容片段保留）。并在适当的生命周期抛出这些快照供各方提取查阅。
由于我们需要基于鼠标快速的跳转导航系统完成页面快速锚点，系统在剥除全套段落与纯文字前专门设置了用于截获拦截由 # 堆砌的所有的级联标题数据抓取探针模块并产出对应的高维标识体系记录栈：
基础脱水骨架 (MarkdownHeader): 主要包含纯长字符串的章节呈现标题文字主体内容、用表示深度级别从属层级的 level 数字定义以及在执行跳转后于页面顶端地址出现的经过清洗的 hash 重定向锚点。

高维可视化组件结构形态化升级特征结构表列册项记录体(MarkdownHeaderJsx): 借由此变招，系统抛弃落后低端的 String 文字链并容纳那些能够提供极为精致视觉感官上的小图标或是全自动数学交互组件模块嵌入等支持。其 title 等级直接跨维替代晋升为了系统级别底层的 JSX.Element 原生格式，借此实现超维的视觉传达和高自定义空间。


 全局指针指代环境基于 token 处理及还原本质实际上等同一个不透明及纯黑洞特性的黑盒转换流水线，框架创造出这套绝无仅有的拥有强引用的运行期对象代理结构。通过跨域层级的强制注入，每个独立开发的第三方小插件渲染流程也均可在运行时直接读取反射找回并重连“属于其自己的原本当前博文对象全尺寸上下文环境指针记录”。
entry: Entry: 以高维性质的封装闭包直接且永久缓存保留了一份针对本篇文章系统解析执行包装控制对象的长时期稳定有效全权指针引用控制通道，可以在一切特殊情况越级调用系统环境的异步或者执行钩子变量的存取。

tsx: boolean: 这个非常简洁但举足轻重的底层全局开关参数结构体控制标识了系统渲染模式机制环境能否以及是否正在基于使用能够顺畅兼容并混搭出强功能支持性质下包含多种交互并抛弃了落伍老一套仅仅只有堆砌起纯老式字符串作为返回结果输出这种枯燥套路的规范的规则控制通道。也就是直接向内部开启转化通道可以输出附带有复杂内务逻辑机制事件绑定的极点结构特性并利用 Vue 具有强扩展表现力的 <> <span onclick=\\"\\"> 数据包装重用特性！


`,link:"/predoc/markdown_analysis/MarkdownInterfaces",is_index:!1,created:"2026-04-04T15:33:45+08:00"},{title:"predoc",content:"",link:"/predoc",is_index:!0,created:"2026-04-04T15:33:45+08:00"},{title:"Entry Main",content:`本文将着重介绍插件中的enrty类
##类属性
`,link:"/predoc/entry/temp",is_index:!1,created:"2026-04-04T15:33:45+08:00"},{title:"Entry class",content:"",link:"/predoc/entry",is_index:!0,created:"2026-04-04T15:33:45+08:00"},{title:"Entry 关联的类型定义",content:` Entry 关联的类型定义解析单篇 Markdown 的逻辑里大量使用了类型重命名，它们都在 src/entry/index.ts 下进行管理，严格规范了系统内外接口通讯。
**URL = \\/\${string}\`:** 文件的虚拟映射路由路径（如 /cs/index\`）。

Filename = string: 短文件名。

Pathname = \\docs/\${string}.md\`\`: 原始磁盘位置路径。

PostPathname = \\cache/posts/\${string}.vue\`\`: 生成至缓存编译区的 Vue 文件地址。

**PostImportPath = \\@cache/posts/\${string}\`:** 供前端程序 import()\` 懒加载获取的快捷引入缩写。

Type = "post" | "index" | "root" | "404": 文章种类。


用于描述一个外部资源依赖文件的信息：
src: string: 用于供解析器直接 @import 获取的源路径。

id: string: 唯一标识符，用以标记占位变量（如中间产生的 tempID）。


描述必须以 await 等待的耗时逻辑：
target: () => Promise<string>: 该异步回调返回一块有效的 TS 代码字符串。

id: string: 唯一执行句柄。


存放由解析器等模块注入的一整块 Vue 组件格式代码片段：
content: string: 内嵌的合法可解释 JSX/TSX 文本。

id: string: 用于后续替换合并的变量定位符。


`,link:"/predoc/entry/EntryTypes",is_index:!1,created:"2026-04-04T15:33:45+08:00"},{title:"Entry 核心类详解",content:` Entry 核心类详解在框架底层，每一个独立的 Markdown 文件都会被抽象为实例化、对象化的 Entry 类。Entry 承担了数据容器与懒加载编译的双重责任，是系统预处理与增量更新中最重要的数据结构。
Entry 定义于 src/entry/index.ts 中，它的设计具有高度的"延迟加载"特性。如果没有组件试图读取如 html 或 text，其内部的解构与转换计算便不会被执行。
 核心属性 (Properties)pathname: Pathname: Markdown 文件的相对路径（例如 "docs/cs/ads/avl-tree.md"）。

time: { created: string; updated: string }: 文件的底层创建与修改时间字符串。

mtime: number: 增量编译最核心的依据。文件最后修改的时间戳。

toc: MarkdownHeader[]: 存放文章各个级别标题的自动生成的章节目录。


dependencies: Dependency[]: 保存需预先编译的依赖项（如内置图片资源），避免直接暴露文件原始路径。

awaits: Await[]: 存放必须在编译至 Vue 组件 setup 阶段执行的异步 Promise（如获取外链图片尺寸）。

expressions: Expression[]: 用于执行和注入包含逻辑的 TSX 动态代码段。


raw: string: 从文件系统直接读取的纯文本。

front_matter: MarkdownFrontMatter: 顶部由 --- 包围的数据字典。

markdown: string: 剥离了 Front Matter 后的纯正文。

tokens: Token[]: 经由 markdown-it 解析后的底层排版积木块。

html: string: 最终被渲染成的完整 Vue / HTML 代码字符串。

text: string: 过滤一切排版代码后的纯净文本，直供搜索大纲使用。


 方法定义 (Methods)updateTime(): 异步获取文件底层的时间数据，并赋给 mtime。

require(content, ext) / use(src): 注册外部依赖或是资源文件，返回临时注册 ID 以生成合并 import 语句。

await(promise): 注册能在最终 Vue 组件启动时被外壳执行的异步阻塞逻辑代码段。

expr(content): 插入内嵌自定义 TSX/JSX 代码逻辑，交由系统统一转化。

resetCache(): 在释放内存或进行 Web 框架的热更新（HMR）时，强行清空之前所有的 _html、_tokens 缓存，逼迫系统强制执行一次重新编译计算操作。


`,link:"/predoc/entry/EntryClass",is_index:!1,created:"2026-04-04T15:33:45+08:00"},{title:"temp",content:"",link:"/predoc/component/temp",is_index:!1,created:"2026-04-04T15:33:45+08:00"},{title:"component",content:"",link:"/predoc/component",is_index:!0,created:"2026-04-04T15:33:45+08:00"},{title:"Vite 插件配置选项 (Plugin Options)",content:` Vite 插件选项配置 (Option Interface)在项目的根节点之下的构建控制中心文件 vite.config.js 内部或者用于搭建服务端热更服务的单向进程加载池之中，我们将通过暴露的全局设定选项将它注入并在最内层的暴露实例化类中启动这一全套服务：
// 定义在 vite-plugin-vue-xecades-note/src/global.ts
export interface NotePluginOptions {
    /** 注入存放所有的自定义 Markdown UI 组件目录相对路径 */
    componentDir: string;
    /** 可选设定当前被实例化的自定义外壳插件的系统别称 */
    pluginName?: string;
}

这是一个在底层不可或缺必须绝对制定的强制指向的来源储备地址锚点定位参数声明记录！也是整个外围框架寻找编写的具有丰富功能的第三方组件代码包堆栈所放处（比如项目中名为 CustomAlert.vue 或者具有更高阶属性功能的其它界面模块代码等等）。
在此系统的实际配置内一般其为：src/components/md。当底层流水线作业识别遇到特殊的未记载过的标识节点标签解构无法兼容的语句体时，只要它处于这一目录下面，那么依托基于此构建的一系列 import() 环境指令生成机制引擎器就会立即将其当成组件加入到整体加载呈现堆栈之中参与全过程的显示！
此非必须赋值的强行性命名改写支持让所有运行在这个引擎下的多独立实例存在着独立平行双开机制安全隔离体系系统的基础。
假若存在有必须要在此套程序底层上运转有很大差别的其他类型博客文件结构的话，如果能给每个运行域提供赋以此截然不同的系统唯一编号或者是新全称标记名字即可！最终在内部缓存生成的管理标识管理操作和处理依赖包捆绑装配引用路径绑定识别处理全阶段里所有的动作它皆将会各自完全地相互无冲突化地区别分别独立地平铺工作下去以此成功杜绝各类运行组件模块产生同名以及重写造成相互干扰所形成的难以觉察到或复现缓存交叉以及触发渲染更新热崩溃等问题现象出现！
`,link:"/predoc/component/PluginOptions",is_index:!1,created:"2026-04-04T15:33:45+08:00"},{title:"cache",content:"",link:"/predoc/cache/temp",is_index:!1,created:"2026-04-04T15:33:45+08:00"},{title:"cache system",content:"",link:"/predoc/cache",is_index:!0,created:"2026-04-04T15:33:45+08:00"},{title:"Cache 全局路由结构",content:` Cache 全局接口结构主要定义和存储在 src/global.ts 中，控制全局导航树、搜索检索格式、Vue 路由记录元信息的结构规范。
系统读取完根目录的设置后会解析出一层层的树形导航 Config.nav：
title: string: 导航块头部的大写名称。

name: string: 导航块实际的 URL 缩句（如 cs 代表 Computer Science）。

link: URL: 该层目录的具体绝对路径 URL（如 /math/linear-algebra）。

children: NavNode[]: 该节点内部的下拉子集树。


为 fuse.js 创建带有逆向索引特征的搜索池对象：
title: string: 文件主标题。

content: string: 过滤后高度浓缩的文章主干长文本。

link: URL: 点进结果后的跳转定向路径目标。

is_index: boolean: 区分当前页属性是否属于父级主目录索引。

created: string: 提供排序、筛选用的生成时间长字符串。


动态加载路由 routes.tsx 页面组装时所注入的扩展元字段：
pathname: Pathname: 给到后台直接寻址源文件的映射记录。

category: string: 在系统文件树上划归归属的大类。

attr: MarkdownFrontMatter: 保留最上层最原始的 Front Matter 数据字典结构。

toc: MarkdownHeaderJsx[]: 悬浮右侧栏目的自动渲染树组件集。

breadcrumb: { title: string; link: URL }[]: 在该篇文章内供展示的面包屑导航列表。

updated & created: 创建与翻新时效。


此数据结构在最外层继承了官方原生的 RouteRecordSingleView 借口后，合并生成为 CachedRouteRecord 字典强行包裹这套扩展的 RouteMeta。
`,link:"/predoc/cache/GlobalInterfaces",is_index:!1,created:"2026-04-04T15:33:45+08:00"},{title:"配置约束与约定",content:` 配置约束与设定常规 (Convention)该系列配置约束集中声明于 src/convention.ts文件内，划定了从主文件目录树开始延伸而出至用户实际在书写博客和规划侧边栏时的规约底线。
文章顶部通过 --- 包含的一块 YAML 配置块，用以声明影响本篇阅读的基础配置及核心识别参数。
title: string: 唯一识别名或正式的大标题（关联全站搜索引擎的首要抓取特征量）。

displayTitle?: string: 此选填参数能在阅读界面以不同的文本展现（例如短语），绝不会因此遮盖系统级的主词条。

comment?: boolean: 开关网页底部的交互评论服务。

timestamp?: boolean: 控制界面各个角是否主动展示文章发布和重新编辑过的长篇幅时间印记。


对应于项目最外围文件树之下的 /docs/config.yml 配置体系。
nav: 定义为一个包含 RawNavNode 的极为广义、随时允许深度嵌套循环的灵活导航栏结构总集。

icon: Record<string, string>: 定义每一类的大分组（如“编程理论”、“数学随笔”）所必须具备的独特单色渲染小徽标（例如定义为 Misc: box_archive 即指代盒子图标）。


基于 typescript 的魔法，这一定义允许产生无限深度的嵌套结构声明 Record<string, RawNavNode[] | string>。
当识别结果值为 字符串 时，代表探底接触并匹配终端网页独立路径链接。

否则，顺延向内剖解层级形成扩展为一个子集结构深渊大数组，最后交由核心解析流程平铺转化生成标准的 ul li 展开式网页响应式树状菜单块群。


`,link:"/predoc/cache/ConventionInterfaces",is_index:!1,created:"2026-04-04T15:33:45+08:00"},{title:"websiteGuide",content:`注意：框架仍处于开发早期，存在很多尚未解决以及未知的bug，请慎重使用此框架。
快速上手
本项目使用node.js框架下的vue3-vite框架组合，需要安装node.js与npm进行项目网站管理，下载参考网站框架可以使用如下命令：
$git clone --recursive http://github.com/Xecades/Note.git

使用recursive选项是为了下载网站框架使用的自定义vite插件（尚未上传npm）vite-plugin-vue-xecades-note
使用npm管理器下载即可：
$npm install

这里指出一个当前存在的问题：当正常从github下载代码项目后，安装完毕之后会发现出现TypeError: localStorage.getItem is not a function报错，而这是由于当前使用的vite-plugin-vue-devtools插件版本较为落后，提升至7.7.9版本可以解决该问题：
$npm install vite-plugin-vye-devtools@7.7.9

由于目前插件处于前期阶段，没有预先编译放在github上，需要下载上述文件之后在Note/packages/vite-plugin-vue-devtools文件夹中执行编译指令：
$npm run build

随后回到Note文件夹使用如下指令即可启动服务：
$ npm run dev # 启用调试模式
$ npm run build # 编译整个项目
$ npm run preview # 启动预览，此模式无法进行热补丁修改

`,link:"/predoc/UserGuide/websiteGuide",is_index:!1,created:"2026-04-04T15:33:45+08:00"},{title:"MainStructure",content:`本项目是vue3 vite架构搭建，主要的启动路线符合vite服务启动的基本逻辑：
    main.js/ts 启动，作为主入口导入一系列库与字典，锚定vue文件 ->
    App.vue 启动第一层外部 ->
    index.html 接收App.vue嵌入框架

实际上本框架的逻辑是这一个逻辑的衍生，存在许多内部嵌套，本篇文档用于说明这件事情
嵌套结构
看到App.vue的结构：
<template>
    <div id="main" v-if="meta">
        <LeftBar :status="left_stat" :current-category="meta.category" />
        <Content :meta="meta" />
        <RightBar :status="right_stat" :toc="meta.toc" />
        <!--    <Logo /> -->
    </div>
</template>

在第一层框架下，插入了<LeftBar> <RightBar> <content>三个组件，前两者负责网站的左右装饰与导航，后者是第二层框架:
<template>
    <div id="content">
        <header>
            <h1>{{ meta.attr.displayTitle ?? meta.attr.title }}</h1>
        </header>
            <Metadata
                :breadcrumb="meta.breadcrumb"
                :type="meta.type"
                :key="meta.pathname"
            />
        <main class="markdown">
            <RouterView />
        </main>

        <Timestamp
            v-if="show_timestamp"
            :created="meta.created"
            :updated="meta.updated"
        />

        <Comment v-if="show_comment" />
        <Footer />
    </div>
</template>

content.vue中定义了标题行，metadata标签，这个部分通过调用利用md解析得到的路由数据route.tsx来获取许多元数据，main标签内部定义了由markdown文件主要部分content产生的页面主要内容
有关markdown文件解析的逻辑会在后续文档中补上

另外还有timestamp标签和comment标签定义了一个页面当前的文档文件创建，更新时间与评论栏，这一部分可以在md文件中的front-matter中设定false与true选项来关闭
最后就是footer标签定义了每一个页面的页脚信息
那么以上就是该项目的主要页面框架，从上面的介绍中可以了解到所有能看到的元素的出处，需要进一步了解只需要了解标签中的代码实现即可
`,link:"/predoc/UserGuide/mainStructure",is_index:!1,created:"2026-04-04T15:33:45+08:00"},{title:"UserGuide",content:"",link:"/predoc/UserGuide",is_index:!0,created:"2026-04-04T15:33:45+08:00"},{title:"主页",content:`本网站施工中，目前主要用于记录有关Xecades/Note笔记网站框架的学习记录与个人文档 如果对项目感兴趣的朋友欢迎访问项目仓库
Xecades’ Note Github plugin
  ID: mryuans   浙江大学 能源与环境系统工程 24级    CTFer 主攻web
  页面总数：@PAGE_COUNT
  总词数：@WORD_COUNT
  最后更新：@LAST_UPDATE
@RECENT_UPDATES
QuickCheck
`,link:"/",is_index:!0,created:"2026-04-04T15:33:45+08:00"},{title:"test",content:"",link:"/Tools/temp",is_index:!1,created:"2026-04-04T15:33:45+08:00"},{title:"Tools",content:"",link:"/Tools",is_index:!0,created:"2026-04-04T15:33:45+08:00"},{title:"Tools",content:"",link:"/Tools",is_index:!1,created:"2026-04-04T15:33:45+08:00"},{title:"Misc",content:"",link:"/Misc",is_index:!0,created:"2026-04-04T15:33:45+08:00"},{title:"CustomGrammer",content:`I’d like to test sth
I want to try some custom grammer
How about the fold
Let’s Gooooo…
this is a quote for nobody.
I used  sep{span=24} in this fold
I used  sep{span=8} in this fold
I used  sep{span=16} in this fold
Then is tab
test_tab_1empty…
test_tab_2111
222
Well, what about math and code block?
import time
time.sleep(1)
while True:
    print(111)

    E=mc^2

\\LaTeX    \\begin{aligned}
        &\\text{HHH}=H\\times H^2
\\\\
        &\\text{HH}=H\\times H
    \\end{aligned}

well, How about let’s try some icon
   
`,link:"/Misc/CustomGrammer",is_index:!1,created:"2026-04-04T15:33:45+08:00"},{title:"CS related",content:"",link:"/CS_related",is_index:!0,created:"2026-04-04T15:33:45+08:00"},{title:"lec5",content:`在不同编辑器中尝试调用openssl中的md5函数：
Code pieces 1:#include <openssl/md5.h>
#pragma comment(lib, "libeay32.lib")
#pragma comment(lib, "ssleay32.lib")
main()
{
   int i;
   unsigned char s[100]="Hello", t[100];
   MD5(s, strlen(s), t);
	for(i=0; i<16; i++)
		printf("%02X ", t[i]);
}

`,link:"/CS_related/Cryptography/lec5",is_index:!1,created:"2026-04-04T15:33:45+08:00"},{title:"lec4",content:`ring settings
回顾上一周的内容,我们知道选择engima的加密模式存在两种抉择点：
齿轮选择与排列

齿轮的外部设置，初始状态的设置(也就是外面显示的1 1 26) 也被成为message key 这里引出另外的一个内部设置项：ring settings 简单来说，这个 ring setting 就是为外部设置的message key提供了提供了一个delta值 我们来尝试考虑一个场景。


设3个齿轮从左到右的排列是 3 2 1 的ring setting为：AAB (当敲了一个键的情况下，ring setting并不会改变) 初始message key为：AAZ
按下一个键 A： message key变成：AAA 现在计算messge key - ring setting的差


先改变外部设置再加密
\\begin{aligned}
\\Delta 1&=\\text{ascii A(message)}-\\text{ascii B(ring setting)}=-1=25\\text{ mod }26 \\\\
\\Delta 2/3&=\\text{ascii A}-\\text{ascii A}=0
\\end{aligned}

查表计算：


in rotor I:
A + \\Delta 1 = Z
Z map to J
J - \\Delta 1 = K
in rotor II:
K map to L
in rotor III:
L map to V
Reflactor:
V map to W
in rotor III:
W map to R
in rotor II:
R map to G
in rotor I:
G + \\Delta 1 = F
F map to D
D - \\Delta 1 = E
rotor I: EKMFLGDQVZNTOWYHXUSPAIBRCJ ABCDEFGHIJKLMNOPQRSTUVWXYZ

rotor II AJDKSIRUXBLHWTMCQGZNPYFVOE
ABCDEFGHIJKLMNOPQRSTUVWXYZ

rotor III BDFHJLCPRTXVZNYEIWGAKMUSQO
ABCDEFGHIJKLMNOPQRSTUVWXYZ

reflector YRUHOSLDPANGOKMIEBFZCWVJAT ABCDEEGHIJKLMNOPQRSTUVWXYZ


Plugin board
接线板的作用是影响进入右侧齿轮的信号，同时影响从右侧齿轮出来的信号，但不影响其它齿轮。例如，在保持上述初始设置不变的情况下，把A、B对接，那么在输入B的情况下，输出仍旧是E，因为B先要替换成A才会进入①；同理，把A、B对接，再把E、F也对接，那么在输入B的情况下，输出是F，因为本来的输出信号E要替换成F。
Gear spining
1～5号齿轮的旋转是基于实际机械结构的，从右侧开始一共有三个棘抓由主轴驱动控制三个齿轮，右侧的棘抓可以保证控制最右侧的轮转动，对于中间部分的控制则是需要满足具体条件的，也就是必须要在旋转到达某一个槽口的时候，棘爪才能驱动旋转 
这也就意味着并非一定旋转26次就会使得下一级齿轮旋转一次，实际上第一次的旋转是取决于设置的message key的，之后的旋转都是符合26次周期的（一般而言）

对于5个齿轮的槽口具体旋转如下：
① ② ③  ④ ⑤
Q  E  V  J  Z
↓  ↓  ↓  ↓  ↓
R  F  W  K  A

Double spinning
基于上面的条件，实际上运行的时候存在一种特殊情况，也就是当最右侧齿轮带动中间齿轮旋转一次之后，中间齿轮刚好位于下一次可以带动最左侧齿轮的情况，此时再输入一次，这时会导致三个齿轮同时旋转：  两次旋转导致了中间齿轮连续两次旋转，也就是Double spinning.
`,link:"/CS_related/Cryptography/lec4",is_index:!1,created:"2026-04-04T15:33:45+08:00"},{title:"lec3",content:`这节课主要学习了多表加密的enigma加密机。
Machine Structure
Enigma加密机的主要需要关注的结构是五个具有信息映射功能的齿轮，以及一个插线板
Enigma提供的加密信息密度主要来源于以下几个结构：
Message Key

Ring Setting

Rotor Pattern

Plug Board


本节课将主要介绍有关Message Key与Rotor Pattern的部分
Rotor Pattern
Enigma加密机有5个特殊的齿轮，他们的功能一方面是将输入的字符进行一个映射，另一方面是作为机构件 来驱动下一个齿轮的转动
而实际上，同时最多使用3个齿轮，同时与顺序有关，那么这里的选择就可以有A_5^3中可能性(具体的映射关系下一节课会给出)，这里的排列被称作Rotor Pattern
输入的字符会从左到右依次经过三个齿轮，接着会经过一个特殊的映射表 reflector ，接着，输入的字符会按原路返回，最终输出为密文，有如下示意图：
#import "@preview/cetz:0.2.2": canvas, draw

#align(center)[
  #canvas(length: 1.2cm, {
    import draw: *

    // 全局样式设置
    set-style(
      rect: (stroke: 1.2pt, radius: 0.1),
      line: (stroke: 1.2pt),
      mark: (fill: auto)
    )

    // ==========================================
    // 1. 绘制基本结构 (从左到右: 反射板 -> 左齿轮 -> 中齿轮 -> 右齿轮)
    // ==========================================
    
    let col(chars) = stack(
      dir: ttb,
      spacing: 0.15em, // 进一步缩小纵向间距以容纳更多字符
      ..chars.map(c => text(size: 0.55em, font: "Courier", weight: "bold", c))
    )

    // 2. 增加字符数量 (展示 A-F, 省略号, Y-Z)
    let pre   = col(("A","B","C","D","E","F","G","H","I","J","K","L","M",":","Y","Z"))
    // Rotor I 的实际内部硬连线 (Map 后)
    let post1 = col(("E","K","M","F","L","G","D","Q","V","Z","N","T","O",":","C","J")) 
    // Rotor II 的实际内部硬连线
    let post2 = col(("A","J","D","K","S","I","R","U","X","B","L","H","W",":","O","E")) 
    // Rotor III 的实际内部硬连线
    let post3 = col(("B","D","F","H","J","L","C","P","R","T","X","V","Z",":","Q","O")) 
    // UKW-B (B型反射板) 的真实连线对
    let postU = col(("Y","R","U","H","Q","S","L","D","P","X","N","G","O",":","A","T"))

    // ==========================================
    // 3. 绘制方框并调整左右字符间距 (向中心靠拢)
    // 每个方框宽度为 1.5，中心点偏移量设为 0.25
    // ==========================================

    // 反射板 (Reflector / UKW) - 中心 0.75
    rect((0, -2.5), (1.5, 2.5), name: "UKW", fill: rgb("f0f0f0"))
    content((0.75, -3), [*Reflector*])
    content((0.5, 0), postU) // 靠左 (中心0.75 - 0.25)
    content((1.0, 0), pre)   // 靠右 (中心0.75 + 0.25)
    
    // 左侧齿轮 (Rotor III) - 中心 3.25
    rect((2.5, -2.5), (4, 2.5), name: "RL", fill: rgb("e6f2ff"))
    content((3.25, -3), [*Rotor III*])
    content((3.0, 0), post3) 
    content((3.5, 0), pre)

    // 中间齿轮 (Rotor II) - 中心 5.75
    rect((5, -2.5), (6.5, 2.5), name: "RM", fill: rgb("e6f2ff"))
    content((5.75, -3), [*Rotor II*])
    content((5.5, 0), post2)
    content((6.0, 0), pre)

    // 右侧齿轮 (Rotor I) - 中心 8.25
    rect((7.5, -2.5), (9, 2.5), name: "RR", fill: rgb("e6f2ff"))
    content((8.25, -3), [*Rotor I*])
    content((8.0, 0), post1)
    content((8.5, 0), pre)

    // 接线板分割线
    line((10, -2.7), (10, 2.7), stroke: (dash: "dashed", thickness: 1.5pt))
    content((10, 3.3), [*Plugboard*])

    // ==========================================
    // 2. 绘制正向电流路径 (红色: 键盘输入 -> 反射板)
    // ==========================================
    set-style(line: (stroke: (paint: red, thickness: 1.2pt), mark: (end: ">")))
    
    // 键入输入
    content((12, 1.5), text(fill: red, weight: "bold", [*Plain*]))
    line((10.5, 1.5), (9, 1.5))
    
    // 触点传递: R -> M
    line((7.5, 0.5), (6.5, 0.5)) 

    // 触点传递: M -> L
    line((5, 1.8), (4, 1.8)) 

    // 触点传递: L -> 反射板
    line((2.5, 0.8), (1.5, 0.8)) 

    set-style(line: (stroke: (paint: blue, thickness: 1.2pt), mark: (end: ">")))

    // 触点传递: 反射板 -> L
    line((1.5, -1), (2.5, -1))
    
    // 触点传递: L -> M
    line((4, -2), (5, -2)) 

    // 触点传递: M -> R
    line((6.5, -0.5), (7.5, -0.5)) 

    
    // 传导至接线板并输出灯光信号
    line((9, -1.8), (10.5, -1.8))
    content((12, -1.8), text(fill: blue, weight: "bold", [*Cipher*]))
  })
]

Enigma加密是可逆的

基于Enigma的可逆性，reflector的映射有一定要求，观察就可以发现所有的映射关系都是两两对应

基于Enigma的可逆性，字符信息进入与出机器的两个过程都需要经过Plugboard的处理

基于Enigma的可逆性，正向加密与反向加密经过的字符映射表是相反的

实际上，传入的信息是电信号的形式，这一点利用Plugboard更容易理解，下节课会详细说明


Message Key
那么所谓的Message Key指的是什么呢？这需要考虑实际的物理因素设计
每一个齿轮被设置成26个字符为一个旋转周期，最右侧齿轮在每次输入一个字符的时候都会被转动一次，而当右侧字符转动到某一个凹槽位置的时候，就会带动中间的齿轮转动，类似的，中间的齿轮也是类似的概念，这就类似于26进制的进位
需要注意的是，每一个齿轮的凹槽位置是不一样的，当我们设定一个初始的齿轮情况，如"AAA"(显示为"01 01 01")时，意味着，当前三个齿轮都放到了A的旋转位置:
Message Key
假设最右侧的齿轮的旋转点在R与S之间，那么我们就能看到，并非是旋转26次一定就会造成一次进位，尤其是在每一个齿轮的第一次旋转之前，这是依赖于这个齿轮的初始状态的
这个初始状态就被称为Message Key.
`,link:"/CS_related/Cryptography/lec3",is_index:!1,created:"2026-04-04T15:33:45+08:00"},{title:"lec2",content:"",link:"/CS_related/Cryptography/lec2",is_index:!1,created:"2026-04-04T15:33:45+08:00"},{title:"lec1",content:`课程介绍与数学基础：
整除，互素，素数分解定理，最大公约数，模，同余
贝祖定理：
设a、b为整数，且a、b中至少有一个不等于0，令d=gcd(a,b)， 则一定存在整数x、y使得下式成立:
   a*x + b*y = d

逆元：
加法模逆元：


引入恺撒加密：
/*
  0 1 2 3 4 5 6    23  24  25
x:a b c d e f g ... x  y   z 
y:d e f g h i j ... a  b   c
加密过程: y = (x+3) % 26
解密过程: x = (y+23) % 26
因为23是3的加法逆元, 即23相当于-3
-3 = -26+23 = 23 mod 26    
/* 
/* in c */
y = (x - 'a' + 3) % 26 + 'a';
x = (y - 'a' + 23) % 26 + 'a';

乘法模逆元：


若a*b≡1 (mod\\ n), 则称a是b的乘法模n逆元，b是a的乘法模n逆元。a的乘法逆元记作a-1
需要注意的是，乘法逆元不一定存在，存在充要条件： 已知a,n,a\\ mod\\ n的乘法逆元存在的充要条件是gcd(a,n)=1 引入仿射加密：
/*
对于一个同时用到乘法和加法逆元的加密方法，我们可以称之为仿射加密
*/

对于一个密码需要知道哪一个逆元是存在的

在c中，%与mod是不同的，前者会存在负数的情况，如果需要mod，那么我们可以用如下等价操作


(a-b)\\text{ mod }n \\Leftrightarrow (a-b+n)\\%n

     这种做法又被称作是完美带模减法.      类似地，存在完美带模加法，使得结果不超过模本身. 3. 对于所有进行了以n为模的乘法的操作都需要注意加上%n的操作来保证结果不超过n
`,link:"/CS_related/Cryptography/lec1",is_index:!1,created:"2026-04-04T15:33:45+08:00"},{title:"Cryptography",content:"",link:"/CS_related/Cryptography",is_index:!0,created:"2026-04-04T15:33:45+08:00"}],r={keys:["title","content"],includeMatches:!0,ignoreLocation:!0,threshold:.4},i=e.parseIndex(o),a=new e(t,r,i),d=n=>n?a.search(n):t;export{d as default};
