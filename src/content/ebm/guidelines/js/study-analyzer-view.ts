/**
 * EBM Study Deep Analyzer & Critical Appraisal View (SPA)
 * Path: src/content/ebm/guidelines/study-analyzer-view.ts
 */

import { escapeHtml } from '../../../docspace/docspace-view';
import { EbmStatisticsEngine, Rob2Evaluator, GradeProfiler, EbmReportGenerator, EbmStatisticalResults, Rob2Assessment, GradeAssessment } from './study-analyzer-suite';

export function renderStudyAnalyzerView(): string {
  return `
    <div class="study-analyzer-container animate-fade-in" style="max-width: 1240px; margin: 0 auto; padding: 1.5rem 1rem; color: var(--color-text, #0f172a);">
      
      <!-- Breadcrumb & Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <div style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 0.25rem;">
            <a href="#/ebm" style="color: var(--color-primary, #0284c7); text-decoration: none;"><i class="fa-solid fa-chevron-left"></i> Y Học Chứng Cứ</a> / 
            <a href="#/ebm/kho-guidelines" style="color: var(--color-primary, #0284c7); text-decoration: none;">Kho Guidelines</a> / Phân Tích Nghiên Cứu Chuyên Sâu
          </div>
          <h1 style="font-size: 1.85rem; font-weight: 800; color: var(--color-primary, #0284c7); margin: 0; display: flex; align-items: center; gap: 0.75rem;">
            <i class="fa-solid fa-microscope" style="color: #0284c7;"></i> EBM Study Deep Analyzer &amp; Critical Appraisal Suite
          </h1>
          <p style="font-size: 0.95rem; color: var(--color-text-muted, #64748b); margin: 0.25rem 0 0 0;">
            Tính toán chỉ số lâm sàng (ARR, RRR, NNT/NNH, OR/RR với 95% CI), Đánh giá Nguy cơ sai lệch Cochrane RoB 2 &amp; Phân tầng chất lượng bằng chứng GRADE.
          </p>
        </div>
        
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <a href="#/ebm/kho-guidelines" class="dsp-btn dsp-btn-outline" style="border-radius: 8px; font-size: 0.875rem; font-weight: 600; text-decoration: none;">
            <i class="fa-solid fa-arrow-left"></i> Trở về Kho Guidelines
          </a>
        </div>
      </div>

      <!-- Quick Preset Trials Bar -->
      <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 10px; padding: 12px 18px; margin-bottom: 1.5rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
        <div style="display: flex; align-items: center; gap: 8px; font-size: 0.9rem; font-weight: 700; color: var(--color-text);">
          <i class="fa-solid fa-bolt" style="color: #f59e0b;"></i> Thử dữ liệu từ các thử nghiệm lâm sàng kinh điển:
        </div>
        <div style="display: flex; gap: 6px; flex-wrap: wrap;">
          <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-ghost js-btn-load-preset" data-preset="dapa_hf" style="border: 1px solid var(--color-border); font-size: 11.5px;">DAPA-HF (Dapagliflozin)</button>
          <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-ghost js-btn-load-preset" data-preset="emperor_reduced" style="border: 1px solid var(--color-border); font-size: 11.5px;">EMPEROR-Reduced</button>
          <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-ghost js-btn-load-preset" data-preset="paradigm_hf" style="border: 1px solid var(--color-border); font-size: 11.5px;">PARADIGM-HF (Entresto)</button>
          <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-ghost js-btn-load-preset" data-preset="sprint" style="border: 1px solid var(--color-border); font-size: 11.5px;">SPRINT (Kiểm soát HA)</button>
          <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-ghost js-btn-load-preset" data-preset="re_ly" style="border: 1px solid var(--color-border); font-size: 11.5px;">RE-LY (Dabigatran)</button>
        </div>
      </div>

      <!-- Main Navigation Tabs -->
      <div style="display: flex; gap: 8px; margin-bottom: 1.5rem; border-bottom: 2px solid var(--color-border, #e2e8f0); padding-bottom: 8px; overflow-x: auto;">
        <button type="button" class="dsp-btn dsp-btn-primary js-analyzer-tab active" data-tab="stats" style="font-weight: 700; font-size: 13px; border-radius: 8px;">
          <i class="fa-solid fa-calculator" style="margin-right: 6px;"></i> 1. Hiệu Quả Lâm Sàng &amp; NNT (Effect Size)
        </button>
        <button type="button" class="dsp-btn dsp-btn-ghost js-analyzer-tab" data-tab="rob2" style="font-weight: 700; font-size: 13px; border-radius: 8px;">
          <i class="fa-solid fa-scale-balanced" style="margin-right: 6px; color: #f59e0b;"></i> 2. Đánh Giá Sai Lệch (Cochrane RoB 2)
        </button>
        <button type="button" class="dsp-btn dsp-btn-ghost js-analyzer-tab" data-tab="grade" style="font-weight: 700; font-size: 13px; border-radius: 8px;">
          <i class="fa-solid fa-award" style="margin-right: 6px; color: #10b981;"></i> 3. Phân Tầng Bằng Chứng (GRADE)
        </button>
        <button type="button" class="dsp-btn dsp-btn-ghost js-analyzer-tab" data-tab="report" style="font-weight: 700; font-size: 13px; border-radius: 8px;">
          <i class="fa-solid fa-file-lines" style="margin-right: 6px; color: #8b5cf6;"></i> 4. Xuất Báo Cáo Phê Bình EBM
        </button>
      </div>

      <!-- Tab Content Area -->
      <div id="analyzerTabContent">
        <!-- Rendered dynamically -->
      </div>

    </div>
  `;
}

