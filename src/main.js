import Vue from 'vue';
import Vuex from 'vuex';
import VTooltip from 'v-tooltip';
import ToggleButton from 'vue-js-toggle-button';
import App from './App';
import store from './store';

import './scss/style.scss';

Vue.use(VTooltip, { defaultOffset: 5, defaultPlacement: 'left' });
Vue.use(ToggleButton);

Vue.config.productionTip = false;
Vue.use(Vuex);

Vue.prototype.ga = (args) => {
  // google analytics interactions handler
  window.ga.apply(this, ['send', 'event', ...args]);
};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App },
});
