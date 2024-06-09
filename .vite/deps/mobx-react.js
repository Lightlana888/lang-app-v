import {
  require_react_dom
} from "./chunk-4ASWBRZ3.js";
import {
  Reaction,
  allowStateChanges,
  configure,
  getDependencyTree,
  getGlobalState,
  isObservableArray,
  isObservableMap,
  isObservableObject,
  makeObservable,
  observable,
  runInAction,
  untracked
} from "./chunk-5NXQKWCD.js";
import {
  require_react
} from "./chunk-O6O4HUXW.js";
import {
  __commonJS,
  __toESM
} from "./chunk-LQ2VYIYD.js";

// node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js
var require_use_sync_external_store_shim_development = __commonJS({
  "node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js"(exports) {
    "use strict";
    if (true) {
      (function() {
        "use strict";
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart === "function") {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
        }
        var React2 = require_react();
        var ReactSharedInternals = React2.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
        function error(format) {
          {
            {
              for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                args[_key2 - 1] = arguments[_key2];
              }
              printWarning("error", format, args);
            }
          }
        }
        function printWarning(level, format, args) {
          {
            var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
            var stack = ReactDebugCurrentFrame.getStackAddendum();
            if (stack !== "") {
              format += "%s";
              args = args.concat([stack]);
            }
            var argsWithFormat = args.map(function(item) {
              return String(item);
            });
            argsWithFormat.unshift("Warning: " + format);
            Function.prototype.apply.call(console[level], console, argsWithFormat);
          }
        }
        function is2(x, y) {
          return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y;
        }
        var objectIs = typeof Object.is === "function" ? Object.is : is2;
        var useState5 = React2.useState, useEffect = React2.useEffect, useLayoutEffect = React2.useLayoutEffect, useDebugValue = React2.useDebugValue;
        var didWarnOld18Alpha = false;
        var didWarnUncachedGetSnapshot = false;
        function useSyncExternalStore2(subscribe, getSnapshot, getServerSnapshot) {
          {
            if (!didWarnOld18Alpha) {
              if (React2.startTransition !== void 0) {
                didWarnOld18Alpha = true;
                error("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release.");
              }
            }
          }
          var value = getSnapshot();
          {
            if (!didWarnUncachedGetSnapshot) {
              var cachedValue = getSnapshot();
              if (!objectIs(value, cachedValue)) {
                error("The result of getSnapshot should be cached to avoid an infinite loop");
                didWarnUncachedGetSnapshot = true;
              }
            }
          }
          var _useState = useState5({
            inst: {
              value,
              getSnapshot
            }
          }), inst = _useState[0].inst, forceUpdate = _useState[1];
          useLayoutEffect(function() {
            inst.value = value;
            inst.getSnapshot = getSnapshot;
            if (checkIfSnapshotChanged(inst)) {
              forceUpdate({
                inst
              });
            }
          }, [subscribe, value, getSnapshot]);
          useEffect(function() {
            if (checkIfSnapshotChanged(inst)) {
              forceUpdate({
                inst
              });
            }
            var handleStoreChange = function() {
              if (checkIfSnapshotChanged(inst)) {
                forceUpdate({
                  inst
                });
              }
            };
            return subscribe(handleStoreChange);
          }, [subscribe]);
          useDebugValue(value);
          return value;
        }
        function checkIfSnapshotChanged(inst) {
          var latestGetSnapshot = inst.getSnapshot;
          var prevValue = inst.value;
          try {
            var nextValue = latestGetSnapshot();
            return !objectIs(prevValue, nextValue);
          } catch (error2) {
            return true;
          }
        }
        function useSyncExternalStore$1(subscribe, getSnapshot, getServerSnapshot) {
          return getSnapshot();
        }
        var canUseDOM = !!(typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined");
        var isServerEnvironment = !canUseDOM;
        var shim = isServerEnvironment ? useSyncExternalStore$1 : useSyncExternalStore2;
        var useSyncExternalStore$2 = React2.useSyncExternalStore !== void 0 ? React2.useSyncExternalStore : shim;
        exports.useSyncExternalStore = useSyncExternalStore$2;
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop === "function") {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
        }
      })();
    }
  }
});

// node_modules/use-sync-external-store/shim/index.js
var require_shim = __commonJS({
  "node_modules/use-sync-external-store/shim/index.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_use_sync_external_store_shim_development();
    }
  }
});

// node_modules/mobx-react/dist/mobxreact.esm.js
var import_react7 = __toESM(require_react());

// node_modules/mobx-react-lite/es/utils/assertEnvironment.js
var import_react = __toESM(require_react());
if (!import_react.useState) {
  throw new Error("mobx-react-lite requires React with Hooks support");
}
if (!makeObservable) {
  throw new Error("mobx-react-lite@3 requires mobx at least version 6 to be available");
}

// node_modules/mobx-react-lite/es/utils/reactBatchedUpdates.js
var import_react_dom = __toESM(require_react_dom());

