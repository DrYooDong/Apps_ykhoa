/**
 * CliniPortal 2.0 — EBM (Evidence-Based Medicine) Master Command Center View
 * Path: src/content/ebm/ebm-view.ts
 */

import './css/yhcc-hub.css';
import './css/pubmed-guidelines-board.css';
import '../../../css/components/evidence-bridge.css';

export function renderEbmView(): string {
  return `
    <div class="ebm-hub-page-wrapper" style="width: 100%; max-width: 1520px; margin: 0 auto; padding-top: 1.5rem; padding-bottom: 3rem;">
      
      <!-- BREADCRUMB -->
      <div class="breadcrumb" style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 1.25rem; display: flex; align-items: center; gap: 0.4rem;">
        <a href="#/" style="color: inherit; text-decoration: none;">🏠 Trang chủ</a>
        <span>/</span>
        <span style="color: var(--color-primary, #0284c7); font-weight: 700;">Y học Chứng cứ (EBM Command Center)</span>
      </div>

      <!-- VIPPRO HERO COMMAND CENTER BANNER -->
      <section class="hub-hero-vippro" aria-labelledby="hub-hero-title" style="margin-bottom: 2rem;">
        <div class="hub-hero-mesh-bg">
          <div class="hub-hero-mesh-1"></div>
          <div class="hub-hero-mesh-2"></div>
        </div>

        <div class="hub-hero-inner">
          <div class="hub-hero-header-row">
            <div>
              <div class="hub-hero-eyebrow-badge">
                <span class="hub-hero-pulse-dot"></span>
                EBM Master Command Center — Evidence-Based Medicine Pro Suite
              </div>
              <h1 class="hub-hero-title-main" id="hub-hero-title">
                Trung Tâm Y Học Chứng Cứ<br>& Hướng Dẫn Điều Trị Lâm Sàng
              </h1>
            </div>

            <!-- KHO GUIDELINE HERO BUTTON -->
            <a href="#/ebm/kho-guidelines" class="hub-hero-btn-kho" title="Truy cập Kho 100+ Guidelines tóm tắt">
              <i class="fa-solid fa-folder-open"></i>
              <span>Truy Cập Kho Guidelines</span>
            </a>
          </div>

          <p class="hub-hero-desc">
            Hệ thống tinh hoa tổng hợp và phân tích thiết kế nghiên cứu khoa học, phương pháp thống kê y học, tháp bằng chứng 6S, chu trình 5As và kho hướng dẫn thực hành lâm sàng EBM chuẩn hóa từ Bộ Y Tế, ESC, ADA, KDIGO, GOLD, GINA.
          </p>

          <!-- OMNISEARCH BAR -->
          <div class="hub-command-search-wrapper" style="margin-top: 1.5rem; margin-bottom: 1.5rem;">
            <div class="hub-command-search">
              <i class="fa-solid fa-magnifying-glass" style="color: rgba(255,255,255,0.7); margin-right: 0.75rem; font-size: 1.1rem;"></i>
              <input type="text" id="ebmOmniSearchInput" placeholder="Tìm kiếm nhanh 100+ phác đồ, nghiên cứu RCT, phân tích gộp, thang điểm EBM..." autocomplete="off" />
              <span class="hub-hotkey-badge">Ctrl + K</span>
              <button type="button" id="ebmOmniSearchBtn" title="Tìm kiếm">
                <i class="fa-solid fa-arrow-right"></i>
              </button>
            </div>
            <div class="hub-search-tags">
              <span style="font-size: 0.72rem; color: rgba(255,255,255,0.6); font-weight: 600;">Gợi ý:</span>
              <button type="button" class="hub-search-tag-chip js-quick-tag" data-tag="SGLT2i">SGLT2i CKD</button>
              <button type="button" class="hub-search-tag-chip js-quick-tag" data-tag="Tăng huyết áp">Tăng Huyết Áp 2024</button>
              <button type="button" class="hub-search-tag-chip js-quick-tag" data-tag="COPD">GOLD 2025</button>
              <button type="button" class="hub-search-tag-chip js-quick-tag" data-tag="Kháng sinh">Kháng Sinh BYT</button>
              <button type="button" class="hub-search-tag-chip js-quick-tag" data-tag="Meta-analysis">Meta-analysis</button>
            </div>
          </div>

          <!-- REALTIME KPI METRICS GRID -->
          <div class="hub-kpi-grid">
            <div class="hub-kpi-card">
              <div class="hub-kpi-top">
                <span class="hub-kpi-label">Tổng Guidelines</span>
                <div class="hub-kpi-icon">📚</div>
              </div>
              <div class="hub-kpi-val" id="stat-total-guidelines">100+</div>
              <div class="hub-kpi-sub">Đồng bộ tự động</div>
            </div>

            <div class="hub-kpi-card">
              <div class="hub-kpi-top">
                <span class="hub-kpi-label">Practice-Changing</span>
                <div class="hub-kpi-icon">🏆</div>
              </div>
              <div class="hub-kpi-val" id="stat-practice-changing">73</div>
              <div class="hub-kpi-sub">Thay đổi thực hành</div>
            </div>

            <div class="hub-kpi-card">
              <div class="hub-kpi-top">
                <span class="hub-kpi-label">Bộ Y Tế / Hội VN</span>
                <div class="hub-kpi-icon">🇻🇳</div>
              </div>
              <div class="hub-kpi-val" id="stat-moh-guidelines">37</div>
              <div class="hub-kpi-sub">Khuyến cáo chuẩn</div>
            </div>

            <div class="hub-kpi-card">
              <div class="hub-kpi-top">
                <span class="hub-kpi-label">Quốc Tế (ESC/ADA)</span>
                <div class="hub-kpi-icon">🌐</div>
              </div>
              <div class="hub-kpi-val" id="stat-intl-guidelines">63+</div>
              <div class="hub-kpi-sub">Cập nhật toàn cầu</div>
            </div>
          </div>

        </div>
      </section>

      <!-- 4 BENTO MAIN MODULES NAVIGATOR (PRO SUITE SUITE) -->
      <section style="margin-bottom: 2rem;" aria-label="Phân hệ Y học chứng cứ">
        <div class="ebm-bento-main-grid">
          
          <!-- Module 1: Thống Kê Y Học & Thiết Kế Nghiên Cứu -->
          <a href="#/ebm/thong-ke-y-hoc" class="ebm-bento-card-pro" style="--card-accent:#0284c7; --card-icon-bg:rgba(2,132,199,0.1); --card-glow:rgba(2,132,199,0.2);">
            <div>
              <div class="ebm-bento-top-row">
                <div class="ebm-bento-icon-box">
                  <i class="fa-solid fa-chart-line"></i>
                </div>
                <span class="ebm-bento-badge-pill">Khoa Học Dữ Liệu</span>
              </div>
              <h2 class="ebm-bento-title">Thống Kê Y Học & Nghiên Cứu</h2>
              <p class="ebm-bento-desc">
                Thiết kế thử nghiệm lâm sàng ngẫu nhiên có đối chứng (RCT), Phân tích gộp (Meta-analysis), Đánh giá nguy cơ sai số RoB-2 và phân tích hồi quy y sinh.
              </p>
              <div class="ebm-bento-tags-row">
                <span class="ebm-bento-tag-item">RCT &amp; Observational</span>
                <span class="ebm-bento-tag-item">Forest Plot &amp; Funnel</span>
                <span class="ebm-bento-tag-item">Risk of Bias RoB-2</span>
              </div>
            </div>
            <div class="ebm-bento-action-btn">
              <span>Vào phân hệ Thống kê</span>
              <i class="fa-solid fa-arrow-right"></i>
            </div>
          </a>

          <!-- Module 2: Kho Guidelines & Phác Đồ -->
          <a href="#/ebm/kho-guidelines" class="ebm-bento-card-pro" style="--card-accent:#7c3aed; --card-icon-bg:rgba(124,58,237,0.1); --card-glow:rgba(124,58,237,0.2);">
            <div>
              <div class="ebm-bento-top-row">
                <div class="ebm-bento-icon-box">
                  <i class="fa-solid fa-book-medical"></i>
                </div>
                <span class="ebm-bento-badge-pill">100+ Phác Đồ</span>
              </div>
              <h2 class="ebm-bento-title">Kho Guidelines & Khuyến Cáo</h2>
              <p class="ebm-bento-desc">
                Tra cứu hướng dẫn điều trị chuẩn hóa theo bậc thang chứng cứ GRADE từ Bộ Y Tế Việt Nam, ESC, AHA/ACC, ADA, KDIGO, GOLD, GINA và IDSA.
              </p>
              <div class="ebm-bento-tags-row">
                <span class="ebm-bento-tag-item">Bộ Y Tế Việt Nam</span>
                <span class="ebm-bento-tag-item">ESC / AHA Tim Mạch</span>
                <span class="ebm-bento-tag-item">ADA Đái Tháo Đường</span>
              </div>
            </div>
            <div class="ebm-bento-action-btn">
              <span>Mở Kho Guidelines</span>
              <i class="fa-solid fa-arrow-right"></i>
            </div>
          </a>

          <!-- Module 3: Guideline Radar (Diff Studio) -->
          <a href="#/ebm/radar" class="ebm-bento-card-pro" style="--card-accent:#10b981; --card-icon-bg:rgba(16,185,129,0.1); --card-glow:rgba(16,185,129,0.2);">
            <div>
              <div class="ebm-bento-top-row">
                <div class="ebm-bento-icon-box">
                  <i class="fa-solid fa-satellite-dish"></i>
                </div>
                <span class="ebm-bento-badge-pill">Diff View Trước/Sau</span>
              </div>
              <h2 class="ebm-bento-title">Guideline Radar (Cập Nhật)</h2>
              <p class="ebm-bento-desc">
                Hệ thống Radar quét và đối sánh thay đổi khuyến cáo Trước vs Sau, làm nổi bật điểm mới thay đổi thực hành lâm sàng (Practice-Changing Updates).
              </p>
              <div class="ebm-bento-tags-row">
                <span class="ebm-bento-tag-item">So sánh Trước/Sau</span>
                <span class="ebm-bento-tag-item">Practice-Changing</span>
                <span class="ebm-bento-tag-item">Timeline Cập Nhật</span>
              </div>
            </div>
            <div class="ebm-bento-action-btn">
              <span>Xem Radar Cập Nhật</span>
              <i class="fa-solid fa-arrow-right"></i>
            </div>
          </a>

          <!-- Module 4: EBM Practice Lab & Bedside Tools -->
          <a href="#/ebm/ebm-lab" class="ebm-bento-card-pro" style="--card-accent:#06b6d4; --card-icon-bg:rgba(6,182,212,0.1); --card-glow:rgba(6,182,212,0.2);">
            <div>
              <div class="ebm-bento-top-row">
                <div class="ebm-bento-icon-box">
                  <i class="fa-solid fa-flask-vial"></i>
                </div>
                <span class="ebm-bento-badge-pill">Thực Hành Lâm Sàng</span>
              </div>
              <h2 class="ebm-bento-title">EBM Practice Lab & Bedside Tools</h2>
              <p class="ebm-bento-desc">
                Công cụ đặt câu hỏi PICO, thẩm định chất lượng nghiên cứu theo thang CASP, máy tính chỉ số NNT, ARR, RRR, Odds Ratio và Likelihood Ratio.
              </p>
              <div class="ebm-bento-tags-row">
                <span class="ebm-bento-tag-item">PICO Builder</span>
                <span class="ebm-bento-tag-item">Thang Thẩm Định CASP</span>
                <span class="ebm-bento-tag-item">NNT / ARR / RRR Calc</span>
              </div>
            </div>
            <div class="ebm-bento-action-btn">
              <span>Vào EBM Practice Lab</span>
              <i class="fa-solid fa-arrow-right"></i>
            </div>
          </a>

        </div>
      </section>

      <!-- TWO COLUMN MAIN LAYOUT GRID -->
      <div class="ebm-layout-grid">

        <!-- LEFT COLUMN: MAIN CONTENT & LIVE FEEDS & BEDSIDE CALC -->
        <div style="display: flex; flex-direction: column; gap: 1.75rem; width: 100%; min-width: 0;">

          <!-- 1. PUBMED & GUIDELINES LIVE NOTIFICATION BOARD -->
          <section class="pubmed-board-section" id="pubmed-board-container" aria-labelledby="pubmed-board-title" style="background: var(--hub-surface); border: 1px solid var(--hub-border); border-radius: 16px; padding: 1.5rem; box-shadow: 0 4px 16px rgba(0,0,0,0.03);">
            
            <div class="pubmed-board-header" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.25rem;">
              <div class="pubmed-board-title-group" style="display: flex; align-items: center; gap: 0.85rem;">
                <div class="pubmed-board-icon" style="font-size: 1.6rem; color: var(--color-primary, #0284c7);">
                  <i class="fa-solid fa-newspaper"></i>
                </div>
                <div>
                  <h2 class="pubmed-board-title" id="pubmed-board-title" style="margin: 0; font-size: 1.2rem; font-weight: 800; color: var(--hub-text);">
                    Bảng Tin Guidelines &amp; Y Văn Mới Xuất Bản
                    <span class="pubmed-board-badge" style="font-size: 0.72rem; padding: 0.2rem 0.6rem; border-radius: 20px; background: rgba(2, 132, 199, 0.1); color: var(--color-primary, #0284c7); font-weight: 800; margin-left: 0.5rem;">
                      <i class="fa-solid fa-satellite"></i> Live Feed
                    </span>
                  </h2>
                  <div style="font-size: 0.8rem; color: var(--color-text-muted, #64748b); margin-top: 2px;">
                    Tổng hợp tự động khuyến cáo quốc tế và bài báo EBM trọng điểm theo chuyên khoa
                  </div>
                </div>
              </div>

              <div class="pubmed-board-controls" style="display: flex; align-items: center; gap: 0.5rem;">
                <button type="button" class="btn btn-secondary btn-sm" id="btn-toggle-pubmed-board" style="display: inline-flex; align-items: center; gap: 0.35rem; padding: 0.45rem 0.85rem; font-size: 0.8rem; font-weight: 700; border-radius: 8px; border: 1px solid var(--hub-border); background: var(--hub-surface-2); color: var(--hub-text); cursor: pointer;">
                  <span id="pubmed-toggle-label">Thu gọn</span>
                  <span id="pubmed-toggle-icon">▲</span>
                </button>
              </div>
            </div>

            <!-- SPECIALTY FILTER CHIPS -->
            <div class="ebm-spec-filter-bar" id="ebmSpecFilterBar">
              <button type="button" class="ebm-spec-chip is-active" data-spec="all">Tất cả chuyên khoa</button>
              <button type="button" class="ebm-spec-chip" data-spec="cardiology"><i class="fa-solid fa-heart-pulse"></i> Tim Mạch</button>
              <button type="button" class="ebm-spec-chip" data-spec="respiratory"><i class="fa-solid fa-lungs"></i> Hô Hấp</button>
              <button type="button" class="ebm-spec-chip" data-spec="endocrinology"><i class="fa-solid fa-dna"></i> Nội Tiết &amp; ĐTĐ</button>
              <button type="button" class="ebm-spec-chip" data-spec="nephrology"><i class="fa-solid fa-flask"></i> Thận &amp; Tiết Niệu</button>
              <button type="button" class="ebm-spec-chip" data-spec="icu"><i class="fa-solid fa-heart-crack"></i> Cấp Cứu - ICU</button>
              <button type="button" class="ebm-spec-chip" data-spec="gastroenterology"><i class="fa-solid fa-disease"></i> Tiêu Hóa - Gan Mật</button>
              <button type="button" class="ebm-spec-chip" data-spec="infectious"><i class="fa-solid fa-virus"></i> Truyền Nhiễm</button>
            </div>

            <!-- Guidelines items list -->
            <div class="pubmed-guidelines-list" id="pubmed-guidelines-list" style="display: flex; flex-direction: column; gap: 0.85rem;">
              
              <!-- Guideline 1 -->
              <div class="pubmed-item-card" data-spec="cardiology" style="padding: 1.15rem 1.25rem; background: var(--hub-surface-2); border: 1px solid var(--hub-border); border-radius: 12px; transition: all 0.2s ease;">
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.5rem;">
                  <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <span style="background: #fee2e2; color: #dc2626; font-size: 0.72rem; font-weight: 800; padding: 0.2rem 0.55rem; border-radius: 6px;">ESC 2024 / 2025</span>
                    <span style="font-size: 0.76rem; color: var(--hub-text-muted); font-weight: 600;"><i class="fa-solid fa-journal-whills"></i> European Heart Journal</span>
                  </div>
                  <span style="font-size: 0.72rem; font-weight: 800; background: #e0f2fe; color: #0284c7; padding: 0.15rem 0.5rem; border-radius: 4px;">Class I, Level A</span>
                </div>
                <h3 style="margin: 0 0 0.45rem 0; font-size: 1.05rem; font-weight: 800; color: var(--hub-text); line-height: 1.35;">
                  2024 ESC Guidelines for the Management of Elevated Blood Pressure and Hypertension
                </h3>
                <p style="margin: 0 0 0.75rem 0; font-size: 0.83rem; color: var(--hub-text-muted); line-height: 1.5;">
                  Định nghĩa phân loại huyết áp mới: Huyết áp tăng (Elevated BP 120-139/70-89 mmHg) và đích huyết áp điều trị chặt chẽ hơn (&lt; 130/80 mmHg) cho hầu hết bệnh nhân có nguy cơ tim mạch.
                </p>
                <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.76rem;">
                  <span style="color: var(--hub-text-muted);"><i class="fa-regular fa-calendar"></i> Cập nhật: 2024-2025</span>
                  <a href="#/ebm/kho-guidelines?id=esc-hta-2024" style="color: var(--color-primary); font-weight: 700; text-decoration: none; display: inline-flex; align-items: center; gap: 4px;">
                    <span>Xem tóm tắt lâm sàng</span>
                    <i class="fa-solid fa-arrow-right"></i>
                  </a>
                </div>
              </div>

              <!-- Guideline 2 -->
              <div class="pubmed-item-card" data-spec="respiratory" style="padding: 1.15rem 1.25rem; background: var(--hub-surface-2); border: 1px solid var(--hub-border); border-radius: 12px; transition: all 0.2s ease;">
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.5rem;">
                  <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <span style="background: #e0e7ff; color: #4338ca; font-size: 0.72rem; font-weight: 800; padding: 0.2rem 0.55rem; border-radius: 6px;">GOLD 2025</span>
                    <span style="font-size: 0.76rem; color: var(--hub-text-muted); font-weight: 600;"><i class="fa-solid fa-journal-whills"></i> Global Initiative for COPD</span>
                  </div>
                  <span style="font-size: 0.72rem; font-weight: 800; background: #e0f2fe; color: #0284c7; padding: 0.15rem 0.5rem; border-radius: 4px;">Class I, Level B</span>
                </div>
                <h3 style="margin: 0 0 0.45rem 0; font-size: 1.05rem; font-weight: 800; color: var(--hub-text); line-height: 1.35;">
                  Global Strategy for Prevention, Diagnosis and Management of COPD: 2025 Report
                </h3>
                <p style="margin: 0 0 0.75rem 0; font-size: 0.83rem; color: var(--hub-text-muted); line-height: 1.5;">
                  Bổ sung chỉ định Liệu pháp Sinh học kháng thể đơn dòng (Dupilumab - kháng IL-4Rα/IL-13) cho bệnh nhân COPD có đợt cấp tái phát và bạch cầu ái toan máu ≥ 300 tế bào/μL.
                </p>
                <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.76rem;">
                  <span style="color: var(--hub-text-muted);"><i class="fa-regular fa-calendar"></i> Cập nhật: 2025</span>
                  <a href="#/ebm/kho-guidelines?id=gold-copd-2025" style="color: var(--color-primary); font-weight: 700; text-decoration: none; display: inline-flex; align-items: center; gap: 4px;">
                    <span>Xem tóm tắt lâm sàng</span>
                    <i class="fa-solid fa-arrow-right"></i>
                  </a>
                </div>
              </div>

              <!-- Guideline 3 -->
              <div class="pubmed-item-card" data-spec="nephrology" style="padding: 1.15rem 1.25rem; background: var(--hub-surface-2); border: 1px solid var(--hub-border); border-radius: 12px; transition: all 0.2s ease;">
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.5rem;">
                  <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <span style="background: #dcfce7; color: #15803d; font-size: 0.72rem; font-weight: 800; padding: 0.2rem 0.55rem; border-radius: 6px;">KDIGO 2024</span>
                    <span style="font-size: 0.76rem; color: var(--hub-text-muted); font-weight: 600;"><i class="fa-solid fa-journal-whills"></i> Kidney International</span>
                  </div>
                  <span style="font-size: 0.72rem; font-weight: 800; background: #e0f2fe; color: #0284c7; padding: 0.15rem 0.5rem; border-radius: 4px;">Level 1A</span>
                </div>
                <h3 style="margin: 0 0 0.45rem 0; font-size: 1.05rem; font-weight: 800; color: var(--hub-text); line-height: 1.35;">
                  KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of CKD
                </h3>
                <p style="margin: 0 0 0.75rem 0; font-size: 0.83rem; color: var(--hub-text-muted); line-height: 1.5;">
                  Khuyến cáo bắt đầu ức chế SGLT2i (Dapagliflozin/Empagliflozin) cho tất cả bệnh nhân CKD có eGFR ≥ 20 mL/phút/1.73m² hoặc UACR ≥ 200 mg/g, không phụ thuộc vào tình trạng đái tháo đường.
                </p>
                <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.76rem;">
                  <span style="color: var(--hub-text-muted);"><i class="fa-regular fa-calendar"></i> Cập nhật: 2024</span>
                  <a href="#/ebm/kho-guidelines?id=kdigo-ckd-2024" style="color: var(--color-primary); font-weight: 700; text-decoration: none; display: inline-flex; align-items: center; gap: 4px;">
                    <span>Xem tóm tắt lâm sàng</span>
                    <i class="fa-solid fa-arrow-right"></i>
                  </a>
                </div>
              </div>

            </div>
          </section>

          <!-- 2. BEDSIDE EBM QUICK STATS CALCULATOR (MINI STUDIO) -->
          <section class="ebm-quick-calc-box" aria-labelledby="ebm-calc-title">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
              <h2 id="ebm-calc-title" style="margin: 0; font-size: 1.1rem; font-weight: 800; color: var(--hub-text); display: flex; align-items: center; gap: 0.5rem;">
                <i class="fa-solid fa-calculator" style="color: var(--hub-blue);"></i> Máy Tính NNT &amp; Chỉ Số Hiệu Quả Can Thiệp (Bedside EBM Studio)
              </h2>
              <span style="font-size: 0.72rem; font-weight: 800; background: rgba(2, 132, 199, 0.1); color: var(--hub-blue); padding: 2px 8px; border-radius: 12px;">Real-time</span>
            </div>
            
            <div class="ebm-quick-calc-grid">
              <div class="ebm-calc-input-group">
                <label for="ebmCalcCer">Biến cố Nhóm Chứng (CER %)</label>
                <input type="number" id="ebmCalcCer" value="20" min="0.01" max="100" step="0.1" />
              </div>
              <div class="ebm-calc-input-group">
                <label for="ebmCalcEer">Biến cố Can Thiệp (EER %)</label>
                <input type="number" id="ebmCalcEer" value="12" min="0" max="100" step="0.1" />
              </div>
              <div class="ebm-calc-input-group">
                <label for="ebmCalcTime">Thời gian theo dõi (năm)</label>
                <input type="number" id="ebmCalcTime" value="3" min="0.1" max="50" step="0.5" />
              </div>
            </div>

            <div class="ebm-calc-result-tile">
              <div class="ebm-calc-val-item">
                <span class="ebm-calc-val-num" id="ebmResArr">8.0%</span>
                <span class="ebm-calc-val-label">Giảm Nguy Cơ Tuyệt Đối (ARR)</span>
              </div>
              <div class="ebm-calc-val-item">
                <span class="ebm-calc-val-num" id="ebmResRrr">40.0%</span>
                <span class="ebm-calc-val-label">Giảm Nguy Cơ Tương Đối (RRR)</span>
              </div>
              <div class="ebm-calc-val-item">
                <span class="ebm-calc-val-num" id="ebmResNnt" style="color: #10b981;">13</span>
                <span class="ebm-calc-val-label">Số BN Cần Điều Trị (NNT)</span>
              </div>
            </div>
            <div style="font-size: 0.74rem; color: var(--hub-text-muted); margin-top: 0.65rem; text-align: center;">
              * Ý nghĩa lâm sàng: Cần điều trị cho <strong><span id="ebmResNntText">13</span> bệnh nhân</strong> trong 3 năm để ngăn ngừa được <strong>1 biến cố bất lợi</strong>.
            </div>
          </section>

          <!-- 3. RECENT PRACTICE-CHANGING UPDATES WIDGET -->
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; gap: 1rem; margin-bottom: 1rem;">
              <h2 class="hub-section-title" style="margin: 0; font-size: 1.15rem; font-weight: 800; color: var(--hub-text);">
                📡 Radar Feed — Điểm Mới Thay Đổi Thực Hành
              </h2>
            </div>

            <div id="yhcc-updates-content" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(min(280px, 100%), 1fr)); gap: 1rem;">
              <div class="update-card" style="padding: 1.25rem; background: var(--hub-surface); border: 1px solid var(--hub-border); border-radius: 14px; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                  <span style="font-size: 0.7rem; font-weight: 800; text-transform: uppercase; color: #dc2626; background: #fee2e2; padding: 0.15rem 0.5rem; border-radius: 4px;">Practice Changing</span>
                  <span style="font-size: 0.74rem; color: var(--hub-text-muted);">Tháng 2/2026</span>
                </div>
                <h4 style="margin: 0 0 0.4rem 0; font-size: 0.95rem; font-weight: 800; color: var(--hub-text);">SGLT2i trong Bệnh Thận Mạn (CKD)</h4>
                <p style="margin: 0; font-size: 0.8rem; color: var(--hub-text-muted); line-height: 1.45;">Khuyến cáo mức độ 1A về chỉ định SGLT2i cho bệnh nhân CKD không phụ thuộc tình trạng ĐTĐ để làm chậm tiến triển suy thận và giảm tử vong tim mạch.</p>
              </div>

              <div class="update-card" style="padding: 1.25rem; background: var(--hub-surface); border: 1px solid var(--hub-border); border-radius: 14px; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                  <span style="font-size: 0.7rem; font-weight: 800; text-transform: uppercase; color: #0284c7; background: #e0f2fe; padding: 0.15rem 0.5rem; border-radius: 4px;">Guideline Bộ Y Tế</span>
                  <span style="font-size: 0.74rem; color: var(--hub-text-muted);">2025</span>
                </div>
                <h4 style="margin: 0 0 0.4rem 0; font-size: 0.95rem; font-weight: 800; color: var(--hub-text);">Phác Đồ Phối Hợp Đôi Sớm Điều Trị THA</h4>
                <p style="margin: 0; font-size: 0.8rem; color: var(--hub-text-muted); line-height: 1.45;">Khởi trị ngay bằng viên phối hợp đôi cố định liều (Single-Pill Combination: ACEi/ARB + CCB hoặc Lợi tiểu) cho đa số bệnh nhân THA Độ 1 có nguy cơ trung bình - cao.</p>
              </div>
            </div>
          </div>

        </div>

        <!-- RIGHT COLUMN: DUAL STUDIO WIDGET (6S 3D PYRAMID & 5AS CYCLE) -->
        <aside class="layout-widget-sidebar">
          
          <!-- WIDGET 1: 6S EVIDENCE PYRAMID 3D VISUALIZER -->
          <section class="widget-card" aria-labelledby="ebm-pyramid-title" style="padding: 1.35rem; background: var(--hub-surface); border: 1px solid var(--hub-border); border-radius: 16px; box-shadow: 0 4px 16px rgba(0,0,0,0.04);">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.85rem;">
              <h3 id="ebm-pyramid-title" style="font-size: 1.05rem; font-weight: 800; margin: 0; color: var(--hub-text); display: flex; align-items: center; gap: 0.5rem;">
                <i class="fa-solid fa-layer-group" style="color: var(--hub-blue);"></i> Tháp Bằng Chứng 6S
              </h3>
              <span style="font-size: 0.7rem; font-weight: 800; color: var(--hub-blue); background: var(--hub-blue-light); padding: 2px 6px; border-radius: 10px;">Interactive</span>
            </div>
            <p style="font-size: 0.75rem; color: var(--hub-text-muted); margin: 0 0 1rem 0; line-height: 1.4;">
              Mô hình phân tầng bằng chứng 6S của Haynes &amp; DiCenso. Nhấp vào từng tầng để xem phân tích chi tiết:
            </p>
            
            <div class="pyramid-6s-stack" style="display: flex; flex-direction: column; gap: 0.4rem;">
              
              <!-- Tier 6: Systems -->
              <button type="button" class="ebm-pyramid-tier-btn js-pyramid-btn" data-tier="6">
                <div class="ebm-pyramid-tier-bar" style="width: 55%; background: linear-gradient(135deg, #ef4444 0%, #b91c1c 100%);">
                  <span>6. Systems</span>
                  <span class="pyramid-grade-pill">CDSS</span>
                </div>
              </button>

              <!-- Tier 5: Summaries -->
              <button type="button" class="ebm-pyramid-tier-btn js-pyramid-btn is-active" data-tier="5">
                <div class="ebm-pyramid-tier-bar" style="width: 65%; background: linear-gradient(135deg, #f97316 0%, #c2410c 100%);">
                  <span>5. Summaries</span>
                  <span class="pyramid-grade-pill">Guidelines</span>
                </div>
              </button>

              <!-- Tier 4: Synopses of Syntheses -->
              <button type="button" class="ebm-pyramid-tier-btn js-pyramid-btn" data-tier="4">
                <div class="ebm-pyramid-tier-bar" style="width: 75%; background: linear-gradient(135deg, #eab308 0%, #a16207 100%); color: #000;">
                  <span>4. Synopses of Syntheses</span>
                  <span class="pyramid-grade-pill" style="background: rgba(0,0,0,0.15); color: #000;">Meta Syn</span>
                </div>
              </button>

              <!-- Tier 3: Syntheses -->
              <button type="button" class="ebm-pyramid-tier-btn js-pyramid-btn" data-tier="3">
                <div class="ebm-pyramid-tier-bar" style="width: 85%; background: linear-gradient(135deg, #22c55e 0%, #15803d 100%);">
                  <span>3. Syntheses</span>
                  <span class="pyramid-grade-pill">Cochrane / Meta</span>
                </div>
              </button>

              <!-- Tier 2: Synopses of Single Studies -->
              <button type="button" class="ebm-pyramid-tier-btn js-pyramid-btn" data-tier="2">
                <div class="ebm-pyramid-tier-bar" style="width: 93%; background: linear-gradient(135deg, #6366f1 0%, #4338ca 100%);">
                  <span>2. Synopses of Studies</span>
                  <span class="pyramid-grade-pill">RCT Syn</span>
                </div>
              </button>

              <!-- Tier 1: Single Studies -->
              <button type="button" class="ebm-pyramid-tier-btn js-pyramid-btn" data-tier="1">
                <div class="ebm-pyramid-tier-bar" style="width: 100%; background: linear-gradient(135deg, #64748b 0%, #334155 100%);">
                  <span>1. Single Studies</span>
                  <span class="pyramid-grade-pill">Original RCT</span>
                </div>
              </button>

            </div>

            <!-- EVIDENCE INSPECTOR CONTAINER -->
            <div id="ebmPyramidInspector" class="ebm-inspector-card">
              <div class="ebm-inspector-header">
                <span class="ebm-inspector-title" id="ebmInspTitle"><i class="fa-solid fa-bookmark" style="color:#f97316;"></i> 5. Summaries (Guidelines)</span>
                <span class="ebm-inspector-badge" id="ebmInspLevel">Mức Bằng Chứng Rất Cao</span>
              </div>
              <div class="ebm-inspector-body" id="ebmInspBody">
                Tích hợp các hướng dẫn điều trị chuẩn mực (Clinical Practice Guidelines) dựa trên bằng chứng đã được thẩm định độc lập. Đây là nguồn thông tin then chốt trong thực hành lâm sàng hằng ngày tại phòng khám và bệnh viện.
              </div>
            </div>
          </section>

          <!-- WIDGET 2: 5AS CLINICAL CYCLE -->
          <section class="widget-card" aria-labelledby="ebm-5as-title" style="padding: 1.35rem; background: var(--hub-surface); border: 1px solid var(--hub-border); border-radius: 16px; box-shadow: 0 4px 16px rgba(0,0,0,0.04);">
            <h3 id="ebm-5as-title" style="font-size: 1.05rem; font-weight: 800; margin: 0 0 0.85rem 0; color: var(--hub-text); display: flex; align-items: center; gap: 0.5rem;">
              <i class="fa-solid fa-rotate" style="color: #10b981;"></i> Chu Trình 5As trong EBM
            </h3>
            
            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
              <div style="padding: 0.6rem 0.75rem; background: var(--hub-surface-2); border-radius: 8px; border-left: 3px solid #0284c7; font-size: 0.78rem;">
                <strong style="color: var(--hub-text);">1. Ask (Đặt câu hỏi):</strong>
                <span style="color: var(--hub-text-muted);"> Cấu trúc hóa vấn đề lâm sàng theo PICO (Patient, Intervention, Comparison, Outcome).</span>
              </div>
              <div style="padding: 0.6rem 0.75rem; background: var(--hub-surface-2); border-radius: 8px; border-left: 3px solid #7c3aed; font-size: 0.78rem;">
                <strong style="color: var(--hub-text);">2. Acquire (Thu thập y văn):</strong>
                <span style="color: var(--hub-text-muted);"> Tìm kiếm có chiến lược trên PubMed, Cochrane Library, UpToDate, Guidelines Kho.</span>
              </div>
              <div style="padding: 0.6rem 0.75rem; background: var(--hub-surface-2); border-radius: 8px; border-left: 3px solid #10b981; font-size: 0.78rem;">
                <strong style="color: var(--hub-text);">3. Appraise (Thẩm định):</strong>
                <span style="color: var(--hub-text-muted);"> Đánh giá giá trị thực sự (Validity), tầm quan trọng (Impact) và khả năng ứng dụng qua thang CASP/RoB-2.</span>
              </div>
              <div style="padding: 0.6rem 0.75rem; background: var(--hub-surface-2); border-radius: 8px; border-left: 3px solid #f59e0b; font-size: 0.78rem;">
                <strong style="color: var(--hub-text);">4. Apply (Áp dụng):</strong>
                <span style="color: var(--hub-text-muted);"> Kết hợp bằng chứng với kinh nghiệm chuyên môn và nguyện vọng/giá trị cá nhân của người bệnh.</span>
              </div>
              <div style="padding: 0.6rem 0.75rem; background: var(--hub-surface-2); border-radius: 8px; border-left: 3px solid #ef4444; font-size: 0.78rem;">
                <strong style="color: var(--hub-text);">5. Assess (Đánh giá):</strong>
                <span style="color: var(--hub-text-muted);"> Lượng giá hiệu quả lâm sàng và cải tiến liên tục quy trình thực hành.</span>
              </div>
            </div>
          </section>

        </aside>

      </div>

    </div>
  `;
}

