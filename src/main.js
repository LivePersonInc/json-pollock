import Vue from 'vue';
import Vuex from 'vuex';
import App from './App';

Vue.config.productionTip = false;
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    json: undefined,
    loading: false,
    gist: {
      name: '',
      url: '',
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
