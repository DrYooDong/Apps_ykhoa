/**
 * CliniPortal — Knowledge Vault Data Loader Engine
 */

import { VaultArticle, VaultKhoSummary, VaultFilterState } from './types';
import catalogData from './data/vault-catalog.json';

export const VAULT_CATALOG: VaultArticle[] = catalogData as VaultArticle[];

export const KHO_DEFINITIONS: Record<string, { name: string; group: string; icon: string; color: string }> = {
  // Nhóm 1: Cơ sở Y khoa
  GPSL: { name: 'Giải phẫu & Sinh lý', group: 'Cơ sở Y khoa', icon: 'fa-heart-pulse', color: '#0284c7' },
  HS:   { name: 'Hóa sinh Y học',      group: 'Cơ sở Y khoa', icon: 'fa-flask',       color: '#8b5cf6' },
  SLB:  { name: 'Sinh lý bệnh',        group: 'Cơ sở Y khoa', icon: 'fa-bolt',        color: '#f59e0b' },
  DTH:  { name: 'Dịch tễ & Vi sinh',   group: 'Cơ sở Y khoa', icon: 'fa-virus',       color: '#10b981' },

  // Nhóm 2: Lâm sàng & Bệnh học
  TC:   { name: 'Tiếp cận Lâm sàng',   group: 'Lâm sàng & Bệnh học', icon: 'fa-magnifying-glass',     color: '#0ea5e9' },
  KN:   { name: 'Kỹ năng Lâm sàng',    group: 'Lâm sàng & Bệnh học', icon: 'fa-stethoscope',          color: '#6366f1' },
  CD:   { name: 'Chẩn đoán Bệnh học',  group: 'Lâm sàng & Bệnh học', icon: 'fa-clipboard-check',      color: '#ec4899' },
  PDDT: { name: 'Phác đồ Điều trị',    group: 'Lâm sàng & Bệnh học', icon: 'fa-pills',                color: '#3b82f6' },
  BC:   { name: 'Biến chứng & Tiên lượng', group: 'Lâm sàng & Bệnh học', icon: 'fa-triangle-exclamation', color: '#ef4444' },

  // Nhóm 3: Chuyên sâu & Bổ trợ
  CN:   { name: 'Cập nhật Guidelines', group: 'Chuyên sâu & Bổ trợ', icon: 'fa-arrows-rotate',      color: '#14b8a6' },
  CORE: { name: 'Thực thể Hạt nhân',   group: 'Chuyên sâu & Bổ trợ', icon: 'fa-dna',                color: '#a855f7' },
  EBM:  { name: 'NCKH & EBM',          group: 'Chuyên sâu & Bổ trợ', icon: 'fa-chart-pie',          color: '#64748b' },
  DD:   { name: 'Dinh dưỡng Lâm sàng', group: 'Chuyên sâu & Bổ trợ', icon: 'fa-apple-whole',        color: '#84cc16' },
  RAW:  { name: 'Kho Chưa lọc / Tổng quan', group: 'Chuyên sâu & Bổ trợ', icon: 'fa-box-archive',   color: '#78716c' }
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
