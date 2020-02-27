<template>
  <div class="wrapper">
    <form-editor
      ref="formEditor"
      :colcount="2"
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

    labelRequired: {
      type: 'label',
      label: '依赖非空',
      span: 12,
    },
    depRequired: {
      label: '依赖',
      type: 'text',
    },
    textRequired: {
      label: '文本',
      type: 'text',
      depRules: [
        {
          dep: {
            key: 'depRequired',
            opt: 'eq',
            val: '1',
          },
          type: 'string',
          required: true,
          message: '依赖为1时, 文本不能为空',
        },
        {
          dep: {
            key: 'depRequired',
            opt: 'gt',
            val: '10',
          },
          type: 'string',
          required: true,
          message: '依赖大于10时, 文本不能为空',
        },
      ],
    },

    labelPattern: {
      type: 'label',
      label: '依赖正则',
      span: 12,
    },
    depPattern: {
      label: '依赖',
      type: 'text',
    },
    textPattern: {
      label: '文本',
      type: 'text',
      default: '1',
      depRules: [
        {
          dep: {
            key: 'depPattern',
            opt: 'reg',
            val: '^([1][3,4,5,6,7,8,9])\\d{9}$',
          },
          type: 'string',
          pattern: '^([1][3,4,5,6,7,8,9])\\d{9}$',
          message: '依赖符合正则时, 文本不符合正则',
        },
        {
          dep: {
            key: 'depPattern',
            opt: 'in',
            val: '1,3,5',
          },
          type: 'string',
          pattern: '^([1][3,4,5,6,7,8,9])\\d{9}$',
          message: '依赖为1,3,5其中之一时, 文本不符合正则',
        },
      ],
    },

    labelLen: {
      type: 'label',
      label: '依赖大小',
      span: 12,
    },
    depLen: {
      label: '依赖',
      type: 'text',
    },
    textLen: {
      label: '文本',
      type: 'text',
      default: '1',
      depRules: [
        {
          dep: {
            key: 'depLen',
            opt: 'nie',
          },
          type: 'string',
          len: 10,
          message: '依赖不为空时, 文本长度需为10',
        },
      ],
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
            this.$toast.success('验证成功');
            console.log('验证成功', data);
          },
          (data) => {
            this.$toast.error('验证失败');
            console.log('验证失败', data);
          },
        );
      },
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
