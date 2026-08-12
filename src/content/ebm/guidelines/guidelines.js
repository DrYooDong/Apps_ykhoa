/**
 * guidelines.js
 * Main Entry Hub Controller cho Kho Guidelines & Nghiên Cứu Lâm Sàng CliniPortal
 * Pure HTML5 / Vanilla CSS3 / ES6+ JavaScript
 */

(function () {
  'use strict';

  // ════════════════════════════════════════════════════════════════
  // 1. SIDEBAR TOGGLE & STATE LOGIC
  // ════════════════════════════════════════════════════════════════

  function toggleSidebar() {
    const leftNav = document.getElementById('left-nav');
    const appShell = document.querySelector('.app-shell');
    const backdrop = document.getElementById('sidebar-backdrop');
    if (!leftNav) return;

    const isMobile = window.innerWidth <= 1024;
    if (isMobile) {
      const isOpen = leftNav.classList.toggle('mobile-open');
      if (backdrop) backdrop.classList.toggle('active', isOpen);
    } else {
      const isCollapsed = leftNav.classList.toggle('collapsed');
      if (appShell) appShell.classList.toggle('sidebar-collapsed', isCollapsed);
      localStorage.setItem('guidelines_sidebar_collapsed', isCollapsed ? 'true' : 'false');
    }
  }

  function closeMobileSidebar() {
    if (window.innerWidth <= 1024) {
      const leftNav = document.getElementById('left-nav');
      const backdrop = document.getElementById('sidebar-backdrop');
      if (leftNav) leftNav.classList.remove('mobile-open');
      if (backdrop) backdrop.classList.remove('active');
    }
  }

  function initSidebarState() {
    const isMobile = window.innerWidth <= 1024;
    const leftNav = document.getElementById('left-nav');
    const appShell = document.querySelector('.app-shell');
    
    if (!isMobile && leftNav) {
      const isCollapsed = localStorage.getItem('guidelines_sidebar_collapsed') === 'true';
      if (isCollapsed) {
        leftNav.classList.add('collapsed');
        if (appShell) appShell.classList.add('sidebar-collapsed');
      }
    }

    if (leftNav) {
      leftNav.addEventListener('click', (e) => {
        if (e.target.closest('.left-nav-link') || e.target.closest('button')) {
          closeMobileSidebar();
        }
      });
    }
  }

  // ════════════════════════════════════════════════════════════════
  // 2. HELPER UI CALLBACKS & ACTIONS
  // ════════════════════════════════════════════════════════════════

  function closeAllActionsDropdowns() {
    document.querySelectorAll('.actions-dropdown').forEach(el => el.classList.remove('active'));
  }

  function toggleActionsDropdown(dropdownId, event) {
    if (event) event.stopPropagation();
    const targetEl = document.getElementById(dropdownId);
    const isAlreadyActive = targetEl && targetEl.classList.contains('active');
    closeAllActionsDropdowns();
    if (targetEl && !isAlreadyActive) {
      targetEl.classList.add('active');
    }
  }

  // ── Settings Dropdown (Cài đặt menu) ──
  function toggleSettingsMenu(event) {
    if (event) event.stopPropagation();
    const wrapper = document.getElementById('settings-dropdown-wrapper');
    if (!wrapper) return;
    const isActive = wrapper.classList.toggle('active');
    const btn = document.getElementById('settings-toggle-btn');
    if (btn) btn.setAttribute('aria-expanded', isActive ? 'true' : 'false');
  }

  function closeSettingsMenu() {
    const wrapper = document.getElementById('settings-dropdown-wrapper');
    if (wrapper) wrapper.classList.remove('active');
    const btn = document.getElementById('settings-toggle-btn');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  }

  function filterByStudyId(id) {
    const study = (window.studies || []).find(s => s.id === id);
    if (!study) return;
    if (window.filters) window.filters.search = study.title || '';
    const searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.value = study.title || '';
    if (typeof window.switchTab === 'function') window.switchTab('list');
    if (typeof window.renderTable === 'function') window.renderTable();
  }

  function handleSearch(e) {
    const val = e.target.value;
    window.filters.search = val;
    if (window.renderTable) window.renderTable();
  }

  function parseUrlState() {
    const urlParams = new URLSearchParams(window.location.search);
    const specialtyParam = urlParams.get('specialty');
    const searchParam = urlParams.get('search');
    
    if (specialtyParam && window.SPECIALTIES && window.SPECIALTIES[specialtyParam]) {
      window.filters.specialty = specialtyParam;
      window.showAdvancedFilters = true;
      const fSpec = document.getElementById('filter-row-specialty');
      const fDes = document.getElementById('filter-row-design');
      const fPer = document.getElementById('filter-row-period');
      const advBtn = document.getElementById('advanced-filters-btn');
      
      if (fSpec) fSpec.style.display = 'flex';
      if (fDes) fDes.style.display = 'flex';
      if (fPer) fPer.style.display = 'flex';
      if (advBtn) advBtn.classList.add('active');
    }
    
    if (searchParam) {
      window.filters.search = searchParam;
      const searchInput = document.getElementById('search-input');
      if (searchInput) searchInput.value = searchParam;
    }
  }

  function calculateNNT() {
    const cerInp = document.getElementById('nnt-cer-input');
    const eerInp = document.getElementById('nnt-eer-input');
    const resEl = document.getElementById('nnt-result-display');
    if (!cerInp || !eerInp || !resEl) return;

    const cer = parseFloat(cerInp.value) / 100;
    const eer = parseFloat(eerInp.value) / 100;

    if (isNaN(cer) || isNaN(eer) || cer === eer) {
      resEl.textContent = 'N/A';
      return;
    }

    const arr = Math.abs(cer - eer);
    const nnt = Math.ceil(1 / arr);
    resEl.textContent = `${nnt} (ARR: ${(arr * 100).toFixed(1)}%)`;
  }

  // ════════════════════════════════════════════════════════════════
  // 3. RECENT UPDATES & TIMELINE RENDERERS
  // ════════════════════════════════════════════════════════════════

  function renderUpdates() {
    const container = document.getElementById('updates-list') || document.getElementById('recent-updates-container');
    if (!container) return;
    const studies = window.studies || [];
    const recent = studies.slice(0, 2);

    if (recent.length === 0) {
      container.innerHTML = `<div style="font-size:0.8rem; color:var(--text-muted); padding:0.5rem;">Chưa có cập nhật mới nào.</div>`;
      return;
    }

    let html = recent.map(s => {
      const specObj = window.SPECIALTIES && window.SPECIALTIES[s.specialty] ? window.SPECIALTIES[s.specialty] : { name: s.specialty || 'N/A' };
      return `
        <div class="update-card" onclick="window.filterByStudyId && window.filterByStudyId('${s.id}')">
          <div class="update-card-header">
            <div style="font-size:0.75rem; font-weight:800; color:var(--accent);">${s.year || '2026'} • ${escapeHtml(specObj.name)}</div>
          </div>
          <div class="update-card-title">${escapeHtml(s.title)}</div>
          <div style="font-size:0.75rem; color:var(--text-muted); margin-top:4px;">💊 ${escapeHtml(s.drug || s.intervention || 'Khuyến cáo')}</div>
        </div>
      `;
    }).join('');

    container.innerHTML = html;
  }

  function toggleRecentUpdatesSec() {
    const container = document.getElementById('updates-list') || document.getElementById('recent-updates-container');
    const label = document.getElementById('recent-updates-toggle-label');
    const icon = document.getElementById('recent-updates-toggle-icon');
    if (!container) return;
    const isHidden = container.style.display === 'none';
    container.style.display = isHidden ? '' : 'none';
    if (label) label.textContent = isHidden ? 'Thu gọn' : 'Mở rộng';
    if (icon) icon.textContent = isHidden ? '▲' : '▼';
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // ════════════════════════════════════════════════════════════════
  // 4. MAIN APP INITIALIZATION & EVENT LISTENERS
  // ════════════════════════════════════════════════════════════════

  // Window resize listener
  window.addEventListener('resize', () => {
    const newMobile = window.innerWidth <= 768;
    if (newMobile !== window.isMobileView) {
      window.isMobileView = newMobile;
      if (window.currentTab !== 'compare' && window.renderTable) window.renderTable();
    }
  });

  document.addEventListener('DOMContentLoaded', async function() {
    initSidebarState();

    if (window.initSupabase) {
      const isConnected = window.initSupabase();
      if (isConnected && window.syncStudiesWithSupabase) {
        await window.syncStudiesWithSupabase();
      } else if (window.loadStudies) {
        window.loadStudies();
      }
    } else if (window.loadStudies) {
      window.loadStudies();
    }
    parseUrlState();

    // NNT listeners
    const nntCer = document.getElementById('nnt-cer-input');
    const nntEer = document.getElementById('nnt-eer-input');
    if (nntCer) nntCer.addEventListener('input', calculateNNT);
    if (nntEer) nntEer.addEventListener('input', calculateNNT);

    // Initial renders
    if (window.renderFilterPills) window.renderFilterPills();
    if (window.renderTable) window.renderTable();
    renderUpdates();

    // Search input listener
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', handleSearch);
    }

    // Close popups on click outside
    document.addEventListener('click', (e) => {
      const colMenu = document.getElementById('columns-dropdown-menu');
      const colBtn = document.getElementById('columns-toggle-btn');
      if (colMenu && colMenu.classList.contains('active') && !colMenu.contains(e.target) && e.target !== colBtn) {
        colMenu.classList.remove('active');
      }
      if (!e.target.closest('.actions-dropdown')) {
        closeAllActionsDropdowns();
      }
      // Close settings menu when clicking outside
      const settingsWrapper = document.getElementById('settings-dropdown-wrapper');
      if (settingsWrapper && settingsWrapper.classList.contains('active')) {
        if (!settingsWrapper.contains(e.target)) {
          closeSettingsMenu();
        }
      }
    });

    // Close modals on overlay click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          overlay.classList.remove('active');
        }
      });
    });

    // Keyboard shortcuts: Escape & Alt+S
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (window.closeAddModal) window.closeAddModal();
        if (window.closeImportModal) window.closeImportModal();
        if (window.closeSupabaseModal) window.closeSupabaseModal();
        if (window.closeSubgroupModal) window.closeSubgroupModal();
        const icdModal = document.getElementById('icd10-modal');
        if (icdModal) icdModal.classList.remove('active');
        const drugModal = document.getElementById('drug-interaction-modal');
        if (drugModal) drugModal.classList.remove('active');
      }
      if (e.altKey && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        toggleSidebar();
      }
    });
  });

  // Export Core Hub APIs to window
  window.toggleSidebar = toggleSidebar;
  window.closeMobileSidebar = closeMobileSidebar;
  window.toggleActionsDropdown = toggleActionsDropdown;
  window.closeAllActionsDropdowns = closeAllActionsDropdowns;
  window.toggleSettingsMenu = toggleSettingsMenu;
  window.closeSettingsMenu = closeSettingsMenu;
  window.filterByStudyId = filterByStudyId;
  window.calculateNNT = calculateNNT;
  window.renderUpdates = renderUpdates;
  window.toggleRecentUpdatesSec = toggleRecentUpdatesSec;

})();
