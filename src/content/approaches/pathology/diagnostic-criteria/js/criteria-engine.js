/**
 * Ngân hàng Tiêu chuẩn Chẩn đoán - Engine xử lý Logic (CliniPortal) v2.5
 * Full Vietnamese Diacritics & SaaS 3.0 Rendering
 */

const SPEC_COLORS = {
  'Tim mạch':      { color: '#e11d48', bg: 'rgba(225, 29, 72, 0.08)' },
  'Nội khoa':      { color: '#0284c7', bg: 'rgba(2, 132, 199, 0.08)' },
  'Truyền nhiễm':  { color: '#d97706', bg: 'rgba(217, 119, 6, 0.08)' },
  'Huyết học':     { color: '#dc2626', bg: 'rgba(220, 38, 38, 0.08)' },
  'Thần kinh':     { color: '#7c3aed', bg: 'rgba(124, 58, 237, 0.08)' },
  'Cơ xương khớp': { color: '#db2777', bg: 'rgba(219, 39, 119, 0.08)' },
  'Hô hấp':        { color: '#0ea5e9', bg: 'rgba(14, 165, 233, 0.08)' },
  'Cấp cứu':       { color: '#e11d48', bg: 'rgba(225, 29, 72, 0.08)' },
  'Nhi khoa':      { color: '#0ea5e9', bg: 'rgba(14, 165, 233, 0.08)' },
  'Ngoại khoa':    { color: '#16a34a', bg: 'rgba(22, 163, 74, 0.08)' },
};

const DEFAULT_SPEC = { color: '#0284c7', bg: 'rgba(2, 132, 199, 0.08)' };

function getSpecColor(specialty) {
  return SPEC_COLORS[specialty] || DEFAULT_SPEC;
}

let criteriaDataCache = null;

async function fetchCriteriaData() {
  if (criteriaDataCache) return criteriaDataCache;
  const response = await fetch('./data/criteria-database.json');
  if (!response.ok) throw new Error('Không thể tải dữ liệu tiêu chuẩn');
  criteriaDataCache = await response.json();
  return criteriaDataCache;
}

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const criteriaId = urlParams.get('id');

  if (criteriaId) {
    loadCriteriaDetail(criteriaId);
  } else {
    loadCriteriaHub();
  }

  // Keyboard shortcut '/' to search
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
      e.preventDefault();
      const searchInput = document.getElementById('criteria-search');
      if (searchInput) searchInput.focus();
    }
  });
});

/* ════════════════════════════════════════════════════
 * HUB PAGE RENDERING
 * ════════════════════════════════════════════════════ */
