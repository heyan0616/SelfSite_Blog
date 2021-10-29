# JavaScript DOM 编程

::: tip 转载原文、视屏、教程

- [https://www.bilibili.com/video/BV1Ft411N7R3](https://www.bilibili.com/video/BV1Ft411N7R3)

:::

## DOM

### 001-DOM编程-获取文本框的value

``` html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>DOM编程-获取文本框的value</title>
	</head>
	<body>
		<script type="text/javascript">
			/*
				1、JavaScript包括三大块：
					ECMAScript：JS的核心语法（ES规范 / ECMA-262标准）
					DOM：Document Object Model（文档对象模型：对网页当中的节点进行增删改的过程。）HTML文档被当做一棵DOM树来看待。
						var domObj = document.getElementById("id");
					BOM：Browser Object Model（浏览器对象模型）
						关闭浏览器窗口、打开一个新的浏览器窗口、后退、前进、浏览器地址栏上的地址等，都是BOM编程。
				2、DOM和BOM的区别和联系？
					BOM的顶级对象是：window
					DOM的顶级对象是：document
					实际上BOM是包括DOM的！
			*/
		   /*
		   window.onload = function(){
			   //var btnElt = window.document.getElementById("btn");
			   var btnElt = document.getElementById("btn");
			   alert(btnElt); // object HTMLInputElement
		   }
		   */
		  
		  window.onload = function(){
			  var btnElt = document.getElementById("btn");
			  btnElt.onclick = function(){
				  /*
				  // 获取username节点
				  var usernameElt = document.getElementById("username");
				  var username = usernameElt.value;
				  alert(username);
				  */
				 // alert(document.getElementById("username").value);
				 
				 // 可以修改它的value
				 document.getElementById("username").value = "zhangsan";
			  }
		  }
		</script>
		
		<!--
		<input type="button" id="btn" value="hello" />
		-->
		
		<input type="text" id="username" />
		<input type="button" value="获取文本框的value" id="btn"/>
		
		<hr>
		
		<script type="text/javascript">
			window.onload = function(){
				document.getElementById("setBtn").onclick = function(){
					document.getElementById("username2").value = document.getElementById("username1").value;
				}
			}
		</script>
		
		<input type="text" id="username1" />
		<br>
		<input type="text" id="username2" />
		<br>
		<input type="button" value="将第一个文本框中的value赋值到第二个文本框上" id="setBtn" />
		
		<!--blur事件：失去焦点事件-->
		<!--以下代码中的this代表的是当前input节点对象,this.value就是这个节点对象的value属性。-->
		<input type="text" onblur="alert(this.value)" />
		
	</body>
</html>

```

### 002-DOM编程-innerHTML和innerText操作div和span

``` html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>DOM编程-innerHTML和innerText操作div和span</title>
		<style type="text/css">
			#div1{
				background-color: aquamarine;
				width: 300px;
				height: 300px;
				border: 1px black solid;
				position: absolute;
				top: 100px;
				left: 100px;
			}
		</style>
	</head>
	<body>
		
		<!--
			innerText和innerHTML属性有什么区别？
				相同点：都是设置元素内部的内容。
				不同点：
					innerHTML会把后面的“字符串”当做一段HTML代码解释并执行。
					innerText，即使后面是一段HTML代码，也只是将其当做普通的字符串来看待。
		-->
		<script type="text/javascript">
			window.onload = function(){
				var btn = document.getElementById("btn");
				btn.onclick = function(){
					// 设置div的内容
					// 第一步:获取div对象
					var divElt = document.getElementById("div1");
					// 第二步:使用innerHTML属性来设置元素内部的内容
					// divElt.innerHTML = "fjdkslajfkdlsajkfldsjaklfds";
					// divElt.innerHTML = "<font color='red'>用户名不能为空！</font>";
					divElt.innerText = "<font color='red'>用户名不能为空！</font>";
				}
			}
		</script>
		
		<input type="button" value="设置div中的内容" id="btn"/>
		
		<div id="div1"></div>
		
	</body>
</html>

```

### 003-DOM编程-**关于正则表达式**

``` html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>DOM编程-关于正则表达式</title>
	</head>
	<body>
		<script type="text/javascript">
			/*
				1、什么是正则表达式，有什么用？
					正则表达式：Regular Expression
					正则表达式主要用在字符串格式匹配方面。
					
				2、正则表达式实际上是一门独立的学科，在Java语言中支持，C语言中也支持，javascript中也支持。
				大部分编程语言都支持正则表达式。正则表达式最初使用在医学方面，用来表示神经符号等。目前使用最多
				的是计算机编程领域，用作字符串格式匹配。包括搜索方面等。
				
				3、正则表达式，对于我们javascript编程来说，掌握哪些内容呢？
					第一：常见的正则表达式符号要认识。
					第二：简单的正则表达式要会写。
					第三: 他人编写的正则表达式要能看懂。
					第四：在javascript当中，怎么创建正则表达式对象！（new对象）
					第五：在javascript当中，正则表达式对象有哪些方法！（调方法）
					第六：要能够快速的从网络上找到自己需要的正则表达式。并且测试其有效性。
				
				4、常见的正则表达式符号？
					. 匹配除换行符以外的任意字符 
					\w 匹配字母或数字或下划线或汉字 
					\s 匹配任意的空白符 
					\d 匹配数字 
					\b 匹配单词的开始或结束 
					^ 匹配字符串的开始 
					$ 匹配字符串的结束
					 
					* 重复零次或更多次 
					+ 重复一次或更多次 
					? 重复零次或一次 
					{n} 重复n次 
					{n,} 重复n次或更多次 
					{n,m} 重复n到m次
					 
					\W 匹配任意不是字母，数字，下划线，汉字的字符 
					\S 匹配任意不是空白符的字符 
					\D 匹配任意非数字的字符 
					\B 匹配不是单词开头或结束的位置 
					[^x] 匹配除了x以外的任意字符 
					[^aeiou] 匹配除了aeiou这几个字母以外的任意字符 
					
					正则表达式当中的小括号()优先级较高。
					[1-9] 表示1到9的任意1个数字（次数是1次。）
					[A-Za-z0-9] 表示A-Za-z0-9中的任意1个字符
					[A-Za-z0-9-] 表示A-Z、a-z、0-9、- ，以上所有字符中的任意1个字符。
					
					| 表示或者
				
				5、简单的正则表达式要会写
					QQ号的正则表达式：^[1-9][0-9]{4,}$

				6、他人编写的正则表达式要能看懂？
					email正则：^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$
				
				7、怎么创建正则表达式对象，怎么调用正则表达式对象的方法？
					第一种创建方式：
						var regExp = /正则表达式/flags;
					第二种创建方式:使用内置支持类RegExp
						var regExp = new RegExp("正则表达式","flags");
						
					关于flags：
						g：全局匹配
						i：忽略大小写
						m：多行搜索（ES规范制定之后才支持m。）当前面是正则表达式的时候，m不能用。只有前面是普通字符串的时候，m才可以使用。
						
					正则表达式对象的test()方法？
						true / false = 正则表达式对象.test(用户填写的字符串);
						true : 字符串格式匹配成功
						false: 字符串格式匹配失败
			*/
		   window.onload = function(){
			   // 给按钮绑定click
			   document.getElementById("btn").onclick = function(){
				   var email = document.getElementById("email").value;
				   var emailRegExp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
				   var ok = emailRegExp.test(email);
				   if(ok){
						//合法
						document.getElementById("emailError").innerText = "邮箱地址合法";
				   }else{
					   // 不合法
					   document.getElementById("emailError").innerText = "邮箱地址不合法";
				   }
			   }
			   // 给文本框绑定focus
			   document.getElementById("email").onfocus = function(){
				   document.getElementById("emailError").innerText = "";
			   }
		   }
		   
		</script>
		
		<input type="text" id="email" />
		<span id="emailError" style="color: red; font-size: 12px;"></span>
		<br>
		<input type="button" value="验证邮箱" id="btn" />
	</body>
</html>

```

### 004-去除字符串的前后空白trim

``` html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>去除字符串的前后空白trim</title>
	</head>
	<body>
		<script type="text/javascript">
			// 低版本的IE浏览器不支持字符串的trim()函数,怎么办？
			// 可以自己对String类扩展一个全新的trim()函数!
			String.prototype.trim = function(){
				// alert("扩展之后的trim方法");
				// 去除当前字符串的前后空白
				// 在当前的方法中的this代表的就是当前字符串.
				//return this.replace(/^\s+/, "").replace(/\s+$/, "");
				return this.replace(/^\s+|\s+$/g, "");
			}
			
			window.onload = function(){
				document.getElementById("btn").onclick = function(){
					// 获取用户名
					var username = document.getElementById("username").value;
					// 去除前后空白
					username = username.trim();
					// 测试
					alert("--->" + username + "<----");
				}
			}
		</script>
		<input type="text" id="username" />
		<input type="button" value="获取用户名" id="btn" />
	</body>
</html>

<!--
表单验证：
	（1）用户名不能为空
	（2）用户名必须在6-14位之间
	（3）用户名只能有数字和字母组成，不能含有其它符号（正则表达式）
	（4）密码和确认密码一致，邮箱地址合法。
	（5）统一失去焦点验证
	（6）错误提示信息统一在span标签中提示，并且要求字体12号，红色。
	（7）文本框再次获得焦点后，清空错误提示信息，如果文本框中数据不合法要求清空文本框的value
	（8）最终表单中所有项均合法方可提交
-->
```

### 005-表单验证

``` html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>表单验证</title>
		<style type="text/css">
			span {
				color: red;
				font-size: 12px;
			}
		</style>
	</head>
	<body>
		<script type="text/javascript">
			/*
			（1）用户名不能为空
			（2）用户名必须在6-14位之间
			（3）用户名只能有数字和字母组成，不能含有其它符号（正则表达式）
			（4）密码和确认密码一致，邮箱地址合法。
			（5）统一失去焦点验证
			（6）错误提示信息统一在span标签中提示，并且要求字体12号，红色。
			（7）文本框再次获得焦点后，清空错误提示信息，如果文本框中数据不合法要求清空文本框的value
			（8）最终表单中所有项均合法方可提交
			*/
		   window.onload = function(){
			   // 获取username的span标签
			   var usernameErrorSpan = document.getElementById("usernameError");
			   // 给用户名文本框绑定blur事件
			   var usernameElt = document.getElementById("username");
			   usernameElt.onblur = function(){
				   // 获取用户名
				   var username = usernameElt.value;
				   // 去除前后空白
				   username = username.trim();
				   // 判断用户名是否为空
				   /*
				   if(username){
					   // 代表username不是空字符串
					   alert("username = " + username);
				   }else{
					   // 代表username是空字符串
					   alert("username是空字符串");
				   }
				   */
				   // if(username.length == 0){}
				   if(username === ""){
					   // 用户名为空
					   usernameErrorSpan.innerText = "用户名不能为空";
				   }else{
					   // 用户名不为空
					   // 继续判断长度[6-14]
					   if(username.length < 6 || username.length > 14){
						   // 用户名长度非法
						   usernameErrorSpan.innerText = "用户名长度必须在[6-14]之间";
					   }else{
						   // 用户名长度合法
						   // 继续判断是否含有特殊符号
						   var regExp = /^[A-Za-z0-9]+$/;
						   var ok = regExp.test(username);
						   if(ok){
							   // 用户名最终合法
						   }else{
							   // 用户名中含有特殊符号
							   usernameErrorSpan.innerText = "用户名只能由数字和字母组成";
						   }
					   }
				   }
			   }
			   
			   // 给username这个文本框绑定获得焦点事件
			   usernameElt.onfocus = function(){
				   // 清空非法的value
				   if(usernameErrorSpan.innerText != ""){
					   usernameElt.value = "";   
				   }
				   // 清空span
				   usernameErrorSpan.innerText = "";
			   }
			   
			   // 获取密码错误提示的span标签
			   var pwdErrorSpan = document.getElementById("pwdError");
			   // 获取确认密码框对象
			   var userpwd2Elt = document.getElementById("userpwd2");
			   // 绑定blur事件
			   userpwd2Elt.onblur = function(){
				   // 获取密码和确认密码
				   var userpwdElt = document.getElementById("userpwd");
				   var userpwd = userpwdElt.value;
				   var userpwd2 = userpwd2Elt.value;
				   if(userpwd != userpwd2){
					   // 密码不一致
					   pwdErrorSpan.innerText = "密码不一致";
				   }else{
					   // 密码一致
				   }
			   }
			   
			   // 绑定focus事件
			   userpwd2Elt.onfocus = function(){
				   if(pwdErrorSpan.innerText != ""){
					   userpwd2Elt.value = "";
				   }
				   pwdErrorSpan.innerText = "";
			   }
			   
			   // 获取email的span
			   var emailSpan = document.getElementById("emailError");
			   // 给email绑定blur事件
			   var emailElt = document.getElementById("email");
			   emailElt.onblur = function(){
				   // 获取email
				   var email = emailElt.value;
				   // 编写email的正则
				   var emailRegExp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
				   var ok = emailRegExp.test(email);
				   if(ok){
					   // 合法
				   }else{
					   // 不合法
					   emailSpan.innerText = "邮箱地址不合法";
				   }
			   }
			   
			   // 给emailElt绑定focus
			   emailElt.onfocus = function(){
				   if(emailSpan.innerText != ""){
					   emailElt.value = "";
				   }
				   emailSpan.innerText = "";
			   }
			   
			   // 给提交按钮绑定鼠标单击事件
			   var submitBtnElt = document.getElementById("submitBtn");
			   submitBtn.onclick = function(){
				   // 触发username的blur userpwd2的blur email的blur
				   // 不需要人工操作,使用纯JS代码触发事件.
				   usernameElt.focus();
				   usernameElt.blur();
				   
				   userpwd2Elt.focus();
				   userpwd2Elt.blur();
				   
				   emailElt.focus();
				   emailElt.blur();
				   
				   // 当所有表单项都是合法的时候,提交表单
				   if(usernameErrorSpan.innerText == "" && pwdErrorSpan.innerText == "" && emailSpan.innerText == ""){
					   // 获取表单对象
					   var userFormElt = document.getElementById("userForm");
					   // 可以在这里设置action,也可以不在这里.
					   userFormElt.action = "http://localhost:8080/jd/save";
					   // 提交表单
					   userFormElt.submit();
				   }
			   }
		   }
		</script>
		
		<!--这个表单提交应该使用post，这里为了检测，所以使用get。-->
		<!-- <form id="userForm" action="http://localhost:8080/jd/save" method="get"> -->
		<form id="userForm" method="get">
			用户名<input type="text" name="username" id="username"/><span id="usernameError"></span><br>
			密码<input type="text" name="userpwd" id="userpwd"/><br>
			确认密码<input type="text" id="userpwd2" /><span id="pwdError"></span><br>
			邮箱<input type="text" name="email" id="email" /><span id="emailError"></span><br>
			<!-- <input type="submit" value="注册" /> -->
			<input type="button" value="注册" id="submitBtn"/>
			<input type="reset" value="重置" />
		</form>
		
	</body>
</html>

```

### 006-复选框的全选和取消全选

``` html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>复选框的全选和取消全选</title>
	</head>
	<body>
		<script type="text/javascript">
			/*
			window.onload = function(){
				var firstChk = document.getElementById("firstChk");
				firstChk.onclick = function(){
					// 获取第一个复选框的选中状态(复选框对象checkbox对象)
					//alert(firstChk.checked);
					// 根据name获取所有元素
					var aihaos = document.getElementsByName("aihao");
					if(firstChk.checked){
						// 全选
						for(var i = 0; i < aihaos.length; i++){
							aihaos[i].checked = true;
						}
					}else{
						// 取消全选
						for(var i = 0; i < aihaos.length; i++){
							aihaos[i].checked = false;
						}
					}
				}
			}
			*/
		   
			window.onload = function(){
				
				var aihaos = document.getElementsByName("aihao");
				var firstChk = document.getElementById("firstChk");
				firstChk.onclick = function(){
					for(var i = 0; i < aihaos.length; i++){
						aihaos[i].checked = firstChk.checked;
					}
				}
				
				// 对以上数组进行遍历
				var all = aihaos.length;
				for(var i = 0; i < aihaos.length; i++){
					aihaos[i].onclick = function(){
						var checkedCount = 0;
						// 总数量和选中的数量相等的时候,第一个复选框选中.
						for(var i = 0; i < aihaos.length; i++){
							if(aihaos[i].checked){
								checkedCount++;
							}
						}
						firstChk.checked = (all == checkedCount);
						/*
						if(all == checkedCount){
							firstChk.checked = true;
						}else{
							firstChk.checked = false;
						}
						*/
					}
				}
			}
		</script>
		<input type="checkbox" id="firstChk"/><Br>
		<input type="checkbox" name="aihao" value="smoke" />抽烟<Br>
		<input type="checkbox" name="aihao" value="drink" />喝酒<Br>
		<input type="checkbox" name="aihao" value="tt" />烫头<Br>
	</body>
</html>

```

### 007-获取下拉列表选中项的value

``` html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>获取下拉列表选中项的value</title>
	</head>
	<body>
		<!--
		<select onchange="alert(this.value)">
			<option value="">--请选择省份--</option>
			<option value="001">河北省</option>
			<option value="002">河南省</option>
			<option value="003">山东省</option>
			<option value="004">山西省</option>
		</select>
		-->
		
		<script type="text/javascript">
			window.onload = function(){
				var provinceListElt = document.getElementById("provinceList");
				provinceListElt.onchange = function(){
					// 获取选中项的value
					alert(provinceListElt.value);
				}
			}
		</script>
		<select id="provinceList">
			<option value="">--请选择省份--</option>
			<option value="001">河北省</option>
			<option value="002">河南省</option>
			<option value="003">山东省</option>
			<option value="004">山西省</option>
		</select>
		
	</body>
</html>

<!--
省份和市区的关系是：1对多
省份表t_province
id      pcode      pname
----------------------------
1       001        河北省
2       002        河南省
3       003        山东省
4       004        山西省

市区表t_city
id      ccode      cname       pcode(fk)
----------------------------------------------
1       101        石家庄         001
2       102        保定         001
3       103        邢台         001
4       104        承德         001
5       105        张家口         001
6       106        邯郸         001
7       107        衡水         001

前端用户选择的假设是河北省，那么必须获取到河北省的pcode，获取到001
然后将001发送提交给服务器，服务器底层执行一条SQL语句：
	select * from t_city where pcode = '001';
	
	返回一个List集合，List<City> cityList;
	
	cityList响应浏览器，浏览器在解析cityList集合转换成一个新的下拉列表。

-->
```

### 008-显示网页时钟

``` html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>显示网页时钟</title>
	</head>
	<body>
		<script type="text/javascript">
			/*
				关于JS中内置的支持类：Date，可以用来获取时间/日期。
			*/
		   // 获取系统当前时间
		   var nowTime = new Date();
		   // 输出
		   // document.write(nowTime);
		   // 转换成具有本地语言环境的日期格式.
		   nowTime = nowTime.toLocaleString();
		   document.write(nowTime);
		   document.write("<br>");
		   document.write("<br>");
		   // 当以上格式不是自己想要的,可以通过日期获取年月日等信息,自定制日期格式.
		   var t = new Date();
		   var year = t.getFullYear(); // 返回年信息,以全格式返回.
		   var month = t.getMonth(); // 月份是:0-11
		   // var dayOfWeek = t.getDay(); // 获取的一周的第几天(0-6)
		   var day = t.getDate(); // 获取日信息.
		   document.write(year + "年" + (month+1) + "月" + day + "日");
		   
		   document.write("<br>");
		   document.write("<br>");
		   
		   // 重点:怎么获取毫秒数？(从1970年1月1日 00:00:00 000到当前系统时间的总毫秒数)
		   //var times = t.getTime();
		   //document.write(times); // 一般会使用毫秒数当做时间戳. (timestamp)
		   
		   document.write(new Date().getTime());
		   
		</script>
		
		<script type="text/javascript">
			function displayTime(){
				var time = new Date();
				var strTime = time.toLocaleString();
				document.getElementById("timeDiv").innerHTML = strTime;
			}
			
			// 每隔1秒调用displayTime()函数
			function start(){
				// 从这行代码执行结束开始,则会不间断的,每隔1000毫秒调用一次displayTime()函数.
				v = window.setInterval("displayTime()", 1000);	
			}
			
			function stop(){
				window.clearInterval(v);
			}
		</script>
		<br><br>
		<input type="button" value="显示系统时间" onclick="start();"/>
		<input type="button" value="系统时间停止" onclick="stop();" />
		<div id="timeDiv"></div>
	</body>
</html>

```

### 009-内置支持类Array
``` html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>内置支持类Array</title>
	</head>
	<body>
		<script type="text/javascript">
			/*
			// 创建长度为0的数组
			var arr = [];
			alert(arr.length);
			
			// 数据类型随意
			var arr2 = [1,2,3,false,"abc",3.14];
			alert(arr2.length);
			
			// 下标会越界吗
			arr2[7] = "test"; // 自动扩容.
			
			document.write("<br>");
			
			// 遍历
			for(var i = 0; i < arr2.length; i++){
				document.write(arr2[i] + "<br>");
			}
			
			// 另一种创建数组的对象的方式
			var a = new Array();
			alert(a.length); // 0
			
			var a2 = new Array(3); // 3表示长度.
			alert(a2.length);
			
			var a3 = new Array(3,2);
			alert(a3.length); // 2
			*/
		   
		   var a = [1,2,3,9];
		   var str = a.join("-");
		   alert(str); // "1-2-3-9"
		   
		   // 在数组的末尾添加一个元素(数组长度+1)
		   a.push(10);
		   alert(a.join("-"));
		   
		   // 将数组末尾的元素弹出(数组长度-1)
		   var endElt = a.pop();
		   alert(endElt);
		   alert(a.join("-"));
		   
		   // 注意:JS中的数组可以自动模拟栈数据结构:后进先出,先进后出原则.
		   // push压栈
		   // pop弹栈
		   
		   // 反转数组.
		   a.reverse();
		   alert(a.join("="));
		</script>
	</body>
</html>

```


