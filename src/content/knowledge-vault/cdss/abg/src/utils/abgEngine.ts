import {
  ABGInput,
  ABGAnalysisResult,
  GasExchangeCategory,
  GasExchangeSeverity,
  Type2Subtype,
  AcidBaseCategory,
  CompensationStatus,
  StepEvaluation
} from '../types/abg';

export const KPA_TO_MMHG = 7.50062;
export const MMHG_TO_KPA = 1 / KPA_TO_MMHG;

export function convertPressureToMmHg(val: number, unit: 'mmHg' | 'kPa'): number {
  return unit === 'kPa' ? val * KPA_TO_MMHG : val;
}

export function convertPressureToKpa(val: number, unit: 'mmHg' | 'kPa'): number {
  return unit === 'mmHg' ? val * MMHG_TO_KPA : val;
}

/**
 * Calculates [H+] in nmol/L from pH:
 * [H+] = 10^(9 - pH)
 */
export function calculateHIon(pH: number): number {
  return Math.round(Math.pow(10, 9 - pH) * 10) / 10;
}

/**
 * Comprehensive ABG Analysis Engine strictly adhering to:
 * 1. Arterial Blood Gases Made Easy (Hennessey & Japp)
 * 2. Arterial Blood Gas Interpretation: A case study approach (Pierre & Ranson)
 */
