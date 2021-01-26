# Spring Framework 注解

::: tip 引用参考

- [https://blog.csdn.net/lymboy/article/details/84979604](https://blog.csdn.net/lymboy/article/details/84979604)

<br />

:::

## Spring 注解

### **@Bean-组件注册**

对于一个普通的bean: **Person**

```java
package com.spring.annotation.bean;

public class Person {
    private String name;
    private Integer age;
    getter() setter()...
}
```

- 传统方式–配置文件**applicationContext.xml**

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="person" class="com.spring.annotation.bean.Person">
        <property name="name" value="Sairo"></property>
        <property name="age" value="18"></property>
    </bean>
    
</beans>
```

测试类：采用配置文件的方式时创建ClassPathXmlApplicationContext对象

``` java
public class XMLTest {
    @Test
    public void test00() {
        ApplicationContext context = new ClassPathXmlApplicationContext("classpath:applicationContext.xml");
        Person person = (Person) context.getBean("person");
        System.out.println(person);
    }
}
```

- 注解方式–**配置类**

***当采用注解方式时,需要编写一个用`@Configutation`标记的类作为配置类,用来取代配置文件***

``` java
/**
 * 配置类代替了配置文件
 * @Configuration: 告诉Spring这是一个配置类
 */
@Configuration
public class MainConfig {

    /**
     * @Bean: 取代了 <bean><bean/> 标签
     *      给容器中注册一个bean, id默认是方法名
     */
    @Bean
    public Person person() {
        return new Person("Sairo", 18));
    }
}
```

测试类：***采用注解方式时,要创建`AnnotationConfigApplicationContext`实例,传入配置类的class对象***

``` java
public class AnnotationTest {
    @Test
    public void test00() {
        ApplicationContext context = new AnnotationConfigApplicationContext(MainConfig.class);
        Person person = (Person) context.getBean("person");
        System.out.println(person);
    }
}
```

### **@ComponentScan-包扫描**

**包扫描是用于扫描指定包(及其子包)下的标注了`@Controller, @Service, @Repository, @Component`注解的类,并将它们加载到Spring容器中**

- 配置文件方式

  ``` xml
  <!-- 包扫描, 用于扫描指定包(及其子包)下的标注了@Controller, @Service, Repository, @Component注解的类, 将其加载到容器中 -->
      <context:component-scan base-package="com.lymboy.spring" ></context:component-scan>
  ```

- 注解方式<br />标注在MainConfig配置类上(头部)

  ``` java
  @ComponentScan(value = "com.lymboy.spring")
  ```

  测试

  ``` java
  public class IOCTest {
      private ApplicationContext applicationContext;
  
      @Before
      public void init() {
          applicationContext = new AnnotationConfigApplicationContext(MainConfig.class);
      }
  
      @Test
      public void test01() {
          int count = applicationContext.getBeanDefinitionCount();
          String[] names = applicationContext.getBeanDefinitionNames();
  
          System.out.println(count+": ");
          for (String name : names) {
              System.out.println(name);
          }
      }
  }
  ```

#### **@ComponentScan属性详解**

- value: 用来指定扫描的包<br />`@ComponentScan(value = "com.lymboy.spring")`

- useDefaultFilters: 使用默认扫描规则, 全部扫描<br />`@ComponentScan(value = "com.lymboy.spring" useDefaultFilters = false) // 关闭`

- excludeFilters: 用来排除不需要的类<br />`@ComponentScan(value = "com.lymboy.spring", excludeFilters = {        @ComponentScan.Filter(type = FilterType.ANNOTATION, classes = {Controller.class, Service.class}) })`

- 参数是一个 @Filter数组 

  - type: 指定过滤方式 默认是 FilterType.ANNOTATION(注解)方式 (FilterType type() default FilterType.ANNOTATION;), 选择按注解类型过滤时, 在value中指定的包(及其子包)下的所有在classes(下面的这个属性)中指定的注解都不会被扫描
  - classes数组: 指定过滤的类型 . 如果是按注解过滤, 则classes中填注解类型

