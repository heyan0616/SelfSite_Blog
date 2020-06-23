# Python 语法



## 函数



### 不定长参数

``` python
# 加了星号（*）的变量存放所有未命名的变量参数，如果在函数调用时没有指定参数，它就是一个空元祖
def func(name, *args):
    print (name)
    for x in args:
        print (x)
        
func('test1','test2', 'test3')

# **代表键值对的参数字段， 和*代表意义类似
def func2(**kwargs):
    print(kwargs)
    print(type(kwargs))
    
func2(x=1, y=2, z=3)

# 通常写法 - 接收任意参数
def func3(*args , **kwargs):
    pass
```

### 匿名函数

``` python
#概念： 不使用def这样的语句定义函数，使用lanbda来创建匿名函数

#特点：
# 1.lambda只是一个表达式，函数体比def简单
# 2.lambda的主体是一个表达式，而不是代码块，仅仅只能在lambda表达式中封装简单的逻辑
# 3.lambda函数有自己的命名空间，且不能访问自有参数列表之外的或全局命名空间里的参数
# 4.虽然lambda是一个表达式且看起来只能写一行。。 与c、c++内联函数不同

# 格式： lambda 参数1，参数2, ... 参数n：expression

sum = lambda num1,num2:num1+num2
print (sum(1,2))
```



## 装饰器

``` python
###简单的装饰器###
def func1():
    print ('this is a good man')

def outer(func):
    def inner():
        print ('*****************')
        func()
    return inner()

# f 就是函数func1的加强版本
f = outer(func1)
#f()

#------------------------------------------

###复杂一点的装饰器###
def outer(func):
    def inner(age):
        if age < 0:
            age = 0
        func(age)
    return inner

#使用@符号将装饰器应用到函数
@outer      #相当于say=outer(say)
def say(age):
    print ('i am %d years old' % (age))

say(-10)

#------------------------------------------

###通用一点的装饰器###

def outer(func):
    def inner(*args, **kwargs):
        # 添加修饰的功能
        print ('&&&&&&&&&&&&&&&&&&')
        func(*args, **kwargs)
    return inner

@outer
def say(name, age): #函数参数理论上无限制，实际最好不超过六到七个
    print ('may name is %s, i am %d years old' % (name, age))

say ('hello', 18)
```

