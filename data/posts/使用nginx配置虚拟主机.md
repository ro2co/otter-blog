---
title: 使用nginx配置虚拟主机
date: 2020.4.21
tags: nginx
expert: nginx 是一个高性能的 HTTP（HTTPS） 和反向代理服务器。
---

## Table of contents

nginx 是一个高性能的 HTTP（HTTPS） 和反向代理服务器。

在前端日常开发工作中，我们也经常会和 `nginx` 打交道，本文将详细介绍 `nginx` 的安装和使用方法，还有踩过的一些坑

### 安装

本文以centos7 为例，由于nginx 并不在默认的 yum 源中，所以直接输入 `yum install nginx` 是不能安装的，

所以，第一步是添加nginx 的源

```bash
$ sudo rpm -ivh http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm
```

运行成功后，再运行 ` yum install nginx`即可

### nginx 启动，重启与关闭

```bash
$ sudo systemctl enable nginx
$ sudo systemctl start nginx
$ sudo systemctl restart nginx
$ sudo systemctl reload nginx
```

nginx 启动后，此时由于centos 默认80端口是被 `firewalld` 屏蔽的，所以还需要配合 `firewalld` 来开启网络服务

### firewalld

 1.  查看想开的端口是否已开 # firewall-cmd --query-port=666/tcp    提示no表示未开
 2.  开永久端口号 firewall-cmd --add-port=666/tcp --permanent   提示    success 表示成功
 3.  重新载入配置  # firewall-cmd --reload    比如添加规则之后，需要执行此命令
 4.  再次查看想开的端口是否已开  # firewall-cmd --query-port=666/tcp  提示yes表示成功
 5.  若移除端口 # firewall-cmd --permanent --remove-port=666/tcp



### site-available 与 sites-enabled

include /etc/nginx/sites-enabled/*;
合理的做法是，先在 sites-available 下建立一个配置文件。然后在 sites-enabled 下使用 `ln`创建一个指向它的软链接。

这样做的好处是，当想禁用一个配置文件的时候，直接删除软链接即可

```bash
sudo ln -s /etc/nginx/sites-available/somename.com.conf /etc/nginx/sites-enabled/somename.com.conf
```



### nginx 与反向代理





### 使用301重定向 http 到 https

```
server {
    listen       80;
    server_name  hack520.com www.hack520.com;
    return 301 https://$server_name$request_uri;
}
```







遇到的坑

检查nginx.conf，找到 upstream 配置：

```nginx
upstream app_servers {
    server 192.168.100.1:8080;
}
```



### 原因
在网上搜索了一些资料，发现问题出在server name里面的下划线。有一篇很好的文章描述了类似问题：
 [Tomcat 竟然有 bug](https://mp.weixin.qq.com/s/A7j4lGshzfg2quE0Tzz8lQ) 
因此，去掉server name里头的下划线就可以了。

```nginx
upstream appservers {
    server 192.168.100.1:8080;
}

```







