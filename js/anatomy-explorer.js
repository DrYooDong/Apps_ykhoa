/**
 * Interactive Anatomy Explorer — CliniPortal
 * Bản đồ giải phẫu SVG tương tác trên trang Hub Kỹ năng Lâm sàng
 */

(function () {
  'use strict';

  function initAnatomyExplorer() {
    const container = document.getElementById('anatomy-explorer-container');
    if (!container) return;

    container.innerHTML = `
      <div style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 1.5rem; margin-bottom: 2rem; box-shadow: var(--shadow-sm);">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
          <h3 style="margin: 0; font-size: 1.15rem; font-weight: 700; color: var(--color-text); display: flex; align-items: center; gap: 0.5rem;">
            <span>🧍‍♂️</span> Interactive Anatomy Explorer (Bản Đồ Cơ Thể Tương Tác)
          </h3>
          <span style="font-size: 0.8rem; color: var(--color-text-muted);">Click vào vùng cơ thể để lọc kỹ năng</span>
        </div>

        <div style="display: flex; gap: 2rem; align-items: center; justify-content: center; flex-wrap: wrap;">
          <!-- SVG Body Map -->
          <svg viewBox="0 0 200 400" width="160" height="320" style="background: var(--color-bg); border-radius: var(--radius-md); border: 1px solid var(--color-border);">
            <!-- Head & Neck -->
            <g class="anatomy-region" data-region="head" cursor="pointer">
              <circle cx="100" cy="45" r="30" fill="rgba(2, 132, 199, 0.2)" stroke="var(--color-primary)" stroke-width="2" />
              <text x="100" y="50" font-size="10" text-anchor="middle" fill="var(--color-text)">Đầu Mặt Cổ</text>
            </g>
            <!-- Chest / Thorax -->
            <g class="anatomy-region" data-region="chest" cursor="pointer">
              <path d="M 65 85 L 135 85 L 125 180 L 75 180 Z" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" stroke-width="2" />
              <text x="100" y="135" font-size="11" font-weight="bold" text-anchor="middle" fill="var(--color-text)">Tim - Phổi</text>
            </g>
            <!-- Abdomen -->
            <g class="anatomy-region" data-region="abdomen" cursor="pointer">
              <path d="M 75 185 L 125 185 L 130 250 L 70 250 Z" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" stroke-width="2" />
              <text x="100" y="220" font-size="11" font-weight="bold" text-anchor="middle" fill="var(--color-text)">Bụng - Tiêu Hóa</text>
            </g>
            <!-- Limbs -->
            <g class="anatomy-region" data-region="limbs" cursor="pointer">
              <rect x="35" y="90" width="22" height="180" rx="10" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" stroke-width="2" />
              <rect x="143" y="90" width="22" height="180" rx="10" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" stroke-width="2" />
              <rect x="72" y="258" width="22" height="130" rx="10" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" stroke-width="2" />
              <rect x="106" y="258" width="22" height="130" rx="10" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" stroke-width="2" />
            </g>
          </svg>

          <!-- Region Details Panel -->
          <div id="anatomy-region-info" style="flex: 1; min-width: 250px; background: var(--color-bg); border-radius: var(--radius-md); padding: 1.25rem; border: 1px solid var(--color-border);">
            <h4 style="margin: 0 0 0.5rem; color: var(--color-primary);" id="region-title">👉 Chọn một vùng trên cơ thể</h4>
            <p style="font-size: 0.9rem; color: var(--color-text-muted);" id="region-desc">Rê chuột hoặc click vào các vùng giải phẫu bên cạnh để xem nhanh danh sách kỹ năng khám tương ứng.</p>
          </div>
        </div>
      </div>
    `;

    const REGION_INFO = {
      head: { title: "🧠 Đầu - Mặt - Cổ (Thần Kinh & TMH)", desc: "Gồm kỹ năng khám 12 Dây Thần Kinh Sọ, Khám Tuyến Giáp, Khám Tai Mũi Họng, và Đánh giá Đồng tử." },
      chest: { title: "🫀 Lồng Ngực (Tim Mạch & Hô Hấp)", desc: "Gồm kỹ năng Khám Tim (4 ổ van, mỏm tim), Khám Phổi (nhìn, sờ, gõ, nghe), và Đọc ECG / X-quang Ngực." },
      abdomen: { title: "🫁 Bụng & Tiêu Hóa - Thận", desc: "Gồm kỹ năng Khám Bụng (9 vùng), Tìm điểm đau ruột thừa/túi mật, Khám Gan Lách, và Đọc X-quang Bụng." },
      limbs: { title: "🦴 Cơ Xương Khớp & Mạch Máu Chi", desc: "Gồm kỹ năng Khám Cơ Xương Khớp, Đo Huyết Áp 2 chi, Bắt Mạch Ngoại Biên, và Đánh giá Phản Xạ Gân Xương." }
    };

    container.querySelectorAll('.anatomy-region').forEach(region => {
      region.addEventListener('click', function () {
        const key = this.getAttribute('data-region');
        const info = REGION_INFO[key];
        if (info) {
          document.getElementById('region-title').textContent = info.title;
          document.getElementById('region-desc').textContent = info.desc;
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', initAnatomyExplorer);
})();
