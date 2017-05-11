// @flow
// Stylesheets
/*eslint-disable */
import styles from './scss/style.scss';
/*eslint-enable */
import LPJsonPollock from './js/LPJsonPollock';

const instance = new LPJsonPollock();

const init = instance.init.bind(instance);
const render = instance.render.bind(instance);
const registerAction = instance.registerAction.bind(instance);
const registerElement = instance.registerElement.bind(instance);

export {
  init,
  render,
  registerAction,
  registerElement,
};
