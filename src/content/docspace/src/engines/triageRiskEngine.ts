/**
 * DocSpace v2 — Pure Offline Triage, Risk Score & Panic Lab Engine
 * Tính tức thì NEWS2, PEWS, qSOFA, ESI, MAP, Shock Index & Panic Lab Alerts (Zero side-effects)
 */

import { LAB_REFERENCE_DATABASE } from '../../data/lab-reference-database.ts';
import {
  calculateClinicalRiskScore,
  calculateEsiTriage,
  calculatePewsScore,
} from '../lib/riskScore.ts';
import { ClinicalFormState, LabsState, VitalsState } from '../types.ts';
import { PanicLabAlert, TriageSummaryV2 } from '../schemas/docspaceV2.ts';

interface LabMappingRule {
  field: keyof LabsState;
  dbKey: string;
}

const LAB_FIELD_TO_DB: LabMappingRule[] = [
  { field: 'lBC', dbKey: 'wbc' },
  { field: 'lTC', dbKey: 'plt' },
  { field: 'lHct', dbKey: 'hct' },
  { field: 'lINR', dbKey: 'inr' },
  { field: 'lTrop', dbKey: 'hs_troponin' },
  { field: 'lGlu', dbKey: 'glucose' },
  { field: 'lCre', dbKey: 'creatinine' },
  { field: 'lAST', dbKey: 'ast' },
  { field: 'lALT', dbKey: 'alt' },
  { field: 'lCRP', dbKey: 'crp' },
  { field: 'lLactate', dbKey: 'lactate' },
  { field: 'lBiliTP', dbKey: 'bilirubin_total' },
  { field: 'lAlb', dbKey: 'albumin' },
  { field: 'lNa', dbKey: 'sodium' },
  { field: 'lK', dbKey: 'potassium' },
];

function parseNumeric(raw?: string): number | null {
  if (!raw || !raw.trim()) return null;
  const cleaned = raw.replace(',', '.').match(/-?\d+(\.\d+)?/);
  if (!cleaned) return null;
  const num = parseFloat(cleaned[0]);
  return Number.isFinite(num) ? num : null;
}

export function evaluatePanicLabs(labs: LabsState, gender: 'nam' | 'nu' | 'khac'): PanicLabAlert[] {
  const alerts: PanicLabAlert[] = [];

  for (const mapping of LAB_FIELD_TO_DB) {
    const val = parseNumeric(labs[mapping.field]);
    if (val === null) continue;

    const ref = LAB_REFERENCE_DATABASE[mapping.dbKey];
    if (!ref) continue;

    // 1. Kiểm tra Critical / Panic Values trước
    if (ref.criticalLow !== undefined && val <= ref.criticalLow) {
      alerts.push({
        labField: mapping.field,
        labName: ref.vietnameseName,
        value: val,
        unit: ref.unit,
        severity: 'panic',
        direction: 'low',
        clinicalMeaning: ref.clinicalSignificanceLow,
      });
      continue;
    }

    if (ref.criticalHigh !== undefined && val >= ref.criticalHigh) {
      alerts.push({
        labField: mapping.field,
        labName: ref.vietnameseName,
        value: val,
        unit: ref.unit,
        severity: 'panic',
        direction: 'high',
        clinicalMeaning: ref.clinicalSignificanceHigh,
      });
      continue;
    }

    // 2. Kiểm tra bất thường ngoài khoảng tham chiếu
    const min =
      gender === 'nu'
        ? ref.normalRange.minFemale ?? ref.normalRange.min
        : ref.normalRange.minMale ?? ref.normalRange.min;
    const max =
      gender === 'nu'
        ? ref.normalRange.maxFemale ?? ref.normalRange.max
        : ref.normalRange.maxMale ?? ref.normalRange.max;

    if (min !== undefined && val < min) {
      alerts.push({
        labField: mapping.field,
        labName: ref.vietnameseName,
        value: val,
        unit: ref.unit,
        severity: 'abnormal',
        direction: 'low',
        clinicalMeaning: ref.clinicalSignificanceLow,
      });
    } else if (max !== undefined && val > max) {
      alerts.push({
        labField: mapping.field,
        labName: ref.vietnameseName,
        value: val,
        unit: ref.unit,
        severity: 'abnormal',
        direction: 'high',
        clinicalMeaning: ref.clinicalSignificanceHigh,
      });
    }
  }

  // Panic ưu tiên trước abnormal
  return alerts.sort((a, b) => (a.severity === 'panic' && b.severity !== 'panic' ? -1 : 1));
}

