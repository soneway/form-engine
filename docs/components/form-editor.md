# FormEditor表单填写

## 基础用法
<source-block>
  <form-editor-base />
  <<< @/docs/.vuepress/components/form-editor/base.vue
</source-block>

## 异步数据
<source-block>
  <form-editor-options />
  <<< @/docs/.vuepress/components/form-editor/options.vue
</source-block>

## 依赖校验
<source-block>
  <form-editor-dep-rules />
  <<< @/docs/.vuepress/components/form-editor/dep-rules.vue
</source-block>

## 依赖样式
<source-block>
  <form-editor-dep-styles />
  <<< @/docs/.vuepress/components/form-editor/dep-styles.vue
</source-block>


## 属性配置

### props
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| schema     |  表单配置, 请参考[表单数据配置规范](/guide/schema.html)   |  object |    —   |   -  |
| value     |  表单数据  |  object  |    —   |   -  |
| size     |   表单元素尺寸  |  string  |    large,small,mini   |   -  |
| disabled     |  禁用状态  |  Boolean  |    —   |   false  |
| readonly     |  只读状态  |  Boolean  |    —   |   false  |
| active-key     |  激活的key  |  String  |    —   |   -  |
| colcount   | 表单显示列数 | Number | 1, 2, 3, 4, 6, 12 | 1 |
| gutter   | col之间的间距 | Number | - | 30 |
| label-width   | label的宽度 | String | - | - |
| label-align   | label的文字对齐方式 | left,center,right | - | - |

#### schema.field options (字段配置项)
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| type     |  表单域类型   |  String |    label,text,number,textarea,radio,select,checkbox,boolean,region,object,array,nation,date,year,month,datetime,time   |   text  |
| label     |  表单域label说明  |  String  |    —   |   -  |
| rules     |   校验规则, 详细请参考: [async-validator](https://github.com/yiminghe/async-validator#rules)  |  Array  |    -   |   -  |
| maxlength     |  输入的最大长度, 仅field.type=textarea/text有效  |  Number  |    —   |   -  |
| disabled     |  禁用状态  |  Boolean  |    —   |   false  |
| readonly     |  只读状态  |  Boolean  |    —   |   false  |
| span   | 表单项所占的横向格数(栅格布局, 总格数为12) | Number | 1-12 | 12 |
| labelWidth   | label的宽度 | String | - | - |
| labelAlign   | label的文字对齐方式 | left,center,right | - | - |
| render  | 表单域自定义渲染函数, 表单域将渲染该函数返回的值 | Function | - | - |
| options  | 选项数据源, radio,select,checkbox时有效, 格式如: [ { label, value }, { label, value } ] 或 [ value, value ] | Array | - | - |
| pcaJson  | 地区组件数据源, region时有效 | Array | - | - |
| props  | 其他属性对象, 将直接v-bind到表单组件上 | Object | - | - |
| depRules  | 依赖校验规则 | Array | - | - |
| depStyles  | 依赖样式 | Function | - | - |

#### depRules.item options (依赖校验规则配置项)
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| dep     |  依赖条件   |  Object |    -   |   -  |
| ...rule  | 校验规则其他属性, 详细请参考: [async-validator](https://github.com/yiminghe/async-validator#rules)  | - | - | - |

#### depStyles.item options (依赖样式配置项)
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| dep     |  依赖条件   |  Object |    -   |   -  |
| type  | 样式类型, 如: 隐藏(hidden)  | String | readonly,disabled,hidden | - |


#### dep options
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| key     |  依赖表单域的字段名   |  String |    -  |   -  |
| opt  | 操作符, 如: 相等(eq), 不为空(nie) | String, Function | eq: 等于, neq: 不等于, ie: 为空, nie: 不为空, lt: 小于, lte: 小于等于, gt: 大于, gte: 大于等于, in: 枚举在, reg: 符合正则 | - |
| val  | 依赖表单域的值 | String, Number | - | - |

### events
| 参数      | 说明    | 返回值 |
|---------- |-------- |--- |
| fieldadd     |   添加项事件  | type, keyName | 
| fieldsort     |   排序  | keys | 
| itemclick     |   项点击  | {keyName} | 


### methods
| 参数      | 说明    |
|---------- |-------- |
| validate     |   数据校验  |