- includeFilters: 仅加载指定的类, 首先要禁用默认扫描规则, 使用方法与上面的excludeFilters相同, 作用相反

  ``` java
  @ComponentScan(value = "com.lymboy.spring", useDefaultFilters = false, includeFilters = {
          @ComponentScan.Filter(type = FilterType.ANNOTATION, classes = {Controller.class, Service.class})
  })
  ```

  - 过滤规则 FilterType：用来指定包扫描的过滤规则

    ``` java
    public enum FilterType {
        // 注解方式			常用
    	ANNOTATION,
    	// 按照给定的类型		常用
    	ASSIGNABLE_TYPE,
    	// 不常用
    	ASPECTJ,
    	// 使用正则表达式
    	REGEX,
    	// 用户自定义
    	CUSTOM
    
    }
    ```

    > **FilterType.ANNOTATION** *:*
    >
    > **FilterType.ASSIGNABLE_TYPE** *: 与 FilterType.ANNOTATION 相似, 前者在classes属性中填 类的类型, 后者填注解的类型*
    >
    > **FilterType.REGEX** *: 通过正则表达式过滤*
    >
    > @ComponentScan(value = "com.lymboy.spring", useDefaultFilters = false, includeFilters = {
    >
    > ​        @ComponentScan.Filter(type = FilterType.REGEX, pattern = {".*Service"})
    >
    > })
    >
    > **FilterType.CUSTOM** : 通过实现 *org.springframework.context.annotation.FilterType* 接口, 自定义规则
    >
    > **MyTypeFilter** :自定义的类,实现了 *FilterType* 接口
    >
    > @ComponentScan(value = "com.lymboy.spring", useDefaultFilters = false, includeFilters = {
    >
    > ​        @ComponentScan.Filter(type = FilterType.CUSTOM, classes = {MyTypeFilter.class})
    >
    > })

    ``` java
    package com.lymboy.spring.annotation.config;
    
    public class MyTypeFilter implements TypeFilter {
    
        /**
         * @param metadataReader: 用来读取当前正在扫描的类的信息
         * @param metadataReaderFactory: 用来访问其他类的信息
         * @return
         * @throws IOException
         */
        @Override
        public boolean match(MetadataReader metadataReader, MetadataReaderFactory metadataReaderFactory) throws IOException {
    
            Resource resource = metadataReader.getResource();
            String filename = resource.getFilename();
            if (filename.contains("Service")) {
                return true;
            }
    
            return false;
        }
    }
    ```

### **@Scope-作用域**

**@Scope :** 用于设定 bean 的作用范围, 即单实例还是多实例

- @scope 注解添加在@Bean注解添加的地方, 一般是bean上

``` java
@Configuration
public class MainConfig2 {
    
    /**
     * singleton: 单实例(默认值) 所有的getBean() 返回的都是同一个bean实例
     * prototype: 多实例 每次调用getBean() 都返回一个新的 bean 实例
     * request: web环境下, 每一个请求创建一个request
     * session: web环境下, 每一个请求创建一个session
     */
    @Scope(scopeName = "singleton") // scopeName属性 可以替换为 value, 两个完全一致
    @Bean
    public Person person() {
        return new Person("张三", 25);
    }
}
```

*测试类*

``` java
@Test
public void test02() {
    applicationContext = new AnnotationConfigApplicationContext(MainConfig2.class);

    Person bean1 = applicationContext.getBean(Person.class);
    Person bean2 = applicationContext.getBean(Person.class);

    System.out.println(bean1 == bean2); //true

}
```

### **@Lazy-懒加载/延迟加载**

懒加载针对单实例 bean<br />懒加载使得单实例的 bean 在**IOC 容器**创建时不自动创建, 而是每次使用到相关的 bean 时容器再去创建.

*实例*

``` java
@Scope(scopeName = "singleton")  // scopeName属性 可以替换为 value, 两个完全一致
@Bean
@Lazy
public Person person() {
  System.out.println("Person 创建了...");
  return new Person("张三", 25);
}
```

``` java
@Test
public void test03() {
    applicationContext = new AnnotationConfigApplicationContext(MainConfig2.class);
    System.out.println("IOC 容器已经创建完了...");
}
```

> 可见, 当标注 @Lazy 注解后, 单实例的bean 不再在 **IOC容器**创建时也一起创建了

### **@Conditional-按条件注册**

可以标注在类上或方法上

**按照一定条件在容器中注册 bean**<br />`@Conditional(WindowsCondition.class)`

- 参数是实现了 *org.springframework.context.annotation.Condition* 接口的类对象

> 判定是否是 windows 操作系统

``` java
public class WindowsCondition implements Condition {
    @Override
    public boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata) {
        Environment environment = context.getEnvironment();
        String osName = environment.getProperty("os.name");
        if (osName.contains("Windows")) {
            return true;
        }
        return false;
    }
}
```

``` java
@Conditional(WindowsCondition.class)
@Bean (value = "bill")
public Person person01() {
    return new Person("Bill Gates", 62);
}
```

