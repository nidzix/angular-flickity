(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("flickity"));
	else if(typeof define === 'function' && define.amd)
		define("angular-flickity", ["flickity"], factory);
	else if(typeof exports === 'object')
		exports["angular-flickity"] = factory(require("flickity"));
	else
		root["angular-flickity"] = factory(root["flickity"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _flickity = __webpack_require__(1);
	
	var _flickity2 = __webpack_require__(2);
	
	var _flickity3 = __webpack_require__(4);
	
	var _next = __webpack_require__(5);
	
	var _previous = __webpack_require__(7);
	
	angular.module('bc.Flickity', []).provider('FlickityConfig', _flickity.FlickityConfigProvider).service('FlickityService', _flickity2.FlickityService).directive('bcFlickity', _flickity3.FlickityDirective).directive('bcFlickityNext', _next.FlickityNextDirective).directive('bcFlickityPrevious', _previous.FlickityPreviousDirective);

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var FlickityConfigProvider = exports.FlickityConfigProvider = function () {
	    function FlickityConfigProvider() {
	        _classCallCheck(this, FlickityConfigProvider);
	
	        // Define Flickity defaults
	        this.accessibility = true;
	        this.cellAlign = 'center';
	        this.freeScrollFriction = .075;
	        this.friction = .28;
	        this.percentPosition = true;
	        this.resize = true;
	        this.selectedAttraction = .025;
	        this.setGallerySize = true;
	    }
	
	    _createClass(FlickityConfigProvider, [{
	        key: '$get',
	        value: function $get() {
	            return this;
	        }
	    }]);
	
	    return FlickityConfigProvider;
	}();

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.FlickityService = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _flickity = __webpack_require__(3);
	
	var _flickity2 = _interopRequireDefault(_flickity);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var FlickityService = exports.FlickityService = function () {
	    FlickityService.$inject = ["$timeout", "$q", "$rootScope", "$log"];
	    function FlickityService($timeout, $q, $rootScope, $log) {
	        'ngInject';
	
	        _classCallCheck(this, FlickityService);
	
	        this.$timeout = $timeout;
	        this.$q = $q;
	        this.$rootScope = $rootScope;
	        this.$log = $log;
	
	        this.instances = [];
	    }
	
	    /**
	     * Create a new Flickity instance
	     *
	     * @param {Element} element
	     * @param {String} id
	     * @param {Object} options
	     * @return {Object} instance
	     */
	
	
	    _createClass(FlickityService, [{
	        key: 'create',
	        value: function create(element, id, options) {
	            var _this = this;
	
	            return new Promise(function (resolve, reject) {
	                // If no ID was passed in
	                if (!id) {
	                    if (element.id) {
	                        // Use the element's ID if it exists
	                        id = element.id;
	                    } else {
	                        // Otherwise, assign a new ID
	                        id = _this.instances.length + 1;
	                    }
	                }
	
	                // Check to see if the ID is already in use
	                if (_this._findObjectById(_this.instances, id)) {
	                    var index = _this._getFlickityIndex(id);
	                    _this.$log.error('This ID is already in use: ', _this.instances[index]);
	
	                    reject('This ID is already in use.');
	                }
	
	                // Define the new instance
	                var instance = {
	                    id: id,
	                    instance: new _flickity2.default(element, options)
	                };
	
	                // Save this instance to the array
	                _this.instances.push(instance);
	
	                // Bind to all events
	                return _this._bindEvents(id).then(function () {
	                    return resolve(instance);
	                });
	            });
	        }
	
	        /**
	         * Destroy a Flickity instance
	         *
	         * @param {String} id
	         * @return {Object} instance
	         */
	
	    }, {
	        key: 'destroy',
	        value: function destroy(id) {
	            var _this2 = this;
	
	            return new Promise(function (resolve, reject) {
	                var flickityIndex = _this2._getFlickityIndex(id);
	
	                if (flickityIndex < 0) {
	                    return reject('Instance ' + id + ' not found.');
	                }
	
	                // Destroy the Flickity instance
	                _this2.instances[flickityIndex].instance.destroy();
	
	                // Remove the instance from the array
	                _this2.instances.splice(flickityIndex, 1);
	
	                return resolve('Instance ' + id + ' destroyed.');
	            });
	        }
	
	        /**
	         * Return all instances
	         *
	         * @return {Array} instances
	         */
	
	    }, {
	        key: 'getAll',
	        value: function getAll() {
	            var _this3 = this;
	
	            return new Promise(function (resolve) {
	                resolve(_this3.instances);
	            });
	        }
	
	        /**
	         * Move to the next slide
	         *
	         * @param {string} id
	         * @param {Bool} isWrapped
	         * @param {Bool} isInstant
	         * @return {Object} instance
	         */
	
	    }, {
	        key: 'next',
	        value: function next(id, isWrapped, isInstant) {
	            var _this4 = this;
	
	            return new Promise(function (resolve, reject) {
	                var flickityIndex = _this4._getFlickityIndex(id);
	
	                if (flickityIndex < 0) {
	                    return reject('Instance ' + id + ' not found.');
	                } else {
	                    // Move to the next slide
	                    _this4.instances[flickityIndex].instance.next(isWrapped, isInstant);
	
	                    // Return the instance
	                    return resolve(_this4.instances[flickityIndex]);
	                }
	            });
	        }
	
	        /**
	         * Move to the previous slide
	         *
	         * @param {string} id
	         * @param {Bool} isWrapped
	         * @param {Bool} isInstant
	         * @return {Object} instance
	         */
	
	    }, {
	        key: 'previous',
	        value: function previous(id, isWrapped, isInstant) {
	            var _this5 = this;
	
	            return new Promise(function (resolve, reject) {
	                var flickityIndex = _this5._getFlickityIndex(id);
	
	                if (flickityIndex < 0) {
	                    return reject('Instance ' + id + ' not found.');
	                } else {
	                    // Move to the previous slide
	                    _this5.instances[flickityIndex].instance.previous(isWrapped, isInstant);
	
	                    // Return the instance
	                    return resolve(_this5.instances[flickityIndex]);
	                }
	            });
	        }
	
	        /**
	         * Select a slide
	         *
	         * @param {String} id
	         * @param {Integer} index
	         * @param {Bool} isWrapped
	         * @param {Bool} isInstant
	         * @return {Object} instance
	         */
	
	    }, {
	        key: 'select',
	        value: function select(id, index) {
	            var _this6 = this;
	
	            var isWrapped = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	            var isInstant = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
	
	            return new Promise(function (resolve, reject) {
	                var flickityIndex = _this6._getFlickityIndex(id);
	
	                if (flickityIndex < 0) {
	                    return reject('Instance ' + id + ' not found.');
	                } else {
	                    // Move to the selected slide
	                    _this6.instances[flickityIndex].instance.select(index, isWrapped, isInstant);
	
	                    // Return the instance
	                    return resolve(_this6.instances[flickityIndex]);
	                }
	            });
	        }
	
	        /**
	         * Select a slide of a cell
	         *
	         * @param {String} id
	         * @param {Integer|String} value
	         * @param {Bool} isWrapped
	         * @param {Bool} isInstant
	         * @return {Object} instance
	         */
	
	    }, {
	        key: 'selectCell',
	        value: function selectCell(id, value) {
	            var _this7 = this;
	
	            var isWrapped = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	            var isInstant = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
	
	            return new Promise(function (resolve, reject) {
	                var flickityIndex = _this7._getFlickityIndex(id);
	
	                if (flickityIndex < 0) {
	                    return reject('Instance ' + id + ' not found.');
	                } else {
	                    // Move to the selected slide
	                    _this7.instances[flickityIndex].instance.selectCell(value, isWrapped, isInstant);
	
	                    // Return the instance
	                    return resolve(_this7.instances[flickityIndex]);
	                }
	            });
	        }
	
	        /**
	         * Get the current slide index
	         *
	         * @param {String} id
	         * @return {Integer} selectedIndex
	         */
	
	    }, {
	        key: 'selectedIndex',
	        value: function selectedIndex(id) {
	            var _this8 = this;
	
	            return new Promise(function (resolve, reject) {
	                var flickityIndex = _this8._getFlickityIndex(id);
	
	                if (flickityIndex < 0) {
	                    return reject('Instance ' + id + ' not found.');
	                } else {
	                    // Return the current index
	                    return resolve(_this8.instances[flickityIndex].instance.selectedIndex);
	                }
	            });
	        }
	
	        /**
	         * Resize the gallery and re-position cells.
	         *
	         * @param {String} id
	         * @return {Object} instance
	         */
	
	    }, {
	        key: 'resize',
	        value: function resize(id) {
	            var _this9 = this;
	
	            return new Promise(function (resolve, reject) {
	                var flickityIndex = _this9._getFlickityIndex(id);
	
	                if (flickityIndex < 0) {
	                    return reject('Instance ' + id + ' not found.');
	                } else {
	                    // Trigger the resize
	                    _this9.instances[flickityIndex].instance.resize();
	
	                    // Return the instance
	                    return resolve(_this9.instances[flickityIndex]);
	                }
	            });
	        }
	
	        /**
	         * Position cells at selected position.
	         * Trigger reposition after the size of a cell has been changed.
	         *
	         * @param {String} id
	         * @return {Object} instance
	         */
	
	    }, {
	        key: 'reposition',
	        value: function reposition(id) {
	            var _this10 = this;
	
	            return new Promise(function (resolve, reject) {
	                var flickityIndex = _this10._getFlickityIndex(id);
	
	                if (flickityIndex < 0) {
	                    return reject('Instance ' + id + ' not found.');
	                } else {
	                    // Trigger the reposition
	                    _this10.instances[flickityIndex].instance.reposition();
	
	                    // Return the instance
	                    return resolve(_this10.instances[flickityIndex]);
	                }
	            });
	        }
	
	        /**
	         * Re-collect all cell elements in `flickity-slider`.
	         *
	         * @param {String} id
	         * @return {Object} instance
	         */
	
	    }, {
	        key: 'reloadCells',
	        value: function reloadCells(id) {
	            var _this11 = this;
	
	            return new Promise(function (resolve, reject) {
	                var flickityIndex = _this11._getFlickityIndex(id);
	
	                if (flickityIndex < 0) {
	                    return reject('Instance ' + id + ' not found.');
	                } else {
	                    // Reload cells
	                    _this11.instances[flickityIndex].instance.reloadCells();
	
	                    // Return the instance
	                    return resolve(_this11.instances[flickityIndex]);
	                }
	            });
	        }
	
	        /**
	         * Get a Flickity instance by ID
	         *
	         * @param {String} id
	         * @return {Object} instance
	         */
	
	    }, {
	        key: 'get',
	        value: function get(id) {
	            var _this12 = this;
	
	            return new Promise(function (resolve, reject) {
	                var flickityIndex = _this12._getFlickityIndex(id);
	
	                if (flickityIndex < 0) {
	                    return reject('Instance ' + id + ' not found.');
	                } else {
	                    // Return the instance
	                    return resolve(_this12.instances[flickityIndex]);
	                }
	            });
	        }
	
	        /**
	         * Get the first Flickity instance
	         *
	         * @return {Object} instance
	         */
	
	    }, {
	        key: 'getFirst',
	        value: function getFirst() {
	            var _this13 = this;
	
	            return new Promise(function (resolve, reject) {
	                if (!_this13.instances || _this13.instances.length < 1) {
	                    return reject('No instances exist.');
	                } else {
	                    // Return the instance
	                    return resolve(_this13.instances[0]);
	                }
	            });
	        }
	
	        /**
	         * Get the Flickity instance
	         *
	         * @param {Element} element
	         * @return {Object} instance
	         */
	
	    }, {
	        key: 'getByElement',
	        value: function getByElement(element) {
	            return new Promise(function (resolve, reject) {
	                var instance = _flickity2.default.data(element);
	
	                if (instance) {
	                    // Return the instance
	                    return resolve(instance);
	                } else {
	                    return reject('Instance not found for ' + element);
	                }
	            });
	        }
	
	        /**
	         * Prepend elements and create cells to the beginning of the gallery.
	         *
	         * @param {String} id
	         * @param {*} element(s) - jQuery object, Array of Elements, Element, or NodeList
	         * @return {Object} instance
	         */
	
	    }, {
	        key: 'prepend',
	        value: function prepend(id, elements) {
	            var _this14 = this;
	
	            return new Promise(function (resolve, reject) {
	                var flickityIndex = _this14._getFlickityIndex(id);
	
	                if (flickityIndex < 0) {
	                    return reject('Instance ' + id + ' not found.');
	                } else {
	                    // Prepend the slides
	                    _this14.instances[flickityIndex].instance.prepend(elements);
	
	                    // Return the instance
	                    return resolve(_this14.instances[flickityIndex]);
	                }
	            });
	        }
	
	        /**
	         * Append elements and create cells to the end of the gallery.
	         *
	         * @param {String} id
	         * @param {*} element(s) - jQuery object, Array of Elements, Element, or NodeList
	         * @return {Object} instance
	         */
	
	    }, {
	        key: 'append',
	        value: function append(id, elements) {
	            var _this15 = this;
	
	            return new Promise(function (resolve, reject) {
	                var flickityIndex = _this15._getFlickityIndex(id);
	
	                if (flickityIndex < 0) {
	                    return reject('Instance ' + id + ' not found.');
	                } else {
	                    // Append the slides
	                    _this15.instances[flickityIndex].instance.append(elements);
	
	                    // Return the instance
	                    return resolve(_this15.instances[flickityIndex]);
	                }
	            });
	        }
	
	        /**
	         * Insert elements into the gallery and create cells at the desired index.
	         *
	         * @param {String} id
	         * @param {*} element(s) - jQuery object, Array of Elements, Element, or NodeList
	         * @param {Integer} index - Zero based index
	         * @return {Object} instance
	         */
	
	    }, {
	        key: 'insert',
	        value: function insert(id, elements, index) {
	            var _this16 = this;
	
	            return new Promise(function (resolve, reject) {
	                var flickityIndex = _this16._getFlickityIndex(id);
	
	                if (flickityIndex < 0) {
	                    return reject('Instance ' + id + ' not found.');
	                } else {
	                    // Insert the slides
	                    _this16.instances[flickityIndex].instance.insert(elements, index);
	
	                    // Return the instance
	                    return resolve(_this16.instances[flickityIndex]);
	                }
	            });
	        }
	
	        /**
	         * Get the elements of the cells
	         *
	         * @param {String} id
	         * @return {Array} cellElements
	         */
	
	    }, {
	        key: 'getCellElements',
	        value: function getCellElements(id) {
	            var _this17 = this;
	
	            return new Promise(function (resolve, reject) {
	                var flickityIndex = _this17._getFlickityIndex(id);
	
	                if (flickityIndex < 0) {
	                    return reject('Instance ' + id + ' not found.');
	                } else {
	                    // Return the array of cell elements
	                    return resolve(_this17.instances[flickityIndex].instance.getCellElements());
	                }
	            });
	        }
	
	        /**
	         * Remove cells by element
	         *
	         * @param {String} id
	         * @param {Object|Array|Element} element(s)
	         * @return {Object} instance
	         */
	
	    }, {
	        key: 'remove',
	        value: function remove(id, elements) {
	            var _this18 = this;
	
	            return new Promise(function (resolve, reject) {
	                var flickityIndex = _this18._getFlickityIndex(id);
	
	                if (flickityIndex < 0) {
	                    return reject('Instance ' + id + ' not found.');
	                } else {
	                    _this18.instances[flickityIndex].instance.remove(elements);
	
	                    // Return the instance
	                    return resolve(_this18.instances[flickityIndex]);
	                }
	            });
	        }
	
	        /**
	         * Get the currently selected cell element
	         *
	         * @param {String} id
	         * @return {Element} selectedCellElement
	         */
	
	    }, {
	        key: 'selectedElement',
	        value: function selectedElement(id) {
	            var _this19 = this;
	
	            return new Promise(function (resolve, reject) {
	                var flickityIndex = _this19._getFlickityIndex(id);
	
	                if (flickityIndex < 0) {
	                    return reject('Instance ' + id + ' not found.');
	                } else {
	                    // Return the selected element
	                    return resolve(_this19.instances[flickityIndex].instance.selectedElement);
	                }
	            });
	        }
	
	        /**
	         * Get an array of all cells
	         *
	         * @param {String} id
	         * @return {Array} cells
	         */
	
	    }, {
	        key: 'cells',
	        value: function cells(id) {
	            var _this20 = this;
	
	            return new Promise(function (resolve, reject) {
	                var flickityIndex = _this20._getFlickityIndex(id);
	
	                if (flickityIndex < 0) {
	                    return reject('Instance ' + id + ' not found.');
	                } else {
	                    // Return the array of cells
	                    return resolve(_this20.instances[flickityIndex].instance.cells);
	                }
	            });
	        }
	
	        //
	        // Helper methods
	        //
	
	
	        /**
	         * Find the index for a Flickity instance
	         *
	         * @param {String} id
	         * @return {Integer} flickityIndex
	         */
	
	    }, {
	        key: '_getFlickityIndex',
	        value: function _getFlickityIndex(id) {
	            var foundIndex = -1;
	
	            // Verify at least one instance exists
	            if (this.instances.length > 0) {
	
	                // Check the ID of each instance
	                this.instances.forEach(function (instance, index) {
	
	                    // If it matches our ID, set the index
	                    if (instance.id === id) {
	                        foundIndex = index;
	                    }
	                });
	            }
	
	            return foundIndex;
	        }
	
	        /**
	         * Bind all events for a new instance
	         *
	         * @param {String} id
	         * @return {Bool} isFinished
	         */
	
	    }, {
	        key: '_bindEvents',
	        value: function _bindEvents(id) {
	            var _this21 = this;
	
	            return new Promise(function (resolve, reject) {
	                var flickityIndex = _this21._getFlickityIndex(id);
	
	                if (flickityIndex < 0) {
	                    return reject();
	                }
	
	                var ID = _this21.instances[flickityIndex].id;
	
	                _this21.instances[flickityIndex].instance.on('select', function () {
	                    _this21.$rootScope.$emit('Flickity:' + ID + ':select', _this21.instances[flickityIndex]);
	                });
	
	                _this21.instances[flickityIndex].instance.on('settle', function () {
	                    _this21.$rootScope.$emit('Flickity:' + ID + ':settle', _this21.instances[flickityIndex]);
	                });
	
	                _this21.instances[flickityIndex].instance.on('scroll', function (progress, positionX) {
	                    _this21.$rootScope.$emit('Flickity:' + ID + ':scroll', {
	                        progress: progress,
	                        positionX: positionX
	                    });
	                });
	
	                _this21.instances[flickityIndex].instance.on('dragStart', function (event, pointer) {
	                    _this21.$rootScope.$emit('Flickity:' + ID + ':dragStart', {
	                        event: event,
	                        pointer: pointer
	                    });
	                });
	
	                _this21.instances[flickityIndex].instance.on('dragMove', function (event, pointer, moveVector) {
	                    _this21.$rootScope.$emit('Flickity:' + ID + ':dragMove', {
	                        event: event,
	                        pointer: pointer,
	                        moveVector: moveVector
	                    });
	                });
	
	                _this21.instances[flickityIndex].instance.on('dragEnd', function (event, pointer) {
	                    _this21.$rootScope.$emit('Flickity:' + ID + ':dragEnd', {
	                        event: event,
	                        pointer: pointer
	                    });
	                });
	
	                _this21.instances[flickityIndex].instance.on('pointerDown', function (event, pointer) {
	                    _this21.$rootScope.$emit('Flickity:' + ID + ':pointerDown', {
	                        event: event,
	                        pointer: pointer
	                    });
	                });
	
	                _this21.instances[flickityIndex].instance.on('pointerMove', function (event, pointer, moveVector) {
	                    _this21.$rootScope.$emit('Flickity:' + ID + ':pointerMove', {
	                        event: event,
	                        pointer: pointer,
	                        moveVector: moveVector
	                    });
	                });
	
	                _this21.instances[flickityIndex].instance.on('pointerUp', function (event, pointer) {
	                    _this21.$rootScope.$emit('Flickity:' + ID + ':pointerUp', {
	                        event: event,
	                        pointer: pointer
	                    });
	                });
	
	                _this21.instances[flickityIndex].instance.on('staticClick', function (event, pointer, cellElement, cellIndex) {
	                    _this21.$rootScope.$emit('Flickity:' + ID + ':staticClick', {
	                        event: event,
	                        pointer: pointer,
	                        cellElement: cellElement,
	                        cellIndex: cellIndex
	                    });
	                });
	
	                _this21.instances[flickityIndex].instance.on('lazyLoad', function (event, cellElement) {
	                    _this21.$rootScope.$emit('Flickity:' + ID + ':lazyLoad', {
	                        event: event,
	                        cellElement: cellElement
	                    });
	                });
	
	                return resolve(true);
	            });
	        }
	
	        /**
	         * Find an object within an array by ID
	         *
	         * @param {Array} source
	         * @param {String} id
	         * @return {Object} match
	         */
	
	    }, {
	        key: '_findObjectById',
	        value: function _findObjectById(source, id) {
	            return source.filter(function (object) {
	                return object.id === id;
	            })[0];
	        }
	    }]);
	
	    return FlickityService;
	}();

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	FlickityDirective.$inject = ["$timeout", "FlickityService", "FlickityConfig"];
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.FlickityDirective = FlickityDirective;
	/* global flickity */
	
	function FlickityDirective($timeout, FlickityService, FlickityConfig) {
	    'ngInject';
	
	    preLinkFunction.$inject = ["$scope", "$element", "$attrs", "$controller"];
	    postLinkFunction.$inject = ["$scope", "$element", "$attrs", "$controller"];
	    var directive = {
	        restrict: 'A',
	        scope: {},
	        bindToController: {
	            bcFlickity: '@?',
	            bcFlickityId: '@?'
	        },
	        compile: function compile() {
	            return {
	                pre: preLinkFunction,
	                post: postLinkFunction
	            };
	        },
	        controller: function controller() {},
	        controllerAs: 'vm'
	    };
	
	    return directive;
	
	    function preLinkFunction($scope, $element, $attrs, $controller) {
	        'ngInject';
	
	        // Get the user's options or start with an empty object
	
	        var userOptions = angular.fromJson($controller.bcFlickity || {});
	        // Combine the user options with the default options
	        $controller.options = angular.extend({}, FlickityConfig, userOptions);
	
	        // If no ID was passed in
	        if (!$controller.bcFlickityId) {
	            // Use the element's ID if one exists
	            if ($attrs.id) {
	                $controller.bcFlickityId = $attrs.id;
	            }
	        }
	    }
	
	    /**
	     * Post Link
	     */
	    function postLinkFunction($scope, $element, $attrs, $controller) {
	        'ngInject';
	
	        // Make sure this `create()` gets picked up in the next digest cycle
	
	        $timeout(function () {
	
	            // Initialize Flickity
	            FlickityService.create($element[0], $controller.bcFlickityId, $controller.options).then(function (flickityInstance) {
	
	                // Expose the Flickity instance and ID
	                $controller.Flickity = flickityInstance.instance;
	                $controller.bcFlickityId = flickityInstance.id;
	            });
	        });
	
	        // When the directive is being destroyed
	        var onDestroy = $scope.$on('$destroy', function (event) {
	            // Make sure we destroy the Flickity instance
	            FlickityService.destroy($controller.bcFlickityId);
	        });
	    }
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	FlickityNextDirective.$inject = ["$log", "$timeout", "$rootScope", "FlickityConfig", "FlickityService"];
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.FlickityNextDirective = FlickityNextDirective;
	
	var _next = __webpack_require__(6);
	
	function FlickityNextDirective($log, $timeout, $rootScope, FlickityConfig, FlickityService) {
	    'ngInject';
	
	    preLinkFunction.$inject = ["$scope", "$element", "$attrs", "$controller"];
	    var directive = {
	        restrict: 'A',
	        scope: {},
	        bindToController: {
	            bcFlickityNext: '=?',
	            bcFlickityId: '@?'
	        },
	        compile: function compile() {
	            return {
	                pre: preLinkFunction
	            };
	        },
	        controller: _next.NextController,
	        controllerAs: 'vm'
	    };
	
	    return directive;
	
	    /**
	     * Pre Link
	     */
	    function preLinkFunction($scope, $element, $attrs, $controller) {
	        'ngInject';
	
	        // Get the ID
	
	        var ID = $controller.flickityId;
	
	        // Define the broadcast names to listen for
	        var selectEvent = 'Flickity:' + ID + ':cellSelect';
	        var settleEvent = 'Flickity:' + ID + ':settle';
	
	        // Listen
	        var cellSelect = $rootScope.$on(selectEvent, function (event, data) {
	            _disableButtonIfNeeded(data.instance.slides.length, data.instance.selectedIndex + 1);
	        });
	        var settle = $rootScope.$on(settleEvent, function (event, data) {
	            _disableButtonIfNeeded(data.instance.slides.length, data.instance.selectedIndex + 1);
	        });
	
	        $element.on('click', function () {
	
	            // Move to the next cell
	            FlickityService.next($controller.flickityId, $controller.wrapAround).then(function (instance) {
	                _disableButtonIfNeeded(instance.instance.selectedIndex);
	            });
	        });
	
	        /**
	         * Disable button if needed
	         *
	         * @param {number} index
	         */
	        function _disableButtonIfNeeded(index, cellCount) {
	
	            // Disable button if at the beginning and we shouldn't wrap
	            if (!$controller.wrapAround && index === cellCount) {
	                $attrs.$set('disabled', 'disabled');
	            } else {
	                $attrs.$set('disabled', false);
	            }
	        }
	    }
	}

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var NextController = exports.NextController = function () {
	    NextController.$inject = ["$log", "$q", "$timeout", "FlickityConfig", "FlickityService"];
	    function NextController($log, $q, $timeout, FlickityConfig, FlickityService) {
	        'ngInject';
	
	        _classCallCheck(this, NextController);
	
	        this.$log = $log;
	        this.$q = $q;
	        this.$timeout = $timeout;
	        this.FlickityConfig = FlickityConfig;
	        this.FlickityService = FlickityService;
	
	        this._activate();
	    }
	
	    _createClass(NextController, [{
	        key: '_activate',
	        value: function _activate() {
	            // Assign wrap around or fall back to a default
	            if (typeof this.bcFlickityNext !== 'undefined') {
	                this.wrapAround = this.bcFlickityNext;
	            } else if (typeof this.FlickityConfig.wrapAround !== 'undefined') {
	                this.wrapAround = this.FlickityConfig.wrapAround;
	            } else {
	                this.wrapAround = false;
	            }
	            this.flickityId = null;
	
	            // Make sure we have an ID
	            this._setId();
	        }
	
	        /**
	         * Set ID to what is defined, fallback to first instance
	         *
	         * @return {String} flickityId
	         */
	
	    }, {
	        key: '_setId',
	        value: function _setId() {
	            var _this = this;
	
	            return new Promise(function (resolve, reject) {
	                _this.$timeout(function () {
	
	                    if (_this.bcFlickityId) {
	                        _this.flickityId = _this.bcFlickityId;
	                        return resolve(_this.flickityId);
	                    } else {
	                        _this.$timeout(function () {
	                            _this.FlickityService.getFirst().then(function (instance) {
	                                _this.flickityId = instance.id;
	                                return resolve(_this.flickityId);
	                            }).catch(function (error) {
	                                _this.$log.warn(error);
	                                return reject(error);
	                            });
	                        });
	                    }
	                });
	            });
	        }
	    }]);
	
	    return NextController;
	}();

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	FlickityPreviousDirective.$inject = ["$log", "$timeout", "$rootScope", "FlickityConfig", "FlickityService"];
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.FlickityPreviousDirective = FlickityPreviousDirective;
	
	var _previous = __webpack_require__(8);
	
	function FlickityPreviousDirective($log, $timeout, $rootScope, FlickityConfig, FlickityService) {
	    'ngInject';
	
	    preLinkFunction.$inject = ["$scope", "$element", "$attrs", "$controller"];
	    var directive = {
	        restrict: 'A',
	        scope: {},
	        bindToController: {
	            bcFlickityPrevious: '=?',
	            bcFlickityId: '@?'
	        },
	        compile: function compile() {
	            return {
	                pre: preLinkFunction
	            };
	        },
	        controller: _previous.PreviousController,
	        controllerAs: 'vm'
	    };
	
	    return directive;
	
	    /**
	     * Pre Link
	     */
	    function preLinkFunction($scope, $element, $attrs, $controller) {
	        'ngInject';
	
	        // Get the ID
	
	        var ID = $controller.flickityId;
	
	        // Define the broadcast names to listen for
	        var selectEvent = 'Flickity:' + ID + ':cellSelect';
	        var settleEvent = 'Flickity:' + ID + ':settle';
	
	        // Listen
	        var cellSelect = $rootScope.$on(selectEvent, function (event, data) {
	            _disableButtonIfNeeded(data.instance.selectedIndex);
	        });
	        var settle = $rootScope.$on(settleEvent, function (event, data) {
	            _disableButtonIfNeeded(data.instance.selectedIndex);
	        });
	
	        $element.on('click', function () {
	
	            // Move to the next cell
	            FlickityService.previous($controller.flickityId, $controller.wrapAround).then(function (instance) {
	                _disableButtonIfNeeded(instance.instance.selectedIndex);
	            });
	        });
	
	        /**
	         * Disable button if needed
	         *
	         * @param {number} index
	         */
	        function _disableButtonIfNeeded(index) {
	            // Disable button if at the beginning and we shouldn't wrap
	            if (!$controller.wrapAround && index === 0) {
	                $attrs.$set('disabled', 'disabled');
	            } else {
	                $attrs.$set('disabled', false);
	            }
	        }
	    }
	}

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var PreviousController = exports.PreviousController = function () {
	    PreviousController.$inject = ["$log", "$q", "$timeout", "FlickityConfig", "FlickityService"];
	    function PreviousController($log, $q, $timeout, FlickityConfig, FlickityService) {
	        'ngInject';
	
	        _classCallCheck(this, PreviousController);
	
	        this.$log = $log;
	        this.$q = $q;
	        this.$timeout = $timeout;
	        this.FlickityConfig = FlickityConfig;
	        this.FlickityService = FlickityService;
	
	        this._activate();
	    }
	
	    _createClass(PreviousController, [{
	        key: '_activate',
	        value: function _activate() {
	            // Assign wrap around or fall back to a default
	            if (typeof this.bcFlickityPrevious !== 'undefined') {
	                this.wrapAround = this.bcFlickityPrevious;
	            } else if (typeof this.FlickityConfig.wrapAround !== 'undefined') {
	                this.wrapAround = this.FlickityConfig.wrapAround;
	            } else {
	                this.wrapAround = false;
	            }
	            this.flickityId = null;
	
	            // Make sure we have an ID
	            this._setId();
	        }
	
	        /**
	         * Set ID to what is defined, fallback to first instance
	         *
	         * @return {String} flickityId
	         */
	
	    }, {
	        key: '_setId',
	        value: function _setId() {
	            var _this = this;
	
	            return new Promise(function (resolve, reject) {
	                _this.$timeout(function () {
	
	                    if (_this.bcFlickityId) {
	                        _this.flickityId = _this.bcFlickityId;
	                        return resolve(_this.flickityId);
	                    } else {
	                        _this.$timeout(function () {
	                            _this.FlickityService.getFirst().then(function (instance) {
	                                _this.flickityId = instance.id;
	                                return resolve(_this.flickityId);
	                            }).catch(function (error) {
	                                _this.$log.warn(error);
	                                return reject(error);
	                            });
	                        });
	                    }
	                });
	            });
	        }
	    }]);
	
	    return PreviousController;
	}();

/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA5MzczODEzYWNjZTcwNmViNjA3OCIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzP2IyOTUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZsaWNraXR5LnByb3ZpZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9mbGlja2l0eS5wcm92aWRlci5qcz9lNWRkIiwid2VicGFjazovLy8uL3NyYy9mbGlja2l0eS5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NyYy9mbGlja2l0eS5zZXJ2aWNlLmpzPzM3NGYiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZmxpY2tpdHlcIiIsIndlYnBhY2s6Ly8vLi9zcmMvZmxpY2tpdHkuZGlyZWN0aXZlLmpzIiwid2VicGFjazovLy8uL3NyYy9mbGlja2l0eS5kaXJlY3RpdmUuanM/YjI0OCIsIndlYnBhY2s6Ly8vLi9zcmMvbmV4dC9uZXh0LmRpcmVjdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbmV4dC9uZXh0LmRpcmVjdGl2ZS5qcz9jNmRiIiwid2VicGFjazovLy8uL3NyYy9uZXh0L25leHQuY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbmV4dC9uZXh0LmNvbnRyb2xsZXIuanM/YWVlYyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJldmlvdXMvcHJldmlvdXMuZGlyZWN0aXZlLmpzIiwid2VicGFjazovLy8uL3NyYy9wcmV2aW91cy9wcmV2aW91cy5kaXJlY3RpdmUuanM/MGMwNSIsIndlYnBhY2s6Ly8vLi9zcmMvcHJldmlvdXMvcHJldmlvdXMuY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJldmlvdXMvcHJldmlvdXMuY29udHJvbGxlci5qcz9jMGJmIl0sIm5hbWVzIjpbImFuZ3VsYXIiLCJtb2R1bGUiLCJwcm92aWRlciIsInNlcnZpY2UiLCJkaXJlY3RpdmUiLCJGbGlja2l0eUNvbmZpZ1Byb3ZpZGVyIiwiYWNjZXNzaWJpbGl0eSIsImNlbGxBbGlnbiIsImZyZWVTY3JvbGxGcmljdGlvbiIsImZyaWN0aW9uIiwicGVyY2VudFBvc2l0aW9uIiwicmVzaXplIiwic2VsZWN0ZWRBdHRyYWN0aW9uIiwic2V0R2FsbGVyeVNpemUiLCIkdGltZW91dCIsIiRxIiwiJHJvb3RTY29wZSIsIiRsb2ciLCJpbnN0YW5jZXMiLCJlbGVtZW50IiwiaWQiLCJvcHRpb25zIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJsZW5ndGgiLCJfZmluZE9iamVjdEJ5SWQiLCJpbmRleCIsIl9nZXRGbGlja2l0eUluZGV4IiwiZXJyb3IiLCJpbnN0YW5jZSIsInB1c2giLCJfYmluZEV2ZW50cyIsInRoZW4iLCJmbGlja2l0eUluZGV4IiwiZGVzdHJveSIsInNwbGljZSIsImlzV3JhcHBlZCIsImlzSW5zdGFudCIsIm5leHQiLCJwcmV2aW91cyIsInNlbGVjdCIsInZhbHVlIiwic2VsZWN0Q2VsbCIsInNlbGVjdGVkSW5kZXgiLCJyZXBvc2l0aW9uIiwicmVsb2FkQ2VsbHMiLCJkYXRhIiwiZWxlbWVudHMiLCJwcmVwZW5kIiwiYXBwZW5kIiwiaW5zZXJ0IiwiZ2V0Q2VsbEVsZW1lbnRzIiwicmVtb3ZlIiwic2VsZWN0ZWRFbGVtZW50IiwiY2VsbHMiLCJmb3VuZEluZGV4IiwiZm9yRWFjaCIsIklEIiwib24iLCIkZW1pdCIsInByb2dyZXNzIiwicG9zaXRpb25YIiwiZXZlbnQiLCJwb2ludGVyIiwibW92ZVZlY3RvciIsImNlbGxFbGVtZW50IiwiY2VsbEluZGV4Iiwic291cmNlIiwiZmlsdGVyIiwib2JqZWN0IiwiRmxpY2tpdHlEaXJlY3RpdmUiLCJGbGlja2l0eVNlcnZpY2UiLCJGbGlja2l0eUNvbmZpZyIsInJlc3RyaWN0Iiwic2NvcGUiLCJiaW5kVG9Db250cm9sbGVyIiwiYmNGbGlja2l0eSIsImJjRmxpY2tpdHlJZCIsImNvbXBpbGUiLCJwcmUiLCJwcmVMaW5rRnVuY3Rpb24iLCJwb3N0IiwicG9zdExpbmtGdW5jdGlvbiIsImNvbnRyb2xsZXIiLCJjb250cm9sbGVyQXMiLCIkc2NvcGUiLCIkZWxlbWVudCIsIiRhdHRycyIsIiRjb250cm9sbGVyIiwidXNlck9wdGlvbnMiLCJmcm9tSnNvbiIsImV4dGVuZCIsImNyZWF0ZSIsImZsaWNraXR5SW5zdGFuY2UiLCJGbGlja2l0eSIsIm9uRGVzdHJveSIsIiRvbiIsIkZsaWNraXR5TmV4dERpcmVjdGl2ZSIsImJjRmxpY2tpdHlOZXh0IiwiZmxpY2tpdHlJZCIsInNlbGVjdEV2ZW50Iiwic2V0dGxlRXZlbnQiLCJjZWxsU2VsZWN0IiwiX2Rpc2FibGVCdXR0b25JZk5lZWRlZCIsInNsaWRlcyIsInNldHRsZSIsIndyYXBBcm91bmQiLCJjZWxsQ291bnQiLCIkc2V0IiwiX2FjdGl2YXRlIiwiX3NldElkIiwiZ2V0Rmlyc3QiLCJjYXRjaCIsIndhcm4iLCJGbGlja2l0eVByZXZpb3VzRGlyZWN0aXZlIiwiYmNGbGlja2l0eVByZXZpb3VzIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN0Q0E7O0FDQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUFBLFNBQVFDLE9BQU8sZUFBZSxJQUN6QkMsU0FBUyxrQkFEZCxrQ0FFS0MsUUFBUSxtQkFGYiw0QkFHS0MsVUFBVSxjQUhmLDhCQUlLQSxVQUFVLGtCQUpmLDZCQUtLQSxVQUFVLHNCQUxmLHFDOzs7Ozs7QUNOQTs7QUFFQSxRQUFPLGVB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QUU5QztLQ1I5RCw0QkFDSTVGLE1BQU1GLElBQUlELFVBQ1YyRCxnQkFBZ0JELGlCQUNsQjtTQUNFOztTQURGOztTQUdFLEtBQUt2RCxPQUFPQTtTQUNaLEtBQUtGLEtBQUtBO1NBQ1YsS0FBS0QsV0FBV0E7U0FDaEIsS0FBSzJELGlCQUFpQkE7U0FDdEIsS0FBS0Qsa0JBQWtCQTs7U0FHdkIsS0FBS3NDOzs7S0RVVCxhQUFhLG9CQUFvQixDQUFDO1NBQzlCLEtBQUs7U0FDTCxPQUFPLFNBQVMsWUNMUjs7YUFFUixJQUFJLE9BQU8sS0FBS00sdUJBQXVCLGFBQWE7aUJBQ2hELEtBQUtULGFBQWEsS0FBS1M7b0JBQ3BCLElBQUksT0FBTyxLQUFLM0MsZUFBZWtDLGVBQWUsYUFBYTtpQkFDOUQsS0FBS0EsYUFBYSxLQUFLbEMsZUFBZWtDO29CQUNuQztpQkFDSCxLQUFLQSxhQUFhOzthQUV0QixLQUFLUCxhQUFhOzs7YUFHbEIsS0FBS1c7Ozs7Ozs7OztRRGNOO1NBQ0MsS0FBSztTQUNMLE9BQU8sU0FBUyxTQ1BYO2FBQUE7O2FBQ0wsT0FBTyxJQUFJekYsUUFBUSxVQUFDQyxTQUFTQyxRQUFXO2lCQUNwQyxNQUFLVixTQUFTLFlBQU07O3FCQUVoQixJQUFJLE1BQUtnRSxjQUFjO3lCQUNuQixNQUFLc0IsYUFBYSxNQUFLdEI7eUJBQ3ZCLE9BQU92RCxRQUFRLE1BQUs2RTs0QkFDakI7eUJBQ0gsTUFBS3RGLFNBQVMsWUFBTTs2QkFDaEIsTUFBSzBELGdCQUFnQndDLFdBQ2hCL0UsS0FBSyxVQUFDSCxVQUFhO2lDQUNoQixNQUFLc0UsYUFBYXRFLFNBQVNWO2lDQUMzQixPQUFPRyxRQUFRLE1BQUs2RTtnQ0FFdkJhLE1BQU0sVUFBQ3BGLE9BQVU7aUNBQ2QsTUFBS1osS0FBS2lHLEtBQUtyRjtpQ0FDZixPQUFPTCxPQUFPSzs7Ozs7Ozs7O0tEZ0IxQyxPQUFPIiwiZmlsZSI6ImFuZ3VsYXItZmxpY2tpdHkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJmbGlja2l0eVwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcImFuZ3VsYXItZmxpY2tpdHlcIiwgW1wiZmxpY2tpdHlcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiYW5ndWxhci1mbGlja2l0eVwiXSA9IGZhY3RvcnkocmVxdWlyZShcImZsaWNraXR5XCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJhbmd1bGFyLWZsaWNraXR5XCJdID0gZmFjdG9yeShyb290W1wiZmxpY2tpdHlcIl0pO1xufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8zX18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDkzNzM4MTNhY2NlNzA2ZWI2MDc4XG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2ZsaWNraXR5ID0gcmVxdWlyZSgnLi9mbGlja2l0eS5wcm92aWRlcicpO1xuXG52YXIgX2ZsaWNraXR5MiA9IHJlcXVpcmUoJy4vZmxpY2tpdHkuc2VydmljZScpO1xuXG52YXIgX2ZsaWNraXR5MyA9IHJlcXVpcmUoJy4vZmxpY2tpdHkuZGlyZWN0aXZlJyk7XG5cbnZhciBfbmV4dCA9IHJlcXVpcmUoJy4vbmV4dC9uZXh0LmRpcmVjdGl2ZScpO1xuXG52YXIgX3ByZXZpb3VzID0gcmVxdWlyZSgnLi9wcmV2aW91cy9wcmV2aW91cy5kaXJlY3RpdmUnKTtcblxuYW5ndWxhci5tb2R1bGUoJ2JjLkZsaWNraXR5JywgW10pLnByb3ZpZGVyKCdGbGlja2l0eUNvbmZpZycsIF9mbGlja2l0eS5GbGlja2l0eUNvbmZpZ1Byb3ZpZGVyKS5zZXJ2aWNlKCdGbGlja2l0eVNlcnZpY2UnLCBfZmxpY2tpdHkyLkZsaWNraXR5U2VydmljZSkuZGlyZWN0aXZlKCdiY0ZsaWNraXR5JywgX2ZsaWNraXR5My5GbGlja2l0eURpcmVjdGl2ZSkuZGlyZWN0aXZlKCdiY0ZsaWNraXR5TmV4dCcsIF9uZXh0LkZsaWNraXR5TmV4dERpcmVjdGl2ZSkuZGlyZWN0aXZlKCdiY0ZsaWNraXR5UHJldmlvdXMnLCBfcHJldmlvdXMuRmxpY2tpdHlQcmV2aW91c0RpcmVjdGl2ZSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW5kZXguanNcbiAqKi8iLCJpbXBvcnQgeyBGbGlja2l0eUNvbmZpZ1Byb3ZpZGVyIH0gZnJvbSAnLi9mbGlja2l0eS5wcm92aWRlcidcclxuaW1wb3J0IHsgRmxpY2tpdHlTZXJ2aWNlIH0gZnJvbSAnLi9mbGlja2l0eS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRmxpY2tpdHlEaXJlY3RpdmUgfSBmcm9tICcuL2ZsaWNraXR5LmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IEZsaWNraXR5TmV4dERpcmVjdGl2ZSB9IGZyb20gJy4vbmV4dC9uZXh0LmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IEZsaWNraXR5UHJldmlvdXNEaXJlY3RpdmUgfSBmcm9tICcuL3ByZXZpb3VzL3ByZXZpb3VzLmRpcmVjdGl2ZSc7XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnYmMuRmxpY2tpdHknLCBbXSlcclxuICAgIC5wcm92aWRlcignRmxpY2tpdHlDb25maWcnLCBGbGlja2l0eUNvbmZpZ1Byb3ZpZGVyKVxyXG4gICAgLnNlcnZpY2UoJ0ZsaWNraXR5U2VydmljZScsIEZsaWNraXR5U2VydmljZSlcclxuICAgIC5kaXJlY3RpdmUoJ2JjRmxpY2tpdHknLCBGbGlja2l0eURpcmVjdGl2ZSlcclxuICAgIC5kaXJlY3RpdmUoJ2JjRmxpY2tpdHlOZXh0JywgRmxpY2tpdHlOZXh0RGlyZWN0aXZlKVxyXG4gICAgLmRpcmVjdGl2ZSgnYmNGbGlja2l0eVByZXZpb3VzJywgRmxpY2tpdHlQcmV2aW91c0RpcmVjdGl2ZSlcclxuO1xyXG5cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogQzovQXBhY2hlMjQvaHRkb2NzL2FuZ3VsYXItZmxpY2tpdHkvfi9lc2xpbnQtbG9hZGVyIS4vc3JjL2luZGV4LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBGbGlja2l0eUNvbmZpZ1Byb3ZpZGVyID0gZXhwb3J0cy5GbGlja2l0eUNvbmZpZ1Byb3ZpZGVyID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEZsaWNraXR5Q29uZmlnUHJvdmlkZXIoKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBGbGlja2l0eUNvbmZpZ1Byb3ZpZGVyKTtcblxuICAgICAgICAvLyBEZWZpbmUgRmxpY2tpdHkgZGVmYXVsdHNcbiAgICAgICAgdGhpcy5hY2Nlc3NpYmlsaXR5ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jZWxsQWxpZ24gPSAnY2VudGVyJztcbiAgICAgICAgdGhpcy5mcmVlU2Nyb2xsRnJpY3Rpb24gPSAuMDc1O1xuICAgICAgICB0aGlzLmZyaWN0aW9uID0gLjI4O1xuICAgICAgICB0aGlzLnBlcmNlbnRQb3NpdGlvbiA9IHRydWU7XG4gICAgICAgIHRoaXMucmVzaXplID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZEF0dHJhY3Rpb24gPSAuMDI1O1xuICAgICAgICB0aGlzLnNldEdhbGxlcnlTaXplID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3MoRmxpY2tpdHlDb25maWdQcm92aWRlciwgW3tcbiAgICAgICAga2V5OiAnJGdldCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiAkZ2V0KCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gRmxpY2tpdHlDb25maWdQcm92aWRlcjtcbn0oKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9mbGlja2l0eS5wcm92aWRlci5qc1xuICoqLyIsImV4cG9ydCBjbGFzcyBGbGlja2l0eUNvbmZpZ1Byb3ZpZGVyIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAvLyBEZWZpbmUgRmxpY2tpdHkgZGVmYXVsdHNcclxuICAgICAgICB0aGlzLmFjY2Vzc2liaWxpdHkgICAgICA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5jZWxsQWxpZ24gICAgICAgICAgPSAnY2VudGVyJztcclxuICAgICAgICB0aGlzLmZyZWVTY3JvbGxGcmljdGlvbiA9IC4wNzU7XHJcbiAgICAgICAgdGhpcy5mcmljdGlvbiAgICAgICAgICAgPSAuMjg7XHJcbiAgICAgICAgdGhpcy5wZXJjZW50UG9zaXRpb24gICAgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMucmVzaXplICAgICAgICAgICAgID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkQXR0cmFjdGlvbiA9IC4wMjU7XHJcbiAgICAgICAgdGhpcy5zZXRHYWxsZXJ5U2l6ZSAgICAgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgICRnZXQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG5cclxufVxyXG5cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogQzovQXBhY2hlMjQvaHRkb2NzL2FuZ3VsYXItZmxpY2tpdHkvfi9lc2xpbnQtbG9hZGVyIS4vc3JjL2ZsaWNraXR5LnByb3ZpZGVyLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLkZsaWNraXR5U2VydmljZSA9IHVuZGVmaW5lZDtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF9mbGlja2l0eSA9IHJlcXVpcmUoJ2ZsaWNraXR5Jyk7XG5cbnZhciBfZmxpY2tpdHkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZmxpY2tpdHkpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgRmxpY2tpdHlTZXJ2aWNlID0gZXhwb3J0cy5GbGlja2l0eVNlcnZpY2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRmxpY2tpdHlTZXJ2aWNlKCR0aW1lb3V0LCAkcSwgJHJvb3RTY29wZSwgJGxvZykge1xuICAgICAgICAnbmdJbmplY3QnO1xuXG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBGbGlja2l0eVNlcnZpY2UpO1xuXG4gICAgICAgIHRoaXMuJHRpbWVvdXQgPSAkdGltZW91dDtcbiAgICAgICAgdGhpcy4kcSA9ICRxO1xuICAgICAgICB0aGlzLiRyb290U2NvcGUgPSAkcm9vdFNjb3BlO1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuXG4gICAgICAgIHRoaXMuaW5zdGFuY2VzID0gW107XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgYSBuZXcgRmxpY2tpdHkgaW5zdGFuY2VcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcclxuICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcclxuICAgICAqL1xuXG5cbiAgICBfY3JlYXRlQ2xhc3MoRmxpY2tpdHlTZXJ2aWNlLCBbe1xuICAgICAgICBrZXk6ICdjcmVhdGUnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gY3JlYXRlKGVsZW1lbnQsIGlkLCBvcHRpb25zKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIC8vIElmIG5vIElEIHdhcyBwYXNzZWQgaW5cbiAgICAgICAgICAgICAgICBpZiAoIWlkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LmlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBVc2UgdGhlIGVsZW1lbnQncyBJRCBpZiBpdCBleGlzdHNcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkID0gZWxlbWVudC5pZDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE90aGVyd2lzZSwgYXNzaWduIGEgbmV3IElEXG4gICAgICAgICAgICAgICAgICAgICAgICBpZCA9IF90aGlzLmluc3RhbmNlcy5sZW5ndGggKyAxO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgdG8gc2VlIGlmIHRoZSBJRCBpcyBhbHJlYWR5IGluIHVzZVxuICAgICAgICAgICAgICAgIGlmIChfdGhpcy5fZmluZE9iamVjdEJ5SWQoX3RoaXMuaW5zdGFuY2VzLCBpZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gX3RoaXMuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy4kbG9nLmVycm9yKCdUaGlzIElEIGlzIGFscmVhZHkgaW4gdXNlOiAnLCBfdGhpcy5pbnN0YW5jZXNbaW5kZXhdKTtcblxuICAgICAgICAgICAgICAgICAgICByZWplY3QoJ1RoaXMgSUQgaXMgYWxyZWFkeSBpbiB1c2UuJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gRGVmaW5lIHRoZSBuZXcgaW5zdGFuY2VcbiAgICAgICAgICAgICAgICB2YXIgaW5zdGFuY2UgPSB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBpZCxcbiAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2U6IG5ldyBfZmxpY2tpdHkyLmRlZmF1bHQoZWxlbWVudCwgb3B0aW9ucylcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgLy8gU2F2ZSB0aGlzIGluc3RhbmNlIHRvIHRoZSBhcnJheVxuICAgICAgICAgICAgICAgIF90aGlzLmluc3RhbmNlcy5wdXNoKGluc3RhbmNlKTtcblxuICAgICAgICAgICAgICAgIC8vIEJpbmQgdG8gYWxsIGV2ZW50c1xuICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy5fYmluZEV2ZW50cyhpZCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKGluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRGVzdHJveSBhIEZsaWNraXR5IGluc3RhbmNlXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcclxuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXHJcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2Rlc3Ryb3knLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZGVzdHJveShpZCkge1xuICAgICAgICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGZsaWNraXR5SW5kZXggPSBfdGhpczIuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoJ0luc3RhbmNlICcgKyBpZCArICcgbm90IGZvdW5kLicpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIERlc3Ryb3kgdGhlIEZsaWNraXR5IGluc3RhbmNlXG4gICAgICAgICAgICAgICAgX3RoaXMyLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5kZXN0cm95KCk7XG5cbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgdGhlIGluc3RhbmNlIGZyb20gdGhlIGFycmF5XG4gICAgICAgICAgICAgICAgX3RoaXMyLmluc3RhbmNlcy5zcGxpY2UoZmxpY2tpdHlJbmRleCwgMSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgnSW5zdGFuY2UgJyArIGlkICsgJyBkZXN0cm95ZWQuJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJldHVybiBhbGwgaW5zdGFuY2VzXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcmV0dXJuIHtBcnJheX0gaW5zdGFuY2VzXHJcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2dldEFsbCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRBbGwoKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShfdGhpczMuaW5zdGFuY2VzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTW92ZSB0byB0aGUgbmV4dCBzbGlkZVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcbiAgICAgICAgICogQHBhcmFtIHtCb29sfSBpc1dyYXBwZWRcclxuICAgICAgICAgKiBAcGFyYW0ge0Jvb2x9IGlzSW5zdGFudFxyXG4gICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcclxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnbmV4dCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBuZXh0KGlkLCBpc1dyYXBwZWQsIGlzSW5zdGFudCkge1xuICAgICAgICAgICAgdmFyIF90aGlzNCA9IHRoaXM7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGZsaWNraXR5SW5kZXggPSBfdGhpczQuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoJ0luc3RhbmNlICcgKyBpZCArICcgbm90IGZvdW5kLicpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIE1vdmUgdG8gdGhlIG5leHQgc2xpZGVcbiAgICAgICAgICAgICAgICAgICAgX3RoaXM0Lmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5uZXh0KGlzV3JhcHBlZCwgaXNJbnN0YW50KTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKF90aGlzNC5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTW92ZSB0byB0aGUgcHJldmlvdXMgc2xpZGVcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAgICAgICAqIEBwYXJhbSB7Qm9vbH0gaXNXcmFwcGVkXHJcbiAgICAgICAgICogQHBhcmFtIHtCb29sfSBpc0luc3RhbnRcclxuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXHJcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3ByZXZpb3VzJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHByZXZpb3VzKGlkLCBpc1dyYXBwZWQsIGlzSW5zdGFudCkge1xuICAgICAgICAgICAgdmFyIF90aGlzNSA9IHRoaXM7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGZsaWNraXR5SW5kZXggPSBfdGhpczUuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoJ0luc3RhbmNlICcgKyBpZCArICcgbm90IGZvdW5kLicpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIE1vdmUgdG8gdGhlIHByZXZpb3VzIHNsaWRlXG4gICAgICAgICAgICAgICAgICAgIF90aGlzNS5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2UucHJldmlvdXMoaXNXcmFwcGVkLCBpc0luc3RhbnQpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgaW5zdGFuY2VcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoX3RoaXM1Lmluc3RhbmNlc1tmbGlja2l0eUluZGV4XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTZWxlY3QgYSBzbGlkZVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXHJcbiAgICAgICAgICogQHBhcmFtIHtJbnRlZ2VyfSBpbmRleFxyXG4gICAgICAgICAqIEBwYXJhbSB7Qm9vbH0gaXNXcmFwcGVkXHJcbiAgICAgICAgICogQHBhcmFtIHtCb29sfSBpc0luc3RhbnRcclxuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXHJcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3NlbGVjdCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBzZWxlY3QoaWQsIGluZGV4KSB7XG4gICAgICAgICAgICB2YXIgX3RoaXM2ID0gdGhpcztcblxuICAgICAgICAgICAgdmFyIGlzV3JhcHBlZCA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogZmFsc2U7XG4gICAgICAgICAgICB2YXIgaXNJbnN0YW50ID0gYXJndW1lbnRzLmxlbmd0aCA+IDMgJiYgYXJndW1lbnRzWzNdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbM10gOiBmYWxzZTtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmxpY2tpdHlJbmRleCA9IF90aGlzNi5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgnSW5zdGFuY2UgJyArIGlkICsgJyBub3QgZm91bmQuJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gTW92ZSB0byB0aGUgc2VsZWN0ZWQgc2xpZGVcbiAgICAgICAgICAgICAgICAgICAgX3RoaXM2Lmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5zZWxlY3QoaW5kZXgsIGlzV3JhcHBlZCwgaXNJbnN0YW50KTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKF90aGlzNi5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU2VsZWN0IGEgc2xpZGUgb2YgYSBjZWxsXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcclxuICAgICAgICAgKiBAcGFyYW0ge0ludGVnZXJ8U3RyaW5nfSB2YWx1ZVxyXG4gICAgICAgICAqIEBwYXJhbSB7Qm9vbH0gaXNXcmFwcGVkXHJcbiAgICAgICAgICogQHBhcmFtIHtCb29sfSBpc0luc3RhbnRcclxuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXHJcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3NlbGVjdENlbGwnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gc2VsZWN0Q2VsbChpZCwgdmFsdWUpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczcgPSB0aGlzO1xuXG4gICAgICAgICAgICB2YXIgaXNXcmFwcGVkID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiBmYWxzZTtcbiAgICAgICAgICAgIHZhciBpc0luc3RhbnQgPSBhcmd1bWVudHMubGVuZ3RoID4gMyAmJiBhcmd1bWVudHNbM10gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1szXSA6IGZhbHNlO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIHZhciBmbGlja2l0eUluZGV4ID0gX3RoaXM3Ll9nZXRGbGlja2l0eUluZGV4KGlkKTtcblxuICAgICAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdJbnN0YW5jZSAnICsgaWQgKyAnIG5vdCBmb3VuZC4nKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBNb3ZlIHRvIHRoZSBzZWxlY3RlZCBzbGlkZVxuICAgICAgICAgICAgICAgICAgICBfdGhpczcuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLnNlbGVjdENlbGwodmFsdWUsIGlzV3JhcHBlZCwgaXNJbnN0YW50KTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKF90aGlzNy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR2V0IHRoZSBjdXJyZW50IHNsaWRlIGluZGV4XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcclxuICAgICAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfSBzZWxlY3RlZEluZGV4XHJcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3NlbGVjdGVkSW5kZXgnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gc2VsZWN0ZWRJbmRleChpZCkge1xuICAgICAgICAgICAgdmFyIF90aGlzOCA9IHRoaXM7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGZsaWNraXR5SW5kZXggPSBfdGhpczguX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoJ0luc3RhbmNlICcgKyBpZCArICcgbm90IGZvdW5kLicpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgY3VycmVudCBpbmRleFxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShfdGhpczguaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLnNlbGVjdGVkSW5kZXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmVzaXplIHRoZSBnYWxsZXJ5IGFuZCByZS1wb3NpdGlvbiBjZWxscy5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxyXG4gICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcclxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAncmVzaXplJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlc2l6ZShpZCkge1xuICAgICAgICAgICAgdmFyIF90aGlzOSA9IHRoaXM7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGZsaWNraXR5SW5kZXggPSBfdGhpczkuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoJ0luc3RhbmNlICcgKyBpZCArICcgbm90IGZvdW5kLicpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRyaWdnZXIgdGhlIHJlc2l6ZVxuICAgICAgICAgICAgICAgICAgICBfdGhpczkuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLnJlc2l6ZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgaW5zdGFuY2VcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoX3RoaXM5Lmluc3RhbmNlc1tmbGlja2l0eUluZGV4XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQb3NpdGlvbiBjZWxscyBhdCBzZWxlY3RlZCBwb3NpdGlvbi5cclxuICAgICAgICAgKiBUcmlnZ2VyIHJlcG9zaXRpb24gYWZ0ZXIgdGhlIHNpemUgb2YgYSBjZWxsIGhhcyBiZWVuIGNoYW5nZWQuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcclxuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXHJcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3JlcG9zaXRpb24nLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVwb3NpdGlvbihpZCkge1xuICAgICAgICAgICAgdmFyIF90aGlzMTAgPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIHZhciBmbGlja2l0eUluZGV4ID0gX3RoaXMxMC5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgnSW5zdGFuY2UgJyArIGlkICsgJyBub3QgZm91bmQuJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlciB0aGUgcmVwb3NpdGlvblxuICAgICAgICAgICAgICAgICAgICBfdGhpczEwLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5yZXBvc2l0aW9uKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShfdGhpczEwLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZS1jb2xsZWN0IGFsbCBjZWxsIGVsZW1lbnRzIGluIGBmbGlja2l0eS1zbGlkZXJgLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXHJcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxyXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdyZWxvYWRDZWxscycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZWxvYWRDZWxscyhpZCkge1xuICAgICAgICAgICAgdmFyIF90aGlzMTEgPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIHZhciBmbGlja2l0eUluZGV4ID0gX3RoaXMxMS5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgnSW5zdGFuY2UgJyArIGlkICsgJyBub3QgZm91bmQuJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gUmVsb2FkIGNlbGxzXG4gICAgICAgICAgICAgICAgICAgIF90aGlzMTEuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLnJlbG9hZENlbGxzKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShfdGhpczExLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHZXQgYSBGbGlja2l0eSBpbnN0YW5jZSBieSBJRFxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXHJcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxyXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdnZXQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0KGlkKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMxMiA9IHRoaXM7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGZsaWNraXR5SW5kZXggPSBfdGhpczEyLl9nZXRGbGlja2l0eUluZGV4KGlkKTtcblxuICAgICAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdJbnN0YW5jZSAnICsgaWQgKyAnIG5vdCBmb3VuZC4nKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKF90aGlzMTIuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdldCB0aGUgZmlyc3QgRmxpY2tpdHkgaW5zdGFuY2VcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcclxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZ2V0Rmlyc3QnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0Rmlyc3QoKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMxMyA9IHRoaXM7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFfdGhpczEzLmluc3RhbmNlcyB8fCBfdGhpczEzLmluc3RhbmNlcy5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoJ05vIGluc3RhbmNlcyBleGlzdC4nKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKF90aGlzMTMuaW5zdGFuY2VzWzBdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdldCB0aGUgRmxpY2tpdHkgaW5zdGFuY2VcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudFxyXG4gICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcclxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZ2V0QnlFbGVtZW50JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdldEJ5RWxlbWVudChlbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIHZhciBpbnN0YW5jZSA9IF9mbGlja2l0eTIuZGVmYXVsdC5kYXRhKGVsZW1lbnQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGluc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgaW5zdGFuY2VcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoaW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoJ0luc3RhbmNlIG5vdCBmb3VuZCBmb3IgJyArIGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUHJlcGVuZCBlbGVtZW50cyBhbmQgY3JlYXRlIGNlbGxzIHRvIHRoZSBiZWdpbm5pbmcgb2YgdGhlIGdhbGxlcnkuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcclxuICAgICAgICAgKiBAcGFyYW0geyp9IGVsZW1lbnQocykgLSBqUXVlcnkgb2JqZWN0LCBBcnJheSBvZiBFbGVtZW50cywgRWxlbWVudCwgb3IgTm9kZUxpc3RcclxuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXHJcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3ByZXBlbmQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcHJlcGVuZChpZCwgZWxlbWVudHMpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczE0ID0gdGhpcztcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmxpY2tpdHlJbmRleCA9IF90aGlzMTQuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoJ0luc3RhbmNlICcgKyBpZCArICcgbm90IGZvdW5kLicpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFByZXBlbmQgdGhlIHNsaWRlc1xuICAgICAgICAgICAgICAgICAgICBfdGhpczE0Lmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5wcmVwZW5kKGVsZW1lbnRzKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKF90aGlzMTQuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEFwcGVuZCBlbGVtZW50cyBhbmQgY3JlYXRlIGNlbGxzIHRvIHRoZSBlbmQgb2YgdGhlIGdhbGxlcnkuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcclxuICAgICAgICAgKiBAcGFyYW0geyp9IGVsZW1lbnQocykgLSBqUXVlcnkgb2JqZWN0LCBBcnJheSBvZiBFbGVtZW50cywgRWxlbWVudCwgb3IgTm9kZUxpc3RcclxuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXHJcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2FwcGVuZCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBhcHBlbmQoaWQsIGVsZW1lbnRzKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMxNSA9IHRoaXM7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGZsaWNraXR5SW5kZXggPSBfdGhpczE1Ll9nZXRGbGlja2l0eUluZGV4KGlkKTtcblxuICAgICAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdJbnN0YW5jZSAnICsgaWQgKyAnIG5vdCBmb3VuZC4nKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBBcHBlbmQgdGhlIHNsaWRlc1xuICAgICAgICAgICAgICAgICAgICBfdGhpczE1Lmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5hcHBlbmQoZWxlbWVudHMpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgaW5zdGFuY2VcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoX3RoaXMxNS5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSW5zZXJ0IGVsZW1lbnRzIGludG8gdGhlIGdhbGxlcnkgYW5kIGNyZWF0ZSBjZWxscyBhdCB0aGUgZGVzaXJlZCBpbmRleC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxyXG4gICAgICAgICAqIEBwYXJhbSB7Kn0gZWxlbWVudChzKSAtIGpRdWVyeSBvYmplY3QsIEFycmF5IG9mIEVsZW1lbnRzLCBFbGVtZW50LCBvciBOb2RlTGlzdFxyXG4gICAgICAgICAqIEBwYXJhbSB7SW50ZWdlcn0gaW5kZXggLSBaZXJvIGJhc2VkIGluZGV4XHJcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxyXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdpbnNlcnQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gaW5zZXJ0KGlkLCBlbGVtZW50cywgaW5kZXgpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczE2ID0gdGhpcztcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmxpY2tpdHlJbmRleCA9IF90aGlzMTYuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoJ0luc3RhbmNlICcgKyBpZCArICcgbm90IGZvdW5kLicpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEluc2VydCB0aGUgc2xpZGVzXG4gICAgICAgICAgICAgICAgICAgIF90aGlzMTYuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLmluc2VydChlbGVtZW50cywgaW5kZXgpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgaW5zdGFuY2VcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoX3RoaXMxNi5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR2V0IHRoZSBlbGVtZW50cyBvZiB0aGUgY2VsbHNcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxyXG4gICAgICAgICAqIEByZXR1cm4ge0FycmF5fSBjZWxsRWxlbWVudHNcclxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZ2V0Q2VsbEVsZW1lbnRzJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdldENlbGxFbGVtZW50cyhpZCkge1xuICAgICAgICAgICAgdmFyIF90aGlzMTcgPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIHZhciBmbGlja2l0eUluZGV4ID0gX3RoaXMxNy5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgnSW5zdGFuY2UgJyArIGlkICsgJyBub3QgZm91bmQuJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBhcnJheSBvZiBjZWxsIGVsZW1lbnRzXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKF90aGlzMTcuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLmdldENlbGxFbGVtZW50cygpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJlbW92ZSBjZWxscyBieSBlbGVtZW50XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdHxBcnJheXxFbGVtZW50fSBlbGVtZW50KHMpXHJcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxyXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdyZW1vdmUnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVtb3ZlKGlkLCBlbGVtZW50cykge1xuICAgICAgICAgICAgdmFyIF90aGlzMTggPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIHZhciBmbGlja2l0eUluZGV4ID0gX3RoaXMxOC5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgnSW5zdGFuY2UgJyArIGlkICsgJyBub3QgZm91bmQuJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMxOC5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2UucmVtb3ZlKGVsZW1lbnRzKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKF90aGlzMTguaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdldCB0aGUgY3VycmVudGx5IHNlbGVjdGVkIGNlbGwgZWxlbWVudFxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXHJcbiAgICAgICAgICogQHJldHVybiB7RWxlbWVudH0gc2VsZWN0ZWRDZWxsRWxlbWVudFxyXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdzZWxlY3RlZEVsZW1lbnQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gc2VsZWN0ZWRFbGVtZW50KGlkKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMxOSA9IHRoaXM7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGZsaWNraXR5SW5kZXggPSBfdGhpczE5Ll9nZXRGbGlja2l0eUluZGV4KGlkKTtcblxuICAgICAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdJbnN0YW5jZSAnICsgaWQgKyAnIG5vdCBmb3VuZC4nKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIHNlbGVjdGVkIGVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoX3RoaXMxOS5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uuc2VsZWN0ZWRFbGVtZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdldCBhbiBhcnJheSBvZiBhbGwgY2VsbHNcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxyXG4gICAgICAgICAqIEByZXR1cm4ge0FycmF5fSBjZWxsc1xyXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdjZWxscycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBjZWxscyhpZCkge1xuICAgICAgICAgICAgdmFyIF90aGlzMjAgPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIHZhciBmbGlja2l0eUluZGV4ID0gX3RoaXMyMC5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgnSW5zdGFuY2UgJyArIGlkICsgJyBub3QgZm91bmQuJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBhcnJheSBvZiBjZWxsc1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShfdGhpczIwLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5jZWxscyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvL1xuICAgICAgICAvLyBIZWxwZXIgbWV0aG9kc1xuICAgICAgICAvL1xuXG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRmluZCB0aGUgaW5kZXggZm9yIGEgRmxpY2tpdHkgaW5zdGFuY2VcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxyXG4gICAgICAgICAqIEByZXR1cm4ge0ludGVnZXJ9IGZsaWNraXR5SW5kZXhcclxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnX2dldEZsaWNraXR5SW5kZXgnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX2dldEZsaWNraXR5SW5kZXgoaWQpIHtcbiAgICAgICAgICAgIHZhciBmb3VuZEluZGV4ID0gLTE7XG5cbiAgICAgICAgICAgIC8vIFZlcmlmeSBhdCBsZWFzdCBvbmUgaW5zdGFuY2UgZXhpc3RzXG4gICAgICAgICAgICBpZiAodGhpcy5pbnN0YW5jZXMubGVuZ3RoID4gMCkge1xuXG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgdGhlIElEIG9mIGVhY2ggaW5zdGFuY2VcbiAgICAgICAgICAgICAgICB0aGlzLmluc3RhbmNlcy5mb3JFYWNoKGZ1bmN0aW9uIChpbnN0YW5jZSwgaW5kZXgpIHtcblxuICAgICAgICAgICAgICAgICAgICAvLyBJZiBpdCBtYXRjaGVzIG91ciBJRCwgc2V0IHRoZSBpbmRleFxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5zdGFuY2UuaWQgPT09IGlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3VuZEluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGZvdW5kSW5kZXg7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBCaW5kIGFsbCBldmVudHMgZm9yIGEgbmV3IGluc3RhbmNlXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcclxuICAgICAgICAgKiBAcmV0dXJuIHtCb29sfSBpc0ZpbmlzaGVkXHJcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ19iaW5kRXZlbnRzJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIF9iaW5kRXZlbnRzKGlkKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMyMSA9IHRoaXM7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGZsaWNraXR5SW5kZXggPSBfdGhpczIxLl9nZXRGbGlja2l0eUluZGV4KGlkKTtcblxuICAgICAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIElEID0gX3RoaXMyMS5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaWQ7XG5cbiAgICAgICAgICAgICAgICBfdGhpczIxLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5vbignc2VsZWN0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpczIxLiRyb290U2NvcGUuJGVtaXQoJ0ZsaWNraXR5OicgKyBJRCArICc6c2VsZWN0JywgX3RoaXMyMS5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgX3RoaXMyMS5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uub24oJ3NldHRsZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMyMS4kcm9vdFNjb3BlLiRlbWl0KCdGbGlja2l0eTonICsgSUQgKyAnOnNldHRsZScsIF90aGlzMjEuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIF90aGlzMjEuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLm9uKCdzY3JvbGwnLCBmdW5jdGlvbiAocHJvZ3Jlc3MsIHBvc2l0aW9uWCkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpczIxLiRyb290U2NvcGUuJGVtaXQoJ0ZsaWNraXR5OicgKyBJRCArICc6c2Nyb2xsJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3M6IHByb2dyZXNzLFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25YOiBwb3NpdGlvblhcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBfdGhpczIxLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5vbignZHJhZ1N0YXJ0JywgZnVuY3Rpb24gKGV2ZW50LCBwb2ludGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzMjEuJHJvb3RTY29wZS4kZW1pdCgnRmxpY2tpdHk6JyArIElEICsgJzpkcmFnU3RhcnQnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2ludGVyOiBwb2ludGVyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgX3RoaXMyMS5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uub24oJ2RyYWdNb3ZlJywgZnVuY3Rpb24gKGV2ZW50LCBwb2ludGVyLCBtb3ZlVmVjdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzMjEuJHJvb3RTY29wZS4kZW1pdCgnRmxpY2tpdHk6JyArIElEICsgJzpkcmFnTW92ZScsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50ZXI6IHBvaW50ZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtb3ZlVmVjdG9yOiBtb3ZlVmVjdG9yXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgX3RoaXMyMS5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uub24oJ2RyYWdFbmQnLCBmdW5jdGlvbiAoZXZlbnQsIHBvaW50ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMyMS4kcm9vdFNjb3BlLiRlbWl0KCdGbGlja2l0eTonICsgSUQgKyAnOmRyYWdFbmQnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2ludGVyOiBwb2ludGVyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgX3RoaXMyMS5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uub24oJ3BvaW50ZXJEb3duJywgZnVuY3Rpb24gKGV2ZW50LCBwb2ludGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzMjEuJHJvb3RTY29wZS4kZW1pdCgnRmxpY2tpdHk6JyArIElEICsgJzpwb2ludGVyRG93bicsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50ZXI6IHBvaW50ZXJcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBfdGhpczIxLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5vbigncG9pbnRlck1vdmUnLCBmdW5jdGlvbiAoZXZlbnQsIHBvaW50ZXIsIG1vdmVWZWN0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMyMS4kcm9vdFNjb3BlLiRlbWl0KCdGbGlja2l0eTonICsgSUQgKyAnOnBvaW50ZXJNb3ZlJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRlcjogcG9pbnRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdmVWZWN0b3I6IG1vdmVWZWN0b3JcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBfdGhpczIxLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5vbigncG9pbnRlclVwJywgZnVuY3Rpb24gKGV2ZW50LCBwb2ludGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzMjEuJHJvb3RTY29wZS4kZW1pdCgnRmxpY2tpdHk6JyArIElEICsgJzpwb2ludGVyVXAnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2ludGVyOiBwb2ludGVyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgX3RoaXMyMS5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uub24oJ3N0YXRpY0NsaWNrJywgZnVuY3Rpb24gKGV2ZW50LCBwb2ludGVyLCBjZWxsRWxlbWVudCwgY2VsbEluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzMjEuJHJvb3RTY29wZS4kZW1pdCgnRmxpY2tpdHk6JyArIElEICsgJzpzdGF0aWNDbGljaycsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50ZXI6IHBvaW50ZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsRWxlbWVudDogY2VsbEVsZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsSW5kZXg6IGNlbGxJbmRleFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIF90aGlzMjEuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLm9uKCdsYXp5TG9hZCcsIGZ1bmN0aW9uIChldmVudCwgY2VsbEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMyMS4kcm9vdFNjb3BlLiRlbWl0KCdGbGlja2l0eTonICsgSUQgKyAnOmxhenlMb2FkJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbEVsZW1lbnQ6IGNlbGxFbGVtZW50XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEZpbmQgYW4gb2JqZWN0IHdpdGhpbiBhbiBhcnJheSBieSBJRFxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0gc291cmNlXHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXHJcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBtYXRjaFxyXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdfZmluZE9iamVjdEJ5SWQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX2ZpbmRPYmplY3RCeUlkKHNvdXJjZSwgaWQpIHtcbiAgICAgICAgICAgIHJldHVybiBzb3VyY2UuZmlsdGVyKGZ1bmN0aW9uIChvYmplY3QpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqZWN0LmlkID09PSBpZDtcbiAgICAgICAgICAgIH0pWzBdO1xuICAgICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIEZsaWNraXR5U2VydmljZTtcbn0oKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9mbGlja2l0eS5zZXJ2aWNlLmpzXG4gKiovIiwiaW1wb3J0IGZsaWNraXR5IGZyb20gJ2ZsaWNraXR5JztcclxuXHJcbmV4cG9ydCBjbGFzcyBGbGlja2l0eVNlcnZpY2Uge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgICR0aW1lb3V0LCAkcSwgJHJvb3RTY29wZSwgJGxvZ1xyXG4gICAgKSB7XHJcbiAgICAgICAgJ25nSW5qZWN0JztcclxuXHJcbiAgICAgICAgdGhpcy4kdGltZW91dCA9ICR0aW1lb3V0O1xyXG4gICAgICAgIHRoaXMuJHEgPSAkcTtcclxuICAgICAgICB0aGlzLiRyb290U2NvcGUgPSAkcm9vdFNjb3BlO1xyXG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XHJcblxyXG4gICAgICAgIHRoaXMuaW5zdGFuY2VzID0gW107XHJcblxyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIGEgbmV3IEZsaWNraXR5IGluc3RhbmNlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXHJcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZShlbGVtZW50LCBpZCwgb3B0aW9ucykge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIC8vIElmIG5vIElEIHdhcyBwYXNzZWQgaW5cclxuICAgICAgICAgICAgaWYgKCFpZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBVc2UgdGhlIGVsZW1lbnQncyBJRCBpZiBpdCBleGlzdHNcclxuICAgICAgICAgICAgICAgICAgICBpZCA9IGVsZW1lbnQuaWQ7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIE90aGVyd2lzZSwgYXNzaWduIGEgbmV3IElEXHJcbiAgICAgICAgICAgICAgICAgICAgaWQgPSB0aGlzLmluc3RhbmNlcy5sZW5ndGggKyAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBDaGVjayB0byBzZWUgaWYgdGhlIElEIGlzIGFscmVhZHkgaW4gdXNlXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9maW5kT2JqZWN0QnlJZCh0aGlzLmluc3RhbmNlcywgaWQpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kbG9nLmVycm9yKGBUaGlzIElEIGlzIGFscmVhZHkgaW4gdXNlOiBgLCB0aGlzLmluc3RhbmNlc1tpbmRleF0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHJlamVjdChgVGhpcyBJRCBpcyBhbHJlYWR5IGluIHVzZS5gKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gRGVmaW5lIHRoZSBuZXcgaW5zdGFuY2VcclxuICAgICAgICAgICAgY29uc3QgaW5zdGFuY2UgPSB7XHJcbiAgICAgICAgICAgICAgICBpZDogaWQsXHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZTogbmV3IGZsaWNraXR5KGVsZW1lbnQsIG9wdGlvbnMpLFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgLy8gU2F2ZSB0aGlzIGluc3RhbmNlIHRvIHRoZSBhcnJheVxyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlcy5wdXNoKGluc3RhbmNlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEJpbmQgdG8gYWxsIGV2ZW50c1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYmluZEV2ZW50cyhpZCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlc3Ryb3kgYSBGbGlja2l0eSBpbnN0YW5jZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxyXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxyXG4gICAgICovXHJcbiAgICBkZXN0cm95KGlkKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZmxpY2tpdHlJbmRleCA9IHRoaXMuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGBJbnN0YW5jZSAke2lkfSBub3QgZm91bmQuYCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIERlc3Ryb3kgdGhlIEZsaWNraXR5IGluc3RhbmNlXHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLmRlc3Ryb3koKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgaW5zdGFuY2UgZnJvbSB0aGUgYXJyYXlcclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZXMuc3BsaWNlKGZsaWNraXR5SW5kZXgsIDEpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoJ0luc3RhbmNlICcgKyBpZCArICcgZGVzdHJveWVkLicpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybiBhbGwgaW5zdGFuY2VzXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7QXJyYXl9IGluc3RhbmNlc1xyXG4gICAgICovXHJcbiAgICBnZXRBbGwoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgICAgIHJlc29sdmUodGhpcy5pbnN0YW5jZXMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1vdmUgdG8gdGhlIG5leHQgc2xpZGVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgICAqIEBwYXJhbSB7Qm9vbH0gaXNXcmFwcGVkXHJcbiAgICAgKiBAcGFyYW0ge0Jvb2x9IGlzSW5zdGFudFxyXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxyXG4gICAgICovXHJcbiAgICBuZXh0KGlkLCBpc1dyYXBwZWQsIGlzSW5zdGFudCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZsaWNraXR5SW5kZXggPSB0aGlzLl9nZXRGbGlja2l0eUluZGV4KGlkKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChgSW5zdGFuY2UgJHtpZH0gbm90IGZvdW5kLmApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gTW92ZSB0byB0aGUgbmV4dCBzbGlkZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2UubmV4dChpc1dyYXBwZWQsIGlzSW5zdGFudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTW92ZSB0byB0aGUgcHJldmlvdXMgc2xpZGVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgICAqIEBwYXJhbSB7Qm9vbH0gaXNXcmFwcGVkXHJcbiAgICAgKiBAcGFyYW0ge0Jvb2x9IGlzSW5zdGFudFxyXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxyXG4gICAgICovXHJcbiAgICBwcmV2aW91cyhpZCwgaXNXcmFwcGVkLCBpc0luc3RhbnQpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBmbGlja2l0eUluZGV4ID0gdGhpcy5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoYEluc3RhbmNlICR7aWR9IG5vdCBmb3VuZC5gKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIE1vdmUgdG8gdGhlIHByZXZpb3VzIHNsaWRlXHJcbiAgICAgICAgICAgICAgICB0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5wcmV2aW91cyhpc1dyYXBwZWQsIGlzSW5zdGFudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2VsZWN0IGEgc2xpZGVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcclxuICAgICAqIEBwYXJhbSB7SW50ZWdlcn0gaW5kZXhcclxuICAgICAqIEBwYXJhbSB7Qm9vbH0gaXNXcmFwcGVkXHJcbiAgICAgKiBAcGFyYW0ge0Jvb2x9IGlzSW5zdGFudFxyXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxyXG4gICAgICovXHJcbiAgICBzZWxlY3QoaWQsIGluZGV4LCBpc1dyYXBwZWQgPSBmYWxzZSwgaXNJbnN0YW50ID0gZmFsc2UpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBmbGlja2l0eUluZGV4ID0gdGhpcy5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoYEluc3RhbmNlICR7aWR9IG5vdCBmb3VuZC5gKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIE1vdmUgdG8gdGhlIHNlbGVjdGVkIHNsaWRlXHJcbiAgICAgICAgICAgICAgICB0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5zZWxlY3QoaW5kZXgsIGlzV3JhcHBlZCwgaXNJbnN0YW50KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZWxlY3QgYSBzbGlkZSBvZiBhIGNlbGxcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcclxuICAgICAqIEBwYXJhbSB7SW50ZWdlcnxTdHJpbmd9IHZhbHVlXHJcbiAgICAgKiBAcGFyYW0ge0Jvb2x9IGlzV3JhcHBlZFxyXG4gICAgICogQHBhcmFtIHtCb29sfSBpc0luc3RhbnRcclxuICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcclxuICAgICAqL1xyXG4gICAgc2VsZWN0Q2VsbChpZCwgdmFsdWUsIGlzV3JhcHBlZCA9IGZhbHNlLCBpc0luc3RhbnQgPSBmYWxzZSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZsaWNraXR5SW5kZXggPSB0aGlzLl9nZXRGbGlja2l0eUluZGV4KGlkKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChgSW5zdGFuY2UgJHtpZH0gbm90IGZvdW5kLmApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gTW92ZSB0byB0aGUgc2VsZWN0ZWQgc2xpZGVcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLnNlbGVjdENlbGwodmFsdWUsIGlzV3JhcHBlZCwgaXNJbnN0YW50KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhlIGN1cnJlbnQgc2xpZGUgaW5kZXhcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcclxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9IHNlbGVjdGVkSW5kZXhcclxuICAgICAqL1xyXG4gICAgc2VsZWN0ZWRJbmRleChpZCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZsaWNraXR5SW5kZXggPSB0aGlzLl9nZXRGbGlja2l0eUluZGV4KGlkKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChgSW5zdGFuY2UgJHtpZH0gbm90IGZvdW5kLmApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBjdXJyZW50IGluZGV4XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5zZWxlY3RlZEluZGV4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlc2l6ZSB0aGUgZ2FsbGVyeSBhbmQgcmUtcG9zaXRpb24gY2VsbHMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXHJcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXHJcbiAgICAgKi9cclxuICAgIHJlc2l6ZShpZCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZsaWNraXR5SW5kZXggPSB0aGlzLl9nZXRGbGlja2l0eUluZGV4KGlkKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChgSW5zdGFuY2UgJHtpZH0gbm90IGZvdW5kLmApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gVHJpZ2dlciB0aGUgcmVzaXplXHJcbiAgICAgICAgICAgICAgICB0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5yZXNpemUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQb3NpdGlvbiBjZWxscyBhdCBzZWxlY3RlZCBwb3NpdGlvbi5cclxuICAgICAqIFRyaWdnZXIgcmVwb3NpdGlvbiBhZnRlciB0aGUgc2l6ZSBvZiBhIGNlbGwgaGFzIGJlZW4gY2hhbmdlZC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcclxuICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcclxuICAgICAqL1xyXG4gICAgcmVwb3NpdGlvbihpZCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZsaWNraXR5SW5kZXggPSB0aGlzLl9nZXRGbGlja2l0eUluZGV4KGlkKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChgSW5zdGFuY2UgJHtpZH0gbm90IGZvdW5kLmApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gVHJpZ2dlciB0aGUgcmVwb3NpdGlvblxyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2UucmVwb3NpdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgaW5zdGFuY2VcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlLWNvbGxlY3QgYWxsIGNlbGwgZWxlbWVudHMgaW4gYGZsaWNraXR5LXNsaWRlcmAuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXHJcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXHJcbiAgICAgKi9cclxuICAgIHJlbG9hZENlbGxzKGlkKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZmxpY2tpdHlJbmRleCA9IHRoaXMuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGBJbnN0YW5jZSAke2lkfSBub3QgZm91bmQuYCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBSZWxvYWQgY2VsbHNcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLnJlbG9hZENlbGxzKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IGEgRmxpY2tpdHkgaW5zdGFuY2UgYnkgSURcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcclxuICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcclxuICAgICAqL1xyXG4gICAgZ2V0KGlkKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZmxpY2tpdHlJbmRleCA9IHRoaXMuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGBJbnN0YW5jZSAke2lkfSBub3QgZm91bmQuYCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhlIGZpcnN0IEZsaWNraXR5IGluc3RhbmNlXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxyXG4gICAgICovXHJcbiAgICBnZXRGaXJzdCgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuaW5zdGFuY2VzIHx8IHRoaXMuaW5zdGFuY2VzLmxlbmd0aCA8IDEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoYE5vIGluc3RhbmNlcyBleGlzdC5gKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgaW5zdGFuY2VcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRoaXMuaW5zdGFuY2VzWzBdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCB0aGUgRmxpY2tpdHkgaW5zdGFuY2VcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcclxuICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcclxuICAgICAqL1xyXG4gICAgZ2V0QnlFbGVtZW50KGVsZW1lbnQpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpbnN0YW5jZSA9IGZsaWNraXR5LmRhdGEoZWxlbWVudClcclxuXHJcbiAgICAgICAgICAgIGlmIChpbnN0YW5jZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgnSW5zdGFuY2Ugbm90IGZvdW5kIGZvciAnICsgZWxlbWVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQcmVwZW5kIGVsZW1lbnRzIGFuZCBjcmVhdGUgY2VsbHMgdG8gdGhlIGJlZ2lubmluZyBvZiB0aGUgZ2FsbGVyeS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcclxuICAgICAqIEBwYXJhbSB7Kn0gZWxlbWVudChzKSAtIGpRdWVyeSBvYmplY3QsIEFycmF5IG9mIEVsZW1lbnRzLCBFbGVtZW50LCBvciBOb2RlTGlzdFxyXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxyXG4gICAgICovXHJcbiAgICBwcmVwZW5kKGlkLCBlbGVtZW50cykge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZsaWNraXR5SW5kZXggPSB0aGlzLl9nZXRGbGlja2l0eUluZGV4KGlkKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChgSW5zdGFuY2UgJHtpZH0gbm90IGZvdW5kLmApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gUHJlcGVuZCB0aGUgc2xpZGVzXHJcbiAgICAgICAgICAgICAgICB0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5wcmVwZW5kKGVsZW1lbnRzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBcHBlbmQgZWxlbWVudHMgYW5kIGNyZWF0ZSBjZWxscyB0byB0aGUgZW5kIG9mIHRoZSBnYWxsZXJ5LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxyXG4gICAgICogQHBhcmFtIHsqfSBlbGVtZW50KHMpIC0galF1ZXJ5IG9iamVjdCwgQXJyYXkgb2YgRWxlbWVudHMsIEVsZW1lbnQsIG9yIE5vZGVMaXN0XHJcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXHJcbiAgICAgKi9cclxuICAgIGFwcGVuZChpZCwgZWxlbWVudHMpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBmbGlja2l0eUluZGV4ID0gdGhpcy5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoYEluc3RhbmNlICR7aWR9IG5vdCBmb3VuZC5gKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIEFwcGVuZCB0aGUgc2xpZGVzXHJcbiAgICAgICAgICAgICAgICB0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5hcHBlbmQoZWxlbWVudHMpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgaW5zdGFuY2VcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEluc2VydCBlbGVtZW50cyBpbnRvIHRoZSBnYWxsZXJ5IGFuZCBjcmVhdGUgY2VsbHMgYXQgdGhlIGRlc2lyZWQgaW5kZXguXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXHJcbiAgICAgKiBAcGFyYW0geyp9IGVsZW1lbnQocykgLSBqUXVlcnkgb2JqZWN0LCBBcnJheSBvZiBFbGVtZW50cywgRWxlbWVudCwgb3IgTm9kZUxpc3RcclxuICAgICAqIEBwYXJhbSB7SW50ZWdlcn0gaW5kZXggLSBaZXJvIGJhc2VkIGluZGV4XHJcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXHJcbiAgICAgKi9cclxuICAgIGluc2VydChpZCwgZWxlbWVudHMsIGluZGV4KSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZmxpY2tpdHlJbmRleCA9IHRoaXMuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGBJbnN0YW5jZSAke2lkfSBub3QgZm91bmQuYCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBJbnNlcnQgdGhlIHNsaWRlc1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2UuaW5zZXJ0KGVsZW1lbnRzLCBpbmRleCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRoZSBlbGVtZW50cyBvZiB0aGUgY2VsbHNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcclxuICAgICAqIEByZXR1cm4ge0FycmF5fSBjZWxsRWxlbWVudHNcclxuICAgICAqL1xyXG4gICAgZ2V0Q2VsbEVsZW1lbnRzKGlkKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZmxpY2tpdHlJbmRleCA9IHRoaXMuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGBJbnN0YW5jZSAke2lkfSBub3QgZm91bmQuYCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGFycmF5IG9mIGNlbGwgZWxlbWVudHNcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLmdldENlbGxFbGVtZW50cygpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZSBjZWxscyBieSBlbGVtZW50XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdHxBcnJheXxFbGVtZW50fSBlbGVtZW50KHMpXHJcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXHJcbiAgICAgKi9cclxuICAgIHJlbW92ZShpZCwgZWxlbWVudHMpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBmbGlja2l0eUluZGV4ID0gdGhpcy5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoYEluc3RhbmNlICR7aWR9IG5vdCBmb3VuZC5gKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLnJlbW92ZShlbGVtZW50cyk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgY2VsbCBlbGVtZW50XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXHJcbiAgICAgKiBAcmV0dXJuIHtFbGVtZW50fSBzZWxlY3RlZENlbGxFbGVtZW50XHJcbiAgICAgKi9cclxuICAgIHNlbGVjdGVkRWxlbWVudChpZCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZsaWNraXR5SW5kZXggPSB0aGlzLl9nZXRGbGlja2l0eUluZGV4KGlkKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChgSW5zdGFuY2UgJHtpZH0gbm90IGZvdW5kLmApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBzZWxlY3RlZCBlbGVtZW50XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5zZWxlY3RlZEVsZW1lbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IGFuIGFycmF5IG9mIGFsbCBjZWxsc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxyXG4gICAgICogQHJldHVybiB7QXJyYXl9IGNlbGxzXHJcbiAgICAgKi9cclxuICAgIGNlbGxzKGlkKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZmxpY2tpdHlJbmRleCA9IHRoaXMuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGBJbnN0YW5jZSAke2lkfSBub3QgZm91bmQuYCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGFycmF5IG9mIGNlbGxzXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5jZWxscyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8vXHJcbiAgICAvLyBIZWxwZXIgbWV0aG9kc1xyXG4gICAgLy9cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGaW5kIHRoZSBpbmRleCBmb3IgYSBGbGlja2l0eSBpbnN0YW5jZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxyXG4gICAgICogQHJldHVybiB7SW50ZWdlcn0gZmxpY2tpdHlJbmRleFxyXG4gICAgICovXHJcbiAgICBfZ2V0RmxpY2tpdHlJbmRleChpZCkge1xyXG4gICAgICAgIGxldCBmb3VuZEluZGV4ID0gLTE7XHJcblxyXG4gICAgICAgIC8vIFZlcmlmeSBhdCBsZWFzdCBvbmUgaW5zdGFuY2UgZXhpc3RzXHJcbiAgICAgICAgaWYgKHRoaXMuaW5zdGFuY2VzLmxlbmd0aCA+IDApIHtcclxuXHJcbiAgICAgICAgICAgIC8vIENoZWNrIHRoZSBJRCBvZiBlYWNoIGluc3RhbmNlXHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzLmZvckVhY2goKGluc3RhbmNlLCBpbmRleCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIElmIGl0IG1hdGNoZXMgb3VyIElELCBzZXQgdGhlIGluZGV4XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5zdGFuY2UuaWQgPT09IGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm91bmRJbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZvdW5kSW5kZXg7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQmluZCBhbGwgZXZlbnRzIGZvciBhIG5ldyBpbnN0YW5jZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxyXG4gICAgICogQHJldHVybiB7Qm9vbH0gaXNGaW5pc2hlZFxyXG4gICAgICovXHJcbiAgICBfYmluZEV2ZW50cyhpZCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZsaWNraXR5SW5kZXggPSB0aGlzLl9nZXRGbGlja2l0eUluZGV4KGlkKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBJRCA9IHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmlkO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uub24oJ3NlbGVjdCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZS4kZW1pdChgRmxpY2tpdHk6JHtJRH06c2VsZWN0YCwgdGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLm9uKCdzZXR0bGUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRyb290U2NvcGUuJGVtaXQoYEZsaWNraXR5OiR7SUR9OnNldHRsZWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLm9uKCdzY3JvbGwnLCAocHJvZ3Jlc3MsIHBvc2l0aW9uWCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kcm9vdFNjb3BlLiRlbWl0KGBGbGlja2l0eToke0lEfTpzY3JvbGxgLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3M6IHByb2dyZXNzLFxyXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uWDogcG9zaXRpb25YLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uub24oJ2RyYWdTdGFydCcsIChldmVudCwgcG9pbnRlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kcm9vdFNjb3BlLiRlbWl0KGBGbGlja2l0eToke0lEfTpkcmFnU3RhcnRgLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IGV2ZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIHBvaW50ZXI6IHBvaW50ZXIsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5vbignZHJhZ01vdmUnLCAoZXZlbnQsIHBvaW50ZXIsIG1vdmVWZWN0b3IpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZS4kZW1pdChgRmxpY2tpdHk6JHtJRH06ZHJhZ01vdmVgLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IGV2ZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIHBvaW50ZXI6IHBvaW50ZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW92ZVZlY3RvcjogbW92ZVZlY3RvcixcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLm9uKCdkcmFnRW5kJywgKGV2ZW50LCBwb2ludGVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRyb290U2NvcGUuJGVtaXQoYEZsaWNraXR5OiR7SUR9OmRyYWdFbmRgLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IGV2ZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIHBvaW50ZXI6IHBvaW50ZXIsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5vbigncG9pbnRlckRvd24nLCAoZXZlbnQsIHBvaW50ZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZS4kZW1pdChgRmxpY2tpdHk6JHtJRH06cG9pbnRlckRvd25gLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IGV2ZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIHBvaW50ZXI6IHBvaW50ZXIsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5vbigncG9pbnRlck1vdmUnLChldmVudCwgcG9pbnRlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW92ZVZlY3RvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kcm9vdFNjb3BlLiRlbWl0KGBGbGlja2l0eToke0lEfTpwb2ludGVyTW92ZWAsIHtcclxuICAgICAgICAgICAgICAgICAgICBldmVudDogZXZlbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRlcjogcG9pbnRlcixcclxuICAgICAgICAgICAgICAgICAgICBtb3ZlVmVjdG9yOiBtb3ZlVmVjdG9yLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uub24oJ3BvaW50ZXJVcCcsIChldmVudCwgcG9pbnRlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kcm9vdFNjb3BlLiRlbWl0KGBGbGlja2l0eToke0lEfTpwb2ludGVyVXBgLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IGV2ZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIHBvaW50ZXI6IHBvaW50ZXIsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5vbignc3RhdGljQ2xpY2snLCAoZXZlbnQsIHBvaW50ZXIsIGNlbGxFbGVtZW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2VsbEluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRyb290U2NvcGUuJGVtaXQoYEZsaWNraXR5OiR7SUR9OnN0YXRpY0NsaWNrYCwge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50OiBldmVudCxcclxuICAgICAgICAgICAgICAgICAgICBwb2ludGVyOiBwb2ludGVyLFxyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxFbGVtZW50OiBjZWxsRWxlbWVudCxcclxuICAgICAgICAgICAgICAgICAgICBjZWxsSW5kZXg6IGNlbGxJbmRleCxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLm9uKCdsYXp5TG9hZCcsIChldmVudCwgY2VsbEVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZS4kZW1pdChgRmxpY2tpdHk6JHtJRH06bGF6eUxvYWRgLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IGV2ZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxFbGVtZW50OiBjZWxsRWxlbWVudCxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGaW5kIGFuIG9iamVjdCB3aXRoaW4gYW4gYXJyYXkgYnkgSURcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBzb3VyY2VcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxyXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBtYXRjaFxyXG4gICAgICovXHJcbiAgICBfZmluZE9iamVjdEJ5SWQoc291cmNlLCBpZCkge1xyXG4gICAgICAgIHJldHVybiBzb3VyY2UuZmlsdGVyKChvYmplY3QpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG9iamVjdC5pZCA9PT0gaWQ7XHJcbiAgICAgICAgfSlbMF07XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBDOi9BcGFjaGUyNC9odGRvY3MvYW5ndWxhci1mbGlja2l0eS9+L2VzbGludC1sb2FkZXIhLi9zcmMvZmxpY2tpdHkuc2VydmljZS5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8zX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImZsaWNraXR5XCJcbiAqKiBtb2R1bGUgaWQgPSAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMVxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5GbGlja2l0eURpcmVjdGl2ZSA9IEZsaWNraXR5RGlyZWN0aXZlO1xuLyogZ2xvYmFsIGZsaWNraXR5ICovXG5cbmZ1bmN0aW9uIEZsaWNraXR5RGlyZWN0aXZlKCR0aW1lb3V0LCBGbGlja2l0eVNlcnZpY2UsIEZsaWNraXR5Q29uZmlnKSB7XG4gICAgJ25nSW5qZWN0JztcblxuICAgIHZhciBkaXJlY3RpdmUgPSB7XG4gICAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICAgIHNjb3BlOiB7fSxcbiAgICAgICAgYmluZFRvQ29udHJvbGxlcjoge1xuICAgICAgICAgICAgYmNGbGlja2l0eTogJ0A/JyxcbiAgICAgICAgICAgIGJjRmxpY2tpdHlJZDogJ0A/J1xuICAgICAgICB9LFxuICAgICAgICBjb21waWxlOiBmdW5jdGlvbiBjb21waWxlKCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBwcmU6IHByZUxpbmtGdW5jdGlvbixcbiAgICAgICAgICAgICAgICBwb3N0OiBwb3N0TGlua0Z1bmN0aW9uXG4gICAgICAgICAgICB9O1xuICAgICAgICB9LFxuICAgICAgICBjb250cm9sbGVyOiBmdW5jdGlvbiBjb250cm9sbGVyKCkge30sXG4gICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJ1xuICAgIH07XG5cbiAgICByZXR1cm4gZGlyZWN0aXZlO1xuXG4gICAgZnVuY3Rpb24gcHJlTGlua0Z1bmN0aW9uKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGNvbnRyb2xsZXIpIHtcbiAgICAgICAgJ25nSW5qZWN0JztcblxuICAgICAgICAvLyBHZXQgdGhlIHVzZXIncyBvcHRpb25zIG9yIHN0YXJ0IHdpdGggYW4gZW1wdHkgb2JqZWN0XG5cbiAgICAgICAgdmFyIHVzZXJPcHRpb25zID0gYW5ndWxhci5mcm9tSnNvbigkY29udHJvbGxlci5iY0ZsaWNraXR5IHx8IHt9KTtcbiAgICAgICAgLy8gQ29tYmluZSB0aGUgdXNlciBvcHRpb25zIHdpdGggdGhlIGRlZmF1bHQgb3B0aW9uc1xuICAgICAgICAkY29udHJvbGxlci5vcHRpb25zID0gYW5ndWxhci5leHRlbmQoe30sIEZsaWNraXR5Q29uZmlnLCB1c2VyT3B0aW9ucyk7XG5cbiAgICAgICAgLy8gSWYgbm8gSUQgd2FzIHBhc3NlZCBpblxuICAgICAgICBpZiAoISRjb250cm9sbGVyLmJjRmxpY2tpdHlJZCkge1xuICAgICAgICAgICAgLy8gVXNlIHRoZSBlbGVtZW50J3MgSUQgaWYgb25lIGV4aXN0c1xuICAgICAgICAgICAgaWYgKCRhdHRycy5pZCkge1xuICAgICAgICAgICAgICAgICRjb250cm9sbGVyLmJjRmxpY2tpdHlJZCA9ICRhdHRycy5pZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxyXG4gICAgICogUG9zdCBMaW5rXHJcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBwb3N0TGlua0Z1bmN0aW9uKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGNvbnRyb2xsZXIpIHtcbiAgICAgICAgJ25nSW5qZWN0JztcblxuICAgICAgICAvLyBNYWtlIHN1cmUgdGhpcyBgY3JlYXRlKClgIGdldHMgcGlja2VkIHVwIGluIHRoZSBuZXh0IGRpZ2VzdCBjeWNsZVxuXG4gICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgLy8gSW5pdGlhbGl6ZSBGbGlja2l0eVxuICAgICAgICAgICAgRmxpY2tpdHlTZXJ2aWNlLmNyZWF0ZSgkZWxlbWVudFswXSwgJGNvbnRyb2xsZXIuYmNGbGlja2l0eUlkLCAkY29udHJvbGxlci5vcHRpb25zKS50aGVuKGZ1bmN0aW9uIChmbGlja2l0eUluc3RhbmNlKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBFeHBvc2UgdGhlIEZsaWNraXR5IGluc3RhbmNlIGFuZCBJRFxuICAgICAgICAgICAgICAgICRjb250cm9sbGVyLkZsaWNraXR5ID0gZmxpY2tpdHlJbnN0YW5jZS5pbnN0YW5jZTtcbiAgICAgICAgICAgICAgICAkY29udHJvbGxlci5iY0ZsaWNraXR5SWQgPSBmbGlja2l0eUluc3RhbmNlLmlkO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFdoZW4gdGhlIGRpcmVjdGl2ZSBpcyBiZWluZyBkZXN0cm95ZWRcbiAgICAgICAgdmFyIG9uRGVzdHJveSA9ICRzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAvLyBNYWtlIHN1cmUgd2UgZGVzdHJveSB0aGUgRmxpY2tpdHkgaW5zdGFuY2VcbiAgICAgICAgICAgIEZsaWNraXR5U2VydmljZS5kZXN0cm95KCRjb250cm9sbGVyLmJjRmxpY2tpdHlJZCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9mbGlja2l0eS5kaXJlY3RpdmUuanNcbiAqKi8iLCIvKiBnbG9iYWwgZmxpY2tpdHkgKi9cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBGbGlja2l0eURpcmVjdGl2ZShcclxuICAgICR0aW1lb3V0LFxyXG4gICAgRmxpY2tpdHlTZXJ2aWNlLFxyXG4gICAgRmxpY2tpdHlDb25maWdcclxuKSB7XHJcbiAgICAnbmdJbmplY3QnO1xyXG5cclxuICAgIGNvbnN0IGRpcmVjdGl2ZSA9IHtcclxuICAgICAgICByZXN0cmljdDogJ0EnLFxyXG4gICAgICAgIHNjb3BlOiB7fSxcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyOiB7XHJcbiAgICAgICAgICAgIGJjRmxpY2tpdHk6ICdAPycsXHJcbiAgICAgICAgICAgIGJjRmxpY2tpdHlJZDogJ0A/JyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbXBpbGU6ICgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHByZTogcHJlTGlua0Z1bmN0aW9uLFxyXG4gICAgICAgICAgICAgICAgcG9zdDogcG9zdExpbmtGdW5jdGlvbixcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbnRyb2xsZXI6ICgpID0+IHt9LFxyXG4gICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIGRpcmVjdGl2ZTtcclxuXHJcblxyXG4gICAgZnVuY3Rpb24gcHJlTGlua0Z1bmN0aW9uKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGNvbnRyb2xsZXIpIHtcclxuICAgICAgICAnbmdJbmplY3QnO1xyXG5cclxuICAgICAgICAvLyBHZXQgdGhlIHVzZXIncyBvcHRpb25zIG9yIHN0YXJ0IHdpdGggYW4gZW1wdHkgb2JqZWN0XHJcbiAgICAgICAgY29uc3QgdXNlck9wdGlvbnMgPSBhbmd1bGFyLmZyb21Kc29uKCRjb250cm9sbGVyLmJjRmxpY2tpdHkgfHwge30pO1xyXG4gICAgICAgIC8vIENvbWJpbmUgdGhlIHVzZXIgb3B0aW9ucyB3aXRoIHRoZSBkZWZhdWx0IG9wdGlvbnNcclxuICAgICAgICAkY29udHJvbGxlci5vcHRpb25zID0gYW5ndWxhci5leHRlbmQoe30sIEZsaWNraXR5Q29uZmlnLCB1c2VyT3B0aW9ucyk7XHJcblxyXG4gICAgICAgIC8vIElmIG5vIElEIHdhcyBwYXNzZWQgaW5cclxuICAgICAgICBpZiAoISRjb250cm9sbGVyLmJjRmxpY2tpdHlJZCkge1xyXG4gICAgICAgICAgICAvLyBVc2UgdGhlIGVsZW1lbnQncyBJRCBpZiBvbmUgZXhpc3RzXHJcbiAgICAgICAgICAgIGlmICgkYXR0cnMuaWQpIHtcclxuICAgICAgICAgICAgICAgICRjb250cm9sbGVyLmJjRmxpY2tpdHlJZCA9ICRhdHRycy5pZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQb3N0IExpbmtcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gcG9zdExpbmtGdW5jdGlvbigkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRjb250cm9sbGVyKSB7XHJcbiAgICAgICAgJ25nSW5qZWN0JztcclxuXHJcbiAgICAgICAgLy8gTWFrZSBzdXJlIHRoaXMgYGNyZWF0ZSgpYCBnZXRzIHBpY2tlZCB1cCBpbiB0aGUgbmV4dCBkaWdlc3QgY3ljbGVcclxuICAgICAgICAkdGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAvLyBJbml0aWFsaXplIEZsaWNraXR5XHJcbiAgICAgICAgICAgIEZsaWNraXR5U2VydmljZS5jcmVhdGUoJGVsZW1lbnRbMF0sICRjb250cm9sbGVyLmJjRmxpY2tpdHlJZCwgJGNvbnRyb2xsZXIub3B0aW9ucylcclxuICAgICAgICAgICAgICAgIC50aGVuKChmbGlja2l0eUluc3RhbmNlKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIEV4cG9zZSB0aGUgRmxpY2tpdHkgaW5zdGFuY2UgYW5kIElEXHJcbiAgICAgICAgICAgICAgICAgICAgJGNvbnRyb2xsZXIuRmxpY2tpdHkgPSBmbGlja2l0eUluc3RhbmNlLmluc3RhbmNlO1xyXG4gICAgICAgICAgICAgICAgICAgICRjb250cm9sbGVyLmJjRmxpY2tpdHlJZCA9IGZsaWNraXR5SW5zdGFuY2UuaWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gV2hlbiB0aGUgZGlyZWN0aXZlIGlzIGJlaW5nIGRlc3Ryb3llZFxyXG4gICAgICAgIGNvbnN0IG9uRGVzdHJveSA9ICRzY29wZS4kb24oJyRkZXN0cm95JywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIC8vIE1ha2Ugc3VyZSB3ZSBkZXN0cm95IHRoZSBGbGlja2l0eSBpbnN0YW5jZVxyXG4gICAgICAgICAgICBGbGlja2l0eVNlcnZpY2UuZGVzdHJveSgkY29udHJvbGxlci5iY0ZsaWNraXR5SWQpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEM6L0FwYWNoZTI0L2h0ZG9jcy9hbmd1bGFyLWZsaWNraXR5L34vZXNsaW50LWxvYWRlciEuL3NyYy9mbGlja2l0eS5kaXJlY3RpdmUuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuRmxpY2tpdHlOZXh0RGlyZWN0aXZlID0gRmxpY2tpdHlOZXh0RGlyZWN0aXZlO1xuXG52YXIgX25leHQgPSByZXF1aXJlKCcuL25leHQuY29udHJvbGxlcicpO1xuXG5mdW5jdGlvbiBGbGlja2l0eU5leHREaXJlY3RpdmUoJGxvZywgJHRpbWVvdXQsICRyb290U2NvcGUsIEZsaWNraXR5Q29uZmlnLCBGbGlja2l0eVNlcnZpY2UpIHtcbiAgICAnbmdJbmplY3QnO1xuXG4gICAgdmFyIGRpcmVjdGl2ZSA9IHtcbiAgICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgICAgc2NvcGU6IHt9LFxuICAgICAgICBiaW5kVG9Db250cm9sbGVyOiB7XG4gICAgICAgICAgICBiY0ZsaWNraXR5TmV4dDogJz0/JyxcbiAgICAgICAgICAgIGJjRmxpY2tpdHlJZDogJ0A/J1xuICAgICAgICB9LFxuICAgICAgICBjb21waWxlOiBmdW5jdGlvbiBjb21waWxlKCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBwcmU6IHByZUxpbmtGdW5jdGlvblxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgICAgY29udHJvbGxlcjogX25leHQuTmV4dENvbnRyb2xsZXIsXG4gICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJ1xuICAgIH07XG5cbiAgICByZXR1cm4gZGlyZWN0aXZlO1xuXG4gICAgLyoqXHJcbiAgICAgKiBQcmUgTGlua1xyXG4gICAgICovXG4gICAgZnVuY3Rpb24gcHJlTGlua0Z1bmN0aW9uKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGNvbnRyb2xsZXIpIHtcbiAgICAgICAgJ25nSW5qZWN0JztcblxuICAgICAgICAvLyBHZXQgdGhlIElEXG5cbiAgICAgICAgdmFyIElEID0gJGNvbnRyb2xsZXIuZmxpY2tpdHlJZDtcblxuICAgICAgICAvLyBEZWZpbmUgdGhlIGJyb2FkY2FzdCBuYW1lcyB0byBsaXN0ZW4gZm9yXG4gICAgICAgIHZhciBzZWxlY3RFdmVudCA9ICdGbGlja2l0eTonICsgSUQgKyAnOmNlbGxTZWxlY3QnO1xuICAgICAgICB2YXIgc2V0dGxlRXZlbnQgPSAnRmxpY2tpdHk6JyArIElEICsgJzpzZXR0bGUnO1xuXG4gICAgICAgIC8vIExpc3RlblxuICAgICAgICB2YXIgY2VsbFNlbGVjdCA9ICRyb290U2NvcGUuJG9uKHNlbGVjdEV2ZW50LCBmdW5jdGlvbiAoZXZlbnQsIGRhdGEpIHtcbiAgICAgICAgICAgIF9kaXNhYmxlQnV0dG9uSWZOZWVkZWQoZGF0YS5pbnN0YW5jZS5zbGlkZXMubGVuZ3RoLCBkYXRhLmluc3RhbmNlLnNlbGVjdGVkSW5kZXggKyAxKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBzZXR0bGUgPSAkcm9vdFNjb3BlLiRvbihzZXR0bGVFdmVudCwgZnVuY3Rpb24gKGV2ZW50LCBkYXRhKSB7XG4gICAgICAgICAgICBfZGlzYWJsZUJ1dHRvbklmTmVlZGVkKGRhdGEuaW5zdGFuY2Uuc2xpZGVzLmxlbmd0aCwgZGF0YS5pbnN0YW5jZS5zZWxlY3RlZEluZGV4ICsgMSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRlbGVtZW50Lm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgLy8gTW92ZSB0byB0aGUgbmV4dCBjZWxsXG4gICAgICAgICAgICBGbGlja2l0eVNlcnZpY2UubmV4dCgkY29udHJvbGxlci5mbGlja2l0eUlkLCAkY29udHJvbGxlci53cmFwQXJvdW5kKS50aGVuKGZ1bmN0aW9uIChpbnN0YW5jZSkge1xuICAgICAgICAgICAgICAgIF9kaXNhYmxlQnV0dG9uSWZOZWVkZWQoaW5zdGFuY2UuaW5zdGFuY2Uuc2VsZWN0ZWRJbmRleCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRGlzYWJsZSBidXR0b24gaWYgbmVlZGVkXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXhcclxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gX2Rpc2FibGVCdXR0b25JZk5lZWRlZChpbmRleCwgY2VsbENvdW50KSB7XG5cbiAgICAgICAgICAgIC8vIERpc2FibGUgYnV0dG9uIGlmIGF0IHRoZSBiZWdpbm5pbmcgYW5kIHdlIHNob3VsZG4ndCB3cmFwXG4gICAgICAgICAgICBpZiAoISRjb250cm9sbGVyLndyYXBBcm91bmQgJiYgaW5kZXggPT09IGNlbGxDb3VudCkge1xuICAgICAgICAgICAgICAgICRhdHRycy4kc2V0KCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkYXR0cnMuJHNldCgnZGlzYWJsZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvbmV4dC9uZXh0LmRpcmVjdGl2ZS5qc1xuICoqLyIsImltcG9ydCB7IE5leHRDb250cm9sbGVyIH0gZnJvbSAnLi9uZXh0LmNvbnRyb2xsZXInO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEZsaWNraXR5TmV4dERpcmVjdGl2ZShcclxuICAgICRsb2csICR0aW1lb3V0LCAkcm9vdFNjb3BlLFxyXG4gICAgRmxpY2tpdHlDb25maWcsIEZsaWNraXR5U2VydmljZVxyXG4pIHtcclxuICAgICduZ0luamVjdCc7XHJcblxyXG4gICAgY29uc3QgZGlyZWN0aXZlID0ge1xyXG4gICAgICAgIHJlc3RyaWN0OiAnQScsXHJcbiAgICAgICAgc2NvcGU6IHt9LFxyXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXI6IHtcclxuICAgICAgICAgICAgYmNGbGlja2l0eU5leHQ6ICc9PycsXHJcbiAgICAgICAgICAgIGJjRmxpY2tpdHlJZDogJ0A/JyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbXBpbGU6ICgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHByZTogcHJlTGlua0Z1bmN0aW9uLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29udHJvbGxlcjogTmV4dENvbnRyb2xsZXIsXHJcbiAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gZGlyZWN0aXZlO1xyXG5cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHJlIExpbmtcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gcHJlTGlua0Z1bmN0aW9uKFxyXG4gICAgICAgICRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGNvbnRyb2xsZXJcclxuICAgICkge1xyXG4gICAgICAgICduZ0luamVjdCc7XHJcblxyXG4gICAgICAgIC8vIEdldCB0aGUgSURcclxuICAgICAgICBjb25zdCBJRCA9ICRjb250cm9sbGVyLmZsaWNraXR5SWQ7XHJcblxyXG4gICAgICAgIC8vIERlZmluZSB0aGUgYnJvYWRjYXN0IG5hbWVzIHRvIGxpc3RlbiBmb3JcclxuICAgICAgICBjb25zdCBzZWxlY3RFdmVudCA9IGBGbGlja2l0eToke0lEfTpjZWxsU2VsZWN0YDtcclxuICAgICAgICBjb25zdCBzZXR0bGVFdmVudCA9IGBGbGlja2l0eToke0lEfTpzZXR0bGVgO1xyXG5cclxuICAgICAgICAvLyBMaXN0ZW5cclxuICAgICAgICBjb25zdCBjZWxsU2VsZWN0ID0gJHJvb3RTY29wZS4kb24oc2VsZWN0RXZlbnQsIChldmVudCwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICBfZGlzYWJsZUJ1dHRvbklmTmVlZGVkKGRhdGEuaW5zdGFuY2Uuc2xpZGVzLmxlbmd0aCwgZGF0YS5pbnN0YW5jZS5zZWxlY3RlZEluZGV4ICsgMSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3Qgc2V0dGxlID0gJHJvb3RTY29wZS4kb24oc2V0dGxlRXZlbnQsIChldmVudCwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICBfZGlzYWJsZUJ1dHRvbklmTmVlZGVkKGRhdGEuaW5zdGFuY2Uuc2xpZGVzLmxlbmd0aCwgZGF0YS5pbnN0YW5jZS5zZWxlY3RlZEluZGV4ICsgMSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAkZWxlbWVudC5vbignY2xpY2snLCAoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAvLyBNb3ZlIHRvIHRoZSBuZXh0IGNlbGxcclxuICAgICAgICAgICAgRmxpY2tpdHlTZXJ2aWNlLm5leHQoJGNvbnRyb2xsZXIuZmxpY2tpdHlJZCwgJGNvbnRyb2xsZXIud3JhcEFyb3VuZClcclxuICAgICAgICAgICAgICAgIC50aGVuKChpbnN0YW5jZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIF9kaXNhYmxlQnV0dG9uSWZOZWVkZWQoaW5zdGFuY2UuaW5zdGFuY2Uuc2VsZWN0ZWRJbmRleCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICA7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEaXNhYmxlIGJ1dHRvbiBpZiBuZWVkZWRcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIF9kaXNhYmxlQnV0dG9uSWZOZWVkZWQoaW5kZXgsIGNlbGxDb3VudCkge1xyXG5cclxuICAgICAgICAgICAgLy8gRGlzYWJsZSBidXR0b24gaWYgYXQgdGhlIGJlZ2lubmluZyBhbmQgd2Ugc2hvdWxkbid0IHdyYXBcclxuICAgICAgICAgICAgaWYgKCEkY29udHJvbGxlci53cmFwQXJvdW5kICYmIGluZGV4ID09PSBjZWxsQ291bnQpIHtcclxuICAgICAgICAgICAgICAgICRhdHRycy4kc2V0KCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJGF0dHJzLiRzZXQoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuXHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEM6L0FwYWNoZTI0L2h0ZG9jcy9hbmd1bGFyLWZsaWNraXR5L34vZXNsaW50LWxvYWRlciEuL3NyYy9uZXh0L25leHQuZGlyZWN0aXZlLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBOZXh0Q29udHJvbGxlciA9IGV4cG9ydHMuTmV4dENvbnRyb2xsZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTmV4dENvbnRyb2xsZXIoJGxvZywgJHEsICR0aW1lb3V0LCBGbGlja2l0eUNvbmZpZywgRmxpY2tpdHlTZXJ2aWNlKSB7XG4gICAgICAgICduZ0luamVjdCc7XG5cbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIE5leHRDb250cm9sbGVyKTtcblxuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgICAgICB0aGlzLiRxID0gJHE7XG4gICAgICAgIHRoaXMuJHRpbWVvdXQgPSAkdGltZW91dDtcbiAgICAgICAgdGhpcy5GbGlja2l0eUNvbmZpZyA9IEZsaWNraXR5Q29uZmlnO1xuICAgICAgICB0aGlzLkZsaWNraXR5U2VydmljZSA9IEZsaWNraXR5U2VydmljZTtcblxuICAgICAgICB0aGlzLl9hY3RpdmF0ZSgpO1xuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhOZXh0Q29udHJvbGxlciwgW3tcbiAgICAgICAga2V5OiAnX2FjdGl2YXRlJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIF9hY3RpdmF0ZSgpIHtcbiAgICAgICAgICAgIC8vIEFzc2lnbiB3cmFwIGFyb3VuZCBvciBmYWxsIGJhY2sgdG8gYSBkZWZhdWx0XG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuYmNGbGlja2l0eU5leHQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy53cmFwQXJvdW5kID0gdGhpcy5iY0ZsaWNraXR5TmV4dDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMuRmxpY2tpdHlDb25maWcud3JhcEFyb3VuZCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLndyYXBBcm91bmQgPSB0aGlzLkZsaWNraXR5Q29uZmlnLndyYXBBcm91bmQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMud3JhcEFyb3VuZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5mbGlja2l0eUlkID0gbnVsbDtcblxuICAgICAgICAgICAgLy8gTWFrZSBzdXJlIHdlIGhhdmUgYW4gSURcbiAgICAgICAgICAgIHRoaXMuX3NldElkKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTZXQgSUQgdG8gd2hhdCBpcyBkZWZpbmVkLCBmYWxsYmFjayB0byBmaXJzdCBpbnN0YW5jZVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHJldHVybiB7U3RyaW5nfSBmbGlja2l0eUlkXHJcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ19zZXRJZCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBfc2V0SWQoKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIF90aGlzLiR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuYmNGbGlja2l0eUlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5mbGlja2l0eUlkID0gX3RoaXMuYmNGbGlja2l0eUlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoX3RoaXMuZmxpY2tpdHlJZCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy4kdGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuRmxpY2tpdHlTZXJ2aWNlLmdldEZpcnN0KCkudGhlbihmdW5jdGlvbiAoaW5zdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuZmxpY2tpdHlJZCA9IGluc3RhbmNlLmlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShfdGhpcy5mbGlja2l0eUlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuJGxvZy53YXJuKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gTmV4dENvbnRyb2xsZXI7XG59KCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvbmV4dC9uZXh0LmNvbnRyb2xsZXIuanNcbiAqKi8iLCJleHBvcnQgY2xhc3MgTmV4dENvbnRyb2xsZXIge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgICRsb2csICRxLCAkdGltZW91dCxcclxuICAgICAgICBGbGlja2l0eUNvbmZpZywgRmxpY2tpdHlTZXJ2aWNlXHJcbiAgICApIHtcclxuICAgICAgICAnbmdJbmplY3QnO1xyXG5cclxuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xyXG4gICAgICAgIHRoaXMuJHEgPSAkcTtcclxuICAgICAgICB0aGlzLiR0aW1lb3V0ID0gJHRpbWVvdXQ7XHJcbiAgICAgICAgdGhpcy5GbGlja2l0eUNvbmZpZyA9IEZsaWNraXR5Q29uZmlnO1xyXG4gICAgICAgIHRoaXMuRmxpY2tpdHlTZXJ2aWNlID0gRmxpY2tpdHlTZXJ2aWNlO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5fYWN0aXZhdGUoKTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgX2FjdGl2YXRlKCkge1xyXG4gICAgICAgIC8vIEFzc2lnbiB3cmFwIGFyb3VuZCBvciBmYWxsIGJhY2sgdG8gYSBkZWZhdWx0XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmJjRmxpY2tpdHlOZXh0ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICB0aGlzLndyYXBBcm91bmQgPSB0aGlzLmJjRmxpY2tpdHlOZXh0O1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMuRmxpY2tpdHlDb25maWcud3JhcEFyb3VuZCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgdGhpcy53cmFwQXJvdW5kID0gdGhpcy5GbGlja2l0eUNvbmZpZy53cmFwQXJvdW5kO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMud3JhcEFyb3VuZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmZsaWNraXR5SWQgPSBudWxsO1xyXG5cclxuICAgICAgICAvLyBNYWtlIHN1cmUgd2UgaGF2ZSBhbiBJRFxyXG4gICAgICAgIHRoaXMuX3NldElkKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IElEIHRvIHdoYXQgaXMgZGVmaW5lZCwgZmFsbGJhY2sgdG8gZmlyc3QgaW5zdGFuY2VcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9IGZsaWNraXR5SWRcclxuICAgICAqL1xyXG4gICAgX3NldElkKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmJjRmxpY2tpdHlJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmxpY2tpdHlJZCA9IHRoaXMuYmNGbGlja2l0eUlkO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRoaXMuZmxpY2tpdHlJZCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkZsaWNraXR5U2VydmljZS5nZXRGaXJzdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoaW5zdGFuY2UpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZsaWNraXR5SWQgPSBpbnN0YW5jZS5pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh0aGlzLmZsaWNraXR5SWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRsb2cud2FybihlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG59XHJcblxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBDOi9BcGFjaGUyNC9odGRvY3MvYW5ndWxhci1mbGlja2l0eS9+L2VzbGludC1sb2FkZXIhLi9zcmMvbmV4dC9uZXh0LmNvbnRyb2xsZXIuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuRmxpY2tpdHlQcmV2aW91c0RpcmVjdGl2ZSA9IEZsaWNraXR5UHJldmlvdXNEaXJlY3RpdmU7XG5cbnZhciBfcHJldmlvdXMgPSByZXF1aXJlKCcuL3ByZXZpb3VzLmNvbnRyb2xsZXInKTtcblxuZnVuY3Rpb24gRmxpY2tpdHlQcmV2aW91c0RpcmVjdGl2ZSgkbG9nLCAkdGltZW91dCwgJHJvb3RTY29wZSwgRmxpY2tpdHlDb25maWcsIEZsaWNraXR5U2VydmljZSkge1xuICAgICduZ0luamVjdCc7XG5cbiAgICB2YXIgZGlyZWN0aXZlID0ge1xuICAgICAgICByZXN0cmljdDogJ0EnLFxuICAgICAgICBzY29wZToge30sXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXI6IHtcbiAgICAgICAgICAgIGJjRmxpY2tpdHlQcmV2aW91czogJz0/JyxcbiAgICAgICAgICAgIGJjRmxpY2tpdHlJZDogJ0A/J1xuICAgICAgICB9LFxuICAgICAgICBjb21waWxlOiBmdW5jdGlvbiBjb21waWxlKCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBwcmU6IHByZUxpbmtGdW5jdGlvblxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgICAgY29udHJvbGxlcjogX3ByZXZpb3VzLlByZXZpb3VzQ29udHJvbGxlcixcbiAgICAgICAgY29udHJvbGxlckFzOiAndm0nXG4gICAgfTtcblxuICAgIHJldHVybiBkaXJlY3RpdmU7XG5cbiAgICAvKipcclxuICAgICAqIFByZSBMaW5rXHJcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBwcmVMaW5rRnVuY3Rpb24oJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkY29udHJvbGxlcikge1xuICAgICAgICAnbmdJbmplY3QnO1xuXG4gICAgICAgIC8vIEdldCB0aGUgSURcblxuICAgICAgICB2YXIgSUQgPSAkY29udHJvbGxlci5mbGlja2l0eUlkO1xuXG4gICAgICAgIC8vIERlZmluZSB0aGUgYnJvYWRjYXN0IG5hbWVzIHRvIGxpc3RlbiBmb3JcbiAgICAgICAgdmFyIHNlbGVjdEV2ZW50ID0gJ0ZsaWNraXR5OicgKyBJRCArICc6Y2VsbFNlbGVjdCc7XG4gICAgICAgIHZhciBzZXR0bGVFdmVudCA9ICdGbGlja2l0eTonICsgSUQgKyAnOnNldHRsZSc7XG5cbiAgICAgICAgLy8gTGlzdGVuXG4gICAgICAgIHZhciBjZWxsU2VsZWN0ID0gJHJvb3RTY29wZS4kb24oc2VsZWN0RXZlbnQsIGZ1bmN0aW9uIChldmVudCwgZGF0YSkge1xuICAgICAgICAgICAgX2Rpc2FibGVCdXR0b25JZk5lZWRlZChkYXRhLmluc3RhbmNlLnNlbGVjdGVkSW5kZXgpO1xuICAgICAgICB9KTtcbiAgICAgICAgdmFyIHNldHRsZSA9ICRyb290U2NvcGUuJG9uKHNldHRsZUV2ZW50LCBmdW5jdGlvbiAoZXZlbnQsIGRhdGEpIHtcbiAgICAgICAgICAgIF9kaXNhYmxlQnV0dG9uSWZOZWVkZWQoZGF0YS5pbnN0YW5jZS5zZWxlY3RlZEluZGV4KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJGVsZW1lbnQub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAvLyBNb3ZlIHRvIHRoZSBuZXh0IGNlbGxcbiAgICAgICAgICAgIEZsaWNraXR5U2VydmljZS5wcmV2aW91cygkY29udHJvbGxlci5mbGlja2l0eUlkLCAkY29udHJvbGxlci53cmFwQXJvdW5kKS50aGVuKGZ1bmN0aW9uIChpbnN0YW5jZSkge1xuICAgICAgICAgICAgICAgIF9kaXNhYmxlQnV0dG9uSWZOZWVkZWQoaW5zdGFuY2UuaW5zdGFuY2Uuc2VsZWN0ZWRJbmRleCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRGlzYWJsZSBidXR0b24gaWYgbmVlZGVkXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXhcclxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gX2Rpc2FibGVCdXR0b25JZk5lZWRlZChpbmRleCkge1xuICAgICAgICAgICAgLy8gRGlzYWJsZSBidXR0b24gaWYgYXQgdGhlIGJlZ2lubmluZyBhbmQgd2Ugc2hvdWxkbid0IHdyYXBcbiAgICAgICAgICAgIGlmICghJGNvbnRyb2xsZXIud3JhcEFyb3VuZCAmJiBpbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICRhdHRycy4kc2V0KCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkYXR0cnMuJHNldCgnZGlzYWJsZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcHJldmlvdXMvcHJldmlvdXMuZGlyZWN0aXZlLmpzXG4gKiovIiwiaW1wb3J0IHsgUHJldmlvdXNDb250cm9sbGVyIH0gZnJvbSAnLi9wcmV2aW91cy5jb250cm9sbGVyJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBGbGlja2l0eVByZXZpb3VzRGlyZWN0aXZlKFxyXG4gICAgJGxvZywgJHRpbWVvdXQsICRyb290U2NvcGUsXHJcbiAgICBGbGlja2l0eUNvbmZpZywgRmxpY2tpdHlTZXJ2aWNlXHJcbikge1xyXG4gICAgJ25nSW5qZWN0JztcclxuXHJcbiAgICBjb25zdCBkaXJlY3RpdmUgPSB7XHJcbiAgICAgICAgcmVzdHJpY3Q6ICdBJyxcclxuICAgICAgICBzY29wZToge30sXHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlcjoge1xyXG4gICAgICAgICAgICBiY0ZsaWNraXR5UHJldmlvdXM6ICc9PycsXHJcbiAgICAgICAgICAgIGJjRmxpY2tpdHlJZDogJ0A/JyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbXBpbGU6ICgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHByZTogcHJlTGlua0Z1bmN0aW9uLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29udHJvbGxlcjogUHJldmlvdXNDb250cm9sbGVyLFxyXG4gICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIGRpcmVjdGl2ZTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQcmUgTGlua1xyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBwcmVMaW5rRnVuY3Rpb24oXHJcbiAgICAgICAgJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkY29udHJvbGxlclxyXG4gICAgKSB7XHJcbiAgICAgICAgJ25nSW5qZWN0JztcclxuXHJcbiAgICAgICAgLy8gR2V0IHRoZSBJRFxyXG4gICAgICAgIGNvbnN0IElEID0gJGNvbnRyb2xsZXIuZmxpY2tpdHlJZDtcclxuXHJcbiAgICAgICAgLy8gRGVmaW5lIHRoZSBicm9hZGNhc3QgbmFtZXMgdG8gbGlzdGVuIGZvclxyXG4gICAgICAgIGNvbnN0IHNlbGVjdEV2ZW50ID0gYEZsaWNraXR5OiR7SUR9OmNlbGxTZWxlY3RgO1xyXG4gICAgICAgIGNvbnN0IHNldHRsZUV2ZW50ID0gYEZsaWNraXR5OiR7SUR9OnNldHRsZWA7XHJcblxyXG4gICAgICAgIC8vIExpc3RlblxyXG4gICAgICAgIGNvbnN0IGNlbGxTZWxlY3QgPSAkcm9vdFNjb3BlLiRvbihzZWxlY3RFdmVudCwgKGV2ZW50LCBkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIF9kaXNhYmxlQnV0dG9uSWZOZWVkZWQoZGF0YS5pbnN0YW5jZS5zZWxlY3RlZEluZGV4KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCBzZXR0bGUgPSAkcm9vdFNjb3BlLiRvbihzZXR0bGVFdmVudCwgKGV2ZW50LCBkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIF9kaXNhYmxlQnV0dG9uSWZOZWVkZWQoZGF0YS5pbnN0YW5jZS5zZWxlY3RlZEluZGV4KTtcclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICRlbGVtZW50Lm9uKCdjbGljaycsICgpID0+IHtcclxuXHJcbiAgICAgICAgICAgIC8vIE1vdmUgdG8gdGhlIG5leHQgY2VsbFxyXG4gICAgICAgICAgICBGbGlja2l0eVNlcnZpY2UucHJldmlvdXMoJGNvbnRyb2xsZXIuZmxpY2tpdHlJZCwgJGNvbnRyb2xsZXIud3JhcEFyb3VuZClcclxuICAgICAgICAgICAgICAgIC50aGVuKChpbnN0YW5jZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIF9kaXNhYmxlQnV0dG9uSWZOZWVkZWQoaW5zdGFuY2UuaW5zdGFuY2Uuc2VsZWN0ZWRJbmRleCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICA7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEaXNhYmxlIGJ1dHRvbiBpZiBuZWVkZWRcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIF9kaXNhYmxlQnV0dG9uSWZOZWVkZWQoaW5kZXgpIHtcclxuICAgICAgICAgICAgLy8gRGlzYWJsZSBidXR0b24gaWYgYXQgdGhlIGJlZ2lubmluZyBhbmQgd2Ugc2hvdWxkbid0IHdyYXBcclxuICAgICAgICAgICAgaWYgKCEkY29udHJvbGxlci53cmFwQXJvdW5kICYmIGluZGV4ID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAkYXR0cnMuJHNldCgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICRhdHRycy4kc2V0KCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG5cclxufVxyXG5cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogQzovQXBhY2hlMjQvaHRkb2NzL2FuZ3VsYXItZmxpY2tpdHkvfi9lc2xpbnQtbG9hZGVyIS4vc3JjL3ByZXZpb3VzL3ByZXZpb3VzLmRpcmVjdGl2ZS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgUHJldmlvdXNDb250cm9sbGVyID0gZXhwb3J0cy5QcmV2aW91c0NvbnRyb2xsZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUHJldmlvdXNDb250cm9sbGVyKCRsb2csICRxLCAkdGltZW91dCwgRmxpY2tpdHlDb25maWcsIEZsaWNraXR5U2VydmljZSkge1xuICAgICAgICAnbmdJbmplY3QnO1xuXG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBQcmV2aW91c0NvbnRyb2xsZXIpO1xuXG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgICAgIHRoaXMuJHEgPSAkcTtcbiAgICAgICAgdGhpcy4kdGltZW91dCA9ICR0aW1lb3V0O1xuICAgICAgICB0aGlzLkZsaWNraXR5Q29uZmlnID0gRmxpY2tpdHlDb25maWc7XG4gICAgICAgIHRoaXMuRmxpY2tpdHlTZXJ2aWNlID0gRmxpY2tpdHlTZXJ2aWNlO1xuXG4gICAgICAgIHRoaXMuX2FjdGl2YXRlKCk7XG4gICAgfVxuXG4gICAgX2NyZWF0ZUNsYXNzKFByZXZpb3VzQ29udHJvbGxlciwgW3tcbiAgICAgICAga2V5OiAnX2FjdGl2YXRlJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIF9hY3RpdmF0ZSgpIHtcbiAgICAgICAgICAgIC8vIEFzc2lnbiB3cmFwIGFyb3VuZCBvciBmYWxsIGJhY2sgdG8gYSBkZWZhdWx0XG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuYmNGbGlja2l0eVByZXZpb3VzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHRoaXMud3JhcEFyb3VuZCA9IHRoaXMuYmNGbGlja2l0eVByZXZpb3VzO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy5GbGlja2l0eUNvbmZpZy53cmFwQXJvdW5kICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHRoaXMud3JhcEFyb3VuZCA9IHRoaXMuRmxpY2tpdHlDb25maWcud3JhcEFyb3VuZDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy53cmFwQXJvdW5kID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmZsaWNraXR5SWQgPSBudWxsO1xuXG4gICAgICAgICAgICAvLyBNYWtlIHN1cmUgd2UgaGF2ZSBhbiBJRFxuICAgICAgICAgICAgdGhpcy5fc2V0SWQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFNldCBJRCB0byB3aGF0IGlzIGRlZmluZWQsIGZhbGxiYWNrIHRvIGZpcnN0IGluc3RhbmNlXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcmV0dXJuIHtTdHJpbmd9IGZsaWNraXR5SWRcclxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnX3NldElkJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIF9zZXRJZCgpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5iY0ZsaWNraXR5SWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmZsaWNraXR5SWQgPSBfdGhpcy5iY0ZsaWNraXR5SWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShfdGhpcy5mbGlja2l0eUlkKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLiR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5GbGlja2l0eVNlcnZpY2UuZ2V0Rmlyc3QoKS50aGVuKGZ1bmN0aW9uIChpbnN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5mbGlja2l0eUlkID0gaW5zdGFuY2UuaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKF90aGlzLmZsaWNraXR5SWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy4kbG9nLndhcm4oZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBQcmV2aW91c0NvbnRyb2xsZXI7XG59KCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcHJldmlvdXMvcHJldmlvdXMuY29udHJvbGxlci5qc1xuICoqLyIsImV4cG9ydCBjbGFzcyBQcmV2aW91c0NvbnRyb2xsZXIge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgICRsb2csICRxLCAkdGltZW91dCxcclxuICAgICAgICBGbGlja2l0eUNvbmZpZywgRmxpY2tpdHlTZXJ2aWNlXHJcbiAgICApIHtcclxuICAgICAgICAnbmdJbmplY3QnO1xyXG5cclxuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xyXG4gICAgICAgIHRoaXMuJHEgPSAkcTtcclxuICAgICAgICB0aGlzLiR0aW1lb3V0ID0gJHRpbWVvdXQ7XHJcbiAgICAgICAgdGhpcy5GbGlja2l0eUNvbmZpZyA9IEZsaWNraXR5Q29uZmlnO1xyXG4gICAgICAgIHRoaXMuRmxpY2tpdHlTZXJ2aWNlID0gRmxpY2tpdHlTZXJ2aWNlO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5fYWN0aXZhdGUoKTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgX2FjdGl2YXRlKCkge1xyXG4gICAgICAgIC8vIEFzc2lnbiB3cmFwIGFyb3VuZCBvciBmYWxsIGJhY2sgdG8gYSBkZWZhdWx0XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmJjRmxpY2tpdHlQcmV2aW91cyAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgdGhpcy53cmFwQXJvdW5kID0gdGhpcy5iY0ZsaWNraXR5UHJldmlvdXM7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy5GbGlja2l0eUNvbmZpZy53cmFwQXJvdW5kICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICB0aGlzLndyYXBBcm91bmQgPSB0aGlzLkZsaWNraXR5Q29uZmlnLndyYXBBcm91bmQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy53cmFwQXJvdW5kID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZmxpY2tpdHlJZCA9IG51bGw7XHJcblxyXG4gICAgICAgIC8vIE1ha2Ugc3VyZSB3ZSBoYXZlIGFuIElEXHJcbiAgICAgICAgdGhpcy5fc2V0SWQoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgSUQgdG8gd2hhdCBpcyBkZWZpbmVkLCBmYWxsYmFjayB0byBmaXJzdCBpbnN0YW5jZVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge1N0cmluZ30gZmxpY2tpdHlJZFxyXG4gICAgICovXHJcbiAgICBfc2V0SWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYmNGbGlja2l0eUlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mbGlja2l0eUlkID0gdGhpcy5iY0ZsaWNraXR5SWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodGhpcy5mbGlja2l0eUlkKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuRmxpY2tpdHlTZXJ2aWNlLmdldEZpcnN0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChpbnN0YW5jZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmxpY2tpdHlJZCA9IGluc3RhbmNlLmlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRoaXMuZmxpY2tpdHlJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGxvZy53YXJuKGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuXHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEM6L0FwYWNoZTI0L2h0ZG9jcy9hbmd1bGFyLWZsaWNraXR5L34vZXNsaW50LWxvYWRlciEuL3NyYy9wcmV2aW91cy9wcmV2aW91cy5jb250cm9sbGVyLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==