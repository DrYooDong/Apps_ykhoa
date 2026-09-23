(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/node_modules/react/cjs/react.production.js
  var require_react_production = __commonJS({
    "C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/node_modules/react/cjs/react.production.js"(exports) {
      "use strict";
      var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element");
      var REACT_PORTAL_TYPE = Symbol.for("react.portal");
      var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
      var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
      var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
      var REACT_CONSUMER_TYPE = Symbol.for("react.consumer");
      var REACT_CONTEXT_TYPE = Symbol.for("react.context");
      var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
      var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
      var REACT_MEMO_TYPE = Symbol.for("react.memo");
      var REACT_LAZY_TYPE = Symbol.for("react.lazy");
      var REACT_ACTIVITY_TYPE = Symbol.for("react.activity");
      var REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition");
      var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
      function getIteratorFn(maybeIterable) {
        if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
        maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
        return "function" === typeof maybeIterable ? maybeIterable : null;
      }
      var ReactNoopUpdateQueue = {
        isMounted: function() {
          return false;
        },
        enqueueForceUpdate: function() {
        },
        enqueueReplaceState: function() {
        },
        enqueueSetState: function() {
        }
      };
      var assign = Object.assign;
      var emptyObject = {};
      function Component(props, context, updater) {
        this.props = props;
        this.context = context;
        this.refs = emptyObject;
        this.updater = updater || ReactNoopUpdateQueue;
      }
      Component.prototype.isReactComponent = {};
      Component.prototype.setState = function(partialState, callback) {
        if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState)
          throw Error(
            "takes an object of state variables to update or a function which returns an object of state variables."
          );
        this.updater.enqueueSetState(this, partialState, callback, "setState");
      };
      Component.prototype.forceUpdate = function(callback) {
        this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
      };
      function ComponentDummy() {
      }
      ComponentDummy.prototype = Component.prototype;
      function PureComponent(props, context, updater) {
        this.props = props;
        this.context = context;
        this.refs = emptyObject;
        this.updater = updater || ReactNoopUpdateQueue;
      }
      var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
      pureComponentPrototype.constructor = PureComponent;
      assign(pureComponentPrototype, Component.prototype);
      pureComponentPrototype.isPureReactComponent = true;
      var isArrayImpl = Array.isArray;
      function noop() {
      }
      var ReactSharedInternals = { H: null, A: null, T: null, S: null };
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      function ReactElement(type, key, props) {
        var refProp = props.ref;
        return {
          $$typeof: REACT_ELEMENT_TYPE,
          type,
          key,
          ref: void 0 !== refProp ? refProp : null,
          props
        };
      }
      function cloneAndReplaceKey(oldElement, newKey) {
        return ReactElement(oldElement.type, newKey, oldElement.props);
      }
      function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
      }
      function escape(key) {
        var escaperLookup = { "=": "=0", ":": "=2" };
        return "$" + key.replace(/[=:]/g, function(match) {
          return escaperLookup[match];
        });
      }
      var userProvidedKeyEscapeRegex = /\/+/g;
      function getElementKey(element, index) {
        return "object" === typeof element && null !== element && null != element.key ? escape("" + element.key) : index.toString(36);
      }
      function resolveThenable(thenable) {
        switch (thenable.status) {
          case "fulfilled":
            return thenable.value;
          case "rejected":
            throw thenable.reason;
          default:
            switch ("string" === typeof thenable.status ? thenable.then(noop, noop) : (thenable.status = "pending", thenable.then(
              function(fulfilledValue) {
                "pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
              },
              function(error) {
                "pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
              }
            )), thenable.status) {
              case "fulfilled":
                return thenable.value;
              case "rejected":
                throw thenable.reason;
            }
        }
        throw thenable;
      }
      function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
        var type = typeof children;
        if ("undefined" === type || "boolean" === type) children = null;
        var invokeCallback = false;
        if (null === children) invokeCallback = true;
        else
          switch (type) {
            case "bigint":
            case "string":
            case "number":
              invokeCallback = true;
              break;
            case "object":
              switch (children.$$typeof) {
                case REACT_ELEMENT_TYPE:
                case REACT_PORTAL_TYPE:
                  invokeCallback = true;
                  break;
                case REACT_LAZY_TYPE:
                  return invokeCallback = children._init, mapIntoArray(
                    invokeCallback(children._payload),
                    array,
                    escapedPrefix,
                    nameSoFar,
                    callback
                  );
              }
          }
        if (invokeCallback)
          return callback = callback(children), invokeCallback = "" === nameSoFar ? "." + getElementKey(children, 0) : nameSoFar, isArrayImpl(callback) ? (escapedPrefix = "", null != invokeCallback && (escapedPrefix = invokeCallback.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
            return c;
          })) : null != callback && (isValidElement(callback) && (callback = cloneAndReplaceKey(
            callback,
            escapedPrefix + (null == callback.key || children && children.key === callback.key ? "" : ("" + callback.key).replace(
              userProvidedKeyEscapeRegex,
              "$&/"
            ) + "/") + invokeCallback
          )), array.push(callback)), 1;
        invokeCallback = 0;
        var nextNamePrefix = "" === nameSoFar ? "." : nameSoFar + ":";
        if (isArrayImpl(children))
          for (var i = 0; i < children.length; i++)
            nameSoFar = children[i], type = nextNamePrefix + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(
              nameSoFar,
              array,
              escapedPrefix,
              type,
              callback
            );
        else if (i = getIteratorFn(children), "function" === typeof i)
          for (children = i.call(children), i = 0; !(nameSoFar = children.next()).done; )
            nameSoFar = nameSoFar.value, type = nextNamePrefix + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(
              nameSoFar,
              array,
              escapedPrefix,
              type,
              callback
            );
        else if ("object" === type) {
          if ("function" === typeof children.then)
            return mapIntoArray(
              resolveThenable(children),
              array,
              escapedPrefix,
              nameSoFar,
              callback
            );
          array = String(children);
          throw Error(
            "Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead."
          );
        }
        return invokeCallback;
      }
      function mapChildren(children, func, context) {
        if (null == children) return children;
        var result = [], count = 0;
        mapIntoArray(children, result, "", "", function(child) {
          return func.call(context, child, count++);
        });
        return result;
      }
      function lazyInitializer(payload) {
        if (-1 === payload._status) {
          var ctor = payload._result, thenable = ctor();
          thenable.then(
            function(moduleObject) {
              if (0 === payload._status || -1 === payload._status)
                payload._status = 1, payload._result = moduleObject, void 0 === thenable.status && (thenable.status = "fulfilled", thenable.value = moduleObject);
            },
            function(error) {
              if (0 === payload._status || -1 === payload._status)
                payload._status = 2, payload._result = error, void 0 === thenable.status && (thenable.status = "rejected", thenable.reason = error);
            }
          );
          -1 === payload._status && (payload._status = 0, payload._result = thenable);
        }
        if (1 === payload._status) return payload._result.default;
        throw payload._result;
      }
      var reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
        if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
          var event = new window.ErrorEvent("error", {
            bubbles: true,
            cancelable: true,
            message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
            error
          });
          if (!window.dispatchEvent(event)) return;
        } else if ("object" === typeof process && "function" === typeof process.emit) {
          process.emit("uncaughtException", error);
          return;
        }
        console.error(error);
      };
      function startTransition(scope) {
        var prevTransition = ReactSharedInternals.T, currentTransition = {};
        currentTransition.types = null !== prevTransition ? prevTransition.types : null;
        ReactSharedInternals.T = currentTransition;
        try {
          var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals.S;
          null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
          "object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && returnValue.then(noop, reportGlobalError);
        } catch (error) {
          reportGlobalError(error);
        } finally {
          null !== prevTransition && null !== currentTransition.types && (prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
        }
      }
      function addTransitionType(type) {
        var transition = ReactSharedInternals.T;
        if (null !== transition) {
          var transitionTypes = transition.types;
          null === transitionTypes ? transition.types = [type] : -1 === transitionTypes.indexOf(type) && transitionTypes.push(type);
        } else startTransition(addTransitionType.bind(null, type));
      }
      var Children = {
        map: mapChildren,
        forEach: function(children, forEachFunc, forEachContext) {
          mapChildren(
            children,
            function() {
              forEachFunc.apply(this, arguments);
            },
            forEachContext
          );
        },
        count: function(children) {
          var n = 0;
          mapChildren(children, function() {
            n++;
          });
          return n;
        },
        toArray: function(children) {
          return mapChildren(children, function(child) {
            return child;
          }) || [];
        },
        only: function(children) {
          if (!isValidElement(children))
            throw Error(
              "React.Children.only expected to receive a single React element child."
            );
          return children;
        }
      };
      exports.Activity = REACT_ACTIVITY_TYPE;
      exports.Children = Children;
      exports.Component = Component;
      exports.Fragment = REACT_FRAGMENT_TYPE;
      exports.Profiler = REACT_PROFILER_TYPE;
      exports.PureComponent = PureComponent;
      exports.StrictMode = REACT_STRICT_MODE_TYPE;
      exports.Suspense = REACT_SUSPENSE_TYPE;
      exports.ViewTransition = REACT_VIEW_TRANSITION_TYPE;
      exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
      exports.__COMPILER_RUNTIME = {
        __proto__: null,
        c: function(size) {
          return ReactSharedInternals.H.useMemoCache(size);
        }
      };
      exports.addTransitionType = addTransitionType;
      exports.cache = function(fn) {
        return function() {
          return fn.apply(null, arguments);
        };
      };
      exports.cacheSignal = function() {
        return null;
      };
      exports.cloneElement = function(element, config, children) {
        if (null === element || void 0 === element)
          throw Error(
            "The argument must be a React element, but you passed " + element + "."
          );
        var props = assign({}, element.props), key = element.key;
        if (null != config)
          for (propName in void 0 !== config.key && (key = "" + config.key), config)
            !hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
        var propName = arguments.length - 2;
        if (1 === propName) props.children = children;
        else if (1 < propName) {
          for (var childArray = Array(propName), i = 0; i < propName; i++)
            childArray[i] = arguments[i + 2];
          props.children = childArray;
        }
        return ReactElement(element.type, key, props);
      };
      exports.createContext = function(defaultValue) {
        defaultValue = {
          $$typeof: REACT_CONTEXT_TYPE,
          _currentValue: defaultValue,
          _currentValue2: defaultValue,
          _threadCount: 0,
          Provider: null,
          Consumer: null
        };
        defaultValue.Provider = defaultValue;
        defaultValue.Consumer = {
          $$typeof: REACT_CONSUMER_TYPE,
          _context: defaultValue
        };
        return defaultValue;
      };
      exports.createElement = function(type, config, children) {
        var propName, props = {}, key = null;
        if (null != config)
          for (propName in void 0 !== config.key && (key = "" + config.key), config)
            hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (props[propName] = config[propName]);
        var childrenLength = arguments.length - 2;
        if (1 === childrenLength) props.children = children;
        else if (1 < childrenLength) {
          for (var childArray = Array(childrenLength), i = 0; i < childrenLength; i++)
            childArray[i] = arguments[i + 2];
          props.children = childArray;
        }
        if (type && type.defaultProps)
          for (propName in childrenLength = type.defaultProps, childrenLength)
            void 0 === props[propName] && (props[propName] = childrenLength[propName]);
        return ReactElement(type, key, props);
      };
      exports.createRef = function() {
        return { current: null };
      };
      exports.forwardRef = function(render) {
        return { $$typeof: REACT_FORWARD_REF_TYPE, render };
      };
      exports.isValidElement = isValidElement;
      exports.lazy = function(ctor) {
        return {
          $$typeof: REACT_LAZY_TYPE,
          _payload: { _status: -1, _result: ctor },
          _init: lazyInitializer
        };
      };
      exports.memo = function(type, compare) {
        return {
          $$typeof: REACT_MEMO_TYPE,
          type,
          compare: void 0 === compare ? null : compare
        };
      };
      exports.startTransition = startTransition;
      exports.unstable_useCacheRefresh = function() {
        return ReactSharedInternals.H.useCacheRefresh();
      };
      exports.use = function(usable) {
        return ReactSharedInternals.H.use(usable);
      };
      exports.useActionState = function(action, initialState, permalink) {
        return ReactSharedInternals.H.useActionState(action, initialState, permalink);
      };
      exports.useCallback = function(callback, deps) {
        return ReactSharedInternals.H.useCallback(callback, deps);
      };
      exports.useContext = function(Context) {
        return ReactSharedInternals.H.useContext(Context);
      };
      exports.useDebugValue = function() {
      };
      exports.useDeferredValue = function(value, initialValue) {
        return ReactSharedInternals.H.useDeferredValue(value, initialValue);
      };
      exports.useEffect = function(create, deps) {
        return ReactSharedInternals.H.useEffect(create, deps);
      };
      exports.useEffectEvent = function(callback) {
        return ReactSharedInternals.H.useEffectEvent(callback);
      };
      exports.useId = function() {
        return ReactSharedInternals.H.useId();
      };
      exports.useImperativeHandle = function(ref, create, deps) {
        return ReactSharedInternals.H.useImperativeHandle(ref, create, deps);
      };
      exports.useInsertionEffect = function(create, deps) {
        return ReactSharedInternals.H.useInsertionEffect(create, deps);
      };
      exports.useLayoutEffect = function(create, deps) {
        return ReactSharedInternals.H.useLayoutEffect(create, deps);
      };
      exports.useMemo = function(create, deps) {
        return ReactSharedInternals.H.useMemo(create, deps);
      };
      exports.useOptimistic = function(passthrough, reducer) {
        return ReactSharedInternals.H.useOptimistic(passthrough, reducer);
      };
      exports.useReducer = function(reducer, initialArg, init) {
        return ReactSharedInternals.H.useReducer(reducer, initialArg, init);
      };
      exports.useRef = function(initialValue) {
        return ReactSharedInternals.H.useRef(initialValue);
      };
      exports.useState = function(initialState) {
        return ReactSharedInternals.H.useState(initialState);
      };
      exports.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
        return ReactSharedInternals.H.useSyncExternalStore(
          subscribe,
          getSnapshot,
          getServerSnapshot
        );
      };
      exports.useTransition = function() {
        return ReactSharedInternals.H.useTransition();
      };
      exports.version = "19.3.0";
    }
  });

  // C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/node_modules/react/index.js
  var require_react = __commonJS({
    "C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/node_modules/react/index.js"(exports, module) {
      "use strict";
      if (true) {
        module.exports = require_react_production();
      } else {
        module.exports = null;
      }
    }
  });

  // C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/node_modules/scheduler/cjs/scheduler.production.js
  var require_scheduler_production = __commonJS({
    "C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/node_modules/scheduler/cjs/scheduler.production.js"(exports) {
      "use strict";
      function push(heap, node) {
        var index = heap.length;
        heap.push(node);
        a: for (; 0 < index; ) {
          var parentIndex = index - 1 >>> 1, parent = heap[parentIndex];
          if (0 < compare(parent, node))
            heap[parentIndex] = node, heap[index] = parent, index = parentIndex;
          else break a;
        }
      }
      function peek(heap) {
        return 0 === heap.length ? null : heap[0];
      }
      function pop(heap) {
        if (0 === heap.length) return null;
        var first = heap[0], last = heap.pop();
        if (last !== first) {
          heap[0] = last;
          a: for (var index = 0, length = heap.length, halfLength = length >>> 1; index < halfLength; ) {
            var leftIndex = 2 * (index + 1) - 1, left = heap[leftIndex], rightIndex = leftIndex + 1, right = heap[rightIndex];
            if (0 > compare(left, last))
              rightIndex < length && 0 > compare(right, left) ? (heap[index] = right, heap[rightIndex] = last, index = rightIndex) : (heap[index] = left, heap[leftIndex] = last, index = leftIndex);
            else if (rightIndex < length && 0 > compare(right, last))
              heap[index] = right, heap[rightIndex] = last, index = rightIndex;
            else break a;
          }
        }
        return first;
      }
      function compare(a, b) {
        var diff = a.sortIndex - b.sortIndex;
        return 0 !== diff ? diff : a.id - b.id;
      }
      exports.unstable_now = void 0;
      if ("object" === typeof performance && "function" === typeof performance.now) {
        localPerformance = performance;
        exports.unstable_now = function() {
          return localPerformance.now();
        };
      } else {
        localDate = Date, initialTime = localDate.now();
        exports.unstable_now = function() {
          return localDate.now() - initialTime;
        };
      }
      var localPerformance;
      var localDate;
      var initialTime;
      var taskQueue = [];
      var timerQueue = [];
      var taskIdCounter = 1;
      var currentTask = null;
      var currentPriorityLevel = 3;
      var isPerformingWork = false;
      var isHostCallbackScheduled = false;
      var isHostTimeoutScheduled = false;
      var needsPaint = false;
      var localSetTimeout = "function" === typeof setTimeout ? setTimeout : null;
      var localClearTimeout = "function" === typeof clearTimeout ? clearTimeout : null;
      var localSetImmediate = "undefined" !== typeof setImmediate ? setImmediate : null;
      function advanceTimers(currentTime) {
        for (var timer = peek(timerQueue); null !== timer; ) {
          if (null === timer.callback) pop(timerQueue);
          else if (timer.startTime <= currentTime)
            pop(timerQueue), timer.sortIndex = timer.expirationTime, push(taskQueue, timer);
          else break;
          timer = peek(timerQueue);
        }
      }
      function handleTimeout(currentTime) {
        isHostTimeoutScheduled = false;
        advanceTimers(currentTime);
        if (!isHostCallbackScheduled)
          if (null !== peek(taskQueue))
            isHostCallbackScheduled = true, isMessageLoopRunning || (isMessageLoopRunning = true, schedulePerformWorkUntilDeadline());
          else {
            var firstTimer = peek(timerQueue);
            null !== firstTimer && requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
          }
      }
      var isMessageLoopRunning = false;
      var taskTimeoutID = -1;
      var frameInterval = 5;
      var startTime = -1;
      function shouldYieldToHost() {
        return needsPaint ? true : exports.unstable_now() - startTime < frameInterval ? false : true;
      }
      function performWorkUntilDeadline() {
        needsPaint = false;
        if (isMessageLoopRunning) {
          var currentTime = exports.unstable_now();
          startTime = currentTime;
          var hasMoreWork = true;
          try {
            a: {
              isHostCallbackScheduled = false;
              isHostTimeoutScheduled && (isHostTimeoutScheduled = false, localClearTimeout(taskTimeoutID), taskTimeoutID = -1);
              isPerformingWork = true;
              var previousPriorityLevel = currentPriorityLevel;
              try {
                b: {
                  advanceTimers(currentTime);
                  for (currentTask = peek(taskQueue); null !== currentTask && !(currentTask.expirationTime > currentTime && shouldYieldToHost()); ) {
                    var callback = currentTask.callback;
                    if ("function" === typeof callback) {
                      currentTask.callback = null;
                      currentPriorityLevel = currentTask.priorityLevel;
                      var continuationCallback = callback(
                        currentTask.expirationTime <= currentTime
                      );
                      currentTime = exports.unstable_now();
                      if ("function" === typeof continuationCallback) {
                        currentTask.callback = continuationCallback;
                        advanceTimers(currentTime);
                        hasMoreWork = true;
                        break b;
                      }
                      currentTask === peek(taskQueue) && pop(taskQueue);
                      advanceTimers(currentTime);
                    } else pop(taskQueue);
                    currentTask = peek(taskQueue);
                  }
                  if (null !== currentTask) hasMoreWork = true;
                  else {
                    var firstTimer = peek(timerQueue);
                    null !== firstTimer && requestHostTimeout(
                      handleTimeout,
                      firstTimer.startTime - currentTime
                    );
                    hasMoreWork = false;
                  }
                }
                break a;
              } finally {
                currentTask = null, currentPriorityLevel = previousPriorityLevel, isPerformingWork = false;
              }
              hasMoreWork = void 0;
            }
          } finally {
            hasMoreWork ? schedulePerformWorkUntilDeadline() : isMessageLoopRunning = false;
          }
        }
      }
      var schedulePerformWorkUntilDeadline;
      if ("function" === typeof localSetImmediate)
        schedulePerformWorkUntilDeadline = function() {
          localSetImmediate(performWorkUntilDeadline);
        };
      else if ("undefined" !== typeof MessageChannel) {
        channel = new MessageChannel(), port = channel.port2;
        channel.port1.onmessage = performWorkUntilDeadline;
        schedulePerformWorkUntilDeadline = function() {
          port.postMessage(null);
        };
      } else
        schedulePerformWorkUntilDeadline = function() {
          localSetTimeout(performWorkUntilDeadline, 0);
        };
      var channel;
      var port;
      function requestHostTimeout(callback, ms) {
        taskTimeoutID = localSetTimeout(function() {
          callback(exports.unstable_now());
        }, ms);
      }
      exports.unstable_IdlePriority = 5;
      exports.unstable_ImmediatePriority = 1;
      exports.unstable_LowPriority = 4;
      exports.unstable_NormalPriority = 3;
      exports.unstable_Profiling = null;
      exports.unstable_UserBlockingPriority = 2;
      exports.unstable_cancelCallback = function(task) {
        task.callback = null;
      };
      exports.unstable_forceFrameRate = function(fps) {
        0 > fps || 125 < fps ? console.error(
          "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
        ) : frameInterval = 0 < fps ? Math.floor(1e3 / fps) : 5;
      };
      exports.unstable_getCurrentPriorityLevel = function() {
        return currentPriorityLevel;
      };
      exports.unstable_next = function(eventHandler) {
        switch (currentPriorityLevel) {
          case 1:
          case 2:
          case 3:
            var priorityLevel = 3;
            break;
          default:
            priorityLevel = currentPriorityLevel;
        }
        var previousPriorityLevel = currentPriorityLevel;
        currentPriorityLevel = priorityLevel;
        try {
          return eventHandler();
        } finally {
          currentPriorityLevel = previousPriorityLevel;
        }
      };
      exports.unstable_requestPaint = function() {
        needsPaint = true;
      };
      exports.unstable_runWithPriority = function(priorityLevel, eventHandler) {
        switch (priorityLevel) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            priorityLevel = 3;
        }
        var previousPriorityLevel = currentPriorityLevel;
        currentPriorityLevel = priorityLevel;
        try {
          return eventHandler();
        } finally {
          currentPriorityLevel = previousPriorityLevel;
        }
      };
      exports.unstable_scheduleCallback = function(priorityLevel, callback, options) {
        var currentTime = exports.unstable_now();
        "object" === typeof options && null !== options ? (options = options.delay, options = "number" === typeof options && 0 < options ? currentTime + options : currentTime) : options = currentTime;
        switch (priorityLevel) {
          case 1:
            var timeout = -1;
            break;
          case 2:
            timeout = 250;
            break;
          case 5:
            timeout = 1073741823;
            break;
          case 4:
            timeout = 1e4;
            break;
          default:
            timeout = 5e3;
        }
        timeout = options + timeout;
        priorityLevel = {
          id: taskIdCounter++,
          callback,
          priorityLevel,
          startTime: options,
          expirationTime: timeout,
          sortIndex: -1
        };
        options > currentTime ? (priorityLevel.sortIndex = options, push(timerQueue, priorityLevel), null === peek(taskQueue) && priorityLevel === peek(timerQueue) && (isHostTimeoutScheduled ? (localClearTimeout(taskTimeoutID), taskTimeoutID = -1) : isHostTimeoutScheduled = true, requestHostTimeout(handleTimeout, options - currentTime))) : (priorityLevel.sortIndex = timeout, push(taskQueue, priorityLevel), isHostCallbackScheduled || isPerformingWork || (isHostCallbackScheduled = true, isMessageLoopRunning || (isMessageLoopRunning = true, schedulePerformWorkUntilDeadline())));
        return priorityLevel;
      };
      exports.unstable_shouldYield = shouldYieldToHost;
      exports.unstable_wrapCallback = function(callback) {
        var parentPriorityLevel = currentPriorityLevel;
        return function() {
          var previousPriorityLevel = currentPriorityLevel;
          currentPriorityLevel = parentPriorityLevel;
          try {
            return callback.apply(this, arguments);
          } finally {
            currentPriorityLevel = previousPriorityLevel;
          }
        };
      };
    }
  });

  // C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/node_modules/scheduler/index.js
  var require_scheduler = __commonJS({
    "C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/node_modules/scheduler/index.js"(exports, module) {
      "use strict";
      if (true) {
        module.exports = require_scheduler_production();
      } else {
        module.exports = null;
      }
    }
  });

  // C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/node_modules/react-dom/cjs/react-dom.production.js
  var require_react_dom_production = __commonJS({
    "C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/node_modules/react-dom/cjs/react-dom.production.js"(exports) {
      "use strict";
      var React6 = require_react();
      function formatProdErrorMessage(code) {
        var url = "https://react.dev/errors/" + code;
        if (1 < arguments.length) {
          url += "?args[]=" + encodeURIComponent(arguments[1]);
          for (var i = 2; i < arguments.length; i++)
            url += "&args[]=" + encodeURIComponent(arguments[i]);
        }
        return "Minified React error #" + code + "; visit " + url + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
      }
      function noop() {
      }
      var Internals = {
        d: {
          f: noop,
          r: function() {
            throw Error(formatProdErrorMessage(522));
          },
          D: noop,
          C: noop,
          L: noop,
          m: noop,
          X: noop,
          S: noop,
          M: noop
        },
        p: 0,
        findDOMNode: null
      };
      var REACT_PORTAL_TYPE = Symbol.for("react.portal");
      var REACT_RECOVERABLE_TYPE = Symbol.for("react.recoverable");
      var REACT_OPTIMISTIC_KEY = Symbol.for("react.optimistic_key");
      function createPortal$1(children, containerInfo, implementation) {
        var key = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
        return {
          $$typeof: REACT_PORTAL_TYPE,
          key: null == key ? null : key === REACT_OPTIMISTIC_KEY ? REACT_OPTIMISTIC_KEY : "" + key,
          children,
          containerInfo,
          implementation
        };
      }
      var ReactSharedInternals = React6.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
      function getCrossOriginStringAs(as, input) {
        if ("font" === as) return "";
        if ("string" === typeof input)
          return "use-credentials" === input ? input : "";
      }
      exports.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Internals;
      exports.browser = function(reason) {
        return { $$typeof: REACT_RECOVERABLE_TYPE, _reason: reason };
      };
      exports.createPortal = function(children, container) {
        var key = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
        if (!container || 1 !== container.nodeType && 9 !== container.nodeType && 11 !== container.nodeType)
          throw Error(formatProdErrorMessage(299));
        return createPortal$1(children, container, null, key);
      };
      exports.flushSync = function(fn) {
        var previousTransition = ReactSharedInternals.T, previousUpdatePriority = Internals.p;
        try {
          if (ReactSharedInternals.T = null, Internals.p = 2, fn) return fn();
        } finally {
          ReactSharedInternals.T = previousTransition, Internals.p = previousUpdatePriority, Internals.d.f();
        }
      };
      exports.preconnect = function(href, options) {
        "string" === typeof href && (options ? (options = options.crossOrigin, options = "string" === typeof options ? "use-credentials" === options ? options : "" : void 0) : options = null, Internals.d.C(href, options));
      };
      exports.prefetchDNS = function(href) {
        "string" === typeof href && Internals.d.D(href);
      };
      exports.preinit = function(href, options) {
        if ("string" === typeof href && options && "string" === typeof options.as) {
          var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin), integrity = "string" === typeof options.integrity ? options.integrity : void 0, fetchPriority = "string" === typeof options.fetchPriority ? options.fetchPriority : void 0;
          "style" === as ? Internals.d.S(
            href,
            "string" === typeof options.precedence ? options.precedence : void 0,
            {
              crossOrigin,
              integrity,
              fetchPriority
            }
          ) : "script" === as && Internals.d.X(href, {
            crossOrigin,
            integrity,
            fetchPriority,
            nonce: "string" === typeof options.nonce ? options.nonce : void 0
          });
        }
      };
      exports.preinitModule = function(href, options) {
        if ("string" === typeof href)
          if ("object" === typeof options && null !== options) {
            if (null == options.as || "script" === options.as) {
              var crossOrigin = getCrossOriginStringAs(
                options.as,
                options.crossOrigin
              );
              Internals.d.M(href, {
                crossOrigin,
                integrity: "string" === typeof options.integrity ? options.integrity : void 0,
                nonce: "string" === typeof options.nonce ? options.nonce : void 0,
                fetchPriority: "string" === typeof options.fetchPriority ? options.fetchPriority : void 0
              });
            }
          } else null == options && Internals.d.M(href);
      };
      exports.preload = function(href, options) {
        if ("string" === typeof href && "object" === typeof options && null !== options && "string" === typeof options.as) {
          var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin);
          Internals.d.L(href, as, {
            crossOrigin,
            integrity: "string" === typeof options.integrity ? options.integrity : void 0,
            nonce: "string" === typeof options.nonce ? options.nonce : void 0,
            type: "string" === typeof options.type ? options.type : void 0,
            fetchPriority: "string" === typeof options.fetchPriority ? options.fetchPriority : void 0,
            referrerPolicy: "string" === typeof options.referrerPolicy ? options.referrerPolicy : void 0,
            imageSrcSet: "string" === typeof options.imageSrcSet ? options.imageSrcSet : void 0,
            imageSizes: "string" === typeof options.imageSizes ? options.imageSizes : void 0,
            media: "string" === typeof options.media ? options.media : void 0
          });
        }
      };
      exports.preloadModule = function(href, options) {
        if ("string" === typeof href)
          if (options) {
            var crossOrigin = getCrossOriginStringAs(options.as, options.crossOrigin);
            Internals.d.m(href, {
              as: "string" === typeof options.as && "script" !== options.as ? options.as : void 0,
              crossOrigin,
              integrity: "string" === typeof options.integrity ? options.integrity : void 0,
              nonce: "string" === typeof options.nonce ? options.nonce : void 0,
              fetchPriority: "string" === typeof options.fetchPriority ? options.fetchPriority : void 0
            });
          } else Internals.d.m(href);
      };
      exports.requestFormReset = function(form) {
        Internals.d.r(form);
      };
      exports.unstable_batchedUpdates = function(fn, a) {
        return fn(a);
      };
      exports.useFormState = function(action, initialState, permalink) {
        return ReactSharedInternals.H.useFormState(action, initialState, permalink);
      };
      exports.useFormStatus = function() {
        return ReactSharedInternals.H.useHostTransitionStatus();
      };
      exports.version = "19.3.0";
    }
  });

  // C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/node_modules/react-dom/index.js
  var require_react_dom = __commonJS({
    "C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/node_modules/react-dom/index.js"(exports, module) {
      "use strict";
      function checkDCE() {
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
          return;
        }
        if (false) {
          throw new Error("^_^");
        }
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
        } catch (err) {
          console.error(err);
        }
      }
      if (true) {
        checkDCE();
        module.exports = require_react_dom_production();
      } else {
        module.exports = null;
      }
    }
  });

  // C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/node_modules/react-dom/cjs/react-dom-client.production.js
  var require_react_dom_client_production = __commonJS({
    "C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/node_modules/react-dom/cjs/react-dom-client.production.js"(exports) {
      "use strict";
      var Scheduler = require_scheduler();
      var React6 = require_react();
      var ReactDOM = require_react_dom();
      function formatProdErrorMessage(code) {
        var url = "https://react.dev/errors/" + code;
        if (1 < arguments.length) {
          url += "?args[]=" + encodeURIComponent(arguments[1]);
          for (var i = 2; i < arguments.length; i++)
            url += "&args[]=" + encodeURIComponent(arguments[i]);
        }
        return "Minified React error #" + code + "; visit " + url + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
      }
      function isValidContainer(node) {
        return !(!node || 1 !== node.nodeType && 9 !== node.nodeType && 11 !== node.nodeType);
      }
      function getNearestMountedFiber(fiber) {
        for (var node = fiber, nextNode = node; nextNode && !nextNode.alternate; )
          node = nextNode, 0 !== (node.flags & 4098) && (fiber = node.return), nextNode = node.return;
        for (; node.return; ) node = node.return;
        return 3 === node.tag ? fiber : null;
      }
      function getSuspenseInstanceFromFiber(fiber) {
        if (13 === fiber.tag) {
          var suspenseState = fiber.memoizedState;
          null === suspenseState && (fiber = fiber.alternate, null !== fiber && (suspenseState = fiber.memoizedState));
          if (null !== suspenseState) return suspenseState.dehydrated;
        }
        return null;
      }
      function getActivityInstanceFromFiber(fiber) {
        if (31 === fiber.tag) {
          var activityState = fiber.memoizedState;
          null === activityState && (fiber = fiber.alternate, null !== fiber && (activityState = fiber.memoizedState));
          if (null !== activityState) return activityState.dehydrated;
        }
        return null;
      }
      function assertIsMounted(fiber) {
        if (getNearestMountedFiber(fiber) !== fiber)
          throw Error(formatProdErrorMessage(188));
      }
      function findCurrentFiberUsingSlowPath(fiber) {
        var alternate = fiber.alternate;
        if (!alternate) {
          alternate = getNearestMountedFiber(fiber);
          if (null === alternate) throw Error(formatProdErrorMessage(188));
          return alternate !== fiber ? null : fiber;
        }
        for (var a = fiber, b = alternate; ; ) {
          var parentA = a.return;
          if (null === parentA) break;
          var parentB = parentA.alternate;
          if (null === parentB) {
            b = parentA.return;
            if (null !== b) {
              a = b;
              continue;
            }
            break;
          }
          if (parentA.child === parentB.child) {
            for (parentB = parentA.child; parentB; ) {
              if (parentB === a) return assertIsMounted(parentA), fiber;
              if (parentB === b) return assertIsMounted(parentA), alternate;
              parentB = parentB.sibling;
            }
            throw Error(formatProdErrorMessage(188));
          }
          if (a.return !== b.return) a = parentA, b = parentB;
          else {
            for (var didFindChild = false, child$0 = parentA.child; child$0; ) {
              if (child$0 === a) {
                didFindChild = true;
                a = parentA;
                b = parentB;
                break;
              }
              if (child$0 === b) {
                didFindChild = true;
                b = parentA;
                a = parentB;
                break;
              }
              child$0 = child$0.sibling;
            }
            if (!didFindChild) {
              for (child$0 = parentB.child; child$0; ) {
                if (child$0 === a) {
                  didFindChild = true;
                  a = parentB;
                  b = parentA;
                  break;
                }
                if (child$0 === b) {
                  didFindChild = true;
                  b = parentB;
                  a = parentA;
                  break;
                }
                child$0 = child$0.sibling;
              }
              if (!didFindChild) throw Error(formatProdErrorMessage(189));
            }
          }
          if (a.alternate !== b) throw Error(formatProdErrorMessage(190));
        }
        if (3 !== a.tag) throw Error(formatProdErrorMessage(188));
        return a.stateNode.current === a ? fiber : alternate;
      }
      function findCurrentHostFiberImpl(node) {
        var tag = node.tag;
        if (5 === tag || 26 === tag || 27 === tag || 6 === tag) return node;
        for (node = node.child; null !== node; ) {
          tag = findCurrentHostFiberImpl(node);
          if (null !== tag) return tag;
          node = node.sibling;
        }
        return null;
      }
      function traverseVisibleInstancesAndTextInstances(child, searchWithinHosts, fn, a, b, c) {
        for (; null !== child; ) {
          if ((5 === child.tag || 27 === child.tag || 6 === child.tag) && fn(child, a, b, c) || (22 !== child.tag || null === child.memoizedState) && (searchWithinHosts || 5 !== child.tag && 27 !== child.tag) && traverseVisibleInstancesAndTextInstances(
            child.child,
            searchWithinHosts,
            fn,
            a,
            b,
            c
          ))
            return true;
          child = child.sibling;
        }
        return false;
      }
      function getFragmentParentInstanceOrContainerFiber(fiber) {
        for (fiber = fiber.return; null !== fiber; ) {
          if (3 === fiber.tag || 5 === fiber.tag || 27 === fiber.tag) return fiber;
          fiber = fiber.return;
        }
        return null;
      }
      function fiberIsPortaledIntoHost(fiber) {
        var foundPortalParent = false;
        for (fiber = fiber.return; null !== fiber; ) {
          4 === fiber.tag && (foundPortalParent = true);
          if (3 === fiber.tag || 5 === fiber.tag || 27 === fiber.tag) break;
          fiber = fiber.return;
        }
        return foundPortalParent;
      }
      function getFragmentInstanceOrTextInstanceSiblings(fiber) {
        var result = [null, null], parentHostFiber = getFragmentParentInstanceOrContainerFiber(fiber);
        if (null === parentHostFiber) return result;
        findFragmentInstanceOrTextInstanceSiblings(
          result,
          fiber,
          parentHostFiber.child,
          { foundSelf: false }
        );
        return result;
      }
      function findFragmentInstanceOrTextInstanceSiblings(result, self, child, state) {
        for (; null !== child; ) {
          if (child === self) state.foundSelf = true;
          else if (5 === child.tag || 27 === child.tag || 6 === child.tag) {
            if (state.foundSelf) return result[1] = child, true;
            result[0] = child;
          } else if ((22 !== child.tag || null === child.memoizedState) && findFragmentInstanceOrTextInstanceSiblings(
            result,
            self,
            child.child,
            state
          ))
            return true;
          child = child.sibling;
        }
        return false;
      }
      function getInstanceFromHostFiber(fiber) {
        switch (fiber.tag) {
          case 5:
          case 27:
          case 6:
            return fiber.stateNode;
          case 3:
            return fiber.stateNode.containerInfo;
          default:
            throw Error(formatProdErrorMessage(559));
        }
      }
      var searchTarget = null;
      var searchBoundary = null;
      function isFiberPrecedingCheck(child, target, boundary) {
        return child === boundary ? true : child === target ? (searchTarget = child, true) : false;
      }
      function isFiberFollowingCheck(child, target, boundary) {
        return child === boundary ? (searchBoundary = child, false) : child === target ? (null !== searchBoundary && (searchTarget = child), true) : false;
      }
      function getParentForFragmentAncestors(inst) {
        if (null === inst) return null;
        do
          inst = null === inst ? null : inst.return;
        while (inst && 5 !== inst.tag && 27 !== inst.tag && 3 !== inst.tag);
        return inst ? inst : null;
      }
      function getLowestCommonAncestor(instA, instB, getParent2) {
        for (var depthA = 0, tempA = instA; tempA; tempA = getParent2(tempA)) depthA++;
        tempA = 0;
        for (var tempB = instB; tempB; tempB = getParent2(tempB)) tempA++;
        for (; 0 < depthA - tempA; ) instA = getParent2(instA), depthA--;
        for (; 0 < tempA - depthA; ) instB = getParent2(instB), tempA--;
        for (; depthA--; ) {
          if (instA === instB || null !== instB && instA === instB.alternate)
            return instA;
          instA = getParent2(instA);
          instB = getParent2(instB);
        }
        return null;
      }
      var assign = Object.assign;
      var REACT_LEGACY_ELEMENT_TYPE = Symbol.for("react.element");
      var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element");
      var REACT_PORTAL_TYPE = Symbol.for("react.portal");
      var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
      var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
      var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
      var REACT_CONSUMER_TYPE = Symbol.for("react.consumer");
      var REACT_CONTEXT_TYPE = Symbol.for("react.context");
      var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
      var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
      var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
      var REACT_MEMO_TYPE = Symbol.for("react.memo");
      var REACT_LAZY_TYPE = Symbol.for("react.lazy");
      Symbol.for("react.scope");
      var REACT_ACTIVITY_TYPE = Symbol.for("react.activity");
      var REACT_LEGACY_HIDDEN_TYPE = Symbol.for("react.legacy_hidden");
      Symbol.for("react.tracing_marker");
      var REACT_MEMO_CACHE_SENTINEL = Symbol.for("react.memo_cache_sentinel");
      var REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition");
      var REACT_RECOVERABLE_TYPE = Symbol.for("react.recoverable");
      var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
      function getIteratorFn(maybeIterable) {
        if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
        maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
        return "function" === typeof maybeIterable ? maybeIterable : null;
      }
      var REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference");
      function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type)
          return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch (type) {
          case REACT_FRAGMENT_TYPE:
            return "Fragment";
          case REACT_PROFILER_TYPE:
            return "Profiler";
          case REACT_STRICT_MODE_TYPE:
            return "StrictMode";
          case REACT_SUSPENSE_TYPE:
            return "Suspense";
          case REACT_SUSPENSE_LIST_TYPE:
            return "SuspenseList";
          case REACT_ACTIVITY_TYPE:
            return "Activity";
          case REACT_VIEW_TRANSITION_TYPE:
            return "ViewTransition";
        }
        if ("object" === typeof type)
          switch (type.$$typeof) {
            case REACT_PORTAL_TYPE:
              return "Portal";
            case REACT_CONTEXT_TYPE:
              return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
              return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
              var innerType = type.render;
              type = type.displayName;
              type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
              return type;
            case REACT_MEMO_TYPE:
              return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
              innerType = type._payload;
              type = type._init;
              try {
                return getComponentNameFromType(type(innerType));
              } catch (x) {
              }
          }
        return null;
      }
      var isArrayImpl = Array.isArray;
      var ReactSharedInternals = React6.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
      var ReactDOMSharedInternals = ReactDOM.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
      var sharedNotPendingObject = {
        pending: false,
        data: null,
        method: null,
        action: null
      };
      var valueStack = [];
      var index = -1;
      function createCursor(defaultValue) {
        return { current: defaultValue };
      }
      function pop(cursor) {
        0 > index || (cursor.current = valueStack[index], valueStack[index] = null, index--);
      }
      function push(cursor, value) {
        index++;
        valueStack[index] = cursor.current;
        cursor.current = value;
      }
      var contextStackCursor = createCursor(null);
      var contextFiberStackCursor = createCursor(null);
      var rootInstanceStackCursor = createCursor(null);
      var hostTransitionProviderCursor = createCursor(null);
      function pushHostContainer(fiber, nextRootInstance) {
        push(rootInstanceStackCursor, nextRootInstance);
        push(contextFiberStackCursor, fiber);
        push(contextStackCursor, null);
        switch (nextRootInstance.nodeType) {
          case 9:
          case 11:
            fiber = (fiber = nextRootInstance.documentElement) ? (fiber = fiber.namespaceURI) ? getOwnHostContext(fiber) : 0 : 0;
            break;
          default:
            if (fiber = nextRootInstance.tagName, nextRootInstance = nextRootInstance.namespaceURI)
              nextRootInstance = getOwnHostContext(nextRootInstance), fiber = getChildHostContextProd(nextRootInstance, fiber);
            else
              switch (fiber) {
                case "svg":
                  fiber = 1;
                  break;
                case "math":
                  fiber = 2;
                  break;
                default:
                  fiber = 0;
              }
        }
        pop(contextStackCursor);
        push(contextStackCursor, fiber);
      }
      function popHostContainer() {
        pop(contextStackCursor);
        pop(contextFiberStackCursor);
        pop(rootInstanceStackCursor);
      }
      function pushHostContext(fiber) {
        var stateHook = fiber.memoizedState;
        null !== stateHook && (HostTransitionContext._currentValue = stateHook.memoizedState, push(hostTransitionProviderCursor, fiber));
        stateHook = contextStackCursor.current;
        var JSCompiler_inline_result = getChildHostContextProd(stateHook, fiber.type);
        stateHook !== JSCompiler_inline_result && (push(contextFiberStackCursor, fiber), push(contextStackCursor, JSCompiler_inline_result));
      }
      function popHostContext(fiber) {
        contextFiberStackCursor.current === fiber && (pop(contextStackCursor), pop(contextFiberStackCursor));
        hostTransitionProviderCursor.current === fiber && (pop(hostTransitionProviderCursor), HostTransitionContext._currentValue = sharedNotPendingObject);
      }
      var prefix;
      var suffix;
      function describeBuiltInComponentFrame(name) {
        if (void 0 === prefix)
          try {
            throw Error();
          } catch (x) {
            var match = x.stack.trim().match(/\n( *(at )?)/);
            prefix = match && match[1] || "";
            suffix = -1 < x.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < x.stack.indexOf("@") ? "@unknown:0:0" : "";
          }
        return "\n" + prefix + name + suffix;
      }
      var reentry = false;
      function describeNativeComponentFrame(fn, construct) {
        if (!fn || reentry) return "";
        reentry = true;
        var previousPrepareStackTrace = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        try {
          var RunInRootFrame = {
            DetermineComponentFrameRoot: function() {
              try {
                if (construct) {
                  var Fake = function() {
                    throw Error();
                  };
                  Object.defineProperty(Fake.prototype, "props", {
                    set: function() {
                      throw Error();
                    }
                  });
                  if ("object" === typeof Reflect && Reflect.construct) {
                    try {
                      Reflect.construct(Fake, []);
                    } catch (x) {
                      var control = x;
                    }
                    Reflect.construct(fn, [], Fake);
                  } else {
                    try {
                      Fake.call();
                    } catch (x$1) {
                      control = x$1;
                    }
                    Fake = false;
                    try {
                      var prevProps = Object.getOwnPropertyDescriptor(
                        fn.prototype,
                        "props"
                      );
                      Object.defineProperty(fn.prototype, "props", {
                        configurable: true,
                        set: function() {
                          throw Error();
                        }
                      });
                      Fake = true;
                      new fn();
                    } finally {
                      Fake && (void 0 !== prevProps ? Object.defineProperty(fn.prototype, "props", prevProps) : delete fn.prototype.props);
                    }
                  }
                } else {
                  try {
                    throw Error();
                  } catch (x$2) {
                    control = x$2;
                  }
                  (Fake = fn()) && "function" === typeof Fake.catch && Fake.catch(function() {
                  });
                }
              } catch (sample) {
                if (sample && control && "string" === typeof sample.stack)
                  return [sample.stack, control.stack];
              }
              return [null, null];
            }
          };
          RunInRootFrame.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
          var namePropDescriptor = Object.getOwnPropertyDescriptor(
            RunInRootFrame.DetermineComponentFrameRoot,
            "name"
          );
          namePropDescriptor && namePropDescriptor.configurable && Object.defineProperty(
            RunInRootFrame.DetermineComponentFrameRoot,
            "name",
            { value: "DetermineComponentFrameRoot" }
          );
          var _RunInRootFrame$Deter = RunInRootFrame.DetermineComponentFrameRoot(), sampleStack = _RunInRootFrame$Deter[0], controlStack = _RunInRootFrame$Deter[1];
          if (sampleStack && controlStack) {
            var sampleLines = sampleStack.split("\n"), controlLines = controlStack.split("\n");
            for (namePropDescriptor = RunInRootFrame = 0; RunInRootFrame < sampleLines.length && !sampleLines[RunInRootFrame].includes("DetermineComponentFrameRoot"); )
              RunInRootFrame++;
            for (; namePropDescriptor < controlLines.length && !controlLines[namePropDescriptor].includes(
              "DetermineComponentFrameRoot"
            ); )
              namePropDescriptor++;
            if (RunInRootFrame === sampleLines.length || namePropDescriptor === controlLines.length)
              for (RunInRootFrame = sampleLines.length - 1, namePropDescriptor = controlLines.length - 1; 1 <= RunInRootFrame && 0 <= namePropDescriptor && sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]; )
                namePropDescriptor--;
            for (; 1 <= RunInRootFrame && 0 <= namePropDescriptor; RunInRootFrame--, namePropDescriptor--)
              if (sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]) {
                if (1 !== RunInRootFrame || 1 !== namePropDescriptor) {
                  do
                    if (RunInRootFrame--, namePropDescriptor--, 0 > namePropDescriptor || sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]) {
                      var frame = "\n" + sampleLines[RunInRootFrame].replace(" at new ", " at ");
                      fn.displayName && frame.includes("<anonymous>") && (frame = frame.replace("<anonymous>", fn.displayName));
                      return frame;
                    }
                  while (1 <= RunInRootFrame && 0 <= namePropDescriptor);
                }
                break;
              }
          }
        } finally {
          reentry = false, Error.prepareStackTrace = previousPrepareStackTrace;
        }
        return (previousPrepareStackTrace = fn ? fn.displayName || fn.name : "") ? describeBuiltInComponentFrame(previousPrepareStackTrace) : "";
      }
      function describeFiber(fiber, childFiber) {
        switch (fiber.tag) {
          case 26:
          case 27:
          case 5:
            return describeBuiltInComponentFrame(fiber.type);
          case 16:
            return describeBuiltInComponentFrame("Lazy");
          case 13:
            return fiber.child !== childFiber && null !== childFiber ? describeBuiltInComponentFrame("Suspense Fallback") : describeBuiltInComponentFrame("Suspense");
          case 19:
            return describeBuiltInComponentFrame("SuspenseList");
          case 0:
          case 15:
            return describeNativeComponentFrame(fiber.type, false);
          case 11:
            return describeNativeComponentFrame(fiber.type.render, false);
          case 1:
            return describeNativeComponentFrame(fiber.type, true);
          case 31:
            return describeBuiltInComponentFrame("Activity");
          case 30:
            return describeBuiltInComponentFrame("ViewTransition");
          default:
            return "";
        }
      }
      function getStackByFiberInDevAndProd(workInProgress2) {
        try {
          var info = "", previous = null;
          do
            info += describeFiber(workInProgress2, previous), previous = workInProgress2, workInProgress2 = workInProgress2.return;
          while (workInProgress2);
          return info;
        } catch (x) {
          return "\nError generating stack: " + x.message + "\n" + x.stack;
        }
      }
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      var scheduleCallback$3 = Scheduler.unstable_scheduleCallback;
      var cancelCallback$1 = Scheduler.unstable_cancelCallback;
      var shouldYield = Scheduler.unstable_shouldYield;
      var requestPaint = Scheduler.unstable_requestPaint;
      var now = Scheduler.unstable_now;
      var getCurrentPriorityLevel = Scheduler.unstable_getCurrentPriorityLevel;
      var ImmediatePriority = Scheduler.unstable_ImmediatePriority;
      var UserBlockingPriority = Scheduler.unstable_UserBlockingPriority;
      var NormalPriority$1 = Scheduler.unstable_NormalPriority;
      var LowPriority = Scheduler.unstable_LowPriority;
      var IdlePriority = Scheduler.unstable_IdlePriority;
      var log$1 = Scheduler.log;
      var unstable_setDisableYieldValue = Scheduler.unstable_setDisableYieldValue;
      var rendererID = null;
      var injectedHook = null;
      function setIsStrictModeForDevtools(newIsStrictMode) {
        "function" === typeof log$1 && unstable_setDisableYieldValue(newIsStrictMode);
        if (injectedHook && "function" === typeof injectedHook.setStrictMode)
          try {
            injectedHook.setStrictMode(rendererID, newIsStrictMode);
          } catch (err) {
          }
      }
      var clz32 = Math.clz32 ? Math.clz32 : clz32Fallback;
      var log = Math.log;
      var LN2 = Math.LN2;
      function clz32Fallback(x) {
        x >>>= 0;
        return 0 === x ? 32 : 31 - (log(x) / LN2 | 0) | 0;
      }
      var nextTransitionUpdateLane = 256;
      var nextTransitionDeferredLane = 262144;
      var nextRetryLane = 4194304;
      function getHighestPriorityLanes(lanes) {
        var pendingSyncLanes = lanes & 42;
        if (0 !== pendingSyncLanes) return pendingSyncLanes;
        switch (lanes & -lanes) {
          case 1:
            return 1;
          case 2:
            return 2;
          case 4:
            return 4;
          case 8:
            return 8;
          case 16:
            return 16;
          case 32:
            return 32;
          case 64:
            return 64;
          case 128:
            return 128;
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
            return lanes & -lanes;
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
            return lanes & 3932160;
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
            return lanes & 62914560;
          case 67108864:
            return 67108864;
          case 134217728:
            return 134217728;
          case 268435456:
            return 268435456;
          case 536870912:
            return 536870912;
          case 1073741824:
            return 0;
          default:
            return lanes;
        }
      }
      function getNextLanes(root2, wipLanes, rootHasPendingCommit) {
        var pendingLanes = root2.pendingLanes;
        if (0 === pendingLanes) return 0;
        var nextLanes = 0, suspendedLanes = root2.suspendedLanes, pingedLanes = root2.pingedLanes;
        root2 = root2.warmLanes;
        var nonIdlePendingLanes = pendingLanes & 134217727;
        0 !== nonIdlePendingLanes ? (pendingLanes = nonIdlePendingLanes & ~suspendedLanes, 0 !== pendingLanes ? nextLanes = getHighestPriorityLanes(pendingLanes) : (pingedLanes &= nonIdlePendingLanes, 0 !== pingedLanes ? nextLanes = getHighestPriorityLanes(pingedLanes) : rootHasPendingCommit || (rootHasPendingCommit = nonIdlePendingLanes & ~root2, 0 !== rootHasPendingCommit && (nextLanes = getHighestPriorityLanes(rootHasPendingCommit))))) : (nonIdlePendingLanes = pendingLanes & ~suspendedLanes, 0 !== nonIdlePendingLanes ? nextLanes = getHighestPriorityLanes(nonIdlePendingLanes) : 0 !== pingedLanes ? nextLanes = getHighestPriorityLanes(pingedLanes) : rootHasPendingCommit || (rootHasPendingCommit = pendingLanes & ~root2, 0 !== rootHasPendingCommit && (nextLanes = getHighestPriorityLanes(rootHasPendingCommit))));
        return 0 === nextLanes ? 0 : 0 !== wipLanes && wipLanes !== nextLanes && 0 === (wipLanes & suspendedLanes) && (suspendedLanes = nextLanes & -nextLanes, rootHasPendingCommit = wipLanes & -wipLanes, suspendedLanes >= rootHasPendingCommit || 32 === suspendedLanes && 0 !== (rootHasPendingCommit & 4194048)) ? wipLanes : nextLanes;
      }
      function checkIfRootIsPrerendering(root2, renderLanes2) {
        return 0 === (root2.pendingLanes & ~(root2.suspendedLanes & ~root2.pingedLanes) & renderLanes2);
      }
      function getEntangledLanes(root2, renderLanes2) {
        0 !== (renderLanes2 & 8) && (renderLanes2 |= renderLanes2 & 32);
        var allEntangledLanes = root2.entangledLanes;
        if (0 !== allEntangledLanes)
          for (root2 = root2.entanglements, allEntangledLanes &= renderLanes2; 0 < allEntangledLanes; ) {
            var index$4 = 31 - clz32(allEntangledLanes), lane = 1 << index$4;
            renderLanes2 |= root2[index$4];
            allEntangledLanes &= ~lane;
          }
        return renderLanes2;
      }
      function computeExpirationTime(lane, currentTime) {
        switch (lane) {
          case 1:
          case 2:
          case 4:
          case 8:
          case 64:
            return currentTime + 250;
          case 16:
          case 32:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
            return currentTime + 5e3;
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
            return -1;
          case 67108864:
          case 134217728:
          case 268435456:
          case 536870912:
          case 1073741824:
            return -1;
          default:
            return -1;
        }
      }
      function claimNextRetryLane() {
        var lane = nextRetryLane;
        nextRetryLane <<= 1;
        0 === (nextRetryLane & 62914560) && (nextRetryLane = 4194304);
        return lane;
      }
      function createLaneMap(initial) {
        for (var laneMap = [], i = 0; 31 > i; i++) laneMap.push(initial);
        return laneMap;
      }
      function markRootUpdated$1(root2, updateLane) {
        root2.pendingLanes |= updateLane;
        268435456 !== updateLane && (root2.suspendedLanes = 0, root2.pingedLanes = 0, root2.warmLanes = 0);
      }
      function markRootFinished(root2, finishedLanes, remainingLanes, spawnedLane, updatedLanes, suspendedRetryLanes) {
        var previouslyPendingLanes = root2.pendingLanes;
        root2.pendingLanes = remainingLanes;
        root2.suspendedLanes = 0;
        root2.pingedLanes = 0;
        root2.warmLanes = 0;
        root2.expiredLanes &= remainingLanes;
        root2.entangledLanes &= remainingLanes;
        root2.errorRecoveryDisabledLanes &= remainingLanes;
        root2.shellSuspendCounter = 0;
        var entanglements = root2.entanglements, expirationTimes = root2.expirationTimes, hiddenUpdates = root2.hiddenUpdates;
        for (remainingLanes = previouslyPendingLanes & ~remainingLanes; 0 < remainingLanes; ) {
          var index$7 = 31 - clz32(remainingLanes), lane = 1 << index$7;
          entanglements[index$7] = 0;
          expirationTimes[index$7] = -1;
          var hiddenUpdatesForLane = hiddenUpdates[index$7];
          if (null !== hiddenUpdatesForLane)
            for (hiddenUpdates[index$7] = null, index$7 = 0; index$7 < hiddenUpdatesForLane.length; index$7++) {
              var update = hiddenUpdatesForLane[index$7];
              null !== update && (update.lane &= -536870913);
            }
          remainingLanes &= ~lane;
        }
        0 !== spawnedLane && markSpawnedDeferredLane(root2, spawnedLane, 0);
        0 !== suspendedRetryLanes && 0 === updatedLanes && 0 !== root2.tag && (root2.suspendedLanes |= suspendedRetryLanes & ~(previouslyPendingLanes & ~finishedLanes));
      }
      function markSpawnedDeferredLane(root2, spawnedLane, entangledLanes) {
        root2.pendingLanes |= spawnedLane;
        root2.suspendedLanes &= ~spawnedLane;
        var spawnedLaneIndex = 31 - clz32(spawnedLane);
        root2.entangledLanes |= spawnedLane;
        root2.entanglements[spawnedLaneIndex] = root2.entanglements[spawnedLaneIndex] | 1073741824 | entangledLanes & 261930;
      }
      function markRootEntangled(root2, entangledLanes) {
        var rootEntangledLanes = root2.entangledLanes |= entangledLanes;
        for (root2 = root2.entanglements; rootEntangledLanes; ) {
          var index$8 = 31 - clz32(rootEntangledLanes), lane = 1 << index$8;
          lane & entangledLanes | root2[index$8] & entangledLanes && (root2[index$8] |= entangledLanes);
          rootEntangledLanes &= ~lane;
        }
      }
      function getBumpedLaneForHydration(root2, renderLanes2) {
        var renderLane = renderLanes2 & -renderLanes2;
        renderLane = 0 !== (renderLane & 42) ? 1 : getBumpedLaneForHydrationByLane(renderLane);
        return 0 !== (renderLane & (root2.suspendedLanes | renderLanes2)) ? 0 : renderLane;
      }
      function getBumpedLaneForHydrationByLane(lane) {
        switch (lane) {
          case 2:
            lane = 1;
            break;
          case 8:
            lane = 4;
            break;
          case 32:
            lane = 16;
            break;
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
            lane = 128;
            break;
          case 268435456:
            lane = 134217728;
            break;
          default:
            lane = 0;
        }
        return lane;
      }
      function lanesToEventPriority(lanes) {
        lanes &= -lanes;
        return 2 < lanes ? 8 < lanes ? 0 !== (lanes & 134217727) ? 32 : 268435456 : 8 : 2;
      }
      function resolveUpdatePriority() {
        var updatePriority = ReactDOMSharedInternals.p;
        if (0 !== updatePriority) return updatePriority;
        updatePriority = window.event;
        return void 0 === updatePriority ? 32 : getEventPriority(updatePriority.type);
      }
      function runWithPriority(priority, fn) {
        var previousPriority = ReactDOMSharedInternals.p;
        try {
          return ReactDOMSharedInternals.p = priority, fn();
        } finally {
          ReactDOMSharedInternals.p = previousPriority;
        }
      }
      var randomKey = Math.random().toString(36).slice(2);
      var internalInstanceKey = "__reactFiber$" + randomKey;
      var internalPropsKey = "__reactProps$" + randomKey;
      var internalContainerInstanceKey = "__reactContainer$" + randomKey;
      var internalEventHandlersKey = "__reactEvents$" + randomKey;
      var internalEventHandlerListenersKey = "__reactListeners$" + randomKey;
      var internalEventHandlesSetKey = "__reactHandles$" + randomKey;
      var internalRootNodeResourcesKey = "__reactResources$" + randomKey;
      var internalHoistableMarker = "__reactMarker$" + randomKey;
      var internalLoadPendingKey = "__reactLoad$" + randomKey;
      function detachDeletedInstance(node) {
        delete node[internalInstanceKey];
        delete node[internalPropsKey];
        delete node[internalEventHandlerListenersKey];
        delete node[internalEventHandlesSetKey];
      }
      function getClosestInstanceFromNode(targetNode) {
        var targetInst;
        if (targetInst = targetNode[internalInstanceKey]) return targetInst;
        for (var parentNode = targetNode.parentNode; parentNode; ) {
          if (targetInst = parentNode[internalContainerInstanceKey] || parentNode[internalInstanceKey]) {
            parentNode = targetInst.alternate;
            if (null !== targetInst.child || null !== parentNode && null !== parentNode.child)
              for (targetNode = getParentHydrationBoundary(targetNode); null !== targetNode; ) {
                if (parentNode = targetNode[internalInstanceKey]) return parentNode;
                targetNode = getParentHydrationBoundary(targetNode);
              }
            return targetInst;
          }
          targetNode = parentNode;
          parentNode = targetNode.parentNode;
        }
        return null;
      }
      function getInstanceFromNode(node) {
        if (node = node[internalInstanceKey] || node[internalContainerInstanceKey]) {
          var tag = node.tag;
          if (5 === tag || 6 === tag || 13 === tag || 31 === tag || 26 === tag || 27 === tag || 3 === tag)
            return node;
        }
        return null;
      }
      function getNodeFromInstance(inst) {
        var tag = inst.tag;
        if (5 === tag || 26 === tag || 27 === tag || 6 === tag) return inst.stateNode;
        throw Error(formatProdErrorMessage(33));
      }
      function getResourcesFromRoot(root2) {
        var resources = root2[internalRootNodeResourcesKey];
        resources || (resources = root2[internalRootNodeResourcesKey] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() });
        return resources;
      }
      function markNodeAsHoistable(node) {
        node[internalHoistableMarker] = true;
      }
      function clearPendingLoadOnNode(node) {
        node[internalLoadPendingKey] = void 0;
      }
      var allNativeEvents = /* @__PURE__ */ new Set();
      var registrationNameDependencies = {};
      function registerTwoPhaseEvent(registrationName, dependencies) {
        registerDirectEvent(registrationName, dependencies);
        registerDirectEvent(registrationName + "Capture", dependencies);
      }
      function registerDirectEvent(registrationName, dependencies) {
        registrationNameDependencies[registrationName] = dependencies;
        for (registrationName = 0; registrationName < dependencies.length; registrationName++)
          allNativeEvents.add(dependencies[registrationName]);
      }
      var VALID_ATTRIBUTE_NAME_REGEX = RegExp(
        "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
      );
      var illegalAttributeNameCache = {};
      var validatedAttributeNameCache = {};
      function isAttributeNameSafe(attributeName) {
        if (hasOwnProperty.call(validatedAttributeNameCache, attributeName))
          return true;
        if (hasOwnProperty.call(illegalAttributeNameCache, attributeName)) return false;
        if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName))
          return validatedAttributeNameCache[attributeName] = true;
        illegalAttributeNameCache[attributeName] = true;
        return false;
      }
      var viewTransitionMutationContext = false;
      function pushMutationContext() {
        var prev = viewTransitionMutationContext;
        viewTransitionMutationContext = false;
        return prev;
      }
      function setValueForAttribute(node, name, value) {
        if (isAttributeNameSafe(name))
          if (null === value) node.removeAttribute(name);
          else {
            switch (typeof value) {
              case "undefined":
              case "function":
              case "symbol":
                node.removeAttribute(name);
                return;
              case "boolean":
                var prefix$10 = name.toLowerCase().slice(0, 5);
                if ("data-" !== prefix$10 && "aria-" !== prefix$10) {
                  node.removeAttribute(name);
                  return;
                }
            }
            node.setAttribute(name, value);
          }
      }
      function setValueForKnownAttribute(node, name, value) {
        if (null === value) node.removeAttribute(name);
        else {
          switch (typeof value) {
            case "undefined":
            case "function":
            case "symbol":
            case "boolean":
              node.removeAttribute(name);
              return;
          }
          node.setAttribute(name, value);
        }
      }
      function setValueForNamespacedAttribute(node, namespace, name, value) {
        if (null === value) node.removeAttribute(name);
        else {
          switch (typeof value) {
            case "undefined":
            case "function":
            case "symbol":
            case "boolean":
              node.removeAttribute(name);
              return;
          }
          node.setAttributeNS(namespace, name, value);
        }
      }
      function getToStringValue(value) {
        switch (typeof value) {
          case "bigint":
          case "boolean":
          case "number":
          case "string":
          case "undefined":
            return value;
          case "object":
            return value;
          default:
            return "";
        }
      }
      function isCheckable(elem) {
        var type = elem.type;
        return (elem = elem.nodeName) && "input" === elem.toLowerCase() && ("checkbox" === type || "radio" === type);
      }
      function trackValueOnNode(node, valueField, currentValue) {
        var descriptor = Object.getOwnPropertyDescriptor(
          node.constructor.prototype,
          valueField
        );
        if (!node.hasOwnProperty(valueField) && "undefined" !== typeof descriptor && "function" === typeof descriptor.get && "function" === typeof descriptor.set) {
          var get = descriptor.get, set = descriptor.set;
          Object.defineProperty(node, valueField, {
            configurable: true,
            get: function() {
              return get.call(this);
            },
            set: function(value) {
              currentValue = "" + value;
              set.call(this, value);
            }
          });
          Object.defineProperty(node, valueField, {
            enumerable: descriptor.enumerable
          });
          return {
            getValue: function() {
              return currentValue;
            },
            setValue: function(value) {
              currentValue = "" + value;
            },
            stopTracking: function() {
              node._valueTracker = null;
              delete node[valueField];
            }
          };
        }
      }
      function track(node) {
        if (!node._valueTracker) {
          var valueField = isCheckable(node) ? "checked" : "value";
          node._valueTracker = trackValueOnNode(
            node,
            valueField,
            "" + node[valueField]
          );
        }
      }
      function updateValueIfChanged(node) {
        if (!node) return false;
        var tracker = node._valueTracker;
        if (!tracker) return true;
        var lastValue = tracker.getValue();
        var value = "";
        node && (value = isCheckable(node) ? node.checked ? "true" : "false" : node.value);
        node = value;
        return node !== lastValue ? (tracker.setValue(node), true) : false;
      }
      var escapeSelectorAttributeValueInsideDoubleQuotesRegex = /[\n"\\]/g;
      function escapeSelectorAttributeValueInsideDoubleQuotes(value) {
        return value.replace(
          escapeSelectorAttributeValueInsideDoubleQuotesRegex,
          function(ch) {
            return "\\" + ch.charCodeAt(0).toString(16) + " ";
          }
        );
      }
      function updateInput(element, value, defaultValue, lastDefaultValue, checked, defaultChecked, type, name) {
        element.name = "";
        null != type && "function" !== typeof type && "symbol" !== typeof type && "boolean" !== typeof type ? element.type = type : element.removeAttribute("type");
        if (null != value)
          if ("number" === type) {
            if (0 === value && "" === element.value || element.value != value)
              element.value = "" + getToStringValue(value);
          } else
            element.value !== "" + getToStringValue(value) && (element.value = "" + getToStringValue(value));
        else
          "submit" !== type && "reset" !== type || element.removeAttribute("value");
        null != value ? "number" === type && element.value == value ? setDefaultValue(element, getToStringValue(element.value)) : setDefaultValue(element, getToStringValue(value)) : null != defaultValue ? setDefaultValue(element, getToStringValue(defaultValue)) : null != lastDefaultValue && element.removeAttribute("value");
        null == checked && null != defaultChecked && (element.defaultChecked = !!defaultChecked);
        null != checked && (element.checked = checked && "function" !== typeof checked && "symbol" !== typeof checked);
        null != name && "function" !== typeof name && "symbol" !== typeof name && "boolean" !== typeof name ? element.name = "" + getToStringValue(name) : element.removeAttribute("name");
      }
      function initInput(element, value, defaultValue, checked, defaultChecked, type, name, isHydrating2) {
        null != type && "function" !== typeof type && "symbol" !== typeof type && "boolean" !== typeof type && (element.type = type);
        if (null != value || null != defaultValue) {
          if (!("submit" !== type && "reset" !== type || void 0 !== value && null !== value)) {
            track(element);
            return;
          }
          defaultValue = null != defaultValue ? "" + getToStringValue(defaultValue) : "";
          value = null != value ? "" + getToStringValue(value) : defaultValue;
          isHydrating2 || value === element.value || (element.value = value);
          element.defaultValue = value;
        }
        checked = null != checked ? checked : defaultChecked;
        checked = "function" !== typeof checked && "symbol" !== typeof checked && !!checked;
        element.checked = isHydrating2 ? element.checked : !!checked;
        element.defaultChecked = !!checked;
        null != name && "function" !== typeof name && "symbol" !== typeof name && "boolean" !== typeof name && (element.name = name);
        track(element);
      }
      function setDefaultValue(node, value) {
        node.defaultValue !== "" + value && (node.defaultValue = "" + value);
      }
      function updateOptions(node, multiple, propValue, setDefaultSelected) {
        node = node.options;
        if (multiple) {
          multiple = {};
          for (var i = 0; i < propValue.length; i++)
            multiple["$" + propValue[i]] = true;
          for (propValue = 0; propValue < node.length; propValue++)
            i = multiple.hasOwnProperty("$" + node[propValue].value), node[propValue].selected !== i && (node[propValue].selected = i), i && setDefaultSelected && (node[propValue].defaultSelected = true);
        } else {
          propValue = "" + getToStringValue(propValue);
          multiple = null;
          for (i = 0; i < node.length; i++) {
            if (node[i].value === propValue) {
              node[i].selected = true;
              setDefaultSelected && (node[i].defaultSelected = true);
              return;
            }
            null !== multiple || node[i].disabled || (multiple = node[i]);
          }
          null !== multiple && (multiple.selected = true);
        }
      }
      function updateTextarea(element, value, defaultValue) {
        if (null != value && (value = "" + getToStringValue(value), value !== element.value && (element.value = value), null == defaultValue)) {
          element.defaultValue !== value && (element.defaultValue = value);
          return;
        }
        element.defaultValue = null != defaultValue ? "" + getToStringValue(defaultValue) : "";
      }
      function initTextarea(element, value, defaultValue, children) {
        if (null == value) {
          if (null != children) {
            if (null != defaultValue) throw Error(formatProdErrorMessage(92));
            if (isArrayImpl(children)) {
              if (1 < children.length) throw Error(formatProdErrorMessage(93));
              children = children[0];
            }
            defaultValue = children;
          }
          null == defaultValue && (defaultValue = "");
          value = defaultValue;
        }
        defaultValue = getToStringValue(value);
        element.defaultValue = defaultValue;
        children = element.textContent;
        children === defaultValue && "" !== children && null !== children && (element.value = children);
        track(element);
      }
      function setTextContent(node, text) {
        if (text) {
          var firstChild = node.firstChild;
          if (firstChild && firstChild === node.lastChild && 3 === firstChild.nodeType) {
            firstChild.nodeValue = text;
            return;
          }
        }
        node.textContent = text;
      }
      var unitlessNumbers = new Set(
        "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
          " "
        )
      );
      function setValueForStyle(style2, styleName, value) {
        var isCustomProperty = 0 === styleName.indexOf("--");
        null == value || "boolean" === typeof value || "" === value ? isCustomProperty ? style2.setProperty(styleName, "") : "float" === styleName ? style2.cssFloat = "" : style2[styleName] = "" : isCustomProperty ? style2.setProperty(styleName, value) : "number" !== typeof value || 0 === value || unitlessNumbers.has(styleName) ? "float" === styleName ? style2.cssFloat = value : style2[styleName] = ("" + value).trim() : style2[styleName] = value + "px";
      }
      function setValueForStyles(node, styles, prevStyles) {
        if (null != styles && "object" !== typeof styles)
          throw Error(formatProdErrorMessage(62));
        node = node.style;
        if (null != prevStyles) {
          for (var styleName in prevStyles)
            !prevStyles.hasOwnProperty(styleName) || null != styles && styles.hasOwnProperty(styleName) || (0 === styleName.indexOf("--") ? node.setProperty(styleName, "") : "float" === styleName ? node.cssFloat = "" : node[styleName] = "", viewTransitionMutationContext = true);
          for (var styleName$16 in styles)
            styleName = styles[styleName$16], styles.hasOwnProperty(styleName$16) && prevStyles[styleName$16] !== styleName && (setValueForStyle(node, styleName$16, styleName), viewTransitionMutationContext = true);
        } else
          for (var styleName$17 in styles)
            styles.hasOwnProperty(styleName$17) && setValueForStyle(node, styleName$17, styles[styleName$17]);
      }
      function isCustomElement(tagName) {
        if (-1 === tagName.indexOf("-")) return false;
        switch (tagName) {
          case "annotation-xml":
          case "color-profile":
          case "font-face":
          case "font-face-src":
          case "font-face-uri":
          case "font-face-format":
          case "font-face-name":
          case "missing-glyph":
            return false;
          default:
            return true;
        }
      }
      var aliases = /* @__PURE__ */ new Map([
        ["acceptCharset", "accept-charset"],
        ["htmlFor", "for"],
        ["httpEquiv", "http-equiv"],
        ["crossOrigin", "crossorigin"],
        ["accentHeight", "accent-height"],
        ["alignmentBaseline", "alignment-baseline"],
        ["arabicForm", "arabic-form"],
        ["baselineShift", "baseline-shift"],
        ["capHeight", "cap-height"],
        ["clipPath", "clip-path"],
        ["clipRule", "clip-rule"],
        ["colorInterpolation", "color-interpolation"],
        ["colorInterpolationFilters", "color-interpolation-filters"],
        ["colorProfile", "color-profile"],
        ["colorRendering", "color-rendering"],
        ["dominantBaseline", "dominant-baseline"],
        ["enableBackground", "enable-background"],
        ["fillOpacity", "fill-opacity"],
        ["fillRule", "fill-rule"],
        ["floodColor", "flood-color"],
        ["floodOpacity", "flood-opacity"],
        ["fontFamily", "font-family"],
        ["fontSize", "font-size"],
        ["fontSizeAdjust", "font-size-adjust"],
        ["fontStretch", "font-stretch"],
        ["fontStyle", "font-style"],
        ["fontVariant", "font-variant"],
        ["fontWeight", "font-weight"],
        ["glyphName", "glyph-name"],
        ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
        ["glyphOrientationVertical", "glyph-orientation-vertical"],
        ["horizAdvX", "horiz-adv-x"],
        ["horizOriginX", "horiz-origin-x"],
        ["imageRendering", "image-rendering"],
        ["letterSpacing", "letter-spacing"],
        ["lightingColor", "lighting-color"],
        ["markerEnd", "marker-end"],
        ["markerMid", "marker-mid"],
        ["markerStart", "marker-start"],
        ["maskType", "mask-type"],
        ["overlinePosition", "overline-position"],
        ["overlineThickness", "overline-thickness"],
        ["paintOrder", "paint-order"],
        ["panose-1", "panose-1"],
        ["pointerEvents", "pointer-events"],
        ["renderingIntent", "rendering-intent"],
        ["shapeRendering", "shape-rendering"],
        ["stopColor", "stop-color"],
        ["stopOpacity", "stop-opacity"],
        ["strikethroughPosition", "strikethrough-position"],
        ["strikethroughThickness", "strikethrough-thickness"],
        ["strokeDasharray", "stroke-dasharray"],
        ["strokeDashoffset", "stroke-dashoffset"],
        ["strokeLinecap", "stroke-linecap"],
        ["strokeLinejoin", "stroke-linejoin"],
        ["strokeMiterlimit", "stroke-miterlimit"],
        ["strokeOpacity", "stroke-opacity"],
        ["strokeWidth", "stroke-width"],
        ["textAnchor", "text-anchor"],
        ["textDecoration", "text-decoration"],
        ["textRendering", "text-rendering"],
        ["transformOrigin", "transform-origin"],
        ["underlinePosition", "underline-position"],
        ["underlineThickness", "underline-thickness"],
        ["unicodeBidi", "unicode-bidi"],
        ["unicodeRange", "unicode-range"],
        ["unitsPerEm", "units-per-em"],
        ["vAlphabetic", "v-alphabetic"],
        ["vHanging", "v-hanging"],
        ["vIdeographic", "v-ideographic"],
        ["vMathematical", "v-mathematical"],
        ["vectorEffect", "vector-effect"],
        ["vertAdvY", "vert-adv-y"],
        ["vertOriginX", "vert-origin-x"],
        ["vertOriginY", "vert-origin-y"],
        ["wordSpacing", "word-spacing"],
        ["writingMode", "writing-mode"],
        ["xmlnsXlink", "xmlns:xlink"],
        ["xHeight", "x-height"]
      ]);
      var isJavaScriptProtocol = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
      function sanitizeURL(url) {
        return isJavaScriptProtocol.test("" + url) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : url;
      }
      function noop$1() {
      }
      var currentReplayingEvent = null;
      function getEventTarget(nativeEvent) {
        nativeEvent = nativeEvent.target || nativeEvent.srcElement || window;
        nativeEvent.correspondingUseElement && (nativeEvent = nativeEvent.correspondingUseElement);
        return 3 === nativeEvent.nodeType ? nativeEvent.parentNode : nativeEvent;
      }
      var restoreTarget = null;
      var restoreQueue = null;
      function restoreStateOfTarget(target) {
        var internalInstance = getInstanceFromNode(target);
        if (internalInstance && (target = internalInstance.stateNode)) {
          var props = target[internalPropsKey] || null;
          a: switch (target = internalInstance.stateNode, internalInstance.type) {
            case "input":
              updateInput(
                target,
                props.value,
                props.defaultValue,
                props.defaultValue,
                props.checked,
                props.defaultChecked,
                props.type,
                props.name
              );
              internalInstance = props.name;
              if ("radio" === props.type && null != internalInstance) {
                for (props = target; props.parentNode; ) props = props.parentNode;
                props = props.querySelectorAll(
                  'input[name="' + escapeSelectorAttributeValueInsideDoubleQuotes(
                    "" + internalInstance
                  ) + '"][type="radio"]'
                );
                for (internalInstance = 0; internalInstance < props.length; internalInstance++) {
                  var otherNode = props[internalInstance];
                  if (otherNode !== target && otherNode.form === target.form) {
                    var otherProps = otherNode[internalPropsKey] || null;
                    if (!otherProps) throw Error(formatProdErrorMessage(90));
                    updateInput(
                      otherNode,
                      otherProps.value,
                      otherProps.defaultValue,
                      otherProps.defaultValue,
                      otherProps.checked,
                      otherProps.defaultChecked,
                      otherProps.type,
                      otherProps.name
                    );
                  }
                }
                for (internalInstance = 0; internalInstance < props.length; internalInstance++)
                  otherNode = props[internalInstance], otherNode.form === target.form && updateValueIfChanged(otherNode);
              }
              break a;
            case "textarea":
              updateTextarea(target, props.value, props.defaultValue);
              break a;
            case "select":
              internalInstance = props.value, null != internalInstance && updateOptions(target, !!props.multiple, internalInstance, false);
          }
        }
      }
      var isInsideEventHandler = false;
      function batchedUpdates$1(fn, a, b) {
        if (isInsideEventHandler) return fn(a, b);
        isInsideEventHandler = true;
        try {
          var JSCompiler_inline_result = fn(a);
          return JSCompiler_inline_result;
        } finally {
          if (isInsideEventHandler = false, null !== restoreTarget || null !== restoreQueue) {
            if (flushSyncWork$1(), restoreTarget && (a = restoreTarget, fn = restoreQueue, restoreQueue = restoreTarget = null, restoreStateOfTarget(a), fn))
              for (a = 0; a < fn.length; a++) restoreStateOfTarget(fn[a]);
          }
        }
      }
      function getListener(inst, registrationName) {
        var stateNode = inst.stateNode;
        if (null === stateNode) return null;
        var props = stateNode[internalPropsKey] || null;
        if (null === props) return null;
        stateNode = props[registrationName];
        a: switch (registrationName) {
          case "onClick":
          case "onClickCapture":
          case "onDoubleClick":
          case "onDoubleClickCapture":
          case "onMouseDown":
          case "onMouseDownCapture":
          case "onMouseMove":
          case "onMouseMoveCapture":
          case "onMouseUp":
          case "onMouseUpCapture":
          case "onMouseEnter":
            (props = !props.disabled) || (inst = inst.type, props = !("button" === inst || "input" === inst || "select" === inst || "textarea" === inst));
            inst = !props;
            break a;
          default:
            inst = false;
        }
        if (inst) return null;
        if (stateNode && "function" !== typeof stateNode)
          throw Error(
            formatProdErrorMessage(231, registrationName, typeof stateNode)
          );
        return stateNode;
      }
      var canUseDOM = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement);
      var passiveBrowserEventsSupported = false;
      if (canUseDOM)
        try {
          options = {};
          Object.defineProperty(options, "passive", {
            get: function() {
              passiveBrowserEventsSupported = true;
            }
          });
          window.addEventListener("test", options, options);
          window.removeEventListener("test", options, options);
        } catch (e) {
          passiveBrowserEventsSupported = false;
        }
      var options;
      var root = null;
      var startText = null;
      var fallbackText = null;
      function getData() {
        if (fallbackText) return fallbackText;
        var start, startValue = startText, startLength = startValue.length, end, endValue = "value" in root ? root.value : root.textContent, endLength = endValue.length;
        for (start = 0; start < startLength && startValue[start] === endValue[start]; start++) ;
        var minEnd = startLength - start;
        for (end = 1; end <= minEnd && startValue[startLength - end] === endValue[endLength - end]; end++) ;
        return fallbackText = endValue.slice(start, 1 < end ? 1 - end : void 0);
      }
      function getEventCharCode(nativeEvent) {
        var keyCode = nativeEvent.keyCode;
        "charCode" in nativeEvent ? (nativeEvent = nativeEvent.charCode, 0 === nativeEvent && 13 === keyCode && (nativeEvent = 13)) : nativeEvent = keyCode;
        10 === nativeEvent && (nativeEvent = 13);
        return 32 <= nativeEvent || 13 === nativeEvent ? nativeEvent : 0;
      }
      function functionThatReturnsTrue() {
        return true;
      }
      function functionThatReturnsFalse() {
        return false;
      }
      function createSyntheticEvent(Interface) {
        function SyntheticBaseEvent(reactName, reactEventType, targetInst, nativeEvent, nativeEventTarget) {
          this._reactName = reactName;
          this._targetInst = targetInst;
          this.type = reactEventType;
          this.nativeEvent = nativeEvent;
          this.target = nativeEventTarget;
          this.currentTarget = null;
          for (var propName in Interface)
            Interface.hasOwnProperty(propName) && (reactName = Interface[propName], this[propName] = reactName ? reactName(nativeEvent) : nativeEvent[propName]);
          this.isDefaultPrevented = (null != nativeEvent.defaultPrevented ? nativeEvent.defaultPrevented : false === nativeEvent.returnValue) ? functionThatReturnsTrue : functionThatReturnsFalse;
          this.isPropagationStopped = functionThatReturnsFalse;
          return this;
        }
        assign(SyntheticBaseEvent.prototype, {
          preventDefault: function() {
            this.defaultPrevented = true;
            var event = this.nativeEvent;
            event && (event.preventDefault ? event.preventDefault() : "unknown" !== typeof event.returnValue && (event.returnValue = false), this.isDefaultPrevented = functionThatReturnsTrue);
          },
          stopPropagation: function() {
            var event = this.nativeEvent;
            event && (event.stopPropagation ? event.stopPropagation() : "unknown" !== typeof event.cancelBubble && (event.cancelBubble = true), this.isPropagationStopped = functionThatReturnsTrue);
          },
          persist: function() {
          },
          isPersistent: functionThatReturnsTrue
        });
        return SyntheticBaseEvent;
      }
      var EventInterface = {
        eventPhase: 0,
        bubbles: 0,
        cancelable: 0,
        timeStamp: function(event) {
          return event.timeStamp || Date.now();
        },
        defaultPrevented: 0,
        isTrusted: 0
      };
      var SyntheticEvent = createSyntheticEvent(EventInterface);
      var UIEventInterface = assign({}, EventInterface, { view: 0, detail: 0 });
      var SyntheticUIEvent = createSyntheticEvent(UIEventInterface);
      var lastMovementX;
      var lastMovementY;
      var lastMouseEvent;
      var MouseEventInterface = assign({}, UIEventInterface, {
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0,
        pageX: 0,
        pageY: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        getModifierState: getEventModifierState,
        button: 0,
        buttons: 0,
        relatedTarget: function(event) {
          return void 0 === event.relatedTarget ? event.fromElement === event.srcElement ? event.toElement : event.fromElement : event.relatedTarget;
        },
        movementX: function(event) {
          if ("movementX" in event) return event.movementX;
          event !== lastMouseEvent && (lastMouseEvent && "mousemove" === event.type ? (lastMovementX = event.screenX - lastMouseEvent.screenX, lastMovementY = event.screenY - lastMouseEvent.screenY) : lastMovementY = lastMovementX = 0, lastMouseEvent = event);
          return lastMovementX;
        },
        movementY: function(event) {
          return "movementY" in event ? event.movementY : lastMovementY;
        }
      });
      var SyntheticMouseEvent = createSyntheticEvent(MouseEventInterface);
      var DragEventInterface = assign({}, MouseEventInterface, { dataTransfer: 0 });
      var SyntheticDragEvent = createSyntheticEvent(DragEventInterface);
      var FocusEventInterface = assign({}, UIEventInterface, { relatedTarget: 0 });
      var SyntheticFocusEvent = createSyntheticEvent(FocusEventInterface);
      var AnimationEventInterface = assign({}, EventInterface, {
        animationName: 0,
        elapsedTime: 0,
        pseudoElement: 0
      });
      var SyntheticAnimationEvent = createSyntheticEvent(AnimationEventInterface);
      var ClipboardEventInterface = assign({}, EventInterface, {
        clipboardData: function(event) {
          return "clipboardData" in event ? event.clipboardData : window.clipboardData;
        }
      });
      var SyntheticClipboardEvent = createSyntheticEvent(ClipboardEventInterface);
      var CompositionEventInterface = assign({}, EventInterface, { data: 0 });
      var SyntheticCompositionEvent = createSyntheticEvent(CompositionEventInterface);
      var normalizeKey = {
        Esc: "Escape",
        Spacebar: " ",
        Left: "ArrowLeft",
        Up: "ArrowUp",
        Right: "ArrowRight",
        Down: "ArrowDown",
        Del: "Delete",
        Win: "OS",
        Menu: "ContextMenu",
        Apps: "ContextMenu",
        Scroll: "ScrollLock",
        MozPrintableKey: "Unidentified"
      };
      var translateToKey = {
        8: "Backspace",
        9: "Tab",
        12: "Clear",
        13: "Enter",
        16: "Shift",
        17: "Control",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Escape",
        32: " ",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "ArrowLeft",
        38: "ArrowUp",
        39: "ArrowRight",
        40: "ArrowDown",
        45: "Insert",
        46: "Delete",
        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12",
        144: "NumLock",
        145: "ScrollLock",
        224: "Meta"
      };
      var modifierKeyToProp = {
        Alt: "altKey",
        Control: "ctrlKey",
        Meta: "metaKey",
        Shift: "shiftKey"
      };
      function modifierStateGetter(keyArg) {
        var nativeEvent = this.nativeEvent;
        return nativeEvent.getModifierState ? nativeEvent.getModifierState(keyArg) : (keyArg = modifierKeyToProp[keyArg]) ? !!nativeEvent[keyArg] : false;
      }
      function getEventModifierState() {
        return modifierStateGetter;
      }
      var KeyboardEventInterface = assign({}, UIEventInterface, {
        key: function(nativeEvent) {
          if (nativeEvent.key) {
            var key = normalizeKey[nativeEvent.key] || nativeEvent.key;
            if ("Unidentified" !== key) return key;
          }
          return "keypress" === nativeEvent.type ? (nativeEvent = getEventCharCode(nativeEvent), 13 === nativeEvent ? "Enter" : String.fromCharCode(nativeEvent)) : "keydown" === nativeEvent.type || "keyup" === nativeEvent.type ? translateToKey[nativeEvent.keyCode] || "Unidentified" : "";
        },
        code: 0,
        location: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        repeat: 0,
        locale: 0,
        getModifierState: getEventModifierState,
        charCode: function(event) {
          return "keypress" === event.type ? getEventCharCode(event) : 0;
        },
        keyCode: function(event) {
          return "keydown" === event.type || "keyup" === event.type ? event.keyCode : 0;
        },
        which: function(event) {
          return "keypress" === event.type ? getEventCharCode(event) : "keydown" === event.type || "keyup" === event.type ? event.keyCode : 0;
        }
      });
      var SyntheticKeyboardEvent = createSyntheticEvent(KeyboardEventInterface);
      var PointerEventInterface = assign({}, MouseEventInterface, {
        pointerId: 0,
        width: 0,
        height: 0,
        pressure: 0,
        tangentialPressure: 0,
        tiltX: 0,
        tiltY: 0,
        twist: 0,
        pointerType: 0,
        isPrimary: 0
      });
      var SyntheticPointerEvent = createSyntheticEvent(PointerEventInterface);
      var SubmitEventInterface = assign({}, EventInterface, { submitter: 0 });
      var SyntheticSubmitEvent = createSyntheticEvent(SubmitEventInterface);
      var TouchEventInterface = assign({}, UIEventInterface, {
        touches: 0,
        targetTouches: 0,
        changedTouches: 0,
        altKey: 0,
        metaKey: 0,
        ctrlKey: 0,
        shiftKey: 0,
        getModifierState: getEventModifierState
      });
      var SyntheticTouchEvent = createSyntheticEvent(TouchEventInterface);
      var TransitionEventInterface = assign({}, EventInterface, {
        propertyName: 0,
        elapsedTime: 0,
        pseudoElement: 0
      });
      var SyntheticTransitionEvent = createSyntheticEvent(TransitionEventInterface);
      var WheelEventInterface = assign({}, MouseEventInterface, {
        deltaX: function(event) {
          return "deltaX" in event ? event.deltaX : "wheelDeltaX" in event ? -event.wheelDeltaX : 0;
        },
        deltaY: function(event) {
          return "deltaY" in event ? event.deltaY : "wheelDeltaY" in event ? -event.wheelDeltaY : "wheelDelta" in event ? -event.wheelDelta : 0;
        },
        deltaZ: 0,
        deltaMode: 0
      });
      var SyntheticWheelEvent = createSyntheticEvent(WheelEventInterface);
      var ToggleEventInterface = assign({}, EventInterface, {
        newState: 0,
        oldState: 0,
        source: 0
      });
      var SyntheticToggleEvent = createSyntheticEvent(ToggleEventInterface);
      var END_KEYCODES = [9, 13, 27, 32];
      var canUseCompositionEvent = canUseDOM && "CompositionEvent" in window;
      var documentMode = null;
      canUseDOM && "documentMode" in document && (documentMode = document.documentMode);
      var canUseTextInputEvent = canUseDOM && "TextEvent" in window && !documentMode;
      var useFallbackCompositionData = canUseDOM && (!canUseCompositionEvent || documentMode && 8 < documentMode && 11 >= documentMode);
      var SPACEBAR_CHAR = String.fromCharCode(32);
      var hasSpaceKeypress = false;
      function isFallbackCompositionEnd(domEventName, nativeEvent) {
        switch (domEventName) {
          case "keyup":
            return -1 !== END_KEYCODES.indexOf(nativeEvent.keyCode);
          case "keydown":
            return 229 !== nativeEvent.keyCode;
          case "keypress":
          case "mousedown":
          case "focusout":
            return true;
          default:
            return false;
        }
      }
      function getDataFromCustomEvent(nativeEvent) {
        nativeEvent = nativeEvent.detail;
        return "object" === typeof nativeEvent && "data" in nativeEvent ? nativeEvent.data : null;
      }
      var isComposing = false;
      function getNativeBeforeInputChars(domEventName, nativeEvent) {
        switch (domEventName) {
          case "compositionend":
            return getDataFromCustomEvent(nativeEvent);
          case "keypress":
            if (32 !== nativeEvent.which) return null;
            hasSpaceKeypress = true;
            return SPACEBAR_CHAR;
          case "textInput":
            return domEventName = nativeEvent.data, domEventName === SPACEBAR_CHAR && hasSpaceKeypress ? null : domEventName;
          default:
            return null;
        }
      }
      function getFallbackBeforeInputChars(domEventName, nativeEvent) {
        if (isComposing)
          return "compositionend" === domEventName || !canUseCompositionEvent && isFallbackCompositionEnd(domEventName, nativeEvent) ? (domEventName = getData(), fallbackText = startText = root = null, isComposing = false, domEventName) : null;
        switch (domEventName) {
          case "paste":
            return null;
          case "keypress":
            if (!(nativeEvent.ctrlKey || nativeEvent.altKey || nativeEvent.metaKey) || nativeEvent.ctrlKey && nativeEvent.altKey) {
              if (nativeEvent.char && 1 < nativeEvent.char.length)
                return nativeEvent.char;
              if (nativeEvent.which) return String.fromCharCode(nativeEvent.which);
            }
            return null;
          case "compositionend":
            return useFallbackCompositionData && "ko" !== nativeEvent.locale ? null : nativeEvent.data;
          default:
            return null;
        }
      }
      var supportedInputTypes = {
        color: true,
        date: true,
        datetime: true,
        "datetime-local": true,
        email: true,
        month: true,
        number: true,
        password: true,
        range: true,
        search: true,
        tel: true,
        text: true,
        time: true,
        url: true,
        week: true
      };
      function isTextInputElement(elem) {
        var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
        return "input" === nodeName ? !!supportedInputTypes[elem.type] : "textarea" === nodeName ? true : false;
      }
      function createAndAccumulateChangeEvent(dispatchQueue, inst, nativeEvent, target) {
        restoreTarget ? restoreQueue ? restoreQueue.push(target) : restoreQueue = [target] : restoreTarget = target;
        inst = accumulateTwoPhaseListeners(inst, "onChange");
        0 < inst.length && (nativeEvent = new SyntheticEvent(
          "onChange",
          "change",
          null,
          nativeEvent,
          target
        ), dispatchQueue.push({ event: nativeEvent, listeners: inst }));
      }
      var activeElement$1 = null;
      var activeElementInst$1 = null;
      function runEventInBatch(dispatchQueue) {
        processDispatchQueue(dispatchQueue, 0);
      }
      function getInstIfValueChanged(targetInst) {
        var targetNode = getNodeFromInstance(targetInst);
        if (updateValueIfChanged(targetNode)) return targetInst;
      }
      function getTargetInstForChangeEvent(domEventName, targetInst) {
        if ("change" === domEventName) return targetInst;
      }
      var isInputEventSupported = false;
      if (canUseDOM) {
        if (canUseDOM) {
          isSupported$jscomp$inline_474 = "oninput" in document;
          if (!isSupported$jscomp$inline_474) {
            element$jscomp$inline_475 = document.createElement("div");
            element$jscomp$inline_475.setAttribute("oninput", "return;");
            isSupported$jscomp$inline_474 = "function" === typeof element$jscomp$inline_475.oninput;
          }
          JSCompiler_inline_result$jscomp$318 = isSupported$jscomp$inline_474;
        } else JSCompiler_inline_result$jscomp$318 = false;
        isInputEventSupported = JSCompiler_inline_result$jscomp$318 && (!document.documentMode || 9 < document.documentMode);
      }
      var JSCompiler_inline_result$jscomp$318;
      var isSupported$jscomp$inline_474;
      var element$jscomp$inline_475;
      function stopWatchingForValueChange() {
        activeElement$1 && (activeElement$1.detachEvent("onpropertychange", handlePropertyChange), activeElementInst$1 = activeElement$1 = null);
      }
      function handlePropertyChange(nativeEvent) {
        if ("value" === nativeEvent.propertyName && getInstIfValueChanged(activeElementInst$1)) {
          var dispatchQueue = [];
          createAndAccumulateChangeEvent(
            dispatchQueue,
            activeElementInst$1,
            nativeEvent,
            getEventTarget(nativeEvent)
          );
          batchedUpdates$1(runEventInBatch, dispatchQueue);
        }
      }
      function handleEventsForInputEventPolyfill(domEventName, target, targetInst) {
        "focusin" === domEventName ? (stopWatchingForValueChange(), activeElement$1 = target, activeElementInst$1 = targetInst, activeElement$1.attachEvent("onpropertychange", handlePropertyChange)) : "focusout" === domEventName && stopWatchingForValueChange();
      }
      function getTargetInstForInputEventPolyfill(domEventName) {
        if ("selectionchange" === domEventName || "keyup" === domEventName || "keydown" === domEventName)
          return getInstIfValueChanged(activeElementInst$1);
      }
      function getTargetInstForClickEvent(domEventName, targetInst) {
        if ("click" === domEventName) return getInstIfValueChanged(targetInst);
      }
      function getTargetInstForInputOrChangeEvent(domEventName, targetInst) {
        if ("input" === domEventName || "change" === domEventName)
          return getInstIfValueChanged(targetInst);
      }
      function is(x, y) {
        return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
      }
      var objectIs = "function" === typeof Object.is ? Object.is : is;
      function shallowEqual(objA, objB) {
        if (objectIs(objA, objB)) return true;
        if ("object" !== typeof objA || null === objA || "object" !== typeof objB || null === objB)
          return false;
        var keysA = Object.keys(objA), keysB = Object.keys(objB);
        if (keysA.length !== keysB.length) return false;
        for (keysB = 0; keysB < keysA.length; keysB++) {
          var currentKey = keysA[keysB];
          if (!hasOwnProperty.call(objB, currentKey) || !objectIs(objA[currentKey], objB[currentKey]))
            return false;
        }
        return true;
      }
      function getActiveElement(doc) {
        doc = doc || ("undefined" !== typeof document ? document : void 0);
        if ("undefined" === typeof doc) return null;
        try {
          return doc.activeElement || doc.body;
        } catch (e$20) {
          return doc.body;
        }
      }
      function getLeafNode(node) {
        for (; node && node.firstChild; ) node = node.firstChild;
        return node;
      }
      function getNodeForCharacterOffset(root2, offset) {
        var node = getLeafNode(root2);
        root2 = 0;
        for (var nodeEnd; node; ) {
          if (3 === node.nodeType) {
            nodeEnd = root2 + node.textContent.length;
            if (root2 <= offset && nodeEnd >= offset)
              return { node, offset: offset - root2 };
            root2 = nodeEnd;
          }
          a: {
            for (; node; ) {
              if (node.nextSibling) {
                node = node.nextSibling;
                break a;
              }
              node = node.parentNode;
            }
            node = void 0;
          }
          node = getLeafNode(node);
        }
      }
      function containsNode(outerNode, innerNode) {
        return outerNode && innerNode ? outerNode === innerNode ? true : outerNode && 3 === outerNode.nodeType ? false : innerNode && 3 === innerNode.nodeType ? containsNode(outerNode, innerNode.parentNode) : "contains" in outerNode ? outerNode.contains(innerNode) : outerNode.compareDocumentPosition ? !!(outerNode.compareDocumentPosition(innerNode) & 16) : false : false;
      }
      function getActiveElementDeep(containerInfo) {
        containerInfo = null != containerInfo && null != containerInfo.ownerDocument && null != containerInfo.ownerDocument.defaultView ? containerInfo.ownerDocument.defaultView : window;
        for (var element = getActiveElement(containerInfo.document); element instanceof containerInfo.HTMLIFrameElement; ) {
          try {
            var JSCompiler_inline_result = "string" === typeof element.contentWindow.location.href;
          } catch (err) {
            JSCompiler_inline_result = false;
          }
          if (JSCompiler_inline_result) containerInfo = element.contentWindow;
          else break;
          element = getActiveElement(containerInfo.document);
        }
        return element;
      }
      function hasSelectionCapabilities(elem) {
        var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
        return nodeName && ("input" === nodeName && ("text" === elem.type || "search" === elem.type || "tel" === elem.type || "url" === elem.type || "password" === elem.type) || "textarea" === nodeName || "true" === elem.contentEditable);
      }
      var skipSelectionChangeEvent = canUseDOM && "documentMode" in document && 11 >= document.documentMode;
      var activeElement = null;
      var activeElementInst = null;
      var lastSelection = null;
      var mouseDown = false;
      function constructSelectEvent(dispatchQueue, nativeEvent, nativeEventTarget) {
        var doc = nativeEventTarget.window === nativeEventTarget ? nativeEventTarget.document : 9 === nativeEventTarget.nodeType ? nativeEventTarget : nativeEventTarget.ownerDocument;
        mouseDown || null == activeElement || activeElement !== getActiveElement(doc) || (doc = activeElement, "selectionStart" in doc && hasSelectionCapabilities(doc) ? doc = { start: doc.selectionStart, end: doc.selectionEnd } : (doc = (doc.ownerDocument && doc.ownerDocument.defaultView || window).getSelection(), doc = {
          anchorNode: doc.anchorNode,
          anchorOffset: doc.anchorOffset,
          focusNode: doc.focusNode,
          focusOffset: doc.focusOffset
        }), lastSelection && shallowEqual(lastSelection, doc) || (lastSelection = doc, doc = accumulateTwoPhaseListeners(activeElementInst, "onSelect"), 0 < doc.length && (nativeEvent = new SyntheticEvent(
          "onSelect",
          "select",
          null,
          nativeEvent,
          nativeEventTarget
        ), dispatchQueue.push({ event: nativeEvent, listeners: doc }), nativeEvent.target = activeElement)));
      }
      function makePrefixMap(styleProp, eventName) {
        var prefixes = {};
        prefixes[styleProp.toLowerCase()] = eventName.toLowerCase();
        prefixes["Webkit" + styleProp] = "webkit" + eventName;
        prefixes["Moz" + styleProp] = "moz" + eventName;
        return prefixes;
      }
      var vendorPrefixes = {
        animationend: makePrefixMap("Animation", "AnimationEnd"),
        animationiteration: makePrefixMap("Animation", "AnimationIteration"),
        animationstart: makePrefixMap("Animation", "AnimationStart"),
        transitionrun: makePrefixMap("Transition", "TransitionRun"),
        transitionstart: makePrefixMap("Transition", "TransitionStart"),
        transitioncancel: makePrefixMap("Transition", "TransitionCancel"),
        transitionend: makePrefixMap("Transition", "TransitionEnd")
      };
      var prefixedEventNames = {};
      var style = {};
      canUseDOM && (style = document.createElement("div").style, "AnimationEvent" in window || (delete vendorPrefixes.animationend.animation, delete vendorPrefixes.animationiteration.animation, delete vendorPrefixes.animationstart.animation), "TransitionEvent" in window || delete vendorPrefixes.transitionend.transition);
      function getVendorPrefixedEventName(eventName) {
        if (prefixedEventNames[eventName]) return prefixedEventNames[eventName];
        if (!vendorPrefixes[eventName]) return eventName;
        var prefixMap = vendorPrefixes[eventName], styleProp;
        for (styleProp in prefixMap)
          if (prefixMap.hasOwnProperty(styleProp) && styleProp in style)
            return prefixedEventNames[eventName] = prefixMap[styleProp];
        return eventName;
      }
      var ANIMATION_END = getVendorPrefixedEventName("animationend");
      var ANIMATION_ITERATION = getVendorPrefixedEventName("animationiteration");
      var ANIMATION_START = getVendorPrefixedEventName("animationstart");
      var TRANSITION_RUN = getVendorPrefixedEventName("transitionrun");
      var TRANSITION_START = getVendorPrefixedEventName("transitionstart");
      var TRANSITION_CANCEL = getVendorPrefixedEventName("transitioncancel");
      var TRANSITION_END = getVendorPrefixedEventName("transitionend");
      var topLevelEventsToReactNames = /* @__PURE__ */ new Map();
      var simpleEventPluginEvents = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " "
      );
      simpleEventPluginEvents.push("scrollEnd");
      function registerSimpleEvent(domEventName, reactName) {
        topLevelEventsToReactNames.set(domEventName, reactName);
        registerTwoPhaseEvent(reactName, [domEventName]);
      }
      var globalClientIdCounter$1 = 0;
      function getViewTransitionName(props, instance) {
        if (null != props.name && "auto" !== props.name) return props.name;
        if (null !== instance.autoName) return instance.autoName;
        props = pendingEffectsRoot.identifierPrefix;
        var globalClientId = globalClientIdCounter$1++;
        props = "_" + props + "t_" + globalClientId.toString(32) + "_";
        return instance.autoName = props;
      }
      function getClassNameByType(classByType) {
        if (null == classByType || "string" === typeof classByType)
          return classByType;
        var className = null, activeTypes = pendingTransitionTypes;
        if (null !== activeTypes)
          for (var i = 0; i < activeTypes.length; i++) {
            var match = classByType[activeTypes[i]];
            if (null != match) {
              if ("none" === match) return "none";
              className = null == className ? match : className + (" " + match);
            }
          }
        return null == className ? classByType.default : className;
      }
      function getViewTransitionClassName(defaultClass, eventClass) {
        defaultClass = getClassNameByType(defaultClass);
        eventClass = getClassNameByType(eventClass);
        return null == eventClass ? "auto" === defaultClass ? null : defaultClass : "auto" === eventClass ? null : eventClass;
      }
      var reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
        if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
          var event = new window.ErrorEvent("error", {
            bubbles: true,
            cancelable: true,
            message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
            error
          });
          if (!window.dispatchEvent(event)) return;
        } else if ("object" === typeof process && "function" === typeof process.emit) {
          process.emit("uncaughtException", error);
          return;
        }
        console.error(error);
      };
      var concurrentQueues = [];
      var concurrentQueuesIndex = 0;
      var concurrentlyUpdatedLanes = 0;
      function finishQueueingConcurrentUpdates() {
        for (var endIndex = concurrentQueuesIndex, i = concurrentlyUpdatedLanes = concurrentQueuesIndex = 0; i < endIndex; ) {
          var fiber = concurrentQueues[i];
          concurrentQueues[i++] = null;
          var queue = concurrentQueues[i];
          concurrentQueues[i++] = null;
          var update = concurrentQueues[i];
          concurrentQueues[i++] = null;
          var lane = concurrentQueues[i];
          concurrentQueues[i++] = null;
          if (null !== queue && null !== update) {
            var pending = queue.pending;
            null === pending ? update.next = update : (update.next = pending.next, pending.next = update);
            queue.pending = update;
          }
          0 !== lane && markUpdateLaneFromFiberToRoot(fiber, update, lane);
        }
      }
      function enqueueUpdate$1(fiber, queue, update, lane) {
        concurrentQueues[concurrentQueuesIndex++] = fiber;
        concurrentQueues[concurrentQueuesIndex++] = queue;
        concurrentQueues[concurrentQueuesIndex++] = update;
        concurrentQueues[concurrentQueuesIndex++] = lane;
        concurrentlyUpdatedLanes |= lane;
        fiber.lanes |= lane;
        fiber = fiber.alternate;
        null !== fiber && (fiber.lanes |= lane);
      }
      function enqueueConcurrentHookUpdate(fiber, queue, update, lane) {
        enqueueUpdate$1(fiber, queue, update, lane);
        return getRootForUpdatedFiber(fiber);
      }
      function enqueueConcurrentRenderForLane(fiber, lane) {
        enqueueUpdate$1(fiber, null, null, lane);
        return getRootForUpdatedFiber(fiber);
      }
      function markUpdateLaneFromFiberToRoot(sourceFiber, update, lane) {
        sourceFiber.lanes |= lane;
        var alternate = sourceFiber.alternate;
        null !== alternate && (alternate.lanes |= lane);
        for (var isHidden = false, parent = sourceFiber.return; null !== parent; )
          parent.childLanes |= lane, alternate = parent.alternate, null !== alternate && (alternate.childLanes |= lane), 22 === parent.tag && (sourceFiber = parent.stateNode, null === sourceFiber || sourceFiber._visibility & 1 || (isHidden = true)), sourceFiber = parent, parent = parent.return;
        return 3 === sourceFiber.tag ? (parent = sourceFiber.stateNode, isHidden && null !== update && (isHidden = 31 - clz32(lane), sourceFiber = parent.hiddenUpdates, alternate = sourceFiber[isHidden], null === alternate ? sourceFiber[isHidden] = [update] : alternate.push(update), update.lane = lane | 536870912), parent) : null;
      }
      function getRootForUpdatedFiber(sourceFiber) {
        if (50 < nestedUpdateCount)
          throw nestedUpdateCount = 0, rootWithNestedUpdates = null, Error(formatProdErrorMessage(185));
        for (var parent = sourceFiber.return; null !== parent; )
          sourceFiber = parent, parent = sourceFiber.return;
        return 3 === sourceFiber.tag ? sourceFiber.stateNode : null;
      }
      var emptyContextObject = {};
      function FiberNode(tag, pendingProps, key, mode) {
        this.tag = tag;
        this.key = key;
        this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
        this.index = 0;
        this.refCleanup = this.ref = null;
        this.pendingProps = pendingProps;
        this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
        this.mode = mode;
        this.subtreeFlags = this.flags = 0;
        this.deletions = null;
        this.childLanes = this.lanes = 0;
        this.alternate = null;
      }
      function createFiberImplClass(tag, pendingProps, key, mode) {
        return new FiberNode(tag, pendingProps, key, mode);
      }
      function shouldConstruct(Component) {
        Component = Component.prototype;
        return !(!Component || !Component.isReactComponent);
      }
      function createWorkInProgress(current, pendingProps) {
        var workInProgress2 = current.alternate;
        null === workInProgress2 ? (workInProgress2 = createFiberImplClass(
          current.tag,
          pendingProps,
          current.key,
          current.mode
        ), workInProgress2.elementType = current.elementType, workInProgress2.type = current.type, workInProgress2.stateNode = current.stateNode, workInProgress2.alternate = current, current.alternate = workInProgress2) : (workInProgress2.pendingProps = pendingProps, workInProgress2.type = current.type, workInProgress2.flags = 0, workInProgress2.subtreeFlags = 0, workInProgress2.deletions = null);
        workInProgress2.flags = current.flags & 1206910976;
        workInProgress2.childLanes = current.childLanes;
        workInProgress2.lanes = current.lanes;
        workInProgress2.child = current.child;
        workInProgress2.memoizedProps = current.memoizedProps;
        workInProgress2.memoizedState = current.memoizedState;
        workInProgress2.updateQueue = current.updateQueue;
        pendingProps = current.dependencies;
        workInProgress2.dependencies = null === pendingProps ? null : { lanes: pendingProps.lanes, firstContext: pendingProps.firstContext };
        workInProgress2.sibling = current.sibling;
        workInProgress2.index = current.index;
        workInProgress2.ref = current.ref;
        workInProgress2.refCleanup = current.refCleanup;
        return workInProgress2;
      }
      function resetWorkInProgress(workInProgress2, renderLanes2) {
        workInProgress2.flags &= 1206910978;
        var current = workInProgress2.alternate;
        null === current ? (workInProgress2.childLanes = 0, workInProgress2.lanes = renderLanes2, workInProgress2.child = null, workInProgress2.subtreeFlags = 0, workInProgress2.memoizedProps = null, workInProgress2.memoizedState = null, workInProgress2.updateQueue = null, workInProgress2.dependencies = null, workInProgress2.stateNode = null) : (workInProgress2.childLanes = current.childLanes, workInProgress2.lanes = current.lanes, workInProgress2.child = current.child, workInProgress2.subtreeFlags = 0, workInProgress2.deletions = null, workInProgress2.memoizedProps = current.memoizedProps, workInProgress2.memoizedState = current.memoizedState, workInProgress2.updateQueue = current.updateQueue, workInProgress2.type = current.type, renderLanes2 = current.dependencies, workInProgress2.dependencies = null === renderLanes2 ? null : {
          lanes: renderLanes2.lanes,
          firstContext: renderLanes2.firstContext
        });
        return workInProgress2;
      }
      function createFiberFromTypeAndProps(type, key, pendingProps, owner, mode, lanes) {
        var fiberTag = 0;
        owner = type;
        if ("function" === typeof owner) shouldConstruct(owner) && (fiberTag = 1);
        else if ("string" === typeof owner)
          fiberTag = isHostHoistableType(
            type,
            pendingProps,
            contextStackCursor.current
          ) ? 26 : "html" === type || "head" === type || "body" === type ? 27 : 5;
        else
          a: switch (owner) {
            case REACT_ACTIVITY_TYPE:
              return type = createFiberImplClass(31, pendingProps, key, mode), type.elementType = REACT_ACTIVITY_TYPE, type.lanes = lanes, type;
            case REACT_FRAGMENT_TYPE:
              return createFiberFromFragment(pendingProps.children, mode, lanes, key);
            case REACT_STRICT_MODE_TYPE:
              fiberTag = 8;
              mode |= 24;
              break;
            case REACT_PROFILER_TYPE:
              return type = createFiberImplClass(12, pendingProps, key, mode | 2), type.elementType = REACT_PROFILER_TYPE, type.lanes = lanes, type;
            case REACT_SUSPENSE_TYPE:
              return type = createFiberImplClass(13, pendingProps, key, mode), type.elementType = REACT_SUSPENSE_TYPE, type.lanes = lanes, type;
            case REACT_SUSPENSE_LIST_TYPE:
              return type = createFiberImplClass(19, pendingProps, key, mode), type.elementType = REACT_SUSPENSE_LIST_TYPE, type.lanes = lanes, type;
            case REACT_LEGACY_HIDDEN_TYPE:
            case REACT_VIEW_TRANSITION_TYPE:
              return type = mode | 32, type = createFiberImplClass(30, pendingProps, key, type), type.elementType = REACT_VIEW_TRANSITION_TYPE, type.lanes = lanes, type.stateNode = {
                autoName: null,
                paired: null,
                clones: null,
                ref: null
              }, type;
            default:
              if ("object" === typeof owner && null !== owner)
                switch (owner.$$typeof) {
                  case REACT_CONTEXT_TYPE:
                    fiberTag = 10;
                    break a;
                  case REACT_CONSUMER_TYPE:
                    fiberTag = 9;
                    break a;
                  case REACT_FORWARD_REF_TYPE:
                    fiberTag = 11;
                    break a;
                  case REACT_MEMO_TYPE:
                    fiberTag = 14;
                    break a;
                  case REACT_LAZY_TYPE:
                    fiberTag = 16;
                    owner = null;
                    break a;
                }
              fiberTag = 29;
              pendingProps = Error(
                formatProdErrorMessage(130, null === type ? "null" : typeof type, "")
              );
              owner = null;
          }
        key = createFiberImplClass(fiberTag, pendingProps, key, mode);
        key.elementType = type;
        key.type = owner;
        key.lanes = lanes;
        return key;
      }
      function createFiberFromFragment(elements, mode, lanes, key) {
        elements = createFiberImplClass(7, elements, key, mode);
        elements.lanes = lanes;
        return elements;
      }
      function createFiberFromText(content, mode, lanes) {
        content = createFiberImplClass(6, content, null, mode);
        content.lanes = lanes;
        return content;
      }
      function createFiberFromDehydratedFragment(dehydratedNode) {
        var fiber = createFiberImplClass(18, null, null, 0);
        fiber.stateNode = dehydratedNode;
        return fiber;
      }
      function createFiberFromPortal(portal, mode, lanes) {
        mode = createFiberImplClass(
          4,
          null !== portal.children ? portal.children : [],
          portal.key,
          mode
        );
        mode.lanes = lanes;
        mode.stateNode = {
          containerInfo: portal.containerInfo,
          pendingChildren: null,
          implementation: portal.implementation
        };
        return mode;
      }
      var CapturedStacks = /* @__PURE__ */ new WeakMap();
      function createCapturedValueAtFiber(value, source) {
        if ("object" === typeof value && null !== value) {
          var existing = CapturedStacks.get(value);
          if (void 0 !== existing) return existing;
          source = {
            value,
            source,
            stack: getStackByFiberInDevAndProd(source)
          };
          CapturedStacks.set(value, source);
          return source;
        }
        return {
          value,
          source,
          stack: getStackByFiberInDevAndProd(source)
        };
      }
      var forkStack = [];
      var forkStackIndex = 0;
      var treeForkProvider = null;
      var treeForkCount = 0;
      var idStack = [];
      var idStackIndex = 0;
      var treeContextProvider = null;
      var treeContextId = 1;
      var treeContextOverflow = "";
      function pushTreeFork(workInProgress2, totalChildren) {
        forkStack[forkStackIndex++] = treeForkCount;
        forkStack[forkStackIndex++] = treeForkProvider;
        treeForkProvider = workInProgress2;
        treeForkCount = totalChildren;
      }
      function pushTreeId(workInProgress2, totalChildren, index2) {
        idStack[idStackIndex++] = treeContextId;
        idStack[idStackIndex++] = treeContextOverflow;
        idStack[idStackIndex++] = treeContextProvider;
        treeContextProvider = workInProgress2;
        var baseIdWithLeadingBit = treeContextId;
        workInProgress2 = treeContextOverflow;
        var baseLength = 32 - clz32(baseIdWithLeadingBit) - 1;
        baseIdWithLeadingBit &= ~(1 << baseLength);
        index2 += 1;
        var length = 32 - clz32(totalChildren) + baseLength;
        if (30 < length) {
          var numberOfOverflowBits = baseLength - baseLength % 5;
          length = (baseIdWithLeadingBit & (1 << numberOfOverflowBits) - 1).toString(32);
          baseIdWithLeadingBit >>= numberOfOverflowBits;
          baseLength -= numberOfOverflowBits;
          treeContextId = 1 << 32 - clz32(totalChildren) + baseLength | index2 << baseLength | baseIdWithLeadingBit;
          treeContextOverflow = length + workInProgress2;
        } else
          treeContextId = 1 << length | index2 << baseLength | baseIdWithLeadingBit, treeContextOverflow = workInProgress2;
      }
      function pushMaterializedTreeId(workInProgress2) {
        null !== workInProgress2.return && (pushTreeFork(workInProgress2, 1), pushTreeId(workInProgress2, 1, 0));
      }
      function popTreeContext(workInProgress2) {
        for (; workInProgress2 === treeForkProvider; )
          treeForkProvider = forkStack[--forkStackIndex], forkStack[forkStackIndex] = null, treeForkCount = forkStack[--forkStackIndex], forkStack[forkStackIndex] = null;
        for (; workInProgress2 === treeContextProvider; )
          treeContextProvider = idStack[--idStackIndex], idStack[idStackIndex] = null, treeContextOverflow = idStack[--idStackIndex], idStack[idStackIndex] = null, treeContextId = idStack[--idStackIndex], idStack[idStackIndex] = null;
      }
      function restoreSuspendedTreeContext(workInProgress2, suspendedContext) {
        idStack[idStackIndex++] = treeContextId;
        idStack[idStackIndex++] = treeContextOverflow;
        idStack[idStackIndex++] = treeContextProvider;
        treeContextId = suspendedContext.id;
        treeContextOverflow = suspendedContext.overflow;
        treeContextProvider = workInProgress2;
      }
      var hydrationParentFiber = null;
      var nextHydratableInstance = null;
      var isHydrating = false;
      var hydrationErrors = null;
      var rootOrSingletonContext = false;
      var HydrationMismatchException = Error(formatProdErrorMessage(519));
      function throwOnHydrationMismatch(fiber) {
        var error = Error(
          formatProdErrorMessage(
            418,
            1 < arguments.length && void 0 !== arguments[1] && arguments[1] ? "text" : "HTML",
            ""
          )
        );
        queueHydrationError(createCapturedValueAtFiber(error, fiber));
        throw HydrationMismatchException;
      }
      function prepareToHydrateHostInstance(fiber) {
        var instance = fiber.stateNode, type = fiber.type, props = fiber.memoizedProps;
        instance[internalInstanceKey] = fiber;
        instance[internalPropsKey] = props;
        switch (type) {
          case "dialog":
            listenToNonDelegatedEvent("cancel", instance);
            listenToNonDelegatedEvent("close", instance);
            break;
          case "iframe":
          case "object":
          case "embed":
            listenToNonDelegatedEvent("load", instance);
            break;
          case "video":
          case "audio":
            for (type = 0; type < mediaEventTypes.length; type++)
              listenToNonDelegatedEvent(mediaEventTypes[type], instance);
            break;
          case "source":
            listenToNonDelegatedEvent("error", instance);
            break;
          case "img":
          case "image":
          case "link":
            listenToNonDelegatedEvent("error", instance);
            listenToNonDelegatedEvent("load", instance);
            break;
          case "details":
            listenToNonDelegatedEvent("toggle", instance);
            break;
          case "input":
            listenToNonDelegatedEvent("invalid", instance);
            initInput(
              instance,
              props.value,
              props.defaultValue,
              props.checked,
              props.defaultChecked,
              props.type,
              props.name,
              true
            );
            break;
          case "select":
            listenToNonDelegatedEvent("invalid", instance);
            break;
          case "textarea":
            listenToNonDelegatedEvent("invalid", instance), initTextarea(instance, props.value, props.defaultValue, props.children);
        }
        type = props.children;
        "string" !== typeof type && "number" !== typeof type && "bigint" !== typeof type || instance.textContent === "" + type || true === props.suppressHydrationWarning || checkForUnmatchedText(instance.textContent, type) ? (null != props.popover && (listenToNonDelegatedEvent("beforetoggle", instance), listenToNonDelegatedEvent("toggle", instance)), null != props.onScroll && listenToNonDelegatedEvent("scroll", instance), null != props.onScrollEnd && listenToNonDelegatedEvent("scrollend", instance), null != props.onClick && (instance.onclick = noop$1), instance = true) : instance = false;
        instance || throwOnHydrationMismatch(fiber, true);
      }
      function popToNextHostParent(fiber) {
        for (hydrationParentFiber = fiber.return; hydrationParentFiber; )
          switch (hydrationParentFiber.tag) {
            case 5:
            case 31:
            case 13:
              rootOrSingletonContext = false;
              return;
            case 27:
            case 3:
              rootOrSingletonContext = true;
              return;
            default:
              hydrationParentFiber = hydrationParentFiber.return;
          }
      }
      function popHydrationState(fiber) {
        if (fiber !== hydrationParentFiber) return false;
        if (!isHydrating) return popToNextHostParent(fiber), isHydrating = true, false;
        var tag = fiber.tag, JSCompiler_temp;
        if (JSCompiler_temp = 3 !== tag && 27 !== tag) {
          if (JSCompiler_temp = 5 === tag)
            JSCompiler_temp = fiber.type, JSCompiler_temp = !("form" !== JSCompiler_temp && "button" !== JSCompiler_temp) || shouldSetTextContent(fiber.type, fiber.memoizedProps);
          JSCompiler_temp = !JSCompiler_temp;
        }
        JSCompiler_temp && nextHydratableInstance && throwOnHydrationMismatch(fiber);
        popToNextHostParent(fiber);
        if (13 === tag) {
          fiber = fiber.memoizedState;
          fiber = null !== fiber ? fiber.dehydrated : null;
          if (!fiber) throw Error(formatProdErrorMessage(317));
          nextHydratableInstance = getNextHydratableInstanceAfterHydrationBoundary(fiber);
        } else if (31 === tag) {
          fiber = fiber.memoizedState;
          fiber = null !== fiber ? fiber.dehydrated : null;
          if (!fiber) throw Error(formatProdErrorMessage(317));
          nextHydratableInstance = getNextHydratableInstanceAfterHydrationBoundary(fiber);
        } else
          27 === tag ? (tag = nextHydratableInstance, isSingletonScope(fiber.type) ? (fiber = previousHydratableOnEnteringScopedSingleton, previousHydratableOnEnteringScopedSingleton = null, nextHydratableInstance = fiber) : nextHydratableInstance = tag) : nextHydratableInstance = hydrationParentFiber ? getNextHydratable(fiber.stateNode.nextSibling) : null;
        return true;
      }
      function resetHydrationState() {
        nextHydratableInstance = hydrationParentFiber = null;
        isHydrating = false;
      }
      function upgradeHydrationErrorsToRecoverable() {
        var queuedErrors = hydrationErrors;
        null !== queuedErrors && (null === workInProgressRootRecoverableErrors ? workInProgressRootRecoverableErrors = queuedErrors : workInProgressRootRecoverableErrors.push.apply(
          workInProgressRootRecoverableErrors,
          queuedErrors
        ), hydrationErrors = null);
        return queuedErrors;
      }
      function queueHydrationError(error) {
        null === hydrationErrors ? hydrationErrors = [error] : hydrationErrors.push(error);
      }
      var valueCursor = createCursor(null);
      var currentlyRenderingFiber$1 = null;
      var lastContextDependency = null;
      function pushProvider(providerFiber, context, nextValue) {
        push(valueCursor, context._currentValue);
        context._currentValue = nextValue;
      }
      function popProvider(context) {
        context._currentValue = valueCursor.current;
        pop(valueCursor);
      }
      function scheduleContextWorkOnParentPath(parent, renderLanes2, propagationRoot) {
        for (; null !== parent; ) {
          var alternate = parent.alternate;
          (parent.childLanes & renderLanes2) !== renderLanes2 ? (parent.childLanes |= renderLanes2, null !== alternate && (alternate.childLanes |= renderLanes2)) : null !== alternate && (alternate.childLanes & renderLanes2) !== renderLanes2 && (alternate.childLanes |= renderLanes2);
          if (parent === propagationRoot) break;
          parent = parent.return;
        }
      }
      function propagateContextChanges(workInProgress2, contexts, renderLanes2, forcePropagateEntireTree) {
        var fiber = workInProgress2.child;
        null !== fiber && (fiber.return = workInProgress2);
        for (; null !== fiber; ) {
          var list = fiber.dependencies;
          if (null !== list) {
            var nextFiber = fiber.child;
            list = list.firstContext;
            a: for (; null !== list; ) {
              var dependency = list;
              list = fiber;
              for (var i = 0; i < contexts.length; i++)
                if (dependency.context === contexts[i]) {
                  list.lanes |= renderLanes2;
                  dependency = list.alternate;
                  null !== dependency && (dependency.lanes |= renderLanes2);
                  scheduleContextWorkOnParentPath(
                    list.return,
                    renderLanes2,
                    workInProgress2
                  );
                  forcePropagateEntireTree || (nextFiber = null);
                  break a;
                }
              list = dependency.next;
            }
          } else if (18 === fiber.tag) {
            nextFiber = fiber.return;
            if (null === nextFiber) throw Error(formatProdErrorMessage(341));
            nextFiber.lanes |= renderLanes2;
            list = nextFiber.alternate;
            null !== list && (list.lanes |= renderLanes2);
            scheduleContextWorkOnParentPath(nextFiber, renderLanes2, workInProgress2);
            nextFiber = null;
          } else
            13 === fiber.tag && null !== fiber.memoizedState && null === fiber.memoizedState.dehydrated ? (fiber.lanes |= renderLanes2, nextFiber = fiber.alternate, null !== nextFiber && (nextFiber.lanes |= renderLanes2), scheduleContextWorkOnParentPath(
              fiber.return,
              renderLanes2,
              workInProgress2
            ), nextFiber = fiber.child, nextFiber = null !== nextFiber ? nextFiber.sibling : null) : nextFiber = fiber.child;
          if (null !== nextFiber) nextFiber.return = fiber;
          else
            for (nextFiber = fiber; null !== nextFiber; ) {
              if (nextFiber === workInProgress2) {
                nextFiber = null;
                break;
              }
              fiber = nextFiber.sibling;
              if (null !== fiber) {
                fiber.return = nextFiber.return;
                nextFiber = fiber;
                break;
              }
              nextFiber = nextFiber.return;
            }
          fiber = nextFiber;
        }
      }
      function propagateParentContextChanges(current, workInProgress2, renderLanes2, forcePropagateEntireTree) {
        current = null;
        for (var parent = workInProgress2, isInsidePropagationBailout = false; null !== parent; ) {
          if (!isInsidePropagationBailout) {
            if (0 !== (parent.flags & 524288)) isInsidePropagationBailout = true;
            else if (0 !== (parent.flags & 262144)) break;
          }
          if (10 === parent.tag) {
            var currentParent = parent.alternate;
            if (null === currentParent) throw Error(formatProdErrorMessage(387));
            currentParent = currentParent.memoizedProps;
            if (null !== currentParent) {
              var context = parent.type;
              objectIs(parent.pendingProps.value, currentParent.value) || (null !== current ? current.push(context) : current = [context]);
            }
          } else if (parent === hostTransitionProviderCursor.current) {
            currentParent = parent.alternate;
            if (null === currentParent) throw Error(formatProdErrorMessage(387));
            currentParent.memoizedState.memoizedState !== parent.memoizedState.memoizedState && (null !== current ? current.push(HostTransitionContext) : current = [HostTransitionContext]);
          }
          parent = parent.return;
        }
        null !== current && propagateContextChanges(
          workInProgress2,
          current,
          renderLanes2,
          forcePropagateEntireTree
        );
        workInProgress2.flags |= 262144;
        return null !== current;
      }
      function checkIfContextChanged(currentDependencies) {
        for (currentDependencies = currentDependencies.firstContext; null !== currentDependencies; ) {
          if (!objectIs(
            currentDependencies.context._currentValue,
            currentDependencies.memoizedValue
          ))
            return true;
          currentDependencies = currentDependencies.next;
        }
        return false;
      }
      function prepareToReadContext(workInProgress2) {
        currentlyRenderingFiber$1 = workInProgress2;
        lastContextDependency = null;
        workInProgress2 = workInProgress2.dependencies;
        null !== workInProgress2 && (workInProgress2.firstContext = null);
      }
      function readContext(context) {
        return readContextForConsumer(currentlyRenderingFiber$1, context);
      }
      function readContextDuringReconciliation(consumer, context) {
        null === currentlyRenderingFiber$1 && prepareToReadContext(consumer);
        return readContextForConsumer(consumer, context);
      }
      function readContextForConsumer(consumer, context) {
        var value = context._currentValue;
        context = { context, memoizedValue: value, next: null };
        if (null === lastContextDependency) {
          if (null === consumer) throw Error(formatProdErrorMessage(308));
          lastContextDependency = context;
          consumer.dependencies = { lanes: 0, firstContext: context };
          consumer.flags |= 524288;
        } else lastContextDependency = lastContextDependency.next = context;
        return value;
      }
      var AbortControllerLocal = "undefined" !== typeof AbortController ? AbortController : function() {
        var listeners = [], signal = this.signal = {
          aborted: false,
          addEventListener: function(type, listener) {
            listeners.push(listener);
          }
        };
        this.abort = function() {
          signal.aborted = true;
          listeners.forEach(function(listener) {
            return listener();
          });
        };
      };
      var scheduleCallback$2 = Scheduler.unstable_scheduleCallback;
      var NormalPriority = Scheduler.unstable_NormalPriority;
      var CacheContext = {
        $$typeof: REACT_CONTEXT_TYPE,
        Consumer: null,
        Provider: null,
        _currentValue: null,
        _currentValue2: null,
        _threadCount: 0
      };
      function createCache() {
        return {
          controller: new AbortControllerLocal(),
          data: /* @__PURE__ */ new Map(),
          refCount: 0
        };
      }
      function releaseCache(cache) {
        cache.refCount--;
        0 === cache.refCount && scheduleCallback$2(NormalPriority, function() {
          cache.controller.abort();
        });
      }
      function queueTransitionTypes(root2, transitionTypes) {
        if (0 !== (root2.pendingLanes & 4194048)) {
          var queued = root2.transitionTypes;
          null === queued && (queued = root2.transitionTypes = []);
          for (root2 = 0; root2 < transitionTypes.length; root2++) {
            var transitionType = transitionTypes[root2];
            -1 === queued.indexOf(transitionType) && queued.push(transitionType);
          }
        }
      }
      var entangledTransitionTypes = null;
      function claimQueuedTransitionTypes(root2) {
        var claimed = root2.transitionTypes;
        root2.transitionTypes = null;
        return claimed;
      }
      var currentEntangledListeners = null;
      var currentEntangledPendingCount = 0;
      var currentEntangledLane = 0;
      var currentEntangledActionThenable = null;
      function entangleAsyncAction(transition, thenable) {
        if (null === currentEntangledListeners) {
          var entangledListeners = currentEntangledListeners = [];
          currentEntangledPendingCount = 0;
          currentEntangledLane = requestTransitionLane();
          currentEntangledActionThenable = {
            status: "pending",
            value: void 0,
            then: function(resolve) {
              entangledListeners.push(resolve);
            }
          };
        }
        currentEntangledPendingCount++;
        thenable.then(pingEngtangledActionScope, pingEngtangledActionScope);
        return thenable;
      }
      function pingEngtangledActionScope() {
        if (0 === --currentEntangledPendingCount && (entangledTransitionTypes = null, null !== currentEntangledListeners)) {
          null !== currentEntangledActionThenable && (currentEntangledActionThenable.status = "fulfilled");
          var listeners = currentEntangledListeners;
          currentEntangledListeners = null;
          currentEntangledLane = 0;
          currentEntangledActionThenable = null;
          for (var i = 0; i < listeners.length; i++) (0, listeners[i])();
        }
      }
      function chainThenableValue(thenable, result) {
        var listeners = [], thenableWithOverride = {
          status: "pending",
          value: null,
          reason: null,
          then: function(resolve) {
            listeners.push(resolve);
          }
        };
        thenable.then(
          function() {
            thenableWithOverride.status = "fulfilled";
            thenableWithOverride.value = result;
            for (var i = 0; i < listeners.length; i++) (0, listeners[i])(result);
          },
          function(error) {
            thenableWithOverride.status = "rejected";
            thenableWithOverride.reason = error;
            for (error = 0; error < listeners.length; error++)
              (0, listeners[error])(void 0);
          }
        );
        return thenableWithOverride;
      }
      var prevOnStartTransitionFinish = ReactSharedInternals.S;
      ReactSharedInternals.S = function(transition, returnValue) {
        globalMostRecentTransitionTime = now();
        "object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && entangleAsyncAction(transition, returnValue);
        if (null !== entangledTransitionTypes)
          for (var root$28 = firstScheduledRoot; null !== root$28; )
            queueTransitionTypes(root$28, entangledTransitionTypes), root$28 = root$28.next;
        root$28 = transition.types;
        if (null !== root$28) {
          for (var root$29 = firstScheduledRoot; null !== root$29; )
            queueTransitionTypes(root$29, root$28), root$29 = root$29.next;
          if (0 !== currentEntangledLane) {
            root$29 = entangledTransitionTypes;
            null === root$29 && (root$29 = entangledTransitionTypes = []);
            for (var i = 0; i < root$28.length; i++) {
              var transitionType = root$28[i];
              -1 === root$29.indexOf(transitionType) && root$29.push(transitionType);
            }
          }
        }
        null !== prevOnStartTransitionFinish && prevOnStartTransitionFinish(transition, returnValue);
      };
      var resumedCache = createCursor(null);
      function peekCacheFromPool() {
        var cacheResumedFromPreviousRender = resumedCache.current;
        return null !== cacheResumedFromPreviousRender ? cacheResumedFromPreviousRender : workInProgressRoot.pooledCache;
      }
      function pushTransition(offscreenWorkInProgress, prevCachePool) {
        null === prevCachePool ? push(resumedCache, resumedCache.current) : push(resumedCache, prevCachePool.pool);
      }
      function getSuspendedCache() {
        var cacheFromPool = peekCacheFromPool();
        return null === cacheFromPool ? null : { parent: CacheContext._currentValue, pool: cacheFromPool };
      }
      var SuspenseException = Error(formatProdErrorMessage(460));
      var SuspenseyCommitException = Error(formatProdErrorMessage(474));
      var SuspenseActionException = Error(formatProdErrorMessage(542));
      var noopSuspenseyCommitThenable = { then: function() {
      } };
      function isThenableResolved(thenable) {
        thenable = thenable.status;
        return "fulfilled" === thenable || "rejected" === thenable;
      }
      function trackUsedThenable(thenableState2, thenable, index2) {
        index2 = thenableState2[index2];
        void 0 === index2 ? thenableState2.push(thenable) : index2 !== thenable && (thenable.then(noop$1, noop$1), thenable = index2);
        switch (thenable.status) {
          case "fulfilled":
            return thenable.value;
          case "rejected":
            thenableState2 = thenable.reason;
            checkIfUseWrappedInAsyncCatch(thenableState2);
            if (void 0 === thenableState2 && !("reason" in thenable))
              throw Error(formatProdErrorMessage(600));
            throw thenableState2;
          default:
            if ("string" === typeof thenable.status) thenable.then(noop$1, noop$1);
            else {
              thenableState2 = workInProgressRoot;
              if (null !== thenableState2 && 100 < thenableState2.shellSuspendCounter)
                throw Error(formatProdErrorMessage(482));
              thenableState2 = thenable;
              thenableState2.status = "pending";
              thenableState2.then(
                function(fulfilledValue) {
                  if ("pending" === thenable.status) {
                    var fulfilledThenable = thenable;
                    fulfilledThenable.status = "fulfilled";
                    fulfilledThenable.value = fulfilledValue;
                  }
                },
                function(error) {
                  if ("pending" === thenable.status) {
                    var rejectedThenable = thenable;
                    rejectedThenable.status = "rejected";
                    rejectedThenable.reason = error;
                  }
                }
              );
            }
            switch (thenable.status) {
              case "fulfilled":
                return thenable.value;
              case "rejected":
                throw thenableState2 = thenable.reason, checkIfUseWrappedInAsyncCatch(thenableState2), thenableState2;
            }
            suspendedThenable = thenable;
            throw SuspenseException;
        }
      }
      function resolveLazy(lazyType) {
        try {
          var init = lazyType._init;
          return init(lazyType._payload);
        } catch (x) {
          if (null !== x && "object" === typeof x && "function" === typeof x.then)
            throw suspendedThenable = x, SuspenseException;
          throw x;
        }
      }
      var suspendedThenable = null;
      function getSuspendedThenable() {
        if (null === suspendedThenable) throw Error(formatProdErrorMessage(459));
        var thenable = suspendedThenable;
        suspendedThenable = null;
        return thenable;
      }
      function checkIfUseWrappedInAsyncCatch(rejectedReason) {
        if (rejectedReason === SuspenseException || rejectedReason === SuspenseActionException)
          throw Error(formatProdErrorMessage(483));
      }
      var thenableState$1 = null;
      var thenableIndexCounter$1 = 0;
      function unwrapThenable(thenable) {
        var index2 = thenableIndexCounter$1;
        thenableIndexCounter$1 += 1;
        null === thenableState$1 && (thenableState$1 = []);
        return trackUsedThenable(thenableState$1, thenable, index2);
      }
      function coerceRef(workInProgress2, element) {
        element = element.props.ref;
        workInProgress2.ref = void 0 !== element ? element : null;
      }
      function throwOnInvalidObjectTypeImpl(returnFiber, newChild) {
        if (newChild.$$typeof === REACT_LEGACY_ELEMENT_TYPE)
          throw Error(formatProdErrorMessage(525));
        returnFiber = Object.prototype.toString.call(newChild);
        throw Error(
          formatProdErrorMessage(
            31,
            "[object Object]" === returnFiber ? "object with keys {" + Object.keys(newChild).join(", ") + "}" : returnFiber
          )
        );
      }
      function createChildReconciler(shouldTrackSideEffects) {
        function deleteChild(returnFiber, childToDelete) {
          if (shouldTrackSideEffects) {
            var deletions = returnFiber.deletions;
            null === deletions ? (returnFiber.deletions = [childToDelete], returnFiber.flags |= 16) : deletions.push(childToDelete);
          }
        }
        function deleteRemainingChildren(returnFiber, currentFirstChild) {
          if (!shouldTrackSideEffects) return null;
          for (; null !== currentFirstChild; )
            deleteChild(returnFiber, currentFirstChild), currentFirstChild = currentFirstChild.sibling;
          return null;
        }
        function mapRemainingChildren(currentFirstChild) {
          for (var existingChildren = /* @__PURE__ */ new Map(); null !== currentFirstChild; )
            null === currentFirstChild.key ? existingChildren.set(currentFirstChild.index, currentFirstChild) : existingChildren.set(currentFirstChild.key, currentFirstChild), currentFirstChild = currentFirstChild.sibling;
          return existingChildren;
        }
        function useFiber(fiber, pendingProps) {
          fiber = createWorkInProgress(fiber, pendingProps);
          fiber.index = 0;
          fiber.sibling = null;
          return fiber;
        }
        function placeChild(newFiber, lastPlacedIndex, newIndex) {
          newFiber.index = newIndex;
          if (!shouldTrackSideEffects)
            return newFiber.flags |= 1048576, lastPlacedIndex;
          newIndex = newFiber.alternate;
          if (null !== newIndex)
            return newIndex = newIndex.index, newIndex < lastPlacedIndex ? (newFiber.flags |= 2, lastPlacedIndex) : newIndex;
          newFiber.flags |= 134217730;
          return lastPlacedIndex;
        }
        function placeSingleChild(newFiber) {
          shouldTrackSideEffects && null === newFiber.alternate && (newFiber.flags |= 134217730);
          return newFiber;
        }
        function updateTextNode(returnFiber, current, textContent, lanes) {
          if (null === current || 6 !== current.tag)
            return current = createFiberFromText(textContent, returnFiber.mode, lanes), current.return = returnFiber, current;
          current = useFiber(current, textContent);
          current.return = returnFiber;
          return current;
        }
        function updateElement(returnFiber, current, element, lanes) {
          var elementType = element.type;
          if (elementType === REACT_FRAGMENT_TYPE)
            return returnFiber = updateFragment(
              returnFiber,
              current,
              element.props.children,
              lanes,
              element.key
            ), coerceRef(returnFiber, element), returnFiber;
          if (null !== current && (current.elementType === elementType || "object" === typeof elementType && null !== elementType && elementType.$$typeof === REACT_LAZY_TYPE && resolveLazy(elementType) === current.type))
            return current = useFiber(current, element.props), coerceRef(current, element), current.return = returnFiber, current;
          current = createFiberFromTypeAndProps(
            element.type,
            element.key,
            element.props,
            null,
            returnFiber.mode,
            lanes
          );
          coerceRef(current, element);
          current.return = returnFiber;
          return current;
        }
        function updatePortal(returnFiber, current, portal, lanes) {
          if (null === current || 4 !== current.tag || current.stateNode.containerInfo !== portal.containerInfo || current.stateNode.implementation !== portal.implementation)
            return current = createFiberFromPortal(portal, returnFiber.mode, lanes), current.return = returnFiber, current;
          current = useFiber(current, portal.children || []);
          current.return = returnFiber;
          return current;
        }
        function updateFragment(returnFiber, current, fragment, lanes, key) {
          if (null === current || 7 !== current.tag)
            return current = createFiberFromFragment(
              fragment,
              returnFiber.mode,
              lanes,
              key
            ), current.return = returnFiber, current;
          current = useFiber(current, fragment);
          current.return = returnFiber;
          return current;
        }
        function createChild(returnFiber, newChild, lanes) {
          if ("string" === typeof newChild && "" !== newChild || "number" === typeof newChild || "bigint" === typeof newChild)
            return newChild = createFiberFromText(
              "" + newChild,
              returnFiber.mode,
              lanes
            ), newChild.return = returnFiber, newChild;
          if ("object" === typeof newChild && null !== newChild) {
            switch (newChild.$$typeof) {
              case REACT_ELEMENT_TYPE:
                return lanes = createFiberFromTypeAndProps(
                  newChild.type,
                  newChild.key,
                  newChild.props,
                  null,
                  returnFiber.mode,
                  lanes
                ), coerceRef(lanes, newChild), lanes.return = returnFiber, lanes;
              case REACT_PORTAL_TYPE:
                return newChild = createFiberFromPortal(
                  newChild,
                  returnFiber.mode,
                  lanes
                ), newChild.return = returnFiber, newChild;
              case REACT_LAZY_TYPE:
                return newChild = resolveLazy(newChild), createChild(returnFiber, newChild, lanes);
            }
            if (isArrayImpl(newChild) || getIteratorFn(newChild))
              return newChild = createFiberFromFragment(
                newChild,
                returnFiber.mode,
                lanes,
                null
              ), newChild.return = returnFiber, newChild;
            if ("function" === typeof newChild.then)
              return createChild(returnFiber, unwrapThenable(newChild), lanes);
            if (newChild.$$typeof === REACT_CONTEXT_TYPE)
              return createChild(
                returnFiber,
                readContextDuringReconciliation(returnFiber, newChild),
                lanes
              );
            throwOnInvalidObjectTypeImpl(returnFiber, newChild);
          }
          return null;
        }
        function updateSlot(returnFiber, oldFiber, newChild, lanes) {
          var key = null !== oldFiber ? oldFiber.key : null;
          if ("string" === typeof newChild && "" !== newChild || "number" === typeof newChild || "bigint" === typeof newChild)
            return null !== key ? null : updateTextNode(returnFiber, oldFiber, "" + newChild, lanes);
          if ("object" === typeof newChild && null !== newChild) {
            switch (newChild.$$typeof) {
              case REACT_ELEMENT_TYPE:
                return newChild.key === key ? updateElement(returnFiber, oldFiber, newChild, lanes) : null;
              case REACT_PORTAL_TYPE:
                return newChild.key === key ? updatePortal(returnFiber, oldFiber, newChild, lanes) : null;
              case REACT_LAZY_TYPE:
                return newChild = resolveLazy(newChild), updateSlot(returnFiber, oldFiber, newChild, lanes);
            }
            if (isArrayImpl(newChild) || getIteratorFn(newChild))
              return null !== key ? null : updateFragment(returnFiber, oldFiber, newChild, lanes, null);
            if ("function" === typeof newChild.then)
              return updateSlot(
                returnFiber,
                oldFiber,
                unwrapThenable(newChild),
                lanes
              );
            if (newChild.$$typeof === REACT_CONTEXT_TYPE)
              return updateSlot(
                returnFiber,
                oldFiber,
                readContextDuringReconciliation(returnFiber, newChild),
                lanes
              );
            throwOnInvalidObjectTypeImpl(returnFiber, newChild);
          }
          return null;
        }
        function updateFromMap(existingChildren, returnFiber, newIdx, newChild, lanes) {
          if ("string" === typeof newChild && "" !== newChild || "number" === typeof newChild || "bigint" === typeof newChild)
            return existingChildren = existingChildren.get(newIdx) || null, updateTextNode(returnFiber, existingChildren, "" + newChild, lanes);
          if ("object" === typeof newChild && null !== newChild) {
            switch (newChild.$$typeof) {
              case REACT_ELEMENT_TYPE:
                return existingChildren = existingChildren.get(
                  null === newChild.key ? newIdx : newChild.key
                ) || null, updateElement(returnFiber, existingChildren, newChild, lanes);
              case REACT_PORTAL_TYPE:
                return existingChildren = existingChildren.get(
                  null === newChild.key ? newIdx : newChild.key
                ) || null, updatePortal(returnFiber, existingChildren, newChild, lanes);
              case REACT_LAZY_TYPE:
                return newChild = resolveLazy(newChild), updateFromMap(
                  existingChildren,
                  returnFiber,
                  newIdx,
                  newChild,
                  lanes
                );
            }
            if (isArrayImpl(newChild) || getIteratorFn(newChild))
              return existingChildren = existingChildren.get(newIdx) || null, updateFragment(returnFiber, existingChildren, newChild, lanes, null);
            if ("function" === typeof newChild.then)
              return updateFromMap(
                existingChildren,
                returnFiber,
                newIdx,
                unwrapThenable(newChild),
                lanes
              );
            if (newChild.$$typeof === REACT_CONTEXT_TYPE)
              return updateFromMap(
                existingChildren,
                returnFiber,
                newIdx,
                readContextDuringReconciliation(returnFiber, newChild),
                lanes
              );
            throwOnInvalidObjectTypeImpl(returnFiber, newChild);
          }
          return null;
        }
        function reconcileChildrenArray(returnFiber, currentFirstChild, newChildren, lanes) {
          for (var resultingFirstChild = null, previousNewFiber = null, oldFiber = currentFirstChild, newIdx = currentFirstChild = 0, nextOldFiber = null; null !== oldFiber && newIdx < newChildren.length; newIdx++) {
            oldFiber.index > newIdx ? (nextOldFiber = oldFiber, oldFiber = null) : nextOldFiber = oldFiber.sibling;
            var newFiber = updateSlot(
              returnFiber,
              oldFiber,
              newChildren[newIdx],
              lanes
            );
            if (null === newFiber) {
              null === oldFiber && (oldFiber = nextOldFiber);
              break;
            }
            shouldTrackSideEffects && oldFiber && null === newFiber.alternate && deleteChild(returnFiber, oldFiber);
            currentFirstChild = placeChild(newFiber, currentFirstChild, newIdx);
            null === previousNewFiber ? resultingFirstChild = newFiber : previousNewFiber.sibling = newFiber;
            previousNewFiber = newFiber;
            oldFiber = nextOldFiber;
          }
          if (newIdx === newChildren.length)
            return deleteRemainingChildren(returnFiber, oldFiber), isHydrating && pushTreeFork(returnFiber, newIdx), resultingFirstChild;
          if (null === oldFiber) {
            for (; newIdx < newChildren.length; newIdx++)
              oldFiber = createChild(returnFiber, newChildren[newIdx], lanes), null !== oldFiber && (currentFirstChild = placeChild(
                oldFiber,
                currentFirstChild,
                newIdx
              ), null === previousNewFiber ? resultingFirstChild = oldFiber : previousNewFiber.sibling = oldFiber, previousNewFiber = oldFiber);
            isHydrating && pushTreeFork(returnFiber, newIdx);
            return resultingFirstChild;
          }
          for (oldFiber = mapRemainingChildren(oldFiber); newIdx < newChildren.length; newIdx++)
            nextOldFiber = updateFromMap(
              oldFiber,
              returnFiber,
              newIdx,
              newChildren[newIdx],
              lanes
            ), null !== nextOldFiber && (shouldTrackSideEffects && (newFiber = nextOldFiber.alternate, null !== newFiber && oldFiber.delete(null === newFiber.key ? newIdx : newFiber.key)), currentFirstChild = placeChild(
              nextOldFiber,
              currentFirstChild,
              newIdx
            ), null === previousNewFiber ? resultingFirstChild = nextOldFiber : previousNewFiber.sibling = nextOldFiber, previousNewFiber = nextOldFiber);
          shouldTrackSideEffects && oldFiber.forEach(function(child) {
            return deleteChild(returnFiber, child);
          });
          isHydrating && pushTreeFork(returnFiber, newIdx);
          return resultingFirstChild;
        }
        function reconcileChildrenIterator(returnFiber, currentFirstChild, newChildren, lanes) {
          if (null == newChildren) throw Error(formatProdErrorMessage(151));
          for (var resultingFirstChild = null, previousNewFiber = null, oldFiber = currentFirstChild, newIdx = currentFirstChild = 0, nextOldFiber = null, step = newChildren.next(); null !== oldFiber && !step.done; newIdx++, step = newChildren.next()) {
            oldFiber.index > newIdx ? (nextOldFiber = oldFiber, oldFiber = null) : nextOldFiber = oldFiber.sibling;
            var newFiber = updateSlot(returnFiber, oldFiber, step.value, lanes);
            if (null === newFiber) {
              null === oldFiber && (oldFiber = nextOldFiber);
              break;
            }
            shouldTrackSideEffects && oldFiber && null === newFiber.alternate && deleteChild(returnFiber, oldFiber);
            currentFirstChild = placeChild(newFiber, currentFirstChild, newIdx);
            null === previousNewFiber ? resultingFirstChild = newFiber : previousNewFiber.sibling = newFiber;
            previousNewFiber = newFiber;
            oldFiber = nextOldFiber;
          }
          if (step.done)
            return deleteRemainingChildren(returnFiber, oldFiber), isHydrating && pushTreeFork(returnFiber, newIdx), resultingFirstChild;
          if (null === oldFiber) {
            for (; !step.done; newIdx++, step = newChildren.next())
              step = createChild(returnFiber, step.value, lanes), null !== step && (currentFirstChild = placeChild(step, currentFirstChild, newIdx), null === previousNewFiber ? resultingFirstChild = step : previousNewFiber.sibling = step, previousNewFiber = step);
            isHydrating && pushTreeFork(returnFiber, newIdx);
            return resultingFirstChild;
          }
          for (oldFiber = mapRemainingChildren(oldFiber); !step.done; newIdx++, step = newChildren.next())
            step = updateFromMap(oldFiber, returnFiber, newIdx, step.value, lanes), null !== step && (shouldTrackSideEffects && (nextOldFiber = step.alternate, null !== nextOldFiber && oldFiber.delete(
              null === nextOldFiber.key ? newIdx : nextOldFiber.key
            )), currentFirstChild = placeChild(step, currentFirstChild, newIdx), null === previousNewFiber ? resultingFirstChild = step : previousNewFiber.sibling = step, previousNewFiber = step);
          shouldTrackSideEffects && oldFiber.forEach(function(child) {
            return deleteChild(returnFiber, child);
          });
          isHydrating && pushTreeFork(returnFiber, newIdx);
          return resultingFirstChild;
        }
        function reconcileChildFibersImpl(returnFiber, currentFirstChild, newChild, lanes) {
          "object" === typeof newChild && null !== newChild && newChild.type === REACT_FRAGMENT_TYPE && null === newChild.key && void 0 === newChild.props.ref && (newChild = newChild.props.children);
          if ("object" === typeof newChild && null !== newChild) {
            switch (newChild.$$typeof) {
              case REACT_ELEMENT_TYPE:
                a: {
                  for (var key = newChild.key; null !== currentFirstChild; ) {
                    if (currentFirstChild.key === key) {
                      key = newChild.type;
                      if (key === REACT_FRAGMENT_TYPE) {
                        if (7 === currentFirstChild.tag) {
                          deleteRemainingChildren(
                            returnFiber,
                            currentFirstChild.sibling
                          );
                          lanes = useFiber(
                            currentFirstChild,
                            newChild.props.children
                          );
                          coerceRef(lanes, newChild);
                          lanes.return = returnFiber;
                          returnFiber = lanes;
                          break a;
                        }
                      } else if (currentFirstChild.elementType === key || "object" === typeof key && null !== key && key.$$typeof === REACT_LAZY_TYPE && resolveLazy(key) === currentFirstChild.type) {
                        deleteRemainingChildren(
                          returnFiber,
                          currentFirstChild.sibling
                        );
                        lanes = useFiber(currentFirstChild, newChild.props);
                        coerceRef(lanes, newChild);
                        lanes.return = returnFiber;
                        returnFiber = lanes;
                        break a;
                      }
                      deleteRemainingChildren(returnFiber, currentFirstChild);
                      break;
                    } else deleteChild(returnFiber, currentFirstChild);
                    currentFirstChild = currentFirstChild.sibling;
                  }
                  newChild.type === REACT_FRAGMENT_TYPE ? (lanes = createFiberFromFragment(
                    newChild.props.children,
                    returnFiber.mode,
                    lanes,
                    newChild.key
                  ), coerceRef(lanes, newChild), lanes.return = returnFiber, returnFiber = lanes) : (lanes = createFiberFromTypeAndProps(
                    newChild.type,
                    newChild.key,
                    newChild.props,
                    null,
                    returnFiber.mode,
                    lanes
                  ), coerceRef(lanes, newChild), lanes.return = returnFiber, returnFiber = lanes);
                }
                return placeSingleChild(returnFiber);
              case REACT_PORTAL_TYPE:
                a: {
                  for (key = newChild.key; null !== currentFirstChild; ) {
                    if (currentFirstChild.key === key)
                      if (4 === currentFirstChild.tag && currentFirstChild.stateNode.containerInfo === newChild.containerInfo && currentFirstChild.stateNode.implementation === newChild.implementation) {
                        deleteRemainingChildren(
                          returnFiber,
                          currentFirstChild.sibling
                        );
                        lanes = useFiber(currentFirstChild, newChild.children || []);
                        lanes.return = returnFiber;
                        returnFiber = lanes;
                        break a;
                      } else {
                        deleteRemainingChildren(returnFiber, currentFirstChild);
                        break;
                      }
                    else deleteChild(returnFiber, currentFirstChild);
                    currentFirstChild = currentFirstChild.sibling;
                  }
                  lanes = createFiberFromPortal(newChild, returnFiber.mode, lanes);
                  lanes.return = returnFiber;
                  returnFiber = lanes;
                }
                return placeSingleChild(returnFiber);
              case REACT_LAZY_TYPE:
                return newChild = resolveLazy(newChild), reconcileChildFibersImpl(
                  returnFiber,
                  currentFirstChild,
                  newChild,
                  lanes
                );
            }
            if (isArrayImpl(newChild))
              return reconcileChildrenArray(
                returnFiber,
                currentFirstChild,
                newChild,
                lanes
              );
            if (getIteratorFn(newChild)) {
              key = getIteratorFn(newChild);
              if ("function" !== typeof key) throw Error(formatProdErrorMessage(150));
              newChild = key.call(newChild);
              return reconcileChildrenIterator(
                returnFiber,
                currentFirstChild,
                newChild,
                lanes
              );
            }
            if ("function" === typeof newChild.then)
              return reconcileChildFibersImpl(
                returnFiber,
                currentFirstChild,
                unwrapThenable(newChild),
                lanes
              );
            if (newChild.$$typeof === REACT_CONTEXT_TYPE)
              return reconcileChildFibersImpl(
                returnFiber,
                currentFirstChild,
                readContextDuringReconciliation(returnFiber, newChild),
                lanes
              );
            throwOnInvalidObjectTypeImpl(returnFiber, newChild);
          }
          return "string" === typeof newChild && "" !== newChild || "number" === typeof newChild || "bigint" === typeof newChild ? (newChild = "" + newChild, null !== currentFirstChild && 6 === currentFirstChild.tag ? (deleteRemainingChildren(returnFiber, currentFirstChild.sibling), lanes = useFiber(currentFirstChild, newChild), lanes.return = returnFiber, returnFiber = lanes) : (deleteRemainingChildren(returnFiber, currentFirstChild), lanes = createFiberFromText(newChild, returnFiber.mode, lanes), lanes.return = returnFiber, returnFiber = lanes), placeSingleChild(returnFiber)) : deleteRemainingChildren(returnFiber, currentFirstChild);
        }
        return function(returnFiber, currentFirstChild, newChild, lanes) {
          try {
            thenableIndexCounter$1 = 0;
            var firstChildFiber = reconcileChildFibersImpl(
              returnFiber,
              currentFirstChild,
              newChild,
              lanes
            );
            thenableState$1 = null;
            return firstChildFiber;
          } catch (x) {
            if (x === SuspenseException || x === SuspenseActionException) throw x;
            var fiber = createFiberImplClass(29, x, null, returnFiber.mode);
            fiber.lanes = lanes;
            fiber.return = returnFiber;
            return fiber;
          } finally {
          }
        };
      }
      var reconcileChildFibers = createChildReconciler(true);
      var mountChildFibers = createChildReconciler(false);
      var hasForceUpdate = false;
      function initializeUpdateQueue(fiber) {
        fiber.updateQueue = {
          baseState: fiber.memoizedState,
          firstBaseUpdate: null,
          lastBaseUpdate: null,
          shared: { pending: null, lanes: 0, hiddenCallbacks: null },
          callbacks: null
        };
      }
      function cloneUpdateQueue(current, workInProgress2) {
        current = current.updateQueue;
        workInProgress2.updateQueue === current && (workInProgress2.updateQueue = {
          baseState: current.baseState,
          firstBaseUpdate: current.firstBaseUpdate,
          lastBaseUpdate: current.lastBaseUpdate,
          shared: current.shared,
          callbacks: null
        });
      }
      function createUpdate(lane) {
        return { lane, tag: 0, payload: null, callback: null, next: null };
      }
      function enqueueUpdate(fiber, update, lane) {
        var updateQueue = fiber.updateQueue;
        if (null === updateQueue) return null;
        updateQueue = updateQueue.shared;
        if (0 !== (executionContext & 2)) {
          var pending = updateQueue.pending;
          null === pending ? update.next = update : (update.next = pending.next, pending.next = update);
          updateQueue.pending = update;
          update = getRootForUpdatedFiber(fiber);
          markUpdateLaneFromFiberToRoot(fiber, null, lane);
          return update;
        }
        enqueueUpdate$1(fiber, updateQueue, update, lane);
        return getRootForUpdatedFiber(fiber);
      }
      function entangleTransitions(root2, fiber, lane) {
        fiber = fiber.updateQueue;
        if (null !== fiber && (fiber = fiber.shared, 0 !== (lane & 4194048))) {
          var queueLanes = fiber.lanes;
          queueLanes &= root2.pendingLanes;
          lane |= queueLanes;
          fiber.lanes = lane;
          markRootEntangled(root2, lane);
        }
      }
      function enqueueCapturedUpdate(workInProgress2, capturedUpdate) {
        var queue = workInProgress2.updateQueue, current = workInProgress2.alternate;
        if (null !== current && (current = current.updateQueue, queue === current)) {
          var newFirst = null, newLast = null;
          queue = queue.firstBaseUpdate;
          if (null !== queue) {
            do {
              var clone = {
                lane: queue.lane,
                tag: queue.tag,
                payload: queue.payload,
                callback: null,
                next: null
              };
              null === newLast ? newFirst = newLast = clone : newLast = newLast.next = clone;
              queue = queue.next;
            } while (null !== queue);
            null === newLast ? newFirst = newLast = capturedUpdate : newLast = newLast.next = capturedUpdate;
          } else newFirst = newLast = capturedUpdate;
          queue = {
            baseState: current.baseState,
            firstBaseUpdate: newFirst,
            lastBaseUpdate: newLast,
            shared: current.shared,
            callbacks: current.callbacks
          };
          workInProgress2.updateQueue = queue;
          return;
        }
        workInProgress2 = queue.lastBaseUpdate;
        null === workInProgress2 ? queue.firstBaseUpdate = capturedUpdate : workInProgress2.next = capturedUpdate;
        queue.lastBaseUpdate = capturedUpdate;
      }
      var didReadFromEntangledAsyncAction = false;
      function suspendIfUpdateReadFromEntangledAsyncAction() {
        if (didReadFromEntangledAsyncAction) {
          var entangledActionThenable = currentEntangledActionThenable;
          if (null !== entangledActionThenable) throw entangledActionThenable;
        }
      }
      function processUpdateQueue(workInProgress$jscomp$0, props, instance$jscomp$0, renderLanes2) {
        didReadFromEntangledAsyncAction = false;
        var queue = workInProgress$jscomp$0.updateQueue;
        hasForceUpdate = false;
        var firstBaseUpdate = queue.firstBaseUpdate, lastBaseUpdate = queue.lastBaseUpdate, pendingQueue = queue.shared.pending;
        if (null !== pendingQueue) {
          queue.shared.pending = null;
          var lastPendingUpdate = pendingQueue, firstPendingUpdate = lastPendingUpdate.next;
          lastPendingUpdate.next = null;
          null === lastBaseUpdate ? firstBaseUpdate = firstPendingUpdate : lastBaseUpdate.next = firstPendingUpdate;
          lastBaseUpdate = lastPendingUpdate;
          var current = workInProgress$jscomp$0.alternate;
          null !== current && (current = current.updateQueue, pendingQueue = current.lastBaseUpdate, pendingQueue !== lastBaseUpdate && (null === pendingQueue ? current.firstBaseUpdate = firstPendingUpdate : pendingQueue.next = firstPendingUpdate, current.lastBaseUpdate = lastPendingUpdate));
        }
        if (null !== firstBaseUpdate) {
          var newState = queue.baseState;
          lastBaseUpdate = 0;
          current = firstPendingUpdate = lastPendingUpdate = null;
          pendingQueue = firstBaseUpdate;
          do {
            var updateLane = pendingQueue.lane & -536870913, isHiddenUpdate = updateLane !== pendingQueue.lane;
            if (isHiddenUpdate ? (workInProgressRootRenderLanes & updateLane) === updateLane : (renderLanes2 & updateLane) === updateLane) {
              0 !== updateLane && updateLane === currentEntangledLane && (didReadFromEntangledAsyncAction = true);
              null !== current && (current = current.next = {
                lane: 0,
                tag: pendingQueue.tag,
                payload: pendingQueue.payload,
                callback: null,
                next: null
              });
              a: {
                var workInProgress2 = workInProgress$jscomp$0, update = pendingQueue;
                updateLane = props;
                var instance = instance$jscomp$0;
                switch (update.tag) {
                  case 1:
                    workInProgress2 = update.payload;
                    if ("function" === typeof workInProgress2) {
                      newState = workInProgress2.call(instance, newState, updateLane);
                      break a;
                    }
                    newState = workInProgress2;
                    break a;
                  case 3:
                    workInProgress2.flags = workInProgress2.flags & -65537 | 128;
                  case 0:
                    workInProgress2 = update.payload;
                    updateLane = "function" === typeof workInProgress2 ? workInProgress2.call(instance, newState, updateLane) : workInProgress2;
                    if (null === updateLane || void 0 === updateLane) break a;
                    newState = assign({}, newState, updateLane);
                    break a;
                  case 2:
                    hasForceUpdate = true;
                }
              }
              updateLane = pendingQueue.callback;
              null !== updateLane && (workInProgress$jscomp$0.flags |= 64, isHiddenUpdate && (workInProgress$jscomp$0.flags |= 8192), isHiddenUpdate = queue.callbacks, null === isHiddenUpdate ? queue.callbacks = [updateLane] : isHiddenUpdate.push(updateLane));
            } else
              isHiddenUpdate = {
                lane: updateLane,
                tag: pendingQueue.tag,
                payload: pendingQueue.payload,
                callback: pendingQueue.callback,
                next: null
              }, null === current ? (firstPendingUpdate = current = isHiddenUpdate, lastPendingUpdate = newState) : current = current.next = isHiddenUpdate, lastBaseUpdate |= updateLane;
            pendingQueue = pendingQueue.next;
            if (null === pendingQueue)
              if (pendingQueue = queue.shared.pending, null === pendingQueue)
                break;
              else
                isHiddenUpdate = pendingQueue, pendingQueue = isHiddenUpdate.next, isHiddenUpdate.next = null, queue.lastBaseUpdate = isHiddenUpdate, queue.shared.pending = null;
          } while (1);
          null === current && (lastPendingUpdate = newState);
          queue.baseState = lastPendingUpdate;
          queue.firstBaseUpdate = firstPendingUpdate;
          queue.lastBaseUpdate = current;
          null === firstBaseUpdate && (queue.shared.lanes = 0);
          workInProgressRootSkippedLanes |= lastBaseUpdate;
          workInProgress$jscomp$0.lanes = lastBaseUpdate;
          workInProgress$jscomp$0.memoizedState = newState;
        }
      }
      function callCallback(callback, context) {
        if ("function" !== typeof callback)
          throw Error(formatProdErrorMessage(191, callback));
        callback.call(context);
      }
      function commitCallbacks(updateQueue, context) {
        var callbacks = updateQueue.callbacks;
        if (null !== callbacks)
          for (updateQueue.callbacks = null, updateQueue = 0; updateQueue < callbacks.length; updateQueue++)
            callCallback(callbacks[updateQueue], context);
      }
      var currentTreeHiddenStackCursor = createCursor(null);
      var prevEntangledRenderLanesCursor = createCursor(0);
      function pushHiddenContext(fiber, context) {
        fiber = entangledRenderLanes;
        push(prevEntangledRenderLanesCursor, fiber);
        push(currentTreeHiddenStackCursor, context);
        entangledRenderLanes = fiber | context.baseLanes;
      }
      function reuseHiddenContextOnStack() {
        push(prevEntangledRenderLanesCursor, entangledRenderLanes);
        push(currentTreeHiddenStackCursor, currentTreeHiddenStackCursor.current);
      }
      function popHiddenContext() {
        entangledRenderLanes = prevEntangledRenderLanesCursor.current;
        pop(currentTreeHiddenStackCursor);
        pop(prevEntangledRenderLanesCursor);
      }
      var suspenseHandlerStackCursor = createCursor(null);
      var shellBoundary = null;
      function pushPrimaryTreeSuspenseHandler(handler) {
        var current = handler.alternate;
        push(suspenseStackCursor, suspenseStackCursor.current & 1);
        push(suspenseHandlerStackCursor, handler);
        null === shellBoundary && (null === current || null !== currentTreeHiddenStackCursor.current ? shellBoundary = handler : null !== current.memoizedState && (shellBoundary = handler));
      }
      function pushDehydratedActivitySuspenseHandler(fiber) {
        push(suspenseStackCursor, suspenseStackCursor.current);
        push(suspenseHandlerStackCursor, fiber);
        null === shellBoundary && (shellBoundary = fiber);
      }
      function pushOffscreenSuspenseHandler(fiber) {
        22 === fiber.tag ? (push(suspenseStackCursor, suspenseStackCursor.current), push(suspenseHandlerStackCursor, fiber), null === shellBoundary && (shellBoundary = fiber)) : reuseSuspenseHandlerOnStack();
      }
      function reuseSuspenseHandlerOnStack() {
        push(suspenseStackCursor, suspenseStackCursor.current);
        push(suspenseHandlerStackCursor, suspenseHandlerStackCursor.current);
      }
      function popSuspenseHandler(fiber) {
        pop(suspenseHandlerStackCursor);
        shellBoundary === fiber && (shellBoundary = null);
        pop(suspenseStackCursor);
      }
      var suspenseStackCursor = createCursor(0);
      function pushSuspenseListContext(fiber, newContext) {
        push(suspenseHandlerStackCursor, suspenseHandlerStackCursor.current);
        push(suspenseStackCursor, newContext);
      }
      function popSuspenseListContext(fiber) {
        pop(suspenseStackCursor);
        pop(suspenseHandlerStackCursor);
        shellBoundary === fiber && (shellBoundary = null);
      }
      function findFirstSuspended(row) {
        for (var node = row; null !== node; ) {
          if (13 === node.tag) {
            var state = node.memoizedState;
            if (null !== state && (state = state.dehydrated, null === state || isSuspenseInstancePending(state) || isSuspenseInstanceFallback(state)))
              return node;
          } else if (19 === node.tag && "independent" !== node.memoizedProps.revealOrder) {
            if (0 !== (node.flags & 128)) return node;
          } else if (null !== node.child) {
            node.child.return = node;
            node = node.child;
            continue;
          }
          if (node === row) break;
          for (; null === node.sibling; ) {
            if (null === node.return || node.return === row) return null;
            node = node.return;
          }
          node.sibling.return = node.return;
          node = node.sibling;
        }
        return null;
      }
      var renderLanes = 0;
      var currentlyRenderingFiber = null;
      var currentHook = null;
      var workInProgressHook = null;
      var didScheduleRenderPhaseUpdate = false;
      var didScheduleRenderPhaseUpdateDuringThisPass = false;
      var shouldDoubleInvokeUserFnsInHooksDEV = false;
      var localIdCounter = 0;
      var thenableIndexCounter = 0;
      var thenableState = null;
      var globalClientIdCounter = 0;
      function throwInvalidHookError() {
        throw Error(formatProdErrorMessage(321));
      }
      function areHookInputsEqual(nextDeps, prevDeps) {
        if (null === prevDeps) return false;
        for (var i = 0; i < prevDeps.length && i < nextDeps.length; i++)
          if (!objectIs(nextDeps[i], prevDeps[i])) return false;
        return true;
      }
      function renderWithHooks(current, workInProgress2, Component, props, secondArg, nextRenderLanes) {
        renderLanes = nextRenderLanes;
        currentlyRenderingFiber = workInProgress2;
        workInProgress2.memoizedState = null;
        workInProgress2.updateQueue = null;
        workInProgress2.lanes = 0;
        ReactSharedInternals.H = null === current || null === current.memoizedState ? HooksDispatcherOnMount : HooksDispatcherOnUpdate;
        shouldDoubleInvokeUserFnsInHooksDEV = false;
        nextRenderLanes = Component(props, secondArg);
        shouldDoubleInvokeUserFnsInHooksDEV = false;
        didScheduleRenderPhaseUpdateDuringThisPass && (nextRenderLanes = renderWithHooksAgain(
          workInProgress2,
          Component,
          props,
          secondArg
        ));
        finishRenderingHooks(current);
        return nextRenderLanes;
      }
      function finishRenderingHooks(current) {
        ReactSharedInternals.H = ContextOnlyDispatcher;
        var didRenderTooFewHooks = null !== currentHook && null !== currentHook.next;
        renderLanes = 0;
        workInProgressHook = currentHook = currentlyRenderingFiber = null;
        didScheduleRenderPhaseUpdate = false;
        thenableIndexCounter = 0;
        thenableState = null;
        if (didRenderTooFewHooks) throw Error(formatProdErrorMessage(300));
        null === current || didReceiveUpdate || (current = current.dependencies, null !== current && checkIfContextChanged(current) && (didReceiveUpdate = true));
      }
      function renderWithHooksAgain(workInProgress2, Component, props, secondArg) {
        currentlyRenderingFiber = workInProgress2;
        var numberOfReRenders = 0;
        do {
          didScheduleRenderPhaseUpdateDuringThisPass && (thenableState = null);
          thenableIndexCounter = 0;
          didScheduleRenderPhaseUpdateDuringThisPass = false;
          if (25 <= numberOfReRenders) throw Error(formatProdErrorMessage(301));
          numberOfReRenders += 1;
          workInProgressHook = currentHook = null;
          if (null != workInProgress2.updateQueue) {
            var children = workInProgress2.updateQueue;
            children.lastEffect = null;
            children.events = null;
            children.stores = null;
            null != children.memoCache && (children.memoCache.index = 0);
          }
          ReactSharedInternals.H = HooksDispatcherOnRerender;
          children = Component(props, secondArg);
        } while (didScheduleRenderPhaseUpdateDuringThisPass);
        return children;
      }
      function TransitionAwareHostComponent() {
        var dispatcher = ReactSharedInternals.H, maybeThenable = dispatcher.useState()[0];
        maybeThenable = "function" === typeof maybeThenable.then ? useThenable(maybeThenable) : maybeThenable;
        dispatcher = dispatcher.useState()[0];
        (null !== currentHook ? currentHook.memoizedState : null) !== dispatcher && (currentlyRenderingFiber.flags |= 1024);
        return maybeThenable;
      }
      function checkDidRenderIdHook() {
        var didRenderIdHook = 0 !== localIdCounter;
        localIdCounter = 0;
        return didRenderIdHook;
      }
      function bailoutHooks(current, workInProgress2, lanes) {
        workInProgress2.updateQueue = current.updateQueue;
        workInProgress2.flags &= -2053;
        current.lanes &= ~lanes;
      }
      function resetHooksOnUnwind(workInProgress2) {
        if (didScheduleRenderPhaseUpdate) {
          for (workInProgress2 = workInProgress2.memoizedState; null !== workInProgress2; ) {
            var queue = workInProgress2.queue;
            null !== queue && (queue.pending = null);
            workInProgress2 = workInProgress2.next;
          }
          didScheduleRenderPhaseUpdate = false;
        }
        renderLanes = 0;
        workInProgressHook = currentHook = currentlyRenderingFiber = null;
        didScheduleRenderPhaseUpdateDuringThisPass = false;
        thenableIndexCounter = localIdCounter = 0;
        thenableState = null;
      }
      function mountWorkInProgressHook() {
        var hook = {
          memoizedState: null,
          baseState: null,
          baseQueue: null,
          queue: null,
          next: null
        };
        null === workInProgressHook ? currentlyRenderingFiber.memoizedState = workInProgressHook = hook : workInProgressHook = workInProgressHook.next = hook;
        return workInProgressHook;
      }
      function updateWorkInProgressHook() {
        if (null === currentHook) {
          var nextCurrentHook = currentlyRenderingFiber.alternate;
          nextCurrentHook = null !== nextCurrentHook ? nextCurrentHook.memoizedState : null;
        } else nextCurrentHook = currentHook.next;
        var nextWorkInProgressHook = null === workInProgressHook ? currentlyRenderingFiber.memoizedState : workInProgressHook.next;
        if (null !== nextWorkInProgressHook)
          workInProgressHook = nextWorkInProgressHook, currentHook = nextCurrentHook;
        else {
          if (null === nextCurrentHook) {
            if (null === currentlyRenderingFiber.alternate)
              throw Error(formatProdErrorMessage(467));
            throw Error(formatProdErrorMessage(310));
          }
          currentHook = nextCurrentHook;
          nextCurrentHook = {
            memoizedState: currentHook.memoizedState,
            baseState: currentHook.baseState,
            baseQueue: currentHook.baseQueue,
            queue: currentHook.queue,
            next: null
          };
          null === workInProgressHook ? currentlyRenderingFiber.memoizedState = workInProgressHook = nextCurrentHook : workInProgressHook = workInProgressHook.next = nextCurrentHook;
        }
        return workInProgressHook;
      }
      function createFunctionComponentUpdateQueue() {
        return { lastEffect: null, events: null, stores: null, memoCache: null };
      }
      function useThenable(thenable) {
        var index2 = thenableIndexCounter;
        thenableIndexCounter += 1;
        null === thenableState && (thenableState = []);
        thenable = trackUsedThenable(thenableState, thenable, index2);
        index2 = currentlyRenderingFiber;
        null === (null === workInProgressHook ? index2.memoizedState : workInProgressHook.next) && (index2 = index2.alternate, ReactSharedInternals.H = null === index2 || null === index2.memoizedState ? HooksDispatcherOnMount : HooksDispatcherOnUpdate);
        return thenable;
      }
      function use(usable) {
        if (null !== usable && "object" === typeof usable) {
          if ("function" === typeof usable.then) return useThenable(usable);
          if (usable.$$typeof === REACT_RECOVERABLE_TYPE) return;
          if (usable.$$typeof === REACT_CONTEXT_TYPE) return readContext(usable);
        }
        throw Error(formatProdErrorMessage(438, String(usable)));
      }
      function useMemoCache(size) {
        var memoCache = null, updateQueue = currentlyRenderingFiber.updateQueue;
        null !== updateQueue && (memoCache = updateQueue.memoCache);
        if (null == memoCache) {
          var current = currentlyRenderingFiber.alternate;
          null !== current && (current = current.updateQueue, null !== current && (current = current.memoCache, null != current && (memoCache = {
            data: current.data.map(function(array) {
              return array.slice();
            }),
            index: 0
          })));
        }
        null == memoCache && (memoCache = { data: [], index: 0 });
        null === updateQueue && (updateQueue = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = updateQueue);
        updateQueue.memoCache = memoCache;
        updateQueue = memoCache.data[memoCache.index];
        if (void 0 === updateQueue)
          for (updateQueue = memoCache.data[memoCache.index] = Array(size), current = 0; current < size; current++)
            updateQueue[current] = REACT_MEMO_CACHE_SENTINEL;
        memoCache.index++;
        return updateQueue;
      }
      function basicStateReducer(state, action) {
        return "function" === typeof action ? action(state) : action;
      }
      function updateReducer(reducer) {
        var hook = updateWorkInProgressHook();
        return updateReducerImpl(hook, currentHook, reducer);
      }
      function updateReducerImpl(hook, current, reducer) {
        var queue = hook.queue;
        if (null === queue) throw Error(formatProdErrorMessage(311));
        queue.lastRenderedReducer = reducer;
        var baseQueue = hook.baseQueue, pendingQueue = queue.pending;
        if (null !== pendingQueue) {
          if (null !== baseQueue) {
            var baseFirst = baseQueue.next;
            baseQueue.next = pendingQueue.next;
            pendingQueue.next = baseFirst;
          }
          current.baseQueue = baseQueue = pendingQueue;
          queue.pending = null;
        }
        pendingQueue = hook.baseState;
        if (null === baseQueue) hook.memoizedState = pendingQueue;
        else {
          current = baseQueue.next;
          var newBaseQueueFirst = baseFirst = null, newBaseQueueLast = null, update = current, didReadFromEntangledAsyncAction$64 = false;
          do {
            var updateLane = update.lane & -536870913;
            if (updateLane !== update.lane ? (workInProgressRootRenderLanes & updateLane) === updateLane : (renderLanes & updateLane) === updateLane) {
              var revertLane = update.revertLane;
              if (0 === revertLane)
                null !== newBaseQueueLast && (newBaseQueueLast = newBaseQueueLast.next = {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: update.action,
                  hasEagerState: update.hasEagerState,
                  eagerState: update.eagerState,
                  next: null
                }), updateLane === currentEntangledLane && (didReadFromEntangledAsyncAction$64 = true);
              else if ((renderLanes & revertLane) === revertLane) {
                update = update.next;
                revertLane === currentEntangledLane && (didReadFromEntangledAsyncAction$64 = true);
                continue;
              } else
                updateLane = {
                  lane: 0,
                  revertLane: update.revertLane,
                  gesture: null,
                  action: update.action,
                  hasEagerState: update.hasEagerState,
                  eagerState: update.eagerState,
                  next: null
                }, null === newBaseQueueLast ? (newBaseQueueFirst = newBaseQueueLast = updateLane, baseFirst = pendingQueue) : newBaseQueueLast = newBaseQueueLast.next = updateLane, currentlyRenderingFiber.lanes |= revertLane, workInProgressRootSkippedLanes |= revertLane;
              updateLane = update.action;
              shouldDoubleInvokeUserFnsInHooksDEV && reducer(pendingQueue, updateLane);
              pendingQueue = update.hasEagerState ? update.eagerState : reducer(pendingQueue, updateLane);
            } else
              revertLane = {
                lane: updateLane,
                revertLane: update.revertLane,
                gesture: update.gesture,
                action: update.action,
                hasEagerState: update.hasEagerState,
                eagerState: update.eagerState,
                next: null
              }, null === newBaseQueueLast ? (newBaseQueueFirst = newBaseQueueLast = revertLane, baseFirst = pendingQueue) : newBaseQueueLast = newBaseQueueLast.next = revertLane, currentlyRenderingFiber.lanes |= updateLane, workInProgressRootSkippedLanes |= updateLane;
            update = update.next;
          } while (null !== update && update !== current);
          null === newBaseQueueLast ? baseFirst = pendingQueue : newBaseQueueLast.next = newBaseQueueFirst;
          if (!objectIs(pendingQueue, hook.memoizedState) && (didReceiveUpdate = true, didReadFromEntangledAsyncAction$64 && (reducer = currentEntangledActionThenable, null !== reducer)))
            throw reducer;
          hook.memoizedState = pendingQueue;
          hook.baseState = baseFirst;
          hook.baseQueue = newBaseQueueLast;
          queue.lastRenderedState = pendingQueue;
        }
        null === baseQueue && (queue.lanes = 0);
        return [hook.memoizedState, queue.dispatch];
      }
      function rerenderReducer(reducer) {
        var hook = updateWorkInProgressHook(), queue = hook.queue;
        if (null === queue) throw Error(formatProdErrorMessage(311));
        queue.lastRenderedReducer = reducer;
        var dispatch = queue.dispatch, lastRenderPhaseUpdate = queue.pending, newState = hook.memoizedState;
        if (null !== lastRenderPhaseUpdate) {
          queue.pending = null;
          var update = lastRenderPhaseUpdate = lastRenderPhaseUpdate.next;
          do
            newState = reducer(newState, update.action), update = update.next;
          while (update !== lastRenderPhaseUpdate);
          objectIs(newState, hook.memoizedState) || (didReceiveUpdate = true);
          hook.memoizedState = newState;
          null === hook.baseQueue && (hook.baseState = newState);
          queue.lastRenderedState = newState;
        }
        return [newState, dispatch];
      }
      function updateSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
        var fiber = currentlyRenderingFiber, hook = updateWorkInProgressHook(), isHydrating$jscomp$0 = isHydrating;
        if (isHydrating$jscomp$0) {
          if (void 0 === getServerSnapshot) throw Error(formatProdErrorMessage(407));
          getServerSnapshot = getServerSnapshot();
        } else getServerSnapshot = getSnapshot();
        var snapshotChanged = !objectIs(
          (currentHook || hook).memoizedState,
          getServerSnapshot
        );
        snapshotChanged && (hook.memoizedState = getServerSnapshot, didReceiveUpdate = true);
        hook = hook.queue;
        updateEffect(subscribeToStore.bind(null, fiber, hook, subscribe), [
          subscribe
        ]);
        subscribe = hook.getSnapshot !== getSnapshot || snapshotChanged || null !== workInProgressHook && 0 !== (workInProgressHook.memoizedState.tag & 1);
        pushSimpleEffect(
          subscribe ? 9 : 8,
          { destroy: void 0 },
          updateStoreInstance.bind(null, fiber, hook, getServerSnapshot, getSnapshot),
          null
        );
        if (subscribe) {
          fiber.flags |= 2048;
          if (null === workInProgressRoot) throw Error(formatProdErrorMessage(349));
          isHydrating$jscomp$0 || 0 !== (renderLanes & 127) || pushStoreConsistencyCheck(fiber, getSnapshot, getServerSnapshot);
        }
        return getServerSnapshot;
      }
      function pushStoreConsistencyCheck(fiber, getSnapshot, renderedSnapshot) {
        fiber.flags |= 16384;
        fiber = { getSnapshot, value: renderedSnapshot };
        getSnapshot = currentlyRenderingFiber.updateQueue;
        null === getSnapshot ? (getSnapshot = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = getSnapshot, getSnapshot.stores = [fiber]) : (renderedSnapshot = getSnapshot.stores, null === renderedSnapshot ? getSnapshot.stores = [fiber] : renderedSnapshot.push(fiber));
      }
      function updateStoreInstance(fiber, inst, nextSnapshot, getSnapshot) {
        inst.value = nextSnapshot;
        inst.getSnapshot = getSnapshot;
        checkIfSnapshotChanged(inst) && forceStoreRerender(fiber);
      }
      function subscribeToStore(fiber, inst, subscribe) {
        return subscribe(function() {
          checkIfSnapshotChanged(inst) && forceStoreRerender(fiber);
        });
      }
      function checkIfSnapshotChanged(inst) {
        var latestGetSnapshot = inst.getSnapshot;
        inst = inst.value;
        try {
          var nextValue = latestGetSnapshot();
          return !objectIs(inst, nextValue);
        } catch (error) {
          return true;
        }
      }
      function forceStoreRerender(fiber) {
        var root2 = enqueueConcurrentRenderForLane(fiber, 2);
        null !== root2 && scheduleUpdateOnFiber(root2, fiber, 2);
      }
      function mountStateImpl(initialState) {
        var hook = mountWorkInProgressHook();
        if ("function" === typeof initialState) {
          var initialStateInitializer = initialState;
          initialState = initialStateInitializer();
          if (shouldDoubleInvokeUserFnsInHooksDEV) {
            setIsStrictModeForDevtools(true);
            try {
              initialStateInitializer();
            } finally {
              setIsStrictModeForDevtools(false);
            }
          }
        }
        hook.memoizedState = hook.baseState = initialState;
        hook.queue = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: basicStateReducer,
          lastRenderedState: initialState
        };
        return hook;
      }
      function updateOptimisticImpl(hook, current, passthrough, reducer) {
        hook.baseState = passthrough;
        return updateReducerImpl(
          hook,
          currentHook,
          "function" === typeof reducer ? reducer : basicStateReducer
        );
      }
      function dispatchActionState(fiber, actionQueue, setPendingState, setState, payload) {
        if (isRenderPhaseUpdate(fiber)) throw Error(formatProdErrorMessage(485));
        fiber = actionQueue.action;
        if (null !== fiber) {
          var actionNode = {
            payload,
            action: fiber,
            next: null,
            isTransition: true,
            status: "pending",
            value: null,
            reason: null,
            listeners: [],
            then: function(listener) {
              actionNode.listeners.push(listener);
            }
          };
          null !== ReactSharedInternals.T ? setPendingState(true) : actionNode.isTransition = false;
          setState(actionNode);
          setPendingState = actionQueue.pending;
          null === setPendingState ? (actionNode.next = actionQueue.pending = actionNode, runActionStateAction(actionQueue, actionNode)) : (actionNode.next = setPendingState.next, actionQueue.pending = setPendingState.next = actionNode);
        }
      }
      function runActionStateAction(actionQueue, node) {
        var action = node.action, payload = node.payload, prevState = actionQueue.state;
        if (node.isTransition) {
          var prevTransition = ReactSharedInternals.T, currentTransition = {};
          currentTransition.types = null !== prevTransition ? prevTransition.types : null;
          ReactSharedInternals.T = currentTransition;
          try {
            var returnValue = action(prevState, payload), onStartTransitionFinish = ReactSharedInternals.S;
            null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
            handleActionReturnValue(actionQueue, node, returnValue);
          } catch (error) {
            onActionError(actionQueue, node, error);
          } finally {
            null !== prevTransition && null !== currentTransition.types && (prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
          }
        } else
          try {
            prevTransition = action(prevState, payload), handleActionReturnValue(actionQueue, node, prevTransition);
          } catch (error$70) {
            onActionError(actionQueue, node, error$70);
          }
      }
      function handleActionReturnValue(actionQueue, node, returnValue) {
        null !== returnValue && "object" === typeof returnValue && "function" === typeof returnValue.then ? returnValue.then(
          function(nextState) {
            onActionSuccess(actionQueue, node, nextState);
          },
          function(error) {
            return onActionError(actionQueue, node, error);
          }
        ) : onActionSuccess(actionQueue, node, returnValue);
      }
      function onActionSuccess(actionQueue, actionNode, nextState) {
        actionNode.status = "fulfilled";
        actionNode.value = nextState;
        notifyActionListeners(actionNode);
        actionQueue.state = nextState;
        actionNode = actionQueue.pending;
        null !== actionNode && (nextState = actionNode.next, nextState === actionNode ? actionQueue.pending = null : (nextState = nextState.next, actionNode.next = nextState, runActionStateAction(actionQueue, nextState)));
      }
      function onActionError(actionQueue, actionNode, error) {
        var last = actionQueue.pending;
        actionQueue.pending = null;
        if (null !== last) {
          last = last.next;
          do
            actionNode.status = "rejected", actionNode.reason = error, notifyActionListeners(actionNode), actionNode = actionNode.next;
          while (actionNode !== last);
        }
        actionQueue.action = null;
      }
      function notifyActionListeners(actionNode) {
        actionNode = actionNode.listeners;
        for (var i = 0; i < actionNode.length; i++) (0, actionNode[i])();
      }
      function actionStateReducer(oldState, newState) {
        return newState;
      }
      function mountActionState(action, initialStateProp) {
        if (isHydrating) {
          var ssrFormState = workInProgressRoot.formState;
          if (null !== ssrFormState) {
            a: {
              var JSCompiler_inline_result = currentlyRenderingFiber;
              if (isHydrating) {
                if (nextHydratableInstance) {
                  b: {
                    var JSCompiler_inline_result$jscomp$0 = nextHydratableInstance;
                    for (var inRootOrSingleton = rootOrSingletonContext; 8 !== JSCompiler_inline_result$jscomp$0.nodeType; ) {
                      if (!inRootOrSingleton) {
                        JSCompiler_inline_result$jscomp$0 = null;
                        break b;
                      }
                      JSCompiler_inline_result$jscomp$0 = getNextHydratable(
                        JSCompiler_inline_result$jscomp$0.nextSibling
                      );
                      if (null === JSCompiler_inline_result$jscomp$0) {
                        JSCompiler_inline_result$jscomp$0 = null;
                        break b;
                      }
                    }
                    inRootOrSingleton = JSCompiler_inline_result$jscomp$0.data;
                    JSCompiler_inline_result$jscomp$0 = "F!" === inRootOrSingleton || "F" === inRootOrSingleton ? JSCompiler_inline_result$jscomp$0 : null;
                  }
                  if (JSCompiler_inline_result$jscomp$0) {
                    nextHydratableInstance = getNextHydratable(
                      JSCompiler_inline_result$jscomp$0.nextSibling
                    );
                    JSCompiler_inline_result = "F!" === JSCompiler_inline_result$jscomp$0.data;
                    break a;
                  }
                }
                throwOnHydrationMismatch(JSCompiler_inline_result);
              }
              JSCompiler_inline_result = false;
            }
            JSCompiler_inline_result && (initialStateProp = ssrFormState[0]);
          }
        }
        ssrFormState = mountWorkInProgressHook();
        ssrFormState.memoizedState = ssrFormState.baseState = initialStateProp;
        JSCompiler_inline_result = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: actionStateReducer,
          lastRenderedState: initialStateProp
        };
        ssrFormState.queue = JSCompiler_inline_result;
        ssrFormState = dispatchSetState.bind(
          null,
          currentlyRenderingFiber,
          JSCompiler_inline_result
        );
        JSCompiler_inline_result.dispatch = ssrFormState;
        JSCompiler_inline_result = mountStateImpl(false);
        inRootOrSingleton = dispatchOptimisticSetState.bind(
          null,
          currentlyRenderingFiber,
          false,
          JSCompiler_inline_result.queue
        );
        JSCompiler_inline_result = mountWorkInProgressHook();
        JSCompiler_inline_result$jscomp$0 = {
          state: initialStateProp,
          dispatch: null,
          action,
          pending: null
        };
        JSCompiler_inline_result.queue = JSCompiler_inline_result$jscomp$0;
        ssrFormState = dispatchActionState.bind(
          null,
          currentlyRenderingFiber,
          JSCompiler_inline_result$jscomp$0,
          inRootOrSingleton,
          ssrFormState
        );
        JSCompiler_inline_result$jscomp$0.dispatch = ssrFormState;
        JSCompiler_inline_result.memoizedState = action;
        return [initialStateProp, ssrFormState, false];
      }
      function updateActionState(action) {
        var stateHook = updateWorkInProgressHook();
        return updateActionStateImpl(stateHook, currentHook, action);
      }
      function updateActionStateImpl(stateHook, currentStateHook, action) {
        currentStateHook = updateReducerImpl(
          stateHook,
          currentStateHook,
          actionStateReducer
        )[0];
        stateHook = updateReducer(basicStateReducer)[0];
        if ("object" === typeof currentStateHook && null !== currentStateHook && "function" === typeof currentStateHook.then)
          try {
            var state = useThenable(currentStateHook);
          } catch (x) {
            if (x === SuspenseException) throw SuspenseActionException;
            throw x;
          }
        else state = currentStateHook;
        currentStateHook = updateWorkInProgressHook();
        var actionQueue = currentStateHook.queue, dispatch = actionQueue.dispatch;
        action !== currentStateHook.memoizedState && (currentlyRenderingFiber.flags |= 2048, pushSimpleEffect(
          9,
          { destroy: void 0 },
          actionStateActionEffect.bind(null, actionQueue, action),
          null
        ));
        return [state, dispatch, stateHook];
      }
      function actionStateActionEffect(actionQueue, action) {
        actionQueue.action = action;
      }
      function rerenderActionState(action) {
        var stateHook = updateWorkInProgressHook(), currentStateHook = currentHook;
        if (null !== currentStateHook)
          return updateActionStateImpl(stateHook, currentStateHook, action);
        updateWorkInProgressHook();
        stateHook = stateHook.memoizedState;
        currentStateHook = updateWorkInProgressHook();
        var dispatch = currentStateHook.queue.dispatch;
        currentStateHook.memoizedState = action;
        return [stateHook, dispatch, false];
      }
      function pushSimpleEffect(tag, inst, create, deps) {
        tag = { tag, create, deps, inst, next: null };
        inst = currentlyRenderingFiber.updateQueue;
        null === inst && (inst = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = inst);
        create = inst.lastEffect;
        null === create ? inst.lastEffect = tag.next = tag : (deps = create.next, create.next = tag, tag.next = deps, inst.lastEffect = tag);
        return tag;
      }
      function updateRef() {
        return updateWorkInProgressHook().memoizedState;
      }
      function mountEffectImpl(fiberFlags, hookFlags, create, deps) {
        var hook = mountWorkInProgressHook();
        currentlyRenderingFiber.flags |= fiberFlags;
        hook.memoizedState = pushSimpleEffect(
          1 | hookFlags,
          { destroy: void 0 },
          create,
          void 0 === deps ? null : deps
        );
      }
      function updateEffectImpl(fiberFlags, hookFlags, create, deps) {
        var hook = updateWorkInProgressHook();
        deps = void 0 === deps ? null : deps;
        var inst = hook.memoizedState.inst;
        null !== currentHook && null !== deps && areHookInputsEqual(deps, currentHook.memoizedState.deps) ? hook.memoizedState = pushSimpleEffect(hookFlags, inst, create, deps) : (currentlyRenderingFiber.flags |= fiberFlags, hook.memoizedState = pushSimpleEffect(
          1 | hookFlags,
          inst,
          create,
          deps
        ));
      }
      function mountEffect(create, deps) {
        mountEffectImpl(8390656, 8, create, deps);
      }
      function updateEffect(create, deps) {
        updateEffectImpl(2048, 8, create, deps);
      }
      function useEffectEventImpl(payload) {
        currentlyRenderingFiber.flags |= 4;
        var componentUpdateQueue = currentlyRenderingFiber.updateQueue;
        if (null === componentUpdateQueue)
          componentUpdateQueue = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = componentUpdateQueue, componentUpdateQueue.events = [payload];
        else {
          var events = componentUpdateQueue.events;
          null === events ? componentUpdateQueue.events = [payload] : events.push(payload);
        }
      }
      function updateEvent(callback) {
        var ref = updateWorkInProgressHook().memoizedState;
        useEffectEventImpl({ ref, nextImpl: callback });
        return function() {
          if (0 !== (executionContext & 2)) throw Error(formatProdErrorMessage(440));
          return ref.impl.apply(void 0, arguments);
        };
      }
      function updateInsertionEffect(create, deps) {
        return updateEffectImpl(4, 2, create, deps);
      }
      function updateLayoutEffect(create, deps) {
        return updateEffectImpl(4, 4, create, deps);
      }
      function imperativeHandleEffect(create, ref) {
        if ("function" === typeof ref) {
          create = create();
          var refCleanup = ref(create);
          return function() {
            "function" === typeof refCleanup ? refCleanup() : ref(null);
          };
        }
        if (null !== ref && void 0 !== ref)
          return create = create(), ref.current = create, function() {
            ref.current = null;
          };
      }
      function updateImperativeHandle(ref, create, deps) {
        deps = null !== deps && void 0 !== deps ? deps.concat([ref]) : null;
        updateEffectImpl(4, 4, imperativeHandleEffect.bind(null, create, ref), deps);
      }
      function mountDebugValue() {
      }
      function updateCallback(callback, deps) {
        var hook = updateWorkInProgressHook();
        deps = void 0 === deps ? null : deps;
        var prevState = hook.memoizedState;
        if (null !== deps && areHookInputsEqual(deps, prevState[1]))
          return prevState[0];
        hook.memoizedState = [callback, deps];
        return callback;
      }
      function updateMemo(nextCreate, deps) {
        var hook = updateWorkInProgressHook();
        deps = void 0 === deps ? null : deps;
        var prevState = hook.memoizedState;
        if (null !== deps && areHookInputsEqual(deps, prevState[1]))
          return prevState[0];
        prevState = nextCreate();
        if (shouldDoubleInvokeUserFnsInHooksDEV) {
          setIsStrictModeForDevtools(true);
          try {
            nextCreate();
          } finally {
            setIsStrictModeForDevtools(false);
          }
        }
        hook.memoizedState = [prevState, deps];
        return prevState;
      }
      function mountDeferredValueImpl(hook, value, initialValue) {
        if (void 0 === initialValue || 0 !== (renderLanes & 1073741824) && 0 === (workInProgressRootRenderLanes & 261930))
          return hook.memoizedState = value;
        hook.memoizedState = initialValue;
        hook = requestDeferredLane();
        currentlyRenderingFiber.lanes |= hook;
        workInProgressRootSkippedLanes |= hook;
        return initialValue;
      }
      function updateDeferredValueImpl(hook, prevValue, value, initialValue) {
        if (objectIs(value, prevValue)) return value;
        if (null !== currentTreeHiddenStackCursor.current)
          return hook = mountDeferredValueImpl(hook, value, initialValue), objectIs(hook, prevValue) || (didReceiveUpdate = true), hook;
        if (0 === (renderLanes & 106) || 0 !== (renderLanes & 1073741824) && 0 === (workInProgressRootRenderLanes & 261930))
          return didReceiveUpdate = true, hook.memoizedState = value;
        hook = requestDeferredLane();
        currentlyRenderingFiber.lanes |= hook;
        workInProgressRootSkippedLanes |= hook;
        return prevValue;
      }
      function startTransition(fiber, queue, pendingState, finishedState, callback) {
        var previousPriority = ReactDOMSharedInternals.p;
        ReactDOMSharedInternals.p = 0 !== previousPriority && 8 > previousPriority ? previousPriority : 8;
        var prevTransition = ReactSharedInternals.T, currentTransition = {};
        currentTransition.types = null !== prevTransition ? prevTransition.types : null;
        ReactSharedInternals.T = currentTransition;
        dispatchOptimisticSetState(fiber, false, queue, pendingState);
        try {
          var returnValue = callback(), onStartTransitionFinish = ReactSharedInternals.S;
          null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
          if (null !== returnValue && "object" === typeof returnValue && "function" === typeof returnValue.then) {
            var thenableForFinishedState = chainThenableValue(
              returnValue,
              finishedState
            );
            dispatchSetStateInternal(
              fiber,
              queue,
              thenableForFinishedState,
              requestUpdateLane(fiber)
            );
          } else
            dispatchSetStateInternal(
              fiber,
              queue,
              finishedState,
              requestUpdateLane(fiber)
            );
        } catch (error) {
          dispatchSetStateInternal(
            fiber,
            queue,
            { then: function() {
            }, status: "rejected", reason: error },
            requestUpdateLane()
          );
        } finally {
          ReactDOMSharedInternals.p = previousPriority, null !== prevTransition && null !== currentTransition.types && (prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
        }
      }
      function noop() {
      }
      function startHostTransition(formFiber, pendingState, action, formData) {
        if (5 !== formFiber.tag) throw Error(formatProdErrorMessage(476));
        var queue = ensureFormComponentIsStateful(formFiber).queue;
        startTransition(
          formFiber,
          queue,
          pendingState,
          sharedNotPendingObject,
          null === action ? noop : function() {
            requestFormReset$1(formFiber);
            return action(formData);
          }
        );
      }
      function ensureFormComponentIsStateful(formFiber) {
        var existingStateHook = formFiber.memoizedState;
        if (null !== existingStateHook) return existingStateHook;
        existingStateHook = {
          memoizedState: sharedNotPendingObject,
          baseState: sharedNotPendingObject,
          baseQueue: null,
          queue: {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: basicStateReducer,
            lastRenderedState: sharedNotPendingObject
          },
          next: null
        };
        var initialResetState = {};
        existingStateHook.next = {
          memoizedState: initialResetState,
          baseState: initialResetState,
          baseQueue: null,
          queue: {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: basicStateReducer,
            lastRenderedState: initialResetState
          },
          next: null
        };
        formFiber.memoizedState = existingStateHook;
        formFiber = formFiber.alternate;
        null !== formFiber && (formFiber.memoizedState = existingStateHook);
        return existingStateHook;
      }
      function requestFormReset$1(formFiber) {
        var stateHook = ensureFormComponentIsStateful(formFiber);
        null === stateHook.next && (stateHook = formFiber.alternate.memoizedState);
        dispatchSetStateInternal(
          formFiber,
          stateHook.next.queue,
          {},
          requestUpdateLane()
        );
      }
      function useHostTransitionStatus() {
        return readContext(HostTransitionContext);
      }
      function updateId() {
        return updateWorkInProgressHook().memoizedState;
      }
      function updateRefresh() {
        return updateWorkInProgressHook().memoizedState;
      }
      function refreshCache(fiber) {
        for (var provider = fiber.return; null !== provider; ) {
          switch (provider.tag) {
            case 24:
            case 3:
              var lane = requestUpdateLane();
              fiber = createUpdate(lane);
              var root$73 = enqueueUpdate(provider, fiber, lane);
              null !== root$73 && (scheduleUpdateOnFiber(root$73, provider, lane), entangleTransitions(root$73, provider, lane));
              provider = { cache: createCache() };
              fiber.payload = provider;
              return;
          }
          provider = provider.return;
        }
      }
      function dispatchReducerAction(fiber, queue, action) {
        var lane = requestUpdateLane();
        action = {
          lane,
          revertLane: 0,
          gesture: null,
          action,
          hasEagerState: false,
          eagerState: null,
          next: null
        };
        isRenderPhaseUpdate(fiber) ? enqueueRenderPhaseUpdate(queue, action) : (action = enqueueConcurrentHookUpdate(fiber, queue, action, lane), null !== action && (scheduleUpdateOnFiber(action, fiber, lane), entangleTransitionUpdate(action, queue, lane)));
      }
      function dispatchSetState(fiber, queue, action) {
        var lane = requestUpdateLane();
        dispatchSetStateInternal(fiber, queue, action, lane);
      }
      function dispatchSetStateInternal(fiber, queue, action, lane) {
        var update = {
          lane,
          revertLane: 0,
          gesture: null,
          action,
          hasEagerState: false,
          eagerState: null,
          next: null
        };
        if (isRenderPhaseUpdate(fiber)) enqueueRenderPhaseUpdate(queue, update);
        else {
          var alternate = fiber.alternate;
          if (0 === fiber.lanes && (null === alternate || 0 === alternate.lanes) && (alternate = queue.lastRenderedReducer, null !== alternate))
            try {
              var currentState = queue.lastRenderedState, eagerState = alternate(currentState, action);
              update.hasEagerState = true;
              update.eagerState = eagerState;
              if (objectIs(eagerState, currentState))
                return enqueueUpdate$1(fiber, queue, update, 0), null === workInProgressRoot && finishQueueingConcurrentUpdates(), false;
            } catch (error) {
            } finally {
            }
          action = enqueueConcurrentHookUpdate(fiber, queue, update, lane);
          if (null !== action)
            return scheduleUpdateOnFiber(action, fiber, lane), entangleTransitionUpdate(action, queue, lane), true;
        }
        return false;
      }
      function dispatchOptimisticSetState(fiber, throwIfDuringRender, queue, action) {
        action = {
          lane: 2,
          revertLane: requestTransitionLane(),
          gesture: null,
          action,
          hasEagerState: false,
          eagerState: null,
          next: null
        };
        if (isRenderPhaseUpdate(fiber)) {
          if (throwIfDuringRender) throw Error(formatProdErrorMessage(479));
        } else
          throwIfDuringRender = enqueueConcurrentHookUpdate(
            fiber,
            queue,
            action,
            2
          ), null !== throwIfDuringRender && scheduleUpdateOnFiber(throwIfDuringRender, fiber, 2);
      }
      function isRenderPhaseUpdate(fiber) {
        var alternate = fiber.alternate;
        return fiber === currentlyRenderingFiber || null !== alternate && alternate === currentlyRenderingFiber;
      }
      function enqueueRenderPhaseUpdate(queue, update) {
        didScheduleRenderPhaseUpdateDuringThisPass = didScheduleRenderPhaseUpdate = true;
        var pending = queue.pending;
        null === pending ? update.next = update : (update.next = pending.next, pending.next = update);
        queue.pending = update;
      }
      function entangleTransitionUpdate(root2, queue, lane) {
        if (0 !== (lane & 4194048)) {
          var queueLanes = queue.lanes;
          queueLanes &= root2.pendingLanes;
          lane |= queueLanes;
          queue.lanes = lane;
          markRootEntangled(root2, lane);
        }
      }
      var ContextOnlyDispatcher = {
        readContext,
        use,
        useCallback: throwInvalidHookError,
        useContext: throwInvalidHookError,
        useEffect: throwInvalidHookError,
        useImperativeHandle: throwInvalidHookError,
        useLayoutEffect: throwInvalidHookError,
        useInsertionEffect: throwInvalidHookError,
        useMemo: throwInvalidHookError,
        useReducer: throwInvalidHookError,
        useRef: throwInvalidHookError,
        useState: throwInvalidHookError,
        useDebugValue: throwInvalidHookError,
        useDeferredValue: throwInvalidHookError,
        useTransition: throwInvalidHookError,
        useSyncExternalStore: throwInvalidHookError,
        useId: throwInvalidHookError,
        useHostTransitionStatus: throwInvalidHookError,
        useFormState: throwInvalidHookError,
        useActionState: throwInvalidHookError,
        useOptimistic: throwInvalidHookError,
        useMemoCache: throwInvalidHookError,
        useCacheRefresh: throwInvalidHookError,
        useEffectEvent: throwInvalidHookError
      };
      var HooksDispatcherOnMount = {
        readContext,
        use,
        useCallback: function(callback, deps) {
          mountWorkInProgressHook().memoizedState = [
            callback,
            void 0 === deps ? null : deps
          ];
          return callback;
        },
        useContext: readContext,
        useEffect: mountEffect,
        useImperativeHandle: function(ref, create, deps) {
          deps = null !== deps && void 0 !== deps ? deps.concat([ref]) : null;
          mountEffectImpl(
            4194308,
            4,
            imperativeHandleEffect.bind(null, create, ref),
            deps
          );
        },
        useLayoutEffect: function(create, deps) {
          return mountEffectImpl(4194308, 4, create, deps);
        },
        useInsertionEffect: function(create, deps) {
          mountEffectImpl(4, 2, create, deps);
        },
        useMemo: function(nextCreate, deps) {
          var hook = mountWorkInProgressHook();
          deps = void 0 === deps ? null : deps;
          var nextValue = nextCreate();
          if (shouldDoubleInvokeUserFnsInHooksDEV) {
            setIsStrictModeForDevtools(true);
            try {
              nextCreate();
            } finally {
              setIsStrictModeForDevtools(false);
            }
          }
          hook.memoizedState = [nextValue, deps];
          return nextValue;
        },
        useReducer: function(reducer, initialArg, init) {
          var hook = mountWorkInProgressHook();
          if (void 0 !== init) {
            var initialState = init(initialArg);
            if (shouldDoubleInvokeUserFnsInHooksDEV) {
              setIsStrictModeForDevtools(true);
              try {
                init(initialArg);
              } finally {
                setIsStrictModeForDevtools(false);
              }
            }
          } else initialState = initialArg;
          hook.memoizedState = hook.baseState = initialState;
          reducer = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: reducer,
            lastRenderedState: initialState
          };
          hook.queue = reducer;
          reducer = reducer.dispatch = dispatchReducerAction.bind(
            null,
            currentlyRenderingFiber,
            reducer
          );
          return [hook.memoizedState, reducer];
        },
        useRef: function(initialValue) {
          var hook = mountWorkInProgressHook();
          initialValue = { current: initialValue };
          return hook.memoizedState = initialValue;
        },
        useState: function(initialState) {
          initialState = mountStateImpl(initialState);
          var queue = initialState.queue, dispatch = dispatchSetState.bind(null, currentlyRenderingFiber, queue);
          queue.dispatch = dispatch;
          return [initialState.memoizedState, dispatch];
        },
        useDebugValue: mountDebugValue,
        useDeferredValue: function(value, initialValue) {
          var hook = mountWorkInProgressHook();
          return mountDeferredValueImpl(hook, value, initialValue);
        },
        useTransition: function() {
          var stateHook = mountStateImpl(false);
          stateHook = startTransition.bind(
            null,
            currentlyRenderingFiber,
            stateHook.queue,
            true,
            false
          );
          mountWorkInProgressHook().memoizedState = stateHook;
          return [false, stateHook];
        },
        useSyncExternalStore: function(subscribe, getSnapshot, getServerSnapshot) {
          var fiber = currentlyRenderingFiber, hook = mountWorkInProgressHook();
          if (isHydrating) {
            if (void 0 === getServerSnapshot)
              throw Error(formatProdErrorMessage(407));
            getServerSnapshot = getServerSnapshot();
          } else {
            getServerSnapshot = getSnapshot();
            if (null === workInProgressRoot)
              throw Error(formatProdErrorMessage(349));
            0 !== (workInProgressRootRenderLanes & 127) || pushStoreConsistencyCheck(fiber, getSnapshot, getServerSnapshot);
          }
          hook.memoizedState = getServerSnapshot;
          var inst = { value: getServerSnapshot, getSnapshot };
          hook.queue = inst;
          mountEffect(subscribeToStore.bind(null, fiber, inst, subscribe), [
            subscribe
          ]);
          fiber.flags |= 2048;
          pushSimpleEffect(
            9,
            { destroy: void 0 },
            updateStoreInstance.bind(
              null,
              fiber,
              inst,
              getServerSnapshot,
              getSnapshot
            ),
            null
          );
          return getServerSnapshot;
        },
        useId: function() {
          var hook = mountWorkInProgressHook(), identifierPrefix = workInProgressRoot.identifierPrefix;
          if (isHydrating) {
            var JSCompiler_inline_result = treeContextOverflow;
            var idWithLeadingBit = treeContextId;
            JSCompiler_inline_result = (idWithLeadingBit & ~(1 << 32 - clz32(idWithLeadingBit) - 1)).toString(32) + JSCompiler_inline_result;
            identifierPrefix = "_" + identifierPrefix + "R_" + JSCompiler_inline_result;
            JSCompiler_inline_result = localIdCounter++;
            0 < JSCompiler_inline_result && (identifierPrefix += "H" + JSCompiler_inline_result.toString(32));
            identifierPrefix += "_";
          } else
            JSCompiler_inline_result = globalClientIdCounter++, identifierPrefix = "_" + identifierPrefix + "r_" + JSCompiler_inline_result.toString(32) + "_";
          return hook.memoizedState = identifierPrefix;
        },
        useHostTransitionStatus,
        useFormState: mountActionState,
        useActionState: mountActionState,
        useOptimistic: function(passthrough) {
          var hook = mountWorkInProgressHook();
          hook.memoizedState = hook.baseState = passthrough;
          var queue = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: null,
            lastRenderedState: null
          };
          hook.queue = queue;
          hook = dispatchOptimisticSetState.bind(
            null,
            currentlyRenderingFiber,
            true,
            queue
          );
          queue.dispatch = hook;
          return [passthrough, hook];
        },
        useMemoCache,
        useCacheRefresh: function() {
          return mountWorkInProgressHook().memoizedState = refreshCache.bind(
            null,
            currentlyRenderingFiber
          );
        },
        useEffectEvent: function(callback) {
          var hook = mountWorkInProgressHook(), ref = { impl: callback };
          hook.memoizedState = ref;
          return function() {
            if (0 !== (executionContext & 2))
              throw Error(formatProdErrorMessage(440));
            return ref.impl.apply(void 0, arguments);
          };
        }
      };
      var HooksDispatcherOnUpdate = {
        readContext,
        use,
        useCallback: updateCallback,
        useContext: readContext,
        useEffect: updateEffect,
        useImperativeHandle: updateImperativeHandle,
        useInsertionEffect: updateInsertionEffect,
        useLayoutEffect: updateLayoutEffect,
        useMemo: updateMemo,
        useReducer: updateReducer,
        useRef: updateRef,
        useState: function() {
          return updateReducer(basicStateReducer);
        },
        useDebugValue: mountDebugValue,
        useDeferredValue: function(value, initialValue) {
          var hook = updateWorkInProgressHook();
          return updateDeferredValueImpl(
            hook,
            currentHook.memoizedState,
            value,
            initialValue
          );
        },
        useTransition: function() {
          var booleanOrThenable = updateReducer(basicStateReducer)[0], start = updateWorkInProgressHook().memoizedState;
          return [
            "boolean" === typeof booleanOrThenable ? booleanOrThenable : useThenable(booleanOrThenable),
            start
          ];
        },
        useSyncExternalStore: updateSyncExternalStore,
        useId: updateId,
        useHostTransitionStatus,
        useFormState: updateActionState,
        useActionState: updateActionState,
        useOptimistic: function(passthrough, reducer) {
          var hook = updateWorkInProgressHook();
          return updateOptimisticImpl(hook, currentHook, passthrough, reducer);
        },
        useMemoCache,
        useCacheRefresh: updateRefresh,
        useEffectEvent: updateEvent
      };
      var HooksDispatcherOnRerender = {
        readContext,
        use,
        useCallback: updateCallback,
        useContext: readContext,
        useEffect: updateEffect,
        useImperativeHandle: updateImperativeHandle,
        useInsertionEffect: updateInsertionEffect,
        useLayoutEffect: updateLayoutEffect,
        useMemo: updateMemo,
        useReducer: rerenderReducer,
        useRef: updateRef,
        useState: function() {
          return rerenderReducer(basicStateReducer);
        },
        useDebugValue: mountDebugValue,
        useDeferredValue: function(value, initialValue) {
          var hook = updateWorkInProgressHook();
          return null === currentHook ? mountDeferredValueImpl(hook, value, initialValue) : updateDeferredValueImpl(
            hook,
            currentHook.memoizedState,
            value,
            initialValue
          );
        },
        useTransition: function() {
          var booleanOrThenable = rerenderReducer(basicStateReducer)[0], start = updateWorkInProgressHook().memoizedState;
          return [
            "boolean" === typeof booleanOrThenable ? booleanOrThenable : useThenable(booleanOrThenable),
            start
          ];
        },
        useSyncExternalStore: updateSyncExternalStore,
        useId: updateId,
        useHostTransitionStatus,
        useFormState: rerenderActionState,
        useActionState: rerenderActionState,
        useOptimistic: function(passthrough, reducer) {
          var hook = updateWorkInProgressHook();
          if (null !== currentHook)
            return updateOptimisticImpl(hook, currentHook, passthrough, reducer);
          hook.baseState = passthrough;
          return [passthrough, hook.queue.dispatch];
        },
        useMemoCache,
        useCacheRefresh: updateRefresh,
        useEffectEvent: updateEvent
      };
      function applyDerivedStateFromProps(workInProgress2, ctor, getDerivedStateFromProps, nextProps) {
        ctor = workInProgress2.memoizedState;
        getDerivedStateFromProps = getDerivedStateFromProps(nextProps, ctor);
        getDerivedStateFromProps = null === getDerivedStateFromProps || void 0 === getDerivedStateFromProps ? ctor : assign({}, ctor, getDerivedStateFromProps);
        workInProgress2.memoizedState = getDerivedStateFromProps;
        0 === workInProgress2.lanes && (workInProgress2.updateQueue.baseState = getDerivedStateFromProps);
      }
      var classComponentUpdater = {
        enqueueSetState: function(inst, payload, callback) {
          inst = inst._reactInternals;
          var lane = requestUpdateLane(), update = createUpdate(lane);
          update.payload = payload;
          void 0 !== callback && null !== callback && (update.callback = callback);
          payload = enqueueUpdate(inst, update, lane);
          null !== payload && (scheduleUpdateOnFiber(payload, inst, lane), entangleTransitions(payload, inst, lane));
        },
        enqueueReplaceState: function(inst, payload, callback) {
          inst = inst._reactInternals;
          var lane = requestUpdateLane(), update = createUpdate(lane);
          update.tag = 1;
          update.payload = payload;
          void 0 !== callback && null !== callback && (update.callback = callback);
          payload = enqueueUpdate(inst, update, lane);
          null !== payload && (scheduleUpdateOnFiber(payload, inst, lane), entangleTransitions(payload, inst, lane));
        },
        enqueueForceUpdate: function(inst, callback) {
          inst = inst._reactInternals;
          var lane = requestUpdateLane(), update = createUpdate(lane);
          update.tag = 2;
          void 0 !== callback && null !== callback && (update.callback = callback);
          callback = enqueueUpdate(inst, update, lane);
          null !== callback && (scheduleUpdateOnFiber(callback, inst, lane), entangleTransitions(callback, inst, lane));
        }
      };
      function checkShouldComponentUpdate(workInProgress2, ctor, oldProps, newProps, oldState, newState, nextContext) {
        workInProgress2 = workInProgress2.stateNode;
        return "function" === typeof workInProgress2.shouldComponentUpdate ? workInProgress2.shouldComponentUpdate(newProps, newState, nextContext) : ctor.prototype && ctor.prototype.isPureReactComponent ? !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState) : true;
      }
      function callComponentWillReceiveProps(workInProgress2, instance, newProps, nextContext) {
        workInProgress2 = instance.state;
        "function" === typeof instance.componentWillReceiveProps && instance.componentWillReceiveProps(newProps, nextContext);
        "function" === typeof instance.UNSAFE_componentWillReceiveProps && instance.UNSAFE_componentWillReceiveProps(newProps, nextContext);
        instance.state !== workInProgress2 && classComponentUpdater.enqueueReplaceState(instance, instance.state, null);
      }
      function resolveClassComponentProps(Component, baseProps) {
        var newProps = baseProps;
        if ("ref" in baseProps) {
          newProps = {};
          for (var propName in baseProps)
            "ref" !== propName && (newProps[propName] = baseProps[propName]);
        }
        if (Component = Component.defaultProps) {
          newProps === baseProps && (newProps = assign({}, newProps));
          for (var propName$77 in Component)
            void 0 === newProps[propName$77] && (newProps[propName$77] = Component[propName$77]);
        }
        return newProps;
      }
      function defaultOnUncaughtError(error) {
        reportGlobalError(error);
      }
      function defaultOnCaughtError(error) {
        console.error(error);
      }
      function defaultOnRecoverableError(error) {
        reportGlobalError(error);
      }
      function logUncaughtError(root2, errorInfo) {
        try {
          var onUncaughtError = root2.onUncaughtError;
          onUncaughtError(errorInfo.value, { componentStack: errorInfo.stack });
        } catch (e$78) {
          setTimeout(function() {
            throw e$78;
          });
        }
      }
      function logCaughtError(root2, boundary, errorInfo) {
        try {
          var onCaughtError = root2.onCaughtError;
          onCaughtError(errorInfo.value, {
            componentStack: errorInfo.stack,
            errorBoundary: 1 === boundary.tag ? boundary.stateNode : null
          });
        } catch (e$79) {
          setTimeout(function() {
            throw e$79;
          });
        }
      }
      function createRootErrorUpdate(root2, errorInfo, lane) {
        lane = createUpdate(lane);
        lane.tag = 3;
        lane.payload = { element: null };
        lane.callback = function() {
          logUncaughtError(root2, errorInfo);
        };
        return lane;
      }
      function createClassErrorUpdate(lane) {
        lane = createUpdate(lane);
        lane.tag = 3;
        return lane;
      }
      function initializeClassErrorUpdate(update, root2, fiber, errorInfo) {
        var getDerivedStateFromError = fiber.type.getDerivedStateFromError;
        if ("function" === typeof getDerivedStateFromError) {
          var error = errorInfo.value;
          update.payload = function() {
            return getDerivedStateFromError(error);
          };
          update.callback = function() {
            logCaughtError(root2, fiber, errorInfo);
          };
        }
        var inst = fiber.stateNode;
        null !== inst && "function" === typeof inst.componentDidCatch && (update.callback = function() {
          logCaughtError(root2, fiber, errorInfo);
          "function" !== typeof getDerivedStateFromError && (null === legacyErrorBoundariesThatAlreadyFailed ? legacyErrorBoundariesThatAlreadyFailed = /* @__PURE__ */ new Set([this]) : legacyErrorBoundariesThatAlreadyFailed.add(this));
          var stack = errorInfo.stack;
          this.componentDidCatch(errorInfo.value, {
            componentStack: null !== stack ? stack : ""
          });
        });
      }
      function throwException(root2, returnFiber, sourceFiber, value, rootRenderLanes) {
        sourceFiber.flags |= 32768;
        if (null !== value && "object" === typeof value && "function" === typeof value.then) {
          returnFiber = sourceFiber.alternate;
          null !== returnFiber && propagateParentContextChanges(
            returnFiber,
            sourceFiber,
            rootRenderLanes,
            true
          );
          sourceFiber = suspenseHandlerStackCursor.current;
          if (null !== sourceFiber) {
            switch (sourceFiber.tag) {
              case 31:
              case 13:
              case 19:
                return null === shellBoundary ? renderDidSuspendDelayIfPossible() : null === sourceFiber.alternate && 0 === workInProgressRootExitStatus && (workInProgressRootExitStatus = 3), sourceFiber.flags &= -257, sourceFiber.flags |= 65536, sourceFiber.lanes = rootRenderLanes, value === noopSuspenseyCommitThenable ? sourceFiber.flags |= 16384 : (returnFiber = sourceFiber.updateQueue, null === returnFiber ? sourceFiber.updateQueue = /* @__PURE__ */ new Set([value]) : returnFiber.add(value), attachPingListener(root2, value, rootRenderLanes)), false;
              case 22:
                return sourceFiber.flags |= 65536, value === noopSuspenseyCommitThenable ? sourceFiber.flags |= 16384 : (returnFiber = sourceFiber.updateQueue, null === returnFiber ? (returnFiber = {
                  transitions: null,
                  markerInstances: null,
                  retryQueue: /* @__PURE__ */ new Set([value])
                }, sourceFiber.updateQueue = returnFiber) : (sourceFiber = returnFiber.retryQueue, null === sourceFiber ? returnFiber.retryQueue = /* @__PURE__ */ new Set([value]) : sourceFiber.add(value)), attachPingListener(root2, value, rootRenderLanes)), false;
            }
            throw Error(formatProdErrorMessage(435, sourceFiber.tag));
          }
          attachPingListener(root2, value, rootRenderLanes);
          renderDidSuspendDelayIfPossible();
          return false;
        }
        if (isHydrating)
          return returnFiber = suspenseHandlerStackCursor.current, null !== returnFiber ? (0 === (returnFiber.flags & 65536) && (returnFiber.flags |= 256), returnFiber.flags |= 65536, returnFiber.lanes = rootRenderLanes, value !== HydrationMismatchException && (root2 = Error(formatProdErrorMessage(422), { cause: value }), queueHydrationError(createCapturedValueAtFiber(root2, sourceFiber)))) : (value !== HydrationMismatchException && (returnFiber = Error(formatProdErrorMessage(423), {
            cause: value
          }), queueHydrationError(
            createCapturedValueAtFiber(returnFiber, sourceFiber)
          )), root2 = root2.current.alternate, root2.flags |= 65536, rootRenderLanes &= -rootRenderLanes, root2.lanes |= rootRenderLanes, value = createCapturedValueAtFiber(value, sourceFiber), rootRenderLanes = createRootErrorUpdate(
            root2.stateNode,
            value,
            rootRenderLanes
          ), enqueueCapturedUpdate(root2, rootRenderLanes), 4 !== workInProgressRootExitStatus && (workInProgressRootExitStatus = 2)), false;
        var wrapperError = Error(formatProdErrorMessage(520), { cause: value });
        wrapperError = createCapturedValueAtFiber(wrapperError, sourceFiber);
        null === workInProgressRootConcurrentErrors ? workInProgressRootConcurrentErrors = [wrapperError] : workInProgressRootConcurrentErrors.push(wrapperError);
        4 !== workInProgressRootExitStatus && (workInProgressRootExitStatus = 2);
        if (null === returnFiber) return true;
        value = createCapturedValueAtFiber(value, sourceFiber);
        sourceFiber = returnFiber;
        do {
          switch (sourceFiber.tag) {
            case 3:
              return sourceFiber.flags |= 65536, root2 = rootRenderLanes & -rootRenderLanes, sourceFiber.lanes |= root2, root2 = createRootErrorUpdate(sourceFiber.stateNode, value, root2), enqueueCapturedUpdate(sourceFiber, root2), false;
            case 1:
              returnFiber = sourceFiber.type;
              wrapperError = sourceFiber.stateNode;
              if (0 === (sourceFiber.flags & 128) && ("function" === typeof returnFiber.getDerivedStateFromError || null !== wrapperError && "function" === typeof wrapperError.componentDidCatch && (null === legacyErrorBoundariesThatAlreadyFailed || !legacyErrorBoundariesThatAlreadyFailed.has(wrapperError))))
                return sourceFiber.flags |= 65536, rootRenderLanes &= -rootRenderLanes, sourceFiber.lanes |= rootRenderLanes, rootRenderLanes = createClassErrorUpdate(rootRenderLanes), initializeClassErrorUpdate(
                  rootRenderLanes,
                  root2,
                  sourceFiber,
                  value
                ), enqueueCapturedUpdate(sourceFiber, rootRenderLanes), false;
              break;
            case 22:
              if (null !== sourceFiber.memoizedState)
                return sourceFiber.flags |= 65536, false;
          }
          sourceFiber = sourceFiber.return;
        } while (null !== sourceFiber);
        return false;
      }
      var SelectiveHydrationException = Error(formatProdErrorMessage(461));
      var didReceiveUpdate = false;
      function reconcileChildren(current, workInProgress2, nextChildren, renderLanes2) {
        workInProgress2.child = null === current ? mountChildFibers(workInProgress2, null, nextChildren, renderLanes2) : reconcileChildFibers(
          workInProgress2,
          current.child,
          nextChildren,
          renderLanes2
        );
      }
      function updateForwardRef(current, workInProgress2, Component, nextProps, renderLanes2) {
        Component = Component.render;
        var ref = workInProgress2.ref;
        if ("ref" in nextProps) {
          var propsWithoutRef = {};
          for (var key in nextProps)
            "ref" !== key && (propsWithoutRef[key] = nextProps[key]);
        } else propsWithoutRef = nextProps;
        prepareToReadContext(workInProgress2);
        nextProps = renderWithHooks(
          current,
          workInProgress2,
          Component,
          propsWithoutRef,
          ref,
          renderLanes2
        );
        key = checkDidRenderIdHook();
        if (null !== current && !didReceiveUpdate)
          return bailoutHooks(current, workInProgress2, renderLanes2), bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
        isHydrating && key && pushMaterializedTreeId(workInProgress2);
        workInProgress2.flags |= 1;
        reconcileChildren(current, workInProgress2, nextProps, renderLanes2);
        return workInProgress2.child;
      }
      function updateMemoComponent(current, workInProgress2, Component, nextProps, renderLanes2) {
        if (null === current) {
          var type = Component.type;
          if ("function" === typeof type && !shouldConstruct(type) && void 0 === type.defaultProps && null === Component.compare)
            return workInProgress2.tag = 15, workInProgress2.type = type, updateSimpleMemoComponent(
              current,
              workInProgress2,
              type,
              nextProps,
              renderLanes2
            );
          current = createFiberFromTypeAndProps(
            Component.type,
            null,
            nextProps,
            workInProgress2,
            workInProgress2.mode,
            renderLanes2
          );
          current.ref = workInProgress2.ref;
          current.return = workInProgress2;
          return workInProgress2.child = current;
        }
        type = current.child;
        if (!checkScheduledUpdateOrContext(current, renderLanes2)) {
          var prevProps = type.memoizedProps;
          Component = Component.compare;
          Component = null !== Component ? Component : shallowEqual;
          if (Component(prevProps, nextProps) && current.ref === workInProgress2.ref)
            return bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
        }
        workInProgress2.flags |= 1;
        current = createWorkInProgress(type, nextProps);
        current.ref = workInProgress2.ref;
        current.return = workInProgress2;
        return workInProgress2.child = current;
      }
      function updateSimpleMemoComponent(current, workInProgress2, Component, nextProps, renderLanes2) {
        if (null !== current) {
          var prevProps = current.memoizedProps;
          if (shallowEqual(prevProps, nextProps) && current.ref === workInProgress2.ref)
            if (didReceiveUpdate = false, workInProgress2.pendingProps = nextProps = prevProps, checkScheduledUpdateOrContext(current, renderLanes2))
              0 !== (current.flags & 131072) && (didReceiveUpdate = true);
            else
              return workInProgress2.lanes = current.lanes, bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
        }
        return updateFunctionComponent(
          current,
          workInProgress2,
          Component,
          nextProps,
          renderLanes2
        );
      }
      function updateOffscreenComponent(current, workInProgress2, renderLanes2, nextProps) {
        var nextChildren = nextProps.children, prevState = null !== current ? current.memoizedState : null;
        null === current && null === workInProgress2.stateNode && (workInProgress2.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null
        });
        if ("hidden" === nextProps.mode) {
          if (0 !== (workInProgress2.flags & 128)) {
            prevState = null !== prevState ? prevState.baseLanes | renderLanes2 : renderLanes2;
            if (null !== current) {
              nextProps = workInProgress2.child = current.child;
              for (nextChildren = 0; null !== nextProps; )
                nextChildren = nextChildren | nextProps.lanes | nextProps.childLanes, nextProps = nextProps.sibling;
              nextProps = nextChildren & ~prevState;
            } else nextProps = 0, workInProgress2.child = null;
            return deferHiddenOffscreenComponent(
              current,
              workInProgress2,
              prevState,
              renderLanes2,
              nextProps
            );
          }
          if (0 !== (renderLanes2 & 536870912))
            workInProgress2.memoizedState = { baseLanes: 0, cachePool: null }, null !== current && pushTransition(
              workInProgress2,
              null !== prevState ? prevState.cachePool : null
            ), null !== prevState ? pushHiddenContext(workInProgress2, prevState) : reuseHiddenContextOnStack(), pushOffscreenSuspenseHandler(workInProgress2);
          else
            return nextProps = workInProgress2.lanes = 536870912, deferHiddenOffscreenComponent(
              current,
              workInProgress2,
              null !== prevState ? prevState.baseLanes | renderLanes2 : renderLanes2,
              renderLanes2,
              nextProps
            );
        } else
          null !== prevState ? (pushTransition(workInProgress2, prevState.cachePool), pushHiddenContext(workInProgress2, prevState), reuseSuspenseHandlerOnStack(), workInProgress2.memoizedState = null) : (null !== current && pushTransition(workInProgress2, null), reuseHiddenContextOnStack(), reuseSuspenseHandlerOnStack());
        reconcileChildren(current, workInProgress2, nextChildren, renderLanes2);
        return workInProgress2.child;
      }
      function bailoutOffscreenComponent(current, workInProgress2) {
        null !== current && 22 === current.tag || null !== workInProgress2.stateNode || (workInProgress2.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null
        });
        return workInProgress2.sibling;
      }
      function deferHiddenOffscreenComponent(current, workInProgress2, nextBaseLanes, renderLanes2, remainingChildLanes) {
        var JSCompiler_inline_result = peekCacheFromPool();
        JSCompiler_inline_result = null === JSCompiler_inline_result ? null : { parent: CacheContext._currentValue, pool: JSCompiler_inline_result };
        workInProgress2.memoizedState = {
          baseLanes: nextBaseLanes,
          cachePool: JSCompiler_inline_result
        };
        null !== current && pushTransition(workInProgress2, null);
        reuseHiddenContextOnStack();
        pushOffscreenSuspenseHandler(workInProgress2);
        null !== current && propagateParentContextChanges(current, workInProgress2, renderLanes2, true);
        workInProgress2.childLanes = remainingChildLanes;
        return null;
      }
      function mountActivityChildren(workInProgress2, nextProps) {
        nextProps = mountWorkInProgressOffscreenFiber(
          { mode: nextProps.mode, children: nextProps.children },
          workInProgress2.mode
        );
        nextProps.ref = workInProgress2.ref;
        workInProgress2.child = nextProps;
        nextProps.return = workInProgress2;
        return nextProps;
      }
      function retryActivityComponentWithoutHydrating(current, workInProgress2, renderLanes2) {
        reconcileChildFibers(workInProgress2, current.child, null, renderLanes2);
        current = mountActivityChildren(workInProgress2, workInProgress2.pendingProps);
        current.flags |= 2;
        popSuspenseHandler(workInProgress2);
        workInProgress2.memoizedState = null;
        return current;
      }
      function updateActivityComponent(current, workInProgress2, renderLanes2) {
        var nextProps = workInProgress2.pendingProps, didSuspend = 0 !== (workInProgress2.flags & 128);
        workInProgress2.flags &= -129;
        if (null === current) {
          if (isHydrating) {
            if ("hidden" === nextProps.mode)
              return current = mountActivityChildren(workInProgress2, nextProps), workInProgress2.lanes = 536870912, current.memoizedState = { baseLanes: 0, cachePool: null }, bailoutOffscreenComponent(null, current);
            pushDehydratedActivitySuspenseHandler(workInProgress2);
            (current = nextHydratableInstance) ? (current = canHydrateHydrationBoundary(
              current,
              rootOrSingletonContext
            ), current = null !== current && "&" === current.data ? current : null, null !== current && (workInProgress2.memoizedState = {
              dehydrated: current,
              treeContext: null !== treeContextProvider ? { id: treeContextId, overflow: treeContextOverflow } : null,
              retryLane: 536870912,
              hydrationErrors: null
            }, renderLanes2 = createFiberFromDehydratedFragment(current), renderLanes2.return = workInProgress2, workInProgress2.child = renderLanes2, hydrationParentFiber = workInProgress2, nextHydratableInstance = null)) : current = null;
            if (null === current) throw throwOnHydrationMismatch(workInProgress2);
            workInProgress2.lanes = 536870912;
            return null;
          }
          return mountActivityChildren(workInProgress2, nextProps);
        }
        var prevState = current.memoizedState;
        if (null !== prevState) {
          var dehydrated = prevState.dehydrated;
          pushDehydratedActivitySuspenseHandler(workInProgress2);
          if (didSuspend)
            if (workInProgress2.flags & 256)
              workInProgress2.flags &= -257, workInProgress2 = retryActivityComponentWithoutHydrating(
                current,
                workInProgress2,
                renderLanes2
              );
            else if (null !== workInProgress2.memoizedState)
              workInProgress2.child = current.child, workInProgress2.flags |= 128, workInProgress2 = null;
            else throw Error(formatProdErrorMessage(558));
          else if (didReceiveUpdate || propagateParentContextChanges(current, workInProgress2, renderLanes2, false), didSuspend = 0 !== (renderLanes2 & current.childLanes), didReceiveUpdate || didSuspend) {
            if (null === currentTreeHiddenStackCursor.current) {
              nextProps = workInProgressRoot;
              if (null !== nextProps && (dehydrated = getBumpedLaneForHydration(nextProps, renderLanes2), 0 !== dehydrated && dehydrated !== prevState.retryLane))
                throw prevState.retryLane = dehydrated, enqueueConcurrentRenderForLane(current, dehydrated), scheduleUpdateOnFiber(nextProps, current, dehydrated), SelectiveHydrationException;
              renderDidSuspendDelayIfPossible();
            }
            workInProgress2 = retryActivityComponentWithoutHydrating(
              current,
              workInProgress2,
              renderLanes2
            );
          } else
            current = prevState.treeContext, nextHydratableInstance = getNextHydratable(dehydrated.nextSibling), hydrationParentFiber = workInProgress2, isHydrating = true, hydrationErrors = null, rootOrSingletonContext = false, null !== current && restoreSuspendedTreeContext(workInProgress2, current), workInProgress2 = mountActivityChildren(workInProgress2, nextProps), workInProgress2.flags |= 134221824;
          return workInProgress2;
        }
        current = createWorkInProgress(current.child, {
          mode: nextProps.mode,
          children: nextProps.children
        });
        current.ref = workInProgress2.ref;
        workInProgress2.child = current;
        current.return = workInProgress2;
        return current;
      }
      function markRef(current, workInProgress2) {
        var ref = workInProgress2.ref;
        if (null === ref)
          null !== current && null !== current.ref && (workInProgress2.flags |= 4194816);
        else {
          if ("function" !== typeof ref && "object" !== typeof ref)
            throw Error(formatProdErrorMessage(284));
          if (null === current || current.ref !== ref)
            workInProgress2.flags |= 4194816;
        }
      }
      function updateFunctionComponent(current, workInProgress2, Component, nextProps, renderLanes2) {
        prepareToReadContext(workInProgress2);
        Component = renderWithHooks(
          current,
          workInProgress2,
          Component,
          nextProps,
          void 0,
          renderLanes2
        );
        nextProps = checkDidRenderIdHook();
        if (null !== current && !didReceiveUpdate)
          return bailoutHooks(current, workInProgress2, renderLanes2), bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
        isHydrating && nextProps && pushMaterializedTreeId(workInProgress2);
        workInProgress2.flags |= 1;
        reconcileChildren(current, workInProgress2, Component, renderLanes2);
        return workInProgress2.child;
      }
      function replayFunctionComponent(current, workInProgress2, nextProps, Component, secondArg, renderLanes2) {
        prepareToReadContext(workInProgress2);
        workInProgress2.updateQueue = null;
        nextProps = renderWithHooksAgain(
          workInProgress2,
          Component,
          nextProps,
          secondArg
        );
        finishRenderingHooks(current);
        Component = checkDidRenderIdHook();
        if (null !== current && !didReceiveUpdate)
          return bailoutHooks(current, workInProgress2, renderLanes2), bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
        isHydrating && Component && pushMaterializedTreeId(workInProgress2);
        workInProgress2.flags |= 1;
        reconcileChildren(current, workInProgress2, nextProps, renderLanes2);
        return workInProgress2.child;
      }
      function updateClassComponent(current, workInProgress2, Component, nextProps, renderLanes2) {
        prepareToReadContext(workInProgress2);
        if (null === workInProgress2.stateNode) {
          var context = emptyContextObject, contextType = Component.contextType;
          "object" === typeof contextType && null !== contextType && (context = readContext(contextType));
          context = new Component(nextProps, context);
          workInProgress2.memoizedState = null !== context.state && void 0 !== context.state ? context.state : null;
          context.updater = classComponentUpdater;
          workInProgress2.stateNode = context;
          context._reactInternals = workInProgress2;
          context = workInProgress2.stateNode;
          context.props = nextProps;
          context.state = workInProgress2.memoizedState;
          context.refs = {};
          initializeUpdateQueue(workInProgress2);
          contextType = Component.contextType;
          context.context = "object" === typeof contextType && null !== contextType ? readContext(contextType) : emptyContextObject;
          context.state = workInProgress2.memoizedState;
          contextType = Component.getDerivedStateFromProps;
          "function" === typeof contextType && (applyDerivedStateFromProps(
            workInProgress2,
            Component,
            contextType,
            nextProps
          ), context.state = workInProgress2.memoizedState);
          "function" === typeof Component.getDerivedStateFromProps || "function" === typeof context.getSnapshotBeforeUpdate || "function" !== typeof context.UNSAFE_componentWillMount && "function" !== typeof context.componentWillMount || (contextType = context.state, "function" === typeof context.componentWillMount && context.componentWillMount(), "function" === typeof context.UNSAFE_componentWillMount && context.UNSAFE_componentWillMount(), contextType !== context.state && classComponentUpdater.enqueueReplaceState(context, context.state, null), processUpdateQueue(workInProgress2, nextProps, context, renderLanes2), suspendIfUpdateReadFromEntangledAsyncAction(), context.state = workInProgress2.memoizedState);
          "function" === typeof context.componentDidMount && (workInProgress2.flags |= 4194308);
          nextProps = true;
        } else if (null === current) {
          context = workInProgress2.stateNode;
          var unresolvedOldProps = workInProgress2.memoizedProps, oldProps = resolveClassComponentProps(Component, unresolvedOldProps);
          context.props = oldProps;
          var oldContext = context.context, contextType$jscomp$0 = Component.contextType;
          contextType = emptyContextObject;
          "object" === typeof contextType$jscomp$0 && null !== contextType$jscomp$0 && (contextType = readContext(contextType$jscomp$0));
          var getDerivedStateFromProps = Component.getDerivedStateFromProps;
          contextType$jscomp$0 = "function" === typeof getDerivedStateFromProps || "function" === typeof context.getSnapshotBeforeUpdate;
          unresolvedOldProps = workInProgress2.pendingProps !== unresolvedOldProps;
          contextType$jscomp$0 || "function" !== typeof context.UNSAFE_componentWillReceiveProps && "function" !== typeof context.componentWillReceiveProps || (unresolvedOldProps || oldContext !== contextType) && callComponentWillReceiveProps(
            workInProgress2,
            context,
            nextProps,
            contextType
          );
          hasForceUpdate = false;
          var oldState = workInProgress2.memoizedState;
          context.state = oldState;
          processUpdateQueue(workInProgress2, nextProps, context, renderLanes2);
          suspendIfUpdateReadFromEntangledAsyncAction();
          oldContext = workInProgress2.memoizedState;
          unresolvedOldProps || oldState !== oldContext || hasForceUpdate ? ("function" === typeof getDerivedStateFromProps && (applyDerivedStateFromProps(
            workInProgress2,
            Component,
            getDerivedStateFromProps,
            nextProps
          ), oldContext = workInProgress2.memoizedState), (oldProps = hasForceUpdate || checkShouldComponentUpdate(
            workInProgress2,
            Component,
            oldProps,
            nextProps,
            oldState,
            oldContext,
            contextType
          )) ? (contextType$jscomp$0 || "function" !== typeof context.UNSAFE_componentWillMount && "function" !== typeof context.componentWillMount || ("function" === typeof context.componentWillMount && context.componentWillMount(), "function" === typeof context.UNSAFE_componentWillMount && context.UNSAFE_componentWillMount()), "function" === typeof context.componentDidMount && (workInProgress2.flags |= 4194308)) : ("function" === typeof context.componentDidMount && (workInProgress2.flags |= 4194308), workInProgress2.memoizedProps = nextProps, workInProgress2.memoizedState = oldContext), context.props = nextProps, context.state = oldContext, context.context = contextType, nextProps = oldProps) : ("function" === typeof context.componentDidMount && (workInProgress2.flags |= 4194308), nextProps = false);
        } else {
          context = workInProgress2.stateNode;
          cloneUpdateQueue(current, workInProgress2);
          contextType = workInProgress2.memoizedProps;
          contextType$jscomp$0 = resolveClassComponentProps(Component, contextType);
          context.props = contextType$jscomp$0;
          getDerivedStateFromProps = workInProgress2.pendingProps;
          oldState = context.context;
          oldContext = Component.contextType;
          oldProps = emptyContextObject;
          "object" === typeof oldContext && null !== oldContext && (oldProps = readContext(oldContext));
          unresolvedOldProps = Component.getDerivedStateFromProps;
          (oldContext = "function" === typeof unresolvedOldProps || "function" === typeof context.getSnapshotBeforeUpdate) || "function" !== typeof context.UNSAFE_componentWillReceiveProps && "function" !== typeof context.componentWillReceiveProps || (contextType !== getDerivedStateFromProps || oldState !== oldProps) && callComponentWillReceiveProps(
            workInProgress2,
            context,
            nextProps,
            oldProps
          );
          hasForceUpdate = false;
          oldState = workInProgress2.memoizedState;
          context.state = oldState;
          processUpdateQueue(workInProgress2, nextProps, context, renderLanes2);
          suspendIfUpdateReadFromEntangledAsyncAction();
          var newState = workInProgress2.memoizedState;
          contextType !== getDerivedStateFromProps || oldState !== newState || hasForceUpdate || null !== current && null !== current.dependencies && checkIfContextChanged(current.dependencies) ? ("function" === typeof unresolvedOldProps && (applyDerivedStateFromProps(
            workInProgress2,
            Component,
            unresolvedOldProps,
            nextProps
          ), newState = workInProgress2.memoizedState), (contextType$jscomp$0 = hasForceUpdate || checkShouldComponentUpdate(
            workInProgress2,
            Component,
            contextType$jscomp$0,
            nextProps,
            oldState,
            newState,
            oldProps
          ) || null !== current && null !== current.dependencies && checkIfContextChanged(current.dependencies)) ? (oldContext || "function" !== typeof context.UNSAFE_componentWillUpdate && "function" !== typeof context.componentWillUpdate || ("function" === typeof context.componentWillUpdate && context.componentWillUpdate(nextProps, newState, oldProps), "function" === typeof context.UNSAFE_componentWillUpdate && context.UNSAFE_componentWillUpdate(
            nextProps,
            newState,
            oldProps
          )), "function" === typeof context.componentDidUpdate && (workInProgress2.flags |= 4), "function" === typeof context.getSnapshotBeforeUpdate && (workInProgress2.flags |= 1024)) : ("function" !== typeof context.componentDidUpdate || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress2.flags |= 4), "function" !== typeof context.getSnapshotBeforeUpdate || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress2.flags |= 1024), workInProgress2.memoizedProps = nextProps, workInProgress2.memoizedState = newState), context.props = nextProps, context.state = newState, context.context = oldProps, nextProps = contextType$jscomp$0) : ("function" !== typeof context.componentDidUpdate || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress2.flags |= 4), "function" !== typeof context.getSnapshotBeforeUpdate || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress2.flags |= 1024), nextProps = false);
        }
        context = nextProps;
        markRef(current, workInProgress2);
        nextProps = 0 !== (workInProgress2.flags & 128);
        context || nextProps ? (context = workInProgress2.stateNode, Component = nextProps && "function" !== typeof Component.getDerivedStateFromError ? null : context.render(), workInProgress2.flags |= 1, null !== current && nextProps ? (workInProgress2.child = reconcileChildFibers(
          workInProgress2,
          current.child,
          null,
          renderLanes2
        ), workInProgress2.child = reconcileChildFibers(
          workInProgress2,
          null,
          Component,
          renderLanes2
        )) : reconcileChildren(current, workInProgress2, Component, renderLanes2), workInProgress2.memoizedState = context.state, current = workInProgress2.child) : current = bailoutOnAlreadyFinishedWork(
          current,
          workInProgress2,
          renderLanes2
        );
        return current;
      }
      function mountHostRootWithoutHydrating(current, workInProgress2, nextChildren, renderLanes2) {
        resetHydrationState();
        workInProgress2.flags |= 256;
        reconcileChildren(current, workInProgress2, nextChildren, renderLanes2);
        return workInProgress2.child;
      }
      var SUSPENDED_MARKER = {
        dehydrated: null,
        treeContext: null,
        retryLane: 0,
        hydrationErrors: null
      };
      function mountSuspenseOffscreenState(renderLanes2) {
        return { baseLanes: renderLanes2, cachePool: getSuspendedCache() };
      }
      function getRemainingWorkInPrimaryTree(current, primaryTreeDidDefer, renderLanes2) {
        current = null !== current ? current.childLanes & ~renderLanes2 : 0;
        primaryTreeDidDefer && (current |= workInProgressDeferredLane);
        return current;
      }
      function updateSuspenseComponent(current, workInProgress2, renderLanes2) {
        var nextProps = workInProgress2.pendingProps, showFallback = false, didSuspend = 0 !== (workInProgress2.flags & 128), JSCompiler_temp;
        (JSCompiler_temp = didSuspend) || (JSCompiler_temp = null !== current && null === current.memoizedState ? false : 0 !== (suspenseStackCursor.current & 2));
        JSCompiler_temp && (showFallback = true, workInProgress2.flags &= -129);
        JSCompiler_temp = 0 !== (workInProgress2.flags & 32);
        workInProgress2.flags &= -33;
        if (null === current) {
          if (isHydrating) {
            showFallback ? pushPrimaryTreeSuspenseHandler(workInProgress2) : reuseSuspenseHandlerOnStack();
            (current = nextHydratableInstance) ? (current = canHydrateHydrationBoundary(
              current,
              rootOrSingletonContext
            ), current = null !== current && "&" !== current.data ? current : null, null !== current && (workInProgress2.memoizedState = {
              dehydrated: current,
              treeContext: null !== treeContextProvider ? { id: treeContextId, overflow: treeContextOverflow } : null,
              retryLane: 536870912,
              hydrationErrors: null
            }, renderLanes2 = createFiberFromDehydratedFragment(current), renderLanes2.return = workInProgress2, workInProgress2.child = renderLanes2, hydrationParentFiber = workInProgress2, nextHydratableInstance = null)) : current = null;
            if (null === current) throw throwOnHydrationMismatch(workInProgress2);
            isSuspenseInstanceFallback(current) ? workInProgress2.lanes = 32 : workInProgress2.lanes = 536870912;
            return null;
          }
          didSuspend = nextProps.children;
          nextProps = nextProps.fallback;
          if (showFallback)
            return reuseSuspenseHandlerOnStack(), showFallback = workInProgress2.mode, didSuspend = mountWorkInProgressOffscreenFiber(
              { mode: "hidden", children: didSuspend },
              showFallback
            ), nextProps = createFiberFromFragment(
              nextProps,
              showFallback,
              renderLanes2,
              null
            ), didSuspend.return = workInProgress2, nextProps.return = workInProgress2, didSuspend.sibling = nextProps, workInProgress2.child = didSuspend, nextProps = workInProgress2.child, nextProps.memoizedState = mountSuspenseOffscreenState(renderLanes2), nextProps.childLanes = getRemainingWorkInPrimaryTree(
              current,
              JSCompiler_temp,
              renderLanes2
            ), workInProgress2.memoizedState = SUSPENDED_MARKER, bailoutOffscreenComponent(null, nextProps);
          pushPrimaryTreeSuspenseHandler(workInProgress2);
          return mountSuspensePrimaryChildren(workInProgress2, didSuspend);
        }
        var prevState = current.memoizedState;
        if (null !== prevState) {
          var dehydrated$96 = prevState.dehydrated;
          if (null !== dehydrated$96)
            return updateDehydratedSuspenseComponent(
              current,
              workInProgress2,
              didSuspend,
              JSCompiler_temp,
              nextProps,
              dehydrated$96,
              prevState,
              renderLanes2
            );
        }
        if (showFallback)
          return reuseSuspenseHandlerOnStack(), showFallback = nextProps.fallback, didSuspend = workInProgress2.mode, prevState = current.child, dehydrated$96 = prevState.sibling, nextProps = createWorkInProgress(prevState, {
            mode: "hidden",
            children: nextProps.children
          }), nextProps.subtreeFlags = prevState.subtreeFlags & 1206910976, null !== dehydrated$96 ? showFallback = createWorkInProgress(dehydrated$96, showFallback) : (showFallback = createFiberFromFragment(
            showFallback,
            didSuspend,
            renderLanes2,
            null
          ), showFallback.flags |= 2), showFallback.return = workInProgress2, nextProps.return = workInProgress2, nextProps.sibling = showFallback, workInProgress2.child = nextProps, bailoutOffscreenComponent(null, nextProps), nextProps = workInProgress2.child, showFallback = current.child.memoizedState, null === showFallback ? showFallback = mountSuspenseOffscreenState(renderLanes2) : (didSuspend = showFallback.cachePool, null !== didSuspend ? (prevState = CacheContext._currentValue, didSuspend = didSuspend.parent !== prevState ? { parent: prevState, pool: prevState } : didSuspend) : didSuspend = getSuspendedCache(), showFallback = {
            baseLanes: showFallback.baseLanes | renderLanes2,
            cachePool: didSuspend
          }), nextProps.memoizedState = showFallback, nextProps.childLanes = getRemainingWorkInPrimaryTree(
            current,
            JSCompiler_temp,
            renderLanes2
          ), workInProgress2.memoizedState = SUSPENDED_MARKER, bailoutOffscreenComponent(current.child, nextProps);
        pushPrimaryTreeSuspenseHandler(workInProgress2);
        renderLanes2 = current.child;
        current = renderLanes2.sibling;
        renderLanes2 = createWorkInProgress(renderLanes2, {
          mode: "visible",
          children: nextProps.children
        });
        renderLanes2.return = workInProgress2;
        renderLanes2.sibling = null;
        null !== current && (JSCompiler_temp = workInProgress2.deletions, null === JSCompiler_temp ? (workInProgress2.deletions = [current], workInProgress2.flags |= 16) : JSCompiler_temp.push(current));
        workInProgress2.child = renderLanes2;
        workInProgress2.memoizedState = null;
        return renderLanes2;
      }
      function mountSuspensePrimaryChildren(workInProgress2, primaryChildren) {
        primaryChildren = mountWorkInProgressOffscreenFiber(
          { mode: "visible", children: primaryChildren },
          workInProgress2.mode
        );
        primaryChildren.return = workInProgress2;
        return workInProgress2.child = primaryChildren;
      }
      function mountWorkInProgressOffscreenFiber(offscreenProps, mode) {
        offscreenProps = createFiberImplClass(22, offscreenProps, null, mode);
        offscreenProps.lanes = 0;
        return offscreenProps;
      }
      function retrySuspenseComponentWithoutHydrating(current, workInProgress2, renderLanes2) {
        reconcileChildFibers(workInProgress2, current.child, null, renderLanes2);
        current = mountSuspensePrimaryChildren(
          workInProgress2,
          workInProgress2.pendingProps.children
        );
        current.flags |= 2;
        workInProgress2.memoizedState = null;
        return current;
      }
      function updateDehydratedSuspenseComponent(current, workInProgress2, didSuspend, didPrimaryChildrenDefer, nextProps, suspenseInstance, suspenseState, renderLanes2) {
        if (didSuspend) {
          if (workInProgress2.flags & 256)
            return pushPrimaryTreeSuspenseHandler(workInProgress2), workInProgress2.flags &= -257, retrySuspenseComponentWithoutHydrating(
              current,
              workInProgress2,
              renderLanes2
            );
          if (null !== workInProgress2.memoizedState)
            return reuseSuspenseHandlerOnStack(), workInProgress2.child = current.child, workInProgress2.flags |= 128, null;
          reuseSuspenseHandlerOnStack();
          suspenseInstance = nextProps.fallback;
          suspenseState = workInProgress2.mode;
          nextProps = mountWorkInProgressOffscreenFiber(
            { mode: "visible", children: nextProps.children },
            suspenseState
          );
          suspenseInstance = createFiberFromFragment(
            suspenseInstance,
            suspenseState,
            renderLanes2,
            null
          );
          suspenseInstance.flags |= 2;
          nextProps.return = workInProgress2;
          suspenseInstance.return = workInProgress2;
          nextProps.sibling = suspenseInstance;
          workInProgress2.child = nextProps;
          reconcileChildFibers(workInProgress2, current.child, null, renderLanes2);
          nextProps = workInProgress2.child;
          nextProps.memoizedState = mountSuspenseOffscreenState(renderLanes2);
          nextProps.childLanes = getRemainingWorkInPrimaryTree(
            current,
            didPrimaryChildrenDefer,
            renderLanes2
          );
          workInProgress2.memoizedState = SUSPENDED_MARKER;
          return bailoutOffscreenComponent(null, nextProps);
        }
        pushPrimaryTreeSuspenseHandler(workInProgress2);
        if (isSuspenseInstanceFallback(suspenseInstance)) {
          didPrimaryChildrenDefer = suspenseInstance.nextSibling && suspenseInstance.nextSibling.dataset;
          if (didPrimaryChildrenDefer) var digest = didPrimaryChildrenDefer.dgst;
          didPrimaryChildrenDefer = digest;
          "" !== didPrimaryChildrenDefer && (nextProps = Error(formatProdErrorMessage(419)), nextProps.stack = "", nextProps.digest = didPrimaryChildrenDefer, queueHydrationError({ value: nextProps, source: null, stack: null }));
          return retrySuspenseComponentWithoutHydrating(
            current,
            workInProgress2,
            renderLanes2
          );
        }
        didReceiveUpdate || propagateParentContextChanges(current, workInProgress2, renderLanes2, false);
        didPrimaryChildrenDefer = 0 !== (renderLanes2 & current.childLanes);
        if (didReceiveUpdate || didPrimaryChildrenDefer) {
          if (null !== currentTreeHiddenStackCursor.current)
            return retrySuspenseComponentWithoutHydrating(
              current,
              workInProgress2,
              renderLanes2
            );
          didPrimaryChildrenDefer = workInProgressRoot;
          if (null !== didPrimaryChildrenDefer && (nextProps = getBumpedLaneForHydration(
            didPrimaryChildrenDefer,
            renderLanes2
          ), 0 !== nextProps && nextProps !== suspenseState.retryLane))
            throw suspenseState.retryLane = nextProps, enqueueConcurrentRenderForLane(current, nextProps), scheduleUpdateOnFiber(didPrimaryChildrenDefer, current, nextProps), SelectiveHydrationException;
          isSuspenseInstancePending(suspenseInstance) || renderDidSuspendDelayIfPossible();
          return retrySuspenseComponentWithoutHydrating(
            current,
            workInProgress2,
            renderLanes2
          );
        }
        if (isSuspenseInstancePending(suspenseInstance))
          return workInProgress2.flags |= 192, workInProgress2.child = current.child, null;
        current = suspenseState.treeContext;
        nextHydratableInstance = getNextHydratable(suspenseInstance.nextSibling);
        hydrationParentFiber = workInProgress2;
        isHydrating = true;
        hydrationErrors = null;
        rootOrSingletonContext = false;
        null !== current && restoreSuspendedTreeContext(workInProgress2, current);
        workInProgress2 = mountSuspensePrimaryChildren(
          workInProgress2,
          nextProps.children
        );
        workInProgress2.flags |= 134221824;
        return workInProgress2;
      }
      function scheduleSuspenseWorkOnFiber(fiber, renderLanes2, propagationRoot) {
        fiber.lanes |= renderLanes2;
        var alternate = fiber.alternate;
        null !== alternate && (alternate.lanes |= renderLanes2);
        scheduleContextWorkOnParentPath(fiber.return, renderLanes2, propagationRoot);
      }
      function findLastContentRow(firstChild) {
        for (var lastContentRow = null; null !== firstChild; ) {
          var currentRow = firstChild.alternate;
          null !== currentRow && null === findFirstSuspended(currentRow) && (lastContentRow = firstChild);
          firstChild = firstChild.sibling;
        }
        return lastContentRow;
      }
      function initSuspenseListRenderState(workInProgress2, isBackwards, tail, lastContentRow, tailMode, treeForkCount2) {
        var renderState = workInProgress2.memoizedState;
        null === renderState ? workInProgress2.memoizedState = {
          isBackwards,
          rendering: null,
          renderingStartTime: 0,
          last: lastContentRow,
          tail,
          tailMode,
          treeForkCount: treeForkCount2
        } : (renderState.isBackwards = isBackwards, renderState.rendering = null, renderState.renderingStartTime = 0, renderState.last = lastContentRow, renderState.tail = tail, renderState.tailMode = tailMode, renderState.treeForkCount = treeForkCount2);
      }
      function reverseChildren(fiber) {
        var row = fiber.child;
        for (fiber.child = null; null !== row; ) {
          var nextRow = row.sibling;
          row.sibling = fiber.child;
          fiber.child = row;
          row = nextRow;
        }
      }
      function updateSuspenseListComponent(current, workInProgress2, renderLanes2) {
        var nextProps = workInProgress2.pendingProps, revealOrder = nextProps.revealOrder, tailMode = nextProps.tail;
        nextProps = nextProps.children;
        var suspenseContext = suspenseStackCursor.current;
        if (workInProgress2.flags & 128)
          return pushSuspenseListContext(workInProgress2, suspenseContext), null;
        var shouldForceFallback = 0 !== (suspenseContext & 2);
        shouldForceFallback ? (suspenseContext = suspenseContext & 1 | 2, workInProgress2.flags |= 128) : suspenseContext &= 1;
        pushSuspenseListContext(workInProgress2, suspenseContext);
        "backwards" === revealOrder && null !== current ? (reverseChildren(current), reconcileChildren(current, workInProgress2, nextProps, renderLanes2), reverseChildren(current)) : reconcileChildren(current, workInProgress2, nextProps, renderLanes2);
        nextProps = isHydrating ? treeForkCount : 0;
        if (!shouldForceFallback && null !== current && 0 !== (current.flags & 128))
          a: for (current = workInProgress2.child; null !== current; ) {
            if (13 === current.tag)
              null !== current.memoizedState && scheduleSuspenseWorkOnFiber(current, renderLanes2, workInProgress2);
            else if (19 === current.tag)
              scheduleSuspenseWorkOnFiber(current, renderLanes2, workInProgress2);
            else if (null !== current.child) {
              current.child.return = current;
              current = current.child;
              continue;
            }
            if (current === workInProgress2) break a;
            for (; null === current.sibling; ) {
              if (null === current.return || current.return === workInProgress2)
                break a;
              current = current.return;
            }
            current.sibling.return = current.return;
            current = current.sibling;
          }
        switch (revealOrder) {
          case "backwards":
            renderLanes2 = findLastContentRow(workInProgress2.child);
            null === renderLanes2 ? (revealOrder = workInProgress2.child, workInProgress2.child = null) : (revealOrder = renderLanes2.sibling, renderLanes2.sibling = null, reverseChildren(workInProgress2));
            initSuspenseListRenderState(
              workInProgress2,
              true,
              revealOrder,
              null,
              tailMode,
              nextProps
            );
            break;
          case "unstable_legacy-backwards":
            renderLanes2 = null;
            revealOrder = workInProgress2.child;
            for (workInProgress2.child = null; null !== revealOrder; ) {
              current = revealOrder.alternate;
              if (null !== current && null === findFirstSuspended(current)) {
                workInProgress2.child = revealOrder;
                break;
              }
              current = revealOrder.sibling;
              revealOrder.sibling = renderLanes2;
              renderLanes2 = revealOrder;
              revealOrder = current;
            }
            initSuspenseListRenderState(
              workInProgress2,
              true,
              renderLanes2,
              null,
              tailMode,
              nextProps
            );
            break;
          case "together":
            initSuspenseListRenderState(
              workInProgress2,
              false,
              null,
              null,
              void 0,
              nextProps
            );
            break;
          case "independent":
            workInProgress2.memoizedState = null;
            break;
          default:
            renderLanes2 = findLastContentRow(workInProgress2.child), null === renderLanes2 ? (revealOrder = workInProgress2.child, workInProgress2.child = null) : (revealOrder = renderLanes2.sibling, renderLanes2.sibling = null), initSuspenseListRenderState(
              workInProgress2,
              false,
              revealOrder,
              renderLanes2,
              tailMode,
              nextProps
            );
        }
        return workInProgress2.child;
      }
      function updateContextProvider(current, workInProgress2, renderLanes2) {
        var newProps = workInProgress2.pendingProps;
        pushProvider(workInProgress2, workInProgress2.type, newProps.value);
        reconcileChildren(current, workInProgress2, newProps.children, renderLanes2);
        return workInProgress2.child;
      }
      function bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2) {
        null !== current && (workInProgress2.dependencies = current.dependencies);
        workInProgressRootSkippedLanes |= workInProgress2.lanes;
        if (0 === (renderLanes2 & workInProgress2.childLanes))
          if (null !== current) {
            if (propagateParentContextChanges(
              current,
              workInProgress2,
              renderLanes2,
              false
            ), 0 === (renderLanes2 & workInProgress2.childLanes))
              return null;
          } else return null;
        if (null !== current && workInProgress2.child !== current.child)
          throw Error(formatProdErrorMessage(153));
        if (null !== workInProgress2.child) {
          current = workInProgress2.child;
          renderLanes2 = createWorkInProgress(current, current.pendingProps);
          workInProgress2.child = renderLanes2;
          for (renderLanes2.return = workInProgress2; null !== current.sibling; )
            current = current.sibling, renderLanes2 = renderLanes2.sibling = createWorkInProgress(current, current.pendingProps), renderLanes2.return = workInProgress2;
          renderLanes2.sibling = null;
        }
        return workInProgress2.child;
      }
      function checkScheduledUpdateOrContext(current, renderLanes2) {
        if (0 !== (current.lanes & renderLanes2)) return true;
        current = current.dependencies;
        return null !== current && checkIfContextChanged(current) ? true : false;
      }
      function attemptEarlyBailoutIfNoScheduledUpdate(current, workInProgress2, renderLanes2) {
        switch (workInProgress2.tag) {
          case 3:
            pushHostContainer(workInProgress2, workInProgress2.stateNode.containerInfo);
            pushProvider(workInProgress2, CacheContext, current.memoizedState.cache);
            resetHydrationState();
            break;
          case 27:
          case 5:
            pushHostContext(workInProgress2);
            break;
          case 4:
            pushHostContainer(workInProgress2, workInProgress2.stateNode.containerInfo);
            break;
          case 10:
            pushProvider(
              workInProgress2,
              workInProgress2.type,
              workInProgress2.memoizedProps.value
            );
            break;
          case 31:
            if (null !== workInProgress2.memoizedState)
              return workInProgress2.flags |= 128, pushDehydratedActivitySuspenseHandler(workInProgress2), null;
            break;
          case 13:
            var state$108 = workInProgress2.memoizedState;
            if (null !== state$108) {
              if (null !== state$108.dehydrated)
                return pushPrimaryTreeSuspenseHandler(workInProgress2), workInProgress2.flags |= 128, null;
              state$108 = propagateParentContextChanges(
                current,
                workInProgress2,
                renderLanes2,
                false
              );
              var primaryChildLanes = workInProgress2.child.childLanes;
              if (state$108 || 0 !== (renderLanes2 & primaryChildLanes))
                return updateSuspenseComponent(current, workInProgress2, renderLanes2);
              pushPrimaryTreeSuspenseHandler(workInProgress2);
              current = bailoutOnAlreadyFinishedWork(
                current,
                workInProgress2,
                renderLanes2
              );
              return null !== current ? current.sibling : null;
            }
            pushPrimaryTreeSuspenseHandler(workInProgress2);
            break;
          case 19:
            if (workInProgress2.flags & 128)
              return updateSuspenseListComponent(
                current,
                workInProgress2,
                renderLanes2
              );
            primaryChildLanes = 0 !== (current.flags & 128);
            state$108 = 0 !== (renderLanes2 & workInProgress2.childLanes);
            state$108 || (propagateParentContextChanges(
              current,
              workInProgress2,
              renderLanes2,
              false
            ), state$108 = 0 !== (renderLanes2 & workInProgress2.childLanes));
            if (primaryChildLanes) {
              if (state$108)
                return updateSuspenseListComponent(
                  current,
                  workInProgress2,
                  renderLanes2
                );
              workInProgress2.flags |= 128;
            }
            primaryChildLanes = workInProgress2.memoizedState;
            null !== primaryChildLanes && (primaryChildLanes.rendering = null, primaryChildLanes.tail = null, primaryChildLanes.lastEffect = null);
            pushSuspenseListContext(workInProgress2, suspenseStackCursor.current);
            if (state$108) break;
            else return null;
          case 22:
            return workInProgress2.lanes = 0, updateOffscreenComponent(
              current,
              workInProgress2,
              renderLanes2,
              workInProgress2.pendingProps
            );
          case 24:
            pushProvider(workInProgress2, CacheContext, current.memoizedState.cache);
        }
        return bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
      }
      function beginWork(current, workInProgress2, renderLanes2) {
        if (null !== current)
          if (current.memoizedProps !== workInProgress2.pendingProps)
            didReceiveUpdate = true;
          else {
            if (!checkScheduledUpdateOrContext(current, renderLanes2) && 0 === (workInProgress2.flags & 128))
              return didReceiveUpdate = false, attemptEarlyBailoutIfNoScheduledUpdate(
                current,
                workInProgress2,
                renderLanes2
              );
            didReceiveUpdate = 0 !== (current.flags & 131072) ? true : false;
          }
        else
          didReceiveUpdate = false, isHydrating && 0 !== (workInProgress2.flags & 1048576) && pushTreeId(workInProgress2, treeForkCount, workInProgress2.index);
        workInProgress2.lanes = 0;
        switch (workInProgress2.tag) {
          case 16:
            a: {
              var props = workInProgress2.pendingProps;
              current = resolveLazy(workInProgress2.elementType);
              workInProgress2.type = current;
              if ("function" === typeof current)
                shouldConstruct(current) ? (props = resolveClassComponentProps(current, props), workInProgress2.tag = 1, workInProgress2 = updateClassComponent(
                  null,
                  workInProgress2,
                  current,
                  props,
                  renderLanes2
                )) : (workInProgress2.tag = 0, workInProgress2 = updateFunctionComponent(
                  null,
                  workInProgress2,
                  current,
                  props,
                  renderLanes2
                ));
              else {
                if (void 0 !== current && null !== current) {
                  var $$typeof = current.$$typeof;
                  if ($$typeof === REACT_FORWARD_REF_TYPE) {
                    workInProgress2.tag = 11;
                    workInProgress2 = updateForwardRef(
                      null,
                      workInProgress2,
                      current,
                      props,
                      renderLanes2
                    );
                    break a;
                  } else if ($$typeof === REACT_MEMO_TYPE) {
                    workInProgress2.tag = 14;
                    workInProgress2 = updateMemoComponent(
                      null,
                      workInProgress2,
                      current,
                      props,
                      renderLanes2
                    );
                    break a;
                  } else if ($$typeof === REACT_CONTEXT_TYPE) {
                    workInProgress2.tag = 10;
                    workInProgress2.type = current;
                    workInProgress2 = updateContextProvider(
                      null,
                      workInProgress2,
                      renderLanes2
                    );
                    break a;
                  }
                }
                workInProgress2 = getComponentNameFromType(current) || current;
                throw Error(formatProdErrorMessage(306, workInProgress2, ""));
              }
            }
            return workInProgress2;
          case 0:
            return updateFunctionComponent(
              current,
              workInProgress2,
              workInProgress2.type,
              workInProgress2.pendingProps,
              renderLanes2
            );
          case 1:
            return props = workInProgress2.type, $$typeof = resolveClassComponentProps(
              props,
              workInProgress2.pendingProps
            ), updateClassComponent(
              current,
              workInProgress2,
              props,
              $$typeof,
              renderLanes2
            );
          case 3:
            a: {
              pushHostContainer(
                workInProgress2,
                workInProgress2.stateNode.containerInfo
              );
              if (null === current) throw Error(formatProdErrorMessage(387));
              props = workInProgress2.pendingProps;
              var prevState = workInProgress2.memoizedState;
              $$typeof = prevState.element;
              cloneUpdateQueue(current, workInProgress2);
              processUpdateQueue(workInProgress2, props, null, renderLanes2);
              var nextState = workInProgress2.memoizedState;
              props = nextState.cache;
              pushProvider(workInProgress2, CacheContext, props);
              props !== prevState.cache && propagateContextChanges(
                workInProgress2,
                [CacheContext],
                renderLanes2,
                true
              );
              suspendIfUpdateReadFromEntangledAsyncAction();
              props = nextState.element;
              if (prevState.isDehydrated)
                if (prevState = {
                  element: props,
                  isDehydrated: false,
                  cache: nextState.cache
                }, workInProgress2.updateQueue.baseState = prevState, workInProgress2.memoizedState = prevState, workInProgress2.flags & 256) {
                  workInProgress2 = mountHostRootWithoutHydrating(
                    current,
                    workInProgress2,
                    props,
                    renderLanes2
                  );
                  break a;
                } else if (props !== $$typeof) {
                  $$typeof = createCapturedValueAtFiber(
                    Error(formatProdErrorMessage(424)),
                    workInProgress2
                  );
                  queueHydrationError($$typeof);
                  workInProgress2 = mountHostRootWithoutHydrating(
                    current,
                    workInProgress2,
                    props,
                    renderLanes2
                  );
                  break a;
                } else {
                  current = workInProgress2.stateNode.containerInfo;
                  switch (current.nodeType) {
                    case 9:
                      current = current.body;
                      break;
                    default:
                      current = "HTML" === current.nodeName ? current.ownerDocument.body : current;
                  }
                  nextHydratableInstance = getNextHydratable(current.firstChild);
                  hydrationParentFiber = workInProgress2;
                  isHydrating = true;
                  hydrationErrors = null;
                  rootOrSingletonContext = true;
                  renderLanes2 = mountChildFibers(
                    workInProgress2,
                    null,
                    props,
                    renderLanes2
                  );
                  for (workInProgress2.child = renderLanes2; renderLanes2; )
                    renderLanes2.flags = renderLanes2.flags & -3 | 134221824, renderLanes2 = renderLanes2.sibling;
                }
              else {
                resetHydrationState();
                if (props === $$typeof) {
                  workInProgress2 = bailoutOnAlreadyFinishedWork(
                    current,
                    workInProgress2,
                    renderLanes2
                  );
                  break a;
                }
                reconcileChildren(current, workInProgress2, props, renderLanes2);
              }
              workInProgress2 = workInProgress2.child;
            }
            return workInProgress2;
          case 26:
            return markRef(current, workInProgress2), null === current ? (renderLanes2 = getResource(
              workInProgress2.type,
              null,
              workInProgress2.pendingProps,
              null
            )) ? workInProgress2.memoizedState = renderLanes2 : isHydrating || (workInProgress2.stateNode = createHoistableInstance(
              workInProgress2.type,
              workInProgress2.pendingProps,
              rootInstanceStackCursor.current,
              workInProgress2
            )) : workInProgress2.memoizedState = getResource(
              workInProgress2.type,
              current.memoizedProps,
              workInProgress2.pendingProps,
              current.memoizedState
            ), null;
          case 27:
            return pushHostContext(workInProgress2), null === current && isHydrating && (props = workInProgress2.stateNode = resolveSingletonInstance(
              workInProgress2.type,
              workInProgress2.pendingProps,
              rootInstanceStackCursor.current
            ), hydrationParentFiber = workInProgress2, rootOrSingletonContext = true, $$typeof = nextHydratableInstance, isSingletonScope(workInProgress2.type) ? (previousHydratableOnEnteringScopedSingleton = $$typeof, nextHydratableInstance = getNextHydratable(props.firstChild)) : nextHydratableInstance = $$typeof), reconcileChildren(
              current,
              workInProgress2,
              workInProgress2.pendingProps.children,
              renderLanes2
            ), markRef(current, workInProgress2), null === current && (workInProgress2.flags |= 4194304), workInProgress2.child;
          case 5:
            if (null === current && isHydrating) {
              if ($$typeof = props = nextHydratableInstance)
                props = canHydrateInstance(
                  props,
                  workInProgress2.type,
                  workInProgress2.pendingProps,
                  rootOrSingletonContext
                ), null !== props ? (workInProgress2.stateNode = props, hydrationParentFiber = workInProgress2, nextHydratableInstance = getNextHydratable(props.firstChild), rootOrSingletonContext = false, $$typeof = true) : $$typeof = false;
              $$typeof || throwOnHydrationMismatch(workInProgress2);
            }
            pushHostContext(workInProgress2);
            $$typeof = workInProgress2.type;
            prevState = workInProgress2.pendingProps;
            nextState = null !== current ? current.memoizedProps : null;
            props = prevState.children;
            shouldSetTextContent($$typeof, prevState) ? props = null : null !== nextState && shouldSetTextContent($$typeof, nextState) && (workInProgress2.flags |= 32);
            null !== workInProgress2.memoizedState && ($$typeof = renderWithHooks(
              current,
              workInProgress2,
              TransitionAwareHostComponent,
              null,
              null,
              renderLanes2
            ), HostTransitionContext._currentValue = $$typeof);
            markRef(current, workInProgress2);
            reconcileChildren(current, workInProgress2, props, renderLanes2);
            return workInProgress2.child;
          case 6:
            if (null === current && isHydrating) {
              if (current = renderLanes2 = nextHydratableInstance)
                renderLanes2 = canHydrateTextInstance(
                  renderLanes2,
                  workInProgress2.pendingProps,
                  rootOrSingletonContext
                ), null !== renderLanes2 ? (workInProgress2.stateNode = renderLanes2, hydrationParentFiber = workInProgress2, nextHydratableInstance = null, current = true) : current = false;
              current || throwOnHydrationMismatch(workInProgress2);
            }
            return null;
          case 13:
            return updateSuspenseComponent(current, workInProgress2, renderLanes2);
          case 4:
            return pushHostContainer(
              workInProgress2,
              workInProgress2.stateNode.containerInfo
            ), props = workInProgress2.pendingProps, null === current ? workInProgress2.child = reconcileChildFibers(
              workInProgress2,
              null,
              props,
              renderLanes2
            ) : reconcileChildren(current, workInProgress2, props, renderLanes2), workInProgress2.child;
          case 11:
            return updateForwardRef(
              current,
              workInProgress2,
              workInProgress2.type,
              workInProgress2.pendingProps,
              renderLanes2
            );
          case 7:
            return props = workInProgress2.pendingProps, markRef(current, workInProgress2), reconcileChildren(current, workInProgress2, props, renderLanes2), workInProgress2.child;
          case 8:
            return reconcileChildren(
              current,
              workInProgress2,
              workInProgress2.pendingProps.children,
              renderLanes2
            ), workInProgress2.child;
          case 12:
            return reconcileChildren(
              current,
              workInProgress2,
              workInProgress2.pendingProps.children,
              renderLanes2
            ), workInProgress2.child;
          case 10:
            return updateContextProvider(current, workInProgress2, renderLanes2);
          case 9:
            return $$typeof = workInProgress2.type._context, props = workInProgress2.pendingProps.children, prepareToReadContext(workInProgress2), $$typeof = readContext($$typeof), props = props($$typeof), workInProgress2.flags |= 1, reconcileChildren(current, workInProgress2, props, renderLanes2), workInProgress2.child;
          case 14:
            return updateMemoComponent(
              current,
              workInProgress2,
              workInProgress2.type,
              workInProgress2.pendingProps,
              renderLanes2
            );
          case 15:
            return updateSimpleMemoComponent(
              current,
              workInProgress2,
              workInProgress2.type,
              workInProgress2.pendingProps,
              renderLanes2
            );
          case 19:
            return updateSuspenseListComponent(current, workInProgress2, renderLanes2);
          case 31:
            return updateActivityComponent(current, workInProgress2, renderLanes2);
          case 22:
            return updateOffscreenComponent(
              current,
              workInProgress2,
              renderLanes2,
              workInProgress2.pendingProps
            );
          case 24:
            return prepareToReadContext(workInProgress2), props = readContext(CacheContext), null === current ? ($$typeof = peekCacheFromPool(), null === $$typeof && ($$typeof = workInProgressRoot, prevState = createCache(), $$typeof.pooledCache = prevState, prevState.refCount++, null !== prevState && ($$typeof.pooledCacheLanes |= renderLanes2), $$typeof = prevState), workInProgress2.memoizedState = { parent: props, cache: $$typeof }, initializeUpdateQueue(workInProgress2), pushProvider(workInProgress2, CacheContext, $$typeof)) : (0 !== (current.lanes & renderLanes2) && (cloneUpdateQueue(current, workInProgress2), processUpdateQueue(workInProgress2, null, null, renderLanes2), suspendIfUpdateReadFromEntangledAsyncAction()), $$typeof = current.memoizedState, prevState = workInProgress2.memoizedState, $$typeof.parent !== props ? ($$typeof = { parent: props, cache: props }, workInProgress2.memoizedState = $$typeof, 0 === workInProgress2.lanes && (workInProgress2.memoizedState = workInProgress2.updateQueue.baseState = $$typeof), pushProvider(workInProgress2, CacheContext, props)) : (props = prevState.cache, pushProvider(workInProgress2, CacheContext, props), props !== $$typeof.cache && propagateContextChanges(
              workInProgress2,
              [CacheContext],
              renderLanes2,
              true
            ))), reconcileChildren(
              current,
              workInProgress2,
              workInProgress2.pendingProps.children,
              renderLanes2
            ), workInProgress2.child;
          case 30:
            return null === workInProgress2.stateNode && (workInProgress2.stateNode = {
              autoName: null,
              paired: null,
              clones: null,
              ref: null
            }), props = workInProgress2.pendingProps, null != props.name && "auto" !== props.name ? workInProgress2.flags |= null === current ? 18882560 : 18874368 : isHydrating && pushMaterializedTreeId(workInProgress2), null !== current && current.memoizedProps.name !== props.name ? workInProgress2.flags |= 4194816 : markRef(current, workInProgress2), reconcileChildren(current, workInProgress2, props.children, renderLanes2), workInProgress2.child;
          case 29:
            throw workInProgress2.pendingProps;
        }
        throw Error(formatProdErrorMessage(156, workInProgress2.tag));
      }
      function markUpdate(workInProgress2) {
        workInProgress2.flags |= 4;
      }
      function preloadInstanceAndSuspendIfNeeded(workInProgress2, type, oldProps, newProps, renderLanes2) {
        var JSCompiler_temp;
        if (JSCompiler_temp = 0 !== (workInProgress2.mode & 32))
          JSCompiler_temp = null === oldProps ? maySuspendCommit(type, newProps) : maySuspendCommit(type, newProps) && (newProps.src !== oldProps.src || newProps.srcSet !== oldProps.srcSet);
        if (JSCompiler_temp) {
          if (workInProgress2.flags |= 16777216, (renderLanes2 & 335544128) === renderLanes2)
            if (workInProgress2.stateNode.complete) workInProgress2.flags |= 8192;
            else if (shouldRemainOnPreviousScreen()) workInProgress2.flags |= 8192;
            else
              throw suspendedThenable = noopSuspenseyCommitThenable, SuspenseyCommitException;
        } else workInProgress2.flags &= -16777217;
      }
      function preloadResourceAndSuspendIfNeeded(workInProgress2, resource) {
        if ("stylesheet" !== resource.type || 0 !== (resource.state.loading & 4))
          workInProgress2.flags &= -16777217;
        else if (workInProgress2.flags |= 16777216, !preloadResource(resource))
          if (shouldRemainOnPreviousScreen()) workInProgress2.flags |= 8192;
          else
            throw suspendedThenable = noopSuspenseyCommitThenable, SuspenseyCommitException;
      }
      function scheduleRetryEffect(workInProgress2, retryQueue) {
        null !== retryQueue && (workInProgress2.flags |= 4);
        workInProgress2.flags & 16384 && (retryQueue = 22 !== workInProgress2.tag ? claimNextRetryLane() : 536870912, workInProgress2.lanes |= retryQueue, workInProgressSuspendedRetryLanes |= retryQueue);
      }
      function cutOffTailIfNeeded(renderState, hasRenderedATailFallback) {
        if (!isHydrating)
          switch (renderState.tailMode) {
            case "visible":
              break;
            case "collapsed":
              for (var tailNode = renderState.tail, lastTailNode = null; null !== tailNode; )
                null !== tailNode.alternate && (lastTailNode = tailNode), tailNode = tailNode.sibling;
              null === lastTailNode ? hasRenderedATailFallback || null === renderState.tail ? renderState.tail = null : renderState.tail.sibling = null : lastTailNode.sibling = null;
              break;
            default:
              hasRenderedATailFallback = renderState.tail;
              for (tailNode = null; null !== hasRenderedATailFallback; )
                null !== hasRenderedATailFallback.alternate && (tailNode = hasRenderedATailFallback), hasRenderedATailFallback = hasRenderedATailFallback.sibling;
              null === tailNode ? renderState.tail = null : tailNode.sibling = null;
          }
      }
      function bubbleProperties(completedWork) {
        var didBailout = null !== completedWork.alternate && completedWork.alternate.child === completedWork.child, newChildLanes = 0, subtreeFlags = 0;
        if (didBailout)
          for (var child$113 = completedWork.child; null !== child$113; )
            newChildLanes |= child$113.lanes | child$113.childLanes, subtreeFlags |= child$113.subtreeFlags & 1206910976, subtreeFlags |= child$113.flags & 1206910976, child$113.return = completedWork, child$113 = child$113.sibling;
        else
          for (child$113 = completedWork.child; null !== child$113; )
            newChildLanes |= child$113.lanes | child$113.childLanes, subtreeFlags |= child$113.subtreeFlags, subtreeFlags |= child$113.flags, child$113.return = completedWork, child$113 = child$113.sibling;
        completedWork.subtreeFlags |= subtreeFlags;
        completedWork.childLanes = newChildLanes;
        return didBailout;
      }
      function completeWork(current, workInProgress2, renderLanes2) {
        var newProps = workInProgress2.pendingProps;
        popTreeContext(workInProgress2);
        switch (workInProgress2.tag) {
          case 16:
          case 15:
          case 0:
          case 11:
          case 7:
          case 8:
          case 12:
          case 9:
          case 14:
            return bubbleProperties(workInProgress2), null;
          case 1:
            return bubbleProperties(workInProgress2), null;
          case 3:
            renderLanes2 = workInProgress2.stateNode;
            newProps = null;
            null !== current && (newProps = current.memoizedState.cache);
            workInProgress2.memoizedState.cache !== newProps && (workInProgress2.flags |= 2048);
            popProvider(CacheContext);
            popHostContainer();
            renderLanes2.pendingContext && (renderLanes2.context = renderLanes2.pendingContext, renderLanes2.pendingContext = null);
            if (null === current || null === current.child)
              popHydrationState(workInProgress2) ? markUpdate(workInProgress2) : null === current || current.memoizedState.isDehydrated && 0 === (workInProgress2.flags & 256) || (workInProgress2.flags |= 1024, upgradeHydrationErrorsToRecoverable());
            bubbleProperties(workInProgress2);
            return null;
          case 26:
            var type = workInProgress2.type, nextResource = workInProgress2.memoizedState;
            null === current ? (markUpdate(workInProgress2), null !== nextResource ? (bubbleProperties(workInProgress2), preloadResourceAndSuspendIfNeeded(workInProgress2, nextResource)) : (bubbleProperties(workInProgress2), preloadInstanceAndSuspendIfNeeded(
              workInProgress2,
              type,
              null,
              newProps,
              renderLanes2
            ))) : nextResource ? nextResource !== current.memoizedState ? (markUpdate(workInProgress2), bubbleProperties(workInProgress2), preloadResourceAndSuspendIfNeeded(workInProgress2, nextResource)) : (bubbleProperties(workInProgress2), workInProgress2.flags &= -16777217) : (current = current.memoizedProps, current !== newProps && markUpdate(workInProgress2), bubbleProperties(workInProgress2), preloadInstanceAndSuspendIfNeeded(
              workInProgress2,
              type,
              current,
              newProps,
              renderLanes2
            ));
            return null;
          case 27:
            popHostContext(workInProgress2);
            renderLanes2 = rootInstanceStackCursor.current;
            type = workInProgress2.type;
            if (null !== current && null != workInProgress2.stateNode)
              current.memoizedProps !== newProps && markUpdate(workInProgress2);
            else {
              if (!newProps) {
                if (null === workInProgress2.stateNode)
                  throw Error(formatProdErrorMessage(166));
                bubbleProperties(workInProgress2);
                workInProgress2.subtreeFlags &= -33554433;
                return null;
              }
              current = contextStackCursor.current;
              popHydrationState(workInProgress2) ? prepareToHydrateHostInstance(workInProgress2, current) : (current = resolveSingletonInstance(type, newProps, renderLanes2), workInProgress2.stateNode = current, markUpdate(workInProgress2));
            }
            bubbleProperties(workInProgress2);
            workInProgress2.subtreeFlags &= -33554433;
            return null;
          case 5:
            popHostContext(workInProgress2);
            type = workInProgress2.type;
            if (null !== current && null != workInProgress2.stateNode)
              current.memoizedProps !== newProps && markUpdate(workInProgress2);
            else {
              if (!newProps) {
                if (null === workInProgress2.stateNode)
                  throw Error(formatProdErrorMessage(166));
                bubbleProperties(workInProgress2);
                workInProgress2.subtreeFlags &= -33554433;
                return null;
              }
              nextResource = contextStackCursor.current;
              if (popHydrationState(workInProgress2))
                prepareToHydrateHostInstance(workInProgress2, nextResource);
              else {
                var ownerDocument = getOwnerDocumentFromRootContainer(
                  rootInstanceStackCursor.current
                );
                switch (nextResource) {
                  case 1:
                    nextResource = ownerDocument.createElementNS(
                      "http://www.w3.org/2000/svg",
                      type
                    );
                    break;
                  case 2:
                    nextResource = ownerDocument.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      type
                    );
                    break;
                  default:
                    switch (type) {
                      case "svg":
                        nextResource = ownerDocument.createElementNS(
                          "http://www.w3.org/2000/svg",
                          type
                        );
                        break;
                      case "math":
                        nextResource = ownerDocument.createElementNS(
                          "http://www.w3.org/1998/Math/MathML",
                          type
                        );
                        break;
                      case "script":
                        nextResource = ownerDocument.createElement("div");
                        nextResource.innerHTML = "<script><\/script>";
                        nextResource = nextResource.removeChild(
                          nextResource.firstChild
                        );
                        break;
                      case "select":
                        nextResource = "string" === typeof newProps.is ? ownerDocument.createElement("select", {
                          is: newProps.is
                        }) : ownerDocument.createElement("select");
                        newProps.multiple ? nextResource.multiple = true : newProps.size && (nextResource.size = newProps.size);
                        break;
                      default:
                        nextResource = "string" === typeof newProps.is ? ownerDocument.createElement(type, { is: newProps.is }) : ownerDocument.createElement(type);
                    }
                }
                nextResource[internalInstanceKey] = workInProgress2;
                nextResource[internalPropsKey] = newProps;
                a: for (ownerDocument = workInProgress2.child; null !== ownerDocument; ) {
                  if (5 === ownerDocument.tag || 6 === ownerDocument.tag)
                    nextResource.appendChild(ownerDocument.stateNode);
                  else if (4 !== ownerDocument.tag && 27 !== ownerDocument.tag && null !== ownerDocument.child) {
                    ownerDocument.child.return = ownerDocument;
                    ownerDocument = ownerDocument.child;
                    continue;
                  }
                  if (ownerDocument === workInProgress2) break a;
                  for (; null === ownerDocument.sibling; ) {
                    if (null === ownerDocument.return || ownerDocument.return === workInProgress2)
                      break a;
                    ownerDocument = ownerDocument.return;
                  }
                  ownerDocument.sibling.return = ownerDocument.return;
                  ownerDocument = ownerDocument.sibling;
                }
                workInProgress2.stateNode = nextResource;
                a: switch (setInitialProperties(nextResource, type, newProps), type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    newProps = !!newProps.autoFocus;
                    break a;
                  case "img":
                    newProps = true;
                    break a;
                  default:
                    newProps = false;
                }
                newProps && markUpdate(workInProgress2);
              }
            }
            bubbleProperties(workInProgress2);
            workInProgress2.subtreeFlags &= -33554433;
            preloadInstanceAndSuspendIfNeeded(
              workInProgress2,
              workInProgress2.type,
              null === current ? null : current.memoizedProps,
              workInProgress2.pendingProps,
              renderLanes2
            );
            return null;
          case 6:
            if (current && null != workInProgress2.stateNode)
              current.memoizedProps !== newProps && markUpdate(workInProgress2);
            else {
              if ("string" !== typeof newProps && null === workInProgress2.stateNode)
                throw Error(formatProdErrorMessage(166));
              current = rootInstanceStackCursor.current;
              if (popHydrationState(workInProgress2)) {
                current = workInProgress2.stateNode;
                renderLanes2 = workInProgress2.memoizedProps;
                newProps = null;
                type = hydrationParentFiber;
                if (null !== type)
                  switch (type.tag) {
                    case 27:
                    case 5:
                      newProps = type.memoizedProps;
                  }
                current[internalInstanceKey] = workInProgress2;
                current = current.nodeValue === renderLanes2 || null !== newProps && true === newProps.suppressHydrationWarning || checkForUnmatchedText(current.nodeValue, renderLanes2) ? true : false;
                current || throwOnHydrationMismatch(workInProgress2, true);
              } else
                current = getOwnerDocumentFromRootContainer(current).createTextNode(
                  newProps
                ), current[internalInstanceKey] = workInProgress2, workInProgress2.stateNode = current;
            }
            bubbleProperties(workInProgress2);
            return null;
          case 31:
            renderLanes2 = workInProgress2.memoizedState;
            if (null === current || null !== current.memoizedState) {
              newProps = popHydrationState(workInProgress2);
              if (null !== renderLanes2) {
                if (null === current) {
                  if (!newProps) throw Error(formatProdErrorMessage(318));
                  current = workInProgress2.memoizedState;
                  current = null !== current ? current.dehydrated : null;
                  if (!current) throw Error(formatProdErrorMessage(557));
                  current[internalInstanceKey] = workInProgress2;
                } else
                  resetHydrationState(), 0 === (workInProgress2.flags & 128) && (workInProgress2.memoizedState = null), workInProgress2.flags |= 4;
                bubbleProperties(workInProgress2);
                current = false;
              } else
                renderLanes2 = upgradeHydrationErrorsToRecoverable(), null !== current && null !== current.memoizedState && (current.memoizedState.hydrationErrors = renderLanes2), current = true;
              if (!current) {
                if (workInProgress2.flags & 256)
                  return popSuspenseHandler(workInProgress2), workInProgress2;
                popSuspenseHandler(workInProgress2);
                return null;
              }
              if (0 !== (workInProgress2.flags & 128))
                throw Error(formatProdErrorMessage(558));
            }
            bubbleProperties(workInProgress2);
            return null;
          case 13:
            newProps = workInProgress2.memoizedState;
            if (null === current || null !== current.memoizedState && null !== current.memoizedState.dehydrated) {
              type = popHydrationState(workInProgress2);
              if (null !== newProps && null !== newProps.dehydrated) {
                if (null === current) {
                  if (!type) throw Error(formatProdErrorMessage(318));
                  type = workInProgress2.memoizedState;
                  type = null !== type ? type.dehydrated : null;
                  if (!type) throw Error(formatProdErrorMessage(317));
                  type[internalInstanceKey] = workInProgress2;
                } else
                  resetHydrationState(), 0 === (workInProgress2.flags & 128) && (workInProgress2.memoizedState = null), workInProgress2.flags |= 4;
                bubbleProperties(workInProgress2);
                type = false;
              } else
                type = upgradeHydrationErrorsToRecoverable(), null !== current && null !== current.memoizedState && (current.memoizedState.hydrationErrors = type), type = true;
              if (!type) {
                if (workInProgress2.flags & 256)
                  return popSuspenseHandler(workInProgress2), workInProgress2;
                popSuspenseHandler(workInProgress2);
                return null;
              }
            }
            popSuspenseHandler(workInProgress2);
            if (0 !== (workInProgress2.flags & 128))
              return workInProgress2.lanes = renderLanes2, workInProgress2;
            renderLanes2 = null !== newProps;
            current = null !== current && null !== current.memoizedState;
            renderLanes2 && (newProps = workInProgress2.child, type = null, null !== newProps.alternate && null !== newProps.alternate.memoizedState && null !== newProps.alternate.memoizedState.cachePool && (type = newProps.alternate.memoizedState.cachePool.pool), nextResource = null, null !== newProps.memoizedState && null !== newProps.memoizedState.cachePool && (nextResource = newProps.memoizedState.cachePool.pool), nextResource !== type && (newProps.flags |= 2048));
            renderLanes2 !== current && renderLanes2 && (workInProgress2.child.flags |= 8192);
            scheduleRetryEffect(workInProgress2, workInProgress2.updateQueue);
            bubbleProperties(workInProgress2);
            return null;
          case 4:
            return popHostContainer(), null === current && listenToAllSupportedEvents(workInProgress2.stateNode.containerInfo), workInProgress2.flags |= 67108864, bubbleProperties(workInProgress2), null;
          case 10:
            return popProvider(workInProgress2.type), bubbleProperties(workInProgress2), null;
          case 19:
            popSuspenseListContext(workInProgress2);
            newProps = workInProgress2.memoizedState;
            if (null === newProps) return bubbleProperties(workInProgress2), null;
            type = 0 !== (workInProgress2.flags & 128);
            nextResource = newProps.rendering;
            if (null === nextResource)
              if (type) cutOffTailIfNeeded(newProps, false);
              else {
                if (0 !== workInProgressRootExitStatus || null !== current && 0 !== (current.flags & 128))
                  for (current = workInProgress2.child; null !== current; ) {
                    nextResource = findFirstSuspended(current);
                    if (null !== nextResource) {
                      workInProgress2.flags |= 128;
                      cutOffTailIfNeeded(newProps, false);
                      current = nextResource.updateQueue;
                      workInProgress2.updateQueue = current;
                      scheduleRetryEffect(workInProgress2, current);
                      workInProgress2.subtreeFlags = 0;
                      current = renderLanes2;
                      for (renderLanes2 = workInProgress2.child; null !== renderLanes2; )
                        resetWorkInProgress(renderLanes2, current), renderLanes2 = renderLanes2.sibling;
                      pushSuspenseListContext(
                        workInProgress2,
                        suspenseStackCursor.current & 1 | 2
                      );
                      isHydrating && pushTreeFork(workInProgress2, newProps.treeForkCount);
                      return workInProgress2.child;
                    }
                    current = current.sibling;
                  }
                null !== newProps.tail && now() > workInProgressRootRenderTargetTime && (workInProgress2.flags |= 128, type = true, cutOffTailIfNeeded(newProps, false), workInProgress2.lanes = 4194304);
              }
            else {
              if (!type)
                if (current = findFirstSuspended(nextResource), null !== current) {
                  if (workInProgress2.flags |= 128, type = true, current = current.updateQueue, workInProgress2.updateQueue = current, scheduleRetryEffect(workInProgress2, current), cutOffTailIfNeeded(newProps, true), null === newProps.tail && "collapsed" !== newProps.tailMode && "visible" !== newProps.tailMode && !nextResource.alternate && !isHydrating)
                    return bubbleProperties(workInProgress2), null;
                } else
                  2 * now() - newProps.renderingStartTime > workInProgressRootRenderTargetTime && 536870912 !== renderLanes2 && (workInProgress2.flags |= 128, type = true, cutOffTailIfNeeded(newProps, false), workInProgress2.lanes = 4194304);
              newProps.isBackwards ? (nextResource.sibling = workInProgress2.child, workInProgress2.child = nextResource) : (current = newProps.last, null !== current ? current.sibling = nextResource : workInProgress2.child = nextResource, newProps.last = nextResource);
            }
            if (null !== newProps.tail) {
              current = newProps.tail;
              a: {
                for (renderLanes2 = current; null !== renderLanes2; ) {
                  if (null !== renderLanes2.alternate) {
                    renderLanes2 = false;
                    break a;
                  }
                  renderLanes2 = renderLanes2.sibling;
                }
                renderLanes2 = true;
              }
              newProps.rendering = current;
              newProps.tail = current.sibling;
              newProps.renderingStartTime = now();
              current.sibling = null;
              nextResource = suspenseStackCursor.current;
              nextResource = type ? nextResource & 1 | 2 : nextResource & 1;
              "visible" === newProps.tailMode || "collapsed" === newProps.tailMode || !renderLanes2 || isHydrating ? pushSuspenseListContext(workInProgress2, nextResource) : (renderLanes2 = nextResource, push(suspenseHandlerStackCursor, workInProgress2), push(suspenseStackCursor, renderLanes2), null === shellBoundary && (shellBoundary = workInProgress2));
              isHydrating && pushTreeFork(workInProgress2, newProps.treeForkCount);
              return current;
            }
            bubbleProperties(workInProgress2);
            return null;
          case 22:
          case 23:
            return popSuspenseHandler(workInProgress2), popHiddenContext(), newProps = null !== workInProgress2.memoizedState, null !== current ? null !== current.memoizedState !== newProps && (workInProgress2.flags |= 8192) : newProps && (workInProgress2.flags |= 8192), newProps ? 0 !== (renderLanes2 & 536870912) && 0 === (workInProgress2.flags & 128) && (bubbleProperties(workInProgress2), workInProgress2.subtreeFlags & 6 && (workInProgress2.flags |= 8192)) : bubbleProperties(workInProgress2), renderLanes2 = workInProgress2.updateQueue, null !== renderLanes2 && scheduleRetryEffect(workInProgress2, renderLanes2.retryQueue), renderLanes2 = null, null !== current && null !== current.memoizedState && null !== current.memoizedState.cachePool && (renderLanes2 = current.memoizedState.cachePool.pool), newProps = null, null !== workInProgress2.memoizedState && null !== workInProgress2.memoizedState.cachePool && (newProps = workInProgress2.memoizedState.cachePool.pool), newProps !== renderLanes2 && (workInProgress2.flags |= 2048), null !== current && pop(resumedCache), null;
          case 24:
            return renderLanes2 = null, null !== current && (renderLanes2 = current.memoizedState.cache), workInProgress2.memoizedState.cache !== renderLanes2 && (workInProgress2.flags |= 2048), popProvider(CacheContext), bubbleProperties(workInProgress2), null;
          case 25:
            return null;
          case 30:
            return workInProgress2.flags |= 33554432, bubbleProperties(workInProgress2), null;
        }
        throw Error(formatProdErrorMessage(156, workInProgress2.tag));
      }
      function unwindWork(current, workInProgress2) {
        popTreeContext(workInProgress2);
        switch (workInProgress2.tag) {
          case 1:
            return current = workInProgress2.flags, current & 65536 ? (workInProgress2.flags = current & -65537 | 128, workInProgress2) : null;
          case 3:
            return popProvider(CacheContext), popHostContainer(), current = workInProgress2.flags, 0 !== (current & 65536) && 0 === (current & 128) ? (workInProgress2.flags = current & -65537 | 128, workInProgress2) : null;
          case 26:
          case 27:
          case 5:
            return popHostContext(workInProgress2), null;
          case 31:
            if (null !== workInProgress2.memoizedState) {
              popSuspenseHandler(workInProgress2);
              if (null === workInProgress2.alternate)
                throw Error(formatProdErrorMessage(340));
              resetHydrationState();
            }
            current = workInProgress2.flags;
            return current & 65536 ? (workInProgress2.flags = current & -65537 | 128, workInProgress2) : null;
          case 13:
            popSuspenseHandler(workInProgress2);
            current = workInProgress2.memoizedState;
            if (null !== current && null !== current.dehydrated) {
              if (null === workInProgress2.alternate)
                throw Error(formatProdErrorMessage(340));
              resetHydrationState();
            }
            current = workInProgress2.flags;
            return current & 65536 ? (workInProgress2.flags = current & -65537 | 128, workInProgress2) : null;
          case 19:
            return popSuspenseListContext(workInProgress2), current = workInProgress2.flags, current & 65536 ? (workInProgress2.flags = current & -65537 | 128, current = workInProgress2.memoizedState, null !== current && (current.rendering = null, current.tail = null), workInProgress2.flags |= 4, workInProgress2) : null;
          case 4:
            return popHostContainer(), null;
          case 10:
            return popProvider(workInProgress2.type), null;
          case 22:
          case 23:
            return popSuspenseHandler(workInProgress2), popHiddenContext(), null !== current && pop(resumedCache), current = workInProgress2.flags, current & 65536 ? (workInProgress2.flags = current & -65537 | 128, workInProgress2) : null;
          case 24:
            return popProvider(CacheContext), null;
          case 25:
            return null;
          default:
            return null;
        }
      }
      function unwindInterruptedWork(current, interruptedWork) {
        popTreeContext(interruptedWork);
        switch (interruptedWork.tag) {
          case 3:
            popProvider(CacheContext);
            popHostContainer();
            break;
          case 26:
          case 27:
          case 5:
            popHostContext(interruptedWork);
            break;
          case 4:
            popHostContainer();
            break;
          case 31:
            null !== interruptedWork.memoizedState && popSuspenseHandler(interruptedWork);
            break;
          case 13:
            popSuspenseHandler(interruptedWork);
            break;
          case 19:
            popSuspenseListContext(interruptedWork);
            break;
          case 10:
            popProvider(interruptedWork.type);
            break;
          case 22:
          case 23:
            popSuspenseHandler(interruptedWork);
            popHiddenContext();
            null !== current && pop(resumedCache);
            break;
          case 24:
            popProvider(CacheContext);
        }
      }
      function commitHookEffectListMount(flags, finishedWork) {
        try {
          var updateQueue = finishedWork.updateQueue, lastEffect = null !== updateQueue ? updateQueue.lastEffect : null;
          if (null !== lastEffect) {
            var firstEffect = lastEffect.next;
            updateQueue = firstEffect;
            do {
              if ((updateQueue.tag & flags) === flags) {
                lastEffect = void 0;
                var create = updateQueue.create, inst = updateQueue.inst;
                lastEffect = create();
                inst.destroy = lastEffect;
              }
              updateQueue = updateQueue.next;
            } while (updateQueue !== firstEffect);
          }
        } catch (error) {
          captureCommitPhaseError(finishedWork, finishedWork.return, error);
        }
      }
      function commitHookEffectListUnmount(flags, finishedWork, nearestMountedAncestor$jscomp$0) {
        try {
          var updateQueue = finishedWork.updateQueue, lastEffect = null !== updateQueue ? updateQueue.lastEffect : null;
          if (null !== lastEffect) {
            var firstEffect = lastEffect.next;
            updateQueue = firstEffect;
            do {
              if ((updateQueue.tag & flags) === flags) {
                var inst = updateQueue.inst, destroy = inst.destroy;
                if (void 0 !== destroy) {
                  inst.destroy = void 0;
                  lastEffect = finishedWork;
                  var nearestMountedAncestor = nearestMountedAncestor$jscomp$0, destroy_ = destroy;
                  try {
                    destroy_();
                  } catch (error) {
                    captureCommitPhaseError(
                      lastEffect,
                      nearestMountedAncestor,
                      error
                    );
                  }
                }
              }
              updateQueue = updateQueue.next;
            } while (updateQueue !== firstEffect);
          }
        } catch (error) {
          captureCommitPhaseError(finishedWork, finishedWork.return, error);
        }
      }
      function commitClassCallbacks(finishedWork) {
        var updateQueue = finishedWork.updateQueue;
        if (null !== updateQueue) {
          var instance = finishedWork.stateNode;
          try {
            commitCallbacks(updateQueue, instance);
          } catch (error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, error);
          }
        }
      }
      function safelyCallComponentWillUnmount(current, nearestMountedAncestor, instance) {
        instance.props = resolveClassComponentProps(
          current.type,
          current.memoizedProps
        );
        instance.state = current.memoizedState;
        try {
          instance.componentWillUnmount();
        } catch (error) {
          captureCommitPhaseError(current, nearestMountedAncestor, error);
        }
      }
      function safelyAttachRef(current, nearestMountedAncestor) {
        try {
          var ref = current.ref;
          if (null !== ref) {
            switch (current.tag) {
              case 26:
              case 27:
              case 5:
                var instanceToUse = current.stateNode;
                break;
              case 30:
                var instance = current.stateNode, name = getViewTransitionName(current.memoizedProps, instance);
                if (null === instance.ref || instance.ref.name !== name)
                  instance.ref = createViewTransitionInstance(name);
                instanceToUse = instance.ref;
                break;
              case 7:
                if (null === current.stateNode) {
                  var fragmentInstance = new FragmentInstance(current);
                  traverseVisibleInstancesAndTextInstances(
                    current.child,
                    false,
                    addFragmentHandleToFiber,
                    fragmentInstance,
                    void 0,
                    void 0
                  );
                  current.stateNode = fragmentInstance;
                }
                instanceToUse = current.stateNode;
                break;
              default:
                instanceToUse = current.stateNode;
            }
            "function" === typeof ref ? current.refCleanup = ref(instanceToUse) : ref.current = instanceToUse;
          }
        } catch (error) {
          captureCommitPhaseError(current, nearestMountedAncestor, error);
        }
      }
      function safelyDetachRef(current, nearestMountedAncestor) {
        var ref = current.ref, refCleanup = current.refCleanup;
        if (null !== ref)
          if ("function" === typeof refCleanup)
            try {
              refCleanup();
            } catch (error) {
              captureCommitPhaseError(current, nearestMountedAncestor, error);
            } finally {
              current.refCleanup = null, current = current.alternate, null != current && (current.refCleanup = null);
            }
          else if ("function" === typeof ref)
            try {
              ref(null);
            } catch (error$148) {
              captureCommitPhaseError(current, nearestMountedAncestor, error$148);
            }
          else ref.current = null;
      }
      function commitNewChildToFragmentInstances(fiber, parentFragmentInstances) {
        if ((5 === fiber.tag || 27 === fiber.tag || 6 === fiber.tag) && null === fiber.alternate && null !== parentFragmentInstances)
          for (var i = 0; i < parentFragmentInstances.length; i++)
            commitNewChildToFragmentInstance(
              fiber.stateNode,
              parentFragmentInstances[i]
            );
      }
      function commitFragmentInstanceInsertionEffects(fiber) {
        for (var parent = fiber.return; null !== parent; ) {
          isFragmentInstanceParent(parent) && commitNewChildToFragmentInstance(fiber.stateNode, parent.stateNode);
          if (isFragmentInstanceHostBoundary(parent)) break;
          parent = parent.return;
        }
      }
      function commitFragmentInstanceDeletionEffects(fiber) {
        for (var parent = fiber.return; null !== parent; ) {
          isFragmentInstanceParent(parent) && deleteChildFromFragmentInstance(fiber.stateNode, parent.stateNode);
          if (isFragmentInstanceHostBoundary(parent)) break;
          parent = parent.return;
        }
      }
      function isFragmentInstanceHostBoundary(fiber) {
        return 5 === fiber.tag || 3 === fiber.tag || 27 === fiber.tag;
      }
      function isFragmentInstanceParent(fiber) {
        return fiber && 7 === fiber.tag && null !== fiber.stateNode;
      }
      function commitHostMount(finishedWork) {
        var type = finishedWork.type, props = finishedWork.memoizedProps, instance = finishedWork.stateNode;
        try {
          a: switch (type) {
            case "button":
            case "input":
            case "select":
            case "textarea":
              props.autoFocus && instance.focus();
              break a;
            case "img":
              props.src ? instance.src = props.src : props.srcSet && (instance.srcset = props.srcSet);
          }
        } catch (error) {
          captureCommitPhaseError(finishedWork, finishedWork.return, error);
        }
      }
      function commitHostUpdate(finishedWork, newProps, oldProps) {
        try {
          var domElement = finishedWork.stateNode;
          updateProperties(domElement, finishedWork.type, oldProps, newProps);
          domElement[internalPropsKey] = newProps;
        } catch (error) {
          captureCommitPhaseError(finishedWork, finishedWork.return, error);
        }
      }
      function isHostParent(fiber) {
        return 5 === fiber.tag || 3 === fiber.tag || 26 === fiber.tag || 27 === fiber.tag && isSingletonScope(fiber.type) || 4 === fiber.tag;
      }
      function getHostSibling(fiber) {
        a: for (; ; ) {
          for (; null === fiber.sibling; ) {
            if (null === fiber.return || isHostParent(fiber.return)) return null;
            fiber = fiber.return;
          }
          fiber.sibling.return = fiber.return;
          for (fiber = fiber.sibling; 5 !== fiber.tag && 6 !== fiber.tag && 18 !== fiber.tag; ) {
            if (27 === fiber.tag && isSingletonScope(fiber.type)) continue a;
            if (fiber.flags & 2) continue a;
            if (null === fiber.child || 4 === fiber.tag) continue a;
            else fiber.child.return = fiber, fiber = fiber.child;
          }
          if (!(fiber.flags & 2)) return fiber.stateNode;
        }
      }
      function insertOrAppendPlacementNodeIntoContainer(node, before, parent, parentFragmentInstances) {
        var tag = node.tag;
        if (5 === tag || 6 === tag)
          tag = node.stateNode, before ? (9 === parent.nodeType ? parent.body : "HTML" === parent.nodeName ? parent.ownerDocument.body : parent).insertBefore(tag, before) : (before = 9 === parent.nodeType ? parent.body : "HTML" === parent.nodeName ? parent.ownerDocument.body : parent, before.appendChild(tag), parent = parent._reactRootContainer, null !== parent && void 0 !== parent || null !== before.onclick || (before.onclick = noop$1)), commitNewChildToFragmentInstances(node, parentFragmentInstances), viewTransitionMutationContext = true;
        else if (4 !== tag && (27 === tag && (commitNewChildToFragmentInstances(node, parentFragmentInstances), parentFragmentInstances = null, isSingletonScope(node.type) && (parent = node.stateNode, before = null)), node = node.child, null !== node))
          for (insertOrAppendPlacementNodeIntoContainer(
            node,
            before,
            parent,
            parentFragmentInstances
          ), node = node.sibling; null !== node; )
            insertOrAppendPlacementNodeIntoContainer(
              node,
              before,
              parent,
              parentFragmentInstances
            ), node = node.sibling;
      }
      function insertOrAppendPlacementNode(node, before, parent, parentFragmentInstances) {
        var tag = node.tag;
        if (5 === tag || 6 === tag)
          tag = node.stateNode, before ? parent.insertBefore(tag, before) : parent.appendChild(tag), commitNewChildToFragmentInstances(node, parentFragmentInstances), viewTransitionMutationContext = true;
        else if (4 !== tag && (27 === tag && (commitNewChildToFragmentInstances(node, parentFragmentInstances), parentFragmentInstances = null, isSingletonScope(node.type) && (parent = node.stateNode)), node = node.child, null !== node))
          for (insertOrAppendPlacementNode(
            node,
            before,
            parent,
            parentFragmentInstances
          ), node = node.sibling; null !== node; )
            insertOrAppendPlacementNode(
              node,
              before,
              parent,
              parentFragmentInstances
            ), node = node.sibling;
      }
      function commitHostSingletonAcquisition(finishedWork) {
        var singleton = finishedWork.stateNode, props = finishedWork.memoizedProps;
        try {
          for (var type = finishedWork.type, attributes = singleton.attributes; attributes.length; )
            singleton.removeAttributeNode(attributes[0]);
          setInitialProperties(singleton, type, props);
          singleton[internalInstanceKey] = finishedWork;
          singleton[internalPropsKey] = props;
        } catch (error) {
          captureCommitPhaseError(finishedWork, finishedWork.return, error);
        }
      }
      var shouldStartViewTransition = false;
      var appearingViewTransitions = null;
      function trackEnterViewTransitions(placement) {
        if (30 === placement.tag || 0 !== (placement.subtreeFlags & 33554432))
          shouldStartViewTransition = true;
      }
      var viewTransitionCancelableChildren = null;
      function pushViewTransitionCancelableScope() {
        var prevChildren = viewTransitionCancelableChildren;
        viewTransitionCancelableChildren = null;
        return prevChildren;
      }
      var viewTransitionHostInstanceIdx = 0;
      function applyViewTransitionToHostInstances(fiber, name, className, collectMeasurements, stopAtNestedViewTransitions) {
        viewTransitionHostInstanceIdx = 0;
        return applyViewTransitionToHostInstancesRecursive(
          fiber.child,
          name,
          className,
          collectMeasurements,
          stopAtNestedViewTransitions
        );
      }
      function applyViewTransitionToHostInstancesRecursive(child, name, className, collectMeasurements, stopAtNestedViewTransitions) {
        for (var inViewport = false; null !== child; ) {
          if (5 === child.tag) {
            var instance = child.stateNode;
            if (null !== collectMeasurements) {
              var measurement = measureInstance(instance);
              collectMeasurements.push(measurement);
              measurement.view && (inViewport = true);
            } else
              inViewport || measureInstance(instance).view && (inViewport = true);
            shouldStartViewTransition = true;
            applyViewTransitionName(
              instance,
              0 === viewTransitionHostInstanceIdx ? name : name + "_" + viewTransitionHostInstanceIdx,
              className
            );
            viewTransitionHostInstanceIdx++;
          } else if (22 !== child.tag || null === child.memoizedState)
            30 === child.tag && stopAtNestedViewTransitions || applyViewTransitionToHostInstancesRecursive(
              child.child,
              name,
              className,
              collectMeasurements,
              stopAtNestedViewTransitions
            ) && (inViewport = true);
          child = child.sibling;
        }
        return inViewport;
      }
      function restoreViewTransitionOnHostInstances(child, stopAtNestedViewTransitions) {
        for (; null !== child; ) {
          if (5 === child.tag)
            restoreViewTransitionName(child.stateNode, child.memoizedProps);
          else if (22 !== child.tag || null === child.memoizedState)
            30 === child.tag && stopAtNestedViewTransitions || restoreViewTransitionOnHostInstances(
              child.child,
              stopAtNestedViewTransitions
            );
          child = child.sibling;
        }
      }
      function commitAppearingPairViewTransitions(placement) {
        if (0 !== (placement.subtreeFlags & 18874368))
          for (placement = placement.child; null !== placement; ) {
            if (22 !== placement.tag || null === placement.memoizedState) {
              if (commitAppearingPairViewTransitions(placement), 30 === placement.tag && 0 !== (placement.flags & 18874368) && placement.stateNode.paired) {
                var props = placement.memoizedProps;
                if (null == props.name || "auto" === props.name)
                  throw Error(formatProdErrorMessage(544));
                var name = props.name;
                props = getViewTransitionClassName(props.default, props.share);
                "none" !== props && (applyViewTransitionToHostInstances(
                  placement,
                  name,
                  props,
                  null,
                  false
                ) || restoreViewTransitionOnHostInstances(placement.child, false));
              }
            }
            placement = placement.sibling;
          }
      }
      function commitEnterViewTransitions(placement, gesture) {
        if (30 === placement.tag) {
          var state = placement.stateNode, props = placement.memoizedProps, name = getViewTransitionName(props, state), className = getViewTransitionClassName(
            props.default,
            state.paired ? props.share : props.enter
          );
          "none" !== className ? applyViewTransitionToHostInstances(placement, name, className, null, false) ? (commitAppearingPairViewTransitions(placement), state.paired || gesture || scheduleViewTransitionEvent(placement, props.onEnter)) : restoreViewTransitionOnHostInstances(placement.child, false) : commitAppearingPairViewTransitions(placement);
        } else if (0 !== (placement.subtreeFlags & 33554432))
          for (placement = placement.child; null !== placement; )
            commitEnterViewTransitions(placement, gesture), placement = placement.sibling;
        else commitAppearingPairViewTransitions(placement);
      }
      function commitDeletedPairViewTransitions(deletion) {
        if (null !== appearingViewTransitions && 0 !== appearingViewTransitions.size) {
          var pairs = appearingViewTransitions;
          if (0 !== (deletion.subtreeFlags & 18874368))
            for (deletion = deletion.child; null !== deletion; ) {
              if (22 !== deletion.tag || null === deletion.memoizedState) {
                if (30 === deletion.tag && 0 !== (deletion.flags & 18874368)) {
                  var props = deletion.memoizedProps, name = props.name;
                  if (null != name && "auto" !== name) {
                    var pair = pairs.get(name);
                    if (void 0 !== pair) {
                      var className = getViewTransitionClassName(
                        props.default,
                        props.share
                      );
                      "none" !== className && (applyViewTransitionToHostInstances(
                        deletion,
                        name,
                        className,
                        null,
                        false
                      ) ? (className = deletion.stateNode, pair.paired = className, className.paired = pair, scheduleViewTransitionEvent(deletion, props.onShare)) : restoreViewTransitionOnHostInstances(deletion.child, false));
                      pairs.delete(name);
                      if (0 === pairs.size) break;
                    }
                  }
                }
                commitDeletedPairViewTransitions(deletion);
              }
              deletion = deletion.sibling;
            }
        }
      }
      function commitExitViewTransitions(deletion) {
        if (30 === deletion.tag) {
          var props = deletion.memoizedProps, name = getViewTransitionName(props, deletion.stateNode), pair = null !== appearingViewTransitions ? appearingViewTransitions.get(name) : void 0, className = getViewTransitionClassName(
            props.default,
            void 0 !== pair ? props.share : props.exit
          );
          "none" !== className && (applyViewTransitionToHostInstances(deletion, name, className, null, false) ? void 0 !== pair ? (className = deletion.stateNode, pair.paired = className, className.paired = pair, appearingViewTransitions.delete(name), scheduleViewTransitionEvent(deletion, props.onShare)) : scheduleViewTransitionEvent(deletion, props.onExit) : restoreViewTransitionOnHostInstances(deletion.child, false));
          null !== appearingViewTransitions && commitDeletedPairViewTransitions(deletion);
        } else if (0 !== (deletion.subtreeFlags & 33554432))
          for (deletion = deletion.child; null !== deletion; )
            commitExitViewTransitions(deletion), deletion = deletion.sibling;
        else
          null !== appearingViewTransitions && commitDeletedPairViewTransitions(deletion);
      }
      function commitNestedViewTransitions(changedParent) {
        for (changedParent = changedParent.child; null !== changedParent; ) {
          if (30 === changedParent.tag) {
            var props = changedParent.memoizedProps, name = getViewTransitionName(props, changedParent.stateNode);
            props = getViewTransitionClassName(props.default, props.update);
            changedParent.flags &= -5;
            "none" !== props && applyViewTransitionToHostInstances(
              changedParent,
              name,
              props,
              changedParent.memoizedState = [],
              false
            );
          } else
            0 !== (changedParent.subtreeFlags & 33554432) && commitNestedViewTransitions(changedParent);
          changedParent = changedParent.sibling;
        }
      }
      function restorePairedViewTransitions(parent) {
        if (0 !== (parent.subtreeFlags & 18874368))
          for (parent = parent.child; null !== parent; ) {
            if (22 !== parent.tag || null === parent.memoizedState) {
              if (30 === parent.tag && 0 !== (parent.flags & 18874368)) {
                var instance = parent.stateNode;
                null !== instance.paired && (instance.paired = null, restoreViewTransitionOnHostInstances(parent.child, false));
              }
              restorePairedViewTransitions(parent);
            }
            parent = parent.sibling;
          }
      }
      function restoreEnterOrExitViewTransitions(fiber) {
        if (30 === fiber.tag)
          fiber.stateNode.paired = null, restoreViewTransitionOnHostInstances(fiber.child, false), restorePairedViewTransitions(fiber);
        else if (0 !== (fiber.subtreeFlags & 33554432))
          for (fiber = fiber.child; null !== fiber; )
            restoreEnterOrExitViewTransitions(fiber), fiber = fiber.sibling;
        else restorePairedViewTransitions(fiber);
      }
      function restoreNestedViewTransitions(changedParent) {
        for (changedParent = changedParent.child; null !== changedParent; )
          30 === changedParent.tag ? restoreViewTransitionOnHostInstances(changedParent.child, false) : 0 !== (changedParent.subtreeFlags & 33554432) && restoreNestedViewTransitions(changedParent), changedParent = changedParent.sibling;
      }
      function measureViewTransitionHostInstancesRecursive(parentViewTransition, child, newName, oldName, className, previousMeasurements, stopAtNestedViewTransitions) {
        for (var inViewport = false; null !== child; ) {
          if (5 === child.tag) {
            var instance = child.stateNode;
            if (null !== previousMeasurements && viewTransitionHostInstanceIdx < previousMeasurements.length) {
              var previousMeasurement = previousMeasurements[viewTransitionHostInstanceIdx], nextMeasurement = measureInstance(instance);
              if (previousMeasurement.view || nextMeasurement.view) inViewport = true;
              var JSCompiler_temp;
              if (JSCompiler_temp = 0 === (parentViewTransition.flags & 4))
                if (nextMeasurement.clip) JSCompiler_temp = true;
                else {
                  JSCompiler_temp = previousMeasurement.rect;
                  var newRect = nextMeasurement.rect;
                  JSCompiler_temp = JSCompiler_temp.y !== newRect.y || JSCompiler_temp.x !== newRect.x || JSCompiler_temp.height !== newRect.height || JSCompiler_temp.width !== newRect.width;
                }
              JSCompiler_temp && (parentViewTransition.flags |= 4);
              nextMeasurement.abs ? nextMeasurement = !previousMeasurement.abs : (previousMeasurement = previousMeasurement.rect, nextMeasurement = nextMeasurement.rect, nextMeasurement = previousMeasurement.height !== nextMeasurement.height || previousMeasurement.width !== nextMeasurement.width);
              nextMeasurement && (parentViewTransition.flags |= 32);
            } else parentViewTransition.flags |= 32;
            0 !== (parentViewTransition.flags & 4) && applyViewTransitionName(
              instance,
              0 === viewTransitionHostInstanceIdx ? newName : newName + "_" + viewTransitionHostInstanceIdx,
              className
            );
            inViewport && 0 !== (parentViewTransition.flags & 4) || (null === viewTransitionCancelableChildren && (viewTransitionCancelableChildren = []), viewTransitionCancelableChildren.push(
              instance,
              0 === viewTransitionHostInstanceIdx ? oldName : oldName + "_" + viewTransitionHostInstanceIdx,
              child.memoizedProps
            ));
            viewTransitionHostInstanceIdx++;
          } else if (22 !== child.tag || null === child.memoizedState)
            30 === child.tag && stopAtNestedViewTransitions ? parentViewTransition.flags |= child.flags & 32 : measureViewTransitionHostInstancesRecursive(
              parentViewTransition,
              child.child,
              newName,
              oldName,
              className,
              previousMeasurements,
              stopAtNestedViewTransitions
            ) && (inViewport = true);
          child = child.sibling;
        }
        return inViewport;
      }
      function measureNestedViewTransitions(changedParent, gesture) {
        for (changedParent = changedParent.child; null !== changedParent; ) {
          if (30 === changedParent.tag) {
            var props = changedParent.memoizedProps, state = changedParent.stateNode, name = getViewTransitionName(props, state), className = getViewTransitionClassName(props.default, props.update);
            if (gesture) {
              state = state.clones;
              var previousMeasurements = null === state ? null : state.map(measureClonedInstance);
            } else
              previousMeasurements = changedParent.memoizedState, changedParent.memoizedState = null;
            state = changedParent;
            var child = changedParent.child;
            viewTransitionHostInstanceIdx = 0;
            name = measureViewTransitionHostInstancesRecursive(
              state,
              child,
              name,
              name,
              className,
              previousMeasurements,
              false
            );
            0 !== (changedParent.flags & 4) && name && (gesture || scheduleViewTransitionEvent(changedParent, props.onUpdate));
          } else
            0 !== (changedParent.subtreeFlags & 33554432) && measureNestedViewTransitions(changedParent, gesture);
          changedParent = changedParent.sibling;
        }
      }
      var offscreenSubtreeIsHidden = false;
      var offscreenSubtreeWasHidden = false;
      var offscreenDirectParentIsHidden = false;
      var needsFormReset = false;
      var PossiblyWeakSet = "function" === typeof WeakSet ? WeakSet : Set;
      var nextEffect = null;
      var viewTransitionContextChanged = false;
      var inUpdateViewTransition = false;
      var rootViewTransitionAffected = false;
      var rootViewTransitionNameCanceled = false;
      function commitBeforeMutationEffects(root2, firstChild, committedLanes) {
        root2 = root2.containerInfo;
        eventsEnabled = _enabled;
        root2 = getActiveElementDeep(root2);
        if (hasSelectionCapabilities(root2)) {
          if ("selectionStart" in root2)
            var JSCompiler_temp = {
              start: root2.selectionStart,
              end: root2.selectionEnd
            };
          else
            a: {
              JSCompiler_temp = (JSCompiler_temp = root2.ownerDocument) && JSCompiler_temp.defaultView || window;
              var selection = JSCompiler_temp.getSelection && JSCompiler_temp.getSelection();
              if (selection && 0 !== selection.rangeCount) {
                JSCompiler_temp = selection.anchorNode;
                var anchorOffset = selection.anchorOffset, focusNode = selection.focusNode;
                selection = selection.focusOffset;
                try {
                  JSCompiler_temp.nodeType, focusNode.nodeType;
                } catch (e$21) {
                  JSCompiler_temp = null;
                  break a;
                }
                var length = 0, start = -1, end = -1, indexWithinAnchor = 0, indexWithinFocus = 0, node = root2, parentNode = null;
                b: for (; ; ) {
                  for (var next; ; ) {
                    node !== JSCompiler_temp || 0 !== anchorOffset && 3 !== node.nodeType || (start = length + anchorOffset);
                    node !== focusNode || 0 !== selection && 3 !== node.nodeType || (end = length + selection);
                    3 === node.nodeType && (length += node.nodeValue.length);
                    if (null === (next = node.firstChild)) break;
                    parentNode = node;
                    node = next;
                  }
                  for (; ; ) {
                    if (node === root2) break b;
                    parentNode === JSCompiler_temp && ++indexWithinAnchor === anchorOffset && (start = length);
                    parentNode === focusNode && ++indexWithinFocus === selection && (end = length);
                    if (null !== (next = node.nextSibling)) break;
                    node = parentNode;
                    parentNode = node.parentNode;
                  }
                  node = next;
                }
                JSCompiler_temp = -1 === start || -1 === end ? null : { start, end };
              } else JSCompiler_temp = null;
            }
          JSCompiler_temp = JSCompiler_temp || { start: 0, end: 0 };
        } else JSCompiler_temp = null;
        selectionInformation = { focusedElem: root2, selectionRange: JSCompiler_temp };
        _enabled = false;
        committedLanes = (committedLanes & 335544064) === committedLanes;
        nextEffect = firstChild;
        for (firstChild = committedLanes ? 9270 : 1024; null !== nextEffect; ) {
          root2 = nextEffect;
          if (committedLanes && (JSCompiler_temp = root2.deletions, null !== JSCompiler_temp))
            for (anchorOffset = 0; anchorOffset < JSCompiler_temp.length; anchorOffset++)
              committedLanes && commitExitViewTransitions(JSCompiler_temp[anchorOffset]);
          if (null === root2.alternate && 0 !== (root2.flags & 2))
            committedLanes && trackEnterViewTransitions(root2), commitBeforeMutationEffects_complete(committedLanes);
          else {
            if (22 === root2.tag) {
              if (JSCompiler_temp = root2.alternate, null !== root2.memoizedState) {
                null !== JSCompiler_temp && null === JSCompiler_temp.memoizedState && committedLanes && commitExitViewTransitions(JSCompiler_temp);
                commitBeforeMutationEffects_complete(committedLanes);
                continue;
              } else if (null !== JSCompiler_temp && null !== JSCompiler_temp.memoizedState) {
                committedLanes && trackEnterViewTransitions(root2);
                commitBeforeMutationEffects_complete(committedLanes);
                continue;
              }
            }
            JSCompiler_temp = root2.child;
            0 !== (root2.subtreeFlags & firstChild) && null !== JSCompiler_temp ? (JSCompiler_temp.return = root2, nextEffect = JSCompiler_temp) : (committedLanes && commitNestedViewTransitions(root2), commitBeforeMutationEffects_complete(committedLanes));
          }
        }
        appearingViewTransitions = null;
      }
      function commitBeforeMutationEffects_complete(isViewTransitionEligible$jscomp$0) {
        for (; null !== nextEffect; ) {
          var fiber = nextEffect, isViewTransitionEligible = isViewTransitionEligible$jscomp$0, current = fiber.alternate, flags = fiber.flags;
          switch (fiber.tag) {
            case 0:
            case 11:
            case 15:
              break;
            case 1:
              if (0 !== (flags & 1024) && null !== current) {
                isViewTransitionEligible = void 0;
                flags = current.memoizedProps;
                current = current.memoizedState;
                var instance = fiber.stateNode;
                try {
                  var resolvedPrevProps = resolveClassComponentProps(
                    fiber.type,
                    flags
                  );
                  isViewTransitionEligible = instance.getSnapshotBeforeUpdate(
                    resolvedPrevProps,
                    current
                  );
                  instance.__reactInternalSnapshotBeforeUpdate = isViewTransitionEligible;
                } catch (error) {
                  captureCommitPhaseError(fiber, fiber.return, error);
                }
              }
              break;
            case 3:
              if (0 !== (flags & 1024)) {
                if (current = fiber.stateNode.containerInfo, isViewTransitionEligible = current.nodeType, 9 === isViewTransitionEligible)
                  clearContainerSparingly(current);
                else if (1 === isViewTransitionEligible)
                  switch (current.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      clearContainerSparingly(current);
                      break;
                    default:
                      current.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            case 30:
              isViewTransitionEligible && null !== current && (isViewTransitionEligible = getViewTransitionName(
                current.memoizedProps,
                current.stateNode
              ), flags = fiber.memoizedProps, flags = getViewTransitionClassName(flags.default, flags.update), "none" !== flags && applyViewTransitionToHostInstances(
                current,
                isViewTransitionEligible,
                flags,
                current.memoizedState = [],
                true
              ));
              break;
            default:
              if (0 !== (flags & 1024)) throw Error(formatProdErrorMessage(163));
          }
          current = fiber.sibling;
          if (null !== current) {
            current.return = fiber.return;
            nextEffect = current;
            break;
          }
          nextEffect = fiber.return;
        }
      }
      function commitLayoutEffectOnFiber(finishedRoot, current, finishedWork) {
        var flags = finishedWork.flags;
        switch (finishedWork.tag) {
          case 0:
          case 11:
          case 15:
            recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
            flags & 4 && commitHookEffectListMount(5, finishedWork);
            break;
          case 1:
            recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
            if (flags & 4)
              if (finishedRoot = finishedWork.stateNode, null === current)
                try {
                  finishedRoot.componentDidMount();
                } catch (error) {
                  captureCommitPhaseError(finishedWork, finishedWork.return, error);
                }
              else {
                var prevProps = resolveClassComponentProps(
                  finishedWork.type,
                  current.memoizedProps
                );
                current = current.memoizedState;
                try {
                  finishedRoot.componentDidUpdate(
                    prevProps,
                    current,
                    finishedRoot.__reactInternalSnapshotBeforeUpdate
                  );
                } catch (error$146) {
                  captureCommitPhaseError(
                    finishedWork,
                    finishedWork.return,
                    error$146
                  );
                }
              }
            flags & 64 && commitClassCallbacks(finishedWork);
            flags & 512 && safelyAttachRef(finishedWork, finishedWork.return);
            break;
          case 3:
            recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
            if (flags & 64 && (finishedRoot = finishedWork.updateQueue, null !== finishedRoot)) {
              current = null;
              if (null !== finishedWork.child)
                switch (finishedWork.child.tag) {
                  case 27:
                  case 5:
                    current = finishedWork.child.stateNode;
                    break;
                  case 1:
                    current = finishedWork.child.stateNode;
                }
              try {
                commitCallbacks(finishedRoot, current);
              } catch (error) {
                captureCommitPhaseError(finishedWork, finishedWork.return, error);
              }
            }
            break;
          case 27:
            null === current && flags & 4 && commitHostSingletonAcquisition(finishedWork);
          case 26:
          case 5:
            recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
            null === current && flags & 4 && commitHostMount(finishedWork);
            flags & 512 && safelyAttachRef(finishedWork, finishedWork.return);
            break;
          case 12:
            recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
            break;
          case 31:
            recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
            flags & 4 && commitActivityHydrationCallbacks(finishedRoot, finishedWork);
            break;
          case 13:
            recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
            flags & 4 && commitSuspenseHydrationCallbacks(finishedRoot, finishedWork);
            flags & 64 && (finishedRoot = finishedWork.memoizedState, null !== finishedRoot && (finishedRoot = finishedRoot.dehydrated, null !== finishedRoot && (finishedWork = retryDehydratedSuspenseBoundary.bind(
              null,
              finishedWork
            ), registerSuspenseInstanceRetry(finishedRoot, finishedWork))));
            break;
          case 22:
            flags = null !== finishedWork.memoizedState || offscreenSubtreeIsHidden;
            if (!flags) {
              var newOffscreenSubtreeWasHidden = null !== current && null !== current.memoizedState || offscreenSubtreeWasHidden;
              current = offscreenSubtreeIsHidden;
              prevProps = offscreenSubtreeWasHidden;
              offscreenSubtreeIsHidden = flags;
              (offscreenSubtreeWasHidden = newOffscreenSubtreeWasHidden) && !prevProps ? (flags = 2, 0 !== (finishedWork.subtreeFlags & 8772) && (flags |= 1), recursivelyTraverseReappearLayoutEffects(
                finishedRoot,
                finishedWork,
                flags
              )) : recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
              offscreenSubtreeIsHidden = current;
              offscreenSubtreeWasHidden = prevProps;
            }
            break;
          case 30:
            recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
            flags & 512 && safelyAttachRef(finishedWork, finishedWork.return);
            break;
          case 7:
            flags & 512 && safelyAttachRef(finishedWork, finishedWork.return);
          default:
            recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
        }
      }
      function hideOrUnhideAllChildren(parentFiber, isHidden) {
        for (parentFiber = parentFiber.child; null !== parentFiber; )
          hideOrUnhideAllChildrenOnFiber(parentFiber, isHidden), parentFiber = parentFiber.sibling;
      }
      function hideOrUnhideAllChildrenOnFiber(fiber, isHidden) {
        switch (fiber.tag) {
          case 5:
          case 26:
            try {
              var instance = fiber.stateNode;
              if (isHidden) {
                var style2 = instance.style;
                "function" === typeof style2.setProperty ? style2.setProperty("display", "none", "important") : style2.display = "none";
              } else {
                var instance$jscomp$0 = fiber.stateNode, styleProp = fiber.memoizedProps.style, display = void 0 !== styleProp && null !== styleProp && styleProp.hasOwnProperty("display") ? styleProp.display : null;
                instance$jscomp$0.style.display = null == display || "boolean" === typeof display ? "" : ("" + display).trim();
              }
            } catch (error) {
              captureCommitPhaseError(fiber, fiber.return, error);
            }
            hideOrUnhideNearestPortals(fiber, isHidden);
            break;
          case 6:
            try {
              fiber.stateNode.nodeValue = isHidden ? "" : fiber.memoizedProps, viewTransitionMutationContext = true;
            } catch (error) {
              captureCommitPhaseError(fiber, fiber.return, error);
            }
            break;
          case 18:
            try {
              var instance$jscomp$1 = fiber.stateNode;
              isHidden ? hideOrUnhideDehydratedBoundary(instance$jscomp$1, true) : hideOrUnhideDehydratedBoundary(fiber.stateNode, false);
            } catch (error) {
              captureCommitPhaseError(fiber, fiber.return, error);
            }
            break;
          case 22:
          case 23:
            null === fiber.memoizedState && hideOrUnhideAllChildren(fiber, isHidden);
            break;
          default:
            hideOrUnhideAllChildren(fiber, isHidden);
        }
      }
      function hideOrUnhideNearestPortals(parentFiber, isHidden$jscomp$0) {
        if (parentFiber.subtreeFlags & 67108864)
          for (parentFiber = parentFiber.child; null !== parentFiber; ) {
            a: {
              var fiber = parentFiber, isHidden = isHidden$jscomp$0;
              switch (fiber.tag) {
                case 4:
                  hideOrUnhideAllChildrenOnFiber(fiber, isHidden);
                  break a;
                case 22:
                  null === fiber.memoizedState && hideOrUnhideNearestPortals(fiber, isHidden);
                  break a;
                default:
                  hideOrUnhideNearestPortals(fiber, isHidden);
              }
            }
            parentFiber = parentFiber.sibling;
          }
      }
      function detachFiberAfterEffects(fiber) {
        var alternate = fiber.alternate;
        null !== alternate && (fiber.alternate = null, detachFiberAfterEffects(alternate));
        fiber.child = null;
        fiber.deletions = null;
        fiber.sibling = null;
        5 === fiber.tag && (alternate = fiber.stateNode, null !== alternate && detachDeletedInstance(alternate));
        fiber.stateNode = null;
        fiber.return = null;
        fiber.dependencies = null;
        fiber.memoizedProps = null;
        fiber.memoizedState = null;
        fiber.pendingProps = null;
        fiber.stateNode = null;
        fiber.updateQueue = null;
      }
      var hostParent = null;
      var hostParentIsContainer = false;
      function recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, parent) {
        for (parent = parent.child; null !== parent; )
          commitDeletionEffectsOnFiber(finishedRoot, nearestMountedAncestor, parent), parent = parent.sibling;
      }
      function commitDeletionEffectsOnFiber(finishedRoot, nearestMountedAncestor, deletedFiber) {
        if (injectedHook && "function" === typeof injectedHook.onCommitFiberUnmount)
          try {
            injectedHook.onCommitFiberUnmount(rendererID, deletedFiber);
          } catch (err) {
          }
        switch (deletedFiber.tag) {
          case 26:
            offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor);
            recursivelyTraverseDeletionEffects(
              finishedRoot,
              nearestMountedAncestor,
              deletedFiber
            );
            deletedFiber.memoizedState ? deletedFiber.memoizedState.count-- : deletedFiber.stateNode && !offscreenSubtreeWasHidden && (deletedFiber = deletedFiber.stateNode, deletedFiber.parentNode.removeChild(deletedFiber));
            break;
          case 27:
            offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor);
            commitFragmentInstanceDeletionEffects(deletedFiber);
            var prevHostParent = hostParent, prevHostParentIsContainer = hostParentIsContainer;
            isSingletonScope(deletedFiber.type) && (hostParent = deletedFiber.stateNode, hostParentIsContainer = false);
            recursivelyTraverseDeletionEffects(
              finishedRoot,
              nearestMountedAncestor,
              deletedFiber
            );
            releaseSingletonInstance(
              deletedFiber.stateNode,
              deletedFiber.type,
              deletedFiber.memoizedProps
            );
            hostParent = prevHostParent;
            hostParentIsContainer = prevHostParentIsContainer;
            break;
          case 5:
            offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor), commitFragmentInstanceDeletionEffects(deletedFiber);
          case 6:
            6 === deletedFiber.tag && commitFragmentInstanceDeletionEffects(deletedFiber);
            prevHostParent = hostParent;
            prevHostParentIsContainer = hostParentIsContainer;
            hostParent = null;
            recursivelyTraverseDeletionEffects(
              finishedRoot,
              nearestMountedAncestor,
              deletedFiber
            );
            hostParent = prevHostParent;
            hostParentIsContainer = prevHostParentIsContainer;
            if (null !== hostParent)
              if (hostParentIsContainer)
                try {
                  (9 === hostParent.nodeType ? hostParent.body : "HTML" === hostParent.nodeName ? hostParent.ownerDocument.body : hostParent).removeChild(deletedFiber.stateNode), viewTransitionMutationContext = true;
                } catch (error) {
                  captureCommitPhaseError(
                    deletedFiber,
                    nearestMountedAncestor,
                    error
                  );
                }
              else
                try {
                  hostParent.removeChild(deletedFiber.stateNode), viewTransitionMutationContext = true;
                } catch (error) {
                  captureCommitPhaseError(
                    deletedFiber,
                    nearestMountedAncestor,
                    error
                  );
                }
            break;
          case 18:
            null !== hostParent && (hostParentIsContainer ? (finishedRoot = hostParent, clearHydrationBoundary(
              9 === finishedRoot.nodeType ? finishedRoot.body : "HTML" === finishedRoot.nodeName ? finishedRoot.ownerDocument.body : finishedRoot,
              deletedFiber.stateNode
            ), retryIfBlockedOn(finishedRoot)) : clearHydrationBoundary(hostParent, deletedFiber.stateNode));
            break;
          case 4:
            prevHostParent = hostParent;
            prevHostParentIsContainer = hostParentIsContainer;
            hostParent = deletedFiber.stateNode.containerInfo;
            hostParentIsContainer = true;
            recursivelyTraverseDeletionEffects(
              finishedRoot,
              nearestMountedAncestor,
              deletedFiber
            );
            hostParent = prevHostParent;
            hostParentIsContainer = prevHostParentIsContainer;
            break;
          case 0:
          case 11:
          case 14:
          case 15:
            commitHookEffectListUnmount(2, deletedFiber, nearestMountedAncestor);
            offscreenSubtreeWasHidden || commitHookEffectListUnmount(4, deletedFiber, nearestMountedAncestor);
            recursivelyTraverseDeletionEffects(
              finishedRoot,
              nearestMountedAncestor,
              deletedFiber
            );
            break;
          case 1:
            offscreenSubtreeWasHidden || (safelyDetachRef(deletedFiber, nearestMountedAncestor), prevHostParent = deletedFiber.stateNode, "function" === typeof prevHostParent.componentWillUnmount && safelyCallComponentWillUnmount(
              deletedFiber,
              nearestMountedAncestor,
              prevHostParent
            ));
            recursivelyTraverseDeletionEffects(
              finishedRoot,
              nearestMountedAncestor,
              deletedFiber
            );
            break;
          case 21:
            recursivelyTraverseDeletionEffects(
              finishedRoot,
              nearestMountedAncestor,
              deletedFiber
            );
            break;
          case 22:
            offscreenSubtreeWasHidden = (prevHostParent = offscreenSubtreeWasHidden) || null !== deletedFiber.memoizedState;
            recursivelyTraverseDeletionEffects(
              finishedRoot,
              nearestMountedAncestor,
              deletedFiber
            );
            offscreenSubtreeWasHidden = prevHostParent;
            break;
          case 30:
            safelyDetachRef(deletedFiber, nearestMountedAncestor);
            recursivelyTraverseDeletionEffects(
              finishedRoot,
              nearestMountedAncestor,
              deletedFiber
            );
            break;
          case 7:
            offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor);
            recursivelyTraverseDeletionEffects(
              finishedRoot,
              nearestMountedAncestor,
              deletedFiber
            );
            break;
          default:
            recursivelyTraverseDeletionEffects(
              finishedRoot,
              nearestMountedAncestor,
              deletedFiber
            );
        }
      }
      function commitActivityHydrationCallbacks(finishedRoot, finishedWork) {
        if (null === finishedWork.memoizedState && (finishedRoot = finishedWork.alternate, null !== finishedRoot && (finishedRoot = finishedRoot.memoizedState, null !== finishedRoot))) {
          finishedRoot = finishedRoot.dehydrated;
          try {
            retryIfBlockedOn(finishedRoot);
          } catch (error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, error);
          }
        }
      }
      function commitSuspenseHydrationCallbacks(finishedRoot, finishedWork) {
        if (null === finishedWork.memoizedState && (finishedRoot = finishedWork.alternate, null !== finishedRoot && (finishedRoot = finishedRoot.memoizedState, null !== finishedRoot && (finishedRoot = finishedRoot.dehydrated, null !== finishedRoot))))
          try {
            retryIfBlockedOn(finishedRoot);
          } catch (error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, error);
          }
      }
      function getRetryCache(finishedWork) {
        switch (finishedWork.tag) {
          case 31:
          case 13:
          case 19:
            var retryCache = finishedWork.stateNode;
            null === retryCache && (retryCache = finishedWork.stateNode = new PossiblyWeakSet());
            return retryCache;
          case 22:
            return finishedWork = finishedWork.stateNode, retryCache = finishedWork._retryCache, null === retryCache && (retryCache = finishedWork._retryCache = new PossiblyWeakSet()), retryCache;
          default:
            throw Error(formatProdErrorMessage(435, finishedWork.tag));
        }
      }
      function attachSuspenseRetryListeners(finishedWork, wakeables) {
        var retryCache = getRetryCache(finishedWork);
        wakeables.forEach(function(wakeable) {
          if (!retryCache.has(wakeable)) {
            retryCache.add(wakeable);
            var retry = resolveRetryWakeable.bind(null, finishedWork, wakeable);
            wakeable.then(retry, retry);
          }
        });
      }
      function recursivelyTraverseMutationEffects(root$jscomp$0, parentFiber, lanes) {
        var deletions = parentFiber.deletions;
        if (null !== deletions)
          for (var i = 0; i < deletions.length; i++) {
            var childToDelete = deletions[i], root2 = root$jscomp$0, returnFiber = parentFiber, parent = returnFiber;
            a: for (; null !== parent; ) {
              switch (parent.tag) {
                case 27:
                  if (isSingletonScope(parent.type)) {
                    hostParent = parent.stateNode;
                    hostParentIsContainer = false;
                    break a;
                  }
                  break;
                case 5:
                  hostParent = parent.stateNode;
                  hostParentIsContainer = false;
                  break a;
                case 3:
                case 4:
                  hostParent = parent.stateNode.containerInfo;
                  hostParentIsContainer = true;
                  break a;
              }
              parent = parent.return;
            }
            if (null === hostParent) throw Error(formatProdErrorMessage(160));
            commitDeletionEffectsOnFiber(root2, returnFiber, childToDelete);
            hostParent = null;
            hostParentIsContainer = false;
            root2 = childToDelete.alternate;
            null !== root2 && (root2.return = null);
            childToDelete.return = null;
          }
        if (parentFiber.subtreeFlags & 13886)
          for (parentFiber = parentFiber.child; null !== parentFiber; )
            commitMutationEffectsOnFiber(parentFiber, root$jscomp$0, lanes), parentFiber = parentFiber.sibling;
      }
      var currentHoistableRoot = null;
      function commitMutationEffectsOnFiber(finishedWork, root2, lanes) {
        var current = finishedWork.alternate, flags = finishedWork.flags;
        switch (finishedWork.tag) {
          case 0:
          case 11:
          case 14:
          case 15:
            if (flags & 4 && (current = finishedWork.updateQueue, current = null !== current ? current.events : null, null !== current))
              for (var ii = 0; ii < current.length; ii++) {
                var _eventPayloads$ii2 = current[ii];
                _eventPayloads$ii2.ref.impl = _eventPayloads$ii2.nextImpl;
              }
            recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
            commitReconciliationEffects(finishedWork);
            flags & 4 && (commitHookEffectListUnmount(3, finishedWork, finishedWork.return), commitHookEffectListMount(3, finishedWork), commitHookEffectListUnmount(5, finishedWork, finishedWork.return));
            break;
          case 1:
            recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
            commitReconciliationEffects(finishedWork);
            flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return));
            flags & 64 && offscreenSubtreeIsHidden && (finishedWork = finishedWork.updateQueue, null !== finishedWork && (root2 = finishedWork.callbacks, null !== root2 && (lanes = finishedWork.shared.hiddenCallbacks, finishedWork.shared.hiddenCallbacks = null === lanes ? root2 : lanes.concat(root2))));
            break;
          case 26:
            ii = currentHoistableRoot;
            recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
            commitReconciliationEffects(finishedWork);
            flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return));
            if (flags & 4)
              if (flags = null !== current ? current.memoizedState : null, lanes = finishedWork.memoizedState, null === current)
                if (null === lanes)
                  if (null === finishedWork.stateNode)
                    if (offscreenSubtreeIsHidden)
                      finishedWork.stateNode = createHoistableInstance(
                        finishedWork.type,
                        finishedWork.memoizedProps,
                        root2.containerInfo,
                        finishedWork
                      );
                    else {
                      a: {
                        root2 = finishedWork.type;
                        lanes = finishedWork.memoizedProps;
                        flags = ii.ownerDocument || ii;
                        b: switch (root2) {
                          case "title":
                            current = flags.getElementsByTagName("title")[0];
                            if (!current || current[internalHoistableMarker] || current[internalInstanceKey] || "http://www.w3.org/2000/svg" === current.namespaceURI || current.hasAttribute("itemprop"))
                              current = flags.createElement(root2), flags.head.insertBefore(
                                current,
                                flags.querySelector("head > title")
                              );
                            setInitialProperties(current, root2, lanes);
                            current[internalInstanceKey] = finishedWork;
                            markNodeAsHoistable(current);
                            root2 = current;
                            break a;
                          case "link":
                            if (ii = getHydratableHoistableCache(
                              "link",
                              "href",
                              flags
                            ).get(root2 + (lanes.href || ""))) {
                              for (_eventPayloads$ii2 = 0; _eventPayloads$ii2 < ii.length; _eventPayloads$ii2++)
                                if (current = ii[_eventPayloads$ii2], current.getAttribute("href") === (null == lanes.href || "" === lanes.href ? null : lanes.href) && current.getAttribute("rel") === (null == lanes.rel ? null : lanes.rel) && current.getAttribute("title") === (null == lanes.title ? null : lanes.title) && current.getAttribute("crossorigin") === (null == lanes.crossOrigin ? null : lanes.crossOrigin)) {
                                  ii.splice(_eventPayloads$ii2, 1);
                                  break b;
                                }
                            }
                            current = flags.createElement(root2);
                            setInitialProperties(current, root2, lanes);
                            flags.head.appendChild(current);
                            break;
                          case "meta":
                            if (ii = getHydratableHoistableCache(
                              "meta",
                              "content",
                              flags
                            ).get(root2 + (lanes.content || ""))) {
                              for (_eventPayloads$ii2 = 0; _eventPayloads$ii2 < ii.length; _eventPayloads$ii2++)
                                if (current = ii[_eventPayloads$ii2], current.getAttribute("content") === (null == lanes.content ? null : "" + lanes.content) && current.getAttribute("name") === (null == lanes.name ? null : lanes.name) && current.getAttribute("property") === (null == lanes.property ? null : lanes.property) && current.getAttribute("http-equiv") === (null == lanes.httpEquiv ? null : lanes.httpEquiv) && current.getAttribute("charset") === (null == lanes.charSet ? null : lanes.charSet)) {
                                  ii.splice(_eventPayloads$ii2, 1);
                                  break b;
                                }
                            }
                            current = flags.createElement(root2);
                            setInitialProperties(current, root2, lanes);
                            flags.head.appendChild(current);
                            break;
                          default:
                            throw Error(formatProdErrorMessage(468, root2));
                        }
                        current[internalInstanceKey] = finishedWork;
                        markNodeAsHoistable(current);
                        root2 = current;
                      }
                      finishedWork.stateNode = root2;
                    }
                  else
                    offscreenSubtreeIsHidden || mountHoistable(ii, finishedWork.type, finishedWork.stateNode);
                else
                  finishedWork.stateNode = acquireResource(
                    ii,
                    lanes,
                    finishedWork.memoizedProps
                  );
              else
                flags !== lanes ? (null === flags ? (root2 = current.stateNode, null === root2 || offscreenSubtreeWasHidden || root2.parentNode.removeChild(root2)) : flags.count--, null === lanes ? offscreenSubtreeIsHidden || mountHoistable(ii, finishedWork.type, finishedWork.stateNode) : acquireResource(ii, lanes, finishedWork.memoizedProps)) : null === lanes && null !== finishedWork.stateNode && commitHostUpdate(
                  finishedWork,
                  finishedWork.memoizedProps,
                  current.memoizedProps
                );
            break;
          case 27:
            recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
            commitReconciliationEffects(finishedWork);
            flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return));
            null !== current && flags & 4 && commitHostUpdate(
              finishedWork,
              finishedWork.memoizedProps,
              current.memoizedProps
            );
            break;
          case 5:
            ii = offscreenDirectParentIsHidden;
            offscreenDirectParentIsHidden = false;
            recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
            offscreenDirectParentIsHidden = ii;
            commitReconciliationEffects(finishedWork);
            flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return));
            if (finishedWork.flags & 32) {
              root2 = finishedWork.stateNode;
              try {
                setTextContent(root2, ""), viewTransitionMutationContext = true;
              } catch (error) {
                captureCommitPhaseError(finishedWork, finishedWork.return, error);
              }
            }
            flags & 4 && null != finishedWork.stateNode && (root2 = finishedWork.memoizedProps, commitHostUpdate(
              finishedWork,
              root2,
              null !== current ? current.memoizedProps : root2
            ));
            flags & 1024 && (needsFormReset = true);
            break;
          case 6:
            recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
            commitReconciliationEffects(finishedWork);
            if (flags & 4) {
              if (null === finishedWork.stateNode)
                throw Error(formatProdErrorMessage(162));
              root2 = finishedWork.memoizedProps;
              lanes = finishedWork.stateNode;
              try {
                lanes.nodeValue = root2, viewTransitionMutationContext = true;
              } catch (error) {
                captureCommitPhaseError(finishedWork, finishedWork.return, error);
              }
            }
            break;
          case 3:
            viewTransitionMutationContext = false;
            tagCaches = null;
            ii = currentHoistableRoot;
            currentHoistableRoot = getHoistableRoot(root2.containerInfo);
            recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
            currentHoistableRoot = ii;
            commitReconciliationEffects(finishedWork);
            if (flags & 4 && null !== current && current.memoizedState.isDehydrated)
              try {
                retryIfBlockedOn(root2.containerInfo);
              } catch (error) {
                captureCommitPhaseError(finishedWork, finishedWork.return, error);
              }
            needsFormReset && (needsFormReset = false, recursivelyResetForms(finishedWork));
            viewTransitionMutationContext = false;
            break;
          case 4:
            flags = offscreenDirectParentIsHidden;
            offscreenDirectParentIsHidden = offscreenSubtreeIsHidden;
            current = pushMutationContext();
            ii = currentHoistableRoot;
            currentHoistableRoot = getHoistableRoot(
              finishedWork.stateNode.containerInfo
            );
            recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
            commitReconciliationEffects(finishedWork);
            currentHoistableRoot = ii;
            viewTransitionMutationContext && inUpdateViewTransition && (rootViewTransitionAffected = true);
            viewTransitionMutationContext = current;
            offscreenDirectParentIsHidden = flags;
            break;
          case 12:
            recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
            commitReconciliationEffects(finishedWork);
            break;
          case 31:
            recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
            commitReconciliationEffects(finishedWork);
            flags & 4 && (root2 = finishedWork.updateQueue, null !== root2 && (finishedWork.updateQueue = null, attachSuspenseRetryListeners(finishedWork, root2)));
            break;
          case 13:
            recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
            commitReconciliationEffects(finishedWork);
            finishedWork.child.flags & 8192 && null !== finishedWork.memoizedState !== (null !== current && null !== current.memoizedState) && (globalMostRecentFallbackTime = now());
            flags & 4 && (root2 = finishedWork.updateQueue, null !== root2 && (finishedWork.updateQueue = null, attachSuspenseRetryListeners(finishedWork, root2)));
            break;
          case 22:
            ii = null !== finishedWork.memoizedState;
            _eventPayloads$ii2 = null !== current && null !== current.memoizedState;
            var prevOffscreenSubtreeIsHidden = offscreenSubtreeIsHidden, prevOffscreenSubtreeWasHidden = offscreenSubtreeWasHidden, prevOffscreenDirectParentIsHidden$166 = offscreenDirectParentIsHidden;
            offscreenSubtreeIsHidden = prevOffscreenSubtreeIsHidden || ii;
            offscreenDirectParentIsHidden = prevOffscreenDirectParentIsHidden$166 || ii;
            offscreenSubtreeWasHidden = prevOffscreenSubtreeWasHidden || _eventPayloads$ii2;
            recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
            offscreenSubtreeWasHidden = prevOffscreenSubtreeWasHidden;
            offscreenDirectParentIsHidden = prevOffscreenDirectParentIsHidden$166;
            offscreenSubtreeIsHidden = prevOffscreenSubtreeIsHidden;
            commitReconciliationEffects(finishedWork);
            flags & 8192 && (root2 = finishedWork.stateNode, root2._visibility = ii ? root2._visibility & -2 : root2._visibility | 1, !ii || null === current || _eventPayloads$ii2 || offscreenSubtreeIsHidden || offscreenSubtreeWasHidden || (root2 = _eventPayloads$ii2 || offscreenSubtreeWasHidden, lanes = offscreenSubtreeIsHidden, current = offscreenSubtreeWasHidden, offscreenSubtreeIsHidden = ii || offscreenSubtreeIsHidden, offscreenSubtreeWasHidden = root2, recursivelyTraverseDisappearLayoutEffects(finishedWork, 2), offscreenSubtreeIsHidden = lanes, offscreenSubtreeWasHidden = current), !ii && offscreenDirectParentIsHidden || hideOrUnhideAllChildren(finishedWork, ii));
            flags & 4 && (root2 = finishedWork.updateQueue, null !== root2 && (lanes = root2.retryQueue, null !== lanes && (root2.retryQueue = null, attachSuspenseRetryListeners(finishedWork, lanes))));
            break;
          case 19:
            recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
            commitReconciliationEffects(finishedWork);
            flags & 4 && (root2 = finishedWork.updateQueue, null !== root2 && (finishedWork.updateQueue = null, attachSuspenseRetryListeners(finishedWork, root2)));
            break;
          case 30:
            flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return));
            flags = pushMutationContext();
            ii = inUpdateViewTransition;
            _eventPayloads$ii2 = (lanes & 335544064) === lanes;
            prevOffscreenSubtreeIsHidden = finishedWork.memoizedProps;
            inUpdateViewTransition = _eventPayloads$ii2 && "none" !== getViewTransitionClassName(
              prevOffscreenSubtreeIsHidden.default,
              prevOffscreenSubtreeIsHidden.update
            );
            recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
            commitReconciliationEffects(finishedWork);
            _eventPayloads$ii2 && null !== current && viewTransitionMutationContext && (finishedWork.flags |= 4);
            inUpdateViewTransition = ii;
            viewTransitionMutationContext = flags;
            break;
          case 21:
            break;
          case 7:
            flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return)), current && null !== current.stateNode && (current.stateNode._fragmentFiber = finishedWork);
          default:
            recursivelyTraverseMutationEffects(root2, finishedWork, lanes), commitReconciliationEffects(finishedWork);
        }
      }
      function commitReconciliationEffects(finishedWork) {
        var flags = finishedWork.flags;
        if (flags & 2) {
          try {
            for (var hostParentFiber, parentFiber = finishedWork.return; null !== parentFiber; ) {
              if (isHostParent(parentFiber)) {
                hostParentFiber = parentFiber;
                break;
              }
              parentFiber = parentFiber.return;
            }
            parentFiber = null;
            for (var parent = finishedWork.return; null !== parent; ) {
              if (isFragmentInstanceParent(parent)) {
                var fragmentInstance = parent.stateNode;
                null === parentFiber ? parentFiber = [fragmentInstance] : parentFiber.push(fragmentInstance);
              }
              if (isFragmentInstanceHostBoundary(parent)) break;
              parent = parent.return;
            }
            var JSCompiler_inline_result = parentFiber;
            if (null == hostParentFiber) throw Error(formatProdErrorMessage(160));
            switch (hostParentFiber.tag) {
              case 27:
                var parent$jscomp$0 = hostParentFiber.stateNode, before = getHostSibling(finishedWork);
                insertOrAppendPlacementNode(
                  finishedWork,
                  before,
                  parent$jscomp$0,
                  JSCompiler_inline_result
                );
                break;
              case 5:
                var parent$149 = hostParentFiber.stateNode;
                hostParentFiber.flags & 32 && (setTextContent(parent$149, ""), hostParentFiber.flags &= -33);
                var before$150 = getHostSibling(finishedWork);
                insertOrAppendPlacementNode(
                  finishedWork,
                  before$150,
                  parent$149,
                  JSCompiler_inline_result
                );
                break;
              case 3:
              case 4:
                var parent$151 = hostParentFiber.stateNode.containerInfo, before$152 = getHostSibling(finishedWork);
                insertOrAppendPlacementNodeIntoContainer(
                  finishedWork,
                  before$152,
                  parent$151,
                  JSCompiler_inline_result
                );
                break;
              default:
                throw Error(formatProdErrorMessage(161));
            }
          } catch (error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, error);
          }
          finishedWork.flags &= -3;
        }
        flags & 4096 && (finishedWork.flags &= -4097);
      }
      function recursivelyResetForms(parentFiber) {
        if (parentFiber.subtreeFlags & 1024)
          for (parentFiber = parentFiber.child; null !== parentFiber; ) {
            var fiber = parentFiber;
            recursivelyResetForms(fiber);
            5 === fiber.tag && fiber.flags & 1024 && (fiber = fiber.stateNode, _enabled = true, fiber.reset(), _enabled = false);
            parentFiber = parentFiber.sibling;
          }
      }
      function recursivelyTraverseAfterMutationEffects(root2, parentFiber) {
        if (parentFiber.subtreeFlags & 9270)
          for (parentFiber = parentFiber.child; null !== parentFiber; )
            commitAfterMutationEffectsOnFiber(parentFiber, root2), parentFiber = parentFiber.sibling;
        else measureNestedViewTransitions(parentFiber, false);
      }
      function commitAfterMutationEffectsOnFiber(finishedWork, root2) {
        var current = finishedWork.alternate;
        if (null === current) commitEnterViewTransitions(finishedWork, false);
        else
          switch (finishedWork.tag) {
            case 3:
              rootViewTransitionNameCanceled = viewTransitionContextChanged = false;
              pushViewTransitionCancelableScope();
              recursivelyTraverseAfterMutationEffects(root2, finishedWork);
              if (!viewTransitionContextChanged && !rootViewTransitionAffected) {
                finishedWork = viewTransitionCancelableChildren;
                if (null !== finishedWork)
                  for (var i = 0; i < finishedWork.length; i += 3) {
                    current = finishedWork[i];
                    var oldName = finishedWork[i + 1];
                    restoreViewTransitionName(current, finishedWork[i + 2]);
                    current = current.ownerDocument.documentElement;
                    null !== current && current.animate(
                      { opacity: [0, 0], pointerEvents: ["none", "none"] },
                      {
                        duration: 0,
                        fill: "forwards",
                        pseudoElement: "::view-transition-group(" + oldName + ")"
                      }
                    );
                  }
                finishedWork = root2.containerInfo;
                finishedWork = 9 === finishedWork.nodeType ? finishedWork.documentElement : finishedWork.ownerDocument.documentElement;
                null !== finishedWork && "" === finishedWork.style.viewTransitionName && (finishedWork.style.viewTransitionName = "none", finishedWork.animate(
                  { opacity: [0, 0], pointerEvents: ["none", "none"] },
                  {
                    duration: 0,
                    fill: "forwards",
                    pseudoElement: "::view-transition-group(root)"
                  }
                ), finishedWork.animate(
                  { width: [0, 0], height: [0, 0] },
                  {
                    duration: 0,
                    fill: "forwards",
                    pseudoElement: "::view-transition"
                  }
                ));
                rootViewTransitionNameCanceled = true;
              }
              viewTransitionCancelableChildren = null;
              break;
            case 5:
              recursivelyTraverseAfterMutationEffects(root2, finishedWork);
              break;
            case 4:
              i = viewTransitionContextChanged;
              viewTransitionContextChanged = false;
              recursivelyTraverseAfterMutationEffects(root2, finishedWork);
              viewTransitionContextChanged && (rootViewTransitionAffected = true);
              viewTransitionContextChanged = i;
              break;
            case 22:
              null === finishedWork.memoizedState && (null !== current.memoizedState ? commitEnterViewTransitions(finishedWork, false) : recursivelyTraverseAfterMutationEffects(root2, finishedWork));
              break;
            case 30:
              i = viewTransitionContextChanged;
              oldName = pushViewTransitionCancelableScope();
              viewTransitionContextChanged = false;
              recursivelyTraverseAfterMutationEffects(root2, finishedWork);
              viewTransitionContextChanged && (finishedWork.flags |= 4);
              var props = finishedWork.memoizedProps, state = finishedWork.stateNode;
              root2 = getViewTransitionName(props, state);
              state = getViewTransitionName(current.memoizedProps, state);
              var className = getViewTransitionClassName(props.default, props.update);
              "none" === className ? root2 = false : (props = current.memoizedState, current.memoizedState = null, current = finishedWork.child, viewTransitionHostInstanceIdx = 0, root2 = measureViewTransitionHostInstancesRecursive(
                finishedWork,
                current,
                root2,
                state,
                className,
                props,
                true
              ), viewTransitionHostInstanceIdx !== (null === props ? 0 : props.length) && (finishedWork.flags |= 32));
              0 !== (finishedWork.flags & 4) && root2 ? (scheduleViewTransitionEvent(
                finishedWork,
                finishedWork.memoizedProps.onUpdate
              ), viewTransitionCancelableChildren = oldName) : null !== oldName && (oldName.push.apply(oldName, viewTransitionCancelableChildren), viewTransitionCancelableChildren = oldName);
              viewTransitionContextChanged = 0 !== (finishedWork.flags & 32) ? true : i;
              break;
            default:
              recursivelyTraverseAfterMutationEffects(root2, finishedWork);
          }
      }
      function recursivelyTraverseLayoutEffects(root2, parentFiber) {
        if (parentFiber.subtreeFlags & 8772)
          for (parentFiber = parentFiber.child; null !== parentFiber; )
            commitLayoutEffectOnFiber(root2, parentFiber.alternate, parentFiber), parentFiber = parentFiber.sibling;
      }
      function recursivelyTraverseDisappearLayoutEffects(parentFiber, layoutEffectTraversalFlags$jscomp$0) {
        for (parentFiber = parentFiber.child; null !== parentFiber; ) {
          var finishedWork = parentFiber, layoutEffectTraversalFlags = layoutEffectTraversalFlags$jscomp$0;
          switch (finishedWork.tag) {
            case 0:
            case 11:
            case 14:
            case 15:
              commitHookEffectListUnmount(4, finishedWork, finishedWork.return);
              recursivelyTraverseDisappearLayoutEffects(
                finishedWork,
                layoutEffectTraversalFlags
              );
              break;
            case 1:
              safelyDetachRef(finishedWork, finishedWork.return);
              var instance = finishedWork.stateNode;
              "function" === typeof instance.componentWillUnmount && safelyCallComponentWillUnmount(
                finishedWork,
                finishedWork.return,
                instance
              );
              recursivelyTraverseDisappearLayoutEffects(
                finishedWork,
                layoutEffectTraversalFlags
              );
              break;
            case 27:
              0 !== (layoutEffectTraversalFlags & 2) && releaseSingletonInstance(
                finishedWork.stateNode,
                finishedWork.type,
                finishedWork.memoizedProps
              );
            case 5:
              safelyDetachRef(finishedWork, finishedWork.return);
              5 !== finishedWork.tag && 27 !== finishedWork.tag || commitFragmentInstanceDeletionEffects(finishedWork);
              recursivelyTraverseDisappearLayoutEffects(
                finishedWork,
                layoutEffectTraversalFlags
              );
              break;
            case 6:
              commitFragmentInstanceDeletionEffects(finishedWork);
              break;
            case 26:
              safelyDetachRef(finishedWork, finishedWork.return);
              instance = finishedWork.stateNode;
              null !== finishedWork.memoizedState || null === instance || offscreenSubtreeWasHidden || instance.parentNode.removeChild(instance);
              recursivelyTraverseDisappearLayoutEffects(
                finishedWork,
                layoutEffectTraversalFlags
              );
              break;
            case 22:
              null === finishedWork.memoizedState && recursivelyTraverseDisappearLayoutEffects(
                finishedWork,
                layoutEffectTraversalFlags
              );
              break;
            case 30:
              safelyDetachRef(finishedWork, finishedWork.return);
              recursivelyTraverseDisappearLayoutEffects(
                finishedWork,
                layoutEffectTraversalFlags
              );
              break;
            case 7:
              safelyDetachRef(finishedWork, finishedWork.return);
            default:
              recursivelyTraverseDisappearLayoutEffects(
                finishedWork,
                layoutEffectTraversalFlags
              );
          }
          parentFiber = parentFiber.sibling;
        }
      }
      function recursivelyTraverseReappearLayoutEffects(finishedRoot$jscomp$0, parentFiber, layoutEffectTraversalFlags) {
        layoutEffectTraversalFlags = 0 !== (parentFiber.subtreeFlags & 8772) ? layoutEffectTraversalFlags : layoutEffectTraversalFlags & -2;
        for (parentFiber = parentFiber.child; null !== parentFiber; ) {
          var current = parentFiber.alternate, finishedRoot = finishedRoot$jscomp$0, finishedWork = parentFiber, flags = finishedWork.flags, includeWorkInProgressEffects = 0 !== (layoutEffectTraversalFlags & 1);
          switch (finishedWork.tag) {
            case 0:
            case 11:
            case 15:
              recursivelyTraverseReappearLayoutEffects(
                finishedRoot,
                finishedWork,
                layoutEffectTraversalFlags
              );
              commitHookEffectListMount(4, finishedWork);
              break;
            case 1:
              recursivelyTraverseReappearLayoutEffects(
                finishedRoot,
                finishedWork,
                layoutEffectTraversalFlags
              );
              current = finishedWork;
              finishedRoot = current.stateNode;
              if ("function" === typeof finishedRoot.componentDidMount)
                try {
                  finishedRoot.componentDidMount();
                } catch (error) {
                  captureCommitPhaseError(current, current.return, error);
                }
              current = finishedWork;
              finishedRoot = current.updateQueue;
              if (null !== finishedRoot) {
                var instance = current.stateNode;
                try {
                  var hiddenCallbacks = finishedRoot.shared.hiddenCallbacks;
                  if (null !== hiddenCallbacks)
                    for (finishedRoot.shared.hiddenCallbacks = null, finishedRoot = 0; finishedRoot < hiddenCallbacks.length; finishedRoot++)
                      callCallback(hiddenCallbacks[finishedRoot], instance);
                } catch (error) {
                  captureCommitPhaseError(current, current.return, error);
                }
              }
              includeWorkInProgressEffects && flags & 64 && commitClassCallbacks(finishedWork);
              safelyAttachRef(finishedWork, finishedWork.return);
              break;
            case 27:
              0 !== (layoutEffectTraversalFlags & 2) && commitHostSingletonAcquisition(finishedWork);
            case 5:
              5 !== finishedWork.tag && 27 !== finishedWork.tag || commitFragmentInstanceInsertionEffects(finishedWork);
              recursivelyTraverseReappearLayoutEffects(
                finishedRoot,
                finishedWork,
                layoutEffectTraversalFlags
              );
              includeWorkInProgressEffects && null === current && flags & 4 && commitHostMount(finishedWork);
              safelyAttachRef(finishedWork, finishedWork.return);
              break;
            case 6:
              commitFragmentInstanceInsertionEffects(finishedWork);
              break;
            case 26:
              instance = finishedWork.stateNode;
              null !== finishedWork.memoizedState || null === instance || offscreenSubtreeIsHidden || mountHoistable(
                getHoistableRoot(instance.ownerDocument),
                finishedWork.type,
                instance
              );
              recursivelyTraverseReappearLayoutEffects(
                finishedRoot,
                finishedWork,
                layoutEffectTraversalFlags
              );
              includeWorkInProgressEffects && null === current && flags & 4 && commitHostMount(finishedWork);
              safelyAttachRef(finishedWork, finishedWork.return);
              break;
            case 12:
              recursivelyTraverseReappearLayoutEffects(
                finishedRoot,
                finishedWork,
                layoutEffectTraversalFlags
              );
              break;
            case 31:
              recursivelyTraverseReappearLayoutEffects(
                finishedRoot,
                finishedWork,
                layoutEffectTraversalFlags
              );
              includeWorkInProgressEffects && flags & 4 && commitActivityHydrationCallbacks(finishedRoot, finishedWork);
              break;
            case 13:
              recursivelyTraverseReappearLayoutEffects(
                finishedRoot,
                finishedWork,
                layoutEffectTraversalFlags
              );
              includeWorkInProgressEffects && flags & 4 && commitSuspenseHydrationCallbacks(finishedRoot, finishedWork);
              break;
            case 22:
              null === finishedWork.memoizedState && recursivelyTraverseReappearLayoutEffects(
                finishedRoot,
                finishedWork,
                layoutEffectTraversalFlags
              );
              safelyAttachRef(finishedWork, finishedWork.return);
              break;
            case 30:
              recursivelyTraverseReappearLayoutEffects(
                finishedRoot,
                finishedWork,
                layoutEffectTraversalFlags
              );
              safelyAttachRef(finishedWork, finishedWork.return);
              break;
            case 7:
              safelyAttachRef(finishedWork, finishedWork.return);
            default:
              recursivelyTraverseReappearLayoutEffects(
                finishedRoot,
                finishedWork,
                layoutEffectTraversalFlags
              );
          }
          parentFiber = parentFiber.sibling;
        }
      }
      function commitOffscreenPassiveMountEffects(current, finishedWork) {
        var previousCache = null;
        null !== current && null !== current.memoizedState && null !== current.memoizedState.cachePool && (previousCache = current.memoizedState.cachePool.pool);
        current = null;
        null !== finishedWork.memoizedState && null !== finishedWork.memoizedState.cachePool && (current = finishedWork.memoizedState.cachePool.pool);
        current !== previousCache && (null != current && current.refCount++, null != previousCache && releaseCache(previousCache));
      }
      function commitCachePassiveMountEffect(current, finishedWork) {
        current = null;
        null !== finishedWork.alternate && (current = finishedWork.alternate.memoizedState.cache);
        finishedWork = finishedWork.memoizedState.cache;
        finishedWork !== current && (finishedWork.refCount++, null != current && releaseCache(current));
      }
      function recursivelyTraversePassiveMountEffects(root2, parentFiber, committedLanes, committedTransitions) {
        var isViewTransitionEligible = (committedLanes & 335544064) === committedLanes;
        if (parentFiber.subtreeFlags & (isViewTransitionEligible ? 10262 : 10256))
          for (parentFiber = parentFiber.child; null !== parentFiber; )
            commitPassiveMountOnFiber(
              root2,
              parentFiber,
              committedLanes,
              committedTransitions
            ), parentFiber = parentFiber.sibling;
        else isViewTransitionEligible && restoreNestedViewTransitions(parentFiber);
      }
      function commitPassiveMountOnFiber(finishedRoot, finishedWork, committedLanes, committedTransitions) {
        var isViewTransitionEligible = (committedLanes & 335544064) === committedLanes;
        isViewTransitionEligible && null === finishedWork.alternate && null !== finishedWork.return && null !== finishedWork.return.alternate && restoreEnterOrExitViewTransitions(finishedWork);
        var flags = finishedWork.flags;
        switch (finishedWork.tag) {
          case 0:
          case 11:
          case 15:
            recursivelyTraversePassiveMountEffects(
              finishedRoot,
              finishedWork,
              committedLanes,
              committedTransitions
            );
            flags & 2048 && commitHookEffectListMount(9, finishedWork);
            break;
          case 1:
            recursivelyTraversePassiveMountEffects(
              finishedRoot,
              finishedWork,
              committedLanes,
              committedTransitions
            );
            break;
          case 3:
            recursivelyTraversePassiveMountEffects(
              finishedRoot,
              finishedWork,
              committedLanes,
              committedTransitions
            );
            isViewTransitionEligible && rootViewTransitionNameCanceled && (finishedRoot = finishedRoot.containerInfo, finishedRoot = 9 === finishedRoot.nodeType ? finishedRoot.body : "HTML" === finishedRoot.nodeName ? finishedRoot.ownerDocument.body : finishedRoot, "root" === finishedRoot.style.viewTransitionName && (finishedRoot.style.viewTransitionName = ""), finishedRoot = finishedRoot.ownerDocument.documentElement, null !== finishedRoot && "none" === finishedRoot.style.viewTransitionName && (finishedRoot.style.viewTransitionName = ""));
            flags & 2048 && (flags = null, null !== finishedWork.alternate && (flags = finishedWork.alternate.memoizedState.cache), finishedWork = finishedWork.memoizedState.cache, finishedWork !== flags && (finishedWork.refCount++, null != flags && releaseCache(flags)));
            break;
          case 12:
            if (flags & 2048) {
              recursivelyTraversePassiveMountEffects(
                finishedRoot,
                finishedWork,
                committedLanes,
                committedTransitions
              );
              flags = finishedWork.stateNode;
              try {
                var _finishedWork$memoize2 = finishedWork.memoizedProps, id = _finishedWork$memoize2.id, onPostCommit = _finishedWork$memoize2.onPostCommit;
                "function" === typeof onPostCommit && onPostCommit(
                  id,
                  null === finishedWork.alternate ? "mount" : "update",
                  flags.passiveEffectDuration,
                  -0
                );
              } catch (error) {
                captureCommitPhaseError(finishedWork, finishedWork.return, error);
              }
            } else
              recursivelyTraversePassiveMountEffects(
                finishedRoot,
                finishedWork,
                committedLanes,
                committedTransitions
              );
            break;
          case 31:
            recursivelyTraversePassiveMountEffects(
              finishedRoot,
              finishedWork,
              committedLanes,
              committedTransitions
            );
            break;
          case 13:
            recursivelyTraversePassiveMountEffects(
              finishedRoot,
              finishedWork,
              committedLanes,
              committedTransitions
            );
            break;
          case 23:
            break;
          case 22:
            _finishedWork$memoize2 = finishedWork.stateNode;
            id = finishedWork.alternate;
            null !== finishedWork.memoizedState ? (isViewTransitionEligible && null !== id && null === id.memoizedState && restoreEnterOrExitViewTransitions(id), _finishedWork$memoize2._visibility & 2 ? recursivelyTraversePassiveMountEffects(
              finishedRoot,
              finishedWork,
              committedLanes,
              committedTransitions
            ) : recursivelyTraverseAtomicPassiveEffects(
              finishedRoot,
              finishedWork
            )) : (isViewTransitionEligible && null !== id && null !== id.memoizedState && restoreEnterOrExitViewTransitions(finishedWork), _finishedWork$memoize2._visibility & 2 ? recursivelyTraversePassiveMountEffects(
              finishedRoot,
              finishedWork,
              committedLanes,
              committedTransitions
            ) : (_finishedWork$memoize2._visibility |= 2, recursivelyTraverseReconnectPassiveEffects(
              finishedRoot,
              finishedWork,
              committedLanes,
              committedTransitions,
              0 !== (finishedWork.subtreeFlags & 10256) || false
            )));
            flags & 2048 && commitOffscreenPassiveMountEffects(id, finishedWork);
            break;
          case 24:
            recursivelyTraversePassiveMountEffects(
              finishedRoot,
              finishedWork,
              committedLanes,
              committedTransitions
            );
            flags & 2048 && commitCachePassiveMountEffect(finishedWork.alternate, finishedWork);
            break;
          case 30:
            isViewTransitionEligible && (flags = finishedWork.alternate, null !== flags && (restoreViewTransitionOnHostInstances(flags.child, true), restoreViewTransitionOnHostInstances(finishedWork.child, true)));
            recursivelyTraversePassiveMountEffects(
              finishedRoot,
              finishedWork,
              committedLanes,
              committedTransitions
            );
            break;
          default:
            recursivelyTraversePassiveMountEffects(
              finishedRoot,
              finishedWork,
              committedLanes,
              committedTransitions
            );
        }
      }
      function recursivelyTraverseReconnectPassiveEffects(finishedRoot$jscomp$0, parentFiber, committedLanes$jscomp$0, committedTransitions$jscomp$0, includeWorkInProgressEffects) {
        includeWorkInProgressEffects = includeWorkInProgressEffects && (0 !== (parentFiber.subtreeFlags & 10256) || false);
        for (parentFiber = parentFiber.child; null !== parentFiber; ) {
          var finishedRoot = finishedRoot$jscomp$0, finishedWork = parentFiber, committedLanes = committedLanes$jscomp$0, committedTransitions = committedTransitions$jscomp$0, flags = finishedWork.flags;
          switch (finishedWork.tag) {
            case 0:
            case 11:
            case 15:
              recursivelyTraverseReconnectPassiveEffects(
                finishedRoot,
                finishedWork,
                committedLanes,
                committedTransitions,
                includeWorkInProgressEffects
              );
              commitHookEffectListMount(8, finishedWork);
              break;
            case 23:
              break;
            case 22:
              var instance = finishedWork.stateNode;
              null !== finishedWork.memoizedState ? instance._visibility & 2 ? recursivelyTraverseReconnectPassiveEffects(
                finishedRoot,
                finishedWork,
                committedLanes,
                committedTransitions,
                includeWorkInProgressEffects
              ) : recursivelyTraverseAtomicPassiveEffects(
                finishedRoot,
                finishedWork
              ) : (instance._visibility |= 2, recursivelyTraverseReconnectPassiveEffects(
                finishedRoot,
                finishedWork,
                committedLanes,
                committedTransitions,
                includeWorkInProgressEffects
              ));
              includeWorkInProgressEffects && flags & 2048 && commitOffscreenPassiveMountEffects(
                finishedWork.alternate,
                finishedWork
              );
              break;
            case 24:
              recursivelyTraverseReconnectPassiveEffects(
                finishedRoot,
                finishedWork,
                committedLanes,
                committedTransitions,
                includeWorkInProgressEffects
              );
              includeWorkInProgressEffects && flags & 2048 && commitCachePassiveMountEffect(finishedWork.alternate, finishedWork);
              break;
            default:
              recursivelyTraverseReconnectPassiveEffects(
                finishedRoot,
                finishedWork,
                committedLanes,
                committedTransitions,
                includeWorkInProgressEffects
              );
          }
          parentFiber = parentFiber.sibling;
        }
      }
      function recursivelyTraverseAtomicPassiveEffects(finishedRoot$jscomp$0, parentFiber) {
        if (parentFiber.subtreeFlags & 10256)
          for (parentFiber = parentFiber.child; null !== parentFiber; ) {
            var finishedRoot = finishedRoot$jscomp$0, finishedWork = parentFiber, flags = finishedWork.flags;
            switch (finishedWork.tag) {
              case 22:
                recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork);
                flags & 2048 && commitOffscreenPassiveMountEffects(
                  finishedWork.alternate,
                  finishedWork
                );
                break;
              case 24:
                recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork);
                flags & 2048 && commitCachePassiveMountEffect(finishedWork.alternate, finishedWork);
                break;
              default:
                recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork);
            }
            parentFiber = parentFiber.sibling;
          }
      }
      var suspenseyCommitFlag = 8192;
      function recursivelyAccumulateSuspenseyCommit(parentFiber, committedLanes, suspendedState) {
        if (parentFiber.subtreeFlags & suspenseyCommitFlag)
          for (parentFiber = parentFiber.child; null !== parentFiber; )
            accumulateSuspenseyCommitOnFiber(
              parentFiber,
              committedLanes,
              suspendedState
            ), parentFiber = parentFiber.sibling;
      }
      function accumulateSuspenseyCommitOnFiber(fiber, committedLanes, suspendedState) {
        switch (fiber.tag) {
          case 26:
            recursivelyAccumulateSuspenseyCommit(
              fiber,
              committedLanes,
              suspendedState
            );
            fiber.flags & suspenseyCommitFlag && (null !== fiber.memoizedState ? suspendResource(
              suspendedState,
              currentHoistableRoot,
              fiber.memoizedState,
              fiber.memoizedProps
            ) : (fiber = fiber.stateNode, (committedLanes & 335544128) === committedLanes && suspendInstance(suspendedState, fiber)));
            break;
          case 5:
            recursivelyAccumulateSuspenseyCommit(
              fiber,
              committedLanes,
              suspendedState
            );
            fiber.flags & suspenseyCommitFlag && (fiber = fiber.stateNode, (committedLanes & 335544128) === committedLanes && suspendInstance(suspendedState, fiber));
            break;
          case 3:
          case 4:
            var previousHoistableRoot = currentHoistableRoot;
            currentHoistableRoot = getHoistableRoot(fiber.stateNode.containerInfo);
            recursivelyAccumulateSuspenseyCommit(
              fiber,
              committedLanes,
              suspendedState
            );
            currentHoistableRoot = previousHoistableRoot;
            break;
          case 22:
            null === fiber.memoizedState && (previousHoistableRoot = fiber.alternate, null !== previousHoistableRoot && null !== previousHoistableRoot.memoizedState ? (previousHoistableRoot = suspenseyCommitFlag, suspenseyCommitFlag = 16777216, recursivelyAccumulateSuspenseyCommit(
              fiber,
              committedLanes,
              suspendedState
            ), suspenseyCommitFlag = previousHoistableRoot) : recursivelyAccumulateSuspenseyCommit(
              fiber,
              committedLanes,
              suspendedState
            ));
            break;
          case 30:
            if (0 !== (fiber.flags & suspenseyCommitFlag) && (previousHoistableRoot = fiber.memoizedProps.name, null != previousHoistableRoot && "auto" !== previousHoistableRoot)) {
              var state = fiber.stateNode;
              state.paired = null;
              null === appearingViewTransitions && (appearingViewTransitions = /* @__PURE__ */ new Map());
              appearingViewTransitions.set(previousHoistableRoot, state);
            }
            recursivelyAccumulateSuspenseyCommit(
              fiber,
              committedLanes,
              suspendedState
            );
            break;
          default:
            recursivelyAccumulateSuspenseyCommit(
              fiber,
              committedLanes,
              suspendedState
            );
        }
      }
      function detachAlternateSiblings(parentFiber) {
        var previousFiber = parentFiber.alternate;
        if (null !== previousFiber && (parentFiber = previousFiber.child, null !== parentFiber)) {
          previousFiber.child = null;
          do
            previousFiber = parentFiber.sibling, parentFiber.sibling = null, parentFiber = previousFiber;
          while (null !== parentFiber);
        }
      }
      function recursivelyTraversePassiveUnmountEffects(parentFiber) {
        var deletions = parentFiber.deletions;
        if (0 !== (parentFiber.flags & 16)) {
          if (null !== deletions)
            for (var i = 0; i < deletions.length; i++) {
              var childToDelete = deletions[i];
              nextEffect = childToDelete;
              commitPassiveUnmountEffectsInsideOfDeletedTree_begin(
                childToDelete,
                parentFiber
              );
            }
          detachAlternateSiblings(parentFiber);
        }
        if (parentFiber.subtreeFlags & 10256)
          for (parentFiber = parentFiber.child; null !== parentFiber; )
            commitPassiveUnmountOnFiber(parentFiber), parentFiber = parentFiber.sibling;
      }
      function commitPassiveUnmountOnFiber(finishedWork) {
        switch (finishedWork.tag) {
          case 0:
          case 11:
          case 15:
            recursivelyTraversePassiveUnmountEffects(finishedWork);
            finishedWork.flags & 2048 && commitHookEffectListUnmount(9, finishedWork, finishedWork.return);
            break;
          case 3:
            recursivelyTraversePassiveUnmountEffects(finishedWork);
            break;
          case 12:
            recursivelyTraversePassiveUnmountEffects(finishedWork);
            break;
          case 22:
            var instance = finishedWork.stateNode;
            null !== finishedWork.memoizedState && instance._visibility & 2 && (null === finishedWork.return || 13 !== finishedWork.return.tag) ? (instance._visibility &= -3, recursivelyTraverseDisconnectPassiveEffects(finishedWork)) : recursivelyTraversePassiveUnmountEffects(finishedWork);
            break;
          default:
            recursivelyTraversePassiveUnmountEffects(finishedWork);
        }
      }
      function recursivelyTraverseDisconnectPassiveEffects(parentFiber) {
        var deletions = parentFiber.deletions;
        if (0 !== (parentFiber.flags & 16)) {
          if (null !== deletions)
            for (var i = 0; i < deletions.length; i++) {
              var childToDelete = deletions[i];
              nextEffect = childToDelete;
              commitPassiveUnmountEffectsInsideOfDeletedTree_begin(
                childToDelete,
                parentFiber
              );
            }
          detachAlternateSiblings(parentFiber);
        }
        for (parentFiber = parentFiber.child; null !== parentFiber; ) {
          deletions = parentFiber;
          switch (deletions.tag) {
            case 0:
            case 11:
            case 15:
              commitHookEffectListUnmount(8, deletions, deletions.return);
              recursivelyTraverseDisconnectPassiveEffects(deletions);
              break;
            case 22:
              i = deletions.stateNode;
              i._visibility & 2 && (i._visibility &= -3, recursivelyTraverseDisconnectPassiveEffects(deletions));
              break;
            default:
              recursivelyTraverseDisconnectPassiveEffects(deletions);
          }
          parentFiber = parentFiber.sibling;
        }
      }
      function commitPassiveUnmountEffectsInsideOfDeletedTree_begin(deletedSubtreeRoot, nearestMountedAncestor) {
        for (; null !== nextEffect; ) {
          var fiber = nextEffect;
          switch (fiber.tag) {
            case 0:
            case 11:
            case 15:
              commitHookEffectListUnmount(8, fiber, nearestMountedAncestor);
              break;
            case 23:
            case 22:
              if (null !== fiber.memoizedState && null !== fiber.memoizedState.cachePool) {
                var cache = fiber.memoizedState.cachePool.pool;
                null != cache && cache.refCount++;
              }
              break;
            case 24:
              releaseCache(fiber.memoizedState.cache);
          }
          cache = fiber.child;
          if (null !== cache) cache.return = fiber, nextEffect = cache;
          else
            a: for (fiber = deletedSubtreeRoot; null !== nextEffect; ) {
              cache = nextEffect;
              var sibling = cache.sibling, returnFiber = cache.return;
              detachFiberAfterEffects(cache);
              if (cache === fiber) {
                nextEffect = null;
                break a;
              }
              if (null !== sibling) {
                sibling.return = returnFiber;
                nextEffect = sibling;
                break a;
              }
              nextEffect = returnFiber;
            }
        }
      }
      var DefaultAsyncDispatcher = {
        getCacheForType: function(resourceType) {
          var cache = readContext(CacheContext), cacheForType = cache.data.get(resourceType);
          void 0 === cacheForType && (cacheForType = resourceType(), cache.data.set(resourceType, cacheForType));
          return cacheForType;
        },
        cacheSignal: function() {
          return readContext(CacheContext).controller.signal;
        }
      };
      var PossiblyWeakMap = "function" === typeof WeakMap ? WeakMap : Map;
      var executionContext = 0;
      var workInProgressRoot = null;
      var workInProgress = null;
      var workInProgressRootRenderLanes = 0;
      var workInProgressSuspendedReason = 0;
      var workInProgressThrownValue = null;
      var workInProgressRootDidSkipSuspendedSiblings = false;
      var workInProgressRootIsPrerendering = false;
      var workInProgressRootDidAttachPingListener = false;
      var entangledRenderLanes = 0;
      var workInProgressRootExitStatus = 0;
      var workInProgressRootSkippedLanes = 0;
      var workInProgressRootInterleavedUpdatedLanes = 0;
      var workInProgressRootPingedLanes = 0;
      var workInProgressDeferredLane = 0;
      var workInProgressSuspendedRetryLanes = 0;
      var workInProgressRootConcurrentErrors = null;
      var workInProgressRootRecoverableErrors = null;
      var workInProgressRootDidIncludeRecursiveRenderUpdate = false;
      var globalMostRecentFallbackTime = 0;
      var globalMostRecentTransitionTime = 0;
      var workInProgressRootRenderTargetTime = Infinity;
      var workInProgressTransitions = null;
      var legacyErrorBoundariesThatAlreadyFailed = null;
      var pendingEffectsStatus = 0;
      var pendingEffectsRoot = null;
      var pendingFinishedWork = null;
      var pendingEffectsLanes = 0;
      var pendingEffectsRemainingLanes = 0;
      var pendingPassiveTransitions = null;
      var pendingRecoverableErrors = null;
      var pendingViewTransition = null;
      var pendingViewTransitionEvents = null;
      var pendingTransitionTypes = null;
      var nestedUpdateCount = 0;
      var rootWithNestedUpdates = null;
      function requestUpdateLane() {
        return 0 !== (executionContext & 2) && 0 !== workInProgressRootRenderLanes ? workInProgressRootRenderLanes & -workInProgressRootRenderLanes : null !== ReactSharedInternals.T ? requestTransitionLane() : resolveUpdatePriority();
      }
      function requestDeferredLane() {
        if (0 === workInProgressDeferredLane)
          if (0 === (workInProgressRootRenderLanes & 536870912) || isHydrating) {
            var lane = nextTransitionDeferredLane;
            nextTransitionDeferredLane <<= 1;
            0 === (nextTransitionDeferredLane & 3932160) && (nextTransitionDeferredLane = 262144);
            workInProgressDeferredLane = lane;
          } else workInProgressDeferredLane = 536870912;
        lane = suspenseHandlerStackCursor.current;
        null !== lane && (lane.flags |= 32);
        return workInProgressDeferredLane;
      }
      function scheduleViewTransitionEvent(fiber, callback) {
        if (null != callback) {
          var state = fiber.stateNode, instance = state.ref;
          null === instance && (instance = state.ref = createViewTransitionInstance(
            getViewTransitionName(fiber.memoizedProps, state)
          ));
          null === pendingViewTransitionEvents && (pendingViewTransitionEvents = []);
          pendingViewTransitionEvents.push(callback.bind(null, instance));
        }
      }
      function scheduleUpdateOnFiber(root2, fiber, lane) {
        if (root2 === workInProgressRoot && (2 === workInProgressSuspendedReason || 9 === workInProgressSuspendedReason) || null !== root2.cancelPendingCommit)
          prepareFreshStack(root2, 0), markRootSuspended(
            root2,
            workInProgressRootRenderLanes,
            workInProgressDeferredLane,
            false
          );
        markRootUpdated$1(root2, lane);
        if (0 === (executionContext & 2) || root2 !== workInProgressRoot)
          root2 === workInProgressRoot && (0 === (executionContext & 2) && (workInProgressRootInterleavedUpdatedLanes |= lane), 4 === workInProgressRootExitStatus && markRootSuspended(
            root2,
            workInProgressRootRenderLanes,
            workInProgressDeferredLane,
            false
          )), ensureRootIsScheduled(root2);
      }
      function performWorkOnRoot(root$jscomp$0, lanes, forceSync) {
        if (0 !== (executionContext & 6)) throw Error(formatProdErrorMessage(327));
        var shouldTimeSlice = !forceSync && 0 === (lanes & 127) && 0 === (lanes & root$jscomp$0.expiredLanes) || checkIfRootIsPrerendering(root$jscomp$0, lanes), exitStatus = shouldTimeSlice ? renderRootConcurrent(root$jscomp$0, lanes) : renderRootSync(root$jscomp$0, lanes, true), renderWasConcurrent = shouldTimeSlice;
        do {
          if (0 === exitStatus) {
            workInProgressRootIsPrerendering && !shouldTimeSlice && markRootSuspended(root$jscomp$0, lanes, 0, false);
            break;
          } else {
            forceSync = root$jscomp$0.current.alternate;
            if (renderWasConcurrent && !isRenderConsistentWithExternalStores(forceSync)) {
              exitStatus = renderRootSync(root$jscomp$0, lanes, false);
              renderWasConcurrent = false;
              continue;
            }
            if (2 === exitStatus) {
              renderWasConcurrent = lanes;
              if (root$jscomp$0.errorRecoveryDisabledLanes & renderWasConcurrent)
                var JSCompiler_inline_result = 0;
              else
                JSCompiler_inline_result = root$jscomp$0.pendingLanes & -536870913, JSCompiler_inline_result = 0 !== JSCompiler_inline_result ? JSCompiler_inline_result : JSCompiler_inline_result & 536870912 ? 536870912 : 0;
              if (0 !== JSCompiler_inline_result) {
                lanes = JSCompiler_inline_result;
                a: {
                  var root2 = root$jscomp$0;
                  exitStatus = workInProgressRootConcurrentErrors;
                  var wasRootDehydrated = root2.current.memoizedState.isDehydrated;
                  wasRootDehydrated && (prepareFreshStack(root2, JSCompiler_inline_result).flags |= 256);
                  JSCompiler_inline_result = renderRootSync(
                    root2,
                    JSCompiler_inline_result,
                    false
                  );
                  if (2 !== JSCompiler_inline_result && 6 !== JSCompiler_inline_result) {
                    if (workInProgressRootDidAttachPingListener && !wasRootDehydrated) {
                      root2.errorRecoveryDisabledLanes |= renderWasConcurrent;
                      workInProgressRootInterleavedUpdatedLanes |= renderWasConcurrent;
                      exitStatus = 4;
                      break a;
                    }
                    renderWasConcurrent = workInProgressRootRecoverableErrors;
                    workInProgressRootRecoverableErrors = exitStatus;
                    null !== renderWasConcurrent && (null === workInProgressRootRecoverableErrors ? workInProgressRootRecoverableErrors = renderWasConcurrent : workInProgressRootRecoverableErrors.push.apply(
                      workInProgressRootRecoverableErrors,
                      renderWasConcurrent
                    ));
                  }
                  exitStatus = JSCompiler_inline_result;
                }
                renderWasConcurrent = false;
                if (2 !== exitStatus) continue;
              }
            }
            if (1 === exitStatus) {
              prepareFreshStack(root$jscomp$0, 0);
              markRootSuspended(root$jscomp$0, lanes, 0, true);
              break;
            }
            a: {
              shouldTimeSlice = root$jscomp$0;
              renderWasConcurrent = exitStatus;
              switch (renderWasConcurrent) {
                case 0:
                case 1:
                  throw Error(formatProdErrorMessage(345));
                case 4:
                  if ((lanes & 4194048) !== lanes && (lanes & 62914560) !== lanes)
                    break;
                case 6:
                  markRootSuspended(
                    shouldTimeSlice,
                    lanes,
                    workInProgressDeferredLane,
                    !workInProgressRootDidSkipSuspendedSiblings
                  );
                  break a;
                case 2:
                  workInProgressRootRecoverableErrors = null;
                  break;
                case 3:
                case 5:
                  break;
                default:
                  throw Error(formatProdErrorMessage(329));
              }
              if ((lanes & 62914560) === lanes && (exitStatus = globalMostRecentFallbackTime + 300 - now(), 10 < exitStatus)) {
                markRootSuspended(
                  shouldTimeSlice,
                  lanes,
                  workInProgressDeferredLane,
                  !workInProgressRootDidSkipSuspendedSiblings
                );
                if (0 !== getNextLanes(shouldTimeSlice, 0, true)) break a;
                pendingEffectsLanes = lanes;
                shouldTimeSlice.timeoutHandle = scheduleTimeout(
                  completeRootWhenReady.bind(
                    null,
                    shouldTimeSlice,
                    forceSync,
                    workInProgressRootRecoverableErrors,
                    workInProgressTransitions,
                    workInProgressRootDidIncludeRecursiveRenderUpdate,
                    lanes,
                    workInProgressDeferredLane,
                    workInProgressRootInterleavedUpdatedLanes,
                    workInProgressSuspendedRetryLanes,
                    workInProgressRootDidSkipSuspendedSiblings,
                    renderWasConcurrent,
                    "Throttled",
                    -0,
                    0
                  ),
                  exitStatus
                );
                break a;
              }
              completeRootWhenReady(
                shouldTimeSlice,
                forceSync,
                workInProgressRootRecoverableErrors,
                workInProgressTransitions,
                workInProgressRootDidIncludeRecursiveRenderUpdate,
                lanes,
                workInProgressDeferredLane,
                workInProgressRootInterleavedUpdatedLanes,
                workInProgressSuspendedRetryLanes,
                workInProgressRootDidSkipSuspendedSiblings,
                renderWasConcurrent,
                null,
                -0,
                0
              );
            }
          }
          break;
        } while (1);
        ensureRootIsScheduled(root$jscomp$0);
      }
      function completeRootWhenReady(root2, finishedWork, recoverableErrors, transitions, didIncludeRenderPhaseUpdate, lanes, spawnedLane, updatedLanes, suspendedRetryLanes, didSkipSuspendedSiblings, exitStatus, suspendedCommitReason, completedRenderStartTime, completedRenderEndTime) {
        root2.timeoutHandle = -1;
        var subtreeFlags = finishedWork.subtreeFlags, isViewTransitionEligible = (lanes & 335544064) === lanes;
        suspendedCommitReason = null;
        if (isViewTransitionEligible || subtreeFlags & 8192 || 16785408 === (subtreeFlags & 16785408)) {
          if (suspendedCommitReason = {
            stylesheets: null,
            count: 0,
            imgCount: 0,
            imgBytes: 0,
            suspenseyImages: [],
            waitingForImages: true,
            waitingForViewTransition: false,
            unsuspend: noop$1
          }, appearingViewTransitions = null, accumulateSuspenseyCommitOnFiber(
            finishedWork,
            lanes,
            suspendedCommitReason
          ), isViewTransitionEligible && (subtreeFlags = suspendedCommitReason, isViewTransitionEligible = root2.containerInfo, isViewTransitionEligible = (9 === isViewTransitionEligible.nodeType ? isViewTransitionEligible : isViewTransitionEligible.ownerDocument).__reactViewTransition, null != isViewTransitionEligible && (subtreeFlags.count++, subtreeFlags.waitingForViewTransition = true, subtreeFlags = onUnsuspend.bind(subtreeFlags), isViewTransitionEligible.finished.then(subtreeFlags, subtreeFlags))), subtreeFlags = (lanes & 62914560) === lanes ? globalMostRecentFallbackTime - now() : (lanes & 4194048) === lanes ? globalMostRecentTransitionTime - now() : 0, subtreeFlags = waitForCommitToBeReady(
            suspendedCommitReason,
            subtreeFlags
          ), null !== subtreeFlags) {
            pendingEffectsLanes = lanes;
            root2.cancelPendingCommit = subtreeFlags(
              completeRoot.bind(
                null,
                root2,
                finishedWork,
                lanes,
                recoverableErrors,
                transitions,
                didIncludeRenderPhaseUpdate,
                spawnedLane,
                updatedLanes,
                suspendedRetryLanes,
                didSkipSuspendedSiblings,
                exitStatus,
                suspendedCommitReason,
                null,
                completedRenderStartTime,
                completedRenderEndTime
              )
            );
            markRootSuspended(root2, lanes, spawnedLane, !didSkipSuspendedSiblings);
            return;
          }
        }
        completeRoot(
          root2,
          finishedWork,
          lanes,
          recoverableErrors,
          transitions,
          didIncludeRenderPhaseUpdate,
          spawnedLane,
          updatedLanes,
          suspendedRetryLanes,
          didSkipSuspendedSiblings,
          exitStatus,
          suspendedCommitReason
        );
      }
      function isRenderConsistentWithExternalStores(finishedWork) {
        for (var node = finishedWork; ; ) {
          var tag = node.tag;
          if ((0 === tag || 11 === tag || 15 === tag) && node.flags & 16384 && (tag = node.updateQueue, null !== tag && (tag = tag.stores, null !== tag)))
            for (var i = 0; i < tag.length; i++) {
              var check = tag[i], getSnapshot = check.getSnapshot;
              check = check.value;
              try {
                if (!objectIs(getSnapshot(), check)) return false;
              } catch (error) {
                return false;
              }
            }
          tag = node.child;
          if (node.subtreeFlags & 16384 && null !== tag)
            tag.return = node, node = tag;
          else {
            if (node === finishedWork) break;
            for (; null === node.sibling; ) {
              if (null === node.return || node.return === finishedWork) return true;
              node = node.return;
            }
            node.sibling.return = node.return;
            node = node.sibling;
          }
        }
        return true;
      }
      function markRootSuspended(root2, suspendedLanes, spawnedLane, didAttemptEntireTree) {
        suspendedLanes = getEntangledLanes(root2, suspendedLanes);
        suspendedLanes &= ~workInProgressRootPingedLanes;
        suspendedLanes &= ~workInProgressRootInterleavedUpdatedLanes;
        root2.suspendedLanes |= suspendedLanes;
        root2.pingedLanes &= ~suspendedLanes;
        didAttemptEntireTree && (root2.warmLanes |= suspendedLanes);
        didAttemptEntireTree = root2.expirationTimes;
        for (var lanes = suspendedLanes; 0 < lanes; ) {
          var index$6 = 31 - clz32(lanes), lane = 1 << index$6;
          didAttemptEntireTree[index$6] = -1;
          lanes &= ~lane;
        }
        0 !== spawnedLane && markSpawnedDeferredLane(root2, spawnedLane, suspendedLanes);
      }
      function flushSyncWork$1() {
        return 0 === (executionContext & 6) ? (flushSyncWorkAcrossRoots_impl(0, false), false) : true;
      }
      function resetWorkInProgressStack() {
        if (null !== workInProgress) {
          if (0 === workInProgressSuspendedReason)
            var interruptedWork = workInProgress.return;
          else
            interruptedWork = workInProgress, lastContextDependency = currentlyRenderingFiber$1 = null, resetHooksOnUnwind(interruptedWork), thenableState$1 = null, thenableIndexCounter$1 = 0, interruptedWork = workInProgress;
          for (; null !== interruptedWork; )
            unwindInterruptedWork(interruptedWork.alternate, interruptedWork), interruptedWork = interruptedWork.return;
          workInProgress = null;
        }
      }
      function prepareFreshStack(root2, lanes) {
        var timeoutHandle = root2.timeoutHandle;
        -1 !== timeoutHandle && (root2.timeoutHandle = -1, cancelTimeout(timeoutHandle));
        timeoutHandle = root2.cancelPendingCommit;
        null !== timeoutHandle && (root2.cancelPendingCommit = null, timeoutHandle());
        pendingEffectsLanes = 0;
        resetWorkInProgressStack();
        workInProgressRoot = root2;
        workInProgress = timeoutHandle = createWorkInProgress(root2.current, null);
        workInProgressRootRenderLanes = lanes;
        workInProgressSuspendedReason = 0;
        workInProgressThrownValue = null;
        workInProgressRootDidSkipSuspendedSiblings = false;
        workInProgressRootIsPrerendering = checkIfRootIsPrerendering(root2, lanes);
        workInProgressRootDidAttachPingListener = false;
        workInProgressSuspendedRetryLanes = workInProgressDeferredLane = workInProgressRootPingedLanes = workInProgressRootInterleavedUpdatedLanes = workInProgressRootSkippedLanes = workInProgressRootExitStatus = 0;
        workInProgressRootRecoverableErrors = workInProgressRootConcurrentErrors = null;
        workInProgressRootDidIncludeRecursiveRenderUpdate = false;
        entangledRenderLanes = getEntangledLanes(root2, lanes);
        finishQueueingConcurrentUpdates();
        return timeoutHandle;
      }
      function handleThrow(root2, thrownValue) {
        currentlyRenderingFiber = null;
        ReactSharedInternals.H = ContextOnlyDispatcher;
        thrownValue === SuspenseException || thrownValue === SuspenseActionException ? (thrownValue = getSuspendedThenable(), workInProgressSuspendedReason = 3) : thrownValue === SuspenseyCommitException ? (thrownValue = getSuspendedThenable(), workInProgressSuspendedReason = 4) : workInProgressSuspendedReason = thrownValue === SelectiveHydrationException ? 8 : null !== thrownValue && "object" === typeof thrownValue && "function" === typeof thrownValue.then ? 6 : 1;
        workInProgressThrownValue = thrownValue;
        null === workInProgress && (workInProgressRootExitStatus = 1, logUncaughtError(
          root2,
          createCapturedValueAtFiber(thrownValue, root2.current)
        ));
      }
      function shouldRemainOnPreviousScreen() {
        var handler = suspenseHandlerStackCursor.current;
        return null === handler ? true : (workInProgressRootRenderLanes & 4194048) === workInProgressRootRenderLanes ? null === shellBoundary ? true : false : (workInProgressRootRenderLanes & 62914560) === workInProgressRootRenderLanes || 0 !== (workInProgressRootRenderLanes & 536870912) ? handler === shellBoundary : false;
      }
      function pushDispatcher() {
        var prevDispatcher = ReactSharedInternals.H;
        ReactSharedInternals.H = ContextOnlyDispatcher;
        return null === prevDispatcher ? ContextOnlyDispatcher : prevDispatcher;
      }
      function pushAsyncDispatcher() {
        var prevAsyncDispatcher = ReactSharedInternals.A;
        ReactSharedInternals.A = DefaultAsyncDispatcher;
        return prevAsyncDispatcher;
      }
      function renderDidSuspendDelayIfPossible() {
        workInProgressRootExitStatus = 4;
        workInProgressRootDidSkipSuspendedSiblings || (workInProgressRootRenderLanes & 4194048) !== workInProgressRootRenderLanes && null !== suspenseHandlerStackCursor.current || (workInProgressRootIsPrerendering = true);
        0 === (workInProgressRootSkippedLanes & 134217727) && 0 === (workInProgressRootInterleavedUpdatedLanes & 134217727) || null === workInProgressRoot || markRootSuspended(
          workInProgressRoot,
          workInProgressRootRenderLanes,
          workInProgressDeferredLane,
          false
        );
      }
      function renderRootSync(root2, lanes, shouldYieldForPrerendering) {
        var prevExecutionContext = executionContext;
        executionContext |= 2;
        var prevDispatcher = pushDispatcher(), prevAsyncDispatcher = pushAsyncDispatcher();
        if (workInProgressRoot !== root2 || workInProgressRootRenderLanes !== lanes)
          workInProgressTransitions = null, prepareFreshStack(root2, lanes);
        lanes = false;
        var exitStatus = workInProgressRootExitStatus;
        a: do
          try {
            if (0 !== workInProgressSuspendedReason && null !== workInProgress) {
              var unitOfWork = workInProgress, thrownValue = workInProgressThrownValue;
              switch (workInProgressSuspendedReason) {
                case 8:
                  resetWorkInProgressStack();
                  exitStatus = 6;
                  break a;
                case 3:
                case 2:
                case 9:
                case 6:
                  null === suspenseHandlerStackCursor.current && (lanes = true);
                  var reason = workInProgressSuspendedReason;
                  workInProgressSuspendedReason = 0;
                  workInProgressThrownValue = null;
                  throwAndUnwindWorkLoop(root2, unitOfWork, thrownValue, reason);
                  if (shouldYieldForPrerendering && workInProgressRootIsPrerendering) {
                    exitStatus = 0;
                    break a;
                  }
                  break;
                default:
                  reason = workInProgressSuspendedReason, workInProgressSuspendedReason = 0, workInProgressThrownValue = null, throwAndUnwindWorkLoop(root2, unitOfWork, thrownValue, reason);
              }
            }
            workLoopSync();
            exitStatus = workInProgressRootExitStatus;
            break;
          } catch (thrownValue$184) {
            handleThrow(root2, thrownValue$184);
          }
        while (1);
        lanes && root2.shellSuspendCounter++;
        lastContextDependency = currentlyRenderingFiber$1 = null;
        executionContext = prevExecutionContext;
        ReactSharedInternals.H = prevDispatcher;
        ReactSharedInternals.A = prevAsyncDispatcher;
        null === workInProgress && (workInProgressRoot = null, workInProgressRootRenderLanes = 0, finishQueueingConcurrentUpdates());
        return exitStatus;
      }
      function workLoopSync() {
        for (; null !== workInProgress; ) performUnitOfWork(workInProgress);
      }
      function renderRootConcurrent(root2, lanes) {
        var prevExecutionContext = executionContext;
        executionContext |= 2;
        var prevDispatcher = pushDispatcher(), prevAsyncDispatcher = pushAsyncDispatcher();
        workInProgressRoot !== root2 || workInProgressRootRenderLanes !== lanes ? (workInProgressTransitions = null, workInProgressRootRenderTargetTime = now() + 500, prepareFreshStack(root2, lanes)) : workInProgressRootIsPrerendering = checkIfRootIsPrerendering(
          root2,
          lanes
        );
        a: do
          try {
            if (0 !== workInProgressSuspendedReason && null !== workInProgress) {
              lanes = workInProgress;
              var thrownValue = workInProgressThrownValue;
              b: switch (workInProgressSuspendedReason) {
                case 1:
                  workInProgressSuspendedReason = 0;
                  workInProgressThrownValue = null;
                  throwAndUnwindWorkLoop(root2, lanes, thrownValue, 1);
                  break;
                case 2:
                case 9:
                  if (isThenableResolved(thrownValue)) {
                    workInProgressSuspendedReason = 0;
                    workInProgressThrownValue = null;
                    replaySuspendedUnitOfWork(lanes);
                    break;
                  }
                  lanes = function() {
                    2 !== workInProgressSuspendedReason && 9 !== workInProgressSuspendedReason || workInProgressRoot !== root2 || (workInProgressSuspendedReason = 7);
                    ensureRootIsScheduled(root2);
                  };
                  thrownValue.then(lanes, lanes);
                  break a;
                case 3:
                  workInProgressSuspendedReason = 7;
                  break a;
                case 4:
                  workInProgressSuspendedReason = 5;
                  break a;
                case 7:
                  isThenableResolved(thrownValue) ? (workInProgressSuspendedReason = 0, workInProgressThrownValue = null, replaySuspendedUnitOfWork(lanes)) : (workInProgressSuspendedReason = 0, workInProgressThrownValue = null, throwAndUnwindWorkLoop(root2, lanes, thrownValue, 7));
                  break;
                case 5:
                  var resource = null;
                  switch (workInProgress.tag) {
                    case 26:
                      resource = workInProgress.memoizedState;
                    case 5:
                    case 27:
                      var hostFiber = workInProgress;
                      if (resource ? preloadResource(resource) : hostFiber.stateNode.complete) {
                        workInProgressSuspendedReason = 0;
                        workInProgressThrownValue = null;
                        var sibling = hostFiber.sibling;
                        if (null !== sibling) workInProgress = sibling;
                        else {
                          var returnFiber = hostFiber.return;
                          null !== returnFiber ? (workInProgress = returnFiber, completeUnitOfWork(returnFiber)) : workInProgress = null;
                        }
                        break b;
                      }
                  }
                  workInProgressSuspendedReason = 0;
                  workInProgressThrownValue = null;
                  throwAndUnwindWorkLoop(root2, lanes, thrownValue, 5);
                  break;
                case 6:
                  workInProgressSuspendedReason = 0;
                  workInProgressThrownValue = null;
                  throwAndUnwindWorkLoop(root2, lanes, thrownValue, 6);
                  break;
                case 8:
                  resetWorkInProgressStack();
                  workInProgressRootExitStatus = 6;
                  break a;
                default:
                  throw Error(formatProdErrorMessage(462));
              }
            }
            workLoopConcurrentByScheduler();
            break;
          } catch (thrownValue$186) {
            handleThrow(root2, thrownValue$186);
          }
        while (1);
        lastContextDependency = currentlyRenderingFiber$1 = null;
        ReactSharedInternals.H = prevDispatcher;
        ReactSharedInternals.A = prevAsyncDispatcher;
        executionContext = prevExecutionContext;
        if (null !== workInProgress) return 0;
        workInProgressRoot = null;
        workInProgressRootRenderLanes = 0;
        finishQueueingConcurrentUpdates();
        return workInProgressRootExitStatus;
      }
      function workLoopConcurrentByScheduler() {
        for (; null !== workInProgress && !shouldYield(); )
          performUnitOfWork(workInProgress);
      }
      function performUnitOfWork(unitOfWork) {
        var next = beginWork(unitOfWork.alternate, unitOfWork, entangledRenderLanes);
        unitOfWork.memoizedProps = unitOfWork.pendingProps;
        null === next ? completeUnitOfWork(unitOfWork) : workInProgress = next;
      }
      function replaySuspendedUnitOfWork(unitOfWork) {
        var next = unitOfWork;
        var current = next.alternate;
        switch (next.tag) {
          case 15:
          case 0:
            next = replayFunctionComponent(
              current,
              next,
              next.pendingProps,
              next.type,
              void 0,
              workInProgressRootRenderLanes
            );
            break;
          case 11:
            next = replayFunctionComponent(
              current,
              next,
              next.pendingProps,
              next.type.render,
              next.ref,
              workInProgressRootRenderLanes
            );
            break;
          case 5:
            resetHooksOnUnwind(next);
            var fiber = next;
            fiber === hydrationParentFiber && (isHydrating ? (popToNextHostParent(fiber), 5 === fiber.tag && null != fiber.stateNode && (nextHydratableInstance = fiber.stateNode)) : (popToNextHostParent(fiber), isHydrating = true));
          default:
            unwindInterruptedWork(current, next), next = workInProgress = resetWorkInProgress(next, entangledRenderLanes), next = beginWork(current, next, entangledRenderLanes);
        }
        unitOfWork.memoizedProps = unitOfWork.pendingProps;
        null === next ? completeUnitOfWork(unitOfWork) : workInProgress = next;
      }
      function throwAndUnwindWorkLoop(root2, unitOfWork, thrownValue, suspendedReason) {
        lastContextDependency = currentlyRenderingFiber$1 = null;
        resetHooksOnUnwind(unitOfWork);
        thenableState$1 = null;
        thenableIndexCounter$1 = 0;
        var returnFiber = unitOfWork.return;
        try {
          if (throwException(
            root2,
            returnFiber,
            unitOfWork,
            thrownValue,
            workInProgressRootRenderLanes
          )) {
            workInProgressRootExitStatus = 1;
            logUncaughtError(
              root2,
              createCapturedValueAtFiber(thrownValue, root2.current)
            );
            workInProgress = null;
            return;
          }
        } catch (error) {
          if (null !== returnFiber) throw workInProgress = returnFiber, error;
          workInProgressRootExitStatus = 1;
          logUncaughtError(
            root2,
            createCapturedValueAtFiber(thrownValue, root2.current)
          );
          workInProgress = null;
          return;
        }
        if (unitOfWork.flags & 32768) {
          if (isHydrating || 1 === suspendedReason) root2 = true;
          else if (workInProgressRootIsPrerendering || 0 !== (workInProgressRootRenderLanes & 536870912))
            root2 = false;
          else if (workInProgressRootDidSkipSuspendedSiblings = root2 = true, 2 === suspendedReason || 9 === suspendedReason || 3 === suspendedReason || 6 === suspendedReason)
            suspendedReason = suspenseHandlerStackCursor.current, null !== suspendedReason && 13 === suspendedReason.tag && (suspendedReason.flags |= 16384);
          unwindUnitOfWork(unitOfWork, root2);
        } else completeUnitOfWork(unitOfWork);
      }
      function completeUnitOfWork(unitOfWork) {
        var completedWork = unitOfWork;
        do {
          if (0 !== (completedWork.flags & 32768)) {
            unwindUnitOfWork(
              completedWork,
              workInProgressRootDidSkipSuspendedSiblings
            );
            return;
          }
          unitOfWork = completedWork.return;
          var next = completeWork(
            completedWork.alternate,
            completedWork,
            entangledRenderLanes
          );
          if (null !== next) {
            workInProgress = next;
            return;
          }
          completedWork = completedWork.sibling;
          if (null !== completedWork) {
            workInProgress = completedWork;
            return;
          }
          workInProgress = completedWork = unitOfWork;
        } while (null !== completedWork);
        0 === workInProgressRootExitStatus && (workInProgressRootExitStatus = 5);
      }
      function unwindUnitOfWork(unitOfWork, skipSiblings) {
        do {
          var next = unwindWork(unitOfWork.alternate, unitOfWork);
          if (null !== next) {
            next.flags &= 32767;
            workInProgress = next;
            return;
          }
          next = unitOfWork.return;
          null !== next && (next.flags |= 32768, next.subtreeFlags = 0, next.deletions = null);
          if (!skipSiblings && (unitOfWork = unitOfWork.sibling, null !== unitOfWork)) {
            workInProgress = unitOfWork;
            return;
          }
          workInProgress = unitOfWork = next;
        } while (null !== unitOfWork);
        workInProgressRootExitStatus = 6;
        workInProgress = null;
      }
      function completeRoot(root2, finishedWork, lanes, recoverableErrors, transitions, didIncludeRenderPhaseUpdate, spawnedLane, updatedLanes, suspendedRetryLanes, didSkipSuspendedSiblings, exitStatus, suspendedState) {
        root2.cancelPendingCommit = null;
        do
          flushPendingEffects();
        while (0 !== pendingEffectsStatus);
        if (0 !== (executionContext & 6)) throw Error(formatProdErrorMessage(327));
        if (null !== finishedWork) {
          if (finishedWork === root2.current) throw Error(formatProdErrorMessage(177));
          root2 === workInProgressRoot && (workInProgress = workInProgressRoot = null, workInProgressRootRenderLanes = 0);
          pendingFinishedWork = finishedWork;
          pendingEffectsRoot = root2;
          pendingEffectsLanes = lanes;
          pendingPassiveTransitions = transitions;
          pendingRecoverableErrors = recoverableErrors;
          commitRoot(
            root2,
            finishedWork,
            lanes,
            spawnedLane,
            updatedLanes,
            suspendedRetryLanes,
            suspendedState
          );
        }
      }
      function commitRoot(root2, finishedWork, lanes, spawnedLane, updatedLanes, suspendedRetryLanes, suspendedState) {
        var remainingLanes = finishedWork.lanes | finishedWork.childLanes;
        pendingEffectsRemainingLanes = remainingLanes;
        remainingLanes |= concurrentlyUpdatedLanes;
        markRootFinished(
          root2,
          lanes,
          remainingLanes,
          spawnedLane,
          updatedLanes,
          suspendedRetryLanes
        );
        pendingViewTransitionEvents = null;
        (lanes & 335544064) === lanes ? (pendingTransitionTypes = claimQueuedTransitionTypes(root2), spawnedLane = 10262) : (pendingTransitionTypes = null, spawnedLane = 10256);
        0 !== (finishedWork.subtreeFlags & spawnedLane) || 0 !== (finishedWork.flags & spawnedLane) ? (root2.callbackNode = null, root2.callbackPriority = 0, scheduleCallback$1(NormalPriority$1, function() {
          flushPassiveEffects();
          return null;
        })) : (root2.callbackNode = null, root2.callbackPriority = 0);
        shouldStartViewTransition = false;
        spawnedLane = 0 !== (finishedWork.flags & 13878);
        if (0 !== (finishedWork.subtreeFlags & 13878) || spawnedLane) {
          spawnedLane = ReactSharedInternals.T;
          ReactSharedInternals.T = null;
          updatedLanes = ReactDOMSharedInternals.p;
          ReactDOMSharedInternals.p = 2;
          suspendedRetryLanes = executionContext;
          executionContext |= 4;
          try {
            commitBeforeMutationEffects(root2, finishedWork, lanes);
          } finally {
            executionContext = suspendedRetryLanes, ReactDOMSharedInternals.p = updatedLanes, ReactSharedInternals.T = spawnedLane;
          }
        }
        pendingEffectsStatus = 1;
        shouldStartViewTransition ? pendingViewTransition = startViewTransition(
          suspendedState,
          root2.containerInfo,
          pendingTransitionTypes,
          flushMutationEffects,
          flushLayoutEffects,
          flushAfterMutationEffects,
          flushSpawnedWork,
          flushPassiveEffects,
          reportViewTransitionError,
          null,
          null
        ) : (flushMutationEffects(), flushLayoutEffects(), flushSpawnedWork());
      }
      function reportViewTransitionError(error) {
        if (0 !== pendingEffectsStatus) {
          var onRecoverableError = pendingEffectsRoot.onRecoverableError;
          onRecoverableError(error, { componentStack: null });
        }
      }
      function flushAfterMutationEffects() {
        3 === pendingEffectsStatus && (pendingEffectsStatus = 0, commitAfterMutationEffectsOnFiber(pendingFinishedWork, pendingEffectsRoot), pendingEffectsStatus = 4);
      }
      function flushMutationEffects() {
        if (1 === pendingEffectsStatus) {
          pendingEffectsStatus = 0;
          var root2 = pendingEffectsRoot, finishedWork = pendingFinishedWork, lanes = pendingEffectsLanes, rootMutationHasEffect = 0 !== (finishedWork.flags & 13878);
          if (0 !== (finishedWork.subtreeFlags & 13878) || rootMutationHasEffect) {
            rootMutationHasEffect = ReactSharedInternals.T;
            ReactSharedInternals.T = null;
            var previousPriority = ReactDOMSharedInternals.p;
            ReactDOMSharedInternals.p = 2;
            var prevExecutionContext = executionContext;
            executionContext |= 4;
            try {
              inUpdateViewTransition = rootViewTransitionAffected = false;
              commitMutationEffectsOnFiber(finishedWork, root2, lanes);
              lanes = selectionInformation;
              var curFocusedElem = getActiveElementDeep(root2.containerInfo), priorFocusedElem = lanes.focusedElem, priorSelectionRange = lanes.selectionRange;
              if (curFocusedElem !== priorFocusedElem && priorFocusedElem && priorFocusedElem.ownerDocument && containsNode(
                priorFocusedElem.ownerDocument.documentElement,
                priorFocusedElem
              )) {
                if (null !== priorSelectionRange && hasSelectionCapabilities(priorFocusedElem)) {
                  var start = priorSelectionRange.start, end = priorSelectionRange.end;
                  void 0 === end && (end = start);
                  if ("selectionStart" in priorFocusedElem)
                    priorFocusedElem.selectionStart = start, priorFocusedElem.selectionEnd = Math.min(
                      end,
                      priorFocusedElem.value.length
                    );
                  else {
                    var doc = priorFocusedElem.ownerDocument || document, win = doc && doc.defaultView || window;
                    if (win.getSelection) {
                      var selection = win.getSelection(), length = priorFocusedElem.textContent.length, start$jscomp$0 = Math.min(priorSelectionRange.start, length), end$jscomp$0 = void 0 === priorSelectionRange.end ? start$jscomp$0 : Math.min(priorSelectionRange.end, length);
                      !selection.extend && start$jscomp$0 > end$jscomp$0 && (curFocusedElem = end$jscomp$0, end$jscomp$0 = start$jscomp$0, start$jscomp$0 = curFocusedElem);
                      var startMarker = getNodeForCharacterOffset(
                        priorFocusedElem,
                        start$jscomp$0
                      ), endMarker = getNodeForCharacterOffset(
                        priorFocusedElem,
                        end$jscomp$0
                      );
                      if (startMarker && endMarker && (1 !== selection.rangeCount || selection.anchorNode !== startMarker.node || selection.anchorOffset !== startMarker.offset || selection.focusNode !== endMarker.node || selection.focusOffset !== endMarker.offset)) {
                        var range = doc.createRange();
                        range.setStart(startMarker.node, startMarker.offset);
                        selection.removeAllRanges();
                        start$jscomp$0 > end$jscomp$0 ? (selection.addRange(range), selection.extend(endMarker.node, endMarker.offset)) : (range.setEnd(endMarker.node, endMarker.offset), selection.addRange(range));
                      }
                    }
                  }
                }
                doc = [];
                for (selection = priorFocusedElem; selection = selection.parentNode; )
                  1 === selection.nodeType && doc.push({
                    element: selection,
                    left: selection.scrollLeft,
                    top: selection.scrollTop
                  });
                "function" === typeof priorFocusedElem.focus && priorFocusedElem.focus();
                for (priorFocusedElem = 0; priorFocusedElem < doc.length; priorFocusedElem++) {
                  var info = doc[priorFocusedElem];
                  info.element.scrollLeft = info.left;
                  info.element.scrollTop = info.top;
                }
              }
              _enabled = !!eventsEnabled;
              selectionInformation = eventsEnabled = null;
            } finally {
              executionContext = prevExecutionContext, ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = rootMutationHasEffect;
            }
          }
          root2.current = finishedWork;
          pendingEffectsStatus = 2;
        }
      }
      function flushLayoutEffects() {
        if (2 === pendingEffectsStatus) {
          pendingEffectsStatus = 0;
          var root2 = pendingEffectsRoot, finishedWork = pendingFinishedWork, rootHasLayoutEffect = 0 !== (finishedWork.flags & 8772);
          if (0 !== (finishedWork.subtreeFlags & 8772) || rootHasLayoutEffect) {
            rootHasLayoutEffect = ReactSharedInternals.T;
            ReactSharedInternals.T = null;
            var previousPriority = ReactDOMSharedInternals.p;
            ReactDOMSharedInternals.p = 2;
            var prevExecutionContext = executionContext;
            executionContext |= 4;
            try {
              commitLayoutEffectOnFiber(root2, finishedWork.alternate, finishedWork);
            } finally {
              executionContext = prevExecutionContext, ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = rootHasLayoutEffect;
            }
          }
          pendingEffectsStatus = 3;
        }
      }
      function flushSpawnedWork() {
        if (4 === pendingEffectsStatus || 3 === pendingEffectsStatus) {
          pendingEffectsStatus = 0;
          var committedViewTransition = pendingViewTransition;
          pendingViewTransition = null;
          requestPaint();
          var root2 = pendingEffectsRoot, finishedWork = pendingFinishedWork, lanes = pendingEffectsLanes, recoverableErrors = pendingRecoverableErrors, passiveSubtreeMask = (lanes & 335544064) === lanes ? 10262 : 10256;
          0 !== (finishedWork.subtreeFlags & passiveSubtreeMask) || 0 !== (finishedWork.flags & passiveSubtreeMask) ? pendingEffectsStatus = 5 : (pendingEffectsStatus = 0, pendingFinishedWork = pendingEffectsRoot = null, releaseRootPooledCache(root2, root2.pendingLanes));
          passiveSubtreeMask = root2.pendingLanes;
          0 === passiveSubtreeMask && (legacyErrorBoundariesThatAlreadyFailed = null);
          lanesToEventPriority(lanes);
          finishedWork = finishedWork.stateNode;
          if (injectedHook && "function" === typeof injectedHook.onCommitFiberRoot)
            try {
              injectedHook.onCommitFiberRoot(
                rendererID,
                finishedWork,
                void 0,
                128 === (finishedWork.current.flags & 128)
              );
            } catch (err) {
            }
          if (null !== recoverableErrors) {
            finishedWork = ReactSharedInternals.T;
            passiveSubtreeMask = ReactDOMSharedInternals.p;
            ReactDOMSharedInternals.p = 2;
            ReactSharedInternals.T = null;
            try {
              for (var onRecoverableError = root2.onRecoverableError, i = 0; i < recoverableErrors.length; i++) {
                var recoverableError = recoverableErrors[i];
                onRecoverableError(recoverableError.value, {
                  componentStack: recoverableError.stack
                });
              }
            } finally {
              ReactSharedInternals.T = finishedWork, ReactDOMSharedInternals.p = passiveSubtreeMask;
            }
          }
          recoverableErrors = pendingViewTransitionEvents;
          onRecoverableError = pendingTransitionTypes;
          pendingTransitionTypes = null;
          if (null !== recoverableErrors && (pendingViewTransitionEvents = null, null === onRecoverableError && (onRecoverableError = []), null !== committedViewTransition))
            for (recoverableError = 0; recoverableError < recoverableErrors.length; recoverableError++)
              finishedWork = (0, recoverableErrors[recoverableError])(
                onRecoverableError
              ), void 0 !== finishedWork && committedViewTransition.finished.finally(finishedWork);
          0 !== (pendingEffectsLanes & 3) && flushPendingEffects();
          ensureRootIsScheduled(root2);
          passiveSubtreeMask = root2.pendingLanes;
          0 !== (lanes & 261930) && 0 !== (passiveSubtreeMask & 42) ? root2 === rootWithNestedUpdates ? nestedUpdateCount++ : (nestedUpdateCount = 0, rootWithNestedUpdates = root2) : (nestedUpdateCount = 0, rootWithNestedUpdates = null);
          flushSyncWorkAcrossRoots_impl(0, false);
        }
      }
      function releaseRootPooledCache(root2, remainingLanes) {
        0 === (root2.pooledCacheLanes &= remainingLanes) && (remainingLanes = root2.pooledCache, null != remainingLanes && (root2.pooledCache = null, releaseCache(remainingLanes)));
      }
      function flushPendingEffects() {
        null !== pendingViewTransition && (pendingViewTransition.skipTransition(), pendingViewTransition = null);
        flushMutationEffects();
        flushLayoutEffects();
        flushSpawnedWork();
        return flushPassiveEffects();
      }
      function flushPassiveEffects() {
        if (5 !== pendingEffectsStatus) return false;
        var root2 = pendingEffectsRoot, remainingLanes = pendingEffectsRemainingLanes;
        pendingEffectsRemainingLanes = 0;
        var renderPriority = lanesToEventPriority(pendingEffectsLanes), prevTransition = ReactSharedInternals.T, previousPriority = ReactDOMSharedInternals.p;
        try {
          ReactDOMSharedInternals.p = 32 > renderPriority ? 32 : renderPriority;
          ReactSharedInternals.T = null;
          renderPriority = pendingPassiveTransitions;
          pendingPassiveTransitions = null;
          var root$jscomp$0 = pendingEffectsRoot, lanes = pendingEffectsLanes;
          pendingEffectsStatus = 0;
          pendingFinishedWork = pendingEffectsRoot = null;
          pendingEffectsLanes = 0;
          if (0 !== (executionContext & 6)) throw Error(formatProdErrorMessage(331));
          var prevExecutionContext = executionContext;
          executionContext |= 4;
          commitPassiveUnmountOnFiber(root$jscomp$0.current);
          commitPassiveMountOnFiber(
            root$jscomp$0,
            root$jscomp$0.current,
            lanes,
            renderPriority
          );
          executionContext = prevExecutionContext;
          flushSyncWorkAcrossRoots_impl(0, false);
          if (injectedHook && "function" === typeof injectedHook.onPostCommitFiberRoot)
            try {
              injectedHook.onPostCommitFiberRoot(rendererID, root$jscomp$0);
            } catch (err) {
            }
          return true;
        } finally {
          ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = prevTransition, releaseRootPooledCache(root2, remainingLanes);
        }
      }
      function captureCommitPhaseErrorOnRoot(rootFiber, sourceFiber, error) {
        sourceFiber = createCapturedValueAtFiber(error, sourceFiber);
        sourceFiber = createRootErrorUpdate(rootFiber.stateNode, sourceFiber, 2);
        rootFiber = enqueueUpdate(rootFiber, sourceFiber, 2);
        null !== rootFiber && (markRootUpdated$1(rootFiber, 2), ensureRootIsScheduled(rootFiber));
      }
      function captureCommitPhaseError(sourceFiber, nearestMountedAncestor, error) {
        if (3 === sourceFiber.tag)
          captureCommitPhaseErrorOnRoot(sourceFiber, sourceFiber, error);
        else
          for (; null !== nearestMountedAncestor; ) {
            if (3 === nearestMountedAncestor.tag) {
              captureCommitPhaseErrorOnRoot(
                nearestMountedAncestor,
                sourceFiber,
                error
              );
              break;
            } else if (1 === nearestMountedAncestor.tag) {
              var instance = nearestMountedAncestor.stateNode;
              if ("function" === typeof nearestMountedAncestor.type.getDerivedStateFromError || "function" === typeof instance.componentDidCatch && (null === legacyErrorBoundariesThatAlreadyFailed || !legacyErrorBoundariesThatAlreadyFailed.has(instance))) {
                sourceFiber = createCapturedValueAtFiber(error, sourceFiber);
                error = createClassErrorUpdate(2);
                instance = enqueueUpdate(nearestMountedAncestor, error, 2);
                null !== instance && (initializeClassErrorUpdate(
                  error,
                  instance,
                  nearestMountedAncestor,
                  sourceFiber
                ), markRootUpdated$1(instance, 2), ensureRootIsScheduled(instance));
                break;
              }
            }
            nearestMountedAncestor = nearestMountedAncestor.return;
          }
      }
      function attachPingListener(root2, wakeable, lanes) {
        var pingCache = root2.pingCache;
        if (null === pingCache) {
          pingCache = root2.pingCache = new PossiblyWeakMap();
          var threadIDs = /* @__PURE__ */ new Set();
          pingCache.set(wakeable, threadIDs);
        } else
          threadIDs = pingCache.get(wakeable), void 0 === threadIDs && (threadIDs = /* @__PURE__ */ new Set(), pingCache.set(wakeable, threadIDs));
        threadIDs.has(lanes) || (workInProgressRootDidAttachPingListener = true, threadIDs.add(lanes), root2 = pingSuspendedRoot.bind(null, root2, wakeable, lanes), wakeable.then(root2, root2));
      }
      function pingSuspendedRoot(root2, wakeable, pingedLanes) {
        var pingCache = root2.pingCache;
        null !== pingCache && pingCache.delete(wakeable);
        root2.pingedLanes |= root2.suspendedLanes & pingedLanes;
        root2.warmLanes &= ~pingedLanes;
        workInProgressRoot === root2 && (workInProgressRootRenderLanes & pingedLanes) === pingedLanes && (4 === workInProgressRootExitStatus || 3 === workInProgressRootExitStatus && (workInProgressRootRenderLanes & 62914560) === workInProgressRootRenderLanes && 300 > now() - globalMostRecentFallbackTime ? 0 === (executionContext & 2) ? prepareFreshStack(root2, 0) : workInProgressRootPingedLanes |= pingedLanes : workInProgressRootPingedLanes |= pingedLanes, workInProgressSuspendedRetryLanes === workInProgressRootRenderLanes && (workInProgressSuspendedRetryLanes = 0));
        ensureRootIsScheduled(root2);
      }
      function retryTimedOutBoundary(boundaryFiber, retryLane) {
        0 === retryLane && (retryLane = claimNextRetryLane());
        boundaryFiber = enqueueConcurrentRenderForLane(boundaryFiber, retryLane);
        null !== boundaryFiber && (markRootUpdated$1(boundaryFiber, retryLane), ensureRootIsScheduled(boundaryFiber));
      }
      function retryDehydratedSuspenseBoundary(boundaryFiber) {
        var suspenseState = boundaryFiber.memoizedState, retryLane = 0;
        null !== suspenseState && (retryLane = suspenseState.retryLane);
        retryTimedOutBoundary(boundaryFiber, retryLane);
      }
      function resolveRetryWakeable(boundaryFiber, wakeable) {
        var retryLane = 0;
        switch (boundaryFiber.tag) {
          case 31:
          case 13:
            var retryCache = boundaryFiber.stateNode;
            var suspenseState = boundaryFiber.memoizedState;
            null !== suspenseState && (retryLane = suspenseState.retryLane);
            break;
          case 19:
            retryCache = boundaryFiber.stateNode;
            break;
          case 22:
            retryCache = boundaryFiber.stateNode._retryCache;
            break;
          default:
            throw Error(formatProdErrorMessage(314));
        }
        null !== retryCache && retryCache.delete(wakeable);
        retryTimedOutBoundary(boundaryFiber, retryLane);
      }
      function scheduleCallback$1(priorityLevel, callback) {
        return scheduleCallback$3(priorityLevel, callback);
      }
      var firstScheduledRoot = null;
      var lastScheduledRoot = null;
      var didScheduleMicrotask = false;
      var mightHavePendingSyncWork = false;
      var isFlushingWork = false;
      var currentEventTransitionLane = 0;
      function ensureRootIsScheduled(root2) {
        root2 !== lastScheduledRoot && null === root2.next && (null === lastScheduledRoot ? firstScheduledRoot = lastScheduledRoot = root2 : lastScheduledRoot = lastScheduledRoot.next = root2);
        mightHavePendingSyncWork = true;
        didScheduleMicrotask || (didScheduleMicrotask = true, scheduleImmediateRootScheduleTask());
      }
      function flushSyncWorkAcrossRoots_impl(syncTransitionLanes, onlyLegacy) {
        if (!isFlushingWork && mightHavePendingSyncWork) {
          isFlushingWork = true;
          do {
            var didPerformSomeWork = false;
            for (var root$190 = firstScheduledRoot; null !== root$190; ) {
              if (!onlyLegacy)
                if (0 !== syncTransitionLanes) {
                  var pendingLanes = root$190.pendingLanes;
                  if (0 === pendingLanes) var JSCompiler_inline_result = 0;
                  else {
                    var suspendedLanes = root$190.suspendedLanes, pingedLanes = root$190.pingedLanes;
                    JSCompiler_inline_result = (1 << 31 - clz32(42 | syncTransitionLanes) + 1) - 1;
                    JSCompiler_inline_result &= pendingLanes & ~(suspendedLanes & ~pingedLanes);
                    JSCompiler_inline_result = JSCompiler_inline_result & 201326741 ? JSCompiler_inline_result & 201326741 | 1 : JSCompiler_inline_result ? JSCompiler_inline_result | 2 : 0;
                  }
                  0 !== JSCompiler_inline_result && (didPerformSomeWork = true, performSyncWorkOnRoot(root$190, JSCompiler_inline_result));
                } else
                  JSCompiler_inline_result = workInProgressRootRenderLanes, JSCompiler_inline_result = getNextLanes(
                    root$190,
                    root$190 === workInProgressRoot ? JSCompiler_inline_result : 0,
                    null !== root$190.cancelPendingCommit || -1 !== root$190.timeoutHandle
                  ), 0 === (JSCompiler_inline_result & 3) || checkIfRootIsPrerendering(root$190, JSCompiler_inline_result) || (didPerformSomeWork = true, performSyncWorkOnRoot(root$190, JSCompiler_inline_result));
              root$190 = root$190.next;
            }
          } while (didPerformSomeWork);
          isFlushingWork = false;
        }
      }
      function processRootScheduleInImmediateTask() {
        processRootScheduleInMicrotask();
      }
      function processRootScheduleInMicrotask() {
        mightHavePendingSyncWork = didScheduleMicrotask = false;
        var syncTransitionLanes = 0;
        0 !== currentEventTransitionLane && shouldAttemptEagerTransition() && (syncTransitionLanes = currentEventTransitionLane);
        for (var currentTime = now(), prev = null, root2 = firstScheduledRoot; null !== root2; ) {
          var next = root2.next, nextLanes = scheduleTaskForRootDuringMicrotask(root2, currentTime);
          if (0 === nextLanes)
            root2.next = null, null === prev ? firstScheduledRoot = next : prev.next = next, null === next && (lastScheduledRoot = prev);
          else if (prev = root2, 0 !== syncTransitionLanes || 0 !== (nextLanes & 3))
            mightHavePendingSyncWork = true;
          root2 = next;
        }
        0 !== pendingEffectsStatus && 5 !== pendingEffectsStatus || flushSyncWorkAcrossRoots_impl(syncTransitionLanes, false);
        0 !== currentEventTransitionLane && (currentEventTransitionLane = 0);
      }
      function scheduleTaskForRootDuringMicrotask(root2, currentTime) {
        for (var suspendedLanes = root2.suspendedLanes, pingedLanes = root2.pingedLanes, expirationTimes = root2.expirationTimes, lanes = root2.pendingLanes & -62914561; 0 < lanes; ) {
          var index$5 = 31 - clz32(lanes), lane = 1 << index$5, expirationTime = expirationTimes[index$5];
          if (-1 === expirationTime) {
            if (0 === (lane & suspendedLanes) || 0 !== (lane & pingedLanes))
              expirationTimes[index$5] = computeExpirationTime(lane, currentTime);
          } else expirationTime <= currentTime && (root2.expiredLanes |= lane);
          lanes &= ~lane;
        }
        currentTime = workInProgressRoot;
        suspendedLanes = workInProgressRootRenderLanes;
        suspendedLanes = getNextLanes(
          root2,
          root2 === currentTime ? suspendedLanes : 0,
          null !== root2.cancelPendingCommit || -1 !== root2.timeoutHandle
        );
        pingedLanes = root2.callbackNode;
        if (0 === suspendedLanes || root2 === currentTime && (2 === workInProgressSuspendedReason || 9 === workInProgressSuspendedReason) || null !== root2.cancelPendingCommit)
          return null !== pingedLanes && null !== pingedLanes && cancelCallback$1(pingedLanes), root2.callbackNode = null, root2.callbackPriority = 0;
        if (0 === (suspendedLanes & 3) || checkIfRootIsPrerendering(root2, suspendedLanes)) {
          currentTime = suspendedLanes & -suspendedLanes;
          if (currentTime === root2.callbackPriority) return currentTime;
          null !== pingedLanes && cancelCallback$1(pingedLanes);
          switch (lanesToEventPriority(suspendedLanes)) {
            case 2:
            case 8:
              suspendedLanes = UserBlockingPriority;
              break;
            case 32:
              suspendedLanes = NormalPriority$1;
              break;
            case 268435456:
              suspendedLanes = IdlePriority;
              break;
            default:
              suspendedLanes = NormalPriority$1;
          }
          pingedLanes = performWorkOnRootViaSchedulerTask.bind(null, root2);
          suspendedLanes = scheduleCallback$3(suspendedLanes, pingedLanes);
          root2.callbackPriority = currentTime;
          root2.callbackNode = suspendedLanes;
          return currentTime;
        }
        null !== pingedLanes && null !== pingedLanes && cancelCallback$1(pingedLanes);
        root2.callbackPriority = 2;
        root2.callbackNode = null;
        return 2;
      }
      function performWorkOnRootViaSchedulerTask(root2, didTimeout) {
        if (0 !== pendingEffectsStatus && 5 !== pendingEffectsStatus)
          return root2.callbackNode = null, root2.callbackPriority = 0, null;
        var originalCallbackNode = root2.callbackNode;
        if (flushPendingEffects() && root2.callbackNode !== originalCallbackNode)
          return null;
        var workInProgressRootRenderLanes$jscomp$0 = workInProgressRootRenderLanes;
        workInProgressRootRenderLanes$jscomp$0 = getNextLanes(
          root2,
          root2 === workInProgressRoot ? workInProgressRootRenderLanes$jscomp$0 : 0,
          null !== root2.cancelPendingCommit || -1 !== root2.timeoutHandle
        );
        if (0 === workInProgressRootRenderLanes$jscomp$0) return null;
        performWorkOnRoot(root2, workInProgressRootRenderLanes$jscomp$0, didTimeout);
        scheduleTaskForRootDuringMicrotask(root2, now());
        return null != root2.callbackNode && root2.callbackNode === originalCallbackNode ? performWorkOnRootViaSchedulerTask.bind(null, root2) : null;
      }
      function performSyncWorkOnRoot(root2, lanes) {
        if (flushPendingEffects()) return null;
        performWorkOnRoot(root2, lanes, true);
      }
      function scheduleImmediateRootScheduleTask() {
        scheduleMicrotask(function() {
          0 !== (executionContext & 6) ? scheduleCallback$3(
            ImmediatePriority,
            processRootScheduleInImmediateTask
          ) : processRootScheduleInMicrotask();
        });
      }
      function requestTransitionLane() {
        if (0 === currentEventTransitionLane) {
          var actionScopeLane = currentEntangledLane;
          0 === actionScopeLane && (actionScopeLane = nextTransitionUpdateLane, nextTransitionUpdateLane <<= 1, 0 === (nextTransitionUpdateLane & 261888) && (nextTransitionUpdateLane = 256));
          currentEventTransitionLane = actionScopeLane;
        }
        return currentEventTransitionLane;
      }
      function coerceFormActionProp(actionProp) {
        return null == actionProp || "symbol" === typeof actionProp || "boolean" === typeof actionProp ? null : "function" === typeof actionProp ? actionProp : sanitizeURL(actionProp);
      }
      function extractEvents$1(dispatchQueue, domEventName, maybeTargetInst, nativeEvent, nativeEventTarget) {
        if ("submit" === domEventName && maybeTargetInst && maybeTargetInst.stateNode === nativeEventTarget) {
          var action = coerceFormActionProp(
            (nativeEventTarget[internalPropsKey] || null).action
          ), submitter = nativeEvent.submitter;
          submitter && (domEventName = (domEventName = submitter[internalPropsKey] || null) ? coerceFormActionProp(domEventName.formAction) : submitter.getAttribute("formAction"), null !== domEventName && (action = domEventName, submitter = null));
          var event = new SyntheticEvent(
            "action",
            "action",
            null,
            nativeEvent,
            nativeEventTarget
          );
          dispatchQueue.push({
            event,
            listeners: [
              {
                instance: null,
                listener: function() {
                  if (nativeEvent.defaultPrevented) {
                    if (0 !== currentEventTransitionLane) {
                      var formData = new FormData(nativeEventTarget, submitter);
                      startHostTransition(
                        maybeTargetInst,
                        {
                          pending: true,
                          data: formData,
                          method: nativeEventTarget.method,
                          action
                        },
                        null,
                        formData
                      );
                    }
                  } else
                    "function" === typeof action && (event.preventDefault(), formData = new FormData(nativeEventTarget, submitter), startHostTransition(
                      maybeTargetInst,
                      {
                        pending: true,
                        data: formData,
                        method: nativeEventTarget.method,
                        action
                      },
                      action,
                      formData
                    ));
                },
                currentTarget: nativeEventTarget
              }
            ]
          });
        }
      }
      for (i$jscomp$inline_1667 = 0; i$jscomp$inline_1667 < simpleEventPluginEvents.length; i$jscomp$inline_1667++) {
        eventName$jscomp$inline_1668 = simpleEventPluginEvents[i$jscomp$inline_1667], domEventName$jscomp$inline_1669 = eventName$jscomp$inline_1668.toLowerCase(), capitalizedEvent$jscomp$inline_1670 = eventName$jscomp$inline_1668[0].toUpperCase() + eventName$jscomp$inline_1668.slice(1);
        registerSimpleEvent(
          domEventName$jscomp$inline_1669,
          "on" + capitalizedEvent$jscomp$inline_1670
        );
      }
      var eventName$jscomp$inline_1668;
      var domEventName$jscomp$inline_1669;
      var capitalizedEvent$jscomp$inline_1670;
      var i$jscomp$inline_1667;
      registerSimpleEvent(ANIMATION_END, "onAnimationEnd");
      registerSimpleEvent(ANIMATION_ITERATION, "onAnimationIteration");
      registerSimpleEvent(ANIMATION_START, "onAnimationStart");
      registerSimpleEvent("dblclick", "onDoubleClick");
      registerSimpleEvent("focusin", "onFocus");
      registerSimpleEvent("focusout", "onBlur");
      registerSimpleEvent(TRANSITION_RUN, "onTransitionRun");
      registerSimpleEvent(TRANSITION_START, "onTransitionStart");
      registerSimpleEvent(TRANSITION_CANCEL, "onTransitionCancel");
      registerSimpleEvent(TRANSITION_END, "onTransitionEnd");
      registerDirectEvent("onMouseEnter", ["mouseout", "mouseover"]);
      registerDirectEvent("onMouseLeave", ["mouseout", "mouseover"]);
      registerDirectEvent("onPointerEnter", ["pointerout", "pointerover"]);
      registerDirectEvent("onPointerLeave", ["pointerout", "pointerover"]);
      registerTwoPhaseEvent(
        "onChange",
        "change click focusin focusout input keydown keyup selectionchange".split(" ")
      );
      registerTwoPhaseEvent(
        "onSelect",
        "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
          " "
        )
      );
      registerTwoPhaseEvent("onBeforeInput", [
        "compositionend",
        "keypress",
        "textInput",
        "paste"
      ]);
      registerTwoPhaseEvent(
        "onCompositionEnd",
        "compositionend focusout keydown keypress keyup mousedown".split(" ")
      );
      registerTwoPhaseEvent(
        "onCompositionStart",
        "compositionstart focusout keydown keypress keyup mousedown".split(" ")
      );
      registerTwoPhaseEvent(
        "onCompositionUpdate",
        "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
      );
      var mediaEventTypes = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " "
      );
      var nonDelegatedEvents = new Set(
        "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(mediaEventTypes)
      );
      function processDispatchQueue(dispatchQueue, eventSystemFlags) {
        eventSystemFlags = 0 !== (eventSystemFlags & 4);
        for (var i = 0; i < dispatchQueue.length; i++) {
          var _dispatchQueue$i = dispatchQueue[i], event = _dispatchQueue$i.event;
          _dispatchQueue$i = _dispatchQueue$i.listeners;
          a: {
            var previousInstance = void 0;
            if (eventSystemFlags)
              for (var i$jscomp$0 = _dispatchQueue$i.length - 1; 0 <= i$jscomp$0; i$jscomp$0--) {
                var _dispatchListeners$i = _dispatchQueue$i[i$jscomp$0], instance = _dispatchListeners$i.instance, currentTarget = _dispatchListeners$i.currentTarget;
                _dispatchListeners$i = _dispatchListeners$i.listener;
                if (instance !== previousInstance && event.isPropagationStopped())
                  break a;
                previousInstance = _dispatchListeners$i;
                event.currentTarget = currentTarget;
                try {
                  previousInstance(event);
                } catch (error) {
                  reportGlobalError(error);
                }
                event.currentTarget = null;
                previousInstance = instance;
              }
            else
              for (i$jscomp$0 = 0; i$jscomp$0 < _dispatchQueue$i.length; i$jscomp$0++) {
                _dispatchListeners$i = _dispatchQueue$i[i$jscomp$0];
                instance = _dispatchListeners$i.instance;
                currentTarget = _dispatchListeners$i.currentTarget;
                _dispatchListeners$i = _dispatchListeners$i.listener;
                if (instance !== previousInstance && event.isPropagationStopped())
                  break a;
                previousInstance = _dispatchListeners$i;
                event.currentTarget = currentTarget;
                try {
                  previousInstance(event);
                } catch (error) {
                  reportGlobalError(error);
                }
                event.currentTarget = null;
                previousInstance = instance;
              }
          }
        }
      }
      function listenToNonDelegatedEvent(domEventName, targetElement) {
        var JSCompiler_inline_result = targetElement[internalEventHandlersKey];
        void 0 === JSCompiler_inline_result && (JSCompiler_inline_result = targetElement[internalEventHandlersKey] = /* @__PURE__ */ new Set());
        var listenerSetKey = domEventName + "__bubble";
        JSCompiler_inline_result.has(listenerSetKey) || (addTrappedEventListener(targetElement, domEventName, 2, false), JSCompiler_inline_result.add(listenerSetKey));
      }
      function listenToNativeEvent(domEventName, isCapturePhaseListener, target) {
        var eventSystemFlags = 0;
        isCapturePhaseListener && (eventSystemFlags |= 4);
        addTrappedEventListener(
          target,
          domEventName,
          eventSystemFlags,
          isCapturePhaseListener
        );
      }
      var listeningMarker = "_reactListening" + Math.random().toString(36).slice(2);
      function listenToAllSupportedEvents(rootContainerElement) {
        if (!rootContainerElement[listeningMarker]) {
          rootContainerElement[listeningMarker] = true;
          allNativeEvents.forEach(function(domEventName) {
            "selectionchange" !== domEventName && (nonDelegatedEvents.has(domEventName) || listenToNativeEvent(domEventName, false, rootContainerElement), listenToNativeEvent(domEventName, true, rootContainerElement));
          });
          var ownerDocument = 9 === rootContainerElement.nodeType ? rootContainerElement : rootContainerElement.ownerDocument;
          null === ownerDocument || ownerDocument[listeningMarker] || (ownerDocument[listeningMarker] = true, listenToNativeEvent("selectionchange", false, ownerDocument));
        }
      }
      function addTrappedEventListener(targetContainer, domEventName, eventSystemFlags, isCapturePhaseListener) {
        switch (getEventPriority(domEventName)) {
          case 2:
            var listenerWrapper = dispatchDiscreteEvent;
            break;
          case 8:
            listenerWrapper = dispatchContinuousEvent;
            break;
          default:
            listenerWrapper = dispatchEvent;
        }
        eventSystemFlags = listenerWrapper.bind(
          null,
          domEventName,
          eventSystemFlags,
          targetContainer
        );
        listenerWrapper = void 0;
        !passiveBrowserEventsSupported || "touchstart" !== domEventName && "touchmove" !== domEventName && "wheel" !== domEventName || (listenerWrapper = true);
        isCapturePhaseListener ? void 0 !== listenerWrapper ? targetContainer.addEventListener(domEventName, eventSystemFlags, {
          capture: true,
          passive: listenerWrapper
        }) : targetContainer.addEventListener(domEventName, eventSystemFlags, true) : void 0 !== listenerWrapper ? targetContainer.addEventListener(domEventName, eventSystemFlags, {
          passive: listenerWrapper
        }) : targetContainer.addEventListener(domEventName, eventSystemFlags, false);
      }
      function dispatchEventForPluginEventSystem(domEventName, eventSystemFlags, nativeEvent, targetInst$jscomp$0, targetContainer) {
        var ancestorInst = targetInst$jscomp$0;
        if (0 === (eventSystemFlags & 1) && 0 === (eventSystemFlags & 2) && null !== targetInst$jscomp$0)
          a: for (; ; ) {
            if (null === targetInst$jscomp$0) return;
            var nodeTag = targetInst$jscomp$0.tag;
            if (3 === nodeTag || 4 === nodeTag) {
              var container = targetInst$jscomp$0.stateNode.containerInfo;
              if (container === targetContainer) break;
              if (4 === nodeTag)
                for (nodeTag = targetInst$jscomp$0.return; null !== nodeTag; ) {
                  var grandTag = nodeTag.tag;
                  if ((3 === grandTag || 4 === grandTag) && nodeTag.stateNode.containerInfo === targetContainer)
                    return;
                  nodeTag = nodeTag.return;
                }
              for (; null !== container; ) {
                nodeTag = getClosestInstanceFromNode(container);
                if (null === nodeTag) return;
                grandTag = nodeTag.tag;
                if (5 === grandTag || 6 === grandTag || 26 === grandTag || 27 === grandTag) {
                  targetInst$jscomp$0 = ancestorInst = nodeTag;
                  continue a;
                }
                container = container.parentNode;
              }
            }
            targetInst$jscomp$0 = targetInst$jscomp$0.return;
          }
        batchedUpdates$1(function() {
          var targetInst = ancestorInst, nativeEventTarget = getEventTarget(nativeEvent), dispatchQueue = [];
          a: {
            var reactName = topLevelEventsToReactNames.get(domEventName);
            if (void 0 !== reactName) {
              var SyntheticEventCtor = SyntheticEvent, reactEventType = domEventName;
              switch (domEventName) {
                case "keypress":
                  if (0 === getEventCharCode(nativeEvent)) break a;
                case "keydown":
                case "keyup":
                  SyntheticEventCtor = SyntheticKeyboardEvent;
                  break;
                case "focusin":
                  reactEventType = "focus";
                  SyntheticEventCtor = SyntheticFocusEvent;
                  break;
                case "focusout":
                  reactEventType = "blur";
                  SyntheticEventCtor = SyntheticFocusEvent;
                  break;
                case "beforeblur":
                case "afterblur":
                  SyntheticEventCtor = SyntheticFocusEvent;
                  break;
                case "click":
                  if (2 === nativeEvent.button) break a;
                case "auxclick":
                case "dblclick":
                case "mousedown":
                case "mousemove":
                case "mouseup":
                case "mouseout":
                case "mouseover":
                case "contextmenu":
                  SyntheticEventCtor = SyntheticMouseEvent;
                  break;
                case "drag":
                case "dragend":
                case "dragenter":
                case "dragexit":
                case "dragleave":
                case "dragover":
                case "dragstart":
                case "drop":
                  SyntheticEventCtor = SyntheticDragEvent;
                  break;
                case "touchcancel":
                case "touchend":
                case "touchmove":
                case "touchstart":
                  SyntheticEventCtor = SyntheticTouchEvent;
                  break;
                case ANIMATION_END:
                case ANIMATION_ITERATION:
                case ANIMATION_START:
                  SyntheticEventCtor = SyntheticAnimationEvent;
                  break;
                case TRANSITION_END:
                  SyntheticEventCtor = SyntheticTransitionEvent;
                  break;
                case "scroll":
                case "scrollend":
                  SyntheticEventCtor = SyntheticUIEvent;
                  break;
                case "wheel":
                  SyntheticEventCtor = SyntheticWheelEvent;
                  break;
                case "copy":
                case "cut":
                case "paste":
                  SyntheticEventCtor = SyntheticClipboardEvent;
                  break;
                case "gotpointercapture":
                case "lostpointercapture":
                case "pointercancel":
                case "pointerdown":
                case "pointermove":
                case "pointerout":
                case "pointerover":
                case "pointerup":
                  SyntheticEventCtor = SyntheticPointerEvent;
                  break;
                case "submit":
                  SyntheticEventCtor = SyntheticSubmitEvent;
                  break;
                case "toggle":
                case "beforetoggle":
                  SyntheticEventCtor = SyntheticToggleEvent;
              }
              var inCapturePhase = 0 !== (eventSystemFlags & 4), accumulateTargetOnly = !inCapturePhase && ("scroll" === domEventName || "scrollend" === domEventName), reactEventName = inCapturePhase ? null !== reactName ? reactName + "Capture" : null : reactName;
              inCapturePhase = [];
              for (var instance = targetInst, lastHostComponent; null !== instance; ) {
                var _instance = instance;
                lastHostComponent = _instance.stateNode;
                _instance = _instance.tag;
                5 !== _instance && 26 !== _instance && 27 !== _instance || null === lastHostComponent || null === reactEventName || (_instance = getListener(instance, reactEventName), null != _instance && inCapturePhase.push(
                  createDispatchListener(instance, _instance, lastHostComponent)
                ));
                if (accumulateTargetOnly) break;
                instance = instance.return;
              }
              0 < inCapturePhase.length && (reactName = new SyntheticEventCtor(
                reactName,
                reactEventType,
                null,
                nativeEvent,
                nativeEventTarget
              ), dispatchQueue.push({ event: reactName, listeners: inCapturePhase }));
            }
          }
          if (0 === (eventSystemFlags & 7)) {
            a: {
              SyntheticEventCtor = "mouseover" === domEventName || "pointerover" === domEventName;
              reactName = "mouseout" === domEventName || "pointerout" === domEventName;
              if (SyntheticEventCtor && nativeEvent !== currentReplayingEvent && (reactEventType = nativeEvent.relatedTarget || nativeEvent.fromElement) && (getClosestInstanceFromNode(reactEventType) || reactEventType[internalContainerInstanceKey]))
                break a;
              if (reactName || SyntheticEventCtor) {
                reactEventType = nativeEventTarget.window === nativeEventTarget ? nativeEventTarget : (SyntheticEventCtor = nativeEventTarget.ownerDocument) ? SyntheticEventCtor.defaultView || SyntheticEventCtor.parentWindow : window;
                if (reactName) {
                  if (SyntheticEventCtor = nativeEvent.relatedTarget || nativeEvent.toElement, reactName = targetInst, SyntheticEventCtor = SyntheticEventCtor ? getClosestInstanceFromNode(SyntheticEventCtor) : null, null !== SyntheticEventCtor && (accumulateTargetOnly = getNearestMountedFiber(SyntheticEventCtor), inCapturePhase = SyntheticEventCtor.tag, SyntheticEventCtor !== accumulateTargetOnly || 5 !== inCapturePhase && 27 !== inCapturePhase && 6 !== inCapturePhase))
                    SyntheticEventCtor = null;
                } else reactName = null, SyntheticEventCtor = targetInst;
                if (reactName !== SyntheticEventCtor) {
                  inCapturePhase = SyntheticMouseEvent;
                  _instance = "onMouseLeave";
                  reactEventName = "onMouseEnter";
                  instance = "mouse";
                  if ("pointerout" === domEventName || "pointerover" === domEventName)
                    inCapturePhase = SyntheticPointerEvent, _instance = "onPointerLeave", reactEventName = "onPointerEnter", instance = "pointer";
                  accumulateTargetOnly = null == reactName ? reactEventType : getNodeFromInstance(reactName);
                  lastHostComponent = null == SyntheticEventCtor ? reactEventType : getNodeFromInstance(SyntheticEventCtor);
                  reactEventType = new inCapturePhase(
                    _instance,
                    instance + "leave",
                    reactName,
                    nativeEvent,
                    nativeEventTarget
                  );
                  reactEventType.target = accumulateTargetOnly;
                  reactEventType.relatedTarget = lastHostComponent;
                  _instance = null;
                  getClosestInstanceFromNode(nativeEventTarget) === targetInst && (inCapturePhase = new inCapturePhase(
                    reactEventName,
                    instance + "enter",
                    SyntheticEventCtor,
                    nativeEvent,
                    nativeEventTarget
                  ), inCapturePhase.target = lastHostComponent, inCapturePhase.relatedTarget = accumulateTargetOnly, _instance = inCapturePhase);
                  accumulateTargetOnly = _instance;
                  inCapturePhase = reactName && SyntheticEventCtor ? getLowestCommonAncestor(
                    reactName,
                    SyntheticEventCtor,
                    getParent
                  ) : null;
                  null !== reactName && accumulateEnterLeaveListenersForEvent(
                    dispatchQueue,
                    reactEventType,
                    reactName,
                    inCapturePhase,
                    false
                  );
                  null !== SyntheticEventCtor && null !== accumulateTargetOnly && accumulateEnterLeaveListenersForEvent(
                    dispatchQueue,
                    accumulateTargetOnly,
                    SyntheticEventCtor,
                    inCapturePhase,
                    true
                  );
                }
              }
            }
            a: {
              reactName = targetInst ? getNodeFromInstance(targetInst) : window;
              SyntheticEventCtor = reactName.nodeName && reactName.nodeName.toLowerCase();
              if ("select" === SyntheticEventCtor || "input" === SyntheticEventCtor && "file" === reactName.type)
                var getTargetInstFunc = getTargetInstForChangeEvent;
              else if (isTextInputElement(reactName))
                if (isInputEventSupported)
                  getTargetInstFunc = getTargetInstForInputOrChangeEvent;
                else {
                  getTargetInstFunc = getTargetInstForInputEventPolyfill;
                  var handleEventFunc = handleEventsForInputEventPolyfill;
                }
              else
                SyntheticEventCtor = reactName.nodeName, !SyntheticEventCtor || "input" !== SyntheticEventCtor.toLowerCase() || "checkbox" !== reactName.type && "radio" !== reactName.type ? targetInst && isCustomElement(targetInst.elementType) && (getTargetInstFunc = getTargetInstForChangeEvent) : getTargetInstFunc = getTargetInstForClickEvent;
              if (getTargetInstFunc && (getTargetInstFunc = getTargetInstFunc(domEventName, targetInst))) {
                createAndAccumulateChangeEvent(
                  dispatchQueue,
                  getTargetInstFunc,
                  nativeEvent,
                  nativeEventTarget
                );
                break a;
              }
              handleEventFunc && handleEventFunc(domEventName, reactName, targetInst);
            }
            handleEventFunc = targetInst ? getNodeFromInstance(targetInst) : window;
            switch (domEventName) {
              case "focusin":
                if (isTextInputElement(handleEventFunc) || "true" === handleEventFunc.contentEditable)
                  activeElement = handleEventFunc, activeElementInst = targetInst, lastSelection = null;
                break;
              case "focusout":
                lastSelection = activeElementInst = activeElement = null;
                break;
              case "mousedown":
                mouseDown = true;
                break;
              case "contextmenu":
              case "mouseup":
              case "dragend":
                mouseDown = false;
                constructSelectEvent(dispatchQueue, nativeEvent, nativeEventTarget);
                break;
              case "selectionchange":
                if (skipSelectionChangeEvent) break;
              case "keydown":
              case "keyup":
                constructSelectEvent(dispatchQueue, nativeEvent, nativeEventTarget);
            }
            var fallbackData;
            if (canUseCompositionEvent)
              b: {
                switch (domEventName) {
                  case "compositionstart":
                    var eventType = "onCompositionStart";
                    break b;
                  case "compositionend":
                    eventType = "onCompositionEnd";
                    break b;
                  case "compositionupdate":
                    eventType = "onCompositionUpdate";
                    break b;
                }
                eventType = void 0;
              }
            else
              isComposing ? isFallbackCompositionEnd(domEventName, nativeEvent) && (eventType = "onCompositionEnd") : "keydown" === domEventName && 229 === nativeEvent.keyCode && (eventType = "onCompositionStart");
            eventType && (useFallbackCompositionData && "ko" !== nativeEvent.locale && (isComposing || "onCompositionStart" !== eventType ? "onCompositionEnd" === eventType && isComposing && (fallbackData = getData()) : (root = nativeEventTarget, startText = "value" in root ? root.value : root.textContent, isComposing = true)), handleEventFunc = accumulateTwoPhaseListeners(targetInst, eventType), 0 < handleEventFunc.length && (eventType = new SyntheticCompositionEvent(
              eventType,
              domEventName,
              null,
              nativeEvent,
              nativeEventTarget
            ), dispatchQueue.push({ event: eventType, listeners: handleEventFunc }), fallbackData ? eventType.data = fallbackData : (fallbackData = getDataFromCustomEvent(nativeEvent), null !== fallbackData && (eventType.data = fallbackData))));
            if (fallbackData = canUseTextInputEvent ? getNativeBeforeInputChars(domEventName, nativeEvent) : getFallbackBeforeInputChars(domEventName, nativeEvent))
              eventType = accumulateTwoPhaseListeners(targetInst, "onBeforeInput"), 0 < eventType.length && (handleEventFunc = new SyntheticCompositionEvent(
                "onBeforeInput",
                "beforeinput",
                null,
                nativeEvent,
                nativeEventTarget
              ), dispatchQueue.push({
                event: handleEventFunc,
                listeners: eventType
              }), handleEventFunc.data = fallbackData);
            extractEvents$1(
              dispatchQueue,
              domEventName,
              targetInst,
              nativeEvent,
              nativeEventTarget
            );
          }
          processDispatchQueue(dispatchQueue, eventSystemFlags);
        });
      }
      function createDispatchListener(instance, listener, currentTarget) {
        return {
          instance,
          listener,
          currentTarget
        };
      }
      function accumulateTwoPhaseListeners(targetFiber, reactName) {
        for (var captureName = reactName + "Capture", listeners = []; null !== targetFiber; ) {
          var _instance2 = targetFiber, stateNode = _instance2.stateNode;
          _instance2 = _instance2.tag;
          5 !== _instance2 && 26 !== _instance2 && 27 !== _instance2 || null === stateNode || (_instance2 = getListener(targetFiber, captureName), null != _instance2 && listeners.unshift(
            createDispatchListener(targetFiber, _instance2, stateNode)
          ), _instance2 = getListener(targetFiber, reactName), null != _instance2 && listeners.push(
            createDispatchListener(targetFiber, _instance2, stateNode)
          ));
          if (3 === targetFiber.tag) return listeners;
          targetFiber = targetFiber.return;
        }
        return [];
      }
      function getParent(inst) {
        if (null === inst) return null;
        do
          inst = inst.return;
        while (inst && 5 !== inst.tag && 27 !== inst.tag);
        return inst ? inst : null;
      }
      function accumulateEnterLeaveListenersForEvent(dispatchQueue, event, target, common, inCapturePhase) {
        for (var registrationName = event._reactName, listeners = []; null !== target && target !== common; ) {
          var _instance3 = target, alternate = _instance3.alternate, stateNode = _instance3.stateNode;
          _instance3 = _instance3.tag;
          if (null !== alternate && alternate === common) break;
          5 !== _instance3 && 26 !== _instance3 && 27 !== _instance3 || null === stateNode || (alternate = stateNode, inCapturePhase ? (stateNode = getListener(target, registrationName), null != stateNode && listeners.unshift(
            createDispatchListener(target, stateNode, alternate)
          )) : inCapturePhase || (stateNode = getListener(target, registrationName), null != stateNode && listeners.push(
            createDispatchListener(target, stateNode, alternate)
          )));
          target = target.return;
        }
        0 !== listeners.length && dispatchQueue.push({ event, listeners });
      }
      var NORMALIZE_NEWLINES_REGEX = /\r\n?/g;
      var NORMALIZE_NULL_AND_REPLACEMENT_REGEX = /\u0000|\uFFFD/g;
      function normalizeMarkupForTextOrAttribute(markup) {
        return ("string" === typeof markup ? markup : "" + markup).replace(NORMALIZE_NEWLINES_REGEX, "\n").replace(NORMALIZE_NULL_AND_REPLACEMENT_REGEX, "");
      }
      function checkForUnmatchedText(serverText, clientText) {
        clientText = normalizeMarkupForTextOrAttribute(clientText);
        return normalizeMarkupForTextOrAttribute(serverText) === clientText ? true : false;
      }
      function setProp(domElement, tag, key, value, props, prevValue) {
        switch (key) {
          case "children":
            if ("string" === typeof value)
              "body" === tag || "textarea" === tag && "" === value || setTextContent(domElement, value);
            else if ("number" === typeof value || "bigint" === typeof value)
              "body" !== tag && setTextContent(domElement, "" + value);
            else return;
            break;
          case "className":
            setValueForKnownAttribute(domElement, "class", value);
            break;
          case "tabIndex":
            setValueForKnownAttribute(domElement, "tabindex", value);
            break;
          case "dir":
          case "role":
          case "viewBox":
          case "width":
          case "height":
            setValueForKnownAttribute(domElement, key, value);
            break;
          case "style":
            setValueForStyles(domElement, value, prevValue);
            return;
          case "data":
            if ("object" !== tag) {
              setValueForKnownAttribute(domElement, "data", value);
              break;
            }
          case "src":
          case "href":
            if ("" === value && ("a" !== tag || "href" !== key)) {
              domElement.removeAttribute(key);
              break;
            }
            if (null == value || "function" === typeof value || "symbol" === typeof value || "boolean" === typeof value) {
              domElement.removeAttribute(key);
              break;
            }
            value = sanitizeURL(value);
            domElement.setAttribute(key, value);
            break;
          case "action":
          case "formAction":
            if ("function" === typeof value) {
              domElement.setAttribute(
                key,
                "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
              );
              break;
            } else
              "function" === typeof prevValue && ("formAction" === key ? ("input" !== tag && setProp(domElement, tag, "name", props.name, props, null), setProp(
                domElement,
                tag,
                "formEncType",
                props.formEncType,
                props,
                null
              ), setProp(
                domElement,
                tag,
                "formMethod",
                props.formMethod,
                props,
                null
              ), setProp(
                domElement,
                tag,
                "formTarget",
                props.formTarget,
                props,
                null
              )) : (setProp(domElement, tag, "encType", props.encType, props, null), setProp(domElement, tag, "method", props.method, props, null), setProp(domElement, tag, "target", props.target, props, null)));
            if (null == value || "symbol" === typeof value || "boolean" === typeof value) {
              domElement.removeAttribute(key);
              break;
            }
            value = sanitizeURL(value);
            domElement.setAttribute(key, value);
            break;
          case "onClick":
            null != value && (domElement.onclick = noop$1);
            return;
          case "onScroll":
            null != value && listenToNonDelegatedEvent("scroll", domElement);
            return;
          case "onScrollEnd":
            null != value && listenToNonDelegatedEvent("scrollend", domElement);
            return;
          case "dangerouslySetInnerHTML":
            if (null != value) {
              if ("object" !== typeof value || !("__html" in value))
                throw Error(formatProdErrorMessage(61));
              key = value.__html;
              if (null != key) {
                if (null != props.children) throw Error(formatProdErrorMessage(60));
                (null != prevValue ? prevValue.__html : void 0) !== key && (domElement.innerHTML = key);
              }
            }
            break;
          case "multiple":
            domElement.multiple = value && "function" !== typeof value && "symbol" !== typeof value;
            break;
          case "muted":
            domElement.muted = value && "function" !== typeof value && "symbol" !== typeof value;
            break;
          case "suppressContentEditableWarning":
          case "suppressHydrationWarning":
          case "defaultValue":
          case "defaultChecked":
          case "innerHTML":
          case "ref":
            break;
          case "autoFocus":
            break;
          case "xlinkHref":
            if (null == value || "function" === typeof value || "boolean" === typeof value || "symbol" === typeof value) {
              domElement.removeAttribute("xlink:href");
              break;
            }
            key = sanitizeURL(value);
            domElement.setAttributeNS(
              "http://www.w3.org/1999/xlink",
              "xlink:href",
              key
            );
            break;
          case "contentEditable":
          case "spellCheck":
          case "draggable":
          case "value":
          case "autoReverse":
          case "externalResourcesRequired":
          case "focusable":
          case "preserveAlpha":
            null != value && "function" !== typeof value && "symbol" !== typeof value ? domElement.setAttribute(key, value) : domElement.removeAttribute(key);
            break;
          case "inert":
          case "allowFullScreen":
          case "async":
          case "autoPlay":
          case "controls":
          case "credentialless":
          case "default":
          case "defer":
          case "disabled":
          case "disablePictureInPicture":
          case "disableRemotePlayback":
          case "formNoValidate":
          case "hidden":
          case "loop":
          case "noModule":
          case "noValidate":
          case "open":
          case "playsInline":
          case "readOnly":
          case "required":
          case "reversed":
          case "scoped":
          case "seamless":
          case "itemScope":
            value && "function" !== typeof value && "symbol" !== typeof value ? domElement.setAttribute(key, "") : domElement.removeAttribute(key);
            break;
          case "capture":
          case "download":
            true === value ? domElement.setAttribute(key, "") : false !== value && null != value && "function" !== typeof value && "symbol" !== typeof value ? domElement.setAttribute(key, value) : domElement.removeAttribute(key);
            break;
          case "cols":
          case "rows":
          case "size":
          case "span":
            null != value && "function" !== typeof value && "symbol" !== typeof value && !isNaN(value) && 1 <= value ? domElement.setAttribute(key, value) : domElement.removeAttribute(key);
            break;
          case "rowSpan":
          case "start":
            null == value || "function" === typeof value || "symbol" === typeof value || isNaN(value) ? domElement.removeAttribute(key) : domElement.setAttribute(key, value);
            break;
          case "popover":
            listenToNonDelegatedEvent("beforetoggle", domElement);
            listenToNonDelegatedEvent("toggle", domElement);
            setValueForAttribute(domElement, "popover", value);
            break;
          case "xlinkActuate":
            setValueForNamespacedAttribute(
              domElement,
              "http://www.w3.org/1999/xlink",
              "xlink:actuate",
              value
            );
            break;
          case "xlinkArcrole":
            setValueForNamespacedAttribute(
              domElement,
              "http://www.w3.org/1999/xlink",
              "xlink:arcrole",
              value
            );
            break;
          case "xlinkRole":
            setValueForNamespacedAttribute(
              domElement,
              "http://www.w3.org/1999/xlink",
              "xlink:role",
              value
            );
            break;
          case "xlinkShow":
            setValueForNamespacedAttribute(
              domElement,
              "http://www.w3.org/1999/xlink",
              "xlink:show",
              value
            );
            break;
          case "xlinkTitle":
            setValueForNamespacedAttribute(
              domElement,
              "http://www.w3.org/1999/xlink",
              "xlink:title",
              value
            );
            break;
          case "xlinkType":
            setValueForNamespacedAttribute(
              domElement,
              "http://www.w3.org/1999/xlink",
              "xlink:type",
              value
            );
            break;
          case "xmlBase":
            setValueForNamespacedAttribute(
              domElement,
              "http://www.w3.org/XML/1998/namespace",
              "xml:base",
              value
            );
            break;
          case "xmlLang":
            setValueForNamespacedAttribute(
              domElement,
              "http://www.w3.org/XML/1998/namespace",
              "xml:lang",
              value
            );
            break;
          case "xmlSpace":
            setValueForNamespacedAttribute(
              domElement,
              "http://www.w3.org/XML/1998/namespace",
              "xml:space",
              value
            );
            break;
          case "is":
            setValueForAttribute(domElement, "is", value);
            break;
          case "innerText":
          case "textContent":
            return;
          default:
            if (!(2 < key.length) || "o" !== key[0] && "O" !== key[0] || "n" !== key[1] && "N" !== key[1])
              key = aliases.get(key) || key, setValueForAttribute(domElement, key, value);
            else return;
        }
        viewTransitionMutationContext = true;
      }
      function setPropOnCustomElement(domElement, tag, key, value, props, prevValue) {
        switch (key) {
          case "style":
            setValueForStyles(domElement, value, prevValue);
            return;
          case "dangerouslySetInnerHTML":
            if (null != value) {
              if ("object" !== typeof value || !("__html" in value))
                throw Error(formatProdErrorMessage(61));
              key = value.__html;
              if (null != key) {
                if (null != props.children) throw Error(formatProdErrorMessage(60));
                (null != prevValue ? prevValue.__html : void 0) !== key && (domElement.innerHTML = key);
              }
            }
            break;
          case "children":
            if ("string" === typeof value) setTextContent(domElement, value);
            else if ("number" === typeof value || "bigint" === typeof value)
              setTextContent(domElement, "" + value);
            else return;
            break;
          case "onScroll":
            null != value && listenToNonDelegatedEvent("scroll", domElement);
            return;
          case "onScrollEnd":
            null != value && listenToNonDelegatedEvent("scrollend", domElement);
            return;
          case "onClick":
            null != value && (domElement.onclick = noop$1);
            return;
          case "suppressContentEditableWarning":
          case "suppressHydrationWarning":
          case "innerHTML":
          case "ref":
            return;
          case "innerText":
          case "textContent":
            return;
          default:
            if (!registrationNameDependencies.hasOwnProperty(key))
              a: {
                if ("o" === key[0] && "n" === key[1] && (props = key.endsWith("Capture"), prevValue = key.slice(2, props ? key.length - 7 : void 0), tag = domElement[internalPropsKey] || null, tag = null != tag ? tag[key] : null, "function" === typeof tag && domElement.removeEventListener(prevValue, tag, props), "function" === typeof value)) {
                  "function" !== typeof tag && null !== tag && (key in domElement ? domElement[key] = null : domElement.hasAttribute(key) && domElement.removeAttribute(key));
                  domElement.addEventListener(prevValue, value, props);
                  break a;
                }
                viewTransitionMutationContext = true;
                key in domElement ? domElement[key] = value : true === value ? domElement.setAttribute(key, "") : setValueForAttribute(domElement, key, value);
              }
            return;
        }
        viewTransitionMutationContext = true;
      }
      function setInitialProperties(domElement, tag, props) {
        switch (tag) {
          case "div":
          case "span":
          case "svg":
          case "path":
          case "a":
          case "g":
          case "p":
          case "li":
            break;
          case "img":
            listenToNonDelegatedEvent("error", domElement);
            listenToNonDelegatedEvent("load", domElement);
            var hasSrc = false, hasSrcSet = false, propKey;
            for (propKey in props)
              if (props.hasOwnProperty(propKey)) {
                var propValue = props[propKey];
                if (null != propValue)
                  switch (propKey) {
                    case "src":
                      hasSrc = true;
                      break;
                    case "srcSet":
                      hasSrcSet = true;
                      break;
                    case "children":
                    case "dangerouslySetInnerHTML":
                      throw Error(formatProdErrorMessage(137, tag));
                    default:
                      setProp(domElement, tag, propKey, propValue, props, null);
                  }
              }
            hasSrcSet && setProp(domElement, tag, "srcSet", props.srcSet, props, null);
            hasSrc && setProp(domElement, tag, "src", props.src, props, null);
            return;
          case "input":
            listenToNonDelegatedEvent("invalid", domElement);
            var defaultValue = propKey = propValue = hasSrcSet = null, checked = null, defaultChecked = null;
            for (hasSrc in props)
              if (props.hasOwnProperty(hasSrc)) {
                var propValue$204 = props[hasSrc];
                if (null != propValue$204)
                  switch (hasSrc) {
                    case "name":
                      hasSrcSet = propValue$204;
                      break;
                    case "type":
                      propValue = propValue$204;
                      break;
                    case "checked":
                      checked = propValue$204;
                      break;
                    case "defaultChecked":
                      defaultChecked = propValue$204;
                      break;
                    case "value":
                      propKey = propValue$204;
                      break;
                    case "defaultValue":
                      defaultValue = propValue$204;
                      break;
                    case "children":
                    case "dangerouslySetInnerHTML":
                      if (null != propValue$204)
                        throw Error(formatProdErrorMessage(137, tag));
                      break;
                    default:
                      setProp(domElement, tag, hasSrc, propValue$204, props, null);
                  }
              }
            initInput(
              domElement,
              propKey,
              defaultValue,
              checked,
              defaultChecked,
              propValue,
              hasSrcSet,
              false
            );
            return;
          case "select":
            listenToNonDelegatedEvent("invalid", domElement);
            hasSrc = propValue = propKey = null;
            for (hasSrcSet in props)
              if (props.hasOwnProperty(hasSrcSet) && (defaultValue = props[hasSrcSet], null != defaultValue))
                switch (hasSrcSet) {
                  case "value":
                    propKey = defaultValue;
                    break;
                  case "defaultValue":
                    propValue = defaultValue;
                    break;
                  case "multiple":
                    hasSrc = defaultValue;
                  default:
                    setProp(domElement, tag, hasSrcSet, defaultValue, props, null);
                }
            tag = propKey;
            props = propValue;
            domElement.multiple = !!hasSrc;
            null != tag ? updateOptions(domElement, !!hasSrc, tag, false) : null != props && updateOptions(domElement, !!hasSrc, props, true);
            return;
          case "textarea":
            listenToNonDelegatedEvent("invalid", domElement);
            propKey = hasSrcSet = hasSrc = null;
            for (propValue in props)
              if (props.hasOwnProperty(propValue) && (defaultValue = props[propValue], null != defaultValue))
                switch (propValue) {
                  case "value":
                    hasSrc = defaultValue;
                    break;
                  case "defaultValue":
                    hasSrcSet = defaultValue;
                    break;
                  case "children":
                    propKey = defaultValue;
                    break;
                  case "dangerouslySetInnerHTML":
                    if (null != defaultValue) throw Error(formatProdErrorMessage(91));
                    break;
                  default:
                    setProp(domElement, tag, propValue, defaultValue, props, null);
                }
            initTextarea(domElement, hasSrc, hasSrcSet, propKey);
            return;
          case "option":
            for (checked in props)
              if (props.hasOwnProperty(checked) && (hasSrc = props[checked], null != hasSrc))
                switch (checked) {
                  case "selected":
                    domElement.selected = hasSrc && "function" !== typeof hasSrc && "symbol" !== typeof hasSrc;
                    break;
                  default:
                    setProp(domElement, tag, checked, hasSrc, props, null);
                }
            return;
          case "dialog":
            listenToNonDelegatedEvent("beforetoggle", domElement);
            listenToNonDelegatedEvent("toggle", domElement);
            listenToNonDelegatedEvent("cancel", domElement);
            listenToNonDelegatedEvent("close", domElement);
            break;
          case "iframe":
          case "object":
            listenToNonDelegatedEvent("load", domElement);
            break;
          case "video":
          case "audio":
            for (hasSrc = 0; hasSrc < mediaEventTypes.length; hasSrc++)
              listenToNonDelegatedEvent(mediaEventTypes[hasSrc], domElement);
            break;
          case "image":
            listenToNonDelegatedEvent("error", domElement);
            listenToNonDelegatedEvent("load", domElement);
            break;
          case "details":
            listenToNonDelegatedEvent("toggle", domElement);
            break;
          case "embed":
          case "source":
          case "link":
            listenToNonDelegatedEvent("error", domElement), listenToNonDelegatedEvent("load", domElement);
          case "area":
          case "base":
          case "br":
          case "col":
          case "hr":
          case "keygen":
          case "meta":
          case "param":
          case "track":
          case "wbr":
          case "menuitem":
            for (defaultChecked in props)
              if (props.hasOwnProperty(defaultChecked) && (hasSrc = props[defaultChecked], null != hasSrc))
                switch (defaultChecked) {
                  case "children":
                  case "dangerouslySetInnerHTML":
                    throw Error(formatProdErrorMessage(137, tag));
                  default:
                    setProp(domElement, tag, defaultChecked, hasSrc, props, null);
                }
            return;
          default:
            if (isCustomElement(tag)) {
              for (propValue$204 in props)
                props.hasOwnProperty(propValue$204) && (hasSrc = props[propValue$204], void 0 !== hasSrc && setPropOnCustomElement(
                  domElement,
                  tag,
                  propValue$204,
                  hasSrc,
                  props,
                  void 0
                ));
              return;
            }
        }
        for (defaultValue in props)
          props.hasOwnProperty(defaultValue) && (hasSrc = props[defaultValue], null != hasSrc && setProp(domElement, tag, defaultValue, hasSrc, props, null));
      }
      var emptyProps = {};
      function updateProperties(domElement, tag, lastProps, nextProps) {
        switch (tag) {
          case "div":
          case "span":
          case "svg":
          case "path":
          case "a":
          case "g":
          case "p":
          case "li":
            break;
          case "input":
            var name = null, type = null, value = null, defaultValue = null, lastDefaultValue = null, checked = null, defaultChecked = null;
            for (propKey in lastProps) {
              var lastProp = lastProps[propKey];
              if (lastProps.hasOwnProperty(propKey) && null != lastProp)
                switch (propKey) {
                  case "checked":
                    break;
                  case "value":
                    break;
                  case "defaultValue":
                    lastDefaultValue = lastProp;
                  default:
                    nextProps.hasOwnProperty(propKey) || setProp(domElement, tag, propKey, null, nextProps, lastProp);
                }
            }
            for (var propKey$221 in nextProps) {
              var propKey = nextProps[propKey$221];
              lastProp = lastProps[propKey$221];
              if (nextProps.hasOwnProperty(propKey$221) && (null != propKey || null != lastProp))
                switch (propKey$221) {
                  case "type":
                    propKey !== lastProp && (viewTransitionMutationContext = true);
                    type = propKey;
                    break;
                  case "name":
                    propKey !== lastProp && (viewTransitionMutationContext = true);
                    name = propKey;
                    break;
                  case "checked":
                    propKey !== lastProp && (viewTransitionMutationContext = true);
                    checked = propKey;
                    break;
                  case "defaultChecked":
                    propKey !== lastProp && (viewTransitionMutationContext = true);
                    defaultChecked = propKey;
                    break;
                  case "value":
                    propKey !== lastProp && (viewTransitionMutationContext = true);
                    value = propKey;
                    break;
                  case "defaultValue":
                    propKey !== lastProp && (viewTransitionMutationContext = true);
                    defaultValue = propKey;
                    break;
                  case "children":
                  case "dangerouslySetInnerHTML":
                    if (null != propKey)
                      throw Error(formatProdErrorMessage(137, tag));
                    break;
                  default:
                    propKey !== lastProp && setProp(
                      domElement,
                      tag,
                      propKey$221,
                      propKey,
                      nextProps,
                      lastProp
                    );
                }
            }
            updateInput(
              domElement,
              value,
              defaultValue,
              lastDefaultValue,
              checked,
              defaultChecked,
              type,
              name
            );
            return;
          case "select":
            propKey = value = defaultValue = propKey$221 = null;
            for (type in lastProps)
              if (lastDefaultValue = lastProps[type], lastProps.hasOwnProperty(type) && null != lastDefaultValue)
                switch (type) {
                  case "value":
                    break;
                  case "multiple":
                    propKey = lastDefaultValue;
                  default:
                    nextProps.hasOwnProperty(type) || setProp(
                      domElement,
                      tag,
                      type,
                      null,
                      nextProps,
                      lastDefaultValue
                    );
                }
            for (name in nextProps)
              if (type = nextProps[name], lastDefaultValue = lastProps[name], nextProps.hasOwnProperty(name) && (null != type || null != lastDefaultValue))
                switch (name) {
                  case "value":
                    type !== lastDefaultValue && (viewTransitionMutationContext = true);
                    propKey$221 = type;
                    break;
                  case "defaultValue":
                    type !== lastDefaultValue && (viewTransitionMutationContext = true);
                    defaultValue = type;
                    break;
                  case "multiple":
                    type !== lastDefaultValue && (viewTransitionMutationContext = true), value = type;
                  default:
                    type !== lastDefaultValue && setProp(
                      domElement,
                      tag,
                      name,
                      type,
                      nextProps,
                      lastDefaultValue
                    );
                }
            tag = defaultValue;
            lastProps = value;
            nextProps = propKey;
            null != propKey$221 ? updateOptions(domElement, !!lastProps, propKey$221, false) : !!nextProps !== !!lastProps && (null != tag ? updateOptions(domElement, !!lastProps, tag, true) : updateOptions(domElement, !!lastProps, lastProps ? [] : "", false));
            return;
          case "textarea":
            propKey = propKey$221 = null;
            for (defaultValue in lastProps)
              if (name = lastProps[defaultValue], lastProps.hasOwnProperty(defaultValue) && null != name && !nextProps.hasOwnProperty(defaultValue))
                switch (defaultValue) {
                  case "value":
                    break;
                  case "children":
                    break;
                  default:
                    setProp(domElement, tag, defaultValue, null, nextProps, name);
                }
            for (value in nextProps)
              if (name = nextProps[value], type = lastProps[value], nextProps.hasOwnProperty(value) && (null != name || null != type))
                switch (value) {
                  case "value":
                    name !== type && (viewTransitionMutationContext = true);
                    propKey$221 = name;
                    break;
                  case "defaultValue":
                    name !== type && (viewTransitionMutationContext = true);
                    propKey = name;
                    break;
                  case "children":
                    break;
                  case "dangerouslySetInnerHTML":
                    if (null != name) throw Error(formatProdErrorMessage(91));
                    break;
                  default:
                    name !== type && setProp(domElement, tag, value, name, nextProps, type);
                }
            updateTextarea(domElement, propKey$221, propKey);
            return;
          case "option":
            for (var propKey$237 in lastProps)
              if (propKey$221 = lastProps[propKey$237], lastProps.hasOwnProperty(propKey$237) && null != propKey$221 && !nextProps.hasOwnProperty(propKey$237))
                switch (propKey$237) {
                  case "selected":
                    domElement.selected = false;
                    break;
                  default:
                    setProp(
                      domElement,
                      tag,
                      propKey$237,
                      null,
                      nextProps,
                      propKey$221
                    );
                }
            for (lastDefaultValue in nextProps)
              if (propKey$221 = nextProps[lastDefaultValue], propKey = lastProps[lastDefaultValue], nextProps.hasOwnProperty(lastDefaultValue) && propKey$221 !== propKey && (null != propKey$221 || null != propKey))
                switch (lastDefaultValue) {
                  case "selected":
                    propKey$221 !== propKey && (viewTransitionMutationContext = true);
                    domElement.selected = propKey$221 && "function" !== typeof propKey$221 && "symbol" !== typeof propKey$221;
                    break;
                  default:
                    setProp(
                      domElement,
                      tag,
                      lastDefaultValue,
                      propKey$221,
                      nextProps,
                      propKey
                    );
                }
            return;
          case "img":
          case "link":
          case "area":
          case "base":
          case "br":
          case "col":
          case "embed":
          case "hr":
          case "keygen":
          case "meta":
          case "param":
          case "source":
          case "track":
          case "wbr":
          case "menuitem":
            for (var propKey$242 in lastProps)
              propKey$221 = lastProps[propKey$242], lastProps.hasOwnProperty(propKey$242) && null != propKey$221 && !nextProps.hasOwnProperty(propKey$242) && setProp(domElement, tag, propKey$242, null, nextProps, propKey$221);
            for (checked in nextProps)
              if (propKey$221 = nextProps[checked], propKey = lastProps[checked], nextProps.hasOwnProperty(checked) && propKey$221 !== propKey && (null != propKey$221 || null != propKey))
                switch (checked) {
                  case "children":
                  case "dangerouslySetInnerHTML":
                    if (null != propKey$221)
                      throw Error(formatProdErrorMessage(137, tag));
                    break;
                  default:
                    setProp(
                      domElement,
                      tag,
                      checked,
                      propKey$221,
                      nextProps,
                      propKey
                    );
                }
            return;
          default:
            if (isCustomElement(tag)) {
              for (var propKey$247 in lastProps)
                propKey$221 = lastProps[propKey$247], lastProps.hasOwnProperty(propKey$247) && void 0 !== propKey$221 && !nextProps.hasOwnProperty(propKey$247) && setPropOnCustomElement(
                  domElement,
                  tag,
                  propKey$247,
                  void 0,
                  nextProps,
                  propKey$221
                );
              for (defaultChecked in nextProps)
                propKey$221 = nextProps[defaultChecked], propKey = lastProps[defaultChecked], !nextProps.hasOwnProperty(defaultChecked) || propKey$221 === propKey || void 0 === propKey$221 && void 0 === propKey || setPropOnCustomElement(
                  domElement,
                  tag,
                  defaultChecked,
                  propKey$221,
                  nextProps,
                  propKey
                );
              return;
            }
        }
        for (var propKey$252 in lastProps)
          propKey$221 = lastProps[propKey$252], lastProps.hasOwnProperty(propKey$252) && null != propKey$221 && !nextProps.hasOwnProperty(propKey$252) && setProp(domElement, tag, propKey$252, null, nextProps, propKey$221);
        for (lastProp in nextProps)
          propKey$221 = nextProps[lastProp], propKey = lastProps[lastProp], !nextProps.hasOwnProperty(lastProp) || propKey$221 === propKey || null == propKey$221 && null == propKey || setProp(domElement, tag, lastProp, propKey$221, nextProps, propKey);
      }
      function isLikelyStaticResource(initiatorType) {
        switch (initiatorType) {
          case "css":
          case "script":
          case "font":
          case "img":
          case "image":
          case "input":
          case "link":
            return true;
          default:
            return false;
        }
      }
      function estimateBandwidth() {
        if ("function" === typeof performance.getEntriesByType) {
          for (var count = 0, bits = 0, resourceEntries = performance.getEntriesByType("resource"), i = 0; i < resourceEntries.length; i++) {
            var entry = resourceEntries[i], transferSize = entry.transferSize, initiatorType = entry.initiatorType, duration = entry.duration;
            if (transferSize && duration && isLikelyStaticResource(initiatorType)) {
              initiatorType = 0;
              duration = entry.responseEnd;
              for (i += 1; i < resourceEntries.length; i++) {
                var overlapEntry = resourceEntries[i], overlapStartTime = overlapEntry.startTime;
                if (overlapStartTime > duration) break;
                var overlapTransferSize = overlapEntry.transferSize, overlapInitiatorType = overlapEntry.initiatorType;
                overlapTransferSize && isLikelyStaticResource(overlapInitiatorType) && (overlapEntry = overlapEntry.responseEnd, initiatorType += overlapTransferSize * (overlapEntry < duration ? 1 : (duration - overlapStartTime) / (overlapEntry - overlapStartTime)));
              }
              --i;
              bits += 8 * (transferSize + initiatorType) / (entry.duration / 1e3);
              count++;
              if (10 < count) break;
            }
          }
          if (0 < count) return bits / count / 1e6;
        }
        return navigator.connection && (count = navigator.connection.downlink, "number" === typeof count) ? count : 5;
      }
      var eventsEnabled = null;
      var selectionInformation = null;
      function getOwnerDocumentFromRootContainer(rootContainerElement) {
        return 9 === rootContainerElement.nodeType ? rootContainerElement : rootContainerElement.ownerDocument;
      }
      function getOwnHostContext(namespaceURI) {
        switch (namespaceURI) {
          case "http://www.w3.org/2000/svg":
            return 1;
          case "http://www.w3.org/1998/Math/MathML":
            return 2;
          default:
            return 0;
        }
      }
      function getChildHostContextProd(parentNamespace, type) {
        if (0 === parentNamespace)
          switch (type) {
            case "svg":
              return 1;
            case "math":
              return 2;
            default:
              return 0;
          }
        return 1 === parentNamespace && "foreignObject" === type ? 0 : parentNamespace;
      }
      function createHoistableInstance(type, props, rootContainerInstance, internalInstanceHandle) {
        rootContainerInstance = getOwnerDocumentFromRootContainer(
          rootContainerInstance
        ).createElement(type);
        rootContainerInstance[internalInstanceKey] = internalInstanceHandle;
        rootContainerInstance[internalPropsKey] = props;
        setInitialProperties(rootContainerInstance, type, props);
        markNodeAsHoistable(rootContainerInstance);
        return rootContainerInstance;
      }
      function shouldSetTextContent(type, props) {
        return "textarea" === type || "noscript" === type || "string" === typeof props.children || "number" === typeof props.children || "bigint" === typeof props.children || "object" === typeof props.dangerouslySetInnerHTML && null !== props.dangerouslySetInnerHTML && null != props.dangerouslySetInnerHTML.__html;
      }
      var currentPopstateTransitionEvent = null;
      function shouldAttemptEagerTransition() {
        var event = window.event;
        if (event && "popstate" === event.type) {
          if (event === currentPopstateTransitionEvent) return false;
          currentPopstateTransitionEvent = event;
          return true;
        }
        currentPopstateTransitionEvent = null;
        return false;
      }
      var scheduleTimeout = "function" === typeof setTimeout ? setTimeout : void 0;
      var cancelTimeout = "function" === typeof clearTimeout ? clearTimeout : void 0;
      var localPromise = "function" === typeof Promise ? Promise : void 0;
      var localRequestAnimationFrame = "function" === typeof requestAnimationFrame ? requestAnimationFrame : scheduleTimeout;
      var scheduleMicrotask = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof localPromise ? function(callback) {
        return localPromise.resolve(null).then(callback).catch(handleErrorInNextTick);
      } : scheduleTimeout;
      function handleErrorInNextTick(error) {
        setTimeout(function() {
          throw error;
        });
      }
      function isSingletonScope(type) {
        return "head" === type;
      }
      function clearHydrationBoundary(parentInstance, hydrationInstance) {
        var node = hydrationInstance, depth = 0;
        do {
          var nextNode = node.nextSibling;
          parentInstance.removeChild(node);
          if (nextNode && 8 === nextNode.nodeType)
            if (node = nextNode.data, "/$" === node || "/&" === node) {
              if (0 === depth) {
                parentInstance.removeChild(nextNode);
                retryIfBlockedOn(hydrationInstance);
                return;
              }
              depth--;
            } else if ("$" === node || "$?" === node || "$~" === node || "$!" === node || "&" === node)
              depth++;
            else if ("html" === node)
              clearSingletonPreambleContribution(
                parentInstance.ownerDocument.documentElement
              );
            else if ("head" === node) {
              node = parentInstance.ownerDocument.head;
              clearSingletonPreambleContribution(node);
              for (var node$jscomp$0 = node.firstChild; node$jscomp$0; ) {
                var nextNode$jscomp$0 = node$jscomp$0.nextSibling, nodeName = node$jscomp$0.nodeName;
                node$jscomp$0[internalHoistableMarker] || "SCRIPT" === nodeName || "STYLE" === nodeName || "LINK" === nodeName && "stylesheet" === node$jscomp$0.rel.toLowerCase() || node.removeChild(node$jscomp$0);
                node$jscomp$0 = nextNode$jscomp$0;
              }
            } else
              "body" === node && clearSingletonPreambleContribution(parentInstance.ownerDocument.body);
          node = nextNode;
        } while (node);
        retryIfBlockedOn(hydrationInstance);
      }
      function hideOrUnhideDehydratedBoundary(suspenseInstance, isHidden) {
        var node = suspenseInstance;
        suspenseInstance = 0;
        do {
          var nextNode = node.nextSibling;
          1 === node.nodeType ? isHidden ? (node._stashedDisplay = node.style.display, node.style.display = "none") : (node.style.display = node._stashedDisplay || "", "" === node.getAttribute("style") && node.removeAttribute("style")) : 3 === node.nodeType && (isHidden ? (node._stashedText = node.nodeValue, node.nodeValue = "") : node.nodeValue = node._stashedText || "");
          if (nextNode && 8 === nextNode.nodeType)
            if (node = nextNode.data, "/$" === node)
              if (0 === suspenseInstance) break;
              else suspenseInstance--;
            else
              "$" !== node && "$?" !== node && "$~" !== node && "$!" !== node || suspenseInstance++;
          node = nextNode;
        } while (node);
      }
      function applyViewTransitionName(instance, name, className) {
        name = CSS.escape(name) !== name ? "r-" + btoa(name).replace(/=/g, "") : name;
        instance.style.viewTransitionName = name;
        null != className && (instance.style.viewTransitionClass = className);
        className = getComputedStyle(instance);
        if ("inline" === className.display) {
          name = instance.getClientRects();
          if (1 === name.length) var JSCompiler_inline_result = 1;
          else
            for (var i = JSCompiler_inline_result = 0; i < name.length; i++) {
              var rect = name[i];
              0 < rect.width && 0 < rect.height && JSCompiler_inline_result++;
            }
          1 === JSCompiler_inline_result && (instance = instance.style, instance.display = 1 === name.length ? "inline-block" : "block", instance.marginTop = "-" + className.paddingTop, instance.marginBottom = "-" + className.paddingBottom);
        }
      }
      function restoreViewTransitionName(instance, props) {
        instance = instance.style;
        props = props.style;
        var viewTransitionName = null != props ? props.hasOwnProperty("viewTransitionName") ? props.viewTransitionName : props.hasOwnProperty("view-transition-name") ? props["view-transition-name"] : null : null;
        instance.viewTransitionName = null == viewTransitionName || "boolean" === typeof viewTransitionName ? "" : ("" + viewTransitionName).trim();
        viewTransitionName = null != props ? props.hasOwnProperty("viewTransitionClass") ? props.viewTransitionClass : props.hasOwnProperty("view-transition-class") ? props["view-transition-class"] : null : null;
        instance.viewTransitionClass = null == viewTransitionName || "boolean" === typeof viewTransitionName ? "" : ("" + viewTransitionName).trim();
        "inline-block" === instance.display && (null == props ? instance.display = instance.margin = "" : (viewTransitionName = props.display, instance.display = null == viewTransitionName || "boolean" === typeof viewTransitionName ? "" : viewTransitionName, viewTransitionName = props.margin, null != viewTransitionName ? instance.margin = viewTransitionName : (viewTransitionName = props.hasOwnProperty("marginTop") ? props.marginTop : props["margin-top"], instance.marginTop = null == viewTransitionName || "boolean" === typeof viewTransitionName ? "" : viewTransitionName, props = props.hasOwnProperty("marginBottom") ? props.marginBottom : props["margin-bottom"], instance.marginBottom = null == props || "boolean" === typeof props ? "" : props)));
      }
      function createMeasurement(rect, computedStyle, element) {
        element = element.ownerDocument.defaultView;
        return {
          rect,
          abs: "absolute" === computedStyle.position || "fixed" === computedStyle.position,
          clip: "none" !== computedStyle.clipPath || "visible" !== computedStyle.overflow || "none" !== computedStyle.filter || "none" !== computedStyle.mask || "none" !== computedStyle.mask || "0px" !== computedStyle.borderRadius,
          view: 0 <= rect.bottom && 0 <= rect.right && rect.top <= element.innerHeight && rect.left <= element.innerWidth
        };
      }
      function measureInstance(instance) {
        var rect = instance.getBoundingClientRect(), computedStyle = getComputedStyle(instance);
        return createMeasurement(rect, computedStyle, instance);
      }
      function measureClonedInstance(instance) {
        var measuredRect = instance.getBoundingClientRect();
        measuredRect = new DOMRect(
          measuredRect.x + 2e4,
          measuredRect.y + 2e4,
          measuredRect.width,
          measuredRect.height
        );
        var computedStyle = getComputedStyle(instance);
        return createMeasurement(measuredRect, computedStyle, instance);
      }
      function forceLayout(ownerDocument) {
        return ownerDocument.documentElement.clientHeight;
      }
      function waitForImageToLoad(resolve) {
        this.addEventListener("load", resolve);
        this.addEventListener("error", resolve);
      }
      function startViewTransition(suspendedState, rootContainer, transitionTypes, mutationCallback, layoutCallback, afterMutationCallback, spawnedWorkCallback, passiveCallback, errorCallback) {
        var ownerDocument = 9 === rootContainer.nodeType ? rootContainer : rootContainer.ownerDocument;
        try {
          var transition = ownerDocument.startViewTransition({
            update: function() {
              var ownerWindow = ownerDocument.defaultView, pendingNavigation = ownerWindow.navigation && ownerWindow.navigation.transition, previousFontLoadingStatus = ownerDocument.fonts.status;
              mutationCallback();
              var blockingPromises = [];
              "loaded" === previousFontLoadingStatus && (forceLayout(ownerDocument), "loading" === ownerDocument.fonts.status && blockingPromises.push(ownerDocument.fonts.ready));
              previousFontLoadingStatus = blockingPromises.length;
              if (null !== suspendedState)
                for (var suspenseyImages = suspendedState.suspenseyImages, imgBytes = 0, i = 0; i < suspenseyImages.length; i++) {
                  var suspenseyImage = suspenseyImages[i];
                  if (!suspenseyImage.complete) {
                    var rect = suspenseyImage.getBoundingClientRect();
                    if (0 < rect.bottom && 0 < rect.right && rect.top < ownerWindow.innerHeight && rect.left < ownerWindow.innerWidth) {
                      imgBytes += estimateImageBytes(suspenseyImage);
                      if (imgBytes > estimatedBytesWithinLimit) {
                        blockingPromises.length = previousFontLoadingStatus;
                        break;
                      }
                      suspenseyImage = new Promise(
                        waitForImageToLoad.bind(suspenseyImage)
                      );
                      blockingPromises.push(suspenseyImage);
                    }
                  }
                }
              if (0 < blockingPromises.length)
                return ownerWindow = Promise.race([
                  Promise.all(blockingPromises),
                  new Promise(function(resolve) {
                    return setTimeout(resolve, 500);
                  })
                ]).then(layoutCallback, layoutCallback), (pendingNavigation ? Promise.allSettled([pendingNavigation.finished, ownerWindow]) : ownerWindow).then(afterMutationCallback, afterMutationCallback);
              layoutCallback();
              if (pendingNavigation)
                return pendingNavigation.finished.then(
                  afterMutationCallback,
                  afterMutationCallback
                );
              afterMutationCallback();
            },
            types: transitionTypes
          });
          ownerDocument.__reactViewTransition = transition;
          var viewTransitionAnimations = [];
          transition.ready.then(
            function() {
              for (var animations = ownerDocument.documentElement.getAnimations({
                subtree: true
              }), i = 0; i < animations.length; i++) {
                var animation = animations[i], effect = animation.effect, pseudoElement = effect.pseudoElement;
                if (null != pseudoElement && pseudoElement.startsWith("::view-transition")) {
                  viewTransitionAnimations.push(animation);
                  animation = effect.getKeyframes();
                  for (var height = pseudoElement = void 0, unchangedDimensions = true, j = 0; j < animation.length; j++) {
                    var keyframe = animation[j], w = keyframe.width;
                    if (void 0 === pseudoElement) pseudoElement = w;
                    else if (pseudoElement !== w) {
                      unchangedDimensions = false;
                      break;
                    }
                    w = keyframe.height;
                    if (void 0 === height) height = w;
                    else if (height !== w) {
                      unchangedDimensions = false;
                      break;
                    }
                    delete keyframe.width;
                    delete keyframe.height;
                    "none" === keyframe.transform && delete keyframe.transform;
                  }
                  unchangedDimensions && void 0 !== pseudoElement && void 0 !== height && (effect.setKeyframes(animation), unchangedDimensions = getComputedStyle(
                    effect.target,
                    effect.pseudoElement
                  ), unchangedDimensions.width !== pseudoElement || unchangedDimensions.height !== height) && (unchangedDimensions = animation[0], unchangedDimensions.width = pseudoElement, unchangedDimensions.height = height, unchangedDimensions = animation[animation.length - 1], unchangedDimensions.width = pseudoElement, unchangedDimensions.height = height, effect.setKeyframes(animation));
                }
              }
              spawnedWorkCallback();
            },
            function(error) {
              ownerDocument.__reactViewTransition === transition && (ownerDocument.__reactViewTransition = null);
              try {
                if ("object" === typeof error && null !== error)
                  switch (error.name) {
                    case "InvalidStateError":
                      if ("View transition was skipped because document visibility state is hidden." === error.message || "Skipping view transition because document visibility state has become hidden." === error.message || "Skipping view transition because viewport size changed." === error.message || "Transition was aborted because of invalid state" === error.message)
                        error = null;
                  }
                null !== error && errorCallback(error);
              } finally {
                mutationCallback(), layoutCallback(), spawnedWorkCallback();
              }
            }
          );
          transition.finished.finally(function() {
            for (var i = 0; i < viewTransitionAnimations.length; i++)
              viewTransitionAnimations[i].cancel();
            ownerDocument.__reactViewTransition === transition && (ownerDocument.__reactViewTransition = null);
            passiveCallback();
          });
          return transition;
        } catch (x) {
          return mutationCallback(), layoutCallback(), spawnedWorkCallback(), null;
        }
      }
      function ViewTransitionPseudoElement(pseudo, name) {
        this._scope = document.documentElement;
        this._selector = "::view-transition-" + pseudo + "(" + name + ")";
      }
      ViewTransitionPseudoElement.prototype.animate = function(keyframes, options2) {
        options2 = "number" === typeof options2 ? { duration: options2 } : assign({}, options2);
        options2.pseudoElement = this._selector;
        return this._scope.animate(keyframes, options2);
      };
      ViewTransitionPseudoElement.prototype.getAnimations = function() {
        for (var scope = this._scope, selector = this._selector, animations = scope.getAnimations({ subtree: true }), result = [], i = 0; i < animations.length; i++) {
          var effect = animations[i].effect;
          null !== effect && effect.target === scope && effect.pseudoElement === selector && result.push(animations[i]);
        }
        return result;
      };
      ViewTransitionPseudoElement.prototype.getComputedStyle = function() {
        return getComputedStyle(this._scope, this._selector);
      };
      function createViewTransitionInstance(name) {
        return {
          name,
          group: new ViewTransitionPseudoElement("group", name),
          imagePair: new ViewTransitionPseudoElement("image-pair", name),
          old: new ViewTransitionPseudoElement("old", name),
          new: new ViewTransitionPseudoElement("new", name)
        };
      }
      function FragmentInstance(fragmentFiber) {
        this._fragmentFiber = fragmentFiber;
        this._observers = this._eventListeners = null;
      }
      FragmentInstance.prototype.addEventListener = function(type, listener, optionsOrUseCapture) {
        var signal = null, cleanup = null;
        if (null != optionsOrUseCapture && "boolean" !== typeof optionsOrUseCapture && (signal = optionsOrUseCapture.signal || null, null !== signal && signal.aborted))
          return;
        null === this._eventListeners && (this._eventListeners = []);
        var listeners = this._eventListeners;
        if (-1 === indexOfEventListener(listeners, type, listener, optionsOrUseCapture)) {
          var fragmentInstance = this, attachedListener = listener;
          null != optionsOrUseCapture && "boolean" !== typeof optionsOrUseCapture && true === optionsOrUseCapture.once && (attachedListener = function(event) {
            fragmentInstance.removeEventListener(
              type,
              listener,
              optionsOrUseCapture
            );
            "function" === typeof listener ? listener.call(this, event) : listener.handleEvent(event);
          });
          null !== signal && (cleanup = fragmentInstance.removeEventListener.bind(
            fragmentInstance,
            type,
            listener,
            optionsOrUseCapture
          ), signal.addEventListener("abort", cleanup, { once: true }), cleanup = signal.removeEventListener.bind(signal, "abort", cleanup));
          signal = getAttachOptions(optionsOrUseCapture);
          listeners.push({
            type,
            listener,
            optionsOrUseCapture,
            attachedListener,
            cleanup
          });
          traverseVisibleInstancesAndTextInstances(
            this._fragmentFiber.child,
            false,
            addEventListenerToChild,
            type,
            attachedListener,
            signal
          );
        }
        this._eventListeners = listeners;
      };
      function addEventListenerToChild(child, type, listener, optionsOrUseCapture) {
        getInstanceFromHostFiber(child).addEventListener(
          type,
          listener,
          optionsOrUseCapture
        );
        return false;
      }
      FragmentInstance.prototype.removeEventListener = function(type, listener, optionsOrUseCapture) {
        var listeners = this._eventListeners;
        if (null !== listeners && (listener = indexOfEventListener(
          listeners,
          type,
          listener,
          optionsOrUseCapture
        ), -1 !== listener)) {
          var _listeners$index = listeners[listener];
          optionsOrUseCapture = _listeners$index.attachedListener;
          var cleanup = _listeners$index.cleanup;
          _listeners$index = getAttachOptions(_listeners$index.optionsOrUseCapture);
          traverseVisibleInstancesAndTextInstances(
            this._fragmentFiber.child,
            false,
            removeEventListenerFromChild,
            type,
            optionsOrUseCapture,
            _listeners$index
          );
          listeners.splice(listener, 1);
          null !== cleanup && cleanup();
        }
      };
      function removeEventListenerFromChild(child, type, listener, optionsOrUseCapture) {
        getInstanceFromHostFiber(child).removeEventListener(
          type,
          listener,
          optionsOrUseCapture
        );
        return false;
      }
      function getAttachOptions(opts) {
        return null != opts && "boolean" !== typeof opts && (true === opts.once || opts.signal instanceof AbortSignal) ? { capture: opts.capture, passive: opts.passive } : opts;
      }
      function normalizeListenerOptions(opts) {
        return null == opts ? "c=0" : "boolean" === typeof opts ? "c=" + (opts ? "1" : "0") : "c=" + (opts.capture ? "1" : "0");
      }
      function indexOfEventListener(eventListeners, type, listener, optionsOrUseCapture) {
        if (0 === eventListeners.length) return -1;
        optionsOrUseCapture = normalizeListenerOptions(optionsOrUseCapture);
        for (var i = 0; i < eventListeners.length; i++) {
          var item = eventListeners[i];
          if (item.type === type && item.listener === listener && normalizeListenerOptions(item.optionsOrUseCapture) === optionsOrUseCapture)
            return i;
        }
        return -1;
      }
      FragmentInstance.prototype.dispatchEvent = function(event) {
        var parentHostFiber = getFragmentParentInstanceOrContainerFiber(
          this._fragmentFiber
        );
        if (null === parentHostFiber) return true;
        parentHostFiber = getInstanceFromHostFiber(parentHostFiber);
        var eventListeners = this._eventListeners;
        if (null !== eventListeners && 0 < eventListeners.length || !event.bubbles) {
          var temp = 9 === parentHostFiber.nodeType ? parentHostFiber.createComment("") : document.createTextNode("");
          if (eventListeners)
            for (var i = 0; i < eventListeners.length; i++) {
              var _eventListeners$i = eventListeners[i];
              temp.addEventListener(
                _eventListeners$i.type,
                _eventListeners$i.attachedListener,
                getAttachOptions(_eventListeners$i.optionsOrUseCapture)
              );
            }
          parentHostFiber.appendChild(temp);
          event = temp.dispatchEvent(event);
          if (eventListeners)
            for (i = 0; i < eventListeners.length; i++)
              _eventListeners$i = eventListeners[i], temp.removeEventListener(
                _eventListeners$i.type,
                _eventListeners$i.attachedListener,
                getAttachOptions(_eventListeners$i.optionsOrUseCapture)
              );
          parentHostFiber.removeChild(temp);
          return event;
        }
        return parentHostFiber.dispatchEvent(event);
      };
      FragmentInstance.prototype.focus = function(focusOptions) {
        traverseVisibleInstancesAndTextInstances(
          this._fragmentFiber.child,
          true,
          setFocusOnFiberIfFocusable,
          focusOptions,
          void 0,
          void 0
        );
      };
      function setFocusOnFiberIfFocusable(fiber, focusOptions) {
        if (6 === fiber.tag) return false;
        fiber = getInstanceFromHostFiber(fiber);
        return setFocusIfFocusable(fiber, focusOptions);
      }
      FragmentInstance.prototype.focusLast = function(focusOptions) {
        var children = [];
        traverseVisibleInstancesAndTextInstances(
          this._fragmentFiber.child,
          true,
          collectChildren,
          children,
          void 0,
          void 0
        );
        for (var i = children.length - 1; 0 <= i && !setFocusOnFiberIfFocusable(children[i], focusOptions); i--) ;
      };
      function collectChildren(child, collection) {
        collection.push(child);
        return false;
      }
      FragmentInstance.prototype.blur = function() {
        var parentHostFiber = getFragmentParentInstanceOrContainerFiber(
          this._fragmentFiber
        );
        null !== parentHostFiber && (parentHostFiber = getInstanceFromHostFiber(parentHostFiber), parentHostFiber = getOwnerDocumentFromRootContainer(parentHostFiber).activeElement, null !== parentHostFiber && traverseVisibleInstancesAndTextInstances(
          this._fragmentFiber.child,
          false,
          blurActiveElementWithinFragment,
          parentHostFiber,
          void 0,
          void 0
        ));
      };
      function blurActiveElementWithinFragment(child, activeElement2) {
        if (6 === child.tag) return false;
        child = getInstanceFromHostFiber(child);
        return child === activeElement2 || child.contains(activeElement2) ? (activeElement2.blur(), true) : false;
      }
      FragmentInstance.prototype.observeUsing = function(observer) {
        null === this._observers && (this._observers = /* @__PURE__ */ new Set());
        this._observers.add(observer);
        traverseVisibleInstancesAndTextInstances(
          this._fragmentFiber.child,
          false,
          observeChild,
          observer,
          void 0,
          void 0
        );
      };
      function observeChild(child, observer) {
        if (6 === child.tag) return false;
        child = getInstanceFromHostFiber(child);
        observer.observe(child);
        return false;
      }
      FragmentInstance.prototype.unobserveUsing = function(observer) {
        var observers = this._observers;
        if (null !== observers && observers.has(observer)) {
          observers.delete(observer);
          traverseVisibleInstancesAndTextInstances(
            this._fragmentFiber.child,
            false,
            unobserveChild,
            observer,
            void 0,
            void 0
          );
          for (var i = observers = 0; i < pendingIntersectionUnobserves.length; i++) {
            var pending = pendingIntersectionUnobserves[i];
            pending.fragmentInstance === this && pending.observer === observer ? observer.unobserve(pending.instance) : pendingIntersectionUnobserves[observers++] = pending;
          }
          pendingIntersectionUnobserves.length = observers;
        }
      };
      function unobserveChild(child, observer) {
        if (6 === child.tag) return false;
        child = getInstanceFromHostFiber(child);
        observer.unobserve(child);
        return false;
      }
      var pendingIntersectionUnobserves = [];
      var intersectionUnobserveScheduled = false;
      function schedulePendingIntersectionUnobserve(fragmentInstance, observer, instance) {
        pendingIntersectionUnobserves.push({
          fragmentInstance,
          observer,
          instance
        });
        intersectionUnobserveScheduled || (intersectionUnobserveScheduled = true, requestPostPaintCallback(function() {
          intersectionUnobserveScheduled = false;
          var pending = pendingIntersectionUnobserves;
          pendingIntersectionUnobserves = [];
          for (var i = 0; i < pending.length; i++) {
            var item = pending[i];
            item.observer.unobserve(item.instance);
          }
        }));
      }
      FragmentInstance.prototype.getClientRects = function() {
        var rects = [];
        traverseVisibleInstancesAndTextInstances(
          this._fragmentFiber.child,
          false,
          collectClientRects,
          rects,
          void 0,
          void 0
        );
        return rects;
      };
      function collectClientRects(child, rects) {
        if (6 === child.tag) {
          child = child.stateNode;
          var range = child.ownerDocument.createRange();
          range.selectNodeContents(child);
          rects.push.apply(rects, range.getClientRects());
        } else
          child = getInstanceFromHostFiber(child), rects.push.apply(rects, child.getClientRects());
        return false;
      }
      FragmentInstance.prototype.getRootNode = function(getRootNodeOptions) {
        var parentHostFiber = getFragmentParentInstanceOrContainerFiber(
          this._fragmentFiber
        );
        return null === parentHostFiber ? this : getInstanceFromHostFiber(parentHostFiber).getRootNode(getRootNodeOptions);
      };
      FragmentInstance.prototype.compareDocumentPosition = function(otherNode) {
        var parentHostFiber = getFragmentParentInstanceOrContainerFiber(
          this._fragmentFiber
        );
        if (null === parentHostFiber) return Node.DOCUMENT_POSITION_DISCONNECTED;
        var children = [];
        traverseVisibleInstancesAndTextInstances(
          this._fragmentFiber.child,
          false,
          collectChildren,
          children,
          void 0,
          void 0
        );
        var parentHostInstance = getInstanceFromHostFiber(parentHostFiber);
        if (0 === children.length) {
          children = parentHostInstance;
          if (fiberIsPortaledIntoHost(this._fragmentFiber)) {
            a: {
              for (parentHostFiber = this._fragmentFiber.return; null !== parentHostFiber; ) {
                if (4 === parentHostFiber.tag) {
                  parentHostFiber = parentHostFiber.stateNode.containerInfo;
                  break a;
                }
                if (3 === parentHostFiber.tag || 5 === parentHostFiber.tag || 27 === parentHostFiber.tag)
                  break;
                parentHostFiber = parentHostFiber.return;
              }
              parentHostFiber = null;
            }
            null != parentHostFiber && (children = parentHostFiber);
          }
          parentHostFiber = this._fragmentFiber;
          var result = parentHostInstance = children.compareDocumentPosition(otherNode);
          children === otherNode ? result = Node.DOCUMENT_POSITION_CONTAINS : parentHostInstance & Node.DOCUMENT_POSITION_CONTAINED_BY && (children = getFragmentInstanceOrTextInstanceSiblings(parentHostFiber)[1], null === children ? result = Node.DOCUMENT_POSITION_PRECEDING : (otherNode = getInstanceFromHostFiber(children).compareDocumentPosition(
            otherNode
          ), result = 0 === otherNode || otherNode & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING));
          return result |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
        }
        parentHostFiber = getInstanceFromHostFiber(children[0]);
        result = getInstanceFromHostFiber(children[children.length - 1]);
        var parentHostInstanceFromDOM = fiberIsPortaledIntoHost(this._fragmentFiber) ? parentHostFiber.parentElement : parentHostInstance;
        if (null == parentHostInstanceFromDOM)
          return Node.DOCUMENT_POSITION_DISCONNECTED;
        parentHostInstance = parentHostInstanceFromDOM.compareDocumentPosition(parentHostFiber) & Node.DOCUMENT_POSITION_CONTAINED_BY;
        parentHostInstanceFromDOM = parentHostInstanceFromDOM.compareDocumentPosition(result) & Node.DOCUMENT_POSITION_CONTAINED_BY;
        var firstResult = parentHostFiber.compareDocumentPosition(otherNode), lastResult = result.compareDocumentPosition(otherNode), otherNodeIsWithinFirstOrLastChild = firstResult & Node.DOCUMENT_POSITION_CONTAINED_BY || lastResult & Node.DOCUMENT_POSITION_CONTAINED_BY;
        lastResult = parentHostInstance && parentHostInstanceFromDOM && firstResult & Node.DOCUMENT_POSITION_FOLLOWING && lastResult & Node.DOCUMENT_POSITION_PRECEDING;
        parentHostFiber = parentHostInstance && parentHostFiber === otherNode || parentHostInstanceFromDOM && result === otherNode || otherNodeIsWithinFirstOrLastChild || lastResult ? Node.DOCUMENT_POSITION_CONTAINED_BY : !parentHostInstance && parentHostFiber === otherNode || !parentHostInstanceFromDOM && result === otherNode ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : firstResult;
        return parentHostFiber & Node.DOCUMENT_POSITION_DISCONNECTED || parentHostFiber & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || validateDocumentPositionWithFiberTree(
          parentHostFiber,
          this._fragmentFiber,
          children[0],
          children[children.length - 1],
          otherNode
        ) ? parentHostFiber : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
      };
      function validateDocumentPositionWithFiberTree(documentPosition, fragmentFiber, precedingBoundaryFiber, followingBoundaryFiber, otherNode) {
        var otherFiber = getClosestInstanceFromNode(otherNode);
        if (documentPosition & Node.DOCUMENT_POSITION_CONTAINED_BY) {
          if (precedingBoundaryFiber = !!otherFiber)
            a: {
              for (; null !== otherFiber; ) {
                if (7 === otherFiber.tag && (otherFiber === fragmentFiber || otherFiber.alternate === fragmentFiber)) {
                  precedingBoundaryFiber = true;
                  break a;
                }
                otherFiber = otherFiber.return;
              }
              precedingBoundaryFiber = false;
            }
          return precedingBoundaryFiber;
        }
        if (documentPosition & Node.DOCUMENT_POSITION_CONTAINS) {
          if (null === otherFiber)
            return otherFiber = otherNode.ownerDocument, otherNode === otherFiber || otherNode === otherFiber.documentElement || otherNode === otherFiber.body;
          a: {
            otherFiber = fragmentFiber;
            for (fragmentFiber = getFragmentParentInstanceOrContainerFiber(fragmentFiber); null !== otherFiber; ) {
              if (!(5 !== otherFiber.tag && 3 !== otherFiber.tag && 27 !== otherFiber.tag || otherFiber !== fragmentFiber && otherFiber.alternate !== fragmentFiber)) {
                otherFiber = true;
                break a;
              }
              otherFiber = otherFiber.return;
            }
            otherFiber = false;
          }
          return otherFiber;
        }
        return documentPosition & Node.DOCUMENT_POSITION_PRECEDING ? ((fragmentFiber = !!otherFiber) && !(fragmentFiber = otherFiber === precedingBoundaryFiber) && (fragmentFiber = getLowestCommonAncestor(
          precedingBoundaryFiber,
          otherFiber,
          getParentForFragmentAncestors
        ), null === fragmentFiber ? fragmentFiber = false : (traverseVisibleInstancesAndTextInstances(
          fragmentFiber,
          true,
          isFiberPrecedingCheck,
          otherFiber,
          precedingBoundaryFiber
        ), otherFiber = searchTarget, searchTarget = null, fragmentFiber = null !== otherFiber)), fragmentFiber) : documentPosition & Node.DOCUMENT_POSITION_FOLLOWING ? ((fragmentFiber = !!otherFiber) && !(fragmentFiber = otherFiber === followingBoundaryFiber) && (fragmentFiber = getLowestCommonAncestor(
          followingBoundaryFiber,
          otherFiber,
          getParentForFragmentAncestors
        ), null === fragmentFiber ? fragmentFiber = false : (traverseVisibleInstancesAndTextInstances(
          fragmentFiber,
          true,
          isFiberFollowingCheck,
          otherFiber,
          followingBoundaryFiber
        ), otherFiber = searchTarget, searchBoundary = searchTarget = null, fragmentFiber = null !== otherFiber)), fragmentFiber) : false;
      }
      function scrollTextNodeIntoView(textNode, resolvedAlignToTop) {
        var range = textNode.ownerDocument.createRange();
        range.selectNodeContents(textNode);
        textNode = range.getBoundingClientRect();
        window.scrollTo(
          window.scrollX + textNode.left,
          resolvedAlignToTop ? window.scrollY + textNode.top : window.scrollY + textNode.bottom - window.innerHeight
        );
      }
      FragmentInstance.prototype.scrollIntoView = function(alignToTop) {
        if ("object" === typeof alignToTop) throw Error(formatProdErrorMessage(566));
        var children = [];
        traverseVisibleInstancesAndTextInstances(
          this._fragmentFiber.child,
          false,
          collectChildren,
          children,
          void 0,
          void 0
        );
        var resolvedAlignToTop = false !== alignToTop;
        if (0 === children.length) {
          var hostSiblings = getFragmentInstanceOrTextInstanceSiblings(
            this._fragmentFiber
          );
          hostSiblings = resolvedAlignToTop ? hostSiblings[1] || hostSiblings[0] || getFragmentParentInstanceOrContainerFiber(this._fragmentFiber) : hostSiblings[0] || hostSiblings[1];
          if (null === hostSiblings) return;
          if (6 === hostSiblings.tag) {
            alignToTop = getInstanceFromHostFiber(hostSiblings);
            scrollTextNodeIntoView(alignToTop, resolvedAlignToTop);
            return;
          }
          hostSiblings = getInstanceFromHostFiber(hostSiblings);
          if (9 !== hostSiblings.nodeType) {
            if (11 === hostSiblings.nodeType) {
              resolvedAlignToTop = "host" in hostSiblings ? hostSiblings.host : null;
              null !== resolvedAlignToTop && resolvedAlignToTop.scrollIntoView(alignToTop);
              return;
            }
            hostSiblings.scrollIntoView(alignToTop);
          }
        }
        for (hostSiblings = resolvedAlignToTop ? children.length - 1 : 0; hostSiblings !== (resolvedAlignToTop ? -1 : children.length); ) {
          var child = children[hostSiblings];
          6 === child.tag ? (child = getInstanceFromHostFiber(child), scrollTextNodeIntoView(child, resolvedAlignToTop)) : getInstanceFromHostFiber(child).scrollIntoView(alignToTop);
          hostSiblings += resolvedAlignToTop ? -1 : 1;
        }
      };
      function addFragmentHandleToFiber(child, fragmentInstance) {
        child = getInstanceFromHostFiber(child);
        addFragmentHandleToInstance(child, fragmentInstance);
        return false;
      }
      function addFragmentHandleToInstance(instance, fragmentInstance) {
        null == instance.reactFragments && (instance.reactFragments = /* @__PURE__ */ new Set());
        instance.reactFragments.add(fragmentInstance);
      }
      function commitNewChildToFragmentInstance(childInstance, fragmentInstance) {
        var eventListeners = fragmentInstance._eventListeners;
        if (null !== eventListeners)
          for (var i$jscomp$0 = 0; i$jscomp$0 < eventListeners.length; i$jscomp$0++) {
            var _eventListeners$i3 = eventListeners[i$jscomp$0];
            childInstance.addEventListener(
              _eventListeners$i3.type,
              _eventListeners$i3.attachedListener,
              getAttachOptions(_eventListeners$i3.optionsOrUseCapture)
            );
          }
        3 !== childInstance.nodeType && (eventListeners = fragmentInstance._observers, null !== eventListeners && eventListeners.forEach(function(observer) {
          for (var writeIdx = 0, i = 0; i < pendingIntersectionUnobserves.length; i++) {
            var pending = pendingIntersectionUnobserves[i];
            if (pending.fragmentInstance !== fragmentInstance || pending.observer !== observer || pending.instance !== childInstance)
              pendingIntersectionUnobserves[writeIdx++] = pending;
          }
          pendingIntersectionUnobserves.length = writeIdx;
          observer.observe(childInstance);
        }), addFragmentHandleToInstance(childInstance, fragmentInstance));
      }
      function deleteChildFromFragmentInstance(childInstance, fragmentInstance) {
        var eventListeners = fragmentInstance._eventListeners;
        if (null !== eventListeners)
          for (var i = 0; i < eventListeners.length; i++) {
            var _eventListeners$i4 = eventListeners[i];
            childInstance.removeEventListener(
              _eventListeners$i4.type,
              _eventListeners$i4.attachedListener,
              getAttachOptions(_eventListeners$i4.optionsOrUseCapture)
            );
          }
        3 !== childInstance.nodeType && (eventListeners = fragmentInstance._observers, null !== eventListeners && eventListeners.forEach(function(observer) {
          "string" === typeof observer.rootMargin ? schedulePendingIntersectionUnobserve(
            fragmentInstance,
            observer,
            childInstance
          ) : observer.unobserve(childInstance);
        }), null != childInstance.reactFragments && childInstance.reactFragments.delete(fragmentInstance));
      }
      function clearContainerSparingly(container) {
        var nextNode = container.firstChild;
        nextNode && 10 === nextNode.nodeType && (nextNode = nextNode.nextSibling);
        for (; nextNode; ) {
          var node = nextNode;
          nextNode = nextNode.nextSibling;
          switch (node.nodeName) {
            case "HTML":
            case "HEAD":
            case "BODY":
              clearContainerSparingly(node);
              detachDeletedInstance(node);
              continue;
            case "SCRIPT":
            case "STYLE":
              continue;
            case "LINK":
              if ("stylesheet" === node.rel.toLowerCase()) continue;
          }
          container.removeChild(node);
        }
      }
      function canHydrateInstance(instance, type, props, inRootOrSingleton) {
        for (; 1 === instance.nodeType; ) {
          var anyProps = props;
          if (instance.nodeName.toLowerCase() !== type.toLowerCase()) {
            if (!inRootOrSingleton && ("INPUT" !== instance.nodeName || "hidden" !== instance.type))
              break;
          } else if (!inRootOrSingleton)
            if ("input" === type && "hidden" === instance.type) {
              var name = null == anyProps.name ? null : "" + anyProps.name;
              if ("hidden" === anyProps.type && instance.getAttribute("name") === name)
                return instance;
            } else return instance;
          else if (!instance[internalHoistableMarker])
            switch (type) {
              case "meta":
                if (!instance.hasAttribute("itemprop")) break;
                return instance;
              case "link":
                name = instance.getAttribute("rel");
                if ("stylesheet" === name && instance.hasAttribute("data-precedence"))
                  break;
                else if (name !== anyProps.rel || instance.getAttribute("href") !== (null == anyProps.href || "" === anyProps.href ? null : anyProps.href) || instance.getAttribute("crossorigin") !== (null == anyProps.crossOrigin ? null : anyProps.crossOrigin) || instance.getAttribute("title") !== (null == anyProps.title ? null : anyProps.title))
                  break;
                return instance;
              case "style":
                if (instance.hasAttribute("data-precedence")) break;
                return instance;
              case "script":
                name = instance.getAttribute("src");
                if ((name !== (null == anyProps.src ? null : anyProps.src) || instance.getAttribute("type") !== (null == anyProps.type ? null : anyProps.type) || instance.getAttribute("crossorigin") !== (null == anyProps.crossOrigin ? null : anyProps.crossOrigin)) && name && instance.hasAttribute("async") && !instance.hasAttribute("itemprop"))
                  break;
                return instance;
              default:
                return instance;
            }
          instance = getNextHydratable(instance.nextSibling);
          if (null === instance) break;
        }
        return null;
      }
      function canHydrateTextInstance(instance, text, inRootOrSingleton) {
        if ("" === text) return null;
        for (; 3 !== instance.nodeType; ) {
          if ((1 !== instance.nodeType || "INPUT" !== instance.nodeName || "hidden" !== instance.type) && !inRootOrSingleton)
            return null;
          instance = getNextHydratable(instance.nextSibling);
          if (null === instance) return null;
        }
        return instance;
      }
      function canHydrateHydrationBoundary(instance, inRootOrSingleton) {
        for (; 8 !== instance.nodeType; ) {
          if ((1 !== instance.nodeType || "INPUT" !== instance.nodeName || "hidden" !== instance.type) && !inRootOrSingleton)
            return null;
          instance = getNextHydratable(instance.nextSibling);
          if (null === instance) return null;
        }
        return instance;
      }
      function isSuspenseInstancePending(instance) {
        return "$?" === instance.data || "$~" === instance.data;
      }
      function isSuspenseInstanceFallback(instance) {
        return "$!" === instance.data || "$?" === instance.data && "loading" !== instance.ownerDocument.readyState;
      }
      function registerSuspenseInstanceRetry(instance, callback) {
        var ownerDocument = instance.ownerDocument;
        if ("$~" === instance.data) instance._reactRetry = callback;
        else if ("$?" !== instance.data || "loading" !== ownerDocument.readyState)
          callback();
        else {
          var listener = function() {
            callback();
            ownerDocument.removeEventListener("DOMContentLoaded", listener);
          };
          ownerDocument.addEventListener("DOMContentLoaded", listener);
          instance._reactRetry = listener;
        }
      }
      function getNextHydratable(node) {
        for (; null != node; node = node.nextSibling) {
          var nodeType = node.nodeType;
          if (1 === nodeType || 3 === nodeType) break;
          if (8 === nodeType) {
            nodeType = node.data;
            if ("$" === nodeType || "$!" === nodeType || "$?" === nodeType || "$~" === nodeType || "&" === nodeType || "F!" === nodeType || "F" === nodeType)
              break;
            if ("/$" === nodeType || "/&" === nodeType) return null;
          }
        }
        return node;
      }
      var previousHydratableOnEnteringScopedSingleton = null;
      function getNextHydratableInstanceAfterHydrationBoundary(hydrationInstance) {
        hydrationInstance = hydrationInstance.nextSibling;
        for (var depth = 0; hydrationInstance; ) {
          if (8 === hydrationInstance.nodeType) {
            var data = hydrationInstance.data;
            if ("/$" === data || "/&" === data) {
              if (0 === depth)
                return getNextHydratable(hydrationInstance.nextSibling);
              depth--;
            } else
              "$" !== data && "$!" !== data && "$?" !== data && "$~" !== data && "&" !== data || depth++;
          }
          hydrationInstance = hydrationInstance.nextSibling;
        }
        return null;
      }
      function getParentHydrationBoundary(targetInstance) {
        targetInstance = targetInstance.previousSibling;
        for (var depth = 0; targetInstance; ) {
          if (8 === targetInstance.nodeType) {
            var data = targetInstance.data;
            if ("$" === data || "$!" === data || "$?" === data || "$~" === data || "&" === data) {
              if (0 === depth) return targetInstance;
              depth--;
            } else "/$" !== data && "/&" !== data || depth++;
          }
          targetInstance = targetInstance.previousSibling;
        }
        return null;
      }
      function setFocusIfFocusable(node, focusOptions) {
        function handleFocus() {
          didFocus = true;
        }
        if (node.ownerDocument.activeElement === node) return true;
        var didFocus = false;
        try {
          node.ownerDocument.addEventListener("focus", handleFocus, true), (node.focus || HTMLElement.prototype.focus).call(node, focusOptions);
        } finally {
          node.ownerDocument.removeEventListener("focus", handleFocus, true);
        }
        return didFocus;
      }
      function requestPostPaintCallback(callback) {
        localRequestAnimationFrame(function() {
          localRequestAnimationFrame(function(time) {
            return callback(time);
          });
        });
      }
      function resolveSingletonInstance(type, props, rootContainerInstance) {
        props = getOwnerDocumentFromRootContainer(rootContainerInstance);
        switch (type) {
          case "html":
            type = props.documentElement;
            if (!type) throw Error(formatProdErrorMessage(452));
            return type;
          case "head":
            type = props.head;
            if (!type) throw Error(formatProdErrorMessage(453));
            return type;
          case "body":
            type = props.body;
            if (!type) throw Error(formatProdErrorMessage(454));
            return type;
          default:
            throw Error(formatProdErrorMessage(451));
        }
      }
      function releaseSingletonInstance(instance, type, props) {
        for (var propKey in props) {
          var propValue = props[propKey];
          props.hasOwnProperty(propKey) && null != propValue && setProp(instance, type, propKey, null, emptyProps, propValue);
        }
        null != props.dangerouslySetInnerHTML && (instance.textContent = "");
        instance.onclick === noop$1 && (instance.onclick = null);
        detachDeletedInstance(instance);
      }
      function clearSingletonPreambleContribution(instance) {
        for (var attributes = instance.attributes; attributes.length; )
          instance.removeAttributeNode(attributes[0]);
        detachDeletedInstance(instance);
      }
      var preloadPropsMap = /* @__PURE__ */ new Map();
      var preconnectsSet = /* @__PURE__ */ new Set();
      function getHoistableRoot(container) {
        if ("function" === typeof container.getRootNode) {
          var rootNode = container.getRootNode();
          if (9 === rootNode.nodeType || 11 === rootNode.nodeType) return rootNode;
        }
        return 9 === container.nodeType ? container : container.ownerDocument;
      }
      var previousDispatcher = ReactDOMSharedInternals.d;
      ReactDOMSharedInternals.d = {
        f: flushSyncWork,
        r: requestFormReset,
        D: prefetchDNS,
        C: preconnect,
        L: preload,
        m: preloadModule,
        X: preinitScript,
        S: preinitStyle,
        M: preinitModuleScript
      };
      function flushSyncWork() {
        var previousWasRendering = previousDispatcher.f(), wasRendering = flushSyncWork$1();
        return previousWasRendering || wasRendering;
      }
      function requestFormReset(form) {
        var formInst = getInstanceFromNode(form);
        null !== formInst && 5 === formInst.tag && "form" === formInst.type ? requestFormReset$1(formInst) : previousDispatcher.r(form);
      }
      var globalDocument = "undefined" === typeof document ? null : document;
      function preconnectAs(rel, href, crossOrigin) {
        var ownerDocument = globalDocument;
        if (ownerDocument && "string" === typeof href && href) {
          var limitedEscapedHref = escapeSelectorAttributeValueInsideDoubleQuotes(href);
          limitedEscapedHref = 'link[rel="' + rel + '"][href="' + limitedEscapedHref + '"]';
          "string" === typeof crossOrigin && (limitedEscapedHref += '[crossorigin="' + crossOrigin + '"]');
          preconnectsSet.has(limitedEscapedHref) || (preconnectsSet.add(limitedEscapedHref), rel = { rel, crossOrigin, href }, null === ownerDocument.querySelector(limitedEscapedHref) && (href = ownerDocument.createElement("link"), setInitialProperties(href, "link", rel), markNodeAsHoistable(href), ownerDocument.head.appendChild(href)));
        }
      }
      function prefetchDNS(href) {
        previousDispatcher.D(href);
        preconnectAs("dns-prefetch", href, null);
      }
      function preconnect(href, crossOrigin) {
        previousDispatcher.C(href, crossOrigin);
        preconnectAs("preconnect", href, crossOrigin);
      }
      function preload(href, as, options2) {
        previousDispatcher.L(href, as, options2);
        var ownerDocument = globalDocument;
        if (ownerDocument && href && as) {
          var preloadSelector = 'link[rel="preload"][as="' + escapeSelectorAttributeValueInsideDoubleQuotes(as) + '"]';
          "image" === as ? options2 && options2.imageSrcSet ? (preloadSelector += '[imagesrcset="' + escapeSelectorAttributeValueInsideDoubleQuotes(
            options2.imageSrcSet
          ) + '"]', "string" === typeof options2.imageSizes && (preloadSelector += '[imagesizes="' + escapeSelectorAttributeValueInsideDoubleQuotes(
            options2.imageSizes
          ) + '"]')) : preloadSelector += '[href="' + escapeSelectorAttributeValueInsideDoubleQuotes(href) + '"]' : preloadSelector += '[href="' + escapeSelectorAttributeValueInsideDoubleQuotes(href) + '"]';
          var key = preloadSelector;
          switch (as) {
            case "style":
              key = getStyleKey(href);
              break;
            case "script":
              key = getScriptKey(href);
          }
          if (!(preloadPropsMap.has(key) || (href = assign(
            {
              rel: "preload",
              href: "image" === as && options2 && options2.imageSrcSet ? void 0 : href,
              as
            },
            options2
          ), preloadPropsMap.set(key, href), null !== ownerDocument.querySelector(preloadSelector) || "style" === as && ownerDocument.querySelector(getStylesheetSelectorFromKey(key)) || "script" === as && ownerDocument.querySelector(getScriptSelectorFromKey(key))))) {
            var instance = ownerDocument.createElement("link");
            setInitialProperties(instance, "link", href);
            "style" === as && (instance[internalLoadPendingKey] = true, instance.onload = instance.onerror = function() {
              clearPendingLoadOnNode(instance);
            });
            markNodeAsHoistable(instance);
            ownerDocument.head.appendChild(instance);
          }
        }
      }
      function preloadModule(href, options2) {
        previousDispatcher.m(href, options2);
        var ownerDocument = globalDocument;
        if (ownerDocument && href) {
          var as = options2 && "string" === typeof options2.as ? options2.as : "script", preloadSelector = 'link[rel="modulepreload"][as="' + escapeSelectorAttributeValueInsideDoubleQuotes(as) + '"][href="' + escapeSelectorAttributeValueInsideDoubleQuotes(href) + '"]', key = preloadSelector;
          switch (as) {
            case "audioworklet":
            case "paintworklet":
            case "serviceworker":
            case "sharedworker":
            case "worker":
            case "script":
              key = getScriptKey(href);
          }
          if (!preloadPropsMap.has(key) && (href = assign({ rel: "modulepreload", href }, options2), preloadPropsMap.set(key, href), null === ownerDocument.querySelector(preloadSelector))) {
            switch (as) {
              case "audioworklet":
              case "paintworklet":
              case "serviceworker":
              case "sharedworker":
              case "worker":
              case "script":
                if (ownerDocument.querySelector(getScriptSelectorFromKey(key)))
                  return;
            }
            as = ownerDocument.createElement("link");
            setInitialProperties(as, "link", href);
            markNodeAsHoistable(as);
            ownerDocument.head.appendChild(as);
          }
        }
      }
      function preinitStyle(href, precedence, options2) {
        previousDispatcher.S(href, precedence, options2);
        var ownerDocument = globalDocument;
        if (ownerDocument && href) {
          var styles = getResourcesFromRoot(ownerDocument).hoistableStyles, key = getStyleKey(href);
          precedence = precedence || "default";
          var resource = styles.get(key);
          if (!resource) {
            var state = { loading: 0, preload: null };
            if (resource = ownerDocument.querySelector(
              getStylesheetSelectorFromKey(key)
            ))
              state.loading = 5;
            else {
              href = assign(
                { rel: "stylesheet", href, "data-precedence": precedence },
                options2
              );
              (options2 = preloadPropsMap.get(key)) && adoptPreloadPropsForStylesheet(href, options2);
              var link = resource = ownerDocument.createElement("link");
              markNodeAsHoistable(link);
              setInitialProperties(link, "link", href);
              link._p = new Promise(function(resolve, reject) {
                link.onload = resolve;
                link.onerror = reject;
              });
              link.addEventListener("load", function() {
                state.loading |= 1;
              });
              link.addEventListener("error", function() {
                state.loading |= 2;
              });
              state.loading |= 4;
              insertStylesheet(resource, precedence, ownerDocument);
            }
            resource = {
              type: "stylesheet",
              instance: resource,
              count: 1,
              state
            };
            styles.set(key, resource);
          }
        }
      }
      function preinitScript(src, options2) {
        previousDispatcher.X(src, options2);
        var ownerDocument = globalDocument;
        if (ownerDocument && src) {
          var scripts = getResourcesFromRoot(ownerDocument).hoistableScripts, key = getScriptKey(src), resource = scripts.get(key);
          resource || (resource = ownerDocument.querySelector(getScriptSelectorFromKey(key)), resource || (src = assign({ src, async: true }, options2), (options2 = preloadPropsMap.get(key)) && adoptPreloadPropsForScript(src, options2), resource = ownerDocument.createElement("script"), markNodeAsHoistable(resource), setInitialProperties(resource, "link", src), ownerDocument.head.appendChild(resource)), resource = {
            type: "script",
            instance: resource,
            count: 1,
            state: null
          }, scripts.set(key, resource));
        }
      }
      function preinitModuleScript(src, options2) {
        previousDispatcher.M(src, options2);
        var ownerDocument = globalDocument;
        if (ownerDocument && src) {
          var scripts = getResourcesFromRoot(ownerDocument).hoistableScripts, key = getScriptKey(src), resource = scripts.get(key);
          resource || (resource = ownerDocument.querySelector(getScriptSelectorFromKey(key)), resource || (src = assign({ src, async: true, type: "module" }, options2), (options2 = preloadPropsMap.get(key)) && adoptPreloadPropsForScript(src, options2), resource = ownerDocument.createElement("script"), markNodeAsHoistable(resource), setInitialProperties(resource, "link", src), ownerDocument.head.appendChild(resource)), resource = {
            type: "script",
            instance: resource,
            count: 1,
            state: null
          }, scripts.set(key, resource));
        }
      }
      function getResource(type, currentProps, pendingProps, currentResource) {
        var JSCompiler_inline_result = (JSCompiler_inline_result = rootInstanceStackCursor.current) ? getHoistableRoot(JSCompiler_inline_result) : null;
        if (!JSCompiler_inline_result) throw Error(formatProdErrorMessage(446));
        switch (type) {
          case "meta":
          case "title":
            return null;
          case "style":
            return "string" === typeof pendingProps.precedence && "string" === typeof pendingProps.href ? (pendingProps = getStyleKey(pendingProps.href), currentProps = getResourcesFromRoot(
              JSCompiler_inline_result
            ).hoistableStyles, currentResource = currentProps.get(pendingProps), currentResource || (currentResource = {
              type: "style",
              instance: null,
              count: 0,
              state: null
            }, currentProps.set(pendingProps, currentResource)), currentResource) : { type: "void", instance: null, count: 0, state: null };
          case "link":
            if ("stylesheet" === pendingProps.rel && "string" === typeof pendingProps.href && "string" === typeof pendingProps.precedence) {
              type = getStyleKey(pendingProps.href);
              var styles$268 = getResourcesFromRoot(
                JSCompiler_inline_result
              ).hoistableStyles, resource$269 = styles$268.get(type);
              resource$269 || (JSCompiler_inline_result = JSCompiler_inline_result.ownerDocument || JSCompiler_inline_result, resource$269 = {
                type: "stylesheet",
                instance: null,
                count: 0,
                state: { loading: 0, preload: null }
              }, styles$268.set(type, resource$269), (styles$268 = JSCompiler_inline_result.querySelector(
                getStylesheetSelectorFromKey(type)
              )) ? styles$268._p || (resource$269.instance = styles$268, resource$269.state.loading = 5) : (styles$268 = preloadPropsMap.get(type), styles$268 || (styles$268 = {
                rel: "preload",
                as: "style",
                href: pendingProps.href,
                crossOrigin: pendingProps.crossOrigin,
                integrity: pendingProps.integrity,
                media: pendingProps.media,
                hrefLang: pendingProps.hrefLang,
                referrerPolicy: pendingProps.referrerPolicy
              }, preloadPropsMap.set(type, styles$268)), preloadStylesheet(
                JSCompiler_inline_result,
                type,
                styles$268,
                resource$269.state
              )));
              if (currentProps && null === currentResource)
                throw Error(formatProdErrorMessage(528, ""));
              return resource$269;
            }
            if (currentProps && null !== currentResource)
              throw Error(formatProdErrorMessage(529, ""));
            return null;
          case "script":
            return currentProps = pendingProps.async, pendingProps = pendingProps.src, "string" === typeof pendingProps && currentProps && "function" !== typeof currentProps && "symbol" !== typeof currentProps ? (pendingProps = getScriptKey(pendingProps), currentProps = getResourcesFromRoot(
              JSCompiler_inline_result
            ).hoistableScripts, currentResource = currentProps.get(pendingProps), currentResource || (currentResource = {
              type: "script",
              instance: null,
              count: 0,
              state: null
            }, currentProps.set(pendingProps, currentResource)), currentResource) : { type: "void", instance: null, count: 0, state: null };
          default:
            throw Error(formatProdErrorMessage(444, type));
        }
      }
      function getStyleKey(href) {
        return 'href="' + escapeSelectorAttributeValueInsideDoubleQuotes(href) + '"';
      }
      function getStylesheetSelectorFromKey(key) {
        return 'link[rel="stylesheet"][' + key + "]";
      }
      function stylesheetPropsFromRawProps(rawProps) {
        return assign({}, rawProps, {
          "data-precedence": rawProps.precedence,
          precedence: null
        });
      }
      function preloadStylesheet(ownerDocument, key, preloadProps, state) {
        if (key = ownerDocument.querySelector(
          'link[rel="preload"][as="style"][' + key + "]"
        )) {
          if (true !== key[internalLoadPendingKey]) {
            state.loading = 1;
            return;
          }
        } else
          key = ownerDocument.createElement("link"), key[internalLoadPendingKey] = true, key.onload = key.onerror = clearPendingLoadOnNode.bind(null, key), setInitialProperties(key, "link", preloadProps), markNodeAsHoistable(key), ownerDocument.head.appendChild(key);
        state.preload = key;
        key.addEventListener("load", function() {
          return state.loading |= 1;
        });
        key.addEventListener("error", function() {
          return state.loading |= 2;
        });
      }
      function getScriptKey(src) {
        return '[src="' + escapeSelectorAttributeValueInsideDoubleQuotes(src) + '"]';
      }
      function getScriptSelectorFromKey(key) {
        return "script[async]" + key;
      }
      function acquireResource(hoistableRoot, resource, props) {
        resource.count++;
        if (null === resource.instance)
          switch (resource.type) {
            case "style":
              var instance = hoistableRoot.querySelector(
                'style[data-href~="' + escapeSelectorAttributeValueInsideDoubleQuotes(props.href) + '"]'
              );
              if (instance)
                return resource.instance = instance, markNodeAsHoistable(instance), instance;
              var styleProps = assign({}, props, {
                "data-href": props.href,
                "data-precedence": props.precedence,
                href: null,
                precedence: null
              });
              instance = (hoistableRoot.ownerDocument || hoistableRoot).createElement(
                "style"
              );
              markNodeAsHoistable(instance);
              setInitialProperties(instance, "style", styleProps);
              insertStylesheet(instance, props.precedence, hoistableRoot);
              return resource.instance = instance;
            case "stylesheet":
              styleProps = getStyleKey(props.href);
              var instance$274 = hoistableRoot.querySelector(
                getStylesheetSelectorFromKey(styleProps)
              );
              if (instance$274)
                return resource.state.loading |= 4, resource.instance = instance$274, markNodeAsHoistable(instance$274), instance$274;
              instance = stylesheetPropsFromRawProps(props);
              (styleProps = preloadPropsMap.get(styleProps)) && adoptPreloadPropsForStylesheet(instance, styleProps);
              instance$274 = (hoistableRoot.ownerDocument || hoistableRoot).createElement("link");
              markNodeAsHoistable(instance$274);
              var linkInstance = instance$274;
              linkInstance._p = new Promise(function(resolve, reject) {
                linkInstance.onload = resolve;
                linkInstance.onerror = reject;
              });
              setInitialProperties(instance$274, "link", instance);
              resource.state.loading |= 4;
              insertStylesheet(instance$274, props.precedence, hoistableRoot);
              return resource.instance = instance$274;
            case "script":
              instance$274 = getScriptKey(props.src);
              if (styleProps = hoistableRoot.querySelector(
                getScriptSelectorFromKey(instance$274)
              ))
                return resource.instance = styleProps, markNodeAsHoistable(styleProps), styleProps;
              instance = props;
              if (styleProps = preloadPropsMap.get(instance$274))
                instance = assign({}, props), adoptPreloadPropsForScript(instance, styleProps);
              hoistableRoot = hoistableRoot.ownerDocument || hoistableRoot;
              styleProps = hoistableRoot.createElement("script");
              markNodeAsHoistable(styleProps);
              setInitialProperties(styleProps, "link", instance);
              hoistableRoot.head.appendChild(styleProps);
              return resource.instance = styleProps;
            case "void":
              return null;
            default:
              throw Error(formatProdErrorMessage(443, resource.type));
          }
        else
          "stylesheet" === resource.type && 0 === (resource.state.loading & 4) && (instance = resource.instance, resource.state.loading |= 4, insertStylesheet(instance, props.precedence, hoistableRoot));
        return resource.instance;
      }
      function insertStylesheet(instance, precedence, root2) {
        for (var nodes = root2.querySelectorAll(
          'link[rel="stylesheet"][data-precedence],style[data-precedence]'
        ), last = nodes.length ? nodes[nodes.length - 1] : null, prior = last, i = 0; i < nodes.length; i++) {
          var node = nodes[i];
          if (node.dataset.precedence === precedence) prior = node;
          else if (prior !== last) break;
        }
        prior ? prior.parentNode.insertBefore(instance, prior.nextSibling) : (precedence = 9 === root2.nodeType ? root2.head : root2, precedence.insertBefore(instance, precedence.firstChild));
      }
      function adoptPreloadPropsForStylesheet(stylesheetProps, preloadProps) {
        null == stylesheetProps.crossOrigin && (stylesheetProps.crossOrigin = preloadProps.crossOrigin);
        null == stylesheetProps.referrerPolicy && (stylesheetProps.referrerPolicy = preloadProps.referrerPolicy);
        null == stylesheetProps.title && (stylesheetProps.title = preloadProps.title);
      }
      function adoptPreloadPropsForScript(scriptProps, preloadProps) {
        null == scriptProps.crossOrigin && (scriptProps.crossOrigin = preloadProps.crossOrigin);
        null == scriptProps.referrerPolicy && (scriptProps.referrerPolicy = preloadProps.referrerPolicy);
        null == scriptProps.integrity && (scriptProps.integrity = preloadProps.integrity);
      }
      var tagCaches = null;
      function getHydratableHoistableCache(type, keyAttribute, ownerDocument) {
        if (null === tagCaches) {
          var cache = /* @__PURE__ */ new Map();
          var caches = tagCaches = /* @__PURE__ */ new Map();
          caches.set(ownerDocument, cache);
        } else
          caches = tagCaches, cache = caches.get(ownerDocument), cache || (cache = /* @__PURE__ */ new Map(), caches.set(ownerDocument, cache));
        if (cache.has(type)) return cache;
        cache.set(type, null);
        ownerDocument = ownerDocument.getElementsByTagName(type);
        for (caches = 0; caches < ownerDocument.length; caches++) {
          var node = ownerDocument[caches];
          if (!(node[internalHoistableMarker] || node[internalInstanceKey] || "link" === type && "stylesheet" === node.getAttribute("rel")) && "http://www.w3.org/2000/svg" !== node.namespaceURI) {
            var nodeKey = node.getAttribute(keyAttribute) || "";
            nodeKey = type + nodeKey;
            var existing = cache.get(nodeKey);
            existing ? existing.push(node) : cache.set(nodeKey, [node]);
          }
        }
        return cache;
      }
      function mountHoistable(hoistableRoot, type, instance) {
        hoistableRoot = hoistableRoot.ownerDocument || hoistableRoot;
        hoistableRoot.head.insertBefore(
          instance,
          "title" === type ? hoistableRoot.querySelector("head > title") : null
        );
      }
      function isHostHoistableType(type, props, hostContext) {
        if (1 === hostContext || null != props.itemProp) return false;
        switch (type) {
          case "meta":
          case "title":
            return true;
          case "style":
            if ("string" !== typeof props.precedence || "string" !== typeof props.href || "" === props.href)
              break;
            return true;
          case "link":
            if ("string" !== typeof props.rel || "string" !== typeof props.href || "" === props.href || props.onLoad || props.onError)
              break;
            switch (props.rel) {
              case "stylesheet":
                return type = props.disabled, "string" === typeof props.precedence && null == type;
              default:
                return true;
            }
          case "script":
            if (props.async && "function" !== typeof props.async && "symbol" !== typeof props.async && !props.onLoad && !props.onError && props.src && "string" === typeof props.src)
              return true;
        }
        return false;
      }
      function maySuspendCommit(type, props) {
        return "img" === type && null != props.src && "" !== props.src && null == props.onLoad && "lazy" !== props.loading;
      }
      function preloadResource(resource) {
        return "stylesheet" === resource.type && 0 === (resource.state.loading & 3) ? false : true;
      }
      function estimateImageBytes(instance) {
        return (instance.width || 100) * (instance.height || 100) * ("number" === typeof devicePixelRatio ? devicePixelRatio : 1) * 0.25;
      }
      function suspendInstance(state, instance) {
        "function" === typeof instance.decode && (state.imgCount++, instance.complete || (state.imgBytes += estimateImageBytes(instance), state.suspenseyImages.push(instance)), state = onUnsuspendImg.bind(state), instance.decode().then(state, state));
      }
      function suspendResource(state, hoistableRoot, resource, props) {
        if ("stylesheet" === resource.type && ("string" !== typeof props.media || false !== matchMedia(props.media).matches) && 0 === (resource.state.loading & 4)) {
          if (null === resource.instance) {
            var key = getStyleKey(props.href), instance = hoistableRoot.querySelector(
              getStylesheetSelectorFromKey(key)
            );
            if (instance) {
              hoistableRoot = instance._p;
              null !== hoistableRoot && "object" === typeof hoistableRoot && "function" === typeof hoistableRoot.then && (state.count++, state = onUnsuspend.bind(state), hoistableRoot.then(state, state));
              resource.state.loading |= 4;
              resource.instance = instance;
              markNodeAsHoistable(instance);
              return;
            }
            instance = hoistableRoot.ownerDocument || hoistableRoot;
            props = stylesheetPropsFromRawProps(props);
            (key = preloadPropsMap.get(key)) && adoptPreloadPropsForStylesheet(props, key);
            instance = instance.createElement("link");
            markNodeAsHoistable(instance);
            var linkInstance = instance;
            linkInstance._p = new Promise(function(resolve, reject) {
              linkInstance.onload = resolve;
              linkInstance.onerror = reject;
            });
            setInitialProperties(instance, "link", props);
            resource.instance = instance;
          }
          null === state.stylesheets && (state.stylesheets = /* @__PURE__ */ new Map());
          state.stylesheets.set(resource, hoistableRoot);
          (hoistableRoot = resource.state.preload) && 0 === (resource.state.loading & 3) && (state.count++, resource = onUnsuspend.bind(state), hoistableRoot.addEventListener("load", resource), hoistableRoot.addEventListener("error", resource));
        }
      }
      var estimatedBytesWithinLimit = 0;
      function waitForCommitToBeReady(state, timeoutOffset) {
        state.stylesheets && 0 === state.count && insertSuspendedStylesheets(state, state.stylesheets);
        return 0 < state.count || 0 < state.imgCount ? function(commit) {
          var stylesheetTimer = setTimeout(function() {
            state.stylesheets && insertSuspendedStylesheets(state, state.stylesheets);
            if (state.unsuspend) {
              var unsuspend = state.unsuspend;
              state.unsuspend = null;
              unsuspend();
            }
          }, 6e4 + timeoutOffset);
          0 < state.imgBytes && 0 === estimatedBytesWithinLimit && (estimatedBytesWithinLimit = 62500 * estimateBandwidth());
          var imgTimer = setTimeout(
            function() {
              state.waitingForImages = false;
              if (0 === state.count && (state.stylesheets && insertSuspendedStylesheets(state, state.stylesheets), state.unsuspend)) {
                var unsuspend = state.unsuspend;
                state.unsuspend = null;
                unsuspend();
              }
            },
            (state.imgBytes > estimatedBytesWithinLimit ? 50 : 800) + timeoutOffset
          );
          state.unsuspend = commit;
          return function() {
            state.unsuspend = null;
            clearTimeout(stylesheetTimer);
            clearTimeout(imgTimer);
          };
        } : null;
      }
      function checkIfFullyUnsuspended(state) {
        if (0 === state.count && (0 === state.imgCount || !state.waitingForImages)) {
          if (state.stylesheets) insertSuspendedStylesheets(state, state.stylesheets);
          else if (state.unsuspend) {
            var unsuspend = state.unsuspend;
            state.unsuspend = null;
            unsuspend();
          }
        }
      }
      function onUnsuspend() {
        this.count--;
        checkIfFullyUnsuspended(this);
      }
      function onUnsuspendImg() {
        this.imgCount--;
        checkIfFullyUnsuspended(this);
      }
      var precedencesByRoot = null;
      function insertSuspendedStylesheets(state, resources) {
        state.stylesheets = null;
        null !== state.unsuspend && (state.count++, precedencesByRoot = /* @__PURE__ */ new Map(), resources.forEach(insertStylesheetIntoRoot, state), precedencesByRoot = null, onUnsuspend.call(state));
      }
      function insertStylesheetIntoRoot(root2, resource) {
        if (!(resource.state.loading & 4)) {
          var precedences = precedencesByRoot.get(root2);
          if (precedences) var last = precedences.get(null);
          else {
            precedences = /* @__PURE__ */ new Map();
            precedencesByRoot.set(root2, precedences);
            for (var nodes = root2.querySelectorAll(
              "link[data-precedence],style[data-precedence]"
            ), i = 0; i < nodes.length; i++) {
              var node = nodes[i];
              if ("LINK" === node.nodeName || "not all" !== node.getAttribute("media"))
                precedences.set(node.dataset.precedence, node), last = node;
            }
            last && precedences.set(null, last);
          }
          nodes = resource.instance;
          node = nodes.getAttribute("data-precedence");
          i = precedences.get(node) || last;
          i === last && precedences.set(null, nodes);
          precedences.set(node, nodes);
          this.count++;
          last = onUnsuspend.bind(this);
          nodes.addEventListener("load", last);
          nodes.addEventListener("error", last);
          i ? i.parentNode.insertBefore(nodes, i.nextSibling) : (root2 = 9 === root2.nodeType ? root2.head : root2, root2.insertBefore(nodes, root2.firstChild));
          resource.state.loading |= 4;
        }
      }
      var HostTransitionContext = {
        $$typeof: REACT_CONTEXT_TYPE,
        Provider: null,
        Consumer: null,
        _currentValue: sharedNotPendingObject,
        _currentValue2: sharedNotPendingObject,
        _threadCount: 0
      };
      function FiberRootNode(containerInfo, tag, hydrate, identifierPrefix, onUncaughtError, onCaughtError, onRecoverableError, onDefaultTransitionIndicator, formState) {
        this.tag = 1;
        this.containerInfo = containerInfo;
        this.pingCache = this.current = this.pendingChildren = null;
        this.timeoutHandle = -1;
        this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null;
        this.callbackPriority = 0;
        this.expirationTimes = createLaneMap(-1);
        this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
        this.entanglements = createLaneMap(0);
        this.hiddenUpdates = createLaneMap(null);
        this.identifierPrefix = identifierPrefix;
        this.onUncaughtError = onUncaughtError;
        this.onCaughtError = onCaughtError;
        this.onRecoverableError = onRecoverableError;
        this.pooledCache = null;
        this.pooledCacheLanes = 0;
        this.formState = formState;
        this.transitionTypes = null;
        this.incompleteTransitions = /* @__PURE__ */ new Map();
      }
      function createFiberRoot(containerInfo, tag, hydrate, initialChildren, hydrationCallbacks, isStrictMode, identifierPrefix, formState, onUncaughtError, onCaughtError, onRecoverableError, onDefaultTransitionIndicator) {
        containerInfo = new FiberRootNode(
          containerInfo,
          tag,
          hydrate,
          identifierPrefix,
          onUncaughtError,
          onCaughtError,
          onRecoverableError,
          onDefaultTransitionIndicator,
          formState
        );
        tag = 1;
        true === isStrictMode && (tag |= 24);
        isStrictMode = createFiberImplClass(3, null, null, tag);
        containerInfo.current = isStrictMode;
        isStrictMode.stateNode = containerInfo;
        tag = createCache();
        tag.refCount++;
        containerInfo.pooledCache = tag;
        tag.refCount++;
        isStrictMode.memoizedState = {
          element: initialChildren,
          isDehydrated: hydrate,
          cache: tag
        };
        initializeUpdateQueue(isStrictMode);
        return containerInfo;
      }
      function getContextForSubtree(parentComponent) {
        if (!parentComponent) return emptyContextObject;
        parentComponent = emptyContextObject;
        return parentComponent;
      }
      function updateContainerImpl(rootFiber, lane, element, container, parentComponent, callback) {
        parentComponent = getContextForSubtree(parentComponent);
        null === container.context ? container.context = parentComponent : container.pendingContext = parentComponent;
        container = createUpdate(lane);
        container.payload = { element };
        callback = void 0 === callback ? null : callback;
        null !== callback && (container.callback = callback);
        element = enqueueUpdate(rootFiber, container, lane);
        null !== element && (scheduleUpdateOnFiber(element, rootFiber, lane), entangleTransitions(element, rootFiber, lane));
      }
      function markRetryLaneImpl(fiber, retryLane) {
        fiber = fiber.memoizedState;
        if (null !== fiber && null !== fiber.dehydrated) {
          var a = fiber.retryLane;
          fiber.retryLane = 0 !== a && a < retryLane ? a : retryLane;
        }
      }
      function markRetryLaneIfNotHydrated(fiber, retryLane) {
        markRetryLaneImpl(fiber, retryLane);
        (fiber = fiber.alternate) && markRetryLaneImpl(fiber, retryLane);
      }
      function attemptContinuousHydration(fiber) {
        if (13 === fiber.tag || 31 === fiber.tag) {
          var root2 = enqueueConcurrentRenderForLane(fiber, 67108864);
          null !== root2 && scheduleUpdateOnFiber(root2, fiber, 67108864);
          markRetryLaneIfNotHydrated(fiber, 67108864);
        }
      }
      function attemptHydrationAtCurrentPriority(fiber) {
        if (13 === fiber.tag || 31 === fiber.tag) {
          var lane = requestUpdateLane();
          lane = getBumpedLaneForHydrationByLane(lane);
          var root2 = enqueueConcurrentRenderForLane(fiber, lane);
          null !== root2 && scheduleUpdateOnFiber(root2, fiber, lane);
          markRetryLaneIfNotHydrated(fiber, lane);
        }
      }
      var _enabled = true;
      function dispatchDiscreteEvent(domEventName, eventSystemFlags, container, nativeEvent) {
        var prevTransition = ReactSharedInternals.T;
        ReactSharedInternals.T = null;
        var previousPriority = ReactDOMSharedInternals.p;
        try {
          ReactDOMSharedInternals.p = 2, dispatchEvent(domEventName, eventSystemFlags, container, nativeEvent);
        } finally {
          ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = prevTransition;
        }
      }
      function dispatchContinuousEvent(domEventName, eventSystemFlags, container, nativeEvent) {
        var prevTransition = ReactSharedInternals.T;
        ReactSharedInternals.T = null;
        var previousPriority = ReactDOMSharedInternals.p;
        try {
          ReactDOMSharedInternals.p = 8, dispatchEvent(domEventName, eventSystemFlags, container, nativeEvent);
        } finally {
          ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = prevTransition;
        }
      }
      function dispatchEvent(domEventName, eventSystemFlags, targetContainer, nativeEvent) {
        if (_enabled) {
          var blockedOn = findInstanceBlockingEvent(nativeEvent);
          if (null === blockedOn)
            dispatchEventForPluginEventSystem(
              domEventName,
              eventSystemFlags,
              nativeEvent,
              return_targetInst,
              targetContainer
            ), clearIfContinuousEvent(domEventName, nativeEvent);
          else if (queueIfContinuousEvent(
            blockedOn,
            domEventName,
            eventSystemFlags,
            targetContainer,
            nativeEvent
          ))
            nativeEvent.stopPropagation();
          else if (clearIfContinuousEvent(domEventName, nativeEvent), eventSystemFlags & 4 && -1 < discreteReplayableEvents.indexOf(domEventName)) {
            for (; null !== blockedOn; ) {
              var fiber = getInstanceFromNode(blockedOn);
              if (null !== fiber)
                switch (fiber.tag) {
                  case 3:
                    fiber = fiber.stateNode;
                    if (fiber.current.memoizedState.isDehydrated) {
                      var lanes = getHighestPriorityLanes(fiber.pendingLanes);
                      if (0 !== lanes) {
                        var root2 = fiber;
                        root2.pendingLanes |= 2;
                        for (root2.entangledLanes |= 2; lanes; ) {
                          var lane = 1 << 31 - clz32(lanes);
                          root2.entanglements[1] |= lane;
                          lanes &= ~lane;
                        }
                        ensureRootIsScheduled(fiber);
                        0 === (executionContext & 6) && (workInProgressRootRenderTargetTime = now() + 500, flushSyncWorkAcrossRoots_impl(0, false));
                      }
                    }
                    break;
                  case 31:
                  case 13:
                    root2 = enqueueConcurrentRenderForLane(fiber, 2), null !== root2 && scheduleUpdateOnFiber(root2, fiber, 2), flushSyncWork$1(), markRetryLaneIfNotHydrated(fiber, 2);
                }
              fiber = findInstanceBlockingEvent(nativeEvent);
              null === fiber && dispatchEventForPluginEventSystem(
                domEventName,
                eventSystemFlags,
                nativeEvent,
                return_targetInst,
                targetContainer
              );
              if (fiber === blockedOn) break;
              blockedOn = fiber;
            }
            null !== blockedOn && nativeEvent.stopPropagation();
          } else
            dispatchEventForPluginEventSystem(
              domEventName,
              eventSystemFlags,
              nativeEvent,
              null,
              targetContainer
            );
        }
      }
      function findInstanceBlockingEvent(nativeEvent) {
        nativeEvent = getEventTarget(nativeEvent);
        return findInstanceBlockingTarget(nativeEvent);
      }
      var return_targetInst = null;
      function findInstanceBlockingTarget(targetNode) {
        return_targetInst = null;
        targetNode = getClosestInstanceFromNode(targetNode);
        if (null !== targetNode) {
          var nearestMounted = getNearestMountedFiber(targetNode);
          if (null === nearestMounted) targetNode = null;
          else {
            var tag = nearestMounted.tag;
            if (13 === tag) {
              targetNode = getSuspenseInstanceFromFiber(nearestMounted);
              if (null !== targetNode) return targetNode;
              targetNode = null;
            } else if (31 === tag) {
              targetNode = getActivityInstanceFromFiber(nearestMounted);
              if (null !== targetNode) return targetNode;
              targetNode = null;
            } else if (3 === tag) {
              if (nearestMounted.stateNode.current.memoizedState.isDehydrated)
                return 3 === nearestMounted.tag ? nearestMounted.stateNode.containerInfo : null;
              targetNode = null;
            } else nearestMounted !== targetNode && (targetNode = null);
          }
        }
        return_targetInst = targetNode;
        return null;
      }
      function getEventPriority(domEventName) {
        switch (domEventName) {
          case "beforetoggle":
          case "cancel":
          case "click":
          case "close":
          case "contextmenu":
          case "copy":
          case "cut":
          case "auxclick":
          case "dblclick":
          case "dragend":
          case "dragstart":
          case "drop":
          case "focusin":
          case "focusout":
          case "input":
          case "invalid":
          case "keydown":
          case "keypress":
          case "keyup":
          case "mousedown":
          case "mouseup":
          case "paste":
          case "pause":
          case "play":
          case "pointercancel":
          case "pointerdown":
          case "pointerup":
          case "ratechange":
          case "reset":
          case "seeked":
          case "submit":
          case "toggle":
          case "touchcancel":
          case "touchend":
          case "touchstart":
          case "volumechange":
          case "change":
          case "selectionchange":
          case "textInput":
          case "compositionstart":
          case "compositionend":
          case "compositionupdate":
          case "beforeblur":
          case "afterblur":
          case "beforeinput":
          case "blur":
          case "fullscreenchange":
          case "fullscreenerror":
          case "focus":
          case "hashchange":
          case "popstate":
          case "select":
          case "selectstart":
            return 2;
          case "drag":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "mousemove":
          case "mouseout":
          case "mouseover":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "resize":
          case "scroll":
          case "touchmove":
          case "wheel":
          case "mouseenter":
          case "mouseleave":
          case "pointerenter":
          case "pointerleave":
            return 8;
          case "message":
            switch (getCurrentPriorityLevel()) {
              case ImmediatePriority:
                return 2;
              case UserBlockingPriority:
                return 8;
              case NormalPriority$1:
              case LowPriority:
                return 32;
              case IdlePriority:
                return 268435456;
              default:
                return 32;
            }
          default:
            return 32;
        }
      }
      var hasScheduledReplayAttempt = false;
      var queuedFocus = null;
      var queuedDrag = null;
      var queuedMouse = null;
      var queuedPointers = /* @__PURE__ */ new Map();
      var queuedPointerCaptures = /* @__PURE__ */ new Map();
      var queuedExplicitHydrationTargets = [];
      var discreteReplayableEvents = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
        " "
      );
      function clearIfContinuousEvent(domEventName, nativeEvent) {
        switch (domEventName) {
          case "focusin":
          case "focusout":
            queuedFocus = null;
            break;
          case "dragenter":
          case "dragleave":
            queuedDrag = null;
            break;
          case "mouseover":
          case "mouseout":
            queuedMouse = null;
            break;
          case "pointerover":
          case "pointerout":
            queuedPointers.delete(nativeEvent.pointerId);
            break;
          case "gotpointercapture":
          case "lostpointercapture":
            queuedPointerCaptures.delete(nativeEvent.pointerId);
        }
      }
      function accumulateOrCreateContinuousQueuedReplayableEvent(existingQueuedEvent, blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent) {
        if (null === existingQueuedEvent || existingQueuedEvent.nativeEvent !== nativeEvent)
          return existingQueuedEvent = {
            blockedOn,
            domEventName,
            eventSystemFlags,
            nativeEvent,
            targetContainers: [targetContainer]
          }, null !== blockedOn && (blockedOn = getInstanceFromNode(blockedOn), null !== blockedOn && attemptContinuousHydration(blockedOn)), existingQueuedEvent;
        existingQueuedEvent.eventSystemFlags |= eventSystemFlags;
        blockedOn = existingQueuedEvent.targetContainers;
        null !== targetContainer && -1 === blockedOn.indexOf(targetContainer) && blockedOn.push(targetContainer);
        return existingQueuedEvent;
      }
      function queueIfContinuousEvent(blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent) {
        switch (domEventName) {
          case "focusin":
            return queuedFocus = accumulateOrCreateContinuousQueuedReplayableEvent(
              queuedFocus,
              blockedOn,
              domEventName,
              eventSystemFlags,
              targetContainer,
              nativeEvent
            ), true;
          case "dragenter":
            return queuedDrag = accumulateOrCreateContinuousQueuedReplayableEvent(
              queuedDrag,
              blockedOn,
              domEventName,
              eventSystemFlags,
              targetContainer,
              nativeEvent
            ), true;
          case "mouseover":
            return queuedMouse = accumulateOrCreateContinuousQueuedReplayableEvent(
              queuedMouse,
              blockedOn,
              domEventName,
              eventSystemFlags,
              targetContainer,
              nativeEvent
            ), true;
          case "pointerover":
            var pointerId = nativeEvent.pointerId;
            queuedPointers.set(
              pointerId,
              accumulateOrCreateContinuousQueuedReplayableEvent(
                queuedPointers.get(pointerId) || null,
                blockedOn,
                domEventName,
                eventSystemFlags,
                targetContainer,
                nativeEvent
              )
            );
            return true;
          case "gotpointercapture":
            return pointerId = nativeEvent.pointerId, queuedPointerCaptures.set(
              pointerId,
              accumulateOrCreateContinuousQueuedReplayableEvent(
                queuedPointerCaptures.get(pointerId) || null,
                blockedOn,
                domEventName,
                eventSystemFlags,
                targetContainer,
                nativeEvent
              )
            ), true;
        }
        return false;
      }
      function attemptExplicitHydrationTarget(queuedTarget) {
        var targetInst = getClosestInstanceFromNode(queuedTarget.target);
        if (null !== targetInst) {
          var nearestMounted = getNearestMountedFiber(targetInst);
          if (null !== nearestMounted) {
            if (targetInst = nearestMounted.tag, 13 === targetInst) {
              if (targetInst = getSuspenseInstanceFromFiber(nearestMounted), null !== targetInst) {
                queuedTarget.blockedOn = targetInst;
                runWithPriority(queuedTarget.priority, function() {
                  attemptHydrationAtCurrentPriority(nearestMounted);
                });
                return;
              }
            } else if (31 === targetInst) {
              if (targetInst = getActivityInstanceFromFiber(nearestMounted), null !== targetInst) {
                queuedTarget.blockedOn = targetInst;
                runWithPriority(queuedTarget.priority, function() {
                  attemptHydrationAtCurrentPriority(nearestMounted);
                });
                return;
              }
            } else if (3 === targetInst && nearestMounted.stateNode.current.memoizedState.isDehydrated) {
              queuedTarget.blockedOn = 3 === nearestMounted.tag ? nearestMounted.stateNode.containerInfo : null;
              return;
            }
          }
        }
        queuedTarget.blockedOn = null;
      }
      function attemptReplayContinuousQueuedEvent(queuedEvent) {
        if (null !== queuedEvent.blockedOn) return false;
        for (var targetContainers = queuedEvent.targetContainers; 0 < targetContainers.length; ) {
          var nextBlockedOn = findInstanceBlockingEvent(queuedEvent.nativeEvent);
          if (null === nextBlockedOn) {
            nextBlockedOn = queuedEvent.nativeEvent;
            var nativeEventClone = new nextBlockedOn.constructor(
              nextBlockedOn.type,
              nextBlockedOn
            );
            currentReplayingEvent = nativeEventClone;
            nextBlockedOn.target.dispatchEvent(nativeEventClone);
            currentReplayingEvent = null;
          } else
            return targetContainers = getInstanceFromNode(nextBlockedOn), null !== targetContainers && attemptContinuousHydration(targetContainers), queuedEvent.blockedOn = nextBlockedOn, false;
          targetContainers.shift();
        }
        return true;
      }
      function attemptReplayContinuousQueuedEventInMap(queuedEvent, key, map) {
        attemptReplayContinuousQueuedEvent(queuedEvent) && map.delete(key);
      }
      function replayUnblockedEvents() {
        hasScheduledReplayAttempt = false;
        null !== queuedFocus && attemptReplayContinuousQueuedEvent(queuedFocus) && (queuedFocus = null);
        null !== queuedDrag && attemptReplayContinuousQueuedEvent(queuedDrag) && (queuedDrag = null);
        null !== queuedMouse && attemptReplayContinuousQueuedEvent(queuedMouse) && (queuedMouse = null);
        queuedPointers.forEach(attemptReplayContinuousQueuedEventInMap);
        queuedPointerCaptures.forEach(attemptReplayContinuousQueuedEventInMap);
      }
      function scheduleCallbackIfUnblocked(queuedEvent, unblocked) {
        queuedEvent.blockedOn === unblocked && (queuedEvent.blockedOn = null, hasScheduledReplayAttempt || (hasScheduledReplayAttempt = true, Scheduler.unstable_scheduleCallback(
          Scheduler.unstable_NormalPriority,
          replayUnblockedEvents
        )));
      }
      var lastScheduledReplayQueue = null;
      function scheduleReplayQueueIfNeeded(formReplayingQueue) {
        lastScheduledReplayQueue !== formReplayingQueue && (lastScheduledReplayQueue = formReplayingQueue, Scheduler.unstable_scheduleCallback(
          Scheduler.unstable_NormalPriority,
          function() {
            lastScheduledReplayQueue === formReplayingQueue && (lastScheduledReplayQueue = null);
            for (var i = 0; i < formReplayingQueue.length; i += 3) {
              var form = formReplayingQueue[i], submitterOrAction = formReplayingQueue[i + 1], formData = formReplayingQueue[i + 2];
              if ("function" !== typeof submitterOrAction)
                if (null === findInstanceBlockingTarget(submitterOrAction || form))
                  continue;
                else break;
              var formInst = getInstanceFromNode(form);
              null !== formInst && (formReplayingQueue.splice(i, 3), i -= 3, startHostTransition(
                formInst,
                {
                  pending: true,
                  data: formData,
                  method: form.method,
                  action: submitterOrAction
                },
                submitterOrAction,
                formData
              ));
            }
          }
        ));
      }
      function retryIfBlockedOn(unblocked) {
        function unblock(queuedEvent) {
          return scheduleCallbackIfUnblocked(queuedEvent, unblocked);
        }
        null !== queuedFocus && scheduleCallbackIfUnblocked(queuedFocus, unblocked);
        null !== queuedDrag && scheduleCallbackIfUnblocked(queuedDrag, unblocked);
        null !== queuedMouse && scheduleCallbackIfUnblocked(queuedMouse, unblocked);
        queuedPointers.forEach(unblock);
        queuedPointerCaptures.forEach(unblock);
        for (var i = 0; i < queuedExplicitHydrationTargets.length; i++) {
          var queuedTarget = queuedExplicitHydrationTargets[i];
          queuedTarget.blockedOn === unblocked && (queuedTarget.blockedOn = null);
        }
        for (; 0 < queuedExplicitHydrationTargets.length && (i = queuedExplicitHydrationTargets[0], null === i.blockedOn); )
          attemptExplicitHydrationTarget(i), null === i.blockedOn && queuedExplicitHydrationTargets.shift();
        i = (unblocked.ownerDocument || unblocked).$$reactFormReplay;
        if (null != i)
          for (queuedTarget = 0; queuedTarget < i.length; queuedTarget += 3) {
            var form = i[queuedTarget], submitterOrAction = i[queuedTarget + 1], formProps = form[internalPropsKey] || null;
            if ("function" === typeof submitterOrAction)
              formProps || scheduleReplayQueueIfNeeded(i);
            else if (formProps) {
              var action = null;
              if (submitterOrAction && submitterOrAction.hasAttribute("formAction"))
                if (form = submitterOrAction, formProps = submitterOrAction[internalPropsKey] || null)
                  action = formProps.formAction;
                else {
                  if (null !== findInstanceBlockingTarget(form)) continue;
                }
              else action = formProps.action;
              "function" === typeof action ? i[queuedTarget + 1] = action : (i.splice(queuedTarget, 3), queuedTarget -= 3);
              scheduleReplayQueueIfNeeded(i);
            }
          }
      }
      function defaultOnDefaultTransitionIndicator() {
        function handleNavigate(event) {
          event.canIntercept && "react-transition" === event.info && event.intercept({
            handler: function() {
              return new Promise(function(resolve) {
                return pendingResolve = resolve;
              });
            },
            focusReset: "manual",
            scroll: "manual"
          });
        }
        function handleNavigateComplete() {
          null !== pendingResolve && (pendingResolve(), pendingResolve = null);
          isCancelled || setTimeout(startFakeNavigation, 20);
        }
        function startFakeNavigation() {
          if (!isCancelled && !navigation.transition) {
            var currentEntry = navigation.currentEntry;
            currentEntry && null != currentEntry.url && navigation.navigate(currentEntry.url, {
              state: currentEntry.getState(),
              info: "react-transition",
              history: "replace"
            });
          }
        }
        if ("object" === typeof navigation) {
          var isCancelled = false, pendingResolve = null;
          navigation.addEventListener("navigate", handleNavigate);
          navigation.addEventListener("navigatesuccess", handleNavigateComplete);
          navigation.addEventListener("navigateerror", handleNavigateComplete);
          setTimeout(startFakeNavigation, 100);
          return function() {
            isCancelled = true;
            navigation.removeEventListener("navigate", handleNavigate);
            navigation.removeEventListener("navigatesuccess", handleNavigateComplete);
            navigation.removeEventListener("navigateerror", handleNavigateComplete);
            null !== pendingResolve && (pendingResolve(), pendingResolve = null);
          };
        }
      }
      function ReactDOMRoot(internalRoot) {
        this._internalRoot = internalRoot;
      }
      ReactDOMHydrationRoot.prototype.render = ReactDOMRoot.prototype.render = function(children) {
        var root2 = this._internalRoot;
        if (null === root2) throw Error(formatProdErrorMessage(409));
        var current = root2.current, lane = requestUpdateLane();
        updateContainerImpl(current, lane, children, root2, null, null);
      };
      ReactDOMHydrationRoot.prototype.unmount = ReactDOMRoot.prototype.unmount = function() {
        var root2 = this._internalRoot;
        if (null !== root2) {
          this._internalRoot = null;
          var container = root2.containerInfo;
          updateContainerImpl(root2.current, 2, null, root2, null, null);
          flushSyncWork$1();
          container[internalContainerInstanceKey] = null;
        }
      };
      function ReactDOMHydrationRoot(internalRoot) {
        this._internalRoot = internalRoot;
      }
      ReactDOMHydrationRoot.prototype.unstable_scheduleHydration = function(target) {
        if (target) {
          var updatePriority = resolveUpdatePriority();
          target = { blockedOn: null, target, priority: updatePriority };
          for (var i = 0; i < queuedExplicitHydrationTargets.length && 0 !== updatePriority && updatePriority < queuedExplicitHydrationTargets[i].priority; i++) ;
          queuedExplicitHydrationTargets.splice(i, 0, target);
          0 === i && attemptExplicitHydrationTarget(target);
        }
      };
      var isomorphicReactPackageVersion$jscomp$inline_2043 = React6.version;
      if ("19.3.0" !== isomorphicReactPackageVersion$jscomp$inline_2043)
        throw Error(
          formatProdErrorMessage(
            527,
            isomorphicReactPackageVersion$jscomp$inline_2043,
            "19.3.0"
          )
        );
      ReactDOMSharedInternals.findDOMNode = function(componentOrElement) {
        var fiber = componentOrElement._reactInternals;
        if (void 0 === fiber) {
          if ("function" === typeof componentOrElement.render)
            throw Error(formatProdErrorMessage(188));
          componentOrElement = Object.keys(componentOrElement).join(",");
          throw Error(formatProdErrorMessage(268, componentOrElement));
        }
        componentOrElement = findCurrentFiberUsingSlowPath(fiber);
        componentOrElement = null !== componentOrElement ? findCurrentHostFiberImpl(componentOrElement) : null;
        componentOrElement = null === componentOrElement ? null : componentOrElement.stateNode;
        return componentOrElement;
      };
      var internals$jscomp$inline_2586 = {
        bundleType: 0,
        version: "19.3.0",
        rendererPackageName: "react-dom",
        currentDispatcherRef: ReactSharedInternals,
        reconcilerVersion: "19.3.0"
      };
      if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
        hook$jscomp$inline_2587 = __REACT_DEVTOOLS_GLOBAL_HOOK__;
        if (!hook$jscomp$inline_2587.isDisabled && hook$jscomp$inline_2587.supportsFiber)
          try {
            rendererID = hook$jscomp$inline_2587.inject(
              internals$jscomp$inline_2586
            ), injectedHook = hook$jscomp$inline_2587;
          } catch (err) {
          }
      }
      var hook$jscomp$inline_2587;
      exports.createRoot = function(container, options2) {
        if (!isValidContainer(container)) throw Error(formatProdErrorMessage(299));
        var isStrictMode = false, identifierPrefix = "", onUncaughtError = defaultOnUncaughtError, onCaughtError = defaultOnCaughtError, onRecoverableError = defaultOnRecoverableError;
        null !== options2 && void 0 !== options2 && (true === options2.unstable_strictMode && (isStrictMode = true), void 0 !== options2.identifierPrefix && (identifierPrefix = options2.identifierPrefix), void 0 !== options2.onUncaughtError && (onUncaughtError = options2.onUncaughtError), void 0 !== options2.onCaughtError && (onCaughtError = options2.onCaughtError), void 0 !== options2.onRecoverableError && (onRecoverableError = options2.onRecoverableError));
        options2 = createFiberRoot(
          container,
          1,
          false,
          null,
          null,
          isStrictMode,
          identifierPrefix,
          null,
          onUncaughtError,
          onCaughtError,
          onRecoverableError,
          defaultOnDefaultTransitionIndicator
        );
        container[internalContainerInstanceKey] = options2.current;
        listenToAllSupportedEvents(container);
        return new ReactDOMRoot(options2);
      };
      exports.hydrateRoot = function(container, initialChildren, options2) {
        if (!isValidContainer(container)) throw Error(formatProdErrorMessage(299));
        var isStrictMode = false, identifierPrefix = "", onUncaughtError = defaultOnUncaughtError, onCaughtError = defaultOnCaughtError, onRecoverableError = defaultOnRecoverableError, formState = null;
        null !== options2 && void 0 !== options2 && (true === options2.unstable_strictMode && (isStrictMode = true), void 0 !== options2.identifierPrefix && (identifierPrefix = options2.identifierPrefix), void 0 !== options2.onUncaughtError && (onUncaughtError = options2.onUncaughtError), void 0 !== options2.onCaughtError && (onCaughtError = options2.onCaughtError), void 0 !== options2.onRecoverableError && (onRecoverableError = options2.onRecoverableError), void 0 !== options2.formState && (formState = options2.formState));
        initialChildren = createFiberRoot(
          container,
          1,
          true,
          initialChildren,
          null != options2 ? options2 : null,
          isStrictMode,
          identifierPrefix,
          formState,
          onUncaughtError,
          onCaughtError,
          onRecoverableError,
          defaultOnDefaultTransitionIndicator
        );
        initialChildren.context = getContextForSubtree(null);
        options2 = initialChildren.current;
        isStrictMode = requestUpdateLane();
        isStrictMode = getBumpedLaneForHydrationByLane(isStrictMode);
        identifierPrefix = createUpdate(isStrictMode);
        identifierPrefix.callback = null;
        enqueueUpdate(options2, identifierPrefix, isStrictMode);
        options2 = isStrictMode;
        initialChildren.current.lanes = options2;
        markRootUpdated$1(initialChildren, options2);
        ensureRootIsScheduled(initialChildren);
        container[internalContainerInstanceKey] = initialChildren.current;
        listenToAllSupportedEvents(container);
        return new ReactDOMHydrationRoot(initialChildren);
      };
      exports.version = "19.3.0";
    }
  });

  // C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/node_modules/react-dom/client.js
  var require_client = __commonJS({
    "C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/node_modules/react-dom/client.js"(exports, module) {
      "use strict";
      function checkDCE() {
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
          return;
        }
        if (false) {
          throw new Error("^_^");
        }
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
        } catch (err) {
          console.error(err);
        }
      }
      if (true) {
        checkDCE();
        module.exports = require_react_dom_client_production();
      } else {
        module.exports = null;
      }
    }
  });

  // C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/node_modules/react/cjs/react-jsx-runtime.production.js
  var require_react_jsx_runtime_production = __commonJS({
    "C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/node_modules/react/cjs/react-jsx-runtime.production.js"(exports) {
      "use strict";
      var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element");
      var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
      function jsxProd(type, config, maybeKey) {
        var key = null;
        void 0 !== maybeKey && (key = "" + maybeKey);
        void 0 !== config.key && (key = "" + config.key);
        if ("key" in config) {
          maybeKey = {};
          for (var propName in config)
            "key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        config = maybeKey.ref;
        return {
          $$typeof: REACT_ELEMENT_TYPE,
          type,
          key,
          ref: void 0 !== config ? config : null,
          props: maybeKey
        };
      }
      exports.Fragment = REACT_FRAGMENT_TYPE;
      exports.jsx = jsxProd;
      exports.jsxs = jsxProd;
    }
  });

  // C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/node_modules/react/jsx-runtime.js
  var require_jsx_runtime = __commonJS({
    "C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/node_modules/react/jsx-runtime.js"(exports, module) {
      "use strict";
      if (true) {
        module.exports = require_react_jsx_runtime_production();
      } else {
        module.exports = null;
      }
    }
  });

  // C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/src/main.tsx
  var import_react8 = __toESM(require_react(), 1);
  var import_client = __toESM(require_client(), 1);

  // C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/src/App.tsx
  var import_react7 = __toESM(require_react(), 1);

  // C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/src/utils/calculators.ts
  function calculateMAP(sbp, dbp) {
    if (!sbp || !dbp) return 0;
    return Math.round((sbp + 2 * dbp) / 3 * 10) / 10;
  }
  function calculateNEWS2(patient) {
    const breakdown = [];
    let score = 0;
    let hasSingleParam3 = false;
    const rr = patient.respiratoryRate;
    let rrScore = 0;
    let rrDesc = `${rr} l\u1EA7n/ph\xFAt (B\xECnh th\u01B0\u1EDDng: 12-20)`;
    if (rr <= 8) {
      rrScore = 3;
      rrDesc = `${rr} l\u1EA7n/ph\xFAt (Nguy hi\u1EC3m: \u2264 8)`;
    } else if (rr >= 9 && rr <= 11) {
      rrScore = 1;
      rrDesc = `${rr} l\u1EA7n/ph\xFAt (H\u01A1i ch\u1EADm: 9-11)`;
    } else if (rr >= 12 && rr <= 20) {
      rrScore = 0;
    } else if (rr >= 21 && rr <= 24) {
      rrScore = 2;
      rrDesc = `${rr} l\u1EA7n/ph\xFAt (T\u0103ng nh\u1EB9-v\u1EEBa: 21-24)`;
    } else if (rr >= 25) {
      rrScore = 3;
      rrDesc = `${rr} l\u1EA7n/ph\xFAt (Th\u1EDF r\u1EA5t nhanh: \u2265 25)`;
    }
    score += rrScore;
    if (rrScore === 3) hasSingleParam3 = true;
    breakdown.push({ name: "T\u1EA7n s\u1ED1 th\u1EDF", score: rrScore, description: rrDesc, isRedFlag: rrScore === 3 });
    const spo2 = patient.spo2;
    let spo2Score = 0;
    let spo2Desc = `${spo2}%`;
    if (patient.copdOrHypercapnicRisk) {
      if (spo2 <= 83) {
        spo2Score = 3;
        spo2Desc = `${spo2}% (R\u1EA5t th\u1EA5p: \u2264 83%)`;
      } else if (spo2 >= 84 && spo2 <= 85) {
        spo2Score = 2;
        spo2Desc = `${spo2}% (Th\u1EA5p: 84-85%)`;
      } else if (spo2 >= 86 && spo2 <= 87) {
        spo2Score = 1;
        spo2Desc = `${spo2}% (H\u01A1i th\u1EA5p: 86-87%)`;
      } else if (spo2 >= 88 && spo2 <= 92) {
        spo2Score = 0;
        spo2Desc = `${spo2}% (\u0110\u1EA1t \u0111\xEDch t\u0103ng CO2: 88-92%)`;
      } else if (spo2 >= 93 && spo2 <= 94) {
        spo2Score = patient.onSupplementalOxygen ? 1 : 0;
        spo2Desc = `${spo2}% ${patient.onSupplementalOxygen ? "(Cao tr\xEAn oxy)" : "(B\xECnh th\u01B0\u1EDDng)"}`;
      } else if (spo2 >= 95 && spo2 <= 96) {
        spo2Score = patient.onSupplementalOxygen ? 2 : 0;
        spo2Desc = `${spo2}% ${patient.onSupplementalOxygen ? "(Qu\xE1 cao tr\xEAn oxy)" : "(B\xECnh th\u01B0\u1EDDng)"}`;
      } else if (spo2 >= 97) {
        spo2Score = patient.onSupplementalOxygen ? 3 : 0;
        spo2Desc = `${spo2}% ${patient.onSupplementalOxygen ? "(Nguy c\u01A1 \u1EE9c ch\u1EBF h\xF4 h\u1EA5p tr\xEAn oxy)" : "(B\xECnh th\u01B0\u1EDDng)"}`;
      }
    } else {
      if (spo2 <= 91) {
        spo2Score = 3;
        spo2Desc = `${spo2}% (R\u1EA5t th\u1EA5p: \u2264 91%)`;
      } else if (spo2 >= 92 && spo2 <= 93) {
        spo2Score = 2;
        spo2Desc = `${spo2}% (Th\u1EA5p: 92-93%)`;
      } else if (spo2 >= 94 && spo2 <= 95) {
        spo2Score = 1;
        spo2Desc = `${spo2}% (H\u01A1i th\u1EA5p: 94-95%)`;
      } else {
        spo2Score = 0;
        spo2Desc = `${spo2}% (B\xECnh th\u01B0\u1EDDng: \u2265 96%)`;
      }
    }
    score += spo2Score;
    if (spo2Score === 3) hasSingleParam3 = true;
    breakdown.push({ name: "\u0110\u1ED9 b\xE3o h\xF2a Oxy (SpO2)", score: spo2Score, description: spo2Desc, isRedFlag: spo2Score === 3 });
    const o2Score = patient.onSupplementalOxygen ? 2 : 0;
    score += o2Score;
    breakdown.push({
      name: "Li\u1EC7u ph\xE1p Oxy",
      score: o2Score,
      description: patient.onSupplementalOxygen ? `\u0110ang th\u1EDF oxy h\u1ED7 tr\u1EE3 (FiO2 ~${patient.fio2Percent}%)` : "Th\u1EDF kh\xED ph\xF2ng t\u1EF1 nhi\xEAn (Kh\xED tr\u1EDDi)",
      isRedFlag: false
    });
    const temp = patient.temperature;
    let tempScore = 0;
    let tempDesc = `${temp}\xB0C (B\xECnh th\u01B0\u1EDDng: 36.1 - 38.0\xB0C)`;
    if (temp <= 35) {
      tempScore = 3;
      tempDesc = `${temp}\xB0C (H\u1EA1 th\xE2n nhi\u1EC7t n\u1EB7ng: \u2264 35.0\xB0C)`;
    } else if (temp >= 35.1 && temp <= 36) {
      tempScore = 1;
      tempDesc = `${temp}\xB0C (H\u1EA1 th\xE2n nhi\u1EC7t nh\u1EB9: 35.1 - 36.0\xB0C)`;
    } else if (temp >= 36.1 && temp <= 38) {
      tempScore = 0;
    } else if (temp >= 38.1 && temp <= 39) {
      tempScore = 1;
      tempDesc = `${temp}\xB0C (S\u1ED1t nh\u1EB9/v\u1EEBa: 38.1 - 39.0\xB0C)`;
    } else if (temp >= 39.1) {
      tempScore = 2;
      tempDesc = `${temp}\xB0C (S\u1ED1t cao: \u2265 39.1\xB0C)`;
    }
    score += tempScore;
    if (tempScore === 3) hasSingleParam3 = true;
    breakdown.push({ name: "Th\xE2n nhi\u1EC7t", score: tempScore, description: tempDesc, isRedFlag: tempScore === 3 });
    const sbp = patient.sbp;
    let sbpScore = 0;
    let sbpDesc = `${sbp} mmHg (B\xECnh th\u01B0\u1EDDng: 111 - 219)`;
    if (sbp <= 90) {
      sbpScore = 3;
      sbpDesc = `${sbp} mmHg (T\u1EE5t huy\u1EBFt \xE1p n\u1EB7ng: \u2264 90)`;
    } else if (sbp >= 91 && sbp <= 100) {
      sbpScore = 2;
      sbpDesc = `${sbp} mmHg (H\u1EA1 huy\u1EBFt \xE1p: 91 - 100)`;
    } else if (sbp >= 101 && sbp <= 110) {
      sbpScore = 1;
      sbpDesc = `${sbp} mmHg (Huy\u1EBFt \xE1p ranh gi\u1EDBi: 101 - 110)`;
    } else if (sbp >= 111 && sbp <= 219) {
      sbpScore = 0;
    } else if (sbp >= 220) {
      sbpScore = 3;
      sbpDesc = `${sbp} mmHg (T\u0103ng huy\u1EBFt \xE1p k\u1ECBch ph\xE1t: \u2265 220)`;
    }
    score += sbpScore;
    if (sbpScore === 3) hasSingleParam3 = true;
    breakdown.push({ name: "Huy\u1EBFt \xE1p t\xE2m thu", score: sbpScore, description: sbpDesc, isRedFlag: sbpScore === 3 });
    const hr = patient.heartRate;
    let hrScore = 0;
    let hrDesc = `${hr} bpm (B\xECnh th\u01B0\u1EDDng: 51 - 90)`;
    if (hr <= 40) {
      hrScore = 3;
      hrDesc = `${hr} bpm (Nh\u1ECBp qu\xE1 ch\u1EADm: \u2264 40)`;
    } else if (hr >= 41 && hr <= 50) {
      hrScore = 1;
      hrDesc = `${hr} bpm (Nh\u1ECBp h\u01A1i ch\u1EADm: 41 - 50)`;
    } else if (hr >= 51 && hr <= 90) {
      hrScore = 0;
    } else if (hr >= 91 && hr <= 110) {
      hrScore = 1;
      hrDesc = `${hr} bpm (Nh\u1ECBp nhanh nh\u1EB9: 91 - 110)`;
    } else if (hr >= 111 && hr <= 130) {
      hrScore = 2;
      hrDesc = `${hr} bpm (Nh\u1ECBp nhanh v\u1EEBa: 111 - 130)`;
    } else if (hr >= 131) {
      hrScore = 3;
      hrDesc = `${hr} bpm (Nh\u1ECBp r\u1EA5t nhanh: \u2265 131)`;
    }
    score += hrScore;
    if (hrScore === 3) hasSingleParam3 = true;
    breakdown.push({ name: "Nh\u1ECBp tim", score: hrScore, description: hrDesc, isRedFlag: hrScore === 3 });
    let cScore = 0;
    let cDesc = "T\u1EC9nh t\xE1o ho\xE0n to\xE0n (Alert)";
    if (patient.avpu !== "A" || patient.newAlteredMentalState || patient.gcs < 15) {
      cScore = 3;
      cDesc = `R\u1ED1i lo\u1EA1n tri gi\xE1c m\u1EDBi (AVPU: ${patient.avpu}, GCS: ${patient.gcs}/15)`;
    }
    score += cScore;
    if (cScore === 3) hasSingleParam3 = true;
    breakdown.push({ name: "\xDD th\u1EE9c / Tri gi\xE1c", score: cScore, description: cDesc, isRedFlag: cScore === 3 });
    let riskCategory = "very_low";
    if (score >= 7) {
      riskCategory = "high";
    } else if (score >= 5 || hasSingleParam3) {
      riskCategory = "medium";
    } else if (score >= 1) {
      riskCategory = "low";
    } else {
      riskCategory = "very_low";
    }
    return { score, breakdown, hasSingleParam3, riskCategory };
  }
  function calculateLPNEWS(newsScore, lactate, pct) {
    const breakdown = [
      { name: "\u0110i\u1EC3m NEWS2 c\u01A1 b\u1EA3n", score: newsScore, description: `T\u1ED5ng \u0111i\u1EC3m sinh hi\u1EC7u: ${newsScore} \u0111i\u1EC3m` }
    ];
    let totalScore = newsScore;
    let lacScore = 0;
    let lacDesc = "Ch\u01B0a c\xF3 x\xE9t nghi\u1EC7m Lactate (t\xEDnh 0\u0111)";
    if (lactate !== void 0 && lactate !== null) {
      if (lactate < 2) {
        lacScore = 0;
        lacDesc = `${lactate} mmol/L (< 2.0 mmol/L: 0 \u0111i\u1EC3m)`;
      } else if (lactate >= 2 && lactate <= 4) {
        lacScore = 1;
        lacDesc = `${lactate} mmol/L (2.0 - 4.0 mmol/L: +1 \u0111i\u1EC3m)`;
      } else {
        lacScore = 2;
        lacDesc = `${lactate} mmol/L (> 4.0 mmol/L: +2 \u0111i\u1EC3m - T\u0103ng cao nghi\xEAm tr\u1ECDng)`;
      }
    }
    totalScore += lacScore;
    breakdown.push({ name: "Lactate m\xE1u \u0111\u1ED9ng m\u1EA1ch/t\u0129nh m\u1EA1ch", score: lacScore, description: lacDesc, isRedFlag: lacScore >= 2 });
    let pctScore = 0;
    let pctDesc = "Ch\u01B0a c\xF3 x\xE9t nghi\u1EC7m PCT (t\xEDnh 0\u0111)";
    if (pct !== void 0 && pct !== null) {
      if (pct < 2) {
        pctScore = 0;
        pctDesc = `${pct} ng/mL (< 2.0 ng/mL: 0 \u0111i\u1EC3m)`;
      } else if (pct >= 2 && pct <= 7) {
        pctScore = 1;
        pctDesc = `${pct} ng/mL (2.0 - 7.0 ng/mL: +1 \u0111i\u1EC3m)`;
      } else if (pct > 7 && pct <= 15) {
        pctScore = 2;
        pctDesc = `${pct} ng/mL (7.0 - 15.0 ng/mL: +2 \u0111i\u1EC3m)`;
      } else {
        pctScore = 3;
        pctDesc = `${pct} ng/mL (> 15.0 ng/mL: +3 \u0111i\u1EC3m - B\xE3o h\xF2a ph\u1EA3n \u1EE9ng vi khu\u1EA9n)`;
      }
    }
    totalScore += pctScore;
    breakdown.push({ name: "Serum Procalcitonin (PCT)", score: pctScore, description: pctDesc, isRedFlag: pctScore >= 2 });
    let riskTier = "low";
    let predictedMortalityText = "";
    if (totalScore > 16) {
      riskTier = "critical";
      predictedMortalityText = "\u0110i\u1EC3m LP-NEWS > 16: Nguy c\u01A1 t\u1EED vong 14 ng\xE0y c\u1EF1c k\u1EF3 cao (~100% trong nh\xF3m nghi\xEAn c\u1EE9u Das 2024). C\u1EA7n h\u1ED3i s\u1EE9c c\u1EA5p c\u1EE9u t\u1ED1i kh\u1EA9n c\u1EA5p!";
    } else if (totalScore >= 11) {
      riskTier = "high";
      predictedMortalityText = "\u0110i\u1EC3m LP-NEWS \u2265 11 (Ng\u01B0\u1EE1ng c\u1EAFt t\u1ED1i \u01B0u nghi\xEAn c\u1EE9u, \u0110\u1ED9 nh\u1EA1y 96.9%, \u0110\u1ED9 \u0111\u1EB7c hi\u1EC7u 88.5%, AUROC 0.966): Ti\xEAn l\u01B0\u1EE3ng t\u1EED vong 14 ng\xE0y t\u0103ng \u0111\u1ED9t bi\u1EBFn.";
    } else if (totalScore >= 7) {
      riskTier = "moderate";
      predictedMortalityText = "\u0110i\u1EC3m LP-NEWS 7-10: Nguy c\u01A1 ti\u1EBFn tri\u1EC3n x\u1EA5u trung b\xECnh. C\u1EA7n theo d\xF5i s\xE1t v\xE0 t\u1ED1i \u01B0u h\xF3a \u0111i\u1EC1u tr\u1ECB.";
    } else {
      riskTier = "low";
      predictedMortalityText = "\u0110i\u1EC3m LP-NEWS < 7: Nguy c\u01A1 t\u1EED vong s\u1EDBm th\u1EA5p, theo d\xF5i \u0111\xE1p \u1EE9ng \u0111i\u1EC1u tr\u1ECB ti\xEAu chu\u1EA9n.";
    }
    return { score: totalScore, breakdown, riskTier, predictedMortalityText };
  }
  function calculateQSOFA(patient) {
    const breakdown = [];
    const criteriaMet = [];
    let score = 0;
    const rrMet = patient.respiratoryRate >= 22;
    if (rrMet) {
      score += 1;
      criteriaMet.push(`Th\u1EDF ${patient.respiratoryRate} l/p (\u2265 22)`);
    }
    breakdown.push({
      name: "T\u1EA7n s\u1ED1 th\u1EDF \u2265 22 l\u1EA7n/ph\xFAt",
      score: rrMet ? 1 : 0,
      description: `${patient.respiratoryRate} l\u1EA7n/ph\xFAt (${rrMet ? "\u0110\u1EA1t ti\xEAu chu\u1EA9n" : "B\xECnh th\u01B0\u1EDDng"})`
    });
    const gcsMet = patient.gcs < 15 || patient.newAlteredMentalState || patient.avpu !== "A";
    if (gcsMet) {
      score += 1;
      criteriaMet.push(`Tri gi\xE1c bi\u1EBFn \u0111\u1ED5i (GCS ${patient.gcs}/15)`);
    }
    breakdown.push({
      name: "Bi\u1EBFn \u0111\u1ED5i tri gi\xE1c (GCS < 15 / AVPU)",
      score: gcsMet ? 1 : 0,
      description: `GCS ${patient.gcs}/15 (${gcsMet ? "\u0110\u1EA1t ti\xEAu chu\u1EA9n" : "B\xECnh th\u01B0\u1EDDng"})`
    });
    const sbpMet = patient.sbp <= 100;
    if (sbpMet) {
      score += 1;
      criteriaMet.push(`HATT ${patient.sbp} mmHg (\u2264 100)`);
    }
    breakdown.push({
      name: "Huy\u1EBFt \xE1p t\xE2m thu \u2264 100 mmHg",
      score: sbpMet ? 1 : 0,
      description: `${patient.sbp} mmHg (${sbpMet ? "\u0110\u1EA1t ti\xEAu chu\u1EA9n" : "B\xECnh th\u01B0\u1EDDng"})`
    });
    return {
      score,
      breakdown,
      criteriaMet,
      isHighRisk: score >= 2
    };
  }
  function calculateSIRS(patient) {
    const breakdown = [];
    const criteriaMet = [];
    let score = 0;
    const tempMet = patient.temperature > 38 || patient.temperature < 36;
    if (tempMet) {
      score += 1;
      criteriaMet.push(`T\xB0 ${patient.temperature}\xB0C (>38\xB0C ho\u1EB7c <36\xB0C)`);
    }
    breakdown.push({
      name: "Th\xE2n nhi\u1EC7t (T\xB0 > 38\xB0C ho\u1EB7c < 36\xB0C)",
      score: tempMet ? 1 : 0,
      description: `${patient.temperature}\xB0C (${tempMet ? "D\u01B0\u01A1ng t\xEDnh" : "B\xECnh th\u01B0\u1EDDng"})`
    });
    const hrMet = patient.heartRate > 90;
    if (hrMet) {
      score += 1;
      criteriaMet.push(`M\u1EA1ch ${patient.heartRate} bpm (>90 bpm)`);
    }
    breakdown.push({
      name: "Nh\u1ECBp tim (> 90 l\u1EA7n/ph\xFAt)",
      score: hrMet ? 1 : 0,
      description: `${patient.heartRate} l\u1EA7n/ph\xFAt (${hrMet ? "D\u01B0\u01A1ng t\xEDnh" : "B\xECnh th\u01B0\u1EDDng"})`
    });
    const rrMet = patient.respiratoryRate > 20;
    if (rrMet) {
      score += 1;
      criteriaMet.push(`Th\u1EDF ${patient.respiratoryRate} l/p (>20 l/p)`);
    }
    breakdown.push({
      name: "T\u1EA7n s\u1ED1 th\u1EDF (> 20 l\u1EA7n/ph\xFAt)",
      score: rrMet ? 1 : 0,
      description: `${patient.respiratoryRate} l\u1EA7n/ph\xFAt (${rrMet ? "D\u01B0\u01A1ng t\xEDnh" : "B\xECnh th\u01B0\u1EDDng"})`
    });
    const wbc = patient.wbc;
    const wbcMet = wbc !== void 0 && (wbc > 12 || wbc < 4);
    if (wbcMet) {
      score += 1;
      criteriaMet.push(`B\u1EA1ch c\u1EA7u WBC ${wbc} G/L (>12 ho\u1EB7c <4 G/L)`);
    }
    breakdown.push({
      name: "B\u1EA1ch c\u1EA7u WBC (> 12 G/L ho\u1EB7c < 4 G/L)",
      score: wbcMet ? 1 : 0,
      description: wbc !== void 0 ? `WBC ${wbc} G/L (${wbcMet ? "D\u01B0\u01A1ng t\xEDnh" : "B\xECnh th\u01B0\u1EDDng"})` : "Ch\u01B0a c\xF3 x\xE9t nghi\u1EC7m WBC (0\u0111)"
    });
    return {
      score,
      criteriaMet,
      isPositive: score >= 2,
      breakdown
    };
  }
  function calculateSOFA(patient) {
    const breakdown = [];
    let score = 0;
    let respScore = 0;
    let respDesc = "";
    const fio2Dec = (patient.fio2Percent || 21) / 100;
    const pao2 = patient.pao2;
    const pafi = pao2 ? pao2 / fio2Dec : null;
    const spofi = patient.spo2 / fio2Dec;
    if (pafi !== null) {
      if (pafi >= 400) respScore = 0;
      else if (pafi >= 300) respScore = 1;
      else if (pafi >= 200) respScore = 2;
      else if (pafi >= 100 && (patient.invasiveMechanicalVentilation || patient.nonInvasiveVentilation)) respScore = 3;
      else if (pafi < 100 && (patient.invasiveMechanicalVentilation || patient.nonInvasiveVentilation)) respScore = 4;
      else respScore = 2;
      respDesc = `PaO2/FiO2 = ${Math.round(pafi)} mmHg`;
    } else {
      if (spofi >= 302) respScore = 0;
      else if (spofi >= 221) respScore = 1;
      else if (spofi >= 142) respScore = 2;
      else if (spofi >= 67 && (patient.invasiveMechanicalVentilation || patient.nonInvasiveVentilation)) respScore = 3;
      else if (patient.invasiveMechanicalVentilation || patient.nonInvasiveVentilation) respScore = 4;
      else respScore = 2;
      respDesc = `SpO2/FiO2 t\u01B0\u01A1ng \u0111\u01B0\u01A1ng ~${Math.round(spofi)}`;
    }
    score += respScore;
    breakdown.push({ name: "H\xF4 h\u1EA5p (PaO2/FiO2)", score: respScore, description: respDesc });
    let coagScore = 0;
    let coagDesc = "Ti\u1EC3u c\u1EA7u b\xECnh th\u01B0\u1EDDng";
    if (patient.platelets !== void 0 && patient.platelets !== null) {
      const plts = patient.platelets;
      if (plts >= 150) coagScore = 0;
      else if (plts >= 100) coagScore = 1;
      else if (plts >= 50) coagScore = 2;
      else if (plts >= 20) coagScore = 3;
      else coagScore = 4;
      coagDesc = `Ti\u1EC3u c\u1EA7u: ${plts} x10\xB3/\xB5L`;
    }
    score += coagScore;
    breakdown.push({ name: "\u0110\xF4ng m\xE1u (Ti\u1EC3u c\u1EA7u)", score: coagScore, description: coagDesc });
    let liverScore = 0;
    let liverDesc = "Bilirubin b\xECnh th\u01B0\u1EDDng";
    if (patient.bilirubinUmolL !== void 0 && patient.bilirubinUmolL !== null) {
      const bili = patient.bilirubinUmolL;
      if (bili < 20) liverScore = 0;
      else if (bili <= 32) liverScore = 1;
      else if (bili <= 101) liverScore = 2;
      else if (bili <= 204) liverScore = 3;
      else liverScore = 4;
      liverDesc = `Bilirubin: ${bili} \xB5mol/L (~${(bili / 17.1).toFixed(1)} mg/dL)`;
    }
    score += liverScore;
    breakdown.push({ name: "Gan (Bilirubin)", score: liverScore, description: liverDesc });
    let cvScore = 0;
    let cvDesc = "";
    const map = calculateMAP(patient.sbp, patient.dbp);
    const vaso = patient.vasoactiveUsed;
    const hasHighVaso = vaso.norepinephrine || vaso.epinephrine || vaso.dopamine && patient.vasoactiveMedCount >= 2;
    if (hasHighVaso) {
      cvScore = 4;
      cvDesc = "\u0110ang d\xF9ng Norepinephrine/Epinephrine li\u1EC1u duy tr\xEC ho\u1EB7c \u0111a v\u1EADn m\u1EA1ch";
    } else if (vaso.dopamine || vaso.dobutamine || patient.vasoactiveMedCount === 1) {
      cvScore = 2;
      cvDesc = "\u0110ang d\xF9ng Dopamine ho\u1EB7c Dobutamine li\u1EC1u h\u1ED7 tr\u1EE3";
    } else if (map < 70) {
      cvScore = 1;
      cvDesc = `Huy\u1EBFt \xE1p trung b\xECnh MAP ${map} mmHg (< 70 mmHg)`;
    } else {
      cvScore = 0;
      cvDesc = `Huy\u1EBFt \xE1p trung b\xECnh MAP ${map} mmHg (\u2265 70 mmHg)`;
    }
    score += cvScore;
    breakdown.push({ name: "Tim m\u1EA1ch & Huy\u1EBFt \u0111\u1ED9ng", score: cvScore, description: cvDesc });
    let cnsScore = 0;
    const gcs = patient.gcs || 15;
    if (gcs >= 15) cnsScore = 0;
    else if (gcs >= 13) cnsScore = 1;
    else if (gcs >= 10) cnsScore = 2;
    else if (gcs >= 6) cnsScore = 3;
    else cnsScore = 4;
    score += cnsScore;
    breakdown.push({ name: "Th\u1EA7n kinh (Glasgow)", score: cnsScore, description: `Thang \u0111i\u1EC3m GCS: ${gcs}/15` });
    let renalScore = 0;
    let renalDesc = "Creatinine b\xECnh th\u01B0\u1EDDng";
    const creat = patient.creatinineUmolL;
    if (creat !== void 0 && creat !== null) {
      if (creat < 110) renalScore = 0;
      else if (creat <= 170) renalScore = 1;
      else if (creat <= 299) renalScore = 2;
      else if (creat <= 440) renalScore = 3;
      else renalScore = 4;
      renalDesc = `Creatinine: ${creat} \xB5mol/L (~${(creat / 88.4).toFixed(1)} mg/dL)`;
    } else if (patient.urineOutputStatus === "not_over_18h") {
      renalScore = 3;
      renalDesc = "V\xF4 ni\u1EC7u k\xE9o d\xE0i > 18 gi\u1EDD";
    }
    score += renalScore;
    breakdown.push({ name: "Th\u1EADn (Creatinine / N\u01B0\u1EDBc ti\u1EC3u)", score: renalScore, description: renalDesc });
    return { score, breakdown };
  }
  function calculatePhoenixPediatric(patient) {
    const breakdown = [];
    let totalScore = 0;
    let respScore = 0;
    let respDesc = "H\xF4 h\u1EA5p b\xECnh th\u01B0\u1EDDng";
    const fio2Dec = (patient.fio2Percent || 21) / 100;
    const pafi = patient.pao2 ? patient.pao2 / fio2Dec : null;
    const spofi = patient.spo2 / fio2Dec;
    if (patient.invasiveMechanicalVentilation) {
      if (pafi !== null && pafi < 100 || spofi < 148) {
        respScore = 3;
        respDesc = "Th\u1EDF m\xE1y x\xE2m l\u1EA5n (IMV) v\u1EDBi PaO2:FiO2 < 100 ho\u1EB7c SpO2:FiO2 < 148";
      } else if (pafi !== null && pafi <= 200 || spofi <= 220) {
        respScore = 2;
        respDesc = "Th\u1EDF m\xE1y x\xE2m l\u1EA5n (IMV) v\u1EDBi PaO2:FiO2 100-200 ho\u1EB7c SpO2:FiO2 148-220";
      } else {
        respScore = 1;
        respDesc = "Th\u1EDF m\xE1y x\xE2m l\u1EA5n (IMV) duy tr\xEC trao \u0111\u1ED5i kh\xED";
      }
    } else if (patient.onSupplementalOxygen || patient.nonInvasiveVentilation) {
      if (pafi !== null && pafi < 400 || spofi < 292) {
        respScore = 1;
        respDesc = "H\u1ED7 tr\u1EE3 oxy/NIV/HFNC v\u1EDBi PaO2:FiO2 < 400 ho\u1EB7c SpO2:FiO2 < 292";
      }
    }
    totalScore += respScore;
    breakdown.push({ name: "Phoenix H\xF4 h\u1EA5p (0-3\u0111)", score: respScore, description: respDesc });
    let cvScore = 0;
    const cvDetails = [];
    if (patient.vasoactiveMedCount >= 2) {
      cvScore += 2;
      cvDetails.push("\u2265 2 lo\u1EA1i thu\u1ED1c v\u1EADn m\u1EA1ch (+2\u0111)");
    } else if (patient.vasoactiveMedCount === 1) {
      cvScore += 1;
      cvDetails.push("1 lo\u1EA1i thu\u1ED1c v\u1EADn m\u1EA1ch (+1\u0111)");
    }
    const lac = patient.lactateInitial;
    if (lac !== void 0 && lac !== null) {
      if (lac >= 11) {
        cvScore += 2;
        cvDetails.push(`Lactate \u2265 11 mmol/L (${lac} mmol/L: +2\u0111)`);
      } else if (lac >= 5) {
        cvScore += 1;
        cvDetails.push(`Lactate 5.0 - 10.9 mmol/L (${lac} mmol/L: +1\u0111)`);
      }
    }
    const map = calculateMAP(patient.sbp, patient.dbp);
    const ageY = patient.ageYears;
    const ageM = patient.ageMonths !== void 0 ? patient.ageMonths : ageY * 12;
    let bpScore = 0;
    if (ageM < 1) {
      if (map < 17) bpScore = 2;
      else if (map <= 30) bpScore = 1;
    } else if (ageM >= 1 && ageM < 12) {
      if (map < 25) bpScore = 2;
      else if (map <= 38) bpScore = 1;
    } else if (ageY >= 1 && ageY < 2) {
      if (map < 31) bpScore = 2;
      else if (map <= 43) bpScore = 1;
    } else if (ageY >= 2 && ageY < 5) {
      if (map < 32) bpScore = 2;
      else if (map <= 44) bpScore = 1;
    } else if (ageY >= 5 && ageY < 12) {
      if (map < 36) bpScore = 2;
      else if (map <= 48) bpScore = 1;
    } else {
      if (map < 38) bpScore = 2;
      else if (map <= 51) bpScore = 1;
    }
    if (bpScore > 0) {
      cvScore += bpScore;
      cvDetails.push(`MAP ${map} mmHg t\u1EE5t theo tu\u1ED5i (+${bpScore}\u0111)`);
    }
    if (cvScore > 6) cvScore = 6;
    totalScore += cvScore;
    breakdown.push({
      name: "Phoenix Tim m\u1EA1ch (0-6\u0111)",
      score: cvScore,
      description: cvDetails.length > 0 ? cvDetails.join("; ") : `MAP ${map} mmHg b\xECnh th\u01B0\u1EDDng, kh\xF4ng v\u1EADn m\u1EA1ch/lactate cao`,
      isRedFlag: cvScore >= 1
    });
    let coagScore = 0;
    const coagDetails = [];
    if (patient.platelets && patient.platelets < 100) {
      coagScore++;
      coagDetails.push(`Ti\u1EC3u c\u1EA7u < 100k (${patient.platelets}k)`);
    }
    if (patient.inr && patient.inr > 1.3) {
      coagScore++;
      coagDetails.push(`INR > 1.3 (${patient.inr})`);
    }
    if (patient.dDimerMgL && patient.dDimerMgL > 2) {
      coagScore++;
      coagDetails.push(`D-dimer > 2.0 mg/L (${patient.dDimerMgL})`);
    }
    if (patient.fibrinogenMgDl && patient.fibrinogenMgDl < 100) {
      coagScore++;
      coagDetails.push(`Fibrinogen < 100 mg/dL (${patient.fibrinogenMgDl})`);
    }
    if (coagScore > 2) coagScore = 2;
    totalScore += coagScore;
    breakdown.push({
      name: "Phoenix \u0110\xF4ng m\xE1u (0-2\u0111)",
      score: coagScore,
      description: coagDetails.length > 0 ? coagDetails.join(", ") : "\u0110\xF4ng m\xE1u trong gi\u1EDBi h\u1EA1n b\xECnh th\u01B0\u1EDDng"
    });
    let neuroScore = 0;
    let neuroDesc = "Th\u1EA7n kinh b\xECnh th\u01B0\u1EDDng";
    if (patient.bilateralFixedPupils) {
      neuroScore = 2;
      neuroDesc = "\u0110\u1ED3ng t\u1EED gi\xE3n c\u1ED1 \u0111\u1ECBnh c\u1EA3 hai b\xEAn (2\u0111)";
    } else if (patient.gcs <= 10) {
      neuroScore = 1;
      neuroDesc = `Thang \u0111i\u1EC3m GCS \u2264 10 (${patient.gcs}/15: 1\u0111)`;
    }
    totalScore += neuroScore;
    breakdown.push({ name: "Phoenix Th\u1EA7n kinh (0-2\u0111)", score: neuroScore, description: neuroDesc, isRedFlag: neuroScore >= 1 });
    const isSepsis = patient.suspectedInfection && totalScore >= 2;
    const isSepticShock = isSepsis && cvScore >= 1;
    return {
      score: totalScore,
      cvScore,
      breakdown,
      isSepsis,
      isSepticShock
    };
  }
  function calculateObstetricScores(patient) {
    const qsofaBreakdown = [];
    let qScore = 0;
    const sbpMet = patient.sbp < 90;
    if (sbpMet) qScore++;
    qsofaBreakdown.push({ name: "HATT < 90 mmHg", score: sbpMet ? 1 : 0, description: `${patient.sbp} mmHg` });
    const rrMet = patient.respiratoryRate >= 25;
    if (rrMet) qScore++;
    qsofaBreakdown.push({ name: "T\u1EA7n s\u1ED1 th\u1EDF \u2265 25 l\u1EA7n/ph\xFAt", score: rrMet ? 1 : 0, description: `${patient.respiratoryRate} l\u1EA7n/ph\xFAt` });
    const mentalMet = patient.newAlteredMentalState || patient.avpu !== "A" || patient.gcs < 15;
    if (mentalMet) qScore++;
    qsofaBreakdown.push({ name: "Tri gi\xE1c bi\u1EBFn \u0111\u1ED5i (Not Alert)", score: mentalMet ? 1 : 0, description: mentalMet ? "\xDD th\u1EE9c thay \u0111\u1ED5i" : "T\u1EC9nh t\xE1o" });
    const isHighSuspicion = qScore >= 2;
    const sofaBreakdown = [];
    let sScore = 0;
    const fio2Dec = (patient.fio2Percent || 21) / 100;
    const pafi = patient.pao2 ? patient.pao2 / fio2Dec : patient.spo2 / fio2Dec;
    let respPts = 0;
    if (pafi < 300) respPts = 2;
    else if (pafi < 400) respPts = 1;
    sScore += respPts;
    sofaBreakdown.push({ name: "H\xF4 h\u1EA5p (PaO2/FiO2)", score: respPts, description: `T\u1EF7 s\u1ED1 ~${Math.round(pafi)}` });
    let pltsPts = 0;
    if (patient.platelets) {
      if (patient.platelets < 100) pltsPts = 2;
      else if (patient.platelets < 150) pltsPts = 1;
    }
    sScore += pltsPts;
    sofaBreakdown.push({ name: "\u0110\xF4ng m\xE1u (Ti\u1EC3u c\u1EA7u)", score: pltsPts, description: `${patient.platelets || "Ch\u01B0a XN"} x10\xB3/\xB5L` });
    let biliPts = 0;
    if (patient.bilirubinUmolL) {
      if (patient.bilirubinUmolL > 32) biliPts = 2;
      else if (patient.bilirubinUmolL >= 20) biliPts = 1;
    }
    sScore += biliPts;
    sofaBreakdown.push({ name: "Gan (Bilirubin)", score: biliPts, description: `${patient.bilirubinUmolL || "Ch\u01B0a XN"} \xB5mol/L` });
    const map = calculateMAP(patient.sbp, patient.dbp);
    let cvPts = 0;
    if (patient.vasoactiveMedCount > 0) cvPts = 2;
    else if (map < 70) cvPts = 1;
    sScore += cvPts;
    sofaBreakdown.push({ name: "Tim m\u1EA1ch (MAP & V\u1EADn m\u1EA1ch)", score: cvPts, description: `MAP ${map} mmHg, V\u1EADn m\u1EA1ch: ${patient.vasoactiveMedCount > 0 ? "C\xF3" : "Kh\xF4ng"}` });
    let neuroPts = 0;
    if (patient.avpu === "P" || patient.avpu === "U" || patient.gcs < 10) neuroPts = 2;
    else if (patient.avpu === "V" || patient.gcs < 15) neuroPts = 1;
    sScore += neuroPts;
    sofaBreakdown.push({ name: "Th\u1EA7n kinh (\xDD th\u1EE9c)", score: neuroPts, description: `AVPU ${patient.avpu}, GCS ${patient.gcs}/15` });
    let renalPts = 0;
    if (patient.creatinineUmolL) {
      if (patient.creatinineUmolL > 120) renalPts = 2;
      else if (patient.creatinineUmolL >= 90) renalPts = 1;
    }
    sScore += renalPts;
    sofaBreakdown.push({ name: "Th\u1EADn (Creatinine thai k\u1EF3)", score: renalPts, description: `${patient.creatinineUmolL || "Ch\u01B0a XN"} \xB5mol/L (ng\u01B0\u1EE1ng thai k\u1EF3 > 90 \xB5mol/L)` });
    const isSepsis = patient.suspectedInfection && sScore >= 2;
    const isSepticShock = isSepsis && patient.vasoactiveMedCount > 0 && (patient.lactateInitial ? patient.lactateInitial >= 2 : false);
    return {
      qsofaScore: qScore,
      qsofaBreakdown,
      isHighSuspicion,
      sofaScore: sScore,
      sofaBreakdown,
      isSepsis,
      isSepticShock
    };
  }
  function evaluateNICERisk(patient, newsResult) {
    const highRiskCriteria = [];
    const mediumRiskCriteria = [];
    if (patient.setting === "acute_hospital" || patient.setting === "emergency_ambulance" || patient.setting === "icu") {
      if (newsResult.score >= 7) {
        highRiskCriteria.push(`\u0110i\u1EC3m NEWS2 \u2265 7 (${newsResult.score} \u0111i\u1EC3m)`);
      } else if (newsResult.score >= 5) {
        mediumRiskCriteria.push(`\u0110i\u1EC3m NEWS2 t\u1EEB 5 - 6 (${newsResult.score} \u0111i\u1EC3m)`);
      }
      if (newsResult.hasSingleParam3) {
        mediumRiskCriteria.push("C\xF3 1 th\xF4ng s\u1ED1 sinh hi\u1EC7u \u0111\u1EA1t m\u1EE9c b\xE1o \u0111\u1ED9ng 3 \u0111i\u1EC3m (C\u1EA7n B\xE1c s\u0129 FY2+ \u0111\xE1nh gi\xE1 kh\u1EA9n)");
      }
      if (patient.mottledOrAshen) highRiskCriteria.push("Da v\xE2n \u0111\xE1 ho\u1EB7c t\xE1i x\xE1m (Mottled / Ashen skin)");
      if (patient.cyanosis) highRiskCriteria.push("T\xEDm t\xE1i m\xF4i, da ho\u1EB7c l\u01B0\u1EE1i (Cyanosis)");
      if (patient.nonBlanchingRash) highRiskCriteria.push("Ban xu\u1EA5t huy\u1EBFt kh\xF4ng bi\u1EBFn m\u1EA5t khi \u0111\xE8 \xE9p (Petechial / Purpuric rash)");
      if (patient.lactateInitial && patient.lactateInitial > 2) highRiskCriteria.push(`B\u1EB1ng ch\u1EE9ng gi\u1EA3m t\u01B0\u1EDBi m\xE1u m\xF4: Lactate > 2.0 mmol/L (${patient.lactateInitial} mmol/L)`);
      if (patient.urineOutputStatus === "not_over_18h") highRiskCriteria.push("V\xF4 ni\u1EC7u k\xE9o d\xE0i > 18 gi\u1EDD");
    } else {
      if (patient.newAlteredMentalState) highRiskCriteria.push("B\u1EB1ng ch\u1EE9ng kh\xE1ch quan v\u1EC1 r\u1ED1i lo\u1EA1n t\xE2m th\u1EA7n / l\xFA l\u1EABn m\u1EDBi");
      if (patient.respiratoryRate >= 25) highRiskCriteria.push(`T\u1EA7n s\u1ED1 th\u1EDF \u2265 25 l\u1EA7n/ph\xFAt (${patient.respiratoryRate})`);
      if (patient.onSupplementalOxygen && patient.fio2Percent >= 40) highRiskCriteria.push("Nhu c\u1EA7u oxy m\u1EDBi \u2265 40% FiO2 \u0111\u1EC3 duy tr\xEC Sat > 92%");
      if (patient.sbp <= 90) highRiskCriteria.push(`Huy\u1EBFt \xE1p t\xE2m thu \u2264 90 mmHg (${patient.sbp} mmHg)`);
      if (patient.heartRate > 130) highRiskCriteria.push(`Nh\u1ECBp tim > 130 l\u1EA7n/ph\xFAt (${patient.heartRate} bpm)`);
      if (patient.urineOutputStatus === "not_over_18h") highRiskCriteria.push("Kh\xF4ng ti\u1EC3u trong 18 gi\u1EDD qua");
      if (patient.mottledOrAshen) highRiskCriteria.push("Da v\xE2n \u0111\xE1 ho\u1EB7c t\xE1i x\xE1m");
      if (patient.cyanosis) highRiskCriteria.push("T\xEDm t\xE1i m\xF4i, da, l\u01B0\u1EE1i");
      if (patient.nonBlanchingRash) highRiskCriteria.push("Ban xu\u1EA5t huy\u1EBFt kh\xF4ng m\u1EA5t khi c\u0103ng da");
      if (patient.communicationDifficulty) mediumRiskCriteria.push("Kh\xF3 kh\u0103n giao ti\u1EBFp / Sa s\xFAt tr\xED tu\u1EC7 / Thi\u1EC3u n\u0103ng");
      if (patient.hasImmunosuppression) mediumRiskCriteria.push("H\u1EC7 mi\u1EC5n d\u1ECBch suy gi\u1EA3m (H\xF3a tr\u1ECB, thu\u1ED1c \u1EE9c ch\u1EBF MD, corticoid)");
      if (patient.hasRecentSurgery) mediumRiskCriteria.push("Ch\u1EA5n th\u01B0\u01A1ng, ph\u1EABu thu\u1EADt ho\u1EB7c can thi\u1EC7p x\xE2m l\u1EA5n trong 6 tu\u1EA7n");
      if (patient.respiratoryRate >= 21 && patient.respiratoryRate <= 24) mediumRiskCriteria.push(`T\u1EA7n s\u1ED1 th\u1EDF 21-24 l\u1EA7n/ph\xFAt (${patient.respiratoryRate})`);
      if (patient.sbp >= 91 && patient.sbp <= 100) mediumRiskCriteria.push(`Huy\u1EBFt \xE1p t\xE2m thu 91-100 mmHg (${patient.sbp} mmHg)`);
      if (patient.heartRate >= 91 && patient.heartRate <= 130) mediumRiskCriteria.push(`Nh\u1ECBp tim 91-130 l\u1EA7n/ph\xFAt (${patient.heartRate} bpm)`);
      if (patient.urineOutputStatus === "not_12_18h") mediumRiskCriteria.push("Kh\xF4ng ti\u1EC3u trong 12 - 18 gi\u1EDD qua");
      if (patient.temperature < 36) mediumRiskCriteria.push(`Th\xE2n nhi\u1EC7t h\u1EA1 < 36.0\xB0C (${patient.temperature}\xB0C)`);
    }
    let riskCategory = "low";
    let maxAntibioticDelayHours = 6;
    if (highRiskCriteria.length > 0) {
      riskCategory = "high";
      maxAntibioticDelayHours = 1;
    } else if (mediumRiskCriteria.length > 0) {
      riskCategory = "medium";
      maxAntibioticDelayHours = 3;
    } else {
      riskCategory = "low";
      maxAntibioticDelayHours = 6;
    }
    return {
      riskCategory,
      highRiskCriteria,
      mediumRiskCriteria,
      maxAntibioticDelayHours
    };
  }
  function calculateLactateClearance(initial, repeat6h) {
    if (initial === void 0 || repeat6h === void 0 || initial === 0) {
      return {
        evaluation: "na",
        details: "C\u1EA7n \xEDt nh\u1EA5t 2 th\u1EDDi \u0111i\u1EC3m \u0111o Lactate (Ban \u0111\u1EA7u v\xE0 sau 2-6 gi\u1EDD) \u0111\u1EC3 \u0111\xE1nh gi\xE1 \u0111\u1ED9ng h\u1ECDc thanh th\u1EA3i d\u1ECBch."
      };
    }
    const clearance = Math.round((initial - repeat6h) / initial * 100 * 10) / 10;
    if (clearance >= 20) {
      return {
        clearancePercent: clearance,
        evaluation: "adequate",
        details: `Thanh th\u1EA3i Lactate \u0111\u1EA1t ${clearance}% (\u2265 20%): \u0110\xE1p \u1EE9ng h\u1ED3i s\u1EE9c d\u1ECBch v\xE0 t\u01B0\u1EDBi m\xE1u m\xF4 r\u1EA5t t\u1ED1t (OR t\u1EED vong = 0.47).`
      };
    } else if (clearance >= 10) {
      return {
        clearancePercent: clearance,
        evaluation: "adequate",
        details: `Thanh th\u1EA3i Lactate \u0111\u1EA1t ${clearance}% (\u2265 10%): \u0110\u1EA1t m\u1EE5c ti\xEAu h\u1ED3i s\u1EE9c ban \u0111\u1EA7u (OR t\u1EED vong = 0.52).`
      };
    } else if (clearance > 0) {
      return {
        clearancePercent: clearance,
        evaluation: "suboptimal",
        details: `Thanh th\u1EA3i Lactate ch\u1EC9 \u0111\u1EA1t ${clearance}% (< 10%): Ch\u01B0a \u0111\u1EA1t m\u1EE5c ti\xEAu \u0111\xE0o th\u1EA3i. C\u1EA7n \u0111\xE1nh gi\xE1 l\u1EA1i t\xECnh tr\u1EA1ng t\u01B0\u1EDBi m\xE1u, \u0111\xE1p \u1EE9ng b\xF9 d\u1ECBch v\xE0 c\xE2n nh\u1EAFc thu\u1ED1c v\u1EADn m\u1EA1ch.`
      };
    } else {
      return {
        clearancePercent: clearance,
        evaluation: "poor",
        details: `Lactate t\u0103ng th\xEAm (+${Math.abs(clearance)}%) t\u1EEB ${initial} l\xEAn ${repeat6h} mmol/L: Thi\u1EBFu oxy m\xF4 v\xE0 r\u1ED1i lo\u1EA1n chuy\u1EC3n h\xF3a k\u1EF5 kh\xED \u0111ang t\u0103ng n\u1EB7ng! B\xE1o \u0111\u1ED9ng \u0111\u1ECF h\u1ED3i s\u1EE9c.`
      };
    }
  }
  function calculateNLR(neutrophils, lymphocytes) {
    if (neutrophils === void 0 || lymphocytes === void 0 || lymphocytes === 0) {
      return {
        riskLevel: "normal",
        details: "Ch\u01B0a \u0111\u1EE7 s\u1ED1 li\u1EC7u Neutrophil v\xE0 Lymphocyte trong c\xF4ng th\u1EE9c m\xE1u."
      };
    }
    const nlr = Math.round(neutrophils / lymphocytes * 10) / 10;
    if (nlr >= 6) {
      return {
        nlr,
        riskLevel: "high",
        details: `NLR = ${nlr} (\u2265 6.0): Gi\xE1 tr\u1ECB ti\xEAn l\u01B0\u1EE3ng \u0111\u1ED9c l\u1EADp nguy c\u01A1 t\u1EED vong s\u1EDBm trong 72 gi\u1EDD (\u0110\u1ED9 nh\u1EA1y 92%, NPV 97%) v\xE0 nguy c\u01A1 cao ti\u1EBFn tri\u1EC3n S\u1ED1c nhi\u1EC5m khu\u1EA9n.`
      };
    } else if (nlr >= 3) {
      return {
        nlr,
        riskLevel: "elevated",
        details: `NLR = ${nlr} (3.0 - 5.9): T\u0103ng ph\u1EA3n \u1EE9ng vi\xEAm h\u1EC7 th\u1ED1ng, theo d\xF5i s\xE1t di\u1EC5n ti\u1EBFn c\xF4ng th\u1EE9c m\xE1u.`
      };
    } else {
      return {
        nlr,
        riskLevel: "normal",
        details: `NLR = ${nlr} (< 3.0): T\u1EF7 s\u1ED1 trong gi\u1EDBi h\u1EA1n an to\xE0n.`
      };
    }
  }
  function evaluatePatientCDSS(patient) {
    const map = calculateMAP(patient.sbp, patient.dbp);
    const news2 = calculateNEWS2(patient);
    const lpNews = calculateLPNEWS(news2.score, patient.lactateInitial, patient.procalcitonin);
    const qsofa = calculateQSOFA(patient);
    const sirs = calculateSIRS(patient);
    const sofa = calculateSOFA(patient);
    const nice = evaluateNICERisk(patient, news2);
    const lactateKinetics = calculateLactateClearance(patient.lactateInitial, patient.lactateRepeat6h);
    const nlrCalc = calculateNLR(patient.neutrophilCount, patient.lymphocyteCount);
    let phoenixRes = void 0;
    if (patient.patientType === "pediatric" || patient.ageYears < 18) {
      phoenixRes = calculatePhoenixPediatric(patient);
    }
    let obstetricRes = void 0;
    if (patient.patientType === "maternal" || patient.pregnancyWeek || patient.isPostpartum) {
      obstetricRes = calculateObstetricScores(patient);
    }
    let primaryDiagnosis = "no_sepsis";
    let urgencyLevel = "routine";
    let isSepsis3 = false;
    let isSepticShock3 = false;
    if (patient.patientType === "pediatric" && phoenixRes) {
      if (phoenixRes.isSepticShock) {
        primaryDiagnosis = "septic_shock";
        urgencyLevel = "emergency";
      } else if (phoenixRes.isSepsis) {
        primaryDiagnosis = "confirmed_sepsis";
        urgencyLevel = "urgent";
      } else if (patient.suspectedInfection) {
        primaryDiagnosis = "uncomplicated_infection";
        urgencyLevel = "routine";
      }
    } else if (patient.patientType === "maternal" && obstetricRes) {
      if (obstetricRes.isSepticShock) {
        primaryDiagnosis = "septic_shock";
        urgencyLevel = "emergency";
      } else if (obstetricRes.isSepsis) {
        primaryDiagnosis = "confirmed_sepsis";
        urgencyLevel = "urgent";
      } else if (obstetricRes.isHighSuspicion) {
        primaryDiagnosis = "suspected_sepsis";
        urgencyLevel = "urgent";
      } else if (patient.suspectedInfection) {
        primaryDiagnosis = "uncomplicated_infection";
        urgencyLevel = "routine";
      }
    } else {
      const deltaSofa = sofa.score;
      isSepsis3 = patient.suspectedInfection && deltaSofa >= 2;
      isSepticShock3 = isSepsis3 && patient.vasoactiveMedCount > 0 && (patient.lactateInitial ? patient.lactateInitial > 2 : false);
      if (isSepticShock3) {
        primaryDiagnosis = "septic_shock";
        urgencyLevel = "emergency";
      } else if (isSepsis3) {
        primaryDiagnosis = "confirmed_sepsis";
        urgencyLevel = "emergency";
      } else if (patient.suspectedInfection && nice.riskCategory === "high") {
        primaryDiagnosis = "suspected_sepsis";
        urgencyLevel = "emergency";
      } else if (patient.suspectedInfection && (nice.riskCategory === "medium" || qsofa.isHighRisk)) {
        primaryDiagnosis = "suspected_sepsis";
        urgencyLevel = "urgent";
      } else if (patient.suspectedInfection) {
        primaryDiagnosis = "uncomplicated_infection";
        urgencyLevel = "routine";
      } else {
        primaryDiagnosis = "no_sepsis";
        urgencyLevel = "routine";
      }
    }
    let summarySentence = "";
    if (primaryDiagnosis === "septic_shock") {
      summarySentence = 'C\u1EA2NH B\xC1O \u0110\u1ECE: B\u1EC7nh nh\xE2n th\u1ECFa ti\xEAu chu\u1EA9n S\u1ED0C NHI\u1EC4M KHU\u1EA8N (Septic Shock) v\u1EDBi t\u1EE5t huy\u1EBFt \xE1p c\u1EA7n thu\u1ED1c v\u1EADn m\u1EA1ch v\xE0 t\u0103ng Lactate m\xE1u. Nguy c\u01A1 t\u1EED vong r\u1EA5t cao (> 40%), c\u1EA7n can thi\u1EC7p "Gi\u1EDD V\xE0ng" ngay l\u1EADp t\u1EE9c!';
    } else if (primaryDiagnosis === "confirmed_sepsis") {
      summarySentence = "X\xC1C NH\u1EACN NHI\u1EC4M KHU\u1EA8N HUY\u1EBET (Sepsis): C\xF3 b\u1EB1ng ch\u1EE9ng r\u1ED1i lo\u1EA1n ch\u1EE9c n\u0103ng c\u01A1 quan \u0111e d\u1ECDa t\xEDnh m\u1EA1ng (SOFA \u2265 2 / Phoenix \u2265 2 / Obs SOFA \u2265 2). Kh\u1EDFi \u0111\u1ED9ng ph\xE1c \u0111\u1ED3 c\u1EA5p c\u1EE9u Sepsis.";
    } else if (primaryDiagnosis === "suspected_sepsis") {
      summarySentence = "NGHI NG\u1EDC CAO NHI\u1EC4M KHU\u1EA8N HUY\u1EBET: B\u1EC7nh nh\xE2n c\xF3 nguy c\u01A1 cao theo ti\xEAu ch\xED NICE NG253 ho\u1EB7c NEWS2/qSOFA. C\u1EA7n b\xE1c s\u0129 kh\xE1m kh\u1EA9n c\u1EA5p, l\u1EA5y x\xE9t nghi\u1EC7m vi sinh v\xE0 chu\u1EA9n b\u1ECB \u0111i\u1EC1u tr\u1ECB theo khung gi\u1EDD.";
    } else if (primaryDiagnosis === "uncomplicated_infection") {
      summarySentence = "Nhi\u1EC5m khu\u1EA9n t\u1EA1i ch\u1ED7 / Ch\u01B0a c\xF3 b\u1EB1ng ch\u1EE9ng suy c\u01A1 quan \u0111e d\u1ECDa t\xEDnh m\u1EA1ng. Ti\u1EBFp t\u1EE5c theo d\xF5i s\xE1t thang \u0111i\u1EC3m c\u1EA3nh b\xE1o s\u1EDBm NEWS2 \u0111\u1ECBnh k\u1EF3.";
    } else {
      summarySentence = "Ch\u01B0a ghi nh\u1EADn b\u1EB1ng ch\u1EE9ng nhi\u1EC5m tr\xF9ng ho\u1EB7c nguy c\u01A1 sepsis t\u1EA1i th\u1EDDi \u0111i\u1EC3m \u0111\xE1nh gi\xE1.";
    }
    const antibioticRegimen = [];
    let antibioticTiming = "";
    let fluidResuscitation = "";
    let vasopressorStrategy = "";
    const escalationAndConsult = [];
    let monitoringFrequency = "";
    const microbiologySteps = [];
    let sourceControlNotes = "";
    if (primaryDiagnosis === "no_sepsis") {
      antibioticTiming = "Hi\u1EC7n t\u1EA1i KH\xD4NG C\xD3 CH\u1EC8 \u0110\u1ECANH s\u1EED d\u1EE5ng kh\xE1ng sinh. Ti\u1EBFp t\u1EE5c theo d\xF5i l\xE2m s\xE0ng v\xE0 c\xE1c d\u1EA5u hi\u1EC7u c\u1EA3nh b\xE1o s\u1EDBm.";
      antibioticRegimen.push("Ch\u01B0a c\xF3 ch\u1EC9 \u0111\u1ECBnh kh\xE1ng sinh (Ch\u01B0a ph\xE1t hi\u1EC7n \u1ED5 nhi\u1EC5m ho\u1EB7c h\u1ED9i ch\u1EE9ng nhi\u1EC5m tr\xF9ng).");
    } else if (primaryDiagnosis === "septic_shock" || primaryDiagnosis === "confirmed_sepsis" || nice.riskCategory === "high") {
      antibioticTiming = 'D\xD9NG KH\xC1NG SINH PH\u1ED4 R\u1ED8NG T\u0128NH M\u1EA0CH TRONG V\xD2NG 1 GI\u1EDC ("Gi\u1EDD v\xE0ng" / Hour-1 Bundle). M\u1ED7i gi\u1EDD ch\u1EADm tr\u1EC5 l\xE0m t\u0103ng t\u1EF7 l\u1EC7 t\u1EED vong 7 - 8%.';
    } else if (nice.riskCategory === "medium") {
      antibioticTiming = "\u0110\xE1nh gi\xE1 kh\u1EA9n v\xE0 kh\u1EDFi \u0111\u1EA7u kh\xE1ng sinh trong v\xF2ng 3 GI\u1EDC n\u1EBFu nguy\xEAn nh\xE2n nhi\u1EC5m khu\u1EA9n v\u1EABn c\xF2n nghi ng\u1EDD sau c\xE1c b\u01B0\u1EDBc th\u0103m d\xF2 nhanh.";
    } else {
      antibioticTiming = "Tr\xEC ho\xE3n kh\xE1ng sinh t\u1ED1i \u0111a 6 gi\u1EDD \u0111\u1EC3 thu th\u1EADp b\u1EB1ng ch\u1EE9ng ch\u1EA9n \u0111o\xE1n x\xE1c \u0111\u1ECBnh t\xE1c nh\xE2n, tr\xE1nh l\u1EA1m d\u1EE5ng kh\xE1ng sinh ph\u1ED5 r\u1ED9ng.";
    }
    if (primaryDiagnosis !== "no_sepsis") {
      if (patient.rapidMolecularT2Done && patient.rapidMolecularResult === "positive" && patient.rapidMolecularPathogen) {
        const genes = patient.rapidMolecularResistanceGenes || [];
        antibioticRegimen.push(`T2Bacteria ph\xE1t hi\u1EC7n nhanh: ${patient.rapidMolecularPathogen} (Ti\u1EBFt ki\u1EC7m > 100 gi\u1EDD so v\u1EDBi c\u1EA5y m\xE1u th\u01B0\u1EDDng).`);
        if (genes.includes("blaKPC") || genes.includes("blaOXA-48")) {
          antibioticRegimen.push("Ph\xE1t hi\u1EC7n gen Carbapenemase (KPC / OXA-48): \u0110\u1ED5i sang Ceftazidime / Avibactam (c\xF3 th\u1EC3 k\u1EBFt h\u1EE3p Aztreonam n\u1EBFu c\xF3 Metallo-\u03B2-lactamase NDM/VIM).");
        } else if (genes.includes("blaCTX-M")) {
          antibioticRegimen.push("Ph\xE1t hi\u1EC7n gen ESBL (CTX-M): \u01AFu ti\xEAn d\xF9ng nh\xF3m Carbapenem (Meropenem 1-2g m\u1ED7i 8h truy\u1EC1n k\xE9o d\xE0i) ho\u1EB7c Ceftolozane/Tazobactam.");
        }
      } else {
        if (patient.patientType === "maternal") {
          antibioticRegimen.push("S\u1EA3n khoa: Meropenem 1g TTM q8h (truy\u1EC1n k\xE9o d\xE0i 3-4h) + Daptomycin 10mg/kg (ho\u1EB7c Linezolid 600mg q12h).");
          if (patient.hasImmunosuppression) {
            antibioticRegimen.push("N\u1EBFu d\u1ECB \u1EE9ng Penicillin: Ph\u1ED1i h\u1EE3p Aztreonam + Amikacin ho\u1EB7c Fosfomycin \u0111\u1EC3 bao ph\u1EE7 vi khu\u1EA9n Gr(-).");
          }
        } else if (patient.patientType === "pediatric") {
          if (patient.ageYears >= 16) {
            antibioticRegimen.push("Thanh thi\u1EBFu ni\xEAn 16-18 tu\u1ED5i (NICE NG253): Ceftriaxone 80 mg/kg ti\xEAm 1 l\u1EA7n/ng\xE0y (t\u1ED1i \u0111a 4g/ng\xE0y).");
          } else {
            antibioticRegimen.push("Nhi khoa: Ceftriaxone ho\u1EB7c Cefotaxime ph\u1ED1i h\u1EE3p Vancomycin n\u1EBFu nghi ng\u1EDD t\u1EE5 c\u1EA7u kh\xE1ng Methicillin (MRSA).");
          }
        } else {
          if (patient.infectionSource === "respiratory") {
            antibioticRegimen.push("H\xF4 h\u1EA5p (Vi\xEAm ph\u1ED5i n\u1EB7ng/Sepsis): Piperacillin/Tazobactam 4.5g TTM q6h (truy\u1EC1n k\xE9o d\xE0i 3-4h) HO\u1EB6C Cefepime 2g q8h, ph\u1ED1i h\u1EE3p Macrolide ho\u1EB7c Levofloxacin.");
          } else if (patient.infectionSource === "urinary") {
            antibioticRegimen.push("Ti\u1EBFt ni\u1EC7u: Ceftriaxone 2g/ng\xE0y ho\u1EB7c Meropenem 1g q8h n\u1EBFu c\xF3 y\u1EBFu t\u1ED1 nguy c\u01A1 vi khu\u1EA9n sinh ESBL.");
          } else if (patient.infectionSource === "abdominal") {
            antibioticRegimen.push("\u1ED4 b\u1EE5ng: Piperacillin/Tazobactam ho\u1EB7c Meropenem + Metronidazole n\u1EBFu c\u1EA7n b\u1EA3o v\u1EC7 vi khu\u1EA9n k\u1EF5 kh\xED s\xE2u.");
          } else {
            antibioticRegimen.push("Nhi\u1EC5m tr\xF9ng ch\u01B0a r\xF5 ngu\u1ED3n: Meropenem 1-2g q8h (truy\u1EC1n k\xE9o d\xE0i) + Vancomycin 15-20 mg/kg (n\u1EBFu c\xF3 nguy c\u01A1 cao MRSA).");
          }
        }
      }
    }
    if (primaryDiagnosis === "no_sepsis") {
      fluidResuscitation = "Ch\u01B0a c\xF3 ch\u1EC9 \u0111\u1ECBnh h\u1ED3i s\u1EE9c d\u1ECBch c\u1EA5p c\u1EE9u. Duy tr\xEC nhu c\u1EA7u d\u1ECBch c\u01A1 b\u1EA3n sinh l\xFD b\xECnh th\u01B0\u1EDDng.";
    } else if (patient.patientType === "maternal") {
      fluidResuscitation = patient.isPostpartum ? "H\u1EADu s\u1EA3n: Bolus ban \u0111\u1EA7u 30 mL/kg dung d\u1ECBch tinh th\u1EC3 \u0111\u1EB3ng tr\u01B0\u01A1ng (Ringer Lactate / Hartmann) trong 3 gi\u1EDD \u0111\u1EA7u. Tr\xE1nh qu\xE1 t\u1EA3i tu\u1EA7n ho\xE0n." : "Thai k\u1EF3: B\u1EAFt \u0111\u1EA7u th\u1EADn tr\u1ECDng h\u01A1n v\u1EDBi bolus 20 mL/kg dung d\u1ECBch tinh th\u1EC3 \u0111\u1EB3ng tr\u01B0\u01A1ng trong 3 gi\u1EDD \u0111\u1EA7u, do nguy c\u01A1 ph\xF9 ph\u1ED5i c\u1EA5p \u1EDF ph\u1EE5 n\u1EEF mang thai t\u0103ng cao.";
    } else if (patient.patientType === "pediatric") {
      fluidResuscitation = "Nhi khoa: Bolus 10 - 20 mL/kg dung d\u1ECBch tinh th\u1EC3 c\xE2n b\u1EB1ng trong 30 - 60 ph\xFAt, \u0111\xE1nh gi\xE1 k\u1EF9 d\u1EA5u hi\u1EC7u qu\xE1 t\u1EA3i d\u1ECBch (gan to, ran \u1EA9m ph\u1ED5i) tr\u01B0\u1EDBc m\u1ED7i li\u1EC1u l\u1EB7p l\u1EA1i.";
    } else {
      if (patient.setting === "acute_hospital" || patient.setting === "community_custodial") {
        fluidResuscitation = "Khuy\u1EBFn c\xE1o NICE NG253 (2025/2026): B\u1EAFt \u0111\u1EA7u bolus 250 mL dung d\u1ECBch tinh th\u1EC3 c\xE2n b\u1EB1ng (Hartmann / Ringer Lactate) trong 10 - 15 ph\xFAt. C\xF3 th\u1EC3 l\u1EB7p l\u1EA1i t\u1EEBng li\u1EC1u 250 mL \u0111\u1EBFn t\u1ED1i \u0111a 1,000 mL. B\u1EAFt bu\u1ED9c \u0111\xE1nh gi\xE1 l\u1EA1i l\xE2m s\xE0ng v\xE0 SpO2 sau m\u1ED7i li\u1EC1u. N\u1EBFu sau 1,000 mL ch\u01B0a c\u1EA3i thi\u1EC7n huy\u1EBFt \xE1p/tri gi\xE1c, ph\u1EA3i h\u1ED9i ch\u1EA9n B\xE1c s\u0129 c\u1EA5p cao (ST3+) ho\u1EB7c ICU.";
      } else {
        fluidResuscitation = "Theo SSC 2021: Truy\u1EC1n \xEDt nh\u1EA5t 30 mL/kg dung d\u1ECBch tinh th\u1EC3 c\xE2n b\u1EB1ng (Balanced Crystalloid) trong 3 gi\u1EDD \u0111\u1EA7u \u0111\u1ED1i v\u1EDBi gi\u1EA3m t\u01B0\u1EDBi m\xE1u ho\u1EB7c s\u1ED1c nhi\u1EC5m khu\u1EA9n. H\u01B0\u1EDBng d\u1EABn b\xF9 d\u1ECBch ti\u1EBFp theo b\u1EB1ng c\xE1c bi\u1EC7n ph\xE1p \u0111\u1ED9ng h\u1ECDc (test n\xE2ng ch\xE2n th\u1EE5 \u0111\u1ED9ng PLR, bi\u1EBFn thi\xEAn th\u1EC3 t\xEDch nh\xE1t b\xF3p SVV) v\xE0 th\u1EDDi gian ph\u1EE5c h\u1ED3i m\xE0u da mao m\u1EA1ch (CRT \u2264 2s).";
      }
    }
    if (primaryDiagnosis === "septic_shock" || map < 65) {
      vasopressorStrategy = "Norepinephrine l\xE0 thu\u1ED1c v\u1EADn m\u1EA1ch l\u1EF1a ch\u1ECDn h\xE0ng \u0111\u1EA7u (First-line). \u0110\xEDch duy tr\xEC Huy\u1EBFt \xE1p trung b\xECnh MAP \u2265 65 mmHg. Theo SSC 2021 v\xE0 NICE 2025: c\xF3 th\u1EC3 kh\u1EDFi \u0111\u1ED9ng truy\u1EC1n qua \u0111\u01B0\u1EDDng ngo\u1EA1i bi\xEAn t\u1EA1m th\u1EDDi (t\u0129nh m\u1EA1ch l\u1EDBn v\xF9ng khu\u1EF7u tay tr\u1EDF l\xEAn) trong khi chu\u1EA9n b\u1ECB \u0111\u1EB7t Catheter t\u0129nh m\u1EA1ch trung t\xE2m (CVC) \u0111\u1EC3 tr\xE1nh ch\u1EADm tr\u1EC5. N\u1EBFu li\u1EC1u Norepinephrine \u0111\u1EA1t 0.25 - 0.5 mcg/kg/ph\xFAt m\xE0 MAP ch\u01B0a \u0111\u1EA1t, ph\u1ED1i h\u1EE3p th\xEAm Vasopressin 0.03 \u0111v/ph\xFAt thay v\xEC t\u0103ng li\u1EC1u cao Norepinephrine. Th\xEAm Dobutamine n\u1EBFu c\xF3 b\u1EB1ng ch\u1EE9ng r\u1ED1i lo\u1EA1n ch\u1EE9c n\u0103ng c\u01A1 tim/cung l\u01B0\u1EE3ng tim th\u1EA5p.";
    } else {
      vasopressorStrategy = "Hi\u1EC7n t\u1EA1i ch\u01B0a c\u1EA7n d\xF9ng thu\u1ED1c v\u1EADn m\u1EA1ch. Theo d\xF5i s\xE1t huy\u1EBFt \xE1p \u0111\u1ED9ng m\u1EA1ch v\xE0 duy tr\xEC MAP \u2265 65 mmHg.";
    }
    if (primaryDiagnosis === "septic_shock") {
      escalationAndConsult.push("B\xE1o \u0111\u1ED9ng \u0110\u1ED9i H\u1ED3i s\u1EE9c T\xEDch c\u1EF1c (ICU / MET Team) ti\u1EBFp nh\u1EADn b\u1EC7nh nh\xE2n kh\u1EA9n c\u1EA5p (khuy\u1EBFn c\xE1o nh\u1EADp ICU trong v\xF2ng 6 gi\u1EDD).");
      escalationAndConsult.push("B\xE1c s\u0129 c\u1EA5p cao (Senior decision maker ST3+ / B\xE1c s\u0129 CKII H\u1ED3i s\u1EE9c) ph\u1EA3i tr\u1EF1c ti\u1EBFp c\xF3 m\u1EB7t t\u1EA1i gi\u01B0\u1EDDng b\u1EC7nh.");
    } else if (nice.riskCategory === "high") {
      escalationAndConsult.push("Y\xEAu c\u1EA7u B\xE1c s\u0129 c\xF3 n\u0103ng l\u1EF1c h\u1ED3i s\u1EE9c c\u1EA5p c\u1EE9u (FY2 tr\u1EDF l\xEAn) \u0111\xE1nh gi\xE1 tr\u1EF1c ti\u1EBFp ngay t\u1EA1i gi\u01B0\u1EDDng b\u1EC7nh.");
      escalationAndConsult.push("H\u1ED9i ch\u1EA9n B\xE1c s\u0129 c\u1EA5p cao (ST3+) n\u1EBFu b\u1EC7nh nh\xE2n kh\xF4ng c\u1EA3i thi\u1EC7n trong v\xF2ng 1 gi\u1EDD sau can thi\u1EC7p ban \u0111\u1EA7u.");
    } else if (news2.hasSingleParam3) {
      escalationAndConsult.push("C\u1EA3nh b\xE1o Red Flag (1 th\xF4ng s\u1ED1 3 \u0111i\u1EC3m): B\xE1c s\u0129 FY2+ \u0111\xE1nh gi\xE1 kh\u1EA9n c\u1EA5p \u0111\u1EC3 x\xE1c \u0111\u1ECBnh nguy c\u01A1 suy c\u01A1 quan ti\u1EC1m \u1EA9n do nhi\u1EC5m khu\u1EA9n.");
    } else if (primaryDiagnosis === "no_sepsis") {
      escalationAndConsult.push("Theo d\xF5i sinh hi\u1EC7u \u0111\u1ECBnh k\u1EF3 theo quy tr\xECnh th\u01B0\u1EDDng quy c\u1EE7a khoa ph\xF2ng.");
    }
    if (nice.riskCategory === "high" || primaryDiagnosis === "septic_shock") {
      monitoringFrequency = "\u0110o l\u1EA1i sinh hi\u1EC7u & t\xEDnh \u0111i\u1EC3m NEWS2 m\u1ED7i 30 PH\xDAT. \u0110\xE1nh gi\xE1 l\u1EA1i li\xEAn t\u1EE5c \u0111\xE1p \u1EE9ng t\u01B0\u1EDBi m\xE1u m\xF4 (CRT, tri gi\xE1c, n\u01B0\u1EDBc ti\u1EC3u).";
    } else if (nice.riskCategory === "medium") {
      monitoringFrequency = "\u0110o l\u1EA1i sinh hi\u1EC7u & t\xEDnh \u0111i\u1EC3m NEWS2 m\u1ED7i 1 GI\u1EDC. \u0110\xE1nh gi\xE1 l\u1EA1i k\u1EBFt qu\u1EA3 Lactate t\u0129nh m\u1EA1ch trong v\xF2ng 1 gi\u1EDD.";
    } else {
      monitoringFrequency = "\u0110o l\u1EA1i sinh hi\u1EC7u & \u0111i\u1EC3m NEWS2 m\u1ED7i 4 - 6 GI\u1EDC ho\u1EB7c theo quy tr\xECnh ch\u0103m s\xF3c n\u1ED9i tr\xFA th\xF4ng th\u01B0\u1EDDng.";
    }
    if (primaryDiagnosis !== "no_sepsis") {
      microbiologySteps.push("C\u1EA5y m\xE1u: L\u1EA5y \xEDt nh\u1EA5t 2 b\u1ED9 c\u1EA5y m\xE1u (hi\u1EBFu kh\xED & k\u1EF5 kh\xED) t\u1EEB 2 v\u1ECB tr\xED kh\xE1c nhau TR\u01AF\u1EDAC KHI TI\xCAM KH\xC1NG SINH, kh\xF4ng \u0111\u1EC3 vi\u1EC7c l\u1EA5y m\xE1u l\xE0m ch\u1EADm tr\u1EC5 kh\xE1ng sinh > 45 ph\xFAt.");
      if (patient.infectionSource === "urinary") {
        microbiologySteps.push("Vi sinh \u0111\u01B0\u1EDDng ni\u1EC7u: L\u1EA5y m\u1EABu n\u01B0\u1EDBc ti\u1EC3u gi\u1EEFa d\xF2ng (MSU) ho\u1EB7c qua \u1ED1ng th\xF4ng ni\u1EC7u v\xF4 khu\u1EA9n m\u1EDBi \u0111\u1EC3 soi t\u01B0\u01A1i vi khu\u1EA9n/b\u1EA1ch c\u1EA7u, t\u1ED5ng ph\xE2n t\xEDch n\u01B0\u1EDBc ti\u1EC3u v\xE0 c\u1EA5y vi sinh l\xE0m kh\xE1ng sinh \u0111\u1ED3 tr\u01B0\u1EDBc khi d\xF9ng kh\xE1ng sinh.");
      }
      microbiologySteps.push("X\xE9t nghi\u1EC7m m\xE1u t\u0129nh m\u1EA1ch kh\u1EA9n: Kh\xED m\xE1u (Lactate, Glucose), T\u1ED5ng ph\xE2n t\xEDch t\u1EBF b\xE0o m\xE1u, CRP, Ch\u1EE9c n\u0103ng th\u1EADn (Urea, Creatinine), Gan (Bilirubin, Men gan), \u0110\xF4ng m\xE1u (INR, D-dimer, Fibrinogen).");
      microbiologySteps.push("Khuy\u1EBFn c\xE1o NICE 2026: C\xE2n nh\u1EAFc x\xE9t nghi\u1EC7m Procalcitonin (PCT) \u1EDF nh\xF3m nguy c\u01A1 trung b\xECnh v\xE0 cao \u0111\u1EC3 h\u01B0\u1EDBng d\u1EABn ph\xE2n t\u1EA7ng nguy c\u01A1 v\xE0 quy\u1EBFt \u0111\u1ECBnh d\u1EEBng kh\xE1ng sinh an to\xE0n.");
      microbiologySteps.push("\u1EE8ng d\u1EE5ng ch\u1EA9n \u0111o\xE1n ph\xE2n t\u1EED nhanh (T2Bacteria / T2Resistance Panel): Cho k\u1EBFt qu\u1EA3 tr\u1EF1c ti\u1EBFp t\u1EEB m\xE1u to\xE0n ph\u1EA7n trong v\xF2ng 3-5 gi\u1EDD \u0111\u1ED1i v\u1EDBi vi khu\u1EA9n ESKAPE (K. pneumoniae, P. aeruginosa, A. baumannii) v\xE0 gen kh\xE1ng carbapenem, gi\xFAp chuy\u1EC3n kh\xE1ng sinh tr\xFAng \u0111\xEDch s\u1EDBm h\u01A1n > 100 gi\u1EDD.");
    } else {
      microbiologySteps.push("Ch\u01B0a c\xF3 ch\u1EC9 \u0111\u1ECBnh c\u1EA5y m\xE1u ho\u1EB7c ch\u1EA9n \u0111o\xE1n ph\xE2n t\u1EED kh\u1EA9n. Theo d\xF5i c\xE1c x\xE9t nghi\u1EC7m th\u01B0\u1EDDng quy.");
    }
    if (primaryDiagnosis === "no_sepsis") {
      sourceControlNotes = "Ch\u01B0a ph\xE1t hi\u1EC7n \u1ED5 nhi\u1EC5m khu\u1EA9n c\u1EA7n can thi\u1EC7p ngo\u1EA1i khoa hay th\u1EE7 thu\u1EADt x\xE2m l\u1EA5n.";
    } else if (patient.infectionSource === "urinary") {
      sourceControlNotes = "Nhi\u1EC5m tr\xF9ng \u0111\u01B0\u1EDDng ni\u1EC7u (Urosepsis): Si\xEAu \xE2m h\u1EC7 ti\u1EBFt ni\u1EC7u kh\u1EA9n c\u1EA5p lo\u1EA1i tr\u1EEB \u1EE9 m\u1EE7 b\u1EC3 th\u1EADn ho\u1EB7c b\u1EBF t\u1EAFc do s\u1ECFi ni\u1EC7u qu\u1EA3n. N\u1EBFu c\xF3 b\u1EBF t\u1EAFc c\u01A1 h\u1ECDc k\xE8m nhi\u1EC5m tr\xF9ng, B\u1EAET BU\u1ED8C can thi\u1EC7p gi\u1EA3i \xE1p kh\u1EA9n (\u0111\u1EB7t \u1ED1ng th\xF4ng JJ ni\u1EC7u qu\u1EA3n ho\u1EB7c d\u1EABn l\u01B0u b\u1EC3 th\u1EADn qua da PCN) trong v\xF2ng 6 - 12 gi\u1EDD (SSC 2021 & EAU 2024 Guidelines). R\xFAt ho\u1EB7c thay catheter ni\u1EC7u n\u1EBFu b\u1EC7nh nh\xE2n \u0111ang \u0111\u1EB7t \u1ED1ng th\xF4ng l\u01B0u.";
    } else {
      sourceControlNotes = "T\xECm v\xE0 ki\u1EC3m so\xE1t tri\u1EC7t \u0111\u1EC3 \u1ED5 nhi\u1EC5m khu\u1EA9n trong v\xF2ng 6 - 12 gi\u1EDD (D\u1EABn l\u01B0u \xE1p xe, ph\u1EABu thu\u1EADt c\u1EAFt l\u1ECDc m\xF4 ho\u1EA1i t\u1EED, r\xFAt ngay catheter t\u0129nh m\u1EA1ch nghi nhi\u1EC5m khu\u1EA9n sau khi \u0111\xE3 thi\u1EBFt l\u1EADp \u0111\u01B0\u1EDDng truy\u1EC1n m\u1EDBi, si\xEAu \xE2m/CT b\u1EE5ng ti\u1EC3u khung n\u1EBFu ch\u01B0a r\xF5 ngu\u1ED3n).";
    }
    return {
      sofaScore: sofa.score,
      sofaBreakdown: sofa.breakdown,
      deltaSofa: sofa.score,
      qsofaScore: qsofa.score,
      qsofaBreakdown: qsofa.breakdown,
      qsofaCriteriaMet: qsofa.criteriaMet,
      isQsofaPositive: qsofa.isHighRisk,
      isSepsis3,
      isSepticShock3,
      sirsScore: sirs.score,
      sirsCriteriaMet: sirs.criteriaMet,
      isSirsPositive: sirs.isPositive,
      news2Score: news2.score,
      news2Breakdown: news2.breakdown,
      news2RiskCategory: news2.riskCategory,
      hasSingleParam3RedFlag: news2.hasSingleParam3,
      lpNewsScore: lpNews.score,
      lpNewsBreakdown: lpNews.breakdown,
      lpNewsMortalityRiskTier: lpNews.riskTier,
      lpNewsPredictedMortalityText: lpNews.predictedMortalityText,
      niceRiskCategory: nice.riskCategory,
      niceHighRiskCriteriaMet: nice.highRiskCriteria,
      niceMediumRiskCriteriaMet: nice.mediumRiskCriteria,
      niceAntibioticMaxDelayHours: nice.maxAntibioticDelayHours,
      phoenixScore: phoenixRes?.score,
      phoenixBreakdown: phoenixRes?.breakdown,
      phoenixCardiovascularScore: phoenixRes?.cvScore,
      isPhoenixSepsis: phoenixRes?.isSepsis,
      isPhoenixSepticShock: phoenixRes?.isSepticShock,
      obstetricQsofaScore: obstetricRes?.qsofaScore,
      obstetricQsofaBreakdown: obstetricRes?.qsofaBreakdown,
      obstetricSofaScore: obstetricRes?.sofaScore,
      obstetricSofaBreakdown: obstetricRes?.sofaBreakdown,
      isObstetricSepsis: obstetricRes?.isSepsis,
      isObstetricSepticShock: obstetricRes?.isSepticShock,
      calculatedMap: map,
      calculatedNlr: nlrCalc.nlr,
      nlrRiskLevel: nlrCalc.riskLevel,
      lactateClearancePercent: lactateKinetics.clearancePercent,
      lactateClearanceEvaluation: lactateKinetics.evaluation,
      pctEvaluation: patient.procalcitonin ? `${patient.procalcitonin} ng/mL (${patient.procalcitonin >= 2 ? "Nguy c\u01A1 cao nhi\u1EC5m khu\u1EA9n huy\u1EBFt do vi khu\u1EA9n" : "M\u1EE9c th\u1EA5p/ch\u01B0a \u0111i\u1EC3n h\xECnh"})` : void 0,
      crpEvaluation: patient.crp ? `${patient.crp} mg/L (${patient.crp > 100 ? "Vi\xEAm h\u1EC7 th\u1ED1ng c\u1EA5p t\xEDnh n\u1EB7ng" : "T\u0103ng m\u1EE9c \u0111\u1ED9 v\u1EEBa"})` : void 0,
      primaryDiagnosis,
      urgencyLevel,
      summarySentence,
      actions: {
        antibioticTiming,
        antibioticRegimen,
        fluidResuscitation,
        vasopressorStrategy,
        escalationAndConsult,
        monitoringFrequency,
        microbiologySteps,
        sourceControlNotes
      }
    };
  }

  // C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/node_modules/lucide-react/dist/esm/createLucideIcon.js
  var import_react2 = __toESM(require_react());

  // C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/node_modules/lucide-react/dist/esm/shared/src/utils.js
  var toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
  var toCamelCase = (string) => string.replace(
    /^([A-Z])|[\s-_]+(\w)/g,
    (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
  );
  var toPascalCase = (string) => {
    const camelCase = toCamelCase(string);
    return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
  };
  var mergeClasses = (...classes) => classes.filter((className, index, array) => {
    return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
  }).join(" ").trim();
  var hasA11yProp = (props) => {
    for (const prop in props) {
      if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
        return true;
      }
    }
  };

  // C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/node_modules/lucide-react/dist/esm/Icon.js
  var import_react = __toESM(require_react());

  // C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/node_modules/lucide-react/dist/esm/defaultAttributes.js
  var defaultAttributes = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  };

  // C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/node_modules/lucide-react/dist/esm/Icon.js
  var Icon = (0, import_react.forwardRef)(
    ({
      color = "currentColor",
      size = 24,
      strokeWidth = 2,
      absoluteStrokeWidth,
      className = "",
      children,
      iconNode,
      ...rest
    }, ref) => (0, import_react.createElement)(
      "svg",
      {
        ref,
        ...defaultAttributes,
        width: size,
        height: size,
        stroke: color,
        strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
        className: mergeClasses("lucide", className),
        ...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
        ...rest
      },
      [
        ...iconNode.map(([tag, attrs]) => (0, import_react.createElement)(tag, attrs)),
        ...Array.isArray(children) ? children : [children]
      ]
    )
  );

  // C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/node_modules/lucide-react/dist/esm/createLucideIcon.js
  var createLucideIcon = (iconName, iconNode) => {
    const Component = (0, import_react2.forwardRef)(
      ({ className, ...props }, ref) => (0, import_react2.createElement)(Icon, {
        ref,
        iconNode,
        className: mergeClasses(
          `lucide-${toKebabCase(toPascalCase(iconName))}`,
          `lucide-${iconName}`,
          className
        ),
        ...props
      })
    );
    Component.displayName = toPascalCase(iconName);
    return Component;
  };

  // C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/node_modules/lucide-react/dist/esm/icons/activity.js
  var __iconNode = [
    [
      "path",
      {
        d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
        key: "169zse"
      }
    ]
  ];
  var Activity = createLucideIcon("activity", __iconNode);

  // C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/node_modules/lucide-react/dist/esm/icons/arrow-right.js
  var __iconNode2 = [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
  ];
  var ArrowRight = createLucideIcon("arrow-right", __iconNode2);

  // C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/node_modules/lucide-react/dist/esm/icons/baby.js
  var __iconNode3 = [
    ["path", { d: "M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5", key: "1u7htd" }],
    ["path", { d: "M15 12h.01", key: "1k8ypt" }],
    [
      "path",
      {
        d: "M19.38 6.813A9 9 0 0 1 20.8 10.2a2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1",
        key: "11xh7x"
      }
    ],
    ["path", { d: "M9 12h.01", key: "157uk2" }]
  ];
  var Baby = createLucideIcon("baby", __iconNode3);

  // C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/node_modules/lucide-react/dist/esm/icons/book-open.js
  var __iconNode4 = [
    ["path", { d: "M12 7v14", key: "1akyts" }],
    [
      "path",
      {
        d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
        key: "ruj8y"
      }
    ]
  ];
  var BookOpen = createLucideIcon("book-open", __iconNode4);

  // C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/node_modules/lucide-react/dist/esm/icons/bookmark-plus.js
  var __iconNode5 = [
    ["path", { d: "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z", key: "1fy3hk" }],
    ["line", { x1: "12", x2: "12", y1: "7", y2: "13", key: "1cppfj" }],
    ["line", { x1: "15", x2: "9", y1: "10", y2: "10", key: "1gty7f" }]
  ];
  var BookmarkPlus = createLucideIcon("bookmark-plus", __iconNode5);

  // C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/node_modules/lucide-react/dist/esm/icons/calendar.js
  var __iconNode6 = [
    ["path", { d: "M8 2v4", key: "1cmpym" }],
    ["path", { d: "M16 2v4", key: "4m81vk" }],
    ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
    ["path", { d: "M3 10h18", key: "8toen8" }]
  ];
  var Calendar = createLucideIcon("calendar", __iconNode6);

  // C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/node_modules/lucide-react/dist/esm/icons/check.js
  var __iconNode7 = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]];
  var Check = createLucideIcon("check", __iconNode7);

  // C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/node_modules/lucide-react/dist/esm/icons/chevron-down.js
  var __iconNode8 = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]];
  var ChevronDown = createLucideIcon("chevron-down", __iconNode8);

  // C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/node_modules/lucide-react/dist/esm/icons/chevron-up.js
  var __iconNode9 = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]];
  var ChevronUp = createLucideIcon("chevron-up", __iconNode9);

  // C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/node_modules/lucide-react/dist/esm/icons/chevrons-left.js
  var __iconNode10 = [
    ["path", { d: "m11 17-5-5 5-5", key: "13zhaf" }],
    ["path", { d: "m18 17-5-5 5-5", key: "h8a8et" }]
  ];
  var ChevronsLeft = createLucideIcon("chevrons-left", __iconNode10);

  // C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/node_modules/lucide-react/dist/esm/icons/chevrons-right.js
  var __iconNode11 = [
    ["path", { d: "m6 17 5-5-5-5", key: "xnjwq" }],
    ["path", { d: "m13 17 5-5-5-5", key: "17xmmf" }]
  ];
  var ChevronsRight = createLucideIcon("chevrons-right", __iconNode11);

  // C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/node_modules/lucide-react/dist/esm/icons/circle-check.js
  var __iconNode12 = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
  ];
  var CircleCheck = createLucideIcon("circle-check", __iconNode12);

  // C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/node_modules/lucide-react/dist/esm/icons/clock.js
  var __iconNode13 = [
    ["path", { d: "M12 6v6l4 2", key: "mmk7yg" }],
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
  ];
  var Clock = createLucideIcon("clock", __iconNode13);

  // C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/node_modules/lucide-react/dist/esm/icons/copy.js
  var __iconNode14 = [
    ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
    ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
  ];
  var Copy = createLucideIcon("copy", __iconNode14);

  // C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/node_modules/lucide-react/dist/esm/icons/dna.js
  var __iconNode15 = [
    ["path", { d: "m10 16 1.5 1.5", key: "11lckj" }],
    ["path", { d: "m14 8-1.5-1.5", key: "1ohn8i" }],
    ["path", { d: "M15 2c-1.798 1.998-2.518 3.995-2.807 5.993", key: "80uv8i" }],
    ["path", { d: "m16.5 10.5 1 1", key: "696xn5" }],
    ["path", { d: "m17 6-2.891-2.891", key: "xu6p2f" }],
    ["path", { d: "M2 15c6.667-6 13.333 0 20-6", key: "1pyr53" }],
    ["path", { d: "m20 9 .891.891", key: "3xwk7g" }],
    ["path", { d: "M3.109 14.109 4 15", key: "q76aoh" }],
    ["path", { d: "m6.5 12.5 1 1", key: "cs35ky" }],
    ["path", { d: "m7 18 2.891 2.891", key: "1sisit" }],
    ["path", { d: "M9 22c1.798-1.998 2.518-3.995 2.807-5.993", key: "q3hbxp" }]
  ];
  var Dna = createLucideIcon("dna", __iconNode15);

  // C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/node_modules/lucide-react/dist/esm/icons/droplet.js
  var __iconNode16 = [
    [
      "path",
      {
        d: "M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z",
        key: "c7niix"
      }
    ]
  ];
  var Droplet = createLucideIcon("droplet", __iconNode16);

  // C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/node_modules/lucide-react/dist/esm/icons/heart.js
  var __iconNode17 = [
    [
      "path",
      {
        d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",
        key: "mvr1a0"
      }
    ]
  ];
  var Heart = createLucideIcon("heart", __iconNode17);

  // C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/node_modules/lucide-react/dist/esm/icons/history.js
  var __iconNode18 = [
    ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
    ["path", { d: "M3 3v5h5", key: "1xhq8a" }],
    ["path", { d: "M12 7v5l4 2", key: "1fdv2h" }]
  ];
  var History = createLucideIcon("history", __iconNode18);

  // C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/node_modules/lucide-react/dist/esm/icons/layers.js
  var __iconNode19 = [
    [
      "path",
      {
        d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
        key: "zw3jo"
      }
    ],
    [
      "path",
      {
        d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
        key: "1wduqc"
      }
    ],
    [
      "path",
      {
        d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
        key: "kqbvx6"
      }
    ]
  ];
  var Layers = createLucideIcon("layers", __iconNode19);

  // C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/node_modules/lucide-react/dist/esm/icons/octagon-alert.js
  var __iconNode20 = [
    ["path", { d: "M12 16h.01", key: "1drbdi" }],
    ["path", { d: "M12 8v4", key: "1got3b" }],
    [
      "path",
      {
        d: "M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z",
        key: "1fd625"
      }
    ]
  ];
  var OctagonAlert = createLucideIcon("octagon-alert", __iconNode20);

  // C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/node_modules/lucide-react/dist/esm/icons/pill.js
  var __iconNode21 = [
    [
      "path",
      { d: "m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z", key: "wa1lgi" }
    ],
    ["path", { d: "m8.5 8.5 7 7", key: "rvfmvr" }]
  ];
  var Pill = createLucideIcon("pill", __iconNode21);

  // C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js
  var __iconNode22 = [
    ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
    ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
  ];
  var RotateCcw = createLucideIcon("rotate-ccw", __iconNode22);

  // C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/node_modules/lucide-react/dist/esm/icons/sparkles.js
  var __iconNode23 = [
    [
      "path",
      {
        d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
        key: "1s2grr"
      }
    ],
    ["path", { d: "M20 2v4", key: "1rf3ol" }],
    ["path", { d: "M22 4h-4", key: "gwowj6" }],
    ["circle", { cx: "4", cy: "20", r: "2", key: "6kqj1y" }]
  ];
  var Sparkles = createLucideIcon("sparkles", __iconNode23);

  // C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/node_modules/lucide-react/dist/esm/icons/stethoscope.js
  var __iconNode24 = [
    ["path", { d: "M11 2v2", key: "1539x4" }],
    ["path", { d: "M5 2v2", key: "1yf1q8" }],
    ["path", { d: "M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1", key: "rb5t3r" }],
    ["path", { d: "M8 15a6 6 0 0 0 12 0v-3", key: "x18d4x" }],
    ["circle", { cx: "20", cy: "10", r: "2", key: "ts1r5v" }]
  ];
  var Stethoscope = createLucideIcon("stethoscope", __iconNode24);

  // C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/node_modules/lucide-react/dist/esm/icons/test-tube.js
  var __iconNode25 = [
    ["path", { d: "M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5c-1.4 0-2.5-1.1-2.5-2.5V2", key: "125lnx" }],
    ["path", { d: "M8.5 2h7", key: "csnxdl" }],
    ["path", { d: "M14.5 16h-5", key: "1ox875" }]
  ];
  var TestTube = createLucideIcon("test-tube", __iconNode25);

  // C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/node_modules/lucide-react/dist/esm/icons/trash-2.js
  var __iconNode26 = [
    ["path", { d: "M10 11v6", key: "nco0om" }],
    ["path", { d: "M14 11v6", key: "outv1u" }],
    ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
    ["path", { d: "M3 6h18", key: "d0wm0j" }],
    ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
  ];
  var Trash2 = createLucideIcon("trash-2", __iconNode26);

  // C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/node_modules/lucide-react/dist/esm/icons/triangle-alert.js
  var __iconNode27 = [
    [
      "path",
      {
        d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
        key: "wmoenq"
      }
    ],
    ["path", { d: "M12 9v4", key: "juzpu7" }],
    ["path", { d: "M12 17h.01", key: "p32p05" }]
  ];
  var TriangleAlert = createLucideIcon("triangle-alert", __iconNode27);

  // C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/node_modules/lucide-react/dist/esm/icons/user.js
  var __iconNode28 = [
    ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
    ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
  ];
  var User = createLucideIcon("user", __iconNode28);

  // C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/node_modules/lucide-react/dist/esm/icons/users.js
  var __iconNode29 = [
    ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
    ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
    ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
    ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
  ];
  var Users = createLucideIcon("users", __iconNode29);

  // C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/node_modules/lucide-react/dist/esm/icons/x.js
  var __iconNode30 = [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
  ];
  var X = createLucideIcon("x", __iconNode30);

  // C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/src/data/presetCases.ts
  var NORMAL_PATIENT_CASE = {
    id: "case-normal",
    patientName: "",
    patientCode: "",
    patientType: "adult",
    ageYears: 35,
    gender: "male",
    setting: "acute_hospital",
    weightKg: 65,
    hasFrailty: false,
    hasImmunosuppression: false,
    hasRecentSurgery: false,
    hasIndwellingCatheter: false,
    hasRepeatedAntibioticUse: false,
    hasSkinBreach: false,
    communicationDifficulty: false,
    suspectedInfection: false,
    infectionSource: "unknown",
    feverOrRigors: false,
    recentMultiplePresentations: false,
    sbp: 120,
    dbp: 80,
    heartRate: 72,
    respiratoryRate: 16,
    temperature: 36.6,
    spo2: 99,
    onSupplementalOxygen: false,
    fio2Percent: 21,
    copdOrHypercapnicRisk: false,
    avpu: "A",
    gcs: 15,
    newAlteredMentalState: false,
    bilateralFixedPupils: false,
    mottledOrAshen: false,
    cyanosis: false,
    nonBlanchingRash: false,
    capillaryRefillSeconds: 1.5,
    urineOutputStatus: "normal",
    invasiveMechanicalVentilation: false,
    nonInvasiveVentilation: false,
    vasoactiveMedCount: 0,
    vasoactiveUsed: {
      norepinephrine: false,
      epinephrine: false,
      vasopressin: false,
      dopamine: false,
      dobutamine: false
    },
    // Chỉ mới có cận lâm sàng các chỉ số của tổng phân tích tế bào máu (TPTTBM / CBC)
    wbc: 6.8,
    neutrophilCount: 4.2,
    lymphocyteCount: 2.1,
    platelets: 250,
    // Chưa có các xét nghiệm chuyên sâu khác
    lactateInitial: void 0,
    lactateRepeat6h: void 0,
    procalcitonin: void 0,
    crp: void 0,
    bilirubinUmolL: void 0,
    creatinineUmolL: void 0,
    bloodCultureCollected: false,
    rapidMolecularT2Done: false
  };
  var PRESET_CASES = [
    {
      id: "case-0-normal",
      title: "Ca 0: B\xECnh th\u01B0\u1EDDng (Kh\xE1m s\u1EE9c kh\u1ECFe / Ch\u01B0a c\xF3 nhi\u1EC5m khu\u1EA9n)",
      subtitle: "Sinh hi\u1EC7u b\xECnh th\u01B0\u1EDDng, ch\u1EC9 m\u1EDBi c\xF3 C\u1EADn l\xE2m s\xE0ng TPTTBM (CBC)",
      category: "M\u1EB7c \u0111\u1ECBnh - B\xECnh th\u01B0\u1EDDng",
      clinicalScenario: "Nam 35 tu\u1ED5i ki\u1EC3m tra s\u1EE9c kh\u1ECFe t\u1ED5ng qu\xE1t. Kh\xF4ng s\u1ED1t, kh\xF4ng kh\xF3 th\u1EDF, kh\xF4ng c\xF3 d\u1EA5u hi\u1EC7u nhi\u1EC5m tr\xF9ng. Sinh hi\u1EC7u ho\xE0n to\xE0n \u1ED5n \u0111\u1ECBnh: HA 120/80 mmHg, M\u1EA1ch 72 l\u1EA7n/ph\xFAt, Th\u1EDF 16 l\u1EA7n/ph\xFAt, SpO2 99% kh\xED tr\u1EDDi. C\u1EADn l\xE2m s\xE0ng ch\u1EC9 m\u1EDBi c\xF3 T\u1ED5ng ph\xE2n t\xEDch t\u1EBF b\xE0o m\xE1u: WBC 6.8 G/L, NEU 4.2 G/L, LYM 2.1 G/L, PLT 250 G/L (NLR = 2.0 - B\xECnh th\u01B0\u1EDDng).",
      patientData: NORMAL_PATIENT_CASE
    },
    {
      id: "case-1-adult-septic-shock",
      title: "Ca 1: Ng\u01B0\u1EDDi l\u1EDBn S\u1ED1c Nhi\u1EC5m Khu\u1EA9n (Sepsis-3 & LP-NEWS)",
      subtitle: "Vi\xEAm ph\u1ED5i c\u1ED9ng \u0111\u1ED3ng bi\u1EBFn ch\u1EE9ng suy \u0111a c\u01A1 quan, h\u1EA1 huy\u1EBFt \xE1p",
      category: "Ng\u01B0\u1EDDi l\u1EDBn - H\u1ED3i s\u1EE9c c\u1EA5p c\u1EE9u",
      clinicalScenario: "Nam 66 tu\u1ED5i, ti\u1EC1n s\u1EED \u0110T\u0110 type 2 v\xE0 t\u0103ng huy\u1EBFt \xE1p, nh\u1EADp vi\u1EC7n v\xEC s\u1ED1t cao r\xE9t run, ho kh\u1EA1c \u0111\u1EDDm m\u1EE7, kh\xF3 th\u1EDF d\u1EEF d\u1ED9i, l\xFA l\u1EABn m\u1EDBi xu\u1EA5t hi\u1EC7n. Huy\u1EBFt \xE1p t\u1EE5t 82/50 mmHg, SpO2 89% d\xF9 th\u1EDF oxy k\xEDnh, Lactate 3.8 mmol/L, PCT 18 ng/mL, NLR 12.5.",
      patientData: {
        id: "case-1",
        patientName: "Tr\u1EA7n V\u0103n H.",
        patientCode: "BN-2026-081",
        patientType: "adult",
        ageYears: 66,
        gender: "male",
        setting: "acute_hospital",
        weightKg: 68,
        hasFrailty: false,
        hasImmunosuppression: false,
        hasRecentSurgery: false,
        hasIndwellingCatheter: false,
        hasRepeatedAntibioticUse: false,
        hasSkinBreach: false,
        communicationDifficulty: false,
        suspectedInfection: true,
        infectionSource: "respiratory",
        feverOrRigors: true,
        recentMultiplePresentations: false,
        sbp: 82,
        dbp: 50,
        heartRate: 124,
        respiratoryRate: 28,
        temperature: 38.9,
        spo2: 89,
        onSupplementalOxygen: true,
        fio2Percent: 35,
        copdOrHypercapnicRisk: false,
        avpu: "V",
        gcs: 13,
        newAlteredMentalState: true,
        bilateralFixedPupils: false,
        mottledOrAshen: true,
        cyanosis: false,
        nonBlanchingRash: false,
        capillaryRefillSeconds: 4,
        urineOutputStatus: "not_12_18h",
        urineOutputMlKgHr: 0.35,
        invasiveMechanicalVentilation: false,
        nonInvasiveVentilation: true,
        vasoactiveMedCount: 1,
        vasoactiveUsed: {
          norepinephrine: true,
          epinephrine: false,
          vasopressin: false,
          dopamine: false,
          dobutamine: false
        },
        pao2: 65,
        lactateInitial: 3.8,
        lactateRepeat6h: 2.9,
        procalcitonin: 18,
        crp: 165,
        wbc: 18.5,
        neutrophilCount: 15.2,
        lymphocyteCount: 1.2,
        platelets: 115,
        bilirubinUmolL: 28,
        creatinineUmolL: 185,
        inr: 1.4,
        dDimerMgL: 2.8,
        fibrinogenMgDl: 210,
        bloodCultureCollected: true,
        bloodCultureResult: "pending",
        rapidMolecularT2Done: true,
        rapidMolecularResult: "positive",
        rapidMolecularPathogen: "Klebsiella pneumoniae",
        rapidMolecularResistanceGenes: ["blaCTX-M"]
      }
    },
    {
      id: "case-2-maternal-sepsis",
      title: "Ca 2: Sepsis S\u1EA3n Khoa H\u1EADu S\u1EA3n (Obstetric SOFA)",
      subtitle: "Nhi\u1EC5m khu\u1EA9n h\u1EADu s\u1EA3n nghi vi\xEAm n\u1ED9i m\u1EA1c t\u1EED cung, m\u1EA1ch nhanh t\u1EE5t HA",
      category: "S\u1EA3n Ph\u1EE5 Khoa",
      clinicalScenario: "S\u1EA3n ph\u1EE5 28 tu\u1ED5i ng\xE0y th\u1EE9 4 sau sinh th\u01B0\u1EDDng, s\u1ED1t cao 39.2\xB0C, t\u1EED cung co h\u1ED3i ch\u1EADm \u1EA5n \u0111au nhi\u1EC1u, s\u1EA3n d\u1ECBch h\xF4i, m\u1EA1ch nhanh 128 bpm, huy\u1EBFt \xE1p 85/55 mmHg, th\u1EDF nhanh 26 l\u1EA7n/ph\xFAt. C\u1EA7n \xE1p d\u1EE5ng Obstetric qSOFA v\xE0 ph\xE1c \u0111\u1ED3 h\u1ED3i s\u1EE9c d\u1ECBch s\u1EA3n khoa.",
      patientData: {
        id: "case-2",
        patientName: "Nguy\u1EC5n Th\u1ECB M.",
        patientCode: "BN-2026-114",
        patientType: "maternal",
        ageYears: 28,
        gender: "female",
        setting: "acute_hospital",
        isPostpartum: true,
        weightKg: 58,
        hasFrailty: false,
        hasImmunosuppression: false,
        hasRecentSurgery: false,
        hasIndwellingCatheter: true,
        hasRepeatedAntibioticUse: false,
        hasSkinBreach: true,
        communicationDifficulty: false,
        suspectedInfection: true,
        infectionSource: "pelvic_obstetric",
        feverOrRigors: true,
        recentMultiplePresentations: false,
        sbp: 85,
        dbp: 55,
        heartRate: 128,
        respiratoryRate: 26,
        temperature: 39.2,
        spo2: 95,
        onSupplementalOxygen: false,
        fio2Percent: 21,
        copdOrHypercapnicRisk: false,
        avpu: "A",
        gcs: 14,
        newAlteredMentalState: false,
        bilateralFixedPupils: false,
        mottledOrAshen: false,
        cyanosis: false,
        nonBlanchingRash: false,
        capillaryRefillSeconds: 3,
        urineOutputStatus: "normal",
        urineOutputMlKgHr: 0.6,
        invasiveMechanicalVentilation: false,
        nonInvasiveVentilation: false,
        vasoactiveMedCount: 0,
        vasoactiveUsed: {
          norepinephrine: false,
          epinephrine: false,
          vasopressin: false,
          dopamine: false,
          dobutamine: false
        },
        lactateInitial: 2.4,
        lactateRepeat6h: 1.6,
        procalcitonin: 4.8,
        crp: 132,
        wbc: 22,
        neutrophilCount: 18.5,
        lymphocyteCount: 1.5,
        platelets: 135,
        bilirubinUmolL: 22,
        creatinineUmolL: 105,
        inr: 1.2,
        dDimerMgL: 1.6,
        fibrinogenMgDl: 340,
        bloodCultureCollected: true,
        bloodCultureResult: "pending",
        rapidMolecularT2Done: false
      }
    },
    {
      id: "case-3-pediatric-phoenix",
      title: "Ca 3: Nhi Khoa - Ti\xEAu Chu\u1EA9n Phoenix Sepsis 2024",
      subtitle: "B\u1EC7nh nhi 5 tu\u1ED5i s\u1ED1t li b\xEC, h\u1EA1 huy\u1EBFt \xE1p theo tu\u1ED5i, t\u0103ng Lactate",
      category: "Nhi Khoa (< 18 tu\u1ED5i)",
      clinicalScenario: "B\xE9 g\xE1i 5 tu\u1ED5i \u0111\u01B0\u1EE3c ng\u01B0\u1EDDi nh\xE0 \u0111\u01B0a \u0111\u1EBFn c\u1EA5p c\u1EE9u trong t\xECnh tr\u1EA1ng s\u1ED1t cao 39.5\xB0C li\xEAn t\u1EE5c 2 ng\xE0y, li b\xEC, m\u1EA1ch 146 bpm, huy\u1EBFt \xE1p 68/42 mmHg (MAP 50.7 mmHg - t\u1EE5t so v\u1EDBi tu\u1ED5i), th\u1EDF co k\xE9o 42 l\u1EA7n/ph\xFAt, SpO2 91% th\u1EDF kh\xED tr\u1EDDi, Lactate m\xE1u 5.6 mmol/L.",
      patientData: {
        id: "case-3",
        patientName: "L\xEA B\u1EA3o N.",
        patientCode: "BN-PED-045",
        patientType: "pediatric",
        ageYears: 5,
        gender: "female",
        setting: "acute_hospital",
        weightKg: 18,
        hasFrailty: false,
        hasImmunosuppression: false,
        hasRecentSurgery: false,
        hasIndwellingCatheter: false,
        hasRepeatedAntibioticUse: false,
        hasSkinBreach: false,
        communicationDifficulty: true,
        suspectedInfection: true,
        infectionSource: "respiratory",
        feverOrRigors: true,
        recentMultiplePresentations: true,
        sbp: 68,
        dbp: 42,
        heartRate: 146,
        respiratoryRate: 42,
        temperature: 39.5,
        spo2: 91,
        onSupplementalOxygen: true,
        fio2Percent: 40,
        copdOrHypercapnicRisk: false,
        avpu: "V",
        gcs: 10,
        newAlteredMentalState: true,
        bilateralFixedPupils: false,
        mottledOrAshen: true,
        cyanosis: false,
        nonBlanchingRash: false,
        capillaryRefillSeconds: 4,
        urineOutputStatus: "not_12_18h",
        urineOutputMlKgHr: 0.4,
        invasiveMechanicalVentilation: false,
        nonInvasiveVentilation: true,
        vasoactiveMedCount: 1,
        vasoactiveUsed: {
          norepinephrine: true,
          epinephrine: false,
          vasopressin: false,
          dopamine: false,
          dobutamine: false
        },
        pao2: 72,
        lactateInitial: 5.6,
        lactateRepeat6h: 3.2,
        procalcitonin: 12.4,
        crp: 110,
        wbc: 24.5,
        neutrophilCount: 20,
        lymphocyteCount: 1.8,
        platelets: 92,
        inr: 1.45,
        dDimerMgL: 3.1,
        fibrinogenMgDl: 85,
        bloodCultureCollected: true,
        bloodCultureResult: "pending",
        rapidMolecularT2Done: false
      }
    },
    {
      id: "case-4-ward-red-flag",
      title: "Ca 4: Suy Gi\u1EA3m C\u1EA5p Tr\xEAn Khoa Ph\xF2ng (D\u1EA5u Hi\u1EC7u \u0110\u1ECF NICE)",
      subtitle: "Nhi\u1EC5m tr\xF9ng \u0111\u01B0\u1EDDng ti\u1EC3u \u1EDF ng\u01B0\u1EDDi cao tu\u1ED5i, c\xF3 1 th\xF4ng s\u1ED1 NEWS2 = 3 \u0111i\u1EC3m",
      category: "N\u1ED9i Tr\xFA / Y T\u1EBF C\u01A1 S\u1EDF",
      clinicalScenario: "B\xE0 78 tu\u1ED5i n\u1EB1m \u0111i\u1EC1u tr\u1ECB s\u1ECFi th\u1EADn, \u0111\u1ED9t ng\u1ED9t s\u1ED1t l\u1EA1nh run 39.3\xB0C, m\u1EA1ch 118 bpm, huy\u1EBFt \xE1p gi\u1EA3m xu\u1ED1ng 94/60 mmHg, th\u1EDF 22 l\u1EA7n/ph\xFAt. D\xF9 t\u1ED5ng \u0111i\u1EC3m NEWS2 = 6, nh\u01B0ng c\xF3 c\xE1c d\u1EA5u hi\u1EC7u nguy c\u01A1 cao (tu\u1ED5i > 75, sonde ti\u1EC3u l\u01B0u, l\xFA l\u1EABn m\u1EDBi). C\u1EA7n b\xE1c s\u0129 FY2+ \u0111\xE1nh gi\xE1 kh\u1EA9n c\u1EA5p.",
      patientData: {
        id: "case-4",
        patientName: "Ho\xE0ng Th\u1ECB K.",
        patientCode: "BN-2026-309",
        patientType: "adult",
        ageYears: 78,
        gender: "female",
        setting: "acute_hospital",
        weightKg: 52,
        hasFrailty: true,
        hasImmunosuppression: false,
        hasRecentSurgery: false,
        hasIndwellingCatheter: true,
        hasRepeatedAntibioticUse: true,
        hasSkinBreach: false,
        communicationDifficulty: true,
        suspectedInfection: true,
        infectionSource: "urinary",
        feverOrRigors: true,
        recentMultiplePresentations: true,
        sbp: 94,
        dbp: 60,
        heartRate: 118,
        respiratoryRate: 22,
        temperature: 39.3,
        spo2: 95,
        onSupplementalOxygen: false,
        fio2Percent: 21,
        copdOrHypercapnicRisk: false,
        avpu: "A",
        gcs: 14,
        newAlteredMentalState: true,
        bilateralFixedPupils: false,
        mottledOrAshen: false,
        cyanosis: false,
        nonBlanchingRash: false,
        capillaryRefillSeconds: 2.5,
        urineOutputStatus: "not_12_18h",
        urineOutputMlKgHr: 0.45,
        invasiveMechanicalVentilation: false,
        nonInvasiveVentilation: false,
        vasoactiveMedCount: 0,
        vasoactiveUsed: {
          norepinephrine: false,
          epinephrine: false,
          vasopressin: false,
          dopamine: false,
          dobutamine: false
        },
        lactateInitial: 2.2,
        lactateRepeat6h: 1.5,
        procalcitonin: 3.5,
        crp: 88,
        wbc: 16.2,
        neutrophilCount: 13.5,
        lymphocyteCount: 1.6,
        platelets: 165,
        bilirubinUmolL: 18,
        creatinineUmolL: 140,
        bloodCultureCollected: true,
        bloodCultureResult: "pending",
        rapidMolecularT2Done: false
      }
    },
    {
      id: "case-5-molecular-t2mr",
      title: "Ca 5: H\u1ED3i S\u1EE9c Sau Ph\u1EABu Thu\u1EADt Tim & T2Bacteria Si\xEAu T\u1ED1c",
      subtitle: "ICU Tim m\u1EA1ch (Biomedicines 2026): Ph\xE1t hi\u1EC7n K. pneumoniae OXA-48 sau 4h",
      category: "ICU Ph\u1EABu Thu\u1EADt Tim M\u1EA1ch",
      clinicalScenario: "Nam 62 tu\u1ED5i sau ph\u1EABu thu\u1EADt b\u1EAFc c\u1EA7u m\u1EA1ch v\xE0nh (CABG) ng\xE0y th\u1EE9 3, s\u1ED1t 38.6\xB0C, \u0111\u1EB7t CVC v\xE0 n\u1ED9i kh\xED qu\u1EA3n. X\xE9t nghi\u1EC7m T2Bacteria v\xE0 T2Resistance Panel tr\u1EF1c ti\u1EBFp t\u1EEB m\xE1u to\xE0n ph\u1EA7n sau 4 gi\u1EDD ph\xE1t hi\u1EC7n K. pneumoniae mang gen kh\xE1ng carbapenem blaOXA-48 + blaCTX-M, gi\xFAp chuy\u1EC3n s\u1EDBm sang Ceftazidime/Avibactam tr\u01B0\u1EDBc c\u1EA5y m\xE1u 100 gi\u1EDD.",
      patientData: {
        id: "case-5",
        patientName: "\u0110\u1EB7ng Tu\u1EA5n A.",
        patientCode: "BN-ICU-612",
        patientType: "adult",
        ageYears: 62,
        gender: "male",
        setting: "icu",
        weightKg: 72,
        hasFrailty: false,
        hasImmunosuppression: false,
        hasRecentSurgery: true,
        hasIndwellingCatheter: true,
        hasRepeatedAntibioticUse: true,
        hasSkinBreach: true,
        communicationDifficulty: false,
        suspectedInfection: true,
        infectionSource: "bloodstream_catheter",
        feverOrRigors: true,
        recentMultiplePresentations: false,
        sbp: 96,
        dbp: 62,
        heartRate: 110,
        respiratoryRate: 24,
        temperature: 38.6,
        spo2: 96,
        onSupplementalOxygen: true,
        fio2Percent: 45,
        copdOrHypercapnicRisk: false,
        avpu: "A",
        gcs: 14,
        newAlteredMentalState: false,
        bilateralFixedPupils: false,
        mottledOrAshen: false,
        cyanosis: false,
        nonBlanchingRash: false,
        capillaryRefillSeconds: 2.5,
        urineOutputStatus: "normal",
        urineOutputMlKgHr: 0.8,
        invasiveMechanicalVentilation: true,
        nonInvasiveVentilation: false,
        vasoactiveMedCount: 1,
        vasoactiveUsed: {
          norepinephrine: true,
          epinephrine: false,
          vasopressin: false,
          dopamine: false,
          dobutamine: false
        },
        pao2: 95,
        lactateInitial: 2.1,
        lactateRepeat6h: 1.4,
        procalcitonin: 6.8,
        crp: 145,
        wbc: 15.6,
        neutrophilCount: 13,
        lymphocyteCount: 1.4,
        platelets: 125,
        bilirubinUmolL: 25,
        creatinineUmolL: 130,
        bloodCultureCollected: true,
        bloodCultureResult: "pending",
        rapidMolecularT2Done: true,
        rapidMolecularResult: "positive",
        rapidMolecularPathogen: "Klebsiella pneumoniae",
        rapidMolecularResistanceGenes: ["blaOXA-48", "blaCTX-M"]
      }
    },
    {
      id: "case-6-uti-urosepsis",
      title: "Ca 6: Nhi\u1EC5m Tr\xF9ng Ti\u1EC3u (Vi\xEAm \u0110\xE0i B\u1EC3 Th\u1EADn C\u1EA5p / Urosepsis)",
      subtitle: "N\u1EEF 54 tu\u1ED5i, s\u1ED1t r\xE9t run, \u0111au h\xF4ng l\u01B0ng, ti\u1EC3u bu\u1ED1t, t\u0103ng NLR & Lactate",
      category: "Ng\u01B0\u1EDDi l\u1EDBn - Ti\u1EBFt ni\u1EC7u / C\u1EA5p c\u1EE9u",
      clinicalScenario: "N\u1EEF 54 tu\u1ED5i, ti\u1EC1n s\u1EED \u0111\xE1i th\xE1o \u0111\u01B0\u1EDDng type 2 v\xE0 s\u1ECFi th\u1EADn, nh\u1EADp vi\u1EC7n v\xEC s\u1ED1t cao 39.2\xB0C, r\xE9t run th\xE0nh c\u01A1n, \u0111au t\u1EE9c d\u1EEF d\u1ED9i v\xF9ng h\xF4ng l\u01B0ng b\xEAn ph\u1EA3i k\xE8m ti\u1EC3u bu\u1ED1t r\u1EAFt, n\u01B0\u1EDBc ti\u1EC3u \u0111\u1EE5c. Kh\xE1m: Rung th\u1EADn (+) b\xEAn ph\u1EA3i. Sinh hi\u1EC7u: HA 105/65 mmHg, M\u1EA1ch 108 l/p, Th\u1EDF 23 l/p, SpO2 96% kh\xED tr\u1EDDi. C\u1EADn l\xE2m s\xE0ng: WBC 17.8 G/L, NEU 15.2 G/L, LYM 1.2 G/L (NLR 12.7 - Nguy c\u01A1 cao), Ti\u1EC3u c\u1EA7u 190 G/L, Lactate 2.3 mmol/L, PCT 4.6 ng/mL, CRP 128 mg/L, Creatinine 135 \xB5mol/L (t\u0103ng so v\u1EDBi n\u1EC1n 75 \xB5mol/L). qSOFA = 1/3 (b\u1ECF s\xF3t), nh\u01B0ng NEWS2 = 6, SIRS = 4/4 v\xE0 NICE ph\xE2n t\u1EA7ng nguy c\u01A1 cao do Lactate > 2.0.",
      patientData: {
        id: "case-6",
        patientName: "L\xEA Th\u1ECB M.",
        patientCode: "BN-2026-118",
        patientType: "adult",
        ageYears: 54,
        gender: "female",
        setting: "acute_hospital",
        weightKg: 58,
        hasFrailty: false,
        hasImmunosuppression: false,
        hasRecentSurgery: false,
        hasIndwellingCatheter: false,
        hasRepeatedAntibioticUse: false,
        hasSkinBreach: false,
        communicationDifficulty: false,
        suspectedInfection: true,
        infectionSource: "urinary",
        feverOrRigors: true,
        recentMultiplePresentations: false,
        sbp: 105,
        dbp: 65,
        heartRate: 108,
        respiratoryRate: 23,
        temperature: 39.2,
        spo2: 96,
        onSupplementalOxygen: false,
        fio2Percent: 21,
        copdOrHypercapnicRisk: false,
        avpu: "A",
        gcs: 15,
        newAlteredMentalState: false,
        bilateralFixedPupils: false,
        mottledOrAshen: false,
        cyanosis: false,
        nonBlanchingRash: false,
        capillaryRefillSeconds: 2,
        urineOutputStatus: "normal",
        urineOutputMlKgHr: 0.9,
        invasiveMechanicalVentilation: false,
        nonInvasiveVentilation: false,
        vasoactiveMedCount: 0,
        vasoactiveUsed: {
          norepinephrine: false,
          epinephrine: false,
          vasopressin: false,
          dopamine: false,
          dobutamine: false
        },
        wbc: 17.8,
        neutrophilCount: 15.2,
        lymphocyteCount: 1.2,
        platelets: 190,
        lactateInitial: 2.3,
        lactateRepeat6h: 1.5,
        procalcitonin: 4.6,
        crp: 128,
        creatinineUmolL: 135,
        bilirubinUmolL: 15,
        bloodCultureCollected: true,
        bloodCultureResult: "pending",
        rapidMolecularT2Done: false
      }
    }
  ];

  // C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/src/components/Header.tsx
  var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
  var Header = ({
    onOpenPresets,
    onSelectPreset,
    onOpenGuide,
    onOpenHistory,
    onReset,
    savedCount
  }) => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", { className: "sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "max-w-7xl mx-auto px-3 sm:px-6 lg:px-8", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center justify-between h-14 sm:h-16 gap-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-2.5 shrink-0", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-teal-600 flex items-center justify-center text-white shadow-xs", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "w-4 h-4 sm:w-5 sm:h-5" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-base sm:text-lg font-bold tracking-tight text-slate-900 block leading-tight", children: "SepsisCDSS" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-[10px] text-slate-500 hidden sm:block", children: "NICE NG253 \xB7 Sepsis-3 \xB7 Phoenix 2024 \xB7 LP-NEWS" })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1 max-w-md mx-2 hidden md:block", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg p-1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-4 h-4 text-teal-600 shrink-0 ml-1.5" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "select",
          {
            defaultValue: "",
            onChange: (e) => {
              const found = PRESET_CASES.find((c) => c.id === e.target.value);
              if (found) onSelectPreset(found);
            },
            className: "w-full text-xs bg-transparent border-none text-slate-700 font-medium focus:ring-0 cursor-pointer",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "", disabled: true, children: "\u26A1 Ch\u1ECDn ca l\xE2m s\xE0ng m\u1EABu t\u1EEB y v\u0103n..." }),
              PRESET_CASES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: c.id, children: c.title }, c.id))
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-1 sm:gap-1.5", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            onClick: onOpenPresets,
            className: "p-2 text-slate-600 hover:text-teal-700 hover:bg-slate-100 rounded-lg transition-colors relative",
            title: "Danh m\u1EE5c ca b\u1EC7nh m\u1EABu",
            "aria-label": "Danh m\u1EE5c ca b\u1EC7nh m\u1EABu",
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-4 h-4 sm:w-4.5 sm:h-4.5 text-teal-600" })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            onClick: onOpenGuide,
            className: "p-2 text-slate-600 hover:text-teal-700 hover:bg-slate-100 rounded-lg transition-colors",
            title: "H\u01B0\u1EDBng d\u1EABn c\u01A1 b\u1EA3n cho ng\u01B0\u1EDDi m\u1EDBi",
            "aria-label": "H\u01B0\u1EDBng d\u1EABn c\u01A1 b\u1EA3n cho ng\u01B0\u1EDDi m\u1EDBi",
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "w-4 h-4 sm:w-4.5 sm:h-4.5" })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "button",
          {
            onClick: onOpenHistory,
            className: "p-2 text-slate-600 hover:text-teal-700 hover:bg-slate-100 rounded-lg transition-colors relative",
            title: "L\u1ECBch s\u1EED h\u1ED3 s\u01A1 \u0111\xE3 l\u01B0u",
            "aria-label": "L\u1ECBch s\u1EED h\u1ED3 s\u01A1 \u0111\xE3 l\u01B0u",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "w-4 h-4 sm:w-4.5 sm:h-4.5" }),
              savedCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute top-1 right-1 w-2 h-2 bg-teal-500 rounded-full" })
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            onClick: onReset,
            className: "p-2 text-slate-500 hover:text-rose-600 hover:bg-slate-100 rounded-lg transition-colors",
            title: "\u0110\u1EB7t l\u1EA1i th\xF4ng s\u1ED1 ban \u0111\u1EA7u",
            "aria-label": "\u0110\u1EB7t l\u1EA1i d\u1EEF li\u1EC7u",
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "w-4 h-4 sm:w-4.5 sm:h-4.5" })
          }
        )
      ] })
    ] }) }) });
  };

  // C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/src/components/CompactPatientForm.tsx
  var import_react4 = __toESM(require_react(), 1);

  // C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/src/components/SmartNumberInput.tsx
  var import_react3 = __toESM(require_react(), 1);
  var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
  var SmartNumberInput = ({
    value,
    onChange,
    placeholder,
    isDecimal = false,
    min,
    max,
    className = "",
    fallbackValue,
    disabled = false
  }) => {
    const [text, setText] = (0, import_react3.useState)(() => {
      if (value !== void 0 && value !== null && !isNaN(value)) {
        return String(value);
      }
      return "";
    });
    const [isFocused, setIsFocused] = (0, import_react3.useState)(false);
    (0, import_react3.useEffect)(() => {
      if (!isFocused) {
        if (value !== void 0 && value !== null && !isNaN(value)) {
          setText(String(value));
        } else {
          setText("");
        }
      }
    }, [value, isFocused]);
    const handleChange = (e) => {
      let raw = e.target.value;
      if (isDecimal) {
        raw = raw.replace(",", ".");
        raw = raw.replace(/[^\d.-]/g, "");
        const parts = raw.split(".");
        if (parts.length > 2) {
          raw = parts[0] + "." + parts.slice(1).join("");
        }
      } else {
        raw = raw.replace(/[^\d-]/g, "");
      }
      setText(raw);
      const trimmed = raw.trim();
      if (trimmed === "" || trimmed === "-" || trimmed === "." || trimmed === "-.") {
        if (fallbackValue === void 0) {
          onChange(void 0);
        }
        return;
      }
      const num = Number(trimmed);
      if (!isNaN(num)) {
        onChange(num);
      }
    };
    const handleFocus = (e) => {
      setIsFocused(true);
      e.target.select();
    };
    const handleBlur = () => {
      setIsFocused(false);
      let trimmed = text.trim();
      if (trimmed.endsWith(".")) {
        trimmed = trimmed.slice(0, -1);
        setText(trimmed);
      }
      if (trimmed === "" || isNaN(Number(trimmed))) {
        if (fallbackValue !== void 0) {
          setText(String(fallbackValue));
          onChange(fallbackValue);
        } else {
          setText("");
          onChange(void 0);
        }
        return;
      }
      let num = Number(trimmed);
      if (min !== void 0 && num < min) num = min;
      if (max !== void 0 && num > max) num = max;
      setText(String(num));
      onChange(num);
    };
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      "input",
      {
        type: "text",
        inputMode: isDecimal ? "decimal" : "numeric",
        value: text,
        onChange: handleChange,
        onFocus: handleFocus,
        onBlur: handleBlur,
        placeholder,
        disabled,
        className,
        autoComplete: "off",
        autoCorrect: "off",
        spellCheck: false
      }
    );
  };

  // C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/src/components/CompactPatientForm.tsx
  var import_jsx_runtime3 = __toESM(require_jsx_runtime(), 1);
  var CompactPatientForm = ({
    data,
    onChange,
    isCollapsed: externalIsCollapsed,
    onToggleCollapse: externalOnToggleCollapse
  }) => {
    const [internalCollapsed, setInternalCollapsed] = (0, import_react4.useState)(false);
    const isAllCollapsed = externalIsCollapsed !== void 0 ? externalIsCollapsed : internalCollapsed;
    const toggleCollapse = externalOnToggleCollapse || (() => setInternalCollapsed(!internalCollapsed));
    const map = calculateMAP(data.sbp, data.dbp);
    const nlrCalc = calculateNLR(data.neutrophilCount, data.lymphocyteCount);
    const lactateKinetics = calculateLactateClearance(data.lactateInitial, data.lactateRepeat6h);
    const getSettingLabel = (setting) => {
      switch (setting) {
        case "acute_hospital":
          return "C\u1EA5p c\u1EE9u / Khoa ph\xF2ng";
        case "icu":
          return "ICU / H\u1ED3i s\u1EE9c";
        case "emergency_ambulance":
          return "Ti\u1EC1n vi\u1EC7n / C\u1EA5p c\u1EE9u 115";
        case "community_custodial":
          return "Tr\u1EA1m y t\u1EBF / Ban \u0111\u1EA7u";
        default:
          return "";
      }
    };
    const getInfectionSourceLabel = (src) => {
      switch (src) {
        case "respiratory":
          return "H\xF4 h\u1EA5p";
        case "urinary":
          return "Ti\u1EBFt ni\u1EC7u";
        case "abdominal":
          return "\u1ED4 b\u1EE5ng";
        case "skin_soft_tissue":
          return "Da/M\xF4 m\u1EC1m";
        case "bloodstream_catheter":
          return "M\xE1u/Catheter";
        case "pelvic_obstetric":
          return "S\u1EA3n ph\u1EE5 khoa";
        default:
          return "Ch\u01B0a r\xF5";
      }
    };
    const update = (field, value) => {
      onChange({
        ...data,
        [field]: value
      });
    };
    const updateVasoactive = (key, val) => {
      const updatedUsed = {
        ...data.vasoactiveUsed,
        [key]: val
      };
      const count = Object.values(updatedUsed).filter(Boolean).length;
      onChange({
        ...data,
        vasoactiveUsed: updatedUsed,
        vasoactiveMedCount: count
      });
    };
    if (isAllCollapsed) {
      return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "w-full", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "hidden lg:flex flex-col items-center py-3 px-1 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3 sticky top-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            "button",
            {
              type: "button",
              onClick: toggleCollapse,
              className: "p-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white shadow-xs transition-all active:scale-95",
              title: "B\u1EA5m \u0111\u1EC3 m\u1EDF r\u1ED9ng b\u1EA3ng d\u1EEF li\u1EC7u b\u1EC7nh nh\xE2n",
              children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ChevronsRight, { className: "w-5 h-5" })
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "w-7 h-px bg-slate-200 my-0.5" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            "button",
            {
              type: "button",
              onClick: toggleCollapse,
              className: "p-2.5 rounded-xl bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-300 text-teal-600 transition-all hover:scale-105",
              title: `1. Th\xF4ng tin \u0111\u1ED1i t\u01B0\u1EE3ng (${data.patientType === "adult" ? "Ng\u01B0\u1EDDi l\u1EDBn" : data.patientType === "pediatric" ? "Nhi" : "S\u1EA3n khoa"}, ${data.ageYears} tu\u1ED5i)`,
              children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(User, { className: "w-5 h-5" })
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
            "button",
            {
              type: "button",
              onClick: toggleCollapse,
              className: "p-2.5 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-300 text-rose-600 transition-all hover:scale-105 relative",
              title: `2. Sinh hi\u1EC7u & Huy\u1EBFt \u0111\u1ED9ng (HA: ${data.sbp}/${data.dbp}, MAP: ${map}, HR: ${data.heartRate} bpm, RR: ${data.respiratoryRate})`,
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Heart, { className: "w-5 h-5" }),
                map < 65 && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "w-2 h-2 rounded-full bg-rose-600 absolute top-1 right-1 ring-2 ring-white animate-pulse" })
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
            "button",
            {
              type: "button",
              onClick: toggleCollapse,
              className: "p-2.5 rounded-xl bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-300 text-teal-600 transition-all hover:scale-105 relative",
              title: `3. Da, T\u01B0\u1EDBi m\xE1u m\xF4 & V\u1EADn m\u1EA1ch (${data.vasoactiveMedCount > 0 ? `${data.vasoactiveMedCount} thu\u1ED1c VM` : "Kh\xF4ng VM"}, CRT: ${data.capillaryRefillSeconds}s)`,
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Droplet, { className: "w-5 h-5" }),
                (data.mottledOrAshen || data.vasoactiveMedCount > 0) && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "w-2 h-2 rounded-full bg-rose-600 absolute top-1 right-1 ring-2 ring-white" })
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            "button",
            {
              type: "button",
              onClick: toggleCollapse,
              className: "p-2.5 rounded-xl bg-slate-50 hover:bg-cyan-50 border border-slate-200 hover:border-cyan-300 text-cyan-600 transition-all hover:scale-105",
              title: `4. C\u1EADn l\xE2m s\xE0ng: TPTTBM, Biomarkers & Vi sinh (WBC: ${data.wbc ?? "N/A"}, Lac: ${data.lactateInitial ?? "N/A"})`,
              children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(TestTube, { className: "w-5 h-5" })
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex lg:hidden items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200 shadow-2xs", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
            "button",
            {
              type: "button",
              onClick: toggleCollapse,
              className: "flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-teal-600 text-white rounded-lg shadow-2xs active:scale-95",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ChevronsRight, { className: "w-4 h-4" }),
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: "M\u1EDF r\u1ED9ng" })
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", onClick: toggleCollapse, className: "p-2 rounded-lg bg-slate-50 text-teal-600 border border-slate-200", title: "Th\xF4ng tin \u0111\u1ED1i t\u01B0\u1EE3ng", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(User, { className: "w-4 h-4" }) }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("button", { type: "button", onClick: toggleCollapse, className: "p-2 rounded-lg bg-slate-50 text-rose-600 border border-slate-200 relative", title: "Sinh hi\u1EC7u & Huy\u1EBFt \u0111\u1ED9ng", children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Heart, { className: "w-4 h-4" }),
              map < 65 && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "w-1.5 h-1.5 rounded-full bg-rose-600 absolute top-0.5 right-0.5" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("button", { type: "button", onClick: toggleCollapse, className: "p-2 rounded-lg bg-slate-50 text-teal-600 border border-slate-200 relative", title: "Da & V\u1EADn m\u1EA1ch", children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Droplet, { className: "w-4 h-4" }),
              (data.mottledOrAshen || data.vasoactiveMedCount > 0) && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "w-1.5 h-1.5 rounded-full bg-rose-600 absolute top-0.5 right-0.5" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", onClick: toggleCollapse, className: "p-2 rounded-lg bg-slate-50 text-cyan-600 border border-slate-200", title: "C\u1EADn l\xE2m s\xE0ng & Vi sinh", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(TestTube, { className: "w-4 h-4" }) })
          ] })
        ] })
      ] });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "space-y-3.5", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex items-center justify-between px-3.5 py-2.5 bg-gradient-to-r from-slate-100 via-slate-50 to-teal-50/60 rounded-xl border border-slate-200/90 shadow-2xs", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex items-center gap-2 text-slate-800", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Layers, { className: "w-4 h-4 text-teal-600" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "text-xs font-bold uppercase tracking-wider text-slate-700 block leading-tight", children: "B\u1EA3ng D\u1EEF Li\u1EC7u B\u1EC7nh Nh\xE2n" }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "text-[10px] text-slate-500 block leading-tight", children: "\u0110ang m\u1EDF r\u1ED9ng 4 b\u1EA3ng nh\u1EADp li\u1EC7u chi ti\u1EBFt" })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
          "button",
          {
            type: "button",
            onClick: toggleCollapse,
            className: "flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg shadow-2xs transition-all active:scale-[0.98] bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 hover:border-slate-400",
            title: "B\u1EA5m \u0111\u1EC3 thu g\u1ECDn b\u1EA3ng d\u1EEF li\u1EC7u th\xE0nh c\xE1c bi\u1EC3u t\u01B0\u1EE3ng icon",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ChevronsLeft, { className: "w-4 h-4 text-slate-500" }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: "Thu g\u1ECDn" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "bg-white rounded-xl border border-slate-200 shadow-sm transition-all overflow-hidden", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "p-3.5 flex items-center justify-between gap-2 bg-white border-b border-slate-100", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "flex items-center gap-2 min-w-0 flex-1", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 shrink-0", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(User, { className: "w-3.5 h-3.5 text-teal-600" }),
            "Th\xF4ng Tin \u0110\u1ED1i T\u01B0\u1EE3ng"
          ] }) }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "flex items-center gap-2 shrink-0", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "hidden sm:flex items-center gap-1", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "button",
              {
                type: "button",
                onClick: () => update("patientType", "adult"),
                className: `px-2 py-0.5 text-[11px] font-semibold rounded-md border transition-colors ${data.patientType === "adult" ? "bg-teal-600 text-white border-teal-600 shadow-xs" : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"}`,
                children: "Ng\u01B0\u1EDDi l\u1EDBn"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "button",
              {
                type: "button",
                onClick: () => update("patientType", "pediatric"),
                className: `px-2 py-0.5 text-[11px] font-semibold rounded-md border transition-colors ${data.patientType === "pediatric" ? "bg-purple-600 text-white border-purple-600 shadow-xs" : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"}`,
                children: "Nhi (<18t)"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "button",
              {
                type: "button",
                onClick: () => update("patientType", "maternal"),
                className: `px-2 py-0.5 text-[11px] font-semibold rounded-md border transition-colors ${data.patientType === "maternal" ? "bg-pink-600 text-white border-pink-600 shadow-xs" : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"}`,
                children: "S\u1EA3n khoa"
              }
            )
          ] }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "p-3.5 pt-3 space-y-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex sm:hidden items-center gap-1 pb-1 border-b border-slate-100", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "button",
              {
                type: "button",
                onClick: () => update("patientType", "adult"),
                className: `flex-1 py-1 text-[11px] font-semibold rounded-md border text-center transition-colors ${data.patientType === "adult" ? "bg-teal-600 text-white border-teal-600 shadow-xs" : "bg-slate-50 text-slate-600 border-slate-200"}`,
                children: "Ng\u01B0\u1EDDi l\u1EDBn"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "button",
              {
                type: "button",
                onClick: () => update("patientType", "pediatric"),
                className: `flex-1 py-1 text-[11px] font-semibold rounded-md border text-center transition-colors ${data.patientType === "pediatric" ? "bg-purple-600 text-white border-purple-600 shadow-xs" : "bg-slate-50 text-slate-600 border-slate-200"}`,
                children: "Nhi (<18t)"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "button",
              {
                type: "button",
                onClick: () => update("patientType", "maternal"),
                className: `flex-1 py-1 text-[11px] font-semibold rounded-md border text-center transition-colors ${data.patientType === "maternal" ? "bg-pink-600 text-white border-pink-600 shadow-xs" : "bg-slate-50 text-slate-600 border-slate-200"}`,
                children: "S\u1EA3n khoa"
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "grid grid-cols-3 gap-2 text-xs", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("label", { className: "text-[11px] font-medium text-slate-500 block mb-0.5", children: data.patientType === "pediatric" ? "Tu\u1ED5i (N\u0103m)" : "Tu\u1ED5i" }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                SmartNumberInput,
                {
                  placeholder: "Tu\u1ED5i",
                  value: data.ageYears,
                  fallbackValue: data.patientType === "pediatric" ? 5 : 45,
                  min: 0,
                  max: 120,
                  onChange: (v) => update("ageYears", v ?? 45),
                  className: "w-full h-8 px-2 text-xs font-mono tabular-nums bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:ring-1 focus:ring-teal-500"
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("label", { className: "text-[11px] font-medium text-slate-500 block mb-0.5", children: "Gi\u1EDBi t\xEDnh" }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
                "select",
                {
                  value: data.gender,
                  onChange: (e) => update("gender", e.target.value),
                  className: "w-full h-8 px-2 text-xs bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:ring-1 focus:ring-teal-500",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: "male", children: "Nam" }),
                    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: "female", children: "N\u1EEF" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("label", { className: "text-[11px] font-medium text-slate-500 block mb-0.5", children: "C\xE2n n\u1EB7ng (kg)" }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                SmartNumberInput,
                {
                  placeholder: "kg",
                  value: data.weightKg,
                  isDecimal: true,
                  fallbackValue: 60,
                  min: 1,
                  max: 250,
                  onChange: (v) => update("weightKg", v ?? 60),
                  className: "w-full h-8 px-2 text-xs font-mono tabular-nums bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:ring-1 focus:ring-teal-500"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex items-center gap-2 pt-1 border-t border-slate-100", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "text-[11px] text-slate-500 shrink-0", children: "B\u1ED1i c\u1EA3nh:" }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
              "select",
              {
                value: data.setting,
                onChange: (e) => update("setting", e.target.value),
                className: "h-7 px-2 text-xs bg-slate-50 border border-slate-200 rounded-md flex-1 text-slate-800",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: "acute_hospital", children: "C\u1EA5p c\u1EE9u / Khoa ph\xF2ng n\u1ED9i tr\xFA" }),
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: "icu", children: "H\u1ED3i s\u1EE9c t\xEDch c\u1EF1c (ICU / CVIU)" }),
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: "emergency_ambulance", children: "Xe c\u1EA5p c\u1EE9u / Ti\u1EC1n vi\u1EC7n" }),
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: "community_custodial", children: "Y t\u1EBF ban \u0111\u1EA7u / Tr\u1EA1m x\xE1" })
                ]
              }
            )
          ] }),
          data.patientType === "maternal" && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "p-2 bg-pink-50/70 border border-pink-200 rounded-md flex items-center justify-between text-xs text-pink-950", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("label", { className: "flex items-center gap-1.5 cursor-pointer", children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "input",
                {
                  type: "checkbox",
                  checked: data.isPostpartum,
                  onChange: (e) => update("isPostpartum", e.target.checked),
                  className: "w-3.5 h-3.5 text-pink-600 rounded"
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: "Giai \u0111o\u1EA1n H\u1EADu s\u1EA3n (\u2264 4 tu\u1EA7n)" })
            ] }),
            !data.isPostpartum && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: "Tu\u1EA7n:" }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                SmartNumberInput,
                {
                  value: data.pregnancyWeek ?? 32,
                  fallbackValue: 32,
                  min: 4,
                  max: 44,
                  onChange: (v) => update("pregnancyWeek", v ?? 32),
                  className: "w-12 h-6 px-1 text-xs font-mono bg-white border border-pink-300 rounded"
                }
              )
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "bg-white rounded-xl border border-slate-200 shadow-sm transition-all overflow-hidden", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "p-3.5 flex items-center justify-between gap-2 bg-white border-b border-slate-100", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "flex items-center gap-2 min-w-0 flex-1", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 shrink-0", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Heart, { className: "w-3.5 h-3.5 text-rose-600" }),
            "LS: Sinh Hi\u1EC7u & Huy\u1EBFt \u0110\u1ED9ng"
          ] }) }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "flex items-center gap-2 shrink-0", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "text-[11px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded", children: [
            "MAP: ",
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("strong", { className: map < 65 ? "text-rose-600" : "text-slate-800", children: map }),
            " mmHg"
          ] }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "p-3.5 pt-3 space-y-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "grid grid-cols-3 gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("label", { className: "text-[10px] font-medium text-slate-500 block", children: "HATT (mmHg)" }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                SmartNumberInput,
                {
                  value: data.sbp,
                  fallbackValue: 120,
                  min: 30,
                  max: 300,
                  onChange: (v) => update("sbp", v ?? 120),
                  className: `w-full h-8 px-2 text-xs font-mono tabular-nums rounded-md border ${data.sbp <= 90 ? "bg-rose-50 border-rose-400 text-rose-900 font-bold" : "bg-slate-50 border-slate-200"}`
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("label", { className: "text-[10px] font-medium text-slate-500 block", children: "HATTr (mmHg)" }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                SmartNumberInput,
                {
                  value: data.dbp,
                  fallbackValue: 80,
                  min: 10,
                  max: 200,
                  onChange: (v) => update("dbp", v ?? 80),
                  className: "w-full h-8 px-2 text-xs font-mono tabular-nums bg-slate-50 border border-slate-200 rounded-md"
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("label", { className: "text-[10px] font-medium text-slate-500 block", children: "M\u1EA1ch (HR) (bpm)" }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                SmartNumberInput,
                {
                  value: data.heartRate,
                  fallbackValue: 80,
                  min: 20,
                  max: 250,
                  onChange: (v) => update("heartRate", v ?? 80),
                  className: `w-full h-8 px-2 text-xs font-mono tabular-nums rounded-md border ${data.heartRate > 130 || data.heartRate < 40 ? "bg-rose-50 border-rose-400 text-rose-900 font-bold" : "bg-slate-50 border-slate-200"}`
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("label", { className: "text-[10px] font-medium text-slate-500 block", children: "Th\u1EDF (RR) (l/p)" }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                SmartNumberInput,
                {
                  value: data.respiratoryRate,
                  fallbackValue: 16,
                  min: 4,
                  max: 70,
                  onChange: (v) => update("respiratoryRate", v ?? 16),
                  className: `w-full h-8 px-2 text-xs font-mono tabular-nums rounded-md border ${data.respiratoryRate >= 25 || data.respiratoryRate <= 8 ? "bg-rose-50 border-rose-400 text-rose-900 font-bold" : "bg-slate-50 border-slate-200"}`
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("label", { className: "text-[10px] font-medium text-slate-500 block", children: "T\xB0 Th\xE2n nhi\u1EC7t (\xB0C)" }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                SmartNumberInput,
                {
                  value: data.temperature,
                  isDecimal: true,
                  fallbackValue: 37,
                  min: 25,
                  max: 45,
                  onChange: (v) => update("temperature", v ?? 37),
                  className: `w-full h-8 px-2 text-xs font-mono tabular-nums rounded-md border ${data.temperature <= 35 || data.temperature >= 39 ? "bg-amber-50 border-amber-400 font-bold text-amber-900" : "bg-slate-50 border-slate-200"}`
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("label", { className: "text-[10px] font-medium text-slate-500 block", children: "SpO2 (%)" }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                SmartNumberInput,
                {
                  value: data.spo2,
                  fallbackValue: 98,
                  min: 40,
                  max: 100,
                  onChange: (v) => update("spo2", v ?? 98),
                  className: `w-full h-8 px-2 text-xs font-mono tabular-nums rounded-md border ${data.spo2 <= 91 ? "bg-rose-50 border-rose-400 text-rose-900 font-bold" : "bg-slate-50 border-slate-200"}`
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100 text-xs", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("label", { className: "flex items-center gap-1.5 cursor-pointer text-[11px] text-slate-700", children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "input",
                {
                  type: "checkbox",
                  checked: data.onSupplementalOxygen,
                  onChange: (e) => update("onSupplementalOxygen", e.target.checked),
                  className: "w-3.5 h-3.5 text-teal-600 rounded"
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: "Th\u1EDF Oxy h\u1ED7 tr\u1EE3" })
            ] }),
            data.onSupplementalOxygen && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex items-center gap-1 text-[11px]", children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "text-slate-500", children: "FiO2:" }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                SmartNumberInput,
                {
                  min: 21,
                  max: 100,
                  value: data.fio2Percent,
                  fallbackValue: 21,
                  onChange: (v) => update("fio2Percent", v ?? 21),
                  className: "w-12 h-6 px-1 text-xs font-mono bg-slate-50 border border-slate-200 rounded text-center"
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "text-slate-500", children: "%" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("label", { className: "flex items-center gap-1.5 cursor-pointer text-[11px] text-slate-700", children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "input",
                {
                  type: "checkbox",
                  checked: data.copdOrHypercapnicRisk,
                  onChange: (e) => update("copdOrHypercapnicRisk", e.target.checked),
                  className: "w-3.5 h-3.5 text-teal-600 rounded"
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: "COPD (Thang SpO2 2)" })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "grid grid-cols-2 gap-2 pt-1 border-t border-slate-100", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("label", { className: "text-[10px] font-medium text-slate-500 block mb-0.5", children: "Tri gi\xE1c AVPU" }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
                "select",
                {
                  value: data.avpu,
                  onChange: (e) => update("avpu", e.target.value),
                  className: "w-full h-7 px-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: "A", children: "A - Alert (T\u1EC9nh t\xE1o)" }),
                    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: "V", children: "V - Voice (\u0110\xE1p \u1EE9ng l\u1EDDi n\xF3i)" }),
                    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: "P", children: "P - Pain (\u0110\xE1p \u1EE9ng \u0111au)" }),
                    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: "U", children: "U - Unresponsive (M\u1EA5t tri gi\xE1c)" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("label", { className: "text-[10px] font-medium text-slate-500 block mb-0.5", children: "\u0110i\u1EC3m GCS (3-15)" }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                SmartNumberInput,
                {
                  min: 3,
                  max: 15,
                  value: data.gcs,
                  fallbackValue: 15,
                  onChange: (v) => update("gcs", v ?? 15),
                  className: "w-full h-7 px-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-md"
                }
              )
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "bg-white rounded-xl border border-slate-200 shadow-sm transition-all overflow-hidden", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "p-3.5 flex items-center justify-between gap-2 bg-white border-b border-slate-100", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "flex items-center gap-2 min-w-0 flex-1", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 shrink-0", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Droplet, { className: "w-3.5 h-3.5 text-teal-600" }),
          "LS: Da, T\u01B0\u1EDBi M\xE1u M\xF4 & V\u1EADn M\u1EA1ch"
        ] }) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "p-3.5 pt-2.5 space-y-2.5", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "grid grid-cols-2 gap-1.5", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("label", { className: `p-2 rounded-lg border cursor-pointer text-[11px] transition-colors flex items-center gap-1.5 ${data.mottledOrAshen ? "bg-rose-50 border-rose-300 font-semibold text-rose-900" : "bg-slate-50 border-slate-200 text-slate-700"}`, children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "input",
                {
                  type: "checkbox",
                  checked: data.mottledOrAshen,
                  onChange: (e) => update("mottledOrAshen", e.target.checked),
                  className: "w-3.5 h-3.5 text-rose-600 rounded"
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: "Da v\xE2n \u0111\xE1 / T\xE1i x\xE1m" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("label", { className: `p-2 rounded-lg border cursor-pointer text-[11px] transition-colors flex items-center gap-1.5 ${data.cyanosis ? "bg-rose-50 border-rose-300 font-semibold text-rose-900" : "bg-slate-50 border-slate-200 text-slate-700"}`, children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "input",
                {
                  type: "checkbox",
                  checked: data.cyanosis,
                  onChange: (e) => update("cyanosis", e.target.checked),
                  className: "w-3.5 h-3.5 text-rose-600 rounded"
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: "T\xEDm t\xE1i da / M\xF4i" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("label", { className: `p-2 rounded-lg border cursor-pointer text-[11px] transition-colors flex items-center gap-1.5 ${data.nonBlanchingRash ? "bg-rose-50 border-rose-300 font-semibold text-rose-900" : "bg-slate-50 border-slate-200 text-slate-700"}`, children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "input",
                {
                  type: "checkbox",
                  checked: data.nonBlanchingRash,
                  onChange: (e) => update("nonBlanchingRash", e.target.checked),
                  className: "w-3.5 h-3.5 text-rose-600 rounded"
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: "Ban xu\u1EA5t huy\u1EBFt kh\xF4ng m\u1EA5t" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("label", { className: `p-2 rounded-lg border cursor-pointer text-[11px] transition-colors flex items-center gap-1.5 ${data.newAlteredMentalState ? "bg-amber-50 border-amber-300 font-semibold text-amber-900" : "bg-slate-50 border-slate-200 text-slate-700"}`, children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "input",
                {
                  type: "checkbox",
                  checked: data.newAlteredMentalState,
                  onChange: (e) => update("newAlteredMentalState", e.target.checked),
                  className: "w-3.5 h-3.5 text-teal-600 rounded"
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: "L\xFA l\u1EABn c\u1EA5p t\xEDnh m\u1EDBi" })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "grid grid-cols-2 gap-2 pt-1 border-t border-slate-100", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("label", { className: "text-[10px] font-medium text-slate-500 block", children: "Th\u1EDDi gian CRT (gi\xE2y)" }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                SmartNumberInput,
                {
                  value: data.capillaryRefillSeconds,
                  isDecimal: true,
                  fallbackValue: 2,
                  min: 0,
                  max: 15,
                  onChange: (v) => update("capillaryRefillSeconds", v ?? 2),
                  className: `w-full h-7 px-2 text-xs font-mono rounded-md border ${data.capillaryRefillSeconds > 2 ? "bg-amber-50 border-amber-300 font-semibold" : "bg-slate-50 border-slate-200"}`
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("label", { className: "text-[10px] font-medium text-slate-500 block", children: "N\u01B0\u1EDBc ti\u1EC3u (18h)" }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
                "select",
                {
                  value: data.urineOutputStatus,
                  onChange: (e) => update("urineOutputStatus", e.target.value),
                  className: "w-full h-7 px-1 text-xs bg-slate-50 border border-slate-200 rounded-md",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: "normal", children: "B\xECnh th\u01B0\u1EDDng" }),
                    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: "not_12_18h", children: "Thi\u1EC3u ni\u1EC7u (12-18h)" }),
                    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: "not_over_18h", children: "V\xF4 ni\u1EC7u (>18h - Red Flag)" })
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "pt-1 border-t border-slate-100", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "text-[10px] font-medium text-slate-500 block mb-1", children: "Thu\u1ED1c v\u1EADn m\u1EA1ch \u0111ang d\xF9ng:" }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "flex flex-wrap gap-1", children: ["norepinephrine", "epinephrine", "vasopressin", "dopamine"].map((drug) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
              "button",
              {
                type: "button",
                onClick: () => updateVasoactive(drug, !data.vasoactiveUsed[drug]),
                className: `px-2 py-0.5 text-[10px] font-semibold rounded border transition-colors ${data.vasoactiveUsed[drug] ? "bg-rose-600 text-white border-rose-600 shadow-xs" : "bg-slate-100 text-slate-600 border-slate-200"}`,
                children: [
                  drug === "norepinephrine" && "NorEpi",
                  drug === "epinephrine" && "Epi",
                  drug === "vasopressin" && "Vaso",
                  drug === "dopamine" && "Dopa"
                ]
              },
              drug
            )) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "bg-white rounded-xl border border-slate-200 shadow-sm transition-all overflow-hidden", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "p-3.5 flex items-center justify-between gap-2 bg-white border-b border-slate-100", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "flex items-center gap-2 min-w-0 flex-1", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 shrink-0", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(TestTube, { className: "w-3.5 h-3.5 text-cyan-600" }),
            "CLS: TPTTBM, Biomarkers & Vi Sinh"
          ] }) }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "flex items-center gap-2 shrink-0", children: nlrCalc.nlr !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: `text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${nlrCalc.riskLevel === "high" ? "bg-rose-100 text-rose-800" : nlrCalc.riskLevel === "elevated" ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"}`, children: [
            "NLR: ",
            nlrCalc.nlr
          ] }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "p-3.5 pt-3 space-y-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "p-2.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex items-center justify-between text-[11px] text-slate-700 font-semibold", children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: "T\u1ED5ng ph\xE2n t\xEDch t\u1EBF b\xE0o m\xE1u (TPTTBM / CBC)" }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "text-[10px] font-normal text-slate-500", children: "\u0110\u01A1n v\u1ECB: G/L (x10\u2079/L)" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "grid grid-cols-4 gap-1.5", children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("label", { className: "text-[9px] font-semibold text-slate-600 block", children: "WBC (G/L)" }),
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                  SmartNumberInput,
                  {
                    isDecimal: true,
                    value: data.wbc,
                    onChange: (v) => update("wbc", v),
                    placeholder: "4-10",
                    className: `w-full h-7 px-1.5 text-xs font-mono rounded border ${(data.wbc ?? 0) > 12 || (data.wbc ?? 10) < 4 && data.wbc !== void 0 ? "bg-amber-50 border-amber-400 font-bold text-amber-900" : "bg-white border-slate-200"}`
                  }
                )
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("label", { className: "text-[9px] font-semibold text-slate-600 block", children: "NEU (G/L)" }),
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                  SmartNumberInput,
                  {
                    isDecimal: true,
                    value: data.neutrophilCount,
                    onChange: (v) => update("neutrophilCount", v),
                    placeholder: "2-7",
                    className: "w-full h-7 px-1.5 text-xs font-mono bg-white border border-slate-200 rounded"
                  }
                )
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("label", { className: "text-[9px] font-semibold text-slate-600 block", children: "LYM (G/L)" }),
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                  SmartNumberInput,
                  {
                    isDecimal: true,
                    value: data.lymphocyteCount,
                    onChange: (v) => update("lymphocyteCount", v),
                    placeholder: "1-3",
                    className: "w-full h-7 px-1.5 text-xs font-mono bg-white border border-slate-200 rounded"
                  }
                )
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("label", { className: "text-[9px] font-semibold text-slate-600 block", children: "PLT (G/L)" }),
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                  SmartNumberInput,
                  {
                    value: data.platelets,
                    onChange: (v) => update("platelets", v),
                    placeholder: "150-400",
                    className: `w-full h-7 px-1.5 text-xs font-mono rounded border ${(data.platelets ?? 300) < 100 && data.platelets !== void 0 ? "bg-rose-50 border-rose-400 font-bold text-rose-900" : "bg-white border-slate-200"}`
                  }
                )
              ] })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("label", { className: "text-[10px] font-medium text-slate-600 block", children: "Lactate 0h (mmol/L)" }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                SmartNumberInput,
                {
                  isDecimal: true,
                  value: data.lactateInitial,
                  onChange: (v) => update("lactateInitial", v),
                  placeholder: "< 2.0",
                  className: `w-full h-7 px-2 text-xs font-mono rounded-md border ${(data.lactateInitial ?? 0) > 2 ? "bg-rose-50 border-rose-400 font-bold text-rose-900" : "bg-slate-50 border-slate-200"}`
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("label", { className: "text-[10px] font-medium text-slate-600 block", children: "Lactate 6h (mmol/L)" }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                SmartNumberInput,
                {
                  isDecimal: true,
                  value: data.lactateRepeat6h,
                  onChange: (v) => update("lactateRepeat6h", v),
                  placeholder: "mmol/L",
                  className: "w-full h-7 px-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-md"
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("label", { className: "text-[10px] font-medium text-slate-600 block", children: "PCT (ng/mL)" }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                SmartNumberInput,
                {
                  isDecimal: true,
                  value: data.procalcitonin,
                  onChange: (v) => update("procalcitonin", v),
                  placeholder: "< 0.5",
                  className: `w-full h-7 px-2 text-xs font-mono rounded-md border ${(data.procalcitonin ?? 0) >= 2 ? "bg-cyan-50 border-cyan-400 font-bold text-cyan-900" : "bg-slate-50 border-slate-200"}`
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("label", { className: "text-[10px] font-medium text-slate-600 block", children: "CRP (mg/L)" }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                SmartNumberInput,
                {
                  isDecimal: true,
                  value: data.crp,
                  onChange: (v) => update("crp", v),
                  placeholder: "< 5",
                  className: "w-full h-7 px-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-md"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "grid grid-cols-2 gap-2 pt-1 border-t border-slate-100", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("label", { className: "text-[10px] font-medium text-slate-600 block", children: "Creatinine Th\u1EADn (\xB5mol/L)" }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                SmartNumberInput,
                {
                  isDecimal: true,
                  value: data.creatinineUmolL,
                  onChange: (v) => update("creatinineUmolL", v),
                  placeholder: "60-110",
                  className: `w-full h-7 px-2 text-xs font-mono rounded-md border ${(data.creatinineUmolL ?? 0) > 120 ? "bg-amber-50 border-amber-400 font-bold text-amber-900" : "bg-slate-50 border-slate-200"}`
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("label", { className: "text-[10px] font-medium text-slate-600 block", children: "Bilirubin Gan (\xB5mol/L)" }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                SmartNumberInput,
                {
                  isDecimal: true,
                  value: data.bilirubinUmolL,
                  onChange: (v) => update("bilirubinUmolL", v),
                  placeholder: "< 20",
                  className: `w-full h-7 px-2 text-xs font-mono rounded-md border ${(data.bilirubinUmolL ?? 0) > 33 ? "bg-amber-50 border-amber-400 font-bold text-amber-900" : "bg-slate-50 border-slate-200"}`
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "pt-2 border-t border-slate-100 space-y-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "text-[10px] text-slate-500 shrink-0 font-medium", children: "Nghi ng\u1EDD \u1ED5 nhi\u1EC5m:" }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
                "select",
                {
                  value: data.infectionSource,
                  onChange: (e) => {
                    const src = e.target.value;
                    onChange({
                      ...data,
                      infectionSource: src,
                      suspectedInfection: src !== "unknown"
                    });
                  },
                  className: "h-7 px-2 text-xs bg-slate-50 border border-slate-200 rounded-md flex-1 text-slate-800",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: "unknown", children: "Ch\u01B0a ph\xE1t hi\u1EC7n / Kh\xE1m s\u1EE9c kh\u1ECFe" }),
                    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: "respiratory", children: "H\xF4 h\u1EA5p (Vi\xEAm ph\u1ED5i, \u0110\u1EE3t c\u1EA5p)" }),
                    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: "urinary", children: "Ti\u1EBFt ni\u1EC7u (Vi\xEAm \u0111\xE0i b\u1EC3 th\u1EADn)" }),
                    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: "abdominal", children: "\u1ED4 b\u1EE5ng / Vi\xEAm ru\u1ED9t th\u1EEBa / Vi\xEAm t\u1EE5y" }),
                    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: "skin_soft_tissue", children: "Da & M\xF4 m\u1EC1m (Vi\xEAm m\xF4 t\u1EBF b\xE0o)" }),
                    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: "bloodstream_catheter", children: "Catheter / Nhi\u1EC5m khu\u1EA9n huy\u1EBFt" }),
                    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: "pelvic_obstetric", children: "S\u1EA3n khoa / Ti\u1EC3u khung" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "p-2 bg-purple-50/50 border border-purple-200 rounded-lg flex items-center justify-between text-xs text-purple-950", children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("label", { className: "flex items-center gap-1.5 cursor-pointer", children: [
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                  "input",
                  {
                    type: "checkbox",
                    checked: data.rapidMolecularT2Done,
                    onChange: (e) => update("rapidMolecularT2Done", e.target.checked),
                    className: "w-3.5 h-3.5 text-purple-600 rounded"
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "font-semibold text-[11px]", children: "T2MR Ph\xE2n T\u1EED (3-5h)" })
              ] }),
              data.rapidMolecularT2Done && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
                "select",
                {
                  value: data.rapidMolecularResult ?? "pending",
                  onChange: (e) => update("rapidMolecularResult", e.target.value),
                  className: "h-6 px-1 text-[11px] bg-white border border-purple-300 rounded",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: "pending", children: "\u0110ang ch\u1EA1y m\xE1y" }),
                    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: "positive", children: "D\u01B0\u01A1ng t\xEDnh (+)" }),
                    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: "negative", children: "\xC2m t\xEDnh (-)" })
                  ]
                }
              )
            ] })
          ] })
        ] })
      ] })
    ] });
  };

  // C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/src/components/UnifiedDashboard.tsx
  var import_react5 = __toESM(require_react(), 1);
  var import_jsx_runtime4 = __toESM(require_jsx_runtime(), 1);
  var UnifiedDashboard = ({
    patient,
    result,
    onSaveCase,
    saveSuccess
  }) => {
    const [copiedSbar, setCopiedSbar] = (0, import_react5.useState)(false);
    const [showDetailedActions, setShowDetailedActions] = (0, import_react5.useState)(false);
    const generateSbarText = () => {
      return `[SBAR SEPSIS CDSS] ${(/* @__PURE__ */ new Date()).toLocaleTimeString("vi-VN")}
\u0110\u1ED1i t\u01B0\u1EE3ng: ${patient.patientType === "adult" ? "Ng\u01B0\u1EDDi l\u1EDBn" : patient.patientType === "pediatric" ? "Nhi" : "S\u1EA3n khoa"} (${patient.ageYears}t, ${patient.gender === "male" ? "Nam" : "N\u1EEF"}, ${patient.weightKg}kg) | B\u1ED1i c\u1EA3nh: ${patient.setting}
1. S: ${result.summarySentence} - M\u1EE9c: ${result.urgencyLevel.toUpperCase()}
2. B: \u1ED4 nhi\u1EC5m ${patient.infectionSource} | YTNC: ${patient.hasImmunosuppression ? "Suy gi\u1EA3m MD;" : ""} ${patient.hasIndwellingCatheter ? "Sonde l\u01B0u;" : ""}
3. A: LS: HA ${patient.sbp}/${patient.dbp} mmHg (MAP ${result.calculatedMap}) | HR ${patient.heartRate} bpm | RR ${patient.respiratoryRate} l/p | T\xB0 ${patient.temperature}\xB0C | SpO2 ${patient.spo2}%
   CLS: WBC ${patient.wbc ?? "N/A"} G/L | NEU ${patient.neutrophilCount ?? "N/A"} G/L | LYM ${patient.lymphocyteCount ?? "N/A"} G/L | NLR ${result.calculatedNlr ?? "N/A"} | Lac 0h ${patient.lactateInitial ?? "N/A"} mmol/L | Lac 6h ${patient.lactateRepeat6h ?? "N/A"} mmol/L (Thanh th\u1EA3i ${result.lactateClearancePercent ?? "N/A"}%) | PCT ${patient.procalcitonin ?? "N/A"} ng/mL
   \u0110i\u1EC3m s\u1ED1: NEWS2 ${result.news2Score} | LP-NEWS ${result.lpNewsScore} | SOFA ${result.sofaScore} (\u0394 ${result.deltaSofa}) | SIRS ${result.sirsScore}/4 | qSOFA ${result.qsofaScore}/3
4. R: ${result.actions.antibioticTiming} - D\u1ECBch: ${result.actions.fluidResuscitation} - V\u1EADn m\u1EA1ch: ${result.actions.vasopressorStrategy}`;
    };
    const handleCopySbar = () => {
      navigator.clipboard.writeText(generateSbarText());
      setCopiedSbar(true);
      setTimeout(() => setCopiedSbar(false), 2e3);
    };
    const isEmergency = result.urgencyLevel === "emergency";
    const isUrgent = result.urgencyLevel === "urgent";
    const sirsTempMet = patient.temperature > 38 || patient.temperature < 36;
    const sirsHrMet = patient.heartRate > 90;
    const sirsRrMet = patient.respiratoryRate > 20;
    const sirsWbcMet = patient.wbc !== void 0 ? patient.wbc > 12 || patient.wbc < 4 : false;
    const qsofaRrMet = patient.respiratoryRate >= 22;
    const qsofaMentalMet = patient.gcs < 15 || patient.newAlteredMentalState || patient.avpu !== "A";
    const qsofaSbpMet = patient.sbp <= 100;
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "space-y-3.5", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: `rounded-xl border p-4 shadow-sm transition-all ${isEmergency ? "bg-rose-50 border-rose-300" : isUrgent ? "bg-amber-50 border-amber-300" : "bg-emerald-50 border-emerald-300"}`, children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: `p-2 rounded-lg text-white mt-0.5 shrink-0 shadow-xs ${isEmergency ? "bg-rose-600 animate-pulse" : isUrgent ? "bg-amber-600" : "bg-emerald-600"}`, children: [
              isEmergency && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(OctagonAlert, { className: "w-5 h-5" }),
              isUrgent && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(TriangleAlert, { className: "w-5 h-5" }),
              !isEmergency && !isUrgent && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(CircleCheck, { className: "w-5 h-5" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex flex-wrap items-center gap-1.5 text-[11px] font-mono font-semibold uppercase mb-0.5", children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: `px-2 py-0.5 rounded-full ${isEmergency ? "bg-rose-200 text-rose-900" : isUrgent ? "bg-amber-200 text-amber-900" : "bg-emerald-200 text-emerald-900"}`, children: isEmergency ? "M\u1EE8C T\u1ED0I KH\u1EA8N C\u1EA4P" : isUrgent ? "M\u1EE8C \u0110\u1ED8 KH\u1EA8N" : "THEO D\xD5I TI\xCAU CHU\u1EA8N" }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "text-slate-600", children: patient.patientType === "adult" ? "Ng\u01B0\u1EDDi l\u1EDBn" : patient.patientType === "pediatric" ? "Nhi khoa" : "S\u1EA3n khoa" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("h2", { className: `text-lg sm:text-xl font-bold tracking-tight ${isEmergency ? "text-rose-950" : isUrgent ? "text-amber-950" : "text-emerald-950"}`, children: [
                result.primaryDiagnosis === "septic_shock" && "S\u1ED0C NHI\u1EC4M KHU\u1EA8N (SEPTIC SHOCK)",
                result.primaryDiagnosis === "confirmed_sepsis" && "X\xC1C NH\u1EACN NHI\u1EC4M KHU\u1EA8N HUY\u1EBET (SEPSIS)",
                result.primaryDiagnosis === "suspected_sepsis" && "NGHI NG\u1EDC CAO NHI\u1EC4M KHU\u1EA8N HUY\u1EBET",
                result.primaryDiagnosis === "uncomplicated_infection" && "NHI\u1EC4M KHU\u1EA8N TH\u01AF\u1EDCNG (CH\u01AFA SUY T\u1EA0NG)",
                result.primaryDiagnosis === "no_sepsis" && "CH\u01AFA GHI NH\u1EACN NGUY C\u01A0 NHI\u1EC4M KHU\u1EA8N HUY\u1EBET"
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: `text-xs mt-1 leading-relaxed font-medium ${isEmergency ? "text-rose-900" : isUrgent ? "text-amber-900" : "text-emerald-900"}`, children: result.summarySentence })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex items-center gap-1.5 shrink-0", children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "button",
              {
                onClick: handleCopySbar,
                className: "p-2 bg-white text-slate-700 hover:text-teal-700 border border-slate-200 rounded-lg shadow-2xs hover:bg-slate-50 transition-colors",
                title: "Sao ch\xE9p b\xE1o c\xE1o SBAR",
                children: copiedSbar ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Check, { className: "w-4 h-4 text-emerald-600" }) : /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Copy, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "button",
              {
                onClick: onSaveCase,
                className: "p-2 bg-white text-slate-700 hover:text-teal-700 border border-slate-200 rounded-lg shadow-2xs hover:bg-slate-50 transition-colors",
                title: "L\u01B0u h\u1ED3 s\u01A1 ca n\xE0y",
                children: saveSuccess ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Check, { className: "w-4 h-4 text-emerald-600" }) : /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(BookmarkPlus, { className: "w-4 h-4" })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "mt-3 pt-2.5 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-2 text-xs", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex items-center gap-1.5 text-slate-800 font-medium", children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Clock, { className: "w-3.5 h-3.5 text-teal-600" }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: "M\u1EE5c ti\xEAu Kh\xE1ng Sinh (NICE/SSC):" }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: `font-bold ${isEmergency ? "text-rose-700" : "text-slate-800"}`, children: result.actions.antibioticTiming.split(".")[0] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex items-center gap-3 text-[11px] font-mono", children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { children: [
              "MAP: ",
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("strong", { className: result.calculatedMap < 65 ? "text-rose-700" : "text-slate-900", children: result.calculatedMap }),
              " mmHg"
            ] }),
            result.calculatedNlr && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { children: [
              "NLR: ",
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("strong", { className: result.nlrRiskLevel === "high" ? "text-rose-700" : "text-slate-900", children: result.calculatedNlr })
            ] }),
            result.lactateClearancePercent !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { children: [
              "Thanh th\u1EA3i Lac: ",
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("strong", { className: result.lactateClearancePercent >= 10 ? "text-emerald-700" : "text-amber-700", children: [
                result.lactateClearancePercent,
                "%"
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "bg-white rounded-xl border border-slate-200 p-3 shadow-2xs", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex items-center justify-between text-[11px]", children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "font-semibold text-slate-500 uppercase", children: "NEWS2" }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: `font-bold px-1.5 py-0.2 rounded text-[10px] ${result.news2RiskCategory === "high" ? "bg-rose-100 text-rose-800" : result.news2RiskCategory === "medium" ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"}`, children: result.news2RiskCategory.toUpperCase() })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "mt-1 flex items-baseline gap-1", children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "text-2xl font-bold font-mono text-slate-900", children: result.news2Score }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "text-[10px] text-slate-400", children: "/ 20" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "text-[11px] text-slate-600 mt-1 line-clamp-2", children: result.hasSingleParam3RedFlag ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "text-rose-700 font-bold", children: "\u25CF Red Flag: C\xF3 1 th\xF4ng s\u1ED1 3\u0111" }) : `Theo d\xF5i m\u1ED7i ${result.news2Score >= 7 ? "30p" : result.news2Score >= 5 ? "1h" : "4-6h"}` })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "bg-white rounded-xl border border-slate-200 p-3 shadow-2xs", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex items-center justify-between text-[11px]", children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "font-semibold text-slate-500 uppercase", children: patient.patientType === "pediatric" ? "Phoenix 2024" : patient.patientType === "maternal" ? "Obs SOFA" : "SEPSIS-SOFA" }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: `font-bold px-1.5 py-0.2 rounded text-[10px] ${result.isSepticShock3 || result.isPhoenixSepticShock || result.isObstetricSepticShock ? "bg-rose-100 text-rose-800" : result.isSepsis3 || result.isPhoenixSepsis || result.isObstetricSepsis ? "bg-amber-100 text-amber-800" : "bg-slate-100 text-slate-700"}`, children: result.isSepticShock3 || result.isPhoenixSepticShock || result.isObstetricSepticShock ? "S\u1ED0C NK" : result.isSepsis3 || result.isPhoenixSepsis || result.isObstetricSepsis ? "SEPSIS" : "B\xCCNH TH\u01AF\u1EDCNG" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "mt-1 flex items-baseline gap-1", children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "text-2xl font-bold font-mono text-slate-900", children: patient.patientType === "pediatric" ? result.phoenixScore : patient.patientType === "maternal" ? result.obstetricSofaScore : result.sofaScore }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "text-[10px] text-slate-400", children: "\u0111i\u1EC3m" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "text-[11px] text-slate-600 mt-1 line-clamp-2", children: patient.patientType === "pediatric" ? `H\u1EC7 tim m\u1EA1ch: ${result.phoenixCardiovascularScore}\u0111` : patient.patientType === "maternal" ? `Obs qSOFA: ${result.obstetricQsofaScore}/3` : `\u0394SOFA t\u0103ng ${result.deltaSofa}\u0111 (qSOFA: ${result.qsofaScore}/3)` })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "bg-white rounded-xl border border-slate-200 p-3 shadow-2xs", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex items-center justify-between text-[11px]", children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "font-semibold text-slate-500 uppercase", children: "SIRS" }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: `font-bold px-1.5 py-0.2 rounded text-[10px] ${result.sirsScore >= 2 ? "bg-amber-100 text-amber-900" : "bg-slate-100 text-slate-700"}`, children: result.sirsScore >= 2 ? "SIRS (+)" : "SIRS (-)" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "mt-1 flex items-baseline gap-1", children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "text-2xl font-bold font-mono text-slate-900", children: result.sirsScore }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "text-[10px] text-slate-400", children: "/ 4 ti\xEAu chu\u1EA9n" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "text-[11px] text-slate-600 mt-1 line-clamp-2", children: result.sirsScore >= 2 ? "\u0110\u1EA1t \u2265 2/4 ti\xEAu ch\xED \u0111\xE1p \u1EE9ng vi\xEAm" : "Ch\u01B0a \u0111\u1EE7 ti\xEAu ch\xED SIRS (< 2/4)" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "bg-white rounded-xl border border-cyan-200 p-3 shadow-2xs bg-gradient-to-b from-cyan-50/20 to-white", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex items-center justify-between text-[11px]", children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "font-semibold text-cyan-800 uppercase", children: "LP-NEWS" }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "font-bold px-1.5 py-0.2 rounded text-[10px] bg-cyan-100 text-cyan-800", children: "AUC 0.966" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "mt-1 flex items-baseline gap-1", children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "text-2xl font-bold font-mono text-cyan-950", children: result.lpNewsScore }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "text-[10px] text-cyan-700", children: "\u0111i\u1EC3m" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "text-[11px] text-slate-600 mt-1 line-clamp-2", children: result.lpNewsMortalityRiskTier === "critical" ? "T\u1EED vong 14 ng\xE0y r\u1EA5t cao" : result.lpNewsMortalityRiskTier === "high" ? "Nguy c\u01A1 t\u1EED vong cao" : "Nguy c\u01A1 t\u1EED vong th\u1EA5p" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "bg-white rounded-xl border border-slate-200 p-3 shadow-2xs", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex items-center justify-between text-[11px]", children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "font-semibold text-slate-500 uppercase", children: "Ph\xE2n T\u1EA7ng NICE" }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: `font-bold px-1.5 py-0.2 rounded text-[10px] ${result.niceRiskCategory === "high" ? "bg-rose-100 text-rose-800" : result.niceRiskCategory === "medium" ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"}`, children: result.niceRiskCategory === "high" ? "R\u1EA4T CAO" : result.niceRiskCategory === "medium" ? "V\u1EEAA" : "TH\u1EA4P" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "mt-1 flex items-baseline gap-1", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "text-xl font-bold text-slate-900", children: result.niceRiskCategory === "high" ? "KS \u2264 1h" : result.niceRiskCategory === "medium" ? "KS \u2264 3h" : "KS \u2264 6h" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "text-[11px] text-slate-600 mt-1 line-clamp-2", children: result.niceHighRiskCriteriaMet.length > 0 ? `${result.niceHighRiskCriteriaMet.length} d\u1EA5u hi\u1EC7u nguy c\u01A1 cao` : "Theo d\xF5i s\xE1t di\u1EC5n ti\u1EBFn" })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "bg-white rounded-xl border border-slate-200 p-3.5 shadow-2xs space-y-2.5", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: "text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5", children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(TestTube, { className: "w-3.5 h-3.5 text-teal-600" }),
            "\u0110\xE1nh Gi\xE1 T\u1EF7 L\u1EC7 NLR (Neutrophil-to-Lymphocyte Ratio)"
          ] }),
          result.calculatedNlr !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: `text-[11px] font-mono px-2 py-0.5 rounded font-bold ${result.nlrRiskLevel === "high" ? "bg-rose-100 text-rose-800" : result.nlrRiskLevel === "elevated" ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"}`, children: [
            "NLR: ",
            result.calculatedNlr,
            " (",
            result.nlrRiskLevel === "high" ? "NGUY C\u01A0 CAO" : result.nlrRiskLevel === "elevated" ? "T\u0102NG V\u1EEAA" : "B\xCCNH TH\u01AF\u1EDCNG",
            ")"
          ] }) : /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "text-[11px] text-slate-400 font-mono", children: "Ch\u01B0a \u0111\u1EE7 d\u1EEF li\u1EC7u CLS" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "p-2.5 bg-slate-50 rounded-lg border border-slate-200", children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "text-[10px] uppercase font-bold text-slate-500 block mb-1", children: "C\xF4ng th\u1EE9c & Gi\xE1 tr\u1ECB \u0111\u1EA7u v\xE0o" }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "font-mono text-[11px] text-slate-800 space-y-0.5", children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { children: [
                "NEU: ",
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("strong", { children: patient.neutrophilCount !== void 0 ? `${patient.neutrophilCount} G/L` : "Ch\u01B0a c\xF3" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { children: [
                "LYM: ",
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("strong", { children: patient.lymphocyteCount !== void 0 ? `${patient.lymphocyteCount} G/L` : "Ch\u01B0a c\xF3" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "pt-1 border-t border-slate-200 text-teal-900 font-bold", children: [
                "NLR = NEU / LYM = ",
                result.calculatedNlr !== void 0 ? result.calculatedNlr : "---"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "p-2.5 bg-slate-50 rounded-lg border border-slate-200 md:col-span-2 space-y-1", children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "text-[10px] uppercase font-bold text-slate-500 block", children: "\xDD ngh\u0129a l\xE2m s\xE0ng (Demni et al. 2026 & B\xE1ch ph\xE2n v\u1ECB)" }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "grid grid-cols-3 gap-1.5 text-[10px]", children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: `p-1.5 rounded border ${result.calculatedNlr !== void 0 && result.calculatedNlr < 3 ? "bg-emerald-100/70 border-emerald-400 text-emerald-950 font-bold ring-1 ring-emerald-400" : "bg-white border-slate-200 text-slate-600"}`, children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "font-bold", children: "< 3.0: B\xECnh th\u01B0\u1EDDng" }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "text-[9px] text-slate-500", children: "M\u1EE9c sinh l\xFD, kh\xF4ng c\xF3 \u01B0u th\u1EBF vi\xEAm c\u1EA5p" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: `p-1.5 rounded border ${result.calculatedNlr !== void 0 && result.calculatedNlr >= 3 && result.calculatedNlr < 6 ? "bg-amber-100/70 border-amber-400 text-amber-950 font-bold ring-1 ring-amber-400" : "bg-white border-slate-200 text-slate-600"}`, children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "font-bold", children: "3.0 - 5.9: T\u0103ng nh\u1EB9/v\u1EEBa" }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "text-[9px] text-slate-500", children: "Ph\u1EA3n \u1EE9ng stress/nhi\u1EC5m khu\u1EA9n ti\u1EC1m \u1EA9n" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: `p-1.5 rounded border ${result.calculatedNlr !== void 0 && result.calculatedNlr >= 6 ? "bg-rose-100/70 border-rose-400 text-rose-950 font-bold ring-1 ring-rose-400" : "bg-white border-slate-200 text-slate-600"}`, children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "font-bold", children: "\u2265 6.0: Nguy c\u01A1 cao" }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "text-[9px] text-slate-500", children: "\u0110\u1ED9 nh\u1EA1y 92%, NPV 97% ti\xEAn l\u01B0\u1EE3ng sepsis/t\u1EED vong 72h" })
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("h3", { className: "text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5", children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Pill, { className: "w-4 h-4 text-teal-600" }),
            "Ph\xE1c \u0110\u1ED3 X\u1EED Tr\xED Kh\u1EA9n C\u1EA5p & H\xE0nh \u0110\u1ED9ng Can Thi\u1EC7p"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
            "button",
            {
              onClick: () => setShowDetailedActions(!showDetailedActions),
              className: "text-[11px] text-teal-700 font-semibold hover:underline flex items-center gap-1",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: showDetailedActions ? "Thu g\u1ECDn" : "Xem chi ti\u1EBFt" }),
                showDetailedActions ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ChevronUp, { className: "w-3 h-3" }) : /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ChevronDown, { className: "w-3 h-3" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3 text-xs", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "space-y-2.5", children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "p-3 rounded-lg bg-teal-50/70 border border-teal-200", children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "font-bold text-teal-950 block text-[11px] uppercase mb-1", children: "1. Kh\xE1ng Sinh T\u0129nh M\u1EA1ch (NICE NG253)" }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "font-semibold text-teal-900 mb-1", children: result.actions.antibioticTiming }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("ul", { className: "text-slate-700 space-y-0.5 list-disc pl-4 text-[11px]", children: result.actions.antibioticRegimen.map((r, idx) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("li", { children: r }, idx)) })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "p-3 rounded-lg bg-blue-50/70 border border-blue-200", children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: "font-bold text-blue-950 block text-[11px] uppercase mb-1 flex items-center gap-1", children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Droplet, { className: "w-3.5 h-3.5 text-blue-600" }),
                "2. Li\u1EC7u Ph\xE1p D\u1ECBch Tinh Th\u1EC3 C\xE2n B\u1EB1ng"
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "text-slate-800 text-[11px] leading-relaxed", children: result.actions.fluidResuscitation })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "space-y-2.5", children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "p-3 rounded-lg bg-rose-50/70 border border-rose-200", children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: "font-bold text-rose-950 block text-[11px] uppercase mb-1 flex items-center gap-1", children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Heart, { className: "w-3.5 h-3.5 text-rose-600" }),
                "3. Thu\u1ED1c V\u1EADn M\u1EA1ch & Huy\u1EBFt \u0110\u1ED9ng"
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "text-slate-800 text-[11px] leading-relaxed", children: result.actions.vasopressorStrategy })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "p-3 rounded-lg bg-amber-50/70 border border-amber-200", children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: "font-bold text-amber-950 block text-[11px] uppercase mb-1 flex items-center gap-1", children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Users, { className: "w-3.5 h-3.5 text-amber-600" }),
                "4. B\u1EADc Thang B\xE1o \u0110\u1ED9ng & H\u1ED9i Ch\u1EA9n"
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("ul", { className: "text-slate-800 space-y-0.5 list-disc pl-4 text-[11px]", children: result.actions.escalationAndConsult.map((e, idx) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("li", { children: e }, idx)) })
            ] })
          ] })
        ] }),
        showDetailedActions && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "pt-2 border-t border-slate-100 text-xs text-slate-700 space-y-2 bg-slate-50 p-3 rounded-lg", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "font-bold text-slate-900 block mb-1", children: "Ki\u1EC3m So\xE1t Ngu\u1ED3n Nhi\u1EC5m (Source Control):" }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "text-[11px] text-slate-600", children: result.actions.sourceControlNotes })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "font-bold text-slate-900 block mb-1", children: "T\u1EA7n Su\u1EA5t Theo D\xF5i Sinh Hi\u1EC7u:" }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "text-[11px] text-slate-600", children: result.actions.monitoringFrequency })
            ] })
          ] }),
          patient.rapidMolecularResult === "positive" && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "p-2.5 rounded bg-purple-50 border border-purple-200 text-purple-950 mt-1", children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: "font-bold block text-[11px] flex items-center gap-1", children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Dna, { className: "w-3.5 h-3.5 text-purple-600" }),
              "K\u1EBFt Qu\u1EA3 Ph\xE2n T\u1EED T2Bacteria Si\xEAu T\u1ED1c (3-5h):"
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("p", { className: "text-[11px] mt-0.5", children: [
              "Ph\xE1t hi\u1EC7n: ",
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("strong", { children: patient.rapidMolecularPathogen }),
              ". Gen kh\xE1ng: ",
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("strong", { children: patient.rapidMolecularResistanceGenes?.join(", ") || "Ch\u01B0a ghi nh\u1EADn" }),
              ". C\u1EA7n \u0111i\u1EC1u ch\u1EC9nh kh\xE1ng sinh nh\u1EAFm \u0111\xEDch ngay l\u1EADp t\u1EE9c!"
            ] })
          ] })
        ] })
      ] })
    ] });
  };

  // C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/src/components/ClinicalGuideModal.tsx
  var import_react6 = __toESM(require_react(), 1);
  var import_jsx_runtime5 = __toESM(require_jsx_runtime(), 1);
  var ClinicalGuideModal = ({ isOpen, onClose }) => {
    const [activeSection, setActiveSection] = (0, import_react6.useState)("intro");
    if (!isOpen) return null;
    const sections = [
      { id: "intro", title: "1. Kh\xE1i Ni\u1EC7m & Ph\xE2n \u0110\u1ED9 Sepsis", icon: BookOpen },
      { id: "screening", title: "2. NEWS2 vs qSOFA vs SIRS", icon: TriangleAlert },
      { id: "pediatric", title: "3. Phoenix Pediatric Sepsis 2024", icon: Baby },
      { id: "maternal", title: "4. Sepsis S\u1EA3n Khoa (Thai K\u1EF3/H\u1EADu S\u1EA3n)", icon: Heart },
      { id: "biomarkers", title: "5. LP-NEWS, Lactate & NLR", icon: Droplet },
      { id: "molecular", title: "6. Ch\u1EA9n \u0110o\xE1n Ph\xE2n T\u1EED T2MR", icon: Dna },
      { id: "golden-hour", title: "7. Ph\xE1c \u0110\u1ED3 Gi\u1EDD V\xE0ng (Hour-1)", icon: Clock }
    ];
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between shrink-0", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "w-9 h-9 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(BookOpen, { className: "w-5 h-5" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("h3", { className: "text-base font-bold text-slate-900", children: "H\u01B0\u1EDBng D\u1EABn Y Khoa & S\xE0ng L\u1ECDc Sepsis Cho Ng\u01B0\u1EDDi M\u1EDBi" }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "text-xs text-slate-500", children: "T\xF3m t\u1EAFt c\u01A1 s\u1EDF b\u1EB1ng ch\u1EE9ng NICE NG253, Sepsis-3, Phoenix 2024 & Biomarkers" })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
          "button",
          {
            onClick: onClose,
            className: "p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors",
            children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(X, { className: "w-5 h-5" })
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center gap-1.5 overflow-x-auto shrink-0 scrollbar-none", children: sections.map((sec) => {
        const Icon2 = sec.icon;
        const isActive = activeSection === sec.id;
        return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
          "button",
          {
            onClick: () => setActiveSection(sec.id),
            className: `px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${isActive ? "bg-teal-600 text-white shadow-sm" : "bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200"}`,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Icon2, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { children: sec.title })
            ]
          },
          sec.id
        );
      }) }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "p-5 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed flex-1", children: [
        activeSection === "intro" && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "space-y-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("h4", { className: "font-bold text-slate-900 text-base", children: "Ti\u1EBFn Tr\xECnh \u0110\u1ECBnh Ngh\u0129a Sepsis: T\u1EEB SIRS \u0110\u1EBFn Sepsis-3" }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { children: 'N\u0103m 2016, H\u1ED9i \u0111\u1ED3ng chuy\xEAn gia qu\u1ED1c t\u1EBF ch\xEDnh th\u1EE9c thay \u0111\u1ED5i \u0111\u1ECBnh ngh\u0129a Sepsis-3, b\xE3i b\u1ECF ho\xE0n to\xE0n ti\xEAu chu\u1EA9n SIRS v\xE0 kh\xE1i ni\u1EC7m "Severe Sepsis".' }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-3", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "p-3.5 rounded-lg bg-slate-50 border border-slate-200", children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-[11px] font-bold text-slate-500 uppercase", children: "C\u1EA5p \u0111\u1ED9 1" }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("h5", { className: "font-bold text-slate-900 mt-0.5", children: "Nhi\u1EC5m Khu\u1EA9n Th\u01B0\u1EDDng" }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "text-xs text-slate-600 mt-1.5", children: "Ph\u1EA3n \u1EE9ng vi\xEAm khu tr\xFA, ch\u01B0a c\xF3 t\u1ED5n th\u01B0\u01A1ng ch\u1EE9c n\u0103ng c\u01A1 quan \u0111e d\u1ECDa t\u1EED vong." })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "p-3.5 rounded-lg bg-amber-50 border border-amber-200", children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-[11px] font-bold text-amber-800 uppercase", children: "C\u1EA5p \u0111\u1ED9 2 (Sepsis-3)" }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("h5", { className: "font-bold text-amber-950 mt-0.5", children: "Nhi\u1EC5m Khu\u1EA9n Huy\u1EBFt" }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("p", { className: "text-xs text-amber-900 mt-1.5", children: [
                "R\u1ED1i lo\u1EA1n ch\u1EE9c n\u0103ng c\u01A1 quan \u0111e d\u1ECDa t\u1EED vong do \u0111\xE1p \u1EE9ng kh\xF4ng \u0111i\u1EC1u h\xF2a c\u1EE7a c\u01A1 th\u1EC3. Ti\xEAu chu\u1EA9n: ",
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("strong", { children: "\u0394SOFA \u2265 2 \u0111i\u1EC3m" }),
                ". T\u1EF7 l\u1EC7 t\u1EED vong > 10%."
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "p-3.5 rounded-lg bg-rose-50 border border-rose-200", children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-[11px] font-bold text-rose-800 uppercase", children: "C\u1EA5p \u0111\u1ED9 3 (Nguy k\u1ECBch)" }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("h5", { className: "font-bold text-rose-950 mt-0.5", children: "S\u1ED1c Nhi\u1EC5m Khu\u1EA9n" }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("p", { className: "text-xs text-rose-900 mt-1.5", children: [
                "T\u1EE5t huy\u1EBFt \xE1p k\xE9o d\xE0i c\u1EA7n thu\u1ED1c v\u1EADn m\u1EA1ch \u0111\u1EC3 duy tr\xEC ",
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("strong", { children: "MAP \u2265 65 mmHg" }),
                " v\xE0 ",
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("strong", { children: "Lactate > 2 mmol/L" }),
                " sau khi \u0111\xE3 b\xF9 \u0111\u1EE7 th\u1EC3 t\xEDch d\u1ECBch. T\u1EED vong > 40%."
              ] })
            ] })
          ] })
        ] }),
        activeSection === "screening" && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "space-y-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("h4", { className: "font-bold text-slate-900 text-base", children: "V\xEC Sao Khuy\xEAn KH\xD4NG D\xF9ng qSOFA \u0110\u01A1n \u0110\u1ED9c \u0110\u1EC3 S\xE0ng L\u1ECDc?" }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("p", { children: [
            "Khuy\u1EBFn c\xE1o t\u1EEB ",
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("strong", { children: "Surviving Sepsis Campaign (SSC 2021)" }),
            " v\xE0 ",
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("strong", { children: "NICE NG253 (2024/2026)" }),
            " n\xEAu r\xF5: qSOFA c\xF3 \u0111\u1ED9 \u0111\u1EB7c hi\u1EC7u cao nh\u01B0ng ",
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("strong", { children: "\u0111\u1ED9 nh\u1EA1y r\u1EA5t th\u1EA5p (ch\u1EC9 24% - 50%)" }),
            ", d\u1EC5 b\u1ECF s\xF3t b\u1EC7nh nh\xE2n giai \u0111o\u1EA1n s\u1EDBm."
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "p-3 bg-teal-50 border border-teal-200 rounded-lg", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "font-bold text-teal-900 block mb-1", children: "NICE NG253 \u01B0u ti\xEAn s\u1EED d\u1EE5ng NEWS2:" }),
            "NEWS2 c\xF3 \u0111\u1ED9 nh\u1EA1y v\u01B0\u1EE3t tr\u1ED9i trong vi\u1EC7c ph\xE1t hi\u1EC7n s\u1EDBm di\u1EC5n bi\u1EBFn x\u1EA5u. \u0110\u1EB7c bi\u1EC7t ch\xFA \xFD ",
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("strong", { children: 'Quy t\u1EAFc "Th\xF4ng s\u1ED1 3 \u0111i\u1EC3m"' }),
            ": b\u1EA5t k\u1EF3 sinh hi\u1EC7u n\xE0o \u0111\u1EA1t 3 \u0111i\u1EC3m (vd: HA t\xE2m thu \u2264 90 ho\u1EB7c Nh\u1ECBp th\u1EDF \u2265 25) \u0111\u1EC1u l\xE0 b\xE1o \u0111\u1ED9ng \u0111\u1ECF c\u1EA7n b\xE1c s\u0129 FY2+ \u0111\xE1nh gi\xE1 kh\u1EA9n c\u1EA5p t\u1EA1i gi\u01B0\u1EDDng."
          ] })
        ] }),
        activeSection === "pediatric" && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "space-y-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("h4", { className: "font-bold text-slate-900 text-base", children: "Ti\xEAu Chu\u1EA9n Phoenix Pediatric Sepsis 2024 (JAMA)" }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { children: "\xC1p d\u1EE5ng cho tr\u1EBB em < 18 tu\u1ED5i, ch\xEDnh th\u1EE9c thay th\u1EBF ho\xE0n to\xE0n ti\xEAu chu\u1EA9n SIRS/IPSCC c\u0169 t\u1EEB th\xE1ng 1/2024:" }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("ul", { className: "list-disc pl-5 space-y-1.5 text-xs text-slate-700", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("li", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("strong", { children: "Sepsis Nhi:" }),
              " Nghi ng\u1EDD nhi\u1EC5m khu\u1EA9n + T\u1ED5ng \u0111i\u1EC3m Phoenix Sepsis Score \u2265 2 \u0111i\u1EC3m (t\u1EEB 4 h\u1EC7: H\xF4 h\u1EA5p, Tim m\u1EA1ch, \u0110\xF4ng m\xE1u, Th\u1EA7n kinh)."
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("li", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("strong", { children: "S\u1ED1c Nhi\u1EC5m Khu\u1EA9n Nhi:" }),
              " Th\u1ECFa Sepsis + c\xF3 \u2265 1 \u0111i\u1EC3m t\u1EA1i h\u1EC7 Tim M\u1EA1ch (T\u1EE5t MAP theo tu\u1ED5i, ho\u1EB7c Lactate \u2265 5 mmol/L, ho\u1EB7c c\u1EA7n v\u1EADn m\u1EA1ch)."
            ] })
          ] })
        ] }),
        activeSection === "maternal" && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "space-y-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("h4", { className: "font-bold text-slate-900 text-base", children: "Sepsis S\u1EA3n Khoa (Fetal I+D Barcelona Guidelines)" }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { children: "Do thay \u0111\u1ED5i sinh l\xFD thai k\u1EF3 (nh\u1ECBp tim t\u0103ng, b\u1EA1ch c\u1EA7u t\u0103ng t\u1EDBi 16.9k\u201330k khi chuy\u1EC3n d\u1EA1, Creatinine sinh l\xFD gi\u1EA3m th\u1EA5p), c\u1EA7n d\xF9ng:" }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "p-3 bg-pink-50 border border-pink-200 rounded-lg", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "font-bold text-pink-900 block mb-1", children: "Obstetric qSOFA (s\xE0ng l\u1ECDc nhanh):" }),
            "HATT < 90 mmHg (1\u0111), Nh\u1ECBp th\u1EDF \u2265 25 l\u1EA7n/ph\xFAt (1\u0111), \xDD th\u1EE9c bi\u1EBFn \u0111\u1ED5i (1\u0111). Khi \u0111\u1EA1t \u2265 2 \u0111i\u1EC3m: Kh\u1EA9n tr\u01B0\u01A1ng t\xEDnh Obstetric SOFA v\xE0 b\u1EAFt \u0111\u1EA7u ph\xE1c \u0111\u1ED3."
          ] })
        ] }),
        activeSection === "biomarkers" && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "space-y-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("h4", { className: "font-bold text-slate-900 text-base", children: "D\u1EA5u \u1EA4n Sinh H\u1ECDc Ti\xEAn L\u01B0\u1EE3ng S\u1EDBm: LP-NEWS, Lactate & NLR" }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-3", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "p-3 rounded-lg bg-cyan-50 border border-cyan-200", children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "font-bold text-cyan-900 block text-xs", children: "LP-NEWS (Das et al. 2024)" }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("p", { className: "text-[11px] text-cyan-950 mt-1", children: [
                "T\xEDch h\u1EE3p Lactate v\xE0 PCT v\xE0o NEWS \u0111\u1EA1t ",
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("strong", { children: "AUROC = 0.966" }),
                ". Ng\u01B0\u1EE1ng c\u1EAFt \u2265 11 \u0111i\u1EC3m c\xF3 \u0111\u1ED9 nh\u1EA1y 97%, \u0111\u1EB7c hi\u1EC7u 88% d\u1EF1 b\xE1o t\u1EED vong 14 ng\xE0y."
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "p-3 rounded-lg bg-rose-50 border border-rose-200", children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "font-bold text-rose-900 block text-xs", children: "NLR (Demni et al. 2026)" }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("p", { className: "text-[11px] text-rose-950 mt-1", children: [
                "T\u1EF7 s\u1ED1 Neutrophil / Lymphocyte ",
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("strong", { children: "\u2265 6.0" }),
                " c\xF3 \u0111\u1ED9 nh\u1EA1y 92% d\u1EF1 b\xE1o t\u1EED vong 72h v\xE0 ti\u1EBFn tri\u1EC3n s\u1ED1c nhi\u1EC5m khu\u1EA9n."
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "p-3 rounded-lg bg-emerald-50 border border-emerald-200", children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "font-bold text-emerald-900 block text-xs", children: "Thanh Th\u1EA3i Lactate 6h" }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "text-[11px] text-emerald-950 mt-1", children: "Meta-analysis 2026: Thanh th\u1EA3i \u2265 10% trong 6 gi\u1EDD \u0111\u1EA7u li\xEAn quan gi\u1EA3m t\u1EF7 l\u1EC7 t\u1EED vong \u0111\xE1ng k\u1EC3 (OR = 0.52)." })
            ] })
          ] })
        ] }),
        activeSection === "molecular" && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "space-y-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("h4", { className: "font-bold text-slate-900 text-base", children: "\u0110\u1ED9t Ph\xE1 Ch\u1EA9n \u0110o\xE1n Ph\xE2n T\u1EED T2MR (Biomedicines 2026)" }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("p", { children: [
            "H\u1EC7 th\u1ED1ng ",
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("strong", { children: "T2Bacteria / T2Resistance Panel" }),
            " ph\xE2n t\xEDch tr\u1EF1c ti\u1EBFp m\xE1u to\xE0n ph\u1EA7n cho k\u1EBFt qu\u1EA3 sau ",
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("strong", { children: "3\u20135 gi\u1EDD" }),
            " (so v\u1EDBi trung v\u1ECB 103\u2013108 gi\u1EDD c\u1EE7a c\u1EA5y m\xE1u th\xF4ng th\u01B0\u1EDDng). Gi\xFAp ph\xE1t hi\u1EC7n nhanh c\xE1c ch\u1EE7ng ESKAPE v\xE0 gen kh\xE1ng Carbapenem (blaOXA-48, blaCTX-M, blaKPC) \u0111\u1EC3 \u0111\u1ED5i s\u1EDBm sang kh\xE1ng sinh nh\u1EAFm tr\xFAng \u0111\xEDch."
          ] })
        ] }),
        activeSection === "golden-hour" && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "space-y-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("h4", { className: "font-bold text-slate-900 text-base", children: "Ph\xE1c \u0110\u1ED3 Gi\u1EDD V\xE0ng (Hour-1 Bundle)" }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("ol", { className: "list-decimal pl-5 space-y-1.5 text-xs text-slate-700", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("li", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("strong", { children: "\u0110o Lactate m\xE1u:" }),
              " \u0110o l\u1EA1i n\u1EBFu ban \u0111\u1EA7u > 2 mmol/L."
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("li", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("strong", { children: "C\u1EA5y m\xE1u tr\u01B0\u1EDBc kh\xE1ng sinh:" }),
              " L\u1EA5y \xEDt nh\u1EA5t 2 b\u1ED9 c\u1EA5y m\xE1u (hi\u1EBFu kh\xED & k\u1EF5 kh\xED)."
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("li", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("strong", { children: "Kh\xE1ng sinh ph\u1ED5 r\u1ED9ng:" }),
              " Ti\xEAm t\u0129nh m\u1EA1ch trong v\xF2ng 1 gi\u1EDD \u0111\u1ED1i v\u1EDBi ca nguy c\u01A1 cao ho\u1EB7c s\u1ED1c."
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("li", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("strong", { children: "B\xF9 d\u1ECBch tinh th\u1EC3 c\xE2n b\u1EB1ng:" }),
              " NICE 2025/2026 khuy\u1EBFn c\xE1o bolus t\u1EEBng n\u1EA5c 250 mL; SSC 2021 khuy\u1EBFn c\xE1o 30 mL/kg trong 3 gi\u1EDD."
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("li", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("strong", { children: "D\xF9ng thu\u1ED1c v\u1EADn m\u1EA1ch:" }),
              " Norepinephrine l\xE0 l\u1EF1a ch\u1ECDn h\xE0ng \u0111\u1EA7u, \u0111\xEDch MAP \u2265 65 mmHg."
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "p-3 sm:p-4 border-t border-slate-200 bg-slate-50 flex justify-end shrink-0", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
        "button",
        {
          onClick: onClose,
          className: "px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold",
          children: "\u0110\xE3 Hi\u1EC3u & \u0110\xF3ng L\u1EA1i"
        }
      ) })
    ] }) });
  };

  // C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/src/components/CaseHistoryModal.tsx
  var import_jsx_runtime6 = __toESM(require_jsx_runtime(), 1);
  var CaseHistoryModal = ({
    isOpen,
    onClose,
    savedCases,
    onLoadCase,
    onDeleteCase,
    onClearAll
  }) => {
    if (!isOpen) return null;
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between shrink-0", children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex items-center gap-2.5", children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(History, { className: "w-4 h-4" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("h3", { className: "text-base font-bold text-slate-900", children: [
              "L\u1ECBch S\u1EED Ca B\u1EC7nh \u0110\xE3 L\u01B0u (",
              savedCases.length,
              ")"
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "text-xs text-slate-500", children: "H\u1ED3 s\u01A1 l\u01B0u tr\u1EEF tr\xEAn tr\xECnh duy\u1EC7t h\u1ED7 tr\u1EE3 b\xE0n giao ca tr\u1EF1c & \u0111\u1ED1i chi\u1EBFu" })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex items-center gap-2", children: [
          savedCases.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
            "button",
            {
              onClick: onClearAll,
              className: "p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors",
              title: "X\xF3a t\u1EA5t c\u1EA3 h\u1ED3 s\u01A1",
              children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Trash2, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
            "button",
            {
              onClick: onClose,
              className: "p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors",
              children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(X, { className: "w-5 h-5" })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "p-4 overflow-y-auto space-y-3 flex-1", children: savedCases.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "text-center py-10", children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(History, { className: "w-10 h-10 text-slate-300 mx-auto mb-2" }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "text-sm font-semibold text-slate-700", children: "Ch\u01B0a c\xF3 h\u1ED3 s\u01A1 ca b\u1EC7nh n\xE0o" }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "text-xs text-slate-400 mt-0.5", children: "Nh\u1EA5n bi\u1EC3u t\u01B0\u1EE3ng l\u01B0u tr\xEAn thanh c\xF4ng c\u1EE5 \u0111\u1EC3 l\u01B0u ca hi\u1EC7n t\u1EA1i" })
      ] }) : savedCases.map((c) => {
        const res = evaluatePatientCDSS(c.patientData);
        const isEmergency = res.urgencyLevel === "emergency";
        const isUrgent = res.urgencyLevel === "urgent";
        return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
          "div",
          {
            className: "p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-teal-50/30 hover:border-teal-300 transition-all flex items-center justify-between gap-3",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "min-w-0", children: [
                /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { className: "font-bold text-xs text-slate-900 truncate", children: [
                    "Ca ",
                    c.patientData.patientType === "adult" ? "Ng\u01B0\u1EDDi l\u1EDBn" : c.patientData.patientType === "pediatric" ? "Nhi khoa" : "S\u1EA3n khoa",
                    " \xB7 ",
                    c.patientData.ageYears,
                    " tu\u1ED5i (",
                    c.patientData.gender === "male" ? "Nam" : "N\u1EEF",
                    ")"
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: `text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0 ${isEmergency ? "bg-rose-100 text-rose-800" : isUrgent ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"}`, children: res.primaryDiagnosis.replace("_", " ").toUpperCase() })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex items-center gap-3 text-[11px] text-slate-500 font-mono mt-1", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { children: [
                    "NEWS2: ",
                    res.news2Score
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { children: [
                    "LP-NEWS: ",
                    res.lpNewsScore
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { children: [
                    "Lactate: ",
                    c.patientData.lactateInitial ?? "N/A"
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "text-slate-400", children: "\xB7" }),
                  /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { className: "text-[10px] flex items-center gap-1 font-sans", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Calendar, { className: "w-3 h-3 text-slate-400" }),
                    new Date(c.savedAt).toLocaleDateString("vi-VN")
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex items-center gap-1 shrink-0", children: [
                /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
                  "button",
                  {
                    onClick: () => onDeleteCase(c.id),
                    className: "p-1.5 text-slate-400 hover:text-rose-600 rounded",
                    title: "X\xF3a ca n\xE0y",
                    children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Trash2, { className: "w-4 h-4" })
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
                  "button",
                  {
                    onClick: () => {
                      onLoadCase(c.patientData);
                      onClose();
                    },
                    className: "px-2.5 py-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1 shadow-sm",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: "M\u1EDF" }),
                      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(ArrowRight, { className: "w-3.5 h-3.5" })
                    ]
                  }
                )
              ] })
            ]
          },
          c.id
        );
      }) }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "p-3 border-t border-slate-200 bg-slate-50 flex justify-end shrink-0", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
        "button",
        {
          onClick: onClose,
          className: "px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200/70 rounded-lg transition-colors",
          children: "\u0110\xF3ng L\u1EA1i"
        }
      ) })
    ] }) });
  };

  // C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/src/components/PresetCasesModal.tsx
  var import_jsx_runtime7 = __toESM(require_jsx_runtime(), 1);
  var PresetCasesModal = ({
    isOpen,
    onClose,
    onSelectCase
  }) => {
    if (!isOpen) return null;
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200", children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100", children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "flex items-center gap-2.5", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Sparkles, { className: "w-4 h-4" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("h3", { className: "text-base font-bold text-slate-900", children: "B\u1ED9 Ca B\u1EC7nh M\u1EABu Th\u1EF1c T\u1EBF T\u1EEB Y V\u0103n (Clinical Presets)" }),
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { className: "text-xs text-slate-500", children: "Ch\u1ECDn m\u1ED9t ca l\xE2m s\xE0ng \u0111\u1EC3 n\u1EA1p d\u1EEF li\u1EC7u v\xE0 ki\u1EC3m nghi\u1EC7m h\u1EC7 th\u1ED1ng CDSS" })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
          "button",
          {
            onClick: onClose,
            className: "p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors",
            children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(X, { className: "w-5 h-5" })
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "space-y-3 mt-4 max-h-[65vh] overflow-y-auto pr-1", children: PRESET_CASES.map((cs) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
        "div",
        {
          onClick: () => onSelectCase(cs),
          className: "p-4 rounded-xl border border-slate-200 hover:border-teal-400 bg-slate-50/60 hover:bg-teal-50/40 cursor-pointer transition-all group",
          children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "flex items-start justify-between gap-3", children: [
            /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "text-[11px] font-semibold text-teal-800 uppercase tracking-wider block mb-1", children: cs.category }),
              /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("h4", { className: "text-sm font-bold text-slate-900 group-hover:text-teal-900", children: cs.title }),
              /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { className: "text-xs text-slate-500 mt-0.5", children: cs.subtitle }),
              /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { className: "text-xs text-slate-700 mt-2 bg-white p-2.5 rounded-lg border border-slate-200/80 leading-relaxed font-sans", children: cs.clinicalScenario })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "shrink-0 p-2 text-slate-400 group-hover:text-teal-600 group-hover:translate-x-0.5 transition-all", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(ArrowRight, { className: "w-5 h-5" }) })
          ] })
        },
        cs.id
      )) }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "mt-5 pt-3 border-t border-slate-100 flex justify-end", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
        "button",
        {
          onClick: onClose,
          className: "px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors",
          children: "\u0110\xF3ng L\u1EA1i"
        }
      ) })
    ] }) });
  };

  // C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/src/App.tsx
  var import_jsx_runtime8 = __toESM(require_jsx_runtime(), 1);
  var DEFAULT_PATIENT = {
    ...NORMAL_PATIENT_CASE,
    id: "current-patient"
  };
  function App() {
    const [patient, setPatient] = (0, import_react7.useState)(DEFAULT_PATIENT);
    const [isFormCollapsed, setIsFormCollapsed] = (0, import_react7.useState)(false);
    const [isPresetsOpen, setIsPresetsOpen] = (0, import_react7.useState)(false);
    const [isGuideOpen, setIsGuideOpen] = (0, import_react7.useState)(false);
    const [isHistoryOpen, setIsHistoryOpen] = (0, import_react7.useState)(false);
    const [savedCases, setSavedCases] = (0, import_react7.useState)([]);
    const [saveSuccess, setSaveSuccess] = (0, import_react7.useState)(false);
    const [mobileTab, setMobileTab] = (0, import_react7.useState)("input");
    (0, import_react7.useEffect)(() => {
      try {
        const stored = localStorage.getItem("sepsis_cdss_saved_cases");
        if (stored) {
          setSavedCases(JSON.parse(stored));
        }
      } catch (e) {
        console.error("Failed to parse saved cases:", e);
      }
    }, []);
    const cdssResult = evaluatePatientCDSS(patient);
    const handleSelectPreset = (preset) => {
      setPatient({ ...preset.patientData });
      setIsPresetsOpen(false);
      if (window.innerWidth < 1024) {
        setMobileTab("dashboard");
      }
    };
    const handleReset = () => {
      setPatient({
        ...DEFAULT_PATIENT,
        patientName: "",
        patientCode: "",
        id: `pt-${Date.now()}`
      });
    };
    const handleSaveCurrentCase = () => {
      const newRecord = {
        id: `rec-${Date.now()}`,
        savedAt: (/* @__PURE__ */ new Date()).toISOString(),
        patientData: { ...patient }
      };
      const updated = [newRecord, ...savedCases].slice(0, 30);
      setSavedCases(updated);
      try {
        localStorage.setItem("sepsis_cdss_saved_cases", JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to save to localStorage:", e);
      }
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2e3);
    };
    const handleDeleteCase = (id) => {
      const updated = savedCases.filter((c) => c.id !== id);
      setSavedCases(updated);
      localStorage.setItem("sepsis_cdss_saved_cases", JSON.stringify(updated));
    };
    const handleClearAllCases = () => {
      if (window.confirm("B\u1EA1n c\xF3 ch\u1EAFc ch\u1EAFn mu\u1ED1n x\xF3a to\xE0n b\u1ED9 l\u1ECBch s\u1EED ca b\u1EC7nh \u0111\xE3 l\u01B0u?")) {
        setSavedCases([]);
        localStorage.removeItem("sepsis_cdss_saved_cases");
      }
    };
    const handleLoadCase = (data) => {
      setPatient({ ...data });
      if (window.innerWidth < 1024) {
        setMobileTab("dashboard");
      }
    };
    return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "min-h-screen bg-slate-100/70 flex flex-col font-sans text-slate-900 selection:bg-teal-100 selection:text-teal-900", children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
        Header,
        {
          onOpenPresets: () => setIsPresetsOpen(true),
          onSelectPreset: handleSelectPreset,
          onOpenGuide: () => setIsGuideOpen(true),
          onOpenHistory: () => setIsHistoryOpen(true),
          onReset: handleReset,
          savedCount: savedCases.length
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("main", { className: "flex-1 max-w-7xl w-full mx-auto px-2.5 sm:px-4 lg:px-6 py-3 sm:py-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "mb-3 flex items-center justify-between gap-2 overflow-x-auto pb-1 scrollbar-none md:hidden", children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "flex items-center gap-1.5 shrink-0", children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Sparkles, { className: "w-3.5 h-3.5 text-teal-600" }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "text-[11px] font-semibold text-slate-600", children: "Ca m\u1EABu:" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "flex items-center gap-1.5 overflow-x-auto", children: PRESET_CASES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
            "button",
            {
              onClick: () => handleSelectPreset(c),
              className: "px-2.5 py-1 text-[11px] font-medium bg-white border border-slate-200 hover:border-teal-400 rounded-lg text-slate-700 whitespace-nowrap shadow-2xs transition-colors",
              children: c.category.split("-")[0].trim()
            },
            c.id
          )) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "lg:hidden mb-3 bg-white p-1 rounded-xl border border-slate-200 grid grid-cols-2 gap-1 shadow-2xs", children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
            "button",
            {
              onClick: () => setMobileTab("input"),
              className: `py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors ${mobileTab === "input" ? "bg-teal-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"}`,
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Stethoscope, { className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { children: "D\u1EEF Li\u1EC7u Kh\xE1m (35%)" })
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
            "button",
            {
              onClick: () => setMobileTab("dashboard"),
              className: `py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors relative ${mobileTab === "dashboard" ? "bg-teal-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"}`,
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Activity, { className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { children: "K\u1EBFt Qu\u1EA3 & X\u1EED Tr\xED (65%)" }),
                cdssResult.urgencyLevel === "emergency" && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "w-2 h-2 rounded-full bg-rose-500 animate-ping absolute top-2 right-4" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "flex flex-col lg:flex-row items-start gap-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: `transition-all duration-200 shrink-0 ${mobileTab === "dashboard" ? "hidden lg:block" : "block"} ${isFormCollapsed ? "w-full lg:w-16" : "w-full lg:w-[35%]"}`, children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
            CompactPatientForm,
            {
              data: patient,
              onChange: setPatient,
              isCollapsed: isFormCollapsed,
              onToggleCollapse: () => setIsFormCollapsed(!isFormCollapsed)
            }
          ) }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: `w-full flex-1 min-w-0 ${mobileTab === "input" ? "hidden lg:block" : "block"}`, children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
            UnifiedDashboard,
            {
              patient,
              result: cdssResult,
              onSaveCase: handleSaveCurrentCase,
              saveSuccess
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
        ClinicalGuideModal,
        {
          isOpen: isGuideOpen,
          onClose: () => setIsGuideOpen(false)
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
        CaseHistoryModal,
        {
          isOpen: isHistoryOpen,
          onClose: () => setIsHistoryOpen(false),
          savedCases,
          onLoadCase: handleLoadCase,
          onDeleteCase: handleDeleteCase,
          onClearAll: handleClearAllCases
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
        PresetCasesModal,
        {
          isOpen: isPresetsOpen,
          onClose: () => setIsPresetsOpen(false),
          onSelectCase: handleSelectPreset
        }
      )
    ] });
  }

  // C:/Users/nguye/.gemini/antigravity-ide/brain/fcb19239-23d1-44a0-9ebf-19d73e53da75/scratch/sepsis/src/main.tsx
  var import_jsx_runtime9 = __toESM(require_jsx_runtime(), 1);
  (0, import_client.createRoot)(document.getElementById("root")).render(
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_react8.StrictMode, { children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(App, {}) })
  );
})();
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
/*! Bundled license information:

react/cjs/react.production.js:
  (**
   * @license React
   * react.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

scheduler/cjs/scheduler.production.js:
  (**
   * @license React
   * scheduler.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.production.js:
  (**
   * @license React
   * react-dom.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom-client.production.js:
  (**
   * @license React
   * react-dom-client.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.production.js:
  (**
   * @license React
   * react-jsx-runtime.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/shared/src/utils.js:
lucide-react/dist/esm/defaultAttributes.js:
lucide-react/dist/esm/Icon.js:
lucide-react/dist/esm/createLucideIcon.js:
lucide-react/dist/esm/icons/activity.js:
lucide-react/dist/esm/icons/arrow-right.js:
lucide-react/dist/esm/icons/baby.js:
lucide-react/dist/esm/icons/book-open.js:
lucide-react/dist/esm/icons/bookmark-plus.js:
lucide-react/dist/esm/icons/calendar.js:
lucide-react/dist/esm/icons/check.js:
lucide-react/dist/esm/icons/chevron-down.js:
lucide-react/dist/esm/icons/chevron-up.js:
lucide-react/dist/esm/icons/chevrons-left.js:
lucide-react/dist/esm/icons/chevrons-right.js:
lucide-react/dist/esm/icons/circle-check.js:
lucide-react/dist/esm/icons/clock.js:
lucide-react/dist/esm/icons/copy.js:
lucide-react/dist/esm/icons/dna.js:
lucide-react/dist/esm/icons/droplet.js:
lucide-react/dist/esm/icons/heart.js:
lucide-react/dist/esm/icons/history.js:
lucide-react/dist/esm/icons/layers.js:
lucide-react/dist/esm/icons/octagon-alert.js:
lucide-react/dist/esm/icons/pill.js:
lucide-react/dist/esm/icons/rotate-ccw.js:
lucide-react/dist/esm/icons/sparkles.js:
lucide-react/dist/esm/icons/stethoscope.js:
lucide-react/dist/esm/icons/test-tube.js:
lucide-react/dist/esm/icons/trash-2.js:
lucide-react/dist/esm/icons/triangle-alert.js:
lucide-react/dist/esm/icons/user.js:
lucide-react/dist/esm/icons/users.js:
lucide-react/dist/esm/icons/x.js:
lucide-react/dist/esm/lucide-react.js:
  (**
   * @license lucide-react v0.546.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
