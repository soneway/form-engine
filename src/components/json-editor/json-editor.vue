<template>
  <CodeMirror
    v-model="curValue"
    :options="options">
  </CodeMirror>
</template>

<script>
  import 'codemirror/mode/javascript/javascript.js';
  import 'codemirror/addon/fold/brace-fold.js';
  import 'codemirror/addon/fold/foldcode.js';
  import 'codemirror/addon/fold/foldgutter.js';
  import { codemirror as CodeMirror } from 'vue-codemirror';

  const name = 'json-editor';

  export default {
    name,
    components: {
      CodeMirror,
    },
    props: {
      value: String,
      options: {
        type: Object,
        default () {
          return {
            tabSize: 2,
            mode: { name: 'javascript', json: true },
            lineNumbers: true,
            foldGutter: true,
            gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
          };
        },
      },
    },
    data () {
      return {
        curValue: this.value,
      };
    },
    watch: {
      value (value) {
        this.curValue = value;
      },
      curValue (value) {
        this.$emit('input', value);
      },
    },
  };
</script>