// node_modules/mobx-react-lite/es/utils/observerBatching.js
function defaultNoopBatch(callback) {
  callback();
}
function observerBatching(reactionScheduler) {
  if (!reactionScheduler) {
    reactionScheduler = defaultNoopBatch;
    if (true) {
      console.warn("[MobX] Failed to get unstable_batched updates from react-dom / react-native");
    }
  }
  configure({ reactionScheduler });
}

// node_modules/mobx-react-lite/es/utils/utils.js
var deprecatedMessages = [];
function useDeprecated(msg) {
  if (!deprecatedMessages.includes(msg)) {
    deprecatedMessages.push(msg);
    console.warn(msg);
  }
}

// node_modules/mobx-react-lite/es/useObserver.js
var import_react2 = __toESM(require_react());

// node_modules/mobx-react-lite/es/utils/printDebugValue.js
function printDebugValue(v) {
  return getDependencyTree(v);
}

// node_modules/mobx-react-lite/es/staticRendering.js
var globalIsUsingStaticRendering = false;
function enableStaticRendering(enable) {
  globalIsUsingStaticRendering = enable;
}
function isUsingStaticRendering() {
  return globalIsUsingStaticRendering;
}

// node_modules/mobx-react-lite/es/utils/UniversalFinalizationRegistry.js
var REGISTRY_FINALIZE_AFTER = 1e4;
var REGISTRY_SWEEP_INTERVAL = 1e4;
var TimerBasedFinalizationRegistry = (
  /** @class */
  function() {
    function TimerBasedFinalizationRegistry2(finalize) {
      var _this = this;
      Object.defineProperty(this, "finalize", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: finalize
      });
      Object.defineProperty(this, "registrations", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: /* @__PURE__ */ new Map()
      });
      Object.defineProperty(this, "sweepTimeout", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, "sweep", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: function(maxAge) {
          if (maxAge === void 0) {
            maxAge = REGISTRY_FINALIZE_AFTER;
          }
          clearTimeout(_this.sweepTimeout);
          _this.sweepTimeout = void 0;
          var now = Date.now();
          _this.registrations.forEach(function(registration, token) {
            if (now - registration.registeredAt >= maxAge) {
              _this.finalize(registration.value);
              _this.registrations.delete(token);
            }
          });
          if (_this.registrations.size > 0) {
            _this.scheduleSweep();
          }
        }
      });
      Object.defineProperty(this, "finalizeAllImmediately", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: function() {
          _this.sweep(0);
        }
      });
    }
    Object.defineProperty(TimerBasedFinalizationRegistry2.prototype, "register", {
      enumerable: false,
      configurable: true,
      writable: true,
      value: function(target, value, token) {
        this.registrations.set(token, {
          value,
          registeredAt: Date.now()
        });
        this.scheduleSweep();
      }
    });
    Object.defineProperty(TimerBasedFinalizationRegistry2.prototype, "unregister", {
      enumerable: false,
      configurable: true,
      writable: true,
      value: function(token) {
        this.registrations.delete(token);
      }
    });
    Object.defineProperty(TimerBasedFinalizationRegistry2.prototype, "scheduleSweep", {
      enumerable: false,
      configurable: true,
      writable: true,
      value: function() {
        if (this.sweepTimeout === void 0) {
          this.sweepTimeout = setTimeout(this.sweep, REGISTRY_SWEEP_INTERVAL);
        }
      }
    });
    return TimerBasedFinalizationRegistry2;
  }()
);
var UniversalFinalizationRegistry = typeof FinalizationRegistry !== "undefined" ? FinalizationRegistry : TimerBasedFinalizationRegistry;

// node_modules/mobx-react-lite/es/utils/observerFinalizationRegistry.js
var observerFinalizationRegistry = new UniversalFinalizationRegistry(function(adm) {
  var _a3;
  (_a3 = adm.reaction) === null || _a3 === void 0 ? void 0 : _a3.dispose();
  adm.reaction = null;
});

