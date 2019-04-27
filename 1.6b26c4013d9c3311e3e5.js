(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./crate/pkg/sandtable.js":
/*!********************************!*\
  !*** ./crate/pkg/sandtable.js ***!
  \********************************/
/*! exports provided: Species, __wbg_random_58bd29ed438c19c0, __wbindgen_throw, Cell, Universe, Wind, __wbindgen_object_drop_ref */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Species", function() { return Species; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__wbg_random_58bd29ed438c19c0", function() { return __wbg_random_58bd29ed438c19c0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__wbindgen_throw", function() { return __wbindgen_throw; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Cell", function() { return Cell; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Universe", function() { return Universe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Wind", function() { return Wind; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__wbindgen_object_drop_ref", function() { return __wbindgen_object_drop_ref; });
/* harmony import */ var _sandtable_bg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sandtable_bg */ "./crate/pkg/sandtable_bg.wasm");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


/**
*/

var Species = Object.freeze({
  Empty: 0,
  Wall: 1,
  Sand: 2,
  Water: 3,
  Stone: 13,
  Ice: 9,
  Gas: 4,
  Cloner: 5,
  Mite: 15,
  Wood: 7,
  Plant: 11,
  Fungus: 18,
  Seed: 19,
  Fire: 6,
  Lava: 8,
  Acid: 12,
  Dust: 14,
  Oil: 16,
  Firework: 17
});

function _assertNum(n) {
  if (typeof n !== 'number') throw new Error('expected a number argument');
}

function __wbg_random_58bd29ed438c19c0() {
  try {
    return Math.random();
  } catch (e) {
    console.error("wasm-bindgen: imported JS function that was not marked as `catch` threw an error:", e);
    throw e;
  }
}
var cachedTextDecoder = new TextDecoder('utf-8');
var cachegetUint8Memory = null;

function getUint8Memory() {
  if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== _sandtable_bg__WEBPACK_IMPORTED_MODULE_0__["memory"].buffer) {
    cachegetUint8Memory = new Uint8Array(_sandtable_bg__WEBPACK_IMPORTED_MODULE_0__["memory"].buffer);
  }

  return cachegetUint8Memory;
}

function getStringFromWasm(ptr, len) {
  return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}

function __wbindgen_throw(ptr, len) {
  throw new Error(getStringFromWasm(ptr, len));
}

function freeCell(ptr) {
  _sandtable_bg__WEBPACK_IMPORTED_MODULE_0__["__wbg_cell_free"](ptr);
}
/**
*/


var Cell =
/*#__PURE__*/
function () {
  function Cell() {
    _classCallCheck(this, Cell);

    throw new Error('cannot invoke `new` directly');
  }

  _createClass(Cell, [{
    key: "free",
    value: function free() {
      var ptr = this.ptr;
      this.ptr = 0;
      freeCell(ptr);
    }
  }]);

  return Cell;
}();

function freeUniverse(ptr) {
  _sandtable_bg__WEBPACK_IMPORTED_MODULE_0__["__wbg_universe_free"](ptr);
}
/**
*/


var Universe =
/*#__PURE__*/
function () {
  function Universe() {
    _classCallCheck(this, Universe);

    throw new Error('cannot invoke `new` directly');
  }

  _createClass(Universe, [{
    key: "free",
    value: function free() {
      var ptr = this.ptr;
      this.ptr = 0;
      freeUniverse(ptr);
    }
    /**
    * @returns {void}
    */

  }, {
    key: "reset",
    value: function reset() {
      if (this.ptr === 0) {
        throw new Error('Attempt to use a moved value');
      }

      return _sandtable_bg__WEBPACK_IMPORTED_MODULE_0__["universe_reset"](this.ptr);
    }
    /**
    * @returns {void}
    */

  }, {
    key: "tick",
    value: function tick() {
      if (this.ptr === 0) {
        throw new Error('Attempt to use a moved value');
      }

      return _sandtable_bg__WEBPACK_IMPORTED_MODULE_0__["universe_tick"](this.ptr);
    }
    /**
    * @returns {number}
    */

  }, {
    key: "width",
    value: function width() {
      if (this.ptr === 0) {
        throw new Error('Attempt to use a moved value');
      }

      return _sandtable_bg__WEBPACK_IMPORTED_MODULE_0__["universe_width"](this.ptr);
    }
    /**
    * @returns {number}
    */

  }, {
    key: "height",
    value: function height() {
      if (this.ptr === 0) {
        throw new Error('Attempt to use a moved value');
      }

      return _sandtable_bg__WEBPACK_IMPORTED_MODULE_0__["universe_height"](this.ptr);
    }
    /**
    * @returns {number}
    */

  }, {
    key: "cells",
    value: function cells() {
      if (this.ptr === 0) {
        throw new Error('Attempt to use a moved value');
      }

      return _sandtable_bg__WEBPACK_IMPORTED_MODULE_0__["universe_cells"](this.ptr);
    }
    /**
    * @returns {number}
    */

  }, {
    key: "winds",
    value: function winds() {
      if (this.ptr === 0) {
        throw new Error('Attempt to use a moved value');
      }

      return _sandtable_bg__WEBPACK_IMPORTED_MODULE_0__["universe_winds"](this.ptr);
    }
    /**
    * @returns {number}
    */

  }, {
    key: "burns",
    value: function burns() {
      if (this.ptr === 0) {
        throw new Error('Attempt to use a moved value');
      }

      return _sandtable_bg__WEBPACK_IMPORTED_MODULE_0__["universe_burns"](this.ptr);
    }
    /**
    * @param {number} x
    * @param {number} y
    * @param {number} size
    * @param {number} species
    * @returns {void}
    */

  }, {
    key: "paint",
    value: function paint(x, y, size, species) {
      if (this.ptr === 0) {
        throw new Error('Attempt to use a moved value');
      }

      _assertNum(x);

      _assertNum(y);

      _assertNum(size);

      _assertNum(species);

      return _sandtable_bg__WEBPACK_IMPORTED_MODULE_0__["universe_paint"](this.ptr, x, y, size, species);
    }
    /**
    * @returns {void}
    */

  }, {
    key: "push_undo",
    value: function push_undo() {
      if (this.ptr === 0) {
        throw new Error('Attempt to use a moved value');
      }

      return _sandtable_bg__WEBPACK_IMPORTED_MODULE_0__["universe_push_undo"](this.ptr);
    }
    /**
    * @returns {void}
    */

  }, {
    key: "pop_undo",
    value: function pop_undo() {
      if (this.ptr === 0) {
        throw new Error('Attempt to use a moved value');
      }

      return _sandtable_bg__WEBPACK_IMPORTED_MODULE_0__["universe_pop_undo"](this.ptr);
    }
    /**
    * @returns {void}
    */

  }, {
    key: "flush_undos",
    value: function flush_undos() {
      if (this.ptr === 0) {
        throw new Error('Attempt to use a moved value');
      }

      return _sandtable_bg__WEBPACK_IMPORTED_MODULE_0__["universe_flush_undos"](this.ptr);
    }
    /**
    * @param {number} width
    * @param {number} height
    * @returns {Universe}
    */

  }], [{
    key: "__wrap",
    value: function __wrap(ptr) {
      var obj = Object.create(Universe.prototype);
      obj.ptr = ptr;
      return obj;
    }
  }, {
    key: "new",
    value: function _new(width, height) {
      _assertNum(width);

      _assertNum(height);

      return Universe.__wrap(_sandtable_bg__WEBPACK_IMPORTED_MODULE_0__["universe_new"](width, height));
    }
  }]);

  return Universe;
}();

function freeWind(ptr) {
  _sandtable_bg__WEBPACK_IMPORTED_MODULE_0__["__wbg_wind_free"](ptr);
}
/**
*/


var Wind =
/*#__PURE__*/
function () {
  function Wind() {
    _classCallCheck(this, Wind);

    throw new Error('cannot invoke `new` directly');
  }

  _createClass(Wind, [{
    key: "free",
    value: function free() {
      var ptr = this.ptr;
      this.ptr = 0;
      freeWind(ptr);
    }
  }]);

  return Wind;
}();
var heap = new Array(32);
heap.fill(undefined);
heap.push(undefined, null, true, false);
var heap_next = heap.length;

function dropObject(idx) {
  if (idx < 36) return;
  heap[idx] = heap_next;
  heap_next = idx;
}

function __wbindgen_object_drop_ref(i) {
  dropObject(i);
}

/***/ }),

/***/ "./crate/pkg/sandtable_bg.wasm":
/*!*************************************!*\
  !*** ./crate/pkg/sandtable_bg.wasm ***!
  \*************************************/
/*! exports provided: memory, __rustc_debug_gdb_scripts_section__, __wbg_wind_free, __wbg_cell_free, __wbg_universe_free, universe_reset, universe_tick, universe_width, universe_height, universe_cells, universe_winds, universe_burns, universe_paint, universe_push_undo, universe_pop_undo, universe_flush_undos, universe_new */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Instantiate WebAssembly module
var wasmExports = __webpack_require__.w[module.i];
__webpack_require__.r(exports);
// export exports from WebAssembly module
for(var name in wasmExports) if(name != "__webpack_init__") exports[name] = wasmExports[name];
// exec imports from WebAssembly module (for esm order)
/* harmony import */ var m0 = __webpack_require__(/*! ./sandtable */ "./crate/pkg/sandtable.js");


// exec wasm module
wasmExports["__webpack_init__"]()

/***/ }),

/***/ "./js/api.js":
/*!*******************!*\
  !*** ./js/api.js ***!
  \*******************/
/*! exports provided: functions, storage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "functions", function() { return functions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "storage", function() { return storage; });
var storage;
var functions;

try {
  storage = firebase.storage();
  functions = firebase.functions();
} catch (e) {}

window.onload = function () {
  functions = firebase.functions();
  storage = firebase.storage();
};



/***/ }),

/***/ "./js/app.js":
/*!*******************!*\
  !*** ./js/app.js ***!
  \*******************/
/*! exports provided: sizeMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sizeMap", function() { return sizeMap; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _components_info__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/info */ "./js/components/info.js");
/* harmony import */ var _components_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/ui */ "./js/components/ui.js");
/* harmony import */ var _components_browse__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/browse */ "./js/components/browse.js");
/* harmony import */ var _components_menu__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/menu */ "./js/components/menu.js");







var sizeMap = [2, 5, 10, 18, 30, 45];

function BrowseRouter(_ref) {
  var match = _ref.match,
      location = _ref.location;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_menu__WEBPACK_IMPORTED_MODULE_6__["default"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_browse__WEBPACK_IMPORTED_MODULE_5__["default"], {
    location: location
  }));
}

function AppRouter() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["BrowserRouter"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], {
    path: "/",
    component: _components_ui__WEBPACK_IMPORTED_MODULE_4__["Index"]
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], {
    exact: true,
    path: "/info/",
    component: function component() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_menu__WEBPACK_IMPORTED_MODULE_6__["default"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_info__WEBPACK_IMPORTED_MODULE_3__["default"], null));
    }
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], {
    path: "/browse",
    component: BrowseRouter
  }));
}

react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(AppRouter, null), document.getElementById("ui"));


/***/ }),

/***/ "./js/components/browse.js":
/*!*********************************!*\
  !*** ./js/components/browse.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _hypertext_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./hypertext.js */ "./js/components/hypertext.js");
/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../api.js */ "./js/api.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


 // import timeago from "timeago.js";


 // const ago = timeago();

var storageUrl = "https://firebasestorage.googleapis.com/v0/b/sandtable-8d0f7.appspot.com/o/creations%2F";

