(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("clappr"));
	else if(typeof define === 'function' && define.amd)
		define("clappr-playback-rate-plugin", ["clappr"], factory);
	else if(typeof exports === 'object')
		exports["clappr-playback-rate-plugin"] = factory(require("clappr"));
	else
		root["clappr-playback-rate-plugin"] = factory(root["clappr"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_clappr__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_clappr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_clappr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__public_playback_rate_selector_html__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__public_playback_rate_selector_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__public_playback_rate_selector_html__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__public_style_scss__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__public_style_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__public_style_scss__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var DEFAULT_PLAYBACK_RATES = [{ value: '0.5', label: '0.5x' }, { value: '0.75', label: '0.75x' }, { value: '1.0', label: 'Normal' }, { value: '1.5', label: '1.5x' }, { value: '2.0', label: '2x' }];

var DEFAULT_PLAYBACK_RATE = '1.0';

var PlaybackRatePlugin = function (_UICorePlugin) {
  _inherits(PlaybackRatePlugin, _UICorePlugin);

  function PlaybackRatePlugin() {
    _classCallCheck(this, PlaybackRatePlugin);

    return _possibleConstructorReturn(this, (PlaybackRatePlugin.__proto__ || Object.getPrototypeOf(PlaybackRatePlugin)).apply(this, arguments));
  }

  _createClass(PlaybackRatePlugin, [{
    key: 'bindEvents',
    value: function bindEvents() {
      this.listenTo(this.core.mediaControl, __WEBPACK_IMPORTED_MODULE_0_clappr__["Events"].CORE_ACTIVE_CONTAINER_CHANGED, this.reload);
      this.listenTo(this.core.mediaControl, __WEBPACK_IMPORTED_MODULE_0_clappr__["Events"].MEDIACONTROL_RENDERED, this.render);
      this.listenTo(this.core.mediaControl, __WEBPACK_IMPORTED_MODULE_0_clappr__["Events"].MEDIACONTROL_HIDE, this.hideContextMenu);
      this.listenTo(this.core.mediaControl, PlaybackRatePlugin.MEDIACONTROL_PLAYBACKRATE, this.updatePlaybackRate);
    }
  }, {
    key: 'unBindEvents',
    value: function unBindEvents() {
      this.stopListening(this.core.mediaControl, __WEBPACK_IMPORTED_MODULE_0_clappr__["Events"].MEDIACONTROL_CONTAINERCHANGED);
      this.stopListening(this.core.mediaControl, __WEBPACK_IMPORTED_MODULE_0_clappr__["Events"].MEDIACONTROL_RENDERED);
      this.stopListening(this.core.mediaControl, __WEBPACK_IMPORTED_MODULE_0_clappr__["Events"].MEDIACONTROL_HIDE);
    }
  }, {
    key: 'reload',
    value: function reload() {
      this.unBindEvents();
      this.bindEvents();
    }
  }, {
    key: 'shouldRender',
    value: function shouldRender() {
      if (!this.core.activeContainer) {
        return false;
      }

      var currentPlayback = this.core.activePlayback;
      if (currentPlayback.tagName != 'video' && currentPlayback.tagName != 'audio') {
        //console.warn('PlaybackRatePlugin#shouldRender: Cannot affect rate for playback', currentPlayback);
        return false;
      }

      return true;
    }
  }, {
    key: 'render',
    value: function render() {
      //console.log('PlaybackRatePlugin#render()');
      var cfg = this.core.options.playbackRateConfig || {};

      if (!this.playbackRates) {
        this.playbackRates = cfg.options || DEFAULT_PLAYBACK_RATES;
      }

      if (!this.selectedRate) {
        this.selectedRate = cfg.defaultValue || DEFAULT_PLAYBACK_RATE;
      }

      if (this.shouldRender()) {
        var t = Object(__WEBPACK_IMPORTED_MODULE_0_clappr__["template"])(__WEBPACK_IMPORTED_MODULE_1__public_playback_rate_selector_html___default.a);
        var html = t({ playbackRates: this.playbackRates, title: this.getTitle() });
        this.$el.html(html);

        var style = __WEBPACK_IMPORTED_MODULE_0_clappr__["Styler"].getStyleFor(__WEBPACK_IMPORTED_MODULE_2__public_style_scss___default.a, { baseUrl: this.core.options.baseUrl });
        this.$el.append(style);

        this.core.mediaControl.$('.media-control-right-panel').append(this.el);
        this.updateText();
      }

      return this;
    }
  }, {
    key: 'onRateSelect',
    value: function onRateSelect(event) {
      //console.log('onRateSelect', event.target);
      var rate = event.target.dataset.playbackRateSelect;
      this.setSelectedRate(rate);
      this.toggleContextMenu();
      event.stopPropagation();
      return false;
    }
  }, {
    key: 'onShowMenu',
    value: function onShowMenu(event) {
      this.toggleContextMenu();
    }
  }, {
    key: 'toggleContextMenu',
    value: function toggleContextMenu() {
      this.$('.playback_rate ul').toggle();
    }
  }, {
    key: 'hideContextMenu',
    value: function hideContextMenu() {
      this.$('.playback_rate ul').hide();
    }
  }, {
    key: 'updatePlaybackRate',
    value: function updatePlaybackRate(rate) {
      this.setSelectedRate(rate);
    }
  }, {
    key: 'setSelectedRate',
    value: function setSelectedRate(rate) {
      // Set <video playbackRate="..."
      this.core.$el.find('video,audio').get(0).playbackRate = rate;
      this.selectedRate = rate;
      this.updateText();
    }
  }, {
    key: 'setActiveListItem',
    value: function setActiveListItem(rateValue) {
      this.$('a').removeClass('active');
      this.$('a[data-playback-rate-select="' + rateValue + '"]').addClass('active');
    }
  }, {
    key: 'buttonElement',
    value: function buttonElement() {
      return this.$('.playback_rate button');
    }
  }, {
    key: 'getTitle',
    value: function getTitle() {
      var _this2 = this;

      var title = this.selectedRate;
      this.playbackRates.forEach(function (r) {
        if (r.value == _this2.selectedRate) {
          title = r.label;
        }
      });
      return title;
    }
  }, {
    key: 'updateText',
    value: function updateText() {
      this.buttonElement().text(this.getTitle());
      this.setActiveListItem(this.selectedRate);
    }
  }, {
    key: 'name',
    get: function get() {
      return 'playback_rate';
    }
  }, {
    key: 'template',
    get: function get() {
      return Object(__WEBPACK_IMPORTED_MODULE_0_clappr__["template"])(__WEBPACK_IMPORTED_MODULE_1__public_playback_rate_selector_html___default.a);
    }
  }, {
    key: 'attributes',
    get: function get() {
      return {
        'class': this.name,
        'data-playback-rate-select': ''
      };
    }
  }, {
    key: 'events',
    get: function get() {
      return {
        'click [data-playback-rate-select]': 'onRateSelect',
        'click [data-playback-rate-button]': 'onShowMenu'
      };
    }
  }]);

  return PlaybackRatePlugin;
}(__WEBPACK_IMPORTED_MODULE_0_clappr__["UICorePlugin"]);

/* harmony default export */ __webpack_exports__["default"] = (PlaybackRatePlugin);


PlaybackRatePlugin.type = 'core';
PlaybackRatePlugin.MEDIACONTROL_PLAYBACKRATE = 'playbackRate';

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = "<button class=\"media-control-button media-control-icon\" data-playback-rate-button>\n  <%= title %>\n</button>\n<ul>\n  <% for (var i = 0; i < playbackRates.length; i++) { %>\n    <li><a href=\"#\" data-playback-rate-select=\"<%= playbackRates[i].value %>\"><%= playbackRates[i].label %></a></li>\n  <% }; %>\n</ul>\n";

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(undefined);
// imports


// module
exports.push([module.i, ".media-control[data-media-control] .media-control-layer[data-controls] .playback_rate[data-playback-rate-select] {\n  float: right;\n  margin-top: 5px;\n  position: relative; }\n  .media-control[data-media-control] .media-control-layer[data-controls] .playback_rate[data-playback-rate-select] button.media-control-button.media-control-icon {\n    font-family: Roboto,\"Open Sans\",Arial,sans-serif;\n    -webkit-font-smoothing: antialiased;\n    font-size: 12px;\n    cursor: pointer;\n    padding: 10px; }\n    .media-control[data-media-control] .media-control-layer[data-controls] .playback_rate[data-playback-rate-select] button.media-control-button.media-control-icon:hover {\n      color: #c9c9c9; }\n    .media-control[data-media-control] .media-control-layer[data-controls] .playback_rate[data-playback-rate-select] button.media-control-button.media-control-icon.changing {\n      -webkit-animation: pulse 0.5s infinite alternate; }\n  .media-control[data-media-control] .media-control-layer[data-controls] .playback_rate[data-playback-rate-select] > ul {\n    display: none;\n    list-style-type: none;\n    position: absolute;\n    bottom: 25px;\n    border: 1px solid black;\n    border-radius: 4px;\n    background-color: rgba(0, 0, 0, 0.7); }\n  .media-control[data-media-control] .media-control-layer[data-controls] .playback_rate[data-playback-rate-select] li {\n    position: relative;\n    font-size: 12px; }\n    .media-control[data-media-control] .media-control-layer[data-controls] .playback_rate[data-playback-rate-select] li[data-title] {\n      padding: 5px; }\n    .media-control[data-media-control] .media-control-layer[data-controls] .playback_rate[data-playback-rate-select] li a {\n      color: #aaa;\n      padding: 2px 10px 2px 15px;\n      display: block;\n      text-decoration: none; }\n      .media-control[data-media-control] .media-control-layer[data-controls] .playback_rate[data-playback-rate-select] li a.active {\n        background-color: black;\n        font-weight: bold;\n        color: #fff; }\n        .media-control[data-media-control] .media-control-layer[data-controls] .playback_rate[data-playback-rate-select] li a.active:before {\n          content: '\\2713';\n          position: absolute;\n          top: 2px;\n          left: 4px; }\n      .media-control[data-media-control] .media-control-layer[data-controls] .playback_rate[data-playback-rate-select] li a:hover {\n        color: #fff;\n        text-decoration: none; }\n\n@-webkit-keyframes pulse {\n  0% {\n    color: #fff; }\n  50% {\n    color: #ff0101; }\n  100% {\n    color: #B80000; } }\n", ""]);

// exports


/***/ }),
/* 4 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ })
/******/ ]);
});
//# sourceMappingURL=clappr-playback-rate-plugin.js.map