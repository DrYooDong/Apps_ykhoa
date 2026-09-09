(() => {
  // tools/scratch/archive_abg/dist/assets/index-74D1-lFY.js
  (function() {
    const O = document.createElement("link").relList;
    if (O && O.supports && O.supports("modulepreload")) return;
    for (const G of document.querySelectorAll('link[rel="modulepreload"]')) o(G);
    new MutationObserver((G) => {
      for (const E of G) if (E.type === "childList") for (const R of E.addedNodes) R.tagName === "LINK" && R.rel === "modulepreload" && o(R);
    }).observe(document, { childList: true, subtree: true });
    function g(G) {
      const E = {};
      return G.integrity && (E.integrity = G.integrity), G.referrerPolicy && (E.referrerPolicy = G.referrerPolicy), G.crossOrigin === "use-credentials" ? E.credentials = "include" : G.crossOrigin === "anonymous" ? E.credentials = "omit" : E.credentials = "same-origin", E;
    }
    function o(G) {
      if (G.ep) return;
      G.ep = true;
      const E = g(G);
      fetch(G.href, E);
    }
  })();
  function q0(u) {
    return u && u.__esModule && Object.prototype.hasOwnProperty.call(u, "default") ? u.default : u;
  }
  var Kh = { exports: {} };
  var Ul = {};
  var $d;
  function P0() {
    if ($d) return Ul;
    $d = 1;
    var u = Symbol.for("react.transitional.element"), O = Symbol.for("react.fragment");
    function g(o, G, E) {
      var R = null;
      if (E !== void 0 && (R = "" + E), G.key !== void 0 && (R = "" + G.key), "key" in G) {
        E = {};
        for (var Z in G) Z !== "key" && (E[Z] = G[Z]);
      } else E = G;
      return G = E.ref, { $$typeof: u, type: o, key: R, ref: G !== void 0 ? G : null, props: E };
    }
    return Ul.Fragment = O, Ul.jsx = g, Ul.jsxs = g, Ul;
  }
  var Fd;
  function U0() {
    return Fd || (Fd = 1, Kh.exports = P0()), Kh.exports;
  }
  var a = U0();
  var _h = { exports: {} };
  var at = {};
  var Wd;
  function Y0() {
    if (Wd) return at;
    Wd = 1;
    var u = Symbol.for("react.transitional.element"), O = Symbol.for("react.portal"), g = Symbol.for("react.fragment"), o = Symbol.for("react.strict_mode"), G = Symbol.for("react.profiler"), E = Symbol.for("react.consumer"), R = Symbol.for("react.context"), Z = Symbol.for("react.forward_ref"), D = Symbol.for("react.suspense"), H = Symbol.for("react.memo"), p = Symbol.for("react.lazy"), _ = Symbol.for("react.activity"), P = Symbol.iterator;
    function y(m) {
      return m === null || typeof m != "object" ? null : (m = P && m[P] || m["@@iterator"], typeof m == "function" ? m : null);
    }
    var j = { isMounted: function() {
      return false;
    }, enqueueForceUpdate: function() {
    }, enqueueReplaceState: function() {
    }, enqueueSetState: function() {
    } }, T = Object.assign, U = {};
    function nt(m, M, z) {
      this.props = m, this.context = M, this.refs = U, this.updater = z || j;
    }
    nt.prototype.isReactComponent = {}, nt.prototype.setState = function(m, M) {
      if (typeof m != "object" && typeof m != "function" && m != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
      this.updater.enqueueSetState(this, m, M, "setState");
    }, nt.prototype.forceUpdate = function(m) {
      this.updater.enqueueForceUpdate(this, m, "forceUpdate");
    };
    function ht() {
    }
    ht.prototype = nt.prototype;
    function B(m, M, z) {
      this.props = m, this.context = M, this.refs = U, this.updater = z || j;
    }
    var tt = B.prototype = new ht();
    tt.constructor = B, T(tt, nt.prototype), tt.isPureReactComponent = true;
    var gt = Array.isArray;
    function C() {
    }
    var L = { H: null, A: null, T: null, S: null }, Y = Object.prototype.hasOwnProperty;
    function Ct(m, M, z) {
      var q = z.ref;
      return { $$typeof: u, type: m, key: M, ref: q !== void 0 ? q : null, props: z };
    }
    function et(m, M) {
      return Ct(m.type, M, m.props);
    }
    function St(m) {
      return typeof m == "object" && m !== null && m.$$typeof === u;
    }
    function Ft(m) {
      var M = { "=": "=0", ":": "=2" };
      return "$" + m.replace(/[=:]/g, function(z) {
        return M[z];
      });
    }
    var ie = /\/+/g;
    function ae(m, M) {
      return typeof m == "object" && m !== null && m.key != null ? Ft("" + m.key) : M.toString(36);
    }
    function qt(m) {
      switch (m.status) {
        case "fulfilled":
          return m.value;
        case "rejected":
          throw m.reason;
        default:
          switch (typeof m.status == "string" ? m.then(C, C) : (m.status = "pending", m.then(function(M) {
            m.status === "pending" && (m.status = "fulfilled", m.value = M);
          }, function(M) {
            m.status === "pending" && (m.status = "rejected", m.reason = M);
          })), m.status) {
            case "fulfilled":
              return m.value;
            case "rejected":
              throw m.reason;
          }
      }
      throw m;
    }
    function k(m, M, z, q, $) {
      var I = typeof m;
      (I === "undefined" || I === "boolean") && (m = null);
      var lt = false;
      if (m === null) lt = true;
      else switch (I) {
        case "bigint":
        case "string":
        case "number":
          lt = true;
          break;
        case "object":
          switch (m.$$typeof) {
            case u:
            case O:
              lt = true;
              break;
            case p:
              return lt = m._init, k(lt(m._payload), M, z, q, $);
          }
      }
      if (lt) return $ = $(m), lt = q === "" ? "." + ae(m, 0) : q, gt($) ? (z = "", lt != null && (z = lt.replace(ie, "$&/") + "/"), k($, M, z, "", function(se) {
        return se;
      })) : $ != null && (St($) && ($ = et($, z + ($.key == null || m && m.key === $.key ? "" : ("" + $.key).replace(ie, "$&/") + "/") + lt)), M.push($)), 1;
      lt = 0;
      var kt = q === "" ? "." : q + ":";
      if (gt(m)) for (var vt = 0; vt < m.length; vt++) q = m[vt], I = kt + ae(q, vt), lt += k(q, M, z, I, $);
      else if (vt = y(m), typeof vt == "function") for (m = vt.call(m), vt = 0; !(q = m.next()).done; ) q = q.value, I = kt + ae(q, vt++), lt += k(q, M, z, I, $);
      else if (I === "object") {
        if (typeof m.then == "function") return k(qt(m), M, z, q, $);
        throw M = String(m), Error("Objects are not valid as a React child (found: " + (M === "[object Object]" ? "object with keys {" + Object.keys(m).join(", ") + "}" : M) + "). If you meant to render a collection of children, use an array instead.");
      }
      return lt;
    }
    function K(m, M, z) {
      if (m == null) return m;
      var q = [], $ = 0;
      return k(m, q, "", "", function(I) {
        return M.call(z, I, $++);
      }), q;
    }
    function F(m) {
      if (m._status === -1) {
        var M = m._result;
        M = M(), M.then(function(z) {
          (m._status === 0 || m._status === -1) && (m._status = 1, m._result = z);
        }, function(z) {
          (m._status === 0 || m._status === -1) && (m._status = 2, m._result = z);
        }), m._status === -1 && (m._status = 0, m._result = M);
      }
      if (m._status === 1) return m._result.default;
      throw m._result;
    }
    var xt = typeof reportError == "function" ? reportError : function(m) {
      if (typeof window == "object" && typeof window.ErrorEvent == "function") {
        var M = new window.ErrorEvent("error", { bubbles: true, cancelable: true, message: typeof m == "object" && m !== null && typeof m.message == "string" ? String(m.message) : String(m), error: m });
        if (!window.dispatchEvent(M)) return;
      } else if (typeof process == "object" && typeof process.emit == "function") {
        process.emit("uncaughtException", m);
        return;
      }
      console.error(m);
    }, pt = { map: K, forEach: function(m, M, z) {
      K(m, function() {
        M.apply(this, arguments);
      }, z);
    }, count: function(m) {
      var M = 0;
      return K(m, function() {
        M++;
      }), M;
    }, toArray: function(m) {
      return K(m, function(M) {
        return M;
      }) || [];
    }, only: function(m) {
      if (!St(m)) throw Error("React.Children.only expected to receive a single React element child.");
      return m;
    } };
    return at.Activity = _, at.Children = pt, at.Component = nt, at.Fragment = g, at.Profiler = G, at.PureComponent = B, at.StrictMode = o, at.Suspense = D, at.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = L, at.__COMPILER_RUNTIME = { __proto__: null, c: function(m) {
      return L.H.useMemoCache(m);
    } }, at.cache = function(m) {
      return function() {
        return m.apply(null, arguments);
      };
    }, at.cacheSignal = function() {
      return null;
    }, at.cloneElement = function(m, M, z) {
      if (m == null) throw Error("The argument must be a React element, but you passed " + m + ".");
      var q = T({}, m.props), $ = m.key;
      if (M != null) for (I in M.key !== void 0 && ($ = "" + M.key), M) !Y.call(M, I) || I === "key" || I === "__self" || I === "__source" || I === "ref" && M.ref === void 0 || (q[I] = M[I]);
      var I = arguments.length - 2;
      if (I === 1) q.children = z;
      else if (1 < I) {
        for (var lt = Array(I), kt = 0; kt < I; kt++) lt[kt] = arguments[kt + 2];
        q.children = lt;
      }
      return Ct(m.type, $, q);
    }, at.createContext = function(m) {
      return m = { $$typeof: R, _currentValue: m, _currentValue2: m, _threadCount: 0, Provider: null, Consumer: null }, m.Provider = m, m.Consumer = { $$typeof: E, _context: m }, m;
    }, at.createElement = function(m, M, z) {
      var q, $ = {}, I = null;
      if (M != null) for (q in M.key !== void 0 && (I = "" + M.key), M) Y.call(M, q) && q !== "key" && q !== "__self" && q !== "__source" && ($[q] = M[q]);
      var lt = arguments.length - 2;
      if (lt === 1) $.children = z;
      else if (1 < lt) {
        for (var kt = Array(lt), vt = 0; vt < lt; vt++) kt[vt] = arguments[vt + 2];
        $.children = kt;
      }
      if (m && m.defaultProps) for (q in lt = m.defaultProps, lt) $[q] === void 0 && ($[q] = lt[q]);
      return Ct(m, I, $);
    }, at.createRef = function() {
      return { current: null };
    }, at.forwardRef = function(m) {
      return { $$typeof: Z, render: m };
    }, at.isValidElement = St, at.lazy = function(m) {
      return { $$typeof: p, _payload: { _status: -1, _result: m }, _init: F };
    }, at.memo = function(m, M) {
      return { $$typeof: H, type: m, compare: M === void 0 ? null : M };
    }, at.startTransition = function(m) {
      var M = L.T, z = {};
      L.T = z;
      try {
        var q = m(), $ = L.S;
        $ !== null && $(z, q), typeof q == "object" && q !== null && typeof q.then == "function" && q.then(C, xt);
      } catch (I) {
        xt(I);
      } finally {
        M !== null && z.types !== null && (M.types = z.types), L.T = M;
      }
    }, at.unstable_useCacheRefresh = function() {
      return L.H.useCacheRefresh();
    }, at.use = function(m) {
      return L.H.use(m);
    }, at.useActionState = function(m, M, z) {
      return L.H.useActionState(m, M, z);
    }, at.useCallback = function(m, M) {
      return L.H.useCallback(m, M);
    }, at.useContext = function(m) {
      return L.H.useContext(m);
    }, at.useDebugValue = function() {
    }, at.useDeferredValue = function(m, M) {
      return L.H.useDeferredValue(m, M);
    }, at.useEffect = function(m, M) {
      return L.H.useEffect(m, M);
    }, at.useEffectEvent = function(m) {
      return L.H.useEffectEvent(m);
    }, at.useId = function() {
      return L.H.useId();
    }, at.useImperativeHandle = function(m, M, z) {
      return L.H.useImperativeHandle(m, M, z);
    }, at.useInsertionEffect = function(m, M) {
      return L.H.useInsertionEffect(m, M);
    }, at.useLayoutEffect = function(m, M) {
      return L.H.useLayoutEffect(m, M);
    }, at.useMemo = function(m, M) {
      return L.H.useMemo(m, M);
    }, at.useOptimistic = function(m, M) {
      return L.H.useOptimistic(m, M);
    }, at.useReducer = function(m, M, z) {
      return L.H.useReducer(m, M, z);
    }, at.useRef = function(m) {
      return L.H.useRef(m);
    }, at.useState = function(m) {
      return L.H.useState(m);
    }, at.useSyncExternalStore = function(m, M, z) {
      return L.H.useSyncExternalStore(m, M, z);
    }, at.useTransition = function() {
      return L.H.useTransition();
    }, at.version = "19.2.8", at;
  }
  var Id;
  function Zh() {
    return Id || (Id = 1, _h.exports = Y0()), _h.exports;
  }
  var Q = Zh();
  var Uh = q0(Q);
  var zh = { exports: {} };
  var Yl = {};
  var Rh = { exports: {} };
  var qh = {};
  var tm;
  function V0() {
    return tm || (tm = 1, (function(u) {
      function O(k, K) {
        var F = k.length;
        k.push(K);
        t: for (; 0 < F; ) {
          var xt = F - 1 >>> 1, pt = k[xt];
          if (0 < G(pt, K)) k[xt] = K, k[F] = pt, F = xt;
          else break t;
        }
      }
      function g(k) {
        return k.length === 0 ? null : k[0];
      }
      function o(k) {
        if (k.length === 0) return null;
        var K = k[0], F = k.pop();
        if (F !== K) {
          k[0] = F;
          t: for (var xt = 0, pt = k.length, m = pt >>> 1; xt < m; ) {
            var M = 2 * (xt + 1) - 1, z = k[M], q = M + 1, $ = k[q];
            if (0 > G(z, F)) q < pt && 0 > G($, z) ? (k[xt] = $, k[q] = F, xt = q) : (k[xt] = z, k[M] = F, xt = M);
            else if (q < pt && 0 > G($, F)) k[xt] = $, k[q] = F, xt = q;
            else break t;
          }
        }
        return K;
      }
      function G(k, K) {
        var F = k.sortIndex - K.sortIndex;
        return F !== 0 ? F : k.id - K.id;
      }
      if (u.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
        var E = performance;
        u.unstable_now = function() {
          return E.now();
        };
      } else {
        var R = Date, Z = R.now();
        u.unstable_now = function() {
          return R.now() - Z;
        };
      }
      var D = [], H = [], p = 1, _ = null, P = 3, y = false, j = false, T = false, U = false, nt = typeof setTimeout == "function" ? setTimeout : null, ht = typeof clearTimeout == "function" ? clearTimeout : null, B = typeof setImmediate < "u" ? setImmediate : null;
      function tt(k) {
        for (var K = g(H); K !== null; ) {
          if (K.callback === null) o(H);
          else if (K.startTime <= k) o(H), K.sortIndex = K.expirationTime, O(D, K);
          else break;
          K = g(H);
        }
      }
      function gt(k) {
        if (T = false, tt(k), !j) if (g(D) !== null) j = true, C || (C = true, Ft());
        else {
          var K = g(H);
          K !== null && qt(gt, K.startTime - k);
        }
      }
      var C = false, L = -1, Y = 5, Ct = -1;
      function et() {
        return U ? true : !(u.unstable_now() - Ct < Y);
      }
      function St() {
        if (U = false, C) {
          var k = u.unstable_now();
          Ct = k;
          var K = true;
          try {
            t: {
              j = false, T && (T = false, ht(L), L = -1), y = true;
              var F = P;
              try {
                e: {
                  for (tt(k), _ = g(D); _ !== null && !(_.expirationTime > k && et()); ) {
                    var xt = _.callback;
                    if (typeof xt == "function") {
                      _.callback = null, P = _.priorityLevel;
                      var pt = xt(_.expirationTime <= k);
                      if (k = u.unstable_now(), typeof pt == "function") {
                        _.callback = pt, tt(k), K = true;
                        break e;
                      }
                      _ === g(D) && o(D), tt(k);
                    } else o(D);
                    _ = g(D);
                  }
                  if (_ !== null) K = true;
                  else {
                    var m = g(H);
                    m !== null && qt(gt, m.startTime - k), K = false;
                  }
                }
                break t;
              } finally {
                _ = null, P = F, y = false;
              }
              K = void 0;
            }
          } finally {
            K ? Ft() : C = false;
          }
        }
      }
      var Ft;
      if (typeof B == "function") Ft = function() {
        B(St);
      };
      else if (typeof MessageChannel < "u") {
        var ie = new MessageChannel(), ae = ie.port2;
        ie.port1.onmessage = St, Ft = function() {
          ae.postMessage(null);
        };
      } else Ft = function() {
        nt(St, 0);
      };
      function qt(k, K) {
        L = nt(function() {
          k(u.unstable_now());
        }, K);
      }
      u.unstable_IdlePriority = 5, u.unstable_ImmediatePriority = 1, u.unstable_LowPriority = 4, u.unstable_NormalPriority = 3, u.unstable_Profiling = null, u.unstable_UserBlockingPriority = 2, u.unstable_cancelCallback = function(k) {
        k.callback = null;
      }, u.unstable_forceFrameRate = function(k) {
        0 > k || 125 < k ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : Y = 0 < k ? Math.floor(1e3 / k) : 5;
      }, u.unstable_getCurrentPriorityLevel = function() {
        return P;
      }, u.unstable_next = function(k) {
        switch (P) {
          case 1:
          case 2:
          case 3:
            var K = 3;
            break;
          default:
            K = P;
        }
        var F = P;
        P = K;
        try {
          return k();
        } finally {
          P = F;
        }
      }, u.unstable_requestPaint = function() {
        U = true;
      }, u.unstable_runWithPriority = function(k, K) {
        switch (k) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            k = 3;
        }
        var F = P;
        P = k;
        try {
          return K();
        } finally {
          P = F;
        }
      }, u.unstable_scheduleCallback = function(k, K, F) {
        var xt = u.unstable_now();
        switch (typeof F == "object" && F !== null ? (F = F.delay, F = typeof F == "number" && 0 < F ? xt + F : xt) : F = xt, k) {
          case 1:
            var pt = -1;
            break;
          case 2:
            pt = 250;
            break;
          case 5:
            pt = 1073741823;
            break;
          case 4:
            pt = 1e4;
            break;
          default:
            pt = 5e3;
        }
        return pt = F + pt, k = { id: p++, callback: K, priorityLevel: k, startTime: F, expirationTime: pt, sortIndex: -1 }, F > xt ? (k.sortIndex = F, O(H, k), g(D) === null && k === g(H) && (T ? (ht(L), L = -1) : T = true, qt(gt, F - xt))) : (k.sortIndex = pt, O(D, k), j || y || (j = true, C || (C = true, Ft()))), k;
      }, u.unstable_shouldYield = et, u.unstable_wrapCallback = function(k) {
        var K = P;
        return function() {
          var F = P;
          P = K;
          try {
            return k.apply(this, arguments);
          } finally {
            P = F;
          }
        };
      };
    })(qh)), qh;
  }
  var em;
  function X0() {
    return em || (em = 1, Rh.exports = V0()), Rh.exports;
  }
  var Ph = { exports: {} };
  var le = {};
  var nm;
  function Q0() {
    if (nm) return le;
    nm = 1;
    var u = Zh();
    function O(D) {
      var H = "https://react.dev/errors/" + D;
      if (1 < arguments.length) {
        H += "?args[]=" + encodeURIComponent(arguments[1]);
        for (var p = 2; p < arguments.length; p++) H += "&args[]=" + encodeURIComponent(arguments[p]);
      }
      return "Minified React error #" + D + "; visit " + H + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
    }
    function g() {
    }
    var o = { d: { f: g, r: function() {
      throw Error(O(522));
    }, D: g, C: g, L: g, m: g, X: g, S: g, M: g }, p: 0, findDOMNode: null }, G = Symbol.for("react.portal");
    function E(D, H, p) {
      var _ = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
      return { $$typeof: G, key: _ == null ? null : "" + _, children: D, containerInfo: H, implementation: p };
    }
    var R = u.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    function Z(D, H) {
      if (D === "font") return "";
      if (typeof H == "string") return H === "use-credentials" ? H : "";
    }
    return le.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o, le.createPortal = function(D, H) {
      var p = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!H || H.nodeType !== 1 && H.nodeType !== 9 && H.nodeType !== 11) throw Error(O(299));
      return E(D, H, null, p);
    }, le.flushSync = function(D) {
      var H = R.T, p = o.p;
      try {
        if (R.T = null, o.p = 2, D) return D();
      } finally {
        R.T = H, o.p = p, o.d.f();
      }
    }, le.preconnect = function(D, H) {
      typeof D == "string" && (H ? (H = H.crossOrigin, H = typeof H == "string" ? H === "use-credentials" ? H : "" : void 0) : H = null, o.d.C(D, H));
    }, le.prefetchDNS = function(D) {
      typeof D == "string" && o.d.D(D);
    }, le.preinit = function(D, H) {
      if (typeof D == "string" && H && typeof H.as == "string") {
        var p = H.as, _ = Z(p, H.crossOrigin), P = typeof H.integrity == "string" ? H.integrity : void 0, y = typeof H.fetchPriority == "string" ? H.fetchPriority : void 0;
        p === "style" ? o.d.S(D, typeof H.precedence == "string" ? H.precedence : void 0, { crossOrigin: _, integrity: P, fetchPriority: y }) : p === "script" && o.d.X(D, { crossOrigin: _, integrity: P, fetchPriority: y, nonce: typeof H.nonce == "string" ? H.nonce : void 0 });
      }
    }, le.preinitModule = function(D, H) {
      if (typeof D == "string") if (typeof H == "object" && H !== null) {
        if (H.as == null || H.as === "script") {
          var p = Z(H.as, H.crossOrigin);
          o.d.M(D, { crossOrigin: p, integrity: typeof H.integrity == "string" ? H.integrity : void 0, nonce: typeof H.nonce == "string" ? H.nonce : void 0 });
        }
      } else H == null && o.d.M(D);
    }, le.preload = function(D, H) {
      if (typeof D == "string" && typeof H == "object" && H !== null && typeof H.as == "string") {
        var p = H.as, _ = Z(p, H.crossOrigin);
        o.d.L(D, p, { crossOrigin: _, integrity: typeof H.integrity == "string" ? H.integrity : void 0, nonce: typeof H.nonce == "string" ? H.nonce : void 0, type: typeof H.type == "string" ? H.type : void 0, fetchPriority: typeof H.fetchPriority == "string" ? H.fetchPriority : void 0, referrerPolicy: typeof H.referrerPolicy == "string" ? H.referrerPolicy : void 0, imageSrcSet: typeof H.imageSrcSet == "string" ? H.imageSrcSet : void 0, imageSizes: typeof H.imageSizes == "string" ? H.imageSizes : void 0, media: typeof H.media == "string" ? H.media : void 0 });
      }
    }, le.preloadModule = function(D, H) {
      if (typeof D == "string") if (H) {
        var p = Z(H.as, H.crossOrigin);
        o.d.m(D, { as: typeof H.as == "string" && H.as !== "script" ? H.as : void 0, crossOrigin: p, integrity: typeof H.integrity == "string" ? H.integrity : void 0 });
      } else o.d.m(D);
    }, le.requestFormReset = function(D) {
      o.d.r(D);
    }, le.unstable_batchedUpdates = function(D, H) {
      return D(H);
    }, le.useFormState = function(D, H, p) {
      return R.H.useFormState(D, H, p);
    }, le.useFormStatus = function() {
      return R.H.useHostTransitionStatus();
    }, le.version = "19.2.8", le;
  }
  var am;
  function Z0() {
    if (am) return Ph.exports;
    am = 1;
    function u() {
      if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(u);
      } catch (O) {
        console.error(O);
      }
    }
    return u(), Ph.exports = Q0(), Ph.exports;
  }
  var lm;
  function J0() {
    if (lm) return Yl;
    lm = 1;
    var u = X0(), O = Zh(), g = Z0();
    function o(t) {
      var e = "https://react.dev/errors/" + t;
      if (1 < arguments.length) {
        e += "?args[]=" + encodeURIComponent(arguments[1]);
        for (var n = 2; n < arguments.length; n++) e += "&args[]=" + encodeURIComponent(arguments[n]);
      }
      return "Minified React error #" + t + "; visit " + e + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
    }
    function G(t) {
      return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
    }
    function E(t) {
      var e = t, n = t;
      if (t.alternate) for (; e.return; ) e = e.return;
      else {
        t = e;
        do
          e = t, (e.flags & 4098) !== 0 && (n = e.return), t = e.return;
        while (t);
      }
      return e.tag === 3 ? n : null;
    }
    function R(t) {
      if (t.tag === 13) {
        var e = t.memoizedState;
        if (e === null && (t = t.alternate, t !== null && (e = t.memoizedState)), e !== null) return e.dehydrated;
      }
      return null;
    }
    function Z(t) {
      if (t.tag === 31) {
        var e = t.memoizedState;
        if (e === null && (t = t.alternate, t !== null && (e = t.memoizedState)), e !== null) return e.dehydrated;
      }
      return null;
    }
    function D(t) {
      if (E(t) !== t) throw Error(o(188));
    }
    function H(t) {
      var e = t.alternate;
      if (!e) {
        if (e = E(t), e === null) throw Error(o(188));
        return e !== t ? null : t;
      }
      for (var n = t, l = e; ; ) {
        var i = n.return;
        if (i === null) break;
        var s = i.alternate;
        if (s === null) {
          if (l = i.return, l !== null) {
            n = l;
            continue;
          }
          break;
        }
        if (i.child === s.child) {
          for (s = i.child; s; ) {
            if (s === n) return D(i), t;
            if (s === l) return D(i), e;
            s = s.sibling;
          }
          throw Error(o(188));
        }
        if (n.return !== l.return) n = i, l = s;
        else {
          for (var c = false, h = i.child; h; ) {
            if (h === n) {
              c = true, n = i, l = s;
              break;
            }
            if (h === l) {
              c = true, l = i, n = s;
              break;
            }
            h = h.sibling;
          }
          if (!c) {
            for (h = s.child; h; ) {
              if (h === n) {
                c = true, n = s, l = i;
                break;
              }
              if (h === l) {
                c = true, l = s, n = i;
                break;
              }
              h = h.sibling;
            }
            if (!c) throw Error(o(189));
          }
        }
        if (n.alternate !== l) throw Error(o(190));
      }
      if (n.tag !== 3) throw Error(o(188));
      return n.stateNode.current === n ? t : e;
    }
    function p(t) {
      var e = t.tag;
      if (e === 5 || e === 26 || e === 27 || e === 6) return t;
      for (t = t.child; t !== null; ) {
        if (e = p(t), e !== null) return e;
        t = t.sibling;
      }
      return null;
    }
    var _ = Object.assign, P = Symbol.for("react.element"), y = Symbol.for("react.transitional.element"), j = Symbol.for("react.portal"), T = Symbol.for("react.fragment"), U = Symbol.for("react.strict_mode"), nt = Symbol.for("react.profiler"), ht = Symbol.for("react.consumer"), B = Symbol.for("react.context"), tt = Symbol.for("react.forward_ref"), gt = Symbol.for("react.suspense"), C = Symbol.for("react.suspense_list"), L = Symbol.for("react.memo"), Y = Symbol.for("react.lazy"), Ct = Symbol.for("react.activity"), et = Symbol.for("react.memo_cache_sentinel"), St = Symbol.iterator;
    function Ft(t) {
      return t === null || typeof t != "object" ? null : (t = St && t[St] || t["@@iterator"], typeof t == "function" ? t : null);
    }
    var ie = Symbol.for("react.client.reference");
    function ae(t) {
      if (t == null) return null;
      if (typeof t == "function") return t.$$typeof === ie ? null : t.displayName || t.name || null;
      if (typeof t == "string") return t;
      switch (t) {
        case T:
          return "Fragment";
        case nt:
          return "Profiler";
        case U:
          return "StrictMode";
        case gt:
          return "Suspense";
        case C:
          return "SuspenseList";
        case Ct:
          return "Activity";
      }
      if (typeof t == "object") switch (t.$$typeof) {
        case j:
          return "Portal";
        case B:
          return t.displayName || "Context";
        case ht:
          return (t._context.displayName || "Context") + ".Consumer";
        case tt:
          var e = t.render;
          return t = t.displayName, t || (t = e.displayName || e.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case L:
          return e = t.displayName || null, e !== null ? e : ae(t.type) || "Memo";
        case Y:
          e = t._payload, t = t._init;
          try {
            return ae(t(e));
          } catch {
          }
      }
      return null;
    }
    var qt = Array.isArray, k = O.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, K = g.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, F = { pending: false, data: null, method: null, action: null }, xt = [], pt = -1;
    function m(t) {
      return { current: t };
    }
    function M(t) {
      0 > pt || (t.current = xt[pt], xt[pt] = null, pt--);
    }
    function z(t, e) {
      pt++, xt[pt] = t.current, t.current = e;
    }
    var q = m(null), $ = m(null), I = m(null), lt = m(null);
    function kt(t, e) {
      switch (z(I, e), z($, t), z(q, null), e.nodeType) {
        case 9:
        case 11:
          t = (t = e.documentElement) && (t = t.namespaceURI) ? yd(t) : 0;
          break;
        default:
          if (t = e.tagName, e = e.namespaceURI) e = yd(e), t = vd(e, t);
          else switch (t) {
            case "svg":
              t = 1;
              break;
            case "math":
              t = 2;
              break;
            default:
              t = 0;
          }
      }
      M(q), z(q, t);
    }
    function vt() {
      M(q), M($), M(I);
    }
    function se(t) {
      t.memoizedState !== null && z(lt, t);
      var e = q.current, n = vd(e, t.type);
      e !== n && (z($, t), z(q, n));
    }
    function re(t) {
      $.current === t && (M(q), M($)), lt.current === t && (M(lt), zl._currentValue = F);
    }
    var Ue, oa;
    function Zt(t) {
      if (Ue === void 0) try {
        throw Error();
      } catch (n) {
        var e = n.stack.trim().match(/\n( *(at )?)/);
        Ue = e && e[1] || "", oa = -1 < n.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < n.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
      return `
` + Ue + t + oa;
    }
    var Pt = false;
    function wt(t, e) {
      if (!t || Pt) return "";
      Pt = true;
      var n = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      try {
        var l = { DetermineComponentFrameRoot: function() {
          try {
            if (e) {
              var w = function() {
                throw Error();
              };
              if (Object.defineProperty(w.prototype, "props", { set: function() {
                throw Error();
              } }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(w, []);
                } catch (N) {
                  var v = N;
                }
                Reflect.construct(t, [], w);
              } else {
                try {
                  w.call();
                } catch (N) {
                  v = N;
                }
                t.call(w.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (N) {
                v = N;
              }
              (w = t()) && typeof w.catch == "function" && w.catch(function() {
              });
            }
          } catch (N) {
            if (N && v && typeof N.stack == "string") return [N.stack, v.stack];
          }
          return [null, null];
        } };
        l.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
        var i = Object.getOwnPropertyDescriptor(l.DetermineComponentFrameRoot, "name");
        i && i.configurable && Object.defineProperty(l.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
        var s = l.DetermineComponentFrameRoot(), c = s[0], h = s[1];
        if (c && h) {
          var r = c.split(`
`), f = h.split(`
`);
          for (i = l = 0; l < r.length && !r[l].includes("DetermineComponentFrameRoot"); ) l++;
          for (; i < f.length && !f[i].includes("DetermineComponentFrameRoot"); ) i++;
          if (l === r.length || i === f.length) for (l = r.length - 1, i = f.length - 1; 1 <= l && 0 <= i && r[l] !== f[i]; ) i--;
          for (; 1 <= l && 0 <= i; l--, i--) if (r[l] !== f[i]) {
            if (l !== 1 || i !== 1) do
              if (l--, i--, 0 > i || r[l] !== f[i]) {
                var A = `
` + r[l].replace(" at new ", " at ");
                return t.displayName && A.includes("<anonymous>") && (A = A.replace("<anonymous>", t.displayName)), A;
              }
            while (1 <= l && 0 <= i);
            break;
          }
        }
      } finally {
        Pt = false, Error.prepareStackTrace = n;
      }
      return (n = t ? t.displayName || t.name : "") ? Zt(n) : "";
    }
    function Dt(t, e) {
      switch (t.tag) {
        case 26:
        case 27:
        case 5:
          return Zt(t.type);
        case 16:
          return Zt("Lazy");
        case 13:
          return t.child !== e && e !== null ? Zt("Suspense Fallback") : Zt("Suspense");
        case 19:
          return Zt("SuspenseList");
        case 0:
        case 15:
          return wt(t.type, false);
        case 11:
          return wt(t.type.render, false);
        case 1:
          return wt(t.type, true);
        case 31:
          return Zt("Activity");
        default:
          return "";
      }
    }
    function Lt(t) {
      try {
        var e = "", n = null;
        do
          e += Dt(t, n), n = t, t = t.return;
        while (t);
        return e;
      } catch (l) {
        return `
Error generating stack: ` + l.message + `
` + l.stack;
      }
    }
    var ce = Object.prototype.hasOwnProperty, fe = u.unstable_scheduleCallback, Ye = u.unstable_cancelCallback, Cs = u.unstable_shouldYield, _e = u.unstable_requestPaint, he = u.unstable_now, Hs = u.unstable_getCurrentPriorityLevel, Pn = u.unstable_ImmediatePriority, $a = u.unstable_UserBlockingPriority, Jl = u.unstable_NormalPriority, jm = u.unstable_LowPriority, Wh = u.unstable_IdlePriority, Cm = u.log, Hm = u.unstable_setDisableYieldValue, Fa = null, ye = null;
    function bn(t) {
      if (typeof Cm == "function" && Hm(t), ye && typeof ye.setStrictMode == "function") try {
        ye.setStrictMode(Fa, t);
      } catch {
      }
    }
    var ve = Math.clz32 ? Math.clz32 : km, Tm = Math.log, Om = Math.LN2;
    function km(t) {
      return t >>>= 0, t === 0 ? 32 : 31 - (Tm(t) / Om | 0) | 0;
    }
    var $l = 256, Fl = 262144, Wl = 4194304;
    function Un(t) {
      var e = t & 42;
      if (e !== 0) return e;
      switch (t & -t) {
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
          return t & 261888;
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return t & 3932160;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          return t & 62914560;
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
          return t;
      }
    }
    function Il(t, e, n) {
      var l = t.pendingLanes;
      if (l === 0) return 0;
      var i = 0, s = t.suspendedLanes, c = t.pingedLanes;
      t = t.warmLanes;
      var h = l & 134217727;
      return h !== 0 ? (l = h & ~s, l !== 0 ? i = Un(l) : (c &= h, c !== 0 ? i = Un(c) : n || (n = h & ~t, n !== 0 && (i = Un(n))))) : (h = l & ~s, h !== 0 ? i = Un(h) : c !== 0 ? i = Un(c) : n || (n = l & ~t, n !== 0 && (i = Un(n)))), i === 0 ? 0 : e !== 0 && e !== i && (e & s) === 0 && (s = i & -i, n = e & -e, s >= n || s === 32 && (n & 4194048) !== 0) ? e : i;
    }
    function Wa(t, e) {
      return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
    }
    function Am(t, e) {
      switch (t) {
        case 1:
        case 2:
        case 4:
        case 8:
        case 64:
          return e + 250;
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
          return e + 5e3;
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
    function Ih() {
      var t = Wl;
      return Wl <<= 1, (Wl & 62914560) === 0 && (Wl = 4194304), t;
    }
    function Ts(t) {
      for (var e = [], n = 0; 31 > n; n++) e.push(t);
      return e;
    }
    function Ia(t, e) {
      t.pendingLanes |= e, e !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
    }
    function Sm(t, e, n, l, i, s) {
      var c = t.pendingLanes;
      t.pendingLanes = n, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= n, t.entangledLanes &= n, t.errorRecoveryDisabledLanes &= n, t.shellSuspendCounter = 0;
      var h = t.entanglements, r = t.expirationTimes, f = t.hiddenUpdates;
      for (n = c & ~n; 0 < n; ) {
        var A = 31 - ve(n), w = 1 << A;
        h[A] = 0, r[A] = -1;
        var v = f[A];
        if (v !== null) for (f[A] = null, A = 0; A < v.length; A++) {
          var N = v[A];
          N !== null && (N.lane &= -536870913);
        }
        n &= ~w;
      }
      l !== 0 && to(t, l, 0), s !== 0 && i === 0 && t.tag !== 0 && (t.suspendedLanes |= s & ~(c & ~e));
    }
    function to(t, e, n) {
      t.pendingLanes |= e, t.suspendedLanes &= ~e;
      var l = 31 - ve(e);
      t.entangledLanes |= e, t.entanglements[l] = t.entanglements[l] | 1073741824 | n & 261930;
    }
    function eo(t, e) {
      var n = t.entangledLanes |= e;
      for (t = t.entanglements; n; ) {
        var l = 31 - ve(n), i = 1 << l;
        i & e | t[l] & e && (t[l] |= e), n &= ~i;
      }
    }
    function no(t, e) {
      var n = e & -e;
      return n = (n & 42) !== 0 ? 1 : Os(n), (n & (t.suspendedLanes | e)) !== 0 ? 0 : n;
    }
    function Os(t) {
      switch (t) {
        case 2:
          t = 1;
          break;
        case 8:
          t = 4;
          break;
        case 32:
          t = 16;
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
          t = 128;
          break;
        case 268435456:
          t = 134217728;
          break;
        default:
          t = 0;
      }
      return t;
    }
    function ks(t) {
      return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
    }
    function ao() {
      var t = K.p;
      return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : Ud(t.type));
    }
    function lo(t, e) {
      var n = K.p;
      try {
        return K.p = t, e();
      } finally {
        K.p = n;
      }
    }
    var fn = Math.random().toString(36).slice(2), Wt = "__reactFiber$" + fn, ue = "__reactProps$" + fn, ra = "__reactContainer$" + fn, As = "__reactEvents$" + fn, wm = "__reactListeners$" + fn, Mm = "__reactHandles$" + fn, io = "__reactResources$" + fn, tl = "__reactMarker$" + fn;
    function Ss(t) {
      delete t[Wt], delete t[ue], delete t[As], delete t[wm], delete t[Mm];
    }
    function ua(t) {
      var e = t[Wt];
      if (e) return e;
      for (var n = t.parentNode; n; ) {
        if (e = n[ra] || n[Wt]) {
          if (n = e.alternate, e.child !== null || n !== null && n.child !== null) for (t = kd(t); t !== null; ) {
            if (n = t[Wt]) return n;
            t = kd(t);
          }
          return e;
        }
        t = n, n = t.parentNode;
      }
      return null;
    }
    function da(t) {
      if (t = t[Wt] || t[ra]) {
        var e = t.tag;
        if (e === 5 || e === 6 || e === 13 || e === 31 || e === 26 || e === 27 || e === 3) return t;
      }
      return null;
    }
    function el(t) {
      var e = t.tag;
      if (e === 5 || e === 26 || e === 27 || e === 6) return t.stateNode;
      throw Error(o(33));
    }
    function ma(t) {
      var e = t[io];
      return e || (e = t[io] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), e;
    }
    function Jt(t) {
      t[tl] = true;
    }
    var so = /* @__PURE__ */ new Set(), co = {};
    function Yn(t, e) {
      ga(t, e), ga(t + "Capture", e);
    }
    function ga(t, e) {
      for (co[t] = e, t = 0; t < e.length; t++) so.add(e[t]);
    }
    var Bm = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), ho = {}, oo = {};
    function Gm(t) {
      return ce.call(oo, t) ? true : ce.call(ho, t) ? false : Bm.test(t) ? oo[t] = true : (ho[t] = true, false);
    }
    function ti(t, e, n) {
      if (Gm(e)) if (n === null) t.removeAttribute(e);
      else {
        switch (typeof n) {
          case "undefined":
          case "function":
          case "symbol":
            t.removeAttribute(e);
            return;
          case "boolean":
            var l = e.toLowerCase().slice(0, 5);
            if (l !== "data-" && l !== "aria-") {
              t.removeAttribute(e);
              return;
            }
        }
        t.setAttribute(e, "" + n);
      }
    }
    function ei(t, e, n) {
      if (n === null) t.removeAttribute(e);
      else {
        switch (typeof n) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            t.removeAttribute(e);
            return;
        }
        t.setAttribute(e, "" + n);
      }
    }
    function $e(t, e, n, l) {
      if (l === null) t.removeAttribute(n);
      else {
        switch (typeof l) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            t.removeAttribute(n);
            return;
        }
        t.setAttributeNS(e, n, "" + l);
      }
    }
    function Ae(t) {
      switch (typeof t) {
        case "bigint":
        case "boolean":
        case "number":
        case "string":
        case "undefined":
          return t;
        case "object":
          return t;
        default:
          return "";
      }
    }
    function ro(t) {
      var e = t.type;
      return (t = t.nodeName) && t.toLowerCase() === "input" && (e === "checkbox" || e === "radio");
    }
    function Em(t, e, n) {
      var l = Object.getOwnPropertyDescriptor(t.constructor.prototype, e);
      if (!t.hasOwnProperty(e) && typeof l < "u" && typeof l.get == "function" && typeof l.set == "function") {
        var i = l.get, s = l.set;
        return Object.defineProperty(t, e, { configurable: true, get: function() {
          return i.call(this);
        }, set: function(c) {
          n = "" + c, s.call(this, c);
        } }), Object.defineProperty(t, e, { enumerable: l.enumerable }), { getValue: function() {
          return n;
        }, setValue: function(c) {
          n = "" + c;
        }, stopTracking: function() {
          t._valueTracker = null, delete t[e];
        } };
      }
    }
    function ws(t) {
      if (!t._valueTracker) {
        var e = ro(t) ? "checked" : "value";
        t._valueTracker = Em(t, e, "" + t[e]);
      }
    }
    function uo(t) {
      if (!t) return false;
      var e = t._valueTracker;
      if (!e) return true;
      var n = e.getValue(), l = "";
      return t && (l = ro(t) ? t.checked ? "true" : "false" : t.value), t = l, t !== n ? (e.setValue(t), true) : false;
    }
    function ni(t) {
      if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
      try {
        return t.activeElement || t.body;
      } catch {
        return t.body;
      }
    }
    var Dm = /[\n"\\]/g;
    function Se(t) {
      return t.replace(Dm, function(e) {
        return "\\" + e.charCodeAt(0).toString(16) + " ";
      });
    }
    function Ms(t, e, n, l, i, s, c, h) {
      t.name = "", c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" ? t.type = c : t.removeAttribute("type"), e != null ? c === "number" ? (e === 0 && t.value === "" || t.value != e) && (t.value = "" + Ae(e)) : t.value !== "" + Ae(e) && (t.value = "" + Ae(e)) : c !== "submit" && c !== "reset" || t.removeAttribute("value"), e != null ? Bs(t, c, Ae(e)) : n != null ? Bs(t, c, Ae(n)) : l != null && t.removeAttribute("value"), i == null && s != null && (t.defaultChecked = !!s), i != null && (t.checked = i && typeof i != "function" && typeof i != "symbol"), h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" ? t.name = "" + Ae(h) : t.removeAttribute("name");
    }
    function mo(t, e, n, l, i, s, c, h) {
      if (s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" && (t.type = s), e != null || n != null) {
        if (!(s !== "submit" && s !== "reset" || e != null)) {
          ws(t);
          return;
        }
        n = n != null ? "" + Ae(n) : "", e = e != null ? "" + Ae(e) : n, h || e === t.value || (t.value = e), t.defaultValue = e;
      }
      l = l ?? i, l = typeof l != "function" && typeof l != "symbol" && !!l, t.checked = h ? t.checked : !!l, t.defaultChecked = !!l, c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" && (t.name = c), ws(t);
    }
    function Bs(t, e, n) {
      e === "number" && ni(t.ownerDocument) === t || t.defaultValue === "" + n || (t.defaultValue = "" + n);
    }
    function xa(t, e, n, l) {
      if (t = t.options, e) {
        e = {};
        for (var i = 0; i < n.length; i++) e["$" + n[i]] = true;
        for (n = 0; n < t.length; n++) i = e.hasOwnProperty("$" + t[n].value), t[n].selected !== i && (t[n].selected = i), i && l && (t[n].defaultSelected = true);
      } else {
        for (n = "" + Ae(n), e = null, i = 0; i < t.length; i++) {
          if (t[i].value === n) {
            t[i].selected = true, l && (t[i].defaultSelected = true);
            return;
          }
          e !== null || t[i].disabled || (e = t[i]);
        }
        e !== null && (e.selected = true);
      }
    }
    function go(t, e, n) {
      if (e != null && (e = "" + Ae(e), e !== t.value && (t.value = e), n == null)) {
        t.defaultValue !== e && (t.defaultValue = e);
        return;
      }
      t.defaultValue = n != null ? "" + Ae(n) : "";
    }
    function xo(t, e, n, l) {
      if (e == null) {
        if (l != null) {
          if (n != null) throw Error(o(92));
          if (qt(l)) {
            if (1 < l.length) throw Error(o(93));
            l = l[0];
          }
          n = l;
        }
        n == null && (n = ""), e = n;
      }
      n = Ae(e), t.defaultValue = n, l = t.textContent, l === n && l !== "" && l !== null && (t.value = l), ws(t);
    }
    function pa(t, e) {
      if (e) {
        var n = t.firstChild;
        if (n && n === t.lastChild && n.nodeType === 3) {
          n.nodeValue = e;
          return;
        }
      }
      t.textContent = e;
    }
    var Lm = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
    function po(t, e, n) {
      var l = e.indexOf("--") === 0;
      n == null || typeof n == "boolean" || n === "" ? l ? t.setProperty(e, "") : e === "float" ? t.cssFloat = "" : t[e] = "" : l ? t.setProperty(e, n) : typeof n != "number" || n === 0 || Lm.has(e) ? e === "float" ? t.cssFloat = n : t[e] = ("" + n).trim() : t[e] = n + "px";
    }
    function bo(t, e, n) {
      if (e != null && typeof e != "object") throw Error(o(62));
      if (t = t.style, n != null) {
        for (var l in n) !n.hasOwnProperty(l) || e != null && e.hasOwnProperty(l) || (l.indexOf("--") === 0 ? t.setProperty(l, "") : l === "float" ? t.cssFloat = "" : t[l] = "");
        for (var i in e) l = e[i], e.hasOwnProperty(i) && n[i] !== l && po(t, i, l);
      } else for (var s in e) e.hasOwnProperty(s) && po(t, s, e[s]);
    }
    function Gs(t) {
      if (t.indexOf("-") === -1) return false;
      switch (t) {
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
    var Km = /* @__PURE__ */ new Map([["acceptCharset", "accept-charset"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"], ["crossOrigin", "crossorigin"], ["accentHeight", "accent-height"], ["alignmentBaseline", "alignment-baseline"], ["arabicForm", "arabic-form"], ["baselineShift", "baseline-shift"], ["capHeight", "cap-height"], ["clipPath", "clip-path"], ["clipRule", "clip-rule"], ["colorInterpolation", "color-interpolation"], ["colorInterpolationFilters", "color-interpolation-filters"], ["colorProfile", "color-profile"], ["colorRendering", "color-rendering"], ["dominantBaseline", "dominant-baseline"], ["enableBackground", "enable-background"], ["fillOpacity", "fill-opacity"], ["fillRule", "fill-rule"], ["floodColor", "flood-color"], ["floodOpacity", "flood-opacity"], ["fontFamily", "font-family"], ["fontSize", "font-size"], ["fontSizeAdjust", "font-size-adjust"], ["fontStretch", "font-stretch"], ["fontStyle", "font-style"], ["fontVariant", "font-variant"], ["fontWeight", "font-weight"], ["glyphName", "glyph-name"], ["glyphOrientationHorizontal", "glyph-orientation-horizontal"], ["glyphOrientationVertical", "glyph-orientation-vertical"], ["horizAdvX", "horiz-adv-x"], ["horizOriginX", "horiz-origin-x"], ["imageRendering", "image-rendering"], ["letterSpacing", "letter-spacing"], ["lightingColor", "lighting-color"], ["markerEnd", "marker-end"], ["markerMid", "marker-mid"], ["markerStart", "marker-start"], ["overlinePosition", "overline-position"], ["overlineThickness", "overline-thickness"], ["paintOrder", "paint-order"], ["panose-1", "panose-1"], ["pointerEvents", "pointer-events"], ["renderingIntent", "rendering-intent"], ["shapeRendering", "shape-rendering"], ["stopColor", "stop-color"], ["stopOpacity", "stop-opacity"], ["strikethroughPosition", "strikethrough-position"], ["strikethroughThickness", "strikethrough-thickness"], ["strokeDasharray", "stroke-dasharray"], ["strokeDashoffset", "stroke-dashoffset"], ["strokeLinecap", "stroke-linecap"], ["strokeLinejoin", "stroke-linejoin"], ["strokeMiterlimit", "stroke-miterlimit"], ["strokeOpacity", "stroke-opacity"], ["strokeWidth", "stroke-width"], ["textAnchor", "text-anchor"], ["textDecoration", "text-decoration"], ["textRendering", "text-rendering"], ["transformOrigin", "transform-origin"], ["underlinePosition", "underline-position"], ["underlineThickness", "underline-thickness"], ["unicodeBidi", "unicode-bidi"], ["unicodeRange", "unicode-range"], ["unitsPerEm", "units-per-em"], ["vAlphabetic", "v-alphabetic"], ["vHanging", "v-hanging"], ["vIdeographic", "v-ideographic"], ["vMathematical", "v-mathematical"], ["vectorEffect", "vector-effect"], ["vertAdvY", "vert-adv-y"], ["vertOriginX", "vert-origin-x"], ["vertOriginY", "vert-origin-y"], ["wordSpacing", "word-spacing"], ["writingMode", "writing-mode"], ["xmlnsXlink", "xmlns:xlink"], ["xHeight", "x-height"]]), _m = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
    function ai(t) {
      return _m.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
    }
    function Fe() {
    }
    var Es = null;
    function Ds(t) {
      return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
    }
    var ba = null, fa = null;
    function fo(t) {
      var e = da(t);
      if (e && (t = e.stateNode)) {
        var n = t[ue] || null;
        t: switch (t = e.stateNode, e.type) {
          case "input":
            if (Ms(t, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), e = n.name, n.type === "radio" && e != null) {
              for (n = t; n.parentNode; ) n = n.parentNode;
              for (n = n.querySelectorAll('input[name="' + Se("" + e) + '"][type="radio"]'), e = 0; e < n.length; e++) {
                var l = n[e];
                if (l !== t && l.form === t.form) {
                  var i = l[ue] || null;
                  if (!i) throw Error(o(90));
                  Ms(l, i.value, i.defaultValue, i.defaultValue, i.checked, i.defaultChecked, i.type, i.name);
                }
              }
              for (e = 0; e < n.length; e++) l = n[e], l.form === t.form && uo(l);
            }
            break t;
          case "textarea":
            go(t, n.value, n.defaultValue);
            break t;
          case "select":
            e = n.value, e != null && xa(t, !!n.multiple, e, false);
        }
      }
    }
    var Ls = false;
    function yo(t, e, n) {
      if (Ls) return t(e, n);
      Ls = true;
      try {
        var l = t(e);
        return l;
      } finally {
        if (Ls = false, (ba !== null || fa !== null) && (Yi(), ba && (e = ba, t = fa, fa = ba = null, fo(e), t))) for (e = 0; e < t.length; e++) fo(t[e]);
      }
    }
    function nl(t, e) {
      var n = t.stateNode;
      if (n === null) return null;
      var l = n[ue] || null;
      if (l === null) return null;
      n = l[e];
      t: switch (e) {
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
          (l = !l.disabled) || (t = t.type, l = !(t === "button" || t === "input" || t === "select" || t === "textarea")), t = !l;
          break t;
        default:
          t = false;
      }
      if (t) return null;
      if (n && typeof n != "function") throw Error(o(231, e, typeof n));
      return n;
    }
    var We = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Ks = false;
    if (We) try {
      var al = {};
      Object.defineProperty(al, "passive", { get: function() {
        Ks = true;
      } }), window.addEventListener("test", al, al), window.removeEventListener("test", al, al);
    } catch {
      Ks = false;
    }
    var yn = null, _s = null, li = null;
    function vo() {
      if (li) return li;
      var t, e = _s, n = e.length, l, i = "value" in yn ? yn.value : yn.textContent, s = i.length;
      for (t = 0; t < n && e[t] === i[t]; t++) ;
      var c = n - t;
      for (l = 1; l <= c && e[n - l] === i[s - l]; l++) ;
      return li = i.slice(t, 1 < l ? 1 - l : void 0);
    }
    function ii(t) {
      var e = t.keyCode;
      return "charCode" in t ? (t = t.charCode, t === 0 && e === 13 && (t = 13)) : t = e, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
    }
    function si() {
      return true;
    }
    function No() {
      return false;
    }
    function de(t) {
      function e(n, l, i, s, c) {
        this._reactName = n, this._targetInst = i, this.type = l, this.nativeEvent = s, this.target = c, this.currentTarget = null;
        for (var h in t) t.hasOwnProperty(h) && (n = t[h], this[h] = n ? n(s) : s[h]);
        return this.isDefaultPrevented = (s.defaultPrevented != null ? s.defaultPrevented : s.returnValue === false) ? si : No, this.isPropagationStopped = No, this;
      }
      return _(e.prototype, { preventDefault: function() {
        this.defaultPrevented = true;
        var n = this.nativeEvent;
        n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = false), this.isDefaultPrevented = si);
      }, stopPropagation: function() {
        var n = this.nativeEvent;
        n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = true), this.isPropagationStopped = si);
      }, persist: function() {
      }, isPersistent: si }), e;
    }
    var Vn = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(t) {
      return t.timeStamp || Date.now();
    }, defaultPrevented: 0, isTrusted: 0 }, ci = de(Vn), ll = _({}, Vn, { view: 0, detail: 0 }), zm = de(ll), zs, Rs, il, hi = _({}, ll, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Ps, button: 0, buttons: 0, relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    }, movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== il && (il && t.type === "mousemove" ? (zs = t.screenX - il.screenX, Rs = t.screenY - il.screenY) : Rs = zs = 0, il = t), zs);
    }, movementY: function(t) {
      return "movementY" in t ? t.movementY : Rs;
    } }), jo = de(hi), Rm = _({}, hi, { dataTransfer: 0 }), qm = de(Rm), Pm = _({}, ll, { relatedTarget: 0 }), qs = de(Pm), Um = _({}, Vn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Ym = de(Um), Vm = _({}, Vn, { clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    } }), Xm = de(Vm), Qm = _({}, Vn, { data: 0 }), Co = de(Qm), Zm = { Esc: "Escape", Spacebar: " ", Left: "ArrowLeft", Up: "ArrowUp", Right: "ArrowRight", Down: "ArrowDown", Del: "Delete", Win: "OS", Menu: "ContextMenu", Apps: "ContextMenu", Scroll: "ScrollLock", MozPrintableKey: "Unidentified" }, Jm = { 8: "Backspace", 9: "Tab", 12: "Clear", 13: "Enter", 16: "Shift", 17: "Control", 18: "Alt", 19: "Pause", 20: "CapsLock", 27: "Escape", 32: " ", 33: "PageUp", 34: "PageDown", 35: "End", 36: "Home", 37: "ArrowLeft", 38: "ArrowUp", 39: "ArrowRight", 40: "ArrowDown", 45: "Insert", 46: "Delete", 112: "F1", 113: "F2", 114: "F3", 115: "F4", 116: "F5", 117: "F6", 118: "F7", 119: "F8", 120: "F9", 121: "F10", 122: "F11", 123: "F12", 144: "NumLock", 145: "ScrollLock", 224: "Meta" }, $m = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
    function Fm(t) {
      var e = this.nativeEvent;
      return e.getModifierState ? e.getModifierState(t) : (t = $m[t]) ? !!e[t] : false;
    }
    function Ps() {
      return Fm;
    }
    var Wm = _({}, ll, { key: function(t) {
      if (t.key) {
        var e = Zm[t.key] || t.key;
        if (e !== "Unidentified") return e;
      }
      return t.type === "keypress" ? (t = ii(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? Jm[t.keyCode] || "Unidentified" : "";
    }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Ps, charCode: function(t) {
      return t.type === "keypress" ? ii(t) : 0;
    }, keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }, which: function(t) {
      return t.type === "keypress" ? ii(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    } }), Im = de(Wm), tg = _({}, hi, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Ho = de(tg), eg = _({}, ll, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Ps }), ng = de(eg), ag = _({}, Vn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), lg = de(ag), ig = _({}, hi, { deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    }, deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    }, deltaZ: 0, deltaMode: 0 }), sg = de(ig), cg = _({}, Vn, { newState: 0, oldState: 0 }), hg = de(cg), og = [9, 13, 27, 32], Us = We && "CompositionEvent" in window, sl = null;
    We && "documentMode" in document && (sl = document.documentMode);
    var rg = We && "TextEvent" in window && !sl, To = We && (!Us || sl && 8 < sl && 11 >= sl), Oo = " ", ko = false;
    function Ao(t, e) {
      switch (t) {
        case "keyup":
          return og.indexOf(e.keyCode) !== -1;
        case "keydown":
          return e.keyCode !== 229;
        case "keypress":
        case "mousedown":
        case "focusout":
          return true;
        default:
          return false;
      }
    }
    function So(t) {
      return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
    }
    var ya = false;
    function ug(t, e) {
      switch (t) {
        case "compositionend":
          return So(e);
        case "keypress":
          return e.which !== 32 ? null : (ko = true, Oo);
        case "textInput":
          return t = e.data, t === Oo && ko ? null : t;
        default:
          return null;
      }
    }
    function dg(t, e) {
      if (ya) return t === "compositionend" || !Us && Ao(t, e) ? (t = vo(), li = _s = yn = null, ya = false, t) : null;
      switch (t) {
        case "paste":
          return null;
        case "keypress":
          if (!(e.ctrlKey || e.altKey || e.metaKey) || e.ctrlKey && e.altKey) {
            if (e.char && 1 < e.char.length) return e.char;
            if (e.which) return String.fromCharCode(e.which);
          }
          return null;
        case "compositionend":
          return To && e.locale !== "ko" ? null : e.data;
        default:
          return null;
      }
    }
    var mg = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
    function wo(t) {
      var e = t && t.nodeName && t.nodeName.toLowerCase();
      return e === "input" ? !!mg[t.type] : e === "textarea";
    }
    function Mo(t, e, n, l) {
      ba ? fa ? fa.push(l) : fa = [l] : ba = l, e = Fi(e, "onChange"), 0 < e.length && (n = new ci("onChange", "change", null, n, l), t.push({ event: n, listeners: e }));
    }
    var cl = null, hl = null;
    function gg(t) {
      md(t, 0);
    }
    function oi(t) {
      var e = el(t);
      if (uo(e)) return t;
    }
    function Bo(t, e) {
      if (t === "change") return e;
    }
    var Go = false;
    if (We) {
      var Ys;
      if (We) {
        var Vs = "oninput" in document;
        if (!Vs) {
          var Eo = document.createElement("div");
          Eo.setAttribute("oninput", "return;"), Vs = typeof Eo.oninput == "function";
        }
        Ys = Vs;
      } else Ys = false;
      Go = Ys && (!document.documentMode || 9 < document.documentMode);
    }
    function Do() {
      cl && (cl.detachEvent("onpropertychange", Lo), hl = cl = null);
    }
    function Lo(t) {
      if (t.propertyName === "value" && oi(hl)) {
        var e = [];
        Mo(e, hl, t, Ds(t)), yo(gg, e);
      }
    }
    function xg(t, e, n) {
      t === "focusin" ? (Do(), cl = e, hl = n, cl.attachEvent("onpropertychange", Lo)) : t === "focusout" && Do();
    }
    function pg(t) {
      if (t === "selectionchange" || t === "keyup" || t === "keydown") return oi(hl);
    }
    function bg(t, e) {
      if (t === "click") return oi(e);
    }
    function fg(t, e) {
      if (t === "input" || t === "change") return oi(e);
    }
    function yg(t, e) {
      return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
    }
    var Ne = typeof Object.is == "function" ? Object.is : yg;
    function ol(t, e) {
      if (Ne(t, e)) return true;
      if (typeof t != "object" || t === null || typeof e != "object" || e === null) return false;
      var n = Object.keys(t), l = Object.keys(e);
      if (n.length !== l.length) return false;
      for (l = 0; l < n.length; l++) {
        var i = n[l];
        if (!ce.call(e, i) || !Ne(t[i], e[i])) return false;
      }
      return true;
    }
    function Ko(t) {
      for (; t && t.firstChild; ) t = t.firstChild;
      return t;
    }
    function _o(t, e) {
      var n = Ko(t);
      t = 0;
      for (var l; n; ) {
        if (n.nodeType === 3) {
          if (l = t + n.textContent.length, t <= e && l >= e) return { node: n, offset: e - t };
          t = l;
        }
        t: {
          for (; n; ) {
            if (n.nextSibling) {
              n = n.nextSibling;
              break t;
            }
            n = n.parentNode;
          }
          n = void 0;
        }
        n = Ko(n);
      }
    }
    function zo(t, e) {
      return t && e ? t === e ? true : t && t.nodeType === 3 ? false : e && e.nodeType === 3 ? zo(t, e.parentNode) : "contains" in t ? t.contains(e) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(e) & 16) : false : false;
    }
    function Ro(t) {
      t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
      for (var e = ni(t.document); e instanceof t.HTMLIFrameElement; ) {
        try {
          var n = typeof e.contentWindow.location.href == "string";
        } catch {
          n = false;
        }
        if (n) t = e.contentWindow;
        else break;
        e = ni(t.document);
      }
      return e;
    }
    function Xs(t) {
      var e = t && t.nodeName && t.nodeName.toLowerCase();
      return e && (e === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || e === "textarea" || t.contentEditable === "true");
    }
    var vg = We && "documentMode" in document && 11 >= document.documentMode, va = null, Qs = null, rl = null, Zs = false;
    function qo(t, e, n) {
      var l = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
      Zs || va == null || va !== ni(l) || (l = va, "selectionStart" in l && Xs(l) ? l = { start: l.selectionStart, end: l.selectionEnd } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(), l = { anchorNode: l.anchorNode, anchorOffset: l.anchorOffset, focusNode: l.focusNode, focusOffset: l.focusOffset }), rl && ol(rl, l) || (rl = l, l = Fi(Qs, "onSelect"), 0 < l.length && (e = new ci("onSelect", "select", null, e, n), t.push({ event: e, listeners: l }), e.target = va)));
    }
    function Xn(t, e) {
      var n = {};
      return n[t.toLowerCase()] = e.toLowerCase(), n["Webkit" + t] = "webkit" + e, n["Moz" + t] = "moz" + e, n;
    }
    var Na = { animationend: Xn("Animation", "AnimationEnd"), animationiteration: Xn("Animation", "AnimationIteration"), animationstart: Xn("Animation", "AnimationStart"), transitionrun: Xn("Transition", "TransitionRun"), transitionstart: Xn("Transition", "TransitionStart"), transitioncancel: Xn("Transition", "TransitionCancel"), transitionend: Xn("Transition", "TransitionEnd") }, Js = {}, Po = {};
    We && (Po = document.createElement("div").style, "AnimationEvent" in window || (delete Na.animationend.animation, delete Na.animationiteration.animation, delete Na.animationstart.animation), "TransitionEvent" in window || delete Na.transitionend.transition);
    function Qn(t) {
      if (Js[t]) return Js[t];
      if (!Na[t]) return t;
      var e = Na[t], n;
      for (n in e) if (e.hasOwnProperty(n) && n in Po) return Js[t] = e[n];
      return t;
    }
    var Uo = Qn("animationend"), Yo = Qn("animationiteration"), Vo = Qn("animationstart"), Ng = Qn("transitionrun"), jg = Qn("transitionstart"), Cg = Qn("transitioncancel"), Xo = Qn("transitionend"), Qo = /* @__PURE__ */ new Map(), $s = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
    $s.push("scrollEnd");
    function ze(t, e) {
      Qo.set(t, e), Yn(e, [t]);
    }
    var ri = typeof reportError == "function" ? reportError : function(t) {
      if (typeof window == "object" && typeof window.ErrorEvent == "function") {
        var e = new window.ErrorEvent("error", { bubbles: true, cancelable: true, message: typeof t == "object" && t !== null && typeof t.message == "string" ? String(t.message) : String(t), error: t });
        if (!window.dispatchEvent(e)) return;
      } else if (typeof process == "object" && typeof process.emit == "function") {
        process.emit("uncaughtException", t);
        return;
      }
      console.error(t);
    }, we = [], ja = 0, Fs = 0;
    function ui() {
      for (var t = ja, e = Fs = ja = 0; e < t; ) {
        var n = we[e];
        we[e++] = null;
        var l = we[e];
        we[e++] = null;
        var i = we[e];
        we[e++] = null;
        var s = we[e];
        if (we[e++] = null, l !== null && i !== null) {
          var c = l.pending;
          c === null ? i.next = i : (i.next = c.next, c.next = i), l.pending = i;
        }
        s !== 0 && Zo(n, i, s);
      }
    }
    function di(t, e, n, l) {
      we[ja++] = t, we[ja++] = e, we[ja++] = n, we[ja++] = l, Fs |= l, t.lanes |= l, t = t.alternate, t !== null && (t.lanes |= l);
    }
    function Ws(t, e, n, l) {
      return di(t, e, n, l), mi(t);
    }
    function Zn(t, e) {
      return di(t, null, null, e), mi(t);
    }
    function Zo(t, e, n) {
      t.lanes |= n;
      var l = t.alternate;
      l !== null && (l.lanes |= n);
      for (var i = false, s = t.return; s !== null; ) s.childLanes |= n, l = s.alternate, l !== null && (l.childLanes |= n), s.tag === 22 && (t = s.stateNode, t === null || t._visibility & 1 || (i = true)), t = s, s = s.return;
      return t.tag === 3 ? (s = t.stateNode, i && e !== null && (i = 31 - ve(n), t = s.hiddenUpdates, l = t[i], l === null ? t[i] = [e] : l.push(e), e.lane = n | 536870912), s) : null;
    }
    function mi(t) {
      if (50 < Bl) throw Bl = 0, ch = null, Error(o(185));
      for (var e = t.return; e !== null; ) t = e, e = t.return;
      return t.tag === 3 ? t.stateNode : null;
    }
    var Ca = {};
    function Hg(t, e, n, l) {
      this.tag = t, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = e, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
    }
    function je(t, e, n, l) {
      return new Hg(t, e, n, l);
    }
    function Is(t) {
      return t = t.prototype, !(!t || !t.isReactComponent);
    }
    function Ie(t, e) {
      var n = t.alternate;
      return n === null ? (n = je(t.tag, e, t.key, t.mode), n.elementType = t.elementType, n.type = t.type, n.stateNode = t.stateNode, n.alternate = t, t.alternate = n) : (n.pendingProps = e, n.type = t.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = t.flags & 65011712, n.childLanes = t.childLanes, n.lanes = t.lanes, n.child = t.child, n.memoizedProps = t.memoizedProps, n.memoizedState = t.memoizedState, n.updateQueue = t.updateQueue, e = t.dependencies, n.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }, n.sibling = t.sibling, n.index = t.index, n.ref = t.ref, n.refCleanup = t.refCleanup, n;
    }
    function Jo(t, e) {
      t.flags &= 65011714;
      var n = t.alternate;
      return n === null ? (t.childLanes = 0, t.lanes = e, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = n.childLanes, t.lanes = n.lanes, t.child = n.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = n.memoizedProps, t.memoizedState = n.memoizedState, t.updateQueue = n.updateQueue, t.type = n.type, e = n.dependencies, t.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), t;
    }
    function gi(t, e, n, l, i, s) {
      var c = 0;
      if (l = t, typeof t == "function") Is(t) && (c = 1);
      else if (typeof t == "string") c = S0(t, n, q.current) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
      else t: switch (t) {
        case Ct:
          return t = je(31, n, e, i), t.elementType = Ct, t.lanes = s, t;
        case T:
          return Jn(n.children, i, s, e);
        case U:
          c = 8, i |= 24;
          break;
        case nt:
          return t = je(12, n, e, i | 2), t.elementType = nt, t.lanes = s, t;
        case gt:
          return t = je(13, n, e, i), t.elementType = gt, t.lanes = s, t;
        case C:
          return t = je(19, n, e, i), t.elementType = C, t.lanes = s, t;
        default:
          if (typeof t == "object" && t !== null) switch (t.$$typeof) {
            case B:
              c = 10;
              break t;
            case ht:
              c = 9;
              break t;
            case tt:
              c = 11;
              break t;
            case L:
              c = 14;
              break t;
            case Y:
              c = 16, l = null;
              break t;
          }
          c = 29, n = Error(o(130, t === null ? "null" : typeof t, "")), l = null;
      }
      return e = je(c, n, e, i), e.elementType = t, e.type = l, e.lanes = s, e;
    }
    function Jn(t, e, n, l) {
      return t = je(7, t, l, e), t.lanes = n, t;
    }
    function tc(t, e, n) {
      return t = je(6, t, null, e), t.lanes = n, t;
    }
    function $o(t) {
      var e = je(18, null, null, 0);
      return e.stateNode = t, e;
    }
    function ec(t, e, n) {
      return e = je(4, t.children !== null ? t.children : [], t.key, e), e.lanes = n, e.stateNode = { containerInfo: t.containerInfo, pendingChildren: null, implementation: t.implementation }, e;
    }
    var Fo = /* @__PURE__ */ new WeakMap();
    function Me(t, e) {
      if (typeof t == "object" && t !== null) {
        var n = Fo.get(t);
        return n !== void 0 ? n : (e = { value: t, source: e, stack: Lt(e) }, Fo.set(t, e), e);
      }
      return { value: t, source: e, stack: Lt(e) };
    }
    var Ha = [], Ta = 0, xi = null, ul = 0, Be = [], Ge = 0, vn = null, Ve = 1, Xe = "";
    function tn(t, e) {
      Ha[Ta++] = ul, Ha[Ta++] = xi, xi = t, ul = e;
    }
    function Wo(t, e, n) {
      Be[Ge++] = Ve, Be[Ge++] = Xe, Be[Ge++] = vn, vn = t;
      var l = Ve;
      t = Xe;
      var i = 32 - ve(l) - 1;
      l &= ~(1 << i), n += 1;
      var s = 32 - ve(e) + i;
      if (30 < s) {
        var c = i - i % 5;
        s = (l & (1 << c) - 1).toString(32), l >>= c, i -= c, Ve = 1 << 32 - ve(e) + i | n << i | l, Xe = s + t;
      } else Ve = 1 << s | n << i | l, Xe = t;
    }
    function nc(t) {
      t.return !== null && (tn(t, 1), Wo(t, 1, 0));
    }
    function ac(t) {
      for (; t === xi; ) xi = Ha[--Ta], Ha[Ta] = null, ul = Ha[--Ta], Ha[Ta] = null;
      for (; t === vn; ) vn = Be[--Ge], Be[Ge] = null, Xe = Be[--Ge], Be[Ge] = null, Ve = Be[--Ge], Be[Ge] = null;
    }
    function Io(t, e) {
      Be[Ge++] = Ve, Be[Ge++] = Xe, Be[Ge++] = vn, Ve = e.id, Xe = e.overflow, vn = t;
    }
    var It = null, Mt = null, mt = false, Nn = null, Ee = false, lc = Error(o(519));
    function jn(t) {
      var e = Error(o(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", ""));
      throw dl(Me(e, t)), lc;
    }
    function tr(t) {
      var e = t.stateNode, n = t.type, l = t.memoizedProps;
      switch (e[Wt] = t, e[ue] = l, n) {
        case "dialog":
          rt("cancel", e), rt("close", e);
          break;
        case "iframe":
        case "object":
        case "embed":
          rt("load", e);
          break;
        case "video":
        case "audio":
          for (n = 0; n < El.length; n++) rt(El[n], e);
          break;
        case "source":
          rt("error", e);
          break;
        case "img":
        case "image":
        case "link":
          rt("error", e), rt("load", e);
          break;
        case "details":
          rt("toggle", e);
          break;
        case "input":
          rt("invalid", e), mo(e, l.value, l.defaultValue, l.checked, l.defaultChecked, l.type, l.name, true);
          break;
        case "select":
          rt("invalid", e);
          break;
        case "textarea":
          rt("invalid", e), xo(e, l.value, l.defaultValue, l.children);
      }
      n = l.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || e.textContent === "" + n || l.suppressHydrationWarning === true || bd(e.textContent, n) ? (l.popover != null && (rt("beforetoggle", e), rt("toggle", e)), l.onScroll != null && rt("scroll", e), l.onScrollEnd != null && rt("scrollend", e), l.onClick != null && (e.onclick = Fe), e = true) : e = false, e || jn(t, true);
    }
    function er(t) {
      for (It = t.return; It; ) switch (It.tag) {
        case 5:
        case 31:
        case 13:
          Ee = false;
          return;
        case 27:
        case 3:
          Ee = true;
          return;
        default:
          It = It.return;
      }
    }
    function Oa(t) {
      if (t !== It) return false;
      if (!mt) return er(t), mt = true, false;
      var e = t.tag, n;
      if ((n = e !== 3 && e !== 27) && ((n = e === 5) && (n = t.type, n = !(n !== "form" && n !== "button") || jh(t.type, t.memoizedProps)), n = !n), n && Mt && jn(t), er(t), e === 13) {
        if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(o(317));
        Mt = Od(t);
      } else if (e === 31) {
        if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(o(317));
        Mt = Od(t);
      } else e === 27 ? (e = Mt, Ln(t.type) ? (t = kh, kh = null, Mt = t) : Mt = e) : Mt = It ? Le(t.stateNode.nextSibling) : null;
      return true;
    }
    function $n() {
      Mt = It = null, mt = false;
    }
    function ic() {
      var t = Nn;
      return t !== null && (pe === null ? pe = t : pe.push.apply(pe, t), Nn = null), t;
    }
    function dl(t) {
      Nn === null ? Nn = [t] : Nn.push(t);
    }
    var sc = m(null), Fn = null, en = null;
    function Cn(t, e, n) {
      z(sc, e._currentValue), e._currentValue = n;
    }
    function nn(t) {
      t._currentValue = sc.current, M(sc);
    }
    function cc(t, e, n) {
      for (; t !== null; ) {
        var l = t.alternate;
        if ((t.childLanes & e) !== e ? (t.childLanes |= e, l !== null && (l.childLanes |= e)) : l !== null && (l.childLanes & e) !== e && (l.childLanes |= e), t === n) break;
        t = t.return;
      }
    }
    function hc(t, e, n, l) {
      var i = t.child;
      for (i !== null && (i.return = t); i !== null; ) {
        var s = i.dependencies;
        if (s !== null) {
          var c = i.child;
          s = s.firstContext;
          t: for (; s !== null; ) {
            var h = s;
            s = i;
            for (var r = 0; r < e.length; r++) if (h.context === e[r]) {
              s.lanes |= n, h = s.alternate, h !== null && (h.lanes |= n), cc(s.return, n, t), l || (c = null);
              break t;
            }
            s = h.next;
          }
        } else if (i.tag === 18) {
          if (c = i.return, c === null) throw Error(o(341));
          c.lanes |= n, s = c.alternate, s !== null && (s.lanes |= n), cc(c, n, t), c = null;
        } else c = i.child;
        if (c !== null) c.return = i;
        else for (c = i; c !== null; ) {
          if (c === t) {
            c = null;
            break;
          }
          if (i = c.sibling, i !== null) {
            i.return = c.return, c = i;
            break;
          }
          c = c.return;
        }
        i = c;
      }
    }
    function ka(t, e, n, l) {
      t = null;
      for (var i = e, s = false; i !== null; ) {
        if (!s) {
          if ((i.flags & 524288) !== 0) s = true;
          else if ((i.flags & 262144) !== 0) break;
        }
        if (i.tag === 10) {
          var c = i.alternate;
          if (c === null) throw Error(o(387));
          if (c = c.memoizedProps, c !== null) {
            var h = i.type;
            Ne(i.pendingProps.value, c.value) || (t !== null ? t.push(h) : t = [h]);
          }
        } else if (i === lt.current) {
          if (c = i.alternate, c === null) throw Error(o(387));
          c.memoizedState.memoizedState !== i.memoizedState.memoizedState && (t !== null ? t.push(zl) : t = [zl]);
        }
        i = i.return;
      }
      t !== null && hc(e, t, n, l), e.flags |= 262144;
    }
    function pi(t) {
      for (t = t.firstContext; t !== null; ) {
        if (!Ne(t.context._currentValue, t.memoizedValue)) return true;
        t = t.next;
      }
      return false;
    }
    function Wn(t) {
      Fn = t, en = null, t = t.dependencies, t !== null && (t.firstContext = null);
    }
    function te(t) {
      return nr(Fn, t);
    }
    function bi(t, e) {
      return Fn === null && Wn(t), nr(t, e);
    }
    function nr(t, e) {
      var n = e._currentValue;
      if (e = { context: e, memoizedValue: n, next: null }, en === null) {
        if (t === null) throw Error(o(308));
        en = e, t.dependencies = { lanes: 0, firstContext: e }, t.flags |= 524288;
      } else en = en.next = e;
      return n;
    }
    var Tg = typeof AbortController < "u" ? AbortController : function() {
      var t = [], e = this.signal = { aborted: false, addEventListener: function(n, l) {
        t.push(l);
      } };
      this.abort = function() {
        e.aborted = true, t.forEach(function(n) {
          return n();
        });
      };
    }, Og = u.unstable_scheduleCallback, kg = u.unstable_NormalPriority, Ut = { $$typeof: B, Consumer: null, Provider: null, _currentValue: null, _currentValue2: null, _threadCount: 0 };
    function oc() {
      return { controller: new Tg(), data: /* @__PURE__ */ new Map(), refCount: 0 };
    }
    function ml(t) {
      t.refCount--, t.refCount === 0 && Og(kg, function() {
        t.controller.abort();
      });
    }
    var gl = null, rc = 0, Aa = 0, Sa = null;
    function Ag(t, e) {
      if (gl === null) {
        var n = gl = [];
        rc = 0, Aa = mh(), Sa = { status: "pending", value: void 0, then: function(l) {
          n.push(l);
        } };
      }
      return rc++, e.then(ar, ar), e;
    }
    function ar() {
      if (--rc === 0 && gl !== null) {
        Sa !== null && (Sa.status = "fulfilled");
        var t = gl;
        gl = null, Aa = 0, Sa = null;
        for (var e = 0; e < t.length; e++) (0, t[e])();
      }
    }
    function Sg(t, e) {
      var n = [], l = { status: "pending", value: null, reason: null, then: function(i) {
        n.push(i);
      } };
      return t.then(function() {
        l.status = "fulfilled", l.value = e;
        for (var i = 0; i < n.length; i++) (0, n[i])(e);
      }, function(i) {
        for (l.status = "rejected", l.reason = i, i = 0; i < n.length; i++) (0, n[i])(void 0);
      }), l;
    }
    var lr = k.S;
    k.S = function(t, e) {
      qu = he(), typeof e == "object" && e !== null && typeof e.then == "function" && Ag(t, e), lr !== null && lr(t, e);
    };
    var In = m(null);
    function uc() {
      var t = In.current;
      return t !== null ? t : At.pooledCache;
    }
    function fi(t, e) {
      e === null ? z(In, In.current) : z(In, e.pool);
    }
    function ir() {
      var t = uc();
      return t === null ? null : { parent: Ut._currentValue, pool: t };
    }
    var wa = Error(o(460)), dc = Error(o(474)), yi = Error(o(542)), vi = { then: function() {
    } };
    function sr(t) {
      return t = t.status, t === "fulfilled" || t === "rejected";
    }
    function cr(t, e, n) {
      switch (n = t[n], n === void 0 ? t.push(e) : n !== e && (e.then(Fe, Fe), e = n), e.status) {
        case "fulfilled":
          return e.value;
        case "rejected":
          throw t = e.reason, or(t), t;
        default:
          if (typeof e.status == "string") e.then(Fe, Fe);
          else {
            if (t = At, t !== null && 100 < t.shellSuspendCounter) throw Error(o(482));
            t = e, t.status = "pending", t.then(function(l) {
              if (e.status === "pending") {
                var i = e;
                i.status = "fulfilled", i.value = l;
              }
            }, function(l) {
              if (e.status === "pending") {
                var i = e;
                i.status = "rejected", i.reason = l;
              }
            });
          }
          switch (e.status) {
            case "fulfilled":
              return e.value;
            case "rejected":
              throw t = e.reason, or(t), t;
          }
          throw ea = e, wa;
      }
    }
    function ta(t) {
      try {
        var e = t._init;
        return e(t._payload);
      } catch (n) {
        throw n !== null && typeof n == "object" && typeof n.then == "function" ? (ea = n, wa) : n;
      }
    }
    var ea = null;
    function hr() {
      if (ea === null) throw Error(o(459));
      var t = ea;
      return ea = null, t;
    }
    function or(t) {
      if (t === wa || t === yi) throw Error(o(483));
    }
    var Ma = null, xl = 0;
    function Ni(t) {
      var e = xl;
      return xl += 1, Ma === null && (Ma = []), cr(Ma, t, e);
    }
    function pl(t, e) {
      e = e.props.ref, t.ref = e !== void 0 ? e : null;
    }
    function ji(t, e) {
      throw e.$$typeof === P ? Error(o(525)) : (t = Object.prototype.toString.call(e), Error(o(31, t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t)));
    }
    function rr(t) {
      function e(x, d) {
        if (t) {
          var b = x.deletions;
          b === null ? (x.deletions = [d], x.flags |= 16) : b.push(d);
        }
      }
      function n(x, d) {
        if (!t) return null;
        for (; d !== null; ) e(x, d), d = d.sibling;
        return null;
      }
      function l(x) {
        for (var d = /* @__PURE__ */ new Map(); x !== null; ) x.key !== null ? d.set(x.key, x) : d.set(x.index, x), x = x.sibling;
        return d;
      }
      function i(x, d) {
        return x = Ie(x, d), x.index = 0, x.sibling = null, x;
      }
      function s(x, d, b) {
        return x.index = b, t ? (b = x.alternate, b !== null ? (b = b.index, b < d ? (x.flags |= 67108866, d) : b) : (x.flags |= 67108866, d)) : (x.flags |= 1048576, d);
      }
      function c(x) {
        return t && x.alternate === null && (x.flags |= 67108866), x;
      }
      function h(x, d, b, S) {
        return d === null || d.tag !== 6 ? (d = tc(b, x.mode, S), d.return = x, d) : (d = i(d, b), d.return = x, d);
      }
      function r(x, d, b, S) {
        var J = b.type;
        return J === T ? A(x, d, b.props.children, S, b.key) : d !== null && (d.elementType === J || typeof J == "object" && J !== null && J.$$typeof === Y && ta(J) === d.type) ? (d = i(d, b.props), pl(d, b), d.return = x, d) : (d = gi(b.type, b.key, b.props, null, x.mode, S), pl(d, b), d.return = x, d);
      }
      function f(x, d, b, S) {
        return d === null || d.tag !== 4 || d.stateNode.containerInfo !== b.containerInfo || d.stateNode.implementation !== b.implementation ? (d = ec(b, x.mode, S), d.return = x, d) : (d = i(d, b.children || []), d.return = x, d);
      }
      function A(x, d, b, S, J) {
        return d === null || d.tag !== 7 ? (d = Jn(b, x.mode, S, J), d.return = x, d) : (d = i(d, b), d.return = x, d);
      }
      function w(x, d, b) {
        if (typeof d == "string" && d !== "" || typeof d == "number" || typeof d == "bigint") return d = tc("" + d, x.mode, b), d.return = x, d;
        if (typeof d == "object" && d !== null) {
          switch (d.$$typeof) {
            case y:
              return b = gi(d.type, d.key, d.props, null, x.mode, b), pl(b, d), b.return = x, b;
            case j:
              return d = ec(d, x.mode, b), d.return = x, d;
            case Y:
              return d = ta(d), w(x, d, b);
          }
          if (qt(d) || Ft(d)) return d = Jn(d, x.mode, b, null), d.return = x, d;
          if (typeof d.then == "function") return w(x, Ni(d), b);
          if (d.$$typeof === B) return w(x, bi(x, d), b);
          ji(x, d);
        }
        return null;
      }
      function v(x, d, b, S) {
        var J = d !== null ? d.key : null;
        if (typeof b == "string" && b !== "" || typeof b == "number" || typeof b == "bigint") return J !== null ? null : h(x, d, "" + b, S);
        if (typeof b == "object" && b !== null) {
          switch (b.$$typeof) {
            case y:
              return b.key === J ? r(x, d, b, S) : null;
            case j:
              return b.key === J ? f(x, d, b, S) : null;
            case Y:
              return b = ta(b), v(x, d, b, S);
          }
          if (qt(b) || Ft(b)) return J !== null ? null : A(x, d, b, S, null);
          if (typeof b.then == "function") return v(x, d, Ni(b), S);
          if (b.$$typeof === B) return v(x, d, bi(x, b), S);
          ji(x, b);
        }
        return null;
      }
      function N(x, d, b, S, J) {
        if (typeof S == "string" && S !== "" || typeof S == "number" || typeof S == "bigint") return x = x.get(b) || null, h(d, x, "" + S, J);
        if (typeof S == "object" && S !== null) {
          switch (S.$$typeof) {
            case y:
              return x = x.get(S.key === null ? b : S.key) || null, r(d, x, S, J);
            case j:
              return x = x.get(S.key === null ? b : S.key) || null, f(d, x, S, J);
            case Y:
              return S = ta(S), N(x, d, b, S, J);
          }
          if (qt(S) || Ft(S)) return x = x.get(b) || null, A(d, x, S, J, null);
          if (typeof S.then == "function") return N(x, d, b, Ni(S), J);
          if (S.$$typeof === B) return N(x, d, b, bi(d, S), J);
          ji(d, S);
        }
        return null;
      }
      function V(x, d, b, S) {
        for (var J = null, bt = null, X = d, st = d = 0, dt = null; X !== null && st < b.length; st++) {
          X.index > st ? (dt = X, X = null) : dt = X.sibling;
          var ft = v(x, X, b[st], S);
          if (ft === null) {
            X === null && (X = dt);
            break;
          }
          t && X && ft.alternate === null && e(x, X), d = s(ft, d, st), bt === null ? J = ft : bt.sibling = ft, bt = ft, X = dt;
        }
        if (st === b.length) return n(x, X), mt && tn(x, st), J;
        if (X === null) {
          for (; st < b.length; st++) X = w(x, b[st], S), X !== null && (d = s(X, d, st), bt === null ? J = X : bt.sibling = X, bt = X);
          return mt && tn(x, st), J;
        }
        for (X = l(X); st < b.length; st++) dt = N(X, x, st, b[st], S), dt !== null && (t && dt.alternate !== null && X.delete(dt.key === null ? st : dt.key), d = s(dt, d, st), bt === null ? J = dt : bt.sibling = dt, bt = dt);
        return t && X.forEach(function(qn) {
          return e(x, qn);
        }), mt && tn(x, st), J;
      }
      function W(x, d, b, S) {
        if (b == null) throw Error(o(151));
        for (var J = null, bt = null, X = d, st = d = 0, dt = null, ft = b.next(); X !== null && !ft.done; st++, ft = b.next()) {
          X.index > st ? (dt = X, X = null) : dt = X.sibling;
          var qn = v(x, X, ft.value, S);
          if (qn === null) {
            X === null && (X = dt);
            break;
          }
          t && X && qn.alternate === null && e(x, X), d = s(qn, d, st), bt === null ? J = qn : bt.sibling = qn, bt = qn, X = dt;
        }
        if (ft.done) return n(x, X), mt && tn(x, st), J;
        if (X === null) {
          for (; !ft.done; st++, ft = b.next()) ft = w(x, ft.value, S), ft !== null && (d = s(ft, d, st), bt === null ? J = ft : bt.sibling = ft, bt = ft);
          return mt && tn(x, st), J;
        }
        for (X = l(X); !ft.done; st++, ft = b.next()) ft = N(X, x, st, ft.value, S), ft !== null && (t && ft.alternate !== null && X.delete(ft.key === null ? st : ft.key), d = s(ft, d, st), bt === null ? J = ft : bt.sibling = ft, bt = ft);
        return t && X.forEach(function(R0) {
          return e(x, R0);
        }), mt && tn(x, st), J;
      }
      function Ot(x, d, b, S) {
        if (typeof b == "object" && b !== null && b.type === T && b.key === null && (b = b.props.children), typeof b == "object" && b !== null) {
          switch (b.$$typeof) {
            case y:
              t: {
                for (var J = b.key; d !== null; ) {
                  if (d.key === J) {
                    if (J = b.type, J === T) {
                      if (d.tag === 7) {
                        n(x, d.sibling), S = i(d, b.props.children), S.return = x, x = S;
                        break t;
                      }
                    } else if (d.elementType === J || typeof J == "object" && J !== null && J.$$typeof === Y && ta(J) === d.type) {
                      n(x, d.sibling), S = i(d, b.props), pl(S, b), S.return = x, x = S;
                      break t;
                    }
                    n(x, d);
                    break;
                  } else e(x, d);
                  d = d.sibling;
                }
                b.type === T ? (S = Jn(b.props.children, x.mode, S, b.key), S.return = x, x = S) : (S = gi(b.type, b.key, b.props, null, x.mode, S), pl(S, b), S.return = x, x = S);
              }
              return c(x);
            case j:
              t: {
                for (J = b.key; d !== null; ) {
                  if (d.key === J) if (d.tag === 4 && d.stateNode.containerInfo === b.containerInfo && d.stateNode.implementation === b.implementation) {
                    n(x, d.sibling), S = i(d, b.children || []), S.return = x, x = S;
                    break t;
                  } else {
                    n(x, d);
                    break;
                  }
                  else e(x, d);
                  d = d.sibling;
                }
                S = ec(b, x.mode, S), S.return = x, x = S;
              }
              return c(x);
            case Y:
              return b = ta(b), Ot(x, d, b, S);
          }
          if (qt(b)) return V(x, d, b, S);
          if (Ft(b)) {
            if (J = Ft(b), typeof J != "function") throw Error(o(150));
            return b = J.call(b), W(x, d, b, S);
          }
          if (typeof b.then == "function") return Ot(x, d, Ni(b), S);
          if (b.$$typeof === B) return Ot(x, d, bi(x, b), S);
          ji(x, b);
        }
        return typeof b == "string" && b !== "" || typeof b == "number" || typeof b == "bigint" ? (b = "" + b, d !== null && d.tag === 6 ? (n(x, d.sibling), S = i(d, b), S.return = x, x = S) : (n(x, d), S = tc(b, x.mode, S), S.return = x, x = S), c(x)) : n(x, d);
      }
      return function(x, d, b, S) {
        try {
          xl = 0;
          var J = Ot(x, d, b, S);
          return Ma = null, J;
        } catch (X) {
          if (X === wa || X === yi) throw X;
          var bt = je(29, X, null, x.mode);
          return bt.lanes = S, bt.return = x, bt;
        } finally {
        }
      };
    }
    var na = rr(true), ur = rr(false), Hn = false;
    function mc(t) {
      t.updateQueue = { baseState: t.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, lanes: 0, hiddenCallbacks: null }, callbacks: null };
    }
    function gc(t, e) {
      t = t.updateQueue, e.updateQueue === t && (e.updateQueue = { baseState: t.baseState, firstBaseUpdate: t.firstBaseUpdate, lastBaseUpdate: t.lastBaseUpdate, shared: t.shared, callbacks: null });
    }
    function Tn(t) {
      return { lane: t, tag: 0, payload: null, callback: null, next: null };
    }
    function On(t, e, n) {
      var l = t.updateQueue;
      if (l === null) return null;
      if (l = l.shared, (yt & 2) !== 0) {
        var i = l.pending;
        return i === null ? e.next = e : (e.next = i.next, i.next = e), l.pending = e, e = mi(t), Zo(t, null, n), e;
      }
      return di(t, l, e, n), mi(t);
    }
    function bl(t, e, n) {
      if (e = e.updateQueue, e !== null && (e = e.shared, (n & 4194048) !== 0)) {
        var l = e.lanes;
        l &= t.pendingLanes, n |= l, e.lanes = n, eo(t, n);
      }
    }
    function xc(t, e) {
      var n = t.updateQueue, l = t.alternate;
      if (l !== null && (l = l.updateQueue, n === l)) {
        var i = null, s = null;
        if (n = n.firstBaseUpdate, n !== null) {
          do {
            var c = { lane: n.lane, tag: n.tag, payload: n.payload, callback: null, next: null };
            s === null ? i = s = c : s = s.next = c, n = n.next;
          } while (n !== null);
          s === null ? i = s = e : s = s.next = e;
        } else i = s = e;
        n = { baseState: l.baseState, firstBaseUpdate: i, lastBaseUpdate: s, shared: l.shared, callbacks: l.callbacks }, t.updateQueue = n;
        return;
      }
      t = n.lastBaseUpdate, t === null ? n.firstBaseUpdate = e : t.next = e, n.lastBaseUpdate = e;
    }
    var pc = false;
    function fl() {
      if (pc) {
        var t = Sa;
        if (t !== null) throw t;
      }
    }
    function yl(t, e, n, l) {
      pc = false;
      var i = t.updateQueue;
      Hn = false;
      var s = i.firstBaseUpdate, c = i.lastBaseUpdate, h = i.shared.pending;
      if (h !== null) {
        i.shared.pending = null;
        var r = h, f = r.next;
        r.next = null, c === null ? s = f : c.next = f, c = r;
        var A = t.alternate;
        A !== null && (A = A.updateQueue, h = A.lastBaseUpdate, h !== c && (h === null ? A.firstBaseUpdate = f : h.next = f, A.lastBaseUpdate = r));
      }
      if (s !== null) {
        var w = i.baseState;
        c = 0, A = f = r = null, h = s;
        do {
          var v = h.lane & -536870913, N = v !== h.lane;
          if (N ? (ut & v) === v : (l & v) === v) {
            v !== 0 && v === Aa && (pc = true), A !== null && (A = A.next = { lane: 0, tag: h.tag, payload: h.payload, callback: null, next: null });
            t: {
              var V = t, W = h;
              v = e;
              var Ot = n;
              switch (W.tag) {
                case 1:
                  if (V = W.payload, typeof V == "function") {
                    w = V.call(Ot, w, v);
                    break t;
                  }
                  w = V;
                  break t;
                case 3:
                  V.flags = V.flags & -65537 | 128;
                case 0:
                  if (V = W.payload, v = typeof V == "function" ? V.call(Ot, w, v) : V, v == null) break t;
                  w = _({}, w, v);
                  break t;
                case 2:
                  Hn = true;
              }
            }
            v = h.callback, v !== null && (t.flags |= 64, N && (t.flags |= 8192), N = i.callbacks, N === null ? i.callbacks = [v] : N.push(v));
          } else N = { lane: v, tag: h.tag, payload: h.payload, callback: h.callback, next: null }, A === null ? (f = A = N, r = w) : A = A.next = N, c |= v;
          if (h = h.next, h === null) {
            if (h = i.shared.pending, h === null) break;
            N = h, h = N.next, N.next = null, i.lastBaseUpdate = N, i.shared.pending = null;
          }
        } while (true);
        A === null && (r = w), i.baseState = r, i.firstBaseUpdate = f, i.lastBaseUpdate = A, s === null && (i.shared.lanes = 0), Mn |= c, t.lanes = c, t.memoizedState = w;
      }
    }
    function dr(t, e) {
      if (typeof t != "function") throw Error(o(191, t));
      t.call(e);
    }
    function mr(t, e) {
      var n = t.callbacks;
      if (n !== null) for (t.callbacks = null, t = 0; t < n.length; t++) dr(n[t], e);
    }
    var Ba = m(null), Ci = m(0);
    function gr(t, e) {
      t = dn, z(Ci, t), z(Ba, e), dn = t | e.baseLanes;
    }
    function bc() {
      z(Ci, dn), z(Ba, Ba.current);
    }
    function fc() {
      dn = Ci.current, M(Ba), M(Ci);
    }
    var Ce = m(null), De = null;
    function kn(t) {
      var e = t.alternate;
      z(zt, zt.current & 1), z(Ce, t), De === null && (e === null || Ba.current !== null || e.memoizedState !== null) && (De = t);
    }
    function yc(t) {
      z(zt, zt.current), z(Ce, t), De === null && (De = t);
    }
    function xr(t) {
      t.tag === 22 ? (z(zt, zt.current), z(Ce, t), De === null && (De = t)) : An();
    }
    function An() {
      z(zt, zt.current), z(Ce, Ce.current);
    }
    function He(t) {
      M(Ce), De === t && (De = null), M(zt);
    }
    var zt = m(0);
    function Hi(t) {
      for (var e = t; e !== null; ) {
        if (e.tag === 13) {
          var n = e.memoizedState;
          if (n !== null && (n = n.dehydrated, n === null || Th(n) || Oh(n))) return e;
        } else if (e.tag === 19 && (e.memoizedProps.revealOrder === "forwards" || e.memoizedProps.revealOrder === "backwards" || e.memoizedProps.revealOrder === "unstable_legacy-backwards" || e.memoizedProps.revealOrder === "together")) {
          if ((e.flags & 128) !== 0) return e;
        } else if (e.child !== null) {
          e.child.return = e, e = e.child;
          continue;
        }
        if (e === t) break;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) return null;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
      return null;
    }
    var an = 0, it = null, Ht = null, Yt = null, Ti = false, Ga = false, aa = false, Oi = 0, vl = 0, Ea = null, wg = 0;
    function Kt() {
      throw Error(o(321));
    }
    function vc(t, e) {
      if (e === null) return false;
      for (var n = 0; n < e.length && n < t.length; n++) if (!Ne(t[n], e[n])) return false;
      return true;
    }
    function Nc(t, e, n, l, i, s) {
      return an = s, it = e, e.memoizedState = null, e.updateQueue = null, e.lanes = 0, k.H = t === null || t.memoizedState === null ? Wr : Lc, aa = false, s = n(l, i), aa = false, Ga && (s = br(e, n, l, i)), pr(t), s;
    }
    function pr(t) {
      k.H = Cl;
      var e = Ht !== null && Ht.next !== null;
      if (an = 0, Yt = Ht = it = null, Ti = false, vl = 0, Ea = null, e) throw Error(o(300));
      t === null || Vt || (t = t.dependencies, t !== null && pi(t) && (Vt = true));
    }
    function br(t, e, n, l) {
      it = t;
      var i = 0;
      do {
        if (Ga && (Ea = null), vl = 0, Ga = false, 25 <= i) throw Error(o(301));
        if (i += 1, Yt = Ht = null, t.updateQueue != null) {
          var s = t.updateQueue;
          s.lastEffect = null, s.events = null, s.stores = null, s.memoCache != null && (s.memoCache.index = 0);
        }
        k.H = Ir, s = e(n, l);
      } while (Ga);
      return s;
    }
    function Mg() {
      var t = k.H, e = t.useState()[0];
      return e = typeof e.then == "function" ? Nl(e) : e, t = t.useState()[0], (Ht !== null ? Ht.memoizedState : null) !== t && (it.flags |= 1024), e;
    }
    function jc() {
      var t = Oi !== 0;
      return Oi = 0, t;
    }
    function Cc(t, e, n) {
      e.updateQueue = t.updateQueue, e.flags &= -2053, t.lanes &= ~n;
    }
    function Hc(t) {
      if (Ti) {
        for (t = t.memoizedState; t !== null; ) {
          var e = t.queue;
          e !== null && (e.pending = null), t = t.next;
        }
        Ti = false;
      }
      an = 0, Yt = Ht = it = null, Ga = false, vl = Oi = 0, Ea = null;
    }
    function oe() {
      var t = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
      return Yt === null ? it.memoizedState = Yt = t : Yt = Yt.next = t, Yt;
    }
    function Rt() {
      if (Ht === null) {
        var t = it.alternate;
        t = t !== null ? t.memoizedState : null;
      } else t = Ht.next;
      var e = Yt === null ? it.memoizedState : Yt.next;
      if (e !== null) Yt = e, Ht = t;
      else {
        if (t === null) throw it.alternate === null ? Error(o(467)) : Error(o(310));
        Ht = t, t = { memoizedState: Ht.memoizedState, baseState: Ht.baseState, baseQueue: Ht.baseQueue, queue: Ht.queue, next: null }, Yt === null ? it.memoizedState = Yt = t : Yt = Yt.next = t;
      }
      return Yt;
    }
    function ki() {
      return { lastEffect: null, events: null, stores: null, memoCache: null };
    }
    function Nl(t) {
      var e = vl;
      return vl += 1, Ea === null && (Ea = []), t = cr(Ea, t, e), e = it, (Yt === null ? e.memoizedState : Yt.next) === null && (e = e.alternate, k.H = e === null || e.memoizedState === null ? Wr : Lc), t;
    }
    function Ai(t) {
      if (t !== null && typeof t == "object") {
        if (typeof t.then == "function") return Nl(t);
        if (t.$$typeof === B) return te(t);
      }
      throw Error(o(438, String(t)));
    }
    function Tc(t) {
      var e = null, n = it.updateQueue;
      if (n !== null && (e = n.memoCache), e == null) {
        var l = it.alternate;
        l !== null && (l = l.updateQueue, l !== null && (l = l.memoCache, l != null && (e = { data: l.data.map(function(i) {
          return i.slice();
        }), index: 0 })));
      }
      if (e == null && (e = { data: [], index: 0 }), n === null && (n = ki(), it.updateQueue = n), n.memoCache = e, n = e.data[e.index], n === void 0) for (n = e.data[e.index] = Array(t), l = 0; l < t; l++) n[l] = et;
      return e.index++, n;
    }
    function ln(t, e) {
      return typeof e == "function" ? e(t) : e;
    }
    function Si(t) {
      var e = Rt();
      return Oc(e, Ht, t);
    }
    function Oc(t, e, n) {
      var l = t.queue;
      if (l === null) throw Error(o(311));
      l.lastRenderedReducer = n;
      var i = t.baseQueue, s = l.pending;
      if (s !== null) {
        if (i !== null) {
          var c = i.next;
          i.next = s.next, s.next = c;
        }
        e.baseQueue = i = s, l.pending = null;
      }
      if (s = t.baseState, i === null) t.memoizedState = s;
      else {
        e = i.next;
        var h = c = null, r = null, f = e, A = false;
        do {
          var w = f.lane & -536870913;
          if (w !== f.lane ? (ut & w) === w : (an & w) === w) {
            var v = f.revertLane;
            if (v === 0) r !== null && (r = r.next = { lane: 0, revertLane: 0, gesture: null, action: f.action, hasEagerState: f.hasEagerState, eagerState: f.eagerState, next: null }), w === Aa && (A = true);
            else if ((an & v) === v) {
              f = f.next, v === Aa && (A = true);
              continue;
            } else w = { lane: 0, revertLane: f.revertLane, gesture: null, action: f.action, hasEagerState: f.hasEagerState, eagerState: f.eagerState, next: null }, r === null ? (h = r = w, c = s) : r = r.next = w, it.lanes |= v, Mn |= v;
            w = f.action, aa && n(s, w), s = f.hasEagerState ? f.eagerState : n(s, w);
          } else v = { lane: w, revertLane: f.revertLane, gesture: f.gesture, action: f.action, hasEagerState: f.hasEagerState, eagerState: f.eagerState, next: null }, r === null ? (h = r = v, c = s) : r = r.next = v, it.lanes |= w, Mn |= w;
          f = f.next;
        } while (f !== null && f !== e);
        if (r === null ? c = s : r.next = h, !Ne(s, t.memoizedState) && (Vt = true, A && (n = Sa, n !== null))) throw n;
        t.memoizedState = s, t.baseState = c, t.baseQueue = r, l.lastRenderedState = s;
      }
      return i === null && (l.lanes = 0), [t.memoizedState, l.dispatch];
    }
    function kc(t) {
      var e = Rt(), n = e.queue;
      if (n === null) throw Error(o(311));
      n.lastRenderedReducer = t;
      var l = n.dispatch, i = n.pending, s = e.memoizedState;
      if (i !== null) {
        n.pending = null;
        var c = i = i.next;
        do
          s = t(s, c.action), c = c.next;
        while (c !== i);
        Ne(s, e.memoizedState) || (Vt = true), e.memoizedState = s, e.baseQueue === null && (e.baseState = s), n.lastRenderedState = s;
      }
      return [s, l];
    }
    function fr(t, e, n) {
      var l = it, i = Rt(), s = mt;
      if (s) {
        if (n === void 0) throw Error(o(407));
        n = n();
      } else n = e();
      var c = !Ne((Ht || i).memoizedState, n);
      if (c && (i.memoizedState = n, Vt = true), i = i.queue, wc(Nr.bind(null, l, i, t), [t]), i.getSnapshot !== e || c || Yt !== null && Yt.memoizedState.tag & 1) {
        if (l.flags |= 2048, Da(9, { destroy: void 0 }, vr.bind(null, l, i, n, e), null), At === null) throw Error(o(349));
        s || (an & 127) !== 0 || yr(l, e, n);
      }
      return n;
    }
    function yr(t, e, n) {
      t.flags |= 16384, t = { getSnapshot: e, value: n }, e = it.updateQueue, e === null ? (e = ki(), it.updateQueue = e, e.stores = [t]) : (n = e.stores, n === null ? e.stores = [t] : n.push(t));
    }
    function vr(t, e, n, l) {
      e.value = n, e.getSnapshot = l, jr(e) && Cr(t);
    }
    function Nr(t, e, n) {
      return n(function() {
        jr(e) && Cr(t);
      });
    }
    function jr(t) {
      var e = t.getSnapshot;
      t = t.value;
      try {
        var n = e();
        return !Ne(t, n);
      } catch {
        return true;
      }
    }
    function Cr(t) {
      var e = Zn(t, 2);
      e !== null && be(e, t, 2);
    }
    function Ac(t) {
      var e = oe();
      if (typeof t == "function") {
        var n = t;
        if (t = n(), aa) {
          bn(true);
          try {
            n();
          } finally {
            bn(false);
          }
        }
      }
      return e.memoizedState = e.baseState = t, e.queue = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: ln, lastRenderedState: t }, e;
    }
    function Hr(t, e, n, l) {
      return t.baseState = n, Oc(t, Ht, typeof l == "function" ? l : ln);
    }
    function Bg(t, e, n, l, i) {
      if (Bi(t)) throw Error(o(485));
      if (t = e.action, t !== null) {
        var s = { payload: i, action: t, next: null, isTransition: true, status: "pending", value: null, reason: null, listeners: [], then: function(c) {
          s.listeners.push(c);
        } };
        k.T !== null ? n(true) : s.isTransition = false, l(s), n = e.pending, n === null ? (s.next = e.pending = s, Tr(e, s)) : (s.next = n.next, e.pending = n.next = s);
      }
    }
    function Tr(t, e) {
      var n = e.action, l = e.payload, i = t.state;
      if (e.isTransition) {
        var s = k.T, c = {};
        k.T = c;
        try {
          var h = n(i, l), r = k.S;
          r !== null && r(c, h), Or(t, e, h);
        } catch (f) {
          Sc(t, e, f);
        } finally {
          s !== null && c.types !== null && (s.types = c.types), k.T = s;
        }
      } else try {
        s = n(i, l), Or(t, e, s);
      } catch (f) {
        Sc(t, e, f);
      }
    }
    function Or(t, e, n) {
      n !== null && typeof n == "object" && typeof n.then == "function" ? n.then(function(l) {
        kr(t, e, l);
      }, function(l) {
        return Sc(t, e, l);
      }) : kr(t, e, n);
    }
    function kr(t, e, n) {
      e.status = "fulfilled", e.value = n, Ar(e), t.state = n, e = t.pending, e !== null && (n = e.next, n === e ? t.pending = null : (n = n.next, e.next = n, Tr(t, n)));
    }
    function Sc(t, e, n) {
      var l = t.pending;
      if (t.pending = null, l !== null) {
        l = l.next;
        do
          e.status = "rejected", e.reason = n, Ar(e), e = e.next;
        while (e !== l);
      }
      t.action = null;
    }
    function Ar(t) {
      t = t.listeners;
      for (var e = 0; e < t.length; e++) (0, t[e])();
    }
    function Sr(t, e) {
      return e;
    }
    function wr(t, e) {
      if (mt) {
        var n = At.formState;
        if (n !== null) {
          t: {
            var l = it;
            if (mt) {
              if (Mt) {
                e: {
                  for (var i = Mt, s = Ee; i.nodeType !== 8; ) {
                    if (!s) {
                      i = null;
                      break e;
                    }
                    if (i = Le(i.nextSibling), i === null) {
                      i = null;
                      break e;
                    }
                  }
                  s = i.data, i = s === "F!" || s === "F" ? i : null;
                }
                if (i) {
                  Mt = Le(i.nextSibling), l = i.data === "F!";
                  break t;
                }
              }
              jn(l);
            }
            l = false;
          }
          l && (e = n[0]);
        }
      }
      return n = oe(), n.memoizedState = n.baseState = e, l = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: Sr, lastRenderedState: e }, n.queue = l, n = Jr.bind(null, it, l), l.dispatch = n, l = Ac(false), s = Dc.bind(null, it, false, l.queue), l = oe(), i = { state: e, dispatch: null, action: t, pending: null }, l.queue = i, n = Bg.bind(null, it, i, s, n), i.dispatch = n, l.memoizedState = t, [e, n, false];
    }
    function Mr(t) {
      var e = Rt();
      return Br(e, Ht, t);
    }
    function Br(t, e, n) {
      if (e = Oc(t, e, Sr)[0], t = Si(ln)[0], typeof e == "object" && e !== null && typeof e.then == "function") try {
        var l = Nl(e);
      } catch (c) {
        throw c === wa ? yi : c;
      }
      else l = e;
      e = Rt();
      var i = e.queue, s = i.dispatch;
      return n !== e.memoizedState && (it.flags |= 2048, Da(9, { destroy: void 0 }, Gg.bind(null, i, n), null)), [l, s, t];
    }
    function Gg(t, e) {
      t.action = e;
    }
    function Gr(t) {
      var e = Rt(), n = Ht;
      if (n !== null) return Br(e, n, t);
      Rt(), e = e.memoizedState, n = Rt();
      var l = n.queue.dispatch;
      return n.memoizedState = t, [e, l, false];
    }
    function Da(t, e, n, l) {
      return t = { tag: t, create: n, deps: l, inst: e, next: null }, e = it.updateQueue, e === null && (e = ki(), it.updateQueue = e), n = e.lastEffect, n === null ? e.lastEffect = t.next = t : (l = n.next, n.next = t, t.next = l, e.lastEffect = t), t;
    }
    function Er() {
      return Rt().memoizedState;
    }
    function wi(t, e, n, l) {
      var i = oe();
      it.flags |= t, i.memoizedState = Da(1 | e, { destroy: void 0 }, n, l === void 0 ? null : l);
    }
    function Mi(t, e, n, l) {
      var i = Rt();
      l = l === void 0 ? null : l;
      var s = i.memoizedState.inst;
      Ht !== null && l !== null && vc(l, Ht.memoizedState.deps) ? i.memoizedState = Da(e, s, n, l) : (it.flags |= t, i.memoizedState = Da(1 | e, s, n, l));
    }
    function Dr(t, e) {
      wi(8390656, 8, t, e);
    }
    function wc(t, e) {
      Mi(2048, 8, t, e);
    }
    function Eg(t) {
      it.flags |= 4;
      var e = it.updateQueue;
      if (e === null) e = ki(), it.updateQueue = e, e.events = [t];
      else {
        var n = e.events;
        n === null ? e.events = [t] : n.push(t);
      }
    }
    function Lr(t) {
      var e = Rt().memoizedState;
      return Eg({ ref: e, nextImpl: t }), function() {
        if ((yt & 2) !== 0) throw Error(o(440));
        return e.impl.apply(void 0, arguments);
      };
    }
    function Kr(t, e) {
      return Mi(4, 2, t, e);
    }
    function _r(t, e) {
      return Mi(4, 4, t, e);
    }
    function zr(t, e) {
      if (typeof e == "function") {
        t = t();
        var n = e(t);
        return function() {
          typeof n == "function" ? n() : e(null);
        };
      }
      if (e != null) return t = t(), e.current = t, function() {
        e.current = null;
      };
    }
    function Rr(t, e, n) {
      n = n != null ? n.concat([t]) : null, Mi(4, 4, zr.bind(null, e, t), n);
    }
    function Mc() {
    }
    function qr(t, e) {
      var n = Rt();
      e = e === void 0 ? null : e;
      var l = n.memoizedState;
      return e !== null && vc(e, l[1]) ? l[0] : (n.memoizedState = [t, e], t);
    }
    function Pr(t, e) {
      var n = Rt();
      e = e === void 0 ? null : e;
      var l = n.memoizedState;
      if (e !== null && vc(e, l[1])) return l[0];
      if (l = t(), aa) {
        bn(true);
        try {
          t();
        } finally {
          bn(false);
        }
      }
      return n.memoizedState = [l, e], l;
    }
    function Bc(t, e, n) {
      return n === void 0 || (an & 1073741824) !== 0 && (ut & 261930) === 0 ? t.memoizedState = e : (t.memoizedState = n, t = Uu(), it.lanes |= t, Mn |= t, n);
    }
    function Ur(t, e, n, l) {
      return Ne(n, e) ? n : Ba.current !== null ? (t = Bc(t, n, l), Ne(t, e) || (Vt = true), t) : (an & 42) === 0 || (an & 1073741824) !== 0 && (ut & 261930) === 0 ? (Vt = true, t.memoizedState = n) : (t = Uu(), it.lanes |= t, Mn |= t, e);
    }
    function Yr(t, e, n, l, i) {
      var s = K.p;
      K.p = s !== 0 && 8 > s ? s : 8;
      var c = k.T, h = {};
      k.T = h, Dc(t, false, e, n);
      try {
        var r = i(), f = k.S;
        if (f !== null && f(h, r), r !== null && typeof r == "object" && typeof r.then == "function") {
          var A = Sg(r, l);
          jl(t, e, A, ke(t));
        } else jl(t, e, l, ke(t));
      } catch (w) {
        jl(t, e, { then: function() {
        }, status: "rejected", reason: w }, ke());
      } finally {
        K.p = s, c !== null && h.types !== null && (c.types = h.types), k.T = c;
      }
    }
    function Dg() {
    }
    function Gc(t, e, n, l) {
      if (t.tag !== 5) throw Error(o(476));
      var i = Vr(t).queue;
      Yr(t, i, e, F, n === null ? Dg : function() {
        return Xr(t), n(l);
      });
    }
    function Vr(t) {
      var e = t.memoizedState;
      if (e !== null) return e;
      e = { memoizedState: F, baseState: F, baseQueue: null, queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: ln, lastRenderedState: F }, next: null };
      var n = {};
      return e.next = { memoizedState: n, baseState: n, baseQueue: null, queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: ln, lastRenderedState: n }, next: null }, t.memoizedState = e, t = t.alternate, t !== null && (t.memoizedState = e), e;
    }
    function Xr(t) {
      var e = Vr(t);
      e.next === null && (e = t.alternate.memoizedState), jl(t, e.next.queue, {}, ke());
    }
    function Ec() {
      return te(zl);
    }
    function Qr() {
      return Rt().memoizedState;
    }
    function Zr() {
      return Rt().memoizedState;
    }
    function Lg(t) {
      for (var e = t.return; e !== null; ) {
        switch (e.tag) {
          case 24:
          case 3:
            var n = ke();
            t = Tn(n);
            var l = On(e, t, n);
            l !== null && (be(l, e, n), bl(l, e, n)), e = { cache: oc() }, t.payload = e;
            return;
        }
        e = e.return;
      }
    }
    function Kg(t, e, n) {
      var l = ke();
      n = { lane: l, revertLane: 0, gesture: null, action: n, hasEagerState: false, eagerState: null, next: null }, Bi(t) ? $r(e, n) : (n = Ws(t, e, n, l), n !== null && (be(n, t, l), Fr(n, e, l)));
    }
    function Jr(t, e, n) {
      var l = ke();
      jl(t, e, n, l);
    }
    function jl(t, e, n, l) {
      var i = { lane: l, revertLane: 0, gesture: null, action: n, hasEagerState: false, eagerState: null, next: null };
      if (Bi(t)) $r(e, i);
      else {
        var s = t.alternate;
        if (t.lanes === 0 && (s === null || s.lanes === 0) && (s = e.lastRenderedReducer, s !== null)) try {
          var c = e.lastRenderedState, h = s(c, n);
          if (i.hasEagerState = true, i.eagerState = h, Ne(h, c)) return di(t, e, i, 0), At === null && ui(), false;
        } catch {
        } finally {
        }
        if (n = Ws(t, e, i, l), n !== null) return be(n, t, l), Fr(n, e, l), true;
      }
      return false;
    }
    function Dc(t, e, n, l) {
      if (l = { lane: 2, revertLane: mh(), gesture: null, action: l, hasEagerState: false, eagerState: null, next: null }, Bi(t)) {
        if (e) throw Error(o(479));
      } else e = Ws(t, n, l, 2), e !== null && be(e, t, 2);
    }
    function Bi(t) {
      var e = t.alternate;
      return t === it || e !== null && e === it;
    }
    function $r(t, e) {
      Ga = Ti = true;
      var n = t.pending;
      n === null ? e.next = e : (e.next = n.next, n.next = e), t.pending = e;
    }
    function Fr(t, e, n) {
      if ((n & 4194048) !== 0) {
        var l = e.lanes;
        l &= t.pendingLanes, n |= l, e.lanes = n, eo(t, n);
      }
    }
    var Cl = { readContext: te, use: Ai, useCallback: Kt, useContext: Kt, useEffect: Kt, useImperativeHandle: Kt, useLayoutEffect: Kt, useInsertionEffect: Kt, useMemo: Kt, useReducer: Kt, useRef: Kt, useState: Kt, useDebugValue: Kt, useDeferredValue: Kt, useTransition: Kt, useSyncExternalStore: Kt, useId: Kt, useHostTransitionStatus: Kt, useFormState: Kt, useActionState: Kt, useOptimistic: Kt, useMemoCache: Kt, useCacheRefresh: Kt };
    Cl.useEffectEvent = Kt;
    var Wr = { readContext: te, use: Ai, useCallback: function(t, e) {
      return oe().memoizedState = [t, e === void 0 ? null : e], t;
    }, useContext: te, useEffect: Dr, useImperativeHandle: function(t, e, n) {
      n = n != null ? n.concat([t]) : null, wi(4194308, 4, zr.bind(null, e, t), n);
    }, useLayoutEffect: function(t, e) {
      return wi(4194308, 4, t, e);
    }, useInsertionEffect: function(t, e) {
      wi(4, 2, t, e);
    }, useMemo: function(t, e) {
      var n = oe();
      e = e === void 0 ? null : e;
      var l = t();
      if (aa) {
        bn(true);
        try {
          t();
        } finally {
          bn(false);
        }
      }
      return n.memoizedState = [l, e], l;
    }, useReducer: function(t, e, n) {
      var l = oe();
      if (n !== void 0) {
        var i = n(e);
        if (aa) {
          bn(true);
          try {
            n(e);
          } finally {
            bn(false);
          }
        }
      } else i = e;
      return l.memoizedState = l.baseState = i, t = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: t, lastRenderedState: i }, l.queue = t, t = t.dispatch = Kg.bind(null, it, t), [l.memoizedState, t];
    }, useRef: function(t) {
      var e = oe();
      return t = { current: t }, e.memoizedState = t;
    }, useState: function(t) {
      t = Ac(t);
      var e = t.queue, n = Jr.bind(null, it, e);
      return e.dispatch = n, [t.memoizedState, n];
    }, useDebugValue: Mc, useDeferredValue: function(t, e) {
      var n = oe();
      return Bc(n, t, e);
    }, useTransition: function() {
      var t = Ac(false);
      return t = Yr.bind(null, it, t.queue, true, false), oe().memoizedState = t, [false, t];
    }, useSyncExternalStore: function(t, e, n) {
      var l = it, i = oe();
      if (mt) {
        if (n === void 0) throw Error(o(407));
        n = n();
      } else {
        if (n = e(), At === null) throw Error(o(349));
        (ut & 127) !== 0 || yr(l, e, n);
      }
      i.memoizedState = n;
      var s = { value: n, getSnapshot: e };
      return i.queue = s, Dr(Nr.bind(null, l, s, t), [t]), l.flags |= 2048, Da(9, { destroy: void 0 }, vr.bind(null, l, s, n, e), null), n;
    }, useId: function() {
      var t = oe(), e = At.identifierPrefix;
      if (mt) {
        var n = Xe, l = Ve;
        n = (l & ~(1 << 32 - ve(l) - 1)).toString(32) + n, e = "_" + e + "R_" + n, n = Oi++, 0 < n && (e += "H" + n.toString(32)), e += "_";
      } else n = wg++, e = "_" + e + "r_" + n.toString(32) + "_";
      return t.memoizedState = e;
    }, useHostTransitionStatus: Ec, useFormState: wr, useActionState: wr, useOptimistic: function(t) {
      var e = oe();
      e.memoizedState = e.baseState = t;
      var n = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: null, lastRenderedState: null };
      return e.queue = n, e = Dc.bind(null, it, true, n), n.dispatch = e, [t, e];
    }, useMemoCache: Tc, useCacheRefresh: function() {
      return oe().memoizedState = Lg.bind(null, it);
    }, useEffectEvent: function(t) {
      var e = oe(), n = { impl: t };
      return e.memoizedState = n, function() {
        if ((yt & 2) !== 0) throw Error(o(440));
        return n.impl.apply(void 0, arguments);
      };
    } }, Lc = { readContext: te, use: Ai, useCallback: qr, useContext: te, useEffect: wc, useImperativeHandle: Rr, useInsertionEffect: Kr, useLayoutEffect: _r, useMemo: Pr, useReducer: Si, useRef: Er, useState: function() {
      return Si(ln);
    }, useDebugValue: Mc, useDeferredValue: function(t, e) {
      var n = Rt();
      return Ur(n, Ht.memoizedState, t, e);
    }, useTransition: function() {
      var t = Si(ln)[0], e = Rt().memoizedState;
      return [typeof t == "boolean" ? t : Nl(t), e];
    }, useSyncExternalStore: fr, useId: Qr, useHostTransitionStatus: Ec, useFormState: Mr, useActionState: Mr, useOptimistic: function(t, e) {
      var n = Rt();
      return Hr(n, Ht, t, e);
    }, useMemoCache: Tc, useCacheRefresh: Zr };
    Lc.useEffectEvent = Lr;
    var Ir = { readContext: te, use: Ai, useCallback: qr, useContext: te, useEffect: wc, useImperativeHandle: Rr, useInsertionEffect: Kr, useLayoutEffect: _r, useMemo: Pr, useReducer: kc, useRef: Er, useState: function() {
      return kc(ln);
    }, useDebugValue: Mc, useDeferredValue: function(t, e) {
      var n = Rt();
      return Ht === null ? Bc(n, t, e) : Ur(n, Ht.memoizedState, t, e);
    }, useTransition: function() {
      var t = kc(ln)[0], e = Rt().memoizedState;
      return [typeof t == "boolean" ? t : Nl(t), e];
    }, useSyncExternalStore: fr, useId: Qr, useHostTransitionStatus: Ec, useFormState: Gr, useActionState: Gr, useOptimistic: function(t, e) {
      var n = Rt();
      return Ht !== null ? Hr(n, Ht, t, e) : (n.baseState = t, [t, n.queue.dispatch]);
    }, useMemoCache: Tc, useCacheRefresh: Zr };
    Ir.useEffectEvent = Lr;
    function Kc(t, e, n, l) {
      e = t.memoizedState, n = n(l, e), n = n == null ? e : _({}, e, n), t.memoizedState = n, t.lanes === 0 && (t.updateQueue.baseState = n);
    }
    var _c = { enqueueSetState: function(t, e, n) {
      t = t._reactInternals;
      var l = ke(), i = Tn(l);
      i.payload = e, n != null && (i.callback = n), e = On(t, i, l), e !== null && (be(e, t, l), bl(e, t, l));
    }, enqueueReplaceState: function(t, e, n) {
      t = t._reactInternals;
      var l = ke(), i = Tn(l);
      i.tag = 1, i.payload = e, n != null && (i.callback = n), e = On(t, i, l), e !== null && (be(e, t, l), bl(e, t, l));
    }, enqueueForceUpdate: function(t, e) {
      t = t._reactInternals;
      var n = ke(), l = Tn(n);
      l.tag = 2, e != null && (l.callback = e), e = On(t, l, n), e !== null && (be(e, t, n), bl(e, t, n));
    } };
    function tu(t, e, n, l, i, s, c) {
      return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(l, s, c) : e.prototype && e.prototype.isPureReactComponent ? !ol(n, l) || !ol(i, s) : true;
    }
    function eu(t, e, n, l) {
      t = e.state, typeof e.componentWillReceiveProps == "function" && e.componentWillReceiveProps(n, l), typeof e.UNSAFE_componentWillReceiveProps == "function" && e.UNSAFE_componentWillReceiveProps(n, l), e.state !== t && _c.enqueueReplaceState(e, e.state, null);
    }
    function la(t, e) {
      var n = e;
      if ("ref" in e) {
        n = {};
        for (var l in e) l !== "ref" && (n[l] = e[l]);
      }
      if (t = t.defaultProps) {
        n === e && (n = _({}, n));
        for (var i in t) n[i] === void 0 && (n[i] = t[i]);
      }
      return n;
    }
    function nu(t) {
      ri(t);
    }
    function au(t) {
      console.error(t);
    }
    function lu(t) {
      ri(t);
    }
    function Gi(t, e) {
      try {
        var n = t.onUncaughtError;
        n(e.value, { componentStack: e.stack });
      } catch (l) {
        setTimeout(function() {
          throw l;
        });
      }
    }
    function iu(t, e, n) {
      try {
        var l = t.onCaughtError;
        l(n.value, { componentStack: n.stack, errorBoundary: e.tag === 1 ? e.stateNode : null });
      } catch (i) {
        setTimeout(function() {
          throw i;
        });
      }
    }
    function zc(t, e, n) {
      return n = Tn(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
        Gi(t, e);
      }, n;
    }
    function su(t) {
      return t = Tn(t), t.tag = 3, t;
    }
    function cu(t, e, n, l) {
      var i = n.type.getDerivedStateFromError;
      if (typeof i == "function") {
        var s = l.value;
        t.payload = function() {
          return i(s);
        }, t.callback = function() {
          iu(e, n, l);
        };
      }
      var c = n.stateNode;
      c !== null && typeof c.componentDidCatch == "function" && (t.callback = function() {
        iu(e, n, l), typeof i != "function" && (Bn === null ? Bn = /* @__PURE__ */ new Set([this]) : Bn.add(this));
        var h = l.stack;
        this.componentDidCatch(l.value, { componentStack: h !== null ? h : "" });
      });
    }
    function _g(t, e, n, l, i) {
      if (n.flags |= 32768, l !== null && typeof l == "object" && typeof l.then == "function") {
        if (e = n.alternate, e !== null && ka(e, n, i, true), n = Ce.current, n !== null) {
          switch (n.tag) {
            case 31:
            case 13:
              return De === null ? Vi() : n.alternate === null && _t === 0 && (_t = 3), n.flags &= -257, n.flags |= 65536, n.lanes = i, l === vi ? n.flags |= 16384 : (e = n.updateQueue, e === null ? n.updateQueue = /* @__PURE__ */ new Set([l]) : e.add(l), rh(t, l, i)), false;
            case 22:
              return n.flags |= 65536, l === vi ? n.flags |= 16384 : (e = n.updateQueue, e === null ? (e = { transitions: null, markerInstances: null, retryQueue: /* @__PURE__ */ new Set([l]) }, n.updateQueue = e) : (n = e.retryQueue, n === null ? e.retryQueue = /* @__PURE__ */ new Set([l]) : n.add(l)), rh(t, l, i)), false;
          }
          throw Error(o(435, n.tag));
        }
        return rh(t, l, i), Vi(), false;
      }
      if (mt) return e = Ce.current, e !== null ? ((e.flags & 65536) === 0 && (e.flags |= 256), e.flags |= 65536, e.lanes = i, l !== lc && (t = Error(o(422), { cause: l }), dl(Me(t, n)))) : (l !== lc && (e = Error(o(423), { cause: l }), dl(Me(e, n))), t = t.current.alternate, t.flags |= 65536, i &= -i, t.lanes |= i, l = Me(l, n), i = zc(t.stateNode, l, i), xc(t, i), _t !== 4 && (_t = 2)), false;
      var s = Error(o(520), { cause: l });
      if (s = Me(s, n), Ml === null ? Ml = [s] : Ml.push(s), _t !== 4 && (_t = 2), e === null) return true;
      l = Me(l, n), n = e;
      do {
        switch (n.tag) {
          case 3:
            return n.flags |= 65536, t = i & -i, n.lanes |= t, t = zc(n.stateNode, l, t), xc(n, t), false;
          case 1:
            if (e = n.type, s = n.stateNode, (n.flags & 128) === 0 && (typeof e.getDerivedStateFromError == "function" || s !== null && typeof s.componentDidCatch == "function" && (Bn === null || !Bn.has(s)))) return n.flags |= 65536, i &= -i, n.lanes |= i, i = su(i), cu(i, t, n, l), xc(n, i), false;
        }
        n = n.return;
      } while (n !== null);
      return false;
    }
    var Rc = Error(o(461)), Vt = false;
    function ee(t, e, n, l) {
      e.child = t === null ? ur(e, null, n, l) : na(e, t.child, n, l);
    }
    function hu(t, e, n, l, i) {
      n = n.render;
      var s = e.ref;
      if ("ref" in l) {
        var c = {};
        for (var h in l) h !== "ref" && (c[h] = l[h]);
      } else c = l;
      return Wn(e), l = Nc(t, e, n, c, s, i), h = jc(), t !== null && !Vt ? (Cc(t, e, i), sn(t, e, i)) : (mt && h && nc(e), e.flags |= 1, ee(t, e, l, i), e.child);
    }
    function ou(t, e, n, l, i) {
      if (t === null) {
        var s = n.type;
        return typeof s == "function" && !Is(s) && s.defaultProps === void 0 && n.compare === null ? (e.tag = 15, e.type = s, ru(t, e, s, l, i)) : (t = gi(n.type, null, l, e, e.mode, i), t.ref = e.ref, t.return = e, e.child = t);
      }
      if (s = t.child, !Zc(t, i)) {
        var c = s.memoizedProps;
        if (n = n.compare, n = n !== null ? n : ol, n(c, l) && t.ref === e.ref) return sn(t, e, i);
      }
      return e.flags |= 1, t = Ie(s, l), t.ref = e.ref, t.return = e, e.child = t;
    }
    function ru(t, e, n, l, i) {
      if (t !== null) {
        var s = t.memoizedProps;
        if (ol(s, l) && t.ref === e.ref) if (Vt = false, e.pendingProps = l = s, Zc(t, i)) (t.flags & 131072) !== 0 && (Vt = true);
        else return e.lanes = t.lanes, sn(t, e, i);
      }
      return qc(t, e, n, l, i);
    }
    function uu(t, e, n, l) {
      var i = l.children, s = t !== null ? t.memoizedState : null;
      if (t === null && e.stateNode === null && (e.stateNode = { _visibility: 1, _pendingMarkers: null, _retryCache: null, _transitions: null }), l.mode === "hidden") {
        if ((e.flags & 128) !== 0) {
          if (s = s !== null ? s.baseLanes | n : n, t !== null) {
            for (l = e.child = t.child, i = 0; l !== null; ) i = i | l.lanes | l.childLanes, l = l.sibling;
            l = i & ~s;
          } else l = 0, e.child = null;
          return du(t, e, s, n, l);
        }
        if ((n & 536870912) !== 0) e.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && fi(e, s !== null ? s.cachePool : null), s !== null ? gr(e, s) : bc(), xr(e);
        else return l = e.lanes = 536870912, du(t, e, s !== null ? s.baseLanes | n : n, n, l);
      } else s !== null ? (fi(e, s.cachePool), gr(e, s), An(), e.memoizedState = null) : (t !== null && fi(e, null), bc(), An());
      return ee(t, e, i, n), e.child;
    }
    function Hl(t, e) {
      return t !== null && t.tag === 22 || e.stateNode !== null || (e.stateNode = { _visibility: 1, _pendingMarkers: null, _retryCache: null, _transitions: null }), e.sibling;
    }
    function du(t, e, n, l, i) {
      var s = uc();
      return s = s === null ? null : { parent: Ut._currentValue, pool: s }, e.memoizedState = { baseLanes: n, cachePool: s }, t !== null && fi(e, null), bc(), xr(e), t !== null && ka(t, e, l, true), e.childLanes = i, null;
    }
    function Ei(t, e) {
      return e = Li({ mode: e.mode, children: e.children }, t.mode), e.ref = t.ref, t.child = e, e.return = t, e;
    }
    function mu(t, e, n) {
      return na(e, t.child, null, n), t = Ei(e, e.pendingProps), t.flags |= 2, He(e), e.memoizedState = null, t;
    }
    function zg(t, e, n) {
      var l = e.pendingProps, i = (e.flags & 128) !== 0;
      if (e.flags &= -129, t === null) {
        if (mt) {
          if (l.mode === "hidden") return t = Ei(e, l), e.lanes = 536870912, Hl(null, t);
          if (yc(e), (t = Mt) ? (t = Td(t, Ee), t = t !== null && t.data === "&" ? t : null, t !== null && (e.memoizedState = { dehydrated: t, treeContext: vn !== null ? { id: Ve, overflow: Xe } : null, retryLane: 536870912, hydrationErrors: null }, n = $o(t), n.return = e, e.child = n, It = e, Mt = null)) : t = null, t === null) throw jn(e);
          return e.lanes = 536870912, null;
        }
        return Ei(e, l);
      }
      var s = t.memoizedState;
      if (s !== null) {
        var c = s.dehydrated;
        if (yc(e), i) if (e.flags & 256) e.flags &= -257, e = mu(t, e, n);
        else if (e.memoizedState !== null) e.child = t.child, e.flags |= 128, e = null;
        else throw Error(o(558));
        else if (Vt || ka(t, e, n, false), i = (n & t.childLanes) !== 0, Vt || i) {
          if (l = At, l !== null && (c = no(l, n), c !== 0 && c !== s.retryLane)) throw s.retryLane = c, Zn(t, c), be(l, t, c), Rc;
          Vi(), e = mu(t, e, n);
        } else t = s.treeContext, Mt = Le(c.nextSibling), It = e, mt = true, Nn = null, Ee = false, t !== null && Io(e, t), e = Ei(e, l), e.flags |= 4096;
        return e;
      }
      return t = Ie(t.child, { mode: l.mode, children: l.children }), t.ref = e.ref, e.child = t, t.return = e, t;
    }
    function Di(t, e) {
      var n = e.ref;
      if (n === null) t !== null && t.ref !== null && (e.flags |= 4194816);
      else {
        if (typeof n != "function" && typeof n != "object") throw Error(o(284));
        (t === null || t.ref !== n) && (e.flags |= 4194816);
      }
    }
    function qc(t, e, n, l, i) {
      return Wn(e), n = Nc(t, e, n, l, void 0, i), l = jc(), t !== null && !Vt ? (Cc(t, e, i), sn(t, e, i)) : (mt && l && nc(e), e.flags |= 1, ee(t, e, n, i), e.child);
    }
    function gu(t, e, n, l, i, s) {
      return Wn(e), e.updateQueue = null, n = br(e, l, n, i), pr(t), l = jc(), t !== null && !Vt ? (Cc(t, e, s), sn(t, e, s)) : (mt && l && nc(e), e.flags |= 1, ee(t, e, n, s), e.child);
    }
    function xu(t, e, n, l, i) {
      if (Wn(e), e.stateNode === null) {
        var s = Ca, c = n.contextType;
        typeof c == "object" && c !== null && (s = te(c)), s = new n(l, s), e.memoizedState = s.state !== null && s.state !== void 0 ? s.state : null, s.updater = _c, e.stateNode = s, s._reactInternals = e, s = e.stateNode, s.props = l, s.state = e.memoizedState, s.refs = {}, mc(e), c = n.contextType, s.context = typeof c == "object" && c !== null ? te(c) : Ca, s.state = e.memoizedState, c = n.getDerivedStateFromProps, typeof c == "function" && (Kc(e, n, c, l), s.state = e.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof s.getSnapshotBeforeUpdate == "function" || typeof s.UNSAFE_componentWillMount != "function" && typeof s.componentWillMount != "function" || (c = s.state, typeof s.componentWillMount == "function" && s.componentWillMount(), typeof s.UNSAFE_componentWillMount == "function" && s.UNSAFE_componentWillMount(), c !== s.state && _c.enqueueReplaceState(s, s.state, null), yl(e, l, s, i), fl(), s.state = e.memoizedState), typeof s.componentDidMount == "function" && (e.flags |= 4194308), l = true;
      } else if (t === null) {
        s = e.stateNode;
        var h = e.memoizedProps, r = la(n, h);
        s.props = r;
        var f = s.context, A = n.contextType;
        c = Ca, typeof A == "object" && A !== null && (c = te(A));
        var w = n.getDerivedStateFromProps;
        A = typeof w == "function" || typeof s.getSnapshotBeforeUpdate == "function", h = e.pendingProps !== h, A || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (h || f !== c) && eu(e, s, l, c), Hn = false;
        var v = e.memoizedState;
        s.state = v, yl(e, l, s, i), fl(), f = e.memoizedState, h || v !== f || Hn ? (typeof w == "function" && (Kc(e, n, w, l), f = e.memoizedState), (r = Hn || tu(e, n, r, l, v, f, c)) ? (A || typeof s.UNSAFE_componentWillMount != "function" && typeof s.componentWillMount != "function" || (typeof s.componentWillMount == "function" && s.componentWillMount(), typeof s.UNSAFE_componentWillMount == "function" && s.UNSAFE_componentWillMount()), typeof s.componentDidMount == "function" && (e.flags |= 4194308)) : (typeof s.componentDidMount == "function" && (e.flags |= 4194308), e.memoizedProps = l, e.memoizedState = f), s.props = l, s.state = f, s.context = c, l = r) : (typeof s.componentDidMount == "function" && (e.flags |= 4194308), l = false);
      } else {
        s = e.stateNode, gc(t, e), c = e.memoizedProps, A = la(n, c), s.props = A, w = e.pendingProps, v = s.context, f = n.contextType, r = Ca, typeof f == "object" && f !== null && (r = te(f)), h = n.getDerivedStateFromProps, (f = typeof h == "function" || typeof s.getSnapshotBeforeUpdate == "function") || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (c !== w || v !== r) && eu(e, s, l, r), Hn = false, v = e.memoizedState, s.state = v, yl(e, l, s, i), fl();
        var N = e.memoizedState;
        c !== w || v !== N || Hn || t !== null && t.dependencies !== null && pi(t.dependencies) ? (typeof h == "function" && (Kc(e, n, h, l), N = e.memoizedState), (A = Hn || tu(e, n, A, l, v, N, r) || t !== null && t.dependencies !== null && pi(t.dependencies)) ? (f || typeof s.UNSAFE_componentWillUpdate != "function" && typeof s.componentWillUpdate != "function" || (typeof s.componentWillUpdate == "function" && s.componentWillUpdate(l, N, r), typeof s.UNSAFE_componentWillUpdate == "function" && s.UNSAFE_componentWillUpdate(l, N, r)), typeof s.componentDidUpdate == "function" && (e.flags |= 4), typeof s.getSnapshotBeforeUpdate == "function" && (e.flags |= 1024)) : (typeof s.componentDidUpdate != "function" || c === t.memoizedProps && v === t.memoizedState || (e.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || c === t.memoizedProps && v === t.memoizedState || (e.flags |= 1024), e.memoizedProps = l, e.memoizedState = N), s.props = l, s.state = N, s.context = r, l = A) : (typeof s.componentDidUpdate != "function" || c === t.memoizedProps && v === t.memoizedState || (e.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || c === t.memoizedProps && v === t.memoizedState || (e.flags |= 1024), l = false);
      }
      return s = l, Di(t, e), l = (e.flags & 128) !== 0, s || l ? (s = e.stateNode, n = l && typeof n.getDerivedStateFromError != "function" ? null : s.render(), e.flags |= 1, t !== null && l ? (e.child = na(e, t.child, null, i), e.child = na(e, null, n, i)) : ee(t, e, n, i), e.memoizedState = s.state, t = e.child) : t = sn(t, e, i), t;
    }
    function pu(t, e, n, l) {
      return $n(), e.flags |= 256, ee(t, e, n, l), e.child;
    }
    var Pc = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
    function Uc(t) {
      return { baseLanes: t, cachePool: ir() };
    }
    function Yc(t, e, n) {
      return t = t !== null ? t.childLanes & ~n : 0, e && (t |= Oe), t;
    }
    function bu(t, e, n) {
      var l = e.pendingProps, i = false, s = (e.flags & 128) !== 0, c;
      if ((c = s) || (c = t !== null && t.memoizedState === null ? false : (zt.current & 2) !== 0), c && (i = true, e.flags &= -129), c = (e.flags & 32) !== 0, e.flags &= -33, t === null) {
        if (mt) {
          if (i ? kn(e) : An(), (t = Mt) ? (t = Td(t, Ee), t = t !== null && t.data !== "&" ? t : null, t !== null && (e.memoizedState = { dehydrated: t, treeContext: vn !== null ? { id: Ve, overflow: Xe } : null, retryLane: 536870912, hydrationErrors: null }, n = $o(t), n.return = e, e.child = n, It = e, Mt = null)) : t = null, t === null) throw jn(e);
          return Oh(t) ? e.lanes = 32 : e.lanes = 536870912, null;
        }
        var h = l.children;
        return l = l.fallback, i ? (An(), i = e.mode, h = Li({ mode: "hidden", children: h }, i), l = Jn(l, i, n, null), h.return = e, l.return = e, h.sibling = l, e.child = h, l = e.child, l.memoizedState = Uc(n), l.childLanes = Yc(t, c, n), e.memoizedState = Pc, Hl(null, l)) : (kn(e), Vc(e, h));
      }
      var r = t.memoizedState;
      if (r !== null && (h = r.dehydrated, h !== null)) {
        if (s) e.flags & 256 ? (kn(e), e.flags &= -257, e = Xc(t, e, n)) : e.memoizedState !== null ? (An(), e.child = t.child, e.flags |= 128, e = null) : (An(), h = l.fallback, i = e.mode, l = Li({ mode: "visible", children: l.children }, i), h = Jn(h, i, n, null), h.flags |= 2, l.return = e, h.return = e, l.sibling = h, e.child = l, na(e, t.child, null, n), l = e.child, l.memoizedState = Uc(n), l.childLanes = Yc(t, c, n), e.memoizedState = Pc, e = Hl(null, l));
        else if (kn(e), Oh(h)) {
          if (c = h.nextSibling && h.nextSibling.dataset, c) var f = c.dgst;
          c = f, l = Error(o(419)), l.stack = "", l.digest = c, dl({ value: l, source: null, stack: null }), e = Xc(t, e, n);
        } else if (Vt || ka(t, e, n, false), c = (n & t.childLanes) !== 0, Vt || c) {
          if (c = At, c !== null && (l = no(c, n), l !== 0 && l !== r.retryLane)) throw r.retryLane = l, Zn(t, l), be(c, t, l), Rc;
          Th(h) || Vi(), e = Xc(t, e, n);
        } else Th(h) ? (e.flags |= 192, e.child = t.child, e = null) : (t = r.treeContext, Mt = Le(h.nextSibling), It = e, mt = true, Nn = null, Ee = false, t !== null && Io(e, t), e = Vc(e, l.children), e.flags |= 4096);
        return e;
      }
      return i ? (An(), h = l.fallback, i = e.mode, r = t.child, f = r.sibling, l = Ie(r, { mode: "hidden", children: l.children }), l.subtreeFlags = r.subtreeFlags & 65011712, f !== null ? h = Ie(f, h) : (h = Jn(h, i, n, null), h.flags |= 2), h.return = e, l.return = e, l.sibling = h, e.child = l, Hl(null, l), l = e.child, h = t.child.memoizedState, h === null ? h = Uc(n) : (i = h.cachePool, i !== null ? (r = Ut._currentValue, i = i.parent !== r ? { parent: r, pool: r } : i) : i = ir(), h = { baseLanes: h.baseLanes | n, cachePool: i }), l.memoizedState = h, l.childLanes = Yc(t, c, n), e.memoizedState = Pc, Hl(t.child, l)) : (kn(e), n = t.child, t = n.sibling, n = Ie(n, { mode: "visible", children: l.children }), n.return = e, n.sibling = null, t !== null && (c = e.deletions, c === null ? (e.deletions = [t], e.flags |= 16) : c.push(t)), e.child = n, e.memoizedState = null, n);
    }
    function Vc(t, e) {
      return e = Li({ mode: "visible", children: e }, t.mode), e.return = t, t.child = e;
    }
    function Li(t, e) {
      return t = je(22, t, null, e), t.lanes = 0, t;
    }
    function Xc(t, e, n) {
      return na(e, t.child, null, n), t = Vc(e, e.pendingProps.children), t.flags |= 2, e.memoizedState = null, t;
    }
    function fu(t, e, n) {
      t.lanes |= e;
      var l = t.alternate;
      l !== null && (l.lanes |= e), cc(t.return, e, n);
    }
    function Qc(t, e, n, l, i, s) {
      var c = t.memoizedState;
      c === null ? t.memoizedState = { isBackwards: e, rendering: null, renderingStartTime: 0, last: l, tail: n, tailMode: i, treeForkCount: s } : (c.isBackwards = e, c.rendering = null, c.renderingStartTime = 0, c.last = l, c.tail = n, c.tailMode = i, c.treeForkCount = s);
    }
    function yu(t, e, n) {
      var l = e.pendingProps, i = l.revealOrder, s = l.tail;
      l = l.children;
      var c = zt.current, h = (c & 2) !== 0;
      if (h ? (c = c & 1 | 2, e.flags |= 128) : c &= 1, z(zt, c), ee(t, e, l, n), l = mt ? ul : 0, !h && t !== null && (t.flags & 128) !== 0) t: for (t = e.child; t !== null; ) {
        if (t.tag === 13) t.memoizedState !== null && fu(t, n, e);
        else if (t.tag === 19) fu(t, n, e);
        else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === e) break t;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) break t;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
      switch (i) {
        case "forwards":
          for (n = e.child, i = null; n !== null; ) t = n.alternate, t !== null && Hi(t) === null && (i = n), n = n.sibling;
          n = i, n === null ? (i = e.child, e.child = null) : (i = n.sibling, n.sibling = null), Qc(e, false, i, n, s, l);
          break;
        case "backwards":
        case "unstable_legacy-backwards":
          for (n = null, i = e.child, e.child = null; i !== null; ) {
            if (t = i.alternate, t !== null && Hi(t) === null) {
              e.child = i;
              break;
            }
            t = i.sibling, i.sibling = n, n = i, i = t;
          }
          Qc(e, true, n, null, s, l);
          break;
        case "together":
          Qc(e, false, null, null, void 0, l);
          break;
        default:
          e.memoizedState = null;
      }
      return e.child;
    }
    function sn(t, e, n) {
      if (t !== null && (e.dependencies = t.dependencies), Mn |= e.lanes, (n & e.childLanes) === 0) if (t !== null) {
        if (ka(t, e, n, false), (n & e.childLanes) === 0) return null;
      } else return null;
      if (t !== null && e.child !== t.child) throw Error(o(153));
      if (e.child !== null) {
        for (t = e.child, n = Ie(t, t.pendingProps), e.child = n, n.return = e; t.sibling !== null; ) t = t.sibling, n = n.sibling = Ie(t, t.pendingProps), n.return = e;
        n.sibling = null;
      }
      return e.child;
    }
    function Zc(t, e) {
      return (t.lanes & e) !== 0 ? true : (t = t.dependencies, !!(t !== null && pi(t)));
    }
    function Rg(t, e, n) {
      switch (e.tag) {
        case 3:
          kt(e, e.stateNode.containerInfo), Cn(e, Ut, t.memoizedState.cache), $n();
          break;
        case 27:
        case 5:
          se(e);
          break;
        case 4:
          kt(e, e.stateNode.containerInfo);
          break;
        case 10:
          Cn(e, e.type, e.memoizedProps.value);
          break;
        case 31:
          if (e.memoizedState !== null) return e.flags |= 128, yc(e), null;
          break;
        case 13:
          var l = e.memoizedState;
          if (l !== null) return l.dehydrated !== null ? (kn(e), e.flags |= 128, null) : (n & e.child.childLanes) !== 0 ? bu(t, e, n) : (kn(e), t = sn(t, e, n), t !== null ? t.sibling : null);
          kn(e);
          break;
        case 19:
          var i = (t.flags & 128) !== 0;
          if (l = (n & e.childLanes) !== 0, l || (ka(t, e, n, false), l = (n & e.childLanes) !== 0), i) {
            if (l) return yu(t, e, n);
            e.flags |= 128;
          }
          if (i = e.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), z(zt, zt.current), l) break;
          return null;
        case 22:
          return e.lanes = 0, uu(t, e, n, e.pendingProps);
        case 24:
          Cn(e, Ut, t.memoizedState.cache);
      }
      return sn(t, e, n);
    }
    function vu(t, e, n) {
      if (t !== null) if (t.memoizedProps !== e.pendingProps) Vt = true;
      else {
        if (!Zc(t, n) && (e.flags & 128) === 0) return Vt = false, Rg(t, e, n);
        Vt = (t.flags & 131072) !== 0;
      }
      else Vt = false, mt && (e.flags & 1048576) !== 0 && Wo(e, ul, e.index);
      switch (e.lanes = 0, e.tag) {
        case 16:
          t: {
            var l = e.pendingProps;
            if (t = ta(e.elementType), e.type = t, typeof t == "function") Is(t) ? (l = la(t, l), e.tag = 1, e = xu(null, e, t, l, n)) : (e.tag = 0, e = qc(null, e, t, l, n));
            else {
              if (t != null) {
                var i = t.$$typeof;
                if (i === tt) {
                  e.tag = 11, e = hu(null, e, t, l, n);
                  break t;
                } else if (i === L) {
                  e.tag = 14, e = ou(null, e, t, l, n);
                  break t;
                }
              }
              throw e = ae(t) || t, Error(o(306, e, ""));
            }
          }
          return e;
        case 0:
          return qc(t, e, e.type, e.pendingProps, n);
        case 1:
          return l = e.type, i = la(l, e.pendingProps), xu(t, e, l, i, n);
        case 3:
          t: {
            if (kt(e, e.stateNode.containerInfo), t === null) throw Error(o(387));
            l = e.pendingProps;
            var s = e.memoizedState;
            i = s.element, gc(t, e), yl(e, l, null, n);
            var c = e.memoizedState;
            if (l = c.cache, Cn(e, Ut, l), l !== s.cache && hc(e, [Ut], n, true), fl(), l = c.element, s.isDehydrated) if (s = { element: l, isDehydrated: false, cache: c.cache }, e.updateQueue.baseState = s, e.memoizedState = s, e.flags & 256) {
              e = pu(t, e, l, n);
              break t;
            } else if (l !== i) {
              i = Me(Error(o(424)), e), dl(i), e = pu(t, e, l, n);
              break t;
            } else {
              switch (t = e.stateNode.containerInfo, t.nodeType) {
                case 9:
                  t = t.body;
                  break;
                default:
                  t = t.nodeName === "HTML" ? t.ownerDocument.body : t;
              }
              for (Mt = Le(t.firstChild), It = e, mt = true, Nn = null, Ee = true, n = ur(e, null, l, n), e.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
            }
            else {
              if ($n(), l === i) {
                e = sn(t, e, n);
                break t;
              }
              ee(t, e, l, n);
            }
            e = e.child;
          }
          return e;
        case 26:
          return Di(t, e), t === null ? (n = Md(e.type, null, e.pendingProps, null)) ? e.memoizedState = n : mt || (n = e.type, t = e.pendingProps, l = Wi(I.current).createElement(n), l[Wt] = e, l[ue] = t, ne(l, n, t), Jt(l), e.stateNode = l) : e.memoizedState = Md(e.type, t.memoizedProps, e.pendingProps, t.memoizedState), null;
        case 27:
          return se(e), t === null && mt && (l = e.stateNode = Ad(e.type, e.pendingProps, I.current), It = e, Ee = true, i = Mt, Ln(e.type) ? (kh = i, Mt = Le(l.firstChild)) : Mt = i), ee(t, e, e.pendingProps.children, n), Di(t, e), t === null && (e.flags |= 4194304), e.child;
        case 5:
          return t === null && mt && ((i = l = Mt) && (l = p0(l, e.type, e.pendingProps, Ee), l !== null ? (e.stateNode = l, It = e, Mt = Le(l.firstChild), Ee = false, i = true) : i = false), i || jn(e)), se(e), i = e.type, s = e.pendingProps, c = t !== null ? t.memoizedProps : null, l = s.children, jh(i, s) ? l = null : c !== null && jh(i, c) && (e.flags |= 32), e.memoizedState !== null && (i = Nc(t, e, Mg, null, null, n), zl._currentValue = i), Di(t, e), ee(t, e, l, n), e.child;
        case 6:
          return t === null && mt && ((t = n = Mt) && (n = b0(n, e.pendingProps, Ee), n !== null ? (e.stateNode = n, It = e, Mt = null, t = true) : t = false), t || jn(e)), null;
        case 13:
          return bu(t, e, n);
        case 4:
          return kt(e, e.stateNode.containerInfo), l = e.pendingProps, t === null ? e.child = na(e, null, l, n) : ee(t, e, l, n), e.child;
        case 11:
          return hu(t, e, e.type, e.pendingProps, n);
        case 7:
          return ee(t, e, e.pendingProps, n), e.child;
        case 8:
          return ee(t, e, e.pendingProps.children, n), e.child;
        case 12:
          return ee(t, e, e.pendingProps.children, n), e.child;
        case 10:
          return l = e.pendingProps, Cn(e, e.type, l.value), ee(t, e, l.children, n), e.child;
        case 9:
          return i = e.type._context, l = e.pendingProps.children, Wn(e), i = te(i), l = l(i), e.flags |= 1, ee(t, e, l, n), e.child;
        case 14:
          return ou(t, e, e.type, e.pendingProps, n);
        case 15:
          return ru(t, e, e.type, e.pendingProps, n);
        case 19:
          return yu(t, e, n);
        case 31:
          return zg(t, e, n);
        case 22:
          return uu(t, e, n, e.pendingProps);
        case 24:
          return Wn(e), l = te(Ut), t === null ? (i = uc(), i === null && (i = At, s = oc(), i.pooledCache = s, s.refCount++, s !== null && (i.pooledCacheLanes |= n), i = s), e.memoizedState = { parent: l, cache: i }, mc(e), Cn(e, Ut, i)) : ((t.lanes & n) !== 0 && (gc(t, e), yl(e, null, null, n), fl()), i = t.memoizedState, s = e.memoizedState, i.parent !== l ? (i = { parent: l, cache: l }, e.memoizedState = i, e.lanes === 0 && (e.memoizedState = e.updateQueue.baseState = i), Cn(e, Ut, l)) : (l = s.cache, Cn(e, Ut, l), l !== i.cache && hc(e, [Ut], n, true))), ee(t, e, e.pendingProps.children, n), e.child;
        case 29:
          throw e.pendingProps;
      }
      throw Error(o(156, e.tag));
    }
    function cn(t) {
      t.flags |= 4;
    }
    function Jc(t, e, n, l, i) {
      if ((e = (t.mode & 32) !== 0) && (e = false), e) {
        if (t.flags |= 16777216, (i & 335544128) === i) if (t.stateNode.complete) t.flags |= 8192;
        else if (Qu()) t.flags |= 8192;
        else throw ea = vi, dc;
      } else t.flags &= -16777217;
    }
    function Nu(t, e) {
      if (e.type !== "stylesheet" || (e.state.loading & 4) !== 0) t.flags &= -16777217;
      else if (t.flags |= 16777216, !Ld(e)) if (Qu()) t.flags |= 8192;
      else throw ea = vi, dc;
    }
    function Ki(t, e) {
      e !== null && (t.flags |= 4), t.flags & 16384 && (e = t.tag !== 22 ? Ih() : 536870912, t.lanes |= e, za |= e);
    }
    function Tl(t, e) {
      if (!mt) switch (t.tailMode) {
        case "hidden":
          e = t.tail;
          for (var n = null; e !== null; ) e.alternate !== null && (n = e), e = e.sibling;
          n === null ? t.tail = null : n.sibling = null;
          break;
        case "collapsed":
          n = t.tail;
          for (var l = null; n !== null; ) n.alternate !== null && (l = n), n = n.sibling;
          l === null ? e || t.tail === null ? t.tail = null : t.tail.sibling = null : l.sibling = null;
      }
    }
    function Bt(t) {
      var e = t.alternate !== null && t.alternate.child === t.child, n = 0, l = 0;
      if (e) for (var i = t.child; i !== null; ) n |= i.lanes | i.childLanes, l |= i.subtreeFlags & 65011712, l |= i.flags & 65011712, i.return = t, i = i.sibling;
      else for (i = t.child; i !== null; ) n |= i.lanes | i.childLanes, l |= i.subtreeFlags, l |= i.flags, i.return = t, i = i.sibling;
      return t.subtreeFlags |= l, t.childLanes = n, e;
    }
    function qg(t, e, n) {
      var l = e.pendingProps;
      switch (ac(e), e.tag) {
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
          return Bt(e), null;
        case 1:
          return Bt(e), null;
        case 3:
          return n = e.stateNode, l = null, t !== null && (l = t.memoizedState.cache), e.memoizedState.cache !== l && (e.flags |= 2048), nn(Ut), vt(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (t === null || t.child === null) && (Oa(e) ? cn(e) : t === null || t.memoizedState.isDehydrated && (e.flags & 256) === 0 || (e.flags |= 1024, ic())), Bt(e), null;
        case 26:
          var i = e.type, s = e.memoizedState;
          return t === null ? (cn(e), s !== null ? (Bt(e), Nu(e, s)) : (Bt(e), Jc(e, i, null, l, n))) : s ? s !== t.memoizedState ? (cn(e), Bt(e), Nu(e, s)) : (Bt(e), e.flags &= -16777217) : (t = t.memoizedProps, t !== l && cn(e), Bt(e), Jc(e, i, t, l, n)), null;
        case 27:
          if (re(e), n = I.current, i = e.type, t !== null && e.stateNode != null) t.memoizedProps !== l && cn(e);
          else {
            if (!l) {
              if (e.stateNode === null) throw Error(o(166));
              return Bt(e), null;
            }
            t = q.current, Oa(e) ? tr(e) : (t = Ad(i, l, n), e.stateNode = t, cn(e));
          }
          return Bt(e), null;
        case 5:
          if (re(e), i = e.type, t !== null && e.stateNode != null) t.memoizedProps !== l && cn(e);
          else {
            if (!l) {
              if (e.stateNode === null) throw Error(o(166));
              return Bt(e), null;
            }
            if (s = q.current, Oa(e)) tr(e);
            else {
              var c = Wi(I.current);
              switch (s) {
                case 1:
                  s = c.createElementNS("http://www.w3.org/2000/svg", i);
                  break;
                case 2:
                  s = c.createElementNS("http://www.w3.org/1998/Math/MathML", i);
                  break;
                default:
                  switch (i) {
                    case "svg":
                      s = c.createElementNS("http://www.w3.org/2000/svg", i);
                      break;
                    case "math":
                      s = c.createElementNS("http://www.w3.org/1998/Math/MathML", i);
                      break;
                    case "script":
                      s = c.createElement("div"), s.innerHTML = "<script><\/script>", s = s.removeChild(s.firstChild);
                      break;
                    case "select":
                      s = typeof l.is == "string" ? c.createElement("select", { is: l.is }) : c.createElement("select"), l.multiple ? s.multiple = true : l.size && (s.size = l.size);
                      break;
                    default:
                      s = typeof l.is == "string" ? c.createElement(i, { is: l.is }) : c.createElement(i);
                  }
              }
              s[Wt] = e, s[ue] = l;
              t: for (c = e.child; c !== null; ) {
                if (c.tag === 5 || c.tag === 6) s.appendChild(c.stateNode);
                else if (c.tag !== 4 && c.tag !== 27 && c.child !== null) {
                  c.child.return = c, c = c.child;
                  continue;
                }
                if (c === e) break t;
                for (; c.sibling === null; ) {
                  if (c.return === null || c.return === e) break t;
                  c = c.return;
                }
                c.sibling.return = c.return, c = c.sibling;
              }
              e.stateNode = s;
              t: switch (ne(s, i, l), i) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  l = !!l.autoFocus;
                  break t;
                case "img":
                  l = true;
                  break t;
                default:
                  l = false;
              }
              l && cn(e);
            }
          }
          return Bt(e), Jc(e, e.type, t === null ? null : t.memoizedProps, e.pendingProps, n), null;
        case 6:
          if (t && e.stateNode != null) t.memoizedProps !== l && cn(e);
          else {
            if (typeof l != "string" && e.stateNode === null) throw Error(o(166));
            if (t = I.current, Oa(e)) {
              if (t = e.stateNode, n = e.memoizedProps, l = null, i = It, i !== null) switch (i.tag) {
                case 27:
                case 5:
                  l = i.memoizedProps;
              }
              t[Wt] = e, t = !!(t.nodeValue === n || l !== null && l.suppressHydrationWarning === true || bd(t.nodeValue, n)), t || jn(e, true);
            } else t = Wi(t).createTextNode(l), t[Wt] = e, e.stateNode = t;
          }
          return Bt(e), null;
        case 31:
          if (n = e.memoizedState, t === null || t.memoizedState !== null) {
            if (l = Oa(e), n !== null) {
              if (t === null) {
                if (!l) throw Error(o(318));
                if (t = e.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(o(557));
                t[Wt] = e;
              } else $n(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
              Bt(e), t = false;
            } else n = ic(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = n), t = true;
            if (!t) return e.flags & 256 ? (He(e), e) : (He(e), null);
            if ((e.flags & 128) !== 0) throw Error(o(558));
          }
          return Bt(e), null;
        case 13:
          if (l = e.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
            if (i = Oa(e), l !== null && l.dehydrated !== null) {
              if (t === null) {
                if (!i) throw Error(o(318));
                if (i = e.memoizedState, i = i !== null ? i.dehydrated : null, !i) throw Error(o(317));
                i[Wt] = e;
              } else $n(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
              Bt(e), i = false;
            } else i = ic(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = i), i = true;
            if (!i) return e.flags & 256 ? (He(e), e) : (He(e), null);
          }
          return He(e), (e.flags & 128) !== 0 ? (e.lanes = n, e) : (n = l !== null, t = t !== null && t.memoizedState !== null, n && (l = e.child, i = null, l.alternate !== null && l.alternate.memoizedState !== null && l.alternate.memoizedState.cachePool !== null && (i = l.alternate.memoizedState.cachePool.pool), s = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (s = l.memoizedState.cachePool.pool), s !== i && (l.flags |= 2048)), n !== t && n && (e.child.flags |= 8192), Ki(e, e.updateQueue), Bt(e), null);
        case 4:
          return vt(), t === null && bh(e.stateNode.containerInfo), Bt(e), null;
        case 10:
          return nn(e.type), Bt(e), null;
        case 19:
          if (M(zt), l = e.memoizedState, l === null) return Bt(e), null;
          if (i = (e.flags & 128) !== 0, s = l.rendering, s === null) if (i) Tl(l, false);
          else {
            if (_t !== 0 || t !== null && (t.flags & 128) !== 0) for (t = e.child; t !== null; ) {
              if (s = Hi(t), s !== null) {
                for (e.flags |= 128, Tl(l, false), t = s.updateQueue, e.updateQueue = t, Ki(e, t), e.subtreeFlags = 0, t = n, n = e.child; n !== null; ) Jo(n, t), n = n.sibling;
                return z(zt, zt.current & 1 | 2), mt && tn(e, l.treeForkCount), e.child;
              }
              t = t.sibling;
            }
            l.tail !== null && he() > Pi && (e.flags |= 128, i = true, Tl(l, false), e.lanes = 4194304);
          }
          else {
            if (!i) if (t = Hi(s), t !== null) {
              if (e.flags |= 128, i = true, t = t.updateQueue, e.updateQueue = t, Ki(e, t), Tl(l, true), l.tail === null && l.tailMode === "hidden" && !s.alternate && !mt) return Bt(e), null;
            } else 2 * he() - l.renderingStartTime > Pi && n !== 536870912 && (e.flags |= 128, i = true, Tl(l, false), e.lanes = 4194304);
            l.isBackwards ? (s.sibling = e.child, e.child = s) : (t = l.last, t !== null ? t.sibling = s : e.child = s, l.last = s);
          }
          return l.tail !== null ? (t = l.tail, l.rendering = t, l.tail = t.sibling, l.renderingStartTime = he(), t.sibling = null, n = zt.current, z(zt, i ? n & 1 | 2 : n & 1), mt && tn(e, l.treeForkCount), t) : (Bt(e), null);
        case 22:
        case 23:
          return He(e), fc(), l = e.memoizedState !== null, t !== null ? t.memoizedState !== null !== l && (e.flags |= 8192) : l && (e.flags |= 8192), l ? (n & 536870912) !== 0 && (e.flags & 128) === 0 && (Bt(e), e.subtreeFlags & 6 && (e.flags |= 8192)) : Bt(e), n = e.updateQueue, n !== null && Ki(e, n.retryQueue), n = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (n = t.memoizedState.cachePool.pool), l = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), l !== n && (e.flags |= 2048), t !== null && M(In), null;
        case 24:
          return n = null, t !== null && (n = t.memoizedState.cache), e.memoizedState.cache !== n && (e.flags |= 2048), nn(Ut), Bt(e), null;
        case 25:
          return null;
        case 30:
          return null;
      }
      throw Error(o(156, e.tag));
    }
    function Pg(t, e) {
      switch (ac(e), e.tag) {
        case 1:
          return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
        case 3:
          return nn(Ut), vt(), t = e.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (e.flags = t & -65537 | 128, e) : null;
        case 26:
        case 27:
        case 5:
          return re(e), null;
        case 31:
          if (e.memoizedState !== null) {
            if (He(e), e.alternate === null) throw Error(o(340));
            $n();
          }
          return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
        case 13:
          if (He(e), t = e.memoizedState, t !== null && t.dehydrated !== null) {
            if (e.alternate === null) throw Error(o(340));
            $n();
          }
          return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
        case 19:
          return M(zt), null;
        case 4:
          return vt(), null;
        case 10:
          return nn(e.type), null;
        case 22:
        case 23:
          return He(e), fc(), t !== null && M(In), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
        case 24:
          return nn(Ut), null;
        case 25:
          return null;
        default:
          return null;
      }
    }
    function ju(t, e) {
      switch (ac(e), e.tag) {
        case 3:
          nn(Ut), vt();
          break;
        case 26:
        case 27:
        case 5:
          re(e);
          break;
        case 4:
          vt();
          break;
        case 31:
          e.memoizedState !== null && He(e);
          break;
        case 13:
          He(e);
          break;
        case 19:
          M(zt);
          break;
        case 10:
          nn(e.type);
          break;
        case 22:
        case 23:
          He(e), fc(), t !== null && M(In);
          break;
        case 24:
          nn(Ut);
      }
    }
    function Ol(t, e) {
      try {
        var n = e.updateQueue, l = n !== null ? n.lastEffect : null;
        if (l !== null) {
          var i = l.next;
          n = i;
          do {
            if ((n.tag & t) === t) {
              l = void 0;
              var s = n.create, c = n.inst;
              l = s(), c.destroy = l;
            }
            n = n.next;
          } while (n !== i);
        }
      } catch (h) {
        jt(e, e.return, h);
      }
    }
    function Sn(t, e, n) {
      try {
        var l = e.updateQueue, i = l !== null ? l.lastEffect : null;
        if (i !== null) {
          var s = i.next;
          l = s;
          do {
            if ((l.tag & t) === t) {
              var c = l.inst, h = c.destroy;
              if (h !== void 0) {
                c.destroy = void 0, i = e;
                var r = n, f = h;
                try {
                  f();
                } catch (A) {
                  jt(i, r, A);
                }
              }
            }
            l = l.next;
          } while (l !== s);
        }
      } catch (A) {
        jt(e, e.return, A);
      }
    }
    function Cu(t) {
      var e = t.updateQueue;
      if (e !== null) {
        var n = t.stateNode;
        try {
          mr(e, n);
        } catch (l) {
          jt(t, t.return, l);
        }
      }
    }
    function Hu(t, e, n) {
      n.props = la(t.type, t.memoizedProps), n.state = t.memoizedState;
      try {
        n.componentWillUnmount();
      } catch (l) {
        jt(t, e, l);
      }
    }
    function kl(t, e) {
      try {
        var n = t.ref;
        if (n !== null) {
          switch (t.tag) {
            case 26:
            case 27:
            case 5:
              var l = t.stateNode;
              break;
            case 30:
              l = t.stateNode;
              break;
            default:
              l = t.stateNode;
          }
          typeof n == "function" ? t.refCleanup = n(l) : n.current = l;
        }
      } catch (i) {
        jt(t, e, i);
      }
    }
    function Qe(t, e) {
      var n = t.ref, l = t.refCleanup;
      if (n !== null) if (typeof l == "function") try {
        l();
      } catch (i) {
        jt(t, e, i);
      } finally {
        t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
      }
      else if (typeof n == "function") try {
        n(null);
      } catch (i) {
        jt(t, e, i);
      }
      else n.current = null;
    }
    function Tu(t) {
      var e = t.type, n = t.memoizedProps, l = t.stateNode;
      try {
        t: switch (e) {
          case "button":
          case "input":
          case "select":
          case "textarea":
            n.autoFocus && l.focus();
            break t;
          case "img":
            n.src ? l.src = n.src : n.srcSet && (l.srcset = n.srcSet);
        }
      } catch (i) {
        jt(t, t.return, i);
      }
    }
    function $c(t, e, n) {
      try {
        var l = t.stateNode;
        r0(l, t.type, n, e), l[ue] = e;
      } catch (i) {
        jt(t, t.return, i);
      }
    }
    function Ou(t) {
      return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && Ln(t.type) || t.tag === 4;
    }
    function Fc(t) {
      t: for (; ; ) {
        for (; t.sibling === null; ) {
          if (t.return === null || Ou(t.return)) return null;
          t = t.return;
        }
        for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
          if (t.tag === 27 && Ln(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
          t.child.return = t, t = t.child;
        }
        if (!(t.flags & 2)) return t.stateNode;
      }
    }
    function Wc(t, e, n) {
      var l = t.tag;
      if (l === 5 || l === 6) t = t.stateNode, e ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(t, e) : (e = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, e.appendChild(t), n = n._reactRootContainer, n != null || e.onclick !== null || (e.onclick = Fe));
      else if (l !== 4 && (l === 27 && Ln(t.type) && (n = t.stateNode, e = null), t = t.child, t !== null)) for (Wc(t, e, n), t = t.sibling; t !== null; ) Wc(t, e, n), t = t.sibling;
    }
    function _i(t, e, n) {
      var l = t.tag;
      if (l === 5 || l === 6) t = t.stateNode, e ? n.insertBefore(t, e) : n.appendChild(t);
      else if (l !== 4 && (l === 27 && Ln(t.type) && (n = t.stateNode), t = t.child, t !== null)) for (_i(t, e, n), t = t.sibling; t !== null; ) _i(t, e, n), t = t.sibling;
    }
    function ku(t) {
      var e = t.stateNode, n = t.memoizedProps;
      try {
        for (var l = t.type, i = e.attributes; i.length; ) e.removeAttributeNode(i[0]);
        ne(e, l, n), e[Wt] = t, e[ue] = n;
      } catch (s) {
        jt(t, t.return, s);
      }
    }
    var hn = false, Xt = false, Ic = false, Au = typeof WeakSet == "function" ? WeakSet : Set, $t = null;
    function Ug(t, e) {
      if (t = t.containerInfo, vh = is, t = Ro(t), Xs(t)) {
        if ("selectionStart" in t) var n = { start: t.selectionStart, end: t.selectionEnd };
        else t: {
          n = (n = t.ownerDocument) && n.defaultView || window;
          var l = n.getSelection && n.getSelection();
          if (l && l.rangeCount !== 0) {
            n = l.anchorNode;
            var i = l.anchorOffset, s = l.focusNode;
            l = l.focusOffset;
            try {
              n.nodeType, s.nodeType;
            } catch {
              n = null;
              break t;
            }
            var c = 0, h = -1, r = -1, f = 0, A = 0, w = t, v = null;
            e: for (; ; ) {
              for (var N; w !== n || i !== 0 && w.nodeType !== 3 || (h = c + i), w !== s || l !== 0 && w.nodeType !== 3 || (r = c + l), w.nodeType === 3 && (c += w.nodeValue.length), (N = w.firstChild) !== null; ) v = w, w = N;
              for (; ; ) {
                if (w === t) break e;
                if (v === n && ++f === i && (h = c), v === s && ++A === l && (r = c), (N = w.nextSibling) !== null) break;
                w = v, v = w.parentNode;
              }
              w = N;
            }
            n = h === -1 || r === -1 ? null : { start: h, end: r };
          } else n = null;
        }
        n = n || { start: 0, end: 0 };
      } else n = null;
      for (Nh = { focusedElem: t, selectionRange: n }, is = false, $t = e; $t !== null; ) if (e = $t, t = e.child, (e.subtreeFlags & 1028) !== 0 && t !== null) t.return = e, $t = t;
      else for (; $t !== null; ) {
        switch (e = $t, s = e.alternate, t = e.flags, e.tag) {
          case 0:
            if ((t & 4) !== 0 && (t = e.updateQueue, t = t !== null ? t.events : null, t !== null)) for (n = 0; n < t.length; n++) i = t[n], i.ref.impl = i.nextImpl;
            break;
          case 11:
          case 15:
            break;
          case 1:
            if ((t & 1024) !== 0 && s !== null) {
              t = void 0, n = e, i = s.memoizedProps, s = s.memoizedState, l = n.stateNode;
              try {
                var V = la(n.type, i);
                t = l.getSnapshotBeforeUpdate(V, s), l.__reactInternalSnapshotBeforeUpdate = t;
              } catch (W) {
                jt(n, n.return, W);
              }
            }
            break;
          case 3:
            if ((t & 1024) !== 0) {
              if (t = e.stateNode.containerInfo, n = t.nodeType, n === 9) Hh(t);
              else if (n === 1) switch (t.nodeName) {
                case "HEAD":
                case "HTML":
                case "BODY":
                  Hh(t);
                  break;
                default:
                  t.textContent = "";
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
          default:
            if ((t & 1024) !== 0) throw Error(o(163));
        }
        if (t = e.sibling, t !== null) {
          t.return = e.return, $t = t;
          break;
        }
        $t = e.return;
      }
    }
    function Su(t, e, n) {
      var l = n.flags;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          rn(t, n), l & 4 && Ol(5, n);
          break;
        case 1:
          if (rn(t, n), l & 4) if (t = n.stateNode, e === null) try {
            t.componentDidMount();
          } catch (c) {
            jt(n, n.return, c);
          }
          else {
            var i = la(n.type, e.memoizedProps);
            e = e.memoizedState;
            try {
              t.componentDidUpdate(i, e, t.__reactInternalSnapshotBeforeUpdate);
            } catch (c) {
              jt(n, n.return, c);
            }
          }
          l & 64 && Cu(n), l & 512 && kl(n, n.return);
          break;
        case 3:
          if (rn(t, n), l & 64 && (t = n.updateQueue, t !== null)) {
            if (e = null, n.child !== null) switch (n.child.tag) {
              case 27:
              case 5:
                e = n.child.stateNode;
                break;
              case 1:
                e = n.child.stateNode;
            }
            try {
              mr(t, e);
            } catch (c) {
              jt(n, n.return, c);
            }
          }
          break;
        case 27:
          e === null && l & 4 && ku(n);
        case 26:
        case 5:
          rn(t, n), e === null && l & 4 && Tu(n), l & 512 && kl(n, n.return);
          break;
        case 12:
          rn(t, n);
          break;
        case 31:
          rn(t, n), l & 4 && Bu(t, n);
          break;
        case 13:
          rn(t, n), l & 4 && Gu(t, n), l & 64 && (t = n.memoizedState, t !== null && (t = t.dehydrated, t !== null && (n = Wg.bind(null, n), f0(t, n))));
          break;
        case 22:
          if (l = n.memoizedState !== null || hn, !l) {
            e = e !== null && e.memoizedState !== null || Xt, i = hn;
            var s = Xt;
            hn = l, (Xt = e) && !s ? un(t, n, (n.subtreeFlags & 8772) !== 0) : rn(t, n), hn = i, Xt = s;
          }
          break;
        case 30:
          break;
        default:
          rn(t, n);
      }
    }
    function wu(t) {
      var e = t.alternate;
      e !== null && (t.alternate = null, wu(e)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (e = t.stateNode, e !== null && Ss(e)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
    }
    var Gt = null, me = false;
    function on(t, e, n) {
      for (n = n.child; n !== null; ) Mu(t, e, n), n = n.sibling;
    }
    function Mu(t, e, n) {
      if (ye && typeof ye.onCommitFiberUnmount == "function") try {
        ye.onCommitFiberUnmount(Fa, n);
      } catch {
      }
      switch (n.tag) {
        case 26:
          Xt || Qe(n, e), on(t, e, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode, n.parentNode.removeChild(n));
          break;
        case 27:
          Xt || Qe(n, e);
          var l = Gt, i = me;
          Ln(n.type) && (Gt = n.stateNode, me = false), on(t, e, n), Ll(n.stateNode), Gt = l, me = i;
          break;
        case 5:
          Xt || Qe(n, e);
        case 6:
          if (l = Gt, i = me, Gt = null, on(t, e, n), Gt = l, me = i, Gt !== null) if (me) try {
            (Gt.nodeType === 9 ? Gt.body : Gt.nodeName === "HTML" ? Gt.ownerDocument.body : Gt).removeChild(n.stateNode);
          } catch (s) {
            jt(n, e, s);
          }
          else try {
            Gt.removeChild(n.stateNode);
          } catch (s) {
            jt(n, e, s);
          }
          break;
        case 18:
          Gt !== null && (me ? (t = Gt, Cd(t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t, n.stateNode), Qa(t)) : Cd(Gt, n.stateNode));
          break;
        case 4:
          l = Gt, i = me, Gt = n.stateNode.containerInfo, me = true, on(t, e, n), Gt = l, me = i;
          break;
        case 0:
        case 11:
        case 14:
        case 15:
          Sn(2, n, e), Xt || Sn(4, n, e), on(t, e, n);
          break;
        case 1:
          Xt || (Qe(n, e), l = n.stateNode, typeof l.componentWillUnmount == "function" && Hu(n, e, l)), on(t, e, n);
          break;
        case 21:
          on(t, e, n);
          break;
        case 22:
          Xt = (l = Xt) || n.memoizedState !== null, on(t, e, n), Xt = l;
          break;
        default:
          on(t, e, n);
      }
    }
    function Bu(t, e) {
      if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null))) {
        t = t.dehydrated;
        try {
          Qa(t);
        } catch (n) {
          jt(e, e.return, n);
        }
      }
    }
    function Gu(t, e) {
      if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null)))) try {
        Qa(t);
      } catch (n) {
        jt(e, e.return, n);
      }
    }
    function Yg(t) {
      switch (t.tag) {
        case 31:
        case 13:
        case 19:
          var e = t.stateNode;
          return e === null && (e = t.stateNode = new Au()), e;
        case 22:
          return t = t.stateNode, e = t._retryCache, e === null && (e = t._retryCache = new Au()), e;
        default:
          throw Error(o(435, t.tag));
      }
    }
    function zi(t, e) {
      var n = Yg(t);
      e.forEach(function(l) {
        if (!n.has(l)) {
          n.add(l);
          var i = Ig.bind(null, t, l);
          l.then(i, i);
        }
      });
    }
    function ge(t, e) {
      var n = e.deletions;
      if (n !== null) for (var l = 0; l < n.length; l++) {
        var i = n[l], s = t, c = e, h = c;
        t: for (; h !== null; ) {
          switch (h.tag) {
            case 27:
              if (Ln(h.type)) {
                Gt = h.stateNode, me = false;
                break t;
              }
              break;
            case 5:
              Gt = h.stateNode, me = false;
              break t;
            case 3:
            case 4:
              Gt = h.stateNode.containerInfo, me = true;
              break t;
          }
          h = h.return;
        }
        if (Gt === null) throw Error(o(160));
        Mu(s, c, i), Gt = null, me = false, s = i.alternate, s !== null && (s.return = null), i.return = null;
      }
      if (e.subtreeFlags & 13886) for (e = e.child; e !== null; ) Eu(e, t), e = e.sibling;
    }
    var Re = null;
    function Eu(t, e) {
      var n = t.alternate, l = t.flags;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          ge(e, t), xe(t), l & 4 && (Sn(3, t, t.return), Ol(3, t), Sn(5, t, t.return));
          break;
        case 1:
          ge(e, t), xe(t), l & 512 && (Xt || n === null || Qe(n, n.return)), l & 64 && hn && (t = t.updateQueue, t !== null && (l = t.callbacks, l !== null && (n = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = n === null ? l : n.concat(l))));
          break;
        case 26:
          var i = Re;
          if (ge(e, t), xe(t), l & 512 && (Xt || n === null || Qe(n, n.return)), l & 4) {
            var s = n !== null ? n.memoizedState : null;
            if (l = t.memoizedState, n === null) if (l === null) if (t.stateNode === null) {
              t: {
                l = t.type, n = t.memoizedProps, i = i.ownerDocument || i;
                e: switch (l) {
                  case "title":
                    s = i.getElementsByTagName("title")[0], (!s || s[tl] || s[Wt] || s.namespaceURI === "http://www.w3.org/2000/svg" || s.hasAttribute("itemprop")) && (s = i.createElement(l), i.head.insertBefore(s, i.querySelector("head > title"))), ne(s, l, n), s[Wt] = t, Jt(s), l = s;
                    break t;
                  case "link":
                    var c = Ed("link", "href", i).get(l + (n.href || ""));
                    if (c) {
                      for (var h = 0; h < c.length; h++) if (s = c[h], s.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && s.getAttribute("rel") === (n.rel == null ? null : n.rel) && s.getAttribute("title") === (n.title == null ? null : n.title) && s.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
                        c.splice(h, 1);
                        break e;
                      }
                    }
                    s = i.createElement(l), ne(s, l, n), i.head.appendChild(s);
                    break;
                  case "meta":
                    if (c = Ed("meta", "content", i).get(l + (n.content || ""))) {
                      for (h = 0; h < c.length; h++) if (s = c[h], s.getAttribute("content") === (n.content == null ? null : "" + n.content) && s.getAttribute("name") === (n.name == null ? null : n.name) && s.getAttribute("property") === (n.property == null ? null : n.property) && s.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && s.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
                        c.splice(h, 1);
                        break e;
                      }
                    }
                    s = i.createElement(l), ne(s, l, n), i.head.appendChild(s);
                    break;
                  default:
                    throw Error(o(468, l));
                }
                s[Wt] = t, Jt(s), l = s;
              }
              t.stateNode = l;
            } else Dd(i, t.type, t.stateNode);
            else t.stateNode = Gd(i, l, t.memoizedProps);
            else s !== l ? (s === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : s.count--, l === null ? Dd(i, t.type, t.stateNode) : Gd(i, l, t.memoizedProps)) : l === null && t.stateNode !== null && $c(t, t.memoizedProps, n.memoizedProps);
          }
          break;
        case 27:
          ge(e, t), xe(t), l & 512 && (Xt || n === null || Qe(n, n.return)), n !== null && l & 4 && $c(t, t.memoizedProps, n.memoizedProps);
          break;
        case 5:
          if (ge(e, t), xe(t), l & 512 && (Xt || n === null || Qe(n, n.return)), t.flags & 32) {
            i = t.stateNode;
            try {
              pa(i, "");
            } catch (V) {
              jt(t, t.return, V);
            }
          }
          l & 4 && t.stateNode != null && (i = t.memoizedProps, $c(t, i, n !== null ? n.memoizedProps : i)), l & 1024 && (Ic = true);
          break;
        case 6:
          if (ge(e, t), xe(t), l & 4) {
            if (t.stateNode === null) throw Error(o(162));
            l = t.memoizedProps, n = t.stateNode;
            try {
              n.nodeValue = l;
            } catch (V) {
              jt(t, t.return, V);
            }
          }
          break;
        case 3:
          if (es = null, i = Re, Re = Ii(e.containerInfo), ge(e, t), Re = i, xe(t), l & 4 && n !== null && n.memoizedState.isDehydrated) try {
            Qa(e.containerInfo);
          } catch (V) {
            jt(t, t.return, V);
          }
          Ic && (Ic = false, Du(t));
          break;
        case 4:
          l = Re, Re = Ii(t.stateNode.containerInfo), ge(e, t), xe(t), Re = l;
          break;
        case 12:
          ge(e, t), xe(t);
          break;
        case 31:
          ge(e, t), xe(t), l & 4 && (l = t.updateQueue, l !== null && (t.updateQueue = null, zi(t, l)));
          break;
        case 13:
          ge(e, t), xe(t), t.child.flags & 8192 && t.memoizedState !== null != (n !== null && n.memoizedState !== null) && (qi = he()), l & 4 && (l = t.updateQueue, l !== null && (t.updateQueue = null, zi(t, l)));
          break;
        case 22:
          i = t.memoizedState !== null;
          var r = n !== null && n.memoizedState !== null, f = hn, A = Xt;
          if (hn = f || i, Xt = A || r, ge(e, t), Xt = A, hn = f, xe(t), l & 8192) t: for (e = t.stateNode, e._visibility = i ? e._visibility & -2 : e._visibility | 1, i && (n === null || r || hn || Xt || ia(t)), n = null, e = t; ; ) {
            if (e.tag === 5 || e.tag === 26) {
              if (n === null) {
                r = n = e;
                try {
                  if (s = r.stateNode, i) c = s.style, typeof c.setProperty == "function" ? c.setProperty("display", "none", "important") : c.display = "none";
                  else {
                    h = r.stateNode;
                    var w = r.memoizedProps.style, v = w != null && w.hasOwnProperty("display") ? w.display : null;
                    h.style.display = v == null || typeof v == "boolean" ? "" : ("" + v).trim();
                  }
                } catch (V) {
                  jt(r, r.return, V);
                }
              }
            } else if (e.tag === 6) {
              if (n === null) {
                r = e;
                try {
                  r.stateNode.nodeValue = i ? "" : r.memoizedProps;
                } catch (V) {
                  jt(r, r.return, V);
                }
              }
            } else if (e.tag === 18) {
              if (n === null) {
                r = e;
                try {
                  var N = r.stateNode;
                  i ? Hd(N, true) : Hd(r.stateNode, false);
                } catch (V) {
                  jt(r, r.return, V);
                }
              }
            } else if ((e.tag !== 22 && e.tag !== 23 || e.memoizedState === null || e === t) && e.child !== null) {
              e.child.return = e, e = e.child;
              continue;
            }
            if (e === t) break t;
            for (; e.sibling === null; ) {
              if (e.return === null || e.return === t) break t;
              n === e && (n = null), e = e.return;
            }
            n === e && (n = null), e.sibling.return = e.return, e = e.sibling;
          }
          l & 4 && (l = t.updateQueue, l !== null && (n = l.retryQueue, n !== null && (l.retryQueue = null, zi(t, n))));
          break;
        case 19:
          ge(e, t), xe(t), l & 4 && (l = t.updateQueue, l !== null && (t.updateQueue = null, zi(t, l)));
          break;
        case 30:
          break;
        case 21:
          break;
        default:
          ge(e, t), xe(t);
      }
    }
    function xe(t) {
      var e = t.flags;
      if (e & 2) {
        try {
          for (var n, l = t.return; l !== null; ) {
            if (Ou(l)) {
              n = l;
              break;
            }
            l = l.return;
          }
          if (n == null) throw Error(o(160));
          switch (n.tag) {
            case 27:
              var i = n.stateNode, s = Fc(t);
              _i(t, s, i);
              break;
            case 5:
              var c = n.stateNode;
              n.flags & 32 && (pa(c, ""), n.flags &= -33);
              var h = Fc(t);
              _i(t, h, c);
              break;
            case 3:
            case 4:
              var r = n.stateNode.containerInfo, f = Fc(t);
              Wc(t, f, r);
              break;
            default:
              throw Error(o(161));
          }
        } catch (A) {
          jt(t, t.return, A);
        }
        t.flags &= -3;
      }
      e & 4096 && (t.flags &= -4097);
    }
    function Du(t) {
      if (t.subtreeFlags & 1024) for (t = t.child; t !== null; ) {
        var e = t;
        Du(e), e.tag === 5 && e.flags & 1024 && e.stateNode.reset(), t = t.sibling;
      }
    }
    function rn(t, e) {
      if (e.subtreeFlags & 8772) for (e = e.child; e !== null; ) Su(t, e.alternate, e), e = e.sibling;
    }
    function ia(t) {
      for (t = t.child; t !== null; ) {
        var e = t;
        switch (e.tag) {
          case 0:
          case 11:
          case 14:
          case 15:
            Sn(4, e, e.return), ia(e);
            break;
          case 1:
            Qe(e, e.return);
            var n = e.stateNode;
            typeof n.componentWillUnmount == "function" && Hu(e, e.return, n), ia(e);
            break;
          case 27:
            Ll(e.stateNode);
          case 26:
          case 5:
            Qe(e, e.return), ia(e);
            break;
          case 22:
            e.memoizedState === null && ia(e);
            break;
          case 30:
            ia(e);
            break;
          default:
            ia(e);
        }
        t = t.sibling;
      }
    }
    function un(t, e, n) {
      for (n = n && (e.subtreeFlags & 8772) !== 0, e = e.child; e !== null; ) {
        var l = e.alternate, i = t, s = e, c = s.flags;
        switch (s.tag) {
          case 0:
          case 11:
          case 15:
            un(i, s, n), Ol(4, s);
            break;
          case 1:
            if (un(i, s, n), l = s, i = l.stateNode, typeof i.componentDidMount == "function") try {
              i.componentDidMount();
            } catch (f) {
              jt(l, l.return, f);
            }
            if (l = s, i = l.updateQueue, i !== null) {
              var h = l.stateNode;
              try {
                var r = i.shared.hiddenCallbacks;
                if (r !== null) for (i.shared.hiddenCallbacks = null, i = 0; i < r.length; i++) dr(r[i], h);
              } catch (f) {
                jt(l, l.return, f);
              }
            }
            n && c & 64 && Cu(s), kl(s, s.return);
            break;
          case 27:
            ku(s);
          case 26:
          case 5:
            un(i, s, n), n && l === null && c & 4 && Tu(s), kl(s, s.return);
            break;
          case 12:
            un(i, s, n);
            break;
          case 31:
            un(i, s, n), n && c & 4 && Bu(i, s);
            break;
          case 13:
            un(i, s, n), n && c & 4 && Gu(i, s);
            break;
          case 22:
            s.memoizedState === null && un(i, s, n), kl(s, s.return);
            break;
          case 30:
            break;
          default:
            un(i, s, n);
        }
        e = e.sibling;
      }
    }
    function th(t, e) {
      var n = null;
      t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (n = t.memoizedState.cachePool.pool), t = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (t = e.memoizedState.cachePool.pool), t !== n && (t != null && t.refCount++, n != null && ml(n));
    }
    function eh(t, e) {
      t = null, e.alternate !== null && (t = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== t && (e.refCount++, t != null && ml(t));
    }
    function qe(t, e, n, l) {
      if (e.subtreeFlags & 10256) for (e = e.child; e !== null; ) Lu(t, e, n, l), e = e.sibling;
    }
    function Lu(t, e, n, l) {
      var i = e.flags;
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          qe(t, e, n, l), i & 2048 && Ol(9, e);
          break;
        case 1:
          qe(t, e, n, l);
          break;
        case 3:
          qe(t, e, n, l), i & 2048 && (t = null, e.alternate !== null && (t = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== t && (e.refCount++, t != null && ml(t)));
          break;
        case 12:
          if (i & 2048) {
            qe(t, e, n, l), t = e.stateNode;
            try {
              var s = e.memoizedProps, c = s.id, h = s.onPostCommit;
              typeof h == "function" && h(c, e.alternate === null ? "mount" : "update", t.passiveEffectDuration, -0);
            } catch (r) {
              jt(e, e.return, r);
            }
          } else qe(t, e, n, l);
          break;
        case 31:
          qe(t, e, n, l);
          break;
        case 13:
          qe(t, e, n, l);
          break;
        case 23:
          break;
        case 22:
          s = e.stateNode, c = e.alternate, e.memoizedState !== null ? s._visibility & 2 ? qe(t, e, n, l) : Al(t, e) : s._visibility & 2 ? qe(t, e, n, l) : (s._visibility |= 2, La(t, e, n, l, (e.subtreeFlags & 10256) !== 0 || false)), i & 2048 && th(c, e);
          break;
        case 24:
          qe(t, e, n, l), i & 2048 && eh(e.alternate, e);
          break;
        default:
          qe(t, e, n, l);
      }
    }
    function La(t, e, n, l, i) {
      for (i = i && ((e.subtreeFlags & 10256) !== 0 || false), e = e.child; e !== null; ) {
        var s = t, c = e, h = n, r = l, f = c.flags;
        switch (c.tag) {
          case 0:
          case 11:
          case 15:
            La(s, c, h, r, i), Ol(8, c);
            break;
          case 23:
            break;
          case 22:
            var A = c.stateNode;
            c.memoizedState !== null ? A._visibility & 2 ? La(s, c, h, r, i) : Al(s, c) : (A._visibility |= 2, La(s, c, h, r, i)), i && f & 2048 && th(c.alternate, c);
            break;
          case 24:
            La(s, c, h, r, i), i && f & 2048 && eh(c.alternate, c);
            break;
          default:
            La(s, c, h, r, i);
        }
        e = e.sibling;
      }
    }
    function Al(t, e) {
      if (e.subtreeFlags & 10256) for (e = e.child; e !== null; ) {
        var n = t, l = e, i = l.flags;
        switch (l.tag) {
          case 22:
            Al(n, l), i & 2048 && th(l.alternate, l);
            break;
          case 24:
            Al(n, l), i & 2048 && eh(l.alternate, l);
            break;
          default:
            Al(n, l);
        }
        e = e.sibling;
      }
    }
    var Sl = 8192;
    function Ka(t, e, n) {
      if (t.subtreeFlags & Sl) for (t = t.child; t !== null; ) Ku(t, e, n), t = t.sibling;
    }
    function Ku(t, e, n) {
      switch (t.tag) {
        case 26:
          Ka(t, e, n), t.flags & Sl && t.memoizedState !== null && w0(n, Re, t.memoizedState, t.memoizedProps);
          break;
        case 5:
          Ka(t, e, n);
          break;
        case 3:
        case 4:
          var l = Re;
          Re = Ii(t.stateNode.containerInfo), Ka(t, e, n), Re = l;
          break;
        case 22:
          t.memoizedState === null && (l = t.alternate, l !== null && l.memoizedState !== null ? (l = Sl, Sl = 16777216, Ka(t, e, n), Sl = l) : Ka(t, e, n));
          break;
        default:
          Ka(t, e, n);
      }
    }
    function _u(t) {
      var e = t.alternate;
      if (e !== null && (t = e.child, t !== null)) {
        e.child = null;
        do
          e = t.sibling, t.sibling = null, t = e;
        while (t !== null);
      }
    }
    function wl(t) {
      var e = t.deletions;
      if ((t.flags & 16) !== 0) {
        if (e !== null) for (var n = 0; n < e.length; n++) {
          var l = e[n];
          $t = l, Ru(l, t);
        }
        _u(t);
      }
      if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) zu(t), t = t.sibling;
    }
    function zu(t) {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          wl(t), t.flags & 2048 && Sn(9, t, t.return);
          break;
        case 3:
          wl(t);
          break;
        case 12:
          wl(t);
          break;
        case 22:
          var e = t.stateNode;
          t.memoizedState !== null && e._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (e._visibility &= -3, Ri(t)) : wl(t);
          break;
        default:
          wl(t);
      }
    }
    function Ri(t) {
      var e = t.deletions;
      if ((t.flags & 16) !== 0) {
        if (e !== null) for (var n = 0; n < e.length; n++) {
          var l = e[n];
          $t = l, Ru(l, t);
        }
        _u(t);
      }
      for (t = t.child; t !== null; ) {
        switch (e = t, e.tag) {
          case 0:
          case 11:
          case 15:
            Sn(8, e, e.return), Ri(e);
            break;
          case 22:
            n = e.stateNode, n._visibility & 2 && (n._visibility &= -3, Ri(e));
            break;
          default:
            Ri(e);
        }
        t = t.sibling;
      }
    }
    function Ru(t, e) {
      for (; $t !== null; ) {
        var n = $t;
        switch (n.tag) {
          case 0:
          case 11:
          case 15:
            Sn(8, n, e);
            break;
          case 23:
          case 22:
            if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
              var l = n.memoizedState.cachePool.pool;
              l != null && l.refCount++;
            }
            break;
          case 24:
            ml(n.memoizedState.cache);
        }
        if (l = n.child, l !== null) l.return = n, $t = l;
        else t: for (n = t; $t !== null; ) {
          l = $t;
          var i = l.sibling, s = l.return;
          if (wu(l), l === n) {
            $t = null;
            break t;
          }
          if (i !== null) {
            i.return = s, $t = i;
            break t;
          }
          $t = s;
        }
      }
    }
    var Vg = { getCacheForType: function(t) {
      var e = te(Ut), n = e.data.get(t);
      return n === void 0 && (n = t(), e.data.set(t, n)), n;
    }, cacheSignal: function() {
      return te(Ut).controller.signal;
    } }, Xg = typeof WeakMap == "function" ? WeakMap : Map, yt = 0, At = null, ot = null, ut = 0, Nt = 0, Te = null, wn = false, _a = false, nh = false, dn = 0, _t = 0, Mn = 0, sa = 0, ah = 0, Oe = 0, za = 0, Ml = null, pe = null, lh = false, qi = 0, qu = 0, Pi = 1 / 0, Ui = null, Bn = null, Qt = 0, Gn = null, Ra = null, mn = 0, ih = 0, sh = null, Pu = null, Bl = 0, ch = null;
    function ke() {
      return (yt & 2) !== 0 && ut !== 0 ? ut & -ut : k.T !== null ? mh() : ao();
    }
    function Uu() {
      if (Oe === 0) if ((ut & 536870912) === 0 || mt) {
        var t = Fl;
        Fl <<= 1, (Fl & 3932160) === 0 && (Fl = 262144), Oe = t;
      } else Oe = 536870912;
      return t = Ce.current, t !== null && (t.flags |= 32), Oe;
    }
    function be(t, e, n) {
      (t === At && (Nt === 2 || Nt === 9) || t.cancelPendingCommit !== null) && (qa(t, 0), En(t, ut, Oe, false)), Ia(t, n), ((yt & 2) === 0 || t !== At) && (t === At && ((yt & 2) === 0 && (sa |= n), _t === 4 && En(t, ut, Oe, false)), Ze(t));
    }
    function Yu(t, e, n) {
      if ((yt & 6) !== 0) throw Error(o(327));
      var l = !n && (e & 127) === 0 && (e & t.expiredLanes) === 0 || Wa(t, e), i = l ? Jg(t, e) : oh(t, e, true), s = l;
      do {
        if (i === 0) {
          _a && !l && En(t, e, 0, false);
          break;
        } else {
          if (n = t.current.alternate, s && !Qg(n)) {
            i = oh(t, e, false), s = false;
            continue;
          }
          if (i === 2) {
            if (s = e, t.errorRecoveryDisabledLanes & s) var c = 0;
            else c = t.pendingLanes & -536870913, c = c !== 0 ? c : c & 536870912 ? 536870912 : 0;
            if (c !== 0) {
              e = c;
              t: {
                var h = t;
                i = Ml;
                var r = h.current.memoizedState.isDehydrated;
                if (r && (qa(h, c).flags |= 256), c = oh(h, c, false), c !== 2) {
                  if (nh && !r) {
                    h.errorRecoveryDisabledLanes |= s, sa |= s, i = 4;
                    break t;
                  }
                  s = pe, pe = i, s !== null && (pe === null ? pe = s : pe.push.apply(pe, s));
                }
                i = c;
              }
              if (s = false, i !== 2) continue;
            }
          }
          if (i === 1) {
            qa(t, 0), En(t, e, 0, true);
            break;
          }
          t: {
            switch (l = t, s = i, s) {
              case 0:
              case 1:
                throw Error(o(345));
              case 4:
                if ((e & 4194048) !== e) break;
              case 6:
                En(l, e, Oe, !wn);
                break t;
              case 2:
                pe = null;
                break;
              case 3:
              case 5:
                break;
              default:
                throw Error(o(329));
            }
            if ((e & 62914560) === e && (i = qi + 300 - he(), 10 < i)) {
              if (En(l, e, Oe, !wn), Il(l, 0, true) !== 0) break t;
              mn = e, l.timeoutHandle = Nd(Vu.bind(null, l, n, pe, Ui, lh, e, Oe, sa, za, wn, s, "Throttled", -0, 0), i);
              break t;
            }
            Vu(l, n, pe, Ui, lh, e, Oe, sa, za, wn, s, null, -0, 0);
          }
        }
        break;
      } while (true);
      Ze(t);
    }
    function Vu(t, e, n, l, i, s, c, h, r, f, A, w, v, N) {
      if (t.timeoutHandle = -1, w = e.subtreeFlags, w & 8192 || (w & 16785408) === 16785408) {
        w = { stylesheets: null, count: 0, imgCount: 0, imgBytes: 0, suspenseyImages: [], waitingForImages: true, waitingForViewTransition: false, unsuspend: Fe }, Ku(e, s, w);
        var V = (s & 62914560) === s ? qi - he() : (s & 4194048) === s ? qu - he() : 0;
        if (V = M0(w, V), V !== null) {
          mn = s, t.cancelPendingCommit = V(Iu.bind(null, t, e, s, n, l, i, c, h, r, A, w, null, v, N)), En(t, s, c, !f);
          return;
        }
      }
      Iu(t, e, s, n, l, i, c, h, r);
    }
    function Qg(t) {
      for (var e = t; ; ) {
        var n = e.tag;
        if ((n === 0 || n === 11 || n === 15) && e.flags & 16384 && (n = e.updateQueue, n !== null && (n = n.stores, n !== null))) for (var l = 0; l < n.length; l++) {
          var i = n[l], s = i.getSnapshot;
          i = i.value;
          try {
            if (!Ne(s(), i)) return false;
          } catch {
            return false;
          }
        }
        if (n = e.child, e.subtreeFlags & 16384 && n !== null) n.return = e, e = n;
        else {
          if (e === t) break;
          for (; e.sibling === null; ) {
            if (e.return === null || e.return === t) return true;
            e = e.return;
          }
          e.sibling.return = e.return, e = e.sibling;
        }
      }
      return true;
    }
    function En(t, e, n, l) {
      e &= ~ah, e &= ~sa, t.suspendedLanes |= e, t.pingedLanes &= ~e, l && (t.warmLanes |= e), l = t.expirationTimes;
      for (var i = e; 0 < i; ) {
        var s = 31 - ve(i), c = 1 << s;
        l[s] = -1, i &= ~c;
      }
      n !== 0 && to(t, n, e);
    }
    function Yi() {
      return (yt & 6) === 0 ? (Gl(0), false) : true;
    }
    function hh() {
      if (ot !== null) {
        if (Nt === 0) var t = ot.return;
        else t = ot, en = Fn = null, Hc(t), Ma = null, xl = 0, t = ot;
        for (; t !== null; ) ju(t.alternate, t), t = t.return;
        ot = null;
      }
    }
    function qa(t, e) {
      var n = t.timeoutHandle;
      n !== -1 && (t.timeoutHandle = -1, m0(n)), n = t.cancelPendingCommit, n !== null && (t.cancelPendingCommit = null, n()), mn = 0, hh(), At = t, ot = n = Ie(t.current, null), ut = e, Nt = 0, Te = null, wn = false, _a = Wa(t, e), nh = false, za = Oe = ah = sa = Mn = _t = 0, pe = Ml = null, lh = false, (e & 8) !== 0 && (e |= e & 32);
      var l = t.entangledLanes;
      if (l !== 0) for (t = t.entanglements, l &= e; 0 < l; ) {
        var i = 31 - ve(l), s = 1 << i;
        e |= t[i], l &= ~s;
      }
      return dn = e, ui(), n;
    }
    function Xu(t, e) {
      it = null, k.H = Cl, e === wa || e === yi ? (e = hr(), Nt = 3) : e === dc ? (e = hr(), Nt = 4) : Nt = e === Rc ? 8 : e !== null && typeof e == "object" && typeof e.then == "function" ? 6 : 1, Te = e, ot === null && (_t = 1, Gi(t, Me(e, t.current)));
    }
    function Qu() {
      var t = Ce.current;
      return t === null ? true : (ut & 4194048) === ut ? De === null : (ut & 62914560) === ut || (ut & 536870912) !== 0 ? t === De : false;
    }
    function Zu() {
      var t = k.H;
      return k.H = Cl, t === null ? Cl : t;
    }
    function Ju() {
      var t = k.A;
      return k.A = Vg, t;
    }
    function Vi() {
      _t = 4, wn || (ut & 4194048) !== ut && Ce.current !== null || (_a = true), (Mn & 134217727) === 0 && (sa & 134217727) === 0 || At === null || En(At, ut, Oe, false);
    }
    function oh(t, e, n) {
      var l = yt;
      yt |= 2;
      var i = Zu(), s = Ju();
      (At !== t || ut !== e) && (Ui = null, qa(t, e)), e = false;
      var c = _t;
      t: do
        try {
          if (Nt !== 0 && ot !== null) {
            var h = ot, r = Te;
            switch (Nt) {
              case 8:
                hh(), c = 6;
                break t;
              case 3:
              case 2:
              case 9:
              case 6:
                Ce.current === null && (e = true);
                var f = Nt;
                if (Nt = 0, Te = null, Pa(t, h, r, f), n && _a) {
                  c = 0;
                  break t;
                }
                break;
              default:
                f = Nt, Nt = 0, Te = null, Pa(t, h, r, f);
            }
          }
          Zg(), c = _t;
          break;
        } catch (A) {
          Xu(t, A);
        }
      while (true);
      return e && t.shellSuspendCounter++, en = Fn = null, yt = l, k.H = i, k.A = s, ot === null && (At = null, ut = 0, ui()), c;
    }
    function Zg() {
      for (; ot !== null; ) $u(ot);
    }
    function Jg(t, e) {
      var n = yt;
      yt |= 2;
      var l = Zu(), i = Ju();
      At !== t || ut !== e ? (Ui = null, Pi = he() + 500, qa(t, e)) : _a = Wa(t, e);
      t: do
        try {
          if (Nt !== 0 && ot !== null) {
            e = ot;
            var s = Te;
            e: switch (Nt) {
              case 1:
                Nt = 0, Te = null, Pa(t, e, s, 1);
                break;
              case 2:
              case 9:
                if (sr(s)) {
                  Nt = 0, Te = null, Fu(e);
                  break;
                }
                e = function() {
                  Nt !== 2 && Nt !== 9 || At !== t || (Nt = 7), Ze(t);
                }, s.then(e, e);
                break t;
              case 3:
                Nt = 7;
                break t;
              case 4:
                Nt = 5;
                break t;
              case 7:
                sr(s) ? (Nt = 0, Te = null, Fu(e)) : (Nt = 0, Te = null, Pa(t, e, s, 7));
                break;
              case 5:
                var c = null;
                switch (ot.tag) {
                  case 26:
                    c = ot.memoizedState;
                  case 5:
                  case 27:
                    var h = ot;
                    if (c ? Ld(c) : h.stateNode.complete) {
                      Nt = 0, Te = null;
                      var r = h.sibling;
                      if (r !== null) ot = r;
                      else {
                        var f = h.return;
                        f !== null ? (ot = f, Xi(f)) : ot = null;
                      }
                      break e;
                    }
                }
                Nt = 0, Te = null, Pa(t, e, s, 5);
                break;
              case 6:
                Nt = 0, Te = null, Pa(t, e, s, 6);
                break;
              case 8:
                hh(), _t = 6;
                break t;
              default:
                throw Error(o(462));
            }
          }
          $g();
          break;
        } catch (A) {
          Xu(t, A);
        }
      while (true);
      return en = Fn = null, k.H = l, k.A = i, yt = n, ot !== null ? 0 : (At = null, ut = 0, ui(), _t);
    }
    function $g() {
      for (; ot !== null && !Cs(); ) $u(ot);
    }
    function $u(t) {
      var e = vu(t.alternate, t, dn);
      t.memoizedProps = t.pendingProps, e === null ? Xi(t) : ot = e;
    }
    function Fu(t) {
      var e = t, n = e.alternate;
      switch (e.tag) {
        case 15:
        case 0:
          e = gu(n, e, e.pendingProps, e.type, void 0, ut);
          break;
        case 11:
          e = gu(n, e, e.pendingProps, e.type.render, e.ref, ut);
          break;
        case 5:
          Hc(e);
        default:
          ju(n, e), e = ot = Jo(e, dn), e = vu(n, e, dn);
      }
      t.memoizedProps = t.pendingProps, e === null ? Xi(t) : ot = e;
    }
    function Pa(t, e, n, l) {
      en = Fn = null, Hc(e), Ma = null, xl = 0;
      var i = e.return;
      try {
        if (_g(t, i, e, n, ut)) {
          _t = 1, Gi(t, Me(n, t.current)), ot = null;
          return;
        }
      } catch (s) {
        if (i !== null) throw ot = i, s;
        _t = 1, Gi(t, Me(n, t.current)), ot = null;
        return;
      }
      e.flags & 32768 ? (mt || l === 1 ? t = true : _a || (ut & 536870912) !== 0 ? t = false : (wn = t = true, (l === 2 || l === 9 || l === 3 || l === 6) && (l = Ce.current, l !== null && l.tag === 13 && (l.flags |= 16384))), Wu(e, t)) : Xi(e);
    }
    function Xi(t) {
      var e = t;
      do {
        if ((e.flags & 32768) !== 0) {
          Wu(e, wn);
          return;
        }
        t = e.return;
        var n = qg(e.alternate, e, dn);
        if (n !== null) {
          ot = n;
          return;
        }
        if (e = e.sibling, e !== null) {
          ot = e;
          return;
        }
        ot = e = t;
      } while (e !== null);
      _t === 0 && (_t = 5);
    }
    function Wu(t, e) {
      do {
        var n = Pg(t.alternate, t);
        if (n !== null) {
          n.flags &= 32767, ot = n;
          return;
        }
        if (n = t.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !e && (t = t.sibling, t !== null)) {
          ot = t;
          return;
        }
        ot = t = n;
      } while (t !== null);
      _t = 6, ot = null;
    }
    function Iu(t, e, n, l, i, s, c, h, r) {
      t.cancelPendingCommit = null;
      do
        Qi();
      while (Qt !== 0);
      if ((yt & 6) !== 0) throw Error(o(327));
      if (e !== null) {
        if (e === t.current) throw Error(o(177));
        if (s = e.lanes | e.childLanes, s |= Fs, Sm(t, n, s, c, h, r), t === At && (ot = At = null, ut = 0), Ra = e, Gn = t, mn = n, ih = s, sh = i, Pu = l, (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, t0(Jl, function() {
          return ld(), null;
        })) : (t.callbackNode = null, t.callbackPriority = 0), l = (e.flags & 13878) !== 0, (e.subtreeFlags & 13878) !== 0 || l) {
          l = k.T, k.T = null, i = K.p, K.p = 2, c = yt, yt |= 4;
          try {
            Ug(t, e, n);
          } finally {
            yt = c, K.p = i, k.T = l;
          }
        }
        Qt = 1, td(), ed(), nd();
      }
    }
    function td() {
      if (Qt === 1) {
        Qt = 0;
        var t = Gn, e = Ra, n = (e.flags & 13878) !== 0;
        if ((e.subtreeFlags & 13878) !== 0 || n) {
          n = k.T, k.T = null;
          var l = K.p;
          K.p = 2;
          var i = yt;
          yt |= 4;
          try {
            Eu(e, t);
            var s = Nh, c = Ro(t.containerInfo), h = s.focusedElem, r = s.selectionRange;
            if (c !== h && h && h.ownerDocument && zo(h.ownerDocument.documentElement, h)) {
              if (r !== null && Xs(h)) {
                var f = r.start, A = r.end;
                if (A === void 0 && (A = f), "selectionStart" in h) h.selectionStart = f, h.selectionEnd = Math.min(A, h.value.length);
                else {
                  var w = h.ownerDocument || document, v = w && w.defaultView || window;
                  if (v.getSelection) {
                    var N = v.getSelection(), V = h.textContent.length, W = Math.min(r.start, V), Ot = r.end === void 0 ? W : Math.min(r.end, V);
                    !N.extend && W > Ot && (c = Ot, Ot = W, W = c);
                    var x = _o(h, W), d = _o(h, Ot);
                    if (x && d && (N.rangeCount !== 1 || N.anchorNode !== x.node || N.anchorOffset !== x.offset || N.focusNode !== d.node || N.focusOffset !== d.offset)) {
                      var b = w.createRange();
                      b.setStart(x.node, x.offset), N.removeAllRanges(), W > Ot ? (N.addRange(b), N.extend(d.node, d.offset)) : (b.setEnd(d.node, d.offset), N.addRange(b));
                    }
                  }
                }
              }
              for (w = [], N = h; N = N.parentNode; ) N.nodeType === 1 && w.push({ element: N, left: N.scrollLeft, top: N.scrollTop });
              for (typeof h.focus == "function" && h.focus(), h = 0; h < w.length; h++) {
                var S = w[h];
                S.element.scrollLeft = S.left, S.element.scrollTop = S.top;
              }
            }
            is = !!vh, Nh = vh = null;
          } finally {
            yt = i, K.p = l, k.T = n;
          }
        }
        t.current = e, Qt = 2;
      }
    }
    function ed() {
      if (Qt === 2) {
        Qt = 0;
        var t = Gn, e = Ra, n = (e.flags & 8772) !== 0;
        if ((e.subtreeFlags & 8772) !== 0 || n) {
          n = k.T, k.T = null;
          var l = K.p;
          K.p = 2;
          var i = yt;
          yt |= 4;
          try {
            Su(t, e.alternate, e);
          } finally {
            yt = i, K.p = l, k.T = n;
          }
        }
        Qt = 3;
      }
    }
    function nd() {
      if (Qt === 4 || Qt === 3) {
        Qt = 0, _e();
        var t = Gn, e = Ra, n = mn, l = Pu;
        (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0 ? Qt = 5 : (Qt = 0, Ra = Gn = null, ad(t, t.pendingLanes));
        var i = t.pendingLanes;
        if (i === 0 && (Bn = null), ks(n), e = e.stateNode, ye && typeof ye.onCommitFiberRoot == "function") try {
          ye.onCommitFiberRoot(Fa, e, void 0, (e.current.flags & 128) === 128);
        } catch {
        }
        if (l !== null) {
          e = k.T, i = K.p, K.p = 2, k.T = null;
          try {
            for (var s = t.onRecoverableError, c = 0; c < l.length; c++) {
              var h = l[c];
              s(h.value, { componentStack: h.stack });
            }
          } finally {
            k.T = e, K.p = i;
          }
        }
        (mn & 3) !== 0 && Qi(), Ze(t), i = t.pendingLanes, (n & 261930) !== 0 && (i & 42) !== 0 ? t === ch ? Bl++ : (Bl = 0, ch = t) : Bl = 0, Gl(0);
      }
    }
    function ad(t, e) {
      (t.pooledCacheLanes &= e) === 0 && (e = t.pooledCache, e != null && (t.pooledCache = null, ml(e)));
    }
    function Qi() {
      return td(), ed(), nd(), ld();
    }
    function ld() {
      if (Qt !== 5) return false;
      var t = Gn, e = ih;
      ih = 0;
      var n = ks(mn), l = k.T, i = K.p;
      try {
        K.p = 32 > n ? 32 : n, k.T = null, n = sh, sh = null;
        var s = Gn, c = mn;
        if (Qt = 0, Ra = Gn = null, mn = 0, (yt & 6) !== 0) throw Error(o(331));
        var h = yt;
        if (yt |= 4, zu(s.current), Lu(s, s.current, c, n), yt = h, Gl(0, false), ye && typeof ye.onPostCommitFiberRoot == "function") try {
          ye.onPostCommitFiberRoot(Fa, s);
        } catch {
        }
        return true;
      } finally {
        K.p = i, k.T = l, ad(t, e);
      }
    }
    function id(t, e, n) {
      e = Me(n, e), e = zc(t.stateNode, e, 2), t = On(t, e, 2), t !== null && (Ia(t, 2), Ze(t));
    }
    function jt(t, e, n) {
      if (t.tag === 3) id(t, t, n);
      else for (; e !== null; ) {
        if (e.tag === 3) {
          id(e, t, n);
          break;
        } else if (e.tag === 1) {
          var l = e.stateNode;
          if (typeof e.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (Bn === null || !Bn.has(l))) {
            t = Me(n, t), n = su(2), l = On(e, n, 2), l !== null && (cu(n, l, e, t), Ia(l, 2), Ze(l));
            break;
          }
        }
        e = e.return;
      }
    }
    function rh(t, e, n) {
      var l = t.pingCache;
      if (l === null) {
        l = t.pingCache = new Xg();
        var i = /* @__PURE__ */ new Set();
        l.set(e, i);
      } else i = l.get(e), i === void 0 && (i = /* @__PURE__ */ new Set(), l.set(e, i));
      i.has(n) || (nh = true, i.add(n), t = Fg.bind(null, t, e, n), e.then(t, t));
    }
    function Fg(t, e, n) {
      var l = t.pingCache;
      l !== null && l.delete(e), t.pingedLanes |= t.suspendedLanes & n, t.warmLanes &= ~n, At === t && (ut & n) === n && (_t === 4 || _t === 3 && (ut & 62914560) === ut && 300 > he() - qi ? (yt & 2) === 0 && qa(t, 0) : ah |= n, za === ut && (za = 0)), Ze(t);
    }
    function sd(t, e) {
      e === 0 && (e = Ih()), t = Zn(t, e), t !== null && (Ia(t, e), Ze(t));
    }
    function Wg(t) {
      var e = t.memoizedState, n = 0;
      e !== null && (n = e.retryLane), sd(t, n);
    }
    function Ig(t, e) {
      var n = 0;
      switch (t.tag) {
        case 31:
        case 13:
          var l = t.stateNode, i = t.memoizedState;
          i !== null && (n = i.retryLane);
          break;
        case 19:
          l = t.stateNode;
          break;
        case 22:
          l = t.stateNode._retryCache;
          break;
        default:
          throw Error(o(314));
      }
      l !== null && l.delete(e), sd(t, n);
    }
    function t0(t, e) {
      return fe(t, e);
    }
    var Zi = null, Ua = null, uh = false, Ji = false, dh = false, Dn = 0;
    function Ze(t) {
      t !== Ua && t.next === null && (Ua === null ? Zi = Ua = t : Ua = Ua.next = t), Ji = true, uh || (uh = true, n0());
    }
    function Gl(t, e) {
      if (!dh && Ji) {
        dh = true;
        do
          for (var n = false, l = Zi; l !== null; ) {
            if (t !== 0) {
              var i = l.pendingLanes;
              if (i === 0) var s = 0;
              else {
                var c = l.suspendedLanes, h = l.pingedLanes;
                s = (1 << 31 - ve(42 | t) + 1) - 1, s &= i & ~(c & ~h), s = s & 201326741 ? s & 201326741 | 1 : s ? s | 2 : 0;
              }
              s !== 0 && (n = true, rd(l, s));
            } else s = ut, s = Il(l, l === At ? s : 0, l.cancelPendingCommit !== null || l.timeoutHandle !== -1), (s & 3) === 0 || Wa(l, s) || (n = true, rd(l, s));
            l = l.next;
          }
        while (n);
        dh = false;
      }
    }
    function e0() {
      cd();
    }
    function cd() {
      Ji = uh = false;
      var t = 0;
      Dn !== 0 && d0() && (t = Dn);
      for (var e = he(), n = null, l = Zi; l !== null; ) {
        var i = l.next, s = hd(l, e);
        s === 0 ? (l.next = null, n === null ? Zi = i : n.next = i, i === null && (Ua = n)) : (n = l, (t !== 0 || (s & 3) !== 0) && (Ji = true)), l = i;
      }
      Qt !== 0 && Qt !== 5 || Gl(t), Dn !== 0 && (Dn = 0);
    }
    function hd(t, e) {
      for (var n = t.suspendedLanes, l = t.pingedLanes, i = t.expirationTimes, s = t.pendingLanes & -62914561; 0 < s; ) {
        var c = 31 - ve(s), h = 1 << c, r = i[c];
        r === -1 ? ((h & n) === 0 || (h & l) !== 0) && (i[c] = Am(h, e)) : r <= e && (t.expiredLanes |= h), s &= ~h;
      }
      if (e = At, n = ut, n = Il(t, t === e ? n : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1), l = t.callbackNode, n === 0 || t === e && (Nt === 2 || Nt === 9) || t.cancelPendingCommit !== null) return l !== null && l !== null && Ye(l), t.callbackNode = null, t.callbackPriority = 0;
      if ((n & 3) === 0 || Wa(t, n)) {
        if (e = n & -n, e === t.callbackPriority) return e;
        switch (l !== null && Ye(l), ks(n)) {
          case 2:
          case 8:
            n = $a;
            break;
          case 32:
            n = Jl;
            break;
          case 268435456:
            n = Wh;
            break;
          default:
            n = Jl;
        }
        return l = od.bind(null, t), n = fe(n, l), t.callbackPriority = e, t.callbackNode = n, e;
      }
      return l !== null && l !== null && Ye(l), t.callbackPriority = 2, t.callbackNode = null, 2;
    }
    function od(t, e) {
      if (Qt !== 0 && Qt !== 5) return t.callbackNode = null, t.callbackPriority = 0, null;
      var n = t.callbackNode;
      if (Qi() && t.callbackNode !== n) return null;
      var l = ut;
      return l = Il(t, t === At ? l : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1), l === 0 ? null : (Yu(t, l, e), hd(t, he()), t.callbackNode != null && t.callbackNode === n ? od.bind(null, t) : null);
    }
    function rd(t, e) {
      if (Qi()) return null;
      Yu(t, e, true);
    }
    function n0() {
      g0(function() {
        (yt & 6) !== 0 ? fe(Pn, e0) : cd();
      });
    }
    function mh() {
      if (Dn === 0) {
        var t = Aa;
        t === 0 && (t = $l, $l <<= 1, ($l & 261888) === 0 && ($l = 256)), Dn = t;
      }
      return Dn;
    }
    function ud(t) {
      return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : ai("" + t);
    }
    function dd(t, e) {
      var n = e.ownerDocument.createElement("input");
      return n.name = e.name, n.value = e.value, t.id && n.setAttribute("form", t.id), e.parentNode.insertBefore(n, e), t = new FormData(t), n.parentNode.removeChild(n), t;
    }
    function a0(t, e, n, l, i) {
      if (e === "submit" && n && n.stateNode === i) {
        var s = ud((i[ue] || null).action), c = l.submitter;
        c && (e = (e = c[ue] || null) ? ud(e.formAction) : c.getAttribute("formAction"), e !== null && (s = e, c = null));
        var h = new ci("action", "action", null, l, i);
        t.push({ event: h, listeners: [{ instance: null, listener: function() {
          if (l.defaultPrevented) {
            if (Dn !== 0) {
              var r = c ? dd(i, c) : new FormData(i);
              Gc(n, { pending: true, data: r, method: i.method, action: s }, null, r);
            }
          } else typeof s == "function" && (h.preventDefault(), r = c ? dd(i, c) : new FormData(i), Gc(n, { pending: true, data: r, method: i.method, action: s }, s, r));
        }, currentTarget: i }] });
      }
    }
    for (var gh = 0; gh < $s.length; gh++) {
      var xh = $s[gh], l0 = xh.toLowerCase(), i0 = xh[0].toUpperCase() + xh.slice(1);
      ze(l0, "on" + i0);
    }
    ze(Uo, "onAnimationEnd"), ze(Yo, "onAnimationIteration"), ze(Vo, "onAnimationStart"), ze("dblclick", "onDoubleClick"), ze("focusin", "onFocus"), ze("focusout", "onBlur"), ze(Ng, "onTransitionRun"), ze(jg, "onTransitionStart"), ze(Cg, "onTransitionCancel"), ze(Xo, "onTransitionEnd"), ga("onMouseEnter", ["mouseout", "mouseover"]), ga("onMouseLeave", ["mouseout", "mouseover"]), ga("onPointerEnter", ["pointerout", "pointerover"]), ga("onPointerLeave", ["pointerout", "pointerover"]), Yn("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), Yn("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), Yn("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), Yn("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), Yn("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), Yn("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
    var El = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), s0 = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(El));
    function md(t, e) {
      e = (e & 4) !== 0;
      for (var n = 0; n < t.length; n++) {
        var l = t[n], i = l.event;
        l = l.listeners;
        t: {
          var s = void 0;
          if (e) for (var c = l.length - 1; 0 <= c; c--) {
            var h = l[c], r = h.instance, f = h.currentTarget;
            if (h = h.listener, r !== s && i.isPropagationStopped()) break t;
            s = h, i.currentTarget = f;
            try {
              s(i);
            } catch (A) {
              ri(A);
            }
            i.currentTarget = null, s = r;
          }
          else for (c = 0; c < l.length; c++) {
            if (h = l[c], r = h.instance, f = h.currentTarget, h = h.listener, r !== s && i.isPropagationStopped()) break t;
            s = h, i.currentTarget = f;
            try {
              s(i);
            } catch (A) {
              ri(A);
            }
            i.currentTarget = null, s = r;
          }
        }
      }
    }
    function rt(t, e) {
      var n = e[As];
      n === void 0 && (n = e[As] = /* @__PURE__ */ new Set());
      var l = t + "__bubble";
      n.has(l) || (gd(e, t, 2, false), n.add(l));
    }
    function ph(t, e, n) {
      var l = 0;
      e && (l |= 4), gd(n, t, l, e);
    }
    var $i = "_reactListening" + Math.random().toString(36).slice(2);
    function bh(t) {
      if (!t[$i]) {
        t[$i] = true, so.forEach(function(n) {
          n !== "selectionchange" && (s0.has(n) || ph(n, false, t), ph(n, true, t));
        });
        var e = t.nodeType === 9 ? t : t.ownerDocument;
        e === null || e[$i] || (e[$i] = true, ph("selectionchange", false, e));
      }
    }
    function gd(t, e, n, l) {
      switch (Ud(e)) {
        case 2:
          var i = E0;
          break;
        case 8:
          i = D0;
          break;
        default:
          i = Bh;
      }
      n = i.bind(null, e, n, t), i = void 0, !Ks || e !== "touchstart" && e !== "touchmove" && e !== "wheel" || (i = true), l ? i !== void 0 ? t.addEventListener(e, n, { capture: true, passive: i }) : t.addEventListener(e, n, true) : i !== void 0 ? t.addEventListener(e, n, { passive: i }) : t.addEventListener(e, n, false);
    }
    function fh(t, e, n, l, i) {
      var s = l;
      if ((e & 1) === 0 && (e & 2) === 0 && l !== null) t: for (; ; ) {
        if (l === null) return;
        var c = l.tag;
        if (c === 3 || c === 4) {
          var h = l.stateNode.containerInfo;
          if (h === i) break;
          if (c === 4) for (c = l.return; c !== null; ) {
            var r = c.tag;
            if ((r === 3 || r === 4) && c.stateNode.containerInfo === i) return;
            c = c.return;
          }
          for (; h !== null; ) {
            if (c = ua(h), c === null) return;
            if (r = c.tag, r === 5 || r === 6 || r === 26 || r === 27) {
              l = s = c;
              continue t;
            }
            h = h.parentNode;
          }
        }
        l = l.return;
      }
      yo(function() {
        var f = s, A = Ds(n), w = [];
        t: {
          var v = Qo.get(t);
          if (v !== void 0) {
            var N = ci, V = t;
            switch (t) {
              case "keypress":
                if (ii(n) === 0) break t;
              case "keydown":
              case "keyup":
                N = Im;
                break;
              case "focusin":
                V = "focus", N = qs;
                break;
              case "focusout":
                V = "blur", N = qs;
                break;
              case "beforeblur":
              case "afterblur":
                N = qs;
                break;
              case "click":
                if (n.button === 2) break t;
              case "auxclick":
              case "dblclick":
              case "mousedown":
              case "mousemove":
              case "mouseup":
              case "mouseout":
              case "mouseover":
              case "contextmenu":
                N = jo;
                break;
              case "drag":
              case "dragend":
              case "dragenter":
              case "dragexit":
              case "dragleave":
              case "dragover":
              case "dragstart":
              case "drop":
                N = qm;
                break;
              case "touchcancel":
              case "touchend":
              case "touchmove":
              case "touchstart":
                N = ng;
                break;
              case Uo:
              case Yo:
              case Vo:
                N = Ym;
                break;
              case Xo:
                N = lg;
                break;
              case "scroll":
              case "scrollend":
                N = zm;
                break;
              case "wheel":
                N = sg;
                break;
              case "copy":
              case "cut":
              case "paste":
                N = Xm;
                break;
              case "gotpointercapture":
              case "lostpointercapture":
              case "pointercancel":
              case "pointerdown":
              case "pointermove":
              case "pointerout":
              case "pointerover":
              case "pointerup":
                N = Ho;
                break;
              case "toggle":
              case "beforetoggle":
                N = hg;
            }
            var W = (e & 4) !== 0, Ot = !W && (t === "scroll" || t === "scrollend"), x = W ? v !== null ? v + "Capture" : null : v;
            W = [];
            for (var d = f, b; d !== null; ) {
              var S = d;
              if (b = S.stateNode, S = S.tag, S !== 5 && S !== 26 && S !== 27 || b === null || x === null || (S = nl(d, x), S != null && W.push(Dl(d, S, b))), Ot) break;
              d = d.return;
            }
            0 < W.length && (v = new N(v, V, null, n, A), w.push({ event: v, listeners: W }));
          }
        }
        if ((e & 7) === 0) {
          t: {
            if (v = t === "mouseover" || t === "pointerover", N = t === "mouseout" || t === "pointerout", v && n !== Es && (V = n.relatedTarget || n.fromElement) && (ua(V) || V[ra])) break t;
            if ((N || v) && (v = A.window === A ? A : (v = A.ownerDocument) ? v.defaultView || v.parentWindow : window, N ? (V = n.relatedTarget || n.toElement, N = f, V = V ? ua(V) : null, V !== null && (Ot = E(V), W = V.tag, V !== Ot || W !== 5 && W !== 27 && W !== 6) && (V = null)) : (N = null, V = f), N !== V)) {
              if (W = jo, S = "onMouseLeave", x = "onMouseEnter", d = "mouse", (t === "pointerout" || t === "pointerover") && (W = Ho, S = "onPointerLeave", x = "onPointerEnter", d = "pointer"), Ot = N == null ? v : el(N), b = V == null ? v : el(V), v = new W(S, d + "leave", N, n, A), v.target = Ot, v.relatedTarget = b, S = null, ua(A) === f && (W = new W(x, d + "enter", V, n, A), W.target = b, W.relatedTarget = Ot, S = W), Ot = S, N && V) e: {
                for (W = c0, x = N, d = V, b = 0, S = x; S; S = W(S)) b++;
                S = 0;
                for (var J = d; J; J = W(J)) S++;
                for (; 0 < b - S; ) x = W(x), b--;
                for (; 0 < S - b; ) d = W(d), S--;
                for (; b--; ) {
                  if (x === d || d !== null && x === d.alternate) {
                    W = x;
                    break e;
                  }
                  x = W(x), d = W(d);
                }
                W = null;
              }
              else W = null;
              N !== null && xd(w, v, N, W, false), V !== null && Ot !== null && xd(w, Ot, V, W, true);
            }
          }
          t: {
            if (v = f ? el(f) : window, N = v.nodeName && v.nodeName.toLowerCase(), N === "select" || N === "input" && v.type === "file") var bt = Bo;
            else if (wo(v)) if (Go) bt = fg;
            else {
              bt = pg;
              var X = xg;
            }
            else N = v.nodeName, !N || N.toLowerCase() !== "input" || v.type !== "checkbox" && v.type !== "radio" ? f && Gs(f.elementType) && (bt = Bo) : bt = bg;
            if (bt && (bt = bt(t, f))) {
              Mo(w, bt, n, A);
              break t;
            }
            X && X(t, v, f), t === "focusout" && f && v.type === "number" && f.memoizedProps.value != null && Bs(v, "number", v.value);
          }
          switch (X = f ? el(f) : window, t) {
            case "focusin":
              (wo(X) || X.contentEditable === "true") && (va = X, Qs = f, rl = null);
              break;
            case "focusout":
              rl = Qs = va = null;
              break;
            case "mousedown":
              Zs = true;
              break;
            case "contextmenu":
            case "mouseup":
            case "dragend":
              Zs = false, qo(w, n, A);
              break;
            case "selectionchange":
              if (vg) break;
            case "keydown":
            case "keyup":
              qo(w, n, A);
          }
          var st;
          if (Us) t: {
            switch (t) {
              case "compositionstart":
                var dt = "onCompositionStart";
                break t;
              case "compositionend":
                dt = "onCompositionEnd";
                break t;
              case "compositionupdate":
                dt = "onCompositionUpdate";
                break t;
            }
            dt = void 0;
          }
          else ya ? Ao(t, n) && (dt = "onCompositionEnd") : t === "keydown" && n.keyCode === 229 && (dt = "onCompositionStart");
          dt && (To && n.locale !== "ko" && (ya || dt !== "onCompositionStart" ? dt === "onCompositionEnd" && ya && (st = vo()) : (yn = A, _s = "value" in yn ? yn.value : yn.textContent, ya = true)), X = Fi(f, dt), 0 < X.length && (dt = new Co(dt, t, null, n, A), w.push({ event: dt, listeners: X }), st ? dt.data = st : (st = So(n), st !== null && (dt.data = st)))), (st = rg ? ug(t, n) : dg(t, n)) && (dt = Fi(f, "onBeforeInput"), 0 < dt.length && (X = new Co("onBeforeInput", "beforeinput", null, n, A), w.push({ event: X, listeners: dt }), X.data = st)), a0(w, t, f, n, A);
        }
        md(w, e);
      });
    }
    function Dl(t, e, n) {
      return { instance: t, listener: e, currentTarget: n };
    }
    function Fi(t, e) {
      for (var n = e + "Capture", l = []; t !== null; ) {
        var i = t, s = i.stateNode;
        if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || s === null || (i = nl(t, n), i != null && l.unshift(Dl(t, i, s)), i = nl(t, e), i != null && l.push(Dl(t, i, s))), t.tag === 3) return l;
        t = t.return;
      }
      return [];
    }
    function c0(t) {
      if (t === null) return null;
      do
        t = t.return;
      while (t && t.tag !== 5 && t.tag !== 27);
      return t || null;
    }
    function xd(t, e, n, l, i) {
      for (var s = e._reactName, c = []; n !== null && n !== l; ) {
        var h = n, r = h.alternate, f = h.stateNode;
        if (h = h.tag, r !== null && r === l) break;
        h !== 5 && h !== 26 && h !== 27 || f === null || (r = f, i ? (f = nl(n, s), f != null && c.unshift(Dl(n, f, r))) : i || (f = nl(n, s), f != null && c.push(Dl(n, f, r)))), n = n.return;
      }
      c.length !== 0 && t.push({ event: e, listeners: c });
    }
    var h0 = /\r\n?/g, o0 = /\u0000|\uFFFD/g;
    function pd(t) {
      return (typeof t == "string" ? t : "" + t).replace(h0, `
`).replace(o0, "");
    }
    function bd(t, e) {
      return e = pd(e), pd(t) === e;
    }
    function Tt(t, e, n, l, i, s) {
      switch (n) {
        case "children":
          typeof l == "string" ? e === "body" || e === "textarea" && l === "" || pa(t, l) : (typeof l == "number" || typeof l == "bigint") && e !== "body" && pa(t, "" + l);
          break;
        case "className":
          ei(t, "class", l);
          break;
        case "tabIndex":
          ei(t, "tabindex", l);
          break;
        case "dir":
        case "role":
        case "viewBox":
        case "width":
        case "height":
          ei(t, n, l);
          break;
        case "style":
          bo(t, l, s);
          break;
        case "data":
          if (e !== "object") {
            ei(t, "data", l);
            break;
          }
        case "src":
        case "href":
          if (l === "" && (e !== "a" || n !== "href")) {
            t.removeAttribute(n);
            break;
          }
          if (l == null || typeof l == "function" || typeof l == "symbol" || typeof l == "boolean") {
            t.removeAttribute(n);
            break;
          }
          l = ai("" + l), t.setAttribute(n, l);
          break;
        case "action":
        case "formAction":
          if (typeof l == "function") {
            t.setAttribute(n, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
            break;
          } else typeof s == "function" && (n === "formAction" ? (e !== "input" && Tt(t, e, "name", i.name, i, null), Tt(t, e, "formEncType", i.formEncType, i, null), Tt(t, e, "formMethod", i.formMethod, i, null), Tt(t, e, "formTarget", i.formTarget, i, null)) : (Tt(t, e, "encType", i.encType, i, null), Tt(t, e, "method", i.method, i, null), Tt(t, e, "target", i.target, i, null)));
          if (l == null || typeof l == "symbol" || typeof l == "boolean") {
            t.removeAttribute(n);
            break;
          }
          l = ai("" + l), t.setAttribute(n, l);
          break;
        case "onClick":
          l != null && (t.onclick = Fe);
          break;
        case "onScroll":
          l != null && rt("scroll", t);
          break;
        case "onScrollEnd":
          l != null && rt("scrollend", t);
          break;
        case "dangerouslySetInnerHTML":
          if (l != null) {
            if (typeof l != "object" || !("__html" in l)) throw Error(o(61));
            if (n = l.__html, n != null) {
              if (i.children != null) throw Error(o(60));
              t.innerHTML = n;
            }
          }
          break;
        case "multiple":
          t.multiple = l && typeof l != "function" && typeof l != "symbol";
          break;
        case "muted":
          t.muted = l && typeof l != "function" && typeof l != "symbol";
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
          if (l == null || typeof l == "function" || typeof l == "boolean" || typeof l == "symbol") {
            t.removeAttribute("xlink:href");
            break;
          }
          n = ai("" + l), t.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
          break;
        case "contentEditable":
        case "spellCheck":
        case "draggable":
        case "value":
        case "autoReverse":
        case "externalResourcesRequired":
        case "focusable":
        case "preserveAlpha":
          l != null && typeof l != "function" && typeof l != "symbol" ? t.setAttribute(n, "" + l) : t.removeAttribute(n);
          break;
        case "inert":
        case "allowFullScreen":
        case "async":
        case "autoPlay":
        case "controls":
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
          l && typeof l != "function" && typeof l != "symbol" ? t.setAttribute(n, "") : t.removeAttribute(n);
          break;
        case "capture":
        case "download":
          l === true ? t.setAttribute(n, "") : l !== false && l != null && typeof l != "function" && typeof l != "symbol" ? t.setAttribute(n, l) : t.removeAttribute(n);
          break;
        case "cols":
        case "rows":
        case "size":
        case "span":
          l != null && typeof l != "function" && typeof l != "symbol" && !isNaN(l) && 1 <= l ? t.setAttribute(n, l) : t.removeAttribute(n);
          break;
        case "rowSpan":
        case "start":
          l == null || typeof l == "function" || typeof l == "symbol" || isNaN(l) ? t.removeAttribute(n) : t.setAttribute(n, l);
          break;
        case "popover":
          rt("beforetoggle", t), rt("toggle", t), ti(t, "popover", l);
          break;
        case "xlinkActuate":
          $e(t, "http://www.w3.org/1999/xlink", "xlink:actuate", l);
          break;
        case "xlinkArcrole":
          $e(t, "http://www.w3.org/1999/xlink", "xlink:arcrole", l);
          break;
        case "xlinkRole":
          $e(t, "http://www.w3.org/1999/xlink", "xlink:role", l);
          break;
        case "xlinkShow":
          $e(t, "http://www.w3.org/1999/xlink", "xlink:show", l);
          break;
        case "xlinkTitle":
          $e(t, "http://www.w3.org/1999/xlink", "xlink:title", l);
          break;
        case "xlinkType":
          $e(t, "http://www.w3.org/1999/xlink", "xlink:type", l);
          break;
        case "xmlBase":
          $e(t, "http://www.w3.org/XML/1998/namespace", "xml:base", l);
          break;
        case "xmlLang":
          $e(t, "http://www.w3.org/XML/1998/namespace", "xml:lang", l);
          break;
        case "xmlSpace":
          $e(t, "http://www.w3.org/XML/1998/namespace", "xml:space", l);
          break;
        case "is":
          ti(t, "is", l);
          break;
        case "innerText":
        case "textContent":
          break;
        default:
          (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = Km.get(n) || n, ti(t, n, l));
      }
    }
    function yh(t, e, n, l, i, s) {
      switch (n) {
        case "style":
          bo(t, l, s);
          break;
        case "dangerouslySetInnerHTML":
          if (l != null) {
            if (typeof l != "object" || !("__html" in l)) throw Error(o(61));
            if (n = l.__html, n != null) {
              if (i.children != null) throw Error(o(60));
              t.innerHTML = n;
            }
          }
          break;
        case "children":
          typeof l == "string" ? pa(t, l) : (typeof l == "number" || typeof l == "bigint") && pa(t, "" + l);
          break;
        case "onScroll":
          l != null && rt("scroll", t);
          break;
        case "onScrollEnd":
          l != null && rt("scrollend", t);
          break;
        case "onClick":
          l != null && (t.onclick = Fe);
          break;
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "innerHTML":
        case "ref":
          break;
        case "innerText":
        case "textContent":
          break;
        default:
          if (!co.hasOwnProperty(n)) t: {
            if (n[0] === "o" && n[1] === "n" && (i = n.endsWith("Capture"), e = n.slice(2, i ? n.length - 7 : void 0), s = t[ue] || null, s = s != null ? s[n] : null, typeof s == "function" && t.removeEventListener(e, s, i), typeof l == "function")) {
              typeof s != "function" && s !== null && (n in t ? t[n] = null : t.hasAttribute(n) && t.removeAttribute(n)), t.addEventListener(e, l, i);
              break t;
            }
            n in t ? t[n] = l : l === true ? t.setAttribute(n, "") : ti(t, n, l);
          }
      }
    }
    function ne(t, e, n) {
      switch (e) {
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
          rt("error", t), rt("load", t);
          var l = false, i = false, s;
          for (s in n) if (n.hasOwnProperty(s)) {
            var c = n[s];
            if (c != null) switch (s) {
              case "src":
                l = true;
                break;
              case "srcSet":
                i = true;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(o(137, e));
              default:
                Tt(t, e, s, c, n, null);
            }
          }
          i && Tt(t, e, "srcSet", n.srcSet, n, null), l && Tt(t, e, "src", n.src, n, null);
          return;
        case "input":
          rt("invalid", t);
          var h = s = c = i = null, r = null, f = null;
          for (l in n) if (n.hasOwnProperty(l)) {
            var A = n[l];
            if (A != null) switch (l) {
              case "name":
                i = A;
                break;
              case "type":
                c = A;
                break;
              case "checked":
                r = A;
                break;
              case "defaultChecked":
                f = A;
                break;
              case "value":
                s = A;
                break;
              case "defaultValue":
                h = A;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (A != null) throw Error(o(137, e));
                break;
              default:
                Tt(t, e, l, A, n, null);
            }
          }
          mo(t, s, h, r, f, c, i, false);
          return;
        case "select":
          rt("invalid", t), l = c = s = null;
          for (i in n) if (n.hasOwnProperty(i) && (h = n[i], h != null)) switch (i) {
            case "value":
              s = h;
              break;
            case "defaultValue":
              c = h;
              break;
            case "multiple":
              l = h;
            default:
              Tt(t, e, i, h, n, null);
          }
          e = s, n = c, t.multiple = !!l, e != null ? xa(t, !!l, e, false) : n != null && xa(t, !!l, n, true);
          return;
        case "textarea":
          rt("invalid", t), s = i = l = null;
          for (c in n) if (n.hasOwnProperty(c) && (h = n[c], h != null)) switch (c) {
            case "value":
              l = h;
              break;
            case "defaultValue":
              i = h;
              break;
            case "children":
              s = h;
              break;
            case "dangerouslySetInnerHTML":
              if (h != null) throw Error(o(91));
              break;
            default:
              Tt(t, e, c, h, n, null);
          }
          xo(t, l, i, s);
          return;
        case "option":
          for (r in n) if (n.hasOwnProperty(r) && (l = n[r], l != null)) switch (r) {
            case "selected":
              t.selected = l && typeof l != "function" && typeof l != "symbol";
              break;
            default:
              Tt(t, e, r, l, n, null);
          }
          return;
        case "dialog":
          rt("beforetoggle", t), rt("toggle", t), rt("cancel", t), rt("close", t);
          break;
        case "iframe":
        case "object":
          rt("load", t);
          break;
        case "video":
        case "audio":
          for (l = 0; l < El.length; l++) rt(El[l], t);
          break;
        case "image":
          rt("error", t), rt("load", t);
          break;
        case "details":
          rt("toggle", t);
          break;
        case "embed":
        case "source":
        case "link":
          rt("error", t), rt("load", t);
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
          for (f in n) if (n.hasOwnProperty(f) && (l = n[f], l != null)) switch (f) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error(o(137, e));
            default:
              Tt(t, e, f, l, n, null);
          }
          return;
        default:
          if (Gs(e)) {
            for (A in n) n.hasOwnProperty(A) && (l = n[A], l !== void 0 && yh(t, e, A, l, n, void 0));
            return;
          }
      }
      for (h in n) n.hasOwnProperty(h) && (l = n[h], l != null && Tt(t, e, h, l, n, null));
    }
    function r0(t, e, n, l) {
      switch (e) {
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
          var i = null, s = null, c = null, h = null, r = null, f = null, A = null;
          for (N in n) {
            var w = n[N];
            if (n.hasOwnProperty(N) && w != null) switch (N) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                r = w;
              default:
                l.hasOwnProperty(N) || Tt(t, e, N, null, l, w);
            }
          }
          for (var v in l) {
            var N = l[v];
            if (w = n[v], l.hasOwnProperty(v) && (N != null || w != null)) switch (v) {
              case "type":
                s = N;
                break;
              case "name":
                i = N;
                break;
              case "checked":
                f = N;
                break;
              case "defaultChecked":
                A = N;
                break;
              case "value":
                c = N;
                break;
              case "defaultValue":
                h = N;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (N != null) throw Error(o(137, e));
                break;
              default:
                N !== w && Tt(t, e, v, N, l, w);
            }
          }
          Ms(t, c, h, r, f, A, s, i);
          return;
        case "select":
          N = c = h = v = null;
          for (s in n) if (r = n[s], n.hasOwnProperty(s) && r != null) switch (s) {
            case "value":
              break;
            case "multiple":
              N = r;
            default:
              l.hasOwnProperty(s) || Tt(t, e, s, null, l, r);
          }
          for (i in l) if (s = l[i], r = n[i], l.hasOwnProperty(i) && (s != null || r != null)) switch (i) {
            case "value":
              v = s;
              break;
            case "defaultValue":
              h = s;
              break;
            case "multiple":
              c = s;
            default:
              s !== r && Tt(t, e, i, s, l, r);
          }
          e = h, n = c, l = N, v != null ? xa(t, !!n, v, false) : !!l != !!n && (e != null ? xa(t, !!n, e, true) : xa(t, !!n, n ? [] : "", false));
          return;
        case "textarea":
          N = v = null;
          for (h in n) if (i = n[h], n.hasOwnProperty(h) && i != null && !l.hasOwnProperty(h)) switch (h) {
            case "value":
              break;
            case "children":
              break;
            default:
              Tt(t, e, h, null, l, i);
          }
          for (c in l) if (i = l[c], s = n[c], l.hasOwnProperty(c) && (i != null || s != null)) switch (c) {
            case "value":
              v = i;
              break;
            case "defaultValue":
              N = i;
              break;
            case "children":
              break;
            case "dangerouslySetInnerHTML":
              if (i != null) throw Error(o(91));
              break;
            default:
              i !== s && Tt(t, e, c, i, l, s);
          }
          go(t, v, N);
          return;
        case "option":
          for (var V in n) if (v = n[V], n.hasOwnProperty(V) && v != null && !l.hasOwnProperty(V)) switch (V) {
            case "selected":
              t.selected = false;
              break;
            default:
              Tt(t, e, V, null, l, v);
          }
          for (r in l) if (v = l[r], N = n[r], l.hasOwnProperty(r) && v !== N && (v != null || N != null)) switch (r) {
            case "selected":
              t.selected = v && typeof v != "function" && typeof v != "symbol";
              break;
            default:
              Tt(t, e, r, v, l, N);
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
          for (var W in n) v = n[W], n.hasOwnProperty(W) && v != null && !l.hasOwnProperty(W) && Tt(t, e, W, null, l, v);
          for (f in l) if (v = l[f], N = n[f], l.hasOwnProperty(f) && v !== N && (v != null || N != null)) switch (f) {
            case "children":
            case "dangerouslySetInnerHTML":
              if (v != null) throw Error(o(137, e));
              break;
            default:
              Tt(t, e, f, v, l, N);
          }
          return;
        default:
          if (Gs(e)) {
            for (var Ot in n) v = n[Ot], n.hasOwnProperty(Ot) && v !== void 0 && !l.hasOwnProperty(Ot) && yh(t, e, Ot, void 0, l, v);
            for (A in l) v = l[A], N = n[A], !l.hasOwnProperty(A) || v === N || v === void 0 && N === void 0 || yh(t, e, A, v, l, N);
            return;
          }
      }
      for (var x in n) v = n[x], n.hasOwnProperty(x) && v != null && !l.hasOwnProperty(x) && Tt(t, e, x, null, l, v);
      for (w in l) v = l[w], N = n[w], !l.hasOwnProperty(w) || v === N || v == null && N == null || Tt(t, e, w, v, l, N);
    }
    function fd(t) {
      switch (t) {
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
    function u0() {
      if (typeof performance.getEntriesByType == "function") {
        for (var t = 0, e = 0, n = performance.getEntriesByType("resource"), l = 0; l < n.length; l++) {
          var i = n[l], s = i.transferSize, c = i.initiatorType, h = i.duration;
          if (s && h && fd(c)) {
            for (c = 0, h = i.responseEnd, l += 1; l < n.length; l++) {
              var r = n[l], f = r.startTime;
              if (f > h) break;
              var A = r.transferSize, w = r.initiatorType;
              A && fd(w) && (r = r.responseEnd, c += A * (r < h ? 1 : (h - f) / (r - f)));
            }
            if (--l, e += 8 * (s + c) / (i.duration / 1e3), t++, 10 < t) break;
          }
        }
        if (0 < t) return e / t / 1e6;
      }
      return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
    }
    var vh = null, Nh = null;
    function Wi(t) {
      return t.nodeType === 9 ? t : t.ownerDocument;
    }
    function yd(t) {
      switch (t) {
        case "http://www.w3.org/2000/svg":
          return 1;
        case "http://www.w3.org/1998/Math/MathML":
          return 2;
        default:
          return 0;
      }
    }
    function vd(t, e) {
      if (t === 0) switch (e) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
      return t === 1 && e === "foreignObject" ? 0 : t;
    }
    function jh(t, e) {
      return t === "textarea" || t === "noscript" || typeof e.children == "string" || typeof e.children == "number" || typeof e.children == "bigint" || typeof e.dangerouslySetInnerHTML == "object" && e.dangerouslySetInnerHTML !== null && e.dangerouslySetInnerHTML.__html != null;
    }
    var Ch = null;
    function d0() {
      var t = window.event;
      return t && t.type === "popstate" ? t === Ch ? false : (Ch = t, true) : (Ch = null, false);
    }
    var Nd = typeof setTimeout == "function" ? setTimeout : void 0, m0 = typeof clearTimeout == "function" ? clearTimeout : void 0, jd = typeof Promise == "function" ? Promise : void 0, g0 = typeof queueMicrotask == "function" ? queueMicrotask : typeof jd < "u" ? function(t) {
      return jd.resolve(null).then(t).catch(x0);
    } : Nd;
    function x0(t) {
      setTimeout(function() {
        throw t;
      });
    }
    function Ln(t) {
      return t === "head";
    }
    function Cd(t, e) {
      var n = e, l = 0;
      do {
        var i = n.nextSibling;
        if (t.removeChild(n), i && i.nodeType === 8) if (n = i.data, n === "/$" || n === "/&") {
          if (l === 0) {
            t.removeChild(i), Qa(e);
            return;
          }
          l--;
        } else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&") l++;
        else if (n === "html") Ll(t.ownerDocument.documentElement);
        else if (n === "head") {
          n = t.ownerDocument.head, Ll(n);
          for (var s = n.firstChild; s; ) {
            var c = s.nextSibling, h = s.nodeName;
            s[tl] || h === "SCRIPT" || h === "STYLE" || h === "LINK" && s.rel.toLowerCase() === "stylesheet" || n.removeChild(s), s = c;
          }
        } else n === "body" && Ll(t.ownerDocument.body);
        n = i;
      } while (n);
      Qa(e);
    }
    function Hd(t, e) {
      var n = t;
      t = 0;
      do {
        var l = n.nextSibling;
        if (n.nodeType === 1 ? e ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (e ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), l && l.nodeType === 8) if (n = l.data, n === "/$") {
          if (t === 0) break;
          t--;
        } else n !== "$" && n !== "$?" && n !== "$~" && n !== "$!" || t++;
        n = l;
      } while (n);
    }
    function Hh(t) {
      var e = t.firstChild;
      for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
        var n = e;
        switch (e = e.nextSibling, n.nodeName) {
          case "HTML":
          case "HEAD":
          case "BODY":
            Hh(n), Ss(n);
            continue;
          case "SCRIPT":
          case "STYLE":
            continue;
          case "LINK":
            if (n.rel.toLowerCase() === "stylesheet") continue;
        }
        t.removeChild(n);
      }
    }
    function p0(t, e, n, l) {
      for (; t.nodeType === 1; ) {
        var i = n;
        if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
          if (!l && (t.nodeName !== "INPUT" || t.type !== "hidden")) break;
        } else if (l) {
          if (!t[tl]) switch (e) {
            case "meta":
              if (!t.hasAttribute("itemprop")) break;
              return t;
            case "link":
              if (s = t.getAttribute("rel"), s === "stylesheet" && t.hasAttribute("data-precedence")) break;
              if (s !== i.rel || t.getAttribute("href") !== (i.href == null || i.href === "" ? null : i.href) || t.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin) || t.getAttribute("title") !== (i.title == null ? null : i.title)) break;
              return t;
            case "style":
              if (t.hasAttribute("data-precedence")) break;
              return t;
            case "script":
              if (s = t.getAttribute("src"), (s !== (i.src == null ? null : i.src) || t.getAttribute("type") !== (i.type == null ? null : i.type) || t.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin)) && s && t.hasAttribute("async") && !t.hasAttribute("itemprop")) break;
              return t;
            default:
              return t;
          }
        } else if (e === "input" && t.type === "hidden") {
          var s = i.name == null ? null : "" + i.name;
          if (i.type === "hidden" && t.getAttribute("name") === s) return t;
        } else return t;
        if (t = Le(t.nextSibling), t === null) break;
      }
      return null;
    }
    function b0(t, e, n) {
      if (e === "") return null;
      for (; t.nodeType !== 3; ) if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !n || (t = Le(t.nextSibling), t === null)) return null;
      return t;
    }
    function Td(t, e) {
      for (; t.nodeType !== 8; ) if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !e || (t = Le(t.nextSibling), t === null)) return null;
      return t;
    }
    function Th(t) {
      return t.data === "$?" || t.data === "$~";
    }
    function Oh(t) {
      return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
    }
    function f0(t, e) {
      var n = t.ownerDocument;
      if (t.data === "$~") t._reactRetry = e;
      else if (t.data !== "$?" || n.readyState !== "loading") e();
      else {
        var l = function() {
          e(), n.removeEventListener("DOMContentLoaded", l);
        };
        n.addEventListener("DOMContentLoaded", l), t._reactRetry = l;
      }
    }
    function Le(t) {
      for (; t != null; t = t.nextSibling) {
        var e = t.nodeType;
        if (e === 1 || e === 3) break;
        if (e === 8) {
          if (e = t.data, e === "$" || e === "$!" || e === "$?" || e === "$~" || e === "&" || e === "F!" || e === "F") break;
          if (e === "/$" || e === "/&") return null;
        }
      }
      return t;
    }
    var kh = null;
    function Od(t) {
      t = t.nextSibling;
      for (var e = 0; t; ) {
        if (t.nodeType === 8) {
          var n = t.data;
          if (n === "/$" || n === "/&") {
            if (e === 0) return Le(t.nextSibling);
            e--;
          } else n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || e++;
        }
        t = t.nextSibling;
      }
      return null;
    }
    function kd(t) {
      t = t.previousSibling;
      for (var e = 0; t; ) {
        if (t.nodeType === 8) {
          var n = t.data;
          if (n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&") {
            if (e === 0) return t;
            e--;
          } else n !== "/$" && n !== "/&" || e++;
        }
        t = t.previousSibling;
      }
      return null;
    }
    function Ad(t, e, n) {
      switch (e = Wi(n), t) {
        case "html":
          if (t = e.documentElement, !t) throw Error(o(452));
          return t;
        case "head":
          if (t = e.head, !t) throw Error(o(453));
          return t;
        case "body":
          if (t = e.body, !t) throw Error(o(454));
          return t;
        default:
          throw Error(o(451));
      }
    }
    function Ll(t) {
      for (var e = t.attributes; e.length; ) t.removeAttributeNode(e[0]);
      Ss(t);
    }
    var Ke = /* @__PURE__ */ new Map(), Sd = /* @__PURE__ */ new Set();
    function Ii(t) {
      return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
    }
    var gn = K.d;
    K.d = { f: y0, r: v0, D: N0, C: j0, L: C0, m: H0, X: O0, S: T0, M: k0 };
    function y0() {
      var t = gn.f(), e = Yi();
      return t || e;
    }
    function v0(t) {
      var e = da(t);
      e !== null && e.tag === 5 && e.type === "form" ? Xr(e) : gn.r(t);
    }
    var Ya = typeof document > "u" ? null : document;
    function wd(t, e, n) {
      var l = Ya;
      if (l && typeof e == "string" && e) {
        var i = Se(e);
        i = 'link[rel="' + t + '"][href="' + i + '"]', typeof n == "string" && (i += '[crossorigin="' + n + '"]'), Sd.has(i) || (Sd.add(i), t = { rel: t, crossOrigin: n, href: e }, l.querySelector(i) === null && (e = l.createElement("link"), ne(e, "link", t), Jt(e), l.head.appendChild(e)));
      }
    }
    function N0(t) {
      gn.D(t), wd("dns-prefetch", t, null);
    }
    function j0(t, e) {
      gn.C(t, e), wd("preconnect", t, e);
    }
    function C0(t, e, n) {
      gn.L(t, e, n);
      var l = Ya;
      if (l && t && e) {
        var i = 'link[rel="preload"][as="' + Se(e) + '"]';
        e === "image" && n && n.imageSrcSet ? (i += '[imagesrcset="' + Se(n.imageSrcSet) + '"]', typeof n.imageSizes == "string" && (i += '[imagesizes="' + Se(n.imageSizes) + '"]')) : i += '[href="' + Se(t) + '"]';
        var s = i;
        switch (e) {
          case "style":
            s = Va(t);
            break;
          case "script":
            s = Xa(t);
        }
        Ke.has(s) || (t = _({ rel: "preload", href: e === "image" && n && n.imageSrcSet ? void 0 : t, as: e }, n), Ke.set(s, t), l.querySelector(i) !== null || e === "style" && l.querySelector(Kl(s)) || e === "script" && l.querySelector(_l(s)) || (e = l.createElement("link"), ne(e, "link", t), Jt(e), l.head.appendChild(e)));
      }
    }
    function H0(t, e) {
      gn.m(t, e);
      var n = Ya;
      if (n && t) {
        var l = e && typeof e.as == "string" ? e.as : "script", i = 'link[rel="modulepreload"][as="' + Se(l) + '"][href="' + Se(t) + '"]', s = i;
        switch (l) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            s = Xa(t);
        }
        if (!Ke.has(s) && (t = _({ rel: "modulepreload", href: t }, e), Ke.set(s, t), n.querySelector(i) === null)) {
          switch (l) {
            case "audioworklet":
            case "paintworklet":
            case "serviceworker":
            case "sharedworker":
            case "worker":
            case "script":
              if (n.querySelector(_l(s))) return;
          }
          l = n.createElement("link"), ne(l, "link", t), Jt(l), n.head.appendChild(l);
        }
      }
    }
    function T0(t, e, n) {
      gn.S(t, e, n);
      var l = Ya;
      if (l && t) {
        var i = ma(l).hoistableStyles, s = Va(t);
        e = e || "default";
        var c = i.get(s);
        if (!c) {
          var h = { loading: 0, preload: null };
          if (c = l.querySelector(Kl(s))) h.loading = 5;
          else {
            t = _({ rel: "stylesheet", href: t, "data-precedence": e }, n), (n = Ke.get(s)) && Ah(t, n);
            var r = c = l.createElement("link");
            Jt(r), ne(r, "link", t), r._p = new Promise(function(f, A) {
              r.onload = f, r.onerror = A;
            }), r.addEventListener("load", function() {
              h.loading |= 1;
            }), r.addEventListener("error", function() {
              h.loading |= 2;
            }), h.loading |= 4, ts(c, e, l);
          }
          c = { type: "stylesheet", instance: c, count: 1, state: h }, i.set(s, c);
        }
      }
    }
    function O0(t, e) {
      gn.X(t, e);
      var n = Ya;
      if (n && t) {
        var l = ma(n).hoistableScripts, i = Xa(t), s = l.get(i);
        s || (s = n.querySelector(_l(i)), s || (t = _({ src: t, async: true }, e), (e = Ke.get(i)) && Sh(t, e), s = n.createElement("script"), Jt(s), ne(s, "link", t), n.head.appendChild(s)), s = { type: "script", instance: s, count: 1, state: null }, l.set(i, s));
      }
    }
    function k0(t, e) {
      gn.M(t, e);
      var n = Ya;
      if (n && t) {
        var l = ma(n).hoistableScripts, i = Xa(t), s = l.get(i);
        s || (s = n.querySelector(_l(i)), s || (t = _({ src: t, async: true, type: "module" }, e), (e = Ke.get(i)) && Sh(t, e), s = n.createElement("script"), Jt(s), ne(s, "link", t), n.head.appendChild(s)), s = { type: "script", instance: s, count: 1, state: null }, l.set(i, s));
      }
    }
    function Md(t, e, n, l) {
      var i = (i = I.current) ? Ii(i) : null;
      if (!i) throw Error(o(446));
      switch (t) {
        case "meta":
        case "title":
          return null;
        case "style":
          return typeof n.precedence == "string" && typeof n.href == "string" ? (e = Va(n.href), n = ma(i).hoistableStyles, l = n.get(e), l || (l = { type: "style", instance: null, count: 0, state: null }, n.set(e, l)), l) : { type: "void", instance: null, count: 0, state: null };
        case "link":
          if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
            t = Va(n.href);
            var s = ma(i).hoistableStyles, c = s.get(t);
            if (c || (i = i.ownerDocument || i, c = { type: "stylesheet", instance: null, count: 0, state: { loading: 0, preload: null } }, s.set(t, c), (s = i.querySelector(Kl(t))) && !s._p && (c.instance = s, c.state.loading = 5), Ke.has(t) || (n = { rel: "preload", as: "style", href: n.href, crossOrigin: n.crossOrigin, integrity: n.integrity, media: n.media, hrefLang: n.hrefLang, referrerPolicy: n.referrerPolicy }, Ke.set(t, n), s || A0(i, t, n, c.state))), e && l === null) throw Error(o(528, ""));
            return c;
          }
          if (e && l !== null) throw Error(o(529, ""));
          return null;
        case "script":
          return e = n.async, n = n.src, typeof n == "string" && e && typeof e != "function" && typeof e != "symbol" ? (e = Xa(n), n = ma(i).hoistableScripts, l = n.get(e), l || (l = { type: "script", instance: null, count: 0, state: null }, n.set(e, l)), l) : { type: "void", instance: null, count: 0, state: null };
        default:
          throw Error(o(444, t));
      }
    }
    function Va(t) {
      return 'href="' + Se(t) + '"';
    }
    function Kl(t) {
      return 'link[rel="stylesheet"][' + t + "]";
    }
    function Bd(t) {
      return _({}, t, { "data-precedence": t.precedence, precedence: null });
    }
    function A0(t, e, n, l) {
      t.querySelector('link[rel="preload"][as="style"][' + e + "]") ? l.loading = 1 : (e = t.createElement("link"), l.preload = e, e.addEventListener("load", function() {
        return l.loading |= 1;
      }), e.addEventListener("error", function() {
        return l.loading |= 2;
      }), ne(e, "link", n), Jt(e), t.head.appendChild(e));
    }
    function Xa(t) {
      return '[src="' + Se(t) + '"]';
    }
    function _l(t) {
      return "script[async]" + t;
    }
    function Gd(t, e, n) {
      if (e.count++, e.instance === null) switch (e.type) {
        case "style":
          var l = t.querySelector('style[data-href~="' + Se(n.href) + '"]');
          if (l) return e.instance = l, Jt(l), l;
          var i = _({}, n, { "data-href": n.href, "data-precedence": n.precedence, href: null, precedence: null });
          return l = (t.ownerDocument || t).createElement("style"), Jt(l), ne(l, "style", i), ts(l, n.precedence, t), e.instance = l;
        case "stylesheet":
          i = Va(n.href);
          var s = t.querySelector(Kl(i));
          if (s) return e.state.loading |= 4, e.instance = s, Jt(s), s;
          l = Bd(n), (i = Ke.get(i)) && Ah(l, i), s = (t.ownerDocument || t).createElement("link"), Jt(s);
          var c = s;
          return c._p = new Promise(function(h, r) {
            c.onload = h, c.onerror = r;
          }), ne(s, "link", l), e.state.loading |= 4, ts(s, n.precedence, t), e.instance = s;
        case "script":
          return s = Xa(n.src), (i = t.querySelector(_l(s))) ? (e.instance = i, Jt(i), i) : (l = n, (i = Ke.get(s)) && (l = _({}, n), Sh(l, i)), t = t.ownerDocument || t, i = t.createElement("script"), Jt(i), ne(i, "link", l), t.head.appendChild(i), e.instance = i);
        case "void":
          return null;
        default:
          throw Error(o(443, e.type));
      }
      else e.type === "stylesheet" && (e.state.loading & 4) === 0 && (l = e.instance, e.state.loading |= 4, ts(l, n.precedence, t));
      return e.instance;
    }
    function ts(t, e, n) {
      for (var l = n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'), i = l.length ? l[l.length - 1] : null, s = i, c = 0; c < l.length; c++) {
        var h = l[c];
        if (h.dataset.precedence === e) s = h;
        else if (s !== i) break;
      }
      s ? s.parentNode.insertBefore(t, s.nextSibling) : (e = n.nodeType === 9 ? n.head : n, e.insertBefore(t, e.firstChild));
    }
    function Ah(t, e) {
      t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.title == null && (t.title = e.title);
    }
    function Sh(t, e) {
      t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.integrity == null && (t.integrity = e.integrity);
    }
    var es = null;
    function Ed(t, e, n) {
      if (es === null) {
        var l = /* @__PURE__ */ new Map(), i = es = /* @__PURE__ */ new Map();
        i.set(n, l);
      } else i = es, l = i.get(n), l || (l = /* @__PURE__ */ new Map(), i.set(n, l));
      if (l.has(t)) return l;
      for (l.set(t, null), n = n.getElementsByTagName(t), i = 0; i < n.length; i++) {
        var s = n[i];
        if (!(s[tl] || s[Wt] || t === "link" && s.getAttribute("rel") === "stylesheet") && s.namespaceURI !== "http://www.w3.org/2000/svg") {
          var c = s.getAttribute(e) || "";
          c = t + c;
          var h = l.get(c);
          h ? h.push(s) : l.set(c, [s]);
        }
      }
      return l;
    }
    function Dd(t, e, n) {
      t = t.ownerDocument || t, t.head.insertBefore(n, e === "title" ? t.querySelector("head > title") : null);
    }
    function S0(t, e, n) {
      if (n === 1 || e.itemProp != null) return false;
      switch (t) {
        case "meta":
        case "title":
          return true;
        case "style":
          if (typeof e.precedence != "string" || typeof e.href != "string" || e.href === "") break;
          return true;
        case "link":
          if (typeof e.rel != "string" || typeof e.href != "string" || e.href === "" || e.onLoad || e.onError) break;
          switch (e.rel) {
            case "stylesheet":
              return t = e.disabled, typeof e.precedence == "string" && t == null;
            default:
              return true;
          }
        case "script":
          if (e.async && typeof e.async != "function" && typeof e.async != "symbol" && !e.onLoad && !e.onError && e.src && typeof e.src == "string") return true;
      }
      return false;
    }
    function Ld(t) {
      return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
    }
    function w0(t, e, n, l) {
      if (n.type === "stylesheet" && (typeof l.media != "string" || matchMedia(l.media).matches !== false) && (n.state.loading & 4) === 0) {
        if (n.instance === null) {
          var i = Va(l.href), s = e.querySelector(Kl(i));
          if (s) {
            e = s._p, e !== null && typeof e == "object" && typeof e.then == "function" && (t.count++, t = ns.bind(t), e.then(t, t)), n.state.loading |= 4, n.instance = s, Jt(s);
            return;
          }
          s = e.ownerDocument || e, l = Bd(l), (i = Ke.get(i)) && Ah(l, i), s = s.createElement("link"), Jt(s);
          var c = s;
          c._p = new Promise(function(h, r) {
            c.onload = h, c.onerror = r;
          }), ne(s, "link", l), n.instance = s;
        }
        t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(n, e), (e = n.state.preload) && (n.state.loading & 3) === 0 && (t.count++, n = ns.bind(t), e.addEventListener("load", n), e.addEventListener("error", n));
      }
    }
    var wh = 0;
    function M0(t, e) {
      return t.stylesheets && t.count === 0 && ls(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(n) {
        var l = setTimeout(function() {
          if (t.stylesheets && ls(t, t.stylesheets), t.unsuspend) {
            var s = t.unsuspend;
            t.unsuspend = null, s();
          }
        }, 6e4 + e);
        0 < t.imgBytes && wh === 0 && (wh = 62500 * u0());
        var i = setTimeout(function() {
          if (t.waitingForImages = false, t.count === 0 && (t.stylesheets && ls(t, t.stylesheets), t.unsuspend)) {
            var s = t.unsuspend;
            t.unsuspend = null, s();
          }
        }, (t.imgBytes > wh ? 50 : 800) + e);
        return t.unsuspend = n, function() {
          t.unsuspend = null, clearTimeout(l), clearTimeout(i);
        };
      } : null;
    }
    function ns() {
      if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
        if (this.stylesheets) ls(this, this.stylesheets);
        else if (this.unsuspend) {
          var t = this.unsuspend;
          this.unsuspend = null, t();
        }
      }
    }
    var as = null;
    function ls(t, e) {
      t.stylesheets = null, t.unsuspend !== null && (t.count++, as = /* @__PURE__ */ new Map(), e.forEach(B0, t), as = null, ns.call(t));
    }
    function B0(t, e) {
      if (!(e.state.loading & 4)) {
        var n = as.get(t);
        if (n) var l = n.get(null);
        else {
          n = /* @__PURE__ */ new Map(), as.set(t, n);
          for (var i = t.querySelectorAll("link[data-precedence],style[data-precedence]"), s = 0; s < i.length; s++) {
            var c = i[s];
            (c.nodeName === "LINK" || c.getAttribute("media") !== "not all") && (n.set(c.dataset.precedence, c), l = c);
          }
          l && n.set(null, l);
        }
        i = e.instance, c = i.getAttribute("data-precedence"), s = n.get(c) || l, s === l && n.set(null, i), n.set(c, i), this.count++, l = ns.bind(this), i.addEventListener("load", l), i.addEventListener("error", l), s ? s.parentNode.insertBefore(i, s.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(i, t.firstChild)), e.state.loading |= 4;
      }
    }
    var zl = { $$typeof: B, Provider: null, Consumer: null, _currentValue: F, _currentValue2: F, _threadCount: 0 };
    function G0(t, e, n, l, i, s, c, h, r) {
      this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Ts(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ts(0), this.hiddenUpdates = Ts(null), this.identifierPrefix = l, this.onUncaughtError = i, this.onCaughtError = s, this.onRecoverableError = c, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = r, this.incompleteTransitions = /* @__PURE__ */ new Map();
    }
    function Kd(t, e, n, l, i, s, c, h, r, f, A, w) {
      return t = new G0(t, e, n, c, r, f, A, w, h), e = 1, s === true && (e |= 24), s = je(3, null, null, e), t.current = s, s.stateNode = t, e = oc(), e.refCount++, t.pooledCache = e, e.refCount++, s.memoizedState = { element: l, isDehydrated: n, cache: e }, mc(s), t;
    }
    function _d(t) {
      return t ? (t = Ca, t) : Ca;
    }
    function zd(t, e, n, l, i, s) {
      i = _d(i), l.context === null ? l.context = i : l.pendingContext = i, l = Tn(e), l.payload = { element: n }, s = s === void 0 ? null : s, s !== null && (l.callback = s), n = On(t, l, e), n !== null && (be(n, t, e), bl(n, t, e));
    }
    function Rd(t, e) {
      if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
        var n = t.retryLane;
        t.retryLane = n !== 0 && n < e ? n : e;
      }
    }
    function Mh(t, e) {
      Rd(t, e), (t = t.alternate) && Rd(t, e);
    }
    function qd(t) {
      if (t.tag === 13 || t.tag === 31) {
        var e = Zn(t, 67108864);
        e !== null && be(e, t, 67108864), Mh(t, 67108864);
      }
    }
    function Pd(t) {
      if (t.tag === 13 || t.tag === 31) {
        var e = ke();
        e = Os(e);
        var n = Zn(t, e);
        n !== null && be(n, t, e), Mh(t, e);
      }
    }
    var is = true;
    function E0(t, e, n, l) {
      var i = k.T;
      k.T = null;
      var s = K.p;
      try {
        K.p = 2, Bh(t, e, n, l);
      } finally {
        K.p = s, k.T = i;
      }
    }
    function D0(t, e, n, l) {
      var i = k.T;
      k.T = null;
      var s = K.p;
      try {
        K.p = 8, Bh(t, e, n, l);
      } finally {
        K.p = s, k.T = i;
      }
    }
    function Bh(t, e, n, l) {
      if (is) {
        var i = Gh(l);
        if (i === null) fh(t, e, l, ss, n), Yd(t, l);
        else if (K0(i, t, e, n, l)) l.stopPropagation();
        else if (Yd(t, l), e & 4 && -1 < L0.indexOf(t)) {
          for (; i !== null; ) {
            var s = da(i);
            if (s !== null) switch (s.tag) {
              case 3:
                if (s = s.stateNode, s.current.memoizedState.isDehydrated) {
                  var c = Un(s.pendingLanes);
                  if (c !== 0) {
                    var h = s;
                    for (h.pendingLanes |= 2, h.entangledLanes |= 2; c; ) {
                      var r = 1 << 31 - ve(c);
                      h.entanglements[1] |= r, c &= ~r;
                    }
                    Ze(s), (yt & 6) === 0 && (Pi = he() + 500, Gl(0));
                  }
                }
                break;
              case 31:
              case 13:
                h = Zn(s, 2), h !== null && be(h, s, 2), Yi(), Mh(s, 2);
            }
            if (s = Gh(l), s === null && fh(t, e, l, ss, n), s === i) break;
            i = s;
          }
          i !== null && l.stopPropagation();
        } else fh(t, e, l, null, n);
      }
    }
    function Gh(t) {
      return t = Ds(t), Eh(t);
    }
    var ss = null;
    function Eh(t) {
      if (ss = null, t = ua(t), t !== null) {
        var e = E(t);
        if (e === null) t = null;
        else {
          var n = e.tag;
          if (n === 13) {
            if (t = R(e), t !== null) return t;
            t = null;
          } else if (n === 31) {
            if (t = Z(e), t !== null) return t;
            t = null;
          } else if (n === 3) {
            if (e.stateNode.current.memoizedState.isDehydrated) return e.tag === 3 ? e.stateNode.containerInfo : null;
            t = null;
          } else e !== t && (t = null);
        }
      }
      return ss = t, null;
    }
    function Ud(t) {
      switch (t) {
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
        case "resize":
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
        case "scroll":
        case "touchmove":
        case "wheel":
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
          return 8;
        case "message":
          switch (Hs()) {
            case Pn:
              return 2;
            case $a:
              return 8;
            case Jl:
            case jm:
              return 32;
            case Wh:
              return 268435456;
            default:
              return 32;
          }
        default:
          return 32;
      }
    }
    var Dh = false, Kn = null, _n = null, zn = null, Rl = /* @__PURE__ */ new Map(), ql = /* @__PURE__ */ new Map(), Rn = [], L0 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
    function Yd(t, e) {
      switch (t) {
        case "focusin":
        case "focusout":
          Kn = null;
          break;
        case "dragenter":
        case "dragleave":
          _n = null;
          break;
        case "mouseover":
        case "mouseout":
          zn = null;
          break;
        case "pointerover":
        case "pointerout":
          Rl.delete(e.pointerId);
          break;
        case "gotpointercapture":
        case "lostpointercapture":
          ql.delete(e.pointerId);
      }
    }
    function Pl(t, e, n, l, i, s) {
      return t === null || t.nativeEvent !== s ? (t = { blockedOn: e, domEventName: n, eventSystemFlags: l, nativeEvent: s, targetContainers: [i] }, e !== null && (e = da(e), e !== null && qd(e)), t) : (t.eventSystemFlags |= l, e = t.targetContainers, i !== null && e.indexOf(i) === -1 && e.push(i), t);
    }
    function K0(t, e, n, l, i) {
      switch (e) {
        case "focusin":
          return Kn = Pl(Kn, t, e, n, l, i), true;
        case "dragenter":
          return _n = Pl(_n, t, e, n, l, i), true;
        case "mouseover":
          return zn = Pl(zn, t, e, n, l, i), true;
        case "pointerover":
          var s = i.pointerId;
          return Rl.set(s, Pl(Rl.get(s) || null, t, e, n, l, i)), true;
        case "gotpointercapture":
          return s = i.pointerId, ql.set(s, Pl(ql.get(s) || null, t, e, n, l, i)), true;
      }
      return false;
    }
    function Vd(t) {
      var e = ua(t.target);
      if (e !== null) {
        var n = E(e);
        if (n !== null) {
          if (e = n.tag, e === 13) {
            if (e = R(n), e !== null) {
              t.blockedOn = e, lo(t.priority, function() {
                Pd(n);
              });
              return;
            }
          } else if (e === 31) {
            if (e = Z(n), e !== null) {
              t.blockedOn = e, lo(t.priority, function() {
                Pd(n);
              });
              return;
            }
          } else if (e === 3 && n.stateNode.current.memoizedState.isDehydrated) {
            t.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
            return;
          }
        }
      }
      t.blockedOn = null;
    }
    function cs(t) {
      if (t.blockedOn !== null) return false;
      for (var e = t.targetContainers; 0 < e.length; ) {
        var n = Gh(t.nativeEvent);
        if (n === null) {
          n = t.nativeEvent;
          var l = new n.constructor(n.type, n);
          Es = l, n.target.dispatchEvent(l), Es = null;
        } else return e = da(n), e !== null && qd(e), t.blockedOn = n, false;
        e.shift();
      }
      return true;
    }
    function Xd(t, e, n) {
      cs(t) && n.delete(e);
    }
    function _0() {
      Dh = false, Kn !== null && cs(Kn) && (Kn = null), _n !== null && cs(_n) && (_n = null), zn !== null && cs(zn) && (zn = null), Rl.forEach(Xd), ql.forEach(Xd);
    }
    function hs(t, e) {
      t.blockedOn === e && (t.blockedOn = null, Dh || (Dh = true, u.unstable_scheduleCallback(u.unstable_NormalPriority, _0)));
    }
    var os = null;
    function Qd(t) {
      os !== t && (os = t, u.unstable_scheduleCallback(u.unstable_NormalPriority, function() {
        os === t && (os = null);
        for (var e = 0; e < t.length; e += 3) {
          var n = t[e], l = t[e + 1], i = t[e + 2];
          if (typeof l != "function") {
            if (Eh(l || n) === null) continue;
            break;
          }
          var s = da(n);
          s !== null && (t.splice(e, 3), e -= 3, Gc(s, { pending: true, data: i, method: n.method, action: l }, l, i));
        }
      }));
    }
    function Qa(t) {
      function e(r) {
        return hs(r, t);
      }
      Kn !== null && hs(Kn, t), _n !== null && hs(_n, t), zn !== null && hs(zn, t), Rl.forEach(e), ql.forEach(e);
      for (var n = 0; n < Rn.length; n++) {
        var l = Rn[n];
        l.blockedOn === t && (l.blockedOn = null);
      }
      for (; 0 < Rn.length && (n = Rn[0], n.blockedOn === null); ) Vd(n), n.blockedOn === null && Rn.shift();
      if (n = (t.ownerDocument || t).$$reactFormReplay, n != null) for (l = 0; l < n.length; l += 3) {
        var i = n[l], s = n[l + 1], c = i[ue] || null;
        if (typeof s == "function") c || Qd(n);
        else if (c) {
          var h = null;
          if (s && s.hasAttribute("formAction")) {
            if (i = s, c = s[ue] || null) h = c.formAction;
            else if (Eh(i) !== null) continue;
          } else h = c.action;
          typeof h == "function" ? n[l + 1] = h : (n.splice(l, 3), l -= 3), Qd(n);
        }
      }
    }
    function Zd() {
      function t(s) {
        s.canIntercept && s.info === "react-transition" && s.intercept({ handler: function() {
          return new Promise(function(c) {
            return i = c;
          });
        }, focusReset: "manual", scroll: "manual" });
      }
      function e() {
        i !== null && (i(), i = null), l || setTimeout(n, 20);
      }
      function n() {
        if (!l && !navigation.transition) {
          var s = navigation.currentEntry;
          s && s.url != null && navigation.navigate(s.url, { state: s.getState(), info: "react-transition", history: "replace" });
        }
      }
      if (typeof navigation == "object") {
        var l = false, i = null;
        return navigation.addEventListener("navigate", t), navigation.addEventListener("navigatesuccess", e), navigation.addEventListener("navigateerror", e), setTimeout(n, 100), function() {
          l = true, navigation.removeEventListener("navigate", t), navigation.removeEventListener("navigatesuccess", e), navigation.removeEventListener("navigateerror", e), i !== null && (i(), i = null);
        };
      }
    }
    function Lh(t) {
      this._internalRoot = t;
    }
    rs.prototype.render = Lh.prototype.render = function(t) {
      var e = this._internalRoot;
      if (e === null) throw Error(o(409));
      var n = e.current, l = ke();
      zd(n, l, t, e, null, null);
    }, rs.prototype.unmount = Lh.prototype.unmount = function() {
      var t = this._internalRoot;
      if (t !== null) {
        this._internalRoot = null;
        var e = t.containerInfo;
        zd(t.current, 2, null, t, null, null), Yi(), e[ra] = null;
      }
    };
    function rs(t) {
      this._internalRoot = t;
    }
    rs.prototype.unstable_scheduleHydration = function(t) {
      if (t) {
        var e = ao();
        t = { blockedOn: null, target: t, priority: e };
        for (var n = 0; n < Rn.length && e !== 0 && e < Rn[n].priority; n++) ;
        Rn.splice(n, 0, t), n === 0 && Vd(t);
      }
    };
    var Jd = O.version;
    if (Jd !== "19.2.8") throw Error(o(527, Jd, "19.2.8"));
    K.findDOMNode = function(t) {
      var e = t._reactInternals;
      if (e === void 0) throw typeof t.render == "function" ? Error(o(188)) : (t = Object.keys(t).join(","), Error(o(268, t)));
      return t = H(e), t = t !== null ? p(t) : null, t = t === null ? null : t.stateNode, t;
    };
    var z0 = { bundleType: 0, version: "19.2.8", rendererPackageName: "react-dom", currentDispatcherRef: k, reconcilerVersion: "19.2.8" };
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
      var us = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (!us.isDisabled && us.supportsFiber) try {
        Fa = us.inject(z0), ye = us;
      } catch {
      }
    }
    return Yl.createRoot = function(t, e) {
      if (!G(t)) throw Error(o(299));
      var n = false, l = "", i = nu, s = au, c = lu;
      return e != null && (e.unstable_strictMode === true && (n = true), e.identifierPrefix !== void 0 && (l = e.identifierPrefix), e.onUncaughtError !== void 0 && (i = e.onUncaughtError), e.onCaughtError !== void 0 && (s = e.onCaughtError), e.onRecoverableError !== void 0 && (c = e.onRecoverableError)), e = Kd(t, 1, false, null, null, n, l, null, i, s, c, Zd), t[ra] = e.current, bh(t), new Lh(e);
    }, Yl.hydrateRoot = function(t, e, n) {
      if (!G(t)) throw Error(o(299));
      var l = false, i = "", s = nu, c = au, h = lu, r = null;
      return n != null && (n.unstable_strictMode === true && (l = true), n.identifierPrefix !== void 0 && (i = n.identifierPrefix), n.onUncaughtError !== void 0 && (s = n.onUncaughtError), n.onCaughtError !== void 0 && (c = n.onCaughtError), n.onRecoverableError !== void 0 && (h = n.onRecoverableError), n.formState !== void 0 && (r = n.formState)), e = Kd(t, 1, true, e, n ?? null, l, i, r, s, c, h, Zd), e.context = _d(null), n = e.current, l = ke(), l = Os(l), i = Tn(l), i.callback = null, On(n, i, l), n = l, e.current.lanes = n, Ia(e, n), Ze(e), t[ra] = e.current, bh(t), new rs(e);
    }, Yl.version = "19.2.8", Yl;
  }
  var im;
  function $0() {
    if (im) return zh.exports;
    im = 1;
    function u() {
      if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(u);
      } catch (O) {
        console.error(O);
      }
    }
    return u(), zh.exports = J0(), zh.exports;
  }
  var F0 = $0();
  var W0 = (u) => u.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
  var I0 = (u) => u.replace(/^([A-Z])|[\s-_]+(\w)/g, (O, g, o) => o ? o.toUpperCase() : g.toLowerCase());
  var sm = (u) => {
    const O = I0(u);
    return O.charAt(0).toUpperCase() + O.slice(1);
  };
  var pm = (...u) => u.filter((O, g, o) => !!O && O.trim() !== "" && o.indexOf(O) === g).join(" ").trim();
  var tx = (u) => {
    for (const O in u) if (O.startsWith("aria-") || O === "role" || O === "title") return true;
  };
  var ex = { xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
  var nx = Q.forwardRef(({ color: u = "currentColor", size: O = 24, strokeWidth: g = 2, absoluteStrokeWidth: o, className: G = "", children: E, iconNode: R, ...Z }, D) => Q.createElement("svg", { ref: D, ...ex, width: O, height: O, stroke: u, strokeWidth: o ? Number(g) * 24 / Number(O) : g, className: pm("lucide", G), ...!E && !tx(Z) && { "aria-hidden": "true" }, ...Z }, [...R.map(([H, p]) => Q.createElement(H, p)), ...Array.isArray(E) ? E : [E]]));
  var ct = (u, O) => {
    const g = Q.forwardRef(({ className: o, ...G }, E) => Q.createElement(nx, { ref: E, iconNode: O, className: pm(`lucide-${W0(sm(u))}`, `lucide-${u}`, o), ...G }));
    return g.displayName = sm(u), g;
  };
  var ax = [["path", { d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2", key: "169zse" }]];
  var xn = ct("activity", ax);
  var lx = [["path", { d: "M5 12h14", key: "1ays0h" }], ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]];
  var ps = ct("arrow-right", lx);
  var ix = [["path", { d: "M12 7v14", key: "1akyts" }], ["path", { d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z", key: "ruj8y" }]];
  var vs = ct("book-open", ix);
  var sx = [["rect", { width: "16", height: "20", x: "4", y: "2", rx: "2", key: "1nb95v" }], ["line", { x1: "8", x2: "16", y1: "6", y2: "6", key: "x4nwl0" }], ["line", { x1: "16", x2: "16", y1: "14", y2: "18", key: "wjye3r" }], ["path", { d: "M16 10h.01", key: "1m94wz" }], ["path", { d: "M12 10h.01", key: "1nrarc" }], ["path", { d: "M8 10h.01", key: "19clt8" }], ["path", { d: "M12 14h.01", key: "1etili" }], ["path", { d: "M8 14h.01", key: "6423bh" }], ["path", { d: "M12 18h.01", key: "mhygvu" }], ["path", { d: "M8 18h.01", key: "lrp35t" }]];
  var Yh = ct("calculator", sx);
  var cx = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]];
  var Zl = ct("check", cx);
  var hx = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]];
  var Xl = ct("chevron-down", hx);
  var ox = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
  var Et = ct("chevron-right", ox);
  var rx = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]];
  var Ql = ct("chevron-up", rx);
  var ux = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }], ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }], ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]];
  var Vl = ct("circle-alert", ux);
  var dx = [["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }], ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]];
  var cm = ct("circle-check-big", dx);
  var mx = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }], ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]];
  var bm = ct("circle-check", mx);
  var gx = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }], ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", key: "1u773s" }], ["path", { d: "M12 17h.01", key: "p32p05" }]];
  var Je = ct("circle-question-mark", gx);
  var xx = [["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }], ["path", { d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2", key: "116196" }], ["path", { d: "M12 11h4", key: "1jrz19" }], ["path", { d: "M12 16h4", key: "n85exb" }], ["path", { d: "M8 11h.01", key: "1dfujw" }], ["path", { d: "M8 16h.01", key: "18s6g9" }]];
  var xs = ct("clipboard-list", xx);
  var px = [["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }], ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]];
  var Ns = ct("copy", px);
  var bx = [["path", { d: "M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4", key: "1pf5j1" }], ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }], ["path", { d: "m3 15 2 2 4-4", key: "1lhrkk" }]];
  var Jh = ct("file-check-2", bx);
  var fx = [["circle", { cx: "12", cy: "18", r: "3", key: "1mpf1b" }], ["circle", { cx: "6", cy: "6", r: "3", key: "1lh9wr" }], ["circle", { cx: "18", cy: "6", r: "3", key: "1h7g24" }], ["path", { d: "M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9", key: "1uq4wg" }], ["path", { d: "M12 12v3", key: "158kv8" }]];
  var $h = ct("git-fork", fx);
  var yx = [["path", { d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5", key: "mvr1a0" }], ["path", { d: "M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27", key: "auskq0" }]];
  var bs = ct("heart-pulse", yx);
  var vx = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }], ["path", { d: "M12 16v-4", key: "1dtifu" }], ["path", { d: "M12 8h.01", key: "e9boi3" }]];
  var fm = ct("info", vx);
  var Nx = [["path", { d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z", key: "zw3jo" }], ["path", { d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12", key: "1wduqc" }], ["path", { d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17", key: "kqbvx6" }]];
  var hm = ct("layers", Nx);
  var jx = [["path", { d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5", key: "1gvzjb" }], ["path", { d: "M9 18h6", key: "x1upvd" }], ["path", { d: "M10 22h4", key: "ceow96" }]];
  var Cx = ct("lightbulb", jx);
  var Hx = [["path", { d: "M5 12h14", key: "1ays0h" }]];
  var ds = ct("minus", Hx);
  var Tx = [["path", { d: "M5 12h14", key: "1ays0h" }], ["path", { d: "M12 5v14", key: "s699le" }]];
  var ms = ct("plus", Tx);
  var Ox = [["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }], ["path", { d: "M3 3v5h5", key: "1xhq8a" }]];
  var fs = ct("rotate-ccw", Ox);
  var kx = [["path", { d: "m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z", key: "7g6ntu" }], ["path", { d: "m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z", key: "ijws7r" }], ["path", { d: "M7 21h10", key: "1b0cd5" }], ["path", { d: "M12 3v18", key: "108xh3" }], ["path", { d: "M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2", key: "3gwbw2" }]];
  var Vh = ct("scale", kx);
  var Ax = [["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }], ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]];
  var ys = ct("search", Ax);
  var Sx = [["path", { d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z", key: "oel41y" }], ["path", { d: "M12 8v4", key: "1got3b" }], ["path", { d: "M12 16h.01", key: "1drbdi" }]];
  var ca = ct("shield-alert", Sx);
  var wx = [["path", { d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z", key: "oel41y" }], ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]];
  var Mx = ct("shield-check", wx);
  var Bx = [["path", { d: "M10 5H3", key: "1qgfaw" }], ["path", { d: "M12 19H3", key: "yhmn1j" }], ["path", { d: "M14 3v4", key: "1sua03" }], ["path", { d: "M16 17v4", key: "1q0r14" }], ["path", { d: "M21 12h-9", key: "1o4lsq" }], ["path", { d: "M21 19h-5", key: "1rlt1p" }], ["path", { d: "M21 5h-7", key: "1oszz2" }], ["path", { d: "M8 10v4", key: "tgpxqk" }], ["path", { d: "M8 12H3", key: "a7s4jb" }]];
  var Gx = ct("sliders-horizontal", Bx);
  var Ex = [["path", { d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z", key: "1s2grr" }], ["path", { d: "M20 2v4", key: "1rf3ol" }], ["path", { d: "M22 4h-4", key: "gwowj6" }], ["circle", { cx: "4", cy: "20", r: "2", key: "6kqj1y" }]];
  var Pe = ct("sparkles", Ex);
  var Dx = [["path", { d: "M11 2v2", key: "1539x4" }], ["path", { d: "M5 2v2", key: "1yf1q8" }], ["path", { d: "M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1", key: "rb5t3r" }], ["path", { d: "M8 15a6 6 0 0 0 12 0v-3", key: "x18d4x" }], ["circle", { cx: "20", cy: "10", r: "2", key: "ts1r5v" }]];
  var ha = ct("stethoscope", Dx);
  var Lx = [["path", { d: "m18 2 4 4", key: "22kx64" }], ["path", { d: "m17 7 3-3", key: "1w1zoj" }], ["path", { d: "M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5", key: "1exhtz" }], ["path", { d: "m9 11 4 4", key: "rovt3i" }], ["path", { d: "m5 19-3 3", key: "59f2uf" }], ["path", { d: "m14 4 6 6", key: "yqp9t2" }]];
  var Xh = ct("syringe", Lx);
  var Kx = [["path", { d: "M12 3v18", key: "108xh3" }], ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }], ["path", { d: "M3 9h18", key: "1pudct" }], ["path", { d: "M3 15h18", key: "5xshup" }]];
  var om = ct("table", Kx);
  var _x = [["path", { d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z", key: "vktsd0" }], ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" }]];
  var ym = ct("tag", _x);
  var zx = [["path", { d: "M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z", key: "17jzev" }]];
  var Rx = ct("thermometer", zx);
  var qx = [["path", { d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3", key: "wmoenq" }], ["path", { d: "M12 9v4", key: "juzpu7" }], ["path", { d: "M12 17h.01", key: "p32p05" }]];
  var pn = ct("triangle-alert", qx);
  var Px = [["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }], ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]];
  var Ux = ct("user", Px);
  var Yx = [["path", { d: "M12.8 19.6A2 2 0 1 0 14 16H2", key: "148xed" }], ["path", { d: "M17.5 8a2.5 2.5 0 1 1 2 4H2", key: "1u4tom" }], ["path", { d: "M9.8 4.4A2 2 0 1 1 11 8H2", key: "75valh" }]];
  var Ja = ct("wind", Yx);
  var Vx = [["path", { d: "M18 6 6 18", key: "1bl5f8" }], ["path", { d: "m6 6 12 12", key: "d8bk6v" }]];
  var Qh = ct("x", Vx);
  var Xx = ({ activeTab: u, setActiveTab: O, onNavigateToGlossaryInGuide: g }) => a.jsxs("header", { className: "sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 shadow-xs", children: [a.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: a.jsxs("div", { className: "flex items-center justify-between h-16", children: [a.jsxs("div", { className: "flex items-center space-x-3 cursor-pointer", onClick: () => O("analyzer"), children: [a.jsx("div", { className: "w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-700 to-blue-600 flex items-center justify-center text-white shadow-sm ring-2 ring-blue-100", children: a.jsx(ha, { className: "w-6 h-6" }) }), a.jsxs("div", { children: [a.jsxs("div", { className: "flex items-center space-x-2", children: [a.jsx("span", { className: "text-xl font-bold tracking-tight text-slate-900", children: "ABG Pro" }), a.jsx("span", { className: "px-2 py-0.5 text-xs font-semibold uppercase bg-cyan-100 text-cyan-800 rounded-full border border-cyan-200", children: "L\xE2m S\xE0ng" })] }), a.jsx("p", { className: "text-xs text-slate-500 font-medium hidden sm:block", children: "Ph\xE2n t\xEDch Kh\xED M\xE1u \u0110\u1ED9ng M\u1EA1ch & Ph\xE1c \u0110\u1ED3 X\u1EED Tr\xED Chu\u1EA9n Y Khoa" })] })] }), a.jsxs("nav", { className: "flex items-center space-x-1 sm:space-x-2 overflow-x-auto py-1", children: [a.jsxs("button", { id: "tab-analyzer", onClick: () => O("analyzer"), className: `flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${u === "analyzer" ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"}`, children: [a.jsx(Pe, { className: "w-4 h-4" }), a.jsx("span", { children: "Ph\xE2n T\xEDch Kh\xED M\xE1u" })] }), a.jsxs("button", { id: "tab-guide", onClick: () => O("guide"), className: `flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${u === "guide" ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"}`, children: [a.jsx(vs, { className: "w-4 h-4" }), a.jsx("span", { children: "C\u1EA9m Nang & S\u01A1 \u0110\u1ED3" }), a.jsx("span", { className: "hidden lg:inline-block px-1.5 py-0.2 text-[10px] rounded-full bg-indigo-100 text-indigo-700 font-bold ml-1", children: "L\u01B0u \u0110\u1ED3 & 6 B\u01B0\u1EDBc" })] }), a.jsxs("button", { id: "tab-cases", onClick: () => O("cases"), className: `flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${u === "cases" || u === "protocols" ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"}`, children: [a.jsx(xs, { className: "w-4 h-4" }), a.jsx("span", { children: "Ca L\xE2m S\xE0ng & Ph\xE1c \u0110\u1ED3" }), a.jsx("span", { className: "hidden md:inline-block px-1.5 py-0.2 text-[10px] rounded-full bg-blue-100 text-blue-700 font-bold ml-1", children: "30+ Ca \u2022 Ph\xE1c \u0110\u1ED3" })] })] })] }) }), a.jsxs("div", { className: "bg-slate-50 border-t border-slate-200/80 px-4 py-1 text-[11px] text-slate-500 flex flex-wrap items-center justify-between max-w-7xl mx-auto", children: [a.jsxs("div", { className: "flex items-center space-x-2", children: [a.jsx("span", { className: "font-semibold text-slate-700", children: "T\xE0i li\u1EC7u c\u0103n b\u1EA3n:" }), a.jsx("span", { children: "1. Arterial Blood Gases Made Easy (2nd Ed, Elsevier 2016)" }), a.jsx("span", { className: "text-slate-300", children: "\u2022" }), a.jsx("span", { children: "2. ABG Interpretation: A case study approach (M&K Publishing 2016)" })] }), a.jsxs("div", { className: "flex items-center space-x-3 text-slate-500 font-medium", children: [a.jsx("span", { className: "hidden lg:inline", children: "Chu\u1EA9n h\xF3a 6 b\u01B0\u1EDBc" }), a.jsx("span", { className: "hidden lg:inline", children: "\u2022" }), a.jsx("span", { className: "hidden sm:inline", children: "Ph\xE2n t\xEDch 2 tr\u1EE5c \u0111\u1ED9c l\u1EADp" }), a.jsx("span", { className: "hidden sm:inline", children: "\u2022" }), g && a.jsxs("button", { onClick: g, className: "text-blue-600 hover:text-blue-800 font-bold hover:underline inline-flex items-center space-x-1 cursor-pointer", children: [a.jsx(Je, { className: "w-3.5 h-3.5 text-blue-500" }), a.jsx("span", { children: "Tra c\u1EE9u t\u1EEB vi\u1EBFt t\u1EAFt trong C\u1EA9m nang" })] })] })] })] });
  var js = 7.50062;
  var Fh = 1 / js;
  function rm(u, O) {
    return O === "kPa" ? u * js : u;
  }
  function um(u, O) {
    return O === "mmHg" ? u * Fh : u;
  }
  function Qx(u) {
    return Math.round(Math.pow(10, 9 - u) * 10) / 10;
  }
  function vm(u) {
    const { unit: O, pH: g, pCO2: o, pO2: G, hco3: E, be: R, sao2: Z, fio2: D, na: H, k: p, cl: _, lactate: P, glucose: y, albumin: j, patientAge: T = 40, coHb: U, isVenousSample: nt } = u, ht = rm(o, O), B = rm(G, O), tt = um(o, O), gt = um(G, O), C = D > 1 ? D : D * 100, L = C / 100, Y = Qx(g), Ct = L * 713 - ht * 1.2, et = Math.max(0, Ct - B), St = T / 4 + 4, Ft = et > Math.max(20, St), ie = Math.round(B / L);
    let ae = "B\xECnh th\u01B0\u1EDDng (P/F > 400)";
    ie < 100 ? ae = "ARDS m\u1EE9c \u0111\u1ED9 N\u1EB7ng (P/F < 100)" : ie < 200 ? ae = "ARDS m\u1EE9c \u0111\u1ED9 Trung b\xECnh (P/F 100 - 200)" : ie < 300 ? ae = "T\u1ED5n th\u01B0\u01A1ng ph\u1ED5i c\u1EA5p / ARDS Nh\u1EB9 (P/F 200 - 300)" : ie < 400 && (ae = "Gi\u1EA3m oxy h\xF3a m\xE1u nh\u1EB9 (P/F 300 - 400)");
    let qt, k, K = false, F, xt, pt;
    if (H !== void 0 && _ !== void 0) {
      if (qt = H - (_ + E), p !== void 0 ? (k = H + p - (_ + E), K = k > 18) : K = qt > 16, j !== void 0 && j < 40) {
        const Pn = j > 10 ? j / 10 : j;
        F = (qt || 0) + 2.5 * (4 - Pn), F > 16 && (K = true);
      }
      if (K && E < 24) {
        const Pn = (qt || 12) - 12, $a = 24 - E;
        $a > 0 && (xt = Math.round(Pn / $a * 100) / 100, xt < 0.4 ? pt = "Toan chuy\u1EC3n h\xF3a t\u0103ng kho\u1EA3ng tr\u1ED1ng Anion k\xE8m toan chuy\u1EC3n h\xF3a kho\u1EA3ng tr\u1ED1ng Anion b\xECnh th\u01B0\u1EDDng (NAGMA ph\u1ED1i h\u1EE3p)." : xt < 0.8 ? pt = "Toan chuy\u1EC3n h\xF3a h\u1ED7n h\u1EE3p (HAGMA + NAGMA)." : xt <= 2 ? pt = "Toan chuy\u1EC3n h\xF3a t\u0103ng kho\u1EA3ng tr\u1ED1ng Anion thu\u1EA7n t\xFAy (HAGMA \u0111\u01A1n thu\u1EA7n nh\u01B0 DKA, Toan lactic)." : pt = "Toan chuy\u1EC3n h\xF3a t\u0103ng AG k\xE8m KI\u1EC0M CHUY\u1EC2N H\xD3A ph\u1ED1i h\u1EE3p (ho\u1EB7c ki\u1EC1m b\xF9 t\u1EEB toan h\xF4 h\u1EA5p m\u1EA1n).");
      }
    }
    const m = Math.round((1.5 * E + 8 - 2) * 10) / 10, M = Math.round((1.5 * E + 8 + 2) * 10) / 10;
    let z = false;
    C <= 21 ? z = B < 80 : z = C - gt > 10 || ie < 300;
    let q = "normal";
    gt < 5.3 || B < 40 || Z < 75 || C >= 60 && B < 80 ? q = "severe" : gt <= 7.9 || B < 60 || Z < 90 ? q = "moderate" : (z || gt <= 10.6 || B < 80 || Z < 95) && (q = "mild");
    const $ = ht < 35, I = ht > 45, lt = E < 22, kt = E > 28;
    let vt = "normal", se = "Trao \u0111\u1ED5i kh\xED b\xECnh th\u01B0\u1EDDng (Normal Gas Exchange)", re = "Ph\xE2n \xE1p oxy v\xE0 th\xF4ng kh\xED ph\u1EBF nang ho\xE0n to\xE0n n\u1EB1m trong gi\u1EDBi h\u1EA1n sinh l\xFD b\xECnh th\u01B0\u1EDDng.", Ue, oa;
    z ? I ? (vt = "type2_respiratory_impairment", kt ? g < 7.35 ? (Ue = "acute_on_chronic", se = "Suy h\xF4 h\u1EA5p Type 2 C\u1EA5p tr\xEAn n\u1EC1n M\u1EA1n (Acute-on-chronic Type 2 Respiratory Impairment)", re = "C\xF3 t\xECnh tr\u1EA1ng t\u0103ng CO2 m\u1EA1n t\xEDnh (HCO3- \u0111\xE3 t\u0103ng b\xF9 tr\u1EEB t\u1EEB tr\u01B0\u1EDBc) nh\u01B0ng xu\u1EA5t hi\u1EC7n suy gi\u1EA3m th\xF4ng kh\xED c\u1EA5p t\xEDnh khi\u1EBFn pH t\u1EE5t toan m\xE1u nguy hi\u1EC3m.") : (Ue = "chronic", se = "Suy h\xF4 h\u1EA5p Type 2 M\u1EA1n t\xEDnh (Chronic Type 2 Respiratory Impairment)", re = "Gi\u1EA3m th\xF4ng kh\xED ph\u1EBF nang m\u1EA1n t\xEDnh (th\u01B0\u1EDDng g\u1EB7p \u1EDF COPD n\u1EB7ng, h\u1ED9i ch\u1EE9ng b\xE9o ph\xEC gi\u1EA3m th\xF4ng kh\xED Pickwickian), th\u1EADn \u0111\xE3 b\xF9 tr\u1EEB b\u1EB1ng c\xE1ch gi\u1EEF HCO3- gi\xFAp pH b\xECnh th\u01B0\u1EDDng.") : (Ue = "acute", se = "Suy h\xF4 h\u1EA5p Type 2 C\u1EA5p t\xEDnh (Acute Type 2 Respiratory Impairment / Ventilatory Failure)", re = "Suy gi\u1EA3m th\xF4ng kh\xED ph\u1EBF nang \u0111\u1ED9t ng\u1ED9t (ng\u1ED9 \u0111\u1ED9c thu\u1ED1c \u1EE9c ch\u1EBF h\xF4 h\u1EA5p nh\u01B0 morphin/an th\u1EA7n, ki\u1EC7t c\u01A1, ch\u1EA5n th\u01B0\u01A1ng l\u1ED3ng ng\u1EF1c). Th\u1EADn ch\u01B0a k\u1ECBp b\xF9 tr\u1EEB d\u1EABn t\u1EDBi toan m\xE1u c\u1EA5p.")) : (vt = "type1_respiratory_impairment", se = `Suy h\xF4 h\u1EA5p Type 1 (Gi\u1EA3m oxy m\xE1u) - M\u1EE9c \u0111\u1ED9 ${q === "severe" ? "N\u1EB7ng" : q === "moderate" ? "Trung b\xECnh" : "Nh\u1EB9"}`, re = "R\u1ED1i lo\u1EA1n oxy h\xF3a m\xE1u \u0111\u01A1n thu\u1EA7n v\u1EDBi th\xF4ng kh\xED ph\u1EBF nang \u0111\u01B0\u1EE3c b\u1EA3o t\u1ED3n ho\u1EB7c t\u0103ng (PaCO2 b\xECnh th\u01B0\u1EDDng ho\u1EB7c gi\u1EA3m do th\u1EDF nhanh ph\u1EA3n x\u1EA1). C\u01A1 ch\u1EBF th\u01B0\u1EDDng l\xE0 b\u1EA5t t\u01B0\u01A1ng x\u1EE9ng V/Q ho\u1EB7c Shunt.") : $ ? (vt = "hyperventilation", lt ? (oa = false, se = "T\u0103ng th\xF4ng kh\xED th\u1EE9 ph\xE1t b\xF9 tr\u1EEB Toan chuy\u1EC3n h\xF3a (Secondary Hyperventilation)", re = "B\u1EC7nh nh\xE2n th\u1EDF nhanh s\xE2u (nh\u1ECBp th\u1EDF Kussmaul) \u0111\u1EC3 \u0111\xE0o th\u1EA3i t\u1ED1i \u0111a CO2, gi\xFAp h\u1EA1 acid bay h\u01A1i \u0111\u1EC3 k\xE9o pH v\u1EC1 ph\xEDa b\xECnh th\u01B0\u1EDDng.") : (oa = true, se = "T\u0103ng th\xF4ng kh\xED nguy\xEAn ph\xE1t (Primary Hyperventilation)", re = "Th\u1EDF nhanh s\xE2u do nguy\xEAn nh\xE2n t\xE2m l\xFD/lo \xE2u (Psychogenic Hyperventilation), \u0111au \u0111\u1EDBn, s\u1ED1t, t\u1ED5n th\u01B0\u01A1ng th\u1EA7n kinh trung \u01B0\u01A1ng, ho\u1EB7c giai \u0111o\u1EA1n r\u1EA5t s\u1EDBm c\u1EE7a thuy\xEAn t\u1EAFc m\u1EA1ch ph\u1ED5i.")) : I ? (vt = "type2_respiratory_impairment", se = "Suy th\xF4ng kh\xED ph\u1EBF nang (T\u0103ng PaCO2) - Oxy m\xE1u \u0111\u01B0\u1EE3c h\u1ED7 tr\u1EE3", re = "B\u1EC7nh nh\xE2n gi\u1EA3m th\xF4ng kh\xED ph\u1EBF nang nh\u01B0ng PaO2 b\xECnh th\u01B0\u1EDDng do \u0111ang \u0111\u01B0\u1EE3c th\u1EDF oxy h\u1ED7 tr\u1EE3 li\u1EC1u cao.", Ue = kt ? g < 7.35 ? "acute_on_chronic" : "chronic" : "acute") : (vt = "normal", se = "Trao \u0111\u1ED5i kh\xED t\u1EA1i ph\u1ED5i b\xECnh th\u01B0\u1EDDng (Normal Gas Exchange)", re = "C\u1EA3 PaO2 v\xE0 PaCO2 \u0111\u1EC1u n\u1EB1m trong gi\u1EDBi h\u1EA1n tham chi\u1EBFu chu\u1EA9n.");
    let Zt = "normal";
    g < 7.35 ? Zt = "acidaemia" : g > 7.45 && (Zt = "alkalaemia");
    let Pt = "normal", wt = "Th\u0103ng b\u1EB1ng ki\u1EC1m toan b\xECnh th\u01B0\u1EDDng", Dt = "pH m\xE1u v\xE0 c\xE1c ch\u1EA5t \u0111\u1EC7m n\u1EB1m trong kho\u1EA3ng sinh l\xFD.", Lt = "uncompensated", ce = "Kh\xF4ng c\xF3 r\u1ED1i lo\u1EA1n toan ki\u1EC1m", fe = "Kh\xF4ng", Ye = false, Cs;
    Zt === "acidaemia" ? I && lt ? (Pt = "mixed_acid_base", Ye = true, ce = "Toan H\xF4 h\u1EA5p PH\u1ED0I H\u1EE2P Toan Chuy\u1EC3n h\xF3a (Mixed Respiratory & Metabolic Acidosis)", wt = "Toan H\u1ED7n H\u1EE3p Nguy K\u1ECBch (Toan H\xF4 H\u1EA5p + Toan Chuy\u1EC3n H\xF3a)", Dt = "D\u1EA1ng r\u1ED1i lo\u1EA1n c\u1EF1c k\u1EF3 nguy hi\u1EC3m: hai qu\xE1 tr\xECnh g\xE2y toan di\u1EC5n ra \u0111\u1ED3ng th\u1EDDi, kh\xF4ng c\xF3 c\u01A1 ch\u1EBF b\xF9 tr\u1EEB, l\xE0m pH t\u1EE5t r\u1EA5t s\xE2u (th\u01B0\u1EDDng g\u1EB7p trong ng\u1EEBng tu\u1EA7n ho\xE0n, ph\xF9 ph\u1ED5i c\u1EA5p ki\u1EC7t s\u1EE9c, s\u1ED1c n\u1EB7ng k\xE8m suy h\xF4 h\u1EA5p).", Lt = "mixed") : I && !lt ? (ce = "Toan h\xF4 h\u1EA5p (Respiratory Acidosis)", Pt = "respiratory_acidosis", kt ? (Lt = "partially_compensated", fe = "Th\u1EADn b\xF9 tr\u1EEB b\xE1n ph\u1EA7n (t\u0103ng t\xE1i h\u1EA5p thu HCO3-)", wt = "Toan h\xF4 h\u1EA5p c\xF3 b\xF9 tr\u1EEB b\xE1n ph\u1EA7n (Partially Compensated Respiratory Acidosis)", Dt = "PaCO2 t\u0103ng g\xE2y toan m\xE1u; th\u1EADn \u0111\xE3 ph\u1EA3n \u1EE9ng t\u0103ng gi\u1EEF HCO3- nh\u01B0ng ch\u01B0a \u0111\u1EE7 \u0111\u1EC3 \u0111\u01B0a pH v\u1EC1 ng\u01B0\u1EE1ng b\xECnh th\u01B0\u1EDDng.") : (Lt = "uncompensated", fe = "Ch\u01B0a b\xF9 tr\u1EEB (Uncompensated)", wt = "Toan h\xF4 h\u1EA5p c\u1EA5p ch\u01B0a b\xF9 tr\u1EEB (Uncompensated Acute Respiratory Acidosis)", Dt = "PaCO2 t\u0103ng c\u1EA5p t\xEDnh, th\u1EADn ch\u01B0a k\u1ECBp \u0111i\u1EC1u ch\u1EC9nh gi\u1EEF bicarbonate, pH gi\u1EA3m m\u1EA1nh.")) : lt && !I ? (ce = "Toan chuy\u1EC3n h\xF3a (Metabolic Acidosis)", Pt = "metabolic_acidosis", $ ? (Lt = "partially_compensated", fe = "Ph\u1ED5i t\u0103ng th\xF4ng kh\xED b\xF9 tr\u1EEB b\xE1n ph\u1EA7n (th\u1EA3i b\u1EDBt CO2)", wt = "Toan chuy\u1EC3n h\xF3a c\xF3 b\xF9 tr\u1EEB b\xE1n ph\u1EA7n (Partially Compensated Metabolic Acidosis)", Dt = "HCO3- gi\u1EA3m g\xE2y toan m\xE1u; trung t\xE2m h\xF4 h\u1EA5p ph\u1EA3n \u1EE9ng t\u0103ng th\xF4ng kh\xED h\u1EA1 PaCO2 nh\u01B0ng pH v\u1EABn < 7.35.") : (Lt = "uncompensated", fe = "Ch\u01B0a b\xF9 tr\u1EEB (Uncompensated)", wt = "Toan chuy\u1EC3n h\xF3a ch\u01B0a b\xF9 tr\u1EEB (Uncompensated Metabolic Acidosis)", Dt = "HCO3- gi\u1EA3m nh\u01B0ng PaCO2 ch\u01B0a k\u1ECBp gi\u1EA3m (ho\u1EB7c b\u1EC7nh nh\xE2n b\u1ECB \u1EE9c ch\u1EBF h\xF4 h\u1EA5p/ki\u1EC7t c\u01A1 kh\xF4ng th\u1EDF nhanh \u0111\u01B0\u1EE3c).")) : (Pt = "mixed_acid_base", wt = "Toan m\xE1u m\u1EE9c \u0111\u1ED9 nh\u1EB9 (R\u1ED1i lo\u1EA1n ti\u1EC1m \u1EA9n)", Dt = "pH h\u01A1i th\u1EA5p, c\xE1c th\xF4ng s\u1ED1 \u1EDF gi\u1EDBi h\u1EA1n c\u1EADn b\xECnh th\u01B0\u1EDDng.") : Zt === "alkalaemia" ? $ && kt ? (Pt = "mixed_acid_base", Ye = true, ce = "Ki\u1EC1m H\xF4 h\u1EA5p PH\u1ED0I H\u1EE2P Ki\u1EC1m Chuy\u1EC3n h\xF3a (Mixed Respiratory & Metabolic Alkalosis)", wt = "Ki\u1EC1m H\u1ED7n H\u1EE3p (Ki\u1EC1m H\xF4 H\u1EA5p + Ki\u1EC1m Chuy\u1EC3n H\xF3a)", Dt = "Hai qu\xE1 tr\xECnh g\xE2y ki\u1EC1m c\xF9ng di\u1EC5n ra (v\xED d\u1EE5: x\u01A1 gan v\u1EEBa t\u0103ng th\xF4ng kh\xED v\u1EEBa d\xF9ng thu\u1ED1c l\u1EE3i ti\u1EC3u h\u1EA1 Kali, ho\u1EB7c n\xF4n \xF3i k\xE8m lo \xE2u \u0111au \u0111\u1EDBn).", Lt = "mixed") : $ && !kt ? (ce = "Ki\u1EC1m h\xF4 h\u1EA5p (Respiratory Alkalosis)", Pt = "respiratory_alkalosis", lt ? (Lt = "partially_compensated", fe = "Th\u1EADn t\u0103ng \u0111\xE0o th\u1EA3i HCO3- b\xF9 tr\u1EEB b\xE1n ph\u1EA7n", wt = "Ki\u1EC1m h\xF4 h\u1EA5p c\xF3 b\xF9 tr\u1EEB b\xE1n ph\u1EA7n (Partially Compensated Respiratory Alkalosis)", Dt = "PaCO2 gi\u1EA3m do t\u0103ng th\xF4ng kh\xED; th\u1EADn gi\u1EA3m gi\u1EEF HCO3- nh\u01B0ng pH v\u1EABn > 7.45.") : (Lt = "uncompensated", fe = "Ch\u01B0a b\xF9 tr\u1EEB (Uncompensated)", wt = "Ki\u1EC1m h\xF4 h\u1EA5p c\u1EA5p ch\u01B0a b\xF9 tr\u1EEB (Uncompensated Respiratory Alkalosis)", Dt = "Th\u1EDF nhanh l\xE0m r\u1EEDa tr\xF4i PaCO2 c\u1EA5p t\xEDnh khi\u1EBFn m\xE1u b\u1ECB ki\u1EC1m h\xF3a.")) : kt && !$ ? (ce = "Ki\u1EC1m chuy\u1EC3n h\xF3a (Metabolic Alkalosis)", Pt = "metabolic_alkalosis", I ? (Lt = "partially_compensated", fe = "Ph\u1ED5i gi\u1EA3m th\xF4ng kh\xED \u0111\u1EC3 gi\u1EEF l\u1EA1i CO2", wt = "Ki\u1EC1m chuy\u1EC3n h\xF3a c\xF3 b\xF9 tr\u1EEB b\xE1n ph\u1EA7n (Partially Compensated Metabolic Alkalosis)", Dt = "HCO3- m\xE1u t\u0103ng cao (do n\xF4n, m\u1EA5t d\u1ECBch d\u1EA1 d\xE0y, l\u1EE3i ti\u1EC3u); ph\u1ED5i b\xF9 tr\u1EEB b\u1EB1ng c\xE1ch gi\u1EA3m th\xF4ng kh\xED nh\u01B0ng pH v\u1EABn > 7.45.") : (Lt = "uncompensated", fe = "Ch\u01B0a b\xF9 tr\u1EEB (Uncompensated)", wt = "Ki\u1EC1m chuy\u1EC3n h\xF3a ch\u01B0a b\xF9 tr\u1EEB (Uncompensated Metabolic Alkalosis)", Dt = "HCO3- t\u0103ng cao, PaCO2 v\u1EABn trong gi\u1EDBi h\u1EA1n b\xECnh th\u01B0\u1EDDng.")) : (Pt = "mixed_acid_base", wt = "Ki\u1EC1m m\xE1u nh\u1EB9 (R\u1ED1i lo\u1EA1n ti\u1EC1m \u1EA9n)", Dt = "pH t\u0103ng tr\xEAn 7.45 nh\u01B0ng PaCO2 v\xE0 HCO3- \u1EDF ng\u01B0\u1EE1ng ranh gi\u1EDBi.") : $ && lt ? (Lt = "fully_compensated", g < 7.4 ? (ce = "Toan chuy\u1EC3n h\xF3a b\xF9 tr\u1EEB ho\xE0n to\xE0n (ho\u1EB7c Ki\u1EC1m h\xF4 h\u1EA5p m\u1EA1n t\xEDnh)", Pt = "metabolic_acidosis", wt = "Toan chuy\u1EC3n h\xF3a B\xF9 tr\u1EEB ho\xE0n to\xE0n (Fully Compensated Metabolic Acidosis)", Dt = "B\u1EC7nh nh\xE2n c\xF3 toan chuy\u1EC3n h\xF3a nguy\xEAn ph\xE1t nh\u01B0ng ph\u1ED5i \u0111\xE3 b\xF9 tr\u1EEB t\u1ED1i \u0111a \u0111\u01B0a pH v\u1EC1 d\u1EA3i an to\xE0n (7.35 - 7.40). Quy t\u1EAFc: Kh\xF4ng bao gi\u1EDD b\xF9 tr\u1EEB qu\xE1 m\u1EE9c (Overcompensation does not occur).") : (ce = "Ki\u1EC1m h\xF4 h\u1EA5p b\xF9 tr\u1EEB ho\xE0n to\xE0n", Pt = "respiratory_alkalosis", wt = "Ki\u1EC1m h\xF4 h\u1EA5p m\u1EA1n t\xEDnh B\xF9 tr\u1EEB ho\xE0n to\xE0n (Fully Compensated Chronic Respiratory Alkalosis)", Dt = "T\u0103ng th\xF4ng kh\xED k\xE9o d\xE0i (v\xED d\u1EE5: \u1EDF v\xF9ng n\xFAi cao, thai k\u1EF3) \u0111\u01B0\u1EE3c th\u1EADn b\xF9 tr\u1EEB th\u1EA3i b\u1EDBt HCO3- gi\xFAp pH b\xECnh th\u01B0\u1EDDng (7.40 - 7.45).")) : I && kt ? (Lt = "fully_compensated", g < 7.4 ? (ce = "Toan h\xF4 h\u1EA5p m\u1EA1n t\xEDnh b\xF9 tr\u1EEB ho\xE0n to\xE0n", Pt = "respiratory_acidosis", wt = "Toan h\xF4 h\u1EA5p m\u1EA1n t\xEDnh B\xF9 tr\u1EEB ho\xE0n to\xE0n (Fully Compensated Chronic Respiratory Acidosis)", Dt = "B\u1EC7nh ph\u1ED5i m\u1EA1n t\xEDnh (COPD, Pickwickian) g\xE2y \u1EE9 CO2; th\u1EADn \u0111\xE3 gi\u1EEF \u0111\u1EE7 bicarbonate \u0111\u1EC3 \u0111\u01B0a pH v\u1EC1 kho\u1EA3ng 7.35 - 7.40.") : (ce = "Ki\u1EC1m chuy\u1EC3n h\xF3a b\xF9 tr\u1EEB ho\xE0n to\xE0n", Pt = "metabolic_alkalosis", wt = "Ki\u1EC1m chuy\u1EC3n h\xF3a B\xF9 tr\u1EEB ho\xE0n to\xE0n (Fully Compensated Metabolic Alkalosis)", Dt = "Ki\u1EC1m chuy\u1EC3n h\xF3a nguy\xEAn ph\xE1t \u0111\u01B0\u1EE3c ph\u1ED5i b\xF9 tr\u1EEB b\u1EB1ng gi\u1EA3m th\xF4ng kh\xED gi\u1EEF CO2, \u0111\u01B0a pH v\u1EC1 7.40 - 7.45.")) : I && lt || $ && kt ? (Ye = true, Pt = "mixed_acid_base", Lt = "mixed", $ && lt ? (wt = "R\u1ED1i lo\u1EA1n Toan - Ki\u1EC1m H\u1ED7n H\u1EE3p \u0110\u1ED1i Kh\xE1ng (Mixed Acid-Base Disorder)", Dt = "\u0110i\u1EC3n h\xECnh l\xE0 ng\u1ED9 \u0111\u1ED9c Aspirin (Salicylate): V\u1EEBa k\xEDch th\xEDch trung t\xE2m h\xF4 h\u1EA5p g\xE2y ki\u1EC1m h\xF4 h\u1EA5p, v\u1EEBa l\xE0 acid h\u1EEFu c\u01A1 g\xE2y toan chuy\u1EC3n h\xF3a t\u0103ng Anion Gap.") : (wt = "R\u1ED1i lo\u1EA1n h\u1ED7n h\u1EE3p: Toan h\xF4 h\u1EA5p m\u1EA1n ph\u1ED1i h\u1EE3p Ki\u1EC1m chuy\u1EC3n h\xF3a", Dt = "\u0110i\u1EC3n h\xECnh \u1EDF b\u1EC7nh nh\xE2n COPD \u1EE9 CO2 m\u1EA1n t\xEDnh \u0111\u01B0\u1EE3c \u0111i\u1EC1u tr\u1ECB thu\u1ED1c l\u1EE3i ti\u1EC3u quai l\xE0m h\u1EA1 Kali v\xE0 t\u0103ng ki\u1EC1m chuy\u1EC3n h\xF3a.")) : (Pt = "normal", wt = "Th\u0103ng b\u1EB1ng Ki\u1EC1m - Toan B\xECnh Th\u01B0\u1EDDng (Normal Acid-Base Balance)", Dt = "pH, PaCO2 v\xE0 HCO3- \u0111\u1EC1u n\u1EB1m ho\xE0n to\xE0n trong gi\u1EDBi h\u1EA1n tham chi\u1EBFu chu\u1EA9n.");
    const _e = [];
    nt && _e.push("\u26A0\uFE0F C\u1EA2NH B\xC1O M\u1EAAU M\xC1U T\u0128NH M\u1EA0CH (VBG): N\u1EBFu nghi ng\u1EDD l\u1EA5y nh\u1EA7m m\xE1u t\u0129nh m\u1EA1ch (m\xE1u s\u1EABm m\xE0u, kh\xF4ng t\u1EF1 \u0111\u1EA9y piston, SaO2 kh\xED m\xE1u th\u1EA5p xa so v\u1EDBi SpO2 k\u1EB9p m\u1EA1ch), KH\xD4NG \u0110\u01AF\u1EE2C d\xF9ng \u0111\u1EC3 \u0111\xE1nh gi\xE1 PaO2/oxy h\xF3a m\xE1u!"), (gt < 8 || B < 60) && _e.push('\u{1F6A8} NGUY C\u01A0 T\u1EEC VONG: PaO2 < 60 mmHg (< 8.0 kPa) r\u01A1i v\xE0o "\u0110O\u1EA0N D\u1ED0C" c\u1EE7a \u0111\u01B0\u1EDDng cong ph\xE2n ly Oxyhemoglobin. B\u1EA5t k\u1EF3 s\u1EF1 s\u1EE5t gi\u1EA3m PaO2 n\xE0o ti\u1EBFp theo \u0111\u1EC1u l\xE0m t\u1EE5t d\u1ED1c SaO2 \u0111\u1ED9t ng\u1ED9t g\xE2y thi\u1EBFu oxy m\xF4 tr\u1EA7m tr\u1ECDng!'), ht > 45 && vt.includes("type2") && g < 7.25 && _e.push("\u{1F6A8} C\u1EA4P C\u1EE8U H\xD4 H\u1EA4P: PaCO2 t\u0103ng k\xE8m toan m\xE1u n\u1EB7ng (pH < 7.25) l\xE0 d\u1EA5u hi\u1EC7u ki\u1EC7t c\u01A1 h\xF4 h\u1EA5p (Exhaustion) ho\u1EB7c suy th\xF4ng kh\xED t\u1ED1i c\u1EA5p, c\u1EA7n chu\u1EA9n b\u1ECB h\u1ED7 tr\u1EE3 th\xF4ng kh\xED (BiPAP ho\u1EB7c \u0111\u1EB7t N\u1ED9i kh\xED qu\u1EA3n) ngay l\u1EADp t\u1EE9c!"), g < 7.25 || Y > 55 ? _e.push(`\u{1F6A8} TOAN M\xC1U N\u1EB6NG (pH ${g} / [H+] ${Y} nmol/L): C\u01A1 ch\u1EBF b\xF9 tr\u1EEB sinh l\xFD \u0111\xE3 c\u1EA1n ki\u1EC7t, nguy c\u01A1 tr\u1EE5y tim m\u1EA1ch, lo\u1EA1n nh\u1ECBp th\u1EA5t ch\u1EBFt ng\u01B0\u1EDDi v\xE0 \u0111\u1EC1 kh\xE1ng catecholamine!`) : g > 7.55 && _e.push(`\u{1F6A8} KI\u1EC0M M\xC1U N\u1EB6NG (pH ${g}): T\u0103ng co th\u1EAFt m\u1EA1ch m\xE1u n\xE3o, co gi\u1EADt tetany, gi\u1EA3m t\u01B0\u1EDBi m\xE1u m\u1EA1ch v\xE0nh, h\u1EA1 calci v\xE0 kali m\xE1u \u0111e d\u1ECDa ng\u1EEBng tim!`), (R < -10 || E < 15) && _e.push(`\u26A0\uFE0F TOAN CHUY\u1EC2N H\xD3A N\u1EB6NG (BE ${R} / HCO3 ${E} mmol/L): N\u1EB1m trong c\xE1c h\u1EC7 th\u1ED1ng t\xEDnh \u0111i\u1EC3m nguy k\u1ECBch (APACHE, Glasgow), c\u1EA3nh b\xE1o thi\u1EBFu oxy m\xF4 s\xE2u ho\u1EB7c t\xEDch t\u1EE5 acid chuy\u1EC3n h\xF3a n\u1EB7ng.`), P !== void 0 && P > 4 && _e.push(`\u{1F6A8} TOAN LACTIC N\u1EB6NG (${P} mmol/L): Ch\u1EC9 \u0111i\u1EC3m thi\u1EBFu oxy m\xF4 to\xE0n th\u1EC3 / s\u1ED1c nhi\u1EC5m khu\u1EA9n / ho\u1EA1i t\u1EED thi\u1EBFu m\xE1u t\u1EA1ng. T\u1EF7 l\u1EC7 t\u1EED vong l\xEAn t\u1EDBi 30-50% n\u1EBFu kh\xF4ng h\u1ED3i s\u1EE9c k\u1ECBp th\u1EDDi!`), U !== void 0 && U > 10 && _e.push(`\u{1F6A8} NG\u1ED8 \u0110\u1ED8C KH\xCD CO (COHb ${U}%): CO \xE1i l\u1EF1c g\u1EA5p 200 l\u1EA7n oxy v\u1EDBi Hemoglobin. M\xE1y \u0111o SpO2 k\u1EB9p ng\xF3n tay v\xE0 gi\xE1 tr\u1ECB PaO2 tr\xEAn m\xE1y kh\xED m\xE1u KH\xD4NG PH\u1EA2N \xC1NH \u0110\xDANG l\u01B0\u1EE3ng oxy m\xF4 th\u1EF1c t\u1EBF! Ch\u1EC9 \u0111\u1ECBnh th\u1EDF Oxy 100% qua mask th\u1EDF l\u1EA1i ngay.`);
    const he = [{ stepNumber: 1, stepName: "B\u01B0\u1EDBc 1: \u0110\xE1nh gi\xE1 l\xE2m s\xE0ng (Review the Patient)", title: "B\u1EC7nh s\u1EED, tri gi\xE1c v\xE0 d\u1EA5u hi\u1EC7u sinh t\u1ED3n", finding: `Tu\u1ED5i: ${T}, SpO2: ${Z}%, FiO2: ${C}%`, detail: "Lu\xF4n \u0111\u1ED1i chi\u1EBFu kh\xED m\xE1u v\u1EDBi b\u1EC7nh c\u1EA3nh th\u1EF1c t\u1EBF: ti\u1EC1n s\u1EED COPD, \u0111\xE1i th\xE1o \u0111\u01B0\u1EDDng, ch\u1EA5n th\u01B0\u01A1ng, s\u1ED1c, n\xF4n \xF3i hay s\u1EED d\u1EE5ng thu\u1ED1c an th\u1EA7n/morphin. Kh\xED m\xE1u kh\xF4ng bao gi\u1EDD \u0111\u01B0\u1EE3c t\xE1ch r\u1EDDi kh\u1ECFi ng\u01B0\u1EDDi b\u1EC7nh.", status: "info" }, { stepNumber: 2, stepName: "B\u01B0\u1EDBc 2: Ph\xE2n t\xEDch Oxy h\xF3a m\xE1u (Analyse Oxygenation)", title: `PaO2: ${B.toFixed(1)} mmHg (${gt.toFixed(1)} kPa) | SaO2: ${Z}%`, finding: z ? `Gi\u1EA3m oxy m\xE1u (${q})` : "Oxy h\xF3a m\xE1u b\u1EA3o t\u1ED3n", detail: `T\u1EC9 l\u1EC7 P/F = ${ie} (${ae}). A-a gradient = ${et.toFixed(1)} mmHg (chu\u1EA9n theo tu\u1ED5i: ~${St.toFixed(0)} mmHg). ${Ft ? "A-a gradient t\u0103ng: T\u1ED5n th\u01B0\u01A1ng m\xE0ng ph\u1EBF nang mao m\u1EA1ch ho\u1EB7c b\u1EA5t t\u01B0\u01A1ng x\u1EE9ng V/Q." : "A-a gradient b\xECnh th\u01B0\u1EDDng: Gi\u1EA3m oxy do gi\u1EA3m th\xF4ng kh\xED thu\u1EA7n t\xFAy ho\u1EB7c \u0111\u1ED9 cao."}`, status: z ? q === "severe" ? "danger" : "warning" : "normal" }, { stepNumber: 3, stepName: "B\u01B0\u1EDBc 3: \u0110\xE1nh gi\xE1 pH m\xE1u (Assess the pH)", title: `pH: ${g} (N\u1ED3ng \u0111\u1ED9 H+: ${Y} nmol/L)`, finding: Zt === "acidaemia" ? "Toan m\xE1u (Acidaemia, pH < 7.35)" : Zt === "alkalaemia" ? "Ki\u1EC1m m\xE1u (Alkalaemia, pH > 7.45)" : "pH trong gi\u1EDBi h\u1EA1n b\xECnh th\u01B0\u1EDDng (7.35 - 7.45)", detail: Zt === "acidaemia" ? "Toan m\xE1u l\xE0m gi\u1EA3m s\u1EE9c co b\xF3p c\u01A1 tim, gi\u1EA3m \u0111\xE1p \u1EE9ng m\u1EA1ch m\xE1u v\u1EDBi catecholamine. N\u1EBFu pH < 7.25 l\xE0 t\xECnh tr\u1EA1ng c\u1EA5p c\u1EE9u kh\u1EA9n." : Zt === "alkalaemia" ? "Ki\u1EC1m m\xE1u g\xE2y co th\u1EAFt m\u1EA1ch m\xE1u n\xE3o, gi\u1EA3m gi\u1EA3i ph\xF3ng oxy cho m\xF4 (l\u1EC7ch tr\xE1i \u0111\u01B0\u1EDDng cong oxyhemoglobin) v\xE0 h\u1EA1 calci ion t\u1EF1 do." : "pH b\xECnh th\u01B0\u1EDDng kh\xF4ng \u0111\u1ED3ng ngh\u0129a v\u1EDBi kh\xF4ng c\xF3 r\u1ED1i lo\u1EA1n: c\xF3 th\u1EC3 l\xE0 r\u1ED1i lo\u1EA1n \u0111\xE3 b\xF9 tr\u1EEB ho\xE0n to\xE0n ho\u1EB7c r\u1ED1i lo\u1EA1n h\u1ED7n h\u1EE3p \u0111\u1ED1i kh\xE1ng.", status: Zt === "normal" ? "normal" : "danger" }, { stepNumber: 4, stepName: "B\u01B0\u1EDBc 4: \u0110\xE1nh gi\xE1 R\u1ED1i lo\u1EA1n H\xF4 h\u1EA5p (Assess Respiratory Disturbance)", title: `PaCO2: ${ht.toFixed(1)} mmHg (${tt.toFixed(1)} kPa)`, finding: I ? "T\u0103ng CO2 m\xE1u (Hypercapnia) -> Toan h\xF4 h\u1EA5p" : $ ? "Gi\u1EA3m CO2 m\xE1u (Hypocapnia) -> Ki\u1EC1m h\xF4 h\u1EA5p" : "PaCO2 b\xECnh th\u01B0\u1EDDng (35 - 45 mmHg)", detail: I ? "T\u0103ng PaCO2 ch\u1EC9 ra gi\u1EA3m th\xF4ng kh\xED ph\u1EBF nang. C\u1EA7n ki\u1EC3m tra xem l\xE0 c\u1EA5p t\xEDnh, m\u1EA1n t\xEDnh (\u1EDF COPD) hay c\u1EA5p tr\xEAn n\u1EC1n m\u1EA1n." : $ ? "Gi\u1EA3m PaCO2 do t\u0103ng th\xF4ng kh\xED ph\u1EBF nang. Ph\xE2n bi\u1EC7t t\u0103ng th\xF4ng kh\xED nguy\xEAn ph\xE1t (lo \xE2u, \u0111au) hay th\u1EE9 ph\xE1t b\xF9 tr\u1EEB toan chuy\u1EC3n h\xF3a." : "Th\xF4ng kh\xED ph\u1EBF nang b\xECnh th\u01B0\u1EDDng \u0111\u1ED1i v\u1EDBi t\u1ED1c \u0111\u1ED9 s\u1EA3n sinh CO2.", status: I || $ ? "warning" : "normal" }, { stepNumber: 5, stepName: "B\u01B0\u1EDBc 5: \u0110\xE1nh gi\xE1 R\u1ED1i lo\u1EA1n Chuy\u1EC3n h\xF3a (Assess Metabolic Disturbance)", title: `HCO3-: ${E} mmol/L | Base Excess (BE): ${R > 0 ? "+" + R : R} mmol/L`, finding: lt ? "Gi\u1EA3m Bicarbonate / BE \xE2m -> Toan chuy\u1EC3n h\xF3a" : kt ? "T\u0103ng Bicarbonate / BE d\u01B0\u01A1ng -> Ki\u1EC1m chuy\u1EC3n h\xF3a" : "Bicarbonate & BE trong gi\u1EDBi h\u1EA1n b\xECnh th\u01B0\u1EDDng", detail: lt ? `Toan chuy\u1EC3n h\xF3a: C\u1EA7n t\xEDnh Kho\u1EA3ng tr\u1ED1ng Anion (Anion Gap) \u0111\u1EC3 ph\xE2n \u0111\u1ECBnh toan t\u0103ng AG (DKA, Lactic, suy th\u1EADn, ng\u1ED9 \u0111\u1ED9c) hay toan AG b\xECnh th\u01B0\u1EDDng (m\u1EA5t qua ti\xEAu h\xF3a, toan \u1ED1ng th\u1EADn). ${qt !== void 0 ? `Anion Gap hi\u1EC7n t\u1EA1i = ${qt.toFixed(1)} mmol/L (${K ? "T\u0102NG" : "B\xCCNH TH\u01AF\u1EDCNG"}).` : ""}` : kt ? "Ki\u1EC1m chuy\u1EC3n h\xF3a: Th\u01B0\u1EDDng do m\u1EA5t ion H+ qua \u0111\u01B0\u1EDDng ti\xEAu h\xF3a (n\xF4n \xF3i, h\xFAt d\u1EA1 d\xE0y), m\u1EA5t qua th\u1EADn (l\u1EE3i ti\u1EC3u quai/thiazide) ho\u1EB7c th\u1EEBa kho\xE1ng corticoid." : "Th\xE0nh ph\u1EA7n \u0111\u1EC7m chuy\u1EC3n h\xF3a duy tr\xEC t\u1ED1t.", status: lt || kt ? "warning" : "normal" }, { stepNumber: 6, stepName: "B\u01B0\u1EDBc 6: X\xE1c \u0111\u1ECBnh B\xF9 tr\u1EEB hay R\u1ED1i lo\u1EA1n H\u1ED7n h\u1EE3p (Compensatory vs Mixed)", title: `T\xECnh tr\u1EA1ng b\xF9 tr\u1EEB: ${Lt.toUpperCase()}`, finding: wt, detail: Ye ? "T\u1ED3n t\u1EA1i \u0111\u1ED3ng th\u1EDDi t\u1EEB hai r\u1ED1i lo\u1EA1n ti\xEAn ph\xE1t tr\u1EDF l\xEAn (v\xED d\u1EE5: v\u1EEBa toan chuy\u1EC3n h\xF3a v\u1EEBa ki\u1EC1m h\xF4 h\u1EA5p nh\u01B0 trong ng\u1ED9 \u0111\u1ED9c Salicylate, ho\u1EB7c toan h\u1ED7n h\u1EE3p c\u1EF1c n\u1EB7ng trong ng\u1EEBng tim)." : Lt === "fully_compensated" ? "B\xF9 tr\u1EEB ho\xE0n to\xE0n: pH \u0111\xE3 tr\u1EDF l\u1EA1i d\u1EA3i 7.35 - 7.45. X\xE9t m\u1ED1c 7.40 \u0111\u1EC3 bi\u1EBFt g\u1ED1c r\u1ED1i lo\u1EA1n ban \u0111\u1EA7u (pH < 7.40 thi\xEAn toan; pH > 7.40 thi\xEAn ki\u1EC1m). Nh\u1EDB r\u1EB1ng sinh l\xFD kh\xF4ng bao gi\u1EDD b\xF9 qu\xE1 m\u1EE9c." : Lt === "partially_compensated" ? "B\xF9 tr\u1EEB b\xE1n ph\u1EA7n: C\u01A1 quan \u0111\u1ED1i ngh\u1ECBch \u0111ang n\u1ED7 l\u1EF1c b\xF9 tr\u1EEB nh\u01B0ng pH v\u1EABn c\xF2n l\u1EC7ch kh\u1ECFi kho\u1EA3ng an to\xE0n." : "Ch\u01B0a c\xF3 b\xF9 tr\u1EEB: R\u1ED1i lo\u1EA1n di\u1EC5n ra qu\xE1 c\u1EA5p t\xEDnh khi\u1EBFn c\u01A1 quan \u0111\u1ED1i ngh\u1ECBch ch\u01B0a k\u1ECBp \u0111\xE1p \u1EE9ng.", status: Ye ? "danger" : Lt === "fully_compensated" ? "normal" : "warning" }], Hs = Zx(vt, q, Ue, Pt, Lt, g, B, ht, E, P, y, K);
    return { gasExchange: { category: vt, title: se, description: re, severity: q, type2Subtype: Ue, isHyperventilationPrimary: oa, isHypoxaemia: z, hypoxaemiaSeverity: q }, acidBase: { category: Pt, title: wt, description: Dt, compensation: Lt, acidaemiaStatus: Zt, primaryDisorder: ce, compensatoryResponse: fe, isMixed: Ye, mixedDetails: Cs }, calculations: { hIonNmol: Y, pao2MmHg: Math.round(B * 10) / 10, paco2MmHg: Math.round(ht * 10) / 10, pao2Kpa: Math.round(gt * 10) / 10, paco2Kpa: Math.round(tt * 10) / 10, pfRatio: ie, pfClass: ae, pao2Alveolar: Math.round(Ct * 10) / 10, aaGradient: Math.round(et * 10) / 10, expectedAaGradient: Math.round(St * 10) / 10, isAaGradientElevated: Ft, anionGap: qt !== void 0 ? Math.round(qt * 10) / 10 : void 0, anionGapWithK: k !== void 0 ? Math.round(k * 10) / 10 : void 0, isAnionGapHigh: K, correctedAnionGap: F !== void 0 ? Math.round(F * 10) / 10 : void 0, deltaRatio: xt, deltaRatioInterpretation: pt, expectedPaco2Winter: lt ? { min: m, max: M } : void 0 }, criticalWarnings: _e, sixSteps: he, treatmentProtocols: Hs };
  }
  function Zx(u, O, g, o, G, E, R, Z, D, H, p, _, P) {
    let y = "X\u1EED tr\xED th\u0103ng b\u1EB1ng n\u1ED9i m\xF4i, duy tr\xEC oxy h\xF3a m\xE1u v\xE0 gi\u1EA3i quy\u1EBFt nguy\xEAn nh\xE2n g\u1ED1c r\u1EC5.", j = "Duy tr\xEC SpO2 m\u1EE5c ti\xEAu 94 - 98% \u1EDF b\u1EC7nh nh\xE2n kh\xF4ng c\xF3 nguy c\u01A1 \u1EE9 th\xE1n kh\xED CO2.", T = "Ch\u01B0a c\xF3 ch\u1EC9 \u0111\u1ECBnh can thi\u1EC7p th\xF4ng kh\xED c\u01A1 h\u1ECDc x\xE2m nh\u1EADp.";
    const U = [];
    let nt = "Theo d\xF5i monitor SpO2 li\xEAn t\u1EE5c, l\xE0m l\u1EA1i ABG sau 30-60 ph\xFAt n\u1EBFu c\xF3 thay \u0111\u1ED5i l\xE2m s\xE0ng.";
    const ht = [];
    return u === "type2_respiratory_impairment" ? g === "chronic" || g === "acute_on_chronic" ? (y = "X\u1EED tr\xED \u0110\u1EE3t c\u1EA5p Suy h\xF4 h\u1EA5p Type 2 tr\xEAn n\u1EC1n m\u1EA1n t\xEDnh (COPD / Pickwickian). Tuy\u1EC7t \u0111\u1ED1i tr\xE1nh th\u1EDF oxy n\u1ED3ng \u0111\u1ED9 cao l\xE0m d\u1EADp t\u1EAFt Hypoxic Drive!", j = "Li\u1EC7u ph\xE1p OXY KI\u1EC2M SO\xC1T n\u1ED3ng \u0111\u1ED9 th\u1EA5p (Controlled Oxygen Therapy): D\xF9ng Mask Venturi 24% - 28% ho\u1EB7c g\u1ECDng m\u0169i 1 - 2 L/ph\xFAt. M\u1EE4C TI\xCAU SpO2 CH\u1EB6T CH\u1EBC: 88% - 92% (tr\xE1nh \u0111\u1EA9y PaO2 l\xEAn qu\xE1 cao l\xE0m m\u1EA5t k\xEDch th\xEDch th\u1EDF)", ht.push("C\u1EA2NH B\xC1O HYPOXIC DRIVE: \u1EDE b\u1EC7nh nh\xE2n \u1EE9 CO2 m\u1EA1n t\xEDnh, th\u1EE5 th\u1EC3 c\u1EA3m nh\u1EADn CO2 \u0111\xE3 tr\u01A1 l\xEC, ph\u1EA3n x\u1EA1 th\u1EDF ph\u1EE5 thu\u1ED9c v\xE0o t\xECnh tr\u1EA1ng thi\u1EBFu oxy m\xE1u. Th\u1EDF oxy qu\xE1 m\u1EE9c (nh\u01B0 mask 60% hay t\xFAi d\u1EF1 tr\u1EEF) s\u1EBD d\u1EADp t\u1EAFt k\xEDch th\xEDch n\xE0y, g\xE2y gi\u1EA3m th\xF4ng kh\xED th\u1EE9 ph\xE1t, PaCO2 v\u1ECDt l\xEAn d\u1EABn \u0111\u1EBFn h\xF4n m\xEA v\xE0 ng\u1EEBng th\u1EDF!"), (E < 7.35 || Z > 50) && (T = "CH\u1EC8 \u0110\u1ECANH TH\xD4NG KH\xCD KH\xD4NG X\xC2M NH\u1EACP (NIV / BiPAP): \u01AFu ti\xEAn h\xE0ng \u0111\u1EA7u cho \u0111\u1EE3t c\u1EA5p COPD c\xF3 toan h\xF4 h\u1EA5p (pH 7.25 - 7.35, PaCO2 t\u0103ng). C\xE0i \u0111\u1EB7t IPAP 10-12 cmH2O, EPAP 4-5 cmH2O, n\xE2ng d\u1EA7n \u0111\u1EC3 gi\u1EA3m c\xF4ng th\u1EDF v\xE0 th\u1EA3i CO2. Chu\u1EA9n b\u1ECB \u0111\u1EB7t N\u1ED9i kh\xED qu\u1EA3n n\u1EBFu ki\u1EC7t c\u01A1 (pH < 7.25, r\u1ED1i lo\u1EA1n tri gi\xE1c)."), U.push("Kh\xED dung gi\xE3n ph\u1EBF qu\u1EA3n t\xE1c d\u1EE5ng ng\u1EAFn: SABA (Salbutamol) + SAMA (Ipratropium)."), U.push("Corticosteroid \u0111\u01B0\u1EDDng to\xE0n th\xE2n (Prednisolone ho\u1EB7c Methylprednisolone)."), U.push("Kh\xE1ng sinh n\u1EBFu c\xF3 d\u1EA5u hi\u1EC7u nhi\u1EC5m tr\xF9ng (tam ch\u1EE9ng Anthonisen: t\u0103ng kh\xF3 th\u1EDF, t\u0103ng \u0111\u1EDDm, \u0111\u1EDDm m\u1EE7).")) : (y = "X\u1EED tr\xED Suy h\xF4 h\u1EA5p Type 2 C\u1EA5p t\xEDnh (Ng\u1ED9 \u0111\u1ED9c thu\u1ED1c \u1EE9c ch\u1EBF th\u1EA7n kinh, ki\u1EC7t c\u01A1, nh\u01B0\u1EE3c c\u01A1, d\u1ECB v\u1EADt \u0111\u01B0\u1EDDng th\u1EDF).", j = "Cung c\u1EA5p oxy \u0111\u1EE7 \u0111\u1EC3 duy tr\xEC SpO2 > 92%. V\xEC l\xE0 c\u1EA5p t\xEDnh, b\u1EC7nh nh\xE2n KH\xD4NG ph\u1EE5 thu\u1ED9c hypoxic drive, nh\u01B0ng t\u0103ng PaCO2 l\xE0 kh\u1EA9n c\u1EA5p.", T = "H\u1ED7 tr\u1EE3 th\xF4ng kh\xED b\xF3ng qua mask (BVM) ngay l\u1EADp t\u1EE9c n\u1EBFu nh\u1ECBp th\u1EDF ch\u1EADm (< 8 l/p) ho\u1EB7c ng\u1EEBng th\u1EDF. S\u1EB5n s\xE0ng \u0111\u1EB7t n\u1ED9i kh\xED qu\u1EA3n v\xE0 th\u1EDF m\xE1y.", U.push("N\u1EBFu nghi ng\u1EDD ng\u1ED9 \u0111\u1ED9c Opioid/Morphine (\u0111\u1ED3ng t\u1EED co nh\u1ECF nh\u01B0 \u0111\u1EA7u \u0111inh ghim, th\u1EDF ch\u1EADm): Ti\xEAm t\u0129nh m\u1EA1ch NALOXONE 0.4mg - 2mg, l\u1EB7p l\u1EA1i m\u1ED7i 2-3 ph\xFAt n\u1EBFu ch\u01B0a \u0111\xE1p \u1EE9ng."), U.push("N\u1EBFu do ng\u1ED9 \u0111\u1ED9c Benzodiazepine: C\xE2n nh\u1EAFc Flumazenil (th\u1EADn tr\u1ECDng ti\u1EC1n s\u1EED \u0111\u1ED9ng kinh/nghi\u1EC7n m\xE3n)."), U.push("Gi\u1EA3i ph\xF3ng d\u1ECB v\u1EADt \u0111\u01B0\u1EDDng th\u1EDF n\u1EBFu c\xF3 t\u1EAFc ngh\u1EBDn c\u01A1 h\u1ECDc.")) : u === "type1_respiratory_impairment" ? (y = `X\u1EED tr\xED Suy h\xF4 h\u1EA5p Type 1 (Gi\u1EA3m oxy m\xE1u m\u1EE9c \u0111\u1ED9 ${O}). M\u1EE5c ti\xEAu n\xE2ng PaO2 > 60 mmHg (8 kPa) v\xE0 SaO2 > 92%.`, O === "severe" ? (j = "Oxy l\u01B0u l\u01B0\u1EE3ng cao: Th\u1EDF Mask c\xF3 t\xFAi d\u1EF1 tr\u1EEF kh\xF4ng th\u1EDF l\u1EA1i (Non-rebreather mask) 10 - 15 L/ph\xFAt \u0111\u1EC3 \u0111\u1EA1t FiO2 60% - 90%, ho\u1EB7c h\u1EC7 th\u1ED1ng oxy d\xF2ng cao qua m\u0169i (HFNC).", T = "C\xE2n nh\u1EAFc CPAP/NIV ho\u1EB7c \u0111\u1EB7t N\u1ED9i kh\xED qu\u1EA3n th\u1EDF m\xE1y x\xE2m nh\u1EADp n\u1EBFu P/F < 150, co k\xE9o c\u01A1 h\xF4 h\u1EA5p ph\u1EE5 d\u1EEF d\u1ED9i ho\u1EB7c toan lactic ti\u1EBFn tri\u1EC3n do ki\u1EC7t s\u1EE9c.") : O === "moderate" ? j = "Th\u1EDF oxy qua Mask \u0111\u01A1n gi\u1EA3n 5 - 10 L/ph\xFAt (FiO2 35 - 50%) ho\u1EB7c g\u1ECDng m\u0169i 3 - 5 L/ph\xFAt." : j = "Th\u1EDF oxy g\u1ECDng k\xEDnh m\u0169i (Nasal cannula) 1 - 3 L/ph\xFAt (FiO2 24 - 32%).", U.push("T\xECm v\xE0 \u0111i\u1EC1u tr\u1ECB nguy\xEAn nh\xE2n V/Q mismatch ho\u1EB7c Shunt: Vi\xEAm ph\u1ED5i (kh\xE1ng sinh), Thuy\xEAn t\u1EAFc ph\u1ED5i (ch\u1ED1ng \u0111\xF4ng kh\u1EA9n), Ph\xF9 ph\u1ED5i c\u1EA5p (l\u1EE3i ti\u1EC3u + d\xE3n m\u1EA1ch), X\u1EB9p ph\u1ED5i / Tr\xE0n kh\xED m\xE0ng ph\u1ED5i (d\u1EABn l\u01B0u ng\u1EF1c)."), nt = "Theo d\xF5i SpO2 li\xEAn t\u1EE5c b\u1EB1ng pulse oximeter. V\xEC PaCO2 b\xECnh th\u01B0\u1EDDng, oximetry l\xE0 c\xF4ng c\u1EE5 gi\xE1m s\xE1t ti\u1EBFn tri\u1EC3n r\u1EA5t t\u1ED1t m\xE0 kh\xF4ng c\u1EA7n \u0111\xE2m kim \u0111\u1ED9ng m\u1EA1ch li\xEAn t\u1EE5c.") : u === "hyperventilation" && (y = "X\u1EED tr\xED H\u1ED9i ch\u1EE9ng T\u0103ng th\xF4ng kh\xED (Hyperventilation Syndrome / R\u1EEDa tr\xF4i CO2).", j = "N\u1EBFu PaO2 b\xECnh th\u01B0\u1EDDng v\xE0 SpO2 99-100%, KH\xD4NG c\u1EA7n th\u1EDF th\xEAm oxy (tr\u1EEB khi c\xF3 h\u1EA1 oxy m\xE1u ti\u1EC1m \u1EA9n nh\u01B0 trong thuy\xEAn t\u1EAFc ph\u1ED5i ban \u0111\u1EA7u).", U.push("Tr\u1EA5n an t\xE2m l\xFD b\u1EC7nh nh\xE2n, h\u01B0\u1EDBng d\u1EABn k\u1EF9 thu\u1EADt th\u1EDF ch\u1EADm v\xE0 s\xE2u (diaphragmatic breathing)."), U.push("Th\u1EDF l\u1EA1i v\xE0o t\xFAi gi\u1EA5y (Paper bag rebreathing) c\xF3 ki\u1EC3m so\xE1t \u0111\u1EC3 h\xEDt l\u1EA1i CO2 t\u1EF1 sinh, gi\xFAp n\xE2ng PaCO2 v\xE0 c\u1EAFt nhanh tri\u1EC7u ch\u1EE9ng t\xEA m\xF4i/co qu\u1EAFp b\xE0n tay (tetany do h\u1EA1 calci ion t\u1EF1 do). Th\u1EADn tr\u1ECDng lo\u1EA1i tr\u1EEB b\u1EC7nh tim ph\u1ED5i c\u1EA5p tr\u01B0\u1EDBc khi \xE1p d\u1EE5ng."), U.push("Gi\u1EA3m \u0111au th\u1ECFa \u0111\xE1ng b\u1EB1ng thu\u1ED1c gi\u1EA3m \u0111au \u0111a m\xF4 th\u1EE9c n\u1EBFu t\u0103ng th\xF4ng kh\xED do \u0111au \u0111\u1EDBn d\u1EEF d\u1ED9i sau ch\u1EA5n th\u01B0\u01A1ng.")), o === "metabolic_acidosis" ? _ ? (U.push("TI\u1EBEP C\u1EACN TOAN CHUY\u1EC2N H\xD3A T\u0102NG ANION GAP: X\xE1c \u0111\u1ECBnh nguy\xEAn nh\xE2n theo nh\xF3m GOLDMARK / MUDPILES."), p && p > 13.9 && U.push("Nghi ng\u1EDD Nhi\u1EC5m toan Ceton \u0110T\u0110 (DKA): B\xF9 d\u1ECBch \u0111\u1EB3ng tr\u01B0\u01A1ng NaCl 0.9% 1000ml trong gi\u1EDD \u0111\u1EA7u; Truy\u1EC1n Insulin t\u0129nh m\u1EA1ch li\xEAn t\u1EE5c 0.1 UI/kg/h; B\xF9 Kali ngay khi K+ < 5.2 mmol/L (ch\u1EC9 truy\u1EC1n insulin khi K+ > 3.3). KH\xD4NG d\xF9ng Bicarbonate tr\u1EEB khi pH < 6.9."), H && H > 2 && U.push("Toan Lactic do gi\u1EA3m t\u01B0\u1EDBi m\xE1u / S\u1ED1c: H\u1ED3i s\u1EE9c d\u1ECBch tinh th\u1EC3 30ml/kg trong 3 gi\u1EDD \u0111\u1EA7u (Surviving Sepsis Campaign bundle); D\xF9ng thu\u1ED1c v\u1EADn m\u1EA1ch (Noradrenaline) duy tr\xEC huy\u1EBFt \xE1p trung b\xECnh MAP >= 65 mmHg; Kh\xE1ng sinh ph\u1ED5 r\u1ED9ng trong gi\u1EDD \u0111\u1EA7u n\u1EBFu nhi\u1EC5m khu\u1EA9n.")) : U.push("TI\u1EBEP C\u1EACN TOAN CHUY\u1EC2N H\xD3A ANION GAP B\xCCNH TH\u01AF\u1EDCNG (T\u0103ng Clo m\xE1u): M\u1EA5t Bicarbonate qua ti\xEAu h\xF3a (ti\xEAu ch\u1EA3y c\u1EA5p, r\xF2 ru\u1ED9t) ho\u1EB7c qua th\u1EADn (Toan h\xF3a \u1ED1ng th\u1EADn RTA Type 1, 2, 4). \u0110i\u1EC1u tr\u1ECB b\xF9 d\u1ECBch Ringer Lactate/b\xF9 Bicarbonate \u0111\u01B0\u1EDDng u\u1ED1ng v\xE0 \u0111i\u1EC1u ch\u1EC9nh Kali.") : o === "metabolic_alkalosis" && (U.push('X\u1EEC TR\xCD KI\u1EC0M CHUY\u1EC2N H\xD3A: Ph\u1EA7n l\u1EDBn l\xE0 th\u1EC3 "\u0110\xE1p \u1EE9ng v\u1EDBi Clo" do n\xF4n \xF3i nhi\u1EC1u, m\u1EA5t d\u1ECBch d\u1EA1 d\xE0y ho\u1EB7c d\xF9ng l\u1EE3i ti\u1EC3u quai.'), U.push("B\xF9 th\u1EC3 t\xEDch tu\u1EA7n ho\xE0n v\xE0 ion Clo b\u1EB1ng truy\u1EC1n t\u0129nh m\u1EA1ch NaCl 0.9% (gi\xFAp th\u1EADn th\u1EA3i b\u1EDBt HCO3- d\u01B0 th\u1EEBa)."), U.push("B\xF9 Kali (KCl truy\u1EC1n ho\u1EB7c u\u1ED1ng): Khi thi\u1EBFu Kali, \u1ED1ng l\u01B0\u1EE3n xa th\u1EADn bu\u1ED9c ph\u1EA3i b\xE0i ti\u1EBFt ion H+ \u0111\u1EC3 gi\u1EEF Natri, l\xE0m duy tr\xEC v\xF2ng xo\u1EAFn ki\u1EC1m chuy\u1EC3n h\xF3a."), g === "chronic" && U.push("L\u01B0u \xFD: B\u1EC7nh nh\xE2n COPD d\xF9ng l\u1EE3i ti\u1EC3u li\u1EC1u cao th\u01B0\u1EDDng b\u1ECB ki\u1EC1m chuy\u1EC3n h\xF3a ch\u1ED3ng l\u1EA5p l\xEAn toan h\xF4 h\u1EA5p m\u1EA1n t\xEDnh. C\xE2n nh\u1EAFc d\xF9ng l\u1EE3i ti\u1EC3u gi\u1EEF Kali (Spironolactone) ho\u1EB7c t\u1EA1m ng\u01B0ng furosemide.")), { summary: y, oxygenTherapy: j, ventilationSupport: T, underlyingManagement: U, monitoringAdvice: nt, precautions: ht };
  }
  var Nm = ({ na: u, cl: O, hco3: g, k: o, albumin: G, onUpdateLabs: E }) => {
    const [R, Z] = Q.useState(false), [D, H] = Q.useState(false), p = 12, _ = 24, P = u !== void 0 && O !== void 0 && g !== void 0, y = P ? Math.round((u - (O + g)) * 10) / 10 : void 0, j = P && o !== void 0 ? Math.round((u + o - (O + g)) * 10) / 10 : void 0;
    let T;
    if (y !== void 0 && G !== void 0 && G > 0) {
      const Y = G > 10 ? G / 10 : G;
      T = Math.round((y + 2.5 * (4 - Y)) * 10) / 10;
    }
    const U = T !== void 0 ? T : y, nt = U !== void 0 ? Math.round((U - p) * 10) / 10 : void 0, ht = Math.round((_ - g) * 10) / 10;
    let B;
    nt !== void 0 && ht !== void 0 && ht > 0 && (B = Math.round(nt / ht * 100) / 100);
    const tt = nt !== void 0 ? Math.round((g + nt) * 10) / 10 : void 0, gt = U !== void 0 && U > 16, C = U !== void 0 && U < 8;
    let L;
    return B !== void 0 && (B < 0.4 ? L = { category: "NAGMA", title: "T\u1EF7 s\u1ED1 < 0.4: Toan chuy\u1EC3n h\xF3a t\u0103ng Clorid m\xE1u (NAGMA thu\u1EA7n t\xFAy)", description: "S\u1EF1 s\u1EE5t gi\u1EA3m HCO3- v\u01B0\u1EE3t tr\u1ED9i so v\u1EDBi s\u1EF1 t\u0103ng Anion Gap. H\u1EA7u h\u1EBFt acid t\xEDch l\u0169y l\xE0 do m\u1EA5t HCO3- qua \u0111\u01B0\u1EDDng ti\xEAu h\xF3a ho\u1EB7c th\u1EADn k\xE8m t\u0103ng gi\u1EEF Clorid.", clinicalExamples: ["Ti\xEAu ch\u1EA3y c\u1EA5p m\u1EA5t d\u1ECBch ki\u1EC1m", "Toan h\xF3a \u1ED1ng th\u1EADn (RTA Type 1, 2, 4)", "Truy\u1EC1n l\u01B0\u1EE3ng l\u1EDBn NaCl 0.9% (toan do pha lo\xE3ng/t\u0103ng Cl)", "D\u1EABn l\u01B0u m\u1EADt, t\u1EE5y, m\u1EDF th\xF4ng h\u1ED3i tr\xE0ng"], colorClass: "text-amber-800 border-amber-300 bg-amber-50/80", badgeBg: "bg-amber-100 text-amber-900 border-amber-300" } : B < 0.8 ? L = { category: "MIXED_ACIDOSIS", title: "T\u1EF7 s\u1ED1 0.4 - 0.8: Toan chuy\u1EC3n h\xF3a h\u1ED7n h\u1EE3p (HAGMA + NAGMA ph\u1ED1i h\u1EE3p)", description: "\u0110\u1ED3ng th\u1EDDi t\u1ED3n t\u1EA1i c\u1EA3 2 c\u01A1 ch\u1EBF: v\u1EEBa c\xF3 acid kh\xF4ng \u0111\u1ECBnh l\u01B0\u1EE3ng t\xEDch l\u0169y (t\u0103ng AG), v\u1EEBa c\xF3 m\u1EA5t th\xEAm HCO3- ho\u1EB7c t\u0103ng Clo m\xE1u.", clinicalExamples: ["B\u1EC7nh nh\xE2n DKA ho\u1EB7c S\u1ED1c nhi\u1EC5m khu\u1EA9n (toan lactic) c\xF3 k\xE8m ti\xEAu ch\u1EA3y n\u1EB7ng", "Toan h\xF3a \u1ED1ng th\u1EADn (RTA) k\xE8m suy th\u1EADn c\u1EA5p", "Toan ceton \u0111\xE1i th\xE1o \u0111\u01B0\u1EDDng \u0111ang \u0111\u01B0\u1EE3c b\u1ED3i ph\u1EE5 d\u1ECBch NaCl 0.9% th\u1EC3 t\xEDch l\u1EDBn"], colorClass: "text-rose-800 border-rose-300 bg-rose-50/80", badgeBg: "bg-rose-100 text-rose-900 border-rose-300" } : B <= 2 ? L = { category: "PURE_HAGMA", title: "T\u1EF7 s\u1ED1 0.8 - 2.0: Toan chuy\u1EC3n h\xF3a t\u0103ng Anion Gap \u0111\u01A1n thu\u1EA7n (Pure HAGMA)", description: "T\u1EF7 s\u1ED1 1:1 \u0111i\u1EC3n h\xECnh. M\u1ED7i 1 mmol/L acid ngo\u1EA1i sinh/n\u1ED9i sinh sinh ra l\xE0m t\u0103ng 1 mmol/L AG v\xE0 trung h\xF2a m\u1EA5t \u0111\xFAng 1 mmol/L HCO3-.", clinicalExamples: ["DKA (Nhi\u1EC5m toan ceton do \u0111\xE1i th\xE1o \u0111\u01B0\u1EDDng, t\u1EF7 s\u1ED1 th\u01B0\u1EDDng ~ 1.0)", "Toan Lactic (Lactic Acidosis do s\u1ED1c/thi\u1EBFu oxy m\xF4, t\u1EF7 s\u1ED1 th\u01B0\u1EDDng ~ 1.6)", "Ng\u1ED9 \u0111\u1ED9c Methanol, Ethylene glycol, Salicylate (Aspirin)", "Suy th\u1EADn c\u1EA5p/m\u1EA1n n\u1EB7ng (t\xEDch t\u1EE5 sulfate, phosphate)"], colorClass: "text-indigo-800 border-indigo-300 bg-indigo-50/80", badgeBg: "bg-indigo-100 text-indigo-900 border-indigo-300" } : L = { category: "HAGMA_PLUS_ALKALOSIS", title: "T\u1EF7 s\u1ED1 > 2.0: Toan chuy\u1EC3n h\xF3a t\u0103ng AG k\xE8m KI\u1EC0M CHUY\u1EC2N H\xD3A ph\u1ED1i h\u1EE3p", description: "HCO3- \u0111o \u0111\u01B0\u1EE3c cao h\u01A1n m\u1EE9c k\u1EF3 v\u1ECDng \u0111\u1ED1i v\u1EDBi m\u1EE9c t\u0103ng c\u1EE7a AG. B\u1EC7nh nh\xE2n c\xF3 t\xECnh tr\u1EA1ng ki\u1EC1m chuy\u1EC3n h\xF3a k\xE8m theo l\xE0m t\u0103ng ng\u01B0\u1EE3c l\u1EA1i n\u1ED3ng \u0111\u1ED9 HCO3-.", clinicalExamples: ["Nhi\u1EC5m toan ceton \u0110T\u0110 (DKA) ho\u1EB7c toan lactic k\xE8m n\xF4n \xF3i nhi\u1EC1u (m\u1EA5t HCl d\u1ECBch v\u1ECB)", "B\u1EC7nh nh\xE2n suy th\u1EADn ho\u1EB7c s\u1ED1c \u0111ang d\xF9ng thu\u1ED1c l\u1EE3i ti\u1EC3u quai (Furosemide)", "Toan chuy\u1EC3n h\xF3a t\u0103ng AG xu\u1EA5t hi\u1EC7n tr\xEAn n\u1EC1n b\u1EC7nh nh\xE2n COPD t\u0103ng CO2 m\u1EA1n t\xEDnh (\u0111\xE3 c\xF3 HCO3- cao b\xF9 tr\u1EEB)"], colorClass: "text-purple-800 border-purple-300 bg-purple-50/80", badgeBg: "bg-purple-100 text-purple-900 border-purple-300" }), a.jsxs("div", { className: "bg-white rounded-2xl border border-indigo-200 shadow-xs overflow-hidden transition-all", children: [a.jsxs("div", { className: "bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 p-4 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2", children: [a.jsxs("div", { className: "flex items-center space-x-2.5", children: [a.jsx("div", { className: "p-2 bg-indigo-500/30 rounded-xl border border-indigo-400/40", children: a.jsx(Yh, { className: "w-5 h-5 text-indigo-300" }) }), a.jsxs("div", { children: [a.jsxs("div", { className: "flex items-center space-x-2", children: [a.jsx("h3", { className: "text-sm font-bold tracking-tight", children: "M\xE1y T\xEDnh T\u1EF1 \u0110\u1ED9ng Anion Gap & T\u1EF7 S\u1ED1 Delta / Delta" }), a.jsx("span", { className: "px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/40 text-indigo-200 border border-indigo-400/30", children: "T\u1EF1 \u0110\u1ED9ng Real-time" })] }), a.jsx("p", { className: "text-[11px] text-indigo-200", children: "T\u1EF1 \u0111\u1ED9ng t\xEDnh AG, AG hi\u1EC7u ch\u1EC9nh Albumin, \u0394AG, \u0394HCO\u2083\u207B v\xE0 t\u1EF7 s\u1ED1 \u0394/\u0394 ngay khi c\xF3 k\u1EBFt qu\u1EA3 \u0111i\u1EC7n gi\u1EA3i" })] })] }), E && a.jsx("button", { type: "button", onClick: () => H(!D), className: "self-start sm:self-auto text-xs px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-indigo-100 font-semibold transition-all cursor-pointer", children: D ? "\u0110\xF3ng \xF4 nh\u1EADp nhanh" : "Nh\u1EADp nhanh Na\u207A / Cl\u207B / Albumin" })] }), D && E && a.jsxs("div", { className: "bg-indigo-50/50 border-b border-indigo-100 p-3.5", children: [a.jsx("div", { className: "text-[11px] font-bold text-indigo-900 mb-2", children: "Hi\u1EC7u ch\u1EC9nh tr\u1EF1c ti\u1EBFp \u0111i\u1EC7n gi\u1EA3i & Albumin (t\u1EF1 \u0111\u1ED9ng \u0111\u1ED3ng b\u1ED9 v\u1EDBi B\u1EA3ng Th\xF4ng S\u1ED1):" }), a.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-2.5", children: [a.jsxs("div", { children: [a.jsx("label", { className: "text-[10px] font-bold text-slate-600 block mb-0.5", children: "Na\u207A (mmol/L)" }), a.jsx("input", { type: "number", value: u ?? "", placeholder: "140", onChange: (Y) => E({ na: Y.target.value ? parseFloat(Y.target.value) : void 0 }), className: "w-full px-2.5 py-1 text-xs font-semibold rounded-md border border-slate-300 bg-white focus:ring-2 focus:ring-indigo-500" })] }), a.jsxs("div", { children: [a.jsx("label", { className: "text-[10px] font-bold text-slate-600 block mb-0.5", children: "Cl\u207B (mmol/L)" }), a.jsx("input", { type: "number", value: O ?? "", placeholder: "100", onChange: (Y) => E({ cl: Y.target.value ? parseFloat(Y.target.value) : void 0 }), className: "w-full px-2.5 py-1 text-xs font-semibold rounded-md border border-slate-300 bg-white focus:ring-2 focus:ring-indigo-500" })] }), a.jsxs("div", { children: [a.jsx("label", { className: "text-[10px] font-bold text-slate-600 block mb-0.5", children: "K\u207A (mmol/L, t\xF9y ch\u1ECDn)" }), a.jsx("input", { type: "number", step: "0.1", value: o ?? "", placeholder: "4.0", onChange: (Y) => E({ k: Y.target.value ? parseFloat(Y.target.value) : void 0 }), className: "w-full px-2.5 py-1 text-xs font-semibold rounded-md border border-slate-300 bg-white focus:ring-2 focus:ring-indigo-500" })] }), a.jsxs("div", { children: [a.jsx("label", { className: "text-[10px] font-bold text-slate-600 block mb-0.5", children: "Albumin (g/dL ho\u1EB7c g/L)" }), a.jsx("input", { type: "number", step: "0.1", value: G ?? "", placeholder: "4.0 (g/dL)", onChange: (Y) => E({ albumin: Y.target.value ? parseFloat(Y.target.value) : void 0 }), className: "w-full px-2.5 py-1 text-xs font-semibold rounded-md border border-slate-300 bg-white focus:ring-2 focus:ring-indigo-500" })] })] })] }), a.jsx("div", { className: "p-4 space-y-4", children: P ? a.jsxs(a.Fragment, { children: [a.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: [a.jsxs("div", { className: `p-3 rounded-xl border transition-all ${gt ? "bg-rose-50/80 border-rose-300 text-rose-950" : C ? "bg-amber-50/80 border-amber-300 text-amber-950" : "bg-slate-50 border-slate-200 text-slate-900"}`, children: [a.jsxs("div", { className: "flex items-center justify-between", children: [a.jsx("span", { className: "text-[11px] font-bold uppercase tracking-wider text-slate-500", children: "Anion Gap (AG)" }), a.jsx("span", { className: `px-1.5 py-0.2 rounded text-[10px] font-bold ${gt ? "bg-rose-600 text-white" : C ? "bg-amber-600 text-white" : "bg-emerald-100 text-emerald-800"}`, children: gt ? "T\u0102NG CAO" : C ? "GI\u1EA2M" : "B\xCCNH TH\u01AF\u1EDCNG" })] }), a.jsxs("div", { className: "text-xl font-extrabold mt-1", children: [y, " ", a.jsx("span", { className: "text-xs font-normal text-slate-500", children: "mmol/L" })] }), a.jsxs("div", { className: "text-[10px] text-slate-500 mt-0.5", children: ["Chu\u1EA9n: 8 - 16 (TB: 12)", j !== void 0 && a.jsxs("span", { className: "block text-slate-600", children: ["C\xF3 K\u207A: ", a.jsx("strong", { children: j }), " (Chu\u1EA9n: 10-18)"] })] })] }), a.jsxs("div", { className: "p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900", children: [a.jsxs("div", { className: "flex items-center justify-between", children: [a.jsx("span", { className: "text-[11px] font-bold uppercase tracking-wider text-slate-500", children: "AG Hi\u1EC7u Ch\u1EC9nh Albumin" }), T !== void 0 && a.jsx("span", { className: "text-[10px] font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.2 rounded", children: "Hi\u1EC7u ch\u1EC9nh" })] }), a.jsx("div", { className: "text-xl font-extrabold mt-1", children: T !== void 0 ? a.jsxs(a.Fragment, { children: [T, " ", a.jsx("span", { className: "text-xs font-normal text-slate-500", children: "mmol/L" })] }) : a.jsx("span", { className: "text-xs font-semibold text-slate-400", children: "C\u1EA7n nh\u1EADp Albumin" }) }), a.jsx("div", { className: "text-[10px] text-slate-500 mt-0.5", children: T !== void 0 ? `Albumin: ${G} ${G > 10 ? "g/L" : "g/dL"}` : "M\u1ED7i gi\u1EA3m 1 g/dL Albumin l\xE0m gi\u1EA3m AG gi\u1EA3 t\u1EA1o ~2.5 mmol/L" })] }), a.jsxs("div", { className: "p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900", children: [a.jsxs("div", { className: "flex items-center justify-between", children: [a.jsx("span", { className: "text-[11px] font-bold uppercase tracking-wider text-slate-500", children: "Delta AG (\u0394AG)" }), a.jsx("span", { className: "text-[10px] text-slate-500", children: "AG - 12" })] }), a.jsx("div", { className: "text-xl font-extrabold mt-1", children: nt !== void 0 ? a.jsxs(a.Fragment, { children: [nt > 0 ? `+${nt}` : nt, " ", a.jsx("span", { className: "text-xs font-normal text-slate-500", children: "mmol/L" })] }) : "--" }), a.jsx("div", { className: "text-[10px] text-slate-500 mt-0.5", children: "L\u01B0\u1EE3ng acid kh\xF4ng \u0111o \u0111\u01B0\u1EE3c t\xEDch t\u1EE5 v\u01B0\u1EE3t m\u1EE9c sinh l\xFD" })] }), a.jsxs("div", { className: `p-3 rounded-xl border transition-all ${B !== void 0 ? "bg-gradient-to-br from-indigo-50/80 to-blue-50/60 border-indigo-300 text-indigo-950" : "bg-slate-50 border-slate-200 text-slate-900"}`, children: [a.jsxs("div", { className: "flex items-center justify-between", children: [a.jsx("span", { className: "text-[11px] font-bold uppercase tracking-wider text-indigo-800", children: "T\u1EF7 S\u1ED1 Delta / Delta" }), a.jsx("span", { className: "text-[10px] font-bold text-indigo-600", children: "\u0394AG / \u0394HCO\u2083\u207B" })] }), a.jsx("div", { className: "text-xl font-extrabold mt-1", children: B !== void 0 ? B : a.jsx("span", { className: "text-xs font-semibold text-slate-400", children: g >= 24 ? "HCO3- \u2265 24 (Kh\xF4ng toan)" : "C\u1EA7n t\xEDnh" }) }), a.jsx("div", { className: "text-[10px] text-slate-500 mt-0.5", children: tt !== void 0 ? `HCO\u2083\u207B ban \u0111\u1EA7u \u01B0\u1EDBc t\xEDnh: ~${tt} mmol/L` : "Chu\u1EA9n 1:1 trong HAGMA \u0111\u01A1n thu\u1EA7n" })] })] }), L && a.jsxs("div", { className: `p-4 rounded-xl border ${L.colorClass} space-y-3 shadow-2xs`, children: [a.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-1.5", children: [a.jsxs("div", { className: "flex items-center space-x-2", children: [a.jsx(Pe, { className: "w-4 h-4 text-indigo-600 shrink-0" }), a.jsx("strong", { className: "text-sm font-bold", children: L.title })] }), a.jsxs("span", { className: `px-2 py-0.5 rounded-full text-xs font-bold border self-start sm:self-auto ${L.badgeBg}`, children: ["T\u1EF7 s\u1ED1 = ", B] })] }), a.jsxs("div", { className: "space-y-1", children: [a.jsxs("div", { className: "flex justify-between text-[10px] font-semibold text-slate-600", children: [a.jsx("span", { children: "< 0.4 (NAGMA)" }), a.jsx("span", { children: "0.4 - 0.8 (H\u1ED7n h\u1EE3p)" }), a.jsx("span", { children: "0.8 - 2.0 (HAGMA \u0110\u01A1n thu\u1EA7n)" }), a.jsx("span", { children: "> 2.0 (K\xE8m Ki\u1EC1m CH)" })] }), a.jsxs("div", { className: "w-full h-3 rounded-full bg-slate-200 overflow-hidden flex relative", children: [a.jsx("div", { className: "h-full bg-amber-400", style: { width: "20%" }, title: "< 0.4: NAGMA" }), a.jsx("div", { className: "h-full bg-rose-400", style: { width: "20%" }, title: "0.4 - 0.8: H\u1ED7n h\u1EE3p HAGMA + NAGMA" }), a.jsx("div", { className: "h-full bg-indigo-500", style: { width: "35%" }, title: "0.8 - 2.0: HAGMA thu\u1EA7n t\xFAy" }), a.jsx("div", { className: "h-full bg-purple-500", style: { width: "25%" }, title: "> 2.0: K\xE8m Ki\u1EC1m chuy\u1EC3n h\xF3a" }), B !== void 0 && a.jsx("div", { className: "absolute top-0 bottom-0 w-2.5 bg-slate-900 border-2 border-white rounded-full shadow-md -ml-1 transition-all", style: { left: `${Math.min(Math.max(B < 0.4 ? B / 0.4 * 20 : B < 0.8 ? 20 + (B - 0.4) / 0.4 * 20 : B <= 2 ? 40 + (B - 0.8) / 1.2 * 35 : 75 + Math.min((B - 2) / 2, 1) * 25, 2), 98)}%` } })] })] }), a.jsx("p", { className: "text-xs text-slate-800 leading-relaxed font-medium", children: L.description }), a.jsxs("div", { className: "pt-2 border-t border-slate-200/80", children: [a.jsx("span", { className: "text-[11px] font-bold text-slate-900 block mb-1", children: "C\xE1c nguy\xEAn nh\xE2n l\xE2m s\xE0ng \u0111i\u1EC3n h\xECnh:" }), a.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-700", children: L.clinicalExamples.map((Y, Ct) => a.jsxs("div", { className: "flex items-center space-x-1.5", children: [a.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0" }), a.jsx("span", { children: Y })] }, Ct)) })] })] }), tt !== void 0 && a.jsxs("div", { className: "p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1", children: [a.jsxs("div", { className: "flex items-center justify-between font-bold text-slate-900", children: [a.jsx("span", { children: "D\u1EF1 \u0111o\xE1n Bicarbonate ban \u0111\u1EA7u ([HCO\u2083\u207B] + \u0394AG):" }), a.jsxs("span", { className: `px-2 py-0.5 rounded text-xs ${tt > 26 ? "bg-purple-100 text-purple-900" : tt < 22 ? "bg-amber-100 text-amber-900" : "bg-emerald-100 text-emerald-900"}`, children: [tt, " mmol/L"] })] }), a.jsx("p", { className: "text-[11px] text-slate-600", children: tt > 26 ? a.jsx("strong", { className: "text-purple-900", children: "* C\u1EA3nh b\xE1o: [HCO\u2083\u207B] \u01B0\u1EDBc t\xEDnh tr\u01B0\u1EDBc toan > 26 mmol/L ch\u1EE9ng t\u1ECF b\u1EC7nh nh\xE2n c\xF3 m\u1ED9t t\xECnh tr\u1EA1ng KI\u1EC0M CHUY\u1EC2N H\xD3A ti\u1EC1m \u1EA9n ch\u1EA1y song song (do n\xF4n m\u1EEDa, d\xF9ng l\u1EE3i ti\u1EC3u, ho\u1EB7c ki\u1EC1m b\xF9 c\u1EE7a toan h\xF4 h\u1EA5p m\u1EA1n)." }) : tt < 22 ? a.jsx("strong", { className: "text-amber-900", children: "* C\u1EA3nh b\xE1o: [HCO\u2083\u207B] \u01B0\u1EDBc t\xEDnh tr\u01B0\u1EDBc toan < 22 mmol/L ch\u1EE9ng t\u1ECF c\xF3 m\u1ED9t t\xECnh tr\u1EA1ng TOAN CHUY\u1EC2N H\xD3A B\xCCNH TH\u01AF\u1EDCNG AG (NAGMA) ch\u1EA1y song song (do m\u1EA5t th\xEAm bicarbonate)." }) : a.jsx("span", { children: "* [HCO\u2083\u207B] \u01B0\u1EDBc t\xEDnh n\u1EB1m trong d\u1EA3i sinh l\xFD 22 - 26 mmol/L: Ph\xF9 h\u1EE3p v\u1EDBi toan chuy\u1EC3n h\xF3a t\u0103ng Anion Gap \u0111\u01A1n thu\u1EA7n, kh\xF4ng c\xF3 r\u1ED1i lo\u1EA1n toan ki\u1EC1m chuy\u1EC3n h\xF3a th\u1EE9 2 \u1EA9n gi\u1EA5u." }) })] }), a.jsxs("div", { className: "pt-1", children: [a.jsxs("button", { type: "button", onClick: () => Z(!R), className: "flex items-center space-x-1.5 text-xs font-bold text-indigo-700 hover:text-indigo-900 cursor-pointer", children: [R ? a.jsx(Ql, { className: "w-3.5 h-3.5" }) : a.jsx(Xl, { className: "w-3.5 h-3.5" }), a.jsx("span", { children: "Chi ti\u1EBFt c\xE1c c\xF4ng th\u1EE9c to\xE1n h\u1ECDc & y v\u0103n chu\u1EA9n" })] }), R && a.jsxs("div", { className: "mt-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-700 space-y-2 font-mono", children: [a.jsxs("div", { children: [a.jsx("strong", { children: "1. Anion Gap ti\xEAu chu\u1EA9n:" }), " AG = Na\u207A - (Cl\u207B + HCO\u2083\u207B) = ", u, " - (", O, " + ", g, ") = ", a.jsx("strong", { children: y }), " mmol/L (Tham chi\u1EBFu: 8 - 16 mmol/L)"] }), a.jsxs("div", { children: [a.jsx("strong", { children: "2. Anion Gap t\xEDnh c\u1EA3 Kali:" }), " AG(K) = (Na\u207A + K\u207A) - (Cl\u207B + HCO\u2083\u207B) = (", u, " + ", o || 0, ") - (", O, " + ", g, ") = ", a.jsx("strong", { children: j ?? "--" }), " mmol/L (Tham chi\u1EBFu: 10 - 18 mmol/L)"] }), a.jsxs("div", { children: [a.jsx("strong", { children: "3. Anion Gap hi\u1EC7u ch\u1EC9nh Albumin:" }), " AG(corr) = AG + 2.5 \xD7 [4.0 - Albumin(g/dL)] = ", a.jsx("strong", { children: T ?? y }), " mmol/L"] }), a.jsxs("div", { children: [a.jsx("strong", { children: "4. Delta AG:" }), " \u0394AG = AG(corr) - 12 = ", U, " - 12 = ", a.jsx("strong", { children: nt }), " mmol/L"] }), a.jsxs("div", { children: [a.jsx("strong", { children: "5. Delta HCO\u2083\u207B:" }), " \u0394HCO\u2083\u207B = 24 - [HCO\u2083\u207B] = 24 - ", g, " = ", a.jsx("strong", { children: ht }), " mmol/L"] }), a.jsxs("div", { children: [a.jsx("strong", { children: "6. T\u1EF7 s\u1ED1 Delta (\u0394/\u0394):" }), " \u0394AG / \u0394HCO\u2083\u207B = (", U, " - 12) / (24 - ", g, ") = ", a.jsx("strong", { children: B ?? "--" })] })] })] })] }) : a.jsxs("div", { className: "p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-start space-x-2.5", children: [a.jsx(Vl, { className: "w-5 h-5 text-amber-600 shrink-0 mt-0.5" }), a.jsxs("div", { children: [a.jsx("strong", { className: "font-bold block", children: "Ch\u01B0a \u0111\u1EE7 d\u1EEF li\u1EC7u \u0111i\u1EC7n gi\u1EA3i \u0111\u1EC3 t\xEDnh to\xE1n Anion Gap:" }), a.jsxs("span", { children: ["Vui l\xF2ng nh\u1EADp th\xEAm ch\u1EC9 s\u1ED1 ", a.jsx("strong", { children: "Na\u207A" }), " v\xE0 ", a.jsx("strong", { children: "Cl\u207B" }), ' trong b\u1EA3ng Th\xF4ng S\u1ED1 Kh\xED M\xE1u (ho\u1EB7c b\u1EA5m n\xFAt "Nh\u1EADp nhanh" \u1EDF tr\xEAn) \u0111\u1EC3 h\u1EC7 th\u1ED1ng t\u1EF1 \u0111\u1ED9ng k\xEDch ho\u1EA1t b\u1ED9 t\xEDnh to\xE1n Anion Gap v\xE0 t\u1EF7 s\u1ED1 Delta.'] })] })] }) })] });
  };
  var dm = { unit: "mmHg", pH: 7.4, pCO2: 40, pO2: 95, hco3: 24, be: 0, sao2: 98, fio2: 21, na: 140, k: 4, cl: 100, lactate: 1, glucose: 5, albumin: 4, patientAge: 45 };
  var Jx = [{ name: "B\xECnh th\u01B0\u1EDDng (Normal)", desc: "Ng\u01B0\u1EDDi kh\u1ECFe m\u1EA1nh th\u1EDF kh\xED tr\u1EDDi", category: "Chu\u1EA9n", data: { unit: "mmHg", pH: 7.4, pCO2: 40, pO2: 95, hco3: 24, be: 0, sao2: 98, fio2: 21, na: 140, k: 4, cl: 100, lactate: 1, glucose: 5, albumin: 4, patientAge: 30 } }, { name: "Vi\xEAm ph\u1ED5i th\xF9y (Type 1)", desc: "Suy h\xF4 h\u1EA5p Type 1, ki\u1EC1m h\xF4 h\u1EA5p c\u1EA5p do th\u1EDF nhanh", category: "Suy h\xF4 h\u1EA5p", data: { unit: "mmHg", pH: 7.5, pCO2: 28.1, pO2: 57.8, hco3: 23.9, be: -0.5, sao2: 88.7, fio2: 21, na: 138, k: 3.7, cl: 99, lactate: 1.2, glucose: 5.4, albumin: 3.8, patientAge: 25 } }, { name: "Ng\u1ED9 \u0111\u1ED9c Morphin (Type 2 C\u1EA5p)", desc: "\u1EE8c ch\u1EBF h\xF4 h\u1EA5p c\u1EA5p sau m\u1ED5, toan h\xF4 h\u1EA5p ch\u01B0a b\xF9", category: "C\u1EA5p c\u1EE9u", data: { unit: "mmHg", pH: 7.18, pCO2: 62, pO2: 50, hco3: 23, be: -5, sao2: 81, fio2: 21, na: 140, k: 4.2, cl: 101, lactate: 1.5, glucose: 5.2, albumin: 4, patientAge: 42 } }, { name: "\u0110\u1EE3t c\u1EA5p COPD (Type 2 M\u1EA1n)", desc: "Suy h\xF4 h\u1EA5p Type 2 tr\xEAn n\u1EC1n m\u1EA1n, th\u1EADn b\xF9 tr\u1EEB gi\u1EEF HCO3-", category: "H\xF4 h\u1EA5p", data: { unit: "mmHg", pH: 7.37, pCO2: 64, pO2: 58, hco3: 36.5, be: 8.9, sao2: 88, fio2: 21, na: 139, k: 4, cl: 102, lactate: 1.2, glucose: 5, albumin: 3.6, patientAge: 68 } }, { name: "DKA Nhi\u1EC5m toan Ceton \u0110T\u0110", desc: "Toan chuy\u1EC3n h\xF3a t\u0103ng Anion Gap c\u1EF1c n\u1EB7ng, th\u1EDF Kussmaul", category: "N\u1ED9i ti\u1EBFt", data: { unit: "mmHg", pH: 7.05, pCO2: 11, pO2: 187, hco3: 6, be: -25.2, sao2: 99.8, fio2: 60, na: 141, k: 4.6, cl: 96, lactate: 1, glucose: 35, albumin: 4.2, patientAge: 35 } }, { name: "S\u1ED1c nhi\u1EC5m khu\u1EA9n (Toan Lactic)", desc: "Gi\u1EA3m t\u01B0\u1EDBi m\xE1u m\xF4 s\xE2u, Lactate 5.1 mmol/L", category: "H\u1ED3i s\u1EE9c", data: { unit: "mmHg", pH: 7.36, pCO2: 31.5, pO2: 203, hco3: 17.3, be: -6.9, sao2: 100, fio2: 60, na: 140, k: 4.1, cl: 101, lactate: 5.1, glucose: 6.8, albumin: 2.8, patientAge: 64 } }, { name: "Ng\u1ED9 \u0111\u1ED9c Aspirin (Salicylate)", desc: "R\u1ED1i lo\u1EA1n h\u1ED7n h\u1EE3p: Ki\u1EC1m h\xF4 h\u1EA5p + Toan chuy\u1EC3n h\xF3a t\u0103ng AG", category: "Ng\u1ED9 \u0111\u1ED9c", data: { unit: "mmHg", pH: 7.41, pCO2: 22.6, pO2: 97.5, hco3: 17.6, be: -8.3, sao2: 99, fio2: 21, na: 140, k: 3.6, cl: 99, lactate: 1.4, glucose: 5, albumin: 4, patientAge: 18 } }, { name: "N\xF4n \xF3i li\xEAn t\u1EE5c (Ki\u1EC1m chuy\u1EC3n h\xF3a)", desc: "M\u1EA5t acid HCl d\u1ECBch v\u1ECB, h\u1EA1 Clo v\xE0 Kali m\xE1u", category: "Chuy\u1EC3n h\xF3a", data: { unit: "mmHg", pH: 7.44, pCO2: 48, pO2: 83, hco3: 32, be: 4, sao2: 96, fio2: 21, na: 133, k: 3, cl: 91, lactate: 1, glucose: 5, albumin: 4, patientAge: 35 } }, { name: "Toan h\xF3a \u1ED1ng th\u1EADn Type 1 (RTA)", desc: "Toan chuy\u1EC3n h\xF3a kho\u1EA3ng tr\u1ED1ng Anion b\xECnh th\u01B0\u1EDDng (NAGMA)", category: "Th\u1EADn", data: { unit: "mmHg", pH: 7.37, pCO2: 31.5, pO2: 99, hco3: 18, be: -7, sao2: 99, fio2: 21, na: 137, k: 3, cl: 109, lactate: 1, glucose: 4, albumin: 4, patientAge: 52 } }];
  var $x = ({ initialInput: u, onInputChange: O }) => {
    const [g, o] = Q.useState(u || dm), [G, E] = Q.useState("core"), [R, Z] = Q.useState(false);
    Uh.useEffect(() => {
      u && o(u);
    }, [u]), Uh.useEffect(() => {
      O && O(g);
    }, [g, O]);
    const D = (j) => {
      j !== g.unit && o((T) => {
        const U = j === "kPa" ? Fh : js;
        return { ...T, unit: j, pCO2: Math.round(T.pCO2 * U * 10) / 10, pO2: Math.round(T.pO2 * U * 10) / 10 };
      });
    }, H = (j) => {
      o((T) => ({ ...T, fio2: j }));
    }, p = Q.useMemo(() => vm(g), [g]), _ = (j) => {
      o((T) => ({ ...T, ...j }));
    }, P = () => {
      const j = `=== B\xC1O C\xC1O PH\xC2N T\xCDCH KH\xCD M\xC1U \u0110\u1ED8NG M\u1EA0CH (ABG PRO) ===
Th\xF4ng s\u1ED1: pH ${g.pH} | PaCO2 ${g.pCO2} ${g.unit} | PaO2 ${g.pO2} ${g.unit} | HCO3- ${g.hco3} mmol/L | BE ${g.be} mmol/L | SaO2 ${g.sao2}% | FiO2 ${g.fio2}%
1. TRAO \u0110\u1ED4I KH\xCD PH\u1ED4I: ${p.gasExchange.title} (${p.gasExchange.description})
2. TH\u0102NG B\u1EB0NG TOAN KI\u1EC0M: ${p.acidBase.title} (${p.acidBase.description})
3. C\xC1C CH\u1EC8 S\u1ED0 CHUY\xCAN S\xC2U:
   - N\u1ED3ng \u0111\u1ED9 H+: ${p.calculations.hIonNmol} nmol/L
   - T\u1EC9 l\u1EC7 PaO2/FiO2: ${p.calculations.pfRatio} (${p.calculations.pfClass})
   - Ph\xE2n \xE1p oxy ph\u1EBF nang PAO2: ${p.calculations.pao2Alveolar} mmHg
   - Ch\xEAnh l\u1EC7ch ph\u1EBF nang - mao m\u1EA1ch (A-a gradient): ${p.calculations.aaGradient} mmHg (K\u1EF3 v\u1ECDng: ~${p.calculations.expectedAaGradient} mmHg)
   ${p.calculations.anionGap !== void 0 ? `- Kho\u1EA3ng tr\u1ED1ng Anion (Anion Gap): ${p.calculations.anionGap} mmol/L (${p.calculations.isAnionGapHigh ? "T\u0102NG" : "B\xCCNH TH\u01AF\u1EDCNG"})` : ""}
   ${p.calculations.deltaRatio !== void 0 ? `- T\u1EF7 s\u1ED1 Delta (\u0394AG/\u0394HCO3): ${p.calculations.deltaRatio} (${p.calculations.deltaRatioInterpretation})` : ""}
4. KHUY\u1EBEN C\xC1O X\u1EEC TR\xCD L\xC2M S\xC0NG:
   - Li\u1EC7u ph\xE1p Oxy: ${p.treatmentProtocols.oxygenTherapy}
   - H\u1ED7 tr\u1EE3 th\xF4ng kh\xED: ${p.treatmentProtocols.ventilationSupport}
   - Bi\u1EC7n ph\xE1p c\u1ED1t l\xF5i: ${p.treatmentProtocols.underlyingManagement.join("; ")}
   - Gi\xE1m s\xE1t: ${p.treatmentProtocols.monitoringAdvice}
(Ngu\u1ED3n: Arterial Blood Gases Made Easy 2nd Ed & ABG Interpretation A case study approach)`;
      navigator.clipboard.writeText(j), Z(true), setTimeout(() => Z(false), 2e3);
    }, y = (j) => {
      const T = document.getElementById(j);
      T && T.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    return a.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-5", children: [a.jsxs("div", { className: "bg-white rounded-xl border border-slate-200 p-3 shadow-2xs", children: [a.jsxs("div", { className: "flex items-center justify-between mb-1.5", children: [a.jsxs("div", { className: "flex items-center space-x-1.5 text-xs font-bold text-slate-800", children: [a.jsx(Pe, { className: "w-3.5 h-3.5 text-blue-600" }), a.jsx("span", { children: "Ca b\u1EC7nh m\u1EABu kinh \u0111i\u1EC3n (N\u1EA1p nhanh):" })] }), a.jsx("span", { className: "text-[11px] text-slate-400 hidden sm:inline", children: "Ch\u1ECDn \u0111\u1EC3 n\u1EA1p t\u1EE9c th\xEC s\u1ED1 li\u1EC7u ca b\u1EC7nh" })] }), a.jsx("div", { className: "flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin", children: Jx.map((j, T) => a.jsx("button", { onClick: () => o(j.data), className: "px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-50 text-slate-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 border border-slate-200 transition-all whitespace-nowrap text-left cursor-pointer", title: j.desc, children: a.jsx("span", { className: "font-semibold", children: j.name }) }, T)) })] }), a.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-5 items-start", children: [a.jsx("div", { className: "lg:col-span-4 space-y-3", children: a.jsxs("div", { className: "bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3 sticky top-3", children: [a.jsxs("div", { className: "flex items-center justify-between pb-2 border-b border-slate-100", children: [a.jsxs("div", { className: "flex items-center space-x-2", children: [a.jsx(bs, { className: "w-4 h-4 text-rose-500" }), a.jsx("h2", { className: "text-sm font-bold text-slate-900", children: "Th\xF4ng S\u1ED1 Kh\xED M\xE1u" })] }), a.jsx("div", { className: "flex items-center space-x-1.5", children: a.jsxs("div", { className: "flex items-center bg-slate-100 p-0.5 rounded-md border border-slate-200", children: [a.jsx("button", { type: "button", onClick: () => D("mmHg"), className: `px-1.5 py-0.5 text-[10px] font-bold rounded ${g.unit === "mmHg" ? "bg-blue-600 text-white shadow-2xs" : "text-slate-600 hover:text-slate-900"}`, children: "mmHg" }), a.jsx("button", { type: "button", onClick: () => D("kPa"), className: `px-1.5 py-0.5 text-[10px] font-bold rounded ${g.unit === "kPa" ? "bg-blue-600 text-white shadow-2xs" : "text-slate-600 hover:text-slate-900"}`, children: "kPa" })] }) })] }), a.jsxs("div", { className: "flex items-center space-x-1 bg-slate-100 p-1 rounded-xl", children: [a.jsx("button", { type: "button", onClick: () => E("core"), className: `flex-1 py-1 text-center text-xs font-bold rounded-lg transition-all cursor-pointer ${G === "core" ? "bg-white text-blue-700 shadow-2xs" : "text-slate-600 hover:text-slate-900"}`, children: "Kh\xED M\xE1u (Core)" }), a.jsxs("button", { type: "button", onClick: () => E("labs"), className: `flex-1 py-1 text-center text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center space-x-1 ${G === "labs" ? "bg-white text-indigo-700 shadow-2xs" : "text-slate-600 hover:text-slate-900"}`, children: [a.jsx("span", { children: "\u0110i\u1EC7n Gi\u1EA3i & Labs" }), a.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-indigo-600" })] })] }), G === "core" && a.jsxs("div", { className: "space-y-2.5", children: [a.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [a.jsxs("div", { className: "space-y-0.5", children: [a.jsxs("div", { className: "flex justify-between items-center text-[11px] font-semibold text-slate-700", children: [a.jsx("span", { children: "pH M\xE1u" }), a.jsx("span", { className: "text-[10px] text-slate-400", children: "7.35-7.45" })] }), a.jsx("input", { id: "input-ph", type: "number", step: "0.01", min: "6.5", max: "8.0", value: g.pH, onChange: (j) => o({ ...g, pH: parseFloat(j.target.value) || 7.4 }), className: "w-full px-2.5 py-1.5 text-xs font-bold rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-slate-50/50" }), a.jsxs("span", { className: "text-[9px] text-slate-500 block", children: ["[H\u207A]: ~", p.calculations.hIonNmol, " nmol/L"] })] }), a.jsxs("div", { className: "space-y-0.5", children: [a.jsxs("div", { className: "flex justify-between items-center text-[11px] font-semibold text-slate-700", children: [a.jsxs("span", { children: ["PaCO\u2082 (", g.unit, ")"] }), a.jsx("span", { className: "text-[10px] text-slate-400", children: g.unit === "mmHg" ? "35-45" : "4.7-6.0" })] }), a.jsx("input", { id: "input-paco2", type: "number", step: g.unit === "kPa" ? "0.1" : "1", value: g.pCO2, onChange: (j) => o({ ...g, pCO2: parseFloat(j.target.value) || 0 }), className: "w-full px-2.5 py-1.5 text-xs font-bold rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-slate-50/50" }), a.jsx("span", { className: "text-[9px] text-slate-500 block", children: g.unit === "mmHg" ? `${p.calculations.paco2Kpa} kPa` : `${p.calculations.paco2MmHg} mmHg` })] }), a.jsxs("div", { className: "space-y-0.5", children: [a.jsxs("div", { className: "flex justify-between items-center text-[11px] font-semibold text-slate-700", children: [a.jsxs("span", { children: ["PaO\u2082 (", g.unit, ")"] }), a.jsx("span", { className: "text-[10px] text-slate-400", children: g.unit === "mmHg" ? "&gt;80" : "&gt;10.6" })] }), a.jsx("input", { id: "input-pao2", type: "number", step: g.unit === "kPa" ? "0.1" : "1", value: g.pO2, onChange: (j) => o({ ...g, pO2: parseFloat(j.target.value) || 0 }), className: "w-full px-2.5 py-1.5 text-xs font-bold rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-slate-50/50" }), a.jsx("span", { className: "text-[9px] text-slate-500 block", children: g.unit === "mmHg" ? `${p.calculations.pao2Kpa} kPa` : `${p.calculations.pao2MmHg} mmHg` })] }), a.jsxs("div", { className: "space-y-0.5", children: [a.jsxs("div", { className: "flex justify-between items-center text-[11px] font-semibold text-slate-700", children: [a.jsx("span", { children: "HCO\u2083\u207B (mmol/L)" }), a.jsx("span", { className: "text-[10px] text-slate-400", children: "22-26" })] }), a.jsx("input", { id: "input-hco3", type: "number", step: "0.5", value: g.hco3, onChange: (j) => o({ ...g, hco3: parseFloat(j.target.value) || 0 }), className: "w-full px-2.5 py-1.5 text-xs font-bold rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-slate-50/50" }), a.jsx("span", { className: "text-[9px] text-slate-500 block", children: "Standard Bicarbonate" })] }), a.jsxs("div", { className: "space-y-0.5", children: [a.jsxs("div", { className: "flex justify-between items-center text-[11px] font-semibold text-slate-700", children: [a.jsx("span", { children: "Base Excess (BE)" }), a.jsx("span", { className: "text-[10px] text-slate-400", children: "-2 \u0111\u1EBFn +2" })] }), a.jsx("input", { id: "input-be", type: "number", step: "0.5", value: g.be, onChange: (j) => o({ ...g, be: parseFloat(j.target.value) || 0 }), className: "w-full px-2.5 py-1.5 text-xs font-bold rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-slate-50/50" }), a.jsx("span", { className: "text-[9px] text-slate-500 block", children: "Ki\u1EC1m d\u01B0 / Thi\u1EBFu h\u1EE5t" })] }), a.jsxs("div", { className: "space-y-0.5", children: [a.jsxs("div", { className: "flex justify-between items-center text-[11px] font-semibold text-slate-700", children: [a.jsx("span", { children: "SaO\u2082 (%)" }), a.jsx("span", { className: "text-[10px] text-slate-400", children: ">95%" })] }), a.jsx("input", { id: "input-sao2", type: "number", min: "0", max: "100", value: g.sao2, onChange: (j) => o({ ...g, sao2: parseFloat(j.target.value) || 0 }), className: "w-full px-2.5 py-1.5 text-xs font-bold rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-slate-50/50" }), a.jsx("span", { className: "text-[9px] text-slate-500 block", children: "\u0110\u1ED9 b\xE3o h\xF2a Oxy" })] })] }), a.jsxs("div", { className: "pt-2 border-t border-slate-100 space-y-1", children: [a.jsxs("div", { className: "flex items-center justify-between text-[11px] font-semibold text-slate-700", children: [a.jsx("span", { children: "Ph\xE2n su\u1EA5t Oxy FiO\u2082 (%)" }), a.jsxs("strong", { className: "text-blue-600", children: [g.fio2, "%"] })] }), a.jsxs("div", { className: "flex items-center space-x-1.5", children: [a.jsx("input", { id: "input-fio2", type: "number", min: "21", max: "100", value: g.fio2, onChange: (j) => o({ ...g, fio2: parseFloat(j.target.value) || 21 }), className: "w-16 px-2 py-1 text-xs font-bold text-center rounded-lg border border-slate-300 bg-slate-50/50" }), a.jsxs("select", { "aria-label": "Ch\u1ECDn thi\u1EBFt b\u1ECB th\u1EDF oxy", value: g.fio2, onChange: (j) => H(parseFloat(j.target.value)), className: "flex-1 px-2 py-1 text-[11px] rounded-lg border border-slate-300 bg-white", children: [a.jsx("option", { value: 21, children: "Kh\xED tr\u1EDDi (21%)" }), a.jsx("option", { value: 24, children: "G\u1ECDng m\u0169i 1 L/p (24%)" }), a.jsx("option", { value: 28, children: "G\u1ECDng m\u0169i 2 L/p / Venturi 28%" }), a.jsx("option", { value: 32, children: "G\u1ECDng m\u0169i 3 L/p (32%)" }), a.jsx("option", { value: 40, children: "Mask 5-6 L/p (40%)" }), a.jsx("option", { value: 60, children: "Mask 8-10 L/p (60%)" }), a.jsx("option", { value: 80, children: "Mask t\xFAi c\xF3 th\u1EDF l\u1EA1i (80%)" }), a.jsx("option", { value: 100, children: "Th\u1EDF m\xE1y 100% / Mask k\xEDn (100%)" })] })] })] })] }), G === "labs" && a.jsxs("div", { className: "space-y-2 animate-in fade-in duration-150", children: [a.jsx("div", { className: "p-2 rounded-lg bg-indigo-50/70 border border-indigo-100 text-[10px] text-indigo-900 leading-tight", children: "* Nh\u1EADp Na\u207A v\xE0 Cl\u207B \u0111\u1EC3 t\u1EF1 \u0111\u1ED9ng t\xEDnh Anion Gap v\xE0 T\u1EF7 s\u1ED1 Delta/Delta \u1EDF b\u1EA3ng b\xEAn ph\u1EA3i." }), a.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [a.jsxs("div", { className: "space-y-0.5", children: [a.jsxs("div", { className: "flex justify-between items-center text-[11px] font-semibold text-slate-700", children: [a.jsx("span", { children: "Na\u207A (mmol/L)" }), a.jsx("span", { className: "text-[10px] text-slate-400", children: "135-145" })] }), a.jsx("input", { id: "input-na", type: "number", value: g.na ?? "", placeholder: "140", onChange: (j) => o({ ...g, na: j.target.value ? parseFloat(j.target.value) : void 0 }), className: "w-full px-2.5 py-1.5 text-xs font-bold rounded-lg border border-slate-300 bg-slate-50/50" })] }), a.jsxs("div", { className: "space-y-0.5", children: [a.jsxs("div", { className: "flex justify-between items-center text-[11px] font-semibold text-slate-700", children: [a.jsx("span", { children: "Cl\u207B (mmol/L)" }), a.jsx("span", { className: "text-[10px] text-slate-400", children: "98-106" })] }), a.jsx("input", { id: "input-cl", type: "number", value: g.cl ?? "", placeholder: "100", onChange: (j) => o({ ...g, cl: j.target.value ? parseFloat(j.target.value) : void 0 }), className: "w-full px-2.5 py-1.5 text-xs font-bold rounded-lg border border-slate-300 bg-slate-50/50" })] }), a.jsxs("div", { className: "space-y-0.5", children: [a.jsxs("div", { className: "flex justify-between items-center text-[11px] font-semibold text-slate-700", children: [a.jsx("span", { children: "K\u207A (mmol/L)" }), a.jsx("span", { className: "text-[10px] text-slate-400", children: "3.5-5.0" })] }), a.jsx("input", { id: "input-k", type: "number", step: "0.1", value: g.k ?? "", placeholder: "4.0", onChange: (j) => o({ ...g, k: j.target.value ? parseFloat(j.target.value) : void 0 }), className: "w-full px-2.5 py-1.5 text-xs font-bold rounded-lg border border-slate-300 bg-slate-50/50" })] }), a.jsxs("div", { className: "space-y-0.5", children: [a.jsxs("div", { className: "flex justify-between items-center text-[11px] font-semibold text-slate-700", children: [a.jsx("span", { children: "Albumin (g/dL)" }), a.jsx("span", { className: "text-[10px] text-slate-400", children: "3.5-5.0" })] }), a.jsx("input", { id: "input-albumin", type: "number", step: "0.1", value: g.albumin ?? "", placeholder: "4.0", onChange: (j) => o({ ...g, albumin: j.target.value ? parseFloat(j.target.value) : void 0 }), className: "w-full px-2.5 py-1.5 text-xs font-bold rounded-lg border border-slate-300 bg-slate-50/50" })] }), a.jsxs("div", { className: "space-y-0.5", children: [a.jsxs("div", { className: "flex justify-between items-center text-[11px] font-semibold text-slate-700", children: [a.jsx("span", { children: "Lactate (mmol/L)" }), a.jsx("span", { className: "text-[10px] text-slate-400", children: "< 2.0" })] }), a.jsx("input", { id: "input-lactate", type: "number", step: "0.1", value: g.lactate ?? "", placeholder: "1.0", onChange: (j) => o({ ...g, lactate: j.target.value ? parseFloat(j.target.value) : void 0 }), className: "w-full px-2.5 py-1.5 text-xs font-bold rounded-lg border border-slate-300 bg-slate-50/50" })] }), a.jsxs("div", { className: "space-y-0.5", children: [a.jsxs("div", { className: "flex justify-between items-center text-[11px] font-semibold text-slate-700", children: [a.jsx("span", { children: "Tu\u1ED5i b\u1EC7nh nh\xE2n" }), a.jsx("span", { className: "text-[10px] text-slate-400", children: "T\xEDnh A-a" })] }), a.jsx("input", { id: "input-age", type: "number", value: g.patientAge ?? "", placeholder: "45", onChange: (j) => o({ ...g, patientAge: j.target.value ? parseFloat(j.target.value) : void 0 }), className: "w-full px-2.5 py-1.5 text-xs font-bold rounded-lg border border-slate-300 bg-slate-50/50" })] })] })] }), a.jsx("div", { className: "pt-2 border-t border-slate-100 flex items-center justify-start", children: a.jsxs("button", { type: "button", onClick: () => o(dm), className: "py-1.5 px-2.5 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 flex items-center space-x-1 transition-all cursor-pointer", children: [a.jsx(fs, { className: "w-3 h-3 text-slate-400" }), a.jsx("span", { children: "\u0110\u1EB7t l\u1EA1i chu\u1EA9n" })] }) })] }) }), a.jsxs("div", { className: "lg:col-span-8 space-y-5", children: [a.jsxs("div", { className: "flex items-center justify-between bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs text-xs font-semibold overflow-x-auto", children: [a.jsxs("div", { className: "flex items-center space-x-2 text-slate-600 shrink-0", children: [a.jsx(Gx, { className: "w-3.5 h-3.5 text-blue-600" }), a.jsx("span", { className: "hidden sm:inline", children: "Xem nhanh:" })] }), a.jsxs("div", { className: "flex items-center space-x-1 sm:space-x-2 overflow-x-auto", children: [a.jsx("button", { onClick: () => y("sec-conclusion"), className: "px-2.5 py-1 rounded-lg hover:bg-slate-100 text-slate-700 whitespace-nowrap cursor-pointer text-[11px]", children: "1. K\u1EBFt Lu\u1EADn Kh\xED M\xE1u" }), a.jsx("button", { onClick: () => y("sec-anion-gap"), className: "px-2.5 py-1 rounded-lg hover:bg-indigo-50 text-indigo-700 font-bold whitespace-nowrap cursor-pointer text-[11px]", children: "2. M\xE1y T\xEDnh Anion Gap & Delta" }), a.jsx("button", { onClick: () => y("sec-six-steps"), className: "px-2.5 py-1 rounded-lg hover:bg-slate-100 text-slate-700 whitespace-nowrap cursor-pointer text-[11px]", children: "3. Quy Tr\xECnh 6 B\u01B0\u1EDBc" }), a.jsx("button", { onClick: () => y("sec-treatment"), className: "px-2.5 py-1 rounded-lg hover:bg-blue-50 text-blue-700 font-bold whitespace-nowrap cursor-pointer text-[11px]", children: "4. X\u1EED Tr\xED L\xE2m S\xE0ng" })] })] }), p.criticalWarnings.length > 0 && a.jsxs("div", { className: "bg-rose-50 border border-rose-300 rounded-2xl p-4 shadow-xs space-y-2 animate-pulse", children: [a.jsxs("div", { className: "flex items-center space-x-2 text-rose-800 font-bold text-sm", children: [a.jsx(pn, { className: "w-5 h-5 text-rose-600 shrink-0" }), a.jsx("span", { children: "C\u1EA2NH B\xC1O NGUY K\u1ECACH TR\xCAN KH\xCD M\xC1U:" })] }), a.jsx("ul", { className: "space-y-1 pl-6 list-disc text-xs font-medium text-rose-900", children: p.criticalWarnings.map((j, T) => a.jsx("li", { children: j }, T)) })] }), a.jsxs("div", { id: "sec-conclusion", className: "bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4", children: [a.jsxs("div", { className: "flex items-center justify-between", children: [a.jsxs("div", { className: "flex items-center space-x-2", children: [a.jsx(ha, { className: "w-5 h-5 text-blue-600" }), a.jsx("h3", { className: "text-base font-bold text-slate-900", children: "K\u1EBFt Lu\u1EADn Ch\u1EA9n \u0110o\xE1n Kh\xED M\xE1u" })] }), a.jsx("div", { className: "flex items-center space-x-2", children: a.jsxs("button", { onClick: P, className: "flex items-center space-x-1 text-xs font-semibold text-slate-600 hover:text-blue-600 px-2.5 py-1 bg-slate-100 hover:bg-blue-50 rounded-lg border border-slate-200 transition-all cursor-pointer", children: [R ? a.jsx(Zl, { className: "w-3.5 h-3.5 text-emerald-600" }) : a.jsx(Ns, { className: "w-3.5 h-3.5" }), a.jsx("span", { children: R ? "\u0110\xE3 sao ch\xE9p!" : "Sao ch\xE9p b\xE1o c\xE1o" })] }) })] }), a.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [a.jsxs("div", { className: "p-4 rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50/60 to-indigo-50/40 space-y-2 shadow-2xs", children: [a.jsxs("div", { className: "flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-blue-800", children: [a.jsx(Ja, { className: "w-4 h-4 text-blue-600" }), a.jsx("span", { children: "Tr\u1EE5c 1: Trao \u0110\u1ED5i Kh\xED Ph\u1ED5i" })] }), a.jsx("h4", { className: "text-sm font-bold text-slate-900 leading-snug", children: p.gasExchange.title }), a.jsx("p", { className: "text-xs text-slate-600 leading-relaxed", children: p.gasExchange.description }), a.jsxs("div", { className: "pt-2 flex flex-wrap items-center gap-1.5", children: [a.jsxs("span", { className: "px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800", children: ["P/F = ", p.calculations.pfRatio] }), a.jsxs("span", { className: "px-2 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700", children: ["A-a = ", p.calculations.aaGradient, " mmHg"] }), p.gasExchange.severity !== "normal" && a.jsxs("span", { className: `px-2 py-0.5 rounded-full text-[11px] font-bold ${p.gasExchange.severity === "severe" ? "bg-rose-100 text-rose-800" : "bg-amber-100 text-amber-800"}`, children: ["M\u1EE9c \u0111\u1ED9: ", p.gasExchange.severity.toUpperCase()] })] })] }), a.jsxs("div", { className: "p-4 rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50/60 to-teal-50/40 space-y-2 shadow-2xs", children: [a.jsxs("div", { className: "flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-800", children: [a.jsx(xn, { className: "w-4 h-4 text-emerald-600" }), a.jsx("span", { children: "Tr\u1EE5c 2: Th\u0103ng B\u1EB1ng Toan Ki\u1EC1m" })] }), a.jsx("h4", { className: "text-sm font-bold text-slate-900 leading-snug", children: p.acidBase.title }), a.jsx("p", { className: "text-xs text-slate-600 leading-relaxed", children: p.acidBase.description }), a.jsxs("div", { className: "pt-2 flex flex-wrap items-center gap-1.5", children: [a.jsx("span", { className: `px-2 py-0.5 rounded-full text-[11px] font-bold ${p.acidBase.acidaemiaStatus === "acidaemia" ? "bg-rose-100 text-rose-800" : p.acidBase.acidaemiaStatus === "alkalaemia" ? "bg-purple-100 text-purple-800" : "bg-emerald-100 text-emerald-800"}`, children: p.acidBase.acidaemiaStatus === "acidaemia" ? "Toan m\xE1u (Acidaemia)" : p.acidBase.acidaemiaStatus === "alkalaemia" ? "Ki\u1EC1m m\xE1u (Alkalaemia)" : "pH Sinh l\xFD b\xECnh th\u01B0\u1EDDng" }), a.jsxs("span", { className: "px-2 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700", children: ["B\xF9 tr\u1EEB: ", p.acidBase.compensation] })] })] })] }), a.jsxs("div", { className: "pt-2 border-t border-slate-100", children: [a.jsx("h4", { className: "text-xs font-bold uppercase tracking-wider text-slate-500 mb-2", children: "C\xE1c Ch\u1EC9 S\u1ED1 Sinh L\xFD Chuy\xEAn S\xE2u" }), a.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs", children: [a.jsxs("div", { className: "p-2.5 rounded-lg bg-slate-50 border border-slate-200/80", children: [a.jsx("div", { className: "text-[10px] text-slate-500 font-medium", children: "N\u1ED3ng \u0111\u1ED9 [H\u207A]" }), a.jsxs("div", { className: "text-sm font-bold text-slate-900 mt-0.5", children: [p.calculations.hIonNmol, " ", a.jsx("span", { className: "text-[10px] font-normal text-slate-500", children: "nmol/L" })] }), a.jsx("div", { className: "text-[10px] text-slate-400", children: "Chu\u1EA9n: 35 - 45" })] }), a.jsxs("div", { className: "p-2.5 rounded-lg bg-slate-50 border border-slate-200/80", children: [a.jsx("div", { className: "text-[10px] text-slate-500 font-medium", children: "T\u1EC9 l\u1EC7 PaO\u2082/FiO\u2082" }), a.jsx("div", { className: "text-sm font-bold text-slate-900 mt-0.5", children: p.calculations.pfRatio }), a.jsx("div", { className: "text-[10px] text-slate-500 truncate", title: p.calculations.pfClass, children: p.calculations.pfClass })] }), a.jsxs("div", { className: "p-2.5 rounded-lg bg-slate-50 border border-slate-200/80", children: [a.jsx("div", { className: "text-[10px] text-slate-500 font-medium", children: "A-a Gradient" }), a.jsxs("div", { className: "text-sm font-bold text-slate-900 mt-0.5", children: [p.calculations.aaGradient, " ", a.jsx("span", { className: "text-[10px] font-normal text-slate-500", children: "mmHg" })] }), a.jsxs("div", { className: "text-[10px] text-slate-500", children: ["Tu\u1ED5i d\u1EF1 ki\u1EBFn: ~", p.calculations.expectedAaGradient] })] }), a.jsxs("div", { className: "p-2.5 rounded-lg bg-slate-50 border border-slate-200/80", children: [a.jsx("div", { className: "text-[10px] text-slate-500 font-medium", children: "PaCO\u2082 K\u1EF3 V\u1ECDng (Winter)" }), a.jsx("div", { className: "text-sm font-bold text-slate-900 mt-0.5", children: p.calculations.expectedPaco2Winter ? `${p.calculations.expectedPaco2Winter.min} - ${p.calculations.expectedPaco2Winter.max}` : "N/A" }), a.jsx("div", { className: "text-[10px] text-slate-500", children: p.calculations.expectedPaco2Winter ? "B\xF9 tr\u1EEB toan CH" : "\xC1p d\u1EE5ng toan CH" })] })] })] })] }), a.jsx("div", { id: "sec-anion-gap", children: a.jsx(Nm, { na: g.na, cl: g.cl, hco3: g.hco3, k: g.k, albumin: g.albumin, onUpdateLabs: _ }) }), a.jsxs("div", { id: "sec-six-steps", className: "bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3", children: [a.jsxs("div", { className: "flex items-center space-x-2", children: [a.jsx(Je, { className: "w-5 h-5 text-indigo-600" }), a.jsxs("div", { children: [a.jsx("h3", { className: "text-base font-bold text-slate-900", children: "Quy Tr\xECnh 6 B\u01B0\u1EDBc \u0110\u1ECDc ABG Chu\u1EA9n Y Khoa (Donna Pierre & Ranson)" }), a.jsx("p", { className: "text-xs text-slate-500", children: "Ph\xE2n t\xEDch tu\u1EA7n t\u1EF1 theo t\u1EEBng n\u1EA5c thang sinh l\xFD h\u1ECDc" })] })] }), a.jsx("div", { className: "space-y-2.5", children: p.sixSteps.map((j) => a.jsxs("div", { className: `p-3.5 rounded-xl border text-xs space-y-1 transition-all ${j.status === "danger" ? "bg-rose-50/60 border-rose-200 text-rose-950" : j.status === "warning" ? "bg-amber-50/60 border-amber-200 text-amber-950" : j.status === "normal" ? "bg-emerald-50/50 border-emerald-200 text-emerald-950" : "bg-slate-50 border-slate-200 text-slate-900"}`, children: [a.jsxs("div", { className: "flex items-center justify-between font-bold", children: [a.jsx("span", { className: "text-xs text-slate-900", children: j.stepName }), a.jsx("span", { className: "text-[11px] px-2 py-0.5 rounded-full bg-white/90 border border-slate-200 font-semibold shadow-2xs", children: j.finding })] }), a.jsx("div", { className: "text-xs font-semibold text-slate-800", children: j.title }), a.jsx("p", { className: "text-xs text-slate-600 leading-relaxed", children: j.detail })] }, j.stepNumber)) })] }), a.jsxs("div", { id: "sec-treatment", className: "bg-white rounded-2xl border border-blue-200 p-5 shadow-xs space-y-4", children: [a.jsxs("div", { className: "flex items-center space-x-2", children: [a.jsx(ha, { className: "w-5 h-5 text-blue-600" }), a.jsxs("div", { children: [a.jsx("h3", { className: "text-base font-bold text-slate-900", children: "H\u01B0\u1EDBng D\u1EABn X\u1EED Tr\xED L\xE2m S\xE0ng To\xE0n Di\u1EC7n" }), a.jsx("p", { className: "text-xs text-slate-500", children: "Ph\xE1c \u0111\u1ED3 h\xE0nh \u0111\u1ED9ng chu\u1EA9n y khoa d\u1EF1a tr\xEAn k\u1EBFt qu\u1EA3 kh\xED m\xE1u thu \u0111\u01B0\u1EE3c" })] })] }), a.jsx("div", { className: "p-3.5 rounded-xl bg-blue-50/80 border border-blue-200 text-xs font-semibold text-blue-900 leading-relaxed", children: p.treatmentProtocols.summary }), a.jsxs("div", { className: "space-y-3 text-xs", children: [a.jsxs("div", { className: "p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1", children: [a.jsx("span", { className: "font-bold text-slate-900 block", children: "1. Li\u1EC7u ph\xE1p Oxy:" }), a.jsx("p", { className: "text-slate-700 leading-relaxed", children: p.treatmentProtocols.oxygenTherapy })] }), a.jsxs("div", { className: "p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1", children: [a.jsx("span", { className: "font-bold text-slate-900 block", children: "2. H\u1ED7 tr\u1EE3 th\xF4ng kh\xED (NIV / Th\u1EDF m\xE1y):" }), a.jsx("p", { className: "text-slate-700 leading-relaxed", children: p.treatmentProtocols.ventilationSupport })] }), p.treatmentProtocols.underlyingManagement.length > 0 && a.jsxs("div", { className: "p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1", children: [a.jsx("span", { className: "font-bold text-slate-900 block", children: "3. \u0110i\u1EC1u tr\u1ECB nguy\xEAn nh\xE2n & D\u01B0\u1EE3c l\xFD h\u1ECDc:" }), a.jsx("ul", { className: "list-disc pl-5 space-y-1 text-slate-700", children: p.treatmentProtocols.underlyingManagement.map((j, T) => a.jsx("li", { children: j }, T)) })] }), p.treatmentProtocols.precautions.length > 0 && a.jsxs("div", { className: "p-3 rounded-xl bg-amber-50/80 border border-amber-300 text-amber-900 space-y-1", children: [a.jsxs("span", { className: "font-bold block flex items-center space-x-1 text-amber-950", children: [a.jsx(pn, { className: "w-4 h-4 text-amber-600" }), a.jsx("span", { children: "L\u01B0u \xFD th\u1EADn tr\u1ECDng c\u1ED1t t\u1EED:" })] }), a.jsx("ul", { className: "list-disc pl-5 space-y-1 font-medium", children: p.treatmentProtocols.precautions.map((j, T) => a.jsx("li", { children: j }, T)) })] }), a.jsxs("div", { className: "text-[11px] text-slate-500 italic pt-1", children: ["* Khuy\u1EBFn ngh\u1ECB gi\xE1m s\xE1t: ", p.treatmentProtocols.monitoringAdvice] })] })] })] })] })] });
  };
  var Fx = ({ onLoadPresetToAnalyzer: u, onOpenGlossary: O }) => {
    const [g, o] = Q.useState("start"), [G, E] = Q.useState([]), [R, Z] = Q.useState(null), D = () => {
      o("start"), E([]), Z(null);
    }, H = (L) => {
      const Y = G[L];
      o(Y.stepId), E(G.slice(0, L)), Z(null);
    }, p = (L, Y, Ct, et) => {
      E((St) => [...St, { stepId: g, title: L, chosenOptionLabel: Y }]), et ? (Z(et), o("diagnosis")) : o(Ct);
    }, _ = { id: "meta-acid-high-ag", name: "Toan Chuy\u1EC3n H\xF3a T\u0102NG Anion Gap (High AG Acidosis)", englishName: "High Anion Gap Metabolic Acidosis (HAGMA)", badgeColor: "bg-rose-100 text-rose-800 border-rose-300", borderColor: "border-rose-300", bgColor: "bg-rose-50/50", textColor: "text-rose-950", severity: "C\u1EA3nh b\xE1o nguy k\u1ECBch", summary: "T\xEDch t\u1EE5 b\u1EA5t th\u01B0\u1EDDng c\xE1c acid c\u1ED1 \u0111\u1ECBnh kh\xF4ng bay h\u01A1i (non-volatile acids) l\xE0m ti\xEAu th\u1EE5 g\u1ED1c Bicarbonate \u0111\u1EC7m ngo\u1EA1i b\xE0o, t\u1EA1o kho\u1EA3ng tr\u1ED1ng Anion l\u1EDBn (AG > 16-18 mEq/L).", mechanism: "C\xE1c ion acid l\u1EA1 t\xEDch t\u1EE5 gi\u1EA3i ph\xF3ng H\u207A l\xE0m gi\u1EA3m HCO\u2083\u207B, trong khi n\u1ED3ng \u0111\u1ED9 Clorid m\xE1u v\u1EABn b\xECnh th\u01B0\u1EDDng ho\u1EB7c gi\u1EA3m nh\u1EB9, d\u1EABn \u0111\u1EBFn Anion Gap = Na\u207A - (Cl\u207B + HCO\u2083\u207B) t\u0103ng v\u1ECDt.", etiologies: ["Nhi\u1EC5m toan Ceton \u0111\xE1i th\xE1o \u0111\u01B0\u1EDDng (DKA) ho\u1EB7c toan ceton do r\u01B0\u1EE3u", "Toan Lactic (Type A: s\u1ED1c nhi\u1EC5m khu\u1EA9n, gi\u1EA3m t\u01B0\u1EDBi m\xE1u; Type B: suy gan, metformin)", "Suy th\u1EADn c\u1EA5p/m\u1EA1n giai \u0111o\u1EA1n cu\u1ED1i (t\xEDch t\u1EE5 phosphate, sulfate h\u1EEFu c\u01A1)", "Ng\u1ED9 \u0111\u1ED9c c\u1ED3n \u0111\u1ED9c: Methanol (c\u1ED3n c\xF4ng nghi\u1EC7p), Ethylene glycol (ch\u1EA5t l\xE0m m\xE1t xe h\u01A1i)", "Ng\u1ED9 \u0111\u1ED9c Salicylate (Aspirin), ng\u1ED9 \u0111\u1ED9c Paracetamol li\u1EC1u cao k\xE9o d\xE0i (5-oxoproline)"], actionPlan: ["Ki\u1EC3m tra ngay n\u1ED3ng \u0111\u1ED9 Lactate m\xE1u, Glucose mao m\u1EA1ch, Ceton m\xE1u/n\u01B0\u1EDBc ti\u1EC3u v\xE0 ch\u1EE9c n\u0103ng th\u1EADn (Creatinine/BUN).", "T\xEDnh ch\u1EC9 s\u1ED1 Delta Ratio (\u0394AG / \u0394HCO\u2083\u207B) \u0111\u1EC3 t\xECm ki\u1EBFm toan/ki\u1EC1m h\u1ED7n h\u1EE3p che gi\u1EA5u.", "T\xEDnh PaCO\u2082 k\u1EF3 v\u1ECDng theo c\xF4ng th\u1EE9c Winter: PaCO\u2082 = 1.5 \xD7 [HCO\u2083\u207B] + 8 \xB1 2 \u0111\u1EC3 ki\u1EC3m tra b\xF9 tr\u1EEB h\xF4 h\u1EA5p.", "H\u1ED3i s\u1EE9c nguy\xEAn nh\xE2n g\u1ED1c: B\xF9 d\u1ECBch tinh th\u1EC3, truy\u1EC1n insulin (DKA), kh\xE1ng sinh v\xE0 v\u1EADn m\u1EA1ch (S\u1ED1c nhi\u1EC5m tr\xF9ng), l\u1ECDc m\xE1u c\u1EA5p c\u1EE9u n\u1EBFu ng\u1ED9 \u0111\u1ED9c methanol/suy th\u1EADn."], clinicalPearls: "B\u1EA3ng m\xE3 hi\u1EC7n \u0111\u1EA1i chu\u1EA9n: GOLDMARK (Glycols, Oxoproline, L-lactate, D-lactate, Methanol, Aspirin, Renal failure, Ketoacidosis). Lu\xF4n hi\u1EC7u ch\u1EC9nh Anion Gap n\u1EBFu Albumin m\xE1u < 4.0 g/dL!", sampleAbg: { pH: 7.18, pCO2: 24, pO2: 95, hco3: 9, be: -16, sao2: 97, fio2: 21, unit: "mmHg", na: 138, k: 5.2, cl: 96, lactate: 2.1, glucose: 24 } }, P = { id: "meta-acid-normal-ag", name: "Toan Chuy\u1EC3n H\xF3a Anion Gap B\xCCNH TH\u01AF\u1EDCNG (T\u0103ng Clo M\xE1u)", englishName: "Normal Anion Gap / Hyperchloraemic Metabolic Acidosis (NAGMA)", badgeColor: "bg-amber-100 text-amber-800 border-amber-300", borderColor: "border-amber-300", bgColor: "bg-amber-50/50", textColor: "text-amber-950", severity: "Theo d\xF5i t\xEDch c\u1EF1c", summary: "M\u1EA5t tr\u1EF1c ti\u1EBFp Bicarbonate qua \u0111\u01B0\u1EDDng ti\xEAu h\xF3a ho\u1EB7c qua th\u1EADn. \u0110\u1EC3 duy tr\xEC trung h\xF2a \u0111i\u1EC7n t\xEDch, th\u1EADn t\xE1i h\u1EA5p thu th\xEAm ion Clorid d\u1EABn \u0111\u1EBFn t\u0103ng Clo m\xE1u.", mechanism: "M\u1ED7i \u0111\u01B0\u01A1ng l\u01B0\u1EE3ng HCO\u2083\u207B b\u1ECB m\u1EA5t ra ngo\xE0i \u0111\u01B0\u1EE3c thay th\u1EBF ch\xEDnh x\xE1c b\u1EB1ng m\u1ED9t \u0111\u01B0\u01A1ng l\u01B0\u1EE3ng Cl\u207B t\u1EEB d\u1ECBch l\u1ECDc c\u1EA7u th\u1EADn, do \u0111\xF3 Anion Gap v\u1EABn n\u1EB1m trong kho\u1EA3ng 8 - 16 mEq/L.", etiologies: ["Ti\xEAu ch\u1EA3y c\u1EA5p m\u1EA5t m\u1ED9t l\u01B0\u1EE3ng l\u1EDBn d\u1ECBch ru\u1ED9t ki\u1EC1m gi\xE0u HCO\u2083\u207B", "H\u1ED3i s\u1EE9c truy\u1EC1n qu\xE1 nhi\u1EC1u dung d\u1ECBch mu\u1ED1i Natri Clorid 0.9% (ch\u1EE9a 154 mmol/L Cl\u207B)", "Toan h\xF3a \u1ED1ng th\u1EADn (RTA): Type 1 (\u1ED1ng l\u01B0\u1EE3n xa), Type 2 (\u1ED1ng l\u01B0\u1EE3n g\u1EA7n), Type 4 (kh\xE1ng aldosterone)", "R\xF2 t\u1EE5y, r\xF2 m\u1EADt ho\u1EB7c d\u1EABn l\u01B0u \u1ED1ng sonde ru\u1ED9t non k\xE9o d\xE0i", "S\u1EED d\u1EE5ng thu\u1ED1c \u1EE9c ch\u1EBF men Carbonic Anhydrase (Acetazolamide)"], actionPlan: ["X\xE9t nghi\u1EC7m Clo m\xE1u, ki\u1EC3m tra ti\u1EC1n s\u1EED ti\xEAu ch\u1EA3y ho\u1EB7c truy\u1EC1n d\u1ECBch mu\u1ED1i 0.9% tr\u01B0\u1EDBc \u0111\xF3.", "T\xEDnh Anion Gap N\u01B0\u1EDBc Ti\u1EC3u: U_AG = (Na_ni\u1EC7u + K_ni\u1EC7u) - Cl_ni\u1EC7u \u0111\u1EC3 ph\xE2n bi\u1EC7t nguy\xEAn nh\xE2n t\u1EA1i th\u1EADn vs ngo\xE0i th\u1EADn.", "N\u1EBFu do truy\u1EC1n d\u1ECBch NaCl 0.9%: Chuy\u1EC3n sang d\u1ECBch c\xE2n b\u1EB1ng nh\u01B0 Ringer Lactate ho\u1EB7c Plasmalyte.", "B\xF9 n\u01B0\u1EDBc \u0111i\u1EC7n gi\u1EA3i \u0111\u01B0\u1EDDng u\u1ED1ng (ORS) ho\u1EB7c truy\u1EC1n t\u0129nh m\u1EA1ch, b\u1ED5 sung Bicarbonate n\u1EBFu pH < 7.20 do ti\xEAu ch\u1EA3y n\u1EB7ng."], clinicalPearls: "B\u1EA3ng m\xE3 ghi nh\u1EDB: HARDUPS (Hyperalimentation, Acetazolamide, RTA, Diarrhoea, Uretero-sigmoidostomy, Pancreatic fistula, Saline resuscitation).", sampleAbg: { pH: 7.28, pCO2: 30, pO2: 92, hco3: 14, be: -10, sao2: 97, fio2: 21, unit: "mmHg", na: 140, k: 3.2, cl: 116, lactate: 1.1 } }, y = { id: "acute-resp-acid", name: "Toan H\xF4 H\u1EA5p C\u1EA4P T\xCDNH (Ch\u01B0a C\xF3 B\xF9 Tr\u1EEB Th\u1EADn)", englishName: "Acute Uncompensated Respiratory Acidosis", badgeColor: "bg-rose-100 text-rose-800 border-rose-300", borderColor: "border-rose-300", bgColor: "bg-rose-50/50", textColor: "text-rose-950", severity: "C\u1EA5p c\u1EE9u t\u1ED1i kh\u1EA9n", summary: "Gi\u1EA3m th\xF4ng kh\xED ph\u1EBF nang c\u1EA5p t\xEDnh \u0111\u1ED9t ng\u1ED9t l\xE0m \u1EE9 tr\u1EC7 acid bay h\u01A1i CO\u2082 trong m\xE1u. Th\u1EADn ch\u01B0a k\u1ECBp kh\u1EDFi \u0111\u1ED9ng c\u01A1 ch\u1EBF b\xF9 tr\u1EEB gi\u1EEF Bicarbonate (c\u1EA7n 24 - 72 gi\u1EDD).", mechanism: "PaCO\u2082 t\u0103ng v\u1ECDt trong khi HCO\u2083\u207B v\u1EABn \u1EDF m\u1EE9c b\xECnh th\u01B0\u1EDDng (22 - 26 mmol/L, ch\u1EC9 t\u0103ng nh\u1EB9 ~1 mmol/L do ph\u1EA3n \u1EE9ng \u0111\u1EC7m h\xF3a h\u1ECDc t\u1EBF b\xE0o m\xE1u). T\u1EF7 l\u1EC7 [HCO\u2083\u207B]/PaCO\u2082 gi\u1EA3m m\u1EA1nh l\xE0m pH t\u1EE5t s\xE2u.", etiologies: ["Ng\u1ED9 \u0111\u1ED9c thu\u1ED1c \u1EE9c ch\u1EBF trung t\xE2m h\xF4 h\u1EA5p: Opioid (Morphin, Fentanyl, Heroin), thu\u1ED1c ng\u1EE7 Benzodiazepine", "T\u1EAFc ngh\u1EBDn \u0111\u01B0\u1EDDng th\u1EDF tr\xEAn t\u1ED1i c\u1EA5p: D\u1ECB v\u1EADt \u0111\u01B0\u1EDDng th\u1EDF, ph\xF9 thanh m\xF4n ph\u1EA3n v\u1EC7, co th\u1EAFt thanh qu\u1EA3n", "B\u1EC7nh l\xFD th\u1EA7n kinh c\u01A1 c\u1EA5p: C\u01A1n nh\u01B0\u1EE3c c\u01A1 (Myasthenia Gravis), h\u1ED9i ch\u1EE9ng Guillain-Barr\xE9, ch\u1EA5n th\u01B0\u01A1ng c\u1ED9t s\u1ED1ng c\u1ED5 cao", "Tr\xE0n kh\xED m\xE0ng ph\u1ED5i \xE1p l\u1EF1c, m\u1EA3ng s\u01B0\u1EDDn di \u0111\u1ED9ng"], actionPlan: ["C\u1EA4P C\u1EE8U TH\xD4NG KH\xCD NGAY: Khai th\xF4ng \u0111\u01B0\u1EDDng th\u1EDF, b\xF3p b\xF3ng Ambu qua m\u1EB7t n\u1EA1 ho\u1EB7c \u0111\u1EB7t \u1ED1ng n\u1ED9i kh\xED qu\u1EA3n th\u1EDF m\xE1y.", "N\u1EBFu nghi ng\u1ED9 \u0111\u1ED9c Opioid: Ti\xEAm t\u0129nh m\u1EA1ch thu\u1ED1c \u0111\u1ED1i kh\xE1ng Naloxone (0.4 \u2013 2.0 mg).", "N\u1EBFu nghi ng\u1ED9 \u0111\u1ED9c Benzodiazepine: C\xE2n nh\u1EAFc Flumazenil (l\u01B0u \xFD nguy c\u01A1 co gi\u1EADt).", "Ki\u1EC3m tra PaO\u2082 k\xE8m theo: Th\u01B0\u1EDDng c\xF3 gi\u1EA3m oxy m\xE1u n\u1EB7ng \u0111i k\xE8m do kh\xF4ng kh\xED trong ph\u1EBF nang b\u1ECB CO\u2082 cho\xE1n ch\u1ED7."], clinicalPearls: "Quy t\u1EAFc sinh l\xFD c\u1EA5p: C\u1EE9 m\u1ED7i 10 mmHg PaCO\u2082 t\u0103ng th\xEAm, pH s\u1EBD gi\u1EA3m kho\u1EA3ng 0.08 \u0111\u01A1n v\u1ECB, v\xE0 HCO\u2083\u207B ch\u1EC9 t\u0103ng nh\u1EB9 1 mmol/L.", sampleAbg: { pH: 7.22, pCO2: 68, pO2: 52, hco3: 25, be: -1, sao2: 82, fio2: 21, unit: "mmHg" } }, j = { id: "chronic-resp-acid", name: "Toan H\xF4 H\u1EA5p M\u1EA0N T\xCDNH (\u0110\xE3 \u0110\u01B0\u1EE3c Th\u1EADn B\xF9 Tr\u1EEB Ho\xE0n To\xE0n)", englishName: "Chronic Fully Compensated Respiratory Acidosis", badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300", borderColor: "border-emerald-300", bgColor: "bg-emerald-50/50", textColor: "text-emerald-950", severity: "Theo d\xF5i t\xEDch c\u1EF1c", summary: "T\u0103ng PaCO\u2082 m\u1EA1n t\xEDnh k\xE9o d\xE0i nhi\u1EC1u th\xE1ng \u0111\u1EBFn nhi\u1EC1u n\u0103m. Th\u1EADn \u0111\xE3 t\xE1i h\u1EA5p thu t\u1ED1i \u0111a ion Bicarbonate \u0111\u1EC3 \u0111\u01B0a pH m\xE1u tr\u1EDF v\u1EC1 g\u1EA7n m\u1EE9c b\xECnh th\u01B0\u1EDDng (7.35 \u2013 7.39).", mechanism: "Th\u1EADn t\u0103ng \u0111\xE0o th\u1EA3i ion H\u207A v\xE0 gi\u1EEF l\u1EA1i HCO\u2083\u207B (th\u01B0\u1EDDng t\u0103ng 3.5 \u2013 4.0 mmol/L m\u1ED7i khi PaCO\u2082 t\u0103ng 10 mmHg). Nh\u1EDD n\u1ED3ng \u0111\u1ED9 HCO\u2083\u207B m\xE1u t\u0103ng cao (30 - 38 mmol/L), pH duy tr\xEC \u1EDF m\u1EE9c dung n\u1EA1p t\u1ED1t.", etiologies: ["B\u1EC7nh ph\u1ED5i t\u1EAFc ngh\u1EBDn m\u1EA1n t\xEDnh (COPD) giai \u0111o\u1EA1n \u1ED5n \u0111\u1ECBnh", "H\u1ED9i ch\u1EE9ng b\xE9o ph\xEC gi\u1EA3m th\xF4ng kh\xED (Pickwickian syndrome)", "G\xF9 v\u1EB9o c\u1ED9t s\u1ED1ng l\u1ED3ng ng\u1EF1c n\u1EB7ng m\u1EA1n t\xEDnh (Severe Kyphoscoliosis)", "X\u01A1 ph\u1ED5i giai \u0111o\u1EA1n mu\u1ED9n, b\u1EC7nh th\u1EA7n kinh c\u01A1 ti\u1EBFn tri\u1EC3n m\u1EA1n t\xEDnh"], actionPlan: ["M\u1EE4C TI\xCAU OXY AN TO\xC0N: Duy tr\xEC SpO\u2082 m\u1EE5c ti\xEAu 88 \u2013 92% (ho\u1EB7c PaO\u2082 55 \u2013 65 mmHg).", "C\u1EA2NH B\xC1O T\u1EEC VONG: Tuy\u1EC7t \u0111\u1ED1i kh\xF4ng th\u1EDF oxy d\xF2ng cao kh\xF4ng ki\u1EC3m so\xE1t! Tr\xE1nh tri\u1EC7t ti\xEAu ph\u1EA3n x\u1EA1 Hypoxic Drive l\xE0m b\u1EC7nh nh\xE2n ng\u1EEBng th\u1EDF v\xE0 h\xF4n m\xEA CO\u2082.", "Duy tr\xEC thu\u1ED1c gi\xE3n ph\u1EBF qu\u1EA3n, t\u1EADp ph\u1EE5c h\u1ED3i ch\u1EE9c n\u0103ng h\xF4 h\u1EA5p.", "Kh\xF4ng d\xF9ng Bicarbonate v\xEC c\u01A1 th\u1EC3 \u0111\xE3 t\u1EF1 b\xF9 tr\u1EEB l\u01B0\u1EE3ng ki\u1EC1m d\u1ED3i d\xE0o."], clinicalPearls: "\u0110\u1EB7c \u0111i\u1EC3m ph\xE2n bi\u1EC7t v\u1EDBi toan c\u1EA5p: pH n\u1EB1m trong kho\u1EA3ng 7.35 - 7.39 (\u1EDF n\u1EEDa toan c\u1EE7a b\xECnh th\u01B0\u1EDDng), HCO\u2083\u207B t\u0103ng r\u1EA5t cao (> 30 mmol/L) v\xE0 BE d\u01B0\u01A1ng t\xEDnh l\u1EDBn (+6 \u0111\u1EBFn +12 mmol/L).", sampleAbg: { pH: 7.36, pCO2: 64, pO2: 58, hco3: 36, be: 8, sao2: 89, fio2: 21, unit: "mmHg" } }, T = { id: "acute-on-chronic-resp-acid", name: "\u0110\u1EE3t C\u1EA5p Tr\xEAn N\u1EC1n Toan H\xF4 H\u1EA5p M\u1EA1n T\xEDnh (Acute-on-Chronic)", englishName: "Acute-on-Chronic Respiratory Acidosis", badgeColor: "bg-amber-100 text-amber-800 border-amber-300", borderColor: "border-amber-300", bgColor: "bg-amber-50/50", textColor: "text-amber-950", severity: "C\u1EA3nh b\xE1o nguy k\u1ECBch", summary: "B\u1EC7nh nh\xE2n c\xF3 b\u1EC7nh ph\u1ED5i m\u1EA1n t\xEDnh (\u0111\xE3 c\xF3 s\u1EB5n n\u1ED3ng \u0111\u1ED9 HCO\u2083\u207B cao b\xF9 tr\u1EEB) nay b\u1ECB nhi\u1EC5m tr\xF9ng ho\u1EB7c suy th\xF4ng kh\xED c\u1EA5p t\xEDnh khi\u1EBFn PaCO\u2082 t\u0103ng v\u1ECDt th\xEAm, v\u01B0\u1EE3t qu\xE1 ng\u01B0\u1EE1ng b\xF9 tr\u1EEB v\xE0 l\xE0m pH t\u1EE5t v\xE0o v\xF9ng toan m\xE1u (< 7.35).", mechanism: "N\u1EC1n t\u1EA3ng HCO\u2083\u207B cao (> 30 mmol/L) v\xE0 BE d\u01B0\u01A1ng t\xEDnh ch\u1EE9ng minh c\xF3 toan m\u1EA1n t\xEDnh t\u1EEB tr\u01B0\u1EDBc, nh\u01B0ng pH hi\u1EC7n t\u1EA1i < 7.35 ch\u1EE9ng minh c\xF3 m\u1ED9t \u0111\u1EE3t suy h\xF4 h\u1EA5p c\u1EA5p t\xEDnh v\u1EEBa m\u1EDBi x\u1EA3y ra \u0111\xE8 l\xEAn.", etiologies: ["\u0110\u1EE3t c\u1EA5p B\u1EC7nh ph\u1ED5i t\u1EAFc ngh\u1EBDn m\u1EA1n t\xEDnh (AECOPD) do b\u1ED9i nhi\u1EC5m vi khu\u1EA9n / virus", "Th\u1EDF oxy li\u1EC1u qu\xE1 cao l\xE0m \u1EE9 tr\u1EC7 th\xEAm CO\u2082 \u1EDF b\u1EC7nh nh\xE2n COPD", "Tr\xE0n kh\xED m\xE0ng ph\u1ED5i ho\u1EB7c thuy\xEAn t\u1EAFc ph\u1ED5i tr\xEAn ng\u01B0\u1EDDi b\u1EC7nh COPD", "D\xF9ng thu\u1ED1c an th\u1EA7n, thu\u1ED1c ng\u1EE7, opioid \u1EDF b\u1EC7nh nh\xE2n b\xE9o ph\xEC gi\u1EA3m th\xF4ng kh\xED"], actionPlan: ["Li\u1EC7u ph\xE1p oxy ki\u1EC3m so\xE1t: M\u1EB7t n\u1EA1 Venturi 24% - 28% nh\u1EAFm SpO\u2082 88 - 92%.", "Kh\xED dung gi\xE3n ph\u1EBF qu\u1EA3n li\u1EC1u cao (Salbutamol + Ipratropium).", "Corticosteroid to\xE0n th\xE2n v\xE0 kh\xE1ng sinh n\u1EBFu c\xF3 d\u1EA5u hi\u1EC7u nhi\u1EC5m tr\xF9ng \u0111\u01B0\u1EDDng th\u1EDF.", "CH\u1EC8 \u0110\u1ECANH TH\u1EDE M\xC1Y KH\xD4NG X\xC2M L\u1EA4N (NIV/BiPAP): Khi pH 7.25 \u2013 7.35 v\xE0 PaCO\u2082 > 45 mmHg d\xF9 \u0111\xE3 t\u1ED1i \u01B0u h\xF3a \u0111i\u1EC1u tr\u1ECB n\u1ED9i khoa ban \u0111\u1EA7u."], clinicalPearls: "N\u1EBFu pH < 7.25 k\xE8m r\u1ED1i lo\u1EA1n tri gi\xE1c ho\u1EB7c ki\u1EC7t c\u01A1 h\xF4 h\u1EA5p nghi\xEAm tr\u1ECDng: Chu\u1EA9n b\u1ECB \u0111\u1EB7t \u1ED1ng n\u1ED9i kh\xED qu\u1EA3n v\xE0 th\u1EDF m\xE1y x\xE2m l\u1EA5n.", sampleAbg: { pH: 7.26, pCO2: 76, pO2: 48, hco3: 34, be: 7, sao2: 78, fio2: 21, unit: "mmHg" } }, U = { id: "mixed-acidosis", name: "TOAN H\u1ED6N H\u1EE2P NGUY K\u1ECACH (Toan H\xF4 H\u1EA5p + Toan Chuy\u1EC3n H\xF3a)", englishName: "Mixed Severe Acidosis (Combined Respiratory & Metabolic)", badgeColor: "bg-rose-900 text-white border-rose-950", borderColor: "border-rose-900", bgColor: "bg-rose-100/60", textColor: "text-rose-950", severity: "C\u1EA5p c\u1EE9u t\u1ED1i kh\u1EA9n", summary: "Hai c\u01A1 ch\u1EBF toan \u0111\u1ED9c l\u1EADp t\xE1c \u0111\u1ED9ng c\xF9ng l\xFAc: Ph\u1ED5i kh\xF4ng th\u1EC3 \u0111\xE0o th\u1EA3i CO\u2082 (PaCO\u2082 t\u0103ng) V\xC0 m\xF4 t\xEDch t\u1EE5 acid chuy\u1EC3n h\xF3a (HCO\u2083\u207B gi\u1EA3m, BE \xE2m t\xEDnh n\u1EB7ng). pH m\xE1u r\u01A1i t\u1EF1 do xu\u1ED1ng ng\u01B0\u1EE1ng t\u1EED vong!", mechanism: "Kh\xF4ng c\xF3 b\u1EA5t k\u1EF3 h\u1EC7 th\u1ED1ng b\xF9 tr\u1EEB n\xE0o ho\u1EA1t \u0111\u1ED9ng \u0111\u01B0\u1EE3c v\xEC c\u1EA3 hai c\u01A1 quan h\xF4 h\u1EA5p v\xE0 th\u1EADn/chuy\u1EC3n h\xF3a \u0111\u1EC1u c\xF9ng suy s\u1EE5p. Ph\u1EA3n \u1EE9ng toan c\u1ED9ng g\u1ED9p l\xE0m pH < 7.10.", etiologies: ["Ng\u1EEBng tim, ng\u1EEBng h\xF4 h\u1EA5p tu\u1EA7n ho\xE0n (Cardiac arrest)", "S\u1ED1c nhi\u1EC5m khu\u1EA9n ho\u1EB7c s\u1ED1c tim n\u1EB7ng k\xE8m ki\u1EC7t c\u01A1 h\xF4 h\u1EA5p / ph\xF9 ph\u1ED5i c\u1EA5p", "\u0110\u1EE3t c\u1EA5p COPD n\u1EB7ng k\xE8m suy tu\u1EA7n ho\xE0n ho\u1EB7c toan lactic do thi\u1EBFu oxy m\xF4", "B\u1EC7nh nh\xE2n DKA n\u1EB7ng b\u1ECB \u1EE9c ch\u1EBF h\xF4 h\u1EA5p do ng\u1ED9 \u0111\u1ED9c thu\u1ED1c ng\u1EE7 ho\u1EB7c ki\u1EC7t s\u1EE9c th\u1EDF"], actionPlan: ["H\u1ED2I S\u1EE8C TIM PH\u1ED4I C\u1EA4P C\u1EE8U (ACLS): \u0110\u1EB7t n\u1ED9i kh\xED qu\u1EA3n th\u1EDF m\xE1y x\xE2m l\u1EA5n v\u1EDBi FiO\u2082 100% ngay l\u1EADp t\u1EE9c.", "T\u1ED1i \u01B0u h\xF3a th\xF4ng kh\xED ph\xFAt (Minute ventilation) \u0111\u1EC3 nhanh ch\xF3ng r\u1EEDa b\u1EDBt PaCO\u2082.", "H\u1ED3i s\u1EE9c huy\u1EBFt \u0111\u1ED9ng: B\xF9 d\u1ECBch, s\u1EED d\u1EE5ng thu\u1ED1c v\u1EADn m\u1EA1ch (Noradrenaline, Adrenaline).", "C\xE2n nh\u1EAFc Natri Bicarbonate 8.4% truy\u1EC1n ch\u1EADm n\u1EBFu pH < 7.00 k\xE8m r\u1ED1i lo\u1EA1n nh\u1ECBp tim tr\u01A1 v\u1EDBi thu\u1ED1c."], clinicalPearls: "Quy t\u1EAFc v\xE0ng Donna Pierre: N\u1EBFu pH toan m\xE0 c\u1EA3 PaCO\u2082 t\u0103ng V\xC0 HCO\u2083\u207B gi\u1EA3m, \u0111\xE2y lu\xF4n lu\xF4n l\xE0 t\xECnh tr\u1EA1ng th\u1EA3m h\u1ECDa \u0111e d\u1ECDa ng\u1EEBng tim trong v\xE0i ph\xFAt!", sampleAbg: { pH: 7.02, pCO2: 65, pO2: 40, hco3: 12, be: -18, sao2: 68, fio2: 40, unit: "mmHg", na: 142, cl: 102, lactate: 8.5 } }, nt = { id: "acute-resp-alk", name: "Ki\u1EC1m H\xF4 H\u1EA5p C\u1EA4P T\xCDNH (Acute Respiratory Alkalosis)", englishName: "Acute Respiratory Alkalosis", badgeColor: "bg-blue-100 text-blue-800 border-blue-300", borderColor: "border-blue-300", bgColor: "bg-blue-50/50", textColor: "text-blue-950", severity: "Theo d\xF5i t\xEDch c\u1EF1c", summary: "T\u0103ng th\xF4ng kh\xED ph\u1EBF nang c\u1EA5p t\xEDnh \u0111\xE0o th\u1EA3i qu\xE1 m\u1EE9c acid bay h\u01A1i CO\u2082, l\xE0m PaCO\u2082 t\u1EE5t nhanh ch\xF3ng trong khi th\u1EADn ch\u01B0a k\u1ECBp gi\u1EA3m gi\u1EEF Bicarbonate.", mechanism: "PaCO\u2082 t\u1EE5t (< 35 mmHg) \u0111\u1EA9y c\xE2n b\u1EB1ng Henderson-Hasselbalch sang ki\u1EC1m. Ki\u1EC1m m\xE1u c\u1EA5p l\xE0m d\u1ECBch chuy\u1EC3n canxi ion h\xF3a g\u1EAFn v\xE0o albumin, g\xE2y h\u1EA1 canxi ion h\xF3a d\u1EABn \u0111\u1EBFn t\xEA r\u1EA7n quanh mi\u1EC7ng, co r\xFAt ng\xF3n tay ng\xF3n ch\xE2n (d\u1EA5u hi\u1EC7u Trousseau / Chvostek).", etiologies: ["C\u01A1n ho\u1EA3ng lo\u1EA1n t\xE2m l\xFD (Panic attack), lo \xE2u k\xEDch \u0111\u1ED9ng, c\u01A1n \u0111au d\u1EEF d\u1ED9i", "Giai \u0111o\u1EA1n s\u1EDBm c\u1EE7a Thuy\xEAn t\u1EAFc \u0111\u1ED9ng m\u1EA1ch ph\u1ED5i (PE) ho\u1EB7c C\u01A1n hen ph\u1EBF qu\u1EA3n c\u1EA5p", "S\u1ED1t cao, ng\u1ED9 \u0111\u1ED9c Salicylate giai \u0111o\u1EA1n s\u1EDBm (k\xEDch th\xEDch tr\u1EF1c ti\u1EBFp trung t\xE2m h\xF4 h\u1EA5p)", "Th\u1EDF m\xE1y v\u1EDBi th\u1EC3 t\xEDch kh\xED l\u01B0u th\xF4ng (Vt) ho\u1EB7c t\u1EA7n s\u1ED1 th\u1EDF c\xE0i \u0111\u1EB7t qu\xE1 cao"], actionPlan: ["Tr\u1EA5n an t\xE2m l\xFD b\u1EC7nh nh\xE2n, h\u01B0\u1EDBng d\u1EABn th\u1EDF ch\u1EADm v\xE0 s\xE2u ho\u1EB7c th\u1EDF qua m\u1EB7t n\u1EA1 t\xFAi k\xEDn.", "\u0110i\u1EC1u tr\u1ECB gi\u1EA3m \u0111au hi\u1EC7u qu\u1EA3 n\u1EBFu do \u0111au \u0111\u1EDBn, h\u1EA1 s\u1ED1t n\u1EBFu do s\u1ED1t cao.", "LO\u1EA0I TR\u1EEA KH\u1EA8N C\u1EA4P: Ch\u1EE5p CT \u0111\u1ED9ng m\u1EA1ch ph\u1ED5i n\u1EBFu nghi ng\u1EDD thuy\xEAn t\u1EAFc ph\u1ED5i (PE).", "N\u1EBFu \u0111ang th\u1EDF m\xE1y: Gi\u1EA3m t\u1EA7n s\u1ED1 th\u1EDF ho\u1EB7c gi\u1EA3m th\u1EC3 t\xEDch kh\xED l\u01B0u th\xF4ng."], clinicalPearls: "\u1EDE b\u1EC7nh nh\xE2n hen ph\u1EBF qu\u1EA3n, n\u1EBFu ABG c\xF3 ki\u1EC1m h\xF4 h\u1EA5p (PaCO\u2082 th\u1EA5p), b\u1EC7nh nh\xE2n v\u1EABn c\xF2n s\u1EE9c th\u1EDF. N\u1EBFu PaCO\u2082 b\u1ED7ng nhi\xEAn tr\u1EDF v\u1EC1 b\xECnh th\u01B0\u1EDDng ho\u1EB7c b\u1EAFt \u0111\u1EA7u t\u0103ng: D\u1EA4U HI\u1EC6U B\xC1O \u0110\u1ED8NG KI\u1EC6T C\u01A0, NGUY C\u01A0 NG\u1EEANG TH\u1EDE!", sampleAbg: { pH: 7.54, pCO2: 24, pO2: 105, hco3: 23, be: 1, sao2: 99, fio2: 21, unit: "mmHg" } }, ht = { id: "chronic-resp-alk", name: "Ki\u1EC1m H\xF4 H\u1EA5p M\u1EA0N T\xCDNH (\u0110\xE3 \u0110\u01B0\u1EE3c Th\u1EADn B\xF9 Tr\u1EEB)", englishName: "Chronic Fully Compensated Respiratory Alkalosis", badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-300", borderColor: "border-indigo-300", bgColor: "bg-indigo-50/50", textColor: "text-indigo-950", severity: "Sinh l\xFD b\xECnh th\u01B0\u1EDDng", summary: "T\u0103ng th\xF4ng kh\xED ph\u1EBF nang k\xE9o d\xE0i ng\xE0y n\xE0y qua th\xE1ng kh\xE1c. Th\u1EADn \u0111\xE3 gi\u1EA3m gi\u1EEF HCO\u2083\u207B \u0111\u1EC3 \u0111\u01B0a pH tr\u1EDF v\u1EC1 g\u1EA7n m\u1EE9c b\xECnh th\u01B0\u1EDDng (7.41 \u2013 7.45).", mechanism: "Th\u1EADn gi\u1EA3m t\xE1i h\u1EA5p thu HCO\u2083\u207B (th\u01B0\u1EDDng gi\u1EA3m ~4 - 5 mmol/L m\u1ED7i khi PaCO\u2082 gi\u1EA3m 10 mmHg), h\u1EA1 n\u1ED3ng \u0111\u1ED9 Bicarbonate huy\u1EBFt t\u01B0\u01A1ng xu\u1ED1ng 16 - 20 mmol/L \u0111\u1EC3 c\xE2n b\u1EB1ng v\u1EDBi PaCO\u2082 th\u1EA5p.", etiologies: ["Ng\u01B0\u1EDDi s\u1ED1ng ho\u1EB7c leo n\xFAi \u1EDF \u0111\u1ED9 cao cao (thi\u1EBFu oxy m\u1EA1n k\xEDch th\xEDch th\u1EDF nhanh)", "Ph\u1EE5 n\u1EEF mang thai 3 th\xE1ng gi\u1EEFa v\xE0 3 th\xE1ng cu\u1ED1i (Progesterone k\xEDch th\xEDch trung t\xE2m h\xF4 h\u1EA5p)", "B\u1EC7nh nh\xE2n x\u01A1 gan m\u1EA5t b\xF9 ho\u1EB7c b\u1EC7nh n\xE3o gan (t\u0103ng ammonia k\xEDch th\xEDch th\u1EA7n kinh)", "B\u1EC7nh l\xFD t\u1ED5n th\u01B0\u01A1ng th\xE2n n\xE3o m\u1EA1n t\xEDnh"], actionPlan: ["X\xE1c \u0111\u1ECBnh xem \u0111\xE2y l\xE0 bi\u1EBFn \u0111\u1ED5i sinh l\xFD (nh\u01B0 thai k\u1EF3, th\xEDch nghi \u0111\u1ED9 cao) hay b\u1EC7nh l\xFD (x\u01A1 gan).", "Kh\xF4ng c\u1EA7n can thi\u1EC7p toan ki\u1EC1m \u0111\u1EB7c hi\u1EC7u n\u1EBFu l\xE0 th\xEDch nghi sinh l\xFD.", "Tr\xE1nh nh\u1EA7m l\u1EABn n\u1ED3ng \u0111\u1ED9 HCO\u2083\u207B th\u1EA5p n\xE0y v\u1EDBi toan chuy\u1EC3n h\xF3a nguy\xEAn ph\xE1t!"], clinicalPearls: "L\u01B0u \xFD s\u1EA3n khoa: Ph\u1EE5 n\u1EEF mang thai kh\u1ECFe m\u1EA1nh b\xECnh th\u01B0\u1EDDng lu\xF4n c\xF3 PaCO\u2082 kho\u1EA3ng 28 - 32 mmHg v\xE0 HCO\u2083\u207B kho\u1EA3ng 18 - 21 mmol/L do t\xE1c d\u1EE5ng sinh l\xFD c\u1EE7a hormone Progesterone.", sampleAbg: { pH: 7.43, pCO2: 28, pO2: 98, hco3: 18, be: -4, sao2: 98, fio2: 21, unit: "mmHg" } }, B = { id: "meta-alk-responsive", name: "Ki\u1EC1m Chuy\u1EC3n H\xF3a M\u1EA4T TH\u1EC2 T\xCDCH / NH\u1EA0Y CLORID (Chloride-Responsive)", englishName: "Chloride-Responsive Metabolic Alkalosis", badgeColor: "bg-purple-100 text-purple-800 border-purple-300", borderColor: "border-purple-300", bgColor: "bg-purple-50/50", textColor: "text-purple-950", severity: "Theo d\xF5i t\xEDch c\u1EF1c", summary: "M\u1EA5t m\u1ED9t l\u01B0\u1EE3ng l\u1EDBn acid HCl v\xE0 d\u1ECBch d\u1EA1 d\xE0y, ho\u1EB7c m\u1EA5t mu\u1ED1i Clo qua th\u1EADn do thu\u1ED1c l\u1EE3i ti\u1EC3u. N\u1ED3ng \u0111\u1ED9 Clorid trong n\u01B0\u1EDBc ti\u1EC3u r\u1EA5t th\u1EA5p (U_Cl < 15 - 20 mEq/L).", mechanism: "M\u1EA5t H\u207A v\xE0 Cl\u207B t\u1EEB d\u1ECBch v\u1ECB d\u1EA1 d\xE0y t\u1EA1o ra d\u01B0 th\u1EEBa HCO\u2083\u207B. Th\u1EADn mu\u1ED1n gi\u1EEF th\u1EC3 t\xEDch tu\u1EA7n ho\xE0n b\u1EB1ng c\xE1ch t\xE1i h\u1EA5p thu Na\u207A, nh\u01B0ng thi\u1EBFu Cl\u207B \u0111i k\xE8m bu\u1ED9c th\u1EADn ph\u1EA3i b\xE0i ti\u1EBFt H\u207A v\xE0 K\u207A \u1EDF \u1ED1ng l\u01B0\u1EE3n xa, duy tr\xEC t\xECnh tr\u1EA1ng ki\u1EC1m m\xE1u (toan n\u01B0\u1EDBc ti\u1EC3u ngh\u1ECBch th\u01B0\u1EDDng) v\xE0 h\u1EA1 kali m\xE1u.", etiologies: ["N\xF4n \xF3i nhi\u1EC1u, h\xFAt d\u1ECBch d\u1EA1 d\xE0y li\xEAn t\u1EE5c qua sonde m\u0169i - d\u1EA1 d\xE0y (H\u1EB9p m\xF4n v\u1ECB, t\u1EAFc ru\u1ED9t)", "S\u1EED d\u1EE5ng thu\u1ED1c l\u1EE3i ti\u1EC3u quai (Furosemide) ho\u1EB7c Thiazide", "H\u1ED9i ch\u1EE9ng m\u1EA5t d\u1ECBch k\xE8m h\u1EA1 Clo v\xE0 h\u1EA1 Kali m\xE1u"], actionPlan: ["B\xD9 TH\u1EC2 T\xCDCH B\u1EB0NG NATRI CLORID 0.9%: Truy\u1EC1n d\u1ECBch mu\u1ED1i \u0111\u1EB3ng tr\u01B0\u01A1ng cung c\u1EA5p Cl\u207B gi\xFAp th\u1EADn b\xE0i ti\u1EBFt l\u01B0\u1EE3ng Bicarbonate d\u01B0 th\u1EEBa.", "B\xD9 KALI CLORID (KCl): B\u1EAFt bu\u1ED9c ph\u1EA3i b\xF9 \u0111\u1EE7 Kali v\xEC h\u1EA1 Kali m\xE1u s\u1EBD duy tr\xEC b\xE0i ti\u1EBFt H\u207A t\u1EA1i \u1ED1ng l\u01B0\u1EE3n xa.", "D\u1EEBng ho\u1EB7c gi\u1EA3m li\u1EC1u thu\u1ED1c l\u1EE3i ti\u1EC3u n\u1EBFu kh\xF4ng c\xF3 ch\u1EC9 \u0111\u1ECBnh b\u1EAFt bu\u1ED9c.", "S\u1EED d\u1EE5ng thu\u1ED1c \u1EE9c ch\u1EBF b\u01A1m proton (PPI) n\u1EBFu do n\xF4n \xF3i d\u1ECBch v\u1ECB k\xE9o d\xE0i."], clinicalPearls: "Ch\xECa kh\xF3a ch\u1EA9n \u0111o\xE1n: \u0110o n\u1ED3ng \u0111\u1ED9 Clorid trong n\u01B0\u1EDBc ti\u1EC3u (Spot Urine Chloride < 15 mmol/L). \u0110\xE1p \u1EE9ng th\u1EA7n k\u1EF3 v\u1EDBi vi\u1EC7c truy\u1EC1n dung d\u1ECBch NaCl 0.9% v\xE0 KCl!", sampleAbg: { pH: 7.55, pCO2: 48, pO2: 90, hco3: 40, be: 14, sao2: 97, fio2: 21, unit: "mmHg", na: 137, k: 2.8, cl: 84 } }, tt = { id: "meta-alk-resistant", name: "Ki\u1EC1m Chuy\u1EC3n H\xF3a KH\xC1NG CLORID / TH\u1EEAA MINERALOCORTICOID (Chloride-Resistant)", englishName: "Chloride-Resistant Metabolic Alkalosis", badgeColor: "bg-purple-100 text-purple-800 border-purple-300", borderColor: "border-purple-300", bgColor: "bg-purple-50/50", textColor: "text-purple-950", severity: "C\u1EA3nh b\xE1o nguy k\u1ECBch", summary: "Ki\u1EC1m chuy\u1EC3n h\xF3a do k\xEDch th\xEDch th\u1EE5 th\u1EC3 Mineralocorticoid t\u1EA1i \u1ED1ng th\u1EADn, kh\xF4ng ph\u1EE5 thu\u1ED9c v\xE0o t\xECnh tr\u1EA1ng m\u1EA5t th\u1EC3 t\xEDch. N\u1ED3ng \u0111\u1ED9 Clorid trong n\u01B0\u1EDBc ti\u1EC3u cao (U_Cl > 25 mEq/L), kh\xF4ng \u0111\xE1p \u1EE9ng v\u1EDBi truy\u1EC1n d\u1ECBch NaCl 0.9%.", mechanism: "Aldosterone ho\u1EB7c corticoid t\u0103ng cao k\xEDch ho\u1EA1t b\u01A1m H\u207A-ATPase v\xE0 k\xEAnh ENaC t\u1EA1i t\u1EBF b\xE0o k\u1EBD \u1ED1ng l\u01B0\u1EE3n xa, li\xEAn t\u1EE5c t\u1ED1ng H\u207A v\xE0 K\u207A ra n\u01B0\u1EDBc ti\u1EC3u v\xE0 gi\u1EEF Na\u207A, Bicarbonate v\xE0o m\xE1u.", etiologies: ["C\u01B0\u1EDDng Aldosterone nguy\xEAn ph\xE1t (H\u1ED9i ch\u1EE9ng Conn do u v\u1ECF th\u01B0\u1EE3ng th\u1EADn)", "H\u1ED9i ch\u1EE9ng Cushing, s\u1EED d\u1EE5ng Corticosteroid li\u1EC1u cao k\xE9o d\xE0i", "H\u1EB9p \u0111\u1ED9ng m\u1EA1ch th\u1EADn g\xE2y t\u0103ng ti\u1EBFt Renin - Aldosterone th\u1EE9 ph\xE1t", "\u0102n l\u01B0\u1EE3ng l\u1EDBn cam th\u1EA3o t\u1EF1 nhi\xEAn (Licorice ch\u1EE9a acid glycyrrhizic \u1EE9c ch\u1EBF enzym 11\u03B2-HSD2)"], actionPlan: ["Kh\xE1m x\xE9t nghi\u1EC7m: \u0110o n\u1ED3ng \u0111\u1ED9 Aldosterone v\xE0 Renin huy\u1EBFt t\u01B0\u01A1ng (t\u1EF7 l\u1EC7 ARR).", "Ch\u1EE5p CT/MRI tuy\u1EBFn th\u01B0\u1EE3ng th\u1EADn t\xECm u ho\u1EB7c si\xEAu \xE2m Doppler \u0111\u1ED9ng m\u1EA1ch th\u1EADn.", "\u0110i\u1EC1u tr\u1ECB b\u1EB1ng thu\u1ED1c kh\xE1ng Aldosterone \u0111\u1EB7c hi\u1EC7u: Spironolactone ho\u1EB7c Eplerenone.", "Truy\u1EC1n NaCl 0.9% kh\xF4ng c\xF3 t\xE1c d\u1EE5ng v\xE0 c\xF3 th\u1EC3 l\xE0m n\u1EB7ng th\xEAm t\xECnh tr\u1EA1ng t\u0103ng huy\u1EBFt \xE1p qu\xE1 t\u1EA3i th\u1EC3 t\xEDch!"], clinicalPearls: "Tam ch\u1EE9ng \u0111i\u1EC3n h\xECnh: T\u0103ng huy\u1EBFt \xE1p + Ki\u1EC1m chuy\u1EC3n h\xF3a + H\u1EA1 kali m\xE1u n\u1EB7ng tr\u01A1 v\u1EDBi b\xF9 th\xF4ng th\u01B0\u1EDDng. N\u01B0\u1EDBc ti\u1EC3u ch\u1EE9a Cl\u207B > 25 mEq/L.", sampleAbg: { pH: 7.52, pCO2: 46, pO2: 92, hco3: 36, be: 11, sao2: 97, fio2: 21, unit: "mmHg", na: 146, k: 2.6, cl: 98 } }, gt = { id: "mixed-alkalosis", name: "KI\u1EC0M H\u1ED6N H\u1EE2P NGUY HI\u1EC2M (Ki\u1EC1m H\xF4 H\u1EA5p + Ki\u1EC1m Chuy\u1EC3n H\xF3a)", englishName: "Mixed Respiratory & Metabolic Alkalosis", badgeColor: "bg-indigo-900 text-white border-indigo-950", borderColor: "border-indigo-900", bgColor: "bg-indigo-100/60", textColor: "text-indigo-950", severity: "C\u1EA3nh b\xE1o nguy k\u1ECBch", summary: "Hai t\xECnh tr\u1EA1ng ki\u1EC1m m\xE1u di\u1EC5n ra \u0111\u1ED3ng th\u1EDDi: PaCO\u2082 t\u1EE5t th\u1EA5p do t\u0103ng th\xF4ng kh\xED V\xC0 HCO\u2083\u207B t\u0103ng cao do chuy\u1EC3n h\xF3a. pH m\xE1u c\xF3 th\u1EC3 v\u01B0\u1EE3t ng\u01B0\u1EE1ng 7.60 g\xE2y lo\u1EA1n nh\u1ECBp tim \xE1c t\xEDnh v\xE0 co th\u1EAFt m\u1EA1ch n\xE3o.", mechanism: "C\u1EA3 hai ph\u1EA3n \u1EE9ng c\xF9ng \u0111\u1EA9y pH l\xEAn cao. Ki\u1EC1m m\xE1u n\u1EB7ng l\xE0m gi\u1EA3m m\u1EA1nh canxi ion h\xF3a, h\u1EA1 kali m\xE1u n\u1EB7ng, gi\u1EA3m t\u01B0\u1EDBi m\xE1u n\xE3o v\xE0 \u1EE9c ch\u1EBF th\xF4ng kh\xED t\u1EF1 nhi\xEAn.", etiologies: ["B\u1EC7nh nh\xE2n x\u01A1 gan ho\u1EB7c suy gan (s\u1EB5n c\xF3 ki\u1EC1m h\xF4 h\u1EA5p) d\xF9ng thu\u1ED1c l\u1EE3i ti\u1EC3u quai li\u1EC1u cao", "B\u1EC7nh nh\xE2n n\xF4n \xF3i nhi\u1EC1u k\xE8m theo c\u01A1n \u0111au \u0111\u1EDBn d\u1EEF d\u1ED9i / s\u1ED1t cao g\xE2y th\u1EDF nhanh", "B\u1EC7nh nh\xE2n th\u1EDF m\xE1y c\xF3 t\u0103ng th\xF4ng kh\xED nh\xE2n t\u1EA1o qu\xE1 m\u1EE9c k\u1EBFt h\u1EE3p h\xFAt d\u1ECBch d\u1EA1 d\xE0y"], actionPlan: ["H\u1EA0 NGAY pH M\xC1U: \u0110i\u1EC1u ch\u1EC9nh c\xE0i \u0111\u1EB7t m\xE1y th\u1EDF (gi\u1EA3m t\u1EA7n s\u1ED1 th\u1EDF, gi\u1EA3m Vt) \u0111\u1EC3 gi\u1EEF PaCO\u2082 sinh l\xFD.", "B\xF9 d\u1ECBch mu\u1ED1i NaCl 0.9% v\xE0 truy\u1EC1n b\xF9 Kali t\xEDch c\u1EF1c c\xF3 theo d\xF5i \u0111i\u1EC7n tim li\xEAn t\u1EE5c.", "Theo d\xF5i s\xE1t n\u1ED3ng \u0111\u1ED9 Ion Canxi (iCa\xB2\u207A) v\xE0 b\xF9 Canxi Clorid n\u1EBFu c\xF3 tetany ho\u1EB7c lo\u1EA1n nh\u1ECBp tim."], clinicalPearls: "pH > 7.60 l\xE0 m\u1ED9t c\u1EA5p c\u1EE9u n\u1ED9i khoa v\u1EDBi nguy c\u01A1 ng\u1EEBng tim, co gi\u1EADt v\xE0 co th\u1EAFt m\u1EA1ch v\xE0nh \u0111\u1ED9t ng\u1ED9t.", sampleAbg: { pH: 7.62, pCO2: 25, pO2: 110, hco3: 34, be: 12, sao2: 99, fio2: 21, unit: "mmHg" } }, C = { id: "normal-abg", name: "Kh\xED M\xE1u \u0110\u1ED9ng M\u1EA1ch Ho\xE0n To\xE0n B\xECnh Th\u01B0\u1EDDng", englishName: "Normal Arterial Blood Gas", badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300", borderColor: "border-emerald-300", bgColor: "bg-emerald-50/50", textColor: "text-emerald-950", severity: "Sinh l\xFD b\xECnh th\u01B0\u1EDDng", summary: "T\u1EA5t c\u1EA3 c\xE1c ch\u1EC9 s\u1ED1 toan ki\u1EC1m c\u1ED1t l\xF5i (pH 7.35 \u2013 7.45, PaCO\u2082 35 \u2013 45 mmHg, HCO\u2083\u207B 22 \u2013 26 mmol/L, BE -2 \u0111\u1EBFn +2) \u0111\u1EC1u n\u1EB1m ho\xE0n h\u1EA3o trong gi\u1EDBi h\u1EA1n sinh l\xFD chu\u1EA9n.", mechanism: "H\u1EC7 th\u1ED1ng \u0111\u1EC7m huy\u1EBFt t\u01B0\u01A1ng, th\xF4ng kh\xED ph\u1ED5i v\xE0 t\xE1i h\u1EA5p thu \u1ED1ng th\u1EADn \u0111ang ho\u1EA1t \u0111\u1ED9ng t\u1ED1i \u01B0u v\xE0 h\xE0i h\xF2a.", etiologies: ["Ng\u01B0\u1EDDi kh\u1ECFe m\u1EA1nh b\xECnh th\u01B0\u1EDDng", "B\u1EC7nh nh\xE2n \u0111\xE3 h\u1ED3i ph\u1EE5c ho\xE0n to\xE0n sau \u0111i\u1EC1u tr\u1ECB r\u1ED1i lo\u1EA1n toan ki\u1EC1m", "L\u01B0u \xFD: Kh\xF4ng lo\u1EA1i tr\u1EEB c\xE1c b\u1EA5t th\u01B0\u1EDDng oxy h\xF3a m\xE1u (c\u1EA7n xem x\xE9t th\xEAm PaO\u2082 v\xE0 FiO\u2082)"], actionPlan: ["Ki\u1EC3m tra l\u1EA1i PaO\u2082 v\xE0 PaO\u2082/FiO\u2082 ratio \u0111\u1EC3 \u0111\u1EA3m b\u1EA3o b\u1EC7nh nh\xE2n kh\xF4ng c\xF3 suy h\xF4 h\u1EA5p Type 1 \u0111\u1ED9c l\u1EADp.", "Ti\u1EBFp t\u1EE5c theo d\xF5i l\xE2m s\xE0ng n\u1EBFu c\xF3 c\xE1c tri\u1EC7u ch\u1EE9ng nghi ng\u1EDD kh\xE1c."], clinicalPearls: "Lu\xF4n lu\xF4n ki\u1EC3m tra Tr\u1EE5c 1 (Trao \u0111\u1ED5i kh\xED t\u1EA1i ph\u1ED5i - PaO\u2082 / FiO\u2082) k\u1EC3 c\u1EA3 khi th\u0103ng b\u1EB1ng toan ki\u1EC1m ho\xE0n to\xE0n b\xECnh th\u01B0\u1EDDng!", sampleAbg: { pH: 7.4, pCO2: 40, pO2: 95, hco3: 24, be: 0, sao2: 98, fio2: 21, unit: "mmHg" } };
    return a.jsxs("div", { className: "bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-6", children: [a.jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-200", children: [a.jsxs("div", { className: "space-y-1", children: [a.jsxs("div", { className: "flex items-center space-x-2", children: [a.jsx("span", { className: "p-1.5 rounded-lg bg-blue-100 text-blue-800", children: a.jsx($h, { className: "w-5 h-5" }) }), a.jsx("h2", { className: "text-base sm:text-lg font-bold text-slate-900", children: "L\u01B0u \u0110\u1ED3 Ch\u1EA9n \u0110o\xE1n T\u01B0\u01A1ng T\xE1c T\u1EEBng B\u01B0\u1EDBc (Interactive Decision Flowchart)" })] }), a.jsx("p", { className: "text-xs text-slate-600", children: "B\u1EA5m ch\u1ECDn t\u1EEBng n\u1EA5c c\xE2u h\u1ECFi l\xE2m s\xE0ng \u0111\u1EC3 h\u1EC7 th\u1ED1ng t\u1EF1 \u0111\u1ED9ng \u0111i\u1EC1u h\u01B0\u1EDBng v\xE0 ch\u1EC9 d\u1EABn ch\u1EA9n \u0111o\xE1n x\xE1c \u0111\u1ECBnh c\xF9ng ph\xE1c \u0111\u1ED3 x\u1EED tr\xED" })] }), a.jsxs("div", { className: "flex items-center space-x-2 self-end sm:self-center", children: [O && a.jsxs("button", { onClick: () => O(), className: "flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 transition-colors shadow-2xs", children: [a.jsx(Je, { className: "w-3.5 h-3.5" }), a.jsx("span", { children: "Tra c\u1EE9u thu\u1EADt ng\u1EEF" })] }), a.jsxs("button", { onClick: D, className: "flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors", title: "B\u1EAFt \u0111\u1EA7u l\u1EA1i t\u1EEB B\u01B0\u1EDBc 1", children: [a.jsx(fs, { className: "w-3.5 h-3.5" }), a.jsx("span", { children: "B\u1EAFt \u0111\u1EA7u l\u1EA1i" })] })] })] }), G.length > 0 && a.jsxs("div", { className: "p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center flex-wrap gap-2 text-xs", children: [a.jsx("span", { className: "text-[11px] font-bold text-slate-400 uppercase tracking-wider", children: "L\u1ED9 tr\xECnh \u0111\xE3 ch\u1ECDn:" }), a.jsx("button", { onClick: D, className: "px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold hover:border-blue-400 hover:text-blue-700 transition-colors", children: "B\u1EAFt \u0111\u1EA7u" }), G.map((L, Y) => a.jsxs(Uh.Fragment, { children: [a.jsx(Et, { className: "w-3.5 h-3.5 text-slate-400 shrink-0" }), a.jsx("button", { onClick: () => H(Y), className: "px-2 py-0.5 rounded-md bg-blue-50 border border-blue-200 text-blue-900 font-semibold hover:bg-blue-100 transition-colors flex items-center space-x-1", title: `Quay l\u1EA1i b\u01B0\u1EDBc: ${L.title}`, children: a.jsx("span", { children: L.chosenOptionLabel }) })] }, Y)), R && a.jsxs(a.Fragment, { children: [a.jsx(Et, { className: "w-3.5 h-3.5 text-slate-400 shrink-0" }), a.jsx("span", { className: "px-2 py-0.5 rounded-md bg-emerald-100 border border-emerald-300 text-emerald-900 font-bold", children: R.name })] })] }), g === "start" && a.jsxs("div", { className: "space-y-4 animate-in fade-in duration-200", children: [a.jsxs("div", { className: "p-4 rounded-xl bg-blue-50/80 border border-blue-200 space-y-1", children: [a.jsxs("div", { className: "flex items-center space-x-2", children: [a.jsx("span", { className: "w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center", children: "1" }), a.jsx("h3", { className: "text-sm sm:text-base font-bold text-blue-950", children: "B\u01B0\u1EDBc 1: N\u1ED3ng \u0110\u1ED9 pH M\xE1u \u0110\u1ED9ng M\u1EA1ch R\u01A1i V\xE0o Kho\u1EA3ng N\xE0o?" })] }), a.jsxs("p", { className: "text-xs text-blue-800 pl-8", children: ["M\u1ED1c sinh l\xFD b\xECnh th\u01B0\u1EDDng chu\u1EA9n l\xE0 ", a.jsx("strong", { children: "7.35 \u2013 7.45" }), " (t\u01B0\u01A1ng \u0111\u01B0\u01A1ng [H\u207A] 35 \u2013 45 nmol/L)."] })] }), a.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1", children: [a.jsxs("div", { onClick: () => p("\u0110\xE1nh gi\xE1 pH m\xE1u", "pH < 7.35 (Toan m\xE1u)", "step-acid-primary"), className: "p-4 rounded-xl border-2 border-rose-200 bg-rose-50/40 hover:bg-rose-50 hover:border-rose-400 cursor-pointer transition-all space-y-2 group shadow-2xs hover:shadow-xs", children: [a.jsxs("div", { className: "flex items-center justify-between", children: [a.jsx("span", { className: "px-2 py-0.5 rounded text-[10px] font-bold bg-rose-200 text-rose-800", children: "Toan M\xE1u (Acidaemia)" }), a.jsx(Et, { className: "w-4 h-4 text-rose-400 group-hover:translate-x-1 transition-transform" })] }), a.jsx("div", { className: "text-base font-bold text-rose-950", children: "pH < 7.35" }), a.jsx("p", { className: "text-xs text-slate-600 leading-relaxed", children: "N\u1ED3ng \u0111\u1ED9 [H\u207A] > 45 nmol/L. C\u01A1 th\u1EC3 \u0111ang nhi\u1EC5m toan m\xE1u. C\u1EA7n x\xE1c \u0111\u1ECBnh ngu\u1ED3n g\u1ED1c toan do h\xF4 h\u1EA5p (PaCO\u2082) hay do chuy\u1EC3n h\xF3a (HCO\u2083\u207B)." })] }), a.jsxs("div", { onClick: () => p("\u0110\xE1nh gi\xE1 pH m\xE1u", "pH 7.35 - 7.45 (B\xECnh th\u01B0\u1EDDng)", "step-normal-ph-check"), className: "p-4 rounded-xl border-2 border-emerald-200 bg-emerald-50/40 hover:bg-emerald-50 hover:border-emerald-400 cursor-pointer transition-all space-y-2 group shadow-2xs hover:shadow-xs", children: [a.jsxs("div", { className: "flex items-center justify-between", children: [a.jsx("span", { className: "px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-200 text-emerald-800", children: "pH B\xECnh Th\u01B0\u1EDDng" }), a.jsx(Et, { className: "w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" })] }), a.jsx("div", { className: "text-base font-bold text-emerald-950", children: "pH 7.35 \u2013 7.45" }), a.jsx("p", { className: "text-xs text-slate-600 leading-relaxed", children: "pH n\u1EB1m trong d\u1EA3i sinh l\xFD. C\u1EA7n ki\u1EC3m tra xem c\xF3 ho\xE0n to\xE0n b\xECnh th\u01B0\u1EDDng hay l\xE0 \u0111\xE3 b\xF9 tr\u1EEB to\xE0n ph\u1EA7n / r\u1ED1i lo\u1EA1n h\u1ED7n h\u1EE3p." })] }), a.jsxs("div", { onClick: () => p("\u0110\xE1nh gi\xE1 pH m\xE1u", "pH > 7.45 (Ki\u1EC1m m\xE1u)", "step-alk-primary"), className: "p-4 rounded-xl border-2 border-purple-200 bg-purple-50/40 hover:bg-purple-50 hover:border-purple-400 cursor-pointer transition-all space-y-2 group shadow-2xs hover:shadow-xs", children: [a.jsxs("div", { className: "flex items-center justify-between", children: [a.jsx("span", { className: "px-2 py-0.5 rounded text-[10px] font-bold bg-purple-200 text-purple-800", children: "Ki\u1EC1m M\xE1u (Alkalaemia)" }), a.jsx(Et, { className: "w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" })] }), a.jsx("div", { className: "text-base font-bold text-purple-950", children: "pH > 7.45" }), a.jsx("p", { className: "text-xs text-slate-600 leading-relaxed", children: "N\u1ED3ng \u0111\u1ED9 [H\u207A] < 35 nmol/L. C\u01A1 th\u1EC3 \u0111ang nhi\u1EC5m ki\u1EC1m m\xE1u. C\u1EA7n ki\u1EC3m tra PaCO\u2082 gi\u1EA3m (h\xF4 h\u1EA5p) hay HCO\u2083\u207B t\u0103ng (chuy\u1EC3n h\xF3a)." })] })] })] }), g === "step-acid-primary" && a.jsxs("div", { className: "space-y-4 animate-in fade-in duration-200", children: [a.jsxs("div", { className: "p-4 rounded-xl bg-rose-50 border border-rose-200 space-y-1", children: [a.jsxs("div", { className: "flex items-center space-x-2", children: [a.jsx("span", { className: "w-6 h-6 rounded-full bg-rose-600 text-white text-xs font-bold flex items-center justify-center", children: "2" }), a.jsx("h3", { className: "text-sm sm:text-base font-bold text-rose-950", children: "B\u01B0\u1EDBc 2: T\xECm Nguy\xEAn Nh\xE2n G\xE2y Toan (Nh\xECn v\xE0o PaCO\u2082 & HCO\u2083\u207B)" })] }), a.jsx("p", { className: "text-xs text-rose-800 pl-8", children: "Ch\u1EC9 s\u1ED1 n\xE0o thay \u0111\u1ED5i ph\xF9 h\u1EE3p v\u1EDBi vi\u1EC7c h\u1EA1 pH? PaCO\u2082 t\u0103ng > 45 mmHg (Toan h\xF4 h\u1EA5p) hay HCO\u2083\u207B gi\u1EA3m < 22 mmol/L (Toan chuy\u1EC3n h\xF3a)?" })] }), a.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1", children: [a.jsxs("div", { onClick: () => p("C\u01A1 ch\u1EBF g\xE2y toan", "PaCO\u2082 > 45 mmHg (Toan H\xF4 H\u1EA5p)", "step-resp-acid-chronicity"), className: "p-4 rounded-xl border-2 border-slate-200 hover:border-blue-500 bg-white hover:bg-blue-50/30 cursor-pointer transition-all space-y-2 group shadow-2xs hover:shadow-xs", children: [a.jsxs("div", { className: "flex items-center justify-between", children: [a.jsx("span", { className: "px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800", children: "H\xF4 H\u1EA5p (PaCO\u2082)" }), a.jsx(Et, { className: "w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-transform" })] }), a.jsx("div", { className: "text-sm font-bold text-slate-900", children: "PaCO\u2082 T\u0102NG CAO (> 45 mmHg)" }), a.jsx("p", { className: "text-xs text-slate-600 leading-relaxed", children: "\u1EE8 tr\u1EC7 kh\xED CO\u2082 do gi\u1EA3m th\xF4ng kh\xED ph\u1EBF nang to\xE0n th\u1EC3. Ti\u1EBFp t\u1EE5c ki\u1EC3m tra HCO\u2083\u207B \u0111\u1EC3 ph\xE2n bi\u1EC7t C\u1EA5p t\xEDnh vs M\u1EA1n t\xEDnh vs Toan h\u1ED7n h\u1EE3p." })] }), a.jsxs("div", { onClick: () => p("C\u01A1 ch\u1EBF g\xE2y toan", "HCO\u2083\u207B < 22 mmol/L (Toan Chuy\u1EC3n H\xF3a)", "step-metabolic-acid-ag"), className: "p-4 rounded-xl border-2 border-slate-200 hover:border-rose-500 bg-white hover:bg-rose-50/30 cursor-pointer transition-all space-y-2 group shadow-2xs hover:shadow-xs", children: [a.jsxs("div", { className: "flex items-center justify-between", children: [a.jsx("span", { className: "px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800", children: "Chuy\u1EC3n H\xF3a (HCO\u2083\u207B / BE)" }), a.jsx(Et, { className: "w-4 h-4 text-slate-400 group-hover:text-rose-600 group-hover:translate-x-1 transition-transform" })] }), a.jsx("div", { className: "text-sm font-bold text-slate-900", children: "HCO\u2083\u207B GI\u1EA2M (< 22 mmol/L) & BE \xC2m (< -2)" }), a.jsx("p", { className: "text-xs text-slate-600 leading-relaxed", children: "M\u1EA5t \u0111\u1EC7m baz\u01A1 ho\u1EB7c t\xEDch t\u1EE5 acid c\u1ED1 \u0111\u1ECBnh. PaCO\u2082 c\xF3 th\u1EC3 gi\u1EA3m b\xF9 tr\u1EEB. Ti\u1EBFp t\u1EE5c t\xEDnh Kho\u1EA3ng tr\u1ED1ng Anion (Anion Gap)." })] }), a.jsxs("div", { onClick: () => p("C\u01A1 ch\u1EBF g\xE2y toan", "PaCO\u2082 t\u0103ng V\xC0 HCO\u2083\u207B gi\u1EA3m (Toan H\u1ED7n H\u1EE3p)", "diagnosis", U), className: "p-4 rounded-xl border-2 border-rose-300 hover:border-rose-700 bg-rose-100/50 hover:bg-rose-100 cursor-pointer transition-all space-y-2 group shadow-2xs hover:shadow-xs", children: [a.jsxs("div", { className: "flex items-center justify-between", children: [a.jsx("span", { className: "px-2 py-0.5 rounded text-[10px] font-bold bg-rose-800 text-white", children: "Nguy k\u1ECBch t\u1ED1i c\u1EA5p" }), a.jsx(Et, { className: "w-4 h-4 text-rose-600 group-hover:translate-x-1 transition-transform" })] }), a.jsx("div", { className: "text-sm font-bold text-rose-950", children: "PaCO\u2082 > 45 V\xC0 HCO\u2083\u207B < 22 \u0110\u1ED2NG TH\u1EDCI!" }), a.jsx("p", { className: "text-xs text-rose-900 leading-relaxed font-medium", children: "C\u1EA3 2 c\u01A1 ch\u1EBF \u0111\u1EC1u g\xE2y toan, kh\xF4ng c\xF3 b\xF9 tr\u1EEB. Toan h\u1ED7n h\u1EE3p \u0111e d\u1ECDa ng\u1EEBng tim!" })] })] })] }), g === "step-resp-acid-chronicity" && a.jsxs("div", { className: "space-y-4 animate-in fade-in duration-200", children: [a.jsxs("div", { className: "p-4 rounded-xl bg-blue-50 border border-blue-200 space-y-1", children: [a.jsxs("div", { className: "flex items-center space-x-2", children: [a.jsx("span", { className: "w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center", children: "3" }), a.jsx("h3", { className: "text-sm sm:text-base font-bold text-blue-950", children: "B\u01B0\u1EDBc 3: Toan H\xF4 H\u1EA5p C\u1EA5p T\xEDnh Hay \u0110\xE3 C\xF3 B\xF9 Tr\u1EEB M\u1EA1n T\xEDnh?" })] }), a.jsx("p", { className: "text-xs text-blue-800 pl-8", children: "Quan s\xE1t n\u1ED3ng \u0111\u1ED9 Bicarbonate (HCO\u2083\u207B) v\xE0 Base Excess (BE) \u0111\u1EC3 xem th\u1EADn \u0111\xE3 k\u1ECBp gi\u1EEF ki\u1EC1m l\u1EA1i hay ch\u01B0a." })] }), a.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1", children: [a.jsxs("div", { onClick: () => p("Di\u1EC5n ti\u1EBFn toan h\xF4 h\u1EA5p", "HCO\u2083\u207B b\xECnh th\u01B0\u1EDDng (Toan H\xF4 H\u1EA5p C\u1EA5p)", "diagnosis", y), className: "p-4 rounded-xl border-2 border-slate-200 hover:border-rose-500 bg-white hover:bg-rose-50/40 cursor-pointer transition-all space-y-2 group shadow-2xs hover:shadow-xs", children: [a.jsxs("div", { className: "flex items-center justify-between", children: [a.jsx("span", { className: "px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800", children: "C\u1EA5p T\xEDnh" }), a.jsx(Et, { className: "w-4 h-4 text-slate-400 group-hover:text-rose-600 group-hover:translate-x-1 transition-transform" })] }), a.jsx("div", { className: "text-sm font-bold text-slate-900", children: "HCO\u2083\u207B B\xECnh Th\u01B0\u1EDDng (22 \u2013 26 mmol/L)" }), a.jsx("p", { className: "text-xs text-slate-600 leading-relaxed", children: "M\u1EDBi x\u1EA3y ra v\xE0i ph\xFAt \u0111\u1EBFn v\xE0i gi\u1EDD (ng\u1ED9 \u0111\u1ED9c morphin, co th\u1EAFt ph\u1EBF qu\u1EA3n, d\u1ECB v\u1EADt). Th\u1EADn ch\u01B0a k\u1ECBp b\xF9 tr\u1EEB." })] }), a.jsxs("div", { onClick: () => p("Di\u1EC5n ti\u1EBFn toan h\xF4 h\u1EA5p", "HCO\u2083\u207B t\u0103ng cao, pH g\u1EA7n chu\u1EA9n (Toan H\xF4 H\u1EA5p M\u1EA1n)", "diagnosis", j), className: "p-4 rounded-xl border-2 border-slate-200 hover:border-emerald-500 bg-white hover:bg-emerald-50/40 cursor-pointer transition-all space-y-2 group shadow-2xs hover:shadow-xs", children: [a.jsxs("div", { className: "flex items-center justify-between", children: [a.jsx("span", { className: "px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800", children: "M\u1EA1n T\xEDnh" }), a.jsx(Et, { className: "w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-transform" })] }), a.jsx("div", { className: "text-sm font-bold text-slate-900", children: "HCO\u2083\u207B T\u0102NG CAO (> 28 mmol/L) & pH 7.35 \u2013 7.39" }), a.jsx("p", { className: "text-xs text-slate-600 leading-relaxed", children: "K\xE9o d\xE0i nhi\u1EC1u th\xE1ng/n\u0103m (COPD m\u1EA1n). Th\u1EADn \u0111\xE3 gi\u1EEF l\u01B0\u1EE3ng l\u1EDBn ki\u1EC1m \u0111\u01B0a pH v\u1EC1 g\u1EA7n m\u1EE9c b\xECnh th\u01B0\u1EDDng." })] }), a.jsxs("div", { onClick: () => p("Di\u1EC5n ti\u1EBFn toan h\xF4 h\u1EA5p", "HCO\u2083\u207B t\u0103ng cao NH\u01AFNG pH < 7.35 (\u0110\u1EE3t c\u1EA5p tr\xEAn n\u1EC1n m\u1EA1n)", "diagnosis", T), className: "p-4 rounded-xl border-2 border-slate-200 hover:border-amber-500 bg-white hover:bg-amber-50/40 cursor-pointer transition-all space-y-2 group shadow-2xs hover:shadow-xs", children: [a.jsxs("div", { className: "flex items-center justify-between", children: [a.jsx("span", { className: "px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800", children: "C\u1EA5p tr\xEAn n\u1EC1n m\u1EA1n" }), a.jsx(Et, { className: "w-4 h-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-transform" })] }), a.jsx("div", { className: "text-sm font-bold text-slate-900", children: "HCO\u2083\u207B T\u0102NG (> 28) NH\u01AFNG pH < 7.35" }), a.jsx("p", { className: "text-xs text-slate-600 leading-relaxed", children: "\u0110\u1EE3t c\u1EA5p COPD m\u1EA5t b\xF9: C\xF3 s\u1EB5n b\xF9 tr\u1EEB m\u1EA1n nh\u01B0ng PaCO\u2082 t\u0103ng v\u1ECDt th\xEAm l\xE0m toan h\xF3a m\xE1u tr\u1EDF l\u1EA1i!" })] })] })] }), g === "step-metabolic-acid-ag" && a.jsxs("div", { className: "space-y-4 animate-in fade-in duration-200", children: [a.jsxs("div", { className: "p-4 rounded-xl bg-rose-50 border border-rose-200 space-y-1", children: [a.jsxs("div", { className: "flex items-center space-x-2", children: [a.jsx("span", { className: "w-6 h-6 rounded-full bg-rose-600 text-white text-xs font-bold flex items-center justify-center", children: "3" }), a.jsx("h3", { className: "text-sm sm:text-base font-bold text-rose-950", children: "B\u01B0\u1EDBc 3: T\xEDnh Kho\u1EA3ng Tr\u1ED1ng Anion (Anion Gap = Na\u207A - [Cl\u207B + HCO\u2083\u207B])" })] }), a.jsxs("p", { className: "text-xs text-rose-800 pl-8", children: ["Gi\xE1 tr\u1ECB Anion Gap b\xECnh th\u01B0\u1EDDng l\xE0 ", a.jsx("strong", { children: "8 \u2013 16 mEq/L" }), " (ho\u1EB7c 12 \xB1 4). \u0110\xE2y l\xE0 b\u01B0\u1EDBc ph\xE2n lo\u1EA1i t\u1ED1i quan tr\u1ECDng \u0111\u1EC3 t\xECm nguy\xEAn nh\xE2n g\u1ED1c r\u1EC5."] })] }), a.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1", children: [a.jsxs("div", { onClick: () => p("Ph\xE2n lo\u1EA1i Anion Gap", "Anion Gap T\u0102NG > 16 (GOLDMARK)", "diagnosis", _), className: "p-5 rounded-xl border-2 border-slate-200 hover:border-rose-500 bg-white hover:bg-rose-50/40 cursor-pointer transition-all space-y-2.5 group shadow-2xs hover:shadow-xs", children: [a.jsxs("div", { className: "flex items-center justify-between", children: [a.jsx("span", { className: "px-2 py-0.5 rounded text-[10px] font-bold bg-rose-200 text-rose-800", children: "T\u0102NG Anion Gap (> 16 mEq/L)" }), a.jsx(Et, { className: "w-4 h-4 text-slate-400 group-hover:text-rose-600 group-hover:translate-x-1 transition-transform" })] }), a.jsx("div", { className: "text-base font-bold text-slate-900", children: "Toan T\u0103ng Anion Gap (GOLDMARK / MUDPILES)" }), a.jsx("p", { className: "text-xs text-slate-600 leading-relaxed", children: "C\xF3 s\u1EF1 xu\u1EA5t hi\u1EC7n c\u1EE7a acid h\u1EEFu c\u01A1 c\u1ED1 \u0111\u1ECBnh l\u1EA1: Toan Lactic, DKA \u0111\xE1i th\xE1o \u0111\u01B0\u1EDDng, Suy th\u1EADn ure m\xE1u, Ng\u1ED9 \u0111\u1ED9c Methanol, Ethylene glycol, Salicylate." }), a.jsx("div", { className: "text-[11px] text-rose-700 font-semibold", children: "\u2192 B\u01B0\u1EDBc k\u1EBF ti\u1EBFp: T\xEDnh Delta Ratio (\u0394AG / \u0394HCO\u2083\u207B) v\xE0 PaCO\u2082 k\u1EF3 v\u1ECDng (Winter)." })] }), a.jsxs("div", { onClick: () => p("Ph\xE2n lo\u1EA1i Anion Gap", "Anion Gap B\xCCNH TH\u01AF\u1EDCNG (HARDUPS / T\u0103ng Clo)", "diagnosis", P), className: "p-5 rounded-xl border-2 border-slate-200 hover:border-amber-500 bg-white hover:bg-amber-50/40 cursor-pointer transition-all space-y-2.5 group shadow-2xs hover:shadow-xs", children: [a.jsxs("div", { className: "flex items-center justify-between", children: [a.jsx("span", { className: "px-2 py-0.5 rounded text-[10px] font-bold bg-amber-200 text-amber-800", children: "Anion Gap B\xECnh Th\u01B0\u1EDDng (8 \u2013 16 mEq/L)" }), a.jsx(Et, { className: "w-4 h-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-transform" })] }), a.jsx("div", { className: "text-base font-bold text-slate-900", children: "Toan Anion Gap B\xECnh Th\u01B0\u1EDDng / T\u0103ng Clo M\xE1u (HARDUPS)" }), a.jsx("p", { className: "text-xs text-slate-600 leading-relaxed", children: "M\u1EA5t ion Bicarbonate qua ti\xEAu h\xF3a ho\u1EB7c qua th\u1EADn, \u0111\u01B0\u1EE3c thay th\u1EBF b\u1EB1ng ion Clo: Ti\xEAu ch\u1EA3y c\u1EA5p, Toan h\xF3a \u1ED1ng th\u1EADn (RTA), Truy\u1EC1n nhi\u1EC1u d\u1ECBch NaCl 0.9%." }), a.jsx("div", { className: "text-[11px] text-amber-700 font-semibold", children: "\u2192 B\u01B0\u1EDBc k\u1EBF ti\u1EBFp: \u0110o Anion Gap n\u01B0\u1EDBc ti\u1EC3u \u0111\u1EC3 ph\xE2n bi\u1EC7t do th\u1EADn vs do ti\xEAu h\xF3a." })] })] })] }), g === "step-alk-primary" && a.jsxs("div", { className: "space-y-4 animate-in fade-in duration-200", children: [a.jsxs("div", { className: "p-4 rounded-xl bg-purple-50 border border-purple-200 space-y-1", children: [a.jsxs("div", { className: "flex items-center space-x-2", children: [a.jsx("span", { className: "w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center", children: "2" }), a.jsx("h3", { className: "text-sm sm:text-base font-bold text-purple-950", children: "B\u01B0\u1EDBc 2: T\xECm Nguy\xEAn Nh\xE2n G\xE2y Ki\u1EC1m (Nh\xECn v\xE0o PaCO\u2082 & HCO\u2083\u207B)" })] }), a.jsx("p", { className: "text-xs text-purple-800 pl-8", children: "Ch\u1EC9 s\u1ED1 n\xE0o gi\u1EA3i th\xEDch \u0111\u01B0\u1EE3c \u0111\u1ED9 ki\u1EC1m? PaCO\u2082 gi\u1EA3m < 35 mmHg (Ki\u1EC1m h\xF4 h\u1EA5p) hay HCO\u2083\u207B t\u0103ng > 26 mmol/L (Ki\u1EC1m chuy\u1EC3n h\xF3a)?" })] }), a.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1", children: [a.jsxs("div", { onClick: () => p("C\u01A1 ch\u1EBF g\xE2y ki\u1EC1m", "PaCO\u2082 < 35 mmHg (Ki\u1EC1m H\xF4 H\u1EA5p)", "step-resp-alk-chronicity"), className: "p-4 rounded-xl border-2 border-slate-200 hover:border-blue-500 bg-white hover:bg-blue-50/30 cursor-pointer transition-all space-y-2 group shadow-2xs hover:shadow-xs", children: [a.jsxs("div", { className: "flex items-center justify-between", children: [a.jsx("span", { className: "px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800", children: "H\xF4 H\u1EA5p (PaCO\u2082)" }), a.jsx(Et, { className: "w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-transform" })] }), a.jsx("div", { className: "text-sm font-bold text-slate-900", children: "PaCO\u2082 GI\u1EA2M D\u01AF\u1EDAI 35 mmHg" }), a.jsx("p", { className: "text-xs text-slate-600 leading-relaxed", children: "T\u0103ng th\xF4ng kh\xED ph\u1EBF nang \u0111\xE0o th\u1EA3i qu\xE1 m\u1EE9c CO\u2082 (c\u01A1n ho\u1EA3ng lo\u1EA1n, \u0111au, s\u1ED1t, thuy\xEAn t\u1EAFc ph\u1ED5i giai \u0111o\u1EA1n s\u1EDBm)." })] }), a.jsxs("div", { onClick: () => p("C\u01A1 ch\u1EBF g\xE2y ki\u1EC1m", "HCO\u2083\u207B > 26 mmol/L (Ki\u1EC1m Chuy\u1EC3n H\xF3a)", "step-metabolic-alk-chloride"), className: "p-4 rounded-xl border-2 border-slate-200 hover:border-purple-500 bg-white hover:bg-purple-50/30 cursor-pointer transition-all space-y-2 group shadow-2xs hover:shadow-xs", children: [a.jsxs("div", { className: "flex items-center justify-between", children: [a.jsx("span", { className: "px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800", children: "Chuy\u1EC3n H\xF3a (HCO\u2083\u207B / BE)" }), a.jsx(Et, { className: "w-4 h-4 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-transform" })] }), a.jsx("div", { className: "text-sm font-bold text-slate-900", children: "HCO\u2083\u207B T\u0102NG (> 26 mmol/L) & BE > +3" }), a.jsx("p", { className: "text-xs text-slate-600 leading-relaxed", children: "Th\u1EEBa g\u1ED1c ki\u1EC1m ho\u1EB7c m\u1EA5t d\u1ECBch d\u1EA1 d\xE0y (n\xF4n \xF3i, thu\u1ED1c l\u1EE3i ti\u1EC3u, c\u01B0\u1EDDng aldosterone). Ti\u1EBFp t\u1EE5c ki\u1EC3m tra \u0111\xE1p \u1EE9ng Clo ni\u1EC7u." })] }), a.jsxs("div", { onClick: () => p("C\u01A1 ch\u1EBF g\xE2y ki\u1EC1m", "PaCO\u2082 gi\u1EA3m V\xC0 HCO\u2083\u207B t\u0103ng (Ki\u1EC1m H\u1ED7n H\u1EE3p)", "diagnosis", gt), className: "p-4 rounded-xl border-2 border-indigo-300 hover:border-indigo-700 bg-indigo-100/50 hover:bg-indigo-100 cursor-pointer transition-all space-y-2 group shadow-2xs hover:shadow-xs", children: [a.jsxs("div", { className: "flex items-center justify-between", children: [a.jsx("span", { className: "px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-800 text-white", children: "Ki\u1EC1m n\u1EB7ng" }), a.jsx(Et, { className: "w-4 h-4 text-indigo-600 group-hover:translate-x-1 transition-transform" })] }), a.jsx("div", { className: "text-sm font-bold text-indigo-950", children: "PaCO\u2082 < 35 V\xC0 HCO\u2083\u207B > 26 \u0110\u1ED2NG TH\u1EDCI!" }), a.jsx("p", { className: "text-xs text-indigo-900 leading-relaxed font-medium", children: "Ki\u1EC1m h\u1ED7n h\u1EE3p nguy hi\u1EC3m! Nguy c\u01A1 lo\u1EA1n nh\u1ECBp tim tr\u01A1, co gi\u1EADt v\xE0 t\u1EE5t oxy m\xF4 do Hb gi\u1EEF ch\u1EB7t O\u2082." })] })] })] }), g === "step-resp-alk-chronicity" && a.jsxs("div", { className: "space-y-4 animate-in fade-in duration-200", children: [a.jsxs("div", { className: "p-4 rounded-xl bg-blue-50 border border-blue-200 space-y-1", children: [a.jsxs("div", { className: "flex items-center space-x-2", children: [a.jsx("span", { className: "w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center", children: "3" }), a.jsx("h3", { className: "text-sm sm:text-base font-bold text-blue-950", children: "B\u01B0\u1EDBc 3: Ki\u1EC1m H\xF4 H\u1EA5p C\u1EA5p T\xEDnh Hay M\u1EA1n T\xEDnh C\xF3 Th\u1EADn B\xF9 Tr\u1EEB?" })] }), a.jsx("p", { className: "text-xs text-blue-800 pl-8", children: "Ki\u1EC3m tra n\u1ED3ng \u0111\u1ED9 Bicarbonate (HCO\u2083\u207B) huy\u1EBFt t\u01B0\u01A1ng \u0111\u1EC3 x\xE1c \u0111\u1ECBnh th\u1EDDi gian di\u1EC5n ti\u1EBFn." })] }), a.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1", children: [a.jsxs("div", { onClick: () => p("Di\u1EC5n ti\u1EBFn ki\u1EC1m h\xF4 h\u1EA5p", "HCO\u2083\u207B b\xECnh th\u01B0\u1EDDng (Ki\u1EC1m H\xF4 H\u1EA5p C\u1EA5p)", "diagnosis", nt), className: "p-5 rounded-xl border-2 border-slate-200 hover:border-blue-500 bg-white hover:bg-blue-50/40 cursor-pointer transition-all space-y-2 group shadow-2xs hover:shadow-xs", children: [a.jsxs("div", { className: "flex items-center justify-between", children: [a.jsx("span", { className: "px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800", children: "C\u1EA5p T\xEDnh" }), a.jsx(Et, { className: "w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-transform" })] }), a.jsx("div", { className: "text-base font-bold text-slate-900", children: "HCO\u2083\u207B B\xECnh Th\u01B0\u1EDDng (22 \u2013 26 mmol/L)" }), a.jsx("p", { className: "text-xs text-slate-600 leading-relaxed", children: "Di\u1EC5n ti\u1EBFn c\u1EA5p t\xEDnh m\u1EDBi xu\u1EA5t hi\u1EC7n (c\u01A1n panic ho\u1EA3ng lo\u1EA1n, \u0111au \u0111\u1EDBn, s\u1ED1t, thuy\xEAn t\u1EAFc ph\u1ED5i s\u1EDBm). Th\u1EADn ch\u01B0a k\u1ECBp \u0111\xE0o th\u1EA3i bicarb." })] }), a.jsxs("div", { onClick: () => p("Di\u1EC5n ti\u1EBFn ki\u1EC1m h\xF4 h\u1EA5p", "HCO\u2083\u207B gi\u1EA3m b\xF9 tr\u1EEB (Ki\u1EC1m H\xF4 H\u1EA5p M\u1EA1n)", "diagnosis", ht), className: "p-5 rounded-xl border-2 border-slate-200 hover:border-indigo-500 bg-white hover:bg-indigo-50/40 cursor-pointer transition-all space-y-2 group shadow-2xs hover:shadow-xs", children: [a.jsxs("div", { className: "flex items-center justify-between", children: [a.jsx("span", { className: "px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-800", children: "M\u1EA1n T\xEDnh \u0110\xE3 B\xF9" }), a.jsx(Et, { className: "w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-transform" })] }), a.jsx("div", { className: "text-base font-bold text-slate-900", children: "HCO\u2083\u207B GI\u1EA2M B\xD9 TR\u1EEA (< 20 mmol/L)" }), a.jsx("p", { className: "text-xs text-slate-600 leading-relaxed", children: "T\u0103ng th\xF4ng kh\xED m\u1EA1n t\xEDnh k\xE9o d\xE0i (ph\u1EE5 n\u1EEF mang thai, s\u1ED1ng \u1EDF v\xF9ng cao, x\u01A1 gan ti\u1EBFn tri\u1EC3n). Th\u1EADn \u0111\xE3 \u0111\xE0o th\u1EA3i bicarb \u0111\u1EC3 h\u1EA1 pH v\u1EC1 g\u1EA7n chu\u1EA9n." })] })] })] }), g === "step-metabolic-alk-chloride" && a.jsxs("div", { className: "space-y-4 animate-in fade-in duration-200", children: [a.jsxs("div", { className: "p-4 rounded-xl bg-purple-50 border border-purple-200 space-y-1", children: [a.jsxs("div", { className: "flex items-center space-x-2", children: [a.jsx("span", { className: "w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center", children: "3" }), a.jsx("h3", { className: "text-sm sm:text-base font-bold text-purple-950", children: "B\u01B0\u1EDBc 3: \u0110\xE1nh Gi\xE1 N\u1ED3ng \u0110\u1ED9 Clorid N\u01B0\u1EDBc Ti\u1EC3u (Urine Chloride)" })] }), a.jsx("p", { className: "text-xs text-purple-800 pl-8", children: "Ki\u1EC1m chuy\u1EC3n h\xF3a nh\u1EA1y Clorid (\u0111\xE1p \u1EE9ng v\u1EDBi truy\u1EC1n d\u1ECBch NaCl 0.9%) hay kh\xE1ng Clorid (th\u1EEBa mineralocorticoid)?" })] }), a.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1", children: [a.jsxs("div", { onClick: () => p("\u0110\xE1p \u1EE9ng Clorid", "Clo ni\u1EC7u < 15-20 (Nh\u1EA1y Clorid / M\u1EA5t d\u1ECBch)", "diagnosis", B), className: "p-5 rounded-xl border-2 border-slate-200 hover:border-purple-500 bg-white hover:bg-purple-50/40 cursor-pointer transition-all space-y-2 group shadow-2xs hover:shadow-xs", children: [a.jsxs("div", { className: "flex items-center justify-between", children: [a.jsx("span", { className: "px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800", children: "U_Cl < 15 \u2013 20 mEq/L" }), a.jsx(Et, { className: "w-4 h-4 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-transform" })] }), a.jsx("div", { className: "text-base font-bold text-slate-900", children: "Nh\u1EA1y Clorid (Chloride-Responsive / Gi\u1EA3m th\u1EC3 t\xEDch)" }), a.jsx("p", { className: "text-xs text-slate-600 leading-relaxed", children: "M\u1EA5t d\u1ECBch v\u1ECB do n\xF4n \xF3i nhi\u1EC1u, h\xFAt d\u1ECBch d\u1EA1 d\xE0y li\xEAn t\u1EE5c, s\u1EED d\u1EE5ng thu\u1ED1c l\u1EE3i ti\u1EC3u quai. H\u1ED3i ph\u1EE5c ngo\u1EA1n m\u1EE5c khi b\xF9 NaCl 0.9% v\xE0 KCl!" })] }), a.jsxs("div", { onClick: () => p("\u0110\xE1p \u1EE9ng Clorid", "Clo ni\u1EC7u > 25 (Kh\xE1ng Clorid / Th\u1EEBa Aldosterone)", "diagnosis", tt), className: "p-5 rounded-xl border-2 border-slate-200 hover:border-rose-500 bg-white hover:bg-rose-50/40 cursor-pointer transition-all space-y-2 group shadow-2xs hover:shadow-xs", children: [a.jsxs("div", { className: "flex items-center justify-between", children: [a.jsx("span", { className: "px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800", children: "U_Cl > 25 mEq/L" }), a.jsx(Et, { className: "w-4 h-4 text-slate-400 group-hover:text-rose-600 group-hover:translate-x-1 transition-transform" })] }), a.jsx("div", { className: "text-base font-bold text-slate-900", children: "Kh\xE1ng Clorid (Chloride-Resistant / Qu\xE1 t\u1EA3i Aldosterone)" }), a.jsx("p", { className: "text-xs text-slate-600 leading-relaxed", children: "H\u1ED9i ch\u1EE9ng Conn (u v\u1ECF th\u01B0\u1EE3ng th\u1EADn), d\xF9ng corticoid li\u1EC1u cao, h\u1EB9p \u0111\u1ED9ng m\u1EA1ch th\u1EADn. Th\u01B0\u1EDDng k\xE8m t\u0103ng huy\u1EBFt \xE1p v\xE0 h\u1EA1 kali m\xE1u n\u1EB7ng." })] })] })] }), g === "step-normal-ph-check" && a.jsxs("div", { className: "space-y-4 animate-in fade-in duration-200", children: [a.jsxs("div", { className: "p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1", children: [a.jsxs("div", { className: "flex items-center space-x-2", children: [a.jsx("span", { className: "w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center", children: "2" }), a.jsx("h3", { className: "text-sm sm:text-base font-bold text-emerald-950", children: "B\u01B0\u1EDBc 2: Ki\u1EC3m Tra PaCO\u2082 V\xE0 HCO\u2083\u207B Khi pH \u1EDE M\u1EE9c B\xECnh Th\u01B0\u1EDDng" })] }), a.jsxs("p", { className: "text-xs text-emerald-800 pl-8", children: ["Quy t\u1EAFc v\xE0ng: pH b\xECnh th\u01B0\u1EDDng ", a.jsx("strong", { children: "KH\xD4NG" }), " \u0111\u1ED3ng ngh\u0129a v\u1EDBi kh\xED m\xE1u b\xECnh th\u01B0\u1EDDng! C\u1EA7n ki\u1EC3m tra xem c\xF3 r\u1ED1i lo\u1EA1n \u0111\xE3 \u0111\u01B0\u1EE3c b\xF9 tr\u1EEB ho\xE0n to\xE0n kh\xF4ng."] })] }), a.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1", children: [a.jsxs("div", { onClick: () => p("\u0110\xE1nh gi\xE1 khi pH b\xECnh th\u01B0\u1EDDng", "C\u1EA3 PaCO\u2082 v\xE0 HCO\u2083\u207B \u0111\u1EC1u b\xECnh th\u01B0\u1EDDng", "diagnosis", C), className: "p-4 rounded-xl border-2 border-emerald-200 hover:border-emerald-500 bg-white hover:bg-emerald-50/40 cursor-pointer transition-all space-y-2 group shadow-2xs hover:shadow-xs", children: [a.jsxs("div", { className: "flex items-center justify-between", children: [a.jsx("span", { className: "px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800", children: "Ho\xE0n To\xE0n Chu\u1EA9n" }), a.jsx(Et, { className: "w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" })] }), a.jsx("div", { className: "text-sm font-bold text-slate-900", children: "PaCO\u2082 v\xE0 HCO\u2083\u207B \u0110\u1EC0U B\xCCNH TH\u01AF\u1EDCNG" }), a.jsx("p", { className: "text-xs text-slate-600 leading-relaxed", children: "PaCO\u2082 35 \u2013 45 mmHg v\xE0 HCO\u2083\u207B 22 \u2013 26 mmol/L. Kh\xF4ng c\xF3 b\u1EA5t k\u1EF3 r\u1ED1i lo\u1EA1n toan ki\u1EC1m n\xE0o." })] }), a.jsxs("div", { onClick: () => p("\u0110\xE1nh gi\xE1 khi pH b\xECnh th\u01B0\u1EDDng", "pH 7.35 - 7.39 (Nghi\xEAng Toan \u0110\xE3 B\xF9 Ho\xE0n To\xE0n)", "step-acid-primary"), className: "p-4 rounded-xl border-2 border-amber-200 hover:border-amber-500 bg-white hover:bg-amber-50/40 cursor-pointer transition-all space-y-2 group shadow-2xs hover:shadow-xs", children: [a.jsxs("div", { className: "flex items-center justify-between", children: [a.jsx("span", { className: "px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800", children: "Toan \u0110\xE3 B\xF9 To\xE0n Ph\u1EA7n" }), a.jsx(Et, { className: "w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" })] }), a.jsx("div", { className: "text-sm font-bold text-slate-900", children: "pH N\u1EB1m \u1EDE N\u1EEDa Toan (7.35 \u2013 7.39)" }), a.jsx("p", { className: "text-xs text-slate-600 leading-relaxed", children: "R\u1ED1i lo\u1EA1n toan nguy\xEAn ph\xE1t (h\xF4 h\u1EA5p ho\u1EB7c chuy\u1EC3n h\xF3a) \u0111\xE3 \u0111\u01B0\u1EE3c c\u01A1 quan \u0111\u1ED1i \u1EE9ng b\xF9 tr\u1EEB t\u1ED1i \u0111a." })] }), a.jsxs("div", { onClick: () => p("\u0110\xE1nh gi\xE1 khi pH b\xECnh th\u01B0\u1EDDng", "pH 7.41 - 7.45 (Nghi\xEAng Ki\u1EC1m \u0110\xE3 B\xF9 Ho\xE0n To\xE0n)", "step-alk-primary"), className: "p-4 rounded-xl border-2 border-blue-200 hover:border-blue-500 bg-white hover:bg-blue-50/40 cursor-pointer transition-all space-y-2 group shadow-2xs hover:shadow-xs", children: [a.jsxs("div", { className: "flex items-center justify-between", children: [a.jsx("span", { className: "px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800", children: "Ki\u1EC1m \u0110\xE3 B\xF9 To\xE0n Ph\u1EA7n" }), a.jsx(Et, { className: "w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" })] }), a.jsx("div", { className: "text-sm font-bold text-slate-900", children: "pH N\u1EB1m \u1EDE N\u1EEDa Ki\u1EC1m (7.41 \u2013 7.45)" }), a.jsx("p", { className: "text-xs text-slate-600 leading-relaxed", children: "R\u1ED1i lo\u1EA1n ki\u1EC1m nguy\xEAn ph\xE1t \u0111\xE3 \u0111\u01B0\u1EE3c c\u01A1 quan \u0111\u1ED1i \u1EE9ng b\xF9 tr\u1EEB th\xE0nh c\xF4ng \u0111\u01B0a pH v\u1EC1 m\u1EE9c an to\xE0n." })] })] })] }), g === "diagnosis" && R && a.jsxs("div", { className: "space-y-5 animate-in zoom-in-95 duration-200", children: [a.jsxs("div", { className: `p-5 rounded-2xl border-2 ${R.borderColor} ${R.bgColor} space-y-3 shadow-sm`, children: [a.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [a.jsxs("div", { className: "flex items-center space-x-2", children: [a.jsx("div", { className: "p-2 rounded-xl bg-white shadow-2xs", children: a.jsx(ha, { className: "w-5 h-5 text-blue-600" }) }), a.jsxs("div", { children: [a.jsx("span", { className: `px-2.5 py-0.5 rounded-md text-xs font-bold border ${R.badgeColor}`, children: R.severity }), a.jsx("h3", { className: "text-base sm:text-xl font-bold text-slate-950 mt-1", children: R.name }), a.jsx("div", { className: "text-xs text-slate-600 italic font-medium", children: R.englishName })] })] }), u && a.jsxs("button", { onClick: () => u(R.sampleAbg), className: "flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all hover:scale-102", children: [a.jsx(Pe, { className: "w-4 h-4" }), a.jsx("span", { children: "M\xF4 ph\u1ECFng ca n\xE0y tr\xEAn B\u1ED9 Ph\xE2n T\xEDch \u2192" })] })] }), a.jsx("p", { className: "text-xs text-slate-700 leading-relaxed font-medium", children: R.summary })] }), a.jsxs("div", { className: "p-4.5 rounded-xl bg-white border border-slate-200 space-y-1.5", children: [a.jsxs("div", { className: "font-bold text-slate-900 text-xs sm:text-sm flex items-center space-x-1.5", children: [a.jsx(xn, { className: "w-4 h-4 text-blue-600" }), a.jsx("span", { children: "C\u01A1 ch\u1EBF sinh l\xFD b\u1EC7nh h\u1ECDc (Pathophysiology):" })] }), a.jsx("p", { className: "text-xs text-slate-700 leading-relaxed pl-5.5", children: R.mechanism })] }), a.jsxs("div", { className: "p-4.5 rounded-xl bg-white border border-slate-200 space-y-2", children: [a.jsxs("div", { className: "font-bold text-slate-900 text-xs sm:text-sm flex items-center space-x-1.5", children: [a.jsx(bm, { className: "w-4 h-4 text-emerald-600" }), a.jsx("span", { children: "C\xE1c nguy\xEAn nh\xE2n l\xE2m s\xE0ng th\u01B0\u1EDDng g\u1EB7p nh\u1EA5t:" })] }), a.jsx("ul", { className: "list-disc pl-9 space-y-1 text-xs text-slate-700", children: R.etiologies.map((L, Y) => a.jsx("li", { className: "leading-relaxed", children: L }, Y)) })] }), a.jsxs("div", { className: "p-4.5 rounded-xl bg-indigo-50/70 border border-indigo-200 space-y-2", children: [a.jsxs("div", { className: "font-bold text-indigo-950 text-xs sm:text-sm flex items-center space-x-1.5", children: [a.jsx(ca, { className: "w-4 h-4 text-indigo-700" }), a.jsx("span", { children: "Ph\xE1c \u0111\u1ED3 h\xE0nh \u0111\u1ED9ng l\xE2m s\xE0ng khuy\u1EBFn c\xE1o:" })] }), a.jsx("ul", { className: "list-decimal pl-9 space-y-1.5 text-xs text-indigo-950 font-medium", children: R.actionPlan.map((L, Y) => a.jsx("li", { className: "leading-relaxed", children: L }, Y)) })] }), a.jsxs("div", { className: "p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-950 space-y-1 text-xs", children: [a.jsxs("div", { className: "font-bold flex items-center space-x-1.5 text-amber-900", children: [a.jsx(fm, { className: "w-4 h-4 text-amber-600" }), a.jsx("span", { children: "\u0110i\u1EC3m s\xE1ng y khoa & C\u1EA1m b\u1EABy c\u1EA7n tr\xE1nh (Clinical Pearls):" })] }), a.jsx("p", { className: "leading-relaxed font-medium pl-5.5", children: R.clinicalPearls })] }), a.jsxs("div", { className: "flex items-center justify-between pt-2 border-t border-slate-100", children: [a.jsxs("button", { onClick: D, className: "flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors", children: [a.jsx(fs, { className: "w-3.5 h-3.5" }), a.jsx("span", { children: "Th\u1EED m\u1ED9t nh\xE1nh ch\u1EA9n \u0111o\xE1n kh\xE1c" })] }), u && a.jsx("button", { onClick: () => u(R.sampleAbg), className: "text-xs font-bold text-blue-600 hover:text-blue-800 underline", children: "Chuy\u1EC3n sang m\xE0n h\xECnh Ph\xE2n t\xEDch Kh\xED m\xE1u \u2192" })] })] })] });
  };
  var Wx = () => a.jsxs("div", { className: "space-y-6", children: [a.jsxs("div", { className: "bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6", children: [a.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4", children: [a.jsxs("div", { children: [a.jsxs("h2", { className: "text-lg font-bold text-slate-900 flex items-center gap-2", children: [a.jsx(Jh, { className: "w-5 h-5 text-blue-600" }), a.jsx("span", { children: "Ph\u01B0\u01A1ng Ph\xE1p Ti\u1EBFp C\u1EADn 6 B\u01B0\u1EDBc \u0110\u1ECDc Kh\xED M\xE1u (The Six-Step Approach)" })] }), a.jsx("p", { className: "text-xs text-slate-600 mt-1", children: "Quy tr\xECnh ph\xE2n t\xEDch c\xF3 h\u1EC7 th\u1ED1ng \u0111\u01B0\u1EE3c chu\u1EA9n h\xF3a b\u1EDFi Donna Pierre v\xE0 c\xE1c chuy\xEAn gia H\u1ED3i s\u1EE9c c\u1EA5p c\u1EE9u, \u0111\u1EA3m b\u1EA3o kh\xF4ng b\u1ECF s\xF3t t\u1ED5n th\u01B0\u01A1ng." })] }), a.jsx("span", { className: "self-start sm:self-auto text-[11px] font-bold px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full", children: "Chu\u1EA9n Y V\u0103n L\xE2m S\xE0ng" })] }), a.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: [a.jsxs("div", { className: "p-4 rounded-xl border border-blue-200 bg-blue-50/40 space-y-2 flex flex-col justify-between", children: [a.jsxs("div", { className: "space-y-2", children: [a.jsxs("div", { className: "flex items-center justify-between", children: [a.jsx("span", { className: "w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shadow-xs", children: "1" }), a.jsx("span", { className: "text-[11px] font-bold text-blue-700 uppercase tracking-wider", children: "L\xE2m s\xE0ng" })] }), a.jsx("h3", { className: "text-sm font-bold text-slate-900", children: "Xem x\xE9t b\u1EC7nh nh\xE2n (Review Patient)" }), a.jsx("p", { className: "text-xs text-slate-600 leading-relaxed", children: "\u0110\xE1nh gi\xE1 ti\u1EC1n s\u1EED COPD, \u0111\xE1i th\xE1o \u0111\u01B0\u1EDDng, n\xF4n \xF3i, suy th\u1EADn, ng\u1ED9 \u0111\u1ED9c thu\u1ED1c hay an th\u1EA7n. Ki\u1EC3m tra d\u1EA5u hi\u1EC7u sinh t\u1ED3n, SpO\u2082 v\xE0 n\u1ED3ng \u0111\u1ED9 oxy h\xEDt v\xE0o (FiO\u2082)." })] }), a.jsx("div", { className: "text-[11px] font-semibold text-blue-900 bg-white/90 p-2 rounded-lg border border-blue-200/60 mt-2", children: '"Lu\xF4n \u0111i\u1EC1u tr\u1ECB ng\u01B0\u1EDDi b\u1EC7nh, kh\xF4ng \u0111i\u1EC1u tr\u1ECB t\u1EDD k\u1EBFt qu\u1EA3!"' })] }), a.jsxs("div", { className: "p-4 rounded-xl border border-indigo-200 bg-indigo-50/40 space-y-2 flex flex-col justify-between", children: [a.jsxs("div", { className: "space-y-2", children: [a.jsxs("div", { className: "flex items-center justify-between", children: [a.jsx("span", { className: "w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center shadow-xs", children: "2" }), a.jsx("span", { className: "text-[11px] font-bold text-indigo-700 uppercase tracking-wider", children: "Oxy h\xF3a m\xE1u" })] }), a.jsx("h3", { className: "text-sm font-bold text-slate-900", children: "Ph\xE2n t\xEDch Oxy h\xF3a (Analyse Oxygenation)" }), a.jsx("p", { className: "text-xs text-slate-600 leading-relaxed", children: "So s\xE1nh PaO\u2082 v\xE0 SaO\u2082 v\u1EDBi FiO\u2082 \u0111ang th\u1EDF. PaO\u2082 < 60 mmHg (< 8 kPa) x\xE1c \u0111\u1ECBnh suy h\xF4 h\u1EA5p gi\u1EA3m oxy m\xE1u. T\xEDnh ch\u1EC9 s\u1ED1 PaO\u2082/FiO\u2082 (P/F ratio) v\xE0 A-a gradient." })] }), a.jsx("div", { className: "text-[11px] font-semibold text-indigo-900 bg-white/90 p-2 rounded-lg border border-indigo-200/60 mt-2", children: "Chu\u1EA9n kh\xED tr\u1EDDi: PaO\u2082 > 80 mmHg (10.6 kPa), SaO\u2082 > 95%" })] }), a.jsxs("div", { className: "p-4 rounded-xl border border-rose-200 bg-rose-50/40 space-y-2 flex flex-col justify-between", children: [a.jsxs("div", { className: "space-y-2", children: [a.jsxs("div", { className: "flex items-center justify-between", children: [a.jsx("span", { className: "w-6 h-6 rounded-full bg-rose-600 text-white text-xs font-bold flex items-center justify-center shadow-xs", children: "3" }), a.jsx("span", { className: "text-[11px] font-bold text-rose-700 uppercase tracking-wider", children: "pH m\xE1u" })] }), a.jsx("h3", { className: "text-sm font-bold text-slate-900", children: "\u0110\xE1nh gi\xE1 pH (Assess the pH)" }), a.jsx("p", { className: "text-xs text-slate-600 leading-relaxed", children: "pH < 7.35: Toan m\xE1u (Acidaemia). pH > 7.45: Ki\u1EC1m m\xE1u (Alkalaemia). N\u1EBFu pH 7.35 - 7.45: c\xF3 th\u1EC3 b\xECnh th\u01B0\u1EDDng, ho\u1EB7c \u0111\xE3 b\xF9 tr\u1EEB ho\xE0n to\xE0n, ho\u1EB7c r\u1ED1i lo\u1EA1n h\u1ED7n h\u1EE3p \u0111\u1ED1i kh\xE1ng." })] }), a.jsx("div", { className: "text-[11px] font-semibold text-rose-900 bg-white/90 p-2 rounded-lg border border-rose-200/60 mt-2", children: "M\u1ED1c ranh gi\u1EDBi trung t\xEDnh: pH = 7.40 ([H\u207A] = 40 nmol/L)" })] }), a.jsxs("div", { className: "p-4 rounded-xl border border-amber-200 bg-amber-50/40 space-y-2 flex flex-col justify-between", children: [a.jsxs("div", { className: "space-y-2", children: [a.jsxs("div", { className: "flex items-center justify-between", children: [a.jsx("span", { className: "w-6 h-6 rounded-full bg-amber-600 text-white text-xs font-bold flex items-center justify-center shadow-xs", children: "4" }), a.jsx("span", { className: "text-[11px] font-bold text-amber-700 uppercase tracking-wider", children: "H\xF4 h\u1EA5p" })] }), a.jsx("h3", { className: "text-sm font-bold text-slate-900", children: "\u0110\xE1nh gi\xE1 H\xF4 h\u1EA5p (Assess Respiratory)" }), a.jsx("p", { className: "text-xs text-slate-600 leading-relaxed", children: "So s\xE1nh bi\u1EBFn thi\xEAn PaCO\u2082 v\u1EDBi pH. Quy t\u1EAFc v\xE0ng: N\u1EBFu pH v\xE0 PaCO\u2082 bi\u1EBFn thi\xEAn NG\u01AF\u1EE2C CHI\u1EC0U (pH\u2193 + PaCO\u2082\u2191 ho\u1EB7c pH\u2191 + PaCO\u2082\u2193) \u2192 R\u1ED1i lo\u1EA1n ti\xEAn ph\xE1t l\xE0 H\xD4 H\u1EA4P!" })] }), a.jsx("div", { className: "text-[11px] font-semibold text-amber-900 bg-white/90 p-2 rounded-lg border border-amber-200/60 mt-2", children: "PaCO\u2082 b\xECnh th\u01B0\u1EDDng: 35 - 45 mmHg (4.7 - 6.0 kPa)" })] }), a.jsxs("div", { className: "p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-2 flex flex-col justify-between", children: [a.jsxs("div", { className: "space-y-2", children: [a.jsxs("div", { className: "flex items-center justify-between", children: [a.jsx("span", { className: "w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center shadow-xs", children: "5" }), a.jsx("span", { className: "text-[11px] font-bold text-emerald-700 uppercase tracking-wider", children: "Chuy\u1EC3n h\xF3a" })] }), a.jsx("h3", { className: "text-sm font-bold text-slate-900", children: "\u0110\xE1nh gi\xE1 Chuy\u1EC3n h\xF3a (Assess Metabolic)" }), a.jsx("p", { className: "text-xs text-slate-600 leading-relaxed", children: "So s\xE1nh HCO\u2083\u207B v\xE0 BE v\u1EDBi pH. Quy t\u1EAFc: N\u1EBFu pH v\xE0 HCO\u2083\u207B bi\u1EBFn thi\xEAn C\xD9NG CHI\u1EC0U (c\xF9ng gi\u1EA3m \u2192 toan chuy\u1EC3n h\xF3a; c\xF9ng t\u0103ng \u2192 ki\u1EC1m chuy\u1EC3n h\xF3a) \u2192 Ti\xEAn ph\xE1t CHUY\u1EC2N H\xD3A!" })] }), a.jsx("div", { className: "text-[11px] font-semibold text-emerald-900 bg-white/90 p-2 rounded-lg border border-emerald-200/60 mt-2", children: "HCO\u2083\u207B chu\u1EA9n: 22 - 28 mmol/L | BE: -2 \u0111\u1EBFn +2 mmol/L" })] }), a.jsxs("div", { className: "p-4 rounded-xl border border-purple-200 bg-purple-50/40 space-y-2 flex flex-col justify-between", children: [a.jsxs("div", { className: "space-y-2", children: [a.jsxs("div", { className: "flex items-center justify-between", children: [a.jsx("span", { className: "w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center shadow-xs", children: "6" }), a.jsx("span", { className: "text-[11px] font-bold text-purple-700 uppercase tracking-wider", children: "B\xF9 tr\u1EEB & H\u1ED7n h\u1EE3p" })] }), a.jsx("h3", { className: "text-sm font-bold text-slate-900", children: "\u0110\xE1nh gi\xE1 B\xF9 tr\u1EEB & R\u1ED1i lo\u1EA1n H\u1ED7n h\u1EE3p" }), a.jsx("p", { className: "text-xs text-slate-600 leading-relaxed", children: "Ch\u01B0a b\xF9: C\u01A1 quan th\u1EE9 ph\xE1t ch\u01B0a bi\u1EBFn \u0111\u1ED5i. B\xF9 b\xE1n ph\u1EA7n: \u0110\xE3 bi\u1EBFn \u0111\u1ED5i nh\u01B0ng pH ch\u01B0a v\u1EC1 b\xECnh th\u01B0\u1EDDng. B\xF9 ho\xE0n to\xE0n: pH v\u1EC1 7.35 - 7.45. T\xEDnh Anion Gap & Delta Ratio khi c\xF3 toan chuy\u1EC3n h\xF3a." })] }), a.jsx("div", { className: "text-[11px] font-semibold text-purple-900 bg-white/90 p-2 rounded-lg border border-purple-200/60 mt-2", children: "Quy lu\u1EADt sinh l\xFD: Kh\xF4ng bao gi\u1EDD b\xF9 tr\u1EEB qu\xE1 m\u1EE9c!" })] })] })] }), a.jsxs("div", { className: "bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4", children: [a.jsxs("div", { className: "flex items-center justify-between", children: [a.jsx("h3", { className: "text-base font-bold text-slate-900", children: "B\u1EA3ng Gi\xE1 Tr\u1ECB Tham Chi\u1EBFu Chu\u1EA9n Kh\xED M\xE1u \u0110\u1ED9ng M\u1EA1ch (Reference Ranges)" }), a.jsx("span", { className: "text-xs text-slate-500", children: "M\u1EABu m\xE1u \u0111\u1ED9ng m\u1EA1ch \u1EDF 37\xB0C" })] }), a.jsx("div", { className: "overflow-x-auto", children: a.jsxs("table", { className: "w-full text-xs text-left", children: [a.jsx("thead", { className: "bg-slate-100 text-slate-700 uppercase font-bold border-b border-slate-200", children: a.jsxs("tr", { children: [a.jsx("th", { className: "px-4 py-3", children: "Ch\u1EC9 s\u1ED1 ABG" }), a.jsx("th", { className: "px-4 py-3", children: "\u0110\u01A1n v\u1ECB truy\u1EC1n th\u1ED1ng" }), a.jsx("th", { className: "px-4 py-3", children: "\u0110\u01A1n v\u1ECB SI (Qu\u1ED1c t\u1EBF)" }), a.jsx("th", { className: "px-4 py-3", children: "\xDD ngh\u0129a sinh l\xFD & Ng\u01B0\u1EE1ng b\xE1o \u0111\u1ED9ng" })] }) }), a.jsxs("tbody", { className: "divide-y divide-slate-100 text-slate-700", children: [a.jsxs("tr", { className: "hover:bg-slate-50", children: [a.jsx("td", { className: "px-4 py-2.5 font-bold text-slate-900", children: "pH m\xE1u" }), a.jsx("td", { className: "px-4 py-2.5", children: "7.35 - 7.45" }), a.jsx("td", { className: "px-4 py-2.5", children: "[H\u207A] = 35 - 45 nmol/L" }), a.jsx("td", { className: "px-4 py-2.5 text-rose-700 font-medium", children: "< 7.25: Toan n\u1EB7ng \u0111e d\u1ECDa tr\u1EE5y tim m\u1EA1ch; > 7.55: Ki\u1EC1m n\u1EB7ng co gi\u1EADt lo\u1EA1n nh\u1ECBp" })] }), a.jsxs("tr", { className: "hover:bg-slate-50", children: [a.jsx("td", { className: "px-4 py-2.5 font-bold text-slate-900", children: "PaCO\u2082" }), a.jsx("td", { className: "px-4 py-2.5", children: "35 - 45 mmHg" }), a.jsx("td", { className: "px-4 py-2.5", children: "4.7 - 6.0 kPa" }), a.jsx("td", { className: "px-4 py-2.5", children: "\u0110\xE1nh gi\xE1 th\xF4ng kh\xED ph\u1EBF nang. > 45: Gi\u1EA3m th\xF4ng kh\xED (toan h\xF4 h\u1EA5p); < 35: T\u0103ng th\xF4ng kh\xED" })] }), a.jsxs("tr", { className: "hover:bg-slate-50", children: [a.jsx("td", { className: "px-4 py-2.5 font-bold text-slate-900", children: "PaO\u2082 (kh\xED tr\u1EDDi)" }), a.jsx("td", { className: "px-4 py-2.5", children: "> 80 mmHg" }), a.jsx("td", { className: "px-4 py-2.5", children: "> 10.6 kPa" }), a.jsx("td", { className: "px-4 py-2.5 text-rose-700 font-medium", children: "< 60 mmHg (8 kPa): Suy h\xF4 h\u1EA5p gi\u1EA3m oxy m\xE1u c\u1EA7n ch\u1EC9 \u0111\u1ECBnh oxy li\u1EC7u ph\xE1p c\u1EA5p" })] }), a.jsxs("tr", { className: "hover:bg-slate-50", children: [a.jsx("td", { className: "px-4 py-2.5 font-bold text-slate-900", children: "HCO\u2083\u207B (Bicarbonate)" }), a.jsx("td", { className: "px-4 py-2.5", children: "22 - 28 mmol/L" }), a.jsx("td", { className: "px-4 py-2.5", children: "22 - 28 mEq/L" }), a.jsx("td", { className: "px-4 py-2.5", children: "< 15 mmol/L: Toan chuy\u1EC3n h\xF3a n\u1EB7ng; > 28 mmol/L: Ki\u1EC1m chuy\u1EC3n h\xF3a" })] }), a.jsxs("tr", { className: "hover:bg-slate-50", children: [a.jsx("td", { className: "px-4 py-2.5 font-bold text-slate-900", children: "Base Excess (BE)" }), a.jsx("td", { className: "px-4 py-2.5", children: "-2 \u0111\u1EBFn +2 mmol/L" }), a.jsx("td", { className: "px-4 py-2.5", children: "-2 \u0111\u1EBFn +2 mmol/L" }), a.jsx("td", { className: "px-4 py-2.5", children: "< -10 mmol/L: Thi\u1EBFu ki\u1EC1m n\u1EB7ng, ch\u1EC9 \u0111i\u1EC3m thi\u1EBFu oxy m\xF4 s\xE2u / s\u1ED1c gi\u1EA3m th\u1EC3 t\xEDch" })] }), a.jsxs("tr", { className: "hover:bg-slate-50", children: [a.jsx("td", { className: "px-4 py-2.5 font-bold text-slate-900", children: "SaO\u2082 (B\xE3o h\xF2a O\u2082)" }), a.jsx("td", { className: "px-4 py-2.5", children: "> 95%" }), a.jsx("td", { className: "px-4 py-2.5", children: "> 95%" }), a.jsx("td", { className: "px-4 py-2.5", children: "Ph\u1EA7n tr\u0103m v\u1ECB tr\xED g\u1EAFn oxy tr\xEAn Hemoglobin \u0111\u01B0\u1EE3c b\xE3o h\xF2a. < 88%: Thi\u1EBFu oxy n\u1EB7ng" })] }), a.jsxs("tr", { className: "hover:bg-slate-50", children: [a.jsx("td", { className: "px-4 py-2.5 font-bold text-slate-900", children: "Anion Gap (AG)" }), a.jsx("td", { className: "px-4 py-2.5", children: "8 - 16 mEq/L" }), a.jsx("td", { className: "px-4 py-2.5", children: "8 - 16 mmol/L" }), a.jsx("td", { className: "px-4 py-2.5", children: "> 16 mEq/L: T\u0103ng c\xE1c anion kh\xF4ng \u0111o \u0111\u01B0\u1EE3c (Ketoacid, Lactate, \u0110\u1ED9c ch\u1EA5t, Suy th\u1EADn)" })] }), a.jsxs("tr", { className: "hover:bg-slate-50", children: [a.jsx("td", { className: "px-4 py-2.5 font-bold text-slate-900", children: "Lactate m\xE1u" }), a.jsx("td", { className: "px-4 py-2.5", children: "0.5 - 1.5 mmol/L" }), a.jsx("td", { className: "px-4 py-2.5", children: "0.5 - 1.5 mmol/L" }), a.jsx("td", { className: "px-4 py-2.5 text-rose-700 font-medium", children: "> 2.0: T\u0103ng lactate m\xE1u; > 4.0 mmol/L: Toan lactic c\u1EA5p c\u1EE9u (S\u1ED1c nhi\u1EC5m khu\u1EA9n, thi\u1EBFu m\xE1u m\xF4)" })] })] })] }) })] })] });
  var Ix = ({ onOpenGlossary: u, initialTree: O = "gas-exchange" }) => {
    const [g, o] = Q.useState(O);
    return a.jsxs("div", { className: "space-y-6", children: [a.jsxs("div", { className: "flex items-center space-x-1 sm:space-x-2 bg-white p-1.5 rounded-xl border border-slate-200 overflow-x-auto shadow-xs", children: [a.jsxs("button", { onClick: () => o("gas-exchange"), className: `flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${g === "gas-exchange" ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"}`, children: [a.jsx(Ja, { className: "w-4 h-4" }), a.jsx("span", { children: "1. C\xE2y Trao \u0110\u1ED5i Kh\xED (H\xECnh 22)" })] }), a.jsxs("button", { onClick: () => o("acid-base"), className: `flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${g === "acid-base" ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"}`, children: [a.jsx(xn, { className: "w-4 h-4" }), a.jsx("span", { children: "2. C\xE2y Th\u0103ng B\u1EB1ng Toan Ki\u1EC1m (H\xECnh 23)" })] }), a.jsxs("button", { onClick: () => o("anion-gap"), className: `flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${g === "anion-gap" ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"}`, children: [a.jsx(Vl, { className: "w-4 h-4" }), a.jsx("span", { children: "3. C\xE2y Ph\xE2n Nh\xE1nh Anion Gap (GOLDMARK)" })] })] }), g === "gas-exchange" && a.jsxs("div", { className: "bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6", children: [a.jsxs("div", { className: "border-b border-slate-100 pb-4", children: [a.jsxs("h2", { className: "text-lg font-bold text-slate-900 flex items-center gap-2", children: [a.jsx(Ja, { className: "w-5 h-5 text-blue-600" }), a.jsx("span", { children: "S\u01A1 \u0110\u1ED3 \u0110\xE1nh Gi\xE1 Trao \u0110\u1ED5i Kh\xED Ph\u1ED5i (Arterial Blood Gases Made Easy - Figure 22)" })] }), a.jsx("p", { className: "text-xs text-slate-600 mt-1", children: "Ph\xE2n lo\u1EA1i suy h\xF4 h\u1EA5p d\u1EF1a tr\xEAn ph\xE2n \xE1p oxy m\xE1u \u0111\u1ED9ng m\u1EA1ch (PaO\u2082) tr\xEAn kh\xED tr\u1EDDi v\xE0 s\u1EF1 \u0111\xE1p \u1EE9ng \u0111\xE0o th\u1EA3i CO\u2082 c\u1EE7a ph\u1EBF nang." })] }), a.jsxs("div", { className: "p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-6", children: [a.jsxs("div", { className: "max-w-md mx-auto p-4 rounded-xl bg-blue-600 text-white text-center font-bold shadow-xs", children: [a.jsx("div", { className: "text-xs uppercase tracking-wider text-blue-200", children: "B\u01B0\u1EDBc Kh\u1EDFi \u0110\u1EA7u" }), a.jsx("div", { className: "text-base", children: "PaO\u2082 tr\xEAn kh\xED tr\u1EDDi c\xF3 b\xECnh th\u01B0\u1EDDng kh\xF4ng?" }), a.jsx("div", { className: "text-xs font-normal text-blue-100 mt-1", children: "(B\xECnh th\u01B0\u1EDDng > 80 mmHg / 10.6 kPa; Ng\u01B0\u1EE1ng suy h\xF4 h\u1EA5p < 60 mmHg / 8 kPa)" })] }), a.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 pt-2", children: [a.jsxs("div", { className: "p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-3", children: [a.jsxs("div", { className: "flex items-center space-x-2 text-emerald-800 font-bold text-sm", children: [a.jsx(Zl, { className: "w-5 h-5 text-emerald-600" }), a.jsx("span", { children: "PaO\u2082 B\xCCNH TH\u01AF\u1EDCNG (> 80 mmHg)" })] }), a.jsx("p", { className: "text-xs text-slate-600 leading-relaxed", children: "Oxy h\xF3a m\xE1u \u0111\u1ED9ng m\u1EA1ch \u0111\u01B0\u1EE3c b\u1EA3o t\u1ED3n. Ti\u1EBFp t\u1EE5c ki\u1EC3m tra PaCO\u2082:" }), a.jsxs("div", { className: "space-y-2 text-xs", children: [a.jsxs("div", { className: "p-2.5 rounded-lg bg-white border border-emerald-200", children: [a.jsx("strong", { className: "text-slate-900 block", children: "PaCO\u2082 B\xECnh th\u01B0\u1EDDng (35 - 45 mmHg):" }), a.jsx("span", { children: "Ch\u1EE9c n\u0103ng trao \u0111\u1ED5i kh\xED v\xE0 th\xF4ng kh\xED ph\u1EBF nang ho\xE0n to\xE0n b\xECnh th\u01B0\u1EDDng." })] }), a.jsxs("div", { className: "p-2.5 rounded-lg bg-white border border-emerald-200", children: [a.jsx("strong", { className: "text-slate-900 block", children: "PaCO\u2082 Gi\u1EA3m (< 35 mmHg):" }), a.jsx("span", { children: "T\u0103ng th\xF4ng kh\xED ph\u1EBF nang (Hyperventilation) do lo \xE2u, \u0111au \u0111\u1EDBn, s\u1ED1t, ng\u1ED9 \u0111\u1ED9c salicylate ho\u1EB7c th\u1EDF m\xE1y qu\xE1 m\u1EE9c." })] }), a.jsxs("div", { className: "p-2.5 rounded-lg bg-white border border-emerald-200", children: [a.jsx("strong", { className: "text-slate-900 block", children: "PaCO\u2082 T\u0103ng (> 45 mmHg):" }), a.jsx("span", { children: "Gi\u1EA3m th\xF4ng kh\xED ph\u1EBF nang nh\u1EB9 ho\u1EB7c \u0111ang th\u1EDF oxy b\u1ED5 sung li\u1EC1u th\u1EA5p." })] })] })] }), a.jsxs("div", { className: "p-4 rounded-xl border border-rose-200 bg-rose-50/40 space-y-3", children: [a.jsxs("div", { className: "flex items-center space-x-2 text-rose-800 font-bold text-sm", children: [a.jsx(Vl, { className: "w-5 h-5 text-rose-600" }), a.jsx("span", { children: "PaO\u2082 GI\u1EA2M (< 60 mmHg) \u2192 SUY H\xD4 H\u1EA4P!" })] }), a.jsx("p", { className: "text-xs text-slate-600 leading-relaxed", children: "B\u1EC7nh nh\xE2n b\u1ECB gi\u1EA3m oxy m\xE1u m\xF4. Ki\u1EC3m tra PaCO\u2082 \u0111\u1EC3 ph\xE2n \u0111\u1ECBnh c\u01A1 ch\u1EBF b\u1EC7nh sinh:" }), a.jsxs("div", { className: "space-y-2.5 text-xs", children: [a.jsxs("div", { className: "p-3 rounded-lg bg-white border border-rose-200 space-y-1", children: [a.jsx("div", { className: "font-bold text-blue-900", children: "1. PaCO\u2082 B\xCCNH TH\u01AF\u1EDCNG ho\u1EB7c GI\u1EA2M \u2192 SUY H\xD4 H\u1EA4P TYPE 1" }), a.jsxs("p", { className: "text-slate-600 text-[11px] leading-relaxed", children: ["C\u01A1 ch\u1EBF: B\u1EA5t t\u01B0\u01A1ng x\u1EE9ng Th\xF4ng kh\xED/T\u01B0\u1EDBi m\xE1u (V/Q mismatch) ho\u1EB7c Shunt trong ph\u1ED5i. V\xF9ng ph\u1ED5i l\xE0nh t\u0103ng th\xF4ng kh\xED th\u1EA3i \u0111\u01B0\u1EE3c CO\u2082 nh\u01B0ng kh\xF4ng b\xF9 \u0111\u01B0\u1EE3c O\u2082.", a.jsx("br", {}), a.jsx("strong", { children: "Nguy\xEAn nh\xE2n:" }), " Vi\xEAm ph\u1ED5i th\xF9y, Ph\xF9 ph\u1ED5i c\u1EA5p tim m\u1EA1ch, Thuy\xEAn t\u1EAFc \u0111\u1ED9ng m\u1EA1ch ph\u1ED5i (PE), ARDS, X\u1EB9p ph\u1ED5i, Tr\xE0n d\u1ECBch m\xE0ng ph\u1ED5i."] })] }), a.jsxs("div", { className: "p-3 rounded-lg bg-white border border-rose-200 space-y-1", children: [a.jsx("div", { className: "font-bold text-amber-900", children: "2. PaCO\u2082 T\u0102NG CAO (> 45 mmHg) \u2192 SUY H\xD4 H\u1EA4P TYPE 2" }), a.jsxs("p", { className: "text-slate-600 text-[11px] leading-relaxed", children: ["C\u01A1 ch\u1EBF: Gi\u1EA3m th\xF4ng kh\xED ph\u1EBF nang to\xE0n th\u1EC3 (Alveolar Hypoventilation). Ph\u1ED5i kh\xF4ng th\u1EC3 \u0111\xE0o th\u1EA3i acid bay h\u01A1i CO\u2082.", a.jsx("br", {}), a.jsx("strong", { children: "Ki\u1EC3m tra ti\u1EBFp HCO\u2083\u207B:" }), a.jsx("br", {}), "\u2022 ", a.jsx("strong", { children: "HCO\u2083\u207B b\xECnh th\u01B0\u1EDDng:" }), " C\u1EA5p t\xEDnh (Ng\u1ED9 \u0111\u1ED9c morphin/an th\u1EA7n, ch\u1EA5n th\u01B0\u01A1ng t\u1EE7y s\u1ED1ng, nh\u01B0\u1EE3c c\u01A1).", a.jsx("br", {}), "\u2022 ", a.jsx("strong", { children: "HCO\u2083\u207B t\u0103ng cao:" }), " M\u1EA1n t\xEDnh (COPD m\u1EA1n, b\xE9o ph\xEC Pickwickian) ho\u1EB7c C\u1EA5p tr\xEAn n\u1EC1n m\u1EA1n t\xEDnh n\u1EBFu pH toan!"] })] })] })] })] })] })] }), g === "acid-base" && a.jsxs("div", { className: "bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6", children: [a.jsxs("div", { className: "border-b border-slate-100 pb-4", children: [a.jsxs("h2", { className: "text-lg font-bold text-slate-900 flex items-center gap-2", children: [a.jsx(xn, { className: "w-5 h-5 text-indigo-600" }), a.jsx("span", { children: "S\u01A1 \u0110\u1ED3 \u0110\xE1nh Gi\xE1 Th\u0103ng B\u1EB1ng Toan Ki\u1EC1m (Arterial Blood Gases Made Easy - Figure 23)" })] }), a.jsx("p", { className: "text-xs text-slate-600 mt-1", children: "Ph\xE2n \u0111\u1ECBnh c\xE1c r\u1ED1i lo\u1EA1n toan ki\u1EC1m nguy\xEAn ph\xE1t, m\u1EE9c \u0111\u1ED9 b\xF9 tr\u1EEB v\xE0 ph\xE1t hi\u1EC7n s\u1EDBm r\u1ED1i lo\u1EA1n h\u1ED7n h\u1EE3p." })] }), a.jsxs("div", { className: "p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-6", children: [a.jsxs("div", { className: "max-w-md mx-auto p-4 rounded-xl bg-indigo-700 text-white text-center font-bold shadow-xs", children: [a.jsx("div", { className: "text-xs uppercase tracking-wider text-indigo-200", children: "B\u01B0\u1EDBc Kh\u1EDFi \u0110\u1EA7u" }), a.jsx("div", { className: "text-base", children: "\u0110\xE1nh gi\xE1 pH M\xE1u" }), a.jsx("div", { className: "text-xs font-normal text-indigo-100 mt-1", children: "(Chu\u1EA9n 7.35 - 7.45; Ranh gi\u1EDBi toan < 7.40; Ranh gi\u1EDBi ki\u1EC1m > 7.40)" })] }), a.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 pt-2", children: [a.jsxs("div", { className: "p-4 rounded-xl border border-rose-200 bg-rose-50/40 space-y-3", children: [a.jsx("div", { className: "font-bold text-rose-800 text-sm", children: "pH < 7.35: TOAN M\xC1U (ACIDAEMIA)" }), a.jsx("p", { className: "text-xs text-slate-600", children: "Ki\u1EC3m tra \u0111\u1ED3ng th\u1EDDi PaCO\u2082 v\xE0 HCO\u2083\u207B / BE:" }), a.jsxs("div", { className: "space-y-2.5 text-xs", children: [a.jsxs("div", { className: "p-3 rounded-lg bg-white border border-rose-200", children: [a.jsx("strong", { className: "text-rose-900 block font-bold", children: "A. PaCO\u2082 T\u0102NG (> 45 mmHg) \u2192 TOAN H\xD4 H\u1EA4P" }), a.jsxs("div", { className: "text-slate-600 mt-1 text-[11px]", children: ["\u2022 ", a.jsx("strong", { children: "HCO\u2083\u207B b\xECnh th\u01B0\u1EDDng:" }), " Toan h\xF4 h\u1EA5p C\u1EA4P T\xCDNH (Th\u1EADn ch\u01B0a k\u1ECBp gi\u1EEF bicarb, c\u1EA7n 24 - 48h).", a.jsx("br", {}), "\u2022 ", a.jsx("strong", { children: "HCO\u2083\u207B t\u0103ng cao:" }), " Toan h\xF4 h\u1EA5p M\u1EA0N T\xCDNH (Th\u1EADn \u0111\xE3 b\xF9 tr\u1EEB gi\u1EEF bicarb).", a.jsx("br", {}), "\u2022 ", a.jsx("strong", { children: "HCO\u2083\u207B gi\u1EA3m th\u1EA5p:" }), " TOAN H\u1ED6N H\u1EE2P (Toan h\xF4 h\u1EA5p + Toan chuy\u1EC3n h\xF3a) nguy k\u1ECBch!"] })] }), a.jsxs("div", { className: "p-3 rounded-lg bg-white border border-rose-200", children: [a.jsx("strong", { className: "text-rose-900 block font-bold", children: "B. PaCO\u2082 B\xCCNH TH\u01AF\u1EDCNG / GI\u1EA2M & HCO\u2083\u207B GI\u1EA2M (< 22) \u2192 TOAN CHUY\u1EC2N H\xD3A" }), a.jsxs("div", { className: "text-slate-600 mt-1 text-[11px]", children: ["\u2022 T\xEDnh Kho\u1EA3ng tr\u1ED1ng Anion (Anion Gap = Na\u207A - [Cl\u207B + HCO\u2083\u207B]).", a.jsx("br", {}), "\u2022 Ki\u1EC3m tra PaCO\u2082 d\u1EF1 ki\u1EBFn theo c\xF4ng th\u1EE9c Winter (PaCO\u2082 = 1.5 \xD7 HCO\u2083\u207B + 8 \xB1 2)."] })] })] })] }), a.jsxs("div", { className: "p-4 rounded-xl border border-blue-200 bg-blue-50/40 space-y-3", children: [a.jsx("div", { className: "font-bold text-blue-800 text-sm", children: "pH > 7.45: KI\u1EC0M M\xC1U (ALKALAEMIA)" }), a.jsx("p", { className: "text-xs text-slate-600", children: "Ki\u1EC3m tra \u0111\u1ED3ng th\u1EDDi PaCO\u2082 v\xE0 HCO\u2083\u207B / BE:" }), a.jsxs("div", { className: "space-y-2.5 text-xs", children: [a.jsxs("div", { className: "p-3 rounded-lg bg-white border border-blue-200", children: [a.jsx("strong", { className: "text-blue-900 block font-bold", children: "A. PaCO\u2082 GI\u1EA2M (< 35 mmHg) \u2192 KI\u1EC0M H\xD4 H\u1EA4P" }), a.jsxs("div", { className: "text-slate-600 mt-1 text-[11px]", children: ["\u2022 ", a.jsx("strong", { children: "HCO\u2083\u207B b\xECnh th\u01B0\u1EDDng:" }), " Ki\u1EC1m h\xF4 h\u1EA5p C\u1EA4P T\xCDNH (C\u01A1n ho\u1EA3ng lo\u1EA1n, th\u1EDF m\xE1y qu\xE1 m\u1EE9c, ng\u1ED9 \u0111\u1ED9c s\u1EDBm).", a.jsx("br", {}), "\u2022 ", a.jsx("strong", { children: "HCO\u2083\u207B gi\u1EA3m th\u1EA5p:" }), " Ki\u1EC1m h\xF4 h\u1EA5p M\u1EA0N T\xCDNH (S\u1ED1ng v\xF9ng cao, suy gan m\u1EA1n, thai k\u1EF3)."] })] }), a.jsxs("div", { className: "p-3 rounded-lg bg-white border border-blue-200", children: [a.jsx("strong", { className: "text-blue-900 block font-bold", children: "B. HCO\u2083\u207B T\u0102NG (> 28 mmol/L) \u2192 KI\u1EC0M CHUY\u1EC2N H\xD3A" }), a.jsxs("div", { className: "text-slate-600 mt-1 text-[11px]", children: ["\u2022 ", a.jsx("strong", { children: "Nh\u1EA1y Clorid (Cl n\u01B0\u1EDBc ti\u1EC3u < 20 mEq/L):" }), " N\xF4n m\u1EEDa m\u1EA5t d\u1ECBch d\u1EA1 d\xE0y, d\xF9ng thu\u1ED1c l\u1EE3i ti\u1EC3u quai.", a.jsx("br", {}), "\u2022 ", a.jsx("strong", { children: "Kh\xE1ng Clorid (Cl n\u01B0\u1EDBc ti\u1EC3u > 20 mEq/L):" }), " C\u01B0\u1EDDng Aldosterone, t\u0103ng huy\u1EBFt \xE1p \xE1c t\xEDnh."] })] })] })] })] })] })] }), g === "anion-gap" && a.jsxs("div", { className: "bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6", children: [a.jsxs("div", { className: "border-b border-slate-100 pb-4", children: [a.jsxs("h2", { className: "text-lg font-bold text-slate-900 flex items-center gap-2", children: [a.jsx(Vl, { className: "w-5 h-5 text-amber-600" }), a.jsx("span", { children: "S\u01A1 \u0110\u1ED3 Ph\xE2n Nh\xE1nh Anion Gap & B\u1EA3ng M\xE3 GOLDMARK" })] }), a.jsx("p", { className: "text-xs text-slate-600 mt-1", children: "Ph\xE2n \u0111\u1ECBnh c\xE1c c\u0103n nguy\xEAn g\xE2y toan chuy\u1EC3n h\xF3a d\u1EF1a tr\xEAn \u0111i\u1EC7n t\xEDch c\xE1c anion kh\xF4ng \u0111o \u0111\u01B0\u1EE3c trong huy\u1EBFt t\u01B0\u01A1ng." })] }), a.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [a.jsxs("div", { className: "p-5 rounded-xl border border-amber-300 bg-amber-50/50 space-y-4", children: [a.jsxs("div", { className: "flex items-center justify-between", children: [a.jsx("h3", { className: "font-bold text-amber-900 text-sm", children: "1. TOAN CHUY\u1EC2N H\xD3A T\u0102NG ANION GAP (> 16 mEq/L)" }), a.jsx("span", { className: "text-[11px] font-bold px-2 py-0.5 bg-amber-200 text-amber-800 rounded-md", children: "T\xEDch t\u1EE5 Acid ngo\u1EA1i sinh/n\u1ED9i sinh" })] }), a.jsxs("p", { className: "text-xs text-slate-600", children: ["Ghi nh\u1EDB b\u1EB1ng b\u1EA3ng m\xE3 hi\u1EC7n \u0111\u1EA1i ", a.jsx("strong", { children: "GOLDMARK" }), " (thay th\u1EBF MUDPILES kinh \u0111i\u1EC3n):"] }), a.jsxs("div", { className: "space-y-2 text-xs", children: [a.jsxs("div", { className: "p-2 bg-white rounded-lg border border-amber-200", children: [a.jsx("strong", { className: "text-amber-800", children: "G - Glycols:" }), " Ethylene glycol, Diethylene glycol (ch\u1ED1ng \u0111\xF4ng, ng\u1ED9 \u0111\u1ED9c c\xF4ng nghi\u1EC7p)"] }), a.jsxs("div", { className: "p-2 bg-white rounded-lg border border-amber-200", children: [a.jsx("strong", { className: "text-amber-800", children: "O - Oxoproline (5-oxoproline):" }), " L\u1EA1m d\u1EE5ng Paracetamol/Acetaminophen m\u1EA1n t\xEDnh"] }), a.jsxs("div", { className: "p-2 bg-white rounded-lg border border-amber-200", children: [a.jsx("strong", { className: "text-amber-800", children: "L - L-lactate:" }), " S\u1ED1c nhi\u1EC5m khu\u1EA9n, s\u1ED1c gi\u1EA3m th\u1EC3 t\xEDch, thi\u1EBFu m\xE1u m\u1EA1c treo"] }), a.jsxs("div", { className: "p-2 bg-white rounded-lg border border-amber-200", children: [a.jsx("strong", { className: "text-amber-800", children: "D - D-lactate:" }), " H\u1ED9i ch\u1EE9ng ru\u1ED9t ng\u1EAFn (Short bowel syndrome)"] }), a.jsxs("div", { className: "p-2 bg-white rounded-lg border border-amber-200", children: [a.jsx("strong", { className: "text-amber-800", children: "M - Methanol:" }), " Ng\u1ED9 \u0111\u1ED9c c\u1ED3n c\xF4ng nghi\u1EC7p r\u01B0\u1EE3u gi\u1EA3"] }), a.jsxs("div", { className: "p-2 bg-white rounded-lg border border-amber-200", children: [a.jsx("strong", { className: "text-amber-800", children: "A - Aspirin (Salicylate):" }), " Ng\u1ED9 \u0111\u1ED9c Aspirin (toan chuy\u1EC3n h\xF3a + ki\u1EC1m h\xF4 h\u1EA5p)"] }), a.jsxs("div", { className: "p-2 bg-white rounded-lg border border-amber-200", children: [a.jsx("strong", { className: "text-amber-800", children: "R - Renal failure (Uremia):" }), " Suy th\u1EADn c\u1EA5p ho\u1EB7c m\u1EA1n giai \u0111o\u1EA1n cu\u1ED1i (t\xEDch t\u1EE5 phosphate/sulfate)"] }), a.jsxs("div", { className: "p-2 bg-white rounded-lg border border-amber-200", children: [a.jsx("strong", { className: "text-amber-800", children: "K - Ketoacidosis:" }), " Toan ceton \u0111\xE1i th\xE1o \u0111\u01B0\u1EDDng (DKA), toan ceton do r\u01B0\u1EE3u, nh\u1ECBn \u0111\xF3i k\xE9o d\xE0i"] })] })] }), a.jsxs("div", { className: "p-5 rounded-xl border border-sky-300 bg-sky-50/50 space-y-4", children: [a.jsxs("div", { className: "flex items-center justify-between", children: [a.jsx("h3", { className: "font-bold text-sky-900 text-sm", children: "2. ANION GAP B\xCCNH TH\u01AF\u1EDCNG / T\u0102NG CLORID M\xC1U (8 - 16 mEq/L)" }), a.jsx("span", { className: "text-[11px] font-bold px-2 py-0.5 bg-sky-200 text-sky-800 rounded-md", children: "M\u1EA5t Bicarbonate" })] }), a.jsxs("p", { className: "text-xs text-slate-600", children: ["Ghi nh\u1EDB b\u1EB1ng b\u1EA3ng m\xE3 l\xE2m s\xE0ng ", a.jsx("strong", { children: "HARDUPS" }), ":"] }), a.jsxs("div", { className: "space-y-2 text-xs", children: [a.jsxs("div", { className: "p-2 bg-white rounded-lg border border-sky-200", children: [a.jsx("strong", { className: "text-sky-800", children: "H - Hyperalimentation:" }), " Nu\xF4i d\u01B0\u1EE1ng t\u0129nh m\u1EA1ch ho\xE0n to\xE0n (TPN)"] }), a.jsxs("div", { className: "p-2 bg-white rounded-lg border border-sky-200", children: [a.jsx("strong", { className: "text-sky-800", children: "A - Acetazolamide:" }), " Thu\u1ED1c \u1EE9c ch\u1EBF carbonic anhydrase (m\u1EA5t HCO\u2083\u207B qua n\u01B0\u1EDBc ti\u1EC3u)"] }), a.jsxs("div", { className: "p-2 bg-white rounded-lg border border-sky-200", children: [a.jsx("strong", { className: "text-sky-800", children: "R - Renal tubular acidosis (RTA):" }), " Toan h\xF3a \u1ED1ng th\u1EADn Type 1, 2, 4"] }), a.jsxs("div", { className: "p-2 bg-white rounded-lg border border-sky-200", children: [a.jsx("strong", { className: "text-sky-800", children: "D - Diarrhoea:" }), " Ti\xEAu ch\u1EA3y c\u1EA5p m\u1EA5t l\u01B0\u1EE3ng l\u1EDBn d\u1ECBch ki\u1EC1m ti\xEAu h\xF3a"] }), a.jsxs("div", { className: "p-2 bg-white rounded-lg border border-sky-200", children: [a.jsx("strong", { className: "text-sky-800", children: "U - Uretero-enterostomy:" }), " D\u1EABn l\u01B0u ni\u1EC7u qu\u1EA3n v\xE0o \u0111\u1EA1i tr\xE0ng"] }), a.jsxs("div", { className: "p-2 bg-white rounded-lg border border-sky-200", children: [a.jsx("strong", { className: "text-sky-800", children: "P - Pancreatic fistula:" }), " R\xF2 d\u1ECBch t\u1EE5y ho\u1EB7c d\u1ECBch m\u1EADt gi\xE0u bicarbonate"] }), a.jsxs("div", { className: "p-2 bg-white rounded-lg border border-sky-200", children: [a.jsx("strong", { className: "text-sky-800", children: "S - Saline (0.9% NaCl):" }), " Truy\u1EC1n l\u01B0\u1EE3ng l\u1EDBn dung d\u1ECBch NaCl 0.9% (g\xE2y toan do t\u0103ng clo m\xE1u)"] })] })] })] })] })] });
  };
  var tp = ({ onLoadPresetToAnalyzer: u }) => {
    const [O, g] = Q.useState(40), [o, G] = Q.useState(7.4), E = Math.round(Math.pow(10, 9 - o)), Z = ((p, _) => _ >= 7.35 && _ <= 7.45 && p >= 35 && p <= 45 ? { name: "V\xF9ng B\xECnh Th\u01B0\u1EDDng (Normal Buffer Line)", color: "text-emerald-700 bg-emerald-50 border-emerald-200" } : _ < 7.35 && p > 45 ? { name: "Toan H\xF4 H\u1EA5p (C\u1EA5p t\xEDnh ho\u1EB7c M\u1EA1n t\xEDnh)", color: "text-amber-700 bg-amber-50 border-amber-200" } : _ < 7.35 && p <= 45 ? { name: "Toan Chuy\u1EC3n H\xF3a (Metabolic Acidosis)", color: "text-rose-700 bg-rose-50 border-rose-200" } : _ > 7.45 && p < 35 ? { name: "Ki\u1EC1m H\xF4 H\u1EA5p (Respiratory Alkalosis)", color: "text-blue-700 bg-blue-50 border-blue-200" } : _ > 7.45 && p >= 35 ? { name: "Ki\u1EC1m Chuy\u1EC3n H\xF3a (Metabolic Alkalosis)", color: "text-purple-700 bg-purple-50 border-purple-200" } : { name: "R\u1ED1i lo\u1EA1n h\u1ED7n h\u1EE3p ph\u1EE9c t\u1EA1p (Mixed Acid-Base Disorder)", color: "text-slate-800 bg-slate-100 border-slate-300" })(O, o), D = Math.round(24 * O / Math.max(10, E)), H = () => {
      if (!u) return;
      const p = { unit: "mmHg", pH: o, pCO2: O, pO2: 85, hco3: D, be: Math.round(D - 24), sao2: 96, fio2: 21, na: 140, k: 4, cl: 104, lactate: 1 };
      u(p);
    };
    return a.jsxs("div", { className: "bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6", children: [a.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4", children: [a.jsxs("div", { children: [a.jsxs("h2", { className: "text-lg font-bold text-slate-900 flex items-center gap-2", children: [a.jsx($h, { className: "w-5 h-5 text-indigo-600" }), a.jsx("span", { children: "Bi\u1EC3u \u0110\u1ED3 Nomogram Th\u0103ng B\u1EB1ng Toan Ki\u1EC1m T\u01B0\u01A1ng T\xE1c (H\xECnh 16)" })] }), a.jsx("p", { className: "text-xs text-slate-600 mt-1", children: "M\xF4 ph\u1ECFng Nomogram Hennessey & Janson (2007) x\xE1c \u0111\u1ECBnh d\u1EA3i dung sai b\xF9 tr\u1EEB 95% v\xE0 ph\xE1t hi\u1EC7n r\u1ED1i lo\u1EA1n toan ki\u1EC1m k\xE9p." })] }), a.jsx("span", { className: "self-start sm:self-auto text-[11px] font-bold px-2.5 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-full", children: "M\xF4 H\xECnh 2 Chi\u1EC1u" })] }), a.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-6", children: [a.jsxs("div", { className: "lg:col-span-4 p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4", children: [a.jsx("h3", { className: "text-xs font-bold uppercase tracking-wider text-slate-700", children: "Th\u1EED Nghi\u1EC7m T\u1ECDa \u0110\u1ED9 B\u1EC7nh Nh\xE2n" }), a.jsxs("div", { className: "space-y-1.5", children: [a.jsxs("div", { className: "flex justify-between text-xs font-semibold", children: [a.jsx("label", { htmlFor: "slider-ph", className: "text-slate-700", children: "pH M\xE1u:" }), a.jsx("span", { className: "text-blue-600 font-bold", children: o.toFixed(2) })] }), a.jsx("input", { id: "slider-ph", type: "range", min: "6.9", max: "7.7", step: "0.01", value: o, onChange: (p) => G(parseFloat(p.target.value)), className: "w-full accent-blue-600 cursor-pointer" }), a.jsxs("div", { className: "text-[11px] text-slate-500", children: ["T\u01B0\u01A1ng \u0111\u01B0\u01A1ng [H\u207A] = ", a.jsxs("strong", { className: "text-slate-800", children: [E, " nmol/L"] })] })] }), a.jsxs("div", { className: "space-y-1.5", children: [a.jsxs("div", { className: "flex justify-between text-xs font-semibold", children: [a.jsx("label", { htmlFor: "slider-paco2", className: "text-slate-700", children: "PaCO\u2082 (mmHg):" }), a.jsxs("span", { className: "text-blue-600 font-bold", children: [O, " mmHg"] })] }), a.jsx("input", { id: "slider-paco2", type: "range", min: "10", max: "100", step: "1", value: O, onChange: (p) => g(parseInt(p.target.value)), className: "w-full accent-blue-600 cursor-pointer" }), a.jsxs("div", { className: "text-[11px] text-slate-500", children: ["T\u01B0\u01A1ng \u0111\u01B0\u01A1ng: ", a.jsxs("strong", { className: "text-slate-800", children: [(O / 7.5).toFixed(1), " kPa"] }), " | \u01AF\u1EDBc t\xEDnh HCO\u2083\u207B \u2248 ", a.jsxs("strong", { className: "text-slate-800", children: [D, " mmol/L"] })] })] }), a.jsxs("div", { className: `p-3.5 rounded-xl border text-xs font-semibold ${Z.color}`, children: [a.jsx("div", { className: "text-[10px] uppercase tracking-wider mb-0.5", children: "V\u1ECB Tr\xED R\u01A1i V\xE0o:" }), a.jsx("div", { className: "text-sm font-bold", children: Z.name })] }), u && a.jsxs("button", { id: "btn-simulate-nomogram", onClick: H, className: "w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center space-x-1.5 transition-all shadow-xs cursor-pointer active:scale-98", children: [a.jsx(Pe, { className: "w-4 h-4" }), a.jsx("span", { children: "\u0110\u01B0a T\u1ECDa \u0110\u1ED9 V\xE0o B\u1ED9 Ph\xE2n T\xEDch" }), a.jsx(ps, { className: "w-3.5 h-3.5" })] })] }), a.jsxs("div", { className: "lg:col-span-8 p-5 rounded-xl border border-slate-200 bg-white space-y-4", children: [a.jsxs("div", { className: "flex items-center justify-between text-xs text-slate-500", children: [a.jsx("span", { className: "font-semibold text-slate-700", children: "S\u01A1 \u0111\u1ED3 kh\xF4ng gian c\xE1c d\u1EA3i b\xF9 tr\u1EEB 95%" }), a.jsx("span", { children: "Tr\u1EE5c ho\xE0nh: PaCO\u2082 (mmHg) | Tr\u1EE5c tung: [H\u207A] / pH" })] }), a.jsxs("div", { className: "relative w-full h-80 bg-slate-50 rounded-xl border border-slate-200 overflow-hidden p-4 select-none", children: [a.jsx("div", { className: "absolute top-2 left-2 text-[10px] font-bold text-slate-500", children: "\u2191 Toan ([H\u207A] cao, pH < 7.35)" }), a.jsx("div", { className: "absolute bottom-2 left-2 text-[10px] font-bold text-slate-500", children: "\u2193 Ki\u1EC1m ([H\u207A] th\u1EA5p, pH > 7.45)" }), a.jsx("div", { className: "absolute bottom-2 right-4 text-[10px] font-bold text-slate-500", children: "PaCO\u2082 t\u0103ng \u2192" }), a.jsx("div", { className: "absolute left-[35%] bottom-[45%] w-[12%] h-[15%] rounded-md bg-emerald-200/60 border border-emerald-500 flex items-center justify-center text-[10px] font-bold text-emerald-800 pointer-events-none shadow-xs", children: "B\xECnh Th\u01B0\u1EDDng" }), a.jsx("div", { className: "absolute left-[45%] bottom-[30%] w-[35%] h-[35%] rounded-2xl bg-amber-200/40 border border-dashed border-amber-500 rotate-12 flex items-center justify-center text-[10px] font-bold text-amber-900 pointer-events-none", children: "Toan H\xF4 H\u1EA5p C\u1EA5p" }), a.jsx("div", { className: "absolute left-[15%] top-[15%] w-[25%] h-[40%] rounded-2xl bg-rose-200/40 border border-dashed border-rose-500 -rotate-12 flex items-center justify-center text-[10px] font-bold text-rose-900 pointer-events-none", children: "Toan Chuy\u1EC3n H\xF3a" }), a.jsx("div", { className: "absolute left-[15%] bottom-[10%] w-[30%] h-[25%] rounded-2xl bg-blue-200/40 border border-dashed border-blue-500 rotate-6 flex items-center justify-center text-[10px] font-bold text-blue-900 pointer-events-none", children: "Ki\u1EC1m H\xF4 H\u1EA5p C\u1EA5p" }), a.jsxs("div", { className: "absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-all duration-200 flex flex-col items-center pointer-events-none", style: { left: `${Math.min(92, Math.max(8, (O - 10) / 90 * 100))}%`, top: `${Math.min(90, Math.max(10, (o - 6.9) / 0.8 * 100))}%` }, children: [a.jsx("div", { className: "w-4 h-4 rounded-full bg-red-600 border-2 border-white shadow-md animate-ping absolute" }), a.jsx("div", { className: "w-4 h-4 rounded-full bg-red-600 border-2 border-white shadow-md relative" }), a.jsxs("div", { className: "px-1.5 py-0.5 rounded bg-slate-900 text-white text-[9px] font-bold shadow-xs whitespace-nowrap mt-1", children: ["pH ", o.toFixed(2), " | ", O, " mmHg"] })] })] }), a.jsxs("div", { className: "text-xs text-slate-600 bg-indigo-50/60 p-3.5 rounded-xl border border-indigo-100 flex items-start space-x-2", children: [a.jsx("span", { className: "text-indigo-600 font-bold", children: "\u{1F4A1} \xDD ngh\u0129a l\xE2m s\xE0ng:" }), a.jsxs("span", { children: ["N\u1EBFu t\u1ECDa \u0111\u1ED9 \u0111i\u1EC3m c\u1EE7a b\u1EC7nh nh\xE2n n\u1EB1m ", a.jsx("strong", { children: "ngo\xE0i c\xE1c d\u1EA3i gi\u1EDBi h\u1EA1n m\xE0u" }), ", b\u1EC7nh nh\xE2n ch\u1EAFc ch\u1EAFn c\xF3 ", a.jsx("strong", { children: "r\u1ED1i lo\u1EA1n toan ki\u1EC1m h\u1ED7n h\u1EE3p ph\u1EE9c t\u1EA1p" }), " (v\xED d\u1EE5: Toan chuy\u1EC3n h\xF3a k\xE8m Toan h\xF4 h\u1EA5p \u0111\u1ED3ng th\u1EDDi \u1EDF b\u1EC7nh nh\xE2n suy tim \u1EE9 huy\u1EBFt + ph\xF9 ph\u1ED5i)."] })] })] })] })] });
  };
  var ep = ({ initialSubView: u = "scale" }) => {
    const [O, g] = Q.useState(u);
    return a.jsxs("div", { className: "space-y-6", children: [a.jsxs("div", { className: "flex items-center space-x-2 bg-white p-1.5 rounded-xl border border-slate-200 overflow-x-auto shadow-xs", children: [a.jsxs("button", { onClick: () => g("scale"), className: `flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${O === "scale" ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"}`, children: [a.jsx(Vh, { className: "w-4 h-4" }), a.jsx("span", { children: '1. M\xF4 H\xECnh "Chi\u1EBFc C\xE2n Th\u0103ng B\u1EB1ng" & B\xF9 Tr\u1EEB (H\xECnh 11-15)' })] }), a.jsxs("button", { onClick: () => g("oxygen"), className: `flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${O === "oxygen" ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"}`, children: [a.jsx(Ja, { className: "w-4 h-4" }), a.jsx("span", { children: "2. Sinh L\xFD Oxy, \u0110\u01B0\u1EDDng Cong Oxy-Hb & Hi\u1EC7u \u1EE8ng Bohr" })] })] }), O === "scale" && a.jsx("div", { className: "space-y-6", children: a.jsxs("div", { className: "bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6", children: [a.jsxs("div", { className: "border-b border-slate-100 pb-4", children: [a.jsxs("h2", { className: "text-lg font-bold text-slate-900 flex items-center gap-2", children: [a.jsx(Vh, { className: "w-5 h-5 text-indigo-600" }), a.jsx("span", { children: 'M\xF4 H\xECnh "Chi\u1EBFc C\xE2n Th\u0103ng B\u1EB1ng" Toan Ki\u1EC1m (Figures 11 - 15)' })] }), a.jsx("p", { className: "text-xs text-slate-600 mt-1", children: 'Kh\xE1i ni\u1EC7m sinh l\xFD h\u1ECDc kinh \u0111i\u1EC3n \u0111\u01B0\u1EE3c m\xF4 ph\u1ECFng trong "Arterial Blood Gases Made Easy" \u0111\u1EC3 minh h\u1ECDa s\u1EF1 c\xE2n b\u1EB1ng tinh t\u1EBF gi\u1EEFa H\xF4 h\u1EA5p v\xE0 Chuy\u1EC3n h\xF3a.' })] }), a.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [a.jsxs("div", { className: "p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-3", children: [a.jsx("h3", { className: "text-sm font-bold text-slate-900", children: "1. C\u1EA5u Tr\xFAc C\u1EE7a Chi\u1EBFc C\xE2n (The Balance)" }), a.jsxs("p", { className: "text-xs text-slate-600 leading-relaxed", children: ["C\u01A1 th\u1EC3 lu\xF4n n\u1ED7 l\u1EF1c duy tr\xEC t\u1EF7 l\u1EC7 ", a.jsx("strong", { children: "[HCO\u2083\u207B] / [H\u2082CO\u2083] = 20 : 1" }), " \u0111\u1EC3 gi\u1EEF pH m\xE1u \u1EDF m\u1EE9c 7.40 theo ph\u01B0\u01A1ng tr\xECnh Henderson-Hasselbalch:"] }), a.jsx("div", { className: "p-3 bg-white rounded-lg border border-slate-200 text-center font-mono text-xs font-bold text-blue-900", children: "pH = 6.1 + log ([HCO\u2083\u207B] / [0.03 \xD7 PaCO\u2082])" }), a.jsxs("div", { className: "grid grid-cols-2 gap-2 text-xs", children: [a.jsxs("div", { className: "p-2.5 bg-rose-50 rounded-lg border border-rose-200 text-rose-900", children: [a.jsx("strong", { className: "block text-rose-950 font-bold", children: "C\xE1nh tay Ax\xEDt (Acid):" }), "\u0110i\u1EC1u h\xF2a b\u1EDFi ", a.jsx("strong", { children: "PH\u1ED4I" }), " qua vi\u1EC7c \u0111\xE0o th\u1EA3i kh\xED CO\u2082 bay h\u01A1i (PaCO\u2082). Ph\u1EA3n \u1EE9ng t\xEDnh b\u1EB1ng ph\xFAt."] }), a.jsxs("div", { className: "p-2.5 bg-blue-50 rounded-lg border border-blue-200 text-blue-900", children: [a.jsx("strong", { className: "block text-blue-950 font-bold", children: "C\xE1nh tay Baz\u01A1 (Base):" }), "\u0110i\u1EC1u h\xF2a b\u1EDFi ", a.jsx("strong", { children: "TH\u1EACN" }), " qua vi\u1EC7c t\xE1i h\u1EA5p thu ho\u1EB7c b\xE0i ti\u1EBFt ion HCO\u2083\u207B kh\xF4ng bay h\u01A1i. Ph\u1EA3n \u1EE9ng c\u1EA7n 24 - 48 gi\u1EDD."] })] })] }), a.jsxs("div", { className: "p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-3", children: [a.jsx("h3", { className: "text-sm font-bold text-slate-900", children: "2. B\u1ED1n Tr\u1EA1ng Th\xE1i Th\u0103ng B\u1EB1ng L\xE2m S\xE0ng" }), a.jsxs("div", { className: "space-y-2 text-xs", children: [a.jsxs("div", { className: "p-2.5 bg-white rounded-lg border border-slate-200", children: [a.jsx("span", { className: "font-bold text-slate-900 block", children: "\u2022 Ch\u01B0a b\xF9 tr\u1EEB (Uncompensated):" }), "M\u1ED9t c\u01A1 quan b\u1ECB b\u1EC7nh l\xE0m l\u1EC7ch h\u1EB3n c\xE1n c\xE2n; c\u01A1 quan \u0111\u1ED1i di\u1EC7n ", a.jsx("strong", { children: "ho\xE0n to\xE0n b\xECnh th\u01B0\u1EDDng" }), " (ch\u01B0a k\u1ECBp ph\u1EA3n \u1EE9ng). pH b\u1EA5t th\u01B0\u1EDDng."] }), a.jsxs("div", { className: "p-2.5 bg-white rounded-lg border border-slate-200", children: [a.jsx("span", { className: "font-bold text-slate-900 block", children: "\u2022 B\xF9 tr\u1EEB b\xE1n ph\u1EA7n (Partially Compensated):" }), "C\u01A1 quan \u0111\u1ED1i di\u1EC7n \u0111\xE3 g\u1EAFng s\u1EE9c di chuy\u1EC3n \u0111\u1EC3 k\xE9o l\u1EA1i th\u0103ng b\u1EB1ng, nh\u01B0ng ", a.jsx("strong", { children: "pH v\u1EABn ch\u01B0a v\u1EC1 kho\u1EA3ng an to\xE0n 7.35 - 7.45" }), "."] }), a.jsxs("div", { className: "p-2.5 bg-white rounded-lg border border-slate-200", children: [a.jsx("span", { className: "font-bold text-slate-900 block", children: "\u2022 B\xF9 tr\u1EEB ho\xE0n to\xE0n (Fully Compensated):" }), "C\u01A1 quan \u0111\u1ED1i di\u1EC7n \u0111\xE3 \u0111\u1EA1t tr\u1EA1ng th\xE1i c\xE2n b\u1EB1ng m\u1EDBi, ", a.jsx("strong", { children: "pH \u0111\xE3 tr\u1EDF v\u1EC1 kho\u1EA3ng 7.35 - 7.45" }), "."] }), a.jsxs("div", { className: "p-2.5 bg-white rounded-lg border border-slate-200", children: [a.jsx("span", { className: "font-bold text-slate-900 block", children: "\u2022 R\u1ED1i lo\u1EA1n h\u1ED7n h\u1EE3p (Mixed Disorders):" }), "C\u1EA3 hai c\u01A1 quan c\xF9ng b\u1ECB suy tho\xE1i theo c\xF9ng m\u1ED9t chi\u1EC1u ho\u1EB7c c\xF3 2 b\u1EC7nh l\xFD \u0111\u1ED9c l\u1EADp t\xE1c \u0111\u1ED9ng \u0111\u1ED1i kh\xE1ng nhau."] })] })] })] }), a.jsxs("div", { className: "p-5 rounded-xl border border-amber-300 bg-amber-50/60 space-y-3", children: [a.jsxs("div", { className: "flex items-center space-x-2 text-amber-900 font-bold text-sm", children: [a.jsx(pn, { className: "w-5 h-5 text-amber-600" }), a.jsx("span", { children: 'Quy T\u1EAFc V\xE0ng: "C\u01A1 Th\u1EC3 Kh\xF4ng Bao Gi\u1EDD T\u1EF1 B\xF9 Tr\u1EEB Qu\xE1 M\u1EE9c!"' })] }), a.jsxs("p", { className: "text-xs text-amber-950 leading-relaxed", children: ["H\u1EC7 th\u1ED1ng b\xF9 tr\u1EEB sinh l\xFD c\u1EE7a c\u01A1 th\u1EC3 ch\u1EC9 c\xF3 th\u1EC3 \u0111\u01B0a pH ti\u1EC7m c\u1EADn m\u1EE9c b\xECnh th\u01B0\u1EDDng (7.35 - 7.45) nh\u01B0ng ", a.jsx("strong", { children: "KH\xD4NG BAO GI\u1EDC v\u01B0\u1EE3t qua ranh gi\u1EDBi 7.40" }), " sang c\u1EF1c \u0111\u1ED1i di\u1EC7n.", a.jsx("br", {}), a.jsx("em", { className: "font-semibold", children: "V\xED d\u1EE5 minh h\u1ECDa:" }), " N\u1EBFu b\u1EC7nh nh\xE2n c\xF3 toan chuy\u1EC3n h\xF3a ti\xEAn ph\xE1t (pH l\xFAc \u0111\u1EA7u < 7.35), ph\u1ED5i s\u1EBD t\u0103ng th\xF4ng kh\xED \u0111\u1EC3 h\u1EA1 PaCO\u2082. Khi b\xF9 ho\xE0n to\xE0n, pH ch\u1EC9 c\xF3 th\u1EC3 d\u1EEBng \u1EDF m\u1EE9c ", a.jsx("strong", { children: "7.36 \u2013 7.39" }), ". N\u1EBFu pH \u0111o \u0111\u01B0\u1EE3c l\u1EA1i l\xE0 ", a.jsx("strong", { children: "7.48" }), ", b\u1EC7nh nh\xE2n CH\u1EAEC CH\u1EAEN \u0111ang m\u1EAFc th\xEAm m\u1ED9t r\u1ED1i lo\u1EA1n ", a.jsx("strong", { children: "Ki\u1EC1m H\xF4 H\u1EA5p \u0111\u1ED9c l\u1EADp" }), "!"] })] })] }) }), O === "oxygen" && a.jsx("div", { className: "space-y-6", children: a.jsxs("div", { className: "bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6", children: [a.jsxs("div", { className: "border-b border-slate-100 pb-4", children: [a.jsxs("h2", { className: "text-lg font-bold text-slate-900 flex items-center gap-2", children: [a.jsx(Ja, { className: "w-5 h-5 text-blue-600" }), a.jsx("span", { children: "Sinh L\xFD V\u1EADn Chuy\u1EC3n Oxy, \u0110\u01B0\u1EDDng Cong Oxy-Hb & Hi\u1EC7u \u1EE8ng Bohr" })] }), a.jsx("p", { className: "text-xs text-slate-600 mt-1", children: "C\u01A1 ch\u1EBF sinh l\xFD h\u1ECDc chi ph\u1ED1i s\u1EF1 g\u1EAFn k\u1EBFt v\xE0 gi\u1EA3i ph\xF3ng oxy t\u1EEB mao m\u1EA1ch ph\u1ED5i \u0111\u1EBFn m\xF4 \u0111\xEDch c\u01A1 th\u1EC3." })] }), a.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [a.jsxs("div", { className: "p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-4", children: [a.jsxs("h3", { className: "text-sm font-bold text-slate-900 flex items-center gap-2", children: [a.jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-blue-600" }), "\u0110\u01B0\u1EDDng Cong Ph\xE2n Ly Oxyhemoglobin (Figure 5)"] }), a.jsx("p", { className: "text-xs text-slate-600 leading-relaxed", children: "\u0110\u01B0\u1EDDng bi\u1EC3u di\u1EC5n m\u1ED1i quan h\u1EC7 gi\u1EEFa PaO\u2082 (\xE1p l\u1EF1c oxy h\xF2a tan) v\xE0 SaO\u2082 (\u0111\u1ED9 b\xE3o h\xF2a oxy tr\xEAn hemoglobin) c\xF3 h\xECnh ch\u1EEF S \u0111\u1EB7c tr\u01B0ng:" }), a.jsxs("div", { className: "space-y-2 text-xs", children: [a.jsxs("div", { className: "p-3 bg-white rounded-lg border border-slate-200", children: [a.jsx("strong", { className: "text-slate-900 block font-bold", children: "1. \u0110o\u1EA1n B\u1EB1ng Ph\u1EB3ng Tr\xEAn (PaO\u2082 > 60 mmHg / SaO\u2082 > 90%):" }), "L\xE0 kho\u1EA3ng an to\xE0n c\u1EE7a c\u01A1 th\u1EC3 t\u1EA1i ph\u1ED5i. Khi PaO\u2082 t\u1EEB 60 \u0111\u1EBFn 100 mmHg, SaO\u2082 ch\u1EC9 thay \u0111\u1ED5i r\u1EA5t \xEDt (t\u1EEB 90% l\xEAn 98%)."] }), a.jsxs("div", { className: "p-3 bg-white rounded-lg border border-rose-200 bg-rose-50/40", children: [a.jsx("strong", { className: "text-rose-900 block font-bold", children: "2. \u0110o\u1EA1n D\u1ED1c \u0110\u1EE9ng (PaO\u2082 < 60 mmHg / SaO\u2082 < 90%):" }), "V\xF9ng nguy hi\u1EC3m! Ch\u1EC9 c\u1EA7n m\u1ED9t s\u1EF1 s\u1EE5t gi\u1EA3m nh\u1EB9 c\u1EE7a PaO\u2082 s\u1EBD d\u1EABn \u0111\u1EBFn vi\u1EC7c SaO\u2082 t\u1EE5t d\u1ED1c th\u1EA3m h\u1EA1i, khi\u1EBFn m\xF4 r\u01A1i v\xE0o thi\u1EBFu oxy tr\u1EA7m tr\u1ECDng."] })] }), a.jsxs("div", { className: "p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900", children: [a.jsx("strong", { children: "Quy t\u1EAFc l\xE2m s\xE0ng 30-60-90:" }), " PaO\u2082 30 mmHg t\u01B0\u01A1ng \u1EE9ng SaO\u2082 \u2248 60%; PaO\u2082 60 mmHg t\u01B0\u01A1ng \u1EE9ng SaO\u2082 \u2248 90%."] })] }), a.jsxs("div", { className: "p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-4", children: [a.jsxs("h3", { className: "text-sm font-bold text-slate-900 flex items-center gap-2", children: [a.jsx(Rx, { className: "w-4 h-4 text-rose-600" }), "Hi\u1EC7u \u1EE8ng Bohr & Chuy\u1EC3n D\u1ECBch \u0110\u01B0\u1EDDng Cong"] }), a.jsx("p", { className: "text-xs text-slate-600 leading-relaxed", children: "\xC1i l\u1EF1c c\u1EE7a Hemoglobin v\u1EDBi Oxy kh\xF4ng c\u1ED1 \u0111\u1ECBnh m\xE0 thay \u0111\u1ED5i linh ho\u1EA1t t\xF9y theo m\xF4i tr\u01B0\u1EDDng vi tu\u1EA7n ho\xE0n t\u1EA1i m\xF4:" }), a.jsxs("div", { className: "space-y-2.5 text-xs", children: [a.jsxs("div", { className: "p-3 bg-white rounded-lg border border-rose-200", children: [a.jsx("strong", { className: "text-rose-800 block font-bold", children: "L\u1EC7ch PH\u1EA2I (Right Shift) - Gi\u1EA3m \xE1i l\u1EF1c, d\u1EC5 nh\u1EA3 O\u2082 cho m\xF4:" }), "X\u1EA3y ra khi m\xF4 t\u0103ng chuy\u1EC3n h\xF3a c\u1EA7n nhi\u1EC1u oxy:", a.jsxs("div", { className: "grid grid-cols-2 gap-1 mt-1 text-slate-600", children: [a.jsx("span", { children: "\u2022 T\u0103ng [H\u207A] (pH gi\u1EA3m / Toan)" }), a.jsx("span", { children: "\u2022 T\u0103ng PaCO\u2082" }), a.jsx("span", { children: "\u2022 T\u0103ng Th\xE2n nhi\u1EC7t (S\u1ED1t)" }), a.jsx("span", { children: "\u2022 T\u0103ng 2,3-DPG" })] })] }), a.jsxs("div", { className: "p-3 bg-white rounded-lg border border-blue-200", children: [a.jsx("strong", { className: "text-blue-800 block font-bold", children: "L\u1EC7ch TR\xC1I (Left Shift) - T\u0103ng \xE1i l\u1EF1c, gi\u1EEF ch\u1EB7t O\u2082:" }), "Hemoglobin ng\u1EADm ch\u1EB7t oxy, kh\xF3 ph\xF3ng th\xEDch nu\xF4i m\xF4:", a.jsxs("div", { className: "grid grid-cols-2 gap-1 mt-1 text-slate-600", children: [a.jsx("span", { children: "\u2022 Gi\u1EA3m [H\u207A] (pH t\u0103ng / Ki\u1EC1m)" }), a.jsx("span", { children: "\u2022 Gi\u1EA3m PaCO\u2082" }), a.jsx("span", { children: "\u2022 H\u1EA1 th\xE2n nhi\u1EC7t (L\u1EA1nh)" }), a.jsx("span", { children: "\u2022 Ng\u1ED9 \u0111\u1ED9c kh\xED CO (HbCO)" })] })] })] })] })] }), a.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 pt-2", children: [a.jsxs("div", { className: "p-4 rounded-xl border border-indigo-200 bg-indigo-50/40 space-y-2", children: [a.jsxs("div", { className: "flex items-center space-x-2 text-indigo-900 font-bold text-sm", children: [a.jsx(fm, { className: "w-4 h-4 text-indigo-600" }), a.jsx("span", { children: "Quy T\u1EAFc \u01AF\u1EDBc T\xEDnh PaO\u2082 Theo Tu\u1ED5i" })] }), a.jsx("p", { className: "text-xs text-slate-600 leading-relaxed", children: "\xC1p l\u1EF1c oxy trong m\xE1u gi\u1EA3m d\u1EA7n theo tu\u1ED5i t\xE1c do gi\u1EA3m \u0111\xE0n h\u1ED3i ph\u1EBF nang v\xE0 t\u0103ng \u0111\xF3ng \u0111\u01B0\u1EDDng d\u1EABn kh\xED s\u1EDBm:" }), a.jsx("div", { className: "p-2.5 bg-white rounded-lg border border-indigo-200 font-mono text-xs font-bold text-indigo-950 text-center", children: "PaO\u2082 (kh\xED tr\u1EDDi) \u2248 100 - (Tu\u1ED5i / 3) mmHg" }), a.jsx("p", { className: "text-[11px] text-slate-500", children: "V\xED d\u1EE5: B\u1EC7nh nh\xE2n 75 tu\u1ED5i c\xF3 PaO\u2082 d\u1EF1 ki\u1EBFn l\xE0 100 - 25 = 75 mmHg. M\u1ED9t tr\u1ECB s\u1ED1 PaO\u2082 72 mmHg \u1EDF ng\u01B0\u1EDDi 80 tu\u1ED5i l\xE0 ch\u1EA5p nh\u1EADn \u0111\u01B0\u1EE3c." })] }), a.jsxs("div", { className: "p-4 rounded-xl border border-rose-200 bg-rose-50/40 space-y-2", children: [a.jsxs("div", { className: "flex items-center space-x-2 text-rose-900 font-bold text-sm", children: [a.jsx(pn, { className: "w-4 h-4 text-rose-600" }), a.jsx("span", { children: "Nguy C\u01A1 Th\u1EDF Oxy Li\u1EC1u Cao (Hypoxic Drive)" })] }), a.jsxs("p", { className: "text-xs text-slate-600 leading-relaxed", children: ["\u1EDE b\u1EC7nh nh\xE2n COPD \u1EE9 CO\u2082 m\u1EA1n t\xEDnh, trung t\xE2m h\xF4 h\u1EA5p t\u1EA1i n\xE3o b\u1ECB tr\u01A1 v\u1EDBi CO\u2082; nh\u1ECBp th\u1EDF \u0111\u01B0\u1EE3c duy tr\xEC ch\u1EE7 y\u1EBFu b\u1EDFi ", a.jsx("strong", { children: "th\u1EE5 th\u1EC3 c\u1EA3m nh\u1EADn gi\u1EA3m oxy" }), "."] }), a.jsxs("div", { className: "p-2.5 bg-white rounded-lg border border-rose-200 text-xs text-rose-950", children: ["Th\u1EDF oxy n\u1ED3ng \u0111\u1ED9 cao (FiO\u2082 100%) s\u1EBD l\xE0m tri\u1EC7t ti\xEAu k\xEDch th\xEDch n\xE0y, khi\u1EBFn b\u1EC7nh nh\xE2n th\u1EDF ch\u1EADm l\u1EA1i, g\xE2y \u1EE9 \u0111\u1ECDng CO\u2082 c\u1EF1c n\u1EB7ng d\u1EABn \u0111\u1EBFn h\xF4n m\xEA toan h\xF4 h\u1EA5p! M\u1EE5c ti\xEAu SpO\u2082 an to\xE0n: ", a.jsx("strong", { children: "88 - 92%" }), "."] })] })] })] }) })] });
  };
  var np = ({ initialSubView: u = "sampling" }) => {
    const [O, g] = Q.useState(u);
    return a.jsxs("div", { className: "space-y-6", children: [a.jsxs("div", { className: "flex items-center space-x-2 bg-white p-1.5 rounded-xl border border-slate-200 overflow-x-auto shadow-xs", children: [a.jsxs("button", { onClick: () => g("sampling"), className: `flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${O === "sampling" ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"}`, children: [a.jsx(Xh, { className: "w-4 h-4" }), a.jsx("span", { children: "1. K\u1EF9 Thu\u1EADt L\u1EA5y M\xE1u \u0110M & Test Allen C\u1EA3i Bi\xEAn" })] }), a.jsxs("button", { onClick: () => g("vbg"), className: `flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${O === "vbg" ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"}`, children: [a.jsx(hm, { className: "w-4 h-4" }), a.jsx("span", { children: "2. \u0110\u1ED1i Chi\u1EBFu Kh\xED M\xE1u \u0110M (ABG) vs T\u0129nh M\u1EA1ch (VBG)" })] })] }), O === "sampling" && a.jsx("div", { className: "space-y-6", children: a.jsxs("div", { className: "bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6", children: [a.jsxs("div", { className: "border-b border-slate-100 pb-4", children: [a.jsxs("h2", { className: "text-lg font-bold text-slate-900 flex items-center gap-2", children: [a.jsx(Xh, { className: "w-5 h-5 text-indigo-600" }), a.jsx("span", { children: "K\u1EF9 Thu\u1EADt L\u1EA5y M\xE1u \u0110\u1ED9ng M\u1EA1ch & Nghi\u1EC7m Ph\xE1p Allen C\u1EA3i Bi\xEAn" })] }), a.jsx("p", { className: "text-xs text-slate-600 mt-1", children: "Quy tr\xECnh chu\u1EA9n h\xF3a gi\xFAp \u0111\u1EA3m b\u1EA3o an to\xE0n tu\u1EA7n ho\xE0n b\xE0n tay v\xE0 ng\u0103n ng\u1EEBa c\xE1c sai s\u1ED1 tr\u01B0\u1EDBc ph\xE2n t\xEDch (Pre-analytical errors)." })] }), a.jsxs("div", { className: "p-5 rounded-xl border border-blue-200 bg-blue-50/40 space-y-4", children: [a.jsxs("div", { className: "flex items-center justify-between", children: [a.jsxs("h3", { className: "text-sm font-bold text-blue-950 flex items-center gap-2", children: [a.jsx(cm, { className: "w-4 h-4 text-blue-600" }), "Nghi\u1EC7m Ph\xE1p Allen C\u1EA3i Bi\xEAn (Modified Allen's Test)"] }), a.jsx("span", { className: "text-[11px] font-bold px-2 py-0.5 bg-blue-100 text-blue-800 rounded-md", children: "B\u1EAFt bu\u1ED9c tr\u01B0\u1EDBc khi ch\u1ECDc \u0110M quay" })] }), a.jsxs("p", { className: "text-xs text-slate-700 leading-relaxed", children: ["M\u1EE5c \u0111\xEDch: \u0110\xE1nh gi\xE1 l\u01B0u th\xF4ng tu\u1EA7n ho\xE0n b\xE0ng h\u1EC7 c\u1EE7a ", a.jsx("strong", { children: "\u0110\u1ED9ng m\u1EA1ch tr\u1EE5" }), " qua cung \u0111\u1ED9ng m\u1EA1ch gan tay n\xF4ng, \u0111\u1EC1 ph\xF2ng ho\u1EA1i t\u1EED b\xE0n tay n\u1EBFu \u0110M quay b\u1ECB co th\u1EAFt ho\u1EB7c huy\u1EBFt kh\u1ED1i t\u1EAFc ngh\u1EBDn."] }), a.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs", children: [a.jsxs("div", { className: "p-3 bg-white rounded-xl border border-blue-200 space-y-1", children: [a.jsx("div", { className: "w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center", children: "1" }), a.jsx("strong", { className: "text-slate-900 block font-bold", children: "N\u1EAFm ch\u1EB7t tay" }), a.jsx("span", { className: "text-slate-600", children: "B\u1EA3o b\u1EC7nh nh\xE2n n\u1EAFm ch\u1EB7t b\xE0n tay l\u1EA1i trong 30 gi\xE2y \u0111\u1EC3 \u0111\u1EA9y h\u1EBFt m\xE1u ra kh\u1ECFi b\xE0n tay." })] }), a.jsxs("div", { className: "p-3 bg-white rounded-xl border border-blue-200 space-y-1", children: [a.jsx("div", { className: "w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center", children: "2" }), a.jsx("strong", { className: "text-slate-900 block font-bold", children: "\xC9p 2 \u0111\u1ED9ng m\u1EA1ch" }), a.jsx("span", { className: "text-slate-600", children: "Ng\u01B0\u1EDDi th\u1EF1c hi\u1EC7n d\xF9ng 2 ng\xF3n tay \u1EA5n \u0111\xE8 ch\u1EB7t \u0111\u1ED3ng th\u1EDDi c\u1EA3 \u0110M quay v\xE0 \u0110M tr\u1EE5 \u1EDF c\u1ED5 tay." })] }), a.jsxs("div", { className: "p-3 bg-white rounded-xl border border-blue-200 space-y-1", children: [a.jsx("div", { className: "w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center", children: "3" }), a.jsx("strong", { className: "text-slate-900 block font-bold", children: "M\u1EDF b\xE0n tay" }), a.jsx("span", { className: "text-slate-600", children: "Y\xEAu c\u1EA7u b\u1EC7nh nh\xE2n m\u1EDF b\xE0n tay ra nh\u1EB9 nh\xE0ng. L\xF2ng b\xE0n tay l\xFAc n\xE0y s\u1EBD tr\u1EAFng b\u1EC7ch, nh\u1EE3t nh\u1EA1t." })] }), a.jsxs("div", { className: "p-3 bg-white rounded-xl border border-blue-200 space-y-1", children: [a.jsx("div", { className: "w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center", children: "4" }), a.jsx("strong", { className: "text-slate-900 block font-bold", children: "Th\u1EA3 \u0111\u1ED9ng m\u1EA1ch tr\u1EE5" }), a.jsx("span", { className: "text-slate-600", children: "Th\u1EA3 \xE1p l\u1EF1c \u1EDF \u0110\u1ED9ng M\u1EA1ch Tr\u1EE5 trong khi v\u1EABn gi\u1EEF ch\u1EB7t \u0110M quay, quan s\xE1t th\u1EDDi gian h\u1ED3ng h\xE0o tr\u1EDF l\u1EA1i." })] }), a.jsxs("div", { className: "p-3 bg-white rounded-xl border border-blue-200 space-y-1", children: [a.jsx("div", { className: "w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center", children: "5" }), a.jsx("strong", { className: "text-slate-900 block font-bold", children: "\u0110\xE1nh gi\xE1 k\u1EBFt qu\u1EA3" }), a.jsxs("span", { className: "text-slate-600", children: [a.jsx("strong", { children: "D\u01B0\u01A1ng t\xEDnh (< 7 - 10s):" }), " B\xECnh th\u01B0\u1EDDng, an to\xE0n \u0111\u1EC3 l\u1EA5y m\xE1u.", a.jsx("br", {}), a.jsx("strong", { className: "text-rose-600", children: "\xC2m t\xEDnh (> 10s):" }), " Ch\u1ED1ng ch\u1EC9 \u0111\u1ECBnh ch\u1ECDc \u0110M quay b\xEAn n\xE0y!"] })] })] })] }), a.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [a.jsxs("div", { className: "p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-3", children: [a.jsx("h3", { className: "text-sm font-bold text-slate-900", children: "K\u1EF9 Thu\u1EADt \u0110\xE2m Kim L\u1EA5y M\xE1u \u0110M" }), a.jsxs("div", { className: "space-y-2 text-xs text-slate-700", children: [a.jsxs("div", { className: "p-2.5 bg-white rounded-lg border border-slate-200", children: [a.jsx("strong", { className: "text-slate-900 block", children: "1. V\u1ECB tr\xED \u01B0u ti\xEAn:" }), "\u0110\u1ED9ng m\u1EA1ch quay \u1EDF c\u1ED5 tay (c\xE1ch n\u1EBFp g\u1EA5p c\u1ED5 tay 1 - 2 cm). N\u1EBFu kh\xF4ng th\xE0nh c\xF4ng: \u0110M c\xE1nh tay (nguy c\u01A1 thi\u1EBFu m\xE1u c\u1EB3ng tay cao h\u01A1n) ho\u1EB7c \u0110M b\u1EB9n (nguy c\u01A1 nhi\u1EC5m tr\xF9ng cao h\u01A1n)."] }), a.jsxs("div", { className: "p-2.5 bg-white rounded-lg border border-slate-200", children: [a.jsx("strong", { className: "text-slate-900 block", children: "2. G\xF3c \u0111\xE2m kim:" }), "Nghi\xEAng ", a.jsx("strong", { children: "45 \u0111\u1ED9" }), " ng\u01B0\u1EE3c chi\u1EC1u d\xF2ng m\xE1u (v\u1EDBi \u0110M quay); 60 \u0111\u1ED9 v\u1EDBi \u0110M c\xE1nh tay; 90 \u0111\u1ED9 v\u1EDBi \u0110M b\u1EB9n. M\u1EB7t v\xE1t kim h\u01B0\u1EDBng l\xEAn tr\xEAn."] }), a.jsxs("div", { className: "p-2.5 bg-white rounded-lg border border-slate-200", children: [a.jsx("strong", { className: "text-slate-900 block", children: "3. D\u1EA5u hi\u1EC7u \u0111\xFAng \u0111\u1ED9ng m\u1EA1ch:" }), "M\xE1u \u0111\u1ECF t\u01B0\u01A1i t\u1EF1 \u0111\u1ED9ng \u0111\u1EA9y p\xEDt-t\xF4ng l\xEAn theo nh\u1ECBp \u0111\u1EADp m\u1EA1ch n\u1EA3y m\xE0 kh\xF4ng c\u1EA7n ph\u1EA3i d\xF9ng l\u1EF1c k\xE9o tay."] }), a.jsxs("div", { className: "p-2.5 bg-white rounded-lg border border-slate-200", children: [a.jsx("strong", { className: "text-slate-900 block", children: "4. \xC9p c\u1EA7m m\xE1u:" }), "\xC9p ch\u1EB7t v\u1ECB tr\xED ch\u1ECDc li\xEAn t\u1EE5c b\u1EB1ng g\u1EA1c v\xF4 khu\u1EA9n \xEDt nh\u1EA5t ", a.jsx("strong", { children: "5 ph\xFAt" }), " (10 ph\xFAt n\u1EBFu b\u1EC7nh nh\xE2n \u0111ang d\xF9ng thu\u1ED1c ch\u1ED1ng \u0111\xF4ng)."] })] })] }), a.jsxs("div", { className: "p-5 rounded-xl border border-rose-200 bg-rose-50/40 space-y-3", children: [a.jsxs("h3", { className: "text-sm font-bold text-rose-950 flex items-center gap-2", children: [a.jsx(Vl, { className: "w-4 h-4 text-rose-600" }), "C\xE1c Sai S\u1ED1 Tr\u01B0\u1EDBc Ph\xE2n T\xEDch (Pre-analytical Pitfalls)"] }), a.jsxs("div", { className: "space-y-2 text-xs text-slate-700", children: [a.jsxs("div", { className: "p-2.5 bg-white rounded-lg border border-rose-200", children: [a.jsx("strong", { className: "text-rose-900 block", children: "Bong b\xF3ng kh\xED trong b\u01A1m ti\xEAm:" }), "Kh\xED ph\xF2ng c\xF3 PaO\u2082 \u2248 150 mmHg v\xE0 PCO\u2082 \u2248 0. B\u1ECDt kh\xED l\xE0m PaO\u2082 gi\u1EA3 t\u1EA1o t\u0103ng l\xEAn v\xE0 PaCO\u2082 gi\u1EA3 t\u1EA1o gi\u1EA3m xu\u1ED1ng! Ph\u1EA3i b\xFAng \u0111u\u1ED5i h\u1EBFt b\u1ECDt kh\xED ngay trong 5 gi\xE2y \u0111\u1EA7u."] }), a.jsxs("div", { className: "p-2.5 bg-white rounded-lg border border-rose-200", children: [a.jsx("strong", { className: "text-rose-900 block", children: "Th\u1EEBa ch\u1EA5t ch\u1ED1ng \u0111\xF4ng Heparin:" }), "Heparin l\u1ECFng c\xF3 t\xEDnh toan (pH ~ 7.0). Th\u1EEBa heparin l\xE0m gi\u1EA3m pH gi\u1EA3 t\u1EA1o, pha lo\xE3ng pCO\u2082 v\xE0 ion canxi h\xF3a. N\xEAn d\xF9ng b\u01A1m chuy\xEAn d\u1EE5ng tr\xE1ng s\u1EB5n Heparin kh\xF4 (Lithium Heparin)."] }), a.jsxs("div", { className: "p-2.5 bg-white rounded-lg border border-rose-200", children: [a.jsx("strong", { className: "text-rose-900 block", children: "\u0110\u1EC3 m\u1EABu qu\xE1 l\xE2u ngo\xE0i nhi\u1EC7t \u0111\u1ED9 ph\xF2ng:" }), "B\u1EA1ch c\u1EA7u v\xE0 h\u1ED3ng c\u1EA7u ti\u1EBFp t\u1EE5c chuy\u1EC3n h\xF3a ti\xEAu th\u1EE5 O\u2082 v\xE0 sinh ra CO\u2082 + acid lactic. M\u1EABu ph\u1EA3i \u0111\u01B0\u1EE3c ph\xE2n t\xEDch trong v\xF2ng 10 - 15 ph\xFAt, ho\u1EB7c b\u1EA3o qu\u1EA3n trong \u0111\xE1 l\u1EA1nh n\u1EBFu qu\xE1 30 ph\xFAt."] })] })] })] })] }) }), O === "vbg" && a.jsx("div", { className: "space-y-6", children: a.jsxs("div", { className: "bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6", children: [a.jsxs("div", { className: "border-b border-slate-100 pb-4", children: [a.jsxs("h2", { className: "text-lg font-bold text-slate-900 flex items-center gap-2", children: [a.jsx(hm, { className: "w-5 h-5 text-indigo-600" }), a.jsx("span", { children: "B\u1EA3ng \u0110\u1ED1i Chi\u1EBFu L\xE2m S\xE0ng: Kh\xED M\xE1u \u0110\u1ED9ng M\u1EA1ch (ABG) vs T\u0129nh M\u1EA1ch (VBG)" })] }), a.jsx("p", { className: "text-xs text-slate-600 mt-1", children: "H\u01B0\u1EDBng d\u1EABn th\u1EF1c h\xE0nh l\xE2m s\xE0ng gi\xFAp gi\u1EA3m \u0111au \u0111\u1EDBn cho ng\u01B0\u1EDDi b\u1EC7nh v\xE0 ti\u1EBFt ki\u1EC7m th\u1EDDi gian c\u1EA5p c\u1EE9u khi c\xF3 th\u1EC3 thay th\u1EBF ABG b\u1EB1ng VBG an to\xE0n." })] }), a.jsx("div", { className: "overflow-x-auto", children: a.jsxs("table", { className: "w-full text-xs text-left", children: [a.jsx("thead", { className: "bg-slate-100 text-slate-700 uppercase font-bold border-b border-slate-200", children: a.jsxs("tr", { children: [a.jsx("th", { className: "px-4 py-3", children: "Th\xF4ng s\u1ED1" }), a.jsx("th", { className: "px-4 py-3", children: "Kh\xED M\xE1u \u0110M (ABG)" }), a.jsx("th", { className: "px-4 py-3", children: "Kh\xED M\xE1u T\u0129nh M\u1EA1ch (VBG)" }), a.jsx("th", { className: "px-4 py-3", children: "\u0110\u1ED9 L\u1EC7ch Trung B\xECnh (\u0394 V - A)" }), a.jsx("th", { className: "px-4 py-3", children: "M\u1EE9c \u0110\u1ED9 T\u01B0\u01A1ng Quan L\xE2m S\xE0ng" })] }) }), a.jsxs("tbody", { className: "divide-y divide-slate-100 text-slate-700", children: [a.jsxs("tr", { className: "hover:bg-slate-50", children: [a.jsx("td", { className: "px-4 py-2.5 font-bold text-slate-900", children: "pH" }), a.jsx("td", { className: "px-4 py-2.5", children: "7.35 - 7.45" }), a.jsx("td", { className: "px-4 py-2.5", children: "7.31 - 7.41" }), a.jsx("td", { className: "px-4 py-2.5 text-blue-700 font-bold", children: "- 0.03 \u0111\u1EBFn - 0.05" }), a.jsx("td", { className: "px-4 py-2.5 text-emerald-700 font-bold", children: "R\u1EA5t t\u1ED1t (Thay th\u1EBF ho\xE0n to\xE0n trong toan ki\u1EC1m)" })] }), a.jsxs("tr", { className: "hover:bg-slate-50", children: [a.jsx("td", { className: "px-4 py-2.5 font-bold text-slate-900", children: "PCO\u2082" }), a.jsx("td", { className: "px-4 py-2.5", children: "35 - 45 mmHg" }), a.jsx("td", { className: "px-4 py-2.5", children: "40 - 50 mmHg" }), a.jsx("td", { className: "px-4 py-2.5 text-blue-700 font-bold", children: "+ 4 \u0111\u1EBFn + 6 mmHg" }), a.jsx("td", { className: "px-4 py-2.5 text-emerald-700 font-bold", children: "T\u1ED1t (VBG PvCO\u2082 < 40 mmHg lo\u1EA1i tr\u1EEB toan h\xF4 h\u1EA5p)" })] }), a.jsxs("tr", { className: "hover:bg-slate-50", children: [a.jsx("td", { className: "px-4 py-2.5 font-bold text-slate-900", children: "HCO\u2083\u207B" }), a.jsx("td", { className: "px-4 py-2.5", children: "22 - 28 mmol/L" }), a.jsx("td", { className: "px-4 py-2.5", children: "23 - 29 mmol/L" }), a.jsx("td", { className: "px-4 py-2.5 text-blue-700 font-bold", children: "+ 1 \u0111\u1EBFn + 2 mmol/L" }), a.jsx("td", { className: "px-4 py-2.5 text-emerald-700 font-bold", children: "G\u1EA7n nh\u01B0 t\u01B0\u01A1ng \u0111\u01B0\u01A1ng (Thay th\u1EBF \u0111\u01B0\u1EE3c)" })] }), a.jsxs("tr", { className: "hover:bg-slate-50", children: [a.jsx("td", { className: "px-4 py-2.5 font-bold text-slate-900", children: "Lactate" }), a.jsx("td", { className: "px-4 py-2.5", children: "0.5 - 1.5 mmol/L" }), a.jsx("td", { className: "px-4 py-2.5", children: "0.6 - 1.7 mmol/L" }), a.jsx("td", { className: "px-4 py-2.5 text-blue-700 font-bold", children: "+ 0.2 mmol/L" }), a.jsx("td", { className: "px-4 py-2.5 text-emerald-700 font-bold", children: "T\u01B0\u01A1ng quan ch\u1EB7t ch\u1EBD" })] }), a.jsxs("tr", { className: "hover:bg-slate-50 bg-rose-50/50", children: [a.jsx("td", { className: "px-4 py-2.5 font-bold text-rose-900", children: "PO\u2082 (Ph\xE2n \xE1p oxy)" }), a.jsx("td", { className: "px-4 py-2.5 font-bold text-blue-700", children: "80 - 100 mmHg" }), a.jsx("td", { className: "px-4 py-2.5 text-slate-500", children: "30 - 45 mmHg" }), a.jsx("td", { className: "px-4 py-2.5 text-rose-700 font-bold", children: "Kh\xF4ng th\u1EC3 quy \u0111\u1ED5i!" }), a.jsx("td", { className: "px-4 py-2.5 text-rose-700 font-bold", children: "KH\xD4NG TH\u1EC2 THAY TH\u1EBE (Kh\xF4ng d\xF9ng PvO\u2082 \u0111\xE1nh gi\xE1 oxy h\xF3a)" })] })] })] }) }), a.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [a.jsxs("div", { className: "p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-2", children: [a.jsxs("div", { className: "font-bold flex items-center space-x-1.5 text-emerald-800", children: [a.jsx(cm, { className: "w-4 h-4 text-emerald-600" }), a.jsx("span", { children: "Khi N\xE0o C\xF3 Th\u1EC3 D\xF9ng VBG Thay Cho ABG?" })] }), a.jsxs("p", { className: "leading-relaxed", children: ["\u2022 B\u1EC7nh nh\xE2n \u0111\xE1i th\xE1o \u0111\u01B0\u1EDDng toan ceton (DKA) \u0111ang theo d\xF5i \u0111i\u1EC1u tr\u1ECB truy\u1EC1n insulin v\xE0 b\xF9 d\u1ECBch.", a.jsx("br", {}), "\u2022 B\u1EC7nh nh\xE2n suy th\u1EADn ho\u1EB7c ng\u1ED9 \u0111\u1ED9c c\u1EA7n theo d\xF5i ti\u1EBFn tri\u1EC3n toan chuy\u1EC3n h\xF3a.", a.jsx("br", {}), "\u2022 B\u1EC7nh nh\xE2n nghi ng\u1EDD t\u0103ng th\xF4ng kh\xED ho\u1EB7c c\u01A1n ho\u1EA3ng lo\u1EA1n (PvCO\u2082 b\xECnh th\u01B0\u1EDDng gi\xFAp lo\u1EA1i tr\u1EEB t\u0103ng CO\u2082)."] })] }), a.jsxs("div", { className: "p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-950 space-y-2", children: [a.jsxs("div", { className: "font-bold flex items-center space-x-1.5 text-rose-800", children: [a.jsx(pn, { className: "w-4 h-4 text-rose-600" }), a.jsx("span", { children: "Khi N\xE0o B\u1EAFt Bu\u1ED9c Ph\u1EA3i L\xE0m ABG?" })] }), a.jsxs("p", { className: "leading-relaxed", children: ["\u2022 Nghi ng\u1EDD ho\u1EB7c \u0111\xE1nh gi\xE1 m\u1EE9c \u0111\u1ED9 ", a.jsx("strong", { children: "Suy h\xF4 h\u1EA5p gi\u1EA3m oxy m\xE1u (Type 1)" }), ".", a.jsx("br", {}), "\u2022 C\u1EA7n t\xEDnh ch\xEDnh x\xE1c ch\u1EC9 s\u1ED1 ", a.jsx("strong", { children: "PaO\u2082/FiO\u2082" }), " \u0111\u1EC3 ph\xE2n lo\u1EA1i m\u1EE9c \u0111\u1ED9 ARDS.", a.jsx("br", {}), "\u2022 B\u1EC7nh nh\xE2n s\u1ED1c tu\u1EA7n ho\xE0n n\u1EB7ng c\xF3 co m\u1EA1ch ngo\u1EA1i vi m\u1EA1nh (l\xE0m m\u1EA5t t\u01B0\u01A1ng quan pH t\u0129nh m\u1EA1ch ngo\u1EA1i vi)."] })] })] })] }) })] });
  };
  var Za = [{ id: "ph", term: "pH", fullName: "Potential of Hydrogen - Thang \u0111o \u0111\u1ED9 toan ki\u1EC1m m\xE1u \u0111\u1ED9ng m\u1EA1ch", category: "Ch\u1EC9 s\u1ED1 c\u01A1 b\u1EA3n", normalRange: "7.35 \u2013 7.45 (Chu\u1EA9n sinh l\xFD t\u1ED1i \u01B0u: 7.40)", definition: "Logarit th\u1EADp ph\xE2n \xE2m c\u1EE7a n\u1ED3ng \u0111\u1ED9 ion hydro t\u1EF1 do trong huy\u1EBFt t\u01B0\u01A1ng: pH = -log[H\u207A]. Ph\u1EA3n \xE1nh \u0111\u1ED9 toan (acidaemia khi pH < 7.35) ho\u1EB7c \u0111\u1ED9 ki\u1EC1m (alkalaemia khi pH > 7.45) c\u1EE7a m\xE1u to\xE0n ph\u1EA7n.", clinicalSignificance: "pH quy\u1EBFt \u0111\u1ECBnh c\u1EA5u h\xECnh kh\xF4ng gian b\u1EADc 3 c\u1EE7a m\u1ECDi enzym v\xE0 protein trong c\u01A1 th\u1EC3, \u1EA3nh h\u01B0\u1EDFng tr\u1EF1c ti\u1EBFp \u0111\u1EBFn kh\u1EA3 n\u0103ng co b\xF3p c\u01A1 tim v\xE0 t\xEDnh th\u1EA5m m\xE0ng t\u1EBF b\xE0o. pH < 7.20 ho\u1EB7c > 7.60 l\xE0 t\xECnh tr\u1EA1ng \u0111e d\u1ECDa t\xEDnh m\u1EA1ng c\u1EA5p c\u1EE9u.", pearlsAndWarnings: "pH b\xECnh th\u01B0\u1EDDng (7.35 \u2013 7.45) KH\xD4NG \u0111\u1ED3ng ngh\u0129a v\u1EDBi vi\u1EC7c kh\xF4ng c\xF3 b\u1EC7nh l\xFD toan ki\u1EC1m! B\u1EC7nh nh\xE2n c\xF3 th\u1EC3 c\xF3 r\u1ED1i lo\u1EA1n toan ki\u1EC1m \u0111\xE3 \u0111\u01B0\u1EE3c b\xF9 tr\u1EEB ho\xE0n to\xE0n, ho\u1EB7c r\u1ED1i lo\u1EA1n h\u1ED7n h\u1EE3p \u0111\u1ED1i kh\xE1ng (v\xED d\u1EE5 toan chuy\u1EC3n h\xF3a n\u1EB7ng ph\u1ED1i h\u1EE3p ki\u1EC1m h\xF4 h\u1EA5p).", tags: ["pH", "acidaemia", "alkalaemia", "H+"] }, { id: "paco2", term: "PaCO\u2082 (ho\u1EB7c pCO\u2082)", fullName: "Partial Pressure of Arterial Carbon Dioxide - Ph\xE2n \xE1p kh\xED CO\u2082 trong m\xE1u \u0111\u1ED9ng m\u1EA1ch", category: "Ch\u1EC9 s\u1ED1 c\u01A1 b\u1EA3n", normalRange: "35 \u2013 45 mmHg (ho\u1EB7c 4.7 \u2013 6.0 kPa)", definition: "Ph\xE2n \xE1p ph\u1EA7n kh\xED CO\u2082 h\xF2a tan trong huy\u1EBFt t\u01B0\u01A1ng \u0111\u1ED9ng m\u1EA1ch. Ph\u1EA3n \xE1nh tr\u1EF1c ti\u1EBFp hi\u1EC7u qu\u1EA3 c\u1EE7a th\xF4ng kh\xED ph\u1EBF nang (Alveolar ventilation). CO\u2082 l\xE0 m\u1ED9t acid bay h\u01A1i v\xEC k\u1EBFt h\u1EE3p v\u1EDBi n\u01B0\u1EDBc t\u1EA1o H\u2082CO\u2083.", clinicalSignificance: "PaCO\u2082 > 45 mmHg bi\u1EC3u th\u1ECB gi\u1EA3m th\xF4ng kh\xED ph\u1EBF nang (Alveolar Hypoventilation), d\u1EABn \u0111\u1EBFn toan h\xF4 h\u1EA5p ho\u1EB7c suy h\xF4 h\u1EA5p Type 2. PaCO\u2082 < 35 mmHg bi\u1EC3u th\u1ECB t\u0103ng th\xF4ng kh\xED ph\u1EBF nang (Hyperventilation), d\u1EABn \u0111\u1EBFn ki\u1EC1m h\xF4 h\u1EA5p.", pearlsAndWarnings: "Quy \u0111\u1ED5i nhanh gi\u1EEFa 2 h\u1EC7 \u0111\u01A1n v\u1ECB: 1 kPa \u2248 7.5 mmHg (ho\u1EB7c l\u1EA5y gi\xE1 tr\u1ECB kPa nh\xE2n 7.5). \u1EDE b\u1EC7nh nh\xE2n COPD m\u1EA1n t\xEDnh, t\u0103ng PaCO\u2082 t\u1EEB t\u1EEB \u0111\u01B0\u1EE3c th\u1EADn b\xF9 tr\u1EEB b\u1EB1ng c\xE1ch gi\u1EEF l\u1EA1i HCO\u2083\u207B.", tags: ["pCO2", "PaCO2", "acid bay h\u01A1i", "suy h\xF4 h\u1EA5p type 2"] }, { id: "pao2", term: "PaO\u2082 (ho\u1EB7c pO\u2082)", fullName: "Partial Pressure of Arterial Oxygen - Ph\xE2n \xE1p kh\xED Oxy trong m\xE1u \u0111\u1ED9ng m\u1EA1ch", category: "Ch\u1EC9 s\u1ED1 c\u01A1 b\u1EA3n", normalRange: "80 \u2013 100 mmHg (ho\u1EB7c 11.0 \u2013 14.0 kPa) khi th\u1EDF kh\xED tr\u1EDDi \u1EDF ng\u01B0\u1EDDi tr\u1EBB", definition: "\xC1p l\u1EF1c ri\xEAng ph\u1EA7n c\u1EE7a ph\xE2n t\u1EED oxy h\xF2a tan t\u1EF1 do trong huy\u1EBFt t\u01B0\u01A1ng (ch\u1EC9 chi\u1EBFm ~1.5 - 2% t\u1ED5ng l\u01B0\u1EE3ng O\u2082 trong m\xE1u, ph\u1EA7n c\xF2n l\u1EA1i g\u1EAFn v\u1EDBi Hemoglobin). Ph\u1EA3n \xE1nh kh\u1EA3 n\u0103ng khu\u1EBFch t\xE1n oxy qua m\xE0ng ph\u1EBF nang - mao m\u1EA1ch.", clinicalSignificance: "PaO\u2082 < 60 mmHg (8 kPa) tr\xEAn kh\xED tr\u1EDDi x\xE1c \u0111\u1ECBnh t\xECnh tr\u1EA1ng suy h\xF4 h\u1EA5p c\u1EA5p (Respiratory Failure) v\xE0 b\u1EAFt \u0111\u1EA7u r\u01A1i v\xE0o \u0111o\u1EA1n d\u1ED1c \u0111\u1EE9ng c\u1EE7a \u0111\u01B0\u1EDDng cong ph\xE2n ly Oxyhemoglobin. C\u1EA7n can thi\u1EC7p li\u1EC7u ph\xE1p oxy kh\u1EA9n c\u1EA5p.", pearlsAndWarnings: "PaO\u2082 b\xECnh th\u01B0\u1EDDng gi\u1EA3m d\u1EA7n theo tu\u1ED5i: PaO\u2082 k\u1EF3 v\u1ECDng (mmHg) \u2248 100 - (Tu\u1ED5i / 3). \u0110\xE1nh gi\xE1 PaO\u2082 lu\xF4n b\u1EAFt bu\u1ED9c ph\u1EA3i g\u1EAFn li\u1EC1n v\u1EDBi n\u1ED3ng \u0111\u1ED9 oxy h\xEDt v\xE0o (FiO\u2082). Kh\xF4ng bao gi\u1EDD c\xF3 gi\xE1 tr\u1ECB PaO\u2082 b\xECnh th\u01B0\u1EDDng \u0111\u01A1n l\u1EBB m\xE0 kh\xF4ng bi\u1EBFt FiO\u2082!", tags: ["pO2", "PaO2", "suy h\xF4 h\u1EA5p type 1", "oxy h\xF3a m\xE1u"] }, { id: "hco3", term: "HCO\u2083\u207B (Bicarbonate)", fullName: "Standard / Actual Bicarbonate - N\u1ED3ng \u0111\u1ED9 Ion Bicarbonate huy\u1EBFt t\u01B0\u01A1ng", category: "Ch\u1EC9 s\u1ED1 c\u01A1 b\u1EA3n", normalRange: "22 \u2013 26 mmol/L (ho\u1EB7c mEq/L)", definition: "Th\xE0nh ph\u1EA7n baz\u01A1 quan tr\u1ECDng nh\u1EA5t trong h\u1EC7 \u0111\u1EC7m ngo\u1EA1i b\xE0o c\u1EE7a c\u01A1 th\u1EC3, ch\u1ECBu s\u1EF1 \u0111i\u1EC1u h\xF2a ch\u1EADm c\u1EE7a th\u1EADn (qua t\xE1i h\u1EA5p thu \u1EDF \u1ED1ng l\u01B0\u1EE3n g\u1EA7n v\xE0 b\xE0i ti\u1EBFt H\u207A \u1EDF \u1ED1ng l\u01B0\u1EE3n xa).", clinicalSignificance: "HCO\u2083\u207B < 22 mmol/L bi\u1EC3u th\u1ECB toan chuy\u1EC3n h\xF3a ho\u1EB7c \u0111\xE1p \u1EE9ng b\xF9 tr\u1EEB c\u1EE7a th\u1EADn trong ki\u1EC1m h\xF4 h\u1EA5p m\u1EA1n. HCO\u2083\u207B > 26 mmol/L bi\u1EC3u th\u1ECB ki\u1EC1m chuy\u1EC3n h\xF3a ho\u1EB7c \u0111\xE1p \u1EE9ng b\xF9 tr\u1EEB c\u1EE7a th\u1EADn trong toan h\xF4 h\u1EA5p m\u1EA1n.", pearlsAndWarnings: "Th\u1EADn c\u1EA7n th\u1EDDi gian t\u1EEB 24 \u0111\u1EBFn 72 gi\u1EDD \u0111\u1EC3 \u0111i\u1EC1u ch\u1EC9nh n\u1ED3ng \u0111\u1ED9 HCO\u2083\u207B trong m\xE1u. Do \u0111\xF3 trong toan h\xF4 h\u1EA5p c\u1EA5p (m\u1EDBi x\u1EA3y ra v\xE0i ph\xFAt \u0111\u1EBFn v\xE0i gi\u1EDD), HCO\u2083\u207B g\u1EA7n nh\u01B0 ch\u01B0a k\u1ECBp thay \u0111\u1ED5i!", tags: ["HCO3", "Bicarbonate", "\u0111\u1EC7m th\u1EADn", "toan chuy\u1EC3n h\xF3a"] }, { id: "be", term: "BE (Base Excess / SBE)", fullName: "Standard Base Excess - Ki\u1EC1m d\u01B0 chu\u1EA9n h\xF3a", category: "Ch\u1EC9 s\u1ED1 c\u01A1 b\u1EA3n", normalRange: "-2 \u0111\u1EBFn +2 mmol/L (m\u1EDF r\u1ED9ng -3 \u0111\u1EBFn +3 mmol/L)", definition: "L\u01B0\u1EE3ng acid ho\u1EB7c ki\u1EC1m m\u1EA1nh (t\xEDnh b\u1EB1ng mmol/L) c\u1EA7n th\xEAm v\xE0o \u0111\u1EC3 \u0111\u01B0a 1 l\xEDt m\xE1u to\xE0n ph\u1EA7n v\u1EC1 pH chu\u1EA9n 7.40 \u1EDF \u0111i\u1EC1u ki\u1EC7n PaCO\u2082 = 40 mmHg v\xE0 nhi\u1EC7t \u0111\u1ED9 37\xB0C.", clinicalSignificance: "BE \xE2m t\xEDnh (< -2 \u0111\u1EBFn -3 mmol/L, c\xF2n g\u1ECDi l\xE0 Base Deficit): Th\xE2m h\u1EE5t ki\u1EC1m, bi\u1EC3u th\u1ECB toan chuy\u1EC3n h\xF3a. BE d\u01B0\u01A1ng t\xEDnh (> +2 \u0111\u1EBFn +3 mmol/L): Th\u1EEBa ki\u1EC1m, bi\u1EC3u th\u1ECB ki\u1EC1m chuy\u1EC3n h\xF3a.", pearlsAndWarnings: "Standard Base Excess (SBE) c\xF3 \u01B0u \u0111i\u1EC3m v\u01B0\u1EE3t tr\u1ED9i h\u01A1n HCO\u2083\u207B th\u1EF1c t\u1EBF v\xEC SBE \u0111\xE3 \u0111\u01B0\u1EE3c chu\u1EA9n h\xF3a v\u1EC1 PaCO\u2082 = 40 mmHg, lo\u1EA1i tr\u1EEB \u0111\u01B0\u1EE3c ho\xE0n to\xE0n \u1EA3nh h\u01B0\u1EDFng c\u1EE7a thay \u0111\u1ED5i h\xF4 h\u1EA5p c\u1EA5p t\xEDnh l\xEAn n\u1ED3ng \u0111\u1ED9 ki\u1EC1m.", tags: ["BE", "Base Excess", "Base Deficit", "th\xE2m h\u1EE5t ki\u1EC1m"] }, { id: "sao2", term: "SaO\u2082 (Arterial O\u2082 Saturation)", fullName: "Arterial Oxygen Saturation - \u0110\u1ED9 b\xE3o h\xF2a Oxy c\u1EE7a Hemoglobin m\xE1u \u0111\u1ED9ng m\u1EA1ch", category: "Ch\u1EC9 s\u1ED1 c\u01A1 b\u1EA3n", normalRange: "95% \u2013 98% (tr\xEAn kh\xED tr\u1EDDi \u1EDF ng\u01B0\u1EDDi kh\u1ECFe m\u1EA1nh)", definition: "T\u1EF7 l\u1EC7 ph\u1EA7n tr\u0103m c\xE1c v\u1ECB tr\xED g\u1EAFn oxy tr\xEAn ph\xE2n t\u1EED Hemoglobin trong m\xE1u \u0111\u1ED9ng m\u1EA1ch \u0111ang \u0111\u01B0\u1EE3c g\u1EAFn k\u1EBFt v\u1EDBi oxy: SaO\u2082 = [HbO\u2082] / [T\u1ED5ng Hb c\xF3 kh\u1EA3 n\u0103ng g\u1EAFn k\u1EBFt] \xD7 100%.", clinicalSignificance: "Quy\u1EBFt \u0111\u1ECBnh tr\u1EF1c ti\u1EBFp \u0111\u1EBFn t\u1ED5ng dung t\xEDch mang oxy c\u1EE7a m\xE1u (CaO\u2082). Khi SaO\u2082 t\u1EE5t d\u01B0\u1EDBi 90%, t\u01B0\u01A1ng \u1EE9ng PaO\u2082 t\u1EE5t d\u01B0\u1EDBi 60 mmHg, m\xF4 c\u01A1 th\u1EC3 r\u01A1i v\xE0o t\xECnh tr\u1EA1ng thi\u1EBFu oxy nghi\xEAm tr\u1ECDng.", pearlsAndWarnings: "Kh\xE1c bi\u1EC7t gi\u1EEFa SaO\u2082 (\u0111o tr\u1EF1c ti\u1EBFp b\u1EB1ng m\xE1y ph\xE2n t\xEDch kh\xED m\xE1u qua co-oximetry) v\xE0 SpO\u2082 (\u0111o gi\xE1n ti\u1EBFp qua \u0111\u1EA7u d\xF2 k\u1EB9p m\u1EA1ch n\u1EA3y quang h\u1ECDc). Trong ng\u1ED9 \u0111\u1ED9c CO (Carbon Monoxide), m\xE1y \u0111o SpO\u2082 th\xF4ng th\u01B0\u1EDDng b\u1ECB \u0111\xE1nh l\u1EEBa v\xE0 b\xE1o 99-100% gi\u1EA3 t\u1EA1o!", tags: ["SaO2", "SpO2", "b\xE3o h\xF2a oxy", "co-oximetry"] }, { id: "fio2", term: "FiO\u2082", fullName: "Fraction of Inspired Oxygen - Ph\xE2n su\u1EA5t Oxy trong kh\xED h\xEDt v\xE0o", category: "Ch\u1EC9 s\u1ED1 c\u01A1 b\u1EA3n", normalRange: "0.21 (21%) trong kh\xF4ng kh\xED ph\xF2ng t\u1EF1 nhi\xEAn", definition: "T\u1EF7 l\u1EC7 ph\u1EA7n tr\u0103m oxy trong h\u1ED7n h\u1EE3p kh\xED m\xE0 b\u1EC7nh nh\xE2n h\xEDt v\xE0o ph\u1ED5i. Khi th\u1EDF oxy li\u1EC7u ph\xE1p, FiO\u2082 dao \u0111\u1ED9ng t\u1EEB 24% (g\u1ECDng m\u0169i 1 L/ph\xFAt) \u0111\u1EBFn 100% (mask kh\xF4ng th\u1EDF l\u1EA1i c\xF3 b\xF3ng d\u1EF1 tr\u1EEF ho\u1EB7c m\xE1y th\u1EDF).", clinicalSignificance: "L\xE0 bi\u1EBFn s\u1ED1 b\u1EAFt bu\u1ED9c ph\u1EA3i ghi nh\u1EADn ch\xEDnh x\xE1c t\u1EA1i th\u1EDDi \u0111i\u1EC3m ch\u1ECDc kh\xED m\xE1u \u0111\u1EC3 t\xEDnh to\xE1n P/F ratio, PaO\u2082 k\u1EF3 v\u1ECDng v\xE0 A-a gradient.", pearlsAndWarnings: "Quy t\u1EAFc \u01B0\u1EDBc t\xEDnh nhanh khi th\u1EDF oxy g\u1ECDng m\u0169i (Nasal Cannula): FiO\u2082 \u2248 21% + (L\u01B0u l\u01B0\u1EE3ng l\xEDt/ph\xFAt \xD7 4). V\xED d\u1EE5 2 L/ph\xFAt \u2248 29%; 4 L/ph\xFAt \u2248 37%. V\u1EDBi Mask t\xFAi c\xF3 van m\u1ED9t chi\u1EC1u (Non-rebreather mask 12-15 L/ph\xFAt), FiO\u2082 \u0111\u1EA1t x\u1EA5p x\u1EC9 85-95%.", tags: ["FiO2", "n\u1ED3ng \u0111\u1ED9 oxy", "g\u1ECDng m\u0169i", "mask th\u1EDF"] }, { id: "anion-gap", term: "Anion Gap (AG)", fullName: "Serum Anion Gap - Kho\u1EA3ng tr\u1ED1ng Anion huy\u1EBFt t\u01B0\u01A1ng", category: "C\xF4ng th\u1EE9c & T\u1EF7 s\u1ED1", normalRange: "8 \u2013 16 mEq/L (ho\u1EB7c 12 \xB1 4 khi kh\xF4ng t\xEDnh K\u207A)", definition: "Ch\xEAnh l\u1EC7ch n\u1ED3ng \u0111\u1ED9 gi\u1EEFa c\xE1c cation \u0111o l\u01B0\u1EDDng \u0111\u01B0\u1EE3c v\xE0 anion \u0111o l\u01B0\u1EDDng \u0111\u01B0\u1EE3c trong huy\u1EBFt t\u01B0\u01A1ng: AG = Na\u207A - (Cl\u207B + HCO\u2083\u207B), ho\u1EB7c AG = (Na\u207A + K\u207A) - (Cl\u207B + HCO\u2083\u207B). Th\u1EC3 hi\u1EC7n n\u1ED3ng \u0111\u1ED9 c\xE1c anion kh\xF4ng \u0111o l\u01B0\u1EDDng \u0111\u01B0\u1EE3c (albumin, phosphate, sulfate, lactate, ketoacids).", clinicalSignificance: "D\xF9ng \u0111\u1EC3 ph\xE2n lo\u1EA1i toan chuy\u1EC3n h\xF3a: Toan t\u0103ng AG (> 16-18) do c\xF3 th\xEAm acid c\u1ED1 \u0111\u1ECBnh b\u1EA5t th\u01B0\u1EDDng (DKA, Lactic, suy th\u1EADn, ng\u1ED9 \u0111\u1ED9c c\u1ED3n \u0111\u1ED9c) vs Toan AG b\xECnh th\u01B0\u1EDDng do m\u1EA5t HCO\u2083\u207B b\xF9 b\u1EB1ng Cl\u207B.", pearlsAndWarnings: "Albumin l\xE0 ngu\u1ED3n anion kh\xF4ng \u0111o l\u01B0\u1EDDng l\u1EDBn nh\u1EA5t (~75% gi\xE1 tr\u1ECB AG b\xECnh th\u01B0\u1EDDng). Khi b\u1EC7nh nh\xE2n n\u1EB7ng b\u1ECB gi\u1EA3m Albumin m\xE1u, AG th\u1EF1c t\u1EBF s\u1EBD b\u1ECB t\u1EE5t xu\u1ED1ng gi\u1EA3 t\u1EA1o! Ph\u1EA3i hi\u1EC7u ch\u1EC9nh AG theo c\xF4ng th\u1EE9c Figge.", tags: ["Anion Gap", "AG", "toan chuy\u1EC3n h\xF3a", "GOLDMARK", "HARDUPS"] }, { id: "albumin-corrected-ag", term: "Albumin-corrected AG", fullName: "Hi\u1EC7u ch\u1EC9nh Anion Gap theo n\u1ED3ng \u0111\u1ED9 Albumin huy\u1EBFt t\u01B0\u01A1ng (C\xF4ng th\u1EE9c Figge)", category: "C\xF4ng th\u1EE9c & T\u1EF7 s\u1ED1", normalRange: "Kho\u1EA3ng tham chi\u1EBFu t\u01B0\u01A1ng t\u1EF1 AG (8 \u2013 16 mEq/L)", definition: "C\xF4ng th\u1EE9c hi\u1EC7u ch\u1EC9nh: AG hi\u1EC7u ch\u1EC9nh = AG t\xEDnh to\xE1n + 2.5 \xD7 [4.0 - Albumin (g/dL)] (ho\u1EB7c + 0.25 \xD7 [40 - Albumin g/L]).", clinicalSignificance: "\u1EDE b\u1EC7nh nh\xE2n h\u1ED3i s\u1EE9c ICU c\xF3 t\xECnh tr\u1EA1ng suy dinh d\u01B0\u1EE1ng, b\u1ECFng, s\u1ED1c nhi\u1EC5m khu\u1EA9n g\xE2y gi\u1EA3m n\u1EB7ng Albumin (v\xED d\u1EE5 Albumin = 2.0 g/dL), AG \u0111o \u0111\u01B0\u1EE3c c\xF3 th\u1EC3 b\xECnh th\u01B0\u1EDDng nh\u01B0ng th\u1EF1c ch\u1EA5t l\xE0 Toan T\u0102NG Anion Gap nghi\xEAm tr\u1ECDng b\u1ECB che gi\u1EA5u!", pearlsAndWarnings: "M\u1ED7i khi Albumin huy\u1EBFt thanh gi\u1EA3m 1.0 g/dL (10 g/L), gi\xE1 tr\u1ECB Anion Gap t\xEDnh to\xE1n s\u1EBD gi\u1EA3m \u0111i kho\u1EA3ng 2.5 mEq/L.", tags: ["Albumin", "Figge", "AG hi\u1EC7u ch\u1EC9nh", "ICU"] }, { id: "delta-gap", term: "Delta Ratio (\u0394AG / \u0394HCO\u2083\u207B)", fullName: "T\u1EF7 s\u1ED1 Delta - So s\xE1nh bi\u1EBFn thi\xEAn Anion Gap v\u1EDBi bi\u1EBFn thi\xEAn Bicarbonate", category: "C\xF4ng th\u1EE9c & T\u1EF7 s\u1ED1", normalRange: "1.0 \u2013 1.6 (trong toan t\u0103ng Anion Gap \u0111\u01A1n thu\u1EA7n)", definition: "T\u1EF7 s\u1ED1 gi\u1EEFa m\u1EE9c t\u0103ng th\xEAm c\u1EE7a Anion Gap so v\u1EDBi m\u1EE9c gi\u1EA3m \u0111i c\u1EE7a Bicarbonate: Delta Ratio = (AG \u0111o \u0111\u01B0\u1EE3c - 12) / (24 - HCO\u2083\u207B \u0111o \u0111\u01B0\u1EE3c).", clinicalSignificance: `\u2022 Delta Ratio < 0.4 - 0.8: C\xF3 TOAN CHUY\u1EC2N H\xD3A AG B\xCCNH TH\u01AF\u1EDCNG (t\u0103ng Cl\u207B) \u0111i k\xE8m (m\u1EA5t th\xEAm bicarb do ti\xEAu ch\u1EA3y ho\u1EB7c suy th\u1EADn).
\u2022 Delta Ratio 1.0 - 1.6: Toan t\u0103ng AG \u0111\u01A1n thu\u1EA7n (v\xED d\u1EE5 DKA ho\u1EB7c toan Lactic).
\u2022 Delta Ratio > 1.6 - 2.0: C\xF3 KI\u1EC0M CHUY\u1EC2N H\xD3A ph\u1ED1i h\u1EE3p ng\u1EA5m ng\u1EA7m (bicarbonate cao h\u01A1n d\u1EF1 ki\u1EBFn, v\xED d\u1EE5 n\xF4n \xF3i k\xE8m DKA).`, pearlsAndWarnings: "Ch\u1EC9 \u0111\u01B0\u1EE3c t\xEDnh Delta Ratio khi \u0111\xE3 x\xE1c \u0111\u1ECBnh b\u1EC7nh nh\xE2n c\xF3 TOAN CHUY\u1EC2N H\xD3A T\u0102NG ANION GAP!", tags: ["Delta Ratio", "Delta Gap", "r\u1ED1i lo\u1EA1n h\u1ED7n h\u1EE3p", "che gi\u1EA5u"] }, { id: "winters-formula", term: "Winter's Formula", fullName: "C\xF4ng th\u1EE9c Winter - D\u1EF1 \u0111o\xE1n b\xF9 tr\u1EEB PaCO\u2082 trong Toan Chuy\u1EC3n H\xF3a", category: "C\xF4ng th\u1EE9c & T\u1EF7 s\u1ED1", normalRange: "PaCO\u2082 k\u1EF3 v\u1ECDng = 1.5 \xD7 [HCO\u2083\u207B] + 8 \xB1 2 (mmHg)", definition: "C\xF4ng th\u1EE9c chu\u1EA9n x\xE1c \u0111\u1ECBnh m\u1EE9c \u0111\u1ED9 t\u0103ng th\xF4ng kh\xED h\xF4 h\u1EA5p th\xEDch h\u1EE3p c\u1EE7a c\u01A1 th\u1EC3 nh\u1EB1m \u0111\xE1p \u1EE9ng v\u1EDBi t\xECnh tr\u1EA1ng toan chuy\u1EC3n h\xF3a: PaCO\u2082 mong \u0111\u1EE3i = 1.5 \xD7 [HCO\u2083\u207B] + 8 \xB1 2.", clinicalSignificance: `\u2022 N\u1EBFu PaCO\u2082 th\u1EF1c t\u1EBF = PaCO\u2082 k\u1EF3 v\u1ECDng: B\xF9 tr\u1EEB h\xF4 h\u1EA5p ph\xF9 h\u1EE3p ho\xE0n to\xE0n.
\u2022 N\u1EBFu PaCO\u2082 th\u1EF1c t\u1EBF < PaCO\u2082 k\u1EF3 v\u1ECDng: C\xF3 KI\u1EC0M H\xD4 H\u1EA4P ph\u1ED1i h\u1EE3p (th\xF4ng kh\xED qu\xE1 m\u1EE9c).
\u2022 N\u1EBFu PaCO\u2082 th\u1EF1c t\u1EBF > PaCO\u2082 k\u1EF3 v\u1ECDng: C\xF3 TOAN H\xD4 H\u1EA4P ph\u1ED1i h\u1EE3p (suy ki\u1EC7t c\u01A1 h\xF4 h\u1EA5p nguy hi\u1EC3m).`, pearlsAndWarnings: "M\u1EE9c b\xF9 tr\u1EEB h\xF4 h\u1EA5p t\u1ED1i \u0111a c\u1EE7a c\u01A1 th\u1EC3 ng\u01B0\u1EDDi b\xECnh th\u01B0\u1EDDng ch\u1EC9 c\xF3 th\u1EC3 h\u1EA1 PaCO\u2082 xu\u1ED1ng \u0111\u1EBFn kho\u1EA3ng 10 - 12 mmHg. Kh\xF4ng th\u1EC3 h\u1EA1 th\u1EA5p h\u01A1n \u0111\u01B0\u1EE3c n\u1EEFa v\xEC c\xF4ng th\u1EDF kh\xF4ng ch\u1ECBu \u0111\u1EF1ng n\u1ED5i.", tags: ["Winter", "b\xF9 tr\u1EEB", "toan chuy\u1EC3n h\xF3a", "PaCO2 k\u1EF3 v\u1ECDng"] }, { id: "pf-ratio", term: "P/F Ratio (PaO\u2082/FiO\u2082)", fullName: "Ch\u1EC9 s\u1ED1 Horovitz / P/F Ratio - Ph\xE2n lo\u1EA1i H\u1ED9i ch\u1EE9ng Suy H\xF4 H\u1EA5p C\u1EA5p Ti\u1EBFn Tri\u1EC3n (ARDS)", category: "C\xF4ng th\u1EE9c & T\u1EF7 s\u1ED1", normalRange: "> 400 \u2013 500 mmHg \u1EDF ng\u01B0\u1EDDi b\xECnh th\u01B0\u1EDDng", definition: "T\u1EF7 s\u1ED1 gi\u1EEFa ph\xE2n \xE1p oxy \u0111\u1ED9ng m\u1EA1ch (PaO\u2082, t\xEDnh b\u1EB1ng mmHg) chia cho ph\xE2n su\u1EA5t oxy h\xEDt v\xE0o (FiO\u2082, bi\u1EC3u di\u1EC5n d\u01B0\u1EDBi d\u1EA1ng s\u1ED1 th\u1EADp ph\xE2n t\u1EEB 0.21 \u0111\u1EBFn 1.0).", clinicalSignificance: `Ti\xEAu chu\u1EA9n Berlin ch\u1EA9n \u0111o\xE1n ph\xE2n \u0111\u1ED9 ARDS (\u1EDF m\u1EE9c PEEP \u2265 5 cmH\u2082O):
\u2022 P/F 201 \u2013 300: ARDS Nh\u1EB9 (Mild ARDS)
\u2022 P/F 101 \u2013 200: ARDS Trung b\xECnh (Moderate ARDS)
\u2022 P/F \u2264 100: ARDS N\u1EB7ng (Severe ARDS - Nguy c\u01A1 t\u1EED vong r\u1EA5t cao)`, pearlsAndWarnings: "L\u01B0u \xFD m\u1EABu s\u1ED1: N\u1EBFu FiO\u2082 l\xE0 40%, ph\u1EA3i chia cho 0.40 (kh\xF4ng chia cho 40). V\xED d\u1EE5: PaO\u2082 80 mmHg khi th\u1EDF FiO\u2082 40% -> P/F = 80 / 0.40 = 200 (ARDS trung b\xECnh).", tags: ["P/F ratio", "Horovitz", "Berlin", "ARDS"] }, { id: "aa-gradient", term: "A-a Gradient (P(A-a)O\u2082)", fullName: "Alveolar-arterial Oxygen Gradient - Ch\xEAnh l\u1EC7ch \xE1p l\u1EF1c Oxy gi\u1EEFa Ph\u1EBF Nang v\xE0 \u0110\u1ED9ng M\u1EA1ch", category: "C\xF4ng th\u1EE9c & T\u1EF7 s\u1ED1", normalRange: "B\xECnh th\u01B0\u1EDDng: 5 \u2013 15 mmHg \u1EDF ng\u01B0\u1EDDi tr\u1EBB. \u01AF\u1EDBc t\xEDnh theo tu\u1ED5i: (Tu\u1ED5i / 4) + 4 mmHg", definition: "Hi\u1EC7u s\u1ED1 gi\u1EEFa ph\xE2n \xE1p oxy trong ph\u1EBF nang (P_A_O\u2082) v\xE0 ph\xE2n \xE1p oxy \u0111o \u0111\u01B0\u1EE3c trong m\xE1u \u0111\u1ED9ng m\u1EA1ch (PaO\u2082): P(A-a)O\u2082 = P_A_O\u2082 - PaO\u2082.", clinicalSignificance: `Gi\xFAp ph\xE2n bi\u1EC7t nguy\xEAn nh\xE2n g\xE2y gi\u1EA3m oxy m\xE1u:
\u2022 A-a gradient B\xCCNH TH\u01AF\u1EDCNG: Gi\u1EA3m oxy m\xE1u ho\xE0n to\xE0n do gi\u1EA3m th\xF4ng kh\xED ph\u1EBF nang (ng\u1ED9 \u0111\u1ED9c thu\u1ED1c ng\u1EE7, nh\u01B0\u1EE3c c\u01A1) ho\u1EB7c do \u0111\u1ED9 cao (\xE1p su\u1EA5t kh\xED quy\u1EC3n gi\u1EA3m). Ph\u1ED5i ho\xE0n to\xE0n l\xE0nh l\u1EB7n!
\u2022 A-a gradient T\u0102NG CAO: C\xF3 t\u1ED5n th\u01B0\u01A1ng m\xE0ng ph\u1EBF nang - mao m\u1EA1ch ho\u1EB7c b\u1EA5t t\u01B0\u01A1ng x\u1EE9ng V/Q (Vi\xEAm ph\u1ED5i, ARDS, Ph\xF9 ph\u1ED5i, Thuy\xEAn t\u1EAFc ph\u1ED5i PE).`, pearlsAndWarnings: "A-a gradient t\u0103ng v\u1ECDt khi th\u1EDF FiO\u2082 cao. Do \u0111\xF3 gi\xE1 tr\u1ECB ch\u1EA9n \u0111o\xE1n ch\xEDnh x\xE1c nh\u1EA5t l\xE0 khi b\u1EC7nh nh\xE2n th\u1EDF kh\xED ph\xF2ng (FiO\u2082 = 21%).", tags: ["A-a gradient", "ph\u1EBF nang mao m\u1EA1ch", "thuy\xEAn t\u1EAFc ph\u1ED5i", "V/Q"] }, { id: "alveolar-gas-equation", term: "Ph\u01B0\u01A1ng Tr\xECnh Kh\xED Ph\u1EBF Nang (P_A_O\u2082)", fullName: "Alveolar Gas Equation - Ph\u01B0\u01A1ng tr\xECnh t\xEDnh ph\xE2n \xE1p oxy trong ph\u1EBF nang", category: "C\xF4ng th\u1EE9c & T\u1EF7 s\u1ED1", normalRange: "~100 mmHg khi th\u1EDF kh\xED tr\u1EDDi \u1EDF m\u1EF1c n\u01B0\u1EDBc bi\u1EC3n", definition: "P_A_O\u2082 = (P_atm - P_H2O) \xD7 FiO\u2082 - (PaCO\u2082 / R). V\u1EDBi P_atm = 760 mmHg, P_H2O = 47 mmHg, R (th\u01B0\u01A1ng s\u1ED1 h\xF4 h\u1EA5p) \u2248 0.8. Khi th\u1EDF kh\xED ph\xF2ng: P_A_O\u2082 \u2248 150 - (PaCO\u2082 / 0.8).", clinicalSignificance: "Cho bi\u1EBFt l\u01B0\u1EE3ng oxy t\u1ED1i \u0111a c\xF3 th\u1EC3 s\u1EB5n s\xE0ng khu\u1EBFch t\xE1n t\u1EEB l\xF2ng ph\u1EBF nang v\xE0o mao m\u1EA1ch ph\u1ED5i. L\xE0 n\u1EC1n t\u1EA3ng b\u1EAFt bu\u1ED9c \u0111\u1EC3 t\xEDnh A-a gradient.", pearlsAndWarnings: "Khi PaCO\u2082 t\u0103ng cao (\u1EE9 tr\u1EC7 th\xF4ng kh\xED), theo ph\u01B0\u01A1ng tr\xECnh ph\u1EBF nang, l\u01B0\u1EE3ng CO\u2082 cho\xE1n ch\u1ED7 s\u1EBD \u0111\u1EA9y v\u0103ng O\u2082 ra kh\u1ECFi ph\u1EBF nang, l\xE0m P_A_O\u2082 t\u1EE5t xu\u1ED1ng v\xE0 g\xE2y thi\u1EBFu oxy m\xE1u th\u1EE9 ph\xE1t.", tags: ["P_A_O2", "ph\u1EBF nang", "kh\xED tr\u1EDDi", "th\u01B0\u01A1ng s\u1ED1 h\xF4 h\u1EA5p"] }, { id: "hypoxic-drive", term: "Hypoxic Drive (K\xEDch th\xEDch h\xF4 h\u1EA5p do thi\u1EBFu oxy)", fullName: "C\u01A1 ch\u1EBF k\xEDch th\xEDch th\u1EE5 th\u1EC3 ngo\u1EA1i vi do gi\u1EA3m PaO\u2082 \u1EDF b\u1EC7nh nh\xE2n \u1EE9 CO\u2082 m\u1EA1n t\xEDnh", category: "Sinh l\xFD h\u1ECDc", definition: "\u1EDE ng\u01B0\u1EDDi kh\u1ECFe m\u1EA1nh, \u0111\u1ED9ng l\u1EF1c ch\xEDnh k\xEDch th\xEDch h\xF4 h\u1EA5p l\xE0 PaCO\u2082 t\xE1c \u0111\u1ED9ng l\xEAn th\u1EE5 c\u1EA3m th\u1EC3 h\xF3a h\u1ECDc trung \u01B0\u01A1ng \u1EDF h\xE0nh n\xE3o. \u1EDE b\u1EC7nh nh\xE2n suy h\xF4 h\u1EA5p m\u1EA1n (nh\u01B0 COPD), PaCO\u2082 t\u0103ng cao k\xE9o d\xE0i l\xE0m th\u1EE5 c\u1EA3m th\u1EC3 trung \u01B0\u01A1ng b\u1ECB tr\u01A1 h\xF3a; trung t\xE2m h\xF4 h\u1EA5p l\xFAc n\xE0y ho\xE0n to\xE0n ph\u1EE5 thu\u1ED9c v\xE0o k\xEDch th\xEDch thi\u1EBFu oxy m\xE1u (PaO\u2082 th\u1EA5p) t\u1EEB th\u1EE5 c\u1EA3m th\u1EC3 ngo\u1EA1i vi \u1EDF xoang c\u1EA3nh v\xE0 quai \u0111\u1ED9ng m\u1EA1ch ch\u1EE7.", clinicalSignificance: 'N\u1EBFu cung c\u1EA5p oxy li\u1EC1u qu\xE1 cao kh\xF4ng ki\u1EC3m so\xE1t (FiO\u2082 100% ho\u1EB7c th\u1EDF mask t\xFAi), n\u1ED3ng \u0111\u1ED9 PaO\u2082 t\u0103ng v\u1ECDt s\u1EBD tri\u1EC7t ti\xEAu xung \u0111\u1ED9ng th\u1EA7n kinh "Hypoxic drive", khi\u1EBFn b\u1EC7nh nh\xE2n ng\u1EEBng th\u1EDF, \u1EE9 CO\u2082 c\u1EA5p t\xEDnh v\xE0 h\xF4n m\xEA do toan m\xE1u n\xE3o.', pearlsAndWarnings: "M\u1EE5c ti\xEAu SpO\u2082 \u1EDF b\u1EC7nh nh\xE2n COPD c\xF3 nguy c\u01A1 suy h\xF4 h\u1EA5p t\u0103ng CO\u2082 m\xE1u l\xE0 88 \u2013 92% (d\xF9ng oxy li\u1EC1u chu\u1EA9n qua van Venturi 24% - 28%), tuy\u1EC7t \u0111\u1ED1i kh\xF4ng cho th\u1EDF oxy d\xF2ng cao kh\xF4ng ki\u1EC3m so\xE1t!", tags: ["Hypoxic drive", "COPD", "th\u1EE5 th\u1EC3 h\xF3a h\u1ECDc", "\u1EE9c ch\u1EBF h\xF4 h\u1EA5p"] }, { id: "oxyhemoglobin-curve", term: "\u0110\u01B0\u1EDDng Cong Ph\xE2n Ly Oxyhemoglobin", fullName: "Oxyhemoglobin Dissociation Curve - M\u1ED1i li\xEAn h\u1EC7 S-d\u1EA1ng gi\u1EEFa PaO\u2082 v\xE0 SaO\u2082", category: "Sinh l\xFD h\u1ECDc", normalRange: "P50 \u2248 26.6 mmHg (\u0111i\u1EC3m SaO\u2082 = 50%)", definition: "\u0110\u1ED3 th\u1ECB h\xECnh ch\u1EEF S ph\u1EA3n \xE1nh t\xEDnh ch\u1EA5t g\u1EAFn nh\u1EA3 oxy c\xF3 t\xEDnh t\u01B0\u01A1ng h\u1ED7 (cooperative binding) c\u1EE7a 4 chu\u1ED7i heme tr\xEAn ph\xE2n t\u1EED Hemoglobin.", clinicalSignificance: `\u2022 \u0110o\u1EA1n ngang (Plateau): PaO\u2082 t\u1EEB 60 \u0111\u1EBFn 100 mmHg, SaO\u2082 duy tr\xEC cao > 90%. \u0110\xE2y l\xE0 v\xF9ng an to\xE0n d\u1EF1 tr\u1EEF oxy cho c\u01A1 th\u1EC3.
\u2022 \u0110o\u1EA1n d\u1ED1c \u0111\u1EE9ng (Steep slope): PaO\u2082 < 60 mmHg, ch\u1EC9 c\u1EA7n PaO\u2082 t\u1EE5t nh\u1EB9 m\u1ED9t ch\xFAt l\xE0 SaO\u2082 lao d\u1ED1c th\u1EA3m kh\u1ED1c, \u0111\u01B0a b\u1EC7nh nh\xE2n v\xE0o suy s\u1EE5p thi\u1EBFu oxy m\xF4 t\u1ED1i c\u1EA5p!`, pearlsAndWarnings: "\u0110i\u1EC3m m\u1ED1c sinh t\u1EED c\u1EA7n ghi nh\u1EDB: PaO\u2082 = 60 mmHg t\u01B0\u01A1ng \u1EE9ng v\u1EDBi SaO\u2082 = 90%. N\u1EBFu SpO\u2082 t\u1EE5t d\u01B0\u1EDBi 90%, b\u1EC7nh nh\xE2n \u0111ang \u1EDF m\xE9p v\u1EF1c th\u1EB3m c\u1EE7a \u0111o\u1EA1n d\u1ED1c \u0111\u1EE9ng!", tags: ["\u0110\u01B0\u1EDDng cong oxy", "P50", "SaO2", "PaO2 60"] }, { id: "bohr-effect", term: "Hi\u1EC7u \u1EE8ng Bohr (L\u1EC7ch \u0110\u01B0\u1EDDng Cong Oxy)", fullName: "Bohr Effect - S\u1EF1 d\u1ECBch chuy\u1EC3n \u0111\u01B0\u1EDDng cong ph\xE2n ly Oxyhemoglobin sang Ph\u1EA3i / Tr\xE1i", category: "Sinh l\xFD h\u1ECDc", definition: "S\u1EF1 thay \u0111\u1ED5i \xE1i l\u1EF1c c\u1EE7a Hemoglobin \u0111\u1ED1i v\u1EDBi Oxy d\u01B0\u1EDBi t\xE1c \u0111\u1ED9ng c\u1EE7a pH, PaCO\u2082, nhi\u1EC7t \u0111\u1ED9 v\xE0 n\u1ED3ng \u0111\u1ED9 2,3-DPG trong h\u1ED3ng c\u1EA7u.", clinicalSignificance: `\u2022 L\u1EC7ch PH\u1EA2I (Cadet, face right!): T\u0103ng CO\u2082, Gi\u1EA3m pH (Toan), T\u0103ng 2,3-DPG, T\u0103ng nhi\u1EC7t \u0111\u1ED9 (S\u1ED1t). \xC1i l\u1EF1c Hb v\u1EDBi O\u2082 gi\u1EA3m -> D\u1EC5 d\xE0ng nh\u1EA3 O\u2082 v\xE0o m\xF4 \u0111ang \u0111\xF3i oxy v\xE0 ho\u1EA1t \u0111\u1ED9ng m\u1EA1nh.
\u2022 L\u1EC7ch TR\xC1I: Gi\u1EA3m CO\u2082, T\u0103ng pH (Ki\u1EC1m), Gi\u1EA3m 2,3-DPG, H\u1EA1 th\xE2n nhi\u1EC7t, Ng\u1ED9 \u0111\u1ED9c CO. \xC1i l\u1EF1c Hb v\u1EDBi O\u2082 t\u0103ng -> Gi\u1EEF ch\u1EB7t O\u2082, m\xF4 b\u1ECB thi\u1EBFu oxy d\xF9 m\xE1u \u0111\u1ECF au.`, pearlsAndWarnings: "M\u1EB9o ghi nh\u1EDB: L\u1EC7ch PH\u1EA2I g\u1EB7p khi m\xF4 v\u1EADn \u0111\u1ED9ng t\u1ED1i \u0111a (n\xF3ng, toan, nhi\u1EC1u CO\u2082, s\u1ED1t). L\u1EC7ch TR\xC1I g\u1EB7p khi c\u01A1 th\u1EC3 l\u1EA1nh, ki\u1EC1m, h\u1EA1 th\xE2n nhi\u1EC7t.", tags: ["Bohr", "l\u1EC7ch ph\u1EA3i", "l\u1EC7ch tr\xE1i", "nh\u1EA3 oxy"] }, { id: "goldmark", term: "GOLDMARK", fullName: "B\u1EA3ng m\xE3 nguy\xEAn nh\xE2n g\xE2y Toan Chuy\u1EC3n H\xF3a T\u0102NG Anion Gap hi\u1EC7n \u0111\u1EA1i", category: "B\u1EA3ng m\xE3 l\xE2m s\xE0ng", definition: "B\u1EA3ng m\xE3 hi\u1EC7n \u0111\u1EA1i thay th\u1EBF cho MUDPILES truy\u1EC1n th\u1ED1ng \u0111\u1EC3 li\u1EC7t k\xEA c\xE1c nguy\xEAn nh\xE2n g\xE2y toan chuy\u1EC3n h\xF3a t\u0103ng Anion Gap (AG > 16-18):", clinicalSignificance: `\u2022 G - Glycols: Ethylene glycol (ch\u1EA5t ch\u1ED1ng \u0111\xF4ng xe h\u01A1i), Propylene glycol
\u2022 O - Oxoproline (5-oxoproline): D\xF9ng Paracetamol li\u1EC1u cao k\xE9o d\xE0i \u1EDF ph\u1EE5 n\u1EEF suy dinh d\u01B0\u1EE1ng
\u2022 L - L-Lactate: Thi\u1EBFu oxy m\xF4, s\u1ED1c nhi\u1EC5m khu\u1EA9n, co gi\u1EADt, s\u1ED1c tim
\u2022 D - D-Lactate: H\u1ED9i ch\u1EE9ng ru\u1ED9t ng\u1EAFn, vi khu\u1EA9n l\xEAn men carbohydrate
\u2022 M - Methanol: C\u1ED3n c\xF4ng nghi\u1EC7p, chuy\u1EC3n h\xF3a th\xE0nh acid formic g\xE2y m\xF9 m\u1EAFt
\u2022 A - Aspirin: Ng\u1ED9 \u0111\u1ED9c Salicylate (toan CH + ki\u1EC1m h\xF4 h\u1EA5p h\u1ED7n h\u1EE3p)
\u2022 R - Renal failure: Suy th\u1EADn c\u1EA5p/m\u1EA1n, t\xEDch t\u1EE5 acid h\u1EEFu c\u01A1, phosphate, sulfate
\u2022 K - Ketoacidosis: Toan ceton \u0111\xE1i th\xE1o \u0111\u01B0\u1EDDng (DKA), toan ceton do r\u01B0\u1EE3u, toan do nh\u1ECBn \u0111\xF3i l\xE2u ng\xE0y`, pearlsAndWarnings: "L-Lactate v\xE0 DKA l\xE0 2 nguy\xEAn nh\xE2n ph\u1ED5 bi\u1EBFn nh\u1EA5t chi\u1EBFm h\u01A1n 80% c\xE1c ca toan t\u0103ng AG trong th\u1EF1c h\xE0nh c\u1EA5p c\u1EE9u v\xE0 ICU.", tags: ["GOLDMARK", "MUDPILES", "toan chuy\u1EC3n h\xF3a", "t\u0103ng AG"] }, { id: "hardups", term: "HARDUPS", fullName: "B\u1EA3ng m\xE3 nguy\xEAn nh\xE2n g\xE2y Toan Chuy\u1EC3n H\xF3a Anion Gap B\xCCNH TH\u01AF\u1EDCNG (T\u0103ng Clo m\xE1u)", category: "B\u1EA3ng m\xE3 l\xE2m s\xE0ng", definition: "Li\u1EC7t k\xEA c\xE1c nguy\xEAn nh\xE2n g\xE2y m\u1EA5t ion Bicarbonate qua \u0111\u01B0\u1EDDng ti\xEAu h\xF3a ho\u1EB7c qua th\u1EADn, d\u1EABn \u0111\u1EBFn vi\u1EC7c th\u1EADn gi\u1EEF ion Clorid l\u1EA1i \u0111\u1EC3 trung h\xF2a \u0111i\u1EC7n t\xEDch (Hyperchloraemic Metabolic Acidosis):", clinicalSignificance: `\u2022 H - Hyperalimentation: Nu\xF4i d\u01B0\u1EE1ng t\u0129nh m\u1EA1ch ho\xE0n to\xE0n (TPN)
\u2022 A - Acetazolamide: Thu\u1ED1c \u1EE9c ch\u1EBF men carbonic anhydrase g\xE2y m\u1EA5t HCO\u2083\u207B qua n\u01B0\u1EDBc ti\u1EC3u
\u2022 R - Renal Tubular Acidosis: Toan h\xF3a \u1ED1ng th\u1EADn Type 1 (xa), Type 2 (g\u1EA7n), Type 4
\u2022 D - Diarrhoea: Ti\xEAu ch\u1EA3y c\u1EA5p m\u1EA5t d\u1ECBch ru\u1ED9t gi\xE0u bicarbonate
\u2022 U - Uretero-enterostomy: Ph\u1EABu thu\u1EADt d\u1EABn l\u01B0u ni\u1EC7u qu\u1EA3n v\xE0o \u0111\u1EA1i tr\xE0ng sigma
\u2022 P - Pancreatic / biliary fistula: R\xF2 d\u1ECBch t\u1EE5y, d\u1EABn l\u01B0u m\u1EADt k\xE9o d\xE0i
\u2022 S - Saline (0.9% NaCl): Truy\u1EC1n l\u01B0\u1EE3ng l\u1EDBn d\u1ECBch mu\u1ED1i \u0111\u1EB3ng tr\u01B0\u01A1ng ch\u1EE9a n\u1ED3ng \u0111\u1ED9 Cl\u207B cao (154 mmol/L so v\u1EDBi 100 mmol/L trong m\xE1u)`, pearlsAndWarnings: "Ph\u1ED5 bi\u1EBFn nh\u1EA5t t\u1EA1i ph\xF2ng c\u1EA5p c\u1EE9u l\xE0: Ti\xEAu ch\u1EA3y m\u1EA5t bicarb v\xE0 truy\u1EC1n qu\xE1 nhi\u1EC1u dung d\u1ECBch NaCl 0.9% trong h\u1ED3i s\u1EE9c s\u1ED1c!", tags: ["HARDUPS", "toan t\u0103ng clo", "AG b\xECnh th\u01B0\u1EDDng", "ti\xEAu ch\u1EA3y"] }, { id: "allens-test", term: "Modified Allen's Test", fullName: "Nghi\u1EC7m ph\xE1p Allen c\u1EA3i bi\xEAn ki\u1EC3m tra tu\u1EA7n ho\xE0n b\xE0ng h\u1EC7 \u0111\u1ED9ng m\u1EA1ch tr\u1EE5", category: "K\u1EF9 thu\u1EADt x\xE9t nghi\u1EC7m", normalRange: "M\xE0u h\u1ED3ng tr\u1EDF l\u1EA1i l\xF2ng b\xE0n tay trong v\xF2ng < 5 \u0111\u1EBFn 7 gi\xE2y (D\u01B0\u01A1ng t\xEDnh = An to\xE0n)", definition: "K\u1EF9 thu\u1EADt l\xE2m s\xE0ng b\u1EAFt bu\u1ED9c th\u1EF1c hi\u1EC7n tr\u01B0\u1EDBc khi ch\u1ECDc kim l\u1EA5y m\xE1u \u0111\u1ED9ng m\u1EA1ch quay: \xC9p ch\u1EB7t \u0111\u1ED3ng th\u1EDDi c\u1EA3 \u0111\u1ED9ng m\u1EA1ch quay v\xE0 \u0111\u1ED9ng m\u1EA1ch tr\u1EE5 cho \u0111\u1EBFn khi l\xF2ng b\xE0n tay tr\u1EAFng b\u1EC7ch, sau \u0111\xF3 bu\xF4ng tay \u0111\xE8 \u0111\u1ED9ng m\u1EA1ch tr\u1EE5 v\xE0 quan s\xE1t th\u1EDDi gian t\u01B0\u1EDBi m\xE1u tr\u1EDF l\u1EA1i.", clinicalSignificance: "\u0110\u1EA3m b\u1EA3o \u0111\u1ED9ng m\u1EA1ch tr\u1EE5 c\xF3 cung l\u01B0\u1EE3ng b\xE0ng h\u1EC7 t\u1ED1t qua cung gan tay n\xF4ng v\xE0 s\xE2u, ph\xF2ng ng\u1EEBa bi\u1EBFn ch\u1EE9ng ho\u1EA1i t\u1EED ng\xF3n tay n\u1EBFu ch\u1EB3ng may \u0111\u1ED9ng m\u1EA1ch quay b\u1ECB t\u1EAFc huy\u1EBFt kh\u1ED1i ho\u1EB7c co th\u1EAFt k\xE9o d\xE0i sau ch\u1ECDc.", pearlsAndWarnings: "N\u1EBFu b\xE0n tay v\u1EABn nh\u1EE3t nh\u1EA1t tr\u1EAFng b\u1EC7ch sau 10 gi\xE2y (nghi\u1EC7m ph\xE1p \xE2m t\xEDnh): TUY\u1EC6T \u0110\u1ED0I KH\xD4NG CH\u1ECCC \u0110\u1ED8NG M\u1EA0CH QUAY \u1EDE TAY \u0110\xD3! Chuy\u1EC3n sang tay \u0111\u1ED1i di\u1EC7n ho\u1EB7c ch\u1ECDc \u0111\u1ED9ng m\u1EA1ch c\xE1nh tay/\u0111\u1ED9ng m\u1EA1ch \u0111\xF9i.", tags: ["Allen", "th\u1EE7 thu\u1EADt", "\u0111\u1ED9ng m\u1EA1ch quay", "\u0111\u1ED9ng m\u1EA1ch tr\u1EE5"] }, { id: "vbg-vs-abg", term: "VBG vs ABG (Kh\xED M\xE1u T\u0129nh M\u1EA1ch vs \u0110\u1ED9ng M\u1EA1ch)", fullName: "So s\xE1nh kh\xED m\xE1u t\u0129nh m\u1EA1ch (Venous Blood Gas) v\xE0 kh\xED m\xE1u \u0111\u1ED9ng m\u1EA1ch (Arterial Blood Gas)", category: "K\u1EF9 thu\u1EADt x\xE9t nghi\u1EC7m", definition: "VBG l\xE0 x\xE9t nghi\u1EC7m l\u1EA5y m\xE1u t\u1EEB t\u0129nh m\u1EA1ch ngo\u1EA1i vi ho\u1EB7c catheter t\u0129nh m\u1EA1ch trung t\xE2m, \xEDt \u0111au v\xE0 \xEDt nguy c\u01A1 bi\u1EBFn ch\u1EE9ng h\u01A1n ch\u1ECDc \u0111\u1ED9ng m\u1EA1ch.", clinicalSignificance: `T\u01B0\u01A1ng quan gi\u1EEFa VBG v\xE0 ABG \u1EDF b\u1EC7nh nh\xE2n huy\u1EBFt \u0111\u1ED9ng \u1ED5n \u0111\u1ECBnh:
\u2022 pH t\u0129nh m\u1EA1ch th\u1EA5p h\u01A1n \u0111\u1ED9ng m\u1EA1ch kho\u1EA3ng 0.03 \u2013 0.05 \u0111\u01A1n v\u1ECB
\u2022 PvCO\u2082 cao h\u01A1n PaCO\u2082 kho\u1EA3ng 4 \u2013 6 mmHg
\u2022 HCO\u2083\u207B t\u0129nh m\u1EA1ch g\u1EA7n t\u01B0\u01A1ng \u0111\u01B0\u01A1ng \u0111\u1ED9ng m\u1EA1ch (ch\xEAnh l\u1EC7ch 1 \u2013 2 mmol/L)
\u2022 Ch\u1EC9 \u0111\u1ECBnh h\u1EE3p l\xFD c\u1EE7a VBG: \u0110\xE1nh gi\xE1 theo d\xF5i DKA (nhi\u1EC5m toan ceton), lo\u1EA1i tr\u1EEB t\u0103ng CO\u2082 m\xE1u n\u1EBFu PvCO\u2082 < 45 mmHg.`, pearlsAndWarnings: "TUY\u1EC6T \u0110\u1ED0I KH\xD4NG D\xD9NG VBG \u0110\u1EC2 \u0110\xC1NH GI\xC1 OXY H\xD3A M\xC1U! PvO\u2082 t\u0129nh m\u1EA1ch (~40 mmHg) kh\xF4ng c\xF3 m\u1ED1i t\u01B0\u01A1ng quan \u0111\xE1ng tin c\u1EADy n\xE0o v\u1EDBi PaO\u2082 \u0111\u1ED9ng m\u1EA1ch.", tags: ["VBG", "ABG", "kh\xED m\xE1u t\u0129nh m\u1EA1ch", "so s\xE1nh"] }, { id: "lactate", term: "Lactate M\xE1u (Lactic Acid)", fullName: "N\u1ED3ng \u0111\u1ED9 Acid Lactic huy\u1EBFt t\u01B0\u01A1ng - Ch\u1EC9 \u0111i\u1EC3m chuy\u1EC3n h\xF3a k\u1EF5 kh\xED v\xE0 t\u01B0\u1EDBi m\xE1u m\xF4", category: "Ch\u1EC9 s\u1ED1 c\u01A1 b\u1EA3n", normalRange: "0.5 \u2013 2.0 mmol/L (Ng\u01B0\u1EE1ng nguy c\u01A1 nhi\u1EC5m toan: > 2.0 mmol/L; Toan Lactic n\u1EB7ng: > 4.0 mmol/L)", definition: "S\u1EA3n ph\u1EA9m ph\u1EE5 c\u1EE7a qu\xE1 tr\xECnh \u0111\u01B0\u1EDDng ph\xE2n k\u1EF5 kh\xED khi m\xF4 t\u1EBF b\xE0o b\u1ECB thi\u1EBFu oxy, pyruvate chuy\u1EC3n th\xE0nh lactate d\u01B0\u1EDBi t\xE1c d\u1EE5ng c\u1EE7a men LDH.", clinicalSignificance: "L\xE0 tr\u1EE5 c\u1ED9t ch\xEDnh trong ph\xE1c \u0111\u1ED3 C\u1EA5p c\u1EE9u S\u1ED1c nhi\u1EC5m khu\u1EA9n (Surviving Sepsis Campaign 1-hour bundle). Lactate > 2.0 mmol/L l\xE0 d\u1EA5u hi\u1EC7u suy gi\u1EA3m t\u01B0\u1EDBi m\xE1u vi tu\u1EA7n ho\xE0n; Lactate > 4.0 mmol/L bi\u1EC3u th\u1ECB nguy c\u01A1 t\u1EED vong r\u1EA5t cao.", pearlsAndWarnings: "Lactate t\u0103ng kh\xF4ng ch\u1EC9 do thi\u1EBFu oxy m\xF4 (Type A: s\u1ED1c, thi\u1EBFu m\xE1u, co gi\u1EADt) m\xE0 c\xF2n do suy gi\u1EA3m \u0111\xE0o th\u1EA3i \u1EDF gan ho\u1EB7c thu\u1ED1c (Type B: Metformin, suy gan, ng\u1ED9 \u0111\u1ED9c c\u1ED3n, ung th\u01B0 h\u1EA1ch).", tags: ["Lactate", "s\u1ED1c nhi\u1EC5m khu\u1EA9n", "toan lactic", "thi\u1EBFu oxy m\xF4"] }, { id: "osmolar-gap", term: "Osmolar Gap (Kho\u1EA3ng Tr\u1ED1ng Th\u1EA9m Th\u1EA5u)", fullName: "Serum Osmolar Gap - Ch\xEAnh l\u1EC7ch \xE1p su\u1EA5t th\u1EA9m th\u1EA5u \u0111o \u0111\u01B0\u1EE3c v\xE0 t\xEDnh to\xE1n", category: "C\xF4ng th\u1EE9c & T\u1EF7 s\u1ED1", normalRange: "< 10 mOsm/kg H\u2082O", definition: "Hi\u1EC7u s\u1ED1 gi\u1EEFa \xC1p su\u1EA5t th\u1EA9m th\u1EA5u \u0111o b\u1EB1ng m\xE1y \u0111o \u0111i\u1EC3m \u0111\xF4ng v\xE0 \xC1p su\u1EA5t th\u1EA9m th\u1EA5u t\xEDnh to\xE1n: Osmolar Gap = Osm \u0111o \u0111\u01B0\u1EE3c - [2 \xD7 Na\u207A + Glucose (mmol/L) + Ure (mmol/L)].", clinicalSignificance: "Osmolar Gap > 10 mOsm/kg \u1EDF b\u1EC7nh nh\xE2n toan chuy\u1EC3n h\xF3a t\u0103ng Anion Gap g\u1EE3i \xFD ng\u1ED9 \u0111\u1ED9c c\xE1c lo\u1EA1i c\u1ED3n \u0111\u1ED9c ngo\u1EA1i sinh: Methanol, Ethylene glycol, Isopropanol.", pearlsAndWarnings: "Trong giai \u0111o\u1EA1n mu\u1ED9n c\u1EE7a ng\u1ED9 \u0111\u1ED9c methanol hay ethylene glycol, khi to\xE0n b\u1ED9 c\u1ED3n \u0111\xE3 b\u1ECB oxy h\xF3a th\xE0nh acid (formic acid ho\u1EB7c oxalic acid), Osmolar gap c\xF3 th\u1EC3 tr\u1EDF v\u1EC1 b\xECnh th\u01B0\u1EDDng trong khi Anion Gap t\u0103ng r\u1EA5t cao!", tags: ["Osmolar Gap", "\xE1p su\u1EA5t th\u1EA9m th\u1EA5u", "Methanol", "Ethylene glycol"] }, { id: "chloride-responsive", term: "Ki\u1EC1m Chuy\u1EC3n H\xF3a Nh\u1EA1y Clorid vs Kh\xE1ng Clorid", fullName: "Chloride-Responsive vs Chloride-Resistant Metabolic Alkalosis", category: "B\u1EA3ng m\xE3 l\xE2m s\xE0ng", definition: "Ph\xE2n lo\u1EA1i nguy\xEAn nh\xE2n ki\u1EC1m chuy\u1EC3n h\xF3a d\u1EF1a v\xE0o n\u1ED3ng \u0111\u1ED9 Clorid trong n\u01B0\u1EDBc ti\u1EC3u (Spot Urine Chloride):", clinicalSignificance: `\u2022 Nh\u1EA1y c\u1EA3m v\u1EDBi Clorid (U_Cl < 15 \u2013 20 mEq/L): M\u1EA5t d\u1ECBch d\u1EA1 d\xE0y do n\xF4n \xF3i nhi\u1EC1u, h\xFAt sonde d\u1EA1 d\xE0y, s\u1EED d\u1EE5ng thu\u1ED1c l\u1EE3i ti\u1EC3u quai. \u0110i\u1EC1u tr\u1ECB kh\u1ECFi b\u1EB1ng b\xF9 d\u1ECBch NaCl 0.9% v\xE0 KCl.
\u2022 Kh\xE1ng Clorid (U_Cl > 25 mEq/L): Th\u1EC3 t\xEDch tu\u1EA7n ho\xE0n th\u01B0\u1EDDng t\u0103ng, t\u0103ng huy\u1EBFt \xE1p do th\u1EEBa mineralocorticoid (H\u1ED9i ch\u1EE9ng Conn, Cushing, h\u1EB9p \u0111\u1ED9ng m\u1EA1ch th\u1EADn, d\xF9ng cam th\u1EA3o licorice). Kh\xF4ng \u0111\xE1p \u1EE9ng v\u1EDBi truy\u1EC1n mu\u1ED1i NaCl 0.9%.`, pearlsAndWarnings: "Trong ki\u1EC1m chuy\u1EC3n h\xF3a do n\xF4n \xF3i, th\u1EADn b\u1ECB m\u1EA5t Kali nghi\xEAm tr\u1ECDng v\xEC c\u01A1 th\u1EC3 c\u1ED1 gi\u1EEF Na\u207A b\u1EB1ng c\xE1ch \u0111\xE0o th\u1EA3i K\u207A v\xE0 H\u207A \u1EDF \u1ED1ng l\u01B0\u1EE3n xa. C\u1EA7n b\xF9 \u0111\u1ED3ng th\u1EDDi c\u1EA3 Kali \u0111\u1EC3 \u0111\u1EA3o ng\u01B0\u1EE3c t\xECnh tr\u1EA1ng ki\u1EC1m m\xE1u.", tags: ["ki\u1EC1m chuy\u1EC3n h\xF3a", "nh\u1EA1y clo", "kh\xE1ng clo", "n\xF4n \xF3i"] }];
  var ap = ({ initialSearchQuery: u = "" }) => {
    const [O, g] = Q.useState(u), [o, G] = Q.useState("T\u1EA5t c\u1EA3"), [E, R] = Q.useState(null), [Z, D] = Q.useState(null), H = ["T\u1EA5t c\u1EA3", "Ch\u1EC9 s\u1ED1 c\u01A1 b\u1EA3n", "C\xF4ng th\u1EE9c & T\u1EF7 s\u1ED1", "Sinh l\xFD h\u1ECDc", "B\u1EA3ng m\xE3 l\xE2m s\xE0ng", "K\u1EF9 thu\u1EADt x\xE9t nghi\u1EC7m"], p = Q.useMemo(() => Za.filter((y) => {
      const j = o === "T\u1EA5t c\u1EA3" || y.category === o, T = O.toLowerCase().trim(), U = T === "" || y.term.toLowerCase().includes(T) || y.fullName.toLowerCase().includes(T) || y.definition.toLowerCase().includes(T) || y.clinicalSignificance.toLowerCase().includes(T) || y.pearlsAndWarnings && y.pearlsAndWarnings.toLowerCase().includes(T) || y.tags.some((nt) => nt.toLowerCase().includes(T));
      return j && U;
    }), [O, o]), _ = (y) => {
      const j = `${y.term}: ${y.fullName}
${y.normalRange ? `Kho\u1EA3ng tham chi\u1EBFu: ${y.normalRange}
` : ""}\u0110\u1ECBnh ngh\u0129a: ${y.definition}
\xDD ngh\u0129a l\xE2m s\xE0ng: ${y.clinicalSignificance}${y.pearlsAndWarnings ? `
L\u01B0u \xFD l\xE2m s\xE0ng: ${y.pearlsAndWarnings}` : ""}`;
      navigator.clipboard.writeText(j), R(y.id), setTimeout(() => R(null), 2e3);
    }, P = (y) => {
      switch (y) {
        case "Ch\u1EC9 s\u1ED1 c\u01A1 b\u1EA3n":
          return "bg-blue-50 text-blue-700 border-blue-200";
        case "C\xF4ng th\u1EE9c & T\u1EF7 s\u1ED1":
          return "bg-indigo-50 text-indigo-700 border-indigo-200";
        case "Sinh l\xFD h\u1ECDc":
          return "bg-emerald-50 text-emerald-700 border-emerald-200";
        case "B\u1EA3ng m\xE3 l\xE2m s\xE0ng":
          return "bg-amber-50 text-amber-800 border-amber-200";
        case "K\u1EF9 thu\u1EADt x\xE9t nghi\u1EC7m":
          return "bg-purple-50 text-purple-700 border-purple-200";
        default:
          return "bg-slate-100 text-slate-700 border-slate-200";
      }
    };
    return a.jsxs("section", { id: "glossary-knowledge-section", className: "space-y-6", children: [a.jsxs("div", { className: "bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4", children: [a.jsxs("div", { className: "flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3", children: [a.jsxs("div", { className: "relative flex-1", children: [a.jsx(ys, { className: "w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" }), a.jsx("input", { id: "glossary-section-search", type: "text", value: O, onChange: (y) => g(y.target.value), placeholder: "T\xECm ki\u1EBFm thu\u1EADt ng\u1EEF, vi\u1EBFt t\u1EAFt (pH, PaCO2, AG, BE, P/F, Winter, Henderson, Lactate...)", className: "w-full pl-10 pr-9 py-2.5 text-sm rounded-xl border border-slate-300 bg-slate-50/60 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-slate-400 text-slate-900" }), O && a.jsx("button", { onClick: () => g(""), className: "absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600", title: "X\xF3a t\xECm ki\u1EBFm", children: a.jsx(Qh, { className: "w-4 h-4" }) })] }), a.jsx("div", { className: "flex items-center space-x-2 text-xs text-slate-500 font-semibold shrink-0", children: a.jsxs("span", { className: "px-2.5 py-1.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-100", children: ["Hi\u1EC3n th\u1ECB ", a.jsx("strong", { className: "text-blue-900", children: p.length }), " / ", Za.length, " m\u1EE5c"] }) })] }), a.jsx("div", { className: "flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin", children: H.map((y) => {
      const j = y === "T\u1EA5t c\u1EA3" ? Za.length : Za.filter((U) => U.category === y).length, T = o === y;
      return a.jsxs("button", { id: `btn-cat-${y}`, onClick: () => G(y), className: `flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${T ? "bg-blue-600 text-white shadow-xs" : "bg-slate-100 hover:bg-slate-200 text-slate-700"}`, children: [a.jsx("span", { children: y }), a.jsx("span", { className: `text-[10px] px-1.5 py-0.2 rounded-full font-medium ${T ? "bg-blue-800 text-blue-100" : "bg-slate-200 text-slate-600"}`, children: j })] }, y);
    }) })] }), a.jsx("div", { className: "space-y-4", children: p.length === 0 ? a.jsxs("div", { className: "bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-xs space-y-3", children: [a.jsx("div", { className: "w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto", children: a.jsx(Je, { className: "w-6 h-6" }) }), a.jsxs("h3", { className: "text-base font-bold text-slate-800", children: ["Kh\xF4ng t\xECm th\u1EA5y thu\u1EADt ng\u1EEF ph\xF9 h\u1EE3p v\u1EDBi \u201C", O, "\u201D"] }), a.jsx("p", { className: "text-xs text-slate-500 max-w-md mx-auto", children: "H\xE3y th\u1EED t\xECm ki\u1EBFm b\u1EB1ng c\xE1c k\xFD hi\u1EC7u vi\u1EBFt t\u1EAFt ti\u1EBFng Anh (v\xED d\u1EE5: pH, PaCO2, PaO2, AG, BE, Lactate, Delta) ho\u1EB7c chuy\u1EC3n v\u1EC1 danh m\u1EE5c \u201CT\u1EA5t c\u1EA3\u201D." }), a.jsx("button", { onClick: () => {
      g(""), G("T\u1EA5t c\u1EA3");
    }, className: "px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-colors", children: "\u0110\u1EB7t l\u1EA1i b\u1ED9 l\u1ECDc" })] }) : p.map((y) => {
      const j = E === y.id;
      return y.id, a.jsxs("div", { id: `glossary-card-${y.id}`, className: "bg-white rounded-2xl border border-slate-200 shadow-xs p-5 hover:border-blue-200 transition-all space-y-3.5", children: [a.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-start justify-between gap-2.5", children: [a.jsxs("div", { className: "space-y-1", children: [a.jsxs("div", { className: "flex items-center space-x-2.5 flex-wrap gap-y-1", children: [a.jsx("span", { className: "text-lg font-black tracking-tight text-slate-900", children: y.term }), a.jsx("span", { className: `text-[11px] font-bold px-2 py-0.5 rounded-md border ${P(y.category)}`, children: y.category }), y.normalRange && a.jsxs("span", { className: "text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200", children: ["Kho\u1EA3ng tham chi\u1EBFu: ", y.normalRange] })] }), a.jsx("p", { className: "text-xs sm:text-sm font-semibold text-slate-600", children: y.fullName })] }), a.jsx("div", { className: "flex items-center space-x-2 self-start sm:self-auto shrink-0", children: a.jsx("button", { onClick: () => _(y), className: "px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-600 hover:text-blue-700 bg-slate-100 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 transition-all flex items-center space-x-1 cursor-pointer active:scale-95", title: "Sao ch\xE9p n\u1ED9i dung thu\u1EADt ng\u1EEF", children: j ? a.jsxs(a.Fragment, { children: [a.jsx(Zl, { className: "w-3.5 h-3.5 text-emerald-600" }), a.jsx("span", { className: "text-emerald-700", children: "\u0110\xE3 ch\xE9p" })] }) : a.jsxs(a.Fragment, { children: [a.jsx(Ns, { className: "w-3.5 h-3.5 text-slate-500" }), a.jsx("span", { children: "Sao ch\xE9p" })] }) }) })] }), a.jsxs("div", { className: "p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed", children: [a.jsx("strong", { className: "text-slate-900 font-bold block mb-1", children: "\u0110\u1ECBnh ngh\u0129a & C\xF4ng th\u1EE9c t\xEDnh:" }), y.definition] }), a.jsxs("div", { className: "p-3.5 rounded-xl bg-blue-50/60 border border-blue-100 text-xs sm:text-sm text-blue-950 leading-relaxed", children: [a.jsxs("strong", { className: "text-blue-900 font-bold block mb-1 flex items-center space-x-1.5", children: [a.jsx(Pe, { className: "w-3.5 h-3.5 text-blue-600" }), a.jsx("span", { children: "\xDD ngh\u0129a bi\u1EC7n lu\u1EADn l\xE2m s\xE0ng:" })] }), y.clinicalSignificance] }), y.pearlsAndWarnings && a.jsxs("div", { className: "p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs sm:text-sm text-amber-950 leading-relaxed", children: [a.jsxs("strong", { className: "text-amber-900 font-bold block mb-1 flex items-center space-x-1.5", children: [a.jsx(Cx, { className: "w-3.5 h-3.5 text-amber-600" }), a.jsx("span", { children: "Kinh nghi\u1EC7m & C\u1EA3nh b\xE1o c\u1EA1m b\u1EABy th\u1EF1c h\xE0nh:" })] }), y.pearlsAndWarnings] }), y.tags && y.tags.length > 0 && a.jsxs("div", { className: "flex items-center space-x-1.5 flex-wrap gap-y-1 pt-1 text-xs", children: [a.jsx(ym, { className: "w-3 h-3 text-slate-400" }), a.jsx("span", { className: "text-[11px] font-semibold text-slate-400", children: "T\u1EEB kh\xF3a:" }), y.tags.map((T) => a.jsxs("button", { onClick: () => g(T), className: "px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-600 text-[11px] font-medium transition-colors cursor-pointer", children: ["#", T] }, T))] })] }, y.id);
    }) })] });
  };
  var lp = ({ onLoadPresetToAnalyzer: u, onOpenGlossary: O, initialTab: g = "interactive-flowchart" }) => {
    const [o, G] = Q.useState(g), [E, R] = Q.useState("gas-exchange"), [Z, D] = Q.useState("scale"), [H, p] = Q.useState("sampling"), _ = [{ id: "interactive-flowchart", label: "L\u01B0u \u0110\u1ED3 T\u01B0\u01A1ng T\xE1c T\u1EEBng B\u01B0\u1EDBc", shortLabel: "L\u01B0u \u0110\u1ED3 T\u01B0\u01A1ng T\xE1c", icon: a.jsx(Pe, { className: "w-4 h-4 text-amber-500" }), badge: "Th\u1EF1c chi\u1EBFn", description: "Ch\u1EA9n \u0111o\xE1n t\u01B0\u01A1ng t\xE1c t\u1EEB pH, PaCO2 \u0111\u1EBFn b\xF9 tr\u1EEB & ph\xE1c \u0111\u1ED3" }, { id: "six-step-guide", label: "Quy Tr\xECnh 6 B\u01B0\u1EDBc \u0110\u1ECDc ABG", shortLabel: "Quy Tr\xECnh 6 B\u01B0\u1EDBc", icon: a.jsx(Jh, { className: "w-4 h-4 text-blue-500" }), badge: "Chu\u1EA9n ho\xE1", description: "Ph\u01B0\u01A1ng ph\xE1p ti\u1EBFp c\u1EADn c\xF3 h\u1EC7 th\u1ED1ng Donna Pierre & Ranson" }, { id: "decision-trees", label: "C\xE2y Quy\u1EBFt \u0110\u1ECBnh (H\xECnh 22, 23 & AG)", shortLabel: "C\xE2y Quy\u1EBFt \u0110\u1ECBnh", icon: a.jsx($h, { className: "w-4 h-4 text-indigo-500" }), badge: "3 S\u01A1 \u0111\u1ED3", description: "C\xE2y trao \u0111\u1ED5i kh\xED, c\xE2y toan ki\u1EC1m & s\u01A1 \u0111\u1ED3 Anion Gap" }, { id: "nomogram", label: "Nomogram Toan Ki\u1EC1m T\u01B0\u01A1ng T\xE1c (H\xECnh 16)", shortLabel: "Nomogram", icon: a.jsx(xn, { className: "w-4 h-4 text-rose-500" }), badge: "2D Visual", description: "T\u1ECDa \u0111\u1ED9 kh\xF4ng gian 2 chi\u1EC1u x\xE1c \u0111\u1ECBnh d\u1EA3i b\xF9 tr\u1EEB 95%" }, { id: "physiology", label: "Sinh L\xFD & Chi\u1EBFc C\xE2n Th\u0103ng B\u1EB1ng", shortLabel: "Sinh L\xFD & C\xE2n B\u1EB1ng", icon: a.jsx(Vh, { className: "w-4 h-4 text-emerald-500" }), description: "M\xF4 h\xECnh th\u0103ng b\u1EB1ng (H\xECnh 11-15), \u0111\u01B0\u1EDDng cong Oxy-Hb & Bohr" }, { id: "procedures-vbg", label: "K\u1EF9 Thu\u1EADt L\u1EA5y M\xE1u & \u0110\u1ED1i Chi\u1EBFu VBG", shortLabel: "K\u1EF9 Thu\u1EADt & VBG", icon: a.jsx(Xh, { className: "w-4 h-4 text-cyan-500" }), description: "Test Allen 5 b\u01B0\u1EDBc, k\u1EF9 thu\u1EADt ch\u1ECDc \u0110M & so s\xE1nh ABG vs VBG" }, { id: "glossary", label: "T\u1EEB \u0110i\u1EC3n Thu\u1EADt Ng\u1EEF & Vi\u1EBFt T\u1EAFt ABG", shortLabel: "T\u1EEB \u0110i\u1EC3n ABG", icon: a.jsx(Je, { className: "w-4 h-4 text-purple-600" }), badge: "Tra c\u1EE9u", description: "Tra c\u1EE9u nhanh \u0111\u1ECBnh ngh\u0129a, c\xF4ng th\u1EE9c, kho\u1EA3ng tham chi\u1EBFu v\xE0 \xFD ngh\u0129a l\xE2m s\xE0ng" }], P = (y, j, T, U) => {
      G(y), j && R(j), T && D(T), U && p(U), window.scrollTo({ top: 120, behavior: "smooth" });
    };
    return a.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6", children: [a.jsxs("div", { className: "bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4", children: [a.jsxs("div", { className: "flex items-start sm:items-center space-x-3.5", children: [a.jsx("div", { className: "p-3 bg-indigo-500/20 rounded-xl border border-indigo-400/30 shrink-0", children: a.jsx(vs, { className: "w-7 h-7 text-indigo-300" }) }), a.jsxs("div", { children: [a.jsxs("div", { className: "flex items-center space-x-2 flex-wrap gap-y-1", children: [a.jsx("h1", { className: "text-xl font-bold tracking-tight", children: "C\u1EA9m Nang & L\u01B0u \u0110\u1ED3 Ch\u1EA9n \u0110o\xE1n Kh\xED M\xE1u (Clinical Guide & Algorithms)" }), a.jsx("span", { className: "text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-500/30 text-blue-200 border border-blue-400/40", children: "To\xE0n Di\u1EC7n & T\xEDch H\u1EE3p" })] }), a.jsx("p", { className: "text-xs text-indigo-200 mt-1", children: "H\u1EE3p nh\u1EA5t tr\u1ECDn v\u1EB9n ph\u01B0\u01A1ng ph\xE1p ti\u1EBFp c\u1EADn 6 b\u01B0\u1EDBc, l\u01B0u \u0111\u1ED3 t\u01B0\u01A1ng t\xE1c, c\xE2y quy\u1EBFt \u0111\u1ECBnh Hennessey (H\xECnh 16, 22, 23), t\u1EEB \u0111i\u1EC3n thu\u1EADt ng\u1EEF vi\u1EBFt t\u1EAFt v\xE0 c\u1EA9m nang k\u1EF9 thu\u1EADt l\u1EA5y m\xE1u." })] })] }), a.jsx("div", { className: "flex items-center space-x-2 shrink-0 self-start md:self-auto", children: a.jsxs("button", { id: "btn-guide-glossary", onClick: () => P("glossary"), className: `flex items-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all hover:scale-102 cursor-pointer shadow-xs border ${o === "glossary" ? "bg-purple-600 text-white border-purple-400 shadow-md" : "bg-white/10 hover:bg-white/20 text-indigo-100 border-white/20"}`, title: "Tra c\u1EE9u nhanh \u0111\u1ECBnh ngh\u0129a, c\xF4ng th\u1EE9c & vi\u1EBFt t\u1EAFt ABG", children: [a.jsx(Je, { className: "w-4 h-4 text-cyan-300" }), a.jsx("span", { children: "Tra C\u1EE9u T\u1EEB \u0110i\u1EC3n ABG" })] }) })] }), a.jsxs("div", { className: "flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-thin text-xs", children: [a.jsxs("span", { className: "text-[11px] font-bold text-slate-500 flex items-center gap-1 whitespace-nowrap pl-1", children: [a.jsx(ym, { className: "w-3.5 h-3.5 text-slate-400" }), "Truy c\u1EADp nhanh:"] }), a.jsx("button", { onClick: () => P("glossary"), className: `px-2.5 py-1 rounded-full border text-[11px] font-bold whitespace-nowrap transition-colors cursor-pointer ${o === "glossary" ? "bg-purple-600 text-white border-purple-600 shadow-2xs" : "bg-purple-50 hover:bg-purple-100 border-purple-200 text-purple-700"}`, children: "\u{1F4D6} T\u1EEB \u0110i\u1EC3n Thu\u1EADt Ng\u1EEF ABG" }), a.jsx("button", { onClick: () => P("interactive-flowchart"), className: "px-2.5 py-1 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium whitespace-nowrap transition-colors cursor-pointer text-[11px]", children: "\u26A1 L\u01B0u \u0110\u1ED3 T\u01B0\u01A1ng T\xE1c" }), a.jsx("button", { onClick: () => P("six-step-guide"), className: "px-2.5 py-1 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium whitespace-nowrap transition-colors cursor-pointer text-[11px]", children: "\u{1F4CB} Quy Tr\xECnh 6 B\u01B0\u1EDBc" }), a.jsx("button", { onClick: () => P("decision-trees", "gas-exchange"), className: "px-2.5 py-1 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium whitespace-nowrap transition-colors cursor-pointer text-[11px]", children: "\u{1FAC1} S\u01A1 \u0110\u1ED3 Trao \u0110\u1ED5i Kh\xED (H\xECnh 22)" }), a.jsx("button", { onClick: () => P("decision-trees", "acid-base"), className: "px-2.5 py-1 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium whitespace-nowrap transition-colors cursor-pointer text-[11px]", children: "\u2696\uFE0F S\u01A1 \u0110\u1ED3 Toan Ki\u1EC1m (H\xECnh 23)" }), a.jsx("button", { onClick: () => P("decision-trees", "anion-gap"), className: "px-2.5 py-1 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium whitespace-nowrap transition-colors cursor-pointer text-[11px]", children: "\u{1F9EA} GOLDMARK (Anion Gap)" }), a.jsx("button", { onClick: () => P("nomogram"), className: "px-2.5 py-1 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium whitespace-nowrap transition-colors cursor-pointer text-[11px]", children: "\u{1F4C8} Nomogram 2D (H\xECnh 16)" }), a.jsx("button", { onClick: () => P("physiology", void 0, "scale"), className: "px-2.5 py-1 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium whitespace-nowrap transition-colors cursor-pointer text-[11px]", children: "\u2696\uFE0F C\xE2n Th\u0103ng B\u1EB1ng & B\xF9 Tr\u1EEB" }), a.jsx("button", { onClick: () => P("physiology", void 0, "oxygen"), className: "px-2.5 py-1 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium whitespace-nowrap transition-colors cursor-pointer text-[11px]", children: "\u{1F4A8} Hi\u1EC7u \u1EE8ng Bohr & Oxy-Hb" }), a.jsx("button", { onClick: () => P("procedures-vbg", void 0, void 0, "sampling"), className: "px-2.5 py-1 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium whitespace-nowrap transition-colors cursor-pointer text-[11px]", children: "\u{1FA7A} Test Allen C\u1EA3i Bi\xEAn 5 B\u01B0\u1EDBc" }), a.jsx("button", { onClick: () => P("procedures-vbg", void 0, void 0, "vbg"), className: "px-2.5 py-1 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium whitespace-nowrap transition-colors cursor-pointer text-[11px]", children: "\u{1FA78} \u0110\u1ED1i Chi\u1EBFu ABG vs VBG" })] }), a.jsx("div", { className: "bg-white p-2 rounded-2xl border border-slate-200 shadow-xs", children: a.jsx("div", { className: "flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-thin", children: _.map((y) => {
      const j = o === y.id;
      return a.jsxs("button", { id: `tab-knowledge-${y.id}`, onClick: () => G(y.id), className: `flex items-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${j ? "bg-blue-600 text-white shadow-sm scale-100" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"}`, title: y.description, children: [y.icon, a.jsx("span", { className: "hidden sm:inline", children: y.label }), a.jsx("span", { className: "sm:hidden", children: y.shortLabel }), y.badge && a.jsx("span", { className: `px-1.5 py-0.5 text-[9px] rounded-full font-bold ml-1 ${j ? "bg-blue-800 text-blue-100" : "bg-slate-200 text-slate-700"}`, children: y.badge })] }, y.id);
    }) }) }), a.jsxs("div", { className: "transition-all duration-200", children: [o === "interactive-flowchart" && a.jsx(Fx, { onLoadPresetToAnalyzer: u, onOpenGlossary: O }), o === "six-step-guide" && a.jsx(Wx, {}), o === "decision-trees" && a.jsx(Ix, { initialTree: E, onOpenGlossary: O }, E), o === "nomogram" && a.jsx(tp, { onLoadPresetToAnalyzer: u }), o === "physiology" && a.jsx(ep, { initialSubView: Z }, Z), o === "procedures-vbg" && a.jsx(np, { initialSubView: H }, H), o === "glossary" && a.jsx(ap, {})] })] });
  };
  var gs = [{ id: 1, source: "Hennessey & Japp (Made Easy)", caseNumberDisplay: "Ca 01 (Hennessey)", title: "Vi\xEAm ph\u1ED5i th\xF9y c\u1ED9ng \u0111\u1ED3ng \u1EDF ng\u01B0\u1EDDi tr\u1EBB", patientProfile: "Nam 25 tu\u1ED5i, kh\xF4ng ti\u1EC1n s\u1EED b\u1EC7nh l\xFD, s\u1ED1t 2 ng\xE0y, ho \u0111\u1EDDm v\xE0 kh\xF3 th\u1EDF t\u0103ng d\u1EA7n", categoryTag: "Suy h\xF4 h\u1EA5p Type 1", difficulty: "C\u01A1 b\u1EA3n", history: "Nam thanh ni\xEAn 25 tu\u1ED5i, kh\u1ECFe m\u1EA1nh, v\xE0o vi\u1EC7n v\xEC s\u1ED1t 39.3\xB0C, ho kh\u1EA1c \u0111\u1EDDm m\u1EE7 v\xE0 kh\xF3 th\u1EDF ti\u1EBFn tri\u1EC3n 2 ng\xE0y. Kh\xF4ng c\xF3 b\u1EC7nh l\xFD h\xF4 h\u1EA5p tr\u01B0\u1EDBc \u0111\xE2y.", examination: { vitals: { pulse: "104 l\u1EA7n/ph\xFAt", rr: "28 l\u1EA7n/ph\xFAt", bp: "118/70 mmHg", temp: "39.3\xB0C", spo2: "89% (kh\xED tr\u1EDDi)", fio2: "21%" }, findings: "T\u1EC9nh, th\u1EDF nhanh co k\xE9o c\u01A1 li\xEAn s\u01B0\u1EDDn. Rung thanh t\u0103ng, g\xF5 \u0111\u1EE5c, ti\u1EBFng th\u1EDF ph\u1EBF qu\u1EA3n v\xE0 ran n\u1ED5 th\xF4 \u1EDF \u0111\xE1y ph\u1ED5i tr\xE1i ph\xEDa sau." }, abg: { unit: "kPa", pH: 7.5, pCO2: 3.74, pO2: 7.68, hco3: 23.9, be: -0.5, sao2: 88.7, fio2: 21, na: 138, k: 3.7, cl: 99, lactate: 1.2, glucose: 5.4, patientAge: 25 }, questions: ["1. \u0110\xE1nh gi\xE1 trao \u0111\u1ED5i kh\xED t\u1EA1i ph\u1ED5i c\u1EE7a b\u1EC7nh nh\xE2n?", "2. \u0110\xE1nh gi\xE1 th\u0103ng b\u1EB1ng ki\u1EC1m toan?", "3. B\u1EC7nh nh\xE2n c\xF3 c\u1EA7n th\u1EDF oxy b\u1ED5 sung kh\xF4ng?", "4. M\xE1y \u0111o SpO2 k\u1EB9p ng\xF3n tay c\xF3 ph\u1EA3i l\xE0 c\xF4ng c\u1EE5 theo d\xF5i ph\xF9 h\u1EE3p thay cho ch\u1ECDc kh\xED m\xE1u l\u1EB7p l\u1EA1i kh\xF4ng?"], answers: { gasExchange: "Suy h\xF4 h\u1EA5p Type 1 m\u1EE9c \u0111\u1ED9 trung b\xECnh (PaO2 57.8 mmHg / 7.68 kPa < 60 mmHg). C\xF3 t\xECnh tr\u1EA1ng t\u0103ng th\xF4ng kh\xED ph\u1EBF nang (PaCO2 gi\u1EA3m xu\u1ED1ng 28.1 mmHg / 3.74 kPa) do ph\u1EA3n x\u1EA1 th\u1EDF nhanh b\xF9 tr\u1EEB thi\u1EBFu oxy.", acidBase: "Ki\u1EC1m h\xF4 h\u1EA5p c\u1EA5p ch\u01B0a b\xF9 tr\u1EEB (pH 7.50 t\u0103ng, PaCO2 gi\u1EA3m, HCO3- b\xECnh th\u01B0\u1EDDng 23.9 mmol/L). L\u01B0u \xFD: th\u1EADn c\u1EA7n nhi\u1EC1u ng\xE0y \u0111\u1EC3 b\xF9 tr\u1EEB chuy\u1EC3n h\xF3a n\xEAn trong r\u1ED1i lo\u1EA1n h\xF4 h\u1EA5p c\u1EA5p t\xEDnh, HCO3- v\u1EABn b\xECnh th\u01B0\u1EDDng.", differentialDiagnosis: "Vi\xEAm ph\u1ED5i th\xF9y tr\xE1i (Community-acquired pneumonia - CAP). \u0110\xF4ng \u0111\u1EB7c nhu m\xF4 ph\u1ED5i g\xE2y b\u1EA5t t\u01B0\u01A1ng x\u1EE9ng th\xF4ng kh\xED/t\u01B0\u1EDBi m\xE1u (V/Q mismatch) v\xE0 shunt sinh l\xFD.", clinicalAction: "Cho th\u1EDF oxy b\u1ED5 sung ngay (g\u1ECDng k\xEDnh m\u0169i 2-4 L/ph\xFAt) \u0111\u1EC3 \u0111\u01B0a PaO2 l\xEAn > 60 mmHg (SpO2 94-98%). Kh\u1EDFi \u0111\u1ED9ng kh\xE1ng sinh \u0111i\u1EC1u tr\u1ECB vi\xEAm ph\u1ED5i theo ph\xE1c \u0111\u1ED3 kinh nghi\u1EC7m. B\xF9 \u0111\u1EE7 n\u01B0\u1EDBc v\xE0 h\u1EA1 s\u1ED1t.", physiologicalInsight: "V\xEC PaCO2 kh\xF4ng t\u0103ng m\xE0 gi\u1EA3m (th\xF4ng kh\xED c\xF2n t\u1ED1t), b\u1EC7nh nh\xE2n ho\xE0n to\xE0n kh\xF4ng c\xF3 nguy c\u01A1 \u1EE9 CO2. SpO2 k\u1EB9p ng\xF3n tay l\xE0 ph\u01B0\u01A1ng ti\u1EC7n theo d\xF5i ti\u1EBFn tri\u1EC3n c\u1EF1c k\u1EF3 an to\xE0n v\xE0 hi\u1EC7u qu\u1EA3, tr\xE1nh vi\u1EC7c ph\u1EA3i ch\u1ECDc \u0111\u1ED9ng m\u1EA1ch \u0111au \u0111\u1EDBn nhi\u1EC1u l\u1EA7n." } }, { id: 2, source: "Hennessey & Japp (Made Easy)", caseNumberDisplay: "Ca 02 (Hennessey)", title: "H\u1ED9i ch\u1EE9ng Pickwickian (B\xE9o ph\xEC gi\u1EA3m th\xF4ng kh\xED)", patientProfile: "N\u1EEF 34 tu\u1ED5i, b\xE9o ph\xEC b\u1EC7nh l\xFD (BMI 49), \u0110T\u0110 type 2, l\xE0m x\xE9t nghi\u1EC7m ti\u1EC1n ph\u1EABu c\u1EAFt d\u1EA1 d\xE0y gi\u1EA3m b\xE9o", categoryTag: "Suy h\xF4 h\u1EA5p Type 2", difficulty: "Trung b\xECnh", history: "B\u1EC7nh nh\xE2n n\u1EEF 34 tu\u1ED5i, BMI = 49 kg/m2, kh\xF4ng tri\u1EC7u ch\u1EE9ng h\xF4 h\u1EA5p l\xFAc ngh\u1EC9, \u0111\u01B0\u1EE3c l\xE0m kh\xED m\xE1u \u0111\u1ED9ng m\u1EA1ch t\u1EA7m so\xE1t ti\u1EC1n ph\u1EABu tr\u01B0\u1EDBc m\u1ED5 bariatric surgery.", examination: { vitals: { pulse: "76 l\u1EA7n/ph\xFAt", rr: "14 l\u1EA7n/ph\xFAt", bp: "130/80 mmHg", temp: "36.8\xB0C", spo2: "96% (kh\xED tr\u1EDDi)", fio2: "21%" }, findings: "Th\u1EC3 tr\u1EA1ng b\xE9o ph\xEC n\u1EB7ng, l\u1ED3ng ng\u1EF1c di \u0111\u1ED9ng k\xE9m theo nh\u1ECBp th\u1EDF. Nghe ph\u1ED5i r\xEC r\xE0o ph\u1EBF nang gi\u1EA3m nh\u1EB9 to\xE0n b\u1ED9, kh\xF4ng ran." }, abg: { unit: "kPa", pH: 7.35, pCO2: 7.3, pO2: 9.6, hco3: 29, be: 3.8, sao2: 96, fio2: 21, na: 134, k: 4.7, cl: 102, lactate: 1, glucose: 9, patientAge: 34 }, questions: ["1. M\xF4 t\u1EA3 trao \u0111\u1ED5i kh\xED v\xE0 th\u0103ng b\u1EB1ng ki\u1EC1m toan?", "2. Ch\u1EA9n \u0111o\xE1n nguy\xEAn nh\xE2n h\u1EE3p l\xFD nh\u1EA5t?", "3. L\xE0m th\u1EBF n\xE0o \u0111\u1EC3 bi\u1EBFt \u0111\xE2y l\xE0 Toan h\xF4 h\u1EA5p m\u1EA1n t\xEDnh b\xF9 tr\u1EEB hay Ki\u1EC1m chuy\u1EC3n h\xF3a b\xF9 tr\u1EEB h\xF4 h\u1EA5p?"], answers: { gasExchange: "Suy h\xF4 h\u1EA5p Type 2 m\u1EA1n t\xEDnh (T\u0103ng CO2 m\u1EA1n t\xEDnh PaCO2 54.8 mmHg / 7.3 kPa do h\u1EA1n ch\u1EBF l\u1ED3ng ng\u1EF1c). Gi\u1EA3m oxy h\xF3a m\xE1u m\u1EE9c \u0111\u1ED9 nh\u1EB9.", acidBase: "Toan h\xF4 h\u1EA5p m\u1EA1n t\xEDnh b\xF9 tr\u1EEB ho\xE0n to\xE0n (Compensated Respiratory Acidosis). pH 7.35 (\u1EDF c\u1EADn d\u01B0\u1EDBi b\xECnh th\u01B0\u1EDDng 7.35-7.40), HCO3- t\u0103ng l\xEAn 29.0 mmol/L.", differentialDiagnosis: "H\u1ED9i ch\u1EE9ng b\xE9o ph\xEC gi\u1EA3m th\xF4ng kh\xED (Obesity-Hypoventilation Syndrome / Pickwickian Syndrome). Kh\u1ED1i l\u01B0\u1EE3ng m\u1EE1 th\xE0nh ng\u1EF1c qu\xE1 l\u1EDBn c\u1EA3n tr\u1EDF gi\xE3n n\u1EDF ph\u1ED5i g\xE2y gi\u1EA3m th\xF4ng kh\xED ph\u1EBF nang k\xE9o d\xE0i.", clinicalAction: "T\u1EADp v\u1EADt l\xFD tr\u1ECB li\u1EC7u h\xF4 h\u1EA5p, t\u1EA7m so\xE1t ng\u01B0ng th\u1EDF khi ng\u1EE7 (Polysomnography), ch\u1EC9 \u0111\u1ECBnh th\xF4ng kh\xED \xE1p l\u1EF1c d\u01B0\u01A1ng kh\xF4ng x\xE2m nh\u1EADp (CPAP/BiPAP) ban \u0111\xEAm tr\u01B0\u1EDBc v\xE0 sau ph\u1EABu thu\u1EADt.", physiologicalInsight: 'Nguy\xEAn t\u1EAFc v\xE0ng: Kh\xF4ng bao gi\u1EDD c\xF3 s\u1EF1 "b\xF9 tr\u1EEB qu\xE1 m\u1EE9c" (Overcompensation does not occur). \u0110i\u1EC3m trung h\xF2a l\xE0 pH 7.40; v\xEC pH th\u1EF1c t\u1EBF l\xE0 7.35 (nghi\xEAng v\u1EC1 toan) n\xEAn r\u1ED1i lo\u1EA1n ti\xEAn ph\xE1t B\u1EAET BU\u1ED8C l\xE0 Toan h\xF4 h\u1EA5p v\xE0 HCO3 t\u0103ng l\xE0 \u0111\xE1p \u1EE9ng b\xF9 tr\u1EEB c\u1EE7a th\u1EADn k\xE9o d\xE0i nhi\u1EC1u tu\u1EA7n.' } }, { id: 3, source: "Hennessey & Japp (Made Easy)", caseNumberDisplay: "Ca 03 (Hennessey)", title: "Thuy\xEAn t\u1EAFc m\u1EA1ch ph\u1ED5i c\u1EA5p (Pulmonary Embolism)", patientProfile: "N\u1EEF 24 tu\u1ED5i, sinh vi\xEAn \u0111i\u1EC1u d\u01B0\u1EE1ng, kh\xF3 th\u1EDF \u0111\u1ED9t ng\u1ED9t sau chuy\u1EBFn bay 24 gi\u1EDD t\u1EEB \xDAc v\u1EC1 Anh", categoryTag: "C\u1EA5p c\u1EE9u m\u1EA1ch ph\u1ED5i", difficulty: "N\xE2ng cao", history: "N\u1EEF 24 tu\u1ED5i, kh\xF4ng ti\u1EC1n s\u1EED b\u1EC7nh tim ph\u1ED5i, kh\xF4ng h\xFAt thu\u1ED1c. V\u1EEBa \u0111\xE1p chuy\u1EBFn bay \u0111\u01B0\u1EDDng d\xE0i t\u1EEB \xDAc v\u1EC1 ng\xE0y h\xF4m tr\u01B0\u1EDBc, xu\u1EA5t hi\u1EC7n kh\xF3 th\u1EDF \u0111\u1ED9t ng\u1ED9t, lo l\u1EAFng t\u1ED9t \u0111\u1ED9. Kh\xF4ng \u0111au ng\u1EF1c ki\u1EC3u m\xE0ng ph\u1ED5i, kh\xF4ng ho m\xE1u.", examination: { vitals: { pulse: "88 l\u1EA7n/ph\xFAt", rr: "22 l\u1EA7n/ph\xFAt", bp: "124/76 mmHg", temp: "37.0\xB0C", spo2: "95% (kh\xED tr\u1EDDi)", fio2: "21%" }, findings: "B\u1EC7nh nh\xE2n r\u1EA5t lo l\u1EAFng, h\u1ED1t ho\u1EA3ng. Kh\xE1m ph\u1ED5i ho\xE0n to\xE0n b\xECnh th\u01B0\u1EDDng, kh\xF4ng ran, kh\xF4ng d\u1EA5u hi\u1EC7u DVT chi d\u01B0\u1EDBi tr\xEAn l\xE2m s\xE0ng. X-quang ng\u1EF1c th\u1EB3ng b\xECnh th\u01B0\u1EDDng." }, abg: { unit: "kPa", pH: 7.51, pCO2: 3.9, pO2: 10.3, hco3: 25, be: 0.7, sao2: 93.7, fio2: 21, na: 141, k: 4.3, cl: 101, lactate: 1, glucose: 4.6, patientAge: 24 }, questions: ["1. Ph\xE2n t\xEDch trao \u0111\u1ED5i kh\xED v\xE0 toan ki\u1EC1m?", "2. T\xEDnh to\xE1n A-a gradient \u1EDF ca n\xE0y?", "3. Ch\u1EA9n \u0111o\xE1n nghi ng\u1EDD h\xE0ng \u0111\u1EA7u l\xE0 g\xEC v\xE0 h\u01B0\u1EDBng x\u1EED tr\xED ti\u1EBFp theo?"], answers: { gasExchange: "Suy h\xF4 h\u1EA5p Type 1 m\u1EE9c \u0111\u1ED9 nh\u1EB9 c\xF3 k\xE8m t\u0103ng th\xF4ng kh\xED r\xF5 r\u1EC7t (PaCO2 gi\u1EA3m xu\u1ED1ng 29.3 mmHg). \u1EDE ng\u01B0\u1EDDi tr\u1EBB 24 tu\u1ED5i b\xECnh th\u01B0\u1EDDng, PaO2 ph\u1EA3i \u0111\u1EA1t > 95 mmHg; m\u1EE9c 77 mmHg l\xE0 b\u1EA5t th\u01B0\u1EDDng r\xF5 r\u1EC7t!", acidBase: "Ki\u1EC1m h\xF4 h\u1EA5p c\u1EA5p ch\u01B0a b\xF9 tr\u1EEB do th\u1EDF nhanh ph\u1EA3n x\u1EA1.", differentialDiagnosis: "Thuy\xEAn t\u1EAFc \u0111\u1ED9ng m\u1EA1ch ph\u1ED5i (Pulmonary Embolism - PE) th\u1EE9 ph\xE1t sau huy\u1EBFt kh\u1ED1i t\u0129nh m\u1EA1ch s\xE2u do b\u1EA5t \u0111\u1ED9ng tr\xEAn chuy\u1EBFn bay d\xE0i. Ph\xE2n bi\u1EC7t v\u1EDBi c\u01A1n ho\u1EA3ng lo\u1EA1n (Panic attack/Hyperventilation syndrome).", clinicalAction: "A-a gradient t\xEDnh \u0111\u01B0\u1EE3c l\xE0 38 mmHg (4.7 kPa), v\u01B0\u1EE3t xa m\u1EE9c b\xECnh th\u01B0\u1EDDng (< 20 mmHg hay < 2.6 kPa). \u0110i\u1EC1u n\xE0y ch\u1EE9ng minh c\xF3 b\u1EA5t t\u01B0\u01A1ng x\u1EE9ng V/Q th\u1EF1c t\u1ED5n trong ph\u1ED5i ch\u1EE9 kh\xF4ng ph\u1EA3i ch\u1EC9 l\xE0 lo \xE2u \u0111\u01A1n thu\u1EA7n! Ch\u1EC9 \u0111\u1ECBnh ngay CT m\u1EA1ch m\xE1u ph\u1ED5i c\xF3 c\u1EA3n quang (CTPA) ho\u1EB7c x\xE9t nghi\u1EC7m D-Dimer, kh\u1EDFi \u0111\u1ED9ng ch\u1ED1ng \u0111\xF4ng khi c\xF3 ch\u1EC9 \u0111\u1ECBnh.", physiologicalInsight: "M\u1ED9t c\xE1i b\u1EABy ch\u1EBFt ng\u01B0\u1EDDi tr\xEAn l\xE2m s\xE0ng: Nh\xECn SpO2 95% c\xF3 v\u1EBB b\xECnh th\u01B0\u1EDDng, nh\u01B0ng khi b\u1EC7nh nh\xE2n \u0111ang th\u1EDF nhanh (PaCO2 gi\u1EA3m), theo ph\u01B0\u01A1ng tr\xECnh kh\xED ph\u1EBF nang PAO2 ph\u1EA3i t\u0103ng l\xEAn cao. Khi PaO2 th\u1EF1c t\u1EBF kh\xF4ng t\u0103ng t\u01B0\u01A1ng x\u1EE9ng l\xE0m A-a gradient gi\xE3n r\u1ED9ng, \u0111\xF3 l\xE0 b\u1EB1ng ch\u1EE9ng c\u1EE7a t\u1EAFc ngh\u1EBDn gi\u01B0\u1EDDng m\u1EA1ch ph\u1ED5i!" } }, { id: 4, source: "Hennessey & Japp (Made Easy)", caseNumberDisplay: "Ca 04 (Hennessey)", title: "Ng\u1ED9 \u0111\u1ED9c Morphin h\u1EADu ph\u1EABu g\xE2y ng\u1EEBng th\u1EDF", patientProfile: "Nam 78 tu\u1ED5i, h\u1EADu ph\u1EABu c\u1EAFt t\xFAi m\u1EADt m\u1EDF, li b\xEC kh\xF3 \u0111\xE1nh th\u1EE9c, \u0111\u1ED3ng t\u1EED co nh\u1ECF", categoryTag: "Ng\u1ED9 \u0111\u1ED9c / C\u1EA5p c\u1EE9u", difficulty: "C\u1EA5p c\u1EE9u", history: "C\u1EE5 \xF4ng 78 tu\u1ED5i v\u1EEBa m\u1ED5 h\u1EDF c\u1EAFt t\xFAi m\u1EADt ph\u1EE9c t\u1EA1p. B\u1EC7nh nh\xE2n \u0111\u01B0\u1EE3c ti\xEAm 3 m\u0169i Morphin 10mg trong v\xF2ng v\xE0i gi\u1EDD ngo\xE0i l\u01B0\u1EE3ng morphin do m\xE1y gi\u1EA3m \u0111au PCA cung c\u1EA5p. \u0110i\u1EC1u d\u01B0\u1EE1ng ph\xE1t hi\u1EC7n b\u1EC7nh nh\xE2n li b\xEC, th\u1EDF ng\u1EAFt qu\xE3ng.", examination: { vitals: { pulse: "90 l\u1EA7n/ph\xFAt", rr: "5 l\u1EA7n/ph\xFAt", bp: "98/64 mmHg", temp: "36.2\xB0C", spo2: "99% (\u0111ang th\u1EDF oxy 28%)", fio2: "28%" }, findings: "H\xF4n m\xEA n\xF4ng, kh\xF4ng \u0111\xE1p \u1EE9ng l\u1EDDi g\u1ECDi, th\u1EDF r\u1EA5t n\xF4ng 5 l\u1EA7n/ph\xFAt. Hai \u0111\u1ED3ng t\u1EED co nh\u1ECF nh\u01B0 \u0111\u1EA7u \u0111inh ghim (pinpoint pupils)." }, abg: { unit: "kPa", pH: 7.18, pCO2: 8.2, pO2: 11.76, hco3: 22.4, be: -1.5, sao2: 99.8, fio2: 28, na: 137, k: 4.4, cl: 103, lactate: 1, glucose: 3.9, patientAge: 78 }, questions: ["1. M\xF4 t\u1EA3 trao \u0111\u1ED5i kh\xED v\xE0 th\u0103ng b\u1EB1ng ki\u1EC1m toan?", "2. Ch\u1EA9n \u0111o\xE1n nguy\xEAn nh\xE2n?", "3. X\u1EED tr\xED c\u1EA5p c\u1EE9u c\u1EE5 th\u1EC3 ngay l\u1EADp t\u1EE9c l\xE0 g\xEC?"], answers: { gasExchange: "Suy h\xF4 h\u1EA5p Type 2 c\u1EA5p t\xEDnh (Suy th\xF4ng kh\xED ph\u1EBF nang c\u1EA5p t\xEDnh do \u1EE9c ch\u1EBF trung t\xE2m h\xF4 h\u1EA5p). PaO2 b\xECnh th\u01B0\u1EDDng gi\u1EA3 t\u1EA1o do \u0111ang th\u1EDF oxy 28%.", acidBase: "Toan h\xF4 h\u1EA5p c\u1EA5p t\xEDnh ch\u01B0a b\xF9 tr\u1EEB m\u1EE9c \u0111\u1ED9 n\u1EB7ng (pH 7.18 t\u1EE5t s\xE2u, PaCO2 t\u0103ng cao 62 mmHg, HCO3- b\xECnh th\u01B0\u1EDDng 22.4 mmol/L).", differentialDiagnosis: "Ng\u1ED9 \u0111\u1ED9c qu\xE1 li\u1EC1u Opiate / Morphin h\u1EADu ph\u1EABu (Opioid Toxicity).", clinicalAction: "1. Khai th\xF4ng \u0111\u01B0\u1EDDng th\u1EDF, b\xF3p b\xF3ng Ambu qua m\u1EB7t n\u1EA1 ngay l\u1EADp t\u1EE9c. 2. Ti\xEAm t\u0129nh m\u1EA1ch ch\u1EA5t \u0111\u1ED1i kh\xE1ng \u0111\u1EB7c hi\u1EC7u NALOXONE 0.4mg - 0.8mg, l\u1EB7p l\u1EA1i sau m\u1ED7i 2-3 ph\xFAt \u0111\u1EBFn khi nh\u1ECBp th\u1EDF ph\u1EE5c h\u1ED3i. 3. L\u01B0u \xFD: Naloxone c\xF3 th\u1EDDi gian b\xE1n h\u1EE7y ng\u1EAFn h\u01A1n morphin (ch\u1EC9 30-60 ph\xFAt), b\u1EC7nh nh\xE2n c\xF3 th\u1EC3 t\xE1i ng\u1ED9 \u0111\u1ED9c v\xE0 \u1EE9c ch\u1EBF h\xF4 h\u1EA5p tr\u1EDF l\u1EA1i, ph\u1EA3i theo d\xF5i s\xE1t li\xEAn t\u1EE5c trong \u0111\u01A1n v\u1ECB h\u1ED3i t\u1EC9nh/ICU.", physiologicalInsight: "D\xF9 SpO2 m\xE1y k\u1EB9p hi\u1EC3n th\u1ECB 99% nh\u1EDD oxy 28%, b\u1EC7nh nh\xE2n \u0111ang \u1EDF b\u1EDD v\u1EF1c t\u1EED vong v\xEC PaCO2 v\u1ECDt l\xEAn g\xE2y toan m\xE1u n\u1EB7ng (pH 7.18). \u0110\xE2y l\xE0 minh ch\u1EE9ng r\xF5 r\u1EC7t cho vi\u1EC7c m\xE1y \u0111o SpO2 ho\xE0n to\xE0n v\xF4 d\u1EE5ng trong \u0111\xE1nh gi\xE1 th\xF4ng kh\xED ph\u1EBF nang!" } }, { id: 5, source: "Hennessey & Japp (Made Easy)", caseNumberDisplay: "Ca 05 (Hennessey)", title: "\u0110\u1EE3t c\u1EA5p COPD: Khi n\xE0o \u0110\u01AF\u1EE2C PH\xC9P cho th\u1EDF oxy?", patientProfile: "Nam 75 tu\u1ED5i, ti\u1EC1n s\u1EED COPD n\u1EB7ng nhi\u1EC1u n\u0103m, kh\xF3 th\u1EDF t\u0103ng d\u1EA7n 3 ng\xE0y, th\u1EDF ch\xFAm m\xF4i", categoryTag: "B\u1EC7nh ph\u1ED5i m\u1EA1n t\xEDnh (COPD)", difficulty: "C\u01A1 b\u1EA3n", history: "C\u1EE5 \xF4ng 75 tu\u1ED5i c\xF3 ti\u1EC1n s\u1EED COPD nhi\u1EC1u n\u0103m. 3 ng\xE0y nay kh\xF3 th\u1EDF nhi\u1EC1u h\u01A1n, kh\u1EA1c \u0111\u1EDDm \u0111\u1EB7c nhi\u1EC1u. Gia \u0111\xECnh \u0111\u01B0a v\xE0o c\u1EA5p c\u1EE9u trong t\xECnh tr\u1EA1ng n\xF3i t\u1EEBng t\u1EEB, v\xE3 m\u1ED3 h\xF4i.", examination: { vitals: { pulse: "120 l\u1EA7n/ph\xFAt", rr: "26 l\u1EA7n/ph\xFAt", bp: "150/80 mmHg", temp: "36.0\xB0C", spo2: "81% (kh\xED tr\u1EDDi)", fio2: "21%" }, findings: "B\u1EC7nh nh\xE2n v\u1EADt v\xE3, co k\xE9o c\u01A1 li\xEAn s\u01B0\u1EDDn, th\u1EDF ch\xFAm m\xF4i. L\u1ED3ng ng\u1EF1c h\xECnh th\xF9ng, r\xEC r\xE0o ph\u1EBF nang gi\u1EA3m to\xE0n di\u1EC7n." }, abg: { unit: "kPa", pH: 7.4, pCO2: 4.9, pO2: 5.8, hco3: 23, be: -1.2, sao2: 80, fio2: 21, na: 137, k: 4.1, cl: 99, lactate: 1, glucose: 3.8, patientAge: 75 }, questions: ["1. \u0110\xE1nh gi\xE1 trao \u0111\u1ED5i kh\xED v\xE0 toan ki\u1EC1m?", "2. C\xF3 n\xEAn cho b\u1EC7nh nh\xE2n n\xE0y th\u1EDF oxy kh\xF4ng, hay ph\u1EA3i ki\xEAng v\xEC s\u1EE3 m\u1EA5t Hypoxic Drive?"], answers: { gasExchange: "Suy h\xF4 h\u1EA5p Type 1 m\u1EE9c \u0111\u1ED9 trung b\xECnh-n\u1EB7ng (PaO2 44 mmHg / 5.8 kPa, SaO2 80%). PaCO2 ho\xE0n to\xE0n b\xECnh th\u01B0\u1EDDng (36 mmHg).", acidBase: "Th\u0103ng b\u1EB1ng toan ki\u1EC1m b\xECnh th\u01B0\u1EDDng (pH 7.40, HCO3- 23 mmol/L).", differentialDiagnosis: "\u0110\u1EE3t c\u1EA5p b\u1EC7nh ph\u1ED5i t\u1EAFc ngh\u1EBDn m\u1EA1n t\xEDnh (AECOPD) - Th\u1EC3 suy h\xF4 h\u1EA5p gi\u1EA3m oxy m\xE1u \u0111\u01A1n thu\u1EA7n (Type 1).", clinicalAction: "CHO TH\u1EDE OXY NGAY L\u1EACP T\u1EE8C! M\u1EE5c ti\xEAu SpO2 ban \u0111\u1EA7u 88 - 92% ho\u1EB7c 94% n\u1EBFu theo d\xF5i s\xE1t. D\xF9ng kh\xED dung Salbutamol + Ipratropium, Corticoid to\xE0n th\xE2n.", physiologicalInsight: 'B\xE0i h\u1ECDc \u0111\u1EAFt gi\xE1 trong y khoa: R\u1EA5t nhi\u1EC1u b\xE1c s\u0129 v\xE0 \u0111i\u1EC1u d\u01B0\u1EE1ng s\u1EE3 th\u1EDF oxy cho b\u1EC7nh nh\xE2n COPD v\xEC \xE1m \u1EA3nh kh\xE1i ni\u1EC7m "m\u1EA5t Hypoxic Drive". Tuy nhi\xEAn, b\u1EC7nh nh\xE2n n\xE0y c\xF3 PaCO2 b\xECnh th\u01B0\u1EDDng v\xE0 HCO3 b\xECnh th\u01B0\u1EDDng, ngh\u0129a l\xE0 KH\xD4NG H\u1EC0 C\xD3 \u1EE8 CO2 M\u1EA0N T\xCDNH v\xE0 kh\xF4ng h\u1EC1 s\u1ED1ng ph\u1EE5 thu\u1ED9c hypoxic drive! PaO2 44 mmHg r\u01A1i v\xE0o \u0111o\u1EA1n d\u1ED1c \u0111\u1EE9ng c\u1EE7a \u0111\u01B0\u1EDDng cong ph\xE2n ly Hemoglobin; n\u1EBFu nh\u1ECBn th\u1EDF oxy, b\u1EC7nh nh\xE2n s\u1EBD t\u1EED vong v\xEC thi\u1EBFu oxy n\xE3o v\xE0 c\u01A1 tim tr\u01B0\u1EDBc khi k\u1ECBp b\u1ECB \u1EE9 CO2!' } }, { id: 6, source: "Hennessey & Japp (Made Easy)", caseNumberDisplay: "Ca 06 (Hennessey)", title: "Ki\u1EC7t c\u01A1 h\xF4 h\u1EA5p trong \u0111\u1EE3t c\u1EA5p COPD: Th\u1EDF oxy kh\xF4ng \u0111\u1EE7!", patientProfile: "B\u1EC7nh nh\xE2n \u1EDF Ca 05 sau 6 gi\u1EDD \u0111i\u1EC1u tr\u1ECB, th\u1EDF ch\u1EADm l\u1EA1i c\xF2n 16 l/p nh\u01B0ng l\xFA l\u1EABn, ki\u1EC7t s\u1EE9c", categoryTag: "Suy h\xF4 h\u1EA5p Type 2", difficulty: "N\xE2ng cao", history: "B\u1EC7nh nh\xE2n Ca 05 \u0111\u01B0\u1EE3c kh\xED dung gi\xE3n ph\u1EBF qu\u1EA3n, u\u1ED1ng prednisolone, kh\xE1ng sinh v\xE0 cho th\u1EDF oxy 28% qua mask Venturi. Sau 6 gi\u1EDD, SpO2 ch\u1EC9 l\xEAn \u0111\u01B0\u1EE3c 83%, b\u1EC7nh nh\xE2n ng\xE0y c\xE0ng m\u1EC7t m\u1ECFi v\xE0 l\xFA l\u1EABn.", examination: { vitals: { pulse: "120 l\u1EA7n/ph\xFAt", rr: "16 l\u1EA7n/ph\xFAt", bp: "120/80 mmHg", temp: "36.0\xB0C", spo2: "83% (\u0111ang th\u1EDF 28% O2)", fio2: "28%" }, findings: "B\u1EC7nh nh\xE2n ki\u1EC7t s\u1EE9c, tri gi\xE1c l\u01A1 m\u01A1 l\u1EABn l\u1ED9n. Nh\u1ECBp th\u1EDF gi\u1EA3m t\u1EEB 26 xu\u1ED1ng 16 l\u1EA7n/ph\xFAt (d\u1EA5u hi\u1EC7u ki\u1EC7t c\u01A1 h\xF4 h\u1EA5p nguy hi\u1EC3m)." }, abg: { unit: "kPa", pH: 7.29, pCO2: 6.9, pO2: 6.4, hco3: 24, be: -0.9, sao2: 84, fio2: 28, na: 137, k: 4, cl: 99, lactate: 1, glucose: 4.2, patientAge: 75 }, questions: ["1. M\xF4 t\u1EA3 s\u1EF1 thay \u0111\u1ED5i so v\u1EDBi kh\xED m\xE1u ban \u0111\u1EA7u?", "2. C\xF3 n\xEAn c\u1EAFt oxy c\u1EE7a b\u1EC7nh nh\xE2n kh\xF4ng?", "3. Bi\u1EC7n ph\xE1p x\u1EED tr\xED can thi\u1EC7p n\xE0o l\xE0 t\u1ED1i \u01B0u l\xFAc n\xE0y?"], answers: { gasExchange: "Chuy\u1EC3n bi\u1EBFn t\u1EEB Suy h\xF4 h\u1EA5p Type 1 sang Suy h\xF4 h\u1EA5p Type 2 c\u1EA5p t\xEDnh (PaCO2 t\u0103ng t\u1EEB 36 l\xEAn 52 mmHg). Thi\u1EBFu oxy m\xE1u v\u1EABn nghi\xEAm tr\u1ECDng (PaO2 48 mmHg tr\xEAn FiO2 28%).", acidBase: "Toan h\xF4 h\u1EA5p c\u1EA5p ch\u01B0a b\xF9 tr\u1EEB (pH 7.29 toan m\xE1u, PaCO2 t\u0103ng cao, HCO3- 24 ch\u01B0a k\u1ECBp b\xF9).", differentialDiagnosis: "Ki\u1EC7t c\u01A1 h\xF4 h\u1EA5p (Respiratory Muscle Fatigue / Exhaustion) trong \u0111\u1EE3t c\u1EA5p COPD kh\xE1ng tr\u1ECB thu\u1ED1c gi\xE3n ph\u1EBF qu\u1EA3n.", clinicalAction: "KH\xD4NG \u0110\u01AF\u1EE2C C\u1EAET OXY! B\u1EC7nh nh\xE2n \u0111ang thi\u1EBFu oxy m\xE1u n\u1EB7ng (PaO2 48 mmHg). Nguy\xEAn nh\xE2n PaCO2 t\u0103ng kh\xF4ng ph\u1EA3i do m\u1EA5t hypoxic drive m\xE0 l\xE0 do c\xE1c c\u01A1 h\xF4 h\u1EA5p b\u1ECB ki\u1EC7t s\u1EE9c kh\xF4ng c\xF2n s\u1EE9c t\u1ED1ng kh\xED. B\u1EAET BU\u1ED8C KH\u1EDEI \u0110\u1ED8NG TH\xD4NG KH\xCD KH\xD4NG X\xC2M NH\u1EACP (NIV / BiPAP) ngay l\u1EADp t\u1EE9c. N\u1EBFu th\u1EA5t b\u1EA1i v\u1EDBi BiPAP ho\u1EB7c \xFD th\u1EE9c suy gi\u1EA3m th\xEAm -> \u0110\u1EB7t N\u1ED9i kh\xED qu\u1EA3n th\u1EDF m\xE1y.", physiologicalInsight: 'Khi m\u1ED9t b\u1EC7nh nh\xE2n suy h\xF4 h\u1EA5p \u0111ang th\u1EDF 26-30 l/p \u0111\u1ED9t ng\u1ED9t "th\u1EDF ch\u1EADm l\u1EA1i" 14-16 l/p m\xE0 SpO2 kh\xF4ng l\xEAn, k\xE8m l\u01A1 m\u01A1, \u0111\xF3 KH\xD4NG PH\u1EA2I l\xE0 b\u1EC7nh nh\xE2n \u0111\u1EE1 kh\xF3 th\u1EDF, m\xE0 l\xE0 c\u01A1 ho\xE0nh v\xE0 c\u01A1 li\xEAn s\u01B0\u1EDDn \u0111\xE3 ho\xE0n to\xE0n ki\u1EC7t s\u1EE9c (Exhaustion). PaCO2 s\u1EBD \u1EE9 \u0111\u1ECDng th\u1EA7n t\u1ED1c g\xE2y toan m\xE1u t\u1EED vong n\u1EBFu kh\xF4ng c\xF3 m\xE1y th\u1EDF g\xE1nh v\xE1c c\xF4ng th\u1EDF!' } }, { id: 9, source: "Hennessey & Japp (Made Easy)", caseNumberDisplay: "Ca 09 (Hennessey)", title: "COPD \u0111\u1EE3t c\u1EA5p \u1EDF ng\u01B0\u1EDDi c\xF3 \u1EE9 CO2 m\u1EA1n: Nguy c\u01A1 Hypoxic Drive", patientProfile: "Nam 68 tu\u1ED5i, COPD n\u1EB7ng l\xE2u n\u0103m, kh\xF3 th\u1EDF khi g\u1EAFng s\u1EE9c nh\u1EB9, m\xF4i ch\xFAm", categoryTag: "B\u1EC7nh ph\u1ED5i m\u1EA1n t\xEDnh (COPD)", difficulty: "Trung b\xECnh", history: "B\u1EC7nh nh\xE2n 68 tu\u1ED5i, ti\u1EC1n s\u1EED COPD n\u1EB7ng, \u0111i b\u1ED9 500m l\xE0 m\u1EC7t, nay kh\xF3 th\u1EDF ngay c\u1EA3 khi m\u1EB7c qu\u1EA7n \xE1o. V\xE0o vi\u1EC7n v\xEC kh\xF3 th\u1EDF t\u0103ng trong 24 gi\u1EDD qua.", examination: { vitals: { pulse: "96 l\u1EA7n/ph\xFAt", rr: "24 l\u1EA7n/ph\xFAt", bp: "138/82 mmHg", temp: "36.5\xB0C", spo2: "78% (kh\xED tr\u1EDDi)", fio2: "21%" }, findings: "T\u1EC9nh t\xE1o, ti\u1EBFp x\xFAc t\u1ED1t, th\u1EDF ch\xFAm m\xF4i, co k\xE9o c\u01A1 h\xF4 h\u1EA5p ph\u1EE5 nh\u1EB9. Nghe ph\u1ED5i r\xEC r\xE0o ph\u1EBF nang gi\u1EA3m, r\u1EA3i r\xE1c ran ng\xE1y." }, abg: { unit: "kPa", pH: 7.36, pCO2: 7.2, pO2: 5.3, hco3: 30.6, be: 4.9, sao2: 75.2, fio2: 21, na: 144, k: 3.7, cl: 102, lactate: 1.2, glucose: 4.9, patientAge: 68 }, questions: ["1. M\xF4 t\u1EA3 trao \u0111\u1ED5i kh\xED v\xE0 th\u0103ng b\u1EB1ng ki\u1EC1m toan?", "2. Ch\u1EC9 s\u1ED1 n\xE0o \u0111\xE3 thay \u0111\u1ED5i c\u1EA5p t\xEDnh trong 24h qua?", "3. Hai ch\u1EC9 s\u1ED1 n\xE0o c\u1EA3nh b\xE1o c\u1EA7n h\u1EBFt s\u1EE9c th\u1EADn tr\u1ECDng khi cho th\u1EDF oxy?"], answers: { gasExchange: "Suy h\xF4 h\u1EA5p Type 2 m\u1EA1n t\xEDnh (PaCO2 54.1 mmHg t\u0103ng m\u1EA1n) c\xF3 k\xE8m gi\u1EA3m oxy m\xE1u m\u1EE9c \u0111\u1ED9 n\u1EB7ng (PaO2 40 mmHg / 5.3 kPa).", acidBase: "Toan h\xF4 h\u1EA5p m\u1EA1n t\xEDnh b\xF9 tr\u1EEB ho\xE0n to\xE0n (pH 7.36 n\u1EB1m trong kho\u1EA3ng b\xECnh th\u01B0\u1EDDng 7.35-7.40, HCO3- t\u0103ng cao 30.6 mmol/L).", differentialDiagnosis: "\u0110\u1EE3t c\u1EA5p COPD tr\xEAn n\u1EC1n suy h\xF4 h\u1EA5p m\u1EA1n t\xEDnh t\u0103ng th\xE1n kh\xED.", clinicalAction: "Ch\u1EC9 s\u1ED1 thay \u0111\u1ED5i c\u1EA5p t\xEDnh trong 24h l\xE0 PaO2 t\u1EE5t xu\u1ED1ng 40 mmHg (nguy\xEAn nh\xE2n g\xE2y kh\xF3 th\u1EDF d\u1EEF d\u1ED9i). Hai ch\u1EC9 s\u1ED1 c\u1EA3nh b\xE1o th\u1EADn tr\u1ECDng th\u1EDF oxy l\xE0 PaCO2 (7.2 kPa) v\xE0 HCO3- (30.6 mmol/L) ch\u1EE9ng minh b\u1EC7nh nh\xE2n c\xF3 \u1EE9 CO2 m\u1EA1n t\xEDnh v\xE0 C\xD3 NGUY C\u01A0 CAO M\u1EA4T HYPOXIC DRIVE n\u1EBFu th\u1EDF oxy n\u1ED3ng \u0111\u1ED9 cao! D\xF9ng mask Venturi 24% ho\u1EB7c 28%, m\u1EE5c ti\xEAu SpO2 nghi\xEAm ng\u1EB7t 88 - 92%.", physiologicalInsight: "Th\u1EADn c\u1EA7n 3-5 ng\xE0y \u0111\u1EC3 t\xEDch l\u0169y HCO3- l\xEAn 30.6 mmol/L nh\u1EB1m k\xE9o pH v\u1EC1 7.36. V\xEC c\u01A1 th\u1EC3 \u0111\xE3 quen s\u1ED1ng chung v\u1EDBi CO2 cao, trung t\xE2m h\xF4 h\u1EA5p \u1EDF h\xE0nh n\xE3o kh\xF4ng c\xF2n nh\u1EA1y c\u1EA3m v\u1EDBi CO2 n\u1EEFa m\xE0 duy tr\xEC nh\u1ECBp th\u1EDF d\u1EF1a v\xE0o th\u1EE5 th\u1EC3 c\u1EA3nh b\xE1o thi\u1EBFu oxy t\u1EA1i xoang c\u1EA3nh (Hypoxic Drive)." } }, { id: 10, source: "Hennessey & Japp (Made Easy)", caseNumberDisplay: "Ca 10 (Hennessey)", title: "H\u1EADu qu\u1EA3 cho th\u1EDF Oxy 60% b\u1EEBa b\xE3i \u1EDF COPD: M\u1EA5t Hypoxic Drive", patientProfile: "B\u1EC7nh nh\xE2n \u1EDF Ca 09 sau khi b\u1ECB cho th\u1EDF mask Oxy 60%, 1 gi\u1EDD sau li b\xEC l\u01A1 m\u01A1", categoryTag: "B\u1EC7nh ph\u1ED5i m\u1EA1n t\xEDnh (COPD)", difficulty: "C\u1EA5p c\u1EE9u", history: "B\u1EC7nh nh\xE2n Ca 09 \u0111\u01B0\u1EE3c chuy\u1EC3n l\xEAn khoa, \u0111i\u1EC1u d\u01B0\u1EE1ng th\u1EA5y SpO2 th\u1EA5p n\xEAn cho th\u1EDF mask oxy 60%. Sau 1 gi\u1EDD, SpO2 t\u0103ng l\xEAn 96% nh\u01B0ng b\u1EC7nh nh\xE2n tr\u1EDF n\xEAn l\u01A1 m\u01A1, lay g\u1ECDi kh\xF3 th\u1EE9c, kh\xF4ng th\u1EC3 ti\u1EBFp x\xFAc \u0111\u01B0\u1EE3c.", examination: { vitals: { pulse: "88 l\u1EA7n/ph\xFAt", rr: "14 l\u1EA7n/ph\xFAt (th\u1EDF r\u1EA5t y\u1EBFu)", bp: "132/80 mmHg", temp: "36.5\xB0C", spo2: "96% (\u0111ang th\u1EDF 60% O2)", fio2: "60%" }, findings: "H\xF4n m\xEA n\xF4ng, tay c\xF3 d\u1EA5u hi\u1EC7u run v\u1ED7 (Asterixis / Flapping tremor), m\u1EA1ch n\u1EA3y m\u1EA1nh, da \u1EA5m v\xE3 m\u1ED3 h\xF4i." }, abg: { unit: "kPa", pH: 7.29, pCO2: 8.7, pO2: 11.2, hco3: 30.3, be: 4.7, sao2: 96.2, fio2: 60, na: 144, k: 3.6, cl: 102, lactate: 1.2, glucose: 5, patientAge: 68 }, questions: ["1. M\xF4 t\u1EA3 trao \u0111\u1ED5i kh\xED v\xE0 th\u0103ng b\u1EB1ng ki\u1EC1m toan hi\u1EC7n t\u1EA1i?", "2. Nguy\xEAn nh\xE2n n\xE0o g\xE2y ra s\u1EF1 suy s\u1EE5p tri gi\xE1c \u0111\u1ED9t ng\u1ED9t c\u1EE7a b\u1EC7nh nh\xE2n?"], answers: { gasExchange: "Suy h\xF4 h\u1EA5p Type 2 \u0111\u1EE3t c\u1EA5p tr\xEAn n\u1EC1n m\u1EA1n t\xEDnh (Acute-on-chronic Type 2 respiratory impairment).", acidBase: "Toan h\xF4 h\u1EA5p m\u1EA5t b\xF9 (b\xE1n ph\u1EA7n): pH t\u1EE5t t\u1EEB 7.36 xu\u1ED1ng 7.29, PaCO2 v\u1ECDt t\u1EEB 54 l\xEAn 65.3 mmHg (8.7 kPa).", differentialDiagnosis: "Ng\u1ED9 \u0111\u1ED9c oxy g\xE2y \u1EE9c ch\u1EBF th\xF4ng kh\xED do x\xF3a b\u1ECF Hypoxic Drive (CO2 Narcosis / Hypercapnic Encephalopathy).", clinicalAction: "1. Gi\u1EA3m ngay n\u1ED3ng \u0111\u1ED9 oxy xu\u1ED1ng Venturi 28% (m\u1EE5c ti\xEAu SpO2 88-92%). 2. KH\xD4NG \u0110\u01AF\u1EE2C ng\u1EAFt oxy ho\xE0n to\xE0n v\xEC b\u1EC7nh nh\xE2n s\u1EBD t\u1EE5t PaO2 ch\u1EBFt n\xE3o. 3. \u0110\u1EB7t ngay m\xE1y th\u1EDF kh\xF4ng x\xE2m nh\u1EADp BiPAP \u0111\u1EC3 c\u01B0\u1EE1ng b\u1EE9c \u0111\xE0o th\u1EA3i CO2. 4. C\xE2n nh\u1EAFc d\xF9ng thu\u1ED1c k\xEDch th\xEDch h\xF4 h\u1EA5p (Doxapram) n\u1EBFu ch\u01B0a c\xF3 m\xE1y th\u1EDF. S\u1EB5n s\xE0ng \u0111\u1EB7t n\u1ED9i kh\xED qu\u1EA3n n\u1EBFu toan m\xE1u ti\u1EBFp t\u1EE5c x\u1EA5u \u0111i.", physiologicalInsight: "Th\u1EDF oxy 60% l\xE0m PaO2 v\u1ECDt l\xEAn 84 mmHg, l\xE0m t\u1EAFt ho\xE0n to\xE0n k\xEDch th\xEDch th\u1EDF \u1EDF th\u1EE5 th\u1EC3 ngo\u1EA1i bi\xEAn. B\u1EC7nh nh\xE2n th\u1EDF ch\u1EADm l\u1EA1i, CO2 kh\xF4ng tho\xE1t \u0111\u01B0\u1EE3c t\xEDch t\u1EE5 d\u1EEF d\u1ED9i t\u1EA1o th\xE0nh H2CO3 l\xE0m toan m\xE1u v\xE0 ng\u1ED9 \u0111\u1ED9c n\xE3o CO2." } }, { id: 11, source: "Hennessey & Japp (Made Easy)", caseNumberDisplay: "Ca 11 (Hennessey)", title: "C\u01A1n hen \xE1c t\xEDnh \u0111e d\u1ECDa t\xEDnh m\u1EA1ng: B\u1EABy PaCO2 b\xECnh th\u01B0\u1EDDng", patientProfile: "N\u1EEF 21 tu\u1ED5i, hen ph\u1EBF qu\u1EA3n n\u1EB7ng, n\xF3i t\u1EEBng t\u1EEB, co k\xE9o to\xE0n b\u1ED9 c\u01A1 c\u1ED5 v\xE0 ng\u1EF1c", categoryTag: "C\u1EA5p c\u1EE9u \u0111\u01B0\u1EDDng th\u1EDF", difficulty: "C\u1EA5p c\u1EE9u", history: "N\u1EEF 21 tu\u1ED5i, ti\u1EC1n s\u1EED hen n\u1EB7ng t\u1EEBng 2 l\u1EA7n v\xE0o ICU. 6 gi\u1EDD nay l\xEAn c\u01A1n kh\xF3 th\u1EDF d\u1EEF d\u1ED9i, x\u1ECBt Salbutamol kh\xF4ng \u0111\u1EE1. V\xE0o vi\u1EC7n th\u1EDF 30 l/p, ch\u1EC9 n\xF3i \u0111\u01B0\u1EE3c t\u1EEBng t\u1EEB c\u1EE5t ng\u1EE7n.", examination: { vitals: { pulse: "115 l\u1EA7n/ph\xFAt", rr: "30 l\u1EA7n/ph\xFAt", bp: "120/80 mmHg", temp: "37.0\xB0C", spo2: "96% (kh\xED tr\u1EDDi)", fio2: "21%" }, findings: "Co k\xE9o c\u01A1 \u1EE9c \u0111\xF2n ch\u0169m v\xE0 c\u01A1 li\xEAn s\u01B0\u1EDDn d\u1EEF d\u1ED9i. Nghe ph\u1ED5i ran r\xEDt ran ng\xE1y lan t\u1ECFa kh\u1EAFp 2 ph\u1EBF tr\u01B0\u1EDDng. PEF \u0111o \u0111\u01B0\u1EE3c 160 L/ph\xFAt (d\u1EF1 \u0111o\xE1n 400 L/ph\xFAt)." }, abg: { unit: "kPa", pH: 7.38, pCO2: 5.8, pO2: 10.2, hco3: 24, be: -1.3, sao2: 96, fio2: 21, na: 140, k: 4, cl: 99, lactate: 1, glucose: 5, patientAge: 21 }, questions: ["1. M\xF4 t\u1EA3 trao \u0111\u1ED5i kh\xED v\xE0 th\u0103ng b\u1EB1ng ki\u1EC1m toan?", "2. Ch\u1EC9 s\u1ED1 n\xE0o tr\xEAn kh\xED m\xE1u l\xE0 \u0111\xE1ng lo ng\u1EA1i nh\u1EA5t v\xE0 t\u1EA1i sao?", "3. Ph\xE2n lo\u1EA1i m\u1EE9c \u0111\u1ED9 n\u1EB7ng c\u1EE7a c\u01A1n hen n\xE0y?"], answers: { gasExchange: "Suy h\xF4 h\u1EA5p Type 1 m\u1EE9c \u0111\u1ED9 nh\u1EB9. PaO2 76.5 mmHg (\u1EDF ng\u01B0\u1EDDi 21 tu\u1ED5i b\xECnh th\u01B0\u1EDDng ph\u1EA3i > 95 mmHg).", acidBase: "pH v\xE0 HCO3- b\xECnh th\u01B0\u1EDDng.", differentialDiagnosis: "C\u01A1n hen ph\u1EBF qu\u1EA3n n\u1EB7ng \u0111e d\u1ECDa t\xEDnh m\u1EA1ng (Life-threatening Asthma Attack).", clinicalAction: "CH\u1EC8 S\u1ED0 \u0110\xC1NG S\u1EE2 NH\u1EA4T L\xC0 PaCO2 = 43.5 mmHg (5.8 kPa)! \u1EDE m\u1ED9t ng\u01B0\u1EDDi tr\u1EBB \u0111ang th\u1EDF 30 l\u1EA7n/ph\xFAt v\u1EDBi c\xF4ng th\u1EDF c\u1EF1c l\u1EDBn, PaCO2 \u0110\xC1NG L\u1EBC PH\u1EA2I R\u1EA4T TH\u1EA4P (< 30 mmHg do t\u0103ng th\xF4ng kh\xED). PaCO2 \u1EDF m\u1EE9c b\xECnh th\u01B0\u1EDDng cao ch\u1EE9ng t\u1ECF t\u1EAFc ngh\u1EBDn \u0111\u01B0\u1EDDng th\u1EDF c\u1EF1c k\u1EF3 tr\u1EA7m tr\u1ECDng v\xE0 b\u1EC7nh nh\xE2n B\u1EAET \u0110\u1EA6U KI\u1EC6T C\u01A0! B\xE1o \u0111\u1ED9ng ICU ngay l\u1EADp t\u1EE9c, kh\xED dung li\xEAn t\u1EE5c Salbutamol + Ipratropium, ti\xEAm Hydrocortisone IV, Magnesium sulfate 2g IV truy\u1EC1n 20 ph\xFAt, chu\u1EA9n b\u1ECB s\u1EB5n s\xE0ng \u0111\u1EB7t \u1ED1ng n\u1ED9i kh\xED qu\u1EA3n.", physiologicalInsight: 'Trong c\u01A1n hen, "PaCO2 b\xECnh th\u01B0\u1EDDng" l\xE0 m\u1ED9t d\u1EA5u hi\u1EC7u b\xE1o t\u1EED! N\xF3 cho th\u1EA5y b\u1EC7nh nh\xE2n kh\xF4ng c\xF2n \u0111\u1EE7 s\u1EE9c duy tr\xEC th\u1EC3 t\xEDch ph\xFAt \u0111\u1EC3 th\u1EA3i CO2, v\xE0i ph\xFAt sau PaCO2 s\u1EBD v\u1ECDt l\xEAn v\xE0 b\u1EC7nh nh\xE2n s\u1EBD ng\u1EEBng th\u1EDF do ki\u1EC7t c\u01A1 ho\xE0nh.' } }, { id: 12, source: "Hennessey & Japp (Made Easy)", caseNumberDisplay: "Ca 12 (Hennessey)", title: "H\u1ED9i ch\u1EE9ng t\u0103ng th\xF4ng kh\xED do lo \xE2u (Psychogenic Hyperventilation)", patientProfile: "N\u1EEF 23 tu\u1ED5i, t\xE9 ng\xE3 \u0111au c\u1ED5 ch\xE2n, ho\u1EA3ng s\u1EE3 kh\xF3c l\xF3c, t\xEA quanh mi\u1EC7ng v\xE0 co qu\u1EAFp b\xE0n tay", categoryTag: "T\u0103ng th\xF4ng kh\xED / Th\u1EA7n kinh", difficulty: "C\u01A1 b\u1EA3n", history: "N\u1EEF 23 tu\u1ED5i b\u1ECB tr\u1EB9o ch\xE2n nh\u1EB9, ch\u1EE5p X-quang b\xECnh th\u01B0\u1EDDng nh\u01B0ng b\u1EC7nh nh\xE2n kh\xF4ng tin, k\xEDch \u0111\u1ED9ng kh\xF3c l\xF3c. \u0110\u1ED9t ng\u1ED9t th\u1EA5y ngh\u1EB9n th\u1EDF, t\u1EE9c ng\u1EF1c, t\xEA b\xEC quanh mi\u1EC7ng v\xE0 ng\xF3n tay co c\u1EE9ng nh\u01B0 b\xE0n tay ng\u01B0\u1EDDi \u0111\u1EE1 \u0111\u1EBB (d\u1EA5u Trousseau).", examination: { vitals: { pulse: "96 l\u1EA7n/ph\xFAt", rr: "36 l\u1EA7n/ph\xFAt", bp: "130/80 mmHg", temp: "36.8\xB0C", spo2: "100% (kh\xED tr\u1EDDi)", fio2: "21%" }, findings: "Th\u1EDF r\u1EA5t nhanh n\xF4ng 36 l\u1EA7n/ph\xFAt. Tim ph\u1ED5i nghe trong, ECG nh\u1ECBp xoang b\xECnh th\u01B0\u1EDDng, PEF b\xECnh th\u01B0\u1EDDng." }, abg: { unit: "kPa", pH: 7.53, pCO2: 3.14, pO2: 14.3, hco3: 24, be: -1.8, sao2: 99, fio2: 21, na: 140, k: 3.5, cl: 99, lactate: 1, glucose: 5, patientAge: 23 }, questions: ["1. M\xF4 t\u1EA3 trao \u0111\u1ED5i kh\xED v\xE0 th\u0103ng b\u1EB1ng ki\u1EC1m toan?", "2. B\u1EA5t th\u01B0\u1EDDng x\xE9t nghi\u1EC7m n\xE0o gi\u1EA3i th\xEDch tri\u1EC7u ch\u1EE9ng t\xEA m\xF4i v\xE0 co qu\u1EAFp ng\xF3n tay?", "3. Ch\u1EA9n \u0111o\xE1n v\xE0 c\xE1ch x\u1EED tr\xED?"], answers: { gasExchange: "T\u0103ng th\xF4ng kh\xED ph\u1EBF nang nguy\xEAn ph\xE1t (Primary Hyperventilation). PaO2 t\u0103ng cao (108 mmHg), PaCO2 t\u1EE5t s\xE2u (24 mmHg).", acidBase: "Ki\u1EC1m h\xF4 h\u1EA5p c\u1EA5p ch\u01B0a b\xF9 tr\u1EEB (Uncompensated Respiratory Alkalosis, pH 7.53).", differentialDiagnosis: "H\u1ED9i ch\u1EE9ng t\u0103ng th\xF4ng kh\xED do c\u0103n nguy\xEAn t\xE2m l\xFD (Psychogenic Hyperventilation Syndrome / Panic attack).", clinicalAction: "Tri\u1EC7u ch\u1EE9ng t\xEA b\xEC co qu\u1EAFp ng\u1ECDn chi l\xE0 do H\u1EA0 CALCI ION H\xD3A M\xC1U (iCa2+ t\u1EE5t xu\u1ED1ng 0.9 mmol/L). Khi m\xE1u b\u1ECB ki\u1EC1m, ion H+ r\u1EDDi kh\u1ECFi albumin t\u1EA1o th\xEAm v\u1ECB tr\xED g\u1EAFn cho Ca2+, l\xE0m gi\u1EA3m n\u1ED3ng \u0111\u1ED9 calci ion t\u1EF1 do trong m\xE1u. X\u1EED tr\xED: Tr\u1EA5n an t\xE2m l\xFD, h\u01B0\u1EDBng d\u1EABn h\xEDt th\u1EDF ch\u1EADm l\u1EA1i, cho th\u1EDF l\u1EA1i v\xE0o t\xFAi gi\u1EA5y \u0111\u1EC3 h\xEDt l\u1EA1i CO2 t\u1EF1 th\xE2n (ch\u1EC9 l\xE0m khi \u0111\xE3 ch\u1EAFc ch\u1EAFn lo\u1EA1i tr\u1EEB b\u1EC7nh l\xFD tim ph\u1ED5i nguy hi\u1EC3m). Kh\xF4ng c\u1EA7n ti\xEAm calci.", physiologicalInsight: "Hi\u1EC7n t\u01B0\u1EE3ng r\u1EEDa tr\xF4i CO2 l\xE0m ki\u1EC1m m\xE1u c\u1EA5p t\xEDnh g\xE2y co m\u1EA1ch m\xE1u n\xE3o (d\u1EABn t\u1EDBi hoa m\u1EAFt, ch\xF3ng m\u1EB7t) v\xE0 h\u1EA1 Calci ion h\xF3a g\xE2y k\xEDch th\xEDch th\u1EA7n kinh c\u01A1 (t\xEA m\xF4i, d\u1EA5u Chvostek v\xE0 Trousseau)." } }, { id: 13, source: "Hennessey & Japp (Made Easy)", caseNumberDisplay: "Ca 13 (Hennessey)", title: "Ng\u1ED9 \u0111\u1ED9c kh\xED CO (Carbon Monoxide): C\u1EA1m b\u1EABy SpO2 99%", patientProfile: "Nam 40 tu\u1ED5i, \u0111\u01B0\u1EE3c l\xEDnh c\u1EE9u h\u1ECFa c\u1EE9u kh\u1ECFi \u0111\xE1m ch\xE1y nh\xE0 k\xEDn, h\xEDt kh\xF3i 20 ph\xFAt", categoryTag: "Ng\u1ED9 \u0111\u1ED9c / C\u1EA5p c\u1EE9u", difficulty: "N\xE2ng cao", history: "Nam 40 tu\u1ED5i m\u1EAFc k\u1EB9t trong ph\xF2ng k\xEDn \u0111\u1EA7y kh\xF3i \u0111en 20 ph\xFAt. V\xE0o c\u1EA5p c\u1EE9u ng\u01B0\u1EDDi \u0111\u1EA7y b\u1ED3 h\xF3ng, n\xF4n \xF3i, \u0111au \u0111\u1EA7u d\u1EEF d\u1ED9i, l\xFA l\u1EABn tri gi\xE1c.", examination: { vitals: { pulse: "98 l\u1EA7n/ph\xFAt", rr: "18 l\u1EA7n/ph\xFAt", bp: "125/80 mmHg", temp: "37.0\xB0C", spo2: "99% (th\u1EDF oxy mask 15L)", fio2: "80%" }, findings: "\xDD th\u1EE9c l\xFA l\u1EABn, ni\xEAm m\u1EA1c c\xF3 th\u1EC3 \u0111\u1ECF nh\u01B0 qu\u1EA3 anh \u0111\xE0o (cherry-red). Kh\xF4ng b\u1ECFng da di\u1EC7n r\u1ED9ng." }, abg: { unit: "kPa", pH: 7.36, pCO2: 4.5, pO2: 47, hco3: 18, be: -5.5, sao2: 100, fio2: 80, na: 145, k: 3.6, cl: 103, lactate: 2, glucose: 4, patientAge: 40, coHb: 40 }, questions: ["1. M\xF4 t\u1EA3 trao \u0111\u1ED5i kh\xED v\xE0 th\u0103ng b\u1EB1ng toan ki\u1EC1m?", "2. Ch\u1EA9n \u0111o\xE1n x\xE1c \u0111\u1ECBnh?", "3. Ch\u1EC9 s\u1ED1 n\xE0o tr\xEAn k\u1EBFt qu\u1EA3 kh\xED m\xE1u l\xE0 SAI L\u1EC6CH GI\u1EA2 T\u1EA0O (Falsely High)?"], answers: { gasExchange: "Ph\u1ED5i trao \u0111\u1ED5i kh\xED b\xECnh th\u01B0\u1EDDng \u0111\u1ED1i v\u1EDBi kh\xED th\u1EDF v\xE0o (PaO2 r\u1EA5t cao 353 mmHg tr\xEAn FiO2 80%), nh\u01B0ng m\xF4 th\u1EF1c t\u1EBF b\u1ECB thi\u1EBFu oxy c\u1EF1c \u0111\u1ED9!", acidBase: "Toan chuy\u1EC3n h\xF3a b\xF9 tr\u1EEB ho\xE0n to\xE0n (pH 7.36, HCO3- gi\u1EA3m 18 mmol/L, PaCO2 gi\u1EA3m nh\u1EB9 34 mmHg b\xF9 tr\u1EEB) do toan lactic t\u1EBF b\xE0o.", differentialDiagnosis: "Ng\u1ED9 \u0111\u1ED9c c\u1EA5p kh\xED Carbon Monoxide (CO Poisoning) - Carboxyhaemoglobin (COHb) 40%.", clinicalAction: "CH\u1EC8 S\u1ED0 SaO2 V\xC0 SpO2 L\xC0 SAI L\u1EC6CH GI\u1EA2 T\u1EA0O! M\xE1y \u0111o SpO2 k\u1EB9p ng\xF3n tay v\xE0 thu\u1EADt to\xE1n t\xEDnh SaO2 tr\xEAn m\xE1y kh\xED m\xE1u th\xF4ng th\u01B0\u1EDDng kh\xF4ng ph\xE2n bi\u1EC7t \u0111\u01B0\u1EE3c Oxyhaemoglobin v\xE0 Carboxyhaemoglobin (ch\xFAng h\u1EA5p th\u1EE5 b\u01B0\u1EDBc s\xF3ng g\u1EA7n t\u01B0\u01A1ng \u0111\u01B0\u01A1ng), n\xEAn b\xE1o 99-100% \u1EA3o. Tr\xEAn th\u1EF1c t\u1EBF, 40% Hb \u0111\xE3 b\u1ECB CO chi\u1EBFm gi\u1EEF, oxy kh\xF4ng th\u1EC3 g\u1EAFn k\u1EBFt v\xE0 gi\u1EA3i ph\xF3ng cho m\xF4. X\u1EED tr\xED: Th\u1EDF Oxy 100% qua mask c\xF3 t\xFAi d\u1EF1 tr\u1EEF kh\xF4ng th\u1EDF l\u1EA1i (gi\u1EA3m th\u1EDDi gian b\xE1n h\u1EE7y COHb t\u1EEB 320 ph\xFAt xu\u1ED1ng 80 ph\xFAt). Chuy\u1EC3n \u0111i\u1EC1u tr\u1ECB OXY CAO \xC1P (HBOT) n\u1EBFu COHb > 25%, ph\u1EE5 n\u1EEF mang thai ho\u1EB7c c\xF3 r\u1ED1i lo\u1EA1n \xFD th\u1EE9c.", physiologicalInsight: "CO c\xF3 \xE1i l\u1EF1c v\u1EDBi Hemoglobin g\u1EA5p 200 l\u1EA7n Oxy. PaO2 ch\u1EC9 \u0111o l\u01B0\u1EE3ng oxy h\xF2a tan t\u1EF1 do trong huy\u1EBFt t\u01B0\u01A1ng (ch\u1EC9 chi\u1EBFm 1-2% t\u1ED5ng l\u01B0\u1EE3ng oxy m\xE1u), trong khi 98-99% oxy ph\u1EA3i g\u1EAFn v\u1EDBi Hb. B\u1EC7nh nh\xE2n c\xF3 PaO2 353 mmHg nh\u01B0ng c\xE1c t\u1EBF b\xE0o v\u1EABn ch\u1EBFt ng\u1EA1t v\xEC thi\u1EBFu oxy!" } }, { id: 14, source: "Hennessey & Japp (Made Easy)", caseNumberDisplay: "Ca 14 (Hennessey)", title: "Ph\xF9 ph\u1ED5i c\u1EA5p do suy tim tr\xE1i: Toan h\u1ED7n h\u1EE3p nguy k\u1ECBch", patientProfile: "Nam 68 tu\u1ED5i, nh\u1ED3i m\xE1u c\u01A1 tim c\u0169 4 tu\u1EA7n, th\u1EE9c gi\u1EA5c n\u1EEDa \u0111\xEAm v\xEC ngh\u1EB9t th\u1EDF d\u1EEF d\u1ED9i", categoryTag: "C\u1EA5p c\u1EE9u tim m\u1EA1ch", difficulty: "C\u1EA5p c\u1EE9u", history: "C\u1EE5 \xF4ng 68 tu\u1ED5i, ti\u1EC1n s\u1EED NMCT di\u1EC7n r\u1ED9ng 4 tu\u1EA7n tr\u01B0\u1EDBc. N\u1EEDa \u0111\xEAm th\u1EE9c gi\u1EA5c v\xEC kh\xF3 th\u1EDF d\u1EEF d\u1ED9i, kh\xF4ng n\u1EB1m \u0111\u01B0\u1EE3c, ph\xF9 2 ch\xE2n t\u0103ng d\u1EA7n.", examination: { vitals: { pulse: "128 l\u1EA7n/ph\xFAt", rr: "40 l\u1EA7n/ph\xFAt", bp: "144/70 mmHg", temp: "36.6\xB0C", spo2: "91% (th\u1EDF mask t\xFAi 15L)", fio2: "80%" }, findings: "V\xE3 m\u1ED3 h\xF4i, t\xEDm t\xE1i, co k\xE9o to\xE0n b\u1ED9 c\u01A1 h\xF4 h\u1EA5p. T\u0129nh m\u1EA1ch c\u1ED5 n\u1ED5i \u0111\u1EBFn g\xF3c h\xE0m, ph\xF9 2 ch\xE2n \u0111\u1EBFn g\u1ED1i. Nghe ph\u1ED5i ran \u1EA9m d\xE2ng l\xEAn nh\u01B0 th\u1EE7y tri\u1EC1u lan \u0111\u1EBFn 2/3 ph\u1EBF tr\u01B0\u1EDDng." }, abg: { unit: "kPa", pH: 7.21, pCO2: 6.12, pO2: 9.3, hco3: 17.2, be: -5.9, sao2: 93, fio2: 80, na: 141, k: 3.7, cl: 100, lactate: 4.9, glucose: 8.5, patientAge: 68 }, questions: ["1. M\xF4 t\u1EA3 trao \u0111\u1ED5i kh\xED v\xE0 th\u0103ng b\u1EB1ng ki\u1EC1m toan?", "2. Ch\u1EA9n \u0111o\xE1n b\u1EC7nh l\xFD?", "3. Nguy\xEAn nh\xE2n g\xE2y ra toan chuy\u1EC3n h\xF3a \u1EDF b\u1EC7nh nh\xE2n n\xE0y?"], answers: { gasExchange: "Suy h\xF4 h\u1EA5p Type 2 k\u1EBFt h\u1EE3p suy gi\u1EA3m oxy m\xE1u c\u1EF1c n\u1EB7ng (PaO2 ch\u1EC9 \u0111\u1EA1t 70 mmHg d\xF9 \u0111ang th\u1EDF oxy mask t\xFAi 15L, t\u01B0\u01A1ng \u0111\u01B0\u01A1ng P/F < 90). PaCO2 b\u1EAFt \u0111\u1EA7u t\u0103ng l\xEAn 46 mmHg.", acidBase: "TOAN H\u1ED6N H\u1EE2P NGUY K\u1ECACH (Mixed Respiratory and Metabolic Acidosis). pH 7.21 t\u1EE5t s\xE2u, c\u1EA3 PaCO2 t\u0103ng v\xE0 HCO3- gi\u1EA3m (17.2 mmol/L).", differentialDiagnosis: "Ph\xF9 ph\u1ED5i c\u1EA5p huy\u1EBFt \u0111\u1ED9ng (Acute Cardiogenic Pulmonary Oedema) do suy th\u1EA5t tr\xE1i c\u1EA5p m\u1EA5t b\xF9.", clinicalAction: "Toan chuy\u1EC3n h\xF3a l\xE0 do TOAN LACTIC N\u1EB6NG (Lactate 4.9 mmol/L) sinh ra t\u1EEB 3 c\u01A1 ch\u1EBF: 1. Thi\u1EBFu oxy m\xF4 to\xE0n th\xE2n; 2. Cung l\u01B0\u1EE3ng tim t\u1EE5t gi\u1EA3m g\xE2y gi\u1EA3m t\u01B0\u1EDBi m\xE1u t\u1EA1ng; 3. C\xE1c c\u01A1 h\xF4 h\u1EA5p ph\u1EA3i l\xE0m vi\u1EC7c c\u1EADt l\u1EF1c t\u1EA1o ra acid lactic. X\u1EED tr\xED: L\u1EE3i ti\u1EC3u Furosemide t\u0129nh m\u1EA1ch, truy\u1EC1n d\xE3n m\u1EA1ch Nitroglycerin/Isoket n\u1EBFu huy\u1EBFt \xE1p cho ph\xE9p, th\u1EDF m\xE1y kh\xF4ng x\xE2m nh\u1EADp CPAP/BiPAP \xE1p l\u1EF1c cao ngay \u0111\u1EC3 t\u1ED1ng d\u1ECBch ra kh\u1ECFi ph\u1EBF nang.", physiologicalInsight: "Ph\xF9 ph\u1ED5i c\u1EA5p th\xF4ng th\u01B0\u1EDDng giai \u0111o\u1EA1n \u0111\u1EA7u l\xE0 Suy h\xF4 h\u1EA5p Type 1 k\xE8m ki\u1EC1m h\xF4 h\u1EA5p do th\u1EDF nhanh. Khi PaCO2 t\u0103ng l\xEAn k\xE8m toan lactic, \u0111\xF3 l\xE0 l\xFAc b\u1EC7nh nh\xE2n \u0111\xE3 b\u01B0\u1EDBc v\xE0o giai \u0111o\u1EA1n ki\u1EC7t s\u1EE9c (Exhaustion), c\u1EADn k\u1EC1 ng\u1EEBng th\u1EDF n\u1EBFu kh\xF4ng can thi\u1EC7p m\xE1y th\u1EDF!" } }, { id: 16, source: "Hennessey & Japp (Made Easy)", caseNumberDisplay: "Ca 16 (Hennessey)", title: "Thi\u1EBFu m\xE1u n\u1EB7ng: Th\u1EDF oxy kh\xF4ng gi\u1EA3i quy\u1EBFt \u0111\u01B0\u1EE3c v\u1EA5n \u0111\u1EC1!", patientProfile: "N\u1EEF 79 tu\u1ED5i, kh\xF3 th\u1EDF nhi\u1EC1u, m\u1EC7t l\u1EA3, ti\u1EC1n s\u1EED u \u0111\u1EA1i tr\xE0ng ch\u1EA3y m\xE1u r\u1EC9 r\u1EA3 6 th\xE1ng", categoryTag: "Huy\u1EBFt h\u1ECDc / Kh\xED m\xE1u", difficulty: "Trung b\xECnh", history: "C\u1EE5 b\xE0 79 tu\u1ED5i nh\u1EADp vi\u1EC7n ch\u1EDD m\u1ED5 c\u1EAFt u \u0111\u1EA1i tr\xE0ng. B\xE0 than phi\u1EC1n kh\xF3 th\u1EDF d\u1EEF d\u1ED9i, m\u1EC7t m\u1ECFi ki\u1EC7t s\u1EE9c d\xF9 l\u01B0\u1EE3ng m\xE1u m\u1EA5t qua ph\xE2n nh\u1EEFng ng\xE0y g\u1EA7n \u0111\xE2y kh\xF4ng t\u0103ng.", examination: { vitals: { pulse: "100 l\u1EA7n/ph\xFAt", rr: "24 l\u1EA7n/ph\xFAt", bp: "100/80 mmHg", temp: "36.5\xB0C", spo2: "100% (kh\xED tr\u1EDDi)", fio2: "21%" }, findings: "Da ni\xEAm m\u1EA1c nh\u1EE3t nh\u1EA1t nh\u01B0 s\xE1p, l\xF2ng b\xE0n tay tr\u1EAFng b\u1EC7ch. Tim nhanh, ph\u1ED5i ho\xE0n to\xE0n trong tr\u1EBBo kh\xF4ng ran." }, abg: { unit: "kPa", pH: 7.49, pCO2: 3.31, pO2: 11.9, hco3: 22, be: -2, sao2: 99.8, fio2: 21, na: 138, k: 3.8, cl: 96, lactate: 1, glucose: 3.9, patientAge: 79 }, questions: ["1. M\xF4 t\u1EA3 trao \u0111\u1ED5i kh\xED v\xE0 th\u0103ng b\u1EB1ng toan ki\u1EC1m?", "2. Nguy\xEAn nh\xE2n th\u1EF1c s\u1EF1 g\xE2y kh\xF3 th\u1EDF \u1EDF b\u1EC7nh nh\xE2n n\xE0y l\xE0 g\xEC?", "3. Ph\u01B0\u01A1ng ph\xE1p n\xE0o hi\u1EC7u qu\u1EA3 nh\u1EA5t \u0111\u1EC3 c\u1EA3i thi\u1EC7n l\u01B0\u1EE3ng oxy cung c\u1EA5p cho m\xF4?"], answers: { gasExchange: "Trao \u0111\u1ED5i kh\xED t\u1EA1i m\xE0ng ph\u1EBF nang mao m\u1EA1ch ho\xE0n to\xE0n b\xECnh th\u01B0\u1EDDng (PaO2 89 mmHg, SaO2 99.8%). C\xF3 t\u0103ng th\xF4ng kh\xED ph\u1EBF nang (PaCO2 25 mmHg).", acidBase: "Ki\u1EC1m h\xF4 h\u1EA5p c\u1EA5p t\xEDnh ch\u01B0a b\xF9 tr\u1EEB do th\u1EDF nhanh ph\u1EA3n x\u1EA1.", differentialDiagnosis: "Thi\u1EBFu m\xE1u thi\u1EBFu s\u1EAFt n\u1EB7ng (Severe Anemia) v\u1EDBi Hb = 6.8 g/dL.", clinicalAction: "TRUY\u1EC0N KH\u1ED0I H\u1ED2NG C\u1EA6U C\u1EA4P C\u1EE8U! Cho th\u1EDF th\xEAm oxy h\u1EA7u nh\u01B0 kh\xF4ng c\xF3 t\xE1c d\u1EE5ng, v\xEC l\u01B0\u1EE3ng Hemoglobin c\xF2n l\u1EA1i \u0111\xE3 b\xE3o h\xF2a 100% oxy (SaO2 99.8%), kh\xF4ng th\u1EC3 mang th\xEAm ph\xE2n t\u1EED oxy n\xE0o n\u1EEFa. C\xF4ng th\u1EE9c t\xEDnh l\u01B0\u1EE3ng oxy trong m\xE1u (CaO2) = (1.34 x Hb x SaO2) + (0.003 x PaO2). Khi Hb gi\u1EA3m m\u1ED9t n\u1EEDa, kh\u1EA3 n\u0103ng v\u1EADn chuy\u1EC3n oxy gi\u1EA3m m\u1ED9t n\u1EEDa! B\xF9 d\u1ECBch c\u1EA7m ch\u1EEBng v\xE0 truy\u1EC1n m\xE1u.", physiologicalInsight: "M\u1ED9t b\xE0i h\u1ECDc l\xE2m s\xE0ng c\u01A1 b\u1EA3n: Kh\xED m\xE1u PaO2 v\xE0 SaO2 b\xECnh th\u01B0\u1EDDng KH\xD4NG C\xD3 NGH\u0128A l\xE0 oxy m\xF4 b\xECnh th\u01B0\u1EDDng. N\u1EBFu thi\u1EBFu ng\u01B0\u1EDDi v\u1EADn chuy\u1EC3n (Hemoglobin), m\xF4 v\u1EABn b\u1ECB ng\u1EA1t oxy." } }, { id: 17, source: "Hennessey & Japp (Made Easy)", caseNumberDisplay: "Ca 17 (Hennessey)", title: "Nh\u1ED3i m\xE1u m\u1EA1c treo: Toan Lactic \u1EA9n m\xECnh sau \u0111au b\u1EE5ng", patientProfile: "N\u1EEF 78 tu\u1ED5i, rung nh\u0129 u\u1ED1ng digoxin/aspirin, \u0111au b\u1EE5ng d\u1EEF d\u1ED9i t\u1EEBng c\u01A1n nh\u01B0ng kh\xE1m b\u1EE5ng m\u1EC1m", categoryTag: "C\u1EA5p c\u1EE9u b\u1EE5ng ngo\u1EA1i khoa", difficulty: "N\xE2ng cao", history: "C\u1EE5 b\xE0 78 tu\u1ED5i, ti\u1EC1n s\u1EED rung nh\u0129, \u0111\u1ED9t ng\u1ED9t \u0111au b\u1EE5ng d\u1EEF d\u1ED9i quanh r\u1ED1n kh\xF4ng lan, kh\xF4ng n\xF4n, kh\xF4ng ti\xEAu ch\u1EA3y. \u0110au qu\u1EB1n qu\u1EA1i nh\u01B0ng kh\xE1m b\u1EE5ng l\u1EA1i m\u1EC1m m\u1EA1i, ch\u1EC9 t\u1EE9c nh\u1EB9 khi \u1EA5n s\xE2u.", examination: { vitals: { pulse: "110 l\u1EA7n/ph\xFAt (lo\u1EA1n nh\u1ECBp ho\xE0n to\xE0n)", rr: "24 l\u1EA7n/ph\xFAt", bp: "135/75 mmHg", temp: "37.1\xB0C", spo2: "99% (\u0111ang th\u1EDF oxy mask 10L)", fio2: "40%" }, findings: "B\u1EC7nh nh\xE2n \u0111au \u0111\u1EDBn d\u1EEF d\u1ED9i, k\xEAu la kh\xF4ng t\u01B0\u01A1ng x\u1EE9ng v\u1EDBi kh\xE1m b\u1EE5ng (b\u1EE5ng m\u1EC1m, kh\xF4ng ph\u1EA3n \u1EE9ng th\xE0nh b\u1EE5ng, X-quang b\u1EE5ng kh\xF4ng li\u1EC1m h\u01A1i)." }, abg: { unit: "kPa", pH: 7.28, pCO2: 4.39, pO2: 28.6, hco3: 16.2, be: -10.4, sao2: 99.8, fio2: 40, na: 135, k: 4.6, cl: 96, lactate: 3.2, glucose: 3.8, patientAge: 78 }, questions: ["1. M\xF4 t\u1EA3 trao \u0111\u1ED5i kh\xED v\xE0 th\u0103ng b\u1EB1ng toan ki\u1EC1m?", "2. Ch\u1EA9n \u0111o\xE1n c\u1EA5p c\u1EE9u ngo\u1EA1i khoa nguy hi\u1EC3m c\u1EA7n ngh\u0129 t\u1EDBi ngay?", "3. Ngu\u1ED3n g\u1ED1c sinh ra acid lactic \u1EDF ca b\u1EC7nh n\xE0y l\xE0 t\u1EEB \u0111\xE2u?"], answers: { gasExchange: "Oxy h\xF3a m\xE1u t\u1ED1t tr\xEAn FiO2 40% (PaO2 215 mmHg). T\u0103ng th\xF4ng kh\xED th\u1EE9 ph\xE1t (PaCO2 33 mmHg) \u0111\u1EC3 b\xF9 tr\u1EEB toan m\xE1u.", acidBase: "Toan chuy\u1EC3n h\xF3a t\u0103ng Anion Gap b\xF9 tr\u1EEB b\xE1n ph\u1EA7n (pH 7.28, HCO3- 16.2 mmol/L, BE -10.4 mmol/L). Anion Gap = 135 - (96 + 16.2) = 22.8 mmol/L.", differentialDiagnosis: "Thi\u1EBFu m\xE1u c\u1EE5c b\u1ED9 m\u1EA1c treo c\u1EA5p / Nh\u1ED3i m\xE1u m\u1EA1c treo (Acute Mesenteric Ischaemia) do huy\u1EBFt kh\u1ED1i t\u1EEB t\xE2m nh\u0129 b\u1EAFn \u0111i.", clinicalAction: 'Ngu\u1ED3n acid lactic (3.2 mmol/L) ch\xEDnh l\xE0 QUAI RU\u1ED8T \u0110ANG B\u1ECA THI\u1EBEU M\xC1U HO\u1EA0I T\u1EEC! D\u1EA5u hi\u1EC7u kinh \u0111i\u1EC3n: "\u0110au b\u1EE5ng d\u1EEF d\u1ED9i kh\xF4ng t\u01B0\u01A1ng x\u1EE9ng v\u1EDBi tri\u1EC7u ch\u1EE9ng th\u1EF1c th\u1EC3" k\xE8m toan Lactic m\xE1u \u1EDF b\u1EC7nh nh\xE2n rung nh\u0129 = Nh\u1ED3i m\xE1u m\u1EA1c treo cho t\u1EDBi khi c\xF3 b\u1EB1ng ch\u1EE9ng ng\u01B0\u1EE3c l\u1EA1i. X\u1EED tr\xED: Ch\u1EE5p CT m\u1EA1ch m\xE1u \u1ED5 b\u1EE5ng (CTA b\u1EE5ng) kh\u1EA9n c\u1EA5p v\xE0 h\u1ED9i ch\u1EA9n ph\u1EABu thu\u1EADt ngo\u1EA1i khoa m\u1EDF b\u1EE5ng c\u1EA5p c\u1EE9u ho\u1EB7c can thi\u1EC7p l\u1EA5y huy\u1EBFt kh\u1ED1i.', physiologicalInsight: "N\u1EBFu ch\u1EC9 \u0111\u1EE3i \u0111\u1EBFn khi b\u1EE5ng c\xF3 ph\u1EA3n \u1EE9ng th\xE0nh b\u1EE5ng g\u1ED3ng c\u1EE9ng, ru\u1ED9t \u0111\xE3 ho\u1EA1i t\u1EED th\u1EE7ng ho\xE0n to\xE0n v\xE0 t\u1EF7 l\u1EC7 t\u1EED vong > 80%. Kh\xED m\xE1u v\u1EDBi toan lactic l\xE0 manh m\u1ED1i s\u1EDBm duy nh\u1EA5t c\u1EE9u s\u1ED1ng b\u1EC7nh nh\xE2n!" } }, { id: 18, source: "Hennessey & Japp (Made Easy)", caseNumberDisplay: "Ca 18 (Hennessey)", title: "Nhi\u1EC5m toan Ceton \u0111\xE1i th\xE1o \u0111\u01B0\u1EDDng (DKA) n\u1EB7ng", patientProfile: "N\u1EEF 35 tu\u1ED5i, \u0110T\u0110 Type 1, n\xF4n \xF3i b\u1ECF ti\xEAm insulin 3 ng\xE0y, th\u1EDF Kussmaul s\xE2u ng\u1EAFt qu\xE3ng", categoryTag: "C\u1EA5p c\u1EE9u n\u1ED9i ti\u1EBFt / Toan chuy\u1EC3n h\xF3a", difficulty: "C\u1EA5p c\u1EE9u", history: "N\u1EEF 35 tu\u1ED5i, ti\u1EC1n s\u1EED \u0111\xE1i th\xE1o \u0111\u01B0\u1EDDng Type 1. Ba ng\xE0y nay b\u1ECB s\u1ED1t n\xF4n \xF3i \u0103n u\u1ED1ng k\xE9m, s\u1EE3 h\u1EA1 \u0111\u01B0\u1EDDng huy\u1EBFt n\xEAn t\u1EF1 \xFD ng\u01B0ng ch\xEDch insulin. Ng\u01B0\u1EDDi nh\xE0 ph\xE1t hi\u1EC7n l\u01A1 m\u01A1, mi\u1EC7ng s\u1EF1c m\xF9i t\xE1o ch\xEDn (m\xF9i acetone).", examination: { vitals: { pulse: "130 l\u1EA7n/ph\xFAt", rr: "26 l\u1EA7n/ph\xFAt (th\u1EDF s\xE2u Kussmaul)", bp: "100/60 mmHg", temp: "36.8\xB0C", spo2: "99% (th\u1EDF oxy mask 10L)", fio2: "60%" }, findings: "Tri gi\xE1c l\u01A1 m\u01A1 (GCS 12 \u0111i\u1EC3m), m\u1EAFt tr\u0169ng, ni\xEAm m\u1EA1c mi\u1EC7ng kh\xF4 kh\u1ED1c, v\xE9o da m\u1EA5t r\u1EA5t ch\u1EADm. Th\u1EDF nhanh s\xE2u ki\u1EC3u Kussmaul." }, abg: { unit: "kPa", pH: 7.05, pCO2: 1.5, pO2: 28.4, hco3: 6, be: -25.2, sao2: 99.8, fio2: 60, na: 141, k: 4.6, cl: 96, lactate: 1, glucose: 35, patientAge: 35 }, questions: ["1. M\xF4 t\u1EA3 trao \u0111\u1ED5i kh\xED v\xE0 th\u0103ng b\u1EB1ng toan ki\u1EC1m?", "2. T\xEDnh kho\u1EA3ng tr\u1ED1ng Anion (Anion Gap)?", "3. Ch\u1EA9n \u0111o\xE1n x\xE1c \u0111\u1ECBnh v\xE0 c\xE1c tr\u1EE5 c\u1ED9t \u0111i\u1EC1u tr\u1ECB h\u1ED3i s\u1EE9c c\u1EA5p c\u1EE9u?"], answers: { gasExchange: "T\u0103ng th\xF4ng kh\xED ph\u1EBF nang th\u1EE9 ph\xE1t t\u1ED1i \u0111a (PaCO2 t\u1EE5t xu\u1ED1ng m\u1EE9c k\u1EF7 l\u1EE5c 11 mmHg / 1.5 kPa). Oxy h\xF3a m\xE1u \u0111\u01B0\u1EE3c b\u1EA3o t\u1ED3n.", acidBase: "Toan chuy\u1EC3n h\xF3a t\u0103ng kho\u1EA3ng tr\u1ED1ng Anion c\u1EF1c k\u1EF3 n\u1EB7ng, b\xF9 tr\u1EEB h\xF4 h\u1EA5p b\xE1n ph\u1EA7n (pH 7.05 toan m\xE1u \u0111e d\u1ECDa ng\u1EEBng tim, HCO3- 6.0 mmol/L, BE -25.2 mmol/L). Anion Gap = (141 + 4.6) - (96 + 6.0) = 43.6 mmol/L (chu\u1EA9n 10-18)!", differentialDiagnosis: "Nhi\u1EC5m toan Ceton do \u0110\xE1i th\xE1o \u0111\u01B0\u1EDDng m\u1EE9c \u0111\u1ED9 n\u1EB7ng (Severe Diabetic Ketoacidosis - DKA). Tam ch\u1EE9ng: \u0110\u01B0\u1EDDng huy\u1EBFt cao (35 mmol/L), Toan chuy\u1EC3n h\xF3a (pH < 7.3, HCO3 < 15), Ceton m\xE1u/n\u01B0\u1EDBc ti\u1EC3u d\u01B0\u01A1ng t\xEDnh.", clinicalAction: "Tr\u1EE5 c\u1ED9t h\u1ED3i s\u1EE9c DKA: 1. B\xF9 d\u1ECBch t\xEDch c\u1EF1c (NaCl 0.9% 1000ml trong gi\u1EDD \u0111\u1EA7u, b\xF9 4-6 l\xEDt trong 24h); 2. Truy\u1EC1n Insulin t\u0129nh m\u1EA1ch li\xEAn t\u1EE5c li\u1EC1u 0.1 UI/kg/gi\u1EDD (ch\u1EC9 b\u1EAFt \u0111\u1EA7u khi K+ > 3.3 mmol/L); 3. Theo d\xF5i s\xE1t v\xE0 b\xF9 Kali li\xEAn t\u1EE5c (khi truy\u1EC1n insulin, K+ s\u1EBD di chuy\u1EC3n \xE0o \u1EA1t v\xE0o n\u1ED9i b\xE0o g\xE2y h\u1EA1 kali t\u1EED vong); 4. C\xE2n nh\u1EAFc truy\u1EC1n Bicarbonate \u0111\u1EB3ng tr\u01B0\u01A1ng 1.4% th\u1EADn tr\u1ECDng v\xEC pH < 6.9-7.1; 5. Khi \u0111\u01B0\u1EDDng huy\u1EBFt h\u1EA1 xu\u1ED1ng < 14 mmol/L, \u0111\u1ED5i d\u1ECBch truy\u1EC1n sang Glucose 5% + NaCl 0.45% \u0111\u1EC3 tr\xE1nh h\u1EA1 \u0111\u01B0\u1EDDng huy\u1EBFt trong khi ti\u1EBFp t\u1EE5c truy\u1EC1n insulin d\u1EADp t\u1EAFt ceton.", physiologicalInsight: "B\u1EC7nh nh\xE2n \u0111ang th\u1EDF Kussmaul c\u1EADt l\u1EF1c \u0111\u1EA9y PaCO2 xu\u1ED1ng t\u1EADn 11 mmHg (b\xF9 tr\u1EEB h\xF4 h\u1EA5p g\u1EA7n nh\u01B0 t\u1ED1i \u0111a), nh\u01B0ng l\u01B0\u1EE3ng th\u1EC3 ceton (Acetoacetate, Beta-hydroxybutyrate) qu\xE1 kh\u1ED5ng l\u1ED3 \u0111\xE3 \u0111\xE8 b\u1EB9p ho\xE0n to\xE0n h\u1EC7 \u0111\u1EC7m khi\u1EBFn pH t\u1EE5t xu\u1ED1ng 7.05. N\u1EBFu b\u1EC7nh nh\xE2n m\u1EC7t m\u1ECFi gi\u1EA3m th\u1EDF, pH s\u1EBD r\u01A1i xu\u1ED1ng < 6.8 g\xE2y ng\u1EEBng tim ngay t\u1EE9c kh\u1EAFc." } }, { id: 20, source: "Hennessey & Japp (Made Easy)", caseNumberDisplay: "Ca 20 (Hennessey)", title: "Toan h\xF3a \u1ED1ng th\u1EADn Type 1 (RTA 1): Toan chuy\u1EC3n h\xF3a kho\u1EA3ng tr\u1ED1ng Anion b\xECnh th\u01B0\u1EDDng", patientProfile: "Nam 52 tu\u1ED5i, ti\u1EC1n s\u1EED s\u1ECFi th\u1EADn c\u1EA3n quang t\xE1i ph\xE1t nhi\u1EC1u \u0111\u1EE3t, m\u1EC7t m\u1ECFi u\u1EC3 o\u1EA3i", categoryTag: "B\u1EC7nh th\u1EADn / Toan chuy\u1EC3n h\xF3a", difficulty: "Trung b\xECnh", history: "Nam 52 tu\u1ED5i, kh\xE1m t\u1EA1i khoa ni\u1EC7u v\xEC s\u1ECFi th\u1EADn canxi t\xE1i ph\xE1t nhi\u1EC1u l\u1EA7n. Th\u01B0\u1EDDng xuy\xEAn m\u1EC7t m\u1ECFi, y\u1EBFu c\u01A1 chi d\u01B0\u1EDBi. Kh\xF4ng ti\xEAu ch\u1EA3y, kh\xF4ng d\xF9ng thu\u1ED1c l\u1EE3i ti\u1EC3u.", examination: { vitals: { pulse: "74 l\u1EA7n/ph\xFAt", rr: "16 l\u1EA7n/ph\xFAt", bp: "120/75 mmHg", temp: "36.7\xB0C", spo2: "99% (kh\xED tr\u1EDDi)", fio2: "21%" }, findings: "To\xE0n tr\u1EA1ng b\xECnh th\u01B0\u1EDDng, kh\xF4ng ph\xF9, kh\xE1m b\u1EE5ng kh\xF4ng c\xF3 \u0111i\u1EC3m \u0111au ni\u1EC7u qu\u1EA3n." }, abg: { unit: "kPa", pH: 7.37, pCO2: 4.2, pO2: 13.2, hco3: 18, be: -7, sao2: 99, fio2: 21, na: 137, k: 3, cl: 109, lactate: 1, glucose: 4, patientAge: 52 }, questions: ["1. M\xF4 t\u1EA3 trao \u0111\u1ED5i kh\xED v\xE0 th\u0103ng b\u1EB1ng toan ki\u1EC1m?", "2. T\xEDnh kho\u1EA3ng tr\u1ED1ng Anion (Anion Gap)?", "3. Ch\u1EA9n \u0111o\xE1n nguy\xEAn nh\xE2n ph\xF9 h\u1EE3p nh\u1EA5t?"], answers: { gasExchange: "Trao \u0111\u1ED5i kh\xED b\xECnh th\u01B0\u1EDDng. T\u0103ng th\xF4ng kh\xED nh\u1EB9 (PaCO2 31.5 mmHg) b\xF9 tr\u1EEB cho toan.", acidBase: "Toan chuy\u1EC3n h\xF3a kho\u1EA3ng tr\u1ED1ng Anion B\xCCNH TH\u01AF\u1EDCNG b\xF9 tr\u1EEB ho\xE0n to\xE0n (pH 7.37, HCO3- 18.0 mmol/L). Anion Gap = (137 + 3.0) - (109 + 18.0) = 13.0 mmol/L (n\u1EB1m tr\u1ECDn trong gi\u1EDBi h\u1EA1n b\xECnh th\u01B0\u1EDDng 10-18 mmol/L)!", differentialDiagnosis: "Toan h\xF3a \u1ED1ng th\u1EADn xa Type 1 (Distal Renal Tubular Acidosis - Type 1 RTA). \u0110\u1EB7c tr\u01B0ng b\u1EDFi: Toan chuy\u1EC3n h\xF3a t\u0103ng Clo m\xE1u (Hyperchloraemic Metabolic Acidosis), h\u1EA1 Kali m\xE1u (K 3.0 mmol/L) v\xE0 s\u1ECFi th\u1EADn Calci phosphate.", clinicalAction: "B\u1ED5 sung Bicarbonate ho\u1EB7c Citrate \u0111\u01B0\u1EDDng u\u1ED1ng (Shohl solution), k\u1EBFt h\u1EE3p b\xF9 Kali (Potassium citrate). Ki\u1EC1m h\xF3a n\u01B0\u1EDBc ti\u1EC3u gi\xFAp h\xF2a tan calci v\xE0 b\u1EA3o t\u1ED3n ch\u1EE9c n\u0103ng th\u1EADn.", physiologicalInsight: "Trong Type 1 RTA, \u1ED1ng l\u01B0\u1EE3n xa kh\xF4ng th\u1EC3 b\xE0i ti\u1EBFt ion H+ v\xE0o n\u01B0\u1EDBc ti\u1EC3u. \u0110\u1EC3 t\xE1i h\u1EA5p thu Na+, th\u1EADn bu\u1ED9c ph\u1EA3i b\xE0i ti\u1EBFt K+ (d\u1EABn \u0111\u1EBFn h\u1EA1 Kali) v\xE0 gi\u1EEF l\u1EA1i Cl- (d\u1EABn \u0111\u1EBFn t\u0103ng Clo m\xE1u \u0111\u1EC3 b\u1EA3o to\xE0n t\xEDnh trung h\xF2a \u0111i\u1EC7n t\xEDch). V\xEC Cl- l\xE0 anion \u0111\u01B0\u1EE3c \u0111o tr\u1EF1c ti\u1EBFp trong c\xF4ng th\u1EE9c, Anion Gap ho\xE0n to\xE0n kh\xF4ng t\u0103ng!" } }, { id: 21, source: "Hennessey & Japp (Made Easy)", caseNumberDisplay: "Ca 21 (Hennessey)", title: "Ng\u1ED9 \u0111\u1ED9c Aspirin (Salicylate): R\u1ED1i lo\u1EA1n h\u1ED7n h\u1EE3p kinh \u0111i\u1EC3n", patientProfile: "N\u1EEF 18 tu\u1ED5i, u\u1ED1ng qu\xE1 li\u1EC1u thu\u1ED1c gi\u1EA3m \u0111au 5 gi\u1EDD tr\u01B0\u1EDBc, \xF9 tai, bu\u1ED3n n\xF4n, th\u1EDF nhanh s\xE2u", categoryTag: "Ng\u1ED9 \u0111\u1ED9c / C\u1EA5p c\u1EE9u", difficulty: "N\xE2ng cao", history: "Thi\u1EBFu n\u1EEF 18 tu\u1ED5i u\u1ED1ng m\u1ED9t l\u01B0\u1EE3ng l\u1EDBn thu\u1ED1c kh\xF4ng r\xF5 lo\u1EA1i c\xE1ch 5 gi\u1EDD. V\xE0o vi\u1EC7n than bu\u1ED3n n\xF4n v\xE0 nghe th\u1EA5y ti\u1EBFng ve k\xEAu r\xEDu r\xEDt trong tai (\xF9 tai - tinnitus), l\u01A1 m\u01A1 nh\u1EB9.", examination: { vitals: { pulse: "100 l\u1EA7n/ph\xFAt", rr: "26 l\u1EA7n/ph\xFAt (th\u1EDF nhanh s\xE2u)", bp: "132/100 mmHg", temp: "37.6\xB0C", spo2: "99% (kh\xED tr\u1EDDi)", fio2: "21%" }, findings: "B\u1EC7nh nh\xE2n b\u1EE9t r\u1EE9t, th\u1EDF nhanh s\xE2u. Kh\xE1m tim ph\u1ED5i b\xECnh th\u01B0\u1EDDng." }, abg: { unit: "kPa", pH: 7.41, pCO2: 3.01, pO2: 14.1, hco3: 17.6, be: -8.3, sao2: 99, fio2: 21, na: 140, k: 3.6, cl: 99, lactate: 1.4, glucose: 5, patientAge: 18 }, questions: ["1. Nh\xECn v\xE0o pH 7.41 b\xECnh th\u01B0\u1EDDng, b\u1EC7nh nh\xE2n c\xF3 r\u1ED1i lo\u1EA1n ki\u1EC1m toan kh\xF4ng?", "2. T\xEDnh kho\u1EA3ng tr\u1ED1ng Anion?", "3. Ho\u1EA1t ch\u1EA5t g\xE2y ng\u1ED9 \u0111\u1ED9c nhi\u1EC1u kh\u1EA3 n\u0103ng nh\u1EA5t v\xE0 c\u01A1 ch\u1EBF sinh l\xFD b\u1EC7nh?"], answers: { gasExchange: "T\u0103ng th\xF4ng kh\xED ph\u1EBF nang r\xF5 r\u1EC7t (PaCO2 22.6 mmHg). Oxy h\xF3a m\xE1u b\xECnh th\u01B0\u1EDDng.", acidBase: "R\u1ED0I LO\u1EA0N TOAN KI\u1EC0M H\u1ED6N H\u1EE2P: Ki\u1EC1m h\xF4 h\u1EA5p ti\xEAn ph\xE1t PH\u1ED0I H\u1EE2P Toan chuy\u1EC3n h\xF3a t\u0103ng Anion Gap ti\xEAn ph\xE1t (Mixed Respiratory Alkalosis and High Anion Gap Metabolic Acidosis). pH 7.41 l\xE0 do hai r\u1ED1i lo\u1EA1n \u0111\u1ED1i kh\xE1ng nhau c\xF9ng l\xFAc!", differentialDiagnosis: "Ng\u1ED9 \u0111\u1ED9c c\u1EA5p Salicylate / Aspirin (Aspirin Poisoning). Anion Gap = (140 + 3.6) - (99 + 17.6) = 27 mmol/L (t\u0103ng cao).", clinicalAction: "\u0110\u1ECBnh l\u01B0\u1EE3ng n\u1ED3ng \u0111\u1ED9 Salicylate m\xE1u kh\u1EA9n c\u1EA5p. Ph\xE1c \u0111\u1ED3 x\u1EED tr\xED: 1. Ki\u1EC1m h\xF3a n\u01B0\u1EDBc ti\u1EC3u b\u1EB1ng Natri Bicarbonate 8.4% truy\u1EC1n t\u0129nh m\u1EA1ch m\u1EE5c ti\xEAu pH n\u01B0\u1EDBc ti\u1EC3u 7.5 - 8.5 (gi\xFAp ion h\xF3a salicylate ng\u0103n t\xE1i h\u1EA5p thu \u1EDF \u1ED1ng th\u1EADn v\xE0 t\u0103ng b\xE0i ti\u1EBFt); 2. B\xF9 d\u1ECBch v\xE0 theo d\xF5i s\xE1t Kali; 3. Ch\u1EC9 \u0111\u1ECBnh l\u1ECDc m\xE1u th\u1EADn nh\xE2n t\u1EA1o ng\u1EAFt qu\xE3ng (HD) n\u1EBFu n\u1ED3ng \u0111\u1ED9 salicylate > 100 mg/dL ho\u1EB7c toan m\xE1u n\u1EB7ng tr\u01A1, suy th\u1EADn, ph\xF9 ph\u1ED5i.", physiologicalInsight: "Aspirin t\xE1c \u0111\u1ED9ng qua 2 c\u01A1 ch\u1EBF \u0111\u1ED9c l\u1EADp: M\u1ED9t m\u1EB7t, Salicylate k\xEDch th\xEDch tr\u1EF1c ti\u1EBFp trung t\xE2m h\xF4 h\u1EA5p \u1EDF h\xE0nh t\u1EE7y g\xE2y th\u1EDF nhanh s\xE2u d\u1EABn \u0111\u1EBFn Ki\u1EC1m h\xF4 h\u1EA5p nguy\xEAn ph\xE1t. M\u1EB7t kh\xE1c, b\u1EA3n th\xE2n Salicylate l\xE0 acid h\u1EEFu c\u01A1, \u0111\u1ED3ng th\u1EDDi \u1EE9c ch\u1EBF chu\u1ED7i h\xF4 h\u1EA5p t\u1EBF b\xE0o (uncoupling oxidative phosphorylation) l\xE0m t\xEDch t\u1EE5 acid lactic v\xE0 acid h\u1EEFu c\u01A1 g\xE2y Toan chuy\u1EC3n h\xF3a t\u0103ng Anion Gap nguy\xEAn ph\xE1t!" } }, { id: 22, source: "Hennessey & Japp (Made Easy)", caseNumberDisplay: "Ca 22 (Hennessey)", title: "S\u1ED1c nhi\u1EC5m khu\u1EA9n \u0111\u01B0\u1EDDng ni\u1EC7u: Lactate l\xE0 ch\u1EC9 s\u1ED1 s\u1ED1ng c\xF2n", patientProfile: "N\u1EEF 64 tu\u1ED5i, s\u1ED1t 39.8\xB0C, m\u1EA1ch 122 sau th\u1EE7 thu\u1EADt can thi\u1EC7p \u0111\u01B0\u1EDDng ti\u1EBFt ni\u1EC7u 48h", categoryTag: "S\u1ED1c / Nhi\u1EC5m tr\xF9ng huy\u1EBFt", difficulty: "C\u1EA5p c\u1EE9u", history: "N\u1EEF 64 tu\u1ED5i, sau t\xE1n s\u1ECFi n\u1ED9i soi 48 gi\u1EDD xu\u1EA5t hi\u1EC7n r\xE9t run, s\u1ED1t cao 39.8\xB0C, t\u1EE5t huy\u1EBFt \xE1p d\u1EA7n, n\u01B0\u1EDBc ti\u1EC3u \xEDt trong 4 gi\u1EDD qua.", examination: { vitals: { pulse: "122 l\u1EA7n/ph\xFAt (nhanh xoang)", rr: "26 l\u1EA7n/ph\xFAt", bp: "100/65 mmHg", temp: "39.8\xB0C", spo2: "100% (th\u1EDF oxy mask 10L)", fio2: "60%" }, findings: "Da \u0111\u1ECF n\xF3ng v\xE3 m\u1ED3 h\xF4i, th\u1EDDi gian \u0111\u1ED5 \u0111\u1EA7y mao m\u1EA1ch (CRT) k\xE9o d\xE0i > 3 gi\xE2y. C-reactive protein v\u1ECDt l\xEAn 267 mg/L." }, abg: { unit: "kPa", pH: 7.36, pCO2: 4.2, pO2: 27.1, hco3: 17.3, be: -6.9, sao2: 100, fio2: 60, na: 140, k: 4.1, cl: 101, lactate: 5.1, glucose: 6.8, patientAge: 64 }, questions: ["1. M\xF4 t\u1EA3 trao \u0111\u1ED5i kh\xED v\xE0 th\u0103ng b\u1EB1ng ki\u1EC1m toan?", "2. Gi\xE1 tr\u1ECB n\xE0o tr\xEAn kh\xED m\xE1u mang \xFD ngh\u0129a ti\xEAn l\u01B0\u1EE3ng s\u1ED1ng c\xF2n quan tr\u1ECDng nh\u1EA5t?", "3. Ph\xE1c \u0111\u1ED3 x\u1EED tr\xED kh\u1EA9n c\u1EA5p gi\u1EDD \u0111\u1EA7u (Surviving Sepsis Campaign bundle)?"], answers: { gasExchange: "T\u0103ng th\xF4ng kh\xED th\u1EE9 ph\xE1t b\xF9 tr\u1EEB toan (PaCO2 31.5 mmHg). Oxy h\xF3a m\xE1u \u0111\u1EA1t \u0111\u01B0\u1EE3c nh\u1EDD mask oxy 10L.", acidBase: "Toan chuy\u1EC3n h\xF3a t\u0103ng Anion Gap c\xF3 b\xF9 tr\u1EEB h\xF4 h\u1EA5p ho\xE0n to\xE0n (pH 7.36, HCO3- 17.3 mmol/L). Anion Gap = (140 + 4.1) - (101 + 17.3) = 25.8 mmol/L.", differentialDiagnosis: "Nhi\u1EC5m khu\u1EA9n huy\u1EBFt / S\u1ED1c nhi\u1EC5m khu\u1EA9n \u0111\u01B0\u1EDDng v\xE0o t\u1EEB h\u1EC7 ti\u1EBFt ni\u1EC7u (Urosepsis).", clinicalAction: "CH\u1EC8 S\u1ED0 TI\xCAN L\u01AF\u1EE2NG QUAN TR\u1ECCNG NH\u1EA4T L\xC0 LACTATE = 5.1 mmol/L! D\xF9 huy\u1EBFt \xE1p t\xE2m thu c\xF2n 100 mmHg ch\u01B0a t\u1EE5t s\xE2u, Lactate > 4 mmol/L ch\u1EE9ng minh c\xF3 t\xECnh tr\u1EA1ng thi\u1EBFu m\xE1u nu\xF4i m\xF4 vi tu\u1EA7n ho\xE0n nghi\xEAm tr\u1ECDng (t\u1EF7 l\u1EC7 t\u1EED vong t\u1EDBi 30%). Ph\xE1c \u0111\u1ED3 Sepsis Bundle: 1. C\u1EA5y m\xE1u tr\u01B0\u1EDBc khi d\xF9ng kh\xE1ng sinh; 2. Kh\xE1ng sinh ph\u1ED5 r\u1ED9ng \u0111\u01B0\u1EDDng t\u0129nh m\u1EA1ch trong v\xF2ng 1 gi\u1EDD; 3. B\xF9 d\u1ECBch tinh th\u1EC3 \u0111\u1EB3ng tr\u01B0\u01A1ng 30ml/kg trong 3 gi\u1EDD \u0111\u1EA7u; 4. D\xF9ng v\u1EADn m\u1EA1ch Noradrenaline n\u1EBFu HA trung b\xECnh MAP < 65 mmHg sau b\xF9 d\u1ECBch; 5. \u0110o l\u1EA1i lactate sau 2-4 gi\u1EDD \u0111\u1EC3 \u0111\xE1nh gi\xE1 \u0111\u1ED9 thanh th\u1EA3i.", physiologicalInsight: "S\u1EF1 gi\xE3n m\u1EA1ch v\xE0 tho\xE1t qu\u1EA3n do c\u01A1n b\xE3o cytokine l\xE0m s\u1EE5t gi\u1EA3m l\u01B0u l\u01B0\u1EE3ng m\xE1u hi\u1EC7u d\u1EE5ng \u0111\u1EBFn c\xE1c c\u01A1 quan. C\xE1c m\xF4 bu\u1ED9c ph\u1EA3i chuy\u1EC3n sang chuy\u1EC3n h\xF3a k\u1EF5 kh\xED sinh ra acid lactic \xE0o \u1EA1t." } }, { id: 26, source: "Hennessey & Japp (Made Easy)", caseNumberDisplay: "Ca 26 (Hennessey)", title: "N\xF4n \xF3i li\xEAn t\u1EE5c 3 ng\xE0y: Ki\u1EC1m chuy\u1EC3n h\xF3a gi\u1EA3m Clo & Kali", patientProfile: "N\u1EEF 35 tu\u1ED5i, n\xF4n \xF3i d\u1EEF d\u1ED9i k\xE9o d\xE0i sau m\u1ED5 tri\u1EC7t s\u1EA3n, kh\xF4ng \u0111\u01B0\u1EE3c truy\u1EC1n d\u1ECBch b\xF9 ph\u1EE5", categoryTag: "Ki\u1EC1m chuy\u1EC3n h\xF3a", difficulty: "Trung b\xECnh", history: "N\u1EEF 35 tu\u1ED5i sau ph\u1EABu thu\u1EADt n\u1ED9i soi tri\u1EC7t s\u1EA3n xu\u1EA5t hi\u1EC7n h\u1ED9i ch\u1EE9ng n\xF4n d\u1EEF d\u1ED9i k\xE9o d\xE0i 3 ng\xE0y. B\u1EA3ng theo d\xF5i d\u1ECBch v\xE0o ra cho th\u1EA5y m\u1EA5t d\u1ECBch l\u1EDBn nh\u01B0ng kh\xF4ng \u0111\u01B0\u1EE3c k\xEA \u0111\u01A1n truy\u1EC1n b\xF9 d\u1ECBch.", examination: { vitals: { pulse: "100 l\u1EA7n/ph\xFAt", rr: "10 l\u1EA7n/ph\xFAt (th\u1EDF ch\u1EADm)", bp: "160/100 mmHg", temp: "36.6\xB0C", spo2: "96% (kh\xED tr\u1EDDi)", fio2: "21%" }, findings: "D\u1EA5u hi\u1EC7u m\u1EA5t n\u01B0\u1EDBc r\xF5: v\xE9o da m\u1EA5t ch\u1EADm, m\xF4i l\u01B0\u1EE1i kh\xF4 kh\u1ED1c. Nh\u1ECBp th\u1EDF ch\u1EADm 10 l/p." }, abg: { unit: "kPa", pH: 7.44, pCO2: 6.4, pO2: 11.1, hco3: 32, be: 4, sao2: 96, fio2: 21, na: 133, k: 3, cl: 91, lactate: 1, glucose: 5, patientAge: 35 }, questions: ["1. M\xF4 t\u1EA3 trao \u0111\u1ED5i kh\xED v\xE0 th\u0103ng b\u1EB1ng toan ki\u1EC1m?", "2. B\u1EC7nh nh\xE2n c\xF3 nh\u1EEFng r\u1ED1i lo\u1EA1n \u0111i\u1EC7n gi\u1EA3i n\xE0o?", "3. Lo\u1EA1i d\u1ECBch truy\u1EC1n n\xE0o s\u1EBD s\u1EEDa ch\u1EEFa tri\u1EC7t \u0111\u1EC3 r\u1ED1i lo\u1EA1n toan ki\u1EC1m n\xE0y?"], answers: { gasExchange: "Suy h\xF4 h\u1EA5p Type 2 m\u1EE9c \u0111\u1ED9 nh\u1EB9 mang t\xEDnh b\xF9 tr\u1EEB (PaCO2 t\u0103ng l\xEAn 48 mmHg do trung t\xE2m h\xF4 h\u1EA5p h\xE3m nh\u1ECBp th\u1EDF xu\u1ED1ng 10 l/p \u0111\u1EC3 gi\u1EEF CO2). Oxy h\xF3a m\xE1u \u0111\u1EA1t y\xEAu c\u1EA7u.", acidBase: "Ki\u1EC1m chuy\u1EC3n h\xF3a b\xF9 tr\u1EEB ho\xE0n to\xE0n (pH 7.44 n\u1EB1m trong gi\u1EDBi h\u1EA1n 7.40-7.45, HCO3- t\u0103ng 32.0 mmol/L).", differentialDiagnosis: "Ki\u1EC1m chuy\u1EC3n h\xF3a \u0111\xE1p \u1EE9ng v\u1EDBi Clo (Chloride-responsive metabolic alkalosis) do n\xF4n m\u1EA5t d\u1ECBch v\u1ECB d\u1EA1 d\xE0y (HCl) v\xE0 m\u1EA5t d\u1ECBch \u0111\u1EB3ng tr\u01B0\u01A1ng.", clinicalAction: "R\u1ED1i lo\u1EA1n \u0111i\u1EC7n gi\u1EA3i: H\u1EA1 Kali (3.0 mmol/L), H\u1EA1 Clo (91 mmol/L), H\u1EA1 Natri nh\u1EB9 (133 mmol/L). D\u1ECACH TRUY\u1EC0N T\u1ED0I \u01AFU \u0110\u1EC2 \u0110I\u1EC0U CH\u1EC8NH: Dung d\u1ECBch Natri Clorid 0.9% (Normal Saline) k\u1EBFt h\u1EE3p b\u1ED5 sung Kali Clorid (KCl). Khi \u0111\u01B0\u1EE3c cung c\u1EA5p \u0111\u1EE7 Cl-, th\u1EADn s\u1EBD ng\u1EEBng gi\u1EEF HCO3- v\xE0 b\xE0i ti\u1EBFt bicarb ra n\u01B0\u1EDBc ti\u1EC3u, \u0111\u01B0a ki\u1EC1m chuy\u1EC3n h\xF3a v\u1EC1 b\xECnh th\u01B0\u1EDDng.", physiologicalInsight: "T\u1EA1i sao th\u1EADn kh\xF4ng t\u1EF1 \u0111\xE0o th\u1EA3i HCO3- d\u01B0 th\u1EEBa? V\xEC khi m\u1EA5t n\u01B0\u1EDBc v\xE0 gi\u1EA3m Clo tr\u1EA7m tr\u1ECDng, \u01B0u ti\xEAn s\u1ED1ng c\xF2n c\u1EE7a th\u1EADn l\xE0 gi\u1EEF Natri v\xE0 n\u01B0\u1EDBc. D\u01B0\u1EDBi t\xE1c d\u1EE5ng c\u1EE7a Aldosterone, Na+ \u0111\u01B0\u1EE3c gi\u1EEF l\u1EA1i \u1EDF \u1ED1ng th\u1EADn b\u1EB1ng c\xE1ch \u0111\xE0o th\u1EA3i K+ ho\u1EB7c H+. V\xEC K+ \u0111\xE3 b\u1ECB c\u1EA1n ki\u1EC7t, th\u1EADn b\u1EAFt bu\u1ED9c ph\u1EA3i th\u1EA3i H+ ra n\u01B0\u1EDBc ti\u1EC3u (ngh\u1ECBch l\xFD toan n\u01B0\u1EDBc ti\u1EC3u trong ki\u1EC1m m\xE1u), l\xE0m t\xECnh tr\u1EA1ng ki\u1EC1m chuy\u1EC3n h\xF3a c\xE0ng b\u1ECB duy tr\xEC!" } }, { id: 27, source: "Hennessey & Japp (Made Easy)", caseNumberDisplay: "Ca 27 (Hennessey)", title: "H\u1EB9p m\xF4n v\u1ECB ph\xEC \u0111\u1EA1i \u1EDF tr\u1EBB s\u01A1 sinh: Ki\u1EC1m chuy\u1EC3n h\xF3a n\u1EB7ng", patientProfile: "B\xE9 trai 8 tu\u1EA7n tu\u1ED5i, n\xF4n tr\u1EDB v\u1ECDt ra s\u1EEFa kh\xF4ng c\xF3 d\u1ECBch m\u1EADt, s\u1EDD th\u1EA5y kh\u1ED1i u m\xF4n v\u1ECB", categoryTag: "Nhi khoa / Ngo\u1EA1i khoa", difficulty: "N\xE2ng cao", history: "B\xE9 trai 8 tu\u1EA7n tu\u1ED5i, ti\u1EC1n s\u1EED sinh th\u01B0\u1EDDng \u0111\u1EE7 th\xE1ng. Hai tu\u1EA7n g\u1EA7n \u0111\xE2y n\xF4n tr\u1EDB v\u1ECDt sau m\u1ED7i b\u1EEFa b\xFA, s\u1EE5t c\xE2n nghi\xEAm tr\u1ECDng, kh\xF4ng s\u1ED1t, ph\xE2n \xEDt.", examination: { vitals: { pulse: "150 l\u1EA7n/ph\xFAt", rr: "24 l\u1EA7n/ph\xFAt", bp: "78/45 mmHg", temp: "36.8\xB0C", spo2: "99% (kh\xED tr\u1EDDi)", fio2: "21%" }, findings: "Tr\u1EBB qu\u1EA5y kh\xF3c, suy dinh d\u01B0\u1EE1ng, m\u1EAFt tr\u0169ng, th\xF3p l\xF5m. S\u1EDD th\u1EA5y kh\u1ED1i tr\xF2n ch\u1EAFc k\xEDch th\u01B0\u1EDBc b\u1EB1ng qu\u1EA3 \xF4-liu \u1EDF v\xF9ng th\u01B0\u1EE3ng v\u1ECB." }, abg: { unit: "kPa", pH: 7.54, pCO2: 6.1, pO2: 11.2, hco3: 37.5, be: 14, sao2: 99, fio2: 21, na: 135, k: 2.5, cl: 86, lactate: 1, glucose: 5.1, patientAge: 0.15 }, questions: ["1. M\xF4 t\u1EA3 trao \u0111\u1ED5i kh\xED v\xE0 th\u0103ng b\u1EB1ng toan ki\u1EC1m?", "2. So v\u1EDBi m\u1EE9c \u0111\u1ED9 ki\u1EC1m m\xE1u n\u1EB7ng (pH 7.54, HCO3 37.5), PaCO2 45.8 mmHg l\xE0 cao hay th\u1EA5p h\u01A1n k\u1EF3 v\u1ECDng?", "3. Ch\u1EA9n \u0111o\xE1n v\xE0 nguy\xEAn t\u1EAFc \u0111i\u1EC1u tr\u1ECB ngo\u1EA1i khoa?"], answers: { gasExchange: "Th\xF4ng kh\xED ph\u1EBF nang b\xF9 tr\u1EEB nh\u1EB9 (PaCO2 45.8 mmHg). Trao \u0111\u1ED5i kh\xED b\u1EA3o t\u1ED3n.", acidBase: "Ki\u1EC1m chuy\u1EC3n h\xF3a m\u1EA5t b\xF9 b\xE1n ph\u1EA7n m\u1EE9c \u0111\u1ED9 n\u1EB7ng (pH 7.54, HCO3- v\u1ECDt l\xEAn 37.5 mmol/L, BE +14 mmol/L).", differentialDiagnosis: "H\u1EB9p m\xF4n v\u1ECB ph\xEC \u0111\u1EA1i b\u1EA9m sinh (Infantile Hypertrophic Pyloric Stenosis).", clinicalAction: "PaCO2 45.8 mmHg l\xE0 TH\u1EA4P H\u01A0N K\u1EF2 V\u1ECCNG b\xF9 tr\u1EEB c\u1EE7a m\u1ED9t ca ki\u1EC1m m\xE1u n\u1EB7ng nh\u01B0 v\u1EADy! L\xFD do: Tr\u1EBB \u0111ang \u0111au \u0111\u1EDBn, m\u1EA5t n\u01B0\u1EDBc v\xE0 qu\u1EA5y kh\xF3c nhi\u1EC1u t\u1EA1o k\xEDch th\xEDch t\u0103ng th\xF4ng kh\xED ph\u1EA3n x\u1EA1, l\xE0m c\xF9n m\xF2n kh\u1EA3 n\u0103ng h\xE3m th\u1EDF gi\u1EEF CO2. NGUY\xCAN T\u1EAEC: TUY\u1EC6T \u0110\u1ED0I KH\xD4NG \u0110\u01AF\u1EE2C M\u1ED4 C\u1EA4P C\u1EE8U KHI CH\u01AFA HI\u1EC6U CH\u1EC8NH TOAN KI\u1EC0M! Tr\u1EBB s\u1EBD b\u1ECB ng\u01B0ng th\u1EDF sau m\u1ED5 d\u01B0\u1EDBi t\xE1c d\u1EE5ng c\u1EE7a thu\u1ED1c m\xEA n\u1EBFu ki\u1EC1m m\xE1u c\xF2n n\u1EB7ng. Ph\u1EA3i nh\u1ECBn b\xFA, truy\u1EC1n d\u1ECBch NaCl 0.9% + Glucose 5% + KCl 20-30 mEq/L cho t\u1EDBi khi Clo > 100, K+ > 3.5 v\xE0 HCO3 < 30 mmol/L m\u1EDBi ti\u1EBFn h\xE0nh ph\u1EABu thu\u1EADt m\u1EDF c\u01A1 m\xF4n v\u1ECB Ramstedt.", physiologicalInsight: "V\xEC v\u1ECB tr\xED t\u1EAFc n\u1EB1m \u1EDF m\xF4n v\u1ECB (tr\u01B0\u1EDBc t\xE1 tr\xE0ng), ch\u1EA5t n\xF4n ch\u1EC9 ch\u1EE9a d\u1ECBch v\u1ECB d\u1EA1 d\xE0y gi\xE0u HCl, kh\xF4ng h\u1EC1 c\xF3 d\u1ECBch m\u1EADt t\u1EE5y gi\xE0u ki\u1EC1m HCO3-. To\xE0n b\u1ED9 ion H+ v\xE0 Cl- b\u1ECB t\u1ED1ng s\u1EA1ch ra ngo\xE0i t\u1EA1o n\xEAn b\u1EE9c tranh ki\u1EC1m h\u1EA1 clo kinh \u0111i\u1EC3n." } }, { id: 29, source: "Hennessey & Japp (Made Easy)", caseNumberDisplay: "Ca 29 (Hennessey)", title: "L\u1EA5y nh\u1EA7m m\xE1u t\u0129nh m\u1EA1ch (VBG): C\u1EA1m b\u1EABy l\xE2m s\xE0ng th\u01B0\u1EDDng g\u1EB7p", patientProfile: "S\u1EA3n ph\u1EE5 36 tu\u1ED5i mang thai tu\u1EA7n 34, c\u1EA3m gi\xE1c kh\xF3 th\u1EDF c\u01A1 n\u0103ng, l\xE2m s\xE0ng ho\xE0n to\xE0n kh\u1ECFe m\u1EA1nh", categoryTag: "C\u1EA1m b\u1EABy l\xE2m s\xE0ng / VBG", difficulty: "C\u01A1 b\u1EA3n", history: "S\u1EA3n ph\u1EE5 36 tu\u1ED5i mang thai 34 tu\u1EA7n, than phi\u1EC1n h\u1EE5t h\u01A1i khi leo c\u1EA7u thang. B\xE1c s\u0129 n\u1ED9i tr\xFA l\u1EA5y kh\xED m\xE1u \u0111\u1ED9ng m\u1EA1ch quay. K\u1EBFt qu\u1EA3 tr\u1EA3 v\u1EC1 khi\u1EBFn c\u1EA3 tua tr\u1EF1c ho\u1EA3ng h\u1ED1t: PaO2 ch\u1EC9 c\xF3 35 mmHg!", examination: { vitals: { pulse: "110 l\u1EA7n/ph\xFAt", rr: "20 l\u1EA7n/ph\xFAt", bp: "112/70 mmHg", temp: "36.6\xB0C", spo2: "99% (kh\xED tr\u1EDDi)", fio2: "21%" }, findings: "S\u1EA3n ph\u1EE5 t\u1EC9nh t\xE1o, da d\u1EBB h\u1ED3ng h\xE0o, n\xF3i chuy\u1EC7n l\u01B0u lo\xE1t, kh\xF4ng c\xF3 b\u1EA5t k\u1EF3 d\u1EA5u hi\u1EC7u suy h\xF4 h\u1EA5p hay co k\xE9o c\u01A1 h\xF4 h\u1EA5p n\xE0o. Kh\xE1m ph\u1ED5i b\xECnh th\u01B0\u1EDDng." }, abg: { unit: "kPa", pH: 7.45, pCO2: 4.9, pO2: 4.7, hco3: 24, be: 2, sao2: 74, fio2: 21, na: 138, k: 3.6, cl: 104, lactate: 1, glucose: 5, patientAge: 36, isVenousSample: true }, questions: ["1. K\u1EBFt qu\u1EA3 kh\xED m\xE1u th\u1EC3 hi\u1EC7n b\u1EC7nh l\xFD g\xEC tr\xEAn gi\u1EA5y?", "2. \u0110i\u1EC1u g\xEC b\u1EA5t th\u01B0\u1EDDng v\xE0 gi\u1EA3i th\xEDch h\u1EE3p l\xFD nh\u1EA5t cho s\u1EF1 m\xE2u thu\u1EABn n\xE0y?", "3. C\xE1c d\u1EA5u hi\u1EC7u nh\u1EADn bi\u1EBFt l\u1EA5y nh\u1EA7m m\xE1u t\u0129nh m\u1EA1ch l\xFAc \u0111\xE2m kim?"], answers: { gasExchange: "Tr\xEAn gi\u1EA5y t\u1EDD: Th\u1EC3 hi\u1EC7n m\u1ED9t t\xECnh tr\u1EA1ng Suy h\xF4 h\u1EA5p Type 1 c\u1EF1c k\u1EF3 nguy k\u1ECBch (PaO2 35 mmHg, SaO2 74% - \u0111e d\u1ECDa ng\u1EEBng tim). Nh\u01B0ng l\xE2m s\xE0ng b\u1EC7nh nh\xE2n ho\xE0n to\xE0n b\xECnh th\u01B0\u1EDDng!", acidBase: "Th\u0103ng b\u1EB1ng toan ki\u1EC1m b\xECnh th\u01B0\u1EDDng (pH 7.45, HCO3 24).", differentialDiagnosis: "M\u1EAAU M\xC1U \u0110\xC3 B\u1ECA CH\u1ECCC NH\u1EA6M V\xC0O T\u0128NH M\u1EA0CH (Venous Blood Gas - VBG) ch\u1EE9 kh\xF4ng ph\u1EA3i m\xE1u \u0111\u1ED9ng m\u1EA1ch!", clinicalAction: "KH\xD4NG \u0110\u01AF\u1EE2C HO\u1EA2NG LO\u1EA0N \u0110\u1EB6T N\u1ED8I KH\xCD QU\u1EA2N! S\u1EF1 ch\xEAnh l\u1EC7ch qu\xE1 l\u1EDBn gi\u1EEFa SpO2 m\xE1y k\u1EB9p (99%) v\xE0 SaO2 tr\xEAn m\xE1y kh\xED m\xE1u (74%) \u1EDF b\u1EC7nh nh\xE2n t\u1EC9nh t\xE1o h\u1ED3ng h\xE0o l\xE0 b\u1EB1ng ch\u1EE9ng r\xF5 nh\u1EA5t c\u1EE7a m\u1EABu m\xE1u t\u0129nh m\u1EA1ch. C\u1EA7n l\u1EA5y l\u1EA1i m\u1EABu kh\xED m\xE1u \u0111\u1ED9ng m\u1EA1ch chu\u1EA9n x\xE1c.", physiologicalInsight: "C\xE1c d\u1EA5u hi\u1EC7u nh\u1EADn bi\u1EBFt l\u1EA5y nh\u1EA7m m\xE1u t\u0129nh m\u1EA1ch: 1. M\xE1u s\u1EABm m\xE0u, kh\xF4ng c\xF3 m\xE0u \u0111\u1ECF t\u01B0\u01A1i c\u1EE7a oxyhemoglobin; 2. M\xE1u kh\xF4ng t\u1EF1 \u0111\u1ED9ng \u0111\u1EA9y piston c\u1EE7a xi-lanh l\xEAn theo nh\u1ECBp \u0111\u1EADp m\u1EA1ch n\u1EA3y m\xE0 ng\u01B0\u1EDDi l\u1EA5y ph\u1EA3i k\xE9o piston h\xFAt ra; 3. SaO2 kh\xED m\xE1u th\u1EA5p xa so v\u1EDBi SpO2 ng\xF3n tay." } }, { id: 30, source: "Hennessey & Japp (Made Easy)", caseNumberDisplay: "Ca 30 (Hennessey)", title: "Kh\xED m\xE1u b\xECnh th\u01B0\u1EDDng KH\xD4NG lo\u1EA1i tr\u1EEB \u0111\u01B0\u1EE3c thuy\xEAn t\u1EAFc ph\u1ED5i!", patientProfile: "N\u1EEF 55 tu\u1ED5i, ng\xE0y 4 sau thay kh\u1EDBp g\u1ED1i nh\xE2n t\u1EA1o, \u0111au ng\u1EF1c tr\xE1i \u0111\u1ED9t ng\u1ED9t k\xE8m th\u1EDF nhanh", categoryTag: "C\u1EA1m b\u1EABy l\xE2m s\xE0ng / PE", difficulty: "N\xE2ng cao", history: "N\u1EEF 55 tu\u1ED5i, sau ph\u1EABu thu\u1EADt thay kh\u1EDBp g\u1ED1i 4 ng\xE0y, n\u1EB1m b\u1EA5t \u0111\u1ED9ng t\u1EA1i gi\u01B0\u1EDDng. \u0110\u1ED9t ng\u1ED9t \u0111au ch\xF3i ng\u1EF1c tr\xE1i ki\u1EC3u m\xE0ng ph\u1ED5i, h\u1EE5t h\u01A1i v\xE0 h\u1ED3i h\u1ED9p tim \u0111\u1EADp nhanh.", examination: { vitals: { pulse: "98 l\u1EA7n/ph\xFAt (nhanh xoang)", rr: "20 l\u1EA7n/ph\xFAt", bp: "160/100 mmHg", temp: "36.6\xB0C", spo2: "99% (kh\xED tr\u1EDDi)", fio2: "21%" }, findings: "Kh\xF4ng s\u1ED1t, kh\xE1m tim ph\u1ED5i kh\xF4ng ph\xE1t hi\u1EC7n b\u1EA5t th\u01B0\u1EDDng. X-quang ng\u1EF1c th\u1EB3ng b\xECnh th\u01B0\u1EDDng, ECG ch\u1EC9 c\xF3 nh\u1ECBp nhanh xoang." }, abg: { unit: "kPa", pH: 7.43, pCO2: 4.9, pO2: 12.1, hco3: 25.8, be: -1.8, sao2: 99, fio2: 21, na: 136, k: 3.8, cl: 99, lactate: 1, glucose: 5, patientAge: 55 }, questions: ["1. \u0110\xE1nh gi\xE1 trao \u0111\u1ED5i kh\xED v\xE0 toan ki\u1EC1m?", "2. T\xEDnh A-a gradient?", "3. Kh\xED m\xE1u ho\xE0n to\xE0n b\xECnh th\u01B0\u1EDDng n\xE0y c\xF3 lo\u1EA1i tr\u1EEB \u0111\u01B0\u1EE3c thuy\xEAn t\u1EAFc ph\u1ED5i kh\xF4ng? C\u1EA7n l\xE0m g\xEC ti\u1EBFp theo?"], answers: { gasExchange: "Trao \u0111\u1ED5i kh\xED ho\xE0n to\xE0n b\xECnh th\u01B0\u1EDDng (PaO2 91 mmHg / 12.1 kPa, PaCO2 37 mmHg).", acidBase: "Th\u0103ng b\u1EB1ng toan ki\u1EC1m b\xECnh th\u01B0\u1EDDng (pH 7.43, HCO3 25.8).", differentialDiagnosis: "Thuy\xEAn t\u1EAFc \u0111\u1ED9ng m\u1EA1ch ph\u1ED5i c\u1EA5p t\xEDnh (Pulmonary Embolism) nh\xE1nh nh\u1ECF/v\u1EEBa.", clinicalAction: "A-a gradient = 15 mmHg (1.9 kPa) ho\xE0n to\xE0n b\xECnh th\u01B0\u1EDDng (< 20 mmHg). Tuy nhi\xEAn: KH\xCD M\xC1U \u0110\u1ED8NG M\u1EA0CH B\xCCNH TH\u01AF\u1EDCNG HO\xC0N TO\xC0N KH\xD4NG LO\u1EA0I TR\u1EEA \u0110\u01AF\u1EE2C THUY\xCAN T\u1EAEC PH\u1ED4I! C\xF3 t\u1EDBi 15-20% b\u1EC7nh nh\xE2n thuy\xEAn t\u1EAFc ph\u1ED5i c\xF3 PaO2 v\xE0 A-a gradient ho\xE0n to\xE0n trong gi\u1EDBi h\u1EA1n b\xECnh th\u01B0\u1EDDng. B\u1EC7nh nh\xE2n c\xF3 nguy c\u01A1 cao (sau m\u1ED5 kh\u1EDBp g\u1ED1i b\u1EA5t \u0111\u1ED9ng, \u0111au ng\u1EF1c m\xE0ng ph\u1ED5i c\u1EA5p, nh\u1ECBp nhanh), B\u1EAET BU\u1ED8C ch\u1EE5p CT m\u1EA1ch m\xE1u ph\u1ED5i (CTPA) ho\u1EB7c x\u1EA1 h\xECnh V/Q scan ngay l\u1EADp t\u1EE9c.", physiologicalInsight: 'Kh\xED m\xE1u \u0111\u1ED9ng m\u1EA1ch l\xE0 c\xF4ng c\u1EE5 h\u1ED7 tr\u1EE3 \u0111\xE1nh gi\xE1 sinh l\xFD, kh\xF4ng ph\u1EA3i c\xF4ng c\u1EE5 ch\u1EA9n \u0111o\xE1n h\xECnh \u1EA3nh. \u0110\u1EEBng bao gi\u1EDD \u0111\u1EC3 m\u1ED9t k\u1EBFt qu\u1EA3 kh\xED m\xE1u "\u0111\u1EB9p nh\u01B0 tranh" l\xE0m m\u1EDD m\u1EAFt tr\u01B0\u1EDBc m\u1ED9t b\u1EC7nh c\u1EA3nh l\xE2m s\xE0ng nguy hi\u1EC3m!' } }, { id: 31, source: "Pierre & Ranson (Case Study)", caseNumberDisplay: "Ca 3.1 (Pierre & Ranson)", title: "H\xF4n m\xEA ng\u01B0ng th\u1EDF do b\u01A1m Morphin gi\u1EA3m \u0111au PCA", patientProfile: "N\u1EEF 38 tu\u1ED5i, sau c\u1EAFt t\u1EED cung to\xE0n ph\u1EA7n do u x\u01A1, b\u1EA5m m\xE1y gi\u1EA3m \u0111au morphin PCA li\xEAn t\u1EE5c", categoryTag: "Suy h\xF4 h\u1EA5p Type 2", difficulty: "C\u1EA5p c\u1EE9u", history: "N\u1EEF 38 tu\u1ED5i sau m\u1ED5 c\u1EAFt t\u1EED cung ng\u1EA3 b\u1EE5ng, than \u0111au nhi\u1EC1u n\xEAn \u0111\u01B0\u1EE3c cho d\xF9ng m\xE1y gi\u1EA3m \u0111au t\u1EF1 ki\u1EC3m so\xE1t (PCA Morphin). M\u1ED9t gi\u1EDD sau, ng\u01B0\u1EDDi ch\u1ED3ng h\u1ED1t ho\u1EA3ng g\u1ECDi v\xEC th\u1EA5y v\u1EE3 ng\u01B0ng th\u1EDF v\xE0 kh\xF4ng tr\u1EA3 l\u1EDDi.", examination: { vitals: { pulse: "102 l\u1EA7n/ph\xFAt", rr: "5 l\u1EA7n/ph\xFAt (ng\xE1y to, t\u1EAFc ngh\u1EBDn)", bp: "88/42 mmHg", temp: "36.6\xB0C", spo2: "99% (\u0111ang th\u1EDF oxy g\u1ECDng m\u0169i 2L)", fio2: "28%" }, findings: "H\xF4n m\xEA kh\xF4ng \u0111\xE1p \u1EE9ng AVPU = U (Unresponsive). \u0110\u1ED3ng t\u1EED co nh\u1ECF nh\u01B0 \u0111inh ghim. \u0110\u01B0\u1EDDng th\u1EDF ng\xE1y to do t\u1EE5t l\u01B0\u1EE1i." }, abg: { unit: "kPa", pH: 7.25, pCO2: 8.2, pO2: 12, hco3: 21, be: -2, sao2: 99, fio2: 28, na: 138, k: 4, cl: 102, lactate: 1.1, glucose: 5.5, patientAge: 38 }, questions: ["1. \u0110\xE1nh gi\xE1 kh\xED m\xE1u theo quy tr\xECnh 6 b\u01B0\u1EDBc chu\u1EA9n?", "2. Ti\u1EBFp c\u1EADn ABCDE v\xE0 bi\u1EC7n ph\xE1p c\u1EA5p c\u1EE9u?"], answers: { gasExchange: "Suy h\xF4 h\u1EA5p Type 2 c\u1EA5p t\xEDnh (\u1EE9 tr\u1EC7 CO2 nghi\xEAm tr\u1ECDng PaCO2 61.5 mmHg).", acidBase: "Toan h\xF4 h\u1EA5p c\u1EA5p ch\u01B0a b\xF9 tr\u1EEB (pH 7.25 t\u1EE5t s\xE2u, HCO3- 21 mmol/L).", differentialDiagnosis: "Ng\u1ED9 \u0111\u1ED9c Morphin h\u1EADu ph\u1EABu g\xE2y \u1EE9c ch\u1EBF h\xF4 h\u1EA5p v\xE0 t\u1EE5t huy\u1EBFt \xE1p.", clinicalAction: "Theo ph\xE1c \u0111\u1ED3 ABCDE: A (Airway): \u0110\u1EB7t canule h\u1ECDng mi\u1EC7ng (Guedel) ngay v\xEC t\u1EE5t l\u01B0\u1EE1i t\u1EAFc ngh\u1EBDn; B (Breathing): B\xF3p b\xF3ng Ambu gi\xE0u oxy; C (Circulation): T\u1EE5t HA do morphin gi\u1EA3i ph\xF3ng histamine, truy\u1EC1n d\u1ECBch Hartman; D (Disability): Ti\xEAm t\u0129nh m\u1EA1ch NALOXONE \u0111\u1ED1i kh\xE1ng Opiate; E (Exposure): Ki\u1EC3m tra v\u1EBFt m\u1ED5. Chuy\u1EC3n ICU theo d\xF5i.", physiologicalInsight: "S\u1EF1 ph\u1ED1i h\u1EE3p 6 b\u01B0\u1EDBc ti\u1EBFp c\u1EADn c\u1EE7a Pierre & Ranson gi\xFAp nh\u1EADn di\u1EC7n ngay t\u1ED5n th\u01B0\u01A1ng h\xF4 h\u1EA5p nguy\xEAn ph\xE1t khi pH v\xE0 PaCO2 bi\u1EBFn thi\xEAn ng\u01B0\u1EE3c chi\u1EC1u nhau." } }, { id: 34, source: "Pierre & Ranson (Case Study)", caseNumberDisplay: "Ca 7.5 (Pierre & Ranson)", title: "Toan h\u1ED7n h\u1EE3p c\u1EF1c n\u1EB7ng do v\xF9i l\u1EA5p ch\u1EA5n th\u01B0\u01A1ng ho\u1EA1i t\u1EED chi", patientProfile: "N\u1EEF m\u1EA5t t\xEDch 3 ng\xE0y, t\xECm th\u1EA5y b\u1EA5t t\u1EC9nh sau ng\xE3, g\xE3y h\u1EDF c\u1ED5 ch\xE2n ho\u1EA1i t\u1EED thi\u1EBFu m\xE1u", categoryTag: "R\u1ED1i lo\u1EA1n h\u1ED7n h\u1EE3p", difficulty: "C\u1EA5p c\u1EE9u", history: "B\u1EC7nh nh\xE2n m\u1EA5t t\xEDch 3 ng\xE0y, \u0111\u01B0\u1EE3c ph\xE1t hi\u1EC7n h\xF4n m\xEA t\u1EA1i hi\u1EC7n tr\u01B0\u1EDDng sau tai n\u1EA1n ng\xE3 v\xF9i l\u1EA5p. B\u1EC7nh nh\xE2n \u0111\u01B0\u1EE3c \u0111\u1EB7t n\u1ED9i kh\xED qu\u1EA3n t\u1EA1i hi\u1EC7n tr\u01B0\u1EDDng v\xE0 \u0111\u01B0a th\u1EB3ng v\xE0o ph\xF2ng m\u1ED5 v\xEC b\xE0n ch\xE2n g\xE3y h\u1EDF ho\u1EA1i t\u1EED \u0111en.", examination: { vitals: { pulse: "135 l\u1EA7n/ph\xFAt", rr: "12 l\u1EA7n/ph\xFAt (th\u1EDF m\xE1y)", bp: "80/50 mmHg", temp: "35.0\xB0C", spo2: "99% (th\u1EDF oxy 100%)", fio2: "100%" }, findings: "H\xF4n m\xEA s\xE2u, h\u1EA1 th\xE2n nhi\u1EC7t. B\xE0n ch\xE2n tr\xE1i t\xEDm \u0111en l\u1EA1nh ng\u1EAFt, s\u01B0ng n\u1EC1 ho\u1EA1i t\u1EED do ch\xE8n \xE9p thi\u1EBFu m\xE1u k\xE9o d\xE0i." }, abg: { unit: "kPa", pH: 6.9, pCO2: 13.2, pO2: 15, hco3: 14, be: -7, sao2: 99, fio2: 100, na: 140, k: 6.5, cl: 98, lactate: 8, glucose: 7, patientAge: 45 }, questions: ["1. Nh\u1EADn di\u1EC7n d\u1EA1ng r\u1ED1i lo\u1EA1n th\u0103ng b\u1EB1ng ki\u1EC1m toan?", "2. Nh\u1EEFng nguy\xEAn nh\xE2n n\xE0o c\xF9ng th\xFAc \u0111\u1EA9y toan m\xE1u \u1EDF ca n\xE0y?"], answers: { gasExchange: "Suy h\xF4 h\u1EA5p Type 2 m\u1EE9c \u0111\u1ED9 c\u1EF1c k\u1EF3 nghi\xEAm tr\u1ECDng (PaCO2 99 mmHg) do th\xF4ng kh\xED nh\xE2n t\u1EA1o ch\u01B0a \u0111\u1EE7 th\u1EC3 t\xEDch ph\xFAt.", acidBase: "TOAN H\u1ED6N H\u1EE2P NGUY K\u1ECACH (Combined / Mixed Acidosis): Toan h\xF4 h\u1EA5p r\u1EA5t n\u1EB7ng (PaCO2 99 mmHg) K\u1EBET H\u1EE2P Toan chuy\u1EC3n h\xF3a r\u1EA5t n\u1EB7ng (HCO3 14 mmol/L, Lactate 8 mmol/L). pH 6.90 l\xE0 m\u1EE9c \u0111e d\u1ECDa t\u1EED vong t\u1EE9c th\xEC!", differentialDiagnosis: "H\u1ED9i ch\u1EE9ng v\xF9i l\u1EA5p (Crush syndrome) ho\u1EA1i t\u1EED chi g\xE2y toan lactic v\xE0 ti\xEAu c\u01A1 v\xE2n + Suy th\xF4ng kh\xED ph\u1EBF nang c\u1EA5p t\xEDnh.", clinicalAction: "1. T\u0103ng ngay th\u1EC3 t\xEDch ph\xFAt m\xE1y th\u1EDF (t\u0103ng t\u1EA7n s\u1ED1 v\xE0 th\u1EC3 t\xEDch l\u01B0u th\xF4ng Vt) \u0111\u1EC3 \u0111\xE0o th\u1EA3i CO2 h\u1EA1 PaCO2; 2. H\u1ED3i s\u1EE9c s\u1ED1c d\u1ECBch tinh th\u1EC3 t\xEDch c\u1EF1c; 3. C\u1EA5p c\u1EE9u t\u0103ng Kali m\xE1u (K+ 6.5 mmol/L) b\u1EB1ng Canxi clorid/gluconate ti\xEAm TM b\u1EA3o v\u1EC7 tim, truy\u1EC1n Glucose + Insulin; 4. Ph\u1EABu thu\u1EADt c\u1EAFt l\u1ECDc ho\u1EA1i t\u1EED kh\u1EA9n c\u1EA5p ho\u1EB7c c\u1EAFt c\u1EE5t chi; 5. L\u1ECDc m\xE1u li\xEAn t\u1EE5c (CRRT).", physiologicalInsight: "Khi c\u1EA3 h\u1EC7 h\xF4 h\u1EA5p (\u1EE9 CO2) v\xE0 h\u1EC7 chuy\u1EC3n h\xF3a (toan lactic v\xE0 acid v\xF4 c\u01A1) c\xF9ng \u0111\u1ED5 d\u1ED3n acid v\xE0o m\xE1u m\xE0 kh\xF4ng c\xF3 h\u1EC7 c\u01A1 quan n\xE0o b\xF9 tr\u1EEB, pH m\xE1u s\u1EBD s\u1EE5p \u0111\u1ED5 d\u01B0\u1EDBi 7.0, l\xE0m t\xEA li\u1EC7t c\xE1c enzym t\u1EBF b\xE0o v\xE0 ng\u1EEBng co b\xF3p c\u01A1 tim." } }];
  var mm = [{ id: "type1-failure", title: "X\u1EED tr\xED Suy h\xF4 h\u1EA5p Type 1 (Gi\u1EA3m oxy m\xE1u)", subtitle: "Defective Oxygenation with Normal or Low PaCO2", category: "H\xF4 h\u1EA5p", badgeColor: "bg-blue-100 text-blue-800 border-blue-200", summary: "\u0110\u1EB7c tr\u01B0ng b\u1EDFi PaO2 gi\u1EA3m (< 60 mmHg hay < 8 kPa) trong khi PaCO2 b\xECnh th\u01B0\u1EDDng ho\u1EB7c gi\u1EA3m do th\u1EDF nhanh ph\u1EA3n x\u1EA1. C\u01A1 ch\u1EBF ch\u1EE7 y\u1EBFu l\xE0 b\u1EA5t t\u01B0\u01A1ng x\u1EE9ng th\xF4ng kh\xED/t\u01B0\u1EDBi m\xE1u (V/Q mismatch) ho\u1EB7c Shunt trong ph\u1ED5i.", pathophysiology: "Ph\u1EBF nang b\u1ECB \u0111\xF4ng \u0111\u1EB7c (vi\xEAm ph\u1ED5i), x\u1EB9p ph\u1ED5i, ng\u1EADp d\u1ECBch (ph\xF9 ph\u1ED5i c\u1EA5p, ARDS) ho\u1EB7c t\u1EAFc m\u1EA1ch (thuy\xEAn t\u1EAFc ph\u1ED5i). M\xE1u \u0111i qua c\xE1c v\xF9ng n\xE0y kh\xF4ng nh\u1EADn \u0111\u01B0\u1EE3c oxy nh\u01B0ng v\xF9ng ph\u1EBF nang l\xE0nh t\u0103ng th\xF4ng kh\xED c\xF3 th\u1EC3 \u0111\xE0o th\u1EA3i \u0111\u01B0\u1EE3c CO2, do \u0111\xF3 PaCO2 kh\xF4ng t\u0103ng.", diagnosticCriteria: ["PaO2 < 60 mmHg (< 8 kPa) ho\u1EB7c SaO2 < 90% tr\xEAn kh\xED tr\u1EDDi", "PaCO2 b\xECnh th\u01B0\u1EDDng (35 - 45 mmHg) ho\u1EB7c gi\u1EA3m (< 35 mmHg)", "A-a gradient t\u0103ng cao (> 20 mmHg ho\u1EB7c > 2.6 kPa)", "T\u1EC9 l\u1EC7 P/F < 300 (ARDS: Nh\u1EB9 200-300, V\u1EEBa 100-200, N\u1EB7ng < 100)"], treatmentSteps: [{ title: "1. Li\u1EC7u ph\xE1p Oxy theo b\u1EADc thang (Escalating Oxygen Therapy)", description: "B\u1EADc 1: G\u1ECDng k\xEDnh m\u0169i (Nasal prongs) 1 - 6 L/ph\xFAt (FiO2 24 - 44%). B\u1EADc 2: Mask m\u1EB7t \u0111\u01A1n gi\u1EA3n 6 - 10 L/ph\xFAt (FiO2 35 - 50%). B\u1EADc 3: Mask c\xF3 t\xFAi d\u1EF1 tr\u1EEF kh\xF4ng th\u1EDF l\u1EA1i (NRB mask) 10 - 15 L/ph\xFAt (FiO2 60 - 90%). B\u1EADc 4: Oxy d\xF2ng cao qua canule m\u0169i (HFNC) v\u1EDBi l\u01B0u l\u01B0\u1EE3ng t\u1EDBi 60 L/ph\xFAt v\xE0 FiO2 100%. M\u1EE5c ti\xEAu SpO2: 94 - 98%.", priority: "Kh\u1EA9n c\u1EA5p" }, { title: "2. Th\xF4ng kh\xED \xE1p l\u1EF1c d\u01B0\u01A1ng (CPAP / NIV)", description: "Ch\u1EC9 \u0111\u1ECBnh s\u1EDBm trong Ph\xF9 ph\u1ED5i c\u1EA5p huy\u1EBFt \u0111\u1ED9ng ho\u1EB7c ARDS nh\u1EB9-v\u1EEBa \u0111\u1EC3 m\u1EDF c\xE1c ph\u1EBF nang b\u1ECB x\u1EB9p (recruitment), gi\u1EA3m shunt ph\u1ED5i v\xE0 gi\u1EA3m c\xF4ng th\u1EDF cho b\u1EC7nh nh\xE2n.", priority: "Quan tr\u1ECDng" }, { title: "3. \u0110i\u1EC1u tr\u1ECB nguy\xEAn nh\xE2n g\u1ED1c r\u1EC5", description: "Kh\xE1ng sinh s\u1EDBm n\u1EBFu vi\xEAm ph\u1ED5i; Ch\u1ED1ng \u0111\xF4ng n\u1EBFu thuy\xEAn t\u1EAFc ph\u1ED5i; L\u1EE3i ti\u1EC3u quai + gi\xE3n m\u1EA1ch n\u1EBFu ph\xF9 ph\u1ED5i c\u1EA5p do suy tim; D\u1EABn l\u01B0u ng\u1EF1c n\u1EBFu tr\xE0n kh\xED/tr\xE0n d\u1ECBch m\xE0ng ph\u1ED5i.", priority: "Quan tr\u1ECDng" }, { title: "4. Gi\xE1m s\xE1t kh\xF4ng x\xE2m l\u1EA5n b\u1EB1ng Pulse Oximetry", description: "V\xEC PaCO2 b\xECnh th\u01B0\u1EDDng v\xE0 kh\xF4ng c\xF3 nguy c\u01A1 \u1EE9 th\xE1n kh\xED, m\xE1y k\u1EB9p SpO2 ng\xF3n tay l\xE0 ph\u01B0\u01A1ng ti\u1EC7n theo d\xF5i ti\u1EBFn tri\u1EC3n c\u1EF1c k\u1EF3 chu\u1EA9n x\xE1c v\xE0 ti\u1EC7n l\u1EE3i, h\u1EA1n ch\u1EBF ch\u1ECDc \u0111\u1ED9ng m\u1EA1ch l\u1EB7p l\u1EA1i.", priority: "Duy tr\xEC" }], pitfallsAndWarnings: ["Khi PaO2 r\u01A1i xu\u1ED1ng d\u01B0\u1EDBi 60 mmHg (8 kPa), b\u1EC7nh nh\xE2n b\u01B0\u1EDBc v\xE0o \u0110O\u1EA0N D\u1ED0C c\u1EE7a \u0111\u01B0\u1EDDng cong Oxyhemoglobin: ch\u1EC9 c\u1EA7n PaO2 gi\u1EA3m th\xEAm m\u1ED9t ch\xFAt x\xEDu l\xE0 SaO2 s\u1EBD t\u1EE5t d\u1ED1c th\u1EA3m h\u1EA1i g\xE2y thi\u1EBFu oxy m\xF4 c\u1EA5p!", "N\u1EBFu b\u1EC7nh nh\xE2n th\u1EDF nhanh k\xE9o d\xE0i m\xE0 kh\xF4ng c\u1EA3i thi\u1EC7n, c\u01A1 h\xF4 h\u1EA5p s\u1EBD b\u1ECB ki\u1EC7t s\u1EE9c (Exhaustion), chuy\u1EC3n bi\u1EBFn \u0111\u1ED9t ng\u1ED9t th\xE0nh Suy h\xF4 h\u1EA5p Type 2 v\u1EDBi PaCO2 t\u0103ng v\u1ECDt."], sourceReference: "Arterial Blood Gases Made Easy (Ch\u01B0\u01A1ng 1.3, tr. 20-21; Ch\u01B0\u01A1ng 1.6-1.7, tr. 54-55)" }, { id: "type2-copd", title: "X\u1EED tr\xED \u0110\u1EE3t c\u1EA5p COPD & Suy h\xF4 h\u1EA5p Type 2 (T\u0103ng CO2 m\xE1u)", subtitle: 'Alveolar Hypoventilation & The "Hypoxic Drive" Caution', category: "H\xF4 h\u1EA5p", badgeColor: "bg-amber-100 text-amber-800 border-amber-200", summary: "Suy gi\u1EA3m th\xF4ng kh\xED ph\u1EBF nang d\u1EABn t\u1EDBi t\xEDch t\u1EE5 acid bay h\u01A1i (CO2). C\u1EA7n ph\xE2n bi\u1EC7t r\xF5: \u0110\u1EE3t c\u1EA5p tr\xEAn n\u1EC1n m\u1EA1n t\xEDnh (c\xF3 t\u0103ng HCO3- t\u1EEB tr\u01B0\u1EDBc) v\u1EDBi C\u1EA5p t\xEDnh \u0111\u01A1n thu\u1EA7n (ng\u1ED9 \u0111\u1ED9c thu\u1ED1c, nh\u01B0\u1EE3c c\u01A1).", pathophysiology: "\u1EDE b\u1EC7nh nh\xE2n COPD t\u0103ng CO2 m\u1EA1n t\xEDnh, th\u1EE5 th\u1EC3 trung \u01B0\u01A1ng sensing CO2 b\u1ECB tr\u01A1 h\xF3a. Trung t\xE2m h\xF4 h\u1EA5p duy tr\xEC nh\u1ECBp th\u1EDF nh\u1EDD th\u1EE5 th\u1EC3 xoang c\u1EA3nh c\u1EA3m nh\u1EADn PaO2 th\u1EA5p (Hypoxic drive). Th\u1EDF oxy li\u1EC1u cao b\u1EEBa b\xE3i s\u1EBD l\xE0m m\u1EA5t k\xEDch th\xEDch n\xE0y, g\xE2y gi\u1EA3m th\xF4ng kh\xED v\xE0 h\xF4n m\xEA t\u0103ng CO2 m\xE1u (CO2 Narcosis).", diagnosticCriteria: ["PaCO2 > 45 mmHg (> 6.0 kPa)", "Toan h\xF4 h\u1EA5p c\u1EA5p: pH < 7.35 v\xE0 HCO3- b\xECnh th\u01B0\u1EDDng (ch\u01B0a k\u1ECBp b\xF9)", "Toan h\xF4 h\u1EA5p m\u1EA1n: pH 7.35 - 7.40 v\xE0 HCO3- > 28 mmol/L (th\u1EADn \u0111\xE3 b\xF9)", "C\u1EA5p tr\xEAn n\u1EC1n m\u1EA1n: pH < 7.35 d\xF9 HCO3- \u0111\xE3 t\u0103ng cao t\u1EEB tr\u01B0\u1EDBc"], treatmentSteps: [{ title: "1. Li\u1EC7u ph\xE1p Oxy Ki\u1EC3m so\xE1t ch\u1EB7t ch\u1EBD (Controlled Oxygen Therapy)", description: "S\u1EED d\u1EE5ng Mask Venturi c\u1ED1 \u0111\u1ECBnh n\u1ED3ng \u0111\u1ED9 24% ho\u1EB7c 28% (ho\u1EB7c g\u1ECDng m\u0169i 1 - 2 L/ph\xFAt). M\u1EE4C TI\xCAU SpO2 NGHI\xCAM NG\u1EB6T: 88% - 92%. TUY\u1EC6T \u0110\u1ED0I KH\xD4NG d\xF9ng mask t\xFAi 100% tr\u1EEB khi c\xF3 ng\u1EEBng tim!", priority: "Kh\u1EA9n c\u1EA5p" }, { title: "2. Th\xF4ng kh\xED c\u01A1 h\u1ECDc kh\xF4ng x\xE2m nh\u1EADp (BiPAP / NIV)", description: "CH\u1EC8 \u0110\u1ECANH V\xC0NG: \u0110\u1EE3t c\u1EA5p COPD c\xF3 toan h\xF4 h\u1EA5p (pH 7.25 - 7.35, PaCO2 > 45 mmHg) c\xF2n t\u1EC9nh h\u1EE3p t\xE1c. B\u1EAFt \u0111\u1EA7u IPAP 10-12 cmH2O, EPAP 4-5 cmH2O, n\xE2ng d\u1EA7n \u0111\u1EC3 h\u1EA1 PaCO2 v\xE0 n\xE2ng pH.", priority: "Kh\u1EA9n c\u1EA5p" }, { title: "3. Kh\xED dung gi\xE3n ph\u1EBF qu\u1EA3n & Corticosteroid to\xE0n th\xE2n", description: "Salbutamol 2.5 - 5mg + Ipratropium 0.5mg kh\xED dung l\u1EB7p l\u1EA1i. Methylprednisolone 40mg IV ho\u1EB7c Prednisolone 30-40mg u\u1ED1ng 5 ng\xE0y. Kh\xE1ng sinh n\u1EBFu \u0111\u1EDDm m\u1EE7.", priority: "Quan tr\u1ECDng" }, { title: "4. \u0110\u1EB7t n\u1ED9i kh\xED qu\u1EA3n v\xE0 th\u1EDF m\xE1y x\xE2m nh\u1EADp", description: "Ch\u1EC9 \u0111\u1ECBnh khi toan m\xE1u n\u1EB7ng (pH < 7.25), h\xF4n m\xEA li b\xEC, ng\u1EEBng th\u1EDF ho\u1EB7c th\u1EA5t b\u1EA1i v\u1EDBi NIV sau 1 - 2 gi\u1EDD.", priority: "Kh\u1EA9n c\u1EA5p" }], pitfallsAndWarnings: ["C\u1EA2NH B\xC1O B\u1ECE OXY: N\u1EBFu b\u1EC7nh nh\xE2n COPD c\xF3 PaCO2 t\u0103ng l\xEAn sau th\u1EDF oxy, KH\xD4NG \u0110\u01AF\u1EE2C ng\u1EAFt h\u1EB3n oxy m\xE0 ph\u1EA3i gi\u1EA3m n\u1ED3ng \u0111\u1ED9 oxy v\xE0 \u0111\u1EB7t m\xE1y th\u1EDF BiPAP ngay! Ng\u1EAFt oxy s\u1EBD g\xE2y t\u1EE5t PaO2 ch\u1EBFt n\xE3o t\u1EE9c th\xEC.", "Pulse oximetry KH\xD4NG \u0110O \u0110\u01AF\u1EE2C PaCO2. M\u1ED9t b\u1EC7nh nh\xE2n c\xF3 SpO2 96% v\u1EABn c\xF3 th\u1EC3 \u0111ang b\u1ECB toan h\xF4 h\u1EA5p ch\u1EBFt ng\u01B0\u1EDDi (xem Ca 10)."], sourceReference: "Arterial Blood Gases Made Easy (Ch\u01B0\u01A1ng 1.2, tr. 7; Ch\u01B0\u01A1ng 1.3, tr. 22-23; Ca 5, 6, 9, 10)" }, { id: "dka-protocol", title: "Ph\xE1c \u0111\u1ED3 X\u1EED tr\xED Nhi\u1EC5m toan Ceton \u0110T\u0110 (DKA)", subtitle: "Triad of Hyperglycaemia, Ketosis & High Anion Gap Acidosis", category: "Toan chuy\u1EC3n h\xF3a", badgeColor: "bg-red-100 text-red-800 border-red-200", summary: "Bi\u1EBFn ch\u1EE9ng c\u1EA5p t\xEDnh \u0111e d\u1ECDa t\xEDnh m\u1EA1ng do thi\u1EBFu h\u1EE5t insulin tuy\u1EC7t \u0111\u1ED1i. G\xE2y toan chuy\u1EC3n h\xF3a t\u0103ng Anion Gap r\u1EA5t n\u1EB7ng, m\u1EA5t n\u01B0\u1EDBc s\xE2u do l\u1EE3i ni\u1EC7u th\u1EA9m th\u1EA5u v\xE0 r\u1ED1i lo\u1EA1n \u0111i\u1EC7n gi\u1EA3i.", pathophysiology: "Thi\u1EBFu insulin l\xE0m t\u1EBF b\xE0o kh\xF4ng d\xF9ng \u0111\u01B0\u1EE3c glucose, c\u01A1 th\u1EC3 t\u0103ng d\u1ECB h\xF3a m\u1EE1 gi\u1EA3i ph\xF3ng acid b\xE9o t\u1EF1 do. Gan chuy\u1EC3n h\xF3a acid b\xE9o th\xE0nh th\u1EC3 ceton (Acetoacetate, Beta-hydroxybutyrate) l\xE0m c\u1EA1n ki\u1EC7t d\u1EF1 tr\u1EEF Bicarbonate m\xE1u.", diagnosticCriteria: ["Toan m\xE1u: pH < 7.30 ho\u1EB7c HCO3- < 15 mmol/L (N\u1EB7ng: pH < 7.1 ho\u1EB7c HCO3- < 5 mmol/L)", "T\u0103ng ceton m\xE1u (> 3 mmol/L) ho\u1EB7c ceton n\u01B0\u1EDBc ti\u1EC3u (>= 2+)", "\u0110\u01B0\u1EDDng huy\u1EBFt t\u01B0\u01A1ng > 11 mmol/L (> 200 mg/dL) ho\u1EB7c ti\u1EC1n s\u1EED \u0110T\u0110", "Kho\u1EA3ng tr\u1ED1ng Anion (Anion Gap) > 16 mmol/L"], treatmentSteps: [{ title: "1. B\xF9 d\u1ECBch t\xEDch c\u1EF1c (Fluid Resuscitation)", description: "Gi\u1EDD \u0111\u1EA7u ti\xEAn: Truy\u1EC1n 1000 mL NaCl 0.9% t\u0129nh m\u1EA1ch. Gi\u1EDD 2-4: 500 - 1000 mL/h t\xF9y t\xECnh tr\u1EA1ng huy\u1EBFt \u0111\u1ED9ng. T\u1ED5ng l\u01B0\u1EE3ng d\u1ECBch thi\u1EBFu h\u1EE5t th\u01B0\u1EDDng t\u1EEB 5 - 8 l\xEDt.", priority: "Kh\u1EA9n c\u1EA5p" }, { title: "2. B\xF9 Kali m\xE1u TR\u01AF\u1EDAC HO\u1EB6C \u0110\u1ED2NG TH\u1EDCI v\u1EDBi Insulin", description: "N\u1EBFu K+ < 3.5 mmol/L: TR\xCC HO\xC3N INSULIN, truy\u1EC1n b\xF9 Kali 20 - 40 mEq/h cho t\u1EDBi khi K+ > 3.5. N\u1EBFu K+ 3.5 - 5.5: Pha 20 - 30 mEq Kali v\xE0o m\u1ED7i l\xEDt d\u1ECBch truy\u1EC1n. N\u1EBFu K+ > 5.5: Ch\u01B0a b\xF9 Kali, x\xE9t nghi\u1EC7m l\u1EA1i m\u1ED7i 2 gi\u1EDD.", priority: "Kh\u1EA9n c\u1EA5p" }, { title: "3. Truy\u1EC1n Insulin t\xE1c d\u1EE5ng ng\u1EAFn t\u0129nh m\u1EA1ch li\xEAn t\u1EE5c", description: "Li\u1EC1u 0.1 UI/kg/gi\u1EDD t\u0129nh m\u1EA1ch (Regular Insulin). M\u1EE5c ti\xEAu h\u1EA1 \u0111\u01B0\u1EDDng huy\u1EBFt 3 - 4 mmol/L/gi\u1EDD (50 - 75 mg/dL/h). Khi \u0111\u01B0\u1EDDng huy\u1EBFt xu\u1ED1ng < 14 mmol/L (250 mg/dL), PH\u1EA2I \u0110\u1ED4I sang d\u1ECBch truy\u1EC1n Glucose 5% + NaCl 0.45% \u0111\u1EC3 ti\u1EBFp t\u1EE5c duy tr\xEC insulin d\u1EADp ceton m\xE0 kh\xF4ng g\xE2y h\u1EA1 \u0111\u01B0\u1EDDng huy\u1EBFt.", priority: "Kh\u1EA9n c\u1EA5p" }, { title: "4. Th\u1EADn tr\u1ECDng v\u1EDBi Bicarbonate", description: "CH\u1EC8 XEM X\xC9T D\xD9NG BICARBONATE khi pH < 6.90. Pha 100 mmol NaHCO3 v\xE0o 400 mL n\u01B0\u1EDBc c\u1EA5t + 20 mEq KCl truy\u1EC1n trong 2 gi\u1EDD. D\xF9ng bicarb kh\xF4ng \u0111\xFAng ch\u1EC9 \u0111\u1ECBnh l\xE0m t\u0103ng ph\xF9 n\xE3o, h\u1EA1 kali m\xE1u n\u1EB7ng v\xE0 toan d\u1ECBch n\xE3o t\u1EE7y ngh\u1ECBch l\xFD.", priority: "Quan tr\u1ECDng" }], pitfallsAndWarnings: ["Trong qu\xE1 tr\xECnh \u0111i\u1EC1u tr\u1ECB DKA, b\u1EC7nh nh\xE2n th\u01B0\u1EDDng chuy\u1EC3n t\u1EEB Toan t\u0103ng Anion Gap sang Toan AG b\xECnh th\u01B0\u1EDDng (Hyperchloraemic Acidosis) do truy\u1EC1n m\u1ED9t l\u01B0\u1EE3ng l\u1EDBn mu\u1ED1i NaCl 0.9% v\xE0 \u0111\xE0o th\u1EA3i ceton qua th\u1EADn. \u0110\xE2y l\xE0 di\u1EC5n ti\u1EBFn l\xE0nh t\xEDnh.", "C\u1EA7n theo d\xF5i s\xE1t tri gi\xE1c \u0111\u1EC3 ph\xE1t hi\u1EC7n s\u1EDBm Ph\xF9 n\xE3o (Headache, l\u01A1 m\u01A1, ch\u1EADm nh\u1ECBp tim), \u0111\u1EB7c bi\u1EC7t \u1EDF tr\u1EBB em v\xE0 thanh thi\u1EBFu ni\xEAn."], sourceReference: "Arterial Blood Gases Made Easy (Ch\u01B0\u01A1ng 1.5, tr. 42-43; Ca 18) & JBDS DKA Guidelines" }, { id: "lactic-sepsis", title: "X\u1EED tr\xED Toan Lactic & S\u1ED1c nhi\u1EC5m khu\u1EA9n (Surviving Sepsis)", subtitle: "Tissue Hypoxia, Anaerobic Metabolism & Surviving Sepsis Bundle", category: "Toan chuy\u1EC3n h\xF3a", badgeColor: "bg-purple-100 text-purple-800 border-purple-200", summary: "Toan lactic l\xE0 nguy\xEAn nh\xE2n ph\u1ED5 bi\u1EBFn nh\u1EA5t c\u1EE7a toan chuy\u1EC3n h\xF3a \u1EDF b\u1EC7nh nh\xE2n n\u1EB1m vi\u1EC7n, \u0111\u1ECBnh ngh\u0129a khi HCO3- gi\u1EA3m k\xE8m Lactate huy\u1EBFt t\u01B0\u01A1ng > 4 mmol/L. L\xE0 ch\u1EC9 s\u1ED1 v\xE0ng ti\xEAn l\u01B0\u1EE3ng t\u1EED vong.", pathophysiology: "Thi\u1EBFu oxy t\u1EBF b\xE0o do t\u1EE5t huy\u1EBFt \xE1p, s\u1ED1c nhi\u1EC5m khu\u1EA9n, gi\u1EA3m t\u01B0\u1EDBi m\xE1u t\u1EA1ng ho\u1EB7c t\u1EAFc m\u1EA1ch khu tr\xFA (nh\u1ED3i m\xE1u ru\u1ED9t). T\u1EBF b\xE0o chuy\u1EC3n sang chu tr\xECnh \u0111\u01B0\u1EDDng ph\xE2n k\u1EF5 kh\xED, sinh ra acid lactic kh\xF4ng h\u1ED3i ph\u1EE5c n\u1EBFu t\u01B0\u1EDBi m\xE1u kh\xF4ng \u0111\u01B0\u1EE3c t\xE1i l\u1EADp.", diagnosticCriteria: ["Lactate m\xE1u > 2.0 mmol/L (Toan lactic r\xF5: > 4.0 mmol/L)", "Toan chuy\u1EC3n h\xF3a t\u0103ng Anion Gap (AG > 16-18 mmol/L)", "D\u1EA5u hi\u1EC7u gi\u1EA3m t\u01B0\u1EDBi m\xE1u: Huy\u1EBFt \xE1p t\u1EE5t (MAP < 65 mmHg), thi\u1EC3u ni\u1EC7u (< 0.5 mL/kg/h), da n\u1ED5i v\xE2n t\xEDm, CRT > 3s"], treatmentSteps: [{ title: "1. G\xF3i x\u1EED tr\xED 1 gi\u1EDD (Hour-1 Surviving Sepsis Bundle)", description: "1. \u0110\u1ECBnh l\u01B0\u1EE3ng Lactate m\xE1u ngay; 2. C\u1EA5y m\xE1u tr\u01B0\u1EDBc khi d\xF9ng kh\xE1ng sinh; 3. D\xF9ng kh\xE1ng sinh ph\u1ED5 r\u1ED9ng IV trong v\xF2ng 60 ph\xFAt; 4. B\xF9 nhanh d\u1ECBch tinh th\u1EC3 \u0111\u1EB3ng tr\u01B0\u01A1ng 30 mL/kg \u0111\u1ED1i v\u1EDBi t\u1EE5t huy\u1EBFt \xE1p ho\u1EB7c Lactate >= 4 mmol/L.", priority: "Kh\u1EA9n c\u1EA5p" }, { title: "2. Thu\u1ED1c v\u1EADn m\u1EA1ch n\xE2ng huy\u1EBFt \xE1p", description: "D\xF9ng Noradrenaline (Norepinephrine) truy\u1EC1n t\u0129nh m\u1EA1ch qua catheter trung t\xE2m, kh\u1EDFi \u0111\u1EA7u 0.05 - 0.1 mcg/kg/ph\xFAt, chu\u1EA9n \u0111\u1ED9 \u0111\u1EC3 duy tr\xEC Huy\u1EBFt \xE1p trung b\xECnh (MAP) >= 65 mmHg.", priority: "Kh\u1EA9n c\u1EA5p" }, { title: "3. \u0110o l\u01B0\u1EDDng \u0111\u1ED9 thanh th\u1EA3i Lactate (Lactate Clearance)", description: "X\xE9t nghi\u1EC7m l\u1EA1i Lactate m\u1ED7i 2 - 4 gi\u1EDD. M\u1EE5c ti\xEAu gi\u1EA3m \xEDt nh\u1EA5t 10 - 20% n\u1ED3ng \u0111\u1ED9 lactate sau m\u1ED7i 2 gi\u1EDD h\u1ED3i s\u1EE9c l\xE0 d\u1EA5u hi\u1EC7u h\u1ED3i ph\u1EE5c t\u01B0\u1EDBi m\xE1u m\xF4.", priority: "Quan tr\u1ECDng" }], pitfallsAndWarnings: ["KH\xD4NG TRUY\u1EC0N NATRI BICARBONATE \u0110\u1EC2 \u0110I\u1EC0U TR\u1ECA TOAN LACTIC (tr\u1EEB khi pH < 7.1)! Bicarbonate l\xE0m d\u1ECBch chuy\u1EC3n \u0111\u01B0\u1EDDng cong oxyhemoglobin sang tr\xE1i khi\u1EBFn t\u1EBF b\xE0o c\xE0ng kh\xF3 nh\u1EADn oxy, \u0111\u1ED3ng th\u1EDDi sinh CO2 n\u1ED9i b\xE0o l\xE0m toan n\u1ED9i b\xE0o n\u1EB7ng n\u1EC1 h\u01A1n.", "\u1EDE b\u1EC7nh nh\xE2n \u0111au b\u1EE5ng d\u1EEF d\u1ED9i kh\xE1m b\u1EE5ng m\u1EC1m c\xF3 rung nh\u0129: Lactate t\u0103ng cao g\u1EE3i \xFD ngay Nh\u1ED3i m\xE1u m\u1EA1c treo (Mesenteric Ischemia), ph\u1EA3i ch\u1EE5p CTA b\u1EE5ng c\u1EA5p c\u1EE9u!"], sourceReference: "Arterial Blood Gases Made Easy (Ch\u01B0\u01A1ng 1.5, tr. 40-41; Ca 17, 22) & SSC Guidelines" }, { id: "metabolic-alkalosis-vomiting", title: "X\u1EED tr\xED Ki\u1EC1m chuy\u1EC3n h\xF3a & M\u1EA5t d\u1ECBch d\u1EA1 d\xE0y (Vomiting)", subtitle: "Hypochloremic, Hypokalemic Metabolic Alkalosis", category: "Ki\u1EC1m chuy\u1EC3n h\xF3a", badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200", summary: "R\u1ED1i lo\u1EA1n toan ki\u1EC1m chi\u1EBFm 50% c\xE1c tr\u01B0\u1EDDng h\u1EE3p \u1EDF b\u1EC7nh nh\xE2n ngo\u1EA1i khoa. T\u1EED vong l\xEAn t\u1EDBi 45% khi pH > 7.55 v\xE0 80% khi pH > 7.65.", pathophysiology: "N\xF4n \xF3i ho\u1EB7c h\xFAt sonde d\u1EA1 d\xE0y l\xE0m m\u1EA5t acid HCl v\xE0 n\u01B0\u1EDBc. Th\u1EADn m\u1EA5t Clo v\xE0 Kali. \u0110\u1EC3 gi\u1EEF Natri c\u1EE9u v\xE3n th\u1EC3 t\xEDch tu\u1EA7n ho\xE0n, th\u1EADn d\u01B0\u1EDBi t\xE1c d\u1EE5ng c\u1EE7a aldosterone bu\u1ED9c ph\u1EA3i b\xE0i ti\u1EBFt H+ v\xE0o n\u01B0\u1EDBc ti\u1EC3u (Paradoxical aciduria), l\xE0m duy tr\xEC t\xECnh tr\u1EA1ng ki\u1EC1m m\xE1u nghi\xEAm tr\u1ECDng.", diagnosticCriteria: ["pH > 7.45 (ho\u1EB7c b\xECnh th\u01B0\u1EDDng n\u1EBFu c\xF3 b\xF9 tr\u1EEB m\u1EA1n)", "HCO3- > 28 mmol/L v\xE0 Base Excess (BE) > +2 mmol/L", "H\u1EA1 Clo m\xE1u (Cl- < 95 mmol/L) v\xE0 H\u1EA1 Kali m\xE1u (K+ < 3.5 mmol/L)"], treatmentSteps: [{ title: "1. B\xF9 d\u1ECBch ch\u1EE9a Clo (Chloride Replacement)", description: "Truy\u1EC1n t\u0129nh m\u1EA1ch dung d\u1ECBch Natri Clorid 0.9% (Normal Saline). Khi cung c\u1EA5p \u0111\u1EE7 Cl- cho th\u1EADn, th\u1EADn s\u1EBD t\xE1i l\u1EADp kh\u1EA3 n\u0103ng b\xE0i ti\u1EBFt HCO3- d\u01B0 th\u1EEBa ra n\u01B0\u1EDBc ti\u1EC3u.", priority: "Kh\u1EA9n c\u1EA5p" }, { title: "2. B\xF9 Kali Clorid (KCl)", description: "B\u1ED5 sung KCl 20 - 40 mEq/L d\u1ECBch truy\u1EC1n. B\xF9 \u0111\u1EE7 Kali gi\xFAp t\u1EBF b\xE0o th\u1EADn kh\xF4ng c\xF2n ph\u1EA3i th\u1EA3i H+ \u0111\u1EC3 \u0111\u1ED5i l\u1EA5y Na+, t\u1EEB \u0111\xF3 d\u1EADp t\u1EAFt v\xF2ng xo\u1EAFn duy tr\xEC ki\u1EC1m chuy\u1EC3n h\xF3a.", priority: "Kh\u1EA9n c\u1EA5p" }, { title: "3. \u0110i\u1EC1u ch\u1EC9nh li\u1EC1u l\u1EE3i ti\u1EC3u", description: "N\u1EBFu ki\u1EC1m chuy\u1EC3n h\xF3a do d\xF9ng Furosemide li\u1EC1u cao (th\u01B0\u1EDDng g\u1EB7p \u1EDF b\u1EC7nh nh\xE2n COPD k\xE8m suy tim), ph\u1ED1i h\u1EE3p thu\u1ED1c l\u1EE3i ti\u1EC3u gi\u1EEF Kali (Spironolactone) ho\u1EB7c Acetazolamide (Diamox) 250-500mg \u0111\u1EC3 th\u1EADn th\u1EA3i b\u1EDBt bicarbonate.", priority: "Quan tr\u1ECDng" }], pitfallsAndWarnings: ["Tuy\u1EC7t \u0111\u1ED1i kh\xF4ng mang tr\u1EBB b\u1ECB h\u1EB9p m\xF4n v\u1ECB ph\xEC \u0111\u1EA1i \u0111i m\u1ED5 c\u1EA5p c\u1EE9u khi ch\u01B0a ch\u1EC9nh xong ki\u1EC1m h\u1EA1 clo h\u1EA1 kali! Tr\u1EBB c\xF3 nguy c\u01A1 ng\u1EEBng th\u1EDF sau m\u1ED5 do \u1EE9c ch\u1EBF trung t\xE2m h\xF4 h\u1EA5p.", "Ki\u1EC1m m\xE1u n\u1EB7ng g\xE2y co gi\u1EADt, h\u1EA1 calci ion h\xF3a m\xE1u v\xE0 lo\u1EA1n nh\u1ECBp th\u1EA5t nguy hi\u1EC3m."], sourceReference: "Arterial Blood Gases Made Easy (Ch\u01B0\u01A1ng 1.5, tr. 44-45; Ca 26, 27, 28)" }, { id: "abg-technique-pitfalls", title: "K\u1EF9 thu\u1EADt l\u1EA5y ABG, Test Allen & Nh\u1EADn bi\u1EBFt Nh\u1EA7m M\xE1u T\u0129nh M\u1EA1ch", subtitle: "Arterial Blood Gas Sampling & Pitfall Prevention", category: "C\u1EA1m b\u1EABy & Th\u1EE7 thu\u1EADt", badgeColor: "bg-slate-100 text-slate-800 border-slate-200", summary: "Quy tr\xECnh l\u1EA5y m\xE1u \u0111\u1ED9ng m\u1EA1ch chu\u1EA9n y khoa, k\u1EF9 thu\u1EADt test Allen c\u1EA3i bi\xEAn b\u1EA3o v\u1EC7 t\u01B0\u1EDBi m\xE1u b\xE0n tay, v\xE0 c\xE1c b\u1EABy sai s\xF3t khi\u1EBFn k\u1EBFt qu\u1EA3 kh\xED m\xE1u b\u1ECB di\u1EC5n gi\u1EA3i sai l\u1EA7m.", pathophysiology: "\u0110\u1ED9ng m\u1EA1ch quay l\xE0 v\u1ECB tr\xED \u01B0u ti\xEAn s\u1ED1 1 v\xEC c\xF3 v\xF2ng cung \u0111\u1ED9ng m\u1EA1ch gan tay n\u1ED1i th\xF4ng v\u1EDBi \u0111\u1ED9ng m\u1EA1ch tr\u1EE5. Ph\u1EA3i \u0111\u1EA3m b\u1EA3o tu\u1EA7n ho\xE0n b\xE0ng h\u1EC7 tr\u01B0\u1EDBc khi ch\xE2m kim \u0111\u1EC3 tr\xE1nh nguy c\u01A1 t\u1EAFc m\u1EA1ch g\xE2y ho\u1EA1i t\u1EED ng\xF3n tay.", diagnosticCriteria: ["V\u1ECB tr\xED \u01B0u ti\xEAn: 1. \u0110\u1ED9ng m\u1EA1ch quay (c\u1ED5 tay); 2. \u0110\u1ED9ng m\u1EA1ch c\xE1nh tay (n\u1EBFp khu\u1EF7u); 3. \u0110\u1ED9ng m\u1EA1ch \u0111\xF9i (tam gi\xE1c Scarpa)", "G\xF3c \u0111\xE2m kim: 45 \u0111\u1ED9 v\u1EDBi \u0111\u1ED9ng m\u1EA1ch quay (ng\u1EEDa c\u1ED5 tay 20-30 \u0111\u1ED9); 90 \u0111\u1ED9 v\u1EDBi \u0111\u1ED9ng m\u1EA1ch \u0111\xF9i", "Test Allen c\u1EA3i bi\xEAn: B\xF3p ch\u1EB7t c\u1EA3 2 \u0110M quay v\xE0 tr\u1EE5 -> N\u1EAFm ch\u1EB7t tay 30s cho l\xF2ng b\xE0n tay tr\u1EAFng b\u1EC7ch -> M\u1EDF tay v\xE0 th\u1EA3 \u0110M tr\u1EE5 -> L\xF2ng b\xE0n tay h\u1ED3ng l\u1EA1i trong v\xF2ng 10 gi\xE2y = Test d\u01B0\u01A1ng t\xEDnh (An to\xE0n \u0111\u1EC3 l\u1EA5y m\xE1u)"], treatmentSteps: [{ title: "1. Chu\u1EA9n b\u1ECB b\u1EC7nh nh\xE2n & \u0110\u1EA1t tr\u1EA1ng th\xE1i \u1ED5n \u0111\u1ECBnh (Steady State)", description: "N\u1EBFu b\u1EC7nh nh\xE2n v\u1EEBa thay \u0111\u1ED5i n\u1ED3ng \u0111\u1ED9 oxy th\u1EDF ho\u1EB7c c\xE0i \u0111\u1EB7t m\xE1y th\u1EDF, PH\u1EA2I CH\u1EDC \xCDT NH\u1EA4T 20 PH\xDAT tr\u01B0\u1EDBc khi l\u1EA5y m\xE1u \u0111\u1EC3 kh\xED m\xE1u \u0111\u1EA1t tr\u1EA1ng th\xE1i c\xE2n b\u1EB1ng sinh l\xFD.", priority: "Quan tr\u1ECDng" }, { title: "2. K\u1EF9 thu\u1EADt \u0111u\u1ED5i b\u1ECDt kh\xED & Ch\u1ED1ng \u0111\xF4ng Heparin", description: "Tr\xE1ng xi-lanh b\u1EB1ng Heparin v\xE0 \u0111\u1EA9y h\u1EBFt thu\u1ED1c th\u1EEBa (d\u01B0 heparin l\xE0m toan m\xE1u gi\u1EA3 t\u1EA1o). Sau khi l\u1EA5y m\xE1u, \u0110U\u1ED4I H\u1EBET B\u1ECCT KH\xCD NGAY L\u1EACP T\u1EE8C v\xE0 \u0111\u1EADy n\u1EAFp k\xEDn (b\u1ECDt kh\xED l\xE0m PaO2 t\u0103ng gi\u1EA3 v\xE0 PaCO2 gi\u1EA3m gi\u1EA3).", priority: "Kh\u1EA9n c\u1EA5p" }, { title: "3. B\u1EA3o qu\u1EA3n l\u1EA1nh n\u1EBFu v\u1EADn chuy\u1EC3n > 10 ph\xFAt", description: "Ph\xE2n t\xEDch kh\xED m\xE1u ngay l\u1EADp t\u1EE9c. N\u1EBFu th\u1EDDi gian v\u1EADn chuy\u1EC3n \u0111\u1EBFn ph\xF2ng x\xE9t nghi\u1EC7m > 10 ph\xFAt, PH\u1EA2I \u0110\u1EB6T B\u01A0M TI\xCAM V\xC0O \u0110\xC1 L\u1EA0NH (Crushed ice) \u0111\u1EC3 l\xE0m ch\u1EADm qu\xE1 tr\xECnh ti\xEAu th\u1EE5 oxy v\xE0 sinh acid c\u1EE7a h\u1ED3ng c\u1EA7u.", priority: "Quan tr\u1ECDng" }, { title: "4. \u0110\xE8 \xE9p v\u1ECB tr\xED ch\u1ECDc kim \xEDt nh\u1EA5t 5 ph\xFAt", description: "\u0110\xE8 \xE9p tr\u1EF1c ti\u1EBFp li\xEAn t\u1EE5c \xEDt nh\u1EA5t 5 ph\xFAt (\xEDt nh\u1EA5t 10-15 ph\xFAt n\u1EBFu b\u1EC7nh nh\xE2n c\xF3 r\u1ED1i lo\u1EA1n \u0111\xF4ng m\xE1u ho\u1EB7c \u0111ang d\xF9ng thu\u1ED1c ch\u1ED1ng \u0111\xF4ng) \u0111\u1EC3 tr\xE1nh kh\u1ED1i m\xE1u t\u1EE5 (Hematoma) v\xE0 ph\xECnh m\u1EA1ch gi\u1EA3.", priority: "Kh\u1EA9n c\u1EA5p" }], pitfallsAndWarnings: ["NH\u1EACN DI\u1EC6N L\u1EA4Y NH\u1EA6M M\xC1U T\u0128NH M\u1EA0CH (VBG): M\xE1u m\xE0u \u0111\u1ECF th\u1EABm; kh\xF4ng t\u1EF1 \u0111\u1EA9y piston n\u1EA3y l\xEAn m\xE0 ph\u1EA3i d\xF9ng tay k\xE9o h\xFAt; SaO2 tr\xEAn m\xE1y kh\xED m\xE1u th\u1EA5p xa so v\u1EDBi SpO2 k\u1EB9p ng\xF3n tay. VBG KH\xD4NG TH\u1EC2 D\xD9NG \u0110\u1EC2 \u0110\xC1NH GI\xC1 OXY H\xD3A M\xC1U (PaO2)!", "C\u1EA0M B\u1EAAY KH\xCD M\xC1U B\xCCNH TH\u01AF\u1EDCNG TRONG THUY\xCAN T\u1EAEC PH\u1ED4I: 15-20% b\u1EC7nh nh\xE2n thuy\xEAn t\u1EAFc ph\u1ED5i c\u1EA5p c\xF3 kh\xED m\xE1u ho\xE0n to\xE0n b\xECnh th\u01B0\u1EDDng. Kh\xF4ng \u0111\u01B0\u1EE3c lo\u1EA1i tr\u1EEB PE ch\u1EC9 d\u1EF1a v\xE0o kh\xED m\xE1u!"], sourceReference: "Arterial Blood Gases Made Easy (Ch\u01B0\u01A1ng 1.6, tr. 48-53; Ch\u01B0\u01A1ng 1.7, tr. 56; Ca 29, 30)" }];
  var ip = { 1: { id: "type1-failure", title: "Ph\xE1c \u0111\u1ED3 Suy h\xF4 h\u1EA5p Type 1 & Li\u1EC7u ph\xE1p Oxy" }, 2: { id: "type2-copd", title: "Ph\xE1c \u0111\u1ED3 Suy h\xF4 h\u1EA5p Type 2 & Gi\u1EA3m th\xF4ng kh\xED ph\u1EBF nang" }, 3: { id: "type1-failure", title: "Ph\xE1c \u0111\u1ED3 Suy h\xF4 h\u1EA5p Type 1 & C\u1EA1m b\u1EABy Thuy\xEAn t\u1EAFc ph\u1ED5i (PE)" }, 4: { id: "type2-copd", title: "Ph\xE1c \u0111\u1ED3 X\u1EED tr\xED \u0110\u1EE3t c\u1EA5p COPD & Th\u1EDF m\xE1y BiPAP/NIV" }, 5: { id: "type2-copd", title: "Ph\xE1c \u0111\u1ED3 Suy h\xF4 h\u1EA5p Type 2 & Qu\xE1 li\u1EC1u Opiate/Morphin" }, 6: { id: "dka-protocol", title: "Ph\xE1c \u0111\u1ED3 X\u1EED tr\xED Nhi\u1EC5m toan Ceton \u0110T\u0110 (DKA)" }, 7: { id: "lactic-sepsis", title: "Ph\xE1c \u0111\u1ED3 Toan Lactic & S\u1ED1c nhi\u1EC5m khu\u1EA9n (Surviving Sepsis)" }, 8: { id: "type2-copd", title: "Ph\xE1c \u0111\u1ED3 Li\u1EC7u ph\xE1p Oxy c\xF3 ki\u1EC3m so\xE1t & B\u1EABy Hypoxic Drive" }, 9: { id: "metabolic-alkalosis-vomiting", title: "Ph\xE1c \u0111\u1ED3 Ki\u1EC1m chuy\u1EC3n h\xF3a & M\u1EA5t d\u1ECBch d\u1EA1 d\xE0y do N\xF4n" }, 10: { id: "type2-copd", title: "Ph\xE1c \u0111\u1ED3 \u0110\u1EE3t c\u1EA5p COPD tr\xEAn n\u1EC1n suy h\xF4 h\u1EA5p m\u1EA1n" }, 11: { id: "type1-failure", title: "Ph\xE1c \u0111\u1ED3 Suy h\xF4 h\u1EA5p Type 1 & H\u1ED9i ch\u1EE9ng ARDS" }, 12: { id: "type1-failure", title: "Ph\xE1c \u0111\u1ED3 C\u01A1n hen ph\u1EBF qu\u1EA3n c\u1EA5p n\u1EB7ng & Kh\xED dung" }, 13: { id: "type1-failure", title: "Ph\xE1c \u0111\u1ED3 Ph\xF9 ph\u1ED5i c\u1EA5p huy\u1EBFt \u0111\u1ED9ng & Th\xF4ng kh\xED CPAP" }, 14: { id: "dka-protocol", title: "Ph\xE1c \u0111\u1ED3 DKA m\u1EA5t n\u01B0\u1EDBc s\xE2u & B\xF9 Kali - Insulin" }, 15: { id: "type1-failure", title: "Ph\xE1c \u0111\u1ED3 Tr\xE0n kh\xED m\xE0ng ph\u1ED5i \xE1p l\u1EF1c & D\u1EABn l\u01B0u ng\u1EF1c c\u1EA5p c\u1EE9u" }, 16: { id: "lactic-sepsis", title: "Ph\xE1c \u0111\u1ED3 Toan Lactic do S\u1ED1c gi\u1EA3m th\u1EC3 t\xEDch / M\u1EA5t m\xE1u" }, 17: { id: "lactic-sepsis", title: "Ph\xE1c \u0111\u1ED3 Toan Lactic sau Ng\u1EEBng tu\u1EA7n ho\xE0n (ROSC)" }, 18: { id: "dka-protocol", title: "Ph\xE1c \u0111\u1ED3 DKA c\xF3 toan chuy\u1EC3n h\xF3a t\u0103ng Clo (Hyperchloremic)" }, 19: { id: "metabolic-alkalosis-vomiting", title: "Ph\xE1c \u0111\u1ED3 Ki\u1EC1m chuy\u1EC3n h\xF3a do H\xFAt sonde d\u1EA1 d\xE0y li\xEAn t\u1EE5c" }, 20: { id: "type2-copd", title: "Ph\xE1c \u0111\u1ED3 Suy h\xF4 h\u1EA5p Type 2 do Nh\u01B0\u1EE3c c\u01A1 (Myasthenia Gravis)" }, 21: { id: "type2-copd", title: "Ph\xE1c \u0111\u1ED3 Suy h\xF4 h\u1EA5p Type 2 do H\u1ED9i ch\u1EE9ng Guillain-Barr\xE9" }, 22: { id: "lactic-sepsis", title: "Ph\xE1c \u0111\u1ED3 Toan Lactic do Nh\u1ED3i m\xE1u m\u1EA1c treo ru\u1ED9t c\u1EA5p" }, 23: { id: "abg-technique-pitfalls", title: "Ph\xE1c \u0111\u1ED3 C\u1EA1m b\u1EABy T\u0103ng th\xF4ng kh\xED lo \xE2u & Ki\u1EC1m h\xF4 h\u1EA5p c\u1EA5p" }, 24: { id: "abg-technique-pitfalls", title: "Ph\xE1c \u0111\u1ED3 Nh\u1EADn di\u1EC7n L\u1EA5y nh\u1EA7m M\xE1u T\u0129nh M\u1EA1ch (VBG)" }, 25: { id: "lactic-sepsis", title: "Ph\xE1c \u0111\u1ED3 G\xF3i 1 gi\u1EDD S\u1ED1c nhi\u1EC5m tr\xF9ng Gram \xE2m" }, 26: { id: "metabolic-alkalosis-vomiting", title: "Ph\xE1c \u0111\u1ED3 Ki\u1EC1m chuy\u1EC3n h\xF3a do L\u1EA1m d\u1EE5ng Furosemide" }, 27: { id: "metabolic-alkalosis-vomiting", title: "Ph\xE1c \u0111\u1ED3 Ki\u1EC1m chuy\u1EC3n h\xF3a t\u0103ng Aldosterone (H\u1ED9i ch\u1EE9ng Conn)" }, 28: { id: "metabolic-alkalosis-vomiting", title: "Ph\xE1c \u0111\u1ED3 Ki\u1EC1m chuy\u1EC3n h\xF3a h\u1EA1 Kali do Cam th\u1EA3o" }, 29: { id: "type1-failure", title: "Ph\xE1c \u0111\u1ED3 Suy h\xF4 h\u1EA5p Type 1 & Bi\u1EBFn ch\u1EE9ng ARDS Vi\xEAm t\u1EE5y c\u1EA5p" }, 30: { id: "abg-technique-pitfalls", title: "Ph\xE1c \u0111\u1ED3 K\u1EF9 thu\u1EADt l\u1EA5y ABG & C\u1EA1m b\u1EABy B\u1ECDt kh\xED" } };
  var sp = { "type1-failure": [1, 3, 11, 12, 13, 15, 29], "type2-copd": [2, 4, 5, 8, 10, 20, 21], "dka-protocol": [6, 14, 18], "lactic-sepsis": [7, 16, 17, 22, 25], "metabolic-alkalosis-vomiting": [9, 19, 26, 27, 28], "abg-technique-pitfalls": [23, 24, 30] };
  var cp = [{ syndrome: "Suy h\xF4 h\u1EA5p Type 1 (Gi\u1EA3m oxy m\xE1u)", pattern: "PaO2 < 60 mmHg, PaCO2 b\xECnh th\u01B0\u1EDDng ho\u1EB7c gi\u1EA3m, A-a gradient t\u0103ng", cases: [1, 3, 11, 12, 13, 15, 29], protocolId: "type1-failure", protocolTitle: "Ph\xE1c \u0111\u1ED3 Suy h\xF4 h\u1EA5p Type 1 & Li\u1EC7u ph\xE1p Oxy" }, { syndrome: "Suy h\xF4 h\u1EA5p Type 2 (T\u0103ng th\xE1n kh\xED)", pattern: "PaCO2 > 45 mmHg, Toan h\xF4 h\u1EA5p c\u1EA5p ho\u1EB7c m\u1EA1n b\xF9 tr\u1EEB", cases: [2, 4, 5, 8, 10, 20, 21], protocolId: "type2-copd", protocolTitle: "Ph\xE1c \u0111\u1ED3 \u0110\u1EE3t c\u1EA5p COPD & Suy h\xF4 h\u1EA5p Type 2" }, { syndrome: "Nhi\u1EC5m toan Ceton \u0110T\u0110 (DKA)", pattern: "Toan chuy\u1EC3n h\xF3a t\u0103ng Anion Gap (AG > 16), Ceton m\xE1u (+), Glucose t\u0103ng", cases: [6, 14, 18], protocolId: "dka-protocol", protocolTitle: "Ph\xE1c \u0111\u1ED3 X\u1EED tr\xED Nhi\u1EC5m toan Ceton \u0110T\u0110 (DKA)" }, { syndrome: "Toan Lactic & S\u1ED1c nhi\u1EC5m khu\u1EA9n", pattern: "Toan chuy\u1EC3n h\xF3a t\u0103ng Anion Gap, Lactate > 2.0 (Toan r\xF5 > 4.0 mmol/L)", cases: [7, 16, 17, 22, 25], protocolId: "lactic-sepsis", protocolTitle: "Ph\xE1c \u0111\u1ED3 Toan Lactic & S\u1ED1c nhi\u1EC5m khu\u1EA9n" }, { syndrome: "Ki\u1EC1m chuy\u1EC3n h\xF3a & M\u1EA5t d\u1ECBch d\u1EA1 d\xE0y", pattern: "pH > 7.45, HCO3- > 28 mmol/L, H\u1EA1 Clo v\xE0 H\u1EA1 Kali m\xE1u", cases: [9, 19, 26, 27, 28], protocolId: "metabolic-alkalosis-vomiting", protocolTitle: "Ph\xE1c \u0111\u1ED3 Ki\u1EC1m chuy\u1EC3n h\xF3a & B\xF9 Natri Clorid" }, { syndrome: "K\u1EF9 thu\u1EADt l\u1EA5y ABG & C\u1EA1m b\u1EABy", pattern: "Nh\u1EA7m m\xE1u t\u0129nh m\u1EA1ch (VBG), B\u1ECDt kh\xED t\u0103ng PaO2 gi\u1EA3, Lo \xE2u ki\u1EC1m h\xF4 h\u1EA5p", cases: [23, 24, 30], protocolId: "abg-technique-pitfalls", protocolTitle: "Ph\xE1c \u0111\u1ED3 K\u1EF9 thu\u1EADt l\u1EA5y ABG & Test Allen" }];
  var gm = ({ initialSubTab: u = "cases", onLoadCaseToAnalyzer: O }) => {
    const [g, o] = Q.useState(u);
    Q.useEffect(() => {
      u && o(u);
    }, [u]);
    const [G, E] = Q.useState(""), [R, Z] = Q.useState("T\u1EA5t c\u1EA3"), [D, H] = Q.useState(1), [p, _] = Q.useState(""), [P, y] = Q.useState("T\u1EA5t c\u1EA3"), [j, T] = Q.useState("type2-copd"), U = ["T\u1EA5t c\u1EA3", "Suy h\xF4 h\u1EA5p Type 1", "Suy h\xF4 h\u1EA5p Type 2", "Toan chuy\u1EC3n h\xF3a", "Ki\u1EC1m chuy\u1EC3n h\xF3a", "R\u1ED1i lo\u1EA1n h\u1ED7n h\u1EE3p", "C\u1EA5p c\u1EE9u & H\u1ED3i s\u1EE9c"], nt = ["T\u1EA5t c\u1EA3", "H\xF4 h\u1EA5p", "Toan chuy\u1EC3n h\xF3a", "Ki\u1EC1m chuy\u1EC3n h\xF3a", "C\u1EA1m b\u1EABy & Th\u1EE7 thu\u1EADt"], ht = Q.useMemo(() => gs.filter((C) => {
      const L = R === "T\u1EA5t c\u1EA3" || C.categoryTag.toLowerCase().includes(R.toLowerCase()) || R === "C\u1EA5p c\u1EE9u & H\u1ED3i s\u1EE9c" && (C.difficulty === "C\u1EA5p c\u1EE9u" || C.categoryTag.includes("C\u1EA5p c\u1EE9u") || C.categoryTag.includes("Ng\u1ED9 \u0111\u1ED9c")), Y = G === "" || C.title.toLowerCase().includes(G.toLowerCase()) || C.patientProfile.toLowerCase().includes(G.toLowerCase()) || C.history.toLowerCase().includes(G.toLowerCase()) || C.answers.differentialDiagnosis.toLowerCase().includes(G.toLowerCase()) || C.categoryTag.toLowerCase().includes(G.toLowerCase()) || C.id.toString() === G.trim();
      return L && Y;
    }), [G, R]), B = Q.useMemo(() => mm.filter((C) => {
      const L = P === "T\u1EA5t c\u1EA3" || C.category === P, Y = p === "" || C.title.toLowerCase().includes(p.toLowerCase()) || C.subtitle.toLowerCase().includes(p.toLowerCase()) || C.summary.toLowerCase().includes(p.toLowerCase()) || C.category.toLowerCase().includes(p.toLowerCase());
      return L && Y;
    }), [p, P]), tt = (C) => {
      o("protocols"), T(C), _(""), y("T\u1EA5t c\u1EA3"), setTimeout(() => {
        const L = document.getElementById(`protocol-card-${C}`);
        L && L.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    }, gt = (C) => {
      o("cases"), H(C), E(""), Z("T\u1EA5t c\u1EA3"), setTimeout(() => {
        const L = document.getElementById(`case-card-${C}`);
        L && L.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    };
    return a.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6", children: [a.jsxs("div", { className: "bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 rounded-2xl p-6 text-white shadow-md border border-slate-800", children: [a.jsxs("div", { className: "flex flex-col lg:flex-row lg:items-center justify-between gap-4", children: [a.jsxs("div", { className: "space-y-2", children: [a.jsxs("div", { className: "flex items-center space-x-2.5", children: [a.jsx("div", { className: "p-2 bg-blue-500/20 rounded-xl border border-blue-400/30", children: a.jsx(xs, { className: "w-6 h-6 text-blue-300" }) }), a.jsx("div", { className: "flex items-center space-x-2", children: a.jsx("h1", { className: "text-xl sm:text-2xl font-bold tracking-tight", children: "Ca L\xE2m S\xE0ng M\u1EABu & Ph\xE1c \u0110\u1ED3 X\u1EED Tr\xED Chu\u1EA9n Y Khoa" }) })] }), a.jsxs("p", { className: "text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed", children: ["Kho t\xE0i nguy\xEAn th\u1EF1c chi\u1EBFn t\u1ED5ng h\u1EE3p ", a.jsx("strong", { children: "30+ ca b\u1EC7nh kh\xED m\xE1u \u0111i\u1EC3n h\xECnh" }), " (tr\xEDch t\u1EEB ", a.jsx("em", { children: "Arterial Blood Gases Made Easy" }), " & Pierre) t\xEDch h\u1EE3p tr\u1EF1c ti\u1EBFp ", a.jsx("strong", { children: "h\u1EC7 th\u1ED1ng ph\xE1c \u0111\u1ED3 \u0111i\u1EC1u tr\u1ECB kh\u1EA9n c\u1EA5p" }), ", l\u01B0u \u0111\u1ED3 oxy theo b\u1EADc thang v\xE0 c\u1EA3nh b\xE1o t\u1EED vong."] })] }), a.jsxs("div", { className: "flex flex-wrap items-center gap-2 text-xs", children: [a.jsxs("div", { className: "px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 backdrop-blur-sm", children: [a.jsx("span", { className: "text-slate-400", children: "Ca l\xE2m s\xE0ng:" }), " ", a.jsx("strong", { className: "text-blue-300 font-bold", children: "30 Ca" })] }), a.jsxs("div", { className: "px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 backdrop-blur-sm", children: [a.jsx("span", { className: "text-slate-400", children: "Ph\xE1c \u0111\u1ED3 x\u1EED tr\xED:" }), " ", a.jsx("strong", { className: "text-emerald-300 font-bold", children: "6 Ph\xE1c \u0110\u1ED3" })] }), a.jsxs("div", { className: "px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 backdrop-blur-sm", children: [a.jsx("span", { className: "text-slate-400", children: "Li\xEAn k\u1EBFt:" }), " ", a.jsx("strong", { className: "text-amber-300 font-bold", children: "2 Chi\u1EC1u Th\xF4ng Minh" })] })] })] }), a.jsxs("div", { className: "mt-6 pt-5 border-t border-slate-700/80 flex flex-wrap items-center gap-2", children: [a.jsxs("button", { id: "tab-cases-list", type: "button", onClick: () => o("cases"), className: `flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${g === "cases" ? "bg-blue-600 text-white shadow-sm ring-2 ring-blue-400/40" : "bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white"}`, children: [a.jsx(xs, { className: "w-4 h-4" }), a.jsx("span", { children: "30+ Ca L\xE2m S\xE0ng M\u1EABu" }), a.jsxs("span", { className: "px-2 py-0.5 rounded-full text-[10px] bg-blue-500/30 text-blue-200", children: [gs.length, " ca"] })] }), a.jsxs("button", { id: "tab-protocols", type: "button", onClick: () => o("protocols"), className: `flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${g === "protocols" ? "bg-blue-600 text-white shadow-sm ring-2 ring-blue-400/40" : "bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white"}`, children: [a.jsx(ca, { className: "w-4 h-4" }), a.jsx("span", { children: "Ph\xE1c \u0110\u1ED3 X\u1EED Tr\xED L\xE2m S\xE0ng" }), a.jsxs("span", { className: "px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/30 text-emerald-200", children: [mm.length, " ph\xE1c \u0111\u1ED3"] })] }), a.jsxs("button", { id: "tab-matrix", type: "button", onClick: () => o("matrix"), className: `flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${g === "matrix" ? "bg-blue-600 text-white shadow-sm ring-2 ring-blue-400/40" : "bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white"}`, children: [a.jsx(om, { className: "w-4 h-4" }), a.jsx("span", { children: "B\u1EA3ng \u0110\u1ED1i Chi\u1EBFu Ca B\u1EC7nh & Ph\xE1c \u0110\u1ED3" })] })] })] }), g === "cases" && a.jsxs("div", { className: "space-y-5 animate-in fade-in duration-200", children: [a.jsxs("div", { className: "bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3", children: [a.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 items-center justify-between", children: [a.jsxs("div", { className: "relative w-full sm:w-80", children: [a.jsx(ys, { className: "w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" }), a.jsx("input", { type: "text", value: G, onChange: (C) => E(C.target.value), placeholder: "T\xECm theo ca (COPD, DKA, Morphin, S\u1ED1c, Hen, Ca 01...)", className: "w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" })] }), a.jsxs("div", { className: "flex items-center space-x-2 text-xs text-slate-500 font-medium", children: [a.jsxs("span", { children: ["Hi\u1EC3n th\u1ECB ", a.jsx("strong", { className: "text-slate-900", children: ht.length }), " / ", gs.length, " ca b\u1EC7nh"] }), G && a.jsx("button", { onClick: () => E(""), className: "text-blue-600 hover:underline font-bold cursor-pointer", children: "(X\xF3a l\u1ECDc)" })] })] }), a.jsx("div", { className: "flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin", children: U.map((C) => a.jsx("button", { onClick: () => Z(C), className: `px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${R === C ? "bg-blue-600 text-white shadow-xs" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`, children: C }, C)) })] }), a.jsx("div", { className: "space-y-4", children: ht.map((C) => {
      const L = D === C.id, Y = ip[C.id];
      return a.jsxs("div", { id: `case-card-${C.id}`, className: "bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-blue-300 transition-all", children: [a.jsxs("div", { className: "p-5 space-y-3", children: [a.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [a.jsxs("div", { className: "flex items-center space-x-2", children: [a.jsx("span", { className: "w-7 h-7 rounded-full bg-blue-100 text-blue-800 text-xs font-bold flex items-center justify-center", children: C.id }), a.jsx("h3", { className: "text-sm sm:text-base font-bold text-slate-900", children: C.title })] }), a.jsxs("div", { className: "flex items-center space-x-2", children: [a.jsx("span", { className: `px-2 py-0.5 rounded-md text-[10px] font-bold ${C.difficulty === "C\u1EA5p c\u1EE9u" ? "bg-rose-100 text-rose-800 border border-rose-200" : C.difficulty === "N\xE2ng cao" ? "bg-purple-100 text-purple-800 border border-purple-200" : C.difficulty === "Trung b\xECnh" ? "bg-amber-100 text-amber-800 border border-amber-200" : "bg-emerald-100 text-emerald-800 border border-emerald-200"}`, children: C.difficulty }), a.jsx("span", { className: "text-[11px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md hidden sm:inline", children: C.caseNumberDisplay })] })] }), a.jsxs("div", { className: "flex items-start space-x-2 text-xs text-slate-600", children: [a.jsx(Ux, { className: "w-4 h-4 text-slate-400 shrink-0 mt-0.5" }), a.jsx("span", { children: C.patientProfile })] }), a.jsxs("div", { className: "flex flex-wrap items-center gap-1.5 pt-1", children: [C.examination.vitals.rr && a.jsxs("span", { className: "px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700", children: ["Th\u1EDF: ", C.examination.vitals.rr] }), C.examination.vitals.spo2 && a.jsxs("span", { className: "px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700", children: ["SpO\u2082: ", C.examination.vitals.spo2] }), C.examination.vitals.pulse && a.jsxs("span", { className: "px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700", children: ["M\u1EA1ch: ", C.examination.vitals.pulse] }), C.examination.vitals.bp && a.jsxs("span", { className: "px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700", children: ["HA: ", C.examination.vitals.bp] }), a.jsxs("span", { className: "px-2 py-0.5 rounded-md text-[10px] font-semibold bg-indigo-50 text-indigo-700", children: ["#", C.categoryTag] })] }), a.jsxs("div", { className: "p-3 rounded-xl bg-slate-50 border border-slate-200/80 grid grid-cols-3 sm:grid-cols-7 gap-2 text-center text-xs", children: [a.jsxs("div", { children: [a.jsx("div", { className: "text-[10px] text-slate-500 font-medium", children: "pH" }), a.jsx("div", { className: "font-bold text-slate-900 mt-0.5", children: C.abg.pH })] }), a.jsxs("div", { children: [a.jsxs("div", { className: "text-[10px] text-slate-500 font-medium", children: ["PaCO\u2082 (", C.abg.unit, ")"] }), a.jsx("div", { className: "font-bold text-slate-900 mt-0.5", children: C.abg.pCO2 })] }), a.jsxs("div", { children: [a.jsxs("div", { className: "text-[10px] text-slate-500 font-medium", children: ["PaO\u2082 (", C.abg.unit, ")"] }), a.jsx("div", { className: "font-bold text-slate-900 mt-0.5", children: C.abg.pO2 })] }), a.jsxs("div", { children: [a.jsx("div", { className: "text-[10px] text-slate-500 font-medium", children: "HCO\u2083\u207B" }), a.jsx("div", { className: "font-bold text-slate-900 mt-0.5", children: C.abg.hco3 })] }), a.jsxs("div", { children: [a.jsx("div", { className: "text-[10px] text-slate-500 font-medium", children: "BE" }), a.jsx("div", { className: "font-bold text-slate-900 mt-0.5", children: C.abg.be })] }), a.jsxs("div", { children: [a.jsx("div", { className: "text-[10px] text-slate-500 font-medium", children: "SaO\u2082" }), a.jsxs("div", { className: "font-bold text-slate-900 mt-0.5", children: [C.abg.sao2, "%"] })] }), a.jsxs("div", { children: [a.jsx("div", { className: "text-[10px] text-slate-500 font-medium", children: "FiO\u2082" }), a.jsxs("div", { className: "font-bold text-blue-700 mt-0.5", children: [C.abg.fio2, "%"] })] })] }), a.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100", children: [a.jsxs("div", { className: "flex items-center space-x-2", children: [a.jsxs("button", { onClick: () => O(C.abg), className: "flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-xs transition-all cursor-pointer", children: [a.jsx(Pe, { className: "w-3.5 h-3.5" }), a.jsx("span", { children: "N\u1EA1p V\xE0o B\u1ED9 Ph\xE2n T\xEDch \u2192" })] }), Y && a.jsxs("button", { onClick: () => tt(Y.id), className: "hidden sm:inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-700 border border-slate-200 transition-all cursor-pointer", title: Y.title, children: [a.jsx(ca, { className: "w-3.5 h-3.5 text-blue-600" }), a.jsx("span", { children: "Xem Ph\xE1c \u0110\u1ED3 X\u1EED Tr\xED" })] })] }), a.jsxs("button", { onClick: () => H(L ? null : C.id), className: "flex items-center space-x-1 text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-all cursor-pointer", children: [a.jsx("span", { children: L ? "Thu g\u1ECDn l\u1EDDi gi\u1EA3i" : "Xem l\u1EDDi gi\u1EA3i & Bi\u1EC7n lu\u1EADn" }), L ? a.jsx(Ql, { className: "w-4 h-4" }) : a.jsx(Xl, { className: "w-4 h-4" })] })] })] }), L && a.jsxs("div", { className: "border-t border-slate-200 bg-gradient-to-b from-slate-50 to-white p-5 space-y-4 text-xs", children: [Y && a.jsxs("div", { className: "p-3.5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs", children: [a.jsxs("div", { className: "flex items-center space-x-2.5", children: [a.jsx("div", { className: "p-1.5 bg-blue-600 text-white rounded-lg", children: a.jsx(ca, { className: "w-4 h-4" }) }), a.jsxs("div", { children: [a.jsx("div", { className: "text-[10px] font-bold uppercase tracking-wider text-blue-700", children: "Ph\xE1c \u0110\u1ED3 X\u1EED Tr\xED Khuy\u1EBFn C\xE1o T\u01B0\u01A1ng \u1EE8ng:" }), a.jsx("div", { className: "font-bold text-slate-900 text-xs sm:text-sm", children: Y.title })] })] }), a.jsxs("button", { onClick: () => tt(Y.id), className: "flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs cursor-pointer transition-all self-start sm:self-center", children: [a.jsx("span", { children: "M\u1EDF Ph\xE1c \u0110\u1ED3 Chi Ti\u1EBFt" }), a.jsx(ps, { className: "w-3.5 h-3.5" })] })] }), a.jsxs("div", { className: "p-3.5 rounded-xl bg-slate-100/70 border border-slate-200 space-y-1", children: [a.jsx("strong", { className: "text-slate-900 block", children: "B\u1EC7nh s\u1EED & Th\u0103m kh\xE1m l\xE2m s\xE0ng:" }), a.jsx("p", { className: "text-slate-700 leading-relaxed", children: C.history }), a.jsxs("p", { className: "text-slate-600 italic mt-1", children: ["Kh\xE1m: ", C.examination.findings] })] }), a.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: [a.jsxs("div", { className: "p-3.5 rounded-xl bg-blue-50 border border-blue-200 space-y-1", children: [a.jsxs("div", { className: "font-bold text-blue-900 flex items-center space-x-1.5", children: [a.jsx(xn, { className: "w-4 h-4 text-blue-700" }), a.jsx("span", { children: "Trao \u0111\u1ED5i kh\xED ph\u1ED5i:" })] }), a.jsx("p", { className: "text-slate-800 leading-relaxed font-medium", children: C.answers.gasExchange })] }), a.jsxs("div", { className: "p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1", children: [a.jsxs("div", { className: "font-bold text-emerald-900 flex items-center space-x-1.5", children: [a.jsx(ha, { className: "w-4 h-4 text-emerald-700" }), a.jsx("span", { children: "Th\u0103ng b\u1EB1ng Ki\u1EC1m - Toan:" })] }), a.jsx("p", { className: "text-slate-800 leading-relaxed font-medium", children: C.answers.acidBase })] })] }), a.jsxs("div", { className: "p-3.5 rounded-xl bg-white border border-slate-200 space-y-1", children: [a.jsx("strong", { className: "text-slate-900 block text-xs", children: "Ch\u1EA9n \u0111o\xE1n ph\xE2n bi\u1EC7t & B\u1EC7nh c\u1EA3nh:" }), a.jsx("p", { className: "text-slate-700 leading-relaxed", children: C.answers.differentialDiagnosis })] }), C.questions.length > 0 && a.jsxs("div", { className: "space-y-2", children: [a.jsxs("div", { className: "font-bold text-slate-900 flex items-center space-x-1.5", children: [a.jsx(Je, { className: "w-4 h-4 text-indigo-600" }), a.jsx("span", { children: "C\xE1c c\xE2u h\u1ECFi l\xE2m s\xE0ng trong t\xE0i li\u1EC7u g\u1ED1c:" })] }), a.jsx("ul", { className: "list-disc pl-5 space-y-1 text-slate-700", children: C.questions.map((Ct, et) => a.jsx("li", { className: "font-medium text-blue-950", children: Ct }, et)) })] }), a.jsxs("div", { className: "p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-200 space-y-1.5", children: [a.jsxs("div", { className: "font-bold text-indigo-950 flex items-center space-x-1.5", children: [a.jsx(ca, { className: "w-4 h-4 text-indigo-700" }), a.jsx("span", { children: "H\u01B0\u1EDBng x\u1EED tr\xED l\xE2m s\xE0ng khuy\u1EBFn c\xE1o:" })] }), a.jsx("p", { className: "text-slate-800 leading-relaxed font-medium", children: C.answers.clinicalAction })] }), a.jsxs("div", { className: "p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-950 space-y-1", children: [a.jsx("strong", { className: "block font-bold", children: "\u0110i\u1EC3m s\xE1ng sinh l\xFD h\u1ECDc (Clinical Insight):" }), a.jsx("p", { className: "leading-relaxed font-medium", children: C.answers.physiologicalInsight })] })] })] }, C.id);
    }) })] }), g === "protocols" && a.jsxs("div", { className: "space-y-5 animate-in fade-in duration-200", children: [a.jsxs("div", { className: "bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3", children: [a.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 items-center justify-between", children: [a.jsxs("div", { className: "relative w-full sm:w-80", children: [a.jsx(ys, { className: "w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" }), a.jsx("input", { type: "text", value: p, onChange: (C) => _(C.target.value), placeholder: "T\xECm ph\xE1c \u0111\u1ED3 (COPD, DKA, S\u1ED1c nhi\u1EC5m khu\u1EA9n, Lactic...)", className: "w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" })] }), a.jsxs("div", { className: "flex items-center space-x-2 text-xs text-slate-500 font-medium", children: [a.jsxs("span", { children: ["C\xF3 ", a.jsx("strong", { className: "text-slate-900", children: B.length }), " ph\xE1c \u0111\u1ED3 chu\u1EA9n y khoa"] }), p && a.jsx("button", { onClick: () => _(""), className: "text-blue-600 hover:underline font-bold cursor-pointer", children: "(X\xF3a l\u1ECDc)" })] })] }), a.jsx("div", { className: "flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin", children: nt.map((C) => a.jsx("button", { onClick: () => y(C), className: `px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${P === C ? "bg-blue-600 text-white shadow-xs" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`, children: C }, C)) })] }), a.jsx("div", { className: "space-y-4", children: B.map((C) => {
      const L = j === C.id, Y = sp[C.id] || [], Ct = gs.filter((et) => Y.includes(et.id));
      return a.jsxs("div", { id: `protocol-card-${C.id}`, className: "bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-blue-300 transition-all", children: [a.jsxs("div", { className: "p-5 cursor-pointer select-none space-y-2 hover:bg-slate-50/50 transition-colors", onClick: () => T(L ? null : C.id), children: [a.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [a.jsxs("div", { className: "flex items-center space-x-2", children: [a.jsx("span", { className: `px-2.5 py-0.5 rounded-md text-xs font-bold border ${C.badgeColor}`, children: C.category }), a.jsx("h3", { className: "text-sm sm:text-base font-bold text-slate-900", children: C.title })] }), a.jsxs("div", { className: "flex items-center space-x-2 text-slate-400", children: [a.jsx("span", { className: "text-[11px] hidden sm:inline", children: C.sourceReference }), L ? a.jsx(Ql, { className: "w-5 h-5 text-slate-600" }) : a.jsx(Xl, { className: "w-5 h-5 text-slate-600" })] })] }), a.jsx("div", { className: "text-xs text-blue-700 font-medium italic", children: C.subtitle }), a.jsx("p", { className: "text-xs text-slate-600 leading-relaxed", children: C.summary }), Ct.length > 0 && a.jsxs("div", { className: "flex items-center space-x-2 pt-1", children: [a.jsx("span", { className: "text-[10px] text-slate-400 font-bold uppercase tracking-wider", children: "Ca l\xE2m s\xE0ng th\u1EF1c t\u1EBF:" }), a.jsxs("div", { className: "flex flex-wrap gap-1", children: [Ct.slice(0, 4).map((et) => a.jsxs("span", { className: "px-1.5 py-0.2 rounded text-[10px] bg-slate-100 text-slate-700 font-medium", children: ["Ca ", et.id] }, et.id)), Ct.length > 4 && a.jsxs("span", { className: "text-[10px] text-slate-400", children: ["+", Ct.length - 4, " ca kh\xE1c"] })] })] })] }), L && a.jsxs("div", { className: "border-t border-slate-200 p-5 space-y-5 bg-gradient-to-b from-slate-50 to-white text-xs", children: [a.jsxs("div", { className: "p-4 rounded-xl bg-white border border-slate-200 space-y-1.5", children: [a.jsxs("div", { className: "font-bold text-slate-900 flex items-center space-x-1.5", children: [a.jsx(bs, { className: "w-4 h-4 text-blue-600" }), a.jsx("span", { children: "C\u01A1 ch\u1EBF sinh l\xFD b\u1EC7nh (Pathophysiology):" })] }), a.jsx("p", { className: "text-slate-700 leading-relaxed", children: C.pathophysiology })] }), a.jsxs("div", { className: "p-4 rounded-xl bg-white border border-slate-200 space-y-2", children: [a.jsxs("div", { className: "font-bold text-slate-900 flex items-center space-x-1.5", children: [a.jsx(bm, { className: "w-4 h-4 text-emerald-600" }), a.jsx("span", { children: "Ti\xEAu chu\u1EA9n ch\u1EA9n \u0111o\xE1n x\xE1c \u0111\u1ECBnh:" })] }), a.jsx("ul", { className: "list-disc pl-5 space-y-1 text-slate-700", children: C.diagnosticCriteria.map((et, St) => a.jsx("li", { children: et }, St)) })] }), a.jsxs("div", { className: "space-y-2.5", children: [a.jsxs("div", { className: "font-bold text-slate-900 flex items-center space-x-1.5", children: [a.jsx(ca, { className: "w-4 h-4 text-blue-600" }), a.jsx("span", { children: "C\xE1c b\u01B0\u1EDBc x\u1EED tr\xED l\xE2m s\xE0ng chu\u1EA9n y khoa:" })] }), a.jsx("div", { className: "space-y-2", children: C.treatmentSteps.map((et, St) => a.jsxs("div", { className: "p-3.5 rounded-xl bg-white border border-slate-200 space-y-1 shadow-xs", children: [a.jsxs("div", { className: "flex items-center justify-between", children: [a.jsx("span", { className: "font-bold text-slate-900 text-xs sm:text-sm", children: et.title }), a.jsx("span", { className: `px-2 py-0.5 rounded-full text-[10px] font-bold ${et.priority === "Kh\u1EA9n c\u1EA5p" ? "bg-rose-100 text-rose-800" : et.priority === "Quan tr\u1ECDng" ? "bg-amber-100 text-amber-800" : "bg-blue-100 text-blue-800"}`, children: et.priority })] }), a.jsx("p", { className: "text-slate-700 leading-relaxed", children: et.description })] }, St)) })] }), C.pitfallsAndWarnings.length > 0 && a.jsxs("div", { className: "p-4 rounded-xl bg-rose-50/80 border border-rose-200 space-y-2", children: [a.jsxs("div", { className: "font-bold text-rose-950 flex items-center space-x-1.5", children: [a.jsx(pn, { className: "w-4 h-4 text-rose-600" }), a.jsx("span", { children: "C\u1EA1m b\u1EABy l\xE2m s\xE0ng & C\u1EA3nh b\xE1o c\u1ED1t t\u1EED:" })] }), a.jsx("ul", { className: "list-disc pl-5 space-y-1 font-medium text-rose-900", children: C.pitfallsAndWarnings.map((et, St) => a.jsx("li", { children: et }, St)) })] }), Ct.length > 0 && a.jsxs("div", { className: "p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5", children: [a.jsxs("div", { className: "flex items-center justify-between", children: [a.jsxs("div", { className: "font-bold text-slate-900 flex items-center space-x-1.5", children: [a.jsx(xs, { className: "w-4 h-4 text-blue-600" }), a.jsxs("span", { children: ["C\xE1c ca l\xE2m s\xE0ng m\u1EABu minh h\u1ECDa ph\xE1c \u0111\u1ED3 n\xE0y (", Ct.length, " ca):"] })] }), a.jsx("span", { className: "text-[11px] text-slate-500 font-medium", children: "Nh\u1EA5n \u0111\u1EC3 xem ph\xE2n t\xEDch chi ti\u1EBFt & n\u1EA1p v\xE0o b\u1ED9 ph\xE2n t\xEDch" })] }), a.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5", children: Ct.map((et) => a.jsxs("div", { className: "p-3 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-xs transition-all space-y-2 flex flex-col justify-between", children: [a.jsxs("div", { children: [a.jsxs("div", { className: "flex items-center justify-between gap-1", children: [a.jsxs("span", { className: "font-bold text-slate-900 line-clamp-1", children: ["Ca ", et.id, ": ", et.title] }), a.jsx("span", { className: "px-1.5 py-0.2 rounded text-[9px] font-bold bg-blue-100 text-blue-800 shrink-0", children: et.difficulty })] }), a.jsx("p", { className: "text-[11px] text-slate-500 line-clamp-2 mt-1", children: et.patientProfile })] }), a.jsxs("div", { className: "flex items-center justify-between pt-1 border-t border-slate-100 text-[11px]", children: [a.jsxs("button", { onClick: () => gt(et.id), className: "text-blue-600 hover:text-blue-800 font-bold hover:underline cursor-pointer flex items-center space-x-0.5", children: [a.jsx("span", { children: "Xem l\u1EDDi gi\u1EA3i" }), a.jsx(ps, { className: "w-3 h-3" })] }), a.jsxs("button", { onClick: () => O(et.abg), className: "text-indigo-600 hover:text-indigo-800 font-bold hover:underline cursor-pointer flex items-center space-x-0.5", children: [a.jsx(Pe, { className: "w-3 h-3" }), a.jsx("span", { children: "N\u1EA1p ABG" })] })] })] }, et.id)) })] }), a.jsxs("div", { className: "text-[11px] text-slate-500 italic pt-2 border-t border-slate-100", children: ["Tr\xEDch d\u1EABn y v\u0103n: ", C.sourceReference] })] })] }, C.id);
    }) })] }), g === "matrix" && a.jsxs("div", { className: "space-y-4 animate-in fade-in duration-200", children: [a.jsxs("div", { className: "bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-2", children: [a.jsxs("h2", { className: "text-base font-bold text-slate-900 flex items-center space-x-2", children: [a.jsx(om, { className: "w-5 h-5 text-blue-600" }), a.jsx("span", { children: "Ma Tr\u1EADn \u0110\u1ED1i Chi\u1EBFu H\u1ED9i Ch\u1EE9ng Kh\xED M\xE1u \u2022 Ca L\xE2m S\xE0ng \u2022 Ph\xE1c \u0110\u1ED3 X\u1EED Tr\xED" })] }), a.jsx("p", { className: "text-xs text-slate-600 leading-relaxed", children: "B\u1EA3ng \xE1nh x\u1EA1 tr\u1EF1c quan gi\xFAp b\xE1c s\u0129 v\xE0 h\u1ECDc vi\xEAn \u0111\u1ECBnh h\u01B0\u1EDBng ngay ca l\xE2m s\xE0ng minh h\u1ECDa th\u1EF1c t\u1EBF c\xF9ng ph\xE1c \u0111\u1ED3 \u0111i\u1EC1u tr\u1ECB chu\u1EA9n h\xF3a cho t\u1EEBng nh\xF3m b\u1EC7nh sinh." })] }), a.jsx("div", { className: "bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden", children: a.jsx("div", { className: "overflow-x-auto", children: a.jsxs("table", { className: "w-full text-left text-xs border-collapse", children: [a.jsx("thead", { children: a.jsxs("tr", { className: "bg-slate-50 border-b border-slate-200 text-slate-700 font-bold", children: [a.jsx("th", { className: "py-3 px-4 w-1/4", children: "H\u1ED9i Ch\u1EE9ng & B\u1EC7nh Sinh" }), a.jsx("th", { className: "py-3 px-4 w-1/4", children: "\u0110\u1EB7c \u0110i\u1EC3m Kh\xED M\xE1u \u0110i\u1EC3n H\xECnh" }), a.jsx("th", { className: "py-3 px-4 w-1/4", children: "Ca L\xE2m S\xE0ng Minh H\u1ECDa" }), a.jsx("th", { className: "py-3 px-4 w-1/4", children: "Ph\xE1c \u0110\u1ED3 X\u1EED Tr\xED T\u01B0\u01A1ng \u1EE8ng" })] }) }), a.jsx("tbody", { className: "divide-y divide-slate-200", children: cp.map((C, L) => a.jsxs("tr", { className: "hover:bg-blue-50/30 transition-colors", children: [a.jsx("td", { className: "py-3.5 px-4 font-bold text-slate-900 align-top", children: C.syndrome }), a.jsx("td", { className: "py-3.5 px-4 text-slate-600 align-top leading-relaxed", children: C.pattern }), a.jsx("td", { className: "py-3.5 px-4 align-top", children: a.jsx("div", { className: "flex flex-wrap gap-1.5", children: C.cases.map((Y) => a.jsxs("button", { onClick: () => gt(Y), className: "px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white border border-blue-200 text-[11px] font-bold transition-all cursor-pointer", title: `Xem chi ti\u1EBFt Ca ${Y}`, children: ["Ca ", Y] }, Y)) }) }), a.jsx("td", { className: "py-3.5 px-4 align-top", children: a.jsxs("button", { onClick: () => tt(C.protocolId), className: "flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-600 hover:text-white border border-emerald-200 text-[11px] font-bold transition-all cursor-pointer text-left", children: [a.jsx(ca, { className: "w-3.5 h-3.5 shrink-0" }), a.jsx("span", { children: C.protocolTitle })] }) })] }, L)) })] }) }) })] })] });
  };
  var xm = ({ isOpen: u, onClose: O, initialSearchQuery: g = "" }) => {
    const [o, G] = Q.useState(g), [E, R] = Q.useState("T\u1EA5t c\u1EA3"), [Z, D] = Q.useState(null), [H, p] = Q.useState(null);
    Q.useEffect(() => {
      u && g && G(g);
    }, [u, g]), Q.useEffect(() => {
      const T = (U) => {
        U.key === "Escape" && u && O();
      };
      return window.addEventListener("keydown", T), () => window.removeEventListener("keydown", T);
    }, [u, O]);
    const _ = ["T\u1EA5t c\u1EA3", "Ch\u1EC9 s\u1ED1 c\u01A1 b\u1EA3n", "C\xF4ng th\u1EE9c & T\u1EF7 s\u1ED1", "Sinh l\xFD h\u1ECDc", "B\u1EA3ng m\xE3 l\xE2m s\xE0ng", "K\u1EF9 thu\u1EADt x\xE9t nghi\u1EC7m"], P = Q.useMemo(() => Za.filter((T) => {
      const U = E === "T\u1EA5t c\u1EA3" || T.category === E, nt = o.toLowerCase().trim(), ht = nt === "" || T.term.toLowerCase().includes(nt) || T.fullName.toLowerCase().includes(nt) || T.definition.toLowerCase().includes(nt) || T.clinicalSignificance.toLowerCase().includes(nt) || T.tags.some((B) => B.toLowerCase().includes(nt));
      return U && ht;
    }), [o, E]), y = (T) => {
      const U = `${T.term}: ${T.fullName}
${T.normalRange ? `Kho\u1EA3ng tham chi\u1EBFu: ${T.normalRange}
` : ""}${T.definition}
\xDD ngh\u0129a: ${T.clinicalSignificance}`;
      navigator.clipboard.writeText(U), p(T.id), setTimeout(() => p(null), 2e3);
    }, j = (T) => {
      switch (T) {
        case "Ch\u1EC9 s\u1ED1 c\u01A1 b\u1EA3n":
          return "bg-blue-50 text-blue-700 border-blue-200";
        case "C\xF4ng th\u1EE9c & T\u1EF7 s\u1ED1":
          return "bg-indigo-50 text-indigo-700 border-indigo-200";
        case "Sinh l\xFD h\u1ECDc":
          return "bg-emerald-50 text-emerald-700 border-emerald-200";
        case "B\u1EA3ng m\xE3 l\xE2m s\xE0ng":
          return "bg-amber-50 text-amber-800 border-amber-200";
        case "K\u1EF9 thu\u1EADt x\xE9t nghi\u1EC7m":
          return "bg-purple-50 text-purple-700 border-purple-200";
        default:
          return "bg-slate-100 text-slate-700 border-slate-200";
      }
    };
    return u ? a.jsx("div", { id: "glossary-modal-overlay", className: "fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200", onClick: (T) => {
      T.target === T.currentTarget && O();
    }, children: a.jsxs("div", { className: "bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200", children: [a.jsxs("div", { className: "px-6 py-4.5 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white flex items-center justify-between border-b border-indigo-800/50", children: [a.jsxs("div", { className: "flex items-center space-x-3", children: [a.jsx("div", { className: "p-2 bg-blue-500/20 rounded-xl border border-blue-400/30", children: a.jsx(vs, { className: "w-5 h-5 text-blue-300" }) }), a.jsxs("div", { children: [a.jsxs("div", { className: "flex items-center space-x-2", children: [a.jsx("h2", { className: "text-lg font-bold tracking-tight", children: "T\u1EEB \u0110i\u1EC3n Thu\u1EADt Ng\u1EEF & Vi\u1EBFt T\u1EAFt Kh\xED M\xE1u \u0110\u1ED9ng M\u1EA1ch" }), a.jsx("span", { className: "px-2 py-0.5 text-[10px] font-bold uppercase bg-blue-500/30 text-blue-200 rounded-full border border-blue-400/30", children: "ABG Glossary" })] }), a.jsx("p", { className: "text-xs text-blue-200", children: "Tra c\u1EE9u nhanh c\xE1c ch\u1EC9 s\u1ED1, t\u1EF7 s\u1ED1 sinh l\xFD, c\xF4ng th\u1EE9c to\xE1n h\u1ECDc v\xE0 b\u1EA3ng m\xE3 l\xE2m s\xE0ng c\u1ED1t t\u1EED" })] })] }), a.jsx("button", { onClick: O, className: "p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors", title: "\u0110\xF3ng t\u1EEB \u0111i\u1EC3n (Esc)", children: a.jsx(Qh, { className: "w-5 h-5" }) })] }), a.jsxs("div", { className: "p-4 border-b border-slate-200 bg-slate-50/80 space-y-3", children: [a.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 items-center justify-between", children: [a.jsxs("div", { className: "relative w-full", children: [a.jsx(ys, { className: "w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" }), a.jsx("input", { id: "glossary-search-input", type: "text", value: o, onChange: (T) => G(T.target.value), placeholder: "T\xECm thu\u1EADt ng\u1EEF, ch\u1EEF vi\u1EBFt t\u1EAFt (PaCO2, Anion Gap, BE, P/F, Winter, Lactate...)", className: "w-full pl-10 pr-9 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-slate-400", autoFocus: true }), o && a.jsx("button", { onClick: () => G(""), className: "absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600", children: a.jsx(Qh, { className: "w-4 h-4" }) })] }), a.jsxs("div", { className: "text-xs font-semibold text-slate-500 whitespace-nowrap self-end sm:self-center", children: ["T\xECm th\u1EA5y ", a.jsx("strong", { className: "text-blue-700", children: P.length }), " / ", Za.length, " m\u1EE5c"] })] }), a.jsx("div", { className: "flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin", children: _.map((T) => a.jsx("button", { onClick: () => R(T), className: `px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${E === T ? "bg-blue-600 text-white shadow-xs" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"}`, children: T }, T)) })] }), a.jsx("div", { className: "flex-1 overflow-y-auto p-4 space-y-3 max-h-[calc(90vh-190px)] divide-y divide-slate-100", children: P.length === 0 ? a.jsxs("div", { className: "text-center py-12 space-y-3", children: [a.jsx("div", { className: "w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400", children: a.jsx(Je, { className: "w-6 h-6" }) }), a.jsxs("div", { className: "text-slate-700 font-semibold text-sm", children: ["Kh\xF4ng t\xECm th\u1EA5y thu\u1EADt ng\u1EEF ph\xF9 h\u1EE3p v\u1EDBi t\u1EEB kh\xF3a \u201C", o, "\u201D"] }), a.jsx("p", { className: "text-xs text-slate-500 max-w-sm mx-auto", children: "Th\u1EED t\xECm b\u1EB1ng ch\u1EEF vi\u1EBFt t\u1EAFt qu\u1ED1c t\u1EBF (nh\u01B0 pH, PaCO2, AG, BE, ARDS, Winter) ho\u1EB7c ch\u1ECDn danh m\u1EE5c kh\xE1c." }), a.jsx("button", { onClick: () => {
      G(""), R("T\u1EA5t c\u1EA3");
    }, className: "px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100", children: "X\xF3a b\u1ED9 l\u1ECDc t\xECm ki\u1EBFm" })] }) : P.map((T) => {
      const U = Z === T.id, nt = H === T.id;
      return a.jsx("div", { className: "pt-3 first:pt-0 group rounded-xl hover:bg-slate-50/70 p-3 transition-colors border border-transparent hover:border-slate-200", children: a.jsxs("div", { className: "space-y-2", children: [a.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-2", children: [a.jsxs("div", { className: "space-y-0.5", children: [a.jsxs("div", { className: "flex items-center space-x-2", children: [a.jsx("h3", { className: "text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors", children: T.term }), a.jsx("span", { className: `px-2 py-0.5 rounded-md text-[10px] font-bold border ${j(T.category)}`, children: T.category })] }), a.jsx("p", { className: "text-xs text-slate-600 font-medium", children: T.fullName })] }), a.jsxs("div", { className: "flex items-center space-x-1.5", children: [a.jsx("button", { onClick: () => y(T), className: "p-1.5 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-200/60 transition-colors", title: "Sao ch\xE9p n\u1ED9i dung thu\u1EADt ng\u1EEF", children: nt ? a.jsx(Zl, { className: "w-4 h-4 text-emerald-600" }) : a.jsx(Ns, { className: "w-4 h-4" }) }), a.jsxs("button", { onClick: () => D(U ? null : T.id), className: "flex items-center space-x-1 text-xs text-slate-500 hover:text-slate-800 font-semibold px-2 py-1 rounded-md hover:bg-slate-200/50 transition-colors", children: [a.jsx("span", { children: U ? "Thu g\u1ECDn" : "Chi ti\u1EBFt" }), U ? a.jsx(Ql, { className: "w-3.5 h-3.5" }) : a.jsx(Xl, { className: "w-3.5 h-3.5" })] })] })] }), T.normalRange && a.jsxs("div", { className: "inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-[11px] text-slate-700 border border-slate-200/80 font-mono", children: [a.jsx("span", { className: "text-slate-500 font-sans font-semibold", children: "Kho\u1EA3ng tham chi\u1EBFu:" }), a.jsx("strong", { className: "text-slate-900 font-bold", children: T.normalRange })] }), a.jsx("p", { className: "text-xs text-slate-700 leading-relaxed", children: T.definition }), U && a.jsxs("div", { className: "mt-3 pt-3 border-t border-slate-200 space-y-2.5 text-xs bg-slate-50/50 p-3 rounded-xl", children: [a.jsxs("div", { className: "space-y-1", children: [a.jsxs("strong", { className: "text-slate-900 flex items-center space-x-1.5 font-bold", children: [a.jsx(xn, { className: "w-3.5 h-3.5 text-blue-600" }), a.jsx("span", { children: "\xDD ngh\u0129a l\xE2m s\xE0ng & \u1EE8ng d\u1EE5ng:" })] }), a.jsx("p", { className: "text-slate-700 whitespace-pre-line leading-relaxed pl-5", children: T.clinicalSignificance })] }), T.pearlsAndWarnings && a.jsxs("div", { className: "p-3 rounded-lg bg-rose-50/80 border border-rose-200 space-y-1", children: [a.jsxs("div", { className: "text-rose-950 font-bold flex items-center space-x-1.5", children: [a.jsx(pn, { className: "w-3.5 h-3.5 text-rose-600" }), a.jsx("span", { children: "C\u1EA1m b\u1EABy & L\u01B0u \xFD c\u1ED1t t\u1EED:" })] }), a.jsx("p", { className: "text-rose-900 leading-relaxed font-medium pl-5 whitespace-pre-line", children: T.pearlsAndWarnings })] }), a.jsxs("div", { className: "flex flex-wrap items-center gap-1 pt-1", children: [a.jsx("span", { className: "text-[10px] text-slate-400", children: "T\u1EEB kh\xF3a:" }), T.tags.map((ht) => a.jsxs("span", { onClick: () => G(ht), className: "px-2 py-0.5 rounded text-[10px] font-medium bg-slate-200/70 text-slate-700 hover:bg-blue-100 hover:text-blue-800 cursor-pointer transition-colors", children: ["#", ht] }, ht))] })] })] }) }, T.id);
    }) }), a.jsxs("div", { className: "px-6 py-3 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500", children: [a.jsxs("div", { className: "flex items-center space-x-1", children: [a.jsx("span", { children: "Nh\u1EA5n" }), a.jsx("kbd", { className: "px-1.5 py-0.5 text-[10px] font-mono bg-white border border-slate-300 rounded shadow-2xs text-slate-700", children: "Esc" }), a.jsx("span", { children: "ho\u1EB7c b\u1EA5m ra ngo\xE0i \u0111\u1EC3 \u0111\xF3ng" })] }), a.jsxs("div", { className: "font-semibold text-slate-700", children: ["Tr\xEDch t\u1EEB ", a.jsx("em", { children: "Arterial Blood Gases Made Easy" }), " & ", a.jsx("em", { children: "Donna Pierre" })] })] })] }) }) : null;
  };
  var hp = ({ input: u, setInput: O, onOpenGlossary: g }) => {
    const [o, G] = Q.useState("diagnosis"), [E, R] = Q.useState(true), [Z, D] = Q.useState("core"), [H, p] = Q.useState(false), [_, P] = Q.useState(false), y = Q.useMemo(() => vm(u), [u]), j = (B, tt, gt, C, L = 1) => {
      O((Y) => {
        let et = (Y[B] ?? 0) + tt;
        gt !== void 0 && et < gt && (et = gt), C !== void 0 && et > C && (et = C);
        const St = Math.pow(10, L);
        return et = Math.round(et * St) / St, { ...Y, [B]: et };
      });
    }, T = (B) => {
      B !== u.unit && O((tt) => {
        const gt = B === "kPa" ? Fh : js;
        return { ...tt, unit: B, pCO2: Math.round(tt.pCO2 * gt * 10) / 10, pO2: Math.round(tt.pO2 * gt * 10) / 10 };
      });
    }, U = (B) => {
      O((tt) => ({ ...tt, ...B }));
    }, nt = () => {
      const B = `[ABG PRO MOBILE] B\xC1O C\xC1O NHANH KH\xCD M\xC1U \u0110\u1ED8NG M\u1EA0CH:
\u2022 Th\xF4ng s\u1ED1: pH ${u.pH} | PaCO2 ${u.pCO2} ${u.unit} | PaO2 ${u.pO2} ${u.unit} | HCO3- ${u.hco3} mmol/L | BE ${u.be} | SaO2 ${u.sao2}% | FiO2 ${u.fio2}%
1. TRAO \u0110\u1ED4I KH\xCD: ${y.gasExchange.title}
   - P/F: ${y.calculations.pfRatio} (${y.calculations.pfClass}) | A-a: ${y.calculations.aaGradient} mmHg
2. TOAN KI\u1EC0M: ${y.acidBase.title}
   - [H+]: ${y.calculations.hIonNmol} nmol/L | B\xF9 tr\u1EEB: ${y.acidBase.compensation}
3. ANION GAP: ${y.calculations.anionGap ?? "Ch\u01B0a nh\u1EADp Na/Cl"} mmol/L ${y.calculations.deltaRatio ? `| T\u1EF7 s\u1ED1 Delta: ${y.calculations.deltaRatio} (${y.calculations.deltaRatioInterpretation})` : ""}
4. H\u01AF\u1EDANG X\u1EEC TR\xCD: ${y.treatmentProtocols.summary}`;
      navigator.clipboard.writeText(B), p(true), setTimeout(() => p(false), 2e3);
    }, ht = [{ name: "Kh\u1ECFe m\u1EA1nh (Normal)", desc: "pH 7.40, PaCO2 40, PaO2 95, HCO3 24", data: { ...u, pH: 7.4, pCO2: 40, pO2: 95, hco3: 24, be: 0, sao2: 98, fio2: 21, na: 140, cl: 100, k: 4, albumin: 4 } }, { name: "Vi\xEAm ph\u1ED5i (Type 1)", desc: "pH 7.50, PaCO2 28.1, PaO2 58, FiO2 21%", data: { ...u, pH: 7.5, pCO2: 28.1, pO2: 57.8, hco3: 23.9, be: -0.5, sao2: 89, fio2: 21, na: 138, cl: 99 } }, { name: "\u0110\u1EE3t c\u1EA5p COPD (Type 2 M\u1EA1n)", desc: "pH 7.37, PaCO2 64, PaO2 58, HCO3 36.5", data: { ...u, pH: 7.37, pCO2: 64, pO2: 58, hco3: 36.5, be: 8.9, sao2: 88, fio2: 21, na: 139, cl: 102 } }, { name: "DKA Nhi\u1EC5m toan Ceton \u0110T\u0110", desc: "pH 7.05, PaCO2 11, HCO3 6, AG 39 (T\u0103ng r\u1EA5t cao)", data: { ...u, pH: 7.05, pCO2: 11, pO2: 187, hco3: 6, be: -25.2, sao2: 99, fio2: 60, na: 141, cl: 96, k: 4.6 } }, { name: "S\u1ED1c nhi\u1EC5m khu\u1EA9n (Toan Lactic)", desc: "pH 7.36, PaCO2 31.5, HCO3 17.3, Lactate 5.1", data: { ...u, pH: 7.36, pCO2: 31.5, pO2: 203, hco3: 17.3, be: -6.9, sao2: 100, fio2: 60, na: 140, cl: 101, lactate: 5.1 } }, { name: "Ki\u1EC1m chuy\u1EC3n h\xF3a do n\xF4n", desc: "pH 7.44, PaCO2 48, HCO3 32, h\u1EA1 Cl v\xE0 K", data: { ...u, pH: 7.44, pCO2: 48, pO2: 83, hco3: 32, be: 4, sao2: 96, fio2: 21, na: 133, cl: 91, k: 3 } }];
    return a.jsxs("div", { className: "min-h-screen bg-slate-100 text-slate-900 pb-24 font-sans select-none sm:select-auto", children: [a.jsxs("div", { className: "sticky top-0 z-40 bg-slate-900 text-white shadow-md border-b border-slate-800", children: [a.jsxs("div", { className: "px-3.5 py-2.5 flex items-center justify-between", children: [a.jsxs("div", { className: "flex items-center space-x-2", children: [a.jsx("div", { className: "w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white shadow-xs", children: a.jsx(bs, { className: "w-4 h-4 text-rose-300" }) }), a.jsxs("div", { children: [a.jsxs("div", { className: "flex items-center space-x-1.5", children: [a.jsx("span", { className: "font-extrabold text-sm tracking-tight", children: "ABG Pro" }), a.jsx("span", { className: "px-1.5 py-0.2 text-[9px] font-bold bg-blue-500/30 text-blue-200 border border-blue-400/40 rounded", children: "MOBILE" })] }), a.jsx("p", { className: "text-[10px] text-slate-400 leading-none", children: "Ch\u1EA1m nhanh 1 tay" })] })] }), a.jsxs("div", { className: "flex items-center space-x-1.5", children: [a.jsx("button", { onClick: () => T(u.unit === "mmHg" ? "kPa" : "mmHg"), className: "px-2 py-1 rounded-md text-[11px] font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 active:scale-95 transition-all", title: "\u0110\u1ED5i \u0111\u01A1n v\u1ECB \xE1p su\u1EA5t", children: u.unit }), a.jsxs("button", { onClick: () => P(true), className: "px-2 py-1 rounded-md text-[11px] font-bold bg-indigo-600/40 hover:bg-indigo-600/60 text-indigo-200 border border-indigo-500/40 active:scale-95 transition-all flex items-center space-x-1", children: [a.jsx(Pe, { className: "w-3 h-3 text-amber-300" }), a.jsx("span", { children: "Ca m\u1EABu" })] })] })] }), a.jsxs("div", { className: "bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-900 px-3.5 py-2.5 border-t border-slate-800", children: [a.jsxs("div", { className: "flex items-center justify-between", children: [a.jsxs("div", { className: "flex items-center space-x-1.5 text-[11px] font-bold text-indigo-300 uppercase tracking-wider", children: [a.jsx(xn, { className: "w-3.5 h-3.5 text-rose-400 animate-pulse" }), a.jsx("span", { children: "Ch\u1EA9n \u0110o\xE1n T\u1EE9c Th\xEC:" })] }), a.jsxs("div", { className: "flex items-center space-x-2", children: [a.jsxs("button", { onClick: nt, className: "text-[10px] font-bold text-indigo-200 hover:text-white flex items-center space-x-1 bg-white/10 px-2 py-0.5 rounded border border-white/10 active:scale-95", children: [H ? a.jsx(Zl, { className: "w-3 h-3 text-emerald-400" }) : a.jsx(Ns, { className: "w-3 h-3" }), a.jsx("span", { children: H ? "\u0110\xE3 ch\xE9p" : "Sao ch\xE9p" })] }), a.jsxs("button", { onClick: () => R(!E), className: "text-[10px] font-bold text-blue-300 hover:text-blue-100 flex items-center space-x-0.5 bg-blue-500/20 px-2 py-0.5 rounded border border-blue-400/30", children: [a.jsx("span", { children: E ? "\u1EA8n ph\xEDm s\u1ED1" : "M\u1EDF ph\xEDm s\u1ED1" }), E ? a.jsx(Ql, { className: "w-3 h-3" }) : a.jsx(Xl, { className: "w-3 h-3" })] })] })] }), a.jsxs("div", { className: "mt-1 space-y-1", children: [a.jsxs("div", { className: "flex items-start justify-between gap-2", children: [a.jsx("div", { className: "text-xs font-extrabold text-white leading-tight", children: y.acidBase.title }), a.jsx("span", { className: `px-1.5 py-0.2 rounded text-[10px] font-bold shrink-0 ${y.acidBase.acidaemiaStatus === "acidaemia" ? "bg-rose-500/30 text-rose-200 border border-rose-400/40" : y.acidBase.acidaemiaStatus === "alkalaemia" ? "bg-purple-500/30 text-purple-200 border border-purple-400/40" : "bg-emerald-500/30 text-emerald-200 border border-emerald-400/40"}`, children: y.acidBase.compensation })] }), a.jsxs("div", { className: "flex items-center justify-between text-[11px] text-blue-200", children: [a.jsx("span", { className: "truncate pr-2", children: y.gasExchange.title }), a.jsxs("span", { className: "font-bold text-amber-300 shrink-0", children: ["P/F: ", y.calculations.pfRatio] })] })] })] })] }), E && a.jsxs("div", { className: "bg-white border-b border-slate-300 shadow-sm p-3 space-y-2.5 animate-in slide-in-from-top-3 duration-200", children: [a.jsxs("div", { className: "flex items-center justify-between", children: [a.jsxs("div", { className: "flex items-center space-x-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs", children: [a.jsx("button", { onClick: () => D("core"), className: `px-3 py-1 font-bold rounded-md transition-all ${Z === "core" ? "bg-blue-600 text-white shadow-2xs" : "text-slate-600 hover:text-slate-900"}`, children: "Kh\xED M\xE1u \u0110M (Core)" }), a.jsxs("button", { onClick: () => D("labs"), className: `px-3 py-1 font-bold rounded-md transition-all flex items-center space-x-1 ${Z === "labs" ? "bg-indigo-600 text-white shadow-2xs" : "text-slate-600 hover:text-slate-900"}`, children: [a.jsx("span", { children: "\u0110i\u1EC7n Gi\u1EA3i & Labs" }), a.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-amber-400" })] })] }), a.jsxs("button", { onClick: () => O({ unit: "mmHg", pH: 7.4, pCO2: 40, pO2: 95, hco3: 24, be: 0, sao2: 98, fio2: 21, na: 140, cl: 100, k: 4, albumin: 4 }), className: "text-[11px] text-slate-500 hover:text-slate-900 font-semibold flex items-center space-x-0.5", children: [a.jsx(fs, { className: "w-3 h-3" }), a.jsx("span", { children: "Reset" })] })] }), Z === "core" && a.jsxs("div", { className: "space-y-2", children: [a.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [a.jsxs("div", { className: "bg-slate-50 p-2 rounded-xl border border-slate-200 flex flex-col justify-between", children: [a.jsxs("div", { className: "flex items-center justify-between text-[11px] font-bold text-slate-600", children: [a.jsx("span", { children: "pH M\xE1u" }), a.jsx("span", { className: "text-[10px] text-slate-400", children: "7.35-7.45" })] }), a.jsxs("div", { className: "flex items-center justify-between mt-1", children: [a.jsx("button", { onClick: () => j("pH", -0.02, 6.5, 8, 2), className: "w-8 h-8 rounded-lg bg-white border border-slate-300 text-slate-700 flex items-center justify-center font-bold text-base shadow-2xs active:bg-blue-50 active:border-blue-500 active:scale-95", children: a.jsx(ds, { className: "w-3.5 h-3.5" }) }), a.jsx("input", { type: "number", step: "0.01", value: u.pH, onChange: (B) => O({ ...u, pH: parseFloat(B.target.value) || 7.4 }), className: "w-16 text-center text-base font-extrabold text-blue-700 bg-transparent border-0 focus:ring-0 p-0" }), a.jsx("button", { onClick: () => j("pH", 0.02, 6.5, 8, 2), className: "w-8 h-8 rounded-lg bg-white border border-slate-300 text-slate-700 flex items-center justify-center font-bold text-base shadow-2xs active:bg-blue-50 active:border-blue-500 active:scale-95", children: a.jsx(ms, { className: "w-3.5 h-3.5" }) })] }), a.jsxs("div", { className: "text-[9px] text-center text-slate-400 mt-0.5", children: ["[H\u207A]: ~", y.calculations.hIonNmol, " nmol/L"] })] }), a.jsxs("div", { className: "bg-slate-50 p-2 rounded-xl border border-slate-200 flex flex-col justify-between", children: [a.jsxs("div", { className: "flex items-center justify-between text-[11px] font-bold text-slate-600", children: [a.jsxs("span", { children: ["PaCO\u2082 (", u.unit, ")"] }), a.jsx("span", { className: "text-[10px] text-slate-400", children: u.unit === "mmHg" ? "35-45" : "4.7-6.0" })] }), a.jsxs("div", { className: "flex items-center justify-between mt-1", children: [a.jsx("button", { onClick: () => j("pCO2", u.unit === "kPa" ? -0.2 : -1, 0, 200, u.unit === "kPa" ? 1 : 0), className: "w-8 h-8 rounded-lg bg-white border border-slate-300 text-slate-700 flex items-center justify-center font-bold text-base shadow-2xs active:bg-blue-50 active:border-blue-500 active:scale-95", children: a.jsx(ds, { className: "w-3.5 h-3.5" }) }), a.jsx("input", { type: "number", step: u.unit === "kPa" ? "0.1" : "1", value: u.pCO2, onChange: (B) => O({ ...u, pCO2: parseFloat(B.target.value) || 0 }), className: "w-16 text-center text-base font-extrabold text-blue-700 bg-transparent border-0 focus:ring-0 p-0" }), a.jsx("button", { onClick: () => j("pCO2", u.unit === "kPa" ? 0.2 : 1, 0, 200, u.unit === "kPa" ? 1 : 0), className: "w-8 h-8 rounded-lg bg-white border border-slate-300 text-slate-700 flex items-center justify-center font-bold text-base shadow-2xs active:bg-blue-50 active:border-blue-500 active:scale-95", children: a.jsx(ms, { className: "w-3.5 h-3.5" }) })] }), a.jsx("div", { className: "text-[9px] text-center text-slate-400 mt-0.5", children: u.unit === "mmHg" ? `${y.calculations.paco2Kpa} kPa` : `${y.calculations.paco2MmHg} mmHg` })] }), a.jsxs("div", { className: "bg-slate-50 p-2 rounded-xl border border-slate-200 flex flex-col justify-between", children: [a.jsxs("div", { className: "flex items-center justify-between text-[11px] font-bold text-slate-600", children: [a.jsxs("span", { children: ["PaO\u2082 (", u.unit, ")"] }), a.jsx("span", { className: "text-[10px] text-slate-400", children: u.unit === "mmHg" ? ">80" : ">10.6" })] }), a.jsxs("div", { className: "flex items-center justify-between mt-1", children: [a.jsx("button", { onClick: () => j("pO2", u.unit === "kPa" ? -0.5 : -2, 0, 600, u.unit === "kPa" ? 1 : 0), className: "w-8 h-8 rounded-lg bg-white border border-slate-300 text-slate-700 flex items-center justify-center font-bold text-base shadow-2xs active:bg-blue-50 active:border-blue-500 active:scale-95", children: a.jsx(ds, { className: "w-3.5 h-3.5" }) }), a.jsx("input", { type: "number", step: u.unit === "kPa" ? "0.1" : "1", value: u.pO2, onChange: (B) => O({ ...u, pO2: parseFloat(B.target.value) || 0 }), className: "w-16 text-center text-base font-extrabold text-blue-700 bg-transparent border-0 focus:ring-0 p-0" }), a.jsx("button", { onClick: () => j("pO2", u.unit === "kPa" ? 0.5 : 2, 0, 600, u.unit === "kPa" ? 1 : 0), className: "w-8 h-8 rounded-lg bg-white border border-slate-300 text-slate-700 flex items-center justify-center font-bold text-base shadow-2xs active:bg-blue-50 active:border-blue-500 active:scale-95", children: a.jsx(ms, { className: "w-3.5 h-3.5" }) })] }), a.jsx("div", { className: "text-[9px] text-center text-slate-400 mt-0.5", children: u.unit === "mmHg" ? `${y.calculations.pao2Kpa} kPa` : `${y.calculations.pao2MmHg} mmHg` })] }), a.jsxs("div", { className: "bg-slate-50 p-2 rounded-xl border border-slate-200 flex flex-col justify-between", children: [a.jsxs("div", { className: "flex items-center justify-between text-[11px] font-bold text-slate-600", children: [a.jsx("span", { children: "HCO\u2083\u207B (mmol/L)" }), a.jsx("span", { className: "text-[10px] text-slate-400", children: "22-26" })] }), a.jsxs("div", { className: "flex items-center justify-between mt-1", children: [a.jsx("button", { onClick: () => j("hco3", -1, 0, 80, 1), className: "w-8 h-8 rounded-lg bg-white border border-slate-300 text-slate-700 flex items-center justify-center font-bold text-base shadow-2xs active:bg-blue-50 active:border-blue-500 active:scale-95", children: a.jsx(ds, { className: "w-3.5 h-3.5" }) }), a.jsx("input", { type: "number", step: "0.5", value: u.hco3, onChange: (B) => O({ ...u, hco3: parseFloat(B.target.value) || 0 }), className: "w-16 text-center text-base font-extrabold text-blue-700 bg-transparent border-0 focus:ring-0 p-0" }), a.jsx("button", { onClick: () => j("hco3", 1, 0, 80, 1), className: "w-8 h-8 rounded-lg bg-white border border-slate-300 text-slate-700 flex items-center justify-center font-bold text-base shadow-2xs active:bg-blue-50 active:border-blue-500 active:scale-95", children: a.jsx(ms, { className: "w-3.5 h-3.5" }) })] }), a.jsx("div", { className: "text-[9px] text-center text-slate-400 mt-0.5", children: "Bicarbonate huy\u1EBFt t\u01B0\u01A1ng" })] })] }), a.jsxs("div", { className: "pt-1.5 border-t border-slate-100 flex items-center justify-between gap-1 overflow-x-auto text-[11px]", children: [a.jsx("span", { className: "font-bold text-slate-600 whitespace-nowrap", children: "FiO\u2082:" }), [21, 28, 40, 60, 100].map((B) => a.jsxs("button", { onClick: () => O({ ...u, fio2: B }), className: `px-2 py-1 rounded-md font-bold whitespace-nowrap transition-all ${u.fio2 === B ? "bg-blue-600 text-white shadow-2xs" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`, children: [B, "% ", B === 21 ? "(Kh\xED tr\u1EDDi)" : ""] }, B))] })] }), Z === "labs" && a.jsxs("div", { className: "space-y-2", children: [a.jsx("div", { className: "text-[10px] text-indigo-900 bg-indigo-50/70 p-1.5 rounded-lg border border-indigo-100", children: "* Nh\u1EADp Na\u207A & Cl\u207B \u0111\u1EC3 t\u1EF1 \u0111\u1ED9ng k\xEDch ho\u1EA1t b\u1ED9 t\xEDnh to\xE1n Anion Gap v\xE0 t\u1EF7 s\u1ED1 Delta/Delta." }), a.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [a.jsxs("div", { className: "bg-slate-50 p-2 rounded-xl border border-slate-200", children: [a.jsx("div", { className: "text-[10px] font-bold text-slate-600", children: "Na\u207A (mmol/L)" }), a.jsxs("div", { className: "flex items-center justify-between mt-1", children: [a.jsx("button", { onClick: () => j("na", -1, 100, 180, 0), className: "w-7 h-7 rounded bg-white border border-slate-300 flex items-center justify-center text-xs font-bold active:scale-95", children: "-" }), a.jsx("input", { type: "number", value: u.na ?? "", placeholder: "140", onChange: (B) => O({ ...u, na: B.target.value ? parseFloat(B.target.value) : void 0 }), className: "w-14 text-center font-bold text-sm bg-transparent border-0 focus:ring-0 p-0" }), a.jsx("button", { onClick: () => j("na", 1, 100, 180, 0), className: "w-7 h-7 rounded bg-white border border-slate-300 flex items-center justify-center text-xs font-bold active:scale-95", children: "+" })] })] }), a.jsxs("div", { className: "bg-slate-50 p-2 rounded-xl border border-slate-200", children: [a.jsx("div", { className: "text-[10px] font-bold text-slate-600", children: "Cl\u207B (mmol/L)" }), a.jsxs("div", { className: "flex items-center justify-between mt-1", children: [a.jsx("button", { onClick: () => j("cl", -1, 60, 140, 0), className: "w-7 h-7 rounded bg-white border border-slate-300 flex items-center justify-center text-xs font-bold active:scale-95", children: "-" }), a.jsx("input", { type: "number", value: u.cl ?? "", placeholder: "100", onChange: (B) => O({ ...u, cl: B.target.value ? parseFloat(B.target.value) : void 0 }), className: "w-14 text-center font-bold text-sm bg-transparent border-0 focus:ring-0 p-0" }), a.jsx("button", { onClick: () => j("cl", 1, 60, 140, 0), className: "w-7 h-7 rounded bg-white border border-slate-300 flex items-center justify-center text-xs font-bold active:scale-95", children: "+" })] })] }), a.jsxs("div", { className: "bg-slate-50 p-2 rounded-xl border border-slate-200", children: [a.jsx("div", { className: "text-[10px] font-bold text-slate-600", children: "K\u207A (mmol/L)" }), a.jsxs("div", { className: "flex items-center justify-between mt-1", children: [a.jsx("button", { onClick: () => j("k", -0.1, 1, 10, 1), className: "w-7 h-7 rounded bg-white border border-slate-300 flex items-center justify-center text-xs font-bold active:scale-95", children: "-" }), a.jsx("input", { type: "number", step: "0.1", value: u.k ?? "", placeholder: "4.0", onChange: (B) => O({ ...u, k: B.target.value ? parseFloat(B.target.value) : void 0 }), className: "w-14 text-center font-bold text-sm bg-transparent border-0 focus:ring-0 p-0" }), a.jsx("button", { onClick: () => j("k", 0.1, 1, 10, 1), className: "w-7 h-7 rounded bg-white border border-slate-300 flex items-center justify-center text-xs font-bold active:scale-95", children: "+" })] })] }), a.jsxs("div", { className: "bg-slate-50 p-2 rounded-xl border border-slate-200", children: [a.jsx("div", { className: "text-[10px] font-bold text-slate-600", children: "Albumin (g/dL)" }), a.jsxs("div", { className: "flex items-center justify-between mt-1", children: [a.jsx("button", { onClick: () => j("albumin", -0.2, 0.5, 7, 1), className: "w-7 h-7 rounded bg-white border border-slate-300 flex items-center justify-center text-xs font-bold active:scale-95", children: "-" }), a.jsx("input", { type: "number", step: "0.1", value: u.albumin ?? "", placeholder: "4.0", onChange: (B) => O({ ...u, albumin: B.target.value ? parseFloat(B.target.value) : void 0 }), className: "w-14 text-center font-bold text-sm bg-transparent border-0 focus:ring-0 p-0" }), a.jsx("button", { onClick: () => j("albumin", 0.2, 0.5, 7, 1), className: "w-7 h-7 rounded bg-white border border-slate-300 flex items-center justify-center text-xs font-bold active:scale-95", children: "+" })] })] })] })] })] }), a.jsxs("div", { className: "p-3.5 space-y-4", children: [o === "diagnosis" && a.jsxs("div", { className: "space-y-3 animate-in fade-in duration-150", children: [y.criticalWarnings.length > 0 && a.jsxs("div", { className: "bg-rose-50 border border-rose-300 rounded-xl p-3 space-y-1", children: [a.jsxs("div", { className: "flex items-center space-x-1.5 text-xs font-bold text-rose-800", children: [a.jsx(pn, { className: "w-4 h-4 text-rose-600 shrink-0" }), a.jsx("span", { children: "C\u1EA3nh b\xE1o nguy k\u1ECBch:" })] }), a.jsx("ul", { className: "text-xs text-rose-900 space-y-0.5 pl-5 list-disc font-medium", children: y.criticalWarnings.map((B, tt) => a.jsx("li", { children: B }, tt)) })] }), a.jsxs("div", { className: "bg-white rounded-xl border border-blue-200 p-3.5 shadow-2xs space-y-2", children: [a.jsxs("div", { className: "flex items-center space-x-2 text-xs font-bold text-blue-800 uppercase tracking-wider", children: [a.jsx(Ja, { className: "w-4 h-4 text-blue-600" }), a.jsx("span", { children: "1. Trao \u0110\u1ED5i Kh\xED Ph\u1ED5i" })] }), a.jsx("div", { className: "text-sm font-bold text-slate-900 leading-snug", children: y.gasExchange.title }), a.jsx("p", { className: "text-xs text-slate-600", children: y.gasExchange.description }), a.jsxs("div", { className: "flex flex-wrap items-center gap-1.5 pt-1", children: [a.jsxs("span", { className: "px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800", children: ["P/F: ", y.calculations.pfRatio] }), a.jsxs("span", { className: "px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700", children: ["A-a: ", y.calculations.aaGradient, " mmHg"] }), y.gasExchange.severity !== "normal" && a.jsx("span", { className: "px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800", children: y.gasExchange.severity.toUpperCase() })] })] }), a.jsxs("div", { className: "bg-white rounded-xl border border-emerald-200 p-3.5 shadow-2xs space-y-2", children: [a.jsxs("div", { className: "flex items-center space-x-2 text-xs font-bold text-emerald-800 uppercase tracking-wider", children: [a.jsx(xn, { className: "w-4 h-4 text-emerald-600" }), a.jsx("span", { children: "2. Th\u0103ng B\u1EB1ng Toan Ki\u1EC1m" })] }), a.jsx("div", { className: "text-sm font-bold text-slate-900 leading-snug", children: y.acidBase.title }), a.jsx("p", { className: "text-xs text-slate-600", children: y.acidBase.description }), a.jsxs("div", { className: "flex flex-wrap items-center gap-1.5 pt-1", children: [a.jsx("span", { className: `px-2 py-0.5 rounded-full text-[10px] font-bold ${y.acidBase.acidaemiaStatus === "acidaemia" ? "bg-rose-100 text-rose-800" : y.acidBase.acidaemiaStatus === "alkalaemia" ? "bg-purple-100 text-purple-800" : "bg-emerald-100 text-emerald-800"}`, children: y.acidBase.acidaemiaStatus === "acidaemia" ? "Toan m\xE1u" : y.acidBase.acidaemiaStatus === "alkalaemia" ? "Ki\u1EC1m m\xE1u" : "pH B\xECnh th\u01B0\u1EDDng" }), a.jsx("span", { className: "px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700", children: y.acidBase.compensation })] })] }), a.jsxs("div", { className: "grid grid-cols-2 gap-2 text-xs", children: [a.jsxs("div", { className: "bg-white p-2.5 rounded-xl border border-slate-200", children: [a.jsx("span", { className: "text-[10px] text-slate-500 block", children: "N\u1ED3ng \u0111\u1ED9 [H\u207A]" }), a.jsxs("strong", { className: "text-sm text-slate-900", children: [y.calculations.hIonNmol, " nmol/L"] }), a.jsx("span", { className: "text-[10px] text-slate-400 block", children: "Chu\u1EA9n: 35-45" })] }), a.jsxs("div", { className: "bg-white p-2.5 rounded-xl border border-slate-200", children: [a.jsx("span", { className: "text-[10px] text-slate-500 block", children: "PaCO\u2082 K\u1EF3 V\u1ECDng (Winter)" }), a.jsx("strong", { className: "text-sm text-slate-900", children: y.calculations.expectedPaco2Winter ? `${y.calculations.expectedPaco2Winter.min} - ${y.calculations.expectedPaco2Winter.max}` : "N/A" }), a.jsx("span", { className: "text-[10px] text-slate-400 block", children: "B\xF9 toan chuy\u1EC3n h\xF3a" })] })] }), a.jsxs("button", { onClick: () => G("anion-gap"), className: "w-full py-2.5 px-3 bg-gradient-to-r from-indigo-50 to-blue-50 hover:bg-indigo-100 border border-indigo-200 rounded-xl text-xs font-bold text-indigo-900 flex items-center justify-between shadow-2xs", children: [a.jsxs("div", { className: "flex items-center space-x-2", children: [a.jsx(Yh, { className: "w-4 h-4 text-indigo-600" }), a.jsx("span", { children: "M\u1EDF M\xE1y T\xEDnh Anion Gap & T\u1EF7 S\u1ED1 Delta" })] }), a.jsx(ps, { className: "w-3.5 h-3.5 text-indigo-500" })] })] }), o === "anion-gap" && a.jsx("div", { className: "space-y-3 animate-in fade-in duration-150", children: a.jsx(Nm, { na: u.na, cl: u.cl, hco3: u.hco3, k: u.k, albumin: u.albumin, onUpdateLabs: U }) }), o === "steps" && a.jsxs("div", { className: "space-y-2.5 animate-in fade-in duration-150", children: [a.jsxs("div", { className: "bg-white p-3 rounded-xl border border-slate-200 shadow-2xs", children: [a.jsx("h3", { className: "text-xs font-bold text-slate-900", children: "Quy Tr\xECnh 6 B\u01B0\u1EDBc \u0110\u1ECDc ABG Chu\u1EA9n Y Khoa" }), a.jsx("p", { className: "text-[11px] text-slate-500", children: "Ti\u1EBFp c\u1EADn tu\u1EA7n t\u1EF1 sinh l\xFD h\u1ECDc (Donna Pierre & Ranson)" })] }), y.sixSteps.map((B) => a.jsxs("div", { className: `p-3 rounded-xl border text-xs space-y-1 bg-white shadow-2xs ${B.status === "danger" ? "border-rose-300" : B.status === "warning" ? "border-amber-300" : "border-slate-200"}`, children: [a.jsxs("div", { className: "flex items-center justify-between", children: [a.jsx("span", { className: "font-bold text-slate-900", children: B.stepName }), a.jsx("span", { className: `px-2 py-0.5 rounded-full text-[10px] font-bold ${B.status === "danger" ? "bg-rose-100 text-rose-800" : B.status === "warning" ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"}`, children: B.finding })] }), a.jsx("div", { className: "font-semibold text-slate-800", children: B.title }), a.jsx("p", { className: "text-slate-600 text-[11px] leading-relaxed", children: B.detail })] }, B.stepNumber))] }), o === "treatment" && a.jsxs("div", { className: "space-y-3 animate-in fade-in duration-150", children: [a.jsx("div", { className: "p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-900 leading-relaxed shadow-2xs", children: y.treatmentProtocols.summary }), a.jsxs("div", { className: "bg-white p-3 rounded-xl border border-slate-200 shadow-2xs space-y-1 text-xs", children: [a.jsx("span", { className: "font-bold text-slate-900 block", children: "1. Li\u1EC7u ph\xE1p Oxy:" }), a.jsx("p", { className: "text-slate-700 leading-relaxed", children: y.treatmentProtocols.oxygenTherapy })] }), a.jsxs("div", { className: "bg-white p-3 rounded-xl border border-slate-200 shadow-2xs space-y-1 text-xs", children: [a.jsx("span", { className: "font-bold text-slate-900 block", children: "2. H\u1ED7 tr\u1EE3 th\xF4ng kh\xED (NIV / Th\u1EDF m\xE1y):" }), a.jsx("p", { className: "text-slate-700 leading-relaxed", children: y.treatmentProtocols.ventilationSupport })] }), y.treatmentProtocols.underlyingManagement.length > 0 && a.jsxs("div", { className: "bg-white p-3 rounded-xl border border-slate-200 shadow-2xs space-y-1 text-xs", children: [a.jsx("span", { className: "font-bold text-slate-900 block", children: "3. \u0110i\u1EC1u tr\u1ECB nguy\xEAn nh\xE2n:" }), a.jsx("ul", { className: "list-disc pl-4 space-y-0.5 text-slate-700", children: y.treatmentProtocols.underlyingManagement.map((B, tt) => a.jsx("li", { children: B }, tt)) })] }), y.treatmentProtocols.precautions.length > 0 && a.jsxs("div", { className: "bg-amber-50 p-3 rounded-xl border border-amber-300 text-xs space-y-1 text-amber-900", children: [a.jsxs("span", { className: "font-bold block flex items-center space-x-1", children: [a.jsx(pn, { className: "w-3.5 h-3.5 text-amber-600" }), a.jsx("span", { children: "\u0110i\u1EC1u c\u1EA7n th\u1EADn tr\u1ECDng:" })] }), a.jsx("ul", { className: "list-disc pl-4 space-y-0.5", children: y.treatmentProtocols.precautions.map((B, tt) => a.jsx("li", { children: B }, tt)) })] })] }), o === "reference" && a.jsxs("div", { className: "space-y-3 animate-in fade-in duration-150 text-xs", children: [a.jsxs("div", { className: "bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs space-y-2", children: [a.jsx("h3", { className: "text-sm font-bold text-slate-900", children: "Kho Tra C\u1EE9u Y Khoa Nhanh" }), a.jsx("p", { className: "text-slate-500 text-[11px]", children: "T\xE0i li\u1EC7u tham kh\u1EA3o chuy\xEAn s\xE2u & t\u1EEB \u0111i\u1EC3n thu\u1EADt ng\u1EEF kh\xED m\xE1u" }), g && a.jsxs("button", { onClick: () => g(), className: "w-full py-2.5 px-3 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-between active:scale-98 transition-all", children: [a.jsxs("div", { className: "flex items-center space-x-2", children: [a.jsx(Je, { className: "w-4 h-4" }), a.jsx("span", { children: "M\u1EDF T\u1EEB \u0110i\u1EC3n Thu\u1EADt Ng\u1EEF & Vi\u1EBFt T\u1EAFt ABG" })] }), a.jsx(Et, { className: "w-4 h-4" })] })] }), a.jsxs("div", { className: "bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs space-y-2", children: [a.jsx("strong", { className: "text-slate-800 block font-bold", children: "Quy T\u1EAFc Th\u0103ng B\u1EB1ng & B\xF9 Tr\u1EEB V\xE0ng:" }), a.jsxs("div", { className: "space-y-1.5 text-slate-700 text-[11px]", children: [a.jsxs("p", { children: ["\u2022 ", a.jsx("strong", { children: "Toan chuy\u1EC3n h\xF3a:" }), " PaCO\u2082 k\u1EF3 v\u1ECDng = 1.5 \xD7 [HCO\u2083\u207B] + 8 \xB1 2 (Winter)."] }), a.jsxs("p", { children: ["\u2022 ", a.jsx("strong", { children: "Ki\u1EC1m chuy\u1EC3n h\xF3a:" }), " PaCO\u2082 t\u0103ng ~ 0.7 mmHg cho m\u1ED7i 1 mmol/L HCO\u2083\u207B t\u0103ng."] }), a.jsxs("p", { children: ["\u2022 ", a.jsx("strong", { children: "Toan h\xF4 h\u1EA5p c\u1EA5p:" }), " M\u1ED7i 10 mmHg PaCO\u2082 t\u0103ng \u2192 HCO\u2083\u207B t\u0103ng 1 mmol/L."] }), a.jsxs("p", { children: ["\u2022 ", a.jsx("strong", { children: "Toan h\xF4 h\u1EA5p m\u1EA1n:" }), " M\u1ED7i 10 mmHg PaCO\u2082 t\u0103ng \u2192 HCO\u2083\u207B t\u0103ng 3.5 - 4 mmol/L."] }), a.jsxs("p", { children: ["\u2022 ", a.jsx("strong", { children: "Ki\u1EC1m h\xF4 h\u1EA5p c\u1EA5p:" }), " M\u1ED7i 10 mmHg PaCO\u2082 gi\u1EA3m \u2192 HCO\u2083\u207B gi\u1EA3m 2 mmol/L."] }), a.jsxs("p", { children: ["\u2022 ", a.jsx("strong", { children: "Ki\u1EC1m h\xF4 h\u1EA5p m\u1EA1n:" }), " M\u1ED7i 10 mmHg PaCO\u2082 gi\u1EA3m \u2192 HCO\u2083\u207B gi\u1EA3m 4 - 5 mmol/L."] }), a.jsx("p", { className: "text-rose-700 font-semibold", children: "* Quy t\u1EAFc v\xE0ng: C\u01A1 th\u1EC3 kh\xF4ng bao gi\u1EDD b\xF9 tr\u1EEB qu\xE1 m\u1EE9c khi\u1EBFn pH \u0111\u1EA3o chi\u1EC1u!" })] })] })] })] }), _ && a.jsx("div", { className: "fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200", children: a.jsxs("div", { className: "bg-white w-full max-w-lg rounded-t-2xl sm:rounded-2xl max-h-[85vh] flex flex-col shadow-xl overflow-hidden", children: [a.jsxs("div", { className: "p-3.5 border-b border-slate-200 flex items-center justify-between bg-slate-50", children: [a.jsxs("div", { className: "flex items-center space-x-2", children: [a.jsx(Pe, { className: "w-4 h-4 text-blue-600" }), a.jsx("h4", { className: "text-sm font-bold text-slate-900", children: "Ch\u1ECDn Ca B\u1EC7nh M\u1EABu Kinh \u0110i\u1EC3n" })] }), a.jsx("button", { onClick: () => P(false), className: "text-xs font-bold text-slate-500 hover:text-slate-800 p-1", children: "\u0110\xF3ng" })] }), a.jsx("div", { className: "p-3.5 overflow-y-auto space-y-2 divide-y divide-slate-100", children: ht.map((B, tt) => a.jsxs("button", { onClick: () => {
      O(B.data), P(false);
    }, className: "w-full pt-2 first:pt-0 text-left hover:bg-blue-50/60 p-2 rounded-xl transition-all cursor-pointer group", children: [a.jsxs("div", { className: "flex items-center justify-between", children: [a.jsx("span", { className: "text-xs font-bold text-slate-900 group-hover:text-blue-700", children: B.name }), a.jsx("span", { className: "text-[10px] text-blue-600 font-semibold", children: "N\u1EA1p ca \u2192" })] }), a.jsx("p", { className: "text-[11px] text-slate-500 mt-0.5", children: B.desc })] }, tt)) })] }) }), a.jsxs("nav", { className: "fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg px-2 py-1.5 flex items-center justify-around", children: [a.jsxs("button", { onClick: () => G("diagnosis"), className: `flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all cursor-pointer ${o === "diagnosis" ? "text-blue-600 font-bold" : "text-slate-500 hover:text-slate-800"}`, children: [a.jsx(bs, { className: "w-5 h-5" }), a.jsx("span", { className: "text-[10px] mt-0.5", children: "Kh\xED M\xE1u" })] }), a.jsxs("button", { onClick: () => G("anion-gap"), className: `flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all cursor-pointer ${o === "anion-gap" ? "text-indigo-600 font-bold" : "text-slate-500 hover:text-slate-800"}`, children: [a.jsx(Yh, { className: "w-5 h-5" }), a.jsx("span", { className: "text-[10px] mt-0.5", children: "Anion Gap" })] }), a.jsxs("button", { onClick: () => G("steps"), className: `flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all cursor-pointer ${o === "steps" ? "text-blue-600 font-bold" : "text-slate-500 hover:text-slate-800"}`, children: [a.jsx(Jh, { className: "w-5 h-5" }), a.jsx("span", { className: "text-[10px] mt-0.5", children: "6 B\u01B0\u1EDBc" })] }), a.jsxs("button", { onClick: () => G("treatment"), className: `flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all cursor-pointer ${o === "treatment" ? "text-emerald-600 font-bold" : "text-slate-500 hover:text-slate-800"}`, children: [a.jsx(ha, { className: "w-5 h-5" }), a.jsx("span", { className: "text-[10px] mt-0.5", children: "X\u1EED Tr\xED" })] }), a.jsxs("button", { onClick: () => G("reference"), className: `flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all cursor-pointer ${o === "reference" ? "text-blue-600 font-bold" : "text-slate-500 hover:text-slate-800"}`, children: [a.jsx(vs, { className: "w-5 h-5" }), a.jsx("span", { className: "text-[10px] mt-0.5", children: "Tra C\u1EE9u" })] })] })] });
  };
  var op = { unit: "mmHg", pH: 7.4, pCO2: 40, pO2: 95, hco3: 24, be: 0, sao2: 98, fio2: 21, na: 140, k: 4, cl: 100, lactate: 1, glucose: 5, albumin: 4, patientAge: 45 };
  function rp() {
    const [u, O] = Q.useState("analyzer"), [g, o] = Q.useState("interactive-flowchart"), [G, E] = Q.useState(op), [R, Z] = Q.useState(false), [D, H] = Q.useState(""), [p, _] = Q.useState(() => typeof window < "u" ? window.innerWidth < 768 : false);
    Q.useEffect(() => {
      const T = () => {
        _(window.innerWidth < 768);
      };
      return window.addEventListener("resize", T), () => window.removeEventListener("resize", T);
    }, []);
    const P = (T) => {
      E(T), O("analyzer"), window.scrollTo({ top: 0, behavior: "smooth" });
    }, y = (T) => {
      H(T || ""), Z(true);
    }, j = () => {
      o("glossary"), O("guide"), window.scrollTo({ top: 0, behavior: "smooth" });
    };
    return p ? a.jsxs("div", { className: "min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans antialiased", children: [a.jsx(hp, { input: G, setInput: E, onOpenGlossary: y }), a.jsx(xm, { isOpen: R, onClose: () => Z(false), initialSearchQuery: D })] }) : a.jsxs("div", { className: "min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans antialiased", children: [a.jsx(Xx, { activeTab: u, setActiveTab: (T) => {
      O(T);
    }, onNavigateToGlossaryInGuide: j }), a.jsxs("main", { className: "flex-1 pb-12", children: [u === "analyzer" && a.jsx($x, { initialInput: G, onInputChange: E, onSelectCase: () => O("cases") }), u === "guide" && a.jsx(lp, { initialTab: g, onLoadPresetToAnalyzer: P, onOpenGlossary: j }, g), u === "cases" && a.jsx(gm, { initialSubTab: "cases", onLoadCaseToAnalyzer: P }), u === "protocols" && a.jsx(gm, { initialSubTab: "protocols", onLoadCaseToAnalyzer: P })] }), a.jsxs("button", { id: "btn-quick-glossary", onClick: j, className: "fixed bottom-6 right-6 z-40 bg-purple-600 hover:bg-purple-700 active:scale-95 text-white p-3 sm:px-4 sm:py-3 rounded-full shadow-lg border border-purple-400/40 flex items-center space-x-2 transition-all hover:scale-105 cursor-pointer group", title: "M\u1EDF T\u1EEB \u0110i\u1EC3n Thu\u1EADt Ng\u1EEF & Vi\u1EBFt T\u1EAFt trong C\u1EA9m Nang & S\u01A1 \u0110\u1ED3", children: [a.jsx(Je, { className: "w-5 h-5 text-purple-100 group-hover:text-white transition-colors" }), a.jsx("span", { className: "text-xs font-bold hidden sm:inline", children: "T\u1EEB \u0110i\u1EC3n C\u1EA9m Nang" })] }), a.jsx("footer", { className: "bg-white border-t border-slate-200 mt-auto py-8", children: a.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4", children: [a.jsxs("div", { className: "flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500", children: [a.jsxs("div", { className: "flex items-center space-x-2", children: [a.jsx("div", { className: "w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center", children: a.jsx(ha, { className: "w-3.5 h-3.5" }) }), a.jsx("span", { className: "font-bold text-slate-800 text-sm", children: "ABG Pro \u2022 L\xE2m S\xE0ng Kh\xED M\xE1u \u0110\u1ED9ng M\u1EA1ch" })] }), a.jsxs("div", { className: "flex flex-wrap items-center justify-center gap-4 text-xs text-slate-600", children: [a.jsx("span", { className: "font-semibold text-slate-700", children: "T\xE0i li\u1EC7u y v\u0103n g\u1ED1c:" }), a.jsx("span", { children: "1. Arterial Blood Gases Made Easy (2nd Ed, Iain Hennessey & Alan Japp, Elsevier)" }), a.jsx("span", { children: "\u2022" }), a.jsx("span", { children: "2. ABG Interpretation: A case study approach (Donna Pierre & Mike Ranson, M&K Publishing)" })] })] }), a.jsxs("div", { className: "p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 leading-relaxed", children: [a.jsx("strong", { className: "text-slate-700 block mb-0.5", children: "Tuy\xEAn b\u1ED1 mi\u1EC5n tr\u1EEB tr\xE1ch nhi\u1EC7m y khoa (Medical Disclaimer):" }), "H\u1EC7 th\u1ED1ng cung c\u1EA5p c\xE1c thu\u1EADt to\xE1n sinh l\xFD h\u1ECDc v\xE0 ph\xE1c \u0111\u1ED3 x\u1EED tr\xED d\u1EF1a tr\xEAn c\xE1c t\xE0i li\u1EC7u chuy\xEAn kh\u1EA3o \u0111\u01B0\u1EE3c xu\u1EA5t b\u1EA3n r\u1ED9ng r\xE3i nh\u1EB1m m\u1EE5c \u0111\xEDch h\u1ED7 tr\u1EE3 h\u1ECDc t\u1EADp, tra c\u1EE9u v\xE0 n\xE2ng cao n\u0103ng l\u1EF1c l\xE2m s\xE0ng cho nh\xE2n vi\xEAn y t\u1EBF v\xE0 sinh vi\xEAn y khoa. M\u1ECDi quy\u1EBFt \u0111\u1ECBnh \u0111i\u1EC1u tr\u1ECB c\u1EE5 th\u1EC3 tr\xEAn ng\u01B0\u1EDDi b\u1EC7nh th\u1EF1c t\u1EBF ph\u1EA3i lu\xF4n do b\xE1c s\u0129 \u0111i\u1EC1u tr\u1ECB tr\u1EF1c ti\u1EBFp \u0111\xE1nh gi\xE1 d\u1EF1a tr\xEAn to\xE0n tr\u1EA1ng l\xE2m s\xE0ng, ti\u1EC1n s\u1EED b\u1EC7nh v\xE0 c\xE1c x\xE9t nghi\u1EC7m c\u1EADn l\xE2m s\xE0ng ph\u1ED1i h\u1EE3p."] }), a.jsxs("div", { className: "flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100", children: [a.jsxs("div", { children: ["\xA9 ", (/* @__PURE__ */ new Date()).getFullYear(), " ABG Pro Clinical System. To\xE0n quy\u1EC1n b\u1EA3o l\u01B0u."] }), a.jsxs("div", { className: "flex items-center space-x-2", children: [a.jsx(Mx, { className: "w-3.5 h-3.5 text-emerald-600" }), a.jsx("span", { children: "Chu\u1EA9n h\xF3a 6 b\u01B0\u1EDBc \u2022 Quy t\u1EAFc kh\xF4ng b\xF9 qu\xE1 m\u1EE9c \u2022 Ph\xE2n lo\u1EA1i Berlin ARDS" })] })] })] }) }), a.jsx(xm, { isOpen: R, onClose: () => Z(false), initialSearchQuery: D })] });
  }
  F0.createRoot(document.getElementById("root")).render(a.jsx(Q.StrictMode, { children: a.jsx(rp, {}) }));
})();
/**
* @license React
* react-jsx-runtime.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
/**
* @license React
* react.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
/**
* @license React
* scheduler.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
/**
* @license React
* react-dom.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
/**
* @license React
* react-dom-client.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
