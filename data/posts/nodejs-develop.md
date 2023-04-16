---
title: 'nodejs develop'
date: '2021-2-12'
tags: 'neovim, nodejs'
expert: '复制多行内容后，使用 p 复制时，出现 Nothing in register'
---

###title
复制多行内容后，使用 p 复制时，出现 Nothing in register " 的提示
我们知道，默认复制的内容存放的位置就是 "剪切板，然而使用reg 命令查看剪切板内容， "剪切板里并不是空的，里面存放的正是刚刚复制的内容。那究竟是什么原因呢

网上搜寻半天无果，最后只好打开配置文件，仔细查看与剪切板相关的内容，有一个 macos.vim 里面设置了如下配置，从文件名可以看出这个是一个专门针对苹果系统的配置，