var Submissions =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Submissions, _React$Component);

  function Submissions() {
    _classCallCheck(this, Submissions);

    return _possibleConstructorReturn(this, _getPrototypeOf(Submissions).apply(this, arguments));
  }

  _createClass(Submissions, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      var _this$props = this.props,
          submissions = _this$props.submissions,
          browseVotes = _this$props.browseVotes;
      return nextProps.submissions !== submissions || Object.keys(nextProps.browseVotes).length !== Object.keys(browseVotes).length;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          submissions = _this$props2.submissions,
          voteFromBrowse = _this$props2.voteFromBrowse,
          browseVotes = _this$props2.browseVotes;

      if (!submissions) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          style: {
            height: "90vh"
          }
        }, "Loading Submissions...");
      }

      if (submissions.length == 0) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          style: {
            height: "90vh"
          }
        }, "Didn't find anything!");
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "submissions"
      }, submissions.map(function (submission) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          key: submission.id,
          className: "submission"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
          className: "img-link",
          to: {
            pathname: "/",
            hash: "#".concat(submission.id)
          },
          onClick: function onClick() {
            window.UI.setState(function () {
              return {
                currentSubmission: null
              };
            }, window.UI.load);
          }
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
          src: "".concat(storageUrl).concat(submission.data.id, ".png?alt=media")
        })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          style: {
            width: "50%"
          }
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
          style: {
            flexGrow: 1,
            wordWrap: "break-word"
          }
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_hypertext_js__WEBPACK_IMPORTED_MODULE_2__["default"], {
          text: submission.data.title
        })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
          onClick: function onClick() {
            return voteFromBrowse(submission);
          }
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          className: "heart"
        }, browseVotes[submission.id] ? "🖤" : "♡"), browseVotes[submission.id] || submission.data.score), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", null, new Date(submission.data.timestamp).toLocaleDateString(), new Date(submission.data.timestamp)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
          to: {
            pathname: "/",
            hash: "#".concat(submission.id)
          },
          onClick: function onClick() {
            window.UI.setState(function () {
              return {
                currentSubmission: null
              };
            }, window.UI.load);
          }
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
          className: "load"
        }, "Load"))));
      }));
    }
  }]);

  return Submissions;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

var Browse =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(Browse, _React$Component2);

  function Browse(props) {
    var _this;

    _classCallCheck(this, Browse);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Browse).call(this, props));
    _this.state = {
      paused: false,
      submitting: false,
      dataURL: {},
      submissions: null,
      browseVotes: {},
      search: ""
    };
    return _this;
  }

  _createClass(Browse, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      console.log("mounted");
      this.loadSubmissions();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.location.pathname != this.props.location.pathname || prevProps.location.search != this.props.location.search) {
        this.loadSubmissions();
      }
    }
  }, {
    key: "togglePause",
    value: function togglePause() {
      window.paused = !this.state.paused;
      this.setState({
        paused: !this.state.paused
      });
    }
  }, {
    key: "setSize",
    value: function setSize(event, size) {
      event.preventDefault();
      this.setState({
        size: size
      });
    }
  }, {
    key: "loadSubmissions",
    value: function loadSubmissions() {
      var _this2 = this;

      var location = this.props.location;

      if (location.search.startsWith("?title=")) {
        // to load deep urls with a search query.
        this.setState({
          search: this.props.location.search.slice(7)
        });
      }

      var param = "";

      if (location.pathname.startsWith("/browse/top/")) {
        param = "?q=score";
      }

      if (location.pathname.startsWith("/browse/top-recent/")) {
        param = "?q=toprecent";
      }

      if (location.pathname.startsWith("/browse/search/")) {
        param = location.search;
      }

      this.setState({
        submissions: null
      });
      fetch(_api_js__WEBPACK_IMPORTED_MODULE_3__["functions"]._url("api/creations") + param, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(function (res) {
        return res.json();
      }).then(function (response) {
        _this2.setState({
          submissions: response
        }); // this.pause();

      })["catch"](function (error) {
        _this2.setState({
          submissions: false
        });

        console.error("Error:", error);
      });
    }
  }, {
    key: "voteFromBrowse",
    value: function voteFromBrowse(submission) {
      var _this3 = this;

      // creations/:id/vote
      fetch(_api_js__WEBPACK_IMPORTED_MODULE_3__["functions"]._url("api/creations/".concat(submission.id, "/vote")), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(function (res) {
        return res.json();
      }).then(function (data) {
        _this3.setState(function (_ref) {
          var browseVotes = _ref.browseVotes;
          return {
            browseVotes: _objectSpread(_defineProperty({}, submission.id, data.score), browseVotes)
          };
        });
      })["catch"](function (e) {
        console.log(e);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$state = this.state,
          search = _this$state.search,
          submissions = _this$state.submissions,
          browseVotes = _this$state.browseVotes;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["NavLink"], {
        exact: true,
        to: "/browse/"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", null, "New")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["NavLink"], {
        to: "/browse/top-recent/"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", null, "Top Recent")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["NavLink"], {
        to: "/browse/top/"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", null, "Top All Time")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        style: {
          display: "inline-block"
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        value: search,
        onChange: function onChange(e) {
          return _this4.setState({
            search: e.target.value
          });
        },
        onKeyDown: function onKeyDown(e) {
          return e.keyCode == 13 && _this4.props.history.push("/browse/search/?title=".concat(search));
        },
        placeholder: "search"
      }), search && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["NavLink"], {
        to: {
          pathname: "/browse/search/",
          search: "?title=".concat(search)
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", null, "Search"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Submissions, {
        submissions: submissions,
        voteFromBrowse: function voteFromBrowse(submission) {
          return _this4.voteFromBrowse(submission);
        },
        browseVotes: browseVotes
      }));
    }
  }]);

  return Browse;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (Object(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["withRouter"])(Browse));

/***/ }),

/***/ "./js/components/hypertext.js":
/*!************************************!*\
  !*** ./js/components/hypertext.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");



var HyperText = function HyperText(_ref) {
  var text = _ref.text;
  var tokens = text.split(" ");
  var nodes = tokens.map(function (t, i) {
    if (t.startsWith("#") && t.length > 1) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, {
        key: i
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
        to: {
          pathname: "/browse/search/",
          search: "?title=".concat(t.slice(1))
        }
      }, t), " ");
    } else {
      return t + " ";
    }
  });
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, nodes);
};

/* harmony default export */ __webpack_exports__["default"] = (HyperText);

/***/ }),

/***/ "./js/components/info.js":
/*!*******************************!*\
  !*** ./js/components/info.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


var Info = function Info() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "Info"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "sandspiel "), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Created by ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "https://maxbittker.com"
  }, "max bittker")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Welcome, and thanks for coming by! I hope that you enjoy exploring this small game, and it brings you some calm.", " "), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Growing up, \"falling sand\" games like this one provided me hours of entertainment and imagination. I want to particularly thank ha55ii's", " ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "https://dan-ball.jp/en/javagame/dust/"
  }, "Powder Game"), " as the primary inspiration for sandspiel."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "You can follow sandspiel on twitter for updates and new uploads:", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "https://twitter.com/sandspiel_feed"
  }, "@sandspiel_feed")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "If you'd like, you can view the", " ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "https://github.com/maxbittker/sandspiel"
  }, "source code"), " or", " ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "https://github.com/maxbittker/sandspiel/issues"
  }, "report bugs"), " ", "on github"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "FAQs"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "(TODO: write some FAQs)"), "If you have any other questions, feel free to reach out on twitter and I'll try to answer!", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "Element Information:"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", null, "Wall "), "Indestructible", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", null, "Sand "), "Sinks in water", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", null, "Water "), "Puts out fire", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", null, "Stone "), "Forms arches, folds under pressure", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", null, "Ice "), "Freezes Water, slippery!", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", null, "Gas "), "Highly Flammable!", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", null, "Cloner "), "Copies the first element it touches", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", null, "Mite "), "Eats wood and plant, but loves dust! Slides on ice", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", null, "Wood "), "Sturdy, but biodegradable", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", null, "Plant "), "Thrives in wet enviroments", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", null, "Fungus "), "Spreads over everything", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", null, "Seed "), "Grows in sand", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", null, "Fire "), "Hot!", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", null, "Lava "), "Flammable and heavy", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", null, "Acid "), "Corrodes other elements", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", null, "Dust "), "Pretty, but dangerously explosive", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", null, "Oil "), "Produces smoke", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", null, "Firework "), "Explodes into copies of the first element it touches");
};

/* harmony default export */ __webpack_exports__["default"] = (Info);

/***/ }),

/***/ "./js/components/menu.js":
/*!*******************************!*\
  !*** ./js/components/menu.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");



var Menu = function Menu(_ref) {
  var close = _ref.close,
      children = _ref.children;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "menu-scrim"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "menu"
  }, children, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
    to: "/",
    className: "x",
    onClick: close
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", null, " x"))));
};

/* harmony default export */ __webpack_exports__["default"] = (Menu);

/***/ }),

/***/ "./js/components/ui.js":
/*!*****************************!*\
  !*** ./js/components/ui.js ***!
  \*****************************/
/*! exports provided: sizeMap, Index */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sizeMap", function() { return sizeMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Index", function() { return Index; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _crate_pkg_sandtable_bg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../crate/pkg/sandtable_bg */ "./crate/pkg/sandtable_bg.wasm");
/* harmony import */ var _crate_pkg_sandtable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../crate/pkg/sandtable */ "./crate/pkg/sandtable.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../index.js */ "./js/index.js");
/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../render.js */ "./js/render.js");
/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../api.js */ "./js/api.js");
/* harmony import */ var _menu__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./menu */ "./js/components/menu.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }










var ElementButton = function ElementButton(name, selectedElement, setElement) {
  var elementID = _crate_pkg_sandtable__WEBPACK_IMPORTED_MODULE_3__["Species"][name];
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    className: elementID == selectedElement ? "selected" : "",
    key: name,
    onClick: function onClick() {
      setElement(elementID);
    }
  }, "  ", name, "  ");
};

var sizeMap = [2, 5, 10, 18, 30, 45];

