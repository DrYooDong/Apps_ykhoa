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
import xo_gan from './xo_gan.json';
import viem_gan_sieu_vi_b from './viem_gan_sieu_vi_b.json';

export const ENRICHED_DISEASES: Record<string, DiseaseReactionChainDefinition> = {
  'sot_xuat_huyet_dengue': sot_xuat_huyet_dengue as unknown as DiseaseReactionChainDefinition,
  'xo_gan': xo_gan as unknown as DiseaseReactionChainDefinition,
  'viem_gan_sieu_vi_b': viem_gan_sieu_vi_b as unknown as DiseaseReactionChainDefinition,
};

export const ENRICHED_DISEASE_KEYS = Object.keys(ENRICHED_DISEASES);
