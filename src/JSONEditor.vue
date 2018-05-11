<template>
  <div ref='jsoneditor'>
    <div class='jsoneditor-loading' v-if="isLoading">
      <span>Loading...</span>
    </div>
  </div>
</template>

<script>
import JSONEditor from 'jsoneditor';
import Ajv from 'ajv';

import basicSchema from 'json-pollock/js/schema/basic.json';
import actionSchema from 'json-pollock/js/schema/action.json';
import styleSchema from 'json-pollock/js/schema/style.json';
import buttonSchema from 'json-pollock/js/schema/button.json';
import cardSchema from 'json-pollock/js/schema/card.json';
import carouselSchema from 'json-pollock/js/schema/carousel.json';
import imageSchema from 'json-pollock/js/schema/image.json';
import linkPreviewSchema from 'json-pollock/js/schema/linkPreview.json';
import mapSchema from 'json-pollock/js/schema/map.json';
import richContentSchema from 'json-pollock/js/schema/rich_content.json';
import templateSchema from 'json-pollock/js/schema/template.json';
import textSchema from 'json-pollock/js/schema/text.json';

export default {
  name: 'JSONEditor',
  components: {
  },
  data() {
    return {
      isLoading: false,
    };
  },
  mounted() {
    let editor = null;

    const updateEditor = (json) => {
      if (json) {
        editor.set(this.$store.state.json);
      }
    };

    const options = {
      mode: 'code',
      modes: ['code', 'form', 'tree'],
      ajv: Ajv({ allErrors: false, format: 'full', unknownFormats: 'ignore', verbose: true, logger: false }),
      schema: richContentSchema,
      schemaRefs: {
        'action.json': actionSchema,
        'basic.json': basicSchema,
        'style.json': styleSchema,
        'button.json': buttonSchema,
        'card.json': cardSchema,
        'carousel.json': carouselSchema,
        'image.json': imageSchema,
        'linkPreview.json': linkPreviewSchema,
        'map.json': mapSchema,
        'rich_content.json': richContentSchema,
        'template.json': templateSchema,
        'text.json': textSchema,
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

    this.$store.watch(
      state => state.json,
      (val) => {
        updateEditor(val);
      },
    );

    this.$store.watch(
      state => state.loading,
      (val) => {
        this.isLoading = val;
      },
    );

    updateEditor(this.$store.state.json);
  },
};
</script>

<style lang="scss" scoped>
  @import '../node_modules/jsoneditor/dist/jsoneditor.css';
  .jsoneditor-loading {
    position: absolute;
    z-index: 999;
    background: rgba(235,235,235, 0.9);
    height: 100%;
    width: 100%;
    text-align: center;
    display: table;

    span {
      font-size: 30px;
      font-weight: bold;
      display: table-cell;
      vertical-align: middle;
    }
  }
</style>
