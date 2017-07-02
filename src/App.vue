<template>
  <div id="app">
    <h1>Json Pollock Playground</h1>
    <JSONEditor class="jsoneditor_container"></JSONEditor>
    <JSONPollock class="jsonpollock_container"></JSONPollock>
  </div>
</template>

<script>
// import _ from 'lodash';
import JSONEditor from './JSONEditor';
import JSONPollock from './JSONPollock';

export default {
  name: 'app',
  components: {
    JSONEditor,
    JSONPollock,
  },
  mounted() {
  },
  computed: {
    mystore() {
      return this.$store.state.count;
    },
  },
};
</script>

<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: calc(100% - 80px);
}

.editor_container {
  width: 48%;
  height:calc(100% - 200px);
  position: absolute;
}

.jsoneditor_container {
  @extend .editor_container;
}

.jsonpollock_container {
  @extend .editor_container;

  left: 50%;
  border: solid rgb(56, 131, 250) 1px;
  overflow: auto;
}
</style>
