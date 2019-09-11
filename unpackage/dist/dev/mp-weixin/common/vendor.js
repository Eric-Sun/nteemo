(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],[
/* 0 */
/*!***************************************************!*\
  !*** /Users/sunbo/project/j13/v10/nteemo/main.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, createApp) {__webpack_require__(/*! uni-pages */ 4);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _App = _interopRequireDefault(__webpack_require__(/*! ./App */ 5));
var _wx = _interopRequireDefault(__webpack_require__(/*! flyio/dist/npm/wx */ 9));
var _const = __webpack_require__(/*! @/const */ 10);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}



_vue.default.prototype.$http = function (data, successFunction, failFunction) {
  uni.request({
    url: _const.api,
    data: data,
    success: function success(res) {
      if (res.data.code == null) {
        successFunction(res);
      } else {
        uni.showToast({
          title: tips_msg.server_error + "code=(" + res.data.code + ")",
          icon: 'none',
          duration: 2000 });

      }
    },
    fail: function fail(res) {
      uni.showToast({
        title: tips_msg.server_error,
        icon: 'none',
        duration: 2000 });

      failFunction(res);
    } });


};
_vue.default.config.productionTip = false;
_App.default.mpType = 'app';

var app = new _vue.default(_App.default);
createApp(app).$mount();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createApp"]))

/***/ }),
/* 1 */
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance");}function _iterableToArrayLimit(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance");}function _iterableToArray(iter) {if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;}}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.then(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

var CALLBACK_API_RE = /^on/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name);
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name);
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name);
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
      /* eslint-disable no-extend-native */
      if (!Promise.prototype.finally) {
        Promise.prototype.finally = function (callback) {
          var promise = this.constructor;
          return this.then(
          function (value) {return promise.resolve(callback()).then(function () {return value;});},
          function (reason) {return promise.resolve(callback()).then(function () {
              throw reason;
            });});

        };
      }
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };




var baseApi = /*#__PURE__*/Object.freeze({
  upx2px: upx2px,
  interceptors: interceptors,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var protocols = {
  previewImage: previewImage };

var todos = [];
var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });




var api = /*#__PURE__*/Object.freeze({});



var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
    vueOptions = VueComponent.extendOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions['behaviors'];
  var vueExtends = vueOptions['extends'];
  var vueMixins = vueOptions['mixins'];

  var vueProps = vueOptions['props'];

  if (!vueProps) {
    vueOptions['props'] = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps['name'] = {
            type: String,
            default: '' };

          vueProps['value'] = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts['default'];
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          ret.push(handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName)));

        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属
  var parentVm = $children.find(function (childVm) {return childVm.$scope._$vueId === vuePid;});
  if (parentVm) {
    return parentVm;
  }
  // 反向递归查找
  for (var i = $children.length - 1; i >= 0; i--) {
    parentVm = findVmByVueId($children[i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var componentOptions = {
    options: {
      multipleSlots: true,
      addGlobalClass: true },

    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };



  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),
/* 2 */
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.10
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    {
      if(vm.$scope && vm.$scope.is){
        return vm.$scope.is
      }
    }
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
Dep.target = null;
var targetStack = [];

function pushTarget (target) {
  targetStack.push(target);
  Dep.target = target;
}

function popTarget () {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      protoAugment(value, arrayMethods);
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Techinically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length));
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i);
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a speical value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack becaues all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    vm.mpHost !== 'mp-toutiao' && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    vm.mpHost !== 'mp-toutiao' && initProvide(vm); // resolve provide after data/props
    vm.mpHost !== 'mp-toutiao' && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.10';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  vm.mpHost !== 'mp-toutiao' && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err) {
    console.error(err);
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope) {
        return this.$scope[method](args)
      }
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string,number
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 3 */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/*!******************************************************!*\
  !*** /Users/sunbo/project/j13/v10/nteemo/pages.json ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 9 */
/*!*******************************************!*\
  !*** ./node_modules/flyio/dist/npm/wx.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else { var i, a; }
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = {
    type: function type(ob) {
        return Object.prototype.toString.call(ob).slice(8, -1).toLowerCase();
    },
    isObject: function isObject(ob, real) {
        if (real) {
            return this.type(ob) === "object";
        } else {
            return ob && (typeof ob === 'undefined' ? 'undefined' : _typeof(ob)) === 'object';
        }
    },
    isFormData: function isFormData(val) {
        return typeof FormData !== 'undefined' && val instanceof FormData;
    },
    trim: function trim(str) {
        return str.replace(/(^\s*)|(\s*$)/g, '');
    },
    encode: function encode(val) {
        return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
    },
    formatParams: function formatParams(data) {
        var str = "";
        var first = true;
        var that = this;
        if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) != "object") {
            return data;
        }
        function _encode(sub, path) {
            var encode = that.encode;
            var type = that.type(sub);
            if (type == "array") {
                sub.forEach(function (e, i) {
                    _encode(e, path + "%5B%5D");
                });
            } else if (type == "object") {
                for (var key in sub) {
                    if (path) {
                        _encode(sub[key], path + "%5B" + encode(key) + "%5D");
                    } else {
                        _encode(sub[key], encode(key));
                    }
                }
            } else {
                if (!first) {
                    str += "&";
                }
                first = false;
                str += path + "=" + encode(sub);
            }
        }

        _encode(data, "");
        return str;
    },

    // Do not overwrite existing attributes
    merge: function merge(a, b) {
        for (var key in b) {
            if (!a.hasOwnProperty(key)) {
                a[key] = b[key];
            } else if (this.isObject(b[key], 1) && this.isObject(a[key], 1)) {
                this.merge(a[key], b[key]);
            }
        }
        return a;
    }
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

function KEEP(_,cb){cb();}
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * author: wendu
 * email: 824783146@qq.com
 **/

var util = __webpack_require__(0);
var isBrowser = typeof document !== "undefined";