async function loadCriteriaHub() {
  const container = document.getElementById('criteria-hub-container');
  const filterPillsEl = document.getElementById('criteria-filter-pills');
  const totalCountEl = document.getElementById('stat-total-count');
  const specCountEl = document.getElementById('stat-spec-count');
  const displayCountEl = document.getElementById('criteria-display-count');
  const searchInput = document.getElementById('criteria-search');
  if (!container) return;

  let allData = {};
  try {
    allData = await fetchCriteriaData();
  } catch (err) {
    container.innerHTML = `<div class="loading-state"><i class="fa-solid fa-triangle-exclamation" style="color:#ef4444;font-size:2rem;"></i><p>Lỗi tải dữ liệu. Vui lòng kiểm tra Local Server.</p></div>`;
    return;
  }

  const items = Object.values(allData);
  const uniqueSpecs = ['Tất cả', ...new Set(items.map(i => i.specialty))];
  
  if (totalCountEl) totalCountEl.textContent = items.length;
  if (specCountEl) specCountEl.textContent = uniqueSpecs.length - 1;

  let activeSpecialty = 'Tất cả';

  function renderFilterPills() {
    if (!filterPillsEl) return;
    filterPillsEl.innerHTML = uniqueSpecs.map(sp => {
      const spec = getSpecColor(sp);
      const isActive = sp === activeSpecialty;
      return `
        <button class="dc-pill-btn ${isActive ? 'active' : ''}"
          onclick="setSpecialtyFilter('${sp}')">
          ${sp !== 'Tất cả' ? `<span class="dc-pill-dot" style="background:${spec.color};"></span>` : ''}
          ${sp}
        </button>
      `;
    }).join('');
  }

  window.setSpecialtyFilter = function(sp) {
    activeSpecialty = sp;
    renderFilterPills();
    renderCards();
  };

  window.handleCriteriaSearch = function() {
    renderCards();
  };

  function renderCards() {
    const query = (searchInput?.value || '').toLowerCase().trim();
    let filtered = items.filter(item => {
      const matchSpec = activeSpecialty === 'Tất cả' || item.specialty === activeSpecialty;
      const matchQuery = !query || 
        item.name.toLowerCase().includes(query) ||
        item.disease.toLowerCase().includes(query) ||
        (item.icd && item.icd.toLowerCase().includes(query)) ||
        item.specialty.toLowerCase().includes(query);
      return matchSpec && matchQuery;
    });

    if (displayCountEl) displayCountEl.textContent = filtered.length;

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="loading-state" style="grid-column: 1 / -1; padding: 60px 20px;">
          <i class="fa-solid fa-folder-open" style="font-size: 2.5rem; color: var(--color-text-muted);"></i>
          <p style="margin-top: 10px; font-size: 0.95rem;">Không tìm thấy tiêu chuẩn chẩn đoán phù hợp.</p>
        </div>`;
      return;
    }

    container.innerHTML = filtered.map(item => {
      const spec = getSpecColor(item.specialty);
      const majorLen = item.criteria?.major?.length || 0;
      const minorLen = item.criteria?.minor?.length || 0;

      return `
        <a href="criteria-detail.html?id=${item.id}" class="dc-card" style="--card-accent: ${spec.color};">
          <div class="dc-card-inner">
            <div class="dc-card-top">
              <div class="dc-card-badges">
                ${item.icd ? `<span class="dc-icd-tag">${item.icd}</span>` : ''}
                <span class="dc-spec-badge" style="color:${spec.color}; background:${spec.bg};">${item.specialty}</span>
                <span class="dc-calc-badge"><i class="fa-solid fa-bolt"></i> Máy tính</span>
              </div>
            </div>

            <h3 class="dc-card-title">${item.name}</h3>
            <div class="dc-card-disease">Bệnh lý: ${item.disease}</div>

            <div class="dc-card-footer">
              <span class="dc-card-cta">
                <i class="fa-solid fa-circle-nodes"></i>
                ${majorLen ? `${majorLen} chính` : ''} ${minorLen ? `• ${minorLen} phụ` : ''}
              </span>
              <i class="fa-solid fa-arrow-right dc-card-arrow"></i>
            </div>
          </div>
        </a>
      `;
    }).join('');
  }

  renderFilterPills();
  renderCards();
}

/* ════════════════════════════════════════════════════
 * DETAIL PAGE RENDERING
 * ════════════════════════════════════════════════════ */
async function loadCriteriaDetail(id) {
  const container = document.getElementById('criteria-detail-container');
  if (!container) return;

  let data;
  try {
    const allData = await fetchCriteriaData();
    data = allData[id];
    if (!data) {
      container.innerHTML = `<div class="loading-state"><i class="fa-solid fa-circle-exclamation" style="color:#ef4444;font-size:2rem;"></i><p>Không tìm thấy tiêu chuẩn này.</p></div>`;
      return;
    }
  } catch (err) {
    container.innerHTML = `<div class="loading-state"><i class="fa-solid fa-triangle-exclamation" style="color:#ef4444;font-size:2rem;"></i><p>Lỗi tải dữ liệu. Vui lòng kiểm tra Local Server.</p></div>`;
    return;
  }

  renderCriteriaDetail(container, data);
}

function renderCriteriaDetail(container, data) {
  document.title = `${data.name} – CliniPortal`;
  const topbarTitle = document.getElementById('topbar-title-display');
  if (topbarTitle) topbarTitle.textContent = data.name;

  const spec = getSpecColor(data.specialty);

  let html = `
    <!-- BREADCRUMB -->
    <div class="dc-breadcrumb">
      <a href="index.html"><i class="fa-solid fa-arrow-left"></i> Ngân hàng Tiêu chuẩn</a>
      <i class="fa-solid fa-chevron-right" style="font-size: 0.65rem; color: var(--color-text-muted);"></i>
      <span style="color: var(--color-text); font-weight: 600;">${data.name}</span>
    </div>

    <!-- DETAIL HEADER -->
    <div class="dc-detail-header">
      <div class="dc-detail-title-group">
        <span class="dc-spec-badge" style="color:${spec.color}; background:${spec.bg}; font-size: 0.78rem; padding: 4px 10px;">
          ${data.specialty}
        </span>
        ${data.icd ? `<span class="dc-icd-tag" style="font-size:0.75rem; padding:3px 8px;">ICD-10: ${data.icd}</span>` : ''}
      </div>
      <h1 class="dc-detail-title">${data.name}</h1>
      <div class="dc-detail-disease">Bệnh lý: ${data.disease}</div>
      <p class="dc-detail-desc">${data.description}</p>
    </div>
  `;

  // CHECKLIST SECTIONS
  if (data.criteria.major?.length > 0) {
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
        </label>
      `;
    });

    html += `</div>`;
  }

  if (data.criteria.minor?.length > 0) {
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
        </label>
      `;
    });

    html += `</div>`;
  }

  // LIVE SCORE TALLY BAR
  html += `
    <div class="dc-score-tally">
      <div class="dc-tally-items">
        <div class="dc-tally-item">
          <span class="dc-tally-val" id="major-count-display">0</span>
          <span>tiêu chuẩn chính</span>
        </div>
        <div class="dc-tally-sep"></div>
        <div class="dc-tally-item">
          <span class="dc-tally-val" id="minor-count-display">0</span>
          <span>tiêu chuẩn phụ</span>
        </div>
      </div>
      <button class="dc-btn-reset" onclick="resetAllCheckboxes('${data.logic_type}')" title="Xóa tất cả các lựa chọn">
        <i class="fa-solid fa-rotate-left"></i> Đặt lại
      </button>
    </div>
  `;

  // STICKY RESULT CARD
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

  // FOOTER & REFERENCES
  html += `
    <div class="dc-footer">
      <div class="dc-disclaimer">
        <i class="fa-solid fa-triangle-exclamation"></i>
        <span>${data.disclaimer}</span>
      </div>
      <div class="dc-refs">
        <strong>Tài liệu tham khảo chính thức:</strong>
        <ul>
          ${data.references.map(ref => `<li>${ref}</li>`).join('')}
        </ul>
      </div>
    </div>
  `;

  container.innerHTML = html;
}

/* ── CHECKBOX HANDLERS ─────────────────────────────────────── */
window.onCheckChange = function(itemId, logicType) {
  const label = document.getElementById(`label-${itemId}`);
  const input = document.getElementById(itemId);
  if (label && input) {
    label.classList.toggle('is-checked', input.checked);
  }

  const majorCount = document.querySelectorAll('.major-input:checked').length;
  const minorCount = document.querySelectorAll('.minor-input:checked').length;
  
  const majorEl = document.getElementById('major-count-display');
  const minorEl = document.getElementById('minor-count-display');
  if (majorEl) majorEl.textContent = majorCount;
  if (minorEl) minorEl.textContent = minorCount;

  evaluateLogic(logicType);
};

window.resetAllCheckboxes = function(logicType) {
  document.querySelectorAll('.dc-checkbox-input').forEach(cb => {
    cb.checked = false;
  });
  document.querySelectorAll('.dc-checkbox-card').forEach(card => {
    card.classList.remove('is-checked');
  });
  const majorEl = document.getElementById('major-count-display');
  const minorEl = document.getElementById('minor-count-display');
  if (majorEl) majorEl.textContent = '0';
  if (minorEl) minorEl.textContent = '0';

  evaluateLogic(logicType);
};

function evaluateLogic(logicType) {
  switch (logicType) {
    case 'duke_logic':
      evaluateDukeLogic();
      break;
    case 'jones_logic':
      evaluateJonesLogic();
      break;
    case 'ra_logic':
      evaluateRALogic();
      break;
    case 'kawasaki_logic':
      evaluateKawasakiLogic();
      break;
    default:
      evaluateDukeLogic();
  }
}

function updateResultUI(statusClass, iconHtml, titleText, explanationText) {
  const card = document.getElementById('dc-result-card');
  const icon = document.getElementById('dc-result-icon');
  const val = document.getElementById('dc-result-value');
  const exp = document.getElementById('dc-result-explanation');

  if (card) {
    card.className = `dc-result-card ${statusClass}`;
  }
  if (icon) icon.innerHTML = iconHtml;
  if (val) val.textContent = titleText;
  if (exp) exp.textContent = explanationText;
}

function evaluateDukeLogic() {
  const majorCount = document.querySelectorAll('.major-input:checked').length;
  const minorCount = document.querySelectorAll('.minor-input:checked').length;

  if (majorCount >= 2 || (majorCount >= 1 && minorCount >= 3) || minorCount >= 5) {
    updateResultUI('success', '<i class="fa-solid fa-circle-check"></i>',
      'Chẩn đoán XÁC ĐỊNH (Definite IE)',
      `Thỏa mãn tiêu chuẩn Duke (${majorCount} chính, ${minorCount} phụ). Khuyến cáo khởi đầu phác đồ kháng sinh trúng đích / hội chẩn phẫu thuật.`);
  } else if ((majorCount >= 1 && minorCount >= 1) || minorCount >= 3) {
    updateResultUI('warning', '<i class="fa-solid fa-circle-exclamation"></i>',
      'Chẩn đoán CÓ THỂ (Possible IE)',
      `Đạt: ${majorCount} chính, ${minorCount} phụ. Nghi ngờ cao Viêm nội tâm mạc nhiễm khuẩn, cần theo dõi sát siêu âm tim qua thực quản (TEE) và lặp lại cấy máu.`);
  } else {
    updateResultUI('neutral', '<i class="fa-solid fa-circle-question"></i>',
      'Chưa đủ dữ kiện / Loại trừ (Rejected)',
      `Đạt: ${majorCount} chính, ${minorCount} phụ. Chưa thỏa mãn tiêu chuẩn chẩn đoán Duke 2023.`);
  }
}

function evaluateJonesLogic() {
  const majorCount = document.querySelectorAll('.major-input:checked').length;
  const minorCount = document.querySelectorAll('.minor-input:checked').length;

  if (majorCount >= 2 || (majorCount >= 1 && minorCount >= 2)) {
    updateResultUI('success', '<i class="fa-solid fa-circle-check"></i>',
      'Chẩn đoán XÁC ĐỊNH (Definite ARF)',
      `Đạt: ${majorCount} chính, ${minorCount} phụ. Thỏa mãn tiêu chuẩn Jones 2015 cho đợt Sốt thấp khớp cấp.`);
  } else if (majorCount >= 1 || minorCount >= 2) {
    updateResultUI('warning', '<i class="fa-solid fa-circle-exclamation"></i>',
      'Nghi ngờ / Cần theo dõi (Possible ARF)',
      `Đạt: ${majorCount} chính, ${minorCount} phụ. Chưa đủ tiêu chuẩn xác định nhưng cần tầm soát kĩ tổn thương tim.`);
  } else {
    updateResultUI('neutral', '<i class="fa-solid fa-circle-question"></i>',
      'Chưa đủ tiêu chuẩn chẩn đoán',
      `Đạt: ${majorCount} chính, ${minorCount} phụ.`);
  }
}

function evaluateRALogic() {
  const selected = Array.from(document.querySelectorAll('.dc-checkbox-input:checked')).map(cb => cb.value);
  let score = 0;
  if (selected.includes('ra_m1')) score += 3;
  if (selected.includes('ra_m2')) score += 3;
  if (selected.includes('ra_m3')) score += 1;
  if (selected.includes('ra_n1')) score += 1;
  if (selected.includes('ra_n2')) score += 2;
  if (selected.includes('ra_n3')) score += 1;

  if (score >= 6) {
    updateResultUI('success', '<i class="fa-solid fa-circle-check"></i>',
      `Phân loại Viêm khớp dạng thấp (Tổng điểm: ${score}/10)`,
      `Điểm ≥ 6/10 thỏa mãn tiêu chuẩn phân loại RA theo ACR/EULAR 2010. Khuyến cáo khởi đầu DMARDs sớm.`);
  } else if (score > 0) {
    updateResultUI('warning', '<i class="fa-solid fa-circle-exclamation"></i>',
      `Chưa đủ điểm phân loại RA (Tổng điểm: ${score}/10)`,
      `Tổng điểm ${score}/10 (Yêu cầu ≥ 6 điểm). Cần đánh giá lại sau hoặc bổ sung xét nghiệm huyết thanh.`);
  } else {
    updateResultUI('neutral', '<i class="fa-solid fa-circle-question"></i>',
      'Chưa có điểm đánh giá (0/10)',
      'Hãy đánh dấu chọn các đặc điểm lâm sàng và xét nghiệm của bệnh nhân.');
  }
}

function evaluateKawasakiLogic() {
  const feverChecked = document.getElementById('k_m1')?.checked;
  const minorCount = document.querySelectorAll('.minor-input:checked').length;

  if (feverChecked && minorCount >= 4) {
    updateResultUI('success', '<i class="fa-solid fa-circle-check"></i>',
      'Chẩn đoán Bệnh Kawasaki ĐIỂN HÌNH',
      `Thỏa mãn Sốt ≥ 5 ngày + ${minorCount}/5 tiêu chuẩn phụ. Khuyến cáo dùng IVIG (2g/kg) và Aspirin sớm trước ngày thứ 10.`);
  } else if (feverChecked && minorCount >= 2) {
    updateResultUI('warning', '<i class="fa-solid fa-circle-exclamation"></i>',
      'Nghi ngờ Kawasaki KHÔNG ĐIỂN HÌNH (Incomplete Kawasaki)',
      `Có Sốt ≥ 5 ngày + ${minorCount}/5 tiêu chuẩn phụ. Khuyến cáo làm thêm CRP, ESR, Siêu âm tim tầm soát phồng động mạch vành.`);
  } else {
    updateResultUI('neutral', '<i class="fa-solid fa-circle-question"></i>',
      'Chưa đủ tiêu chuẩn chẩn đoán Kawasaki',
      `Sốt: ${feverChecked ? 'Có (≥ 5 ngày)' : 'Chưa đủ 5 ngày'}, Tiêu chuẩn phụ: ${minorCount}/5.`);
  }
}
