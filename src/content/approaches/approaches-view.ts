/**
 * CliniPortal — Clinical Approaches (Tiếp Cận Lâm Sàng) SPA View
 * Path: src/content/approaches/approaches-view.ts
 * Giao diện kinh điển đầy đủ (Classic Hero Tree SVG, Stats Banner, Tag Filters, Sticky Nav, Symptom Red Flags Widget)
 */

import '../../../css/components/module-dashboard.css';
import '../../../css/components/approach-hub.css';
import '../../../css/components/flowchart.css';
import '../../../css/components/ma-tran-trieu-chung.css';

export function renderApproachesView(): string {
  return `
    <div class="main-wrapper" id="mainContent" style="width: 100%; max-width: 1520px; margin: 0 auto; padding-bottom: 3rem;">

      <!-- BREADCRUMB -->
      <div class="breadcrumb" style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 1.25rem;">
        <a href="#/" style="color: inherit; text-decoration: none;">🏠 Trang chủ</a> &nbsp;/&nbsp; 
        <span style="color: var(--color-primary, #0284c7); font-weight: 600;">Tiếp Cận Lâm Sàng & CDSS</span>
      </div>

      <!-- HERO SECTION -->
      <section class="hero-dashboard hero-approach" aria-labelledby="hero-title" style="margin-bottom: 1.5rem;">
        <div class="tcm-hero-content">
          <div class="hero-intro">
            <h1 id="hero-title">🤒 TIẾP CẬN LÂM SÀNG</h1>
            <p>Hệ thống sơ đồ tiếp cận chẩn đoán phân biệt theo triệu chứng, hội chứng, bệnh lý và bất thường cận lâm sàng dựa trên y học chứng cứ.</p>
          </div>
          <div class="tcm-hero-decor">
            <!-- Decision Tree SVG -->
            <svg class="tree-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 15 L25 45 M50 15 L75 45 M25 45 L12 75 M25 45 L38 75 M75 45 L62 75 M75 45 L88 75"
                stroke="#ffffff" stroke-width="3" stroke-linecap="round" opacity="0.6" />
              <circle cx="50" cy="15" r="10" fill="#ffffff" stroke="#6366f1" stroke-width="3" />
              <circle cx="25" cy="45" r="8" fill="#ffffff" stroke="#6366f1" stroke-width="3" />
              <circle cx="75" cy="45" r="8" fill="#ffffff" stroke="#6366f1" stroke-width="3" />
              <circle cx="12" cy="75" r="6" fill="#ffffff" stroke="#6366f1" stroke-width="2.5" />
              <circle cx="38" cy="75" r="6" fill="#ffffff" stroke="#6366f1" stroke-width="2.5" />
              <circle cx="62" cy="75" r="6" fill="#ffffff" stroke="#6366f1" stroke-width="2.5" />
              <circle cx="88" cy="75" r="6" fill="#ffffff" stroke="#6366f1" stroke-width="2.5" />
              <circle cx="50" cy="15" r="4" fill="#6366f1" />
            </svg>
          </div>
        </div>
        <div class="hero-pattern"></div>
      </section>

      <!-- ===== APPROACH STATS BANNER ===== -->
      <div class="approach-stats-banner" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin: 0 0 1.5rem 0;">
        <div class="stat-card" style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 16px; padding: 16px 20px; display: flex; align-items: center; gap: 16px; box-shadow: var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.05));">
          <div class="stat-icon" style="font-size: 2rem; color: var(--color-primary, #0284c7); background: rgba(2, 132, 199, 0.1); width: 50px; height: 50px; border-radius: 12px; display: flex; align-items: center; justify-content: center;"><i class="fa-solid fa-book-medical"></i></div>
          <div class="stat-info">
            <span class="stat-number" id="totalApproachesCount" style="font-size: 1.4rem; font-weight: 800; color: var(--color-text, #0f172a); display: block;">42</span>
            <span class="stat-label" style="font-size: 0.8rem; color: var(--color-text-muted, #64748b); font-weight: 600;">Tổng Tiếp Cận</span>
          </div>
        </div>
        <div class="stat-card" style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 16px; padding: 16px 20px; display: flex; align-items: center; gap: 16px; box-shadow: var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.05));">
          <div class="stat-icon" style="font-size: 2rem; color: var(--color-success, #10b981); background: rgba(16, 185, 129, 0.1); width: 50px; height: 50px; border-radius: 12px; display: flex; align-items: center; justify-content: center;"><i class="fa-solid fa-circle-check"></i></div>
          <div class="stat-info">
            <span class="stat-number" id="viewedApproachesCount" style="font-size: 1.4rem; font-weight: 800; color: var(--color-text, #0f172a); display: block;">100%</span>
            <span class="stat-label" style="font-size: 0.8rem; color: var(--color-text-muted, #64748b); font-weight: 600;">Sẵn Sàng Offline</span>
          </div>
        </div>
        <div class="stat-card" style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 16px; padding: 16px 20px; display: flex; align-items: center; gap: 16px; box-shadow: var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.05));">
          <div class="stat-icon" style="font-size: 2rem; color: var(--color-warning, #f59e0b); background: rgba(245, 158, 11, 0.1); width: 50px; height: 50px; border-radius: 12px; display: flex; align-items: center; justify-content: center;"><i class="fa-solid fa-triangle-exclamation"></i></div>
          <div class="stat-info">
            <span class="stat-number" style="font-size: 1.4rem; font-weight: 800; color: var(--color-text, #0f172a); display: block;">27</span>
            <span class="stat-label" style="font-size: 0.8rem; color: var(--color-text-muted, #64748b); font-weight: 600;">Triệu Chứng Ma Trận</span>
          </div>
        </div>
      </div>

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
          <input type="text" id="lesson-search" placeholder="Tìm kiếm vấn đề lâm sàng, triệu chứng, lưu đồ..."
            aria-label="Tìm kiếm vấn đề lâm sàng">
          <button id="clear-search" class="clear-search-btn" aria-label="Xóa tìm kiếm"
            style="display: none;">&times;</button>
        </div>
        <!-- Bộ lọc Tags -->
        <div class="filter-tags-container" style="display: flex; gap: 8px; flex-wrap: wrap; margin-left: 12px;">
          <button class="tag-filter-btn active" data-tag="all">Tất cả</button>
          <button class="tag-filter-btn" data-tag="cap-cuu">#cap-cuu</button>
          <button class="tag-filter-btn" data-tag="noi-khoa">#noi-khoa</button>
          <button class="tag-filter-btn" data-tag="nhi-khoa">#nhi-khoa</button>
          <button class="tag-filter-btn" data-tag="ngoai-khoa">#ngoai-khoa</button>
          <a href="src/content/approaches/interactive-tools/body-map.html" class="tag-filter-btn" style="background: rgba(139, 92, 246, 0.15); color: #8b5cf6; border-color: #8b5cf6; font-weight: 700; text-decoration: none;" title="Mở Bản Đồ Giải Phẫu Tương Tác">
            <i class="fa-solid fa-child-reaching"></i> Bản Đồ Giải Phẫu
          </a>
          <a href="src/content/approaches/interactive-tools/case-simulator.html" class="tag-filter-btn" style="background: rgba(16, 185, 129, 0.15); color: #10b981; border-color: #10b981; font-weight: 700; text-decoration: none;" title="Mở Mô Phỏng Ca Bệnh Tương Tác">
            <i class="fa-solid fa-user-doctor"></i> Ca Bệnh Ảo
          </a>
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
                  <span class="part-icon"><i class="fa-solid fa-truck-medical"></i></span>
                  <span class="part-text">Cấp cứu - Hồi sức</span>
                </a>
              </li>
              <li>
                <a href="#part2-section" class="part-nav-item p2" data-target="part2-section">
                  <span class="part-icon"><i class="fa-solid fa-stethoscope"></i></span>
                  <span class="part-text">Triệu chứng - Hội chứng</span>
                </a>
              </li>
              <li>
                <a href="#part3-section" class="part-nav-item p3" data-target="part3-section">
                  <span class="part-icon"><i class="fa-solid fa-microscope"></i></span>
                  <span class="part-text">Cận lâm sàng</span>
                </a>
              </li>
              <li>
                <a href="#part4-section" class="part-nav-item p4" data-target="part4-section">
                  <span class="part-icon"><i class="fa-solid fa-bed-pulse"></i></span>
                  <span class="part-text">Bệnh lý</span>
                </a>
              </li>
              <li>
                <a href="#part5-section" class="part-nav-item p5" data-target="part5-section">
                  <span class="part-icon"><i class="fa-solid fa-pills"></i></span>
                  <span class="part-text">Dược lý lâm sàng</span>
                </a>
              </li>
              <li>
                <a href="#part-pediatrics-section" class="part-nav-item p-nhi" data-target="part-pediatrics-section">
                  <span class="part-icon"><i class="fa-solid fa-baby"></i></span>
                  <span class="part-text">Tiếp cận Nhi Khoa</span>
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
            <h3>Không tìm thấy vấn đề lâm sàng nào</h3>
            <p>Vui lòng thử từ khóa khác hoặc xóa bộ lọc.</p>
          </div>

          <!-- ===== TIẾP CẬN THƯỜNG DÙNG (FAVORITES) ===== -->
          <section id="favorites-section" class="favorites-section" data-favorite-type="approaches" style="display: none;">
            <div class="physio-group-container" id="favorites-container"
              style="border-left-color: var(--color-warning, #f59e0b); margin-bottom: 2rem;">
              <div class="physio-group-header collapsible-header" id="favorites-header"
                style="background: linear-gradient(90deg, var(--color-warning-hl, rgba(245,158,11,0.1)) 0%, transparent 100%); cursor: pointer; display: flex; justify-content: space-between; align-items: center; width: 100%;">
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                  <span class="physio-group-icon"
                    style="color: var(--color-warning, #f59e0b);"><i class="fa-solid fa-star"></i></span>
                  <h3 id="favorites-heading" style="margin: 0;">Tiếp cận thường dùng</h3>
                </div>
                <span class="favorites-toggle-indicator" style="font-size: 0.95rem; color: var(--color-text-muted, #64748b);"><i class="fa-solid fa-chevron-up"></i></span>
              </div>
              <div class="favorites-collapse-wrapper" id="favorites-collapse">
                <div class="favorites-collapse-inner">
                  <div class="specialty-grid infographic-grid" id="favorites-grid">
                    <!-- các tiếp cận được ghim sẽ hiển thị tại đây -->
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- PHẦN 1: CẤP CỨU - HỒI SỨC -->
          <section id="part1-section" aria-labelledby="part1-heading">
            <div class="physio-group-container">
              <div class="physio-group-header">
                <span class="physio-group-icon"><i class="fa-solid fa-truck-medical"></i></span>
                <h3 id="part1-heading">Cấp cứu - Hồi sức</h3>
              </div>
              <div class="specialty-grid infographic-grid">
                <!-- Card 1: Emergency Protocol -->
                <a href="src/content/approaches/1. hs-cc/emergency-quick-protocol.html" class="specialty-card info-card" data-tags="cap-cuu" style="border-left-color: var(--color-danger, #ef4444) !important;">
                  <div class="specialty-card-top">
                    <div class="specialty-info">
                      <h3 style="color: var(--color-danger, #ef4444) !important;"><i class="fa-solid fa-bolt-lightning" style="margin-right: 6px;"></i> Phác Đồ Cấp Cứu 60s</h3>
                    </div>
                  </div>
                </a>
                <!-- Card 2: CPR -->
                <a href="src/content/approaches/1. hs-cc/hoi-suc-co-ban-nang-cao/tc-hs-bls-alcs.html" class="specialty-card info-card" data-tags="cap-cuu">
                  <div class="specialty-card-top">
                    <div class="specialty-info">
                      <h3>Ngưng tuần hoàn (BLS/ACLS)</h3>
                    </div>
                  </div>
                </a>
                <!-- Card 3: Triage -->
                <a href="src/content/approaches/1. hs-cc/phan-loai-triage-cap-cuu.html" class="specialty-card info-card" data-tags="cap-cuu">
                  <div class="specialty-card-top">
                    <div class="specialty-info">
                      <h3>Phân loại Cấp Cứu & Triage</h3>
                    </div>
                  </div>
                </a>
                <!-- Card 4: Sốc phản vệ -->
                <a href="src/content/skills/resuscitation/kn-phanve.html" class="specialty-card info-card" data-tags="cap-cuu">
                  <div class="specialty-card-top">
                    <div class="specialty-info">
                      <h3>Xử trí Sốc Phản Vệ</h3>
                    </div>
                  </div>
                </a>
                <!-- Card 5: Cấp cứu Sản Nhi -->
                <a href="src/content/approaches/1. hs-cc/cap-cuu-san-nhi/tc-cc-san-nhi.html" class="specialty-card info-card" data-tags="cap-cuu san-khoa nhi-khoa">
                  <div class="specialty-card-top">
                    <div class="specialty-info">
                      <h3>Cấp Cứu Sản - Nhi Cơ Bản</h3>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </section>

          <!-- PHẦN 2: TRIỆU CHỨNG - HỘI CHỨNG -->
          <section id="part2-section" aria-labelledby="part2-heading">
            <div class="physio-group-container">
              <div class="physio-group-header">
                <span class="physio-group-icon"><i class="fa-solid fa-stethoscope"></i></span>
                <h3 id="part2-heading">Triệu chứng - Hội chứng</h3>
              </div>
              <div class="specialty-grid infographic-grid">
                <!-- Sốt -->
                <a href="src/content/approaches/symptoms/systemic-symptoms/fever/tc-sot.html" class="specialty-card info-card" data-tags="noi-khoa nhi-khoa">
                  <div class="specialty-card-top">
                    <div class="specialty-info">
                      <h3>Sốt & Hội Chứng Sốt</h3>
                    </div>
                  </div>
                </a>
                <!-- Đau bụng -->
                <a href="src/content/approaches/symptoms/gastro-symptoms/abdominal-pain/tc-daubung.html" class="specialty-card info-card" data-tags="ngoai-khoa noi-khoa">
                  <div class="specialty-card-top">
                    <div class="specialty-info">
                      <h3>Đau Bụng Cấp & Mạn</h3>
                    </div>
                  </div>
                </a>
                <!-- Khó thở -->
                <a href="src/content/approaches/symptoms/than-phien-ho-hap-tim-mach/tc-khotho.html" class="specialty-card info-card" data-tags="cap-cuu noi-khoa">
                  <div class="specialty-card-top">
                    <div class="specialty-info">
                      <h3>Khó Thở Cấp & Kéo Dài</h3>
                    </div>
                  </div>
                </a>
                <!-- Đau ngực -->
                <a href="src/content/approaches/symptoms/than-phien-ho-hap-tim-mach/tc-daunguc.html" class="specialty-card info-card" data-tags="cap-cuu noi-khoa">
                  <div class="specialty-card-top">
                    <div class="specialty-info">
                      <h3>Đau Ngực Cấp (Chest Pain)</h3>
                    </div>
                  </div>
                </a>
                <!-- Vàng da -->
                <a href="src/content/approaches/symptoms/systemic-symptoms/tc-vangda.html" class="specialty-card info-card" data-tags="noi-khoa ngoai-khoa">
                  <div class="specialty-card-top">
                    <div class="specialty-info">
                      <h3>Vàng Da (Jaundice)</h3>
                    </div>
                  </div>
                </a>
                <!-- Phù -->
                <a href="src/content/approaches/symptoms/systemic-symptoms/tc-phu.html" class="specialty-card info-card" data-tags="noi-khoa">
                  <div class="specialty-card-top">
                    <div class="specialty-info">
                      <h3>Phù Toàn Thân & Khu Trú</h3>
                    </div>
                  </div>
                </a>
                <!-- Ngất -->
                <a href="src/content/approaches/symptoms/than-phien-ho-hap-tim-mach/tc-ngat.html" class="specialty-card info-card" data-tags="cap-cuu noi-khoa">
                  <div class="specialty-card-top">
                    <div class="specialty-info">
                      <h3>Ngất (Syncope)</h3>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </section>

          <!-- PHẦN 3: CẬN LÂM SÀNG -->
          <section id="part3-section" aria-labelledby="part3-heading">
            <div class="physio-group-container">
              <div class="physio-group-header">
                <span class="physio-group-icon"><i class="fa-solid fa-microscope"></i></span>
                <h3 id="part3-heading">Cận lâm sàng</h3>
              </div>
              <div class="specialty-grid infographic-grid">
                <a href="src/content/approaches/paraclinical/tc-sinhhoagan.html" class="specialty-card info-card" data-tags="noi-khoa">
                  <div class="specialty-card-top">
                    <div class="specialty-info">
                      <h3>Sinh hóa Gan Mật</h3>
                    </div>
                  </div>
                </a>
                <a href="src/content/approaches/paraclinical/tc-thieumau.html" class="specialty-card info-card" data-tags="noi-khoa">
                  <div class="specialty-card-top">
                    <div class="specialty-info">
                      <h3>Thiếu Máu (Anemia)</h3>
                    </div>
                  </div>
                </a>
                <a href="src/content/approaches/paraclinical/tc-bachcau.html" class="specialty-card info-card" data-tags="noi-khoa">
                  <div class="specialty-card-top">
                    <div class="specialty-info">
                      <h3>Rối Loạn Bạch Cầu</h3>
                    </div>
                  </div>
                </a>
                <a href="src/content/approaches/paraclinical/tc-tieu-cau.html" class="specialty-card info-card" data-tags="noi-khoa">
                  <div class="specialty-card-top">
                    <div class="specialty-info">
                      <h3>Rối Loạn Tiểu Cầu</h3>
                    </div>
                  </div>
                </a>
                <a href="src/content/approaches/paraclinical/tc-monocyte.html" class="specialty-card info-card" data-tags="noi-khoa">
                  <div class="specialty-card-top">
                    <div class="specialty-info">
                      <h3>Monocyte & Tế Bào Máu Khác</h3>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </section>

          <!-- PHẦN 4: BỆNH LÝ -->
          <section id="part4-section" aria-labelledby="part4-heading">
            <div class="physio-group-container">
              <div class="physio-group-header">
                <span class="physio-group-icon"><i class="fa-solid fa-bed-pulse"></i></span>
                <h3 id="part4-heading">Bệnh lý</h3>
              </div>
              
              <div style="background: linear-gradient(135deg, rgba(2, 132, 199, 0.05) 0%, rgba(14, 165, 233, 0.05) 100%); border: 1px solid var(--color-border, #e2e8f0); border-radius: 16px; padding: 24px; text-align: center; margin-top: 16px;">
                <div style="font-size: 3rem; margin-bottom: 12px;">🗂️</div>
                <h4 style="font-size: 1.25rem; font-weight: 700; color: var(--color-text, #0f172a); margin-bottom: 8px;">Dashboard Tiếp Cận Bệnh Lý</h4>
                <p style="color: var(--color-text-muted, #64748b); font-size: 0.95rem; margin-bottom: 20px; max-width: 600px; margin-left: auto; margin-right: auto;">
                  Hệ thống quản lý, tra cứu và tự xây dựng các lưu đồ tiếp cận chẩn đoán, điều trị bệnh lý y khoa. Dữ liệu được đồng bộ hóa và hỗ trợ thiết kế flowchart trực quan.
                </p>
                <a href="src/content/approaches/pathology/benh-ly.html" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 8px; font-size: 0.95rem; font-weight: 700; padding: 10px 22px; background: var(--color-primary, #0284c7); color: #fff; border-radius: 10px; text-decoration: none;">
                  Mở Dashboard Bệnh Lý <i class="fa-solid fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </section>

          <!-- PHẦN 5: DƯỢC LÝ LÂM SÀNG -->
          <section id="part5-section" aria-labelledby="part5-heading">
            <div class="physio-group-container" style="border-left-color: #ec4899;">
              <div class="physio-group-header" style="background: linear-gradient(90deg, rgba(236, 72, 153, 0.1) 0%, transparent 100%);">
                <span class="physio-group-icon" style="color: #ec4899; border-color: rgba(236, 72, 153, 0.2);"><i class="fa-solid fa-pills"></i></span>
                <h3 id="part5-heading">Dược lý lâm sàng (Định hướng điều trị)</h3>
              </div>
              <div class="specialty-grid infographic-grid">
                <a href="src/content/approaches/pharmacology/tc-dl-timmach.html" class="specialty-card info-card" style="border-left-color: #ec4899 !important;">
                  <div class="specialty-card-top">
                    <div class="specialty-info">
                      <h3>Dược lý Tim mạch</h3>
                    </div>
                  </div>
                </a>
                <a href="src/content/approaches/pharmacology/tc-dl-hohap.html" class="specialty-card info-card" style="border-left-color: #ec4899 !important;">
                  <div class="specialty-card-top">
                    <div class="specialty-info">
                      <h3>Dược lý Hô hấp</h3>
                    </div>
                  </div>
                </a>
                <a href="src/content/approaches/pharmacology/tc-dl-tieuhoa.html" class="specialty-card info-card" style="border-left-color: #ec4899 !important;">
                  <div class="specialty-card-top">
                    <div class="specialty-info">
                      <h3>Dược lý Tiêu hóa</h3>
                    </div>
                  </div>
                </a>
                <a href="src/content/approaches/pharmacology/tc-dl-vanmach.html" class="specialty-card info-card" style="border-left-color: #ec4899 !important;">
                  <div class="specialty-card-top">
                    <div class="specialty-info">
                      <h3>Dược lý Vận mạch & Trợ tim</h3>
                    </div>
                  </div>
                </a>
                <a href="src/content/approaches/pharmacology/tc-dl-khangsinh.html" class="specialty-card info-card" style="border-left-color: #ec4899 !important;">
                  <div class="specialty-card-top">
                    <div class="specialty-info">
                      <h3>Dược lý Kháng sinh</h3>
                    </div>
                  </div>
                </a>
                <a href="src/content/approaches/pharmacology/tc-dl-ttoan-than.html" class="specialty-card info-card" style="border-left-color: #ec4899 !important;">
                  <div class="specialty-card-top">
                    <div class="specialty-info">
                      <h3>Dược lý Toan thận</h3>
                    </div>
                  </div>
                </a>
                <a href="src/content/approaches/pharmacology/tc-dl-noitiet.html" class="specialty-card info-card" style="border-left-color: #ec4899 !important;">
                  <div class="specialty-card-top">
                    <div class="specialty-info">
                      <h3>Dược lý Nội tiết & ĐTĐ</h3>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </section>

          <!-- PHẦN NHI KHOA -->
          <section id="part-pediatrics-section" aria-labelledby="part-pediatrics-heading">
            <div class="physio-group-container" style="border-left-color: #06b6d4;">
              <div class="physio-group-header" style="background: linear-gradient(90deg, rgba(6, 182, 212, 0.1) 0%, transparent 100%);">
                <span class="physio-group-icon" style="color: #06b6d4; border-color: rgba(6, 182, 212, 0.2);"><i class="fa-solid fa-baby"></i></span>
                <h3 id="part-pediatrics-heading">Tiếp cận Chuyên khoa Nhi</h3>
              </div>
              <div class="specialty-grid infographic-grid">
                <a href="src/content/approaches/specialties/pediatrics/tc-tre-sot.html" class="specialty-card info-card" data-tags="nhi-khoa" style="border-left-color: #06b6d4 !important;">
                  <div class="specialty-card-top">
                    <div class="specialty-info">
                      <h3>Tiếp Cận Trẻ Sốt</h3>
                    </div>
                  </div>
                </a>
                <a href="src/content/approaches/specialties/pediatrics/tc-tre-kho-khe.html" class="specialty-card info-card" data-tags="nhi-khoa" style="border-left-color: #06b6d4 !important;">
                  <div class="specialty-card-top">
                    <div class="specialty-info">
                      <h3>Tiếp Cận Trẻ Khò Khè</h3>
                    </div>
                  </div>
                </a>
                <a href="src/content/approaches/specialties/pediatrics/tc-tre-ho.html" class="specialty-card info-card" data-tags="nhi-khoa" style="border-left-color: #06b6d4 !important;">
                  <div class="specialty-card-top">
                    <div class="specialty-info">
                      <h3>Tiếp Cận Trẻ Ho Cấp & Kéo Dài</h3>
                    </div>
                  </div>
                </a>
                <a href="src/content/approaches/specialties/pediatrics/tc-tre-dau-bung.html" class="specialty-card info-card" data-tags="nhi-khoa" style="border-left-color: #06b6d4 !important;">
                  <div class="specialty-card-top">
                    <div class="specialty-info">
                      <h3>Tiếp Cận Trẻ Đau Bụng</h3>
                    </div>
                  </div>
                </a>
                <a href="src/content/approaches/specialties/pediatrics/tc-tre-thieu-mau.html" class="specialty-card info-card" data-tags="nhi-khoa" style="border-left-color: #06b6d4 !important;">
                  <div class="specialty-card-top">
                    <div class="specialty-info">
                      <h3>Tiếp Cận Trẻ Thiếu Máu</h3>
                    </div>
                  </div>
                </a>
                <a href="src/content/approaches/specialties/pediatrics/tc-nuoi-duong-tre-em.html" class="specialty-card info-card" data-tags="nhi-khoa" style="border-left-color: #06b6d4 !important;">
                  <div class="specialty-card-top">
                    <div class="specialty-info">
                      <h3>Nuôi Dưỡng & Dinh Dưỡng Trẻ Em</h3>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </section>

        </main>

        <!-- SIDEBAR WIDGET: MA TRẬN TRIỆU CHỨNG & RED FLAGS -->
        <aside class="layout-widget-sidebar" aria-label="Widget tiếp cận triệu chứng tương tác">
          <section class="widget-card" aria-labelledby="symptom-checker-title" style="padding: 1.25rem; background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px;">
            <div class="widget-card-title" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
              <h3 id="symptom-checker-title" style="margin: 0; font-size: 1rem; color: var(--color-text, #0f172a);"><i class="fa-solid fa-triangle-exclamation" style="color: var(--color-danger, #ef4444);"></i> Ma Trận Triệu Chứng</h3>
              <span class="clock-current-time" style="background: var(--color-danger-hl, #ffe4e6); color: var(--color-danger, #e11d48); font-size: 0.7rem; font-weight: 700; padding: 0.2rem 0.5rem; border-radius: 4px;">Red Flags</span>
            </div>
            <p style="font-size: var(--text-xs, 0.75rem); color: var(--color-text-muted, #64748b); margin-bottom: 1rem; line-height: 1.4;">
              Chọn một triệu chứng chính để tra cứu nhanh các <strong>Dấu hiệu cảnh báo đỏ (Red Flags)</strong> nguy hiểm tính mạng và hướng xử trí.
            </p>
            <div class="symptom-select-container" style="margin-bottom: 1rem;">
              <select id="symptomSelect" class="symptom-select" aria-label="Lựa chọn triệu chứng lâm sàng" style="width: 100%; padding: 0.5rem 0.75rem; font-size: 0.85rem; font-weight: 600; border-radius: 6px; border: 1px solid var(--color-border, #e2e8f0); background: var(--color-surface-offset, #f8fafc); color: var(--color-text, #0f172a);">
                <option value="sot">Triệu chứng: Sốt</option>
                <option value="daubung">Triệu chứng: Đau bụng</option>
                <option value="khotho">Triệu chứng: Khó thở</option>
                <option value="daunguc">Triệu chứng: Đau ngực</option>
                <option value="vangda">Triệu chứng: Vàng da</option>
                <option value="phu">Triệu chứng: Phù</option>
              </select>
            </div>
            <!-- Red Flags Glowing Card -->
            <div class="red-flags-container" style="margin-bottom: 1rem; padding: 0.85rem; background: rgba(239,68,68,0.08); border-left: 3px solid #ef4444; border-radius: 6px;">
              <div class="red-flags-title" style="font-size: 0.8rem; font-weight: 700; color: #dc2626; margin-bottom: 0.4rem;">
                <i class="fa-solid fa-circle-exclamation"></i> Dấu Hiệu Cảnh Báo Đỏ (Red Flags)
              </div>
              <ul class="red-flags-list" id="redFlagsList" style="margin: 0; padding-left: 1.1rem; font-size: 0.75rem; color: var(--color-text, #0f172a); line-height: 1.4;">
                <!-- Dynamic Content -->
              </ul>
            </div>
            <!-- Differential Diagnoses -->
            <div class="diff-diag-container" style="margin-bottom: 1rem; padding: 0.85rem; background: rgba(2,132,199,0.08); border-left: 3px solid #0284c7; border-radius: 6px;">
              <div class="diff-diag-title" style="font-size: 0.8rem; font-weight: 700; color: #0284c7; margin-bottom: 0.4rem;">
                <i class="fa-solid fa-list-check"></i> Chẩn Đoán Phân Biệt Chính
              </div>
              <ul class="diff-diag-list" id="diffDiagList" style="margin: 0; padding-left: 1.1rem; font-size: 0.75rem; color: var(--color-text, #0f172a); line-height: 1.4;">
                <!-- Dynamic Content -->
              </ul>
            </div>
            <!-- Next Step Action Link -->
            <a href="src/content/approaches/symptoms/systemic-symptoms/fever/tc-sot.html" class="specialty-card-action" id="symptomActionBtn" style="display: flex; justify-content: space-between; align-items: center; text-decoration: none; background: var(--color-surface-offset, #f8fafc); padding: 0.65rem 0.85rem; border-radius: 6px; border: 1px solid var(--color-border, #e2e8f0); color: var(--color-primary, #0284c7); font-size: 0.8rem; font-weight: 700;">
              <span>Mở Lưu Đồ Đầy Đủ</span>
              <i class="fa-solid fa-arrow-right"></i>
            </a>
          </section>
        </aside>
      </div><!-- end dashboard-layout -->
    </div><!-- end main-wrapper -->
  `;
}
