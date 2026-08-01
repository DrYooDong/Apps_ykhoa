/**
 * Ngân hàng Tiêu chuẩn Chẩn đoán — Engine v3.0 (CliniPortal)
 * ─────────────────────────────────────────────────────────────
 * Features: Type tabs, specialty pills, recently viewed, 14+ logic sets
 */

/* ── SPECIALTY COLOR MAP ─────────────────────────────────── */
const SPEC_COLORS = {
  'Tim mạch':      { color: '#e11d48', bg: 'rgba(225, 29, 72, 0.08)' },
  'Nội khoa':      { color: '#0284c7', bg: 'rgba(2, 132, 199, 0.08)' },
  'Truyền nhiễm':  { color: '#d97706', bg: 'rgba(217, 119, 6, 0.08)' },
  'Huyết học':     { color: '#dc2626', bg: 'rgba(220, 38, 38, 0.08)' },
  'Thần kinh':     { color: '#7c3aed', bg: 'rgba(124, 58, 237, 0.08)' },
  'Cơ xương khớp': { color: '#db2777', bg: 'rgba(219, 39, 119, 0.08)' },
  'Hô hấp':        { color: '#0ea5e9', bg: 'rgba(14, 165, 233, 0.08)' },
  'Cấp cứu':       { color: '#e11d48', bg: 'rgba(225, 29, 72, 0.08)' },
  'Nhi khoa':      { color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.08)' },
  'Ngoại khoa':    { color: '#16a34a', bg: 'rgba(22, 163, 74, 0.08)' },
  'Tiêu hóa':      { color: '#059669', bg: 'rgba(5, 150, 105, 0.08)' },
  'Nội tiết':      { color: '#7c3aed', bg: 'rgba(124, 58, 237, 0.08)' },
};
const DEFAULT_SPEC = { color: '#0284c7', bg: 'rgba(2, 132, 199, 0.08)' };
function getSpecColor(specialty) { return SPEC_COLORS[specialty] || DEFAULT_SPEC; }

/* ── TYPE CONFIG ────────────────────────────────────────── */
const TYPE_CONFIG = {
  'all':        { label: 'Tất cả',         icon: 'fa-list', cssClass: 'type-all',   desc: 'Tất cả tiêu chuẩn' },
  'diagnosis':  { label: 'Chẩn đoán',      icon: 'fa-stethoscope', cssClass: 'type-diag',  desc: 'Tiêu chuẩn chẩn đoán bệnh lý' },
  'classification': { label: 'Phân loại',  icon: 'fa-layer-group', cssClass: 'type-class', desc: 'Tiêu chuẩn phân loại hội chứng' },
  'scoring':    { label: 'Thang điểm',     icon: 'fa-chart-simple', cssClass: 'type-score', desc: 'Thang điểm lâm sàng' },
};

/* ── RECENTLY VIEWED ────────────────────────────────────── */
const RECENT_KEY = 'dc_recently_viewed';
const RECENT_MAX = 5;

function saveRecentlyViewed(id, name, specialty) {
  try {
    let recent = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
    recent = recent.filter(r => r.id !== id);
    recent.unshift({ id, name, specialty, ts: Date.now() });
    if (recent.length > RECENT_MAX) recent = recent.slice(0, RECENT_MAX);
    localStorage.setItem(RECENT_KEY, JSON.stringify(recent));
  } catch(e) {}
}

function getRecentlyViewed() {
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
  } catch(e) { return []; }
}

/* ── DATA CACHE ─────────────────────────────────────────── */
let criteriaDataCache = null;

async function fetchCriteriaData() {
  if (criteriaDataCache) return criteriaDataCache;
  const res = await fetch('./data/criteria-database.json');
  if (!res.ok) throw new Error('Không thể tải dữ liệu');
  criteriaDataCache = await res.json();
  return criteriaDataCache;
}

