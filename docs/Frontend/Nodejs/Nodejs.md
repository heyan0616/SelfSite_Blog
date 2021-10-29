# Node.Js 基本使用







## Node 升级

::: tip 转载 or 参考

- [https://blog.csdn.net/guzhao593/article/details/81712016](https://blog.csdn.net/guzhao593/article/details/81712016)

<br />

:::

> n模块不支持windows系统，所以windows系统升级node只能到[node官网](https://nodejs.org/zh-cn/download/)下载window安装包来覆盖之前的node。

**步骤：**

- 查看node版本

  ``` bash
  node -v
  ```

- 安装`n`模块

  > **首先，你得用`npm`全局安装一个管理node版本的管理模板`n`，对就是`n`，不用怀疑，github地址https://github.com/tj/n。**

  ``` bash
  npm i -g n
  
  # 如果出错，可以尝试
  npm i -g n --force
  ```

- 升级node版本

  管理板块`n`的命令有很多

  升级到指定的版本

  ```bash
  n 版本号 #如 n 10.0.0
  ```

  安装最新的版本

  ```bash
  n latest
  ```

  安装最近的稳定版本

  ```bash
  n stable
  ```

- 检查

  ``` bash
  node -v
  
  
  #  最后，扩展说明：
  
  #  有很多同学会发现，安装完成之后，用node –v查看，还是老版本，安装未生效。
  
  #  原因：
  #    n 切换之后的 node 默认装在 `/usr/local/bin/node`，先用 `which node` 检查一下当前使用的 node 是否是这个路径下的。
  #    如上缘由，一般都是因为当前版本指定到了其他路径，更新下`/etc/profile`文件指定即可。轻松解决。
  ```

  

