(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("JsonPollock", [], factory);
	else if(typeof exports === 'object')
		exports["JsonPollock"] = factory();
	else
		root["JsonPollock"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_LOCAL_MODULE_0__;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!function(a,b){"use strict";if(true)!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_LOCAL_MODULE_0__ = (function(){return b(a,a,!0)}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)));else if("object"==typeof exports)b(a,exports);else{a.Chronos=a.Chronos||{};b(a,a.Chronos)}}("undefined"==typeof ChronosRoot?this:ChronosRoot,function(a,b,c){"use strict";function d(a,b,c){var d=[];if(a[b]&&a[b].length)for(var e=0;e<a[b].length;e++)c&&"*"!==a[b][e].appName&&a[b][e].appName!==c||d.push(a[b][e]);if(a["*"])for(var f=0;f<a["*"].length;f++)c&&"*"!==a["*"][f].appName&&a["*"][f].appName!==c||d.push(a["*"][f]);return d}function e(b,c,d){a&&"function"==typeof a.log&&a.log(b,c,d)}function f(a){var b,c=a.unbindObj[a.attrName],d=!1;if(!a.unbindObj){e("CMD listen id not spec for unbind","ERROR",a.loggerName);return null}if("string"==typeof a.unbindObj)return j(a.lstnrs,a.unbindObj);if(!a.unbindObj.func&&!a.unbindObj.context&&!a.unbindObj.appName)return!1;var f=a.lstnrs;if(c){f={};f[c]=a.lstnrs[c]}for(var g in f)if(f.hasOwnProperty(g)&&f[g]&&f[g].length){b=k(f[g],a.unbindObj.func,a.unbindObj.context,a.unbindObj.appName);if(b.length!==f[g].length){a.lstnrs[g]=b;d=!0}}return d}function g(a){var b={};if(a.constructor===Object)for(var c in a)a.hasOwnProperty(c)&&null!==a[c]&&void 0!==a[c]&&("object"==typeof a[c]&&a[c].constructor!==Array?b[c]=g(a[c]):a[c].constructor===Array?b[c]=a[c].slice(0)||[]:"function"!=typeof a[c]&&(b[c]=null!==a[c]&&void 0!==a[c]?a[c]:""));else a.constructor===Array?b=a.slice(0)||[]:"function"!=typeof a&&(b=a);return b}function h(a,b,c){if((void 0===c||"*"===c)&&"*"===b)return a;for(var d=[],e=0;e<a.length;e++)a[e].eventName!==c&&"*"!==c||(b&&b===a[e].appName||!a[e].appName||"*"===a[e].appName||"*"===b)&&d.push(a[e]);return d}function i(a){if(0===a.eventBufferLimit||a.triggerData.data&&a.triggerData.data.doNotStore)a=null;else{var b={eventName:a.triggerData[a.attrName],appName:a.triggerData.appName};b.data=a.triggerData.passDataByRef?a.triggerData.data:g(a.triggerData.data);if(a.eventBufferLimit>0){a.index>=a.eventBufferLimit&&(a.index=0);a.fired[a.index]=b;a.index++}else a.fired.push(b);a=null}}function j(a,b){var c=!1;if(!b){e("Ev listen id not spec for unregister","ERROR","Events");return null}for(var d in a)if(a.hasOwnProperty(d))for(var f=0;f<a[d].length;f++)if(a[d][f].id==b){a[d].splice(f,1);e("Ev listen="+b+" and name="+d+" unregister","DEBUG","Events");c=!0;break}c||e("Ev listen not found "+b+" unregister","DEBUG","Events");return c}function k(a,b,c,d){var f=[];if(a&&a.length)for(var g=0;g<a.length;g++)try{var h=!c&&a[g].func===b,i=!b&&c&&a[g].context===c,j=b&&c&&a[g].func===b&&a[g].context===c,k=d&&d===a[g].appName,l="*"===a[g].appName;if(h||i||j){if(k||l)continue;if(i)continue}else if(!b&&!c&&k)continue;f.push(a[g])}catch(a){e("Error in unbind e="+a.message,"ERROR","Events")}return f}var l={getListeners:d,log:e,unbind:f,hasFired:h,cloneEventData:g,storeEventData:i};c||(b.EventsUtil=b.EventsUtil||l);return l});!function(a,b){"use strict";if(true)!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__WEBPACK_LOCAL_MODULE_0__], __WEBPACK_AMD_DEFINE_RESULT__ = function(c){return b(a,a,c,!0)}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else if("object"==typeof exports)b(a,exports,require("util/EventsUtil").EventsUtil);else{a.Chronos=a.Chronos||{};b(a,a.Chronos,a.Chronos.EventsUtil)}}("undefined"==typeof ChronosRoot?this:ChronosRoot,function(a,b,c,d){"use strict";function e(a){function b(a){if(a){a.triggerOnce=!0;return d(a)}return null}function d(a,b,e){var f=a;"string"==typeof a&&(f={appName:a,eventName:b,func:e});f.appName=f.appName||l;"*"!==l&&("string"!=typeof a||"function"!=typeof b&&void 0!==b||(f.eventName=a));if(!f.eventName||!f.func||"function"!=typeof f.func&&f.func.constructor!==Array){c.log("Ev listen has invalid params: evName=["+f.eventName+"]","ERROR","Events");return null}if(f.func.constructor===Array){for(var g,h,i=[],j=0;j<f.func.length;j++){g=c.cloneEventData(f);g.func=f.func[j];h=d(g);i.push(h)}return i}var k=r+o++,m={id:k,func:f.func,context:f.context||null,aSync:!!f.aSync,appName:f.appName,triggerOnce:f.triggerOnce||!1};p[f.eventName]=p[f.eventName]||[];p[f.eventName].push(m);c.log("Ev listen rgstr: evName=["+f.eventName+"] aSync="+m.aSync+" appName="+m.name,"DEBUG","Events");f=null;a=null;return k}function e(a){"*"!==l&&(a.appName=a.appName||l);return c.unbind({unbindObj:a,attrName:n,loggerName:m,lstnrs:p})}function f(a,b){if(void 0===b){b=a;a=l}return c.hasFired(q,a,b)}function g(a,b,d){var e=a;"string"==typeof a&&(e={eventName:b,appName:a,data:d});if("*"!==l){e.appName=e.appName||l;"string"!=typeof a||"object"!=typeof b&&void 0!==b||(e.eventName=a)}if(!e||void 0===e.eventName){c.log("Ev name not spec for publish","ERROR","Events");e=null;return null}e.passDataByRef=e.passDataByRef||!j;i(e);var f=c.getListeners(p,e.eventName,e.appName);if(f.length>0)for(var g=0;g<f.length;g++){var k=e.passDataByRef?e.data:c.cloneEventData(e.data),m={appName:e.appName,eventName:e.eventName},n=f[g];n.aSync||k&&k.aSync?setTimeout(h(n,k,m),0):h(n,k,m)()}e=null;return f.length>0}function h(a,b,d){return function(){try{a.func.call(a.context,b,d);b=null;a.triggerOnce&&e(a);a=null}catch(b){c.log("Error executing "+d.eventName+" eventId: "+a.id+"e="+b.message,"ERROR","Events")}}}function i(a){c.storeEventData({triggerData:a,eventBufferLimit:k,attrName:n,fired:q,index:s})}var j,k,l,m="Events",n="eventName",o=0,p={},q=[],r="evId_",s=0;l=a&&a.appName||"*";j=!(!a||"boolean"!=typeof a.cloneEventData)&&a.cloneEventData;k=a&&!isNaN(a.eventBufferLimit)?a.eventBufferLimit:-1;this.once=b;this.hasFired=f;this.trigger=g;this.publish=g;this.bind=d;this.register=d;this.unbind=e;this.unregister=e}d||(b.Events=b.Events||e);return e});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
