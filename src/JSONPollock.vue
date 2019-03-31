<template>
  <div ref='jsonpollock' class='jsonpollock'>
    <div class='dom_parent' ref="domParent">
      <div class="json_pollock_v">v.{{version}}</div>
      <div class='dom_container' ref='dom_container' v-bind:style="styleObject"/>
    </div>
  </div>
</template>

<script>
import * as JsonPollock from 'json-pollock/dist/json-pollock.bundle.min';
import { get } from 'lodash';

export default {
  name: 'JSONPollock',
  data() {
    return {
      version: '',
      styleObject: {},
    };
  },
  components: {
  },
  mounted() {
    JsonPollock.registerAction('link', this.onAction.bind(this));
    JsonPollock.registerAction('navigate', this.onAction.bind(this));
    JsonPollock.registerAction('publishText', this.onAction.bind(this));

    const updateDom = (json) => {
      this.styleObject['max-width'] = `${get(this.$refs.domParent, 'offsetWidth', 550) - 50}px`;
      this.version = JsonPollock.version;
      let dom = null;
      try {
        dom = JsonPollock.render(json);
        this.$refs.dom_container.innerText = '';
        this.$refs.dom_container.appendChild(dom);
      } catch (e) {
        // do nothing
      }
    };
    this.$store.watch(
      state => state.json,
      (val) => {
        updateDom(val);
      },
    );
    updateDom(this.$store.state.json);
  },
  methods: {
    onAction(data) {
      this.$store.commit('addAction', data);
    },
  },
};


</script>

<style lang="scss" scoped>

  .dom_parent {
    position: relative;

    .json_pollock_v {
      margin-top: 10px;
      text-align: center;
    }

    .dom_container{
      position: absolute;
      top: 50%;
      left: 50%;
      min-width: 200px;
      transform: translate(-50%, 45px);
      padding-bottom: 20px;
    }
  }
</style>
