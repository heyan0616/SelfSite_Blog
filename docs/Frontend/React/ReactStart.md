# React 项目搭建

::: tip 转载、参考

- [https://blog.csdn.net/mchales_liu/article/details/110387807](https://blog.csdn.net/mchales_liu/article/details/110387807)

:::

初学者可以尝试手动搭建react项目来了解整个结构，在有经验之后，可以直接使用官方提供的脚手架快速开发。



## 手动搭建React项目



### 项目初始化

- 创建项目目录

- 初始化 npm 项目

  ``` bash
  npm init -y
  ```

- If need - 初始化 git 项目

  ``` bash
  # 初始化项目
  git init
  # 添加 .gitignore
  echo "/node_modules\n/build" >> .gitignore
  # 关联远程仓库
  git remote add origin <url>
  ```

  

### Webpack 配置

#### 1 基础配置设置

- 创建文件 `/src/index.js` ，作为 webpack 的入口文件

  ``` js
  import React from 'react';
  import reactDom from 'react-dom';
   
  const App = () => (
    <div>
      test page
    </div>
  );
  reactDom.render(<App/>, document.getElementById('root'));
  ```

- 创建模板文件 `/public/index.html`，webpack 打包后的文件将添加到该文件

  ``` html
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
  </html>
  ```

- 创建 `webpack` 开发环境下配置文件 `/webpack/webpack.config.dev.js`

  ``` js
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
   
  const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: path.resolve(__dirname, '../public/index.html'),
  });
   
  module.exports = {
    mode: 'development',                              
    entry: path.resolve(__dirname, '../src/index.js'),
    output: {                                         
      path: path.resolve(__dirname, '../build'),      
      filename: 'js/[name].[hash].bundle.js',         
    },
    module: {
      rules: [              
        {
          test: /\.(mjs|js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        }
      ],
    },
   
    plugins: [
      htmlWebpackPlugin,
    ],
   
    resolve: {
      extensions: ['.mjs', '.js', '.jsx'],
    },
  };
  ```

  创建 `webpack` 生产环境下配置文件 `/webpack/webpack.config.js`

  ``` js
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
   
  const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: path.resolve(__dirname, '../public/index.html'),
  });
   
  module.exports = {
    mode: 'production',  // 和开发环境下的配置只是修改了 mode                            
    entry: path.resolve(__dirname, '../src/index.js'),
    output: {                                         
      path: path.resolve(__dirname, '../build'),      
      filename: 'js/[name].[hash].bundle.js',         
    },
    module: {
      rules: [              
        {
          test: /\.(mjs|js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        }
      ],
    },
   
    plugins: [
      htmlWebpackPlugin,
    ],
   
    resolve: {
      extensions: ['.mjs', '.js', '.jsx'],
    },
  };
  ```

- 创建 `babel` 配置文件 `.babelrc`

  ``` json
  {
    "presets": [
      "@babel/preset-react",
      "@babel/preset-env"
    ]
  }
  ```

- 修改 `package.json`，添加 npm 脚本

  ``` json
  "scripts": {
    "start": "webpack-dev-server --config ./webpack/webpack.config.dev.js --open",
    "build": "rm -rf build/* && webpack --config ./webpack/webpack.config.js"
  }
  ```

#### 2 安装基础插件包

- webpack 相关依赖包、插件

  > - webpack: webpack 基础包
  > - webpack-cli: webpack cli 工具包
  > - html-webpack-plugin: webpack 插件, 用于将打包后的文件添加到指定的 html 内
  > - webpack-dev-server: webpack 开发环境工具, 创建一个开发环境
  > - babel-loader: weboack loader, 用于编译打包 js 文件
  > - @babel/core: babel 依赖包, 将 js 代码分析成 ast
  > - @babel/preset-react: webpack react 相关预设
  > - @babel/preset-env: weboack react 相关预设, 这样就可以使用最新的 js 相关语法

  ``` shell
  npm i webpack webpack-cli@3 html-webpack-plugin webpack-dev-server babel-loader @babel/core @babel/preset-react @babel/preset-env -D
  ```

  > <font color=red>这里注意：`webpack-cli` 与`webpack-dev-server`版本要一致，在安装时 `webpack-dev-server`版本为3.x，所以也要指定`webpack-cli`为3.x版本</font>

- react 相关依赖包

  ``` bash
  npm i react react-dom
  ```

#### 3 测试

- 执行 `npm start` 测试项目是否能够正常运行
- 执行 `npm run build` 测试是否能够正常对项目进行打包、编译, 编译后目录结构如下

```
.
├── index.html
└── js
    └── main.be431c2f1d03cff2c427.bundle.js
```



#### 4 总结

到这里一个最基本的 React 项目就已经搭建起来了, 但如果只是这些配置简单配置肯定是远远不够的, 上面只是为了说明其实要搭建一个 React 基础项目还是很简单的, 剩下的工作就是不断的根据具体需求扩充项目配置。下面开始会简单根据需要对项目的配置进行扩展, 比如：

- webpack 添加对 scss 样式文件的解析
- webpack 添加对图片的解析
- 项目添加 eslint 配置
- 项目添加版本发布、git commit 规范配置
- 项目添加对 antd 的支持, 并配置按需加载模块
- ... ...



<br />

::: warning webpack

下面`webpack`相关配置，可以参考 [webpack 入门](/Frontend/Webpack/WebpackStart.html)

<br />

:::

### 添加对 scss 样式文件的支持

#### 1 TODO

1. 添加对 css 样式文件的支持
2. 添加对 scss 样式文件的支持
3. 使用 mini-css-extract-plugin 将 mini-css-extract-plugin
4. 添加 css 模块化的支持, 对 `.module.css` `.module.scss` 的样式文件启用模块化

#### 2 webpack 配置修改

``` js
+ const MiniCssExtractPlugin = require('mini-css-extract-plugin');
 
+ const miniCssExtractPlugin = new MiniCssExtractPlugin({
+   filename: 'style/[name].[hash].css',
+   chunkFilename: 'style/[id].[hash].css',
+ });
 
+ const cssRegex = /\.(css|scss)$/;
+ const cssModuleRegex = /\.module\.(css|scss)$/;
 
module.exports = {
  module: {
    rules: [              
+     {
+       test: cssRegex,
+       exclude: cssModuleRegex,
+       sideEffects: true,
+       use: [
+         {
+           loader: MiniCssExtractPlugin.loader,
+           options: {
+             hmr: process.env.NODE_ENV === 'development',
+           },
+         },
+         { loader: 'css-loader', options: { importLoaders: 1 } },
+         'sass-loader',
+       ],
+     },
+     {
+       test: cssModuleRegex,
+       use: [
+         {
+           loader: MiniCssExtractPlugin.loader,
+           options: {
+             hmr: process.env.NODE_ENV === 'development',
+           },
+         },
+         {
+           loader: 'css-loader',
+           options: {
+             modules: {
+               localIdentName: '[local]__[hash:base64]',
+             },
+           },
+         },
+         'sass-loader',
+       ],
+     }
    ],
  },
 
  plugins: [
+   miniCssExtractPlugin,
  ],
};
```

#### 3 安装依赖

> - css-loader
> - sass-loader
> - node-sass: scss
> - mini-css-extract-plugin

``` bash
npm i mini-css-extract-plugin css-loader sass-loader node-sass -D
```

#### 4 代码测试

- 创建 `src/index.css`

```css
.css {
  padding-top: 20px;
}
```

- 创建 `src/index.module.css`

```css
.module-css {
  padding-right: 20px;
}
```

- 创建 `src/index.scss`

```scss
.scss {
  padding-bottom: 20px;
}
```

- 创建 `src/index.module.scss`

```scss
.module-scss {
  padding-left: 20px;
}
```

- 修改 `src/index.js`

``` jsx
import React from 'react';
import reactDom from 'react-dom';
+ import css from './index.module.css';
+ import scss from './index.module.scss';
+ import './index.css';
+ import './index.scss';
 
const App = () => (
+ <div className={`
+   css
+   scss
+   ${css['module-css']}
+   ${scss['module-scss']}
+ `}>
    test page
  </div>
);
reactDom.render(<App/>, document.getElementById('root'));
```

运行项目测试样式是否正确加载

### 添加对图片的支持

> 这里其实没什么好讲的, 主要使用 `url-loader` 对图片进行处理, 需要特别注意的是该插件依赖于 `file-loader`

#### 1 webpack修改

``` js
module.exports = {
  module: {
    rules: [              
+     {
+       test: /\.(png|jpg|gif|woff|svg|eot|ttf)$/,
+       use: [{
+         loader: 'url-loader',
+         options: {
+           limit: 10000,
+           name: 'assets/[hash].[ext]',
+         },
+       }],
+     },
    ],
  },
};
```

#### 2 依赖安装

``` bash
npm i url-loader file-loader -D
```

#### 3 测试

 找一张图片在 `src/index.js` 中引用看是否能够正常显示即可

``` jsx
import React from 'react';
import reactDom from 'react-dom';
import Img from './1519971416-JDHjSqWCph.jpg';
 
const App = () => (
  <div>
    <img src={Img} />
  </div>
);
reactDom.render(<App/>, document.getElementById('root'));
```

### esling 配置

#### 1 webpack 配置修改

这里只需在 `babel-loader` 之后添加 `eslint-loader`, 需要特别注意的是它们的顺序

```js
module.exports = {
  module: {
    rules: [  
      {
        test: /\.(mjs|js|jsx)$/,
        exclude: /node_modules/,
+       use: ['babel-loader', 'eslint-loader'],
      },
    ],
  },
};
```

#### 2 项目下添加 `.eslintrc.js` 配置文件

``` js
module.exports = {
  parser: 'babel-eslint',
  // 开发环境设置: 在使用下拉环境中的全局变量时不会因为未定义变量而报错, 如 window
  env: {
    browser: true,          
    node: true     
  },
 
  // 定义全局变量, 在直接使用下列全局变量情况下不会因为未定义变量而报错
  globals: {
    _: true,
    lodash: true,
  },
 
  // 插件列表
  plugins: [
    'react',
    'import',
    'react-hooks',
  ],
 
  // 继承的规则
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
  ],
 
  // 自定义规则列表  
  rules: {
    // 强制在每个语句后面使用分号
    "semi": [1, "always"], 
  }
}
```

#### 3 项目下添加 `.eslintignore`

``` json
# 设置需要忽略的文件
/src/assets/*
```

#### 4 安装依赖

> - eslint
> - babel-eslint
> - eslint-loader
> - eslint-plugin-import
> - eslint-plugin-react
> - eslint-plugin-react-hooks

``` bash
npm i eslint babel-eslint eslint-loader eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks -D
```

#### 5 测试

修改 `src/index.js`

``` jsx
import React from 'react';
import reactDom from 'react-dom';
 
const App = () => (
  <div>
    test page
  </div>
)
reactDom.render(<App/>, document.getElementById('root'));
```

重新运行项目, 如果配置正常则会抛出警告

#### 6 添加 npm 脚本, 用于自动修复部分语法不规范的代码

``` js
"scripts": {
+   "eslint:fix": "eslint --fix ./src"
  },
```

通过执行 `npm run eslint:fix` 则会修复项目中部分能够自动修复的不规范代码

### 引入 Antd 并配置按需加载

这里主要为 `.babelrc` 配置添加插件 `babel-plugin-import` 从而实现 antd 的按需加载

#### 1 修改 `.babelrc`

说明: 配置插件时可以设置实例化名称 `import-antd`, 这样就可以多次使用同一插件, 如果你还需要使用 `babel-plugin-import` 处理其他组件库

``` js
{
+ "plugins": [
+   ["import", {
+     "libraryName": "antd",
+     "libraryDirectory": "es",
+     "style": "css"
+   }, "import-antd"]
+ ],
  "presets": [
    "@babel/preset-react",
    "@babel/preset-env"
  ]
}
```

#### 2 依赖安装

``` bash
npm i antd
npm i babel-plugin-import -D
```

#### 3 测试

在 `src/index` 中引用样式, 测试是否能够正常使用

``` jsx
import React from 'react';
import reactDom from 'react-dom';
+ import { Button } from 'antd';
 
const App = () => (
  <div>
+   <Button type="primary">按钮</Button>
  </div>
);
reactDom.render(<App/>, document.getElementById('root'));
```

### 版本发布、git commit 规范校验配置

> **to learn more about this ...**

#### 1 依赖包安装

``` bash
# husky 包安装
npm install husky --save-dev
 
# commitlint 所需包安装
npm install @commitlint/config-angular @commitlint/cli --save-dev
 
# commitizen 包安装
npm install commitizen --save-dev
npm install commitizen -g
 
# standard-version 包安装
npm install standard-version --save-dev
```

#### 2 配置 commitlint 和 commitizen

``` bash
# 生成 commitlint 配置文件
echo "module.exports = {extends: ['@commitlint/config-angular']};" > commitlint.config.js
# commitizen 初始化
commitizen init cz-conventional-changelog --save-dev --save-exact
```

#### 3 更新 package.json

> 脚本说明:
>
> 1. release: 自定义要发布的版本, 如: `npm run release -- 1.0.0`
> 2. release:100: 执行该脚本, 那么如果当前版本是 1.0.0 那么版本将被提升至 2.0.0
> 3. release:010: 执行该脚本, 那么如果当前版本是 1.0.0 那么版本将被提升至 1.1.0
> 4. release:001: 执行该脚本, 那么如果当前版本是 1.0.0 那么版本将被提升至 1.0.1

``` js
{
  "scripts": {
+   "commit": "git-cz",
+   "release": "standard-version --release-as",
+   "release:100": "npm run release -- major",
+   "release:010": "npm run release -- minor",
+   "release:001": "npm run release -- patch",
  },
+ "husky": {
+   "hooks": {
+     "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
+   }
+ }
}
```

#### 4 commit 方式

- 全局安装 commitizen 情况下可使用 `git cz` 或者 `npm run commit` 来提交代码
- 未全局安装 commitizen 情况下可使用 `npm run commit` 来提交代码

#### 5 版本发布流程

``` bash
# 1. 切换到指定分支
git checkout master
# 2. 更新代码
git pull origin master
# 3. 版本发布: 生成 CHANGELOG.md 并创建 tag
npm run release -- --release-as 1.0.0
# 4. 更新 tag 至远程分支
git push --follow-tags origin master
```

### 更多配置

#### 1 webpack 拷贝 public 文件

``` js
+ const CopyWebpackPlugin = require('copy-webpack-plugin');
 
+ const copyWebpackPlugin = new CopyWebpackPlugin(
+   [{ from: path.resolve(__dirname, '../public') }]
+ );
 
module.exports = {
  plugins: [
+   copyWebpackPlugin,
  ]
};
```

#### 2 定义全局变量

``` js
+ const { DefinePlugin } = require('webpack');
 
+ const definePlugin = new DefinePlugin({
+   _DEV_: false,
+   GLOBAL_SERVICE: {
+     HOST: JSON.stringify('https://www.qianyin925.com:4000'),
+     GRAPHQL_URL: JSON.stringify('/graphql'),
+   },
+ });
 
module.exports = {
  plugins: [
+   definePlugin,
  ]
};
```

#### 3 自动加载依赖

``` js
+ const { ProvidePlugin } = require('webpack');
 
+ const providePlugin = new ProvidePlugin({
+   _: 'lodash',
+   lodash: 'lodash',
+ });
 
module.exports = {
  plugins: [
+   providePlugin,
  ]
};
```

#### 4 webpack 定义路径别名

``` js
module.exports = {
  resolve: {
+   alias: config.alias || {},
  },
};
```

#### 5 cross-env 设置环境变量

优点: 兼容多个平台

``` js
{
  "scripts": {
+   "build": "cross-env NODE_ENV=production webpack --config build/webpack.config.js"
  }
}
```

#### 6 raw-loader 用于加载文本内容(.txt、.md 文件)

``` jsx
module.exports = {
  module: {
    rules: [
+     {
+       test: /\.(text|md)$/,
+       use: 'raw-loader',
+     },
    ]
  }
};
```



## 使用脚手架创建React项目

create-react-app是Facebook官方推出的脚手架，基本可以零配置搭建基于webpack的React开发环境

### 创建步骤

进入目录（包含项目的目录），运行

- 搭建一个全局的脚手架

``` bash
npm install -g create-react-app 
```

- 创建项目 

``` bash
create-react-app my-demo
```

> 创建好后的目录结构如下：
>
> <br />
>
> /my-demo
>
> ├── README.md <br />
> ├── node_modules <br />
> ├── package-lock.json <br />
> ├── package.json <br />
> ├── public <br />
>
> ├── ── favicon.ico <br />
> ├── ── index.html <br />
> ├── ── logo192.png <br />
> ├── ── logo512.png <br />
> ├── ── manifest.json <br />
> └── ── robots.txt <br />
>
> └── src <br />
>
> ├──  ── App.css<br />
> ├── ──  App.js<br />
> ├── ──  App.test.js<br />
> ├── ──  index.css<br />
> ├── ──  index.js<br />
> ├── ──  logo.svg<br />
> ├── ──  reportWebVitals.js<br />
> └── ── setupTests.js<br />

- 测试

``` bash
cd my-demo /*进入目录 然后启动*/

npm start
```

> 可能会由于node的版本问题，出错。 - 建议切换node版本



## 附： NPM安装模块

### npm安装模块

- 【npm install xxx】利用 npm 安装xxx模块到当前命令行所在目录；
- 【npm install -g xxx】利用npm安装全局模块xxx；

本地安装时将模块写入package.json中：

- 【npm install xxx】安装但不写入package.json；
- 【npm install xxx –save】 安装并写入package.json的”dependencies”中；
- 【npm install xxx –save-dev】安装并写入package.json的”devDependencies”中。

### npm 删除模块

- 【npm uninstall xxx】删除xxx模块； 
- 【npm uninstall -g xxx】删除全局模块xxx；