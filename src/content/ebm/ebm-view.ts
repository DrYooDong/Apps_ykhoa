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

      <!-- 4 COMPACT MAIN MODULE CARDS (4 COLUMNS) -->
      <section style="margin-bottom: 1.25rem;" aria-label="Phân hệ chính Y học chứng cứ">
        <div class="ebm-bento-4-grid">
          
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
                Thử nghiệm RCT, Phân tích gộp Meta-analysis, Forest Plot và đánh giá sai số RoB-2.
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

          <!-- Card 3: Guideline Radar (Diff Studio) -->
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

          <!-- Card 4: EBM Practice Lab & Bedside Tools -->
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

        </div>
      </section>

      <!-- UNIFIED MASTER METHODOLOGY BENTO CARD (THÁP 6S & CHU TRÌNH 5AS GỘP CHUNG) -->
      <section style="margin-bottom: 2rem;" aria-label="Khung phương pháp luận và Tháp bằng chứng EBM">
        <div class="ebm-master-framework-card">
          
          <!-- Framework Header & Tabs Bar -->
          <div class="ebm-framework-header">
            <div class="ebm-framework-title-group">
              <div class="ebm-framework-icon-badge">
                <i class="fa-solid fa-brain"></i>
              </div>
              <div>
                <h2 style="font-size: 1.15rem; font-weight: 800; color: var(--hub-text); margin: 0; display: flex; align-items: center; gap: 0.5rem;">
                  <span>Khung Phương Pháp Luận &amp; Tháp Bằng Chứng EBM</span>
                  <span style="font-size: 0.7rem; font-weight: 800; padding: 0.15rem 0.5rem; border-radius: 12px; background: rgba(2, 132, 199, 0.12); color: var(--color-primary, #0284c7);">PRO SUITE</span>
                </h2>
                <div style="font-size: 0.78rem; color: var(--hub-text-muted); margin-top: 2px;">
                  Hệ thống hóa phân cấp Tháp Bằng Chứng 6S (Haynes) &amp; Chu Trình 5As thực hành lâm sàng chuẩn mực
                </div>
              </div>
            </div>

            <!-- Tab Switcher -->
            <div class="ebm-framework-tab-bar" role="tablist">
              <button type="button" class="ebm-framework-tab-btn is-active js-framework-tab-btn" data-tab="pyramid" role="tab" aria-selected="true">
                <i class="fa-solid fa-layer-group" style="color: #f59e0b;"></i>
                <span>🔺 Tháp 6S EBM</span>
              </button>
              <button type="button" class="ebm-framework-tab-btn js-framework-tab-btn" data-tab="5as" role="tab" aria-selected="false">
                <i class="fa-solid fa-rotate" style="color: #ec4899;"></i>
                <span>🔄 Chu Trình 5As</span>
              </button>
              <button type="button" class="ebm-framework-tab-btn js-framework-tab-btn" data-tab="matrix" role="tab" aria-selected="false">
                <i class="fa-solid fa-table-columns" style="color: #10b981;"></i>
                <span>⚖️ Ma Trận 5As × 6S</span>
              </button>
            </div>
          </div>

          <!-- TAB 1: THÁP BẰNG CHỨNG 6S VIEW -->
          <div id="frameworkViewPyramid" class="ebm-framework-view" style="display: block;">
            <div class="ebm-pyramid-split-layout">
              
              <!-- Left Column: Interactive 6S Pyramid Stack -->
              <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                  <span style="font-size: 0.74rem; font-weight: 800; color: var(--hub-text-muted); text-transform: uppercase; letter-spacing: 0.04em;">
                    Mô hình Phân cấp 6S (Haynes Model)
                  </span>
                  <span style="font-size: 0.72rem; color: #10b981; font-weight: 700;">
                    <i class="fa-solid fa-arrow-down-long"></i> Top-Down Search
                  </span>
                </div>

                <div class="ebm-pyramid-stack-wrapper">
                  <!-- Level 6 -->
                  <button type="button" class="ebm-pyramid-tier-btn js-pyramid-btn" data-tier="6">
                    <div class="ebm-pyramid-tier-bar" style="width: 52%; background: linear-gradient(135deg, #ef4444, #dc2626);">
                      <span>6. Systems (CDSS)</span>
                      <span style="font-size: 0.65rem; background: rgba(0,0,0,0.25); padding: 1px 6px; border-radius: 10px;">GRADE A</span>
                    </div>
                  </button>
                  <!-- Level 5 -->
                  <button type="button" class="ebm-pyramid-tier-btn js-pyramid-btn is-active" data-tier="5">
                    <div class="ebm-pyramid-tier-bar" style="width: 62%; background: linear-gradient(135deg, #f97316, #ea580c);">
                      <span>5. Summaries (Guidelines)</span>
                      <span style="font-size: 0.65rem; background: rgba(0,0,0,0.25); padding: 1px 6px; border-radius: 10px;">GRADE A/B</span>
                    </div>
                  </button>
                  <!-- Level 4 -->
                  <button type="button" class="ebm-pyramid-tier-btn js-pyramid-btn" data-tier="4">
                    <div class="ebm-pyramid-tier-bar" style="width: 72%; background: linear-gradient(135deg, #eab308, #ca8a04); color: #0f172a;">
                      <span>4. Synopses of Syntheses</span>
                      <span style="font-size: 0.65rem; background: rgba(0,0,0,0.15); padding: 1px 6px; border-radius: 10px; font-weight: 800;">GRADE B</span>
                    </div>
                  </button>
                  <!-- Level 3 -->
                  <button type="button" class="ebm-pyramid-tier-btn js-pyramid-btn" data-tier="3">
                    <div class="ebm-pyramid-tier-bar" style="width: 82%; background: linear-gradient(135deg, #22c55e, #16a34a);">
                      <span>3. Syntheses (Cochrane / Meta-analysis)</span>
                      <span style="font-size: 0.65rem; background: rgba(0,0,0,0.25); padding: 1px 6px; border-radius: 10px;">GRADE 1A</span>
                    </div>
                  </button>
                  <!-- Level 2 -->
                  <button type="button" class="ebm-pyramid-tier-btn js-pyramid-btn" data-tier="2">
                    <div class="ebm-pyramid-tier-bar" style="width: 91%; background: linear-gradient(135deg, #6366f1, #4f46e5);">
                      <span>2. Synopses of Studies</span>
                      <span style="font-size: 0.65rem; background: rgba(0,0,0,0.25); padding: 1px 6px; border-radius: 10px;">GRADE B/C</span>
                    </div>
                  </button>
                  <!-- Level 1 -->
                  <button type="button" class="ebm-pyramid-tier-btn js-pyramid-btn" data-tier="1">
                    <div class="ebm-pyramid-tier-bar" style="width: 100%; background: linear-gradient(135deg, #64748b, #475569);">
                      <span>1. Single Studies (RCT, Cohort, Case-Control)</span>
                      <span style="font-size: 0.65rem; background: rgba(0,0,0,0.25); padding: 1px 6px; border-radius: 10px;">GRADE C/D</span>
                    </div>
                  </button>
                </div>

                <div style="margin-top: 0.5rem; font-size: 0.72rem; color: var(--hub-text-muted); display: flex; align-items: center; gap: 0.4rem;">
                  <i class="fa-solid fa-circle-info" style="color: var(--color-primary, #0284c7);"></i>
                  <span>Click vào từng tầng tháp để xem chi tiết mức chứng cứ, công cụ tra cứu &amp; ví dụ lâm sàng.</span>
                </div>
              </div>

              <!-- Right Column: Interactive Detail Inspector -->
              <div id="ebmPyramidInspectorCard" style="background: var(--hub-surface-2); border: 1px solid var(--hub-border); border-radius: 12px; padding: 1.1rem 1.25rem;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.65rem; padding-bottom: 0.5rem; border-bottom: 1px solid var(--hub-border);">
                  <div>
                    <h3 id="ebmInspTitle" style="font-size: 1rem; font-weight: 800; color: #f97316; margin: 0; display: flex; align-items: center; gap: 0.4rem;">
                      <i class="fa-solid fa-bookmark"></i> 5. Summaries (Khuyến Cáo &amp; Guidelines)
                    </h3>
                    <span id="ebmInspLevel" style="font-size: 0.74rem; font-weight: 700; color: var(--hub-text-muted);">
                      Mức Bằng Chứng Rất Cao • Khuyến Cáo Thực Hành Lâm Sàng
                    </span>
                  </div>
                  <span id="ebmInspGradeBadge" style="font-size: 0.7rem; font-weight: 800; padding: 0.15rem 0.55rem; border-radius: 12px; background: rgba(249,115,22,0.15); color: #f97316;">
                    GRADE A/B
                  </span>
                </div>

                <p id="ebmInspBody" style="font-size: 0.8rem; color: var(--hub-text); line-height: 1.5; margin: 0 0 0.75rem 0;">
                  Tích hợp các hướng dẫn điều trị chuẩn mực (Clinical Practice Guidelines) dựa trên bằng chứng đã được thẩm định độc lập từ Bộ Y Tế, ESC, ADA, KDIGO, GOLD... Đây là tài liệu cốt lõi trong thực hành điều trị hàng ngày.
                </p>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.65rem; margin-bottom: 0.75rem; font-size: 0.76rem;">
                  <div style="background: var(--hub-surface); padding: 0.5rem 0.65rem; border-radius: 8px; border: 1px solid var(--hub-border);">
                    <div style="font-weight: 700; color: var(--hub-text); margin-bottom: 0.2rem;">
                      <i class="fa-solid fa-database" style="color: var(--color-primary, #0284c7);"></i> Nguồn Tra Cứu:
                    </div>
                    <div id="ebmInspSources" style="color: var(--hub-text-muted);">Bộ Y Tế VN, ESC, AHA/ACC, UpToDate, BMJ Best Practice, DynaMed.</div>
                  </div>
                  <div style="background: var(--hub-surface); padding: 0.5rem 0.65rem; border-radius: 8px; border: 1px solid var(--hub-border);">
                    <div style="font-weight: 700; color: var(--hub-text); margin-bottom: 0.2rem;">
                      <i class="fa-solid fa-clipboard-check" style="color: #10b981;"></i> Thang Thẩm Định:
                    </div>
                    <div id="ebmInspAppraisal" style="color: var(--hub-text-muted);">AGREE II Instrument, GRADE Methodology.</div>
                  </div>
                </div>

                <div style="background: rgba(2, 132, 199, 0.06); padding: 0.5rem 0.75rem; border-radius: 8px; border: 1px solid rgba(2, 132, 199, 0.15); font-size: 0.76rem;">
                  <strong style="color: var(--color-primary, #0284c7);">💡 Ví dụ thực tế:</strong>
                  <span id="ebmInspExample" style="color: var(--hub-text);"> Phác đồ 4 trụ cột suy tim HFrEF (ARNI + Chẹn Beta + MRA + SGLT2i) làm giảm 30% tử vong tim mạch.</span>
                </div>
              </div>

            </div>
          </div>

          <!-- TAB 2: CHU TRÌNH 5AS VIEW -->
          <div id="frameworkView5as" class="ebm-framework-view" style="display: none;">
            
            <!-- 5As Stepper Navigation Cards -->
            <div class="ebm-5as-stepper-bar">
              <div class="ebm-5as-step-card is-active js-5as-step-btn" data-step="1" style="--step-accent:#0284c7;">
                <div style="font-size: 1.1rem; color:#0284c7;"><i class="fa-solid fa-circle-question"></i></div>
                <div style="font-size: 0.8rem; font-weight: 800; color: var(--hub-text);">1. Ask</div>
                <div style="font-size: 0.68rem; color: var(--hub-text-muted);">Đặt câu hỏi PICO</div>
              </div>
              <div class="ebm-5as-step-card js-5as-step-btn" data-step="2" style="--step-accent:#7c3aed;">
                <div style="font-size: 1.1rem; color:#7c3aed;"><i class="fa-solid fa-magnifying-glass-chart"></i></div>
                <div style="font-size: 0.8rem; font-weight: 800; color: var(--hub-text);">2. Acquire</div>
                <div style="font-size: 0.68rem; color: var(--hub-text-muted);">Tìm kiếm y văn</div>
              </div>
              <div class="ebm-5as-step-card js-5as-step-btn" data-step="3" style="--step-accent:#10b981;">
                <div style="font-size: 1.1rem; color:#10b981;"><i class="fa-solid fa-scale-balanced"></i></div>
                <div style="font-size: 0.8rem; font-weight: 800; color: var(--hub-text);">3. Appraise</div>
                <div style="font-size: 0.68rem; color: var(--hub-text-muted);">Thẩm định giá trị</div>
              </div>
              <div class="ebm-5as-step-card js-5as-step-btn" data-step="4" style="--step-accent:#f59e0b;">
                <div style="font-size: 1.1rem; color:#f59e0b;"><i class="fa-solid fa-user-doctor"></i></div>
                <div style="font-size: 0.8rem; font-weight: 800; color: var(--hub-text);">4. Apply</div>
                <div style="font-size: 0.68rem; color: var(--hub-text-muted);">Ứng dụng lâm sàng</div>
              </div>
              <div class="ebm-5as-step-card js-5as-step-btn" data-step="5" style="--step-accent:#ef4444;">
                <div style="font-size: 1.1rem; color:#ef4444;"><i class="fa-solid fa-chart-pie"></i></div>
                <div style="font-size: 0.8rem; font-weight: 800; color: var(--hub-text);">5. Assess</div>
                <div style="font-size: 0.68rem; color: var(--hub-text-muted);">Lượng giá &amp; Audit</div>
              </div>
            </div>

            <!-- 5As Step Detail Panel -->
            <div id="ebm5asDetailPanel" class="ebm-5as-detail-panel">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.65rem; padding-bottom: 0.5rem; border-bottom: 1px solid var(--hub-border);">
                <div>
                  <h3 id="ebm5asTitle" style="font-size: 1rem; font-weight: 800; color: #0284c7; margin: 0; display: flex; align-items: center; gap: 0.4rem;">
                    <i class="fa-solid fa-circle-question"></i> 1. Ask — Đặt Câu Hỏi Lâm Sàng Có Cấu Trúc (PICO)
                  </h3>
                  <div id="ebm5asSubtitle" style="font-size: 0.74rem; color: var(--hub-text-muted); font-weight: 600;">
                    Chuyển đổi bất định lâm sàng thành câu hỏi có thể giải đáp khoa học
                  </div>
                </div>
                <span id="ebm5asBadge" style="font-size: 0.7rem; font-weight: 800; padding: 0.15rem 0.55rem; border-radius: 12px; background: rgba(2, 132, 199, 0.15); color: #0284c7;">
                  Bước Khởi Đầu
                </span>
              </div>

              <div style="display: grid; grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr); gap: 1rem;">
                <div>
                  <p id="ebm5asDesc" style="font-size: 0.8rem; color: var(--hub-text); line-height: 1.5; margin: 0 0 0.65rem 0;">
                    Mô hình PICO chia nhỏ câu hỏi thành 4 thành tố: <strong>P</strong> (Bệnh nhân/Vấn đề), <strong>I</strong> (Can thiệp), <strong>C</strong> (Đối chứng), <strong>O</strong> (Kết cục lâm sàng). Giúp định vị chính xác từ khóa tìm kiếm.
                  </p>
                  <div id="ebm5asChecklist" style="display: flex; flex-direction: column; gap: 0.35rem; font-size: 0.76rem;">
                    <div style="padding: 4px 8px; background: var(--hub-surface); border-radius: 6px; border-left: 3px solid #0284c7; color: var(--hub-text);">
                      <strong>• Xác định nhóm bệnh nhân (P):</strong> Tuổi, giới, giai đoạn bệnh và bệnh đồng mắc.
                    </div>
                    <div style="padding: 4px 8px; background: var(--hub-surface); border-radius: 6px; border-left: 3px solid #0284c7; color: var(--hub-text);">
                      <strong>• Xác định can thiệp (I):</strong> Thuốc, liều dùng, thủ thuật phẫu thuật hoặc test chẩn đoán.
                    </div>
                    <div style="padding: 4px 8px; background: var(--hub-surface); border-radius: 6px; border-left: 3px solid #0284c7; color: var(--hub-text);">
                      <strong>• Xác định đối chứng (C):</strong> Giả dược (Placebo) hoặc phác đồ điều trị chuẩn (Standard Care).
                    </div>
                    <div style="padding: 4px 8px; background: var(--hub-surface); border-radius: 6px; border-left: 3px solid #0284c7; color: var(--hub-text);">
                      <strong>• Xác định kết cục (O):</strong> Tỷ lệ tử vong, biến cố tim mạch chính (MACE), chất lượng sống.
                    </div>
                  </div>
                </div>

                <div style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.75rem;">
                  <div style="background: var(--hub-surface); padding: 0.75rem; border-radius: 10px; border: 1px solid var(--hub-border); font-size: 0.76rem;">
                    <div style="font-weight: 800; color: var(--hub-text); margin-bottom: 0.3rem;">
                      <i class="fa-solid fa-lightbulb" style="color: #f59e0b;"></i> Mẹo Lâm Sàng (Clinical Pearl):
                    </div>
                    <div id="ebm5asPearl" style="color: var(--hub-text-muted); line-height: 1.45;">
                      Luôn ưu tiên các kết cục lâm sàng định lượng cứng (Patient-Important Outcomes như tử vong, nhập viện) thay vì chỉ nhìn vào các chỉ số thay thế (Surrogate Endpoints).
                    </div>
                  </div>

                  <a id="ebm5asActionBtn" href="#/ebm/ebm-lab" style="display: inline-flex; align-items: center; justify-content: center; gap: 0.4rem; padding: 0.55rem 1rem; border-radius: 8px; background: var(--color-primary, #0284c7); color: #ffffff; text-decoration: none; font-size: 0.8rem; font-weight: 700; transition: filter 0.2s ease;">
                    <i class="fa-solid fa-flask-vial"></i>
                    <span>Mở PICO Builder tại EBM Lab</span>
                  </a>
                </div>
              </div>
            </div>

          </div>

          <!-- TAB 3: MA TRẬN 5AS X 6S INTEGRATION VIEW -->
          <div id="frameworkViewMatrix" class="ebm-framework-view" style="display: none;">
            <div style="margin-bottom: 0.75rem;">
              <span style="font-size: 0.78rem; font-weight: 700; color: var(--hub-text);">
                ⚡ Chiến lược Tìm kiếm &amp; Thẩm định Thực Hành Lâm Sàng (Top-Down Search Matrix)
              </span>
              <p style="font-size: 0.74rem; color: var(--hub-text-muted); margin: 0.15rem 0 0 0;">
                Quy tắc phối hợp giữa từng bước trong Chu Trình 5As với các tầng của Tháp 6S nhằm tiết kiệm 80% thời gian trực lâm sàng:
              </p>
            </div>

            <div class="ebm-matrix-table-wrap">
              <table class="ebm-matrix-table">
                <thead>
                  <tr>
                    <th style="width: 20%;">Bước Chu Trình 5As</th>
                    <th style="width: 32%;">Tầng Tháp 6S Ưu Tiên</th>
                    <th style="width: 26%;">Nguồn Dữ Liệu Khuyến Nghị</th>
                    <th style="width: 22%;">Thang Đo / Checklist</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong style="color:#0284c7;">1. Ask</strong> (Đặt câu hỏi)</td>
                    <td>Xác định dạng câu hỏi (Therapy, Diagnosis, Prognosis, Harm)</td>
                    <td>PICO Formulation Tool</td>
                    <td>PICO Framework</td>
                  </tr>
                  <tr>
                    <td><strong style="color:#7c3aed;">2. Acquire</strong> (Tìm kiếm)</td>
                    <td><strong>L6 Systems</strong> (CDSS) &rarr; <strong>L5 Summaries</strong> &rarr; <strong>L3 Syntheses</strong></td>
                    <td>UpToDate, Cochrane Library, PubMed Clinical Queries</td>
                    <td>MeSH &amp; Boolean Syntax</td>
                  </tr>
                  <tr>
                    <td><strong style="color:#10b981;">3. Appraise</strong> (Thẩm định)</td>
                    <td><strong>L5 Guidelines</strong> (AGREE II) • <strong>L3 Meta</strong> (AMSTAR-2) • <strong>L1 RCT</strong> (RoB-2)</td>
                    <td>CASP Scale, Cochrane RoB-2, ROBINS-I</td>
                    <td>NNT, ARR, RRR, Odds Ratio</td>
                  </tr>
                  <tr>
                    <td><strong style="color:#f59e0b;">4. Apply</strong> (Ứng dụng)</td>
                    <td>Tích hợp L5/L6 với Bối cảnh &amp; Nguyện vọng Bệnh nhân</td>
                    <td>Shared Decision Making Tools, Bảng tính NNT</td>
                    <td>Benefit-Harm Balance</td>
                  </tr>
                  <tr>
                    <td><strong style="color:#ef4444;">5. Assess</strong> (Lượng giá)</td>
                    <td>Đánh giá kết cục thực tế trên người bệnh &amp; Audit quy trình</td>
                    <td>Clinical Audit Registry, EMR Follow-up</td>
                    <td>CQI / PDCA Cycle</td>
                  </tr>
                </tbody>
              </table>
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

  // 2.5 Master Framework Tab Switcher (6S Pyramid vs 5As Cycle vs Matrix)
  const frameworkTabs = document.querySelectorAll<HTMLButtonElement>('.js-framework-tab-btn');
  const viewPyramid = document.getElementById('frameworkViewPyramid');
  const view5as = document.getElementById('frameworkView5as');
  const viewMatrix = document.getElementById('frameworkViewMatrix');

  frameworkTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      frameworkTabs.forEach(t => {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');

      const target = tab.getAttribute('data-tab');
      if (viewPyramid) viewPyramid.style.display = target === 'pyramid' ? 'block' : 'none';
      if (view5as) view5as.style.display = target === '5as' ? 'block' : 'none';
      if (viewMatrix) viewMatrix.style.display = target === 'matrix' ? 'block' : 'none';
    });
  });

  // 3. 6S Pyramid Inspector Logic (Enhanced Multi-field Inspector)
  const pyramidBtns = document.querySelectorAll<HTMLButtonElement>('.js-pyramid-btn');
  const inspTitle = document.getElementById('ebmInspTitle');
  const inspLevel = document.getElementById('ebmInspLevel');
  const inspGradeBadge = document.getElementById('ebmInspGradeBadge');
  const inspBody = document.getElementById('ebmInspBody');
  const inspSources = document.getElementById('ebmInspSources');
  const inspAppraisal = document.getElementById('ebmInspAppraisal');
  const inspExample = document.getElementById('ebmInspExample');

  const TIER_DATA: Record<string, {
    title: string;
    color: string;
    level: string;
    badge: string;
    desc: string;
    sources: string;
    appraisal: string;
    example: string;
  }> = {
    '6': {
      title: '6. Systems (Hệ Thống Hỗ Trợ Ra Quyết Định CDSS)',
      color: '#ef4444',
      level: 'Đỉnh Tháp Chứng Cứ • Khuyến Cáo Tự Động Thời Gian Thực',
      badge: 'GRADE A • Khuyến cáo IA',
      desc: 'Hệ thống Hỗ trợ Ra quyết định Lâm sàng (CDSS) được tích hợp trực tiếp vào Bệnh án điện tử (EMR). Tự động đối chiếu thông số bệnh nhân với các hướng dẫn điều trị chuẩn để cảnh báo tương tác thuốc và gợi ý phác đồ tối ưu.',
      sources: 'Epic CDSS Engine, Cerner Discern Expert, CliniPortal Decision Support, UpToDate Advanced.',
      appraisal: 'HIMSS Stage 7 Standards, Clinical Decision Support Validation Protocol.',
      example: 'Cảnh báo tự động ngưng Metformin và SGLT2i khi eGFR < 30 mL/phút hoặc gợi ý liều Kháng sinh theo ClCr cá nhân hóa.'
    },
    '5': {
      title: '5. Summaries (Khuyến Cáo Điều Trị & Guidelines)',
      color: '#f97316',
      level: 'Mức Bằng Chứng Rất Cao • Hướng Dẫn Thực Hành CPGs',
      badge: 'GRADE A/B',
      desc: 'Tích hợp các hướng dẫn điều trị chuẩn mực (Clinical Practice Guidelines) dựa trên bằng chứng đã được thẩm định độc lập từ Bộ Y Tế, ESC, ADA, KDIGO, GOLD... Đây là kim chỉ nam trong thực hành điều trị hàng ngày.',
      sources: 'Bộ Y Tế Việt Nam, ESC, AHA/ACC, ADA, KDIGO, GOLD, GINA, UpToDate, BMJ Best Practice.',
      appraisal: 'AGREE II Instrument, GRADE Methodology.',
      example: 'Phác đồ 4 trụ cột suy tim HFrEF (ARNI + Chẹn Beta + MRA + SGLT2i) làm giảm 30% tử vong tim mạch.'
    },
    '4': {
      title: '4. Synopses of Syntheses (Tóm Tắt Tổng Quan Hệ Thống)',
      color: '#eab308',
      level: 'Tóm Tắt Đánh Giá Độc Lập • Tiết Kiệm Thời Gian',
      badge: 'GRADE B',
      desc: 'Các bài viết tóm tắt ngắn gọn kèm phân tích bình luận cấu trúc của các bài Tổng quan hệ thống / Meta-analysis. Giúp bác sĩ nắm bắt kết luận phân tích gộp trong 2 phút mà không cần đọc hàng chục trang báo cáo.',
      sources: 'DARE (Database of Abstracts of Reviews of Effects), ACP Journal Club, Evidence-Based Medicine (BMJ).',
      appraisal: 'AMSTAR-2 Critical Appraisal, ROBIS.',
      example: 'Tóm tắt tổng quan 42 thử nghiệm RCT về hiệu quả của Statin cường độ cao trong dự phòng tiên phát biến cố tim mạch.'
    },
    '3': {
      title: '3. Syntheses (Tổng Quan Hệ Thống & Phân Tích Gộp)',
      color: '#22c55e',
      level: 'Bằng Chứng Đỉnh Cao • Kích Thước Mẫu Lớn',
      badge: 'GRADE 1A • Mức Cao Nhất',
      desc: 'Tổng hợp toàn diện có hệ thống tất cả các thử nghiệm RCT độc lập, định lượng hóa kích thước hiệu ứng qua biểu đồ Forest Plot và kiểm tra sai lệch xuất bản qua Funnel Plot.',
      sources: 'Cochrane Database of Systematic Reviews (CDSR), PubMed Systematic Reviews, PROSPERO Registry.',
      appraisal: 'PRISMA Statement 2020, AMSTAR-2, Cochrane Handbook for Systematic Reviews.',
      example: 'Phân tích gộp Cochrane gồm 85.000 bệnh nhân chứng minh hạ huyết áp tâm thu mỗi 10 mmHg làm giảm 20% đột quỵ.'
    },
    '2': {
      title: '2. Synopses of Single Studies (Tóm Tắt Nghiên Cứu Gốc)',
      color: '#6366f1',
      level: 'Tóm Tắt Thẩm Định Độc Lập • Nghiên Cứu Đơn Lẻ',
      badge: 'GRADE B/C',
      desc: 'Bản tóm tắt và bình luận phương pháp luận của một thử nghiệm lâm sàng đơn lẻ có chất lượng cao (ví dụ: các bài tóm tắt trên Evidence-Based Medicine Journal hay ACP Journal Club).',
      sources: 'Evidence-Based Medicine Journal, ACP Journal Club, NEJM Journal Watch, The Lancet Editorial.',
      appraisal: 'CASP RCT Checklist, JADAD Scale.',
      example: 'Bản tóm tắt và phân tích nhanh chỉ số NNT = 19 của thử nghiệm DAPA-HF đối với bệnh nhân suy tim giảm phân suất tống máu.'
    },
    '1': {
      title: '1. Single Studies (Nghiên Cứu Gốc Riêng Lẻ)',
      color: '#64748b',
      level: 'Đáy Tháp Chứng Cứ • Dữ Liệu Ban Đầu',
      badge: 'Dữ Liệu Thô • Cần Thẩm Định Sai Số',
      desc: 'Các công trình nghiên cứu gốc riêng lẻ xuất bản lần đầu (RCT, Nghiên cứu đoàn hệ Cohort, Bệnh - Chứng Case-Control, Báo cáo ca Case Report). Cần được thẩm định kỹ lưỡng nguy cơ sai số trước khi ứng dụng.',
      sources: 'NEJM, The Lancet, JAMA, BMJ, ClinicalTrials.gov, PubMed Direct.',
      appraisal: 'Cochrane RoB-2 (cho RCT), ROBINS-I (cho Non-randomized), STROBE (cho Quan sát).',
      example: 'Thử nghiệm lâm sàng ngẫu nhiên có đối chứng mù đôi (RCT) giai đoạn 3 đánh giá hiệu quả của kháng thể đơn dòng mới.'
    }
  };

  pyramidBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      pyramidBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const tier = btn.getAttribute('data-tier');
      if (tier && TIER_DATA[tier]) {
        const data = TIER_DATA[tier];
        if (inspTitle) inspTitle.innerHTML = `<i class="fa-solid fa-bookmark" style="color:${data.color};"></i> ${data.title}`;
        if (inspLevel) inspLevel.textContent = data.level;
        if (inspGradeBadge) {
          inspGradeBadge.textContent = data.badge;
          inspGradeBadge.style.color = data.color;
          inspGradeBadge.style.backgroundColor = `${data.color}22`;
        }
        if (inspBody) inspBody.textContent = data.desc;
        if (inspSources) inspSources.textContent = data.sources;
        if (inspAppraisal) inspAppraisal.textContent = data.appraisal;
        if (inspExample) inspExample.textContent = data.example;
      }
    });
  });

  // 3.5 Interactive 5As Cycle Step Controller
  const stepBtns = document.querySelectorAll<HTMLElement>('.js-5as-step-btn');
  const title5as = document.getElementById('ebm5asTitle');
  const subtitle5as = document.getElementById('ebm5asSubtitle');
  const badge5as = document.getElementById('ebm5asBadge');
  const desc5as = document.getElementById('ebm5asDesc');
  const checklist5as = document.getElementById('ebm5asChecklist');
  const pearl5as = document.getElementById('ebm5asPearl');
  const actionBtn5as = document.getElementById('ebm5asActionBtn') as HTMLAnchorElement | null;

  const STEP_DATA: Record<string, {
    title: string;
    subtitle: string;
    badge: string;
    color: string;
    icon: string;
    desc: string;
    checklist: Array<{ label: string; text: string }>;
    pearl: string;
    actionText: string;
    actionUrl: string;
  }> = {
    '1': {
      title: '1. Ask — Đặt Câu Hỏi Lâm Sàng Có Cấu Trúc (PICO)',
      subtitle: 'Chuyển đổi bất định lâm sàng thành câu hỏi có thể giải đáp khoa học',
      badge: 'Bước Khởi Đầu',
      color: '#0284c7',
      icon: 'fa-circle-question',
      desc: 'Mô hình PICO chia nhỏ câu hỏi thành 4 thành tố: P (Bệnh nhân/Vấn đề), I (Can thiệp), C (Đối chứng), O (Kết cục lâm sàng). Giúp định vị chính xác từ khóa và chiến lược tìm kiếm.',
      checklist: [
        { label: 'Xác định nhóm bệnh nhân (P):', text: 'Độ tuổi, giới, giai đoạn bệnh, bệnh đồng mắc.' },
        { label: 'Xác định can thiệp (I):', text: 'Thuốc, liều dùng, thủ thuật phẫu thuật hoặc test chẩn đoán.' },
        { label: 'Xác định đối chứng (C):', text: 'Giả dược (Placebo) hoặc phác đồ điều trị chuẩn (Standard Care).' },
        { label: 'Xác định kết cục (O):', text: 'Tỷ lệ tử vong, biến cố tim mạch chính (MACE), chất lượng sống.' }
      ],
      pearl: 'Luôn ưu tiên các kết cục lâm sàng định lượng cứng (Patient-Important Outcomes như tử vong, tái nhập viện) thay vì chỉ nhìn vào các chỉ số thay thế (Surrogate Endpoints).',
      actionText: 'Mở PICO Builder tại EBM Lab',
      actionUrl: '#/ebm/ebm-lab'
    },
    '2': {
      title: '2. Acquire — Tìm Kiếm Bằng Chứng Y Khoa Tốt Nhất',
      subtitle: 'Chiến lược truy vấn đa tầng từ đỉnh tháp chứng cứ xuống đáy tháp',
      badge: 'Thu Thập Y Văn',
      color: '#7c3aed',
      icon: 'fa-magnifying-glass-chart',
      desc: 'Áp dụng nguyên tắc Top-Down Search: Ưu tiên tìm ở L6 (Hệ thống CDSS) và L5 (Guidelines) trước. Nếu chưa có câu trả lời mới tiếp tục tra cứu L3 (Cochrane/Meta-analysis) và L1 (PubMed RCTs).',
      checklist: [
        { label: 'Sử dụng thuật ngữ MeSH:', text: 'Tìm kiếm chuẩn hóa từ khóa y khoa theo Medical Subject Headings.' },
        { label: 'Toán tử Boolean:', text: 'Kết hợp logic AND, OR, NOT để thu hẹp hoặc mở rộng phạm vi tìm kiếm.' },
        { label: 'Bộ lọc Clinical Queries:', text: 'Sử dụng filter chuyên biệt của PubMed (Therapy, Diagnosis, Prognosis).' },
        { label: 'Tra cứu đa nguồn:', text: 'Kiểm tra chéo giữa UpToDate, Cochrane Library, PubMed và ClinicalTrials.gov.' }
      ],
      pearl: 'Bắt đầu từ tầng L5 (Guidelines) giúp tiết kiệm 80% thời gian so với việc tự bơi trong hàng nghìn bài báo đơn lẻ trên PubMed khi đang trực lâm sàng.',
      actionText: 'Xem Bảng Tin Guidelines PubMed Live',
      actionUrl: '#pubmed-board-container'
    },
    '3': {
      title: '3. Appraise — Thẩm Định Phê Bình Y Văn (Critical Appraisal)',
      subtitle: 'Đánh giá tính giá trị nội tại, mức độ ảnh hưởng và khả năng áp dụng',
      badge: 'Thẩm Định Khoa Học',
      color: '#10b981',
      icon: 'fa-scale-balanced',
      desc: 'Áp dụng 3 câu hỏi vàng của Sackett: (1) Nghiên cứu có trung thực/hợp lệ không (Validity)? (2) Hiệu quả lâm sàng lớn đến mức nào (Impact: ARR, RRR, NNT)? (3) Kết quả có áp dụng được cho bệnh nhân của tôi không (Applicability)?',
      checklist: [
        { label: 'Thẩm định sai số (Bias):', text: 'Kiểm tra phân bổ ngẫu nhiên, làm mù (Blinding), mất dấu theo dõi (Attrition).' },
        { label: 'Định lượng hiệu quả can thiệp:', text: 'Tính toán NNT (Number Needed to Treat), ARR, Relative Risk và 95% CI.' },
        { label: 'Sử dụng Bảng kiểm chuẩn:', text: 'Bảng kiểm CASP (RCT/Systematic Review), RoB-2, AMSTAR-2.' },
        { label: 'Đánh giá xung đột lợi ích:', text: 'Kiểm tra nguồn tài trợ nghiên cứu và tính độc lập của tác giả.' }
      ],
      pearl: 'Một kết quả có ý nghĩa thống kê (p < 0.05) chưa chắc đã có ý nghĩa lâm sàng (Clinical Significance). Luôn nhìn vào chỉ số NNT và khoảng tin cậy 95% CI.',
      actionText: 'Mở Thang CASP & Bộ Tính Toán NNT',
      actionUrl: '#/ebm/ebm-lab'
    },
    '4': {
      title: '4. Apply — Tích Hợp Bằng Chứng Vào Quyết Định Lâm Sàng',
      subtitle: 'Tam giác vàng EBM: Y văn tốt nhất + Kinh nghiệm Bác sĩ + Giá trị Bệnh nhân',
      badge: 'Cá Nhân Hóa Điều Trị',
      color: '#f59e0b',
      icon: 'fa-user-doctor',
      desc: 'Y học chứng cứ không phải là sách mẫu áp đặt (Cookbook Medicine). Bác sĩ phải tích hợp bằng chứng khoa học với kinh nghiệm chuyên môn, điều kiện trang thiết bị cơ sở và tôn trọng tuyệt đối nguyện vọng của người bệnh.',
      checklist: [
        { label: 'Đánh giá tính tương đồng:', text: 'Bệnh nhân của tôi có tương tự với đối tượng trong nghiên cứu không?' },
        { label: 'Cân nhắc Lợi ích / Nguy cơ:', text: 'Đánh giá cán cân giữa hiệu quả điều trị và tác dụng phụ tiềm tàng.' },
        { label: 'Ra quyết định chia sẻ (SDM):', text: 'Giải thích rõ ràng lợi ích, nguy cơ và chi phí để bệnh nhân cùng chọn lựa.' },
        { label: 'Khả thi & Nguồn lực:', text: 'Thuốc hoặc kỹ thuật có sẵn tại bệnh viện và bảo hiểm y tế chi trả không?' }
      ],
      pearl: 'Bằng chứng khoa học chỉ là một trong ba chân kiềng của EBM. Thiếu sự thấu hiểu nguyện vọng bệnh nhân và kinh nghiệm lâm sàng thì không thể đạt hiệu quả điều trị tối ưu.',
      actionText: 'Xem Guideline Radar So Sánh',
      actionUrl: '#/ebm/radar'
    },
    '5': {
      title: '5. Assess — Lượng Giá Kết Quả & Kiểm Toán Lâm Sàng',
      subtitle: 'Theo dõi diễn tiến thực tế của bệnh nhân và tự cải tiến quy trình EBM',
      badge: 'Cải Tiến Chất Lượng (CQI)',
      color: '#ef4444',
      icon: 'fa-chart-pie',
      desc: 'Theo dõi kết quả điều trị thực tế trên người bệnh sau can thiệp, phát hiện sớm biến cố ngoại ý và thực hiện tự kiểm toán (Self-Audit) để liên tục tối ưu hóa kỹ năng thực hành EBM của bản thân.',
      checklist: [
        { label: 'Theo dõi kết cục thực tế:', text: 'Bệnh nhân có đáp ứng tốt như kỳ vọng không? Có gặp tác dụng phụ không?' },
        { label: 'Đánh giá sự tuân thủ:', text: 'Bệnh nhân có dùng thuốc đúng liều và tái khám đúng hẹn không?' },
        { label: 'Tự đánh giá quy trình EBM:', text: 'Mình đã đặt câu hỏi PICO đủ chuẩn chưa? Tìm kiếm có nhanh và chính xác không?' },
        { label: 'Kiểm toán lâm sàng (Clinical Audit):', text: 'Cập nhật lại phác đồ của khoa/phòng khám dựa trên dữ liệu thực tế.' }
      ],
      pearl: 'Chu trình 5As là một vòng lặp liên tục (Closed-loop Cycle). Mỗi ca bệnh được lượng giá cẩn thận sẽ là kinh nghiệm quý giá cho các quyết định lâm sàng tiếp theo.',
      actionText: 'Vào Phân Hệ Thống Kê Y Học',
      actionUrl: '#/ebm/thong-ke-y-hoc'
    }
  };

  stepBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      stepBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const step = btn.getAttribute('data-step');
      if (step && STEP_DATA[step]) {
        const data = STEP_DATA[step];
        if (title5as) title5as.innerHTML = `<i class="fa-solid ${data.icon}" style="color:${data.color};"></i> ${data.title}`;
        if (subtitle5as) subtitle5as.textContent = data.subtitle;
        if (badge5as) {
          badge5as.textContent = data.badge;
          badge5as.style.color = data.color;
          badge5as.style.backgroundColor = `${data.color}22`;
        }
        if (desc5as) desc5as.innerHTML = data.desc;
        if (checklist5as) {
          checklist5as.innerHTML = data.checklist.map(item => `
            <div style="padding: 4px 8px; background: var(--hub-surface); border-radius: 6px; border-left: 3px solid ${data.color}; color: var(--hub-text);">
              <strong>• ${item.label}</strong> ${item.text}
            </div>
          `).join('');
        }
        if (pearl5as) pearl5as.textContent = data.pearl;
        if (actionBtn5as) {
          actionBtn5as.textContent = data.actionText;
          actionBtn5as.href = data.actionUrl;
          actionBtn5as.style.backgroundColor = data.color;
        }
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
