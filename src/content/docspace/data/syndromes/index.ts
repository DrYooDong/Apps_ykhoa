import { SyndromeDefinition, SyndromeMatchResult } from '../../src/types';

// ==============================================================================
// 🧠 TỰ ĐỘNG TẠO BỞI build-syndrome-registry.mjs — KHÔNG SỬA THỦ CÔNG
// ==============================================================================

import hc_suy_te_bao_gan from './tieu_hoa_gan_mat/hc_suy_te_bao_gan.json';
import hc_tang_ap_cua from './tieu_hoa_gan_mat/hc_tang_ap_cua.json';
import hc_vang_da from './tieu_hoa_gan_mat/hc_vang_da.json';
import hc_xuat_huyet_tieu_hoa from './tieu_hoa_gan_mat/hc_xuat_huyet_tieu_hoa.json';
import hc_canh_bao_dengue from './truyen_nhiem/hc_canh_bao_dengue.json';
import hc_nhiem_trung from './truyen_nhiem/hc_nhiem_trung.json';
import hc_soc_nhiem_trung from './truyen_nhiem/hc_soc_nhiem_trung.json';

/**
 * 🏛️ DANH SÁCH TOÀN BỘ HỘI CHỨNG LÂM SÀNG TRONG KHO TRI THỨC DOCSPACE
 */
export const ALL_SYNDROMES: SyndromeDefinition[] = [
  hc_suy_te_bao_gan as unknown as SyndromeDefinition,
  hc_tang_ap_cua as unknown as SyndromeDefinition,
  hc_vang_da as unknown as SyndromeDefinition,
  hc_xuat_huyet_tieu_hoa as unknown as SyndromeDefinition,
  hc_canh_bao_dengue as unknown as SyndromeDefinition,
  hc_nhiem_trung as unknown as SyndromeDefinition,
  hc_soc_nhiem_trung as unknown as SyndromeDefinition,
];

/**
 * 🗺️ Bản đồ tra cứu nhanh theo ID hội chứng
 */
export const SYNDROME_MAP: Map<string, SyndromeDefinition> = new Map(
  ALL_SYNDROMES.map((hc) => [hc.id, hc])
);

/**
 * Tra cứu Hội chứng theo ID
 */
export function getSyndromeById(id: string): SyndromeDefinition | undefined {
  return SYNDROME_MAP.get(id);
}

/**
 * Lấy danh sách các Hội chứng liên quan đến một Bệnh lý cụ thể
 * @param diseaseSlug Mã slug của bệnh lý (VD: 'xo_gan', 'sot_xuat_huyet_dengue')
 */
export function getSyndromesByDisease(diseaseSlug: string): SyndromeDefinition[] {
  if (!diseaseSlug) return [];
  const normalizedSlug = diseaseSlug.toLowerCase().trim();
  return ALL_SYNDROMES.filter((hc) =>
    hc.benhLienQuan?.some(
      (link) => link.benhSlug.toLowerCase().trim() === normalizedSlug
    )
  );
}

/**
 * Lọc danh sách Hội chứng theo Chuyên khoa
 */
export function getSyndromesByChuyenKhoa(chuyenKhoa: string): SyndromeDefinition[] {
  if (!chuyenKhoa) return ALL_SYNDROMES;
  const kw = chuyenKhoa.toLowerCase().trim();
  return ALL_SYNDROMES.filter(
    (hc) => hc.chuyenKhoa && hc.chuyenKhoa.toLowerCase().includes(kw)
  );
}

/**
 * Đánh giá đối sánh các Hội chứng dựa trên danh sách triệu chứng người dùng đã chọn/nhập
 * @param selectedSymptomIds Danh sách ID các triệu chứng hiện diện
 * @returns Danh sách các hội chứng kèm kết quả đối sánh (đạt ngưỡng / chưa đạt ngưỡng)
 */
export function evaluateSyndromeMatches(
  selectedSymptomIds: string[]
): SyndromeMatchResult[] {
  if (!selectedSymptomIds || selectedSymptomIds.length === 0) return [];
  const selectedSet = new Set(selectedSymptomIds);

  const results: SyndromeMatchResult[] = [];

  for (const hc of ALL_SYNDROMES) {
    const matchedSymptoms: Array<{ id: string; ten: string }> = [];
    const missingSymptoms: Array<{ id: string; ten: string }> = [];

    for (const symId of hc.trieuChung) {
      if (selectedSet.has(symId)) {
        matchedSymptoms.push({ id: symId, ten: symId });
      } else {
        missingSymptoms.push({ id: symId, ten: symId });
      }
    }

    const matchedCount = matchedSymptoms.length;
    const totalCount = hc.trieuChung.length;
    const threshold = hc.nguong.n;

    // Kiểm tra triệu chứng bắt buộc (nếu có)
    let mandatoryMet = true;
    if (hc.trieuChungBatBuoc && hc.trieuChungBatBuoc.length > 0) {
      mandatoryMet = hc.trieuChungBatBuoc.every((mId) => selectedSet.has(mId));
    }

    const isMet = matchedCount >= threshold && mandatoryMet;

    if (matchedCount > 0) {
      results.push({
        syndromeId: hc.id,
        ten: hc.ten,
        matchedCount,
        totalCount,
        threshold,
        isMet,
        ratioText: `${matchedCount}/${totalCount}`,
        matchedSymptoms,
        missingSymptoms,
        summaryText: isMet
          ? `Đạt ${matchedCount}/${totalCount} triệu chứng (Ngưỡng: ≥ ${threshold})`
          : `Gợi ý ${matchedCount}/${totalCount} triệu chứng (Cần thêm ${Math.max(0, threshold - matchedCount)} để đủ ngưỡng)`,
      });
    }
  }

  // Sắp xếp ưu tiên: Các hội chứng ĐÃ ĐẠT lên trước, sau đó sắp xếp theo số triệu chứng khớp giảm dần
  return results.sort((a, b) => {
    if (a.isMet && !b.isMet) return -1;
    if (!a.isMet && b.isMet) return 1;
    return b.matchedCount - a.matchedCount;
  });
}