// import jsonschema from 'jsonschema';


var _ElementRendererProvider = __webpack_require__(4);

var _ElementRendererProvider2 = _interopRequireDefault(_ElementRendererProvider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*eslint-disable */
var Events = __webpack_require__(0);
/*eslint-enable */

var LPJsonPollock = function () {
  function LPJsonPollock() {
    _classCallCheck(this, LPJsonPollock);

    this.events = new Events({ cloneEventData: true });
    this.provider = new _ElementRendererProvider2.default(this.events);
    this.maxAllowedElements = 50;
  }

  _createClass(LPJsonPollock, [{
    key: 'init',
    value: function init(config) {
      if (!config) {
        return;
      }
      if (!isNaN(config.maxAllowedElements)) {
        this.maxAllowedElements = config.maxAllowedElements;
      }
    }
  }, {
    key: 'renderElement',
    value: function renderElement(elJson, parent) {
      var _this = this;

      var numOfElements = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      if (numOfElements >= this.maxAllowedElements) {
        return;
      }
      var currentNumOfElements = numOfElements;
      var elementRenderer = this.provider.get(elJson.type);
      var element = void 0;
      if (elementRenderer) {
        element = elementRenderer(elJson);
        if (element) {
          parent.appendChild(element);
          if (Array.isArray(elJson.elements)) {
            elJson.elements.forEach(function (elementConf) {
              currentNumOfElements += 1;
              _this.renderElement(elementConf, element, currentNumOfElements);
            });
          }
        }
      }
    }
  }, {
    key: 'render',
    value: function render(json) {
      // TODO: once jsonschems is available replace validation with jsonschema.Validator();
      var frag = document.createDocumentFragment();
      var divEl = document.createElement('div');
      divEl.className = 'lp-json-pollock';
      frag.appendChild(divEl);
      this.renderElement(json, divEl);
      return frag;
    }
  }, {
    key: 'registerAction',
    value: function registerAction(actionName, callback) {
      this.events.bind({
        eventName: actionName,
        func: function func(EventData) {
          callback(EventData);
        }
      });
    }
  }, {
    key: 'registerElement',
    value: function registerElement(elementType, render) {
      this.provider.set(elementType, render);
    }
  }]);

  return LPJsonPollock;
}();

exports.default = LPJsonPollock;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerElement = exports.registerAction = exports.render = exports.init = undefined;

var _style = __webpack_require__(2);

var _style2 = _interopRequireDefault(_style);

var _LPJsonPollock = __webpack_require__(1);

var _LPJsonPollock2 = _interopRequireDefault(_LPJsonPollock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Stylesheets
/*eslint-disable */
var instance = new _LPJsonPollock2.default();
/*eslint-enable */


var init = instance.init.bind(instance);
var render = instance.render.bind(instance);
var registerAction = instance.registerAction.bind(instance);
var registerElement = instance.registerElement.bind(instance);

exports.init = init;
exports.render = render;
exports.registerAction = registerAction;
exports.registerElement = registerElement;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Utils = __webpack_require__(5);

var _Utils2 = _interopRequireDefault(_Utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*eslint-disable */
var Events = __webpack_require__(0);
/*eslint-enable */

var ElementRendererProvider = function () {
  function ElementRendererProvider(events) {
    var _this = this;

    _classCallCheck(this, ElementRendererProvider);

    this.elements = {};
    this.events = events;

    /*
    predefined renderes
    */
    this.set('text', function (config) {
      _Utils2.default.validateParameters(config, 'text');

      var divEl = document.createElement('div');
      divEl.className = 'lp-json-pollock-element-text';
      divEl.innerHTML = '<span style="' + _Utils2.default.styleToCss(config.style) + '" title="' + (config.tooltip || '') + '">' + config.text + '</span>';
      return divEl;
    });

    this.set('button', function (config) {
      _Utils2.default.validateParameters(config, 'title', 'action');

      var divEl = document.createElement('div');
      divEl.className = 'lp-json-pollock-element-button';

      var btnEl = document.createElement('button');
      btnEl.textContent = config.title;

      if (config.tooltip) {
        btnEl.title = config.tooltip;
      }
      if (config.style) {
        btnEl.style.cssText = _Utils2.default.styleToCss(config.style);
      }

      if (config.action) {
        btnEl.onclick = _this.wrapAction(config.action);
      }

      divEl.appendChild(btnEl);

      return divEl;
    });

    this.set('image', function (config) {
      _Utils2.default.validateParameters(config, 'url');

      var divEl = document.createElement('div');
      divEl.className = 'lp-json-pollock-element-image loading';

      var imgEl = document.createElement('img');

      imgEl.src = config.url;
      if (config.tooltip) {
        imgEl.title = config.tooltip;
      }
      if (config.style) {
        imgEl.style.cssText = _Utils2.default.styleToCss(config.style);
      }

      if (config.caption) {
        divEl.innerHTML += '<div>' + config.caption + '</div';
      }

      imgEl.onload = function () {
        divEl.className = 'lp-json-pollock-element-image';
      };

      if (config.action) {
        imgEl.onclick = _this.wrapAction(config.action);
      }

      divEl.appendChild(imgEl);

      return divEl;
    });

    this.set('linkPreview', function (config) {
      _Utils2.default.validateParameters(config, 'url');

      var divEl = document.createElement('div');
      divEl.className = 'lp-json-pollock-element-link';
      divEl.innerHTML = '<a href="' + config.url + '" style="' + _Utils2.default.styleToCss(config.style) + '" title="' + (config.tooltip || '') + '" target="_blank">' + (config.title || config.url) + '</a>';
      return divEl;
    });

    this.set('vertical', function (config) {
      _Utils2.default.validateParameters(config, 'elements');

      var divEl = document.createElement('div');
      divEl.className = 'lp-json-pollock-layout-vertical';
      return divEl;
    });
  }

  _createClass(ElementRendererProvider, [{
    key: 'get',
    value: function get(type) {
      return this.elements[type];
    }
  }, {
    key: 'set',
    value: function set(type, render) {
      this.elements[type] = render;
    }
  }, {
    key: 'wrapAction',
    value: function wrapAction(actionData) {
      var _this2 = this;

      return function () {
        _this2.events.trigger({
          eventName: actionData.type,
          data: actionData
        });
      };
    }
  }]);

  return ElementRendererProvider;
}();

exports.default = ElementRendererProvider;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  styleToCss: function styleToCss(style) {
    var cssStr = '';

    if (style) {
      if (style.color) {
        cssStr += 'color:' + style.color + ';';
      }

      if (style['background-color']) {
        cssStr += 'background-color:' + style['background-color'] + ';';
      }

      if (style.bold) {
        cssStr += 'font-weight:bold;';
      }

      if (style.italic) {
        cssStr += 'font-style:italic;';
      }

      if (style.size) {
        cssStr += 'font-size:' + this.sizeToPx(style.size) + 'px;';
      }
    }

    return cssStr;
  },
  sizeToPx: function sizeToPx(size) {
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
  },
  validateParameters: function validateParameters(config) {
    if (!config.type) {
      throw new Error('Missing configuration: type');
    }

    for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      params[_key - 1] = arguments[_key];
    }

    params.forEach(function (param) {
      if (config[param] === undefined) {
        throw new Error('Missing configuration: ' + param + ' is a mandatory for element of type ' + config.type);
      }
    });
  }
};

/***/ })
/******/ ]);
});