<img src="https://livepersoninc.github.io/json-pollock/src/assets/logo.png" width="120px"/>

Json-Pollock
============
[![Build Status](https://travis-ci.org/LivePersonInc/json-pollock.svg?branch=master)](https://travis-ci.org/LivePersonInc/json-pollock)
[![GitHub license](https://img.shields.io/github/license/LivePersonInc/json-pollock.svg)](https://github.com/LivePersonInc/json-pollock/blob/master/LICENSE)
[![Downloads](https://img.shields.io/npm/dt/json-pollock.svg)](https://www.npmjs.com/package/json-pollock)
[![Version](https://img.shields.io/github/package-json/v/LivePersonInc/json-pollock.svg)](https://github.com/LivePersonInc/json-pollock/blob/master/package.json)

The **Json-Pollock** package renders live DOM elements out of JSON according to the [Structured Messaging Templates specification](https://developers.liveperson.com/structured-content-templates.html)

Installation
-------
```
npm i json-pollock --save
```
In the `dist` folder you'll find a list of file that allows you to consume json-pollock in a different ways:


**As a Bundle**

`json-pollock.bundle.min.js`  - this script bundle both package and styles, once you import it into your code it will inject the needed styles into your page header - no additional actions are needed from your side. it is also supports umd - meaning you can consume it using AMD, CommonJS and as simple script (see [examples](#examples))

**Separate files for code and style**

`json-pollock.min.js` - use this script if you want to handle the import of the styles by youself, if you use it you should also take care to link `json-pollock.min.css` to your web page. also supports umd.

**No UMD**

`json-pollock.global.min.js` - this script is the same as `json-pollock.min.js`, however is does not support umd - it only puts JsonPollock on the current `this` (usually the `window` object). use this in case you inject the package into sites that are not managed by you and you dont know if it uses AMD or not.

**No validation**

`json-pollock.global.no_validation.min.js` - a version of `json-pollock.global.min.js` which the validation phase is excluded. this bundle is lighter as it does not bundles the validation package ([Ajv](https://github.com/epoberezkin/ajv)), however it should be used with more care in regard to the json input.

#### **examples**

A `script` tag:

```html
<!-- for bundle this import if enough -->
<script src="path-to-node-modules/dist/json-pollock.bundle.min.js"></script>

<!-- for others you should also link the styles -->
<script src="path-to-node-modules/dist/json-pollock.[global.]min.js"></script>
<link rel="stylesheet" href="path-to-node-modules/dist/json-pollock.min.css">
``` 

Following examples are relevant only for `json-pollock.bundle.min.js` and `json-pollock.min.js`:

Using [RequireJS](http://requirejs.org/):

Map the JsonPollock path in the RequireJs config, and then:	
```js
require(["JsonPollock"],(jsonPollock) => {
    ...
})
```
Using [CommonJS](http://requirejs.org/docs/commonjs.html):
```js
const JsonPollock = require("JsonPollock");
```

Usage
-------

**init**

You can call the *init* function if you want to configure JsonPollock - it is not mandatory, if you won't call it JsonPollock will be initialized with defaults.
```js
JsonPollock.init({
	maxAllowedElements: 100,
	onAfterElementRendered: onAfterElementRenderedHandler
});
```

Supported options:

|name | type | description | default |
|---|---|---|---|
| `maxAllowedElements` | Number |  max DOM elements that will be renderes, other elements will be ignored. | 50 |
| `onAfterElementRendered` | Function | A callback function that will be invoked after each render on an element, it allows to customize the result DOM element. see the following for exact signature and usage example of the callback function. |  |

Example callback function for `onAfterElementRendered`:
```js
/**
* @param {HTMLElement} element html element that was rendered by json-pollock
* @param {Object} template SC template of this element  
* @returns {HTMLElement} manipulated html element
*/
const onAfterElementRendered = (element, template) => {
	// maniplate elements:
	switch (template.type) {
		case JsonPollock.TEMPLATE_TYPES.TEXT:
			// add custom css class
			element.classList.add('my-ns-text');
			break;
		case JsonPollock.TEMPLATE_TYPES.LINK:
			// edit inline style
			element.style.color = 'red';
			break;
		case JsonPollock.TEMPLATE_TYPES.MAP:
			// prevent 'map' element to be rendered
			return null;
      ...
    }
    return element;
}
```

**render**

The *render* function renders json into a DOM element.
```js
const content = {
	"type": "vertical",
	"elements": [{
		"type": "image",
		"url": "http://assets/phone.jpg",
		"tooltip": "Great Phone!",
		"click": {
			"actions": [{
				"type": "navigate",
				"name": "Navigate to store via image",
				"lo": 23423423,
				"la": 2423423423
			}]
		}
	}]
}
const rooEl = JsonPollock.render(content);
document.getElementById('container').appendChild(rooEl);
```
**registerAction**

The *registerAction* function allow to register a callback to a certain action type, as defined in the [spec](https://developers.liveperson.com/structured-content-templates.html).
```js
/**
 * @param {Object} 	data	callback payload
 * @param {Object} 	data.actionData action configuration as defined in the json
 * @param {Object=} 	data.metadata metadata configuration as defined in the json, optional
 * @param {Event=} 	data.uiEvent UI DOM Event object of the clicked element, optional
 * @param {String=}	data.groupID reference to section id - curently relevant to checkbox element, optional. 
 **/
const linkCallback = (data) => {	
  window.open(data.actionData.uri,"_blank");
};
JsonPollock.registerAction('link', linkCallback);
```

**unregisterAction**

The *unregisterAction* function allow to unregister a callback to a certain action type, as defined in the [spec](https://developers.liveperson.com/structured-content-templates.html).
```js
JsonPollock.unregisterAction('link');
```

**unregisterAllActions**

The *unregisterAllActions* function allow to unregister all callbacks to all action types.
```js
JsonPollock.unregisterAllActions();
```

Error Handling
-------
*JsonPollock.render()* will throw an Error if it fails from any reason, the error object will have a *message* property that will give the error description.

Perior to the rendering the JSON object is validated against the JSON [schema](js/schema), if it fails to validate the error object will also include an *errors* property that will hold the validation errors.
```js
...
try {
  const rooEl = JsonPollock.render(json);
  ...
} catch(e) {
	console.log(e.message);    // error message
	console.log(e.errors);     // validation errors
}
```
Playground
-------
[Here](https://livepersoninc.github.io/json-pollock/editor/)
