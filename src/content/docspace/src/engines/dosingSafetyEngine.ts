/**
 * DocSpace v2 — Pure Offline Dosing & Order Safety Sentinel Engine
 * Tính IBW, AdjBW, BMI, eGFR (CKD-EPI) và kiểm tra DDI + Chỉnh liều Thận/Gan + Chống chỉ định theo bệnh lý
 */

import { DRUG_DATABASE, ClinicalDrug } from '../../data/drug-interaction-database.ts';
import { calculateAdjBW, calculateIBW } from '../lib/diagnosticSynthesis.ts';
import { calculateEgfrCkdEpi } from '../lib/patientPhenotypeEngine.ts';
import { normalizeText } from '../lib/normalizeUtils.ts';
import { ClinicalFormState, LabsState } from '../types.ts';
import {
  OrderSafetyReport,
  OrderSandboxItem,
  PatientDosingMetrics,
  SafetyAlertItem,
} from '../schemas/docspaceV2.ts';

function parseNum(raw?: string): number | null {
  if (!raw || !raw.trim()) return null;
  const m = raw.replace(',', '.').match(/-?\d+(\.\d+)?/);
  if (!m) return null;
  const n = parseFloat(m[0]);
  return Number.isFinite(n) ? n : null;
}

function getCkdStage(eGfr: number | null): string | null {
  if (eGfr === null) return null;
  if (eGfr >= 90) return 'G1 (≥90)';
  if (eGfr >= 60) return 'G2 (60–89)';
  if (eGfr >= 45) return 'G3a (45–59)';
  if (eGfr >= 30) return 'G3b (30–44)';
  if (eGfr >= 15) return 'G4 (15–29)';
  return 'G5 (<15)';
}

export function computePatientDosingMetrics(
  form: ClinicalFormState,
  labs: LabsState
): PatientDosingMetrics {
  const weightKg = parseNum(form.canNang);
  const heightCm = parseNum(form.chieuCao);
  const age = parseNum(form.tuoi);
  const cre = parseNum(labs.lCre);

  const bmi =
    weightKg && heightCm && heightCm > 50
      ? Number((weightKg / Math.pow(heightCm / 100, 2)).toFixed(1))
      : null;

  const ibwKg = heightCm && heightCm >= 120 ? Number(calculateIBW(heightCm, form.gioiTinh).toFixed(1)) : null;
  const adjBwKg =
    weightKg && ibwKg && weightKg > ibwKg
      ? Number(calculateAdjBW(weightKg, ibwKg).toFixed(1))
      : weightKg;

  // Nhận diện Creatinine: nếu <= 25 thường là mg/dL -> đổi sang µmol/L (*88.4)
  let eGfr: number | null = null;
  if (cre !== null && cre > 0 && age !== null && age >= 18) {
    const creUmolL = cre <= 25 ? cre * 88.4 : cre;
    const rawEgfr = calculateEgfrCkdEpi(creUmolL, age, form.gioiTinh);
    eGfr = rawEgfr.egfr;
  }

  return {
    weightKg,
    heightCm,
    bmi,
    ibwKg,
    adjBwKg,
    eGfr,
    ckdStage: getCkdStage(eGfr),
  };
}

function matchDrugInDb(item: OrderSandboxItem): ClinicalDrug | null {
  if (item.drugKey && DRUG_DATABASE[item.drugKey]) {
    return DRUG_DATABASE[item.drugKey];
  }
  const normName = normalizeText(item.drugName);
  if (!normName) return null;

  for (const drug of Object.values(DRUG_DATABASE)) {
    const generic = normalizeText(drug.genericName);
    if (normName.includes(generic) || generic.includes(normName)) return drug;
    if (drug.brandNames.some((b) => normName.includes(normalizeText(b)))) return drug;
  }
  return null;
}

interface DiseaseContraindicationRule {
  id: string;
  diseasePattern: RegExp;
  drugPattern: RegExp;
  severity: 'contraindicated' | 'major';
  title: string;
  mechanism: string;
  recommendation: string;
}

