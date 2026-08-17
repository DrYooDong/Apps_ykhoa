/**
 * CliniPortal 2.0 — Guidelines Table & Filter Renderer (TypeScript)
 * Path: src/content/ebm/guidelines/js/guideline-table.ts
 */

import { Study } from '../guidelines-types';

import '../guidelines-types';

export const CONDITION_SPECIALTY_MAP: Record<string, string[]> = {
  'heart-failure': ['cardio'],
  'hypertension': ['cardio'],
  'af': ['cardio'],
  'cad': ['cardio'],
  'valvular-heart': ['cardio'],
  'diabetes-t2d': ['endo'],
  'diabetes-t1d': ['endo'],
  'thyroid': ['endo'],
  'dyslipidemia': ['endo'],
  'obesity': ['endo'],
  'copd': ['pulmo'],
  'asthma': ['pulmo'],
  'pneumonia': ['pulmo'],
  'interstitial-lung': ['pulmo'],
  'tb': ['pulmo'],
  'ckd': ['renal'],
  'aki': ['renal'],
  'nephrotic': ['renal'],
  'bph-luts': ['renal'],
  'uti': ['renal'],
  'icu': ['icu', 'infect'],
  'hepatitis-b': ['infect', 'gi'],
  'hepatitis-c': ['infect', 'gi'],
  'flu': ['infect', 'pulmo'],
  'covid19': ['infect', 'pulmo'],
  'hemorrhagic-fever': ['infect'],
  'measles': ['infect', 'pedia'],
  'invasive-fungal': ['infect', 'pulmo', 'icu'],
  'hfmd': ['infect', 'pedia'],
  'cirrhosis': ['gi'],
  'masld-mash': ['gi', 'endo'],
  'gerd-peptic': ['gi'],
  'ibd': ['gi'],
  'stroke': ['neuro', 'cardio'],
  'epilepsy': ['neuro'],
  'headache-migraine': ['neuro'],
  'gout': ['rheum', 'endo'],
  'ra': ['rheum'],
  'osteoporosis': ['rheum', 'endo'],
  'lupus-sle': ['rheum'],
  'solid-cancers': ['onco'],
  'vte-pe': ['hema', 'cardio', 'icu'],
  'malaria': ['infect'],
  'meningitis': ['infect', 'neuro'],
  'uterine-fibroids': ['obgyn']
};

