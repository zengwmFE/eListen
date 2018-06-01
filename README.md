## 基于Vue2.x    express4的手机端英语播放器

*初学vue，代码不够熟练，后期将会针对技术栈对代码更新*

### 源代码地址

[github](https://github.com/4lQuiorrA/eListen)地址

### 技术栈

+ vue2:采用vuex管理状态，实现状态共享，vuerouter实现路由管理

* axios:实现HTTP请求

* Express:使用express4的最新语法搭建服务器

* webpack： 自动构建化工具，除了vue-cli使用的部分，主要使用webpack的proxy配置跨域

* ES5 ES6：少部分使用ES6

* HTML5+CSS3:audio 语义化标签


### 图片预览

![text](https://github.com/4lQuiorrA/eListen/blob/master/myListenGifs.gif)

### 项目遇到的问题

__vuex的使用__

组件之间的状态共享

__数据的处理__

通过数据层，逻辑层完成对数据库的访问以及到最后将数据渲染到前端界面，一开始没有想好对数据的加载形式，到了后面要结束的时候，增加数据库的内容时发现，读取卡顿。

__项目结构的设计__

随着对vue的理解的加深，一开始的代码走向不理想，但是要改变的内容太多

__使用语言的类别__

项目使用的语言有的可以使用其他语言代替，增加代码的可读性。

### Build Setup

```
#install dependencies
npm install
#serve with hot reload at localhost:8080
npm run dev
#build for production with minification
npm run build
#build for production and view the bundle analyzer report
npm run build --report
#run unit tests
npm run unit
#run e2e tests
npm run e2e
#run all tests
npm test
```

### 关于代码问题可以联系

[邮箱](ming19940910@163.com)





