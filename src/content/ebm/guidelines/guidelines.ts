/**
 * CliniPortal 2.0 — Guidelines Main Entry Controller (TypeScript)
 * Path: src/content/ebm/guidelines/guidelines.ts
 */

import { Study } from './guidelines-types';

import './guidelines-types';
import './guidelinesdata';
import './data/predatory-blacklist';
import './js/openalex-service';
import './js/journal-trust-scorer';
import './js/guideline-sync';
import './js/guideline-charts-engine';
import './js/guideline-table';
import './js/guideline-modals';
import './js/drug-linker';
import './js/guideline-visualizations';
import './js/guideline-evidence-analytics';
import './js/guideline-cmd-palette';
import './js/guideline-cdss';
import './js/guideline-compare-matrix';
import './js/guideline-tools';

export function toggleSidebar(): void {
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
    try {
      localStorage.setItem('guidelines_sidebar_collapsed', isCollapsed ? 'true' : 'false');
    } catch(e) {}
  }
}

export function closeMobileSidebar(): void {
  if (window.innerWidth <= 1024) {
    const leftNav = document.getElementById('left-nav');
    const backdrop = document.getElementById('sidebar-backdrop');
    if (leftNav) leftNav.classList.remove('mobile-open');
    if (backdrop) backdrop.classList.remove('active');
  }
}

export function initSidebarState(): void {
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
    leftNav.addEventListener('click', (e: any) => {
      if (e.target.closest('.left-nav-link') || e.target.closest('button')) {
        closeMobileSidebar();
      }
    });
  }
}

export function closeAllActionsDropdowns(): void {
  document.querySelectorAll('.actions-dropdown').forEach(el => el.classList.remove('active'));
}

export function toggleActionsDropdown(dropdownId: string, event?: Event): void {
  if (event) event.stopPropagation();
  const targetEl = document.getElementById(dropdownId);
  const isAlreadyActive = targetEl && targetEl.classList.contains('active');
  closeAllActionsDropdowns();
  if (targetEl && !isAlreadyActive) {
    targetEl.classList.add('active');
  }
}

export function toggleSettingsMenu(event?: Event): void {
  if (event) event.stopPropagation();
  const wrapper = document.getElementById('settings-dropdown-wrapper');
  if (!wrapper) return;
  const isActive = wrapper.classList.toggle('active');
  const btn = document.getElementById('settings-toggle-btn');
  if (btn) btn.setAttribute('aria-expanded', isActive ? 'true' : 'false');
}

export function closeSettingsMenu(): void {
  const wrapper = document.getElementById('settings-dropdown-wrapper');
  if (wrapper) wrapper.classList.remove('active');
  const btn = document.getElementById('settings-toggle-btn');
  if (btn) btn.setAttribute('aria-expanded', 'false');
}

export function filterByStudyId(id: string): void {
  const study = (window.studies || []).find(s => s.id === id);
  if (!study) return;
  if (window.filters) window.filters.search = study.title || '';
  const searchInput = document.getElementById('search-input') as HTMLInputElement | null;
  if (searchInput) searchInput.value = study.title || '';
  if (typeof window.switchTab === 'function') window.switchTab('list');
  if (typeof window.renderTable === 'function') window.renderTable();
}

function handleSearch(e: any): void {
  const val = e.target.value;
  if (window.filters) window.filters.search = val;
  if (window.renderTable) window.renderTable();
}

export function parseUrlState(): void {
  const urlParams = new URLSearchParams(window.location.search);
  const specialtyParam = urlParams.get('specialty');
  const searchParam = urlParams.get('search');
  
  if (specialtyParam && window.SPECIALTIES && window.SPECIALTIES[specialtyParam]) {
    if (window.filters) window.filters.specialty = specialtyParam;
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
    if (window.filters) window.filters.search = searchParam;
    const searchInput = document.getElementById('search-input') as HTMLInputElement | null;
    if (searchInput) searchInput.value = searchParam;
  }
}