/* ── BOOTSTRAP ──────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const criteriaId = urlParams.get('id');

  if (criteriaId) {
    loadCriteriaDetail(criteriaId);
  } else {
    loadCriteriaHub();
  }

  // Keyboard shortcut '/' to focus search
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && !['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      document.getElementById('criteria-search')?.focus();
    }
    if (e.key === 'Escape') {
      clearSearch();
    }
  });
});

/* ═══════════════════════════════════════════════════════════
   HUB PAGE
══════════════════════════════════════════════════════════ */
async function loadCriteriaHub() {
  const container    = document.getElementById('criteria-hub-container');
  const filterPills  = document.getElementById('criteria-filter-pills');
  const typeTabs     = document.getElementById('type-tabs-container');
  const featuredCont = document.getElementById('featured-container');
  const searchInput  = document.getElementById('criteria-search');
  const clearBtn     = document.getElementById('search-clear-btn');
  if (!container) return;

  let allData = {};
  try {
    allData = await fetchCriteriaData();
  } catch(err) {
    container.innerHTML = `<div class="dc-empty-state">
      <i class="fa-solid fa-triangle-exclamation dc-empty-state-icon" style="color:#ef4444"></i>
      <p class="dc-empty-state-text">Lỗi tải dữ liệu. Vui lòng kiểm tra Local Server.</p>
    </div>`;
    return;
  }

  const items = Object.values(allData);

  // — Compute stats
  const uniqueSpecs  = [...new Set(items.map(i => i.specialty))];
  const uniqueTypes  = [...new Set(items.map(i => i.type).filter(Boolean))];
  const totalEl      = document.getElementById('stat-total-count');
  const specEl       = document.getElementById('stat-spec-count');
  const typeEl       = document.getElementById('stat-type-count');
  if (totalEl) totalEl.textContent = items.length;
  if (specEl)  specEl.textContent  = uniqueSpecs.length;
  if (typeEl)  typeEl.textContent  = uniqueTypes.length;

  // — State
  let activeType      = 'all';
  let activeSpecialty = 'Tất cả';

  // ── TYPE TABS ──────────────────────────────────────────
  function renderTypeTabs() {
    if (!typeTabs) return;
    const typeCounts = {};
    items.forEach(i => { typeCounts[i.type] = (typeCounts[i.type] || 0) + 1; });
    typeCounts['all'] = items.length;

    typeTabs.innerHTML = Object.entries(TYPE_CONFIG).map(([key, cfg]) => `
      <button class="dc-type-tab ${cfg.cssClass} ${activeType === key ? 'active' : ''}"
        onclick="setTypeFilter('${key}')" role="tab" aria-selected="${activeType === key}">
        <i class="fa-solid ${cfg.icon} dc-type-tab-icon"></i>
        ${cfg.label}
        <span class="dc-type-tab-count">${typeCounts[key] || 0}</span>
      </button>
    `).join('');
  }

  // ── SPECIALTY PILLS ───────────────────────────────────
  function getFilteredByType() {
    if (activeType === 'all') return items;
    return items.filter(i => i.type === activeType);
  }

  function renderFilterPills() {
    if (!filterPills) return;
    const source = getFilteredByType();
    const specs = ['Tất cả', ...new Set(source.map(i => i.specialty))];
    filterPills.innerHTML = specs.map(sp => {
      const sc = getSpecColor(sp);
      const isActive = sp === activeSpecialty;
      return `<button class="dc-pill-btn ${isActive ? 'active' : ''}"
        onclick="setSpecialtyFilter('${sp}')">
        ${sp !== 'Tất cả' ? `<span class="dc-pill-dot" style="background:${sc.color}"></span>` : ''}
        ${sp}
      </button>`;
    }).join('');
  }

  // ── FEATURED SECTION ──────────────────────────────────
  function renderFeatured() {
    if (!featuredCont) return;
    const featured = items.filter(i => i.featured);
    if (!featured.length) {
      document.getElementById('featured-section').style.display = 'none';
      return;
    }
    document.getElementById('featured-section').style.display = '';
    featuredCont.innerHTML = featured.map(item => buildCardHTML(item, true)).join('');
  }

  // ── MAIN CARDS ────────────────────────────────────────
  function renderCards() {
    const query = (searchInput?.value || '').toLowerCase().trim();
    const isSearching = query.length > 0;

    // Toggle clear button & search count
    if (clearBtn) clearBtn.style.display = isSearching ? 'flex' : 'none';

    let filtered = getFilteredByType().filter(item => {
      const matchSpec  = activeSpecialty === 'Tất cả' || item.specialty === activeSpecialty;
      const matchQuery = !isSearching ||
        item.name.toLowerCase().includes(query) ||
        item.disease.toLowerCase().includes(query) ||
        (item.icd && item.icd.toLowerCase().includes(query)) ||
        item.specialty.toLowerCase().includes(query);
      return matchSpec && matchQuery;
    });

    // Update counts
    const countEls = document.querySelectorAll('#criteria-display-count, #criteria-display-count-2');
    countEls.forEach(el => { if (el) el.textContent = filtered.length; });

    // Toggle featured section
    const featuredSec = document.getElementById('featured-section');
    if (featuredSec) featuredSec.style.display = (isSearching || activeSpecialty !== 'Tất cả' || activeType !== 'all') ? 'none' : '';

    // Update section title
    const titleEl    = document.getElementById('grid-section-title');
    const subtitleEl = document.getElementById('grid-section-subtitle');
    if (isSearching) {
      if (titleEl)    titleEl.textContent    = `Kết quả tìm kiếm "${query}"`;
      if (subtitleEl) subtitleEl.textContent = `${filtered.length} bộ tiêu chuẩn phù hợp`;
    } else {
      const typeLbl = TYPE_CONFIG[activeType]?.label || 'Tất cả';
      if (titleEl)    titleEl.textContent    = activeSpecialty === 'Tất cả' ? `${typeLbl}` : `${activeSpecialty}`;
      if (subtitleEl) subtitleEl.textContent = `${filtered.length} bộ tiêu chuẩn`;
    }

    if (!filtered.length) {
      container.innerHTML = `<div class="dc-empty-state">
        <i class="fa-solid fa-folder-open dc-empty-state-icon"></i>
        <p class="dc-empty-state-text">Không tìm thấy tiêu chuẩn phù hợp.</p>
        <p class="dc-empty-state-hint">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm.</p>
      </div>`;
      return;
    }

    container.innerHTML = filtered.map(item => buildCardHTML(item, false)).join('');
  }

  // ── CARD HTML BUILDER ──────────────────────────────────
  function buildCardHTML(item, isFeaturedCard) {
    const spec       = getSpecColor(item.specialty);
    const majorLen   = item.criteria?.major?.length || 0;
    const minorLen   = item.criteria?.minor?.length || 0;
    const typeInfo   = TYPE_CONFIG[item.type] || {};
    const typeLabel  = item.type === 'diagnosis' ? 'Chẩn đoán' :
                       item.type === 'classification' ? 'Phân loại' :
                       item.type === 'scoring' ? 'Thang điểm' : '';
    const typeIcon   = item.type === 'diagnosis' ? 'fa-stethoscope' :
                       item.type === 'classification' ? 'fa-layer-group' :
                       item.type === 'scoring' ? 'fa-chart-simple' : 'fa-list';

    return `
    <a href="criteria-detail.html?id=${item.id}" class="dc-card ${isFeaturedCard ? 'featured-card' : ''}"
       style="--card-accent: ${spec.color};" role="listitem"
       onclick="trackView('${item.id}', '${item.name.replace(/'/g, "\\'")}', '${item.specialty}')">
      ${isFeaturedCard ? '<div class="dc-featured-ribbon">Thông dụng</div>' : ''}
      <div class="dc-card-inner">
        <div class="dc-card-top">
          <div class="dc-card-badges">
            ${item.icd ? `<span class="dc-icd-tag">${item.icd}</span>` : ''}
            <span class="dc-spec-badge" style="color:${spec.color}; background:${spec.bg};">${item.specialty}</span>
            ${typeLabel ? `<span class="dc-type-badge"><i class="fa-solid ${typeIcon}"></i>${typeLabel}</span>` : ''}
          </div>
        </div>
        <h3 class="dc-card-title">${item.name}</h3>
        <div class="dc-card-disease">${item.disease}</div>
        <div class="dc-card-footer">
          <span class="dc-card-cta">
            <i class="fa-solid fa-bolt"></i>
            ${majorLen ? `${majorLen} chính` : ''}${majorLen && minorLen ? ' · ' : ''}${minorLen ? `${minorLen} phụ` : ''}
          </span>
          <i class="fa-solid fa-arrow-right dc-card-arrow"></i>
        </div>
      </div>
    </a>`;
  }

  // ── RECENTLY VIEWED SECTION ──────────────────────────
  function renderRecentlyViewed() {
    const recentSec  = document.getElementById('recently-viewed-section');
    const recentCont = document.getElementById('recently-viewed-container');
    const recent = getRecentlyViewed();
    if (!recent.length || !recentSec || !recentCont) return;
    recentSec.style.display = '';
    recentCont.innerHTML = recent.map(r => {
      const sc = getSpecColor(r.specialty);
      return `<a href="criteria-detail.html?id=${r.id}" class="dc-recent-item"
        onclick="trackView('${r.id}', '${r.name.replace(/'/g,"\\'")}', '${r.specialty}')">
        <span class="dc-recent-item-name">${r.name}</span>
        <span class="dc-recent-item-meta" style="color:${sc.color}">${r.specialty}</span>
      </a>`;
    }).join('');
  }

  // ── GLOBAL HANDLERS ──────────────────────────────────
  window.setTypeFilter = function(type) {
    activeType = type;
    activeSpecialty = 'Tất cả';
    renderTypeTabs();
    renderFilterPills();
    renderCards();
  };

  window.setSpecialtyFilter = function(sp) {
    activeSpecialty = sp;
    renderFilterPills();
    renderCards();
  };

  window.handleCriteriaSearch = function() {
    renderCards();
  };

  window.clearSearch = function() {
    const inp = document.getElementById('criteria-search');
    if (inp) { inp.value = ''; inp.dispatchEvent(new Event('input')); }
    const btn = document.getElementById('search-clear-btn');
    if (btn) btn.style.display = 'none';
  };

  window.trackView = function(id, name, specialty) {
    saveRecentlyViewed(id, name, specialty);
  };

  // ── INITIAL RENDER ────────────────────────────────────
  renderTypeTabs();
  renderFilterPills();
  renderFeatured();
  renderCards();
  renderRecentlyViewed();
}