var Index =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Index, _React$Component);

  function Index(props) {
    var _this;

    _classCallCheck(this, Index);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Index).call(this, props));
    _this.state = {
      submissionMenuOpen: false,
      paused: false,
      submitting: false,
      size: 2,
      dataURL: {},
      currentSubmission: null,
      selectedElement: _crate_pkg_sandtable__WEBPACK_IMPORTED_MODULE_3__["Species"].Water
    };
    window.UI = _assertThisInitialized(_this); //if we start in the background, pause;

    if (_this.props.location.pathname !== "/") {
      window.setTimeout(function () {
        return _this.pause();
      }, 50);
    }

    _this.load();

    return _this;
  }

  _createClass(Index, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.location.pathname === "/" && prevProps.location.pathname !== "/" && this.state.currentSubmission) {
        window.location = "#".concat(this.state.currentSubmission.id);
        return;
      }

      if (prevProps.location.hash === "" || prevProps.location.hash != this.props.location.hash) {
        this.load();
      }
    }
  }, {
    key: "togglePause",
    value: function togglePause() {
      window.paused = !this.state.paused;
      this.setState({
        paused: !this.state.paused
      });
    }
  }, {
    key: "play",
    value: function play() {
      window.paused = false;
      this.setState({
        paused: false
      });
    }
  }, {
    key: "pause",
    value: function pause() {
      window.paused = true;
      this.setState({
        paused: true
      });
    }
  }, {
    key: "setSize",
    value: function setSize(event, size) {
      event.preventDefault();
      this.setState({
        size: size
      });
    }
  }, {
    key: "reset",
    value: function reset() {
      if (window.confirm("Reset?")) {
        this.play();
        window.location = "#";
        this.setState({
          currentSubmission: null
        });

        Object(_index_js__WEBPACK_IMPORTED_MODULE_4__["reset"])();
      }
    }
  }, {
    key: "menu",
    value: function menu() {
      this.pause();
      this.setState({
        submissionMenuOpen: true
      });
    }
  }, {
    key: "closeMenu",
    value: function closeMenu() {
      this.play();
      this.setState({
        submissionMenuOpen: false
      });
    }
  }, {
    key: "upload",
    value: function upload() {
      var dataURL = Object(_render_js__WEBPACK_IMPORTED_MODULE_5__["snapshot"])(_index_js__WEBPACK_IMPORTED_MODULE_4__["universe"]);
      var cells = new Uint8Array(_crate_pkg_sandtable_bg__WEBPACK_IMPORTED_MODULE_2__["memory"].buffer, _index_js__WEBPACK_IMPORTED_MODULE_4__["universe"].cells(), _index_js__WEBPACK_IMPORTED_MODULE_4__["width"] * _index_js__WEBPACK_IMPORTED_MODULE_4__["height"] * 4); // Create canvas

      var canvas = document.createElement("canvas"),
          context = canvas.getContext("2d"),
          imgData = context.createImageData(_index_js__WEBPACK_IMPORTED_MODULE_4__["width"], _index_js__WEBPACK_IMPORTED_MODULE_4__["height"]);
      canvas.height = _index_js__WEBPACK_IMPORTED_MODULE_4__["height"];
      canvas.width = _index_js__WEBPACK_IMPORTED_MODULE_4__["width"]; // fill imgData with data from cells

      for (var i = 0; i < _index_js__WEBPACK_IMPORTED_MODULE_4__["width"] * _index_js__WEBPACK_IMPORTED_MODULE_4__["height"] * 4; i++) {
        if (i % 4 == 3) {
          imgData.data[i] = 255;
        } else {
          imgData.data[i] = cells[i];
        }
      } // put data to context at (0, 0)


      context.putImageData(imgData, 0, 0);
      var cellData = canvas.toDataURL("image/png");
      this.pause();
      this.setState({
        data: {
          dataURL: dataURL,
          cells: cellData
        },
        submissionMenuOpen: true
      });
    }
  }, {
    key: "submit",
    value: function submit() {
      var _this2 = this;

      var _this$state = this.state,
          title = _this$state.title,
          data = _this$state.data;
      var dataURL = data.dataURL,
          cells = data.cells;
      var payload = {
        title: title,
        image: dataURL,
        cells: cells
      };
      this.setState({
        submitting: true
      });
      fetch(_api_js__WEBPACK_IMPORTED_MODULE_6__["functions"]._url("api/creations"), {
        method: "POST",
        body: JSON.stringify(payload),
        // data can be `string` or {object}!
        headers: {
          "Content-Type": "application/json"
        }
      }).then(function (res) {
        return res.json();
      }).then(function (response) {
        console.log("Success:", JSON.stringify(response));

        _this2.play();
      })["catch"](function (error) {
        return console.error("Error:", error);
      }).then(function () {
        _this2.setState({
          submissionMenuOpen: false,
          submitting: false
        });
      });
    }
  }, {
    key: "load",
    value: function load() {
      var _this3 = this;

      var location = this.props.location;
      var id = location.hash.replace(/#/, "");

      if (id === "") {
        return;
      }

      if (this.state.currentSubmission && this.state.currentSubmission.id == id) {
        return;
      }

      fetch(_api_js__WEBPACK_IMPORTED_MODULE_6__["functions"]._url("api/creations/".concat(id)), {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(function (res) {
        return res.json();
      }).then(function (data) {
        _api_js__WEBPACK_IMPORTED_MODULE_6__["storage"].refFromURL("gs://sandtable-8d0f7.appspot.com/creations/".concat(data.id, ".data.png")).getDownloadURL().then(function (dlurl) {
          fetch(dlurl, {
            method: "GET"
          }).then(function (res) {
            return res.blob();
          }).then(function (blob) {
            // console.log(response);
            _this3.setState({
              currentSubmission: {
                id: id,
                data: data
              }
            });

            var url = URL.createObjectURL(blob);
            var img = new Image();
            img.src = url;

            img.onload = function () {
              var canvas = document.createElement("canvas");
              canvas.width = _index_js__WEBPACK_IMPORTED_MODULE_4__["width"];
              canvas.height = _index_js__WEBPACK_IMPORTED_MODULE_4__["height"];
              var ctx = canvas.getContext("2d");
              ctx.drawImage(img, 0, 0);
              var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
              var cellsData = new Uint8Array(_crate_pkg_sandtable_bg__WEBPACK_IMPORTED_MODULE_2__["memory"].buffer, _index_js__WEBPACK_IMPORTED_MODULE_4__["universe"].cells(), _index_js__WEBPACK_IMPORTED_MODULE_4__["width"] * _index_js__WEBPACK_IMPORTED_MODULE_4__["height"] * 4);

              Object(_index_js__WEBPACK_IMPORTED_MODULE_4__["reset"])();

              for (var i = 0; i < _index_js__WEBPACK_IMPORTED_MODULE_4__["width"] * _index_js__WEBPACK_IMPORTED_MODULE_4__["height"] * 4; i++) {
                cellsData[i] = imgData.data[i];
              }

              _index_js__WEBPACK_IMPORTED_MODULE_4__["universe"].flush_undos();
              _index_js__WEBPACK_IMPORTED_MODULE_4__["universe"].push_undo();

              _this3.pause();
            };
          })["catch"](function (error) {
            return console.error("Error:", error);
          });
        });
      })["catch"](function (error) {
        console.error("Error:", error);
      });
    }
  }, {
    key: "incScore",
    value: function incScore() {
      var _this4 = this;

      var currentSubmission = this.state.currentSubmission;
      var id = currentSubmission.id; // creations/:id/vote

      fetch(_api_js__WEBPACK_IMPORTED_MODULE_6__["functions"]._url("api/creations/".concat(id, "/vote")), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(function (res) {
        return res.json();
      }).then(function (data) {
        if (currentSubmission != null) {
          console.log(data);

          _this4.setState({
            currentSubmission: _objectSpread({}, currentSubmission, {
              data: data
            })
          });
        }
      })["catch"](function (e) {
        console.log(e);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var _this$state2 = this.state,
          size = _this$state2.size,
          paused = _this$state2.paused,
          selectedElement = _this$state2.selectedElement,
          currentSubmission = _this$state2.currentSubmission;
      var hash = currentSubmission && currentSubmission.id ? "#".concat(currentSubmission.id) : "";
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        onClick: function onClick() {
          return _this5.togglePause();
        },
        className: paused ? "selected" : ""
      }, paused ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", {
        height: "20",
        width: "20",
        id: "d",
        viewBox: "0 0 300 300"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("polygon", {
        id: "play",
        points: "0,0 , 300,150 0,300"
      })) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", {
        height: "20",
        width: "20",
        id: "d",
        viewBox: "0 0 300 300"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("polygon", {
        id: "bar2",
        points: "0,0 110,0 110,300 0,300"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("polygon", {
        id: "bar1",
        points: "190,0 300,0 300,300 190,300"
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        onClick: function onClick() {
          return _this5.upload();
        }
      }, "Upload"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
        to: {
          pathname: "/browse/",
          hash: hash
        },
        onClick: function onClick() {
          return _this5.pause();
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", null, "Browse")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        onClick: function onClick() {
          return _this5.reset();
        }
      }, "Reset"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
        to: {
          pathname: "/info/",
          hash: hash
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", null, "Info")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "sizes"
      }, sizeMap.map(function (v, i) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
          key: i,
          className: i == size ? "selected" : "",
          onClick: function onClick(e) {
            return _this5.setSize(e, i);
          },
          style: {
            padding: "0px"
          }
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", {
          height: "23",
          width: "23",
          id: "d",
          viewBox: "0 0 100 100"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("circle", {
          cx: "50",
          cy: "50",
          r: 2 + v
        })));
      })), Object.keys(_crate_pkg_sandtable__WEBPACK_IMPORTED_MODULE_3__["Species"]).map(function (n) {
        return ElementButton(n, selectedElement, function (id) {
          return _this5.setState({
            selectedElement: id
          });
        });
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: -1 == selectedElement ? "selected" : "",
        key: name,
        onClick: function onClick() {
          _this5.setState({
            selectedElement: -1
          });
        }
      }, "Wind"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        onClick: function onClick() {
          Object(_index_js__WEBPACK_IMPORTED_MODULE_4__["reset"])();

          _index_js__WEBPACK_IMPORTED_MODULE_4__["universe"].pop_undo();
        }
      }, "\u219C"), this.state.currentSubmission && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "submission-title"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        onClick: function onClick() {
          return _this5.incScore();
        }
      }, "+\u2661", this.state.currentSubmission.data.score, " "), this.state.currentSubmission.data.title), this.state.submissionMenuOpen && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_menu__WEBPACK_IMPORTED_MODULE_7__["default"], {
        close: function close() {
          return _this5.closeMenu();
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", null, "Share your creation with the people!"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
        src: this.state.data.dataURL
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: {
          display: "flex"
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        placeholder: "title",
        onChange: function onChange(e) {
          return _this5.setState({
            title: e.target.value
          });
        }
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        disabled: this.state.submitting,
        onClick: function onClick() {
          return _this5.submit();
        }
      }, "Submit"))));
    }
  }]);

  return Index;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);



/***/ }),

/***/ "./js/constants.js":
/*!*************************!*\
  !*** ./js/constants.js ***!
  \*************************/
/*! exports provided: ratio */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ratio", function() { return ratio; });
var ratio = 4;

if (window.devicePixelRatio > 1) {
  ratio = 3;
}



/***/ }),

/***/ "./js/fluid.js":
/*!*********************!*\
  !*** ./js/fluid.js ***!
  \*********************/
/*! exports provided: startFluid */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "startFluid", function() { return startFluid; });
/* harmony import */ var dat_gui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dat.gui */ "./node_modules/dat.gui/build/dat.gui.module.js");
/* harmony import */ var _crate_pkg_sandtable_bg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../crate/pkg/sandtable_bg */ "./crate/pkg/sandtable_bg.wasm");
/* harmony import */ var _fluidShaders__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fluidShaders */ "./js/fluidShaders.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants */ "./js/constants.js");
// MIT License
// Copyright (c) 2017 Pavel Dobryakov
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





var canvas = document.getElementById("fluid-canvas");
var sandCanvas = document.getElementById("sand-canvas");
var fluidColor = [1, 1, 0.8];

