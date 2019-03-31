import Vue from 'vue';
import Vuex from 'vuex';
import VTooltip from 'v-tooltip';
import App from './App';

import './scss/style.scss';

Vue.use(VTooltip, { defaultOffset: 5, defaultPlacement: 'left' });

Vue.config.productionTip = false;
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    json: undefined,
    jsonValid: true,
    edited: false,
    loading: false,
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
    setEdited(state, bool) {
      state.edited = bool;
    },
    setLoading(state, val) {
      state.loading = val;
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
    edited: state => state.edited,
    actions: state => state.actions,
  },
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App },
});