//EngineWrapper can help  generating  a  http engine quickly through a adapter
function EngineWrapper(adapter) {
    var AjaxEngine = function () {
        function AjaxEngine() {
            _classCallCheck(this, AjaxEngine);

            this.requestHeaders = {};
            this.readyState = 0;
            this.timeout = 0; // 0 stands for no timeout
            this.responseURL = "";
            this.responseHeaders = {};
        }

        _createClass(AjaxEngine, [{
            key: "_call",
            value: function _call(name) {
                this[name] && this[name].apply(this, [].splice.call(arguments, 1));
            }
        }, {
            key: "_changeReadyState",
            value: function _changeReadyState(state) {
                this.readyState = state;
                this._call("onreadystatechange");
            }
        }, {
            key: "open",
            value: function open(method, url) {
                this.method = method;
                if (!url) {
                    url = location.href;
                } else {
                    url = util.trim(url);
                    if (url.indexOf("http") !== 0) {
                        // Normalize the request url
                        if (isBrowser) {
                            var t = document.createElement("a");
                            t.href = url;
                            url = t.href;
                        }
                    }
                }
                this.responseURL = url;
                this._changeReadyState(1);
            }
        }, {
            key: "send",
            value: function send(arg) {
                var _this = this;

                arg = arg || null;
                var self = this;
                if (adapter) {
                    var request = {
                        method: self.method,
                        url: self.responseURL,
                        headers: self.requestHeaders || {},
                        body: arg
                    };
                    util.merge(request, self._options || {});
                    if (request.method === "GET") {
                        request.body = null;
                    }
                    self._changeReadyState(3);
                    var timer;
                    self.timeout = self.timeout || 0;
                    if (self.timeout > 0) {
                        timer = setTimeout(function () {
                            if (self.readyState === 3) {
                                _this._call("onloadend");
                                self._changeReadyState(0);
                                self._call("ontimeout");
                            }
                        }, self.timeout);
                    }
                    request.timeout = self.timeout;
                    adapter(request, function (response) {

                        function getAndDelete(key) {
                            var t = response[key];
                            delete response[key];
                            return t;
                        }

                        // If the request has already timeout, return
                        if (self.readyState !== 3) return;
                        clearTimeout(timer);

                        // Make sure the type of status is integer
                        self.status = getAndDelete("statusCode") - 0;

                        var responseText = getAndDelete("responseText");
                        var statusMessage = getAndDelete("statusMessage");

                        // Network error, set the status code 0
                        if (!self.status) {
                            self.statusText = responseText;
                            self._call("onerror", { msg: statusMessage });
                        } else {
                            // Parsing the response headers to array in a object,  because
                            // there may be multiple values with the same header name
                            var responseHeaders = getAndDelete("headers");
                            var headers = {};
                            for (var field in responseHeaders) {
                                var value = responseHeaders[field];
                                var key = field.toLowerCase();
                                // Is array
                                if ((typeof value === "undefined" ? "undefined" : _typeof(value)) === "object") {
                                    headers[key] = value;
                                } else {
                                    headers[key] = headers[key] || [];
                                    headers[key].push(value);
                                }
                            }
                            var cookies = headers["set-cookie"];
                            if (isBrowser && cookies) {
                                cookies.forEach(function (e) {
                                    // Remove the http-Only property of the  cookie
                                    // so that JavaScript can operate it.
                                    document.cookie = e.replace(/;\s*httpOnly/ig, "");
                                });
                            }
                            self.responseHeaders = headers;
                            // Set the fields of engine from response
                            self.statusText = statusMessage || "";
                            self.response = self.responseText = responseText;
                            self._response = response;
                            self._changeReadyState(4);
                            self._call("onload");
                        }
                        self._call("onloadend");
                    });
                } else {
                    console.error("Ajax require adapter");
                }
            }
        }, {
            key: "setRequestHeader",
            value: function setRequestHeader(key, value) {
                this.requestHeaders[util.trim(key)] = value;
            }
        }, {
            key: "getResponseHeader",
            value: function getResponseHeader(key) {
                return (this.responseHeaders[key.toLowerCase()] || "").toString() || null;
            }
        }, {
            key: "getAllResponseHeaders",
            value: function getAllResponseHeaders() {
                var str = "";
                for (var key in this.responseHeaders) {
                    str += key + ":" + this.getResponseHeader(key) + "\r\n";
                }
                return str || null;
            }
        }, {
            key: "abort",
            value: function abort(msg) {
                this._changeReadyState(0);
                this._call("onerror", { msg: msg });
                this._call("onloadend");
            }
        }], [{
            key: "setAdapter",
            value: function setAdapter(requestAdapter) {
                adapter = requestAdapter;
            }
        }]);

        return AjaxEngine;
    }();

    return AjaxEngine;
}

// learn more about keep-loader: https://github.com/wendux/keep-loader
;
module.exports = EngineWrapper;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

function KEEP(_,cb){cb();}
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var utils = __webpack_require__(0);
var isBrowser = typeof document !== "undefined";