``` java
@Test
public void test04() {
    applicationContext = new AnnotationConfigApplicationContext(MainConfig2.class);

    String[] names = applicationContext.getBeanNamesForType(Person.class);
    for (String name : names) {
        System.out.println(name);
    }

    Map<String, Person> person = applicationContext.getBeansOfType(Person.class);
    System.out.println(person);

    Environment environment = applicationContext.getEnvironment();
    String os = environment.getProperty("os.name");
    System.out.println(os);
}
```

结果

```
person
bill
Person 创建了...
{person=Person{name='张三', age=25}, bill=Person{name='Bill Gates', age=62}}
Windows 10

Process finished with exit code 0
```



**如果** `@Conditional` **注解添加在配置类上, 那么只有当满足@Conditional 的条件时 配置类中的配置才会生效**<br />- 在`1Linux`系统上运行

``` java
@Cibnfiguration
@Conditional(WindowsCondition.class)
public class MainConfig2{}
```

结果

```
{}
OS: Linux

Process finished with exit code 0
```



### **@Import-组件导入（注册组件）**

对于以前的给容器中添加组建的方式有三种

- 包扫描带有 `@Controller`, `@Service`, `@Repository`, `@Component` 注解的类, 但是这些类一般是我们自己写的
- `@Bean`: 注解一般用于导入第三方的类, 但是每导入一个组件到要在配置类中写一个方法, 显得很繁杂,臃肿
- `@Import` : 快速导入一个组件
  - 第一种方法:	直接在配置类上标记 **@Import** 注解, 参数是要导入的组建的class对象的数组
  - 第二种方法:	实现 ImportSelector 接口, 返回 需导入的组建的类的全类名数组
  - 第三种方法:	实现 ImportBeanDefinitionRegistrar 接口

> 第一种方法

``` java
public class Color {
}
```

``` java
@Test
public void test05() {
    applicationContext = new AnnotationConfigApplicationContext(MainConfig2.class);
    String[] names = applicationContext.getBeanDefinitionNames();
    for (String name : names) {
        System.out.println(name);
    }
}
```

配置类上添加@import 注解

``` java
@Cibnfiguration
@import(Color.class)
public class MainConfig2{
  ...
}
```

> 第二种方法

``` java
public class MyImportSelector implements ImportSelector {
    @Override
    public String[] selectImports(AnnotationMetadata importingClassMetadata) {
        return new String[]{"com.lymboy.spring.annotation.bean.Blue", "com.lymboy.spring.annotation.bean.Red"};
    }
}
```

``` java
@Test
public void test05() {
    applicationContext = new AnnotationConfigApplicationContext(MainConfig2.class);
    Blue blue = applicationContext.getBean(Blue.class);
    System.out.println(blue);
}
```

> 第三种方法

``` java
public class MyImportBeanDefinitionRegistrar implements ImportBeanDefinitionRegistrar {
    /**
     * @param importingClassMetadata 当前类的注册信息
     * @param registry BeanDefinition注册类,用于对IOC容器中的bean增删改查
     */
    @Override
    public void registerBeanDefinitions(AnnotationMetadata importingClassMetadata, BeanDefinitionRegistry registry) {
        boolean red = registry.containsBeanDefinition("com.lymboy.spring.annotation.bean.Red");
        boolean color = registry.containsBeanDefinition("com.lymboy.spring.annotation.bean.Color");
        if (red && color) {
            RootBeanDefinition beanDefinition = new RootBeanDefinition(RainBow.class);
            registry.registerBeanDefinition("rainBow", beanDefinition);
        }
    }
}
```

### **FactoryBean-组件注册**

**用于给容器中注册bean**：需要实现 *FactoryBean* 接口

``` java
public class ColorFactoryBean implements FactoryBean<Color> {
    /**
     * 返回Color对象, 该对象会添加到容器中
     * @return
     * @throws Exception
     */
    @Override
    public Color getObject() throws Exception {
        return new Color();
    }

    @Override
    public Class<?> getObjectType() {
        return Color.class;
    }

    /**
     * 设定是否是单例模式, 是设定, 不是判断
     * true: 单实例
     * false: 多实例
     * @return
     */
    @Override
    public boolean isSingleton() {
        return false;
    }
}
```

``` java
@Bean
public ColorFactoryBean colorFactoryBean() {
    return new ColorFactoryBean();
}
```

``` java
@Test
public void test07() {
    applicationContext = new AnnotationConfigApplicationContext(MainConfig2.class);
    Object color0 = applicationContext.getBean("colorFactoryBean");

    System.out.println(color0);

}
```

