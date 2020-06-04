# 常用的linux命令

一些linux命令总结（持续添加）



``` sh
# 查看folder的大小
$du -hs /path

# sshpass使用 - 需要先安装，具体参考前文
sshpass -p "xxxxxx" scp -r /xxx/docker_workspace/nginx_blog/html/* root@heyan.site:/home/nginx_blog/html

sshpass -p "xxxxxx" ssh root@heyan.site "rm -rf /home/nginx_blog/html/*"

# 批量修改文件后缀 - 例：批量修改png后缀为jpg
for i in *.png;do mv "$i" "${i%.png}.jpg" ;done
```

