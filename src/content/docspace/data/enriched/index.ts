/**
 * CliniPortal Enriched CDSS Database Index
 * Tự động tạo bởi: tools/scripts/build-enriched-cdss.mjs
 * 
 * ⚠️ KHÔNG SỬA FILE NÀY TRỰC TIẾP.
 * Khi thêm bệnh lý mới từ Prompt 08/09:
 * 1. Lưu file <ten_benh>.json vào thư mục này.
 * 2. Chạy lệnh: node tools/scripts/build-enriched-cdss.mjs
 */

import type { DiseaseReactionChainDefinition } from '../diagnostic-criteria-database';

import sot_xuat_huyet_dengue from './sot_xuat_huyet_dengue.json';
import viem_gan_sieu_vi_b from './viem_gan_sieu_vi_b.json';
import viem_gan_sieu_vi_c from './viem_gan_sieu_vi_c.json';
import viem_gan_cap_do_thuoc_khang_lao from './viem_gan_cap_do_thuoc_khang_lao.json';
import thuy_dau from './thuy_dau.json';
import phan_ve from './phan_ve.json';
import aclf from './aclf.json';
import hach_to_nguoilon_hivaids from './hach_to_nguoilon_hivaids.json';
import hiv from './hiv.json';
import h_pylori from './h_pylori.json';
import leptospira from './leptospira.json';
import nt_cohoi from './nt_cohoi.json';
import nt_tieuhoa from './nt_tieuhoa.json';
import nt_tieu_duoi from './nt_tieu_duoi.json';
import nt_tieu_tren from './nt_tieu_tren.json';
import sot_keodai_nguoilon_hivaids from './sot_keodai_nguoilon_hivaids.json';
import sot_ret from './sot_ret.json';
import tieu_chay_man_nguoilon_hivaids from './tieu_chay_man_nguoilon_hivaids.json';
import viem_phoi_benh_vien from './viem_phoi_benh_vien.json';
import viem_phoi_cong_dong from './viem_phoi_cong_dong.json';
import viem_phoi_do_virus from './viem_phoi_do_virus.json';
import vmn_nam from './vmn_nam.json';
import vmn_sv from './vmn_sv.json';
import vmn_vk from './vmn_vk.json';
import xo_gan_con_bu from './xo_gan_con_bu.json';
import xo_gan_mat_bu from './xo_gan_mat_bu.json';
import tang_huyet_ap from './tang_huyet_ap.json';
import tay_chan_mieng from './tay_chan_mieng.json';

export const ENRICHED_DISEASES: Record<string, DiseaseReactionChainDefinition> = {
  'sot_xuat_huyet_dengue': sot_xuat_huyet_dengue as unknown as DiseaseReactionChainDefinition,
  'viem_gan_sieu_vi_b': viem_gan_sieu_vi_b as unknown as DiseaseReactionChainDefinition,
  'viem_gan_sieu_vi_c': viem_gan_sieu_vi_c as unknown as DiseaseReactionChainDefinition,
  'viem_gan_cap_do_thuoc_khang_lao': viem_gan_cap_do_thuoc_khang_lao as unknown as DiseaseReactionChainDefinition,
  'thuy_dau': thuy_dau as unknown as DiseaseReactionChainDefinition,
  'phan_ve': phan_ve as unknown as DiseaseReactionChainDefinition,
  'aclf': aclf as unknown as DiseaseReactionChainDefinition,
  'hach_to_nguoilon_hivaids': hach_to_nguoilon_hivaids as unknown as DiseaseReactionChainDefinition,
  'hiv': hiv as unknown as DiseaseReactionChainDefinition,
  'h_pylori': h_pylori as unknown as DiseaseReactionChainDefinition,
  'leptospira': leptospira as unknown as DiseaseReactionChainDefinition,
  'nt_cohoi': nt_cohoi as unknown as DiseaseReactionChainDefinition,
  'nt_tieuhoa': nt_tieuhoa as unknown as DiseaseReactionChainDefinition,
  'nt_tieu_duoi': nt_tieu_duoi as unknown as DiseaseReactionChainDefinition,
  'nt_tieu_tren': nt_tieu_tren as unknown as DiseaseReactionChainDefinition,
  'sot_keodai_nguoilon_hivaids': sot_keodai_nguoilon_hivaids as unknown as DiseaseReactionChainDefinition,
  'sot_ret': sot_ret as unknown as DiseaseReactionChainDefinition,
  'tieu_chay_man_nguoilon_hivaids': tieu_chay_man_nguoilon_hivaids as unknown as DiseaseReactionChainDefinition,
  'viem_phoi_benh_vien': viem_phoi_benh_vien as unknown as DiseaseReactionChainDefinition,
  'viem_phoi_cong_dong': viem_phoi_cong_dong as unknown as DiseaseReactionChainDefinition,
  'viem_phoi_do_virus': viem_phoi_do_virus as unknown as DiseaseReactionChainDefinition,
  'vmn_nam': vmn_nam as unknown as DiseaseReactionChainDefinition,
  'vmn_sv': vmn_sv as unknown as DiseaseReactionChainDefinition,
  'vmn_vk': vmn_vk as unknown as DiseaseReactionChainDefinition,
  'xo_gan_con_bu': xo_gan_con_bu as unknown as DiseaseReactionChainDefinition,
  'xo_gan_mat_bu': xo_gan_mat_bu as unknown as DiseaseReactionChainDefinition,
  'tang_huyet_ap': tang_huyet_ap as unknown as DiseaseReactionChainDefinition,
  'tay_chan_mieng': tay_chan_mieng as unknown as DiseaseReactionChainDefinition,
};

export const ENRICHED_DISEASE_KEYS = Object.keys(ENRICHED_DISEASES);
