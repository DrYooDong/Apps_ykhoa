/**
 * CliniPortal 2.0 — Calculators & Clinical Scores SPA Hub View
 * Path: src/content/calculators/calculators-view.ts
 */

import '../../../css/components/cong-cu.css';
import '../../../css/components/abg-calculator.css';

export function renderCalculatorsView(): string {
  return `
    <div class="calculators-hub-page-wrapper" style="width: 100%; max-width: 1520px; margin: 0 auto; padding-bottom: 2.5rem;">
      
      <!-- BREADCRUMB -->
      <div class="breadcrumb" style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 1rem;">
        <a href="#/" style="color: inherit; text-decoration: none;">🏠 Trang chủ</a> &nbsp;/&nbsp; 
        <span style="color: var(--color-primary, #0284c7); font-weight: 600;">Công cụ Lâm sàng & 120+ Thang điểm</span>
      </div>

      <!-- HERO BANNER -->
      <section style="background: linear-gradient(135deg, rgba(245,158,11,0.12) 0%, rgba(2,132,199,0.08) 100%), var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 1rem; padding: 2rem; margin-bottom: 1.75rem;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem;">
          <div>
            <span style="display: inline-flex; align-items: center; gap: 0.4rem; font-size: 0.75rem; font-weight: 700; color: #d97706; text-transform: uppercase; background: #fef3c7; padding: 0.2rem 0.6rem; border-radius: 0.35rem; margin-bottom: 0.5rem;">
              ⚡ 120+ MÁY TÍNH LÂM SÀNG & THANG ĐIỂM TIÊN LƯỢNG
            </span>
            <h1 style="font-size: 2.25rem; font-weight: 800; color: var(--color-text, #0f172a); margin: 0 0 0.5rem 0; line-height: 1.2;">
              Máy Tính Chỉ Số & Thang Điểm Y Học
            </h1>
            <p style="color: var(--color-text-muted, #64748b); max-width: 800px; font-size: 0.95rem; margin: 0; line-height: 1.5;">
              Hệ thống tra cứu và tính toán nhanh chóng các chỉ số sinh lý, công thức hiệu chỉnh, phân tầng nguy cơ tim mạch, thang điểm cấp cứu và bảng giá trị xét nghiệm chuẩn.
            </p>
          </div>
          <div style="display: flex; gap: 0.75rem;">
            <div style="text-align: right; background: var(--color-surface, #fff); padding: 0.75rem 1.25rem; border-radius: 0.75rem; border: 1px solid var(--color-border, #e2e8f0);">
              <div style="font-size: 1.5rem; font-weight: 800; color: #d97706;">120+</div>
              <div style="font-size: 0.75rem; color: var(--color-text-muted, #64748b);">Công cụ đã xác thực</div>
            </div>
          </div>
        </div>
      </section>

      <!-- SEARCH BAR -->
      <div style="position: relative; max-width: 600px; margin-bottom: 1.75rem;">
        <i class="fa-solid fa-magnifying-glass" style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--color-text-muted, #64748b);"></i>
        <input type="text" id="lesson-search" placeholder="Tìm nhanh thang điểm, công thức (ví dụ: eGFR, CHA2DS2-VASc, GCS, Child-Pugh)..." 
          style="width: 100%; padding: 0.8rem 1rem 0.8rem 2.75rem; border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.75rem; font-size: 0.95rem; background: var(--color-surface, #fff); color: var(--color-text, #0f172a); outline: none; box-shadow: 0 1px 3px rgba(0,0,0,0.05);" />
        <button id="clear-search" style="display: none; position: absolute; right: 0.75rem; top: 50%; transform: translateY(-50%); background: none; border: none; font-size: 1.1rem; color: var(--color-text-muted, #64748b); cursor: pointer;">&times;</button>
      </div>

      <!-- FAVORITES SECTION -->
      <section id="favorites-section" style="display: none; margin-bottom: 2rem;">
        <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--color-warning, #f59e0b); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
          ⭐ Công Cụ Thường Dùng / Yêu Thích
        </h2>
        <div id="favorites-grid" class="specialty-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); gap: 1.25rem;"></div>
      </section>

      <!-- LAB VALUES QUICK REFERENCE WIDGET -->
      <section style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 1rem; padding: 1.5rem; margin-bottom: 2rem;">
        <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--color-text, #0f172a); margin: 0 0 0.5rem 0; display: flex; align-items: center; gap: 0.5rem;">
          🧪 Tra Cứu Nhanh Giá Trị Xét Nghiệm Tham Chiếu (Lab Values)
        </h3>
        <p style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin: 0 0 1rem 0;">
          Khoảng tham chiếu chuẩn hóa quốc tế theo độ tuổi và giới tính:
        </p>

        <!-- Lab Category Tabs -->
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem;">
          <button type="button" class="lab-tab-btn active" data-tab="hemato" style="padding: 0.4rem 0.8rem; border-radius: 0.4rem; border: 1px solid var(--color-border, #e2e8f0); background: var(--color-surface-offset, #f1f5f9); font-weight: 600; font-size: 0.8rem; cursor: pointer;">Huyết học (CBC)</button>
          <button type="button" class="lab-tab-btn" data-tab="biochem" style="padding: 0.4rem 0.8rem; border-radius: 0.4rem; border: 1px solid var(--color-border, #e2e8f0); background: var(--color-surface-offset, #f1f5f9); font-weight: 600; font-size: 0.8rem; cursor: pointer;">Sinh hóa máu</button>
          <button type="button" class="lab-tab-btn" data-tab="electrolyte" style="padding: 0.4rem 0.8rem; border-radius: 0.4rem; border: 1px solid var(--color-border, #e2e8f0); background: var(--color-surface-offset, #f1f5f9); font-weight: 600; font-size: 0.8rem; cursor: pointer;">Điện giải & Khí máu</button>
          <button type="button" class="lab-tab-btn" data-tab="coag" style="padding: 0.4rem 0.8rem; border-radius: 0.4rem; border: 1px solid var(--color-border, #e2e8f0); background: var(--color-surface-offset, #f1f5f9); font-weight: 600; font-size: 0.8rem; cursor: pointer;">Đông máu</button>
          <button type="button" class="lab-tab-btn" data-tab="cardiac" style="padding: 0.4rem 0.8rem; border-radius: 0.4rem; border: 1px solid var(--color-border, #e2e8f0); background: var(--color-surface-offset, #f1f5f9); font-weight: 600; font-size: 0.8rem; cursor: pointer;">Men tim & Viêm</button>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; align-items: start;">
          <div id="labList" style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
            <!-- Populated by initLabWidget -->
          </div>
          <div id="labDetailsCard" style="padding: 1rem; background: var(--color-surface-offset, #f8fafc); border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.5rem;">
            <div style="font-size: 0.85rem; color: var(--color-text-muted, #64748b);">Chọn một chỉ số xét nghiệm để xem khoảng tham chiếu</div>
          </div>
        </div>
      </section>

      <!-- DYNAMIC LESSONS & TOOLS CONTAINER -->
      <div id="lessons-container" style="display: flex; flex-direction: column; gap: 2rem;">
        <!-- Populated dynamically by renderAllTools -->
      </div>

      <div id="empty-search-state" style="display: none; text-align: center; padding: 4rem 1rem; color: var(--color-text-muted, #64748b);">
        <i class="fa-solid fa-calculator" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.4;"></i>
        <h3>Không tìm thấy công cụ phù hợp</h3>
        <p>Vui lòng thử từ khóa khác hoặc xóa bộ lọc tìm kiếm.</p>
      </div>

    </div>
  `;
}
