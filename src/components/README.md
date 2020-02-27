## 组件开发规范

### 文件夹
1. 一个组件对应一个文件夹
2. 文件夹名小写; 如遇多个单调,使用中划线连接; 如: page-loading

### 文件
1. index.js文件表示组件入口文件
2. 可有多个vue文件, 如为组件vue,一般与文件夹名相同
3. 文件名使用小写, 如遇多个单词,使用中划线连接; 如: page-loading.vue

### 组件编码规范
1. 为减少与data或props中的属性冲突, 计算属性中的元素类名使用下划线打头, 如: _contentClass; 元素样式类似, 如: _contentStyle
2. 组件必须有name属性, 标识组件名称, 以"gd-"前缀打头, 如: gd-button
3. 组件样式类名须以"gd-"前缀打头, 如: gd-radio
4. 组件响应事件方法名以on打头, 小驼峰法命名, 如: onClick或onBtnOkClick
> 其他规范请遵循js最佳实践