/**
 * Cirrhosis Engine — Đóng gói các công thức y khoa và thuật toán đánh giá xơ gan
 * CliniPortal Studio Module
 */
(function (global) {
  'use strict';

  const CirrhosisEngine = {
    /**
     * Chuyển đổi đơn vị
     */
    convertUnits: function (data) {
      const converted = { ...data };

      // Bilirubin (µmol/L -> mg/dL) : chia 17.1
      if (data.biliUnit === 'umol/L' && typeof data.bili === 'number' && !isNaN(data.bili)) {
        converted.biliMg = data.bili / 17.1;
      } else {
        converted.biliMg = data.bili;
      }

      // Albumin (g/L -> g/dL) : chia 10
      if (data.albUnit === 'g/L' && typeof data.alb === 'number' && !isNaN(data.alb)) {
        converted.albGdl = data.alb / 10;
      } else {
        converted.albGdl = data.alb;
      }

      // Creatinine (µmol/L -> mg/dL) : chia 88.4
      if (data.crUnit === 'umol/L' && typeof data.cr === 'number' && !isNaN(data.cr)) {
        converted.crMg = data.cr / 88.4;
      } else {
        converted.crMg = data.cr;
      }

      return converted;
    },

    /**
     * Tính thang điểm Child-Pugh
     */
    calcChildPugh: function (data) {
      const bili = data.biliMg;
      const alb = data.albGdl;
      const inr = data.inr;
      const asc = parseInt(data.ascites) || 0;
      const enc = parseInt(data.encephalopathy) || 0;

      const missing = [];
      if (isNaN(bili) || bili === null) missing.push('Bilirubin');
      if (isNaN(alb) || alb === null) missing.push('Albumin');
      if (isNaN(inr) || inr === null) missing.push('INR');
      if (!asc) missing.push('Cổ trướng');
      if (!enc) missing.push('Bệnh não gan');

      if (missing.length > 0) {
        return {
          complete: false,
          missing: missing,
          score: null,
          class: null,
          color: 'pending',
          label: 'Chờ dữ liệu đầy đủ',
          desc: 'Cần nhập: Bilirubin, Albumin, INR, Cổ trướng và Bệnh não gan'
        };
      }

      let score = 0;
      // Bilirubin
      if (bili < 2.0) score += 1;
      else if (bili <= 3.0) score += 2;
      else score += 3;

      // Albumin
      if (alb > 3.5) score += 1;
      else if (alb >= 2.8) score += 2;
      else score += 3;

      // INR
      if (inr < 1.7) score += 1;
      else if (inr <= 2.3) score += 2;
      else score += 3;

      // Ascites & Encephalopathy
      score += asc;
      score += enc;

      let cls = 'A', color = 'green', label = '', desc = '', surgRisk = '', survival1y = '', survival2y = '';
      if (score <= 6) {
        cls = 'A';
        color = 'green';
        label = 'Class A — Chức năng gan còn bù tốt';
        desc = 'Tiên lượng khả quan. Nguy cơ biến chứng phẫu thuật thấp (~10%).';
        survival1y = '100%';
        survival2y = '85%';
        surgRisk = 'Thấp (~10% tử vong mổ bụng)';
      } else if (score <= 9) {
        cls = 'B';
        color = 'yellow';
        label = 'Class B — Suy chức năng gan vừa (Bắt đầu mất bù)';
        desc = 'Cần theo dõi sát. Xem xét chỉ định ghép gan nếu có biến chứng.';
        survival1y = '80%';
        survival2y = '60%';
        surgRisk = 'Trung bình (~30% tử vong mổ bụng)';
      } else {
        cls = 'C';
        color = 'red';
        label = 'Class C — Suy chức năng gan nặng (Mất bù nghiêm trọng)';
        desc = 'Tiên lượng xấu. Ưu tiên hội chẩn ghép gan và điều trị tích cực.';
        survival1y = '45%';
        survival2y = '35%';
        surgRisk = 'Rất cao (50 - 82% tử vong mổ bụng)';
      }

      return {
        complete: true,
        score: score,
        class: cls,
        color: color,
        label: label,
        desc: desc,
        survival1y: survival1y,
        survival2y: survival2y,
        surgRisk: surgRisk
      };
    },

    /**
     * Tính thang điểm MELD, MELD-Na & MELD 3.0
     */
    calcMELD: function (data) {
      let bili = data.biliMg;
      let inr = data.inr;
      let cr = data.crMg;
      let na = data.sodium;
      const dial = parseInt(data.dialysis) || 0;
      const gender = data.gender || 'male'; // female or male

      const missing = [];
      if (isNaN(bili) || bili === null) missing.push('Bilirubin');
      if (isNaN(inr) || inr === null) missing.push('INR');
      if (isNaN(cr) || cr === null) missing.push('Creatinine');
      if (isNaN(na) || na === null) missing.push('Natri');

      if (missing.length > 0) {
        return {
          complete: false,
          missing: missing,
          meld: null,
          meldNa: null,
          meld30: null,
          color: 'pending',
          label: 'Chờ dữ liệu đầy đủ',
          desc: 'Cần nhập: Bilirubin, INR, Creatinine và Natri'
        };
      }

      // Giới hạn UNOS cho MELD-Na 2016
      let crCalc = cr;
      if (dial === 1) crCalc = 4.0;
      let biliBound = Math.max(bili, 1.0);
      let crBound = Math.max(Math.min(crCalc, 4.0), 1.0);
      let inrBound = Math.max(inr, 1.0);
      let naBound = Math.max(Math.min(na, 137), 125);

      // 1. MELD Gốc (UNOS 2002)
      let meldOriginal = 3.78 * Math.log(biliBound) + 11.2 * Math.log(inrBound) + 9.57 * Math.log(crBound) + 6.43;
      meldOriginal = Math.round(meldOriginal);
      if (meldOriginal < 6) meldOriginal = 6;

      // 2. MELD-Na (UNOS 2016)
      let meldNa = meldOriginal;
      if (meldOriginal > 11) {
        meldNa = meldOriginal + 1.32 * (137 - naBound) - (0.033 * meldOriginal * (137 - naBound));
        meldNa = Math.round(meldNa);
      }
      meldNa = Math.max(Math.min(meldNa, 40), 6);

      // 3. MELD 3.0 (OPTN 2022)
      // MELD 3.0 = 1.33*(Giới nữ = 1) + 4.56*ln(Bili) + 0.82*(137-Na) - 0.24*(137-Na)*ln(Bili) + 9.09*ln(INR) + 11.14*ln(Cr) + 1.85*(Alb < 3.5 ? (3.5-Alb) : 0) - 1.85*(Alb < 3.5 ? (3.5-Alb) : 0)*ln(Cr)
      let meld30 = meldNa; // Fallback
      if (typeof data.albGdl === 'number' && !isNaN(data.albGdl)) {
        const isFemale = (gender === 'female') ? 1 : 0;
        const albVal = Math.min(Math.max(data.albGdl, 1.5), 3.5);
        const albDiff = 3.5 - albVal;

        let biliM3 = Math.max(bili, 1.0);
        let crM3 = Math.max(Math.min(crCalc, 3.0), 1.0); // MELD 3.0 cap cr at 3.0
        let inrM3 = Math.max(inr, 1.0);
        let naM3 = Math.max(Math.min(na, 137), 125);

        let m3 = 1.33 * isFemale
          + 4.56 * Math.log(biliM3)
          + 0.82 * (137 - naM3)
          - 0.24 * (137 - naM3) * Math.log(biliM3)
          + 9.09 * Math.log(inrM3)
          + 11.14 * Math.log(crM3)
          + 1.85 * albDiff
          - 1.85 * albDiff * Math.log(crM3);

        meld30 = Math.max(Math.min(Math.round(m3), 40), 6);
      }

      // Phân tầng nguy cơ & Tử vong 90 ngày
      let color = 'green', label = '', desc = '', mort90d = '';
      if (meldNa < 10) {
        color = 'green';
        label = 'Nguy cơ thấp (MELD-Na < 10)';
        desc = 'Tỷ lệ tử vong 90 ngày rất thấp (~1.9 – 3%). Theo dõi định kỳ.';
        mort90d = '~2%';
      } else if (meldNa <= 19) {
        color = 'yellow';
        label = 'Nguy cơ trung bình (MELD-Na 10 – 19)';
        desc = 'Tỷ lệ tử vong 90 ngày khoảng 6 – 20%. Theo dõi sát và cân nhắc danh sách ghép gan.';
        mort90d = '6 – 20%';
      } else if (meldNa <= 29) {
        color = 'orange';
        label = 'Nguy cơ cao (MELD-Na 20 – 29)';
        desc = 'Tỷ lệ tử vong 90 ngày khoảng 20 – 50%. Cần ưu tiên đánh giá ghép gan.';
        mort90d = '20 – 50%';
      } else if (meldNa <= 39) {
        color = 'red';
        label = 'Nguy cơ rất cao (MELD-Na 30 – 39)';
        desc = 'Tỷ lệ tử vong 90 ngày cao (> 50 – 80%). Xử trí hồi sức tích cực, khẩn trương ghép gan.';
        mort90d = '50 – 80%';
      } else {
        color = 'red';
        label = 'Cực kỳ nguy hiểm (MELD-Na = 40)';
        desc = 'Tỷ lệ tử vong 90 ngày > 80 – 90%. Tiên lượng đe dọa tính mạng.';
        mort90d = '> 80%';
      }

      return {
        complete: true,
        meld: meldOriginal,
        meldNa: meldNa,
        meld30: meld30,
        color: color,
        label: label,
        desc: desc,
        mort90d: mort90d
      };
    },

    /**
     * Tính Chỉ số FIB-4 và APRI (Xơ hóa gan không xâm lấn)
     */
    calcFibrosis: function (data) {
      const age = data.age;
      const ast = data.ast;
      const alt = data.alt;
      const plt = data.plt; // 10^9 / L (1000/mm3)
      const astUln = data.astUln || 40; // Ngưỡng trên bình thường AST

      const result = {
        fib4: null,
        fib4Text: '',
        fib4Color: 'pending',
        apri: null,
        apriText: '',
        apriColor: 'pending'
      };

      // FIB-4 = (Age * AST) / (PLT * sqrt(ALT))
      if (age && ast && alt && plt && plt > 0 && alt > 0) {
        const fib4 = (age * ast) / (plt * Math.sqrt(alt));
        result.fib4 = parseFloat(fib4.toFixed(2));

        if (fib4 < 1.30) {
          result.fib4Text = 'F0 - F1: Ít nguy cơ xơ hóa gan nặng (NPV > 90%)';
          result.fib4Color = 'green';
        } else if (fib4 <= 2.67) {
          result.fib4Text = 'Vùng xám (Indeterminate): Cần đo Elastography (FibroScan)';
          result.fib4Color = 'yellow';
        } else {
          result.fib4Text = 'F3 - F4: Nguy cơ cao xơ gan / Xơ hóa nặng (PPV ~80%)';
          result.fib4Color = 'red';
        }
      }

      // APRI = ((AST / AST_ULN) / PLT) * 100
      if (ast && plt && plt > 0) {
        const apri = ((ast / astUln) / plt) * 100;
        result.apri = parseFloat(apri.toFixed(2));

        if (apri < 0.5) {
          result.apriText = 'Loại trừ xơ gan (Ít nguy cơ xơ hóa F4)';
          result.apriColor = 'green';
        } else if (apri <= 1.5) {
          result.apriText = 'Xơ hóa nghi ngờ (Mức độ trung bình)';
          result.apriColor = 'yellow';
        } else {
          result.apriText = 'Xơ gan rõ (Nguy cơ cao F4 / Tiến triển xơ gan)';
          result.apriColor = 'red';
        }
      }

      return result;
    },

    /**
     * Tính ALBI Grade (Albumin-Bilirubin Grade)
     */
    calcALBI: function (data) {
      // ALBI = (log10(Bilirubin in umol/L) * 0.66) + (Albumin in g/L * -0.085)
      const biliUmol = data.biliMg ? (data.biliMg * 17.1) : null;
      const albGl = data.albGdl ? (data.albGdl * 10) : null;

      if (!biliUmol || !albGl) {
        return { score: null, grade: null, label: 'Chờ dữ liệu', color: 'pending' };
      }

      const albiScore = (Math.log10(biliUmol) * 0.66) + (albGl * -0.085);
      const scoreFixed = parseFloat(albiScore.toFixed(2));

      let grade = 1, color = 'green', label = '';
      if (albiScore <= -2.60) {
        grade = 1;
        color = 'green';
        label = 'ALBI Grade 1 (Chức năng gan bảo tồn tốt - Tiên lượng sống cao)';
      } else if (albiScore <= -1.39) {
        grade = 2;
        color = 'yellow';
        label = 'ALBI Grade 2 (Suy giảm chức năng gan mức độ trung bình)';
      } else {
        grade = 3;
        color = 'red';
        label = 'ALBI Grade 3 (Suy giảm chức năng gan nặng - Tiên lượng xấu)';
      }

      return {
        score: scoreFixed,
        grade: grade,
        color: color,
        label: label
      };
    },

    /**
     * Đánh giá Trạng thái Mất bù & Red Flags
     */
    evalDecompensation: function (data, cpRes, meldRes) {
      const flags = [];
      const redAlerts = [];
      const recommendations = [];

      const asc = parseInt(data.ascites) || 0;
      const enc = parseInt(data.encephalopathy) || 0;
      const varbleed = data.chk_varbleed;
      const sbp = data.chk_sbp;
      const hrs = data.chk_hrs;
      const jaundice = data.chk_jaundice;
      const fever = data.chk_fever;
      const confusion = data.chk_confusion;
      const hypotension = data.chk_hypotension;

      if (asc >= 2) flags.push('Cổ trướng (Báng bụng) vừa đến nhiều');
      if (enc >= 2) flags.push('Bệnh não gan (Hepatic Encephalopathy) Grade I - IV');
      if (varbleed) flags.push('Xuất huyết tiêu hóa do tăng áp cửa (Giãn TMTQ/Dạ dày)');
      if (sbp) flags.push('Viêm phúc mạc vi trùng tự phát (SBP)');
      if (hrs) flags.push('Tổn thương thận cấp / Hội chứng Gan Thận (HRS-AKI)');
      if (jaundice) flags.push('Vàng da tiến triển rõ (Bilirubin tăng vọt)');
      if (confusion) flags.push('Lú lẫn cấp / Đảo lộn nhịp giấc ngủ mới xuất hiện');

      // Cảnh báo khẩn cấp (Red Flags)
      if (hypotension) {
        redAlerts.push('⚠️ TỤT HUYẾT ÁP / SỐC (HA tâm thu < 90 mmHg) — Nguy cơ sốc nhiễm trùng / Sốc mất máu cấp!');
        recommendations.push('Bù dịch khẩn cấp, thiết lập đường truyền lớn, theo dõi CVP và cân nhắc Thuốc vận mạch (Norepinephrine).');
      }
      if (varbleed) {
        redAlerts.push('🩸 XUẤT HUYẾT TIÊU HÓA CẤP — Cần nội soi can thiệp khẩn và dùng Somatostatin / Terlipressin!');
        recommendations.push('Dùng Vasopressin/Terlipressin/Octreotide + Kháng sinh dự phòng (Ceftriaxone 1g/ngày) + Nội soi thắt EVL trong 12h.');
      }
      if (sbp || (fever && asc >= 2)) {
        redAlerts.push('🦠 NGHI NGỜ VIÊM PHÚC MẠC VI TRÙNG TỰ PHÁT (SBP) — Cần chọc dò dịch báng xét nghiệm ANC ngay!');
        recommendations.push('Nếu ANC dịch báng ≥ 250/mm³: Điều trị ngay Cefotaxime 2g x 3 lần/ngày (hoặc Ceftriaxone) + Bù Albumin IV 1.5 g/kg ngày 1 & 1.0 g/kg ngày 3.');
      }
      if (hrs) {
        redAlerts.push('🫘 NGUY CƠ HỘI CHỨNG GAN THẬN (HRS-AKI) — Ngừng ngay lợi tiểu và thuốc độc thận!');
        recommendations.push('Ngừng Diuretics/ACEi/NSAIDs. Thử thách Albumin 1g/kg/ngày x 2 ngày. Nếu không hồi phục: Dùng Terlipressin + Albumin IV.');
      }

      // Khuyên CDSS bổ sung
      if (cpRes && cpRes.class === 'A' && flags.length === 0) {
        recommendations.push('Tầm soát HCC: Siêu âm bụng + AFP mỗi 6 tháng.');
        recommendations.push('Tầm soát Giãn TMTQ: Nội soi dạ dày định kỳ (mỗi 2 năm nếu chưa giãn).');
      } else {
        recommendations.push('Hội chẩn Chuyên khoa Tiêu hóa - Gan mật đánh giá chỉ định Ghép gan (MELD-Na ≥ 15).');
        recommendations.push('Dự phòng Bệnh não gan: Lactulose (chỉnh liều 2-3 lần phân mềm/ngày) ± Rifaximin 550mg x 2 lần/ngày.');
      }

      const isDecompensated = flags.length > 0 || (cpRes && cpRes.class !== 'A') || (meldRes && meldRes.meldNa >= 15);

      return {
        isDecompensated: isDecompensated,
        flags: flags,
        redAlerts: redAlerts,
        recommendations: recommendations
      };
    },

    /**
     * Tạo báo cáo tóm tắt EMR / Bệnh án
     */
    generateEMRReport: function (inputs, cp, meld, fib, albi, decomp) {
      const lines = [];
      lines.push('====================================================');
      lines.push('   BÁO CÁO ĐÁNH GIÁ XƠ GAN TOÀN DIỆN (CLINIPORTAL STUDIO)');
      lines.push('====================================================');
      lines.push(`Thời gian: ${new Date().toLocaleString('vi-VN')}`);
      lines.push(`Thông số chính: Bilirubin ${inputs.biliMg ? inputs.biliMg.toFixed(1) : '—'} mg/dL | Albumin ${inputs.albGdl ? inputs.albGdl.toFixed(1) : '—'} g/dL | INR ${inputs.inr || '—'} | Cr ${inputs.crMg ? inputs.crMg.toFixed(1) : '—'} mg/dL | Na ${inputs.sodium || '—'} mEq/L`);
      lines.push('----------------------------------------------------');

      if (cp.complete) {
        lines.push(`1. THANG ĐIỂM CHILD-PUGH: ${cp.score} điểm — CLASS ${cp.class}`);
        lines.push(`   - Kết luận: ${cp.label}`);
        lines.push(`   - Tiên lượng sống 1 năm: ${cp.survival1y} | 2 năm: ${cp.survival2y}`);
      } else {
        lines.push(`1. THANG ĐIỂM CHILD-PUGH: Chưa đủ dữ liệu (${cp.missing.join(', ')})`);
      }

      if (meld.complete) {
        lines.push(`2. THANG ĐIỂM MELD-Na: ${meld.meldNa} điểm (MELD 3.0: ${meld.meld30} | MELD gốc: ${meld.meld})`);
        lines.push(`   - Phân tầng: ${meld.label}`);
        lines.push(`   - Tiên lượng tử vong 90 ngày: ${meld.mort90d}`);
      } else {
        lines.push(`2. THANG ĐIỂM MELD-Na: Chưa đủ dữ liệu (${meld.missing.join(', ')})`);
      }

      if (fib.fib4) {
        lines.push(`3. CHỈ SỐ FIB-4: ${fib.fib4} (${fib.fib4Text})`);
      }
      if (fib.apri) {
        lines.push(`4. CHỈ SỐ APRI: ${fib.apri} (${fib.apriText})`);
      }
      if (albi.score) {
        lines.push(`5. ALBI GRADE: Grade ${albi.grade} (${albi.score}) — ${albi.label}`);
      }

      lines.push('----------------------------------------------------');
      lines.push(`TRẠNG THÁI GAN: ${decomp.isDecompensated ? '🔴 XƠ GAN MẤT BÙ' : '🟢 XƠ GAN CÒN BÙ'}`);
      if (decomp.flags.length > 0) {
        lines.push('Các dấu mất bù ghi nhận:');
        decomp.flags.forEach(f => lines.push(`  - ${f}`));
      }
      if (decomp.redAlerts.length > 0) {
        lines.push('\n🔴 CẢNH BÁO NGUY CƠ CẤP:');
        decomp.redAlerts.forEach(a => lines.push(`  - ${a}`));
      }
      if (decomp.recommendations.length > 0) {
        lines.push('\n💡 HƯỚNG XỬ TRÍ LÂM SÀNG KHUYẾN CÁO:');
        decomp.recommendations.forEach(r => lines.push(`  - ${r}`));
      }
      lines.push('====================================================');

      return lines.join('\n');
    }
  };

  global.CirrhosisEngine = CirrhosisEngine;
})(typeof window !== 'undefined' ? window : this);
