/**
 * CliniPortal DocSpace — Clinical Syndrome Engine (Hội chứng Lâm sàng)
 * Định nghĩa chuẩn: Hội chứng lâm sàng là tập hợp ít nhất 02 triệu chứng.
 * Cung cấp:
 * 1. Từ điển Hội chứng lâm sàng chuẩn y khoa (≥ 2 triệu chứng).
 * 2. Đánh giá tự động tỷ lệ triệu chứng hiện có / tổng số triệu chứng (VD: 2/10, 3/7).
 * 3. Tích hợp vào Tiêu chuẩn chẩn đoán & Động cơ suy luận CDSS.
 */

import { SyndromeDefinition, SyndromeMatchResult, TrieuChung } from '../types.ts';
import { ALL_SYNDROMES } from '../../data/syndromes/index.ts';

/**
 * DANH MỤC HỘI CHỨNG LÂM SÀNG CHUẨN Y KHOA
 * Tự động đồng bộ từ Kho Hội chứng Lâm sàng (data/syndromes/)
 */
const DYNAMIC_MAP: Record<string, SyndromeDefinition> = Object.fromEntries(
  ALL_SYNDROMES.map((s) => [s.id, s])
);

// Ánh xạ tương thích ngược cho các mã hội chứng cũ
if (DYNAMIC_MAP['hc_canh_bao_dengue']) {
  DYNAMIC_MAP['hc_warning_signs_dengue'] = DYNAMIC_MAP['hc_canh_bao_dengue'];
}
if (DYNAMIC_MAP['hc_kich_thich_mang_nao']) {
  DYNAMIC_MAP['hc_mang_nao'] = DYNAMIC_MAP['hc_kich_thich_mang_nao'];
}

export const SYNDROME_REGISTRY: Record<string, SyndromeDefinition> = {
  ...DYNAMIC_MAP,
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
