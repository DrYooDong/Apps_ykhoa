/**
 * CliniPortal DocSpace — Diagnostic Criteria Service
 * Đồng bộ & chuẩn hóa dữ liệu Tiêu chuẩn chẩn đoán từ Kho Chẩn Đoán (2.3. Kho chẩn đoán)
 * và liên kết 1-1 với Kho Phác đồ điều trị (2.4. Kho phác đồ điều trị / PDDT).
 */

import { KnowledgeBase, RoleType } from '../types.ts';
import { VAULT_CATALOG, VaultArticle } from './vaultBridge.ts';
import { GROUP_COLORS, GROUP_NAMES } from '../data/seedData.ts';
import {
  DIAGNOSTIC_CHAIN_DATABASE,
  DiseaseReactionChainDefinition,
} from '../../data/diagnostic-criteria-database.ts';

export interface DiagnosticCriterionItem {
  id: string;
  ten: string;
  role: RoleType;
  trongSo: number;
}

export interface DiagnosticCardData {
  id: string;
  ten: string;
  icd: string;
  nhom: string;
  nhomColor: string;
  baoDong: boolean;
  tomTat: string;
  danSo?: {
    gioiTinh: string;
    tuoiMin?: number;
    tuoiMax?: number;
  };
  tieuChuan: DiagnosticCriterionItem[];
  // Kho Chẩn Đoán (2.3) metadata
  cdArticle?: VaultArticle;
  // Kho Phác Đồ (2.4) metadata
  pddtArticle?: VaultArticle;
  // Phác đồ tóm tắt
  phacDoPreview?: {
    tuyen: string[];
    thuoc: Array<[string, string, string]>;
    luuY: string[];
  };
  hasStep3Protocol: boolean;
  isCoreCdss: boolean;
}

/**
 * Chuyển đổi tên sang slug không dấu chuẩn để tra cứu
 */