export function analyzeABG(input: ABGInput): ABGAnalysisResult {
  const {
    unit,
    pH,
    pCO2: rawPco2,
    pO2: rawPo2,
    hco3,
    be,
    sao2,
    fio2: rawFio2,
    na,
    k,
    cl,
    lactate,
    glucose,
    albumin,
    patientAge = 40,
    coHb,
    isVenousSample
  } = input;

  // Normalize pressures to both mmHg and kPa
  const pco2MmHg = convertPressureToMmHg(rawPco2, unit);
  const pao2MmHg = convertPressureToMmHg(rawPo2, unit);
  const pco2Kpa = convertPressureToKpa(rawPco2, unit);
  const pao2Kpa = convertPressureToKpa(rawPo2, unit);

  // Normalize FiO2 to percentage (e.g. 21) and fraction (e.g. 0.21)
  const fio2Pct = rawFio2 > 1 ? rawFio2 : rawFio2 * 100;
  const fio2Fraction = fio2Pct / 100;

  const hIon = calculateHIon(pH);

  // Alveolar Gas Equation (Appendix p. 64)
  // PAO2 (mmHg) = (FiO2 * 713) - (PaCO2 * 1.2)
  // PAO2 (kPa) = (FiO2 * 93.8) - (PaCO2 * 1.2)
  const pao2AlveolarMmHg = (fio2Fraction * 713) - (pco2MmHg * 1.2);
  const pao2AlveolarKpa = (fio2Fraction * 93.8) - (pco2Kpa * 1.2);
  const aaGradientMmHg = Math.max(0, pao2AlveolarMmHg - pao2MmHg);
  const aaGradientKpa = Math.max(0, pao2AlveolarKpa - pao2Kpa);

  // Expected A-a gradient based on age: (Age / 4) + 4
  const expectedAaMmHg = (patientAge / 4) + 4;
  const isAaGradientElevated = aaGradientMmHg > Math.max(20, expectedAaMmHg);

  // PaO2/FiO2 ratio
  const pfRatio = Math.round(pao2MmHg / fio2Fraction);
  let pfClass = 'Bình thường (P/F > 400)';
  if (pfRatio < 100) {
    pfClass = 'ARDS mức độ Nặng (P/F < 100)';
  } else if (pfRatio < 200) {
    pfClass = 'ARDS mức độ Trung bình (P/F 100 - 200)';
  } else if (pfRatio < 300) {
    pfClass = 'Tổn thương phổi cấp / ARDS Nhẹ (P/F 200 - 300)';
  } else if (pfRatio < 400) {
    pfClass = 'Giảm oxy hóa máu nhẹ (P/F 300 - 400)';
  }

  // Anion Gap calculation
  let anionGap: number | undefined;
  let anionGapWithK: number | undefined;
  let isAnionGapHigh = false;
  let correctedAnionGap: number | undefined;
  let deltaRatio: number | undefined;
  let deltaRatioInterpretation: string | undefined;

  if (na !== undefined && cl !== undefined) {
    anionGap = na - (cl + hco3); // Normal 8-16, avg 12
    if (k !== undefined) {
      anionGapWithK = (na + k) - (cl + hco3); // Normal 10-18 (p. 39)
      isAnionGapHigh = anionGapWithK > 18;
    } else {
      isAnionGapHigh = anionGap > 16;
    }

    if (albumin !== undefined && albumin < 40) {
      // Corrected AG = AG + 2.5 * (4.0 - albumin(g/dL)) -> if g/L: 0.25 * (40 - alb)
      const albGdl = albumin > 10 ? albumin / 10 : albumin;
      correctedAnionGap = (anionGap || 0) + 2.5 * (4.0 - albGdl);
      if (correctedAnionGap > 16) isAnionGapHigh = true;
    }

    // Delta Ratio: (AG - 12) / (24 - HCO3)
    if (isAnionGapHigh && hco3 < 24) {
      const deltaAG = (anionGap || 12) - 12;
      const deltaHCO3 = 24 - hco3;
      if (deltaHCO3 > 0) {
        deltaRatio = Math.round((deltaAG / deltaHCO3) * 100) / 100;
        if (deltaRatio < 0.4) {
          deltaRatioInterpretation = 'Toan chuyển hóa tăng khoảng trống Anion kèm toan chuyển hóa khoảng trống Anion bình thường (NAGMA phối hợp).';
        } else if (deltaRatio < 0.8) {
          deltaRatioInterpretation = 'Toan chuyển hóa hỗn hợp (HAGMA + NAGMA).';
        } else if (deltaRatio <= 2.0) {
          deltaRatioInterpretation = 'Toan chuyển hóa tăng khoảng trống Anion thuần túy (HAGMA đơn thuần như DKA, Toan lactic).';
        } else {
          deltaRatioInterpretation = 'Toan chuyển hóa tăng AG kèm KIỀM CHUYỂN HÓA phối hợp (hoặc kiềm bù từ toan hô hấp mạn).';
        }
      }
    }
  }

  // Winter's Formula: Expected PaCO2 = (1.5 * HCO3) + 8 ± 2
  const winterMin = Math.round(((1.5 * hco3) + 8 - 2) * 10) / 10;
  const winterMax = Math.round(((1.5 * hco3) + 8 + 2) * 10) / 10;

  // ----------------------------------------------------
  // TRỤC 1: ĐÁNH GIÁ TRAO ĐỔI KHÍ PHỔI (Figure 22, p. 61)
  // ----------------------------------------------------
  let isPaO2Low = false;
  if (fio2Pct <= 21) {
    isPaO2Low = pao2MmHg < 80; // or pao2Kpa < 10.6
  } else {
    // On supplemental O2, rule of thumb: FiO2(%) - PaO2(kPa) should not > 10 (p. 16, 27)
    // Or P/F < 300
    const diff = fio2Pct - pao2Kpa;
    isPaO2Low = diff > 10 || pfRatio < 300;
  }

  // Hypoxaemia Severity (Table 1.9.1, p. 71)
  let hypoxaemiaSeverity: GasExchangeSeverity = 'normal';
  if (pao2Kpa < 5.3 || pao2MmHg < 40 || sao2 < 75 || (fio2Pct >= 60 && pao2MmHg < 80)) {
    hypoxaemiaSeverity = 'severe';
  } else if (pao2Kpa <= 7.9 || pao2MmHg < 60 || sao2 < 90) {
    hypoxaemiaSeverity = 'moderate';
  } else if (isPaO2Low || pao2Kpa <= 10.6 || pao2MmHg < 80 || sao2 < 95) {
    hypoxaemiaSeverity = 'mild';
  }

  const isPaCO2Low = pco2MmHg < 35; // pco2Kpa < 4.7
  const isPaCO2High = pco2MmHg > 45; // pco2Kpa > 6.0
  const isHCO3Low = hco3 < 22;
  const isHCO3High = hco3 > 28;

  let gasExchangeCategory: GasExchangeCategory = 'normal';
  let gasExchangeTitle = 'Trao đổi khí bình thường (Normal Gas Exchange)';
  let gasExchangeDesc = 'Phân áp oxy và thông khí phế nang hoàn toàn nằm trong giới hạn sinh lý bình thường.';
  let type2Subtype: Type2Subtype | undefined;
  let isHyperventilationPrimary: boolean | undefined;

  if (isPaO2Low) {
    if (isPaCO2High) {
      // Type 2 Respiratory Impairment
      gasExchangeCategory = 'type2_respiratory_impairment';
      if (isHCO3High) {
        if (pH < 7.35) {
          type2Subtype = 'acute_on_chronic';
          gasExchangeTitle = 'Suy hô hấp Type 2 Cấp trên nền Mạn (Acute-on-chronic Type 2 Respiratory Impairment)';
          gasExchangeDesc = 'Có tình trạng tăng CO2 mạn tính (HCO3- đã tăng bù trừ từ trước) nhưng xuất hiện suy giảm thông khí cấp tính khiến pH tụt toan máu nguy hiểm.';
        } else {
          type2Subtype = 'chronic';
          gasExchangeTitle = 'Suy hô hấp Type 2 Mạn tính (Chronic Type 2 Respiratory Impairment)';
          gasExchangeDesc = 'Giảm thông khí phế nang mạn tính (thường gặp ở COPD nặng, hội chứng béo phì giảm thông khí Pickwickian), thận đã bù trừ bằng cách giữ HCO3- giúp pH bình thường.';
        }
      } else {
        type2Subtype = 'acute';
        gasExchangeTitle = 'Suy hô hấp Type 2 Cấp tính (Acute Type 2 Respiratory Impairment / Ventilatory Failure)';
        gasExchangeDesc = 'Suy giảm thông khí phế nang đột ngột (ngộ độc thuốc ức chế hô hấp như morphin/an thần, kiệt cơ, chấn thương lồng ngực). Thận chưa kịp bù trừ dẫn tới toan máu cấp.';
      }
    } else {
      // Type 1 Respiratory Impairment (PaO2 low, PaCO2 normal or low)
      gasExchangeCategory = 'type1_respiratory_impairment';
      gasExchangeTitle = `Suy hô hấp Type 1 (Giảm oxy máu) - Mức độ ${
        hypoxaemiaSeverity === 'severe' ? 'Nặng' : hypoxaemiaSeverity === 'moderate' ? 'Trung bình' : 'Nhẹ'
      }`;
      gasExchangeDesc = 'Rối loạn oxy hóa máu đơn thuần với thông khí phế nang được bảo tồn hoặc tăng (PaCO2 bình thường hoặc giảm do thở nhanh phản xạ). Cơ chế thường là bất tương xứng V/Q hoặc Shunt.';
    }
  } else {
    // PaO2 not low
    if (isPaCO2Low) {
      gasExchangeCategory = 'hyperventilation';
      if (isHCO3Low) {
        isHyperventilationPrimary = false;
        gasExchangeTitle = 'Tăng thông khí thứ phát bù trừ Toan chuyển hóa (Secondary Hyperventilation)';
        gasExchangeDesc = 'Bệnh nhân thở nhanh sâu (nhịp thở Kussmaul) để đào thải tối đa CO2, giúp hạ acid bay hơi để kéo pH về phía bình thường.';
      } else {
        isHyperventilationPrimary = true;
        gasExchangeTitle = 'Tăng thông khí nguyên phát (Primary Hyperventilation)';
        gasExchangeDesc = 'Thở nhanh sâu do nguyên nhân tâm lý/lo âu (Psychogenic Hyperventilation), đau đớn, sốt, tổn thương thần kinh trung ương, hoặc giai đoạn rất sớm của thuyên tắc mạch phổi.';
      }
    } else if (isPaCO2High) {
      gasExchangeCategory = 'type2_respiratory_impairment';
      gasExchangeTitle = 'Suy thông khí phế nang (Tăng PaCO2) - Oxy máu được hỗ trợ';
      gasExchangeDesc = 'Bệnh nhân giảm thông khí phế nang nhưng PaO2 bình thường do đang được thở oxy hỗ trợ liều cao.';
      type2Subtype = isHCO3High ? (pH < 7.35 ? 'acute_on_chronic' : 'chronic') : 'acute';
    } else {
      gasExchangeCategory = 'normal';
      gasExchangeTitle = 'Trao đổi khí tại phổi bình thường (Normal Gas Exchange)';
      gasExchangeDesc = 'Cả PaO2 và PaCO2 đều nằm trong giới hạn tham chiếu chuẩn.';
    }
  }

  // ----------------------------------------------------
  // TRỤC 2: ĐÁNH GIÁ THĂNG BẰNG TOAN KIỀM (Figure 23, p. 63)
  // ----------------------------------------------------
  let acidaemiaStatus: 'acidaemia' | 'alkalaemia' | 'normal' = 'normal';
  if (pH < 7.35) acidaemiaStatus = 'acidaemia';
  else if (pH > 7.45) acidaemiaStatus = 'alkalaemia';

  let acidBaseCategory: AcidBaseCategory = 'normal';
  let acidBaseTitle = 'Thăng bằng kiềm toan bình thường';
  let acidBaseDesc = 'pH máu và các chất đệm nằm trong khoảng sinh lý.';
  let compensation: CompensationStatus = 'uncompensated';
  let primaryDisorder = 'Không có rối loạn toan kiềm';
  let compensatoryResponse = 'Không';
  let isMixed = false;
  let mixedDetails: string | undefined;

  if (acidaemiaStatus === 'acidaemia') {
    // pH < 7.35
    if (isPaCO2High && isHCO3Low) {
      // Both point to acidosis: Profound mixed acidosis!
      acidBaseCategory = 'mixed_acid_base';
      isMixed = true;
      primaryDisorder = 'Toan Hô hấp PHỐI HỢP Toan Chuyển hóa (Mixed Respiratory & Metabolic Acidosis)';
      acidBaseTitle = 'Toan Hỗn Hợp Nguy Kịch (Toan Hô Hấp + Toan Chuyển Hóa)';
      acidBaseDesc = 'Dạng rối loạn cực kỳ nguy hiểm: hai quá trình gây toan diễn ra đồng thời, không có cơ chế bù trừ, làm pH tụt rất sâu (thường gặp trong ngừng tuần hoàn, phù phổi cấp kiệt sức, sốc nặng kèm suy hô hấp).';
      compensation = 'mixed';
    } else if (isPaCO2High && !isHCO3Low) {
      // Respiratory acidosis
      primaryDisorder = 'Toan hô hấp (Respiratory Acidosis)';
      acidBaseCategory = 'respiratory_acidosis';
      if (isHCO3High) {
        compensation = 'partially_compensated';
        compensatoryResponse = 'Thận bù trừ bán phần (tăng tái hấp thu HCO3-)';
        acidBaseTitle = 'Toan hô hấp có bù trừ bán phần (Partially Compensated Respiratory Acidosis)';
        acidBaseDesc = 'PaCO2 tăng gây toan máu; thận đã phản ứng tăng giữ HCO3- nhưng chưa đủ để đưa pH về ngưỡng bình thường.';
      } else {
        compensation = 'uncompensated';
        compensatoryResponse = 'Chưa bù trừ (Uncompensated)';
        acidBaseTitle = 'Toan hô hấp cấp chưa bù trừ (Uncompensated Acute Respiratory Acidosis)';
        acidBaseDesc = 'PaCO2 tăng cấp tính, thận chưa kịp điều chỉnh giữ bicarbonate, pH giảm mạnh.';
      }
    } else if (isHCO3Low && !isPaCO2High) {
      // Metabolic acidosis
      primaryDisorder = 'Toan chuyển hóa (Metabolic Acidosis)';
      acidBaseCategory = 'metabolic_acidosis';
      if (isPaCO2Low) {
        compensation = 'partially_compensated';
        compensatoryResponse = 'Phổi tăng thông khí bù trừ bán phần (thải bớt CO2)';
        acidBaseTitle = 'Toan chuyển hóa có bù trừ bán phần (Partially Compensated Metabolic Acidosis)';
        acidBaseDesc = 'HCO3- giảm gây toan máu; trung tâm hô hấp phản ứng tăng thông khí hạ PaCO2 nhưng pH vẫn < 7.35.';
      } else {
        compensation = 'uncompensated';
        compensatoryResponse = 'Chưa bù trừ (Uncompensated)';
        acidBaseTitle = 'Toan chuyển hóa chưa bù trừ (Uncompensated Metabolic Acidosis)';
        acidBaseDesc = 'HCO3- giảm nhưng PaCO2 chưa kịp giảm (hoặc bệnh nhân bị ức chế hô hấp/kiệt cơ không thở nhanh được).';
      }
    } else {
      // Normal PaCO2 & normal HCO3 with low pH? Very rare borderline
      acidBaseCategory = 'mixed_acid_base';
      acidBaseTitle = 'Toan máu mức độ nhẹ (Rối loạn tiềm ẩn)';
      acidBaseDesc = 'pH hơi thấp, các thông số ở giới hạn cận bình thường.';
    }
  } else if (acidaemiaStatus === 'alkalaemia') {
    // pH > 7.45
    if (isPaCO2Low && isHCO3High) {
      // Mixed alkalosis
      acidBaseCategory = 'mixed_acid_base';
      isMixed = true;
      primaryDisorder = 'Kiềm Hô hấp PHỐI HỢP Kiềm Chuyển hóa (Mixed Respiratory & Metabolic Alkalosis)';
      acidBaseTitle = 'Kiềm Hỗn Hợp (Kiềm Hô Hấp + Kiềm Chuyển Hóa)';
      acidBaseDesc = 'Hai quá trình gây kiềm cùng diễn ra (ví dụ: xơ gan vừa tăng thông khí vừa dùng thuốc lợi tiểu hạ Kali, hoặc nôn ói kèm lo âu đau đớn).';
      compensation = 'mixed';
    } else if (isPaCO2Low && !isHCO3High) {
      // Respiratory alkalosis
      primaryDisorder = 'Kiềm hô hấp (Respiratory Alkalosis)';
      acidBaseCategory = 'respiratory_alkalosis';
      if (isHCO3Low) {
        compensation = 'partially_compensated';
        compensatoryResponse = 'Thận tăng đào thải HCO3- bù trừ bán phần';
        acidBaseTitle = 'Kiềm hô hấp có bù trừ bán phần (Partially Compensated Respiratory Alkalosis)';
        acidBaseDesc = 'PaCO2 giảm do tăng thông khí; thận giảm giữ HCO3- nhưng pH vẫn > 7.45.';
      } else {
        compensation = 'uncompensated';
        compensatoryResponse = 'Chưa bù trừ (Uncompensated)';
        acidBaseTitle = 'Kiềm hô hấp cấp chưa bù trừ (Uncompensated Respiratory Alkalosis)';
        acidBaseDesc = 'Thở nhanh làm rửa trôi PaCO2 cấp tính khiến máu bị kiềm hóa.';
      }
    } else if (isHCO3High && !isPaCO2Low) {
      // Metabolic alkalosis
      primaryDisorder = 'Kiềm chuyển hóa (Metabolic Alkalosis)';
      acidBaseCategory = 'metabolic_alkalosis';
      if (isPaCO2High) {
        compensation = 'partially_compensated';
        compensatoryResponse = 'Phổi giảm thông khí để giữ lại CO2';
        acidBaseTitle = 'Kiềm chuyển hóa có bù trừ bán phần (Partially Compensated Metabolic Alkalosis)';
        acidBaseDesc = 'HCO3- máu tăng cao (do nôn, mất dịch dạ dày, lợi tiểu); phổi bù trừ bằng cách giảm thông khí nhưng pH vẫn > 7.45.';
      } else {
        compensation = 'uncompensated';
        compensatoryResponse = 'Chưa bù trừ (Uncompensated)';
        acidBaseTitle = 'Kiềm chuyển hóa chưa bù trừ (Uncompensated Metabolic Alkalosis)';
        acidBaseDesc = 'HCO3- tăng cao, PaCO2 vẫn trong giới hạn bình thường.';
      }
    } else {
      acidBaseCategory = 'mixed_acid_base';
      acidBaseTitle = 'Kiềm máu nhẹ (Rối loạn tiềm ẩn)';
      acidBaseDesc = 'pH tăng trên 7.45 nhưng PaCO2 và HCO3- ở ngưỡng ranh giới.';
    }
  } else {
    // Normal pH (7.35 - 7.45)
    if (isPaCO2Low && isHCO3Low) {
      // Fully compensated or mixed opposing
      compensation = 'fully_compensated';
      if (pH < 7.40) {
        // Leaning towards acidosis -> Primary Metabolic Acidosis with complete respiratory compensation
        primaryDisorder = 'Toan chuyển hóa bù trừ hoàn toàn (hoặc Kiềm hô hấp mạn tính)';
        acidBaseCategory = 'metabolic_acidosis';
        acidBaseTitle = 'Toan chuyển hóa Bù trừ hoàn toàn (Fully Compensated Metabolic Acidosis)';
        acidBaseDesc = 'Bệnh nhân có toan chuyển hóa nguyên phát nhưng phổi đã bù trừ tối đa đưa pH về dải an toàn (7.35 - 7.40). Quy tắc: Không bao giờ bù trừ quá mức (Overcompensation does not occur).';
      } else {
        // Leaning towards alkalosis -> Primary Respiratory Alkalosis with complete metabolic compensation
        primaryDisorder = 'Kiềm hô hấp bù trừ hoàn toàn';
        acidBaseCategory = 'respiratory_alkalosis';
        acidBaseTitle = 'Kiềm hô hấp mạn tính Bù trừ hoàn toàn (Fully Compensated Chronic Respiratory Alkalosis)';
        acidBaseDesc = 'Tăng thông khí kéo dài (ví dụ: ở vùng núi cao, thai kỳ) được thận bù trừ thải bớt HCO3- giúp pH bình thường (7.40 - 7.45).';
      }
    } else if (isPaCO2High && isHCO3High) {
      compensation = 'fully_compensated';
      if (pH < 7.40) {
        // Primary respiratory acidosis compensated
        primaryDisorder = 'Toan hô hấp mạn tính bù trừ hoàn toàn';
        acidBaseCategory = 'respiratory_acidosis';
        acidBaseTitle = 'Toan hô hấp mạn tính Bù trừ hoàn toàn (Fully Compensated Chronic Respiratory Acidosis)';
        acidBaseDesc = 'Bệnh phổi mạn tính (COPD, Pickwickian) gây ứ CO2; thận đã giữ đủ bicarbonate để đưa pH về khoảng 7.35 - 7.40.';
      } else {
        // Primary metabolic alkalosis compensated
        primaryDisorder = 'Kiềm chuyển hóa bù trừ hoàn toàn';
        acidBaseCategory = 'metabolic_alkalosis';
        acidBaseTitle = 'Kiềm chuyển hóa Bù trừ hoàn toàn (Fully Compensated Metabolic Alkalosis)';
        acidBaseDesc = 'Kiềm chuyển hóa nguyên phát được phổi bù trừ bằng giảm thông khí giữ CO2, đưa pH về 7.40 - 7.45.';
      }
    } else if ((isPaCO2High && isHCO3Low) || (isPaCO2Low && isHCO3High)) {
      // Normal pH with opposite major disturbances -> Classic Mixed Acid-Base disorder! (e.g. Salicylate overdose)
      isMixed = true;
      acidBaseCategory = 'mixed_acid_base';
      compensation = 'mixed';
      if (isPaCO2Low && isHCO3Low) {
        acidBaseTitle = 'Rối loạn Toan - Kiềm Hỗn Hợp Đối Kháng (Mixed Acid-Base Disorder)';
        acidBaseDesc = 'Điển hình là ngộ độc Aspirin (Salicylate): Vừa kích thích trung tâm hô hấp gây kiềm hô hấp, vừa là acid hữu cơ gây toan chuyển hóa tăng Anion Gap.';
      } else {
        acidBaseTitle = 'Rối loạn hỗn hợp: Toan hô hấp mạn phối hợp Kiềm chuyển hóa';
        acidBaseDesc = 'Điển hình ở bệnh nhân COPD ứ CO2 mạn tính được điều trị thuốc lợi tiểu quai làm hạ Kali và tăng kiềm chuyển hóa.';
      }
    } else {
      acidBaseCategory = 'normal';
      acidBaseTitle = 'Thăng bằng Kiềm - Toan Bình Thường (Normal Acid-Base Balance)';
      acidBaseDesc = 'pH, PaCO2 và HCO3- đều nằm hoàn toàn trong giới hạn tham chiếu chuẩn.';
    }
  }

  // ----------------------------------------------------
  // CRITICAL CLINICAL WARNINGS (Box 1.7.1, p. 54-55)
  // ----------------------------------------------------
  const criticalWarnings: string[] = [];

  if (isVenousSample) {
    criticalWarnings.push('⚠️ CẢNH BÁO MẪU MÁU TĨNH MẠCH (VBG): Nếu nghi ngờ lấy nhầm máu tĩnh mạch (máu sẫm màu, không tự đẩy piston, SaO2 khí máu thấp xa so với SpO2 kẹp mạch), KHÔNG ĐƯỢC dùng để đánh giá PaO2/oxy hóa máu!');
  }

  if (pao2Kpa < 8.0 || pao2MmHg < 60) {
    criticalWarnings.push('🚨 NGUY CƠ TỬ VONG: PaO2 < 60 mmHg (< 8.0 kPa) rơi vào "ĐOẠN DỐC" của đường cong phân ly Oxyhemoglobin. Bất kỳ sự sụt giảm PaO2 nào tiếp theo đều làm tụt dốc SaO2 đột ngột gây thiếu oxy mô trầm trọng!');
  }

  if (pco2MmHg > 45 && gasExchangeCategory.includes('type2') && pH < 7.25) {
    criticalWarnings.push('🚨 CẤP CỨU HÔ HẤP: PaCO2 tăng kèm toan máu nặng (pH < 7.25) là dấu hiệu kiệt cơ hô hấp (Exhaustion) hoặc suy thông khí tối cấp, cần chuẩn bị hỗ trợ thông khí (BiPAP hoặc đặt Nội khí quản) ngay lập tức!');
  }

  if (pH < 7.25 || hIon > 55) {
    criticalWarnings.push(`🚨 TOAN MÁU NẶNG (pH ${pH} / [H+] ${hIon} nmol/L): Cơ chế bù trừ sinh lý đã cạn kiệt, nguy cơ trụy tim mạch, loạn nhịp thất chết người và đề kháng catecholamine!`);
  } else if (pH > 7.55) {
    criticalWarnings.push(`🚨 KIỀM MÁU NẶNG (pH ${pH}): Tăng co thắt mạch máu não, co giật tetany, giảm tưới máu mạch vành, hạ calci và kali máu đe dọa ngừng tim!`);
  }

  if (be < -10 || hco3 < 15) {
    criticalWarnings.push(`⚠️ TOAN CHUYỂN HÓA NẶNG (BE ${be} / HCO3 ${hco3} mmol/L): Nằm trong các hệ thống tính điểm nguy kịch (APACHE, Glasgow), cảnh báo thiếu oxy mô sâu hoặc tích tụ acid chuyển hóa nặng.`);
  }

  if (lactate !== undefined && lactate > 4.0) {
    criticalWarnings.push(`🚨 TOAN LACTIC NẶNG (${lactate} mmol/L): Chỉ điểm thiếu oxy mô toàn thể / sốc nhiễm khuẩn / hoại tử thiếu máu tạng. Tỷ lệ tử vong lên tới 30-50% nếu không hồi sức kịp thời!`);
  }

  if (coHb !== undefined && coHb > 10) {
    criticalWarnings.push(`🚨 NGỘ ĐỘC KHÍ CO (COHb ${coHb}%): CO ái lực gấp 200 lần oxy với Hemoglobin. Máy đo SpO2 kẹp ngón tay và giá trị PaO2 trên máy khí máu KHÔNG PHẢN ÁNH ĐÚNG lượng oxy mô thực tế! Chỉ định thở Oxy 100% qua mask thở lại ngay.`);
  }

  // ----------------------------------------------------
  // 6-STEP EVALUATION (Pierre & Ranson Table 2.5, p. 11)
  // ----------------------------------------------------
  const sixSteps: StepEvaluation[] = [
    {
      stepNumber: 1,
      stepName: 'Bước 1: Đánh giá lâm sàng (Review the Patient)',
      title: 'Bệnh sử, tri giác và dấu hiệu sinh tồn',
      finding: `Tuổi: ${patientAge}, SpO2: ${sao2}%, FiO2: ${fio2Pct}%`,
      detail: 'Luôn đối chiếu khí máu với bệnh cảnh thực tế: tiền sử COPD, đái tháo đường, chấn thương, sốc, nôn ói hay sử dụng thuốc an thần/morphin. Khí máu không bao giờ được tách rời khỏi người bệnh.',
      status: 'info'
    },
    {
      stepNumber: 2,
      stepName: 'Bước 2: Phân tích Oxy hóa máu (Analyse Oxygenation)',
      title: `PaO2: ${pao2MmHg.toFixed(1)} mmHg (${pao2Kpa.toFixed(1)} kPa) | SaO2: ${sao2}%`,
      finding: isPaO2Low ? `Giảm oxy máu (${hypoxaemiaSeverity})` : 'Oxy hóa máu bảo tồn',
      detail: `Tỉ lệ P/F = ${pfRatio} (${pfClass}). A-a gradient = ${aaGradientMmHg.toFixed(1)} mmHg (chuẩn theo tuổi: ~${expectedAaMmHg.toFixed(0)} mmHg). ${
        isAaGradientElevated ? 'A-a gradient tăng: Tổn thương màng phế nang mao mạch hoặc bất tương xứng V/Q.' : 'A-a gradient bình thường: Giảm oxy do giảm thông khí thuần túy hoặc độ cao.'
      }`,
      status: isPaO2Low ? (hypoxaemiaSeverity === 'severe' ? 'danger' : 'warning') : 'normal'
    },
    {
      stepNumber: 3,
      stepName: 'Bước 3: Đánh giá pH máu (Assess the pH)',
      title: `pH: ${pH} (Nồng độ H+: ${hIon} nmol/L)`,
      finding: acidaemiaStatus === 'acidaemia' ? 'Toan máu (Acidaemia, pH < 7.35)' : acidaemiaStatus === 'alkalaemia' ? 'Kiềm máu (Alkalaemia, pH > 7.45)' : 'pH trong giới hạn bình thường (7.35 - 7.45)',
      detail: acidaemiaStatus === 'acidaemia' 
        ? 'Toan máu làm giảm sức co bóp cơ tim, giảm đáp ứng mạch máu với catecholamine. Nếu pH < 7.25 là tình trạng cấp cứu khẩn.'
        : acidaemiaStatus === 'alkalaemia'
        ? 'Kiềm máu gây co thắt mạch máu não, giảm giải phóng oxy cho mô (lệch trái đường cong oxyhemoglobin) và hạ calci ion tự do.'
        : 'pH bình thường không đồng nghĩa với không có rối loạn: có thể là rối loạn đã bù trừ hoàn toàn hoặc rối loạn hỗn hợp đối kháng.',
      status: acidaemiaStatus === 'normal' ? 'normal' : 'danger'
    },
    {
      stepNumber: 4,
      stepName: 'Bước 4: Đánh giá Rối loạn Hô hấp (Assess Respiratory Disturbance)',
      title: `PaCO2: ${pco2MmHg.toFixed(1)} mmHg (${pco2Kpa.toFixed(1)} kPa)`,
      finding: isPaCO2High ? 'Tăng CO2 máu (Hypercapnia) -> Toan hô hấp' : isPaCO2Low ? 'Giảm CO2 máu (Hypocapnia) -> Kiềm hô hấp' : 'PaCO2 bình thường (35 - 45 mmHg)',
      detail: isPaCO2High
        ? 'Tăng PaCO2 chỉ ra giảm thông khí phế nang. Cần kiểm tra xem là cấp tính, mạn tính (ở COPD) hay cấp trên nền mạn.'
        : isPaCO2Low
        ? 'Giảm PaCO2 do tăng thông khí phế nang. Phân biệt tăng thông khí nguyên phát (lo âu, đau) hay thứ phát bù trừ toan chuyển hóa.'
        : 'Thông khí phế nang bình thường đối với tốc độ sản sinh CO2.',
      status: isPaCO2High || isPaCO2Low ? 'warning' : 'normal'
    },
    {
      stepNumber: 5,
      stepName: 'Bước 5: Đánh giá Rối loạn Chuyển hóa (Assess Metabolic Disturbance)',
      title: `HCO3-: ${hco3} mmol/L | Base Excess (BE): ${be > 0 ? '+' + be : be} mmol/L`,
      finding: isHCO3Low ? 'Giảm Bicarbonate / BE âm -> Toan chuyển hóa' : isHCO3High ? 'Tăng Bicarbonate / BE dương -> Kiềm chuyển hóa' : 'Bicarbonate & BE trong giới hạn bình thường',
      detail: isHCO3Low
        ? `Toan chuyển hóa: Cần tính Khoảng trống Anion (Anion Gap) để phân định toan tăng AG (DKA, Lactic, suy thận, ngộ độc) hay toan AG bình thường (mất qua tiêu hóa, toan ống thận). ${anionGap !== undefined ? `Anion Gap hiện tại = ${anionGap.toFixed(1)} mmol/L (${isAnionGapHigh ? 'TĂNG' : 'BÌNH THƯỜNG'}).` : ''}`
        : isHCO3High
        ? 'Kiềm chuyển hóa: Thường do mất ion H+ qua đường tiêu hóa (nôn ói, hút dạ dày), mất qua thận (lợi tiểu quai/thiazide) hoặc thừa khoáng corticoid.'
        : 'Thành phần đệm chuyển hóa duy trì tốt.',
      status: isHCO3Low || isHCO3High ? 'warning' : 'normal'
    },
    {
      stepNumber: 6,
      stepName: 'Bước 6: Xác định Bù trừ hay Rối loạn Hỗn hợp (Compensatory vs Mixed)',
      title: `Tình trạng bù trừ: ${compensation.toUpperCase()}`,
      finding: acidBaseTitle,
      detail: isMixed
        ? 'Tồn tại đồng thời từ hai rối loạn tiên phát trở lên (ví dụ: vừa toan chuyển hóa vừa kiềm hô hấp như trong ngộ độc Salicylate, hoặc toan hỗn hợp cực nặng trong ngừng tim).'
        : compensation === 'fully_compensated'
        ? `Bù trừ hoàn toàn: pH đã trở lại dải 7.35 - 7.45. Xét mốc 7.40 để biết gốc rối loạn ban đầu (pH < 7.40 thiên toan; pH > 7.40 thiên kiềm). Nhớ rằng sinh lý không bao giờ bù quá mức.`
        : compensation === 'partially_compensated'
        ? 'Bù trừ bán phần: Cơ quan đối nghịch đang nỗ lực bù trừ nhưng pH vẫn còn lệch khỏi khoảng an toàn.'
        : 'Chưa có bù trừ: Rối loạn diễn ra quá cấp tính khiến cơ quan đối nghịch chưa kịp đáp ứng.',
      status: isMixed ? 'danger' : compensation === 'fully_compensated' ? 'normal' : 'warning'
    }
  ];

  // ----------------------------------------------------
  // TREATMENT PROTOCOLS & CLINICAL ACTION
  // ----------------------------------------------------
  const treatmentProtocols = generateTreatmentGuidance(
    gasExchangeCategory,
    hypoxaemiaSeverity,
    type2Subtype,
    acidBaseCategory,
    compensation,
    pH,
    pao2MmHg,
    pco2MmHg,
    hco3,
    lactate,
    glucose,
    isAnionGapHigh,
    fio2Pct
  );

  return {
    gasExchange: {
      category: gasExchangeCategory,
      title: gasExchangeTitle,
      description: gasExchangeDesc,
      severity: hypoxaemiaSeverity,
      type2Subtype,
      isHyperventilationPrimary,
      isHypoxaemia: isPaO2Low,
      hypoxaemiaSeverity
    },
    acidBase: {
      category: acidBaseCategory,
      title: acidBaseTitle,
      description: acidBaseDesc,
      compensation,
      acidaemiaStatus,
      primaryDisorder,
      compensatoryResponse,
      isMixed,
      mixedDetails
    },
    calculations: {
      hIonNmol: hIon,
      pao2MmHg: Math.round(pao2MmHg * 10) / 10,
      paco2MmHg: Math.round(pco2MmHg * 10) / 10,
      pao2Kpa: Math.round(pao2Kpa * 10) / 10,
      paco2Kpa: Math.round(pco2Kpa * 10) / 10,
      pfRatio,
      pfClass,
      pao2Alveolar: Math.round(pao2AlveolarMmHg * 10) / 10,
      aaGradient: Math.round(aaGradientMmHg * 10) / 10,
      expectedAaGradient: Math.round(expectedAaMmHg * 10) / 10,
      isAaGradientElevated,
      anionGap: anionGap !== undefined ? Math.round(anionGap * 10) / 10 : undefined,
      anionGapWithK: anionGapWithK !== undefined ? Math.round(anionGapWithK * 10) / 10 : undefined,
      isAnionGapHigh,
      correctedAnionGap: correctedAnionGap !== undefined ? Math.round(correctedAnionGap * 10) / 10 : undefined,
      deltaRatio,
      deltaRatioInterpretation,
      expectedPaco2Winter: isHCO3Low ? { min: winterMin, max: winterMax } : undefined
    },
    criticalWarnings,
    sixSteps,
    treatmentProtocols
  };
}

