---
title: 如何在树莓派上搭建wordpress博客
date: 2020.5.10
tags: wordpress devops
---
近日，看到一个vlog up博主，将自己的博客安装在树莓派上，刚好前不久才入了一个树莓派4g，于是也想尝试一下。下文是折腾的经历，还是有些一波三折，用文章记录一下。

首先需要在树莓派上安装 `docker` 、`docker-compose` ，`docker` 的安装方式和 x86 平台下安装相同，所以此处不做赘述，而安装 `docker-compose` 的时候却遇到了一波三折。（本文安装采用的系统是 ubuntu18.04-server-pi ，硬件是树莓派4b）

### `docker-compose`安装

我们在官方文档上，并没有看到官方发布的arm 平台上的软件包，然后查阅相关资料，介绍都是需要使用pip 来安装。所以首先我们需要python 和 pip环境 

```
apt-get update && apt-get install -y python python-pip
```

还需要安装 `libffi-dev` 依赖库

```
apt-get install libffi-dev
```

如果不安装libffi-dev的话，接下来在安装docker-compose的时候会报错，提示找不到ffi.h文件，错误信息如下

```shell
aarch64-linux-gnu-gcc -pthread -DNDEBUG -g -fwrapv -O2 -Wall -Wstrict-prototypes -fno-strict-aliasing -Wdate-time -D_FORTIFY_SOURCE=2 -g -fdebug-prefix-map=/build/python2.7-md9kAN/python2.7-2.7.16=. -fstack-protector-strong -Wformat -Werror=format-security -fPIC -DUSE__THREAD -DHAVE_SYNC_SYNCHRONIZE -I/usr/include/ffi -I/usr/include/libffi -I/usr/include/python2.7 -c c/_cffi_backend.c -o build/temp.linux-aarch64-2.7/c/_cffi_backend.o
    c/_cffi_backend.c:15:10: fatal error: ffi.h: No such file or directory
     #include <ffi.h>
              ^~~~~~~
    compilation terminated.
    error: command 'aarch64-linux-gnu-gcc' failed with exit status 1
```

运行安装命令 `pip install docker-compose`，安装完成后，运行 `docker-compose version`

却提示 `command not found`，docker-compose 提示是已经成功安装了的，所以这里应该是环境变量没有设置正确导致的。所以此时需要先设置环境变量，在用户主目录下，在 `.bashrc` 或 `.zshrc` 里增加一行

```
 export PATH=$PATH:~/.local/bin
```

运行`source ~/.zshrc` 后运行`docker-compose version` ，这次没有提示 `command not found` 了，但依然报错，提示找不到 `No module named ssl_match_hostname`

```shell
  File "/usr/local/lib/python2.7/dist-packages/docker/tls.py", line 5, in <module>
    from .transport import SSLHTTPAdapter
  File "/usr/local/lib/python2.7/dist-packages/docker/transport/__init__.py", line 3, in <module>
    from .ssladapter import SSLHTTPAdapter
  File "/usr/local/lib/python2.7/dist-packages/docker/transport/ssladapter.py", line 23, in <module>
    from backports.ssl_match_hostname import match_hostname
ImportError: No module named ssl_match_hostname
```

此时我们还需要一步操作，进入`site-packages`目录，拷贝`backports` 到 `~/.local/lib/python2.7/site-packagesdocker/transport` 目录下

```
cd ~/.local/lib/python2.7/site-packages
cp -r backports ~/.local/lib/python2.7/site-packages/docker/transport/
```

拷贝完后，运行`docker-compose` 报另外一个奇怪的错误，`No module named shutil_get_terminal_size`，报错如下：

```shell
Traceback (most recent call last):
  File "/home/pi/.local/bin/docker-compose", line 6, in <module>
    from compose.cli.main import main
  File "/home/pi/.local/lib/python2.7/site-packages/compose/cli/main.py", line 52, in <module>
    from .formatter import ConsoleWarningFormatter
  File "/home/pi/.local/lib/python2.7/site-packages/compose/cli/formatter.py", line 15, in <module>
    from shutil_get_terminal_size import get_terminal_size
ImportError: No module named shutil_get_terminal_size
```

但实际上这个依赖是已经安装了的，翻了很多篇文档，发现解决方案居然是安装另外一个包 `ipython`。

```
sudo apt install ipython
```

终于，docker-compose 安装成功，

```
$ docker-compose version
docker-compose version 1.25.5, build unknown
docker-py version: 4.2.0
CPython version: 2.7.16
OpenSSL version: OpenSSL 1.1.1d  10 Sep 2019
```

### 编写 docker-compose.yml

打开之前一个常用的一个 docker-compose 文件，运行 `docker-compose up`，然而却报错了，提示没有相应适配 arm 的镜像版本。

`no matching manifest for linux/arm/v7 in the manifest list entries`

于是想从头制作一个 可以在树莓派上跑的docker stack，顺便重新温习一下编排 docker-compose 。

在docker-hub上 找到mysql 对应的arm版本 [hypriot/rpi-mysql](hypriot/rpi-mysql)，wordpress 对应的arm 版本[arm32v7/wordpress](https://hub.docker.com/r/arm32v7/wordpress)，

新建一个目录，并使用git 初始化

```
mkdir pi-wordpress-docker && cd pi-wordpress-docker
git init
```

在根目录下，新建一个 .gitignore 文件，里面写入

```
.env
/www-data
/mysql-data
```

再编辑 .dockerignore. 文件，写入下面内容

```
.env
.git
docker-compose.yml
.dockerignore
```

然后开始编辑 `docker-compose.yml`，在文件里写入两个服务 `db` 和 `wordpress`，和相关的配置

```yaml
version: '2'
services:
  db:
    image: hypriot/rpi-mysql
    container_name: db
    environment:
      - MYSQL_ROOT_PASSWORD=examplepass
      - MYSQL_DATABASE=wordpress
    ports:
      - "3306:3306"
    networks:
      - wp-network
    volumes:
      - ./mysql-data:/var/lib/mysql
      
  wordpress:
    depends_on: 
      - db
    image: arm32v7/wordpress
    container_name: wp
    environment: 
      - WORDPRESS_DB_HOST=db
      - WORDPRESS_DB_USER=root
      - WORDPRESS_DB_PASSWORD=examplepass
      - WORDPRESS_DB_NAME=wordpress
    ports:
      - "8000:80"
    networks:
      - wp-network
    volumes:
      - ./www-data:/var/www/html
networks:
  wp-network:
    driver: bridge
```

完成 docker-compose 文件后，运行 `docker-compose up` ，然后访问树莓派的局域网ip  `http://192.168.50.111:8080`  ，就可以看到熟悉的wordpress 安装界面啦 ！！
