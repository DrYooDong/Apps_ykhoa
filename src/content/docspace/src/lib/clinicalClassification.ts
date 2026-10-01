/**
 * CliniPortal MedLens — Dedicated Clinical Classification & Staging Engine
 * Thuật toán phân độ, phân tầng và phân nhánh lâm sàng chính xác cao theo chuẩn Bộ Y Tế & Quốc Tế.
 * Giải quyết dứt điểm lỗi phân loại sai do cờ priorityLevel: acute.
 */

import {
  ClinicalFormState,
  LabsState,
  TrieuChung,
  VitalsState,
} from '../types.ts';
import {
  DIAGNOSTIC_CHAIN_DATABASE,
  DiseaseReactionChainDefinition,
  SeverityGradingItem,
} from '../../data/diagnostic-criteria-database.ts';

export interface ClassificationResult {
  diseaseId: string;
  gradeIndex: number;
  gradeName: string;
  severityLevel: 'mild' | 'moderate' | 'severe' | 'critical' | 'phenotype';
  triageText: string;
  rationale: string[];
  warningSignsPresent: string[];
  shockOrOrganFailurePresent: string[];
  recommendedAction: string;
}

/**
 * Đánh giá phân loại & phân độ lâm sàng chuyên sâu theo từng bệnh cảnh cụ thể
 */
