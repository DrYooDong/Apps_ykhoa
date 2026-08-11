/* ============================================================
   CLINIPORTAL - MUI PORT JAVASCRIPT BEHAVIORS
   Vanilla JavaScript for MUI-Inspired Components
============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initMuiRipples();
  initMuiAccordions();
  initMuiTabs();
  initMuiTooltips();
  initMuiDialogs();
  initMuiAlerts();
});

/* ------------------------------------------------------------
   1. RIPPLE EFFECT
------------------------------------------------------------ */
function initMuiRipples() {
  document.addEventListener('click', (e) => {
    const target = e.target.closest('.cp-ripple, .cp-btn, .cp-chip--clickable, .cp-tab');
    if (!target) return;

    const rect = target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const wave = document.createElement('span');
    wave.className = 'cp-ripple-wave';
    wave.style.width = wave.style.height = `${size}px`;
    wave.style.left = `${x}px`;
    wave.style.top = `${y}px`;

    target.appendChild(wave);

    setTimeout(() => {
      wave.remove();
    }, 600);
  });
}

/* ------------------------------------------------------------
   2. ACCORDION (SMOOTH MAX-HEIGHT TRANSITION)
------------------------------------------------------------ */
function initMuiAccordions() {
  document.addEventListener('click', (e) => {
    const header = e.target.closest('.cp-accordion__header');
    if (!header) return;

    const accordion = header.closest('.cp-accordion');
    if (!accordion) return;

    const content = accordion.querySelector('.cp-accordion__content');
    if (!content) return;

    const isExpanded = accordion.classList.contains('is-expanded');

    if (isExpanded) {
      // Collapse
      content.style.maxHeight = `${content.scrollHeight}px`;
      // Trigger reflow for transition
      content.offsetHeight;
      accordion.classList.remove('is-expanded');
      content.style.maxHeight = '0px';
    } else {
      // Expand
      accordion.classList.add('is-expanded');
      content.style.maxHeight = `${content.scrollHeight}px`;
      
      // Allow fluid resizing after transition finishes
      setTimeout(() => {
        if (accordion.classList.contains('is-expanded')) {
          content.style.maxHeight = 'none';
        }
      }, 300);
    }
  });
}

/* ------------------------------------------------------------
   3. TABS
------------------------------------------------------------ */
function initMuiTabs() {
  const tabContainers = document.querySelectorAll('.cp-tabs');

  tabContainers.forEach(container => {
    // Create indicator if not existing
    let indicator = container.querySelector('.cp-tabs__indicator');
    if (!indicator) {
      indicator = document.createElement('div');
      indicator.className = 'cp-tabs__indicator';
      container.appendChild(indicator);
    }

    const tabs = container.querySelectorAll('.cp-tab');
    
    function updateIndicator(activeTab) {
      if (!activeTab) return;
      indicator.style.left = `${activeTab.offsetLeft}px`;
      indicator.style.width = `${activeTab.offsetWidth}px`;
    }

    const activeTab = container.querySelector('.cp-tab.is-active') || tabs[0];
    if (activeTab) {
      activeTab.classList.add('is-active');
      setTimeout(() => updateIndicator(activeTab), 50);
    }

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('is-active'));
        tab.classList.add('is-active');
        updateIndicator(tab);

        // Switch panels if target specified
        const targetId = tab.getAttribute('data-target');
        if (targetId) {
          const parentSection = container.closest('section') || container.parentElement || document;
          const panels = parentSection.querySelectorAll('.cp-tab-panel');
          panels.forEach(p => p.classList.remove('is-active'));
          
          const targetPanel = parentSection.querySelector(targetId);
          if (targetPanel) {
            targetPanel.classList.add('is-active');
          }
        }
      });
    });

    window.addEventListener('resize', () => {
      const currentActive = container.querySelector('.cp-tab.is-active');
      updateIndicator(currentActive);
    });
  });
}

/* ------------------------------------------------------------
   4. TOOLTIPS (FIXED POSITIONING FOR RELIABILITY)
------------------------------------------------------------ */
function initMuiTooltips() {
  let tooltipBox = null;

  document.addEventListener('mouseover', (e) => {
    const trigger = e.target.closest('[data-cp-tooltip]');
    if (!trigger) return;

    const text = trigger.getAttribute('data-cp-tooltip');
    if (!text) return;

    if (!tooltipBox) {
      tooltipBox = document.createElement('div');
      tooltipBox.className = 'cp-tooltip-box';
      document.body.appendChild(tooltipBox);
    }

    tooltipBox.textContent = text;
    const rect = trigger.getBoundingClientRect();

    tooltipBox.style.top = `${rect.top - 36}px`;
    tooltipBox.style.left = `${rect.left + rect.width / 2}px`;
    tooltipBox.style.transform = 'translate(-50%, 0)';
    tooltipBox.classList.add('is-visible');
  });

  document.addEventListener('mouseout', (e) => {
    const trigger = e.target.closest('[data-cp-tooltip]');
    if (!trigger) return;
    if (tooltipBox) {
      tooltipBox.classList.remove('is-visible');
    }
  });
}

/* ------------------------------------------------------------
   5. DIALOGS
------------------------------------------------------------ */
function initMuiDialogs() {
  document.addEventListener('click', (e) => {
    // Open trigger
    const trigger = e.target.closest('[data-cp-dialog-target]');
    if (trigger) {
      const targetId = trigger.getAttribute('data-cp-dialog-target');
      const dialog = document.querySelector(targetId);
      if (dialog) dialog.classList.add('is-open');
    }

    // Close trigger or backdrop click
    const closeBtn = e.target.closest('[data-cp-dialog-close]');
    const backdrop = e.target.classList.contains('cp-dialog-backdrop') ? e.target : null;

    if (closeBtn || backdrop) {
      const activeDialog = closeBtn ? closeBtn.closest('.cp-dialog-backdrop') : backdrop;
      if (activeDialog) activeDialog.classList.remove('is-open');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const openDialog = document.querySelector('.cp-dialog-backdrop.is-open');
      if (openDialog) openDialog.classList.remove('is-open');
    }
  });
}

/* ------------------------------------------------------------
   6. ALERTS
------------------------------------------------------------ */
function initMuiAlerts() {
  document.addEventListener('click', (e) => {
    const closeBtn = e.target.closest('.cp-alert__close');
    if (!closeBtn) return;
    const alert = closeBtn.closest('.cp-alert');
    if (alert) {
      alert.style.opacity = '0';
      alert.style.transform = 'scale(0.95)';
      alert.style.transition = 'opacity 200ms ease, transform 200ms ease';
      setTimeout(() => alert.remove(), 200);
    }
  });
}

/* ------------------------------------------------------------
   7. TOAST API (Global Helper)
------------------------------------------------------------ */
window.cpToast = {
  show({ message, severity = 'info', duration = 3000, title = '' }) {
    let container = document.querySelector('.cp-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'cp-toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `cp-toast cp-toast--${severity}`;
    
    const iconMap = {
      info: 'fa-circle-info',
      success: 'fa-circle-check',
      warning: 'fa-triangle-exclamation',
      danger: 'fa-circle-xmark'
    };

    toast.innerHTML = `
      <i class="fa-solid ${iconMap[severity] || iconMap.info} cp-alert__icon"></i>
      <div style="flex: 1;">
        ${title ? `<div style="font-weight: 600;">${title}</div>` : ''}
        <div>${message}</div>
      </div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 300ms ease';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }
};