// node_modules/mobx-react-lite/es/useObserver.js
var import_shim = __toESM(require_shim());
function createReaction(adm) {
  adm.reaction = new Reaction("observer".concat(adm.name), function() {
    var _a3;
    adm.stateVersion = Symbol();
    (_a3 = adm.onStoreChange) === null || _a3 === void 0 ? void 0 : _a3.call(adm);
  });
}
function useObserver(render, baseComponentName) {
  if (baseComponentName === void 0) {
    baseComponentName = "observed";
  }
  if (isUsingStaticRendering()) {
    return render();
  }
  var admRef = import_react2.default.useRef(null);
  if (!admRef.current) {
    var adm_1 = {
      reaction: null,
      onStoreChange: null,
      stateVersion: Symbol(),
      name: baseComponentName,
      subscribe: function(onStoreChange) {
        observerFinalizationRegistry.unregister(adm_1);
        adm_1.onStoreChange = onStoreChange;
        if (!adm_1.reaction) {
          createReaction(adm_1);
          adm_1.stateVersion = Symbol();
        }
        return function() {
          var _a3;
          adm_1.onStoreChange = null;
          (_a3 = adm_1.reaction) === null || _a3 === void 0 ? void 0 : _a3.dispose();
          adm_1.reaction = null;
        };
      },
      getSnapshot: function() {
        return adm_1.stateVersion;
      }
    };
    admRef.current = adm_1;
  }
  var adm = admRef.current;
  if (!adm.reaction) {
    createReaction(adm);
    observerFinalizationRegistry.register(admRef, adm, adm);
  }
  import_react2.default.useDebugValue(adm.reaction, printDebugValue);
  (0, import_shim.useSyncExternalStore)(
    // Both of these must be stable, otherwise it would keep resubscribing every render.
    adm.subscribe,
    adm.getSnapshot,
    adm.getSnapshot
  );
  var renderResult;
  var exception;
  adm.reaction.track(function() {
    try {
      renderResult = render();
    } catch (e) {
      exception = e;
    }
  });
  if (exception) {
    throw exception;
  }
  return renderResult;
}

// node_modules/mobx-react-lite/es/observer.js
var import_react3 = __toESM(require_react());
var _a;
var _b;
var warnObserverOptionsDeprecated = true;
var hasSymbol = typeof Symbol === "function" && Symbol.for;
var isFunctionNameConfigurable = (_b = (_a = Object.getOwnPropertyDescriptor(function() {
}, "name")) === null || _a === void 0 ? void 0 : _a.configurable) !== null && _b !== void 0 ? _b : false;
var ReactForwardRefSymbol = hasSymbol ? Symbol.for("react.forward_ref") : typeof import_react3.forwardRef === "function" && (0, import_react3.forwardRef)(function(props) {
  return null;
})["$$typeof"];
var ReactMemoSymbol = hasSymbol ? Symbol.for("react.memo") : typeof import_react3.memo === "function" && (0, import_react3.memo)(function(props) {
  return null;
})["$$typeof"];
function observer(baseComponent, options) {
  var _a3;
  if (warnObserverOptionsDeprecated && options) {
    warnObserverOptionsDeprecated = false;
    console.warn("[mobx-react-lite] `observer(fn, { forwardRef: true })` is deprecated, use `observer(React.forwardRef(fn))`");
  }
  if (ReactMemoSymbol && baseComponent["$$typeof"] === ReactMemoSymbol) {
    throw new Error("[mobx-react-lite] You are trying to use `observer` on a function component wrapped in either another `observer` or `React.memo`. The observer already applies 'React.memo' for you.");
  }
  if (isUsingStaticRendering()) {
    return baseComponent;
  }
  var useForwardRef = (_a3 = options === null || options === void 0 ? void 0 : options.forwardRef) !== null && _a3 !== void 0 ? _a3 : false;
  var render = baseComponent;
  var baseComponentName = baseComponent.displayName || baseComponent.name;
  if (ReactForwardRefSymbol && baseComponent["$$typeof"] === ReactForwardRefSymbol) {
    useForwardRef = true;
    render = baseComponent["render"];
    if (typeof render !== "function") {
      throw new Error("[mobx-react-lite] `render` property of ForwardRef was not a function");
    }
  }
  var observerComponent = function(props, ref) {
    return useObserver(function() {
      return render(props, ref);
    }, baseComponentName);
  };
  observerComponent.displayName = baseComponent.displayName;
  if (isFunctionNameConfigurable) {
    Object.defineProperty(observerComponent, "name", {
      value: baseComponent.name,
      writable: true,
      configurable: true
    });
  }
  if (baseComponent.contextTypes) {
    ;
    observerComponent.contextTypes = baseComponent.contextTypes;
  }
  if (useForwardRef) {
    observerComponent = (0, import_react3.forwardRef)(observerComponent);
  }
  observerComponent = (0, import_react3.memo)(observerComponent);
  copyStaticProperties(baseComponent, observerComponent);
  if (true) {
    Object.defineProperty(observerComponent, "contextTypes", {
      set: function() {
        var _a4, _b2;
        throw new Error("[mobx-react-lite] `".concat(this.displayName || ((_a4 = this.type) === null || _a4 === void 0 ? void 0 : _a4.displayName) || ((_b2 = this.type) === null || _b2 === void 0 ? void 0 : _b2.name) || "Component", ".contextTypes` must be set before applying `observer`."));
      }
    });
  }
  return observerComponent;
}
var hoistBlackList = {
  $$typeof: true,
  render: true,
  compare: true,
  type: true,
  // Don't redefine `displayName`,
  // it's defined as getter-setter pair on `memo` (see #3192).
  displayName: true
};
function copyStaticProperties(base, target) {
  Object.keys(base).forEach(function(key) {
    if (!hoistBlackList[key]) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(base, key));
    }
  });
}

