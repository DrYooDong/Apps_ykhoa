/**
 * DocSpace — Bedside EBM Statistical Calculators Engine
 * Path: src/content/docspace/features/ebm-bedside-calculator.ts
 * 
 * Cung cấp các công cụ tính toán thống kê y học chứng cứ ngay tại giường bệnh:
 * 1. Fagan Nomogram & Post-test Probability (Xác suất sau xét nghiệm từ LR+/LR- với đồ họa SVG)
 * 2. NNT / NNH / ARR / RRR Calculator (Số bệnh nhân cần điều trị để ngừa 1 biến cố)
 * 3. Diagnostic Accuracy 2x2 Table (Độ nhạy, Độ đặc hiệu, PPV, NPV, LR+, LR-)
 */

export interface DiagnosticTestProfile {
  id: string;
  name: string;
  condition: string;
  lrPositive: number;
  lrNegative: number;
  sensitivity: number;
  specificity: number;
  clinicalNote: string;
}

export const COMMON_DIAGNOSTIC_TESTS: DiagnosticTestProfile[] = [
  {
    id: 'trop_hs',
    name: 'Troponin T/I siêu nhạy (hs-cTn)',
    condition: 'Nhồi máu cơ tim cấp (NSTEMI/STEMI)',
    lrPositive: 12.5,
    lrNegative: 0.05,
    sensitivity: 96,
    specificity: 92,
    clinicalNote: 'hs-cTn tăng > 99th percentile hoặc động học tăng/giảm rõ rệt giúp chẩn đoán NSTEMI.'
  },
  {
    id: 'ddimer_pe',
    name: 'D-Dimer ELISA (< 500 ng/mL)',
    condition: 'Thuyên tắc phổi (PE) / Huyết khối TM sâu (DVT)',
    lrPositive: 1.7,
    lrNegative: 0.08,
    sensitivity: 97,
    specificity: 45,
    clinicalNote: 'D-Dimer có giá trị loại trừ (Rule-out) cực cao khi xác suất lâm sàng Wells thấp/trung bình.'
  },
  {
    id: 'bnp_hf',
    name: 'NT-proBNP (< 300 pg/mL)',
    condition: 'Suy tim cấp / Khó thở do suy tim',
    lrPositive: 4.5,
    lrNegative: 0.05,
    sensitivity: 98,
    specificity: 78,
    clinicalNote: 'NT-proBNP < 300 pg/mL loại trừ suy tim cấp với độ nhạy 98%.'
  },
  {
    id: 'procalcitonin_sepsis',
    name: 'Procalcitonin (PCT > 0.5 ng/mL)',
    condition: 'Nhiễm khuẩn huyết / Sepsis',
    lrPositive: 6.8,
    lrNegative: 0.15,
    sensitivity: 88,
    specificity: 86,
    clinicalNote: 'PCT giúp phân biệt nhiễm trùng do vi khuẩn vs virus và hướng dẫn dừng kháng sinh an toàn.'
  },
  {
    id: 'strep_a_rapid',
    name: 'Test nhanh Kháng nguyên Liên cầu A (RADT)',
    condition: 'Viêm họng do Streptococcus pyogenes',
    lrPositive: 18.0,
    lrNegative: 0.12,
    sensitivity: 86,
    specificity: 95,
    clinicalNote: 'RADT dương tính giúp chỉ định kháng sinh Penicillin/Amoxicillin ngay không cần đợi cấy họng.'
  },
  {
    id: 'strep_pneumo_urine',
    name: 'Kháng nguyên Phế cầu trong Nước tiểu',
    condition: 'Viêm phổi mắc phải cộng đồng (CAP) nặng',
    lrPositive: 16.2,
    lrNegative: 0.28,
    sensitivity: 74,
    specificity: 97,
    clinicalNote: 'Giúp thu hẹp phổ kháng sinh đích sớm cho S. pneumoniae trong ICU.'
  }
];

/**
 * Tính xác suất sau xét nghiệm (Post-test Probability) bằng định lý Bayes
 * Post-test Odds = Pre-test Odds * Likelihood Ratio
 * Probability = Odds / (1 + Odds)
 */
export function calculatePostTestProbability(preTestProbPercent: number, lr: number): number {
  if (preTestProbPercent <= 0) return 0;
  if (preTestProbPercent >= 100) return 100;
  
  const p = preTestProbPercent / 100;
  const preOdds = p / (1 - p);
  const postOdds = preOdds * lr;
  const postP = postOdds / (1 + postOdds);
  
  return Math.round(postP * 1000) / 10; // Trả về dạng % (VD: 82.5%)
}

