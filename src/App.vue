<template>
  <div id="app">
    <Header class="header_container" @templateSelected="onTemplateSelected"></Header>
    <split-pane class="custom-resizer" split="vertical" min-percent=30>
      <template slot="paneL">
        <JSONEditor class="jsoneditor_container" ref="editor"></JSONEditor>
      </template>
      <template slot="paneR">
         <JSONPollock class="jsonpollock_container" :class="{'actions-bar-open': actionsBarOpen}"></JSONPollock>
         <div class="actions_toggle" :class="actionsBarOpen ? 'open' : 'close'" @click="toggleActions" v-tooltip="actionsBarOpen ? 'Close' : 'Show the Actions View'">
          {{actionsBarOpen ? '&#10005;' : 'Actions'}}
        </div>
        <div class="actions_clear" v-show="actionsBarOpen" @click="clearActionsList" v-tooltip="'Clear List'">
          &#10227;
        </div>
        <ActionsViewer class="actions_container" v-show="actionsBarOpen"></ActionsViewer>
      </template>
    </split-pane>
    <Message/>
  </div>
</template>

<script>
import { get } from 'lodash';
import splitPane from 'vue-splitpane';
import Header from './Header';
import JSONEditor from './JSONEditor';
import JSONPollock from './JSONPollock';
import ActionsViewer from './ActionsViewer';
import Message from './Message';
import GitHubHelper from './GitHubHelper';
import { defaultTemplate } from './json-templates';

export default {
  name: 'app',
  components: {
    splitPane,
    Header,
    JSONEditor,
    JSONPollock,
    ActionsViewer,
    Message,
  },
  data() {
    return {
      actionsBarOpen: false,
    };
  },
  mounted() {
    const loadDefault = () => {
      this.$store.commit('setLoading', false);
      this.$refs.editor.setJson(defaultTemplate.content);
    };
    const gistExpr = location.search.replace('?', '').split('&').find(str => str.indexOf('gist=') === 0);
    const gistFileExpr = location.search.replace('?', '').split('&').find(str => str.indexOf('file=') === 0);
    const token = GitHubHelper.getToken();
    if (token) {
      this.$store.commit('setToken', token);
      GitHubHelper.getUserDetails()
      .then(userDetails => userDetails && this.$store.commit('setUser', userDetails));
    }
    if (gistExpr) {
      this.$store.commit('setLoading', true);
      const gistId = gistExpr.slice(5);
      if (!token) {
        this.$store.commit('setMessage', { text: 'Token is not configured - :( - default json loaded instead', type: 'error' });
        this.$store.commit('setGist', { name: 'Gist not loaded' });
        loadDefault();
        return;
      }

      let filename;
      if (gistFileExpr) {
        filename = gistFileExpr.slice(5);
      }

      GitHubHelper.loadGist(gistId, filename)
      .then((gist) => {
        if (gist) {
          if (gist.isGist) {
            this.$refs.editor.setJson(JSON.parse(gist.content));
            this.$store.commit('setGist', { id: gistId, name: gist.name, url: gist.url, ownerId: gist.ownerId });
            this.$store.commit('setMessage', { text: 'Gist successfully loaded! :)', type: 'success' });
          } else {
            this.$store.commit('setGist', { id: gistId });
            this.$store.commit('setMessage', { text: `Fail to load Gist :( - default json loaded instead; reason: ${gist.message}`, type: 'error' });
            loadDefault();
          }
          this.$store.commit('setLoading', false);
        } else {
          this.$store.commit('setMessage', { text: 'Gist not found :( - default json loaded instead', type: 'error' });
          loadDefault();
        }
      })
      .catch((error) => {
        this.$store.commit('setGist', { id: gistId });
        this.$store.commit('setMessage', { text: `Fail to load Gist :( - default json loaded instead; reason: ${error.message}`, type: 'error' });
        loadDefault();
      });
    } else {
      loadDefault();
    }
  },
  methods: {
    toggleActions() {
      this.actionsBarOpen = !this.actionsBarOpen;
      this.ga(['Actions', this.actionsBarOpen ? 'open' : 'close']);
    },
    clearActionsList() {
      this.$store.commit('clearActions');
    },
    onTemplateSelected(template) {
      const content = get(template, 'content');
      if (content) {
        this.$refs.editor.setJson(content);
      }
    },
  },
};
</script>

<style lang="scss">
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
  background-color: rgba(22, 32, 54, 0.8);
}

#app::after {
  content: '';
  background: url(assets/back-blue.jpg);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}

.splitter-pane-resizer {
  opacity: 1 !important;
  margin-left: -3px !important;
  border: solid #ebebeb !important;
  background: #EBEBED !important;
  width: 8px !important;
  margin-top: 36px;
  height: calc(100% - 98px) !important;
}

.header_container {
  height: 60px;
}

.editor_container {
  background-color: #FFFFFF;
}

.jsoneditor_container {
  height: calc(100% - 61px);
  @extend .editor_container;
}

.jsonpollock_container {
  height: calc(100% - 63px);
  @extend .editor_container;

  &.actions-bar-open {
    height: calc(100% - 209px);
    border-bottom: 0px;
  }

  border: solid #162036 1px;
}

.actions_container {
  border: solid #ebebee 1px;
  height: 144px;
  overflow: auto;
}

.actions_btn {
  position: absolute;
  height: 22px;
  padding: 0 7px;
  cursor: pointer;
  text-align: center;
  overflow: auto;
  border-radius: 3px;
  background: #ebebeb;
}

.actions_toggle {
  @extend .actions_btn;
  right:5px;

  &.open {
    bottom: 208px;
  }

  &.close {
    bottom: 62px;
  }
}

.actions_clear {
  @extend .actions_btn;
  right: 23px;
  bottom: 208px;
  font-size: 13px;
}
</style>
