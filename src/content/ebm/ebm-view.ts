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

      <!-- 6 BENTO MAIN MODULES & CLINICAL WIDGETS GRID (COMPACT & HORIZONTAL ALIGNED) -->
      <section style="margin-bottom: 2rem;" aria-label="Phân hệ và Công cụ Y học chứng cứ">
        <div class="ebm-bento-6-grid">
          
          <!-- Card 1: Thống Kê Y Học & Thiết Kế Nghiên Cứu -->
          <a href="#/ebm/thong-ke-y-hoc" class="ebm-bento-card-compact" style="--card-accent:#0284c7; --card-icon-bg:rgba(2,132,199,0.1); --card-glow:rgba(2,132,199,0.2);">
            <div>
              <div class="ebm-bento-top-row-sm">
                <div class="ebm-bento-icon-box-sm">
                  <i class="fa-solid fa-chart-line"></i>
                </div>
                <span class="ebm-bento-badge-pill-sm">Thống Kê</span>
              </div>
              <h2 class="ebm-bento-title-sm">Thống Kê Y Học</h2>
              <p class="ebm-bento-desc-sm">
                Thiết kế thử nghiệm RCT, Phân tích gộp Meta-analysis, Forest Plot và đánh giá sai số RoB-2.
              </p>
              <div class="ebm-bento-tags-row-sm">
                <span class="ebm-bento-tag-item-sm">RCT &amp; Cohort</span>
                <span class="ebm-bento-tag-item-sm">Forest Plot</span>
              </div>
            </div>
            <div class="ebm-bento-action-btn-sm">
              <span>Vào phân hệ</span>
              <i class="fa-solid fa-arrow-right"></i>
            </div>
          </a>

          <!-- Card 2: Kho Guidelines & Phác Đồ -->
          <a href="#/ebm/kho-guidelines" class="ebm-bento-card-compact" style="--card-accent:#7c3aed; --card-icon-bg:rgba(124,58,237,0.1); --card-glow:rgba(124,58,237,0.2);">
            <div>
              <div class="ebm-bento-top-row-sm">
                <div class="ebm-bento-icon-box-sm">
                  <i class="fa-solid fa-book-medical"></i>
                </div>
                <span class="ebm-bento-badge-pill-sm">100+ Phác Đồ</span>
              </div>
              <h2 class="ebm-bento-title-sm">Kho Guidelines</h2>
              <p class="ebm-bento-desc-sm">
                Hướng dẫn điều trị GRADE từ Bộ Y Tế Việt Nam, ESC, AHA/ACC, ADA, KDIGO, GOLD.
              </p>
              <div class="ebm-bento-tags-row-sm">
                <span class="ebm-bento-tag-item-sm">Bộ Y Tế VN</span>
                <span class="ebm-bento-tag-item-sm">ESC / ADA</span>
              </div>
            </div>
            <div class="ebm-bento-action-btn-sm">
              <span>Mở kho Guidelines</span>
              <i class="fa-solid fa-arrow-right"></i>
            </div>
          </a>

          <!-- Card 3: Tháp Bằng Chứng 6S (Mini Interactive Stack) -->
          <div class="ebm-bento-card-compact" style="--card-accent:#f59e0b; --card-icon-bg:rgba(245,158,11,0.1); --card-glow:rgba(245,158,11,0.2);">
            <div>
              <div class="ebm-bento-top-row-sm">
                <div class="ebm-bento-icon-box-sm" style="color:#f59e0b;">
                  <i class="fa-solid fa-layer-group"></i>
                </div>
                <span class="ebm-bento-badge-pill-sm" style="color:#f59e0b; background:rgba(245,158,11,0.1);">6S Pyramid</span>
              </div>
              <h2 class="ebm-bento-title-sm">Tháp Bằng Chứng 6S</h2>
              
              <!-- Mini Pyramid Stack -->
              <div style="display:flex; flex-direction:column; gap:3px; margin: 0.4rem 0 0.6rem 0;">
                <button type="button" class="ebm-pyramid-tier-btn js-pyramid-btn" data-tier="6">
                  <div class="ebm-pyramid-tier-bar" style="width: 55%; padding: 2px 6px; font-size: 10px; background: #ef4444;">6. Systems (CDSS)</div>
                </button>
                <button type="button" class="ebm-pyramid-tier-btn js-pyramid-btn is-active" data-tier="5">
                  <div class="ebm-pyramid-tier-bar" style="width: 65%; padding: 2px 6px; font-size: 10px; background: #f97316;">5. Summaries (Guidelines)</div>
                </button>
                <button type="button" class="ebm-pyramid-tier-btn js-pyramid-btn" data-tier="4">
                  <div class="ebm-pyramid-tier-bar" style="width: 75%; padding: 2px 6px; font-size: 10px; background: #eab308; color:#000;">4. Synopses Meta</div>
                </button>
                <button type="button" class="ebm-pyramid-tier-btn js-pyramid-btn" data-tier="3">
                  <div class="ebm-pyramid-tier-bar" style="width: 85%; padding: 2px 6px; font-size: 10px; background: #22c55e;">3. Syntheses (Cochrane)</div>
                </button>
                <button type="button" class="ebm-pyramid-tier-btn js-pyramid-btn" data-tier="2">
                  <div class="ebm-pyramid-tier-bar" style="width: 93%; padding: 2px 6px; font-size: 10px; background: #6366f1;">2. Synopses Studies</div>
                </button>
                <button type="button" class="ebm-pyramid-tier-btn js-pyramid-btn" data-tier="1">
                  <div class="ebm-pyramid-tier-bar" style="width: 100%; padding: 2px 6px; font-size: 10px; background: #64748b;">1. Single Studies</div>
                </button>
              </div>
            </div>
            
            <div id="ebmPyramidInspector" style="font-size: 11px; color: var(--hub-text-muted); line-height: 1.35; padding: 4px 6px; background: var(--hub-surface-2); border-radius: 6px; border: 1px solid var(--hub-border);">
              <strong id="ebmInspTitle" style="color: #f97316;">5. Summaries</strong>: <span id="ebmInspBody">Khuyến cáo điều trị lâm sàng EBM đã thẩm định.</span>
            </div>
          </div>

          <!-- Card 4: Guideline Radar (Diff Studio) -->
          <a href="#/ebm/radar" class="ebm-bento-card-compact" style="--card-accent:#10b981; --card-icon-bg:rgba(16,185,129,0.1); --card-glow:rgba(16,185,129,0.2);">
            <div>
              <div class="ebm-bento-top-row-sm">
                <div class="ebm-bento-icon-box-sm">
                  <i class="fa-solid fa-satellite-dish"></i>
                </div>
                <span class="ebm-bento-badge-pill-sm">Diff View</span>
              </div>
              <h2 class="ebm-bento-title-sm">Guideline Radar</h2>
              <p class="ebm-bento-desc-sm">
                Quét và so sánh đối sánh thay đổi Trước vs Sau, cảnh báo Practice-Changing.
              </p>
              <div class="ebm-bento-tags-row-sm">
                <span class="ebm-bento-tag-item-sm">So sánh Trước/Sau</span>
                <span class="ebm-bento-tag-item-sm">Practice Changing</span>
              </div>
            </div>
            <div class="ebm-bento-action-btn-sm">
              <span>Xem Radar</span>
              <i class="fa-solid fa-arrow-right"></i>
            </div>
          </a>

          <!-- Card 5: EBM Practice Lab & Bedside Tools -->
          <a href="#/ebm/ebm-lab" class="ebm-bento-card-compact" style="--card-accent:#06b6d4; --card-icon-bg:rgba(6,182,212,0.1); --card-glow:rgba(6,182,212,0.2);">
            <div>
              <div class="ebm-bento-top-row-sm">
                <div class="ebm-bento-icon-box-sm">
                  <i class="fa-solid fa-flask-vial"></i>
                </div>
                <span class="ebm-bento-badge-pill-sm">Thực Hành</span>
              </div>
              <h2 class="ebm-bento-title-sm">EBM Practice Lab</h2>
              <p class="ebm-bento-desc-sm">
                PICO Builder, Thẩm định CASP, Máy tính NNT, ARR, RRR, Odds Ratio.
              </p>
              <div class="ebm-bento-tags-row-sm">
                <span class="ebm-bento-tag-item-sm">PICO Builder</span>
                <span class="ebm-bento-tag-item-sm">CASP Scale</span>
              </div>
            </div>
            <div class="ebm-bento-action-btn-sm">
              <span>Vào Practice Lab</span>
              <i class="fa-solid fa-arrow-right"></i>
            </div>
          </a>

          <!-- Card 6: Chu Trình 5As trong EBM -->
          <div class="ebm-bento-card-compact" style="--card-accent:#ec4899; --card-icon-bg:rgba(236,72,153,0.1); --card-glow:rgba(236,72,153,0.2);">
            <div>
              <div class="ebm-bento-top-row-sm">
                <div class="ebm-bento-icon-box-sm" style="color:#ec4899;">
                  <i class="fa-solid fa-rotate"></i>
                </div>
                <span class="ebm-bento-badge-pill-sm" style="color:#ec4899; background:rgba(236,72,153,0.1);">5As Cycle</span>
              </div>
              <h2 class="ebm-bento-title-sm">Chu Trình 5As EBM</h2>
              
              <div style="display:flex; flex-direction:column; gap:4px; margin: 0.35rem 0 0.5rem 0; font-size: 11px;">
                <div style="padding: 2px 6px; background: var(--hub-surface-2); border-left: 2px solid #0284c7; border-radius: 4px;">
                  <strong style="color:var(--hub-text);">1. Ask:</strong> <span style="color:var(--hub-text-muted);">Đặt câu hỏi PICO</span>
                </div>
                <div style="padding: 2px 6px; background: var(--hub-surface-2); border-left: 2px solid #7c3aed; border-radius: 4px;">
                  <strong style="color:var(--hub-text);">2. Acquire:</strong> <span style="color:var(--hub-text-muted);">Tìm kiếm y văn</span>
                </div>
                <div style="padding: 2px 6px; background: var(--hub-surface-2); border-left: 2px solid #10b981; border-radius: 4px;">
                  <strong style="color:var(--hub-text);">3. Appraise:</strong> <span style="color:var(--hub-text-muted);">Thẩm định CASP</span>
                </div>
                <div style="padding: 2px 6px; background: var(--hub-surface-2); border-left: 2px solid #f59e0b; border-radius: 4px;">
                  <strong style="color:var(--hub-text);">4. Apply:</strong> <span style="color:var(--hub-text-muted);">Áp dụng người bệnh</span>
                </div>
                <div style="padding: 2px 6px; background: var(--hub-surface-2); border-left: 2px solid #ef4444; border-radius: 4px;">
                  <strong style="color:var(--hub-text);">5. Assess:</strong> <span style="color:var(--hub-text-muted);">Lượng giá kết quả</span>
                </div>
              </div>
            </div>
            
            <div class="ebm-bento-action-btn-sm" style="color:#ec4899;">
              <span>Quy trình chuẩn EBM</span>
              <i class="fa-solid fa-circle-check"></i>
            </div>
          </div>

        </div>
      </section>

      <!-- TWO COLUMN LOWER LAYOUT GRID -->
      <div class="ebm-lower-grid">

        <!-- LEFT COLUMN: PUBMED & GUIDELINES LIVE NOTIFICATION BOARD -->
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

        <!-- RIGHT COLUMN: BEDSIDE CALCULATOR & PRACTICE-CHANGING RADAR FEED -->
        <div style="display: flex; flex-direction: column; gap: 1.25rem;">
          
          <!-- BEDSIDE EBM QUICK STATS CALCULATOR (MINI STUDIO) -->
          <section class="ebm-quick-calc-box" aria-labelledby="ebm-calc-title">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.85rem;">
              <h3 id="ebm-calc-title" style="margin: 0; font-size: 1rem; font-weight: 800; color: var(--hub-text); display: flex; align-items: center; gap: 0.5rem;">
                <i class="fa-solid fa-calculator" style="color: var(--hub-blue);"></i> Máy Tính NNT &amp; ARR (Bedside)
              </h3>
              <span style="font-size: 0.7rem; font-weight: 800; background: rgba(2, 132, 199, 0.1); color: var(--hub-blue); padding: 2px 8px; border-radius: 12px;">Real-time</span>
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
            </div>

            <div class="ebm-calc-result-tile" style="padding: 0.6rem 0.85rem; margin-bottom: 0.4rem;">
              <div class="ebm-calc-val-item">
                <span class="ebm-calc-val-num" id="ebmResArr" style="font-size: 1.15rem;">8.0%</span>
                <span class="ebm-calc-val-label">ARR</span>
              </div>
              <div class="ebm-calc-val-item">
                <span class="ebm-calc-val-num" id="ebmResRrr" style="font-size: 1.15rem;">40.0%</span>
                <span class="ebm-calc-val-label">RRR</span>
              </div>
              <div class="ebm-calc-val-item">
                <span class="ebm-calc-val-num" id="ebmResNnt" style="font-size: 1.25rem; color: #10b981;">13</span>
                <span class="ebm-calc-val-label">NNT</span>
              </div>
            </div>
            <div style="font-size: 0.74rem; color: var(--hub-text-muted); text-align: center;">
              * Cần điều trị cho <strong><span id="ebmResNntText">13</span> bệnh nhân</strong> để ngăn 1 biến cố.
            </div>
          </section>

          <!-- PRACTICE-CHANGING UPDATES WIDGET -->
          <section style="background: var(--hub-surface); border: 1px solid var(--hub-border); border-radius: 14px; padding: 1.15rem; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
              <h3 style="margin: 0; font-size: 0.98rem; font-weight: 800; color: var(--hub-text); display: flex; align-items: center; gap: 0.4rem;">
                <i class="fa-solid fa-tower-broadcast" style="color: #10b981;"></i> Radar Feed Mới Nhất
              </h3>
              <a href="#/ebm/radar" style="font-size: 0.74rem; font-weight: 700; color: var(--color-primary); text-decoration: none;">Xem tất cả</a>
            </div>

            <div style="display: flex; flex-direction: column; gap: 0.65rem;">
              <div style="padding: 0.75rem 0.85rem; background: var(--hub-surface-2); border-radius: 10px; border: 1px solid var(--hub-border);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
                  <span style="font-size: 0.68rem; font-weight: 800; color: #dc2626; background: #fee2e2; padding: 1px 5px; border-radius: 4px;">Practice Changing</span>
                  <span style="font-size: 0.7rem; color: var(--hub-text-muted);">2026</span>
                </div>
                <h4 style="margin: 0 0 0.25rem 0; font-size: 0.88rem; font-weight: 800; color: var(--hub-text);">SGLT2i trong Bệnh Thận Mạn (CKD)</h4>
                <p style="margin: 0; font-size: 0.76rem; color: var(--hub-text-muted); line-height: 1.4;">Chỉ định mức độ 1A cho bệnh nhân CKD không phụ thuộc tình trạng ĐTĐ để bảo vệ thận.</p>
              </div>

              <div style="padding: 0.75rem 0.85rem; background: var(--hub-surface-2); border-radius: 10px; border: 1px solid var(--hub-border);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
                  <span style="font-size: 0.68rem; font-weight: 800; color: #0284c7; background: #e0f2fe; padding: 1px 5px; border-radius: 4px;">Bộ Y Tế VN</span>
                  <span style="font-size: 0.7rem; color: var(--hub-text-muted);">2025</span>
                </div>
                <h4 style="margin: 0 0 0.25rem 0; font-size: 0.88rem; font-weight: 800; color: var(--hub-text);">Phác Đồ Phối Hợp Đôi Sớm THA</h4>
                <p style="margin: 0; font-size: 0.76rem; color: var(--hub-text-muted); line-height: 1.4;">Khởi trị ngay bằng viên phối hợp đôi cố định liều (SPC) cho đa số bệnh nhân THA Độ 1.</p>
              </div>
            </div>
          </section>

        </div>

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