export function renderFilterPills(): void {
  const filterRowCond = document.getElementById('filter-row-condition');
  const condContainer = document.getElementById('condition-pills');

  if (filterRowCond && condContainer && window.CLINICAL_CONDITIONS) {
    if (!window.filters.specialty) {
      // Khi chọn "Tất cả chuyên khoa", ẩn hoàn toàn hàng Vấn đề / Bệnh
      filterRowCond.style.display = 'none';
      condContainer.innerHTML = '';
      window.filters.condition = null;
    } else {
      // Khi chọn 1 chuyên khoa cụ thể, hiển thị hàng Vấn đề / Bệnh của chuyên khoa đó
      filterRowCond.style.display = 'flex';
      const specName = (window.SPECIALTIES && window.SPECIALTIES[window.filters.specialty]) ? window.SPECIALTIES[window.filters.specialty].name : 'Chuyên khoa';
      const labelEl = filterRowCond.querySelector('.filter-row-label');
      if (labelEl) labelEl.textContent = `Vấn đề / Bệnh (${specName})`;
      
      const activeSpec = window.filters.specialty;
      const matchingKeys = Object.keys(window.CLINICAL_CONDITIONS).filter(key => {
        const mappedSpecs = CONDITION_SPECIALTY_MAP[key];
        if (Array.isArray(mappedSpecs)) return mappedSpecs.includes(activeSpec);
        if (typeof mappedSpecs === 'string') return mappedSpecs === activeSpec;
        const cond = window.CLINICAL_CONDITIONS[key];
        return cond && cond.specialty === activeSpec;
      });

      let condHtml = `<button class="filter-pill ${window.filters.condition === null ? 'active' : ''}" onclick="setFilter('condition', null)">Tất cả Bệnh (${specName})</button>`;
      
      if (matchingKeys.length === 0) {
        condHtml += `<span style="font-size:0.78rem; color:var(--text-muted); padding:4px 8px;">Chưa có bệnh mẫu nào cho chuyên khoa này.</span>`;
      } else {
        matchingKeys.forEach(key => {
          const cond = window.CLINICAL_CONDITIONS[key];
          const icdStr = Array.isArray(cond.icd10) ? cond.icd10.join(', ') : (cond.icd10 || '');
          condHtml += `<button class="filter-pill ${window.filters.condition === key ? 'active' : ''}" onclick="setFilter('condition', '${key}')" title="Mã ICD-10: ${icdStr}">${cond.name}</button>`;
        });
      }

      condContainer.innerHTML = condHtml;
    }
  }

  const sourceContainer = document.getElementById('source-type-pills');
  if (sourceContainer && window.SOURCE_TYPES) {
    let sourceHtml = `<button class="filter-pill ${window.filters.sourceType === null ? 'active' : ''}" onclick="setFilter('sourceType', null)">Tất cả</button>`;
    Object.entries(window.SOURCE_TYPES).forEach(([key, src]) => {
      sourceHtml += `<button class="filter-pill ${window.filters.sourceType === key ? 'active' : ''}" onclick="setFilter('sourceType', '${key}')">${src.name}</button>`;
    });
    sourceContainer.innerHTML = sourceHtml;
  }

  const specContainer = document.getElementById('specialty-pills');
  if (specContainer && window.SPECIALTIES) {
    let specHtml = `<button class="filter-pill ${window.filters.specialty === null ? 'active' : ''}" onclick="setFilter('specialty', null)">Tất cả</button>`;
    Object.entries(window.SPECIALTIES).forEach(([key, spec]) => {
      specHtml += `<button class="filter-pill ${window.filters.specialty === key ? 'active' : ''}" onclick="setFilter('specialty', '${key}')">${spec.name}</button>`;
    });
    specContainer.innerHTML = specHtml;
  }

  const designContainer = document.getElementById('design-pills');
  if (designContainer && window.DESIGNS) {
    let designHtml = `<button class="filter-pill ${window.filters.design === null ? 'active' : ''}" onclick="setFilter('design', null)">Tất cả</button>`;
    Object.entries(window.DESIGNS).forEach(([key, des]) => {
      designHtml += `<button class="filter-pill ${window.filters.design === key ? 'active' : ''}" onclick="setFilter('design', '${key}')">${des.name}</button>`;
    });
    designContainer.innerHTML = designHtml;
  }

  const impactContainer = document.getElementById('impact-pills');
  if (impactContainer && window.IMPACTS) {
    let impactHtml = `<button class="filter-pill ${window.filters.impact === null ? 'active' : ''}" onclick="setFilter('impact', null)">Tất cả</button>`;
    Object.entries(window.IMPACTS).forEach(([key, imp]) => {
      impactHtml += `<button class="filter-pill ${window.filters.impact === key ? 'active' : ''}" onclick="setFilter('impact', '${key}')" style="border-color:${imp.color}30; color:${imp.color}; background:${imp.bg};">${imp.name}</button>`;
    });
    impactContainer.innerHTML = impactHtml;
  }

  const periodContainer = document.getElementById('period-pills');
  if (periodContainer) {
    const currentYear = new Date().getFullYear();
    const periods = [
      { key: null, label: 'Tất cả' },
      { key: `${currentYear}`, label: `${currentYear}` },
      { key: `${currentYear - 1}`, label: `${currentYear - 1}` },
      { key: `${currentYear - 2}`, label: `${currentYear - 2}` },
      { key: 'last5', label: '5 năm gần đây' }
    ];
    const periodHtml = periods.map(p =>
      `<button class="filter-pill ${window.filters.period === p.key ? 'active' : ''}" onclick="setFilter('period', ${p.key === null ? 'null' : `'${p.key}'`})">${p.label}</button>`
    ).join('');
    periodContainer.innerHTML = periodHtml;
  }

  const specFilterList = document.getElementById('spec-filter-list');
  if (specFilterList && window.SPECIALTIES) {
    const allStudies = window.studies || [];
    const SPEC_ICONS: Record<string, string> = {
      cardio: 'fa-solid fa-heart-pulse',
      pulmo: 'fa-solid fa-lungs',
      gi: 'fa-solid fa-disease',
      endo: 'fa-solid fa-dna',
      neuro: 'fa-solid fa-brain',
      infect: 'fa-solid fa-virus',
      renal: 'fa-solid fa-flask',
      rheum: 'fa-solid fa-bone',
      hema: 'fa-solid fa-droplet',
      onco: 'fa-solid fa-ribbon',
      pedia: 'fa-solid fa-baby',
      obgyn: 'fa-solid fa-person-pregnant',
      icu: 'fa-solid fa-heart-crack',
      derma: 'fa-solid fa-hand-dots',
      ent: 'fa-solid fa-head-side-cough',
      nutri: 'fa-solid fa-apple-whole'
    };

    let specNavHtml = `
      <button class="left-nav-link ${window.filters.specialty === null ? 'active' : ''}" onclick="setFilter('specialty', null)">
        <span class="left-nav-icon"><i class="fa-solid fa-layer-group" style="color:var(--accent);"></i></span>
        <span class="left-nav-text">Tất cả chuyên khoa</span>
        <span class="left-nav-link-badge">${allStudies.length}</span>
      </button>
    `;

    Object.entries(window.SPECIALTIES).forEach(([key, spec]) => {
      const count = allStudies.filter(s => s.specialty === key).length;
      const iconClass = SPEC_ICONS[key] || 'fa-solid fa-stethoscope';
      specNavHtml += `
        <button class="left-nav-link ${window.filters.specialty === key ? 'active' : ''}" onclick="setFilter('specialty', '${key}')">
          <span class="left-nav-icon"><i class="${iconClass}" style="color:${spec.color};"></i></span>
          <span class="left-nav-text">${spec.name}</span>
          <span class="left-nav-link-badge">${count}</span>
        </button>
      `;
    });
    specFilterList.innerHTML = specNavHtml;
  }
}


export function setFilter(type: string, value: any): void {
  if (type === 'specialty') {
    window.filters.specialty = value;
    window.filters.condition = null;
  } else {
    (window.filters as any)[type] = value;
  }
  renderFilterPills();
  renderTable();
}

export function filterByHasSummary(): void {
  document.querySelectorAll('.left-nav-link').forEach(l => l.classList.remove('active'));
  const sideBtn = document.getElementById('sidebar-btn-summary');
  if (sideBtn) sideBtn.classList.add('active');
  window.filters.hasSummary = !window.filters.hasSummary;
  const btn = document.getElementById('filter-summary-btn');
  if (btn) btn.classList.toggle('active', window.filters.hasSummary);
  renderTable();
}

export function filterBySubgroupData(): void {
  document.querySelectorAll('.left-nav-link').forEach(l => l.classList.remove('active'));
  const btn = document.getElementById('sidebar-btn-subgroup');
  if (btn) btn.classList.add('active');
  window.filters.hasSubgroup = true;
  window.filters.asianData = false;
  renderTable();
}

export function filterByAsianData(): void {
  document.querySelectorAll('.left-nav-link').forEach(l => l.classList.remove('active'));
  const btn = document.getElementById('sidebar-btn-asian');
  if (btn) btn.classList.add('active');
  window.filters.asianData = true;
  window.filters.hasSubgroup = false;
  renderTable();
}

export function resetFilters(): void {
  window.filters = {
    search: '',
    sourceType: null,
    specialty: null,
    condition: null,
    design: null,
    impact: null,
    period: null,
    asianData: false,
    hasSubgroup: false,
    hasSummary: false,
    icd10: null
  };
  const searchInp = document.getElementById('search-input') as HTMLInputElement | null;
  if (searchInp) searchInp.value = '';
  const asianCb = document.getElementById('asian-data-filter') as HTMLInputElement | null;
  if (asianCb) asianCb.checked = false;
  const btn = document.getElementById('filter-summary-btn');
  const sideBtn = document.getElementById('sidebar-btn-summary');
  if (btn) btn.classList.remove('active');
  if (sideBtn) sideBtn.classList.remove('active');
  renderFilterPills();
  renderTable();
}

