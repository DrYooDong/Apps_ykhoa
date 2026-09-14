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

import leptospira from './leptospira.json';
import sot_xuat_huyet_dengue from './sot_xuat_huyet_dengue.json';
import thuy_dau from './thuy_dau.json';
import vgsv_B from './vgsv_B.json';
import viem_mang_nao from './viem_mang_nao.json';

export const ENRICHED_DISEASES: Record<string, DiseaseReactionChainDefinition> = {
  'leptospira': leptospira as unknown as DiseaseReactionChainDefinition,
  'sot_xuat_huyet_dengue': sot_xuat_huyet_dengue as unknown as DiseaseReactionChainDefinition,
  'thuy_dau': thuy_dau as unknown as DiseaseReactionChainDefinition,
  'vgsv_B': vgsv_B as unknown as DiseaseReactionChainDefinition,
  'viem_mang_nao': viem_mang_nao as unknown as DiseaseReactionChainDefinition,
};

export const ENRICHED_DISEASE_KEYS = Object.keys(ENRICHED_DISEASES);
