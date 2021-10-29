
echo "start cp files from /vuepress_workspace/blog/docs/.vuepress/dist/* to /docker_workspace/nginx_blog/html"
rm -rf /Users/heyan/self/workspace/docker_workspace/nginx_blog/html/*
echo "clean docker html folder complete"
cp -rf /Users/heyan/self/workspace/vuepress_workspace/blog/docs/.vuepress/dist/* /Users/heyan/self/workspace/docker_workspace/nginx_blog/html
echo "cp file to docker folder complete"

echo "start scp files from /docker_workspace/nginx_blog/html/* to root@heyan.site:/home/nginx_blog/html"
sshpass -p "Heyan0616" ssh root@heyan.site "rm -rf /home/nginx_blog/html/*"
echo "clean the remote server html folder complete"
sshpass -p "Heyan0616" scp -r /Users/heyan/self/workspace/docker_workspace/nginx_blog/html/* root@heyan.site:/home/nginx_blog/html
echo "scp files to server complete"

# check the folder size
# $du -hs /path/to/directory

echo "backup project to NAS server - start"
/Users/heyan/self/workspace/backup.sh
echo "backup project to NAS server - complete"