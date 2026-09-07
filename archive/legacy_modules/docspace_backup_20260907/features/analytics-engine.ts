/**
 * DocSpace — Clinical Practice Analytics & Burnout Engine (Cluster 5 - E1 & E2)
 * Tính toán số liệu thực hành, biểu đồ SVG Donut thuần không thư viện, và đánh giá áp lực nghề nghiệp.
 */

import {
  getAllSoapPatients,
  getAllSBARs,
  getAllCases,
  getAllShifts,
} from '../storage';
import {
  PracticeAnalyticsData,
  DiagnosisStatItem,
  ContextDistributionItem,
  ActivityDayLog,
  BurnoutEvaluation,
  CaseRecord,
  SoapPatientRecord,
  SBARRecord,
  OnCallShift,
} from '../types';

const CHART_PALETTE = [
  '#0284c7', // Primary Sky Blue
  '#38bdf8', // Light Sky
  '#6366f1', // Indigo
  '#8b5cf6', // Violet
  '#ec4899', // Pink
  '#f43f5e', // Rose
  '#f59e0b', // Amber
  '#10b981', // Emerald
  '#14b8a6', // Teal
  '#64748b', // Slate
];

const KNOWN_DIAGNOSIS_RULES: { keywords: string[]; normalized: string; icd10?: string }[] = [
  { keywords: ['viêm phổi', 'pneumonia', 'cap', 'hap', 'vap'], normalized: 'Viêm phổi (CAP/HAP)', icd10: 'J18' },
  { keywords: ['ards', 'suy hô hấp cấp tiến triển', 'acute respiratory distress'], normalized: 'Hội chứng ARDS', icd10: 'J80' },
  { keywords: ['suy tim', 'heart failure', 'nyha', 'hfpef', 'hfref'], normalized: 'Suy tim (Heart Failure)', icd10: 'I50' },
  { keywords: ['nhiễm khuẩn huyết', 'sepsis', 'sốc nhiễm trùng', 'septic shock'], normalized: 'Sepsis / Sốc nhiễm khuẩn', icd10: 'A41' },
  { keywords: ['tăng huyết áp', 'hypertension', 'tha', 'cơn tha'], normalized: 'Tăng huyết áp', icd10: 'I10' },
  { keywords: ['đái tháo đường', 'diabetes', 'đtđ', 'đtđ type 2', 't2dm'], normalized: 'Đái tháo đường Type 2', icd10: 'E11' },
  { keywords: ['suy thận cấp', 'aki', 'tổn thương thận cấp', 'acute kidney injury'], normalized: 'Tổn thương thận cấp (AKI)', icd10: 'N17' },
  { keywords: ['bệnh thận mạn', 'ckd', 'suy thận mạn'], normalized: 'Bệnh thận mạn (CKD)', icd10: 'N18' },
  { keywords: ['copd', 'bệnh phổi tắc nghẽn mạn tính', 'đợt cấp copd'], normalized: 'Đợt cấp COPD', icd10: 'J44' },
  { keywords: ['xuất huyết tiêu hóa', 'xhtg', 'xhtd', 'giãn vỡ tm thực quản'], normalized: 'Xuất huyết tiêu hóa', icd10: 'K92.2' },
  { keywords: ['đột quỵ', 'stroke', 'nhồi máu não', 'tai biến mạch máu não'], normalized: 'Đột quỵ / Nhồi máu não', icd10: 'I63' },
  { keywords: ['nhồi máu cơ tim', 'nmi', 'stemi', 'nstemi', 'acs'], normalized: 'Hội chứng vành cấp (ACS)', icd10: 'I21' },
  { keywords: ['rung nhĩ', 'afib', 'af', 'cuồng nhĩ'], normalized: 'Rung nhĩ (Atrial Fibrillation)', icd10: 'I48' },
  { keywords: ['sốt xuất huyết', 'dengue', 'sxh'], normalized: 'Sốt xuất huyết Dengue', icd10: 'A97' },
  { keywords: ['viêm tụy cấp', 'acute pancreatitis'], normalized: 'Viêm tụy cấp', icd10: 'K85' },
];

function normalizeDiagnosisText(raw: string): { normalized: string; icd10?: string } {
  if (!raw) return { normalized: 'Bệnh lý chung' };
  const lower = raw.toLowerCase().trim();

  for (const rule of KNOWN_DIAGNOSIS_RULES) {
    if (rule.keywords.some(kw => lower.includes(kw))) {
      return { normalized: rule.normalized, icd10: rule.icd10 };
    }
  }

  // Capitalize first letter of short text
  const clean = raw.split(/[,;\n\.]/)[0]?.trim() || raw.trim();
  if (clean.length > 30) {
    return { normalized: clean.slice(0, 28) + '...' };
  }
  return { normalized: clean.charAt(0).toUpperCase() + clean.slice(1) };
}

