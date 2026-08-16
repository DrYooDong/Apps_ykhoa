/**
 * CliniPortal — Clinical Calculators (Công Cụ Lâm Sàng) SPA View
 * Path: src/content/calculators/calculators-view.ts
 * Giao diện kinh điển đầy đủ (Classic Hero Gears SVG, Sticky Sidebar 10 Phần, Live Search, Lab Values Widget)
 */

import '../../../css/components/module-dashboard.css';
import '../../../css/components/cong-cu.css';

export function renderCalculatorsView(): string {
  return `
    <div class="main-wrapper" id="mainContent" style="width: 100%; max-width: 1520px; margin: 0 auto; padding-bottom: 3rem;">

      <!-- BREADCRUMB -->
      <div class="breadcrumb" style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 1.25rem;">
        <a href="#/" style="color: inherit; text-decoration: none;">🏠 Trang chủ</a> &nbsp;/&nbsp; 
        <span style="color: var(--color-primary, #0284c7); font-weight: 600;">Công Cụ Lâm Sàng & Máy Tính Điểm</span>
      </div>

      <!-- HERO SECTION -->
      <section class="hero-dashboard hero-tools" aria-labelledby="hero-title" style="margin-bottom: 1.5rem;">
        <div class="tcm-hero-content">
          <div class="hero-intro">
            <h1 id="hero-title">🧮 CÔNG CỤ LÂM SÀNG</h1>
            <p>Hệ thống hỗ trợ quyết định lâm sàng, máy tính thang điểm và chuẩn hóa đánh giá bệnh nhân tại giường bệnh.</p>
          </div>
          <div class="tcm-hero-decor">
            <!-- Gears SVG -->
            <svg class="gears-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="40" cy="40" r="18" stroke="#ffffff" stroke-width="4" stroke-dasharray="8 4" />
              <circle cx="40" cy="40" r="8" stroke="#ffffff" stroke-width="3" />
              <circle cx="72" cy="68" r="12" stroke="#0d9488" stroke-width="3" stroke-dasharray="6 3" />
              <circle cx="72" cy="68" r="5" stroke="#0d9488" stroke-width="2" />
              <line x1="40" y1="40" x2="72" y2="68" stroke="#ffffff" stroke-width="2" stroke-linecap="round"
                stroke-dasharray="2 4" opacity="0.5" />
            </svg>
          </div>
        </div>
        <div class="hero-pattern"></div>
      </section>

      <!-- ===== TOOLBAR / CONTROL BAR ===== -->
      <div class="dashboard-controls" style="margin-bottom: 1.5rem;">
        <div class="search-box-container">
          <span class="search-icon-svg">
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"
              stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
          <input type="text" id="lesson-search" placeholder="Tìm kiếm công cụ tính toán, thang điểm lâm sàng..."
            aria-label="Tìm kiếm công cụ tính toán">
          <button id="clear-search" class="clear-search-btn" aria-label="Xóa tìm kiếm"
            style="display: none;">&times;</button>
        </div>
        <div class="view-toggle-container">
          <span class="toggle-label">Chế độ xem:</span>
          <div class="toggle-buttons">
            <button id="view-grid-btn" class="toggle-btn active" title="Dạng lưới" aria-label="Xem dạng lưới">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"
                stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </button>
            <button id="view-list-btn" class="toggle-btn" title="Dạng danh sách" aria-label="Xem dạng danh sách">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"
                stroke-linecap="round" stroke-linejoin="round">
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- ===== DASHBOARD LAYOUT ===== -->
      <div class="dashboard-layout">
        <!-- Navigation Sidebar (Sticky) -->
        <aside class="layout-nav-sidebar" aria-label="Danh mục phần học">
          <div class="nav-sidebar-sticky">
            <h4 class="nav-sidebar-title">Danh mục phần</h4>
            <ul class="part-nav-list">
              <li>
                <a href="#part1-section" class="part-nav-item p1 active" data-target="part1-section">
                  <span class="part-icon"><i class="fa-solid fa-file-lines"></i></span>
                  <span class="part-text">Phần 1: Chung</span>
                  <span class="part-count-badge">5</span>
                </a>
              </li>
              <li>
                <a href="#part2-section" class="part-nav-item p2" data-target="part2-section">
                  <span class="part-icon"><i class="fa-solid fa-virus"></i></span>
                  <span class="part-text">Phần 2: Truyền Nhiễm</span>
                  <span class="part-count-badge">4</span>
                </a>
              </li>
              <li>
                <a href="#part3-section" class="part-nav-item p3" data-target="part3-section">
                  <span class="part-icon"><i class="fa-solid fa-triangle-exclamation"></i></span>
                  <span class="part-text">Phần 3: Cấp cứu & Hồi sức</span>
                  <span class="part-count-badge">8</span>
                </a>
              </li>
              <li>
                <a href="#part4-section" class="part-nav-item p4" data-target="part4-section">
                  <span class="part-icon"><i class="fa-solid fa-lungs"></i></span>
                  <span class="part-text">Phần 4: Hô hấp & Lao</span>
                  <span class="part-count-badge">3</span>
                </a>
              </li>
              <li>
                <a href="#part5-section" class="part-nav-item p5" data-target="part5-section">
                  <span class="part-icon"><i class="fa-solid fa-apple-whole"></i></span>
                  <span class="part-text">Phần 5: Tiêu hóa & Dinh dưỡng</span>
                  <span class="part-count-badge">5</span>
                </a>
              </li>
              <li>
                <a href="#part6-section" class="part-nav-item p6" data-target="part6-section">
                  <span class="part-icon"><i class="fa-solid fa-filter"></i></span>
                  <span class="part-text">Phần 6: Thận & Điện giải</span>
                  <span class="part-count-badge">4</span>
                </a>
              </li>
              <li>
                <a href="#part7-section" class="part-nav-item p7" data-target="part7-section">
                  <span class="part-icon"><i class="fa-solid fa-heart-pulse"></i></span>
                  <span class="part-text">Phần 7: Tim mạch & Huyết khối</span>
                  <span class="part-count-badge">5</span>
                </a>
              </li>
              <li>
                <a href="#part8-section" class="part-nav-item p8" data-target="part8-section">
                  <span class="part-icon"><i class="fa-solid fa-droplet"></i></span>
                  <span class="part-text">Phần 8: Nội tiết & Chuyển hóa</span>
                  <span class="part-count-badge">2</span>
                </a>
              </li>
              <li>
                <a href="#part9-section" class="part-nav-item p9" data-target="part9-section">
                  <span class="part-icon"><i class="fa-solid fa-brain"></i></span>
                  <span class="part-text">Phần 9: Thần kinh</span>
                  <span class="part-count-badge">2</span>
                </a>
              </li>
              <li>
                <a href="#part10-section" class="part-nav-item p10" data-target="part10-section">
                  <span class="part-icon"><i class="fa-solid fa-vial"></i></span>
                  <span class="part-text">Phần 10: Huyết học</span>
                  <span class="part-count-badge">2</span>
                </a>
              </li>
            </ul>
          </div>
        </aside>

        <!-- Main Content Area -->
        <main class="layout-content-area" id="lessons-container">
          <!-- Empty Search State -->
          <div id="empty-search-state" class="empty-search-state" style="display: none;">
            <div class="empty-search-icon">🔍</div>
            <h3>Không tìm thấy công cụ lâm sàng nào</h3>
            <p>Vui lòng thử từ khóa khác hoặc xóa bộ lọc.</p>
          </div>

          <!-- ===== CÔNG CỤ THƯỜNG DÙNG (FAVORITES) ===== -->
          <section id="favorites-section" class="favorites-section" data-favorite-type="tools" style="display: none;">
            <div class="physio-group-container" id="favorites-container"
              style="border-left-color: var(--color-warning, #f59e0b); margin-bottom: 2rem;">
              <div class="physio-group-header collapsible-header" id="favorites-header"
                style="background: linear-gradient(90deg, var(--color-warning-hl, rgba(245,158,11,0.1)) 0%, transparent 100%); cursor: pointer; display: flex; justify-content: space-between; align-items: center; width: 100%;">
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                  <span class="physio-group-icon" style="color: var(--color-warning, #f59e0b);"><i class="fa-solid fa-star"></i></span>
                  <h3 id="favorites-heading" style="margin: 0;">Công cụ thường dùng</h3>
                </div>
                <span class="favorites-toggle-indicator" style="font-size: 0.95rem; color: var(--color-text-muted, #64748b);"><i class="fa-solid fa-chevron-up"></i></span>
              </div>
              <div class="favorites-collapse-wrapper" id="favorites-collapse">
                <div class="favorites-collapse-inner">
                  <div class="specialty-grid" id="favorites-grid">
                    <!-- các công cụ được ghim sẽ hiển thị tại đây -->
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- PHẦN 1: CHUNG -->
          <section id="part1-section" aria-labelledby="part1-heading">
            <div class="physio-group-container">
              <div class="physio-group-header">
                <span class="physio-group-icon"><i class="fa-solid fa-file-lines"></i></span>
                <h3 id="part1-heading">Phần 1: Chung</h3>
              </div>
              <div class="specialty-grid">
                <a href="src/content/calculators/general/benh-an-noi-khoa.html" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">📝</div>
                    <div class="specialty-info">
                      <h3>Mẫu Bệnh Án Nội Khoa</h3>
                      <p>Hướng dẫn khai thác bệnh sử, tiền sử và mẫu bệnh án nội khoa chuẩn hóa.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Mở công cụ</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="src/content/calculators/general/tracuu-ma-icd10.html" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">🔍</div>
                    <div class="specialty-info">
                      <h3>Tra Cứu Mã ICD-10 & BHYT</h3>
                      <p>Tra cứu mã ICD-10 hưởng Bảo hiểm y tế nhanh chóng, chuẩn Bộ Y Tế.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Mở công cụ</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/calculators/tinh-co-mau" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">🧮</div>
                    <div class="specialty-info">
                      <h3>Tính Toán Cỡ Mẫu NCKH</h3>
                      <p>Công cụ ước tính cỡ mẫu cho nghiên cứu mô tả, bệnh-chứng, đoàn hệ và thử nghiệm lâm sàng.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Mở công cụ</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/calculators/quy-doi-lieu" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">⚖️</div>
                    <div class="specialty-info">
                      <h3>Bộ Quy Đổi Liều Thuốc</h3>
                      <p>Quy đổi liều Corticoid, Opioid (OME), Statin, PPI, DOACs, Benzodiazepines chính xác.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Mở công cụ</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/pathophysiology/formula-vault" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">📐</div>
                    <div class="specialty-info">
                      <h3>Kho Công Thức Sinh Lý Vault</h3>
                      <p>Cơ sở dữ liệu công thức Nernst, GHK, Fick, Starling, HH, PAO2, eGFR kèm máy tính tức thì.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Mở công cụ</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
              </div>
            </div>
          </section>

          <!-- PHẦN 2: TRUYỀN NHIỄM -->
          <section id="part2-section" aria-labelledby="part2-heading">
            <div class="physio-group-container">
              <div class="physio-group-header">
                <span class="physio-group-icon"><i class="fa-solid fa-virus"></i></span>
                <h3 id="part2-heading">Phần 2: Truyền Nhiễm</h3>
              </div>
              <div class="specialty-grid">
                <a href="#/calculators/sepsis-studio" class="specialty-card" style="border: 2px solid var(--color-primary, #0284c7);">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">🦠</div>
                    <div class="specialty-info">
                      <h3>Sepsis Pro Studio</h3>
                      <p>Sàng lọc nhiễm khuẩn 6 thang điểm (NEWS2, SOFA, SIRS, qSOFA, MEDS) & Sepsis-3 1-Hour Bundle.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Mở Studio</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/calculators/chinh-lieu-khang-sinh" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">💊</div>
                    <div class="specialty-info">
                      <h3>Chỉnh Liều Kháng Sinh Theo eGFR</h3>
                      <p>Tra cứu kháng sinh đồ và chỉnh liều dựa trên CrCl Cockcroft-Gault và CKD-EPI.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Mở công cụ</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/calculators/ql-vancomycin" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">💉</div>
                    <div class="specialty-info">
                      <h3>Quản Lý Vancomycin (AUC/MIC)</h3>
                      <p>Khởi liều, theo dõi nồng độ đáy C-trough và tối ưu hóa AUC24/MIC cho MRSA.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Mở công cụ</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/calculators/microbiology-studio" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">🔬</div>
                    <div class="specialty-info">
                      <h3>Microbiology Pro Studio</h3>
                      <p>Kính hiển vi ảo, đĩa cấy, nhận diện vi khuẩn Gram âm/dương và Antibiogram S/I/R.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Mở công cụ</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
              </div>
            </div>
          </section>

          <!-- PHẦN 3: CẤP CỨU & HỒI SỨC -->
          <section id="part3-section" aria-labelledby="part3-heading">
            <div class="physio-group-container">
              <div class="physio-group-header">
                <span class="physio-group-icon"><i class="fa-solid fa-triangle-exclamation"></i></span>
                <h3 id="part3-heading">Phần 3: Cấp Cứu & Hồi Sức</h3>
              </div>
              <div class="specialty-grid">
                <a href="#/calculators/bu-dich" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">💧</div>
                    <div class="specialty-info">
                      <h3>Fluid Resuscitation Studio</h3>
                      <p>Quản lý bù dịch, tốc độ truyền và y lệnh theo 7 bệnh cảnh lâm sàng cấp cứu.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Mở công cụ</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/calculators/van-mach-tro-tim" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">⚡</div>
                    <div class="specialty-info">
                      <h3>Vasoactive & Hemodynamic Studio</h3>
                      <p>Quản lý 4 bơm tiêm điện song song, tính điểm VIS và radar phân loại thể sốc.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Mở công cụ</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/calculators/quan-ly-may-tho" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">💨</div>
                    <div class="specialty-info">
                      <h3>Ventilator Pro Studio</h3>
                      <p>Giả lập 3 kênh sóng thở động, 5 chế độ thở (VCV, PCV, PSV, SIMV, CPAP) và cai máy.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Mở công cụ</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="src/content/calculators/emergency/toxicology-studio.html" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">🧪</div>
                    <div class="specialty-info">
                      <h3>Toxicology Pro Studio</h3>
                      <p>Nhận diện Toxidrome, máy tính liều antidote đặc hiệu (NAC, Atropine, Naloxone, DigiFab...).</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Mở công cụ</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/calculators/polytrauma-mtp-studio" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">🚑</div>
                    <div class="specialty-info">
                      <h3>Polytrauma & MTP Pro Studio</h3>
                      <p>Đa chấn thương: Dự đoán TASH, ABC Score, Shock Index và truyền máu khối lượng lớn 1:1:1.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Mở công cụ</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/calculators/an-than-icu" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">💊</div>
                    <div class="specialty-info">
                      <h3>An Thần & Giảm Đau ICU</h3>
                      <p>Đánh giá RASS, CPOT, CAM-ICU & máy tính liều bơm tiêm điện an thần ICU.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Mở công cụ</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="src/content/calculators/emergency/ecg-studio.html" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">📈</div>
                    <div class="specialty-info">
                      <h3>ECG Pro Studio 12 Chuyển Đạo</h3>
                      <p>Sóng ECG 12 chuyển đạo tương tác, Calipers ảo và quiz chẩn đoán cấp cứu.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Mở công cụ</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/calculators/acls-resus-studio" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">⚡</div>
                    <div class="specialty-info">
                      <h3>ACLS Resuscitation Pro Studio</h3>
                      <p>Sốc điện khử rung, adrenaline theo chu kỳ 2 phút và kiểm soát nguyên nhân đảo ngược 5H-5T.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Mở công cụ</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
              </div>
            </div>
          </section>

          <!-- PHẦN 4: HÔ HẤP & LAO -->
          <section id="part4-section" aria-labelledby="part4-heading">
            <div class="physio-group-container">
              <div class="physio-group-header">
                <span class="physio-group-icon"><i class="fa-solid fa-lungs"></i></span>
                <h3 id="part4-heading">Phần 4: Hô Hấp & Lao</h3>
              </div>
              <div class="specialty-grid">
                <a href="#/calculators/pneumonia-studio" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">🫁</div>
                    <div class="specialty-info">
                      <h3>Viêm Phổi (CURB-65 / PSI / SMART-COP)</h3>
                      <p>Phân tầng nguy cơ viêm phổi mắc phải cộng đồng (CAP) và chỉ định nhập viện/ICU.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Mở công cụ</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="src/content/calculators/respiratory/cxr-studio.html" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">🩻</div>
                    <div class="specialty-info">
                      <h3>CXR Pro Studio & Đo Chỉ Số Tim-Ngực (CTR)</h3>
                      <p>Thước đo CTR ảo, phát hiện bóng tim to, tràn dịch màng phổi và tổn thương đông đặc.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Mở công cụ</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/calculators/pleural-effusion-studio" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">💧</div>
                    <div class="specialty-info">
                      <h3>Phân Tích Dịch Màng Phổi (Light Criteria)</h3>
                      <p>Phân biệt dịch thấm và dịch tiết, tỷ lệ Protein, LDH và chỉ định can thiệp dẫn lưu.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Mở công cụ</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
              </div>
            </div>
          </section>

          <!-- PHẦN 5: TIÊU HÓA & DINH DƯỠNG -->
          <section id="part5-section" aria-labelledby="part5-heading">
            <div class="physio-group-container">
              <div class="physio-group-header">
                <span class="physio-group-icon"><i class="fa-solid fa-apple-whole"></i></span>
                <h3 id="part5-heading">Phần 5: Tiêu Hóa & Dinh Dưỡng</h3>
              </div>
              <div class="specialty-grid">
                <a href="#/calculators/dg-xo-gan-studio" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">🫀</div>
                    <div class="specialty-info">
                      <h3>Đánh Giá Xơ Gan (Child-Pugh & MELD-Na)</h3>
                      <p>Tính điểm Child-Pugh A/B/C, MELD, MELD 3.0 và tiên lượng sống còn bệnh nhân xơ gan.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Mở công cụ</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/calculators/xuat-huyet-tieu-hoa" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">🩸</div>
                    <div class="specialty-info">
                      <h3>Xuất Huyết Tiêu Hóa (Glasgow-Blatchford / Rockall)</h3>
                      <p>Phân tầng nguy cơ cần can thiệp nội soi khẩn, truyền máu và tử vong.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Mở công cụ</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/calculators/ascites-studio" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">🧪</div>
                    <div class="specialty-info">
                      <h3>Ascites Pro Studio & Độ Lệch SAAG</h3>
                      <p>Tính SAAG, Protein dịch báng, phân loại tăng áp cửa và nhiễm trùng dịch báng (SBP).</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Mở công cụ</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/calculators/dg-dinh-duong" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">🥗</div>
                    <div class="specialty-info">
                      <h3>Đánh Giá Dinh Dưỡng Nội Viện (NRS-2002 / SGA)</h3>
                      <p>Sàng lọc nguy cơ suy dinh dưỡng và tính nhu cầu năng lượng Kcal/ngày, Protein/ngày.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Mở công cụ</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/calculators/ptnc-hcc" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">🔍</div>
                    <div class="specialty-info">
                      <h3>Phân Tầng Nguy Cơ HCC (BCLC / PAGE-B)</h3>
                      <p>Đánh giá ung thư biểu mô tế bào gan theo BCLC và phác đồ điều trị đa mô thức.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Mở công cụ</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
              </div>
            </div>
          </section>

          <!-- PHẦN 6: THẬN & ĐIỆN GIẢI -->
          <section id="part6-section" aria-labelledby="part6-heading">
            <div class="physio-group-container">
              <div class="physio-group-header">
                <span class="physio-group-icon"><i class="fa-solid fa-filter"></i></span>
                <h3 id="part6-heading">Phần 6: Thận & Điện Giải</h3>
              </div>
              <div class="specialty-grid">
                <a href="#/calculators/chuc-nang-than" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">🫘</div>
                    <div class="specialty-info">
                      <h3>Chức Năng Thận (CKD-EPI 2021 / Cockcroft-Gault)</h3>
                      <p>Tính mức lọc cầu thận eGFR, phân giai đoạn bệnh thận mạn (CKD KDIGO).</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Mở công cụ</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/calculators/khi-mau-dong-mach" class="specialty-card" style="border: 2px solid var(--color-primary, #0284c7);">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">💨</div>
                    <div class="specialty-info">
                      <h3>Khí Máu Động Mạch (ABG Pro Studio)</h3>
                      <p>Phân tích toan kiềm 6 bước, Anion Gap hiệu chỉnh Albumin, Delta-Delta và PaO2/FiO2.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Mở Studio</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/calculators/electrolyte-studio" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">⚡</div>
                    <div class="specialty-info">
                      <h3>Rối Loạn Điện Giải (Na+, K+, Ca2+)</h3>
                      <p>Hiệu chỉnh Natri theo Glucose, thiếu hụt nước tự do, bù Kali và xử trí tăng Kali máu cấp cứu.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Mở công cụ</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/calculators/danh-gia-nguyen-nhan-aki" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">🔍</div>
                    <div class="specialty-info">
                      <h3>Tổn Thương Thận Cấp (KDIGO / FENa / FEUrea)</h3>
                      <p>Phân biệt AKI trước thận vs tại thận và tiêu chuẩn chỉ định lọc máu cấp cứu.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Mở công cụ</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
              </div>
            </div>
          </section>

          <!-- PHẦN 7: TIM MẠCH & HUYẾT KHỐI -->
          <section id="part7-section" aria-labelledby="part7-heading">
            <div class="physio-group-container">
              <div class="physio-group-header">
                <span class="physio-group-icon"><i class="fa-solid fa-heart-pulse"></i></span>
                <h3 id="part7-heading">Phần 7: Tim Mạch & Huyết Khối</h3>
              </div>
              <div class="specialty-grid">
                <a href="#/calculators/ptnc-tim-mach" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">❤️</div>
                    <div class="specialty-info">
                      <h3>Phân Tầng Nguy Cơ Tim Mạch SCORE2</h3>
                      <p>Đánh giá nguy cơ biến cố tim mạch 10 năm theo ESC và chỉ định can thiệp Statin.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Mở công cụ</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/calculators/dg-ldlc" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">🎯</div>
                    <div class="specialty-info">
                      <h3>Mục Tiêu LDL-C (ESC / VNHA)</h3>
                      <p>Xác định đích LDL-C theo phân tầng nguy cơ và phác đồ hạ lipid máu bậc thang.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Mở công cụ</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/calculators/vte-toolkit" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">🩸</div>
                    <div class="specialty-info">
                      <h3>VTE Toolkit (Wells DVT, Wells PE, PESI, PERC)</h3>
                      <p>Đánh giá huyết khối tĩnh mạch sâu, thuyên tắc phổi và chỉ định D-dimer / CTPA.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Mở công cụ</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/calculators/dg-suy-tim" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">🫀</div>
                    <div class="specialty-info">
                      <h3>Đánh Giá & Phân Loại Suy Tim (HFrEF / HFpEF)</h3>
                      <p>Tiêu chuẩn Framingham, phân độ NYHA/ACC và 4 trụ cột điều trị suy tim nền tảng.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Mở công cụ</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/calculators/phan-loai-roi-loan-nhip" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">⚡</div>
                    <div class="specialty-info">
                      <h3>Arrhythmia Pro Studio</h3>
                      <p>Phân loại rối loạn nhịp nhanh/chậm, tính CHA2DS2-VASc, HAS-BLED và chỉ định kháng đông.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Mở công cụ</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
              </div>
            </div>
          </section>

          <!-- PHẦN 8: NỘI TIẾT & CHUYỂN HÓA -->
          <section id="part8-section" aria-labelledby="part8-heading">
            <div class="physio-group-container">
              <div class="physio-group-header">
                <span class="physio-group-icon"><i class="fa-solid fa-droplet"></i></span>
                <h3 id="part8-heading">Phần 8: Nội Tiết & Chuyển Hóa</h3>
              </div>
              <div class="specialty-grid">
                <a href="#/calculators/insulin-studio" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">💉</div>
                    <div class="specialty-info">
                      <h3>Diabetes & Insulin Pro Studio</h3>
                      <p>Khởi liều Basal-Bolus, chỉnh liều Sliding Scale, phác đồ toan ceton DKA và HHS.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Mở công cụ</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/pharmacology/dose-optimizer" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">⚖️</div>
                    <div class="specialty-info">
                      <h3>Tối Ưu Hóa Liều Thuốc ĐTĐ Theo Chức Năng Thận</h3>
                      <p>Chỉnh liều Metformin, SGLT2i, GLP-1 RA, DPP-4i theo từng ngưỡng eGFR cụ thể.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Mở công cụ</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
              </div>
            </div>
          </section>

          <!-- PHẦN 9: THẦN KINH -->
          <section id="part9-section" aria-labelledby="part9-heading">
            <div class="physio-group-container">
              <div class="physio-group-header">
                <span class="physio-group-icon"><i class="fa-solid fa-brain"></i></span>
                <h3 id="part9-heading">Phần 9: Thần Kinh</h3>
              </div>
              <div class="specialty-grid">
                <a href="#/calculators/dg-dot-quy" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">🧠</div>
                    <div class="specialty-info">
                      <h3>Stroke Pro Studio (NIHSS & ASPECTS)</h3>
                      <p>Đánh giá đột quỵ thiếu máu não cấp, chỉ định tiêu sợi huyết (rtPA) và lấy huyết khối cơ học.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Mở công cụ</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="src/content/skills/clinical/kham-than-kinh/kn-thankinh.html" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">⚡</div>
                    <div class="specialty-info">
                      <h3>Thang Điểm Hôn Mê GCS (Glasgow Coma Scale)</h3>
                      <p>Đánh giá ý thức 3 thành phần: Mắt (E4), Lời nói (V5), Vận động (M6) và phát hiện tụt kẹt não.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Mở công cụ</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
              </div>
            </div>
          </section>

          <!-- PHẦN 10: HUYẾT HỌC -->
          <section id="part10-section" aria-labelledby="part10-heading">
            <div class="physio-group-container">
              <div class="physio-group-header">
                <span class="physio-group-icon"><i class="fa-solid fa-vial"></i></span>
                <h3 id="part10-heading">Phần 10: Huyết Học</h3>
              </div>
              <div class="specialty-grid">
                <a href="#/calculators/phan-tang-thieu-mau" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">🩸</div>
                    <div class="specialty-info">
                      <h3>Phân Tầng Thiếu Máu (MCV, MCH, RPI, Mentzer)</h3>
                      <p>Chẩn đoán phân biệt thiếu máu hồng cầu nhỏ nhược sắc (Thalassemia vs Thiếu sắt).</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Mở công cụ</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/calculators/lab-pro-studio" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">🧪</div>
                    <div class="specialty-info">
                      <h3>Lab Pro Studio PACS</h3>
                      <p>Phân tích tổng hợp công thức máu (CBC), đông máu toàn bộ và xét nghiệm tủy đồ.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Mở công cụ</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
              </div>
            </div>
          </section>

        </main>

        <!-- SIDEBAR WIDGET: TRỊ SỐ XÉT NGHIỆM -->
        <aside class="layout-widget-sidebar" aria-label="Widget trị số cận lâm sàng tương tác">
          <section class="widget-card" aria-labelledby="lab-values-title" style="padding: 1.25rem; background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px;">
            <div class="widget-card-title" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
              <h3 id="lab-values-title" style="margin: 0; font-size: 1rem; color: var(--color-text, #0f172a);"><i class="fa-solid fa-square-poll-horizontal" style="color: #0891b2;"></i> Trị Số Xét Nghiệm</h3>
              <span class="clock-current-time" style="background: var(--color-cyan-hl, #ecfeff); color: var(--color-cyan, #0891b2); font-size: 0.7rem; font-weight: 700; padding: 0.2rem 0.5rem; border-radius: 4px;">Lab Values</span>
            </div>
            <p style="font-size: var(--text-xs, 0.75rem); color: var(--color-text-muted, #64748b); margin-bottom: 1rem; line-height: 1.4;">
              Tra cứu nhanh khoảng tham chiếu sinh lý bình thường của các chỉ số cận lâm sàng tại giường bệnh.
            </p>
            <!-- Lab Categories Tabs -->
            <div class="lab-tabs" style="display: flex; gap: 4px; margin-bottom: 0.75rem; flex-wrap: wrap;">
              <button class="lab-tab-btn active" data-tab="hemato" style="padding: 0.35rem 0.6rem; font-size: 0.75rem; font-weight: 600; border-radius: 4px; border: 1px solid var(--color-border, #e2e8f0); background: var(--color-surface-offset, #f8fafc); cursor: pointer;">Huyết học</button>
              <button class="lab-tab-btn" data-tab="biochem" style="padding: 0.35rem 0.6rem; font-size: 0.75rem; font-weight: 600; border-radius: 4px; border: 1px solid var(--color-border, #e2e8f0); background: var(--color-surface-offset, #f8fafc); cursor: pointer;">Sinh hóa</button>
              <button class="lab-tab-btn" data-tab="electro" style="padding: 0.35rem 0.6rem; font-size: 0.75rem; font-weight: 600; border-radius: 4px; border: 1px solid var(--color-border, #e2e8f0); background: var(--color-surface-offset, #f8fafc); cursor: pointer;">Điện giải</button>
              <button class="lab-tab-btn" data-tab="coag" style="padding: 0.35rem 0.6rem; font-size: 0.75rem; font-weight: 600; border-radius: 4px; border: 1px solid var(--color-border, #e2e8f0); background: var(--color-surface-offset, #f8fafc); cursor: pointer;">Đông máu</button>
            </div>
            <!-- Details Panel -->
            <div class="physio-details-card" id="labDetailsCard" style="padding: 0.85rem; background: var(--color-surface-offset, #f8fafc); border-radius: 8px; border: 1px solid var(--color-border, #e2e8f0); font-size: 0.8rem;">
              <!-- Populated dynamically by TypeScript -->
            </div>
          </section>
        </aside>
      </div><!-- end dashboard-layout -->
    </div><!-- end main-wrapper -->
  `;
}
