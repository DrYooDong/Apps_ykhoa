/**
 * CliniPortal 2.0 — Clinical Pharmacology SPA Hub View
 * Path: src/content/pharmacology/pharmacology-view.ts
 */

import '../../../css/components/pharmacology-global.css';
import '../../../css/components/pharmacology-tools.css';
import '../../../css/components/pharmacology-heatmap.css';

export function renderPharmacologyView(): string {
  return `
    <div class="pharma-hub-page-wrapper" style="width: 100%; max-width: 1520px; margin: 0 auto; padding-bottom: 2.5rem;">
      
      <!-- BREADCRUMB -->
      <div class="breadcrumb" style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 1rem;">
        <a href="#/" style="color: inherit; text-decoration: none;">🏠 Trang chủ</a> &nbsp;/&nbsp; 
        <span style="color: var(--color-primary, #0284c7); font-weight: 600;">Dược lý Lâm sàng & Tra cứu Thuốc</span>
      </div>

      <!-- HERO BANNER -->
      <section style="background: linear-gradient(135deg, rgba(236,72,153,0.12) 0%, rgba(2,132,199,0.08) 100%), var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 1rem; padding: 2rem; margin-bottom: 1.75rem;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem;">
          <div>
            <span style="display: inline-flex; align-items: center; gap: 0.4rem; font-size: 0.75rem; font-weight: 700; color: #db2777; text-transform: uppercase; background: #fce7f3; padding: 0.2rem 0.6rem; border-radius: 0.35rem; margin-bottom: 0.5rem;">
              💊 DƯỢC THƯ LÂM SÀNG & TƯƠNG TÁC THUỐC ĐA TẦNG
            </span>
            <h1 style="font-size: 2.25rem; font-weight: 800; color: var(--color-text, #0f172a); margin: 0 0 0.5rem 0; line-height: 1.2;">
              Dược Lý Lâm Sàng & Tối Ưu Hóa Liều
            </h1>
            <p style="color: var(--color-text-muted, #64748b); max-width: 800px; font-size: 0.95rem; margin: 0; line-height: 1.5;">
              Hệ thống tra cứu tương tác thuốc (Cytochrome P450, QT kéo dài), hiệu chỉnh liều theo chức năng thận/gan, hướng dẫn sử dụng kháng sinh hợp lý và dược động học (PK/PD).
            </p>
          </div>
          <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
            <a href="#/pharmacology/tra-cuu-thuoc" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.65rem 1.2rem; background: #db2777; color: #fff; border-radius: 0.5rem; text-decoration: none; font-weight: 700;">
              <i class="fa-solid fa-magnifying-glass"></i> Tra Cứu Dược Thư
            </a>
            <a href="#/pharmacology/dose-optimizer" class="btn btn-secondary" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.65rem 1.2rem; background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text, #0f172a); border-radius: 0.5rem; text-decoration: none; font-weight: 700;">
              <i class="fa-solid fa-calculator"></i> Chỉnh Liều Vancomycin/Aminoglycoside
            </a>
          </div>
        </div>
      </section>

      <!-- SEARCH & QUICK EMERGENCY DOSING -->
      <div style="display: grid; grid-template-columns: 1fr 380px; gap: 1.5rem; margin-bottom: 2rem; align-items: start;">
        
        <div>
          <!-- Search input -->
          <div style="position: relative; margin-bottom: 1.5rem;">
            <i class="fa-solid fa-magnifying-glass" style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--color-text-muted, #64748b);"></i>
            <input type="text" id="lesson-search" placeholder="Tìm nhanh thuốc, hoạt chất, biệt dược (ví dụ: Paracetamol, Meropenem, Enoxaparin, Amiodarone)..." 
              style="width: 100%; padding: 0.8rem 1rem 0.8rem 2.75rem; border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.75rem; font-size: 0.95rem; background: var(--color-surface, #fff); color: var(--color-text, #0f172a); outline: none; box-shadow: 0 1px 3px rgba(0,0,0,0.05);" />
          </div>

          <!-- Quick Tools Grid -->
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1rem;">
            <a href="#/pharmacology/dose-optimizer" class="tool-quick-card" style="padding: 1.25rem; background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.75rem; text-decoration: none; color: inherit;">
              <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">⚡</div>
              <h4 style="margin: 0 0 0.35rem; font-size: 1rem; font-weight: 700; color: var(--color-text, #0f172a);">Chỉnh Liều Kháng Sinh AUC/MIC</h4>
              <p style="margin: 0; font-size: 0.8rem; color: var(--color-text-muted, #64748b);">Vancomycin, Aminoglycoside & Colistin theo CrCl / eGFR</p>
            </a>
            <a href="#/pharmacology/ma-tran-tuong-tac" class="tool-quick-card" style="padding: 1.25rem; background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.75rem; text-decoration: none; color: inherit;">
              <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">⚠️</div>
              <h4 style="margin: 0 0 0.35rem; font-size: 1rem; font-weight: 700; color: var(--color-text, #0f172a);">Ma Trận Tương Tác Thuốc</h4>
              <p style="margin: 0; font-size: 0.8rem; color: var(--color-text-muted, #64748b);">Cảnh báo tương tác DDI, ức chế/cảm ứng CYP450 và kéo dài khoảng QTc</p>
            </a>
            <a href="#/pharmacology/pk-simulator" class="tool-quick-card" style="padding: 1.25rem; background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.75rem; text-decoration: none; color: inherit;">
              <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">📈</div>
              <h4 style="margin: 0 0 0.35rem; font-size: 1rem; font-weight: 700; color: var(--color-text, #0f172a);">Mô Phỏng Nồng Độ Thuốc (PK/PD)</h4>
              <p style="margin: 0; font-size: 0.8rem; color: var(--color-text-muted, #64748b);">Đồ thị động học một ngăn, thời gian bán thải T1/2 và thể tích phân bố Vd</p>
            </a>
          </div>
        </div>

        <!-- Right: Emergency Dosing Calculator -->
        <section style="padding: 1.5rem; background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.75rem;">
          <h3 style="font-size: 1.1rem; font-weight: 700; color: #dc2626; margin: 0 0 0.5rem 0; display: flex; align-items: center; gap: 0.5rem;">
            🚨 Tính Nhanh Liều Cấp Cứu Theo Cân Nặng
          </h3>
          <div style="margin-bottom: 0.75rem;">
            <label style="font-size: 0.8rem; color: var(--color-text-muted, #64748b); display: block; margin-bottom: 0.25rem;">Nhập cân nặng bệnh nhân (kg):</label>
            <div style="display: flex; gap: 0.5rem;">
              <input type="number" id="em-weight-input" placeholder="VD: 55" style="width: 100%; padding: 0.5rem; border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.35rem; font-size: 0.9rem;" />
              <button type="button" id="em-calc-btn" style="padding: 0.5rem 1rem; background: #dc2626; color: #fff; border: none; border-radius: 0.35rem; font-weight: 700; cursor: pointer;">Tính</button>
            </div>
          </div>
          <div id="em-dosing-result">
            <div style="font-size: 0.8rem; color: var(--color-text-muted, #64748b);">Nhập cân nặng và bấm Tính để xem liều Adrenaline, Paracetamol và dịch truyền chống sốc.</div>
          </div>
        </section>

      </div>

    </div>
  `;
}