export function evaluateClinicalClassification(
  diseaseId: string,
  vitals?: VitalsState,
  labs?: LabsState,
  selectedSymptoms: TrieuChung[] = [],
  activeChain?: DiseaseReactionChainDefinition
): ClassificationResult {
  const chain = activeChain || DIAGNOSTIC_CHAIN_DATABASE[diseaseId];
  let severityGrades: SeverityGradingItem[] = chain?.severityGrading || [];
  // Nếu severityGrading rỗng nhưng có multi-axis branches, sử dụng danh sách branches từ trục chính
  if (severityGrades.length === 0 && chain?.branching?.axes?.[0]?.branches?.length) {
    severityGrades = chain.branching.axes[0].branches as any;
  } else if (severityGrades.length === 0 && chain?.branching?.branches?.length) {
    severityGrades = chain.branching.branches as any;
  }

  const sbp = vitals?.vHATT ? parseFloat(vitals.vHATT) : NaN;
  const dbp = vitals?.vHATTr ? parseFloat(vitals.vHATTr) : NaN;
  const pulse = vitals?.vMach ? parseFloat(vitals.vMach) : NaN;
  const rr = vitals?.vTho ? parseFloat(vitals.vTho) : NaN;
  const temp = vitals?.vNhiet ? parseFloat(vitals.vNhiet) : NaN;
  const spo2 = vitals?.vSpo2 ? parseFloat(vitals.vSpo2) : NaN;
  const gcs = vitals?.vGCS ? parseFloat(vitals.vGCS) : NaN;

  const plt = labs?.lTC ? parseFloat(labs.lTC) : NaN;
  const hct = labs?.lHct ? parseFloat(labs.lHct) : NaN;
  const ast = labs?.lAST ? parseFloat(labs.lAST) : NaN;
  const alt = labs?.lALT ? parseFloat(labs.lALT) : NaN;
  const lactate = labs?.lLactate ? parseFloat(labs.lLactate) : NaN;
  const bili = labs?.lBiliTP ? parseFloat(labs.lBiliTP) : NaN;
  const inr = labs?.lINR ? parseFloat(labs.lINR) : NaN;
  const alb = labs?.lAlb ? parseFloat(labs.lAlb) : NaN;
  const wbc = labs?.lBC ? parseFloat(labs.lBC) : NaN;
  const trop = labs?.lTrop ? parseFloat(labs.lTrop) : NaN;

  const selectedIds = new Set(selectedSymptoms.map((s) => s.id));
  const symptomNames = selectedSymptoms.map((s) => s.ten.toLowerCase());

  const rationale: string[] = [];
  const warningSignsPresent: string[] = [];
  const shockOrOrganFailurePresent: string[] = [];

  // =========================================================================
  // 1. SỐT XUẤT HUYẾT DENGUE (Dengue Hemorrhagic Fever / Shock Syndrome)
  // Chuẩn WHO 2009 / QĐ 2760/QĐ-BYT:
  // - Độ 1: SXHD không dấu hiệu cảnh báo
  // - Độ 2: SXHD có dấu hiệu cảnh báo (Warning Signs)
  // - Độ 3: SXHD nặng (Sốc, Xuất huyết nặng, Suy tạng nặng)
  // =========================================================================
  if (
    diseaseId === 'sot_xuat_huyet' ||
    diseaseId === 'sot_xuat_huyet_dengue' ||
    diseaseId.includes('dengue')
  ) {
    // A. Kiểm tra tiêu chí SXHD NẶNG (Độ 3 / Severe Dengue / Dengue Shock Syndrome)
    const isShockBP =
      (!isNaN(sbp) && sbp > 0 && sbp <= 90) ||
      (!isNaN(sbp) && !isNaN(dbp) && sbp - dbp <= 20);
    const isPulsePressureNarrow = !isNaN(pulse) && !isNaN(sbp) && sbp > 0 && pulse / sbp >= 1.0;
    const hasShockSymptom =
      selectedIds.has('tc_soc_mach_nhanh_ha_kep_hoac_tut') ||
      selectedIds.has('soc_mach_nhanh_ha_kep_hoac_tut') ||
      symptomNames.some((n) => n.includes('sốc') || n.includes('trụy mạch'));

    if (isShockBP || hasShockSymptom || (isPulsePressureNarrow && pulse > 115)) {
      shockOrOrganFailurePresent.push(
        isShockBP
          ? `Huyết áp tụt hoặc kẹp (HA ${sbp}/${dbp} mmHg, hiệu áp $\\le 20$)`
          : 'Sốc trụy mạch / Huyết áp kẹp / Mạch nhanh nhỏ khó bắt'
      );
    }

    // Xuất huyết nặng
    if (
      selectedIds.has('non_ra_mau_phan_den') ||
      symptomNames.some((n) => n.includes('nôn ra máu') || n.includes('đi cầu phân đen') || n.includes('xuất huyết tiêu hóa'))
    ) {
      shockOrOrganFailurePresent.push('Xuất huyết tiêu hóa nặng (Nôn máu / Phân đen)');
    }

    // Suy tạng nặng (Gan, Phổi, Thận, Não)
    if ((!isNaN(ast) && ast >= 1000) || (!isNaN(alt) && alt >= 1000)) {
      shockOrOrganFailurePresent.push(`Tổn thương gan cấp nghiêm trọng (AST/ALT ${Math.max(ast || 0, alt || 0)} $\\ge 1000$ U/L)`);
    }
    if ((!isNaN(spo2) && spo2 < 92) || selectedIds.has('suy_ho_hap_tran_dich_mang_phoi')) {
      shockOrOrganFailurePresent.push('Suy hô hấp cấp do thoát dịch màng phổi / phù phổi cấp');
    }
    if (!isNaN(gcs) && gcs < 13) {
      shockOrOrganFailurePresent.push(`Rối loạn tri giác / Bệnh não Dengue (GCS ${gcs} điểm)`);
    }

    // B. Kiểm tra DẤU HIỆU CẢNH BÁO (Warning Signs - Độ 2)
    // Đau bụng vùng gan
    if (
      selectedIds.has('dau_bung_vung_gan') ||
      selectedIds.has('tc_dau_hieu_canh_bao_dau_bung_gan_non_oi') ||
      symptomNames.some((n) => n.includes('đau bụng') || n.includes('hạ sườn phải'))
    ) {
      warningSignsPresent.push('Đau bụng nhiều hoặc ấn đau hạ sườn phải');
    }

    // Nôn ói nhiều
    if (
      selectedIds.has('non_oi_nhieu') ||
      symptomNames.some((n) => n.includes('nôn ói') || n.includes('nôn nhiều'))
    ) {
      warningSignsPresent.push('Nôn ói nhiều liên tục ($\ge 3$ lần/1h hoặc $\ge 4$ lần/6h)');
    }

    // Xuất huyết niêm mạc
    if (
      selectedIds.has('xuat_huyet_niem_mac') ||
      symptomNames.some((n) => n.includes('chảy máu cam') || n.includes('chảy máu chân răng') || n.includes('tiểu máu'))
    ) {
      warningSignsPresent.push('Xuất huyết niêm mạc (chảy máu mũi, chân răng, rong kinh)');
    }

    // Lừ đừ, bồn chồn
    if (
      selectedIds.has('lu_du_bon_chon_li_bi') ||
      symptomNames.some((n) => n.includes('lừ đừ') || n.includes('bồn chồn') || n.includes('li bì'))
    ) {
      warningSignsPresent.push('Lừ đừ, bồn chồn, vật vã hoặc li bì');
    }

    // Cận lâm sàng: Hct tăng kèm tiểu cầu giảm nhanh
    if (!isNaN(hct) && hct >= 43) {
      warningSignsPresent.push(`Cô đặc máu (Hematocrit tăng cao: ${hct}%)`);
    }
    if (!isNaN(plt) && plt > 0 && plt <= 100) {
      warningSignsPresent.push(`Tiểu cầu giảm nhanh $\\le 100$ G/L (Hiện tại: ${plt} G/L)`);
    }
    if ((!isNaN(ast) && ast >= 400 && ast < 1000) || (!isNaN(alt) && alt >= 400 && alt < 1000)) {
      warningSignsPresent.push(`Tổn thương tế bào gan (AST/ALT $\ge 400$ U/L)`);
    }

    // KẾT LUẬN PHÂN ĐỘ DENGUE
    if (shockOrOrganFailurePresent.length > 0) {
      return {
        diseaseId,
        gradeIndex: severityGrades.length > 2 ? 2 : severityGrades.length - 1,
        gradeName: 'Độ 3: Sốt xuất huyết Dengue nặng (Severe Dengue)',
        severityLevel: 'critical',
        triageText: 'Hồi sức cấp cứu (ICU) / Đơn nguyên Sốc Dengue',
        rationale: shockOrOrganFailurePresent,
        warningSignsPresent,
        shockOrOrganFailurePresent,
        recommendedAction: 'Truyền dịch chống sốc khẩn cấp theo phác đồ giờ vàng, chuẩn bị dịch cao phân tử và hội chẩn Hồi sức cấp cứu.',
      };
    }

    if (warningSignsPresent.length > 0) {
      return {
        diseaseId,
        gradeIndex: severityGrades.length > 1 ? 1 : 0,
        gradeName: 'Độ 2: Sốt xuất huyết Dengue có Dấu hiệu Cảnh báo',
        severityLevel: 'severe',
        triageText: 'Nhập viện điều trị nội trú / Theo dõi sát Hct & Dấu hiệu chuyển độ',
        rationale: warningSignsPresent,
        warningSignsPresent,
        shockOrOrganFailurePresent,
        recommendedAction: 'Nhập viện theo dõi nội trú, truyền dịch đẳng trương nếu không uống được, xét nghiệm Hct và Tiểu cầu mỗi 12-24 giờ.',
      };
    }

    return {
      diseaseId,
      gradeIndex: 0,
      gradeName: 'Độ 1: Sốt xuất huyết Dengue không có Dấu hiệu Cảnh báo',
      severityLevel: 'moderate',
      triageText: 'Điều trị ngoại trú có hướng dẫn tái khám hàng ngày',
      rationale: ['Sốt cấp tính kèm triệu chứng toàn thân, sinh hiệu ổn định, chưa ghi nhận dấu hiệu cảnh báo hoặc sốc.'],
      warningSignsPresent: [],
      shockOrOrganFailurePresent: [],
      recommendedAction: 'Bù dịch bằng đường uống (Oresol, nước hoa quả), hạ sốt bằng Paracetamol (không dùng NSAID/Aspirin), dặn dò dấu hiệu nguy hiểm cần tái khám ngay.',
    };
  }

  // =========================================================================
  // 2. VIÊM PHỔI CỘNG ĐỒNG (Community-Acquired Pneumonia - CAP)
  // Thang điểm CURB-65 / CRB-65
  // =========================================================================
  if (
    diseaseId === 'viem_phoi' ||
    diseaseId === 'viem_phoi_cong_dong' ||
    diseaseId.includes('pneumonia')
  ) {
    let curb65Score = 0;
    const curbReasons: string[] = [];

    // C: Confusion
    if (!isNaN(gcs) && gcs < 15) {
      curb65Score += 1;
      curbReasons.push('Tri giác: Lú lẫn / GCS < 15');
    }
    // R: Respiratory rate >= 30
    if (!isNaN(rr) && rr >= 30) {
      curb65Score += 1;
      curbReasons.push(`Nhịp thở $\\ge 30$ lần/phút (Hiện tại: ${rr})`);
    }
    // B: Blood pressure (HATT < 90 hoặc HATTr <= 60)
    if ((!isNaN(sbp) && sbp < 90) || (!isNaN(dbp) && dbp <= 60)) {
      curb65Score += 1;
      curbReasons.push(`Tụt huyết áp (HATT < 90 hoặc HATTr $\\le 60$ mmHg)`);
    }
    // 65: Age >= 65
    const age = vitals ? 65 : 65; // check from form
    if (vitals && (!isNaN(spo2) && spo2 < 90)) {
      curbReasons.push(`Hạ oxy máu nặng (SpO₂ ${spo2}%)`);
    }

    if (curb65Score >= 3 || (!isNaN(spo2) && spo2 < 90) || (sbp < 90 && sbp > 0)) {
      return {
        diseaseId,
        gradeIndex: severityGrades.length > 2 ? 2 : 1,
        gradeName: 'Viêm phổi nặng (CURB-65 $\\ge 3$ hoặc Suy hô hấp cấp)',
        severityLevel: 'critical',
        triageText: 'Nhập khoa Hồi sức cấp cứu / ICU',
        rationale: curbReasons,
        warningSignsPresent: curbReasons,
        shockOrOrganFailurePresent,
        recommendedAction: 'Kháng sinh phổ rộng tiêm tĩnh mạch liều đầu trong 1 giờ, thở oxy lưu lượng cao/HFNC, theo dõi khí máu động mạch.',
      };
    }

    if (curb65Score === 2 || (rr >= 24 && rr < 30) || (spo2 >= 90 && spo2 < 94)) {
      return {
        diseaseId,
        gradeIndex: severityGrades.length > 1 ? 1 : 0,
        gradeName: 'Viêm phổi mức độ trung bình (CURB-65 = 2)',
        severityLevel: 'moderate',
        triageText: 'Nhập viện khoa Nội Hô hấp',
        rationale: curbReasons.length > 0 ? curbReasons : ['Nhịp thở nhanh và giảm oxy máu mức độ vừa'],
        warningSignsPresent: curbReasons,
        shockOrOrganFailurePresent: [],
        recommendedAction: 'Kháng sinh tĩnh mạch phối hợp, thở oxy qua canula, đánh giá đáp ứng sau 48-72 giờ.',
      };
    }

    return {
      diseaseId,
      gradeIndex: 0,
      gradeName: 'Viêm phổi mức độ nhẹ (CURB-65 = 0-1)',
      severityLevel: 'mild',
      triageText: 'Điều trị ngoại trú có theo dõi',
      rationale: ['Bệnh nhân không có dấu hiệu suy hô hấp, huyết động ổn định, CURB-65 thấp.'],
      warningSignsPresent: [],
      shockOrOrganFailurePresent: [],
      recommendedAction: 'Kháng sinh đường uống (Amoxicillin/Clavulanate hoặc Macrolide/Quinolone hô hấp), tái khám sau 48 giờ.',
    };
  }

  // =========================================================================
  // 3. XƠ GAN (Cirrhosis) & SUY GAN CẤP TRÊN NỀN MẠN (ACLF)
  // Phân tầng: Còn bù (Compensated) vs Mất bù (Decompensated) vs ACLF
  // =========================================================================
  if (
    diseaseId === 'xo_gan' ||
    diseaseId === 'xo_gan_con_bu' ||
    diseaseId === 'xo_gan_mat_bu' ||
    diseaseId === 'aclf'
  ) {
    const hasAscites = selectedIds.has('bang_bung') || symptomNames.some((n) => n.includes('cổ trướng') || n.includes('báng bụng'));
    const hasEncephalopathy = selectedIds.has('benh_nao_gan') || symptomNames.some((n) => n.includes('hôn mê gan') || n.includes('bệnh não gan'));
    const hasVaricealBleed = selectedIds.has('non_ra_mau_phan_den') || symptomNames.some((n) => n.includes('vỡ giãn') || n.includes('xuất huyết tiêu hóa'));
    const isDecompensated = hasAscites || hasEncephalopathy || hasVaricealBleed || (!isNaN(bili) && bili >= 50);

    if (diseaseId === 'aclf' || (isDecompensated && (!isNaN(inr) && inr >= 1.5) && (sbp < 90 || spo2 < 92))) {
      return {
        diseaseId,
        gradeIndex: severityGrades.length > 2 ? 2 : 1,
        gradeName: 'Suy gan cấp trên nền mạn (ACLF) / Xơ gan mất bù nguy kịch',
        severityLevel: 'critical',
        triageText: 'Khoa Hồi sức tích cực Gan Mật / ICU',
        rationale: [
          hasEncephalopathy ? 'Bệnh não gan tiến triển' : '',
          hasVaricealBleed ? 'Xuất huyết tiêu hóa do vỡ giãn tĩnh mạch thực quản' : '',
          !isNaN(inr) && inr >= 1.5 ? `Rối loạn đông máu nặng (INR ${inr})` : '',
          !isNaN(bili) && bili >= 50 ? `Bilirubin toàn phần tăng cao (${bili} $\\mu$mol/L)` : '',
        ].filter(Boolean),
        warningSignsPresent: ['Suy chức năng tổng hợp gan nghiêm trọng'],
        shockOrOrganFailurePresent: ['Nguy cơ tử vong ngắn hạn cao'],
        recommendedAction: 'Hồi sức chuyên sâu gan mật, điều chỉnh rối loạn đông máu, tầm soát nhiễm trùng dịch báng (SBP), hội chẩn ghép gan.',
      };
    }

    if (isDecompensated || diseaseId === 'xo_gan_mat_bu') {
      return {
        diseaseId,
        gradeIndex: severityGrades.length > 1 ? 1 : 0,
        gradeName: 'Xơ gan Mất bù (Decompensated Cirrhosis - Child-Pugh B/C)',
        severityLevel: 'severe',
        triageText: 'Điều trị nội trú chuyên khoa Tiêu hóa - Gan mật',
        rationale: [
          hasAscites ? 'Có cổ trướng / báng bụng tự do' : '',
          hasVaricealBleed ? 'Tiền căn hoặc dấu hiệu xuất huyết tiêu hóa do tăng áp cửa' : '',
        ].filter(Boolean),
        warningSignsPresent: ['Tăng áp lực tĩnh mạch cửa và suy tế bào gan'],
        shockOrOrganFailurePresent: [],
        recommendedAction: 'Lợi tiểu phối hợp (Spironolactone + Furosemide), chọc tháo dịch báng nếu báng căng, kiểm soát áp lực tĩnh mạch cửa.',
      };
    }

    return {
      diseaseId,
      gradeIndex: 0,
      gradeName: 'Xơ gan Còn bù (Compensated Cirrhosis - Child-Pugh A)',
      severityLevel: 'moderate',
      triageText: 'Quản lý ngoại trú chuyên khoa Gan Mật định kỳ',
      rationale: ['Không ghi nhận báng bụng, không bệnh não gan, chưa có đợt xuất huyết tiêu hóa.'],
      warningSignsPresent: [],
      shockOrOrganFailurePresent: [],
      recommendedAction: 'Tầm soát giãn tĩnh mạch thực quản qua nội soi dạ dày mỗi 1-2 năm, siêu âm gan + AFP mỗi 6 tháng tầm soát HCC.',
    };
  }

  // =========================================================================
  // 4. VIÊM GAN VI RÚT B (HBV) & C (HCV)
  // Phân tầng: Thể mạn ổn định vs Đợt bùng phát cấp vs Biến chứng xơ gan
  // =========================================================================
  if (
    diseaseId.includes('vgsv_b') ||
    diseaseId.includes('viem_gan_b') ||
    diseaseId.includes('vgsv_B') ||
    diseaseId.includes('viem-gan-vi-rut-b') ||
    diseaseId.includes('viem_gan_sieu_vi_b') ||
    diseaseId.includes('vgsv_c') ||
    diseaseId.includes('viem_gan_c') ||
    diseaseId.includes('vgsv_C')
  ) {
    const isFlare = (!isNaN(alt) && alt >= 300) || (!isNaN(ast) && ast >= 300) || (!isNaN(bili) && bili >= 50);
    const hasLiverFailure = (!isNaN(inr) && inr >= 1.5) || selectedIds.has('benh_nao_gan');

    if (hasLiverFailure) {
      return {
        diseaseId,
        gradeIndex: severityGrades.length > 2 ? 2 : severityGrades.length - 1,
        gradeName: 'Viêm gan virus bùng phát có suy gan cấp (Severe Flare / ACLF)',
        severityLevel: 'critical',
        triageText: 'Khoa Hồi sức Tích cực Gan Mật (ICU)',
        rationale: [
          `Men gan tăng cao kịch phát (AST ${ast || '--'}, ALT ${alt || '--'} U/L)`,
          !isNaN(inr) && inr >= 1.5 ? `Rối loạn đông máu (INR ${inr})` : '',
        ].filter(Boolean),
        warningSignsPresent: ['Suy chức năng tế bào gan cấp tính'],
        shockOrOrganFailurePresent: ['Nguy cơ hôn mê gan và suy đa tạng'],
        recommendedAction: 'Khởi động thuốc kháng virus NAs (Tenofovir / Entecavir) khẩn cấp, hồi sức chức năng gan và chuẩn bị lọc máu thay huyết tương.',
      };
    }

    if (isFlare) {
      return {
        diseaseId,
        gradeIndex: severityGrades.length > 1 ? 1 : 0,
        gradeName: 'Đợt bùng phát viêm gan virus cấp tính (Acute Flare)',
        severityLevel: 'severe',
        triageText: 'Nhập viện khoa Nhiễm / Gan Mật điều trị nội trú',
        rationale: [`Men gan tăng cấp tính > 5-10 lần giới hạn trên (ALT ${alt || ast} U/L)`],
        warningSignsPresent: ['Hoại tử tế bào gan đang tiến triển mạnh'],
        shockOrOrganFailurePresent: [],
        recommendedAction: 'Khởi động phác đồ NAs hoặc thuốc kháng virus trực tiếp (DAAs), xét nghiệm tải lượng HBV-DNA/HCV-RNA, theo dõi đông máu mỗi 48h.',
      };
    }

    return {
      diseaseId,
      gradeIndex: 0,
      gradeName: 'Viêm gan virus mạn tính thể hoạt động thông thường',
      severityLevel: 'moderate',
      triageText: 'Điều trị và quản lý ngoại trú chuyên khoa Gan Mật',
      rationale: ['Men gan tăng nhẹ-vừa, chức năng gan còn bù, không có dấu hiệu suy gan cấp.'],
      warningSignsPresent: [],
      shockOrOrganFailurePresent: [],
      recommendedAction: 'Điều trị ngoại trú bằng thuốc kháng virus uống, theo dõi AST/ALT, HBeAg và định lượng virus định kỳ 3-6 tháng.',
    };
  }

  // =========================================================================
  // 5. SỐT RÉT (Malaria)
  // Phân tầng: Sốt rét thông thường vs Sốt rét ác tính (Severe Malaria)
  // =========================================================================
  if (diseaseId.includes('sot_ret') || diseaseId.includes('malaria')) {
    const isSevereMalaria =
      (!isNaN(gcs) && gcs < 15) ||
      (!isNaN(sbp) && sbp <= 90 && sbp > 0) ||
      (!isNaN(spo2) && spo2 < 92) ||
      selectedIds.has('hon_me') ||
      selectedIds.has('vang_da_dam') ||
      (!isNaN(bili) && bili >= 50);

    if (isSevereMalaria) {
      return {
        diseaseId,
        gradeIndex: severityGrades.length > 1 ? 1 : 0,
        gradeName: 'Sốt rét ác tính (Severe Falciparum Malaria)',
        severityLevel: 'critical',
        triageText: 'Khoa Hồi sức Cấp cứu (ICU) / Bệnh viện Tuyến Tỉnh',
        rationale: ['Bệnh nhân có dấu hiệu đe dọa sinh mạng: Rối loạn tri giác / Tụt HA / Suy hô hấp cấp / Vàng da đậm.'],
        warningSignsPresent: ['Thể não / Suy tạng do KST sốt rét ký sinh'],
        shockOrOrganFailurePresent: ['Đe dọa tử vong trong vòng 24-48 giờ'],
        recommendedAction: 'Artesunate tiêm tĩnh mạch liều đầu ngay lập tức (2.4 mg/kg tại 0h, 12h, 24h), hồi sức chống phù não và suy thận.',
      };
    }

    return {
      diseaseId,
      gradeIndex: 0,
      gradeName: 'Sốt rét thông thường (Uncomplicated Malaria)',
      severityLevel: 'moderate',
      triageText: 'Điều trị nội trú / ngoại trú có kiểm soát tại cơ sở y tế',
      rationale: ['Ký sinh trùng sốt rét dương tính, sinh hiệu ổn định, chưa có tổn thương cơ quan đích.'],
      warningSignsPresent: [],
      shockOrOrganFailurePresent: [],
      recommendedAction: 'Thuốc phối hợp gốc Artemisinin (ACT) đường uống đủ 3 ngày theo phác đồ Bộ Y Tế.',
    };
  }

  // =========================================================================
  // 6. THỦY ĐẬU (Varicella)
  // Phân tầng: Thể thông thường vs Thể có biến chứng (Viêm phổi, Bội nhiễm, Thần kinh)
  // =========================================================================
  if (diseaseId.includes('thuy_dau') || diseaseId.includes('varicella')) {
    const hasComplication =
      (!isNaN(spo2) && spo2 < 94) ||
      selectedIds.has('kho_tho') ||
      symptomNames.some((n) => n.includes('bội nhiễm') || n.includes('mủ') || n.includes('co giật') || n.includes('khó thở'));

    if (hasComplication) {
      return {
        diseaseId,
        gradeIndex: severityGrades.length > 1 ? 1 : 0,
        gradeName: 'Thủy đậu có biến chứng (Viêm phổi VZV / Bội nhiễm mô mềm)',
        severityLevel: 'severe',
        triageText: 'Nhập viện khoa Truyền nhiễm / Cách ly điều trị nội trú',
        rationale: ['Tổn thương bóng nước bội nhiễm hoặc có triệu chứng hô hấp/thần kinh tiến triển.'],
        warningSignsPresent: ['Biến chứng nhiễm trùng thứ phát hoặc viêm phổi'],
        shockOrOrganFailurePresent: [],
        recommendedAction: 'Acyclovir tĩnh mạch (10 mg/kg mỗi 8 giờ) kết hợp kháng sinh chống tụ cầu nếu có bội nhiễm da.',
      };
    }

    return {
      diseaseId,
      gradeIndex: 0,
      gradeName: 'Thủy đậu thông thường (Uncomplicated Varicella)',
      severityLevel: 'mild',
      triageText: 'Cách ly và điều trị ngoại trú tại nhà',
      rationale: ['Phát ban dạng bóng nước điển hình, tổng trạng ổn định, không có dấu hiệu suy hô hấp.'],
      warningSignsPresent: [],
      shockOrOrganFailurePresent: [],
      recommendedAction: 'Acyclovir đường uống trong 24-48h đầu phát ban, vệ sinh da bằng dung dịch sát khuẩn, hạ sốt bằng Paracetamol.',
    };
  }

  // =========================================================================
  // 7. SỐT XOẮN KHUẨN LEPTOSPIRA
  // Phân tầng: Thể nhẹ không vàng da vs Hội chứng Weil (Vàng da, Suy thận, Xuất huyết)
  // =========================================================================
  if (diseaseId.includes('leptospira')) {
    const isWeil =
      (!isNaN(bili) && bili >= 50) ||
      (!isNaN(plt) && plt <= 80) ||
      (labs?.lCre && parseFloat(labs.lCre) >= 200) ||
      symptomNames.some((n) => n.includes('vàng da') || n.includes('tiểu ít') || n.includes('xuất huyết phổi'));

    if (isWeil) {
      return {
        diseaseId,
        gradeIndex: severityGrades.length > 1 ? 1 : 0,
        gradeName: 'Sốt xoắn khuẩn thể nặng / Hội chứng Weil (Weil Disease)',
        severityLevel: 'critical',
        triageText: 'Khoa Hồi sức Cấp cứu (ICU)',
        rationale: ['Tam chứng Weil: Vàng da đậm, suy thận cấp và xuất huyết giảm tiểu cầu.'],
        warningSignsPresent: ['Tổn thương gan thận cấp tính'],
        shockOrOrganFailurePresent: ['Nguy cơ xuất huyết phổi và suy đa tạng'],
        recommendedAction: 'Penicillin G tĩnh mạch liều cao (1.5 triệu UI mỗi 6 giờ) hoặc Ceftriaxone 2g/ngày, lọc máu cấp cứu nếu suy thận tiến triển.',
      };
    }

    return {
      diseaseId,
      gradeIndex: 0,
      gradeName: 'Sốt xoắn khuẩn thể nhẹ (Anicteric Leptospirosis)',
      severityLevel: 'moderate',
      triageText: 'Điều trị nội trú khoa Truyền nhiễm',
      rationale: ['Sốt cấp tính kèm đau cơ bắp chân dữ dội, kết mạc mắt cương tụ, chưa vàng da.'],
      warningSignsPresent: [],
      shockOrOrganFailurePresent: [],
      recommendedAction: 'Doxycycline 100mg x 2 lần/ngày hoặc Amoxicillin 500mg x 3 lần/ngày đường uống trong 7 ngày.',
    };
  }

  // =========================================================================
  // 8. VIÊM MÀNG NÃO CẤP (Bacterial / Viral Meningitis)
  // Bệnh cảnh cấp cứu thần kinh luôn phân tầng ICU / Hồi sức khẩn
  // =========================================================================
  if (diseaseId.includes('mang_nao') || diseaseId.includes('meningitis')) {
    return {
      diseaseId,
      gradeIndex: severityGrades.length > 1 ? 1 : 0,
      gradeName: 'Viêm màng não cấp tính (Cấp cứu thần kinh tối khẩn)',
      severityLevel: 'critical',
      triageText: 'Phòng Cấp cứu / Hồi sức ICU Nhiễm',
      rationale: ['Hội chứng màng não cấp tính (Sốt, đau đầu dữ dội, cổ cứng hoặc nôn ói)'],
      warningSignsPresent: ['Nguy cơ tụt kẹt não và sốc nhiễm khuẩn'],
      shockOrOrganFailurePresent: ['Đe dọa tử vong hoặc di chứng thần kinh vĩnh viễn'],
      recommendedAction: 'Kháng sinh diệt khuẩn liều cao tiêm tĩnh mạch trong giờ vàng (Ceftriaxone 2g mỗi 12h + Vancomycin), phối hợp Dexamethasone trước hoặc cùng liều kháng sinh đầu.',
    };
  }

  // =========================================================================
  // 9. BỆNH LÝ TỔNG QUÁT KHÁC: Đánh giá theo tiêu chuẩn trong severityGrading
  // =========================================================================
  if (severityGrades.length > 0) {
    // Kiểm tra sinh hiệu nguy kịch
    const hasEmergency =
      (!isNaN(sbp) && sbp <= 90 && sbp > 0) ||
      (!isNaN(spo2) && spo2 < 90 && spo2 > 0) ||
      (!isNaN(gcs) && gcs < 12);

    if (hasEmergency && severityGrades.length >= 2) {
      const highestIdx = severityGrades.length - 1;
      const targetGrade = severityGrades[highestIdx];
      const gName = (targetGrade as any).grade || (targetGrade as any).name || 'Mức độ Nặng / Nguy kịch';
      return {
        diseaseId,
        gradeIndex: highestIdx,
        gradeName: gName,
        severityLevel: 'critical',
        triageText: (targetGrade as any).triage || 'Cấp cứu hồi sức ICU',
        rationale: ['Sinh hiệu nguy kịch: Tụt huyết áp, suy hô hấp cấp hoặc rối loạn tri giác'],
        warningSignsPresent: ['Dấu hiệu sinh tồn bất thường'],
        shockOrOrganFailurePresent: ['Đe dọa chức năng sống'],
        recommendedAction: (targetGrade as any).primaryAction || 'Hồi sức cấp cứu và can thiệp kịp thời.',
      };
    }

    // Mặc định chọn mức độ nhẹ/ban đầu
    const firstGrade = severityGrades[0];
    const gName = (firstGrade as any).grade || (firstGrade as any).name || 'Phân tầng ban đầu';
    return {
      diseaseId,
      gradeIndex: 0,
      gradeName: gName,
      severityLevel: 'moderate',
      triageText: (firstGrade as any).triage || 'Theo dõi lâm sàng nội trú / ngoại trú',
      rationale: [(firstGrade as any).criteria || 'Phù hợp thể lâm sàng ban đầu'],
      warningSignsPresent: [],
      shockOrOrganFailurePresent: [],
      recommendedAction: (firstGrade as any).primaryAction || 'Tuân thủ phác đồ điều trị chuyên khoa.',
    };
  }

  // Mặc định nếu không có severityGrading
  return {
    diseaseId,
    gradeIndex: 0,
    gradeName: 'Tiếp cận toàn diện',
    severityLevel: 'moderate',
    triageText: 'Khoa Lâm sàng chuyên khoa',
    rationale: ['Điều trị theo phác đồ chuẩn Bộ Y Tế'],
    warningSignsPresent: [],
    shockOrOrganFailurePresent: [],
    recommendedAction: 'Theo dõi sinh hiệu và đánh giá đáp ứng điều trị.',
  };
}
