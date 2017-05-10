// @flow
// Stylesheets
import styles from './scss/style.scss';
import {LPJsonPollock} from './js/LPJsonPollock';

let instance = new LPJsonPollock();

const render = instance.render.bind(instance);
const register = instance.register.bind(instance);

export {
    render,
    register
}
