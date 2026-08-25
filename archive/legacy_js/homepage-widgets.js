/**
 * Facade Stub for homepage-widgets.js
 * Relocated to /js/dashboard/homepage-widgets.js
 */
(function() {
  var currentScript = document.currentScript;
  if (currentScript) {
    var basePath = currentScript.src.substring(0, currentScript.src.lastIndexOf('/'));
    var s = document.createElement('script');
    s.src = basePath + '/dashboard/homepage-widgets.js';
    if (currentScript.defer) s.defer = true;
    if (currentScript.async) s.async = true;
    document.head.appendChild(s);
  }
})();
