// ════════════════════════════════════════════════════════════════
//  CLINIPORTAL - ADVERSE DRUG REACTION (ADR) BODY MAP RADAR
//  Bản đồ cơ thể người SVG tương tác cảnh báo tác dụng phụ theo hệ cơ quan
// ════════════════════════════════════════════════════════════════

(function () {
  'use strict';

  const ADR_PROFILES = {
    amiodarone: {
      name: 'Amiodarone (Thuốc chống loạn nhịp nhóm III)',
      organs: [
        { id: 'cns', name: 'Hệ Thần Kinh', status: 'warning', text: 'Bệnh lý thần kinh ngoại biên, run tay, mất điều hòa vận động.' },
        { id: 'thyroid', name: 'Tuyến Giáp', status: 'danger', text: 'Cường giáp hoặc Suy giáp (chứa 37% i-ốt theo trọng lượng). Cần thử TSH mỗi 6 tháng.' },
        { id: 'lungs', name: 'Hệ Hô Hấp', status: 'danger', text: 'Viêm phổi kẽ / Xơ phổi cấp (Tỷ lệ 1-5%). Chụp X-quang phổi định kỳ.' },
        { id: 'liver', name: 'Hệ Tiêu Hóa & Gan', status: 'warning', text: 'Tăng men gan ALT/AST (gấp 2-3 lần), viêm gan nhiễm mỡ.' },
        { id: 'eyes', name: 'Mắt', status: 'warning', text: 'Lắng đọng vi thể ở võng mạc/giác mạc, viêm dây thần kinh thị giác.' }
      ]
    },
    nsaid: {
      name: 'NSAIDs Truyền Thống (Ibuprofen, Naproxen...)',
      organs: [
        { id: 'stomach', name: 'Dạ Dày & Tiêu Hóa', status: 'danger', text: 'Loét dạ dày tá tràng, xuất huyết tiêu hóa ồ ạt do ức chế chọn lọc COX-1.' },
        { id: 'kidney', name: 'Hệ Thận', status: 'danger', text: 'Suy thận cấp do co động mạch vào, hoại tử nhú thận, tăng huyết áp.' },
        { id: 'heart', name: 'Hệ Tim Mạch', status: 'warning', text: 'Tăng rủi ro biến cố huyết khối mạch vành & suy tim tiến triển.' }
      ]
    }
  };

  function renderBodyMap(mountEl, drugKey = 'amiodarone') {
    if (!mountEl) return;

    const data = ADR_PROFILES[drugKey] || ADR_PROFILES.amiodarone;

    mountEl.innerHTML = `
      <div class="moa-theater-container">
        <div style="display: flex; justify-content: space-between; align-items: center; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem;">
          <div>
            <h3 style="margin: 0; font-size: var(--text-md); font-weight: 700; color: var(--color-primary); display: flex; align-items: center; gap: 0.5rem;">
              <i class="fa-solid fa-person-rays"></i> Bản Đồ Cơ Thể Cảnh Báo Tác Dụng Phụ (ADR Radar)
            </h3>
            <p style="margin: 0.2rem 0 0 0; font-size: 0.78rem; color: var(--color-text-muted);">${data.name}</p>
          </div>
          <div style="display: flex; gap: 0.4rem;">
            <button class="em-tag-btn ${drugKey === 'amiodarone' ? 'active' : ''}" id="adr-btn-amio">Amiodarone</button>
            <button class="em-tag-btn ${drugKey === 'nsaid' ? 'active' : ''}" id="adr-btn-nsaid">NSAIDs</button>
          </div>
        </div>

        <div class="bodymap-container">
          <div class="bodymap-svg-box">
            <svg viewBox="0 0 160 320" style="width: 140px; height: 280px;">
              <!-- Simple Body Silhouette -->
              <circle cx="80" cy="35" r="22" fill="#cbd5e1"/>
              <path d="M 50 65 L 110 65 L 125 160 L 105 160 L 100 300 L 82 300 L 80 180 L 78 300 L 60 300 L 55 160 L 35 160 Z" fill="#cbd5e1"/>
              
              <!-- Highlights -->
              <circle cx="80" cy="35" r="12" fill="#e11d48" opacity="0.8" class="moa-pulse-circle"/>
              <circle cx="80" cy="55" r="8" fill="#d97706"/>
              <circle cx="80" cy="95" r="14" fill="#e11d48" opacity="0.8" class="moa-pulse-circle"/>
              <circle cx="80" cy="135" r="12" fill="#d97706"/>
            </svg>
          </div>

          <div class="bodymap-info-box">
            <h4 style="font-size: var(--text-xs); font-weight: 700; text-transform: uppercase; color: var(--color-text-muted); margin-bottom: 0.75rem;">
              🎯 Độc Tính & Cơ Quan Đích Ảnh Hưởng
            </h4>
            <div style="display: flex; flex-direction: column; gap: 0.6rem;">
              ${data.organs.map(o => `
                <div style="padding: 0.65rem 0.85rem; border-radius: var(--radius-md); background: ${o.status === 'danger' ? 'rgba(225,29,72,0.1)' : 'rgba(217,119,6,0.1)'}; border-left: 4px solid ${o.status === 'danger' ? '#e11d48' : '#d97706'};">
                  <div style="font-size: 0.82rem; font-weight: 800; color: ${o.status === 'danger' ? '#e11d48' : '#d97706'};">
                    ${o.name} (${o.status === 'danger' ? '🔴 Nguy Cơ Cao' : '🟡 Thận Trọng'})
                  </div>
                  <div style="font-size: 0.76rem; color: var(--color-text); margin-top: 0.2rem; line-height: 1.4;">
                    ${o.text}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;

    document.getElementById('adr-btn-amio').onclick = () => renderBodyMap(mountEl, 'amiodarone');
    document.getElementById('adr-btn-nsaid').onclick = () => renderBodyMap(mountEl, 'nsaid');
  }

  window.AdrBodyMap = {
    render: renderBodyMap
  };

  document.addEventListener('DOMContentLoaded', () => {
    const mount = document.getElementById('pharma-bodymap-mount');
    if (mount) renderBodyMap(mount, 'amiodarone');
  });
})();
