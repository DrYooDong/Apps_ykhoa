/**
 * CliniPortal DocSpace — Clinical Syndrome Engine (Hội chứng Lâm sàng)
 * Định nghĩa chuẩn: Hội chứng lâm sàng là tập hợp ít nhất 02 triệu chứng.
 * Cung cấp:
 * 1. Từ điển Hội chứng lâm sàng chuẩn y khoa (≥ 2 triệu chứng).
 * 2. Đánh giá tự động tỷ lệ triệu chứng hiện có / tổng số triệu chứng (VD: 2/10, 3/7).
 * 3. Tích hợp vào Tiêu chuẩn chẩn đoán & Động cơ suy luận CDSS.
 */

import { SyndromeDefinition, SyndromeMatchResult, TrieuChung } from '../types.ts';

/**
 * DANH MỤC HỘI CHỨNG LÂM SÀNG CHUẨN Y KHOA
 * Quy tắc bất di bất dịch: Mỗi hội chứng BẮT BUỘC có ít nhất 02 triệu chứng thành phần.
 */
export const SYNDROME_REGISTRY: Record<string, SyndromeDefinition> = {
  // 1. HỘI CHỨNG DẤU HIỆU CẢNH BÁO SXHD (7 Dấu hiệu theo WHO 2025 / QĐ 2760/QĐ-BYT)
  hc_warning_signs_dengue: {
    id: 'hc_warning_signs_dengue',
    ten: 'Hội chứng Dấu hiệu Cảnh báo SXHD',
    chuyenKhoa: 'Truyền nhiễm',
    moTa: 'Tập hợp 7 dấu hiệu cảnh báo nguy cơ sốc hoặc thoát huyết tương nặng theo Quyết định 2760/QĐ-BYT. Đạt khi có ≥ 1 dấu hiệu.',
    nguong: {
      loai: 'at_least_n',
      n: 1, // Theo BYT: chỉ cần 1 dấu hiệu cảnh báo là nhập viện nội trú 100%
    },
    trieuChung: [
      'tc_dau_hieu_canh_bao_dau_bung_gan_non_oi', // Đau bụng nhiều liên tục vùng gan
      'buon_non_non',                            // Nôn ói nhiều (≥ 3 lần/1h hoặc ≥ 4 lần/6h)
      'vat_va_lu_du_li_bi',                      // Vật vã, lừ đừ, li bì
      'tc_xuat_huyet_da_niem_lacet_duong_tinh',  // Xuất huyết niêm mạc (chảy máu răng, mũi, tiêu máu)
      'gan_to_dau',                              // Gan to > 2cm dưới bờ sườn
      'thieu_nieu_tieu_it',                      // Tiểu ít (không tiểu > 6h)
      'tc_co_dac_mau_hct_tang_tren_20_phan_tram', // Hematocrit tăng cao kèm tiểu cầu giảm nhanh
    ],
  },

  // 2. HỘI CHỨNG SỐT XUẤT HUYẾT DENGUE CỔ ĐIỂN (Thành phần lâm sàng thể nhẹ)
  hc_sxhd_classic: {
    id: 'hc_sxhd_classic',
    ten: 'Hội chứng Sốt xuất huyết Dengue Cổ điển',
    chuyenKhoa: 'Truyền nhiễm',
    moTa: 'Sốt cao đột ngột kèm ít nhất 2 trong các triệu chứng đau mỏi, phát ban, buồn nôn, xuất huyết dưới da.',
    nguong: {
      loai: 'at_least_n',
      n: 2,
    },
    trieuChung: [
      'tc_sot_cao_dot_ngot_duoi_7_ngay',          // Sốt cao đột ngột ≤ 7 ngày
      'buon_non_non',                            // Buồn nôn, nôn
      'tc_xuat_huyet_da_niem_lacet_duong_tinh',  // Phát ban xung huyết, chấm xuất huyết
      'dau_dau',                                 // Đau đầu dữ dội, nhức hốc mắt
      'dau_co',                                  // Đau cơ toàn thân
      'gan_to_dau',                              // Đau tức vùng hạ sườn phải
      'met_moi',                                 // Mệt mỏi suy nhược
    ],
  },

  // 3. HỘI CHỨNG SỐC GIẢM THỂ TÍCH SXHD (Thoát huyết tương nặng)
  hc_soc_sxhd: {
    id: 'hc_soc_sxhd',
    ten: 'Hội chứng Sốc Giảm thể tích Thoát huyết tương',
    chuyenKhoa: 'Hồi sức cấp cứu',
    moTa: 'Rối loạn huyết động cấp tính do thoát huyết tương ồ ạt qua mao mạch. Đạt khi có ít nhất 2 dấu hiệu suy tuần hoàn.',
    nguong: {
      loai: 'at_least_n',
      n: 2,
    },
    trieuChung: [
      'tc_soc_mach_nhanh_ha_kep_hoac_tut',       // Mạch nhanh nhỏ nhẹ, huyết áp kẹp (≤ 20 mmHg) hoặc tụt HA
      'chi_lanh_crt_keo_dai',                    // Chi lạnh ẩm, thời gian đổ đầy mao mạch CRT > 2 giây
      'tc_co_dac_mau_hct_tang_tren_20_phan_tram', // Cô đặc máu nặng Hematocrit tăng > 20%
      'thieu_nieu_tieu_it',                      // Thiểu niệu / vô niệu (< 0.5 mL/kg/h)
      'tran_dich_mang_phoi_mang_bung',           // Tràn dịch màng phổi, màng bụng lượng nhiều
    ],
  },

  // 4. HỘI CHỨNG KÍCH THÍCH MÀNG NÃO CẤP TÍNH
  hc_mang_nao: {
    id: 'hc_mang_nao',
    ten: 'Hội chứng Kích thích Màng não cấp',
    chuyenKhoa: 'Thần kinh',
    moTa: 'Phản ứng kích thích màng nhện và khoang dưới nhện do nhiễm trùng vi khuẩn/vi rút hoặc xuất huyết dưới nhện. Cần ít nhất 2 triệu chứng.',
    nguong: {
      loai: 'at_least_n',
      n: 2,
    },
    trieuChung: [
      'dau_dau',                                 // Đau đầu dữ dội liên tục
      'cung_gay_dieu_tri_mang_nao',              // Cứng gáy / Cổ gượng
      'photophobia_so_anh_sang',                 // Sợ ánh sáng, sợ tiếng động
      'buon_non_non',                            // Buồn nôn hoặc nôn vọt
      'sot',                                     // Sốt cấp tính
      'co_giat_va_dau_than_kinh_khu_tru_dau_hieu_co_do', // Rối loạn tri giác, co giật
    ],
  },

  // 5. HỘI CHỨNG NHIỄM TRÙNG TOÀN THÂN
  hc_nhiem_trung: {
    id: 'hc_nhiem_trung',
    ten: 'Hội chứng Nhiễm trùng toàn thân',
    chuyenKhoa: 'Truyền nhiễm',
    moTa: 'Phản ứng viêm toàn thân trước sự xâm nhập của vi sinh vật gây bệnh. Đạt khi có ít nhất 2 triệu chứng.',
    nguong: {
      loai: 'at_least_n',
      n: 2,
    },
    trieuChung: [
      'sot',                                     // Sốt (≥ 38.0°C) hoặc hạ thân nhiệt
      'tc_sot_cao_dot_ngot_duoi_7_ngay',          // Sốt cao cấp tính
      'met_moi',                                 // Mệt mỏi suy sụp toàn trạng
      'moi_kho_luoi_do',                         // Môi khô, lưỡi bẩn, hơi thở hôi
      'bach_cau_tang',                           // Bạch cầu máu tăng cao hoặc chuyển trái
      'crp_tang',                                // CRP hoặc Procalcitonin tăng cao
    ],
  },

  // 6. TIÊU CHUẨN ĐÁP ỨNG VIÊM TOÀN THÂN (SIRS)
  hc_sirs: {
    id: 'hc_sirs',
    ten: 'Hội chứng Đáp ứng Viêm Toàn thân (SIRS)',
    chuyenKhoa: 'Hồi sức cấp cứu',
    moTa: 'Tiêu chuẩn SIRS (Bone et al.): Đạt khi thỏa mãn ít nhất 2 trong 4 tiêu chí sinh hiệu & huyết học.',
    nguong: {
      loai: 'at_least_n',
      n: 2,
    },
    trieuChung: [
      'sot',                                     // Thân nhiệt > 38°C hoặc < 36°C
      'mach_nhanh',                              // Nhịp tim > 90 lần/phút
      'tho_nhanh',                               // Nhịp thở > 20 lần/phút hoặc PaCO2 < 32 mmHg
      'bach_cau_tang',                           // Bạch cầu > 12 G/L hoặc < 4 G/L
    ],
  },

  // 7. THANG ĐIỂM QSOFA (QUICK SOFA)
  hc_qsofa: {
    id: 'hc_qsofa',
    ten: 'Hội chứng Đánh giá Nguy cơ Sepsis (qSOFA)',
    chuyenKhoa: 'Hồi sức cấp cứu',
    moTa: 'Tiêu chuẩn sàng lọc nhiễm khuẩn huyết tại giường của Sepsis-3. Đạt nguy cơ cao khi có ≥ 2/3 tiêu chí.',
    nguong: {
      loai: 'at_least_n',
      n: 2,
    },
    trieuChung: [
      'tho_nhanh',                               // Nhịp thở ≥ 22 lần/phút
      'vat_va_lu_du_li_bi',                      // Rối loạn tri giác (GCS < 15, lơ mơ, li bì)
      'ha_huyet_ap',                             // Huyết áp tâm thu ≤ 100 mmHg
    ],
  },

  // 8. HỘI CHỨNG SUY HÔ HẤP CẤP
  hc_suy_ho_hap_cap: {
    id: 'hc_suy_ho_hap_cap',
    ten: 'Hội chứng Suy hô hấp cấp',
    chuyenKhoa: 'Hô hấp',
    moTa: 'Tình trạng rối loạn trao đổi khí cấp tính đe dọa oxy hóa máu. Cần ít nhất 2 dấu hiệu hô hấp bất thường.',
    nguong: {
      loai: 'at_least_n',
      n: 2,
    },
    trieuChung: [
      'tho_nhanh',                               // Thở nhanh nông > 24 l/p hoặc khó thở
      'kho_tho',                                 // Khó thở khi nằm hoặc co kéo cơ hô hấp
      'tim_tai',                                 // Tím tái môi đầu chi
      'spo2_giam',                               // SpO2 < 94% khí phòng
      'tran_dich_mang_phoi_mang_bung',           // Tràn dịch màng phổi cản trở thông khí
    ],
  },

  // 9. HỘI CHỨNG SUY TIM SUNG HUYẾT
  hc_suy_tim_sung_huyet: {
    id: 'hc_suy_tim_sung_huyet',
    ten: 'Hội chứng Suy tim Sung huyết',
    chuyenKhoa: 'Tim mạch',
    moTa: 'Tiêu chuẩn Framingham cải biên: ứ trệ tuần hoàn ngoại vi và phổi. Đạt khi có ít nhất 2 triệu chứng.',
    nguong: {
      loai: 'at_least_n',
      n: 2,
    },
    trieuChung: [
      'kho_tho',                                 // Khó thở khi gắng sức / khi nằm
      'phu_chi_duoi',                            // Phù mềm hai chi dưới
      'tinh_mach_co_noi',                        // Tĩnh mạch cổ nổi tư thế 45 độ
      'gan_to_dau',                              // Gan to ứ huyết, phản hồi gan TMC (+)
      'met_moi',                                 // Giảm khả năng gắng sức
    ],
  },

  // 10. HỘI CHỨNG XUẤT HUYẾT DO GIẢM TIỂU CẦU
  hc_xuat_huyet: {
    id: 'hc_xuat_huyet',
    ten: 'Hội chứng Xuất huyết Giảm tiểu cầu',
    chuyenKhoa: 'Huyết học',
    moTa: 'Rối loạn đông cầm máu vi mạch biểu hiện xuất huyết da niêm và xét nghiệm tiểu cầu tụt dốc.',
    nguong: {
      loai: 'at_least_n',
      n: 2,
    },
    trieuChung: [
      'tc_xuat_huyet_da_niem_lacet_duong_tinh',  // Chấm, nốt xuất huyết dưới da, Lacet (+)
      'tc_giam_tieu_cau_duoi_100_g_l',           // Số lượng tiểu cầu giảm sâu < 100 G/L
      'chay_mau_niem_mac',                       // Chảy máu mũi, chảy máu chân răng
      'xuat_huyet_noi_tang',                     // Xuất huyết tiêu hóa, tiểu máu
    ],
  },
};

