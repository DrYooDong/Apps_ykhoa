/**
 * CliniPortal — Mechanism of Action (MoA) Vector SVG Visualizer
 * Path: src/content/basic-medical/diagrams/moa-visualizer.ts
 * 
 * Trình trực quan hóa sơ đồ vector Pure SVG minh họa cơ chế tác động phân tử
 * của các nhóm thuốc trụ cột trong Hướng dẫn Điều trị EBM 2024-2026.
 */

export type MoADrugType = 'sglt2' | 'arni' | 'glp1' | 'doac';

export interface MoADefinition {
  type: MoADrugType;
  title: string;
  drugClass: string;
  primaryTarget: string;
  svgHtml: string;
  clinicalEffectSummary: string;
  guidelineRecommendation: string;
}

export const MOA_DEFINITIONS: Record<MoADrugType, MoADefinition> = {
  sglt2: {
    type: 'sglt2',
    title: 'Cơ Chế Phân Tử Ức Chế SGLT2 (SGLT2 Inhibitors)',
    drugClass: 'SGLT2i (Dapagliflozin, Empagliflozin)',
    primaryTarget: 'Kênh đồng vận chuyển Na+/Glucose 2 tại Ống lượn gần & Phản hồi Ống - Cầu thận (TGF)',
    svgHtml: `
      <svg viewBox="0 0 540 220" style="width:100%; max-width:540px; height:auto; font-family:inherit;">
        <defs>
          <linearGradient id="gradGlom" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ef4444" stop-opacity="0.2" />
            <stop offset="100%" stop-color="#ef4444" stop-opacity="0.05" />
          </linearGradient>
          <linearGradient id="gradTubule" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0284c7" stop-opacity="0.2" />
            <stop offset="100%" stop-color="#0284c7" stop-opacity="0.05" />
          </linearGradient>
        </defs>

        <!-- Glomerulus & Afferent/Efferent Arterioles -->
        <rect x="20" y="30" width="150" height="150" rx="12" fill="url(#gradGlom)" stroke="#ef4444" stroke-width="2" />
        <text x="95" y="55" text-anchor="middle" font-size="12" font-weight="800" fill="#b91c1c">CẦU THẬN</text>
        
        <!-- Afferent Arteriole -->
        <path d="M 20 80 L -10 80" stroke="#ef4444" stroke-width="6" stroke-linecap="round" />
        <text x="35" y="105" font-size="10" font-weight="700" fill="#b91c1c">Tiểu ĐM Vào (Co lại ➔ Giảm áp lực lọc P_GC)</text>

        <!-- Proximal Tubule & SGLT2 block -->
        <rect x="200" y="30" width="160" height="150" rx="12" fill="url(#gradTubule)" stroke="#0284c7" stroke-width="2" />
        <text x="280" y="55" text-anchor="middle" font-size="12" font-weight="800" fill="#0369a1">ỐNG LƯỢN GẦN</text>
        <rect x="220" y="70" width="120" height="35" rx="6" fill="#0284c7" />
        <text x="280" y="92" text-anchor="middle" font-size="11" font-weight="700" fill="#ffffff">SGLT2i ỨC CHẾ 🚫</text>
        <text x="280" y="125" text-anchor="middle" font-size="9.5" fill="#334155">Giảm tái hấp thu Na+ &amp; Glucose</text>
        <text x="280" y="145" text-anchor="middle" font-size="9.5" font-weight="700" fill="#0284c7">➔ Tăng Na+ đến Macula Densa</text>

        <!-- Macula Densa & Feedback Loop -->
        <rect x="390" y="30" width="130" height="150" rx="12" fill="rgba(16,185,129,0.1)" stroke="#10b981" stroke-width="2" />
        <text x="455" y="55" text-anchor="middle" font-size="11.5" font-weight="800" fill="#047857">MACULA DENSA</text>
        <text x="455" y="85" text-anchor="middle" font-size="10" fill="#065f46">Tiết Adenosine</text>
        
        <!-- Feedback Arrow back to Glomerulus -->
        <path d="M 390 120 C 300 200, 150 200, 70 150" fill="none" stroke="#10b981" stroke-width="3" stroke-dasharray="5,4" marker-end="url(#arrow)" />
        <text x="260" y="205" text-anchor="middle" font-size="10" font-weight="800" fill="#047857">Phản Hồi Ống - Cầu Thận (TGF Feedback) ➔ Bảo Vệ Thận Lâu Dài</text>
      </svg>
    `,
    clinicalEffectSummary: 'SGLT2i phục hồi phản hồi ống - cầu thận (TGF), làm co tiểu động mạch đến, giảm áp lực lọc vi cầu thận, giảm đạm niệu và làm chậm suy giảm GFR bền vững.',
    guidelineRecommendation: 'Khuyến cáo Class I / LOE A theo KDIGO 2024 / ADA 2026 / ESC 2024 cho bệnh nhân CKD, HFrEF, HFpEF và ĐTĐ Type 2.'
  },

  arni: {
    type: 'arni',
    title: 'Cơ Chế Kép Của ARNI (Sacubitril / Valsartan)',
    drugClass: 'ARNI (Sacubitril / Valsartan)',
    primaryTarget: 'Ức chế đồng thời Enzyme Neprilysin + Thụ thể Angiotensin II Type 1 (AT1)',
    svgHtml: `
      <svg viewBox="0 0 540 200" style="width:100%; max-width:540px; height:auto; font-family:inherit;">
        <!-- Left: Sacubitril block -->
        <rect x="20" y="25" width="230" height="150" rx="10" fill="rgba(16,185,129,0.08)" stroke="#10b981" stroke-width="2" />
        <text x="135" y="50" text-anchor="middle" font-size="12" font-weight="800" fill="#047857">SACUBITRIL (ỨC CHẾ NEPRILYSIN)</text>
        <text x="135" y="75" text-anchor="middle" font-size="10" fill="#334155">Ngăn thoái giáng Peptid Lợi Niệu</text>
        <rect x="45" y="90" width="180" height="30" rx="6" fill="#10b981" />
        <text x="135" y="110" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">TĂNG NỒNG ĐỘ BNP, ANP</text>
        <text x="135" y="145" text-anchor="middle" font-size="9.5" font-weight="700" fill="#047857">➔ Giãn mạch, Lợi niệu &amp; Chống xơ hóa</text>

        <!-- Plus Icon -->
        <circle cx="270" cy="100" r="14" fill="#0284c7" />
        <text x="270" y="105" text-anchor="middle" font-size="16" font-weight="900" fill="#fff">+</text>

        <!-- Right: Valsartan block -->
        <rect x="290" y="25" width="230" height="150" rx="10" fill="rgba(2,132,199,0.08)" stroke="#0284c7" stroke-width="2" />
        <text x="405" y="50" text-anchor="middle" font-size="12" font-weight="800" fill="#0369a1">VALSARTAN (CHẸN THỤ THỂ AT1)</text>
        <text x="405" y="75" text-anchor="middle" font-size="10" fill="#334155">Chẹn tác động của Angiotensin II</text>
        <rect x="315" y="90" width="180" height="30" rx="6" fill="#0284c7" />
        <text x="405" y="110" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">CHẶN CO MẠCH &amp; TIẾT ALDOSTERON</text>
        <text x="405" y="145" text-anchor="middle" font-size="9.5" font-weight="700" fill="#0369a1">➔ Hạ HA &amp; Ngăn tái cấu trúc cơ tim</text>
      </svg>
    `,
    clinicalEffectSummary: 'Cơ chế kép tăng cường peptid lợi niệu tự nhiên đồng thời triệt tiêu trục RAAS gây co mạch, giúp cải thiện vượt trội phân suất tống máu và giảm tử vong do suy tim.',
    guidelineRecommendation: 'Khuyến cáo Class I / LOE A theo ESC 2024 / AHA 2022 ưu tiên thay thế ACEi/ARB ở bệnh nhân HFrEF.'
  },

  glp1: {
    type: 'glp1',
    title: 'Cơ Chế Trục Incretin Của Đồng Vận Thụ Thể GLP-1 (GLP-1 RA)',
    drugClass: 'GLP-1 Receptor Agonists (Semaglutide, Liraglutide, Dulaglutide)',
    primaryTarget: 'Thụ thể GLP-1 tại Tế bào Beta Tụy, Dạ dày, Tim mạch & Vùng Dưới Đồi',
    svgHtml: `
      <svg viewBox="0 0 540 200" style="width:100%; max-width:540px; height:auto; font-family:inherit;">
        <rect x="20" y="20" width="500" height="160" rx="12" fill="rgba(139,92,246,0.06)" stroke="#8b5cf6" stroke-width="2" />
        <text x="270" y="45" text-anchor="middle" font-size="13" font-weight="800" fill="#6d28d9">ĐỒNG VẬN THỤ THỂ GLP-1 (GLP-1 RA)</text>

        <!-- 4 Target Boxes -->
        <g transform="translate(35, 65)">
          <rect x="0" y="0" width="110" height="95" rx="8" fill="#fff" stroke="#8b5cf6" />
          <text x="55" y="25" text-anchor="middle" font-size="10.5" font-weight="800" fill="#6d28d9">TỤY NỘI TIẾT</text>
          <text x="55" y="48" text-anchor="middle" font-size="9" fill="#334155">↑ Tiết Insulin</text>
          <text x="55" y="65" text-anchor="middle" font-size="9" fill="#334155">↓ Glucagon</text>
          <text x="55" y="82" text-anchor="middle" font-size="8.5" font-weight="700" fill="#10b981">(Theo Glucose)</text>
        </g>

        <g transform="translate(155, 65)">
          <rect x="0" y="0" width="110" height="95" rx="8" fill="#fff" stroke="#8b5cf6" />
          <text x="55" y="25" text-anchor="middle" font-size="10.5" font-weight="800" fill="#6d28d9">DẠ DÀY</text>
          <text x="55" y="50" text-anchor="middle" font-size="9" fill="#334155">Làm chậm</text>
          <text x="55" y="68" text-anchor="middle" font-size="9" fill="#334155">rỗng dạ dày</text>
          <text x="55" y="85" text-anchor="middle" font-size="8.5" font-weight="700" fill="#0284c7">↓ Đỉnh Glucose</text>
        </g>

        <g transform="translate(275, 65)">
          <rect x="0" y="0" width="110" height="95" rx="8" fill="#fff" stroke="#8b5cf6" />
          <text x="55" y="25" text-anchor="middle" font-size="10.5" font-weight="800" fill="#6d28d9">NÃO BỘ (HẠ ĐỒI)</text>
          <text x="55" y="50" text-anchor="middle" font-size="9" fill="#334155">Kích hoạt</text>
          <text x="55" y="68" text-anchor="middle" font-size="9" fill="#334155">trung tâm no</text>
          <text x="55" y="85" text-anchor="middle" font-size="8.5" font-weight="700" fill="#f59e0b">↓ Thèm ăn &amp; Cân</text>
        </g>

        <g transform="translate(395, 65)">
          <rect x="0" y="0" width="110" height="95" rx="8" fill="#fff" stroke="#8b5cf6" />
          <text x="55" y="25" text-anchor="middle" font-size="10.5" font-weight="800" fill="#6d28d9">TIM &amp; MẠCH MÁU</text>
          <text x="55" y="50" text-anchor="middle" font-size="9" fill="#334155">Giảm viêm</text>
          <text x="55" y="68" text-anchor="middle" font-size="9" fill="#334155">ổn định mảng vữa</text>
          <text x="55" y="85" text-anchor="middle" font-size="8.5" font-weight="700" fill="#ef4444">↓ Biến cố MACE</text>
        </g>
      </svg>
    `,
    clinicalEffectSummary: 'Tác động toàn thân trên trục chuyển hóa não - ruột - tụy - tim mạch, giúp hạ đường huyết an toàn không gây hạ đường huyết quá mức và giảm cân nặng, bảo vệ tim mạch vượt trội.',
    guidelineRecommendation: 'Khuyến cáo Class I / LOE A theo ADA 2026 / ESC 2024 cho bệnh nhân ĐTĐ kèm bệnh tim mạch xơ vữa (ASCVD) hoặc Béo phì.'
  },

  doac: {
    type: 'doac',
    title: 'Cơ Chế Ức Chế Trực Tiếp Của Thuốc Kháng Đông Đường Uống Thế Hệ Mới (DOACs)',
    drugClass: 'DOACs (Rivaroxaban, Apixaban, Edoxaban, Dabigatran)',
    primaryTarget: 'Ức chế chọn lọc trực tiếp Yếu tố Xa tự do/gắn kết và Yếu tố IIa Thrombin',
    svgHtml: `
      <svg viewBox="0 0 540 180" style="width:100%; max-width:540px; height:auto; font-family:inherit;">
        <!-- Factor X -> Xa -->
        <rect x="30" y="30" width="200" height="120" rx="10" fill="rgba(2,132,199,0.08)" stroke="#0284c7" stroke-width="2" />
        <text x="130" y="55" text-anchor="middle" font-size="12" font-weight="800" fill="#0369a1">ỨC CHẾ YẾU TỐ Xa</text>
        <text x="130" y="80" text-anchor="middle" font-size="10.5" font-weight="700" fill="#334155">Rivaroxaban, Apixaban, Edoxaban</text>
        <rect x="50" y="95" width="160" height="30" rx="6" fill="#0284c7" />
        <text x="130" y="115" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">CHẶN TẠO THROMBIN 🚫</text>

        <!-- Arrow to Thrombin -->
        <path d="M 230 90 L 300 90" stroke="#94a3b8" stroke-width="3" stroke-dasharray="4,4" />

        <!-- Factor IIa Thrombin -->
        <rect x="310" y="30" width="200" height="120" rx="10" fill="rgba(220,38,38,0.08)" stroke="#dc2626" stroke-width="2" />
        <text x="410" y="55" text-anchor="middle" font-size="12" font-weight="800" fill="#b91c1c">ỨC CHẾ YẾU TỐ IIa (THROMBIN)</text>
        <text x="410" y="80" text-anchor="middle" font-size="10.5" font-weight="700" fill="#334155">Dabigatran</text>
        <rect x="330" y="95" width="160" height="30" rx="6" fill="#dc2626" />
        <text x="410" y="115" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">CHẶN TẠO FIBRIN 🚫</text>
      </svg>
    `,
    clinicalEffectSummary: 'Ức chế đích danh và trực tiếp một yếu tố duy nhất trong dòng thác đông máu mà không cần phụ thuộc Vitamin K, giúp đạt nồng độ dự đoán được và giảm 50% nguy cơ xuất huyết não so với Warfarin.',
    guidelineRecommendation: 'Khuyến cáo Class I / LOE A theo ESC 2024 / AHA 2023 ưu tiên hàng đầu thay thế Kháng Vitamin K trong Rung nhĩ không do van tim.'
  }
};

