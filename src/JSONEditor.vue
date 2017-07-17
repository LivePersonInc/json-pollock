<template>
  <div ref='jsoneditor'>
    
  </div>
</template>

<script>
// import _ from 'lodash';
import JSONEditor from 'jsoneditor';
import Ajv from 'ajv';

import elementSchema from 'json-pollock/js/schema/element.json';
import basicSchema from 'json-pollock/js/schema/basic.json';
import actionSchema from 'json-pollock/js/schema/action.json';
import styleSchema from 'json-pollock/js/schema/style.json';

export default {
  name: 'JSONEditor',
  components: {
  },
  mounted() {
    let editor = null;

    const options = {
      mode: 'code',
      modes: ['code', 'form', 'tree'],
      ajv: Ajv({ allErrors: false, format: 'full', unknownFormats: 'ignore', verbose: true }),
      schema: elementSchema,
      schemaRefs: {
        'action.json': actionSchema,
        'basic.json': basicSchema,
        'style.json': styleSchema,
        'element.json': elementSchema,
      },
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
