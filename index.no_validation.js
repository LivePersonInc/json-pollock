// @flow
// Stylesheets
/*eslint-disable */
import styles from './scss/style.scss';
/*eslint-enable */
import JsonPollock from './js/JsonPollock';

const instance = new JsonPollock();

const init = instance.init.bind(instance);
const render = instance.render.bind(instance);
const registerAction = instance.registerAction.bind(instance);
const unregisterAction = instance.unregisterAction.bind(instance);
const unregisterAllActions = instance.unregisterAllActions.bind(instance);
const version = '@@VERSION';
const TEMPLATE_TYPES = JsonPollock.TEMPLATE_TYPES;

export {
  init,
  render,
  registerAction,
  unregisterAction,
  unregisterAllActions,
  version,
  TEMPLATE_TYPES,
};
