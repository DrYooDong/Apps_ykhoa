// ════════════════════════════════════════════════════════════════
//  CLINIPORTAL - PHARMACOLOGY HEATMAP & SEARCH ENGINE
//  Render ma trận tương tác 2D 10x10, Autocomplete search & History
// ════════════════════════════════════════════════════════════════

(function () {
  'use strict';

  const RECENT_STORAGE_KEY = 'cliniportal_recently_explored_v1';

  // 10 Major Drug Classes for 2D Heatmap Matrix
  const DRUG_CLASSES = [
    { id: 'acei', name: 'ACEi / ARB' },
    { id: 'arni', name: 'ARNI' },
    { id: 'bb', name: 'Beta-Blockers' },
    { id: 'ccb', name: 'Non-DHP CCB' },
    { id: 'statin', name: 'Statin (CYP3A4)' },
    { id: 'nsaid', name: 'NSAIDs' },
    { id: 'doac', name: 'DOACs / VKA' },
    { id: 'macro', name: 'Macrolides' },
    { id: 'ppi', name: 'Omeprazole' },
    { id: 'amiodarone', name: 'Amiodarone' }
  ];

  // 2D Interaction Database Matrix (Key format: 'classA:classB')
  const HEATMAP_DB = {
    'acei:arni': { level: 'severe', code: '⛔ CCĐ', title: 'ACEi + ARNI', text: 'Tích tụ Bradykinin gây bùng phát phù mạch nguy hiểm tính mạng. Cần rửa thuốc tối thiểu 36h khi chuyển đổi.' },
    'bb:ccb': { level: 'severe', code: '⛔ CCĐ', title: 'Beta-Blocker + Non-DHP CCB', text: 'Hiệp đồng ức chế cực mạnh nút xoang & dẫn truyền nhĩ thất. Nguy cơ block AV độ nặng / vô tâm thu.' },
    'statin:macro': { level: 'severe', code: '⛔ CCĐ', title: 'Statin (CYP3A4) + Macrolides', text: 'Macrolides ức chế CYP3A4 tại gan làm nồng độ Statin tăng vọt gây tiêu cơ vân cấp & suy thận.' },
    'nsaid:doac': { level: 'moderate', code: '⚠️ Thận trọng', title: 'NSAID + Thuốc chống đông', text: 'Hiệp đồng tăng rủi ro xuất huyết tiêu hóa ồ ạt. Cần kê kèm PPI bảo vệ dạ dày.' },
    'ppi:doac': { level: 'synergy', code: '✅ Hiệp đồng', title: 'PPI + Thuốc chống đông', text: 'Phối hợp che chở niêm mạc dạ dày khỏi nguy cơ xuất huyết tiêu hóa do chống đông.' },
    'arni:bb': { level: 'synergy', code: '✅ GDMT', title: 'ARNI + Beta-Blocker', text: 'Hai trụ cột cốt lõi trong phác đồ suy tim HFrEF giúp giảm tử vong và tái nhập viện.' },
    'amiodarone:statin': { level: 'moderate', code: '⚠️ Chỉnh liều', title: 'Amiodarone + Statin', text: 'Amiodarone ức chế CYP3A4 nhẹ, cần giới hạn liều Simvastatin ≤ 20mg/ngày hoặc Atorvastatin ≤ 40mg/ngày.' },
    'nsaid:acei': { level: 'moderate', code: '⚠️ Thận trọng', title: 'NSAID + ACEi/ARB', text: 'NSAID làm co động mạch vào, ACEi làm giãn động mạch ra → Suy giảm áp lực lọc cầu thận (Suy thận cấp).' },
    'amiodarone:ccb': { level: 'severe', code: '⛔ CCĐ', title: 'Amiodarone + Non-DHP CCB', text: 'Hiệp đồng làm chậm nhịp tim nặng và kéo dài khoảng QT.' }
  };

  // Comprehensive Global Search Catalog
  const SEARCH_CATALOG = [
    { name: 'Paracetamol (Acetaminophen)', cat: 'Giảm đau - Hạ sốt', url: 'Triệu chứng/DL_Daubungcap.html' },
    { name: 'Aspirin (Kháng kết tập tiểu cầu)', cat: 'Tim mạch', url: 'Chuyên khoa/DL_Timmach.html' },
    { name: 'Clopidogrel (Plavix)', cat: 'Tim mạch', url: 'Chuyên khoa/DL_Timmach.html' },
    { name: 'Sacubitril / Valsartan (ARNI)', cat: 'Suy tim', url: 'Chuyên khoa/DL_Timmach.html' },
    { name: 'Bisoprolol / Carvedilol', cat: 'Chẹn beta', url: 'Chuyên khoa/DL_Timmach.html' },
    { name: 'Noradrenaline (Norepinephrine)', cat: 'Vận mạch', url: 'Chuyên khoa/DL_Vanmach.html' },
    { name: 'Adrenaline (Epinephrine)', cat: 'Cấp cứu', url: 'Chuyên khoa/DL_Vanmach.html' },
    { name: 'Amoxicillin / Clavulanate (Augmentin)', cat: 'Kháng sinh', url: 'Chuyên khoa/DL_Khangsinh.html' },
    { name: 'Vancomycin / Linezolid', cat: 'Kháng sinh MRSA', url: 'Chuyên khoa/DL_Khangsinh.html' },
    { name: 'Ciprofloxacin / Levofloxacin', cat: 'Quinolone', url: 'Chuyên khoa/DL_Khangsinh.html' },
    { name: 'Meropenem / Imipenem', cat: 'Carbapenem', url: 'Chuyên khoa/DL_Khangsinh.html' },
    { name: 'Dextromethorphan (Giảm ho)', cat: 'Hô hấp', url: 'Triệu chứng/DL_Ho.html' },
    { name: 'N-Acetylcysteine (NAC)', cat: 'Long đờm / Antidote', url: 'Triệu chứng/DL_Ho.html' },
    { name: 'Omeprazole / Pantoprazole', cat: 'Tiêu hóa (PPI)', url: 'Chuyên khoa/DL_Tiêuhoá.html' },
    { name: 'Ondansetron (Kháng 5-HT3)', cat: 'Chống nôn', url: 'Triệu chứng/DL_Nonoi.html' },
    { name: 'Betahistine / Cinnarizine', cat: 'Chóng mặt', url: 'Triệu chứng/DL_Chongmat.html' }
  ];

  /**
   * Render 2D Interaction Heatmap Matrix into mount element
   */
  function renderHeatmapMatrix(mountEl) {
    if (!mountEl) return;

    let tableHtml = `
      <div class="heatmap-card-container">
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem;">
          <div>
            <h3 style="margin: 0; font-size: var(--text-md); font-weight: 700; color: var(--color-primary); display: flex; align-items: center; gap: 0.5rem;">
              <i class="fa-solid fa-border-all"></i> Ma Trận Tương Tác 2D Đa Nhóm Thuốc (Heatmap)
            </h3>
            <p style="margin: 0.2rem 0 0 0; font-size: 0.8rem; color: var(--color-text-muted);">
              Nhấp vào ô bất kỳ trên ma trận để xem chi tiết cơ chế tương tác & hướng dẫn lâm sàng.
            </p>
          </div>
          <div style="display: flex; gap: 0.6rem; font-size: 0.72rem; font-weight: 700;">
            <span style="color: #e11d48;">🔴 CCĐ Nguy Hiểm</span>
            <span style="color: #d97706;">🟡 Thận Trọng</span>
            <span style="color: #10b981;">🟢 Hiệp Đồng</span>
          </div>
        </div>

        <div class="heatmap-table-wrapper">
          <table class="heatmap-table">
            <thead>
              <tr>
                <th class="header-left">Nhóm Thuốc</th>
                ${DRUG_CLASSES.map(c => `<th>${c.name}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
    `;

    DRUG_CLASSES.forEach((rowClass, rIdx) => {
      tableHtml += `<tr><th class="header-left">${rowClass.name}</th>`;

      DRUG_CLASSES.forEach((colClass, cIdx) => {
        if (rIdx === cIdx) {
          tableHtml += `<td class="heatmap-cell cell-disabled">—</td>`;
        } else {
          const key1 = `${rowClass.id}:${colClass.id}`;
          const key2 = `${colClass.id}:${rowClass.id}`;
          const data = HEATMAP_DB[key1] || HEATMAP_DB[key2];

          if (data) {
            const cellCls = data.level === 'severe' ? 'cell-severe' : data.level === 'moderate' ? 'cell-moderate' : 'cell-synergy';
            tableHtml += `
              <td class="heatmap-cell ${cellCls}" data-key1="${rowClass.id}" data-key2="${colClass.id}" title="${data.title}">
                ${data.code}
              </td>
            `;
          } else {
            tableHtml += `<td class="heatmap-cell cell-neutral" title="Không có tương tác mức độ nặng">—</td>`;
          }
        }
      });

      tableHtml += `</tr>`;
    });

    tableHtml += `
            </tbody>
          </table>
        </div>
      </div>
    `;

    mountEl.innerHTML = tableHtml;

    // Attach click listener for cells
    mountEl.querySelectorAll('.heatmap-cell[data-key1]').forEach(cell => {
      cell.addEventListener('click', () => {
        const k1 = cell.getAttribute('data-key1');
        const k2 = cell.getAttribute('data-key2');
        const info = HEATMAP_DB[`${k1}:${k2}`] || HEATMAP_DB[`${k2}:${k1}`];
        if (info) showHeatmapCellModal(info);
      });
    });
  }

  /**
   * Display Modal for Heatmap cell interaction details
   */
  function showHeatmapCellModal(info) {
    let overlay = document.getElementById('heatmap-modal-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'heatmap-modal-overlay';
      overlay.className = 'pharma-modal-overlay';
      document.body.appendChild(overlay);
    }

    const colorHeader = info.level === 'severe' ? '#e11d48' : info.level === 'moderate' ? '#d97706' : '#10b981';

    overlay.innerHTML = `
      <div class="pharma-modal-card" style="max-width: 580px;">
        <div class="pharma-modal-header" style="background: ${colorHeader}; color: #fff;">
          <h3 class="pharma-modal-title" style="color: #fff;">
            <i class="fa-solid fa-triangle-exclamation"></i> ${info.title}
          </h3>
          <button class="pharma-modal-close" id="hm-modal-close" style="color: #fff;">&times;</button>
        </div>
        <div class="pharma-modal-body">
          <div style="font-size: var(--text-sm); font-weight: 700; color: ${colorHeader}; margin-bottom: 0.75rem;">
            Mức độ: ${info.code}
          </div>
          <p style="font-size: var(--text-sm); color: var(--color-text); line-height: 1.6; margin-bottom: 1.25rem;">
            ${info.text}
          </p>
          <button id="hm-modal-ok" style="background: var(--color-primary); color: #fff; border: none; padding: 0.5rem 1.25rem; border-radius: var(--radius-md); font-weight: 700; cursor: pointer; width: 100%;">
            Đã Hiểu Hướng Dẫn
          </button>
        </div>
      </div>
    `;

    overlay.classList.add('active');

    const closeBtn = document.getElementById('hm-modal-close');
    const okBtn = document.getElementById('hm-modal-ok');
    const closeFn = () => overlay.classList.remove('active');

    if (closeBtn) closeBtn.onclick = closeFn;
    if (okBtn) okBtn.onclick = closeFn;
    overlay.onclick = (e) => { if (e.target === overlay) closeFn(); };
  }

  /**
   * Setup Autocomplete Search Engine
   */
  function setupAutocompleteSearch() {
    const input = document.getElementById('lesson-search');
    if (!input) return;

    const parent = input.closest('.search-box-container') || input.parentElement;
    if (!parent) return;

    parent.classList.add('pharma-search-wrapper');

    let dropdown = document.getElementById('pharma-autocomplete-list');
    if (!dropdown) {
      dropdown = document.createElement('div');
      dropdown.id = 'pharma-autocomplete-list';
      dropdown.className = 'pharma-autocomplete-list';
      parent.appendChild(dropdown);
    }

    input.addEventListener('input', () => {
      const q = input.value.toLowerCase().trim();
      if (q.length < 2) {
        dropdown.classList.remove('active');
        return;
      }

      const matches = SEARCH_CATALOG.filter(s => s.name.toLowerCase().includes(q) || s.cat.toLowerCase().includes(q));

      if (matches.length === 0) {
        dropdown.classList.remove('active');
        return;
      }

      dropdown.innerHTML = matches.map(m => `
        <a href="${m.url}" class="autocomplete-item">
          <span class="autocomplete-name">💊 ${m.name}</span>
          <span class="autocomplete-cat">${m.cat}</span>
        </a>
      `).join('');

      dropdown.classList.add('active');
    });

    document.addEventListener('click', (e) => {
      if (!parent.contains(e.target)) {
        dropdown.classList.remove('active');
      }
    });
  }

  /**
   * Recently Explored History Logger
   */
  function logExploredPage() {
    const title = document.title.replace('– CliniPortal', '').trim();
    const url = window.location.pathname;

    try {
      const stored = localStorage.getItem(RECENT_STORAGE_KEY);
      let list = stored ? JSON.parse(stored) : [];

      list = list.filter(item => item.url !== url);
      list.unshift({ title, url, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) });

      if (list.length > 6) list.pop();

      localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.warn('[RecentlyExplored] Error:', e);
    }
  }

  function renderRecentlyExploredCarousel(mountEl) {
    if (!mountEl) return;

    try {
      const stored = localStorage.getItem(RECENT_STORAGE_KEY);
      const list = stored ? JSON.parse(stored) : [];

      if (list.length === 0) return;

      mountEl.innerHTML = `
        <div class="recently-viewed-container">
          <div style="font-size: var(--text-xs); font-weight: 700; color: var(--color-text-muted); text-transform: uppercase; margin-bottom: 0.5rem;">
            🕒 Bài Học / Trang Vừa Khám Phá
          </div>
          <div class="recently-viewed-scroll">
            ${list.map(item => `
              <a href="${item.url}" class="recently-card">
                <div class="recently-card-title">📖 ${item.title}</div>
                <div class="recently-card-time">Xem lúc ${item.time}</div>
              </a>
            `).join('')}
          </div>
        </div>
      `;
    } catch (e) {}
  }

  // Export API
  window.PharmaHeatmap = {
    renderHeatmap: renderHeatmapMatrix,
    renderRecently: renderRecentlyExploredCarousel
  };

  document.addEventListener('DOMContentLoaded', () => {
    logExploredPage();
    setupAutocompleteSearch();

    const heatmapMount = document.getElementById('pharma-heatmap-mount');
    if (heatmapMount) renderHeatmapMatrix(heatmapMount);

    const recentlyMount = document.getElementById('pharma-recently-mount');
    if (recentlyMount) renderRecentlyExploredCarousel(recentlyMount);
  });
})();
