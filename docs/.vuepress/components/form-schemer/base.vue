<template>
  <div>
    <form-schemer
      v-model="schema"
      :pca-json="pcaJson">
    </form-schemer>
  </div>
</template>

<script>
  import pcaJson from '@soneway/division/dist/pca';

  export default {
    data () {
      return {
        schema: {},
        pcaJson,
      };
    },
  };
</script>
