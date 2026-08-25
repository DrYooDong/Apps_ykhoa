/**
 * Click and Drag to Scroll Engine (drag-scroll.js)
 * Location: js/components/drag-scroll.js
 * CliniPortal Framework — Vanilla JavaScript
 */

(function () {
  'use strict';

  function attachDragScroll(slider) {
    if (!slider || slider.dataset.dragScrollAttached === 'true') return;
    slider.dataset.dragScrollAttached = 'true';
    slider.classList.add('drag-scroll-container');

    let isDown = false;
    let startX;
    let scrollLeft;
    let velX = 0;
    let momentumID;

    slider.addEventListener('mousedown', (e) => {
      // Only drag on primary mouse button click
      if (e.button !== 0) return;

      isDown = true;
      slider.classList.add('is-dragging');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
      cancelAnimationFrame(momentumID);
    });

    slider.addEventListener('mouseleave', () => {
      if (!isDown) return;
      isDown = false;
      slider.classList.remove('is-dragging');
    });

    slider.addEventListener('mouseup', () => {
      if (!isDown) return;
      isDown = false;
      slider.classList.remove('is-dragging');
      beginMomentumTracking();
    });

    slider.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.8; // Scroll multiplier
      const prevScroll = slider.scrollLeft;
      slider.scrollLeft = scrollLeft - walk;
      velX = slider.scrollLeft - prevScroll;
    });

    function beginMomentumTracking() {
      cancelAnimationFrame(momentumID);
      momentumID = requestAnimationFrame(momentumStep);
    }

    function momentumStep() {
      slider.scrollLeft += velX;
      velX *= 0.92; // Friction factor
      if (Math.abs(velX) > 0.5) {
        momentumID = requestAnimationFrame(momentumStep);
      }
    }
  }

  function initAllDragScrolls() {
    const selectors = [
      '.drag-scroll-container',
      '[data-drag-scroll="true"]',
      '.bookmark-filter-bar',
      '.cp-search-categories',
      '.scroller-horizontal',
      '.table-scroll-wrapper'
    ];

    selectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => attachDragScroll(el));
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllDragScrolls);
  } else {
    initAllDragScrolls();
  }

  window.CliniPortalDragScroll = {
    attach: attachDragScroll,
    refresh: initAllDragScrolls
  };
})();
