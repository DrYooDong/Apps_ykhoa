/**
 * CliniPortal 2.0 — Home View Component (SPA Dashboard)
 * Render trang chủ hệ thống với danh sách 7 phân hệ y khoa và công cụ nổi bật.
 */

export function renderHomeView(): string {
  return `
    <div class="homepage-left">
      <!-- HERO BANNER -->
      <section class="hero-banner">
        <div class="hero-content">
          <span class="hero-badge"><i class="fa-solid fa-bolt"></i> CliniPortal 2.0 SPA Engine</span>
          <h1 class="hero-title">Hệ Sinh Thái Y Khoa & Công Cụ Lâm Sàng Offline-First</h1>
          <p class="hero-desc">Tra cứu công cụ tính toán y khoa, phác đồ tiếp cận, dược lý, kỹ năng lâm sàng và bài học sinh lý bệnh tức thì không cần Internet.</p>
          <div class="hero-actions">
            <a href="#/calculators" class="btn btn-primary"><i class="fa-solid fa-calculator"></i> Bộ Công Cụ Lâm Sàng</a>
            <a href="#/approaches" class="btn btn-secondary"><i class="fa-solid fa-diagram-project"></i> Phác Đồ Tiếp Cận</a>
          </div>
        </div>
      </section>

      <!-- MODULES GRID (7 PHÂN HỆ) -->
      <section class="modules-section">
        <div class="section-header">
          <h2 class="section-title"><i class="fa-solid fa-cubes"></i> 7 Phân Hệ Tri Thức Y Khoa</h2>
        </div>
        <div class="modules-grid">
          
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

          <a href="#/pathophysiology" class="module-card">
            <div class="module-icon bg-rose"><i class="fa-solid fa-dna"></i></div>
            <div class="module-info">
              <h3>Sinh Lý & Sinh Lý Bệnh</h3>
              <p>Bài học sinh lý học trực quan, cơ chế bệnh sinh & hình ảnh minh họa.</p>
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
