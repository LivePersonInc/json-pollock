// @flow
// Stylesheets
/*eslint-disable */
import styles from './scss/style.scss';
/*eslint-enable */
import JsonPollock from './js/JsonPollock';
import SchemaValidator from './js/SchemaValidator';

const instance = new JsonPollock(new SchemaValidator());

const init = instance.init.bind(instance);
const render = instance.render.bind(instance);
const registerAction = instance.registerAction.bind(instance);
const unregisterAction = instance.unregisterAction.bind(instance);
const unregisterAllActions = instance.unregisterAllActions.bind(instance);
const version = '@@VERSION';

export {
  init,
  render,
  registerAction,
  unregisterAction,
  unregisterAllActions,
  version,
};
