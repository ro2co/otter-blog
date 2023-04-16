---
title: 安装golang版本管理工具
date: 2022.8.12
expert: 今天在做一个工具时，发现依赖包需要go1.18版本，之前使用的1.17。于是打算升级一下
tags: golang
---

## Table of contents

今天在做一个工具时，发现依赖包需要go1.18版本，之前使用的1.17。于是打算升级一下。

转念一想，过一阵遇到新的版本不是又要升级了，还是安装一个版本管理工具吧，一劳永逸。浏览了几个版本管理工具工具后，选择了

 **[https://github.com/voidint/g/](https://link.zhihu.com/?target=https%3A//github.com/voidint/g)**  这个工具。

## voidint/g 安装

安装方式很简单，只需要命令行里输入

```shell
curl -sSL https://raw.githubusercontent.com/voidint/g/master/install.sh | bash
```

另外一个细节是，如果是zsh 用户，需要解决全局命令 g 的冲突问题。将 zsh 的git 插件里的全局绑定注释掉就可以了

```
vi ~/.oh-my-zsh/plugins/git/git.plugin.zsh
# alias g='git'
```

修改zsh后，需要让 .zshrc 重新生效， `source ~/.zshrc`

ps： 有时候执行了这个命令后，仍然不能生效，此时退出终端，重新打开终端即可



## voidint/g 常用命令 

```bash
g ls-remote stable
# 查看远程稳定分支
g install 1.19
# 安装版本
g ls
# 查看本地安装版本
g use 1.19
# 使用版本
```



### 官方的解决方案：golang/dl

当然如果不需要多个版本，可以使用官方的方案**golang/dl**

我们可以直接通过安装普通软件包的方式来获取go的版本，运行下面的命令就可以了。

```
go get golang.org/dl/go1.17.3
```



