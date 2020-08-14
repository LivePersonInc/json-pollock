import Vue from 'vue';
import Vuex from 'vuex';
import VTooltip from 'v-tooltip';
import ToggleButton from 'vue-js-toggle-button';
import App from './App';

import './scss/style.scss';

Vue.use(VTooltip, { defaultOffset: 5, defaultPlacement: 'left' });
Vue.use(ToggleButton);

Vue.config.productionTip = false;
Vue.use(Vuex);

Vue.prototype.ga = (args) => {
  // google analytics interactions handler
  window.ga.apply(this, ['send', 'event', ...args]);
};

const store = new Vuex.Store({
  state: {
    json: undefined,
    jsonValid: true,
    schemaValid: true,
    edited: false,
    loading: false,
    jsonSelectionPath: '',
    token: '',
    user: '',
    gist: {
      id: '',
      name: '',
      url: '',
      ownerId: '',
    },
    message: {
      text: '',
      type: '',
    },
    actions: [],
  },
  mutations: {
    setJson(state, json) {
      state.json = json;
    },
    setJsonValid(state, bool) {
      state.jsonValid = bool;
    },
    setSchemaValid(state, bool) {
      state.schemaValid = bool;
    },
    setEdited(state, bool) {
      state.edited = bool;
    },
    setLoading(state, val) {
      state.loading = val;
    },
    setJsonSelectionPath(state, val) {
      state.jsonSelectionPath = val;
    },
    setGist(state, gistObj) {
      if (gistObj) {
        state.gist.name = gistObj.name;
        state.gist.url = gistObj.url;
        state.gist.id = gistObj.id;
        state.gist.ownerId = gistObj.ownerId;
      }
    },
    setMessage(state, msg) {
      if (msg) {
        state.message = msg;
      }
    },
    setToken(state, token) {
      if (token) {
        state.token = token;
      }
    },
    setUser(state, user) {
      if (user) {
        state.user = user;
      }
    },
    addAction(state, action) {
      if (action) {
        state.actions.push(action);
      }
    },
    clearActions(state) {
      state.actions = [];
    },
  },
  getters: {
    json: state => state.json,
    loading: state => state.loading,
    gist: state => state.gist,
    token: state => state.token,
    message: state => state.message,
    user: state => state.user,
    jsonValid: state => state.jsonValid,
    schemaValid: state => state.schemaValid,
    edited: state => state.edited,
    actions: state => state.actions,
    jsonSelectionPath: state => state.jsonSelectionPath,
  },
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App },
});
