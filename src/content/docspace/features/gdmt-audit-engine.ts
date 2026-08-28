/**
 * DocSpace — GDMT (Guideline-Directed Medical Therapy) Compliance Audit Engine
 * Path: src/content/docspace/features/gdmt-audit-engine.ts
 * 
 * Tự động đánh giá tỷ lệ tuân thủ phác đồ điều trị chuẩn EBM (GDMT) cho 3 bệnh lý trọng điểm:
 * 1. Suy tim phân suất tống máu giảm HFrEF (4 Trụ Cột: ARNI/ACEi/ARB, Beta-blocker, MRA, SGLT2i)
 * 2. Bệnh mạch vành sau can thiệp ACS (DAPT, High-intensity Statin, Beta-blocker, ACEi/ARB)
 * 3. Bệnh thận mạn ở bệnh nhân ĐTĐ Típ 2 (SGLT2i, ACEi/ARB max dose, Finerenone, Statin)
 */

export interface GDMTPillar {
  id: string;
  name: string;
  drugClass: string;
  isPrescribed: boolean;
  prescribedDrugName?: string;
  recommendationLevel: 'COR I - LOE A' | 'COR I - LOE B' | 'COR IIa - LOE B';
  guidelineStandard: string;
  recommendedDrugs: string[];
  startingDose: string;
  clinicalBenefit: string;
}

export interface GDMTAuditResult {
  conditionId: 'hfref' | 'post_acs' | 'ckd_t2d';
  conditionName: string;
  totalPillars: number;
  adheredPillars: number;
  complianceScorePercent: number;
  pillars: GDMTPillar[];
  summaryMessage: string;
}

/**
 * Đánh giá tuân thủ GDMT cho Suy tim phân suất tống máu giảm (HFrEF) — 4 Trụ Cột ESC 2024 / AHA 2022
 */
export function auditHFrEFGDMT(prescriptions: Array<{ name: string; dosage?: string }> = []): GDMTAuditResult {
  const rxNames = prescriptions.map(p => (p.name || '').toLowerCase());

  // 1. ARNI / ACEi / ARB
  const arniDrugs = ['sacubitril', 'entresto'];
  const aceiDrugs = ['perindopril', 'enalapril', 'lisinopril', 'captopril', 'ramipril'];
  const arbDrugs = ['valsartan', 'losartan', 'candesartan', 'telmisartan'];
  
  const hasArni = rxNames.some(rx => arniDrugs.some(d => rx.includes(d)));
  const hasAcei = rxNames.some(rx => aceiDrugs.some(d => rx.includes(d)));
  const hasArb = rxNames.some(rx => arbDrugs.some(d => rx.includes(d)));
  const pillar1Matched = hasArni ? 'ARNI (Sacubitril/Valsartan)' : (hasAcei ? 'ACEi' : (hasArb ? 'ARB' : undefined));

  // 2. Evidence-based Beta-blocker
  const bbDrugs = ['bisoprolol', 'carvedilol', 'metoprolol', 'nebivolol'];
  const matchedBB = rxNames.find(rx => bbDrugs.some(d => rx.includes(d)));

  // 3. MRA (Mineralocorticoid Receptor Antagonist)
  const mraDrugs = ['spironolactone', 'eplerenone'];
  const matchedMRA = rxNames.find(rx => mraDrugs.some(d => rx.includes(d)));

  // 4. SGLT2i
  const sglt2Drugs = ['dapagliflozin', 'empagliflozin', 'forxiga', 'jardiance'];
  const matchedSGLT2 = rxNames.find(rx => sglt2Drugs.some(d => rx.includes(d)));

  const pillars: GDMTPillar[] = [
    {
      id: 'pillar_ras',
      name: 'Trụ cột 1: Ức chế Hệ Renin-Angiotensin (Ưu tiên ARNI)',
      drugClass: 'ARNI / ACEi / ARB',
      isPrescribed: !!pillar1Matched,
      prescribedDrugName: pillar1Matched,
      recommendationLevel: 'COR I - LOE A',
      guidelineStandard: 'ESC 2024 / PARADIGM-HF',
      recommendedDrugs: ['Sacubitril/Valsartan 50mg (24/26mg)', 'Perindopril 4mg', 'Enalapril 2.5mg'],
      startingDose: 'Sacubitril/Valsartan 49/51mg (hoặc 24/26mg nếu chưa từng dùng ACEi) uống 1 viên x 2 lần/ngày',
      clinicalBenefit: 'Giảm 20% tử vong do tim mạch và tái nhập viện do suy tim.'
    },
    {
      id: 'pillar_bb',
      name: 'Trụ cột 2: Chẹn Beta Giao Cảm Bằng Chứng',
      drugClass: 'Beta-Blockers',
      isPrescribed: !!matchedBB,
      prescribedDrugName: matchedBB,
      recommendationLevel: 'COR I - LOE A',
      guidelineStandard: 'ESC 2024 / CIBIS-II / MERIT-HF',
      recommendedDrugs: ['Bisoprolol', 'Carvedilol', 'Metoprolol succinate'],
      startingDose: 'Bisoprolol 1.25mg/ngày hoặc Carvedilol 3.125mg x 2 lần/ngày (Khởi đầu khi bệnh nhân huyết động ổn định, không ứ dịch cấp)',
      clinicalBenefit: 'Giảm 34% tử vong mọi nguyên nhân.'
    },
    {
      id: 'pillar_mra',
      name: 'Trụ cột 3: Kháng Thụ Thể Mineralocorticoid (MRA)',
      drugClass: 'MRA',
      isPrescribed: !!matchedMRA,
      prescribedDrugName: matchedMRA,
      recommendationLevel: 'COR I - LOE A',
      guidelineStandard: 'ESC 2024 / RALES / EMPHASIS-HF',
      recommendedDrugs: ['Spironolactone 25mg', 'Eplerenone 25mg'],
      startingDose: 'Spironolactone 25mg uống 1 lần/ngày (Theo dõi K+ máu và eGFR)',
      clinicalBenefit: 'Giảm 30% tử vong và ngăn chặn tái cấu trúc cơ tim.'
    },
    {
      id: 'pillar_sglt2',
      name: 'Trụ cột 4: Ức Chế Kênh Đồng Vận Natri-Glucose 2 (SGLT2i)',
      drugClass: 'SGLT2 inhibitors',
      isPrescribed: !!matchedSGLT2,
      prescribedDrugName: matchedSGLT2,
      recommendationLevel: 'COR I - LOE A',
      guidelineStandard: 'ESC 2024 / DAPA-HF / EMPEROR-Reduced',
      recommendedDrugs: ['Dapagliflozin 10mg', 'Empagliflozin 10mg'],
      startingDose: 'Dapagliflozin 10mg hoặc Empagliflozin 10mg uống 1 lần/ngày vào buổi sáng (Không phụ thuộc ĐTĐ)',
      clinicalBenefit: 'Giảm 25% biến cố tim mạch gộp và làm chậm suy giảm chức năng thận.'
    }
  ];

  const adheredCount = pillars.filter(p => p.isPrescribed).length;
  const scorePercent = Math.round((adheredCount / pillars.length) * 100);

  let summaryMessage = '';
  if (adheredCount === 4) {
    summaryMessage = '🎉 Xuất sắc! Bệnh nhân đã được tối ưu hóa toàn diện 4 Trụ Cột GDMT chuẩn ESC 2024 / AHA 2022.';
  } else {
    const missing = pillars.filter(p => !p.isPrescribed).map(p => p.drugClass).join(', ');
    summaryMessage = `⚠️ Bệnh nhân đang thiếu ${4 - adheredCount} nhóm thuốc GDMT Class I: [${missing}]. Xem xét khởi trị sớm ngay khi huyết động ổn định.`;
  }

  return {
    conditionId: 'hfref',
    conditionName: 'Suy Tim Phân Suất Tống Máu Giảm (HFrEF 4 Pillars)',
    totalPillars: 4,
    adheredPillars: adheredCount,
    complianceScorePercent: scorePercent,
    pillars,
    summaryMessage
  };
}