/**
 * Bảng ánh xạ các mã tiêu chuẩn chẩn đoán trong CDSS sang Hội chứng tương ứng
 */
const CRITERION_TO_SYNDROME_MAP: Record<string, string> = {
  // Hội chứng cảnh báo SXHD
  tc_dau_hieu_canh_bao_dau_bung_gan_non_oi: 'hc_warning_signs_dengue',
  dhcb_dengue: 'hc_warning_signs_dengue',
  warning_signs_dengue: 'hc_warning_signs_dengue',

  // Hội chứng SXHD thể nhẹ / cổ điển
  hc_sxhd_classic: 'hc_sxhd_classic',
  classic_dengue: 'hc_sxhd_classic',

  // Hội chứng Sốc SXHD
  tc_soc_mach_nhanh_ha_kep_hoac_tut: 'hc_soc_sxhd',
  soc_sxhd: 'hc_soc_sxhd',
  dss_shock: 'hc_soc_sxhd',

  // Hội chứng màng não
  hcm_sot_dau_dau_cung_gay_hoi_chung_mang_nao: 'hc_mang_nao',
  cung_gay_dieu_tri_mang_nao: 'hc_mang_nao',
  hoi_chung_mang_nao: 'hc_mang_nao',

  // Hội chứng xuất huyết
  tc_xuat_huyet_da_niem_lacet_duong_tinh: 'hc_xuat_huyet',
};

