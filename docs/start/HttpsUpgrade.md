# 网站https相关

之前，网站是http访问的，鉴于目前主流安全的需求，基本所有网站都已经使用https，那也来尝试下吧。本文首先介绍如何从阿里云申请证书，然后如何升级服务器配置。



## 阿里云申请SSL证书

进入阿里云控制台，搜索“证书服务”，选择SSL证书，进入界面：

<div style="display:flex;"><img src="./images/https-1.jpg" alt="" style="display:block;" align="left"/></div>

点“选购证书”

<div style="display:flex;"><img src="./images/https-2.jpg" alt="" style="display:block;" align="left"/></div>

选择个人免费版后，然后立即购买。

购买后进入证书控制台界面， >然后根据提示补全个人信息后，>最后提交申请。

几分钟后，证书显示“已签发”

<div style="display:flex;"><img src="./images/https-3.jpg" alt="" style="display:block;" align="left"/></div>

最后点击下载，选择Nginx

<div style="display:flex;"><img src="./images/https-4.jpg" alt="" style="display:block;" align="left"/></div>

下载解压后，会看到两个文件 （一个.key文件，一个.pem文件）



## 网站http升级

目前由于我们单独部署了主页homepage和博客，所以需要都升级一下。



### Homepage升级

1. 在/conf.d文件夹下创建cert文件夹，然后将证书文件copy进去（当然也可以在最外层新建/cert文件夹。。此处图方便，用已有的文件夹存放）

   <div style="display:flex;"><img src="./images/https-5.jpg" alt="" style="display:block;" align="left"/></div>

2. 修改default.conf配置文件

   ```yaml
   server {
       listen       443 ssl;
       server_name  heyan.site;
       ssl_certificate  /etc/nginx/conf.d/cert/xxxxxx_heyan.site.pem;
       ssl_certificate_key /etc/nginx/conf.d/cert/xxxxxx_heyan.site.key;
       ssl_session_timeout 5m;
       ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
       ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
       ssl_prefer_server_ciphers on;
   
       #charset koi8-r;
       #access_log  /var/log/nginx/host.access.log  main;
   
       location / {
           root    /usr/share/nginx/html;
           index   index.html index.htm;
       }
       error_page   500 502 503 504  /50x.html;
       location = /50x.html {
           root   /usr/share/nginx/html;
       }
   }
   server {
       listen 80;
       server_name heyan.site;
       rewrite ^(.*)$ https://$host$1 permanent;
   }
   ```

   >这里最后的配置是通过rewrite方式把所有http请求也转成了https请求，更加安全，这样所有的http请求就会自动转成https

3. 上传default.conf文件到云服务器

4. 停止并删除原来的容器（需要重建容器来映射新的ssl端口）

   ```sh
   docker stop nginx_homepage
   docker rm nginx_homepage
   ```

5. 基于nginx镜像，新建容器 (注意映射443端口)

   ```sh
   docker run --name nginx_homepage -itd -p 443:443 -p 80:80 
   -v `pwd`/html:/usr/share/nginx/html 
   -v `pwd`/nginx.conf:/etc/nginx/nginx.conf 
   -v `pwd`/conf.d:/etc/nginx/conf.d 
   -v `pwd`/logs:/var/log/nginx 
   nginx
   ```



现在就可以https访问了！



### Blog升级

但此时，跳转到博客的链接还是http的，需要进行同样的改造。

想想之前访问博客时，使用的是http://heyan.site:8001端口，此时，期望不改动其他部分，只是将http换成https。所以，步骤应该是

1，2，3步 应该是和上面homepage升级是一样的

第4步，删除 nginx_blog即可

5. 创建容器时，需要改成如下 - 所以当访问https:heyan.site:8001其实访问的是容器443端口

   ```sh
   docker run --name nginx_blog -itd -p 8001:443 -p 8002:80 
   -v `pwd`/html:/usr/share/nginx/html 
   -v `pwd`/nginx.conf:/etc/nginx/nginx.conf 
   -v `pwd`/conf.d:/etc/nginx/conf.d 
   -v `pwd`/logs:/var/log/nginx 
   nginx
   ```

   （当然，这里没用到8002端口。。）



### **测试**

https://heyan.site/

https://heyan.site:8001/

<br/>

<br/>

<br/>

<font color="orange" style="font-weight:600;font-size:20px">------ Some updates ------</font>

## Nginx配置https转http

最新由于主页上需要axios调用外部http api接口，ajax限制，不能跨域调用，所以之前的https主页需要改成http的。但考虑到很多地方已经hardcode了https链接，所以希望在nginx配置，将https请求自动转到http上。具体在`conf.d\default.conf`添加如下配置：

``` yaml
# https server
server {
    listen       443 ssl;
    server_name  heyan.site;
    ssl_certificate  /etc/nginx/conf.d/cert/3141263_heyan.site.pem;
    ssl_certificate_key /etc/nginx/conf.d/cert/3141263_heyan.site.key;
    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;

    gzip on;
    gzip_min_length 1k;
    gzip_comp_level 9;
    gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
    gzip_vary on;
    gzip_disable "MSIE [1-6]\.";

    # redirect to http
    location / {
       proxy_pass http://heyan.site;
    }
}
```

<br/>

<br/>

## 非80端口http转https

如果网站是80端口，需要转到https （默认443端口），我们只需要如上面文章中提及的在nginx加上如下配置：

``` yaml
server {
    listen 80;
    server_name heyan.site;
    rewrite ^(.*)$ https://$host$1 permanent;
}
```

但如我的博客网站是`heyan.site:8001`和`heyan.site:8003`,直接使用上面的配置不起作用。这时候我们需要对配置做如下修改。

``` yaml{11,25,26,27,28,29}
server {
    listen       443 ssl;
    server_name  heyan.site;
    ssl_certificate  /etc/nginx/conf.d/cert/3141263_heyan.site.pem;
    ssl_certificate_key /etc/nginx/conf.d/cert/3141263_heyan.site.key;
    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;
    # 添加下面这行配置
    error_page 497 301 https://$http_host$request_uri;

    #charset koi8-r;
    #access_log  /var/log/nginx/host.access.log  main;

    location / {
        root    /usr/share/nginx/html;
        index   index.html index.htm;
    }
    
    ... ...
    
}
#注释掉这里的80端口转https的配置
#server {
#    listen 80;
#    server_name heyan.site;
#    rewrite ^(.*)$ https://$host$1 permanent;
#}
```

