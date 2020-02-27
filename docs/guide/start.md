# 快速上手

## 进入开发

### 第1步: 安装依赖
```bash
npm i @soneway/form-engine
```

### 第2步: 引入gdui2
由于form-engine基于gdui2, 需要引入gdui2, 详情参考: [gdui2文档](https://soneway.github.io/gdui2/docs-dist/guide/start.html)

### 第3步: js中注册组件
```javascript
import Vue from 'vue';
import formEngine from '@soneway/form-engine';
Vue.use(formEngine);
```

### 第4步: less中引用样式
```less
@import "~@soneway/form-engine/dist/css/index.css";
```

### 第5步: html中使用组件
```html
<form-editor></form-editor>
```

## 按需引入

借助 [babel-plugin-component](https://www.npmjs.com/package/babel-plugin-component)，我们可以只引入需要的组件，以达到减小项目体积的目的。

### 第1步: 安装 `babel-plugin-component`
```bash
npm install babel-plugin-component -D
```

### 第2步: 添加 babel.config/babelrc 配置：
```json
{
  "plugins": [
    [
      "component",
      {
        "libraryName": "@soneway/form-engine",
        "libDir": "dist",
        "styleLibrary": {
          "base": false, 
          "name": "css"
        }
      }
    ]
  ]
}
```

### 第3步: 在less中删除样式引用
```less
// 删除以下引用代码
@import "~@soneway/form-engine/dist/css/index.css";
```

### 第4步: 在js中引入部分需要用到的组件, 如：
```js
import Vue from 'vue';
import {
  FormEditor,
} from '@soneway/form-engine';

Vue.use(FormEditor);
```
