/**
 * CliniPortal Sync & Broadcast Helper (Standalone)
 * Path: js/core/cliniportal-sync.js
 */
(function() {
  window.CliniPortalSync = {
    notifyUpdate: function(detail) {
      try {
        window.dispatchEvent(new CustomEvent('cliniportal:sync', { detail: detail || {} }));
      } catch (e) {
        console.warn('[CliniPortalSync] notifyUpdate error:', e);
      }
    }
  };
})();