// node_modules/mobx-react-lite/es/ObserverComponent.js
function ObserverComponent(_a3) {
  var children = _a3.children, render = _a3.render;
  var component = children || render;
  if (typeof component !== "function") {
    return null;
  }
  return useObserver(component);
}
if (true) {
  ObserverComponent.propTypes = {
    children: ObserverPropsCheck,
    render: ObserverPropsCheck
  };
}
ObserverComponent.displayName = "Observer";
function ObserverPropsCheck(props, key, componentName, location, propFullName) {
  var extraKey = key === "children" ? "render" : "children";
  var hasProp = typeof props[key] === "function";
  var hasExtraProp = typeof props[extraKey] === "function";
  if (hasProp && hasExtraProp) {
    return new Error("MobX Observer: Do not use children and render in the same time in`" + componentName);
  }
  if (hasProp || hasExtraProp) {
    return null;
  }
  return new Error("Invalid prop `" + propFullName + "` of type `" + typeof props[key] + "` supplied to `" + componentName + "`, expected `function`.");
}

// node_modules/mobx-react-lite/es/useLocalObservable.js
var import_react4 = __toESM(require_react());
function useLocalObservable(initializer, annotations) {
  return (0, import_react4.useState)(function() {
    return observable(initializer(), annotations, { autoBind: true });
  })[0];
}

// node_modules/mobx-react-lite/es/useLocalStore.js
var import_react6 = __toESM(require_react());

// node_modules/mobx-react-lite/es/useAsObservableSource.js
var import_react5 = __toESM(require_react());
function useAsObservableSource(current) {
  if (true)
    useDeprecated("[mobx-react-lite] 'useAsObservableSource' is deprecated, please store the values directly in an observable, for example by using 'useLocalObservable', and sync future updates using 'useEffect' when needed. See the README for examples.");
  var res = (0, import_react5.useState)(function() {
    return observable(current, {}, { deep: false });
  })[0];
  runInAction(function() {
    Object.assign(res, current);
  });
  return res;
}

// node_modules/mobx-react-lite/es/useLocalStore.js
function useLocalStore(initializer, current) {
  if (true) {
    useDeprecated("[mobx-react-lite] 'useLocalStore' is deprecated, use 'useLocalObservable' instead.");
  }
  var source = current && useAsObservableSource(current);
  return (0, import_react6.useState)(function() {
    return observable(initializer(source), void 0, { autoBind: true });
  })[0];
}

// node_modules/mobx-react-lite/es/index.js
var _a2;
observerBatching(import_react_dom.unstable_batchedUpdates);
var clearTimers = (_a2 = observerFinalizationRegistry["finalizeAllImmediately"]) !== null && _a2 !== void 0 ? _a2 : function() {
};
function useObserver2(fn, baseComponentName) {
  if (baseComponentName === void 0) {
    baseComponentName = "observed";
  }
  if (true) {
    useDeprecated("[mobx-react-lite] 'useObserver(fn)' is deprecated. Use `<Observer>{fn}</Observer>` instead, or wrap the entire component in `observer`.");
  }
  return useObserver(fn, baseComponentName);
}
function useStaticRendering(enable) {
  if (true) {
    console.warn("[mobx-react-lite] 'useStaticRendering' is deprecated, use 'enableStaticRendering' instead");
  }
  enableStaticRendering(enable);
}

