import { Utils } from './Utils';

// @flow

export class ElementRendererProvider {

    elements: Object;

    constructor() {
        this.elements = {};

        //predefined renderes
        this.set('text', (config): HTMLElement => {
            let divEl = document.createElement('div');
            let style = 
            divEl.className = "lp-json-pollock-element-text";
            divEl.innerHTML = `<span style="${Utils.styleToCss(config.style)}" title=${config.tooltip || ""}>${config.text}</span>`;
            return divEl;
        });

        this.set('button', (config): HTMLElement => {
            let divEl = document.createElement('div');
            divEl.className = "lp-json-pollock-element-button";
            divEl.innerHTML = `<button style="${Utils.styleToCss(config.style)}" type="button" title=${config.tooltip || ""}>${config.title}</button>`;
            return divEl;
        });

        this.set('image', (config): HTMLElement => {
            let divEl = document.createElement('div');
            divEl.className = "lp-json-pollock-element-image";
            divEl.innerHTML = `<img style="${Utils.styleToCss(config.style)}" src=${config.url} title=${config.tooltip || ""}>`;
            if(config.caption) {
                divEl.innerHTML += `<div>${config.caption}</div`;
            }
            return divEl;
        });

        this.set('vertical', (config): HTMLElement => {
            let divEl = document.createElement('div');
            divEl.className = "lp-json-pollock-layout-vertical";
            return divEl;
        });
    }

    get(type: string): Function {
        return this.elements[type];
    }

    set(type: string, render: Function) {
        this.elements[type] = render;
    }

}