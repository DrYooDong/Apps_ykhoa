/**
 * Reading Progress Tracker (reading-progress.js)
 * Location: js/components/reading-progress.js
 * CliniPortal Framework — Vanilla JavaScript
 */

(function () {
  'use strict';

  let container = null;
  let progressBar = null;
  let progressBadge = null;
  let ticking = false;

  function initProgressBar() {
    // Only initialize if not inside an embedded iframe iframes shouldn't double render
    if (document.documentElement.classList.contains('in-iframe')) return;

    if (document.getElementById('readingProgressContainer')) return;

    container = document.createElement('div');
    container.id = 'readingProgressContainer';
    container.className = 'reading-progress-container';
    container.setAttribute('aria-hidden', 'true');

    progressBar = document.createElement('div');
    progressBar.className = 'reading-progress-bar';
    container.appendChild(progressBar);

    document.body.appendChild(container);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    updateProgress();
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateProgress();
        ticking = false;
      });
      ticking = true;
    }
  }

  function updateProgress() {
    if (!progressBar) return;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    if (scrollHeight <= 100) {
      progressBar.style.width = '0%';
      return;
    }

    const percentage = Math.min(100, Math.max(0, Math.round((scrollTop / scrollHeight) * 100)));
    progressBar.style.width = `${percentage}%`;

    // Dispatch event for other trackers
    window.dispatchEvent(new CustomEvent('cliniportal-reading-progress', { detail: { percentage } }));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProgressBar);
  } else {
    initProgressBar();
  }

  window.CliniPortalProgress = {
    update: updateProgress
  };
})();
