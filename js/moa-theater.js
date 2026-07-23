// ════════════════════════════════════════════════════════════════
//  CLINIPORTAL - MECHANISM OF ACTION (MOA) THEATER ENGINE
//  Đồ họa SVG Animated mô phỏng cơ chế tác dụng gắn receptor & cascade
// ════════════════════════════════════════════════════════════════

(function () {
  'use strict';

  const MOA_DATABASE = {
    beta_blocker: {
      title: 'Cơ Chế Ức Chế Thụ Thể Beta-1 Giao Cảm (Beta-Blockers)',
      steps: [
        {
          step: 1,
          name: 'Gắn Thụ Thể β1',
          desc: 'Phân tử Bisoprolol/Carvedilol cạnh tranh gắn vào thụ thể Beta-1 trên màng tế bào cơ tim, ngăn Adrenaline gắn vào.',
          svg: `
            <rect x="180" y="100" width="180" height="16" rx="8" fill="#cbd5e1"/>
            <!-- Cell membrane -->
            <path d="M 220 100 A 20 20 0 0 0 260 100" fill="none" stroke="#0284c7" stroke-width="4"/>
            <circle cx="240" cy="70" r="10" fill="#dc2626"/>
            <text x="240" y="45" font-size="10" font-weight="bold" text-anchor="middle" fill="var(--color-text)">Bisoprolol (Thuốc)</text>
            <circle cx="240" cy="70" r="18" fill="none" stroke="#dc2626" class="moa-pulse-circle"/>
          `
        },
        {
          step: 2,
          name: 'Ức Chế Adenylate Cyclase',
          desc: 'Thụ thể β1 bị chẹn → Ngăn Protein Gs hoạt hóa men Adenylate Cyclase → Giảm tổng hợp cAMP nội bào.',
          svg: `
            <rect x="180" y="100" width="180" height="16" rx="8" fill="#cbd5e1"/>
            <circle cx="240" cy="130" r="14" fill="#d97706"/>
            <text x="240" y="134" font-size="9" font-weight="bold" text-anchor="middle" fill="#fff">Giảm cAMP</text>
            <circle cx="240" cy="160" r="4" fill="#0284c7" class="moa-flow-dot"/>
          `
        },
        {
          step: 3,
          name: 'Giảm Dòng Canxi & Nhịp Tim',
          desc: 'cAMP giảm → Giảm mở kênh Canxi L-type → Giảm tốc độ khử cực nút xoang & giảm sức co bóp cơ tim (Hiệu ứng Âm tính).',
          svg: `
            <rect x="180" y="100" width="180" height="16" rx="8" fill="#cbd5e1"/>
            <path d="M 120 140 Q 240 170 360 140" fill="none" stroke="#059669" stroke-width="3" stroke-dasharray="4"/>
            <text x="240" y="165" font-size="11" font-weight="bold" text-anchor="middle" fill="#059669">⬇ Nhịp Tim & ⬇ Nhu Cầu Oxy Cơ Tim</text>
          `
        }
      ]
    },
    arni: {
      title: 'Cơ Chế Tác Dụng Kép Của ARNI (Sacubitril / Valsartan)',
      steps: [
        {
          step: 1,
          name: 'Ức Chế Neprilysin (Sacubitrilat)',
          desc: 'Sacubitrilat ức chế enzyme Neprilysin → Nồng độ Peptide Lợi niệu Natri (ANP/BNP) tăng vọt trong máu.',
          svg: `
            <circle cx="180" cy="90" r="22" fill="#7c3aed"/>
            <text x="180" y="94" font-size="10" font-weight="bold" text-anchor="middle" fill="#fff">ANP/BNP ⬆</text>
            <line x1="210" y1="90" x2="290" y2="90" stroke="#7c3aed" stroke-width="3" stroke-dasharray="3"/>
            <text x="310" y="94" font-size="10" font-weight="bold" fill="var(--color-text)">Giãn mạch & Lợi niệu</text>
          `
        },
        {
          step: 2,
          name: 'Chẹn Thụ Thể AT1 (Valsartan)',
          desc: 'Valsartan chẹn chọn lọc thụ thể AT1 của Angiotensin II → Chặn đứng co mạch, giữ muối và phì đại cơ tim.',
          svg: `
            <rect x="180" y="120" width="140" height="16" rx="8" fill="#e11d48"/>
            <text x="250" y="132" font-size="9" font-weight="bold" text-anchor="middle" fill="#fff">Chẹn AT1 Receptor</text>
            <text x="250" y="160" font-size="11" font-weight="bold" text-anchor="middle" fill="#e11d48">⬇ Tái Cấu Trúc Tim & ⬇ Xơ Hóa</text>
          `
        }
      ]
    }
  };

  function renderMoaTheater(mountEl, key = 'beta_blocker') {
    if (!mountEl) return;

    const data = MOA_DATABASE[key] || MOA_DATABASE.beta_blocker;
    let activeStepIdx = 0;

    function updateStage() {
      const s = data.steps[activeStepIdx];
      mountEl.innerHTML = `
        <div class="moa-theater-container">
          <div style="display: flex; justify-content: space-between; align-items: center; gap: 1rem; flex-wrap: wrap; margin-bottom: 0.75rem;">
            <h3 style="margin: 0; font-size: var(--text-md); font-weight: 700; color: var(--color-primary); display: flex; align-items: center; gap: 0.5rem;">
              <i class="fa-solid fa-clapperboard"></i> ${data.title}
            </h3>
            <span class="pharma-tool-badge">Bước ${s.step} / ${data.steps.length}: ${s.name}</span>
          </div>

          <div class="moa-stage-wrapper">
            <svg class="moa-svg-canvas" viewBox="0 0 480 180">
              ${s.svg}
            </svg>
            <p style="margin: 0.75rem 0 0 0; font-size: var(--text-xs); color: var(--color-text); text-align: center; max-width: 580px; line-height: 1.5;">
              <strong>${s.name}:</strong> ${s.desc}
            </p>
          </div>

          <div class="moa-stepper-bar">
            <div style="display: flex; gap: 0.4rem;">
              ${data.steps.map((st, idx) => `
                <button class="moa-step-btn ${idx === activeStepIdx ? 'active' : ''}" data-idx="${idx}">
                  Bước ${st.step}
                </button>
              `).join('')}
            </div>

            <div style="display: flex; gap: 0.4rem;">
              <button class="em-tag-btn ${key === 'beta_blocker' ? 'active' : ''}" id="moa-toggle-bb">Beta-Blockers</button>
              <button class="em-tag-btn ${key === 'arni' ? 'active' : ''}" id="moa-toggle-arni">ARNI</button>
            </div>
          </div>
        </div>
      `;

      mountEl.querySelectorAll('.moa-step-btn').forEach(btn => {
        btn.onclick = () => {
          activeStepIdx = parseInt(btn.getAttribute('data-idx'));
          updateStage();
        };
      });

      document.getElementById('moa-toggle-bb').onclick = () => renderMoaTheater(mountEl, 'beta_blocker');
      document.getElementById('moa-toggle-arni').onclick = () => renderMoaTheater(mountEl, 'arni');
    }

    updateStage();
  }

  window.MoaTheater = {
    render: renderMoaTheater
  };

  document.addEventListener('DOMContentLoaded', () => {
    const mount = document.getElementById('pharma-moa-mount');
    if (mount) renderMoaTheater(mount, 'beta_blocker');
  });
})();
