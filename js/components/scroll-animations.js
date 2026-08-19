/**
 * Slide-In Scroll Animation Engine (scroll-animations.js)
 * Location: js/components/scroll-animations.js
 * CliniPortal Framework — Vanilla JavaScript
 */

(function () {
  'use strict';

  function initScrollAnimations() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Auto-tag common content elements if not explicitly tagged
    const candidateSelectors = [
      '.bento-card',
      '.cheatsheet-card',
      '.hub-card',
      '.clinical-poster-card',
      '.fnode',
      '.algo-step-card',
      '.drug-card'
    ];

    candidateSelectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        if (!el.classList.contains('reveal-on-scroll') && !el.classList.contains('is-revealed')) {
          el.classList.add('reveal-on-scroll');
        }
      });
    });

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.12
    });

    const targets = document.querySelectorAll(
      '.reveal-on-scroll, .reveal-slide-left, .reveal-slide-right, .reveal-scale-in, .reveal-stagger'
    );

    targets.forEach(el => observer.observe(el));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimations);
  } else {
    initScrollAnimations();
  }

  window.CliniPortalScrollAnim = {
    refresh: initScrollAnimations
  };
})();
