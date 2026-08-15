/**
 * CliniPortal — Pathophysiology & Basic Sciences (Sinh Lý - Sinh Lý Bệnh) SPA View
 * Path: src/content/pathophysiology/pathophysiology-view.ts
 * Giao diện kinh điển đầy đủ (Classic Hero DNA Helix SVG, Hub Tabs Sinh lý / CCBS, Sticky Part-Nav 9 Phần có Nhi khoa)
 * Toàn bộ liên kết bài học dẫn trực tiếp vào SPA HTML Reader: #/pathophysiology/physiology/:part/:slug
 */

import '../../../css/components/module-dashboard.css';
import '../../../css/components/physio-content.css';
import '../../../css/components/formula-vault.css';

export function renderPathophysiologyView(activeTab: 'all' | 'sinhly' | 'ccbs' | 'biochem' = 'all'): string {
  return `
    <div class="main-wrapper" id="mainContent" style="width: 100%; max-width: 1520px; margin: 0 auto; padding-bottom: 3rem;">

      <!-- BREADCRUMB -->
      <div class="breadcrumb" style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 1.25rem;">
        <a href="#/" style="color: inherit; text-decoration: none;">🏠 Trang chủ</a> &nbsp;/&nbsp; 
        <span style="color: var(--color-primary, #0284c7); font-weight: 600;">Cơ Sở Y Khoa (Giải Phẫu - Sinh Lý - CCBS)</span>
      </div>

      <!-- HERO SECTION -->
      <section class="hero-dashboard hero-physio" aria-labelledby="hero-title" style="margin-bottom: 1.5rem;">
        <div class="tcm-hero-content">
          <div class="hero-intro">
            <h1 id="hero-title">🧬 SINH LÝ & SINH LÝ BỆNH HỌC</h1>
            <p>Hệ thống hóa kiến thức Sinh lý và Sinh lý bệnh học, cung cấp nền tảng vững chắc để hiểu cơ chế bệnh sinh và rối loạn chức năng 9 hệ cơ quan (bao gồm Nhi khoa & Sản khoa).</p>
          </div>
          <div class="tcm-hero-decor">
            <!-- DNA Helix SVG -->
            <svg class="dna-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 20 Q 35 50, 50 50 T 80 80" stroke="#ffffff" stroke-width="4"
                stroke-linecap="round" fill="none" />
              <path d="M20 80 Q 35 50, 50 50 T 80 20" stroke="#38bdf8" stroke-width="4"
                stroke-linecap="round" fill="none" opacity="0.8" />
              <line x1="26" y1="31" x2="26" y2="69" stroke="#ffffff" stroke-width="2"
                stroke-linecap="round" opacity="0.6" />
              <line x1="38" y1="44" x2="38" y2="56" stroke="#ffffff" stroke-width="2"
                stroke-linecap="round" opacity="0.6" />
              <line x1="62" y1="56" x2="62" y2="44" stroke="#ffffff" stroke-width="2"
                stroke-linecap="round" opacity="0.6" />
              <line x1="74" y1="69" x2="74" y2="31" stroke="#ffffff" stroke-width="2"
                stroke-linecap="round" opacity="0.6" />
              <circle cx="20" cy="20" r="5" fill="#ffffff" />
              <circle cx="80" cy="80" r="5" fill="#ffffff" />
              <circle cx="20" cy="80" r="5" fill="#38bdf8" />
              <circle cx="80" cy="20" r="5" fill="#38bdf8" />
            </svg>
          </div>
        </div>
        <div class="hero-pattern"></div>
      </section>

      <!-- FEATURE BANNER -->
      <section style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.25rem; margin-bottom: 1.5rem;">
        <a href="#/pathophysiology/giai-phau-sinh-ly" class="physio-step-card" style="display: flex; align-items: center; gap: 1rem; padding: 1.25rem 1.5rem; background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; text-decoration: none; transition: transform 0.2s; box-shadow: var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.05));">
          <div style="font-size: 2.2rem; background: rgba(2,132,199,0.1); width: 56px; height: 56px; display: flex; align-items: center; justify-content: center; border-radius: 12px; flex-shrink: 0;">⚡</div>
          <div>
            <span style="font-size: 0.75rem; font-weight: 700; background: rgba(2,132,199,0.15); color: var(--color-primary, #0284c7); padding: 0.15rem 0.5rem; border-radius: 4px;">Format Mới: Markdown + SVG</span>
            <h4 style="margin: 0.2rem 0; color: var(--color-text, #0f172a); font-size: 1.05rem; font-weight: 700;">Trình Đọc Markdown & Visual Diagram</h4>
            <p style="margin: 0; font-size: 0.825rem; color: var(--color-text-muted, #64748b);">Bài viết sinh lý chuẩn hóa có YAML metadata, công thức TeX và sơ đồ vector SVG tương tác.</p>
          </div>
        </a>

        <a href="#/pathophysiology/formula-vault" class="physio-step-card" style="display: flex; align-items: center; gap: 1rem; padding: 1.25rem 1.5rem; background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; text-decoration: none; transition: transform 0.2s; box-shadow: var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.05));">
          <div style="font-size: 2.2rem; background: rgba(16,185,129,0.1); width: 56px; height: 56px; display: flex; align-items: center; justify-content: center; border-radius: 12px; flex-shrink: 0;">📐</div>
          <div>
            <span style="font-size: 0.75rem; font-weight: 700; background: rgba(16,185,129,0.15); color: var(--color-success, #10b981); padding: 0.15rem 0.5rem; border-radius: 4px;">Format Mới: JSON Vault</span>
            <h4 style="margin: 0.2rem 0; color: var(--color-text, #0f172a); font-size: 1.05rem; font-weight: 700;">Kho Công Thức Sinh Lý Định Lượng</h4>
            <p style="margin: 0; font-size: 0.825rem; color: var(--color-text-muted, #64748b);">Cơ sở dữ liệu công thức Nernst, Fick, Starling, GHK kèm máy tính tính toán tức thì.</p>
          </div>
        </a>
      </section>

      <!-- HUB TABS -->
      <div class="hub-tabs-container" style="margin-bottom: 1.5rem;">
        <div class="hub-tabs" style="display: flex; gap: 8px; border-bottom: 2px solid var(--color-border, #e2e8f0); padding-bottom: 8px; overflow-x: auto;">
          <button class="hub-tab-btn ${activeTab !== 'ccbs' && activeTab !== 'biochem' ? 'active' : ''}" data-tab="physio-tab-content" style="padding: 0.6rem 1.25rem; font-size: 0.95rem; font-weight: 700; border: none; background: transparent; cursor: pointer; border-radius: 8px; display: inline-flex; align-items: center; gap: 0.5rem; white-space: nowrap;">
            <i class="fa-solid fa-dna" style="color: var(--color-primary, #0284c7);"></i>
            <span>1. Sinh Lý Học (9 Hệ Cơ Quan)</span>
          </button>
          <button class="hub-tab-btn ${activeTab === 'ccbs' ? 'active' : ''}" data-tab="patho-tab-content" style="padding: 0.6rem 1.25rem; font-size: 0.95rem; font-weight: 700; border: none; background: transparent; cursor: pointer; border-radius: 8px; display: inline-flex; align-items: center; gap: 0.5rem; white-space: nowrap;">
            <i class="fa-solid fa-house-medical" style="color: #059669;"></i>
            <span>2. Cơ Chế Bệnh Sinh (16 Chuyên Khoa)</span>
          </button>
          <a href="#/pathophysiology/hoa-sinh" class="hub-tab-btn" style="padding: 0.6rem 1.25rem; font-size: 0.95rem; font-weight: 700; border: none; background: transparent; cursor: pointer; border-radius: 8px; display: inline-flex; align-items: center; gap: 0.5rem; text-decoration: none; color: inherit; white-space: nowrap;">
            <i class="fa-solid fa-flask-vial" style="color: #8b5cf6;"></i>
            <span>3. Hóa Sinh Y Học (7 Khối, 31 Bài)</span>
          </a>
        </div>
      </div>

      <!-- CONTROL BAR / TOOLBAR -->
      <div class="dashboard-controls" style="margin-bottom: 1.5rem;">
        <div class="search-box-container">
          <span class="search-icon-svg">
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2"
              fill="none" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
          <input type="text" id="lesson-search" placeholder="Tìm kiếm bài giảng sinh lý (Nhi khoa, Sản khoa, Tim mạch...), cơ chế bệnh sinh..."
            aria-label="Tìm kiếm bài học">
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

      <!-- DASHBOARD LAYOUT -->
      <div class="dashboard-layout">
        <!-- Navigation Sidebar (Sticky) -->
        <aside class="layout-nav-sidebar" aria-label="Danh mục phần học">
          <div class="nav-sidebar-sticky" id="physio-nav">
            <h4 class="nav-sidebar-title">Hệ Thống Cơ Quan</h4>
            <ul class="part-nav-list">
              <li>
                <a href="#part1-section" class="part-nav-item p1 active" data-target="part1-section">
                  <span class="part-icon"><i class="fa-solid fa-microscope"></i></span>
                  <span class="part-text">1. Đại cương & Tế bào</span>
                  <span class="part-count-badge">3</span>
                </a>
              </li>
              <li>
                <a href="#part2-section" class="part-nav-item p2" data-target="part2-section">
                  <span class="part-icon"><i class="fa-solid fa-brain"></i></span>
                  <span class="part-text">2. Thần kinh & Cơ</span>
                  <span class="part-count-badge">8</span>
                </a>
              </li>
              <li>
                <a href="#part3-section" class="part-nav-item p3" data-target="part3-section">
                  <span class="part-icon"><i class="fa-solid fa-droplet"></i></span>
                  <span class="part-text">3. Máu & Miễn dịch</span>
                  <span class="part-count-badge">5</span>
                </a>
              </li>
              <li>
                <a href="#part4-section" class="part-nav-item p4" data-target="part4-section">
                  <span class="part-icon"><i class="fa-solid fa-heart-pulse"></i></span>
                  <span class="part-text">4. Tim mạch & Hô hấp</span>
                  <span class="part-count-badge">6</span>
                </a>
              </li>
              <li>
                <a href="#part5-section" class="part-nav-item p5" data-target="part5-section">
                  <span class="part-icon"><i class="fa-solid fa-bowl-food"></i></span>
                  <span class="part-text">5. Tiêu hóa & Chuyển hóa</span>
                  <span class="part-count-badge">6</span>
                </a>
              </li>
              <li>
                <a href="#part6-section" class="part-nav-item p6" data-target="part6-section">
                  <span class="part-icon"><i class="fa-solid fa-filter"></i></span>
                  <span class="part-text">6. Thận & Dịch cơ thể</span>
                  <span class="part-count-badge">4</span>
                </a>
              </li>
              <li>
                <a href="#part7-section" class="part-nav-item p7" data-target="part7-section">
                  <span class="part-icon"><i class="fa-solid fa-venus-mars"></i></span>
                  <span class="part-text">7. Nội tiết & Sinh sản</span>
                  <span class="part-count-badge">6</span>
                </a>
              </li>
              <li>
                <a href="#part8-section" class="part-nav-item p8" data-target="part8-section">
                  <span class="part-icon"><i class="fa-solid fa-person-pregnant"></i></span>
                  <span class="part-text">8. Sản phụ khoa</span>
                  <span class="part-count-badge">2</span>
                </a>
              </li>
              <li>
                <a href="#part9-section" class="part-nav-item p9" data-target="part9-section">
                  <span class="part-icon"><i class="fa-solid fa-baby"></i></span>
                  <span class="part-text">9. Hệ Nhi khoa</span>
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

          <!-- TAB 1: SINH LÝ HỌC (9 HỆ) -->
          <div id="physio-tab-content" class="tab-content ${activeTab !== 'ccbs' ? 'active' : ''}">
            
            <!-- PHẦN 1: ĐẠI CƯƠNG & TẾ BÀO -->
            <section id="part1-section" aria-labelledby="part1-heading" style="margin-bottom: 2rem;">
              <div class="physio-group-container">
                <div class="physio-group-header">
                  <span class="physio-group-icon"><i class="fa-solid fa-microscope"></i></span>
                  <h3 id="part1-heading">Phần 1: Đại Cương & Sinh Lý Tế Bào</h3>
                </div>
                <div class="specialty-grid">
                  <a href="#/pathophysiology/physiology/part1/sl-tb-daicuong-tb" class="specialty-card">
                    <div class="specialty-card-top">
                      <div class="specialty-icon"><i class="fa-solid fa-scale-balanced"></i></div>
                      <div class="specialty-info">
                        <h3>Đại Cương Sinh Lý Học & Cân Bằng Nội Môi</h3>
                        <p>Khái niệm môi trường bên trong cơ thể, cơ chế điều hòa ngược âm tính và dương tính giúp duy trì cân bằng nội môi.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                  </a>
                  <a href="#/pathophysiology/physiology/part1/sl-tb-mangtebao" class="specialty-card">
                    <div class="specialty-card-top">
                      <div class="specialty-icon"><i class="fa-solid fa-circle-nodes"></i></div>
                      <div class="specialty-info">
                        <h3>Sinh Lý Màng Tế Bào & Vận Chuyển Vật Chất</h3>
                        <p>Cơ chế khuếch tán thụ động, vận chuyển tích cực chủ động, thụ động và vai trò quyết định của các kênh ion màng.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                  </a>
                  <a href="#/pathophysiology/physiology/part1/sl-tb-diensinhly" class="specialty-card">
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
                  <a href="#/pathophysiology/physiology/part2/sl-synapse" class="specialty-card">
                    <div class="specialty-card-top">
                      <div class="specialty-icon"><i class="fa-solid fa-network-wired"></i></div>
                      <div class="specialty-info">
                        <h3>Dẫn Truyền Qua Synapse & Chất Dẫn Truyền TK</h3>
                        <p>Cơ chế giải phóng chất truyền đạt hóa học qua exocytosis, EPSP, IPSP và vai trò của các thụ thể hậu synapse.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                  </a>
                  <a href="#/pathophysiology/physiology/part2/sl-coxuong" class="specialty-card">
                    <div class="specialty-card-top">
                      <div class="specialty-icon"><i class="fa-solid fa-dumbbell"></i></div>
                      <div class="specialty-info">
                        <h3>Sinh Lý Co Cơ Xương & Khớp Thần Kinh-Cơ</h3>
                        <p>Cơ chế trượt sợi Actin và Myosin, vai trò của ion Ca2+, hệ thống ống T và năng lượng ATP trong co cơ.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                  </a>
                  <a href="#/pathophysiology/physiology/part2/sl-cotron-cotim" class="specialty-card">
                    <div class="specialty-card-top">
                      <div class="specialty-icon"><i class="fa-solid fa-heart-pulse"></i></div>
                      <div class="specialty-info">
                        <h3>Sinh Lý Co Cơ Trơn & Cơ Tim</h3>
                        <p>Cơ chế co cơ đặc thù ở tạng phủ và cơ tim, vai trò của liên kết khe (gap junctions) và hoạt động tự phát.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                  </a>
                  <a href="#/pathophysiology/physiology/part2/sl-tuygai" class="specialty-card">
                    <div class="specialty-card-top">
                      <div class="specialty-icon"><i class="fa-solid fa-bezier-curve"></i></div>
                      <div class="specialty-info">
                        <h3>Chức Năng Phản Xạ & Dẫn Truyền Của Tủy Gai</h3>
                        <p>Cung phản xạ tủy, đường dẫn truyền cảm giác hướng tâm và đường vận động ly tâm qua tủy sống.</p>
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
                  <a href="#/pathophysiology/physiology/part8/sl-san-mangthai-nhauthai" class="specialty-card" style="border-left-color: #ec4899;">
                    <div class="specialty-card-top">
                      <div class="specialty-icon" style="background: rgba(236, 72, 153, 0.15); color: #ec4899;"><i class="fa-solid fa-person-pregnant"></i></div>
                      <div class="specialty-info">
                        <h3>Sinh Lý Mang Thai & Chức Năng Nhau Thai</h3>
                        <p>Sự thụ tinh, làm tổ của phôi, các hormone thai kỳ (hCG, Progesterone, Estrogen, hPL) và trao đổi chất qua nhau thai.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action" style="color: #ec4899;"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                  </a>
                  <a href="#/pathophysiology/physiology/part8/sl-san-chuyenda-suame" class="specialty-card" style="border-left-color: #ec4899;">
                    <div class="specialty-card-top">
                      <div class="specialty-icon" style="background: rgba(236, 72, 153, 0.15); color: #ec4899;"><i class="fa-solid fa-person-breastfeeding"></i></div>
                      <div class="specialty-info">
                        <h3>Cơ Chế Chuyển Dạ & Sinh Lý Tiết Sữa Mẹ</h3>
                        <p>Cơ chế khởi phát chuyển dạ (Oxytocin, Prostaglandin), phản xạ bài tiết và tống sữa trong thời kỳ hậu sản.</p>
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
                  <a href="#/pathophysiology/physiology/part9/sl-nhi-hohap" class="specialty-card" style="border-left-color: #f59e0b;">
                    <div class="specialty-card-top">
                      <div class="specialty-icon" style="background: rgba(245, 158, 11, 0.15); color: #f59e0b;"><i class="fa-solid fa-lungs"></i></div>
                      <div class="specialty-info">
                        <h3>Giải Phẫu & Sinh Lý Hệ Hô Hấp ở Trẻ Em</h3>
                        <p>Đặc điểm khung sườn, cơ hô hấp, vùng dẫn khí, xoang cạnh mũi, thanh-khí-phế quản và sự tăng sinh phế nang trẻ em.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action" style="color: #f59e0b;"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                  </a>
                  <a href="#/pathophysiology/physiology/part9/sl-nhi-than-tietnieu" class="specialty-card" style="border-left-color: #f59e0b;">
                    <div class="specialty-card-top">
                      <div class="specialty-icon" style="background: rgba(245, 158, 11, 0.15); color: #f59e0b;"><i class="fa-solid fa-filter"></i></div>
                      <div class="specialty-info">
                        <h3>Giải Phẫu & Sinh Lý Hệ Thận - Tiết Niệu ở Trẻ Em</h3>
                        <p>Cấu trúc nhu mô thận, màng lọc cầu thận, tiến trình trưởng thành GFR, chức năng ống thận và cô đặc nước tiểu.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action" style="color: #f59e0b;"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                  </a>
                  <a href="#/pathophysiology/physiology/part9/sl-nhi-tuanhoan-sosinh" class="specialty-card" style="border-left-color: #f59e0b;">
                    <div class="specialty-card-top">
                      <div class="specialty-icon" style="background: rgba(245, 158, 11, 0.15); color: #f59e0b;"><i class="fa-solid fa-heart-pulse"></i></div>
                      <div class="specialty-info">
                        <h3>Giải Phẫu & Sinh Lý Tuần Hoàn Trẻ Em & Thích Nghi Sơ Sinh</h3>
                        <p>Tuần hoàn thai nhi song song, 3 cấu trúc thông nối, biến đổi tuần hoàn chuyển tiếp sau sinh và cung lượng tim trẻ em.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action" style="color: #f59e0b;"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                  </a>
                  <a href="#/pathophysiology/physiology/part9/sl-nhi-tieuhoa" class="specialty-card" style="border-left-color: #f59e0b;">
                    <div class="specialty-card-top">
                      <div class="specialty-icon" style="background: rgba(245, 158, 11, 0.15); color: #f59e0b;"><i class="fa-solid fa-utensils"></i></div>
                      <div class="specialty-info">
                        <h3>Giải Phẫu & Sinh Lý Hệ Tiêu Hóa ở Trẻ Em</h3>
                        <p>Tiến trình mọc răng, thực quản, tuyến acid dạ dày, ruột non, tiêu hóa dinh dưỡng và tụy ngoại tiết trẻ em.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action" style="color: #f59e0b;"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                  </a>
                  <a href="#/pathophysiology/physiology/part9/sl-nhi-tangtruong-phattrien" class="specialty-card" style="border-left-color: #f59e0b;">
                    <div class="specialty-card-top">
                      <div class="specialty-icon" style="background: rgba(245, 158, 11, 0.15); color: #f59e0b;"><i class="fa-solid fa-child-reaching"></i></div>
                      <div class="specialty-info">
                        <h3>Sinh Lý Tăng Trưởng & Phát Triển Thể Chất ở Trẻ Em</h3>
                        <p>Quy luật tăng cân nặng, chiều cao, vòng đầu, đo nhân trắc, biểu đồ WHO, phân loại Z-score và bất thường thể chất.</p>
                      </div>
                    </div>
                    <div class="specialty-card-action" style="color: #f59e0b;"><span>Xem bài học</span><i class="fa-solid fa-chevron-right"></i></div>
                  </a>
                </div>
              </div>
            </section>

          </div>

          <!-- TAB 2: CƠ CHẾ BỆNH SINH (CCBS) -->
          <div id="patho-tab-content" class="tab-content ${activeTab === 'ccbs' ? 'active' : ''}">
            <div class="tab-header" style="margin-bottom: 1.5rem;">
              <h2 class="tab-heading" style="font-size: 1.35rem; font-weight: 700; color: var(--color-text, #0f172a); margin: 0 0 0.5rem 0;">🏥 Cơ Chế Bệnh Sinh & Rối Loạn Chức Năng Bệnh Lý</h2>
              <p class="tab-intro" style="color: var(--color-text-muted, #64748b); font-size: 0.9rem; margin: 0;">Khám phá cơ chế phân tử, sinh lý bệnh học và giải phẫu bệnh của các bệnh lý nội khoa, ngoại khoa và cấp cứu phổ biến.</p>
            </div>

            <div class="specialty-grid">
              <a href="#/pathophysiology/co-che-benh-sinh" class="specialty-card">
                <div class="specialty-card-top">
                  <div class="specialty-icon">🫀</div>
                  <div class="specialty-info">
                    <h3>Cơ Chế Bệnh Sinh Tim Mạch & Suy Tim</h3>
                    <p>Tái cấu trúc thất trái, hoạt hóa thần kinh thể dịch kéo dài, xơ vữa động mạch và cơ chế nhồi máu cơ tim cấp.</p>
                  </div>
                </div>
                <div class="specialty-card-action"><span>Xem cơ chế</span><i class="fa-solid fa-chevron-right"></i></div>
              </a>
              <a href="#/pathophysiology/co-che-benh-sinh" class="specialty-card">
                <div class="specialty-card-top">
                  <div class="specialty-icon">🫁</div>
                  <div class="specialty-info">
                    <h3>Cơ Chế Bệnh Sinh Hô Hấp & ARDS</h3>
                    <p>Tổn thương màng phế nang mao mạch lan tỏa, tăng tính thấm, phù phổi không do tim và cơ chế bẫy khí Hen/COPD.</p>
                  </div>
                </div>
                <div class="specialty-card-action"><span>Xem cơ chế</span><i class="fa-solid fa-chevron-right"></i></div>
              </a>
              <a href="#/pathophysiology/co-che-benh-sinh" class="specialty-card">
                <div class="specialty-card-top">
                  <div class="specialty-icon">🫘</div>
                  <div class="specialty-info">
                    <h3>Cơ Chế Bệnh Sinh Thận (AKI & CKD)</h3>
                    <p>Hoại tử ống thận cấp thiếu máu cục bộ, xơ hóa cầu thận, mất bù thăng bằng kiềm toan và rối loạn phospho-canxi.</p>
                  </div>
                </div>
                <div class="specialty-card-action"><span>Xem cơ chế</span><i class="fa-solid fa-chevron-right"></i></div>
              </a>
              <a href="#/pathophysiology/co-che-benh-sinh" class="specialty-card">
                <div class="specialty-card-top">
                  <div class="specialty-icon">🩸</div>
                  <div class="specialty-info">
                    <h3>Cơ Chế Bệnh Sinh ĐTĐ & Hội Chứng Chuyển Hóa</h3>
                    <p>Kháng Insulin mô ngoại vi, suy giảm tế bào Beta tụy, ngộ độc đường/mỡ và cơ chế tổn thương vi mạch/mạch máu lớn.</p>
                  </div>
                </div>
                <div class="specialty-card-action"><span>Xem cơ chế</span><i class="fa-solid fa-chevron-right"></i></div>
              </a>
            </div>
          </div>

        </main>
      </div><!-- end dashboard-layout -->
    </div><!-- end main-wrapper -->
  `;
}
