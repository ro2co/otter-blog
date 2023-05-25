---
title: 'Vim 报错 Nothing in register'
date: '2021-2-12'
tags: 'neovim, nodejs'
expert: '复制多行内容后，使用 p 复制时，出现 Nothing in register'
---

###title
复制多行内容后，使用 p 复制时，出现 Nothing in register " 的提示
我们知道，默认复制的内容存放的位置就是 "剪切板，然而使用reg 命令查看剪切板内容， "剪切板里并不是空的，里面存放的正是刚刚复制的内容。那究竟是什么原因呢

网上搜寻半天无果，很多答案都是这样的，
```bash
set clipboard=unnamed
```
然而这个解决方法并不能解决我的问题，因为我使用 `:ls` 是可以看到"register 明显里面是存放有内容的，而不是空的
一开始我怀疑是内容太长导致的，直到又一次无意中使用这个功能，发现纯英文字符下，无论多长都是可以复制的，然后假如一行句子里有中文字符，那么就会出现 Nothing in register
此时我才感觉可能是编码的问题，顺着这个思路，终于找到了解决方法,在vim配置里，加入下面编码设置即可
```bash
set langmenu=en_US.UTF-8
```