export function initStudyAnalyzerController(): void {
  let currentTab: 'stats' | 'rob2' | 'grade' | 'report' = 'stats';

  let currentTable = {
    studyTitle: 'DAPA-HF Trial (Dapagliflozin in Heart Failure with Reduced Ejection Fraction)',
    population: 'Bệnh nhân suy tim HFrEF (LVEF ≤ 40%, NYHA II-IV)',
    intervention: 'Dapagliflozin 10mg x 1 lần/ngày + Phác đồ chuẩn',
    comparator: 'Placebo + Phác đồ chuẩn',
    outcomeName: 'Tử vong do tim mạch hoặc Nhập viện vì suy tim nặng lên',
    e1: 386,
    n1: 2373,
    e2: 502,
    n2: 2371
  };

  let cachedStats: EbmStatisticalResults | null = null;
  let cachedRob2: Rob2Assessment = {
    d1_randomization: { score: 'low', note: 'Quy trình ngẫu nhiên hóa bằng máy tính và bảo mật mã ngẫu nhiên phân bổ tốt.' },
    d2_deviations: { score: 'low', note: 'Thiết kế mù đôi (Double-blind) chuẩn, tỷ lệ tuân thủ điều trị cao.' },
    d3_missing_data: { score: 'low', note: 'Tỷ lệ mất dấu theo dõi rất thấp (< 1%).' },
    d4_measurement: { score: 'low', note: 'Tiêu chí đánh giá kết cục được hội đồng chuyên gia độc lập chấm mù.' },
    d5_reporting: { score: 'low', note: 'Phân tích theo đúng đề cương đăng ký trước trên ClinicalTrials.gov.' },
    overall: 'low',
    summary: 'Nghiên cứu có thiết kế ngẫu nhiên mù đôi đa trung tâm chặt chẽ, nguy cơ sai lệch thấp trên toàn bộ 5 miền.'
  };

  let cachedGrade: GradeAssessment = {
    studyDesign: 'rct',
    riskOfBias: 0,
    inconsistency: 0,
    indirectness: 0,
    imprecision: 0,
    publicationBias: 0,
    largeEffect: 0,
    doseResponse: 0,
    finalGrade: 'high',
    gradeLabel: '🟢 RẤT CAO (HIGH)',
    rationale: 'Bằng chứng từ thử nghiệm ngẫu nhiên mù đôi đa trung tâm cỡ mẫu lớn với kết quả nhất quán cao.'
  };

  const PRESETS: Record<string, typeof currentTable> = {
    dapa_hf: {
      studyTitle: 'DAPA-HF Trial (N Engl J Med 2019)',
      population: 'Bệnh nhân suy tim HFrEF (LVEF ≤ 40%, NYHA II-IV, eGFR ≥ 30)',
      intervention: 'Dapagliflozin 10mg PO q24h',
      comparator: 'Placebo',
      outcomeName: 'Tử vong do tim mạch hoặc Nhập viện vì suy tim',
      e1: 386, n1: 2373,
      e2: 502, n2: 2371
    },
    emperor_reduced: {
      studyTitle: 'EMPEROR-Reduced Trial (N Engl J Med 2020)',
      population: 'Bệnh nhân suy tim HFrEF nặng (LVEF ≤ 30% hoặc LVEF ≤ 40% có nhập viện gần đây)',
      intervention: 'Empagliflozin 10mg PO q24h',
      comparator: 'Placebo',
      outcomeName: 'Tử vong tim mạch hoặc Nhập viện vì suy tim',
      e1: 361, n1: 1863,
      e2: 462, n2: 1867
    },
    paradigm_hf: {
      studyTitle: 'PARADIGM-HF Trial (N Engl J Med 2014)',
      population: 'Bệnh nhân HFrEF (LVEF ≤ 35%, BNP/NT-proBNP tăng)',
      intervention: 'Sacubitril / Valsartan (LCZ696) 200mg BID',
      comparator: 'Enalapril 10mg BID',
      outcomeName: 'Tử vong tim mạch hoặc Nhập viện suy tim',
      e1: 914, n1: 4187,
      e2: 1117, n2: 4212
    },
    sprint: {
      studyTitle: 'SPRINT Trial (N Engl J Med 2015)',
      population: 'Bệnh nhân Tăng huyết áp có nguy cơ tim mạch cao không đái tháo đường',
      intervention: 'Kiểm soát huyết áp tích cực (Mục tiêu SBP < 120 mmHg)',
      comparator: 'Kiểm soát huyết áp tiêu chuẩn (Mục tiêu SBP < 140 mmHg)',
      outcomeName: 'Biến cố tim mạch gộp (NMCT, Đột quỵ, Suy tim, Tử vong tim mạch)',
      e1: 243, n1: 4678,
      e2: 319, n2: 4683
    },
    re_ly: {
      studyTitle: 'RE-LY Trial (N Engl J Med 2009)',
      population: 'Bệnh nhân Rung nhĩ có nguy cơ đột quỵ',
      intervention: 'Dabigatran 150mg PO BID',
      comparator: 'Warfarin (Mục tiêu INR 2.0 - 3.0)',
      outcomeName: 'Đột quỵ hoặc Thuyên tắc mạch hệ thống',
      e1: 134, n1: 6076,
      e2: 199, n2: 6022
    }
  };

  function renderCurrentTab() {
    const container = document.getElementById('analyzerTabContent');
    if (!container) return;

    if (currentTab === 'stats') {
      container.innerHTML = renderStatsTab();
      bindStatsEvents();
    } else if (currentTab === 'rob2') {
      container.innerHTML = renderRob2Tab();
      bindRob2Events();
    } else if (currentTab === 'grade') {
      container.innerHTML = renderGradeTab();
      bindGradeEvents();
    } else if (currentTab === 'report') {
      container.innerHTML = renderReportTab();
      bindReportEvents();
    }
  }

  // ─── TAB 1: STATISTICAL EFFECT SIZE ───────────────────────────────────────
  function renderStatsTab(): string {
    try {
      cachedStats = EbmStatisticsEngine.calculate({
        interventionEvents: currentTable.e1,
        interventionTotal: currentTable.n1,
        controlEvents: currentTable.e2,
        controlTotal: currentTable.n2
      });
    } catch (e: any) {
      cachedStats = null;
    }

    const s = cachedStats;

    return `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 340px), 1fr)); gap: 1.5rem;">
        
        <!-- Left: Input Form -->
        <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border); border-radius: 12px; padding: 1.5rem;">
          <h3 style="margin: 0 0 1rem 0; font-size: 1.1rem; font-weight: 800; color: var(--color-primary); display: flex; align-items: center; gap: 8px;">
            <i class="fa-solid fa-table-cells"></i> Dữ Liệu Bảng 2x2 &amp; Cấu Trúc PICO
          </h3>

          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div>
              <label style="font-size: 12px; font-weight: 700; display: block; margin-bottom: 4px;">Tên Nghiên cứu / Thử nghiệm lâm sàng:</label>
              <input type="text" id="txtStudyTitle" class="dsp-input" value="${escapeHtml(currentTable.studyTitle)}" style="width: 100%; font-size: 13px;" />
            </div>

            <div>
              <label style="font-size: 12px; font-weight: 700; display: block; margin-bottom: 4px;">Tên Kết cục chính (Primary Outcome):</label>
              <input type="text" id="txtOutcomeName" class="dsp-input" value="${escapeHtml(currentTable.outcomeName)}" style="width: 100%; font-size: 13px;" />
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 140px), 1fr)); gap: 12px; background: rgba(2,132,199,0.04); padding: 12px; border-radius: 8px; border: 1px solid rgba(2,132,199,0.15);">
              <div>
                <strong style="color: var(--color-primary); font-size: 13px; display: block; margin-bottom: 8px;"><i class="fa-solid fa-pills"></i> Nhóm Can Thiệp (I)</strong>
                <label style="font-size: 11.5px; display: block; margin-bottom: 2px;">Số biến cố (E1):</label>
                <input type="number" id="numE1" class="dsp-input" value="${currentTable.e1}" style="width: 100%; margin-bottom: 6px;" />
                <label style="font-size: 11.5px; display: block; margin-bottom: 2px;">Tổng số BN (N1):</label>
                <input type="number" id="numN1" class="dsp-input" value="${currentTable.n1}" style="width: 100%;" />
              </div>

              <div>
                <strong style="color: #64748b; font-size: 13px; display: block; margin-bottom: 8px;"><i class="fa-solid fa-vial"></i> Nhóm Đối Chứng (C)</strong>
                <label style="font-size: 11.5px; display: block; margin-bottom: 2px;">Số biến cố (E2):</label>
                <input type="number" id="numE2" class="dsp-input" value="${currentTable.e2}" style="width: 100%; margin-bottom: 6px;" />
                <label style="font-size: 11.5px; display: block; margin-bottom: 2px;">Tổng số BN (N2):</label>
                <input type="number" id="numN2" class="dsp-input" value="${currentTable.n2}" style="width: 100%;" />
              </div>
            </div>

            <button type="button" id="btnCalculateEbm" class="dsp-btn dsp-btn-primary" style="font-weight: 800; padding: 10px; justify-content: center;">
              <i class="fa-solid fa-calculator"></i> Tính Toán &amp; Phân Tích Hiệu Quả
            </button>
          </div>
        </div>

        <!-- Right: Results Dashboard -->
        <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border); border-radius: 12px; padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--color-border); padding-bottom: 8px; margin-bottom: 14px;">
              <h3 style="margin: 0; font-size: 1.1rem; font-weight: 800; color: var(--color-text);">
                <i class="fa-solid fa-chart-pie" style="color: #10b981;"></i> Kết Quả Thống Kê Lâm Sàng (EBM Metrics)
              </h3>
              ${s ? `<span style="font-size: 11px; font-weight: 800; color: #16a34a; background: #dcfce7; padding: 2px 8px; border-radius: 6px;">Đã tính toán</span>` : ''}
            </div>

            ${s ? `
              <!-- KPI Bento Grid -->
              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-bottom: 14px;">
                <div style="background: var(--color-bg); padding: 10px 14px; border-radius: 8px; border: 1px solid var(--color-border);">
                  <div style="font-size: 11px; color: var(--color-text-muted); font-weight: 600;">Tỷ lệ biến cố (EER vs CER)</div>
                  <div style="font-size: 16px; font-weight: 800; color: var(--color-text);">
                    ${(s.eer*100).toFixed(1)}% <span style="font-size: 12px; font-weight: normal; color: var(--color-text-muted);">vs</span> ${(s.cer*100).toFixed(1)}%
                  </div>
                </div>

                <div style="background: #f0fdf4; padding: 10px 14px; border-radius: 8px; border: 1px solid #bbf7d0;">
                  <div style="font-size: 11px; color: #166534; font-weight: 700;">Giảm nguy cơ tuyệt đối (ARR)</div>
                  <div style="font-size: 18px; font-weight: 800; color: #15803d;">
                    ${s.arrPercent.toFixed(2)}%
                  </div>
                </div>

                <div style="background: #eff6ff; padding: 10px 14px; border-radius: 8px; border: 1px solid #bfdbfe;">
                  <div style="font-size: 11px; color: #1e40af; font-weight: 700;">Nguy cơ tương đối (RR / 95% CI)</div>
                  <div style="font-size: 16px; font-weight: 800; color: #1d4ed8;">
                    ${s.rr.toFixed(2)} <span style="font-size: 11px; font-weight: normal;">(${s.rrLower95.toFixed(2)} - ${s.rrUpper95.toFixed(2)})</span>
                  </div>
                </div>

                <div style="background: ${s.nnt ? '#faf5ff' : '#fff1f2'}; padding: 10px 14px; border-radius: 8px; border: 1px solid ${s.nnt ? '#e9d5ff' : '#fecdd3'};">
                  <div style="font-size: 11px; color: ${s.nnt ? '#6b21a8' : '#9f1239'}; font-weight: 700;">
                    ${s.nnt ? 'Số BN cần điều trị (NNT)' : 'Số BN gây hại (NNH)'}
                  </div>
                  <div style="font-size: 20px; font-weight: 800; color: ${s.nnt ? '#7e22ce' : '#be123c'};">
                    ${s.nnt ? s.nnt : s.nnh || 'N/A'} <span style="font-size: 11.5px; font-weight: normal;">bệnh nhân</span>
                  </div>
                </div>
              </div>

              <!-- Detailed Interpretation Alert -->
              <div style="background: rgba(2,132,199,0.08); border-left: 4px solid var(--color-primary); padding: 12px 14px; border-radius: 6px; font-size: 12.5px; line-height: 1.5; margin-bottom: 12px;">
                <strong><i class="fa-solid fa-lightbulb"></i> Nhận xét ý nghĩa lâm sàng:</strong><br>
                ${s.interpretation}
              </div>
            ` : `
              <div style="text-align: center; padding: 40px; color: var(--color-text-muted);">
                Vui lòng nhập các thông số bảng 2x2 bên trái và bấm <strong>"Tính Toán"</strong>.
              </div>
            `}
          </div>

          <div style="display: flex; gap: 8px;">
            <button type="button" id="btnNextToRob2" class="dsp-btn dsp-btn-primary dsp-btn-sm" style="flex: 1; font-weight: 700;">
              Chuyển sang Bước 2: Đánh Giá Sai Lệch RoB 2 <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>

      </div>
    `;
  }

  function bindStatsEvents() {
    document.getElementById('btnCalculateEbm')?.addEventListener('click', () => {
      const title = (document.getElementById('txtStudyTitle') as HTMLInputElement)?.value || '';
      const outcome = (document.getElementById('txtOutcomeName') as HTMLInputElement)?.value || '';
      const e1 = parseInt((document.getElementById('numE1') as HTMLInputElement)?.value || '0', 10);
      const n1 = parseInt((document.getElementById('numN1') as HTMLInputElement)?.value || '0', 10);
      const e2 = parseInt((document.getElementById('numE2') as HTMLInputElement)?.value || '0', 10);
      const n2 = parseInt((document.getElementById('numN2') as HTMLInputElement)?.value || '0', 10);

      currentTable = {
        studyTitle: title,
        population: currentTable.population,
        intervention: currentTable.intervention,
        comparator: currentTable.comparator,
        outcomeName: outcome,
        e1, n1, e2, n2
      };

      renderCurrentTab();
    });

    document.getElementById('btnNextToRob2')?.addEventListener('click', () => {
      currentTab = 'rob2';
      updateTabButtons();
      renderCurrentTab();
    });
  }

  // ─── TAB 2: RISK OF BIAS 2 (RoB 2) ────────────────────────────────────────
  function renderRob2Tab(): string {
    const r = cachedRob2;

    return `
      <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border); border-radius: 12px; padding: 1.5rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--color-border); padding-bottom: 10px; margin-bottom: 16px;">
          <div>
            <h3 style="margin: 0; font-size: 1.2rem; font-weight: 800; color: var(--color-text);">
              <i class="fa-solid fa-scale-balanced" style="color: #f59e0b;"></i> Đánh Giá Nguy Cơ Sai Lệch (Cochrane Risk of Bias - RoB 2)
            </h3>
            <p style="margin: 2px 0 0 0; font-size: 12px; color: var(--color-text-muted);">
              Đánh giá 5 miền sai lệch chuẩn quốc tế cho thử nghiệm ngẫu nhiên có đối chứng (RCT)
            </p>
          </div>
          <div style="text-align: right;">
            <span style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: ${r.overall === 'low' ? '#16a34a' : r.overall === 'some_concerns' ? '#d97706' : '#dc2626'}; background: ${r.overall === 'low' ? '#dcfce7' : r.overall === 'some_concerns' ? '#fef3c7' : '#fee2e2'}; padding: 4px 10px; border-radius: 6px;">
              Tổng kết: ${r.overall === 'low' ? 'Nguy cơ thấp (Low)' : r.overall === 'some_concerns' ? 'Có lo ngại (Some concerns)' : 'Nguy cơ cao (High)'}
            </span>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 14px; margin-bottom: 20px;">
          ${renderRobDomainRow('d1', 'D1: Quá trình ngẫu nhiên hóa (Randomization process)', 'Tạo trình tự ngẫu nhiên và bảo mật mã phân bổ bệnh nhân', r.d1_randomization.score, r.d1_randomization.note)}
          ${renderRobDomainRow('d2', 'D2: Sai lệch so với can thiệp dự định (Deviations from intended interventions)', 'Thực hiện làm mù bệnh nhân, bác sĩ điều trị và người đánh giá', r.d2_deviations.score, r.d2_deviations.note)}
          ${renderRobDomainRow('d3', 'D3: Dữ liệu kết cục bị thiếu (Missing outcome data)', 'Tỷ lệ mất dấu theo dõi (loss to follow-up) và phân tích ITT (Intention-to-Treat)', r.d3_missing_data.score, r.d3_missing_data.note)}
          ${renderRobDomainRow('d4', 'D4: Đo lường kết cục (Measurement of the outcome)', 'Phương pháp đo lường kết cục chính xác và người đo lường được làm mù', r.d4_measurement.score, r.d4_measurement.note)}
          ${renderRobDomainRow('d5', 'D5: Báo cáo kết quả chọn lọc (Selection of the reported result)', 'Báo cáo đầy đủ mọi kết cục đã đăng ký trước trong đề cương nghiên cứu', r.d5_reporting.score, r.d5_reporting.note)}
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-border); padding-top: 14px;">
          <button type="button" id="btnBackToStats" class="dsp-btn dsp-btn-outline dsp-btn-sm">
            <i class="fa-solid fa-arrow-left"></i> Quay lại Bước 1
          </button>
          <button type="button" id="btnNextToGrade" class="dsp-btn dsp-btn-primary dsp-btn-sm" style="font-weight: 700;">
            Chuyển sang Bước 3: Phân Tầng GRADE <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    `;
  }

  function renderRobDomainRow(id: string, title: string, help: string, currentScore: string, currentNote: string): string {
    return `
      <div style="background: var(--color-bg); border: 1px solid var(--color-border); border-radius: 8px; padding: 12px 16px; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 200px), 1fr)); gap: 14px; align-items: center;">
        <div>
          <strong style="font-size: 13px; color: var(--color-text);">${escapeHtml(title)}</strong>
          <div style="font-size: 11px; color: var(--color-text-muted);">${escapeHtml(help)}</div>
        </div>

        <div>
          <select id="sel_rob_${id}" class="dsp-input js-rob-select" data-domain="${id}" style="width: 100%; font-size: 12px; font-weight: 700;">
            <option value="low" ${currentScore === 'low' ? 'selected' : ''}>🟢 Nguy cơ thấp (Low)</option>
            <option value="some_concerns" ${currentScore === 'some_concerns' ? 'selected' : ''}>🟡 Có lo ngại (Some concerns)</option>
            <option value="high" ${currentScore === 'high' ? 'selected' : ''}>🔴 Nguy cơ cao (High)</option>
          </select>
        </div>

        <div>
          <input type="text" id="txt_rob_${id}_note" class="dsp-input js-rob-note" data-domain="${id}" value="${escapeHtml(currentNote)}" placeholder="Ghi chú minh chứng (VD: Phân bổ ngẫu nhiên bằng máy tính...)" style="width: 100%; font-size: 12px;" />
        </div>
      </div>
    `;
  }

  function bindRob2Events() {
    document.querySelectorAll('.js-rob-select').forEach(sel => {
      sel.addEventListener('change', () => updateRobState());
    });
    document.querySelectorAll('.js-rob-note').forEach(input => {
      input.addEventListener('input', () => updateRobState());
    });

    function updateRobState() {
      const getVal = (d: string) => (document.getElementById(`sel_rob_${d}`) as HTMLSelectElement)?.value as any || 'low';
      const getNote = (d: string) => (document.getElementById(`txt_rob_${d}_note`) as HTMLInputElement)?.value || '';

      const evalRes = Rob2Evaluator.evaluate({
        d1: getVal('d1'),
        d2: getVal('d2'),
        d3: getVal('d3'),
        d4: getVal('d4'),
        d5: getVal('d5')
      });

      cachedRob2 = {
        d1_randomization: { score: getVal('d1'), note: getNote('d1') },
        d2_deviations: { score: getVal('d2'), note: getNote('d2') },
        d3_missing_data: { score: getVal('d3'), note: getNote('d3') },
        d4_measurement: { score: getVal('d4'), note: getNote('d4') },
        d5_reporting: { score: getVal('d5'), note: getNote('d5') },
        overall: evalRes.overall,
        summary: evalRes.summary
      };
    }

    document.getElementById('btnBackToStats')?.addEventListener('click', () => {
      currentTab = 'stats';
      updateTabButtons();
      renderCurrentTab();
    });

    document.getElementById('btnNextToGrade')?.addEventListener('click', () => {
      currentTab = 'grade';
      updateTabButtons();
      renderCurrentTab();
    });
  }

  // ─── TAB 3: GRADE EVIDENCE PROFILER ───────────────────────────────────────
  function renderGradeTab(): string {
    const g = cachedGrade;

    return `
      <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border); border-radius: 12px; padding: 1.5rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--color-border); padding-bottom: 10px; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
          <div>
            <h3 style="margin: 0; font-size: 1.2rem; font-weight: 800; color: var(--color-text);">
              <i class="fa-solid fa-award" style="color: #10b981;"></i> Phân Tầng Chất Lượng Bằng Chứng (GRADE Evidence Profiler)
            </h3>
            <p style="margin: 2px 0 0 0; font-size: 12px; color: var(--color-text-muted);">
              Đánh giá mức độ tin cậy của bằng chứng theo hệ thống Grading of Recommendations Assessment, Development and Evaluation (GRADE)
            </p>
          </div>
          <div>
            <span style="font-size: 13px; font-weight: 800; padding: 6px 12px; border-radius: 8px; background: rgba(16,185,129,0.12); color: #047857; border: 1px solid rgba(16,185,129,0.3);">
              ${g.gradeLabel}
            </span>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr)); gap: 14px; margin-bottom: 20px;">
          <div style="background: var(--color-bg); padding: 12px; border-radius: 8px; border: 1px solid var(--color-border);">
            <strong style="font-size: 13px; color: var(--color-text); display: block; margin-bottom: 6px;">Thiết kế nghiên cứu gốc:</strong>
            <select id="selGradeDesign" class="dsp-input" style="width: 100%; font-size: 12.5px;">
              <option value="rct" ${g.studyDesign === 'rct' ? 'selected' : ''}>Thử nghiệm ngẫu nhiên có đối chứng (RCT) — Khởi điểm: Cao (4đ)</option>
              <option value="observational" ${g.studyDesign === 'observational' ? 'selected' : ''}>Nghiên cứu quan sát (Observational / Cohort) — Khởi điểm: Thấp (2đ)</option>
            </select>
          </div>

          <div style="background: var(--color-bg); padding: 12px; border-radius: 8px; border: 1px solid var(--color-border);">
            <strong style="font-size: 13px; color: var(--color-text); display: block; margin-bottom: 6px;">1. Nguy cơ sai lệch (Risk of Bias):</strong>
            <select id="selGradeRob" class="dsp-input js-grade-input" style="width: 100%; font-size: 12.5px;">
              <option value="0" ${g.riskOfBias === 0 ? 'selected' : ''}>Không hạ mức (0)</option>
              <option value="-1" ${g.riskOfBias === -1 ? 'selected' : ''}>Nghiêm trọng: Hạ 1 mức (-1)</option>
              <option value="-2" ${g.riskOfBias === -2 ? 'selected' : ''}>Rất nghiêm trọng: Hạ 2 mức (-2)</option>
            </select>
          </div>

          <div style="background: var(--color-bg); padding: 12px; border-radius: 8px; border: 1px solid var(--color-border);">
            <strong style="font-size: 13px; color: var(--color-text); display: block; margin-bottom: 6px;">2. Tính không nhất quán (Inconsistency):</strong>
            <select id="selGradeInconsistency" class="dsp-input js-grade-input" style="width: 100%; font-size: 12.5px;">
              <option value="0" ${g.inconsistency === 0 ? 'selected' : ''}>Nhất quán tốt (0)</option>
              <option value="-1" ${g.inconsistency === -1 ? 'selected' : ''}>I² cao / Khác biệt lớn: Hạ 1 mức (-1)</option>
              <option value="-2" ${g.inconsistency === -2 ? 'selected' : ''}>Rất không nhất quán: Hạ 2 mức (-2)</option>
            </select>
          </div>

          <div style="background: var(--color-bg); padding: 12px; border-radius: 8px; border: 1px solid var(--color-border);">
            <strong style="font-size: 13px; color: var(--color-text); display: block; margin-bottom: 6px;">3. Bằng chứng gián tiếp (Indirectness):</strong>
            <select id="selGradeIndirectness" class="dsp-input js-grade-input" style="width: 100%; font-size: 12.5px;">
              <option value="0" ${g.indirectness === 0 ? 'selected' : ''}>Trực tiếp (0)</option>
              <option value="-1" ${g.indirectness === -1 ? 'selected' : ''}>Khác biệt quần thể/can thiệp: Hạ 1 mức (-1)</option>
            </select>
          </div>

          <div style="background: var(--color-bg); padding: 12px; border-radius: 8px; border: 1px solid var(--color-border);">
            <strong style="font-size: 13px; color: var(--color-text); display: block; margin-bottom: 6px;">4. Độ thiếu chính xác (Imprecision):</strong>
            <select id="selGradeImprecision" class="dsp-input js-grade-input" style="width: 100%; font-size: 12.5px;">
              <option value="0" ${g.imprecision === 0 ? 'selected' : ''}>Mẫu đủ lớn, CI hẹp (0)</option>
              <option value="-1" ${g.imprecision === -1 ? 'selected' : ''}>Mẫu nhỏ / CI vắt qua ngưỡng lâm sàng: Hạ 1 mức (-1)</option>
            </select>
          </div>

          <div style="background: var(--color-bg); padding: 12px; border-radius: 8px; border: 1px solid var(--color-border);">
            <strong style="font-size: 13px; color: var(--color-text); display: block; margin-bottom: 6px;">5. Sai lệch xuất bản (Publication Bias):</strong>
            <select id="selGradePubBias" class="dsp-input js-grade-input" style="width: 100%; font-size: 12.5px;">
              <option value="0" ${g.publicationBias === 0 ? 'selected' : ''}>Không phát hiện nghi ngờ (0)</option>
              <option value="-1" ${g.publicationBias === -1 ? 'selected' : ''}>Nghi ngờ có sai lệch xuất bản: Hạ 1 mức (-1)</option>
            </select>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-border); padding-top: 14px;">
          <button type="button" id="btnBackToRob2" class="dsp-btn dsp-btn-outline dsp-btn-sm">
            <i class="fa-solid fa-arrow-left"></i> Quay lại Bước 2
          </button>
          <button type="button" id="btnNextToReport" class="dsp-btn dsp-btn-primary dsp-btn-sm" style="font-weight: 700;">
            Chuyển sang Bước 4: Xuất Báo Cáo EBM <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    `;
  }

  function bindGradeEvents() {
    document.querySelectorAll('.js-grade-input, #selGradeDesign').forEach(el => {
      el.addEventListener('change', () => {
        const design = (document.getElementById('selGradeDesign') as HTMLSelectElement)?.value as any || 'rct';
        const rob = parseInt((document.getElementById('selGradeRob') as HTMLSelectElement)?.value || '0', 10) as any;
        const inc = parseInt((document.getElementById('selGradeInconsistency') as HTMLSelectElement)?.value || '0', 10) as any;
        const ind = parseInt((document.getElementById('selGradeIndirectness') as HTMLSelectElement)?.value || '0', 10) as any;
        const imp = parseInt((document.getElementById('selGradeImprecision') as HTMLSelectElement)?.value || '0', 10) as any;
        const pub = parseInt((document.getElementById('selGradePubBias') as HTMLSelectElement)?.value || '0', 10) as any;

        const res = GradeProfiler.assess({
          studyDesign: design,
          riskOfBias: rob,
          inconsistency: inc,
          indirectness: ind,
          imprecision: imp,
          publicationBias: pub
        });

        cachedGrade = {
          studyDesign: design,
          riskOfBias: rob,
          inconsistency: inc,
          indirectness: ind,
          imprecision: imp,
          publicationBias: pub,
          largeEffect: 0,
          doseResponse: 0,
          finalGrade: res.grade,
          gradeLabel: res.label,
          rationale: res.rationale
        };
      });
    });

    document.getElementById('btnBackToRob2')?.addEventListener('click', () => {
      currentTab = 'rob2';
      updateTabButtons();
      renderCurrentTab();
    });

    document.getElementById('btnNextToReport')?.addEventListener('click', () => {
      currentTab = 'report';
      updateTabButtons();
      renderCurrentTab();
    });
  }

  // ─── TAB 4: CRITICAL APPRAISAL REPORT ─────────────────────────────────────
  function renderReportTab(): string {
    const reportText = EbmReportGenerator.generateMarkdownReport({
      studyTitle: currentTable.studyTitle,
      pico: {
        p_population: currentTable.population,
        i_intervention: currentTable.intervention,
        c_comparator: currentTable.comparator,
        o_outcomes: currentTable.outcomeName
      },
      statistics: cachedStats || undefined,
      rob2: cachedRob2,
      grade: cachedGrade,
      clinicalBottomLine: `Bằng chứng có độ tin cậy ${cachedGrade.gradeLabel}. Can thiệp chứng minh hiệu quả lâm sàng vượt trội làm giảm đáng kể biến cố ${currentTable.outcomeName} với chỉ số NNT = ${cachedStats?.nnt || 'N/A'}. Khuyến cáo áp dụng vào phác đồ điều trị thường quy.`,
      generatedAt: new Date().toLocaleString('vi-VN')
    });

    return `
      <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border); border-radius: 12px; padding: 1.5rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--color-border); padding-bottom: 10px; margin-bottom: 16px;">
          <div>
            <h3 style="margin: 0; font-size: 1.2rem; font-weight: 800; color: var(--color-text);">
              <i class="fa-solid fa-file-lines" style="color: #8b5cf6;"></i> Báo Cáo Phê Bình Nghiên Cứu EBM (Critical Appraisal Report)
            </h3>
            <p style="margin: 2px 0 0 0; font-size: 12px; color: var(--color-text-muted);">
              Báo cáo cấu trúc chuẩn tổng hợp PICO, Chỉ số thống kê (NNT/ARR/RR), Nguy cơ sai lệch RoB 2 và Phân tầng GRADE
            </p>
          </div>
          <div style="display: flex; gap: 8px;">
            <button type="button" id="btnCopyEbmReport" class="dsp-btn dsp-btn-primary dsp-btn-sm" style="font-weight: 700;">
              <i class="fa-solid fa-copy"></i> 1-Click Copy Báo Cáo
            </button>
          </div>
        </div>

        <textarea id="txtEbmReportMarkdown" rows="18" class="dsp-input" style="width: 100%; font-family: monospace; font-size: 13px; line-height: 1.5; padding: 14px; border: 1.5px solid var(--color-border); border-radius: 8px; background: var(--color-bg); resize: vertical;">${escapeHtml(reportText)}</textarea>

        <div style="margin-top: 14px; display: flex; justify-content: space-between; align-items: center;">
          <button type="button" id="btnBackToGrade" class="dsp-btn dsp-btn-outline dsp-btn-sm">
            <i class="fa-solid fa-arrow-left"></i> Quay lại Bước 3
          </button>
          <a href="#/ebm/kho-guidelines" class="dsp-btn dsp-btn-ghost dsp-btn-sm" style="color: var(--color-primary); font-weight: 700; text-decoration: none;">
            <i class="fa-solid fa-arrow-left"></i> Quay lại Danh sách Guidelines
          </a>
        </div>
      </div>
    `;
  }

  function bindReportEvents() {
    document.getElementById('btnCopyEbmReport')?.addEventListener('click', () => {
      const text = (document.getElementById('txtEbmReportMarkdown') as HTMLTextAreaElement)?.value || '';
      if (text) {
        navigator.clipboard.writeText(text).then(() => {
          alert('✅ Đã sao chép Báo cáo phê bình nghiên cứu EBM vào Clipboard thành công!');
        });
      }
    });

    document.getElementById('btnBackToGrade')?.addEventListener('click', () => {
      currentTab = 'grade';
      updateTabButtons();
      renderCurrentTab();
    });
  }

  function updateTabButtons() {
    document.querySelectorAll('.js-analyzer-tab').forEach(btn => {
      const tab = btn.getAttribute('data-tab');
      if (tab === currentTab) {
        btn.classList.add('dsp-btn-primary', 'active');
        btn.classList.remove('dsp-btn-ghost');
      } else {
        btn.classList.remove('dsp-btn-primary', 'active');
        btn.classList.add('dsp-btn-ghost');
      }
    });
  }

  // Bind Main Tabs Header
  document.querySelectorAll('.js-analyzer-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      currentTab = btn.getAttribute('data-tab') as any;
      updateTabButtons();
      renderCurrentTab();
    });
  });

  // Bind Presets
  document.querySelectorAll('.js-btn-load-preset').forEach(btn => {
    btn.addEventListener('click', () => {
      const pKey = btn.getAttribute('data-preset');
      if (pKey && PRESETS[pKey]) {
        currentTable = { ...PRESETS[pKey] };
        renderCurrentTab();
      }
    });
  });

  // Initial Render
  renderCurrentTab();
}