虽然 getBean 的参数是 colorFactoryBean 但实际上返回的是 Color 对象, 因为容器会自动调用 FactoryBean 的 getObject 方法, 如果要真的返回 colorFactoryBean 实例, 只要在 getBean 参数前加 ‘&’ 符号就能返回对应的 FactoryBean 实例了 (至于为什么要添加’’&’ 这是因为Spring本身的设置)

``` java
// org.springframework.beans.factory.BeanFactory
String FACTORY_BEAN_PREFIX = "&";
```

``` java
@Test
public void test07() {
    applicationContext = new AnnotationConfigApplicationContext(MainConfig2.class);
    Object color0 = applicationContext.getBean("&colorFactoryBean");

    System.out.println(color0);

}
```

### **@Bean-生命周期**

**以前都是容器自动管理** **bean** **的创建与销毁, 但是我们也可以自己管理** **bean** **的创建与销毁**

- 配置文件方式 <br />在 *bean* 标签中添加 *init-method* 和 *destroy-method* 属性

  ``` xml
  <bean id="person" class="com.lymboy.spring.annotation.bean.Person"
          scope="singleton" init-method="" destroy-method="">
      <property name="name" value="Sairo"></property>
      <property name="age" value="18"></property>
  </bean>
  ```

- 注解方式<br />在 **@Bean** 注解中添加相关属性

  ``` java
  public class Car {
  
      public void init() {
          System.out.println("Car Created...");
      }
  
      public void destroy() {
          System.out.println("Car has been destroyed...");
      }
  }
  ```

  > 配置类

  ``` java
  @Configuration
  public class MainConfigOfLifeCycle {
  
      @Bean(initMethod = "init", destroyMethod = "destroy")
      public Car car() {
          return new Car();
      }
  }
  ```

  > 测试

  ``` java
  public class IOCTest_LifeCycle {
      private AnnotationConfigApplicationContext applicationContext;
  
      @Test
      public void test00() {
          applicationContext = new AnnotationConfigApplicationContext(MainConfigOfLifeCycle.class);
          applicationContext.getBean("car");
          applicationContext.close();
      }
  }
  ```

  > 结果

  ```
  ... ...
  Car Created...
  ... ...
  Car has been destroyed...
  
  Process finished with exit code 0
  ```

  可见, 当在 @Bean 中标注 initMethod 后, 容器创建该 bean 时会主动调用相关的初始化方法<br />同理, 当容器关闭, 即 bean 要被销毁的时候也会调用相关的销毁方法<br />**PS: ** 原始的 ApplicationContext 并没有定义 close() 方法, 其具体的实现类才有

  **注意:**<br />以上的效果只是在单例情况下才有效, 对于多实例 bean, IOC容器在创建完 bean 后就不会管理这个 bean了, 所以当容器关闭时不会调用销毁方法,而且因为是多实例的, 只有当调用 getBean() 方法是才会创建 bean, 即调用 initMethod 标记的方法

  ``` java
  @Scope("prototype")
  @Bean(initMethod = "init", destroyMethod = "destroy")
  public Car car() {
      return new Car();
  }
  ```

  > 结果

  ```
  ... ...
  Car Created...
  
  Process finished with exit code 0
  ```

- **InitializingBean, DisposableBean**

  通过使 *bean* 实现 *InitializingBean, DisposableBean* 接口, 并实现相关的方法, 容器会自动调用 初始化和销毁方法, 同样也区分单例和多例

  ``` java
  @Component
  public class Cat implements InitializingBean, DisposableBean {
  
      public Cat() {
          System.out.println("Cat contructor...");
      }
  
      /**
       * 用于销毁 bean
       * @throws Exception
       */
      @Override
      public void destroy() throws Exception {
          System.out.println("Cat destroy...");
      }
  
      /**
       * 当 bean 的所有属性(构造器) 完成后执行此方法, 用于初始化 bean
       * @throws Exception
       */
      @Override
      public void afterPropertiesSet() throws Exception {
          System.out.println("Cat afterPropertiesSet...");
      }
  }
  ```

  >  配置类加包扫描，测试

  ``` java
  @Test
  public void test01() {
      applicationContext = new AnnotationConfigApplicationContext(MainConfigOfLifeCycle.class);
  
      applicationContext.close();
  }
  ```

  > 结果

  ```
  Cat contructor...
  Cat afterPropertiesSet...
  
  Cat destroy...
  
  Process finished with exit code 0
  ```

  可见, 当使用实现接口这种方法时, 我们就不用再去显示指定初始化和销毁方法了, 容器会自动调用

