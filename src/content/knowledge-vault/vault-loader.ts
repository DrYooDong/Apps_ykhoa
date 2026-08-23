/**
 * CliniPortal — Knowledge Vault Data Loader Engine
 */

import { VaultArticle, VaultKhoSummary, VaultFilterState, ClinicalPathwayLinks } from './types';
import catalogData from './data/vault-catalog.json';

export const VAULT_CATALOG: VaultArticle[] = catalogData as VaultArticle[];

export const KHO_DEFINITIONS: Record<string, { name: string; group: string; icon: string; color: string }> = {
  // 1. Nhóm Cơ sở
  GPSL: { name: 'GP & sinh lý',         group: 'Cơ sở', icon: 'fa-heart-pulse',           color: '#0284c7' },
  HS:   { name: 'Hóa sinh',             group: 'Cơ sở', icon: 'fa-flask',                 color: '#8b5cf6' },
  SLB:  { name: 'Sinh lý bệnh',         group: 'Cơ sở', icon: 'fa-bolt',                  color: '#f59e0b' },
  DTH:  { name: 'Dịch tễ học',          group: 'Cơ sở', icon: 'fa-virus',                 color: '#10b981' },
  KN:   { name: 'Kỹ năng',              group: 'Cơ sở', icon: 'fa-stethoscope',           color: '#6366f1' },

  // 2. Nhóm Chuyên sâu
  YTNC: { name: 'Yếu tố nguy cơ',       group: 'Chuyên sâu', icon: 'fa-triangle-exclamation',  color: '#f97316' },
  TC:   { name: 'Lâm sàng',             group: 'Chuyên sâu', icon: 'fa-magnifying-glass',      color: '#0ea5e9' },
  CLS:  { name: 'Cận lâm sàng',         group: 'Chuyên sâu', icon: 'fa-flask-vial',            color: '#6366f1' },
  CD:   { name: 'Tiêu chuẩn chẩn đoán', group: 'Chuyên sâu', icon: 'fa-clipboard-check',       color: '#ec4899' },
  PDDT: { name: 'Phác đồ',              group: 'Chuyên sâu', icon: 'fa-pills',                 color: '#3b82f6' },
  DUOC: { name: 'Dược',                 group: 'Chuyên sâu', icon: 'fa-capsules',              color: '#06b6d4' },
  TV:   { name: 'Tư vấn',               group: 'Chuyên sâu', icon: 'fa-hand-holding-medical',  color: '#84cc16' },
  BC:   { name: 'Biến chứng',           group: 'Chuyên sâu', icon: 'fa-heart-crack',           color: '#ef4444' },

  // 3. Nhóm Hỗ trợ
  CC:   { name: 'Công cụ & Thang điểm', group: 'Hỗ trợ', icon: 'fa-calculator',           color: '#f59e0b' },
  EBM:  { name: 'NCKH & EBM',           group: 'Hỗ trợ', icon: 'fa-chart-pie',             color: '#64748b' },
  RAW:  { name: 'Kho chưa lọc',         group: 'Hỗ trợ', icon: 'fa-box-archive',          color: '#78716c' },
  CORE: { name: 'Thực thể Hạt nhân',    group: 'Hỗ trợ', icon: 'fa-dna',                  color: '#a855f7' }
};

/**
 * Lấy tóm tắt thống kê các Kho
 */
export function getKhoSummaries(): VaultKhoSummary[] {
  const summaries: Record<string, VaultKhoSummary> = {};

  Object.entries(KHO_DEFINITIONS).forEach(([code, def]) => {
    summaries[code] = {
      code,
      name: def.name,
      dirName: code,
      icon: def.icon,
      color: def.color,
      articleCount: 0,
      specialties: []
    };
  });

  VAULT_CATALOG.forEach(art => {
    if (summaries[art.khoCode]) {
      summaries[art.khoCode].articleCount++;
      if (!summaries[art.khoCode].specialties.includes(art.specialty)) {
        summaries[art.khoCode].specialties.push(art.specialty);
      }
    }
  });

  return Object.values(summaries);
}

/**
 * Lọc danh sách bài viết theo bộ lọc tìm kiếm
 */
export function filterVaultArticles(filter: VaultFilterState): VaultArticle[] {
  const q = filter.searchQuery.trim().toLowerCase();
  
  return VAULT_CATALOG.filter(art => {
    // Filter by Kho
    if (filter.activeKho !== 'ALL' && art.khoCode !== filter.activeKho) {
      return false;
    }

    // Filter by Specialty
    if (filter.activeSpecialty !== 'ALL' && art.specialty !== filter.activeSpecialty) {
      return false;
    }

    // Filter by Search query
    if (q) {
      const matchTitle = art.title.toLowerCase().includes(q);
      const matchSpecialty = art.specialty.toLowerCase().includes(q);
      const matchSnippet = (art.snippet || '').toLowerCase().includes(q);
      const matchKho = art.khoName.toLowerCase().includes(q);
      const matchAlias = (art.aliases || []).some(a => a.toLowerCase().includes(q));
      const matchKeyword = (art.keywords || []).some(k => k.toLowerCase().includes(q));
      const matchIcd = (art.icd10 || []).some(c => c.toLowerCase().includes(q));

      if (!matchTitle && !matchSpecialty && !matchSnippet && !matchKho && !matchAlias && !matchKeyword && !matchIcd) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Lấy chi tiết một bài viết theo ID hoặc Path
 */
export function getArticleByIdOrPath(identifier: string): VaultArticle | undefined {
  return VAULT_CATALOG.find(a => a.id === identifier || a.relPath === identifier);
}

/**
 * Tìm kiếm chuỗi liên kết bệnh học 5 khía cạnh (Clinical Pathway Matrix)
 */
export function findPathwayArticles(currentArticle: VaultArticle): ClinicalPathwayLinks {
  const normTitle = currentArticle.title.toLowerCase().trim();
  
  // Extract core condition name (clean prefixes if any)
  const conditionName = currentArticle.title;

  const result: ClinicalPathwayLinks = {
    conditionName: conditionName
  };

  VAULT_CATALOG.forEach(art => {
    const artTitle = art.title.toLowerCase().trim();
    const isMatch = artTitle === normTitle || 
      (normTitle.length > 4 && artTitle.includes(normTitle)) || 
      (artTitle.length > 4 && normTitle.includes(artTitle));

    if (!isMatch) return;

    if (art.khoCode === 'GPSL' && !result.gpsl) result.gpsl = art;
    else if (art.khoCode === 'SLB' && !result.slb) result.slb = art;
    else if (art.khoCode === 'DTH' && !result.dth) result.dth = art;
    else if (art.khoCode === 'YTNC' && !result.ytnc) result.ytnc = art;
    else if (art.khoCode === 'CD' && !result.cd) result.cd = art;
    else if (art.khoCode === 'PDDT' && !result.pddt) result.pddt = art;
    else if (art.khoCode === 'BC' && !result.bc) result.bc = art;
    else if (art.khoCode === 'TV' && !result.tv) result.tv = art;
    else if (art.khoCode === 'CN' && !result.cn) result.cn = art;
  });

  return result;
}
