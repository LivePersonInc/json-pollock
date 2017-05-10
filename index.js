// @flow
// Stylesheets
import styles from './scss/style.scss';
import {LPJsonPollock} from './js/LPJsonPollock';

let instance = new LPJsonPollock();

const render = instance.render.bind(instance);
const registerAction = instance.registerAction.bind(instance);
const registerElement = instance.registerElement.bind(instance);

export {
    render,
    registerAction,
    registerElement,
}