/**
 * Tra cứu Hội chứng tương ứng từ mã tiêu chuẩn chẩn đoán (criterion ID)
 */
export function findSyndromeByCriterionId(criterionId: string): SyndromeDefinition | undefined {
  if (!criterionId) return undefined;

  // 1. Khớp trực tiếp mã hội chứng trong Registry
  if (SYNDROME_REGISTRY[criterionId]) {
    return SYNDROME_REGISTRY[criterionId];
  }

  // 2. Khớp qua bảng ánh xạ
  const mappedId = CRITERION_TO_SYNDROME_MAP[criterionId];
  if (mappedId && SYNDROME_REGISTRY[mappedId]) {
    return SYNDROME_REGISTRY[mappedId];
  }

  // 3. Khớp tiền tố hoặc từ khóa
  const idLower = criterionId.toLowerCase();
  for (const [key, syn] of Object.entries(SYNDROME_REGISTRY)) {
    if (idLower.includes(key) || key.includes(idLower)) {
      return syn;
    }
  }

  return undefined;
}

/**
 * Đánh giá 01 hội chứng cụ thể dựa trên tập hợp các triệu chứng hiện có
 */
export function evaluateSyndrome(
  syndromeId: string,
  presentSymptomIds: Set<string>,
  vocabMap?: Record<string, TrieuChung>
): SyndromeMatchResult | null {
  const syn = SYNDROME_REGISTRY[syndromeId];
  if (!syn) return null;

  const totalCount = syn.trieuChung.length;
  const matchedSymptoms: Array<{ id: string; ten: string }> = [];
  const missingSymptoms: Array<{ id: string; ten: string }> = [];

  for (const tcId of syn.trieuChung) {
    const symptomName = vocabMap?.[tcId]?.ten || tcId;
    if (presentSymptomIds.has(tcId)) {
      matchedSymptoms.push({ id: tcId, ten: symptomName });
    } else {
      missingSymptoms.push({ id: tcId, ten: symptomName });
    }
  }

  const matchedCount = matchedSymptoms.length;
  let threshold = syn.nguong.n;
  if (syn.nguong.loai === 'all') {
    threshold = totalCount;
  } else if (syn.nguong.loai === 'percentage') {
    threshold = Math.ceil((totalCount * (syn.nguong.phanTram ?? 50)) / 100);
  }

  const isMet = matchedCount >= threshold;
  const ratioText = `${matchedCount}/${totalCount}`;
  const summaryText = isMet
    ? `Đạt ${ratioText} triệu chứng (Ngưỡng: ≥ ${threshold})`
    : `Chưa đạt: hiện có ${ratioText} (Cần tối thiểu ≥ ${threshold})`;

  return {
    syndromeId: syn.id,
    ten: syn.ten,
    matchedCount,
    totalCount,
    threshold,
    isMet,
    ratioText,
    matchedSymptoms,
    missingSymptoms,
    summaryText,
  };
}

/**
 * Đánh giá toàn bộ các hội chứng trong hệ thống dựa trên tập triệu chứng ghi nhận
 */
export function evaluateAllSyndromes(
  presentSymptomIds: Set<string>,
  vocabMap?: Record<string, TrieuChung>
): Record<string, SyndromeMatchResult> {
  const results: Record<string, SyndromeMatchResult> = {};

  for (const synId of Object.keys(SYNDROME_REGISTRY)) {
    const res = evaluateSyndrome(synId, presentSymptomIds, vocabMap);
    if (res) {
      results[synId] = res;
    }
  }

  return results;
}

/**
 * Lấy toàn bộ danh sách hội chứng để hiển thị hoặc quản lý
 */
export function getAllSyndromes(): SyndromeDefinition[] {
  return Object.values(SYNDROME_REGISTRY);
}
