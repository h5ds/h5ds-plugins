# h5ds-plugins

H5DS插件开发脚手架

# 文档库

请使用以下UI库开发插件

H5DS-UI [https://ui.h5ds.com/](https://ui.h5ds.com/)

ant.design [https://ant.design/](https://ant.design/)

插件开发文档 [https://www.yuque.com/mantou-i2rrf/yxshrp/up1lv0](https://www.yuque.com/mantou-i2rrf/yxshrp/up1lv0)

# 如何使用脚手架？

1、 npm install 安装依赖包

2、 npm start 启动项目

3、默认写了一个插件示例： `plugins/demo`

# 插件原理

插件由两部分组成，共用一个数据（LayerJSON.js）：

【1】、视图区代码 Layer.js

【2】、编辑区代码 Editor.js

在`Editor.js`中可以直接修改json数据（`this.props.layer`），然后执行`this.props.editor.updateCanvas()`会自动更新视图。

具体可以参考插件代码：[demo插件代码](https://h5ds-cdn.oss-cn-beijing.aliyuncs.com/doc/demo.png)

# DEMO插件调试使用

![avatar](https://h5ds-cdn.oss-cn-beijing.aliyuncs.com/doc/demo.png)