export function computeTriageSummary(
  form: ClinicalFormState,
  vitals: VitalsState,
  labs: LabsState
): TriageSummaryV2 {
  const ageNum = parseNumeric(form.tuoi);
  const isPediatric = ageNum !== null && ageNum < 16;

  const sbp = parseNumeric(vitals.vHATT);
  const dbp = parseNumeric(vitals.vHATTr);
  const hr = parseNumeric(vitals.vMach);
  const rr = parseNumeric(vitals.vTho);
  const spo2 = parseNumeric(vitals.vSpo2);
  const temp = parseNumeric(vitals.vNhiet);
  const gcs = parseNumeric(vitals.vGCS);

  const mapValue = sbp !== null && dbp !== null ? Math.round((sbp + 2 * dbp) / 3) : null;
  const shockIndex = hr !== null && sbp !== null && sbp > 0 ? Number((hr / sbp).toFixed(2)) : null;

  const riskScore = calculateClinicalRiskScore(vitals, labs, [], form);
  const pewsResult = isPediatric ? calculatePewsScore(vitals, labs, form) : null;
  const esiResult = calculateEsiTriage(vitals, labs, [], form);
  const panicLabs = evaluatePanicLabs(labs, form.gioiTinh);

  // Tính qSOFA chuẩn Sepsis-3 (0–3 điểm): RR >= 22, SBP <= 100, GCS < 15
  let qsofaScore = 0;
  if (rr !== null && rr >= 22) qsofaScore += 1;
  if (sbp !== null && sbp <= 100) qsofaScore += 1;
  if (gcs !== null && gcs < 15) qsofaScore += 1;

  const redFlags: string[] = [];

  if (sbp !== null && sbp < 90) {
    redFlags.push(`Tụt huyết áp (HATT ${sbp} mmHg) — Nguy cơ sốc`);
  } else if (sbp !== null && dbp !== null && sbp - dbp <= 20) {
    redFlags.push(`Huyết áp kẹp (${sbp}/${dbp} mmHg, hiệu áp ≤ 20) — Dấu hiệu sốc còn bù`);
  }
  if (mapValue !== null && mapValue < 65) {
    redFlags.push(`MAP ${mapValue} mmHg (< 65) — Giảm tưới máu tạng`);
  }
  if (shockIndex !== null && shockIndex >= 0.9) {
    redFlags.push(`Shock Index = ${shockIndex} (≥ 0.9) — Huyết động không ổn định`);
  }
  if (spo2 !== null && spo2 < 92) {
    redFlags.push(`Giảm oxy máu cấp (SpO₂ ${spo2}%) — Cần hỗ trợ oxy ngay`);
  }
  if (rr !== null && (rr >= 30 || rr <= 8)) {
    redFlags.push(`Nhịp thở nguy kịch (${rr} lần/phút) — Nguy cơ suy hô hấp`);
  }
  if (temp !== null && (temp >= 40 || temp < 35)) {
    redFlags.push(`Rối loạn thân nhiệt nặng (${temp}°C)`);
  }
  if (gcs !== null && gcs < 15) {
    redFlags.push(`Rối loạn tri giác (GCS ${gcs}/15)`);
  }

  // Thêm các Panic Lab Alerts vào danh sách cờ đỏ
  for (const lab of panicLabs) {
    if (lab.severity === 'panic') {
      redFlags.push(`CLS Báo động đỏ: ${lab.labName} = ${lab.value} ${lab.unit}`);
    }
  }

  let urgency = riskScore.levelCode;
  const hasPanicLab = panicLabs.some((p) => p.severity === 'panic');
  if (
    (sbp !== null && sbp < 90) ||
    (spo2 !== null && spo2 < 90) ||
    (gcs !== null && gcs <= 12) ||
    hasPanicLab
  ) {
    urgency = 'CRITICAL';
  } else if (redFlags.length > 0 && urgency === 'LOW') {
    urgency = 'HIGH';
  }

  const urgencyLabelMap: Record<TriageSummaryV2['urgency'], string> = {
    CRITICAL: 'NGUY KỊCH — Hồi sức / Xử trí ngay',
    HIGH: 'NGUY CƠ CAO — Đánh giá khẩn',
    MEDIUM: 'CẦN THEO DÕI SÁT — Có dấu hiệu cảnh báo',
    LOW: 'ỔN ĐỊNH TẠM THỜI',
  };

  return {
    urgency,
    urgencyLabel: urgencyLabelMap[urgency],
    news2Score: riskScore.vitalScore,
    qsofaScore,
    pewsScore: pewsResult ? pewsResult.totalScore : null,
    isPediatric,
    mapValue,
    shockIndex,
    esiLevel: esiResult.level,
    redFlags: Array.from(new Set(redFlags)),
    panicLabs,
  };
}
