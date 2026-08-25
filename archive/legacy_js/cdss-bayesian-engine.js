/**
 * Facade Stub for cdss-bayesian-engine.js
 * Relocated to /js/simulators/cdss-bayesian-engine.js
 */
(function() {
  var currentScript = document.currentScript;
  if (currentScript) {
    var basePath = currentScript.src.substring(0, currentScript.src.lastIndexOf('/'));
    var s = document.createElement('script');
    s.src = basePath + '/simulators/cdss-bayesian-engine.js';
    if (currentScript.defer) s.defer = true;
    if (currentScript.async) s.async = true;
    document.head.appendChild(s);
  }
})();