/**
 * Render HTML MoA Card với SVG
 */
export function renderMoACardHtml(drugType: MoADrugType): string {
  const def = MOA_DEFINITIONS[drugType];
  if (!def) return '';

  return `
    <div class="moa-card-container" style="background:var(--color-surface, #fff); border:1px solid var(--color-border, #e2e8f0); border-radius:12px; padding:16px 18px; margin-bottom:1.5rem; box-shadow:0 3px 12px rgba(0,0,0,0.04);">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; border-bottom:1px solid var(--color-border); padding-bottom:8px;">
        <div>
          <span style="font-size:11px; font-weight:800; text-transform:uppercase; color:#0284c7; display:flex; align-items:center; gap:5px;">
            <i class="fa-solid fa-atom"></i> Sơ Đồ Cơ Chế Phân Tử (Mechanism of Action)
          </span>
          <h4 style="margin:2px 0 0; font-size:15px; font-weight:800; color:var(--color-text);">${escapeHtml(def.title)}</h4>
        </div>
        <span class="dsp-badge" style="background:rgba(2,132,199,0.1); color:#0284c7; font-weight:700; font-size:11px;">
          ${escapeHtml(def.drugClass)}
        </span>
      </div>

      <!-- Pure SVG Visualizer -->
      <div style="background:var(--color-bg, #f8fafc); border:1px solid var(--color-border); border-radius:8px; padding:12px; text-align:center; overflow-x:auto; margin-bottom:12px;">
        ${def.svgHtml}
      </div>

      <!-- Clinical Insights -->
      <div style="font-size:12.5px; line-height:1.5; color:var(--color-text);">
        <p style="margin:0 0 6px;"><strong>💡 Tác động lâm sàng:</strong> ${escapeHtml(def.clinicalEffectSummary)}</p>
        <p style="margin:0; color:#047857; background:rgba(16,185,129,0.08); padding:6px 10px; border-radius:6px; font-size:11.5px;">
          <strong>🎯 Khuyến cáo Guideline EBM:</strong> ${escapeHtml(def.guidelineRecommendation)}
        </p>
      </div>
    </div>
  `;
}

function escapeHtml(str: string): string {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
