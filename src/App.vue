<template>
  <div id="app">
    <Header class="header_container"></Header>
    <JSONEditor class="jsoneditor_container"></JSONEditor>
    <JSONPollock class="jsonpollock_container"></JSONPollock>
  </div>
</template>

<script>
import Header from './Header';
import JSONEditor from './JSONEditor';
import JSONPollock from './JSONPollock';

export default {
  name: 'app',
  components: {
    Header,
    JSONEditor,
    JSONPollock,
  },
};
</script>

<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;  
  height: 100%;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  padding: 10px;
  background: url(assets/pollock-paint.jpg);
}

.header_container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  margin-top: 12px;
  height: 60px;
  background-color: #EBEBEB;
}

.editor_container {
  width: 48%;
  top: 90px;  
  height:calc(100% - 120px);
  position: absolute;
  background-color: #FFFFFF;
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