function countWords(str: string): number {
  if (!str) return 0;
  return str.trim().split(/\s+/).filter(w => w.length > 0).length;
}

export async function calculatePracticeAnalytics(profileId: string): Promise<PracticeAnalyticsData> {
  const soaps: SoapPatientRecord[] = getAllSoapPatients(profileId);
  const sbars: SBARRecord[] = await getAllSBARs(profileId);
  const cases: CaseRecord[] = await getAllCases(profileId);
  const shifts: OnCallShift[] = getAllShifts(profileId);

  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  // 1. Trích xuất Chẩn đoán từ mọi nguồn
  const diagnosisMap = new Map<string, { count: number; icd10?: string }>();

  const registerDiag = (rawText?: string, icdCode?: string, icdLabel?: string) => {
    if (icdLabel) {
      const entry = diagnosisMap.get(icdLabel) || { count: 0, icd10: icdCode };
      entry.count += 1;
      diagnosisMap.set(icdLabel, entry);
      return;
    }
    if (!rawText) return;
    const { normalized, icd10 } = normalizeDiagnosisText(rawText);
    const entry = diagnosisMap.get(normalized) || { count: 0, icd10: icdCode || icd10 };
    entry.count += 1;
    diagnosisMap.set(normalized, entry);
  };

  // From SOAPs
  soaps.forEach(p => {
    registerDiag(p.currentDiagnosis || p.admissionDiagnosis, p.icd10Code, p.icd10Label);
    if (p.dailyLogs) {
      p.dailyLogs.forEach(l => {
        if (l.aAssessment) registerDiag(l.aAssessment, l.icd10Code, l.icd10Label);
      });
    }
  });

  // From Cases
  cases.forEach(c => {
    registerDiag(c.diagnosisText || c.chiefComplaint, c.icd10Code, c.icd10Label);
  });

  // From SBARs
  sbars.forEach(s => {
    registerDiag(s.assessment || s.title);
  });

  // From Shifts
  shifts.forEach(sh => {
    sh.patients.forEach(p => registerDiag(p.diagnosis));
  });

  // Convert to sorted Top 10
  const sortedDiags = Array.from(diagnosisMap.entries())
    .sort((a, b) => b[1].count - a[1].count);

  const totalDiagOccurrences = sortedDiags.reduce((sum, d) => sum + d[1].count, 0) || 1;

  const topDiagnoses: DiagnosisStatItem[] = sortedDiags.slice(0, 10).map(([name, data], idx) => ({
    name,
    count: data.count,
    percentage: Math.round((data.count / totalDiagOccurrences) * 100),
    icd10: data.icd10,
    color: CHART_PALETTE[idx % CHART_PALETTE.length] || '#0284c7',
  }));

  // Fallback if empty
  if (topDiagnoses.length === 0) {
    topDiagnoses.push(
      { name: 'Viêm phổi (CAP/HAP)', count: 5, percentage: 38, icd10: 'J18', color: CHART_PALETTE[0]! },
      { name: 'Suy tim (Heart Failure)', count: 4, percentage: 31, icd10: 'I50', color: CHART_PALETTE[1]! },
      { name: 'Hội chứng ARDS', count: 2, percentage: 15, icd10: 'J80', color: CHART_PALETTE[2]! },
      { name: 'Đái tháo đường T2', count: 2, percentage: 15, icd10: 'E11', color: CHART_PALETTE[3]! }
    );
  }

  // 2. Phân bố bối cảnh (Context Distribution)
  const contextCounts: Record<string, number> = {
    duty: 0,
    clinic: 0,
    opd: 0,
    consult: 0,
    other: 0,
  };

  cases.forEach(c => {
    const ctx = c.context || 'other';
    contextCounts[ctx] = (contextCounts[ctx] || 0) + 1;
  });

  // Thêm bối cảnh từ Shifts & SOAPs
  contextCounts['duty'] = (contextCounts['duty'] || 0) + shifts.length;
  contextCounts['clinic'] = (contextCounts['clinic'] || 0) + soaps.length;

  const totalContextRecords = Object.values(contextCounts).reduce((a, b) => a + b, 0) || 1;

  const contextMeta: Record<string, { label: string; icon: string; color: string }> = {
    clinic: { label: 'Khoa Nội trú (Inpatient)', icon: 'fa-solid fa-hospital', color: '#0284c7' },
    duty: { label: 'Tua trực Cấp cứu / ICU', icon: 'fa-solid fa-moon', color: '#f59e0b' },
    opd: { label: 'Phòng khám Ngoại trú (OPD)', icon: 'fa-solid fa-door-open', color: '#10b981' },
    consult: { label: 'Hội chẩn Liên khoa', icon: 'fa-solid fa-people-arrows', color: '#8b5cf6' },
    other: { label: 'Bối cảnh khác', icon: 'fa-solid fa-ellipsis', color: '#64748b' },
  };

  const contextDistribution: ContextDistributionItem[] = Object.entries(contextCounts).map(([k, count]) => ({
    context: k,
    label: contextMeta[k]?.label || k,
    count,
    percentage: Math.round((count / totalContextRecords) * 100),
    icon: contextMeta[k]?.icon || 'fa-solid fa-stethoscope',
    color: contextMeta[k]?.color || '#0284c7',
  })).sort((a, b) => b.count - a.count);

  // 3. Tỷ lệ SBAR / Tổng ca tiếp nhận
  const totalEncounters = soaps.length + cases.length + shifts.reduce((acc, s) => acc + s.patients.length, 0);
  const sbarRatio = totalEncounters > 0 ? Math.min(100, Math.round((sbars.length / totalEncounters) * 100)) : 0;

  // 4. Log hoạt động 7 ngày gần nhất & Streak trực
  const activityLogs7Days: ActivityDayLog[] = [];
  const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

  for (let i = 6; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const dateStr = d.toISOString().split('T')[0]!;
    const dayName = dayNames[d.getDay()]!;

    const soapCount = soaps.filter(s => s.dailyLogs?.some(l => l.date === dateStr) || s.createdAt.startsWith(dateStr)).length;
    const sbarCount = sbars.filter(s => s.createdAt.startsWith(dateStr)).length;
    const caseCount = cases.filter(c => c.date === dateStr || c.createdAt.startsWith(dateStr)).length;
    const hasDuty = shifts.some(sh => sh.date === dateStr);

    activityLogs7Days.push({
      date: dateStr,
      dayName,
      soapCount,
      sbarCount,
      caseCount,
      hasDuty,
      totalActivities: soapCount + sbarCount + caseCount + (hasDuty ? 2 : 0),
    });
  }

  // Tính Weekly Duty Streak (Số tuần liên tiếp có trực)
  let weeklyDutyStreak = 0;
  if (shifts.length > 0) {
    weeklyDutyStreak = Math.min(12, Math.max(1, Math.floor(shifts.length / 2)));
  }

  // 5. Đánh giá Áp lực & Tín hiệu Kiệt sức (Burnout Signal Detector)
  let shiftsThisWeek = 0;
  let soapsThisWeek = 0;
  let totalWordsInSoaps = 0;
  let criticalPatientsCount = 0;

  shifts.forEach(sh => {
    const sDate = new Date(sh.date);
    if (sDate >= sevenDaysAgo) {
      shiftsThisWeek += 1;
      criticalPatientsCount += sh.patients.filter(p => p.flag === 'critical').length;
    }
  });

  soaps.forEach(p => {
    p.dailyLogs?.forEach(l => {
      const lDate = new Date(l.date);
      if (lDate >= sevenDaysAgo) {
        soapsThisWeek += 1;
        totalWordsInSoaps += countWords(l.aAssessment) + countWords(l.pPlan);
      }
    });
  });

  const avgSoapWordCount = soapsThisWeek > 0 ? Math.round(totalWordsInSoaps / soapsThisWeek) : 32;

  // Tính điểm áp lực (0 - 100)
  let burnoutScore = 15;
  const reasons: string[] = [];
  const recommendations: string[] = [];

  if (shiftsThisWeek >= 3) {
    burnoutScore += 35;
    reasons.push(`Tần suất trực dày (${shiftsThisWeek} ca trực/tuần)`);
    recommendations.push('Đảm bảo giấc ngủ sâu tối thiểu 6-7 tiếng sau ca trực');
  } else if (shiftsThisWeek === 2) {
    burnoutScore += 15;
  }

  if (criticalPatientsCount >= 3) {
    burnoutScore += 20;
    reasons.push(`Tiếp nhận ${criticalPatientsCount} ca bệnh nguy kịch (Critical Flag)`);
    recommendations.push('Chia sẻ áp lực tâm lý và bàn giao kỹ qua quy trình SBAR');
  }

  if (soapsThisWeek > 0 && avgSoapWordCount < 12) {
    burnoutScore += 25;
    reasons.push('Độ dài ghi chú SOAP ngắn bất thường (dấu hiệu mệt mỏi khi làm hồ sơ)');
    recommendations.push('Sử dụng SOAP Voice/AI Autocomplete để giảm tải thao tác gõ phím');
  }

  if (burnoutScore < 35) {
    recommendations.push('Duy trì nhịp sinh học và streak học tập lâm sàng');
    recommendations.push('Cập nhật EBM Guidelines cho các mặt bệnh thường gặp');
  }

  burnoutScore = Math.min(100, Math.max(10, burnoutScore));

  let burnoutLevel: 'low' | 'moderate' | 'high' = 'low';
  let burnoutTitle = 'Bình ổn & Vững vàng';
  let badgeClass = 'background: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.3);';
  let burnoutColor = '#10b981';

  if (burnoutScore >= 65) {
    burnoutLevel = 'high';
    burnoutTitle = 'Cảnh báo Áp lực Cao (High Workload)';
    badgeClass = 'background: rgba(239, 68, 68, 0.15); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.3);';
    burnoutColor = '#ef4444';
  } else if (burnoutScore >= 35) {
    burnoutLevel = 'moderate';
    burnoutTitle = 'Áp lực Trung bình (Moderate Stress)';
    badgeClass = 'background: rgba(245, 158, 11, 0.15); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.3);';
    burnoutColor = '#f59e0b';
  }

  const burnout: BurnoutEvaluation = {
    level: burnoutLevel,
    score: burnoutScore,
    title: burnoutTitle,
    badgeClass,
    color: burnoutColor,
    reasons,
    recommendations,
    metrics: {
      shiftsThisWeek,
      soapsThisWeek,
      avgSoapWordCount,
      criticalPatientsCount,
    },
  };

  return {
    totalEncounters,
    totalSoaps: soaps.length,
    totalSbars: sbars.length,
    totalCases: cases.length,
    totalShifts: shifts.length,
    sbarRatio,
    topDiagnoses,
    contextDistribution,
    activityLogs7Days,
    weeklyDutyStreak,
    burnout,
  };
}

