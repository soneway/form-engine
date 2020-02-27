# 表单数据配置规范

## 典型示例
```json
{
  "field": {
    "type": "type",
    "label": "label",
    "placeholder": "placeholder",
    "rules": [
      {
        "type": "string",
        "required": true,
        "message": "不能为空"
      },
      {
        "type": "string",
        "pattern": "^[a-z]+$",
        "message": "格式不符合正式表达式"
      },
      {
        "type": "string",
        "min": 5,
        "message": "字符长度必须大于{min}, 数字必须大于{min}"
      },
      {
        "max": 5,
        "message": "字符长度必须小于{max}, 数字必须小于{max}"
      },
      {
        "len": 5,
        "message": "字符长度必须等于{len}, 数字必须等于{len}, 数组长度必须等于{len}"
      }
    ],
    "depRules": [
      {
        "dep": {
          "key": "text",
          "opt": "eq/lt/gt/lte/gte/in/reg",
          "value": "1"
        },
        "type": "string",
        "pattern": "^[a-z]+$",
        "message": "格式不符合正式表达式"        
      }
    ],
    "depStyles": [
      {
        "dep": {
          "key": "text",
          "opt": "eq/lt/gt/lte/gte/in/reg",
          "value": "1"
        },
        "type": "disabled"       
      }    
    ]
  }
}
```

## 配置说明
### field
- 数据字段名称, 配置表单数据中包含的字段
```json
{
  "name": {},
  "age": {}
}
```
以上配置可使表单产生数据: { name: value, age: value }

