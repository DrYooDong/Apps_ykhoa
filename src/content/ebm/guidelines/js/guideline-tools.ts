/**
 * CliniPortal 2.0 — Guidelines Tools & Modal Bridge (TypeScript)
 * Path: src/content/ebm/guidelines/js/guideline-tools.ts
 */

import './guidelines-types';

export function syncCurrentSpecialtyOffline(): void {
  const icon = document.getElementById('offline-sync-icon');
  const text = document.getElementById('offline-sync-text');
  if (icon) icon.className = 'fa-solid fa-spinner fa-spin';
  if (text) text.textContent = 'Đang tải offline...';

  try {
    const studies = window.studies || [];
    localStorage.setItem('cliniportal_offline_cached_studies', JSON.stringify(studies));
    localStorage.setItem('cliniportal_offline_cached_time', new Date().toISOString());

    setTimeout(() => {
      if (icon) icon.className = 'fa-solid fa-check';
      if (text) text.textContent = 'Đã tải xong!';
      setTimeout(() => {
        if (icon) icon.className = 'fa-solid fa-cloud-arrow-down';
        if (text) text.textContent = 'Tải Offline';
      }, 2000);
    }, 600);
  } catch (e) {
    console.error('Offline sync error:', e);
    if (icon) icon.className = 'fa-solid fa-triangle-exclamation';
    if (text) text.textContent = 'Lỗi tải offline';
  }
}

export function openIcdFilterModal(): void {
  const modal = document.getElementById('icd10-modal');
  if (modal) modal.classList.add('active');
  const input = document.getElementById('icd-search-input') as HTMLInputElement | null;
  if (input) {
    input.value = '';
    setTimeout(() => input.focus(), 50);
    input.oninput = (e: any) => {
      renderIcdSearchResults(e.target.value);
    };
  }
  renderIcdSearchResults('');
}

export function closeIcdFilterModal(): void {
  const modal = document.getElementById('icd10-modal');
  if (modal) modal.classList.remove('active');
}

