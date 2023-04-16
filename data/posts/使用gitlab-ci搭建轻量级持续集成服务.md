---
title: 使用gitlab-ci搭建轻量级持续集成服务
date: 2019.1.10
tags: devops
layout: single
---



## Table of contents

## 前言

对于不少公司而言，使用的持续集成方案大多是传统的 jenkins 或者自建CI流程，jenkins 生态全面，功能强大，然而对于一些小项目来说，使用 jenkins 方案会比较复杂，而且需要一定的硬件成本，搭建起来也比较繁琐。现在介绍一种灵活而且轻量级的持续集成方案：gitlab-ci。

## 前置工作

### 一台服务器  用来安装gitlab-runner 

### gitlab 服务器

可以使用免费的 gitlab.com 作为gitlab 服务

也可以自己搭建一个 gitlab 服务器



## 安装gitlab-runner

gitlab-runner 对硬件配置要求不高，4G树莓派上也可以用，树莓派上需要安装的是arm 版，先下载安装包

```shell
curl -LJO https://gitlab-runner-downloads.s3.amazonaws.com/latest/deb/gitlab-runner_armhf.deb
```

如果你的服务器是x86 或者amd ，可以使用下面的命令来下载

```shell
# Linux x86-64
sudo wget -O /usr/local/bin/gitlab-runner https://gitlab-runner-downloads.s3.amazonaws.com/latest/binaries/gitlab-runner-linux-amd64

# Linux x86
sudo wget -O /usr/local/bin/gitlab-runner https://gitlab-runner-downloads.s3.amazonaws.com/latest/binaries/gitlab-runner-linux-386
```

下载下来以后，安装然后重启

```shell
sudo dpkg -i gitlab-runner_armhf.deb
sudo reboot
```

重启后运行 `sudo gitlab-runner status`  ，显示 `gitlab-runner: Service is running!` 证明安装成功。



## 注册 gitlab-runner 

启动gitlab-runner 后，我们还需要注册这个runner，输入 `sudo gitlab-runner register` 命令，提供了一个交互式方式来注册 runner

```shell
1，Please enter the gitlab-ci coordinator URL (e.g. https://gitlab.com/):

2，Please enter the gitlab-ci token for this runner

3，Please enter the gitlab-ci description for this runner

4，Please enter the gitlab-ci tags for this runner (comma separated):
my-tag

5,Please enter the executor: ssh, docker+machine, docker-ssh+machine, kubernetes, docker, parallels, virtualbox, docker-ssh, shell:
 shell
```

如何找到用于注册的token 呢，先来了解一下 gitlab 所使用的 runner。通过以下步骤进入runner 设置界面，

```shell
Settings -> CI/CD -> Runners -> Expand
```

如图所示，runner 可以分为3种，

1，安装在kubernetes 集群上的runner

2，安装在单独主机上的runner

3，共享的runner

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gdyxm8qjlpj316f0u0n5w.jpg)

这里我们使用的是第二种，然后这儿显示出了我们需要输入的 url 和 token 。

注册成功后，回到 Specific Runners，就可以看到在自己的服务器上安装的 gitlab-runner，现在我们可以使用它来跑 gitlab-ci 配置文件里的作业了。

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gdyxri57ljj30p60aajs4.jpg)

## github 项目如何使用 gitlab-ci

gitlab-ci 很方便很实用，但如果我们的项目放在 github 上，如何使用gitlab-ci 呢，当然也是支持的，只需要在g tlab 上建一个中转 repo 即可

现在我们用 create-react-app 在本地建立一个 gitlab-ci-demo ，然后推到 github 上，然后到 gitlab 点击` new project` 号 

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gdz2z954h9j313809at9c.jpg)



选择CI/CD from external repo，点击 github 按钮

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gdz2pt66qdj31yw0qgtfy.jpg)



在新打开的页面中找到 这个repo ，然后点击 connect ，

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gdz7cqeb2yj31yc04ijso.jpg)

几分钟后，连接完成后

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gdz3b8gqp7j31i203qwey.jpg)



## gitlab-ci  配置文件

现在已是万事具备，还需要配置一个最为重要的 .gitlab-ci.yml文件，这是gitlab-ci 编排pipeline 和 Jobs 的核心。我们在 gitlab-ci-demo 项目根目录下新建一个.gitlab-ci.yml ，然后 commit 到 github 。

```YAML
cache:
    paths:
    - node_modules/
    - build/
stages:
    - test
    - build
    - deploy
test:
    stage: test
    script:
        - echo "test stage"
        - npm install
        - npm run test
    tags:
        - pers
build:
    stage: build
    script: 
        - echo "build stage"
        - npm run build 
        - pwd
        - ls
    tags:
        - pers

deploy:
    stage: deploy
    script: 
        - echo "deploy stage"
    tags:
        - pers
```

提交到github 后，会触发gitlab 的webhooks，此时进入gitlab 的Pipelines ，可以看到会自动项目里的 pipeline 已经开始构建

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gdz4aiczmfj311e09ejs2.jpg)



本篇介绍 gitlab-ci 的搭建和基本用法，gitlab-ci 还有许多高级技巧，基本能覆盖简单和中等复杂的项目持续交付需求，后面会展开介绍。


## 本篇文章中需要注意的事项

### Jobs 显示pending 

可能的原因一个是没有安装git

还有一个原因可能是没有使用 gitlab-ci 的 tag 功能

### 报错：No such file or directory

ERROR: Job failed: exit status 1

删除掉 gitlab-runner 用户下 .bash_logout 文件即可解决

### 前端项目需要设置缓存

因为运行每一个 jobs 的时候，都会删除 .gitignore 里的文件

通常需要设置 node_modules 和 build 文件为缓存


gitlab-runner 文档： https://docs.gitlab.com/runner/
参考1：https://juejin.im/post/5d074d3c6fb9a07ece67d034#heading-9
参考2:   https://juejin.im/post/5cb92a3ae51d456e5f76c485
参考3:   https://angristan.xyz/2018/09/using-gitlab-ci-with-github/
参考4:   https://blog.sebastian-martens.de/technology/install-gitlab-runner-on-raspberry-pi

