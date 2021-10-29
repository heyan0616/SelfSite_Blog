# CSS 基础



## CSS 学习网站

::: tip 同样，CSS的使用可以直接参考一些教程网站

- [https://www.w3school.com.cn/css/index.asp （推荐）](https://www.w3school.com.cn/css/index.asp)
- [https://www.runoob.com/css/css-tutorial.html  (推荐)](https://www.runoob.com/css/css-tutorial.html)

:::



## CSS 实例参考

*摘选出一些基本概念帮助快速查找*

### CSS 选择器

CSS 选择器用于“查找”（或选取）要设置样式的 HTML 元素。我们可以将 CSS 选择器分为五类：

- 简单选择器（根据名称、id、类来选取元素）
- [组合器选择器](https://www.w3school.com.cn/css/css_combinators.asp)（根据它们之间的特定关系来选取元素）
- [伪类选择器](https://www.w3school.com.cn/css/css_pseudo_classes.asp)（根据特定状态选取元素）
- [伪元素选择器](https://www.w3school.com.cn/css/css_pseudo_elements.asp)（选取元素的一部分并设置其样式）
- [属性选择器](https://www.w3school.com.cn/css/css_attribute_selectors.asp)（根据属性或属性值来选取元素）

### CSS 简单选择器

**CSS 元素选择器**

> 在这里，页面上的所有 <p> 元素都将居中对齐，并带有红色文本颜色：

``` css
p {
  text-align: center;
  color: red;
}
```

**CSS id 选择器**

id 选择器使用 HTML 元素的 id 属性来选择特定元素。元素的 id 在页面中是唯一的，因此 id 选择器用于选择一个唯一的元素！要选择具有特定 id 的元素，请写一个井号（＃），后跟该元素的 id。

> 这条 CSS 规则将应用于 id="para1" 的 HTML 元素：

```css
#para1 {
  text-align: center;
  color: red;
}
```

**CSS 类选择器**

类选择器选择有特定 class 属性的 HTML 元素。如需选择拥有特定 class 的元素，请写一个句点（.）字符，后面跟类名。

> 在此例中，所有带有 class="center" 的 HTML 元素将为红色且居中对齐：

```css
.center {
  text-align: center;
  color: red;
}
```

您还可以指定只有特定的 HTML 元素会受类的影响。

> 在这个例子中，只有具有 class="center" 的 <p> 元素会居中对齐：

```css
p.center {
  text-align: center;
  color: red;
}
```

HTML 元素也可以引用多个类。

> 在这个例子中，\<p> 元素将根据 class="center" 和 class="large" 进行样式设置：
>
> **注意：**类名不能以数字开头！

``` css
<p class="center large">这个段落引用两个类。</p>
```

**CSS 通用选择器**

通用选择器（*）选择页面上的所有的 HTML 元素。

> 下面的 CSS 规则会影响页面上的每个 HTML 元素：

```css
* {
  text-align: center;
  color: blue;
}
```

**CSS 分组选择器**

分组选择器选取所有具有相同样式定义的 HTML 元素。

```css
h1 {
  text-align: center;
  color: red;
}

h2 {
  text-align: center;
  color: red;
}

p {
  text-align: center;
  color: red;
}
```

最好对选择器进行分组，以最大程度地缩减代码。如需对选择器进行分组，请用逗号来分隔每个选择器。

> 在这个例子中，我们对上述代码中的选择器进行分组：

```css
h1, h2, p {
  text-align: center;
  color: red;
}
```

**所有简单的 CSS 选择器**

| 选择器                                                       | 例子       | 例子描述                               |
| :----------------------------------------------------------- | :--------- | :------------------------------------- |
| [.*class*](https://www.w3school.com.cn/css/css_selectors.asp) | .intro     | 选取所有 class="intro" 的元素。        |
| [#*id*](https://www.w3school.com.cn/css/css_selectors.asp)   | #firstname | 选取 id="firstname" 的那个元素。       |
| [*](https://www.w3school.com.cn/css/css_selectors.asp)       | *          | 选取所有元素。                         |
| [*element*](https://www.w3school.com.cn/css/css_selectors.asp) | p          | 选取所有 \<p> 元素。                   |
| [*element*,*element*,..](https://www.w3school.com.cn/css/css_selectors.asp) | div, p     | 选取所有 \<div> 元素和所有 \<p> 元素。 |



### CSS 使用

**三种使用 CSS 的方法**

- 外部 CSS
- 内部 CSS
- 行内 CSS

**外部 CSS**

通过使用外部样式表，您只需修改一个文件即可改变整个网站的外观！张 HTML 页面必须在 head 部分的 \<link> 元素内包含对外部样式表文件的引用。

``` html
<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" type="text/css" href="mystyle.css">
</head>
<body>

<h1>This is a heading</h1>
<p>This is a paragraph.</p>

</body>
</html>
```

**内部 CSS**

如果一张 HTML 页面拥有唯一的样式，那么可以使用内部样式表。内部样式是在 head 部分的 \<style> 元素中进行定义。

``` html
<!DOCTYPE html>
<html>
<head>
<style>
body {
  background-color: linen;
}

h1 {
  color: maroon;
  margin-left: 40px;
} 
</style>
</head>
<body>

<h1>This is a heading</h1>
<p>This is a paragraph.</p>

</body>
</html>
```

**行内 CSS**

行内样式（也称内联样式）可用于为单个元素应用唯一的样式。如需使用行内样式，请将 style 属性添加到相关元素。style 属性可包含任何 CSS 属性。

``` html
<!DOCTYPE html>
<html>
<body>

<h1 style="color:blue;text-align:center;">This is a heading</h1>
<p style="color:red;">This is a paragraph.</p>

</body>
</html>
```

>
>
>另外：
>
>- 如果在不同样式表中为同一选择器（元素）定义了一些属性，则将使用最后读取的样式表中的值。
>- 当为某个 HTML 元素指定了多个样式时，会使用哪种样式呢？
>   - 页面中的所有样式将按照以下规则“层叠”为新的“虚拟”样式表，其中第一优先级最高：
>     - 行内样式（在 HTML 元素中）
>     - 外部和内部样式表（在 head 部分）
>     - 浏览器默认样式



### CSS 布局

> 这里列出一些关键的基本概念， 具体使用请搜索相关文章

- **媒体查询技术**
- **rem字符单位**
- **自适应布局**
- **响应式布局**
- **弹性布局**
-  ... ...

::: tip 

- [https://www.w3school.com.cn/css/index.asp （推荐）](https://www.w3school.com.cn/css/index.asp)
- [https://www.runoob.com/css/css-tutorial.html  (推荐)](https://www.runoob.com/css/css-tutorial.html)
- ... ...

:::