/**
 * CliniPortal — Pharmacokinetics (PK) Simulator SPA View (TypeScript)
 * Path: src/content/pharmacology/tools/pk-simulator-view.ts
 */

import { initPkSimulator } from './pk-simulator';

export function renderPkSimulatorView(): string {
  // Trigger Canvas drawing after mount
  setTimeout(() => {
    initPkSimulator();
  }, 50);

  return `
    <div class="pk-simulator-container animate-fade-in" style="max-width: 1300px; margin: 0 auto; padding: 1.5rem 1rem;">
      <!-- Breadcrumb & Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <div style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 0.25rem;">
            <a href="#/pharmacology" style="color: var(--color-primary, #0284c7); text-decoration: none;"><i class="fa-solid fa-chevron-left"></i> Dược Lý Lâm Sàng</a> / Giả Lập Dược Động Học PK
          </div>
          <h1 style="font-size: 2rem; font-weight: 800; color: #7c3aed; margin: 0; display: flex; align-items: center; gap: 0.75rem;">
            <i class="fa-solid fa-chart-line"></i> Giả Lập Đường Cong Dược Động Học (PK/PD Simulator)
          </h1>
          <p style="font-size: 0.95rem; color: var(--color-text-muted, #64748b); margin: 0.25rem 0 0 0;">
            Mô phỏng nồng độ thuốc trong huyết tương theo thời gian, trạng thái ổn định (Steady State), nồng độ đỉnh Cmax, nồng độ đáy Cmin và cửa sổ trị liệu.
          </p>
        </div>
        
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <a href="#/pharmacology" class="btn btn-outline" style="padding: 0.5rem 1rem; border-radius: 8px; border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text, #334155); text-decoration: none; font-size: 0.875rem; font-weight: 600;">
            <i class="fa-solid fa-arrow-left"></i> Hub Dược Lý
          </a>
        </div>
      </div>

      <!-- Simulator Layout -->
      <div style="display: grid; grid-template-columns: 340px 1fr; gap: 1.5rem;">
        
        <!-- Controls Panel -->
        <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem;">
          <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--color-text, #0f172a); margin-bottom: 1.25rem;">
            <i class="fa-solid fa-sliders" style="color: #7c3aed;"></i> Thông Số Dược Động Học
          </h3>

          <div style="margin-bottom: 1.25rem;">
            <div style="display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.25rem;">
              <span>Liều dùng (Dose):</span>
              <span id="val-dose" style="color: #7c3aed;">500 mg</span>
            </div>
            <input type="range" id="slider-dose" min="100" max="2000" step="50" value="500" style="width: 100%; cursor: pointer;" />
          </div>

          <div style="margin-bottom: 1.25rem;">
            <div style="display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.25rem;">
              <span>Thời gian bán thải (t1/2):</span>
              <span id="val-t12" style="color: #7c3aed;">6 giờ</span>
            </div>
            <input type="range" id="slider-t12" min="1" max="24" step="0.5" value="6" style="width: 100%; cursor: pointer;" />
          </div>

          <div style="margin-bottom: 1.25rem;">
            <div style="display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.25rem;">
              <span>Khoảng cách liều (Tau - τ):</span>
              <span id="val-tau" style="color: #7c3aed;">12 giờ</span>
            </div>
            <input type="range" id="slider-tau" min="4" max="24" step="2" value="12" style="width: 100%; cursor: pointer;" />
          </div>

          <div style="margin-bottom: 1.25rem;">
            <div style="display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.25rem;">
              <span>Thể tích phân bố (Vd):</span>
              <span id="val-vd" style="color: #7c3aed;">35 L</span>
            </div>
            <input type="range" id="slider-vd" min="10" max="100" step="5" value="35" style="width: 100%; cursor: pointer;" />
          </div>

          <div style="background: #f8fafc; border-left: 3px solid #7c3aed; padding: 0.75rem; border-radius: 0 6px 6px 0; font-size: 0.8rem; color: #334155; line-height: 1.5;">
            🎯 <strong>Cửa sổ trị liệu (Therapeutic Window):</strong><br>
            - MEC (Hiệu quả tối thiểu): 10 mcg/mL<br>
            - MTC (Độc tính tối thiểu): 30 mcg/mL
          </div>
        </div>

        <!-- Canvas Graphic -->
        <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--color-text, #0f172a); margin-bottom: 0.5rem;">
              Biểu Đồ Nồng Độ Thuốc Trong Huyết Tương (IV Bolus Đa Liều)
            </h3>
            <p style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 1rem;">
              Đường màu tím là nồng độ thuốc qua 5 chu kỳ dùng thuốc liên tiếp cho đến khi đạt trạng thái ổn định (Steady State sau 4-5 lần t1/2).
            </p>
          </div>

          <div style="background: #fafafa; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; display: flex; justify-content: center; align-items: center; padding: 1rem;">
            <canvas id="pk-canvas" width="700" height="360" style="width: 100%; max-width: 700px; height: auto;"></canvas>
          </div>

          <div style="display: flex; justify-content: space-around; font-size: 0.8rem; color: #64748b; margin-top: 0.75rem; text-align: center;">
            <div><span style="display:inline-block; width:12px; height:12px; background:#dc2626; border-radius:2px; margin-right:4px;"></span> Nồng độ độc tính (MTC)</div>
            <div><span style="display:inline-block; width:12px; height:12px; background:#16a34a; border-radius:2px; margin-right:4px;"></span> Nồng độ hiệu quả (MEC)</div>
            <div><span style="display:inline-block; width:12px; height:12px; background:#7c3aed; border-radius:2px; margin-right:4px;"></span> Nồng độ huyết tương C(t)</div>
          </div>
        </div>

      </div>
    </div>
  `;
}