var Fly = function () {
    function Fly(engine) {
        _classCallCheck(this, Fly);

        this.engine = engine || XMLHttpRequest;

        this.default = this; //For typeScript

        /**
         * Add  lock/unlock API for interceptor.
         *
         * Once an request/response interceptor is locked, the incoming request/response
         * will be added to a queue before they enter the interceptor, they will not be
         * continued  until the interceptor is unlocked.
         *
         * @param [interceptor] either is interceptors.request or interceptors.response
         */
        function wrap(interceptor) {
            var resolve;
            var reject;

            function _clear() {
                interceptor.p = resolve = reject = null;
            }

            utils.merge(interceptor, {
                lock: function lock() {
                    if (!resolve) {
                        interceptor.p = new Promise(function (_resolve, _reject) {
                            resolve = _resolve;
                            reject = _reject;
                        });
                    }
                },
                unlock: function unlock() {
                    if (resolve) {
                        resolve();
                        _clear();
                    }
                },
                clear: function clear() {
                    if (reject) {
                        reject("cancel");
                        _clear();
                    }
                }
            });
        }

        var interceptors = this.interceptors = {
            response: {
                use: function use(handler, onerror) {
                    this.handler = handler;
                    this.onerror = onerror;
                }
            },
            request: {
                use: function use(handler) {
                    this.handler = handler;
                }
            }
        };

        var irq = interceptors.request;
        var irp = interceptors.response;
        wrap(irp);
        wrap(irq);

        this.config = {
            method: "GET",
            baseURL: "",
            headers: {},
            timeout: 0,
            params: {}, // Default Url params
            parseJson: true, // Convert response data to JSON object automatically.
            withCredentials: false
        };
    }

    _createClass(Fly, [{
        key: "request",
        value: function request(url, data, options) {
            var _this = this;

            var engine = new this.engine();
            var contentType = "Content-Type";
            var contentTypeLowerCase = contentType.toLowerCase();
            var interceptors = this.interceptors;
            var requestInterceptor = interceptors.request;
            var responseInterceptor = interceptors.response;
            var requestInterceptorHandler = requestInterceptor.handler;
            var promise = new Promise(function (resolve, reject) {
                if (utils.isObject(url)) {
                    options = url;
                    url = options.url;
                }
                options = options || {};
                options.headers = options.headers || {};

                function isPromise(p) {
                    // some  polyfill implementation of Promise may be not standard,
                    // so, we test by duck-typing
                    return p && p.then && p.catch;
                }

                /**
                 * If the request/response interceptor has been locked，
                 * the new request/response will enter a queue. otherwise, it will be performed directly.
                 * @param [promise] if the promise exist, means the interceptor is  locked.
                 * @param [callback]
                 */
                function enqueueIfLocked(promise, callback) {
                    if (promise) {
                        promise.then(function () {
                            callback();
                        });
                    } else {
                        callback();
                    }
                }

                // make the http request
                function makeRequest(options) {
                    data = options.body;
                    // Normalize the request url
                    url = utils.trim(options.url);
                    var baseUrl = utils.trim(options.baseURL || "");
                    if (!url && isBrowser && !baseUrl) url = location.href;
                    if (url.indexOf("http") !== 0) {
                        var isAbsolute = url[0] === "/";
                        if (!baseUrl && isBrowser) {
                            var arr = location.pathname.split("/");
                            arr.pop();
                            baseUrl = location.protocol + "//" + location.host + (isAbsolute ? "" : arr.join("/"));
                        }
                        if (baseUrl[baseUrl.length - 1] !== "/") {
                            baseUrl += "/";
                        }
                        url = baseUrl + (isAbsolute ? url.substr(1) : url);
                        if (isBrowser) {

                            // Normalize the url which contains the ".." or ".", such as
                            // "http://xx.com/aa/bb/../../xx" to "http://xx.com/xx" .
                            var t = document.createElement("a");
                            t.href = url;
                            url = t.href;
                        }
                    }

                    var responseType = utils.trim(options.responseType || "");
                    var isGet = options.method === "GET";
                    var dataType = utils.type(data);
                    var params = options.params || {};

                    // merge url params when the method is "GET" (data is object)
                    if (isGet && dataType === "object") {
                        params = utils.merge(data, params);
                    }
                    // encode params to String
                    params = utils.formatParams(params);

                    // save url params
                    var _params = [];
                    if (params) {
                        _params.push(params);
                    }
                    // Add data to url params when the method is "GET" (data is String)
                    if (isGet && data && dataType === "string") {
                        _params.push(data);
                    }

                    // make the final url
                    if (_params.length > 0) {
                        url += (url.indexOf("?") === -1 ? "?" : "&") + _params.join("&");
                    }

                    engine.open(options.method, url);

                    // try catch for ie >=9
                    try {
                        engine.withCredentials = !!options.withCredentials;
                        engine.timeout = options.timeout || 0;
                        if (responseType !== "stream") {
                            engine.responseType = responseType;
                        }
                    } catch (e) {}

                    var customContentType = options.headers[contentType] || options.headers[contentTypeLowerCase];

                    // default content type
                    var _contentType = "application/x-www-form-urlencoded";
                    // If the request data is json object, transforming it  to json string,
                    // and set request content-type to "json". In browser,  the data will
                    // be sent as RequestBody instead of FormData
                    if (utils.trim((customContentType || "").toLowerCase()) === _contentType) {
                        data = utils.formatParams(data);
                    } else if (!utils.isFormData(data) && ["object", "array"].indexOf(utils.type(data)) !== -1) {
                        _contentType = 'application/json;charset=utf-8';
                        data = JSON.stringify(data);
                    }
                    //If user doesn't set content-type, set default.
                    if (!(customContentType || isGet)) {
                        options.headers[contentType] = _contentType;
                    }

                    for (var k in options.headers) {
                        if (k === contentType && utils.isFormData(data)) {
                            // Delete the content-type, Let the browser set it
                            delete options.headers[k];
                        } else {
                            try {
                                // In browser environment, some header fields are readonly,
                                // write will cause the exception .
                                engine.setRequestHeader(k, options.headers[k]);
                            } catch (e) {}
                        }
                    }

                    function onresult(handler, data, type) {
                        enqueueIfLocked(responseInterceptor.p, function () {
                            if (handler) {
                                //如果失败，添加请求信息
                                if (type) {
                                    data.request = options;
                                }
                                var ret = handler.call(responseInterceptor, data, Promise);
                                data = ret === undefined ? data : ret;
                            }
                            if (!isPromise(data)) {
                                data = Promise[type === 0 ? "resolve" : "reject"](data);
                            }
                            data.then(function (d) {
                                resolve(d);
                            }).catch(function (e) {
                                reject(e);
                            });
                        });
                    }

                    function onerror(e) {
                        e.engine = engine;
                        onresult(responseInterceptor.onerror, e, -1);
                    }

                    function Err(msg, status) {
                        this.message = msg;
                        this.status = status;
                    }

                    engine.onload = function () {
                        // The xhr of IE9 has not response field
                        var response = engine.response || engine.responseText;
                        if (response && options.parseJson && (engine.getResponseHeader(contentType) || "").indexOf("json") !== -1
                        // Some third engine implementation may transform the response text to json object automatically,
                        // so we should test the type of response before transforming it
                        && !utils.isObject(response)) {
                            response = JSON.parse(response);
                        }

                        var headers = engine.responseHeaders;
                        // In browser
                        if (!headers) {
                            headers = {};
                            var items = (engine.getAllResponseHeaders() || "").split("\r\n");
                            items.pop();
                            items.forEach(function (e) {
                                if (!e) return;
                                var key = e.split(":")[0];
                                headers[key] = engine.getResponseHeader(key);
                            });
                        }
                        var status = engine.status;
                        var statusText = engine.statusText;
                        var data = { data: response, headers: headers, status: status, statusText: statusText };
                        // The _response filed of engine is set in  adapter which be called in engine-wrapper.js
                        utils.merge(data, engine._response);
                        if (status >= 200 && status < 300 || status === 304) {
                            data.engine = engine;
                            data.request = options;
                            onresult(responseInterceptor.handler, data, 0);
                        } else {
                            var e = new Err(statusText, status);
                            e.response = data;
                            onerror(e);
                        }
                    };

                    engine.onerror = function (e) {
                        onerror(new Err(e.msg || "Network Error", 0));
                    };

                    engine.ontimeout = function () {
                        onerror(new Err("timeout [ " + engine.timeout + "ms ]", 1));
                    };
                    engine._options = options;
                    setTimeout(function () {
                        engine.send(isGet ? null : data);
                    }, 0);
                }

                enqueueIfLocked(requestInterceptor.p, function () {
                    utils.merge(options, _this.config);
                    var headers = options.headers;
                    headers[contentType] = headers[contentType] || headers[contentTypeLowerCase] || "";
                    delete headers[contentTypeLowerCase];
                    options.body = data || options.body;
                    url = utils.trim(url || "");
                    options.method = options.method.toUpperCase();
                    options.url = url;
                    var ret = options;
                    if (requestInterceptorHandler) {
                        ret = requestInterceptorHandler.call(requestInterceptor, options, Promise) || options;
                    }
                    if (!isPromise(ret)) {
                        ret = Promise.resolve(ret);
                    }
                    ret.then(function (d) {
                        //if options continue
                        if (d === options) {
                            makeRequest(d);
                        } else {
                            resolve(d);
                        }
                    }, function (err) {
                        reject(err);
                    });
                });
            });
            promise.engine = engine;
            return promise;
        }
    }, {
        key: "all",
        value: function all(promises) {
            return Promise.all(promises);
        }
    }, {
        key: "spread",
        value: function spread(callback) {
            return function (arr) {
                return callback.apply(null, arr);
            };
        }
    }]);

    return Fly;
}();

//For typeScript


Fly.default = Fly;

["get", "post", "put", "patch", "head", "delete"].forEach(function (e) {
    Fly.prototype[e] = function (url, data, option) {
        return this.request(url, data, utils.merge({ method: e }, option));
    };
});
        ["lock", "unlock", "clear"].forEach(function (e) {
            Fly.prototype[e] = function () {
                this.interceptors.request[e]();
            };
        });
// Learn more about keep-loader: https://github.com/wendux/keep-loader
;
module.exports = Fly;

/***/ }),
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//微信小程序适配器
module.exports = function (request, responseCallback) {
    var con = {
        method: request.method,
        url: request.url,
        dataType: request.dataType || undefined,
        header: request.headers,
        data: request.body || {},
        success: function success(res) {
            responseCallback({
                statusCode: res.statusCode,
                responseText: res.data,
                headers: res.header,
                statusMessage: res.errMsg
            });
        },
        fail: function fail(res) {
            responseCallback({
                statusCode: res.statusCode || 0,
                statusMessage: res.errMsg
            });
        }
    };
    wx.request(con);
};

