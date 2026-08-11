// ════════════════════════════════════════════════════════════════
//  CLINIPORTAL - PHARMACOLOGY HEATMAP & SEARCH ENGINE
//  Render ma trận tương tác 2D cho các chuyên khoa
// ════════════════════════════════════════════════════════════════

(function () {
  'use strict';

  // Định nghĩa các nhóm thuốc cho từng chuyên khoa
  const SPECIALTY_MATRICES = {
    'timmach': [
      { id: 'acei', name: 'ACEi / ARB' },
      { id: 'arni', name: 'ARNI' },
      { id: 'bb', name: 'Beta-Blockers' },
      { id: 'ccb', name: 'Non-DHP CCB' },
      { id: 'statin', name: 'Statin' },
      { id: 'doac', name: 'DOACs / VKA' },
      { id: 'amiodarone', name: 'Amiodarone' },
      { id: 'thiazide', name: 'Thiazide' },
      { id: 'nsaid', name: 'NSAIDs' }
    ],
    'vanmach': [
      { id: 'adr', name: 'Adrenaline' },
      { id: 'noradr', name: 'Noradrenaline' },
      { id: 'dopa', name: 'Dopamine' },
      { id: 'dobu', name: 'Dobutamine' },
      { id: 'vaso', name: 'Vasopressin' },
      { id: 'amiodarone', name: 'Amiodarone' }
    ],
    'khangsinh': [
      { id: 'betalactam', name: 'Beta-lactam' },
      { id: 'macro', name: 'Macrolides' },
      { id: 'quinolone', name: 'Quinolone' },
      { id: 'amino', name: 'Aminoglycoside' },
      { id: 'vanco', name: 'Vancomycin' },
      { id: 'linezolid', name: 'Linezolid' },
      { id: 'metro', name: 'Metronidazole' }
    ],
    'hohap': [
      { id: 'ics', name: 'ICS' },
      { id: 'saba_laba', name: 'SABA / LABA' },
      { id: 'lama', name: 'LAMA' },
      { id: 'theo', name: 'Theophylline' },
      { id: 'corticoid', name: 'Systemic CS' },
      { id: 'macro', name: 'Macrolides' }
    ],
    'tieuhoa': [
      { id: 'ppi', name: 'PPI' },
      { id: 'h2ra', name: 'H2RA' },
      { id: 'prokinetic', name: 'Prokinetic' },
      { id: 'bismuth', name: 'Bismuth' },
      { id: 'nsaid', name: 'NSAIDs' }
    ],
    'toanthan': [
      { id: 'para', name: 'Paracetamol' },
      { id: 'nsaid', name: 'NSAIDs' },
      { id: 'opioid', name: 'Opioid' },
      { id: 'corticoid', name: 'Corticosteroid' },
      { id: 'ppi', name: 'PPI' }
    ]
  };

  // CSDL Tương tác chung
  const HEATMAP_DB = {
    // Tim mach & Chung
    'acei:arni': { level: 'severe', code: '⛔ CCĐ', title: 'ACEi + ARNI', text: 'Tích tụ Bradykinin gây bùng phát phù mạch nguy hiểm tính mạng. Cần rửa thuốc tối thiểu 36h khi chuyển đổi.' },
    'bb:ccb': { level: 'severe', code: '⛔ CCĐ', title: 'Beta-Blocker + Non-DHP CCB', text: 'Hiệp đồng ức chế cực mạnh nút xoang & dẫn truyền nhĩ thất. Nguy cơ block AV độ nặng / vô tâm thu.' },
    'statin:macro': { level: 'severe', code: '⛔ CCĐ', title: 'Statin (CYP3A4) + Macrolides', text: 'Macrolides ức chế CYP3A4 tại gan làm nồng độ Statin tăng vọt gây tiêu cơ vân cấp & suy thận.' },
    'nsaid:doac': { level: 'moderate', code: '⚠️ Thận trọng', title: 'NSAID + Thuốc chống đông', text: 'Hiệp đồng tăng rủi ro xuất huyết tiêu hóa ồ ạt. Cần kê kèm PPI bảo vệ dạ dày.' },
    'ppi:doac': { level: 'synergy', code: '✅ Hiệp đồng', title: 'PPI + Thuốc chống đông', text: 'Phối hợp che chở niêm mạc dạ dày khỏi nguy cơ xuất huyết tiêu hóa do chống đông.' },
    'arni:bb': { level: 'synergy', code: '✅ GDMT', title: 'ARNI + Beta-Blocker', text: 'Hai trụ cột cốt lõi trong phác đồ suy tim HFrEF giúp giảm tử vong và tái nhập viện.' },
    'amiodarone:statin': { level: 'moderate', code: '⚠️ Chỉnh liều', title: 'Amiodarone + Statin', text: 'Amiodarone ức chế CYP3A4 nhẹ, cần giới hạn liều Simvastatin ≤ 20mg/ngày hoặc Atorvastatin ≤ 40mg/ngày.' },
    'nsaid:acei': { level: 'moderate', code: '⚠️ Thận trọng', title: 'NSAID + ACEi/ARB', text: 'NSAID làm co động mạch vào, ACEi làm giãn động mạch ra → Suy giảm áp lực lọc cầu thận (Suy thận cấp).' },
    'amiodarone:ccb': { level: 'severe', code: '⛔ CCĐ', title: 'Amiodarone + Non-DHP CCB', text: 'Hiệp đồng làm chậm nhịp tim nặng và kéo dài khoảng QT.' },
    
    // Khang sinh
    'macro:quinolone': { level: 'severe', code: '⛔ CCĐ', title: 'Macrolide + Quinolone', text: 'Cả hai đều kéo dài khoảng QT, tăng nguy cơ xoắn đỉnh nguy hiểm tính mạng.' },
    'betalactam:amino': { level: 'synergy', code: '✅ Hiệp đồng', title: 'Beta-lactam + Aminoglycoside', text: 'Beta-lactam phá vỡ vách tế bào giúp Aminoglycoside dễ dàng xâm nhập, tăng hiệu quả diệt khuẩn (vd: Viêm nội tâm mạc).' },
    'vanco:amino': { level: 'severe', code: '⛔ Độc Thận', title: 'Vancomycin + Aminoglycoside', text: 'Phối hợp làm tăng đáng kể nguy cơ độc tính trên thận. Cần theo dõi sát chức năng thận.' },
    
    // Ho hap
    'saba_laba:lama': { level: 'synergy', code: '✅ Hiệp đồng', title: 'SABA/LABA + LAMA', text: 'Giãn phế quản tối ưu thông qua 2 cơ chế khác nhau. Nền tảng điều trị COPD.' },
    'theo:macro': { level: 'moderate', code: '⚠️ Thận trọng', title: 'Theophylline + Macrolide', text: 'Macrolide ức chế chuyển hóa Theophylline làm tăng nồng độ và độc tính (loạn nhịp, co giật).' },
    
    // Tieu hoa
    'ppi:nsaid': { level: 'synergy', code: '✅ Bảo vệ', title: 'PPI + NSAIDs', text: 'PPI giúp bảo vệ niêm mạc dạ dày, giảm nguy cơ loét và xuất huyết do NSAID.' },
    'ppi:prokinetic': { level: 'synergy', code: '✅ Hiệp đồng', title: 'PPI + Prokinetic', text: 'Tăng cường hiệu quả điều trị trào ngược dạ dày thực quản (GERD).' },
    
    // Toan than
    'nsaid:corticoid': { level: 'severe', code: '⛔ CCĐ', title: 'NSAIDs + Corticosteroid', text: 'Tăng mạnh nguy cơ loét và thủng dạ dày-tá tràng. Tránh phối hợp hoặc bắt buộc dùng kèm PPI.' },
    'opioid:para': { level: 'synergy', code: '✅ Hiệp đồng', title: 'Opioid + Paracetamol', text: 'Kết hợp giúp tăng hiệu quả giảm đau đa cơ chế và giảm liều lượng Opioid.' }
  };

  /**
   * Render 2D Interaction Heatmap Matrix into mount element
   */
  function renderHeatmapMatrix(mountEl, specialtyKey) {
    if (!mountEl) return;
    
    const drugClasses = SPECIALTY_MATRICES[specialtyKey];
    if (!drugClasses) return;

    let tableHtml = `
      <div class="heatmap-card-container" style="animation: fadeIn 0.3s ease-in-out;">
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem;">
          <div>
            <h3 style="margin: 0; font-size: var(--text-md); font-weight: 700; color: var(--color-primary); display: flex; align-items: center; gap: 0.5rem;">
              <i class="fa-solid fa-border-all"></i> Ma Trận Tương Tác 2D Đa Nhóm Thuốc
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
                ${drugClasses.map(c => `<th>${c.name}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
    `;

    drugClasses.forEach((rowClass, rIdx) => {
      tableHtml += `<tr><th class="header-left">${rowClass.name}</th>`;

      drugClasses.forEach((colClass, cIdx) => {
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

  // --- INIT LOGIC ---
  // When DOM loads, we don't render a single matrix anymore.
  // Instead, the tab switching logic in ma-tran-tuong-tac.html will trigger rendering.
  // To keep things clean, we will render the active tab automatically on load.

  document.addEventListener('DOMContentLoaded', () => {
    // Expose renderHeatmapMatrix to global scope so HTML script can call it if needed
    window.renderHeatmapMatrix = renderHeatmapMatrix;

    // Setup search if needed (stubbed or kept from original)
    // ...

    // Identify active tab on load
    const activeTabBtn = document.querySelector('.tab-btn.active');
    if (activeTabBtn) {
      const targetId = activeTabBtn.dataset.target; // e.g. "tab-timmach"
      const specId = targetId.replace('tab-', ''); // "timmach"
      const mountEl = document.getElementById('pharma-heatmap-mount-' + specId);
      if (mountEl) {
        renderHeatmapMatrix(mountEl, specId);
      }
    }

    // Intercept tab clicks to render
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const specId = btn.dataset.target.replace('tab-', '');
        const mountEl = document.getElementById('pharma-heatmap-mount-' + specId);
        if (mountEl && !mountEl.innerHTML.trim()) {
          // Render only if empty
          renderHeatmapMatrix(mountEl, specId);
        }
      });
    });
  });

})();
