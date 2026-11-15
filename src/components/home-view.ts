/**
 * CliniPortal 2.0 — Home View Component (SPA Dashboard)
 * Render trang chủ hệ thống với danh sách 7 phân hệ y khoa và công cụ nổi bật.
 */

export function renderHomeView(): string {
  return `
    <div class="homepage-left cp-precision-spa-home">
      <!-- ASYMMETRIC EDITORIAL HERO BANNER -->
      <section class="hero-banner hub-header" style="border-top: 3px solid var(--color-primary); border-left: 1px solid var(--color-border);">
        <div class="hero-content" style="display: grid; grid-template-columns: minmax(0, 1.4fr) minmax(240px, 0.8fr); gap: 1.25rem; align-items: center;">
          <div>
            <span class="hero-badge" style="font-family: var(--font-mono); font-size: 0.72rem; letter-spacing: 0.06em; text-transform: uppercase;"><i class="fa-solid fa-bolt"></i> CliniPortal Clinical OS • Offline-First</span>
            <h1 class="hero-title" style="margin: 0.45rem 0 0.5rem;">Hệ Sinh Thái Y Khoa &amp; Công Cụ Lâm Sàng</h1>
            <p class="hero-desc" style="margin: 0 0 1rem;">Tra cứu công cụ tính toán y khoa, phác đồ tiếp cận, dược lý, kỹ năng lâm sàng và bài học sinh lý bệnh tức thì không cần Internet.</p>
            <div class="hero-actions" style="display: flex; flex-wrap: wrap; gap: 0.65rem;">
              <a href="#/calculators" class="btn btn-primary"><i class="fa-solid fa-calculator"></i> Bộ Công Cụ Lâm Sàng</a>
              <a href="#/approaches" class="btn btn-secondary"><i class="fa-solid fa-diagram-project"></i> Phác Đồ Tiếp Cận</a>
            </div>
          </div>
          <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.55rem; background: var(--color-surface-offset); padding: 0.75rem; border-radius: 12px; border: 1px solid var(--color-border);">
            <div style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 8px; padding: 0.6rem 0.7rem;">
              <div style="font-family: var(--font-mono); font-size: 0.68rem; color: var(--color-primary); font-weight: 700;">01–04</div>
              <div style="font-weight: 800; font-size: 0.85rem; color: var(--color-text);">CDSS &amp; Thuốc</div>
            </div>
            <div style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 8px; padding: 0.6rem 0.7rem;">
              <div style="font-family: var(--font-mono); font-size: 0.68rem; color: var(--color-primary); font-weight: 700;">05–08</div>
              <div style="font-weight: 800; font-size: 0.85rem; color: var(--color-text);">EBM &amp; Handbook</div>
            </div>
          </div>
        </div>
      </section>

      <!-- MODULES GRID (8 PHÂN HỆ PRECISION) -->
      <section class="modules-section">
        <div class="section-header" style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--color-border); padding-bottom: 0.6rem; margin-bottom: 1rem;">
          <h2 class="section-title" style="margin: 0;"><i class="fa-solid fa-cubes"></i> Phân Hệ Tri Thức &amp; Sổ Tay Lâm Sàng</h2>
          <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--color-text-muted);">8 MODULES</span>
        </div>
        <div class="modules-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr)); gap: 0.9rem;">

          <a href="#/clinical-handbook" class="module-card module-card--handbook cp-precision-card" style="border-top: 3px solid var(--color-primary);">
            <div class="module-icon" style="background: var(--color-primary-hl); color: var(--color-primary);"><i class="fa-solid fa-book-medical"></i></div>
            <div class="module-info">
              <div style="display: flex; align-items: center; gap: 6px;">
                <h3 style="margin: 0;">01 • Sổ Tay Lâm Sàng</h3>
                <span style="font-size: 0.65rem; font-weight: 800; background: var(--color-success-hl); color: var(--color-success); padding: 1px 6px; border-radius: 4px;">MỚI</span>
              </div>
              <p>Đúc kết kinh nghiệm thực chiến theo chuyên khoa &amp; bệnh lý: Viêm gan B, Sốt xuất huyết, cạm bẫy cận lâm sàng.</p>
            </div>
            <i class="fa-solid fa-arrow-right module-arrow" style="color: var(--color-primary);"></i>
          </a>
          
          <a href="#/calculators" class="module-card">
            <div class="module-icon bg-blue"><i class="fa-solid fa-calculator"></i></div>
            <div class="module-info">
              <h3>Công Cụ Lâm Sàng</h3>
              <p>ABG, eGFR, GCS, CHADS2-VASc, phỏng đoán liều & chỉ số y học.</p>
            </div>
            <i class="fa-solid fa-arrow-right module-arrow"></i>
          </a>

          <a href="#/pharmacology" class="module-card">
            <div class="module-icon bg-emerald"><i class="fa-solid fa-pills"></i></div>
            <div class="module-info">
              <h3>Dược Lý & Phác Đồ</h3>
              <p>Tra cứu thuốc, liều dùng chuẩn, tương tác & chống chỉ định.</p>
            </div>
            <i class="fa-solid fa-arrow-right module-arrow"></i>
          </a>

          <a href="#/basic-medical" class="module-card">
            <div class="module-icon bg-rose"><i class="fa-solid fa-dna"></i></div>
            <div class="module-info">
              <h3>Basic Medical Sciences</h3>
              <p>Giải phẫu, Sinh lý học, Cơ chế bệnh sinh, Hóa sinh & Dịch tễ học.</p>
            </div>
            <i class="fa-solid fa-arrow-right module-arrow"></i>
          </a>

          <a href="#/skills" class="module-card">
            <div class="module-icon bg-amber"><i class="fa-solid fa-user-doctor"></i></div>
            <div class="module-info">
              <h3>Kỹ Năng Lâm Sàng</h3>
              <p>Quy trình khám bệnh OSCE, Bedside Skills, đọc ECG & CXR.</p>
            </div>
            <i class="fa-solid fa-arrow-right module-arrow"></i>
          </a>

          <a href="#/approaches" class="module-card">
            <div class="module-icon bg-purple"><i class="fa-solid fa-diagram-project"></i></div>
            <div class="module-info">
              <h3>Lưu Đồ Tiếp Cận</h3>
              <p>Thuật toán chẩn đoán & phác đồ xử trí cấp cứu tương tác Vector.</p>
            </div>
            <i class="fa-solid fa-arrow-right module-arrow"></i>
          </a>

          <a href="#/ebm" class="module-card">
            <div class="module-icon bg-sky"><i class="fa-solid fa-book-bookmark"></i></div>
            <div class="module-info">
              <h3>Y Học Chứng Cứ</h3>
              <p>Tóm tắt Guidelines y khoa quốc tế & khuyến cáo điều trị mới nhất.</p>
            </div>
            <i class="fa-solid fa-arrow-right module-arrow"></i>
          </a>

          <a href="#/tcm" class="module-card">
            <div class="module-icon bg-orange"><i class="fa-solid fa-leaf"></i></div>
            <div class="module-info">
              <h3>Y Học Cổ Truyền</h3>
              <p>Lý luận YHCT, ngũ hành, kinh lạc & vị thuốc đông y.</p>
            </div>
            <i class="fa-solid fa-arrow-right module-arrow"></i>
          </a>

          <a href="#/docspace" class="module-card module-card--docspace">
            <div class="module-icon bg-indigo"><i class="fa-solid fa-id-badge"></i></div>
            <div class="module-info">
              <h3>DocSpace — Không gian Riêng</h3>
              <p>SBAR, ca trực, ca bệnh cá nhân & liên kết nhanh cross-module.</p>
            </div>
            <i class="fa-solid fa-arrow-right module-arrow"></i>
          </a>

        </div>
      </section>
    </div>
  `;
}
