
# npm 基本使用

::: tip 此文为转载 （通常一篇文章会参考多处，也会添加自己的理解，引用地址如有遗漏，请指出）
- [https://www.jianshu.com/p/60ac7fe6edce](https://www.jianshu.com/p/60ac7fe6edce)
- [http://www.ruanyifeng.com/blog/2016/01/npm-install.html](http://www.ruanyifeng.com/blog/2016/01/npm-install.html)
- [http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html](http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html)
- [https://www.runoob.com/nodejs/nodejs-npm.html](https://www.runoob.com/nodejs/nodejs-npm.html)
:::

## 基本介绍
npm 最初它只是被称为 Node Package Manager，用来作为Node.js的包管理器。但是随着其它构建工具(webpack、browserify)的发展，npm已经变成了 "the package manager for JavaScript"，它用来安装、管理和分享JavaScript包，同时会自动处理多个包之间的依赖。

### 安装
新版的nodejs已经集成了npm， nodejs分为了长期支持版和当前版本。

安装好后，你可以查看版本
``` sh
npm -v
```

### 升级现有npm版本
``` sh
npm install npm -g
```

### 更换npm镜像站点
配置 npm 的国内镜像站点为：`https://registry.npm.taobao.org`。

方法一：在系统的`HOME`目录新建.npmrc文件并添加 `registry = https://registry.npm.taobao.org`<br>方法二：你可以使用淘宝定制的 `cnpm` 命令行工具代替默认的 npm:

``` sh
npm install -g cnpm --registry=https://registry.npm.taobao.org

//之后即可使用cnpm来安装包
cnpm install <package>
```

## 安装模块

npm 的包安装分为本地安装（local）、全局安装（global）两种。

### 本地安装(默认)

``` sh
npm install <package>      # 本地安装
# 或者
npm i <package>
```

- 将安装包放在`./node_modules`下（运行 npm 命令时所在的目录），如果没有`node_modules` 目录，会在当前执行 npm 命令的目录下生成`node_modules`目录。
- js代码中可以通过 `require()` 来引入本地安装的包。

### 全局安装

``` sh
npm install <package> -g   # 全局安装
```

- 将安装包放在`/usr/local`下或者你`node`的安装目录。
- 可以直接在命令行里使用。这是使用全局安装的主要原因。

使用下面的命令来查看全局的包安装的位置：
``` sh
npm prefix -g
```

### 创建全局链接

如果你希望具备两者功能（本地安装和全局安装的功能），则需要在两个地方安装它或使用`npm link`。

`npm link`的功能是在本地包和全局包之间创建符号链接。我们说过使用全局模式安装的包不能直接通过`require`使用,但通过`npm link`命令可以打破这一限制。

比如我们将express安装到了全局环境，使用下面的命令可以将其链接到本地环境：
``` sh
npm link express
```
使用`npm link`命令还可以将本地的包链接到全局。使用方法是在包目录(`package.json`所在目录)中运行`npm link`命令。

如果你的项目不再需要该模块，可以在项目目录内使用npm unlink命令，删除符号链接。

> 像gem 或 pip 总是以全局模式安装，使包可以供所有的程序使用，而 npm 默认会把包安装到当前目录下。这反映了 npm 不同的设计哲学。如果把包安装到全局，可以提高程序的重复利用程度,避免同样的内容的多份副本，但坏处是难以处理不同的版本依赖。


### 常用命令

``` sh
# 查看命令帮助
npm help <command>

# 列出各命令
npm -l

# 查看安装信息和它们的依赖
npm ls -g   # 列出当前项目中的包
npm ls      # 列出当前项目中的包

# 卸载模块
npm uninstall <package>

# 更新模块
npm update <package> # 更新当前项目中安装的某个包
npm update # 更新当前项目中安装的所有包
npm update <package> -g # 更新全局安装的包

# 搜索模块
npm search <关键字>

# 列出npm的配置
npm config list -l

# 列出bin目录
npm bin
```

## 使用 package.json

当你的项目需要依赖多个包时，推荐使用 package.json。其优点为：
- 它以文档的形式规定了项目所依赖的包
- 可以确定每个包所使用的版本
- 项目的构建可以重复，在多人协作时更加方便

`package.json` 位于模块的目录下，用于定义包的属性。例如之前我们安装的 `express` 包，它的 `package.json` 文件位于 `node_modules/express/package.json`。

### 创建package.json文件

- 手动创建
- 或者 通过`npm init`命令生成遵守规范的`package.json`文件

文件中必须包含：`name` 和 `version`

### package.json 属性说明

- **name** - 包名。
- **version** - 包的版本号。
- **description** - 包的描述。
- **homepage** - 包的官网 url 。
- **author** - 包的作者姓名。
- **contributors** - 包的其他贡献者姓名。
- **dependencies** - 依赖包列表。如果依赖包没有安装，npm 会自动将依赖包安装在 node_module 目录下。
- **repository** - 包代码存放的地方的类型，可以是 git 或 svn，git 可在 Github 上。
- **main** - main 字段指定了程序的主入口文件，require('moduleName') 就会加载这个文件。这个字段的默认值是模块根目录下面的 index.js。
- **keywords** - 关键字


### 指定依赖包

两种依赖包：

- `dependencies`: 在生产环境中需要依赖的包。通过`npm install <packge> --save`命令自动添加依赖到文件（或者使用简写的参数 `-S`）。
- `devDependencies`：仅在开发和测试环节中需要依赖的包。通过`npm install <packge> --save-dev`命令自动添加依赖到文件（或者使用简写的参数 `-D`）。

> 当然你也可以在文件中手动添加依赖

::: warning 一般使用方法：

**如果其他人也需要这个项目，只需要把这个 `package.json` 文件给他，然后进行简单的 `npm install` 即可。** <br>(*如本人的blog项目，只需要从github clone代码到本地，然后在目录下直接运行`npm install`即可自动安装依赖包，并创建`/node_modules`目录；测试，即可直接`npm start xxx`运行代码了*)

<br>

:::


### 设置默认配置

使用 `npm set` 命令用来设置环境变量。也可以用它来为 `npm init` 设置默认值，这些值会保存在 `~/.npmrc` 文件中。
``` sh
$ npm set init-author-name 'Your name'
$ npm set init-author-email 'Your email'
$ npm set init-author-url 'http://yourdomain.com'
$ npm set init-license 'MIT'
```

### 更改全局安装目录
使用 `npm config` 命令可以达到此目的。
``` sh
npm config set prefix <目录>
```

或者手动在 `~/.npmrc` 文件中进行配置：
``` sh
prefix = /home/yourUsername/npm
```

更改目录后记得在系统环境变量 `PATH` 中添加该路径：
``` sh
# .bashrc 文件
export PATH=~/npm/bin:$PATH
```

## 多版本管理器

`Node.js` 的社区开发了多版本管理器，用于在一台机器上维护多个版本的 `Node.js` 实例，方便按需切换。Node 多版本管理器(Node Version Manager，nvm)是一个通用的叫法，它目前有许多不同的实现。这里使用`visionmedia/n`。`n` 是一个十分简洁的 Node 多版本管理器。

如果已经安装好npm则可以简单的使用 `npm install -g n` 来安装n。事实上，n 并不需要 Node.js 驱动，它只是 bash 脚本；我们可以在 [https://github.com/visionmedia/n](https://github.com/visionmedia/n) 下载它的代码，然后使用 make install 命令安装。

n的常用命令：
``` sh
# 查看帮助 
n --help

# 安装 6.9.5版本的nodejs。 
# 通过 n 获取的 Node.js 实例都会安装在 /usr/local/n/versions/ 目录中（看情况吧）
n 6.9.5

# 列出已经安装的 Node.js 。结果中 * 表示默认版本
n

# 版本切换，与安装node.js一样
n 6.9.5

# 指明使用某版本的 node.js 执行某脚本(比如 script.js)
n use 6.9.5 script.js
```

- PREFIX=$CUSTOM_LOCATION make install； 自定义 n 的安装路径（避免使用sudo）
- 自定义node.js的安装路径(通过n安装)；通过设置环境变量 export N_PREFIX=$HOME
- 自定义 source。（镜像站点）
- 自定义 架构(architecture)
- 如果使用n切换了node.js的版本后，npm没有正确运行，通过运行相关脚本解决。（见 n: working-with-npm）
> 详细用法见 ： [n: Node version management](https://github.com/tj/n) <br>
注意：<br>
n 无法管理通过其他方式安装的 Node.js 版本实例(如官方提供的安装包、发行版软件源、手动编译)，也就说无法管理不是用 n 安装的node.js。<br>
n 不支持在Windows上使用

## 发布包

在发布之前,首先需要让我们的包符合 npm 的规范,npm 有一套以 CommonJS 为基础包规范,但与 CommonJS并不完全一致,其主要差别在于必填字段的不同。通过使用 npm init 可以根据交互问答产生一个符合标准的 package.json。

npm init 运行示例：
``` sh
$ npm init
name: (node) test
version: (1.0.0) 
description: 
entry point: (index.js) 
test command: 
git repository: 
keywords: 
author: 
license: (ISC) 
About to write to /tmp/node/package.json:

{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}


Is this ok? (yes) 
```
该文件就是一个符合 npm 规范的 package.json 文件。这里的 index.js 作为包的接口。
> 也可简单的使用 `npm init -y`。其中-y（代表yes）

创建帐号：
``` sh
npm adduser
```
测试是否取得帐号：
``` sh
npm whoami
```
发布
``` sh
npm publish
```
更新包：修改 version字段，再重新发布

取消发布：
``` sh
npm unpublish
```


## npm scripts 使用指南

Node 开发离不开 npm，而脚本功能是 npm 最强大、最常用的功能之一。
本文介绍如何使用 npm 脚本（npm scripts）。

### 什么是 npm 脚本？

npm 允许在package.json文件里面，使用scripts字段定义脚本命令。
``` json
{
  // ...
  "scripts": {
    "build": "node build.js"
  }
}
```
上面代码是package.json文件的一个片段，里面的scripts字段是一个对象。它的每一个属性，对应一段脚本。比如，build命令对应的脚本是node build.js。

``` sh
$ npm run build
# 等同于执行
$ node build.js
```

这些定义在package.json里面的脚本，就称为 npm 脚本。它的优点很多:
- 项目的相关脚本，可以集中在一个地方。
- 不同项目的脚本命令，只要功能相同，就可以有同样的对外接口。用户不需要知道怎么测试你的项目，只要运行npm run test即可。
- 可以利用 npm 提供的很多辅助功能。

查看当前项目的所有 npm 脚本命令，可以使用不带任何参数的npm run命令。
``` sh
$ npm run
```

### 原理

npm 脚本的原理非常简单。每当执行npm run，就会自动新建一个 Shell，在这个 Shell 里面执行指定的脚本命令。因此，只要是 Shell（一般是 Bash）可以运行的命令，就可以写在 npm 脚本里面。

比较特别的是，`npm run`新建的这个 Shell，会将当前目录的`node_modules/.bin`子目录加入`PATH`变量，执行结束后，再将`PATH`变量恢复原样。<br>
这意味着，当前目录的`node_modules/.bin`子目录里面的所有脚本，都可以直接用脚本名调用，而不必加上路径。比如，当前项目的依赖里面有 Mocha，只要直接写`mocha test`就可以了。
``` json
"test": "mocha test"
```
而不用写成下面这样:
``` json
"test": "./node_modules/.bin/mocha test"
```

由于 npm 脚本的唯一要求就是可以在 Shell 执行，因此它不一定是 Node 脚本，任何可执行文件都可以写在里面。<br>
npm 脚本的退出码，也遵守 Shell 脚本规则。如果退出码不是`0`，npm 就认为这个脚本执行失败。


### 通配符

由于 npm 脚本就是 Shell 脚本，因为可以使用 Shell 通配符。

``` json
"lint": "jshint *.js"
"lint": "jshint **/*.js"
```
上面代码中，*表示任意文件名，**表示任意一层子目录。<br>
如果要将通配符传入原始命令，防止被 Shell 转义，要将星号转义。
``` json
"test": "tap test/\*.js"
```

### 传参

向 npm 脚本传入参数，要使用`--`标明。

### 执行顺序

如果 npm 脚本里面需要执行多个任务，那么需要明确它们的执行顺序。如果是并行执行（即同时的平行执行），可以使用 `&` 符号。

``` sh
$ npm run script1.js & npm run script2.js
```

如果是继发执行（即只有前一个任务成功，才执行下一个任务），可以使用&&符号。

``` sh
$ npm run script1.js && npm run script2.js
```

### 默认值

一般来说，npm 脚本由用户提供。但是，npm 对两个脚本提供了默认值。也就是说，这两个脚本不用定义，就可以直接使用。
``` json
"start": "node server.js"，
"install": "node-gyp rebuild"
```

上面代码中，`npm run start`的默认值是`node server.j`s，前提是项目根目录下有`server.js`这个脚本；`npm run install`的默认值是`node-gyp rebuild`，前提是项目根目录下有`binding.gyp`文件。

### 钩子

npm 脚本有`pre`和`post`两个钩子。举例来说，`build`脚本命令的钩子就是`prebuild`和`postbuild`。
``` json
"prebuild": "echo I run before the build script",
"build": "cross-env NODE_ENV=production webpack",
"postbuild": "echo I run after the build script"
```

用户执行npm run build的时候，会自动按照下面的顺序执行。
``` sh
npm run prebuild && npm run build && npm run postbuild
```

因此，可以在这两个钩子里面，完成一些准备工作和清理工作。下面是一个例子:
``` json
"clean": "rimraf ./dist && mkdir dist",
"prebuild": "npm run clean",
"build": "cross-env NODE_ENV=production webpack"
```

npm 默认提供下面这些钩子。
```
prepublish，postpublish
preinstall，postinstall
preuninstall，postuninstall
preversion，postversion
pretest，posttest
prestop，poststop
prestart，poststart
prerestart，postrestart
```

自定义的脚本命令也可以加上`pre`和`post`钩子。比如，`myscript`这个脚本命令，也有`premyscript`和`postmyscript`钩子。不过，双重的`pre`和`post`无效，比如`prepretest`和`postposttest`是无效的。

npm 提供一个`npm_lifecycle_event`变量，返回当前正在运行的脚本名称，比如`pretest`、`test`、`posttest`等等。所以，可以利用这个变量，在同一个脚本文件里面，为不同的`npm scripts`命令编写代码。请看下面的例子:
``` sh
const TARGET = process.env.npm_lifecycle_event;

if (TARGET === 'test') {
  console.log(`Running the test task!`);
}

if (TARGET === 'pretest') {
  console.log(`Running the pretest task!`);
}

if (TARGET === 'posttest') {
  console.log(`Running the posttest task!`);
}
```

### 简写形式

四个常用的 npm 脚本有简写形式。

- `npm start`是`npm run start`的简写
- `npm stop`是`npm run stop`的简写
- `npm test`是`npm run test`的简写
- `npm restart`是`npm run stop && npm run restart && npm run start`的简写

`npm start`、`npm stop`和`npm restart`都比较好理解，而`npm restart`是一个复合命令，实际上会执行三个脚本命令：`stop`、`restart`、`start`。具体的执行顺序如下:
```
prerestart
prestop
stop
poststop
restart
prestart
start
poststart
postrestart
```

### 变量

npm 脚本有一个非常强大的功能，就是可以使用 npm 的内部变量。

首先，通过`npm_package_`前缀，npm 脚本可以拿到`package.json`里面的字段。比如，下面是一个`package.json`
``` json
{
  "name": "foo", 
  "version": "1.2.5",
  "scripts": {
    "view": "node view.js"
  }
}
```
那么，变量npm_package_name返回foo，变量npm_package_version返回1.2.5。
``` js
// view.js
console.log(process.env.npm_package_name); // foo
console.log(process.env.npm_package_version); // 1.2.5
```
上面代码中，我们通过环境变量`process.env`对象，拿到`package.json`的字段值。如果是 Bash 脚本，可以用`$npm_package_name`和`$npm_package_version`取到这两个值。

`npm_package_`前缀也支持嵌套的`package.json`字段。
``` json
"repository": {
    "type": "git",
    "url": "xxx"
},
scripts: {
    "view": "echo $npm_package_repository_type"
}
```

上面代码中，`repository`字段的`type`属性，可以通过`npm_package_repository_type`取到

下面是另外一个例子
``` json
"scripts": {
  "install": "foo.js"
}
```
上面代码中，`npm_package_scripts_install`变量的值等于`foo.js`。

然后，npm 脚本还可以通过`npm_config_`前缀，拿到 npm 的配置变量，即`npm config get xxx`命令返回的值。比如，当前模块的发行标签，可以通过`npm_config_tag`取到。
``` json
"view": "echo $npm_config_tag",
```
注意，package.json里面的config对象，可以被环境变量覆盖。
``` json
{ 
  "name" : "foo",
  "config" : { "port" : "8080" },
  "scripts" : { "start" : "node server.js" }
}
```
上面代码中，npm_package_config_port变量返回的是8080。这个值可以用下面的方法覆盖。
``` sh
$ npm config set foo:port 80
```
最后，env命令可以列出所有环境变量。
``` json
"env": "env"
```

### 常用脚本示例

``` json
// 删除目录
"clean": "rimraf dist/*",

// 本地搭建一个 HTTP 服务
"serve": "http-server -p 9090 dist/",

// 打开浏览器
"open:dev": "opener http://localhost:9090",

// 实时刷新
 "livereload": "live-reload --port 9091 dist/",

// 构建 HTML 文件
"build:html": "jade index.jade > dist/index.html",

// 只要 CSS 文件有变动，就重新执行构建
"watch:css": "watch 'npm run build:css' assets/styles/",

// 只要 HTML 文件有变动，就重新执行构建
"watch:html": "watch 'npm run build:html' assets/html",

// 部署到 Amazon S3
"deploy:prod": "s3-cli sync ./dist/ s3://example-com/prod-site/",

// 构建 favicon
"build:favicon": "node scripts/favicon.js",
```

## npm 模块安装机制简介

npm 是 Node 的模块管理器，功能极其强大。它是 Node 获得成功的重要原因之一。正因为有了npm，我们只要一行命令，就能安装别人写好的模块:
``` sh
$ npm install 
```
本文介绍 npm 模块安装机制的细节，以及如何解决安装速度慢的问题。

### 从 npm install 说起

`npm install` 命令用来安装模块到`node_modules`目录。
``` sh
$ npm install <packageName>
```
安装之前，`npm install`会先检查，`node_modules`目录之中是否已经存在指定模块。如果存在，就不再重新安装了，即使远程仓库已经有了一个新版本，也是如此。<br>
如果你希望，一个模块不管是否安装过，npm 都要强制重新安装，可以使用-f或--force参数。
``` sh
$ npm install <packageName> --force
```

### npm update

如果想更新已安装模块，就要用到`npm update`命令。

``` sh
$ npm update <packageName>
```
它会先到远程仓库查询最新版本，然后查询本地版本。如果本地版本不存在，或者远程版本较新，就会安装。

### registry

`npm update`命令怎么知道每个模块的最新版本呢？

答案是 npm 模块仓库提供了一个查询服务，叫做 `registry` 。以 `npmjs.org` 为例，它的查询服务网址是 [https://registry.npmjs.org/](https://registry.npmjs.org/)。<br>
这个网址后面跟上模块名，就会得到一个 JSON 对象，里面是该模块所有版本的信息。比如，访问 [https://registry.npmjs.org/react](https://registry.npmjs.org/react)，就会看到 react 模块所有版本的信息。它跟下面命令的效果是一样的:
``` sh
$ npm view react

# npm view 的别名
$ npm info react
$ npm show react
$ npm v react
```

registry 网址的模块名后面，还可以跟上版本号或者标签，用来查询某个具体版本的信息。比如， 访问 `https://registry.npmjs.org/react/v0.14.6` ，就可以看到 React 的 0.14.6 版。<br>返回的 JSON 对象里面，有一个dist.tarball属性，是该版本压缩包的网址。
``` json
dist: {
  shasum: '2a57c2cf8747b483759ad8de0fa47fb0c5cf5c6a',
  tarball: 'http://registry.npmjs.org/react/-/react-0.14.6.tgz' 
},
```
到这个网址下载压缩包，在本地解压，就得到了模块的源码。`npm install`和`npm update`命令，都是通过这种方式安装模块的。

### 缓存目录
`npm install`或`npm update`命令，从 registry 下载压缩包之后，都存放在本地的缓存目录。

这个缓存目录，在 Linux 或 Mac 默认是用户主目录下的`.npm`目录，在 Windows 默认是`%AppData%/npm-cache`。通过配置命令，可以查看这个目录的具体位置
``` sh
$ npm config get cache
$HOME/.npm
```
你最好浏览一下这个目录
``` sh
$ ls ~/.npm 
# 或者
$ npm cache ls
```
你会看到里面存放着大量的模块，储存结构是{cache}/{name}/{version}。
``` sh
$ npm cache ls react
~/.npm/react/react/0.14.6/
~/.npm/react/react/0.14.6/package.tgz
~/.npm/react/react/0.14.6/package/
~/.npm/react/react/0.14.6/package/package.json
```
每个模块的每个版本，都有一个自己的子目录，里面是代码的压缩包`package.tgz`文件，以及一个描述文件`package/package.json`。

除此之外，还会生成一个`{cache}/{hostname}/{path}/.cache.json`文件。比如，从 npm 官方仓库下载 react 模块的时候，就会生成`registry.npmjs.org/react/.cache.json`文件。
这个文件保存的是，所有版本的信息，以及该模块最近修改的时间和最新一次请求时服务器返回的 ETag 
``` json
{
  "time":{
    "modified":"2016-01-06T23:52:45.571Z",
    // ...
  },
  "_etag":"\"7S37I0775YLURCFIO8N85FO0F\""
}
```
对于一些不是很关键的操作（比如`npm search`或`npm view`），npm会先查看`.cache.jso`n里面的模块最近更新时间，跟当前时间的差距，是不是在可接受的范围之内。如果是的，就不再向远程仓库发出请求，而是直接返回`.cache.json`的数据。

`.npm`目录保存着大量文件，清空它的命令如下
``` sh
$ rm -rf ~/.npm/*
# 或者
$ npm cache clean
```

### 模块的安装过程

总结一下，Node模块的安装过程是这样的。

- 发出npm install命令
- npm 向 registry 查询模块压缩包的网址
- 下载压缩包，存放在~/.npm目录
- 解压压缩包到当前项目的node_modules目录

注意，一个模块安装以后，本地其实保存了两份。一份是`~/.npm`目录下的压缩包，另一份是`node_modules`目录下解压后的代码。<br>
但是，运行npm install的时候，只会检查node_modules目录，而不会检查~/.npm目录。也就是说，如果一个模块在～/.npm下有压缩包，但是没有安装在node_modules目录中，npm 依然会从远程仓库下载一次新的压缩包。<br>
这种行为固然可以保证总是取得最新的代码，但有时并不是我们想要的。最大的问题是，它会极大地影响安装速度。即使某个模块的压缩包就在缓存目录中，也要去远程仓库下载，这怎么可能不慢呢？

### --cache-min 参数

为了解决这些问题，npm 提供了一个--cache-min参数，用于从缓存目录安装模块。

`--cache-min`参数指定一个时间（单位为分钟），只有超过这个时间的模块，才会从 registry 下载
``` sh
$ npm install --cache-min 9999999 <package-name>
# 上面命令指定，只有超过999999分钟的模块，才从 registry 下载。实际上就是指定，所有模块都从缓存安装，这样就大大加快了下载速度。
```

它还有另一种写法。
``` sh
$ npm install --cache-min Infinity <package-name>
```
但是，这并不等于离线模式，这时仍然需要网络连接。因为现在的`--cache-min`实现有一些问题。
>（1）如果指定模块不在缓存目录，那么 npm 会连接 registry，下载最新版本。这没有问题，但是如果指定模块在缓存目录之中，npm 也会连接 registry，发出指定模块的 etag ，服务器返回状态码304，表示不需要重新下载压缩包。<br>
（2）如果某个模块已经在缓存之中，但是版本低于要求，npm会直接报错，而不是去 registry 下载最新版本。

>npm 团队知道存在这些问题，正在重写 cache。并且，将来会提供一个`--offlin`e参数，使得 npm 可以在离线情况下使用。<br>
不过，这些改进没有日程表。所以，当前使用--cache-min改进安装速度，是有问题的。

### 离线安装的解决方案
社区已经为npm的离线使用，提出了几种解决方案。它们可以大大加快模块安装的速度。

解决方案大致分成三类:

**第一类，Registry 代理**

- npm-proxy-cache
- local-npm
- npm-lazy

上面三个模块的用法很类似，都是在本机起一个 Registry 服务，所有npm install命令都要通过这个服务代理。

``` sh
# npm-proxy-cache
$ npm --proxy http://localhost:8080 \
  --https-proxy http://localhost:8080 \
  --strict-ssl false \
  install

# local-npm
$ npm set registry http://127.0.0.1:5080

# npm-lazy
$ npm --registry http://localhost:8080/ install socket.io
```

有了本机的Registry服务，就能完全实现缓存安装，可以实现离线使用。

**第二类，npm install替代**

如果能够改变`npm install`的行为，就能实现缓存安装。`npm-cache` 工具就是这个思路。凡是使用`npm install`的地方，都可以使用`npm-cache`替代。

``` sh
$ npm-cache install
```

**第三类，node_modules作为缓存目录**

这个方案的思路是，不使用.npm缓存，而是使用项目的node_modules目录作为缓存
- Freight
- npmbox

上面两个工具，都能将项目的node_modules目录打成一个压缩包，以后安装的时候，就从这个压缩包之中取出文件