/* ═══════════════════════════════════════════════════════════
   DETAIL PAGE
══════════════════════════════════════════════════════════ */
async function loadCriteriaDetail(id) {
  const container = document.getElementById('criteria-detail-container');
  if (!container) return;

  // Track view
  let data;
  try {
    const allData = await fetchCriteriaData();
    data = allData[id];
    if (!data) {
      container.innerHTML = `<div class="dc-empty-state">
        <i class="fa-solid fa-circle-exclamation dc-empty-state-icon" style="color:#ef4444"></i>
        <p class="dc-empty-state-text">Không tìm thấy tiêu chuẩn này.</p>
      </div>`;
      return;
    }
    saveRecentlyViewed(data.id, data.name, data.specialty);
  } catch(err) {
    container.innerHTML = `<div class="dc-empty-state">
      <i class="fa-solid fa-triangle-exclamation dc-empty-state-icon" style="color:#ef4444"></i>
      <p class="dc-empty-state-text">Lỗi tải dữ liệu. Vui lòng kiểm tra Local Server.</p>
    </div>`;
    return;
  }

  renderCriteriaDetail(container, data);
}

function renderCriteriaDetail(container, data) {
  document.title = `${data.name} – CliniPortal`;
  const topbarTitle = document.getElementById('topbar-title-display');
  if (topbarTitle) topbarTitle.textContent = data.name;

  const spec = getSpecColor(data.specialty);
  const typeLabel = data.type === 'diagnosis' ? 'Chẩn đoán' :
                    data.type === 'classification' ? 'Phân loại' :
                    data.type === 'scoring' ? 'Thang điểm' : '';

  let html = `
    <div class="dc-breadcrumb">
      <a href="index.html"><i class="fa-solid fa-arrow-left"></i> Ngân hàng Tiêu chuẩn</a>
      <i class="fa-solid fa-chevron-right" style="font-size:0.65rem; color:var(--color-text-muted)"></i>
      <span style="color:var(--color-text); font-weight:600;">${data.name}</span>
    </div>

    <div class="dc-detail-header">
      <div class="dc-detail-title-group">
        <span class="dc-spec-badge" style="color:${spec.color}; background:${spec.bg}; font-size:0.78rem; padding:4px 12px;">${data.specialty}</span>
        ${data.icd ? `<span class="dc-icd-tag" style="font-size:0.75rem;">ICD-10: ${data.icd}</span>` : ''}
        ${typeLabel ? `<span class="dc-type-badge">${typeLabel}</span>` : ''}
      </div>
      <h1 class="dc-detail-title">${data.name}</h1>
      <div class="dc-detail-disease">Bệnh lý: ${data.disease}</div>
      <p class="dc-detail-desc">${data.description}</p>
    </div>
  `;

  // MAJOR CRITERIA
  if (data.criteria?.major?.length > 0) {
    html += `
      <div class="dc-section-title-wrap">
        <div class="dc-section-title-left">
          <div class="dc-section-icon major"><i class="fa-solid fa-circle-exclamation"></i></div>
          <h3 class="dc-section-title">Tiêu chuẩn chính (Major Criteria)</h3>
        </div>
        <span class="dc-section-badge major-badge">${data.criteria.major.length} tiêu chí</span>
      </div>
      <div class="dc-checklist-group">
    `;
    data.criteria.major.forEach((item, idx) => {
      html += `
        <label class="dc-checkbox-card" for="${item.id}" id="label-${item.id}">
          <input type="checkbox" id="${item.id}" class="dc-checkbox-input major-input" value="${item.id}"
            onchange="onCheckChange('${item.id}', '${data.logic_type}')">
          <span class="dc-custom-checkbox"></span>
          <span class="dc-num-badge">${String.fromCharCode(65 + idx)}</span>
          <span class="dc-checkbox-text">${item.text}</span>
        </label>`;
    });
    html += '</div>';
  }

  // MINOR CRITERIA
  if (data.criteria?.minor?.length > 0) {
    html += `
      <div class="dc-section-title-wrap">
        <div class="dc-section-title-left">
          <div class="dc-section-icon minor"><i class="fa-solid fa-list-check"></i></div>
          <h3 class="dc-section-title">Tiêu chuẩn phụ (Minor Criteria)</h3>
        </div>
        <span class="dc-section-badge minor-badge">${data.criteria.minor.length} tiêu chí</span>
      </div>
      <div class="dc-checklist-group">
    `;
    data.criteria.minor.forEach((item, idx) => {
      html += `
        <label class="dc-checkbox-card" for="${item.id}" id="label-${item.id}">
          <input type="checkbox" id="${item.id}" class="dc-checkbox-input minor-input" value="${item.id}"
            onchange="onCheckChange('${item.id}', '${data.logic_type}')">
          <span class="dc-custom-checkbox"></span>
          <span class="dc-num-badge">${idx + 1}</span>
          <span class="dc-checkbox-text">${item.text}</span>
        </label>`;
    });
    html += '</div>';
  }

  // SCORE TALLY
  html += `
    <div class="dc-score-tally">
      <div class="dc-tally-items">
        <div class="dc-tally-item">
          <span class="dc-tally-val" id="major-count-display">0</span>
          <span>chính</span>
        </div>
        <div class="dc-tally-sep"></div>
        <div class="dc-tally-item">
          <span class="dc-tally-val" id="minor-count-display">0</span>
          <span>phụ</span>
        </div>
      </div>
      <button class="dc-btn-reset" onclick="resetAllCheckboxes('${data.logic_type}')">
        <i class="fa-solid fa-rotate-left"></i> Đặt lại
      </button>
    </div>
  `;

  // RESULT CARD
  html += `
    <div class="dc-result-card neutral" id="dc-result-card">
      <div class="dc-result-inner">
        <div class="dc-result-icon" id="dc-result-icon"><i class="fa-solid fa-circle-question"></i></div>
        <div class="dc-result-body">
          <div class="dc-result-label">Kết luận chẩn đoán:</div>
          <div class="dc-result-value" id="dc-result-value">Chưa đủ dữ kiện</div>
          <div class="dc-result-explanation" id="dc-result-explanation">Hãy đánh dấu chọn các tiêu chuẩn lâm sàng ở trên.</div>
        </div>
      </div>
    </div>
  `;

  // DISCLAIMER & REFERENCES
  html += `
    <div class="dc-footer">
      <div class="dc-disclaimer">
        <i class="fa-solid fa-triangle-exclamation"></i>
        <span>${data.disclaimer}</span>
      </div>
      ${data.references?.length ? `
      <div class="dc-refs">
        <strong>Tài liệu tham khảo chính thức:</strong>
        <ul>${data.references.map(ref => `<li>${ref}</li>`).join('')}</ul>
      </div>` : ''}
    </div>
  `;

  container.innerHTML = html;
}