/***/ }),
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//微信小程序入口
var Fly = __webpack_require__(2);
var EngineWrapper = __webpack_require__(1);
var adapter = __webpack_require__(6);
var wxEngine = EngineWrapper(adapter);
module.exports = function (engine) {
    return new Fly(engine || wxEngine);
};

/***/ })
/******/ ]);
});

/***/ }),
/* 10 */
/*!****************************************************!*\
  !*** /Users/sunbo/project/j13/v10/nteemo/const.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.tips_msg = exports.no_token_value = exports.reply_size_per_page = exports.barId = exports.api = void 0;var api = 'https://api.cosydesign.cn/api';exports.api = api;
var barId = 12;
// 
// export const api = 'http://localhost:8081/api'
// export const barId =1
//
exports.barId = barId;var reply_size_per_page = 100;exports.reply_size_per_page = reply_size_per_page;
var no_token_value = 0;exports.no_token_value = no_token_value;

var tips_msg = {
  "server_error": "服务器开小差了，请您稍后重试" };exports.tips_msg = tips_msg;

/***/ }),
/* 11 */
/*!***********************************************************************************!*\
  !*** /Users/sunbo/project/j13/v10/nteemo/main.js?{"page":"pages%2Findex%2Fmain"} ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _main = _interopRequireDefault(__webpack_require__(/*! ./pages/index/main.vue */ 12));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_main.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */
/*!**************************************************************!*\
  !*** /Users/sunbo/project/j13/v10/nteemo/static/refresh.png ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAEU0lEQVRoQ+1ZS3LTQBB9M/KecALCCQgnwC5ktjgniHMCzB47wmaPc4IkJ8BssakoJyA5Ac4JSPbRNNUaR9+RNVIsTKqiVSqeT7/u91rdLYFH/ohHbj+eAGw7gpuNwA9vD63gGUi0I2CEJSQtIZxrdLzlpgE/DMC5t4NAHQDUBkTPwrglQJeAmMEdn1msL11SD8C5t4sgOFoZvVN6i3nBEgKnkPIYHe+m5hkVRcweV+oDCJ75QroGUwbCj34X2AXRLoA9CPHMsI+NH9SNiH0EmN9CnUBgL20EXUFgCun4pRzXZ/QgqA+IF5lzfDjOftVo2AGYf2pDyG8AYroQXQDkofsl9nYVHiw+9QAxzQBZQsl9vPMubY8qB/Bz2AeJkzir0C0kBng7ObW9pHAdU/JODSBwlFhzAyU7tiDWA+CQS3Uee56uoZye7eHWADkaJE4TGrmBI1/a0KkYgE6RvxPGX8Fx2jaHWhueXBjqI/BjEOTDnXSiJYvRFMAHgE7hTg7v/18MINoAgOgW5LQ37vksUq01jrh+CJ/RHXsI03boTP2448huM4DcQapTW6xVwzEfeSlNMJXugh6E+LoC9R3dcfTSLAAw+hWlS0JqQ1V7aq1fDPlt/Wq19wyEV5E9gg6TCSQPQAv3l0ZLt2g5e6X5vZaVq02L0UH4lyO/R/rKMiB5viOfJ3WYB7AYcXrUhwJncMf9h9i3dm82RbNAic5Cus6HLOg3mf05e0wA/kSZR8nXjQo3ByAyl4s+Lkniqjb8Se3D/TJLgkoDSIWOruFOuIZp9glBYJDgvPk+pnN3kiscMwCGg0jtTdMna6bW3gBEnHFMRZ+RzhkAiRR2n4Ob9b/5dI6KQj+lgQI6ZyMQC4f+Ye4vchK/wO5UH1B+0Xvo/wZgEf0nABZOanRJOgLpAu4juhOuALf36Ar1AIIusvn/3qj/J42a3DQfzSDwflVqcH+QG8ukASTrIGAJd/xya+7X/QhXBfrJ1EDmCPB/58Ob6EWiu6KND6OsnJIqM+gK7iQzTNCnbLeYW4dkMTyPaiGiQj3mAWRL2W1EoYINBQ1NqpRttqQ2RSHp/ZKazK6lNJSxVjyus2ieKihZvGt1uK6pTzY2POZ43bigi5r6NY4oGasE3JvqESDhEiQPG2tw8jOowsyTxGMz2NL9sX4qTc2sGZQdXepefNdmBlU+WjRNzQAP7vjY2sB1C3+OjlLT7oozqHIAfHluahZyygfR59rzonC4K3nWE7etFY03v8iKvBVyNJjlxuKsDR6vO/KiVOSa5zxpGKQMD/1BF2g5PRva2GvABIYnZyDunU19q54mMCgp4q8uFH6C4lIg/zWHvc6UrFn52lEoC0TPKr01DXi5PELDxRQtOa3q9YdFILk7/OQU9KD4Ax+1C6IS72CjhZhBkL+R7wvGYq7cd8UrQrHf7Wi6iARdlI9Wa1mqkRp316NQjYua2vIEoCnP2p776CPwF8OS6UBXzeI8AAAAAElFTkSuQmCC"

/***/ }),
/* 16 */,
/* 17 */,
/* 18 */
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 19);


/***/ }),
/* 19 */
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 20);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),
/* 20 */
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),
/* 21 */
/*!********************************************************!*\
  !*** /Users/sunbo/project/j13/v10/nteemo/utils/net.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.checkT = checkT;exports.handleResponse = handleResponse;var _wx = _interopRequireDefault(__webpack_require__(/*! flyio/dist/npm/wx */ 9));
var _const = __webpack_require__(/*! ../const */ 10);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

function checkT(t, falseFunction, trueFunction) {
  new _wx.default().get("".concat(_const.api),
  {
    act: 'user.checkToken',
    t: t }).
  then(function (res) {
    if (res.data.result == 1) {
      falseFunction();
    } else {
      trueFunction();
    }
  });
}

/**
   * 处理服务端返回的信息，如果有错误的话，会对应的弹出错误框
   * @param res
   * @param falseFunction
   * @param trueFunction
   */
function handleResponse(res, falseFunction, trueFunction) {


}

/***/ }),
/* 22 */
/*!**********************************************************!*\
  !*** /Users/sunbo/project/j13/v10/nteemo/utils/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.formatTime = formatTime;exports.passTime = passTime;exports.getURL = getURL;exports.debounce = debounce; // import { POINT_CONVERSION_COMPRESSED } from "constants";

function formatNumber(n) {
  var str = n.toString();
  return str[1] ? str : "0".concat(str);
}

function formatTime(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();

  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();

  var t1 = [year, month, day].map(formatNumber).join('/');
  var t2 = [hour, minute, second].map(formatNumber).join(':');

  return "".concat(t1, " ").concat(t2);
}

// 计算离当前多久
function passTime(time) {
  var now = Date.now();
  var t = (now - time) / 1000 / 60; // 分钟
  var result;
  if (t / 60 / 24 / 30 / 12 > 1) {
    result = "".concat(Math.floor(t / 60 / 24 / 30 / 12), "\u5E74\u524D");
    return result;
  } else if (t / 60 / 24 / 30 > 1) {
    result = "".concat(Math.floor(t / 60 / 24 / 30), "\u6708\u524D");
    return result;
  } else if (t / 60 / 24 > 1) {
    result = "".concat(Math.floor(t / 60 / 24), "\u5929\u524D");
    return result;
  } else if (t / 60 > 1) {
    // 小时
    result = "".concat(Math.floor(t / 60), "\u5C0F\u65F6\u524D");
    return result;
  } else {
    // 分钟
    result = "".concat(Math.floor(t), "\u5206\u949F\u524D");
    return result;
  }
}

// 获取当前的路由
function getURL() {
  return getCurrentPages().slice(-1)[0].route;
}

function debounce(fn) {var interval = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;
  var timeout = null;
  return function () {var _this = this,_arguments = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      fn.apply(_this, _arguments);
    }, interval);
  };
}

/***/ }),
/* 23 */,
/* 24 */,
/* 25 */
/*!*************************************************************************************!*\
  !*** /Users/sunbo/project/j13/v10/nteemo/main.js?{"page":"pages%2Fpublish%2Fmain"} ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _main = _interopRequireDefault(__webpack_require__(/*! ./pages/publish/main.vue */ 26));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_main.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */
