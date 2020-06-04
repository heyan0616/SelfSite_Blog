# 博客部署的一些改进



目前博客的开发流程是

- 本地编写markdown，然后启动vuepress本地服务，查看效果
- 没问题后，build静态文件
- 之后copy到本地docker的html文件夹下面，查看效果
- 最后scp到云服务器的html文件夹下面

等博客基本稳定后，主要就是写markdown然后build上传，所以不需要本地验证了，所以想把build之后的动作自动化掉。步骤如下：

#### 安装sshpass

为了能在scp时指定密码，写在shell脚本里面，需要先安装辅助工具sshpass，安装步骤（只针对mac系统）

- 下载：http://sourceforge.net/projects/sshpass/files/sshpass/1.06/sshpass-1.06.tar.gz
- 解压到当前文件夹 `tar -zxvf sshpass-1.06.tar.gz`
- 进入解压后的文件夹 `cd sshpass-1.06`
- 开始源代码安装第一步:检验环境 `./configure`
- 编译源代码 `make&&make install`

#### 写个脚本release.sh，放到/builds文件夹下

```sh
echo "start cp files from /vuepress_workspace/blog/docs/.vuepress/dist/* to /docker_workspace/nginx_blog/html"
rm -rf /Users/heyan/self/workspace/docker_workspace/nginx_blog/html/*
echo "clean docker html folder complete"
cp -rf /Users/heyan/self/workspace/vuepress_workspace/blog/docs/.vuepress/dist/* /Users/heyan/self/workspace/docker_workspace/nginx_blog/html
echo "cp  file to docker folder complete"

echo "start scp files from /docker_workspace/nginx_blog/html/* to root@heyan.site:/home/nginx_blog/html"
sshpass -p "xxxxxx" ssh root@heyan.site "rm -rf /home/nginx_blog/html/*"
echo "clean the remote server html folder complete"
sshpass -p "xxxxxx" scp -r /Users/heyan/self/workspace/docker_workspace/nginx_blog/html/* root@heyan.site:/home/nginx_blog/html
echo "scp files to server complete"
```

#### **修改package.json**

```json
"docs:build": "vuepress build docs && sh ./builds/release.sh"
```

<br />

<br />

这样每次run build命令，就会自动build，之后把文件copy到本地的docker目录，再然后上传到远程的docker目录

```sh
npm run docs:build
```

