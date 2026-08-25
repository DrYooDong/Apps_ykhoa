// ════════════════════════════════════════════════════════════════
//  CLINIPORTAL - CLINICAL SCENARIO SIMULATOR ENGINE
//  Mô phỏng 5 ca bệnh lâm sàng tương tác & chấm điểm tự động
// ════════════════════════════════════════════════════════════════

(function () {
  'use strict';

  const CLINICAL_SCENARIOS = [
    {
      id: 'scen_1',
      title: 'Ca Bệnh 1: Cụ Bà Rung Nhĩ, Suy Tim HFrEF & Suy Thận Cấp',
      patient: 'Bà N.T.H, 74 tuổi, tiền sử Suy tim HFrEF (EF 32%), Rung nhĩ mạn tính, ĐTĐ type 2. Vừa nhập viện vì mệt nhiều và khó thở NYHA III.',
      vitals: 'HA: 115/70 mmHg | Nhịp tim: 110 l/p (Rung nhĩ đáp ứng thất nhanh) | eGFR: 32 ml/min | K+: 4.8 mEq/L',
      currentDrugs: 'Bisoprolol 2.5mg/ngày, Furosemide 40mg/ngày, Metformin 1000mg/ngày, Warfarin 2mg/ngày.',
      question: 'Bác sĩ trực muốn kê đơn Amiodarone 200mg/ngày để kiểm soát tần số thất. Hãy đánh giá các nguy cơ tương tác thuốc & quyết định lâm sàng?',
      options: [
        {
          text: 'A. Kê Amiodarone ngay và giữ nguyên toàn bộ liều các thuốc hiện tại.',
          correct: false,
          rationale: 'Sai! Amiodarone ức chế P-glycoprotein và CYP2C9 làm nồng độ Digoxin/Warfarin tăng vọt. Đặc biệt, Metformin phải ngừng vì eGFR < 45 kèm đợt suy tim cấp.'
        },
        {
          text: 'B. Kê Amiodarone, chủ động giảm 30-50% liều Warfarin, ngưng Metformin, theo dõi INR sau 3-5 ngày.',
          correct: true,
          rationale: 'Chính xác! Amiodarone ức chế CYP2C9 làm kéo dài INR của Warfarin gây xuất huyết nặng nếu không giảm liều. Metformin cần tạm ngưng trong đợt cấp suy tim/suy thận.'
        },
        {
          text: 'C. Thay Bisoprolol bằng Verapamil để phối hợp với Amiodarone.',
          correct: false,
          rationale: 'Sai nghiêm trọng! Phối hợp Verapamil với Amiodarone ở bệnh nhân suy tim EF 32% gây ức chế co bóp cơ tim nặng và block AV cấp độ cao.'
        }
      ]
    },
    {
      id: 'scen_2',
      title: 'Ca Bệnh 2: Xử Trí Quá Liều Paracetamol Cấp Tại Cấp Cứu',
      patient: 'Nam bệnh nhân 22 tuổi, được người nhà đưa vào cấp cứu sau khi uống 20 viên Paracetamol 500mg (10g) cách đây 4 giờ do mâu thuẫn gia đình.',
      vitals: 'Tỉnh táo, đau nhẹ thượng vị, chưa có vàng da hay rối loạn đông máu.',
      currentDrugs: 'Không sử dụng thuốc mạn tính.',
      question: 'Thái độ xử trí y khoa tối ưu nhất tại thời điểm giờ thứ 4 sau khi uống là gì?',
      options: [
        {
          text: 'A. Chỉ định cho uống than hoạt đơn thuần và theo dõi men gan sau 24h.',
          correct: false,
          rationale: 'Không đủ! Than hoạt chỉ giúp giảm hấp thu nếu uống trong 1-2h đầu. Cần bắt buộc dùng thuốc giải độc NAC.'
        },
        {
          text: 'B. Khởi động ngay phác đồ thuốc giải độc N-Acetylcysteine (NAC) đường uống/truyền tĩnh mạch.',
          correct: true,
          rationale: 'Chính xác! NAC cung cấp Glutathione dự trữ để trung hòa chất độc NAPQI. Dùng NAC trong vòng 8h đầu cho hiệu quả bảo vệ tế bào gan gần như 100%.'
        },
        {
          text: 'C. Đưa đi lọc máu cấp cứu ngay lập tức.',
          correct: false,
          rationale: 'Chưa có chỉ định! Lọc máu không phải là biện pháp ưu tiên hàng đầu khi chưa thất bại với NAC.'
        }
      ]
    }
  ];

  let currentScenIdx = 0;
  let userScore = 0;

  function renderScenarioApp(mountEl) {
    if (!mountEl) return;

    const data = CLINICAL_SCENARIOS[currentScenIdx];

    mountEl.innerHTML = `
      <div class="scenario-card-container">
        <div style="display: flex; justify-content: space-between; align-items: center; gap: 1rem; flex-wrap: wrap; margin-bottom: 1.25rem;">
          <h3 style="margin: 0; font-size: var(--text-md); font-weight: 700; color: var(--color-primary);">
            <i class="fa-solid fa-user-doctor"></i> ${data.title}
          </h3>
          <span class="pharma-tool-badge">Ca Bệnh ${currentScenIdx + 1} / ${CLINICAL_SCENARIOS.length} | Điểm: ${userScore}</span>
        </div>

        <div class="patient-profile-box">
          <div style="font-size: var(--text-xs); font-weight: 800; color: var(--color-primary); text-transform: uppercase; margin-bottom: 0.4rem;">
            📋 Bệnh Án Hành Chính & Lâm Sàng
          </div>
          <p style="font-size: var(--text-xs); color: var(--color-text); margin: 0 0 0.5rem 0; line-height: 1.5;">
            ${data.patient}
          </p>
          <div style="font-size: 0.76rem; font-weight: 700; color: var(--color-text-muted);">
            🫀 Sinh hiệu & Cận lâm sàng: <span style="color: var(--color-text);">${data.vitals}</span>
          </div>
          <div style="font-size: 0.76rem; font-weight: 700; color: var(--color-text-muted); margin-top: 0.2rem;">
            💊 Thuốc đang dùng: <span style="color: var(--color-text);">${data.currentDrugs}</span>
          </div>
        </div>

        <h4 style="font-size: var(--text-xs); font-weight: 800; color: var(--color-text); margin-bottom: 0.85rem; line-height: 1.5;">
          ❓ ${data.question}
        </h4>

        <div id="scen-options-container">
          ${data.options.map((opt, idx) => `
            <button class="scenario-option-btn" data-idx="${idx}">
              ${opt.text}
            </button>
          `).join('')}
        </div>

        <div id="scen-rationale-box" style="display: none; margin-top: 1.25rem; padding: 1rem; border-radius: var(--radius-md); background: var(--color-surface-offset);">
          <!-- Rationale -->
        </div>

        <div style="margin-top: 1.25rem; display: flex; justify-content: flex-end;">
          <button id="scen-next-btn" class="passport-save-btn" style="width: auto; padding: 0.6rem 1.5rem; display: none;">
            Chuyển Ca Bệnh Tiếp Theo <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    `;

    const optionBtns = mountEl.querySelectorAll('.scenario-option-btn');
    const rationaleBox = document.getElementById('scen-rationale-box');
    const nextBtn = document.getElementById('scen-next-btn');

    optionBtns.forEach(btn => {
      btn.onclick = () => {
        const idx = parseInt(btn.getAttribute('data-idx'));
        const selected = data.options[idx];

        optionBtns.forEach(b => b.style.pointerEvents = 'none');

        if (selected.correct) {
          btn.classList.add('opt-correct');
          userScore += 10;
          rationaleBox.style.borderLeft = '4px solid var(--color-success)';
          rationaleBox.innerHTML = `<h5 style="margin:0 0 0.3rem 0; color:var(--color-success); font-weight:800;">🎉 CHÍNH XÁC!</h5><p style="margin:0; font-size:var(--text-xs); line-height:1.5;">${selected.rationale}</p>`;
        } else {
          btn.classList.add('opt-incorrect');
          rationaleBox.style.borderLeft = '4px solid var(--color-rose)';
          rationaleBox.innerHTML = `<h5 style="margin:0 0 0.3rem 0; color:var(--color-rose); font-weight:800;">❌ CHƯA CHÍNH XÁC</h5><p style="margin:0; font-size:var(--text-xs); line-height:1.5;">${selected.rationale}</p>`;
        }

        rationaleBox.style.display = 'block';
        nextBtn.style.display = 'inline-flex';
      };
    });

    nextBtn.onclick = () => {
      currentScenIdx = (currentScenIdx + 1) % CLINICAL_SCENARIOS.length;
      renderScenarioApp(mountEl);
    };
  }

  document.addEventListener('DOMContentLoaded', () => {
    const mount = document.getElementById('scenario-app-mount');
    if (mount) renderScenarioApp(mount);
  });
})();