export function renderIcdSearchResults(query: string = ''): void {
  const container = document.getElementById('icd-results-container');
  if (!container) return;

  const conditions = window.CLINICAL_CONDITIONS ? Object.values(window.CLINICAL_CONDITIONS) : [];
  const q = query.trim().toLowerCase();

  const matched = conditions.filter(c => {
    if (!q) return true;
    const nameMatch = (c.name || '').toLowerCase().includes(q);
    const idMatch = (c.id || '').toLowerCase().includes(q);
    const icds = Array.isArray(c.icd10) ? c.icd10.join(' ').toLowerCase() : String(c.icd10 || '').toLowerCase();
    const icdMatch = icds.includes(q);
    return nameMatch || idMatch || icdMatch;
  });

  if (matched.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 2.5rem 1rem; color: var(--text-muted); font-size: 0.85rem;">
        <i class="fa-solid fa-circle-question" style="font-size: 1.6rem; opacity: 0.5; margin-bottom: 0.5rem; display: block;"></i>
        Không tìm thấy mã bệnh hoặc vấn đề lâm sàng phù hợp với "<strong>${escapeHtml(query)}</strong>".
      </div>
    `;
    return;
  }

  const html = matched.map(c => {
    const icdList = Array.isArray(c.icd10) ? c.icd10 : [c.icd10];
    const icdChips = icdList.map(code => `
      <button type="button" class="btn btn-small" onclick="selectIcdFilter('${code}', '${c.id}')" style="font-family: monospace; font-weight: 700; padding: 2px 7px; font-size: 0.72rem;" title="Lọc theo mã ${code}">
        ${code}
      </button>
    `).join(' ');

    return `
      <div style="padding: 0.75rem 1rem; border-bottom: 1px solid var(--border-light); display: flex; align-items: center; justify-content: space-between; gap: 0.75rem;">
        <div>
          <div style="font-weight: 700; font-size: 0.86rem; color: var(--text);">${escapeHtml(c.name)}</div>
          <div style="display: flex; gap: 5px; margin-top: 5px; flex-wrap: wrap; align-items: center;">
            <span style="font-size: 0.7rem; color: var(--text-muted);">Mã ICD-10:</span>
            ${icdChips}
          </div>
        </div>
        <button type="button" class="btn btn-small btn-primary" onclick="selectIcdFilter('${icdList[0] || ''}', '${c.id}')" style="flex-shrink: 0;">
          <i class="fa-solid fa-filter"></i> Lọc
        </button>
      </div>
    `;
  }).join('');

  container.innerHTML = html;
}

export function selectIcdFilter(code: string, condKey?: string): void {
  if (window.filters) {
    window.filters.icd10 = code || null;
    if (condKey) window.filters.condition = condKey;
  }
  closeIcdFilterModal();
  if (typeof window.renderFilterPills === 'function') window.renderFilterPills();
  if (typeof window.renderTable === 'function') window.renderTable();
}

export function clearSearch(): void {
  const searchInput = document.getElementById('search-input') as HTMLInputElement | null;
  if (searchInput) searchInput.value = '';
  if (window.filters) window.filters.search = '';
  const searchBox = document.querySelector('.search-box');
  if (searchBox) searchBox.classList.remove('has-text');
  if (typeof window.renderTable === 'function') window.renderTable();
}

function escapeHtml(str?: string): string {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function toggleHasSummaryFilter(): void {
  if (typeof window.filterByHasSummary === 'function') {
    window.filterByHasSummary();
  } else {
    window.filters = window.filters || ({} as any);
    window.filters.hasSummary = !window.filters.hasSummary;
    const btn = document.getElementById('filter-summary-btn');
    if (btn) btn.classList.toggle('active', !!window.filters.hasSummary);
    if (window.renderTable) window.renderTable();
  }
}

export function handleAsianFilterChange(): void {
  const chk = document.getElementById('asian-data-filter') as HTMLInputElement | null;
  if (window.setFilter) {
    window.setFilter('asianData', chk ? chk.checked : false);
  }
}

export function setCompareMode(mode: string): void {
  const gridBtn = document.getElementById('compare-mode-grid-btn');
  const matrixBtn = document.getElementById('compare-mode-matrix-btn');
  const gridContainer = document.getElementById('compare-grid-container');
  const matrixContainer = document.getElementById('compare-matrix-container');

  if (mode === 'matrix') {
    if (matrixBtn) matrixBtn.classList.add('active');
    if (gridBtn) gridBtn.classList.remove('active');
    if (matrixContainer) matrixContainer.style.display = 'block';
    if (gridContainer) gridContainer.style.display = 'none';
    if (window.renderCompareMatrix) window.renderCompareMatrix();
  } else {
    if (gridBtn) gridBtn.classList.add('active');
    if (matrixBtn) matrixBtn.classList.remove('active');
    if (gridContainer) gridContainer.style.display = 'grid';
    if (matrixContainer) matrixContainer.style.display = 'none';
    if (window.renderComparison) window.renderComparison();
  }
}

export function clearComparison(): void {
  if (window.selectedIds) {
    window.selectedIds.clear();
  }
  if (window.renderComparison) window.renderComparison();
  if (window.renderTable) window.renderTable();
  const countEl = document.getElementById('compare-count');
  if (countEl) countEl.textContent = '0';
  const selCountEl = document.getElementById('compare-selected-count');
  if (selCountEl) selCountEl.textContent = '0';
  const emptyState = document.getElementById('compare-empty-state');
  if (emptyState) emptyState.style.display = 'block';
}

function escapeStr(str?: string): string {
  if (!str) return '';
  return String(str).replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function addSummaryPartRow(title = '', file = ''): void {
  const container = document.getElementById('summary-parts-container');
  if (!container) return;
  const row = document.createElement('div');
  row.className = 'summary-part-row';
  row.style.cssText = 'display:flex; gap:8px; margin-bottom:8px; align-items:center;';
  row.innerHTML = `
    <input type="text" placeholder="Tên phần (VD: Phần 1: Viêm đường mật cấp)" class="summary-part-title" value="${escapeStr(title)}" style="flex:1; padding:0.45rem 0.6rem; border:1px solid var(--border-light); border-radius:6px; background:var(--surface); color:var(--text); font-size:0.85rem;">
    <input type="text" placeholder="File HTML (VD: kho-guidelines/2018-tg18-viem-duong-mat.html)" class="summary-part-file" value="${escapeStr(file)}" style="flex:1; padding:0.45rem 0.6rem; border:1px solid var(--border-light); border-radius:6px; background:var(--surface); color:var(--text); font-size:0.85rem;">
    <button type="button" class="btn btn-small btn-danger" onclick="this.parentElement.remove()" style="padding:0.45rem 0.7rem; color:#ef4444; border-color:rgba(239,68,68,0.3);" title="Xóa phần này">🗑️</button>
  `;
  container.appendChild(row);
}

export function closePocketModal(): void {
  const m = document.getElementById('pocket-modal');
  if (m) m.classList.remove('active');
}

export function closeCitationModal(): void {
  const m = document.getElementById('citation-modal');
  if (m) m.classList.remove('active');
}

export function closeDecisionModal(): void {
  const m = document.getElementById('decision-modal');
  if (m) m.classList.remove('active');
}

export function closeSubgroupModal(): void {
  const m = document.getElementById('subgroup-modal');
  if (m) m.classList.remove('active');
}

export function closeNntModal(): void {
  const m = document.getElementById('nnt-calculator-modal');
  if (m) m.classList.remove('active');
}

export function calculateNNTFromHR(): void {
  const hr = parseFloat((document.getElementById('nnt-hr-input') as HTMLInputElement | null)?.value || '');
  const cer = parseFloat((document.getElementById('nnt-cer-input') as HTMLInputElement | null)?.value || '');
  const resEl = document.getElementById('nnt-calc-result');
  if (isNaN(hr) || isNaN(cer) || cer <= 0 || cer >= 100) {
    if (resEl) resEl.innerHTML = '<span style="color:#dc2626;">Vui lòng nhập HR hợp lệ và CER (0-100%).</span>';
    return;
  }
  const cerDec = cer / 100;
  const eerDec = cerDec * hr;
  const arr = Math.abs(cerDec - eerDec);
  if (arr === 0) {
    if (resEl) resEl.innerHTML = '<strong>NNT: Vô cực (Không có khác biệt nguy cơ tuyệt đối)</strong>';
    return;
  }
  const nnt = Math.ceil(1 / arr);
  if (resEl) resEl.innerHTML = `<strong>NNT = ${nnt}</strong> (Cần điều trị ${nnt} bệnh nhân để ngừa 1 biến cố). ARR = ${(arr * 100).toFixed(2)}%`;
}

if (typeof window !== 'undefined') {
  window.syncCurrentSpecialtyOffline = syncCurrentSpecialtyOffline;
  window.openIcdFilterModal = openIcdFilterModal;
  window.closeIcdFilterModal = closeIcdFilterModal;
  window.toggleHasSummaryFilter = toggleHasSummaryFilter;
  window.handleAsianFilterChange = handleAsianFilterChange;
  window.setCompareMode = setCompareMode;
  window.clearComparison = clearComparison;
  window.addSummaryPartRow = addSummaryPartRow;
  window.closePocketModal = closePocketModal;
  window.closeCitationModal = closeCitationModal;
  window.closeDecisionModal = closeDecisionModal;
  window.closeSubgroupModal = closeSubgroupModal;
  window.closeNntModal = closeNntModal;
  window.calculateNNTFromHR = calculateNNTFromHR;
  window.selectIcdFilter = selectIcdFilter;
  window.clearSearch = clearSearch;

  window.GuidelineTools = {
    toggleCommandPalette: () => window.toggleCommandPalette && window.toggleCommandPalette(),
    openCommandPalette: () => window.openCommandPalette && window.openCommandPalette(),
    closeCommandPalette: () => window.closeCommandPalette && window.closeCommandPalette(),
    handleCmdInput: (e: any) => window.handleCmdInput && window.handleCmdInput(e),
    executeCmdIndex: (idx: number) => window.executeCmdIndex && window.executeCmdIndex(idx),

    openCaseModal: () => window.openCaseModal && window.openCaseModal(),
    closeCaseModal: () => window.closeCaseModal && window.closeCaseModal(),
    handleCaseAnalysis: (e: any) => window.handleCaseAnalysis && window.handleCaseAnalysis(e),
    copyEbmClinicalNote: (idx: number) => window.copyEbmClinicalNote && window.copyEbmClinicalNote(idx),
    copyAllEbmClinicalNotes: () => window.copyAllEbmClinicalNotes && window.copyAllEbmClinicalNotes(),

    addToCompare: (id: string) => window.addToCompare && window.addToCompare(id),
    removeFromCompare: (id: string) => window.removeFromCompare && window.removeFromCompare(id),
    clearCompareList: clearComparison,
    updateFloatingCompareBar: () => window.updateFloatingCompareBar && window.updateFloatingCompareBar(),
    openMultiCompareModal: () => window.openMultiCompareModal && window.openMultiCompareModal(),
    closeMultiCompareModal: () => window.closeMultiCompareModal && window.closeMultiCompareModal(),
    renderMultiCompareTable: () => window.renderMultiCompareTable && window.renderMultiCompareTable(),

    syncCurrentSpecialtyOffline,
    openIcdFilterModal,
    closeIcdFilterModal,
    toggleHasSummaryFilter,
    handleAsianFilterChange,
    setCompareMode,
    clearComparison,
    addSummaryPartRow,
    closePocketModal,
    closeCitationModal,
    closeDecisionModal,
    closeSubgroupModal,
    closeNntModal,
    calculateNNTFromHR
  };
}