### **@PostConstruct, @PreDestroy**

**直接标注在类的 初始化/销毁 方法上**

- **@PostConstruct:** 在对象创建之后,所有属性赋好值后调用, 用于对象的一些初始化操作
- **@PreDestroy:** 容器移除对象之前调用

``` java
@Component
public class Dog {
    public Dog() {
        System.out.println("Dog Contructor...");
    }

    @PostConstruct
    public void init() {
        System.out.println("Dog created...");
    }

    @PreDestroy
    public void destroy() {
        System.out.println("Dog destroy...");
    }
}
```

> 结果

```
Cat contructor...
Cat afterPropertiesSet...
Dog Contructor...
Dog created...

Dog destroy...
Cat destroy...

Process finished with exit code 0
```

### **@Value-属性赋值**

**用于对 bean 的属性填充**<br />相当于配置文件中的 **property** 标签

``` xml
<bean id="person" class="com.lymboy.spring.annotation.bean.Person"
        scope="singleton" init-method="" destroy-method="">
    <property name="name" value="Sairo"></property>
    <property name="age" value="18"></property>
</bean>
```

> **配置**

``` java
@Configuration
public class MainConfigOfPropertyValues {

    @Bean
    public Person person() {
        return new Person();
    }
}
```

> 测试

``` java
public class IOCTest_PropertyValues {

    private AnnotationConfigApplicationContext applicationContext;

    @Test
    public void test00() {
        applicationContext = new AnnotationConfigApplicationContext(MainConfigOfPropertyValues.class);
        printNames();

        Person person = (Person) applicationContext.getBean("person");
        System.out.println(person);
    }

    public void printNames() {
        String[] names = applicationContext.getBeanDefinitionNames();

        for (String name : names) {
            System.out.println(name);
        }
    }
}
```

> **结果**

```
org.springframework.context.event.internalEventListernerFactor
mainConfigOfPropertyValue
person
Person{name='null', age=null}

Process finished with exit code 0
```

可见, `bean` 的属性值为空, 可以用 `@Value` 给属性赋值

**@Value** 的参数

- 基本数值
- SpEL 表达式
- ${} 取出文件中的值

``` java
public class Person {
  @Value("Sairo")
  private String name;
  
  @Value("#{333+333}")
  private Interger age;
  
  public Person(){
    
  }
}
```

> 结果

```
person
Person{name='Sairo', age=666}

Process finished with exit code 0
```

### **@PropertySource-读取外部文件**

**@PropertySource 标注在配置类上, 参数是** **String** **数组, 其值是配置文件路径**<br />然后需要在 *bean* 的属性上标注 *@Value* 属性

```
# person.properties
person.name=altraman
person.age=6
```

``` java
@Configuration
@PropertySource(value = {"classpath:person.properties"})
public class MainConfigOfPropertyValues {
  
}
```

```java
@Value("${person.name}")
private Srting name;
@Value("${person.age}")
private Integer age;

public Person(){
  
}
```

> 结果

```
person
Person{name='altraman', age=6}

Process finished with exit code 0
```

### **@Autowired, @Qualifier, @Primary-自动装配**

**@Autowired**

**按类型装配**, `@Autowired`会在容器中按照对应的类型去查找相关的对象实例, 如果在容器中找到多个类型匹配的实例, 则继续按属性名作为组件 id匹配

**用法**: 仅有一个参数 *`required`*, 意义为是否一定要匹配, 默认为 *`true`*, 可以标注在构造器, 方法, 属性, 参数上<br />对于以前的三层开发模型, *`Controller–>Service`*, *`Service–>Dao`* 程序员直接在声明一个下层组件的变量并标注 *`@Autowired`* 注解, 容器会自动创建相关组件的实例并注入其中.

``` java
@Controller
public class BookController {
    @Autowired
    private BookService bookService;
}
```

``` java
@Service
public class BookService {
    @Autowired
    private BookDao bookDao;
}
```

``` java
@Repository
public class BookDao {
}
```

> **测试**

``` java
@Test
public void test01() {
    applicationContext = new AnnotationConfigApplicationContext(MainConfigOfAutowired.class);
    BookService bookService = applicationContext.getBean(BookService.class);
    System.out.println(bookService);
}
```

可见, 我们没有手动创建 *BookDao* 的实例, 容器就已经帮我们创建并注入到 *BookService* 中, 这就是控制反转和依赖注入!<br />**如果在容器中找到多个类型匹配的实例, 则继续按属性名作为组件 id匹配**

