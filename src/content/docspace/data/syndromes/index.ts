import { SyndromeDefinition, SyndromeMatchResult } from '../../src/types.ts';

// ==============================================================================
// 🏛️ KHO HỘI CHỨNG LÂM SÀNG CHUẨN DOCSPACE MEDLENS (12 HỘI CHỨNG CỐT LÕI)
// ==============================================================================

import hc_suy_te_bao_gan from './tieu_hoa_gan_mat/hc_suy_te_bao_gan.json';
import hc_tang_ap_cua from './tieu_hoa_gan_mat/hc_tang_ap_cua.json';
import hc_vang_da from './tieu_hoa_gan_mat/hc_vang_da.json';
import hc_xuat_huyet_tieu_hoa from './tieu_hoa_gan_mat/hc_xuat_huyet_tieu_hoa.json';
import hc_canh_bao_dengue from './truyen_nhiem/hc_canh_bao_dengue.json';
import hc_nhiem_trung from './truyen_nhiem/hc_nhiem_trung.json';
import hc_soc_nhiem_trung from './truyen_nhiem/hc_soc_nhiem_trung.json';
import hc_sxhd_classic from './truyen_nhiem/hc_sxhd_classic.json';
import hc_soc_sxhd from './truyen_nhiem/hc_soc_sxhd.json';
import hc_xuat_huyet_giam_tieu_cau from './huyet_hoc/hc_xuat_huyet_giam_tieu_cau.json';
import hc_suy_ho_hap from './ho_hap/hc_suy_ho_hap.json';
import hc_kich_thich_mang_nao from './than_kinh/hc_kich_thich_mang_nao.json';

/**
 * 🏛️ DANH SÁCH TOÀN BỘ HỘI CHỨNG LÂM SÀNG TRONG KHO TRI THỨC DOCSPACE
 */