function startFluid(_ref) {
  var universe = _ref.universe;
  canvas.width = universe.width();
  canvas.height = universe.height();
  var config = {
    TEXTURE_DOWNSAMPLE: 0,
    DENSITY_DISSIPATION: 0.98,
    VELOCITY_DISSIPATION: 0.99,
    PRESSURE_DISSIPATION: 0.8,
    PRESSURE_ITERATIONS: 25,
    CURL: 30,
    SPLAT_RADIUS: 0.005
  };
  var pointers = [];
  var splatStack = [];

  var _getWebGLContext = getWebGLContext(canvas),
      gl = _getWebGLContext.gl,
      ext = _getWebGLContext.ext;

  var _compileShaders = Object(_fluidShaders__WEBPACK_IMPORTED_MODULE_2__["compileShaders"])(gl),
      baseVertexShader = _compileShaders.baseVertexShader,
      clearShader = _compileShaders.clearShader,
      displayShader = _compileShaders.displayShader,
      splatShader = _compileShaders.splatShader,
      advectionManualFilteringShader = _compileShaders.advectionManualFilteringShader,
      advectionShader = _compileShaders.advectionShader,
      divergenceShader = _compileShaders.divergenceShader,
      curlShader = _compileShaders.curlShader,
      vorticityShader = _compileShaders.vorticityShader,
      pressureShader = _compileShaders.pressureShader,
      gradientSubtractShader = _compileShaders.gradientSubtractShader,
      velocityOutShader = _compileShaders.velocityOutShader;

  startGUI();

  function getWebGLContext(canvas) {
    var params = {
      alpha: false,
      depth: false,
      stencil: false,
      antialias: false,
      preserveDrawingBuffer: false
    };
    var gl = canvas.getContext("webgl2", params);
    var isWebGL2 = !!gl;
    if (!isWebGL2) gl = canvas.getContext("webgl", params) || canvas.getContext("experimental-webgl", params);
    var halfFloat;
    var supportLinearFiltering;

    if (isWebGL2) {
      gl.getExtension("EXT_color_buffer_float");
      supportLinearFiltering = gl.getExtension("OES_texture_float_linear");
    } else {
      halfFloat = gl.getExtension("OES_texture_half_float");
      supportLinearFiltering = gl.getExtension("OES_texture_half_float_linear");
    }

    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    var halfFloatTexType = isWebGL2 ? gl.HALF_FLOAT : halfFloat.HALF_FLOAT_OES;
    var formatRGBA;
    var formatRG;
    var formatR;

    if (isWebGL2) {
      formatRGBA = getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, halfFloatTexType);
      formatRG = getSupportedFormat(gl, gl.RG16F, gl.RG, halfFloatTexType);
      formatR = getSupportedFormat(gl, gl.R16F, gl.RED, halfFloatTexType);
    } else {
      formatRGBA = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
      formatRG = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
      formatR = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
    }

    return {
      gl: gl,
      ext: {
        formatRGBA: formatRGBA,
        formatRG: formatRG,
        formatR: formatR,
        halfFloatTexType: halfFloatTexType,
        supportLinearFiltering: supportLinearFiltering
      }
    };
  }

  function getSupportedFormat(gl, internalFormat, format, type) {
    if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {
      switch (internalFormat) {
        case gl.R16F:
          return getSupportedFormat(gl, gl.RG16F, gl.RG, type);

        case gl.RG16F:
          return getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, type);

        default:
          return null;
      }
    }

    return {
      internalFormat: internalFormat,
      format: format
    };
  }

  function supportRenderTextureFormat(gl, internalFormat, format, type) {
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);
    var fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    var status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    if (status != gl.FRAMEBUFFER_COMPLETE) return false;
    return true;
  }

  function startGUI() {
    var gui = new dat_gui__WEBPACK_IMPORTED_MODULE_0__["GUI"]({
      width: 300
    });
    gui.add(config, "TEXTURE_DOWNSAMPLE", {
      Full: 0,
      Half: 1,
      Quarter: 2
    }).name("resolution").onFinishChange(initFramebuffers);
    gui.add(config, "DENSITY_DISSIPATION", 0.9, 1.0).name("density diffusion");
    gui.add(config, "VELOCITY_DISSIPATION", 0.9, 1.0).name("velocity diffusion");
    gui.add(config, "PRESSURE_DISSIPATION", 0.0, 1.0).name("pressure diffusion");
    gui.add(config, "PRESSURE_ITERATIONS", 1, 60).name("iterations");
    gui.add(config, "CURL", 0, 50).name("vorticity").step(1);
    gui.add(config, "SPLAT_RADIUS", 0.0001, 0.01).name("splat radius");
    gui.add({
      fun: function fun() {
        splatStack.push(parseInt(Math.random() * 20) + 5);
      }
    }, "fun").name("Random splats");
    gui.close();
  }

  function pointerPrototype() {
    this.id = -1;
    this.x = 0;
    this.y = 0;
    this.dx = 0;
    this.dy = 0;
    this.down = false;
    this.moved = false;
    this.color = [30, 300, 30];
  }

  pointers.push(new pointerPrototype());

  var GLProgram =
  /*#__PURE__*/
  function () {
    function GLProgram(vertexShader, fragmentShader) {
      _classCallCheck(this, GLProgram);

      this.uniforms = {};
      this.program = gl.createProgram();
      gl.attachShader(this.program, vertexShader);
      gl.attachShader(this.program, fragmentShader);
      gl.linkProgram(this.program);
      if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) throw gl.getProgramInfoLog(this.program);
      var uniformCount = gl.getProgramParameter(this.program, gl.ACTIVE_UNIFORMS);

      for (var i = 0; i < uniformCount; i++) {
        var uniformName = gl.getActiveUniform(this.program, i).name;
        this.uniforms[uniformName] = gl.getUniformLocation(this.program, uniformName);
      }
    }

    _createClass(GLProgram, [{
      key: "bind",
      value: function bind() {
        gl.useProgram(this.program);
      }
    }]);

    return GLProgram;
  }();

  var texWidth;
  var texHeight;
  var density;
  var velocity;
  var velocityOut;
  var burns;
  var cells;
  var divergence;
  var curl;
  var pressure;
  initFramebuffers();
  var clearProgram = new GLProgram(baseVertexShader, clearShader);
  var displayProgram = new GLProgram(baseVertexShader, displayShader);
  var velocityOutProgram = new GLProgram(baseVertexShader, velocityOutShader);
  var splatProgram = new GLProgram(baseVertexShader, splatShader);
  var advectionProgram = new GLProgram(baseVertexShader, ext.supportLinearFiltering ? advectionShader : advectionManualFilteringShader);
  var divergenceProgram = new GLProgram(baseVertexShader, divergenceShader);
  var curlProgram = new GLProgram(baseVertexShader, curlShader);
  var vorticityProgram = new GLProgram(baseVertexShader, vorticityShader);
  var pressureProgram = new GLProgram(baseVertexShader, pressureShader);
  var gradientSubtractProgram = new GLProgram(baseVertexShader, gradientSubtractShader);

  function initFramebuffers() {
    texWidth = gl.drawingBufferWidth >> config.TEXTURE_DOWNSAMPLE;
    texHeight = gl.drawingBufferHeight >> config.TEXTURE_DOWNSAMPLE;
    var texType = ext.halfFloatTexType;
    var rgba = ext.formatRGBA;
    var rg = ext.formatRG;
    var r = ext.formatR;
    velocity = createDoubleFBO(0, texWidth, texHeight, rg.internalFormat, rg.format, texType, ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST);
    density = createDoubleFBO(2, texWidth, texHeight, rgba.internalFormat, rgba.format, texType, ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST);
    divergence = createFBO(4, texWidth, texHeight, r.internalFormat, r.format, texType, gl.NEAREST);
    curl = createFBO(5, texWidth, texHeight, r.internalFormat, r.format, texType, gl.NEAREST);
    pressure = createDoubleFBO(6, texWidth, texHeight, r.internalFormat, r.format, texType, gl.NEAREST);
    burns = createFBO(8, texWidth, texHeight, rg.internalFormat, rg.format, texType, ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST);
    cells = createFBO(10, texWidth, texHeight, rg.internalFormat, rg.format, texType, ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST);
    velocityOut = createFBO(9, texWidth, texHeight, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST);
  }

  function createFBO(texId, w, h, internalFormat, format, type, param) {
    gl.activeTexture(gl.TEXTURE0 + texId);
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);
    var fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    gl.viewport(0, 0, w, h);
    gl.clear(gl.COLOR_BUFFER_BIT);
    return [texture, fbo, texId];
  }

  function createDoubleFBO(texId, w, h, internalFormat, format, type, param) {
    var fbo1 = createFBO(texId, w, h, internalFormat, format, type, param);
    var fbo2 = createFBO(texId + 1, w, h, internalFormat, format, type, param);
    return {
      get read() {
        return fbo1;
      },

      get write() {
        return fbo2;
      },

      swap: function swap() {
        var temp = fbo1;
        fbo1 = fbo2;
        fbo2 = temp;
      }
    };
  }

  var blit = function () {
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(0);
    return function (destination) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, destination);
      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    };
  }();

  var lastTime = Date.now(); // multipleSplats(parseInt(Math.random() * 20) + 5);

  var width = universe.width();
  var height = universe.height();
  var winds = new Uint8Array(_crate_pkg_sandtable_bg__WEBPACK_IMPORTED_MODULE_1__["memory"].buffer, universe.winds(), width * height * 4);
  var burnsData = new Uint8Array(_crate_pkg_sandtable_bg__WEBPACK_IMPORTED_MODULE_1__["memory"].buffer, universe.burns(), width * height * 4);
  var cellsData = new Uint8Array(_crate_pkg_sandtable_bg__WEBPACK_IMPORTED_MODULE_1__["memory"].buffer, universe.cells(), width * height * 4);

  function reset() {
    clearProgram.bind();
    var texUnit = 0;
    gl.activeTexture(gl.TEXTURE0 + texUnit);
    gl.bindTexture(gl.TEXTURE_2D, burns[0]);
    gl.uniform1i(clearProgram.uniforms.uWind, texUnit++);
    gl.activeTexture(gl.TEXTURE0 + texUnit);
    gl.bindTexture(gl.TEXTURE_2D, density.read[0]);
    gl.uniform1i(clearProgram.uniforms.uTexture, texUnit++);
    gl.uniform1f(clearProgram.uniforms.value, 0);
    blit(density.write[1]);
    density.swap();
    var texUnit = 0;
    gl.activeTexture(gl.TEXTURE0 + texUnit);
    gl.bindTexture(gl.TEXTURE_2D, burns[0]);
    gl.uniform1i(clearProgram.uniforms.uWind, texUnit++);
    gl.activeTexture(gl.TEXTURE0 + texUnit);
    gl.bindTexture(gl.TEXTURE_2D, pressure.read[0]);
    gl.uniform1i(clearProgram.uniforms.uTexture, texUnit++);
    gl.uniform1f(clearProgram.uniforms.value, 0);
    blit(pressure.write[1]);
    pressure.swap();
    texUnit = 0;
    gl.activeTexture(gl.TEXTURE0 + texUnit);
    gl.bindTexture(gl.TEXTURE_2D, burns[0]);
    gl.uniform1i(clearProgram.uniforms.uWind, texUnit++);
    gl.activeTexture(gl.TEXTURE0 + texUnit);
    gl.bindTexture(gl.TEXTURE_2D, velocity.read[0]);
    gl.uniform1i(clearProgram.uniforms.uTexture, texUnit++);
    gl.uniform1f(clearProgram.uniforms.value, 0);
    blit(velocity.write[1]);
    velocity.swap();
  }

  function update() {
    winds = new Uint8Array(_crate_pkg_sandtable_bg__WEBPACK_IMPORTED_MODULE_1__["memory"].buffer, universe.winds(), width * height * 4);
    burnsData = new Uint8Array(_crate_pkg_sandtable_bg__WEBPACK_IMPORTED_MODULE_1__["memory"].buffer, universe.burns(), width * height * 4);
    var cell_pointer = universe.cells();
    cellsData = new Uint8Array(_crate_pkg_sandtable_bg__WEBPACK_IMPORTED_MODULE_1__["memory"].buffer, cell_pointer, width * height * 4); // resizeCanvas();

    var dt = Math.min((Date.now() - lastTime) / 1000, 0.016);
    lastTime = Date.now();
    gl.viewport(0, 0, texWidth, texHeight);
    if (splatStack.length > 0) multipleSplats(splatStack); // multipleSplats(1);
    // ADVECTION
    // velocityRead ->
    // velocityWrite

    advectionProgram.bind();
    var texUnit = 0;
    gl.activeTexture(gl.TEXTURE0 + texUnit);
    gl.bindTexture(gl.TEXTURE_2D, velocity.read[0]);
    gl.uniform1i(advectionProgram.uniforms.uVelocity, texUnit++);
    gl.activeTexture(gl.TEXTURE0 + texUnit);
    gl.bindTexture(gl.TEXTURE_2D, velocity.read[0]);
    gl.uniform1i(advectionProgram.uniforms.uSource, texUnit++);
    gl.uniform2f(advectionProgram.uniforms.texelSize, 1.0 / texWidth, 1.0 / texHeight); // gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.read[2]);
    // gl.uniform1i(advectionProgram.uniforms.uSource, velocity.read[2]);

    gl.uniform1f(advectionProgram.uniforms.dt, dt);
    gl.uniform1f(advectionProgram.uniforms.dissipation, config.VELOCITY_DISSIPATION);
    blit(velocity.write[1]);
    velocity.swap();
    gl.bindTexture(gl.TEXTURE_2D, burns[0]);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, burnsData);
    gl.bindTexture(gl.TEXTURE_2D, cells[0]);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, cellsData); // ADVECTION
    // burns
    // velocityRead
    // densityRead ->
    // densityWrite

    var texUnit = 0;
    gl.activeTexture(gl.TEXTURE0 + texUnit);
    gl.bindTexture(gl.TEXTURE_2D, burns[0]);
    gl.uniform1i(advectionProgram.uniforms.uWind, texUnit++);
    gl.activeTexture(gl.TEXTURE0 + texUnit);
    gl.bindTexture(gl.TEXTURE_2D, velocity.read[0]);
    gl.uniform1i(advectionProgram.uniforms.uVelocity, texUnit++);
    gl.activeTexture(gl.TEXTURE0 + texUnit);
    gl.bindTexture(gl.TEXTURE_2D, density.read[0]);
    gl.uniform1i(advectionProgram.uniforms.uSource, texUnit++); // gl.uniform1i(advectionProgram.uniforms.uWind, burns[2]);
    // gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.read[2]);
    // gl.uniform1i(advectionProgram.uniforms.uSource, density.read[2]);

    gl.uniform1f(advectionProgram.uniforms.dissipation, config.DENSITY_DISSIPATION);
    blit(density.write[1]);
    density.swap(); // Splat
    // velocityRead -> velocityWrite
    // densityRead -> velocityWrite

    for (var i = 0; i < pointers.length; i++) {
      var pointer = pointers[i];

      if (pointer.moved && window.UI.state.selectedElement < 0) {
        splat(pointer.x, pointer.y, pointer.dx, pointer.dy, pointer.color);
        pointer.moved = false;
      }
    } // CURL
    // velocityRead -> curl


    curlProgram.bind();
    var texUnit = 0;
    gl.activeTexture(gl.TEXTURE0 + texUnit);
    gl.bindTexture(gl.TEXTURE_2D, velocity.read[0]);
    gl.uniform1i(curlProgram.uniforms.uVelocity, texUnit++);
    gl.uniform2f(curlProgram.uniforms.texelSize, 1.0 / texWidth, 1.0 / texHeight); // gl.uniform1i(curlProgram.uniforms.uVelocity, velocity.read[2]);

    blit(curl[1]); // VORTICITY
    // velocityRead
    // curl ->
    // velocityWrite

    vorticityProgram.bind();
    var texUnit = 0;
    gl.activeTexture(gl.TEXTURE0 + texUnit);
    gl.bindTexture(gl.TEXTURE_2D, velocity.read[0]);
    gl.uniform1i(vorticityProgram.uniforms.uVelocity, texUnit++);
    gl.activeTexture(gl.TEXTURE0 + texUnit);
    gl.bindTexture(gl.TEXTURE_2D, curl[0]);
    gl.uniform1i(vorticityProgram.uniforms.uCurl, texUnit++);
    gl.uniform2f(vorticityProgram.uniforms.texelSize, 1.0 / texWidth, 1.0 / texHeight); // gl.uniform1i(vorticityProgram.uniforms.uVelocity, velocity.read[2]);
    // gl.uniform1i(vorticityProgram.uniforms.uCurl, curl[2]);

    gl.uniform1f(vorticityProgram.uniforms.curl, config.CURL);
    gl.uniform1f(vorticityProgram.uniforms.dt, dt);
    blit(velocity.write[1]);
    velocity.swap(); // DIVERGENCE
    // velocityRead ->
    // divergence

    divergenceProgram.bind();
    var texUnit = 0;
    gl.activeTexture(gl.TEXTURE0 + texUnit);
    gl.bindTexture(gl.TEXTURE_2D, velocity.read[0]);
    gl.uniform1i(divergenceProgram.uniforms.uVelocity, texUnit++);
    gl.uniform2f(divergenceProgram.uniforms.texelSize, 1.0 / texWidth, 1.0 / texHeight); // gl.uniform1i(divergenceProgram.uniforms.uVelocity, velocity.read[2]);

    blit(divergence[1]); // CLEAR
    // burns
    // pressureRead->
    // pressureWrite

    clearProgram.bind();
    var texUnit = 0;
    gl.activeTexture(gl.TEXTURE0 + texUnit);
    gl.bindTexture(gl.TEXTURE_2D, burns[0]);
    gl.uniform1i(clearProgram.uniforms.uWind, texUnit++);
    gl.activeTexture(gl.TEXTURE0 + texUnit);
    gl.bindTexture(gl.TEXTURE_2D, pressure.read[0]);
    gl.uniform1i(clearProgram.uniforms.uTexture, texUnit++);
    var pressureTexId = texUnit - 1; // let pressureTexId = pressure.read[2];
    // gl.activeTexture(gl.TEXTURE0 + pressureTexId);
    // gl.bindTexture(gl.TEXTURE_2D, pressure.read[0]);
    // gl.uniform1i(clearProgram.uniforms.uWind, burns[2]);
    // gl.uniform1i(clearProgram.uniforms.uTexture, pressureTexId);

    gl.uniform1f(clearProgram.uniforms.value, config.PRESSURE_DISSIPATION);
    blit(pressure.write[1]);
    pressure.swap(); // PRESSURE
    // divergence
    // pressureRead->
    // pressureWrite

    pressureProgram.bind(); //TODO

    var texUnit = 0;
    gl.activeTexture(gl.TEXTURE0 + texUnit);
    gl.bindTexture(gl.TEXTURE_2D, divergence[0]);
    gl.uniform1i(pressureProgram.uniforms.uDivergence, texUnit++); // gl.activeTexture(gl.TEXTURE0 + texUnit);
    // gl.bindTexture(gl.TEXTURE_2D, pressure.read[0]);
    // gl.uniform1i(clearProgram.uniforms.uTexture, texUnit++);

    gl.uniform2f(pressureProgram.uniforms.texelSize, 1.0 / texWidth, 1.0 / texHeight); // gl.uniform1i(pressureProgram.uniforms.uDivergence, divergence[2]);

    pressureTexId = pressure.read[2];
    gl.uniform1i(pressureProgram.uniforms.uPressure, pressureTexId);
    gl.activeTexture(gl.TEXTURE0 + pressureTexId);

    for (var _i = 0; _i < config.PRESSURE_ITERATIONS; _i++) {
      gl.bindTexture(gl.TEXTURE_2D, pressure.read[0]);
      blit(pressure.write[1]);
      pressure.swap();
    } // VELOCITY OUT
    // velocityRead
    // pressureRead ->
    // velocityOut


    velocityOutProgram.bind();
    var texUnit = 0;
    gl.activeTexture(gl.TEXTURE0 + texUnit);
    gl.bindTexture(gl.TEXTURE_2D, velocity.read[0]);
    gl.uniform1i(velocityOutProgram.uniforms.uTexture, texUnit++);
    gl.activeTexture(gl.TEXTURE0 + texUnit);
    gl.bindTexture(gl.TEXTURE_2D, pressure.read[0]);
    gl.uniform1i(velocityOutProgram.uniforms.uPressure, texUnit++); // gl.uniform1i(velocityOutProgram.uniforms.uTexture, velocity.read[2]);
    // gl.uniform1i(velocityOutProgram.uniforms.uPressure, pressure.read[2]);

    blit(velocityOut[1]);
    gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, winds); // GRADIENT SUBTRACT
    // burns
    // pressureRead
    // velocityRead
    // sands ->
    // velocityWrite

    gradientSubtractProgram.bind();
    var texUnit = 0;
    gl.activeTexture(gl.TEXTURE0 + texUnit);
    gl.bindTexture(gl.TEXTURE_2D, burns[0]);
    gl.uniform1i(gradientSubtractProgram.uniforms.uWind, texUnit++);
    gl.activeTexture(gl.TEXTURE0 + texUnit);
    gl.bindTexture(gl.TEXTURE_2D, pressure.read[0]);
    gl.uniform1i(gradientSubtractProgram.uniforms.uPressure, texUnit++);
    gl.activeTexture(gl.TEXTURE0 + texUnit);
    gl.bindTexture(gl.TEXTURE_2D, velocity.read[0]);
    gl.uniform1i(gradientSubtractProgram.uniforms.uVelocity, texUnit++);
    gl.activeTexture(gl.TEXTURE0 + texUnit);
    gl.bindTexture(gl.TEXTURE_2D, cells[0]);
    gl.uniform1i(gradientSubtractProgram.uniforms.uCells, texUnit++);
    gl.uniform2f(gradientSubtractProgram.uniforms.texelSize, 1.0 / texWidth, 1.0 / texHeight); // gl.uniform1i(gradientSubtractProgram.uniforms.uWind, burns[2]);
    // gl.uniform1i(gradientSubtractProgram.uniforms.uPressure, pressure.read[2]);
    // gl.uniform1i(gradientSubtractProgram.uniforms.uVelocity, velocity.read[2]);

    blit(velocity.write[1]);
    velocity.swap();
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight); // DISPLAY
    // density ->
    // null/renderbuffer?

    displayProgram.bind();
    var texUnit = 0;
    gl.activeTexture(gl.TEXTURE0 + texUnit);
    gl.bindTexture(gl.TEXTURE_2D, density.read[0]);
    gl.uniform1i(displayProgram.uniforms.uTexture, texUnit++); // gl.uniform1i(displayProgram.uniforms.uTexture, density.read[2]);

    blit(null);
  }

  function splat(x, y, dx, dy, color) {
    splatProgram.bind();
    var texUnit = 0;
    gl.activeTexture(gl.TEXTURE0 + texUnit);
    gl.bindTexture(gl.TEXTURE_2D, velocity.read[0]);
    gl.uniform1i(splatProgram.uniforms.uTarget, texUnit++); // gl.uniform1i(splatProgram.uniforms.uTarget, velocity.read[2]);

    gl.uniform1f(splatProgram.uniforms.aspectRatio, canvas.width / canvas.height);
    gl.uniform2f(splatProgram.uniforms.point, x / canvas.width, 1.0 - y / canvas.height);
    gl.uniform3f(splatProgram.uniforms.color, dx, -dy, 1.0);
    gl.uniform1f(splatProgram.uniforms.radius, (window.UI.state.size + 1) / 700);
    blit(velocity.write[1]);
    velocity.swap();
    gl.activeTexture(gl.TEXTURE0 + texUnit);
    gl.bindTexture(gl.TEXTURE_2D, density.read[0]);
    gl.uniform1i(splatProgram.uniforms.uTarget, texUnit++); // gl.uniform1i(splatProgram.uniforms.uTarget, density.read[2]);

    gl.uniform3f(splatProgram.uniforms.color, color[0], color[1], color[2]);
    blit(density.write[1]);
    density.swap();
  }

  function multipleSplats(amount) {
    for (var i = 0; i < amount; i++) {
      var color = fluidColor;
      var x = canvas.width * Math.random();
      var y = canvas.height * Math.random();
      var dx = 1000 * (Math.random() - 0.5);
      var dy = 1000 * (Math.random() - 0.5);
      splat(x, y, dx, dy, color);
    }
  }

  var boundingRect;
  var scaleX;
  var scaleY;

  var resize = function resize() {
    boundingRect = sandCanvas.getBoundingClientRect();
    scaleX = sandCanvas.width / window.devicePixelRatio / boundingRect.width;
    scaleY = sandCanvas.height / window.devicePixelRatio / boundingRect.height;
  };

  resize();
  window.addEventListener("resize", resize);
  sandCanvas.addEventListener("mousemove", function (e) {
    var canvasLeft = (e.clientX - boundingRect.left) * scaleX;
    var canvasTop = (e.clientY - boundingRect.top) * scaleY;
    pointers[0].moved = pointers[0].down;
    pointers[0].dx = (canvasLeft - pointers[0].x) * 10.0;
    pointers[0].dy = (canvasTop - pointers[0].y) * 10.0;
    pointers[0].x = canvasLeft;
    pointers[0].y = canvasTop;
  });
  sandCanvas.addEventListener("touchmove", function (e) {
    if (!window.paused) {
      e.preventDefault();
    }

    var touches = e.targetTouches;

    for (var i = 0; i < touches.length; i++) {
      var pointer = pointers[i];
      pointer.moved = pointer.down;
      var canvasLeft = (touches[i].clientX - boundingRect.left) * scaleX;
      var canvasTop = (touches[i].clientY - boundingRect.top) * scaleY;
      pointer.dx = (canvasLeft - pointer.x) * 10.0;
      pointer.dy = (canvasTop - pointer.y) * 10.0;
      pointer.x = canvasLeft;
      pointer.y = canvasTop;
    }
  }, false);
  sandCanvas.addEventListener("mousedown", function () {
    pointers[0].down = true;
    pointers[0].color = fluidColor;
  });
  sandCanvas.addEventListener("touchstart", function (e) {
    e.preventDefault();
    var touches = e.targetTouches;

    for (var i = 0; i < touches.length; i++) {
      if (i >= pointers.length) pointers.push(new pointerPrototype());
      var canvasLeft = (touches[i].clientX - boundingRect.left) * scaleX;
      var canvasTop = (touches[i].clientY - boundingRect.top) * scaleY;
      pointers[i].id = touches[i].identifier;
      pointers[i].down = true;
      pointers[i].x = canvasLeft;
      pointers[i].y = canvasTop;
      pointers[i].color = fluidColor;
    }
  });
  window.addEventListener("mouseup", function () {
    pointers[0].down = false;
  });
  window.addEventListener("touchend", function (e) {
    var touches = e.changedTouches;

    for (var i = 0; i < touches.length; i++) {
      for (var j = 0; j < pointers.length; j++) {
        if (touches[i].identifier == pointers[j].id) pointers[j].down = false;
      }
    }
  });
  return {
    update: update,
    reset: reset
  };
}