``` java
@Bean("bookDao2")
public BookDao bookDao() {
    BookDao dao = new BookDao();
    dao.setLable("2");
    return dao;
}
```

``` java
@Test
public void test01() {
    applicationContext = new AnnotationConfigApplicationContext(MainConfigOfAutowired.class);

    BookService bookService = applicationContext.getBean(BookService.class);
	// 查看依赖注入的 BookDao
    System.out.println(bookService);
	// 另一个 BookDao
    BookDao dao = (BookDao) applicationContext.getBean("bookDao2");

    System.out.println(dao);

    applicationContext.close();
}
```

> 结果 

```
BookService{bookDap=BookDao{label='1'}}
BookDao{label='2'}
```

### **@Primary**

**设定首选的组件, 即在依赖注入式首先注入标记了此注解的组件, 与@Qualifier冲突**<br />**用法:** **标注在配置类中**

``` java
@Primary
@Bean("bookDao2")
public BookDao bookDao() {
    BookDao dao = new BookDao();
    dao.setLable("2");
    return dao;
}
```

> 结果

```
BookService{bookDap=BookDao{label='2'}}
```

### **@Resource**

**Java 本身自带的注解, 也是自动注入**<br />用法: 与`@Autowired`相似, 参数 `[name = id]`, 当使用name参数时, 其功能与 `@Qualifier` 相似, 也是按 id 匹配

### **@Profile-环境切换**

**用于切换配置环境**<br />**可以标注在方法上也可以标注在配置类上**<br />**标注在方法/bean上**<br />参数代表的环境的 id, 当参数为 default 时,默认此配置生效

### **AOP 面向切面编程**

动态代理 : 指在程序运行期间动态地将某段代码切入带指定位置进行运行的编程方式

相关概念

- **Aspects**: 切面, 通常是一个类, 即所谓的切面类,切面类中定义了切入点和通知
- **JointPoint**: 连接点, 执行的方法(需要通知的方法), 即下面的 `div()`方法
- **Advice**: 通知, 即什么(类型)通知, eg: `@Before`, `@After`, `@AfterReturning`…
- **Pointcut**: 切入点, 对连接点进行拦截的定义, 即下面的 `logStart()`, `logEnd()` 等等

**步骤**

1. 导入 *aspects* 模块
2. 定义业务逻辑类, 定义一个实验方法
3. 定义一个切面类
4. 定义相关通知和切入点 <br />通知方法
   - 前置通知: 在目标方法(切点) 运行之前运行
   - 后置通知: 在目标方法(切点) 运行之后运行
   - 返回通知: 在目标方法(切点) 正常返回之后运行
   - 异常通知: 在目标方法(切点) 运行出现异常之后运行
   - 环绕通知: 动态代理, 目标方法运行前后运行
5. 将切面和业务逻辑类交由容器管理
6. 给切面类添加 *@Aspect* 注解, 指明其是切面类
7. 在配置类中添加 *@EnableAspectJAutoProxy* 注解, 开启注解版的 AOP 功能

要点

- 通知(`@Before(), @After()`) 中填入的是切点表达式: `@Before(“execution(public int com.lymboy.spring.annotation.aop.MathCalculator.*(…))”)`
- 为了避免在通知中重复写相同的切点表达式可以使用 `@PointCut` 注解

> 假定设计一个业务类 *MathCalculator*

``` java
public class MathCalculator {
    /**
     * 除法操作
     */
    public int div(int a, int b) {
        return a/b;
    }
}
```

> 定义一个日志切面类, 切面里的方法动态感知 *MathCalculator.div*() 运行到哪里了

``` java
@Aspect
public class LogAspects {

    @Pointcut("execution(public int com.lymboy.spring.annotation.aop.MathCalculator.*(..))")
    public void pointCut() {

    }

    @Before("execution(public int com.lymboy.spring.annotation.aop.MathCalculator.*(..))")
    public void logStart() {
        System.out.println("除法开始...参数列表是{}");
    }

    @After("com.lymboy.spring.annotation.aop.LogAspects.pointCut()")
    public void logEnd() {
        System.out.println("除法结束...");
    }

    @AfterReturning("com.lymboy.spring.annotation.aop.LogAspects.pointCut()")
    public void logReturn() {
        System.out.println("正常返回...运行结果{}");
    }

    @AfterThrowing("com.lymboy.spring.annotation.aop.LogAspects.pointCut()")
    public void logException() {
        System.out.println("出现异常...异常信息.{}");
    }
}
```

