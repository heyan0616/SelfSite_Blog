
echo "start cp files from /vuepress_workspace/blog/docs/.vuepress/dist/* to /docker_workspace/nginx_blog/html"
cp -rf /Users/heyan/self/workspace/vuepress_workspace/blog/docs/.vuepress/dist/* /Users/heyan/self/workspace/docker_workspace/nginx_blog/html
echo "cp complete"

echo "start scp files from /docker_workspace/nginx_blog/html/* to root@heyan.site:/home/nginx_blog/html"
sshpass -p "Heyan0616" scp -r /Users/heyan/self/workspace/docker_workspace/nginx_blog/html/* root@heyan.site:/home/nginx_blog/html
echo "scp files to server complete"