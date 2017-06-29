<template>
  <div id="app">
    <h1>Json Pollock Playground</h1>
    <JSONEditor class="jsoneditor_container"></JSONEditor>
  </div>
</template>

<script>
// import _ from 'lodash';
import JSONEditor from './JSONEditor';

export default {
  name: 'app',
  components: {
    JSONEditor,
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

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.jsoneditor_container {
  width: 48%;
  height:100%
}
</style>