/* ═══════════════════════════════════════════════════════════
   CHECKBOX HANDLERS
══════════════════════════════════════════════════════════ */
window.onCheckChange = function(itemId, logicType) {
  const label = document.getElementById(`label-${itemId}`);
  const input = document.getElementById(itemId);
  if (label && input) label.classList.toggle('is-checked', input.checked);

  const majorCount = document.querySelectorAll('.major-input:checked').length;
  const minorCount = document.querySelectorAll('.minor-input:checked').length;
  const majorEl = document.getElementById('major-count-display');
  const minorEl = document.getElementById('minor-count-display');
  if (majorEl) majorEl.textContent = majorCount;
  if (minorEl) minorEl.textContent = minorCount;

  evaluateLogic(logicType);
};

window.resetAllCheckboxes = function(logicType) {
  document.querySelectorAll('.dc-checkbox-input').forEach(cb => { cb.checked = false; });
  document.querySelectorAll('.dc-checkbox-card').forEach(card => card.classList.remove('is-checked'));
  const majorEl = document.getElementById('major-count-display');
  const minorEl = document.getElementById('minor-count-display');
  if (majorEl) majorEl.textContent = '0';
  if (minorEl) minorEl.textContent = '0';
  evaluateLogic(logicType);
};

/* ═══════════════════════════════════════════════════════════
   DIAGNOSTIC LOGIC ENGINE
══════════════════════════════════════════════════════════ */
function evaluateLogic(logicType) {
  const logicMap = {
    duke_logic:     evaluateDukeLogic,
    jones_logic:    evaluateJonesLogic,
    ra_logic:       evaluateRALogic,
    kawasaki_logic: evaluateKawasakiLogic,
    wells_dvt_logic:evaluateWellsDVTLogic,
    wells_pe_logic: evaluateWellsPELogic,
    sepsis3_logic:  evaluateSepsis3Logic,
    slicc_logic:    evaluateSLICCLogic,
    aki_logic:      evaluateAKILogic,
    ranson_logic:   evaluateRansonLogic,
    child_pugh_logic: evaluateChildPughLogic,
    metsyn_logic:   evaluateMetSynLogic,
    ards_logic:     evaluateARDSLogic,
    curb65_logic:   evaluateCURB65Logic,
  };
  const fn = logicMap[logicType] || evaluateDukeLogic;
  fn();
}