/***/ }),

/***/ "./js/fluidShaders.js":
/*!****************************!*\
  !*** ./js/fluidShaders.js ***!
  \****************************/
/*! exports provided: compileShaders */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "compileShaders", function() { return compileShaders; });
var baseVertex = __webpack_require__(/*! ./glsl/baseVertex.glsl */ "./js/glsl/baseVertex.glsl");

var clearShaderString = __webpack_require__(/*! ./glsl/clear.glsl */ "./js/glsl/clear.glsl");

var displayShaderString = __webpack_require__(/*! ./glsl/display.glsl */ "./js/glsl/display.glsl");

var splatShaderString = __webpack_require__(/*! ./glsl/splat.glsl */ "./js/glsl/splat.glsl");

var advectionManualFilteringShaderString = __webpack_require__(/*! ./glsl/advectionManualFilter.glsl */ "./js/glsl/advectionManualFilter.glsl");

var advectionShaderString = __webpack_require__(/*! ./glsl/advection.glsl */ "./js/glsl/advection.glsl");

var divergenceShaderString = __webpack_require__(/*! ./glsl/divergence.glsl */ "./js/glsl/divergence.glsl");

var curlShaderString = __webpack_require__(/*! ./glsl/curl.glsl */ "./js/glsl/curl.glsl");

