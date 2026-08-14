/**
 * Thang điểm & Công thức CKD-EPI 2021 (eGFR) & Phân giai đoạn Bệnh thận mạn KDIGO
 * Ref: Inker LA, et al. NEJM 2021; 385:1737-1749. (Không dùng biến số chủng tộc)
 */

import { BaseCalculator, CalculatorResult } from '../types';
import { SoapPatientRecord } from '../../types';

export const ckdEpiCalculator: BaseCalculator = {
  id: 'ckd-epi',
  name: 'Độ Lọc Cầu Thận eGFR (CKD-EPI 2021) & Phân Giai Đoạn KDIGO',
  shortName: 'eGFR (CKD-EPI 2021)',
  specialty: 'nephrology',
  specialtyLabel: 'Thận - Tiết niệu',
  description: 'Tính toán mức lọc cầu thận ước tính theo khuyến cáo KDIGO 2024 không phụ thuộc chủng tộc, phân loại giai đoạn suy thận mạn G1 - G5.',
  icon: 'fa-solid fa-droplet',
  evidenceReference: 'Inker LA, et al. New England Journal of Medicine 2021 / KDIGO 2024 Guidelines',
  fields: [
    {
      id: 'serumCreatinine',
      label: 'Creatinine huyết thanh (Scr)',
      type: 'number',
      unit: 'mg/dL (hoặc µmol/L)',
      min: 0.1,
      max: 30,
      step: 0.01,
      placeholder: 'VD: 1.2 mg/dL',
      helpText: 'Nhập theo đơn vị mg/dL (nếu là µmol/L, chia cho 88.4)'
    },
    {
      id: 'unitType',
      label: 'Đơn vị Creatinine',
      type: 'select',
      defaultValue: 'mgdl',
      options: [
        { value: 'mgdl', label: 'mg/dL' },
        { value: 'umol', label: 'µmol/L' }
      ]
    },
    {
      id: 'age',
      label: 'Tuổi bệnh nhân',
      type: 'number',
      unit: 'tuổi',
      min: 18,
      max: 120,
      step: 1,
      placeholder: 'VD: 65'
    },
    {
      id: 'gender',
      label: 'Giới tính',
      type: 'select',
      defaultValue: 'male',
      options: [
        { value: 'male', label: 'Nam' },
        { value: 'female', label: 'Nữ' }
      ]
    }
  ],

  autofillFromPatient(patient: SoapPatientRecord): Partial<Record<string, any>> {
    const autofill: Record<string, any> = {};
    if (patient.age) autofill.age = patient.age;
    if (patient.gender) autofill.gender = (patient.gender as string) === 'nu' || (patient.gender as string) === 'female' ? 'female' : 'male';
    return autofill;
  },

  calculate(inputs: Record<string, any>): CalculatorResult {
    let scr = parseFloat(inputs.serumCreatinine);
    const age = parseFloat(inputs.age);
    const gender = inputs.gender || 'male';
    const unit = inputs.unitType || 'mgdl';

    if (isNaN(scr) || isNaN(age) || scr <= 0 || age <= 0) {
      return {
        label: 'Chưa đủ dữ liệu',
        severity: 'info',
        recommendation: 'Vui lòng nhập đầy đủ nồng độ Creatinine huyết thanh và tuổi bệnh nhân.',
        details: [],
        textForInsert: '[eGFR CKD-EPI 2021]: Chưa đủ thông số'
      };
    }

    if (unit === 'umol') {
      scr = scr / 88.4;
    }

    const isFemale = gender === 'female';
    const kappa = isFemale ? 0.7 : 0.9;
    const alpha = isFemale ? -0.241 : -0.302;
    const genderFactor = isFemale ? 1.012 : 1.0;

    const scrDivKappa = scr / kappa;
    const minTerm = Math.pow(Math.min(scrDivKappa, 1), alpha);
    const maxTerm = Math.pow(Math.max(scrDivKappa, 1), -1.2);
    const ageTerm = Math.pow(0.9938, age);

    const egfr = 142 * minTerm * maxTerm * ageTerm * genderFactor;
    const egfrRounded = Math.round(egfr * 10) / 10;

    let stage = '';
    let severity: 'low' | 'moderate' | 'high' | 'critical' = 'low';
    let recommendation = '';

    if (egfrRounded >= 90) {
      stage = 'G1 — Chức năng thận bình thường hoặc cao (eGFR ≥ 90 mL/min/1.73m²)';
      severity = 'low';
      recommendation = 'Theo dõi định kỳ hàng năm. Cần kết hợp xét nghiệm tỷ lệ Albumin/Creatinine niệu (UACR) để loại trừ tổn thương thận sớm.';
    } else if (egfrRounded >= 60) {
      stage = 'G2 — Giảm nhẹ chức năng thận (eGFR 60 - 89 mL/min/1.73m²)';
      severity = 'low';
      recommendation = 'Theo dõi mỗi 6-12 tháng. Kiểm soát huyết áp, đường huyết và tránh các thuốc gây độc cho thận (NSAIDs, Aminoglycoside).';
    } else if (egfrRounded >= 45) {
      stage = 'G3a — Giảm nhẹ đến trung bình (eGFR 45 - 59 mL/min/1.73m²)';
      severity = 'moderate';
      recommendation = 'Theo dõi mỗi 6 tháng. Khởi trị SGLT2i và ức chế hệ RAA (ACEi/ARB) theo KDIGO 2024 nếu có chỉ định. Hiệu chỉnh liều các thuốc thải qua thận.';
    } else if (egfrRounded >= 30) {
      stage = 'G3b — Giảm trung bình đến nặng (eGFR 30 - 44 mL/min/1.73m²)';
      severity = 'high';
      recommendation = 'Theo dõi mỗi 3-4 tháng. Tầm soát biến chứng thiếu máu do thận, rối loạn khoáng xương (CKD-MBD). Hiệu chỉnh chặt chẽ liều kháng sinh và thuốc hạ đường huyết.';
    } else if (egfrRounded >= 15) {
      stage = 'G4 — Giảm nặng chức năng thận (eGFR 15 - 29 mL/min/1.73m²)';
      severity = 'critical';
      recommendation = 'Chuyên khoa Thận học theo dõi. Chuẩn bị đường vào mạch máu (AVF) hoặc phương pháp thay thế thận. Kiểm soát toan kiềm, tăng kali máu và dịch thể tích.';
    } else {
      stage = 'G5 — Bệnh thận giai đoạn cuối / Suy thận mạn giai đoạn cuối (eGFR < 15 mL/min/1.73m²)';
      severity = 'critical';
      recommendation = 'Chỉ định điều trị thay thế thận (Lọc máu chu kỳ, Lọc màng bụng hoặc Ghép thận) khi có triệu chứng hội chứng urê máu cao hoặc quá tải dịch trơ.';
    }

    const details = [
      `Creatinine huyết thanh: ${scr.toFixed(2)} mg/dL (${(scr * 88.4).toFixed(0)} µmol/L)`,
      `Tuổi: ${age} · Giới tính: ${isFemale ? 'Nữ' : 'Nam'}`,
      `Công thức: CKD-EPI 2021 (Ref: Inker LA et al. NEJM 2021)`
    ];

    const textForInsert = `[eGFR CKD-EPI 2021]: ${egfrRounded} mL/min/1.73m² (Giai đoạn ${stage.split('—')[0]?.trim() || ''})\n• Nhận định: ${stage}\n• Khuyến cáo KDIGO: ${recommendation}`;

    return {
      score: egfrRounded,
      label: `eGFR = ${egfrRounded} mL/min/1.73m² (${stage.split('—')[0]?.trim() || ''})`,
      severity,
      recommendation,
      details,
      textForInsert
    };
  }
};
