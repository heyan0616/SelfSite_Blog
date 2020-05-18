# Git 常用命令

介绍一些常用的Git相关使用命令



## 将本地文件夹添加到Git仓库

- 进入文件夹，运行init命令将此目录加入git管理

  `git init`

- 添加文件到stage区（这里添加所有文件）

  `git add .`

- commit文件到本地仓库

  `git commit -m "first commit for new repo"`

- 关联远程仓库

``` git
# 用法：git remote add origin 你的远程库地址

# example:
git remote add origin https://github.com/heyan0616/SelfSite_Home.git
```

> - *(**如果远程库不为空 - 必须先合并**）* 远程库与本地同步合并
>
> `git pull --rebase origin master`
>
> <br>

- 推送本地仓库的内容到远程仓库master分支（*会提示输入用户名密码*）

  `git push origin master`

