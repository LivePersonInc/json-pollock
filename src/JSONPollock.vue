<template>
  <div ref='jsonpollock' class='jsonpollock'>
    <div class="go_to_code_btn" v-tooltip="{ content: 'Click an element<br>to select its text<br>on the Code Editor', delay: { show: 500 }, placement: 'bottom' }">
      <toggle-button color="#3883fa"
        :width=115
        :labels="{ checked: 'Go To Code: ON', unchecked: 'Go To Code: OFF' }"
        v-model="goToCodeEnabled"
        @change="ga(['GoToElement','toogle',goToCodeEnabled])"/>
    </div>
    <div class='dom_parent' ref="domParent">
      <div class="json_pollock_v">v.{{version}}</div>
      <div class='dom_container' :class="{locate_element: goToCodeEnabled}" ref='dom_container' v-bind:style="styleObject"/>
    </div>
  </div>
</template>

<script>
import * as JsonPollock from 'json-pollock/dist/json-pollock.bundle.min';
import { mapGetters } from 'vuex';
import { get } from 'lodash';

export default {
  name: 'JSONPollock',
  data() {
    return {
      version: '',
      styleObject: {},
      goToCodeEnabled: false,
    };
  },
  components: {
  },
  mounted() {
    let journy;

    const updateDom = (json) => {
      this.styleObject['max-width'] = `${get(this.$refs.domParent, 'offsetWidth', 550) - 50}px`;
      this.version = JsonPollock.version;
      let dom = null;
      journy = {
        path: [],
        currentDepth: 0,
        itemsCount: [],
      };
      try {
        dom = JsonPollock.render(json);
        this.$refs.dom_container.innerText = '';
        this.$refs.dom_container.appendChild(dom);
      } catch (e) {
        // do nothing
      }
    };

    const afterElementRendered = (element, template) => {
      const relocatePath = () => {
        journy.itemsCount[journy.currentDepth].current += 1;
        if (journy.currentDepth > 0 &&
            journy.itemsCount[journy.currentDepth] &&
            journy.itemsCount[journy.currentDepth].current ===
            journy.itemsCount[journy.currentDepth].total) {
          journy.path.splice(journy.path.length - 2);
          journy.currentDepth -= 1;
          relocatePath();
        }
      };

      if (journy.path.length) {
        relocatePath();
        journy.path.splice(journy.path.length - 1, 1,
          `/${journy.itemsCount[journy.currentDepth].current}`);
      }

      const origClickHandler = element.onclick;
      element.onclick = ((origHendler, path, elType, event) => {
        if (this.goToCodeEnabled) {
          event.stopPropagation();
          this.ga(['GoToElement', 'select', elType]);
          if (this.jsonSelectionPath === path) {
            this.$store.commit('setJsonSelectionPath', '-----');
          }
          this.$store.commit('setJsonSelectionPath', path);
        } else if (origHendler) {
          origHendler();
        }
      }).bind(this, origClickHandler, journy.path.join(''), template.type);

      if (template.elements) {
        element.classList.add('playground_ly');
        journy.path.push('/elements', '');
        journy.currentDepth += 1;
        journy.itemsCount[journy.currentDepth] = {
          current: -1,
          total: template.elements.length,
        };
      } else {
        element.classList.add('playground_el');
      }

      return element;
    };

    JsonPollock.init({
      onAfterElementRendered: afterElementRendered,
    });

    JsonPollock.registerAction('link', this.onAction.bind(this));
    JsonPollock.registerAction('navigate', this.onAction.bind(this));
    JsonPollock.registerAction('publishText', this.onAction.bind(this));

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
  computed: {
    ...mapGetters([
      'jsonSelectionPath',
    ]),
  },
};


</script>

<style lang="scss">

  .go_to_code_btn {
    position: absolute;
    top: 4px;
    right: 4px;
  }

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

      &.locate_element {
        .lp-json-pollock {
          border: solid;
          border-color: #3883fa;

          .playground_el {
            position: relative;
            &:hover:after {
              content: ' ';
              border: solid;
              border-color: #200ce8;
              border-width: 2px;
              position: absolute;
              top: -2px;
              left: 0px;
              width: 98%;
              height: 98%;
              cursor: pointer;
              background-color: #3883fa;
              opacity: 0.2;
            }
          }
        }
      }
    }
  }
</style>
