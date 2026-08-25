/**
 * CliniPortal — Pathophysiology & Disease Mechanisms (Cơ Chế Bệnh Sinh & Sinh Lý Bệnh) SPA View
 * Path: src/content/pathophysiology/co-che-benh-sinh-view.ts
 * Giao diện kinh điển đầy đủ (Classic Hero Microscope SVG, Sticky Navigation, Live Search, Đầy đủ 28+ bài ca bệnh lý CCBS)
 * Toàn bộ liên kết dẫn trực tiếp vào SPA HTML Reader: #/basic-medical/cases/:slug
 */

import '../../../styles/components/module-dashboard.css';
import '../../../styles/components/physio-content.css';
import '../../../styles/components/physio-promax-hub.css';
import '../css/physio-shared.css';

export function renderCoCheBenhSinhView(): string {
  return `
    <div class="promax-wrapper" id="mainContent">

      <!-- BREADCRUMB -->
      <div class="breadcrumb" style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 1.25rem;">
        <a href="#/" style="color: inherit; text-decoration: none;">🏠 Trang chủ</a> &nbsp;/&nbsp; 
        <a href="#/basic-medical" style="color: inherit; text-decoration: none;">Basic Medical Sciences</a> &nbsp;/&nbsp; 
        <span style="color: #059669; font-weight: 600;">Cơ Chế Bệnh Sinh & Sinh Lý Bệnh (CCBS - SBL)</span>
      </div>

      <!-- PROMAX LUXURY HERO SECTION -->
      <section class="promax-hero hero-patho-theme" aria-labelledby="hero-title">
        <div class="promax-hero-grid">
          <div>
            <div class="promax-badge-pulse">
              <span class="pulse-dot"></span>
              <span>Clinical Pathophysiology Engine • Evidence-Based Medicine</span>
            </div>
            <h1 id="hero-title" class="promax-hero-title">
              🔬 CƠ CHẾ BỆNH SINH & SINH LÝ BỆNH
            </h1>
            <p class="promax-hero-desc">
              <strong>Sinh lý bệnh = Bệnh nguyên (etiology) + Cơ chế bệnh sinh (pathogenesis) + Hậu quả chức năng.</strong> Hệ thống hóa chuỗi biến đổi bệnh sinh phân tử, rối loạn chức năng cơ quan và căn nguyên phát sinh bệnh lý qua các chuyên khoa lâm sàng. Tái hiện mối liên hệ tương hỗ giữa tổn thương cơ sở và biểu hiện triệu chứng tại giường bệnh.
            </p>

            <!-- KPI Metric Bar -->
            <div class="promax-kpi-bar">
              <div class="promax-kpi-pill">
                <i class="fa-solid fa-hospital" style="font-size: 1.1rem; color: #34d399;"></i>
                <div>
                  <div class="promax-kpi-num">16</div>
                  <div class="promax-kpi-lbl">Chuyên Khoa</div>
                </div>
              </div>
              <div class="promax-kpi-pill">
                <i class="fa-solid fa-microscope" style="font-size: 1.1rem; color: #a78bfa;"></i>
                <div>
                  <div class="promax-kpi-num">42+</div>
                  <div class="promax-kpi-lbl">Ca Bệnh Bệnh Sinh</div>
                </div>
              </div>
              <div class="promax-kpi-pill">
                <i class="fa-solid fa-code-merge" style="font-size: 1.1rem; color: #38bdf8;"></i>
                <div>
                  <div class="promax-kpi-num">Cascade</div>
                  <div class="promax-kpi-lbl">Chuỗi Suy Luận</div>
                </div>
              </div>
              <div class="promax-kpi-pill">
                <i class="fa-solid fa-certificate" style="font-size: 1.1rem; color: #fbbf24;"></i>
                <div>
                  <div class="promax-kpi-num">EBM 1A</div>
                  <div class="promax-kpi-lbl">Y Văn Quốc Tế</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Hero Vector Artwork -->
          <div class="tcm-hero-decor" style="display: flex; align-items: center; justify-content: center;">
            <svg class="dna-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 140px; height: 140px; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.2));">
              <circle cx="50" cy="50" r="38" stroke="#ffffff" stroke-width="3.5" stroke-dasharray="6 4" opacity="0.7"/>
              <path d="M35 75 L65 75 M50 75 L50 45 M40 30 L60 30 M50 20 L50 35 M45 45 L55 45" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round"/>
              <circle cx="50" cy="55" r="9" fill="#34d399" />
              <circle cx="70" cy="30" r="7" fill="#ffffff" />
            </svg>
          </div>
        </div>
      </section>

      <!-- PROMAX BENTO ACTION GRID (4 CÔNG CỤ TƯƠNG TÁC CAO CẤP) -->
      <section class="promax-bento-grid">
        <a href="#/basic-medical/quiz" class="promax-bento-card" style="--bento-color: #10b981; --bento-bg: rgba(16,185,129,0.1);">
          <div class="promax-bento-icon"><i class="fa-solid fa-brain"></i></div>
          <div>
            <span class="promax-bento-tag">Mechanism Reasoning Hub</span>
            <h4 class="promax-bento-title">Thử Thách Ca Bệnh, Flashcards & Cascade</h4>
            <p class="promax-bento-desc">18+ Ca lâm sàng cơ chế đa chuyên khoa, 24 thẻ Spaced Repetition & Lắp ráp chuỗi logic.</p>
          </div>
        </a>

        <a href="#/basic-medical/simulators" class="promax-bento-card" style="--bento-color: #0284c7; --bento-bg: rgba(2,132,199,0.1);">
          <div class="promax-bento-icon"><i class="fa-solid fa-bolt"></i></div>
          <div>
            <span class="promax-bento-tag">Real-Time Canvas</span>
            <h4 class="promax-bento-title">Mô Phỏng Sinh Lý Động</h4>
            <p class="promax-bento-desc">Nernst/GHK, Lực Starling phù, Frank-Starling & Thăng bằng toan kiềm.</p>
          </div>
        </a>

        <a href="#/basic-medical/metabolic-map" class="promax-bento-card" style="--bento-color: #8b5cf6; --bento-bg: rgba(139,92,246,0.1);">
          <div class="promax-bento-icon"><i class="fa-solid fa-diagram-project"></i></div>
          <div>
            <span class="promax-bento-tag">Metabolic Studio</span>
            <h4 class="promax-bento-title">Bản Đồ Chuyển Hóa Phân Tử</h4>
            <p class="promax-bento-desc">Tra cứu trực quan 5 chu trình năng lượng, enzyme, vitamin & bệnh di truyền.</p>
          </div>
        </a>

        <a href="#/basic-medical/formula-vault" class="promax-bento-card" style="--bento-color: #f59e0b; --bento-bg: rgba(245,158,11,0.1);">
          <div class="promax-bento-icon"><i class="fa-solid fa-calculator"></i></div>
          <div>
            <span class="promax-bento-tag">JSON Vault</span>
            <h4 class="promax-bento-title">Kho Công Thức Định Lượng</h4>
            <p class="promax-bento-desc">Cơ sở dữ liệu phương trình Nernst, Fick, Starling, GHK kèm máy tính.</p>
          </div>
        </a>

        <a href="#/ebm" class="promax-bento-card" style="--bento-color: #0284c7; --bento-bg: rgba(2,132,199,0.1);">
          <div class="promax-bento-icon"><i class="fa-solid fa-book-bookmark"></i></div>
          <div>
            <span class="promax-bento-tag">Evidence-Based Medicine</span>
            <h4 class="promax-bento-title">Kho Guidelines &amp; RCTs EBM</h4>
            <p class="promax-bento-desc">Đối chiếu 45+ khuyến cáo lâm sàng quốc tế (ESC, GOLD, GINA, ADA, SSC).</p>
          </div>
        </a>
      </section>

      <!-- PROMAX TOOLBAR & SEARCH -->
      <div class="promax-toolbar">
        <div class="promax-search-wrap">
          <i class="fa-solid fa-magnifying-glass promax-search-icon"></i>
          <input type="text" id="lesson-search" class="promax-search-input" placeholder="Tìm kiếm cơ chế bệnh sinh (Suy tim, ARDS, AKI, Sepsis, Đột quỵ, ĐTĐ, Lao, Sốt rét...)..." aria-label="Tìm kiếm cơ chế bệnh sinh">
          <span class="promax-shortcut-pill">Ctrl + K</span>
          <button id="clear-search" class="clear-search-btn" aria-label="Xóa tìm kiếm" style="display: none; position: absolute; right: 4.5rem; top: 50%; transform: translateY(-50%); background: none; border: none; font-size: 1.2rem; cursor: pointer; color: var(--color-text-muted);">&times;</button>
        </div>

        <div class="view-toggle-container" style="display: flex; align-items: center; gap: 0.5rem;">
          <span class="toggle-label" style="font-size: 0.825rem; font-weight: 600; color: var(--color-text-muted);">Hiển thị:</span>
          <div class="toggle-buttons">
            <button id="view-grid-btn" class="toggle-btn active" title="Dạng lưới" aria-label="Xem dạng lưới">
              <i class="fa-solid fa-grip"></i>
            </button>
            <button id="view-list-btn" class="toggle-btn" title="Dạng danh sách" aria-label="Xem dạng danh sách">
              <i class="fa-solid fa-list-ul"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- DASHBOARD LAYOUT -->
      <div class="dashboard-layout">
        <!-- Navigation Sidebar (Sticky) -->
        <aside class="layout-nav-sidebar" aria-label="Danh mục chuyên khoa">
          <div class="nav-sidebar-sticky" id="patho-nav">
            <div class="nav-sidebar-header">
              <div class="nav-sidebar-title-wrap">
                <i class="fa-solid fa-layer-group nav-sidebar-header-icon"></i>
                <span>Chuyên Khoa Bệnh Học</span>
              </div>
              <span class="nav-sidebar-total-badge">11 Khoa</span>
            </div>

            <ul class="part-nav-list">
              <!-- 1. Tim mạch (Collapsible) -->
              <li class="nav-item-parent">
                <div class="part-nav-item active has-subnav" data-target="patho-timmach-section">
                  <div class="part-nav-left">
                    <span class="part-icon"><i class="fa-solid fa-heart-pulse"></i></span>
                    <span class="part-text">Tim mạch</span>
                  </div>
                  <div class="part-nav-right">
                    <span class="part-count-badge">5</span>
                    <i class="fa-solid fa-chevron-down subnav-chevron"></i>
                  </div>
                </div>
                <ul class="part-sub-nav-list">
                  <li>
                    <a href="#patho-timmach-machvanh" class="part-sub-nav-item" data-target="patho-timmach-machvanh">
                      <span>Bệnh mạch vành</span>
                      <span class="sub-count-badge">2</span>
                    </a>
                  </li>
                  <li>
                    <a href="#patho-timmach-suytim-tha" class="part-sub-nav-item" data-target="patho-timmach-suytim-tha">
                      <span>Suy tim &amp; Huyết áp</span>
                      <span class="sub-count-badge">2</span>
                    </a>
                  </li>
                  <li>
                    <a href="#patho-timmach-roiloannhip" class="part-sub-nav-item" data-target="patho-timmach-roiloannhip">
                      <span>Rối loạn nhịp tim</span>
                      <span class="sub-count-badge">1</span>
                    </a>
                  </li>
                </ul>
              </li>

              <!-- 2. Hô hấp (Collapsible) -->
              <li class="nav-item-parent">
                <div class="part-nav-item has-subnav" data-target="patho-hohap-section">
                  <div class="part-nav-left">
                    <span class="part-icon"><i class="fa-solid fa-lungs"></i></span>
                    <span class="part-text">Hô hấp</span>
                  </div>
                  <div class="part-nav-right">
                    <span class="part-count-badge">5</span>
                    <i class="fa-solid fa-chevron-down subnav-chevron"></i>
                  </div>
                </div>
                <ul class="part-sub-nav-list">
                  <li>
                    <a href="#patho-hohap-suyhohap" class="part-sub-nav-item" data-target="patho-hohap-suyhohap">
                      <span>Suy hô hấp</span>
                      <span class="sub-count-badge">1</span>
                    </a>
                  </li>
                  <li>
                    <a href="#patho-hohap-tacnghen" class="part-sub-nav-item" data-target="patho-hohap-tacnghen">
                      <span>Bệnh lý tắc nghẽn</span>
                      <span class="sub-count-badge">2</span>
                    </a>
                  </li>
                  <li>
                    <a href="#patho-hohap-nhiemtrung" class="part-sub-nav-item" data-target="patho-hohap-nhiemtrung">
                      <span>Nhiễm trùng hô hấp</span>
                      <span class="sub-count-badge">2</span>
                    </a>
                  </li>
                </ul>
              </li>

              <!-- 3. Tiêu hóa (Collapsible) -->
              <li class="nav-item-parent expanded">
                <div class="part-nav-item has-subnav expanded" data-target="patho-tieuhoa-section">
                  <div class="part-nav-left">
                    <span class="part-icon"><i class="fa-solid fa-utensils"></i></span>
                    <span class="part-text">Tiêu hóa</span>
                  </div>
                  <div class="part-nav-right">
                    <span class="part-count-badge">21</span>
                    <i class="fa-solid fa-chevron-down subnav-chevron"></i>
                  </div>
                </div>
                <ul class="part-sub-nav-list">
                  <li>
                    <a href="#patho-tieuhoa-da-day" class="part-sub-nav-item" data-target="patho-tieuhoa-da-day">
                      <span>Thực quản - Dạ dày</span>
                      <span class="sub-count-badge">5</span>
                    </a>
                  </li>
                  <li>
                    <a href="#patho-tieuhoa-duong-ruot" class="part-sub-nav-item" data-target="patho-tieuhoa-duong-ruot">
                      <span>Đường ruột</span>
                      <span class="sub-count-badge">6</span>
                    </a>
                  </li>
                  <li>
                    <a href="#patho-tieuhoa-gan-mat-tuy" class="part-sub-nav-item" data-target="patho-tieuhoa-gan-mat-tuy">
                      <span>Gan - Mật - Tụy</span>
                      <span class="sub-count-badge">10</span>
                    </a>
                  </li>
                </ul>
              </li>

              <!-- 4. Thận -->
              <li class="nav-item-parent">
                <a href="#patho-than-section" class="part-nav-item" data-target="patho-than-section">
                  <div class="part-nav-left">
                    <span class="part-icon"><i class="fa-solid fa-filter"></i></span>
                    <span class="part-text">Thận</span>
                  </div>
                  <div class="part-nav-right">
                    <span class="part-count-badge">2</span>
                  </div>
                </a>
              </li>

              <!-- 5. Điện giải - Toan kiềm (Collapsible) -->
              <li class="nav-item-parent">
                <div class="part-nav-item has-subnav" data-target="patho-diengiai-section">
                  <div class="part-nav-left">
                    <span class="part-icon"><i class="fa-solid fa-bolt"></i></span>
                    <span class="part-text">Điện giải - Toan kiềm</span>
                  </div>
                  <div class="part-nav-right">
                    <span class="part-count-badge">6</span>
                    <i class="fa-solid fa-chevron-down subnav-chevron"></i>
                  </div>
                </div>
                <ul class="part-sub-nav-list">
                  <li>
                    <a href="#patho-diengiai-roi-loan" class="part-sub-nav-item" data-target="patho-diengiai-roi-loan">
                      <span>Rối loạn điện giải</span>
                      <span class="sub-count-badge">5</span>
                    </a>
                  </li>
                  <li>
                    <a href="#patho-diengiai-toankiem" class="part-sub-nav-item" data-target="patho-diengiai-toankiem">
                      <span>Thăng bằng toan kiềm</span>
                      <span class="sub-count-badge">1</span>
                    </a>
                  </li>
                </ul>
              </li>

              <!-- 6. Nội tiết (Collapsible) -->
              <li class="nav-item-parent">
                <div class="part-nav-item has-subnav" data-target="patho-noitiet-section">
                  <div class="part-nav-left">
                    <span class="part-icon"><i class="fa-solid fa-dna"></i></span>
                    <span class="part-text">Nội tiết</span>
                  </div>
                  <div class="part-nav-right">
                    <span class="part-count-badge">4</span>
                    <i class="fa-solid fa-chevron-down subnav-chevron"></i>
                  </div>
                </div>
                <ul class="part-sub-nav-list">
                  <li>
                    <a href="#patho-noitiet-tuy" class="part-sub-nav-item" data-target="patho-noitiet-tuy">
                      <span>Bệnh lý tụy</span>
                      <span class="sub-count-badge">4</span>
                    </a>
                  </li>
                  <li>
                    <a href="#patho-noitiet-giap" class="part-sub-nav-item" data-target="patho-noitiet-giap">
                      <span>Tuyến giáp</span>
                    </a>
                  </li>
                  <li>
                    <a href="#patho-noitiet-thuongthan" class="part-sub-nav-item" data-target="patho-noitiet-thuongthan">
                      <span>Tuyến thượng thận</span>
                    </a>
                  </li>
                  <li>
                    <a href="#patho-noitiet-tuyenyen" class="part-sub-nav-item" data-target="patho-noitiet-tuyenyen">
                      <span>Tuyến yên</span>
                    </a>
                  </li>
                </ul>
              </li>

              <!-- 7. Sản khoa -->
              <li class="nav-item-parent">
                <a href="#patho-sankhoa-section" class="part-nav-item" data-target="patho-sankhoa-section">
                  <div class="part-nav-left">
                    <span class="part-icon"><i class="fa-solid fa-person-pregnant"></i></span>
                    <span class="part-text">Sản khoa</span>
                  </div>
                  <div class="part-nav-right">
                    <span class="part-count-badge">1</span>
                  </div>
                </a>
              </li>

              <!-- 8. Truyền nhiễm (Collapsible) -->
              <li class="nav-item-parent">
                <div class="part-nav-item has-subnav" data-target="patho-truyen-nhiem-section">
                  <div class="part-nav-left">
                    <span class="part-icon"><i class="fa-solid fa-virus"></i></span>
                    <span class="part-text">Truyền nhiễm</span>
                  </div>
                  <div class="part-nav-right">
                    <span class="part-count-badge">6</span>
                    <i class="fa-solid fa-chevron-down subnav-chevron"></i>
                  </div>
                </div>
                <ul class="part-sub-nav-list">
                  <li>
                    <a href="#patho-truyen-nhiem-vikhoan" class="part-sub-nav-item" data-target="patho-truyen-nhiem-vikhoan">
                      <span>Vi khuẩn</span>
                      <span class="sub-count-badge">2</span>
                    </a>
                  </li>
                  <li>
                    <a href="#patho-truyen-nhiem-virus" class="part-sub-nav-item" data-target="patho-truyen-nhiem-virus">
                      <span>Vi rút</span>
                      <span class="sub-count-badge">3</span>
                    </a>
                  </li>
                  <li>
                    <a href="#patho-truyen-nhiem-nam" class="part-sub-nav-item" data-target="patho-truyen-nhiem-nam">
                      <span>Nấm</span>
                    </a>
                  </li>
                  <li>
                    <a href="#patho-truyen-nhiem-kysinhtrung" class="part-sub-nav-item" data-target="patho-truyen-nhiem-kysinhtrung">
                      <span>Ký sinh trùng</span>
                      <span class="sub-count-badge">1</span>
                    </a>
                  </li>
                </ul>
              </li>

              <!-- 9. Hồi sức - Cấp cứu -->
              <li class="nav-item-parent">
                <a href="#patho-hoisu-section" class="part-nav-item" data-target="patho-hoisu-section" style="color: #dc2626;">
                  <div class="part-nav-left">
                    <span class="part-icon" style="color: #dc2626; background: rgba(220, 38, 38, 0.12);"><i class="fa-solid fa-truck-medical"></i></span>
                    <span class="part-text" style="color: #dc2626;">Hồi sức - Cấp cứu</span>
                  </div>
                  <div class="part-nav-right">
                    <span class="part-count-badge" style="background: rgba(220, 38, 38, 0.15); color: #dc2626;">2</span>
                  </div>
                </a>
              </li>

              <!-- 10. Thần kinh -->
              <li class="nav-item-parent">
                <a href="#patho-thankinh-section" class="part-nav-item" data-target="patho-thankinh-section">
                  <div class="part-nav-left">
                    <span class="part-icon"><i class="fa-solid fa-brain"></i></span>
                    <span class="part-text">Thần kinh</span>
                  </div>
                  <div class="part-nav-right">
                    <span class="part-count-badge">1</span>
                  </div>
                </a>
              </li>

              <!-- 11. Huyết học -->
              <li class="nav-item-parent">
                <a href="#patho-huyethoc-section" class="part-nav-item" data-target="patho-huyethoc-section">
                  <div class="part-nav-left">
                    <span class="part-icon"><i class="fa-solid fa-vial"></i></span>
                    <span class="part-text">Huyết học</span>
                  </div>
                  <div class="part-nav-right">
                    <span class="part-count-badge">1</span>
                  </div>
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
            <h3>Không tìm thấy bài học cơ chế bệnh sinh nào</h3>
            <p>Vui lòng thử từ khóa khác.</p>
          </div>

          <!-- 1. TIM MẠCH -->
          <section id="patho-timmach-section" aria-labelledby="patho-timmach-heading" style="margin-bottom: 2rem;">
            <div class="physio-group-container">
              <div class="physio-group-header">
                <div>
                  <h3 id="patho-timmach-heading">Tim Mạch</h3>
                  <p style="margin: 0; font-size: 0.8rem; color: var(--color-text-muted);">5 Bài ca lâm sàng – Bệnh mạch vành, suy tim, tăng huyết áp &amp; rối loạn nhịp tim</p>
                </div>
              </div>

              <!-- 1.1. Bệnh mạch vành -->
              <div class="physio-subgroup-container" id="patho-timmach-machvanh">
                <div class="physio-subgroup-header">
                  <h4 class="physio-subgroup-title">Bệnh Mạch Vành</h4>
                  <span class="physio-subgroup-badge">2 bài học</span>
                </div>
                <div class="specialty-grid">
                  <a href="#/basic-medical/cases/slb-ccbs-acs" class="specialty-card">
                    <div class="specialty-card-top">
                      <div class="specialty-icon"><i class="fa-solid fa-heart-crack"></i></div>
                      <div class="specialty-info">
                        <h3>Hội Chứng Vành Cấp (ACS)</h3>
                        <p>Nứt vỡ mảng xơ vữa không ổn định, kết tập tiểu cầu, hình thành huyết khối gây tắc nghẽn động mạch vành cấp.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action">
                      <span>Xem cơ chế</span>
                      <span style="font-size: 0.72rem; font-weight: 700; color: #0284c7; background: rgba(2,132,199,0.1); padding: 2px 6px; border-radius: 4px; display: inline-flex; align-items: center; gap: 4px;">
                        ESC 2023 ACS
                      </span>
                      <i class="fa-solid fa-chevron-right"></i>
                    </div>
                  </a>
                  <a href="#/basic-medical/cases/slb-ccbs-ccs" class="specialty-card">
                    <div class="specialty-card-top">
                      <div class="specialty-icon"><i class="fa-solid fa-shield-heart"></i></div>
                      <div class="specialty-info">
                        <h3>Hội Chứng Vành Mạn (CCS)</h3>
                        <p>Mảng xơ vữa ổn định làm hẹp lòng mạch vành, gây mất cân bằng cung - cầu oxy cơ tim khi gắng sức.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                  </a>
                </div>
              </div>

              <!-- 1.2. Suy tim & Tăng huyết áp -->
              <div class="physio-subgroup-container" id="patho-timmach-suytim-tha">
                <div class="physio-subgroup-header">
                  <h4 class="physio-subgroup-title">Suy Tim &amp; Huyết Áp</h4>
                  <span class="physio-subgroup-badge">2 bài học</span>
                </div>
                <div class="specialty-grid">
                  <a href="#/basic-medical/cases/slb-ccbs-st" class="specialty-card">
                    <div class="specialty-card-top">
                      <div class="specialty-icon"><i class="fa-solid fa-heart-pulse"></i></div>
                      <div class="specialty-info">
                        <h3>Suy Tim</h3>
                        <p>Tái cấu trúc thất trái, hoạt hóa quá mức hệ giao cảm & RAAS kéo dài, stress oxy hóa và chết tế bào cơ tim theo chương trình.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action">
                      <span>Xem cơ chế</span>
                      <span style="font-size: 0.72rem; font-weight: 700; color: #0284c7; background: rgba(2,132,199,0.1); padding: 2px 6px; border-radius: 4px; display: inline-flex; align-items: center; gap: 4px;">
                        ESC HF 2023
                      </span>
                      <i class="fa-solid fa-chevron-right"></i>
                    </div>
                  </a>
                  <a href="#/basic-medical/cases/slb-ccbs-tha" class="specialty-card">
                    <div class="specialty-card-top">
                      <div class="specialty-icon"><i class="fa-solid fa-gauge-high"></i></div>
                      <div class="specialty-info">
                        <h3>Tăng Huyết Áp</h3>
                        <p>Tăng sức cản mạch máu ngoại vi, tái hấp thu muối natri ở thận, rối loạn chức năng nội mô và phì đại đồng tâm thất trái.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action">
                      <span>Xem cơ chế</span>
                      <span style="font-size: 0.72rem; font-weight: 700; color: #0284c7; background: rgba(2,132,199,0.1); padding: 2px 6px; border-radius: 4px; display: inline-flex; align-items: center; gap: 4px;">
                        ISH 2024
                      </span>
                      <i class="fa-solid fa-chevron-right"></i>
                    </div>
                  </a>
                </div>
              </div>

              <!-- 1.3. Rối loạn nhịp -->
              <div class="physio-subgroup-container" id="patho-timmach-roiloannhip">
                <div class="physio-subgroup-header">
                  <h4 class="physio-subgroup-title">Rối Loạn Nhịp Tim</h4>
                  <span class="physio-subgroup-badge">1 bài học</span>
                </div>
                <div class="specialty-grid">
                  <a href="#/basic-medical/cases/slb-ccbs-rung-nhi" class="specialty-card">
                    <div class="specialty-card-top">
                      <div class="specialty-icon"><i class="fa-solid fa-heart-pulse"></i></div>
                      <div class="specialty-info">
                        <h3>Rung Nhĩ (Atrial Fibrillation)</h3>
                        <p>Ổ khởi kích TM phổi, rò rỉ Ca2+ qua RyR2, bước sóng &lambda;, xơ hóa nhĩ, mô mỡ EAT, rung nhĩ sau mổ POAF &amp; AF begets AF.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action">
                      <span>Xem cơ chế</span>
                      <span style="font-size: 0.72rem; font-weight: 700; color: #0284c7; background: rgba(2,132,199,0.1); padding: 2px 6px; border-radius: 4px; display: inline-flex; align-items: center; gap: 4px;">
                        ESC 2024 AF
                      </span>
                      <i class="fa-solid fa-chevron-right"></i>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </section>

          <!-- 2. HÔ HẤP -->
          <section id="patho-hohap-section" aria-labelledby="patho-hohap-heading" style="margin-bottom: 2rem;">
            <div class="physio-group-container">
              <div class="physio-group-header">
                <div>
                  <h3 id="patho-hohap-heading">Hô Hấp</h3>
                  <p style="margin: 0; font-size: 0.8rem; color: var(--color-text-muted);">5 Bài ca lâm sàng – Suy hô hấp, bệnh lý tắc nghẽn &amp; nhiễm trùng đường thở</p>
                </div>
              </div>

              <!-- 2.1. Suy hô hấp -->
              <div class="physio-subgroup-container" id="patho-hohap-suyhohap">
                <div class="physio-subgroup-header">
                  <h4 class="physio-subgroup-title">Suy Hô Hấp</h4>
                  <span class="physio-subgroup-badge">1 bài học</span>
                </div>
                <div class="specialty-grid">
                  <a href="#/basic-medical/cases/slb-ccbs-suy-ho-hap" class="specialty-card">
                    <div class="specialty-card-top">
                      <div class="specialty-icon"><i class="fa-solid fa-lungs"></i></div>
                      <div class="specialty-info">
                        <h3>Suy Hô Hấp Cấp</h3>
                        <p>Tổn thương màng phế nang mao mạch lan tỏa, tăng tính thấm, phù phổi không do tim và shunt nội phổi nặng.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                  </a>
                </div>
              </div>

              <!-- 2.2. Bệnh lý tắc nghẽn -->
              <div class="physio-subgroup-container" id="patho-hohap-tacnghen">
                <div class="physio-subgroup-header">
                  <h4 class="physio-subgroup-title">Bệnh Lý Tắc Nghẽn</h4>
                  <span class="physio-subgroup-badge">2 bài học</span>
                </div>
                <div class="specialty-grid">
                  <a href="#/basic-medical/cases/slb-ccbs-copd" class="specialty-card">
                    <div class="specialty-card-top">
                      <div class="specialty-icon"><i class="fa-solid fa-lungs-virus"></i></div>
                      <div class="specialty-info">
                        <h3>Bệnh Phổi Tắc Nghẽn Mạn Tính (COPD)</h3>
                        <p>Viêm đường thở mạn tính, khí phế thũng phá hủy vách phế nang, bẫy khí và tăng kháng lực đường thở không hồi phục hoàn toàn.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action">
                      <span>Xem cơ chế</span>
                      <span style="font-size: 0.72rem; font-weight: 700; color: #0284c7; background: rgba(2,132,199,0.1); padding: 2px 6px; border-radius: 4px; display: inline-flex; align-items: center; gap: 4px;">
                        GOLD 2025 / BYT
                      </span>
                      <i class="fa-solid fa-chevron-right"></i>
                    </div>
                  </a>
                  <a href="#/basic-medical/cases/slb-ccbs-henpq" class="specialty-card">
                    <div class="specialty-card-top">
                      <div class="specialty-icon"><i class="fa-solid fa-wind"></i></div>
                      <div class="specialty-info">
                        <h3>Hen Phế Quản</h3>
                        <p>Tăng phản ứng phế quản, co thắt cơ trơn phế quản qua trung gian IgE, Eosinophils và tái cấu trúc đường thở.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action">
                      <span>Xem cơ chế</span>
                      <span style="font-size: 0.72rem; font-weight: 700; color: #0284c7; background: rgba(2,132,199,0.1); padding: 2px 6px; border-radius: 4px; display: inline-flex; align-items: center; gap: 4px;">
                        GINA 2024
                      </span>
                      <i class="fa-solid fa-chevron-right"></i>
                    </div>
                  </a>
                </div>
              </div>

              <!-- 2.3. Nhiễm trùng hô hấp -->
              <div class="physio-subgroup-container" id="patho-hohap-nhiemtrung">
                <div class="physio-subgroup-header">
                  <h4 class="physio-subgroup-title">Nhiễm Trùng Hô Hấp</h4>
                  <span class="physio-subgroup-badge">2 bài học</span>
                </div>
                <div class="specialty-grid">
                  <a href="#/basic-medical/cases/slb-ccbs-vp" class="specialty-card">
                    <div class="specialty-card-top">
                      <div class="specialty-icon"><i class="fa-solid fa-virus"></i></div>
                      <div class="specialty-info">
                        <h3>Viêm Phổi</h3>
                        <p>Xâm nhập phế nang của vi khuẩn, phản ứng viêm đông đặc rỉ dịch xuất tiết và suy giảm trao đổi khí.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                  </a>
                  <a href="#/basic-medical/cases/slb-ccbs-vtpq" class="specialty-card">
                    <div class="specialty-card-top">
                      <div class="specialty-icon"><i class="fa-solid fa-child"></i></div>
                      <div class="specialty-info">
                        <h3>Viêm Tiểu Phế Quản</h3>
                        <p>Tổn thương biểu mô tiểu phế quản do virus RSV, phù nề, tăng tiết đờm nhầy gây tắc nghẽn đường thở nhỏ và bẫy khí ở trẻ nhi.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                  </a>
                </div>
              </div>
            </div>
          </section>

          <!-- 3. TIÊU HÓA -->
          <section id="patho-tieuhoa-section" aria-labelledby="patho-tieuhoa-heading" style="margin-bottom: 2rem;">
            <div class="physio-group-container">
              <div class="physio-group-header">
                <div>
                  <h3 id="patho-tieuhoa-heading">Tiêu Hóa</h3>
                  <p style="margin: 0; font-size: 0.8rem; color: var(--color-text-muted);">21 Bài ca lâm sàng – Thực quản dạ dày, đường ruột &amp; gan mật tụy</p>
                </div>
              </div>

              <!-- 3.1. Thực quản - Dạ dày -->
              <div class="physio-subgroup-container" id="patho-tieuhoa-da-day">
                <div class="physio-subgroup-header">
                  <h4 class="physio-subgroup-title">Thực Quản – Dạ Dày</h4>
                  <span class="physio-subgroup-badge">5 bài học</span>
                </div>
                <div class="specialty-grid">
                  <a href="#/basic-medical/cases/slb-ccbs-gerd" class="specialty-card">
                    <div class="specialty-card-top">
                      <div class="specialty-icon"><i class="fa-solid fa-arrows-up-down"></i></div>
                      <div class="specialty-info">
                        <h3>Trào Ngược Dạ Dày Thực Quản (GERD)</h3>
                        <p>Giãn thoáng qua cơ thắt thực quản dưới (TLESR) và tổn thương biểu mô vảy do acid/pepsin dịch vị.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                  </a>
                  <a href="#/basic-medical/cases/slb-ccbs-pud" class="specialty-card">
                    <div class="specialty-card-top">
                      <div class="specialty-icon"><i class="fa-solid fa-bacteria"></i></div>
                      <div class="specialty-info">
                        <h3>Loét Dạ Dày - Tá Tràng (PUD)</h3>
                        <p>Mất cân bằng bảo vệ - tấn công, vi khuẩn H. pylori, độc tính NSAID, ZES, ly giải fibrin và thủng phúc mạc.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                  </a>
                  <a href="#/basic-medical/cases/slb-ccbs-hp" class="specialty-card">
                    <div class="specialty-card-top">
                      <div class="specialty-icon"><i class="fa-solid fa-bacterium"></i></div>
                      <div class="specialty-info">
                        <h3>Nhiễm Khuẩn Helicobacter pylori</h3>
                        <p>Men Urease, độc lực CagA/T4SS &amp; VacA, phân nhánh hang vị vs thân vị, chuỗi Correa &amp; đột biến kháng kháng sinh.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                  </a>
                  <a href="#/basic-medical/cases/slb-ccbs-dumping" class="specialty-card">
                    <div class="specialty-card-top">
                      <div class="specialty-icon"><i class="fa-solid fa-person-falling-burst"></i></div>
                      <div class="specialty-info">
                        <h3>Hội Chứng Dumping (DS)</h3>
                        <p>Dumping sớm (dịch chuyển dịch thể, giảm thể tích tuần hoàn) vs Dumping muộn (SGLT-1, GLP-1, hạ đường huyết phản ứng), phác đồ Bariatric &amp; thang điểm Sigstad/Arts.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                  </a>
                  <a href="#/basic-medical/cases/slb-ccbs-xhth-tren" class="specialty-card">
                    <div class="specialty-card-top">
                      <div class="specialty-icon"><i class="fa-solid fa-droplet"></i></div>
                      <div class="specialty-info">
                        <h3>Xuất Huyết Tiêu Hóa Trên (UGIB)</h3>
                        <p>Vỡ giãn tĩnh mạch thực quản do tăng áp cửa & loét dạ dày tá tràng bào mòn mạch máu dưới niêm mạc.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                  </a>
                </div>
              </div>

              <!-- 3.2. Đường ruột -->
              <div class="physio-subgroup-container" id="patho-tieuhoa-duong-ruot">
                <div class="physio-subgroup-header">
                  <h4 class="physio-subgroup-title">Đường Ruột (Ruột Non &amp; Đại Tràng)</h4>
                  <span class="physio-subgroup-badge">6 bài học</span>
                </div>
                <div class="specialty-grid">
                  <a href="#/basic-medical/cases/slb-ccbs-ibs" class="specialty-card">
                    <div class="specialty-card-top">
                      <div class="specialty-icon"><i class="fa-solid fa-brain"></i></div>
                      <div class="specialty-info">
                        <h3>Hội Chứng Ruột Kích Thích (IBS)</h3>
                        <p>Rối loạn tương tác trục Não - Ruột (Gut-Brain Axis), tăng nhạy cảm nội tạng và rối loạn vận động ống tiêu hóa.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                  </a>
                  <a href="#/basic-medical/cases/slb-ccbs-ibd" class="specialty-card">
                    <div class="specialty-card-top">
                      <div class="specialty-icon"><i class="fa-solid fa-shield-halved"></i></div>
                      <div class="specialty-info">
                        <h3>Bệnh Viêm Ruột Mạn Tính (IBD)</h3>
                        <p>Rối loạn đáp ứng miễn dịch niêm mạc ruột với hệ vi sinh vật trên cơ địa di truyền mẫn cảm.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                  </a>
                  <a href="#/basic-medical/cases/slb-ccbs-celiac" class="specialty-card">
                    <div class="specialty-card-top">
                      <div class="specialty-icon"><i class="fa-solid fa-wheat-awn"></i></div>
                      <div class="specialty-info">
                        <h3>Bệnh Celiac (Coeliac Disease)</h3>
                        <p>Kháng tiêu hóa gluten, Zonulin phá vỡ liên kết chặt, men TG2 khử amin, HLA-DQ2/DQ8, IL-15 độc tế bào IELs, phân loại Marsh &amp; Celiac kháng trị (RCD1 vs RCD2).</p>
                      </div>
                    </div>
                    <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                  </a>
                  <a href="#/basic-medical/cases/slb-ccbs-sibo" class="specialty-card">
                    <div class="specialty-card-top">
                      <div class="specialty-icon"><i class="fa-solid fa-bacteria"></i></div>
                      <div class="specialty-info">
                        <h3>Tăng Sinh Vi Khuẩn Ruột Non (SIBO &amp; IMO)</h3>
                        <p>Suy giảm phức hợp MMC, 3 con đường kém hấp thu, giải liên hợp axit mật, phân loại thể khí thở H2/CH4, màng sinh học Biofilm, liên kết IBS &amp; trục Ruột - Gan MASLD.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                  </a>
                  <a href="#/basic-medical/cases/slb-ccbs-xhth-duoi" class="specialty-card">
                    <div class="specialty-card-top">
                      <div class="specialty-icon"><i class="fa-solid fa-droplet"></i></div>
                      <div class="specialty-info">
                        <h3>Xuất Huyết Tiêu Hóa Dưới (LGIB)</h3>
                        <p>Cơ chế chảy máu do túi thừa đại tràng, loạn sản mạch máu (Angiodysplasia), viêm đại tràng thiếu máu cục bộ và trĩ nội.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                  </a>
                  <a href="#/basic-medical/cases/slb-ccbs-kem-hap-thu" class="specialty-card">
                    <div class="specialty-card-top">
                      <div class="specialty-icon" style="background: rgba(2, 132, 199, 0.12); color: #0284c7;"><i class="fa-solid fa-wheat-awn"></i></div>
                      <div class="specialty-info">
                        <h3>Hội Chứng Kém Hấp Thu</h3>
                        <p>Rối loạn 3 pha đồng hóa (Lòng ruột &ndash; Niêm mạc &ndash; Sau niêm mạc), tiêu phân mỡ, bệnh ruột mất đạm PLE và teo nhung mao.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action">
                      <span>Xem cơ chế</span>
                      <span style="font-size: 0.72rem; font-weight: 700; color: #0284c7; background: rgba(2,132,199,0.1); padding: 2px 6px; border-radius: 4px; display: inline-flex; align-items: center; gap: 4px;">
                        WGO Guideline
                      </span>
                      <i class="fa-solid fa-chevron-right"></i>
                    </div>
                  </a>
                </div>
              </div>

              <!-- 3.3. Gan - Mật - Tụy -->
              <div class="physio-subgroup-container" id="patho-tieuhoa-gan-mat-tuy">
                <div class="physio-subgroup-header">
                  <h4 class="physio-subgroup-title">Gan – Mật – Tụy</h4>
                  <span class="physio-subgroup-badge">10 bài học</span>
                </div>
                <div class="specialty-grid">
                  <a href="#/basic-medical/cases/slb-ccbs-xg" class="specialty-card">
                    <div class="specialty-card-top">
                      <div class="specialty-icon"><i class="fa-solid fa-disease"></i></div>
                      <div class="specialty-info">
                        <h3>Xơ Gan</h3>
                        <p>Hoạt hóa tế bào Kupffer và tế bào hình sao (HSCs), sinh bệnh học báng bụng, tuần hoàn tăng động giãn tạng và suy giảm chuyển hóa.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                  </a>
                  <a href="#/basic-medical/cases/slb-ccbs-tang-ap-cua" class="specialty-card">
                    <div class="specialty-card-top">
                      <div class="specialty-icon"><i class="fa-solid fa-road-barrier"></i></div>
                      <div class="specialty-info">
                        <h3>Tăng Áp Lực Tĩnh Mạch Cửa (PH)</h3>
                        <p>Huyết động P = Q &times; R, CSPH, phân loại giải phẫu 3 nhóm, định luật Laplace trong vỡ giãn TM thực quản, HPS/PPHT, NCPH/PSVD &amp; dược lý NSBB.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                  </a>
                  <a href="#/basic-medical/cases/slb-ccbs-co-truong" class="specialty-card">
                    <div class="specialty-card-top">
                      <div class="specialty-icon"><i class="fa-solid fa-water"></i></div>
                      <div class="specialty-info">
                        <h3>Cổ Trướng Trong Xơ Gan (Ascites)</h3>
                        <p>Tăng áp cửa, Thuyết giãn mạch ngoại vi, Thuyết viêm hệ thống &amp; BT, phân độ 1-3, Rối loạn tuần hoàn sau chọc tháo PICD và Gradient SAAG.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                  </a>
                  <a href="#/basic-medical/cases/slb-ccbs-benh-nao-gan" class="specialty-card">
                    <div class="specialty-card-top">
                      <div class="specialty-icon"><i class="fa-solid fa-brain"></i></div>
                      <div class="specialty-info">
                        <h3>Bệnh Não Gan (HE)</h3>
                        <p>Type A/B/C, độc tính Amoniac NH3, phù tế bào sao (Glutamine), teo cơ Sarcopenia, tỷ lệ BCAA/AAA, 6 yếu tố thúc đẩy &amp; cơ chế Lactulose/Rifaximin.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                  </a>
                  <a href="#/basic-medical/cases/slb-ccbs-masld" class="specialty-card">
                    <div class="specialty-card-top">
                      <div class="specialty-icon"><i class="fa-solid fa-cubes-stacked"></i></div>
                      <div class="specialty-info">
                        <h3>Gan Nhiễm Mỡ Chuyển Hóa (MASLD / MASH)</h3>
                        <p>Thuyết đa đánh điểm (Multiple-hit), kháng insulin mỡ, ngộ độc lipid Lipotoxicity, stress ER/ty thể và hoạt hóa HSCs sinh xơ.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                  </a>
                  <a href="#/basic-medical/cases/slb-ccbs-viem-gan-do-ruou" class="specialty-card">
                    <div class="specialty-card-top">
                      <div class="specialty-icon"><i class="fa-solid fa-wine-bottle"></i></div>
                      <div class="specialty-info">
                        <h3>Viêm Gan Do Rượu (Alcoholic Hepatitis)</h3>
                        <p>Chuyển hóa Ethanol qua ADH/CYP2E1 sinh Acetaldehyde &amp; ROS, thể Mallory-Denk, bão Cytokines TNF-α/IL-8 và suy gan cấp trên nền mạn.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                  </a>
                  <a href="#/basic-medical/cases/slb-ccbs-vtc" class="specialty-card">
                    <div class="specialty-card-top">
                      <div class="specialty-icon"><i class="fa-solid fa-fire"></i></div>
                      <div class="specialty-info">
                        <h3>Viêm Tụy Cấp</h3>
                        <p>Tự tiêu hủy mô tụy do hoạt hóa sớm men Trypsinogen nội bào, phóng thích Cytokines gây phản ứng viêm hệ thống SIRS.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                  </a>
                  <a href="#/basic-medical/cases/slb-ccbs-alagille" class="specialty-card">
                    <div class="specialty-card-top">
                      <div class="specialty-icon" style="background: rgba(139, 92, 246, 0.12); color: #8b5cf6;"><i class="fa-solid fa-dna"></i></div>
                      <div class="specialty-info">
                        <h3>Hội Chứng Alagille (ALGS)</h3>
                        <p>Đột biến trục Notch (JAG1/NOTCH2), nghèo đường mật liên thùy PIBD, Lipoprotein-X, bẫy mổ Kasai và bệnh lý mạch máu Moyamoya.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action">
                      <span>Xem cơ chế</span>
                      <span style="font-size: 0.72rem; font-weight: 700; color: #8b5cf6; background: rgba(139,92,246,0.1); padding: 2px 6px; border-radius: 4px; display: inline-flex; align-items: center; gap: 4px;">
                        GeneReviews
                      </span>
                      <i class="fa-solid fa-chevron-right"></i>
                    </div>
                  </a>
                  <a href="#/basic-medical/cases/slb-ccbs-budd-chiari" class="specialty-card">
                    <div class="specialty-card-top">
                      <div class="specialty-icon" style="background: rgba(220, 38, 38, 0.12); color: #dc2626;"><i class="fa-solid fa-code-merge"></i></div>
                      <div class="specialty-info">
                        <h3>Hội Chứng Budd-Chiari (BCS)</h3>
                        <p>Tắc nghẽn đường ra TM gan (HVOTO), tăng áp lực xoang, hoại tử Zone 3, phì đại bù trừ thùy đuôi, đột biến JAK2 V617F và bẫy ngoại bào NETs.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action">
                      <span>Xem cơ chế</span>
                      <span style="font-size: 0.72rem; font-weight: 700; color: #dc2626; background: rgba(220,38,38,0.1); padding: 2px 6px; border-radius: 4px; display: inline-flex; align-items: center; gap: 4px;">
                        AASLD 2024
                      </span>
                      <i class="fa-solid fa-chevron-right"></i>
                    </div>
                  </a>
                  <a href="#/basic-medical/cases/slb-ccbs-gilbert" class="specialty-card">
                    <div class="specialty-card-top">
                      <div class="specialty-icon" style="background: rgba(245, 158, 11, 0.12); color: #d97706;"><i class="fa-solid fa-vial-circle-check"></i></div>
                      <div class="specialty-info">
                        <h3>Hội Chứng Gilbert (GS)</h3>
                        <p>Đột biến promoter UGT1A1*28, giảm 50% men liên hợp glucuronide, bẫy độc tính Irinotecan (SN-38) và nghịch lý bảo vệ tim mạch.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action">
                      <span>Xem cơ chế</span>
                      <span style="font-size: 0.72rem; font-weight: 700; color: #d97706; background: rgba(245,158,11,0.1); padding: 2px 6px; border-radius: 4px; display: inline-flex; align-items: center; gap: 4px;">
                        StatPearls
                      </span>
                      <i class="fa-solid fa-chevron-right"></i>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </section>

          <!-- 4. THẬN -->
          <section id="patho-than-section" aria-labelledby="patho-than-heading" style="margin-bottom: 2rem;">
            <div class="physio-group-container">
              <div class="physio-group-header">
                <div>
                  <h3 id="patho-than-heading">Thận</h3>
                  <p style="margin: 0; font-size: 0.8rem; color: var(--color-text-muted);">2 Bài ca lâm sàng – Tổn thương thận cấp và bệnh thận mạn</p>
                </div>
              </div>
              <div class="specialty-grid">
                <a href="#/basic-medical/cases/slb-ccbs-aki" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon"><i class="fa-solid fa-triangle-exclamation"></i></div>
                    <div class="specialty-info">
                      <h3>Tổn Thương Thận Cấp (AKI)</h3>
                      <p>Giảm tưới máu trước thận, hoại tử ống thận cấp (ATN) do thiếu máu/độc chất và rối loạn ty thể.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/basic-medical/cases/slb-ccbs-ckd" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon"><i class="fa-solid fa-clock-rotate-left"></i></div>
                    <div class="specialty-info">
                      <h3>Bệnh Thận Mạn (CKD)</h3>
                      <p>Thích ứng tăng lọc cầu thận và sụp đổ nội môi, xơ hóa cầu thận tiến triển, loãng xương do thận và giảm tiết EPO.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
              </div>
            </div>
          </section>

          <!-- 5. ĐIỆN GIẢI - TOAN KIỀM -->
          <section id="patho-diengiai-section" aria-labelledby="patho-diengiai-heading" style="margin-bottom: 2rem;">
            <div class="physio-group-container">
              <div class="physio-group-header">
                <div>
                  <h3 id="patho-diengiai-heading">Điện Giải – Toan Kiềm</h3>
                  <p style="margin: 0; font-size: 0.8rem; color: var(--color-text-muted);">6 Bài ca lâm sàng &amp; Công cụ mô phỏng phân tích khí máu</p>
                </div>
              </div>

              <!-- 5.1. Rối loạn điện giải -->
              <div class="physio-subgroup-container" id="patho-diengiai-roi-loan">
                <div class="physio-subgroup-header">
                  <h4 class="physio-subgroup-title">Rối Loạn Điện Giải Lâm Sàng</h4>
                  <span class="physio-subgroup-badge">5 bài học</span>
                </div>
                <div class="specialty-grid">
                  <a href="#/basic-medical/cases/slb-ccbs-rl-kali" class="specialty-card">
                    <div class="specialty-card-top">
                      <div class="specialty-icon"><i class="fa-solid fa-vial-circle-check"></i></div>
                      <div class="specialty-info">
                        <h3>Rối Loạn Kali Máu (Hypo/Hyperkalemia)</h3>
                        <p>Phân bố khoang dịch, vai trò Magne, cơ chế hạ/tăng K+, biến đổi ECG tuần tự (sóng hình sin), hội chứng BRASH và 3 trục cấp cứu.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                  </a>
                  <a href="#/basic-medical/cases/slb-ccbs-rl-natri" class="specialty-card">
                    <div class="specialty-card-top">
                      <div class="specialty-icon"><i class="fa-solid fa-droplet"></i></div>
                      <div class="specialty-info">
                        <h3>Rối Loạn Natri Máu (Hypo/Hypernatremia)</h3>
                        <p>Áp lực thẩm thấu &amp; trương lực, trục AVP/Aquaporin-2, thích nghi tế bào não, hội chứng ODS, SIADH vs CSW, Đái tháo nhạt và bù an toàn.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                  </a>
                  <a href="#/basic-medical/cases/slb-ccbs-rl-canxi" class="specialty-card">
                    <div class="specialty-card-top">
                      <div class="specialty-icon"><i class="fa-solid fa-bone"></i></div>
                      <div class="specialty-info">
                        <h3>Rối Loạn Canxi Máu (Hypo/Hypercalcemia)</h3>
                        <p>Canxi ion hóa vs Albumin, thụ thể CaSR, trục PTH &ndash; Calcitriol, u tuyến cận giáp PHPT, FHH, dấu Chvostek &amp; Trousseau, biến đổi QT trên ECG.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                  </a>
                  <a href="#/basic-medical/cases/slb-ccbs-rl-phosphat" class="specialty-card">
                    <div class="specialty-card-top">
                      <div class="specialty-icon"><i class="fa-solid fa-bolt"></i></div>
                      <div class="specialty-info">
                        <h3>Rối Loạn Phosphat Máu (Hypo/Hyperphosphatemia)</h3>
                        <p>Trục PTH &ndash; FGF-23, kênh NaPi, hội chứng nuôi ăn lại Refeeding, thiếu ATP cơ hoành thất bại cai máy thở, tích số Ca &times; P &ge; 55 &amp; vôi hóa mạch máu.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                  </a>
                  <a href="#/basic-medical/cases/slb-ccbs-rl-magie" class="specialty-card">
                    <div class="specialty-card-top">
                      <div class="specialty-icon"><i class="fa-solid fa-atom"></i></div>
                      <div class="specialty-info">
                        <h3>Rối Loạn Magie Máu (Hypo/Hypermagnesemia)</h3>
                        <p>Tái hấp thu tại quai Henle qua Claudin-16/19, cơ chế gây hạ K+ &amp; Ca2+ kháng trị (nút chặn ROMK, ức chế PTH), xoắn đỉnh Torsades de Pointes và đối kháng bằng Canxi IV.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                  </a>
                </div>
              </div>

              <!-- 5.2. Rối loạn toan kiềm -->
              <div class="physio-subgroup-container" id="patho-diengiai-toankiem">
                <div class="physio-subgroup-header">
                  <h4 class="physio-subgroup-title">Rối Loạn Thăng Bằng Toan Kiềm &amp; Khí Máu</h4>
                  <span class="physio-subgroup-badge">Simulator Engine</span>
                </div>
                <div class="specialty-grid">
                  <a href="#/basic-medical/simulators" class="specialty-card" style="border-left-color: #f59e0b;">
                    <div class="specialty-card-top">
                      <div class="specialty-icon" style="background: rgba(245, 158, 11, 0.15); color: #f59e0b;"><i class="fa-solid fa-flask"></i></div>
                      <div class="specialty-info">
                        <h3>Mô Phỏng Thăng Bằng Toan Kiềm &amp; ABG</h3>
                        <p>Phương trình Henderson-Hasselbalch, quy tắc bù trừ Boston 6 bước, Anion Gap huyết tương và chẩn đoán rối loạn toan kiềm hỗn hợp.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action" style="color: #f59e0b;">
                      <span>Vào phòng thí nghiệm mô phỏng</span>
                      <i class="fa-solid fa-arrow-right"></i>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </section>

          <!-- 6. NỘI TIẾT -->
          <section id="patho-noitiet-section" aria-labelledby="patho-noitiet-heading" style="margin-bottom: 2rem;">
            <div class="physio-group-container">
              <div class="physio-group-header">
                <div>
                  <h3 id="patho-noitiet-heading">Nội Tiết</h3>
                  <p style="margin: 0; font-size: 0.8rem; color: var(--color-text-muted);">4 Bài ca lâm sàng – Bệnh lý tụy nội tiết, tuyến giáp, thượng thận &amp; tuyến yên</p>
                </div>
              </div>

              <!-- 6.1. Bệnh lý tụy -->
              <div class="physio-subgroup-container" id="patho-noitiet-tuy">
                <div class="physio-subgroup-header">
                  <h4 class="physio-subgroup-title">Bệnh Lý Tụy Nội Tiết &amp; Chuyển Hóa Glucose</h4>
                  <span class="physio-subgroup-badge">4 bài học</span>
                </div>
                <div class="specialty-grid">
                  <a href="#/basic-medical/cases/slb-ccbs-dtd" class="specialty-card">
                    <div class="specialty-card-top">
                      <div class="specialty-icon"><i class="fa-solid fa-droplet"></i></div>
                      <div class="specialty-info">
                        <h3>Đái Tháo Đường</h3>
                        <p>Kháng Insulin mô đích, suy tế bào Beta tụy, nhiễm toan Ceton, tăng áp lực thẩm thấu và biến chứng mạch máu.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action">
                      <span>Xem cơ chế</span>
                      <span style="font-size: 0.72rem; font-weight: 700; color: #0284c7; background: rgba(2,132,199,0.1); padding: 2px 6px; border-radius: 4px; display: inline-flex; align-items: center; gap: 4px;">
                        ADA 2024
                      </span>
                      <i class="fa-solid fa-chevron-right"></i>
                    </div>
                  </a>
                  <a href="#/basic-medical/cases/slb-ccbs-dka" class="specialty-card">
                    <div class="specialty-card-top">
                      <div class="specialty-icon" style="background: rgba(245, 158, 11, 0.15); color: #f59e0b;"><i class="fa-solid fa-fire"></i></div>
                      <div class="specialty-info">
                        <h3>Toan Ceton Do ĐTĐ (DKA &amp; euDKA)</h3>
                        <p>Tỷ lệ Glucagon/Insulin, Ketogenesis qua CPT-1, tỷ lệ BOHB/AcAc 10:1, loại bỏ Anion Gap (Consensus 2024), euDKA do SGLT2i và Dextrose sớm.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                  </a>
                  <a href="#/basic-medical/cases/slb-ccbs-hhs" class="specialty-card">
                    <div class="specialty-card-top">
                      <div class="specialty-icon" style="background: rgba(245, 158, 11, 0.15); color: #f59e0b;"><i class="fa-solid fa-gauge-high"></i></div>
                      <div class="specialty-info">
                        <h3>Tăng Áp Lực Thẩm Thấu (HHS)</h3>
                        <p>Insulin tồn dư ức chế Lipolysis, tăng đường huyết cực độ &ge; 600 mg/dL, mất 12-15% nước, áp lực thẩm thấu &gt; 300-320 mOsm/kg, tăng đông và tiêu cơ vân.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                  </a>
                  <a href="#/basic-medical/cases/slb-ccbs-ha-duong-huyet" class="specialty-card">
                    <div class="specialty-card-top">
                      <div class="specialty-icon" style="background: rgba(245, 158, 11, 0.15); color: #f59e0b;"><i class="fa-solid fa-battery-quarter"></i></div>
                      <div class="specialty-info">
                        <h3>Hạ Đường Huyết Trong ĐTĐ</h3>
                        <p>3 mức độ hạ đường huyết theo ADA 2026, chuỗi nội tiết đối kháng, hội chứng HAAF, giảm thanh thải ở thận mạn và quy tắc 15.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                  </a>
                </div>
              </div>
            </div>
          </section>

          <!-- 7. SẢN KHOA -->
          <section id="patho-sankhoa-section" aria-labelledby="patho-sankhoa-heading" style="margin-bottom: 2rem;">
            <div class="physio-group-container">
              <div class="physio-group-header">
                <div>
                  <h3 id="patho-sankhoa-heading">Sản Khoa</h3>
                  <p style="margin: 0; font-size: 0.8rem; color: var(--color-text-muted);">1 Bài ca lâm sàng – Sinh lý bệnh học thai kỳ và biến chứng sản khoa</p>
                </div>
              </div>
              <div class="specialty-grid">
                <a href="#/basic-medical/cases/slb-ccbs-tsg" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon"><i class="fa-solid fa-person-pregnant"></i></div>
                    <div class="specialty-info">
                      <h3>Tiền Sản Giật</h3>
                      <p>Khiếm khuyết xâm lấn nguyên bào nuôi, mất cân bằng sFlt-1/PlGF, co thắt mạch toàn thân và tổn thương nội mô đa cơ quan.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
              </div>
            </div>
          </section>

          <!-- 8. TRUYỀN NHIỄM -->
          <section id="patho-truyen-nhiem-section" aria-labelledby="patho-truyen-nhiem-heading" style="margin-bottom: 2rem;">
            <div class="physio-group-container">
              <div class="physio-group-header">
                <div>
                  <h3 id="patho-truyen-nhiem-heading">Bệnh Truyền Nhiễm</h3>
                  <p style="margin: 0; font-size: 0.8rem; color: var(--color-text-muted);">6 Bài ca lâm sàng – Vi khuẩn, vi rút và ký sinh trùng</p>
                </div>
              </div>

              <!-- 8.1. Vi khuẩn -->
              <div class="physio-subgroup-container" id="patho-truyen-nhiem-vikhoan">
                <div class="physio-subgroup-header">
                  <h4 class="physio-subgroup-title">Bệnh Nhiễm Vi Khuẩn</h4>
                  <span class="physio-subgroup-badge">2 bài học</span>
                </div>
                <div class="specialty-grid">
                  <a href="#/basic-medical/cases/slb-ccbs-lao" class="specialty-card">
                    <div class="specialty-card-top">
                      <div class="specialty-icon"><i class="fa-solid fa-shield-virus"></i></div>
                      <div class="specialty-info">
                        <h3>Bệnh Lao</h3>
                        <p>Sinh bệnh học vi khuẩn lao Mycobacterium tuberculosis, đáp ứng miễn dịch tế bào qua Lympho T, tạo nang lao bã đậu và hang lao.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                  </a>
                  <a href="#/basic-medical/cases/slb-ccbs-bach-hau" class="specialty-card">
                    <div class="specialty-card-top">
                      <div class="specialty-icon"><i class="fa-solid fa-skull-crossbones"></i></div>
                      <div class="specialty-info">
                        <h3>Bệnh Bạch Hầu</h3>
                        <p>Ngoại độc tố Diphtheria toxin ức chế tổng hợp protein tế bào qua ADP-ribosyl hóa EF-2, giả mạc thanh quản và viêm cơ tim nhiễm độc.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                  </a>
                </div>
              </div>

              <!-- 8.2. Vi rút -->
              <div class="physio-subgroup-container" id="patho-truyen-nhiem-virus">
                <div class="physio-subgroup-header">
                  <h4 class="physio-subgroup-title">Bệnh Nhiễm Vi Rút</h4>
                  <span class="physio-subgroup-badge">3 bài học (7 thể)</span>
                </div>
                <div class="specialty-grid">
                  <!-- VIÊM GAN SIÊU VI (A, B, C, D, E) — DROPDOWN CARD -->
                  <div class="specialty-card specialty-dropdown-card" id="hep-dropdown-card" tabindex="0" aria-haspopup="true" aria-expanded="false">
                    <div class="specialty-card-top">
                      <div class="specialty-icon" style="background: rgba(220, 38, 38, 0.12); color: #dc2626;"><i class="fa-solid fa-viruses"></i></div>
                      <div class="specialty-info">
                        <div style="display: flex; align-items: center; justify-content: space-between; gap: 6px; margin-bottom: 2px;">
                          <h3 style="margin: 0;">Viêm Gan Siêu Vi</h3>
                          <span class="hepatitis-badge-count">5 thể (A-E)</span>
                        </div>
                        <p>Cơ chế bệnh sinh &amp; miễn dịch 5 thể HAV, HBV, HCV, HDV, HEV: cccDNA, quasispecies, ADAR1 ribozyme, bão cytokine thai kỳ và đích điều trị.</p>
                        <div class="hepatitis-quick-pills">
                          <a href="#/basic-medical/cases/slb-ccbs-hav" class="hep-pill pill-a" title="Viêm Gan A (HAV)">A</a>
                          <a href="#/basic-medical/cases/slb-ccbs-hbv" class="hep-pill pill-b" title="Viêm Gan B (HBV)">B</a>
                          <a href="#/basic-medical/cases/slb-ccbs-hcv" class="hep-pill pill-c" title="Viêm Gan C (HCV)">C</a>
                          <a href="#/basic-medical/cases/slb-ccbs-hdv" class="hep-pill pill-d" title="Viêm Gan D (HDV)">D</a>
                          <a href="#/basic-medical/cases/slb-ccbs-hev" class="hep-pill pill-e" title="Viêm Gan E (HEV)">E</a>
                        </div>
                      </div>
                    </div>
                    <div class="specialty-card-action specialty-dropdown-trigger">
                      <span style="font-weight: 600;">Xem 5 thể bài học (A, B, C, D, E)</span>
                      <i class="fa-solid fa-chevron-down specialty-dropdown-arrow"></i>
                    </div>

                    <!-- Dropdown Menu xổ ra như nút Cơ sở -->
                    <div class="specialty-dropdown-menu" role="menu" aria-label="Danh sách bài học Viêm Gan Siêu Vi">
                      <a href="#/basic-medical/cases/slb-ccbs-hav" class="specialty-dropdown-item" role="menuitem">
                        <span class="specialty-dropdown-item-icon" style="background: rgba(16, 185, 129, 0.15); color: #059669;">HAV</span>
                        <div class="specialty-dropdown-item-text">
                          <strong>Viêm Gan Siêu Vi A (HAV)</strong>
                          <span>Virion trần &amp; eHAV, apoptosis qua MAVS-IRF3/7, thâm nhiễm tương bào</span>
                        </div>
                        <i class="fa-solid fa-chevron-right"></i>
                      </a>
                      <a href="#/basic-medical/cases/slb-ccbs-hbv" class="specialty-dropdown-item" role="menuitem">
                        <span class="specialty-dropdown-item-icon" style="background: rgba(217, 119, 6, 0.15); color: #d97706;">HBV</span>
                        <div class="specialty-dropdown-item-text">
                          <strong>Viêm Gan Siêu Vi B (HBV)</strong>
                          <span>rcDNA sang cccDNA, miễn dịch APOBEC3A/3B, 4 pha EASL, HBx sinh ung</span>
                        </div>
                        <i class="fa-solid fa-chevron-right"></i>
                      </a>
                      <a href="#/basic-medical/cases/slb-ccbs-hcv" class="specialty-dropdown-item" role="menuitem">
                        <span class="specialty-dropdown-item-icon" style="background: rgba(147, 51, 234, 0.15); color: #9333ea;">HCV</span>
                        <div class="specialty-dropdown-item-text">
                          <strong>Viêm Gan Siêu Vi C (HCV)</strong>
                          <span>(+)ssRNA Quasispecies, thoái hóa mỡ MTP/SREBP-1c, sẹo biểu sinh sau DAA</span>
                        </div>
                        <i class="fa-solid fa-chevron-right"></i>
                      </a>
                      <a href="#/basic-medical/cases/slb-ccbs-hdv" class="specialty-dropdown-item" role="menuitem">
                        <span class="specialty-dropdown-item-icon" style="background: rgba(220, 38, 38, 0.15); color: #dc2626;">HDV</span>
                        <div class="specialty-dropdown-item-text">
                          <strong>Viêm Gan Siêu Vi D (HDV - Delta)</strong>
                          <span>Viroid khiếm khuyết phụ thuộc HBsAg, ribozyme tự cắt, bội nhiễm ác tính</span>
                        </div>
                        <i class="fa-solid fa-chevron-right"></i>
                      </a>
                      <a href="#/basic-medical/cases/slb-ccbs-hev" class="specialty-dropdown-item" role="menuitem">
                        <span class="specialty-dropdown-item-icon" style="background: rgba(234, 88, 12, 0.15); color: #ea580c;">HEV</span>
                        <div class="specialty-dropdown-item-text">
                          <strong>Viêm Gan Siêu Vi E (HEV)</strong>
                          <span>Quasi-enveloped, One Health 8 genotypes, suy gan cấp thai kỳ &amp; thần kinh</span>
                        </div>
                        <i class="fa-solid fa-chevron-right"></i>
                      </a>
                    </div>
                  </div>

                  <a href="#/basic-medical/cases/slb-ccbs-sxhd" class="specialty-card">
                    <div class="specialty-card-top">
                      <div class="specialty-icon"><i class="fa-solid fa-mosquito"></i></div>
                      <div class="specialty-info">
                        <h3>Sốt Xuất Huyết Dengue</h3>
                        <p>Hiện tượng ADE, tăng tính thấm thành mạch thoát huyết tương ồ ạt và xuất huyết do giảm tiểu cầu.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                  </a>

                  <a href="#/basic-medical/cases/slb-ccbs-thuy-dau" class="specialty-card">
                    <div class="specialty-card-top">
                      <div class="specialty-icon"><i class="fa-solid fa-disease"></i></div>
                      <div class="specialty-info">
                        <h3>Thủy Đậu &amp; Herpes Zoster (VZV)</h3>
                        <p>Vi rút huyết 2 pha, hướng tế bào T (CLA+/CCR4+), thoát virus tự do qua M6PR, hợp bào syncytia, biểu sinh ẩn nấp (VLT/IE63), tái hoạt Zona, đau thần kinh PHN (Nav1.8) &amp; vắc-xin Shingrix/PEP.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                  </a>
                </div>
              </div>

              <!-- 8.3. Ký sinh trùng -->
              <div class="physio-subgroup-container" id="patho-truyen-nhiem-kysinhtrung">
                <div class="physio-subgroup-header">
                  <h4 class="physio-subgroup-title">Bệnh Nhiễm Ký Sinh Trùng</h4>
                  <span class="physio-subgroup-badge">1 bài học</span>
                </div>
                <div class="specialty-grid">
                  <a href="#/basic-medical/cases/slb-ccbs-sot-ret" class="specialty-card">
                    <div class="specialty-card-top">
                      <div class="specialty-icon"><i class="fa-solid fa-temperature-arrow-up"></i></div>
                      <div class="specialty-info">
                        <h3>Bệnh Sốt Rét</h3>
                        <p>Chu kỳ hồng cầu của P. falciparum, hiện tượng kết dính hoa hồng, tắc nghẽn vi mạch não gây sốt rét thể não và suy thận cấp.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                  </a>
                </div>
              </div>
            </div>
          </section>

          <!-- 9. HỒI SỨC - CẤP CỨU -->
          <section id="patho-hoisu-section" aria-labelledby="patho-hoisu-heading" style="margin-bottom: 2rem;">
            <div class="physio-group-container">
              <div class="physio-group-header">
                <div>
                  <h3 id="patho-hoisu-heading" style="color: #dc2626;">Hồi Sức – Cấp Cứu</h3>
                  <p style="margin: 0; font-size: 0.8rem; color: var(--color-text-muted);">2 Bài ca lâm sàng – Sốc đa căn nguyên &amp; nhiễm khuẩn huyết nặng</p>
                </div>
              </div>
              <div class="specialty-grid">
                <a href="#/basic-medical/cases/slb-ccbs-sepsis" class="specialty-card" style="border-left-color: #dc2626;">
                  <div class="specialty-card-top">
                    <div class="specialty-icon" style="background: rgba(220, 38, 38, 0.12); color: #dc2626;"><i class="fa-solid fa-bacteria"></i></div>
                    <div class="specialty-info">
                      <h3>Nhiễm Khuẩn Huyết & Sốc Nhiễm Khuẩn</h3>
                      <p>Cơn bão Cytokines, giãn mạch mất trương lực, rối loạn đông máu nội quản rải rác (DIC) và suy đa tạng.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action" style="color: #dc2626;">
                    <span>Xem cơ chế</span>
                    <span style="font-size: 0.72rem; font-weight: 700; color: #dc2626; background: rgba(220,38,38,0.1); padding: 2px 6px; border-radius: 4px; display: inline-flex; align-items: center; gap: 4px;">
                      SSC Sepsis 3
                    </span>
                    <i class="fa-solid fa-chevron-right"></i>
                  </div>
                </a>
                <a href="#/basic-medical/cases/slb-ccbs-soc" class="specialty-card" style="border-left-color: #dc2626;">
                  <div class="specialty-card-top">
                    <div class="specialty-icon" style="background: rgba(220, 38, 38, 0.12); color: #dc2626;"><i class="fa-solid fa-bolt"></i></div>
                    <div class="specialty-info">
                      <h3>Sốc (Shock)</h3>
                      <p>Sốc giảm thể tích, sốc tim, sốc phân bố, sốc tắc nghẽn: Cơ chế suy giảm tưới máu mô và toan lactic.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action" style="color: #dc2626;"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
              </div>
            </div>
          </section>

          <!-- 10. THẦN KINH -->
          <section id="patho-thankinh-section" aria-labelledby="patho-thankinh-heading" style="margin-bottom: 2rem;">
            <div class="physio-group-container">
              <div class="physio-group-header">
                <div>
                  <h3 id="patho-thankinh-heading">Thần Kinh</h3>
                  <p style="margin: 0; font-size: 0.8rem; color: var(--color-text-muted);">1 Bài ca lâm sàng – Bệnh lý mạch máu não và thoái hóa thần kinh</p>
                </div>
              </div>
              <div class="specialty-grid">
                <a href="#/basic-medical/cases/slb-ccbs-dot-quy" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon"><i class="fa-solid fa-brain"></i></div>
                    <div class="specialty-info">
                      <h3>Đột Quỵ Não</h3>
                      <p>Vùng thiếu máu trung tâm, vùng tranh tối tranh sáng (Penumbra), thác nhiễm độc glutamate và phù não.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
              </div>
            </div>
          </section>

          <!-- 11. HUYẾT HỌC -->
          <section id="patho-huyethoc-section" aria-labelledby="patho-huyethoc-heading" style="margin-bottom: 2rem;">
            <div class="physio-group-container">
              <div class="physio-group-header">
                <div>
                  <h3 id="patho-huyethoc-heading">Huyết Học</h3>
                  <p style="margin: 0; font-size: 0.8rem; color: var(--color-text-muted);">1 Bài ca lâm sàng – Rối loạn đông cầm máu và bệnh lý tế bào máu</p>
                </div>
              </div>
              <div class="specialty-grid">
                <a href="#/basic-medical/cases/slb-ccbs-hemophilia" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon"><i class="fa-solid fa-vial"></i></div>
                    <div class="specialty-info">
                      <h3>Bệnh Hemophilia</h3>
                      <p>Thiếu hụt yếu tố đông máu VIII/IX di truyền lặn liên kết NST X làm suy sụp dòng thác đông máu nội sinh.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
              </div>
            </div>
          </section>

        </main>
      </div><!-- end dashboard-layout -->
    </div><!-- end main-wrapper -->
  `;
}
