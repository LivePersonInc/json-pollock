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
          type: 'image',
          url: 'http://cdn.bgr.com/2016/08/iphone-8-concept.jpg?quality=98&strip=all',
          tooltip: 'image tooltip',
          click: {
            actions: [
              {
                type: 'navigate',
                name: 'Navigate to store via image',
                lo: 23423423,
                la: 2423423423,
              },
            ],
          },
        },
        {
          type: 'text',
          text: 'product name (Title)',
          tooltip: 'text tooltip',
          style: {
            bold: true,
            size: 'large',
          },
        },
        {
          type: 'text',
          text: 'product name (Title)',
          tooltip: 'text tooltip',
        },
        {
          type: 'button',
          tooltip: 'button tooltip',
          title: 'Add to cart',
          click: {
            actions: [
              {
                type: 'link',
                name: 'Add to cart',
                uri: 'https://example.com',
              },
            ],
          },
        },
        {
          type: 'horizontal',
          elements: [
            {
              type: 'button',
              title: 'Buy',
              tooltip: 'Buy this broduct',
              click: {
                actions: [{
                  type: 'link',
                  name: 'Buy',
                  uri: 'https://example.com',
                }],
              },
            },
            {
              type: 'button',
              title: 'Find similar',
              tooltip: 'store is the thing',
              click: {
                actions: [{
                  type: 'link',
                  name: 'Buy',
                  uri: 'https://search.com',
                }],
              },
            },
          ],
        },
        {
          type: 'button',
          tooltip: 'button tooltip',
          title: 'Publish text',
          click: {
            metadata: [
              {
                title: 'Action Reason',
              },
            ],
            actions: [
              {
                type: 'publishText',
                text: 'my text',
              },
            ],
          },
        },
        {
          type: 'button',
          tooltip: 'button tooltip',
          title: 'Navigate',
          click: {
            actions: [
              {
                type: 'publishText',
                text: 'my text',
              },
              {
                type: 'navigate',
                name: 'Navigate to store via image',
                lo: 23423423,
                la: 2423423423,
              },
            ],
          },
        },
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
