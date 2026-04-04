---
title: MainStructure
displayTitle: Outline of the project
comment: false
---

本项目是vue3 vite架构搭建，主要的启动路线符合vite服务启动的基本逻辑：

::fold{expand always title="Startup logic" success}
```
    main.js/ts 启动，作为主入口导入一系列库与字典，锚定vue文件 ->
    App.vue 启动第一层外部 ->
    index.html 接收App.vue嵌入框架
```
::


实际上本框架的逻辑是这一个逻辑的衍生，存在许多内部嵌套，本篇文档用于说明这件事情
### 嵌套结构
看到App.vue的结构：
::fold{expand title="App.vue" info}
```html
<template>
    <div id="main" v-if="meta">
        <LeftBar :status="left_stat" :current-category="meta.category" />
        <Content :meta="meta" />
        <RightBar :status="right_stat" :toc="meta.toc" />
        <!--    <Logo /> -->
    </div>
</template>
```
::

在第一层框架下，插入了`<LeftBar> <RightBar> <content>`三个组件，前两者负责网站的左右装饰与导航，后者是第二层框架:
::fold{expand title="Content.vue" info}
```html
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
```
::
`content.vue`中定义了标题行，metadata标签，这个部分通过调用利用md解析得到的路由数据`route.tsx`来获取许多元数据，main标签内部定义了由markdown文件主要部分content产生的页面主要内容
> 有关markdown文件解析的逻辑会在后续文档中补上

另外还有timestamp标签和comment标签定义了一个页面当前的文档文件创建，更新时间与评论栏，这一部分可以在md文件中的front-matter中设定false与true选项来关闭

最后就是footer标签定义了每一个页面的页脚信息

那么以上就是该项目的主要页面框架，从上面的介绍中可以了解到所有能看到的元素的出处，需要进一步了解只需要了解标签中的代码实现即可