export function switchTab(tabName: string): void {
  window.currentTab = tabName;

  document.querySelectorAll('.tab-trigger').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.getElementById(`tab-${tabName}`);
  if (activeBtn) activeBtn.classList.add('active');

  const sideStudies = document.getElementById('sidebar-btn-studies');
  const sideSaved = document.getElementById('sidebar-btn-saved');
  if (sideStudies) sideStudies.classList.remove('active');
  if (sideSaved) sideSaved.classList.remove('active');

  if (tabName === 'list') {
    if (sideStudies) sideStudies.classList.add('active');
    window.filters.hasSubgroup = false;
    window.filters.asianData = false;
    const asianCheckbox = document.getElementById('asian-data-filter') as HTMLInputElement | null;
    if (asianCheckbox) asianCheckbox.checked = false;
  }
  if (tabName === 'saved') {
    if (sideSaved) sideSaved.classList.add('active');
  }

  const panelStudies = document.getElementById('panel-studies');
  const panelCompare = document.getElementById('panel-compare');
  const panelAnalytics = document.getElementById('panel-analytics');
  const panelTimeline = document.getElementById('panel-timeline');
  const pageTitle = document.getElementById('page-panel-title');
  const updatesSec = document.getElementById('section-recent-updates');

  if (updatesSec) {
    updatesSec.style.display = (tabName === 'list') ? '' : 'none';
  }

  [panelStudies, panelCompare, panelAnalytics, panelTimeline]
    .filter(Boolean)
    .forEach(p => p!.classList.remove('active'));

  if (tabName === 'compare') {
    if (panelCompare) panelCompare.classList.add('active');
    if (pageTitle) pageTitle.textContent = 'So Sánh Tài Liệu';
    if (typeof window.renderCompareView === 'function') window.renderCompareView();
  } else if (tabName === 'analytics') {
    if (panelAnalytics) panelAnalytics.classList.add('active');
    if (pageTitle) pageTitle.textContent = 'Thống Kê & Phân Tích';
    if (typeof window.renderAnalytics === 'function') window.renderAnalytics();
  } else if (tabName === 'timeline') {
    if (panelTimeline) panelTimeline.classList.add('active');
    if (pageTitle) pageTitle.textContent = 'Timeline Hướng Dẫn';
    if (typeof window.renderTimeline === 'function') window.renderTimeline();
  } else {
    if (panelStudies) panelStudies.classList.add('active');
    if (pageTitle) pageTitle.textContent = tabName === 'saved' ? 'Tài Liệu Đã Lưu' : 'Hướng Dẫn & Nghiên Cứu Lâm Sàng';
    renderTable();
  }
}

export function setViewMode(mode: 'full' | 'compact'): void {
  window.viewMode = mode;
  const fullBtn = document.getElementById('view-mode-full');
  const compactBtn = document.getElementById('view-mode-compact');
  if (fullBtn) fullBtn.classList.toggle('active', mode === 'full');
  if (compactBtn) compactBtn.classList.toggle('active', mode === 'compact');
  renderTable();
}

export function toggleAdvancedFilters(): void {
  window.showAdvancedFilters = !window.showAdvancedFilters;
  const fSpec = document.getElementById('filter-row-specialty');
  const fDes = document.getElementById('filter-row-design');
  const fPer = document.getElementById('filter-row-period');
  const advBtn = document.getElementById('advanced-filters-btn');
  if (fSpec) fSpec.style.display = window.showAdvancedFilters ? 'flex' : 'none';
  if (fDes) fDes.style.display = window.showAdvancedFilters ? 'flex' : 'none';
  if (fPer) fPer.style.display = window.showAdvancedFilters ? 'flex' : 'none';
  if (advBtn) advBtn.classList.toggle('active', window.showAdvancedFilters);
}

export function toggleColumnsDropdown(event?: Event): void {
  if (event) event.stopPropagation();
  const menu = document.getElementById('columns-dropdown-menu');
  if (menu) menu.classList.toggle('active');
}

export function toggleColumnVisibility(colName: string, isVisible: boolean): void {
  window.columnVisibility[colName] = isVisible;
  const table = document.getElementById('studies-table-element');
  if (table) {
    const th = table.querySelector(`thead th[data-col="${colName}"]`) as HTMLElement | null;
    if (th) th.style.display = isVisible ? '' : 'none';
    table.querySelectorAll(`tbody td.col-${colName.toLowerCase()}`).forEach(td => {
      (td as HTMLElement).style.display = isVisible ? '' : 'none';
    });
  }
  renderTable();
}