var vorticityShaderString = __webpack_require__(/*! ./glsl/vorticity.glsl */ "./js/glsl/vorticity.glsl");

var pressureShaderString = __webpack_require__(/*! ./glsl/pressure.glsl */ "./js/glsl/pressure.glsl");

var gradientSubtractShaderString = __webpack_require__(/*! ./glsl/gradientSubtract.glsl */ "./js/glsl/gradientSubtract.glsl");

var velocityOutShaderString = __webpack_require__(/*! ./glsl/velocityOut.glsl */ "./js/glsl/velocityOut.glsl");

function compileShaders(gl) {
  function compileShader(type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw gl.getShaderInfoLog(shader);
    return shader;
  }

  var baseVertexShader = compileShader(gl.VERTEX_SHADER, baseVertex);
  var clearShader = compileShader(gl.FRAGMENT_SHADER, clearShaderString);
  var displayShader = compileShader(gl.FRAGMENT_SHADER, displayShaderString);
  var splatShader = compileShader(gl.FRAGMENT_SHADER, splatShaderString);
  var advectionManualFilteringShader = compileShader(gl.FRAGMENT_SHADER, advectionManualFilteringShaderString);
  var advectionShader = compileShader(gl.FRAGMENT_SHADER, advectionShaderString);
  var divergenceShader = compileShader(gl.FRAGMENT_SHADER, divergenceShaderString);
  var curlShader = compileShader(gl.FRAGMENT_SHADER, curlShaderString);
  var vorticityShader = compileShader(gl.FRAGMENT_SHADER, vorticityShaderString);
  var pressureShader = compileShader(gl.FRAGMENT_SHADER, pressureShaderString);
  var gradientSubtractShader = compileShader(gl.FRAGMENT_SHADER, gradientSubtractShaderString);
  var velocityOutShader = compileShader(gl.FRAGMENT_SHADER, velocityOutShaderString);
  return {
    baseVertexShader: baseVertexShader,
    clearShader: clearShader,
    displayShader: displayShader,
    splatShader: splatShader,
    advectionManualFilteringShader: advectionManualFilteringShader,
    advectionShader: advectionShader,
    divergenceShader: divergenceShader,
    curlShader: curlShader,
    vorticityShader: vorticityShader,
    pressureShader: pressureShader,
    gradientSubtractShader: gradientSubtractShader,
    velocityOutShader: velocityOutShader
  };
}



/***/ }),

/***/ "./js/fps.js":
/*!*******************!*\
  !*** ./js/fps.js ***!
  \*******************/
/*! exports provided: fps */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fps", function() { return fps; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var fps = new (
/*#__PURE__*/
function () {
  function _class() {
    _classCallCheck(this, _class);

    this.fps = document.getElementById("fps");
    this.frames = [];
    this.lastFrameTimeStamp = performance.now();
  }

  _createClass(_class, [{
    key: "render",
    value: function render() {
      // Convert the delta time since the last frame render into a measure
      // of frames per second.
      var now = performance.now();
      var delta = now - this.lastFrameTimeStamp;
      this.lastFrameTimeStamp = now;
      var fps = 1 / delta * 1000; // Save only the latest 100 timings.

      this.frames.push(fps);

      if (this.frames.length > 30) {
        this.frames.shift();
      } // Find the max, min, and mean of our 100 latest timings.


      var min = Infinity;
      var max = -Infinity;
      var sum = 0;

      for (var i = 0; i < this.frames.length; i++) {
        sum += this.frames[i];
        min = Math.min(this.frames[i], min);
        max = Math.max(this.frames[i], max);
      }

      var mean = sum / this.frames.length; // Render the statistics.

      this.fps.textContent = "FPS:".concat(Math.round(mean));
    }
  }]);

  return _class;
}())();


/***/ }),

/***/ "./js/glsl/advection.glsl":
/*!********************************!*\
  !*** ./js/glsl/advection.glsl ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\nprecision highp float;\nprecision mediump sampler2D;\n#define GLSLIFY 1\nvarying vec2 vUv;\nuniform sampler2D uVelocity;\nuniform sampler2D uSource;\nuniform sampler2D uWind;\nuniform vec2 texelSize;\nuniform float dt;\nuniform float dissipation;\nvoid main() {\n  vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;\n  float density = texture2D(uWind, vUv).w * 1.;\n  if (density > 0.99) {\n    density = 0.;\n  }\n\n  gl_FragColor = dissipation * (texture2D(uSource, coord) + vec4(density));\n  gl_FragColor.a = 1.0;\n}\n"

/***/ }),

/***/ "./js/glsl/advectionManualFilter.glsl":
/*!********************************************!*\
  !*** ./js/glsl/advectionManualFilter.glsl ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "precision highp float;\nprecision mediump sampler2D;\n#define GLSLIFY 1\nvarying vec2 vUv;\nuniform sampler2D uVelocity;\nuniform sampler2D uSource;\nuniform sampler2D uWind;\nuniform vec2 texelSize;\nuniform float dt;\nuniform float dissipation;\nvec4 bilerp(in sampler2D sam, in vec2 p) {\n  vec4 st;\n  st.xy = floor(p - 0.5) + 0.5;\n  st.zw = st.xy + 1.0;\n  vec4 uv = st * texelSize.xyxy;\n  vec4 a = texture2D(sam, uv.xy);\n  vec4 b = texture2D(sam, uv.zy);\n  vec4 c = texture2D(sam, uv.xw);\n  vec4 d = texture2D(sam, uv.zw);\n  vec2 f = p - st.xy;\n  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);\n}\nvoid main() {\n  vec2 coord = gl_FragCoord.xy - dt * texture2D(uVelocity, vUv).xy;\n  float density = texture2D(uWind, vUv).w;\n  if (density > 0.99) {\n    density = 0.;\n  }\n  gl_FragColor = dissipation * (bilerp(uSource, coord) + vec4(density));\n  gl_FragColor.a = 1.0;\n}"

/***/ }),

/***/ "./js/glsl/baseVertex.glsl":
/*!*********************************!*\
  !*** ./js/glsl/baseVertex.glsl ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "precision highp float;\nprecision mediump sampler2D;\n#define GLSLIFY 1\nattribute vec2 aPosition;\nvarying vec2 vUv;\nvarying vec2 vL;\nvarying vec2 vR;\nvarying vec2 vT;\nvarying vec2 vB;\nuniform vec2 texelSize;\nvoid main() {\n  vUv = aPosition * 0.5 + 0.5;\n  vL = vUv - vec2(texelSize.x, 0.0);\n  vR = vUv + vec2(texelSize.x, 0.0);\n  vT = vUv + vec2(0.0, texelSize.y);\n  vB = vUv - vec2(0.0, texelSize.y);\n  gl_Position = vec4(aPosition, 0.0, 1.0);\n}\n"

/***/ }),

/***/ "./js/glsl/clear.glsl":
/*!****************************!*\
  !*** ./js/glsl/clear.glsl ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "precision highp float;\nprecision mediump sampler2D;\n#define GLSLIFY 1\nvarying vec2 vUv;\nuniform sampler2D uTexture;\nuniform sampler2D uWind;\nuniform float value;\nvoid main() {\n  float pressure = texture2D(uWind, vUv).z;\n  pressure *= 512.;\n  pressure *= pressure;\n  gl_FragColor = value * (texture2D(uTexture, vUv) + vec4(pressure));\n}"

/***/ }),

/***/ "./js/glsl/curl.glsl":
/*!***************************!*\
  !*** ./js/glsl/curl.glsl ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "precision highp float;\nprecision mediump sampler2D;\n#define GLSLIFY 1\nvarying vec2 vUv;\nvarying vec2 vL;\nvarying vec2 vR;\nvarying vec2 vT;\nvarying vec2 vB;\nuniform sampler2D uVelocity;\nvoid main() {\n  float L = texture2D(uVelocity, vL).y;\n  float R = texture2D(uVelocity, vR).y;\n  float T = texture2D(uVelocity, vT).x;\n  float B = texture2D(uVelocity, vB).x;\n  float vorticity = R - L - T + B;\n  gl_FragColor = vec4(vorticity, 0.0, 0.0, 1.0);\n}"

/***/ }),

/***/ "./js/glsl/display.glsl":
/*!******************************!*\
  !*** ./js/glsl/display.glsl ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "precision highp float;\nprecision mediump sampler2D;\n#define GLSLIFY 1\nvarying vec2 vUv;\nuniform sampler2D uTexture;\nvoid main() {\n  vec3 color = texture2D(uTexture, vUv).rgb * 0.1;\n  color *= 0.5;\n  color = min(color, 0.9);\n  color = vec3(1.0) - color;\n  color *= vec3(0.95, 0.9, 0.9);\n  // color *= 0.5;\n  gl_FragColor = vec4(color, 1.0);\n}\n"

/***/ }),

/***/ "./js/glsl/divergence.glsl":
/*!*********************************!*\
  !*** ./js/glsl/divergence.glsl ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "precision highp float;\nprecision mediump sampler2D;\n#define GLSLIFY 1\nvarying vec2 vUv;\nvarying vec2 vL;\nvarying vec2 vR;\nvarying vec2 vT;\nvarying vec2 vB;\nuniform sampler2D uVelocity;\nvec2 sampleVelocity(in vec2 uv) {\n  vec2 multiplier = vec2(1.0, 1.0);\n  if (uv.x < 0.0) {\n    uv.x = 0.0;\n    multiplier.x = -1.0;\n  }\n  if (uv.x > 1.0) {\n    uv.x = 1.0;\n    multiplier.x = -1.0;\n  }\n  if (uv.y < 0.0) {\n    uv.y = 0.0;\n    multiplier.y = -1.0;\n  }\n  if (uv.y > 1.0) {\n    uv.y = 1.0;\n    multiplier.y = -1.0;\n  }\n  return multiplier * texture2D(uVelocity, uv).xy;\n}\nvoid main() {\n  float L = sampleVelocity(vL).x;\n  float R = sampleVelocity(vR).x;\n  float T = sampleVelocity(vT).y;\n  float B = sampleVelocity(vB).y;\n  float div = 0.5 * (R - L + T - B);\n  gl_FragColor = vec4(div, 0.0, 0.0, 1.0);\n}\n"

/***/ }),

/***/ "./js/glsl/gradientSubtract.glsl":
/*!***************************************!*\
  !*** ./js/glsl/gradientSubtract.glsl ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "precision highp float;\nprecision mediump sampler2D;\n#define GLSLIFY 1\nvarying vec2 vUv;\nvarying vec2 vL;\nvarying vec2 vR;\nvarying vec2 vT;\nvarying vec2 vB;\nuniform sampler2D uPressure;\nuniform sampler2D uVelocity;\nuniform sampler2D uWind;\nuniform sampler2D uCells;\n\nvec2 boundary(in vec2 uv) {\n  uv = min(max(uv, 0.0), 1.0);\n  return uv;\n}\nvoid main() {\n  float L = texture2D(uPressure, boundary(vL)).x;\n  float R = texture2D(uPressure, boundary(vR)).x;\n  float T = texture2D(uPressure, boundary(vT)).x;\n  float B = texture2D(uPressure, boundary(vB)).x;\n  vec2 velocity = texture2D(uVelocity, vUv).xy;\n  vec2 wind = texture2D(uWind, vUv).xy;\n  vec2 cell = texture2D(uCells, vec2(vUv.x, 1.0 - (vUv.y + (1.0 / 300.)))).xy;\n  velocity.xy -= vec2(R - L, T - B);\n  velocity.xy += wind * 25.;\n\n  int type = int((cell.r * 255.) + 0.1);\n\n  // || type == 7 || type == 9\n  if (type == 1 || type == 5) {\n    velocity = vec2(0.);\n  }\n  // velocity = cell.rg * 100.;\n  gl_FragColor = vec4(velocity, 0.0, 1.0);\n}"

/***/ }),