function updateResultUI(statusClass, iconHtml, titleText, explanationText) {
  const card = document.getElementById('dc-result-card');
  const icon = document.getElementById('dc-result-icon');
  const val  = document.getElementById('dc-result-value');
  const exp  = document.getElementById('dc-result-explanation');
  if (card) card.className = `dc-result-card ${statusClass}`;
  if (icon) icon.innerHTML = iconHtml;
  if (val)  val.textContent = titleText;
  if (exp)  exp.textContent = explanationText;
}

// ─── DUKE ──────────────────────────────────────────────
function evaluateDukeLogic() {
  const m = document.querySelectorAll('.major-input:checked').length;
  const n = document.querySelectorAll('.minor-input:checked').length;
  if (m >= 2 || (m >= 1 && n >= 3) || n >= 5)
    updateResultUI('success', '<i class="fa-solid fa-circle-check"></i>',
      'Chẩn đoán XÁC ĐỊNH (Definite IE)',
      `Đạt tiêu chuẩn Duke 2023 (${m} chính, ${n} phụ). Khuyến cáo kháng sinh trúng đích & hội chẩn phẫu thuật.`);
  else if ((m >= 1 && n >= 1) || n >= 3)
    updateResultUI('warning', '<i class="fa-solid fa-circle-exclamation"></i>',
      'Chẩn đoán CÓ THỂ (Possible IE)',
      `Đạt: ${m} chính, ${n} phụ. Nghi ngờ cao IE, cần TEE và lặp lại cấy máu.`);
  else
    updateResultUI('neutral', '<i class="fa-solid fa-circle-question"></i>',
      'Chưa đủ / Loại trừ (Rejected)',
      `Đạt: ${m} chính, ${n} phụ. Chưa thỏa mãn tiêu chuẩn Duke 2023.`);
}

// ─── JONES ─────────────────────────────────────────────
function evaluateJonesLogic() {
  const m = document.querySelectorAll('.major-input:checked').length;
  const n = document.querySelectorAll('.minor-input:checked').length;
  if (m >= 2 || (m >= 1 && n >= 2))
    updateResultUI('success', '<i class="fa-solid fa-circle-check"></i>',
      'Chẩn đoán XÁC ĐỊNH (Definite ARF)',
      `Đạt tiêu chuẩn Jones 2015 (${m} chính, ${n} phụ). Sốt thấp khớp cấp.`);
  else if (m >= 1 || n >= 2)
    updateResultUI('warning', '<i class="fa-solid fa-circle-exclamation"></i>',
      'Nghi ngờ (Possible ARF)',
      `Đạt: ${m} chính, ${n} phụ. Cần tầm soát tổn thương tim.`);
  else
    updateResultUI('neutral', '<i class="fa-solid fa-circle-question"></i>',
      'Chưa đủ tiêu chuẩn',
      `Đạt: ${m} chính, ${n} phụ.`);
}

// ─── RA ACR/EULAR ──────────────────────────────────────
function evaluateRALogic() {
  const sel = Array.from(document.querySelectorAll('.dc-checkbox-input:checked')).map(cb => cb.value);
  let score = 0;
  if (sel.includes('ra_m1')) score += 3;
  if (sel.includes('ra_m2')) score += 3;
  if (sel.includes('ra_m3')) score += 1;
  if (sel.includes('ra_n1')) score += 1;
  if (sel.includes('ra_n2')) score += 2;
  if (sel.includes('ra_n3')) score += 1;
  if (score >= 6)
    updateResultUI('success', '<i class="fa-solid fa-circle-check"></i>',
      `Phân loại Viêm khớp dạng thấp (${score}/10 điểm)`,
      'Điểm ≥ 6/10 theo ACR/EULAR 2010. Khuyến cáo khởi đầu DMARDs sớm.');
  else if (score > 0)
    updateResultUI('warning', '<i class="fa-solid fa-circle-exclamation"></i>',
      `Chưa đủ điểm RA (${score}/10)`,
      `Cần ≥ 6 điểm. Bổ sung xét nghiệm huyết thanh học.`);
  else
    updateResultUI('neutral', '<i class="fa-solid fa-circle-question"></i>',
      'Chưa có điểm (0/10)', 'Đánh dấu các đặc điểm lâm sàng và XN của bệnh nhân.');
}

