// @flow
import { ElementRendererProvider } from './ElementRendererProvider';

export class LPJsonPollock {

    provider: ElementRendererProvider;
    callbacks: Object;

    constructor() {
        this.callbacks = {};
        this.provider = new ElementRendererProvider(this.callbacks);
    }

    renderElement(elJson: Object, parent: HTMLElement): ?HTMLElement {
        const elementRenderer = this.provider.get(elJson.type);
        let element: HTMLElement;
        if (elementRenderer) {
             element = elementRenderer(elJson);
             if(element) {
                 parent.appendChild(element);
                 if(Array.isArray(elJson.elements)) {
                     elJson.elements.forEach((elementConf)=>{
                         this.renderElement(elementConf, element);
                     });
                 }
             }
        }
        return element;
    }

    render(json: Object): HTMLElement {
        let divEl = document.createElement('div');
        divEl.className = 'lp-json-pollock';

        this.renderElement(json, divEl);

        return divEl;
    }
}