(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("Clappr"));
	else if(typeof define === 'function' && define.amd)
		define(["Clappr"], factory);
	else if(typeof exports === 'object')
		exports["PlaybackRatePlugin"] = factory(require("Clappr"));
	else
		root["PlaybackRatePlugin"] = factory(root["Clappr"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "<%=baseUrl%>/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports['default'] = __webpack_require__(1);module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _createClass=(function(){function defineProperties(target,props){for(var i=0;i < props.length;i++) {var descriptor=props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if('value' in descriptor)descriptor.writable = true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};})();var _get=function get(_x,_x2,_x3){var _again=true;_function: while(_again) {var object=_x,property=_x2,receiver=_x3;_again = false;if(object === null)object = Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc === undefined){var parent=Object.getPrototypeOf(object);if(parent === null){return undefined;}else {_x = parent;_x2 = property;_x3 = receiver;_again = true;desc = parent = undefined;continue _function;}}else if('value' in desc){return desc.value;}else {var getter=desc.get;if(getter === undefined){return undefined;}return getter.call(receiver);}}};function _interopRequireDefault(obj){return obj && obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}function _inherits(subClass,superClass){if(typeof superClass !== 'function' && superClass !== null){throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__ = superClass;}var _Clappr=__webpack_require__(2);var _publicPlaybackRateSelectorHtml=__webpack_require__(3);var _publicPlaybackRateSelectorHtml2=_interopRequireDefault(_publicPlaybackRateSelectorHtml);var _publicStyleScss=__webpack_require__(4);var _publicStyleScss2=_interopRequireDefault(_publicStyleScss);var AUTO=-1;var PlaybackRatePlugin=(function(_UICorePlugin){_inherits(PlaybackRatePlugin,_UICorePlugin);function PlaybackRatePlugin(){_classCallCheck(this,PlaybackRatePlugin);_get(Object.getPrototypeOf(PlaybackRatePlugin.prototype),'constructor',this).apply(this,arguments);}_createClass(PlaybackRatePlugin,[{key:'bindEvents',value:function bindEvents(){this.listenTo(this.core.mediaControl,_Clappr.Events.MEDIACONTROL_CONTAINERCHANGED,this.reload);this.listenTo(this.core.mediaControl,_Clappr.Events.MEDIACONTROL_RENDERED,this.render);}},{key:'unBindEvents',value:function unBindEvents(){this.stopListening(this.core.mediaControl,_Clappr.Events.MEDIACONTROL_CONTAINERCHANGED);this.stopListening(this.core.mediaControl,_Clappr.Events.MEDIACONTROL_RENDERED);}},{key:'reload',value:function reload(){this.unBindEvents();this.bindEvents();}},{key:'shouldRender',value:function shouldRender(){if(!this.core.getCurrentContainer()){console.warn('playback rate plugin, no container');return false;}var currentPlayback=this.core.getCurrentPlayback();if(!currentPlayback){console.warn('playback rate plugin, no playback');return false;}console.warn('playback rate plugin',currentPlayback); // TODO: is HTML5?
	return true;}},{key:'render',value:function render(){this.playbackRates = [{value:'0.5',label:'0.5x'},{value:'1.0',label:'1x'},{value:'2.0',label:'2x'}];if(this.shouldRender()){console.log('playback rate plugin rendering');var style=_Clappr.Styler.getStyleFor(_publicStyleScss2['default'],{baseUrl:this.core.options.baseUrl});console.log('style',style);try{console.log('trying html',_publicPlaybackRateSelectorHtml2['default']);var t=(0,_Clappr.template)(_publicPlaybackRateSelectorHtml2['default']);console.log('created template object',t);var html=t({'playbackRates':this.playbackRates,'title':this.getTitle()});console.log('rendered',html);this.$el.html(html);console.log('appended html');}catch(e) {console.error(e);}this.$el.append(style);console.log('appended style');console.log('this.$el',this.$el);console.log('this.el',this.el);this.core.mediaControl.$('.media-control-right-panel').append(this.el);console.log('appended element'); //this.updateText(this.selectedLevelId)
	}return this;}},{key:'findLevelBy',value:function findLevelBy(id){var foundLevel;this.levels.forEach(function(level){if(level.id === id){foundLevel = level;}});return foundLevel;}},{key:'changeLevelLabelBy',value:function changeLevelLabelBy(id,newLabel){var _this=this;this.levels.forEach(function(level,index){if(level.id === id){_this.levels[index].label = newLabel;}});}},{key:'onRateSelect',value:function onRateSelect(event){var rate=event.target.dataset.playbackRateSelect;console.log('selected rate',rate);window.plugin = this;boxcast.player.core.$el.find('video').get(0).playbackRate = rate;this.el.playbackRate = rate; /*
	    this.selectedLevelId = parseInt(event.target.dataset.levelSelectorSelect, 10)
	    this.core.getCurrentPlayback().currentLevel = this.selectedLevelId

	    this.updateText(this.selectedLevelId)
	    */this.toggleContextMenu();event.stopPropagation();return false;}},{key:'onShowMenu',value:function onShowMenu(event){this.toggleContextMenu();}},{key:'toggleContextMenu',value:function toggleContextMenu(){this.$('.playback_rate ul').toggle();}},{key:'setActiveListItem',value:function setActiveListItem(level){console.log(this.$('a'));this.$('a').removeClass('active');this.$('a[data-playback-rate-select="' + level + '"').addClass('active');console.log(this.$('a'));}},{key:'buttonElement',value:function buttonElement(){return this.$('.playback_rate button');}},{key:'getTitle',value:function getTitle(){return '1x'; //return (this.core.options.levelSelectorConfig || {}).title
	}},{key:'updateText',value:function updateText(level){if(level === AUTO){var playbackLevel=this.core.getCurrentPlayback().currentLevel;var label=(this.findLevelBy(playbackLevel) || {}).label;if(label){this.buttonElement().text('AUTO (' + label + ')');}else {this.buttonElement().text('AUTO');}}else {var label=(this.findLevelBy(level) || {}).label;this.buttonElement().text(label);}this.setActiveListItem(level);}},{key:'name',get:function get(){return 'playback_rate';}},{key:'template',get:function get(){console.log('html',_publicPlaybackRateSelectorHtml2['default']);try{return (0,_Clappr.template)(_publicPlaybackRateSelectorHtml2['default']);}catch(e) {console.error(e);}}},{key:'attributes',get:function get(){return {'class':this.name,'data-playback-rate-select':''};}},{key:'events',get:function get(){return {'click [data-playback-rate-select]':'onRateSelect','click [data-playback-rate-button]':'onShowMenu'};}}],[{key:'version',get:function get(){return VERSION;}}]);return PlaybackRatePlugin;})(_Clappr.UICorePlugin);exports['default'] = PlaybackRatePlugin;module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = "<button data-playback-rate-button>\n  <%= title %>\n</button>\n<ul>\n  <% for (var i = 0; i < playbackRates.length; i++) { %>\n    <li><a href=\"#\" data-playback-rate-select=\"<%= playbackRates[i].value %>\"><%= playbackRates[i].label %></a></li>\n  <% }; %>\n</ul>\n";

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(5)();
	// imports


	// module
	exports.push([module.id, ".playback_rate[data-playback-rate-select] {\n  float: right;\n  margin-top: 5px;\n  position: relative; }\n  .playback_rate[data-playback-rate-select] button {\n    background-color: transparent;\n    color: #fff;\n    font-family: Roboto,\"Open Sans\",Arial,sans-serif;\n    -webkit-font-smoothing: antialiased;\n    border: none;\n    font-size: 10px;\n    cursor: pointer; }\n    .playback_rate[data-playback-rate-select] button:hover {\n      color: #c9c9c9; }\n    .playback_rate[data-playback-rate-select] button.changing {\n      -webkit-animation: pulse 0.5s infinite alternate; }\n  .playback_rate[data-playback-rate-select] > ul {\n    display: none;\n    list-style-type: none;\n    position: absolute;\n    bottom: 25px;\n    border: 1px solid black;\n    border-radius: 4px;\n    background-color: rgba(0, 0, 0, 0.7); }\n  .playback_rate[data-playback-rate-select] li {\n    position: relative;\n    font-size: 10px; }\n    .playback_rate[data-playback-rate-select] li[data-title] {\n      padding: 5px; }\n    .playback_rate[data-playback-rate-select] li a {\n      color: #aaa;\n      padding: 2px 10px 2px 15px;\n      display: block;\n      text-decoration: none; }\n      .playback_rate[data-playback-rate-select] li a.active {\n        background-color: black;\n        font-weight: bold;\n        color: #fff; }\n        .playback_rate[data-playback-rate-select] li a.active:before {\n          content: '\\2713';\n          position: absolute;\n          top: 2px;\n          left: 4px; }\n      .playback_rate[data-playback-rate-select] li a:hover {\n        color: #fff;\n        text-decoration: none; }\n\n@-webkit-keyframes pulse {\n  0% {\n    color: #fff; }\n  50% {\n    color: #ff0101; }\n  100% {\n    color: #B80000; } }\n", ""]);

	// exports


/***/ },
/* 5 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/ // css base code, injected by the css-loader
	"use strict";module.exports = function(){var list=[]; // return the list of modules as css string
	list.toString = function toString(){var result=[];for(var i=0;i < this.length;i++) {var item=this[i];if(item[2]){result.push("@media " + item[2] + "{" + item[1] + "}");}else {result.push(item[1]);}}return result.join("");}; // import a list of modules into the list
	list.i = function(modules,mediaQuery){if(typeof modules === "string")modules = [[null,modules,""]];var alreadyImportedModules={};for(var i=0;i < this.length;i++) {var id=this[i][0];if(typeof id === "number")alreadyImportedModules[id] = true;}for(i = 0;i < modules.length;i++) {var item=modules[i]; // skip already imported module
	// this implementation is not 100% perfect for weird media query combinations
	//  when a module is imported multiple times with different media queries.
	//  I hope this will never occur (Hey this way we have smaller bundles)
	if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]){if(mediaQuery && !item[2]){item[2] = mediaQuery;}else if(mediaQuery){item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";}list.push(item);}}};return list;};

/***/ }
/******/ ])
});
;