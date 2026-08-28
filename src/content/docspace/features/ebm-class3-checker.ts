/**
 * DocSpace — EBM Class III Harm & Contraindication Checker Engine
 * Path: src/content/docspace/features/ebm-class3-checker.ts
 * 
 * Tự động đối chiếu chẩn đoán, bệnh nền và đơn thuốc của bệnh nhân với cơ sở dữ liệu
 * Khuyến cáo Class III (Harm - Chống chỉ định / Không có lợi) từ các Hướng dẫn lâm sàng
 * mới nhất (ESC 2024, AHA 2022, ADA 2026, GINA 2026, GOLD 2026, KDIGO 2024, Bộ Y Tế VN).
 */

export interface Class3Alert {
  id: string;
  condition: string;
  drugOrIntervention: string;
  severity: 'contraindication' | 'harm' | 'no_benefit';
  cor: 'Class III (Harm)' | 'Class III (No Benefit)';
  loe: 'A' | 'B' | 'C';
  guidelineSource: string;
  clinicalReason: string;
  alternativeRecommendation: string;
}

export const CLASS3_DATABASE: Class3Alert[] = [
  // 1. Tim mạch & Suy tim (Heart Failure & Cardiology)
  {
    id: 'c3_hf_ccb_nondhp',
    condition: 'suy tim',
    drugOrIntervention: 'diltiazem, verapamil',
    severity: 'harm',
    cor: 'Class III (Harm)',
    loe: 'A',
    guidelineSource: 'ESC Heart Failure Guidelines 2024 / AHA 2022',
    clinicalReason: 'Chẹn kênh canxi Non-DHP (Diltiazem, Verapamil) ức chế co bóp cơ tim mạnh (inotropic âm tính), làm tăng nguy cơ tử vong và làm nặng đợt suy tim cấp ở bệnh nhân HFrEF.',
    alternativeRecommendation: 'Nếu cần kiểm soát nhịp tim trong Rung nhĩ kèm HFrEF: Ưu tiên Chẹn beta giao cảm (Bisoprolol, Carvedilol, Metoprolol) hoặc Digoxin.'
  },
  {
    id: 'c3_hf_nsaid',
    condition: 'suy tim',
    drugOrIntervention: 'ibuprofen, meloxicam, celecoxib, diclofenac, naproxen, piroxicam, ketorolac',
    severity: 'harm',
    cor: 'Class III (Harm)',
    loe: 'B',
    guidelineSource: 'ESC 2024 / AHA 2022 / Bộ Y Tế',
    clinicalReason: 'Thuốc kháng viêm không steroid (NSAIDs/COX-2 inhibitors) gây co tiểu động mạch vào của cầu thận, ứ trệ muối nước, giảm hiệu quả của lợi tiểu quai và thúc đẩy đợt cấp suy tim mất bù.',
    alternativeRecommendation: 'Giảm đau ưu tiên Paracetamol (Acetaminophen) liều ≤ 2-3g/ngày hoặc Opioid liều thấp ngắn hạn nếu đau nặng.'
  },
  {
    id: 'c3_hf_tzd',
    condition: 'suy tim',
    drugOrIntervention: 'pioglitazone, rosiglitazone',
    severity: 'harm',
    cor: 'Class III (Harm)',
    loe: 'A',
    guidelineSource: 'ADA 2026 / ESC 2024',
    clinicalReason: 'Thiazolidinedione (TZD) gây tăng giữ muối nước tại ống thận, làm tăng tỷ lệ tái nhập viện do suy tim xung huyết.',
    alternativeRecommendation: 'Ở bệnh nhân ĐTĐ kèm Suy tim: Ưu tiên tuyệt đối SGLT2i (Dapagliflozin, Empagliflozin) hoặc GLP-1 RA.'
  },
  {
    id: 'c3_hf_antiarrhythmic_class1',
    condition: 'suy tim',
    drugOrIntervention: 'flecainide, propafenone',
    severity: 'harm',
    cor: 'Class III (Harm)',
    loe: 'A',
    guidelineSource: 'ESC Arrhythmia Guidelines 2024',
    clinicalReason: 'Thuốc chống loạn nhịp Nhóm IC (Flecainide, Propafenone) có độc tính gây loạn nhịp thất chết người (Proarrhythmic) trên tim có bệnh lý cấu trúc hoặc thiếu máu cục bộ.',
    alternativeRecommendation: 'Chống loạn nhịp ở bệnh nhân HFrEF: Ưu tiên Amiodarone (Class I) hoặc Sốc điện chuyển nhịp.'
  },

  // 2. Hô hấp & Phế quản (Pulmonology)
  {
    id: 'c3_asthma_nonselective_bb',
    condition: 'hen suyễn, hen phế quản, asthma',
    drugOrIntervention: 'propranolol, nadolol, timolol, sotalol, labetalol',
    severity: 'contraindication',
    cor: 'Class III (Harm)',
    loe: 'A',
    guidelineSource: 'GINA 2026 / BTS Guidelines',
    clinicalReason: 'Chẹn beta không chọn lọc chẹn thụ thể Beta-2 tại cơ trơn phế quản, gây co thắt phế quản cấp tính nặng đe dọa tính mạng.',
    alternativeRecommendation: 'Nếu bắt buộc dùng chẹn beta vì tim mạch: Chọn chẹn beta chọn lọc tim cao Beta-1 (Bisoprolol, Nebivolol) và dò liều cẩn trọng.'
  },
  {
    id: 'c3_copd_labadaba_monotherapy',
    condition: 'copd',
    drugOrIntervention: 'fluticasone, budesonide đơn trị',
    severity: 'harm',
    cor: 'Class III (Harm)',
    loe: 'A',
    guidelineSource: 'GOLD 2026 Guidelines',
    clinicalReason: 'Corticosteroid dạng hít (ICS) đơn trị liệu không có hiệu quả trong COPD và làm tăng đáng kể nguy cơ Viêm phổi nặng.',
    alternativeRecommendation: 'COPD nền tảng bắt buộc dùng Giãn phế quản tác dụng kéo dài LAMA (Tiotropium) hoặc phối hợp LAMA + LABA.'
  },

  // 3. Thận học & Tiết niệu (Nephrology)
  {
    id: 'c3_ckd_dual_raas',
    condition: 'thận mạn, ckd, suy thận',
    drugOrIntervention: 'enalapril + losartan, perindopril + telmisartan, lisinopril + valsartan',
    severity: 'harm',
    cor: 'Class III (Harm)',
    loe: 'A',
    guidelineSource: 'KDIGO 2024 / ONTARGET & VA NEPHRON-D Trials',
    clinicalReason: 'Phối hợp đồng thời 2 thuốc ức chế hệ RAAS (ACEi + ARB hoặc kèm Aliskiren) làm tăng gấp đôi biến cố Tăng kali máu nguy hiểm và Tổn thương thận cấp (AKI) mà không tăng thêm lợi ích tim mạch.',
    alternativeRecommendation: 'Dùng duy nhất 1 thuốc ACEi hoặc ARB liều tối ưu dung nạp; kết hợp SGLT2i và Finerenone (non-steroidal MRA).'
  },
  {
    id: 'c3_renal_artery_stenosis_raas',
    condition: 'hẹp động mạch thận hai bên, hẹp đm thận',
    drugOrIntervention: 'captopril, enalapril, lisinopril, perindopril, losartan, telmisartan, valsartan',
    severity: 'contraindication',
    cor: 'Class III (Harm)',
    loe: 'B',
    guidelineSource: 'KDIGO 2024 / ESC Hypertension 2024',
    clinicalReason: 'Hệ RAAS duy trì trương lực co tiểu động mạch đi để giữ áp lực lọc cầu thận khi hẹp ĐM thận 2 bên. Ức chế men chuyển/thụ thể sẽ làm sụt giảm GFR đột ngột gây suy thận cấp vô niệu.',
    alternativeRecommendation: 'Ưu tiên Chẹn kênh canxi DHP (Amlodipine) hoặc Can thiệp nong/đặt stent ĐM thận.'
  },

  // 4. Nội tiết & Đái tháo đường (Endocrinology)
  {
    id: 'c3_t2d_dpp4_glp1_dual',
    condition: 'đái tháo đường, tiểu đường',
    drugOrIntervention: 'sitagliptin + dulaglutide, vildagliptin + semaglutide, linagliptin + liraglutide',
    severity: 'no_benefit',
    cor: 'Class III (No Benefit)',
    loe: 'A',
    guidelineSource: 'ADA Standards of Care 2026',
    clinicalReason: 'Phối hợp đồng thời DPP-4i và GLP-1 RA cùng tác động lên trục Incretin nhưng không mang lại hiệu quả hạ HbA1c cộng gộp, gây lãng phí chi phí điều trị.',
    alternativeRecommendation: 'Ngừng DPP-4i khi đã khởi trị GLP-1 RA.'
  },
  {
    id: 'c3_t2d_sglt2_dka_active',
    condition: 'toan ceton, dka, toan chuyển hóa',
    drugOrIntervention: 'dapagliflozin, empagliflozin, canagliflozin',
    severity: 'contraindication',
    cor: 'Class III (Harm)',
    loe: 'A',
    guidelineSource: 'ADA 2026 / FDA Safety Alert',
    clinicalReason: 'SGLT2i làm tăng bài tiết glucose niệu nhưng thúc đẩy tạo thể ceton (Euglycemic DKA), nguy hiểm đến tính mạng khi bệnh nhân đang có toan ceton cấp tính.',
    alternativeRecommendation: 'Tạm ngưng SGLT2i ngay lập tức; bù dịch đẳng trương và truyền Insulin tĩnh mạch liên tục theo phác đồ DKA.'
  }
];

