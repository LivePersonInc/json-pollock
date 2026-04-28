import './scss/style.scss';
import JsonPollock from './js/JsonPollock';
import SchemaValidator from './js/SchemaValidator';

const instance = new JsonPollock(new SchemaValidator());

const init = instance.init.bind(instance);
const render = instance.render.bind(instance);
const registerAction = instance.registerAction.bind(instance);
const unregisterAction = instance.unregisterAction.bind(instance);
const unregisterAllActions = instance.unregisterAllActions.bind(instance);
const validate = instance.validate.bind(instance);
const version = '@@version';
const TEMPLATE_TYPES = JsonPollock.TEMPLATE_TYPES;

export default {
  init,
  render,
  registerAction,
  unregisterAction,
  unregisterAllActions,
  validate,
  version,
  TEMPLATE_TYPES,
};
