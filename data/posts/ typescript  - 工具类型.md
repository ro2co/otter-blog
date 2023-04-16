---
title: Typescript 工具类型
date: 2020.7.21
tags: typescript
expert: nginx 是一个高性能的 HTTP（HTTPS） 和反向代理服务器。
---

typescript 的工具类型是 typescript 基础的内置工具函数，通过其实现方式和使用用例，可以一窥 typescript 的内部运行机制。本篇文章将带你通过对 `typescript` 常用内置工具的介绍。

typescript 的工具类型大部分是围绕着集合展开，所以从集合的概念出发，应该是一个不错的路径。

打开photoshop 选中两个闭合路径或在 figma 中选中两个section 后，可以看到有以下几个操作。



![](http://road2code.oss-cn-hangzhou.aliyuncs.com/blog/142851.png)

如上图所示，集合间的基本运算有四种：并集，差集，交集，补集。

## 并集









## 从NonNullable开始

NonNullable的意思是非空，即从传入的集合 T 中剔除掉 null, undefined 这些空元素。

我们怎么样才能描述出一个非空的集合呢，也许有人会想是不是我把所有非空的集合比如字符串、数字、布尔值等等做并集，不就是一个非空集合了么。这样做当然可行，但有些笨拙，简单的方法是从集合中去掉 null 和 undefined 即可。

![](http://road2code.oss-cn-hangzhou.aliyuncs.com/blog/025153.png)

源码中我们看到 NonNullable 的定义

```
type NonNullable<T> = T extends null | undefined ? Never : T
```

判断传入的范型 T如果是null 或 undefined，则返回 Never ， 如果不是，则返回类型本身。





T 集合中的值来自于 null ｜ 和 undefined 并且等于unefined 时，为 never ，否则

Required / Partial

Readonly/









