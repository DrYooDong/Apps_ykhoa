/**
 * Facade Stub for ma-tran-trieu-chung-data.js
 * Relocated to /js/approach/ma-tran-trieu-chung-data.js
 */
(function() {
  var currentScript = document.currentScript;
  if (currentScript) {
    var basePath = currentScript.src.substring(0, currentScript.src.lastIndexOf('/'));
    var s = document.createElement('script');
    s.src = basePath + '/approach/ma-tran-trieu-chung-data.js';
    if (currentScript.defer) s.defer = true;
    if (currentScript.async) s.async = true;
    document.head.appendChild(s);
  }
})();
