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
import { parse } from 'json-source-map';
import { get } from 'lodash';

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
import checkBoxSchema from 'json-pollock/js/schema/checkbox.json';
import listSchema from 'json-pollock/js/schema/list.json';
import checkListSchema from 'json-pollock/js/schema/checklist.json';
import submitButtonSchema from 'json-pollock/js/schema/submitButton.json';
import sectionSchema from 'json-pollock/js/schema/section.json';
import sectionListSchema from 'json-pollock/js/schema/sectionList.json';
import specialActionSchema from 'json-pollock/js/schema/specialAction.json';
import buttonListSchema from 'json-pollock/js/schema/buttonList.json';
import keyValuePairSchema from 'json-pollock/js/schema/keyValuePair.json';

let editor;

export default {
  name: 'JSONEditor',
  components: {
  },
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    setJson(json) {
      if (json) {
        editor.set(json);
        this.$store.commit('setJson', json);
      }
    },
  },
  mounted() {
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
        'checkbox.json': checkBoxSchema,
        'list.json': listSchema,
        'checklist.json': checkListSchema,
        'submitButton.json': submitButtonSchema,
        'section.json': sectionSchema,
        'sectionList.json': sectionListSchema,
        'specialAction.json': specialActionSchema,
        'buttonList.json': buttonListSchema,
        'keyValuePair.json': keyValuePairSchema,
      },
      onChange: () => {
        try {
          const currentJson = editor.get();
          this.$store.commit('setJson', currentJson);
          this.$store.commit('setJsonValid', true);
          this.$store.commit('setEdited', true);
        } catch (e) {
          this.$store.commit('setJsonValid', false);
        }
      },
    };

    editor = new JSONEditor(this.$refs.jsoneditor, options);

    this.$store.watch(
      state => state.loading,
      (val) => {
        this.isLoading = val;
      },
    );

    this.$store.watch(
      state => state.jsonSelectionPath,
      (val) => {
        try {
          editor.setMode('code');
          const currentJsonText = editor.getText();
          const jsSourceMap = parse(currentJsonText);
          const pointer = get(jsSourceMap, `pointers[${val}]`);
          if (pointer) {
            const startP = { row: pointer.value.line + 1, column: pointer.value.column + 1 };
            const endP = { row: pointer.valueEnd.line + 1, column: pointer.valueEnd.column + 1 };
            editor.setTextSelection(startP, endP);
          }
        } catch (e) {
          // do nothing
        }
      },
    );
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