export const ALL_SYNDROMES: SyndromeDefinition[] = [
  hc_canh_bao_dengue as unknown as SyndromeDefinition,
  hc_sxhd_classic as unknown as SyndromeDefinition,
  hc_soc_sxhd as unknown as SyndromeDefinition,
  hc_nhiem_trung as unknown as SyndromeDefinition,
  hc_soc_nhiem_trung as unknown as SyndromeDefinition,
  hc_xuat_huyet_giam_tieu_cau as unknown as SyndromeDefinition,
  hc_suy_ho_hap as unknown as SyndromeDefinition,
  hc_kich_thich_mang_nao as unknown as SyndromeDefinition,
  hc_suy_te_bao_gan as unknown as SyndromeDefinition,
  hc_tang_ap_cua as unknown as SyndromeDefinition,
  hc_vang_da as unknown as SyndromeDefinition,
  hc_xuat_huyet_tieu_hoa as unknown as SyndromeDefinition,
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
      (link) => link.benhSlug.toLowerCase().trim() === normalizedSlug || normalizedSlug.includes(link.benhSlug.toLowerCase().trim())
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
 * Bản đồ tương đương triệu chứng y khoa để đối sánh hội chứng đa chiều
 */
const SYMPTOM_EQUIVALENCE_CLUSTERS: string[][] = [
  ['sot', 'tc_sot_cao_dot_ngot_duoi_7_ngay', 'sot_cao', 'sot_cao_ret_run', 'sot_nhe_giai_doan_khoi_phat', 'sot_nhe_ve_chieu'],
  ['dau_bung_vung_gan', 'tc_dau_hieu_canh_bao_dau_bung_gan_non_oi', 'dau_tuc_ha_suon_phai'],
  ['buon_non_non', 'non_oi', 'non_oi_nhieu'],
  ['co_dac_mau_hct', 'tc_co_dac_mau_hct_tang_tren_20_phan_tram'],
  ['tieu_cau_giam_nang', 'tc_giam_tieu_cau_duoi_100_g_l', 'giam_tieu_cau', 'tieu_cau_giam_nguy_kich'],
  ['cham_xuat_huyet_duoi_da', 'xuat_huyet_da_niem', 'tc_xuat_huyet_da_niem_lacet_duong_tinh'],
  ['gan_to_dau', 'gan_to'],
  ['mach_nhanh', 'mach_rat_nhanh'],
  ['tut_huyet_ap', 'ha_huyet_ap', 'huyet_ap_kep', 'tc_soc_mach_nhanh_ha_kep_hoac_tut'],
  ['giam_spo2', 'suy_ho_hap_spo2_thap'],
  ['tho_nhanh', 'tho_nhanh_nang'],
  ['lu_du_vat_va_li_bi', 'vat_va_lu_du_li_bi', 'roi_loan_tri_giac'],
  ['cung_gay', 'co_cung_gay_dau_mang_nao', 'cung_gay_dieu_tri_mang_nao'],
  ['tran_dich_mang_phoi_mang_bung', 'tran_dich_mang_phoi', 'tran_dich_mang_bung'],
  ['bach_cau_tang', 'bach_cau_tang_cao'],
];

const EQUIV_MAP: Map<string, Set<string>> = new Map();
for (const cluster of SYMPTOM_EQUIVALENCE_CLUSTERS) {
  const clusterSet = new Set(cluster);
  for (const id of cluster) {
    EQUIV_MAP.set(id, clusterSet);
  }
}

/**
 * Đánh giá đối sánh các Hội chứng dựa trên danh sách triệu chứng người dùng đã chọn/nhập
 * @param selectedSymptomIds Danh sách ID các triệu chứng hiện diện
 * @param symptomNameMap Bản đồ tra cứu tên tiếng Việt của triệu chứng (tùy chọn)
 * @returns Danh sách các hội chứng kèm kết quả đối sánh (đạt ngưỡng / chưa đạt ngưỡng)
 */
export function evaluateSyndromeMatches(
  selectedSymptomIds: string[],
  symptomNameMap?: Record<string, string>
): SyndromeMatchResult[] {
  if (!selectedSymptomIds || selectedSymptomIds.length === 0) return [];
  const selectedSet = new Set(selectedSymptomIds);

  const results: SyndromeMatchResult[] = [];

  for (const hc of ALL_SYNDROMES) {
    const matchedSymptoms: Array<{ id: string; ten: string }> = [];
    const missingSymptoms: Array<{ id: string; ten: string }> = [];
    const processedEquivClusters = new Set<string>();

    for (const symId of hc.trieuChung) {
      const equivSet = EQUIV_MAP.get(symId);
      let isMatched = false;
      let matchedActualId = symId;

      if (selectedSet.has(symId)) {
        isMatched = true;
      } else if (equivSet) {
        for (const eqId of equivSet) {
          if (selectedSet.has(eqId)) {
            isMatched = true;
            matchedActualId = eqId;
            break;
          }
        }
      }

      // Tránh tính điểm trùng cho cùng 1 cluster trong 1 hội chứng
      const clusterKey = equivSet ? Array.from(equivSet).sort().join(',') : symId;
      if (isMatched) {
        if (!processedEquivClusters.has(clusterKey)) {
          processedEquivClusters.add(clusterKey);
          const displayName = symptomNameMap?.[matchedActualId] || symptomNameMap?.[symId] || matchedActualId;
          matchedSymptoms.push({ id: matchedActualId, ten: displayName });
        }
      } else {
        if (!processedEquivClusters.has(clusterKey)) {
          const displayName = symptomNameMap?.[symId] || symId;
          missingSymptoms.push({ id: symId, ten: displayName });
        }
      }
    }

    const matchedCount = matchedSymptoms.length;
    const totalCount = hc.trieuChung.length;
    const threshold = hc.nguong.n;

    // Kiểm tra triệu chứng bắt buộc (nếu có)
    let mandatoryMet = true;
    if (hc.trieuChungBatBuoc && hc.trieuChungBatBuoc.length > 0) {
      mandatoryMet = hc.trieuChungBatBuoc.every((mId) => {
        if (selectedSet.has(mId)) return true;
        const eqSet = EQUIV_MAP.get(mId);
        if (eqSet) {
          for (const eqId of eqSet) {
            if (selectedSet.has(eqId)) return true;
          }
        }
        return false;
      });
    }

    const isMet = matchedCount >= threshold && mandatoryMet;

    if (matchedCount > 0) {
      results.push({
        syndromeId: hc.id,
        ten: `${hc.ten}${hc.tenVietTat ? ` (${hc.tenVietTat})` : ''}`,
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

  // Sắp xếp ưu tiên: Các hội chứng ĐÃ ĐẠT lên trước, sau đó theo số triệu chứng khớp giảm dần
  return results.sort((a, b) => {
    if (a.isMet && !b.isMet) return -1;
    if (!a.isMet && b.isMet) return 1;
    return b.matchedCount - a.matchedCount;
  });
}
