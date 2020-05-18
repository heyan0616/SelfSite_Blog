# Docker - 进入容器的方式

顾名思义就是当我们创建容器后，如何进入容器，完成我们需要的操作，之后封装成新的镜像文件供后续使用。

网上描述，有至少四种方式进入容器，但大部分已经弃用或不实用，这里就不都做介绍了，主要讲两种方法。



#### 1. 使用docker attach进入Docker容器

Docker提供了attach命令来进入Docker容器。

`sudo docker attach xxxxx`

这样就可以了，但是当多个窗口同时使用该命令进入容器时，所有的窗口会同步显示。一个阻塞了，所有的窗口都不能使用了。而且这个命令有点老，不建议在生产环境使用，个人开发时可以。



#### 2. **使用docker exec进入Docker容器**

docker在1.3.X版本之后还提供了一个新的命令exec用于进入容器，这种方式相对更简单一些，是目前最常用的方法。

```sh
hy_mac:.docker heyan$ docker exec --help

Usage:	docker exec [OPTIONS] CONTAINER COMMAND [ARG...]

Run a command in a running container

Options:
  -d, --detach               Detached mode: run command in the background
      --detach-keys string   Override the key sequence for detaching a container
  -e, --env list             Set environment variables
  -i, --interactive          Keep STDIN open even if not attached
      --privileged           Give extended privileges to the command
  -t, --tty                  Allocate a pseudo-TTY
  -u, --user string          Username or UID (format: <name|uid>[:<group|gid>])
  -w, --workdir string       Working directory inside the container
```

具体使用如下：

```sh
docker exec -it xxxxxx /bin/bash 
```