const DISEASE_CONTRAINDICATION_RULES: DiseaseContraindicationRule[] = [
  {
    id: 'dengue_nsaid',
    diseasePattern: /dengue|sot xuat huyet/i,
    drugPattern: /ibuprofen|aspirin|diclofenac|meloxicam|celecoxib|ketorolac|naproxen|nsaid|piroxicam|corticoid|prednisolon|methylprednisolon|dexamethason/i,
    severity: 'contraindicated',
    title: 'CHỐNG CHỈ ĐỊNH TUYỆT ĐỐI trong Sốt xuất huyết Dengue',
    mechanism: 'Ức chế kết tập tiểu cầu, tổn thương niêm mạc dạ dày và làm nặng nguy cơ xuất huyết tiêu hóa / hội chứng Reye.',
    recommendation: 'Chỉ hạ sốt bằng Paracetamol (10–15 mg/kg/lần, tối đa 60 mg/kg/24h) kết hợp lau mát.',
  },
  {
    id: 'dka_metformin',
    diseasePattern: /toan ceton|dka|nhiem toan|soc|suy than cap/i,
    drugPattern: /metformin|glucophage|sglt2|dapagliflozin|empagliflozin/i,
    severity: 'contraindicated',
    title: 'NGƯNG NGAY Metformin / SGLT2i trong tình trạng cấp cứu toan chuyển hóa / sốc',
    mechanism: 'Metformin tăng nguy cơ nhiễm toan lactic tử vong; SGLT2i làm nặng thêm nhiễm toan ceton (Euglycemic DKA) và mất dịch.',
    recommendation: 'Tạm ngưng thuốc uống; kiểm soát đường huyết bằng Insulin truyền tĩnh mạch hoặc tiêm dưới da theo phác đồ nội trú.',
  },
  {
    id: 'asthma_nonselective_bb',
    diseasePattern: /hen|asthma|copd/i,
    drugPattern: /propranolol|carvedilol|nadolol|timolol/i,
    severity: 'contraindicated',
    title: 'Chẹn Beta không chọn lọc gây co thắt phế quản nặng',
    mechanism: 'Ức chế thụ thể Beta-2 cơ trơn phế quản, khởi phát cơn hen ác tính hoặc làm nặng đợt cấp COPD.',
    recommendation: 'Tránh nhóm không chọn lọc; nếu bắt buộc có chỉ định tim mạch, cân nhắc nhóm chọn lọc Beta-1 (Bisoprolol/Nebivolol) khi hết co thắt cấp.',
  },
  {
    id: 'gi_bleed_anticoag_nsaid',
    diseasePattern: /xuat huyet tieu hoa|loet da day|xhth/i,
    drugPattern: /ibuprofen|aspirin|diclofenac|warfarin|rivaroxaban|apixaban|enoxaparin|heparin|clopidogrel|nsaid/i,
    severity: 'contraindicated',
    title: 'Nguy cơ xuất huyết ồ ạt không kiểm soát',
    mechanism: 'Làm nặng tổn thương loét và ngăn cản hình thành cục máu đông cầm máu tại ổ loét.',
    recommendation: 'Ngưng tạm thời NSAID/kháng đông; khởi trị PPI tĩnh mạch liều cao và đánh giá nội soi cầm máu.',
  },
];

