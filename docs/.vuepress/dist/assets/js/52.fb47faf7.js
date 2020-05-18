(window.webpackJsonp=window.webpackJsonp||[]).push([[52],{466:function(t,n,a){"use strict";a.r(n);var s=a(0),v=Object(s.a)({},(function(){var t=this,n=t.$createElement,a=t._self._c||n;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"docker-case-nginx基本部署"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#docker-case-nginx基本部署"}},[t._v("#")]),t._v(" Docker Case - Nginx基本部署")]),t._v(" "),a("p",[t._v("此为Docker实战系列之-部署Nginx服务器")]),t._v(" "),a("h2",{attrs:{id:"简单的开始"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#简单的开始"}},[t._v("#")]),t._v(" 简单的开始")]),t._v(" "),a("p",[t._v("首先我们尝试不涉及任何改动的部署docker nginx。")]),t._v(" "),a("ol",[a("li",[t._v("下载Nginx镜像")])]),t._v(" "),a("p",[a("code",[t._v("docker pull nginx")])]),t._v(" "),a("ol",{attrs:{start:"2"}},[a("li",[t._v("启动Nginx容器")])]),t._v(" "),a("p",[a("code",[t._v("docker run -itd -p 80:80 nginx")])]),t._v(" "),a("blockquote",[a("p",[t._v("此处使用了命令:")]),t._v(" "),a("p",[t._v("-i 允许对容器内的标准输入进行交互")]),t._v(" "),a("p",[t._v("-t 在新容器内指定一个伪终端")]),t._v(" "),a("p",[t._v("-d 让容器在后台运行")]),t._v(" "),a("p",[t._v("-p 指定绑定端口 -p [127.0.0.1:]5001:5000[ /tcp|udp]（容器中的5000绑定到主机上的5001）")])]),t._v(" "),a("ol",{attrs:{start:"3"}},[a("li",[t._v("访问 http://localhost")])]),t._v(" "),a("p",[t._v("大功告成！ 这时，你就已经部署了一个最简单的Nginx服务器。")]),t._v(" "),a("h2",{attrs:{id:"静态网站配置"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#静态网站配置"}},[t._v("#")]),t._v(" 静态网站配置")]),t._v(" "),a("p",[t._v("当启动了上面这个简单的容器后，我们可以访问到nginx的默认页面了。这时，就自然而然的想问：怎么配置能将自己的网站运行起来呢？")]),t._v(" "),a("p",[t._v('这里我们以最简单的静态网页为例（就以本博客为例吧）；至于nginx配置方面，也只涉及最简单的相关配置，复杂高级点的配置，请关注"服务器专题-Nginx相关文章"。')]),t._v(" "),a("p",[t._v("我们现在关注这几个基本点：")]),t._v(" "),a("ul",[a("li",[t._v("配置文件 (nginx.conf & conf.d/default.conf)")]),t._v(" "),a("li",[t._v("静态文件存放在哪")]),t._v(" "),a("li",[t._v("log文件")])]),t._v(" "),a("p",[t._v("我们需要进入Nginx容器，查看这些文件在容器中的存放路径，如下便是我的官方Nginx镜像启动的容器的路径:")]),t._v(" "),a("ul",[a("li",[t._v("配置文件：/etc/nginx/nginx.conf & /etc/nginx/conf.d/default.conf")]),t._v(" "),a("li",[t._v("默认html文件夹：/usr/share/nginx/html")]),t._v(" "),a("li",[t._v("日志文件路劲：/var/log/nginx")])]),t._v(" "),a("p",[t._v("了解了上面的信息之后，我们就可以开始部署网站了。")]),t._v(" "),a("p",[t._v("此时，有两种方案：")]),t._v(" "),a("br"),t._v(" "),a("p",[a("font",{staticStyle:{"font-weight":"600"}},[t._v("方案1：在容器内操作")])],1),t._v(" "),a("p",[t._v("此方案就是直接进入容器去修改配置文件，然后将本地静态文件copy到容器内的html文件夹下，最后使用上文中最简单的容器启动命令，这样一个静态网站就部署成功了！(当然一般log还是要外置的)")]),t._v(" "),a("p",[t._v("这样做的一个缺点就是，每次部署、修改配置都需要进入容器操作，比较繁琐，所以从开发角度，还是比较推荐下面的方案2。但是从另一个角度来看，这样做的好处就是所有的配置什么的都封装到了容器，可以保持环境的绝对一致，方便后续的测试，上线。")]),t._v(" "),a("br"),t._v(" "),a("p",[a("font",{staticStyle:{"font-weight":"600"}},[t._v("方案2：映射到本地文件夹")])],1),t._v(" "),a("p",[t._v("就是将nginx的几个目录map到本地的文件夹，之后所有的改动都在本地进行。适合开发调试阶段。")]),t._v(" "),a("p",[t._v("在这之前，首先要在本地创建相关目录：")]),t._v(" "),a("blockquote",[a("p",[t._v("/conf.d")]),t._v(" "),a("p",[t._v("/html")]),t._v(" "),a("p",[t._v("/logs")]),t._v(" "),a("p",[t._v("nginx.conf")])]),t._v(" "),a("p",[t._v("然后将博客(Vuepress项目)build出来的"),a("code",[t._v("/dist")]),t._v("文件夹下的所有文件copy到上面的"),a("code",[t._v("/html")]),t._v("文件夹下。")]),t._v(" "),a("p",[t._v("最后，运行如下命令：")]),t._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[t._v("docker run --name nginx_demo -itd -p "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("80")]),t._v(":80 "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  -v "),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("`")]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("pwd")]),a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("`")])]),t._v("/html:/usr/share/nginx/html "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  -v "),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("`")]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("pwd")]),a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("`")])]),t._v("/nginx.conf:/etc/nginx/nginx.conf "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  -v "),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("`")]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("pwd")]),a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("`")])]),t._v("/conf.d:/etc/nginx/conf.d "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  -v "),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("`")]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("pwd")]),a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("`")])]),t._v("/logs:/var/log/nginx "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  nginx\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br")])]),a("p",[t._v("此时就可以访问你的网站了！\thttp://localhost")]),t._v(" "),a("h2",{attrs:{id:"总结"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[t._v("#")]),t._v(" 总结")]),t._v(" "),a("p",[t._v("本文介绍了Docker下Nginx的基本部署。在实际使用中，可能会涉及更多的nginx本身的配置。")])])}),[],!1,null,null,null);n.default=v.exports}}]);