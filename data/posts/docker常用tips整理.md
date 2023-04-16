---
title: docker常用tips整理
date: 2020-1-23
tags: docker
---



## Table of content



## 配置 docker 开机自动启动

部署在ecs 上的docker应用，可能会因为服务器的重启后导致 docker未启动，所以需要配置 docker 开机自动启动

```bash
$ systemctl enable docker
```



## 查看docker 系统资源占用情况

```bash
$ docker system df
```

占用资源过大时，可以使用 `docker system prune` 清理docker build 留下的缓存



## docker  add 和 copy 的区别

1，ADD比COPY命令更强大：
2，如果文件是压缩包的话，会自动解压缩。
3，参数可以是远程文件（URL的形式）.



## docker  run 和 cmd 的区别

`dockr run`作用于构建的时候，当构建镜像时，docker 会读取 run 命令，并将它作为一个独立的层，构建到你的镜像里

而 docker cmd 作用于运行的时候，它会调用某些进程来运行，比如nginx 、bash 等

dockrfile里通常有多个 run 指令，而最多只有一个 cmd



## 使用非root 账号运行docker

```bash
$ sudo groupadd docker
$ sudo gpasswd -a myusername docker
$ sudo service docker restart
$ exit
```



### 查看docker 容器的ip地址

```bash
$ ip -4 -o addr show eth0
2: eth0 inet 162.243.139.222/24
$ docker run ubuntu ip -4 -o addr show eth0
149: eth0 inet 172.17.0.43/16

```



## docker 容器添加宿主机ssh key

```bash
docker run --rm -it -v ~/.ssh:/root/.ssh:ro alpine
```

注意添加 `ro` 设置为只读，防止被覆盖或修改



## 可视化查看docker 镜像依赖

```bash
# 生成依赖图
$ docker images -viz | dot -Tpng -o docker.png
#启动一个http-server 查看
http-server -p 8080
```



## 使用dockerfile 而不是 docker commit 

```bash
$ docker run -i -t ubuntu bash
root@db0c3978abf8:/# apt-get install postgresql -y
root@db0c3978abf8:/# exit
$ docker commit -run='{"Cmd":["postgres", "-too -many -opts"]}' `dl` postgres
#命令很长，容易出错，ugly
# 不如编辑 dockerfile，使用t CMD, ENTRYPOINT, VOLUME, etc.
```



## 使用 root 进入容器

```bash
# Here's how to do it with Docker Compose:
$ docker-compose exec -u root [SERVICE] bash

# Here's how to do it with Docker:
$ docker container exec -it -u root [CONTAINER] bash
```





