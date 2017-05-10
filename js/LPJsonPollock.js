// @flow
import { ElementRendererProvider } from './ElementRendererProvider';
const Events = require('Chronosjs/dist/min/Events');

export class LPJsonPollock {

    provider: ElementRendererProvider;
    events: Events;
    currentNumOfElements: number;
    maxAllowedElements: number;

    constructor() {
        this.events = new Events({ cloneEventData: true });
        this.provider = new ElementRendererProvider(this.events);
        this.currentNumOfElements = 0;
        this.maxAllowedElements = 50;
    }

    init(config: Object) {
        if(!config) {
            return;
        }
        if(!isNaN(config.maxAllowedElements)) {
            this.maxAllowedElements = config.maxAllowedElements;
        }
    }

    renderElement(elJson: Object, parent: HTMLElement): ?HTMLElement {

        if(this.currentNumOfElements >= this.maxAllowedElements) {
            return;
        }

        const elementRenderer = this.provider.get(elJson.type);
        let element: HTMLElement;
        if(elementRenderer) {
            element = elementRenderer(elJson);
            if (element) {
                parent.appendChild(element);
                if (Array.isArray(elJson.elements)) {
                    elJson.elements.forEach((elementConf) => {
                        this.renderElement(elementConf, element);
                    });
                }
            }
        }
        this.currentNumOfElements = this.currentNumOfElements + 1;
        return element;
    }

    render(json: Object): HTMLElement {
        this.currentNumOfElements = 0;

        let divEl = document.createElement('div');
        divEl.className = 'lp-json-pollock';

        this.renderElement(json, divEl);

        return divEl;
    }

    registerAction(actionName: string, callback: Function) {
        this.events.bind({
            eventName: actionName,
            func: (EventData) => {
                callback(EventData);
            }
        });
    }

    registerElement(elementType: string, render: Function) {
        this.provider.set(elementType, render);
    }
}