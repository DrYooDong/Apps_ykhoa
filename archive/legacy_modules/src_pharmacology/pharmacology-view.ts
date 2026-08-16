/**
 * CliniPortal — Clinical Pharmacology (Dược Lý Lâm Sàng) SPA View
 * Path: src/content/pharmacology/pharmacology-view.ts
 * Giao diện kinh điển đầy đủ (Classic Hero Molecule SVG, Sticky Subspecialties, Hub Tabs, Antidotes Finder Widget)
 */

import '../../../css/components/module-dashboard.css';
import '../../../css/components/pharmacology-global.css';
import '../../../css/components/pharmacology-symptoms.css';
import '../../../css/components/pharmacology-tools.css';

export function renderPharmacologyView(): string {
  return `
    <div class="main-wrapper" id="mainContent" style="width: 100%; max-width: 1520px; margin: 0 auto; padding-bottom: 3rem;">

      <!-- BREADCRUMB -->
      <div class="breadcrumb" style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 1.25rem;">
        <a href="#/" style="color: inherit; text-decoration: none;">🏠 Trang chủ</a> &nbsp;/&nbsp; 
        <span style="color: var(--color-primary, #0284c7); font-weight: 600;">Dược Lý Lâm Sàng & Dược Trị Liệu</span>
      </div>

      <!-- HERO SECTION -->
      <section class="hero-dashboard hero-pharm" aria-labelledby="hero-title" style="margin-bottom: 1.5rem;">
        <div class="tcm-hero-content">
          <div class="hero-intro">
            <h1 id="hero-title">💊 DƯỢC LÝ LÂM SÀNG</h1>
            <p>Hệ thống hóa nguyên lý dược động học, dược lực học và tối ưu hóa liều lượng thuốc cá thể hóa. Hướng dẫn sử dụng thuốc an toàn, tra cứu tương tác lâm sàng nghiêm ngặt dựa trên bằng chứng.</p>
          </div>
          <div class="tcm-hero-decor">
            <!-- Molecule SVG -->
            <svg class="molecule-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 20 L75 35 L75 65 L50 80 L25 65 L25 35 Z M50 20 L50 5 M75 35 L90 27 M75 65 L90 73 M50 80 L50 95 M25 65 L10 73 M25 35 L10 27" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M50 30 L67 40 L67 60 L50 70 L33 60 L33 40 Z" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.6"/>
              <circle cx="50" cy="5" r="5" fill="#10b981"/>
              <circle cx="90" cy="27" r="5" fill="#ffffff"/>
              <circle cx="90" cy="73" r="5" fill="#10b981"/>
              <circle cx="50" cy="95" r="5" fill="#ffffff"/>
              <circle cx="10" cy="73" r="5" fill="#10b981"/>
              <circle cx="10" cy="27" r="5" fill="#ffffff"/>
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
          <input type="text" id="lesson-search" placeholder="Tìm kiếm dược lý, tên thuốc, cơ chế, tương tác..."
            aria-label="Tìm kiếm dược lý, thuốc">
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
            <h4 class="nav-sidebar-title">Hệ sinh thái Dược lý</h4>
            <ul class="part-nav-list" style="margin-bottom: 1.5rem;">
              <li>
                <a href="#specialty-section" class="part-nav-item p1 active" data-target="specialty-section">
                  <span class="part-icon"><i class="fa-solid fa-hospital"></i></span>
                  <span class="part-text">Theo Chuyên khoa</span>
                  <span class="part-count-badge">5</span>
                </a>
              </li>
              <li>
                <a href="#symptom-section" class="part-nav-item p2" data-target="symptom-section">
                  <span class="part-icon"><i class="fa-solid fa-stethoscope"></i></span>
                  <span class="part-text">Theo Triệu chứng</span>
                  <span class="part-count-badge">11</span>
                </a>
              </li>
              <li>
                <a href="#tools-section" class="part-nav-item p3" data-target="tools-section">
                  <span class="part-icon"><i class="fa-solid fa-chart-line"></i></span>
                  <span class="part-text">Công cụ & Mô phỏng PK</span>
                  <span class="part-count-badge">4</span>
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
            <h3>Không tìm thấy dược lý/thuốc nào</h3>
            <p>Vui lòng thử từ khóa khác hoặc xóa bộ lọc.</p>
          </div>

          <!-- ===== DƯỢC LÝ THƯỜNG DÙNG (FAVORITES) ===== -->
          <section id="favorites-section" class="favorites-section" data-favorite-type="pharma" style="display: none;">
            <div class="physio-group-container" id="favorites-container" style="border-left-color: var(--color-warning, #f59e0b); margin-bottom: 2rem;">
              <div class="physio-group-header collapsible-header" id="favorites-header" style="background: linear-gradient(90deg, var(--color-warning-hl, rgba(245,158,11,0.1)) 0%, transparent 100%); cursor: pointer; display: flex; justify-content: space-between; align-items: center; width: 100%;">
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                  <span class="physio-group-icon" style="color: var(--color-warning, #f59e0b);"><i class="fa-solid fa-star"></i></span>
                  <h3 id="favorites-heading" style="margin: 0;">Dược lý thường dùng</h3>
                </div>
                <span class="favorites-toggle-indicator" style="font-size: 0.95rem; color: var(--color-text-muted, #64748b);"><i class="fa-solid fa-chevron-up"></i></span>
              </div>
              <div class="favorites-collapse-wrapper" id="favorites-collapse">
                <div class="favorites-collapse-inner">
                  <div class="specialty-grid" id="favorites-grid">
                    <!-- các dược lý được ghim sẽ hiển thị tại đây -->
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- NHÓM 1: DƯỢC LÝ THEO CHUYÊN KHOA -->
          <div class="main-section-group" id="group-specialty">
            <h2 class="group-main-title" style="font-size: 1.2rem; font-weight: 700; color: var(--color-text, #0f172a); margin: 0 0 1rem 0; display: flex; align-items: center; gap: 0.5rem;">
              <i class="fa-solid fa-hospital" style="color: var(--color-primary, #0284c7);"></i> Dược lý theo chuyên khoa
            </h2>
            <section id="specialty-section" aria-labelledby="specialty-heading">
              <div class="physio-group-container">
                <div class="specialty-grid">
                  <!-- 1. Tim mạch -->
                  <a href="src/content/approaches/pharmacology/tc-dl-timmach.html" class="specialty-card">
                    <div class="specialty-card-top">
                      <div class="specialty-icon">🫀</div>
                      <div class="specialty-info">
                        <h3>Dược lý Tim mạch</h3>
                        <p>Kháng kết tập tiểu cầu (DAPT), DOACs, hệ RAASi, hạ lipid máu và quản lý các thuốc vận mạch trong suy tim cấp.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action">
                      <span>Tra cứu phác đồ</span>
                      <i class="fa-solid fa-chevron-right"></i>
                    </div>
                  </a>
                  <!-- 2. Hô hấp -->
                  <a href="src/content/approaches/pharmacology/tc-dl-hohap.html" class="specialty-card">
                    <div class="specialty-card-top">
                      <div class="specialty-icon">🫁</div>
                      <div class="specialty-info">
                        <h3>Dược lý Hô hấp</h3>
                        <p>Tối ưu hóa ICS/LABA/LAMA trong Hen/COPD, thuốc giãn phế quản đường tĩnh mạch, tăng áp ĐMP.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action">
                      <span>Tra cứu phác đồ</span>
                      <i class="fa-solid fa-chevron-right"></i>
                    </div>
                  </a>
                  <!-- 3. Nội tiết -->
                  <a href="src/content/approaches/pharmacology/tc-dl-noitiet.html" class="specialty-card">
                    <div class="specialty-card-top">
                      <div class="specialty-icon">🩸</div>
                      <div class="specialty-info">
                        <h3>Dược lý Nội tiết & ĐTĐ</h3>
                        <p>Phác đồ Insulin cá thể hóa tại ICU, SGLT2i, GLP-1 RA, quản lý cơn bão giáp.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action">
                      <span>Tra cứu phác đồ</span>
                      <i class="fa-solid fa-chevron-right"></i>
                    </div>
                  </a>
                  <!-- 4. Vận mạch -->
                  <a href="src/content/approaches/pharmacology/tc-dl-vanmach.html" class="specialty-card">
                    <div class="specialty-card-top">
                      <div class="specialty-icon">⚡</div>
                      <div class="specialty-info">
                        <h3>Dược lý Vận mạch</h3>
                        <p>Phác đồ Vasopressor & inotrope, thuốc vận mạch, điều chỉnh liều theo chức năng thận.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action">
                      <span>Xem danh mục thuốc</span>
                      <i class="fa-solid fa-chevron-right"></i>
                    </div>
                  </a>
                  <!-- 5. Kháng sinh -->
                  <a href="src/content/approaches/pharmacology/tc-dl-khangsinh.html" class="specialty-card">
                    <div class="specialty-card-top">
                      <div class="specialty-icon">🦠</div>
                      <div class="specialty-info">
                        <h3>Dược lý Kháng sinh</h3>
                        <p>Kháng sinh theo chuyên khoa, tối ưu hóa liều lượng thuốc, giảm nguy cơ kháng thuốc.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action">
                      <span>Tra cứu phác đồ</span>
                      <i class="fa-solid fa-chevron-right"></i>
                    </div>
                  </a>
                </div>
              </div>
            </section>
          </div>

          <!-- NHÓM 2: DƯỢC LÝ THEO TRIỆU CHỨNG -->
          <div class="main-section-group" id="group-symptoms" style="margin-top: 2rem;">
            <h2 class="group-main-title" style="font-size: 1.2rem; font-weight: 700; color: var(--color-text, #0f172a); margin: 0 0 1rem 0; display: flex; align-items: center; gap: 0.5rem;">
              <i class="fa-solid fa-stethoscope" style="color: var(--color-primary, #0284c7);"></i> Dược lý theo triệu chứng/vấn đề
            </h2>
            <section id="symptom-section" aria-labelledby="symptom-heading">
              <div class="physio-group-container">
                <div class="specialty-grid">
                  <!-- Đau ngực cấp -->
                  <a href="#/pharmacology/trieu-chung/dau-nguc" class="specialty-card">
                    <div class="specialty-card-top">
                      <div class="specialty-icon">🫀</div>
                      <div class="specialty-info">
                        <h3>Đau ngực cấp</h3>
                        <p>Tổng hợp hướng dẫn sử dụng thuốc điều trị đau ngực cấp từ các hội đồng chuyên môn.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action">
                      <span>Tiếp cận điều trị</span>
                      <i class="fa-solid fa-chevron-right"></i>
                    </div>
                  </a>
                  <!-- Ho khan -->
                  <a href="src/content/pharmacology/symptoms/dl-ho.html" class="specialty-card">
                    <div class="specialty-card-top">
                      <div class="specialty-icon">🫁</div>
                      <div class="specialty-info">
                        <h3>Ho khan / Ho có đờm</h3>
                        <p>Tổng hợp hướng dẫn điều trị ho khan/ho có đờm cấp tính từ các hội đồng chuyên môn.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action">
                      <span>Hướng dẫn kê đơn</span>
                      <i class="fa-solid fa-chevron-right"></i>
                    </div>
                  </a>
                  <!-- Khó thở cấp -->
                  <a href="#/pharmacology/trieu-chung/kho-tho" class="specialty-card">
                    <div class="specialty-card-top">
                      <div class="specialty-icon">🫁</div>
                      <div class="specialty-info">
                        <h3>Khó thở cấp</h3>
                        <p>Tổng hợp hướng dẫn điều trị khó thở cấp tính từ các hội đồng chuyên môn.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action">
                      <span>Tiếp cận điều trị</span>
                      <i class="fa-solid fa-chevron-right"></i>
                    </div>
                  </a>
                  <!-- Đau bụng cấp -->
                  <a href="src/content/pharmacology/symptoms/dl-daubungcap.html" class="specialty-card">
                    <div class="specialty-card-top">
                      <div class="specialty-icon">🍹</div>
                      <div class="specialty-info">
                        <h3>Đau bụng cấp</h3>
                        <p>Tổng hợp hướng dẫn điều trị đau bụng cấp từ các hội đồng chuyên môn.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action">
                      <span>Tiếp cận điều trị</span>
                      <i class="fa-solid fa-chevron-right"></i>
                    </div>
                  </a>
                  <!-- Nôn ói cấp -->
                  <a href="src/content/pharmacology/symptoms/dl-nonoi.html" class="specialty-card">
                    <div class="specialty-card-top">
                      <div class="specialty-icon">🤢</div>
                      <div class="specialty-info">
                        <h3>Nôn ói cấp</h3>
                        <p>Tổng hợp hướng dẫn điều trị nôn ói cấp từ các hội đồng chuyên môn.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action">
                      <span>Hướng dẫn kê đơn</span>
                      <i class="fa-solid fa-chevron-right"></i>
                    </div>
                  </a>
                  <!-- Chóng mặt -->
                  <a href="src/content/pharmacology/symptoms/dl-chongmat.html" class="specialty-card">
                    <div class="specialty-card-top">
                      <div class="specialty-icon">💫</div>
                      <div class="specialty-info">
                        <h3>Chóng mặt</h3>
                        <p>Tổng hợp hướng dẫn điều trị chóng mặt từ các hội đồng chuyên môn.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action">
                      <span>Tiếp cận điều trị</span>
                      <i class="fa-solid fa-chevron-right"></i>
                    </div>
                  </a>
                  <!-- Đau đầu -->
                  <a href="src/content/pharmacology/symptoms/dl-daudau.html" class="specialty-card">
                    <div class="specialty-card-top">
                      <div class="specialty-icon">🤕</div>
                      <div class="specialty-info">
                        <h3>Đau đầu</h3>
                        <p>Tổng hợp hướng dẫn điều trị đau đầu từ các hội đồng chuyên môn.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action">
                      <span>Tiếp cận điều trị</span>
                      <i class="fa-solid fa-chevron-right"></i>
                    </div>
                  </a>
                </div>
              </div>
            </section>
          </div>

          <!-- NHÓM 3: CÔNG CỤ & MÔ PHỎNG DƯỢC LÝ -->
          <div class="main-section-group" id="tools-section" style="margin-top: 2rem;">
            <h2 class="group-main-title" style="font-size: 1.2rem; font-weight: 700; color: var(--color-text, #0f172a); margin: 0 0 1rem 0; display: flex; align-items: center; gap: 0.5rem;">
              <i class="fa-solid fa-chart-line" style="color: var(--color-primary, #0284c7);"></i> Công cụ & Mô phỏng Dược động học
            </h2>
            <div class="physio-group-container">
              <div class="specialty-grid">
                <a href="#/pharmacology/tra-cuu-thuoc" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">🔍</div>
                    <div class="specialty-info">
                      <h3>Tra Cứu Dược Thư & Drug Passport</h3>
                      <p>Tra cứu liều dùng, dược động học, tác dụng phụ và chỉ định của các nhóm thuốc chính.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Mở Tra Cứu</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="src/content/pharmacology/tools/ma-tran-tuong-tac.html" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">⚡</div>
                    <div class="specialty-info">
                      <h3>Ma Trận Tương Tác Thuốc 2D</h3>
                      <p>Kiểm tra tương tác thuốc đôi và cảnh báo tương tác nghiêm trọng theo cơ chế CYP450/P-gp.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Mở Ma Trận</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="src/content/pharmacology/tools/dose-optimizer.html" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">⚖️</div>
                    <div class="specialty-info">
                      <h3>Dose Optimizer (Chỉnh Liều Thận)</h3>
                      <p>Tự động đề xuất hiệu chỉnh liều lượng thuốc theo ClCr (Cockcroft-Gault) và eGFR KDIGO.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Mở Công Cụ</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="src/content/pharmacology/tools/pk-simulator.html" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">📈</div>
                    <div class="specialty-info">
                      <h3>Giả Lập Dược Động Học PK Simulator</h3>
                      <p>Vẽ đường cong nồng độ-thời gian C-t, đánh giá Cmax, AUC và nồng độ đáy C-trough.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Mở Simulator</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
              </div>
            </div>
          </div>

        </main>

        <!-- SIDEBAR WIDGET: TRA CỨU ĐỘC CHẤT & ANTIDOTES FINDER -->
        <aside class="layout-widget-sidebar" aria-label="Widget độc chất tương tác">
          <section class="widget-card" aria-labelledby="antidote-finder-title" style="padding: 1.25rem; background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px;">
            <div class="widget-card-title" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
              <h3 id="antidote-finder-title" style="margin: 0; font-size: 1rem; color: var(--color-text, #0f172a);"><i class="fa-solid fa-skull-crossbones" style="color: var(--color-danger, #ef4444);"></i> Tra Cứu Độc Chất</h3>
              <span class="clock-current-time" style="background: var(--color-danger-hl, #ffe4e6); color: var(--color-danger, #e11d48); font-size: 0.7rem; font-weight: 700; padding: 0.2rem 0.5rem; border-radius: 4px;">Antidotes</span>
            </div>
            <p style="font-size: var(--text-xs, 0.75rem); color: var(--color-text-muted, #64748b); margin-bottom: 1rem; line-height: 1.4;">
              Nhấp chọn một loại độc chất để tra cứu nhanh hội chứng nhiễm độc điển hình (Toxidrome) và thuốc giải độc đặc hiệu tương ứng.
            </p>
            <!-- Antidote list buttons -->
            <div class="antidote-list" id="antidoteList" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.4rem; margin-bottom: 0.75rem;">
              <button class="antidote-item-btn active" data-toxic="para" style="padding: 0.35rem 0.5rem; font-size: 0.75rem; font-weight: 600; border-radius: 4px; border: 1px solid var(--color-border, #e2e8f0); background: var(--color-surface-offset, #f8fafc); cursor: pointer; text-align: left;">Paracetamol</button>
              <button class="antidote-item-btn" data-toxic="opioids" style="padding: 0.35rem 0.5rem; font-size: 0.75rem; font-weight: 600; border-radius: 4px; border: 1px solid var(--color-border, #e2e8f0); background: var(--color-surface-offset, #f8fafc); cursor: pointer; text-align: left;">Opioids</button>
              <button class="antidote-item-btn" data-toxic="benzo" style="padding: 0.35rem 0.5rem; font-size: 0.75rem; font-weight: 600; border-radius: 4px; border: 1px solid var(--color-border, #e2e8f0); background: var(--color-surface-offset, #f8fafc); cursor: pointer; text-align: left;">Benzodiazepine</button>
              <button class="antidote-item-btn" data-toxic="beta" style="padding: 0.35rem 0.5rem; font-size: 0.75rem; font-weight: 600; border-radius: 4px; border: 1px solid var(--color-border, #e2e8f0); background: var(--color-surface-offset, #f8fafc); cursor: pointer; text-align: left;">Beta-blockers</button>
              <button class="antidote-item-btn" data-toxic="phospho" style="padding: 0.35rem 0.5rem; font-size: 0.75rem; font-weight: 600; border-radius: 4px; border: 1px solid var(--color-border, #e2e8f0); background: var(--color-surface-offset, #f8fafc); cursor: pointer; text-align: left;">Phospho hữu cơ</button>
              <button class="antidote-item-btn" data-toxic="digoxin" style="padding: 0.35rem 0.5rem; font-size: 0.75rem; font-weight: 600; border-radius: 4px; border: 1px solid var(--color-border, #e2e8f0); background: var(--color-surface-offset, #f8fafc); cursor: pointer; text-align: left;">Digoxin</button>
              <button class="antidote-item-btn" data-toxic="co" style="padding: 0.35rem 0.5rem; font-size: 0.75rem; font-weight: 600; border-radius: 4px; border: 1px solid var(--color-border, #e2e8f0); background: var(--color-surface-offset, #f8fafc); cursor: pointer; text-align: left;">Khí CO</button>
              <button class="antidote-item-btn" data-toxic="methanol" style="padding: 0.35rem 0.5rem; font-size: 0.75rem; font-weight: 600; border-radius: 4px; border: 1px solid var(--color-border, #e2e8f0); background: var(--color-surface-offset, #f8fafc); cursor: pointer; text-align: left;">Methanol</button>
            </div>
            <!-- Details Panel -->
            <div class="physio-details-card" id="antidoteDetailsCard" style="padding: 0.85rem; background: var(--color-surface-offset, #f8fafc); border-radius: 8px; border: 1px solid var(--color-border, #e2e8f0); font-size: 0.8rem;">
              <!-- Populated dynamically by TypeScript -->
            </div>
          </section>
        </aside>
      </div><!-- end dashboard-layout -->
    </div><!-- end main-wrapper -->
  `;
}