// node_modules/mobx-react/dist/mobxreact.esm.js
function shallowEqual(objA, objB) {
  if (is(objA, objB)) {
    return true;
  }
  if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) {
    return false;
  }
  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) {
    return false;
  }
  for (var i = 0; i < keysA.length; i++) {
    if (!Object.hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }
  return true;
}
function is(x, y) {
  if (x === y) {
    return x !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}
var hoistBlackList2 = {
  $$typeof: 1,
  render: 1,
  compare: 1,
  type: 1,
  childContextTypes: 1,
  contextType: 1,
  contextTypes: 1,
  defaultProps: 1,
  getDefaultProps: 1,
  getDerivedStateFromError: 1,
  getDerivedStateFromProps: 1,
  mixins: 1,
  displayName: 1,
  propTypes: 1
};
function copyStaticProperties2(base, target) {
  var protoProps = Object.getOwnPropertyNames(Object.getPrototypeOf(base));
  Object.getOwnPropertyNames(base).forEach(function(key) {
    if (!hoistBlackList2[key] && protoProps.indexOf(key) === -1) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(base, key));
    }
  });
}
var mobxMixins = Symbol("patchMixins");
var mobxPatchedDefinition = Symbol("patchedDefinition");
function getMixins(target, methodName) {
  var mixins = target[mobxMixins] = target[mobxMixins] || {};
  var methodMixins = mixins[methodName] = mixins[methodName] || {};
  methodMixins.locks = methodMixins.locks || 0;
  methodMixins.methods = methodMixins.methods || [];
  return methodMixins;
}
function wrapper(realMethod, mixins) {
  var _this = this;
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }
  mixins.locks++;
  try {
    var retVal;
    if (realMethod !== void 0 && realMethod !== null) {
      retVal = realMethod.apply(this, args);
    }
    return retVal;
  } finally {
    mixins.locks--;
    if (mixins.locks === 0) {
      mixins.methods.forEach(function(mx) {
        mx.apply(_this, args);
      });
    }
  }
}
function wrapFunction(realMethod, mixins) {
  var fn = function fn2() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    wrapper.call.apply(wrapper, [this, realMethod, mixins].concat(args));
  };
  return fn;
}
function patch(target, methodName, mixinMethod) {
  var mixins = getMixins(target, methodName);
  if (mixins.methods.indexOf(mixinMethod) < 0) {
    mixins.methods.push(mixinMethod);
  }
  var oldDefinition = Object.getOwnPropertyDescriptor(target, methodName);
  if (oldDefinition && oldDefinition[mobxPatchedDefinition]) {
    return;
  }
  var originalMethod = target[methodName];
  var newDefinition = createDefinition(target, methodName, oldDefinition ? oldDefinition.enumerable : void 0, mixins, originalMethod);
  Object.defineProperty(target, methodName, newDefinition);
}
function createDefinition(target, methodName, enumerable, mixins, originalMethod) {
  var _ref;
  var wrappedFunc = wrapFunction(originalMethod, mixins);
  return _ref = {}, _ref[mobxPatchedDefinition] = true, _ref.get = function get() {
    return wrappedFunc;
  }, _ref.set = function set(value) {
    if (this === target) {
      wrappedFunc = wrapFunction(value, mixins);
    } else {
      var newDefinition = createDefinition(this, methodName, enumerable, mixins, value);
      Object.defineProperty(this, methodName, newDefinition);
    }
  }, _ref.configurable = true, _ref.enumerable = enumerable, _ref;
}
var administrationSymbol = Symbol("ObserverAdministration");
var isMobXReactObserverSymbol = Symbol("isMobXReactObserver");
var observablePropDescriptors;
if (true) {
  observablePropDescriptors = {
    props: createObservablePropDescriptor("props"),
    state: createObservablePropDescriptor("state"),
    context: createObservablePropDescriptor("context")
  };
}
function getAdministration(component) {
  var _component$administra;
  return (_component$administra = component[administrationSymbol]) != null ? _component$administra : component[administrationSymbol] = {
    reaction: null,
    mounted: false,
    reactionInvalidatedBeforeMount: false,
    forceUpdate: null,
    name: getDisplayName(component.constructor),
    state: void 0,
    props: void 0,
    context: void 0
  };
}
function makeClassComponentObserver(componentClass) {
  var prototype = componentClass.prototype;
  if (componentClass[isMobXReactObserverSymbol]) {
    var displayName = getDisplayName(componentClass);
    throw new Error("The provided component class (" + displayName + ") has already been declared as an observer component.");
  } else {
    componentClass[isMobXReactObserverSymbol] = true;
  }
  if (prototype.componentWillReact) {
    throw new Error("The componentWillReact life-cycle event is no longer supported");
  }
  if (componentClass["__proto__"] !== import_react7.PureComponent) {
    if (!prototype.shouldComponentUpdate) {
      prototype.shouldComponentUpdate = observerSCU;
    } else if (prototype.shouldComponentUpdate !== observerSCU) {
      throw new Error("It is not allowed to use shouldComponentUpdate in observer based components.");
    }
  }
  if (true) {
    Object.defineProperties(prototype, observablePropDescriptors);
  }
  var originalRender = prototype.render;
  if (typeof originalRender !== "function") {
    var _displayName = getDisplayName(componentClass);
    throw new Error("[mobx-react] class component (" + _displayName + ") is missing `render` method.\n`observer` requires `render` being a function defined on prototype.\n`render = () => {}` or `render = function() {}` is not supported.");
  }
  prototype.render = function() {
    Object.defineProperty(this, "render", {
      // There is no safe way to replace render, therefore it's forbidden.
      configurable: false,
      writable: false,
      value: isUsingStaticRendering() ? originalRender : createReactiveRender.call(this, originalRender)
    });
    return this.render();
  };
  var originalComponentDidMount = prototype.componentDidMount;
  prototype.componentDidMount = function() {
    var _this = this;
    if (this.componentDidMount !== Object.getPrototypeOf(this).componentDidMount) {
      var _displayName2 = getDisplayName(componentClass);
      throw new Error("[mobx-react] `observer(" + _displayName2 + ").componentDidMount` must be defined on prototype.\n`componentDidMount = () => {}` or `componentDidMount = function() {}` is not supported.");
    }
    var admin = getAdministration(this);
    admin.mounted = true;
    observerFinalizationRegistry.unregister(this);
    admin.forceUpdate = function() {
      return _this.forceUpdate();
    };
    if (!admin.reaction || admin.reactionInvalidatedBeforeMount) {
      admin.forceUpdate();
    }
    return originalComponentDidMount == null ? void 0 : originalComponentDidMount.apply(this, arguments);
  };
  patch(prototype, "componentWillUnmount", function() {
    var _admin$reaction;
    if (isUsingStaticRendering()) {
      return;
    }
    var admin = getAdministration(this);
    (_admin$reaction = admin.reaction) == null ? void 0 : _admin$reaction.dispose();
    admin.reaction = null;
    admin.forceUpdate = null;
    admin.mounted = false;
    admin.reactionInvalidatedBeforeMount = false;
  });
  return componentClass;
}
function getDisplayName(componentClass) {
  return componentClass.displayName || componentClass.name || "<component>";
}
function createReactiveRender(originalRender) {
  var boundOriginalRender = originalRender.bind(this);
  var admin = getAdministration(this);
  function reactiveRender() {
    if (!admin.reaction) {
      admin.reaction = createReaction2(admin);
      if (!admin.mounted) {
        observerFinalizationRegistry.register(this, admin, this);
      }
    }
    var error = void 0;
    var renderResult = void 0;
    admin.reaction.track(function() {
      try {
        renderResult = allowStateChanges(false, boundOriginalRender);
      } catch (e) {
        error = e;
      }
    });
    if (error) {
      throw error;
    }
    return renderResult;
  }
  return reactiveRender;
}
function createReaction2(admin) {
  return new Reaction(admin.name + ".render()", function() {
    if (!admin.mounted) {
      admin.reactionInvalidatedBeforeMount = true;
      return;
    }
    try {
      admin.forceUpdate == null ? void 0 : admin.forceUpdate();
    } catch (error) {
      var _admin$reaction2;
      (_admin$reaction2 = admin.reaction) == null ? void 0 : _admin$reaction2.dispose();
      admin.reaction = null;
    }
  });
}
function observerSCU(nextProps, nextState) {
  if (isUsingStaticRendering()) {
    console.warn("[mobx-react] It seems that a re-rendering of a React component is triggered while in static (server-side) mode. Please make sure components are rendered only once server-side.");
  }
  if (this.state !== nextState) {
    return true;
  }
  return !shallowEqual(this.props, nextProps);
}
function createObservablePropDescriptor(key) {
  return {
    configurable: true,
    enumerable: true,
    get: function get() {
      var admin = getAdministration(this);
      var derivation = getGlobalState().trackingDerivation;
      if (derivation && derivation !== admin.reaction) {
        throw new Error('[mobx-react] Cannot read "' + admin.name + "." + key + `" in a reactive context, as it isn't observable.
                    Please use component lifecycle method to copy the value into a local observable first.
                    See https://github.com/mobxjs/mobx/blob/main/packages/mobx-react/README.md#note-on-using-props-and-state-in-derivations`);
      }
      return admin[key];
    },
    set: function set(value) {
      getAdministration(this)[key] = value;
    }
  };
}
function observer2(component, context) {
  if (context && context.kind !== "class") {
    throw new Error("The @observer decorator can be used on classes only");
  }
  if (component["isMobxInjector"] === true) {
    console.warn("Mobx observer: You are trying to use `observer` on a component that already has `inject`. Please apply `observer` before applying `inject`");
  }
  if (Object.prototype.isPrototypeOf.call(import_react7.Component, component) || Object.prototype.isPrototypeOf.call(import_react7.PureComponent, component)) {
    return makeClassComponentObserver(component);
  } else {
    return observer(component);
  }
}
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
var _excluded = ["children"];
var MobXProviderContext = import_react7.default.createContext({});
function Provider(props) {
  var children = props.children, stores = _objectWithoutPropertiesLoose(props, _excluded);
  var parentValue = import_react7.default.useContext(MobXProviderContext);
  var mutableProviderRef = import_react7.default.useRef(_extends({}, parentValue, stores));
  var value = mutableProviderRef.current;
  if (true) {
    var newValue = _extends({}, value, stores);
    if (!shallowEqual(value, newValue)) {
      throw new Error("MobX Provider: The set of provided stores has changed. See: https://github.com/mobxjs/mobx-react#the-set-of-provided-stores-has-changed-error.");
    }
  }
  return import_react7.default.createElement(MobXProviderContext.Provider, {
    value
  }, children);
}
Provider.displayName = "MobXProvider";
function createStoreInjector(grabStoresFn, component, injectNames, makeReactive) {
  var Injector = import_react7.default.forwardRef(function(props, ref) {
    var newProps = _extends({}, props);
    var context = import_react7.default.useContext(MobXProviderContext);
    Object.assign(newProps, grabStoresFn(context || {}, newProps) || {});
    if (ref) {
      newProps.ref = ref;
    }
    return import_react7.default.createElement(component, newProps);
  });
  if (makeReactive)
    Injector = observer2(Injector);
  Injector["isMobxInjector"] = true;
  copyStaticProperties2(component, Injector);
  Injector["wrappedComponent"] = component;
  Injector.displayName = getInjectName(component, injectNames);
  return Injector;
}
function getInjectName(component, injectNames) {
  var displayName;
  var componentName = component.displayName || component.name || component.constructor && component.constructor.name || "Component";
  if (injectNames)
    displayName = "inject-with-" + injectNames + "(" + componentName + ")";
  else
    displayName = "inject(" + componentName + ")";
  return displayName;
}
function grabStoresByName(storeNames) {
  return function(baseStores, nextProps) {
    storeNames.forEach(function(storeName) {
      if (storeName in nextProps)
        return;
      if (!(storeName in baseStores))
        throw new Error("MobX injector: Store '" + storeName + "' is not available! Make sure it is provided by some Provider");
      nextProps[storeName] = baseStores[storeName];
    });
    return nextProps;
  };
}
function inject() {
  for (var _len = arguments.length, storeNames = new Array(_len), _key = 0; _key < _len; _key++) {
    storeNames[_key] = arguments[_key];
  }
  if (typeof arguments[0] === "function") {
    var grabStoresFn = arguments[0];
    return function(componentClass) {
      return createStoreInjector(grabStoresFn, componentClass, grabStoresFn.name, true);
    };
  } else {
    return function(componentClass) {
      return createStoreInjector(grabStoresByName(storeNames), componentClass, storeNames.join("-"), false);
    };
  }
}
var reactMajorVersion = Number.parseInt(import_react7.default.version.split(".")[0]);
var warnedAboutDisposeOnUnmountDeprecated = false;
var protoStoreKey = Symbol("disposeOnUnmountProto");
var instStoreKey = Symbol("disposeOnUnmountInst");
function runDisposersOnWillUnmount() {
  var _this = this;
  [].concat(this[protoStoreKey] || [], this[instStoreKey] || []).forEach(function(propKeyOrFunction) {
    var prop = typeof propKeyOrFunction === "string" ? _this[propKeyOrFunction] : propKeyOrFunction;
    if (prop !== void 0 && prop !== null) {
      if (Array.isArray(prop))
        prop.map(function(f) {
          return f();
        });
      else
        prop();
    }
  });
}
function disposeOnUnmount(target, propertyKeyOrFunction) {
  if (Array.isArray(propertyKeyOrFunction)) {
    return propertyKeyOrFunction.map(function(fn) {
      return disposeOnUnmount(target, fn);
    });
  }
  if (!warnedAboutDisposeOnUnmountDeprecated) {
    if (reactMajorVersion >= 18) {
      console.error("[mobx-react] disposeOnUnmount is not compatible with React 18 and higher. Don't use it.");
    } else {
      console.warn("[mobx-react] disposeOnUnmount is deprecated. It won't work correctly with React 18 and higher.");
    }
    warnedAboutDisposeOnUnmountDeprecated = true;
  }
  var c = Object.getPrototypeOf(target).constructor;
  var c2 = Object.getPrototypeOf(target.constructor);
  var c3 = Object.getPrototypeOf(Object.getPrototypeOf(target));
  if (!(c === import_react7.default.Component || c === import_react7.default.PureComponent || c2 === import_react7.default.Component || c2 === import_react7.default.PureComponent || c3 === import_react7.default.Component || c3 === import_react7.default.PureComponent)) {
    throw new Error("[mobx-react] disposeOnUnmount only supports direct subclasses of React.Component or React.PureComponent.");
  }
  if (typeof propertyKeyOrFunction !== "string" && typeof propertyKeyOrFunction !== "function" && !Array.isArray(propertyKeyOrFunction)) {
    throw new Error("[mobx-react] disposeOnUnmount only works if the parameter is either a property key or a function.");
  }
  var isDecorator = typeof propertyKeyOrFunction === "string";
  var componentWasAlreadyModified = !!target[protoStoreKey] || !!target[instStoreKey];
  var store = isDecorator ? (
    // decorators are added to the prototype store
    target[protoStoreKey] || (target[protoStoreKey] = [])
  ) : (
    // functions are added to the instance store
    target[instStoreKey] || (target[instStoreKey] = [])
  );
  store.push(propertyKeyOrFunction);
  if (!componentWasAlreadyModified) {
    patch(target, "componentWillUnmount", runDisposersOnWillUnmount);
  }
  if (typeof propertyKeyOrFunction !== "string") {
    return propertyKeyOrFunction;
  }
}
function createChainableTypeChecker(validator) {
  function checkType(isRequired, props, propName, componentName, location, propFullName) {
    for (var _len = arguments.length, rest = new Array(_len > 6 ? _len - 6 : 0), _key = 6; _key < _len; _key++) {
      rest[_key - 6] = arguments[_key];
    }
    return untracked(function() {
      componentName = componentName || "<<anonymous>>";
      propFullName = propFullName || propName;
      if (props[propName] == null) {
        if (isRequired) {
          var actual = props[propName] === null ? "null" : "undefined";
          return new Error("The " + location + " `" + propFullName + "` is marked as required in `" + componentName + "`, but its value is `" + actual + "`.");
        }
        return null;
      } else {
        return validator.apply(void 0, [props, propName, componentName, location, propFullName].concat(rest));
      }
    });
  }
  var chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);
  return chainedCheckType;
}
function isSymbol(propType, propValue) {
  if (propType === "symbol") {
    return true;
  }
  if (propValue["@@toStringTag"] === "Symbol") {
    return true;
  }
  if (typeof Symbol === "function" && propValue instanceof Symbol) {
    return true;
  }
  return false;
}
function getPropType(propValue) {
  var propType = typeof propValue;
  if (Array.isArray(propValue)) {
    return "array";
  }
  if (propValue instanceof RegExp) {
    return "object";
  }
  if (isSymbol(propType, propValue)) {
    return "symbol";
  }
  return propType;
}
function getPreciseType(propValue) {
  var propType = getPropType(propValue);
  if (propType === "object") {
    if (propValue instanceof Date) {
      return "date";
    } else if (propValue instanceof RegExp) {
      return "regexp";
    }
  }
  return propType;
}
function createObservableTypeCheckerCreator(allowNativeType, mobxType) {
  return createChainableTypeChecker(function(props, propName, componentName, location, propFullName) {
    return untracked(function() {
      if (allowNativeType) {
        if (getPropType(props[propName]) === mobxType.toLowerCase())
          return null;
      }
      var mobxChecker;
      switch (mobxType) {
        case "Array":
          mobxChecker = isObservableArray;
          break;
        case "Object":
          mobxChecker = isObservableObject;
          break;
        case "Map":
          mobxChecker = isObservableMap;
          break;
        default:
          throw new Error("Unexpected mobxType: " + mobxType);
      }
      var propValue = props[propName];
      if (!mobxChecker(propValue)) {
        var preciseType = getPreciseType(propValue);
        var nativeTypeExpectationMessage = allowNativeType ? " or javascript `" + mobxType.toLowerCase() + "`" : "";
        return new Error("Invalid prop `" + propFullName + "` of type `" + preciseType + "` supplied to `" + componentName + "`, expected `mobx.Observable" + mobxType + "`" + nativeTypeExpectationMessage + ".");
      }
      return null;
    });
  });
}
function createObservableArrayOfTypeChecker(allowNativeType, typeChecker) {
  return createChainableTypeChecker(function(props, propName, componentName, location, propFullName) {
    for (var _len2 = arguments.length, rest = new Array(_len2 > 5 ? _len2 - 5 : 0), _key2 = 5; _key2 < _len2; _key2++) {
      rest[_key2 - 5] = arguments[_key2];
    }
    return untracked(function() {
      if (typeof typeChecker !== "function") {
        return new Error("Property `" + propFullName + "` of component `" + componentName + "` has invalid PropType notation.");
      } else {
        var error = createObservableTypeCheckerCreator(allowNativeType, "Array")(props, propName, componentName, location, propFullName);
        if (error instanceof Error)
          return error;
        var propValue = props[propName];
        for (var i = 0; i < propValue.length; i++) {
          error = typeChecker.apply(void 0, [propValue, i, componentName, location, propFullName + "[" + i + "]"].concat(rest));
          if (error instanceof Error)
            return error;
        }
        return null;
      }
    });
  });
}
var observableArray = createObservableTypeCheckerCreator(false, "Array");
var observableArrayOf = createObservableArrayOfTypeChecker.bind(null, false);
var observableMap = createObservableTypeCheckerCreator(false, "Map");
var observableObject = createObservableTypeCheckerCreator(false, "Object");
var arrayOrObservableArray = createObservableTypeCheckerCreator(true, "Array");
var arrayOrObservableArrayOf = createObservableArrayOfTypeChecker.bind(null, true);
var objectOrObservableObject = createObservableTypeCheckerCreator(true, "Object");
var PropTypes = {
  observableArray,
  observableArrayOf,
  observableMap,
  observableObject,
  arrayOrObservableArray,
  arrayOrObservableArrayOf,
  objectOrObservableObject
};
if (!import_react7.Component) {
  throw new Error("mobx-react requires React to be available");
}
if (!observable) {
  throw new Error("mobx-react requires mobx to be available");
}
export {
  MobXProviderContext,
  ObserverComponent as Observer,
  PropTypes,
  Provider,
  disposeOnUnmount,
  enableStaticRendering,
  inject,
  isUsingStaticRendering,
  observer2 as observer,
  observerBatching,
  useAsObservableSource,
  useLocalObservable,
  useLocalStore,
  useObserver2 as useObserver,
  useStaticRendering
};
/*! Bundled license information:

use-sync-external-store/cjs/use-sync-external-store-shim.development.js:
  (**
   * @license React
   * use-sync-external-store-shim.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
//# sourceMappingURL=mobx-react.js.map