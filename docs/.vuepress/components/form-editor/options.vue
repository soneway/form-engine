<template>
  <div class="wrapper">
    <form-editor
      ref="formEditor"
      :schema="schema"
      :value="formData">
    </form-editor>
    {{formData}}
  </div>
</template>

<script>
  const schema = {

    select: {
      label: '单选-select',
      type: 'select',
      options: [],
    },

  };

  export default {
    data () {
      return {
        formData: {},
        schema,
      };
    },

    mounted () {
      setTimeout(() => {
        this.schema.select.options = [
          { label: '广东', value: 'gd' },
          { label: '江西', value: 'jx' },
          { label: '山东', value: 'sd' },
        ];
      }, 5000);
    },
  };
</script>
