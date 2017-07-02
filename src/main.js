// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import App from './App';

Vue.config.productionTip = false;
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    json: {
      type: 'vertical',
      elements: [
        {
          type: 'text',
          text: 'product name',
          tooltip: 'product name (Title)',
        },
        {
          type: 'image',
          url: 'http://cdn.bgr.com/2016/08/iphone-8-concept.jpg?quality=98&strip=all',
          caption: 'This is an example of image caption',
          tooltip: 'image tooltip',
          rtl: true,
        },
        // {
        //   type: 'button',
        //   title: 'Open web page',
        //   click: {
        //     actions: [
        //       {
        //         type: 'publishText',
        //         text: 'consumer text 2',
        //       },
        //     ],
        //   },
        // },
      ],
    },
  },
  mutations: {
    setJson(state, json) {
      state.json = json;
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
