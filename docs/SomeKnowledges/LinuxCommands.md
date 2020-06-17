# 常用的linux命令

一些linux命令和使用案例总结



``` sh
# 查看folder的大小
$du -hs /path


# sshpass使用 - 需要先安装，具体参考前文
sshpass -p "xxxxxx" scp -r /xxx/docker_workspace/nginx_blog/html/* root@heyan.site:/home/nginx_blog/html
sshpass -p "xxxxxx" ssh root@heyan.site "rm -rf /home/nginx_blog/html/*"


# 批量修改文件后缀 - 例：批量修改png后缀为jpg
for i in *.png;do mv "$i" "${i%.png}.jpg" ;done


# 去除重复行
sort file | uniq
# 查找非重复行
sort file | uniq -u
# 查找重复行
sort file | uniq -d
# 统计
sort file | uniq -c
# 去除重复的行，并生成新的文件
sort file | uniq > new_file


## linux 主机之间免密登录设置 ##
# 1. 例如希望在host1上实现对host2的免密登录，在host1上执行:（会在/root/.ssh/下产生秘钥文件）
ssh-keygen -t rsa -P ""
# 2. host1上copy公钥到host2上的/root下
scp /root/.ssh/id_rsa.pub root@192.1.1.1:/root
# 3. 登录host2,将host1的公钥追加到授权文件(authorized_keys)
cd /root
cat id_rsa.pub >> .ssh/authorized_keys
# 4. 此时，在host1就可以对host2发起免密登录了
ssh root@host2 #case1: 可以用来直接登录host2
scp -r /folder/file root@host2:/folder #case2: 可以直接scp文件到host2



# to be added ...
```

