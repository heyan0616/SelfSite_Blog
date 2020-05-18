# Git Case总结

一些平常使用中的case总结

## gitignore文件不起作用的一个case

这个是在上传我的博客项目到github时，发生的一个关于ignore文件的小case，github地址：[https://github.com/heyan0616/SelfSite_Blog](https://github.com/heyan0616/SelfSite_Blog)

最终目的我们是想把博客下build出来的dist/文件夹ignore掉。但我的操作顺序导致了ignore文件一直不起作用。

**操作顺序**：

由于这个项目不是新建的，所以本地文件不仅包含了source文件，也包含了之前build出来的文件。

1. 我先在github创建了repo. 然后按照[将本地文件夹添加到Git仓库](https://heyan.site:8001/DevOps/Git/GitUsage.html#将本地文件夹添加到git仓库)的步骤，我们将本地的文件夹链接到了远程仓库。

2. 编写gitignore文件

   ``` git
   node_modules
   docs/.vuepress/dist/
   ```

3. 运行`git status`发现一直不能ignore掉这些build出来的文件。

**问题所在**:

这里我们先是把现有的build出来的文件一起push到了远程。意思就是我们想要ignore的文件夹(文件)已经在git的版本管理之中，所以就算在ignore文件中加入这些路径也已经不起作用了。我们需要先清除本地缓存，然后重新push，这样就ok了。

运行如下命令：

``` git
# 清理stage缓存
git rm -r --cached .

# 重新add文件（这时候ignore文件已经起作用，这里的.已经不包含你要忽略的文件了）
git add .

# 重新commit push
git commit -m 'update'
git push
```

