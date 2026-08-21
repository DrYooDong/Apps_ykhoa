/**
 * CliniPortal — Epidemiology & Biostatistics (Dịch Tễ Học Y Khoa) SPA View
 * Path: src/content/pathophysiology/epidemiology-view.ts
 * Visual Identity: Public Health Surveillance Dashboard, Interactive 2x2 Matrix Solver, Epicurve Studio & Study Design Comparator
 */

import '../../../../css/components/module-dashboard.css';
import '../../../../css/components/physio-content.css';
import '../../../../css/components/formula-vault.css';
import '../../../../css/components/physio-promax-hub.css';
import '../../../../css/components/epidemiology-hub.css';
import { 
  EPIDEMIOLOGY_BLOCKS, 
  EPIDEMIOLOGY_TOPICS, 
  STUDY_DESIGNS_DATA, 
  OUTBREAK_PATTERNS, 
  BRADFORD_HILL_CRITERIA 
} from '../data/epidemiology-data';

export function renderEpidemiologyView(): string {
  return `
    <div class="promax-wrapper" id="mainContent">

      <!-- BREADCRUMB -->
      <div class="breadcrumb" style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 1.25rem;">
        <a href="#/" style="color: inherit; text-decoration: none;">🏠 Trang chủ</a> &nbsp;/&nbsp; 
        <a href="#/basic-medical" style="color: inherit; text-decoration: none;">Basic Medical Sciences</a> &nbsp;/&nbsp; 
        <span style="color: #0d9488; font-weight: 600;">Dịch Tễ Học Y Khoa & Thống Kê Sinh Học (Epidemiology)</span>
      </div>

      <!-- PROMAX LUXURY HERO SECTION (SURVEILLANCE THEME) -->
      <section class="promax-hero hero-epi-theme" aria-labelledby="hero-title">
        <div class="promax-hero-grid">
          <div>
            <div class="epi-badge-pulse">
              <span class="pulse-dot" style="background: #2dd4bf;"></span>
              <span>Epidemiological Surveillance & Evidence-Based Public Health • CDC & WHO Standards</span>
            </div>
            <h1 id="hero-title" class="promax-hero-title">
              🦠 DỊCH TỄ HỌC & Y TẾ CÔNG CỘNG
            </h1>
            <p class="promax-hero-desc">
              Hệ thống hóa phương pháp luận dịch tễ học, thiết kế nghiên cứu quan sát và can thiệp, đo lường nguy cơ (RR, OR, AR), đánh giá test chẩn đoán (Se, Sp, PPV, NPV, LR) và kỹ năng điều tra dập dịch thực địa.
            </p>

            <!-- KPI Metric Bar -->
            <div class="promax-kpi-bar">
              <div class="promax-kpi-pill">
                <i class="fa-solid fa-chart-pie" style="font-size: 1.1rem; color: #2dd4bf;"></i>
                <div>
                  <div class="promax-kpi-num">6 Khối</div>
                  <div class="promax-kpi-lbl">Chuyên Đề Cốt Lõi</div>
                </div>
              </div>
              <div class="promax-kpi-pill">
                <i class="fa-solid fa-calculator" style="font-size: 1.1rem; color: #38bdf8;"></i>
                <div>
                  <div class="promax-kpi-num">2×2 Solver</div>
                  <div class="promax-kpi-lbl">Bộ Giải Ma Trận Tức Thì</div>
                </div>
              </div>
              <div class="promax-kpi-pill">
                <i class="fa-solid fa-chart-area" style="font-size: 1.1rem; color: #fbbf24;"></i>
                <div>
                  <div class="promax-kpi-num">Epicurve</div>
                  <div class="promax-kpi-lbl">Mô Phỏng Đường Cong Dịch</div>
                </div>
              </div>
              <div class="promax-kpi-pill">
                <i class="fa-solid fa-scale-balanced" style="font-size: 1.1rem; color: #a78bfa;"></i>
                <div>
                  <div class="promax-kpi-num">9 Chuẩn</div>
                  <div class="promax-kpi-lbl">Bradford Hill Nhân Quả</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Hero Vector Artwork (Radar & Outbreak Curve) -->
          <div class="tcm-hero-decor" style="display: flex; align-items: center; justify-content: center;">
            <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 140px; height: 140px; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.3));">
              <circle cx="60" cy="60" r="50" stroke="rgba(45, 212, 191, 0.25)" stroke-width="2" stroke-dasharray="4 4"/>
              <circle cx="60" cy="60" r="32" stroke="rgba(45, 212, 191, 0.4)" stroke-width="2"/>
              <circle cx="60" cy="60" r="16" stroke="#2dd4bf" stroke-width="2"/>
              <!-- Crosshairs -->
              <line x1="60" y1="5" x2="60" y2="115" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
              <line x1="5" y1="60" x2="115" y2="60" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
              <!-- Outbreak Epicurve Line -->
              <path d="M15 95 Q 40 90, 50 40 T 75 75 T 105 95" stroke="#fbbf24" stroke-width="3.5" fill="none" stroke-linecap="round"/>
              <circle cx="50" cy="40" r="5.5" fill="#ef4444" stroke="#ffffff" stroke-width="2"/>
              <circle cx="75" cy="75" r="4.5" fill="#fbbf24" stroke="#ffffff" stroke-width="1.5"/>
              <circle cx="28" cy="92" r="3.5" fill="#2dd4bf"/>
              <circle cx="95" cy="90" r="3.5" fill="#2dd4bf"/>
            </svg>
          </div>
        </div>
      </section>

      <!-- PROMAX BENTO ACTION GRID (4 CÔNG CỤ DỊCH TỄ TƯƠNG TÁC CAO CẤP) -->
      <section class="promax-bento-grid">
        <a href="#matrix-solver-section" class="promax-bento-card" style="--bento-color: #0d9488; --bento-bg: rgba(13, 148, 136, 0.1);">
          <div class="promax-bento-icon"><i class="fa-solid fa-table-cells"></i></div>
          <div>
            <span class="promax-bento-tag">Interactive Analytics</span>
            <h4 class="promax-bento-title">Bộ Giải Ma Trận 2×2</h4>
            <p class="promax-bento-desc">Tính tức thì RR, OR, AR, PAF, Se, Sp, PPV, NPV, LR+, LR- & NNT/NNH.</p>
          </div>
        </a>

        <a href="#epicurve-section" class="promax-bento-card" style="--bento-color: #f59e0b; --bento-bg: rgba(245, 158, 11, 0.1);">
          <div class="promax-bento-icon"><i class="fa-solid fa-chart-area"></i></div>
          <div>
            <span class="promax-bento-tag">Outbreak Simulator</span>
            <h4 class="promax-bento-title">Đường Cong Dịch Tễ (Epicurve)</h4>
            <p class="promax-bento-desc">Phân biệt Ổ dịch điểm, Nguồn liên tục và Lan tỏa người sang người.</p>
          </div>
        </a>

        <a href="#study-designs-section" class="promax-bento-card" style="--bento-color: #3b82f6; --bento-bg: rgba(59, 130, 246, 0.1);">
          <div class="promax-bento-icon"><i class="fa-solid fa-sitemap"></i></div>
          <div>
            <span class="promax-bento-tag">Design Comparator</span>
            <h4 class="promax-bento-title">Ma Trận Thiết Kế Nghiên Cứu</h4>
            <p class="promax-bento-desc">So sánh RCT, Cohort, Case-Control, Cross-Sectional & Ecological.</p>
          </div>
        </a>

        <a href="#bradford-hill-section" class="promax-bento-card" style="--bento-color: #8b5cf6; --bento-bg: rgba(139, 92, 246, 0.1);">
          <div class="promax-bento-icon"><i class="fa-solid fa-scale-balanced"></i></div>
          <div>
            <span class="promax-bento-tag">Causality Framework</span>
            <h4 class="promax-bento-title">9 Tiêu Chuẩn Bradford Hill</h4>
            <p class="promax-bento-desc">Bộ khung thẩm định mối quan hệ Nhân - Quả y học chuẩn mực.</p>
          </div>
        </a>
      </section>

      <!-- ==========================================================================
           INTERACTIVE 2x2 CONTINGENCY MATRIX SOLVER STUDIO
           ========================================================================== -->
      <section id="matrix-solver-section" class="epi-matrix-studio" aria-labelledby="matrix-title">
        <div class="epi-matrix-header">
          <h2 id="matrix-title" class="epi-matrix-title">
            <i class="fa-solid fa-calculator" style="color: #0d9488;"></i>
            <span>Bộ Tính Toán Ma Trận 2×2 Dịch Tễ Học (Contingency Solver)</span>
          </h2>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <button type="button" class="btn-glass-action" id="btnPresetCohort" style="font-size: 0.75rem;">
              <i class="fa-solid fa-smoking"></i> Ví dụ Cohort (Hút thuốc & K phổi)
            </button>
            <button type="button" class="btn-glass-action" id="btnPresetScreening" style="font-size: 0.75rem;">
              <i class="fa-solid fa-vial-virus"></i> Ví dụ Test Sàng Lọc
            </button>
            <button type="button" class="btn-glass-action" id="btnResetMatrix" style="font-size: 0.75rem; color: #ef4444;">
              <i class="fa-solid fa-rotate-left"></i> Đặt lại
            </button>
          </div>
        </div>

        <div class="epi-matrix-grid-layout">
          <!-- Left: Table 2x2 Input -->
          <div class="contingency-table-wrapper">
            <table class="table-2x2">
              <thead>
                <tr>
                  <th></th>
                  <th style="color: #ef4444;">Bệnh (+) / Biến cố</th>
                  <th style="color: #10b981;">Không Bệnh (-)</th>
                  <th style="color: #0d9488;">Tổng Hàng</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th style="text-align: left; color: #ef4444;">Phơi nhiễm (+) / Test (+)</th>
                  <td>
                    <div class="cell-input-box">
                      <label>a (TP / Exposed Sick)</label>
                      <input type="number" id="cellA" value="70" min="0">
                    </div>
                  </td>
                  <td>
                    <div class="cell-input-box">
                      <label>b (FP / Exposed Well)</label>
                      <input type="number" id="cellB" value="30" min="0">
                    </div>
                  </td>
                  <td>
                    <div class="cell-total" id="row1Total">100</div>
                  </td>
                </tr>
                <tr>
                  <th style="text-align: left; color: #10b981;">Không Phơi nhiễm (-) / Test (-)</th>
                  <td>
                    <div class="cell-input-box">
                      <label>c (FN / Unexposed Sick)</label>
                      <input type="number" id="cellC" value="20" min="0">
                    </div>
                  </td>
                  <td>
                    <div class="cell-input-box">
                      <label>d (TN / Unexposed Well)</label>
                      <input type="number" id="cellD" value="80" min="0">
                    </div>
                  </td>
                  <td>
                    <div class="cell-total" id="row2Total">100</div>
                  </td>
                </tr>
                <tr>
                  <th style="text-align: left; color: #0d9488;">Tổng Cột</th>
                  <td>
                    <div class="cell-total" id="col1Total">90</div>
                  </td>
                  <td>
                    <div class="cell-total" id="col2Total">110</div>
                  </td>
                  <td>
                    <div class="cell-total" id="grandTotal" style="background: rgba(13, 148, 136, 0.2); font-weight: 800;">200</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Right: Live Result Analytics -->
          <div class="matrix-results-panel">
            <div class="results-metric-grid">
              <div class="metric-result-card highlight">
                <div class="metric-label">Relative Risk (RR)</div>
                <div class="metric-value" id="valRR">3.50</div>
                <div class="metric-sub" id="subRR">95% CI [2.28 - 5.37]</div>
              </div>

              <div class="metric-result-card highlight">
                <div class="metric-label">Odds Ratio (OR)</div>
                <div class="metric-value" id="valOR">9.33</div>
                <div class="metric-sub" id="subOR">95% CI [4.74 - 18.37]</div>
              </div>

              <div class="metric-result-card">
                <div class="metric-label">Attributable Risk (AR)</div>
                <div class="metric-value" id="valAR">50.0%</div>
                <div class="metric-sub">Nguy cơ quy thuộc</div>
              </div>

              <div class="metric-result-card">
                <div class="metric-label">NNH / NNT</div>
                <div class="metric-value" id="valNNT">2.0</div>
                <div class="metric-sub">1 / AR</div>
              </div>

              <div class="metric-result-card">
                <div class="metric-label">Độ nhạy (Se)</div>
                <div class="metric-value" id="valSe" style="color: #3b82f6;">77.8%</div>
                <div class="metric-sub">TP / (TP + FN)</div>
              </div>

              <div class="metric-result-card">
                <div class="metric-label">Độ đặc hiệu (Sp)</div>
                <div class="metric-value" id="valSp" style="color: #3b82f6;">72.7%</div>
                <div class="metric-sub">TN / (TN + FP)</div>
              </div>

              <div class="metric-result-card">
                <div class="metric-label">PPV</div>
                <div class="metric-value" id="valPPV" style="color: #8b5cf6;">70.0%</div>
                <div class="metric-sub">Giá trị tiên đoán dương</div>
              </div>

              <div class="metric-result-card">
                <div class="metric-label">NPV</div>
                <div class="metric-value" id="valNPV" style="color: #8b5cf6;">80.0%</div>
                <div class="metric-sub">Giá trị tiên đoán âm</div>
              </div>

              <div class="metric-result-card">
                <div class="metric-label">LR+</div>
                <div class="metric-value" id="valLRPlus" style="color: #f59e0b;">2.85</div>
                <div class="metric-sub">Se / (1 - Sp)</div>
              </div>

              <div class="metric-result-card">
                <div class="metric-label">LR-</div>
                <div class="metric-value" id="valLRMinus" style="color: #f59e0b;">0.31</div>
                <div class="metric-sub">(1 - Se) / Sp</div>
              </div>
            </div>

            <!-- Dynamic Clinical Interpretation Text -->
            <div class="metric-interpretation-box" id="matrixInterpretation">
              💡 <strong>Biện Luận Lâm Sàng:</strong> Nhóm có phơi nhiễm có nguy cơ mắc bệnh cao gấp <strong>3.50 lần</strong> so với nhóm không phơi nhiễm ($RR = 3.50$). Số chênh phơi nhiễm ở nhóm bệnh cao gấp <strong>9.33 lần</strong> so với nhóm chứng ($OR = 9.33$). Khoảng <strong>50%</strong> số ca bệnh trong nhóm phơi nhiễm có thể quy cho yếu tố phơi nhiễm này.
            </div>
          </div>
        </div>
      </section>

      <!-- ==========================================================================
           EPICURVE OUTBREAK SIMULATOR STUDIO
           ========================================================================== -->
      <section id="epicurve-section" class="epicurve-studio-container" aria-labelledby="epicurve-title">
        <div class="epi-matrix-header">
          <h2 id="epicurve-title" class="epi-matrix-title">
            <i class="fa-solid fa-chart-area" style="color: #f59e0b;"></i>
            <span>Đường Cong Dịch Tễ & Phân Tích Ổ Dịch (Epicurve Studio)</span>
          </h2>
          <div class="epicurve-nav-tabs">
            <button type="button" class="epicurve-tab-btn active" data-curve="point-source">
              1. Nguồn Chung Điểm (Point Source)
            </button>
            <button type="button" class="epicurve-tab-btn" data-curve="continuous-source">
              2. Nguồn Chung Liên Tục (Continuous)
            </button>
            <button type="button" class="epicurve-tab-btn" data-curve="propagated">
              3. Lây Lan Tỏa Người-Người (Propagated)
            </button>
          </div>
        </div>

        <div class="epicurve-canvas-box" id="epicurveCanvasContainer">
          <!-- Render SVG Canvas dynamically via initEpidemiologyView -->
        </div>

        <div id="epicurveInfoBox" style="margin-top: 1rem; padding: 1rem; background: var(--color-bg); border-radius: 10px; border: 1px solid var(--color-border); font-size: 0.875rem;">
          <!-- Description dynamically populated -->
        </div>
      </section>

      <!-- ==========================================================================
           STUDY DESIGN COMPARATOR MATRIX
           ========================================================================== -->
      <section id="study-designs-section" aria-labelledby="designs-heading" style="margin-bottom: 2.5rem;">
        <div class="physio-group-header" style="background: linear-gradient(90deg, rgba(59,130,246,0.1) 0%, transparent 100%); border-left: 4px solid #3b82f6; padding: 0.75rem 1rem; border-radius: 8px; margin-bottom: 1rem;">
          <span class="physio-group-icon" style="background: rgba(59,130,246,0.15); color: #3b82f6;"><i class="fa-solid fa-sitemap"></i></span>
          <div>
            <h3 id="designs-heading" style="margin: 0; color: #2563eb; font-size: 1.2rem; font-weight: 700;">Ma Trận So Sánh Các Loại Hình Thiết Kế Nghiên Cứu</h3>
            <p style="margin: 0.2rem 0 0 0; font-size: 0.85rem; color: var(--color-text-muted);">Đối chiếu đơn vị phân tích, hướng tiếp cận thời gian, thước đo nguy cơ và nguy cơ sai số.</p>
          </div>
        </div>

        <div class="study-design-table-wrap">
          <table class="study-design-table">
            <thead>
              <tr>
                <th>Thiết Kế Nghiên Cứu</th>
                <th>Phân Loại</th>
                <th>Chiều Thời Gian</th>
                <th>Thước Đo Nguy Cơ</th>
                <th>Ưu Điểm Nổi Bật</th>
                <th>Hạn Chế & Sai Số (Bias)</th>
              </tr>
            </thead>
            <tbody>
              ${STUDY_DESIGNS_DATA.map(d => `
                <tr>
                  <td>
                    <strong>${d.name}</strong><br>
                    <span style="font-size: 0.75rem; color: var(--color-text-muted); font-style: italic;">${d.englishName}</span>
                  </td>
                  <td>
                    <span class="design-type-badge ${d.type.includes('Can thiệp') ? 'badge-experimental' : d.type.includes('Phân tích') ? 'badge-analytic' : 'badge-descriptive'}">
                      ${d.type}
                    </span>
                  </td>
                  <td>${d.direction}</td>
                  <td><strong style="color: var(--color-primary);">${d.primaryMeasure}</strong></td>
                  <td>
                    <ul style="margin: 0; padding-left: 1rem; font-size: 0.8rem; line-height: 1.4;">
                      ${d.strengths.slice(0, 2).map(s => `<li>${s}</li>`).join('')}
                    </ul>
                  </td>
                  <td>
                    <span style="font-size: 0.75rem; font-weight: 700; color: #ef4444;">Nguy cơ: ${d.biasRisk}</span>
                    <ul style="margin: 0.25rem 0 0 0; padding-left: 1rem; font-size: 0.8rem; line-height: 1.4; color: var(--color-text-muted);">
                      ${d.limitations.slice(0, 2).map(l => `<li>${l}</li>`).join('')}
                    </ul>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </section>

      <!-- ==========================================================================
           BRADFORD HILL 9 CAUSALITY CRITERIA
           ========================================================================== -->
      <section id="bradford-hill-section" aria-labelledby="bradford-heading" style="margin-bottom: 2.5rem;">
        <div class="physio-group-header" style="background: linear-gradient(90deg, rgba(139,92,246,0.1) 0%, transparent 100%); border-left: 4px solid #8b5cf6; padding: 0.75rem 1rem; border-radius: 8px; margin-bottom: 1rem;">
          <span class="physio-group-icon" style="background: rgba(139,92,246,0.15); color: #8b5cf6;"><i class="fa-solid fa-scale-balanced"></i></span>
          <div>
            <h3 id="bradford-heading" style="margin: 0; color: #7c3aed; font-size: 1.2rem; font-weight: 700;">9 Tiêu Chuẩn Xác Lập Mối Quan Hệ Nhân - Quả (Sir Austin Bradford Hill, 1965)</h3>
            <p style="margin: 0.2rem 0 0 0; font-size: 0.85rem; color: var(--color-text-muted);">Bộ khung tiêu chuẩn dịch tễ học kinh điển để chứng minh mối liên quan thống kê có phải là nguyên nhân thực sự hay không.</p>
          </div>
        </div>

        <div class="bradford-grid">
          ${BRADFORD_HILL_CRITERIA.map(c => `
            <div class="bradford-card ${c.id === 'temporality' ? 'required-step' : ''}">
              <div class="bradford-num">${c.number}</div>
              <div class="bradford-body">
                <h4>
                  ${c.name}
                  ${c.id === 'temporality' ? '<span style="font-size: 0.7rem; background: rgba(239,68,68,0.15); color: #ef4444; padding: 0.1rem 0.4rem; border-radius: 4px; margin-left: 0.3rem;">BẮT BUỘC</span>' : ''}
                </h4>
                <p>${c.description}</p>
                <div style="margin-top: 0.5rem; font-size: 0.75rem; color: #0d9488; font-style: italic;">
                  <strong>Ví dụ:</strong> ${c.classicExample}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- ==========================================================================
           TOOLBAR & SEARCH
           ========================================================================== -->
      <div class="promax-toolbar">
        <div class="promax-search-wrap">
          <i class="fa-solid fa-magnifying-glass promax-search-icon"></i>
          <input type="text" id="lesson-search" class="promax-search-input" placeholder="Tìm kiếm bài học dịch tễ (RR, OR, R0, Herd immunity, Se/Sp, Bradford Hill, Bias, Confounding...)..." aria-label="Tìm kiếm chuyên đề dịch tễ học">
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

      <!-- ==========================================================================
           DASHBOARD LAYOUT (STICKY BLOCK-NAV & TOPIC CARDS)
           ========================================================================== -->
      <div class="dashboard-layout">
        <!-- Navigation Sidebar (Sticky) -->
        <aside class="layout-nav-sidebar" aria-label="Danh mục khối dịch tễ học">
          <div class="nav-sidebar-sticky" id="physio-nav">
            <h4 class="nav-sidebar-title">Khối Dịch Tễ Học</h4>
            <ul class="part-nav-list">
              ${EPIDEMIOLOGY_BLOCKS.map((b, idx) => `
                <li>
                  <a href="#${b.id}-section" class="part-nav-item p${idx + 1} ${idx === 0 ? 'active' : ''}" data-target="${b.id}-section">
                    <span class="part-icon"><i class="fa-solid ${b.icon}"></i></span>
                    <span class="part-text">${b.code}. ${b.name.replace(/^Khối \d+:\s*/, '')}</span>
                    <span class="part-count-badge">${EPIDEMIOLOGY_TOPICS.filter(t => t.blockId === b.id).length}</span>
                  </a>
                </li>
              `).join('')}
            </ul>
          </div>
        </aside>

        <!-- Main Content Area -->
        <main class="layout-content-area" id="lessons-container">
          <!-- Empty Search State -->
          <div id="empty-search-state" class="empty-search-state" style="display: none;">
            <div class="empty-search-icon">🔍</div>
            <h3>Không tìm thấy chuyên đề dịch tễ học nào</h3>
            <p>Vui lòng thử từ khóa khác (ví dụ: RR, OR, R0, Se, Sp, PPV, Confounding, Bias, Bradford Hill...).</p>
          </div>

          <!-- 6 BLOCKS SECTIONS -->
          ${EPIDEMIOLOGY_BLOCKS.map(block => {
            const blockTopics = EPIDEMIOLOGY_TOPICS.filter(t => t.blockId === block.id);

            return `
              <section id="${block.id}-section" aria-labelledby="${block.id}-heading" style="margin-bottom: 2rem;">
                <div class="physio-group-container">
                  <div class="physio-group-header">
                    <span class="physio-group-icon" style="color: ${block.color}; background: ${block.bgColor};">
                      <i class="fa-solid ${block.icon}"></i>
                    </span>
                    <div>
                      <h3 id="${block.id}-heading">${block.code}. ${block.name}</h3>
                      <p style="margin: 0.15rem 0 0 0; font-size: 0.85rem; color: var(--color-text-muted, #64748b); font-weight: normal;">${block.description}</p>
                    </div>
                  </div>

                  <div class="specialty-grid">
                    ${blockTopics.map(topic => `
                      <div class="specialty-card" data-topic-id="${topic.id}" style="cursor: pointer;" onclick="window.EpiHub?.openQuickPreview('${topic.id}')">
                        <div class="specialty-card-top">
                          <div class="specialty-icon" style="background: ${block.bgColor}; color: ${block.color};">
                            <i class="fa-solid ${block.icon}"></i>
                          </div>
                          <div class="specialty-info">
                            <div style="display: flex; align-items: center; gap: 0.4rem; margin-bottom: 0.25rem;">
                              <span style="font-size: 0.72rem; font-weight: 700; background: var(--color-bg, #f1f5f9); color: #0d9488; padding: 0.1rem 0.4rem; border-radius: 4px;">${topic.code}</span>
                              <span style="font-size: 0.72rem; color: var(--color-text-muted, #64748b);"><i class="fa-solid fa-gem" style="color: #0d9488; font-size: 0.65rem;"></i> ${topic.clinicalPearls.length} Pearls</span>
                            </div>
                            <h3>${topic.title}</h3>
                            <p>${topic.overview}</p>
                            <div style="display: flex; flex-wrap: wrap; gap: 0.3rem; margin-top: 0.4rem;">
                              ${topic.tags.slice(0, 3).map(tag => `<span style="font-size: 0.7rem; background: var(--color-bg, #f8fafc); border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text-muted, #64748b); padding: 0.05rem 0.35rem; border-radius: 3px;">#${tag}</span>`).join('')}
                            </div>
                          </div>
                        </div>
                        <div class="specialty-card-action" style="color: #0d9488;">
                          <span>Xem chi tiết & Công thức</span>
                          <i class="fa-solid fa-chevron-right"></i>
                        </div>
                      </div>
                    `).join('')}
                  </div>
                </div>
              </section>
            `;
          }).join('')}
        </main>
      </div>

    </div>

    <!-- QUICK PREVIEW MODAL / DRAWER -->
    <div class="biochem-modal-backdrop" id="epiModalBackdrop">
      <div class="biochem-modal" id="epiModalContainer" role="dialog" aria-modal="true"></div>
    </div>
  `;
}

export function initEpidemiologyView(): void {
  // 1. Matrix 2x2 Solver Elements & Calculation
  const cellA = document.getElementById('cellA') as HTMLInputElement | null;
  const cellB = document.getElementById('cellB') as HTMLInputElement | null;
  const cellC = document.getElementById('cellC') as HTMLInputElement | null;
  const cellD = document.getElementById('cellD') as HTMLInputElement | null;

  const row1Total = document.getElementById('row1Total');
  const row2Total = document.getElementById('row2Total');
  const col1Total = document.getElementById('col1Total');
  const col2Total = document.getElementById('col2Total');
  const grandTotal = document.getElementById('grandTotal');

  const valRR = document.getElementById('valRR');
  const subRR = document.getElementById('subRR');
  const valOR = document.getElementById('valOR');
  const subOR = document.getElementById('subOR');
  const valAR = document.getElementById('valAR');
  const valNNT = document.getElementById('valNNT');
  const valSe = document.getElementById('valSe');
  const valSp = document.getElementById('valSp');
  const valPPV = document.getElementById('valPPV');
  const valNPV = document.getElementById('valNPV');
  const valLRPlus = document.getElementById('valLRPlus');
  const valLRMinus = document.getElementById('valLRMinus');
  const matrixInterpretation = document.getElementById('matrixInterpretation');

  function calculateMatrix(): void {
    const a = Math.max(0, parseFloat(cellA?.value || '0'));
    const b = Math.max(0, parseFloat(cellB?.value || '0'));
    const c = Math.max(0, parseFloat(cellC?.value || '0'));
    const d = Math.max(0, parseFloat(cellD?.value || '0'));

    const r1 = a + b;
    const r2 = c + d;
    const c1 = a + c;
    const c2 = b + d;
    const n = r1 + r2;

    if (row1Total) row1Total.textContent = r1.toLocaleString();
    if (row2Total) row2Total.textContent = r2.toLocaleString();
    if (col1Total) col1Total.textContent = c1.toLocaleString();
    if (col2Total) col2Total.textContent = c2.toLocaleString();
    if (grandTotal) grandTotal.textContent = n.toLocaleString();

    // Rates
    const eer = r1 > 0 ? a / r1 : 0;
    const cer = r2 > 0 ? c / r2 : 0;

    // RR
    const rr = cer > 0 ? eer / cer : 0;
    const lnRR = rr > 0 ? Math.log(rr) : 0;
    const seLnRR = (a > 0 && c > 0 && r1 > 0 && r2 > 0) ? Math.sqrt((1/a - 1/r1) + (1/c - 1/r2)) : 0;
    const rrCiLow = seLnRR > 0 ? Math.exp(lnRR - 1.96 * seLnRR) : 0;
    const rrCiHigh = seLnRR > 0 ? Math.exp(lnRR + 1.96 * seLnRR) : 0;

    // OR
    const orVal = (b * c > 0) ? (a * d) / (b * c) : 0;
    const lnOR = orVal > 0 ? Math.log(orVal) : 0;
    const seLnOR = (a > 0 && b > 0 && c > 0 && d > 0) ? Math.sqrt(1/a + 1/b + 1/c + 1/d) : 0;
    const orCiLow = seLnOR > 0 ? Math.exp(lnOR - 1.96 * seLnOR) : 0;
    const orCiHigh = seLnOR > 0 ? Math.exp(lnOR + 1.96 * seLnOR) : 0;

    // AR (Risk Difference)
    const arVal = (eer - cer) * 100;
    const nntVal = arVal !== 0 ? Math.abs(100 / arVal) : 0;

    // Diagnostic metrics
    const se = c1 > 0 ? (a / c1) * 100 : 0;
    const sp = c2 > 0 ? (d / c2) * 100 : 0;
    const ppv = r1 > 0 ? (a / r1) * 100 : 0;
    const npv = r2 > 0 ? (d / r2) * 100 : 0;

    // Likelihood ratios
    const lrPlus = (100 - sp > 0) ? (se / (100 - sp)) : 0;
    const lrMinus = (sp > 0) ? ((100 - se) / sp) : 0;

    if (valRR) valRR.textContent = rr > 0 ? rr.toFixed(2) : '--';
    if (subRR) subRR.textContent = seLnRR > 0 ? `95% CI [${rrCiLow.toFixed(2)} - ${rrCiHigh.toFixed(2)}]` : '--';
    if (valOR) valOR.textContent = orVal > 0 ? orVal.toFixed(2) : '--';
    if (subOR) subOR.textContent = seLnOR > 0 ? `95% CI [${orCiLow.toFixed(2)} - ${orCiHigh.toFixed(2)}]` : '--';
    if (valAR) valAR.textContent = `${arVal.toFixed(1)}%`;
    if (valNNT) valNNT.textContent = nntVal > 0 ? nntVal.toFixed(1) : '--';

    if (valSe) valSe.textContent = `${se.toFixed(1)}%`;
    if (valSp) valSp.textContent = `${sp.toFixed(1)}%`;
    if (valPPV) valPPV.textContent = `${ppv.toFixed(1)}%`;
    if (valNPV) valNPV.textContent = `${npv.toFixed(1)}%`;
    if (valLRPlus) valLRPlus.textContent = lrPlus > 0 ? lrPlus.toFixed(2) : '--';
    if (valLRMinus) valLRMinus.textContent = lrMinus > 0 ? lrMinus.toFixed(2) : '--';

    if (matrixInterpretation) {
      matrixInterpretation.innerHTML = `
        💡 <strong>Biện Luận Lâm Sàng:</strong> Nhóm phơi nhiễm có nguy cơ mắc bệnh gấp <strong>${rr > 0 ? rr.toFixed(2) : '--'} lần</strong> nhóm không phơi nhiễm ($RR = ${rr > 0 ? rr.toFixed(2) : '--'}$). Số chênh phơi nhiễm ở nhóm bệnh gấp <strong>${orVal > 0 ? orVal.toFixed(2) : '--'} lần</strong> nhóm chứng ($OR = ${orVal > 0 ? orVal.toFixed(2) : '--'}$). Độ nhạy xét nghiệm là <strong>${se.toFixed(1)}%</strong>, Độ đặc hiệu là <strong>${sp.toFixed(1)}%</strong>.
      `;
    }
  }

  [cellA, cellB, cellC, cellD].forEach(inp => {
    inp?.addEventListener('input', calculateMatrix);
  });

  document.getElementById('btnPresetCohort')?.addEventListener('click', () => {
    if (cellA) cellA.value = '70';
    if (cellB) cellB.value = '30';
    if (cellC) cellC.value = '20';
    if (cellD) cellD.value = '80';
    calculateMatrix();
  });

  document.getElementById('btnPresetScreening')?.addEventListener('click', () => {
    if (cellA) cellA.value = '95';
    if (cellB) cellB.value = '50';
    if (cellC) cellC.value = '5';
    if (cellD) cellD.value = '850';
    calculateMatrix();
  });

  document.getElementById('btnResetMatrix')?.addEventListener('click', () => {
    if (cellA) cellA.value = '0';
    if (cellB) cellB.value = '0';
    if (cellC) cellC.value = '0';
    if (cellD) cellD.value = '0';
    calculateMatrix();
  });

  // Calculate initially
  calculateMatrix();

  // 2. Epicurve Studio Switcher
  const canvasContainer = document.getElementById('epicurveCanvasContainer');
  const epicurveInfoBox = document.getElementById('epicurveInfoBox');
  const curveTabBtns = document.querySelectorAll('.epicurve-tab-btn');

  function renderEpicurve(type: 'point-source' | 'continuous-source' | 'propagated'): void {
    const pattern = OUTBREAK_PATTERNS.find(p => p.id === type) || OUTBREAK_PATTERNS[0];

    let svgContent = '';
    if (type === 'point-source') {
      svgContent = `
        <svg viewBox="0 0 500 180" width="100%" height="180" style="overflow: visible;">
          <!-- Axis -->
          <line x1="40" y1="150" x2="480" y2="150" stroke="var(--color-border)" stroke-width="2"/>
          <line x1="40" y1="20" x2="40" y2="150" stroke="var(--color-border)" stroke-width="2"/>
          <!-- Histogram Bars -->
          <rect x="70" y="140" width="22" height="10" fill="#0d9488" rx="3" opacity="0.6"/>
          <rect x="96" y="115" width="22" height="35" fill="#0d9488" rx="3" opacity="0.75"/>
          <rect x="122" y="60" width="22" height="90" fill="#ef4444" rx="3"/>
          <rect x="148" y="30" width="22" height="120" fill="#ef4444" rx="3"/>
          <rect x="174" y="50" width="22" height="100" fill="#0d9488" rx="3" opacity="0.9"/>
          <rect x="200" y="90" width="22" height="60" fill="#0d9488" rx="3" opacity="0.75"/>
          <rect x="226" y="125" width="22" height="25" fill="#0d9488" rx="3" opacity="0.6"/>
          <rect x="252" y="140" width="22" height="10" fill="#0d9488" rx="3" opacity="0.4"/>
          <!-- Exposure Arrow -->
          <path d="M 50 170 L 50 155" stroke="#ef4444" stroke-width="2.5" marker-end="url(#arrow)"/>
          <text x="50" y="178" font-size="10" fill="#ef4444" text-anchor="middle" font-weight="bold">Phơi nhiễm điểm</text>
          <!-- Peak label -->
          <text x="160" y="20" font-size="11" fill="#ef4444" text-anchor="middle" font-weight="bold">Đỉnh dịch đơn độc (Peak)</text>
          <text x="260" y="170" font-size="11" fill="var(--color-text-muted)" text-anchor="middle">Thời gian (Giờ/Ngày sau phơi nhiễm)</text>
        </svg>
      `;
    } else if (type === 'continuous-source') {
      svgContent = `
        <svg viewBox="0 0 500 180" width="100%" height="180" style="overflow: visible;">
          <!-- Axis -->
          <line x1="40" y1="150" x2="480" y2="150" stroke="var(--color-border)" stroke-width="2"/>
          <line x1="40" y1="20" x2="40" y2="150" stroke="var(--color-border)" stroke-width="2"/>
          <!-- Plateau Bars -->
          <rect x="60" y="130" width="20" height="20" fill="#3b82f6" rx="3" opacity="0.6"/>
          <rect x="84" y="90" width="20" height="60" fill="#3b82f6" rx="3" opacity="0.8"/>
          <rect x="108" y="55" width="20" height="95" fill="#f59e0b" rx="3"/>
          <rect x="132" y="50" width="20" height="100" fill="#f59e0b" rx="3"/>
          <rect x="156" y="52" width="20" height="98" fill="#f59e0b" rx="3"/>
          <rect x="180" y="48" width="20" height="102" fill="#f59e0b" rx="3"/>
          <rect x="204" y="50" width="20" height="100" fill="#f59e0b" rx="3"/>
          <rect x="228" y="55" width="20" height="95" fill="#f59e0b" rx="3"/>
          <rect x="252" y="85" width="20" height="65" fill="#3b82f6" rx="3" opacity="0.8"/>
          <rect x="276" y="125" width="20" height="25" fill="#3b82f6" rx="3" opacity="0.6"/>
          <!-- Plateau Label -->
          <line x1="108" y1="40" x2="248" y2="40" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4 3"/>
          <text x="178" y="32" font-size="11" fill="#f59e0b" text-anchor="middle" font-weight="bold">Đỉnh kéo dài dạng Cao nguyên (Plateau)</text>
          <text x="260" y="170" font-size="11" fill="var(--color-text-muted)" text-anchor="middle">Thời gian (Nguồn lây duy trì kéo dài)</text>
        </svg>
      `;
    } else {
      svgContent = `
        <svg viewBox="0 0 500 180" width="100%" height="180" style="overflow: visible;">
          <!-- Axis -->
          <line x1="40" y1="150" x2="480" y2="150" stroke="var(--color-border)" stroke-width="2"/>
          <line x1="40" y1="20" x2="40" y2="150" stroke="var(--color-border)" stroke-width="2"/>
          <!-- Generation 1 (F0) -->
          <rect x="60" y="130" width="18" height="20" fill="#8b5cf6" rx="3"/>
          <text x="69" y="120" font-size="9" fill="#8b5cf6" text-anchor="middle" font-weight="bold">F0</text>
          <!-- Generation 2 (F1) -->
          <rect x="120" y="115" width="18" height="35" fill="#8b5cf6" rx="3"/>
          <rect x="142" y="95" width="18" height="55" fill="#8b5cf6" rx="3"/>
          <text x="140" y="85" font-size="9" fill="#8b5cf6" text-anchor="middle" font-weight="bold">Đợt 2 (F1)</text>
          <!-- Generation 3 (F2) -->
          <rect x="200" y="80" width="18" height="70" fill="#ef4444" rx="3"/>
          <rect x="222" y="40" width="18" height="110" fill="#ef4444" rx="3"/>
          <rect x="244" y="65" width="18" height="85" fill="#ef4444" rx="3"/>
          <text x="233" y="30" font-size="9" fill="#ef4444" text-anchor="middle" font-weight="bold">Đợt 3 (F2 bùng phát)</text>
          <text x="260" y="170" font-size="11" fill="var(--color-text-muted)" text-anchor="middle">Thời gian (Các đỉnh cách nhau 1 thời kỳ ủ bệnh)</text>
        </svg>
      `;
    }

    if (canvasContainer) canvasContainer.innerHTML = svgContent;

    if (epicurveInfoBox && pattern) {
      epicurveInfoBox.innerHTML = `
        <h4 style="margin: 0 0 0.35rem 0; font-size: 1rem; color: var(--color-primary);">${pattern.name} (${pattern.englishName})</h4>
        <p style="margin: 0 0 0.5rem 0; color: var(--color-text);">${pattern.description}</p>
        <div style="font-size: 0.8rem; color: var(--color-text-muted);">
          <strong>Đặc điểm đường cong:</strong> ${pattern.curveShape}<br>
          <strong>Ví dụ kinh điển:</strong> ${pattern.examples.join(', ')}
        </div>
      `;
    }
  }

  curveTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      curveTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const curveType = btn.getAttribute('data-curve') as any;
      renderEpicurve(curveType);
    });
  });

  renderEpicurve('point-source');

  // 3. Search and Filter
  const searchInput = document.getElementById('lesson-search') as HTMLInputElement | null;
  const clearBtn = document.getElementById('clear-search') as HTMLElement | null;
  const emptyState = document.getElementById('empty-search-state') as HTMLElement | null;
  const viewGridBtn = document.getElementById('view-grid-btn') as HTMLElement | null;
  const viewListBtn = document.getElementById('view-list-btn') as HTMLElement | null;
  const lessonsContainer = document.getElementById('lessons-container') as HTMLElement | null;
  const navItems = document.querySelectorAll('.part-nav-item');
  const sections = document.querySelectorAll('.layout-content-area > section');
  const modalBackdrop = document.getElementById('epiModalBackdrop');
  const modalContainer = document.getElementById('epiModalContainer');

  function performSearch(query: string): void {
    const q = query.toLowerCase().trim();
    if (clearBtn) clearBtn.style.display = q ? 'block' : 'none';

    let totalVisible = 0;

    sections.forEach(sec => {
      const sectionEl = sec as HTMLElement;
      const cards = sectionEl.querySelectorAll('.specialty-card');
      let sectionVisibleCount = 0;

      cards.forEach(card => {
        const cardEl = card as HTMLElement;
        const text = cardEl.textContent?.toLowerCase() || '';
        if (!q || text.includes(q)) {
          cardEl.style.display = '';
          sectionVisibleCount++;
          totalVisible++;
        } else {
          cardEl.style.display = 'none';
        }
      });

      sectionEl.style.display = sectionVisibleCount > 0 ? '' : 'none';
    });

    if (emptyState) {
      emptyState.style.display = totalVisible === 0 ? 'block' : 'none';
    }
  }

  searchInput?.addEventListener('input', (e) => {
    performSearch((e.target as HTMLInputElement).value);
  });

  clearBtn?.addEventListener('click', () => {
    if (searchInput) searchInput.value = '';
    performSearch('');
    searchInput?.focus();
  });

  // View toggle
  if (viewGridBtn && viewListBtn && lessonsContainer) {
    viewGridBtn.addEventListener('click', () => {
      viewGridBtn.classList.add('active');
      viewListBtn.classList.remove('active');
      lessonsContainer.querySelectorAll('.specialty-grid').forEach(g => g.classList.remove('list-view'));
    });

    viewListBtn.addEventListener('click', () => {
      viewListBtn.classList.add('active');
      viewGridBtn.classList.remove('active');
      lessonsContainer.querySelectorAll('.specialty-grid').forEach(g => g.classList.add('list-view'));
    });
  }

  // 4. Quick Preview Modal
  function openQuickPreview(topicId: string): void {
    if (!modalBackdrop || !modalContainer) return;

    const topic = EPIDEMIOLOGY_TOPICS.find(t => t.id === topicId);
    if (!topic) return;

    const block = EPIDEMIOLOGY_BLOCKS.find(b => b.id === topic.blockId);

    modalContainer.innerHTML = `
      <div class="modal-header" style="padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--color-border); display: flex; justify-content: space-between; align-items: center; background: var(--color-surface);">
        <div>
          <span style="font-size: 0.75rem; font-weight: 700; background: var(--color-bg); color: #0d9488; padding: 0.2rem 0.5rem; border-radius: 4px;">${topic.code} • ${block ? block.name : ''}</span>
          <h3 style="margin: 0.35rem 0 0 0; font-size: 1.25rem; font-weight: 700; color: var(--color-text);">${topic.title}</h3>
        </div>
        <button type="button" class="modal-close-btn" onclick="window.EpiHub?.closeModal()" aria-label="Đóng" style="background: transparent; border: none; font-size: 1.5rem; cursor: pointer; color: var(--color-text-muted); width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div class="modal-body" style="padding: 1.5rem; max-height: 75vh; overflow-y: auto;">
        <!-- Tổng quan -->
        <div style="margin-bottom: 1.5rem; background: var(--color-bg); padding: 1.25rem; border-radius: 10px; border: 1px solid var(--color-border);">
          <h4 style="margin: 0 0 0.5rem 0; font-size: 0.95rem; font-weight: 700; color: #0d9488; display: flex; align-items: center; gap: 0.5rem;">
            <i class="fa-solid fa-circle-info"></i> Định Nghĩa & Tổng Quan Dịch Tễ
          </h4>
          <p style="margin: 0; font-size: 0.9rem; line-height: 1.65; color: var(--color-text);">${topic.overview}</p>
        </div>

        <!-- Công thức -->
        <div style="margin-bottom: 1.5rem;">
          <h4 style="margin: 0 0 0.6rem 0; font-size: 0.95rem; font-weight: 700; color: #3b82f6; display: flex; align-items: center; gap: 0.5rem;">
            <i class="fa-solid fa-calculator"></i> Công Thức Đo Lường Dịch Tễ Học
          </h4>
          <ul style="margin: 0; padding-left: 1.25rem; display: flex; flex-direction: column; gap: 0.4rem;">
            ${topic.keyFormulas.map(f => `<li style="font-size: 0.875rem; color: var(--color-text);"><code style="background: rgba(59,130,246,0.1); color: #2563eb; padding: 0.2rem 0.5rem; border-radius: 4px; font-family: monospace; display: block; margin-top: 0.2rem;">${f}</code></li>`).join('')}
          </ul>
        </div>

        <!-- Clinical Pearls -->
        <div style="margin-bottom: 1.5rem; background: rgba(13,148,136,0.08); border-left: 4px solid #0d9488; padding: 1.25rem; border-radius: 0 10px 10px 0;">
          <h4 style="margin: 0 0 0.6rem 0; font-size: 0.95rem; font-weight: 700; color: #0f766e; display: flex; align-items: center; gap: 0.5rem;">
            <i class="fa-solid fa-gem" style="color: #0d9488;"></i> Điểm Ngọc Thực Hành Lâm Sàng & Cộng Đồng
          </h4>
          <ul style="margin: 0; padding-left: 1.25rem; display: flex; flex-direction: column; gap: 0.5rem;">
            ${topic.clinicalPearls.map(p => `<li style="font-size: 0.875rem; color: var(--color-text); line-height: 1.5;">${p}</li>`).join('')}
          </ul>
        </div>

        <!-- Sai số & Bẫy nghiên cứu -->
        <div style="background: rgba(239,68,68,0.08); border-left: 4px solid #ef4444; padding: 1.25rem; border-radius: 0 10px 10px 0;">
          <h4 style="margin: 0 0 0.6rem 0; font-size: 0.95rem; font-weight: 700; color: #b91c1c; display: flex; align-items: center; gap: 0.5rem;">
            <i class="fa-solid fa-triangle-exclamation" style="color: #ef4444;"></i> Sai Số (Bias) & Cạm Bẫy Phân Tích Cần Tránh
          </h4>
          <ul style="margin: 0; padding-left: 1.25rem; display: flex; flex-direction: column; gap: 0.4rem;">
            ${topic.biasAndPitfalls.map(b => `<li style="font-size: 0.875rem; color: var(--color-text); line-height: 1.5;">${b}</li>`).join('')}
          </ul>
        </div>
      </div>
    `;

    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(): void {
    if (modalBackdrop) {
      modalBackdrop.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  (window as any).EpiHub = {
    openQuickPreview,
    closeModal,
    calculateMatrix
  };

  modalBackdrop?.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop?.classList.contains('open')) {
      closeModal();
    }
  });
}