/**
 * Kiểm tra xung đột Class III (Harm) dựa trên chẩn đoán và danh sách thuốc
 */
export function checkClass3HarmConflicts(
  diagnosis: string,
  prescriptions: Array<{ name: string; dosage?: string }> = [],
  patientConditions: string[] = []
): Class3Alert[] {
  const alerts: Class3Alert[] = [];
  const allDiagnosisText = [diagnosis, ...patientConditions].join(' ').toLowerCase();
  const allPrescriptionsText = prescriptions.map(p => (p.name || '').toLowerCase()).join(' ');

  if (!allDiagnosisText || !allPrescriptionsText) return alerts;

  CLASS3_DATABASE.forEach(rule => {
    // 1. Kiểm tra điều kiện bệnh lý khớp
    const conditionKeywords = rule.condition.split(',').map(c => c.trim().toLowerCase());
    const isConditionMatched = conditionKeywords.some(kw => allDiagnosisText.includes(kw));

    if (!isConditionMatched) return;

    // 2. Kiểm tra thuốc / can thiệp khớp
    const drugKeywords = rule.drugOrIntervention.split(',').map(d => d.trim().toLowerCase());
    
    // Xử lý trường hợp phối hợp thuốc dạng A + B
    const isDrugMatched = drugKeywords.some(kw => {
      if (kw.includes('+')) {
        const parts = kw.split('+').map(p => p.trim());
        return parts.every(part => allPrescriptionsText.includes(part));
      }
      return allPrescriptionsText.includes(kw);
    });

    if (isDrugMatched) {
      alerts.push(rule);
    }
  });

  return alerts;
}