function generateTreatmentGuidance(
  gasCategory: GasExchangeCategory,
  gasSeverity: GasExchangeSeverity,
  type2Sub: Type2Subtype | undefined,
  acidCategory: AcidBaseCategory,
  comp: CompensationStatus,
  pH: number,
  pao2: number,
  pco2: number,
  hco3: number,
  lactate?: number,
  glucose?: number,
  isAGHigh?: boolean,
  fio2?: number
) {
  let summary = 'Xử trí thăng bằng nội môi, duy trì oxy hóa máu và giải quyết nguyên nhân gốc rễ.';
  let oxygenTherapy = 'Duy trì SpO2 mục tiêu 94 - 98% ở bệnh nhân không có nguy cơ ứ thán khí CO2.';
  let ventilationSupport = 'Chưa có chỉ định can thiệp thông khí cơ học xâm nhập.';
  const underlyingManagement: string[] = [];
  let monitoringAdvice = 'Theo dõi monitor SpO2 liên tục, làm lại ABG sau 30-60 phút nếu có thay đổi lâm sàng.';
  const precautions: string[] = [];

  // Oxygen & Ventilation guidelines based on Gas Exchange
  if (gasCategory === 'type2_respiratory_impairment') {
    if (type2Sub === 'chronic' || type2Sub === 'acute_on_chronic') {
      summary = 'Xử trí Đợt cấp Suy hô hấp Type 2 trên nền mạn tính (COPD / Pickwickian). Tuyệt đối tránh thở oxy nồng độ cao làm dập tắt Hypoxic Drive!';
      oxygenTherapy = 'Liệu pháp OXY KIỂM SOÁT nồng độ thấp (Controlled Oxygen Therapy): Dùng Mask Venturi 24% - 28% hoặc gọng mũi 1 - 2 L/phút. MỤC TIÊU SpO2 CHẶT CHẼ: 88% - 92% (tránh đẩy PaO2 lên quá cao làm mất kích thích thở)';
      precautions.push('CẢNH BÁO HYPOXIC DRIVE: Ở bệnh nhân ứ CO2 mạn tính, thụ thể cảm nhận CO2 đã trơ lì, phản xạ thở phụ thuộc vào tình trạng thiếu oxy máu. Thở oxy quá mức (như mask 60% hay túi dự trữ) sẽ dập tắt kích thích này, gây giảm thông khí thứ phát, PaCO2 vọt lên dẫn đến hôn mê và ngừng thở!');
      
      if (pH < 7.35 || pco2 > 50) {
        ventilationSupport = 'CHỈ ĐỊNH THÔNG KHÍ KHÔNG XÂM NHẬP (NIV / BiPAP): Ưu tiên hàng đầu cho đợt cấp COPD có toan hô hấp (pH 7.25 - 7.35, PaCO2 tăng). Cài đặt IPAP 10-12 cmH2O, EPAP 4-5 cmH2O, nâng dần để giảm công thở và thải CO2. Chuẩn bị đặt Nội khí quản nếu kiệt cơ (pH < 7.25, rối loạn tri giác).';
      }
      underlyingManagement.push('Khí dung giãn phế quản tác dụng ngắn: SABA (Salbutamol) + SAMA (Ipratropium).');
      underlyingManagement.push('Corticosteroid đường toàn thân (Prednisolone hoặc Methylprednisolone).');
      underlyingManagement.push('Kháng sinh nếu có dấu hiệu nhiễm trùng (tam chứng Anthonisen: tăng khó thở, tăng đờm, đờm mủ).');
    } else {
      // Acute type 2
      summary = 'Xử trí Suy hô hấp Type 2 Cấp tính (Ngộ độc thuốc ức chế thần kinh, kiệt cơ, nhược cơ, dị vật đường thở).';
      oxygenTherapy = 'Cung cấp oxy đủ để duy trì SpO2 > 92%. Vì là cấp tính, bệnh nhân KHÔNG phụ thuộc hypoxic drive, nhưng tăng PaCO2 là khẩn cấp.';
      ventilationSupport = 'Hỗ trợ thông khí bóng qua mask (BVM) ngay lập tức nếu nhịp thở chậm (< 8 l/p) hoặc ngừng thở. Sẵn sàng đặt nội khí quản và thở máy.';
      underlyingManagement.push('Nếu nghi ngờ ngộ độc Opioid/Morphine (đồng tử co nhỏ như đầu đinh ghim, thở chậm): Tiêm tĩnh mạch NALOXONE 0.4mg - 2mg, lặp lại mỗi 2-3 phút nếu chưa đáp ứng.');
      underlyingManagement.push('Nếu do ngộ độc Benzodiazepine: Cân nhắc Flumazenil (thận trọng tiền sử động kinh/nghiện mãn).');
      underlyingManagement.push('Giải phóng dị vật đường thở nếu có tắc nghẽn cơ học.');
    }
  } else if (gasCategory === 'type1_respiratory_impairment') {
    summary = `Xử trí Suy hô hấp Type 1 (Giảm oxy máu mức độ ${gasSeverity}). Mục tiêu nâng PaO2 > 60 mmHg (8 kPa) và SaO2 > 92%.`;
    if (gasSeverity === 'severe') {
      oxygenTherapy = 'Oxy lưu lượng cao: Thở Mask có túi dự trữ không thở lại (Non-rebreather mask) 10 - 15 L/phút để đạt FiO2 60% - 90%, hoặc hệ thống oxy dòng cao qua mũi (HFNC).';
      ventilationSupport = 'Cân nhắc CPAP/NIV hoặc đặt Nội khí quản thở máy xâm nhập nếu P/F < 150, co kéo cơ hô hấp phụ dữ dội hoặc toan lactic tiến triển do kiệt sức.';
    } else if (gasSeverity === 'moderate') {
      oxygenTherapy = 'Thở oxy qua Mask đơn giản 5 - 10 L/phút (FiO2 35 - 50%) hoặc gọng mũi 3 - 5 L/phút.';
    } else {
      oxygenTherapy = 'Thở oxy gọng kính mũi (Nasal cannula) 1 - 3 L/phút (FiO2 24 - 32%).';
    }
    underlyingManagement.push('Tìm và điều trị nguyên nhân V/Q mismatch hoặc Shunt: Viêm phổi (kháng sinh), Thuyên tắc phổi (chống đông khẩn), Phù phổi cấp (lợi tiểu + dãn mạch), Xẹp phổi / Tràn khí màng phổi (dẫn lưu ngực).');
    monitoringAdvice = 'Theo dõi SpO2 liên tục bằng pulse oximeter. Vì PaCO2 bình thường, oximetry là công cụ giám sát tiến triển rất tốt mà không cần đâm kim động mạch liên tục.';
  } else if (gasCategory === 'hyperventilation') {
    summary = 'Xử trí Hội chứng Tăng thông khí (Hyperventilation Syndrome / Rửa trôi CO2).';
    oxygenTherapy = 'Nếu PaO2 bình thường và SpO2 99-100%, KHÔNG cần thở thêm oxy (trừ khi có hạ oxy máu tiềm ẩn như trong thuyên tắc phổi ban đầu).';
    underlyingManagement.push('Trấn an tâm lý bệnh nhân, hướng dẫn kỹ thuật thở chậm và sâu (diaphragmatic breathing).');
    underlyingManagement.push('Thở lại vào túi giấy (Paper bag rebreathing) có kiểm soát để hít lại CO2 tự sinh, giúp nâng PaCO2 và cắt nhanh triệu chứng tê môi/co quắp bàn tay (tetany do hạ calci ion tự do). Thận trọng loại trừ bệnh tim phổi cấp trước khi áp dụng.');
    underlyingManagement.push('Giảm đau thỏa đáng bằng thuốc giảm đau đa mô thức nếu tăng thông khí do đau đớn dữ dội sau chấn thương.');
  }

  // Specific Acid-Base protocols
  if (acidCategory === 'metabolic_acidosis') {
    if (isAGHigh) {
      underlyingManagement.push('TIẾP CẬN TOAN CHUYỂN HÓA TĂNG ANION GAP: Xác định nguyên nhân theo nhóm GOLDMARK / MUDPILES.');
      if (glucose && glucose > 13.9) {
        underlyingManagement.push('Nghi ngờ Nhiễm toan Ceton ĐTĐ (DKA): Bù dịch đẳng trương NaCl 0.9% 1000ml trong giờ đầu; Truyền Insulin tĩnh mạch liên tục 0.1 UI/kg/h; Bù Kali ngay khi K+ < 5.2 mmol/L (chỉ truyền insulin khi K+ > 3.3). KHÔNG dùng Bicarbonate trừ khi pH < 6.9.');
      }
      if (lactate && lactate > 2.0) {
        underlyingManagement.push('Toan Lactic do giảm tưới máu / Sốc: Hồi sức dịch tinh thể 30ml/kg trong 3 giờ đầu (Surviving Sepsis Campaign bundle); Dùng thuốc vận mạch (Noradrenaline) duy trì huyết áp trung bình MAP >= 65 mmHg; Kháng sinh phổ rộng trong giờ đầu nếu nhiễm khuẩn.');
      }
    } else {
      underlyingManagement.push('TIẾP CẬN TOAN CHUYỂN HÓA ANION GAP BÌNH THƯỜNG (Tăng Clo máu): Mất Bicarbonate qua tiêu hóa (tiêu chảy cấp, rò ruột) hoặc qua thận (Toan hóa ống thận RTA Type 1, 2, 4). Điều trị bù dịch Ringer Lactate/bù Bicarbonate đường uống và điều chỉnh Kali.');
    }
  } else if (acidCategory === 'metabolic_alkalosis') {
    underlyingManagement.push('XỬ TRÍ KIỀM CHUYỂN HÓA: Phần lớn là thể "Đáp ứng với Clo" do nôn ói nhiều, mất dịch dạ dày hoặc dùng lợi tiểu quai.');
    underlyingManagement.push('Bù thể tích tuần hoàn và ion Clo bằng truyền tĩnh mạch NaCl 0.9% (giúp thận thải bớt HCO3- dư thừa).');
    underlyingManagement.push('Bù Kali (KCl truyền hoặc uống): Khi thiếu Kali, ống lượn xa thận buộc phải bài tiết ion H+ để giữ Natri, làm duy trì vòng xoắn kiềm chuyển hóa.');
    if (type2Sub === 'chronic') {
      underlyingManagement.push('Lưu ý: Bệnh nhân COPD dùng lợi tiểu liều cao thường bị kiềm chuyển hóa chồng lấp lên toan hô hấp mạn tính. Cân nhắc dùng lợi tiểu giữ Kali (Spironolactone) hoặc tạm ngưng furosemide.');
    }
  }

  return {
    summary,
    oxygenTherapy,
    ventilationSupport,
    underlyingManagement,
    monitoringAdvice,
    precautions
  };
}
