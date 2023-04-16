---
title: babel 使用总结
date: 2021-9-12
catagory: neovim
tags: babel
layout: single
---



## Table of contents


鉴于 react 已经开始推荐 es6 的写法，所以打算把es6用到开发中。要写es6， 第一个绕不掉的肯定是bable了，因为目前的浏览器，即使是开启版本竞赛之风的 chrome 对于es6 的语法也并不能完全支持，所以你需要用 bable 来翻译这门来自未来 js 世界的语言，才能让你的代码跑起来。


#### babel 和 babel-cli 






## 主翻译官 babel-core
如果某些代码需要调用Babel的API进行转码，就要使用`babel-core`模块。babel-core 还有一个功能是提供浏览器环境的转换器脚本，（browser.js`（未精简）和`browser.min.js）注意：从Babel 6.0开始，不再直接提供浏览器版本，而是要用构建工具构建出来。如果你没有或不想使用构建工具，可以通过安装5.x版本的`babel-core`模块获取。

``` 
$ npm install babel-core@5
```

@babel/node  与@babel-cli的区别

### @babel/cli
会自带一个`babel-node`命令,  babel-node
```json
{  
  "scripts": {  
    "script-name": "babel-node script.js"  
  }  
}
```
### @babel/node
由于 nodejs对es的支持还不够完善，对于(import，export)，类(class)和修饰器(Decorator)等模块化语法还不支持，在node 上实现

而运行 babel-node 可以进入支持 es6 语法的repl，直接调试 es6 语法的代码
也可以 babel-node bar.js


### babel-polyfill

Babel默认只转换新的JavaScript句法（syntax），而不转换新的API，比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（比如`Object.assign`）都不会转码。

举例来说，ES6在`Array`对象上新增了`Array.from`方法。Babel就不会转码这个方法。如果想让这个方法运行，必须使用`babel-polyfill`，为当前环境提供一个垫片。一般会在文件的头部这样引入

`require('babel-polyfill')`


@babel/preset-env


## babel插件 （翻译手册）

我们的翻译官虽然能力非凡，但是却很健忘，出门要带各种翻译手册、红宝书等。这些就是.babelrc 里面定义的各种翻译规则。各种宿主环境以及宿主的各个版本，对 es6 的支持不以，所以 babel 用项目的根目录下的`.babelrc` 配置文件来设置开启的语法特性集合，比如

``` 
{
  "presets": ["es2015", "stage-0"]
}
```

然后引入依赖的插件，执行以下命令安装并保存到`package.json`的`devDependencies`中：

`$ npm i babel-preset-es2015 babel-preset-stage-0 --save-dev`

在 gulp-babel 里面可以这样用

``` javascript
gulp.task('babel',function(){
	gulp.src('src/*.js')
	.pipe(babel({
			presets: ['es2015']
		}))
	.pipe(gulp.dest('lib/'))
})
```

babel命令依赖 .babelrc 手册来工作，gulp 或者 browserfy 则把这个文件直接当做参数传进 babel 任务里面去。 

其他翻译手册

``` shell
# ES2015转码规则
$ npm install --save-dev babel-preset-es2015

# react转码规则
$ npm install --save-dev babel-preset-react

# ES7不同阶段语法提案的转码规则（共有4个阶段），选装一个
$ npm install --save-dev babel-preset-stage-0
$ npm install --save-dev babel-preset-stage-1
$ npm install --save-dev babel-preset-stage-2
$ npm install --save-dev babel-preset-stage-3
```



### 其他翻译手册

- transform-strict-mode （由于很多 ES 特性需要 严格模式才能打开， 添加这个插件就会自动在所有文件上添加 `'use strict';`）
- transform-es2015-modules-commonjs （将 ES6 模块标准 转换成 Node.js 用的 CMD 模块标准）
- transform-es2015-spread （支持 [ES6 的 spread 操作符](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator)）。
- transform-es2015-parameters （支持默认参数， 参数解构， 以及其他参数）
- babel-plugin-add-module-exports




[编译TS 代码用TSC 还是Babel？-51CTO.COM](https://www.51cto.com/article/706106.html)


#blog
