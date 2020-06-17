# 解析库 BeautifulSoup

::: tip 此文为转载 （通常一篇文章会参考多处，也会添加自己的理解，引用地址如有遗漏，请指出）

- https://cuiqingcai.com/

:::

## BeautifulSoup解析库

| 解析器           | 使用方法                             | 优势                                                      | 劣势                                         |
| ---------------- | ------------------------------------ | --------------------------------------------------------- | -------------------------------------------- |
| Python标准库     | BeautifulSoup(markup, "html.parser") | Python的内置标准库、执行速度适中 、文档容错能力强         | Python 2.7.3 or 3.2.2)前的版本中文容错能力差 |
| lxml HTML 解析器 | BeautifulSoup(markup, "lxml")        | 速度快、文档容错能力强                                    | 需要安装C语言库                              |
| lxml XML 解析器  | BeautifulSoup(markup, "xml")         | 速度快、唯一支持XML的解析器                               | 需要安装C语言库                              |
| html5lib         | BeautifulSoup(markup, "html5lib")    | 最好的容错性、以浏览器的方式解析文档、生成HTML5格式的文档 | 速度慢、不依赖外部扩展                       |

## **基本使用**

``` python
html = """
<html><head><title>The Dormouse's story</title></head>
<body>
<p class="title" name="dromouse"><b>The Dormouse's story</b></p>
<p class="story">Once upon a time there were three little sisters; and their names were
<a href="http://example.com/elsie" class="sister" id="link1"><span>Elsie</span></a>,
<a href="http://example.com/lacie" class="sister" id="link2">Lacie</a> and
<a href="http://example.com/tillie" class="sister" id="link3">Tillie</a>;
and they lived at the bottom of a well.</p>
<p class="story">...</p>
"""
##################
from bs4 import BeautifulSoup
soup = BeautifulSoup(html, 'lxml')
print(soup.prettify())
print(soup.title.string)
```

## **标签选择器**

**选择元素**

``` python
from bs4 import BeautifulSoup
soup = BeautifulSoup(html, 'lxml')
print(soup.title)
print(type(soup.title))
print(soup.head)
print(soup.p)
```

**获取名称**

``` python
from bs4 import BeautifulSoup
soup = BeautifulSoup(html, 'lxml')
print(soup.title.name)
```

**获取属性**

``` python
from bs4 import BeautifulSoup
soup = BeautifulSoup(html, 'lxml')
print(soup.p.attrs['name'])
print(soup.p['name'])
```

**获取内容**

``` python
from bs4 import BeautifulSoup
soup = BeautifulSoup(html, 'lxml')
print(soup.p.string)
```

**嵌套选择**

``` python
from bs4 import BeautifulSoup
soup = BeautifulSoup(html, 'lxml')
print(soup.head.title.string)
```

**子节点和子孙节点**

``` python
from bs4 import BeautifulSoup
soup = BeautifulSoup(html, 'lxml')
print(soup.p.contents)
```

``` python
from bs4 import BeautifulSoup
soup = BeautifulSoup(html, 'lxml')
print(soup.p.children)
for i, child in enumerate(soup.p.children):
    print(i, child)
```

``` python
from bs4 import BeautifulSoup
soup = BeautifulSoup(html, 'lxml')
print(soup.p.descendants)
for i, child in enumerate(soup.p.descendants):
    print(i, child)
```

**父节点和祖先节点**

``` python
from bs4 import BeautifulSoup
soup = BeautifulSoup(html, 'lxml')
print(soup.a.parent)
```

``` python
from bs4 import BeautifulSoup
soup = BeautifulSoup(html, 'lxml')
print(list(enumerate(soup.a.parents)))
```

**兄弟节点**

``` python
from bs4 import BeautifulSoup
soup = BeautifulSoup(html, 'lxml')
print(list(enumerate(soup.a.next_siblings)))
print(list(enumerate(soup.a.previous_siblings)))
```

## **标准选择器**

**find_all( name , attrs , recursive , text , \**kwargs )**<br>可根据标签名、属性、内容查找文档

**name**

``` python
html='''
<div class="panel">
    <div class="panel-heading">
        <h4>Hello</h4>
    </div>
    <div class="panel-body">
        <ul class="list" id="list-1">
            <li class="element">Foo</li>
            <li class="element">Bar</li>
            <li class="element">Jay</li>
        </ul>
        <ul class="list list-small" id="list-2">
            <li class="element">Foo</li>
            <li class="element">Bar</li>
        </ul>
    </div>
</div>
'''

##########################
from bs4 import BeautifulSoup
soup = BeautifulSoup(html, 'lxml')
print(soup.find_all('ul'))
print(type(soup.find_all('ul')[0]))
```

``` python
from bs4 import BeautifulSoup
soup = BeautifulSoup(html, 'lxml')
for ul in soup.find_all('ul'):
    print(ul.find_all('li'))
```

**attrs**

``` python
from bs4 import BeautifulSoup
soup = BeautifulSoup(html, 'lxml')
print(soup.find_all(attrs={'id': 'list-1'}))
print(soup.find_all(attrs={'name': 'elements'}))
```

``` python
from bs4 import BeautifulSoup
soup = BeautifulSoup(html, 'lxml')
print(soup.find_all(id='list-1'))
print(soup.find_all(class_='element'))
```

**text**

``` python
from bs4 import BeautifulSoup
soup = BeautifulSoup(html, 'lxml')
print(soup.find_all(text='Foo'))
```

<br>

**find( name , attrs , recursive , text , \**kwargs )**<br>find返回单个元素，find_all返回所有元素

``` python
from bs4 import BeautifulSoup
soup = BeautifulSoup(html, 'lxml')
print(soup.find('ul'))
print(type(soup.find('ul')))
print(soup.find('page'))
```

<br>

**find_parents() find_parent()**<br>find_parents()返回所有祖先节点，find_parent()返回直接父节点。

<br>

**find_next_siblings() find_next_bsibling()**<br>find_next_siblings()返回后面所有兄弟节点，find_next_sibling()返回后面第一个兄弟节点。

<br>

**find_previous_siblings() find_previous_sibling()**<br>find_previous_siblings()返回前面所有兄弟节点，find_previous_sibling()返回前面第一个兄弟节点。

<br>

**find_all_next() find_next()**<br>find_all_next()返回节点后所有符合条件的节点, find_next()返回第一个符合条件的节点。

<br>

**find_all_previous() 和 find_previous()**<br>find_all_previous()返回节点后所有符合条件的节点, find_previous()返回第一个符合条件的节点。

## **CSS选择器**

通过select()直接传入CSS选择器即可完成选择

``` python
from bs4 import BeautifulSoup
soup = BeautifulSoup(html, 'lxml')
print(soup.select('.panel .panel-heading'))
print(soup.select('ul li'))
print(soup.select('#list-2 .element'))
print(type(soup.select('ul')[0]))
```

``` python
from bs4 import BeautifulSoup
soup = BeautifulSoup(html, 'lxml')
for ul in soup.select('ul'):
    print(ul.select('li'))
```

**获取属性**

``` python
from bs4 import BeautifulSoup
soup = BeautifulSoup(html, 'lxml')
for li in soup.select('li'):
    print(li.get_text())
```

## **总结**

- 推荐使用lxml解析库，必要时使用html.parser
- 标签选择筛选功能弱但是速度快
- 建议使用find()、find_all() 查询匹配单个结果或者多个结果
- 如果对CSS选择器熟悉建议使用select()
- 记住常用的获取属性和文本值的方法