// ─── KAWASAKI ──────────────────────────────────────────
function evaluateKawasakiLogic() {
  const fever = document.getElementById('k_m1')?.checked;
  const n = document.querySelectorAll('.minor-input:checked').length;
  if (fever && n >= 4)
    updateResultUI('success', '<i class="fa-solid fa-circle-check"></i>',
      'Kawasaki ĐIỂN HÌNH',
      `Sốt ≥ 5 ngày + ${n}/5 tiêu chuẩn phụ. Dùng IVIG (2g/kg) + Aspirin sớm trước ngày 10.`);
  else if (fever && n >= 2)
    updateResultUI('warning', '<i class="fa-solid fa-circle-exclamation"></i>',
      'Nghi Kawasaki KHÔNG ĐIỂN HÌNH',
      `Sốt ≥ 5 ngày + ${n}/5 tiêu chuẩn phụ. Cần CRP/ESR + siêu âm tim.`);
  else
    updateResultUI('neutral', '<i class="fa-solid fa-circle-question"></i>',
      'Chưa đủ tiêu chuẩn Kawasaki',
      `Sốt: ${fever ? 'Có (≥ 5 ngày)' : 'Chưa đủ'}, phụ: ${n}/5.`);
}

// ─── WELLS DVT ─────────────────────────────────────────
function evaluateWellsDVTLogic() {
  const all = Array.from(document.querySelectorAll('.dc-checkbox-input:checked')).map(cb => cb.value);
  const majorPts = all.filter(v => v.startsWith('dvt_') && v !== 'dvt_9').length;
  const subtract = all.includes('dvt_9') ? 2 : 0;
  const score = majorPts - subtract;
  if (score >= 2)
    updateResultUI('success', '<i class="fa-solid fa-circle-check"></i>',
      `Wells DVT: Xác suất CAO (Score = ${score})`,
      'Chỉ định siêu âm Doppler tĩnh mạch chi dưới ngay. Không cần D-dimer.');
  else if (score === 1)
    updateResultUI('warning', '<i class="fa-solid fa-circle-exclamation"></i>',
      `Wells DVT: Xác suất TRUNG BÌNH (Score = ${score})`,
      'Xem xét D-dimer. Nếu D-dimer dương tính → Siêu âm Doppler.');
  else
    updateResultUI('neutral', '<i class="fa-solid fa-circle-question"></i>',
      `Wells DVT: Xác suất THẤP (Score = ${score})`,
      'Làm D-dimer. Nếu D-dimer âm tính → Loại trừ DVT.');
}

// ─── WELLS PE ──────────────────────────────────────────
function evaluateWellsPELogic() {
  const sel = Array.from(document.querySelectorAll('.dc-checkbox-input:checked')).map(cb => cb.value);
  let score = 0;
  if (sel.includes('pe_1')) score += 3;
  if (sel.includes('pe_2')) score += 3;
  if (sel.includes('pe_3')) score += 1.5;
  if (sel.includes('pe_4')) score += 1.5;
  if (sel.includes('pe_5')) score += 1.5;
  if (sel.includes('pe_6')) score += 1;
  if (sel.includes('pe_7')) score += 1;
  if (score > 6)
    updateResultUI('danger', '<i class="fa-solid fa-triangle-exclamation"></i>',
      `Wells PE: Xác suất RẤT CAO (Score = ${score})`,
      'Chỉ định CTPA ngay. Cân nhắc điều trị chống đông theo kinh nghiệm trước kết quả CT.');
  else if (score > 4)
    updateResultUI('success', '<i class="fa-solid fa-circle-check"></i>',
      `Wells PE: Xác suất CAO (Score = ${score})`,
      'Chỉ định CTPA ngay. Không cần D-dimer.');
  else if (score > 2)
    updateResultUI('warning', '<i class="fa-solid fa-circle-exclamation"></i>',
      `Wells PE: Xác suất TRUNG BÌNH (Score = ${score})`,
      'Làm D-dimer (ELISA). Nếu dương tính → CTPA.');
  else
    updateResultUI('neutral', '<i class="fa-solid fa-circle-question"></i>',
      `Wells PE: Xác suất THẤP (Score = ${score})`,
      'Làm D-dimer. Nếu âm tính → Loại trừ PE.');
}

// ─── SEPSIS-3 ──────────────────────────────────────────
function evaluateSepsis3Logic() {
  const m = document.querySelectorAll('.major-input:checked').length;
  const n = document.querySelectorAll('.minor-input:checked').length;
  const hasSuspect = document.getElementById('sep_m1')?.checked;
  const hasQSOFA   = document.getElementById('sep_m2')?.checked;
  const hasSOFA    = document.getElementById('sep_n1')?.checked;
  const hasLactate = document.getElementById('sep_n2')?.checked;
  const hasVaso    = document.getElementById('sep_n3')?.checked;
  if (hasSuspect && hasVaso && hasLactate)
    updateResultUI('danger', '<i class="fa-solid fa-triangle-exclamation"></i>',
      'SỐC NHIỄM TRÙNG (Septic Shock)',
      'Cần vận mạch + Lactate > 2 mmol/L. Xử trí khẩn cấp: hồi sức dịch, kháng sinh rộng phổ, ICU.');
  else if (hasSuspect && (hasQSOFA || hasSOFA))
    updateResultUI('success', '<i class="fa-solid fa-circle-check"></i>',
      'NHIỄM TRÙNG HUYẾT (Sepsis)',
      'Nghi nhiễm trùng + rối loạn chức năng cơ quan (qSOFA/SOFA). Cấy máu và bắt đầu kháng sinh trong 1 giờ.');
  else if (hasSuspect)
    updateResultUI('warning', '<i class="fa-solid fa-circle-exclamation"></i>',
      'Nghi nhiễm trùng — Chưa đủ tiêu chuẩn Sepsis',
      'Có nghi nhiễm trùng nhưng chưa đủ tiêu chuẩn rối loạn cơ quan. Theo dõi sát qSOFA/SOFA.');
  else
    updateResultUI('neutral', '<i class="fa-solid fa-circle-question"></i>',
      'Chưa đủ tiêu chuẩn',
      'Hãy đánh dấu các dữ kiện lâm sàng.');
}

