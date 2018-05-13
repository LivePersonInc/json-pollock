import Vue from 'vue';
import Vuex from 'vuex';
import App from './App';

Vue.config.productionTip = false;
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    json: undefined,
    loading: false,
    token: '',
    gist: {
      name: '',
      url: '',
    },
    message: {
      text: '',
      type: '',
    },
  },
  mutations: {
    setJson(state, json) {
      state.json = json;
    },
    setLoading(state, val) {
      state.loading = val;
    },
    setGist(state, gistObj) {
      if (gistObj) {
        state.gist.name = gistObj.name;
        state.gist.url = gistObj.url;
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
  },
  getters: {
    json: state => state.json,
  },
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App },
});