> 测试

``` java
// 设计一个除 0 异常
@Test
public void test01() {
    applicationContext = new AnnotationConfigApplicationContext(MainConfigOfAOP.class);

    MathCalculator math = (MathCalculator) applicationContext.getBean("com.lymboy.spring.annotation.aop.MathCalculator");
    int div = math.div(10, 0);
    System.out.println(div);

    applicationContext.close();
}
```

可见, 在 *div()* 方法前后相关的通知方法运行了

### **事务处理**

步骤

- 导入相关模块: 数据源、数据库连接、spring-jdbc模块
- 配置数据源、JdbcTemplate(Spring内置的简化操作的工具)
- 书写相关业务逻辑类
- 给插入方法添加事务注解(service方法)
- 添加事务管理器组件到容器中
- 开启事务管理器(@EnableXXX)

> **配置类**

``` java
@Configuration
@EnableTransactionManagement	// 必须开启事务管理器
@ComponentScan("com.lymboy.spring.annotation.tx")
public class TXConfig {

    /**
     * 数据源
     */
    @Bean
    public DataSource dataSource() throws PropertyVetoException {
        ComboPooledDataSource dataSource = new ComboPooledDataSource();
        dataSource.setUser("root");
        dataSource.setPassword("123456");
        dataSource.setJdbcUrl("jdbc:mysql://www.lymboy.com:3306/test");
        dataSource.setDriverClass("com.mysql.cj.jdbc.Driver");

        return dataSource;
    }

    @Bean
    public JdbcTemplate jdbcTemplate() throws PropertyVetoException {
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource());
        return jdbcTemplate;
    }

    // 事务管理器，实现PlatformTransactionManager接口
    public PlatformTransactionManager platformTransactionManager() throws PropertyVetoException {
        return new DataSourceTransactionManager(dataSource());
    }
}
```

> **业务逻辑类**

``` java
@Repository
public class UserDao {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    public void insert() {
        String sql = "INSERT INTO spring (`name`, `age`) VALUES(?, ?)";
        String name = UUID.randomUUID().toString().substring(0, 5);
        jdbcTemplate.update(sql, name, 19);
    }
}
```

``` java
@Service
public class UserService {
    @Autowired
    private UserDao userDao;
    // 标示注解
    @Transactional
    public void insertUser() {
        userDao.insert();
        System.out.println("插入完成...");
        int i = 10 / 0;
    }
}
```



## 注解相关知识

### @Repository,@Service,@Controller和@Component

@Repository、@Service、@Controller 和 @Component 都是将类标识为Bean

**由来**

Spring 自 2.0 版本开始，陆续引入了一些注解用于简化 Spring 的开发。@Repository注解便属于最先引入的一批，它用于将数据访问层 (DAO 层 ) 的类标识为 Spring Bean。具体只需将该注解标注在 DAO类上即可。同时，为了让 Spring 能够扫描类路径中的类并识别出 @Repository 注解，需要在 XML 配置文件中启用Bean 的自动扫描功能，这可以通过`<context:component-scan/>`实现。如下所示：

``` java
 // 首先使用 @Repository 将 DAO 类声明为 Bean 
 package bookstore.dao; 
 @Repository 
 public class UserDaoImpl implements UserDao{ …… } 

 // 其次，在 XML 配置文件中启动 Spring 的自动扫描功能
 <beans … > 
    ……
 <context:component-scan base-package=”bookstore.dao” /> 
……
 </beans> 
```

如此，我们就不再需要在 XML 中显式使用 `<bean/> `进行Bean 的配置。Spring 在容器初始化时将自动扫描 `base-package` 指定的包及其子包下的所有 class文件，所有标注了 `@Repository` 的类都将被注册为 Spring Bean。

为什么 `@Repository`只能标注在 DAO 类上呢？这是因为该注解的作用不只是将类识别为Bean，同时它还能将所标注的类中抛出的数据访问异常封装为 Spring 的数据访问异常类型。 Spring本身提供了一个丰富的并且是与具体的数据访问技术无关的数据访问异常结构，用于封装不同的持久层框架抛出的异常，使得异常独立于底层的框架。

Spring 2.5 在 `@Repository`的基础上增加了功能类似的额外三个注解：`@Component、@Service、@Constroller`，它们分别用于软件系统的不同层次：

