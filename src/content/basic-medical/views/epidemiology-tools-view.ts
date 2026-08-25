/**
 * CliniPortal — Epidemiology Interactive Studios & Decision Support Tools
 * Path: src/content/basic-medical/views/epidemiology-tools-view.ts
 * Module: 2x2 Matrix Solver, Epicurve Outbreak Simulator, Study Design Comparator & Bradford Hill Causality
 */

import '../../../styles/components/module-dashboard.css';
import '../../../styles/components/physio-content.css';
import '../../../styles/components/formula-vault.css';
import '../../../styles/components/physio-promax-hub.css';
import '../../../styles/components/epidemiology-hub.css';
import { 
  STUDY_DESIGNS_DATA, 
  OUTBREAK_PATTERNS, 
  BRADFORD_HILL_CRITERIA 
} from '../data/epidemiology-data';
import { StudyDesignInfo, OutbreakPattern, CausalityCriterion } from '../types/epidemiology.types';

export type EpiToolType = 'matrix-solver' | 'epicurve' | 'study-designs' | 'bradford-hill';

export function renderEpidemiologyToolView(tool: EpiToolType): string {
  let toolTitle = '';
  let toolSubtitle = '';
  let toolContent = '';

  switch (tool) {
    case 'matrix-solver':
      toolTitle = 'Bộ Giải Ma Trận 2×2 Dịch Tễ Học (Contingency Solver)';
      toolSubtitle = 'Tính toán tức thì RR, OR, AR, PAF, Se, Sp, PPV, NPV, LR+, LR- & NNT/NNH kèm khoảng tin cậy 95% CI';
      toolContent = renderMatrixSolverSection();
      break;
    case 'epicurve':
      toolTitle = 'Mô Phỏng Đường Cong Dịch Tễ (Epicurve Studio)';
      toolSubtitle = 'Phân tích hình thái đường cong dịch: Ổ dịch điểm (Point Source), Nguồn liên tục (Continuous) và Lây lan tiếp xúc (Propagated)';
      toolContent = renderEpicurveSection();
      break;
    case 'study-designs':
      toolTitle = 'Ma Trận So Sánh Thiết Kế Nghiên Cứu (Study Design Matrix)';
      toolSubtitle = 'Bảng phân tích đối sánh RCT, Đoàn hệ (Cohort), Bệnh-Chứng (Case-Control), Cắt ngang & Tương quan sinh thái';
      toolContent = renderStudyDesignsSection();
      break;
    case 'bradford-hill':
      toolTitle = '9 Tiêu Chuẩn Nhân Quả Bradford Hill (Causality Framework)';
      toolSubtitle = 'Khung thẩm định mối quan hệ nhân quả dịch tễ học và y học chứng cứ kinh điển';
      toolContent = renderBradfordHillSection();
      break;
  }

  return `
    <div class="promax-wrapper" id="mainContent">
      <!-- BREADCRUMB -->
      <div class="breadcrumb" style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 1.25rem;">
        <a href="#/" style="color: inherit; text-decoration: none;">🏠 Trang chủ</a> &nbsp;/&nbsp; 
        <a href="#/basic-medical" style="color: inherit; text-decoration: none;">Basic Medical Sciences</a> &nbsp;/&nbsp; 
        <a href="#/basic-medical/dich-te-hoc" style="color: inherit; text-decoration: none;">Dịch Tễ Học & Y Tế Công Cộng</a> &nbsp;/&nbsp; 
        <span style="color: #0d9488; font-weight: 600;">${toolTitle}</span>
      </div>

      <!-- TOOL HEADER STRIP -->
      <header class="promax-hero hero-epi-theme" style="padding: 2rem 2.25rem; margin-bottom: 2rem; border-radius: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
          <div>
            <div class="epi-badge-pulse" style="margin-bottom: 0.65rem;">
              <span class="pulse-dot" style="background: #2dd4bf;"></span>
              <span>Epidemiology Decision Support & Interactive Tools</span>
            </div>
            <h1 style="font-size: 1.85rem; font-weight: 800; color: #ffffff; margin: 0 0 0.5rem 0;">
              ${toolTitle}
            </h1>
            <p style="margin: 0; color: rgba(255,255,255,0.9); font-size: 0.95rem; max-width: 800px;">
              ${toolSubtitle}
            </p>
          </div>
          <a href="#/basic-medical/dich-te-hoc" class="pillar-tab" style="background: rgba(255,255,255,0.15); color: #ffffff; border: 1px solid rgba(255,255,255,0.3); font-weight: 700; padding: 0.6rem 1.2rem; border-radius: 10px; text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem;">
            <i class="fa-solid fa-arrow-left"></i> Quay lại Dịch Tễ Học
          </a>
        </div>
      </header>

      <!-- NAVIGATION TABS BETWEEN TOOLS -->
      <div style="display: flex; gap: 0.6rem; overflow-x: auto; margin-bottom: 2rem; padding-bottom: 0.5rem;">
        <a href="#/basic-medical/epidemiology/matrix-solver" class="pillar-tab ${tool === 'matrix-solver' ? 'active' : ''}" style="${tool === 'matrix-solver' ? 'background: rgba(13,148,136,0.15); color: #0d9488; border-color: #0d9488;' : ''}">
          <i class="fa-solid fa-calculator"></i> 1. Ma Trận 2×2 Solver
        </a>
        <a href="#/basic-medical/epidemiology/epicurve" class="pillar-tab ${tool === 'epicurve' ? 'active' : ''}" style="${tool === 'epicurve' ? 'background: rgba(245,158,11,0.15); color: #f59e0b; border-color: #f59e0b;' : ''}">
          <i class="fa-solid fa-chart-area"></i> 2. Đường Cong Dịch (Epicurve)
        </a>
        <a href="#/basic-medical/epidemiology/study-designs" class="pillar-tab ${tool === 'study-designs' ? 'active' : ''}" style="${tool === 'study-designs' ? 'background: rgba(59,130,246,0.15); color: #3b82f6; border-color: #3b82f6;' : ''}">
          <i class="fa-solid fa-sitemap"></i> 3. Thiết Kế Nghiên Cứu
        </a>
        <a href="#/basic-medical/epidemiology/bradford-hill" class="pillar-tab ${tool === 'bradford-hill' ? 'active' : ''}" style="${tool === 'bradford-hill' ? 'background: rgba(139,92,246,0.15); color: #8b5cf6; border-color: #8b5cf6;' : ''}">
          <i class="fa-solid fa-scale-balanced"></i> 4. Chuẩn Bradford Hill
        </a>
      </div>

      <!-- MAIN TOOL CONTENT -->
      <div class="tool-viewport-container">
        ${toolContent}
      </div>
    </div>
  `;
}

