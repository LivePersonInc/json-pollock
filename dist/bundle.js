/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ElementRendererProvider__ = __webpack_require__(3);


class LPJsonPollock {

    constructor() {
        this.provider = new __WEBPACK_IMPORTED_MODULE_0__ElementRendererProvider__["a" /* ElementRendererProvider */]();
    }

    renderElement(elJson, parent) {
        const elementRenderer = this.provider.get(elJson.type);
        let element;
        if (elementRenderer) {
            element = elementRenderer(elJson);
            if (element) {
                parent.appendChild(element);
                if (Array.isArray(elJson.elements)) {
                    elJson.elements.forEach(elementConf => {
                        this.renderElement(elementConf, element);
                    });
                }
            }
        }
        return element;
    }

    render(json) {
        let divEl = document.createElement('div');
        divEl.className = 'lp-json-pollock';

        this.renderElement(json, divEl);

        return divEl;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LPJsonPollock;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_LPJsonPollock__ = __webpack_require__(0);

// Stylesheets
__webpack_require__(1);

window.lpPollock = new __WEBPACK_IMPORTED_MODULE_0__js_LPJsonPollock__["a" /* LPJsonPollock */]();

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Utils__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Utils___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Utils__);


class ElementRendererProvider {

    constructor() {
        this.elements = {};

        //predefined renderes
        this.set('text', config => {
            let divEl = document.createElement('div');
            let style = divEl.className = "lp-json-pollock-element-text";
            divEl.innerHTML = `<span style="${__WEBPACK_IMPORTED_MODULE_0__Utils__["Utils"].styleToCss(config.style)}" title=${config.tooltip || ""}>${config.text}</span>`;
            return divEl;
        });

        this.set('button', config => {
            let divEl = document.createElement('div');
            divEl.className = "lp-json-pollock-element-button";
            divEl.innerHTML = `<button style="${__WEBPACK_IMPORTED_MODULE_0__Utils__["Utils"].styleToCss(config.style)}" type="button" title=${config.tooltip || ""}>${config.title}</button>`;
            return divEl;
        });

        this.set('image', config => {
            let divEl = document.createElement('div');
            divEl.className = "lp-json-pollock-element-image";
            divEl.innerHTML = `<img style="${__WEBPACK_IMPORTED_MODULE_0__Utils__["Utils"].styleToCss(config.style)}" src=${config.url} title=${config.tooltip || ""}>`;
            if (config.caption) {
                divEl.innerHTML += `<div>${config.caption}</div`;
            }
            return divEl;
        });

        this.set('vertical', config => {
            let divEl = document.createElement('div');
            divEl.className = "lp-json-pollock-layout-vertical";
            return divEl;
        });
    }

    get(type) {
        return this.elements[type];
    }

    set(type, render) {
        this.elements[type] = render;
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = ElementRendererProvider;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports.Utils = {

    styleToCss(style) {
        let cssStr = "";

        if (style) {

            if (style.color) {
                cssStr += `color:${style.color};`;
            }

            if (style['background-color']) {
                cssStr += `background-color:${style['background-color']};`;
            }

            if (style.bold) {
                cssStr += 'font-weight:bold;';
            }

            if (style.italic) {
                cssStr += 'font-style:italic;';
            }

            if (style.size) {
                cssStr += `font-size:${this.sizeToPx(style.size)}px;`;
            }
        }

        return cssStr;
    },

    sizeToPx(size) {
        switch (size) {
            case 'small':
                return 11;
            case 'medium':
                return 13;
            case 'large':
                return 17;
            default:
                return 13;
        }
    }

};

/***/ })
/******/ ]);