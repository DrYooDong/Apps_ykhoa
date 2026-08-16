/**
 * CliniPortal 2.0 — EBM (Evidence-Based Medicine) SPA Hub View
 * Path: src/content/ebm/ebm-view.ts
 */

import './css/yhcc-hub.css';
import './css/pubmed-guidelines-board.css';
import '../../../css/components/evidence-bridge.css';

export function renderEbmView(): string {
  return `
    <div class="ebm-hub-page-wrapper" style="width: 100%; max-width: 1520px; margin: 0 auto; padding-bottom: 2.5rem;">
      
      <!-- BREADCRUMB -->
      <div class="breadcrumb" style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 1rem;">
        <a href="#/" style="color: inherit; text-decoration: none;">🏠 Trang chủ</a> &nbsp;/&nbsp; 
        <span style="color: var(--color-primary, #0284c7); font-weight: 600;">Y học Chứng cứ (EBM)</span>
      </div>

      <!-- VIPPRO HERO COMMAND CENTER BANNER -->
      <section class="hub-hero-vippro" aria-labelledby="hub-hero-title" style="margin-bottom: 1.75rem;">
        <div class="hub-hero-mesh-bg">
          <div class="hub-hero-mesh-1"></div>
          <div class="hub-hero-mesh-2"></div>
        </div>

        <div class="hub-hero-inner">
          <div class="hub-hero-header-row" style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem;">
            <div>
              <div class="hub-hero-eyebrow-badge">
                <span class="hub-hero-pulse-dot"></span>
                EBM Command Center — Evidence-Based Medicine
              </div>
              <h1 class="hub-hero-title-main" id="hub-hero-title" style="font-size: 2.25rem; font-weight: 800; margin: 0.5rem 0; line-height: 1.2;">
                Trung Tâm Y Học Chứng Cứ<br>& Hướng Dẫn Điều Trị
              </h1>
            </div>

            <!-- KHO GUIDELINE HERO BUTTON -->
            <a href="#/ebm/kho-guidelines" class="hub-hero-btn-kho" title="Truy cập Kho Guidelines tóm tắt" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.25rem; background: var(--color-primary, #0284c7); color: #fff; border-radius: 0.75rem; text-decoration: none; font-weight: 700; box-shadow: 0 4px 14px rgba(2,132,199,0.35);">
              <i class="fa-solid fa-folder-open"></i>
              <span>Kho Guidelines</span>
            </a>
          </div>

          <p class="hub-hero-desc" style="max-width: 900px; font-size: 0.95rem; color: var(--color-text-muted, #94a3b8); line-height: 1.6; margin: 0.75rem 0 1.5rem 0;">
            Hệ thống tổng hợp và phân tích lý thuyết thống kê, thiết kế nghiên cứu khoa học, tháp bằng chứng 6S cùng kho hướng dẫn thực hành lâm sàng EBM từ các hiệp hội y học thế giới & Bộ Y Tế.
          </p>

          <!-- REALTIME KPI METRICS GRID -->
          <div class="hub-kpi-grid">
            <div class="hub-kpi-card">
              <div class="hub-kpi-top">
                <span class="hub-kpi-label">Tổng Guidelines</span>
                <div class="hub-kpi-icon">📚</div>
              </div>
              <div class="hub-kpi-val" id="stat-total-guidelines">97+</div>
              <div class="hub-kpi-sub">Đồng bộ tự động</div>
            </div>

            <div class="hub-kpi-card">
              <div class="hub-kpi-top">
                <span class="hub-kpi-label">Practice-Changing</span>
                <div class="hub-kpi-icon">🏆</div>
              </div>
              <div class="hub-kpi-val" id="stat-practice-changing">73</div>
              <div class="hub-kpi-sub">Thay đổi điều trị</div>
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
              <div class="hub-kpi-val" id="stat-intl-guidelines">60+</div>
              <div class="hub-kpi-sub">Cập nhật toàn cầu</div>
            </div>
          </div>

        </div>
      </section>

      <!-- TWO COLUMN MAIN LAYOUT GRID -->
      <div class="ebm-layout-grid">

        <!-- LEFT COLUMN: MAIN CONTENT & TOOLS -->
        <div style="display: flex; flex-direction: column; gap: 1.5rem; width: 100%; min-width: 0;">

          <!-- QUICK ACCESS MODULE PILLS NAV BAR -->
          <div class="ebm-module-nav-grid">
            <!-- Pill 1: Thống Kê Y Học -->
            <a href="#/ebm/thong-ke-y-hoc" class="ebm-nav-pill-btn stat" id="card-thongke" title="Vào phân hệ Thống Kê Y Học & Nghiên Cứu">
              <span class="ebm-nav-pill-icon">📊</span>
              <div class="ebm-nav-pill-text">
                <span class="ebm-nav-pill-title">Thống Kê Y Học</span>
                <span class="ebm-nav-pill-desc">RCT, Meta-analysis</span>
              </div>
              <i class="fa-solid fa-arrow-right ebm-nav-pill-arrow"></i>
            </a>

            <!-- Pill 2: Guidelines -->
            <a href="#/ebm/kho-guidelines" class="ebm-nav-pill-btn guide" id="card-guidelines" title="Vào Kho Guidelines & Khuyến Cáo">
              <span class="ebm-nav-pill-icon">📋</span>
              <div class="ebm-nav-pill-text">
                <span class="ebm-nav-pill-title">Kho Guidelines</span>
                <span class="ebm-nav-pill-desc">Bộ Y Tế, ESC, ADA</span>
              </div>
              <i class="fa-solid fa-arrow-right ebm-nav-pill-arrow"></i>
            </a>

            <!-- Pill 3: Guideline Radar -->
            <a href="#/ebm/radar" class="ebm-nav-pill-btn radar" id="card-radar" title="Vào Guideline Radar Diff View">
              <span class="ebm-nav-pill-icon">📡</span>
              <div class="ebm-nav-pill-text">
                <span class="ebm-nav-pill-title">Guideline Radar</span>
                <span class="ebm-nav-pill-desc">Diff View Trước/Sau</span>
              </div>
              <i class="fa-solid fa-arrow-right ebm-nav-pill-arrow"></i>
            </a>

            <!-- Pill 4: EBM Practice Lab -->
            <a href="#/ebm/ebm-lab" class="ebm-nav-pill-btn lab" id="card-ebm-lab" title="Vào EBM Practice Lab">
              <span class="ebm-nav-pill-icon">🧪</span>
              <div class="ebm-nav-pill-text">
                <span class="ebm-nav-pill-title">EBM Practice Lab</span>
                <span class="ebm-nav-pill-desc">PICO, CASP & NNT</span>
              </div>
              <i class="fa-solid fa-arrow-right ebm-nav-pill-arrow"></i>
            </a>
          </div>

          <!-- 1. PUBMED GUIDELINES NOTIFICATION BOARD -->
          <section class="pubmed-board-section" id="pubmed-board-container" aria-labelledby="pubmed-board-title">
            <div class="pubmed-board-header" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
              <div class="pubmed-board-title-group" style="display: flex; align-items: center; gap: 0.75rem;">
                <div class="pubmed-board-icon" style="font-size: 1.5rem; color: var(--color-primary, #0284c7);">
                  <i class="fa-solid fa-newspaper"></i>
                </div>
                <div>
                  <h2 class="pubmed-board-title" id="pubmed-board-title" style="margin: 0; font-size: 1.15rem; font-weight: 700;">
                    Bảng Tin Guidelines PubMed Mới Nhất
                    <span id="pubmed-status-badge" class="pubmed-board-badge badge-pubmed-direct" style="font-size: 0.7rem; padding: 0.2rem 0.5rem; border-radius: 0.35rem; background: var(--color-surface-offset, #f1f5f9); color: var(--color-primary, #0284c7); margin-left: 0.5rem;">
                      <i class="fa-solid fa-globe"></i> PubMed Direct
                    </span>
                  </h2>
                  <div style="font-size: 0.75rem; color: var(--color-text-muted, #64748b); margin-top: 2px;">
                    Tổng hợp tự động khuyến cáo quốc tế mới xuất bản & phân loại chuyên khoa
                  </div>
                </div>
              </div>

              <div class="pubmed-board-controls" style="display: flex; align-items: center; gap: 0.5rem;">
                <button type="button" class="btn btn-secondary btn-sm" id="btn-toggle-pubmed-board" style="display: inline-flex; align-items: center; gap: 0.35rem; padding: 0.4rem 0.75rem; font-size: 0.8rem; border-radius: 0.4rem; border: 1px solid var(--color-border, #e2e8f0); background: var(--color-surface, #fff); cursor: pointer;">
                  <span id="pubmed-toggle-label">Thu gọn</span>
                  <span id="pubmed-toggle-icon">▲</span>
                </button>
              </div>
            </div>

            <!-- Guidelines items list -->
            <div class="pubmed-guidelines-list" id="pubmed-guidelines-list" style="margin-top: 1rem; display: flex; flex-direction: column; gap: 0.75rem;">
              <div class="pubmed-item-card" style="padding: 1rem; background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.5rem;">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.35rem;">
                  <span class="badge" style="background: #fee2e2; color: #dc2626; font-size: 0.7rem; font-weight: 700; padding: 0.15rem 0.45rem; border-radius: 0.25rem;">ESC 2024 / 2025</span>
                  <span style="font-size: 0.75rem; color: var(--color-text-muted, #64748b);">European Heart Journal</span>
                </div>
                <h4 style="margin: 0 0 0.35rem 0; font-size: 0.95rem; font-weight: 700; color: var(--color-text, #0f172a);">
                  2024 ESC Guidelines for the management of elevated blood pressure and hypertension
                </h4>
                <p style="margin: 0; font-size: 0.825rem; color: var(--color-text-muted, #64748b);">
                  Khuyến cáo phân loại huyết áp mới: Huyết áp tăng (Elevated BP 120-139/70-89) và đích huyết áp điều trị chặt chẽ hơn.
                </p>
              </div>
              <div class="pubmed-item-card" style="padding: 1rem; background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.5rem;">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.35rem;">
                  <span class="badge" style="background: #e0e7ff; color: #4338ca; font-size: 0.7rem; font-weight: 700; padding: 0.15rem 0.45rem; border-radius: 0.25rem;">GOLD 2025</span>
                  <span style="font-size: 0.75rem; color: var(--color-text-muted, #64748b);">Global Initiative for COPD</span>
                </div>
                <h4 style="margin: 0 0 0.35rem 0; font-size: 0.95rem; font-weight: 700; color: var(--color-text, #0f172a);">
                  Global Strategy for Prevention, Diagnosis and Management of COPD: 2025 Report
                </h4>
                <p style="margin: 0; font-size: 0.825rem; color: var(--color-text-muted, #64748b);">
                  Cập nhật chỉ định Liệu pháp Sinh học kháng IL-4R/IL-5 (Dupilumab) cho bệnh nhân COPD có tăng bạch cầu ái toan máu.
                </p>
              </div>
            </div>
          </section>

          <!-- 2. RECENT PRACTICE-CHANGING UPDATES WIDGET -->
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; gap: 1rem; margin-bottom: 1rem;">
              <h2 class="hub-section-title" style="margin: 0; font-size: 1.25rem; font-weight: 700;">📡 Cập Nhật Mới Nhất (Radar Feed)</h2>
            </div>

            <div id="yhcc-updates-content" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(min(280px, 100%), 1fr)); gap: 1rem;">
              <div class="update-card" style="padding: 1.25rem; background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.75rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                  <span style="font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: #dc2626; background: #fee2e2; padding: 0.15rem 0.45rem; border-radius: 0.25rem;">Practice Changing</span>
                  <span style="font-size: 0.75rem; color: var(--color-text-muted, #64748b);">Tháng 2/2026</span>
                </div>
                <h4 style="margin: 0 0 0.5rem 0; font-size: 0.95rem; font-weight: 700; color: var(--color-text, #0f172a);">SGLT2i trong Bệnh Thận Mạn (CKD)</h4>
                <p style="margin: 0; font-size: 0.825rem; color: var(--color-text-muted, #64748b); line-height: 1.4;">Khuyến cáo mức độ 1A về chỉ định SGLT2i cho bệnh nhân CKD không phụ thuộc tình trạng ĐTĐ để bảo vệ thận.</p>
              </div>
              <div class="update-card" style="padding: 1.25rem; background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.75rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                  <span style="font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: #0284c7; background: #e0f2fe; padding: 0.15rem 0.45rem; border-radius: 0.25rem;">Guideline Bộ Y Tế</span>
                  <span style="font-size: 0.75rem; color: var(--color-text-muted, #64748b);">2025</span>
                </div>
                <h4 style="margin: 0 0 0.5rem 0; font-size: 0.95rem; font-weight: 700; color: var(--color-text, #0f172a);">Hướng Dẫn Chẩn Đoán & Điều Trị Tăng Huyết Áp</h4>
                <p style="margin: 0; font-size: 0.825rem; color: var(--color-text-muted, #64748b); line-height: 1.4;">Cập nhật phác đồ phối hợp đôi sớm (Viên phối hợp cố định liều) ngay từ bước đầu điều trị THA Độ 1 có nguy cơ cao.</p>
              </div>
            </div>
          </div>

        </div>

        <!-- RIGHT COLUMN: DUAL STUDIO WIDGET (6S PYRAMID & 5AS WHEEL) -->
        <aside class="layout-widget-sidebar">
          
          <section class="widget-card" aria-labelledby="ebm-studio-title" style="padding: 1.25rem; background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.75rem;">
            <h3 id="ebm-studio-title" style="font-size: 1rem; font-weight: 700; margin: 0 0 1rem 0; color: var(--color-text, #0f172a); display: flex; align-items: center; gap: 0.5rem;">
              <i class="fa-solid fa-layer-group" style="color: var(--color-primary, #0284c7);"></i> Tháp Bằng Chứng 6S
            </h3>
            
            <div class="pyramid-levels" style="display: flex; flex-direction: column; gap: 0.4rem;">
              <div class="pyramid-level-pill pyramid-pill-l6">Systems (Hệ thống CDSS vi tính hóa)</div>
              <div class="pyramid-level-pill pyramid-pill-l5">Summaries (Khuyến cáo & Guidelines)</div>
              <div class="pyramid-level-pill pyramid-pill-l4">Synopses of Syntheses (Tóm tắt Meta)</div>
              <div class="pyramid-level-pill pyramid-pill-l3">Syntheses (Tổng quan hệ thống)</div>
              <div class="pyramid-level-pill pyramid-pill-l2">Synopses of Studies (Tóm tắt RCT đơn)</div>
              <div class="pyramid-level-pill pyramid-pill-l1">Studies (Nghiên cứu gốc gốc lẻ)</div>
            </div>
          </section>

          <section class="widget-card" style="padding: 1.25rem; background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.75rem;">
            <h3 style="font-size: 1rem; font-weight: 700; margin: 0 0 0.75rem 0; color: var(--color-text, #0f172a); display: flex; align-items: center; gap: 0.5rem;">
              <i class="fa-solid fa-rotate" style="color: #10b981;"></i> Chu Trình 5As trong EBM
            </h3>
            <ol style="margin: 0; padding-left: 1.25rem; font-size: 0.8rem; color: var(--color-text-muted, #64748b); line-height: 1.6;">
              <li><strong style="color: var(--color-text, #0f172a);">Ask</strong>: Đặt câu hỏi lâm sàng PICO</li>
              <li><strong style="color: var(--color-text, #0f172a);">Acquire</strong>: Tìm kiếm y văn tốt nhất</li>
              <li><strong style="color: var(--color-text, #0f172a);">Appraise</strong>: Thẩm định giá trị nghiên cứu</li>
              <li><strong style="color: var(--color-text, #0f172a);">Apply</strong>: Ứng dụng cho người bệnh</li>
              <li><strong style="color: var(--color-text, #0f172a);">Assess</strong>: Đánh giá hiệu quả thực hành</li>
            </ol>
          </section>

        </aside>

      </div>

    </div>
  `;
}
