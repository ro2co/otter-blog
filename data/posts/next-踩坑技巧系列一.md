---
title: next 踩坑技巧系列一
tags: nextjs
date: 2022.8.12
expert:  本篇文章总结nextjs 中的一些开发技巧和容易踩到的坑
---



## Table of contents



本篇文章总结nextjs 中的一些开发技巧和容易踩到的坑



## nextjs 不能自动刷新



nextjs 开发中不能热更新，每次修改都要重启 `next`才能生效。因为有很多前端框架启动开发环境，使用的是npm start

所以这里有一个很容易混淆的命令，开发时使用 `npm run dev` （next dev） 命令，而不是 `npm start ` （next start）



## nextjs 页面重定向

比如博客类网站，访问首页后，希望自动跳转到博客栏目。

### 类组件

```javascript
import Router from 'next/router'

componentDidMount(){
    const {pathname} = Router
    if(pathname == '/' ){
       Router.push('/hello-nextjs')
    }
}
```

### hook 组件

```javascript
import React, { useEffect } from "react";
import Router from 'next/router'

...
useEffect(() => {
   const {pathname} = Router
   if(pathname == '/' ){
       Router.push('/hello-nextjs')
   }
});
```

当然，还可以在 `next.config.js` 里配置

```js
module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/blog',
        permanent: false,
      },
      {
        source: "/blog",
        destination:
          "https://blog.outside.com",
        permanent: true,
      },
    ];
  },
};
```



## getStaticProps 只能在 page 类组件中使用

pages 目录下页面组件，才能使用 getStaticProps 函数，相应的 ， fs path 等node环境下才能使用的包也只能在页面组件的 getStaticProps下使用，其他比如 layout 、components 类型的组件。

如果一定要使用，可以使用其他方式曲线救国，比如本博客的search 功能，在header 组件中，需要读取缓存文件 search.json，那么在访问其他页面时，使用 `fs.writeFile`生成一个文章的缓存文件,然后在 header 组件里导入。





### 一个奇怪的问题

![](http://road2code.oss-cn-hangzhou.aliyuncs.com/blog/075111.png)

第一反应是，是不是哪篇文章的 title 被置空了，看控制台，

一个程序健壮性错误

```typescript
export async function getStaticProps() {
  const files = fs.readdirSync(join('posts'));
  const posts = files.map((filename)=> {
    const markdownWithMeta = fs.readFileSync(join("posts", filename), 'utf-8')
    const {data: metaPosts} = matter(markdownWithMeta)
    metaPosts.slug = metaPosts?.title.replaceAll(" ", "-")
    return metaPosts;
  })
  return { props: { metaPosts: posts} };
}
```





### mdx 文档中定义的变量无法识别

![](http://road2code.oss-cn-hangzhou.aliyuncs.com/blog/083838.png)

处理mdx 和 md 有所不同



出bug 了，原因居然是缓存文件，看来健壮性不足

![](http://road2code.oss-cn-hangzhou.aliyuncs.com/blog/154801.png)