- `@Component` 是一个泛化的概念，仅仅表示一个组件 (Bean) ，可以作用在任何层次。
- `@Service` 通常作用在业务层，但是目前该功能与 `@Component` 相同。
- `@Constroller` 通常作用在控制层，但是目前该功能与 `@Component` 相同。

通过在类上使用 @Repository、@Component、@Service 和 @Constroller 注解，Spring会自动创建相应的 BeanDefinition 对象，并注册到 ApplicationContext 中。这些类就成了 Spring受管组件。这三个注解除了作用于不同软件层次的类，其使用方式与 @Repository 是完全相同的。

> 另外，除了上面的四个注解外，用户可以创建自定义的注解，然后在注解上标注 @Component，那么，该自定义注解便具有了与所@Component 相同的功能。不过这个功能并不常用。
>
> [
>
> 当一个 Bean 被自动检测到时，会根据那个扫描器的 BeanNameGenerator 策略生成它的 bean名称。默认情况下，对于包含 name 属性的 @Component、@Repository、 @Service 和@Controller，会把 name 取值作为 Bean 的名字。如果这个注解不包含 name值或是其他被自定义过滤器发现的组件，默认 Bean 名称会是小写开头的非限定类名。如果你不想使用默认 bean命名策略，可以提供一个自定义的命名策略。首先实现 BeanNameGenerator接口，确认包含了一个默认的无参数构造方法。然后在配置扫描器时提供一个全限定类名，如下所示：
>
>  ``` xml
> <beans ...> 
>  <context:component-scan 
>     base-package="a.b" name-generator="a.SimpleNameGenerator"/> 
>  </beans> 
>  ```
>
> 与通过 XML 配置的 Spring Bean 一样，通过上述注解标识的Bean，其默认作用域是"singleton"，为了配合这四个注解，在标注 Bean 的同时能够指定 Bean 的作用域，Spring2.5 引入了 @Scope 注解。使用该注解时只需提供作用域的名称就行了，如下所示：
>
>  ```java
>  @Scope("prototype") 
>  @Repository 
>  public class Demo { … } 
>  ```
>
> 如果你想提供一个自定义的作用域解析策略而不使用基于注解的方法，只需实现 ScopeMetadataResolver接口，确认包含一个默认的没有参数的构造方法。然后在配置扫描器时提供全限定类名：
>
> ``` xml
> <context:component-scan base-package="a.b"
>  scope-resolver="footmark.SimpleScopeResolver" /> 
> ```
>
> ]

<br />

#### **@Component，@Repository，@Controller和@Service之间的差异**

- **@Component**这是一个通用的构造型注释，表明该类是一个spring组件。

  **@Component的特殊之处**:<br />`<context:component-scan>`除了扫描`@Component`,也会去扫描`@Controller，@Service，@Repository`。<br />扫描它们是因为它们本身都带有注释`@Component`。<br />只要看一看`@Controller`，`@Service`和`@Repository`注释的定义：

  ``` java
  @Component
  public @interface Service {
      ….
  }
  @Component
  public @interface Repository {
      ….
  }
  @Component
  public @interface Controller {
      …
  }
  ```

  因此，说这是没有错的`@Controller`，`@Service`并且`@Repository`是特殊类型的`@Component`注释。<br />`<context:component-scan>`选择它们并将它们的子类注册为bean，就像它们被注释`@Component`。<br />扫描它们是因为它们本身带有`@Component`注释注释。如果我们定义自己的自定义注释并使用它进行注释`@Component`，那么它也将被扫描`<context:component-scan>`

- **@Repository**这是为了表明该类定义了一个数据存储库。

  **@Repository有什么特别之处？**<br />除了指出这是一个基于注释的配置之外，@Repository我们的工作是捕获特定于平台的异常并将它们重新抛出为Spring的统一未经检查的异常之一。为此，我们提供了PersistenceExceptionTranslationPostProcessor，我们需要在Spring的应用程序上下文中添加如下：

  ``` xml
  <bean class="org.springframework.dao.annotation.PersistenceExceptionTranslationPostProcessor"/>
  ```

  这个bean后处理器为任何带有注释的bean添加一个顾问程序，@Repository以便捕获任何特定于平台的异常，然后将其作为Spring未经检查的数据访问异常之一重新抛出。

- **@Controller**作用于表现层(spring-mvc的注解)

  **@Controller有什么特别之处？**<br />调度程序会扫描带注解@Controller的类，并检测其中的@RequestMapping注释。我们只能在带@Controller注释的类上使用@RequestMapping。

- **@Service**作用于业务逻辑层

  这个注释没有明显的特点，... spring可能在未来增加一些额外的特殊功能



