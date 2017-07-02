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
    let editor = null;

    const options = {
      mode: 'code',
      onChange: () => {
        try {
          const currentJson = editor.get();
          this.$store.commit('setJson', currentJson);
        } catch (e) {
          // wrong json structure, do nothing
        }
      },
    };
    editor = new JSONEditor(this.$refs.jsoneditor, options);
    editor.set(this.$store.state.json);
  },
  computed: {
    mystore() {
      return this.$store.state.count;
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../node_modules/jsoneditor/dist/jsoneditor.css';
</style>