/**
 * Controller mount logic for interactive elements
 */
export function mountEbmController(): void {
  // 1. OmniSearch
  const searchInput = document.getElementById('ebmOmniSearchInput') as HTMLInputElement | null;
  const searchBtn = document.getElementById('ebmOmniSearchBtn');
  const quickTags = document.querySelectorAll<HTMLButtonElement>('.js-quick-tag');

  const executeSearch = (term: string) => {
    if (!term.trim()) return;
    window.location.hash = `#/ebm/kho-guidelines?q=${encodeURIComponent(term.trim())}`;
  };

  if (searchInput) {
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        executeSearch(searchInput.value);
      }
    });
  }

  if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', () => {
      executeSearch(searchInput.value);
    });
  }

  quickTags.forEach(btn => {
    btn.addEventListener('click', () => {
      const tag = btn.getAttribute('data-tag');
      if (tag) executeSearch(tag);
    });
  });

  // 2. Specialty Filter for PubMed Guidelines Feed
  const specChips = document.querySelectorAll<HTMLButtonElement>('.ebm-spec-chip');
  const pubmedCards = document.querySelectorAll<HTMLElement>('.pubmed-item-card');

  specChips.forEach(chip => {
    chip.addEventListener('click', () => {
      specChips.forEach(c => c.classList.remove('is-active'));
      chip.classList.add('is-active');

      const selectedSpec = chip.getAttribute('data-spec');
      pubmedCards.forEach(card => {
        const cardSpec = card.getAttribute('data-spec');
        if (selectedSpec === 'all' || cardSpec === selectedSpec) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 3. 6S Pyramid Inspector Logic
  const pyramidBtns = document.querySelectorAll<HTMLButtonElement>('.js-pyramid-btn');
  const inspTitle = document.getElementById('ebmInspTitle');
  const inspLevel = document.getElementById('ebmInspLevel');
  const inspBody = document.getElementById('ebmInspBody');

  const TIER_DATA: Record<string, { title: string; color: string; level: string; desc: string }> = {
    '6': {
      title: '6. Systems (Hệ Thống CDSS)',
      color: '#ef4444',
      level: 'Đỉnh Kim Tự Tháp — Tối Ưu Nhất',
      desc: 'Hệ thống Hỗ trợ Ra quyết định Lâm sàng (CDSS) được vi tính hóa và tích hợp trực tiếp vào Bệnh án điện tử (EMR). Tự động đưa ra cảnh báo tương tác thuốc, gợi ý phác đồ cá nhân hóa dựa trên dữ liệu bệnh nhân thời gian thực.'
    },
    '5': {
      title: '5. Summaries (Khuyến Cáo & Guidelines)',
      color: '#f97316',
      level: 'Mức Bằng Chứng Rất Cao',
      desc: 'Tích hợp các hướng dẫn điều trị chuẩn mực (Clinical Practice Guidelines) dựa trên bằng chứng đã được thẩm định độc lập từ Bộ Y Tế, ESC, ADA, KDIGO, GOLD... Đây là tài liệu cốt lõi trong thực hành điều trị hàng ngày.'
    },
    '4': {
      title: '4. Synopses of Syntheses (Tóm Tắt Tổng Quan)',
      color: '#eab308',
      level: 'Tóm Tắt Phân Tích Gộp',
      desc: 'Các bài viết tóm tắt ngắn gọn và phân tích bình luận cấu trúc của các bài Tổng quan hệ thống / Meta-analysis (ví dụ: DARE, ACP Journal Club). Giúp bác sĩ nắm bắt kết luận phân tích gộp trong 2 phút.'
    },
    '3': {
      title: '3. Syntheses (Tổng Quan Hệ Thống & Meta-analysis)',
      color: '#22c55e',
      level: 'Bằng Chứng Đỉnh Cao (Grade 1A)',
      desc: 'Tổng hợp toàn diện có hệ thống tất cả các thử nghiệm RCT độc lập (Cochrane Systematic Reviews, Meta-analyses) để đưa ra hiệu quả can thiệp thống nhất với kích thước mẫu khổng lồ và độ tin cậy tối đa.'
    },
    '2': {
      title: '2. Synopses of Single Studies (Tóm Tắt Nghiên Cứu Đơn)',
      color: '#6366f1',
      level: 'Tóm Tắt Thẩm Định Độc Lập',
      desc: 'Bản tóm tắt và bình luận phương pháp luận của một thử nghiệm lâm sàng đơn lẻ có chất lượng cao (ví dụ: các bài tóm tắt trên Evidence-Based Medicine Journal).'
    },
    '1': {
      title: '1. Single Studies (Nghiên Cứu Gốc Lẻ)',
      color: '#64748b',
      level: 'Đáy Tháp — Dữ Liệu Ban Đầu',
      desc: 'Các công trình nghiên cứu gốc riêng lẻ xuất bản lần đầu (RCT, Nghiên cứu đoàn hệ Cohort, Bệnh - Chứng Case-Control, Báo cáo ca Case Report). Cần được thẩm định kỹ lưỡng rủi ro sai số trước khi áp dụng.'
    }
  };

  pyramidBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      pyramidBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const tier = btn.getAttribute('data-tier');
      if (tier && TIER_DATA[tier] && inspTitle && inspLevel && inspBody) {
        const data = TIER_DATA[tier];
        inspTitle.innerHTML = `<i class="fa-solid fa-bookmark" style="color:${data.color};"></i> ${data.title}`;
        inspLevel.textContent = data.level;
        inspBody.textContent = data.desc;
      }
    });
  });

  // 4. Bedside NNT Calculator
  const cerInput = document.getElementById('ebmCalcCer') as HTMLInputElement | null;
  const eerInput = document.getElementById('ebmCalcEer') as HTMLInputElement | null;
  const resArr = document.getElementById('ebmResArr');
  const resRrr = document.getElementById('ebmResRrr');
  const resNnt = document.getElementById('ebmResNnt');
  const resNntText = document.getElementById('ebmResNntText');

  const recalcNnt = () => {
    if (!cerInput || !eerInput || !resArr || !resRrr || !resNnt || !resNntText) return;
    const cer = parseFloat(cerInput.value) || 0;
    const eer = parseFloat(eerInput.value) || 0;

    const arr = Math.max(0, cer - eer);
    const rrr = cer > 0 ? (arr / cer) * 100 : 0;
    const nnt = arr > 0 ? Math.ceil(100 / arr) : 0;

    resArr.textContent = `${arr.toFixed(1)}%`;
    resRrr.textContent = `${rrr.toFixed(1)}%`;
    resNnt.textContent = nnt > 0 ? nnt.toString() : '∞';
    resNntText.textContent = nnt > 0 ? nnt.toString() : 'vô hạn';
  };

  if (cerInput) cerInput.addEventListener('input', recalcNnt);
  if (eerInput) eerInput.addEventListener('input', recalcNnt);

  // 5. Toggle PubMed Board Collapse
  const toggleBtn = document.getElementById('btn-toggle-pubmed-board');
  const pubmedList = document.getElementById('pubmed-guidelines-list');
  const specBar = document.getElementById('ebmSpecFilterBar');
  const toggleLabel = document.getElementById('pubmed-toggle-label');
  const toggleIcon = document.getElementById('pubmed-toggle-icon');

  if (toggleBtn && pubmedList) {
    let isCollapsed = false;
    toggleBtn.addEventListener('click', () => {
      isCollapsed = !isCollapsed;
      pubmedList.style.display = isCollapsed ? 'none' : 'flex';
      if (specBar) specBar.style.display = isCollapsed ? 'none' : 'flex';
      if (toggleLabel) toggleLabel.textContent = isCollapsed ? 'Mở rộng' : 'Thu gọn';
      if (toggleIcon) toggleIcon.textContent = isCollapsed ? '▼' : '▲';
    });
  }
}