export function evaluateOrderSafety(
  orders: OrderSandboxItem[],
  form: ClinicalFormState,
  labs: LabsState,
  activeDiseaseContext: string
): OrderSafetyReport {
  const metrics = computePatientDosingMetrics(form, labs);
  const alerts: SafetyAlertItem[] = [];
  const activeOrders = orders.filter((o) => o.checked);
  const matchedDrugs: Array<{ order: OrderSandboxItem; drug: ClinicalDrug | null }> = activeOrders.map(
    (order) => ({ order, drug: matchDrugInDb(order) })
  );

  const normDiseaseCtx = normalizeText(
    `${activeDiseaseContext} ${form.lyDo} ${form.text.tc} ${form.text.cn}`
  );
  const lactate = parseNum(labs.lLactate);
  const plt = parseNum(labs.lTC);

  // 1. Kiểm tra Chống chỉ định theo Bệnh lý & Ngưỡng CLS
  for (const { order } of matchedDrugs) {
    const normDrug = normalizeText(order.drugName);
    for (const rule of DISEASE_CONTRAINDICATION_RULES) {
      if (rule.diseasePattern.test(normDiseaseCtx) && rule.drugPattern.test(normDrug)) {
        alerts.push({
          id: `disease_${rule.id}_${order.id}`,
          severity: rule.severity,
          type: 'disease_contraindication',
          drugInvolved: order.drugName,
          title: `${order.drugName}: ${rule.title}`,
          mechanism: rule.mechanism,
          recommendation: rule.recommendation,
        });
      }
    }

    // Cảnh báo chung dựa trên CLS nguy hiểm (Lactate >= 2 + Metformin; PLT < 50 + NSAID/Anticoag)
    if (lactate !== null && lactate >= 2 && /metformin/i.test(normDrug)) {
      alerts.push({
        id: `lab_lactate_${order.id}`,
        severity: 'contraindicated',
        type: 'warning',
        drugInvolved: order.drugName,
        title: `${order.drugName}: Lactate tăng (${lactate} mmol/L) — Nguy cơ toan lactic`,
        mechanism: 'Metformin ức chế tân tạo đường từ lactate tại gan, gây tích tụ lactate nặng.',
        recommendation: 'Ngưng Metformin ngay lập tức và đánh giá tưới máu mô.',
      });
    }

    if (
      plt !== null &&
      plt < 50 &&
      /aspirin|ibuprofen|diclofenac|warfarin|enoxaparin|heparin|rivaroxaban|nsaid/i.test(normDrug)
    ) {
      alerts.push({
        id: `lab_plt_${order.id}`,
        severity: 'contraindicated',
        type: 'warning',
        drugInvolved: order.drugName,
        title: `${order.drugName}: Tiểu cầu giảm nặng (${plt} G/L)`,
        mechanism: 'Nguy cơ xuất huyết nội sọ và xuất huyết tiêu hóa rất cao khi tiểu cầu < 50 G/L.',
        recommendation: 'Tạm ngưng thuốc kháng tiểu cầu/kháng đông/NSAID và hội chẩn chuyên khoa.',
      });
    }
  }

  // 2. Kiểm tra Chỉnh liều theo Thận (eGFR) từ DRUG_DATABASE
  if (metrics.eGfr !== null) {
    for (const { order, drug } of matchedDrugs) {
      if (!drug) continue;
      // Tìm mức renalAdjustment phù hợp nhất (ngưỡng cao nhất <= eGfr)
      const sorted = [...drug.renalAdjustments].sort((a, b) => b.egfrThreshold - a.egfrThreshold);
      const matchedRule = sorted.find((r) => metrics.eGfr! >= r.egfrThreshold) ?? sorted[sorted.length - 1];

      if (matchedRule && matchedRule.status !== 'normal') {
        alerts.push({
          id: `renal_${drug.id}_${order.id}`,
          severity:
            matchedRule.status === 'contraindicated'
              ? 'contraindicated'
              : matchedRule.status === 'reduce_dose'
              ? 'major'
              : 'moderate',
          type: 'renal',
          drugInvolved: order.drugName,
          title: `${drug.genericName} — Hiệu chỉnh liều thận (eGFR ${metrics.eGfr} mL/phút)`,
          mechanism: `Bệnh nhân có chức năng thận ${metrics.ckdStage ?? ''}, ảnh hưởng thải trừ thuốc qua thận.`,
          recommendation: matchedRule.recommendation,
        });
      }
    }
  }

  // 3. Kiểm tra Tương tác Thuốc — Thuốc (DDI) giữa các y lệnh đang chọn
  const seenPairs = new Set<string>();
  for (let i = 0; i < matchedDrugs.length; i++) {
    const a = matchedDrugs[i];
    if (!a.drug) continue;
    for (let j = 0; j < matchedDrugs.length; j++) {
      if (i === j) continue;
      const b = matchedDrugs[j];
      const normB = normalizeText(b.order.drugName);
      for (const inter of a.drug.interactions) {
        const hitById = b.drug && b.drug.id === inter.interactingDrugId;
        const hitByName = normB.includes(normalizeText(inter.interactingDrugName).split('/')[0].trim());
        if (hitById || hitByName) {
          const pairKey = [a.order.id, b.order.id].sort().join('__');
          if (seenPairs.has(pairKey)) continue;
          seenPairs.add(pairKey);

          alerts.push({
            id: `ddi_${pairKey}`,
            severity: inter.severity === 'minor' ? 'moderate' : inter.severity,
            type: 'ddi',
            drugInvolved: `${a.order.drugName} + ${b.order.drugName}`,
            title: `Tương tác thuốc (${inter.severity.toUpperCase()}): ${a.order.drugName} ↔ ${b.order.drugName}`,
            mechanism: `${inter.effect} (${inter.mechanism})`,
            recommendation: inter.management,
          });
        }
      }
    }
  }

  const dangerCount = alerts.filter((a) => a.severity === 'contraindicated' || a.severity === 'major').length;
  const safeCount = Math.max(0, activeOrders.length - dangerCount);

  return {
    metrics,
    alerts,
    safeCount,
    dangerCount,
  };
}