export function calculateNNT(): void {
  const cerInp = document.getElementById('nnt-cer-input') as HTMLInputElement | null;
  const eerInp = document.getElementById('nnt-eer-input') as HTMLInputElement | null;
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

function getStudyRecencyTimestamp(s: any): number {
  const rawTime = s.createdAt || s.created_at;
  if (rawTime) {
    const parsed = new Date(rawTime).getTime();
    if (!isNaN(parsed) && parsed > 0) return parsed;
  }
  if (typeof s.id === 'string') {
    const match = s.id.match(/study_(\d{10,13})/);
    if (match && match[1]) {
      const idTime = parseInt(match[1], 10);
      if (!isNaN(idTime) && idTime > 1000000000000) return idTime;
    }
  }
  const y = Number(s.year) || 2020;
  return new Date(y, 0, 1).getTime();
}

export function renderUpdates(): void {
  const container = document.getElementById('updates-list') || document.getElementById('recent-updates-container');
  if (!container) return;

  const studies = window.studies || [];
  if (studies.length === 0) {
    container.innerHTML = `<div style="font-size:0.8rem; color:var(--text-muted); padding:0.5rem 1rem;">Chưa có cập nhật mới nào.</div>`;
    return;
  }

  // Sắp xếp ưu tiên:
  // 1. Bài mới nạp gần đây nhất vào hệ sinh thái (theo createdAt / created_at / ID timestamp)
  // 2. Nếu cùng thời gian: xếp theo năm công bố (year) mới nhất
  const latestStudies = [...studies].sort((a, b) => {
    const timeB = getStudyRecencyTimestamp(b);
    const timeA = getStudyRecencyTimestamp(a);
    if (timeB !== timeA) {
      return timeB - timeA;
    }
    return (Number(b.year) || 0) - (Number(a.year) || 0);
  }).slice(0, 4);

  const html = latestStudies.map(s => {
    const specObj = window.SPECIALTIES && window.SPECIALTIES[s.specialty] ? window.SPECIALTIES[s.specialty] : { name: s.specialty || 'N/A', color: '#0284c7', bg: '#f0f9ff' };
    return `
      <div class="update-card" style="cursor: pointer;" onclick="window.filterByStudyId && window.filterByStudyId('${s.id}')">
        <div class="update-card-header" style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 0.7rem; font-weight: 800; padding: 1px 6px; border-radius: 4px; background: ${specObj.bg}; color: ${specObj.color};">${specObj.name}</span>
          <span style="font-size: 0.7rem; font-weight: 800; color: var(--text-muted);">${s.year || '2026'}</span>
        </div>
        <div class="update-card-title" style="margin: 4px 0; font-weight: 700; line-height: 1.35;">${escapeHtml(s.title)}</div>
        <div style="font-size: 0.72rem; color: var(--text-muted);">💊 ${escapeHtml(s.drug || s.intervention || 'Khuyến cáo')}</div>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 10px; width: 100%; padding: 0.75rem 1rem;">
      ${html}
    </div>
  `;
}

export function toggleRecentUpdatesSec(): void {
  const container = document.getElementById('updates-list') || document.getElementById('recent-updates-container');
  const label = document.getElementById('recent-updates-toggle-label');
  const icon = document.getElementById('recent-updates-toggle-icon');
  if (!container) return;
  const isHidden = container.style.display === 'none';
  container.style.display = isHidden ? '' : 'none';
  if (label) label.textContent = isHidden ? 'Thu gọn' : 'Mở rộng';
  if (icon) icon.textContent = isHidden ? '▲' : '▼';
}

function escapeHtml(str?: string): string {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

if (typeof window !== 'undefined') {
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

    const nntCer = document.getElementById('nnt-cer-input');
    const nntEer = document.getElementById('nnt-eer-input');
    if (nntCer) nntCer.addEventListener('input', calculateNNT);
    if (nntEer) nntEer.addEventListener('input', calculateNNT);

    if (window.renderFilterPills) window.renderFilterPills();
    if (window.renderTable) window.renderTable();
    renderUpdates();

    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', handleSearch);
    }

    document.addEventListener('click', (e: any) => {
      const colMenu = document.getElementById('columns-dropdown-menu');
      const colBtn = document.getElementById('columns-toggle-btn');
      if (colMenu && colMenu.classList.contains('active') && !colMenu.contains(e.target) && e.target !== colBtn) {
        colMenu.classList.remove('active');
      }
      if (!e.target.closest('.actions-dropdown')) {
        closeAllActionsDropdowns();
      }
      const settingsWrapper = document.getElementById('settings-dropdown-wrapper');
      if (settingsWrapper && settingsWrapper.classList.contains('active')) {
        if (!settingsWrapper.contains(e.target)) {
          closeSettingsMenu();
        }
      }
    });

    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          (overlay as HTMLElement).classList.remove('active');
        }
      });
    });

    document.addEventListener('keydown', (e: KeyboardEvent) => {
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
}
