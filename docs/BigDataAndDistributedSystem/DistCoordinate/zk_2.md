# Zookeeper 安装

::: tip 此文为转载 （通常一篇文章会参考多处，也会添加自己的理解，引用地址如有遗漏，请指出）

- https://www.bilibili.com/video/av32093417?from=search&seid=17225340458456913761

:::

<br />

## 本地模式安装部署



### 1.安装前准备

- 安装 Jdk
- 拷贝 Zookeeper 安装包到 Linux 系统下 
- 解压到指定目录

```sh
[atguigu@hadoop102 software]$ tar -zxvf zookeeper-3.4.10.tar.gz -C /opt/module/
```



### **2.配置修改**

- 将/opt/module/zookeeper-3.4.10/conf 这个路径下的 zoo_sample.cfg 修改为 zoo.cfg

```sh
atguigu@hadoop102 conf]$ mv zoo_sample.cfg zoo.cfg
```

- 打开 zoo.cfg 文件，修改 dataDir 路径:

```sh
[atguigu@hadoop102 zookeeper-3.4.10]$ vim zoo.cfg
```

修改如下内容 <br>dataDir=/opt/module/zookeeper-3.4.10/zkData

- 在/opt/module/zookeeper-3.4.10/这个目录上创建 zkData 文件夹

```sh
[atguigu@hadoop102 zookeeper-3.4.10]$ mkdir zkData
```



### 3.操作 Zookeeper

- 启动 Zookeeper

```sh
[atguigu@hadoop102 zookeeper-3.4.10]$ bin/zkServer.sh start
```

- 查看进程是否启动

```sh
[atguigu@hadoop102 zookeeper-3.4.10]$ jps 
4020 Jps
4001 QuorumPeerMain
```

- 查看状态:

```sh
[atguigu@hadoop102 zookeeper-3.4.10]$ bin/zkServer.sh status ZooKeeper JMX enabled by default
Using config: /opt/module/zookeeper-
3.4.10/bin/../conf/zoo.cfg
Mode: standalone
```

- 启动客户端:

```sh
[atguigu@hadoop102 zookeeper-3.4.10]$ bin/zkCli.sh
```

- 退出客户端:

```sh
[zk: localhost:2181(CONNECTED) 0] quit
```

- 停止 Zookeeper

```sh
[atguigu@hadoop102 zookeeper-3.4.10]$ bin/zkServer.sh stop
```



## 配置参数解读

Zookeeper中的配置文件zoo.cfg中参数含义解读如下:

1. **tickTime =2000:通信心跳数，Zookeeper 服务器与客户端心跳时间，单位毫秒** <br>
   Zookeeper使用的基本时间，服务器之间或客户端与服务器之间维持心跳的时间间隔，也就是每个tickTime时间就会发送一个心跳，时间单位为毫秒。 
   它用于心跳机制，并且设置最小的session超时时间为两倍心跳时间。(session的最小超时时间是2*tickTime)

2. **initLimit =10:LF 初始通信时限** <br>
   集群中的Follower跟随者服务器与Leader领导者服务器之间初始连接时能容忍的最多心 跳数(tickTime的数量)，用它来限定集群中的Zookeeper服务器连接到Leader的时限。

3. **syncLimit =5:LF 同步通信时限** <br>
   集群中Leader与Follower之间的最大响应时间单位，假如响应超过syncLimit *tickTime，Leader认为Follwer死掉，从服务器列表中删除Follwer。

4. **dataDir:数据文件目录+数据持久化路径** <br>
   主要用于保存 Zookeeper 中的数据。

5. **clientPort =2181:客户端连接端口** <br>
   监听客户端连接的端口。