module.exports = {
  extends: [
    'standard',
    'plugin:vue/essential',
  ],
  env: {
    browser: true,
    node: true,
  },
  plugins: [
    // lint .vue文件
    'vue',
  ],
  parserOptions: {
    // import()不报错
    parser: 'babel-eslint',
  },

  rules: {
    // 对象最后一个属性后的逗号
    'comma-dangle': [2, 'always-multiline'],
    // 语句强制分号结束
    'semi': [2, 'always'],
    // 大括号风格
    'brace-style': ['error', 'stroustrup'],
    // 强制驼峰法命名
    'camelcase': 0,
    // 禁止在使用new构造一个实例后不赋值
    'no-new': 1,
  },
  overrides: [
    // .vue文件重写规则
    {
      files: ['*.vue'],
      rules: {
        'indent': 'off',
        // template缩进
        'vue/html-indent': ['error', 2, {
          'alignAttributesVertically': false,
        }],
        // script缩进
        'vue/script-indent': ['error', 2, {
          'baseIndent': 1,
        }],
        // computed必须返回值
        'vue/return-in-computed-property': 1,
        // 模板空格
        'vue/mustache-interpolation-spacing': ['error', 'always'],
        // 简写
        'vue/v-bind-style': ['error', 'shorthand'],
        'vue/v-on-style': ['error', 'shorthand'],
        // 组件属性顺序
        'vue/order-in-components': 'error',
        // 组件名大小写
        'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      },
    },
  ],
};