/**
 * Render HTML Banner Cảnh Báo Class III Harm trong giao diện SOAP
 */
export function renderClass3AlertsHtml(alerts: Class3Alert[]): string {
  if (!alerts || alerts.length === 0) return '';

  return `
    <div class="ebm-class3-alert-container" style="background:linear-gradient(135deg, rgba(239,68,68,0.08), rgba(220,38,38,0.03)); border:1.5px solid #ef4444; border-radius:10px; padding:12px 14px; margin-bottom:1rem; box-shadow:0 3px 10px rgba(239,68,68,0.12);">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <span style="color:#b91c1c; font-weight:800; font-size:13px; display:flex; align-items:center; gap:6px; text-transform:uppercase; letter-spacing:0.03em;">
          <i class="fa-solid fa-triangle-exclamation" style="font-size:15px; color:#ef4444;"></i>
          Phát hiện ${alerts.length} Xung Đột Class III (Harm / Chống Chỉ Định EBM)
        </span>
        <a href="#/ebm/guideline-radar" style="font-size:11.5px; color:#b91c1c; font-weight:700; text-decoration:underline;">Mở Guideline Radar →</a>
      </div>

      <div style="display:flex; flex-direction:column; gap:8px;">
        ${alerts.map(a => `
          <div style="background:var(--color-surface, #fff); border:1px solid rgba(239,68,68,0.3); border-left:4px solid #ef4444; border-radius:6px; padding:8px 10px; font-size:12px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:3px;">
              <strong style="color:#b91c1c; font-size:12.5px;">🚨 ${escapeHtml(a.cor)} — Khuyến cáo: ${escapeHtml(a.guidelineSource)}</strong>
              <span style="background:rgba(239,68,68,0.12); color:#dc2626; font-size:10px; font-weight:800; padding:1px 6px; border-radius:4px;">LOE ${a.loe}</span>
            </div>
            <div style="color:var(--color-text, #0f172a); margin-bottom:4px; line-height:1.45;">
              <strong>Lý do lâm sàng:</strong> ${escapeHtml(a.clinicalReason)}
            </div>
            <div style="color:#047857; background:rgba(16,185,129,0.08); padding:5px 8px; border-radius:4px; font-size:11.5px; line-height:1.4;">
              <strong>💡 Khuyến cáo thay thế chuẩn EBM:</strong> ${escapeHtml(a.alternativeRecommendation)}
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