function renderMatrixSolverSection(): string {
  return `
    <section class="epi-matrix-studio" style="margin-top: 0;">
      <div class="epi-matrix-header">
        <h3 class="epi-matrix-title">
          <i class="fa-solid fa-table-cells" style="color: #0d9488;"></i>
          <span>Bảng Tính Ma Trận 2×2 Tương Tác</span>
        </h3>
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
        <!-- Table 2x2 Input -->
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
            💡 <strong>Biện Luận Lâm Sàng:</strong> Nhóm có phơi nhiễm có nguy cơ mắc bệnh cao gấp <strong>3.50 lần</strong> so với nhóm không phơi nhiễm (RR = 3.50). Số chênh phơi nhiễm ở nhóm bệnh cao gấp <strong>9.33 lần</strong> so với nhóm chứng (OR = 9.33). Khoảng <strong>50%</strong> số ca bệnh trong nhóm phơi nhiễm có thể quy cho yếu tố phơi nhiễm này.
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderEpicurveSection(): string {
  const defaultPattern = OUTBREAK_PATTERNS[0];
  return `
    <section class="epicurve-studio-container" style="margin-top: 0;">
      <div class="epicurve-controls">
        <div>
          <span style="font-size: 0.78rem; font-weight: 700; color: #f59e0b; text-transform: uppercase;">Mô Phỏng Ổ Dịch Thực Địa</span>
          <h3 style="margin: 0.25rem 0 0.5rem 0; font-size: 1.25rem; font-weight: 800; color: var(--color-text);">
            Đường Cong Dịch Tễ Học (Epidemic Curve Simulator)
          </h3>
          <p style="margin: 0; font-size: 0.875rem; color: var(--color-text-muted);">
            Lựa chọn 1 trong 3 mô hình lây lan dịch bệnh để quan sát phân bố ca bệnh theo thời gian và giải mã nguồn phơi nhiễm.
          </p>
        </div>

        <div class="pattern-selector-tabs">
          ${OUTBREAK_PATTERNS.map((p, idx) => `
            <button type="button" class="btn-pattern-tab ${idx === 0 ? 'active' : ''}" data-pattern-id="${p.id}">
              <i class="fa-solid fa-chart-column"></i> ${p.name.split('(')[0].trim()}
            </button>
          `).join('')}
        </div>
      </div>

      <div class="epicurve-visual-grid">
        <!-- SVG Epicurve Renderer -->
        <div class="epicurve-canvas-box" id="epicurveCanvas">
          <!-- Dynamically Rendered by JS -->
        </div>

        <!-- Outbreak Pattern Clinical Detail Card -->
        <div class="epicurve-detail-card" id="epicurveDetailCard">
          <div style="padding: 1.25rem; border-left: 4px solid #ef4444; background: var(--color-surface); border-radius: 12px; border: 1px solid var(--color-border);">
            <h4 style="margin: 0 0 0.5rem 0; font-size: 1.05rem; font-weight: 800; color: #ef4444;">
              ${defaultPattern.name}
            </h4>
            <p style="font-size: 0.875rem; line-height: 1.6; margin: 0 0 1rem 0; color: var(--color-text);">
              ${defaultPattern.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderStudyDesignsSection(): string {
  return `
    <section class="study-designs-matrix" style="margin-top: 0;">
      <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--color-text); margin: 0 0 1.25rem 0; display: flex; align-items: center; gap: 0.5rem;">
        <i class="fa-solid fa-sitemap" style="color: #3b82f6;"></i>
        <span>Ma Trận Đối Sánh Thiết Kế Nghiên Cứu Dịch Tễ Học</span>
      </h3>

      <div class="design-card-deck">
        ${STUDY_DESIGNS_DATA.map((d: StudyDesignInfo) => {
          const colorMap: Record<string, string> = {
            'rct': '#10b981',
            'cohort': '#3b82f6',
            'case-control': '#8b5cf6',
            'cross-sectional': '#f59e0b',
            'ecological': '#06b6d4'
          };
          const color = colorMap[d.id] || '#0d9488';
          return `
            <div class="design-card">
              <div class="design-card-top" style="border-top: 4px solid ${color};">
                <span class="design-hierarchy-badge">${d.type}</span>
                <h4 class="design-name">${d.name}</h4>
                <span class="design-name-en">${d.englishName}</span>
                <p class="design-summary">${d.direction} • Đơn vị: ${d.unit}</p>
              </div>
              <div class="design-card-body">
                <div class="design-metric-pill" style="color: ${color}; background: rgba(59, 130, 246, 0.08);">
                  <i class="fa-solid fa-chart-line"></i> Chỉ số: <strong>${d.primaryMeasure}</strong>
                </div>
                <div class="design-pro-con-grid">
                  <div>
                    <strong style="color: #10b981; font-size: 0.78rem; display: block; margin-bottom: 0.25rem;">
                      <i class="fa-solid fa-check"></i> Ưu điểm:
                    </strong>
                    <ul style="margin: 0; padding-left: 1rem; font-size: 0.8rem; color: var(--color-text-muted);">
                      ${d.strengths.slice(0, 2).map(s => `<li>${s}</li>`).join('')}
                    </ul>
                  </div>
                  <div>
                    <strong style="color: #ef4444; font-size: 0.78rem; display: block; margin-bottom: 0.25rem;">
                      <i class="fa-solid fa-xmark"></i> Hạn chế:
                    </strong>
                    <ul style="margin: 0; padding-left: 1rem; font-size: 0.8rem; color: var(--color-text-muted);">
                      ${d.limitations.slice(0, 2).map(w => `<li>${w}</li>`).join('')}
                    </ul>
                  </div>
                </div>
                <div style="margin-top: 0.75rem; font-size: 0.8rem; background: var(--color-bg); padding: 0.5rem 0.75rem; border-radius: 6px; border: 1px solid var(--color-border);">
                  <strong style="color: var(--color-text);"><i class="fa-solid fa-flask"></i> Ví dụ:</strong> ${d.example}
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </section>
  `;
}

function renderBradfordHillSection(): string {
  return `
    <section class="bradford-hill-matrix" style="margin-top: 0;">
      <div style="margin-bottom: 1.5rem;">
        <span style="font-size: 0.78rem; font-weight: 700; color: #8b5cf6; text-transform: uppercase;">Causality Assessment Framework</span>
        <h3 style="margin: 0.25rem 0 0.5rem 0; font-size: 1.25rem; font-weight: 800; color: var(--color-text);">
          9 Tiêu Chuẩn Nhân - Quả Bradford Hill (1965)
        </h3>
        <p style="margin: 0; font-size: 0.875rem; color: var(--color-text-muted);">
          Khung tiêu chuẩn đánh giá mối quan hệ tương quan thống kê có phải là mối liên hệ Nhân - Quả thực thụ hay không.
        </p>
      </div>

      <div class="hill-criteria-grid">
        ${BRADFORD_HILL_CRITERIA.map((c: CausalityCriterion) => `
          <div class="hill-card">
            <div class="hill-card-num">${c.number}</div>
            <div class="hill-card-content">
              <h4 class="hill-card-title">${c.name} <small style="font-weight: normal; color: var(--color-text-muted);">(${c.englishName})</small></h4>
              <p class="hill-card-desc">${c.description}</p>
              <div class="hill-card-example">
                <strong><i class="fa-solid fa-flask"></i> Ví dụ kinh điển:</strong> ${c.classicExample}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

/**
 * Initialize Interactive Features for the Tools View
 */
export function initEpidemiologyToolsView(activeTool: EpiToolType): void {
  if (activeTool === 'matrix-solver') {
    init2x2MatrixSolver();
  } else if (activeTool === 'epicurve') {
    initEpicurveSimulator();
  }
}

function init2x2MatrixSolver(): void {
  const cellA = document.getElementById('cellA') as HTMLInputElement;
  const cellB = document.getElementById('cellB') as HTMLInputElement;
  const cellC = document.getElementById('cellC') as HTMLInputElement;
  const cellD = document.getElementById('cellD') as HTMLInputElement;

  const btnPresetCohort = document.getElementById('btnPresetCohort');
  const btnPresetScreening = document.getElementById('btnPresetScreening');
  const btnResetMatrix = document.getElementById('btnResetMatrix');

  const updateCalculations = () => {
    const a = Math.max(0, parseFloat(cellA?.value || '0'));
    const b = Math.max(0, parseFloat(cellB?.value || '0'));
    const c = Math.max(0, parseFloat(cellC?.value || '0'));
    const d = Math.max(0, parseFloat(cellD?.value || '0'));

    const row1 = a + b;
    const row2 = c + d;
    const col1 = a + c;
    const col2 = b + d;
    const n = a + b + c + d;

    // Update Totals
    const elRow1 = document.getElementById('row1Total');
    const elRow2 = document.getElementById('row2Total');
    const elCol1 = document.getElementById('col1Total');
    const elCol2 = document.getElementById('col2Total');
    const elGrand = document.getElementById('grandTotal');

    if (elRow1) elRow1.textContent = row1.toLocaleString();
    if (elRow2) elRow2.textContent = row2.toLocaleString();
    if (elCol1) elCol1.textContent = col1.toLocaleString();
    if (elCol2) elCol2.textContent = col2.toLocaleString();
    if (elGrand) elGrand.textContent = n.toLocaleString();

    if (n === 0) return;

    // Relative Risk (RR)
    const riskExp = row1 > 0 ? a / row1 : 0;
    const riskUnexp = row2 > 0 ? c / row2 : 0;
    const rr = riskUnexp > 0 ? riskExp / riskUnexp : 0;

    let rrCI = 'N/A';
    if (a > 0 && c > 0 && row1 > 0 && row2 > 0) {
      const lnRR = Math.log(rr);
      const seLnRR = Math.sqrt((b / (a * row1)) + (d / (c * row2)));
      const lower = Math.exp(lnRR - 1.96 * seLnRR);
      const upper = Math.exp(lnRR + 1.96 * seLnRR);
      rrCI = `95% CI [${lower.toFixed(2)} - ${upper.toFixed(2)}]`;
    }

    // Odds Ratio (OR)
    const or = (b * c) > 0 ? (a * d) / (b * c) : 0;
    let orCI = 'N/A';
    if (a > 0 && b > 0 && c > 0 && d > 0) {
      const lnOR = Math.log(or);
      const seLnOR = Math.sqrt((1 / a) + (1 / b) + (1 / c) + (1 / d));
      const lower = Math.exp(lnOR - 1.96 * seLnOR);
      const upper = Math.exp(lnOR + 1.96 * seLnOR);
      orCI = `95% CI [${lower.toFixed(2)} - ${upper.toFixed(2)}]`;
    }

    // Attributable Risk (AR) & NNT/NNH
    const ar = (riskExp - riskUnexp) * 100;
    const nnt = ar > 0 ? (100 / ar).toFixed(1) : '∞';

    // Sensitivity (Se) & Specificity (Sp)
    const se = col1 > 0 ? (a / col1) * 100 : 0;
    const sp = col2 > 0 ? (d / col2) * 100 : 0;

    // PPV & NPV
    const ppv = row1 > 0 ? (a / row1) * 100 : 0;
    const npv = row2 > 0 ? (d / row2) * 100 : 0;

    // Likelihood Ratios
    const lrPlus = (100 - sp) > 0 ? (se / (100 - sp)) : 0;
    const lrMinus = sp > 0 ? ((100 - se) / sp) : 0;

    // DOM Updates
    const elValRR = document.getElementById('valRR');
    const elSubRR = document.getElementById('subRR');
    const elValOR = document.getElementById('valOR');
    const elSubOR = document.getElementById('subOR');
    const elValAR = document.getElementById('valAR');
    const elValNNT = document.getElementById('valNNT');
    const elValSe = document.getElementById('valSe');
    const elValSp = document.getElementById('valSp');
    const elValPPV = document.getElementById('valPPV');
    const elValNPV = document.getElementById('valNPV');
    const elValLRPlus = document.getElementById('valLRPlus');
    const elValLRMinus = document.getElementById('valLRMinus');
    const elInterp = document.getElementById('matrixInterpretation');

    if (elValRR) elValRR.textContent = rr.toFixed(2);
    if (elSubRR) elSubRR.textContent = rrCI;
    if (elValOR) elValOR.textContent = or.toFixed(2);
    if (elSubOR) elSubOR.textContent = orCI;
    if (elValAR) elValAR.textContent = `${ar >= 0 ? '+' : ''}${ar.toFixed(1)}%`;
    if (elValNNT) elValNNT.textContent = `${nnt} (${ar > 0 ? 'NNH' : 'NNT'})`;
    if (elValSe) elValSe.textContent = `${se.toFixed(1)}%`;
    if (elValSp) elValSp.textContent = `${sp.toFixed(1)}%`;
    if (elValPPV) elValPPV.textContent = `${ppv.toFixed(1)}%`;
    if (elValNPV) elValNPV.textContent = `${npv.toFixed(1)}%`;
    if (elValLRPlus) elValLRPlus.textContent = lrPlus.toFixed(2);
    if (elValLRMinus) elValLRMinus.textContent = lrMinus.toFixed(2);

    if (elInterp) {
      elInterp.innerHTML = `
        💡 <strong>Biện Luận Lâm Sàng:</strong> Nhóm phơi nhiễm có nguy cơ mắc biến cố cao gấp <strong>${rr.toFixed(2)} lần</strong> so với nhóm không phơi nhiễm (${rrCI}). 
        Số chênh mắc bệnh ở nhóm phơi nhiễm cao gấp <strong>${or.toFixed(2)} lần</strong> (${orCI}). 
        Test chẩn đoán có Độ nhạy đạt <strong>${se.toFixed(1)}%</strong>, Độ đặc hiệu đạt <strong>${sp.toFixed(1)}%</strong> với Tỷ số khả dĩ dương $LR+ = ${lrPlus.toFixed(2)}$ (giúp ${lrPlus > 10 ? 'xác nhận chẩn đoán rất mạnh' : lrPlus > 5 ? 'tăng khả năng mắc bệnh đáng kể' : 'tăng nhẹ khả năng chẩn đoán'}).
      `;
    }
  };

  [cellA, cellB, cellC, cellD].forEach(input => {
    input?.addEventListener('input', updateCalculations);
  });

  btnPresetCohort?.addEventListener('click', () => {
    if (cellA) cellA.value = '70';
    if (cellB) cellB.value = '30';
    if (cellC) cellC.value = '20';
    if (cellD) cellD.value = '80';
    updateCalculations();
  });

  btnPresetScreening?.addEventListener('click', () => {
    if (cellA) cellA.value = '190';
    if (cellB) cellB.value = '50';
    if (cellC) cellC.value = '10';
    if (cellD) cellD.value = '750';
    updateCalculations();
  });

  btnResetMatrix?.addEventListener('click', () => {
    if (cellA) cellA.value = '0';
    if (cellB) cellB.value = '0';
    if (cellC) cellC.value = '0';
    if (cellD) cellD.value = '0';
    updateCalculations();
  });

  updateCalculations();
}

function initEpicurveSimulator(): void {
  const patternButtons = document.querySelectorAll('.btn-pattern-tab');
  const canvasBox = document.getElementById('epicurveCanvas');
  const detailCard = document.getElementById('epicurveDetailCard');

  const curveDataMap: Record<string, { color: string; peak: string; bars: { time: string; cases: number }[] }> = {
    'point-source': {
      color: '#ef4444',
      peak: 'Giờ thứ 14 (Đỉnh nhọn đơn lẻ)',
      bars: [
        { time: '0h', cases: 0 },
        { time: '4h', cases: 2 },
        { time: '8h', cases: 8 },
        { time: '12h', cases: 35 },
        { time: '14h', cases: 62 },
        { time: '16h', cases: 40 },
        { time: '20h', cases: 18 },
        { time: '24h', cases: 6 },
        { time: '28h', cases: 1 }
      ]
    },
    'continuous-source': {
      color: '#f59e0b',
      peak: 'Ngày 6 - Ngày 14 (Dạng Cao Nguyên Plateau)',
      bars: [
        { time: 'N1', cases: 3 },
        { time: 'N3', cases: 12 },
        { time: 'N5', cases: 28 },
        { time: 'N7', cases: 45 },
        { time: 'N9', cases: 48 },
        { time: 'N11', cases: 46 },
        { time: 'N13', cases: 47 },
        { time: 'N15', cases: 30 },
        { time: 'N17', cases: 10 }
      ]
    },
    'propagated': {
      color: '#3b82f6',
      peak: 'Nhiều Đỉnh (F0 → F1 → F2)',
      bars: [
        { time: 'T1', cases: 2 },
        { time: 'T2', cases: 5 },
        { time: 'T3', cases: 3 },
        { time: 'T4', cases: 18 },
        { time: 'T5', cases: 26 },
        { time: 'T6', cases: 14 },
        { time: 'T7', cases: 55 },
        { time: 'T8', cases: 78 },
        { time: 'T9', cases: 32 }
      ]
    }
  };

  const renderPattern = (patternId: string) => {
    const pattern = OUTBREAK_PATTERNS.find(p => p.id === patternId) || OUTBREAK_PATTERNS[0];
    const curveInfo = curveDataMap[pattern.id] || curveDataMap['point-source'];

    // Render SVG Bar Chart
    const maxVal = Math.max(...curveInfo.bars.map(d => d.cases), 1);
    const chartHeight = 200;
    const chartWidth = 540;
    const barWidth = Math.floor((chartWidth - 60) / curveInfo.bars.length) - 6;

    let svgBars = '';
    curveInfo.bars.forEach((d, i) => {
      const x = 50 + i * (barWidth + 6);
      const h = Math.round((d.cases / maxVal) * (chartHeight - 40));
      const y = chartHeight - h - 25;
      svgBars += `
        <rect x="${x}" y="${y}" width="${barWidth}" height="${h}" rx="3" fill="${curveInfo.color}" opacity="0.85" />
        <text x="${x + barWidth / 2}" y="${y - 4}" text-anchor="middle" font-size="10" font-weight="700" fill="${curveInfo.color}">${d.cases}</text>
        <text x="${x + barWidth / 2}" y="${chartHeight - 8}" text-anchor="middle" font-size="9" font-weight="600" fill="var(--color-text-muted)">${d.time}</text>
      `;
    });

    if (canvasBox) {
      canvasBox.innerHTML = `
        <div style="padding: 1rem; border-bottom: 1px solid var(--color-border); display: flex; justify-content: space-between; align-items: center;">
          <strong style="color: ${curveInfo.color}; font-size: 0.95rem;">
            <i class="fa-solid fa-chart-column"></i> ${pattern.name}
          </strong>
          <span style="font-size: 0.75rem; font-weight: 700; background: var(--color-bg); padding: 0.2rem 0.6rem; border-radius: 4px; border: 1px solid var(--color-border);">
            Đặc trưng: ${curveInfo.peak}
          </span>
        </div>
        <div style="padding: 1rem; width: 100%; overflow-x: auto;">
          <svg viewBox="0 0 ${chartWidth} ${chartHeight}" width="100%" height="auto" style="display: block; font-family: 'Plus Jakarta Sans', sans-serif;">
            <!-- Axis lines -->
            <line x1="45" y1="10" x2="45" y2="${chartHeight - 25}" stroke="var(--color-border)" stroke-width="1.5" />
            <line x1="45" y1="${chartHeight - 25}" x2="${chartWidth - 10}" y2="${chartHeight - 25}" stroke="var(--color-border)" stroke-width="1.5" />
            ${svgBars}
          </svg>
        </div>
      `;
    }

    if (detailCard) {
      detailCard.innerHTML = `
        <div style="padding: 1.25rem; border-left: 4px solid ${curveInfo.color}; background: var(--color-surface); border-radius: 12px; border: 1px solid var(--color-border);">
          <h4 style="margin: 0 0 0.5rem 0; font-size: 1.05rem; font-weight: 800; color: ${curveInfo.color};">
            ${pattern.name}
          </h4>
          <p style="font-size: 0.875rem; line-height: 1.6; margin: 0 0 1rem 0; color: var(--color-text);">
            ${pattern.description}
          </p>

          <div style="margin-bottom: 0.85rem;">
            <strong style="font-size: 0.8rem; color: var(--color-primary); display: block; margin-bottom: 0.35rem;">
              <i class="fa-solid fa-shapes"></i> Hình Thái Đường Cong:
            </strong>
            <span style="font-size: 0.825rem; color: var(--color-text-muted); line-height: 1.5; display: block;">
              ${pattern.curveShape}
            </span>
          </div>

          <div style="margin-bottom: 0.85rem;">
            <strong style="font-size: 0.8rem; color: var(--color-primary); display: block; margin-bottom: 0.35rem;">
              <i class="fa-solid fa-list-check"></i> Đặc Trưng Chính:
            </strong>
            <ul style="margin: 0; padding-left: 1.25rem; font-size: 0.825rem; color: var(--color-text-muted); line-height: 1.5;">
              ${pattern.keyFeatures.map(c => `<li>${c}</li>`).join('')}
            </ul>
          </div>

          <div style="background: rgba(13, 148, 136, 0.08); padding: 0.75rem 1rem; border-radius: 8px; border: 1px solid rgba(13, 148, 136, 0.2);">
            <strong style="font-size: 0.8rem; color: #0d9488;">
              <i class="fa-solid fa-utensils"></i> Ví Dụ Lâm Sàng Thực Địa:
            </strong>
            <ul style="margin: 0.25rem 0 0 0; padding-left: 1.25rem; font-size: 0.825rem; color: var(--color-text);">
              ${pattern.examples.map(e => `<li>${e}</li>`).join('')}
            </ul>
          </div>
        </div>
      `;
    }
  };

  patternButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      patternButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const patternId = btn.getAttribute('data-pattern-id') || 'point-source';
      renderPattern(patternId);
    });
  });

  renderPattern('point-source');
}
