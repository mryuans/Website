---
title: websiteGuide 
displayTitle: Build up the website 
comment: false
timestamp: false
---

::fold{expand always title="提示" warning}
注意：框架仍处于开发早期，存在很多尚未解决以及未知的bug，请慎重使用此框架。
::




## 快速上手
本项目使用node.js框架下的vue3-vite框架组合，需要安装node.js与npm进行项目网站管理，下载参考网站框架可以使用如下命令：
```sh
$git clone --recursive http://github.com/Xecades/Note.git
```
使用`recursive`选项是为了下载网站框架使用的自定义vite插件（尚未上传npm）[vite-plugin-vue-xecades-note](https://github.com/Xecades/vite-plugin-vue-xecades-note/tree/28f148872f952ddc497de823391d1f49fe06f653)

使用npm管理器下载即可：
```sh
$npm install
```
::fold{expand always title="提示" warning}
这里指出一个当前存在的问题：当正常从github下载代码项目后，安装完毕之后会发现出现`TypeError: localStorage.getItem is not a function`报错，而这是由于当前使用的`vite-plugin-vue-devtools`插件版本较为落后，提升至7.7.9版本可以解决该问题：
```sh
$npm install vite-plugin-vye-devtools@7.7.9
```
::
由于目前插件处于前期阶段，没有预先编译放在github上，需要下载上述文件之后在`Note/packages/vite-plugin-vue-devtools`文件夹中执行编译指令：
```sh
$npm run build
```
随后回到`Note`文件夹使用如下指令即可启动服务：
```sh
$ npm run dev # 启用调试模式
$ npm run build # 编译整个项目
$ npm run preview # 启动预览，此模式无法进行热补丁修改
```









