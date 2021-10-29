# Spring MVC

::: tip 转载参考

- [https://www.cnblogs.com/ysocean/p/7376596.html](https://www.cnblogs.com/ysocean/p/7376596.html)
- [https://blog.csdn.net/weixin_40350981/article/details/109645897](https://blog.csdn.net/weixin_40350981/article/details/109645897)

:::

本文简单介绍Spring MVC 相关知识

## 什么是Servlet

Java Servlet 是运行在 Web 服务器或应用服务器上的程序，它是作为来自 Web 浏览器或其他 HTTP 客户端的请求和 HTTP 服务器上的数据库或应用程序之间的中间层。

**servlet就是一个Java接口**，servlet接口定义的是一套处理网络请求的规范。

简而言之，Servlet可以理解成是处理用户请求和返回处理结果的一段程序。

### Tomcat 和 Servlet的关系

Tomcat 是Web应用服务器,是一个Servlet/JSP容器。Tomcat 作为Servlet容器,负责处理客户请求,把请求传送给Servlet,并将Servlet的响应传送回给客户.而Servlet是一种运行在支持Java语言的服务器上的组件. Servlet最常见的用途是扩展Java Web服务器功能,提供非常安全的,可移植的,易于使用的CGI替代品。



## 什么是 SpringMVC 

SpringMVC是一个基于Spring的专门做web开发的MVC框架，可以理解成servlet的升级，底层开发还是基于servlet，框架在servlet的基础上加入了各种功能来简化开发。

> SpringMVC 是类似于 Struts2 的一个 MVC 框架，在实际开发中，接收浏览器的请求响应，对数据进行处理，然后返回页面进行显示，但是上手难度却比 Struts2 简单多了。而且由于 Struts2 所暴露出来的安全问题，SpringMVC 已经成为了大多数企业优先选择的框架。



## 开发步骤

index.jsp ----> DispatcherServlet（中央调度器，类似servlet）----> 转发，分配给Controller对象（@Controller 注解创建的对象）

```
需求：用户在页面发起一个请求，请求交给springmvc的控制器对象，并显示请求的处理结果

实现步骤：
1	新建web maven工程 （结构如下）

	/project
		/src
			/main
				/java
				/resource
				/webapp
					/WEB-INF
						/web.xml
					/index.jsp
		/pom.xml

2	加入依赖，spring-webmvc依赖，间接把spring的依赖加入到项目中，jsp，servlet依赖

3	重点：在web.xml中注册springmvc框架的核心对象 DispatcherServlet
	1）DispatcherServlet叫做：中央调度器，是一个servlet，他的父类继承 HttpServlet
	2）DispatcherServlet也叫做：前端控制器（from controller）
	3）DispatcherServlet：负责接收用户提交的请求，调用其他控制器对象，并把请求的处理结果显示给用户
	
4	创建一个发起请求的页面 index.jsp
5	创建控制器类
	1）在类的上面加入@Controller注解，创建对象，并放到springmvc容器中
	2) 在类中的方法上面加入@RequestMapping注解
    
6	创建一个作为结果的jsp，显示请求的处理结果。
7	创建springmvc的配置文件（和spring的配置文件一样）
	1）声明组件扫描器，指定@Controller注解所在的包名
	2）声明视图解析器，帮助处理视图
```

## SpringMVC 请求的处理过程

> 1	发起 `some.do` 请求<br>
> 2	tomcat (`web.xml` 从`url-pattern`知道 `*.do` 的请求给`DispatcherServlet`)<br>
> 3	`DispatcherServlet`（根据`spring.xml`配置知道`some.do`，`doSome()`方法）<br>
> 4	`DispatcherServlet`把`some.do`转发给`MyController.doSome()`方法<br>
> 5	框架执行`doSome()`把得到的`ModelAndView`进行处理，转发到`show.jsp`<br>
>
> <br>
>
> `some.do` -> `DispatcherServlet` -> `MyController`



### SpringMVC执行过程源代码分析

1. Tomcat启动，创建容器的过程
   - 通过`<load-on-start>`标签指定的1，创建DispatcherServlet对象
   - `DispatcherServlet`它的父类是继承`HttpServlet`的，它是一个`servlet`，在被创建时，会执行`init()`方法
   - 在`init()`方法中执行
     ``` java
                 //创建容器，读取配置文件
                 webApplicationContext ctx = new ClassPathXmlApplicationContext("springmvc.xml");
                 //把容器对象放入到ServletContext中
                 getServletContext().setAttribute(key,ctx);
     ```
   - 上面创建容器的作用：创建`@Controller`注解所在的类的对象，创建MyController对象。这个对象放到`springmvc`容器椎间盘每个，容器时`map`，类似`map.put("MyController", MyController对象)`
2. 请求的处理过程
   - 执行`servlet`的`service`方法 (一层层下来最终会调用到`MyController`的 `doSome()`方法) 
     
     > 具体可参考servlet原理详解



## SpringMVC 开发实例

> 创建好web项目后，在pom.xml中加入servlet和springmvc依赖

``` xml
<!--servlet-->
<dependency>
  <groupId>javax.servlet</groupId>
  <artifactId>javax.servlet-api</artifactId>
  <version>3.1.0</version>
  <scope>provided</scope>
</dependency>

<!--spring mvc-->
<dependency>
  <groupId>org.springframework</groupId>
  <artifactId>spring-webmvc</artifactId>
  <version>5.2.5.RELEASE</version>
</dependency>
```

> 发送some.do请求的页面 index.jsp

``` jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
    <p>第一个springmvc项目</p>
    <p><a href="some.do">发起some.do请求</a></p>
</body>
</html>
```

> 核心配置文件 web.xml

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">

  <!--声明：注册springmvc的核心对象DispatcherServlet

        需要在tomcat服务器启动后，创建DispatcherServlet对象实例

        为什么要创建DispatcherServlet对象的实例呢？
        因为在DispatcherServlet创建过程中，会同时创建springmvc容器对象，
        读取springmvc的配置文件，把这个配置文件中的对象都配置好，
        当用户发起请求时就可以直接使用对象了。

        servlet的初始化会执行init()方法，DispatcherServlet在init()中{
            //创建容器，读取配置文件
            webApplicationContext ctx = new ClassPathXmlApplicationContext("springmvc.xml");
            //把容器对象放入到ServletContext中
            getServletContext().setAttribute(key,ctx);
         }
    -->
    <servlet>
        <servlet-name>springmvc</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>

        <!--自定义springmvc读取文件的位置-->
        <init-param>
            <!--springmvc配置文件的位置属性-->
            <param-name>contextConfigLocation</param-name>
            <!--指定自定义文件的位置-->
            <param-value>classpath:springmvc.xml</param-value>
        </init-param>

        <!--表示在tomcat启动后，创建servlet对象
            数字表示启动后创建对象的顺序，数值越小，tomcat创建对象越早，要求大于等于0的整数
        -->
        <load-on-startup>1</load-on-startup>

    </servlet>

        <servlet-mapping>
            <servlet-name>springmvc</servlet-name>
            <!--
                使用框架的时候，url-pattern可以使用两种值
                1.使用扩展名方式，语法 *.xxxx , xxxx时自定义扩展名。常用的方式 *.do, *.action, *.mvc等等
                    http://localhost:8080/myweb/some.do
                    http://localhost:8080?myweb/other.do
                2.使用斜杠"/"
            -->
            <url-pattern>*.do</url-pattern>
        </servlet-mapping>
</web-app>
```

tomcat启动，创建DispatcherServlet对象，同时创建springmvc容器对象，读取springmvc配置文件，这里配置文件的根地址 classpath = springmvc.xml

> 在**springmvc.xml**中声明 **组件扫描器** 和 **视图解析器**

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans 
       http://www.springframework.org/schema/beans/spring-beans.xsd 
       http://www.springframework.org/schema/context 
       https://www.springframework.org/schema/context/spring-context.xsd">

    <!--声明组件扫描器-->
    <context:component-scan base-package="com.zh.controller"/>
    
     <!--声明 springmvc框架中的视图解析器，帮助开发人员设置视图文件的路径-->
    <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
        <!--前缀：视图文件位置-->
        <property name="prefix" value="/WEB-INF/view/"/>
        <!--后缀：视图文件的扩展名-->
        <property name="suffix" value=".jsp"/>
    </bean>
</beans>
```

> 创建控制器类 MyController.java

``` java
package com.zh.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/*
* @Controller：创建处理器对象，对象放在springmvc容器中
*
* 能处理请求的都是控制器（处理器）：MyController能处理请求，
*                               叫做后端控制器（back controller）
* */
@Controller
public class MyController {
    /*
    * 处理用户提交的请求，springmvc中是使用方法来处理的。
    * 方法是自定义的，可以有多种返回值，多种参数，方法名称自定义
    * */

    /*
    * 准备使用doSome方法处理some.do请求。
    * @RequestMapping：请求映射，作用是把一个请求地址和一个方法绑定在一起。
    *                  一个请求指定一个方法处理。
    *             属性：1. value是一个String类型，表示请求的uri地址（这里是：some.do）
    *                     value值是唯一的，不能重复
    *             说明：使用@RequestMapping修饰的方法叫做处理器方法或者控制器方法
    *                   可以处理请求，类似servlet中的doGet,doPost
    * */

    /*
    * 返回值 ModelAndView 表示本次请求的处理结果
    *   model:数据，请求处理完后，要显示给用户的数据
    *   view：视图，比如jsp等
    * */
    @RequestMapping(value = "/some.do")
    public ModelAndView doSome(){
        //处理some.do请求，相当于service调用处理完成了
        ModelAndView mv = new ModelAndView();
        //添加数据，框架在请求的最后把数据放入到request作用域
        //request.setAttribute("msg","欢迎使用....");
        mv.addObject("msg","欢迎使用springmvc做web开发");
        mv.addObject("fun","执行的是doSome方法");

        //指定视图，指定视图的完整路径
        //框架对视图执行的forward操作，request.getRequestDispather("/show.jsp").forward(...)
        mv.setViewName("/show.jsp");
        return mv;
    }
    
    
    //在springmvc.xml配置视图解析器后，修改 setViewName()
    @RequestMapping(value = {"/other.do","/second.do"})
    public ModelAndView doOther(){
        ModelAndView mv = new ModelAndView();
        mv.addObject("msg","---------欢迎使用springmvc做web开发----------");
        mv.addObject("fun","执行的是doOther方法");
        
        //当配置了视图解析器后，可以使用逻辑名称（文件名），指定视图
        //框架会使用视图解析器的 前缀 + 逻辑名称 +后缀 组成完整路径
        mv.setViewName("other");
        return mv;
    }
}
```

> 对应的 show.jsp

``` jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
    <h3>show.jsp从request作用域获取数据</h3><br/>
    <h3>msg数据:${msg}</h3>
    <h3>fun数据:${fun}</h3>
</body>
</html>
```



## SpringMVC 注解式开发

to be added...