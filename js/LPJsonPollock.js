// @flow
import Ajv from 'ajv';
import ElementRendererProvider from './ElementRendererProvider';
import Utils from './Utils';
import actionSchema from './schema/action.json';
import basicSchema from './schema/basic.json';
import elementSchema from './schema/element.json';
import styleSchema from './schema/style.json';

/*eslint-disable */
const Events = require('Chronosjs/dist/min/Events');
/*eslint-enable */

class JsonPollockError extends Error {

  errors: ?Array<Object>;

  constructor(message, errors) {
    super(message);
    this.errors = errors;
  }
}

export default class LPJsonPollock {

  provider: ElementRendererProvider;
  events: Events;
  currentNumOfElements: number;
  maxAllowedElements: number;
  jsonValidator: Ajv;

  constructor() {
    this.events = new Events({ cloneEventData: true });
    this.provider = new ElementRendererProvider(this.events);
    this.maxAllowedElements = 50;
    const ajv = new Ajv({ format: 'full', unknownFormats: 'ignore', verbose: true });
    ajv.addSchema(actionSchema, 'action.json');
    ajv.addSchema(basicSchema, 'basic.json');
    ajv.addSchema(styleSchema, 'style.json');
    ajv.addSchema(elementSchema, 'element.json');
    this.jsonValidator = ajv.compile(elementSchema);
  }

  init(config: Object) {
    if (!config) {
      return;
    }
    if (Object.prototype.hasOwnProperty.call(config, 'maxAllowedElements')) {
      if (!isNaN(config.maxAllowedElements) && config.maxAllowedElements > 0) {
        this.maxAllowedElements = config.maxAllowedElements;
      } else {
        this.maxAllowedElements = 50;
      }
    }
  }

  renderElement(elJson: Object, parent: HTMLElement, numOfElements: number = 0) {
    if (numOfElements >= this.maxAllowedElements) {
      return;
    }
    let currentNumOfElements = numOfElements;
    const elementRenderer = this.provider.get(elJson.type);
    let element: HTMLElement;
    if (elementRenderer) {
      element = elementRenderer(elJson);
      if (element) {
        parent.appendChild(element);
        if (Array.isArray(elJson.elements)) {
          elJson.elements.forEach((elementConf) => {
            currentNumOfElements += 1;
            this.renderElement(elementConf, element, currentNumOfElements);
          });
        }
        if (element.afterRender) {
          element.afterRender.call(element);
        }
      }
    }
  }

  render(json: Object|string): DocumentFragment {
    let jsonObj: Object;
    if (Utils.isString(json)) {
      // This will throws an error if fails
      jsonObj = JSON.parse((json: any));
    } else {
      jsonObj = (json: any);
    }
    this.jsonValidator(jsonObj);
    if (this.jsonValidator.errors) {
      throw new JsonPollockError('Schema validation error, see \'errors\' for more details', this.jsonValidator.errors);
    }
    const frag = document.createDocumentFragment();
    const divEl = document.createElement('div');
    divEl.className = 'lp-json-pollock';
    if (!Utils.isLayout(jsonObj.type)) {
      divEl.className += ' lp-json-pollock-single-element';
    }
    frag.appendChild(divEl);
    this.renderElement(jsonObj, divEl);
    return frag;
  }

  registerAction(actionName: string, callback: Function) {
    this.events.bind({
      eventName: actionName,
      func: (EventData) => {
        callback(EventData);
      },
    });
  }

  registerElement(elementType: string, render: Function) {
    this.provider.set(elementType, render);
  }
}
