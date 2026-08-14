/**
 * guideline-tools.js
 * Main Bridge Entry Hub cho các Công cụ Lâm Sàng EBM (CDSS, Multi-Compare Matrix, Command Palette)
 * Pure HTML5 / Vanilla CSS3 / ES6+ JavaScript
 */

(function () {
  'use strict';

  // Export unified GuidelineTools global namespace object for backward compatibility
  window.GuidelineTools = {
    // Command Palette
    toggleCommandPalette: function() { return window.toggleCommandPalette && window.toggleCommandPalette(); },
    openCommandPalette: function() { return window.openCommandPalette && window.openCommandPalette(); },
    closeCommandPalette: function() { return window.closeCommandPalette && window.closeCommandPalette(); },
    handleCmdInput: function(e) { return window.handleCmdInput && window.handleCmdInput(e); },
    executeCmdIndex: function(idx) { return window.executeCmdIndex && window.executeCmdIndex(idx); },

    // CDSS & Case Analysis
    openCaseModal: function() { return window.openCaseModal && window.openCaseModal(); },
    closeCaseModal: function() { return window.closeCaseModal && window.closeCaseModal(); },
    handleCaseAnalysis: function(e) { return window.handleCaseAnalysis && window.handleCaseAnalysis(e); },
    copyEbmClinicalNote: function(idx) { return window.copyEbmClinicalNote && window.copyEbmClinicalNote(idx); },
    copyAllEbmClinicalNotes: function() { return window.copyAllEbmClinicalNotes && window.copyAllEbmClinicalNotes(); },

    // Multi-Compare Matrix
    addToCompare: function(id) { return window.addToCompare && window.addToCompare(id); },
    removeFromCompare: function(id) { return window.removeFromCompare && window.removeFromCompare(id); },
    clearCompareList: function() { return window.clearCompareList && window.clearCompareList(); },
    updateFloatingCompareBar: function() { return window.updateFloatingCompareBar && window.updateFloatingCompareBar(); },
    openMultiCompareModal: function() { return window.openMultiCompareModal && window.openMultiCompareModal(); },
    closeMultiCompareModal: function() { return window.closeMultiCompareModal && window.closeMultiCompareModal(); },
    renderMultiCompareTable: function() { return window.renderMultiCompareTable && window.renderMultiCompareTable(); }
  };

})();