/**
 * Tính NNT, NNH, ARR, RRR từ tỷ lệ biến cố
 */
export function calculateEbmMetrics(controlEventRatePercent: number, interventionEventRatePercent: number): {
  arr: number;
  rrr: number;
  nnt: number;
  isHarm: boolean;
  interpretation: string;
} {
  const cer = controlEventRatePercent / 100;
  const eer = interventionEventRatePercent / 100;
  const arr = cer - eer;
  
  if (Math.abs(arr) < 0.00001) {
    return {
      arr: 0,
      rrr: 0,
      nnt: 0,
      isHarm: false,
      interpretation: 'Không có sự khác biệt có ý nghĩa lâm sàng giữa hai phác đồ.'
    };
  }

  const rrr = Math.round(((cer - eer) / cer) * 1000) / 10;
  const nnt = Math.ceil(Math.abs(1 / arr));
  const isHarm = arr < 0;

  let interpretation = '';
  if (isHarm) {
    interpretation = `🚨 NNH = ${nnt}: Cứ điều trị ${nnt} bệnh nhân bằng phác đồ can thiệp sẽ gây thêm 1 biến cố có hại so với nhóm chứng (Tăng nguy cơ tuyệt đối ARI = ${(Math.abs(arr) * 100).toFixed(1)}%).`;
  } else {
    interpretation = `✨ NNT = ${nnt}: Cứ điều trị ${nnt} bệnh nhân bằng phác đồ này sẽ phòng ngừa được 1 biến cố tử vong/nhập viện (Giảm nguy cơ tuyệt đối ARR = ${(arr * 100).toFixed(1)}%, Giảm nguy cơ tương đối RRR = ${rrr}%).`;
  }

  return {
    arr: Math.round(arr * 1000) / 10,
    rrr,
    nnt,
    isHarm,
    interpretation
  };
}

/**
 * Render Interactive Fagan Nomogram SVG View
 */
