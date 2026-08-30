/**
 * CliniPortal — Anatomy & Physiology (Giải Phẫu & Sinh Lý Học) SPA View
 * Path: src/content/pathophysiology/giai-phau-sinh-ly-view.ts
 * Giao diện kinh điển đầy đủ (Classic Hero DNA Helix SVG, Sticky Part-Nav 9 Phần, bao gồm Phần 9: Nhi khoa)
 * Toàn bộ liên kết bài học dẫn trực tiếp vào SPA HTML Reader: #/basic-medical/physiology/:part/:slug
 */

import '../../../styles/components/module-dashboard.css';
import '../../../styles/components/physio-content.css';
import '../../../styles/components/formula-vault.css';
import '../../../styles/components/physio-promax-hub.css';
import '../../../styles/components/epidemiology-hub.css';
import { renderBasicMedicalNav } from './basic-medical-nav';

export function renderGiaiPhauSinhLyView(): string {
  return `
    <div class="promax-wrapper" id="mainContent">

      <!-- BREADCRUMB -->
      <div class="breadcrumb" style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 1.25rem;">
        <a href="#/" style="color: inherit; text-decoration: none;">🏠 Trang chủ</a> &nbsp;/&nbsp; 
        <a href="#/basic-medical" style="color: inherit; text-decoration: none;">Basic Medical Sciences</a> &nbsp;/&nbsp; 
        <span style="color: var(--color-primary, #0284c7); font-weight: 600;">Giải Phẫu & Sinh Lý Học (GP - SL)</span>
      </div>

      <!-- UNIVERSAL STICKY SUB-NAV -->
      ${renderBasicMedicalNav('giai-phau-sinh-ly')}

      <!-- PROMAX LUXURY HERO SECTION -->
      <section class="promax-hero hero-physio-theme" aria-labelledby="hero-title">
        <div class="promax-hero-grid">
          <div>
            <div class="promax-badge">
              <i class="fa-solid fa-dna" style="color: #38bdf8;"></i>
              <span>Anatomy & Physiology Core Engine • Multi-Specialty</span>
            </div>
            
            <h1 class="promax-title" id="hero-title">
              GIẢI PHẬU & SINH LÝ HỌC THEO HỆ CƠ QUAN
            </h1>
            
            <p class="promax-desc">
              Cơ sở dữ liệu tích hợp sâu 9 hệ cơ quan (bao gồm Sinh lý Nhi khoa & Sản khoa lâm sàng). Bản đồ tư duy trực quan hóa chức năng tế bào, tương tác cơ quan và ứng dụng lâm sàng gắn kết.
            </p>

            <!-- Promax Dynamic Mini KPI Chips -->
            <div class="promax-hero-kpis">
              <div class="promax-kpi-chip">
                <i class="fa-solid fa-layer-group promax-kpi-icon" style="color: #38bdf8;"></i>
                <div>
                  <div class="promax-kpi-num">9</div>
                  <div class="promax-kpi-lbl">Hệ Cơ Quan</div>
                </div>
              </div>
              <div class="promax-kpi-chip">
                <i class="fa-solid fa-book-medical promax-kpi-icon" style="color: #34d399;"></i>
                <div>
                  <div class="promax-kpi-num">48+</div>
                  <div class="promax-kpi-lbl">Chuyên Đề Sinh Lý</div>
                </div>
              </div>
              <div class="promax-kpi-chip">
                <i class="fa-solid fa-child-reaching promax-kpi-icon" style="color: #fbbf24;"></i>
                <div>
                  <div class="promax-kpi-num">Peds &amp; Obs</div>
                  <div class="promax-kpi-lbl">Nhi &amp; Sản Chuyên Biệt</div>
                </div>
              </div>
              <div class="promax-kpi-chip">
                <i class="fa-solid fa-microchip promax-kpi-icon" style="color: #a78bfa;"></i>
                <div>
                  <div class="promax-kpi-num">Interactive</div>
                  <div class="promax-kpi-lbl">Mô Phỏng &amp; Flashcards</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Hero Vector Artwork -->
          <div class="tcm-hero-decor" style="display: flex; align-items: center; justify-content: center;">
            <svg class="dna-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 140px; height: 140px; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.2));">
              <path d="M20 20 Q50 50 80 20" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round" fill="none" />
              <path d="M20 80 Q50 50 80 80" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round" fill="none" />
              <line x1="30" y1="28" x2="30" y2="72" stroke="#ffffff" stroke-width="2.5" stroke-dasharray="3 3" />
              <line x1="50" y1="46" x2="50" y2="54" stroke="#ffffff" stroke-width="3" />
              <line x1="70" y1="28" x2="70" y2="72" stroke="#ffffff" stroke-width="2.5" stroke-dasharray="3 3" />
              <circle cx="20" cy="20" r="6" fill="#ffffff" />
              <circle cx="80" cy="80" r="6" fill="#ffffff" />
              <circle cx="20" cy="80" r="6" fill="#38bdf8" />
              <circle cx="80" cy="20" r="6" fill="#38bdf8" />
            </svg>
          </div>
        </div>
      </section>

      <!-- COMPACT ISOLATED TOOLKIT SUITE (GÓC CÔNG CỤ SINH LÝ TINH GỌN) -->
      <div class="epi-compact-toolkit-bar" aria-label="Bộ công cụ sinh lý học tương tác">
        <div class="epi-toolkit-badge">
          <i class="fa-solid fa-toolbox" style="color: var(--color-primary, #0284c7); font-size: 1rem;"></i>
          <span>Bộ Công Cụ Hỗ Trợ Sinh Lý:</span>
        </div>
        <div class="epi-toolkit-pills">
          <a href="#/basic-medical/simulators" class="epi-tool-pill-btn tool-sim" title="Phòng thí nghiệm Nernst/GHK, Lực Starling, Frank-Starling & Toan kiềm">
            <i class="fa-solid fa-bolt" style="color: #0284c7;"></i>
            <span>Mô Phỏng Sinh Lý Động</span>
          </a>
          <a href="#/basic-medical/metabolic-map" class="epi-tool-pill-btn tool-metabolic" title="Khám phá 5 chu trình năng lượng, tra cứu enzyme, vitamin & đích thuốc">
            <i class="fa-solid fa-diagram-project" style="color: #8b5cf6;"></i>
            <span>Bản Đồ Chuyển Hóa Phân Tử</span>
          </a>
          <a href="#/basic-medical/quiz" class="epi-tool-pill-btn tool-quiz" title="Luyện tập chuỗi cơ chế bệnh sinh và Spaced Repetition 3D thẻ lật">
            <i class="fa-solid fa-brain" style="color: #10b981;"></i>
            <span>Thử Thách Ca Bệnh &amp; Flashcards</span>
          </a>
          <a href="#/basic-medical/formula-vault" class="epi-tool-pill-btn tool-formula" title="Cơ sở dữ liệu phương trình Nernst, Fick, Starling, GHK kèm máy tính">
            <i class="fa-solid fa-calculator" style="color: #f59e0b;"></i>
            <span>Kho Công Thức Định Lượng</span>
          </a>
        </div>
      </div>

      <!-- PROMAX TOOLBAR & SEARCH -->
      <div class="promax-toolbar">
        <div class="promax-search-wrap">
          <i class="fa-solid fa-magnifying-glass promax-search-icon"></i>
          <input type="text" id="lesson-search" class="promax-search-input" placeholder="Tìm kiếm bài giảng (Tim mạch, Hô hấp, Nhi khoa, Sản khoa, Thần kinh...)..." aria-label="Tìm kiếm bài học">
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
        <aside class="layout-nav-sidebar" aria-label="Danh mục phần học">
          <div class="nav-sidebar-sticky" id="physio-nav">
            <div class="nav-sidebar-header">
              <div class="nav-sidebar-title-wrap">
                <i class="fa-solid fa-layer-group nav-sidebar-header-icon"></i>
                <span>Hệ Thống Cơ Quan</span>
              </div>
              <span class="nav-sidebar-total-badge">9 Hệ cơ quan</span>
            </div>
            <ul class="part-nav-list">
              <li>
                <a href="#part1-section" class="part-nav-item p1 active" data-target="part1-section">
                  <div class="part-nav-left">
                    <span class="part-icon"><i class="fa-solid fa-microscope"></i></span>
                    <span class="part-text">1. Hệ Đại cương & Tế bào</span>
                  </div>
                  <span class="part-count-badge">3</span>
                </a>
              </li>
              <li>
                <a href="#part2-section" class="part-nav-item p2" data-target="part2-section">
                  <div class="part-nav-left">
                    <span class="part-icon"><i class="fa-solid fa-brain"></i></span>
                    <span class="part-text">2. Hệ Thần kinh & Cơ</span>
                  </div>
                  <span class="part-count-badge">8</span>
                </a>
              </li>
              <li>
                <a href="#part3-section" class="part-nav-item p3" data-target="part3-section">
                  <div class="part-nav-left">
                    <span class="part-icon"><i class="fa-solid fa-droplet"></i></span>
                    <span class="part-text">3. Hệ Máu & Miễn dịch</span>
                  </div>
                  <span class="part-count-badge">5</span>
                </a>
              </li>
              <li>
                <a href="#part4-section" class="part-nav-item p4" data-target="part4-section">
                  <div class="part-nav-left">
                    <span class="part-icon"><i class="fa-solid fa-heart-pulse"></i></span>
                    <span class="part-text">4. Hệ Tim mạch & Hô hấp</span>
                  </div>
                  <span class="part-count-badge">6</span>
                </a>
              </li>
              <li>
                <a href="#part5-section" class="part-nav-item p5" data-target="part5-section">
                  <div class="part-nav-left">
                    <span class="part-icon"><i class="fa-solid fa-bowl-food"></i></span>
                    <span class="part-text">5. Hệ Tiêu hóa & Chuyển hóa</span>
                  </div>
                  <span class="part-count-badge">6</span>
                </a>
              </li>
              <li>
                <a href="#part6-section" class="part-nav-item p6" data-target="part6-section">
                  <div class="part-nav-left">
                    <span class="part-icon"><i class="fa-solid fa-filter"></i></span>
                    <span class="part-text">6. Hệ Thận & Dịch cơ thể</span>
                  </div>
                  <span class="part-count-badge">4</span>
                </a>
              </li>
              <li>
                <a href="#part7-section" class="part-nav-item p7" data-target="part7-section">
                  <div class="part-nav-left">
                    <span class="part-icon"><i class="fa-solid fa-venus-mars"></i></span>
                    <span class="part-text">7. Hệ Nội tiết & Sinh sản</span>
                  </div>
                  <span class="part-count-badge">6</span>
                </a>
              </li>
              <li>
                <a href="#part8-section" class="part-nav-item p8" data-target="part8-section">
                  <div class="part-nav-left">
                    <span class="part-icon"><i class="fa-solid fa-person-pregnant"></i></span>
                    <span class="part-text">8. Hệ Sản phụ khoa</span>
                  </div>
                  <span class="part-count-badge">2</span>
                </a>
              </li>
              <li>
                <a href="#part9-section" class="part-nav-item p9" data-target="part9-section">
                  <div class="part-nav-left">
                    <span class="part-icon"><i class="fa-solid fa-baby"></i></span>
                    <span class="part-text">9. Hệ Nhi khoa</span>
                  </div>
                  <span class="part-count-badge">5</span>
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
            <h3>Không tìm thấy bài học nào</h3>
            <p>Vui lòng thử từ khóa khác.</p>
          </div>

          <!-- PHẦN 1: ĐẠI CƯƠNG & TẾ BÀO -->
          <section id="part1-section" aria-labelledby="part1-heading" style="margin-bottom: 2rem;">
            <div class="physio-group-container">
              <div class="physio-group-header">
                <span class="physio-group-icon"><i class="fa-solid fa-microscope"></i></span>
                <h3 id="part1-heading">Phần 1: Đại Cương & Sinh Lý Tế Bào</h3>
              </div>
              <div class="specialty-grid">
                <a href="#/basic-medical/physiology/part1/sl-tb-daicuong-tb" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon"><i class="fa-solid fa-scale-balanced"></i></div>
                    <div class="specialty-info">
                      <h3>Đại Cương Sinh Lý Học & Cân Bằng Nội Môi</h3>
                      <p>Khái niệm môi trường bên trong cơ thể, cơ chế điều hòa ngược âm tính và dương tính giúp duy trì cân bằng nội môi.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/basic-medical/physiology/part1/sl-tb-mangtebao" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon"><i class="fa-solid fa-circle-nodes"></i></div>
                    <div class="specialty-info">
                      <h3>Sinh Lý Màng Tế Bào & Vận Chuyển Vật Chất</h3>
                      <p>Cơ chế khuếch tán thụ động, vận chuyển tích cực chủ động, thụ động và vai trò quyết định của các kênh ion màng.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/basic-medical/physiology/part1/sl-tb-diensinhly" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon"><i class="fa-solid fa-bolt"></i></div>
                    <div class="specialty-info">
                      <h3>Điện Thế Màng & Điện Thế Hoạt Động</h3>
                      <p>Điện thế nghỉ (Nernst, GHK), sự khử cực, tái cực và cơ chế phát sinh, lan truyền xung động qua màng tế bào.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
              </div>
            </div>
          </section>

          <!-- PHẦN 2: THẦN KINH & CƠ -->
          <section id="part2-section" aria-labelledby="part2-heading" style="margin-bottom: 2rem;">
            <div class="physio-group-container">
              <div class="physio-group-header">
                <span class="physio-group-icon"><i class="fa-solid fa-brain"></i></span>
                <h3 id="part2-heading">Phần 2: Sinh Lý Học Hệ Thần Kinh & Cơ</h3>
              </div>
              <div class="specialty-grid">
                <a href="#/basic-medical/physiology/part2/sl-synapse" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon"><i class="fa-solid fa-network-wired"></i></div>
                    <div class="specialty-info">
                      <h3>Dẫn Truyền Qua Synapse & Chất Dẫn Truyền TK</h3>
                      <p>Cơ chế giải phóng chất truyền đạt hóa học qua exocytosis, EPSP, IPSP và vai trò của các thụ thể hậu synapse.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/basic-medical/physiology/part2/sl-coxuong" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon"><i class="fa-solid fa-dumbbell"></i></div>
                    <div class="specialty-info">
                      <h3>Sinh Lý Co Cơ Xương & Khớp Thần Kinh-Cơ</h3>
                      <p>Cơ chế trượt sợi Actin và Myosin, vai trò của ion Ca2+, hệ thống ống T và năng lượng ATP trong co cơ.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/basic-medical/physiology/part2/sl-cotron-cotim" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon"><i class="fa-solid fa-heart-pulse"></i></div>
                    <div class="specialty-info">
                      <h3>Sinh Lý Co Cơ Trơn & Cơ Tim</h3>
                      <p>Cơ chế co cơ đặc thù ở tạng phủ và cơ tim, vai trò của liên kết khe (gap junctions) và hoạt động tự phát.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/basic-medical/physiology/part2/sl-tuygai" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon"><i class="fa-solid fa-bezier-curve"></i></div>
                    <div class="specialty-info">
                      <h3>Chức Năng Phản Xạ & Dẫn Truyền Của Tủy Gai</h3>
                      <p>Cung phản xạ tủy, đường dẫn truyền cảm giác hướng tâm và đường vận động ly tâm qua tủy sống.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/basic-medical/physiology/part2/sl-thannao-tieunao-hachnen" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon"><i class="fa-solid fa-yin-yang"></i></div>
                    <div class="specialty-info">
                      <h3>Thân Não, Tiểu Não & Các Hạch Nền Não</h3>
                      <p>Hệ thống điều hòa trương lực cơ, thăng bằng tư thế và cơ chế kiểm soát, khởi phát cử động tự ý.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/basic-medical/physiology/part2/sl-vonao-chucnangtkcaocap" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon"><i class="fa-solid fa-lightbulb"></i></div>
                    <div class="specialty-info">
                      <h3>Vỏ Não & Các Chức Năng Thần Kinh Cao Cấp</h3>
                      <p>Các vùng nhận thức, ngôn ngữ (Wernicke, Broca), quá trình hình thành trí nhớ và chu kỳ thức ngủ.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/basic-medical/physiology/part2/sl-thankinh-tuchu" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon"><i class="fa-solid fa-shield-halved"></i></div>
                    <div class="specialty-info">
                      <h3>Hệ Thần Kinh Tự Chủ (Giao Cảm & Đối Giao Cảm)</h3>
                      <p>Hoạt động điều hòa chức năng các cơ quan nội tạng của hệ giao cảm (Sympathetic) và phó giao cảm (Parasympathetic).</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/basic-medical/physiology/part2/sl-giacquan" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon"><i class="fa-solid fa-eye"></i></div>
                    <div class="specialty-info">
                      <h3>Sinh Lý Các Giác Quan (Thị Giác, Thính Giác...)</h3>
                      <p>Cơ chế tiếp nhận kích thích, dẫn truyền và phân tích cảm giác thị giác, thính giác, vị giác và khứu giác.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
              </div>
            </div>
          </section>

          <!-- PHẦN 3: MÁU & MIỄN DỊCH -->
          <section id="part3-section" aria-labelledby="part3-heading" style="margin-bottom: 2rem;">
            <div class="physio-group-container">
              <div class="physio-group-header">
                <span class="physio-group-icon"><i class="fa-solid fa-droplet"></i></span>
                <h3 id="part3-heading">Phần 3: Sinh Lý Máu & Hệ Miễn Dịch</h3>
              </div>
              <div class="specialty-grid">
                <a href="#/basic-medical/physiology/part3/sl-hemau-huyethoc" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon"><i class="fa-solid fa-droplet"></i></div>
                    <div class="specialty-info">
                      <h3>Đại Cương Về Máu & Thành Phần Huyết Tương</h3>
                      <p>Thành phần tế bào và huyết tương, chức năng sinh lý của máu, áp suất keo và độ nhớt của máu.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/basic-medical/physiology/part3/sl-hongcau" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon"><i class="fa-solid fa-circle"></i></div>
                    <div class="specialty-info">
                      <h3>Sinh Lý Hồng Cầu & Chuyển Hóa Hemoglobin</h3>
                      <p>Quá trình sinh hồng cầu, vai trò của sắt và Erythropoietin (EPO), cấu trúc Hb và chức năng vận chuyển oxy.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/basic-medical/physiology/part3/sl-bachcau-mien-dich" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon"><i class="fa-solid fa-shield-virus"></i></div>
                    <div class="specialty-info">
                      <h3>Bạch Cầu & Cơ Chế Miễn Dịch (Tự Nhiên & Thích Ứng)</h3>
                      <p>Quá trình sinh bạch cầu, hiện tượng xuyên mạch, thực bào và vai trò của các tế bào lympho T/B.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/basic-medical/physiology/part3/sl-tieucaucammau" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon"><i class="fa-solid fa-bandage"></i></div>
                    <div class="specialty-info">
                      <h3>Tiểu Cầu & Quá Trình Cầm Máu - Đông Máu</h3>
                      <p>Cầm máu sơ cấp (nút chặn tiểu cầu), thác đông máu nội sinh/ngoại sinh và cơ chế chống đông sinh lý.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/basic-medical/physiology/part3/sl-nhommau-truyenmau" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon"><i class="fa-solid fa-vial"></i></div>
                    <div class="specialty-info">
                      <h3>Hệ Thống Nhóm Máu ABO, Rh & An Toàn Truyền Máu</h3>
                      <p>Kháng nguyên bề mặt hồng cầu, kháng thể tự nhiên/miễn dịch và quy tắc phối hợp nhóm máu lâm sàng.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
              </div>
            </div>
          </section>

          <!-- PHẦN 4: TIM MẠCH & HÔ HẤP -->
          <section id="part4-section" aria-labelledby="part4-heading" style="margin-bottom: 2rem;">
            <div class="physio-group-container">
              <div class="physio-group-header">
                <span class="physio-group-icon"><i class="fa-solid fa-heart-pulse"></i></span>
                <h3 id="part4-heading">Phần 4: Sinh Lý Tim Mạch & Hô Hấp</h3>
              </div>
              <div class="specialty-grid">
                <a href="#/basic-medical/physiology/part4/sl-cotim-hoatdongdien" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon"><i class="fa-solid fa-heart-pulse"></i></div>
                    <div class="specialty-info">
                      <h3>Hoạt Động Điện Cơ Tim & Hệ Dẫn Truyền Tim</h3>
                      <p>Điện thế hoạt động cơ tâm thất, điện thế nút xoang tự động, giai đoạn trơ và điện tâm đồ cơ bản.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/basic-medical/physiology/part4/sl-cktim-cungluongtim" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon"><i class="fa-solid fa-arrows-rotate"></i></div>
                    <div class="specialty-info">
                      <h3>Chu Kỳ Tim & Điều Hòa Cung Lượng Tim (CO)</h3>
                      <p>Các thì tâm thu, tâm trương, biến đổi áp suất buồng tim, thể tích tống máu (SV) và định luật Starling.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/basic-medical/physiology/part4/sl-hemach-dieuhoaha" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon"><i class="fa-solid fa-chart-line"></i></div>
                    <div class="specialty-info">
                      <h3>Sinh Lý Hệ Mạch & Cơ Chế Điều Hòa Huyết Áp</h3>
                      <p>Huyết áp động mạch, phản xạ xoang cảnh - quai ĐMC, hệ RAA và điều hòa lưu lượng máu tại chỗ.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/basic-medical/physiology/part4/sl-cohohap-thongkhi" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon"><i class="fa-solid fa-lungs"></i></div>
                    <div class="specialty-info">
                      <h3>Cơ Học Hô Hấp & Thông Khí Phổi</h3>
                      <p>Cơ chế thở hít vào - thở ra, áp suất màng phổi, sức đàn hồi của phổi, Surfactant và dung tích sống.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/basic-medical/physiology/part4/sl-traodoikhi" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon"><i class="fa-solid fa-wind"></i></div>
                    <div class="specialty-info">
                      <h3>Trao Đổi Khí Tại Màng Phế Nang - Mao Mạch</h3>
                      <p>Định luật khuếch tán Fick, phân áp O2/CO2 phế nang, tỷ lệ thông khí/tưới máu (V/Q) và shunting.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/basic-medical/physiology/part4/sl-vanchuyen-dieuhoahh" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon"><i class="fa-solid fa-gauge-high"></i></div>
                    <div class="specialty-info">
                      <h3>Vận Chuyển Khí Trong Máu & Điều Hòa Hô Hấp</h3>
                      <p>Dạng kết hợp Oxyhemoglobin, dạng đệm Bicarbonate, thụ thể hóa học trung ương và ngoại biên.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
              </div>
            </div>
          </section>

          <!-- PHẦN 5: TIÊU HÓA & CHUYỂN HÓA -->
          <section id="part5-section" aria-labelledby="part5-heading" style="margin-bottom: 2rem;">
            <div class="physio-group-container">
              <div class="physio-group-header">
                <span class="physio-group-icon"><i class="fa-solid fa-bowl-food"></i></span>
                <h3 id="part5-heading">Phần 5: Sinh Lý Tiêu Hóa & Chuyển Hóa Năng Lượng</h3>
              </div>
              <div class="specialty-grid">
                <a href="#/basic-medical/physiology/part5/sl-th-mieng-tq" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon"><i class="fa-solid fa-utensils"></i></div>
                    <div class="specialty-info">
                      <h3>Tiêu Hóa Ở Miệng & Thực Quản</h3>
                      <p>Động tác nhai, nuốt thức ăn, enzyme Amylase nước bọt và trương lực cơ thắt thực quản dưới (LES).</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/basic-medical/physiology/part5/sl-th-daday" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon"><i class="fa-solid fa-fire-flame-curved"></i></div>
                    <div class="specialty-info">
                      <h3>Tiêu Hóa Ở Dạ Dày & Tiết Acid Dịch Vị HCl</h3>
                      <p>Bơm proton H+/K+-ATPase ở tế bào viền, hormone Gastrin, Histamin, Pepsinogen và hàng rào bảo vệ chất nhầy.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/basic-medical/physiology/part5/sl-th-gantuy" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon"><i class="fa-solid fa-droplet"></i></div>
                    <div class="specialty-info">
                      <h3>Chức Năng Tiêu Hóa & Bài Tiết Của Gan - Tụy</h3>
                      <p>Dịch tụy ngoại tiết giàu men tiêu hóa (Trypsin, Lipase, Amylase) và vai trò muối mật trong nhũ tương hóa mỡ.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/basic-medical/physiology/part5/sl-th-ruotnon" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon"><i class="fa-solid fa-bacon"></i></div>
                    <div class="specialty-info">
                      <h3>Tiêu Hóa & Hấp Thu Các Chất Ở Ruột Non</h3>
                      <p>Cấu trúc nhung mao, vi nhung mao tăng diện tích hấp thu đường đơn, acid amin, acid béo và điện giải.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/basic-medical/physiology/part5/sl-th-ruotgia" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon"><i class="fa-solid fa-bacteria"></i></div>
                    <div class="specialty-info">
                      <h3>Chức Năng Ruột Già & Hệ Vi Sinh Vật Đường Ruột</h3>
                      <p>Hấp thu nước, tạo khuôn phân, tổng hợp vitamin K/B và vai trò miễn dịch của hệ vi khuẩn chí đường ruột.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/basic-medical/physiology/part5/sl-chuyenhoanl-dieuhoanhiet" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon"><i class="fa-solid fa-temperature-three-quarters"></i></div>
                    <div class="specialty-info">
                      <h3>Chuyển Hóa Năng Lượng & Điều Hòa Thân Nhiệt</h3>
                      <p>Chuyển hóa cơ sở (BMR), trung tâm điều nhiệt vùng dưới đồi, cơ chế sinh nhiệt và tỏa nhiệt.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
              </div>
            </div>
          </section>

          <!-- PHẦN 6: THẬN & DỊCH CƠ THỂ -->
          <section id="part6-section" aria-labelledby="part6-heading" style="margin-bottom: 2rem;">
            <div class="physio-group-container">
              <div class="physio-group-header">
                <span class="physio-group-icon"><i class="fa-solid fa-filter"></i></span>
                <h3 id="part6-heading">Phần 6: Sinh Lý Thận & Thăng Bằng Toan Kiềm</h3>
              </div>
              <div class="specialty-grid">
                <a href="#/basic-medical/physiology/part6/sl-than-cauthan" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon"><i class="fa-solid fa-filter"></i></div>
                    <div class="specialty-info">
                      <h3>Chức Năng Lọc Cầu Thận & Đo Độ Lọc eGFR</h3>
                      <p>Màng lọc cầu thận 3 lớp, áp suất lọc hiệu dụng (Puf), hệ số Kf và cơ chế tự điều hòa lưu lượng máu thận.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/basic-medical/physiology/part6/sl-than-ongthan" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon"><i class="fa-solid fa-circle-nodes"></i></div>
                    <div class="specialty-info">
                      <h3>Chức Năng Tái Hấp Thu & Bài Tiết Của Ống Thận</h3>
                      <p>Tái hấp thu Glucose, Na+, HCO3- ở ống lượn gần, quai Henle, ống lượn xa và ống góp dưới tác dụng của Aldosterone/ADH.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/basic-medical/physiology/part6/sl-than-phaloang-dieuhoadich" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon"><i class="fa-solid fa-faucet-drip"></i></div>
                    <div class="specialty-info">
                      <h3>Cơ Chế Cô Đặc - Pha Loãng Nước Tiểu & Điều Hòa Dịch</h3>
                      <p>Hệ thống nhân nồng độ ngược dòng ở tủy thận, mạch thẳng Vasa Recta và điều hòa áp suất thẩm thấu.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/basic-medical/physiology/part6/sl-than-toankiem" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon"><i class="fa-solid fa-vial-circle-check"></i></div>
                    <div class="specialty-info">
                      <h3>Vai Trò Của Thận Trong Thăng Bằng Toan Kiềm</h3>
                      <p>Cơ chế tái hấp thu Bicarbonate (HCO3-), bài tiết ion H+ và sinh mới Bicarbonate qua hệ đệm Phosphate và Amoniac (NH4+).</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
              </div>
            </div>
          </section>

          <!-- PHẦN 7: NỘI TIẾT & SINH SẢN -->
          <section id="part7-section" aria-labelledby="part7-heading" style="margin-bottom: 2rem;">
            <div class="physio-group-container">
              <div class="physio-group-header">
                <span class="physio-group-icon"><i class="fa-solid fa-venus-mars"></i></span>
                <h3 id="part7-heading">Phần 7: Sinh Lý Nội Tiết & Sinh Sản</h3>
              </div>
              <div class="specialty-grid">
                <a href="#/basic-medical/physiology/part7/sl-nt-tongquat" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon"><i class="fa-solid fa-dna"></i></div>
                    <div class="specialty-info">
                      <h3>Đại Cương Tuyến Nội Tiết & Cơ Chế Hormone</h3>
                      <p>Phân loại hormone (Peptide, Steroid, Amin), cơ chế thụ thể bề mặt màng vs nhân tế bào và feedback trục nội tiết.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/basic-medical/physiology/part7/sl-nt-gh" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon"><i class="fa-solid fa-child-reaching"></i></div>
                    <div class="specialty-info">
                      <h3>Vùng Dưới Đồi & Tuyến Yên (Hormone GH, ACTH...)</h3>
                      <p>Hệ mạch cửa vùng dưới đồi-tuyến yên, hormone tăng trưởng GH, IGF-1, Prolactin và thùy sau tuyến yên (ADH, Oxytocin).</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/basic-medical/physiology/part7/sl-nt-tuyengiap" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon"><i class="fa-solid fa-shield"></i></div>
                    <div class="specialty-info">
                      <h3>Sinh Lý Tuyến Giáp (T3, T4, Calcitonin)</h3>
                      <p>Tổng hợp hormone giáp từ Iod và Tyrosine, vận chuyển qua TBG, tác dụng tăng chuyển hóa và phát triển thần kinh.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/basic-medical/physiology/part7/sl-nt-vothuongthan" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon"><i class="fa-solid fa-fire"></i></div>
                    <div class="specialty-info">
                      <h3>Sinh Lý Vỏ & Tủy Thượng Thận (Cortisol, Aldosterone)</h3>
                      <p>3 lớp vỏ thượng thận (Glomerulosa, Fasciculata, Reticularis), điều hòa stress qua Cortisol và tủy thượng thận tiết Adrenaline.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/basic-medical/physiology/part7/sl-nt-tuyentuy" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon"><i class="fa-solid fa-cube"></i></div>
                    <div class="specialty-info">
                      <h3>Sinh Lý Tuyến Tụy Nội Tiết (Insulin & Glucagon)</h3>
                      <p>Tế bào Beta tiết Insulin, tế bào Alpha tiết Glucagon, cơ chế hạ đường huyết và duy trì dự trữ Glycogen.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/basic-medical/physiology/part7/sl-ss-sinhsan" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon"><i class="fa-solid fa-venus-mars"></i></div>
                    <div class="specialty-info">
                      <h3>Sinh Lý Hệ Sinh Dục Nam, Nữ & Thụ Thai</h3>
                      <p>Sinh tinh và Testosterone ở nam giới; chu kỳ buồng trứng, chu kỳ nội mạc tử cung, Estrogen/Progesterone ở nữ giới.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
              </div>
            </div>
          </section>

          <!-- PHẦN 8: SẢN PHỤ KHOA -->
          <section id="part8-section" aria-labelledby="part8-heading" style="margin-bottom: 2rem;">
            <div class="physio-group-container" style="border-left-color: #ec4899;">
              <div class="physio-group-header" style="background: linear-gradient(90deg, rgba(236,72,153,0.1) 0%, transparent 100%);">
                <span class="physio-group-icon" style="background: rgba(236,72,153,0.15); color: #ec4899;"><i class="fa-solid fa-person-pregnant"></i></span>
                <h3 id="part8-heading" style="color: #db2777;">Phần 8: Giải Phẫu & Sinh Lý Hệ Sản Phụ Khoa</h3>
              </div>
              <div class="specialty-grid">
                <a href="#/basic-medical/physiology/part8/sl-san-mangthai-nhauthai" class="specialty-card" style="border-left-color: #ec4899;">
                  <div class="specialty-card-top">
                    <div class="specialty-icon" style="background: rgba(236, 72, 153, 0.15); color: #ec4899;"><i class="fa-solid fa-person-pregnant"></i></div>
                    <div class="specialty-info">
                      <h3>Sinh Lý Mang Thai & Chức Năng Nhau Thai</h3>
                      <p>Sự thụ tinh, làm tổ của phôi, các hormone thai kỳ (hCG, Progesterone, Estrogen, hPL) và sự trao đổi chất qua hàng rào nhau thai.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action" style="color: #ec4899;"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/basic-medical/physiology/part8/sl-san-chuyenda-suame" class="specialty-card" style="border-left-color: #ec4899;">
                  <div class="specialty-card-top">
                    <div class="specialty-icon" style="background: rgba(236, 72, 153, 0.15); color: #ec4899;"><i class="fa-solid fa-person-breastfeeding"></i></div>
                    <div class="specialty-info">
                      <h3>Cơ Chế Chuyển Dạ & Sinh Lý Tiết Sữa Mẹ</h3>
                      <p>Cơ chế khởi phát chuyển dạ (Oxytocin, Prostaglandin), phản xạ bài tiết và tống sữa (Prolactin, Oxytocin) trong thời kỳ hậu sản.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action" style="color: #ec4899;"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
              </div>
            </div>
          </section>

          <!-- PHẦN 9: NHI KHOA -->
          <section id="part9-section" aria-labelledby="part9-heading" style="margin-bottom: 2rem;">
            <div class="physio-group-container" style="border-left-color: #f59e0b;">
              <div class="physio-group-header" style="background: linear-gradient(90deg, rgba(245,158,11,0.1) 0%, transparent 100%);">
                <span class="physio-group-icon" style="background: rgba(245,158,11,0.15); color: #f59e0b;"><i class="fa-solid fa-baby"></i></span>
                <h3 id="part9-heading" style="color: #d97706;">Phần 9: Giải Phẫu & Sinh Lý Hệ Nhi Khoa</h3>
              </div>
              <div class="specialty-grid">
                <a href="#/basic-medical/physiology/part9/sl-nhi-hohap" class="specialty-card" style="border-left-color: #f59e0b;">
                  <div class="specialty-card-top">
                    <div class="specialty-icon" style="background: rgba(245, 158, 11, 0.15); color: #f59e0b;"><i class="fa-solid fa-lungs"></i></div>
                    <div class="specialty-info">
                      <h3>Giải Phẫu & Sinh Lý Hệ Hô Hấp ở Trẻ Em</h3>
                      <p>Đặc điểm khung sườn, cơ hô hấp, vùng dẫn khí, xoang cạnh mũi, thanh-khí-phế quản, sự tăng sinh phế nang và hệ mạch máu phổi trẻ em.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action" style="color: #f59e0b;"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/basic-medical/physiology/part9/sl-nhi-than-tietnieu" class="specialty-card" style="border-left-color: #f59e0b;">
                  <div class="specialty-card-top">
                    <div class="specialty-icon" style="background: rgba(245, 158, 11, 0.15); color: #f59e0b;"><i class="fa-solid fa-filter"></i></div>
                    <div class="specialty-info">
                      <h3>Giải Phẫu & Sinh Lý Hệ Thận - Tiết Niệu ở Trẻ Em</h3>
                      <p>Cấu trúc nhu mô thận, màng lọc cầu thận, tiến trình trưởng thành GFR, chức năng ống thận, khả năng cô đặc nước tiểu và hệ RAA ở trẻ nhi.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action" style="color: #f59e0b;"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/basic-medical/physiology/part9/sl-nhi-tuanhoan-sosinh" class="specialty-card" style="border-left-color: #f59e0b;">
                  <div class="specialty-card-top">
                    <div class="specialty-icon" style="background: rgba(245, 158, 11, 0.15); color: #f59e0b;"><i class="fa-solid fa-heart-pulse"></i></div>
                    <div class="specialty-info">
                      <h3>Giải Phẫu & Sinh Lý Tuần Hoàn Trẻ Em & Thích Nghi Sơ Sinh</h3>
                      <p>Tuần hoàn thai nhi song song, 3 cấu trúc thông nối, biến đổi tuần hoàn chuyển tiếp sau sinh, nhịp tim, huyết áp và cung lượng tim trẻ em.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action" style="color: #f59e0b;"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/basic-medical/physiology/part9/sl-nhi-tieuhoa" class="specialty-card" style="border-left-color: #f59e0b;">
                  <div class="specialty-card-top">
                    <div class="specialty-icon" style="background: rgba(245, 158, 11, 0.15); color: #f59e0b;"><i class="fa-solid fa-utensils"></i></div>
                    <div class="specialty-info">
                      <h3>Giải Phẫu & Sinh Lý Hệ Tiêu Hóa ở Trẻ Em</h3>
                      <p>Tiến trình mọc răng, thực quản, tuyến acid dạ dày, ruột non, đại tràng, tiêu hóa dinh dưỡng, tụy ngoại tiết và hệ gan-mật trẻ nhi.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action" style="color: #f59e0b;"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
                <a href="#/basic-medical/physiology/part9/sl-nhi-tangtruong-phattrien" class="specialty-card" style="border-left-color: #f59e0b;">
                  <div class="specialty-card-top">
                    <div class="specialty-icon" style="background: rgba(245, 158, 11, 0.15); color: #f59e0b;"><i class="fa-solid fa-child-reaching"></i></div>
                    <div class="specialty-info">
                      <h3>Sinh Lý Tăng Trưởng & Phát Triển Thể Chất ở Trẻ Em</h3>
                      <p>Quy luật tăng cân nặng, chiều cao, vòng đầu, tỷ lệ cơ thể theo tuổi, đo nhân trắc, biểu đồ WHO, phân loại Z-score và bất thường thể chất.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action" style="color: #f59e0b;"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                </a>
              </div>
            </div>
          </section>

        </main>
      </div><!-- end dashboard-layout -->
    </div><!-- end main-wrapper -->
  `;
}