export function renderSummaryButton(study: Study, variant = 'badge'): string {
  let parts: any[] = [];
  if (Array.isArray(study.parts) && study.parts.length > 0) {
    parts = study.parts;
  } else if (typeof study.parts === 'string') {
    try {
      const parsed = JSON.parse(study.parts);
      if (Array.isArray(parsed) && parsed.length > 0) parts = parsed;
    } catch(e) {}
  }
  
  if (parts.length === 0 && study.file) {
    parts = [{ title: 'Tóm tắt', file: study.file }];
  }

  if (parts.length === 0) return '';
  const isMulti = parts.length > 1;

  if (!isMulti) {
    const fileUrl = window.resolveStudyFile ? window.resolveStudyFile((parts[0] as any).file) : (parts[0] as any).file;
    if (variant === 'btn-primary' || variant === 'btn-primary-compare') {
      return `<a href="${fileUrl}" class="btn btn-small btn-primary" onclick="event.stopPropagation()">📝 Tóm tắt</a>`;
    } else if (variant === 'btn') {
      return `<a href="${fileUrl}" class="btn btn-small" onclick="event.stopPropagation()">📝 Tóm tắt</a>`;
    } else if (variant === 'badge-mobile') {
      return `<a href="${fileUrl}" class="badge-summary-inline" onclick="event.stopPropagation()" title="Mở bài viết tóm tắt chi tiết" style="margin-left: auto; font-size:0.7rem; padding: 2px 6px;">📝 Tóm tắt</a>`;
    } else {
      return `<a href="${fileUrl}" class="badge-summary-inline" onclick="event.stopPropagation()" title="Mở bài viết tóm tắt chi tiết">📝 Tóm tắt</a>`;
    }
  }

  const menuId = 'summary-parts-menu-' + study.id + '-' + variant + '-' + Math.floor(Math.random() * 10000);
  const itemsHtml = parts.map((p: any, idx: number) => `
    <a href="${window.resolveStudyFile ? window.resolveStudyFile(p.file) : p.file}" class="summary-parts-item" onclick="event.stopPropagation()">
      <i class="fa-solid fa-file-lines" style="color: var(--color-primary, #0284c7); margin-right: 6px;"></i>
      <span>${escapeHtml(p.title || p.label || ('Phần ' + (idx + 1)))}</span>
    </a>
  `).join('');

  let btnClass = 'badge-summary-inline';
  let btnStyle = '';
  if (variant === 'btn-primary' || variant === 'btn-primary-compare') {
    btnClass = 'btn btn-small btn-primary';
  } else if (variant === 'btn') {
    btnClass = 'btn btn-small';
  } else if (variant === 'badge-mobile') {
    btnStyle = 'margin-left: auto; font-size:0.7rem; padding: 2px 6px;';
  }

  return `
    <div class="summary-parts-dropdown" style="position:relative; display:inline-block;">
      <button type="button" class="${btnClass}" style="${btnStyle}" onclick="event.stopPropagation(); toggleSummaryPartsMenu('${menuId}', event)" title="Xem ${parts.length} phần tóm tắt">
        📝 Tóm tắt (${parts.length} Phần) <span style="font-size:9px; margin-left:3px;">▼</span>
      </button>
      <div id="${menuId}" class="summary-parts-menu" onclick="event.stopPropagation()">
        <div style="font-size: 0.72rem; font-weight: 700; color: var(--text-muted); padding: 4px 8px 6px; border-bottom: 1px solid var(--border-light); margin-bottom: 4px;">
          📚 Danh sách bài tóm tắt (${parts.length} phần):
        </div>
        ${itemsHtml}
      </div>
    </div>
  `;
}

export function renderSummaryActionButton(study: Study): string {
  let parts: any[] = [];
  if (Array.isArray(study.parts) && study.parts.length > 0) {
    parts = study.parts;
  } else if (typeof study.parts === 'string') {
    try {
      const parsed = JSON.parse(study.parts);
      if (Array.isArray(parsed) && parsed.length > 0) parts = parsed;
    } catch(e) {}
  }
  if (parts.length === 0 && study.file) {
    parts = [{ title: 'Tóm tắt', file: study.file }];
  }
  if (parts.length === 0) return '';
  if (parts.length === 1) {
    const fileUrl = window.resolveStudyFile ? window.resolveStudyFile((parts[0] as any).file) : (parts[0] as any).file;
    return `<a href="${fileUrl}" class="btn btn-small btn-primary" title="Đọc bài tóm tắt" onclick="event.stopPropagation()">📖</a>`;
  }
  const menuId = 'summary-parts-act-' + study.id + '-' + Math.floor(Math.random() * 10000);
  const itemsHtml = parts.map((p: any, idx: number) => `
    <a href="${window.resolveStudyFile ? window.resolveStudyFile(p.file) : p.file}" class="summary-parts-item" onclick="event.stopPropagation()">
      <i class="fa-solid fa-file-lines" style="color: var(--color-primary, #0284c7); margin-right: 6px;"></i>
      <span>${escapeHtml(p.title || p.label || ('Phần ' + (idx + 1)))}</span>
    </a>
  `).join('');
  return `
    <div class="summary-parts-dropdown" style="position:relative; display:inline-block;">
      <button type="button" class="btn btn-small btn-primary" onclick="event.stopPropagation(); toggleSummaryPartsMenu('${menuId}', event)" title="Đọc bài tóm tắt (${parts.length} phần)">📖 <span style="font-size:8px;">▼</span></button>
      <div id="${menuId}" class="summary-parts-menu" style="right:0; left:auto;" onclick="event.stopPropagation()">
        <div style="font-size: 0.72rem; font-weight: 700; color: var(--text-muted); padding: 4px 8px 6px; border-bottom: 1px solid var(--border-light); margin-bottom: 4px;">
          📚 Danh sách bài tóm tắt (${parts.length} phần):
        </div>
        ${itemsHtml}
      </div>
    </div>
  `;
}

export function toggleSummaryPartsMenu(menuId: string, event?: Event): void {
  if (event) event.stopPropagation();
  const menu = document.getElementById(menuId);
  if (!menu) return;
  const isAlreadyActive = menu.classList.contains('active');

  // Close all open summary menus and remove elevation classes
  document.querySelectorAll('.summary-parts-menu.active').forEach(m => {
    m.classList.remove('active');
    m.closest('.summary-parts-dropdown')?.classList.remove('active');
    m.closest('tr')?.classList.remove('has-active-dropdown');
    m.closest('td')?.classList.remove('has-active-dropdown');
  });

  if (!isAlreadyActive) {
    menu.classList.add('active');
    menu.closest('.summary-parts-dropdown')?.classList.add('active');
    menu.closest('tr')?.classList.add('has-active-dropdown');
    menu.closest('td')?.classList.add('has-active-dropdown');
  }
}

// Global click listener to close summary menus when clicking outside
if (typeof document !== 'undefined') {
  document.addEventListener('click', (e: MouseEvent) => {
    const target = e.target as HTMLElement | null;
    if (!target || !target.closest('.summary-parts-dropdown')) {
      document.querySelectorAll('.summary-parts-menu.active').forEach(m => {
        m.classList.remove('active');
        m.closest('.summary-parts-dropdown')?.classList.remove('active');
        m.closest('tr')?.classList.remove('has-active-dropdown');
        m.closest('td')?.classList.remove('has-active-dropdown');
      });
    }
  });
}

