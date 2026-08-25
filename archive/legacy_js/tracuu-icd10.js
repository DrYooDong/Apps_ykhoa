/**
 * Facade Stub for tracuu-icd10.js
 * Relocated to /js/data/tracuu-icd10.js
 */
(function() {
  var currentScript = document.currentScript;
  if (currentScript) {
    var basePath = currentScript.src.substring(0, currentScript.src.lastIndexOf('/'));
    var s = document.createElement('script');
    s.src = basePath + '/data/tracuu-icd10.js';
    if (currentScript.defer) s.defer = true;
    if (currentScript.async) s.async = true;
    document.head.appendChild(s);
  }
})();