export function renderFaganNomogramHtml(preProb: number = 25, lrPos: number = 10, lrNeg: number = 0.1): string {
  const postPos = calculatePostTestProbability(preProb, lrPos);
  const postNeg = calculatePostTestProbability(preProb, lrNeg);

  // Tọa độ Y tương ứng trên thang đo Nomogram 0 - 100%
  const getY = (valPercent: number) => {
    // Thang đo xác suất 0.1% -> 99.9%
    const clamped = Math.max(0.1, Math.min(99.9, valPercent));
    // Log-odds transformation for realistic Nomogram scale
    const logOdds = Math.log(clamped / (100 - clamped));
    // Normalize logOdds (-6.9 to +6.9) to Y (320 to 40)
    const norm = (logOdds + 6.9) / 13.8;
    return 320 - (norm * 280);
  };

  const yPre = getY(preProb);
  const yPostPos = getY(postPos);
  const yPostNeg = getY(postNeg);

  return `
    <div class="ebm-fagan-container" style="background:var(--color-surface, #fff); border:1px solid var(--color-border, #e2e8f0); border-radius:10px; padding:16px; margin-bottom:1rem;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
        <span style="font-weight:800; font-size:13.5px; color:var(--color-primary, #0284c7); display:flex; align-items:center; gap:6px;">
          <i class="fa-solid fa-chart-line" style="color:#0284c7;"></i>
          Biểu Đồ Định Lý Bayes &amp; Fagan Nomogram (Xác Suất Hậu Nghiệm)
        </span>
        <span class="dsp-badge" style="background:rgba(2,132,199,0.1); color:#0284c7; font-weight:700; font-size:11px;">
          EBM Statistical Engine
        </span>
      </div>

      <!-- Nomogram Controls -->
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:14px; background:var(--color-bg, #f8fafc); padding:10px; border-radius:8px; border:1px solid var(--color-border, #e2e8f0);">
        <div>
          <label style="font-size:11.5px; font-weight:700; color:var(--color-text-muted); display:flex; justify-content:space-between;">
            <span>Xác suất Tiền nghiệm (Pre-test):</span>
            <strong id="faganPreProbVal" style="color:var(--color-primary);">${preProb}%</strong>
          </label>
          <input type="range" id="faganPreProbSlider" min="1" max="99" value="${preProb}" style="width:100%; accent-color:var(--color-primary);" />
        </div>

        <div>
          <label style="font-size:11.5px; font-weight:700; color:var(--color-text-muted); display:flex; justify-content:space-between;">
            <span>Chọn Xét nghiệm Cận lâm sàng:</span>
          </label>
          <select id="faganTestSelect" class="dsp-input" style="font-size:12px; padding:3px 6px; height:auto;">
            ${COMMON_DIAGNOSTIC_TESTS.map(t => `<option value="${t.id}" data-lrpos="${t.lrPositive}" data-lrneg="${t.lrNegative}">${escapeHtml(t.name)}</option>`).join('')}
          </select>
        </div>
      </div>

      <!-- Results Grid -->
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:14px;">
        <div style="background:rgba(16,185,129,0.08); border:1px solid rgba(16,185,129,0.3); border-radius:8px; padding:10px; text-align:center;">
          <div style="font-size:11px; font-weight:700; color:#065f46; text-transform:uppercase;">Kết Quả DƯƠNG TÍNH (+)</div>
          <div id="faganPostPosText" style="font-size:20px; font-weight:800; color:#047857; margin:2px 0;">${postPos}%</div>
          <div style="font-size:11px; color:#065f46;">Xác suất mắc bệnh thực tế (LR⁺ = ${lrPos})</div>
        </div>

        <div style="background:rgba(59,130,246,0.08); border:1px solid rgba(59,130,246,0.3); border-radius:8px; padding:10px; text-align:center;">
          <div style="font-size:11px; font-weight:700; color:#1e40af; text-transform:uppercase;">Kết Quả ÂM TÍNH (-)</div>
          <div id="faganPostNegText" style="font-size:20px; font-weight:800; color:#2563eb; margin:2px 0;">${postNeg}%</div>
          <div style="font-size:11px; color:#1e40af;">Xác suất còn sót bệnh (LR⁻ = ${lrNeg})</div>
        </div>
      </div>

      <!-- Pure SVG Nomogram Visualizer -->
      <div style="text-align:center; background:#fff; border:1px solid var(--color-border); border-radius:8px; padding:10px; overflow-x:auto;">
        <svg id="faganSvg" viewBox="0 0 480 340" style="width:100%; max-width:440px; height:auto;">
          <!-- Axis 1: Pre-test -->
          <line x1="60" y1="40" x2="60" y2="320" stroke="#94a3b8" stroke-width="2" />
          <text x="60" y="30" text-anchor="middle" font-size="11" font-weight="700" fill="#475569">Tiền nghiệm %</text>
          
          <!-- Axis 2: LR -->
          <line x1="240" y1="40" x2="240" y2="320" stroke="#94a3b8" stroke-width="2" />
          <text x="240" y="30" text-anchor="middle" font-size="11" font-weight="700" fill="#475569">Tỷ số Khả dĩ LR</text>

          <!-- Axis 3: Post-test -->
          <line x1="420" y1="40" x2="420" y2="320" stroke="#94a3b8" stroke-width="2" />
          <text x="420" y="30" text-anchor="middle" font-size="11" font-weight="700" fill="#475569">Hậu nghiệm %</text>

          <!-- Ticks & Labels -->
          <text x="50" y="50" text-anchor="end" font-size="9" fill="#94a3b8">99%</text>
          <text x="50" y="180" text-anchor="end" font-size="9" fill="#94a3b8">50%</text>
          <text x="50" y="315" text-anchor="end" font-size="9" fill="#94a3b8">1%</text>

          <text x="430" y="50" text-anchor="start" font-size="9" fill="#94a3b8">99%</text>
          <text x="430" y="180" text-anchor="start" font-size="9" fill="#94a3b8">50%</text>
          <text x="430" y="315" text-anchor="start" font-size="9" fill="#94a3b8">1%</text>

          <!-- Vector Connecting Lines -->
          <!-- Positive LR Line -->
          <line id="svgLinePos" x1="60" y1="${yPre}" x2="420" y2="${yPostPos}" stroke="#10b981" stroke-width="3" stroke-linecap="round" />
          <circle id="svgDotPre" cx="60" cy="${yPre}" r="5" fill="#0284c7" />
          <circle id="svgDotPostPos" cx="420" cy="${yPostPos}" r="5" fill="#10b981" />

          <!-- Negative LR Line -->
          <line id="svgLineNeg" x1="60" y1="${yPre}" x2="420" y2="${yPostNeg}" stroke="#3b82f6" stroke-width="2.5" stroke-dasharray="4,4" stroke-linecap="round" />
          <circle id="svgDotPostNeg" cx="420" cy="${yPostNeg}" r="4.5" fill="#3b82f6" />
        </svg>
      </div>
    </div>
  `;
}

function escapeHtml(str: string): string {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
