<template>
  <div class="wrapper">
    <form-editor
      ref="formEditor"
      :schema="schema"
      :value="formData">
    </form-editor>
    <p style="padding-bottom: 20px;">
      <gd-button
        @click="onClick">表单校验
      </gd-button>
    </p>
    {{formData}}
  </div>
</template>

<script>
  const schema = {

    text: {
      label: '文本',
      type: 'text',
      rules: [
        { type: 'string', required: true },
        { type: 'string', pattern: '^([1][3,4,5,6,7,8,9])\\d{9}$' },
      ],
      // 栅格布局所占格数
      span: 6,
      default: '11',
    },

    number: {
      label: '数字',
      type: 'number',
      span: 6,
      depRules: [
        {
          dep: {
            key: 'text',
            opt: 'reg',
            val: '^([1][3,4,5,6,7,8,9])\\d{9}$',
          },
          type: 'number',
          required: true,
        },
      ],
      depStyles: [
        {
          dep: {
            key: 'text',
            opt: 'eq',
            val: '11',
          },
          type: 'hidden',
        },
      ],
    },

    label: {
      type: 'label',
      label: '这是一段label说明',
    },

    textarea: {
      label: '文本域',
      type: 'textarea',
      // 仅textarea有效
      maxlength: 5,
      rules: [
        { type: 'string', max: 4 },
      ],
      // label对齐方式
      labelAlign: 'right',
      // label的宽度
      labelWidth: '110px',
    },

    radio: {
      // 字符/数字, 如: 'gd'
      label: '单选-radio',
      type: 'radio',
      options: [
        { label: '广东', value: 'gd' },
        { label: '江西', value: 'jx' },
        { label: '山东', value: 'sd' },
      ],
    },

    select: {
      // 字符/数字, 如: 'gd'
      label: '单选-select',
      type: 'select',
      options: [
        { label: '广东', value: 'gd' },
        { label: '江西', value: 'jx' },
        { label: '山东', value: 'sd' },
      ],
      props: {
        filterable: true,
      },
    },

    checkbox: {
      label: '多选',
      // 数组, 如: ['gd', 'jx']
      type: 'checkbox',
      options: [
        { label: '广东', value: 'gd' },
        { label: '江西', value: 'jx' },
        { label: '山东', value: 'sd' },
      ],
    },

    boolean: {
      label: '布尔值',
      type: 'boolean',
    },

    region: {
      label: '地区',
      type: 'region',
    },

    object: {
      label: '对象',
      type: 'object',
      fields: {
        text: {
          type: 'text',
          label: '文字',
        },
        number: {
          type: 'number',
        },
        object: {
          type: 'object',
          expand: false,
          fields: {
            name: {
              type: 'text',
              label: '姓名',
            },
            age: {
              type: 'number',
            },
          },
        },
      },
    },

    array: {
      label: '数组',
      type: 'array',
      fields: {
        name: {
          type: 'text',
          rules: [
            { type: 'string', required: true },
          ],
        },
        age: {
          type: 'number',
        },
      },
    },

    custom: {
      label: '自定义渲染函数',
      render: (h, { value, keyName, schema, supKeyName }) => <gd-input
        value={value[keyName]}
        onInput={(val) => {
          // 手动实现双向绑定
          value[keyName] = val;
        }}
      />,
    },

    datetime: {
      type: 'datetime',
      label: '日期',
    },
  };

  export default {
    data () {
      return {
        formData: {},
        schema,
      };
    },

    methods: {
      onClick () {
        this.$refs.formEditor.validate(
          (data) => {
            console.log('验证成功', data);
          },
          (data) => {
            console.log('验证失败', data);
          },
        );
      },
    },

    mounted () {
      setTimeout(() => {
        this.formData = {
          'object': {
            'object': { 'name': '2222', 'age': 3333 },
            'text': '222', 'number': 333333,
          },
          'array': [],
          datetime: '2019-11-11 12:00:00',
        };
      }, 1000);
    },
  };
</script>

<style lang="less">
  .wrapper {

    h2 {
      margin-bottom: 20px;
    }
  }
</style>