/***/ "./js/glsl/pressure.glsl":
/*!*******************************!*\
  !*** ./js/glsl/pressure.glsl ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "precision highp float;\nprecision mediump sampler2D;\n#define GLSLIFY 1\nvarying vec2 vUv;\nvarying vec2 vL;\nvarying vec2 vR;\nvarying vec2 vT;\nvarying vec2 vB;\nuniform sampler2D uPressure;\nuniform sampler2D uDivergence;\nvec2 boundary(in vec2 uv) {\n  uv = min(max(uv, 0.0), 1.0);\n  return uv;\n}\nvoid main() {\n  float L = texture2D(uPressure, boundary(vL)).x;\n  float R = texture2D(uPressure, boundary(vR)).x;\n  float T = texture2D(uPressure, boundary(vT)).x;\n  float B = texture2D(uPressure, boundary(vB)).x;\n  float C = texture2D(uPressure, vUv).x;\n  float divergence = texture2D(uDivergence, vUv).x;\n  float pressure = (L + R + B + T - divergence) * 0.25;\n  gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);\n}"

/***/ }),

/***/ "./js/glsl/sand.glsl":
/*!***************************!*\
  !*** ./js/glsl/sand.glsl ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "precision highp float;\n#define GLSLIFY 1\nuniform float t;\nuniform float dpi;\nuniform vec2 resolution;\nuniform bool isSnapshot;\nuniform sampler2D backBuffer;\nuniform sampler2D data;\n\nvarying vec2 uv;\n\n// clang-format off\nvec3 hsv2rgb_3_0(vec3 c) {\n  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);\n  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);\n  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);\n}\n\n\n\n//\n// Description : Array and textureless GLSL 2D/3D/4D simplex\n//               noise functions.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289_1_1(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289_1_1(vec4 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute_1_2(vec4 x) {\n     return mod289_1_1(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt_1_3(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nfloat snoise_1_4(vec3 v)\n  {\n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n  const vec4  D_1_5 = vec4(0.0, 0.5, 1.0, 2.0);\n\n// First corner\n  vec3 i  = floor(v + dot(v, C.yyy) );\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\n\n// Other corners\n  vec3 g_1_6 = step(x0.yzx, x0.xyz);\n  vec3 l = 1.0 - g_1_6;\n  vec3 i1 = min( g_1_6.xyz, l.zxy );\n  vec3 i2 = max( g_1_6.xyz, l.zxy );\n\n  //   x0 = x0 - 0.0 + 0.0 * C.xxx;\n  //   x1 = x0 - i1  + 1.0 * C.xxx;\n  //   x2 = x0 - i2  + 2.0 * C.xxx;\n  //   x3 = x0 - 1.0 + 3.0 * C.xxx;\n  vec3 x1 = x0 - i1 + C.xxx;\n  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y\n  vec3 x3 = x0 - D_1_5.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y\n\n// Permutations\n  i = mod289_1_1(i);\n  vec4 p = permute_1_2( permute_1_2( permute_1_2(\n             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\n           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n\n// Gradients: 7x7 points over a square, mapped onto an octahedron.\n// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)\n  float n_ = 0.142857142857; // 1.0/7.0\n  vec3  ns = n_ * D_1_5.wyz - D_1_5.xzx;\n\n  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)\n\n  vec4 x_ = floor(j * ns.z);\n  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\n\n  vec4 x = x_ *ns.x + ns.yyyy;\n  vec4 y = y_ *ns.x + ns.yyyy;\n  vec4 h = 1.0 - abs(x) - abs(y);\n\n  vec4 b0 = vec4( x.xy, y.xy );\n  vec4 b1 = vec4( x.zw, y.zw );\n\n  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;\n  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;\n  vec4 s0 = floor(b0)*2.0 + 1.0;\n  vec4 s1 = floor(b1)*2.0 + 1.0;\n  vec4 sh = -step(h, vec4(0.0));\n\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n  vec4 a1_1_7 = b1.xzyw + s1.xzyw*sh.zzww ;\n\n  vec3 p0_1_8 = vec3(a0.xy,h.x);\n  vec3 p1 = vec3(a0.zw,h.y);\n  vec3 p2 = vec3(a1_1_7.xy,h.z);\n  vec3 p3 = vec3(a1_1_7.zw,h.w);\n\n//Normalise gradients\n  vec4 norm = taylorInvSqrt_1_3(vec4(dot(p0_1_8,p0_1_8), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0_1_8 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n\n// Mix final noise value\n  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n  m = m * m;\n  return 42.0 * dot( m*m, vec4( dot(p0_1_8,x0), dot(p1,x1),\n                                dot(p2,x2), dot(p3,x3) ) );\n  }\n\n\n\n//\n// Description : Array and textureless GLSL 2D simplex noise function.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289_2_9(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec2 mod289_2_9(vec2 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec3 permute_2_10(vec3 x) {\n  return mod289_2_9(((x*34.0)+1.0)*x);\n}\n\nfloat snoise_2_11(vec2 v)\n  {\n  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0\n                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)\n                     -0.577350269189626,  // -1.0 + 2.0 * C.x\n                      0.024390243902439); // 1.0 / 41.0\n// First corner\n  vec2 i  = floor(v + dot(v, C.yy) );\n  vec2 x0 = v -   i + dot(i, C.xx);\n\n// Other corners\n  vec2 i1;\n  //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0\n  //i1.y = 1.0 - i1.x;\n  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);\n  // x0 = x0 - 0.0 + 0.0 * C.xx ;\n  // x1 = x0 - i1 + 1.0 * C.xx ;\n  // x2 = x0 - 1.0 + 2.0 * C.xx ;\n  vec4 x12 = x0.xyxy + C.xxzz;\n  x12.xy -= i1;\n\n// Permutations\n  i = mod289_2_9(i); // Avoid truncation effects in permutation\n  vec3 p = permute_2_10( permute_2_10( i.y + vec3(0.0, i1.y, 1.0 ))\n    + i.x + vec3(0.0, i1.x, 1.0 ));\n\n  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);\n  m = m*m ;\n  m = m*m ;\n\n// Gradients: 41 points uniformly over a line, mapped onto a diamond.\n// The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)\n\n  vec3 x = 2.0 * fract(p * C.www) - 1.0;\n  vec3 h = abs(x) - 0.5;\n  vec3 ox = floor(x + 0.5);\n  vec3 a0 = x - ox;\n\n// Normalise gradients implicitly by scaling m\n// Approximation of: m *= inversesqrt( a0*a0 + h*h );\n  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );\n\n// Compute final noise value at P\n  vec3 g;\n  g.x  = a0.x  * x0.x  + h.x  * x0.y;\n  g.yz = a0.yz * x12.xz + h.yz * x12.yw;\n  return 130.0 * dot(m, g);\n}\n\n\n\nhighp float random_4_12(vec2 co)\n{\n    highp float a = 12.9898;\n    highp float b = 78.233;\n    highp float c = 43758.5453;\n    highp float dt= dot(co.xy ,vec2(a,b));\n    highp float sn= mod(dt,3.14);\n    return fract(sin(sn) * c);\n}\n\n\n\n// clang-format on\n\nvoid main() {\n  vec3 color;\n  //   float r = abs(sin(t / 25.));\n  //   if (length(uv) < r && length(uv) > r - 0.1) {\n  // color = hsv2rgb(vec3(sin(t * 0.01), 0.5, 0.5));\n\n  vec2 textCoord = (uv * vec2(0.5, -0.5)) + vec2(0.5);\n  // vec3 bb = texture2D(backBuffer, (uv * 0.5) + vec2(0.5)).rgb;\n\n  vec4 data = texture2D(data, textCoord);\n  int type = int((data.r * 255.) + 0.1);\n  float hue = 0.0;\n  float saturation = 0.6;\n  float lightness = 0.3 + data.g * 0.5;\n  float noise = snoise_1_4(vec3(floor(uv * resolution / dpi), t * 0.05));\n  float a = 1.0;\n\n  if (type == 0) {\n    hue = 0.0;\n    saturation = 0.1;\n    lightness = 0.1;\n    a = 0.1;\n    if (isSnapshot) {\n      saturation = 0.05;\n      lightness = 1.01;\n      a = 1.0;\n    }\n  } else if (type == 1) {\n    hue = 0.1;\n    saturation = 0.1;\n    lightness = 0.4;\n  } else if (type == 2) {\n    hue = 0.1;\n    saturation = 0.5;\n    lightness += 0.3;\n  } else if (type == 3) { // water\n    hue = 0.6;\n    lightness = 0.7 + data.g * 0.25 + noise * 0.1;\n  } else if (type == 4) { // gas\n    hue = 0.0;\n    lightness += 0.4;\n    saturation = 0.2 + (data.b * 1.5);\n  } else if (type == 5) { // clone\n    hue = 0.9;\n    saturation = 0.3;\n  } else if (type == 6) { // fire\n    hue = (data.g * 0.1);\n    saturation = 0.7;\n\n    lightness = 0.7 + (data.g * 0.3) + ((noise + 0.8) * 0.5);\n  } else if (type == 7) { // wood\n    hue = (data.g * 0.1);\n    saturation = 0.3;\n    lightness = 0.3 + data.g * 0.3;\n  } else if (type == 8) { // lava\n    hue = (data.g * 0.1);\n    lightness = 0.7 + data.g * 0.25 + noise * 0.1;\n  } else if (type == 9) { // ice\n    hue = 0.6;\n    saturation = 0.4;\n    lightness = 0.7 + data.g * 0.5;\n  } else if (type == 10) { // sink\n    hue = 0.9;\n    saturation = 0.4;\n    lightness = 1.0;\n  } else if (type == 11) { // plant\n    hue = 0.4;\n    saturation = 0.4;\n  } else if (type == 12) { // acid\n    hue = 0.18;\n    saturation = 0.9;\n    lightness = 0.8 + data.g * 0.2 + noise * 0.05;\n  } else if (type == 13) { // stone\n    hue = -0.4 + (data.g * 0.5);\n    saturation = 0.1;\n    // lightness = 0.2 + data.g * 0.5;\n  } else if (type == 14) { // dust\n    hue = (data.g * 2.0) + t * .0008;\n    saturation = 0.4;\n    lightness = 0.8;\n  } else if (type == 15) { // mite\n    hue = 0.8;\n    saturation = 0.9;\n    lightness = 0.8;\n  } else if (type == 16) { // oil\n    hue = (data.g * 5.0) + t * .008;\n\n    saturation = 0.2;\n    lightness = 0.3;\n  } else if (type == 17) { // firework\n    hue = 0.0;\n    saturation = 0.4 + data.b;\n    lightness = 0.9;\n  } else if (type == 18) { // fungus\n    hue = (data.g * 0.15) - 0.1;\n    saturation = (data.g * 0.8) - 0.05;\n\n    // (data.g * 0.00);\n    lightness = 1.5 - (data.g * 0.2);\n  } else if (type == 19) { // seed/flower\n\n    hue = fract(fract(data.b * 2.) * 0.5) - 0.3;\n    saturation = 0.7 * (data.g + 0.4) + data.b * 0.2;\n    lightness = 0.9 * (data.g + 0.9);\n  }\n  if (isSnapshot == false) {\n    lightness *= (0.975 + snoise_2_11(floor(uv * resolution / dpi)) * 0.025);\n  }\n  color = hsv2rgb_3_0(vec3(hue, saturation, lightness));\n  gl_FragColor = vec4(color, a);\n}"

/***/ }),

/***/ "./js/glsl/sandVertex.glsl":
/*!*********************************!*\
  !*** ./js/glsl/sandVertex.glsl ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n// boring \"pass-through\" vertex shader\nprecision mediump float;\n#define GLSLIFY 1\nattribute vec2 position;\nvarying vec2 uv;\nvoid main() {\n  uv = position;\n  gl_Position = vec4(position, 0, 1);\n}"

/***/ }),

/***/ "./js/glsl/splat.glsl":
/*!****************************!*\
  !*** ./js/glsl/splat.glsl ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "precision highp float;\nprecision mediump sampler2D;\n#define GLSLIFY 1\nvarying vec2 vUv;\nuniform sampler2D uTarget;\nuniform float aspectRatio;\nuniform vec3 color;\nuniform vec2 point;\nuniform float radius;\nvoid main() {\n  vec2 p = vUv - point.xy;\n  p.x *= aspectRatio;\n  vec3 splat = exp(-dot(p, p) / radius) * color;\n  vec3 base = texture2D(uTarget, vUv).xyz;\n  gl_FragColor = vec4(base + splat, 1.0);\n}"

/***/ }),