function escapeHtml(str?: string): string {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function getFilteredStudies(): Study[] {
  let list = window.studies || [];

  if (window.currentTab === 'saved') {
    list = list.filter(s => s.bookmarked);
  }

  return list.filter(study => {
    if (window.filters.search) {
      const rawQuery = window.filters.search.trim().toLowerCase();
      if (rawQuery) {
        // Build comprehensive searchable text
        const title = (study.title || '').toLowerCase();
        const drug = (study.drug || '').toLowerCase();
        const summary = (study.summary || '').toLowerCase();
        const detailedConclusion = (study.detailedConclusion || '').toLowerCase();
        const keyResults = (study.keyResults || '').toLowerCase();
        const population = (study.population || '').toLowerCase();
        const intervention = (study.intervention || '').toLowerCase();
        const org = (study.organization || study.journal || '').toLowerCase();
        const author = (study.author || '').toLowerCase();
        const year = String(study.year || '').toLowerCase();
        const primaryEndpoint = (study.primaryEndpoint || '').toLowerCase();
        const icdStr = Array.isArray(study.icd10) ? study.icd10.join(' ').toLowerCase() : (study.icd10 || '').toLowerCase();
        const specName = (window.SPECIALTIES && window.SPECIALTIES[study.specialty]?.name) ? window.SPECIALTIES[study.specialty].name.toLowerCase() : (study.specialty || '').toLowerCase();
        const condObj = (window.CLINICAL_CONDITIONS && study.conditionKey && window.CLINICAL_CONDITIONS[study.conditionKey]) ? window.CLINICAL_CONDITIONS[study.conditionKey] : null;
        const condName = (condObj?.name || study.conditionKey || '').toLowerCase();
        const partsStr = Array.isArray(study.parts) ? study.parts.map((p: any) => (p.title || p.label || '')).join(' ').toLowerCase() : '';

        const fullSearchable = `${title} ${drug} ${summary} ${detailedConclusion} ${keyResults} ${population} ${intervention} ${org} ${author} ${year} ${primaryEndpoint} ${icdStr} ${specName} ${condName} ${partsStr}`;

        // Support multiple search words: all words must be found
        const queryTerms = rawQuery.split(/\s+/).filter(t => t.length > 0);
        const matchesAll = queryTerms.every(term => fullSearchable.includes(term));
        if (!matchesAll) {
          return false;
        }
      }
    }

    if (window.filters.sourceType && study.sourceType !== window.filters.sourceType) return false;
    if (window.filters.specialty && study.specialty !== window.filters.specialty) return false;
    if (window.filters.design && study.design !== window.filters.design) return false;
    if (window.filters.impact && study.impact !== window.filters.impact) return false;
    if (window.filters.asianData && !study.asianData) return false;
    if (window.filters.hasSummary && (!study.parts || (study.parts as any).length === 0) && !study.file) return false;
    if (window.filters.hasSubgroup && (!study.subgroups || typeof study.subgroups !== 'object' || Object.keys(study.subgroups).length === 0)) return false;

    if (window.filters.condition && window.CLINICAL_CONDITIONS) {
      const condObj = window.CLINICAL_CONDITIONS[window.filters.condition];
      if (condObj && condObj.icd10) {
        const studyIcds = Array.isArray(study.icd10) ? study.icd10 : (study.icd10 ? [study.icd10] : []);
        const condIcds = Array.isArray(condObj.icd10) ? condObj.icd10 : [condObj.icd10];
        const hasMatch = studyIcds.some(c => c && condIcds.some((target: string) => {
          const cUpper = String(c).trim().toUpperCase();
          const tUpper = String(target).trim().toUpperCase();
          return cUpper.startsWith(tUpper) || tUpper.startsWith(cUpper);
        }));
        if (!hasMatch && study.conditionKey !== window.filters.condition) return false;
      } else if (study.conditionKey !== window.filters.condition) {
        return false;
      }
    }

    if (window.filters.period && window.filters.period !== null) {
      const yr = study.year ? parseInt(String(study.year)) : 0;
      if (window.filters.period === 'last5') {
        if (yr < new Date().getFullYear() - 4) return false;
      } else {
        const filterYr = parseInt(window.filters.period);
        if (yr !== filterYr) return false;
      }
    }

    return true;
  });
}

export function renderJournalMetricsBadge(study: Study): string {
  const profile = window.getJournalQualityProfile ? window.getJournalQualityProfile(study.journal || study.organization || '', study) : null;
  const metrics = profile ? profile.metrics : (window.getJournalMetrics ? window.getJournalMetrics(study.journal || study.organization || '', study) : null);
  const ifVal = (metrics && metrics.if) ? metrics.if : (study.impactFactor || study.if || null);
  const qVal = (metrics && metrics.quartile) ? metrics.quartile : (study.quartile || (study.sourceType === 'vn-moh' ? 'MOH' : null));
  const sjrVal = (metrics && metrics.sjr) ? metrics.sjr : (study.sjr || null);
  const ts = profile ? profile.trustScore : null;
  const pAudit = profile ? profile.predatoryAudit : null;

  if (!ifVal && !qVal && !sjrVal) {
    if (study.sourceType === 'vn-moh') {
      return `<span class="journal-metrics-tag tag-moh" title="Khuyến cáo Cấp Quốc gia — Bộ Y tế Việt Nam">🇻🇳 BYT</span>`;
    }
    return '';
  }

  let qClass = 'tag-q1';
  if (qVal === 'Q2') qClass = 'tag-q2';
  if (qVal === 'Q3') qClass = 'tag-q3';
  if (qVal === 'Q4') qClass = 'tag-q4';
  if (qVal === 'MOH') qClass = 'tag-moh';

  let predBadge = '';
  if (pAudit && pAudit.isPredatory) {
    predBadge = `<span class="journal-metrics-tag tag-moh" style="background:#7f1d1d; color:#fca5a5;" title="${pAudit.summary}">🚨 Predatory Risk</span>`;
  }

  return `
    <span class="journal-metrics-tag ${qClass}">
      ${ifVal ? `<strong>⭐ IF: ${ifVal}</strong>` : ''}
      ${qVal ? `<span class="q-chip">${qVal}</span>` : ''}
      ${ts ? `<span style="opacity:0.85; font-size:0.65rem;">(${ts.score} pts)</span>` : ''}
    </span>
    ${predBadge}
  `;
}

export function renderJournalMetricsColumn(study: Study): string {
  const profile = window.getJournalQualityProfile ? window.getJournalQualityProfile(study.journal || study.organization || '', study) : null;
  const metrics = profile ? profile.metrics : (window.getJournalMetrics ? window.getJournalMetrics(study.journal || study.organization || '', study) : null);
  const ifVal = (metrics && metrics.if) ? metrics.if : (study.impactFactor || study.if || null);
  const qVal = (metrics && metrics.quartile) ? metrics.quartile : (study.quartile || (study.sourceType === 'vn-moh' ? 'MOH' : null));
  const sjrVal = (metrics && metrics.sjr) ? metrics.sjr : (study.sjr || null);
  const ts = profile ? profile.trustScore : null;
  const pAudit = profile ? profile.predatoryAudit : null;

  if (!ifVal && !qVal && !sjrVal) {
    if (study.sourceType === 'vn-moh') {
      return `<span class="journal-metrics-tag tag-moh">🇻🇳 Bộ Y tế</span>`;
    }
    return '<span style="color:var(--text-muted); font-size:0.75rem;">-</span>';
  }

  let qClass = 'tag-q1';
  if (qVal === 'Q2') qClass = 'tag-q2';
  if (qVal === 'Q3') qClass = 'tag-q3';
  if (qVal === 'Q4') qClass = 'tag-q4';
  if (qVal === 'MOH') qClass = 'tag-moh';

  let predHtml = '';
  if (pAudit && pAudit.isPredatory) {
    predHtml = `<div style="font-size:0.65rem; color:#dc2626; font-weight:800;" title="${pAudit.summary}">🚨 Risk: High Predatory</div>`;
  }

  return `
    <div class="journal-metrics-col-box" style="display:flex; flex-direction:column; gap:3px; font-size:0.75rem;">
      <div style="display:flex; align-items:center; gap:4px; flex-wrap:wrap;">
        ${ifVal ? `<span class="journal-metrics-tag ${qClass}" style="padding:2px 6px; font-size:0.7rem;">⭐ IF: ${ifVal}</span>` : ''}
        ${qVal ? `<span class="journal-metrics-tag ${qClass}" style="padding:2px 6px; font-size:0.7rem;">${qVal}</span>` : ''}
      </div>
      <div style="font-size:0.68rem; color:var(--text-muted); line-height:1.2; display:flex; gap:6px; align-items:center;">
        ${ts ? `<span style="font-weight:700; color:${ts.color};">TS: ${ts.score}/100</span>` : ''}
        ${sjrVal ? `<span>SJR: ${sjrVal}</span>` : ''}
      </div>
      ${predHtml}
    </div>
  `;
}

export function renderTable(): void {
  const tbody = document.getElementById('studies-tbody') || document.getElementById('table-body');
  const displayCount = document.getElementById('display-count');
  const totalCountSidebar = document.getElementById('total-count-sidebar');
  const savedCountSidebar = document.getElementById('saved-count-sidebar');
  const summaryCountSidebar = document.getElementById('summary-count-sidebar');
  const emptyState = document.getElementById('empty-state');

  const filtered = getFilteredStudies();

  if (totalCountSidebar) totalCountSidebar.textContent = String((window.studies || []).length);
  if (savedCountSidebar) savedCountSidebar.textContent = String((window.studies || []).filter(s => s.bookmarked).length);
  if (summaryCountSidebar) summaryCountSidebar.textContent = String((window.studies || []).filter(s => (s.parts && (s.parts as any).length > 0) || s.file).length);
  if (displayCount) displayCount.textContent = String(filtered.length);

  const heroTotal = document.getElementById('hero-total-count') || document.getElementById('stat-total-guidelines');
  const heroPractice = document.getElementById('hero-practice-changing-count') || document.getElementById('stat-practice-changing');
  const heroVn = document.getElementById('hero-vn-count') || document.getElementById('stat-moh-guidelines');
  const heroSpecialty = document.getElementById('hero-specialty-count') || document.getElementById('stat-q1-guidelines');

  const allStudies = window.studies || [];
  if (heroTotal) heroTotal.textContent = String(allStudies.length);
  if (heroPractice) heroPractice.textContent = String(allStudies.filter(s => s.impact === 'practice-changing').length);
  if (heroVn) heroVn.textContent = String(allStudies.filter(s => s.sourceType && s.sourceType.startsWith('vn-')).length);
  if (heroSpecialty) heroSpecialty.textContent = String(allStudies.filter(s => s.quartile === 'Q1' || s.quartile === 'Q2' || (s.impactFactor && s.impactFactor >= 10)).length || '118+');


  if (!tbody) return;

  const isCompact = window.viewMode === 'compact';
  const table = document.getElementById('studies-table-element');
  if (table) {
    const detailedCols = ['sourceType', 'specialty', 'design', 'organization', 'journalMetrics', 'intervention', 'primaryEndpoint', 'keyResults', 'impact', 'conclusion', 'sampleSize', 'population', 'icd10'];
    detailedCols.forEach(col => {
      const th = table.querySelector(`thead th[data-col="${col}"]`) as HTMLElement | null;
      if (th) th.style.display = (window.columnVisibility[col] && !isCompact) ? '' : 'none';
    });
  }

  const selectAllCb = document.getElementById('select-all-checkboxes') as HTMLInputElement | null;
  if (selectAllCb) {
    if (filtered.length > 0 && filtered.every(s => window.selectedIds && window.selectedIds.has(s.id))) {
      selectAllCb.checked = true;
      selectAllCb.indeterminate = false;
    } else if (filtered.some(s => window.selectedIds && window.selectedIds.has(s.id))) {
      selectAllCb.checked = false;
      selectAllCb.indeterminate = true;
    } else {
      selectAllCb.checked = false;
      selectAllCb.indeterminate = false;
    }
  }

  if (filtered.length === 0) {
    tbody.innerHTML = '';
    if (emptyState) emptyState.style.display = 'block';
    return;
  } else {
    if (emptyState) emptyState.style.display = 'none';
  }

  filtered.sort((a, b) => {
    let valA = (a as any)[window.sortField] || '';
    let valB = (b as any)[window.sortField] || '';
    if (typeof valA === 'string') valA = valA.toLowerCase();
    if (typeof valB === 'string') valB = valB.toLowerCase();
    if (valA < valB) return window.sortAsc ? -1 : 1;
    if (valA > valB) return window.sortAsc ? 1 : -1;
    return 0;
  });

  let html = '';
  filtered.forEach(study => {
    const isSelected = window.selectedIds.has(study.id);
    const isExpanded = window.expandedIds.has(study.id);
    const specObj = window.SPECIALTIES && window.SPECIALTIES[study.specialty] ? window.SPECIALTIES[study.specialty] : { name: study.specialty, color: '#0284c7', bg: '#f0f9ff' };
    const sourceObj = window.SOURCE_TYPES && window.SOURCE_TYPES[study.sourceType] ? window.SOURCE_TYPES[study.sourceType] : { name: study.sourceType, color: '#64748b', bg: '#f1f5f9' };
    const designObj = window.DESIGNS && window.DESIGNS[study.design] ? window.DESIGNS[study.design] : { name: study.design };
    const impactObj = window.IMPACTS && window.IMPACTS[study.impact] ? window.IMPACTS[study.impact] : { name: study.impact, color: '#2563eb', bg: '#eff6ff' };

    const showCol = (colName: string) => (window.columnVisibility[colName] && !isCompact) ? '' : 'none';

    html += `
      <tr class="study-row ${isSelected ? 'selected' : ''}" data-id="${study.id}">
        <td class="col-select" onclick="event.stopPropagation()">
          <input type="checkbox" ${isSelected ? 'checked' : ''} onchange="toggleSelectStudy('${study.id}', this.checked)">
        </td>
        <td class="col-title">
          <div style="display:flex; align-items:flex-start; gap:8px;">
            <button class="bookmark-btn ${study.bookmarked ? 'active' : ''}" onclick="toggleBookmark('${study.id}', event)" title="${study.bookmarked ? 'Bỏ lưu' : 'Lưu trữ'}">
              ${study.bookmarked ? '★' : '☆'}
            </button>
            <div>
              <div class="study-title-text" onclick="toggleExpandRow('${study.id}')">${escapeHtml(study.title)}</div>
              <div class="study-meta-sub">
                <span class="spec-tag" style="background:${specObj.bg}; color:${specObj.color}; border: 1px solid ${specObj.color}30;">${escapeHtml(specObj.name)}</span>
                ${study.drug ? `<span class="drug-tag">💊 ${escapeHtml(study.drug)}</span>` : ''}
                ${study.year ? `<span class="year-tag">📅 ${study.year}</span>` : ''}
                ${renderJournalMetricsBadge(study)}
                ${renderSummaryButton(study, 'badge')}
              </div>
            </div>
          </div>
        </td>
        <td class="col-source" style="display:${showCol('sourceType')};">
          <span class="source-tag" style="background:${sourceObj.bg}; color:${sourceObj.color};">${escapeHtml(sourceObj.name)}</span>
        </td>
        <td class="col-specialty" style="display:${showCol('specialty')};">
          <span class="spec-tag" style="background:${specObj.bg}; color:${specObj.color};">${escapeHtml(specObj.name)}</span>
        </td>
        <td class="col-design" style="display:${showCol('design')};">${escapeHtml(designObj.name)}</td>
        <td class="col-org" style="display:${showCol('organization')};">${escapeHtml(study.journal || study.organization || 'N/A')}</td>
        <td class="col-journal-metrics" style="display:${showCol('journalMetrics')};">${renderJournalMetricsColumn(study)}</td>
        <td class="col-interv" style="display:${showCol('intervention')};">${escapeHtml(study.intervention || 'N/A')}</td>
        <td class="col-endpoint" style="display:${showCol('primaryEndpoint')};">${escapeHtml(study.primaryEndpoint || 'N/A')}</td>
        <td class="col-results" style="display:${showCol('keyResults')};">${window.renderStudyMiniChart ? window.renderStudyMiniChart(study) : escapeHtml(study.keyResults || 'N/A')}</td>
        <td class="col-impact" style="display:${showCol('impact')};">
          <span class="impact-tag" style="background:${impactObj.bg}; color:${impactObj.color};">${escapeHtml(impactObj.name)}</span>
        </td>
        <td class="col-conclusion" style="display:${showCol('conclusion')};">${escapeHtml(study.summary || 'N/A')}</td>
        <td class="col-samplesize" style="display:${showCol('sampleSize')};">${study.sampleSize ? Number(study.sampleSize).toLocaleString() : 'N/A'}</td>
        <td class="col-population" style="display:${showCol('population')};">${escapeHtml(study.population || 'N/A')}</td>
        <td class="col-icd10" style="display:${showCol('icd10')};">${escapeHtml(Array.isArray(study.icd10) ? study.icd10.join(', ') : (study.icd10 || 'N/A'))}</td>
        <td class="col-actions" onclick="event.stopPropagation()">
          <div style="display:flex; gap:4px; align-items:center; justify-content:center;">
            <button class="btn btn-small" onclick="window.GuidelineTools && window.GuidelineTools.addToCompare('${study.id}')" title="Thêm vào đối sánh">⚖️</button>
            <button class="btn btn-small" onclick="window.openResearchToolkitModal && window.openResearchToolkitModal('citation', window.studies.find(s=>s.id==='${study.id}'))" title="Trích dẫn &amp; Thẩm định khoa học">🔬</button>
            ${renderSummaryActionButton(study)}
            <button class="btn btn-small" onclick="window.openEditModal ? window.openEditModal('${study.id}') : null" title="Chỉnh sửa">✏️</button>
            <button class="btn btn-small btn-danger" onclick="deleteStudy('${study.id}')" title="Xóa nghiên cứu này">🗑️</button>
          </div>
        </td>
      </tr>
    `;

    if (isExpanded) {
      const subgroupChart = window.renderSubgroupForestPlot ? window.renderSubgroupForestPlot(study.subgroups) : '';
      html += `
        <tr class="expanded-detail-row">
          <td colspan="15" style="padding: 1.25rem; background: var(--surface-2); border-bottom: 2.5px solid var(--accent);">
            <div style="display:flex; flex-direction:column; gap:0.75rem; font-size:0.85rem; line-height:1.6; color:var(--text);">
              <div><strong>💡 Tóm tắt chi tiết:</strong> ${escapeHtml(study.detailedConclusion || study.summary || 'Chưa có thông tin')}</div>
              ${subgroupChart ? `<div><strong>🧬 Phân tích Phân nhóm (Subgroups):</strong>${subgroupChart}</div>` : ''}
              <div style="display:flex; gap:8px; margin-top:4px; flex-wrap:wrap;">
                <button class="btn btn-small btn-primary" onclick="window.openResearchToolkitModal && window.openResearchToolkitModal('pico', window.studies.find(s=>s.id==='${study.id}'))">
                  🎯 Mô hình PICO &amp; MeSH Search
                </button>
                <button class="btn btn-small" onclick="window.openResearchToolkitModal && window.openResearchToolkitModal('rob2', window.studies.find(s=>s.id==='${study.id}'))">
                  🛡️ Thẩm định RoB 2.0 / NOS
                </button>
                <button class="btn btn-small" onclick="window.openResearchToolkitModal && window.openResearchToolkitModal('citation', window.studies.find(s=>s.id==='${study.id}'))">
                  📑 Xuất Trích Dẫn Học Thuật (RIS / BibTeX / Vancouver)
                </button>
              </div>
            </div>
          </td>
        </tr>
      `;
    }
  });

  tbody.innerHTML = html;
}

export function toggleSelectStudy(id: string, isChecked: boolean): void {
  if (isChecked) {
    window.selectedIds.add(id);
  } else {
    window.selectedIds.delete(id);
  }
  if (window.GuidelineTools && typeof window.GuidelineTools.updateFloatingCompareBar === 'function') {
    window.GuidelineTools.updateFloatingCompareBar();
  }
  renderTable();
}

export function toggleSelectAllRows(isChecked: boolean): void {
  const filtered = getFilteredStudies();
  if (!filtered || filtered.length === 0) return;

  if (!window.selectedIds) window.selectedIds = new Set<string>();

  if (isChecked) {
    filtered.forEach(s => window.selectedIds.add(s.id));
  } else {
    filtered.forEach(s => window.selectedIds.delete(s.id));
  }

  if (window.GuidelineTools && typeof window.GuidelineTools.updateFloatingCompareBar === 'function') {
    window.GuidelineTools.updateFloatingCompareBar();
  }
  renderTable();
}

export function toggleBookmark(id: string, event?: Event): void {
  if (event) event.stopPropagation();
  const study = (window.studies || []).find(s => s.id === id);
  if (study) {
    study.bookmarked = !study.bookmarked;
    if (window.saveStudies) window.saveStudies();
    if (window.dbSaveStudy) window.dbSaveStudy(study);
    renderTable();
  }
}

export function toggleExpandRow(id: string): void {
  if (window.expandedIds.has(id)) {
    window.expandedIds.delete(id);
  } else {
    window.expandedIds.add(id);
  }
  renderTable();
}

export function deleteStudy(id: string): void {
  const study = (window.studies || []).find(s => s.id === id);
  const name = study ? study.title : id;
  if (!confirm(`🗑️ Bạn có chắc muốn XÓA nghiên cứu:\n"${name}"?\n\nThao tác này không thể hoàn tác!`)) return;

  window.studies = (window.studies || []).filter(s => s.id !== id);
  window.selectedIds.delete(id);
  window.expandedIds.delete(id);

  if (window.saveStudies) window.saveStudies();
  if (window.dbDeleteStudy) window.dbDeleteStudy(id);

  renderTable();
  if (window.renderUpdates) window.renderUpdates();
}

export function deleteSelectedStudies(): void {
  if (!window.selectedIds || window.selectedIds.size === 0) {
    alert('⚠️ Vui lòng tích chọn ít nhất 1 nghiên cứu trong danh sách để xóa!');
    return;
  }
  const count = window.selectedIds.size;
  if (!confirm(`🗑️ Bạn có chắc chắn muốn XÓA HÀNG LOẠT ${count} nghiên cứu/tài liệu đã chọn?\n\nThao tác này không thể hoàn tác!`)) return;

  window.studies = (window.studies || []).filter(s => !window.selectedIds.has(s.id));
  window.selectedIds.forEach(id => {
    if (window.dbDeleteStudy) window.dbDeleteStudy(id);
    window.expandedIds.delete(id);
  });
  window.selectedIds.clear();

  if (window.saveStudies) window.saveStudies();
  renderTable();
  if (window.renderUpdates) window.renderUpdates();
}

// Export Table APIs to window
if (typeof window !== 'undefined') {
  window.CONDITION_SPECIALTY_MAP = CONDITION_SPECIALTY_MAP;
  window.renderFilterPills = renderFilterPills;
  window.setFilter = setFilter;
  window.filterByHasSummary = filterByHasSummary;
  window.filterBySubgroupData = filterBySubgroupData;
  window.filterByAsianData = filterByAsianData;
  window.resetFilters = resetFilters;
  window.switchTab = switchTab;
  window.setViewMode = setViewMode;
  window.toggleAdvancedFilters = toggleAdvancedFilters;
  window.toggleColumnsDropdown = toggleColumnsDropdown;
  window.toggleColumnVisibility = toggleColumnVisibility;
  window.renderSummaryButton = renderSummaryButton;
  window.renderSummaryActionButton = renderSummaryActionButton;
  window.toggleSummaryPartsMenu = toggleSummaryPartsMenu;
  window.getFilteredStudies = getFilteredStudies;
  window.renderTable = renderTable;
  window.toggleSelectStudy = toggleSelectStudy;
  window.toggleSelectAllRows = toggleSelectAllRows;
  window.toggleBookmark = toggleBookmark;

  window.toggleExpandRow = toggleExpandRow;
  window.deleteStudy = deleteStudy;
  window.deleteSelectedStudies = deleteSelectedStudies;
}
