(window.webpackJsonp=window.webpackJsonp||[]).push([[66],{492:function(s,a,e){"use strict";e.r(a);var t=e(0),n=Object(t.a)({},(function(){var s=this,a=s.$createElement,e=s._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[e("h1",{attrs:{id:"zookeeper-安装"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#zookeeper-安装"}},[s._v("#")]),s._v(" Zookeeper 安装")]),s._v(" "),e("div",{staticClass:"custom-block tip"},[e("p",{staticClass:"custom-block-title"},[s._v("此文为转载 （通常一篇文章会参考多处，也会添加自己的理解，引用地址如有遗漏，请指出）")]),s._v(" "),e("ul",[e("li",[s._v("https://www.bilibili.com/video/av32093417?from=search&seid=17225340458456913761")])])]),s._v(" "),e("br"),s._v(" "),e("h2",{attrs:{id:"本地模式安装部署"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#本地模式安装部署"}},[s._v("#")]),s._v(" 本地模式安装部署")]),s._v(" "),e("h3",{attrs:{id:"_1-安装前准备"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1-安装前准备"}},[s._v("#")]),s._v(" 1.安装前准备")]),s._v(" "),e("ul",[e("li",[s._v("安装 Jdk")]),s._v(" "),e("li",[s._v("拷贝 Zookeeper 安装包到 Linux 系统下")]),s._v(" "),e("li",[s._v("解压到指定目录")])]),s._v(" "),e("div",{staticClass:"language-sh line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("atguigu@hadoop102 software"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("$ "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("tar")]),s._v(" -zxvf zookeeper-3.4.10.tar.gz -C /opt/module/\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("h3",{attrs:{id:"_2-配置修改"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2-配置修改"}},[s._v("#")]),s._v(" "),e("strong",[s._v("2.配置修改")])]),s._v(" "),e("ul",[e("li",[s._v("将/opt/module/zookeeper-3.4.10/conf 这个路径下的 zoo_sample.cfg 修改为 zoo.cfg")])]),s._v(" "),e("div",{staticClass:"language-sh line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[s._v("atguigu@hadoop102 conf"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("$ "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("mv")]),s._v(" zoo_sample.cfg zoo.cfg\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("ul",[e("li",[s._v("打开 zoo.cfg 文件，修改 dataDir 路径:")])]),s._v(" "),e("div",{staticClass:"language-sh line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("atguigu@hadoop102 zookeeper-3.4.10"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("$ "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("vim")]),s._v(" zoo.cfg\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("p",[s._v("修改如下内容 "),e("br"),s._v("dataDir=/opt/module/zookeeper-3.4.10/zkData")]),s._v(" "),e("ul",[e("li",[s._v("在/opt/module/zookeeper-3.4.10/这个目录上创建 zkData 文件夹")])]),s._v(" "),e("div",{staticClass:"language-sh line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("atguigu@hadoop102 zookeeper-3.4.10"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("$ "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("mkdir")]),s._v(" zkData\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("h3",{attrs:{id:"_3-操作-zookeeper"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_3-操作-zookeeper"}},[s._v("#")]),s._v(" 3.操作 Zookeeper")]),s._v(" "),e("ul",[e("li",[s._v("启动 Zookeeper")])]),s._v(" "),e("div",{staticClass:"language-sh line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("atguigu@hadoop102 zookeeper-3.4.10"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("$ bin/zkServer.sh start\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("ul",[e("li",[s._v("查看进程是否启动")])]),s._v(" "),e("div",{staticClass:"language-sh line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("atguigu@hadoop102 zookeeper-3.4.10"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("$ jps \n"),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("4020")]),s._v(" Jps\n"),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("4001")]),s._v(" QuorumPeerMain\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br")])]),e("ul",[e("li",[s._v("查看状态:")])]),s._v(" "),e("div",{staticClass:"language-sh line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("atguigu@hadoop102 zookeeper-3.4.10"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("$ bin/zkServer.sh status ZooKeeper JMX enabled by default\nUsing config: /opt/module/zookeeper-\n"),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("3.4")]),s._v(".10/bin/"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v("/conf/zoo.cfg\nMode: standalone\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br")])]),e("ul",[e("li",[s._v("启动客户端:")])]),s._v(" "),e("div",{staticClass:"language-sh line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("atguigu@hadoop102 zookeeper-3.4.10"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("$ bin/zkCli.sh\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("ul",[e("li",[s._v("退出客户端:")])]),s._v(" "),e("div",{staticClass:"language-sh line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("zk: localhost:2181"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("CONNECTED"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" quit\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("ul",[e("li",[s._v("停止 Zookeeper")])]),s._v(" "),e("div",{staticClass:"language-sh line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("atguigu@hadoop102 zookeeper-3.4.10"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("$ bin/zkServer.sh stop\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("h2",{attrs:{id:"配置参数解读"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#配置参数解读"}},[s._v("#")]),s._v(" 配置参数解读")]),s._v(" "),e("p",[s._v("Zookeeper中的配置文件zoo.cfg中参数含义解读如下:")]),s._v(" "),e("ol",[e("li",[e("p",[e("strong",[s._v("tickTime =2000:通信心跳数，Zookeeper 服务器与客户端心跳时间，单位毫秒")]),s._v(" "),e("br"),s._v("\nZookeeper使用的基本时间，服务器之间或客户端与服务器之间维持心跳的时间间隔，也就是每个tickTime时间就会发送一个心跳，时间单位为毫秒。\n它用于心跳机制，并且设置最小的session超时时间为两倍心跳时间。(session的最小超时时间是2*tickTime)")])]),s._v(" "),e("li",[e("p",[e("strong",[s._v("initLimit =10:LF 初始通信时限")]),s._v(" "),e("br"),s._v("\n集群中的Follower跟随者服务器与Leader领导者服务器之间初始连接时能容忍的最多心 跳数(tickTime的数量)，用它来限定集群中的Zookeeper服务器连接到Leader的时限。")])]),s._v(" "),e("li",[e("p",[e("strong",[s._v("syncLimit =5:LF 同步通信时限")]),s._v(" "),e("br"),s._v("\n集群中Leader与Follower之间的最大响应时间单位，假如响应超过syncLimit *tickTime，Leader认为Follwer死掉，从服务器列表中删除Follwer。")])]),s._v(" "),e("li",[e("p",[e("strong",[s._v("dataDir:数据文件目录+数据持久化路径")]),s._v(" "),e("br"),s._v("\n主要用于保存 Zookeeper 中的数据。")])]),s._v(" "),e("li",[e("p",[e("strong",[s._v("clientPort =2181:客户端连接端口")]),s._v(" "),e("br"),s._v("\n监听客户端连接的端口。")])])])])}),[],!1,null,null,null);a.default=n.exports}}]);