/**
 * Resuscitative Metabolic, Electrolyte & AEIOU Dialysis Crisis Engine
 * Core EBM Logic for Emergency Resuscitation Bay & ICU
 * CliniPortal Design System
 */

(function (global) {
  'use strict';

  const MetabolicEngine = {
    /**
     * Analyze Resuscitative ABG & Acid-Base Status
     */
    analyzeAbg(data) {
      const ph = parseFloat(data.ph) || 7.4;
      const paco2 = parseFloat(data.paco2) || 40;
      const hco3 = parseFloat(data.hco3) || 24;
      const na = parseFloat(data.na) || 140;
      const cl = parseFloat(data.cl) || 104;
      const albumin = parseFloat(data.albumin) || 4.0;
      const lactate = parseFloat(data.lactate) || 1.0;

      // 1. Primary Disorder
      let primary = 'Normal';
      if (ph < 7.35) {
        if (hco3 < 22 && paco2 <= 40) primary = 'Metabolic Acidosis (Toan Chuyển Hóa)';
        else if (paco2 > 45) primary = 'Respiratory Acidosis (Toan Hô Hấp)';
        else primary = 'Mixed Acidosis (Toan Hỗn Hợp)';
      } else if (ph > 7.45) {
        if (hco3 > 26) primary = 'Metabolic Alkalosis (Kiềm Chuyển Hóa)';
        else if (paco2 < 35) primary = 'Respiratory Alkalosis (Kiềm Hô Hấp)';
        else primary = 'Mixed Alkalosis (Kiềm Hỗn Hợp)';
      }

      // 2. Anion Gap Calculation
      const rawAg = na - (cl + hco3);
      const adjAg = rawAg + 2.5 * (4.0 - albumin);
      const isHagma = adjAg > 12;

      // 3. Delta Ratio Calculation (if HAGMA)
      let deltaRatio = null;
      let deltaInterpretation = 'N/A';
      if (isHagma && hco3 < 24) {
        deltaRatio = (adjAg - 12) / (24 - hco3);
        if (deltaRatio < 0.4) {
          deltaInterpretation = 'Pure NAGMA (Toan chuyển hóa Anion Gap bình thường / Tăng Clo máu)';
        } else if (deltaRatio >= 0.4 && deltaRatio < 0.8) {
          deltaInterpretation = 'Mixed HAGMA + NAGMA (Toan chuyển hóa AG tăng phối hợp Toan AG bình thường)';
        } else if (deltaRatio >= 0.8 && deltaRatio <= 2.0) {
          deltaInterpretation = 'Pure HAGMA (Toan chuyển hóa AG tăng đơn thuần: Ketoacidosis, Lactic, AKI)';
        } else {
          deltaInterpretation = 'Mixed HAGMA + Metabolic Alkalosis (Toan AG tăng phối hợp Kiềm chuyển hóa)';
        }
      }

      // 4. Check GOLD MARK Differential Diagnostics
      const goldmark = [];
      if (isHagma) {
        goldmark.push('G: Glycols (Ethylene Glycol, Propylene Glycol)');
        goldmark.push('O: Oxoproline (Dùng Paracetamol kéo dài)');
        goldmark.push('L: L-Lactate (Sốc nhiễm khuẩn, Sốc tim, Thiếu máu cơ quan)');
        goldmark.push('D: D-Lactate (Hội chứng ruột ngắn)');
        if (data.isKetoacidosis) goldmark.push('M: Methanol / Sốt Ceton (DKA, AKA, Starvation)');
        goldmark.push('A: Aspirin / Salicylates');
        goldmark.push('R: Renal Failure (Suy thận cấp/mạn, Ure máu cao)');
        goldmark.push('K: Ketoacidosis (Toan ceton đái tháo đường / nghiện rượu)');
      }

      return {
        ph, paco2, hco3, na, cl, albumin, lactate,
        primary, rawAg, adjAg: adjAg.toFixed(1), isHagma,
        deltaRatio: deltaRatio !== null ? deltaRatio.toFixed(2) : 'N/A',
        deltaInterpretation, goldmark
      };
    },

    /**
     * Hyperkalemia Emergency EKG Rescue Protocol
     */
    analyzeHyperkalemia(data) {
      const k = parseFloat(data.k) || 4.2;
      const ekgPattern = data.ekgPattern || 'normal'; // normal, peaked_t, pr_long, qrs_wide, sine_wave
      const hasCvc = !!data.hasCvc;

      let severity = 'Bình thường';
      let threatLevel = 'An toàn';
      let ekgAlert = 'Điện tâm đồ chưa ghi nhận biến đổi Tăng Kali.';
      let isEmergency = false;

      if (k >= 6.5 || ekgPattern !== 'normal') {
        isEmergency = true;
        severity = k >= 6.5 ? 'Tăng Kali Máu Nặng (Severe Hyperkalemia)' : 'Tăng Kali Máu Trung Bình Có Biến Đổi EKG';
        threatLevel = '🔴 CẤP CỨU NGUY HIỂM TÍNH MẠNG (Dọa Rung Thất / Vô Tâm Thu)';
      } else if (k >= 6.0) {
        severity = 'Tăng Kali Máu Trung Bình';
        threatLevel = '🟠 Cảnh Báo Cao';
      } else if (k >= 5.5) {
        severity = 'Tăng Kali Máu Nhẹ';
        threatLevel = '🟡 Theo Dõi Sát';
      }

      if (ekgPattern === 'peaked_t') ekgAlert = '🔴 EKG: Sóng T nhọn cao đối xứng ở chuyển đạo trước tim (Cảnh báo sớm).';
      else if (ekgPattern === 'pr_long') ekgAlert = '🔴 EKG: Kéo dài đoạn PR & Mất sóng P (Cảnh báo độc tính tim).';
      else if (ekgPattern === 'qrs_wide') ekgAlert = '🚨 EKG: QRS giãn rộng (Dọa sụp đổ vòng dẫn truyền cơ tim khẩn cấp).';
      else if (ekgPattern === 'sine_wave') ekgAlert = '🚨 EKG: Sóng hình sin Sine-Wave (Dọa Rung thất / Ngừng tuần hoàn trong vài phút!).';

      // Rescue Dosing
      const calciumDose = hasCvc
        ? 'Canxi Chloride (CaCl2) 10%: 1g (10 mL) tiêm tĩnh mạch qua CVC trong 2-3 phút.'
        : 'Canxi Gluconate 10%: 30 mL (3 lọ) tiêm tĩnh mạch ngoại vi trong 2-3 phút.';

      const insulinDose = 'Insulin Rapid (Actrapid) 10 Đơn vị IV tiêm nhanh + Truyền Dextrose 50% 50 mL (hoặc D10W 500 mL) tránh hạ đường huyết.';
      const salbutamolDose = 'Salbutamol (Ventolin) 10 - 20 mg phun khí dung qua mặt nạ trong 15 phút.';

      return {
        k, ekgPattern, severity, threatLevel, ekgAlert, isEmergency,
        calciumDose, insulinDose, salbutamolDose
      };
    },

    /**
     * Acute Symptomatic Hyponatremia NaCl 3% Bolus Dosing
     */
    analyzeHyponatremia(data) {
      const na = parseFloat(data.na) || 140;
      const weight = parseFloat(data.weight) || 60;
      const hasSeizures = !!data.hasSeizures;
      const hasComa = !!data.hasComa;
      const hasIcpSign = !!data.hasIcpSign;

      const isSevereSymptomatic = (na < 125 && (hasSeizures || hasComa || hasIcpSign)) || hasSeizures || hasComa;

      let protocolTitle = 'Theo dõi & Bù Natri Thận Trọng Mạn Tính';
      let rescueBolus = 'Không có chỉ định tiêm Bolus NaCl 3% khẩn cấp (Không có triệu chứng thần kinh đe dọa tính mạng).';
      let targetNaRise = 'Duy trì nâng Natri < 8 mmol/L trong 24 giờ để tránh Hội chứng Hủy Myelin Cầu Não (ODS).';

      if (isSevereSymptomatic) {
        protocolTitle = '🚨 PHÁC ĐỒ BOLUS NACL 3% CẤP CỨU HẠ NATRI MÁU CO GIẬT / HÔN MÊ';
        rescueBolus = '🔴 Tiêm Tĩnh Mạch Nhanh: NaCl 3% 150 mL IV Bolus trong 20 phút. Nếu triệu chứng thần kinh chưa thuyên giảm, LẶP LẠI LẦN 2 150 mL NaCl 3% IV trong 20 phút tiếp theo.';
        targetNaRise = '🎯 Mục tiêu: Tăng Natri máu cấp từ 4 - 6 mmol/L trong 1-2 giờ đầu để ngừng thoát vị não khẩn cấp!';
      }

      return {
        na, weight, isSevereSymptomatic, protocolTitle, rescueBolus, targetNaRise
      };
    },

    /**
     * BICAR-ICU Protocol for Severe Acidemia
     */
    analyzeBicarIcu(data) {
      const ph = parseFloat(data.ph) || 7.4;
      const hco3 = parseFloat(data.hco3) || 24;
      const weight = parseFloat(data.weight) || 60;
      const hasAki = !!data.hasAki;

      let isIndicated = false;
      let summary = 'Không có chỉ định dùng NaHCO3 tĩnh mạch.';
      let dose = 'N/A';

      if (ph < 7.15) {
        if (hasAki || ph < 7.0) {
          isIndicated = true;
          summary = '🔴 CHỈ ĐỊNH DÙNG NAHCO3 TĨNH MẠCH (Theo Thử nghiệm Lâm sàng BICAR-ICU): Toan chuyển hóa nặng pH < 7.15 kèm Suy thận cấp (AKI KDIGO 2-3).';
          
          // Deficit = 0.4 * W * (24 - HCO3)
          const deficit = 0.4 * weight * (24 - hco3);
          const halfDeficit = (deficit / 2).toFixed(0);

          dose = `Tổng thâm hụt HCO3 = ${deficit.toFixed(0)} mEq. Khởi đầu bù 1/2 liều (${halfDeficit} mEq = ${halfDeficit} mL NaHCO3 8.4%) truyền IV trong 30-60 phút. Sau đó xét nghiệm lại ABG.`;
        } else {
          summary = '🟡 Cân nhắc bù NaHCO3 nếu pH < 7.00. Với pH 7.00-7.15 không kèm AKI, ưu tiên điều trị nguyên nhân gốc (Tưới máu, Lactic, DKA).';
        }
      }

      return { ph, hco3, weight, hasAki, isIndicated, summary, dose };
    },

    /**
     * AEIOU Emergency Dialysis Trigger Matrix
     */
    analyzeAeiou(data) {
      const a = !!data.aeiou_a; // Acidosis pH < 7.15 refractory
      const e = !!data.aeiou_e; // Electrolytes K > 6.5 refractory
      const i = !!data.aeiou_i; // Ingestions Methanol/Salicylates/Lithium
      const o = !!data.aeiou_o; // Overload Pulmonary Edema refractory
      const u = !!data.aeiou_u; // Uremia Pericarditis/Encephalopathy

      const triggersCount = (a ? 1 : 0) + (e ? 1 : 0) + (i ? 1 : 0) + (o ? 1 : 0) + (u ? 1 : 0);
      const isDialysisRequired = triggersCount > 0;

      let recommendation = 'Chưa có chỉ định Lọc máu cấp cứu tuyệt đối theo bảng kiểm AEIOU.';
      let mode = 'Theo dõi nội khoa & Điều trị tối ưu nguyên nhân.';

      if (isDialysisRequired) {
        recommendation = `🚨 KÍCH HOẠT LỌC MÁU CẤP CỨU KHẨN CẤP! Phát hiện ${triggersCount}/5 tiêu chuẩn AEIOU đe dọa tính mạng.`;
        if (data.isHemodynamicallyUnstable) {
          mode = '🔵 Phương thức Khuyến cáo: CRRT (CVVH / CVVHD / CVVHDF) liên tục tại ICU do bệnh nhân Tụt HA / Khuyết tán vận mạch.';
        } else {
          mode = '🔵 Phương thức Khuyến cáo: Thận nhân tạo ngắt quãng khẩn cấp (Emergency HD) hoặc SLED.';
        }
      }

      return {
        a, e, i, o, u, triggersCount, isDialysisRequired, recommendation, mode
      };
    }
  };

  global.MetabolicEngine = MetabolicEngine;
})(typeof window !== 'undefined' ? window : this);