function toSearchSlug(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

/**
 * Tra cứu đối ứng bệnh trong DIAGNOSTIC_CHAIN_DATABASE (bao gồm 165 bệnh Kho Chẩn Đoán & Enriched)
 */
function findChainForCd(cd: VaultArticle): { key: string; chain: DiseaseReactionChainDefinition } | undefined {
  // 1. Khớp trực tiếp slug tiêu đề
  const slug = toSearchSlug(cd.title);
  if (DIAGNOSTIC_CHAIN_DATABASE[slug]) {
    return { key: slug, chain: DIAGNOSTIC_CHAIN_DATABASE[slug] };
  }

  // 2. Khớp trực tiếp cd.id
  if (DIAGNOSTIC_CHAIN_DATABASE[cd.id]) {
    return { key: cd.id, chain: DIAGNOSTIC_CHAIN_DATABASE[cd.id] };
  }

  // 3. Khớp tên bệnh lý
  const normTitle = cd.title.toLowerCase().trim();
  for (const [key, chain] of Object.entries(DIAGNOSTIC_CHAIN_DATABASE)) {
    if (!chain || !chain.diseaseName) continue;
    const chainName = chain.diseaseName.toLowerCase().trim();
    if (chainName === normTitle || chainName.includes(normTitle) || normTitle.includes(chainName)) {
      return { key, chain };
    }
  }

  // 4. Khớp qua aliases
  if (cd.aliases && cd.aliases.length > 0) {
    for (const [key, chain] of Object.entries(DIAGNOSTIC_CHAIN_DATABASE)) {
      if (!chain || !chain.diseaseName) continue;
      const chainName = chain.diseaseName.toLowerCase().trim();
      if (cd.aliases.some((al) => chainName.includes(al.toLowerCase().trim()) || al.toLowerCase().trim().includes(chainName))) {
        return { key, chain };
      }
    }
  }

  // 5. Khớp qua ICD
  if (cd.icd10 && cd.icd10.length > 0) {
    for (const [key, chain] of Object.entries(DIAGNOSTIC_CHAIN_DATABASE)) {
      if (!chain || !chain.diseaseName) continue;
      if (
        cd.icd10.some(
          (c) =>
            chain.icdCode?.toUpperCase().includes(c.toUpperCase()) ||
            chain.icdPrefixes?.some((p) => c.toUpperCase().startsWith(p) || p.startsWith(c.toUpperCase()))
        )
      ) {
        return { key, chain };
      }
    }
  }

  return undefined;
}

/**
 * Lấy danh sách bài viết Part 1 từ Kho Chẩn Đoán (2.3)
 */
export function getKhoChanDoanP1Articles(): VaultArticle[] {
  return VAULT_CATALOG.filter((art) => art.khoCode === 'CD' && (art.part === 'P1' || !art.part));
}

/**
 * Lấy danh sách bài viết Part 1 từ Kho Phác Đồ (2.4)
 */
export function getKhoPhacDoP1Articles(): VaultArticle[] {
  return VAULT_CATALOG.filter((art) => art.khoCode === 'PDDT' && (art.part === 'P1' || !art.part));
}

/**
 * Tìm bài viết Phác đồ (PDDT) tương ứng với bài Chẩn đoán (CD)
 */
export function findMatchingPddtArticle(cdTitle: string, aliases: string[] = [], icd: string[] = []): VaultArticle | undefined {
  const pddtList = getKhoPhacDoP1Articles();
  const normTitle = cdTitle.toLowerCase().trim();

  // 1. Exact title match
  let match = pddtList.find((p) => p.title.toLowerCase().trim() === normTitle);
  if (match) return match;

  // 2. Title includes
  match = pddtList.find((p) => {
    const pTitle = p.title.toLowerCase().trim();
    return pTitle.includes(normTitle) || normTitle.includes(pTitle);
  });
  if (match) return match;

  // 3. Match via aliases
  if (aliases.length > 0) {
    match = pddtList.find((p) => {
      const pTitle = p.title.toLowerCase().trim();
      return aliases.some((al) => {
        const normAl = al.toLowerCase().trim();
        return pTitle === normAl || pTitle.includes(normAl) || normAl.includes(pTitle);
      });
    });
    if (match) return match;
  }

  // 4. Match via ICD
  if (icd.length > 0) {
    match = pddtList.find((p) => {
      if (!p.icd10 || p.icd10.length === 0) return false;
      return icd.some((c) => p.icd10!.some((pc) => pc.toUpperCase().includes(c.toUpperCase()) || c.toUpperCase().includes(pc.toUpperCase())));
    });
    if (match) return match;
  }

  return undefined;
}

/**
 * Xây dựng danh sách thẻ Tiêu chuẩn chẩn đoán chuẩn hóa
 * CHỈ tải từ CSDL CDSS cốt lõi (kb.benh), không tự động quét tạo thẻ từ file thô Kho Chẩn Đoán (2.3).
 * Tất cả đều có Tiêu chuẩn & Trọng số CDSS chuẩn hóa, Phác đồ thuốc bậc 1 và Mở phác đồ & ra y lệnh.
 */
export function buildDiagnosticCards(kb: KnowledgeBase): DiagnosticCardData[] {
  const vocabMap = new Map(kb.trieuChung.map((t) => [t.id, t]));
  const cards: DiagnosticCardData[] = [];

  // Chỉ hiển thị các bệnh cốt lõi chuẩn hóa từ CSDL CDSS (kb.benh)
  kb.benh.forEach((b) => {
    // Tìm bài viết tương ứng trong Kho Phác Đồ (2.4) nếu có
    const pddtArt = findMatchingPddtArticle(b.ten, [], [b.icd]);

    // Chuẩn hóa tiêu chuẩn & trọng số từ kb.benh.dd
    const tieuChuan: DiagnosticCriterionItem[] = b.dd.map(([tcId, w, role]) => {
      const tc = vocabMap.get(tcId);
      return {
        id: tcId,
        ten: tc?.ten || tcId,
        role: role as RoleType,
        trongSo: w,
      };
    });

    cards.push({
      id: b.id,
      ten: b.ten,
      icd: b.icd,
      nhom: GROUP_NAMES[b.nhom] || b.nhom,
      nhomColor: GROUP_COLORS[b.nhom] || '#2563eb',
      baoDong: !!b.baoDong,
      tomTat: b.tomTat,
      danSo: b.danSo ? {
        gioiTinh: b.danSo.gioiTinh === 'any' ? 'Nam / Nữ' : b.danSo.gioiTinh,
        tuoiMin: b.danSo.tuoiMin ?? undefined,
        tuoiMax: b.danSo.tuoiMax ?? undefined,
      } : undefined,
      tieuChuan,
      cdArticle: undefined, // Không liên kết với file thô Kho Chẩn đoán (2.3)
      pddtArticle: pddtArt,
      phacDoPreview: b.phacDo ? {
        tuyen: b.phacDo.tuyen,
        thuoc: b.phacDo.thuoc,
        luuY: b.phacDo.luuY,
      } : undefined,
      hasStep3Protocol: true,
      isCoreCdss: true,
    });
  });

  return cards;
}