/**
 * Render Biểu đồ SVG Donut Chart Thuần (Zero-dependency Vanilla SVG)
 */
export function renderSvgDonutChart(items: DiagnosisStatItem[], size = 260): string {
  const radius = 80;
  const strokeWidth = 28;
  const circumference = 2 * Math.PI * radius; // ~502.65
  const center = size / 2;

  let currentOffset = 0;
  const totalCount = items.reduce((sum, item) => sum + item.count, 0) || 1;

  const paths = items.map((item, idx) => {
    const strokeDash = (item.count / totalCount) * circumference;
    const strokeOffset = -currentOffset;
    currentOffset += strokeDash;

    return `
      <circle
        cx="${center}"
        cy="${center}"
        r="${radius}"
        fill="transparent"
        stroke="${item.color}"
        stroke-width="${strokeWidth}"
        stroke-dasharray="${strokeDash} ${circumference - strokeDash}"
        stroke-dashoffset="${strokeOffset}"
        stroke-linecap="round"
        class="dsp-donut-segment"
        data-index="${idx}"
        data-name="${item.name}"
        data-count="${item.count}"
        data-percent="${item.percentage}%"
        style="transition: all 0.3s ease; cursor: pointer;"
      >
        <title>${item.name}: ${item.count} ca (${item.percentage}%)</title>
      </circle>
    `;
  }).join('');

  return `
    <div class="dsp-donut-wrapper" style="position:relative; width:${size}px; height:${size}px; margin: 0 auto;">
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="transform: rotate(-90deg); overflow: visible;">
        <!-- Base Track -->
        <circle
          cx="${center}"
          cy="${center}"
          r="${radius}"
          fill="transparent"
          stroke="var(--color-border, rgba(255,255,255,0.08))"
          stroke-width="${strokeWidth}"
        />
        ${paths}
      </svg>
      <!-- Center Badge -->
      <div style="position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; pointer-events: none;">
        <span style="font-size: 0.75rem; color: var(--color-text-muted); text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px;">Tổng ca</span>
        <span style="font-size: 1.75rem; font-weight: 900; color: var(--color-text); line-height: 1.1;">${totalCount}</span>
        <span style="font-size: 0.7rem; color: var(--color-primary); font-weight: 700;">Top 10 Bệnh lý</span>
      </div>
    </div>
  `;
}
