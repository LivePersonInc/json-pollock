// @flow
// Stylesheets
/*eslint-disable */
import styles from './scss/style.scss';
/*eslint-enable */
import LPJsonPollock from './js/LPJsonPollock';

const instance = new LPJsonPollock();

const init = instance.init.bind(instance);
const render = instance.render.bind(instance);
const validate = instance.render.bind(instance);
const registerAction = instance.registerAction.bind(instance);
const unregisterAction = instance.unregisterAction.bind(instance);
const unregisterAllActions = instance.unregisterAllActions.bind(instance);
const version = '@@VERSION';

export {
  init,
  render,
  validate,
  registerAction,
  unregisterAction,
  unregisterAllActions,
  version,
};
