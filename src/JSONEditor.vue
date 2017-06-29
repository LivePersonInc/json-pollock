<template>
  <div ref='jsoneditor'>
    
  </div>
</template>

<script>
// import _ from 'lodash';
import JSONEditor from 'jsoneditor';

export default {
  name: 'JSONEditor',
  components: {
  },
  mounted() {
    const options = {
      mode: 'code',
    };
    const editor = new JSONEditor(this.$refs.jsoneditor, options);

    const json = {
      Array: [1, 2, 3],
      Boolean: true,
      Null: null,
      Number: 123,
      Object: { a: 'b', c: 'd' },
      String: 'Hello World',
    };
    editor.set(json);
  },
  computed: {
    mystore() {
      return this.$store.state.count;
    },
  },
};
</script>

<style>
  @import '../node_modules/jsoneditor/dist/jsoneditor.css';
</style>