/*!************************************************************************************!*\
  !*** /Users/sunbo/project/j13/v10/nteemo/main.js?{"page":"pages%2Fnotice%2Fmain"} ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _main = _interopRequireDefault(__webpack_require__(/*! ./pages/notice/main.vue */ 34));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_main.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */
/*!********************************************************************************!*\
  !*** /Users/sunbo/project/j13/v10/nteemo/main.js?{"page":"pages%2Fme%2Fmain"} ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _main = _interopRequireDefault(__webpack_require__(/*! ./pages/me/main.vue */ 42));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_main.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */
/*!**********************************************************************************!*\
  !*** /Users/sunbo/project/j13/v10/nteemo/main.js?{"page":"pages%2Fuser%2Fmain"} ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _main = _interopRequireDefault(__webpack_require__(/*! ./pages/user/main.vue */ 50));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_main.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */
/*!***********************************************************************************!*\
  !*** /Users/sunbo/project/j13/v10/nteemo/main.js?{"page":"pages%2Freply%2Fmain"} ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _main = _interopRequireDefault(__webpack_require__(/*! ./pages/reply/main.vue */ 58));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_main.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */
/*!**************************************************************!*\
  !*** /Users/sunbo/project/j13/v10/nteemo/static/comment.png ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */
/*!****************************************************************************************!*\
  !*** /Users/sunbo/project/j13/v10/nteemo/main.js?{"page":"pages%2Fcollection%2Fmain"} ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _main = _interopRequireDefault(__webpack_require__(/*! ./pages/collection/main.vue */ 67));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_main.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */
/*!************************************************************************************!*\
  !*** /Users/sunbo/project/j13/v10/nteemo/main.js?{"page":"pages%2Fmember%2Fmain"} ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _main = _interopRequireDefault(__webpack_require__(/*! ./pages/member/main.vue */ 75));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_main.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */
/*!************************************************************************************!*\
  !*** /Users/sunbo/project/j13/v10/nteemo/main.js?{"page":"pages%2Fdetail%2Fmain"} ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _main = _interopRequireDefault(__webpack_require__(/*! ./pages/detail/main.vue */ 83));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_main.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */
/*!*****************************************************************!*\
  !*** /Users/sunbo/project/j13/v10/nteemo/static/left-arrow.png ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 87 */
/*!******************************************************************!*\
  !*** /Users/sunbo/project/j13/v10/nteemo/static/right-arrow.png ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 88 */
/*!*********************************************************************!*\
  !*** /Users/sunbo/project/j13/v10/nteemo/static/pre-collection.jpg ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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"

/***/ }),
/* 89 */
/*!*******************************************************************!*\
  !*** /Users/sunbo/project/j13/v10/nteemo/static/collectioned.png ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 90 */
