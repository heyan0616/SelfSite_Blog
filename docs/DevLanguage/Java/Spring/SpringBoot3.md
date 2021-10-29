# Spring Boot 场景实例

本质上这些实例都是Java基础，只是套用了Spring Boot的壳。以供参考。



## 文件下载服务

通常我们用静态服务器作为下载服务器。但有时候需求需要编写API实现此功能。

::: tip 参考

- [https://blog.csdn.net/yang1076180972/article/details/103261321](https://blog.csdn.net/yang1076180972/article/details/103261321)

:::

> controller

``` java
@RequestMapping(value = "/download/{filename}",method = RequestMethod.GET)
public String fileDownload(HttpServletResponse response, @PathVariable String filename) throws Exception {
  	String result = downloadService.downloadFile(response, filename);
  
  	ResponseJson json = new ResponseJson(result); //此处可参考 “Spring Boot 系列 1” 中相关介绍
  	return new JSONObject(json).toString();
}
```

> serviceImpl

**方法1：直接将输出流放入response里面作为响应**

``` java
public String downloadFile(HttpServletResponse response, String filename) throws Exception {
  	log.info("start");
  	File file = new File("\\test\\" + filename);
  	if (!(file.exists() && file.canRead())) {
        return "file not exist";
    }
  
  	response.reset();
  	response.setContentType("application/octet-stream");
    response.setCharacterEncoding("utf-8");
    response.setContentLength((int)file.length());
    response.setHeader("Content-Disposition","attachment;filename=" + filename)
      
    FileInputStream inputStream = null;
  	OutputStream outputStream = null;
    try {
        inputStream = new FileInputStream(file);
        byte[] data = new byte[(int) file.length()];
        int length = inputStream.read(data);
        outputStream = response.getOutputStream();
        outputStream.write(data);
        outputStream.flush();
    } catch (FileNotFoundException e) {
        log.error(e.getMessage());
    } catch (IOException e) {
        log.error(e.getMessage());
		} finally {
        if (bos != null) {
            try {
              	bos.close();
            } catch (IOException e1) {
              	log.error(e1.getMessage());
            }
        }
        if (fos != null) {
            try {
              	fos.close();
            } catch (IOException e1) {
              	log.error(e1.getMessage());
            }
        }
    }
  	log.info("end");
  
  	return "success";
}
```



> 测试

```
http://localhost:8888/download/test.xlsx
```



**方法2：将输入流放入ResponseEntity的body里面，并做返回**

*下面这段代码需自行整理 - 并封装到serviceImpl中*

``` java

String separator = File.separator;
 
@RequestMapping(value = "/download", method = RequestMethod.GET, produces ="application/json;charset=UTF-8")
@ResponseBody
public ResponseEntity<InputStreamResource> download() {

    String newName = "2";
    String route = "download" + File.separator + "templates" + File.separator;
    String path = null;
    ResponseEntity<InputStreamResource> response = null;
    try {
        path = "download" + separator + "bst.zip";
        ClassPathResource classPathResource = new ClassPathResource(path);
        InputStream inputStream = classPathResource.getInputStream();
        response = ResponseEntity.ok()
          	.body(new InputStreamResource(inputStream));
    } catch (FileNotFoundException e1) {
      	System.out.println(e1.getMessage());
      	//log.error("找不到指定的文件", e1);
    } catch (IOException e) {
      	System.out.println(e.getMessage());
      	//log.error("获取不到文件流", e);
    }

    return response;

}
```





## 远程下载文件，并保存到本地

基于上面的文件下载api

::: tip 参考

- [https://blog.csdn.net/yang1076180972/article/details/103261321](https://blog.csdn.net/yang1076180972/article/details/103261321)

:::

> controller

``` java
@RequestMapping(value = "/getRemoteFile/{filename}",method = RequestMethod.GET)
public String getRemoteFile(@PathVariable String filename) throws Exception {
  	String result = downloadService.getRemoteFile(filename);
  
  	ResponseJson json = new ResponseJson(result); //此处可参考 “Spring Boot 系列 1” 中相关介绍
  	return new JSONObject(json).toString();
}
```

> serviceImpl

``` java
public String getRemoteFile(String filename) throws Exception {
		String url = "http://localhost:8888/download/" + filename;
    RequestEntity build = RequestEntity.get(new URI(url)).build();
    RestTemplate restTemplate = new RestTemplate();
    ResponseEntity<byte[]> exchange = restTemplate.exchange(build, byte[].class);
    byte[] body = exchange.getBody();

    String filePath = "test/localfilepath";
    BufferedOutputStream bos = null;
    FileOutputStream fos = null;
    File file = null;
    try {
        File dir = new File(filePath);
        if(!dir.exists() && !dir.isDirectory()){
          	dir.mkdirs();
        }
        file = new File(filePath + File.separator + fileName);
        fos = new FileOutputStream(file);
        bos = new BufferedOutputStream(fos);
        bos.write(body);
        bos.flush();
    } catch (Exception e) {
      	e.printStackTrace();
      	//log.error(e.getMessage());
    } finally {
        if (bos != null) {
            try {
              	bos.close();
            } catch (IOException e1) {
              	e1.printStackTrace();
              	//log.error(e1.getMessage());
            }
        }
        if (fos != null) {
            try {
              	fos.close();
            } catch (IOException e1) {
              	e1.printStackTrace();
              	//log.error(e1.getMessage());
            }
        }
    }
}
```



> 测试

```
http://localhost:8888/getRemoteFile/test.xlsx
```



**方式2：URL获取，代码如下：**

``` java
@RequestMapping(value = "/getFile", method = RequestMethod.GET, produces ="application/json;charset=UTF-8")
@ResponseBody
public void getFile() {
    String filePath = "http://localhost:8888/download/";
    //定义文件名
    String fileName = "111.zip";

    //定义要保存的文件路径
    String savePath = "/resources/templates/"+fileName;
    File file = new File(savePath);

    //如果文件目录不出在则创建目录 *getParentFile()*
    if (!file.getParentFile().exists()) {
        //判断文件目录是否存在
        file.getParentFile().mkdirs();//创建目录
    }

    try {
        URL url = new URL(filePath);
        //字节输入流
        InputStream is = url.openStream();
        //字节流转字符流

        DataInputStream dataInputStream = new DataInputStream(is);
        //转化流
        FileOutputStream fileOutputStream = new FileOutputStream(file);

        //使用char 数组传输    -----字节流byte数组
        byte[] chs = new byte[1024];
        //标记
        int len = 0;
        while ((len = dataInputStream.read(chs)) != -1) {
            // read() 方法，读取输入流的下一个字节，返回一个0-255之间的int类型整数。如果到达流的末端，返回-1
            fileOutputStream.write(chs,0,len);
        }
        fileOutputStream.close();
        dataInputStream.close();

    }catch (IOException e) {
      	e.printStackTrace();
    }finally {

    }
}

```

> 以上两种皆可远程获取到文件服务器的文件，只是方式不一样，但是获取本质都是以流的形式获取到，转换为`byte[]` 数组，最终写出来。**方法2**中有一个注意点，`write`方法重载有三个`write(int a)`、`write(byte[] by,int begin,int end)`、`write(byte[] by)`，这里一般用`write(byte[] by,int begin,int end)`,可保证下载文件正常打开，zip、rar文件打开时不会遇到：不可预测的文件尾部 ,这样的异常信息，其次是在以上方式中并没有添加中文乱码情况，可做补充。