# JavaScript BOM 编程

::: tip 转载原文、视屏、教程

- [https://www.bilibili.com/video/BV1Ft411N7R3](https://www.bilibili.com/video/BV1Ft411N7R3)

:::

## BOM

### 001-BOM编程-open和close

``` html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>BOM编程-open和close</title>
	</head>
	<body>
		<script type="text/javascript">
			/*
				1、BOM编程中，window对象是顶级对象，代表浏览器窗口。
				2、window有open和close方法，可以开启窗口和关闭窗口。
			*/
		   
		</script>
		
		<input type="button" value="开启百度(新窗口)" onclick="window.open('http://www.baidu.com');" />
		<input type="button" value="开启百度(当前窗口)" onclick="window.open('http://www.baidu.com', '_self');" />
		<input type="button" value="开启百度(新窗口)" onclick="window.open('http://www.baidu.com', '_blank');" />
		<input type="button" value="开启百度(父窗口)" onclick="window.open('http://www.baidu.com', '_parent');" />
		<input type="button" value="开启百度(顶级窗口)" onclick="window.open('http://www.baidu.com', '_top');" />
		
		<input type="button" value="打开表单验证"  onclick="window.open('002-open.html')"/>
	</body>
</html>

```

**002-close.html**

``` html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>close</title>
	</head>
	<body>
		<input type="button" value="关闭当前窗口" onclick="window.close();" />
	</body>
</html>

```

### 003-弹出消息框和确认框

``` html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>弹出消息框和确认框</title>
	</head>
	<body>
		<script type="text/javascript">
			function del(){
				/*
				var ok = window.confirm("亲，确认删除数据吗？");
				//alert(ok);
				if(ok){
					alert("delete data ....");
				}
				*/
			    if(window.confirm("亲，确认删除数据吗？")){
			    	alert("delete data ....");
			    }
			}
		</script>
		<input type="button" value="弹出消息框" onclick="window.alert('消息框!')" />
		
		<!--删除操作的时候都要提前先得到用户的确认。-->
		<input type="button" value="弹出确认框(删除)" onclick="del();" />
	</body>
</html>

```

### 004-当前窗口设置为顶级窗口

``` html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>当前窗口设置为顶级窗口</title>
		<!--窗体-->
		<!-- <frameset cols="30%,*">
			<frame src="http://www.baidu.com" />
			<frame src="005-child-window.html" />
		</frameset> -->
	</head>
	<body>
		
		<!--在当前窗口中隐藏的内部窗体。-->
		<!-- <iframe src="http://www.baidu.com"></iframe> -->
		
		<iframe src="005-child-window.html"></iframe>
		
	</body>
</html>

```

**005-child-window.html**

``` html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>child-window</title>
	</head>
	<body>
		child window.
		<script type="text/javascript">
			window.onload = function(){
				var btn = document.getElementById("btn");
				btn.onclick = function(){
					if(window.top != window.self){
						//window.top = window.self;
						window.top.location = window.self.location;
					}
				}
			}
		</script>
		<input type="button" value="将当前窗口设置为顶级窗口" id="btn" />
	</body>
</html>

```

### 006-history对象

``` html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>history对象</title>
	</head>
	<body>
		<a href="007.html">007页面</a>
		<input type="button" value="前进" onclick="window.history.go(1)"/> 
	</body>
</html>

```

**007.html**

``` html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>007</title>
	</head>
	<body>
		007 page!
		<input type="button" value="后退" onclick="window.history.back()" />
		<input type="button" value="后退" onclick="window.history.go(-1)" />
	</body>
</html>

```

### 008-设置浏览器地址栏上的URL

``` html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>设置浏览器地址栏上的URL</title>
	</head>
	<body>
		
		<script type="text/javascript">
			function goBaidu(){
				//var locationObj = window.location;
				//locationObj.href = "http://www.baidu.com";
				
				// window.location.href = "http://www.jd.com";
				// window.location = "http://www.126.com";
				
				//document.location.href = "http://www.sina.com.cn";
				document.location = "http://www.tmall.com";
			}
		</script>
		
		<input type="button" value="新浪" onclick="goBaidu();"/>
		
		<input type="button" value="baidu" onclick="window.open('http://www.baidu.com');" />
		
	</body>
</html>

<!--
	总结，有哪些方法可以通过浏览器往服务器发请求？
		1、表单form的提交。
		2、超链接。<a href="http://localhost:8080/oa/save?username=zhangsan&password=123">用户只能点击这个超链接</a>
		3、document.location
		4、window.location
		5、window.open("url")
		6、直接在浏览器地址栏上输入URL，然后回车。（这个也可以手动输入，提交数据也可以成为动态的。）
		
		以上所有的请求方式均可以携带数据给服务器，只有通过表单提交的数据才是动态的。
-->
```