/*!************************************************************!*\
  !*** /Users/sunbo/project/j13/v10/nteemo/static/share.png ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAfN0lEQVR4Xu1de5gcRbU/p3t2k12FYBaJARSQIBIVr65ks9NV64IKPuHyvoovVESEqwKiEEQEFQEV5CXKUwUVUMD3W1i3qneyiSte1FzBiMjDDY9kCY9sNjvT535HJ1yEne6enu7qnmzV9+2XP6bOo37Vv3RX1alzEGyzCFgEGiKAFhuLgEWgMQKWIPbpsAiEIGAJYh8Pi4AliH0GLALJELBvkGS4WalZgoAlyCyZaDvMZAhYgiTDzUrNEgQsQWbJRNthJkPAEiQZblZqliBgCTJLJtoOMxkCliDJcLNSswQBS5BZMtF2mMkQsARJhpuVmiUIWILMkom2w0yGgCVIMtys1CxBwBJklky0gWGilHJbAFhIRF3VavWBRx999B+rVq3aZMB2ZiYsQTKDdstVXC6Xd3Vd93VEtBcAvAQRt2diAEBphlGvJaJxRLyLiFYGQTAyMjJyKwBQOyBkCdIOs1QQH8vl8r6u636IiN6IiImfHSL6OwCcOzk5+bWxsbENBRnejG4kHmSRB2V9SxUB/nQ6HACWAcDLUtUM8AgAXOq67nlDQ0MPp6w7FXWWIKnAuGUqkVLuCQCXA8CSLEdIROsA4BStNdsq1KeXJUiWM9/GuoUQJyDiuQDgmhoGEf2mVqsdVKlUmDCFaJYghZiG4jgxODg4t1qtXoOIh+ThFRHdj4j7K6V+l4f9p9u0BCnCLBTEh3K5vJ3ruj8DgFfk6RIRbSCiQ33f/0mefrBtS5C8Z6Ag9uvkWA4AuxTBJSIKEPEwpdSNefpjCZIn+gWx7XneVohYQcSXJHDpYSK6CQDGAOBOIrpzYmLi4Z6enp5ardaDiAsR8fUAcAgivqBJ/dVarbbfyMjILU3KpdbdEiQ1KNtXkRDiJkQ8sIkR1IjoKsdxrh0eHtYAEMSRLZfLe7mueyoAHBCnP/choompqanFK1euXBNXJs1+liBpotmGuoQQ70DEb8RxnYh4C/a7tVptWaVSWR1HZqY+Qog+RDwPAMoxddyilHpNzL6pdrMESRXO9lK2ZMmSnjlz5vwVAObF8PwJADhYKfXzGH0ju/T29nZ0dXVdh4gHRXb+V4ejlFJXxOybWjdLkNSgbD9FUsprAeCIKM85NISI9vN9/46ovk3+jkKIryLiUTHkHpmamlq0YsWKtTH6ptbFEiQ1KNtL0cDAwG5BENwRI6ZqHABerpR6KKsRCiGuQMT3xtD/OaUUh7wYa5YgxqAuliEp5dUA8O4Ir6aq1Wp/pVK5LWPvHSnlzQCwf5gdInqMiHbwff+xjP15Ur0liCmkC2RncHBwm2q1+iAidkQ8kEdrrS8z4frixYs758+f/wdEfFGEvWOUUl8x4RPbsAQxhXSB7EgpjwGAL0e4dJtS6pUm3fY87wjeOo4g7ajWeqkpvyxBTCFdIDtCiFsRcTDMpSAI+n3f55N1k80RQvBbZHGY0enp6V2WL19+twnHLEFMoFwgGxyMWKvV+Bt+ptt///SUiHyttcjDbSHEexDxygjbRyqlvmbCP0sQEygXyMbAwMAAh5VHvD1O8n3/C3m43dfXt3VnZyeHu4eF2X9NKXWkCf8sQUygXCAbnucd5zjORWEuVavVPSqVyp/zclsI8UtEfG0j+0T0W60134fPvFmCZA5xsQwIIS5GxGNDHr77tdY75um153knO47zuRAfHldKbWXCR0sQEygXyIYQ4geI+JYQl4aVUq/O02UhxDsR8ethPkxNTW1r4lTdEiTPJyEH21JKXn8MhJi+Tin11hxce9JkPXtKaMyXqZ0sS5A8n4QcbEsp+d5G2PnGl5RSx+fg2pMmhRAvR8TfR/jA4S+3Z+2nJUjWCBdMv5RyBAD6Q9Ygl2mtj87T7YGBgTJvNYf5QES7a63vzNpPS5CsES6Yfiklf7rsG+LWj5VSb87TbSHEoYh4Q4QP2yulOJAy02YJkim8xVMupfw2APxXyBvk91rrXJM2eJ73Ecdxzg9Db8OGDZ1jY2PTWSNsCZI1wgXTL4T4FCKeHkKQTbVabZtKpTKZl+tSymsA4O0h9v+mlHqhCf8sQUygXCAbnucd7jjOdRHf92/TWvObJo/Gl6geQcStQ4z/XCnFiSAyb5YgmUNcLAN8UYozj0QQ5Cat9cF5eB4nFAYATldKnWnCP0sQEygXzIaU8l4AaHhaTkSbHMdZNDw8zP2MNikl5+d9XwSB99ZaD5lwzBLEBMoFsxEVbsLuEtHlWuv3m3RdSrmYiP4YcQ34ifHx8Z7Vq1dPmfDNEsQEygWzwQ8iAPwpwi3OffUirfVdptwXQgwhYmiYi2niWoKYmv2C2RFCaET0Itxa4bruq4eGhjZm7b6Ukj+r+PMqtBHRUq31aFS/tH63BEkLyTbRw/mouru7jyOiMxAxMiKWiH6mteaDw1pWQ5RSMlE5Riyq1ILxQEpLkKxmvYB6Pc97g+M4FwDAbs24R0TfmZycPCKLgznP87jGoULE50T5FATBG33f/2lUvzR/twRJE82C6qpv7V4KAInTdxLRrY8++uhbbr/9ds6wmEoTQrwZEflM5lkxFBo7+3iqL5YgMWamXbv09vbO6+rq+iQifijsDnrc8fFNPkR8l1JqVVyZmfoNDg4+e3p6+hTHceImgXti06ZNLx4dHb2vFbtJZC1BkqBWfBnODvI+RPwsAHDt8tRavW7Ht4IgONX3/XuaUbxo0aI5CxYsOAYRT0PE+U3IGkvS8HSfLEGamKV26MoLXiLifLdJan00M0TeBh5GxJuDILjR9/1/NHhbzJ2ent7XcZwDieiAOGuNp+ohou9qrQ9txrE0+1qCpIlmjro8z3sBIn6eqzLl5MbjRLQWETm59BQRzUfEbYnoOYjoJPRpZO3atXuvWrVqU0L5lsUsQVqGMF8Fvb293d3d3ScDwEkAMDehN3yvYhkRTSEiR9JGbbcmNNOUWCUIAs4obywP70zeWYI0NWfF6iyEeBsicv6qhQk920hEX5ycnDxrbGxsA+vgy0oA8M2ovL0J7cUV+/7atWsPy/PNsdlRS5C4U1agfkKIXgC4BBH7krpFRDdMT0+fONPOUH9//ytc1/0hIu6QVH9COT6MXKaU4vrshWiWIIWYhnhO9PX1Lejo6DgLAI6MUddjRqVExEkbjo0K1+jv75/vuu7nW7EVb1RP9rqXiN5pKko3rm+WIHGRyrEflwbo6en5CAB8Muah2kze/nOdoZTifFNcazBW43qC9bcVv7VSb1wTHREvcF33TBMxX80OwBKkWcQM9/c8b39EPB8Rk14xfcY6I8EQ0PO8tzmOwxVq90gg/wwRInoAES/ZsGHDhWNjY+vT0JmFDkuQLFBNQWd/f/+LXdf9SlT4d5ipsHVGUhcHBgb2CILg4Hp2xiVN6uE7HKNBEFw1MTHx7SIswqP8twSJQsjw70IIPjc4AwA+mHS7Ne46o9WheZ63veM4nAFle95JI6Ln1XfU5iLimiAI+PBw3HGccSK6W2vNyeAyiwpudTwzyVuCZIFqMp2uEIITtn2m2dPmp5hLtM5I5u7skLIEKcA8SylfTUT8OfXihO5sDILgvMcee+ysNKNtE/qyRYlZguQ4nUIIXnh/AREPTOoGrzOCIPjYyMjI35PqsHKNEbAEyeHp4HDvWq3God4nAMCcJC4Q0f9wnQ+lVGgO2yS6rcz/I2AJYvZp4O1Srn1xLiJul9C0XWckBC6JmCVIEtQSyKRw4GbXGQlwb1XEEqRVBCPkeSsUEc9GxHckNWXXGUmRa13OEqR1DGfUwLfnFi5ceCIRnYqI3UnM2HVGEtTSlWl3grie5y2oH1QxMg9OTEysyfuEVkp5MIeRI+JOCadrDREt01pzLfDYcVMJbVmxEATahiCe570KEbm23lJE3JVJQUTbNbitxpf7byei2wBgaN26dcMmSFNPYcPXXaMSsjWaErvOKBhdi04QfkMcgognI+J/JMWOiLjWxU8R8SqlFOdVCpLqmkluyZIlPZ2dnZ8GgKOTXi/l3FNBEJxkzzPSnJnWdRWSIPXvd06c/LGwLOQJh39fEATnTExMXNbqW2VwcLBUrVaPrcdOzUvij11nJEHNnEzhCCKl3A8AvgIAO2cJAxHdXz9o+34SO1JKTsLGydiaylL4FFt2nZEEeMMyhSFI/a3xJQD4gEkMiOhsrTXfc4j12cVZCjnuCRGTFrq06wyTE9yirUIQpFwub+c4zo8R8VUtjieROBH9slQqHTQ0NPR4IwV9fX1bd3Z2nkZEH06a0MCuMxJNT65CuROkXC6/1HXdX7SQmSMVAIloFRG9YYZsgY7neUc6jnN20iyFdp2RyhTloiRXggghXg4AnNk7Mg2/IXTuDYJg6eYsgfUshZw9hP1M0uw6IwlqBZLJjSDlcnlX13W5EEpPs3hwDT1E/C0AcCTrXUEQ/N1xHIeIehCxh4j4nORAROSbbk01LnBZq9UOKZVKHG3bsJ54hFK+Wnre+vXrP2vvZzQFf+E650IQztIxf/782xCRS4HFbkTEVZGuXL9+/XdiPHhcTngJIh5BRHw+0RnbUAsd7TqjBfAKKJoLQaSU5wHA8U3gsRIATlFK/boJmSe7ct5ax3HOJKJ3JD3Ii7Jr1xlRCLXn78YJUs/aNxYn8RkRPQgAH9VaX5tGTFK5XOYs499DxK4Up8uuM1IEs2iqTBPEkVJyZouXxQDiXk55Mzw8/LcYfWN3kVJyqpqfA8A2sYVm7mjXGS0C2A7iRgnied7hjuNwya2oxrtJotkCLVFKN//OQYWO4+ikJLHrjLhIt38/owQRQnCR+KjCLg8TUV/W9bnrbxKurBq7ZIBdZ7T/A9/sCIwRZGBgoExEcRIMvF4pxZ9AmTdO9Y+IN8QwxOuMU7XWV6exFophz3YpCALGCCKEuAwRjwobNxFdo7V+p0lshBAVRFwa4dflWmuOLrZtliFgiiBcVHICEbduhG89y/fOSqmHTM5BPSr3VxEEmdBaP7fd0maaxHFLtWWEILy1WyqVfhfxEJ6jteZSYsabEGJ5VDEaIloaVVPDuOPWYOYIGCGIEIIjYDmUvWGr1WqvGBkZ4S1g483zvOMcx7kozHAQBMf7vh86BuOOW4OZI2CKIFci4ntCPq/+rrXO9IJUGJJSSq7xN2MZ46fIXauUSpy6J/OZtAYyQcAIQaSUvHtVDiHIt7XWb8tkhDGVSin5E5BT+TdqFaVUwzHENGO7tRkCpghyb9jdciLicJIv5omdEOKmiCTS40qppqOD8xyTtd06AkYIIoR4NOzOBxEdprX+TuvDSa5BCPFlRDwmRMMTSqlnJ7dgJdsRASMEkVJGJT97bdJI3bRAl1JygUyu7NSwKaWM4JXWmKye1hEwMuFCiFpYmHmtVttvZGSEr93m1jzPO9lxnM+FrJMCrbWbm4PWcC4ImCLIWkSc32iEQRC82/d9Lk+cW5NScvH6k0II8pjWuuFBZ26OW8OZImCKIH8NK2McBMEpvu9zUoTcmpSS75wcEUKQXLeicwNmlhs2QhApJQcf7hvy8F2mteYClrk1KeVfAGBRiAO3KKU4WZxtswgBUwThU+rjQnBdo5Tiw7pcWpyDQiLKncS5gDPLjRohiOd573Ich1P5N2xBEPT7vr88j/mIEwpThHVSHtjMdptGCDIwMLALEd0VBjYRXai1/nAeExLjFB1qtdrONvN6HrOTr00jBOEhSin5bnlYvNXGqampHVesWLHWJCTlcnkf13VDs6UQ0e+11mFhKCZdtrYMImCMIEKITyPiJ4r2FhFCDHFyiAi/flYqlQ4cGhraaHBurKkCIGCMIP39/Ytc170zLN0PZ0wkoj1937/DBDZCiA8h4gVxbBHRPfUURLmGxMTx1fZJDwFjBKl/Zn0PAA6I+N/6nunp6SWjo6MPpDfMZ2qqX+KqAMCcZuzwvXrO1Oj7/p+akbN92xMBowQpl8t7ua67IgoqIvpjqVSSQ0NDj0T1TfI7l2Z2HIdz+ybaWiYiriVyRalUOnVoaOjhJD5YmfZAwChB6m+R7wLAwVHwENGfEXEfpdR4VN9mfl+6dOnOHR0dt6ZUwWo9Bzi6rnvR0NBQtRk/bN/2QMA4Qfbaa6/nzZ07l0+t44SO31etVveuVCqr04CTEzQQ0TcRkUtHp9l4PMfkHZGc5oCsrn8hYJwgbDTOweFTJugJIjp/enr686Ojo48mmbjBwcFtq9XqmRH3PZKofroMV8k6fnh4mAlj2xaAQC4EaeZT6ykYryeiLziOc33cB1AI8SIAeC+HuSBid9z5IqKHEJHT/DTdiGgaAC4kojN833+saQVWoFAI5EaQPffc81nz5s27BQA4mXRTjculAcCPAOB+IlrLD7Trut1BEOyIiM8HAP7bI0ltdc67Ozk5ecTcuXOPdhznMwCQtLzzg4h4qlLqSpuNsanpLVTn3AjCKAwODm5TrVa5KE5Uvl5ToP3Cdd03bV5w9/f3z3dd90xeXyStK8L5fAHgaJtTy9QUpmsnV4LwUHp7e+d1dXXdjIh7pzu05rRxpds1a9a8ZfXq1VzW4N8aZ4NHRK5VGHriHmHx+k2bNn10dHT0vuY8s73zRCB3gtQH7wohzkLEj+UBBhH9aHJy8qCxsTFePzRsnucdhIhcI32nJH4S0SQAnFsqlc62YStJEDQvUxSC/HPkUspDiIiTzJm62voEX7NVSl0aF/pFixbNWbhw4Ymc7b2Zhf/T9HP9k5N8378+rl3bLx8ECkWQOkn4dPt8ADg8K0iIiLOsXFetVpctX7787iR26qfx5wDA25PIs0y9HMSxWmtep9hWQAQKR5DNGNVrGZ6EiIcBQCrZRDgYkomBiOcopXgnrOUmhOgDAF6f9CZRxmEriHiV67qn2LCVJAhmK1NYgmwedr1CLV/X5focTW+51muqKyL6QalU+kZG8V0opXwXEZ2DiNslmTIi4kPQM0ul0gU2bCUJgtnIFJ4gm4fd29vb0dnZ+VLXdfsBYFdE5DSg/MefZNsTEUfScwQwx27x7cXbgyD4/caNG/2xsbEN2cD371o9z9uqfufleETsSGKTiO4kIs4k/5Mk8lYmXQTahiDpDjtbbXz3pVQqca7h/Vuw9GsOjYkbNdCCHSsagoAlSIaPR716Fe+Q7ZbEDIetIOLFQRCcbsNWkiDYuowlSOsYhmoYHBwsVavVYxGR8/42vYZi5RxKAwCf0FpfAQB8F8U2QwhYghgCmiOKa7Xap4no/S2ErfwJEY9WSsWpFmxoZFu2GUsQw/NbD1v5KiJ6SU1zQOX09PQJNmwlKYLx5SxB4mOVak+OGqgfiO6YRDGHrRDR5zdu3HiOqV26JH62u4wlSI4zODg4OLdWq51ERCe3ELZyHxF9XGv9rRyHssWatgQpwNT29fXt2NHRcS4ivjWpO0Q0Wg+rNxW24pTL5V7XdXcKguB59WvM29X/nQsAa4IguJ/PpRzHGSeiu7XWXMW4lnSMechZguSBegOb9bAVXp+8PIlb9Rizq0ul0sezClup3+vnW5r7hdV8aeA/XyUY5YDUycnJb0dFTyfBIG0ZS5C0EW1dn+N53pGO43C9lG2TqCOixxDx0xs2bPhSWg+hEGIQADg7pkji09NliIijHi6anJy8eGxsjLPDFLJZghRyWgD6+vq27uzsPA0APgIApYRuriaiE7TWP0woz1cQXgkAXJquYX2XpLpZjog2cHbL8fHxM2a6rNaK7jRkLUHSQDFDHZx4gi9pAcCbWjDTdNhKf39/l+u6/Bb777B0sS349HTRu4noSK31UIo6W1ZlCdIyhGYUtBq2AgBVIrpkcnLy9KhPmnK5zEGhN0dU3Mpi4LyAX6aU4nqRhWiWIIWYhnhOcERzd3f3cZxSKKzufIQ2TpV6mlLqspnCVjzP29txnB/ETOwXz/Eme/FB6Lp1696+atUqvr+Ta7MEyRX+ZMallM8lIk5JdFTSzx8iekbYipTyPwGAU8OmckEt2ej+JUVEy4lo37yDNC1BWpnFnGWFELwdzLcZE4etAMCNtVrtxFKptEMQBLciYmfCYT3OOcoQkQsgTRFRDyL2ENFzksaeAcCI67qvyTPBhSVIwqehSGKe5x3uOM4XACBR2Er9gd7U5GdbjYiGEfHmIAhu9H3/HzNhwtEC1Wr1dYh4EBEdgIjPaRK7G5VSHJaTS7MEyQX29I3Wd50+hognAwCfZGfS6nfovxUEwam+73NRodiNM8IsWLDgGMdxuNJYT1xBInqv1vqquP3T7GcJkiaaBdA1MDDwfA5izCIrDK8LEPG9rSa8qF9N5rRJH48DGZ+VTE9P755H9LIlSJwZasM+UkqPiDhsJZW0rkR0zbp1696X5s6SlPKouo9xnsOfK6Veb3oq4jhm2idrLz0EHCklx02dlTRspe7Kx7M6m/A87zDHcb4ZJ1ogCII3+r7/0/TgidZkCRKNUdv34PzH3d3dp/OpeJwH8akDJqJLtdYfzBIEIcShAHB91JY1ESmt9UCWvjxdtyWISbRztjUwMLAbP/AA8Jo4rhCR1lpzkGLmIepCCL63f3GUX7VabcnIyMjKqH5p/W4JkhaSbaQn5sM4FQTBCxtt32YxXCnlrwFgnzDdvGbRWn8gC/sz6bQEMYV0gexIKbnmCUcKN2xEdLbW+hSTbnuet9RxHC7NHdaeGB8f7zEV+WsJYvIJKIgtIQRXEN69kTtEtG56enqXpDUhWxmmEOKniBi6W0VEe5uK+rUEaWU221CWq2aVSiUOBwlrVyiljspjeFJKDuvn8nphb7cztNafMuGfJYgJlAtkQwhxICLeFOZSEAQH+L7PEb3G2+LFizvnz5/PRVTDasQYOxOxBDH+CORrUAjxCb6OG/J5talWq21TqVS4GlYuTQjxrYgEFncrpXYx4ZwliAmUC2RDCPF1RHxniEu3KaX4mm1uTQjxYUT8UpgD4+Pjc00s1C1BcnsM8jEshPgFIr4uxPqPlVJvzse7f1nlg0NEvCHCh+2VUlzqItNmCZIpvMVTLoTggEOuitWo5bZA3+yQ53nCcRwVhl61Wt2jUqn8OWuELUGyRrhg+oUQv40oF3e+UuqEPN2WUu4JAKEJ8KrV6p6VSuUPWftpCZI1wgXTL4QYiqj3/k2lVOLCpGkMV0q5HwD8LEwXn9MkLcDajI+WIM2gtQX0lVJ+P6Ly1S1KqVixWlnBIYR4DyJeGfGJ1VOpVNZl5cNmvZYgWSNcMP1SygvrUb0zekZEd2itX5yn20IIzuDItw4btceVUluZ8NESxATKBbIRJ1Bx48aNC1euXLkmL7ellCsAYK9G9onot1rrhr+n6bclSJpotoEuz/Ok4zjDYa4S0Ye11vymMd6WLFnSM2fOHM7d1bAR0dVa6/eYcM4SxATKBbLBNRNrtRqfkjfM90tEvtY6lSTVzQ5dCMEl6r4aJhcEwbt93/96s7qT9LcESYJam8sIITj/FV+ECmt9Sin+1DHWOHNkV1fXXxBxpzCjpnaw2AdLEGPTXxxDUspjAODLEZ8xv9Jah524pz4gKeXxAMCJusPaCqVU2EFnqn5ZgqQKZ3soE0Jw8rYHELEj4lNmH9/3bzUxqno61b9GJa8jouO01peY8Mm+QUyhXEA7QogrETF0octFboIg8EZGRv6a5RA4odzChQs5tCR0Z4oLAxHRDibz9do3SJYzX2Ddnuftjoj/GyOTyD3T09NLRkdHuSJUJk0IcQMicmaTqPY5pdSyqE5p/m4JkiaabaZLCPENRHxHlNtExFd090k7erZ+OeqKOD4AwCNTU1OLVqxYEXUbMmo4Tf1uCdIUXFtW5/qZw2oA2CbGyO7jJNRpRdDW1xx8/7w3hm0IguB9vu+Hhp/E0dNsH0uQZhHbwvpLKTkw8Zo4w+JkDpwNZXJy8vKkxUF7e3u7u7q6uKwbZ0yZF9Ou8R21zX5ZgsSZoS28j5SSi+YcHHeYRHQPES3r6Oi4MW7tDs/zXuA4zuFE9FFE3K4JWxNTU1OL8wp9sQSJO1NbcL96tvURRHxpM8PkrOv1sPQbAeCOarW61nXdtR0dHTQ1NbVbqVTanYheiohvBIBXNKO73rdaq9X2GxkZuSWBbCoiliCpwNj+Svr6+hZ0dHQwSV5YhNHU65AcppRi8uXWLEFyg754hpkknZ2dvwAAvtGXW+M3ExEd6vv+T3Jzom7YEiTvGSiY/foimjOf5FL2jIjuR8T9lVK/KwI0liBFmIUC+iCEOAERuV65sYq3RPSbWq12kImbgnEhtwSJi9Qs7FdPnnA5ACzJcvhENIGIy5RSHOZOWdpqVrclSLOIzb7+KKXk7dnTEHFxysNfz/VKEPE8pdRDKetORZ0lSCowzg4lnuft7TjOYQDA65Ntk46aiO7izImu6149NDT0eFI9JuQsQUygvOXZ4NqH/UR0ICdCRMTtAWBhg1uKa4loHBHvIqKVfFvR9/2hon1KNZoiS5At7+HNa0T8KcZvlYVE1BUEwZpHHnlkPM2quHkMzBIkD9StzbZBwBKkbabKOpoHApYgeaBubbYNApYgbTNV1tE8ELAEyQN1a7NtELAEaZupso7mgYAlSB6oW5ttg4AlSNtMlXU0DwQsQfJA3dpsGwQsQdpmqqyjeSBgCZIH6tZm2yBgCdI2U2UdzQMBS5A8ULc22wYBS5C2mSrraB4IWILkgbq12TYIWIK0zVRZR/NA4P8Ak2aobgePqN8AAAAASUVORK5CYII="

/***/ }),
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */
/*!***************************************************************!*\
  !*** /Users/sunbo/project/j13/v10/nteemo/static/ellipsis.png ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ })
]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map