/***/ "./js/glsl/velocityOut.glsl":
/*!**********************************!*\
  !*** ./js/glsl/velocityOut.glsl ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "precision highp float;\nprecision mediump sampler2D;\n#define GLSLIFY 1\nvarying vec2 vUv;\nuniform sampler2D uTexture;\nuniform sampler2D uPressure;\nvoid main() {\n  vec2 v = texture2D(uTexture, vUv).rg;\n  float p = texture2D(uPressure, vUv).r;\n  vec3 vp = vec3(v, p);\n  vp = max(vp, vec3(-250.));\n  vp = min(vp, vec3(250.));\n  vp /= 500.;\n  vp += vec3(0.5, 0.5, 0.);\n  // v = vec2(0.5);\n  gl_FragColor = vec4(vp, 0.0);\n}\n"

/***/ }),

/***/ "./js/glsl/vorticity.glsl":
/*!********************************!*\
  !*** ./js/glsl/vorticity.glsl ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "precision highp float;\nprecision mediump sampler2D;\n#define GLSLIFY 1\nvarying vec2 vUv;\nvarying vec2 vT;\nvarying vec2 vB;\nuniform sampler2D uVelocity;\nuniform sampler2D uCurl;\nuniform float curl;\nuniform float dt;\nvoid main() {\n  float T = texture2D(uCurl, vT).x;\n  float B = texture2D(uCurl, vB).x;\n  float C = texture2D(uCurl, vUv).x;\n  vec2 force = vec2(abs(T) - abs(B), 0.0);\n  force *= 1.0 / length(force + 0.00001) * curl * C;\n  vec2 vel = texture2D(uVelocity, vUv).xy;\n  gl_FragColor = vec4(vel + force * dt, 0.0, 1.0);\n}"

/***/ }),

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/*! exports provided: canvas, width, height, universe, ratio, reset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "canvas", function() { return canvas; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "width", function() { return width; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "height", function() { return height; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "universe", function() { return universe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reset", function() { return reset; });
/* harmony import */ var _crate_pkg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../crate/pkg */ "./crate/pkg/sandtable.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render */ "./js/render.js");
/* harmony import */ var _fps__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fps */ "./js/fps.js");
/* harmony import */ var _paint__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./paint */ "./js/paint.js");
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app */ "./js/app.js");
/* harmony import */ var _fluid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./fluid */ "./js/fluid.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./constants */ "./js/constants.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ratio", function() { return _constants__WEBPACK_IMPORTED_MODULE_6__["ratio"]; });









if (window.safari) {
  history.pushState(null, null, location.href);

  window.onpopstate = function (event) {
    history.go(1);
  };
}

function mobileAndTabletcheck() {
  var check = false;

  (function (a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);

  return check;
}

if (mobileAndTabletcheck()) {
  window.onbeforeunload = function () {
    return true;
  };
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("/service-worker.js").then(function (registration) {
      console.log("SW registered: ", registration);
    })["catch"](function (registrationError) {
      console.log("SW registration failed: ", registrationError);
    });
  });
}

var n = 300;
var universe = _crate_pkg__WEBPACK_IMPORTED_MODULE_0__["Universe"]["new"](n, n);
var width = n;
var height = n;
var canvas = document.getElementById("sand-canvas");
var canvas2 = document.getElementById("fluid-canvas");
canvas.height = n * window.devicePixelRatio;
canvas.width = n * window.devicePixelRatio;
document.getElementById("background").addEventListener("touchmove", function (e) {
  if (!window.paused) {
    e.preventDefault();
  }
});
var ui = document.getElementById("ui");

var resize = function resize() {
  var screen_width = window.innerWidth;
  var uiheight = 50;
  var screen_height = window.innerHeight - uiheight;
  var canvasStyle = "";

  if (screen_width > screen_height) {
    if (screen_width - window.innerHeight < 225) {
      canvasStyle = "height: ".concat(window.innerHeight, "px; margin:3px");
      ui.style = "width: ".concat(screen_width - window.innerHeight - 12, "px; margin: 2px;");
    } else {
      canvasStyle = "height: ".concat(window.innerHeight, "px");
      ui.style = "width: ".concat((screen_width - window.innerHeight) / 2 - 7, "px; margin: 2px;");
    }
  } else {
    canvasStyle = "width: ".concat(screen_width, "px; bottom:3px;");
  }

  canvas.style = canvasStyle;
  canvas2.style = canvasStyle;
};

resize();
window.addEventListener("resize", function () {
  resize();
});
var fluid = Object(_fluid__WEBPACK_IMPORTED_MODULE_5__["startFluid"])({
  universe: universe
});
var drawSand = Object(_render__WEBPACK_IMPORTED_MODULE_1__["startWebGL"])({
  canvas: canvas,
  universe: universe
});

var renderLoop = function renderLoop() {
  if (!window.paused) {
    _fps__WEBPACK_IMPORTED_MODULE_2__["fps"].render(); // new

    universe.tick();
    fluid.update();
  }

  drawSand();
  window.animationId = requestAnimationFrame(renderLoop);
};

renderLoop();

function reset() {
  fluid.reset();
  fluid.update();
  fluid.reset();
  fluid.update();
  universe.reset();
}

window.u = universe;


/***/ }),

/***/ "./js/paint.js":
/*!*********************!*\
  !*** ./js/paint.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "./js/index.js");
/* harmony import */ var _components_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/ui */ "./js/components/ui.js");


var canvas = document.getElementById("sand-canvas");

var eventDistance = function eventDistance(a, b) {
  return Math.sqrt(Math.pow(a.clientX - b.clientX, 2) + Math.pow(a.clientY - b.clientY, 2), 2);
};

var magnitude = function magnitude(a) {
  return Math.sqrt(Math.pow(a.clientX, 2) + Math.pow(a.clientY, 2), 2);
};

var norm = function norm(a) {
  var mag = magnitude(a);
  return {
    clientX: a.clientX / mag,
    clientY: a.clientY / mag
  };
};

var scale = function scale(a, s) {
  return {
    clientX: a.clientX * s,
    clientY: a.clientY * s
  };
};

var add = function add(a, b) {
  return {
    clientX: a.clientX + b.clientX,
    clientY: a.clientY + b.clientY
  };
};

var sub = function sub(a, b) {
  return {
    clientX: a.clientX - b.clientX,
    clientY: a.clientY - b.clientY
  };
};

var painting = false;
var lastPaint = null;
var repeat = null;
canvas.addEventListener("mousedown", function (event) {
  event.preventDefault();
  _index_js__WEBPACK_IMPORTED_MODULE_0__["universe"].push_undo();
  painting = true;
  clearInterval(repeat);
  repeat = window.setInterval(function () {
    return paint(event);
  }, 100);
  paint(event);
  lastPaint = event;
});
document.body.addEventListener("mouseup", function (event) {
  clearInterval(repeat);

  if (painting) {
    event.preventDefault();
    lastPaint = null;
    painting = false;
  }
});
canvas.addEventListener("mousemove", function (event) {
  clearInterval(repeat);
  smoothPaint(event);
});
canvas.addEventListener("mouseleave", function (event) {
  clearInterval(repeat);
  lastPaint = null;
});
canvas.addEventListener("touchstart", function (event) {
  _index_js__WEBPACK_IMPORTED_MODULE_0__["universe"].push_undo();
  event.preventDefault();
  painting = true;
  lastPaint = event;
  handleTouches(event);
});
canvas.addEventListener("touchend", function (event) {
  event.preventDefault();
  lastPaint = null;
  painting = false;
  clearInterval(repeat);
});
canvas.addEventListener("touchmove", function (event) {
  if (!window.paused) {
    event.preventDefault();
  }

  clearInterval(repeat);
  handleTouches(event);
});

function smoothPaint(event) {
  clearInterval(repeat);
  repeat = window.setInterval(function () {
    return paint(event);
  }, 100);
  var startEvent = {
    clientX: event.clientX,
    clientY: event.clientY
  };

  if (!painting) {
    return;
  }

  var size = _components_ui__WEBPACK_IMPORTED_MODULE_1__["sizeMap"][window.UI.state.size];
  var i = 0;
  paint(startEvent);

  if (lastPaint) {
    while (eventDistance(startEvent, lastPaint) > size / 2) {
      var d = eventDistance(startEvent, lastPaint);
      startEvent = add(startEvent, scale(norm(sub(lastPaint, event)), Math.min(size / 2, d)));
      i++;

      if (i > 1000) {
        break;
      }

      paint(startEvent);
    }
  }

  lastPaint = event;
}

var handleTouches = function handleTouches(event) {
  var touches = Array.from(event.touches);

  if (touches.length == 1) {
    smoothPaint(touches[0]);
  } else {
    touches.forEach(paint);
  }
};

var paint = function paint(event) {
  if (!painting) {
    return;
  }

  var boundingRect = canvas.getBoundingClientRect();
  var scaleX = canvas.width / window.devicePixelRatio / boundingRect.width;
  var scaleY = canvas.height / window.devicePixelRatio / boundingRect.height;
  var canvasLeft = (event.clientX - boundingRect.left) * scaleX;
  var canvasTop = (event.clientY - boundingRect.top) * scaleY;
  var x = Math.min(Math.floor(canvasLeft), _index_js__WEBPACK_IMPORTED_MODULE_0__["width"] - 1);
  var y = Math.min(Math.floor(canvasTop), _index_js__WEBPACK_IMPORTED_MODULE_0__["height"] - 1);
  if (window.UI.state.selectedElement < 0) return;
  _index_js__WEBPACK_IMPORTED_MODULE_0__["universe"].paint(x, y, _components_ui__WEBPACK_IMPORTED_MODULE_1__["sizeMap"][window.UI.state.size], window.UI.state.selectedElement);
};

/***/ }),

/***/ "./js/render.js":
/*!**********************!*\
  !*** ./js/render.js ***!
  \**********************/
/*! exports provided: startWebGL, snapshot */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "startWebGL", function() { return startWebGL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "snapshot", function() { return snapshot; });
/* harmony import */ var _crate_pkg_sandtable_bg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../crate/pkg/sandtable_bg */ "./crate/pkg/sandtable_bg.wasm");
var reglBuilder = __webpack_require__(/*! regl */ "./node_modules/regl/dist/regl.js");



var fsh = __webpack_require__(/*! ./glsl/sand.glsl */ "./js/glsl/sand.glsl");

var vsh = __webpack_require__(/*! ./glsl/sandVertex.glsl */ "./js/glsl/sandVertex.glsl");

var startWebGL = function startWebGL(_ref) {
  var canvas = _ref.canvas,
      universe = _ref.universe,
      _ref$isSnapshot = _ref.isSnapshot,
      isSnapshot = _ref$isSnapshot === void 0 ? false : _ref$isSnapshot;
  var regl = reglBuilder({
    canvas: canvas,
    attributes: {
      preserveDrawingBuffer: isSnapshot
    }
  }); // const lastFrame = regl.texture();

  var width = universe.width();
  var height = universe.height();
  var cell_pointer = universe.cells();
  var cells = new Uint8Array(_crate_pkg_sandtable_bg__WEBPACK_IMPORTED_MODULE_0__["memory"].buffer, cell_pointer, width * height * 4);
  var dataTexture = regl.texture({
    width: width,
    height: height,
    data: cells
  });
  var drawSand = regl({
    frag: fsh,
    uniforms: {
      t: function t(_ref2) {
        var tick = _ref2.tick;
        return tick;
      },
      data: function data() {
        // if (cell_pointer != universe.cells()) {
        //   console.log(cell_pointer);
        // }
        cell_pointer = universe.cells();
        cells = new Uint8Array(_crate_pkg_sandtable_bg__WEBPACK_IMPORTED_MODULE_0__["memory"].buffer, cell_pointer, width * height * 4); // }

        return dataTexture({
          width: width,
          height: height,
          data: cells
        });
      },
      resolution: function resolution(_ref3) {
        var viewportWidth = _ref3.viewportWidth,
            viewportHeight = _ref3.viewportHeight;
        return [viewportWidth, viewportHeight];
      },
      dpi: window.devicePixelRatio * 2,
      isSnapshot: isSnapshot // backBuffer: lastFrame

    },
    vert: vsh,
    attributes: {
      // Full screen triangle
      position: [[-1, 4], [-1, -1], [4, -1]]
    },
    // Our triangle has 3 vertices
    count: 3
  });
  return function () {
    regl.poll();
    drawSand();
  };
};

var snapshot = function snapshot(universe, cb) {
  var canvas = document.createElement("canvas");
  canvas.width = universe.width() / 2;
  canvas.height = universe.height() / 2;
  var render = startWebGL({
    universe: universe,
    canvas: canvas,
    isSnapshot: true
  });
  render();
  return canvas.toDataURL("image/png");
};



/***/ })

}]);
//# sourceMappingURL=1.6b26c4013d9c3311e3e5.js.map