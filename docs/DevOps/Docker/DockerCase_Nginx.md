# Docker Case - Nginx基本部署



此为Docker实战系列之-部署Nginx服务器



## 简单的开始

首先我们尝试不涉及任何改动的部署docker nginx。



1. 下载Nginx镜像

`docker pull nginx`

2. 启动Nginx容器

`docker run -itd -p 80:80 nginx`

> 此处使用了命令:
>
> -i 允许对容器内的标准输入进行交互
>
> -t 在新容器内指定一个伪终端
>
> -d 让容器在后台运行
>
> -p 指定绑定端口 -p [127.0.0.1:]5001:5000[ /tcp|udp]（容器中的5000绑定到主机上的5001）

3. 访问 http://localhost



大功告成！ 这时，你就已经部署了一个最简单的Nginx服务器。



## 静态网站配置

当启动了上面这个简单的容器后，我们可以访问到nginx的默认页面了。这时，就自然而然的想问：怎么配置能将自己的网站运行起来呢？

这里我们以最简单的静态网页为例（就以本博客为例吧）；至于nginx配置方面，也只涉及最简单的相关配置，复杂高级点的配置，请关注"服务器专题-Nginx相关文章"。

我们现在关注这几个基本点：

+ 配置文件 (nginx.conf & conf.d/default.conf)
+ 静态文件存放在哪
+ log文件



我们需要进入Nginx容器，查看这些文件在容器中的存放路径，如下便是我的官方Nginx镜像启动的容器的路径:

+ 配置文件：/etc/nginx/nginx.conf & /etc/nginx/conf.d/default.conf
+ 默认html文件夹：/usr/share/nginx/html
+ 日志文件路劲：/var/log/nginx



了解了上面的信息之后，我们就可以开始部署网站了。

此时，有两种方案：

<br />

<font style="font-weight:600">方案1：在容器内操作</font>

此方案就是直接进入容器去修改配置文件，然后将本地静态文件copy到容器内的html文件夹下，最后使用上文中最简单的容器启动命令，这样一个静态网站就部署成功了！(当然一般log还是要外置的)

这样做的一个缺点就是，每次部署、修改配置都需要进入容器操作，比较繁琐，所以从开发角度，还是比较推荐下面的方案2。但是从另一个角度来看，这样做的好处就是所有的配置什么的都封装到了容器，可以保持环境的绝对一致，方便后续的测试，上线。

<br />

<font style="font-weight:600">方案2：映射到本地文件夹</font>

就是将nginx的几个目录map到本地的文件夹，之后所有的改动都在本地进行。适合开发调试阶段。

在这之前，首先要在本地创建相关目录：

> /conf.d
>
> /html
>
> /logs
>
> nginx.conf

然后将博客(Vuepress项目)build出来的`/dist`文件夹下的所有文件copy到上面的`/html`文件夹下。

最后，运行如下命令：

```sh
docker run --name nginx_demo -itd -p 80:80 \
  -v `pwd`/html:/usr/share/nginx/html \
  -v `pwd`/nginx.conf:/etc/nginx/nginx.conf \
  -v `pwd`/conf.d:/etc/nginx/conf.d \
  -v `pwd`/logs:/var/log/nginx \
  nginx
```

此时就可以访问你的网站了！	http://localhost



## 总结

本文介绍了Docker下Nginx的基本部署。在实际使用中，可能会涉及更多的nginx本身的配置。