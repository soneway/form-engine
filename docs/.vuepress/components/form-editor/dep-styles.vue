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

    labelHidden: {
      type: 'label',
      label: '依赖隐藏',
      span: 12,
    },
    depHidden: {
      label: '依赖',
      type: 'text',
      placeholder: '依赖为空时, 隐藏文本输入框(依赖不为空时, 显示文本输入框)',
    },
    textHidden: {
      label: '文本',
      type: 'text',
      depStyles: [
        {
          dep: {
            key: 'depHidden',
            opt: 'ie',
          },
          type: 'hidden',
        },
        {
          dep: {
            key: 'depHidden',
            // 依赖大于10时, 文本输入框隐藏
            opt: (depVal) => {
              return depVal > 10;
            },
          },
          type: 'hidden',
        },
      ],
    },

    labelDisabled: {
      type: 'label',
      label: '依赖禁用',
      span: 12,
    },
    depDisabled: {
      label: '依赖',
      type: 'text',
      placeholder: '依赖大于等于10时, 禁用文本输入框',
    },
    textDisabled: {
      label: '文本',
      type: 'text',
      depStyles: [
        {
          dep: {
            key: 'depDisabled',
            opt: 'gte',
            val: '10',
          },
          type: 'disabled',
        },
      ],
    },

    labelReadonly: {
      type: 'label',
      label: '依赖只读',
      span: 12,
    },
    depReadonly: {
      label: '依赖',
      type: 'text',
      placeholder: '依赖小于等于10时, 文本输入框只读',
    },
    textReadonly: {
      label: '文本',
      type: 'text',
      depStyles: [
        {
          dep: {
            key: 'depReadonly',
            opt: 'lte',
            val: '10',
          },
          type: 'readonly',
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
