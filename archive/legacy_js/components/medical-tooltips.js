/**
 * Medical Term Tooltip Engine (medical-tooltips.js)
 * Location: js/components/medical-tooltips.js
 * CliniPortal Framework — Vanilla JavaScript
 */

(function () {
  'use strict';

  let termsData = {};
  let isLoaded = false;
  let tooltipBox = null;
  let activeTarget = null;
  let hideTimer = null;

  function getProjectRoot() {
    if (typeof window.getPathDepthPrefix === 'function') {
      return window.getPathDepthPrefix();
    }
    return './';
  }

  function loadTermsData() {
    if (isLoaded) return Promise.resolve(termsData);

    if (window.CLINIPORTAL_MEDICAL_TERMS && window.CLINIPORTAL_MEDICAL_TERMS.terms) {
      termsData = window.CLINIPORTAL_MEDICAL_TERMS.terms;
      isLoaded = true;
      return Promise.resolve(termsData);
    }

    const root = getProjectRoot();
    return fetch(root + 'data/medical-terms.json')
      .then(res => res.json())
      .then(data => {
        termsData = data.terms || {};
        isLoaded = true;
        return termsData;
      })
      .catch(() => {
        return {};
      });
  }

  function createTooltipElement() {
    if (tooltipBox) return;

    tooltipBox = document.createElement('div');
    tooltipBox.className = 'med-tooltip-box';
    tooltipBox.setAttribute('role', 'tooltip');
    tooltipBox.setAttribute('aria-hidden', 'true');
    document.body.appendChild(tooltipBox);
  }

  function showTooltip(el, termKey) {
    clearTimeout(hideTimer);
    activeTarget = el;

    const data = termsData[termKey] || {
      term: termKey,
      fullName: el.getAttribute('data-full-name') || termKey,
      specialty: el.getAttribute('data-specialty') || 'Lâm sàng',
      definition: el.getAttribute('data-definition') || 'Thuật ngữ y khoa chuyên ngành.',
      pearl: el.getAttribute('data-pearl') || ''
    };

    tooltipBox.innerHTML = `
      <div class="med-tooltip-header">
        <span class="med-tooltip-title">${data.fullName || data.term}</span>
        <span class="med-tooltip-badge">${data.specialty || 'Lâm sàng'}</span>
      </div>
      <p class="med-tooltip-def">${data.definition}</p>
      ${data.pearl ? `
        <div class="med-tooltip-pearl">
          <i class="fa-solid fa-lightbulb med-tooltip-pearl-icon"></i>
          <span><strong>Clinical Pearl:</strong> ${data.pearl}</span>
        </div>
      ` : ''}
    `;

    // Position calculation with getBoundingClientRect (JS30 Day 22 pattern)
    const rect = el.getBoundingClientRect();
    const tooltipRect = tooltipBox.getBoundingClientRect();
    const margin = 8;

    let top = rect.bottom + margin;
    let left = rect.left + (rect.width / 2) - 140;

    // Prevent right overflow
    if (left + 320 > window.innerWidth) {
      left = window.innerWidth - 340;
    }
    // Prevent left overflow
    if (left < 10) {
      left = 10;
    }
    // Prevent bottom overflow (flip to top if necessary)
    if (top + 200 > window.innerHeight) {
      top = rect.top - tooltipRect.height - margin;
    }

    tooltipBox.style.top = `${Math.max(10, top)}px`;
    tooltipBox.style.left = `${left}px`;
    tooltipBox.classList.add('active');
  }

  function hideTooltip() {
    hideTimer = setTimeout(() => {
      if (tooltipBox) {
        tooltipBox.classList.remove('active');
      }
      activeTarget = null;
    }, 100);
  }

  function initDelegation() {
    createTooltipElement();
    loadTermsData();

    document.addEventListener('mouseover', (e) => {
      const termEl = e.target.closest('.med-term, [data-term]');
      if (termEl) {
        const termKey = termEl.getAttribute('data-term') || termEl.innerText.trim();
        showTooltip(termEl, termKey);
      }
    });

    document.addEventListener('mouseout', (e) => {
      const termEl = e.target.closest('.med-term, [data-term]');
      if (termEl) {
        hideTooltip();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDelegation);
  } else {
    initDelegation();
  }

  window.CliniPortalTooltips = {
    show: showTooltip,
    hide: hideTooltip
  };
})();