// ─── SLICC SLE ─────────────────────────────────────────
function evaluateSLICCLogic() {
  const m = document.querySelectorAll('.major-input:checked').length;
  const n = document.querySelectorAll('.minor-input:checked').length;
  const total = m + n;
  const hasANA     = document.getElementById('sle_n4')?.checked;
  const hasAntiDNA = document.getElementById('sle_n5')?.checked;
  if (total >= 4 && m >= 1 && n >= 1)
    updateResultUI('success', '<i class="fa-solid fa-circle-check"></i>',
      `Phân loại SLE (Đạt ${total}/17 tiêu chuẩn)`,
      `Đạt ≥ 4 tiêu chuẩn (${m} lâm sàng + ${n} miễn dịch). Đủ tiêu chuẩn phân loại SLE theo SLICC 2012.`);
  else if (total >= 2)
    updateResultUI('warning', '<i class="fa-solid fa-circle-exclamation"></i>',
      `Đang đánh giá (${total}/17 tiêu chuẩn)`,
      `Cần ≥ 4 tiêu chuẩn (ít nhất 1 lâm sàng + 1 miễn dịch). Bổ sung thêm dữ liệu lâm sàng và XN.`);
  else
    updateResultUI('neutral', '<i class="fa-solid fa-circle-question"></i>',
      'Chưa đủ tiêu chuẩn SLE',
      'Đánh dấu các đặc điểm lâm sàng và xét nghiệm miễn dịch.');
}

// ─── AKI KDIGO ─────────────────────────────────────────
function evaluateAKILogic() {
  const m = document.querySelectorAll('.major-input:checked').length;
  const sel = Array.from(document.querySelectorAll('.minor-input:checked')).map(cb => cb.value);
  if (m >= 1) {
    const stage = sel.includes('aki_n3') ? 3 : sel.includes('aki_n2') ? 2 : sel.includes('aki_n1') ? 1 : 0;
    if (stage === 3)
      updateResultUI('danger', '<i class="fa-solid fa-triangle-exclamation"></i>',
        'AKI Giai đoạn 3 — Rất nặng',
        'Giai đoạn 3 KDIGO: Creatinine ≥ 3× nền hoặc nước tiểu < 0.3 mL/kg/h ≥ 24h. Cân nhắc RRT.');
    else if (stage === 2)
      updateResultUI('warning', '<i class="fa-solid fa-circle-exclamation"></i>',
        'AKI Giai đoạn 2',
        'Creatinine tăng 2-2.9× hoặc nước tiểu < 0.5 mL/kg/h ≥ 12h. Theo dõi sát I/O và creatinine.');
    else if (stage === 1)
      updateResultUI('warning', '<i class="fa-solid fa-circle-exclamation"></i>',
        'AKI Giai đoạn 1',
        'Creatinine tăng 1.5-1.9× hoặc nước tiểu < 0.5 mL/kg/h 6-12h. Tìm nguyên nhân và điều chỉnh.');
    else
      updateResultUI('success', '<i class="fa-solid fa-circle-check"></i>',
        'Xác định AKI — Chưa phân giai đoạn đầy đủ',
        'Thỏa tiêu chuẩn chẩn đoán AKI. Chọn tiêu chuẩn phụ để phân giai đoạn.');
  } else
    updateResultUI('neutral', '<i class="fa-solid fa-circle-question"></i>',
      'Chưa đủ tiêu chuẩn AKI',
      'Cần ít nhất 1 trong 3 tiêu chuẩn chính (tăng creatinine hoặc giảm lượng nước tiểu).');
}

// ─── RANSON ────────────────────────────────────────────
function evaluateRansonLogic() {
  const m = document.querySelectorAll('.major-input:checked').length;
  const n = document.querySelectorAll('.minor-input:checked').length;
  const score = m + n;
  if (score >= 7)
    updateResultUI('danger', '<i class="fa-solid fa-triangle-exclamation"></i>',
      `Ranson ${score}/11 — Tử vong rất cao (>99%)`,
      'Viêm tụy cấp cực nặng. Cần ICU, hồi sức tích cực, hội chẩn ngoại khoa.');
  else if (score >= 5)
    updateResultUI('danger', '<i class="fa-solid fa-triangle-exclamation"></i>',
      `Ranson ${score}/11 — Nặng (tử vong ~40%)`,
      'Nhập ICU, theo dõi biến chứng: hoại tử tụy, suy đa tạng, nhiễm trùng.');
  else if (score >= 3)
    updateResultUI('warning', '<i class="fa-solid fa-circle-exclamation"></i>',
      `Ranson ${score}/11 — Trung bình (tử vong ~15%)`,
      'Nhập viện nội khoa, nhịn ăn, truyền dịch, theo dõi biến chứng, CT bụng có cản quang.');
  else
    updateResultUI('success', '<i class="fa-solid fa-circle-check"></i>',
      `Ranson ${score}/11 — Nhẹ (tử vong <1%)`,
      'Viêm tụy cấp mức độ nhẹ. Hồi sức dịch, giảm đau, theo dõi và ăn lại sớm khi dung nạp được.');
}

