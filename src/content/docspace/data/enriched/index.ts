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
import thuy_dau from './thuy_dau.json';
import xo_gan_con_bu from './xo_gan_con_bu.json';
import aclf from './aclf.json';
import xo_gan_mat_bu from './xo_gan_mat_bu.json';
import vgsv_B from './vgsv_B.json';
import vgsv_C from './vgsv_C.json';
import sot_ret from './sot_ret.json';
import leptospira from './leptospira.json';

export const ENRICHED_DISEASES: Record<string, DiseaseReactionChainDefinition> = {
  'sot_xuat_huyet_dengue': sot_xuat_huyet_dengue as unknown as DiseaseReactionChainDefinition,
  'thuy_dau': thuy_dau as unknown as DiseaseReactionChainDefinition,
  'xo_gan_con_bu': xo_gan_con_bu as unknown as DiseaseReactionChainDefinition,
  'aclf': aclf as unknown as DiseaseReactionChainDefinition,
  'xo_gan_mat_bu': xo_gan_mat_bu as unknown as DiseaseReactionChainDefinition,
  'vgsv_B': vgsv_B as unknown as DiseaseReactionChainDefinition,
  'vgsv_C': vgsv_C as unknown as DiseaseReactionChainDefinition,
  'sot_ret': sot_ret as unknown as DiseaseReactionChainDefinition,
  'leptospira': leptospira as unknown as DiseaseReactionChainDefinition,
};

export const ENRICHED_DISEASE_KEYS = Object.keys(ENRICHED_DISEASES);