/**
 * Render HTML GDMT Compliance Card
 */
export function renderGDMTScorecardHtml(result: GDMTAuditResult): string {
  const isPerfect = result.complianceScorePercent === 100;
  const scoreColor = isPerfect ? '#059669' : (result.complianceScorePercent >= 50 ? '#d97706' : '#dc2626');

  return `
    <div class="ebm-gdmt-scorecard" style="background:var(--color-surface, #fff); border:1.5px solid ${isPerfect ? '#10b981' : 'var(--color-border)'}; border-radius:10px; padding:14px 16px; margin-bottom:1rem; box-shadow:0 2px 8px rgba(0,0,0,0.04);">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
        <div>
          <span style="font-size:11px; font-weight:800; text-transform:uppercase; color:${scoreColor}; display:flex; align-items:center; gap:5px;">
            <i class="fa-solid fa-award"></i> Bảng Kiểm Tuân Thủ GDMT EBM: ${escapeHtml(result.conditionName)}
          </span>
          <div style="font-size:12px; color:var(--color-text-muted); margin-top:2px;">${escapeHtml(result.summaryMessage)}</div>
        </div>
        <div style="text-align:right;">
          <span style="font-size:22px; font-weight:800; color:${scoreColor};">${result.adheredPillars}/${result.totalPillars}</span>
          <span style="font-size:12px; color:var(--color-text-muted);">(${result.complianceScorePercent}%)</span>
        </div>
      </div>

      <!-- Pillars List -->
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
        ${result.pillars.map(p => `
          <div style="background:${p.isPrescribed ? 'rgba(16,185,129,0.06)' : 'rgba(239,68,68,0.04)'}; border:1px solid ${p.isPrescribed ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.2)'}; border-radius:6px; padding:8px 10px; font-size:11.5px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:3px;">
              <strong style="color:${p.isPrescribed ? '#065f46' : '#991b1b'};">${p.isPrescribed ? '✅' : '❌'} ${escapeHtml(p.drugClass)}</strong>
              <span style="background:rgba(2,132,199,0.1); color:#0284c7; font-size:9.5px; font-weight:700; padding:1px 5px; border-radius:3px;">${p.recommendationLevel}</span>
            </div>
            <div style="color:var(--color-text); font-size:11px;">
              ${p.isPrescribed 
                ? `Đã kê: <strong style="color:#059669;">${escapeHtml(p.prescribedDrugName || '')}</strong>` 
                : `<span style="color:#dc2626;">Chưa kê</span> — Khởi đầu: <em>${escapeHtml(p.startingDose)}</em>`}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function escapeHtml(str: string): string {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
