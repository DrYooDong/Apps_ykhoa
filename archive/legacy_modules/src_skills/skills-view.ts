/**
 * CliniPortal — Clinical Skills (Kỹ Năng Lâm Sàng) SPA View
 * Path: src/content/skills/skills-view.ts
 * Giao diện kinh điển đầy đủ (Classic Hero, Sticky Part-Nav, Live Search, Cranial Nerves Widget)
 */

import '../../../css/components/module-dashboard.css';
import '../../../css/components/clinical-skill.css';
import '../../../css/components/skill-tracker.css';
import '../../../css/components/skill-flashcards.css';
import '../../../css/components/clinical-reasoning.css';
import '../../../css/components/virtual-patient.css';

export function renderSkillsView(): string {
  return `
    <div class="main-wrapper" id="mainContent" style="width: 100%; max-width: 1520px; margin: 0 auto; padding-bottom: 3rem;">

      <!-- BREADCRUMB -->
      <div class="breadcrumb" style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 1.25rem;">
        <a href="#/" style="color: inherit; text-decoration: none;">🏠 Trang chủ</a> &nbsp;/&nbsp; 
        <span style="color: var(--color-primary, #0284c7); font-weight: 600;">Kỹ năng Lâm sàng & OSCE</span>
      </div>

      <!-- HERO SECTION -->
      <section class="hero-dashboard hero-skills" aria-labelledby="hero-title" style="margin-bottom: 1.5rem;">
        <div class="tcm-hero-content">
          <div class="hero-intro">
            <h1 id="hero-title">🩺 KỸ NĂNG LÂM SÀNG</h1>
            <p>Quy trình thăm khám lâm sàng chuẩn xác, bảng kiểm bedside và triệu chứng học y khoa dựa trên Macleod's Clinical Examination.</p>
          </div>
          <div class="tcm-hero-decor">
            <!-- Heartbeat ECG SVG -->
            <svg class="ecg-svg" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path class="ecg-path"
                d="M 0 40 L 20 40 L 25 35 L 30 45 L 35 40 L 45 40 L 50 15 L 55 65 L 60 40 L 70 40 L 73 37 L 76 43 L 79 40 L 100 40"
                stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
        </div>
        <div class="hero-pattern"></div>
      </section>

      <!-- OSCE RANDOMIZER BANNER -->
      <div style="background: linear-gradient(135deg, var(--color-primary-hl, rgba(2,132,199,0.08)), var(--color-purple-hl, rgba(124,58,237,0.08))); border: 1px solid var(--color-border, #e2e8f0); border-radius: var(--radius-lg, 12px); padding: 1.5rem; margin-bottom: 1.5rem; display: flex; align-items: center; justify-content: space-between; box-shadow: var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.05)); flex-wrap: wrap; gap: 1rem;">
        <div style="display: flex; align-items: center; gap: 1rem;">
          <div style="background: var(--color-primary, #0284c7); color: white; width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; box-shadow: 0 4px 10px rgba(2, 132, 199, 0.3);">
            <i class="fa-solid fa-dice"></i>
          </div>
          <div>
            <h3 style="margin: 0; font-size: 1.1rem; color: var(--color-text, #0f172a);">Luyện tập thi OSCE?</h3>
            <p style="margin: 0.25rem 0 0; font-size: 0.9rem; color: var(--color-text-muted, #64748b);">Trải nghiệm ngay Hệ thống Tình huống Lâm sàng Ngẫu nhiên mới nhất!</p>
          </div>
        </div>
        <a href="#/skills/osce-randomizer" style="background: var(--color-primary, #0284c7); color: white; text-decoration: none; padding: 0.75rem 1.5rem; border-radius: var(--radius-md, 8px); font-weight: 600; display: inline-flex; align-items: center; gap: 0.5rem; box-shadow: var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.05)); transition: transform 0.2s, box-shadow 0.2s;">
          Thử ngay <i class="fa-solid fa-arrow-right"></i>
        </a>
      </div>

      <!-- SKILL PROGRESS OVERVIEW WIDGET -->
      <div id="skill-progress-overview-widget" class="dashboard-card" style="margin-bottom: 1.5rem; padding: 1.5rem; background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: var(--radius-lg, 12px);">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
          <div>
            <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--color-text, #0f172a); margin: 0;">
              📊 Tiến Độ Tự Đánh Giá Kỹ Năng (Skill Tracker)
            </h3>
            <p style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin: 0.25rem 0 0;">Lưu giữ trạng thái học tập theo thuật toán ngắt quãng SM-2</p>
          </div>
          <div style="display: flex; gap: 0.75rem; align-items: center;">
            <a href="#/skills/osce-randomizer" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.6rem 1.1rem; background: var(--color-primary, #0284c7); color: #fff; border-radius: 8px; font-size: 0.85rem; font-weight: 700; text-decoration: none;">
              <i class="fa-solid fa-clone"></i> Ôn Flashcard OSCE (SM-2)
            </a>
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
          <input type="text" id="lesson-search" placeholder="Tìm kiếm kỹ năng lâm sàng..."
            aria-label="Tìm kiếm kỹ năng lâm sàng">
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
                  <span class="part-icon"><i class="fa-solid fa-file-medical"></i></span>
                  <span class="part-text">Phần 1: Bệnh án Lâm sàng</span>
                  <span class="part-count-badge">2</span>
                </a>
              </li>
              <li>
                <a href="#part2-section" class="part-nav-item p2" data-target="part2-section">
                  <span class="part-icon"><i class="fa-solid fa-kit-medical"></i></span>
                  <span class="part-text">Phần 2: Hồi sức Cấp cứu</span>
                  <span class="part-count-badge">8</span>
                </a>
              </li>
              <li>
                <a href="#part3-section" class="part-nav-item p3" data-target="part3-section">
                  <span class="part-icon"><i class="fa-solid fa-stethoscope"></i></span>
                  <span class="part-text">Phần 3: Khám Hệ Cơ Quan</span>
                  <span class="part-count-badge">11</span>
                </a>
              </li>
              <li>
                <a href="#part4-section" class="part-nav-item p4" data-target="part4-section">
                  <span class="part-icon"><i class="fa-solid fa-microscope"></i></span>
                  <span class="part-text">Phần 4: Cận Lâm Sàng</span>
                  <span class="part-count-badge">4</span>
                </a>
              </li>
              <li>
                <a href="#part5-section" class="part-nav-item p5" data-target="part5-section">
                  <span class="part-icon"><i class="fa-solid fa-capsules"></i></span>
                  <span class="part-text">Phần 5: Quản lý Điều trị</span>
                  <span class="part-count-badge">5</span>
                </a>
              </li>
              <li>
                <a href="#part6-section" class="part-nav-item p6" data-target="part6-section">
                  <span class="part-icon"><i class="fa-solid fa-syringe"></i></span>
                  <span class="part-text">Phần 6: Kỹ năng Thủ thuật</span>
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
            <h3>Không tìm thấy kỹ năng lâm sàng nào</h3>
            <p>Vui lòng thử từ khóa khác hoặc xóa bộ lọc.</p>
          </div>

          <!-- ===== KỸ NĂNG THƯỜNG DÙNG (FAVORITES) ===== -->
          <section id="favorites-section" class="favorites-section" data-favorite-type="skills" style="display: none;">
            <div class="physio-group-container" id="favorites-container"
              style="border-left-color: var(--color-warning, #f59e0b); margin-bottom: 2rem; transition: padding var(--tr, 0.2s);">
              <div class="physio-group-header collapsible-header" id="favorites-header"
                style="background: linear-gradient(90deg, var(--color-warning-hl, rgba(245,158,11,0.1)) 0%, transparent 100%); border-top-right-radius: calc(var(--radius-lg, 12px) - 1px); cursor: pointer; display: flex; justify-content: space-between; align-items: center; width: 100%;">
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                  <span class="physio-group-icon"
                    style="color: var(--color-warning, #f59e0b); border-color: var(--color-warning-hl, rgba(245,158,11,0.2));"><i
                      class="fa-solid fa-star"></i></span>
                  <h3 id="favorites-heading" style="margin: 0;">Kỹ năng thường dùng</h3>
                </div>
                <span class="favorites-toggle-indicator"
                  style="font-size: 0.95rem; color: var(--color-text-muted, #64748b); margin-right: 0.5rem;"><i
                    class="fa-solid fa-chevron-up"></i></span>
              </div>
              <div class="favorites-collapse-wrapper" id="favorites-collapse">
                <div class="favorites-collapse-inner">
                  <div class="specialty-grid" id="favorites-grid">
                    <!-- các kỹ năng được ghim sẽ hiển thị tại đây -->
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- PHẦN 1: BỆNH ÁN LÂM SÀNG -->
          <section id="part1-section" aria-labelledby="part1-heading">
            <div class="physio-group-container">
              <div class="physio-group-header">
                <span class="physio-group-icon"><i class="fa-solid fa-file-medical"></i></span>
                <h3 id="part1-heading">Phần 1: Bệnh án Lâm sàng</h3>
              </div>
              <div class="specialty-grid">

                <!-- 1. Bệnh án Nội khoa -->
                <a href="src/content/skills/benh-an/kn-benhan-noikhoa.html" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">📋</div>
                    <div class="specialty-info">
                      <h3>Bệnh Án Nội Khoa</h3>
                      <p>Hướng dẫn khai thác bệnh sử, tiền sử, thăm khám hệ cơ quan và viết tóm tắt bệnh án nội khoa chuẩn.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action">
                    <span>Vào trang nội khoa</span>
                    <i class="fa-solid fa-chevron-right"></i>
                  </div>
                </a>

                <!-- 2. Bệnh án Ngoại khoa -->
                <a href="#/skills/benh-an" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">🪡</div>
                    <div class="specialty-info">
                      <h3>Bệnh Án & Bàn Giao SBAR</h3>
                      <p>Quy trình khám bệnh án chuyên khoa, ghi nhận tiền phẫu, hậu phẫu và giao tiếp lâm sàng theo chuẩn SBAR.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action">
                    <span>Xem quy trình</span>
                    <i class="fa-solid fa-chevron-right"></i>
                  </div>
                </a>

              </div>
            </div>
          </section>

          <!-- PHẦN 2: HỒI SỨC CẤP CỨU -->
          <section id="part2-section" aria-labelledby="part2-heading">
            <div class="physio-group-container">
              <div class="physio-group-header">
                <span class="physio-group-icon"><i class="fa-solid fa-kit-medical"></i></span>
                <h3 id="part2-heading">Phần 2: Hồi sức Cấp cứu</h3>
              </div>
              <div class="specialty-grid">

                <!-- 1. Đánh giá & Phân loại (Triage) -->
                <a href="src/content/skills/resuscitation/kn-triage.html" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">🚦</div>
                    <div class="specialty-info">
                      <h3>Đánh Giá & Phân Loại (Triage)</h3>
                      <p>Nguyên lý phân loại cấp cứu ESI, đánh giá nhanh ABCDE, quy tắc SAMPLE và Triage trong thảm họa.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action">
                    <span>Xem quy trình</span>
                    <i class="fa-solid fa-chevron-right"></i>
                  </div>
                </a>

                <!-- Virtual Patient Hub -->
                <a href="#/skills/benh-nhan-ao" class="specialty-card" style="border: 2px solid var(--color-primary, #0284c7);">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">🩺</div>
                    <div class="specialty-info">
                      <h3>Giả Lập Bệnh Nhân Ảo (ICU Simulator)</h3>
                      <p>Nhập vai bác sĩ tiếp nhận ca cấp cứu tương tác đa nhánh. Ra quyết định & nhận feedback tức thì.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action" style="color: var(--color-primary, #0284c7); font-weight: 700;">
                    <span>Vào Hub Ca Bệnh</span>
                    <i class="fa-solid fa-play"></i>
                  </div>
                </a>

                <!-- 2. Hồi sinh tim phổi cơ bản & nâng cao -->
                <a href="src/content/skills/resuscitation/kn-hoisinh-timphoi.html" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">⚡</div>
                    <div class="specialty-info">
                      <h3>Hồi Sinh Tim Phổi (CPR & ACLS)</h3>
                      <p>Kỹ thuật ép tim chất lượng cao, thổi ngạt, vận hành AED/khử rung, tiếp cận nhịp sốc được/không sốc được, dùng thuốc và 5H-5T.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action">
                    <span>Xem quy trình</span>
                    <i class="fa-solid fa-chevron-right"></i>
                  </div>
                </a>

                <!-- 3. Kiểm soát đường thở & thông khí -->
                <a href="src/content/skills/resuscitation/kn-kiemsoat-duongtho.html" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">🌬️</div>
                    <div class="specialty-info">
                      <h3>Kiểm Soát Đường Thở & Thông Khí</h3>
                      <p>Khai thông đường thở bằng tay, thiết bị hỗ trợ (OPA, NPA, SGA, ETI), bóp bóng mặt nạ (BMV) và theo dõi thán đồ (EtCO2).</p>
                    </div>
                  </div>
                  <div class="specialty-card-action">
                    <span>Xem quy trình</span>
                    <i class="fa-solid fa-chevron-right"></i>
                  </div>
                </a>

                <!-- 4. Hồi sức huyết động & chống sốc -->
                <a href="src/content/skills/resuscitation/kn-hoisuc-huyetdong.html" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">🩸</div>
                    <div class="specialty-info">
                      <h3>Hồi Sức Huyết Động & Chống Sốc</h3>
                      <p>Phân loại các thể sốc (giảm thể tích, tim, phân bố, tắc nghẽn), tiếp cận bù dịch nhanh, sử dụng vận mạch và thuốc co mạch.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action">
                    <span>Xem quy trình</span>
                    <i class="fa-solid fa-chevron-right"></i>
                  </div>
                </a>

                <!-- 5. Siêu âm cấp cứu tại giường -->
                <a href="src/content/skills/resuscitation/kn-sieuam-capcuu.html" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">🔊</div>
                    <div class="specialty-info">
                      <h3>Siêu Âm Cấp Cứu Tại Giường (POCUS)</h3>
                      <p>Thực hiện siêu âm POCUS trong cấp cứu, giao thức eFAST tìm dịch tự do, giao thức RUSH trong sốc và đánh giá tĩnh mạch chủ dưới (IVC).</p>
                    </div>
                  </div>
                  <div class="specialty-card-action">
                    <span>Xem quy trình</span>
                    <i class="fa-solid fa-chevron-right"></i>
                  </div>
                </a>

                <!-- 6. Xử trí ngộ độc cấp tính -->
                <a href="src/content/skills/resuscitation/kn-xutri-ngodoc.html" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">🧪</div>
                    <div class="specialty-info">
                      <h3>Xử Trí Ngộ Độc Cấp Tính</h3>
                      <p>Nhận diện hội chứng nhiễm độc (toxidromes), biện pháp hạn chế hấp thu (rửa dạ dày, than hoạt), đào thải và dùng antidote đặc hiệu.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action">
                    <span>Xem quy trình</span>
                    <i class="fa-solid fa-chevron-right"></i>
                  </div>
                </a>

                <!-- 7. Xử trí Phản vệ -->
                <a href="src/content/skills/resuscitation/kn-phanve.html" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">🐝</div>
                    <div class="specialty-info">
                      <h3>Xử Trí Phản Vệ</h3>
                      <p>Chẩn đoán, phân độ và phác đồ xử trí cấp cứu phản vệ theo Thông tư 51/2017/TT-BYT.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action">
                    <span>Xem phác đồ</span>
                    <i class="fa-solid fa-chevron-right"></i>
                  </div>
                </a>

              </div>
            </div>
          </section>

          <!-- PHẦN 3: KHÁM LÂM SÀNG THEO HỆ CƠ QUAN -->
          <section id="part3-section" aria-labelledby="part3-heading">
            <div class="physio-group-container">
              <div class="physio-group-header">
                <span class="physio-group-icon"><i class="fa-solid fa-stethoscope"></i></span>
                <h3 id="part3-heading">Phần 3: Khám Lâm Sàng Theo Hệ Cơ Quan</h3>
              </div>
              <div class="specialty-grid">

                <!-- 1. Hệ tim mạch -->
                <a href="src/content/skills/clinical/kham-tim-mach/kn-timmach.html" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">🫀</div>
                    <div class="specialty-info">
                      <h3>Khám Hệ Tim Mạch</h3>
                      <p>Khám tim, tĩnh mạch cổ nổi (JVP), động mạch ngoại biên, chẩn đoán các tiếng tim bất thường và tiếng thổi cơ năng/thực thể.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action">
                    <span>Xem quy trình</span>
                    <i class="fa-solid fa-chevron-right"></i>
                  </div>
                </a>

                <!-- 2. Hệ hô hấp -->
                <a href="src/content/skills/clinical/kham-ho-hap/kn-hohap.html" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">🫁</div>
                    <div class="specialty-info">
                      <h3>Khám Hệ Hô Hấp</h3>
                      <p>Kiểm tra hình dạng lồng ngực, tần số thở, rung thanh, gõ phổi, nghe rì rào phế nang và phát hiện âm bệnh lý (ran, rales, khò khè).</p>
                    </div>
                  </div>
                  <div class="specialty-card-action">
                    <span>Xem quy trình</span>
                    <i class="fa-solid fa-chevron-right"></i>
                  </div>
                </a>

                <!-- 3. Hệ tiêu hóa -->
                <a href="src/content/skills/clinical/kham-tieu-hoa/kn-tieuhoa.html" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">🤰</div>
                    <div class="specialty-info">
                      <h3>Khám Hệ Tiêu Hóa</h3>
                      <p>Khám bụng 4 bước (nhìn, nghe, gõ, sờ), sờ gan lách, gõ đục vùng thấp, phát hiện cổ trướng và các điểm đau ruột thừa, túi mật.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action">
                    <span>Xem quy trình</span>
                    <i class="fa-solid fa-chevron-right"></i>
                  </div>
                </a>

                <!-- 4. Hệ thần kinh -->
                <a href="src/content/skills/clinical/kham-than-kinh/kn-thankinh.html" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">🧠</div>
                    <div class="specialty-info">
                      <h3>Khám Hệ Thần Kinh</h3>
                      <p>Khám 12 đôi dây thần kinh sọ, đánh giá ý thức (GCS), trương lực cơ, cơ lực, cảm giác nông/sâu, phản xạ và dấu màng não.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action">
                    <span>Xem quy trình</span>
                    <i class="fa-solid fa-chevron-right"></i>
                  </div>
                </a>

                <!-- 5. Hệ thị giác / Mắt -->
                <a href="src/content/skills/clinical/kham-thi-giac/kn-thigiac.html" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">👁️</div>
                    <div class="specialty-info">
                      <h3>Khám Mắt & Thị Giác</h3>
                      <p>Kiểm tra thị lực bằng bảng Snellen, kiểm tra thị trường, soi đáy mắt trực tiếp, phản xạ đồng tử và kiểm tra vận nhãn.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action">
                    <span>Xem quy trình</span>
                    <i class="fa-solid fa-chevron-right"></i>
                  </div>
                </a>

                <!-- 6. Tai mũi họng -->
                <a href="src/content/skills/clinical/kham-tai-mui-hong/kn-taimuihong.html" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">👂</div>
                    <div class="specialty-info">
                      <h3>Khám Tai Mũi Họng</h3>
                      <p>Đánh giá màng nhĩ bằng soi tai, kiểm tra thính lực (test Rinne, Weber), soi mũi, họng và khám hạch vùng cổ quanh hàm.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action">
                    <span>Xem quy trình</span>
                    <i class="fa-solid fa-chevron-right"></i>
                  </div>
                </a>

                <!-- 7. Hệ nội tiết -->
                <a href="src/content/skills/clinical/kham-noi-tiet/kn-noitiet.html" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">🦋</div>
                    <div class="specialty-info">
                      <h3>Khám Hệ Nội Tiết</h3>
                      <p>Khám tuyến giáp (sờ từ phía sau, nghiệm pháp nuốt), tìm các dấu hiệu Basedow (lồi mắt, run tay) và dấu hiệu Cushing.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action">
                    <span>Xem quy trình</span>
                    <i class="fa-solid fa-chevron-right"></i>
                  </div>
                </a>

                <!-- 8. Hệ sinh dục & sinh sản -->
                <a href="src/content/skills/clinical/kham-sinh-duc/kn-sinhduc.html" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">⚧️</div>
                    <div class="specialty-info">
                      <h3>Khám Hệ Sinh Dục & Khám Vú</h3>
                      <p>Thăm khám tuyến vú (tìm khối u, hạch nách), khám cơ quan sinh dục nam/nữ, phát hiện thoát vị bẹn và tràn dịch tinh mạc.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action">
                    <span>Xem quy trình</span>
                    <i class="fa-solid fa-chevron-right"></i>
                  </div>
                </a>

                <!-- 9. Hệ thận - tiết niệu -->
                <a href="src/content/skills/clinical/kham-than-tiet-nieu/kn-thantietnieu.html" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">🫘</div>
                    <div class="specialty-info">
                      <h3>Khám Hệ Thận - Tiết Niệu</h3>
                      <p>Thực hiện chạm thận, bập bềnh thận phát hiện thận to, gõ cầu bàng quang, khám các điểm đau niệu quản và khám phù.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action">
                    <span>Xem quy trình</span>
                    <i class="fa-solid fa-chevron-right"></i>
                  </div>
                </a>

                <!-- 10. Hệ cơ xương khớp -->
                <a href="src/content/skills/clinical/kham-co-xuong-khop/kn-coxuongkhop.html" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">🦴</div>
                    <div class="specialty-info">
                      <h3>Khám Hệ Cơ Xương Khớp</h3>
                      <p>Tầm soát khớp nhanh GALS (Gait, Arms, Legs, Spine). Khám chi tiết các khớp cột sống, vai, gối, háng và bàn tay.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action">
                    <span>Xem quy trình</span>
                    <i class="fa-solid fa-chevron-right"></i>
                  </div>
                </a>

                <!-- 11. Da, tóc và móng -->
                <a href="src/content/skills/clinical/kham-da-toc-mong/kn-datocmong.html" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">💅</div>
                    <div class="specialty-info">
                      <h3>Khám Da, Tóc và Móng</h3>
                      <p>Nhận biết các tổn thương da nguyên phát/thứ phát, phát hiện ngón tay dùi trống, khía móng Schamroth và rụng tóc khu trú/toàn thể.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action">
                    <span>Xem quy trình</span>
                    <i class="fa-solid fa-chevron-right"></i>
                  </div>
                </a>

              </div>
            </div>
          </section>

          <!-- PHẦN 4: CẬN LÂM SÀNG -->
          <section id="part4-section" aria-labelledby="part4-heading">
            <div class="physio-group-container">
              <div class="physio-group-header">
                <span class="physio-group-icon"><i class="fa-solid fa-microscope"></i></span>
                <h3 id="part4-heading">Phần 4: Cận Lâm Sàng</h3>
              </div>
              <div class="specialty-grid">

                <!-- 1. Đọc Kết quả Cận lâm sàng -->
                <a href="src/content/skills/can-lam-sang/doc-kqcls.html" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">🔬</div>
                    <div class="specialty-info">
                      <h3>Đọc Kết Quả Cận Lâm Sàng</h3>
                      <p>Hệ thống hướng dẫn phân tích kết quả xét nghiệm sinh hóa, huyết học và hình ảnh học.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action">
                    <span>Vào trang đọc</span>
                    <i class="fa-solid fa-chevron-right"></i>
                  </div>
                </a>

                <!-- 2. Hướng dẫn đọc ECG toàn diện -->
                <a href="#/skills/ecg-studio" class="specialty-card" style="border: 2px solid var(--color-primary, #0284c7);">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">📈</div>
                    <div class="specialty-info">
                      <h3>Interactive ECG Studio</h3>
                      <p>Kỹ thuật đo 10 điện cực chuẩn, khắc phục nhiễu sóng và 10 bước phân tích ECG hệ thống.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action" style="color: var(--color-primary, #0284c7); font-weight: 700;">
                    <span>Mở ECG Studio</span>
                    <i class="fa-solid fa-play"></i>
                  </div>
                </a>

                <!-- 3. Thính chẩn Tim Phổi -->
                <a href="#/skills/auscultation" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">🎧</div>
                    <div class="specialty-info">
                      <h3>Âm Thanh Thính Chẩn Tim - Phổi</h3>
                      <p>Nghe và phân tích các âm bệnh lý: ran nổ, ran ẩm, tiếng cọ màng phổi, T3, T4, tiếng thổi hẹp hở van.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action">
                    <span>Mở Trainer</span>
                    <i class="fa-solid fa-chevron-right"></i>
                  </div>
                </a>

                <!-- 4. Đọc X-quang Ngực & Bụng -->
                <a href="src/content/skills/can-lam-sang/doc-xq-nguc.html" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">🩻</div>
                    <div class="specialty-info">
                      <h3>Đọc X-quang Ngực (CXR) & Bụng</h3>
                      <p>Quy trình ABCDE đọc phim X-quang ngực thẳng/nghiêng và phim X-quang bụng không sửa soạn.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action">
                    <span>Xem hướng dẫn</span>
                    <i class="fa-solid fa-chevron-right"></i>
                  </div>
                </a>

              </div>
            </div>
          </section>

          <!-- PHẦN 5: QUẢN LÝ ĐIỀU TRỊ -->
          <section id="part5-section" aria-labelledby="part5-heading">
            <div class="physio-group-container">
              <div class="physio-group-header">
                <span class="physio-group-icon"><i class="fa-solid fa-capsules"></i></span>
                <h3 id="part5-heading">Phần 5: Quản lý Điều trị</h3>
              </div>
              <div class="specialty-grid">

                <!-- 1. Lựa chọn kháng sinh -->
                <a href="src/content/skills/treatment-management/luachon-khangsinh.html" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">💊</div>
                    <div class="specialty-info">
                      <h3>Lựa Chọn Kháng Sinh Kinh Nghiệm</h3>
                      <p>Nguyên tắc sử dụng kháng sinh ban đầu theo kinh nghiệm, phân loại AWaRe cho các nhiễm trùng thường gặp.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action">
                    <span>Xem hướng dẫn</span>
                    <i class="fa-solid fa-chevron-right"></i>
                  </div>
                </a>

                <!-- 2. Lý luận điều trị nội khoa -->
                <a href="src/content/skills/treatment-management/lyluan-dieutrinoikhoa.html" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">🧠</div>
                    <div class="specialty-info">
                      <h3>Lý Luận Điều Trị Nội Khoa</h3>
                      <p>Phương pháp xác định mục tiêu điều trị, lựa chọn biện pháp dùng thuốc và không dùng thuốc.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action">
                    <span>Xem hướng dẫn</span>
                    <i class="fa-solid fa-chevron-right"></i>
                  </div>
                </a>

                <!-- 3. Clinical Reasoning Engine -->
                <a href="src/content/skills/treatment-management/clinical-reasoning.html" class="specialty-card" style="border: 2px solid var(--color-purple, #7c3aed);">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">💡</div>
                    <div class="specialty-info">
                      <h3>Clinical Reasoning Engine</h3>
                      <p>Công cụ hỗ trợ trình bệnh án SBAR, SNAPPS và ma trận Semantic Qualifier Grid chuẩn hóa.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action" style="color: var(--color-purple, #7c3aed); font-weight: 700;">
                    <span>Mở Engine Tư Duy</span>
                    <i class="fa-solid fa-chevron-right"></i>
                  </div>
                </a>

                <!-- 4. Kê đơn thuốc Nhi khoa -->
                <a href="src/content/skills/treatment-management/ke-toa-tham-van-thuoc-tre-em.html" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">👶</div>
                    <div class="specialty-info">
                      <h3>Kê Toa & Tham Vấn Thuốc Trẻ Em</h3>
                      <p>Tính liều theo cân nặng (mg/kg), diện tích da (BSA), dạng bào chế siro/huyền dịch và dặn dò an toàn.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action">
                    <span>Xem quy trình</span>
                    <i class="fa-solid fa-chevron-right"></i>
                  </div>
                </a>

              </div>
            </div>
          </section>

          <!-- PHẦN 6: KỸ NĂNG THỦ THUẬT -->
          <section id="part6-section" aria-labelledby="part6-heading">
            <div class="physio-group-container">
              <div class="physio-group-header">
                <span class="physio-group-icon"><i class="fa-solid fa-syringe"></i></span>
                <h3 id="part6-heading">Phần 6: Kỹ năng Thủ thuật</h3>
              </div>
              <div class="specialty-grid">

                <!-- 1. Đặt nội khí quản -->
                <a href="src/content/skills/procedures/dat-nkq.html" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">🌬️</div>
                    <div class="specialty-info">
                      <h3>Đặt Nội Khí Quản (NKQ)</h3>
                      <p>Quy trình Đặt ống nội khí quản 7 bước chuẩn AHA, tư thế Sniffing và an toàn đường thở.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action">
                    <span>Xem quy trình step-by-step</span>
                    <i class="fa-solid fa-chevron-right"></i>
                  </div>
                </a>

                <!-- 2. Chọc dò dịch màng phổi -->
                <a href="src/content/skills/procedures/choc-dich-mang-phoi.html" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">🫁</div>
                    <div class="specialty-info">
                      <h3>Chọc Dò Dịch Màng Phổi</h3>
                      <p>Quy trình chọc màng phổi khoang LS 7-8 bờ trên xương sườn dưới và tiêu chuẩn Light.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action">
                    <span>Xem quy trình step-by-step</span>
                    <i class="fa-solid fa-chevron-right"></i>
                  </div>
                </a>

                <!-- 3. Chọc dò dịch não tủy -->
                <a href="src/content/skills/procedures/choc-dich-tuy-song.html" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">🧠</div>
                    <div class="specialty-info">
                      <h3>Chọc Dò Dịch Tủy Sống (Lumbar Puncture)</h3>
                      <p>Quy trình chọc tủy L3-L4 tư thế con tôm, đo áp lực manometer và phân tích CSF.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action">
                    <span>Xem quy trình step-by-step</span>
                    <i class="fa-solid fa-chevron-right"></i>
                  </div>
                </a>

                <!-- 4. Sơ cứu cầm máu băng bó -->
                <a href="src/content/skills/procedures/so-cuu-cam-mau-bang-bo.html" class="specialty-card">
                  <div class="specialty-card-top">
                    <div class="specialty-icon">🩹</div>
                    <div class="specialty-info">
                      <h3>Sơ Cứu Cầm Máu & Băng Bó</h3>
                      <p>Kỹ thuật băng ép cầm máu, garô khẩn cấp và nẹp cố định chi gãy ngoài bệnh viện.</p>
                    </div>
                  </div>
                  <div class="specialty-card-action">
                    <span>Xem quy trình step-by-step</span>
                    <i class="fa-solid fa-chevron-right"></i>
                  </div>
                </a>

              </div>
            </div>
          </section>

        </main>

        <!-- SIDEBAR WIDGET: 12 ĐÔI DÂY THẦN KINH SỌ -->
        <aside class="layout-widget-sidebar" aria-label="Widget kỹ năng tương tác">
          <section class="widget-card" aria-labelledby="nerve-title">
            <div class="widget-card-title">
              <h3 id="nerve-title"><i class="fa-solid fa-brain"></i> Khám Thần Kinh Sọ</h3>
              <span class="clock-current-time" style="background: var(--color-purple-hl, #ede9fe); color: var(--color-purple, #7c3aed); font-size: 0.75rem; font-weight: 700; padding: 0.2rem 0.5rem; border-radius: 4px;">CN I - XII</span>
            </div>
            <p style="font-size: var(--text-xs, 0.75rem); color: var(--color-text-muted, #64748b); margin-bottom: 1rem; line-height: 1.4;">
              Nhấp chọn từng dây thần kinh sọ dưới đây để tra cứu nhanh chức năng, kỹ thuật thăm khám lâm sàng và dấu hiệu tổn thương tương ứng.
            </p>
            <!-- Nerve Grid Buttons -->
            <div class="nerve-grid" id="nerveGrid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.4rem; margin-bottom: 0.75rem;">
              <div class="nerve-btn active" data-nerve="cn1">CN I</div>
              <div class="nerve-btn" data-nerve="cn2">CN II</div>
              <div class="nerve-btn" data-nerve="cn3">CN III</div>
              <div class="nerve-btn" data-nerve="cn4">CN IV</div>
              <div class="nerve-btn" data-nerve="cn5">CN V</div>
              <div class="nerve-btn" data-nerve="cn6">CN VI</div>
              <div class="nerve-btn" data-nerve="cn7">CN VII</div>
              <div class="nerve-btn" data-nerve="cn8">CN VIII</div>
              <div class="nerve-btn" data-nerve="cn9">CN IX</div>
              <div class="nerve-btn" data-nerve="cn10">CN X</div>
              <div class="nerve-btn" data-nerve="cn11">CN XI</div>
              <div class="nerve-btn" data-nerve="cn12">CN XII</div>
            </div>
            <!-- Details Panel -->
            <div class="physio-details-card" id="nerveDetailsCard" style="margin-top: 0.5rem; padding: 1rem; background: var(--color-surface-offset, #f8fafc); border-radius: 8px; border: 1px solid var(--color-border, #e2e8f0);">
              <!-- Populated dynamically by TypeScript -->
            </div>
          </section>
        </aside>
      </div><!-- end dashboard-layout -->
    </div><!-- end main-wrapper -->
  `;
}
