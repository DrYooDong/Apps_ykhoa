/**
 * CliniPortal — Interactive ECG Studio SPA View (TypeScript)
 * Path: src/content/skills/can-lam-sang/ecg-studio-view.ts
 */

export function renderEcgStudioView(): string {
  return `
    <div class="ecg-studio-container animate-fade-in" style="max-width: 1400px; margin: 0 auto; padding: 1.5rem 1rem;">
      <!-- Breadcrumb & Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <div style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 0.25rem;">
            <a href="#/skills" style="color: var(--color-primary, #0284c7); text-decoration: none;"><i class="fa-solid fa-chevron-left"></i> Kỹ Năng Lâm Sàng</a> / Đọc ECG Tương Tác
          </div>
          <h1 style="font-size: 2rem; font-weight: 800; color: #dc2626; margin: 0; display: flex; align-items: center; gap: 0.75rem;">
            <i class="fa-solid fa-heart-pulse"></i> Interactive ECG Studio & Caliper Measurement
          </h1>
          <p style="font-size: 0.95rem; color: var(--color-text-muted, #64748b); margin: 0.25rem 0 0 0;">
            Quy trình 10 bước phân tích điện tâm đồ 12 chuyển đạo chuẩn hóa, tính nhanh tần số tim, trục điện tim, khoảng PR, QRS và hiệu chỉnh QTc (Bazett).
          </p>
        </div>
        
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <a href="#/skills" class="btn btn-outline" style="padding: 0.5rem 1rem; border-radius: 8px; border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text, #334155); text-decoration: none; font-size: 0.875rem; font-weight: 600;">
            <i class="fa-solid fa-arrow-left"></i> Skills Hub
          </a>
        </div>
      </div>

      <!-- ECG Interactive Layout -->
      <div style="display: grid; grid-template-columns: 1fr 380px; gap: 1.5rem; align-items: start;">
        
        <!-- ECG Paper SVG Simulator -->
        <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <h3 style="margin: 0; font-size: 1.15rem; font-weight: 700; color: var(--color-text, #0f172a);">
              Bản Ghi ECG Chuyển Đạo II Kéo Dài (Lead II Rhythm Strip)
            </h3>
            <span style="font-size: 0.8rem; font-weight: 600; color: #64748b; background: #f1f5f9; padding: 0.25rem 0.5rem; border-radius: 4px;">
              25 mm/s | 10 mm/mV
            </span>
          </div>

          <!-- ECG Grid SVG Canvas -->
          <div style="background: #fff5f5; border: 2px solid #fecaca; border-radius: 8px; overflow-x: auto; padding: 1rem;">
            <svg viewBox="0 0 800 240" style="width: 100%; max-width: 800px; height: auto;">
              <!-- Grid background lines -->
              <defs>
                <pattern id="ecg-small-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#fca5a5" stroke-width="0.5" opacity="0.4"/>
                </pattern>
                <pattern id="ecg-large-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <rect width="50" height="50" fill="url(#ecg-small-grid)"/>
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#ef4444" stroke-width="1" opacity="0.5"/>
                </pattern>
              </defs>
              <rect width="800" height="240" fill="url(#ecg-large-grid)"/>

              <!-- ECG Waveform Polyline (Lead II) -->
              <path d="M 0,120 L 40,120 C 45,115 50,110 55,110 C 60,110 65,115 70,120 L 90,120 L 95,125 L 105,40 L 115,160 L 120,120 L 140,120 C 150,105 170,105 180,120 L 250,120 C 255,115 260,110 265,110 C 270,110 275,115 280,120 L 300,120 L 305,125 L 315,40 L 325,160 L 330,120 L 350,120 C 360,105 380,105 390,120 L 460,120 C 465,115 470,110 475,110 C 480,110 485,115 490,120 L 510,120 L 515,125 L 525,40 L 535,160 L 540,120 L 560,120 C 570,105 590,105 600,120 L 670,120 C 675,115 680,110 685,110 C 690,110 695,115 700,120 L 720,120 L 725,125 L 735,40 L 745,160 L 750,120 L 770,120 C 780,105 800,105 800,120" 
                fill="none" stroke="#0f172a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>

          <div style="display: flex; justify-content: space-around; margin-top: 1rem; font-size: 0.825rem; color: #475569;">
            <div><strong>Sóng P:</strong> 0.08s (Khử cực nhĩ)</div>
            <div><strong>Khoảng PR:</strong> 0.16s (Dẫn truyền AV)</div>
            <div><strong>Phức bộ QRS:</strong> 0.08s (Khử cực thất)</div>
            <div><strong>Đoạn ST - Sóng T:</strong> Tái cực thất</div>
          </div>
        </div>

        <!-- 10 Steps Reading Checklist -->
        <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem;">
          <h3 style="font-size: 1.1rem; font-weight: 700; color: #0284c7; margin-bottom: 1rem;">
            <i class="fa-solid fa-list-check"></i> 10 Bước Phân Tích ECG Chuẩn
          </h3>

          <ol style="padding-left: 1.25rem; margin: 0; font-size: 0.85rem; color: #334155; line-height: 1.6; display: flex; flex-direction: column; gap: 0.35rem;">
            <li><strong>Chuẩn định (Calibration):</strong> 25 mm/s, 10 mm = 1 mV.</li>
            <li><strong>Nhịp (Rhythm):</strong> Nhịp xoang đều hay loạn nhịp?</li>
            <li><strong>Tần số tim (Rate):</strong> 300 / số ô lớn giữa 2 đỉnh R.</li>
            <li><strong>Trục điện tim (Axis):</strong> D1 và aVF (Bình thường: 0° đến +90°).</li>
            <li><strong>Sóng P:</strong> Hình dạng, biên độ &lt; 2.5mm, thời gian &lt; 0.12s.</li>
            <li><strong>Khoảng PR:</strong> 0.12 – 0.20s (3-5 ô nhỏ).</li>
            <li><strong>Phức bộ QRS:</strong> Thời gian &lt; 0.12s, biên độ, sóng Q bệnh lý.</li>
            <li><strong>Đoạn ST:</strong> Đẳng điện, chênh lên hay chênh xuống?</li>
            <li><strong>Sóng T:</strong> Dương ở hầu hết chuyển đạo (trừ aVR, V1).</li>
            <li><strong>Khoảng QTc:</strong> QTc = QT / $\sqrt{RR}$ (Bình thường: &lt; 440ms nam, &lt; 460ms nữ).</li>
          </ol>
        </div>

      </div>
    </div>
  `;
}
