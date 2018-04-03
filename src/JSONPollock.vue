<template>
  <div ref='jsonpollock' class='jsonpollock'>
    <div class='dom_parent'>
      <div class="json_pollock_v">v.{{version}}</div>
      <div class='dom_container' ref='dom_container'/>
    </div>
  </div>
</template>

<script>
import * as JsonPollock from 'json-pollock/dist/json-pollock.bundle.min';

export default {
  name: 'JSONPollock',
  data() {
    return {
      version: 'ddd',
    };
  },
  components: {
  },
  mounted() {
    const updateDom = (json) => {
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
