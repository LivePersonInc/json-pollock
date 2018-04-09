// @flow
import Ajv from 'ajv';
import ElementRendererProvider from './ElementRendererProvider';
import Utils from './Utils';
import actionSchema from './schema/action.json';
import basicSchema from './schema/basic.json';
import styleSchema from './schema/style.json';
import buttonSchema from './schema/button.json';
import cardSchema from './schema/card.json';
import carouselSchema from './schema/carousel.json';
import imagelSchema from './schema/image.json';
import linkPreviewSchema from './schema/linkPreview.json';
import mapSchema from './schema/map.json';
import richContentSchema from './schema/rich_content.json';
import templateSchema from './schema/template.json';
import textSchema from './schema/text.json';

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
    this.events = new Events({ cloneEventData: true, appName: 'json-pollock' });
    this.provider = new ElementRendererProvider(this.events);
    this.maxAllowedElements = 50;
    const ajv = new Ajv({ format: 'full', unknownFormats: 'ignore', verbose: true, logger: false });
    ajv.addSchema(actionSchema, 'action.json');
    ajv.addSchema(basicSchema, 'basic.json');
    ajv.addSchema(styleSchema, 'style.json');
    ajv.addSchema(buttonSchema, 'button.json');
    ajv.addSchema(cardSchema, 'card.json');
    ajv.addSchema(carouselSchema, 'carousel.json');
    ajv.addSchema(imagelSchema, 'image.json');
    ajv.addSchema(linkPreviewSchema, 'linkPreview.json');
    ajv.addSchema(mapSchema, 'map.json');
    ajv.addSchema(richContentSchema, 'rich_content.json');
    ajv.addSchema(templateSchema, 'template.json');
    ajv.addSchema(textSchema, 'text.json');
    this.jsonValidator = ajv.compile(richContentSchema);
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
          element.afterRender.call(element, parent);
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

  unregisterAction(actionName: string) {
    this.events.unbind({
      eventName: actionName,
    });
  }

  unregisterAllActions() {
    this.events.unbind({});
  }

  registerElement(elementType: string, render: Function) {
    this.provider.set(elementType, render);
  }
}
