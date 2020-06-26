# Python 基础



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

