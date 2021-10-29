

# Spring Boot 系列 2

一些Spring Boot的实用技能

::: tip 转载

- [https://blog.csdn.net/qq_40147863/category_8378529.html](https://blog.csdn.net/qq_40147863/category_8378529.html)

:::

## Spring Boot热部署

在目前的 Spring Boot 项目中，当发生了任何修改之后我们都需要重新启动才能够正确的得到效果，非常麻烦，Spring Boot 提供了热部署的方式，当发现任何类发生了改变，就会通过 JVM 类加载的方式，加载最新的类到虚拟机中，这样就不需要重新启动也能看到修改后的效果了。

### 热部署前 IDEA 中的一些设置

1. 打开自动构建项目，勾选上`Build Project automatically`<br />`Settings` > `Build, Execution, Deployment` > `Compiler` > `Build Project automatically`

2. 在编辑器中，同时按下：Ctrl + Shift + Alt + ?(/) 四个键，出现`Maintenance`菜单后，打开`Registry`
3. 在`Registry`窗口中勾选上 `Comppiler.automake.allow.when.app.running`

### pom.xml添加依赖和插件

1. 在 pom.xml 的 dependencies 中添加依赖

   ```xml
   <dependency>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-devtools</artifactId>
       <optional>true</optional> <!-- 这个需要为 true 热部署才有效 -->
   </dependency>
   ```

2. 添加`plugin` 

   如下`<configuration>`

   ``` xml {6-9}
   <build>
     <plugins>
       <plugin>
         <groupId>org.springframework.boot</groupId>
         <artifactId>spring-boot-maven-plugin</artifactId>
         <configuration>
           <fork>true</fork>
           <addResources>true</addResources>
         </configuration>
       </plugin>
     </plugins>
   </build>
   ```

## 使用自定义Banner

**提示：** banner.txt 必须是 ANSI 编码的，一般工具创建会是 UTF-8，会显示不出来

使用 Spring Boot 开发时，当程序启动的时候控制台会输出由字符组成的 Spring 符号。这个是SpringBoot 为自己设计的Banner:

```
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v2.4.2)
```

**应该怎么个性化定banner 呢**?

**第一步：在 src/main/resource 下新建 banner.txt**

- 可以在项目中创建，也只直接拷贝别人的直接放在 resources 下
- 必须放在 resources 目录下（不需要配置，直接放在根目录，会自动扫描）
- 命名必须为 banner.txt

**第二步：获取自定义 Banner 文本**

- 可以去下面网站（喜欢哪个用哪个）去生成自己的个性 banner，再拷贝过去就行啦：
  - [https://www.bootschool.net/ascii](https://www.bootschool.net/ascii)
  - http://patorjk.com/software/taag/#p=display&f=Graffiti&t=Type Something
- **可以只有文本没有那个 ${} ，这个是自定颜色的**
- 也可以直接拷贝别人的

例：

```
${AnsiColor.RED}
                    .::::.
                  .::::::::.
                 :::::::::::
              ..:::::::::::'
           '::::::::::::'
             .::::::::::
        '::::::::::::::..
             ..::::::::::::.
           ``::::::::::::::::
            ::::``:::::::::'        .:::.
           ::::'   ':::::'       .::::::::.
         .::::'      ::::     .:::::::'::::.
        .:::'       :::::  .:::::::::' ':::::.
       .::'        :::::.:::::::::'      ':::::.
      .::'         ::::::::::::::'         ``::::.
  ...:::           ::::::::::::'              ``::.
 ````':.          ':::::::::'                  ::::..
                    '.:::::'                    ':'````..

${AnsiColor.YELLOW}------------------------------------------------
${AnsiColor.YELLOW}                       :: ${AnsiColor.YELLOW}@Xiao Pengwei
${AnsiColor.YELLOW}------------------------------------------------${AnsiColor.WHITE}
```



## Spring Boot多模块结构项目构建

### 创建父项目、子模块

1. 新建Maven项目

   > 此创建好的项目就为父项目。建好后，可以删除`/src`目录。

2. 新建模块

   右键 `New` > `Module` (注意：最好子模块名和项目名同名)<br />依次新建所有子模块 （示例中如：`xpwi-main`，`xpwi-login`，`xpwi-test`）

### 父项目 pom.xml 配置

> **Maven `<dependencyManagement>`概念：**
>
> <br />
>
> Maven使用`<dependencyManagement>`元素来提供一种管理依赖版本号的方式，通常会在一个项目的最顶层的父pom中看到`<dependencyManagement>`元素。
>
> 使用`<dependencyManagement>`元素能让所有子项目引用一个依赖而不显式列出版本号，子项目Maven会沿着父子层次往上走，知道找到一个拥有`<dependencyManagement>`元素的项目，使用相同依赖指定的版本号。
>
> 例如在父项目中:
>
> ```xml
>  	<dependencyManagement>
>         <dependencies>
>             <!--mysql-->
>             <dependency>
>                 <groupId>mysql</groupId>
>                 <artifactId>mysql-connector-java</artifactId>
>                 <version>5.1.2</version>
>             </dependency>
>         </dependencies>
>     </dependencyManagement>
> ```
>
> 在子项目中添加mysql-connector-java可以不指定版本号，如：
>
> ```xml
> 		<!--mysql-->
>         <dependency>
>             <groupId>mysql</groupId>
>             <artifactId>mysql-connector-java</artifactId>
>         </dependency>
>     </dependencies>
> ```
> 所以：
>
> 1. `<dependencyManagement>`只是声明依赖，并不实现引入，子项目需要显示声明需要用的依赖
> 2. 如果子项目需要另一版本依赖，只需要在子项目pom中声明改依赖的版本号
>
> 

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <!--基本信息-->
    <description>Spring Boot 多模块构建示例</description>
    <groupId>com.xpwi</groupId>
    <artifactId>first-springboot</artifactId>
    <!--父 pom 的 packing 必须为 pom,请核查-->
    <packaging>pom</packaging>
    <version>1.0.0</version>

    <!--指定整个项目的父项目-->
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.0.5.RELEASE</version>
    </parent>

    <!--模块：这里声明多个子模块 -->
    <!--注意，这个不用手动自己去写，因为创建的时候是会自动生成的-->
    <modules>
        <module>xpwi-test</module>
        <module>xpwi-main</module>
        <module>xpwi-login</module>
    </modules>

    <!--属性变量配置-->
    <properties>
        <java.version>1.8</java.version>
    </properties>

    <!--加载依赖管理-->
    <!--注意：如果使用dependencyManagement,只是对版本进行管理，不会直接引入jar  -->
    <!--是为了在这里配置版本,为了让子模块pom或者本pom的直接dependencies不单独配置版本 -->
    <!--如果没有版本,会先到这里找版本号,以免版本冲突  -->
    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-web</artifactId>
                <version>2.0.5.RELEASE</version>
            </dependency>
        </dependencies>
    </dependencyManagement>

    <!--公共模块加载,非公共模块请一般放在子pom进行加载-->
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <!--插件-->
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <version>2.0.1.RELEASE</version>
                <executions>
                    <execution>
                        <goals>
                            <goal>repackage</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>

</project>
```

### 子模块 pom.xml 配置

> 注：模块之间也可以有依赖关系，如下面pom中的例子所示 `xpwi-main`依赖 `xpwi-test`、`xpwi-login`
>
> <br />
>
> <font color=orange>**在微服务项目的使用中，我们通常会建很多相互独立的子模块。**</font>

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>first-springboot</artifactId>
        <groupId>com.xpwi</groupId>
        <version>1.0.0</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>xpwi-main</artifactId>
    <dependencies>

        <!--这个已经移动到父 pom 了-->
        <!--<dependency>-->
        <!--<groupId>org.springframework.boot</groupId>-->
        <!--<artifactId>spring-boot-starter-web</artifactId>-->
        <!--</dependency>-->

        <!--现在是去加载自己创建的模块-->
        <!--就是加载子模块对子模块的依赖-->
        <dependency>
            <groupId>com.xpwi</groupId>
            <artifactId>xpwi-test</artifactId>
            <version>1.0.0</version>
        </dependency>

        <dependency>
            <groupId>com.xpwi</groupId>
            <artifactId>xpwi-login</artifactId>
            <version>1.0.0</version>
        </dependency>

    </dependencies>

</project>
```



## Swagger生成API文档

::: tip 参考

- [https://www.jianshu.com/p/002ce2f26103](https://www.jianshu.com/p/002ce2f26103)

:::



### **Spring Boot 集成Swagger步骤**

1. **pom中引入下面的依赖**

``` xml
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-swagger2</artifactId>
    <version>2.9.2</version>
</dependency>
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-swagger-ui</artifactId>
    <version>2.9.2</version>
</dependency>
<dependency>
```

> **依赖说明：**
>
> - **springfox-swagger2**<br />检测spring的web请求信息，生成检测结果（`json格式`）。
> - **springfox-swagger-ui**<br />根据springfox-swagger2生成的数据，生成`可视化`的友好页面。
>
> 

2. **Swagger2配置**

Swagger2的配置也是比较容易的，在项目创建成功之后，只需要开发者自己提供一个Docket的Bean即可。（即创建配置类 - *具体参考网上资料*）

```java
@Configuration
@EnableSwagger2
public class SwaggerConfig {
    @Bean
    public Docket createRestApi() {
        return new Docket(DocumentationType.SWAGGER_2)
				... ...
    }
}
```

> 其中@Configuration、@Bean均为spring初始化bean相关的注解。`@EnableSwagger2`表示启用swagger2。

3. **接口配置**

通过在控制器和接口方法上加上相关`注解`，可以给接口和控制器添加相关的`接口说明`信息。<br />常用注解如下：

| 注解               | 使用的地方     | 用途                                 |
| ------------------ | -------------- | ------------------------------------ |
| @Api               | 类/接口        | 描述类/接口主要用途                  |
| @ApiOperation      | 方法           | 描述方法的用途                       |
| @ApiImplicitParam  | 方法           | 用于描述接口的非对象参数             |
| @ApiImplicitParams | 方法           | 用于描述接口的非对象参数集           |
| @ApiIgnore         | 类/方法/参数   | Swagger 文档不会显示拥有该注解的接口 |
| @ApiModel          | 参数实体类     | 可设置接口相关实体的描述             |
| ApiModelProperty   | 参数实体类属性 | 可设置实体属性的相关描述             |

4. **访问**

启动项目后，通过以下方式访问swagger2的接口说明

```shell
http://地址:端口/应用名/swagger-ui.html

如： http://localhost:8080/swagger-ui.html
```

### 其他

1. **访问swagger2接口源信息**

   通过如下方式访问：

   ```
   http://地址:端口/应用名/v2/api-docs
   
   如：http://localhost:8080/v2/api-docs
   ```

   返回的json格式如下：

   ```json
   {"swagger":"2.0","info":{"description":"用户管理相关接口描述","title":"用户管理"},"host":"localhost:8080","basePath":"/","tags":[{"name":"user-api-controller","description":"User Api Controller"}],"paths":{"/userApi/findUserList":{"post":{"tags":["user-api-controller"],"summary":"findUserList","operationId":"findUserListUsingPOST","consumes":["application/json"],"produces":["*/*"],"parameters":[{"in":"body","name":"userInfo","description":"userInfo","required":true,"schema":{"$ref":"#/definitions/UserInfo"}}],"responses":{"200":{"description":"OK","schema":{"type":"object","additionalProperties":{"type":"object"}}},"201":{"description":"Created"},"401":{"description":"Unauthorized"},"403":{"description":"Forbidden"},"404":{"description":"Not Found"}},"deprecated":false}},"/userApi/saveUser":{"post":{"tags":["user-api-controller"],"summary":"saveUser","operationId":"saveUserUsingPOST","consumes":["application/json"],"produces":["*/*"],"parameters":[{"in":"body","name":"userInfo","description":"userInfo","required":true,"schema":{"$ref":"#/definitions/UserInfo"}}],"responses":{"200":{"description":"OK","schema":{"type":"object","additionalProperties":{"type":"object"}}},"201":{"description":"Created"},"401":{"description":"Unauthorized"},"403":{"description":"Forbidden"},"404":{"description":"Not Found"}},"deprecated":false}}},"definitions":{"UserInfo":{"type":"object","properties":{"age":{"type":"integer","format":"int32"},"id":{"type":"integer","format":"int32"},"userCode":{"type":"string"},"userName":{"type":"string"}},"title":"UserInfo"}}}
   ```

   swagger-ui通过对此源信息的解析，生成相关页面

2. **swagger2静态资源**

   swagger通过webjars的方式，来实现网页方式的接口访问。<br />如配置拦截器、shiro、spring security等，需对以下页面放行，来保证swagger页面的正常访问：

   ```undefined
   /swagger*/**
   /v2/**
   /webjars/**
   ```

   如下，spring拦截器，需配置如下：

   ```xml
   <mvc:exclude-mapping path="/swagger*/**"/>
   <mvc:exclude-mapping path="/v2/**"/>
   <mvc:exclude-mapping path="/webjars/**"/>
   ```



## Spring Boot常见问题

### Field injection is not recommended

::: tip 转

- [https://zhuanlan.zhihu.com/p/92395282](https://zhuanlan.zhihu.com/p/92395282)

<br />

:::

IDEA在属性注入的**@Autowired**注解上给出警告提示 - 经查：这个提示是`spring framerwork 4.0`以后开始出现的，spring 4.0开始就不推荐使用属性注入，改为推荐`构造器注入`和`setter注入`。

#### **依赖注入的类型**

尽管针对`spring framerwork 5.1.3`的文档只定义了两种主要的依赖注入类型，但实际上有三种;

- 基于构造函数的依赖注入
- 基于setter的依赖注入
- 基于字段的依赖注入

其中`基于字段的依赖注入`被广泛使用，但是idea或者其他静态代码分析工具会给出提示信息，不推荐使用。

#### 基于构造函数的依赖注入

在基于构造函数的依赖注入中，类构造函数被标注为**@Autowired**，并包含了许多与要注入的对象相关的参数。

``` java
@Component
public class ConstructorBasedInjection {

    private final InjectedBean injectedBean;

    @Autowired
    public ConstructorBasedInjection(InjectedBean injectedBean) {
        this.injectedBean = injectedBean;
    }
}
```

然后在spring[官方文档](https://link.zhihu.com/?target=https%3A//docs.spring.io/spring/docs/5.0.3.RELEASE/spring-framework-reference/core.html%23beans-constructor-injection)中，**@Autowired**注解也是可以省去的。

``` java
public class SimpleMovieLister {

    // the SimpleMovieLister has a dependency on a MovieFinder
    private MovieFinder movieFinder;

    // a constructor so that the Spring container can inject a MovieFinder
    public SimpleMovieLister(MovieFinder movieFinder) {
        this.movieFinder = movieFinder;
    }

    // business logic that actually uses the injected MovieFinder is omitted...
}
```

基于构造函数注入的主要优点是可以将需要注入的字段声明为**final**， 使得它们会在类实例化期间被初始化，这对于所需的依赖项很方便。

#### 基于Setter的依赖注入

在基于setter的依赖注入中，setter方法被标注为**@Autowired**。一旦使用无参数构造函数或无参数静态工厂方法实例化Bean，为了注入Bean的依赖项，Spring容器将调用这些setter方法。

``` java
@Component
public class SetterBasedInjection {

    private InjectedBean injectedBean;

    @Autowired
    public void setInjectedBean(InjectedBean injectedBean) {
        this.injectedBean = injectedBean;
    }
}
```

和基于构造器的依赖注入一样，在[官方文档](https://link.zhihu.com/?target=https%3A//docs.spring.io/spring/docs/5.0.3.RELEASE/spring-framework-reference/core.html%23beans-setter-injection)中，基于Setter的依赖注入中的**@Autowired**也可以省去。

``` java
public class SimpleMovieLister {

    // the SimpleMovieLister has a dependency on the MovieFinder
    private MovieFinder movieFinder;

    // a setter method so that the Spring container can inject a MovieFinder
    public void setMovieFinder(MovieFinder movieFinder) {
        this.movieFinder = movieFinder;
    }

    // business logic that actually uses the injected MovieFinder is omitted...
}
```

#### 基于属性的依赖注入

在基于属性的依赖注入中，字段/属性被标注为**@Autowired**。一旦类被实例化，Spring容器将设置这些字段。

``` java
@Component
public class FieldBasedInjection {
    @Autowired
    private InjectedBean injectedBean;
}
```

正如所看到的，这是依赖注入最干净的方法，因为它避免了添加样板代码，并且不需要声明类的构造函数。代码看起来很干净简洁，但是正如代码检查器已经向我们暗示的那样，这种方法有一些缺点。

#### 基于字段的依赖注入缺陷

1. 不允许声明不可变域<br />基于字段的依赖注入在声明为final/immutable的字段上不起作用，因为这些字段必须在类实例化时实例化。声明不可变依赖项的惟一方法是使用基于构造器的依赖注入。
2. 容易违反单一职责设计原则<br />在面向对象的编程中，五大设计原则[SOLID](https://link.zhihu.com/?target=https%3A//en.wikipedia.org/wiki/SOLID_(object-oriented_design))被广泛应用，（国内一般为六大设计原则），用以提高代码的重用性，可读性，可靠性和可维护性<br />[S](https://link.zhihu.com/?target=https%3A//en.wikipedia.org/wiki/Single_responsibility_principle)在**SOLID**中代表单一职责原则，即即一个类应该只负责一项职责，这个类提供的所有服务都应该只为它负责的职责服务。<br />使用基于字段的依注入，高频使用的类随着时间的推移，我们会在类中逐渐添加越来越多的依赖项，我们用着很爽，很容易忽略类中的依赖已经太多了。但是如果使用基于构造函数的依赖注入，随着越来越多的依赖项被添加到类中，构造函数会变得越来越大，我们一眼就可以察觉到哪里不对劲。<br />有一个有超过10个参数的构造函数是一个明显的信号，表明类已经转变一个大而全的功能合集，需要将类分割成更小、更容易维护的块。<br />因此，尽管属性注入并不是破坏单一责任原则的直接原因，但它隐藏了信号，使我们很容易忽略这些信号。
3. 与依赖注入容器紧密耦合<br />使用基于字段的依赖注入的主要原因是为了避免getter和setter的样板代码或为类创建构造函数。最后，这意味着设置这些字段的唯一方法是通过Spring容器实例化类并使用反射注入它们，否则字段将保持null。<br />依赖注入设计模式将类依赖项的创建与类本身分离开来，并将此责任转移到类注入容器，从而允许程序设计解耦，并遵循单一职责和依赖项倒置原则(同样可靠)。因此，通过自动装配（autowiring）字段来实现的类的解耦，最终会因为再次与类注入容器(在本例中是Spring)耦合而丢失，从而使类在Spring容器之外变得无用。<br />这意味着，如果您想在应用程序容器之外使用您的类，例如用于单元测试，您将被迫使用Spring容器来实例化您的类，因为没有其他可能的方法(除了反射)来设置自动装配字段。
4. 隐藏依赖关系<br />在使用依赖注入时，受影响的类应该使用公共接口清楚地公开这些依赖项，方法是在构造函数中公开所需的依赖项，或者使用方法(setter)公开可选的依赖项。当使用基于字段的依赖注入时，实质上是将这些依赖对外隐藏了。

