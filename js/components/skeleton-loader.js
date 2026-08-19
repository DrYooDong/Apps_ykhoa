/**
 * Skeleton Loader Component (skeleton-loader.js)
 * Location: js/components/skeleton-loader.js
 * CliniPortal Framework — Vanilla JavaScript
 */

(function () {
  'use strict';

  const SkeletonLoader = {
    /**
     * Generate HTML for standard skeleton presets
     */
    getPresetHtml(type = 'card', count = 1) {
      let itemHtml = '';

      switch (type) {
        case 'header':
          itemHtml = `
            <div class="skeleton-header-shell">
              <div class="skeleton-shimmer" style="width: 140px; height: 32px; border-radius: 8px;"></div>
              <div style="display: flex; gap: 12px;">
                <div class="skeleton-shimmer" style="width: 80px; height: 32px; border-radius: 8px;"></div>
                <div class="skeleton-shimmer" style="width: 80px; height: 32px; border-radius: 8px;"></div>
                <div class="skeleton-shimmer" style="width: 32px; height: 32px; border-radius: 50%;"></div>
              </div>
            </div>`;
          break;

        case 'article':
          itemHtml = `
            <div style="max-width: 840px; margin: 0 auto; padding: 1.5rem 1rem;">
              <div class="skeleton-shimmer skeleton-text skeleton-title" style="width: 75%; height: 2rem; margin-bottom: 1.5rem;"></div>
              <div style="display: flex; gap: 12px; margin-bottom: 2rem;">
                <div class="skeleton-shimmer" style="width: 100px; height: 24px; border-radius: 12px;"></div>
                <div class="skeleton-shimmer" style="width: 120px; height: 24px; border-radius: 12px;"></div>
              </div>
              <div class="skeleton-shimmer skeleton-text" style="height: 1.2rem; margin-bottom: 1rem;"></div>
              <div class="skeleton-shimmer skeleton-text" style="height: 1.2rem; margin-bottom: 1rem; width: 92%;"></div>
              <div class="skeleton-shimmer skeleton-text" style="height: 1.2rem; margin-bottom: 1rem; width: 85%;"></div>
              <div class="skeleton-shimmer" style="height: 200px; width: 100%; border-radius: 12px; margin: 2rem 0;"></div>
              <div class="skeleton-shimmer skeleton-text" style="height: 1.2rem; margin-bottom: 1rem;"></div>
              <div class="skeleton-shimmer skeleton-text" style="height: 1.2rem; margin-bottom: 1rem; width: 95%;"></div>
            </div>`;
          break;

        case 'card':
        default:
          itemHtml = `
            <div class="skeleton-card">
              <div style="display: flex; gap: 12px; align-items: center;">
                <div class="skeleton-shimmer skeleton-avatar"></div>
                <div style="flex: 1;">
                  <div class="skeleton-shimmer skeleton-text skeleton-title" style="height: 1.1rem; margin-bottom: 0.35rem;"></div>
                  <div class="skeleton-shimmer skeleton-text skeleton-short" style="height: 0.8rem; margin: 0;"></div>
                </div>
              </div>
              <div class="skeleton-shimmer skeleton-text" style="margin-top: 0.5rem;"></div>
              <div class="skeleton-shimmer skeleton-text" style="width: 80%;"></div>
            </div>`;
          break;
      }

      if (type === 'header' || type === 'article') {
        return itemHtml;
      }

      return Array(count).fill(itemHtml).join('');
    },

    /**
     * Attach skeleton placeholder to a container
     */
    show(target, type = 'card', count = 3) {
      const el = typeof target === 'string' ? document.querySelector(target) : target;
      if (!el) return;

      el.setAttribute('data-skeleton-active', 'true');
      el.innerHTML = this.getPresetHtml(type, count);
    },

    /**
     * Replace skeleton placeholder with actual content smoothly
     */
    hide(target, contentHtml) {
      const el = typeof target === 'string' ? document.querySelector(target) : target;
      if (!el) return;

      el.classList.add('skeleton-fade-out');
      setTimeout(() => {
        el.removeAttribute('data-skeleton-active');
        el.classList.remove('skeleton-fade-out');
        if (contentHtml !== undefined) {
          el.innerHTML = contentHtml;
        }
      }, 150);
    }
  };

  window.SkeletonLoader = SkeletonLoader;
})();
