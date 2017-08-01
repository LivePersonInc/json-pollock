// @flow
// Stylesheets
/*eslint-disable */
import styles from './scss/style.scss';
/*eslint-enable */
import LPJsonPollock from './js/LPJsonPollock';
import pkg from './package.json';

const instance = new LPJsonPollock();

const init = instance.init.bind(instance);
const render = instance.render.bind(instance);
const registerAction = instance.registerAction.bind(instance);
const version = pkg.version;

export {
  init,
  render,
  registerAction,
  version,
};
