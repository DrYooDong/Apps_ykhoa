/**
 * CliniPortal — Pathophysiology & Disease Mechanisms (Cơ Chế Bệnh Sinh & Sinh Lý Bệnh) SPA View
 * Path: src/content/pathophysiology/co-che-benh-sinh-view.ts
 * Giao diện kinh điển đầy đủ (Classic Hero Microscope SVG, Sticky Navigation, Live Search, Đầy đủ 28+ bài ca bệnh lý CCBS)
 * Toàn bộ liên kết dẫn trực tiếp vào SPA HTML Reader: #/pathophysiology/cases/:slug
 */

import '../../../css/components/module-dashboard.css';
import '../../../css/components/physio-content.css';
import '../../../css/components/physio-promax-hub.css';
import './css/physio-shared.css';

export function renderCoCheBenhSinhView(): string {
  return `
    <div class="promax-wrapper" id="mainContent">

      <!-- BREADCRUMB -->
      <div class="breadcrumb" style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 1.25rem;">
        <a href="#/" style="color: inherit; text-decoration: none;">🏠 Trang chủ</a> &nbsp;/&nbsp; 
        <a href="#/pathophysiology" style="color: inherit; text-decoration: none;">Cơ Sở Y Khoa</a> &nbsp;/&nbsp; 
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
                  <div class="promax-kpi-num">32+</div>
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
        <a href="#/pathophysiology/quiz" class="promax-bento-card" style="--bento-color: #10b981; --bento-bg: rgba(16,185,129,0.1);">
          <div class="promax-bento-icon"><i class="fa-solid fa-brain"></i></div>
          <div>
            <span class="promax-bento-tag">Mechanism Reasoning Hub</span>
            <h4 class="promax-bento-title">Thử Thách Ca Bệnh, Flashcards & Cascade</h4>
            <p class="promax-bento-desc">18+ Ca lâm sàng cơ chế đa chuyên khoa, 24 thẻ Spaced Repetition & Lắp ráp chuỗi logic.</p>
          </div>
        </a>

        <a href="#/pathophysiology/simulators" class="promax-bento-card" style="--bento-color: #0284c7; --bento-bg: rgba(2,132,199,0.1);">
          <div class="promax-bento-icon"><i class="fa-solid fa-bolt"></i></div>
          <div>
            <span class="promax-bento-tag">Real-Time Canvas</span>
            <h4 class="promax-bento-title">Mô Phỏng Sinh Lý Động</h4>
            <p class="promax-bento-desc">Nernst/GHK, Lực Starling phù, Frank-Starling & Thăng bằng toan kiềm.</p>
          </div>
        </a>

        <a href="#/pathophysiology/metabolic-map" class="promax-bento-card" style="--bento-color: #8b5cf6; --bento-bg: rgba(139,92,246,0.1);">
          <div class="promax-bento-icon"><i class="fa-solid fa-diagram-project"></i></div>
          <div>
            <span class="promax-bento-tag">Metabolic Studio</span>
            <h4 class="promax-bento-title">Bản Đồ Chuyển Hóa Phân Tử</h4>
            <p class="promax-bento-desc">Tra cứu trực quan 5 chu trình năng lượng, enzyme, vitamin & bệnh di truyền.</p>
          </div>
        </a>

        <a href="#/pathophysiology/formula-vault" class="promax-bento-card" style="--bento-color: #f59e0b; --bento-bg: rgba(245,158,11,0.1);">
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
            <h4 class="nav-sidebar-title">Chuyên Khoa Bệnh Học</h4>
            <ul class="part-nav-list">
              <li>
                <a href="#patho-timmach-section" class="part-nav-item p4 active" data-target="patho-timmach-section">
                  <span class="part-icon"><i class="fa-solid fa-heart-pulse"></i></span>
                  <span class="part-text">Tim mạch</span>
                  <span class="part-count-badge">4</span>
                </a>
              </li>
              <li>
                <a href="#patho-hohap-section" class="part-nav-item p1" data-target="patho-hohap-section">
                  <span class="part-icon"><i class="fa-solid fa-wind"></i></span>
                  <span class="part-text">Hô hấp</span>
                  <span class="part-count-badge">5</span>
                </a>
              </li>
              <li>
                <a href="#patho-tieuhoa-section" class="part-nav-item p5" data-target="patho-tieuhoa-section">
                  <span class="part-icon"><i class="fa-solid fa-bowl-food"></i></span>
                  <span class="part-text">Tiêu hóa</span>
                  <span class="part-count-badge">7</span>
                </a>
              </li>
              <li>
                <a href="#patho-thannieu-section" class="part-nav-item p6" data-target="patho-thannieu-section">
                  <span class="part-icon"><i class="fa-solid fa-filter"></i></span>
                  <span class="part-text">Thận - Điện giải</span>
                  <span class="part-count-badge">6</span>
                </a>
              </li>
              <li>
                <a href="#patho-noitiet-section" class="part-nav-item p7" data-target="patho-noitiet-section">
                  <span class="part-icon"><i class="fa-solid fa-venus-mars"></i></span>
                  <span class="part-text">Nội tiết</span>
                  <span class="part-count-badge">2</span>
                </a>
              </li>
              <li>
                <a href="#patho-truyen-nhiem-section" class="part-nav-item p3" data-target="patho-truyen-nhiem-section">
                  <span class="part-icon"><i class="fa-solid fa-virus-covid"></i></span>
                  <span class="part-text">Truyền nhiễm & CC</span>
                  <span class="part-count-badge">8</span>
                </a>
              </li>
              <li>
                <a href="#patho-tktt-section" class="part-nav-item p2" data-target="patho-tktt-section">
                  <span class="part-icon"><i class="fa-solid fa-brain"></i></span>
                  <span class="part-text">Thần kinh - Huyết học</span>
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
            <h3>Không tìm thấy bài học cơ chế bệnh sinh nào</h3>
            <p>Vui lòng thử từ khóa khác.</p>
          </div>

          <!-- 1. TIM MẠCH -->
          <section id="patho-timmach-section" aria-labelledby="patho-timmach-heading" style="margin-bottom: 2rem;">
            <div class="physio-group-container">
              <div class="physio-group-header">
                <span class="physio-group-icon"><i class="fa-solid fa-heart-pulse"></i></span>
                <h3 id="patho-timmach-heading">Tim Mạch</h3>
              </div>
              <div class="specialty-grid">
                <a href="#/pathophysiology/cases/slb-ccbs-acs" class="specialty-card">
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
                      <i class="fa-solid fa-book-bookmark"></i> ESC 2023 ACS
                    </span>
                    <i class="fa-solid fa-chevron-right"></i>
                  </div>
                </a>
                <a href="#/pathophysiology/cases/slb-ccbs-st" class="specialty-card">
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
                      <i class="fa-solid fa-book-bookmark"></i> ESC HF 2023
                    </span>
                    <i class="fa-solid fa-chevron-right"></i>
                  </div>
                </a>
                <a href="#/pathophysiology/cases/slb-ccbs-tha" class="specialty-card">
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
                      <i class="fa-solid fa-book-bookmark"></i> ISH 2024
                    </span>
                    <i class="fa-solid fa-chevron-right"></i>
                  </div>
                </a>
                <a href="#/pathophysiology/cases/slb-ccbs-ccs" class="specialty-card">
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
          </section>

          <!-- 2. HÔ HẤP -->
          <section id="patho-hohap-section" aria-labelledby="patho-hohap-heading" style="margin-bottom: 2rem;">
            <div class="physio-group-container">
              <div class="physio-group-header">
                <span class="physio-group-icon"><i class="fa-solid fa-wind"></i></span>
                <h3 id="patho-hohap-heading">Hô Hấp</h3>
              </div>
              <div class="specialty-grid">
                <a href="#/pathophysiology/cases/slb-ccbs-suy-ho-hap" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon"><i class="fa-solid fa-lungs"></i></div>
                    <div class="specialty-info">
                      <h3>Suy Hô Hấp Cấp</h3>
                      <p>Tổn thương màng phế nang mao mạch lan tỏa, tăng tính thấm, phù phổi không do tim và shunt nội phổi nặng.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/pathophysiology/cases/slb-ccbs-copd" class="specialty-card">
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
                      <i class="fa-solid fa-book-bookmark"></i> GOLD 2025 / BYT
                    </span>
                    <i class="fa-solid fa-chevron-right"></i>
                  </div>
                </a>
                <a href="#/pathophysiology/cases/slb-ccbs-henpq" class="specialty-card">
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
                      <i class="fa-solid fa-book-bookmark"></i> GINA 2024
                    </span>
                    <i class="fa-solid fa-chevron-right"></i>
                  </div>
                </a>
                <a href="#/pathophysiology/cases/slb-ccbs-vp" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon"><i class="fa-solid fa-virus"></i></div>
                    <div class="specialty-info">
                      <h3>Viêm Phổi</h3>
                      <p>Xâm nhập phế nang của vi khuẩn, phản ứng viêm đông đặc rỉ dịch xuất tiết và suy giảm trao đổi khí.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/pathophysiology/cases/slb-ccbs-vtpq" class="specialty-card">
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
          </section>

          <!-- 3. TIÊU HÓA -->
          <section id="patho-tieuhoa-section" aria-labelledby="patho-tieuhoa-heading" style="margin-bottom: 2rem;">
            <div class="physio-group-container">
              <div class="physio-group-header">
                <span class="physio-group-icon"><i class="fa-solid fa-bowl-food"></i></span>
                <h3 id="patho-tieuhoa-heading">Tiêu Hóa</h3>
              </div>
              <div class="specialty-grid">
                <a href="#/pathophysiology/cases/slb-ccbs-xg" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon"><i class="fa-solid fa-disease"></i></div>
                    <div class="specialty-info">
                      <h3>Xơ Gan</h3>
                      <p>Hoạt hóa tế bào Kupffer và tế bào hình sao (HSCs), sinh bệnh học báng bụng, tuần hoàn tăng động giãn tạng và suy giảm chuyển hóa.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/pathophysiology/cases/slb-ccbs-xhth-tren" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon"><i class="fa-solid fa-droplet"></i></div>
                    <div class="specialty-info">
                      <h3>Xuất Huyết Tiêu Hóa Trên (UGIB)</h3>
                      <p>Vỡ giãn tĩnh mạch thực quản do tăng áp cửa & loét dạ dày tá tràng bào mòn mạch máu dưới niêm mạc.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/pathophysiology/cases/slb-ccbs-xhth-duoi" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon"><i class="fa-solid fa-droplet"></i></div>
                    <div class="specialty-info">
                      <h3>Xuất Huyết Tiêu Hóa Dưới (LGIB)</h3>
                      <p>Cơ chế chảy máu do túi thừa đại tràng, loạn sản mạch máu (Angiodysplasia), viêm đại tràng thiếu máu cục bộ và trĩ nội.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/pathophysiology/cases/slb-ccbs-vtc" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon"><i class="fa-solid fa-fire"></i></div>
                    <div class="specialty-info">
                      <h3>Viêm Tụy Cấp</h3>
                      <p>Tự tiêu hủy mô tụy do hoạt hóa sớm men Trypsinogen nội bào, phóng thích Cytokines gây phản ứng viêm hệ thống SIRS.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/pathophysiology/cases/slb-ccbs-gerd" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon"><i class="fa-solid fa-arrows-up-down"></i></div>
                    <div class="specialty-info">
                      <h3>Trào Ngược Dạ Dày Thực Quản (GERD)</h3>
                      <p>Giãn thoáng qua cơ thắt thực quản dưới (TLESR) và tổn thương biểu mô vảy do acid/pepsin dịch vị.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/pathophysiology/cases/slb-ccbs-ibd" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon"><i class="fa-solid fa-shield-halved"></i></div>
                    <div class="specialty-info">
                      <h3>Bệnh Viêm Ruột Mạn Tính (IBD)</h3>
                      <p>Rối loạn đáp ứng miễn dịch niêm mạc ruột với hệ vi sinh vật trên cơ địa di truyền mẫn cảm.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/pathophysiology/cases/slb-ccbs-ibs" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon"><i class="fa-solid fa-brain"></i></div>
                    <div class="specialty-info">
                      <h3>Hội Chứng Ruột Kích Thích (IBS)</h3>
                      <p>Rối loạn tương tác trục Não - Ruột (Gut-Brain Axis), tăng nhạy cảm nội tạng và rối loạn vận động ống tiêu hóa.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
              </div>
            </div>
          </section>

          <!-- 4. THẬN - ĐIỆN GIẢI - TOAN KIỀM -->
          <section id="patho-thannieu-section" aria-labelledby="patho-thannieu-heading" style="margin-bottom: 2rem;">
            <div class="physio-group-container">
              <div class="physio-group-header">
                <span class="physio-group-icon"><i class="fa-solid fa-filter"></i></span>
                <h3 id="patho-thannieu-heading">Thận – Điện Giải – Toan Kiềm</h3>
              </div>
              <div class="specialty-grid">
                <a href="#/pathophysiology/cases/slb-ccbs-aki" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon"><i class="fa-solid fa-triangle-exclamation"></i></div>
                    <div class="specialty-info">
                      <h3>Tổn Thương Thận Cấp (AKI)</h3>
                      <p>Giảm tưới máu trước thận, hoại tử ống thận cấp (ATN) do thiếu máu/độc chất và rối loạn ty thể.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/pathophysiology/cases/slb-ccbs-ckd" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon"><i class="fa-solid fa-clock-rotate-left"></i></div>
                    <div class="specialty-info">
                      <h3>Bệnh Thận Mạn (CKD)</h3>
                      <p>Thích ứng tăng lọc cầu thận và sụp đổ nội môi, xơ hóa cầu thận tiến triển, loãng xương do thận và giảm tiết EPO.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/pathophysiology/cases/slb-ccbs-rl-kali" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon"><i class="fa-solid fa-vial-circle-check"></i></div>
                    <div class="specialty-info">
                      <h3>Rối Loạn Kali Máu (Hypo/Hyperkalemia)</h3>
                      <p>Phân bố khoang dịch, vai trò Magne, cơ chế hạ/tăng K+, biến đổi ECG tuần tự (sóng hình sin), hội chứng BRASH và 3 trục cấp cứu.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/pathophysiology/cases/slb-ccbs-rl-natri" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon"><i class="fa-solid fa-droplet"></i></div>
                    <div class="specialty-info">
                      <h3>Rối Loạn Natri Máu (Hypo/Hypernatremia)</h3>
                      <p>Áp lực thẩm thấu &amp; trương lực, trục AVP/Aquaporin-2, thích nghi tế bào não, hội chứng ODS, SIADH vs CSW, Đái tháo nhạt và bù an toàn.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/pathophysiology/cases/slb-ccbs-rl-canxi" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon"><i class="fa-solid fa-bone"></i></div>
                    <div class="specialty-info">
                      <h3>Rối Loạn Canxi Máu (Hypo/Hypercalcemia)</h3>
                      <p>Canxi ion hóa vs Albumin, thụ thể CaSR, trục PTH &ndash; Calcitriol, u tuyến cận giáp PHPT, FHH, dấu Chvostek &amp; Trousseau, biến đổi QT trên ECG.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/pathophysiology/cases/slb-ccbs-rl-phosphat" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon"><i class="fa-solid fa-bolt"></i></div>
                    <div class="specialty-info">
                      <h3>Rối Loạn Phosphat Máu (Hypo/Hyperphosphatemia)</h3>
                      <p>Trục PTH &ndash; FGF-23, kênh NaPi, hội chứng nuôi ăn lại Refeeding, thiếu ATP cơ hoành thất bại cai máy thở, tích số Ca &times; P &ge; 55 &amp; vôi hóa mạch máu.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
              </div>
            </div>
          </section>

          <!-- 5. NỘI TIẾT & SẢN KHOA -->
          <section id="patho-noitiet-section" aria-labelledby="patho-noitiet-heading" style="margin-bottom: 2rem;">
            <div class="physio-group-container">
              <div class="physio-group-header">
                <span class="physio-group-icon"><i class="fa-solid fa-venus-mars"></i></span>
                <h3 id="patho-noitiet-heading">Nội Tiết & Sản Khoa</h3>
              </div>
              <div class="specialty-grid">
                <a href="#/pathophysiology/cases/slb-ccbs-dtd" class="specialty-card">
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
                      <i class="fa-solid fa-book-bookmark"></i> ADA 2024
                    </span>
                    <i class="fa-solid fa-chevron-right"></i>
                  </div>
                </a>
                <a href="#/pathophysiology/cases/slb-ccbs-tsg" class="specialty-card">
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

          <!-- 6. TRUYỀN NHIỄM & HỒI SỨC CẤP CỨU -->
          <section id="patho-truyen-nhiem-section" aria-labelledby="patho-truyen-nhiem-heading" style="margin-bottom: 2rem;">
            <div class="physio-group-container">
              <div class="physio-group-header">
                <span class="physio-group-icon"><i class="fa-solid fa-virus-covid"></i></span>
                <h3 id="patho-truyen-nhiem-heading">Truyền Nhiễm & Cấp Cứu</h3>
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
                        <a href="#/pathophysiology/cases/slb-ccbs-hav" class="hep-pill pill-a" title="Viêm Gan A (HAV)">A</a>
                        <a href="#/pathophysiology/cases/slb-ccbs-hbv" class="hep-pill pill-b" title="Viêm Gan B (HBV)">B</a>
                        <a href="#/pathophysiology/cases/slb-ccbs-hcv" class="hep-pill pill-c" title="Viêm Gan C (HCV)">C</a>
                        <a href="#/pathophysiology/cases/slb-ccbs-hdv" class="hep-pill pill-d" title="Viêm Gan D (HDV)">D</a>
                        <a href="#/pathophysiology/cases/slb-ccbs-hev" class="hep-pill pill-e" title="Viêm Gan E (HEV)">E</a>
                      </div>
                    </div>
                  </div>
                  <div class="specialty-card-action specialty-dropdown-trigger">
                    <span style="font-weight: 600;">Xem 5 thể bài học (A, B, C, D, E)</span>
                    <i class="fa-solid fa-chevron-down specialty-dropdown-arrow"></i>
                  </div>

                  <!-- Dropdown Menu xổ ra như nút Cơ sở -->
                  <div class="specialty-dropdown-menu" role="menu" aria-label="Danh sách bài học Viêm Gan Siêu Vi">
                    <a href="#/pathophysiology/cases/slb-ccbs-hav" class="specialty-dropdown-item" role="menuitem">
                      <span class="specialty-dropdown-item-icon" style="background: rgba(16, 185, 129, 0.15); color: #059669;">🛡️</span>
                      <div class="specialty-dropdown-item-text">
                        <strong>Viêm Gan Siêu Vi A (HAV)</strong>
                        <span>Virion trần &amp; eHAV, apoptosis qua MAVS-IRF3/7, thâm nhiễm tương bào</span>
                      </div>
                      <i class="fa-solid fa-chevron-right"></i>
                    </a>
                    <a href="#/pathophysiology/cases/slb-ccbs-hbv" class="specialty-dropdown-item" role="menuitem">
                      <span class="specialty-dropdown-item-icon" style="background: rgba(217, 119, 6, 0.15); color: #d97706;">🧬</span>
                      <div class="specialty-dropdown-item-text">
                        <strong>Viêm Gan Siêu Vi B (HBV)</strong>
                        <span>rcDNA sang cccDNA, miễn dịch APOBEC3A/3B, 4 pha EASL, HBx sinh ung</span>
                      </div>
                      <i class="fa-solid fa-chevron-right"></i>
                    </a>
                    <a href="#/pathophysiology/cases/slb-ccbs-hcv" class="specialty-dropdown-item" role="menuitem">
                      <span class="specialty-dropdown-item-icon" style="background: rgba(147, 51, 234, 0.15); color: #9333ea;">🔬</span>
                      <div class="specialty-dropdown-item-text">
                        <strong>Viêm Gan Siêu Vi C (HCV)</strong>
                        <span>(+)ssRNA Quasispecies, thoái hóa mỡ MTP/SREBP-1c, sẹo biểu sinh sau DAA</span>
                      </div>
                      <i class="fa-solid fa-chevron-right"></i>
                    </a>
                    <a href="#/pathophysiology/cases/slb-ccbs-hdv" class="specialty-dropdown-item" role="menuitem">
                      <span class="specialty-dropdown-item-icon" style="background: rgba(220, 38, 38, 0.15); color: #dc2626;">⚡</span>
                      <div class="specialty-dropdown-item-text">
                        <strong>Viêm Gan Siêu Vi D (HDV - Delta)</strong>
                        <span>Viroid khiếm khuyết phụ thuộc HBsAg, ribozyme tự cắt, bội nhiễm ác tính</span>
                      </div>
                      <i class="fa-solid fa-chevron-right"></i>
                    </a>
                    <a href="#/pathophysiology/cases/slb-ccbs-hev" class="specialty-dropdown-item" role="menuitem">
                      <span class="specialty-dropdown-item-icon" style="background: rgba(234, 88, 12, 0.15); color: #ea580c;">⚠️</span>
                      <div class="specialty-dropdown-item-text">
                        <strong>Viêm Gan Siêu Vi E (HEV)</strong>
                        <span>Quasi-enveloped, One Health 8 genotypes, suy gan cấp thai kỳ &amp; thần kinh</span>
                      </div>
                      <i class="fa-solid fa-chevron-right"></i>
                    </a>
                  </div>
                </div>

                <a href="#/pathophysiology/cases/slb-ccbs-sepsis" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon"><i class="fa-solid fa-bacteria"></i></div>
                    <div class="specialty-info">
                      <h3>Nhiễm Khuẩn Huyết & Sốc Nhiễm Khuẩn</h3>
                      <p>Cơn bão Cytokines, giãn mạch mất trương lực, rối loạn đông máu nội quản rải rác (DIC) và suy đa tạng.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action">
                    <span>Xem cơ chế</span>
                    <span style="font-size: 0.72rem; font-weight: 700; color: #0284c7; background: rgba(2,132,199,0.1); padding: 2px 6px; border-radius: 4px; display: inline-flex; align-items: center; gap: 4px;">
                      <i class="fa-solid fa-book-bookmark"></i> SSC Sepsis 3
                    </span>
                    <i class="fa-solid fa-chevron-right"></i>
                  </div>
                </a>
                <a href="#/pathophysiology/cases/slb-ccbs-soc" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon"><i class="fa-solid fa-bolt"></i></div>
                    <div class="specialty-info">
                      <h3>Sốc (Shock)</h3>
                      <p>Sốc giảm thể tích, sốc tim, sốc phân bố, sốc tắc nghẽn: Cơ chế suy giảm tưới máu mô và toan lactic.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/pathophysiology/cases/slb-ccbs-sxhd" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon"><i class="fa-solid fa-mosquito"></i></div>
                    <div class="specialty-info">
                      <h3>Sốt Xuất Huyết Dengue</h3>
                      <p>Hiện tượng ADE, tăng tính thấm thành mạch thoát huyết tương ồ ạt và xuất huyết do giảm tiểu cầu.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/pathophysiology/cases/slb-ccbs-lao" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon"><i class="fa-solid fa-shield-virus"></i></div>
                    <div class="specialty-info">
                      <h3>Bệnh Lao</h3>
                      <p>Sinh bệnh học vi khuẩn lao Mycobacterium tuberculosis, đáp ứng miễn dịch tế bào qua Lympho T, tạo nang lao bã đậu và hang lao.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/pathophysiology/cases/slb-ccbs-sot-ret" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon"><i class="fa-solid fa-temperature-arrow-up"></i></div>
                    <div class="specialty-info">
                      <h3>Bệnh Sốt Rét</h3>
                      <p>Chu kỳ hồng cầu của P. falciparum, hiện tượng kết dính hoa hồng, tắc nghẽn vi mạch não gây sốt rét thể não và suy thận cấp.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/pathophysiology/cases/slb-ccbs-bach-hau" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon"><i class="fa-solid fa-skull-crossbones"></i></div>
                    <div class="specialty-info">
                      <h3>Bệnh Bạch Hầu</h3>
                      <p>Ngoại độc tố Diphtheria toxin ức chế tổng hợp protein tế bào qua ADP-ribosyl hóa EF-2, giả mạc thanh quản và viêm cơ tim nhiễm độc.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/pathophysiology/cases/slb-ccbs-thuy-dau" class="specialty-card">
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
          </section>

          <!-- 7. THẦN KINH & HUYẾT HỌC -->
          <section id="patho-tktt-section" aria-labelledby="patho-tktt-heading" style="margin-bottom: 2rem;">
            <div class="physio-group-container">
              <div class="physio-group-header">
                <span class="physio-group-icon"><i class="fa-solid fa-brain"></i></span>
                <h3 id="patho-tktt-heading">Thần Kinh & Huyết Học</h3>
              </div>
              <div class="specialty-grid">
                <a href="#/pathophysiology/cases/slb-ccbs-dot-quy" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon"><i class="fa-solid fa-brain"></i></div>
                    <div class="specialty-info">
                      <h3>Đột Quỵ Não</h3>
                      <p>Vùng thiếu máu trung tâm, vùng tranh tối tranh sáng (Penumbra), thác nhiễm độc glutamate và phù não.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/pathophysiology/cases/slb-ccbs-hemophilia" class="specialty-card">
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
