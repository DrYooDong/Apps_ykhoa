/**
 * Dose Equivalence Clinical Calculator
 * Quy Đổi Liều Tương Đương Corticosteroid & Opioid
 */

import { BaseCalculator, CalculatorResult } from '../types';
import { SoapPatientRecord } from '../../types';

export const doseEquivalenceCalculator: BaseCalculator = {
  id: 'dose-equivalence',
  name: 'Quy Đổi Liều Tương Đương Thuốc (Corticoid / Opioid)',
  shortName: 'Quy Đổi Liều Thuốc',
  specialty: 'general',
  specialtyLabel: 'Dược Lâm sàng & Giảm đau',
  description: 'Tính toán chuyển đổi liều tương đương giữa các loại Corticosteroid (kháng viêm, giữ muối khoáng) và Quy đổi Opioid sang Morphine đường uống (OME/MEDD).',
  icon: 'fa-solid fa-scale-balanced',
  evidenceReference: 'CDC Guideline for Prescribing Opioids for Chronic Pain (2022); UpToDate Corticosteroid Equivalency Chart.',
  fields: [
    {
      id: 'category',
      label: 'Nhóm thuốc quy đổi',
      type: 'select',
      defaultValue: 'corticoid',
      options: [
        { value: 'corticoid', label: '1. Corticosteroids (Kháng viêm Glucocorticoid)' },
        { value: 'opioid', label: '2. Opioids (Chuyển đổi sang Morphine uống - OME)' }
      ]
    },
    {
      id: 'sourceCorticoid',
      label: 'Corticoid ban đầu',
      type: 'select',
      defaultValue: 'prednisone',
      options: [
        { value: 'hydrocortisone', label: 'Hydrocortisone (Viên/Tiêm)' },
        { value: 'prednisone', label: 'Prednisone (Uống)' },
        { value: 'prednisolone', label: 'Prednisolone (Uống/Tiêm)' },
        { value: 'methylprednisolone', label: 'Methylprednisolone (Medrol/Solu-Medrol)' },
        { value: 'triamcinolone', label: 'Triamcinolone' },
        { value: 'dexamethasone', label: 'Dexamethasone' },
        { value: 'betamethasone', label: 'Betamethasone' }
      ]
    },
    {
      id: 'corticoidDose',
      label: 'Liều Corticoid hiện tại',
      type: 'number',
      unit: 'mg/ngày',
      min: 0.1,
      max: 2000,
      step: 0.5,
      placeholder: 'VD: 16 mg'
    },
    {
      id: 'sourceOpioid',
      label: 'Opioid ban đầu',
      type: 'select',
      defaultValue: 'morphine_oral',
      options: [
        { value: 'morphine_oral', label: 'Morphine uống' },
        { value: 'morphine_iv', label: 'Morphine tiêm IV/SC' },
        { value: 'fentanyl_patch', label: 'Fentanyl dán qua da (mcg/h)' },
        { value: 'fentanyl_iv', label: 'Fentanyl tiêm IV (mcg)' },
        { value: 'oxycodone_oral', label: 'Oxycodone uống' },
        { value: 'tramadol_oral', label: 'Tramadol uống' },
        { value: 'codeine_oral', label: 'Codeine uống' }
      ]
    },
    {
      id: 'opioidDose',
      label: 'Liều Opioid hiện tại (tổng 24h)',
      type: 'number',
      unit: 'mg/24h (hoặc mcg/h)',
      min: 0.1,
      max: 5000,
      step: 0.5,
      placeholder: 'VD: 30'
    },
    {
      id: 'crossToleranceReduction',
      label: 'Giảm liều phòng Dung nạp chéo (Cross-tolerance)',
      type: 'select',
      defaultValue: '25',
      options: [
        { value: '0', label: '0% (Không giảm - giữ nguyên liều tương đương)' },
        { value: '25', label: '25% (Khuyến nghị khi đổi sang Opioid mới)' },
        { value: '50', label: '50% (Bệnh nhân cao tuổi, suy tạng, đau chưa kiểm soát)' }
      ]
    }
  ],

  calculate(inputs: Record<string, any>): CalculatorResult {
    const category = inputs.category || 'corticoid';
    const details: string[] = [];

    // --- 1. CORTICOSTEROID EQUIVALENCY ---
    if (category === 'corticoid') {
      const drug = inputs.sourceCorticoid || 'prednisone';
      const dose = parseFloat(inputs.corticoidDose) || 20;

      // Chuẩn: 5mg Prednisone = 5mg Prednisolone = 4mg Methylpred = 4mg Triamcinolone = 0.75mg Dexa = 0.6mg Beta = 20mg Hydrocortisone
      const equivFactor: Record<string, { equiv: number; mineral: number; name: string }> = {
        hydrocortisone: { equiv: 20, mineral: 2, name: 'Hydrocortisone' },
        prednisone: { equiv: 5, mineral: 1, name: 'Prednisone' },
        prednisolone: { equiv: 5, mineral: 1, name: 'Prednisolone' },
        methylprednisolone: { equiv: 4, mineral: 0, name: 'Methylprednisolone' },
        triamcinolone: { equiv: 4, mineral: 0, name: 'Triamcinolone' },
        dexamethasone: { equiv: 0.75, mineral: 0, name: 'Dexamethasone' },
        betamethasone: { equiv: 0.6, mineral: 0, name: 'Betamethasone' }
      };

      const current = equivFactor[drug] || equivFactor.prednisone;
      // Quy về đơn vị Prednisone chuẩn (mg)
      const standardPredEquiv = (dose / current.equiv) * 5;

      details.push(`Liều ban đầu: ${current.name} ${dose} mg/ngày`);
      details.push(`Tương đương Prednisone: ${standardPredEquiv.toFixed(1)} mg/ngày`);
      details.push(`--- Bảng Quy Đổi Liều Tương Đương ---`);
      details.push(`• Hydrocortisone: ${(standardPredEquiv * 4).toFixed(1)} mg/ngày (Kháng viêm 1, Giữ muối nước cao)`);
      details.push(`• Prednisone / Prednisolone: ${standardPredEquiv.toFixed(1)} mg/ngày (Kháng viêm 4)`);
      details.push(`• Methylprednisolone: ${(standardPredEquiv * 0.8).toFixed(1)} mg/ngày (Kháng viêm 5, Không giữ muối)`);
      details.push(`• Dexamethasone: ${(standardPredEquiv * 0.15).toFixed(2)} mg/ngày (Kháng viêm 25-30, Tác dụng kéo dài)`);

      const isHighDose = standardPredEquiv >= 40;
      const label = `Tương đương Prednisone = ${standardPredEquiv.toFixed(1)} mg/ngày (${(standardPredEquiv * 0.8).toFixed(1)}mg Methylpred)`;

      return {
        label,
        severity: isHighDose ? 'high' : 'low',
        recommendation: standardPredEquiv > 20
          ? 'Liều kháng viêm cao / ức chế miễn dịch: Cần dự phòng loét dạ dày (PPI), bổ sung Canxi/Vitamin D, theo dõi đường huyết, huyết áp và nguy cơ suy tuyến thượng thận khi giảm liều đột ngột (cần giảm liều bậc thang nếu dùng > 2-3 tuần).'
          : 'Liều sinh lý / kháng viêm nhẹ đến trung bình.',
        details,
        textForInsert: `[Quy đổi Corticoid]: ${current.name} ${dose}mg ➔ Tương đương: Prednisone ${standardPredEquiv.toFixed(1)}mg | Methylprednisolone ${(standardPredEquiv * 0.8).toFixed(1)}mg | Dexamethasone ${(standardPredEquiv * 0.15).toFixed(2)}mg/ngày.`
      };
    }

    // --- 2. OPIOID EQUIVALENCY (OME) ---
    const sourceDrug = inputs.sourceOpioid || 'morphine_oral';
    const opioidDose = parseFloat(inputs.opioidDose) || 30;
    const reductionPercent = parseFloat(inputs.crossToleranceReduction) || 25;

    // Conversion factors to Oral Morphine Equivalent (OME)
    const omeFactors: Record<string, { factor: number; name: string }> = {
      morphine_oral: { factor: 1.0, name: 'Morphine uống' },
      morphine_iv: { factor: 3.0, name: 'Morphine tiêm IV/SC' },
      fentanyl_patch: { factor: 2.4, name: 'Fentanyl dán qua da (mcg/h ➔ OME mg/ngày: x 2.4)' },
      fentanyl_iv: { factor: 0.3, name: 'Fentanyl IV (mỗi 100mcg = 30mg OME)' },
      oxycodone_oral: { factor: 1.5, name: 'Oxycodone uống' },
      tramadol_oral: { factor: 0.1, name: 'Tramadol uống' },
      codeine_oral: { factor: 0.15, name: 'Codeine uống' }
    };

    const curOpioid = omeFactors[sourceDrug] || omeFactors.morphine_oral;
    const calculatedOME = opioidDose * curOpioid.factor;
    const adjustedOME = calculatedOME * (1 - reductionPercent / 100);

    details.push(`Liều ban đầu: ${curOpioid.name} ${opioidDose} đơn vị/ngày`);
    details.push(`Tổng liều Morphine uống tương đương (OME thô): ${calculatedOME.toFixed(1)} mg/ngày`);
    if (reductionPercent > 0) {
      details.push(`Giảm ${reductionPercent}% phòng dung nạp chéo (Incomplete Cross-tolerance): OME đích = ${adjustedOME.toFixed(1)} mg/ngày`);
    }

    details.push(`--- Liều Opioid Đích Đề Xuất (Đã trừ dung nạp chéo ${reductionPercent}%) ---`);
    details.push(`• Morphine uống: ${adjustedOME.toFixed(1)} mg/ngày (chia 4-6 cữ)`);
    details.push(`• Morphine IV/SC: ${(adjustedOME / 3).toFixed(1)} mg/ngày`);
    details.push(`• Oxycodone uống: ${(adjustedOME / 1.5).toFixed(1)} mg/ngày`);
    details.push(`• Fentanyl dán qua da: ${(adjustedOME / 2.4).toFixed(0)} mcg/h`);

    const isHighRiskOpioid = calculatedOME >= 50;
    const severity = calculatedOME >= 90 ? 'critical' : calculatedOME >= 50 ? 'high' : 'moderate';

    return {
      label: `Tổng OME = ${calculatedOME.toFixed(1)} mg/ngày (Đích chuyển đổi: ${adjustedOME.toFixed(1)} mg/ngày)`,
      severity,
      recommendation: calculatedOME >= 90
        ? 'CẢNH BÁO LIỀU OPIOID CAO (≥ 90 OME/ngày): Nguy cơ suy hô hấp và quá liều tử vong rất cao! Cần kê đơn Naloxone xịt mũi dự phòng, đánh giá lại chỉ định và cân nhắc giảm liều an toàn.'
        : calculatedOME >= 50
        ? 'Liều Opioid đáng chú ý (≥ 50 OME/ngày): Theo dõi sát tác dụng phụ (táo bón, buồn ngủ, ức chế hô hấp). Tránh phối hợp với Benzodiazepine.'
        : 'Liều Opioid trong giới hạn kiểm soát cơn đau thông thường.',
      details,
      textForInsert: `[Quy đổi Opioid OME]: ${curOpioid.name} ${opioidDose}/ngày ➔ OME: ${calculatedOME.toFixed(1)} mg/ngày. Đích sau giảm ${reductionPercent}% dung nạp chéo: ${adjustedOME.toFixed(1)} mg/ngày.`
    };
  }
};
