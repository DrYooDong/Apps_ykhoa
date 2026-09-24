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
import vmn_vk from './vmn_vk.json';
import vmn_sieuvi from './vmn_sieuvi.json';

export const ENRICHED_DISEASES: Record<string, DiseaseReactionChainDefinition> = {
  'sot_xuat_huyet_dengue': sot_xuat_huyet_dengue as unknown as DiseaseReactionChainDefinition,
  'vmn_vk': vmn_vk as unknown as DiseaseReactionChainDefinition,
  'vmn_sieuvi': vmn_sieuvi as unknown as DiseaseReactionChainDefinition,
};

export const ENRICHED_DISEASE_KEYS = Object.keys(ENRICHED_DISEASES);