// ─── CHILD-PUGH ────────────────────────────────────────
function evaluateChildPughLogic() {
  const m = document.querySelectorAll('.major-input:checked').length;
  const n = document.querySelectorAll('.minor-input:checked').length;
  const score = m + n;
  if (score >= 10)
    updateResultUI('danger', '<i class="fa-solid fa-triangle-exclamation"></i>',
      `Child-Pugh C (${score} điểm) — Suy gan mất bù nặng`,
      'Tử vong 1 năm ~85%. Đánh giá ghép gan, điều trị tích cực biến chứng (báng bụng, HE, xuất huyết).');
  else if (score >= 7)
    updateResultUI('warning', '<i class="fa-solid fa-circle-exclamation"></i>',
      `Child-Pugh B (${score} điểm) — Suy gan trung bình`,
      'Tử vong 1 năm ~57%. Điều trị biến chứng, hạn chế can thiệp phẫu thuật. Cân nhắc ghép gan.');
  else if (score >= 5)
    updateResultUI('success', '<i class="fa-solid fa-circle-check"></i>',
      `Child-Pugh A (${score} điểm) — Xơ gan bù tốt`,
      'Tử vong 1 năm ~0%. Theo dõi định kỳ, tầm soát HCC, điều trị biến chứng sớm.');
  else
    updateResultUI('neutral', '<i class="fa-solid fa-circle-question"></i>',
      'Chưa đủ thông số đánh giá',
      'Chọn các thông số Bilirubin, Albumin, PT, Báng bụng và Bệnh não gan.');
}

// ─── METABOLIC SYNDROME ───────────────────────────────
function evaluateMetSynLogic() {
  const total = document.querySelectorAll('.dc-checkbox-input:checked').length;
  if (total >= 3)
    updateResultUI('success', '<i class="fa-solid fa-circle-check"></i>',
      `Chẩn đoán Hội chứng Chuyển hóa (${total}/5 tiêu chuẩn)`,
      'Đạt ≥ 3/5 tiêu chuẩn. Tăng nguy cơ ĐTĐ type 2 và bệnh tim mạch. Ưu tiên thay đổi lối sống.');
  else if (total >= 1)
    updateResultUI('warning', '<i class="fa-solid fa-circle-exclamation"></i>',
      `Chưa đủ HC chuyển hóa (${total}/5 tiêu chuẩn)`,
      'Cần ≥ 3/5 tiêu chuẩn. Hiện có nguy cơ chuyển hóa. Theo dõi và kiểm soát các yếu tố nguy cơ.');
  else
    updateResultUI('neutral', '<i class="fa-solid fa-circle-question"></i>',
      'Chưa đánh giá (0/5)',
      'Chọn các yếu tố hiện có của bệnh nhân.');
}

// ─── ARDS BERLIN ──────────────────────────────────────
function evaluateARDSLogic() {
  const m = document.querySelectorAll('.major-input:checked').length;
  const sel = Array.from(document.querySelectorAll('.minor-input:checked')).map(cb => cb.value);
  if (m >= 3) {
    if (sel.includes('ards_n3'))
      updateResultUI('danger', '<i class="fa-solid fa-triangle-exclamation"></i>',
        'ARDS NẶNG — P/F ≤ 100 mmHg',
        'Cần thở máy bảo vệ phổi (Vt 6 mL/kg IBW), PEEP cao, xem xét tư thế nằm sấp và ECMO.');
    else if (sel.includes('ards_n2'))
      updateResultUI('warning', '<i class="fa-solid fa-circle-exclamation"></i>',
        'ARDS TRUNG BÌNH — P/F 101-200 mmHg',
        'Thở máy bảo vệ phổi, PEEP tối ưu hóa, xem xét nằm sấp nếu P/F < 150.');
    else if (sel.includes('ards_n1'))
      updateResultUI('warning', '<i class="fa-solid fa-circle-exclamation"></i>',
        'ARDS NHẸ — P/F 201-300 mmHg',
        'Theo dõi sát, điều trị nguyên nhân, thở máy bảo vệ phổi nếu cần.');
    else
      updateResultUI('success', '<i class="fa-solid fa-circle-check"></i>',
        'Đủ tiêu chuẩn ARDS — Chưa phân mức độ',
        'Thỏa 3 tiêu chuẩn Berlin. Chọn tiêu chuẩn phụ (P/F ratio) để phân mức độ nặng.');
  } else
    updateResultUI('neutral', '<i class="fa-solid fa-circle-question"></i>',
      'Chưa đủ 3 tiêu chuẩn ARDS',
      'Cần đủ cả 3: Thời gian khởi phát, Hình ảnh học, Nguyên nhân phù phổi.');
}

// ─── CURB-65 ──────────────────────────────────────────
function evaluateCURB65Logic() {
  const total = document.querySelectorAll('.dc-checkbox-input:checked').length;
  if (total >= 4)
    updateResultUI('danger', '<i class="fa-solid fa-triangle-exclamation"></i>',
      `CURB-65 = ${total}/5 — Nặng`,
      'Tử vong cao (>14%). Xem xét nhập ICU, kháng sinh IV phổ rộng, oxy liệu pháp.');
  else if (total === 3)
    updateResultUI('danger', '<i class="fa-solid fa-triangle-exclamation"></i>',
      `CURB-65 = ${total}/5 — Nặng vừa`,
      'Tử vong ~14%. Nhập viện, xem xét ICU nếu lâm sàng xấu, kháng sinh IV.');
  else if (total === 2)
    updateResultUI('warning', '<i class="fa-solid fa-circle-exclamation"></i>',
      `CURB-65 = ${total}/5 — Trung bình`,
      'Tử vong ~9%. Xem xét nhập viện. Đánh giá thêm PSI/PORT score.');
  else if (total === 1)
    updateResultUI('success', '<i class="fa-solid fa-circle-check"></i>',
      `CURB-65 = ${total}/5 — Nhẹ`,
      'Tử vong thấp (~2%). Cân nhắc điều trị ngoại trú nếu đủ điều kiện theo dõi.');
  else
    updateResultUI('neutral', '<i class="fa-solid fa-circle-question"></i>',
      'CURB-65 = 0/5',
      'Tử vong rất thấp (<1%). Điều trị ngoại trú phù hợp.');
}
