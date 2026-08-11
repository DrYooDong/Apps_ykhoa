/**
 * guideline-table.js
 * Quản lý Render Bảng Bệnh Án, Thẻ Compact & Bộ Lọc
 * Pure HTML5 / Vanilla CSS3 / ES6+ JavaScript
 */

(function () {
  'use strict';

  const CONDITION_SPECIALTY_MAP = {
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
    'hepatitis-b': ['infect', 'gastro'],
    'hepatitis-c': ['infect', 'gastro'],
    'flu': ['infect', 'pulmo'],
    'covid19': ['infect', 'pulmo'],
    'hemorrhagic-fever': ['infect'],
    'measles': ['infect', 'peds'],
    'invasive-fungal': ['infect', 'pulmo', 'icu'],
    'hfmd': ['infect', 'peds'],
    'cirrhosis': ['gastro'],
    'masld-mash': ['gastro', 'endo'],
    'gerd-peptic': ['gastro'],
    'ibd': ['gastro'],
    'stroke': ['neuro', 'cardio'],
    'epilepsy': ['neuro'],
    'headache-migraine': ['neuro'],
    'gout': ['rheuma', 'endo'],
    'ra': ['rheuma'],
    'osteoporosis': ['rheuma', 'endo'],
    'lupus-sle': ['rheuma'],
    'solid-cancers': ['onco'],
    'vte-pe': ['hematology', 'cardio', 'icu']
  };

  function renderFilterPills() {
    const filterRowCond = document.getElementById('filter-row-condition');
    const condContainer = document.getElementById('condition-pills');

    if (filterRowCond) {
      if (!window.filters.specialty) {
        filterRowCond.style.display = 'none';
        window.filters.condition = null;
      } else {
        filterRowCond.style.display = 'flex';
        
        const specName = (window.SPECIALTIES && window.SPECIALTIES[window.filters.specialty]) ? window.SPECIALTIES[window.filters.specialty].name : 'Chuyên khoa';
        const labelEl = filterRowCond.querySelector('.filter-row-label');
        if (labelEl) labelEl.textContent = `Vấn đề / Bệnh (${specName})`;

        if (condContainer && window.CLINICAL_CONDITIONS) {
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
              condHtml += `<button class="filter-pill ${window.filters.condition === key ? 'active' : ''}" onclick="setFilter('condition', '${key}')" title="Mã ICD-10: ${cond.icd10.join(', ')}">${cond.name}</button>`;
            });
          }

          condContainer.innerHTML = condHtml;
        }
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
      let periodHtml = periods.map(p =>
        `<button class="filter-pill ${window.filters.period === p.key ? 'active' : ''}" onclick="setFilter('period', ${p.key === null ? 'null' : `'${p.key}'`})">${p.label}</button>`
      ).join('');
      periodContainer.innerHTML = periodHtml;
    }

    // Render spec filter list in sidebar (left nav)
    const specFilterList = document.getElementById('spec-filter-list');
    if (specFilterList && window.SPECIALTIES) {
      let specNavHtml = `<button class="left-nav-link ${window.filters.specialty === null ? 'active' : ''}" onclick="setFilter('specialty', null)"><span class="left-nav-icon">🏥</span><span class="left-nav-text">Tất cả chuyên khoa</span></button>`;
      Object.entries(window.SPECIALTIES).forEach(([key, spec]) => {
        specNavHtml += `<button class="left-nav-link ${window.filters.specialty === key ? 'active' : ''}" onclick="setFilter('specialty', '${key}')"><span class="left-nav-icon" style="width:10px; height:10px; border-radius:50%; background:${spec.color}; display:inline-block;"></span><span class="left-nav-text" style="color:${window.filters.specialty === key ? '' : spec.color};">${spec.name}</span></button>`;
      });
      specFilterList.innerHTML = specNavHtml;
    }
  }

  function setFilter(type, value) {
    if (type === 'specialty') {
      window.filters.specialty = value;
      window.filters.condition = null;
    } else {
      window.filters[type] = value;
    }
    renderFilterPills();
    renderTable();
  }

  function filterByHasSummary() {
    document.querySelectorAll('.left-nav-link').forEach(l => l.classList.remove('active'));
    const sideBtn = document.getElementById('sidebar-btn-summary');
    if (sideBtn) sideBtn.classList.add('active');
    window.filters.hasSummary = !window.filters.hasSummary;
    const btn = document.getElementById('filter-summary-btn');
    if (btn) btn.classList.toggle('active', window.filters.hasSummary);
    renderTable();
  }

  function filterBySubgroupData() {
    document.querySelectorAll('.left-nav-link').forEach(l => l.classList.remove('active'));
    const btn = document.getElementById('sidebar-btn-subgroup');
    if (btn) btn.classList.add('active');
    window.filters.hasSubgroup = true;
    window.filters.asianData = false;
    renderTable();
  }

  function filterByAsianData() {
    document.querySelectorAll('.left-nav-link').forEach(l => l.classList.remove('active'));
    const btn = document.getElementById('sidebar-btn-asian');
    if (btn) btn.classList.add('active');
    window.filters.asianData = true;
    window.filters.hasSubgroup = false;
    renderTable();
  }

  function resetFilters() {
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
    const searchInp = document.getElementById('search-input');
    if (searchInp) searchInp.value = '';
    const asianCb = document.getElementById('asian-data-filter');
    if (asianCb) asianCb.checked = false;
    const btn = document.getElementById('filter-summary-btn');
    const sideBtn = document.getElementById('sidebar-btn-summary');
    if (btn) btn.classList.remove('active');
    if (sideBtn) sideBtn.classList.remove('active');
    renderFilterPills();
    renderTable();
  }

  function switchTab(tabName) {
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
      const asianCheckbox = document.getElementById('asian-data-filter');
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

    [panelStudies, panelCompare, panelAnalytics, panelTimeline]
      .filter(Boolean)
      .forEach(p => p.classList.remove('active'));

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

  function setViewMode(mode) {
    window.viewMode = mode;
    const fullBtn = document.getElementById('view-mode-full');
    const compactBtn = document.getElementById('view-mode-compact');
    if (fullBtn) fullBtn.classList.toggle('active', mode === 'full');
    if (compactBtn) compactBtn.classList.toggle('active', mode === 'compact');
    renderTable();
  }

  function toggleAdvancedFilters() {
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

  function toggleColumnsDropdown(event) {
    if (event) event.stopPropagation();
    const menu = document.getElementById('columns-dropdown-menu');
    if (menu) menu.classList.toggle('active');
  }

  function toggleColumnVisibility(colName, isVisible) {
    window.columnVisibility[colName] = isVisible;
    const table = document.getElementById('studies-table-element');
    if (table) {
      const th = table.querySelector(`thead th[data-col="${colName}"]`);
      if (th) th.style.display = isVisible ? '' : 'none';
      table.querySelectorAll(`tbody td.col-${colName.toLowerCase()}`).forEach(td => {
        td.style.display = isVisible ? '' : 'none';
      });
    }
    renderTable();
  }

  function renderSummaryButton(study, variant = 'badge') {
    const parts = (study.parts && Array.isArray(study.parts) && study.parts.length > 0)
      ? study.parts
      : (study.file ? [{ label: 'Tóm tắt', file: study.file }] : []);

    if (!parts || parts.length === 0) return '';
    const isMulti = parts.length > 1;

    if (!isMulti) {
      const fileUrl = window.resolveStudyFile ? window.resolveStudyFile(parts[0].file) : parts[0].file;
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
    const itemsHtml = parts.map((p, idx) => `
      <a href="${window.resolveStudyFile ? window.resolveStudyFile(p.file) : p.file}" class="summary-parts-item" onclick="event.stopPropagation()">
        <i class="fa-solid fa-file-lines" style="color: var(--accent); margin-right: 6px;"></i>
        <span>${escapeHtml(p.label || ('Phần ' + (idx + 1)))}</span>
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
        <button type="button" class="${btnClass}" style="${btnStyle}" onclick="event.stopPropagation(); toggleSummaryPartsMenu('${menuId}', event)" title="Chọn phần tóm tắt">
          📝 Tóm tắt (${parts.length} Phần) <span style="font-size:9px; margin-left:3px;">▼</span>
        </button>
        <div id="${menuId}" class="summary-parts-menu" onclick="event.stopPropagation()">
          ${itemsHtml}
        </div>
      </div>
    `;
  }

  function toggleSummaryPartsMenu(menuId, event) {
    if (event) event.stopPropagation();
    const menu = document.getElementById(menuId);
    if (!menu) return;
    const isAlreadyActive = menu.classList.contains('active');
    document.querySelectorAll('.summary-parts-menu.active').forEach(m => m.classList.remove('active'));
    if (!isAlreadyActive) {
      menu.classList.add('active');
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function getFilteredStudies() {
    let list = window.studies || [];

    if (window.currentTab === 'saved') {
      list = list.filter(s => s.bookmarked);
    }

    return list.filter(study => {
      if (window.filters.search) {
        const query = window.filters.search.toLowerCase();
        const title = (study.title || '').toLowerCase();
        const drug = (study.drug || '').toLowerCase();
        const summary = (study.summary || '').toLowerCase();
        const keyResults = (study.keyResults || '').toLowerCase();
        const population = (study.population || '').toLowerCase();
        const icdStr = Array.isArray(study.icd10) ? study.icd10.join(' ').toLowerCase() : (study.icd10 || '').toLowerCase();

        if (!title.includes(query) && !drug.includes(query) && !summary.includes(query) && !keyResults.includes(query) && !population.includes(query) && !icdStr.includes(query)) {
          return false;
        }
      }

      if (window.filters.sourceType && study.sourceType !== window.filters.sourceType) return false;
      if (window.filters.specialty && study.specialty !== window.filters.specialty) return false;
      if (window.filters.design && study.design !== window.filters.design) return false;
      if (window.filters.impact && study.impact !== window.filters.impact) return false;
      if (window.filters.asianData && !study.asianData) return false;
      if (window.filters.hasSummary && (!study.parts || study.parts.length === 0) && !study.file) return false;
      if (window.filters.hasSubgroup && (!study.subgroups || typeof study.subgroups !== 'object' || Object.keys(study.subgroups).length === 0)) return false;

      if (window.filters.condition && window.CLINICAL_CONDITIONS) {
        const condObj = window.CLINICAL_CONDITIONS[window.filters.condition];
        if (condObj && condObj.icd10) {
          const studyIcds = Array.isArray(study.icd10) ? study.icd10 : [study.icd10];
          const hasMatch = studyIcds.some(c => c && condObj.icd10.some(target => c.toUpperCase().startsWith(target.toUpperCase())));
          if (!hasMatch && study.conditionKey !== window.filters.condition) return false;
        }
      }

      if (window.filters.period && window.filters.period !== null) {
        const yr = study.year ? parseInt(study.year) : 0;
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

  function renderJournalMetricsBadge(study) {
    const profile = window.getJournalQualityProfile ? window.getJournalQualityProfile(study.journal || study.organization, study) : null;
    const metrics = profile ? profile.metrics : (window.getJournalMetrics ? window.getJournalMetrics(study.journal || study.organization, study) : null);
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

  function renderJournalMetricsColumn(study) {
    const profile = window.getJournalQualityProfile ? window.getJournalQualityProfile(study.journal || study.organization, study) : null;
    const metrics = profile ? profile.metrics : (window.getJournalMetrics ? window.getJournalMetrics(study.journal || study.organization, study) : null);
    const ifVal = (metrics && metrics.if) ? metrics.if : (study.impactFactor || study.if || null);
    const qVal = (metrics && metrics.quartile) ? metrics.quartile : (study.quartile || (study.sourceType === 'vn-moh' ? 'MOH' : null));
    const sjrVal = (metrics && metrics.sjr) ? metrics.sjr : (study.sjr || null);
    const hVal = (metrics && metrics.hIndex) ? metrics.hIndex : (study.hIndex || null);
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

  function renderTable() {
    const tbody = document.getElementById('studies-tbody') || document.getElementById('table-body');
    const displayCount = document.getElementById('display-count');
    const totalCountSidebar = document.getElementById('total-count-sidebar');
    const savedCountSidebar = document.getElementById('saved-count-sidebar');
    const summaryCountSidebar = document.getElementById('summary-count-sidebar');
    const emptyState = document.getElementById('empty-state');

    const filtered = getFilteredStudies();

    if (totalCountSidebar) totalCountSidebar.textContent = (window.studies || []).length;
    if (savedCountSidebar) savedCountSidebar.textContent = (window.studies || []).filter(s => s.bookmarked).length;
    if (summaryCountSidebar) summaryCountSidebar.textContent = (window.studies || []).filter(s => (s.parts && s.parts.length > 0) || s.file).length;
    if (displayCount) displayCount.textContent = filtered.length;

    if (!tbody) return;

    const isCompact = window.viewMode === 'compact';
    const table = document.getElementById('studies-table-element');
    if (table) {
      const detailedCols = ['sourceType', 'specialty', 'design', 'organization', 'journalMetrics', 'intervention', 'primaryEndpoint', 'keyResults', 'conclusion', 'sampleSize', 'population', 'icd10'];
      detailedCols.forEach(col => {
        const th = table.querySelector(`thead th[data-col="${col}"]`);
        if (th) th.style.display = (window.columnVisibility[col] && !isCompact) ? '' : 'none';
      });
    }

    const selectAllCb = document.getElementById('select-all-checkboxes');
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


    // Sort filtered list
    filtered.sort((a, b) => {
      let valA = a[window.sortField] || '';
      let valB = b[window.sortField] || '';
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

      const showCol = (colName) => (window.columnVisibility[colName] && !isCompact) ? '' : 'none';

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
          <td class="col-results" style="display:${showCol('keyResults')};">${escapeHtml(study.keyResults || 'N/A')}</td>
          <td class="col-impact" style="display:${window.columnVisibility.impact ? '' : 'none'};">
            <span class="impact-tag" style="background:${impactObj.bg}; color:${impactObj.color};">${escapeHtml(impactObj.name)}</span>
          </td>
          <td class="col-conclusion" style="display:${showCol('conclusion')};">${escapeHtml(study.summary || 'N/A')}</td>
          <td class="col-samplesize" style="display:${showCol('sampleSize')};">${study.sampleSize ? study.sampleSize.toLocaleString() : 'N/A'}</td>
          <td class="col-population" style="display:${showCol('population')};">${escapeHtml(study.population || 'N/A')}</td>
          <td class="col-icd10" style="display:${showCol('icd10')};">${escapeHtml(Array.isArray(study.icd10) ? study.icd10.join(', ') : (study.icd10 || 'N/A'))}</td>
          <td class="col-actions" onclick="event.stopPropagation()">
            <div style="display:flex; gap:4px; align-items:center; justify-content:center;">
              <button class="btn btn-small" onclick="window.GuidelineTools && window.GuidelineTools.addToCompare('${study.id}')" title="Thêm vào đối sánh">⚖️</button>
              ${study.file ? `<a href="${window.resolveStudyFile ? window.resolveStudyFile(study.file) : study.file}" target="_blank" class="btn btn-small btn-primary" title="Đọc bài tóm tắt">📖</a>` : ''}
              <button class="btn btn-small" onclick="openEditModal('${study.id}')" title="Chỉnh sửa">✏️</button>
              <button class="btn btn-small btn-danger" onclick="deleteStudy('${study.id}')" title="Xóa nghiên cứu này">🗑️</button>
            </div>
          </td>
        </tr>
      `;


      if (isExpanded) {
        html += `
          <tr class="expanded-detail-row">
            <td colspan="15" style="padding: 1rem; background: var(--surface-2); border-bottom: 2px solid var(--accent);">
              <div style="font-size:0.85rem; line-height:1.6; color:var(--text);">
                <strong>💡 Tóm tắt chi tiết:</strong> ${study.summary}
              </div>
            </td>
          </tr>
        `;
      }
    });

    tbody.innerHTML = html;
  }

  function toggleSelectStudy(id, isChecked) {
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

  function toggleSelectAllRows(isChecked) {
    const filtered = getFilteredStudies();
    if (!filtered || filtered.length === 0) return;

    if (!window.selectedIds) window.selectedIds = new Set();

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


  function toggleBookmark(id, event) {
    if (event) event.stopPropagation();
    const study = (window.studies || []).find(s => s.id === id);
    if (study) {
      study.bookmarked = !study.bookmarked;
      if (window.saveStudies) window.saveStudies();
      if (window.dbSaveStudy) window.dbSaveStudy(study);
      renderTable();
    }
  }

  function toggleExpandRow(id) {
    if (window.expandedIds.has(id)) {
      window.expandedIds.delete(id);
    } else {
      window.expandedIds.add(id);
    }
    renderTable();
  }

  function deleteStudy(id) {
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

  function deleteSelectedStudies() {
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
  window.toggleSummaryPartsMenu = toggleSummaryPartsMenu;
  window.getFilteredStudies = getFilteredStudies;
  window.renderTable = renderTable;
  window.toggleSelectStudy = toggleSelectStudy;
  window.toggleSelectAllRows = toggleSelectAllRows;
  window.toggleBookmark = toggleBookmark;

  window.toggleExpandRow = toggleExpandRow;
  window.deleteStudy = deleteStudy;
  window.deleteSelectedStudies = deleteSelectedStudies;

})();
